# Porte de sortie de l'étape 10 (vague B) : dossier de vérification

**État : dossier du 17/11/2026 (matin), après la fusion des quatre lots de la vague B (PR #76, #80, #81, #82),
relevé sur `main` à b1c7d57 (fusion de la PR #82), dont le passage de la CI (44043161687, déploiement et production
compris) sert de preuve. La PR #79 (partie technique du modèle fluide, sans page publiée) a été fusionnée ensuite.**
À relire par une revue indépendante, puis **à valider par Houssem**. Rien ici n'est « validé » au sens de la porte tant
que Houssem ne l'a pas écrit.

Porte (docs/03, ligne 10) : exemples panne et dossier validés par Houssem (verdicts et encadrés de décision) avant la
rédaction du lot ; gravité lisible et lien « Signaler une erreur » présents dans ces modèles ; chaque exemple passe
ensuite par le paquet et la recette de son lot ; **mêmes critères que la vague A** (ligne 8, ce qui s'applique aux pages
panne et dossier) ; le site étant en ligne et indexable, la liste de recette de l'étape 9 est repassée avant chaque
fusion d'un lot de pages. Porte par lot de mise en ligne, comme à l'étape 8 (demande n° 17) : l'étape se ferme quand
tous les lots ont passé leur porte de lot et que la porte complète est vérifiée sur l'ensemble.

## 1. Les lots et leur porte de lot

| Lot | Pages (adresse) | Validation de Houssem | Revue indépendante | Mise en ligne |
|---|---|---|---|---|
| Exemples de la porte 10 (devenus le lot B1) | voiture qui ne démarre pas (`/voiture-ne-demarre-pas/`, panne, arbre) ; moteur PureTech (`/moteur-puretech/`, dossier) | 16/11, 19 h 26 : « Je valide les exemples de la porte 10 » (`paquet-porte-10.md`, `paquet-porte-10-fin.md` ; journal, PR #72, f49c012) | oui, une revue du paquet (16/11 ; section « Revue indépendante » de `paquet-porte-10-fin.md`) | voir B1 |
| B1 | les deux exemples, sans un mot changé (`lot-b1/README.md` : comparaison avec b9b0835, version validée) ; ouverture de la vague B (`config/vagues-ouvertes.json`) | validation des exemples ci-dessus ; ouverture de la vague décidée par Claude le 17/11 vers 0 h 20, sur la délégation de Houssem du 17/11 à 0 h 13 (aucun verdict nouveau) | oui, PR #76 (16/11 au soir) : « à corriger », rien de bloquant ; corrigé, non relu (journal) | 17/11, 0 h 28, PR #76 (589561c) |
| B2 | batterie de voiture (`/batterie-voiture/`, arbre) ; recharger la batterie (`/batterie-voiture/recharger/`, tutoriel) ; changer la batterie (`/batterie-voiture/changer/`, tutoriel) | 17/11, 7 h 39 : « Je valide tout ! Fais le necessaire », réponse au message du matin qui portait mot pour mot la ligne de validation de `paquet-lot-b2-fin.md` | oui (16/11) : « à corriger », 1 bloquant, 8 importants, 14 mineurs ; corrigés avant le paquet, non relus | 17/11, PR #80 (a29e27f) |
| B3 | moteur qui surchauffe (`/moteur-qui-surchauffe/`, arbre) ; nettoyer le FAP (`/nettoyer-fap/`, tutoriel) ; paire de liens `nettoyer-fap` ↔ `voyant-moteur` | 17/11, 7 h 39, même réponse (ligne de `paquet-lot-b3-fin.md`, paire et étapes du FAP au-delà de six écrans comprises) | oui (16/11) : « à corriger », 1 bloquant, 7 importants, 10 mineurs ; corrigés avant le paquet, non relus | 17/11, PR #81 (2627df3) |
| B4 | perte de puissance (`/perte-de-puissance-voiture/`, arbre) ; voiture qui broute (`/voiture-qui-broute/`, arbre) ; bruit moteur (`/bruit-moteur/`, arbre) ; fumée à l'échappement (`/fumee-echappement/`, arbre) ; demande n° 34 (requête principale de la page fumée) | 17/11, 7 h 39, même réponse (ligne de `paquet-lot-b4-fin.md`, demande n° 34 et arbre de « perte de puissance » au-delà de six écrans compris) | oui (16/11) : « à corriger », 1 bloquant, 12 importants, 13 mineurs ; corrigés avant le paquet, non relus ; pas de seconde revue (décision de Houssem du 16/11) | 17/11, PR #82 (b1c7d57) |

**11 pages en ligne** sur les ≈ 11 de la vague B (docs/03, ligne 10 : 6 pannes, batterie et ses 2 tutoriels, tutoriel
FAP, dossier PureTech) : 10 pages panne (dont 3 au format tutoriel) et 1 dossier. Chacune porte son empreinte
`validation:` (relevé `porte-10/empreintes.txt`). Le site compte 31 adresses en ligne (liste Lighthouse de
production).

Validation du 17/11 (7 h 39) : la phrase de Houssem est générale ; elle répond à un message du pilotage qui reprenait mot
pour mot les lignes de validation des paquets F3, B2, B3 et B4 (fichiers `*-fin.md`) et la phrase d'acceptation de la
demande n° 33. Chaque paquet porte en tête la citation, la date, l'heure et le renvoi à sa ligne. Le message du pilotage
n'est pas dans le dépôt : son texte est à garder au journal (Houssem s'en charge).

Après chaque fusion : la fusion a été faite par Houssem, branche à jour de `main`, CI verte sur la tête exacte. Les
branches B3 et B4 contenaient les lots précédents. Deux commits poussés par une autre session le 17/11 à 1 h 02, avant
la validation de Houssem (af4ad11 et 52287cf, qui complétaient les paquets B3 et B4 des mesures de la recette et des
exceptions de six écrans), ont été intégrés par fusion avant la pose des empreintes ; ce sont ces versions que les
lignes de validation citent.

## 2. Critères de la porte complète

| Critère | Preuve | État au 17/11 |
|---|---|---|
| **Ligne 10.** Exemples panne et dossier validés par Houssem (verdicts et encadrés de décision) avant la rédaction du lot | validation du 16/11 à 19 h 26 (`paquet-porte-10-fin.md`, journal) ; premiers commits des brouillons des lots B2 à B4 : 16/11, 19 h 46 (09e0a98, B2), 19 h 52 (4495298, B3), 19 h 56 et 19 h 59 (f48c882 et cf33c98, B4), sur leurs branches (`git log --diff-filter=A`) | **vérifié** pour ce que montre l'historique Git : tous les brouillons des lots sont postérieurs à la validation. Le moment où leur rédaction a commencé hors de Git n'est pas vérifiable |
| **Ligne 10.** Gravité lisible et lien « Signaler une erreur » dans les modèles panne et dossier | contrôles R9-ENCADRE-CONTENU (libellés du verdict et de l'urgence de chaque ligne, CONTROLES.md) et SIGNALER-ERREUR-ABSENT, dans le job « Contrôles » de `main` (passage 44043161687) ; relevé sur la construction de production des 11 pages (`porte-10/pages.txt`, commandes en tête, script `porte-10/releve-pages.cjs`) : 55 lignes d'encadré, chacune avec ses deux libellés écrits et `data-verdict`, `data-urgence` ; un lien « Signaler une erreur » par page ; icône de forme propre à chaque verdict (WCAG 1.4.1, CONTROLES.md) | **vérifié** sur les 11 pages |
| **Ligne 10.** Chaque exemple passe par le paquet et la recette de son lot | les deux exemples sont le lot B1 : paquet de la porte 10, recette de la porte 10 (`recette-porte-10/`) refaite sur la construction de production dans le README du lot B1 | **vérifié** |
| **Ligne 8.** Faits vérifiés sur sources, verdicts validés ; faits de sécurité et chiffres dans le paquet validé par Houssem | un paquet par lot avec ses points à trancher (verdict de chaque ligne saisie, avec ses citations et la grille dans les deux sens) ; extraits relus mot pour mot à l'écran (`travaux/etape-10/textes/*-verification.md`) ; registre `data/sources.json` (contrôles R3-*, SOURCE-SECONDAIRE-NATURE, demande n° 31) ; lignes de validation citées en tête de chaque paquet | **vérifié** sur les 11 pages pour les verdicts (validés par Houssem) ; les faits ont été relus contre leurs sources par Claude et par la revue de chaque lot, **pas par un tiers humain** (règle : une relecture par une IA n'est pas une vérification ; Houssem valide les verdicts et l'encadré) |
| **Ligne 8.** Encadrés de décision relus par Houssem | empreinte `validation:` des 11 pages, recalculée par `npm run empreinte` et comparée au fichier (`porte-10/empreintes.txt`) ; R4-EMPREINTE et R4-VALIDATION-ABSENTE à chaque construction, job « Contrôles » de `main` (passage 44043161687) | **vérifié** : 11 empreintes sur 11 |
| **Ligne 8.** Lighthouse mobile ≥ 95 et CLS < 0,1 sur une page de chaque modèle, emplacements factices | job « Démonstration du format 2 » de `main` (passage 44043161687) : construction de démonstration, emplacements factices (`pubFactice`, `scripts/lib/donnees-site.ts`), liste `lighthouserc-demo-format2.json` ; elle contient, depuis le passage des lots, les vraies pages **perte de puissance** (modèle panne, arbre), **changer la batterie** (modèle panne au format tutoriel) et **moteur PureTech** (modèle dossier) | **vérifié** (passage 44043161687, médiane de 3 passages) : perte de puissance, changer la batterie et moteur PureTech, ainsi que voiture qui broute, à 100 en performance, accessibilité, bonnes pratiques et SEO, CLS 0,000 ; les 14 adresses de la démonstration au même niveau. Le job « Recette des exemples » (`lighthouserc-exemples.json`) n'a ni page panne ni dossier : c'est la démonstration qui couvre ces modèles |
| **Ligne 8** (en plus, comme à la porte 8). Lighthouse mobile sur toutes les adresses en ligne | job « Lighthouse mobile » de `main` (passage 44043161687), liste `lighthouserc.json` (31 adresses, dont les 11 de la vague B), médiane de 3 passages | **vérifié** (même passage) : 31 adresses sur 31 à 100 dans les quatre catégories, CLS 0,000, LCP de 754 à 1 055 ms |
| **Ligne 10.** Liste de recette de l'étape 9 repassée avant chaque fusion d'un lot | B1 : liste repassée point par point sur la construction de production (`lot-b1/README.md`, « Liste de recette de l'étape 9 ») ; B2 à B4 : recette de chaque lot (`recette-lot-b2/`, `recette-lot-b3/`, `recette-lot-b4/` : contrôles, mesures du format 2 à 320, 375 et 1366 px, Lighthouse, captures dans les deux polices), refaite après la revue, puis CI verte sur la tête exacte de chaque PR (contrôles, recette, démonstration, Lighthouse, indexation durable) ; pages des lots B2 et B3 relues en ligne après leur déploiement (messages du pilotage du 17/11), sans relevé dans le dépôt | **partiellement vérifié** : les points SEO, liens, accessibilité automatique, juridique et format 2 sont couverts par les contrôles et la recette de chaque lot ; pour B2 à B4, la liste n'a pas été repassée point par point comme pour B1 (navigation au clavier et contour de focus, comparaisons en tableau, liste des H2) ; le rendu sur un vrai téléphone fait l'objet de la ligne suivante |
| **Ligne 10** (liste de recette, lots au format 2, docs/03 règle 15). Rendu sur un vrai téléphone | aucune : ni capture ni relevé d'un vrai téléphone dans le dépôt pour les 11 pages ; les captures des recettes sont prises dans Chromium à 320, 375 et 1366 px | **non vérifié** : à faire par Houssem (journal, points ouverts, pour B1) |
| **Ligne 9** (après le déploiement de chaque lot). En-tête et balise robots, robots.txt, plan du site, inspection d'URL, soumission à Bing | job « Production en ligne » de `main` (passage 44043161687) : redirections, absence de noindex, robots.txt, plan du site (`npm run production`) ; Search Console et Bing : journal (B1 : indexation demandée et adresses soumises le 17/11, 0 h 13 à 1 h 15) | **vérifié** pour le contrôle automatique : « Production : tout est conforme. », mode INDEXABLE, après le déploiement de b1c7d57 (passage 44043161687) ; **B2 à B4 : inspection d'URL et soumission à Bing non relevées dans ce dossier** (faites par Houssem ou à faire) |
| **Ligne 8.** Contrôles au vert | dernier passage de `main` (b1c7d57, passage 44043161687) : contrôles, recette, démonstration, Lighthouse, origine des commits, déploiement, production en ligne ; alertes non bloquantes listées dessous | **vérifié** : passage 44043161687 sur b1c7d57, les huit jobs verts (contrôles, recette, démonstration, Lighthouse, origine des commits, secrets, déploiement, production) ; construction : 31 pages éditoriales, 0 erreur, 33 alertes (relevé local de `npm run build` sur b1c7d57) |

**Alertes non bloquantes de la construction** (relevé local de `npm run build` sur b1c7d57 : 33 alertes, 5 R3-NIVEAU-A-VERIFIER et 28 R7-IMAGE-RECOMMANDEE) :
- R3-NIVEAU-A-VERIFIER sur « changer la batterie », ligne « La batterie est hors d'usage et doit être remplacée »
  (Renault et Dacia : « faites appel », « impérativement ») : tranchée au paquet du lot B2 (point 5, lecture de la
  grille), validée avec le lot ;
- les trois R3-NIVEAU-A-VERIFIER de la base (préchauffage Seat, airbag passager Renault et Dacia), déjà au paquet de
  l'étape 5 ;
- 28 R7-IMAGE-RECOMMANDEE (« pas d'image » au sens de Google, les illustrations étant des dessins du site) : comme à la
  porte 8 (point ouvert « Images »).

## 3. Ce qui reste ouvert après la porte

**Rendu et recette**
- Rendu sur un vrai téléphone des 11 pages (première situation, ligne d'écart, sommaire, arbre, étapes, tableaux en
  cartes) : à faire par Houssem (journal, points ouverts : B1 ; étendu ici aux lots B2 à B4).
- B1, « Pousser la voiture… » (voiture qui ne démarre pas) : comparaison de quatre marques en prose, « à juger par
  Houssem » dans la recette du lot B1 (texte validé, non modifié).

**Exceptions de six écrans et de trois écrans, acceptées** (demande n° 32, décision de Houssem sur captures)
- Étapes de « nettoyer le FAP » à 4 102 px (lot B3) et arbre de « perte de puissance » à 4 458 px (lot B4), au-delà de
  six écrans (4 002 px) : acceptés avec la validation des lots le 17/11.
- Illustrations au-delà de trois écrans (2 001 px), signalées dans les paquets : exemples de la porte 10 (2 700 et
  2 807 px, acceptées avec la porte 10), « batterie de voiture » (2 505 px), « moteur qui surchauffe » (2 448),
  « nettoyer le FAP » (2 364), « perte de puissance » (3 371), « voiture qui broute » (2 451), « bruit moteur »
  (2 370). Arbre de « voiture qui ne démarre pas » à 3 855 px (122 px de marge en police de secours) : à surveiller si
  l'encadré s'allonge.

**Sources et contenus**
- Claquement, sifflement du turbo et fumée noire d'un diesel : sans source admise ; les pages le disent et conseillent
  un professionnel (journal, « Sources de la vague B »).
- Communiqué de Stellantis (dossier PureTech) : version belge citée ; recherche d'une version France reportée à la revue
  suivante de la page (paquet de la porte 10, point 7).
- Prise en charge `couverture-speciale-puretech` : à revérifier tous les 90 jours (alerte datée de la CI).
- Ligne de base `huile-niveau` et jauge (journal) : pas de demande de changement proposée.

**Format** (revue de la PR #79, I1 ; point à part, rien de corrigé)
- Tableaux du texte « en cartes quand une colonne porte un texte long » (charte graphique §4) : le code ne passe en
  cartes qu'au-delà de trois colonnes (`src/lib/format2.ts`, `tableauxDuTexteFormat2`). Page en ligne qui changerait :
  loi montagne (3 colonnes, 18 mots) ; dans la vague B, « nettoyer le FAP » (3 colonnes, 13 mots au plus) selon le
  seuil à fixer. Relevé : `travaux/etape-11/modele-fluide/README.md` (sur `main` depuis la fusion de la PR #79).

**Après la porte**
- Tag de l'étape 10 posé par Houssem, sur le commit de `main` qu'il désigne.
- Journal et `docs/03` (ligne 10 : fait) par Houssem ou sur sa demande ; vague C : la PR qui ajoute « C » à
  `config/vagues-ouvertes.json` (demande n° 21), validée par Houssem, ouvre l'étape 11 ; la partie technique du modèle
  fluide est déjà sur `main` (PR #79, fusionnée le 17/11).

## 4. Ligne de validation proposée

« Je valide la porte de l'étape 10 sur les 11 pages de la vague B en ligne, en acceptant que la liste de recette de
l'étape 9 n'ait été repassée point par point que pour le lot B1, les lots B2 à B4 l'étant par leur recette et la CI ;
le rendu sur un vrai téléphone reste à faire par moi ; les exceptions de six écrans (nettoyer le FAP, perte de
puissance) sont acceptées. »

## Revue indépendante
À faire (organisée par le pilotage). Une seule revue par livrable.
