# Porte de sortie de l'étape 11 (vague C) : dossier de vérification

**État : dossier du 17/11/2026 (vers minuit), après la fusion des cinq lots de la vague C (PR #84 et #86 ; #88 pour le
lot C5), relevé sur `main` à 97c94ff (fusion de la PR #88), dont le passage de la CI 44188538266 (huit jobs verts,
déploiement et production compris) sert de preuve.** Relu par une revue indépendante (fin du dossier), corrigé, **à
valider par Houssem**. Rien ici n'est « validé » au sens de la porte tant que Houssem ne l'a pas écrit.

Porte (docs/03, ligne 11) : exemple fluide validé par Houssem (verdicts et encadré) avant la rédaction du lot, avec
gravité lisible et lien « Signaler une erreur » ; **mêmes critères que la vague A** (ligne 8, ce qui s'applique aux pages
fluide et pneus) ; recette repassée avant chaque fusion d'un lot. Porte par lot de mise en ligne, comme aux étapes 8 et
10 (demande n° 17) : l'étape se ferme quand tous les lots ont passé leur porte de lot et que la porte complète est
vérifiée sur l'ensemble. Point de revue du lot 4b à cette porte (demande n° 28).

## 1. Les lots et leur porte de lot

| Lot | Pages (adresse) | Validation de Houssem | Revue indépendante | Mise en ligne |
|---|---|---|---|---|
| Exemple fluide (devenu le lot C1) | niveau d'huile (`/huile-moteur/verifier-niveau/`, fluide, format tutoriel) | 17/11, 11 h 34, mot pour mot sur la ligne du §8 de `paquet-exemple-niveau-huile.md` (version 51b623e) | oui, sur l'exemple (9a84fe5) : « à corriger », rien de bloquant ; corrigé avant la validation (paquet §4) | voir C1 |
| C1 | la page ci-dessus ; ouverture de la vague C ; paire `niveau-huile` ↔ `moteur-puretech` ; carte « Un guide indépendant » sur toute la largeur de l'accueil | 17/11, 13 h 06 : « J'ouvre la vague C et je valide la mise en ligne du lot C1 […] » (journal, archive 04t) | oui, PR #84 (f28d014) : « à corriger », rien de bloquant ; règle CSS de l'accueil et captures ajoutées après, non relues | 17/11, 13 h 09, PR #84 (ebdfd65) |
| C2 | huile moteur (`/huile-moteur/`) ; demande n° 35 | 17/11, 15 h 05 : la phrase de Houssem vaut les lignes de validation des paquets C2 et C3 telles qu'envoyées (même lecture que le « Je valide tout ! » du matin, dite à Houssem à 15 h 10 ; journal) | oui, sur la branche (5602eff) : « à corriger », 1 bloquant ; corrigé, non relu | 17/11, 16 h 01, PR #86 (e57a6e9) |
| C3 | liquide de refroidissement (`/liquide-de-refroidissement/`) ; liquide de frein (`/liquide-de-frein/`) ; demande n° 37 | 17/11, 15 h 05 (même lecture) | oui, sur la branche (58ccb0e) : « à corriger », 1 bloquant ; corrigé, non relu | même PR #86 |
| C4 | usure des pneus (`/usure-des-pneus/`) ; contre-visite (`/contre-visite-controle-technique/`) ; demande n° 36 ; test de la porte 6 limité à la vague A | 17/11, 15 h 05, mot pour mot (paquets du lot C4) | oui, sur la branche (ec0e962) : « à corriger », 2 bloquants ; corrigés, non relus | même PR #86 |
| C5 | huile 5W30 (`/huile-moteur/5w30/`) ; huile 5W40 (`/huile-moteur/5w40/`) ; huile 10W40 (`/huile-moteur/10w40/`) ; révision de la page « huile moteur » (réponse directe, section des grades, rangée Toyota) ; document ACEA au registre | 17/11, 22 h 44 : « Je valide tout ! Goo », réponse au message du pilotage qui portait mot pour mot les quatre lignes de validation du paquet (`lot-c5/paquet-lot-c5.md`, §6 et §7) et l'annonce de la mise en ligne (commentaire de la PR #88) | oui, sur la branche (9b516b1, trois pages de grade) : « à corriger », 1 bloquant, 7 importants, 6 mineurs ; corrigés, non relus ; **la révision de « huile moteur » a été écrite après la revue et n'a pas été relue** | 17/11, 23 h 17, PR #88 (97c94ff) |

