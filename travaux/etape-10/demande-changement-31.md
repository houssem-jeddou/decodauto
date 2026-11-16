# Demande de changement n° 31 : sources secondaires, une règle par usage pour toutes les pages éditoriales (charte §2.2, §2.6, méthode)

**Statut : acceptée par Houssem le 16/11/2026 (16 h 52) : « J'accepte la demande n° 31 (version 2) ». Version 2 du
16/11/2026, après la revue indépendante de la version 1 (une seule revue : consigne de Houssem du 16/11/2026).** Étape 10 (vague B), avant la rédaction des pages ; aucune page n'est rédigée ni publiée par cette demande.

**Ce qui change depuis la version 1** (revue du 16/11) : la règle n'est plus limitée aux causes des pages panne ; elle
vaut, par usage, pour toutes les pages éditoriales (la pratique en ligne et le dossier PureTech en avaient déjà besoin) ;
elle dit ce qu'une source secondaire ne fait jamais (geste conseillé compris), ce que fait une page quand aucune source
de première main ne décrit une situation, et quand un document décrit un risque plus grave que l'encadré ; la méthode
publiée et le registre suivent ; deux contrôles se renforcent. Correction du 16/11 (relecture partielle de la version 2) : la signification
d'un code défaut et ses cas par marque, admis depuis le livrable 6.6b, restent dans la liste des usages admis.

## Éléments concernés
- `docs/10_charte_editoriale.md` : §2.2, puce « Pages codes défaut : sources techniques secondaires » ; §2.6, phrase
  sur les sources techniques secondaires ;
- section « Méthode » de la page « à propos » (`src/lib/charte.ts`, empreinte de la charte validée le 04/11) : partie
  « Les codes défaut », et une partie nouvelle ;
- registre des sources (`data/sources.json`, schéma de `src/schemas/donnees.ts`, liste de `src/schemas/listes.ts`) :
  champ `nature` d'une source secondaire ; `docs/08` (registre) ;
- contrôles : COUT-RISQUE-SOURCE (`src/lib/controle.ts`), nouveau SOURCE-SECONDAIRE-NATURE ; R7-ARBRE-VERDICT étendu
  aux mots d'urgence et de vérification (déjà demandé dans la PR n° 63) ;
- consignes des briefs de la vague B (`travaux/etape-10/briefs/consignes.json`, branche `preparation/etape-10`) ; liste
  de recette de l'étape 9 ; journal.

## Changement proposé
Aujourd'hui, la charte n'admet de sources secondaires que pour les pages codes défaut (§2.2) ; tout le reste du web est
« autres sites » (§2.6), dont on ne reprend ni ne reformule les textes. La pratique va déjà au-delà : la page loi
montagne s'appuie sur deux réponses ministérielles, et le coût du dépannage sur autoroute sur une fiche de
Service-public.fr ; `docs/08` dit d'ailleurs qu'« une source secondaire peut être citée, jamais pour fixer un verdict ».
La vague B en a besoin pour les causes des pannes, les valeurs de référence de la batterie et le programme PureTech, et la
vague C en aura besoin pour les huiles et les liquides. La demande remplace la puce des codes défaut par **une seule
règle, par usage, valable pour toutes les pages éditoriales** :

1. **Usages admis**, la nature de la source inscrite au registre :
   - **causes, explication et vérifications d'atelier** d'un code, d'un symptôme ou d'un voyant, et **valeurs de
     référence** avec leurs conditions de mesure (par exemple la tension d'une batterie chargée, au repos) : documents
     techniques, c'est-à-dire bulletins et fiches techniques de constructeur, documents techniques d'équipementier
     (fabricant de batteries compris), documentation d'un éditeur d'outil de diagnostic (nature `document-technique`) ;
   - **programme d'un constructeur** (extension de garantie, prise en charge) : sa communication officielle (site de la
     marque, communiqué), datée et revérifiée (nature `communication-constructeur`) ; un rappel se cite d'après
     RappelConso, source de première main ;
   - **application d'un texte par l'administration** : réponses publiées des ministres aux questions des
     parlementaires, fiches de Service-public.fr (nature `administration`) ; elles ne contredisent jamais le texte, qui
     fait foi ;
   - les fourchettes de prix suivent le §2.3, inchangé.
