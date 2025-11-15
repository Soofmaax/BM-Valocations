import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { createClient } from '@sanity/client';

const regionBase = process.env.ZOHO_BASE ?? 'https://www.zohoapis.eu';
const accountsBase = process.env.ZOHO_ACCOUNTS ?? 'https://accounts.zoho.eu';

async function getAccessToken() {
  const url = `${accountsBase}/oauth/v2/token` +
    `?refresh_token=${process.env.ZOHO_REFRESH_TOKEN}` +
    `&client_id=${process.env.ZOHO_CLIENT_ID}` +
    `&client_secret=${process.env.ZOHO_CLIENT_SECRET}` +
    `&grant_type=refresh_token`;
  const res = await fetch(url, { method: 'POST' });
  const json = await res.json();
  if (!json.access_token) throw new Error('Zoho token error');
  return json.access_token as string;
}

function verifySanitySignature(req: VercelRequest, rawBody: string): boolean {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  const signature = req.headers['x-sanity-signature'];
  if (!secret || !signature || typeof signature !== 'string') return true; // skip if not configured
  const hmac = crypto.createHmac('sha1', secret);
  const digest = `sha1=${hmac.update(rawBody).digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

function getSanityClient() {
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
    token: process.env.SANITY_READ_TOKEN,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  // Read raw body for signature verification
  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (!verifySanitySignature(req, rawBody)) return res.status(401).send('Invalid signature');

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    let car = body?.document;

    if (!car || car._type !== 'car') {
      const id = body?.ids?.[0] || body?._id || body?.documentId;
      if (!id) return res.status(200).json({ ok: true, skipped: true, reason: 'no car document' });
      const sanity = getSanityClient();
      car = await sanity.fetch(
        '*[_type=="car" && _id==$id][0]{_id,title,slug,brand,model,year,price,mileage,fuel,transmission,status,features,description}',
        { id }
      );
      if (!car) return res.status(200).json({ ok: true, skipped: true, reason: 'car not found' });
    }

    const access = await getAccessToken();

    // Prepare Product payload for Zoho CRM
    const productCode = (car.slug && car.slug.current) ? car.slug.current : car._id;
    const payload = {
      data: [{
        Product_Name: car.title,
        Product_Code: productCode,
        Manufacturer: car.brand,
        Unit_Price: car.price,
        Description: car.description,
        // Custom fields to create in Zoho Products module
        Year: car.year,
        Mileage: car.mileage,
        Fuel: car.fuel,
        Transmission: car.transmission,
        Car_Status: car.status,
        Features: Array.isArray(car.features) ? car.features.join(', ') : undefined,
      }],
      duplicate_check_fields: ['Product_Code'],
    };

    const upsertRes = await fetch(`${regionBase}/crm/v2/Products/upsert`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const upsertJson = await upsertRes.json();
    if (!upsertRes.ok) return res.status(400).json(upsertJson);

    return res.status(200).json({ ok: true, result: upsertJson });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? 'Internal Error' });
  }
}