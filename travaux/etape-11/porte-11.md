# Porte de sortie de l'étape 11 (vague C) : dossier de vérification (brouillon)

> **Brouillon, jamais validé.** Préparé le 17/11/2026 au soir sur les 6 pages en ligne, pendant que les pages de grade
> (5W30, 5W40, 10W40) attendent la notice Toyota Yaris. À compléter avec le lot de ces trois pages (§1, §2, §3), puis
> relu par une revue indépendante et présenté à Houssem. Rien ici n'est « validé » au sens de la porte tant que Houssem
> ne l'a pas écrit.

**État : relevé sur `main` à 1b695ae (fusion de la PR #87, journal), dont le passage de la CI 44119274522 (huit jobs
verts, déploiement et production compris) sert de preuve ; les pages de la vague C y sont celles de la PR #86
(e57a6e9), la PR #87 ne touchant que `docs/`.**

Porte (docs/03, ligne 11) : exemple fluide validé par Houssem (verdicts et encadré) avant la rédaction du lot, avec
gravité lisible et lien « Signaler une erreur » ; **mêmes critères que la vague A** (ligne 8, ce qui s'applique aux
pages fluide et pneus) ; recette repassée avant chaque fusion d'un lot. Porte par lot de mise en ligne, comme aux
étapes 8 et 10 (demande n° 17). Point de revue du lot 4b à cette porte (demande n° 28).

## 1. Les lots et leur porte de lot

| Lot | Pages (adresse) | Validation de Houssem | Revue indépendante | Mise en ligne |
|---|---|---|---|---|
| Exemple fluide (devenu le lot C1) | niveau d'huile (`/huile-moteur/verifier-niveau/`, fluide, format tutoriel) | 17/11, 11 h 34, mot pour mot sur la ligne du §8 de `paquet-exemple-niveau-huile.md` (version 51b623e) | oui, sur l'exemple (9a84fe5) : « à corriger », rien de bloquant ; corrigé avant la validation (paquet §4) | voir C1 |
| C1 | la page ci-dessus ; ouverture de la vague C ; paire `niveau-huile` ↔ `moteur-puretech` ; carte « Un guide indépendant » sur toute la largeur de l'accueil | 17/11, 13 h 06 : « J'ouvre la vague C et je valide la mise en ligne du lot C1 […] » (journal, archive 04t) | oui, PR #84 (f28d014) : « à corriger », rien de bloquant ; règle CSS de l'accueil et captures ajoutées après, non relues | 17/11, 13 h 09, PR #84 (ebdfd65), fusionnée par Claude |
| C2 | huile moteur (`/huile-moteur/`) ; demande n° 35 | 17/11, 15 h 05 (journal : la phrase vaut les lignes de validation des paquets C2 et C3 telles qu'envoyées) | oui, sur la branche (5602eff) : « à corriger », 1 bloquant ; corrigé, non relu | 17/11, 16 h 01, PR #86 (e57a6e9), fusionnée par Claude |
| C3 | liquide de refroidissement (`/liquide-de-refroidissement/`) ; liquide de frein (`/liquide-de-frein/`) ; demande n° 37 | 17/11, 15 h 05 (même lecture) | oui, sur la branche (58ccb0e) : « à corriger », 1 bloquant ; corrigé, non relu | même PR #86 |
| C4 | usure des pneus (`/usure-des-pneus/`) ; contre-visite (`/contre-visite-controle-technique/`) ; demande n° 36 ; test de la porte 6 limité à la vague A | 17/11, 15 h 05, mot pour mot (paquets du lot C4) | oui, sur la branche (ec0e962) : « à corriger », 2 bloquants ; corrigés, non relus | même PR #86 |
| **C5 (à faire)** | 5W30, 5W40, 10W40 (`/huile-moteur/5w30/`, `/5w40/`, `/10w40/`) | – | – | – (en attente de la notice Toyota Yaris : journal, points ouverts) |

**6 pages en ligne** sur les 9 de la vague C (docs/03, ligne 11 : huile (organe, 3 viscosités, niveau), liquide de
refroidissement, liquide de frein, usure des pneus, contrôle technique). Le site compte 37 adresses (plan du site en
ligne, liste Lighthouse de production).

Fusions : faites par Claude, par l'API de GitHub (compte de Houssem), après une CI verte sur la tête exacte de chaque
PR. Une seule PR pour C2 à C4 (la branche du lot C4 contenait les deux autres). Ajout technique après la validation de
15 h 05, dans la PR #86 : délai du job « Démonstration du format 2 » porté de 15 à 30 minutes (f4db7ad), aucun contrôle
changé.

## 2. Critères de la porte complète (6 pages ; à reprendre avec C5)

| Critère | Preuve | État au 17/11 (soir) |
|---|---|---|
| **Ligne 11.** Exemple fluide validé par Houssem avant la rédaction du lot | validation du 17/11 à 11 h 34 ; premiers commits des brouillons : `exemples/fluide/huile-moteur.md` le 17/11 à 12 h 04 (aff676c2, C2), liquides à 13 h 00 (63797e8c, C3), pneus à 13 h 40 (d8df60f4, C4) (`git log --all --diff-filter=A`, heure de Tunis) | **vérifié** pour ce que montre Git : tous les brouillons sont postérieurs à la validation |
| **Ligne 11.** Gravité lisible et lien « Signaler une erreur » dans le modèle fluide | contrôles R9-ENCADRE-CONTENU et SIGNALER-ERREUR-ABSENT, job « Contrôles » de `main` (passage 44119274522) ; relevé des 6 pages en ligne (`porte-11/pages-en-ligne.txt`) : 23 lignes d'encadré, chacune avec ses deux libellés écrits, `data-verdict` et `data-urgence` ; un lien « Signaler une erreur » par page | **vérifié** sur les 6 pages |
| **Ligne 11.** L'exemple passe par le paquet et la recette de son lot | l'exemple est le lot C1 : paquet de l'exemple, recette `recette-niveau-huile/` (liste de recette de l'étape 9 repassée : `recette-etape-9.md`) | **vérifié** |
| **Ligne 8.** Faits vérifiés sur sources, verdicts validés | un paquet par page avec les verdicts de chaque ligne saisie, leurs citations et la grille ; extraits relus à l'écran (`textes/releve-sources.md`, §11 à §17) ; registre `data/sources.json` (contrôles R3-*) ; lignes de validation citées en tête de chaque paquet | **vérifié** pour les verdicts (validés par Houssem) ; faits relus par Claude et par la revue de chaque lot, **pas par un tiers humain** |
| **Ligne 8.** Encadrés de décision relus par Houssem | empreinte `validation:` de chaque page ; R4-EMPREINTE et R4-VALIDATION-ABSENTE à chaque construction (job « Contrôles » de `main`, passage 44119274522 : 0 erreur) | **vérifié** par la CI ; recalcul page par page (`npm run empreinte`, comme `porte-10/empreintes.txt`) **à faire** dans une session avec les dépendances installées |
| **Ligne 8.** Lighthouse mobile ≥ 95 et CLS < 0,1 sur une page de chaque modèle, emplacements factices | job « Démonstration du format 2 » (passage 44119274522) : « niveau d'huile » (modèle fluide) et « pression des pneus » (modèle pneus) à 100 dans les quatre catégories, CLS 0,000 (`porte-11/ci-main-1b695ae.txt`) | **vérifié** |
| **Ligne 8** (en plus). Lighthouse mobile sur toutes les adresses en ligne | job « Lighthouse mobile » (passage 44119274522), `lighthouserc.json` : 37 adresses, dont les 6 de la vague C (`porte-11/ci-main-1b695ae.txt`) | **vérifié** : 37 sur 37 à 100 dans les quatre catégories, CLS 0,000, LCP de 901 à 1 053 ms |
| **Ligne 11.** Liste de recette de l'étape 9 repassée avant chaque fusion d'un lot | C1 : point par point (`recette-niveau-huile/recette-etape-9.md`) ; C2 à C4 : recette de chaque lot (`lot-c2/recette/`, `lot-c3/recette/`, `lot-c4/recette/` : contrôles, liens, mesures du format 2, Lighthouse, captures), CI verte sur la tête de la PR #86 ; pages relues en ligne par Claude après le déploiement (`porte-11/pages-en-ligne.txt`) | **partiellement vérifié** : pour C2 à C4, la liste n'a pas été repassée point par point comme pour C1 (navigation au clavier, liste des H2) |
| **Ligne 11** (règle 15). Rendu sur un vrai téléphone | aucune capture d'un vrai téléphone ; captures des recettes dans Chromium à 320, 375 et 1366 px | **non vérifié** : à faire par Houssem |
| **Ligne 9** (après chaque déploiement). En-tête et balise robots, robots.txt, plan du site, inspection d'URL, Bing | job « Production en ligne » (passage 44119274522) : « Production : tout est conforme. », mode INDEXABLE ; relevé des 6 pages (statut 200, aucun noindex, canonical propre, lignes de l'encadré identiques aux validations) ; plan du site à 37 adresses | **partiellement vérifié** : indexation des 6 pages pas encore demandée dans la Search Console (après les 5 de la vague B, le 18/11) ; aucune adresse soumise à Bing |
| **Ligne 8.** Contrôles au vert | passage 44119274522 sur 1b695ae : huit jobs verts ; construction : 37 pages, 0 erreur, 39 alertes | **vérifié** |

