Brouillon, jamais validé. Captures de l'exemple « voiture ne démarre pas » (exemple du modèle panne de la vague B,
version 2 de `exemples/panne/voiture-ne-demarre-pas.md`, verdicts jamais validés), prises le 16/11/2026 avant et après la mise
en œuvre de la demande de changement n° 32 (page panne : l'arbre de décision avant les causes) dans la tâche F1.4 du lot F1.
Préparation anticipée de l'étape 10 (docs/03, règle 12, quatrième exception) : rien n'en est présenté, fusionné ni publié avant
la porte de l'étape en cours ; ces captures servent la recette de la porte 10.

Déplacées de la PR houssem-jeddou/decodauto#68 (porte F1) à la demande de la revue indépendante de la porte F1 : un brouillon de
l'étape 10 n'entre pas dans une PR vers `main`. La PR garde les captures des démonstrations panne et cite l'exemple par ses
chiffres.

Construction : l'exemple ajouté en local à la démonstration du format 2 (`tests/demo/format2/panne/`, avec l'illustration
`batterie-cosses`), jamais commité dans la branche de F1.4 ; deux pièces lui manquent dans `data/couts.json`
(`pile-de-cle`, `carburant-et-reamorcage`, à ajouter avec le lot). Script : `travaux/etape-13/f1/captures/demande-32/capturer.cjs`
(branche `etape-13/f1-porte`). Chromium, police du système Inter ; police chargée (feuille servie en font-display: block) et
police de secours (`/polices/` refusé) ; PNG sans perte.

Fichiers : `voiture-ne-demarre-pas-<avant|apres>-<375-page|1366-ecran|1366-arbre>-<chargee|secours>.png` ; mesures à 375 × 667
dans `mesures.json`.

| Mesure (375 × 667) | Avant | Après |
|---|---|---|
| Bas de l'encadré (6 lignes) | 1 983 | 1 983 |
| Illustration | 2 406 | 2 406 (au-delà de trois écrans : signalée par FORMAT2-MESURES, à dire dans le paquet) |
| Arbre de décision | 5 666 (5 692 en police de secours) | **3 560** (3 585), sous le seuil de six écrans |
| Causes | 3 158 | 5 350 |
