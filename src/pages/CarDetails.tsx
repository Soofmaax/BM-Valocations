import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MapPin, Zap, ArrowRight, X } from 'lucide-react';
import { citadines } from '../data/citadines';
import { callEdge } from '../lib/api';
import { track } from '../lib/analytics';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = citadines.find((c) => String(c.id) === id);

  const [activeImg, setActiveImg] = useState(0);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveEmail, setReserveEmail] = useState('');
  const [reserveWhen, setReserveWhen] = useState('');
  const [reserveStatus, setReserveStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-2">Voiture introuvable</h2>
        <p className="text-gray-600 mb-6">La voiture demandée n'existe pas ou a été retirée.</p>
        <Link to="/" className="text-orange-600 hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const title = `${car.name} — Détails`;
  const gallery = useMemo(() => car.gallery && car.gallery.length > 0 ? car.gallery : [car.image], [car]);

  const submitReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setReserveStatus('loading');
    const { ok } = await callEdge('test-drive', {
      email: reserveEmail,
      when: reserveWhen,
      car_id: car.id,
      car_name: car.name,
      source: 'details',
    });
    if (ok) {
      setReserveStatus('sent');
      track('details_testdrive_submit', { carId: car.id });
      setTimeout(() => setReserveOpen(false), 800);
      setReserveEmail('');
      setReserveWhen('');
    } else {
      setReserveStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Détails, prix et disponibilité de ${car.name}.`} />
      </Helmet>

      <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
        <button onClick={() => navigate(-1)} className="hover:underline">
          ← Retour
        </button>
        <span className="mx-2">/</span>
        <Link to="/" className="hover:underline">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{car.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative">
            <img
              src={gallery[activeImg]}
              alt={`${car.name} image ${activeImg + 1}`}
              className="w-full h-80 object-cover rounded-3xl shadow-2xl"
            />
            {car.electric && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Zap size={14} />
                Électrique
              </div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  aria-label={`Voir image ${idx + 1}`}
                  className={`h-16 rounded-xl overflow-hidden border ${
                    idx === activeImg ? 'border-orange-500' : 'border-transparent'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{car.emoji}</span>
            <h1 className="text-3xl font-bold">{car.name}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-orange-600">{car.price.toLocaleString()}€</span>
            <span className="text-gray-500">ou</span>
            <span className="text-2xl font-semibold text-gray-800">{car.monthly}€/mois</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={18} className="text-orange-500" />
            <span>{car.location}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {car.tags.map((t, i) => (
              <span key={i} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                {t}
              </span>
            ))}
          </div>

          {car.specs && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              {car.specs.seats !== undefined && (
                <div className="bg-white rounded-xl p-3 shadow-sm border">Places: {car.specs.seats}</div>
              )}
              {car.specs.doors !== undefined && (
                <div className="bg-white rounded-xl p-3 shadow-sm border">Portes: {car.specs.doors}</div>
              )}
              {car.specs.transmission && (
                <div className="bg-white rounded-xl p-3 shadow-sm border">
                  Boîte: {car.specs.transmission === 'auto' ? 'Automatique' : 'Manuelle'}
                </div>
              )}
              {car.specs.powerKw !== undefined && (
                <div className="bg-white rounded-xl p-3 shadow-sm border">Puissance: {car.specs.powerKw} kW</div>
              )}
              {car.specs.rangeKm !== undefined && (
                <div className="bg-white rounded-xl p-3 shadow-sm border">Autonomie: {car.specs.rangeKm} km</div>
              )}
              {car.specs.trunkLiters !== undefined && (
                <div className="bg-white rounded-xl p-3 shadow-sm border">Coffre: {car.specs.trunkLiters} L</div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => {
                setReserveOpen(true);
                track('details_testdrive_open', { carId: car.id });
              }}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition flex items-center gap-2"
            >
              Réserver un essai
              <ArrowRight size={18} />
            </button>
            <a
              href={`mailto:contact@bm-valocations.com?subject=${encodeURIComponent(
                `Infos ${car.name}`
              )}`}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Demander plus d'infos
            </a>
          </div>

          {!car.available && (
            <div className="text-sm text-gray-600">
              Non disponible actuellement — vous pouvez demander à être notifié.
            </div>
          )}
        </div>
      </div>

      {/* Reserve modal */}
      {reserveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setReserveOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Réserver un essai — {car.name}</h3>
              <button aria-label="Fermer" onClick={() => setReserveOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitReserve} className="space-y-3">
              <input
                type="email"
                required
                value={reserveEmail}
                onChange={(e) => setReserveEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                required
                value={reserveWhen}
                onChange={(e) => setReserveWhen(e.target.value)}
                placeholder="Quand souhaitez-vous essayer ?"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                disabled={reserveStatus === 'loading'}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition disabled:opacity-60"
              >
                {reserveStatus === 'loading' ? 'Envoi…' : reserveStatus === 'sent' ? 'Envoyé ✓' : 'Envoyer la demande'}
              </button>
              {reserveStatus === 'error' && (
                <p className="text-sm text-red-600">
                  Une erreur est survenue. Vérifiez la configuration Supabase côté client.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}