# Tâche : recette locale des exemples de la porte 10 (version 2), captures et mesures

Brief du chat de pilotage (16/11/2026). **Après F1.4** (les modèles du format 2 doivent être ceux de la porte F1, avec la
demande n° 32 si Houssem l'accepte). Préparation anticipée de l'étape 10 (`docs/03`, règle 12) : **rien n'est fusionné,
rien ne va dans une pull request vers `main`**. Les données provisoires ci-dessous restent dans un arbre de travail
local, jamais committées sur une branche de `main`. Seuls les résultats (captures, mesures, README) sont committés, sur
la branche `preparation/etape-10`, dans `travaux/etape-10/recette-porte-10/`, sous l'identité « noreply ».

## 1. Ce qu'on construit
Un arbre local à partir de `main` (après F1.4), avec :
- les deux exemples et leurs illustrations de `preparation/etape-10` (commit 9d08ef9 ou suivant) :
  `exemples/panne/voiture-ne-demarre-pas.md`, `exemples/dossier/moteur-puretech.md`,
  `src/illustrations/batterie-cosses.svg`, `src/illustrations/jauge-huile.svg` ;
- la base voyants du lot F2 (`data/voyants.json` de la branche `etape-13/f2-donnees`, version 2 : lignes d'écart
  courtes et « ce que demande la notice »), ou le brouillon appliqué en mémoire comme la démonstration du format 2 ;
  les deux pages reprennent `batterie-rouge`, `prechauffage`, `huile-pression-rouge`, `huile-niveau` et
  `entretien-vidange` ;
- des entrées **provisoires** du registre (`data/sources.json`), au format des entrées existantes, marquées dans le titre
  « (provisoire, jamais validé) » :
  - `rappelconso-48835`, catégorie `rappelconso`, https://rappel.conso.gouv.fr/fiche-rappel/48835/Rapex, fiche
    A12/01504/20 (Citroën et DS) du 20/11/2020 ;
  - `rappelconso-48836`, catégorie `rappelconso`, https://rappel.conso.gouv.fr/fiche-rappel/48836/Rapex, fiche
    A12/01505/20 (Peugeot) du 20/11/2020 ;
  - `rappelconso-48204`, catégorie `rappelconso`, https://rappel.conso.gouv.fr/fiche-rappel/48204/Rapex, fiche
    A11/00077/23 (Opel et Peugeot) du 16/06/2023, mise à jour le 18/06/2026 ;
  - `peugeot-puretech-solutions`, catégorie `secondaire`, https://www.peugeot.fr/entretien-et-services/moteurs-puretech-solutions.html ;
  - `stellantis-puretech-indemnisation-2025`, catégorie `secondaire`,
    https://www.media.stellantis.com/be-fr/citroen/press/stellantis-etend-sa-politique-d-indemnisation-des-reclamations-des-consommateurs-europeens-sur-les-generations-precedentes-de-moteurs-puretech-1-0-et-1-2 ;
  - date de consultation de toutes : 2026-11-16 ;
- des entrées **provisoires** de `data/couts.json`, au format du schéma (`src/schemas/cout.ts`) : `pile-de-cle` et
  `carburant-et-reamorcage` (gestes à faire soi-même, tranche la plus basse) ; `couverture-speciale-puretech` (prise en
  charge du constructeur : 100 % des pièces et de la main-d'œuvre, 10 ans ou 180 000 km au premier terme échu, sous
  conditions ; source `peugeot-puretech-solutions`, consultée le 2026-11-16). Si le schéma refuse une prise en charge
  sans validation, dis-le et construis sans elle.

Construction : `AVEC_EXEMPLES=1 npx astro build && node scripts/controle.ts --dist dist-exemples --exemples`. Erreurs
attendues : seulement l'absence d'empreinte de validation des deux exemples (jamais validés) et de leurs lignes
provisoires ; **aucune autre** : toute autre erreur est un défaut des exemples à me signaler (je corrige les exemples
moi-même sur `preparation/etape-10`), pas un contrôle à contourner.

## 2. Captures et mesures (comme les tâches F1)
Pour chacune des deux pages, à 375 × 667 et à 1366 × 800, police chargée et police de secours, sans réduction de
palette : premier écran ; page entière ; encadré de décision entier ; arbre de décision (page panne) ; tableau des
rappels en cartes (dossier) ; illustration. Mesures (px, à 375 × 667, les deux polices) : bas de la première situation
de l'encadré (règle 2a) ; bas de l'encadré ; haut du bloc « Notices / Base du coût » ; haut de l'illustration (2i) ;
haut du sommaire ; haut de l'arbre ; haut des causes ; largeur de la page à 320 px (aucun débordement). Lighthouse
mobile local (3 passages) des deux pages : performance, accessibilité, CLS.

## 3. Ce que tu me rends
- `travaux/etape-10/recette-porte-10/` sur `preparation/etape-10` : captures, `mesures.json`, `README.md` (ce qui a été
  construit, avec quels commits, sortie des contrôles, erreurs attendues, résultats Lighthouse) ;
- dans ta réponse : ce qui ne passe pas, ce qui te semble mal rendu (débordement, coupure de mot, pastille sur deux
  lignes, carte trop longue, illustration trop basse), sans corriger les exemples toi-même.
