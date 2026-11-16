# Captures et mesures des pages panne et dossier au format 2 (lot F1, tâche F1.3c)

Prises le 16/11/2026 par `capturer.cjs` sur les pages de démonstration de `tests/demo` (`npm run demo`, `dist-demo/`, jamais
publié) : `panne-format2` (arbre de décision long, cinq questions), `panne-format2-arbre-court` (deux questions),
`dossier-format2` (dossier au format tutoriel : fiche du tutoriel, tableau en cartes, étapes, historique). Textes de
démonstration ; lignes de l'encadré tirées de la base voyants validée ; illustration de démonstration d'une page voisine.

Fichiers : `<page>-<375-ecran|375-page|1366-ecran|1366-corps>-<chargee|secours>.png`, et, à 375 px, le composant seul
(`-arbre-`, `-tutoriel-`, `-etapes-`, `-tableau-`, `-historique-`). Premier écran à 375 × 667 en échelle 2, le reste en
échelle 1 ; PNG réduits à 128 couleurs. Police chargée : feuille servie en `font-display: block` (police en cache) ;
police de secours : `/polices/` bloqué. `mesures.json` : mesures brutes, en pixels CSS depuis le haut de la page.

## Mesures (375 × 667, sauf la dernière colonne)

Règle 2a : bas de la situation, du verdict, de l'urgence et de l'action de la première ligne (667 px au plus, 640 visés).
Règle 2i : haut de l'illustration dans les trois premiers écrans (2 001 px). « Débordements » : éléments de l'arbre, des
étapes, de l'historique, des fiches, des causes et des tableaux dont le contenu dépasse la largeur.

| Page | Police | Bas de la mention | Bas de la 1re situation (2a) | Bas de l'encadré | Haut de l'illustration (2i) | Illustration juste après « Notices » | Haut de l'arbre | Hauteur de l'arbre | Haut de l'historique | Hauteur de la page | Largeur | Débordements | Hauteur à 1366 px |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| panne-format2 | chargée | 99 | 498 | 948 | 1291 | oui | 2910 | 1221 | – | 5091 | 375 | 0 | 3772 |
| panne-format2 | secours | 99 | 498 | 948 | 1291 | oui | 2910 | 1221 | – | 5091 | 375 | 0 | 3772 |
| panne-format2-arbre-court | chargée | 99 | 498 | 948 | 1291 | oui | 2910 | 337 | – | 4206 | 375 | 0 | 3309 |
| panne-format2-arbre-court | secours | 99 | 498 | 948 | 1291 | oui | 2910 | 337 | – | 4206 | 375 | 0 | 3309 |
| dossier-format2 | chargée | 99 | 481 | 927 | 1269 | oui | – | – | 3388 | 4373 | 375 | 0 | 3296 |
| dossier-format2 | secours | 99 | 481 | 927 | 1269 | oui | – | – | 3413 | 4398 | 375 | 0 | 3296 |
