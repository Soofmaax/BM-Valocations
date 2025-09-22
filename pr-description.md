# Feat: Improve code quality and add CI workflow

## Description
- Cette PR améliore la robustesse du code en éliminant tout usage de `any` et en instaurant un typage strict dans une structure `src/` minimale.
- De nouvelles interfaces typées ont été créées et centralisées dans `src/types/`.
- Un workflow GitHub Actions (`.github/workflows/ci.yml`) a été ajouté pour automatiser les vérifications de qualité (type-check, linting & build) sur chaque `push` et `pull_request` vers `main`.
- ESLint est configuré pour interdire l’utilisation de `any` via la règle `@typescript-eslint/no-explicit-any: "error"`.

## Détails des changements
- Ajout:
  - `src/main.tsx`: point d’entrée React strictement typé
  - `src/App.tsx`: composant d’exemple entièrement typé
  - `src/types/index.ts`: définitions de types partagés (Vehicle, VehicleCategory)
  - `src/index.css`: base Tailwind et font
  - `.github/workflows/ci.yml`: workflow CI install + type-check + lint + build, avec:
    - matrice de versions Node (`18`, `20`)
    - cache npm (actions/setup-node avec `cache: 'npm'`)
- Modification:
  - `eslint.config.js`: ajout de la règle `@typescript-eslint/no-explicit-any: "error"`
  - `tailwind.config.js`: ajout du champ `content` pour inclure `./index.html` et `./src/**/*.{ts,tsx}` afin d’éviter la purge des classes utilisées
  - `package.json`: ajout du script `typecheck` (`tsc --noEmit`)

## Checklist
- [x] Aucune occurrence de `any` ou `as any`
- [x] Types partagés centralisés dans `src/types/`
- [x] ESLint interdit explicitement `any`
- [x] CI (install, type-check, lint, build) ajoutée

## Tests
- `npm run typecheck` doit passer
- `npm run lint` doit passer sans avertissements bloquants sur `any`
- `npm run build` doit réussir