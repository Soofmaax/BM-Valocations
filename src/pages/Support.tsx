import { Helmet } from 'react-helmet-async';
import ButtonLink from '../components/ui/ButtonLink';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Support() {
  const description = 'Support and contact information for BM-VA Locations.';

  return (
    <section aria-labelledby="support-heading" className="space-y-6 max-w-xl">
      <Helmet>
        <title>Support — BM-VA</title>
        <meta name="description" content={description} />

        {/* Social sharing overrides for Support page */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bm-valocations.com/support" />
        <meta property="og:title" content="Support — BM-VA Locations" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://bm-valocations.com/og-support.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bm-valocations.com/support" />
        <meta property="twitter:title" content="Support — BM-VA Locations" />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://bm-valocations.com/og-support.png" />
      </Helmet>

      <h2 id="support-heading" className="text-xl font-semibold">
        Support
      </h2>
      <p className="text-gray-600">
        The client requested no contact form. You can reach us using the information below.
      </p>

      <Card aria-labelledby="support-info-title">
        <CardHeader>
          <CardTitle id="support-info-title" className="text-lg">
            Contact information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-600">Email: </span>
              <a
                href="mailto:hello@bm-va.example.com"
                className="underline hover:no-underline"
              >
                hello@bm-va.example.com
              </a>
            </li>
            <li>
              <span className="text-gray-600">Phone: </span>
              <a href="tel:+33123456789" className="underline hover:no-underline">
                +33 1 23 45 67 89
              </a>
            </li>
            <li>
              <span className="text-gray-600">Hours: </span>
              Mon–Fri 9:00–18:00
            </li>
          </ul>
        </CardContent>
      </Card>

      <div>
        <ButtonLink to="/fleet" variant="primary">
          Browse fleet
        </ButtonLink>
      </div>
    </section>
  );
}