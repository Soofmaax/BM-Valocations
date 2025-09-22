# Feat: Improve code quality and add CI workflow

## Description
- Cette PR améliore la robustesse du code en éliminant tout usage de `any` et en instaurant un typage strict dans une structure `src/` minimale.
- Mise en place du routing (React Router) avec code-splitting (React.lazy + Suspense) et trois pages (Home, Fleet, Contact).
- Améliorations accessibilité avec `eslint-plugin-jsx-a11y` et structure sémantique (header/nav/main, aria-*).
- PWA: ajout de `vite-plugin-pwa` avec manifest généré, mode `autoUpdate`, stratégies Workbox de base.
- SEO: balises Open Graph/Twitter de base dans `index.html` et gestion des titres/descriptions par page avec `react-helmet-async`.
- 404: page NotFound accessible avec meta `noindex`, route wildcard `*` et lien de retour vers l’accueil.
- Error handling: `ErrorBoundary` global avec fallback 500 (sans Sentry).
- Fichiers SEO robots/sitemap: `public/robots.txt` et `public/sitemap.xml` avec les routes principales.
- Un workflow GitHub Actions (`.github/workflows/ci.yml`) a été ajouté pour automatiser les vérifications de qualité (type-check, linting, tests & build) sur chaque `push` et `pull_request` vers `main`.
- ESLint est configuré pour interdire l’utilisation de `any` via la règle `@typescript-eslint/no-explicit-any: "error"`.

## Détails des changements
- Ajout:
  - `src/main.tsx`: point d’entrée React strictement typé + `HelmetProvider`
  - `src/App.tsx`: App avec Router, Nav accessible, lazy routes et Suspense (+ route 404)
  - `src/components/ErrorBoundary.tsx`: ErrorBoundary React (sans Sentry) avec fallback UI
  - Design System (UI):
    - `src/components/ui/Button.tsx`, `src/components/ui/ButtonLink.tsx`
    - `src/components/ui/Card.tsx` (Card, CardHeader, CardTitle, CardContent)
    - `src/components/ui/Badge.tsx` (Badge + CategoryBadge)
    - `src/components/ui/cn.ts` (utilitaire classes)
  - `src/pages/Home.tsx`, `src/pages/Fleet.tsx`, `src/pages/Contact.tsx`: pages typées avec balises `<Helmet>` (SEO), refactorisées pour utiliser Button/Card/Badge
  - `src/pages/NotFound.tsx`: page 404 accessible avec `noindex`
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
  - `index.html`: métadonnées SEO (OG/Twitter), `theme-color`
  - `package.json`:
    - scripts: `typecheck`, `test`, `test:run`, `format`, `format:fix`, `prepare`
    - `lint-staged` config
    - deps/devDeps: `react-helmet-async`, `vite-plugin-pwa`, `prettier`, `eslint-config-prettier`, `husky`, `lint-staged`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `eslint-plugin-jsx-a11y`

## Checklist
- [x] Aucune occurrence de `any` ou `as any`
- [x] Types partagés centralisés dans `src/types/`
- [x] Routing + code-splitting + a11y de base en place
- [x] PWA configurée (manifest auto, service worker Workbox)
- [x] SEO de base (OG/Twitter + titres/descriptions par page)
- [x] 404 avec `noindex` + robots/sitemap ajoutés
- [x] Error boundary global (sans Sentry)
- [x] ESLint interdit explicitement `any`
- [x] CI (install, type-check, lint, tests, build) ajoutée
- [x] Prettier + Husky + lint-staged en place

## Tests
- `npm run typecheck` doit passer
- `npm run lint` doit passer sans avertissements bloquants sur `any`
- `npm run test:run` doit réussir
- `npm run build` doit réussir