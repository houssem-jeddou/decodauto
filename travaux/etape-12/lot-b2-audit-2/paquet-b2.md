# Lot B2 de l'audit n° 2 : images de l'Article, aperçu d'image en grand, version imprimable

Préparé par Claude le 26/11/2026 (nuit), étape 12, sur les décisions du 26/11/2026 vers 2 h 30 (heure de Tunis), prises
par Claude (chat de pilotage) sur la délégation de Houssem du 25/11 à 23 h 58 (recopiées dans
`travaux/etape-12/audit-2/audit.md`, §10, et dans la demande n° 45). Branche `etape-12/lot-b2-audit-2`, partie du lot B1.
Audit : `travaux/etape-12/audit-2/audit.md` (propositions P7 et N2, maquette V4).

## 1. Ce qui change
- **P7, demande de changement n° 45, option A** (acceptée le 26/11 par délégation) :
  - **Images de l'Article** : chaque page éditoriale illustrée qui n'a pas de photo au registre (31 pages) déclare dans son
    Article trois images tirées de sa seule illustration, dans le panneau de la charte sur le fond nuit (comme l'image de
    partage) : 16:9 (1 200 × 675), 4:3 (1 200 × 900) et 1:1 (1 200 × 1 200), adresses absolues versionnées
    `/images-article/<id>-<format>.png?v=…`. Les 6 pages à photo gardent la photo seule. Module `src/lib/images-article.ts`,
    générateur `travaux/partage/generer-images-article.mjs` (hors construction : il faut Chrome), 93 images dans
    `src/images-article/` (5,5 Mo, de 49 à 94 Ko), copie à la construction des seules images déclarées
    (`scripts/integration-images-article.ts`). Les images de partage (Open Graph) ne changent pas.
  - **`max-image-preview:large`** : en mode indexable seulement, `<meta name="robots" content="max-image-preview:large">` sur
    chaque page qui a une adresse canonique (`APERCU_IMAGE`, `src/lib/site.ts`, `src/layouts/Base.astro`) ; en mode non
    indexable, la balise noindex reste seule ; la 404 n'en a pas.
  - **Contrôles** : ARTICLE-IMAGE-DONNEES et ARTICLE-IMAGE-FICHIER (`scripts/lib/images-article.ts`), IDX-META-APERCU
    (`scripts/lib/dist.ts`), PROD-APERCU-IMAGE (`scripts/lib/production.ts`) ; PHOTO-DONNEES refuse désormais une photo hors
    registre (et non toute image) ; l'alerte R7-IMAGE-RECOMMANDEE se tait sur une page illustrée (36 → 5 alertes, les 5
    restantes sont des R3-NIVEAU-A-VERIFIER inchangées). Tests : `tests/images-article.test.ts`, `tests/controle.test.ts`,
    `tests/site.test.ts`, `tests/adsense.test.ts`.
- **Version imprimable** (maquette V4, variante de la charte, décision du 26/11 par délégation, aucune licence imprimée) :
  bloc `@media print` en fin de `src/styles/charte-b.css` (l'écran ne change pas) ; adresse de la page en fin d'impression
  par l'attribut `data-adresse-imprimee` de `<main>` (`Base.astro`). `docs/11` version 10.
- **Documentation** : `CLAUDE.md`, `CONTROLES.md`, `docs/11`, commentaire de tête de `src/lib/donnees-structurees.ts`.
- **Rien d'autre** : aucun verdict, urgence, action, source, coût, adresse, title, H1 ni texte de page ne change.

## 2. Preuves
- **Balisage** (construction indexable) : `voyants/moteur/` → `"image":["https://decodauto.com/images-article/voyant-moteur-16x9.png?v=…", …4x3…, …1x1…]` ;
  `loi-montagne/` → la photo du registre seule ; 93 fichiers servis sous `/images-article/`, identiques à `src/images-article/`
  (ARTICLE-IMAGE-FICHIER) ; `<meta name="robots" content="max-image-preview:large">` sur l'accueil et les pages, aucune sur
  la 404 ; `npm run verifier:modes` : les quatre combinaisons de la double clé passent.
- **Écran inchangé** (`outils/capturer-zones.cjs`, `mesures/zones-avant.json` = lot B1, `zones-apres.json` = lot B2 ;
  outil, P0087, loi montagne ; 375 × 667 et 1366 × 800 ; police chargée et de secours) : CLS, haut du H1, bas de la première
  situation, haut de l'illustration, bas de la ligne de transparence, hauteur et largeur de la page identiques (12 mesures,
  0 différence). Captures `captures/avant-ecran-premier-ecran-*` et `apres-ecran-premier-ecran-*`.
- **Impression** (`outils/imprimer.cjs`, Chromium, A4, marges de 12 mm, police chargée et de secours ; deux premières
  pages en PNG à 90 ppp, `captures/*-v4-impression-*`) : outil 13 → 14 pages, loi montagne 6 → 6, P0087 6 → 7 (les sources
  sont désormais imprimées, la navigation et « À lire aussi » ne le sont plus) ; fond clair, tuiles claires, verdicts en
  noir dans leur contour de couleur ; « Sources » imprimée en entier (vérifié par `pdftotext` : la liste et « Page imprimée
  depuis https://decodauto.com/codes-defaut/p0087/ »).
- **Contrôles locaux** : `npm run schemas` (0 erreur), `npm test` (tous verts), `npm run build` (0 erreur, 5 alertes),
  `npm run liens` (0 problème), `npm run verifier:modes`. CI et Lighthouse : sur la pull request.

## 3. Revue indépendante
À compléter.
