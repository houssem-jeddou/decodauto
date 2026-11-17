# Relevé : surchauffe, fumée, FAP, perte de puissance, à-coups, bruit (vague B, préparation anticipée), 15/11/2026

Relevé de travail, jamais publié. Préparation anticipée de l'étape 10 (docs/03, règle 12, quatrième exception, demande de changement n° 21) : rien n'en est présenté, fusionné ni publié avant la fermeture de la porte de l'étape 8.

Pages servies : `surchauffe-moteur`, `fumee-echappement`, `nettoyer-fap` (tutoriel), `perte-de-puissance`, `voiture-qui-broute`, `bruit-moteur`.

**Méthode et limite.** Comme `demarrage-batterie-releve.md` : outil de lecture web, extraits et pages à relire mot pour mot à l'écran avant tout paquet. Les lignes de la base voyants citées ici sont, elles, déjà validées (étape 5 et demandes de changement) : leurs citations sont dans `data/voyants.json`.

## Ce que la base voyants couvre déjà (lignes validées, reprises par `- voyant: <id>`)

| Page | Lignes de la base utilisables | Remarque |
|---|---|---|
| `surchauffe-moteur` | `temperature-rouge` (rattachée à cette page : son tableau des notices y sera l'élément propre au voyant) | Peugeot p. 13, Seat p. 89, Renault p. 139, Dacia p. 111, Toyota p. 292 et 322-323 : arrêt immédiat |
| `nettoyer-fap` | `fap` | régénération en roulant (Peugeot p. 14-15, Seat p. 288-290, Renault p. 186, Dacia p. 160) ; écart Seat (pas de délai) |
| `perte-de-puissance`, `voiture-qui-broute` | `moteur-orange-fixe`, `moteur-orange-clignotant`, `moteur-rouge` | la ligne `moteur-orange-clignotant` décrit des « ratés de combustion » qui « peuvent abîmer le catalyseur » (situation de la base) : c'est le cas « la voiture broute et le voyant moteur clignote » ; arrêt immédiat, écart Seat, Renault et Dacia |
| `bruit-moteur` | `huile-pression-rouge`, `huile-niveau` | bruit avec voyant d'huile : la ligne de la base décide |
| `fumee-echappement` | `fap` (fumée blanche d'un diesel pendant la régénération, selon Renault ci-dessous) | |

## Renault Clio 5 phase 2 (notice réf. 1457-3), tableau « Anomalies de fonctionnement », « Sur route » (p. 386-387)

Lu par l'outil de lecture web (rendu en anglais pour une partie des lignes : **texte français exact à relire**).
- p. 386, « Fumée blanche à l'échappement. » : version Diesel, « ceci n'est pas obligatoirement une anomalie, la fumée peut provenir » de la régénération du filtre à particules ; version essence, « ceci n'est pas obligatoirement une anomalie » (forte accélération par temps froid ou humide, selon le rendu) ; que faire : « Réduisez le régime moteur et évitez les accélérations brutales. », puis consulter un représentant de la marque si cela persiste (à relire).
- p. 386, « Fumée sous capot moteur. » → « Court-circuit ou fuite du circuit de refroidissement. » → « Arrêtez-vous, coupez le contact, éloignez-vous du véhicule et faites appel à un Représentant de la marque. »
- p. 386, témoin de pression d'huile allumé en virage ou au freinage → niveau trop bas → ajouter de l'huile (p. 332) ; témoin lent à s'éteindre ou allumé à l'accélération → manque de pression → s'arrêter et faire appel (à relire).
- p. 386, « Vibrations » → pneus sous-gonflés, mal équilibrés ou endommagés → contrôler la pression, sinon faire contrôler les pneus (à relire).
- p. 387, « Le moteur chauffe. » (indicateur dans la zone d'alerte, témoin allumé) → « Panne du motoventilateur. » → « Stoppez le véhicule, arrêtez le moteur et faites appel à un Représentant de la marque. »
- p. 387, fuites de liquide de refroidissement → « Vérifiez le bocal de liquide de refroidissement : il doit contenir du liquide. » ; s'il est vide, consulter au plus tôt (à relire).
- p. 387, « Bouillonnement dans le bocal de liquide de refroidissement. » → « Panne mécanique : joint de culasse détérioré. » → « Arrêtez le moteur. Faites appel à un Représentant de la marque. »
- Le tableau n'a **aucune ligne** sur la perte de puissance, les à-coups, le moteur qui cale, les bruits, la fumée bleue ou noire.

## Seat Ibiza (notice édition 11/20), système de refroidissement (p. 297-298)

- p. 298, ATTENTION : « Si vous manquez de liquide de refroidissement dans le vase d'expansion, garez la voiture dans un endroit sûr et arrêtez-vous. » (fin à relire)
- p. 298, AVERTISSEMENT : « N'ouvrez jamais le bouchon du vase d'expansion du liquide de refroidissement tant que le moteur est chaud. » ; « Le système de refroidissement est sous pression ! »
- p. 298 : « Faites l'appoint de liquide de refroidissement uniquement s'il en reste encore dans le vase d'expansion, sinon vous pourriez endommager le moteur. »

## Ce qui manque (à traiter dans les briefs de la vague B)

1. **Perte de puissance, à-coups (« broute »), bruit moteur, fumée noire ou bleue** : aucune notice lue ne les décrit en dehors des voyants. Ces pages reposeront sur les lignes du voyant moteur et du voyant d'huile de la base ; leurs **causes** n'ont pas de source de première main. Point à décider avec le modèle panne : admettre, comme pour les codes défaut (charte §2.2, validé avec le livrable 6.6b), des sources techniques secondaires (documents d'équipementier, bulletins de constructeur) pour les causes des pages panne, jamais pour un verdict. Sans cette précision de la charte, ces pages n'auraient presque pas de causes.
2. **`nettoyer-fap`** : les recherches portent sur le nettoyage (« professionnel », « sans démontage », « hydrogène », « au karcher »). Les notices ne décrivent que la régénération en roulant (ligne `fap`) et, chez Peugeot et Citroën, l'additif. Le tutoriel ne peut décrire que ce que les notices décrivent ; les autres méthodes, sans source admise, ne sont ni recommandées ni décrites : la page le dit.
3. **Notices à lire dans le navigateur** : Dacia (même tableau que Renault, probablement), Toyota (rubriques « Si votre véhicule surchauffe », déjà citée par la base, et dépannage), Peugeot et Citroën (rubrique filtre à particules et additif, au-delà des témoins).