**9 pages en ligne** sur les 9 de la vague C (docs/03, ligne 11 : huile (organe, 3 viscosités, niveau), liquide de
refroidissement, liquide de frein, usure des pneus, contrôle technique) : 7 pages fluide (dont 1 au format tutoriel) et
2 pages pneus et obligations. Chacune porte son empreinte `validation:`. Le site compte 40 adresses (plan du site en
ligne, liste Lighthouse de production).

Validations par une phrase générale (15 h 05 pour C2 et C3, 22 h 44 pour C5) : chacune répond à un message du pilotage
qui reprenait mot pour mot les lignes de validation des paquets ; chaque paquet porte en tête la citation, la date,
l'heure et le renvoi à ses lignes. La ligne de validation (§4) fait confirmer par Houssem que ces réponses couvraient la
ligne de chaque page.

Fusions : faites par Claude, par l'API de GitHub (compte de Houssem), après une CI verte sur la tête exacte de chaque PR.
Une seule PR pour C2 à C4 (la branche du lot C4 contenait les deux autres). Ajout technique après la validation de
15 h 05, dans la PR #86 : délai du job « Démonstration du format 2 » porté de 15 à 30 minutes (f4db7ad), aucun contrôle
changé. Écritures et passages faits par la session de développement de Claude ; pilotage, fusions et vérifications en
ligne par cette session-ci.

## 2. Critères de la porte complète

