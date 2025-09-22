import { useMemo, useState } from 'react';
import type { Vehicle } from './types';

const initialVehicles: Vehicle[] = [
  { id: '1', brand: 'Toyota', model: 'Corolla', year: 2021, category: 'economy' },
  { id: '2', brand: 'BMW', model: '3 Series', year: 2023, category: 'premium' },
  { id: '3', brand: 'Peugeot', model: '208', year: 2022, category: 'economy' },
];

export default function App() {
  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const premiumCount = useMemo(
    () => vehicles.filter(v => v.category === 'premium').length,
    [vehicles]
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-6 border-b bg-white">
        <h1 className="text-2xl font-semibold tracking-tight">BM-VA Locations</h1>
        <p className="text-sm text-gray-500">Premium car rental services</p>
      </header>

      <main className="p-6 space-y-6 animate-fade-in">
        <section className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Fleet overview</h2>
          <p className="text-sm text-gray-600">
            Total vehicles: <span className="font-semibold">{vehicles.length}</span> • Premium:{' '}
            <span className="font-semibold">{premiumCount}</span>
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map(v => (
            <article
              key={v.id}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition-shadow animate-scale-in"
            >
              <h3 className="font-semibold">
                {v.brand} {v.model}
              </h3>
              <p className="text-sm text-gray-600">Year: {v.year}</p>
              <span
                className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                  v.category === 'premium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {v.category}
              </span>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}