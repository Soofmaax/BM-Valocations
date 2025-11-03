/* Supabase Edge Function: test-drive
   - Validates payload
   - Inserts into 'test_drives' using service role
   - CORS enabled for browser calls
*/

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

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

serve(async (req: Request) => {
  const origin = req.headers.get('origin')
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) })
  }

  try {
    const url = Deno.env.get('SUPABASE_URL')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') // must be set in function env
    if (!url || !serviceKey) {
      return new Response(JSON.stringify({ error: 'Service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      })
    }

    const payload = (await req.json()) as Payload

    const email = (payload.email ?? '').toString().trim().toLowerCase()
    const when = (payload.when ?? '').toString().trim()
    const car_id = payload.car_id !== undefined ? Number(payload.car_id) : null
    const source = (payload.source ?? 'landing').toString()

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

    const supabase = createClient(url, serviceKey)
    const { error } = await supabase.from('test_drives').insert({
      email,
      when,
      car_id,
      car_name: payload.car_name ?? null,
      source,
      created_at: new Date().toISOString(),
    })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      })
    }

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