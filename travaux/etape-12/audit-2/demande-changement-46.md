# Demande de changement n° 46 : « Signaler une erreur » juste après la décision (proposition P9 de l'audit n° 2) — brouillon

Écrite par Claude dans la nuit du 25 au 26/11/2026, étape 12, audit n° 2 (`audit.md`, constat C9 et proposition P9,
maquette V1). **Statut : acceptée le 26/11/2026 vers 2 h 30 (heure de Tunis), par Claude (chat de pilotage) sur la délégation de Houssem du 25/11 à 23 h 58** ; appliquée par le lot B1 (branche `etape-12/lot-b1-audit-2`, paquet `travaux/etape-12/lot-b1-audit-2/paquet-b1.md`) : le contrôle est une règle à part, SIGNALER-ERREUR-TRANSPARENCE, plutôt qu'une extension de SIGNALER-ERREUR-ABSENT (même effet). Décisions recopiées en fin de document. Rien n'est appliqué. Format de `docs/03`.

## 1. Éléments concernés (validés ou figés)
- **Composants communs** (livrable 6.3, `src/lib/composants.ts`, `src/lib/gabarit.ts`) : le lien « Signaler une erreur »
  (`data-signaler-erreur`) est posé une fois, dans le pied de page de chaque page.
- **Ligne de transparence** (charte éditoriale, `docs/10`, §5.1 ; texte exact dans `src/lib/charte.ts`, `LIGNE_TRANSPARENCE`) :
  texte puis lien « Méthode ». Son texte ne change pas ; un lien s'ajoute après « Méthode ».
- **Charte graphique** (`docs/11`, `src/styles/charte-b.css`) : §3 (texte : signature et ligne de transparence en 13 px).
- **Contrôle SIGNALER-ERREUR-ABSENT** (`CONTROLES.md`).

## 2. Raison (données)
- **Mesure du 25/11** (`audit.md`, C9 ; `mesures/maquettes-avant.json`, `ux.json`) : au téléphone, le seul lien
  « Signaler une erreur » est dans le pied de page, après « À lire aussi » et « Sources » : le pied commence à 7 576 px
  (11,4 écrans) sur la page P0087 ; « À lire aussi », au-dessus du pied, est à 17,3 écrans sur le voyant moteur et 15,2
  sur la surchauffe moteur. Un lecteur qui doute de la décision la lit en haut
  de page et ne voit pas où le dire.
