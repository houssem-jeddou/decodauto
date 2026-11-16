Brouillon, jamais validé. Recette locale du lot B3 (vague B : « moteur qui surchauffe » au modèle panne avec arbre de
décision, « nettoyer le FAP » au format tutoriel avec étapes et tableau), refaite le 16/11/2026 sur la branche
`etape-10/lot-b3` à `4b9aea1` (lot B2 intégré), avec la PR houssem-jeddou/decodauto#73 à jour. Les deux pages ont chacune
une ligne saisie dont les marques divergent : surchauffe, ligne 4 ; FAP, ligne 2. Rien n'en va dans une pull request vers
`main`. Verdicts et extraits ne sont pas touchés.

## Résultat en bref

- **Aucune erreur technique dans les deux brouillons. Rien n'a été corrigé.**
  - Schéma : OK.
  - Aucun paragraphe de plus de trois phrases.
  - L'arbre et les étapes sont dans la deuxième partie du texte, après une première partie d'un seul paragraphe.
- **Contrôle de la copie de travail : seules les validations absentes restent.**
  - 26 et 12 × R4-EMPREINTE pour le lot F2 ;
  - R4-VALIDATION-ABSENTE pour les cinq brouillons B2 et B3.
  - Pas de FORMAT2-ECART : les lignes saisies à écart mènent à leur phrase « Notices », avec l'écart en entier dessous.
- FORMAT2-MESURES : 19 pages, 114 mesures, **0 erreur**.
- Lighthouse : 100 / 100 / 100 sur les deux pages, CLS 0.

## Mesures (`mesures.json`, `mesures-format2.txt` ; à 375 × 667, police chargée ; police de secours identique sauf la hauteur des pages)

| | Moteur qui surchauffe | Nettoyer le FAP |
|---|---|---|
| Bas de la première situation (2a : 667 au plus) | 641 (marge visée : 640) | 580 |
| Bas de l'encadré | 1 987 (6 lignes) | 1 038 (2 lignes) |
| Haut du bloc « Notices / Base du coût » | 2 134 | 1 184 |
| Haut de l'illustration (2i) | **2 589, au-delà de trois écrans** (2 001), signalé : encadré de 6 lignes, puis bloc « Notices » avec l'écart de la ligne 4 | 1 468 |
| Haut du sommaire | 2 883 | 1 742 |
| Arbre / étapes | arbre à 3 627 (seuil de six écrans : 4 002) | étapes à 3 074 |
| Causes | 4 627 | 3 651 |
| Tableau (élément unique) | – | 4 521 |
| Hauteur de la page | 10 246 / 10 271 | 6 891 |
| À 1366 × 800 : première situation, illustration, arbre ou étapes | 380 ; 1 496 ; 2 376 | 359 ; 884 ; 2 257 |
| Largeur à 320 px | 320, aucun débordement | 320, aucun débordement |

Par rapport à la recette précédente, l'écart affiché sous la phrase « Notices » fait descendre l'illustration et ce qui suit
de 118 px (surchauffe) et de 60 px (FAP). L'arbre de la surchauffe s'approche du seuil de six écrans : 3 627 px, à 375 px
de 4 002 ; à 320 px, il est à 4 036.

Lighthouse mobile, 3 passages, médianes (`lighthouse.txt`) : les deux pages sont à 100 en performance, accessibilité et
bonnes pratiques, CLS 0,000, LCP 907 et 754 ms. SEO 66 : construction en noindex, attendu.

Captures : 30 fichiers. Sur téléphone, le tableau du FAP garde ses trois colonnes.

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
