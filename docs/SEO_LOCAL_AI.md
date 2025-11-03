# SEO Local & AI-Friendly — Guide de référence

Objectif: obtenir une visibilité optimale (Google + assistants IA) avec un site statique React/Vite. Ce guide couvre le SEO local, le contenu “AI-friendly”, le balisage JSON-LD et la prévention des doublons.

## 1) Fondamentaux SEO FR

- Langue: `html lang="fr"` (index.html)
- Titres & descriptions: chaque page doit avoir un `<title>` et une meta `description` unique, orientés bénéfices.
- Canonical: `<link rel="canonical" href="https://bm-valocations.com/...">` sur chaque page.
- Sitemap & robots: `public/sitemap.xml` listant toutes les pages et `public/robots.txt` pointant vers le sitemap.

## 2) SEO Local

- Zones servies: précisez `address` (ville/région/pays) et `openingHours` dans JSON-LD.
- Pages locales (optionnel): /paris, /lyon, /marseille avec contenu unique (texte, CTA, témoignages).
- Mots-clés FR:
  - location voiture, citadine, électrique, petits budgets, essai gratuit, <ville>, livraison, achat/revente
- Liens internes: maillage entre landing, flotte, détails, mentions légales.

## 3) JSON-LD (Rich Snippets)

Sur la page d’accueil:
- `AutoRental` (LocalBusiness): nom, URL, image, `address`, `openingHours`, `contactPoint`, `aggregateRating`.

Sur pages produits (voitures, ou ebooks si applicable):
- `Product` + `Offer`: nom, description, image, prix, devise, disponibilité.

Sur pages FAQ (si présentes):
- `FAQPage`: liste de questions/réponses (au moins 3–4) pertinentes.

Valider via: Google Rich Results Test.

## 4) Contenu “AI-friendly”

- Structure claire:
  - H1 unique, H2/H3 cohérents
  - Bullets: “Vous apprendrez…” / “Ce que vous obtenez…”
  - Paragraphes courts
- Clarté sémantique:
  - Eviter le jargon inutile; privilégier les mots courants
  - Utiliser des alt descriptifs sur images
- Témoignages crédibles:
  - Prénom + métier + contexte (court)
  - Note éthique: restez authentique, évitez les avis inventés

## 5) Prévenir les doublons

- Slugs uniques (`/cars/:id`, `/mentions-legales`, etc.)
- Canonical aligné au domaine prod
- Pas de pages "placeholder" indexées (utiliser `noindex` si dépôts de tests)
- Ne pas dupliquer fortement le contenu d’une page à l’autre (varier les sections)

## 6) Performance et UX

- Core Web Vitals:
  - Images: tailles explicites, lazy loading, `decoding="async"`
  - Fonts: preconnect, ou locales si CSP stricte
- Accessibilité:
  - Skip link (#main-content), landmarks, focus visible
- Navigation:
  - Scroll-to-top sur changement de route (implémenté via RouteFocusHandler)

## 7) Outils & Mesures

- GA4: brancher `gtag` pour suivre funnels (view → click → payment → download)
- Audit automatisé:
  - `npm run audit:site -- "https://bm-valocations.com"`
  - Rapport: `./audit-report.md` (vérifie titles, descriptions, canonical, OG, 404)
- Clarity (optionnel): micro-analyses UX

## 8) Checklist avant mise en ligne

- [ ] `index.html`: lang FR, metas FR, JSON-LD AutoRental
- [ ] `sitemap.xml` & `robots.txt` à jour (inclure /mentions-legales)
- [ ] Pages: pas de 404 non maîtrisée (page NotFound propre)
- [ ] Mentions: liens "SmarterLogic Web" partout où nécessaire
- [ ] Funnels: events branchés si ebook/upsell (cf. docs/FUNNEL_MARKETING_UPSELL.md)
- [ ] Rapport d’audit: `audit-report.md` généré et analysé