- Le site n'a pas de relecteur mécanicien (`docs/01`, page « à propos ») : les signalements des lecteurs sont une source de
  correction ; le lien pré-rempli (adresse de la page dans l'objet et le corps) existe déjà.
- **Maquette V1** sur la construction réelle (`maquettes/avant-transparence-*`, `apres-transparence-*`) : à 375 et
  1 366 px, deux polices, le lien tient sur la dernière ligne de la ligne de transparence sur les trois pages mesurées ; bas
  de la ligne, haut de l'illustration et bas de la première situation inchangés ; Lighthouse mobile 100 dans les quatre
  catégories et CLS 0 avant comme après (`mesures/lighthouse-maquettes.json`).

## 3. Changement proposé
- Sur chaque page éditoriale (37 pages), la ligne de transparence se termine par « Méthode · Signaler une erreur » : même
  adresse pré-remplie que le lien du pied de page, même texte, protégé de la même façon (`email_off`), sans retour à la ligne
  entre le point médian et le lien.
- Le lien du pied de page reste (toutes les pages, 404 comprise).
- Pages du socle, accueil et 404 : inchangées (pas de ligne de transparence).

## 4. Impact sur ce qui est validé
- Aucun verdict, urgence, action, source, coût, adresse, title ni H1 ne change ; texte de la ligne de transparence
  inchangé ; `date_modification` inchangée (règle 14 b : le gabarit n'est pas le contenu).
- À mettre à jour : `docs/10` (ligne de transparence : le lien qui la suit), `docs/11` (§3, texte de la
  ligne de transparence), `CLAUDE.md` (composants communs), `CONTROLES.md`.

## 5. Contrôles à relancer ou à étendre
- SIGNALER-ERREUR-ABSENT : sur une page éditoriale, deux liens, le premier dans la ligne de transparence, tous deux au
  texte « Signaler une erreur » et à la même adresse que celle de la page ; un seul ailleurs.
- FORMAT2-MESURES : bas de la première situation et haut du visuel inchangés (règles 2a et 2i).
- Captures 375 × 667 et 1 366 × 800, police chargée et police de secours, sur trois pages de types différents ; Lighthouse ;
  `npm run schemas`, `npm test`, `npm run build`, `npm run liens`.

## Décisions du 26/11/2026 (vers 2 h 30, heure de Tunis), recopiées telles quelles

> Décisions prises cette nuit par Claude (chat de pilotage) sur la délégation de Houssem du 25/11 à 23 h 58, le 26/11 vers 2 h 30 (heure de Tunis) ; recopie-les telles quelles dans le journal et dans les demandes de changement. (1) L'audit n° 2 est accepté comme livrable : passe la PR #109 en prête, mets son statut à jour et fusionne-la quand sa CI est verte. (2) Lot B1, une branche et une PR depuis main après la fusion de #109 : P2 (les trois paires du plan, procédure du 23/10) ; P6 (les 33 meta descriptions ramenées à 155 caractères au plus, en commençant par les sept pages entre les positions 7,5 et 18 ; chacune reflète l'encadré de sa page, jamais un verdict, une urgence ou un coût absent de l'encadré ; « Mis à jour le », lastmod et empreinte inchangés ; balises de partage identiques ; plus le contrôle d'alerte au-delà de 155 caractères) ; P9 (demande n° 46 acceptée par délégation) ; P10 (variante de la charte : je confirme pour Houssem qu'une variante d'espacement du pied de page ne demande pas de nouvelle demande de changement au-delà de la n° 40). P8 n'est pas retenue (pastilles des codes sur trois lignes, gain faible) : note-la en idées reportées. (3) Lot B2 ensuite, à préparer pendant que la CI de B1 tourne : P7 (demande n° 45 acceptée, option A : les trois rapports d'aspect tirés de l'illustration, 16:9 en 1200 × 675, 4:3 en 1200 × 900 et 1:1 en 1200 × 1200, et max-image-preview:large en mode indexable seulement, noindex seul sinon) et la version imprimable V4 (variante de la charte, aucune licence imprimée). La documentation de Google a été lue par Claude le 26/11 : page « Article (Article, NewsArticle, BlogPosting) structured data », mise à jour le 2026-09-08 : « For best results, we recommend providing multiple high-resolution images (minimum of 50K pixels when multiplying width and height) with the following aspect ratios: 16x9, 4x3, and 1x1. », « Images must represent the marked up content. », « Image URLs must be crawlable and indexable. » ; page « Discover and your website » : « At least 1200 px wide », « High resolution of more than 300,000 total pixels », « 16x9 aspect ratio », « Enabled by the max-image-preview:large setting, or by using AMP ». (4) Pas cette nuit : la demande n° 47 (choix d'une licence, décision juridique de Houssem), P3 et P3b (loi montagne : faits et sources nouveaux, validation de Houssem), P1, P4 et P5 (relevé des sources d'abord), P11 (relevé J+30). Pour chaque lot : captures 375 × 667 et 1366 × 800 avec la police chargée et la police de secours, une seule revue indépendante, corrections, CI verte, fusion sur cette délégation, puis vérification du déploiement et de la production. Si un changement touche un verdict, une urgence, une action, une source, un coût, un title ou un H1, arrête-toi avant la fusion et signale-le. À la fin, journal docs/04 (ces décisions, les lots, les revues) dans une PR fusionnée quand sa CI est verte, puis un résumé : PR, commits de fusion, heures de déploiement, verdicts des revues, points ouverts.
