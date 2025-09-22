# SEO and PWA

## SEO

- Canonical link in `index.html`
- Base meta:
  - `title`, `description`, `keywords`, `theme-color`
  - Open Graph (og:*)
  - Twitter (summary_large_image)
- Per-page overrides:
  - Implemented with `react-helmet-async` in `src/pages/*`
  - Home → `og-home.png`
  - Fleet → `og-fleet.png`
  - Support → `og-support.png`
  - Fallback (index.html) → `og-image.png`
- robots.txt and sitemap.xml are in `public/`

### Social images

- `scripts/generate-og.mjs` creates OG images at build time (prebuild)
- If `public/brand/logo.svg` exists, it is injected; else a monogram is used

## PWA

- `vite-plugin-pwa`:
  - Generates manifest and service worker
  - Registration strategy: `autoUpdate`
- Manifest:
  - Icons are generated in `prebuild` and referenced by the PWA plugin
- Testing:
  - `npm run build` then `npm run preview`
  - Inspect Application tab in DevTools (manifest, service worker)

## Recommendations

- Replace the OG images with branded versions once the final logo is available
- Add analytics and consent management if required by the client
- Add structured data (JSON-LD) if relevant to the business domain