# Demande de changement n° 6 : échelle du coût probable (étape 6, livrable 6.1)

Proposée le 28/10/2026, après la recherche des sources (`travaux/etape-6/cout-probable/recherche-sources.md`). Deux revues indépendantes, le maximum : chacune a conclu « à corriger », rien de bloquant ; leurs corrections sont intégrées. **Rien n'est appliqué avant l'accord de Houssem.**

## Élément concerné
Structure des contenus, champ `cout_probable` des pages éditoriales, et ce qui en dépend :
- **schémas** : `src/schemas/pages.ts` (`coutProbableSchema`, `causesSchema`) ; les 5 tranches dans un nouveau fichier `src/schemas/cout.ts` ;
- **données** : un nouveau fichier `data/couts.json` (liste des pièces, montants fixés par un texte) ; le registre `data/sources.json` ;
- **calcul et contrôles** :
  - `src/lib/calcul.ts` (tranche des causes, plage) ;
  - `src/lib/controle.ts` (encadré R9, empreintes R4, `codeSortie`) ;
  - `scripts/controle.ts` (`--echouer-sur` avec plusieurs codes) ;
  - `.github/workflows/ci.yml` (contrôle du lundi) ;
- **empreinte** : `src/lib/empreinte.ts`, `scripts/empreinte.ts` ;
- **outils et tests** : `scripts/generer-fixtures.ts`, `scripts/vue-grille.ts`, `tests/controle.test.ts`, pages de test ;
- **documents** :
  - `docs/08_structure_contenus.md` : §1 (`cout_probable`, `validation`), §2 (`causes`), §3 règle 9, et une section générée ;
  - `CONTROLES.md` ;
  - `CLAUDE.md` ;
  - la décision du 22/10 dans le journal ;
  - selon la décision 2 : la règle 5 de 01 et les règles de périmètre de 02.

Le cadre vient de la décision du 22/10 (04) : « échelle fermée en ordres de grandeur, avec une base de calcul sourcée, sans prix d'enseigne ni de prestation ; tranches fixées à l'étape 6 ». 08 §1 ajoute : « Les tranches, et le niveau où le coût est porté (situation ou cause), seront fixés à l'étape 6. »

## Changement proposé

### 1. Une échelle fermée de 5 tranches : la nature de la dépense (structure, `src/schemas/cout.ts`)
La tranche dit **ce qu'il faudra faire et payer**, sans montant en euros. Les tranches sont classées par **lourdeur habituelle de l'intervention**. Ce classement est une convention, pas un montant : un entretien (courroie de distribution, quatre pneus) peut coûter plus qu'une petite réparation. La définition affichée au lecteur le dit.

| Tranche | Libellé affiché | Définition affichée au lecteur | Consigne de notice qui y mène | Citations de la base validée (voyant, source, emplacement) |
|---|---|---|---|---|
| `aucun` | Aucun frais | Fonctionnement normal ou simple information : rien à réparer | La notice décrit un fonctionnement normal | `prechauffage` : Renault Clio 5 p. 139, Seat Ibiza p. 289 ; `frein-stationnement` : Seat Ibiza p. 251, Toyota Yaris p. 118 |
| `geste` | Geste à faire vous-même | Regonfler, faire un appoint, rouler pour régénérer le filtre à particules : gratuit, ou le prix d'un produit (huile, AdBlue) | La notice demande une action au conducteur | `huile-niveau` : Seat Ibiza p. 294, Toyota Yaris p. 299 ; `adblue-reserve` : Peugeot 208 p. 15 (« Faire un appoint en AdBlue ») ; `fap` : Seat Ibiza p. 288-290 |
| `entretien` | Entretien ou équipement courant | Une révision, une pièce d'usure ou un équipement prévu. Peut coûter plus qu'une petite réparation | La notice renvoie à une révision ou à l'entretien périodique | `entretien-vidange` : Peugeot 208 p. 19-20, Renault Clio 5 p. 122, Toyota Yaris p. 300 |
| `reparation` | Réparation au garage | Une pièce défaillante à diagnostiquer puis à réparer ou remplacer, hors organe principal | La notice demande de faire vérifier ou réparer par un atelier | `abs` : Peugeot 208 p. 17, Renault Clio 5 p. 138, Toyota Yaris p. 293 |
| `organe` | Grosse réparation | Le remplacement ou la remise en état d'un organe ou d'un système lourd | La notice annonce un dégât grave sur un organe si l'on continue | `moteur-orange-clignotant` : Peugeot 208 p. 15 (« Risque de destruction du catalyseur »), Seat Ibiza p. 288 ; `moteur-rouge` : Renault Clio 5 p. 125 (« Risque casse moteur ») |

