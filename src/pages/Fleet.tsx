import { vehicles } from '../data/vehicles';

export default function Fleet() {
  return (
    <section aria-labelledby="fleet-heading" className="space-y-4">
      <h2 id="fleet-heading" className="text-xl font-semibold">
        Our Fleet
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map(v => (
          <article
            key={v.id}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition-shadow"
            aria-label={`${v.brand} ${v.model}`}
          >
            <h3 className="font-semibold">
              {v.brand} {v.model}
            </h3>
            <p className="text-sm text-gray-600">Year: {v.year}</p>
            <span
              className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                v.category === 'premium'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {v.category}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}