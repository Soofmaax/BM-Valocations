import { Helmet } from 'react-helmet-async';
import { vehicles } from '../data/vehicles';
import ButtonLink from '../components/ui/ButtonLink';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Home() {
  return (
    <section aria-labelledby="home-heading" className="space-y-6">
      <Helmet>
        <title>BM-VA — Premium Car Rental</title>
        <meta
          name="description"
          content="Premium, reliable car rental services. Explore economy, premium, SUV and van categories."
        />
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