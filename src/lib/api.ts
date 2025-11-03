/**
 * Call a Supabase Edge Function with JSON payload.
 * Requires:
 *  - VITE_SUPABASE_URL
 *  - VITE_SUPABASE_ANON_KEY
 */
function extractErrorMessage(data: unknown): string | null {
  if (data && typeof data === 'object') {
    const maybe = data as Record<string, unknown>;
    const msg = maybe.error;
    if (typeof msg === 'string' && msg.trim().length > 0) {
      return msg;
    }
  }
  return null;
}

export async function callEdge<T = unknown>(name: string, payload: Record<string, unknown>) {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !anon) {
    return { ok: false, status: 0, data: null as T | null, error: new Error('Supabase non configuré côté client.') };
  }

  const res = await fetch(`${url}/functions/v1/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: anon,
      Authorization: `Bearer ${anon}`,
    },
    body: JSON.stringify(payload),
  });

  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    // ignore parse errors
  }

  if (!res.ok) {
    const msg = extractErrorMessage(data);
    return { ok: false, status: res.status, data, error: new Error(msg ?? 'Edge function error') };
  }
  return { ok: true, status: res.status, data, error: null };
}