- Chaque tranche s'appuie sur trois groupes de constructeurs (au moins deux exigés, contrôlé).
- Les citations sont reprises de la base voyants par référence, jamais recopiées. Quand voyant, source et emplacement ne suffisent pas à désigner une citation (3 cas dans la base), la référence ajoute le début de l'extrait.

### 2. Tranche d'une cause : calculée depuis une liste fermée de pièces (données, `data/couts.json`)
Une cause (« sonde lambda », « turbo ») n'a pas de consigne de notice. Elle cite une ou plusieurs **pièces ou opérations** d'une liste fermée ; sa tranche est **calculée** : la plus lourde de ses pièces. Ainsi deux pages ne peuvent pas classer le même turbo différemment. Cette liste est une convention de classement, pas un coût sourcé ; elle est publiée dans la section méthode de « à propos ».

Liste initiale (à valider par Houssem, décision 3) :

| Tranche | Pièces et opérations |
|---|---|
| `aucun` | Fonctionnement normal ; information ; frein de stationnement serré ; système désactivé par le conducteur |
| `geste` | Appoint (huile, AdBlue, liquide de refroidissement, lave-glace) ; regonflage ; régénération du filtre à particules en roulant ; recharge de la batterie |
| `entretien` | Révision, vidange, filtres ; bougies d'allumage et de préchauffage ; plaquettes et disques ; batterie ; liquide de frein ; pneus ; balais ; courroie de distribution remplacée à l'échéance du plan d'entretien ; chaînes, chaussettes et pneus hiver |
| `reparation` | Capteurs et sondes (sonde lambda, capteur ABS, capteur de pression des pneus) ; calculateur ; faisceau et connecteurs ; alternateur ; démarreur ; durites et colliers ; vanne EGR ; boîtier de préchauffage ; module d'airbag |
| `organe` | Catalyseur ; filtre à particules à remplacer ; système AdBlue (réservoir, pompe, injecteur) ; turbo ; injection (pompe haute pression, injecteurs) ; embrayage ; distribution cassée ou usée avant l'échéance ; direction assistée (crémaillère, moteur d'assistance) ; moteur ; boîte de vitesses |

- Une pièce inconnue de la liste bloque la construction.
- Une pièce manquante s'ajoute dans la pull request du lot de pages qui en a besoin, avec sa tranche ; Houssem la valide avec le lot (même principe que les paires de liens du plan). En cas de doute, la tranche la plus lourde plausible.

### 3. « Si vous continuez de rouler » (facultatif)
Quand une notice dit qu'un dégât grave suit si l'on continue de rouler, l'encadré l'affiche : « Si vous continuez de rouler : risque de grosse réparation ». C'est l'information de coût qui sert le plus la décision. Elle porte une tranche et ses citations (référence à la base ou citation saisie).

Citations disponibles dans la base :
- Peugeot 208 p. 15, « Risque de destruction du catalyseur » ;
- Seat Ibiza p. 288, « susceptible d'endommager le catalyseur » ;
- Peugeot 208 p. 20, « pour éviter la détérioration du moteur » ;
- Renault Clio 5 p. 125 et Dacia Sandero 3 p. 102, « Risque casse moteur ».

La ligne `temperature-rouge` n'en a pas : la page sur la surchauffe devra saisir sa citation.

### 4. Montants fixés par un texte (données, `data/couts.json`)
Un montant n'est jamais saisi dans une page. Chaque entrée de `data/couts.json` porte :
- son texte affiché et ses sources (au moins une de Légifrance) ;
- sa date d'entrée en vigueur et sa date de dernière vérification ;
- son délai de revérification ;
- son empreinte, validée par Houssem et contrôlée par R4 comme une ligne de la base voyants. Changer un chiffre ou un mot du texte exige une nouvelle validation (08 §3 règle 4). La date de vérification n'entre pas dans l'empreinte.

**Créés maintenant :**

