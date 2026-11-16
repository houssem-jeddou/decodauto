Brouillon, jamais validé. Recette locale du lot B4 (vague B) : « perte de puissance », « voiture qui broute », « bruit moteur » et « fumée à l'échappement » (panne, arbre de décision). Refaite le 16/11/2026 (nuit), après les
corrections de la revue indépendante, sur la branche `etape-10/lot-b4` à `c4eee7a`. Remplace la recette précédente, périmée
(textes et verdicts ont changé depuis). Rien n'en va dans une pull request vers `main`. **Aucun texte de page n'est corrigé par
la recette** : les points ci-dessous sont signalés.

## Résultat en bref

- **Schéma : OK** pour chaque brouillon ; aucun paragraphe de plus de trois phrases ; arbre ou étapes dans la deuxième partie du
  texte (`controle.txt`, point 2).
- **Contrôle de la copie de travail : seules les validations absentes** (9 × R4-VALIDATION-ABSENTE, les brouillons B2 à B4),
  aucune autre erreur (`controle.txt`, point 3).
- **FORMAT2-MESURES : 0 erreur** (25 pages, 150 mesures) ; signalements du lot ci-dessous, à dire dans le paquet.
- **Lighthouse mobile** : 100 / 100 / 100 sur chaque page, CLS 0 (`lighthouse.txt` ; SEO 66 : construction en noindex, attendu).

## Points attendus, à trancher ou à dire dans le paquet

- **Arbre de « perte de puissance » au-delà de six écrans** (4 002 px) : 4 458 / 4 483 px à 375 px, encadré de 7 lignes. FORMAT2-MESURES le signale pour **décision de Houssem sur captures** (demande n° 32) : `captures/perte-de-puissance-375-chargee-page.png`.
- **Illustration au-delà de trois écrans** sur « perte de puissance » (3 371 / 3 396 px), « voiture qui broute » (2 451), « bruit moteur » (2 370) ; signalées (demande n° 32). « Fumée à l'échappement » : 1 694, dans les trois écrans.
- **Plan du site** : la branche porte le changement de la requête principale de la fumée (« fumée blanche échappement » devient « fumée blanche voiture »), demande de changement en attente ; aucun contrôle ne le signale. À valider avant la fusion.
- Pièce `ligne-d-echappement` retirée au profit de `tuyau-ou-joint-d-echappement` : aucune pièce inconnue au contrôle (COUT-*). La pièce `carburant-et-reamorcage` vient de la PR n° 76 (lot B1).

## Mesures (`mesures.json`, `mesures-format2.txt` ; police chargée / de secours quand elles diffèrent)

| | Perte de puissance | Voiture qui broute | Bruit moteur | Fumée à l'échappement |
|---|---|---|---|---|
| Bas de la première situation, à 375 px | 558 / 583 | 558 | 479 | 464 |
| Bas de l'encadré, à 375 px | 2 715 / 2 739 (7 lignes) | 1 849 (4 lignes) | 1 843 (6 lignes) | 1 324 (4 lignes) |
| Haut de l'illustration, à 375 px | 3 371 / 3 396 | 2 451 | 2 370 | 1 694 |
| Arbre ou étapes, à 375 px | arbre à 4 458 / 4 483 | arbre à 3 489 | arbre à 3 416 | arbre à 2 789 |
| Hauteur de la page, à 375 px | 10 871 / 10 921 | 7 570 | 8 019 | 7 640 |
| Bas de la première situation, à 320 px | 660 | 614 / 638 | 602 | 550 |
| Bas de l'encadré, à 320 px | 3 239 (7 lignes) | 2 193 / 2 217 (4 lignes) | 2 123 (6 lignes) | 1 506 (4 lignes) |
| Haut de l'illustration, à 320 px | 3 991 | 2 872 / 2 896 | 2 727 | 1 934 |
| Arbre ou étapes, à 320 px | arbre à 5 120 / 5 145 | arbre à 3 994 / 4 018 | arbre à 3 834 / 3 860 | arbre à 3 071 |
| Hauteur de la page, à 320 px | 12 612 / 12 637 | 8 649 / 8 724 | 9 132 / 9 157 | 8 742 |
| À 1366 × 800 : première situation ; illustration ; arbre ou étapes | 338 ; 1 859 ; 2 784 | 338 ; 1 416 ; 2 341 | 338 ; 1 438 ; 2 357 | 332 ; 1 042 ; 1 962 |
| Largeur à 320 px | 320, aucun débordement | 320, aucun débordement | 320, aucun débordement | 320, aucun débordement |

Seuils à 375 × 667 : première situation 667 px (2a) ; trois écrans 2 001 px (illustration, 2i) ; six écrans 4 002 px (arbre ou
étapes, demande n° 32). À 320 px, l'écran est de 640 px de haut ; les règles se mesurent à 375 px.

Lighthouse mobile, 3 passages, médianes : Perte de puissance LCP 1052 ms ; Voiture qui broute LCP 902 ms ; Bruit moteur LCP 1052 ms ; Fumée à l'échappement LCP 905 ms.

Captures : 72 fichiers.

## Comment la recette est construite

- **La branche seule ne se construit pas** (`controle.txt`, point 1) : l'exemple « moteur PureTech » de la porte 10, présent dans
  `exemples/`, cite des sources qui viennent de la PR houssem-jeddou/decodauto#76 (lot B1), pas encore fusionnée.
- **Copie de travail séparée, jamais poussée**, construite avec `AVEC_EXEMPLES=1` : `etape-10/lot-b4` (qui porte les lots B2, B3
  et B4 et `main`), plus la PR houssem-jeddou/decodauto#73 (011f891 : lignes d'écart des lignes saisies) et la PR
  houssem-jeddou/decodauto#76 (c548a28 : sources, coûts et pages de la porte 10). `data/sources.json` : union des deux côtés,
  entrées communes identiques. Les copies des deux exemples de la porte 10 dans `exemples/`, identiques aux pages publiées par la
  PR n° 76, sont retirées.
- Chromium préinstallé, police du système Inter ; police chargée (seconde visite, feuille en `font-display: block`) et
  police de secours (`/polices/` refusé) ; pixels CSS depuis le haut de la page.
- Captures (`captures/`, `capturer.cjs`) : `<page>-<320|375|1366>-<chargee|secours>-<ecran|page|encadre|notices|illustration|arbre|etapes|tableau>.png`,
  PNG sans perte, échelle 2 (page entière : échelle 1). Une capture en police de secours identique octet pour octet à
  celle en police chargée n'est pas gardée.
