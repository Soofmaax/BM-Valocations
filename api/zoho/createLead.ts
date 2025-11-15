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
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const {
      name,
      email,
      phone,
      message,
      carTitle,
      marketingConsent,
      policyVersion,
      // UTM tracking (optionnels)
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    } = req.body ?? {};

    const access = await getAccessToken();

    const now = new Date().toISOString();

    const payload = {
      data: [{
        Last_Name: name || 'Lead',
        Email: email,
        Phone: phone,
        Description: message ? `${message} | Voiture: ${carTitle}` : `Voiture: ${carTitle}`,
        Lead_Source: 'Website',
        // Champs custom RGPD (crée-les dans Zoho avec ces API names)
        Consent_Status: marketingConsent ? 'Consented' : 'Not Consented',
        Consent_Timestamp: now,
        Consent_Policy_Version: policyVersion || '1.0',
        // UTM (champs custom à créer côté Zoho avec ces API names)
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
      }],
      trigger: ['workflow'],
    };

    const crmRes = await fetch(`${regionBase}/crm/v2/Leads`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const crmJson = await crmRes.json();
    if (!crmRes.ok) return res.status(400).json(crmJson);

    return res.status(200).json({ ok: true, result: crmJson });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? 'Internal Error' });
  }
}