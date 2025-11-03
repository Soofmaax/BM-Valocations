# Guide Funnel Marketing & Upsell (Stack C)

Objectif: document professionnel pour concevoir et opérer un funnel marketing orienté ebook, avec upsell/cross-sell, analytics dédiés et séquences post-achat. Adapté à un site statique (Vite + React) avec backend minimal (Supabase Edge Functions + Resend).

---

## 1) Page Ebook enrichie

Structure conseillée (route: `/ebooks/:slug`)
- Hero:
  - Titre, sous-titre orientés bénéfices
  - Visuel de couverture (responsive), badge "Extrait gratuit"
  - CTA principal: “Télécharger l’extrait” (sans friction) + CTA secondaire “Acheter l’ebook”
- “Vous apprendrez…”:
  - 5–8 bullets ciblés (valeur concrète, verbes d’action)
- Extrait PDF:
  - `public/ebooks/<slug>/extrait.pdf` (1–2 chapitres)
  - Affichage inline (embed) + lien de téléchargement
- Avis:
  - 3–6 témoignages courts, avec prénom + métier + avatar (optionnel), note (★)
- FAQ concise:
  - 4–6 questions fréquentes (format accordéon)
- Garantie / Confiance:
  - Rassurer (remboursement, mises à jour gratuites, support email)
- JSON-LD:
  - Product + Offer (prix, devise, disponibilité)
  - Voir §5 pour exemple

Contenu à préparer par ebook:
- slug (unique), title, subtitle, description (SEO), price (EUR), cover image
- excerpt_pdf_url, features[] (“Vous apprendrez…”)
- testimonials[] (name, role, quote, rating)
- faq[] (q, a)
- coupons[] (code, discount%, valid_until), sources (UTM)
- related[] (slug pour cross-sell)

---

## 2) Séquences post-achat (J+1, J+7) + Cross-Sell

Pipeline recommandé:
1) À l’achat:
   - Créer une entrée `orders` avec: email, slug, order_id, amount, coupon, source, purchased_at
2) J+1 (Onboarding/valeur):
   - Email: “Comment tirer le maximum de [ebook] en 20 minutes”
   - 3 points d’action + lien vers une check-list
   - Appel: répondre à une question (“quel est votre contexte ?”)
3) J+7 (Cross-sell):
   - Email: “Prochaine étape: [autre ebook complémentaire]”
   - Positionnement: montre la progression et l’intérêt d’aller plus loin
   - Offre: -15% avec coupon (limité 72h), bouton d’achat

Segmentation (exemples)
- Par slug (thématique)
- Par coupon (VIP/Promo)
- Par source (utm_source)
- Par usage détecté (questions posées en J+1)

Implémentation technique (Supabase + Resend)
- Edge Function `orders-create`: appelée à la fin du paiement (webhook ou callback client), insère l’ordre.
- Edge Function `orders-drip` (cron quotidien):
  - Sélectionne les orders J+1/J+7 (différence de dates)
  - Enrichit le contenu selon segment
  - Envoie via Resend (API Key côté serveur)
  - Respecte les désabonnements (table `unsubscribes` par email + slug)

Anti-spam / RGPD
- Ajoutez lien de désinscription dans les emails (“Se désinscrire” → Edge Function `unsubscribe` qui enregistre `email, slug, created_at`)
- Conservez un registre des envois (table `drip_log`) pour éviter doublons

---

## 3) Funnels analytics (vue → clic → paiement → téléchargement)

Objectif: suivre précisément la performance par slug/coupon/source (UTM).

Événements à instrumenter
- `ebook_view` — quand la page `/ebooks/:slug` est vue
  - params: { slug, source, coupon }
- `ebook_cta_click` — clic “Acheter” ou “Télécharger l’extrait”
  - params: { slug, source, coupon, cta: 'buy' | 'excerpt' }
- `ebook_payment_start` — entrée sur page de paiement (Checkout)
  - params: { slug, amount, coupon, source }
- `ebook_payment_success` — achat confirmé
  - params: { slug, amount, coupon, source, order_id }
- `ebook_download` — téléchargement du PDF complet
  - params: { slug }

Capture source / coupon
- UTM: `utm_source`, `utm_medium`, `utm_campaign` (capturés depuis l’URL, stockés localStorage, envoyés dans les events)
- Coupon: si code appliqué (via URL `?coupon=XYZ` ou formulaire), propager dans params

Intégration technique
- GA4: ajoutez le script gtag dans `index.html` (voir doc GA4), notre helper `track(event, params)` forwarde vers gtag si présent.
- Supabase (optionnel): dupliquez les événements en base (Edge Function `events-collect`) pour faire du reporting custom.

