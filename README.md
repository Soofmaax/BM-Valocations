<p align="center">
  <img src="/og-home.png" alt="BM-VA Locations — Premium Car Rental (Open Graph image)" width="640" />
</p>

<h1 align="center">BM-VA Locations — Frontend (Vite + React + TypeScript)</h1>

<p align="center">
  <a href="LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" />
  </a>
  <a href="https://nodejs.org/en" target="_blank">
    <img alt="Node >=18" src="https://img.shields.io/badge/node-%3E%3D18.0-339933?logo=node.js&logoColor=white" />
  </a>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-149ECA?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white" />
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" />
  <img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black" />
</p>

<p align="center">
  <!-- TODO: Replace with real owner/repo once hosted on GitHub -->
  <a href="#ci-status">
    <img alt="CI" src="https://img.shields.io/badge/CI-GitHub_Actions-inactive?logo=githubactions&logoColor=white" />
  </a>
</p>

A modern, accessible, and production-ready frontend for a premium car rental service. Built with Vite, React, TypeScript and Tailwind CSS, featuring strict linting, tests, PWA support, SEO/social meta tags, CI, and a small design system.

- Live domain: https://bm-valocations.com/
- UX: Accessible routing, skip link, route announcer, focus handling, 404 custom page
- SEO: Canonical, Open Graph/Twitter, per-page Helmet overrides, social images
- PWA: Manifest + service worker (vite-plugin-pwa)
- Quality: ESLint (flat config), Prettier, Husky + lint-staged, TypeScript strict, GitHub Actions CI
- Social/Branding: Auto-generated OG images per page + favicons/Apple Icon from a single source logo

---

## Table of contents

- Features
- Quick start
- Scripts
- Project structure
- Environment
- Quality gates
- Accessibility
- SEO and PWA
- CI/CD
- Support
- Security
- License
- Brand assets (single source)
- Funnel marketing & upsell (ebooks) — see docs/FUNNEL_MARKETING_UPSELL.md
- Acknowledgments

## Features

- Type-safe React app (TS strict) with a small Design System (Button, Card, Badge)
- Routing with code-splitting (Home, Fleet, Support, NotFound)
- A11y essentials: skip-link, route announcer (aria-live), focus management
- SEO-ready: canonical, per-page Helmet meta, OG/Twitter cards
- PWA-enabled build with auto-update registration
- Tests with Vitest + React Testing Library (UI + a11y)
- GitHub Actions CI (Node 18/20 matrix, cache, typecheck, lint, tests, build)
- Pre-commit quality guard: Husky + lint-staged (ESLint + Prettier)
- Social images and favicons auto-generated at build from a single logo.svg

## Quick start

1) Install
- Node 18+ (or 20+), npm 9+
- npm install

2) Dev
- npm run dev
- App: http://localhost:5173

3) Quality checks
- npm run typecheck
- npm run lint
- npm run test:run

