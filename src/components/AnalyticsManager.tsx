import { useEffect } from 'react';
import { getConsent, loadScript } from '../utils/loadScript';

export default function AnalyticsManager() {
  useEffect(() => {
    const setup = async (consent: any) => {
      if (consent?.analytics) {
        const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
        const ga4 = import.meta.env.VITE_GA4_ID as string | undefined;
        const clarityId = import.meta.env.VITE_CLARITY_ID as string | undefined;

        if (plausibleDomain) {
          await loadScript('https://plausible.io/js/script.js', { 'data-domain': plausibleDomain });
        }

        if (ga4) {
          // gtag loader
          await loadScript(`https://www.googletagmanager.com/gtag/js?id=${ga4}`);
          if (!(window as any).dataLayer) {
            (window as any).dataLayer = (window as any).dataLayer || [];
            function gtag(...args: any[]) {
              (window as any).dataLayer.push(args);
            }
            (window as any).gtag = gtag;
            (window as any).gtag('js', new Date());
            (window as any).gtag('config', ga4);
          }
        }

        if (clarityId) {
          await loadScript(`https://www.clarity.ms/tag/${clarityId}`);
        }
      }
    };

    const initial = getConsent();
    setup(initial);
    const handler = (e: any) => setup(e.detail);
    window.addEventListener('bmva:consent:update', handler);
    return () => window.removeEventListener('bmva:consent:update', handler);
  }, []);

  return null;
}