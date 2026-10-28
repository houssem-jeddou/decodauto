# Demande de changement n° 6 : échelle du coût probable (étape 6, livrable 6.1)

Proposée le 28/10/2026, après la recherche des sources (`travaux/etape-6/cout-probable/recherche-sources.md`). Première revue indépendante : « à corriger », rien de bloquant ; ses corrections sont intégrées. **Rien n'est appliqué avant l'accord de Houssem.**

## Élément concerné
Structure des contenus, champ `cout_probable` des pages éditoriales, et ce qui en dépend :
- schémas : `src/schemas/pages.ts` (`coutProbableSchema`, `causesSchema`) ; une grille des coûts à créer (`src/schemas/cout.ts`) ;
- calcul et contrôles : `src/lib/calcul.ts` (plage calculée), `src/lib/controle.ts` (encadré, R9) ;
- empreinte : `src/lib/empreinte.ts` et `scripts/empreinte.ts` ;
- outils et tests : `scripts/generer-fixtures.ts`, `scripts/vue-grille.ts`, `tests/controle.test.ts`, pages de test ;
- registre des sources : `data/sources.json` ;
- documents : `docs/08_structure_contenus.md` (§1, §2 et une section générée), `CONTROLES.md`, `CLAUDE.md` (ligne « Jamais de prix d'enseigne… ») ;
- selon la décision 2 : la règle 5 de `01_cadrage_objectif_positionnement.md`.

Le cadre vient de la décision du 22/10 (04) : « échelle fermée en ordres de grandeur, avec une base de calcul sourcée, sans prix d'enseigne ni de prestation ; tranches fixées à l'étape 6 ». 08 §1 ajoute : « Les tranches, et le niveau où le coût est porté (situation ou cause), seront fixés à l'étape 6. »

## Changement proposé

### 1. Une échelle fermée de 5 tranches : la nature de la dépense
La tranche dit **ce qu'il faudra faire et payer**, sans montant en euros. Les tranches sont classées par **lourdeur habituelle de l'intervention**. Ce classement est une convention, pas un montant : un entretien (courroie de distribution, quatre pneus) peut coûter plus qu'une petite réparation. La définition affichée au lecteur le dit.

| Tranche | Libellé affiché | Définition affichée au lecteur | Consigne de notice qui y mène | Citations de la base validée (voyant, source, emplacement) |
|---|---|---|---|---|
| `aucun` | Aucun frais | Fonctionnement normal ou simple information : rien à réparer | La notice décrit un fonctionnement normal | `prechauffage` : Renault Clio 5 p. 139, Seat Ibiza p. 289 ; `frein-stationnement` : Seat Ibiza p. 251, Toyota Yaris p. 118 |
| `geste` | Geste à faire vous-même | Regonfler, faire un appoint, rouler pour régénérer le filtre à particules : gratuit, ou le prix d'un produit (huile, AdBlue) | La notice demande une action au conducteur | `huile-niveau` : Seat Ibiza p. 294, Toyota Yaris p. 299 ; `adblue-reserve` : Peugeot 208 p. 15 (« Faire un appoint en AdBlue ») ; `fap` : Seat Ibiza p. 288-290 |
| `entretien` | Entretien ou équipement courant | Une révision, une pièce d'usure ou un équipement prévu (liste au point 2). Peut coûter plus qu'une petite réparation | La notice renvoie à une révision ou à l'entretien périodique | `entretien-vidange` : Peugeot 208 p. 19-20, Renault Clio 5 p. 122, Toyota Yaris p. 300 |
| `reparation` | Réparation au garage | Une pièce défaillante à diagnostiquer puis à réparer ou remplacer, hors organe principal (liste au point 2) | La notice demande de faire vérifier ou réparer par un atelier | `abs` : Peugeot 208 p. 17, Renault Clio 5 p. 138, Toyota Yaris p. 293 |
| `organe` | Grosse réparation | Le remplacement ou la remise en état d'un organe ou d'un système lourd (liste au point 2) | La notice annonce un dégât grave sur un organe si l'on continue | `moteur-orange-clignotant` : Peugeot 208 p. 15 (« Risque de destruction du catalyseur »), Seat Ibiza p. 288 ; `moteur-rouge` : Renault Clio 5 p. 125 (« Risque casse moteur ») |

- Chaque tranche s'appuie sur au moins deux groupes de constructeurs (contrôlé, point 8).
- Les citations sont reprises de la base voyants par référence, jamais recopiées. Quand voyant, source et emplacement ne suffisent pas à désigner une citation (3 cas dans la base, dont `adblue-reserve` chez Renault et Dacia), la référence ajoute le début de l'extrait.

### 2. Classement d'une cause : une liste fermée, assumée comme convention
Une cause (« sonde lambda », « turbo ») n'a pas de consigne de notice. Sa tranche vient d'une **liste fermée de pièces et d'opérations**, tenue dans la grille des coûts. C'est une convention de classement, pas un coût sourcé ; elle est publiée dans la section méthode de « à propos ».

| Tranche | Pièces et opérations |
|---|---|
| `geste` | Appoint (huile, AdBlue, liquide de refroidissement, lave-glace) ; regonflage ; régénération du filtre à particules en roulant ; recharge de la batterie |
| `entretien` | Révision, vidange, filtres ; bougies d'allumage et de préchauffage ; plaquettes et disques ; batterie ; liquide de frein ; pneus ; balais ; courroie de distribution remplacée à l'échéance du plan d'entretien ; chaînes, chaussettes et pneus hiver |
| `reparation` | Capteurs et sondes (sonde lambda, capteur ABS, capteur de pression des pneus) ; calculateur ; faisceau et connecteurs ; alternateur ; démarreur ; durites et colliers ; vanne EGR ; boîtier de préchauffage ; module d'airbag |
| `organe` | Catalyseur ; filtre à particules à remplacer ; système AdBlue (réservoir, pompe, injecteur) ; turbo ; injection (pompe haute pression, injecteurs) ; embrayage ; distribution cassée ou usée avant l'échéance ; direction assistée (crémaillère, moteur d'assistance) ; moteur ; boîte de vitesses |

