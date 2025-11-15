import { useEffect } from 'react';
import { getConsent } from '../utils/loadScript';

function injectSalesIQ(region: 'eu' | 'us', widgetCode: string) {
  if (document.getElementById('zsiqscript')) return;
  const base = region === 'eu' ? 'https://salesiq.zoho.eu' : 'https://salesiq.zoho.com';

  (window as any).$zoho = (window as any).$zoho || {};
  (window as any).$zoho.salesiq = (window as any).$zoho.salesiq || { widgetcode: widgetCode, values: {}, ready: function () {} };

  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.id = 'zsiqscript';
  s.defer = true;
  s.src = `${base}/widget`;
  const t = document.getElementsByTagName('script')[0];
  t.parentNode?.insertBefore(s, t);
}

export default function ChatManager() {
  useEffect(() => {
    const setup = async (consent: any) => {
      if (consent?.marketing) {
        const regionEnv = (import.meta.env.VITE_ZOHO_REGION as string | undefined) || 'eu';
        const widgetCode = import.meta.env.VITE_ZOHO_SALESIQ_WIDGET_CODE as string | undefined;
        if (widgetCode) {
          injectSalesIQ(regionEnv === 'us' ? 'us' : 'eu', widgetCode);
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