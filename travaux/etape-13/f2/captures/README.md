# Lot F2 : captures des 13 pages (brouillon, jamais validé)

Pull request du lot F2 (brief `travaux/etape-13/f2/taches/F2-pr.md`, §3), 16/11/2026. Constructions de production servies
en local : format 2, la branche `etape-13/f2-donnees` ; format 1, `main` à cd2433f (la page en ligne actuelle, pour
comparaison). Chromium préinstallé, police du système Inter (comme la CI). Police chargée : seconde visite, feuille servie
en `font-display: block` ; police de secours : `/polices/` refusé. PNG sans perte, échelle 1, sans réduction de palette.
Script : `capturer-f2.cjs`.

Un dossier par page : `accueil`, `outil` (`/voyants/`), puis les 11 pages voyants (`moteur`, `huile`, `batterie`, `frein`,
`adblue`, `fap`, `prechauffage`, `airbag`, `abs-esp`, `pression-pneus`, `direction`). Fichiers :

| Fichier | Contenu |
|---|---|
| `f2-<375\|1366>-<chargee\|secours>-ecran.png` | premier écran au format 2 |
| `f2-…-encadre.png` | encadré de décision entier |
| `f2-…-illustration.png` | illustration (sur l'accueil, affichée sur ordinateur seulement) |
| `f2-…-notices-replie.png`, `f2-…-notices-deplie.png` | premier voyant du tableau des notices, extraits repliés puis dépliés (pages voyants ; la page outil n'a pas de tableau des notices) |
| `f2-…-sommaire.png` | sommaire « Sur cette page » (colonne sur téléphone, à côté du texte sur ordinateur) |
| `f2-…-grille.png` | grille des voyants (accueil) |
| `f2-…-carte.png` | première carte de la liste (outil) |
| `f1-<375\|1366>-chargee-ecran.png` | premier écran de la page en ligne (format 1) |

Une capture en police de secours identique octet pour octet à celle en police chargée n'est pas gardée (225 fichiers
restent) : avec Inter comme police du système, la plupart des blocs rendent pareil.

Les captures avant et après des quatre corrections de modèle de la pull request, et celles de la page 404 au format 2, sont dans `corrections/`.
