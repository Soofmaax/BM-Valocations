import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function MentionsLegales() {
  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <Helmet>
        <title>Mentions légales — BM-VA Locations</title>
        <meta name="description" content="Mentions légales du site BM-VA Locations." />
      </Helmet>

      <h1 className="text-2xl font-semibold">Mentions légales</h1>

      <div className="prose prose-sm max-w-none text-gray-700">
        <h2>Éditeur du site</h2>
        <p>
          Ce site est édité par BM-VA Locations. Pour toute question relative au contenu du site,
          veuillez utiliser la page <Link to="/support" className="underline">Support</Link>.
        </p>

        <h2>Crédits et Contact</h2>
        <p>
          Conception et développement: <a href="https://smarterlogiqueweb.com" target="_blank" rel="noopener noreferrer" className="underline">
            SmarterLogic Web
          </a>.
        </p>
        <p>
          Pour tout problème, demande ou question concernant le site ou sa réalisation, merci de visiter{' '}
          <a href="https://smarterlogiqueweb.com" target="_blank" rel="noopener noreferrer" className="underline">
            smarterlogiqueweb.com
          </a>.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Les formulaires de ce site transmettent les demandes par email à l’éditeur. Aucune base de données
          n’est conservée côté site. Consultez les politiques de l’éditeur pour tout complément.
        </p>
      </div>
    </section>
  );
}