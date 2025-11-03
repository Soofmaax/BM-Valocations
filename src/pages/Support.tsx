import { Helmet } from 'react-helmet-async';
import ButtonLink from '../components/ui/ButtonLink';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Support() {
  const description = 'Support et informations de contact pour BM-VA Locations.';

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
        Aucun formulaire de contact. Pour toute demande ou problème concernant le site, merci de passer par notre page de contact.
      </p>

      <Card aria-labelledby="support-info-title">
        <CardHeader>
          <CardTitle id="support-info-title" className="text-lg">
            Informations de contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-600">Site&nbsp;: </span>
              <a
                href="https://smarterlogiqueweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                smarterlogiqueweb.com
              </a>
            </li>
            <li>
              <span className="text-gray-600">Email&nbsp;: </span>
              <a href="mailto:contact@smarterlogiqueweb.com" className="underline hover:no-underline">
                contact@smarterlogiqueweb.com
              </a>
            </li>
            <li>
              <span className="text-gray-600">Horaires&nbsp;: </span>
              Lun–Ven 9:00–18:00
            </li>
          </ul>
        </CardContent>
      </Card>

      <div>
        <ButtonLink to="/fleet" variant="primary">
          Voir la flotte
        </ButtonLink>
      </div>
    </section>
  );
}