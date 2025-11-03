type EventParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: EventParams = {}) {
  // If Google Analytics gtag is available, forward the event
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', event, params);
  }
  // Always log to console for debugging
  // eslint-disable-next-line no-console
  console.log('[analytics]', event, params);
}