- **Règle de doute** : une pièce absente de la liste prend la tranche la plus lourde plausible.
- La liste se complète dans la pull request du lot de pages qui en a besoin, et Houssem la valide avec le lot.

### 3. « Si vous continuez de rouler » (facultatif)
Quand une notice dit qu'un dégât grave suit si l'on continue de rouler, la page l'affiche dans l'encadré : « Si vous continuez de rouler : risque de grosse réparation ». C'est l'information de coût qui sert le plus la décision. Elle porte une tranche et ses citations (référence à la base ou citation saisie). Citations disponibles dans la base :
- Peugeot 208 p. 15, « Risque de destruction du catalyseur » ;
- Seat Ibiza p. 288, « susceptible d'endommager le catalyseur » ;
- Renault Clio 5 p. 125, « Risque casse moteur ».

### 4. Montants fixés par un texte (grille des coûts)
Un montant n'est jamais saisi dans une page : la page déclare son identifiant, et la grille tient le texte, les sources et les dates.

| Montant | Texte affiché | Sources (à ajouter au registre) | Dates |
|---|---|---|---|
| `depannage-autoroute` | « Dépannage sur autoroute ou route express : forfait réglementé de 151 € à 280,08 € TTC selon l'heure et le poids (tarif 2026), fournitures en plus » | Arrêté du 8 décembre 2025 ; arrêté du 12 juillet 2016 ; décret n° 89-477, art. 2 et 3 | En vigueur depuis le 01/01/2026, fixé « pour un an » |
| `amende-pneus` | « Pneus usés ou abîmés : amende forfaitaire de 135 € (contravention de 4e classe), immobilisation possible » | Code de la route, art. R314-1 ; code de procédure pénale, art. R49 | Vérifié le 28/10/2026 |