| Montant | Texte affiché | Sources | Revérifier |
|---|---|---|---|
| `depannage-autoroute` | « Dépannage sur autoroute ou route express : forfait réglementé de 151 € à 280,08 € TTC selon l'heure et le poids, fournitures en plus (tarif en vigueur depuis le 01/01/2026, vérifié le JJ/MM/AAAA) » | Arrêté du 8 décembre 2025 ; arrêté du 12 juillet 2016 ; décret n° 89-477, art. 2 et 3 | Tous les 3 mois |
| `aucune-amende-loi-montagne` | « Aucune amende n'est prévue à ce jour pour défaut d'équipement (vérifié le JJ/MM/AAAA) » | Code de la route, art. D314-8 (déjà au registre) ; réponse ministérielle au JO Sénat du 12/02/2026 (source secondaire) | Tous les mois : un décret de sanction est annoncé |

- **Dépannage calculé.** Le dépannage s'affiche de lui-même sur toute page dont le niveau de sécurité calculé est un verdict d'arrêt (« non, … ») ; il n'est pas déclaré page par page.
- **Revérification.**
  - Le tarif change à des dates variables (2022, 2023, 2024, 2026). Une alerte se déclenche quand la vérification dépasse son délai, et le contrôle du lundi échoue alors, comme pour une revue dépassée.
  - Il faut pour cela que `--echouer-sur` accepte plusieurs codes. L'alerte vit dans le contrôle du site, pas dans un test : une pull request n'échoue pas à cause de la date.
- **Montant périmé.**
  - Le site étant statique, rien ne change en ligne sans fusion. Le lecteur voit donc toujours la date de vérification.
  - La construction n'est jamais bloquée par une date, pour qu'une correction urgente reste possible.
  - La liste de recette demande de revérifier ces montants avant de fusionner un lot qui les affiche.
- **Amendes créées plus tard, avec leur page (étape 11)** :
  - amende pour pneus usés : R314-1 et R49 ; vérifier d'abord si elle est comptée par pneu ;
  - amende pour défaut de contrôle technique : lire d'abord la version de R323-1 en vigueur depuis le 01/01/2026.

### 5. Prise en charge possible (facultatif)
Le champ `prise_en_charge` est prévu, pour une page dont la plage va jusqu'à « Réparation au garage » ou plus. Sa première entrée, `garantie-legale`, n'est créée qu'avec sa première page :
- texte proposé : « Voiture achetée à un professionnel : un défaut qui existait à la livraison est réparé sans aucun frais au titre de la garantie légale de conformité » ;
- sources : code de la consommation, art. L217-3, L217-7 et L217-11 ;
- condition : lire d'abord l'article L217-3 en entier, pour le cas des voitures d'occasion.

La prise en charge du constructeur pour le PureTech se traitera avec le dossier (étape 10).

### 6. Où le coût est porté
- **Pages qui ont des causes** (voyant, code défaut, panne) : plage calculée sur les causes, de la plus légère à la plus lourde. La saisir est une erreur, comme pour les autres champs calculés.
- **Page outil des voyants** : texte fixe « Selon le voyant » dans l'encadré ; l'outil affiche la plage de chaque voyant, calculée sur sa page.
- **Autres pages** (fluide, pneus, dossier) : plage saisie (`de`, `a`).

Schéma proposé :
```yaml
cout_probable:
  de: geste                    # saisi seulement sur une page sans causes (hors outil)
  a: organe                    # idem ; jamais plus léger que « de »
  base_de_calcul: "…"          # ce qui fait passer d'une tranche à l'autre
  sources: [ … ]               # au moins une, toutes au registre
  si_vous_continuez:           # facultatif (point 3)
    tranche: organe
    citations: [ … ]
  montants: [aucune-amende-loi-montagne]  # facultatif, identifiants de data/couts.json (le dépannage est calculé)
  prise_en_charge: [garantie-legale]      # facultatif (point 5)
causes:
  - cause: "…"
    explication: "…"
    pieces: [turbo]            # identifiants de data/couts.json ; tranche calculée
```

### 7. Encadré, empreinte et validation
- **L'encadré affiche** :
  - « Coût probable : de « Geste à faire vous-même » à « Grosse réparation », selon la cause » (une seule tranche si la plage est réduite à une tranche) ;
  - puis, s'ils existent, le risque si l'on continue et les montants, avec leur date de vérification.
