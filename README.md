# BM-VA Locations — Frontend (Vite + React + TypeScript)

A modern, accessible, and production-ready frontend for a premium car rental service. Built with Vite, React, TypeScript and Tailwind CSS, featuring strict linting, tests, PWA support, SEO/social meta tags, CI, and a small design system.

- Live domain: https://bm-valocations.com/
- Tech stack: Vite, React, TypeScript, Tailwind CSS, Vitest, React Testing Library
- Quality: ESLint (flat config), Prettier, Husky + lint-staged, TypeScript strict, GitHub Actions CI
- UX: Accessible routing, skip link, route announcer, focus handling, 404 custom page
- PWA: Manifest + service worker (vite-plugin-pwa)
- SEO: Canonical, Open Graph/Twitter, per-page Helmet overrides
- Social: Auto-generated OG images per page at build time
- Branding: Auto-generated favicons and Apple Touch Icon from a single source logo

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

## Accessibility

Included:
- Skip link to main content
- Route announcer (aria-live)
- Focus management on route change
- A11y linting via eslint-plugin-jsx-a11y
- Keyboard-focusable accessible navigation

See docs/ACCESSIBILITY.md.

## SEO and social share

- Canonical link, theme-color
- Open Graph/Twitter meta (global + per-page overrides via Helmet)
- OG images generated at build time: og-home.png, og-fleet.png, og-support.png, og-image.png (fallback)
- robots.txt + sitemap.xml

See docs/SEO_PWA.md.

## PWA

Configured with vite-plugin-pwa:
- Manifest and service worker generated on build
- Auto-update registration strategy

See docs/SEO_PWA.md.

## CI/CD

GitHub Actions:
- Node 18/20 matrix
- Caching
- Steps: install, typecheck, lint, test, build

See docs/CI_CD.md.

## Contributing

See CONTRIBUTING.md and CODE_OF_CONDUCT.md.

## Security

See SECURITY.md for how to report vulnerabilities privately.

## License

MIT — see LICENSE.

## Brand assets (single source)

Place your final logo at public/brand/logo.svg and run npm run build. The prebuild script will generate favicons, Apple Touch Icon and OG images automatically. See docs/BRAND_ASSETS.md.