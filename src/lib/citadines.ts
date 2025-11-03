import type { CitadineCar } from '../types';
import { citadines as localCitadines } from '../data/citadines';

function isObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object';
}

const isValidCar = (c: unknown): c is CitadineCar => {
  if (!isObject(c)) return false;
  const v = c as Record<string, unknown>;
  const hasBasicFields =
    typeof v.id === 'number' &&
    typeof v.name === 'string' &&
    typeof v.price === 'number' &&
    typeof v.monthly === 'number' &&
    typeof v.image === 'string' &&
    typeof v.electric === 'boolean' &&
    typeof v.available === 'boolean' &&
    typeof v.location === 'string' &&
    Array.isArray(v.tags);
  if (!hasBasicFields) return false;

  // Optional fields validation
  if (v.gallery != null && !Array.isArray(v.gallery)) return false;
  if (v.specs != null && !isObject(v.specs)) return false;

  return true;
};

/**
 * Load citadines from a public JSON URL if provided, otherwise fall back to local data.
 * Set VITE_CITADINES_URL to a raw JSON URL (e.g., GitHub raw).
 */
export async function loadCitadines(): Promise<CitadineCar[]> {
  const url = import.meta.env.VITE_CITADINES_URL as string | undefined;
  if (!url) return localCitadines;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as unknown;
    if (!Array.isArray(json)) throw new Error('Invalid JSON (not an array)');

    const parsed = (json as unknown[]).filter(isValidCar) as CitadineCar[];
    // If validation filters out everything, use local fallback
    return parsed.length > 0 ? parsed : localCitadines;
  } catch {
    return localCitadines;
  }
}

/**
 * Return local data immediately for instant render, and attempt remote refresh.
 */
export async function loadCitadinesWithFallback(
  onRemote?: (cars: CitadineCar[]) => void
): Promise<CitadineCar[]> {
  const initial = localCitadines;
  // Fire and forget remote fetch
  loadCitadines().then((cars) => {
    if (onRemote) onRemote(cars);
  });
  return initial;
}