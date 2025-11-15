import type { VercelRequest, VercelResponse } from '@vercel/node';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  try {
    const access = await getAccessToken();

    const sampleCar = {
      title: 'BMW Série 3',
      slug: 'bmw-serie-3-demo',
      brand: 'BMW',
      model: 'Série 3',
      year: 2020,
      listingType: 'sale',
      price: 24990,
      mileage: 45000,
      fuel: 'Diesel',
      transmission: 'Automatique',
      status: 'Disponible',
      description: 'Exemple de voiture pour test d’intégration.',
      features: ['GPS', 'Sièges cuir', 'Caméra de recul'],
    };

    const payload = {
      data: [{
        Product_Name: sampleCar.title,
        Product_Code: sampleCar.slug,
        Manufacturer: sampleCar.brand,
        Unit_Price: sampleCar.price,
        Description: sampleCar.description,
        Year: sampleCar.year,
        Mileage: sampleCar.mileage,
        Fuel: sampleCar.fuel,
        Transmission: sampleCar.transmission,
        Car_Status: sampleCar.status,
        Features: sampleCar.features.join(', '),
        Listing_Type: sampleCar.listingType,
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