4) Build and preview
- npm run build
- npm run preview (http://localhost:4173)

## Scripts

- dev: start Vite dev server
- build: generate production build (runs prebuild first)
- prebuild: generate OG images + favicons/icons
- preview: preview production build locally
- typecheck: TypeScript noEmit type checks
- lint: ESLint on the repo
- test / test:run: Vitest tests (watch/run once)
- format / format:fix: Prettier checks / fixes
- prepare: install Husky hooks

## Project structure

- src/
  - pages/ (Home, Fleet, Support, NotFound)
  - components/ (UI + a11y helpers)
  - data/, types/, test/ (setup), index.css
  - main.tsx, App.tsx
- public/
  - robots.txt, sitemap.xml
  - brand/logo.svg (optional source logo)
  - og-*.png, favicons generated at build
- scripts/
  - generate-og.mjs (OG images + favicons generation)
- docs/
  - Knowledge base (getting started, CI/CD, a11y, SEO/PWA, brand assets)

See docs/PROJECT_STRUCTURE.md for more details.

## Environment

This is a client-side app (Vite). Exposed env vars must be prefixed with VITE_ (e.g., VITE_SENTRY_DSN if you re-enable Sentry later). Do not put server secrets here.

## Quality gates

- Type checks must pass: npm run typecheck
- Lint must pass: npm run lint (no explicit any)
- Tests must pass: npm run test:run
- Build must succeed: npm run build

These steps run in CI for all pushes/PRs to main.

## Accessibility

Included:
- Skip link to main content
- Route announcer (aria-live)
- Focus management on route change
- A11y linting via eslint-plugin-jsx-a11y
- Keyboard-focusable accessible navigation

See docs/ACCESSIBILITY.md.

## SEO and PWA

- Canonical link, theme-color
- Open Graph/Twitter meta (global + per-page overrides via Helmet)
- OG images generated at build time: og-home.png, og-fleet.png, og-support.png, og-image.png (fallback)
- PWA via vite-plugin-pwa (manifest + service worker auto-update)
- robots.txt + sitemap.xml

See docs/SEO_PWA.md.

## CI/CD

GitHub Actions:
- Node 18/20 matrix
- Caching
- Steps: install, typecheck, lint, test, build

<!-- TODO: Replace badge at top with real workflow badge once the repository is on GitHub (owner/repo). -->
See docs/CI_CD.md.

## Deployment

- Production: https://bm-valocations.com/
- Guide: see docs/DEPLOYMENT.md (Vercel/Netlify examples, env vars, headers, checklist)
- Status badge:
  <!-- TODO: Replace with real deployment badge (e.g., Vercel/Netlify) when available -->
  <img alt="Deployment" src="https://img.shields.io/badge/Deployment-pending-lightgrey">

Deployment checklist (final launch reminders):
- Remove the construction popup:
  - Delete `<ConstructionNotice />` from `src/App.tsx`
  - Remove `src/components/ConstructionNotice.tsx`
- Replace placeholder emails with your agency addresses (README, SUPPORT.md, SECURITY.md)
- Replace README badges (CI/Deployment) with real links if not done yet
- Provide final OG image(s) and favicon(s) if the brand logo is available

---

## Mini‑guide — Mettre à jour la liste des voitures (statique)

Public visé: l’équipe non technique qui souhaite changer les voitures “de temps en temps” sans maintenance continue.

Où se trouve la liste
- Fichier: `src/data/citadines.ts`
- C’est un tableau d’objets JavaScript. Chaque objet correspond à une voiture.

Champs disponibles par voiture
- Obligatoires:
  - `id` (number, unique), `name` (string), `emoji` (string), `price` (number, en €), `monthly` (number, €/mois)
  - `image` (URL d’image), `electric` (boolean), `available` (boolean), `location` (string), `tags` (string[])
- Optionnels:
  - `gallery` (string[]): plusieurs images
  - `specs`: `{ seats?: number, doors?: number, transmission?: 'auto' | 'manual', powerKw?: number, rangeKm?: number, trunkLiters?: number }`

Exemple d’entrée
```ts
{
  id: 5,
  name: 'Peugeot 108',
  emoji: '🚗',
  price: 7900,
  monthly: 139,
  image: 'https://images.unsplash.com/photo-....?w=800&q=80',
  gallery: [
    'https://images.unsplash.com/photo-....?w=1200&q=80',
    'https://images.unsplash.com/photo-....?w=1200&q=80',
  ],
  electric: false,
  available: true, // si false, le bouton affiche “Me prévenir”
  location: 'Nice',
  tags: ['Facile à garer', 'Économique'],
  specs: { seats: 4, doors: 5, transmission: 'manual', powerKw: 53, trunkLiters: 196 }
}
```

Ce que contrôlent certains champs
- `available: false` → affiche “Me prévenir” et ouvre un formulaire (vous recevez l’email, pas d’auto‑réponse au client)
- `electric: true` → badge “Électrique” sur la carte
- `tags` → utilisés par les filtres (ex: “Facile à garer”, “Éco”, “Petits budgets”, “Weekend”, “Famille”)

Comment modifier/ajouter/supprimer une voiture
1) Ouvrir `src/data/citadines.ts`
2) Ajouter/éditer/supprimer des objets du tableau `citadines`
3) Sauvegarder

Aperçu local (facultatif)
- Lancer le site en local pour vérifier:
  - `npm install` (première fois)
  - `npm run dev` → http://localhost:5173

Mettre en ligne
- Si vous utilisez Vercel/Netlify/GitHub Pages:
  - Commitez vos changements puis déployez
- Build statique:
  - `npm run build` puis servez le dossier `dist/`

Bonnes pratiques
- Utiliser des images publiques (Unsplash/serveur) avec `?w=1200&q=80` pour de bonnes tailles/qualité
- Garder des `id` uniques et stables
- Mettre `available: false` si le véhicule n’est plus disponible pour basculer automatiquement sur “Me prévenir”
- Ne pas ajouter de secrets (emails/numéros) dans `citadines.ts` (c’est un fichier public)

Option “sans rebuild” (au besoin)
- Si vous souhaitez éditer la liste sans redéployer, nous pouvons basculer vers un fichier JSON public (hébergé sur un CDN ou GitHub) que vous remplacerez à l’occasion. Demandez à l’équipe technique d’activer ce mode.

