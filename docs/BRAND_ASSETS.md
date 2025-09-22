# Brand assets and social images

This project auto-generates favicons, Apple Touch Icon and Open Graph share images at build time.

You only need to provide a single source logo file:

- Place your vector logo at: `public/brand/logo.svg`
  - SVG is recommended for best quality (no native dependencies).
  - The prebuild script will detect it automatically and regenerate:
    - Favicons: `public/favicon-16x16.png`, `public/favicon-32x32.png`
    - Apple Touch Icon: `public/apple-touch-icon.png`
    - Generic icon (512px): `public/icon-512.png`
    - Open Graph images (1200×630):
      - Home: `public/og-home.png`
      - Fleet: `public/og-fleet.png`
      - Support: `public/og-support.png`
      - Site-wide fallback: `public/og-image.png`

If no `public/brand/logo.svg` is present, a clean fallback monogram will be used (“BM”) with the project color palette.

## How it works

- The build runs `prebuild: node ./scripts/generate-og.mjs`
- The script:
  - Loads fonts via CDN (Sora)
  - Looks for `public/brand/logo.svg`
    - If found, renders it with resvg and injects it into OG images (top-right)
    - Generates the icons directly from the SVG
    - If not found, falls back to a monogram for icons and OG images
- Share meta tags:
  - Global defaults are in `index.html` (og-image.png)
  - Per-page overrides exist for Home, Fleet and Support via react-helmet-async

## Replacing the logo later

1) Add your logo file:
   - `public/brand/logo.svg`

2) Rebuild:
   - `npm run build` (or run `npm run dev` for local and build once to see images)

3) Deploy:
   - The generated images will be included in your build output and the social previews will update.

Optional:
- If you want to tweak image placement/size, adjust `scripts/generate-og.mjs` (look for `logoDataUrl` and the `img` width/position).