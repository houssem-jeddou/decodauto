Brouillon, jamais validé. Recette locale du lot B3 (vague B) : « moteur qui surchauffe » (panne, arbre de décision) et « nettoyer le FAP » (tutoriel : étapes et tableau). Refaite le 16/11/2026 (nuit), après les
corrections de la revue indépendante, sur la branche `etape-10/lot-b3` à `78d78ef`. Remplace la recette précédente, périmée
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

- **Illustration au-delà de trois écrans** sur les deux pages : « moteur qui surchauffe » 2 448 px (encadré de 6 lignes), « nettoyer le FAP » 2 364 px (4 lignes) ; signalées (demande n° 32).
- **Étapes de « nettoyer le FAP » au-delà de six écrans** (4 002 px) : 4 102 px à 375 px. FORMAT2-MESURES le signale pour **décision de Houssem sur captures** (demande n° 32) : `captures/nettoyer-fap-375-chargee-page.png`.
- « Moteur qui surchauffe » : première situation à 641 px à 375 px, 26 px sous le seuil de 667 ; à 320 px (écran de 640), elle finit à 761 px. La règle se mesure à 375 px.
- Paire de liens nettoyer-fap ↔ voyant-moteur ajoutée au plan sur la branche : la ligne 2 de l'encadré y renvoie (« Votre marque » vers `/voyants/moteur/`), vérifié sur la construction. **À valider avec le lot.**

## Mesures (`mesures.json`, `mesures-format2.txt` ; police chargée / de secours quand elles diffèrent)

| | Moteur qui surchauffe | Nettoyer le FAP |
|---|---|---|
| Bas de la première situation, à 375 px | 641 | 580 |
| Bas de l'encadré, à 375 px | 1 884 (6 lignes) | 1 840 (4 lignes) |
| Haut de l'illustration, à 375 px | 2 448 | 2 364 |
| Arbre ou étapes, à 375 px | arbre à 3 624 | étapes à 4 102 |
| Hauteur de la page, à 375 px | 10 755 / 10 780 | 8 348 |
| Bas de la première situation, à 320 px | 761 | 645 |
| Bas de l'encadré, à 320 px | 2 195 (6 lignes) | 2 175 (4 lignes) |
| Haut de l'illustration, à 320 px | 2 855 | 2 795 |
| Arbre ou étapes, à 320 px | arbre à 4 117 | étapes à 4 646 / 4 671 |
| Hauteur de la page, à 320 px | 12 284 | 9 506 / 9 608 |
| À 1366 × 800 : première situation ; illustration ; arbre ou étapes | 380 ; 1 494 ; 2 463 | 359 ; 1 355 ; 2 771 |
| Largeur à 320 px | 320, aucun débordement | 320, aucun débordement |

Seuils à 375 × 667 : première situation 667 px (2a) ; trois écrans 2 001 px (illustration, 2i) ; six écrans 4 002 px (arbre ou
étapes, demande n° 32). À 320 px, l'écran est de 640 px de haut ; les règles se mesurent à 375 px.

Lighthouse mobile, 3 passages, médianes : Moteur qui surchauffe LCP 904 ms ; Nettoyer le FAP LCP 907 ms.

Captures : 34 fichiers.

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
