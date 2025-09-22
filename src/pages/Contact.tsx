import { Helmet } from 'react-helmet-async';
import ButtonLink from '../components/ui/ButtonLink';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="space-y-6 max-w-xl">
      <Helmet>
        <title>Contact — BM-VA</title>
        <meta
          name="description"
          content="Contact information and support details for BM-VA Locations."
        />
      </Helmet>

      <h2 id="contact-heading" className="text-xl font-semibold">
        Contact us
      </h2>
      <p className="text-gray-600">
        The client requested no contact form. You can reach us using the information below.
      </p>

      <Card aria-labelledby="contact-info-title">
        <CardHeader>
          <CardTitle id="contact-info-title" className="text-lg">
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