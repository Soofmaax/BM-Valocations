# Feat: Improve code quality and add CI workflow

## Description
- Cette PR améliore la robustesse du code en éliminant tout usage de `any` et en instaurant un typage strict dans une structure `src/` minimale.
- Mise en place du routing (React Router) avec code-splitting (React.lazy + Suspense) et trois pages (Home, Fleet, Support).
- Améliorations accessibilité avec `eslint-plugin-jsx-a11y` et structure sémantique (header/nav/main, aria-*).
- PWA: ajout de `vite-plugin-pwa` avec manifest généré, mode `autoUpdate`, stratégies Workbox de base.
- SEO: balises Open Graph/Twitter de base dans `index.html` et gestion des titres/descriptions par page avec `react-helmet-async`.
- 404: page NotFound sur-mesure (titre/CTA), animation SVG subtile, meta `noindex`, route wildcard `*`.
- Error handling: `ErrorBoundary` global avec fallback 500 (sans Sentry).
- Footer: ajout d’icônes réseaux sociaux (LinkedIn, X/Twitter, Instagram, Facebook) avec liens placeholders et styles hover cohérents.
- Fichiers SEO robots/sitemap: `public/robots.txt` et `public/sitemap.xml` avec les routes principales.
- Un workflow GitHub Actions (`.github/workflows/ci.yml`) a été ajouté pour automatiser les vérifications de qualité (type-check, linting, tests & build) sur chaque `push` et `pull_request` vers `main`.
- ESLint est configuré pour interdire l’utilisation de `any` via la règle `@typescript-eslint/no-explicit-any: "error"`.

## Détails des changements
- Ajout:
  - `src/main.tsx`: point d’entrée React strictement typé + `HelmetProvider`
  - `src/App.tsx`: App avec Router, Nav accessible, lazy routes et Suspense (+ route 404)
  - `src/components/ErrorBoundary.tsx`: ErrorBoundary React (sans Sentry) avec fallback UI
  - `src/components/Footer.tsx`: footer avec icônes SVG (LinkedIn, X, Instagram, Facebook) et URLs placeholders
  - Design System (UI):
    - `src/components/ui/Button.tsx`, `src/components/ui/ButtonLink.tsx`
    - `src/components/ui/Card.tsx` (Card, CardHeader, CardTitle, CardContent)
    - `src/components/ui/Badge.tsx` (Badge + CategoryBadge)
    - `src/components/ui/cn.ts` (utilitaire classes)
  - `src/pages/Home.tsx`, `src/pages/Fleet.tsx`, `src/pages/Support.tsx`: pages typées avec balises `<Helmet>` (SEO), refactorisées pour utiliser Button/Card/Badge (Support: informations de contact uniquement, pas de formulaire)
  - `src/pages/NotFound.tsx`: page 404 custom (grand titre, message amical, CTA “Retourner à l’accueil”) + petite illustration SVG animée
  - `scripts/generate-og.mjs`: script Node pour générer `public/og-image.png` (Satori + Resvg), exécuté automatiquement en `prebuild`
  - `src/data/vehicles.ts`: données typées partagées
  - `src/types/index.ts`: définitions de types partagés (Vehicle, VehicleCategory)
  - `src/index.css`: base Tailwind et font
  - `src/test/setup.ts`: configuration Jest-DOM pour Vitest
  - `src/App.test.tsx`: test UI de base
  - `src/components/ErrorBoundary.test.tsx`: test du fallback ErrorBoundary et du bouton Reload
  - `public/robots.txt` et `public/sitemap.xml`: SEO technique
  - `.github/workflows/ci.yml`: workflow CI install + type-check + lint + tests + build, avec:
    - matrice de versions Node (`18`, `20`)
    - cache npm (actions/setup-node avec `cache: 'npm'`)
  - `.prettierrc.json` et `.prettierignore`: formatage standardisé
  - `.husky/pre-commit`: exécution `lint-staged` (ESLint + Prettier)
  - `.husky/pre-push`: `npm run typecheck` + `npm run test:run`
- Modification:
  - `eslint.config.js`: ajout de la règle `@typescript-eslint/no-explicit-any: "error"`, intégration `eslint-config-prettier` et `eslint-plugin-jsx-a11y` (flat config recommandé)
  - `tailwind.config.js`: ajout du champ `content` pour inclure `./index.html` et `./src/**/*.{ts,tsx}`, et ajout de tokens (colors, borderRadius, boxShadow)
  - `vite.config.ts`: ajout `vite-plugin-pwa` (manifest/workbox) + configuration des tests (Vitest: jsdom, setupFiles, globals)
  - `index.html`: métadonnées SEO (OG/Twitter) mises à jour pour `https://bm-valocations.com/` avec l’OG image locale `https://bm-valocations.com/og-image.png` et dimensions (1200x630)
  - `public/sitemap.xml`: remplacement de `/contact` par `/support`
  - `src/App.tsx`: ajout du Footer et mise à jour de la nav/routes vers `/support`
  - `package.json`:
    - scripts: ajout de `prebuild` (génération OG image)
    - deps/devDeps: ajout de `satori` et `@resvg/resvg-js`
    - scripts existants: `typecheck`, `test`, `test:run`, `format`, `format:fix`, `prepare`
    - `lint-staged` config
- Suppression:
  - `src/pages/Contact.tsx` (remplacé par `src/pages/Support.tsx`)

## Checklist
- [x] Aucune occurrence de `any` ou `as any`
- [x] Types partagés centralisés dans `src/types/`
- [x] Routing + code-splitting + a11y de base en place
- [x] PWA configurée (manifest auto, service worker Workbox)
- [x] SEO de base (OG/Twitter + titres/descriptions par page)
- [x] 404 custom + robots/sitemap ajoutés
- [x] Footer avec icônes réseaux sociaux (placeholders)
- [x] Error boundary global (sans Sentry)
- [x] ESLint interdit explicitement `any`
- [x] CI (install, type-check, lint, tests, build) ajoutée
- [x] Prettier + Husky + lint-staged en place

## Tests
- `npm run typecheck` doit passer
- `npm run lint` doit passer sans avertissements bloquants sur `any`
- `npm run test:run` doit réussir
- `npm run build` doit réussir