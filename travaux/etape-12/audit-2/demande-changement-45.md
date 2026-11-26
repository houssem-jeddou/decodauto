# Demande de changement n° 45 : image de l'Article et aperçu d'image en grand (proposition P7 de l'audit n° 2) — brouillon

Écrite par Claude dans la nuit du 25 au 26/11/2026, étape 12, audit n° 2 (`audit.md`, constat C8 et proposition P7).
**Statut : acceptée le 26/11/2026 vers 2 h 30 (heure de Tunis), option A, par Claude (chat de pilotage) sur la délégation de Houssem du 25/11 à 23 h 58** ; appliquée par le lot B2 (branche `etape-12/lot-b2-audit-2`, paquet `travaux/etape-12/lot-b2-audit-2/paquet-b2.md`) : images dans `src/images-article/` (module `src/lib/images-article.ts`), contrôles ARTICLE-IMAGE-*, IDX-META-APERCU et PROD-APERCU-IMAGE. Décisions recopiées en fin de document. Rien n'est appliqué. Format de `docs/03` : élément concerné, changement
proposé, raison (données), impact sur ce qui est validé, contrôles à relancer. Le n° 44 est réservé (demande de Houssem du 25/11).

## 1. Éléments concernés (validés ou figés)
- **Données structurées** (livrable 7.5a, `src/lib/donnees-structurees.ts`, `CLAUDE.md` § Technique) : « ni Organization,
  ni image sauf la photo du registre `data/photos.json` (demande de changement n° 42) ». Le commentaire de tête de
  `src/lib/donnees-structurees.ts` précise : « ni dessin ni image de partage ».
- **Contrôle DONNEES-STRUCTUREES-CONTENU** (`CONTROLES.md`) : « `image` seulement sur une page du registre des photos ».
- **Non-indexation à double clé** et contrôles IDX-META-ABSENTE / IDX-META-PRESENTE : aujourd'hui, en mode indexable,
  aucune balise `<meta name="robots">` n'est posée.
- **Images de partage** (lot U3, `src/lib/partage.ts`, contrôles PARTAGE-*) : inchangées ; elles deviennent aussi l'image
  de l'Article des pages sans photo.

## 2. Raison (données)
- **Mesure du 25/11** (`audit.md`, C8 ; construction indexable de `main` à b489309) : 31 des 37 pages éditoriales ont un
  Article sans `image` ; la construction l'annonce elle-même par 31 alertes R7-IMAGE-RECOMMANDEE (« pas d'image : Google la
  recommande pour les articles »). Les 6 autres ont la photo du registre (`data/photos.json`, demande n° 42).
- **Ce qui existe déjà** : chaque page éditoriale a une image de partage de 1 200 × 630 px, tirée de sa seule illustration,
  à une adresse versionnée (`/partage/<id>.png?v=…`), servie par le site et contrôlée (PARTAGE-*).
- **Documentation de Google**, lue par Claude (chat de pilotage) le 26/11/2026 (la session de l'audit n'y avait pas
  accès) :
  - page « Article (Article, NewsArticle, BlogPosting) structured data », mise à jour le 2026-09-08 : « For best results,
    we recommend providing multiple high-resolution images (minimum of 50K pixels when multiplying width and height) with
    the following aspect ratios: 16x9, 4x3, and 1x1. », « Images must represent the marked up content. », « Image URLs
    must be crawlable and indexable. » ;
  - page « Discover and your website » : « At least 1200 px wide », « High resolution of more than 300,000 total
    pixels », « 16x9 aspect ratio », « Enabled by the max-image-preview:large setting, or by using AMP ».
- **Effet attendu** : faible à moyen, non garanti : éligibilité à l'aperçu en grand et à Discover ; aucune garantie de
  classement. À suivre dans la Search Console (apparence « Discover », type « Image »).

