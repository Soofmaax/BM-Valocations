import type { CitadineCar } from '../types';
import { citadines as localCitadines } from '../data/citadines';

const isValidCar = (c: any): c is CitadineCar =>
  c &&
  typeof c.id === 'number' &&
  typeof c.name === 'string' &&
  typeof c.price === 'number' &&
  typeof c.monthly === 'number' &&
  typeof c.image === 'string' &&
  typeof c.electric === 'boolean' &&
  typeof c.available === 'boolean' &&
  typeof c.location === 'string' &&
  Array.isArray(c.tags);

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