Dashboard (idées)
- Taux de conversion par slug: view → click → payment → success
- Impact des coupons: uplift % par coupon
- Sources: performance par `utm_source` (SEO, Ads, Social, Referral)
- Téléchargements d’extrait: corrélé aux achats

---

## 4) Upsell & Cross-sell

Positionnement:
- Cross-sell J+7: propose un ebook complémentaire (suite logique)
- Upsell sur la page “merci” post-achat:
  - Ajoutez un encart “Pack double” à -20% valable 72h
- Persistance coupon:
  - Référez `coupon` + bannière sur pages concernées

Règles de communication
- Sous 2 emails/semaine max pour éviter la fatigue
- Valeur avant promotion: tips, étude de cas
- Segmentation > broadcast: adaptez le message au segment

---

## 5) SEO “AI-friendly” + JSON-LD (exemple)

Sur `/ebooks/:slug`, ajoutez un JSON-LD `Product` + `Offer`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Titre de l'ebook",
  "description": "Bénéfices, thèmes couverts.",
  "image": "https://exemple.com/ebooks/slug/cover.jpg",
  "brand": "SmarterLogic Web",
  "sku": "ebook-slug",
  "offers": {
    "@type": "Offer",
    "url": "https://bm-valocations.com/ebooks/slug",
    "priceCurrency": "EUR",
    "price": "29",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "132"
  }
}
</script>
```

Copywriting & structure:
- Titres H1/H2 clairs + “Vous apprendrez…”
- Paragraphes courts, bullet points informatifs
- Témoignages crédibles (métier + court contexte)
- FAQ orientée objections (prix, mise à jour, support)
- Optimisation semantic HTML (aria, alt)

---

## 6) Mise en place rapide (stack actuelle)

Front (React):
- Route `/ebooks/:slug` (lazy), données via `src/data/ebooks.ts` ou JSON public
- Section Hero, Features (“Vous apprendrez…”), Extrait, Avis, FAQ, CTA
- `track('ebook_view', { slug, source, coupon })` au mount
- `track('ebook_cta_click', { slug, source, coupon, cta })` sur les boutons

Backend (Supabase + Edge Functions + Resend):
- `orders-create`: insert order + email de confirmation si souhaité
- `orders-drip`: cron quotidien → J+1/J+7 (gère segments + unsub)
- `events-collect`: (optionnel) collecte event si vous voulez un data warehouse
- Secrets: RESEND_API_KEY, ADMIN_EMAIL, RESEND_FROM

---

## 7) Templates email (FR)

J+1 — Onboarding/valeur:
- Objet: “[ebook] En 20 minutes: votre premier résultat”
- Corps (extraits):
  - “Voici 3 actions à appliquer dès aujourd’hui…”
  - “Check-list pratique (PDF)” → lien
  - “Répondez à ce mail: quel est votre objectif en 2 phrases ?”

J+7 — Cross-sell:
- Objet: “Prochaine étape (–15% 72h): [ebook complémentaire]”
- Corps:
  - “Vous avez mis en pratique [X]… La suite logique est [Y].”
  - “Utilisez le code NEXT15 (expire dans 72h)”
  - Bouton “Découvrir l’ebook”

Footer (RGPD):
- “Se désinscrire” → lien vers Edge Function `unsubscribe`

---

## 8) QA Checklist — Avant mise en ligne

- Contenu:
  - Page ebook: hero, “Vous apprendrez…”, extrait, avis, FAQ, CTA OK
  - JSON-LD Product + Offer valides (Rich Results Test)
- Tracking:
  - UTM capturés et propagés
  - Events envoyés: view, cta, payment_start, payment_success, download
- Emails:
  - Secrets Resend OK, Edge Functions OK, cron `orders-drip` actif
  - Unsubscribe fonctionne et est loggé
- SEO/Perf:
  - Titles/Meta FR, sitemap à jour, robots OK
  - Lighthouse 90+ (performance/accessibility/SEO)
- Double pages / doublons:
  - Pas de contenu dupliqué, slugs uniques, 404 propre

---

## 9) Outils conseillés

- GA4 (analytics funnels)
- Supabase (data minimal + functions + cron)
- Resend (email transactionnel)
- Rich Results Test (JSON-LD validation)
- UTM everywhere (liens campagnes, coupons)

---

## 10) Prochaine étape

1) Créez le modèle `src/data/ebooks.ts` ou un JSON public (slug/titre/…).
2) Ajoutez la route `/ebooks/:slug` + sections recommandées.
3) Branchez GA4 si vous souhaitez des reports prêts à l’emploi.
4) Configurez `orders-create` / `orders-drip` (Edge Functions) + Resend.
5) QA avec la checklist, puis go-live.