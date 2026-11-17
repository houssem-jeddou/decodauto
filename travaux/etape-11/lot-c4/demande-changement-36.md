# Demande de changement n° 36 : verdict d'une obligation légale (pneus usés, contrôle technique défavorable)

> **Proposée, à accepter par Houssem.** Rédigée le 17/11/2026 avec le lot C4 de la vague C (étape 11), sur décision du
> pilotage (règle 6), à partir du relevé des sources, §10 point 1, et de ce que les notices ajoutent (relevé, §13). Les
> deux pages du lot appliquent déjà, en brouillon, les niveaux proposés ici ; rien n'est validé avant l'acceptation.
> Reprend l'idée reportée « définition du verdict « Non, ne poursuivez pas votre trajet » pour une obligation légale »
> (paquet 6.6c, décision 1).

## Élément
La grille des verdicts (`src/schemas/grille.ts`, `PRINCIPES_GRILLE` et `GRILLE_VERDICTS` ; vue lisible `docs/08`, partie
générée par `npm run grille:vue` ; section « Méthode » de la page « à propos », qui reprend les principes). La grille
classe aujourd'hui des **consignes de notice** ; elle ne dit pas comment classer une **obligation légale** (arrêté,
code de la route, contrôle technique), que docs/01 admet pourtant comme citation qui fixe un niveau (« Légifrance,
textes du contrôle technique »). Un seul précédent : la loi montagne (code de la route D314-8, validée le 10/11/2026),
classée « Non, ne poursuivez pas votre trajet » par analogie, sans règle écrite.

## Changement proposé
Trois règles pour une citation d'un texte légal ou réglementaire, ajoutées à la grille :

1. **Un texte interdit de circuler dans l'état constaté** (le véhicule ne remplit plus une exigence « pendant toute son
   utilisation sur route », ou n'a plus de contrôle technique valable) : **« Non, ne poursuivez pas votre trajet »** ·
   **« À faire tout de suite »**. L'action n'est pas « faites-la contrôler » (définition actuelle du niveau) mais la mise
   en conformité : « faites remplacer » (pneus), « faites réparer, puis passez la contre-visite » (contrôle technique).
   Les sanctions du code de la route (contravention, immobilisation possible) se citent comme faits, sans changer le
   niveau.
2. **Un texte laisse un délai pour se mettre en conformité** (résultat défavorable pour défaillances majeures : contrôle
   valable deux mois, contre-visite dans ce délai) : **« Oui, avec précautions »** · **« À prévoir dans les semaines qui
   viennent »**.
