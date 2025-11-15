export function loadScript(src: string, attrs: Record<string, string> = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(s);
  });
}

export type ConsentCategories = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export const CONSENT_KEY = 'bmva_consent_v1';

export function getConsent(): ConsentCategories | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentCategories;
  } catch {
    return null;
  }
}

export function setConsent(consent: ConsentCategories) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent('bmva:consent:update', { detail: consent }));
}