| Critère | Preuve | État au 17/11 (minuit) |
|---|---|---|
| **Ligne 11.** Exemple fluide validé par Houssem avant la rédaction du lot | validation du 17/11 à 11 h 34 ; premiers commits des brouillons (`git log --all --diff-filter=A`, heure de Tunis) : `exemples/fluide/huile-moteur.md` à 12 h 04 (aff676c2, C2), liquides à 13 h 00 (63797e8c, C3), pneus à 13 h 40 (d8df60f4, C4), pages de grade à 21 h 41 (9b516b1b, C5) | **vérifié** pour ce que montre Git : tous les brouillons sont postérieurs à la validation |
| **Ligne 11.** Gravité lisible et lien « Signaler une erreur » dans le modèle fluide (et pneus) | contrôles R9-ENCADRE-CONTENU et SIGNALER-ERREUR-ABSENT, job « Contrôles » de `main` (passage 44188538266, 0 erreur) ; relevé des 9 pages en ligne (`porte-11/pages-en-ligne.txt`) : 27 lignes d'encadré, chacune avec ses deux libellés écrits, `data-verdict` et `data-urgence` ; un lien « Signaler une erreur » par page | **vérifié** sur les 9 pages |
| **Ligne 11.** L'exemple passe par le paquet et la recette de son lot | l'exemple est le lot C1 : paquet de l'exemple, recette `recette-niveau-huile/` (liste de recette de l'étape 9 repassée : `recette-etape-9.md`) | **vérifié** |
| **Ligne 8.** Faits vérifiés sur sources, verdicts validés | un paquet par lot avec les verdicts de chaque ligne saisie, leurs citations et la grille ; extraits relus à l'écran ou dans le PDF officiel (`textes/releve-sources.md`, §11 à §18) ; registre `data/sources.json` (contrôles R3-*, SOURCE-SECONDAIRE-NATURE) ; lignes de validation citées en tête de chaque paquet | **vérifié** pour les verdicts (validés par Houssem) ; faits relus par Claude et par la revue de chaque lot, **pas par un tiers humain** |
| **Ligne 8.** Encadrés de décision relus par Houssem | empreinte `validation:` des 9 pages ; R4-EMPREINTE et R4-VALIDATION-ABSENTE à chaque construction (job « Contrôles » de `main`, passage 44188538266 : 0 erreur bloquante) | **vérifié** par la CI sur les 9 pages ; recalcul page par page (`npm run empreinte`, comme `porte-10/empreintes.txt`) non refait dans ce dossier (session sans les dépendances) : la CI fait le même calcul à chaque construction |
| **Ligne 8.** Lighthouse mobile ≥ 95 et CLS < 0,1 sur une page de chaque modèle, emplacements factices | job « Démonstration du format 2 » (passage 44188538266) : « niveau d'huile » (modèle fluide) et « pression des pneus » (modèle pneus et obligations, celui d'usure et de contre-visite) à 100 dans les quatre catégories, CLS 0,000 (`porte-11/ci-main-97c94ff.txt`) | **vérifié** |
| **Ligne 8** (en plus, comme aux portes 8 et 10). Lighthouse mobile sur toutes les adresses en ligne | job « Lighthouse mobile » (passage 44188538266), `lighthouserc.json` : 40 adresses, dont les 9 de la vague C | **vérifié** : 40 sur 40 à 100 dans les quatre catégories, CLS 0,000, LCP de 756 à 1 058 ms |
| **Ligne 11.** Liste de recette de l'étape 9 repassée avant chaque fusion d'un lot | C1 : point par point (`recette-niveau-huile/recette-etape-9.md`) ; C2 à C5 : recette de chaque lot (`lot-c2/recette/` à `lot-c5/recette/` : contrôles, liens, mesures du format 2 à 320, 375 et 1366 px dans les deux polices, Lighthouse, captures), CI verte sur la tête des PR #86 et #88 ; pages relues en ligne par Claude après chaque déploiement (`porte-11/pages-en-ligne.txt`) | **partiellement vérifié** : pour C2 à C5, la liste n'a pas été repassée point par point comme pour C1 (navigation au clavier, contour de focus, liste des H2) |
| **Ligne 11** (règle 15). Rendu sur un vrai téléphone | aucune capture d'un vrai téléphone ; captures des recettes dans Chromium à 320, 375 et 1366 px | **non vérifié** : à faire par Houssem |
| **Ligne 9** (après chaque déploiement). En-tête et balise robots, robots.txt, plan du site, inspection d'URL, Bing | job « Production en ligne » (passage 44188538266) : « Production : tout est conforme. », mode INDEXABLE ; relevé des 9 pages (statut 200, aucun noindex, canonical propre, lignes de l'encadré identiques aux validations) ; plan du site à 40 adresses | **partiellement vérifié** : indexation des 9 pages pas encore demandée dans la Search Console (après les 5 de la vague B, à partir du 18/11, quota d'environ 4 à 5 par jour) ; aucune adresse soumise à Bing |
| **Ligne 8.** Contrôles au vert | passage 44188538266 sur 97c94ff : huit jobs verts ; construction : 40 pages, 0 erreur, 42 alertes | **vérifié** |

**Critères de la ligne 8 sans objet pour les pages fluide et pneus** : ceux de l'outil voyants (chaque ligne de la base
affichée, filtre par couleur, contenu sans JavaScript) ; aucune ligne de la base voyants n'a été modifiée pendant
l'étape 11.

**Alertes non bloquantes de la construction** (job « Contrôles », passage 44188538266 : 42 alertes) : les 3
R3-NIVEAU-A-VERIFIER de la base (déjà au paquet de l'étape 5), les 2 de « changer la batterie » (tranchées au paquet du
lot B2), 37 R7-IMAGE-RECOMMANDEE (illustrations dessinées, comme aux portes 8 et 10). **Aucune alerte sur les pages de la
vague C.**

## 3. Ce qui reste ouvert après la porte

