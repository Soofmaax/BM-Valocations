import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCarBySlug, type Car } from '../data/cars';
import LeadForm from '../components/LeadForm';

export default function CarDetail() {
  const { slug } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await fetchCarBySlug(slug);
        setCar(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return <main className="mx-auto max-w-4xl p-6">Chargement...</main>;
  }

  if (!car) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-xl font-semibold">Véhicule introuvable</h1>
        <Link className="underline mt-2 inline-block" to="/cars">Retour à la liste</Link>
      </main>
    );
  }

  const priceLabel = car.listingType === 'rental'
    ? (car.rentalPricePerDay ? `${car.rentalPricePerDay}€ / jour` : 'Prix sur demande')
    : (car.price ? `${car.price}€` : 'Prix sur demande');

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Link className="underline text-sm mb-4 inline-block" to="/cars">← Retour à la liste</Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {car.images?.[0]?.url ? (
            <div className="aspect-video bg-gray-100 rounded overflow-hidden">
              <img src={car.images[0].url} alt={car.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 rounded" />
          )}
          {car.images && car.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {car.images.slice(1).map((img, i) => (
                <img key={i} src={img.url} alt={`${car.title} ${i+1}`} className="w-full h-20 object-cover rounded bg-gray-100" />
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{car.title}</h1>
          <div className="mt-2 text-gray-700">
            {(car.brand || car.model) && <div>{car.brand} {car.model}</div>}
            <div className="flex gap-3 mt-1 text-sm">
              {car.year && <span>{car.year}</span>}
              {car.mileage && <span>{car.mileage.toLocaleString()} km</span>}
              {car.fuel && <span>{car.fuel}</span>}
              {car.transmission && <span>{car.transmission}</span>}
              {car.status && <span>{car.status}</span>}
            </div>
          </div>
          <div className="mt-3 font-medium">{priceLabel}</div>

          {car.features && car.features.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Options</h2>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {car.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}

          {car.description && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="text-gray-700 text-sm">{car.description}</p>
            </div>
          )}

          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Demande d’information</h2>
            <LeadForm carTitle={car.title} />
          </div>
        </div>
      </div>
    </main>
  );
}