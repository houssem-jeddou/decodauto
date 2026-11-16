Brouillon, jamais validé. Recette locale du lot B2 (vague B) : « batterie de voiture » (panne, arbre de décision), « recharger » et « changer » (tutoriels : étapes et tableau). Refaite le 16/11/2026 (nuit), après les
corrections de la revue indépendante, sur la branche `etape-10/lot-b2` à `ae58f7b`. Remplace la recette précédente, périmée
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

- **Illustration au-delà de trois écrans** (2 001 px) sur « batterie de voiture » : 2 505 / 2 530 px (encadré de 5 lignes) ; signalée (demande n° 32).
- **Alerte R3-NIVEAU-A-VERIFIER** sur « changer la batterie », ligne « La batterie est hors d'usage et doit être remplacée » : les citations Renault Clio 5 et Dacia Sandero 3 contiennent « faites appel » et « impérativement », qui mènent selon la grille à « non, arrêt dès que possible » et à une urgence immédiate ; niveau saisi : « oui avec précautions », « sous quelques jours ». **À vérifier sur le paquet** (non corrigé).
- « Changer la batterie » : la première partie du texte compte deux blocs (les étapes sont dans la deuxième partie) ; le contrôle FORMAT2-ARBRE-PLACE l'accepte (aucune erreur).
- « Changer la batterie » n'a pas de lien « Votre marque » (aucune ligne à écart dans son encadré) ; les autres pages renvoient à leur phrase « Notices » (lignes saisies, PR n° 73) ou à la page du voyant.

## Mesures (`mesures.json`, `mesures-format2.txt` ; police chargée / de secours quand elles diffèrent)

| | Batterie de voiture | Recharger la batterie | Changer la batterie |
|---|---|---|---|
| Bas de la première situation, à 375 px | 520 / 545 | 505 | 464 |
| Bas de l'encadré, à 375 px | 1 903 / 1 927 (5 lignes) | 1 270 (3 lignes) | 1 248 (4 lignes) |
| Haut de l'illustration, à 375 px | 2 505 / 2 530 | 1 719 | 1 619 |
| Arbre ou étapes, à 375 px | arbre à 3 639 / 3 663 | étapes à 3 553 | étapes à 3 780 |
| Hauteur de la page, à 375 px | 11 182 / 11 232 | 9 995 / 10 020 | 8 540 |
| Bas de la première situation, à 320 px | 603 | 608 | 526 |
| Bas de l'encadré, à 320 px | 2 238 (5 lignes) | 1 510 (3 lignes) | 1 488 (4 lignes) |
| Haut de l'illustration, à 320 px | 2 898 | 2 054 | 1 897 |
| Arbre ou étapes, à 320 px | arbre à 4 073 | étapes à 4 069 | étapes à 4 295 / 4 320 |
| Hauteur de la page, à 320 px | 12 720 / 12 771 | 11 493 / 11 518 | 9 542 / 9 568 |
| À 1366 × 800 : première situation ; illustration ; arbre ou étapes | 335 ; 1 444 ; 2 368 | 353 ; 1 053 ; 2 494 | 295 ; 988 ; 2 578 |
| Largeur à 320 px | 320, aucun débordement | 320, aucun débordement | 320, aucun débordement |

Seuils à 375 × 667 : première situation 667 px (2a) ; trois écrans 2 001 px (illustration, 2i) ; six écrans 4 002 px (arbre ou
étapes, demande n° 32). À 320 px, l'écran est de 640 px de haut ; les règles se mesurent à 375 px.

Lighthouse mobile, 3 passages, médianes : Batterie de voiture LCP 909 ms ; Recharger la batterie LCP 906 ms ; Changer la batterie LCP 903 ms.

Captures : 58 fichiers.

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
