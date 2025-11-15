import React, { useState } from 'react';
import type { Car } from '../data/cars';
import LeadForm from './LeadForm';
import { Link } from 'react-router-dom';

type Props = {
  car: Car;
};

export default function CarCard({ car }: Props) {
  const [showForm, setShowForm] = useState(false);
  const img = car.images?.[0]?.url;

  const priceLabel = car.listingType === 'rental'
    ? (car.rentalPricePerDay ? `${car.rentalPricePerDay}€ / jour` : 'Prix sur demande')
    : (car.price ? `${car.price}€` : 'Prix sur demande');

  const badge = car.listingType === 'rental' ? 'À louer' : 'À vendre';

  const to = car.slug?.current ? `/cars/${car.slug.current}` : undefined;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      {img && (
        <div className="aspect-video bg-gray-100">
          {to ? (
            <Link to={to} aria-label={`Voir ${car.title}`}>
              <img src={img} alt={car.title} className="w-full h-full object-cover" />
            </Link>
          ) : (
            <img src={img} alt={car.title} className="w-full h-full object-cover" />
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {to ? <Link to={to}>{car.title}</Link> : car.title}
          </h3>
          <span className="text-xs px-2 py-1 rounded bg-gray-100">{badge}</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {(car.brand || car.model) && <div>{car.brand} {car.model}</div>}
          <div className="flex gap-3 mt-1">
            {car.year && <span>{car.year}</span>}
            {car.mileage && <span>{car.mileage.toLocaleString()} km</span>}
            {car.fuel && <span>{car.fuel}</span>}
            {car.transmission && <span>{car.transmission}</span>}
          </div>
        </div>
        <div className="mt-3 font-medium">{priceLabel}</div>

        <div className="mt-4">
          {!showForm ? (
            <div className="flex gap-2">
              {to && (
                <Link to={to} className="px-4 py-2 border rounded">
                  Voir détail
                </Link>
              )}
              <button className="px-4 py-2 bg-black text-white rounded" onClick={() => setShowForm(true)}>
                Demander des informations
              </button>
            </div>
          ) : (
            <div className="mt-2">
              <LeadForm carTitle={car.title} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}