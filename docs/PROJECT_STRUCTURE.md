# Project structure

```
.
├─ src/
│  ├─ pages/            # Route components (Home, Fleet, Support, NotFound)
│  ├─ components/       # Reusable UI + a11y helpers
│  │  ├─ ui/            # Button, ButtonLink, Card, Badge, cn()
│  ├─ data/             # Typed sample data
│  ├─ types/            # Shared TypeScript types
│  ├─ test/             # Testing setup (jest-dom)
│  ├─ index.css         # Tailwind base and global styles
│  ├─ main.tsx          # React root + HelmetProvider
│  └─ App.tsx           # Router, layout (Header, Main, Footer)
│
├─ public/
│  ├─ brand/            # Place `logo.svg` here to auto-generate assets
│  ├─ robots.txt        # Allow all, sitemap link
│  ├─ sitemap.xml       # Main routes
│  └─ *.png             # Generated OG images & icons (prebuild)
│
├─ scripts/
│  └─ generate-og.mjs   # Generates OG images & favicons
│
├─ .github/workflows/ci.yml # CI pipeline (install, typecheck, lint, test, build)
├─ tailwind.config.js       # Theming tokens, animations, content paths
├─ vite.config.ts           # Vite + PWA + Vitest options
├─ eslint.config.js         # ESLint flat config (no explicit any)
├─ package.json             # Scripts + dev tooling config
└─ docs/                    # Knowledge base for devs/clients
```

## UI

- Button, ButtonLink: variants (primary/secondary/ghost) and sizes (sm/md)
- Card: Card, CardHeader, CardTitle, CardContent
- Badge: generic + CategoryBadge
- Tailwind tokens: primary colors, border radius, shadows, subtle animations

## A11y

- Skip link
- Route announcer (aria-live)
- Focus handler on route change
- eslint-plugin-jsx-a11y enabled

## SEO & PWA

- Open Graph/Twitter defaults in index.html
- Per-page overrides via Helmet
- PWA via vite-plugin-pwa (auto-update)
- Canonical link, theme-color, sitemap, robots