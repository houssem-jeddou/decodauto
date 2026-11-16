# Captures et mesures des pages du lot F3 au format 2 (lot F1, tâche F1.3b)

Prises le 16/11/2026 par `capturer.cjs` : les pages de la construction de démonstration du format 2 (`npm run demo:format2`,
brouillon jamais validé, jamais déployée) à côté des mêmes pages en ligne (format 1, `npm run build`) : code P0420, pression
des pneus (page informative, réponse directe), loi montagne, « à propos », mentions légales, page 404.

Fichiers `<page>-<format2|en-ligne>-<vue>-<chargee|secours>.png` : `375-ecran` (premier écran du téléphone, 375 × 667,
échelle 2), `375-page` (page entière, échelle 1), `1366-ecran` (ordinateur, 1366 × 800) ; format 2 seulement, composants seuls
à 375 px : `fiche-code`, `par-marque`, `causes`, `cout` (dont le dépannage sur autoroute), `encadre`, `fiche-texte`,
`tableau`, `auteur`, `methode`, `mentions`. Police chargée : feuille servie en `font-display: block` (police en cache) ;
police de secours : `/polices/` bloqué. Les pages en ligne (format 1) n'utilisent aucune police chargée : une seule série. Une capture en police de secours
identique octet pour octet à celle en police chargée n'est pas gardée (4 cas : composants sans titre en Outfit).
PNG tels que les écrit le navigateur, recompressés sans perte (couleurs exactes ; refaits le 16/11/2026 après la revue de F1.3a :
les précédents étaient réduits à 128 couleurs ; mesures inchangées). `mesures.json` : mesures brutes, en pixels CSS depuis le haut de la page.

## Mesures

375 × 667 : règle 2a (bas de la situation, du verdict, de l'urgence et de l'action de la première ligne, 667 px au plus) ;
précision 2a d'une page informative (réponse directe complète, puis la première situation avec son verdict et son urgence dans le
premier écran) ; règle 2i (haut de l'illustration, 2 001 px au plus). « Débordements » : éléments de `main` qui dépassent la
largeur de l'écran (tableaux et sommaire, qui défilent dans leur bloc, exceptés).

| Page | Rendu | Police | Bas de la réponse directe (2c) | Bas du verdict et de l'urgence | Bas de la 1re situation (2a) | Bas de l'encadré | Haut de l'illustration (2i) | Hauteur | Débordements | Hauteur (1366) | Débordements (1366) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| code-p0420 | format 2 | chargée | – | 399 | 547 | 852 | 1 233 | 9 194 | 0 | 5 971 | 0 |
| code-p0420 | format 2 | secours | – | 399 | 547 | 852 | 1 233 | 9 245 | 0 | 6 022 | 0 |
| code-p0420 | en ligne (format 1) | chargée | – | 530 | 738 | 1 451 | – | 11 878 | 0 | 7 502 | 0 |
| pression-des-pneus | format 2 | chargée | 405 | 576 | 766 | 1 071 | 1 414 | 8 400 | 0 | 5 183 | 0 |
| pression-des-pneus | format 2 | secours | 405 | 576 | 766 | 1 071 | 1 414 | 8 400 | 0 | 5 208 | 0 |
| pression-des-pneus | en ligne (format 1) | chargée | – | 666 | 926 | 1 747 | – | 9 950 | 15 | 5 801 | 0 |
| loi-montagne | format 2 | chargée | – | 442 | 591 | 1 350 | 1 674 | 8 536 | 0 | 5 483 | 0 |
| loi-montagne | format 2 | secours | – | 442 | 591 | 1 350 | 1 674 | 8 637 | 0 | 5 483 | 0 |
| loi-montagne | en ligne (format 1) | chargée | – | 640 | 848 | 2 208 | – | 10 914 | 0 | 6 524 | 0 |
| a-propos | format 2 | chargée | – | – | – | – | – | 8 184 | 0 | 4 790 | 0 |
| a-propos | format 2 | secours | – | – | – | – | – | 8 184 | 0 | 4 790 | 0 |
| a-propos | en ligne (format 1) | chargée | – | – | – | – | – | 8 503 | 0 | 5 297 | 0 |
| mentions-legales | format 2 | chargée | – | – | – | – | – | 4 444 | 0 | 2 977 | 0 |
| mentions-legales | format 2 | secours | – | – | – | – | – | 4 444 | 0 | 2 977 | 0 |
| mentions-legales | en ligne (format 1) | chargée | – | – | – | – | – | 4 839 | 0 | 3 113 | 0 |
| 404 | format 2 | chargée | – | – | – | – | – | 667 | 0 | 800 | 0 |
| 404 | format 2 | secours | – | – | – | – | – | 667 | 0 | 800 | 0 |
| 404 | en ligne (format 1) | chargée | – | – | – | – | – | 667 | 0 | 800 | 0 |