3. **Un classement du contrôle technique** (défaillance mineure, majeure, critique de l'annexe I) **est un fait, pas un
   verdict** : il se cite dans la fiche « Le texte en bref » et dans le texte. Il ne fixe le niveau d'une ligne que par
   ce qu'il entraîne selon l'article 7 (validité de deux mois ou limitée au jour du contrôle), donc par les règles 1 et 2.

Le niveau d'une ligne reste celui de la citation la plus prudente (R3-PLUS-PRUDENT), notices et textes ensemble ; l'écart
entre une notice et le texte légal est signalé comme un écart entre marques.

## Application aux deux pages du lot (brouillon)

**Usure des pneus.** Arrêté du 18 juillet 2019, article 5 (relu à l'écran le 17/11 vers 1 h 50) : les pneus des voitures
particulières doivent avoir « dans les rainures principales de leur bande de roulement, une profondeur d'au moins
1,6 mm », « pendant toute leur utilisation sur route » → règle 1. Annexe I, 5.2.3 (relue le 17/11 vers 13 h 20) : e.2
« L'indicateur d'usure de la profondeur des sculptures est atteint » : majeure ; e.3 « La profondeur des sculptures n'est
pas conforme aux exigences » : critique → faits (règle 3). Code de la route, R314-1 (relu en entier le 17/11 vers
15 h 10) : sculptures apparentes sur toute la surface de roulement, aucune toile visible, aucune déchirure profonde sur
les flancs ; y contrevenir est puni de l'amende prévue pour les contraventions de la quatrième classe, immobilisation
possible → fait. L'article 5 de l'arrêté de 2019, relu en entier, limite aussi à 5 mm l'écart de profondeur entre deux
pneus d'un même essieu (fait, dit comme le texte le dit).

Ce que les notices ajoutent (relevé, §13, relu à l'écran le 17/11 vers 14 h 20), classé par la grille actuelle :

| Notice | Consigne | Niveau par la grille |
|---|---|---|
| Peugeot 208 p. 169 | « la profondeur des rainures est inférieure à 1,6 mm ; remplacer impérativement les pneumatiques » | Oui, avec précautions · tout de suite (« impérativement ») |
| Citroën C3 p. 115 | « il est impératif de remplacer les pneumatiques » | idem |
| Renault Clio 5 p. 346, Dacia Sandero 3 p. 307 | « il est alors nécessaire de remplacer vos pneumatiques car la profondeur des sculptures n'est, au plus, que de 1,6 mm et ceci entraîne une mauvaise adhérence sur les routes mouillées » | Oui, avec précautions · dans les jours qui viennent (action sans délai écrit) |
| Seat Ibiza p. 308 | « Les pneus doivent être changés au plus tard lorsque les indicateurs d'usure sont usés. […] il existe des risques d'accident ! » | « au plus tard », absent de la grille, et un risque d'accident annoncé si l'on roule : niveau le plus prudent qu'il peut signifier (principe 3) → Non, ne poursuivez pas votre trajet · tout de suite |

Ligne « Les témoins d'usure affleurent : les rainures n'ont plus que 1,6 mm ou moins » : **Non, ne poursuivez pas votre
trajet · À faire tout de suite** (arrêté de 2019 par la règle 1, et Seat), écart signalé : Peugeot et Citroën (remplacer
impérativement), Renault et Dacia (remplacer, sans délai écrit). Sans la règle 1, la ligne resterait à ce niveau par la
seule lecture de Seat (principe 3) ; si Houssem classe autrement la consigne Seat et refuse la règle 1, elle descendrait
à « Oui, avec précautions · À faire tout de suite » (Peugeot, Citroën).

**Contre-visite.** Arrêté du 18 juin 1991, article 7 (relu à l'écran le 17/11 vers 13 h 20) :
- défaillances majeures (S) : « la validité du contrôle est de deux mois à compter de la date du contrôle technique
  périodique » → règle 2 : **Oui, avec précautions · À prévoir dans les semaines qui viennent** (réparer, puis
  contre-visite dans les deux mois) ;
- défaillances critiques (R) : « la validité du contrôle est limitée au jour du contrôle » → règle 1, après le jour du
  contrôle : **Non, ne poursuivez pas votre trajet · À faire tout de suite** ;
- délai de deux mois dépassé : « faute de quoi un nouveau contrôle technique périodique est à réaliser » → règle 1 :
  **Non, ne poursuivez pas votre trajet · À faire tout de suite**.
- Code de la route, R323-1 (relu en entier le 17/11 vers 15 h 10) : « Tout propriétaire d'un véhicule mentionné au
  présent chapitre n'est autorisé à le mettre ou le maintenir en circulation qu'après un contrôle technique ayant vérifié
  qu'il est en bon état de marche et en état satisfaisant d'entretien. » → règle 1, cité aux lignes 2 et 3 avec
  l'article 7 ; la sanction (quatrième classe, immobilisation, fourrière possible) → fait.

## Raison
- Les deux pages sont des pages d'obligation : sans règle écrite, leur niveau dépendrait d'une analogie avec la loi
  montagne, que rien ne fixe ; une règle écrite rend le niveau vérifiable et identique d'une page à l'autre.
- Volume en jeu (plan du site, `docs/09`) : usure des pneus, 16 116 recherches par mois comptées ; contre-visite,
  14 852 ; ce sont les deux pages de la vague C qui portent une obligation légale.
- L'action actuelle du niveau « Non, ne poursuivez pas votre trajet » (« faites-la contrôler ») ne dit pas quoi faire
  quand le défaut est déjà constaté par un texte.

## Ce que le texte ne dit pas (et que la page ne dira pas)
- Aucun texte relu ne dit si l'on peut rouler jusqu'au garage le jour d'un résultat défavorable pour défaillances
  critiques, ni comment rejoindre un garage ensuite (relevé, §8) : la page ne l'affirme pas.
- Aucune limite d'âge légale des pneus : l'âge de 6 ans n'est cité que comme consigne de la notice Seat Ibiza.
- Le montant de l'amende forfaitaire de quatrième classe n'est relevé dans aucun texte : pas de montant affiché.
- R314-1, R323-1 et l'article 5 de l'arrêté de 2019 sont relus en entier (relevé, §15, 17/11 vers 15 h 10).

## Impact sur ce qui est validé
- `src/schemas/grille.ts` : trois règles ajoutées aux principes (ou un niveau de consignes « texte légal » par verdict),
  après l'acceptation, dans la pull request du lot ; `docs/08` (partie générée) et la section « Méthode » de la page
  « à propos » (publiée) se régénèrent : **la page « à propos » change**, sa date de mise à jour aussi ; elle passe
  avec le lot, validée par Houssem.
- Aucun verdict de la base voyants, aucune page publiée ne change de niveau. La loi montagne garde son niveau (elle
  correspond à la règle 1).
- **Recommandation** (règle 6) : accepter ; la règle 1 et la règle 2 sont celles que la loi montagne applique déjà, la
  règle 3 évite de prendre un classement de contrôle technique pour un verdict.

## Contrôles à relancer
`npm run schemas`, `npm test` (tests de la grille), `npm run grille:vue` et `npm run charte:vue` (parties générées de
`docs/08` et `docs/10`), `npm run build` (R3-PLUS-PRUDENT, R3-NIVEAU-SANS-SOURCE, METHODE-SECTION), la construction de
recette, `npm run liens`.
