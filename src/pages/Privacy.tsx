import React from 'react';

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Politique de confidentialité</h1>
      <p className="text-gray-700 mb-3">
        Cette page décrit la manière dont nous collectons, utilisons et protégeons vos données personnelles, conformément
        au RGPD.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Finalités et bases légales</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Répondre à vos demandes d'information (intérêt légitime).</li>
        <li>Prospection commerciale si vous y avez consenti (consentement).</li>
        <li>Mesure d'audience et amélioration du site (consentement).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Vos droits</h2>
      <p className="text-gray-700">
        Vous disposez des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité.
        Contactez-nous à l'adresse email indiquée pour exercer vos droits.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Transferts hors UE</h2>
      <p className="text-gray-700">
        Certains prestataires peuvent être situés hors de l'UE. Nous mettons en œuvre des garanties appropriées.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact DPO</h2>
      <p className="text-gray-700">Pour toute question, contactez notre délégué à la protection des données (DPO).</p>
    </main>
  );
}