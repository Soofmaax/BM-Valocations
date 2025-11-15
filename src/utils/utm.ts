export type UTM = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

const UTM_KEY = 'bmva_utm_v1';

export function parseUTMFromURL(search = window.location.search): UTM {
  const p = new URLSearchParams(search);
  const utm: UTM = {
    utm_source: p.get('utm_source') || undefined,
    utm_medium: p.get('utm_medium') || undefined,
    utm_campaign: p.get('utm_campaign') || undefined,
    utm_content: p.get('utm_content') || undefined,
    utm_term: p.get('utm_term') || undefined,
  };
  return utm;
}

export function saveUTM(utm: UTM) {
  try {
    localStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {}
}

export function getSavedUTM(): UTM | null {
  try {
    const raw = localStorage.getItem(UTM_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UTM;
  } catch {
    return null;
  }
}

export function initUTMTracker() {
  try {
    const utm = parseUTMFromURL();
    const hasAny = Object.values(utm).some(Boolean);
    if (hasAny) saveUTM(utm);
  } catch {}
}