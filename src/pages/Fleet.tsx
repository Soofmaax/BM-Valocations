import { Helmet } from 'react-helmet-async';
import { vehicles } from '../data/vehicles';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { CategoryBadge } from '../components/ui/Badge';

export default function Fleet() {
  const description =
    'Browse our fleet of economy, premium, SUV and van vehicles available for rent.';

  return (
    <section aria-labelledby="fleet-heading" className="space-y-4">
      <Helmet>
        <title>Fleet — BM-VA</title>
        <meta name="description" content={description} />

        {/* Social sharing overrides for Fleet page */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bm-valocations.com/fleet" />
        <meta property="og:title" content="Our Fleet — BM-VA Locations" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://bm-valocations.com/og-fleet.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bm-valocations.com/fleet" />
        <meta property="twitter:title" content="Our Fleet — BM-VA Locations" />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://bm-valocations.com/og-fleet.png" />
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