- **Contrôle R9** : il vérifie ces libellés, au lieu du texte libre actuel.
- **L'empreinte de l'encadré** porte sur :
  - les identifiants de la plage, du risque, des montants et de la prise en charge ;
  - la base de calcul et les sources ;
  - les couples (cause, pièces).
- **Conséquences** :
  - changer les pièces d'une cause fait revalider l'encadré, même si la plage ne bouge pas ;
  - les textes des montants ont leur propre empreinte (point 4) : les mettre à jour fait valider l'entrée une fois, pas chaque encadré ;
  - retoucher un libellé de tranche ne fait pas revalider les encadrés.

### 8. Contrôles (catalogue `CONTROLES.md`)
- **Sur les pages**, chacun avec sa page de test dans `tests/fixtures` :
  - plage inversée ;
  - plage saisie sur une page à causes ;
  - cause sans pièce ;
  - pièce inconnue ;
  - page sans causes et sans plage, hors outil ;
  - montant inconnu ;
  - risque plus léger que le début de la plage ;
  - prise en charge sur une page dont la plage ne va pas jusqu'à « Réparation au garage » ;
  - libellés absents de l'encadré (R9).
- **Sur les données**, testés dans `tests/controle.test.ts` et vérifiés à chaque construction :
  - citation référencée introuvable ou ambiguë ;
  - moins de deux groupes de constructeurs pour une tranche ;
  - montant sans source de Légifrance ;
  - empreinte d'un montant absente ou différente (R4).
- **Dans le contrôle du site seulement** : montant à revérifier. C'est une alerte, et le contrôle du lundi échoue.

## Couverture des 42 pages (prévision, à sourcer et valider avec chaque page)
Les 39 pages éditoriales entrent dans l'échelle ; les 3 pages du socle n'ont pas d'encadré. Cette prévision montre la couverture ; elle ne vaut pas validation. 9 pages ont une plage large (4 tranches ou plus) : pour elles, le risque si l'on continue et le tableau cause par cause, juste sous l'encadré, portent l'essentiel (composant à prévoir en 6.3).

| Page | Vague | Type | Plage prévue | Plage | Montant ou remarque |
|---|---|---|---|---|---|
| accueil | A | socle | — | — | Pas d'encadré de décision |
| mentions-legales | A | socle | — | — | Pas d'encadré de décision |
| a-propos | A | socle | — | — | Pas d'encadré de décision |
| voyants | A | voyant | Selon le voyant | texte fixe (outil) | « Selon le voyant » ; l'outil affiche la plage de chaque voyant |
| voyant-moteur | A | voyant | Entretien ou équipement courant → Grosse réparation | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) ; si vous continuez : grosse réparation (Peugeot p. 15, Seat p. 288) |
| voyant-huile | A | voyant | Geste à faire vous-même → Grosse réparation | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) ; si vous continuez : grosse réparation (Peugeot p. 20) |
| voyant-batterie | A | voyant | Entretien ou équipement courant → Réparation au garage | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| voyant-frein | A | voyant | Aucun frais → Réparation au garage | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| voyant-adblue | A | voyant | Geste à faire vous-même → Grosse réparation | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| voyant-fap | A | voyant | Geste à faire vous-même → Grosse réparation | calculée (causes) |  |
| voyant-prechauffage | A | voyant | Aucun frais → Réparation au garage | calculée (causes) |  |
| voyant-airbag | A | voyant | Aucun frais → Réparation au garage | calculée (causes) |  |
| voyant-abs-esp | A | voyant | Aucun frais → Réparation au garage | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| voyant-pression-pneus | A | voyant | Geste à faire vous-même → Réparation au garage | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| voyant-direction | A | voyant | Réparation au garage → Grosse réparation | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| code-p0420 | A | code-defaut | Réparation au garage → Grosse réparation | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| code-p0087 | A | code-defaut | Entretien ou équipement courant → Grosse réparation | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| code-p0299 | A | code-defaut | Réparation au garage → Grosse réparation | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| code-p0380 | A | code-defaut | Entretien ou équipement courant → Réparation au garage | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) |
| code-p1351 | A | code-defaut | Entretien ou équipement courant → Réparation au garage | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) ; sens du code à établir par marque |
| voiture-ne-demarre-pas | B | panne | Geste à faire vous-même → Réparation au garage | calculée (causes) |  |
| voiture-qui-broute | B | panne | Entretien ou équipement courant → Réparation au garage | calculée (causes) |  |
| perte-de-puissance | B | panne | Entretien ou équipement courant → Grosse réparation | calculée (causes) |  |
| surchauffe-moteur | B | panne | Geste à faire vous-même → Grosse réparation | calculée (causes) | dépannage sur autoroute (calculé : verdict d'arrêt) ; si vous continuez : citation à saisir (la ligne temperature-rouge n'en a pas) |
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
| usure-des-pneus | C | pneus | Entretien ou équipement courant | saisie | amende : montant créé à l'étape 11 (vérifier s'il est compté par pneu) |
| loi-montagne | A | pneus | Entretien ou équipement courant | saisie | `aucune-amende-loi-montagne` ; revérifié chaque mois |
| contre-visite-controle-technique | C | pneus | Entretien ou équipement courant → Grosse réparation | saisie | amende : montant créé à l'étape 11, après lecture de R323-1 |

