# Demande de changement n° 36 : verdict d'une obligation légale (contrôle technique, pneus)

> **Brouillon, jamais validé. Proposée, à accepter par Houssem.** Rédigée le 17/11/2026 avec le lot C4 de la vague C
> (étape 11), réécrite après la revue indépendante du lot C4 (constats B1 et I2) sur décision du pilotage (règle 6). Les
> deux pages du lot appliquent déjà, en brouillon, les niveaux proposés ici ; rien n'est validé avant l'acceptation.
> Reprend l'idée reportée « définition du verdict « Non, ne poursuivez pas votre trajet » pour une obligation légale »
> (paquet 6.6c, décision 1). **Cette version n'a pas été relue par un relecteur indépendant.**

## Élément
La grille des verdicts (`src/schemas/grille.ts`, `PRINCIPES_GRILLE`) et sa vue lisible (`docs/08`, partie générée par
`npm run grille:vue`). La grille classe aujourd'hui des **consignes de notice** ; elle ne dit pas comment classer une
**obligation légale** du contrôle technique ou des pneus, que docs/01 admet pourtant comme citation qui fixe un niveau
(« Légifrance, textes du contrôle technique »).

## Changement proposé
Trois règles pour une citation de l'arrêté du 18 juin 1991 (contrôle technique), du code de la route ou de l'arrêté du
18 juillet 2019 (pneus) :

