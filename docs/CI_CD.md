# CI/CD

## GitHub Actions

Workflow: `.github/workflows/ci.yml`

- Triggers: push, pull_request on `main`
- Node matrix: 18, 20
- Caching: `actions/setup-node` npm cache
- Steps:
  1. Install dependencies
  2. Type check (`npm run typecheck`)
  3. Lint (`npm run lint`)
  4. Tests (`npm run test:run`)
  5. Build (`npm run build`)

## Branch protection (recommended)

- Require PRs for `main`
- Require passing checks (typecheck, lint, test, build)
- Require linear history or squash merges

## Pre-commit hooks (local)

- Husky + lint-staged:
  - `pre-commit`: ESLint + Prettier on staged files
  - `pre-push`: `typecheck` + `test:run`

## Deployments (suggested)

- Vercel or Netlify with PR previews:
  - Auto-deploy branches for visual review
  - Use environment variables with `VITE_` prefix only (client-side)