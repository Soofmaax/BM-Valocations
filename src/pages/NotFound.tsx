import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <section aria-labelledby="notfound-heading" className="space-y-6 py-12 text-center">
      <Helmet>
        <title>Page not found — BM-VA</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      <h2 id="notfound-heading" className="text-3xl font-semibold">
        404 — Page not found
      </h2>
      <p className="text-gray-600 max-w-prose mx-auto">
        The page you requested could not be found. It might have been moved or deleted.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center px-3 py-2 rounded bg-gray-900 text-white hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}