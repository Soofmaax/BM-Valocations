import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { vehicles } from '../data/vehicles';

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

      <div className="bg-white border rounded-lg p-4 shadow-sm" aria-live="polite">
        <p className="text-sm text-gray-600">
          Total vehicles available now: <span className="font-semibold">{vehicles.length}</span>
        </p>
      </div>

      <div>
        <Link
          to="/fleet"
          className="inline-flex items-center px-3 py-2 rounded bg-gray-900 text-white hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
        >
          Browse fleet
        </Link>
      </div>
    </section>
  );
}