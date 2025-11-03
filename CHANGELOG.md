# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [Unreleased]

- Landing Citadine (Home): refonte visuelle complète (hero, tabs acheter/louer, filtres, favoris, cards, témoignages, CTA).
- Détails véhicule: route `/cars/:id` avec galerie, specs, réservation.
- Formulaires email: Edge Functions Supabase + Resend (notify/test-drive), sans base de données.
- Données dynamiques: chargement JSON public avec fallback local (`src/lib/citadines.ts`), template + script de validation.
- Mentions légales: page dédiée + liens header/footer; branding “Développé par SmarterLogic Web”.
- SEO FR: index.html lang=fr, metas FR, JSON-LD AutoRental/WebSite; sitemap/robots mis à jour.
- Analytics funnels: helpers et événements (view → click → payment → download).
- Docs: guides Funnel Marketing & Upsell (`docs/FUNNEL_MARKETING_UPSELL.md`) et SEO Local & AI (`docs/SEO_LOCAL_AI.md`).
- CI: workflows dédiés (lighthouse, screenshots, audit meta/links) + strict ESLint (no `any`), tests robustes.
- A11y/UX: skip link, route announcer, scroll-to-top, focus management, 404 FR.
- UI: design system (Button, Card, Badge), animations légères.
- Tooling: Prettier, Husky, lint-staged, scripts OG/images/screenshots/audit.
- Tests: Vitest + RTL setup mis à jour pour la landing et lazy routes.

## [1.0.0] - 2025-09-22

- Initial public version with Vite + React + TypeScript
- Tailwind CSS, ESLint strict rules (no `any`), type checking
- Routing with lazy-loaded pages (Home, Fleet, Support, NotFound)
- PWA (vite-plugin-pwa) + SEO meta tags
- GitHub Actions CI