## Raison (données)
1. **Aucune source neutre trouvée qui donne le coût d'une réparation en euros** (recherche, §3 ; documents de la SRA non lus). Les seules sources de montants trouvées sont des enseignes, des comparateurs ou des statistiques de prix de prestations. Les reprendre contredirait la règle 5 de 01.
2. **Le coût n'est pas un objectif de trafic, mais les lecteurs le cherchent.**
   - **Mots-clés** : 0 sur 1 053 dans le périmètre (05) contient « prix », « coût », « tarif » ou « amende ». C'est un effet du périmètre : dans la base complète (06), 565 mots-clés sur 3 491 en contiennent, tous hors périmètre.
   - **Relevé Google France du 28/10** (sans revue indépendante à ce jour) :
     - 7 suggestions ou questions sur 213 parlent d'argent ou de sanction, dont 3 de la loi montagne ;
     - 5 résultats naturels sur 126 annoncent un coût dès leur titre ;
     - l'aperçu IA ne donne aucun montant dans les 700 premiers caractères relevés.
   - **Ce que l'échelle perd** : face à ces concurrents, elle ne donne pas de montant pour les réparations.
   - **Ce qu'elle gagne** : rien d'inventé ni d'emprunté à une enseigne.
3. **Ce que l'échelle apporte au lecteur, avec une source pour chaque point :**
   - la nature de la dépense, cause par cause : le lecteur sait par quoi commencer ;
   - le risque si l'on continue de rouler, cité de la notice ;
   - des montants réels là où un texte les fixe : 151 € à 280,08 € pour un dépannage sur autoroute ;
   - la réponse à « Quelle amende pour la loi montagne ? » : aucune à ce jour, datée et revérifiée chaque mois.
4. **Le niveau « cause »** répond à « combien selon ce que j'ai ? » et suit la règle « une source de vérité » : la tranche d'une cause et la plage se calculent. Porter le coût sur la situation aurait demandé une donnée de coût dans chaque ligne de la base validée, alors que le coût dépend surtout de la cause.

