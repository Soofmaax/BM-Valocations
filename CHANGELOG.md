# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [Unreleased]

- Docs: add comprehensive README, contributing, code of conduct, security policy, project docs
- SEO: canonical link, favicons, Apple Touch Icon
- Social: auto-generated OG images (home, fleet, support, fallback)
- A11y: skip link, route announcer, focus handler, 404 page
- UI: minimal design system (Button, Card, Badge)
- Footer: social icons with placeholders
- CI: Node 18/20 matrix, cache, typecheck, lint, test, build
- Tooling: Prettier, Husky, lint-staged
- Tests: Vitest + RTL setup

## [1.0.0] - 2025-09-22

- Initial public version with Vite + React + TypeScript
- Tailwind CSS, ESLint strict rules (no `any`), type checking
- Routing with lazy-loaded pages (Home, Fleet, Support, NotFound)
- PWA (vite-plugin-pwa) + SEO meta tags
- GitHub Actions CI