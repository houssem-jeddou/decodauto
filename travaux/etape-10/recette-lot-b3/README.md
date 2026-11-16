Brouillon, jamais validé. Recette locale du lot B3 (vague B : « moteur qui surchauffe » au modèle panne avec arbre de
décision, « nettoyer le FAP » au format tutoriel avec étapes et tableau), faite le 16/11/2026 sur la branche
`etape-10/lot-b3` à `47f7970` (lot B2 intégré). Rien n'en va dans une pull request vers `main`. Verdicts et extraits
ne sont pas touchés.

## Résultat en bref

- **La construction de recette de la branche seule échoue**, à cause de la page `batterie-voiture` (lot B2) : « ligne
  d'écart courte (ecart_court) absente alors que les marques divergent : ligne 5 (batterie-rouge) ». Cette ligne courte
  est dans la base du lot F2 (PR houssem-jeddou/decodauto#71), pas encore fusionnée. Les exemples de la porte 10 sur la
  branche n'ont pas non plus leurs sources ni leurs coûts (R3-SOURCE-INCONNUE, COUT-PIECE-INCONNUE). Rien de propre au
  lot B3.
- **Aucune erreur technique dans les deux brouillons du lot.**
  - Schéma : OK.
  - Aucun paragraphe de plus de trois phrases.
  - L'arbre (surchauffe) et les étapes (FAP) sont dans la deuxième partie du texte, après une première partie d'un seul
    paragraphe.
  - Rien n'a été corrigé.
- **Copie de travail séparée** (jamais commitée) : la branche, plus le lot F2 (`etape-13/f2-donnees`) et les lignes
  saisies (`etape-13/ecart-lignes-saisies`, PR houssem-jeddou/decodauto#73), fusionnés en local, sans les deux exemples de
  la porte 10.
  - Contrôle : **seules les validations absentes restent**. 26 × R4-EMPREINTE pour les lignes du lot F2, 12 ×
    R4-EMPREINTE pour ses pages, R4-VALIDATION-ABSENTE pour les cinq brouillons B2 et B3.
  - Les trois pages du lot B2 se construisent dans cette copie (extraits ramenés sous 400 caractères en 8d476a6, ligne
    saisie à écart de #73).

## Mesures (`mesures.json`, `mesures-format2.txt`)

Chromium préinstallé, police du système Inter ; pixels CSS ; police chargée et police de secours. Les valeurs sont les
mêmes dans les deux polices, sauf la hauteur des pages et la position des étapes du FAP en police de secours.

| À 375 × 667 | Moteur qui surchauffe | Nettoyer le FAP |
|---|---|---|
| Bas de la première situation (2a : 667 au plus) | 641 (marge visée : 640) | 580 |
| Bas de l'encadré | 1 987 (6 lignes) | 1 038 (2 lignes) |
| Haut du bloc « Notices / Base du coût » | 2 134 | 1 184 |
| Haut de l'illustration (2i) | **2 471, au-delà de trois écrans** (2 001), signalé : encadré de 6 lignes | 1 408 |
| Haut du sommaire | 2 764 | 1 682 |
| Arbre de décision / étapes | arbre à 3 508 (seuil de six écrans : 4 002) | étapes à 3 014 |
| Causes | 4 508 | 3 591 |
| Tableau (élément unique) | – | 4 461 |
| Hauteur de la page | 10 127 | 6 832 |
| À 1366 × 800 : première situation, illustration | 380 ; 1 453 | 359 ; 843 |
| Largeur à 320 px | 320, aucun débordement | 320, aucun débordement |

- FORMAT2-MESURES sur la copie : 19 pages, 114 mesures, **0 erreur**, 8 signalements. Pour le lot B3 : l'illustration de
  la surchauffe, dans les deux polices. Les autres signalements concernent AdBlue, ABS-ESP (lot F2) et la batterie (lot
  B2).
- À 320 px, la première situation de la surchauffe finit à 761 px. La règle 2a se mesure à 375 px.
- Lighthouse mobile, 3 passages, médianes (`lighthouse.txt`) : les deux pages sont à 100 en performance, accessibilité et
  bonnes pratiques, CLS 0,000, LCP 905 et 902 ms. SEO 66 : construction en noindex, attendu.

## Captures (`captures/`, script `capturer.cjs`)

`<page>-<375|1366>-<chargee|secours>-<ecran|page|encadre|illustration|arbre|etapes|tableau>.png`. PNG sans perte,
échelle 2 (page entière : échelle 1). Une capture en police de secours identique octet pour octet à celle en police
chargée n'est pas gardée : 30 fichiers. Sur téléphone, le tableau du FAP garde ses trois colonnes, avec des cellules sur
plusieurs lignes.