2. **Exclus** : blogs commerciaux, pages écrites pour vendre un produit, un appareil ou un service (page de produit,
   catalogue, guide de produits comme un guide d'additifs), sites de conseils, forums, presse. Un document technique est
   écrit pour expliquer un fonctionnement, un défaut ou un contrôle, publié sous le nom de son auteur, et daté ou
   versionné quand c'est possible ; un éditeur d'outil de diagnostic vend son logiciel, sa documentation technique reste
   admise (précision validée avec la porte de l'étape 6).
3. **Jamais pour décider** : une source secondaire ne fixe ni un verdict, ni une urgence, ni une action conseillée au
   lecteur, ni le risque si l'on continue de l'encadré. Tout geste conseillé au lecteur vient d'une notice ou d'un texte
   de première main ; la page peut dire ce que veut dire une mesure, sans conseiller de la faire quand les notices lues
   réservent l'intervention à un professionnel (batterie : Renault, Dacia, Seat et Toyota). Sur une page panne, le coût
   probable se calcule, comme sur une page code, depuis les pièces des causes : une cause tirée d'un document technique
   peut donc entrer dans la plage calculée (§2.3) ; la tranche du risque, elle, ne cite que des sources de première main
   (contrôle renforcé, voir plus bas).
4. **La notice d'abord** : quand une notice lue ou un texte de première main traite le point, la page le cite ; la source
   secondaire le complète ; si elle le contredit, la page le dit, et la notice fait foi pour son véhicule (§2.4).
5. **Lien établi par le document** : une cause n'est citée que si le document la relie lui-même au symptôme, au code ou
   au voyant de la page, jamais par déduction.
6. **Contexte et prudence gardés** : la page nomme les modèles, moteurs, marché et date du document (§2.5), garde son
   degré de certitude (« peut être en cause » reste « peut »), signale une traduction (« traduit de l'anglais »), et dit
   qu'une liste de causes tirée de documents techniques n'est pas complète.
7. **Situation sans source de première main** : elle n'a pas de ligne dans l'encadré ; la page dit qu'aucune notice lue
   ne donne de consigne pour ce cas et conseille l'avis d'un professionnel (par exemple une fumée noire, si ni les
   notices ni les textes du contrôle technique ne la décrivent).
8. **Risque plus grave que l'encadré** : si un document secondaire décrit un risque plus grave que ce que dit l'encadré,
   la page le cite tel quel, avec son document, sans changer le verdict ; le point passe au paquet de validation, et
   Houssem décide s'il faut chercher une source de première main pour revoir la ligne. Rien n'est tu.
9. **Validation** : chaque fait tiré d'une source secondaire passe au paquet de validation avec sa source, et la revue
   indépendante le vérifie dans le document.

## Texte proposé pour la charte
À reprendre tel quel dans le projet, puis dans la copie `docs/` :

- §2.2, la puce « Pages codes défaut : sources techniques secondaires » est remplacée par :

  « **Sources secondaires : une règle par usage** (pages codes défaut validées avec le livrable 6.6b ; étendue à toutes
  les pages éditoriales par la demande de changement n° 31). Une source secondaire, inscrite au registre avec sa nature
  et citée sur la page, n'est admise que pour :
  - la signification d'un code défaut et ses cas par marque ; les causes d'un code, d'un symptôme ou d'un voyant,
    leur explication, les vérifications qu'un atelier fait et les valeurs de référence avec leurs conditions de mesure : documents techniques (bulletins et fiches techniques de
    constructeur, documents techniques d'équipementier, fabricant de batteries compris, documentation d'un éditeur
    d'outil de diagnostic) ;
  - un programme d'un constructeur (extension de garantie, prise en charge) : sa communication officielle, datée et
    revérifiée ;
  - l'application d'un texte par l'administration : réponses publiées des ministres, fiches de Service-public.fr, qui ne
    contredisent jamais le texte.

  Sont exclus les blogs commerciaux, les pages écrites pour vendre un produit, un appareil ou un service (catalogue,
  guide de produits), les sites de conseils, les forums et la presse. Un éditeur d'outil de diagnostic vend son
  logiciel : sa documentation technique reste admise (précisé avec la porte de l'étape 6).

  Une source secondaire ne fixe jamais un verdict, une urgence, une action conseillée au lecteur ni le risque de
  l'encadré : ils viennent de la base voyants (sur une page code défaut, par la ligne du voyant qui s'allume avec le
  code) ou d'une source de première main, comme tout geste conseillé. La notice ou
  le texte de première main est cité d'abord ; en cas de désaccord, la page le dit et la notice fait foi pour son
  véhicule. Une cause n'est citée que si le document la relie lui-même au symptôme, au code ou au voyant ; la page garde
  le contexte du document (§2.5) et son degré de certitude, signale une traduction, et dit qu'une liste de causes n'est
  pas complète. Une situation qu'aucune source de première main ne décrit n'a pas de ligne dans l'encadré : la page le
  dit et conseille l'avis d'un professionnel. Un risque plus grave décrit par un document secondaire est cité tel quel,
  sans changer le verdict, et passe au paquet de validation. »
- §2.6, la phrase sur les sources techniques secondaires devient : « Les sources secondaires admises par le §2.2 ne sont
  pas des « autres sites » : elles sont inscrites au registre, avec leur nature, et citées. »

## Méthode publiée (page « à propos »)
La règle 11 de `docs/03` veut que la méthode détaillée soit sur « à propos » ; sans ce changement, elle deviendrait
incomplète. Texte proposé (`src/lib/charte.ts`, nouvelle empreinte de la charte à valider par Houssem), à la place de la
partie « Les codes défaut » :

- **Les codes défaut et les pannes**
  - « Les notices d'utilisation lues pour le site ne donnent pas la signification des codes défaut, et rarement les
    causes d'une panne. La signification d'un code, les causes possibles d'un code ou d'un symptôme, les vérifications
    d'un atelier et les valeurs de référence viennent donc aussi de documents techniques, cités sur chaque page :
    bulletins et fiches techniques des constructeurs, documents des équipementiers, documentation des éditeurs d'outils
    de diagnostic. Un code propre à un constructeur (P1xxx) est expliqué marque par marque. »
  - « Les blogs commerciaux, les pages écrites pour vendre un produit, un appareil ou un service, les sites de conseils
    et les forums n'en font pas partie. Chaque document ne vaut que pour les modèles, les moteurs et le marché qu'il
    nomme : un cas décrit pour un autre marché (par exemple les États-Unis) est présenté avec ce marché, et n'est pas
    appliqué aux voitures vendues en France sans autre source. Une cause n'est citée que si le document la relie
    lui-même au symptôme ou au code, et la liste des causes d'une page n'est jamais complète. »
  - « Ces documents ne fixent jamais un verdict, une urgence ni un geste à faire : ceux de la page viennent des notices
    et des textes officiels, comme la consigne du voyant qui s'allume avec un code. Si un code est lu sans qu'aucun
    voyant soit allumé, ou si aucune notice lue ne donne de consigne pour un cas, la page le dit et vous conseille de
    demander l'avis d'un professionnel. »
- **Les autres documents cités** (partie nouvelle, après la précédente)
  - « D'autres documents complètent les textes officiels sans jamais les contredire : les réponses publiées des
    ministres aux questions des parlementaires, qui disent comment l'administration applique un texte, et les fiches de
    Service-public.fr. Pour un programme d'un constructeur, comme une extension de garantie, le site cite sa
    communication officielle, datée et revérifiée ; un rappel se cite d'après RappelConso. »

Mise en ligne : avec la première pull request qui republie « à propos » après l'acceptation (reprise d'« à propos » au
format 2, lot F3, ou premier lot de la vague B, la première des deux) ; la date « Mis à jour le » d'« à propos » change
alors pour une vraie modification (règle 14).

## Registre et contrôles
- **Champ `nature`** obligatoire pour une source de catégorie `secondaire` : `document-technique`,
  `communication-constructeur` ou `administration`. Les 22 sources secondaires du registre le reçoivent (19
  `document-technique` : Hella 4, Bosch 1, Ross-Tech 2, bulletins publiés par la NHTSA 12 ; 3 `administration` : deux
  réponses ministérielles, la fiche Service-public.fr). **Contrôle SOURCE-SECONDAIRE-NATURE** : une source secondaire
  sans nature admise fait échouer la construction (forum, presse ou blog ne peuvent donc pas entrer au registre).
- **COUT-RISQUE-SOURCE renforcé** : chaque citation du risque si l'on continue est de première main (aujourd'hui : au
  moins une). Vérifié le 16/11 : les deux pages en ligne qui en ont un (voyant moteur, voyant d'huile) ne citent que des
  notices ; rien ne change en ligne.
- **R7-ARBRE-VERDICT étendu** (corrections de la PR n° 63, en cours) : une réponse de l'arbre qui demande une
  vérification, une visite au garage ou qui donne une urgence cite le verdict d'une ligne de l'encadré.
- **Liste de recette** (ce qu'une machine ne vérifie pas) : chaque fait tiré d'une source secondaire figure au paquet
  avec sa source et a été vérifié dans le document par la revue ; la page garde le contexte, la certitude, la mention de
  traduction, et dit que la liste des causes n'est pas complète ; aucune urgence, aucun risque, aucun geste tiré d'une
  source secondaire, dans le texte comme dans l'arbre ; une situation sans source de première main n'a pas de ligne
  d'encadré.

## Raison (données)
Relevé `travaux/etape-10/textes/autres-pannes-releve.md` du 15/11 et vérification à l'écran
`autres-pannes-verification.md` du 16/11 (branche `preparation/etape-10`).

- **Ce que disent les notices lues pour la vague B** (Peugeot 208, Citroën C3, Seat Ibiza, Renault Clio 5, Dacia
  Sandero 3, Toyota Yaris ; lues de bout en bout le 16/11 pour « bruit », « cliquetis », « claquement », « sifflement »
  et « fumée ») : elles disent **quoi faire** devant un bruit anormal, des à-coups ou une perte de puissance (Toyota
  p. 291 : contacter dès que possible un réparateur ; Toyota p. 242 : bruit d'échappement qui change, faire vérifier
  immédiatement, risque de monoxyde de carbone ; Toyota p. 36 : odeur de gaz d'échappement, dès que possible ; Seat
  p. 289 ; Dacia p. 162 et Renault p. 188 : réparations au plus vite) et **ce qui est normal** (Seat p. 213 : bruit plus
  fort un court moment au démarrage à froid ; Toyota p. 335 : légers cliquetis très brefs à l'accélération ; Seat p. 290 :
  bruit pendant la régénération du filtre ; fumées blanches du filtre à particules, Renault p. 186, Dacia p. 160). Aucune
  ne donne les causes d'un claquement ou d'un sifflement, ni ne décrit une fumée noire ou bleue, ni la tension d'une
  batterie chargée. **À vérifier mot pour mot avant la rédaction** : Seat p. 283 parle d'« indice de cliquetis » à propos
  de la qualité de l'essence ; si la notice relie une essence d'indice trop faible au cliquetis, c'est une cause de
  première main, citée d'abord.
- **Ce qu'elles donnent déjà**, cité d'après la notice et non touché par cette demande : surchauffe (Renault p. 387,
  Dacia p. 349), fumée blanche (Renault p. 186 et 386, Dacia p. 348, Peugeot p. 168, Citroën p. 115), à-coups et perte
  de puissance des moteurs essence (Dacia p. 162, Renault p. 188 ; Seat p. 283 et 289).
- **Pages concernées** (volumes de `docs/05` comptés dans les totaux, recalculés le 16/11 depuis le plan ; moyennes
  géométriques, pour comparer, pas pour prévoir un trafic, `docs/02`) :

  | Page | Volume | Ce qui dépend de cette demande |
  |---|---|---|
  | `moteur-puretech` (dossier) | 103 016 | les conditions du programme de prise en charge (communication de Peugeot et de Stellantis) |
  | `voiture-ne-demarre-pas` | 38 868 | les causes côté démarreur (documents d'équipementier) |
  | `batterie-voiture` | 15 168 | les valeurs de tension d'une batterie, avec leurs conditions |
  | `fumee-echappement` | 13 904 | les causes d'une fumée noire (3 160 ; aucune requête du périmètre ne parle de fumée bleue) |
  | `bruit-moteur` | 13 272 | les causes d'un claquement ou d'un sifflement ; sans elles, la page dit quoi faire et ce qui est normal |
  | `voiture-qui-broute` | 9 164 | les causes sur un diesel (632) et le détail des vérifications |
  | `perte-de-puissance` | 7 268 | les causes sur un diesel (1 264), hors codes P0087 et P0299 (pages liées) |

- **Pratique déjà en ligne** : trois pages codes défaut (19 documents techniques au registre) ; la page loi montagne
  (deux réponses ministérielles) ; le coût du dépannage sur autoroute (Service-public.fr). La règle écrite les couvrira.
- **Documents repérés** (16/11, recherche web ; aucun n'est inscrit au registre ; chacun le sera avec la page qui le
  cite, après lecture entière) : brochure MAHLE sur les dommages des turbocompresseurs (en français, 2024 : surtout des
  dommages vus sur pièces démontées ; p. 10, fumée bleue : inclure le turbo dans l'analyse des causes, ce qui n'en fait
  pas la cause) ; fiches Hella « Info Technique » sur la bougie de préchauffage (15/12/2002) et sur le relais de
  préchauffage, « Info Véhicule » sur une fumée noire de BMW à moteur M51 (04/01/2005, voitures des années 1990 : utile
  seulement pour ces modèles, §2.5) ; brochure Schaeffler (INA) sur la distribution, non vérifiée. Écartés : le guide
  des additifs d'un fabricant de lubrifiants (rangé sous « produits »), les blogs de vendeurs de pièces ou de réseaux de
  garages, les sites de conseils et les forums.
- **Source de première main à lire d'abord** : l'instruction technique du contrôle technique sur les nuisances
  (opacité des fumées des diesels) ; elle ne donne pas de verdict de conduite, mais dit ce que le contrôle technique
  retient.

## Autres options écartées
- Garder la règle actuelle : les pages bruit (13 272) et la fumée noire (3 160) restent sans causes, pages minces qui
  n'aident pas le lecteur et ne se positionnent pas ; la pratique en ligne reste hors de la règle écrite.
- Limiter la règle aux pages panne (version 1) : le dossier PureTech (103 016) et la vague C resteraient hors règle.
- N'admettre que les bulletins de constructeur : rares pour ces symptômes, et ceux qui sont publiés (NHTSA) visent
  surtout des voitures vendues aux États-Unis (§2.5).
- Écrire des causes sans source : interdit (§2.2, « Pas de source : on ne l'écrit pas »).
- Retirer ces requêtes du périmètre : contraire à l'objectif, et `docs/02` est figé.

## Risques et parades
- Un équipementier vend des pièces : seuls ses documents techniques sont admis, chaque cause passe au paquet avec sa
  source, et la revue indépendante la vérifie dans le document.
- Lister une cause parce qu'un document existe (biais de disponibilité) : la page dit que la liste n'est pas complète,
  et ne range jamais les causes par fréquence sans donnée sourcée (R6).
- Transposer une cause d'un moteur, d'un marché ou d'une époque à l'autre : interdit par le §2.5 ; la page nomme les
  modèles, les moteurs, le marché et la date du document.
- Traduire mal un terme (« knock » : cliquetis ou claquement) : mention « traduit de l'anglais », terme d'origine
  donné quand il compte.
- Confondre cause et verdict : le verdict reste celui de l'encadré (R3), le risque ne cite que des sources de première
  main (COUT-RISQUE-SOURCE renforcé), l'arbre cite les verdicts de l'encadré (R7-ARBRE-VERDICT étendu), et le texte ne
  le contredit jamais (§2.1).

## Impact sur ce qui est validé
Aucun verdict, aucune ligne de la base, aucune page en ligne ne change avant la republication d'« à propos » ; la charte
(§2.2, §2.6) ; la méthode publiée (nouvelle empreinte de la charte) ; le registre (champ `nature`, 22 sources) et
`docs/08` ; deux contrôles ; les consignes de sept briefs de la vague B (`moteur-puretech`, `voiture-ne-demarre-pas`,
`batterie-voiture`, `fumee-echappement`, `bruit-moteur`, `voiture-qui-broute`, `perte-de-puissance`).

## Contrôles à relancer
`npm run schemas`, `npm test`, `npm run build` et `npm run liens` après l'ajout du champ `nature` et des deux contrôles
(pull request technique) ; `node travaux/etape-10/generer-briefs.ts` après la mise à jour des consignes (les briefs de
la vague B n'ont pas de test) ; METHODE-SECTION avec la nouvelle empreinte de la charte, dans la pull request qui
republie « à propos » ; liste de recette de l'étape 9 complétée.

## Ce que fait Houssem
Accepter ou non, et valider le texte de la charte et celui de la méthode. Après son accord, Claude met à jour la charte
(projet, puis copie `docs/` par pull request), fait faire le champ `nature` et les contrôles (Claude Code), met à jour
les consignes des briefs et le journal ; la méthode passe en ligne avec la première republication d'« à propos ».

**Ligne de validation proposée** : « J'accepte la demande n° 31 (version 2) : règle des sources secondaires par usage
pour toutes les pages éditoriales, texte de la charte et section « Méthode » tels que proposés. »
