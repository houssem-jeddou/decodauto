# Lot F2 : preuves pour le paquet (brouillon, jamais validé)

Pull request du lot F2 (brief `travaux/etape-13/f2/taches/F2-pr.md`, §3), 16/11/2026 ; refaites après la revue indépendante de la pull request (données et feuille de style corrigées). Construction de production de la
branche (`SITE_INDEXABLE=true npx astro build`), Chromium préinstallé, police du système Inter.

| Fichier | Contenu |
|---|---|
| `mesures.json` | `resume` : par page, [police chargée, police de secours] à 375 × 667 : bas de la première situation (2a), mots de chaque ligne d'écart courte de l'encadré avec « Votre marque » (2b), haut de l'illustration et lignes de l'encadré (2i), nombre d'écrans et sommaire (2h), largeur de la page à 320 px, débordements (toutes largeurs), hauteur de l'encadré au format 1 (page en ligne) et au format 2 ; puis le détail : `format2_mesures` (FORMAT2-MESURES), `mots_lignes_ecart` (`travaux/etape-13/f2/mots-ecart.ts`, encadrés et cartes de l'outil), `captures` (`../captures/capturer-f2.cjs`) |
| `mesures-format2.txt` | sortie de `node scripts/mesurer-format2.ts --dist dist` : 14 pages (13 du lot et la page 404), 84 mesures, 0 erreur, 4 signalements |
| `lighthouse.txt` | Lighthouse mobile, 3 passages, médianes, 13 pages |
| `production-diff.txt` | `diff -rq` avec la construction de `main` : seules les 13 pages, la page 404 et `sitemap.xml` (`lastmod`) changent |

Résumé à 375 × 667 (police chargée ; la police de secours donne les mêmes valeurs, sauf la hauteur des pages, au plus
51 px de plus) :

| Page | 1re situation (2a, ≤ 667) | Mots des lignes d'écart (≤ 25) | Illustration (2i) | Écrans, sommaire (2h) | Encadré : format 1 → format 2 |
|---|---|---|---|---|---|
| Accueil | – | – | ordinateur seulement | 3,1, sans objet | – |
| Outil | 635 | 24, 25 (cartes : 19 à 25) | 1 823 | 32,4, oui | 2 279 → 1 244 |
| Moteur | 520 | 24, 22 | 1 961 | 17,8, oui | 2 597 → 1 387 |
| Huile | 479 | 21, 24 | 1 979 | 17,3, oui | 2 442 → 1 369 |
| Batterie | 603 | 19 | 1 260 | 12,0, oui | 1 183 → 700 |
| Frein | 602 | – | 1 648 | 16,5, oui | 1 879 → 1 106 |
| AdBlue | 598 | 19, 22, 24, 24 | 2 761, signalée (4 lignes) | 20,4, oui | 3 864 → 2 069 |
| FAP | 605 | 24, 24 | 1 999 | 15,1, oui | 2 392 → 1 363 |
| Préchauffage | 506 | 24 | 1 776 | 9,7, oui | 2 056 → 1 135 |
| Airbag | 575 | 24 | 1 416 | 13,0, oui | 1 584 → 843 |
| ABS et ESP | 537 | 25, 23, 21 | 2 320, signalée (4 lignes) | 19,7, oui | 3 026 → 1 709 |
| Pression des pneus | 645 | 24 | 1 646 | 15,7, oui | 1 977 → 1 067 |
| Direction | 586 | 19, 19 | 1 670 | 14,5, oui | 1 847 → 1 029 |

Largeur à 320 px : 320 sur toutes les pages, aucun débordement (320, 375 et 1366 px, deux polices).
