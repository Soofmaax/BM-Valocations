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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return null;
}