Pour un montant périmé, la vérification ne repose pas sur une date de fin connue d'avance, car l'arrêté du dépannage change à des dates variables (2022, 2023, 2024, 2026) :
- chaque montant porte sa date de dernière vérification ;
- une alerte se déclenche quand cette vérification a plus de 3 mois. Le contrôle du lundi échoue alors, comme pour une revue dépassée, ce qui envoie la notification GitHub ;
- un an après l'entrée en vigueur, le tarif du dépannage n'est plus affiché tant qu'il n'est pas remis à jour. La construction n'est jamais bloquée, pour qu'une correction urgente reste possible ;
- la liste de recette demande de vérifier le tarif au Journal officiel avant de fusionner un lot qui l'affiche.

L'amende du contrôle technique sera définie à l'étape 11, après lecture de la version actuelle de R323-1 (modifiée au 01/01/2026).

### 5. Prise en charge possible (facultatif)
`garantie-legale`, réservée aux pages dont la plage va jusqu'à « Réparation au garage » ou plus. Texte proposé, à finaliser :
- « Voiture achetée à un professionnel : un défaut qui existait à la livraison est réparé sans aucun frais au titre de la garantie légale de conformité » ;
- sources : code de la consommation, art. L217-3, L217-7 et L217-11.

Condition avant affichage : lire l'article L217-3 en entier, pour le cas des voitures d'occasion. La prise en charge du constructeur pour le PureTech se traitera avec le dossier, à l'étape 10.

### 6. Où le coût est porté
- **Pages qui ont des causes** (voyant, code défaut, panne) : chaque cause reçoit sa tranche (`cout`). La plage de l'encadré, « de … à … », est **calculée** sur les causes (la plus légère et la plus lourde). La saisir est une erreur, comme pour les autres champs calculés.
- **Page outil des voyants** : plage calculée sur les pages voyants. L'outil affiche aussi la plage de chaque voyant.
- **Autres pages** (fluide, pneus, dossier) : plage saisie (`de`, `a`).

Schéma proposé :
```yaml
cout_probable:
  de: geste                    # saisi seulement sur une page sans causes
  a: organe                    # idem ; jamais plus léger que « de »
  base_de_calcul: "…"          # ce qui fait passer d'une tranche à l'autre
  sources: [ … ]               # au moins une, toutes au registre
  si_vous_continuez:           # facultatif (point 3)
    tranche: organe
    citations: [ … ]
  montants_fixes: [depannage-autoroute]   # facultatif (point 4)
  prise_en_charge: [garantie-legale]      # facultatif (point 5)
causes:
  - cause: "…"
    explication: "…"
    cout: organe               # obligatoire sur une page qui a des causes
```

### 7. Encadré, empreinte et validation
- **Ce que l'encadré affiche** :
  - « Coût probable : de « Geste à faire vous-même » à « Grosse réparation », selon la cause » (une seule tranche si la plage est réduite à une tranche) ;
  - puis, s'ils existent, le risque si l'on continue et les montants fixés.
- **Contrôle R9** : il vérifie ces libellés, au lieu du texte libre actuel.
- **L'empreinte de l'encadré** porte sur :
  - les identifiants de la plage, du risque, des montants et de la prise en charge (comme pour les verdicts) ;
  - la base de calcul et les sources ;
  - les couples (cause, tranche).

  Conséquences :
  - changer la tranche d'une cause fait revalider l'encadré, même si la plage ne bouge pas ;
  - retoucher un libellé ou mettre à jour le tarif du dépannage dans la grille ne fait pas revalider chaque encadré : Houssem valide la grille une fois.

### 8. Contrôles (catalogue `CONTROLES.md`)
- **Sur les pages**, chacun avec sa page de test dans `tests/fixtures` :
  - plage inversée ;
  - plage saisie sur une page à causes ;
  - cause sans tranche ;
  - page sans causes et sans plage ;
  - risque plus léger que le début de la plage ;
  - prise en charge sur une page dont la plage ne va pas jusqu'à « Réparation au garage » ;
  - libellés absents de l'encadré (R9).
- **Sur la grille**, testés dans `tests/controle.test.ts` :
  - citation référencée introuvable ou ambiguë ;
  - moins de deux groupes de constructeurs pour une tranche ;
  - montant sans source de Légifrance ;
  - montant à revérifier (alerte, et échec du contrôle du lundi).

