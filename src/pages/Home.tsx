import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Zap, Heart, Check, Star, ArrowRight, Phone, Calendar, X } from 'lucide-react';
import type { CitadineCar } from '../types';
import { callEdge } from '../lib/api';
import { track } from '../lib/analytics';
import { loadCitadinesWithFallback } from '../lib/citadines';

const DEFAULT_BUDGET_CAP = 8000;

export default function Home() {
  const [activeTab, setActiveTab] = useState<'achat' | 'location'>('achat');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [budgetCap, setBudgetCap] = useState<number>(DEFAULT_BUDGET_CAP);
  const [notifyCarId, setNotifyCarId] = useState<number | null>(null);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [testDriveEmail, setTestDriveEmail] = useState('');
  const [testDriveWhen, setTestDriveWhen] = useState('');
  const [testDriveStatus, setTestDriveStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState<CitadineCar[]>([]);

  const description =
    "Louez ou achetez la voiture parfaite pour votre vie urbaine. Simple, rapide, et sans prise de tête.";

  // Init from URL + load cars (local first, then remote)
  useEffect(() => {
    const filtersParam = searchParams.get('filters');
    const budgetParam = searchParams.get('budget');
    if (filtersParam) {
      try {
        const decoded = decodeURIComponent(filtersParam);
        const arr = decoded.split(',').map((s) => s.trim()).filter(Boolean);
        setActiveFilters(arr);
      } catch {
        // ignore
      }
    }
    if (budgetParam && !Number.isNaN(Number(budgetParam))) {
      setBudgetCap(Number(budgetParam));
    }
    // Load local immediately, then replace with remote if available
    loadCitadinesWithFallback((remote) => setCars(remote)).then((local) => setCars(local));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only once on mount

  // Persist to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (activeFilters.length > 0) {
      params.set('filters', encodeURIComponent(activeFilters.join(',')));
    } else {
      params.delete('filters');
    }
    if (budgetCap !== DEFAULT_BUDGET_CAP) {
      params.set('budget', String(budgetCap));
    } else {
      params.delete('budget');
    }
    setSearchParams(params, { replace: true });
  }, [activeFilters, budgetCap]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
    track('favorite_toggle', { id });
  };

  const toggleFilter = (label: string) => {
    setActiveFilters((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
    track('filter_toggle', { label });
  };

  const matchesFilter = (car: CitadineCar, label: string) => {
    switch (label) {
      case 'Électrique':
        return car.electric || car.tags.some((t) => /électrique/i.test(t));
      case 'Petits budgets':
        return car.price <= budgetCap || car.tags.includes('Petits budgets');
      case 'Facile à garer':
        return car.tags.includes('Facile à garer');
      case 'Éco':
        return car.tags.includes('Éco') || car.electric;
      case 'Weekend':
        return car.tags.includes('Fun') || car.tags.includes('Parfait ville');
      case 'Famille':
        return car.tags.includes('Famille');
      default:
        return car.tags.includes(label);
    }
  };

  const filteredCars = useMemo(() => {
    if (activeFilters.length === 0) return cars;
    return cars.filter((car) => activeFilters.some((f) => matchesFilter(car, f)));
  }, [cars, activeFilters, budgetCap]);

  const openNotifyModal = (carId: number) => {
    setNotifyCarId(carId);
    setNotifyEmail('');
    setNotifyStatus('idle');
    track('notify_open', { carId });
  };

  const submitNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyCarId) return;
    setNotifyStatus('loading');
    const car = cars.find((c) => c.id === notifyCarId);
    const { ok } = await callEdge('notify', {
      email: notifyEmail,
      car_id: notifyCarId,
      car_name: car?.name,
      source: 'landing',
    });
    if (ok) {
      setNotifyStatus('sent');
      track('notify_submit', { carId: notifyCarId });
      setTimeout(() => setNotifyCarId(null), 800);
    } else {
      setNotifyStatus('error');
    }
  };

  const submitTestDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestDriveStatus('loading');
    const { ok } = await callEdge('test-drive', {
      email: testDriveEmail,
      when: testDriveWhen,
      source: 'landing',
    });
    if (ok) {
      setTestDriveStatus('sent');
      track('testdrive_submit', {});
      setTimeout(() => setTestDriveOpen(false), 800);
      setTestDriveEmail('');
      setTestDriveWhen('');
    } else {
      setTestDriveStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      <Helmet>
        <title>CitaDrive — Citadines à louer ou acheter</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🚗</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              CitaDrive
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-gray-700">
            <a href="#nos-voitures" className="hover:text-orange-500 transition">
              Nos voitures
            </a>
            <a href="#comment-ca-marche" className="hover:text-orange-500 transition">
              Comment ça marche
            </a>
            <a href="#temoignages" className="hover:text-orange-500 transition">
              Témoignages
            </a>
          </nav>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition flex items-center gap-2">
            <Phone size={18} />
            <span className="hidden md:inline">Appelez-nous</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                ✨ Plus de 500 citadines disponibles
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Votre citadine idéale
                <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                  vous attend
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Louez ou achetez la voiture parfaite pour votre vie urbaine. Simple, rapide, et sans
                prise de tête.
              </p>

              {/* Quick Search */}
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('achat')}
                    className={`flex-1 py-3 rounded-xl font-medium transition ${
                      activeTab === 'achat'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Acheter
                  </button>
                  <button
                    onClick={() => setActiveTab('location')}
                    className={`flex-1 py-3 rounded-xl font-medium transition ${
                      activeTab === 'location'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Louer
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <MapPin className="text-orange-500" size={20} />
                    <input
                      type="text"
                      placeholder="Où cherchez-vous ?"
                      className="flex-1 bg-transparent outline-none text-gray-700"
                    />
                  </div>

                  {activeTab === 'location' && (
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                      <Calendar className="text-orange-500" size={20} />
                      <input
                        type="text"
                        placeholder="Dates de location"
                        className="flex-1 bg-transparent outline-none text-gray-700"
                      />
                    </div>
                  )}

                  <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-medium hover:shadow-lg transition flex items-center justify-center gap-2">
                    <Search size={20} />
                    Rechercher
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="text-green-500" size={18} />
                  <span>Livraison possible</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-500" size={18} />
                  <span>Essai gratuit</span>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f8563?w=800&q=80"
                alt="Citadine"
                className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Case Filters */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { icon: '🅿️', label: 'Facile à garer' },
            { icon: '⚡', label: 'Électrique' },
            { icon: '👶', label: 'Famille' },
            { icon: '💚', label: 'Éco' },
            { icon: '🎒', label: 'Weekend' },
            { icon: '💸', label: 'Petits budgets' },
          ].map((filter, i) => {
            const active = activeFilters.includes(filter.label);
            return (
              <button
                key={i}
                onClick={() => toggleFilter(filter.label)}
                className={`px-6 py-3 rounded-full font-medium transition flex items-center gap-2 shadow-sm border-2 ${
                  active
                    ? 'bg-orange-100 border-orange-300 text-orange-700'
                    : 'bg-white hover:bg-orange-50 border-gray-200 hover:border-orange-300 text-gray-700'
                }`}
                aria-pressed={active}
              >
                <span className="text-xl">{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
        {/* Budget cap control (optionnel) */}
        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-700">
          <span>Plafond petits budgets:</span>
          <input
            type="number"
            min={1000}
            step={100}
            value={budgetCap}
            onChange={(e) => setBudgetCap(Number(e.target.value))}
            className="w-28 border rounded-lg px-3 py-1 text-right"
          />
          <span>€</span>
        </div>
      </section>

      {/* Cars Grid */}
      <section id="nos-voitures" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos citadines disponibles</h2>
          <p className="text-xl text-gray-600">
            Trouvez la voiture qui correspond à votre style de vie urbain
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                />
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
                  aria-label={favorites.includes(car.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  <Heart
                    size={20}
                    className={favorites.includes(car.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  />
                </button>
                {!car.available && (
                  <div className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
                    Bientôt dispo
                  </div>
                )}
                {car.electric && (
                  <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Zap size={14} />
                    Électrique
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{car.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-orange-500">{car.price.toLocaleString()}€</span>
                  <span className="text-gray-500">ou</span>
                  <span className="text-lg font-semibold text-gray-700">{car.monthly}€/mois</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={16} className="text-orange-500" />
                  <span>{car.location}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {car.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {car.available ? (
                  <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                    className="w-full py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg"
                  >
                    <span>Voir les détails</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => openNotifyModal(car.id)}
                    className="w-full py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <span>Me prévenir</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">1200+</div>
              <div className="text-gray-600">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">4.8★</div>
              <div className="text-gray-600">Note moyenne</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-600">Voitures disponibles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="temoignages" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="fill-yellow-300 text-yellow-300" />
            ))}
          </div>
          <p className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed">
            "Je me gare en 2 minutes chrono maintenant ! Plus de stress, plus de tours de quartier
            pendant 20 minutes. Ma Fiat 500 est parfaite pour Paris."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">👩‍🎨</div>
            <div>
              <div className="font-bold text-lg">Marie D.</div>
              <div className="text-orange-100">28 ans, graphiste à Belleville</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Prêt à trouver votre citadine ?</h2>
          <p className="text-xl text-gray-300 mb-8">Essayez gratuitement pendant 24h, sans engagement</p>
          <button
            onClick={() => setTestDriveOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl transition transform hover:scale-105"
          >
            Réserver un essai gratuit
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🚗</span>
                <span className="text-xl font-bold text-white">CitaDrive</span>
              </div>
              <p className="text-sm">La mobilité urbaine accessible à tous</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Nos services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Achat
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Location
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Revente
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Aide</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-orange-400">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Assurance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Suivez-nous</h4>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="hover:text-orange-400">
                  📘
                </a>
                <a href="#" className="hover:text-orange-400">
                  📷
                </a>
                <a href="#" className="hover:text-orange-400">
                  🐦
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 CitaDrive. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Notify Modal */}
      {notifyCarId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setNotifyCarId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Me prévenir</h3>
              <button aria-label="Fermer" onClick={() => setNotifyCarId(null)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Laissez-nous votre email pour être alerté dès que cette voiture est disponible.
            </p>
            <form onSubmit={submitNotify} className="space-y-3">
              <input
                type="email"
                required
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                disabled={notifyStatus === 'loading'}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition disabled:opacity-60"
              >
                {notifyStatus === 'loading' ? 'Envoi…' : notifyStatus === 'sent' ? 'Envoyé ✓' : 'Envoyer'}
              </button>
              {notifyStatus === 'error' && (
                <p className="text-sm text-red-600">
                  Une erreur est survenue. Vérifiez la configuration Supabase côté client.
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Test Drive Modal */}
      {testDriveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setTestDriveOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Réserver un essai gratuit</h3>
              <button aria-label="Fermer" onClick={() => setTestDriveOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitTestDrive} className="space-y-3">
              <input
                type="email"
                required
                value={testDriveEmail}
                onChange={(e) => setTestDriveEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                required
                value={testDriveWhen}
                onChange={(e) => setTestDriveWhen(e.target.value)}
                placeholder="Quand souhaitez-vous essayer ?"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                disabled={testDriveStatus === 'loading'}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition disabled:opacity-60"
              >
                {testDriveStatus === 'loading' ? 'Envoi…' : testDriveStatus === 'sent' ? 'Envoyé ✓' : 'Envoyer la demande'}
              </button>
              {testDriveStatus === 'error' && (
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