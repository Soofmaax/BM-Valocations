import { Helmet } from 'react-helmet-async';
import { vehicles } from '../data/vehicles';
import ButtonLink from '../components/ui/ButtonLink';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Home() {
  const description =
    'Premium, reliable car rental services. Explore economy, premium, SUV and van categories.';

  return (
    <section aria-labelledby="home-heading" className="space-y-6">
      <Helmet>
        <title>BM-VA — Premium Car Rental</title>
        <meta name="description" content={description} />

        {/* Social sharing overrides for Home page */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bm-valocations.com/" />
        <meta property="og:title" content="BM-VA Locations — Premium Car Rental" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://bm-valocations.com/og-home.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bm-valocations.com/" />
        <meta property="twitter:title" content="BM-VA Locations — Premium Car Rental" />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://bm-valocations.com/og-home.png" />
      </Helmet>

      <h2 id="home-heading" className="text-xl font-semibold">
        Welcome to BM-VA Locations
      </h2>
      <p className="text-gray-600 max-w-prose">
        Premium, reliable car rental services. Explore our fleet of economy, premium, SUV and van
        categories to find the perfect ride.
      </p>

      <Card aria-live="polite">
        <CardHeader>
          <CardTitle className="text-lg">Fleet overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Total vehicles available now: <span className="font-semibold">{vehicles.length}</span>
          </p>
        </CardContent>
      </Card>

      <div>
        <ButtonLink to="/fleet" variant="primary" size="md">
          Browse fleet
        </ButtonLink>
      </div>
    </section>
  );
}