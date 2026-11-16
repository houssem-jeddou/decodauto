Brouillon, jamais validé. Recette locale du lot B4 (vague B, modèle panne avec arbre de décision : « perte de puissance »,
« voiture qui broute », « bruit moteur », « fumée à l'échappement »), faite le 16/11/2026 sur la branche
`etape-10/lot-b4` à `3c3b8e9` (lots B2 et B3 intégrés). Rien n'en va dans une pull request vers `main`. Verdicts et
extraits ne sont pas touchés.

## Résultat en bref

- **Deux brouillons ne passent pas le schéma** : un extrait de plus de 400 caractères, la limite de la courte citation.
  **Rien n'est corrigé : ce sont des extraits.**
  - `perte-de-puissance`, ligne 4, citation 2 : `notice-dacia-sandero-3`, p. 162, **434 caractères** ;
  - `voiture-qui-broute`, ligne 3, citation 2 : la même citation, 434 caractères.

  Le commit 3c3b8e9 avait raccourci cet extrait, mais pas assez. La construction de recette de la branche s'arrête donc
  sur `perte-de-puissance`.
- **Plan du site** : la branche porte le changement de la requête principale de la fumée (« fumée blanche échappement »
  devient « fumée blanche voiture »), demande de changement en attente. Aucun contrôle ne le signale. Il est à valider
  avant la fusion.
- **Aucune erreur technique** dans les quatre brouillons.
  - Pas de paragraphe de plus de trois phrases.
  - L'arbre est dans la deuxième partie du texte, après une première partie d'un seul paragraphe, sur les quatre pages.
  - `bruit-moteur` et `fumee-echappement` passent le schéma.
  - Rien n'a été corrigé.
- **Copie de travail séparée** (jamais commitée) : la branche, plus le lot F2 (`etape-13/f2-donnees`) et les lignes
  saisies (`etape-13/ecart-lignes-saisies`, PR houssem-jeddou/decodauto#73), fusionnés en local. Elle est sans les deux
  exemples de la porte 10 (sources et coûts absents de la branche) et sans `perte-de-puissance` ni `voiture-qui-broute`.
  - Contrôle : **seules les validations absentes restent** : 26 et 12 × R4-EMPREINTE (lot F2), et R4-VALIDATION-ABSENTE
    pour les sept brouillons B2, B3 et B4.

## Mesures (`mesures.json`, `mesures-format2.txt`) : `bruit-moteur` et `fumee-echappement`

| À 375 × 667 (police chargée ; de secours identique sauf la hauteur des pages) | Bruit moteur | Fumée à l'échappement |
|---|---|---|
| Bas de la première situation (2a : 667 au plus) | 479 | 464 |
| Bas de l'encadré | 1 715 (6 lignes) | 1 326 (4 lignes) |
| Haut du bloc « Notices / Base du coût » | 1 862 | 1 472 |
| Haut de l'illustration (2i) | **2 105, au-delà de trois écrans** (2 001), signalé : encadré de 6 lignes | 1 696 |
| Haut du sommaire | 2 418 | 2 010 |
| Arbre de décision | 3 112 (seuil de six écrans : 4 002) | 2 752 |
| Causes | 3 955 | 3 505 |
| Hauteur de la page | 7 102 | 7 209 |
| À 1366 × 800 : première situation, illustration, arbre | 338 ; 1 310 ; 2 210 | 332 ; 1 063 ; 1 963 |
| Largeur à 320 px | 320, aucun débordement | 320, aucun débordement |

- FORMAT2-MESURES sur la copie : 21 pages, 126 mesures, **0 erreur**, 10 signalements. Pour le lot B4 : l'illustration de
  `bruit-moteur`, dans les deux polices.
- Lighthouse mobile, 3 passages, médianes (`lighthouse.txt`) : les deux pages sont à 100 en performance, accessibilité et
  bonnes pratiques, CLS 0,000, LCP 756 et 1 052 ms. SEO 66 : construction en noindex, attendu.

## Captures (`captures/`, script `capturer.cjs`)

`<page>-<375|1366>-<chargee|secours>-<ecran|page|encadre|illustration|arbre>.png`, PNG sans perte, échelle 2 (page
entière : échelle 1). Une capture en police de secours identique octet pour octet n'est pas gardée : 28 fichiers. Les deux
pages bloquées par le schéma ne sont ni mesurées ni capturées.
