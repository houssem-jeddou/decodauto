# Captures et mesures de la démonstration du format 2 (lot F1, tâche F1.2)

Prises le 15/11/2026 par `capturer.cjs` (Chromium et Playwright préinstallés de l'environnement de Claude), sur :
- la **démonstration** : `npm run demo:format2` (construction `dist-demo-format2`, jamais déployée), servie en local ;
- le **pilote validé** (piste B) : maquette de `generer.py` (branche `etape-13/pilote-f1`), régénérée avec les mêmes
  pictogrammes et la même base, servie en local, sa barre de commandes masquée (comme pour ses propres mesures).

Fichiers : `<demo|pilote>-<accueil|moteur|adblue>-<375-ecran|375-page|1366-ecran>-<chargee|secours>.png`.
- `375-ecran` : 375 × 667, premier écran (échelle 2) ; `375-page` : page entière à 375 px (échelle 1) ; `1366-ecran` :
  1366 × 800 (échelle 1). PNG réduits à 128 couleurs.
- Police chargée : page ouverte deux fois (police Outfit en cache : `font-display: optional` l'affiche) ; police de
  secours : requêtes de `/polices/` (pilote : `/fonts/`) bloquées. Même fichier de police (octet pour octet) dans les deux.
- `mesures.json` : mesures brutes, en pixels CSS depuis le haut de la page.

## Pages voyants (375 × 667, sauf la dernière colonne)

Règle 2a : bas de la situation, du verdict, de l'urgence et de l'action de la première ligne (définition de la porte du
pilote, `porte/verifier_porte.py` ; la ligne d'écart n'en fait pas partie) : 667 px au plus, 640 visés. Règle 2i : haut
de l'illustration dans les trois premiers écrans (2 001 px), ou, quand l'encadré dépasse à lui seul trois écrans,
illustration juste après le bloc « Notices / Base du coût » (précision du 15/11).

| Page | Source | Police | Bas de la mention | Bas de la 1re situation (2a) | Bas de l'encadré | Bas de « Notices / Base du coût » | Haut de l'illustration (2i) | Illustration juste après le bloc | Hauteur de la page | Hauteur à 1366 px |
|---|---|---|---|---|---|---|---|---|---|---|
| moteur | démonstration | chargée | 99 | 522 | 1515 | 1939 | 1952 | oui | 12667 | 8191 |
| moteur | démonstration | secours | 99 | 522 | 1515 | 1939 | 1952 | oui | 12717 | 8191 |
| moteur | pilote | chargée | 99 | 522 | 1515 | 1817 | 1829 | oui | 10992 | 7607 |
| moteur | pilote | secours | 99 | 522 | 1515 | 1817 | 1829 | oui | 11042 | 7607 |
| adblue | démonstration | chargée | 99 | 601 | 2222 | 2740 | 2753 | oui | 14122 | 8568 |
| adblue | démonstration | secours | 99 | 601 | 2222 | 2740 | 2753 | oui | 14122 | 8593 |
| adblue | pilote | chargée | 99 | 601 | 2222 | 2561 | 2574 | oui | 6799 | 4723 |
| adblue | pilote | secours | 99 | 601 | 2222 | 2561 | 2574 | oui | 6799 | 4749 |

## Accueil (375 × 667, sauf la dernière colonne)

Règle 2k : la grille des pictogrammes commence dans le premier écran du téléphone.

| Source | Police | Bas de la mention | Haut de la grille des voyants | Hauteur de la page | Hauteur à 1366 px |
|---|---|---|---|---|---|
| démonstration | chargée | 99 | 445 | 1857 | 1431 |
| démonstration | secours | 99 | 478 | 1890 | 1431 |
| pilote | chargée | 99 | 445 | 1696 | 1116 |
| pilote | secours | 99 | 478 | 1729 | 1116 |
