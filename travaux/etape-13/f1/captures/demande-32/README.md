# Captures avant et après la demande de changement n° 32 (page panne : l'arbre avant les causes)

Prises le 16/11/2026 par `capturer.cjs` (Chromium et Playwright préinstallés), sur la construction de démonstration du
format 2 (`npm run demo:format2`), avant (`-avant-`) et après (`-apres-`) la mise en œuvre de la demande n° 32 dans la tâche
F1.4. PNG sans perte ; une capture en police de secours identique octet pour octet à celle en police chargée n'est pas
gardée.

Pages : démonstrations « perte de puissance », « voiture qui broute », « changer la batterie » (tutoriel). L'exemple
« voiture ne démarre pas » (branche `preparation/etape-10`, version 2, verdicts jamais validés) a été mesuré de la même façon,
ajouté en local à la démonstration sans être commité ; ses captures sont sur la branche `preparation/etape-10`, dans
`travaux/etape-10/recette-porte-10/demande-32/` (brouillon de l'étape 10 : il n'entre pas dans une PR vers `main`, revue de
la porte F1). Il reste cité ici par ses chiffres.

Fichiers : `<page>-<avant|apres>-<vue>-<chargee|secours>.png`, vues `375-page` (page entière à 375 px), `1366-ecran`
(premier écran à 1366 × 800), `1366-arbre` (écran qui commence à l'arbre ou aux étapes). Mesures en pixels CSS à 375 × 667 :
`mesures-avant.json`, `mesures-apres.json` (haut de l'encadré, de l'illustration, du sommaire, de la fiche, de l'arbre ou
des étapes, des causes ; ordre du sommaire) ; `mesures-format2-avec-exemple.txt` : FORMAT2-MESURES sur la démonstration
avec l'exemple (15 pages, 0 erreur, 4 signalements : illustrations de l'exemple et d'AdBlue au-delà de trois écrans).

| Page | Arbre ou étapes, avant → après | Causes, avant → après |
|---|---|---|
| Perte de puissance | 2 874 → 2 314 | 1 975 → 3 468 |
| Voiture qui broute | 2 076 → 1 855 | 1 818 → 2 297 |
| Changer la batterie (étapes) | 2 411 → 2 190 | 2 033 → 2 603 |
| Voiture ne démarre pas (exemple) | 5 666 → 3 560 (police de secours : 5 692 → 3 585) | 3 158 → 5 350 |