## Couverture des 42 pages (prévision, à sourcer et valider avec chaque page)
Les 39 pages éditoriales entrent dans l'échelle ; les 3 pages du socle n'ont pas d'encadré. Cette prévision montre la couverture ; elle ne vaut pas validation.

| Page | Vague | Type | Plage prévue | Plage | Montant fixé ou remarque |
|---|---|---|---|---|---|
| accueil | A | socle | — | — | Pas d'encadré de décision |
| mentions-legales | A | socle | — | — | Pas d'encadré de décision |
| a-propos | A | socle | — | — | Pas d'encadré de décision |
| voyants | A | voyant | Aucun frais → Grosse réparation | calculée (outil) | dépannage sur autoroute ; calculée sur les pages voyants (page outil) |
| voyant-moteur | A | voyant | Entretien ou équipement courant → Grosse réparation | calculée (causes) | dépannage sur autoroute ; si vous continuez : grosse réparation (catalyseur) |
| voyant-huile | A | voyant | Geste à faire vous-même → Grosse réparation | calculée (causes) | dépannage sur autoroute ; si vous continuez : grosse réparation (moteur) |
| voyant-batterie | A | voyant | Entretien ou équipement courant → Réparation au garage | calculée (causes) | dépannage sur autoroute |
| voyant-frein | A | voyant | Aucun frais → Réparation au garage | calculée (causes) | dépannage sur autoroute |
| voyant-adblue | A | voyant | Geste à faire vous-même → Grosse réparation | calculée (causes) | dépannage sur autoroute ; système AdBlue : grosse réparation (liste de la grille) |
| voyant-fap | A | voyant | Geste à faire vous-même → Grosse réparation | calculée (causes) |  |
| voyant-prechauffage | A | voyant | Aucun frais → Réparation au garage | calculée (causes) |  |
| voyant-airbag | A | voyant | Aucun frais → Réparation au garage | calculée (causes) |  |
| voyant-abs-esp | A | voyant | Aucun frais → Réparation au garage | calculée (causes) | dépannage sur autoroute |
| voyant-pression-pneus | A | voyant | Geste à faire vous-même → Réparation au garage | calculée (causes) | dépannage sur autoroute ; capteur défaillant : réparation |
| voyant-direction | A | voyant | Réparation au garage → Grosse réparation | calculée (causes) | dépannage sur autoroute |
| code-p0420 | A | code-defaut | Réparation au garage → Grosse réparation | calculée (causes) | dépannage sur autoroute |
| code-p0087 | A | code-defaut | Entretien ou équipement courant → Grosse réparation | calculée (causes) | dépannage sur autoroute |
| code-p0299 | A | code-defaut | Réparation au garage → Grosse réparation | calculée (causes) | dépannage sur autoroute |
| code-p0380 | A | code-defaut | Entretien ou équipement courant → Réparation au garage | calculée (causes) | dépannage sur autoroute |
| code-p1351 | A | code-defaut | Entretien ou équipement courant → Réparation au garage | calculée (causes) | dépannage sur autoroute ; sens du code à établir par marque |
| voiture-ne-demarre-pas | B | panne | Geste à faire vous-même → Réparation au garage | calculée (causes) |  |
| voiture-qui-broute | B | panne | Entretien ou équipement courant → Réparation au garage | calculée (causes) |  |
| perte-de-puissance | B | panne | Entretien ou équipement courant → Grosse réparation | calculée (causes) |  |
| surchauffe-moteur | B | panne | Geste à faire vous-même → Grosse réparation | calculée (causes) | dépannage sur autoroute ; si vous continuez : grosse réparation (moteur) |
| bruit-moteur | B | panne | Entretien ou équipement courant → Grosse réparation | calculée (causes) |  |
| fumee-echappement | B | panne | Entretien ou équipement courant → Grosse réparation | calculée (causes) |  |
| batterie-voiture | B | panne | Geste à faire vous-même → Entretien ou équipement courant | calculée (causes) |  |
| batterie-changer | B | panne | Entretien ou équipement courant | calculée (causes) |  |
| batterie-recharger | B | panne | Geste à faire vous-même | calculée (causes) |  |
| nettoyer-fap | B | panne | Geste à faire vous-même → Grosse réparation | calculée (causes) |  |
| moteur-puretech | B | dossier | Entretien ou équipement courant → Grosse réparation | saisie | prise en charge du constructeur à sourcer (étape 10) |
| huile-moteur | C | fluide | Entretien ou équipement courant | saisie |  |
| huile-5w30 | C | fluide | Geste à faire vous-même → Entretien ou équipement courant | saisie |  |
| huile-5w40 | C | fluide | Geste à faire vous-même → Entretien ou équipement courant | saisie |  |
| huile-10w40 | C | fluide | Geste à faire vous-même → Entretien ou équipement courant | saisie |  |
| niveau-huile | C | fluide | Geste à faire vous-même | saisie |  |
| liquide-de-refroidissement | C | fluide | Geste à faire vous-même → Entretien ou équipement courant | saisie |  |
| liquide-de-frein | C | fluide | Geste à faire vous-même → Entretien ou équipement courant | saisie |  |
| pression-des-pneus | A | pneus | Geste à faire vous-même | saisie |  |
| usure-des-pneus | C | pneus | Entretien ou équipement courant | saisie | amende pneus (R314-1) |
| loi-montagne | A | pneus | Entretien ou équipement courant | saisie | pas d'amende à ce jour (D314-8 ; réponse ministérielle du 12/02/2026) : à revérifier au JO avant publication |
| contre-visite-controle-technique | C | pneus | Entretien ou équipement courant → Grosse réparation | saisie | amende : montant à définir à l'étape 11, après lecture de la version actuelle de R323-1 |

