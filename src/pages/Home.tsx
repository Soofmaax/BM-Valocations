import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, MapPin, Zap, Heart, Check, Star, ArrowRight, Phone, Calendar } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'achat' | 'location'>('achat');
  const [favorites, setFavorites] = useState<number[]>([]);

  const description =
    "Louez ou achetez la voiture parfaite pour votre vie urbaine. Simple, rapide, et sans prise de tête.";

  const cars = [
    {
      id: 1,
      name: 'Fiat 500 Pop',
      emoji: '🍋',
      price: 8900,
      monthly: 159,
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f8563?w=800&q=80',
      electric: true,
      available: true,
      location: 'Paris 11e',
      tags: ['Facile à garer', 'Électrique', 'Rétro-chic'],
    },
    {
      id: 2,
      name: 'Renault Twingo',
      emoji: '🎨',
      price: 7500,
      monthly: 139,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
      electric: false,
      available: true,
      location: 'Lyon 2e',
      tags: ['Petits budgets', 'Parfait ville', 'Fun'],
    },
    {
      id: 3,
      name: 'Smart EQ',
      emoji: '⚡',
      price: 11900,
      monthly: 189,
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
      electric: true,
      available: false,
      location: 'Marseille',
      tags: ['100% électrique', 'Design unique', 'Éco'],
    },
    {
      id: 4,
      name: 'Citroën C1',
      emoji: '🌈',
      price: 6900,
      monthly: 119,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
      electric: false,
      available: true,
      location: 'Bordeaux',
      tags: ['Super prix', 'Fiable', 'Économique'],
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
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
          ].map((filter, i) => (
            <button
              key={i}
              className="bg-white hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300 px-6 py-3 rounded-full font-medium transition flex items-center gap-2 shadow-sm"
            >
              <span className="text-xl">{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          ))}
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
          {cars.map((car) => (
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

                <button
                  className={`w-full py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                    car.available
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!car.available}
                >
                  {car.available ? (
                    <>
                      <span>Voir les détails</span>
                      <ArrowRight size={18} />
                    </>
                  ) : (
                    <span>Me prévenir</span>
                  )}
                </button>
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
          <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl transition transform hover:scale-105">
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
    </div>
  );
}