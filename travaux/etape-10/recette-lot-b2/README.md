Brouillon, jamais validé. Recette locale complète du lot B2 (vague B : « batterie de voiture » au modèle panne avec arbre
de décision, « recharger » et « changer » au format tutoriel avec étapes et tableau), refaite le 16/11/2026 sur la branche
`etape-10/lot-b2` à `a7f1349`. Extraits ramenés sous 400 caractères (8d476a6) ; construite avec la PR
houssem-jeddou/decodauto#73 à jour. Remplace la recette partielle précédente (une seule page mesurée). Rien n'en va dans
une pull request vers `main`. Verdicts et extraits ne sont pas touchés.

## Résultat en bref

- **Aucune erreur technique dans les trois brouillons. Rien n'a été corrigé.**
  - Schéma : OK pour les trois pages.
  - Aucun paragraphe de plus de trois phrases.
  - L'arbre et les étapes sont dans la deuxième partie du texte, après une première partie d'un seul paragraphe.
- **Contrôle de la copie de travail : seules les validations absentes restent.**
  - 26 × R4-EMPREINTE pour les lignes du lot F2 et 12 × R4-EMPREINTE pour ses pages ;
  - R4-VALIDATION-ABSENTE pour les trois brouillons.
  - Plus de FORMAT2-ECART : les lignes saisies à écart (`batterie-voiture` ligne 4, `batterie-recharger` ligne 3) mènent à
    leur phrase « Notices », avec l'écart entre marques en entier dessous.
- FORMAT2-MESURES : 17 pages, 102 mesures, **0 erreur**.
- Lighthouse : 100 / 100 / 100 sur les trois pages, CLS 0.

## Mesures (`mesures.json`, `mesures-format2.txt` ; à 375 × 667, police chargée / de secours)

| | Batterie de voiture | Recharger | Changer |
|---|---|---|---|
| Bas de la première situation (2a : 667 au plus) | 520 / 545 | 505 | 464 |
| Bas de l'encadré | 1 903 / 1 927 (5 lignes) | 1 270 (3 lignes) | 1 269 (4 lignes) |
| Haut du bloc « Notices / Base du coût » | 2 049 / 2 074 | 1 416 | 1 416 |
| Haut de l'illustration (2i) | **2 505 / 2 530, au-delà de trois écrans** (2 001), signalé : encadré de 5 lignes, puis bloc « Notices » avec l'écart de la ligne 4 | 1 719 | 1 640 |
| Haut du sommaire | 2 799 / 2 823 | 2 032 | 1 933 |
| Arbre / étapes | arbre à 3 589 / 3 614 (seuil de six écrans : 4 002) | étapes à 3 507 | étapes à 3 457 |
| Causes | 4 917 | 4 302 | 4 160 |
| Tableau (élément unique) | – | 5 096 | 4 957 |
| Hauteur de la page | 10 984 / 11 034 | 8 236 / 8 262 | 8 126 |
| À 1366 × 800 : première situation, illustration, arbre ou étapes | 335 ; 1 423 ; 2 323 | 353 ; 1 053 ; 2 471 | 295 ; 988 ; 2 431 |
| Largeur à 320 px | 320, aucun débordement | 320, aucun débordement | 320, aucun débordement |

À noter :

- **L'arbre de `batterie-voiture` s'approche du seuil de six écrans** : 3 589 px, à 413 px de 4 002. L'écart affiché sous
  la phrase « Notices » (#73) a fait descendre l'illustration et l'arbre d'environ 120 px. À 320 px, l'arbre est à 3 978.
- À 320 px, les étapes de « recharger » sont à 3 999 px. La règle se mesure à 375 px, où elles sont à 3 507.

Lighthouse mobile, 3 passages, médianes (`lighthouse.txt`) : les trois pages sont à 100 en performance, accessibilité et
bonnes pratiques, CLS 0,000, LCP d'environ 1 050 ms. SEO 66 : construction en noindex, attendu.

Captures : 51 fichiers.

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