**Rendu et indexation**
- Rendu sur un vrai téléphone des 9 pages (et des 11 de la vague B) : à faire par Houssem.
- Search Console : 9 adresses de la vague C après les 5 de la vague B (tâche planifiée du 18/11) ; suivi à J+7 et J+14.
- Bing : soumettre les adresses nouvelles des vagues B et C et du lot F3 (autorisation de l'extension Chrome sur
  bing.com à donner par Houssem, ou soumission par lui).

**Exceptions acceptées avec les paquets** (illustrations au-delà de trois écrans, 2 001 px, demande n° 32) : niveau
d'huile (2 513 / 2 537 px), huile moteur (2 131 px au lot C2, 2 153 px après la révision du lot C5), liquide de
refroidissement (2 839), liquide de frein (2 141), usure des pneus (2 198). Les trois pages de grade et la contre-visite
sont sous trois écrans.

**Sources et contenus**
- Tableau des viscosités et 85W140 de la page « huile moteur » (cas 3 de `docs/09`) : report de la demande n° 35
  maintenu (la notice Toyota ne couvre que 0W-16, 0W-20 et 5W-30), revu au plus tard le 17/11/2027.
- Page « niveau d'huile », prochaine révision : durée de la fiche du tutoriel (Renault, Dacia), lignes Renault et Dacia
  du tableau (témoin de pression sur route), ligne « baisse anormale du niveau », et la notice Toyota (mesure moteur
  chaud après 5 minutes, p. 247 ; au-dessus du maxi, « contactez un concessionnaire », p. 248, moins strict que Peugeot
  et Citroën déjà retenus) ; chaque changement avec sa validation.
- **Lot 4b (P0380, P1351)**, point de revue de cette porte (demande n° 28) : aucune source admise nouvelle depuis le
  15/11 ; aucune des notices relues pendant l'étape 11 ne cite ces codes. **Proposé** : le lot reste ouvert aux
  conditions de la demande n° 28, revu à la porte de l'étape 12.
- **Extraits de notices dans les relevés du dépôt public** (revue du lot C3) : les relevés de l'étape 10 et de l'étape
  11 (`textes/releve-sources.md`, §11 à §18) citent mot pour mot plusieurs milliers de caractères de notices, alors que
  la demande n° 29 a retiré du dépôt le texte des notices de l'étape 5. **Décidé (règle 6), à faire par une PR dédiée
  après la porte** : garder dans le dépôt les références (page, rubrique) et les extraits que les pages citent (déjà dans
  leurs fichiers, 400 caractères au plus) ; verser le texte complet des relevés dans le projet Claude, comme pour
  l'étape 5. L'historique Git les garde.

**Format** (points à part, rien de corrigé dans cette étape)
- Composant sommaire (pastille de trois lignes à 1366 px) et tableaux en cartes sur téléphone : corrections de la charte
  à proposer, avec captures (journal).

**Après la porte**
- Tag de l'étape 11, posé par Houssem sur le commit de `main` qu'il désigne (97c94ff, ou le commit du journal qui suit).
- Journal et copie `docs/` par une PR ; étape suivante : étape 12 (boucle mensuelle, demande AdSense comprise), qui
  dépend aussi des questions juridiques reportées (représentant dans l'Union, avant la demande AdSense).

## 4. Ligne de validation proposée

« Je valide la porte de l'étape 11 sur les 9 pages de la vague C en ligne. Je confirme que mes réponses du 17/11 à
15 h 05 et à 22 h 44 couvraient la ligne de validation de chaque page des paquets C2, C3 et C5 (révision de « huile
moteur » comprise). J'accepte : que les revues indépendantes des lots C2 à C5 aient été faites sur leurs branches avant
les pull requests, leurs corrections et la révision de « huile moteur » n'étant pas relues ; que la liste de recette de
l'étape 9 n'ait été repassée point par point que pour le lot C1, les lots C2 à C5 l'étant par leur recette, la CI et la
relecture en ligne ; que le lot 4b reste ouvert jusqu'à la porte de l'étape 12. Restent à faire : le rendu sur un vrai
téléphone (par moi), l'indexation des pages des vagues B et C et la soumission à Bing (§3). »

## Revue indépendante
À compléter après la revue.