## Impact sur ce qui est validé
| Élément | Impact |
|---|---|
| Décision du 22/10 (04) et ligne « Jamais de prix d'enseigne… » de `CLAUDE.md` | « Ordres de grandeur » devient « nature de la dépense, classée par lourdeur d'intervention » (décision 1). Le journal inscrit une nouvelle décision, sans réécrire celle du 22/10 ; `CLAUDE.md` est mis à jour |
| Règle 5 de 01, règles de périmètre de 02 (« Ni prix de prestations ni enseignes »), `CLAUDE.md` et 08 §1 | Inchangés si la décision 2 est « non ». Si elle est « oui », la même exception y est écrite : « sauf montant fixé par un texte officiel (arrêté, code), sourcé sur Légifrance ». La mention « Ni prix ni centres » du contrôle technique (02) n'est pas touchée : une amende n'est pas un prix |
| `CLAUDE.md`, règles de travail | Ajouts : une pièce manquante s'ajoute dans la pull request du lot et se valide avec lui ; les montants vivent dans `data/couts.json` avec leur empreinte |
| Base voyants (`data/voyants.json`, 25 lignes) | Aucun : la grille cite des lignes par référence. L'empreinte d'une ligne (`empreinteVoyant`) ne contient pas le coût ; le test des empreintes de la base, relancé par la CI, le confirmera |
| Grille des verdicts et des urgences, plan du site, 03 | Aucun |
| Structure des contenus (`src/schemas/`, 08) | `cout_probable` et `causes` changent ; 5 tranches dans `src/schemas/cout.ts`. Dans 08 : §1 (`cout_probable`, `validation`), §2 (`causes`), §3 règle 9, et une section générée qui ne contient ni montants ni dates |
| Pages éditoriales | Aucune n'existe ; aucune empreinte d'encadré à recalculer |
| Pages de test et tests | Les 51 pages de test portent « tranche : à fixer à l'étape 6 » : elles sont régénérées (`npm run fixtures`), et des pages de test sont ajoutées pour les nouveaux contrôles. Les tests de l'empreinte qui utilisent « de 100 à 1 000 € » sont réécrits |
| Registre des sources | 4 sources ajoutées : arrêté du 8/12/2025, arrêté du 12/07/2016, décret n° 89-477 (Légifrance), réponse ministérielle du 12/02/2026 (secondaire). R49, R314-1, R323-1 et le code de la consommation entrent avec leur page |
| Contrôle du lundi | Il échoue aussi sur l'alerte « montant à revérifier » (`ci.yml`, `scripts/controle.ts`, `codeSortie`) |
| Livrables suivants de l'étape 6 | 6.2 : la section méthode reprend l'échelle et la liste des pièces. 6.3 : l'encadré affiche plage, risque et montants ; un tableau « cause → tranche » juste sous l'encadré. 6.8 : les briefs reprennent la plage prévue et les points à suivre (loi montagne, contrôle technique) |
| Documents du projet Claude | 08 mis à jour ; 01 et 02 aussi si la décision 2 est « oui » ; journal |

## Contrôles à relancer
- En local : `npm run grille:vue` (vue de 08), `npm run fixtures`, et les tests sans dépendance.
- Par la CI de la pull request, le registre npm n'étant pas joignable depuis cette session : `npm run schemas`, `npm test` (dont « docs/08 à jour » et les empreintes de la base, R4), `npm run build` (dont `scripts/controle.ts` et R9), `npm run liens`.

## Décisions qui reviennent à Houssem
1. **Sens de « ordres de grandeur »** (décision du 22/10).
   - **Recommandation** : 5 tranches de nature de dépense, sans montant en euros pour les réparations, plus les montants fixés par un texte.
   - **Ce que ça coûte** : des concurrents de la première page affichent des montants (5 titres sur 126), et le lecteur qui veut un chiffre ira les lire.
   - **L'autre voie**, des montants en euros pour les réparations, exige des prix d'enseignes ou de comparateurs. Elle demande de changer la règle 5 de 01, et des prix datés à revoir sans cesse : déconseillé.
2. **Tarif réglementé du dépannage sur autoroute.** C'est littéralement un prix de prestation : l'afficher demande une exception à la règle 5 (01, 02, `CLAUDE.md`, 08).
   - **Recommandation** : l'afficher. L'État le fixe par arrêté ; il est identique partout et sourcé sur Légifrance ; il chiffre ce que coûte un arrêt sur autoroute après un « arrêtez-vous ».
   - Si la réponse est non, `depannage-autoroute` est retiré et rien d'autre ne change.
3. **Niveau du coût et liste des pièces** (recommandé) :
   - la cause pour les pages qui en ont, la plage calculée, les pièces de chaque cause dans l'empreinte ;
   - la page pour les autres ;
   - la liste initiale du §2. Elle a un effet éditorial : par exemple, les injecteurs et l'embrayage y sont des « Grosses réparations », et la courroie de distribution à l'échéance est un « Entretien ».
4. **Libellés des 5 tranches** : ils peuvent être corrigés librement. Une simple reformulation ne relance pas de revue.

## Suite, après l'accord
- Branche `etape-6/cout-probable` :
  - tranches, données des coûts, schémas, calcul, contrôles et pages de test ;
  - registre (4 sources) ;
  - 08 régénéré, `CONTROLES.md` et `CLAUDE.md` mis à jour ;
  - ce document et la recherche des sources.
- Pull request, CI verte exigée.
- Entrées de `data/couts.json` validées par Houssem (empreinte).
- Décision inscrite au journal (04) ; documents du projet Claude mis à jour.
- Fusion seulement sur la demande de Houssem.
