# Getting started

## Requirements

- Node 18+ (or 20+), npm 9+
- macOS/Linux/Windows

## Install

```bash
npm install
```

## Development

```bash
npm run dev
# http://localhost:5173
```

### Quality

- Type check: `npm run typecheck`
- Lint: `npm run lint`
- Tests: `npm run test:run`
- Format: `npm run format:fix`

### Build and preview

```bash
npm run build
npm run preview
# http://localhost:4173
```

The build step runs a `prebuild` script that generates:
- OG images (og-image.png, og-home.png, og-fleet.png, og-support.png)
- Favicons (favicon-16x16.png, favicon-32x32.png)
- Apple Touch Icon (apple-touch-icon.png)
- icon-512.png

If `public/brand/logo.svg` exists, it will be used for brand consistency. Otherwise a fallback monogram is used.

## Project anatomy

See docs/PROJECT_STRUCTURE.md.