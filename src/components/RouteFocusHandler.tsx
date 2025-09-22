import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteFocusHandler() {
  const location = useLocation();
  useEffect(() => {
    const main = document.getElementById('main-content') as HTMLDivElement | null;
    if (main) {
      main.focus();
    }
  }, [location.pathname]);
  return null;
}