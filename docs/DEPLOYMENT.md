# Deployment

This app is production-ready. Below are recommended deployment options and steps.

## Hosting options

- Vercel (recommended)
  - Great support for Vite/React
  - Preview deploys for PRs
  - Automatic HTTPS, CDN, caching
- Netlify
  - Similar benefits, easy previews
- Static hosting (S3 + CloudFront, GCS, etc.)
  - Requires CI pipeline to build and upload

## Build artifacts

- Static build via Vite:
  - `npm run build` outputs to `dist/`
- Includes:
  - PWA (manifest + service worker)
  - Social images and icons generated in `prebuild`

## Environment variables

- Client-side variables must be prefixed with `VITE_`
- Example:
  - `VITE_API_BASE_URL=https://api.example.com`
- Do not include server secrets in this project

## Vercel setup (example)

1) Create a new Vercel project
2) Framework preset: Other (or Vite)
3) Build command: `npm run build`
4) Output directory: `dist`
5) Environment variables: add any `VITE_*` as needed
6) Enable “Deploy Previews” for pull requests
7) Set production domain:
   - Primary: `bm-valocations.com`
   - Optional: `www.bm-valocations.com` with redirect to apex
8) DNS:
   - Add A/ALIAS/ANAME or CNAME per Vercel instructions

## Netlify setup (example)

1) New site from Git
2) Build command: `npm run build`
3) Publish directory: `dist`
4) Environment variables: add `VITE_*`
5) Netlify previews enabled

## Caching and headers

- Consider adding headers for security and caching at the platform level
  - CSP, HSTS, X-Content-Type-Options, Referrer-Policy
  - Cache static assets with far-future expiry; use hashed filenames from Vite build

## Monitoring

- Set up error reporting and analytics (e.g., Sentry, Umami)
  - If you re-enable Sentry, expose DSN as `VITE_SENTRY_DSN`

## Checklist

- [ ] Build succeeds in CI (`typecheck`, `lint`, `test:run`, `build`)
- [ ] Production domain configured (bm-valocations.com)
- [ ] SSL enabled and forced (HTTPS)
- [ ] SEO verified (Open Graph, Twitter cards, robots/sitemap)
- [ ] PWA checked (manifest, service worker)
- [ ] Accessibility spot-check (keyboard navigation, focus)
- [ ] Performance spot-check (Lighthouse)
- [ ] Remove construction popup before final launch:
      - Delete `<ConstructionNotice />` from `src/App.tsx`
      - Remove `src/components/ConstructionNotice.tsx`