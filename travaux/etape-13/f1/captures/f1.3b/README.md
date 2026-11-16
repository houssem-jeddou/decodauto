# Captures et mesures des pages du lot F3 au format 2 (lot F1, tâche F1.3b)

**Refaites le 16/11/2026 à F1.4** (porte du lot F1), sur la démonstration de la branche `etape-13/f1-porte`, PNG sans perte
(couleurs exactes ; une capture en police de secours identique octet pour octet à celle en police chargée n'est pas gardée).
Changements visibles depuis la prise précédente : ligne de transparence en 13 px et couleur douce (elle n'était pas stylée :
pages plus courtes d'environ 44 px), contour de focus bleu clair sur fond sombre, bandeau sans débordement à 320 px, rangée
« dépannage » de F1.3b sans triangle. Les mesures de ce dossier (`mesures.json`) sont celles de cette prise ; les mesures de
la porte, toutes pages et trois largeurs, sont dans `travaux/etape-13/f1/porte/mesures-format2.json` (FORMAT2-MESURES), qui
font foi quand un tableau plus bas date d'une prise antérieure.

Prises le 16/11/2026 par `capturer.cjs`, refaites le même jour après la revue de F1.3b : les pages de la construction de démonstration du format 2 (`npm run demo:format2`,
brouillon jamais validé, jamais déployée) à côté des mêmes pages en ligne (format 1, `npm run build`) : code P0420, pression
des pneus (page informative, réponse directe), loi montagne, « à propos », mentions légales, page 404.

Fichiers `<page>-<format2|en-ligne>-<vue>-<chargee|secours>.png` : `375-ecran` (premier écran du téléphone, 375 × 667,
échelle 2), `375-page` (page entière, échelle 1), `1366-ecran` (ordinateur, 1366 × 800) ; format 2 seulement, composants seuls
à 375 px : `fiche-code`, `par-marque`, `causes`, `cout` (dont le dépannage sur autoroute), `encadre`, `fiche-texte`,
`tableau`, `ecart` (ligne d'écart et son lien « Votre marque »), `illustration` (étiquette de la pression redessinée), `sommaire` (« à propos »), `auteur`, `methode`, `mentions`. Police chargée : feuille servie en `font-display: block` (police en cache) ;
police de secours : `/polices/` bloqué. Les pages en ligne (format 1) n'utilisent aucune police chargée : une seule série. Une capture en police de secours
identique octet pour octet à celle en police chargée n'est pas gardée (composants sans titre en Outfit).
PNG tels que les écrit le navigateur, recompressés sans perte (couleurs exactes ; refaits le 16/11/2026 après la revue de F1.3a :
les précédents étaient réduits à 128 couleurs ; mesures inchangées). `mesures.json` : mesures brutes, en pixels CSS depuis le haut de la page.

## Mesures

375 × 667 : règle 2a (bas de la situation, du verdict, de l'urgence et de l'action de la première ligne, 667 px au plus) ;
précision 2a d'une page informative (réponse directe complète, puis la première situation avec son verdict et son urgence dans le
premier écran) ; règle 2i (haut de l'illustration, 2 001 px au plus). « Débordements » : éléments de `main` qui dépassent la
largeur de l'écran (tableaux et sommaire, qui défilent dans leur bloc, exceptés). Revue de F1.3b : « Mention → H1 », écart entre le bas de la mention en tête et le haut du H1 (29 px sur toutes les pages au format 2) ; « Bas du pied » : 667 sur la 404, pied en bas de l'écran.

| Page | Rendu | Police | Mention → H1 | Boutons « Trouver mon voyant » | Bas de la réponse directe (2c) | Bas du verdict et de l'urgence | Bas de la 1re situation (2a) | Bas de l'encadré | Haut de l'illustration (2i) | Hauteur | Bas du pied | Débordements | Hauteur (1366) | Débordements (1366) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| code-p0420 | format 2 | chargée | 29 | 1 | – | 399 | 547 | 872 | 1 205 | 9 131 | 9 131 | 0 | 5 949 | 0 |
| code-p0420 | format 2 | secours | 29 | 1 | – | 399 | 547 | 872 | 1 205 | 9 182 | 9 182 | 0 | 6 000 | 0 |
| code-p0420 | en ligne (format 1) | chargée | 58 | 0 | – | 530 | 738 | 1 451 | – | 11 878 | 11 878 | 0 | 7 502 | 0 |
| pression-des-pneus | format 2 | chargée | 29 | 1 | 405 | 576 | 766 | 1 091 | 1 386 | 8 161 | 8 161 | 0 | 5 149 | 0 |
| pression-des-pneus | format 2 | secours | 29 | 1 | 405 | 576 | 766 | 1 091 | 1 386 | 8 161 | 8 161 | 0 | 5 174 | 0 |
| pression-des-pneus | en ligne (format 1) | chargée | 58 | 0 | – | 666 | 926 | 1 747 | – | 9 950 | 9 950 | 15 | 5 801 | 0 |
| loi-montagne | format 2 | chargée | 29 | 1 | – | 442 | 591 | 1 350 | 1 627 | 8 492 | 8 492 | 0 | 5 448 | 0 |
| loi-montagne | format 2 | secours | 29 | 1 | – | 442 | 591 | 1 350 | 1 627 | 8 593 | 8 593 | 0 | 5 448 | 0 |
| loi-montagne | en ligne (format 1) | chargée | 58 | 0 | – | 640 | 848 | 2 208 | – | 10 914 | 10 914 | 0 | 6 524 | 0 |
| a-propos | format 2 | chargée | 29 | 1 | – | – | – | – | – | 8 286 | 8 286 | 0 | 4 816 | 0 |
| a-propos | format 2 | secours | 29 | 1 | – | – | – | – | – | 8 286 | 8 286 | 0 | 4 816 | 0 |
| a-propos | en ligne (format 1) | chargée | 24 | 0 | – | – | – | – | – | 8 503 | 8 503 | 0 | 5 297 | 0 |
| mentions-legales | format 2 | chargée | 29 | 1 | – | – | – | – | – | 4 547 | 4 547 | 0 | 3 002 | 0 |
| mentions-legales | format 2 | secours | 29 | 1 | – | – | – | – | – | 4 547 | 4 547 | 0 | 3 002 | 0 |
| mentions-legales | en ligne (format 1) | chargée | 24 | 0 | – | – | – | – | – | 4 839 | 4 839 | 0 | 3 113 | 0 |
| 404 | format 2 | chargée | 29 | 1 | – | – | – | – | – | 667 | 667 | 0 | 800 | 0 |
| 404 | format 2 | secours | 29 | 1 | – | – | – | – | – | 667 | 667 | 0 | 800 | 0 |
| 404 | en ligne (format 1) | chargée | 24 | 0 | – | – | – | – | – | 667 | 587 | 0 | 800 | 0 |
