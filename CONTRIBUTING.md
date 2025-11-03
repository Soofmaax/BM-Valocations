# Contributing guide

Thanks for your interest in contributing! This project is used in a client context and as portfolio material. Please follow these guidelines.

## Prerequisites

- Node 18+ (or 20+)
- npm 9+
- Fork and clone the repository
- Install dependencies: `npm install`

## Branching

- Create a feature branch from `main`:
  - `git checkout -b feat/your-feature`
- Keep PRs small and focused.

## Commit style

- Conventional commits recommended:
  - `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `ci:`, `build:`
- Examples:
  - `feat(ui): add Button component variants`
  - `fix(a11y): restore focus outline on skip link`

## Quality gates

- Type checks: `npm run typecheck`
- Lint: `npm run lint` (ESLint, no `any`)
- Format: `npm run format:fix` (Prettier)
- Tests: `npm run test:run` (Vitest + RTL)
- Build: `npm run build`

All the above run in CI. Local checks before pushing will save time.

## Code style

- Use the small UI components (Button, Card, Badge) when suitable
- Keep components small and typed
- Prefer composition over inheritance
- Accessibility: keyboard focus, aria attributes, semantic HTML

## Adding dependencies

- Discuss before adding heavy dependencies
- Avoid overlapping tools; follow the existing patterns

## Documentation

- Update `README.md` and `docs/*` if you change dev flow, CI, a11y, SEO/PWA or structure
- Add entries to `CHANGELOG.md` under “Unreleased”

## Security

- Do not commit secrets. Vite client env must be prefixed with `VITE_`
- Report vulnerabilities privately — see `SECURITY.md`

## License

- Submissions are accepted under the project’s MIT license