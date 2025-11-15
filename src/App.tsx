import React, { useEffect } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import { ConsentManager, ConsentLink } from './components/ConsentManager';
import AnalyticsManager from './components/AnalyticsManager';
import ChatManager from './components/ChatManager';
import { initUTMTracker } from './utils/utm';

function Home() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold mb-4">BM-VA Locations</h1>
      <p className="text-gray-700 mb-6">Bienvenue. Ce site est prêt pour Sanity, Zoho CRM et RGPD.</p>
      <div className="flex gap-3 text-sm">
        <NavLink to="/privacy" className="underline">Politique de confidentialité</NavLink>
        <NavLink to="/cookies" className="underline">Politique de cookies</NavLink>
      </div>
      <div className="mt-6">
        <ConsentLink />
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    initUTMTracker();
  }, []);

  return (
    <>
      <AnalyticsManager />
      <ChatManager />
      <ConsentManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Page non trouvée</h2>
            <Link className="underline" to="/">Retour à l’accueil</Link>
          </div>
        } />
      </Routes>
    </>
  );
}