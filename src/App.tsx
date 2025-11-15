import React, { useEffect } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import CarsList from './pages/CarsList';
import CarDetail from './pages/CarDetail';
import { ConsentManager, ConsentLink } from './components/ConsentManager';
import AnalyticsManager from './components/AnalyticsManager';
import ChatManager from './components/ChatManager';
import { initUTMTracker } from './utils/utm';
import LeadForm from './components/LeadForm';

function Home() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold mb-4">BM-VA Locations</h1>
      <p className="text-gray-700 mb-6">Bienvenue. Ce site est prêt pour Sanity, Zoho CRM et RGPD.</p>
      <div className="flex gap-4 text-sm">
        <NavLink to="/cars" className="underline">Voir les voitures</NavLink>
        <NavLink to="/privacy" className="underline">Politique de confidentialité</NavLink>
        <NavLink to="/cookies" className="underline">Politique de cookies</NavLink>
      </div>
      <div className="mt-6">
        <ConsentLink />
      </div>

      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-3">Demande d’information</h2>
        <LeadForm carTitle="Demande générale" />
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
        <Route path="/cars" element={<CarsList />} />
        <Route path="/cars/:slug" element={<CarDetail />} />
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