## Données dynamiques via JSON public (sans redeploy)

Si vous souhaitez mettre à jour la liste des citadines sans redéployer:

1) Hébergez un fichier JSON public (ex: GitHub raw) avec la liste des voitures.
- Exemple de contenu:
```json
[
  {
    "id": 1,
    "name": "Fiat 500 Pop",
    "emoji": "🍋",
    "price": 8900,
    "monthly": 159,
    "image": "https://images.unsplash.com/photo-1614162692292-7ac56d7f8563?w=800&q=80",
    "gallery": ["https://...w=1200&q=80"],
    "electric": true,
    "available": true,
    "location": "Paris 11e",
    "tags": ["Facile à garer", "Électrique", "Rétro-chic"],
    "specs": { "seats": 4, "doors": 3, "transmission": "auto", "powerKw": 70, "rangeKm": 180, "trunkLiters": 185 }
  }
]
```

2) Configurez l’URL dans votre environnement (Vite):
- VITE_CITADINES_URL="https://raw.githubusercontent.com/…/citadines.json"

3) Comportement de l’app:
- L’app affiche tout de suite la liste locale (src/data/citadines.ts) pour un rendu instantané.
- Ensuite, elle charge le JSON public et remplace l’affichage si le JSON est valide.
- En cas d’erreur (URL indisponible, JSON invalide), l’app garde la liste locale.

4) Où est gérée la logique:
- Loader: `src/lib/citadines.ts` (loadCitadines / loadCitadinesWithFallback)
- Pages: `src/pages/Home.tsx` et `src/pages/CarDetails.tsx` utilisent ce loader.

5) Mettre à jour la liste sans redeploy:
- Remplacez le fichier JSON public → rechargez la page → les nouvelles voitures s’affichent.
- Pas besoin de commit ni de build.

6) Modèle et validation avant mise en ligne:
- Modèle JSON: `docs/citadines.template.json`
- Validation locale: `node scripts/validate-citadines.mjs ./citadines.json`
  - Le script vérifie le format, les URLs, la présence des champs requis et l’unicité des id.
  - Retour 0 si tout est valide, 1 sinon (avec détails des erreurs).

## Screenshots

Add screenshots to showcase UX for your portfolio.

- Suggested locations:
  - `docs/screenshots/home.png`
  - `docs/screenshots/fleet.png`
  - `docs/screenshots/support.png`
  - `docs/screenshots/404.png` (optional)

> TODO: Add final screenshots and optionally link them here with captions.

Direct links (placeholders):
- Home: [docs/screenshots/home.png](docs/screenshots/home.png)
- Fleet: [docs/screenshots/fleet.png](docs/screenshots/fleet.png)
- Support: [docs/screenshots/support.png](docs/screenshots/support.png)
- 404: [docs/screenshots/404.png](docs/screenshots/404.png)

<!-- TODO: Uncomment the gallery once screenshots are added
<p align="center">
  <img src="docs/screenshots/home.png" alt="Home — landing page" width="800" />
</p>
<p align="center">
  <img src="docs/screenshots/fleet.png" alt="Fleet — vehicles listing" width="800" />
</p>
<p align="center">
  <img src="docs/screenshots/support.png" alt="Support — contact information" width="800" />
</p>
<p align="center">
  <img src="docs/screenshots/404.png" alt="Custom 404 page" width="800" />
</p>
-->

## Support

See SUPPORT.md for support channels, hours and response targets. The contact emails are placeholders until the agency is available.

> TODO: Replace placeholder emails (support@your-agency.tld, security@your-agency.tld, contact@your-agency.tld) with your real agency contacts when ready.

## Security

See SECURITY.md for how to report vulnerabilities privately.

## License

MIT — see LICENSE.

## Brand assets (single source)

Place your final logo at public/brand/logo.svg and run npm run build. The prebuild script will generate favicons, Apple Touch Icon and OG images automatically. See docs/BRAND_ASSETS.md.

## Développé par

Ce projet a été conçu et développé par <a href="https://smarterlogiqueweb.com" target="_blank" rel="noopener noreferrer">SmarterLogic Web</a>.

Pour en savoir plus ou pour nous contacter, visitez notre site : <a href="https://smarterlogiqueweb.com" target="_blank" rel="noopener noreferrer">smarterlogiqueweb.com</a>.

- Branding & Identité Visuelle
- Développement Front-End
- Optimisation SEO

## Acknowledgments

- Vite, React, TypeScript, Tailwind CSS
- Vitest + React Testing Library
- vite-plugin-pwa
- Satori + Resvg for dynamic OG/brand image generation