# Captures et mesures des pages panne, dossier et tutoriel au format 2 (lot F1, tâche F1.3c et sa revue)

**Refaites le 16/11/2026 à F1.4** (porte du lot F1), sur la démonstration de la branche `etape-13/f1-porte`, PNG sans perte
(couleurs exactes ; une capture en police de secours identique octet pour octet à celle en police chargée n'est pas gardée).
Changements visibles depuis la prise précédente : ligne de transparence en 13 px et couleur douce (elle n'était pas stylée :
pages plus courtes d'environ 44 px), contour de focus bleu clair sur fond sombre, bandeau sans débordement à 320 px, rangée
« dépannage » de F1.3b sans triangle ; **ordre de la page panne de la demande n° 32** (texte jusqu'à la partie de
l'arbre ou des étapes, causes, suite du texte) ; la vue `1366-corps` montre désormais toute la colonne (le texte est en deux
blocs, de part et d'autre des causes). Captures avant et après le changement d'ordre : `../demande-32/`. Les mesures de ce dossier (`mesures.json`) sont celles de cette prise ; les mesures de
la porte, toutes pages et trois largeurs, sont dans `travaux/etape-13/f1/porte/mesures-format2.json` (FORMAT2-MESURES), qui
font foi quand un tableau plus bas date d'une prise antérieure.

Prises le 16/11/2026 par `capturer.cjs` sur la construction de démonstration du format 2 (`npm run demo:format2`) : les
pages de démonstration de `tests/demo/format2` (Markdown rendu par Astro, comme une vraie page ; jamais publiées), et la
planche des états de l'arbre (`planche.ts` : une question par gravité, de 0 à 3, chaque réponse terminée par la pastille du
verdict cité, dont le libellé le plus long de la grille, « Non, ne poursuivez pas votre trajet »).

Pages : `panne-arbre-long` (perte de puissance, cinq questions), `panne-arbre-court` (voiture qui broute, deux questions,
pastilles des gravités 3 et 0), `panne-tutoriel` (changer la batterie : fiche du tutoriel, étapes, tableau), `dossier`
(moteur PureTech, sans tutoriel : tableau de six colonnes en cartes, intitulés avec « & » et « < », historique). Les gravités
1 et 2 ne figurent dans aucune ligne de la base sans écart que ces pages reprennent : la planche les montre.

Fichiers `<page>-<vue>-<chargee|secours>.png` : `375-ecran` (premier écran, 375 × 667, échelle 2), `375-<composant>` et
`360-arbre` (composant seul, échelle 2), `375-page` (page entière, échelle 1), `1366-ecran` et `1366-corps` (ordinateur) ;
`planche-arbre-<320|360|375|1366>` (320 px : état sur deux lignes de la pastille la plus longue). PNG tels que les écrit le
navigateur, recompressés sans perte : couleurs exactes.

**Police chargée et police de secours** : la police chargée (Outfit) ne sert qu'aux titres (nom du site, H1, H2, résumé de
« Sources ») ; l'arbre, ses pastilles, les étapes et les tableaux sont en police du système dans les deux cas. Les captures de
ces composants seuls sont donc identiques octet pour octet ; la copie en police de secours n'est pas gardée (9 fichiers :
arbres et planches à 360, 375 et 1366 px, étapes et tableau du tutoriel). Les pages entières, elles, diffèrent par leurs titres.

## Pastille la plus longue (planche)

| Largeur | Police | Toutes les pastilles sur une ligne | Hauteur de l'arbre |
|---|---|---|---|
| 320 px | chargée | non | 891 |
| 360 px | chargée | oui | 759 |
| 375 px | chargée | oui | 759 |
| 1366 px | chargée | oui | 562 |
| 320 px | secours | non | 891 |
| 360 px | secours | oui | 759 |
| 375 px | secours | oui | 759 |
| 1366 px | secours | oui | 562 |

## Mesures des pages (375 × 667, sauf mention)

| Page | Police | Bas de la 1re situation (2a) | Bas de l'encadré | Haut de l'illustration (2i) | Arbre (haut / hauteur) | Pastilles sur une ligne | Haut de l'historique | Hauteur | Débordements (375) | Débordements (1366) |
|---|---|---|---|---|---|---|---|---|---|---|
| panne-arbre-long | chargée | 498 | 948 | 1 291 | 2 887 / 1 122 | oui (360 : oui) | – | 5 131 | 0 | 0 |
| panne-arbre-court | chargée | 472 | 856 | 1 198 | 2 086 / 410 | oui (360 : oui) | – | 3 453 | 0 | 0 |
| panne-tutoriel | chargée | 580 | 826 | 1 149 | – / – | – | – | 3 644 | 0 | 0 |
| dossier | chargée | 481 | 927 | 1 269 | – / – | – | 2 628 | 3 634 | 0 | 0 |
| panne-arbre-long | secours | 498 | 948 | 1 291 | 2 887 / 1 122 | oui (360 : oui) | – | 5 131 | 0 | 0 |
| panne-arbre-court | secours | 472 | 856 | 1 198 | 2 086 / 410 | oui (360 : oui) | – | 3 453 | 0 | 0 |
| panne-tutoriel | secours | 580 | 826 | 1 149 | – / – | – | – | 3 644 | 0 | 0 |
| dossier | secours | 481 | 927 | 1 269 | – / – | – | 2 653 | 3 660 | 0 | 0 |
