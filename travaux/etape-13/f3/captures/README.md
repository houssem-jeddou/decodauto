# Lot F3 : captures des 7 pages (brouillon, jamais validé)

Pull request du lot F3 (brief `travaux/etape-13/f3/taches/F3-pr.md`, §3), 16/11/2026. Constructions de production servies
en local : format 2, la branche `etape-13/f3-donnees` ; format 1, `main` à a2b36ce (la page en ligne actuelle, pour
comparaison). Chromium préinstallé, police du système Inter (comme la CI). Police chargée : seconde visite, feuille servie
en `font-display: block` ; police de secours : `/polices/` refusé. PNG sans perte, échelle 1. Script : `capturer-f3.cjs`
(adapté de celui du lot F2).

Un dossier par page : `p0087`, `p0299`, `p0420`, `loi-montagne`, `pression-des-pneus`, `a-propos`, `mentions-legales`.

| Fichier | Contenu |
|---|---|
| `f2-<375\|1366>-<chargee\|secours>-ecran.png` | premier écran au format 2 |
| `f2-…-encadre.png` | encadré de décision entier (pages éditoriales) |
| `f2-…-illustration.png` | illustration (pages éditoriales) |
| `f2-…-element-unique.png` | élément unique : fiche du code, tableau de la pression des pneus, fiche « Le texte en bref » de la loi montagne |
| `f2-…-sommaire.png` | sommaire « Sur cette page » |
| `f2-…-mentions.png` | bloc des mentions légales |
| `f1-<375\|1366>-<chargee\|secours>-ecran.png` | premier écran de la page en ligne (format 1) |

Aucune de ces pages n'a de tableau des notices, au format 1 comme au format 2 : le voyant de leur encadré a sa page
(voyant moteur, voyant de pression des pneus), où est son tableau, et le lien « Votre marque » y mène (un seul tableau par
voyant, revue de F1.3b). Une capture en police de secours identique octet pour octet à celle en police chargée n'est pas
gardée (117 fichiers restent).
