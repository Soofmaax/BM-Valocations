import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteAnnouncer() {
  const { pathname } = useLocation();
  const [message, setMessage] = useState('App loaded');

  const titles = useMemo<Record<string, string>>(
    () => ({
      '/': 'Home',
      '/fleet': 'Fleet',
      '/support': 'Support',
    }),
    []
  );

  useEffect(() => {
    const title = titles[pathname] ?? 'Page';
    setMessage(`Navigated to ${title}`);
  }, [pathname, titles]);

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
      {message}
    </div>
  );
}