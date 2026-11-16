Brouillon, jamais validé. Recette locale du lot B2 (vague B : « batterie de voiture » au modèle panne avec arbre de
décision, « recharger » et « changer » au format tutoriel), faite le 16/11/2026 sur la branche `etape-10/lot-b2` à
`09e0a98`, puis à `80b5c8d` (lignes d'écart courtes de la batterie gelée ajoutées par le pilotage pendant la recette ;
main intégré jusqu'à 797127c, seul le journal a changé depuis sur main). Rien n'en va dans une pull request
vers `main`.

## Résultat en bref

- **La construction de recette de la branche échoue** : deux brouillons ne passent pas le schéma, à cause d'extraits cités
  de plus de 400 caractères (limite de la courte citation). **Rien n'est corrigé** : ce sont des extraits, à reprendre
  par la rédaction.
  - `batterie-changer`, ligne 1 : `notice-renault-clio-5` et `notice-dacia-sandero-3`, 432 caractères chacun ;
  - `batterie-recharger`, ligne 1 : `notice-peugeot-208`, 408 caractères.
- **Ligne d'écart courte d'une ligne saisie : FORMAT2-ECART en erreur.** Cas de `batterie-voiture`, ligne 4 (« La batterie
  a gelé… »), et de `batterie-recharger`, ligne 3.
  - À 09e0a98, ces lignes avaient un `ecart_marques` sans `ecart_court` : la construction s'arrêtait.
  - À 80b5c8d, la ligne d'écart courte est là, mais FORMAT2-ECART échoue : une ligne saisie n'a pas de tableau des notices
    où mener « Votre marque », et la règle 2b exige ce renvoi.
  - **C'est une question de règle pour les lignes saisies qui ont un écart, à trancher.** Possibilités : ligne d'écart sans
    renvoi pour une ligne saisie, ou écart dit dans le texte. Je n'ai rien changé.
- **Exemples de la porte 10 sur la branche** (`voiture-ne-demarre-pas`, `moteur-puretech`) : leurs entrées du registre
  (cinq sources) et de `data/couts.json` (deux pièces, une prise en charge) ne sont pas sur la branche.
  Erreurs : R3-SOURCE-INCONNUE, COUT-PIECE-INCONNUE, COUT-PRISE-EN-CHARGE-INCONNUE, en plus de R4-VALIDATION-ABSENTE.
  Elles relèvent de la pull request de ces exemples, pas du lot B2.
- **Aucune erreur technique à corriger** dans les trois brouillons. Pas de paragraphe de plus de trois phrases.
  L'arbre (`batterie-voiture`) et les étapes (les deux tutoriels) sont dans la deuxième partie du texte, après une
  première partie d'un seul paragraphe (FORMAT2-ARBRE-PLACE). Sources et pièces sont connues. Les trois illustrations
  passent ILLUSTRATION-SVG.

## Ce qui a été mesuré : `batterie-voiture` seulement

Les deux tutoriels sont bloqués par le schéma. Construction dans une copie de travail séparée, jamais commitée :

- sans `batterie-recharger` ni `batterie-changer` ;
- sans les deux exemples de la porte 10 ;
- avec la base voyants du lot F2 (`etape-13/f2-donnees`, commit 7e1937b), pour la ligne d'écart courte de
  `batterie-rouge` (ligne 5) ;
- page à 80b5c8d, avec la ligne d'écart courte de la ligne 4 écrite par le pilotage.

Contrôle (`controle.txt`, point 4) : 26 × R4-EMPREINTE (lignes du lot F2, pas encore validées), R4-VALIDATION-ABSENTE
(`batterie-voiture`), et FORMAT2-ECART sur la ligne 4 (voir plus haut). Aucune autre erreur.

| Mesure (px, à 375 × 667 : police chargée / de secours) | `batterie-voiture` |
|---|---|
| Bas de la première situation (2a : 667 au plus) | 522 / 547 |
| Bas de l'encadré (5 lignes) | 1 905 / 1 930 |
| Haut du bloc « Notices / Base du coût » | 2 051 / 2 076 |
| Haut de l'illustration (2i) | 2 388 / 2 414 : au-delà de trois écrans (2 001), signalé, encadré de 5 lignes |
| Haut du sommaire | 2 682 / 2 707 |
| Haut de l'arbre de décision | 3 472 / 3 498 (seuil de six écrans : 4 002) |
| Haut des causes | 4 800 / 4 826 |
| Hauteur de la page | 10 738 / 10 789 |
| À 1366 × 800 : première situation, illustration, arbre | 335 ; 1 361 ; 2 261 |
| Largeur à 320 px | 320, aucun débordement (320, 375, 1366 px, deux polices) |

- FORMAT2-MESURES : 6 mesures, 0 erreur, 2 signalements (illustration). Détail : `mesures-format2.txt`, `mesures.json`.
- Lighthouse mobile, 3 passages, médianes (`lighthouse.txt`) : performance 100, accessibilité 100, bonnes pratiques
  100, CLS 0,000, LCP 904 ms. SEO 66 : construction en noindex, attendu.

## Captures (`captures/`, script `capturer.cjs`)

`batterie-voiture-<375|1366>-<chargee|secours>-<ecran|page|encadre|arbre|illustration>.png`. Chromium préinstallé,
police du système Inter ; police chargée : seconde visite, feuille en `font-display: block` ; police de secours :
`/polices/` refusé. PNG sans perte, échelle 2 (page entière : échelle 1). Une capture en police de secours identique
octet pour octet à celle en police chargée n'est pas gardée : 18 fichiers.

Les modèles de la branche sont ceux de `main`. Les deux corrections de la PR du lot F2 (houssem-jeddou/decodauto#71) n'y
sont pas encore : lien « Votre marque » sur une ligne, préposition du coût probable avec sa pastille. On le voit sur
l'encadré : « à » seul en fin de ligne dans le coût probable.
