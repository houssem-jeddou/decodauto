Brouillon, jamais validé. Recette locale du lot B4 (vague B, modèle panne avec arbre de décision : « perte de puissance »,
« voiture qui broute », « bruit moteur », « fumée à l'échappement »), refaite le 16/11/2026 sur la branche
`etape-10/lot-b4` à `b5e7404` (lots B2 et B3 intégrés), avec la PR houssem-jeddou/decodauto#73 à jour. Rien n'en va dans
une pull request vers `main`. Verdicts et extraits ne sont pas touchés.

## Résultat en bref

- **Deux brouillons ne passent toujours pas le schéma** : un extrait de plus de 400 caractères, la limite de la courte
  citation. **Rien n'est corrigé : ce sont des extraits.**
  - `perte-de-puissance`, ligne 4, citation 2 : `notice-dacia-sandero-3`, p. 162, **434 caractères** ;
  - `voiture-qui-broute`, ligne 3, citation 2 : la même citation, 434 caractères.

  Le commit 3c3b8e9 avait raccourci cet extrait, mais pas assez. Ces deux pages ont aussi une ligne saisie à écart
  (ligne 4 et ligne 3), que la PR n° 73 traite. Elles ne sont ni mesurées ni capturées.
- **Plan du site** : la branche porte le changement de la requête principale de la fumée (« fumée blanche échappement »
  devient « fumée blanche voiture »), demande de changement en attente. Aucun contrôle ne le signale. Il est à valider
  avant la fusion.
- **Aucune erreur technique dans les quatre brouillons. Rien n'a été corrigé.**
  - Aucun paragraphe de plus de trois phrases.
  - L'arbre est dans la deuxième partie du texte, après une première partie d'un seul paragraphe.
- **Contrôle de la copie de travail** (sans les deux pages bloquées) : **seules les validations absentes restent** (lot F2
  et les sept brouillons B2, B3 et B4).
- FORMAT2-MESURES : 21 pages, 126 mesures, **0 erreur**.
- Lighthouse : 100 / 100 / 100 sur les deux pages mesurées, CLS 0.

## Mesures (`mesures.json`, `mesures-format2.txt`) : `bruit-moteur` et `fumee-echappement`

Ces deux pages n'ont pas de ligne saisie à écart : leurs mesures sont les mêmes que lors de la recette précédente.

| À 375 × 667 (police chargée ; de secours identique sauf la hauteur des pages) | Bruit moteur | Fumée à l'échappement |
|---|---|---|
| Bas de la première situation (2a : 667 au plus) | 479 | 464 |
| Bas de l'encadré | 1 715 (6 lignes) | 1 326 (4 lignes) |
| Haut du bloc « Notices / Base du coût » | 1 862 | 1 472 |
| Haut de l'illustration (2i) | **2 105, au-delà de trois écrans** (2 001), signalé : encadré de 6 lignes | 1 696 |
| Haut du sommaire | 2 418 | 2 010 |
| Arbre de décision | 3 112 (seuil de six écrans : 4 002) | 2 752 |
| Causes | 3 955 | 3 505 |
| Hauteur de la page | 7 102 | 7 209 / 7 235 |
| À 1366 × 800 : première situation, illustration, arbre | 338 ; 1 310 ; 2 210 | 332 ; 1 063 ; 1 963 |
| Largeur à 320 px | 320, aucun débordement | 320, aucun débordement |

Lighthouse mobile, 3 passages, médianes (`lighthouse.txt`) : les deux pages sont à 100 en performance, accessibilité et
bonnes pratiques, CLS 0,000, LCP 904 et 903 ms. SEO 66 : construction en noindex, attendu.

Captures : 28 fichiers.

## Comment la recette est construite

- **La branche seule ne se construit pas** (`controle.txt`, point 1). La ligne d'écart courte de `batterie-rouge` est dans
  la base du lot F2 (PR houssem-jeddou/decodauto#71), pas encore fusionnée. Les exemples de la porte 10 présents sur la
  branche n'ont pas non plus leurs sources ni leurs coûts.
- **Copie de travail séparée, jamais commitée**, construite avec `AVEC_EXEMPLES=1` :
  - la branche ;
  - plus le lot F2 (`etape-13/f2-donnees`) ;
  - plus la PR houssem-jeddou/decodauto#73 à 4a499c2 (`etape-13/ecart-lignes-saisies` : ligne d'écart des lignes saisies,
    avec l'écart entre marques en entier sous la phrase « Notices » ciblée) ;
  - sans les deux exemples de la porte 10.
- Chromium préinstallé, police du système Inter ; police chargée (seconde visite, feuille en `font-display: block`) et
  police de secours (`/polices/` refusé) ; pixels CSS depuis le haut de la page.
- Captures (`captures/`, `capturer.cjs`) : `<page>-<375|1366>-<chargee|secours>-<ecran|page|encadre|illustration|arbre|etapes|tableau>.png`,
  PNG sans perte, échelle 2 (page entière : échelle 1). Une capture en police de secours identique octet pour octet à
  celle en police chargée n'est pas gardée.
