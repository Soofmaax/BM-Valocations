import { useEffect, useState } from 'react';
import Button from './ui/Button';

const STORAGE_KEY = 'construction_notice_dismissed_v1';

function isProd(): boolean {
  // Show only on production builds (not in dev)
  return !import.meta.env.DEV;
}

export default function ConstructionNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isProd()) return;
    const suppressed = new URLSearchParams(window.location.search).get('no-notice') === '1';
    if (suppressed) return;
    const dismissed = localStorage.getItem(STORAGE_KEY) === '1';
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="construction-title"
      aria-describedby="construction-desc"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4"
    >
      <div className="w-full max-w-lg rounded-brand shadow-brand bg-white border animate-scale-in">
        <div className="p-4 sm:p-5">
          <h2 id="construction-title" className="text-lg font-semibold">
            Site en construction
          </h2>
          <p id="construction-desc" className="mt-2 text-sm text-gray-600">
            Ce site est en cours de finalisation. Certaines pages, contenus ou visuels peuvent
            évoluer. Merci de votre compréhension.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="primary"
              onClick={() => {
                localStorage.setItem(STORAGE_KEY, '1');
                setVisible(false);
              }}
            >
              OK, fermer
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setVisible(false);
              }}
            >
              Masquer pour cette visite
            </Button>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Astuce: ajoutez <code>?no-notice=1</code> à l’URL pour masquer temporairement l’avertissement
            (utile pour les revues).
          </p>
        </div>
      </div>
    </div>
  );
}