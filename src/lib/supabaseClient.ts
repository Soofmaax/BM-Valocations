import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && anon ? createClient(url, anon) : null;

/**
 * Helper to safely call Supabase. Returns { ok, error }.
 */
export async function insertRow<T extends Record<string, unknown>>(table: string, payload: T) {
  if (!supabase) {
    return { ok: false, error: new Error('Supabase non configuré. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.') };
  }
  const { error } = await supabase.from(table).insert(payload);
  return { ok: !error, error: error ?? null };
}