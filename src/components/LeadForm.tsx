import React, { useState } from 'react';
import { getSavedUTM } from '../utils/utm';

type Props = {
  carTitle?: string;
};

export default function LeadForm({ carTitle }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    marketingConsent: false,
  });
  const [status, setStatus] = useState<{ ok?: boolean; error?: string }>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({});

    const utm = getSavedUTM();

    const res = await fetch('/api/zoho/createLead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        carTitle,
        policyVersion: '1.0',
        ...utm,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setStatus({ error: err?.message || 'Erreur lors de la création du lead.' });
      return;
    }

    setStatus({ ok: true });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Nom"
          className="border p-2 rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <input
        type="tel"
        placeholder="Téléphone"
        className="border p-2 rounded w-full"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
      <textarea
        placeholder="Votre message"
        className="border p-2 rounded w-full"
        rows={4}
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.marketingConsent}
          onChange={e => setForm({ ...form, marketingConsent: e.target.checked })}
        />
        J'accepte de recevoir des offres et communications marketing.
      </label>
      <button type="submit" className="px-4 py-2 bg-black text-white rounded">Envoyer</button>
      {status.ok && <p className="text-green-600 text-sm">Demande envoyée, merci.</p>}
      {status.error && <p className="text-red-600 text-sm">{status.error}</p>}
    </form>
  );
}