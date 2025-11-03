import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteFocusHandler() {
  const location = useLocation();
  useEffect(() => {
    const main = document.getElementById('main-content') as HTMLDivElement | null;
    if (main) {
      main.focus();
    }
    // Ensure scroll to top on route changes for consistent UX across pages
    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch {
        // Fallback for environments that don't support options (e.g., JSDOM)
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname]);
  return null;
}