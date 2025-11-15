import React, { useEffect, useState } from 'react';
import { CONSENT_KEY, getConsent, setConsent, type ConsentCategories } from '../utils/loadScript';

const defaultConsent: ConsentCategories = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

export function ConsentManager() {
  const [consent, updateConsent] = useState<ConsentCategories>(defaultConsent);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setShowBanner(true);
    } else {
      updateConsent(existing);
    }
  }, []);

  useEffect(() => {
    // expose current consent
    (window as any).bmvaConsent = consent;
  }, [consent]);

  function acceptAll() {
    const next = { essential: true, analytics: true, marketing: true, preferences: true };
    updateConsent(next);
    setConsent(next);
    setShowBanner(false);
    setShowModal(false);
  }

  function rejectAll() {
    const next = { essential: true, analytics: false, marketing: false, preferences: false };
    updateConsent(next);
    setConsent(next);
    setShowBanner(false);
    setShowModal(false);
  }

  function saveChoices() {
    setConsent(consent);
    setShowBanner(false);
    setShowModal(false);
  }

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="mx-auto max-w-5xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-sm text-gray-700">
              Nous utilisons des cookies pour améliorer votre expérience, mesurer l'audience et proposer des offres
              adaptées. Vous pouvez accepter, refuser ou personnaliser vos choix.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border rounded-md" onClick={() => setShowModal(true)}>
                Personnaliser
              </button>
              <button className="px-4 py-2 text-sm bg-gray-100 border rounded-md" onClick={rejectAll}>
                Tout refuser
              </button>
              <button className="px-4 py-2 text-sm bg-black text-white rounded-md" onClick={acceptAll}>
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Préférences de confidentialité</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <input type="checkbox" checked readOnly className="mt-1" />
                <div>
                  <div className="font-medium">Essentiel</div>
                  <div className="text-gray-600">Toujours actif. Nécessaires au fonctionnement du site.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={e => updateConsent({ ...consent, analytics: e.target.checked })}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Statistiques / Analytics</div>
                  <div className="text-gray-600">Mesure d'audience, performance et améliorations.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={e => updateConsent({ ...consent, marketing: e.target.checked })}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Marketing</div>
                  <div className="text-gray-600">Publicités, retargeting, pixels.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={consent.preferences}
                  onChange={e => updateConsent({ ...consent, preferences: e.target.checked })}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Préférences</div>
                  <div className="text-gray-600">Enregistrer vos choix, langues, thèmes, polices.</div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button className="px-3 py-2 text-sm border rounded-md" onClick={() => setShowModal(false)}>
                Annuler
              </button>
              <button className="px-3 py-2 text-sm bg-black text-white rounded-md" onClick={saveChoices}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ConsentLink() {
  return (
    <button
      className="text-sm underline underline-offset-2"
      onClick={() => {
        localStorage.removeItem(CONSENT_KEY);
        window.location.reload();
      }}
    >
      Modifier mes préférences cookies
    </button>
  );
}