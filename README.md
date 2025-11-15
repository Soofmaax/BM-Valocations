# BM-VA Locations — Sanity + Zoho + RGPD (Vercel EU)

Stack:
- Front: Vite + React + Tailwind + React Router
- CMS: Sanity (Studio + schema `car`)
- CRM: Zoho CRM (EU) — Leads + Products
- Serverless: Vercel (API routes)
- RGPD: Bannière consentement, chargement conditionnel Analytics/Marketing

## 1) Prérequis

- Vercel (projet)
- Sanity (projectId + dataset)
- Zoho CRM Developer (EU: zohoapis.eu / accounts.zoho.eu)
- GA4 + Microsoft Clarity (IDs)

## 2) Variables d’environnement (Vercel)

Frontend
- VITE_SANITY_PROJECT_ID
- VITE_SANITY_DATASET=production
- VITE_ZOHO_REGION=eu
- VITE_GA4_ID (ex: G-XXXXXX)
- VITE_CLARITY_ID (ex: XXXXXX)
- VITE_ZOHO_SALESIQ_WIDGET_CODE (widget code de SalesIQ)

API (serverless)
- ZOHO_BASE=https://www.zohoapis.eu
- ZOHO_ACCOUNTS=https://accounts.zoho.eu
- ZOHO_CLIENT_ID
- ZOHO_CLIENT_SECRET
- ZOHO_REFRESH_TOKEN
- SANITY_PROJECT_ID
- SANITY_DATASET=production
- SANITY_READ_TOKEN (token “read”)
- SANITY_WEBHOOK_SECRET (chaîne secrète)

Option: Google Search Console
- META tag dans index.html ou fichier de vérification à la racine (à ajouter selon préférence)

## 3) Sanity

Local Studio:
- `npm run studio:dev` (dossier `sanity/`)
Déploiement Studio:
- `npm run studio:deploy`

Schema voiture: `sanity/schemas/car.ts` inclut:
- listingType: 'sale' | 'rental'
- price (vente), rentalPricePerDay (location / jour)
- brand, model, year, mileage, fuel, transmission, status, features, images, description, publishedAt

## 4) Zoho CRM (EU)

Champs Leads (Settings → Modules and Fields → Leads)
- Consent_Status (Picklist: Consented, Not Consented)
- Consent_Timestamp (Date-Time)
- Consent_Policy_Version (Single line)
- utm_source, utm_medium, utm_campaign, utm_content, utm_term (Single line)

Champs Products (Settings → Modules and Fields → Products)
- Year (Number)
- Mileage (Number)
- Fuel (Single line)
- Transmission (Single line)
- Car_Status (Picklist ou Single line)
- Features (Long text ou Multi-select)
- Listing_Type (Picklist: sale, rental)
- Rental_Price_Per_Day (Number)

OAuth (EU):
- Créer client dans accounts.zoho.eu
- Obtenir client_id, client_secret
- Générer refresh_token (via grant flow)

## 5) Webhook Sanity → Zoho Products

Route serverless:
- `api/zoho/syncCar.ts`
Webhook:
- URL: https://YOUR-VERCEL-APP.vercel.app/api/zoho/syncCar
- Secret: SANITY_WEBHOOK_SECRET
- Events: create/update/publish sur `_type == "car"`
- Inclure document body (recommandé)

Note signature:
- La vérification de signature nécessite le "raw body". Les fonctions Vercel fournissent `req.body` parsé.
- Si la signature échoue, laisse `SANITY_WEBHOOK_SECRET` vide pour désactiver la vérification (et sécuriser par secret d’URL/règles).
- Sinon, utilise un middleware/edge function capable de lire le corps brut, ou configure Sanity pour envoyer le corps tel quel.

Test rapide:
- `api/zoho/testSyncCar.ts` (upsert d’un produit demo dans Zoho)

## 6) RGPD

- ConsentManager (`src/components/ConsentManager.tsx`): bannière + préférences
- Scripts conditionnels:
  - AnalyticsManager (`src/components/AnalyticsManager.tsx`): GA4 + Clarity (et Plausible si souhaité)
  - ChatManager (`src/components/ChatManager.tsx`): SalesIQ (marketing)
- Pages:
  - /privacy, /cookies (contenus à adapter)
- Fonts:
  - Google Fonts chargées uniquement si “Préférences” accepté (ou auto-hébergement `/public/fonts`)

## 7) Front

- Liste des voitures: `/cars` (`src/pages/CarsList.tsx`)
- Détail voiture: `/cars/:slug` (`src/pages/CarDetail.tsx`)
- Formulaire lead par voiture: `LeadForm` (envoi vers `/api/zoho/createLead`)
- Rewrites SPA (Vercel): `vercel.json` pour router côté client

## 8) Déploiement

- `npm run build`
- Push vers Vercel (connecter repo)
- Renseigner toutes les variables d’environnement
- Tester:
  - `/api/zoho/testSyncCar` → doit créer/mettre à jour un Product demo
  - Publier une voiture dans Sanity → webhook → Zoho Products
  - `/cars` → liste des voitures
  - Formulaire → création de Lead Zoho avec RGPD + UTM

## 9) Notes

- Les scripts analytics et marketing ne se chargent qu’après consentement (RGPD).
- Les routes `/api/*` sont préservées dans `vercel.json`.
- Si tu préfères Netlify, déplacer les fonctions dans `netlify/functions` et ajouter un `netlify.toml` (réécritures SPA + proxy fonctions).