**Alertes non bloquantes de la construction** (job « Contrôles », passage 44119274522 : 39 alertes) : les 3
R3-NIVEAU-A-VERIFIER de la base (déjà au paquet de l'étape 5), les 2 de « changer la batterie » (tranchées au paquet du
lot B2), 34 R7-IMAGE-RECOMMANDEE (illustrations dessinées, comme aux portes 8 et 10). **Aucune alerte nouvelle sur les
pages de la vague C.**

## 3. Ce qui reste ouvert (à compléter)

**Contenus**
- Pages 5W30, 5W40, 10W40 (lot C5) : notice Toyota Yaris à lire (Houssem fournit le PDF) ; structure prête
  (`lot-c2/structure-grades.md`), document ACEA relu (relevé §17).
- Lot 4b (P0380, P1351) : point de revue à cette porte (demande n° 28) ; aucune source admise nouvelle depuis le 15/11.
- Extraits de notices dans le relevé public (`textes/releve-sources.md`) : garder, raccourcir ou déplacer vers le projet
  Claude (demande n° 29) : décision à proposer ici.

**Rendu et format**
- Illustrations au-delà de trois écrans, acceptées avec chaque paquet : niveau d'huile (2 513 / 2 537 px), huile moteur
  (2 131), liquide de refroidissement (2 839), liquide de frein (2 141), usure des pneus (2 198).
- Composant sommaire (pastille de trois lignes à 1366 px) et tableaux en cartes : corrections de la charte à proposer à
  part (journal).

**Indexation**
- Search Console : 6 adresses de la vague C après les 5 de la vague B (tâche planifiée du 18/11) ; Bing : à soumettre.

## 4. Ligne de validation proposée
À écrire quand le lot C5 sera en ligne.

## Revue indépendante
À faire sur le dossier complet (une seule revue).
