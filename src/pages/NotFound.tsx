import { Helmet } from 'react-helmet-async';
import ButtonLink from '../components/ui/ButtonLink';

export default function NotFound() {
  return (
    <section
      aria-labelledby="notfound-heading"
      className="space-y-8 py-16 text-center animate-fade-in"
    >
      <Helmet>
        <title>Page introuvable — BM-VA</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="La page demandée n'existe pas." />
      </Helmet>

      <div className="flex flex-col items-center gap-6">
        <div aria-hidden className="relative">
          <div className="text-7xl font-extrabold tracking-tight text-gray-900 select-none">
            404
          </div>
          <svg
            className="absolute -top-6 -right-10 h-12 w-12 text-accent animate-bounce-subtle"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              d="M3 16l3-3h11a3 3 0 002.83-2H16l-2-3H8l-2 3H3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="7.5" cy="16.5" r="1.5" fill="currentColor" />
            <circle cx="17.5" cy="16.5" r="1.5" fill="currentColor" />
          </svg>
        </div>

        <h2 id="notfound-heading" className="text-xl font-semibold">
          Oups… cette page s’est égarée.
        </h2>
        <p className="text-gray-600 max-w-prose mx-auto">
          La ressource demandée est introuvable. Elle a peut-être été déplacée ou supprimée.
        </p>

        <ButtonLink to="/" variant="primary" size="md">
          Retourner à l’accueil
        </ButtonLink>
      </div>
    </section>
  );
}