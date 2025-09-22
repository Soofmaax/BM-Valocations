import { Helmet } from 'react-helmet-async';
import { vehicles } from '../data/vehicles';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { CategoryBadge } from '../components/ui/Badge';

export default function Fleet() {
  return (
    <section aria-labelledby="fleet-heading" className="space-y-4">
      <Helmet>
        <title>Fleet — BM-VA</title>
        <meta
          name="description"
          content="Browse our fleet of economy, premium, SUV and van vehicles available for rent."
        />
      </Helmet>

      <h2 id="fleet-heading" className="text-xl font-semibold">
        Our Fleet
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map(v => (
          <Card key={v.id} aria-label={`${v.brand} ${v.model}`} className="hover:shadow transition-shadow">
            <CardTitle>
              {v.brand} {v.model}
            </CardTitle>
            <CardContent>
              <p>Year: {v.year}</p>
              <CategoryBadge className="mt-2" category={v.category} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}