import React, { useEffect, useMemo, useState } from 'react';
import { fetchCars, type Car } from '../data/cars';
import CarCard from '../components/CarCard';

type Filter = 'all' | 'sale' | 'rental';

export default function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchCars();
        setCars(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return cars;
    return cars.filter(c => (c.listingType || 'rental') === filter);
  }, [cars, filter]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold">Nos voitures</h1>
      <p className="text-gray-700 mt-2">Découvrez nos véhicules à vendre et à louer.</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded border ${filter==='all' ? 'bg-black text-white' : 'bg-white'}`}
        >
          Tout
        </button>
        <button
          onClick={() => setFilter('sale')}
          className={`px-3 py-1 rounded border ${filter==='sale' ? 'bg-black text-white' : 'bg-white'}`}
        >
          À vendre
        </button>
        <button
          onClick={() => setFilter('rental')}
          className={`px-3 py-1 rounded border ${filter==='rental' ? 'bg-black text-white' : 'bg-white'}`}
        >
          À louer
        </button>
      </div>

      {loading ? (
        <div className="mt-6 text-gray-600">Chargement...</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(car => (
            <CarCard key={car._id} car={car} />
          ))}
          {filtered.length === 0 && (
            <div className="text-gray-600">Aucun véhicule dans cette catégorie pour le moment.</div>
          )}
        </div>
      )}
    </main>
  );
}