## Raison (données)
1. **Aucune source neutre trouvée qui donne le coût d'une réparation en euros** (recherche, §3 ; documents de la SRA non lus). Les seules sources de montants trouvées sont des enseignes, des comparateurs ou des statistiques de prix de prestations. Les reprendre contredirait la règle 5 de 01.
2. **Le coût n'est pas un objectif de trafic, mais les lecteurs le cherchent.**
   - 0 mot-clé sur 1 053 du périmètre (05) contient « prix », « coût », « tarif » ou « amende ». C'est un effet du périmètre : dans la base complète (06), 565 mots-clés sur 3 491 en contiennent, tous hors périmètre.
   - Relevé Google France du 28/10 (sans revue indépendante à ce jour) :
     - 7 suggestions ou questions sur 213 parlent d'argent ou de sanction, dont 3 de la loi montagne ;
     - 5 résultats naturels sur 126 annoncent un coût dès leur titre ;
     - l'aperçu IA ne donne aucun montant dans les 700 premiers caractères relevés.
   - **Ce que l'échelle perd** : face à ces concurrents, elle ne donne pas de montant pour les réparations.
   - **Ce qu'elle gagne** : rien d'inventé ni d'emprunté à une enseigne.
3. **Ce que l'échelle apporte au lecteur, avec une source pour chaque point :**
   - la nature de la dépense, cause par cause : le lecteur sait par quoi commencer ;
   - le risque chiffré en nature si l'on continue de rouler, cité de la notice ;
   - des montants réels là où un texte les fixe : 135 € d'amende, 151 € à 280,08 € pour un dépannage sur autoroute ;
   - la réponse à « Quelle amende pour la loi montagne ? » : aucune à ce jour, avec sa source.
4. **Le niveau « cause »** répond à « combien selon ce que j'ai ? » et suit la règle « une source de vérité » : la plage de l'encadré se calcule. Porter le coût sur la situation aurait demandé une donnée de coût dans chaque ligne de la base validée, alors que le coût dépend surtout de la cause.

