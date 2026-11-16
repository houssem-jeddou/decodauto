Brouillon, jamais validé. Recette locale du lot B4 (vague B, modèle panne avec arbre de décision : « perte de puissance »,
« voiture qui broute », « bruit moteur », « fumée à l'échappement »), refaite le 16/11/2026 au soir sur la branche
`etape-10/lot-b4` à `75f88fd` (extrait Dacia p. 162 ramené à 398 caractères), avec le lot F2 validé (PR
houssem-jeddou/decodauto#71 à 8593505, empreintes écrites) et la PR houssem-jeddou/decodauto#73 à 4a499c2. Les quatre
pages sont mesurées et capturées. Rien n'en va dans une pull request vers `main`. Verdicts et extraits ne sont pas touchés.

## Résultat en bref

- **Les quatre brouillons passent le schéma** (`controle.txt`, point 2). Aucun paragraphe de plus de trois phrases ; l'arbre
  est dans la deuxième partie du texte, après une première partie d'un seul paragraphe. **Rien n'a été corrigé.**
- **Une erreur nouvelle, à trancher, non corrigée : COUT-PIECE-INCONNUE** sur `perte-de-puissance` et `voiture-qui-broute`.
  Leur cause « panne d'essence » porte la pièce `carburant-et-reamorcage`, absente de `data/couts.json` sur toutes les
  branches. Elle est aussi utilisée par l'exemple `voiture-ne-demarre-pas` de la porte 10. L'ajouter, c'est choisir sa
  tranche du coût probable : à faire dans la pull request du lot, validé avec lui. Elle était masquée jusqu'ici par l'erreur
  de schéma.
  - Effet sur la page : sans cette pièce, le coût probable n'est pas calculé et l'encadré s'affiche **sans son bloc de coût**.
    Les mesures de ces deux pages au-delà des lignes de l'encadré sont donc trop courtes de la hauteur de ce bloc : 193 px
    à 375 px sur `bruit-moteur` et `fumee-echappement` (dépannage sur autoroute compris). La première situation (2a) n'est
    pas touchée : le bloc vient après les lignes.
- **Lignes saisies à écart** (PR n° 73) : `perte-de-puissance` ligne 4 et `voiture-qui-broute` ligne 3 mènent à leur
  phrase « Notices » (`#da-notices-ligne-4`, `#da-notices-ligne-3`), avec l'écart entre marques en entier dessous ; aucun
  FORMAT2-ECART.
- **Plan du site** : la branche porte le changement de la requête principale de la fumée (« fumée blanche échappement »
  devient « fumée blanche voiture »), demande de changement en attente. Aucun contrôle ne le signale. Il est à valider
  avant la fusion.
- **Contrôle de la copie de travail** : 11 erreurs, les 9 validations absentes des brouillons B2, B3 et B4
  (R4-VALIDATION-ABSENTE) et les 2 COUT-PIECE-INCONNUE. Plus aucune R4-EMPREINTE du lot F2 (empreintes écrites).
- FORMAT2-MESURES : 23 pages, 138 mesures, **0 erreur**.
- Lighthouse mobile : 100 / 100 / 100 sur les quatre pages, CLS 0.

## Mesures (`mesures.json`, `mesures-format2.txt` ; à 375 × 667, police chargée / de secours)

| | Perte de puissance | Voiture qui broute | Bruit moteur | Fumée à l'échappement |
|---|---|---|---|---|
| Bas de la première situation (2a : 667 au plus) | 558 / 583 | 558 | 479 | 464 |
| Bas de l'encadré | 1 773 / 1 798 (5 lignes, **sans le coût**) | 1 337 (3 lignes, **sans le coût**) | 1 715 (6 lignes) | 1 326 (4 lignes) |
| Haut du bloc « Notices / Base du coût » | 1 920 / 1 944 | 1 483 | 1 862 | 1 472 |
| Haut de l'illustration (2i) | **2 162 / 2 187, au-delà de trois écrans** (2 001), signalé : encadré de 5 lignes, puis bloc « Notices » avec l'écart de la ligne 4 ; avec le coût, environ 2 350 | 1 706 ; avec le coût, environ 1 900 | **2 105, au-delà de trois écrans**, signalé : encadré de 6 lignes | 1 696 |
| Haut du sommaire | 2 456 / 2 480 | 2 000 | 2 418 | 2 010 |
| Arbre de décision (seuil de six écrans : 4 002) | 3 199 / 3 224 ; avec le coût, environ 3 390 | 2 719 | 3 112 | 2 752 |
| Causes | 3 963 / 3 987 | 3 301 | 3 955 | 3 505 |
| Hauteur de la page | 7 950 / 8 000 | 6 144 | 7 102 | 7 280 / 7 305 |
| À 1366 × 800 : première situation, illustration, arbre | 338 ; 1 278 ; 2 203 | 338 ; 1 000 ; 1 900 | 338 ; 1 310 ; 2 210 | 332 ; 1 063 ; 1 963 |
| Largeur à 320 px | 320, aucun débordement | 320, aucun débordement | 320, aucun débordement | 320, aucun débordement |

Les valeurs « avec le coût » ajoutent les 193 px du bloc mesuré sur les deux autres pages : une estimation, pas une mesure.
La page de la fumée est plus haute de 71 px qu'à la recette précédente (7 209) : le lien vers « perte de puissance »
s'affiche maintenant (texte et pages liées), puisque cette page est construite.

Lighthouse mobile, 3 passages, médianes (`lighthouse.txt`) : les quatre pages sont à 100 en performance, accessibilité et
bonnes pratiques, CLS 0,000, LCP de 754 à 1 052 ms. SEO 66 : construction en noindex, attendu.

Captures : 62 fichiers (`captures/`).

## Comment la recette est construite

- **La branche seule ne se construit pas** (`controle.txt`, point 1). La ligne d'écart courte de `batterie-rouge` est dans
  la base du lot F2 (PR houssem-jeddou/decodauto#71), validée mais pas encore fusionnée. Les exemples de la porte 10 présents sur la
  branche n'ont pas non plus leurs sources ni leurs coûts.
- **Copie de travail séparée, jamais commitée**, construite avec `AVEC_EXEMPLES=1` :
  - la branche ;
  - plus le lot F2 (`etape-13/f2-donnees` à 8593505, base validée et empreintes écrites) ;
  - plus la PR houssem-jeddou/decodauto#73 à 4a499c2 (`etape-13/ecart-lignes-saisies` : ligne d'écart des lignes saisies,
    avec l'écart entre marques en entier sous la phrase « Notices » ciblée) ;
  - sans les deux exemples de la porte 10.
- Chromium préinstallé, police du système Inter ; police chargée (seconde visite, feuille en `font-display: block`) et
  police de secours (`/polices/` refusé) ; pixels CSS depuis le haut de la page.
- Captures (`captures/`, `capturer.cjs`) : `<page>-<375|1366>-<chargee|secours>-<ecran|page|encadre|illustration|arbre|etapes|tableau>.png`,
  PNG sans perte, échelle 2 (page entière : échelle 1). Une capture en police de secours identique octet pour octet à
  celle en police chargée n'est pas gardée.
