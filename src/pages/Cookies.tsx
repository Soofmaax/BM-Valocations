import React from 'react';

export default function Cookies() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Politique de cookies</h1>
      <p className="text-gray-700 mb-3">
        Les cookies sont de petits fichiers déposés sur votre appareil pour assurer le bon fonctionnement du site,
        mesurer l'audience et proposer des contenus et publicités pertinentes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Catégories de cookies</h2>
      <ul className="list-disc ml-6 text-gray-700 space-y-1">
        <li><span className="font-medium">Essentiels</span>: nécessaires au fonctionnement du site.</li>
        <li><span className="font-medium">Statistiques / Analytics</span>: mesure d'audience.</li>
        <li><span className="font-medium">Marketing</span>: publicités et retargeting.</li>
        <li><span className="font-medium">Préférences</span>: enregistrement de vos choix.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Gestion du consentement</h2>
      <p className="text-gray-700">
        Vous pouvez modifier vos préférences à tout moment via le lien en bas de page “Modifier mes préférences cookies”.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Durées de conservation</h2>
      <p className="text-gray-700">Les durées varient selon les cookies. Elles sont indiquées le cas échéant.</p>
    </main>
  );
}