## 3. Changement proposé
1. **Article.image** : sur une page éditoriale sans photo au registre, l'image tirée de sa seule illustration. L'image de
   partage (1 200 × 630, environ 1,9:1) ne suit aucun des rapports d'aspect cités ci-dessus : la documentation les
   confirme (§2) : le générateur des images de partage (`travaux/partage/generer-images-partage.mjs`) produit
   en plus trois versions de la même illustration, 16:9 (1 200 × 675), 4:3 (1 200 × 900) et 1:1 (1 200 × 1 200), données
   ensemble dans `image`. Sur une page du registre des photos, rien ne change (la photo d'abord ; l'image de
   partage s'ajoute en seconde position seulement si Houssem le choisit, option B ci-dessous).
2. **Aperçu en grand** : en mode indexable seulement, `<meta name="robots" content="max-image-preview:large">` sur chaque
   page qui a une adresse canonique. En mode non indexable, la balise `noindex` reste seule (la double clé ne change pas).
3. **Rien d'autre** : ni `datePublished`, ni Organization, ni publisher, ni FAQPage, ni HowTo.

Options :
- **A (recommandée)** : points 1 et 2, avec les trois rapports d'aspect (retenue le 26/11).
- **B** : A, plus les images tirées de l'illustration après la photo, sur les 6 pages à photo.
- **C** : point 1 seul.

## 4. Impact sur ce qui est validé
- Aucun verdict, urgence, action, source, coût, adresse, title ni H1 ne change. Aucune page ne change d'aspect.
- `date_modification` inchangée (règle 14 b : le balisage n'est pas le contenu).
- Texte à mettre à jour : `CLAUDE.md` (§ Technique, 7.5a), commentaire de tête de `src/lib/donnees-structurees.ts`,
  `CONTROLES.md`, `docs/08` si le balisage y est décrit, demande n° 42 (renvoi).

## 5. Contrôles à relancer ou à étendre
- DONNEES-STRUCTUREES-CONTENU : `image` = images tirées de l'illustration de la page (fichiers servis, empreintes
  contrôlées comme PARTAGE-*) sur une page sans photo ; photo du registre sinon (PHOTO-DONNEES inchangé).
- IDX-META-* : en mode indexable, une seule meta robots, sans `noindex`, valeur exacte `max-image-preview:large` ; en mode
  non indexable, `noindex` seul. Les quatre combinaisons de `npm run verifier:modes` repassées. PROD-* : la page en ligne
  porte la même balise (vérification de la production).
- `npm run schemas`, `npm test`, `npm run build`, `npm run liens`, Lighthouse de la liste de production.
- Test des données structurées (outil de Google) sur trois pages, à la recette du lot.

## Décisions du 26/11/2026 (vers 2 h 30, heure de Tunis), recopiées telles quelles

> Décisions prises cette nuit par Claude (chat de pilotage) sur la délégation de Houssem du 25/11 à 23 h 58, le 26/11 vers 2 h 30 (heure de Tunis) ; recopie-les telles quelles dans le journal et dans les demandes de changement. (1) L'audit n° 2 est accepté comme livrable : passe la PR #109 en prête, mets son statut à jour et fusionne-la quand sa CI est verte. (2) Lot B1, une branche et une PR depuis main après la fusion de #109 : P2 (les trois paires du plan, procédure du 23/10) ; P6 (les 33 meta descriptions ramenées à 155 caractères au plus, en commençant par les sept pages entre les positions 7,5 et 18 ; chacune reflète l'encadré de sa page, jamais un verdict, une urgence ou un coût absent de l'encadré ; « Mis à jour le », lastmod et empreinte inchangés ; balises de partage identiques ; plus le contrôle d'alerte au-delà de 155 caractères) ; P9 (demande n° 46 acceptée par délégation) ; P10 (variante de la charte : je confirme pour Houssem qu'une variante d'espacement du pied de page ne demande pas de nouvelle demande de changement au-delà de la n° 40). P8 n'est pas retenue (pastilles des codes sur trois lignes, gain faible) : note-la en idées reportées. (3) Lot B2 ensuite, à préparer pendant que la CI de B1 tourne : P7 (demande n° 45 acceptée, option A : les trois rapports d'aspect tirés de l'illustration, 16:9 en 1200 × 675, 4:3 en 1200 × 900 et 1:1 en 1200 × 1200, et max-image-preview:large en mode indexable seulement, noindex seul sinon) et la version imprimable V4 (variante de la charte, aucune licence imprimée). La documentation de Google a été lue par Claude le 26/11 : page « Article (Article, NewsArticle, BlogPosting) structured data », mise à jour le 2026-09-08 : « For best results, we recommend providing multiple high-resolution images (minimum of 50K pixels when multiplying width and height) with the following aspect ratios: 16x9, 4x3, and 1x1. », « Images must represent the marked up content. », « Image URLs must be crawlable and indexable. » ; page « Discover and your website » : « At least 1200 px wide », « High resolution of more than 300,000 total pixels », « 16x9 aspect ratio », « Enabled by the max-image-preview:large setting, or by using AMP ». (4) Pas cette nuit : la demande n° 47 (choix d'une licence, décision juridique de Houssem), P3 et P3b (loi montagne : faits et sources nouveaux, validation de Houssem), P1, P4 et P5 (relevé des sources d'abord), P11 (relevé J+30). Pour chaque lot : captures 375 × 667 et 1366 × 800 avec la police chargée et la police de secours, une seule revue indépendante, corrections, CI verte, fusion sur cette délégation, puis vérification du déploiement et de la production. Si un changement touche un verdict, une urgence, une action, une source, un coût, un title ou un H1, arrête-toi avant la fusion et signale-le. À la fin, journal docs/04 (ces décisions, les lots, les revues) dans une PR fusionnée quand sa CI est verte, puis un résumé : PR, commits de fusion, heures de déploiement, verdicts des revues, points ouverts.