1. **La gravité fixée par l'arrêté du 18 juin 1991 (article 7) donne le niveau** :
   - défaillance **mineure** (« aucune incidence notable sur la sécurité du véhicule ou sur l'environnement ») →
     **« Oui, vous pouvez rouler »** ;
   - défaillance **majeure** (« susceptibles de compromettre la sécurité du véhicule, d'avoir une incidence négative sur
     l'environnement, ou de mettre en danger les autres usagers de la route ») → **« Non, ne poursuivez pas votre
     trajet »** · **« À faire tout de suite »** ;
   - défaillance **critique** (« un danger direct et immédiat pour la sécurité routière ou ayant une incidence grave sur
     l'environnement ») → **« Non, arrêtez-vous immédiatement »** · **« À faire tout de suite »**.
2. **Un délai légal** (validité du contrôle de deux mois, délai de la contre-visite) **n'est jamais une autorisation de
   rouler** : il ne rend jamais une ligne moins prudente que la gravité du défaut (règle 1) ni que sa consigne propre
   (ligne de la base pour un voyant, consigne d'une notice).
3. **Plus de contrôle valable** (délai de deux mois dépassé sans contre-visite) : code de la route, article R323-1
   (« Tout propriétaire d'un véhicule mentionné au présent chapitre n'est autorisé à le mettre ou le maintenir en
   circulation qu'après un contrôle technique ayant vérifié qu'il est en bon état de marche et en état satisfaisant
   d'entretien. ») → **« Non, ne poursuivez pas votre trajet »** · **« À faire tout de suite »**.

Le niveau d'une ligne reste celui de la citation la plus prudente (R3-PLUS-PRUDENT), notices et textes ensemble ; l'écart
entre une notice et le texte est signalé comme un écart entre marques. Les sanctions (contravention, immobilisation,
fourrière) se citent comme faits, sans changer le niveau.

## Champ
- **Contrôle technique et pneus** seulement.
- **La loi montagne n'est pas concernée** : son obligation (code de la route, D314-8) est un équipement exigé dans une
  zone et une période, non une gravité de défaillance ni une validité de contrôle ; ses lignes, validées le 10/11/2026
  (« Non, ne poursuivez pas votre trajet » sans équipement dans la zone), restent telles quelles et ne sont pas
  reclassées par ces règles.

## Ce qui ne change pas
- **La définition affichée des verdicts** (`GRILLE_VERDICTS`) et **la section « Méthode » de la page « à propos »**
  (`src/lib/charte.ts`) ne changent pas : la section « Méthode » ne reprend pas `PRINCIPES_GRILLE` (elle cite la grille
  des verdicts et des urgences). Les actions sont propres aux pages : « faites réparer, puis passez la contre-visite »,
  « faites remplacer les pneus ». La version précédente de cette demande disait à tort que la page « à propos » changeait.
- Aucun verdict de la base voyants, aucune page publiée ne change de niveau.

## Mise en œuvre (tranchée)
Les trois règles s'ajoutent aux principes de la grille (`PRINCIPES_GRILLE`, une entrée « Obligation légale (contrôle
technique, pneus) ») et donc à la vue de `docs/08` régénérée par `npm run grille:vue`, dans la pull request du lot, après
l'acceptation. Elles ne sont pas écrites dans ce lot tant que la demande n'est pas acceptée.

## Alternative (non retenue)
Défaillance **majeure** → « Oui, avec précautions », avec renvoi à la consigne propre du défaut (ligne de la base, notice).
Non retenue : l'article 7 définit la défaillance majeure comme susceptible de compromettre la sécurité ou de mettre en
danger les autres usagers ; la laisser à « Oui » ferait du délai de deux mois une autorisation de rouler (contraire à la
règle 2).

## Application aux deux pages du lot (brouillon)

**Contre-visite** (articles 7 et 8 relus à l'écran le 17/11 vers 13 h 15 ; R323-1 vers 13 h 50) :
| Ligne | Niveau | Règle |
|---|---|---|
| Résultat défavorable pour défaillances majeures (S) | Non, ne poursuivez pas votre trajet · tout de suite | règle 1 (majeure) ; règle 2 : les deux mois servent à réparer et repasser, pas à rouler avec le défaut |
| Résultat défavorable pour défaillances critiques (R) | Non, arrêtez-vous immédiatement · tout de suite | règle 1 (critique) |
| Deux mois passés sans contre-visite | Non, ne poursuivez pas votre trajet · tout de suite | règle 3 (R323-1) |

**Usure des pneus** (annexe I, 5.2.3, relue vers 13 h 15 ; article 5 de l'arrêté de 2019, relu vers 13 h 50) :
- e.2 « L'indicateur d'usure de la profondeur des sculptures est atteint » : **majeure** → règle 1 : « Non, ne poursuivez
  pas votre trajet » ; e.3 « La profondeur des sculptures n'est pas conforme aux exigences » : critique ; e.1 « Usure
  anormale » : mineure.
- L'article 5 exige au moins 1,6 mm et fait signaler 1,6 mm par l'indicateur « avec une tolérance de + 0,6/- 0 mm » : à
  l'indicateur, l'exigence légale peut encore être remplie. Ce n'est donc pas l'article 5 qui fixe le niveau de la ligne
  « témoins d'usure atteints », mais le classement du contrôle technique (règle 1, majeure) et les notices.
- Notices (relues vers 12 h 55) : Peugeot 208 p. 169 et Citroën C3 p. 115 (« remplacer impérativement », « il est
  impératif de remplacer ») → Oui, avec précautions · tout de suite ; Renault Clio 5 p. 346 et Dacia Sandero 3 p. 307
  (« il est alors nécessaire de remplacer ») → Oui, avec précautions · dans les jours qui viennent ; Seat Ibiza p. 308
  (« Les pneus doivent être changés au plus tard lorsque les indicateurs d'usure sont usés. S'il n'est pas fermé, il
  existe des risques d'accident ! », sic) → « au plus tard », absent de la grille, et un risque d'accident annoncé :
  Non, ne poursuivez pas votre trajet (principe 3).
- R314-1 (sculptures apparentes, aucune toile, aucune déchirure profonde ; contravention de la quatrième classe,
  immobilisation possible) : fait.

## Raison
- Les deux pages portent une obligation : sans règle écrite, leur niveau dépendrait d'une analogie que rien ne fixe ; la
  règle 1 suit la définition que donne le texte lui-même de chaque gravité.
- Volume en jeu (plan du site) : usure des pneus, 16 116 recherches par mois comptées ; contre-visite, 14 852.
- Un délai de contre-visite lu comme une autorisation de rouler serait l'erreur la plus grave possible sur ces pages
  (règle 2).

## Ce que les textes ne disent pas (et que les pages ne disent pas)
- Comment rejoindre un garage après un résultat défavorable : aucun texte relu ne le dit.
- Aucune limite d'âge légale des pneus (« 6 ans » : consigne Seat seulement).
- Aucun montant d'amende relevé.

## Impact sur ce qui est validé
`src/schemas/grille.ts` (`PRINCIPES_GRILLE`) et `docs/08` (partie générée) après l'acceptation ; ni la page « à propos »,
ni la définition des verdicts, ni la base voyants, ni la loi montagne.

## Contrôles à relancer
`npm run schemas`, `npm test`, `npm run grille:vue`, `npm run build` (R3-PLUS-PRUDENT, R3-NIVEAU-SANS-SOURCE), la
construction de recette, `npm run liens`.
