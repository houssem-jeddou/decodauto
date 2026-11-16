# Captures et mesures de la démonstration du format 2 (lot F1, tâche F1.2)

Prises le 16/11/2026 après la seconde revue indépendante de F1.2, par `capturer.cjs` (Chromium et Playwright préinstallés de
l'environnement de Claude), sur :
- la **démonstration** : `npm run demo:format2` (construction `dist-demo-format2`, jamais déployée), servie en local ;
- le **pilote validé** (piste B) : maquette de `generer.py` (branche `etape-13/pilote-f1`), régénérée avec les mêmes
  pictogrammes et la même base, servie en local, sa barre de commandes masquée (comme pour ses propres mesures).

Fichiers : `<demo|pilote>-<accueil|moteur|adblue>-<375-ecran|375-page|1366-ecran>-<chargee|secours>.png`.
- `375-ecran` : 375 × 667, premier écran (échelle 2) ; `375-page` : page entière à 375 px (échelle 1) ; `1366-ecran` :
  1366 × 800 (échelle 1). PNG réduits à 128 couleurs.
- Police chargée : la feuille est servie en `font-display: block` pour la capture (état d'un lecteur qui a la police en
  cache ; en `optional`, une police arrivée après le premier rendu peut laisser la police de secours, ce qui avait faussé une
  capture « chargée ») ; police de secours : requêtes de `/polices/` (pilote : `/fonts/`) bloquées. Même fichier de police
  (octet pour octet) dans les deux. La colonne « lignesH1 » de `mesures.json` donne le nombre de lignes du H1.
- `demo-sommaire-<long|court>-<375|1366>-<chargee|secours>.png` : sommaire du voyant moteur, état long (titres H2 entiers, la
  page telle quelle) et état court (libellés courts du pilote posés dans la page pour la capture seulement). À 1366 : page
  défilée au-delà de l'encadré, colonne collée en haut ; `…-1366-defilee-…` : la colonne défilée d'elle-même. Colonne du
  voyant moteur : 768 px de haut au plus (écran de 800 px moins 2 × 16 px), 826 px de contenu, défilement
  `auto` ; fondu collé en bas tant que la suite est cachée.
- `mesures.json` : mesures brutes, en pixels CSS depuis le haut de la page.

**Refaites le 16/11/2026** (revue de F1.3a) : PNG tels que les écrit le navigateur, recompressés sans perte (couleurs exactes ; les
précédentes étaient réduites à 128 couleurs, ce qui faisait paraître la diode orange rouge et les voyants rouges roses) ; la
démonstration montre les lignes d'écart courtes et « ce que demande la notice » du brouillon F2, version 2.

## Pages voyants (375 × 667, sauf la dernière colonne)

Règle 2a : bas de la situation, du verdict, de l'urgence et de l'action de la première ligne (définition de la porte du
pilote, `porte/verifier_porte.py` ; la ligne d'écart n'en fait pas partie) : 667 px au plus, 640 visés. Règle 2i : haut
de l'illustration dans les trois premiers écrans (2 001 px), ou, quand l'encadré dépasse à lui seul trois écrans,
illustration juste après le bloc « Notices / Base du coût » (précision du 15/11).

| Page | Source | Police | Bas de la mention | Bas de la 1re situation (2a) | Bas de l'encadré | Bas de « Notices / Base du coût » | Haut de l'illustration (2i) | Illustration juste après le bloc | Hauteur de la page | Hauteur à 1366 px |
|---|---|---|---|---|---|---|---|---|---|---|
| moteur | démonstration | chargée | 99 | 522 | 1555 | 1979 | 1992 | oui | 12531 | 8122 |
| moteur | démonstration | secours | 99 | 522 | 1555 | 1979 | 1992 | oui | 12582 | 8122 |
| moteur | pilote | chargée | 99 | 522 | 1515 | 1817 | 1829 | oui | 10992 | 7607 |
| moteur | pilote | secours | 99 | 522 | 1515 | 1817 | 1829 | oui | 11042 | 7607 |
| adblue | démonstration | chargée | 99 | 601 | 2242 | 2760 | 2773 | oui | 13896 | 8408 |
| adblue | démonstration | secours | 99 | 601 | 2242 | 2760 | 2773 | oui | 13896 | 8434 |
| adblue | pilote | chargée | 99 | 601 | 2222 | 2561 | 2574 | oui | 6799 | 4723 |
| adblue | pilote | secours | 99 | 601 | 2222 | 2561 | 2574 | oui | 6799 | 4749 |

## Accueil (375 × 667, sauf la dernière colonne)

Règle 2k : la grille des pictogrammes (18 dessins, libellés en 12 px) commence dans le premier écran du téléphone. Les 18
libellés tiennent à 375 px sans mot coupé, police chargée et police de secours (vérifié mot par mot) ; plus étroit (320 px),
un mot de 10 lettres au moins se coupe avec un tiret.

| Source | Police | Bas de la mention | Haut de la grille des voyants | Hauteur de la page | Hauteur à 1366 px |
|---|---|---|---|---|---|
| démonstration | chargée | 99 | 445 | 2025 | 1399 |
| démonstration | secours | 99 | 478 | 2057 | 1399 |
| pilote | chargée | 99 | 445 | 1696 | 1116 |
| pilote | secours | 99 | 478 | 1729 | 1116 |
