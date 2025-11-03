/* Supabase Edge Function: test-drive
   - Validates payload
   - Sends an email to admin (no DB)
   - CORS enabled for browser calls
*/

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

type Payload = {
  email?: string
  when?: string
  car_id?: number
  car_name?: string
  source?: string
}

function corsHeaders(origin: string | null) {
  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  }
}

async function sendEmail(to: string, subject: string, text: string) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  const FROM = Deno.env.get('RESEND_FROM') || 'no-reply@example.com'
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not set')
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to,
      subject,
      text,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Email provider error: ${res.status} ${body}`)
  }
}

serve(async (req: Request) => {
  const origin = req.headers.get('origin')
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) })
  }

  try {
    const payload = (await req.json()) as Payload

    const email = (payload.email ?? '').toString().trim().toLowerCase()
    const when = (payload.when ?? '').toString().trim()
    const car_id = payload.car_id !== undefined ? Number(payload.car_id) : null
    const source = (payload.source ?? 'landing').toString()
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'contact@bm-valocations.com'

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      })
    }
    if (!when || when.length < 3) {
      return new Response(JSON.stringify({ error: 'Invalid time slot' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      })
    }

    const subject = `Demande d'essai — ${payload.car_name ?? 'Citadine'}${car_id ? ` (ID ${car_id})` : ''}`
    const text =
      `Source: ${source}\n` +
      `Email client: ${email}\n` +
      (car_id ? `Voiture: ${payload.car_name ?? 'N/A'} (ID ${car_id})\n` : '') +
      `Créneau souhaité: ${when}\n` +
      `Date: ${new Date().toISOString()}\n`

    await sendEmail(adminEmail, subject, text)

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message ?? 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    })
  }
})