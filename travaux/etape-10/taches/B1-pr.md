# Tâche : pull request du lot B1 de la vague B (exemples validés « voiture ne démarre pas » et « moteur PureTech »)

Brief du chat de pilotage (16/11/2026). **Après la fusion de la PR du lot F2** (la base y porte les lignes d'écart
courtes dont les deux encadrés dépendent). Branche `etape-10/lot-b1` depuis `main` ; mêmes règles que les tâches F1
(`CLAUDE.md`, identité « noreply », jamais sur `main`, jamais de push forcé ni de réécriture d'historique).

## 1. Ce que la pull request contient
- Les deux pages validées par Houssem le 16/11/2026 à 19 h 26 (porte 10 ; ligne de validation au journal, PR n° 72) :
  `exemples/panne/voiture-ne-demarre-pas.md` et `exemples/dossier/moteur-puretech.md` de `preparation/etape-10`
  (tête b9b0835 ou suivante), **sans changer un mot de leur encadré** ; les illustrations `src/illustrations/batterie-cosses.svg`
  et `jauge-huile.svg` ; le générateur `travaux/etape-10/generer-illustrations.py`.
- Registre (`data/sources.json`), les cinq sources de l'exemple PureTech, adresses et descriptions relues à l'écran
  (`travaux/etape-10/textes/puretech-verification.md`) :
  - `rappelconso-48835`, `rappelconso-48836`, `rappelconso-48204` : catégorie `rappelconso`, éditeur « RappelConso
    (DGCCRF) », adresses `https://rappel.conso.gouv.fr/fiche-rappel/<n°>/Rapex`, titre avec le numéro de la fiche
    (A12/01504/20, A12/01505/20, A11/00077/23) et sa date ;
  - `peugeot-puretech-solutions` : catégorie `secondaire`, nature `communication-constructeur` (demande n° 31),
    `https://www.peugeot.fr/entretien-et-services/moteurs-puretech-solutions.html` ;
  - `stellantis-puretech-indemnisation-2025` : catégorie `secondaire`, nature `communication-constructeur`, l'adresse du
    communiqué belge relevée (une version France sera cherchée à la revue suivante, paquet de la porte 10, point 7) ;
  - date de consultation : 2026-11-16.
- Coûts (`data/couts.json`) : les entrées **telles qu'elles étaient dans ta recette de la porte 10**, puisque ce sont
  celles que Houssem a vues et validées avec « leurs coûts » : pièces `pile-de-cle` et `carburant-et-reamorcage`
  (tranche `geste`), prise en charge `couverture-speciale-puretech` (texte affiché sur la capture, source
  `peugeot-puretech-solutions`, vérifiée le 2026-11-16, à revérifier tous les 90 jours).
- `config/vagues-ouvertes.json` : ajout de la vague B (`["A", "B"]`). **À valider par Houssem avec la PR** (règle des
  vagues ouvertes) : le paquet le dit en tête.
- Empreintes (validation donnée le 16/11 à 19 h 26) : `npm run empreinte -- <page>` sur les deux pages et
  `npm run empreinte -- --montant couverture-speciale-puretech`, sur la base du lot F2 fusionnée ; copiées dans les
  fichiers. Si une empreinte ne correspond pas à ce qui a été validé (texte changé depuis), arrête-toi et dis-le-moi.
- Passage : `npm run passage -- voiture-ne-demarre-pas --appliquer` puis `moteur-puretech` (vague B ouverte dans la
  même PR) ; adresses ajoutées à la liste Lighthouse de production.

## 2. Preuves
- Contrôles complets verts (`schemas`, `test`, `build`, `liens`), CI verte.
- Construction de production : seules les deux pages, le plan du site et l'accueil (liste des pages) changent.
- Captures des deux pages en production construite (375 × 667 et 1366 × 800, deux polices), mesures FORMAT2-MESURES,
  Lighthouse mobile ; comparaison avec la recette de la porte 10 (mêmes encadrés, corrections des lignes 4 et 5 et de
  la carte « Même motif » visibles).
- Liste de recette de l'étape 9 (docs/03) repassée pour les deux pages.

## 3. Ce que tu me rends
Description de la PR avec chaque preuve. La revue indépendante est lancée par le chat ; la fusion se fait après la
validation de Houssem (ouverture de la vague B) et le relevé Search Console.