## Impact sur ce qui est validé
| Élément | Impact |
|---|---|
| Décision du 22/10 (04) et ligne « Jamais de prix d'enseigne… » de `CLAUDE.md` | « Ordres de grandeur » devient « nature de la dépense, classée par lourdeur d'intervention » (décision 1) : la formulation est mise à jour |
| Règle 5 de 01, `CLAUDE.md` et 08 §1 | Inchangés si la décision 2 est « non ». Si elle est « oui », une exception y est écrite : « sauf montant fixé par un texte officiel (arrêté, code), sourcé sur Légifrance » |
| Base voyants (`data/voyants.json`, 25 lignes) | Aucun : la grille cite des lignes par référence. L'empreinte d'une ligne (`empreinteVoyant`) ne contient pas le coût ; le test des empreintes de la base, relancé par la CI, le confirmera |
| Grille des verdicts et des urgences, plan du site, périmètre (02), 03 | Aucun |
| Structure des contenus (`src/schemas/`, 08) | `cout_probable` et `causes` changent ; une grille des coûts est ajoutée ; 08 §1 et §2 mis à jour, et une section générée depuis la grille des coûts |
| Pages éditoriales | Aucune n'existe ; aucune empreinte d'encadré à recalculer |
| Pages de test et tests | Les 51 pages de test portent « tranche : à fixer à l'étape 6 » : elles sont régénérées (`npm run fixtures`), et des pages de test sont ajoutées pour les nouveaux contrôles. Les tests de l'empreinte qui utilisent « de 100 à 1 000 € » sont réécrits |
| Registre des sources | 5 sources ajoutées pour la grille : arrêté du 8/12/2025, arrêté du 12/07/2016, décret n° 89-477, art. R49 du code de procédure pénale, art. R314-1 du code de la route. Le code de la consommation, la réponse ministérielle et R323-1 entrent avec leur page |
| Contrôle du lundi (`.github/workflows/ci.yml`) | Il échoue aussi sur l'alerte « montant à revérifier » |
| Livrables suivants de l'étape 6 | 6.2 : la section méthode reprend l'échelle et la liste des pièces. 6.3 : l'encadré affiche plage, risque et montants. 6.8 : les briefs reprennent la plage prévue et les points à suivre (loi montagne, contrôle technique) |

## Contrôles à relancer
- En local : `npm run grille:vue` (vue de 08), `npm run fixtures`, et les tests sans dépendance.
- Par la CI de la pull request, le registre npm n'étant pas joignable depuis cette session : `npm run schemas`, `npm test` (dont « docs/08 à jour » et les empreintes de la base, R4), `npm run build` (dont `scripts/controle.ts` et R9), `npm run liens`.

## Décisions qui reviennent à Houssem
1. **Sens de « ordres de grandeur »** (décision du 22/10).
   - **Recommandation** : 5 tranches de nature de dépense, sans montant en euros pour les réparations, plus les montants fixés par un texte.
   - **Ce que ça coûte** : des concurrents de la première page affichent des montants (5 titres sur 126), et le lecteur qui veut un chiffre ira les lire.
   - **L'autre voie**, des montants en euros pour les réparations, exige des prix d'enseignes ou de comparateurs. Elle demande de changer la règle 5 de 01, et des prix datés à revoir sans cesse : déconseillé.
2. **Tarif réglementé du dépannage sur autoroute.** C'est littéralement un prix de prestation : l'afficher demande une exception à la règle 5.
   - **Recommandation** : l'afficher. L'État le fixe par arrêté ; il est identique partout et sourcé sur Légifrance ; il chiffre ce que coûte un arrêt sur autoroute après un « arrêtez-vous ».
   - Si la réponse est non, `depannage-autoroute` est retiré et rien d'autre ne change.
3. **Niveau du coût et validation** (recommandé) :
   - la cause pour les pages qui en ont, avec la plage calculée, et la page pour les autres ;
   - la tranche de chaque cause dans l'empreinte, donc validée par Houssem avec l'encadré.
4. **Libellés des 5 tranches** : ils peuvent être corrigés librement. Une simple reformulation ne relance pas de revue.

## Suite, après l'accord
- Branche `etape-6/cout-probable` :
  - grille des coûts, schémas, calcul, contrôles et pages de test ;
  - registre (5 sources) ;
  - 08 régénéré, `CONTROLES.md` et `CLAUDE.md` mis à jour ;
  - ce document et la recherche des sources.
- Pull request, CI verte exigée.
- Décision inscrite au journal (04).
- Fusion seulement sur la demande de Houssem.
