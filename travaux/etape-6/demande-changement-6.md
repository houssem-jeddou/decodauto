# Demande de changement n° 6 : échelle du coût probable (étape 6, livrable 6.1)

Proposée le 28/10/2026, après la recherche des sources (`travaux/etape-6/cout-probable/recherche-sources.md`). **Rien n'est appliqué avant l'accord de Houssem.**

## Élément concerné
Structure des contenus, champ `cout_probable` des pages éditoriales :
- schémas : `src/schemas/pages.ts` (`coutProbableSchema`, `causesSchema`) et une grille des coûts à créer ;
- contrôles : `src/lib/controle.ts` (contenu de l'encadré, R9) ;
- empreinte de l'encadré : `src/lib/empreinte.ts` ;
- vue lisible : `docs/08_structure_contenus.md`, §1 (ligne `cout_probable`) et §2 (`causes`) ;
- registre des sources : `data/sources.json`.

La décision du 22/10 (04) fixe le cadre : « échelle fermée en ordres de grandeur, avec une base de calcul sourcée, sans prix d'enseigne ni de prestation ; tranches fixées à l'étape 6 ». 08 §1 ajoute : « Les tranches, et le niveau où le coût est porté (situation ou cause), seront fixés à l'étape 6. »

## Changement proposé

### 1. Une échelle fermée de 5 tranches, classées de la moins coûteuse à la plus coûteuse
Une tranche dit la **nature de la dépense**, sans montant en euros. Sa base de calcul est la consigne écrite dans la notice. Ses sources sont des citations déjà présentes dans la base voyants validée, reprises par référence (identifiant du voyant et source), jamais recopiées.

| Tranche | Libellé affiché | Ce que c'est | Base de calcul | Citations de la base validée |
|---|---|---|---|---|
| `aucun` | Aucun frais | Fonctionnement normal ou simple information : rien à réparer | La notice décrit un fonctionnement normal | `prechauffage` : Renault Clio 5 p. 139, Seat Ibiza p. 289 ; `frein-stationnement` : Seat Ibiza p. 251, Toyota Yaris p. 118 |
| `geste` | Un geste à faire vous-même | Regonfler, faire l'appoint, rouler pour régénérer le filtre à particules : gratuit, ou le prix d'un produit (huile, AdBlue) | La notice demande une action au conducteur | `huile-niveau` : Seat Ibiza p. 294, Toyota Yaris p. 299 ; `adblue-reserve` : Seat Ibiza p. 286 ; `fap` : Seat Ibiza p. 288-290 |
| `entretien` | Un entretien courant | Révision, vidange, pièce d'usure ou équipement prévu (plaquettes, batterie, bougies, pneus, chaînes) | La notice renvoie à une révision ou à un entretien périodique | `entretien-vidange` : Renault Clio 5 p. 122, Toyota Yaris p. 300 |
| `reparation` | Une réparation au garage | Une pièce défaillante à diagnostiquer puis à réparer ou remplacer (capteur, sonde, calculateur, faisceau), hors organe principal | La notice demande de faire vérifier ou réparer par un atelier | `abs` : Peugeot 208 p. 17, Renault Clio 5 p. 138, Toyota Yaris p. 293 |
| `organe` | Une grosse réparation | Remplacement ou remise en état d'un organe : catalyseur, filtre à particules, turbo, injection, moteur, boîte de vitesses | La notice annonce un dégât grave sur un organe si l'on continue | `moteur-orange-clignotant` : Peugeot 208 p. 15 (« Risque de destruction du catalyseur »), Seat Ibiza p. 288 |

Chaque tranche s'appuie sur au moins deux groupes de constructeurs. La définition est affichée au lecteur (encadré et section méthode de « à propos »).

### 2. Deux montants fixés par un texte, que la page peut ajouter à la tranche
Ils sont tenus dans la grille des coûts, jamais saisis dans une page.

| Montant | Texte affiché | Sources (à ajouter au registre) | Validité |
|---|---|---|---|
| `depannage-autoroute` | « Sur autoroute ou route express, dépannage au tarif réglementé : de 151 € à 280,08 € TTC en 2026, selon l'heure et le poids » | Arrêté du 8 décembre 2025 ; arrêté du 12 juillet 2016 ; décret n° 89-477, art. 2 et 3 | Jusqu'au 31/12/2026. Alerte à partir du 01/12, erreur après le 31/12 si le tarif 2027 n'est pas saisi |
| `amende-4e-classe` | « Amende forfaitaire de 135 € (contravention de 4e classe) » | Code de procédure pénale, art. R49 ; la page cite en plus l'article qui punit l'infraction (par exemple R314-1 pour les pneus) | Sans échéance ; vérifié le 28/10/2026 |

### 3. Où le coût est porté
- **Pages qui ont des causes** (voyant, hors page outil ; code défaut ; panne) : chaque cause reçoit sa tranche (`cout`). L'encadré affiche la plage « de … à … », **calculée** à partir des causes (la moins coûteuse et la plus coûteuse). La plage ne se saisit pas : la saisir est une erreur, comme pour les autres champs calculés.
- **Autres pages** (page outil des voyants, fluide, pneus, dossier) : la plage est saisie (`de`, `a`).
- **Toutes les pages** : une base de calcul (texte), au moins une source du registre, et les montants fixés éventuels.

Schéma proposé :
```yaml
cout_probable:
  de: geste            # saisi seulement sur une page sans causes
  a: organe            # idem ; jamais moins coûteux que « de »
  base_de_calcul: "…"  # ce qui fait passer d'une tranche à l'autre
  sources: [ … ]       # au moins une, toutes au registre
  montants_fixes: [depannage-autoroute]   # facultatif
causes:
  - cause: "…"
    explication: "…"
    cout: organe       # obligatoire sur une page qui a des causes
```

### 4. Encadré de décision et empreinte
- L'encadré affiche le libellé de la tranche, ou les deux libellés de la plage, puis les montants fixés. Le contrôle R9 vérifie ces libellés, au lieu du texte libre actuel.
- L'empreinte de l'encadré porte sur le coût résolu : plage, montants fixés, base de calcul et sources.

### 5. Nouveaux contrôles (catalogue `CONTROLES.md`)
- **Plage inversée** : `de` plus coûteux que `a`.
- **Plage saisie sur une page à causes** ; cause sans tranche ; page sans causes sans plage.
- **Référence inconnue** : une citation de la grille qui n'existe pas dans la base voyants.
- **Montant périmé** : alerte à partir du 01/12/2026, erreur après le 31/12/2026.
- **Amende sans texte** : une page qui affiche l'amende cite au moins un texte de Légifrance en plus de l'article R49.
- Chaque contrôle a sa page de test dans `tests/fixtures`.

## Couverture des 42 pages (prévision, à sourcer et valider avec chaque page)
Les 39 pages éditoriales entrent dans l'échelle ; les 3 pages du socle n'ont pas d'encadré. Cette prévision montre la couverture : elle ne vaut pas validation. La plage d'une page à causes sera calculée à la rédaction.

| Page | Vague | Type | Plage prévue (de → à) | Montant fixé ou remarque |
|---|---|---|---|---|
| accueil | A | socle | — | Pas d'encadré de décision |
| mentions-legales | A | socle | — | Pas d'encadré de décision |
| a-propos | A | socle | — | Pas d'encadré de décision |
| voyants | A | voyant (outil) | Aucun frais → Une grosse réparation | dépannage sur autoroute ; plage saisie (page sans causes) |
| voyant-moteur | A | voyant | Un entretien courant → Une grosse réparation | dépannage sur autoroute |
| voyant-huile | A | voyant | Un geste à faire vous-même → Une grosse réparation | dépannage sur autoroute |
| voyant-batterie | A | voyant | Un entretien courant → Une réparation au garage | dépannage sur autoroute |
| voyant-frein | A | voyant | Aucun frais → Une réparation au garage | dépannage sur autoroute |
| voyant-adblue | A | voyant | Un geste à faire vous-même → Une réparation au garage | dépannage sur autoroute |
| voyant-fap | A | voyant | Un geste à faire vous-même → Une grosse réparation |  |
| voyant-prechauffage | A | voyant | Aucun frais → Une réparation au garage |  |
| voyant-airbag | A | voyant | Aucun frais → Une réparation au garage |  |
| voyant-abs-esp | A | voyant | Aucun frais → Une réparation au garage | dépannage sur autoroute |
| voyant-pression-pneus | A | voyant | Un geste à faire vous-même → Un entretien courant | dépannage sur autoroute |
| voyant-direction | A | voyant | Une réparation au garage → Une grosse réparation | dépannage sur autoroute |
| code-p0420 | A | code-defaut | Une réparation au garage → Une grosse réparation |  |
| code-p0087 | A | code-defaut | Un entretien courant → Une grosse réparation |  |
| code-p0299 | A | code-defaut | Une réparation au garage → Une grosse réparation |  |
| code-p0380 | A | code-defaut | Un entretien courant → Une réparation au garage |  |
| code-p1351 | A | code-defaut | Un entretien courant → Une réparation au garage | sens du code à établir par marque |
| voiture-ne-demarre-pas | B | panne | Un geste à faire vous-même → Une réparation au garage |  |
| voiture-qui-broute | B | panne | Un entretien courant → Une réparation au garage |  |
| perte-de-puissance | B | panne | Un entretien courant → Une grosse réparation |  |
| surchauffe-moteur | B | panne | Un geste à faire vous-même → Une grosse réparation | dépannage sur autoroute |
| bruit-moteur | B | panne | Un entretien courant → Une grosse réparation |  |
| fumee-echappement | B | panne | Un entretien courant → Une grosse réparation |  |
| batterie-voiture | B | panne | Un geste à faire vous-même → Un entretien courant |  |
| batterie-changer | B | panne | Un entretien courant |  |
| batterie-recharger | B | panne | Un geste à faire vous-même |  |
| nettoyer-fap | B | panne | Un geste à faire vous-même → Une grosse réparation |  |
| moteur-puretech | B | dossier | Un entretien courant → Une grosse réparation | prise en charge du constructeur à sourcer (étape 10) |
| huile-moteur | C | fluide | Un entretien courant |  |
| huile-5w30 | C | fluide | Un geste à faire vous-même → Un entretien courant |  |
| huile-5w40 | C | fluide | Un geste à faire vous-même → Un entretien courant |  |
| huile-10w40 | C | fluide | Un geste à faire vous-même → Un entretien courant |  |
| niveau-huile | C | fluide | Un geste à faire vous-même |  |
| liquide-de-refroidissement | C | fluide | Un geste à faire vous-même → Un entretien courant |  |
| liquide-de-frein | C | fluide | Un geste à faire vous-même → Un entretien courant |  |
| pression-des-pneus | A | pneus | Un geste à faire vous-même |  |
| usure-des-pneus | C | pneus | Un entretien courant | amende de 4e classe (R314-1) |
| loi-montagne | A | pneus | Un entretien courant | pas d'amende à ce jour (D314-8 ; réponse ministérielle du 12/02/2026) : à revérifier au JO avant publication |
| contre-visite-controle-technique | C | pneus | Un entretien courant → Une grosse réparation | amende à vérifier : lire la version actuelle de R323-1 |

## Raison (données)
1. **Aucune source neutre ne donne le coût d'une réparation en euros** (recherche, §3). Les seules sources de montants sont des enseignes, des comparateurs ou des statistiques de prix de prestations. Les reprendre contredirait la règle 5 de 01 et la décision du 22/10.
2. **Le coût n'est pas une source de trafic ; il sert la décision.**
   - 0 mot-clé sur 1 053 du périmètre (05) contient « prix », « coût », « tarif » ou « amende ».
   - Relevé Google France du 28/10 : 6 suggestions ou questions sur 213 (2,8 %) parlent d'argent, dont 2 de l'amende de la loi montagne, à laquelle l'échelle répond avec une source officielle.
   - L'aperçu IA de Google ne donne aucun montant en euros sur les 19 requêtes.
3. **Ce que l'échelle apporte au lecteur, avec une source pour chaque point :**
   - la nature de la dépense, cause par cause, de la moins coûteuse à la plus coûteuse : le lecteur sait par où commencer et ce qu'il risque en continuant de rouler ;
   - des montants réels là où un texte les fixe : 135 € d'amende, 151 € à 280,08 € pour un dépannage sur autoroute ;
   - rien d'inventé : chaque tranche renvoie à une consigne de notice déjà validée.
4. **Le niveau « cause »** répond à la question du lecteur (« combien selon ce que j'ai ? ») et suit la règle « une source de vérité » : la plage de l'encadré se calcule, elle ne se recopie pas. Le niveau « situation » aurait obligé à modifier la base voyants validée et ses 25 empreintes.

## Impact sur ce qui est validé
| Élément | Impact |
|---|---|
| Base voyants (`data/voyants.json`, 25 lignes) | Aucun : la grille cite des lignes par référence. L'empreinte d'une ligne (`empreinteVoyant`) ne contient pas le coût ; le test des empreintes de la base, relancé par la CI, le confirmera |
| Grille des verdicts et des urgences | Aucune |
| Plan du site, périmètre (02), règles de 01 et de 03 | Aucun. La règle 5 de 01 est respectée telle quelle |
| Structure des contenus (`src/schemas/`, 08) | `cout_probable` et `causes` changent ; une grille des coûts est ajoutée ; 08 §1 et §2 mis à jour ; une section de 08 générée depuis la grille des coûts, comme celle de la grille des verdicts |
| Pages éditoriales | Aucune n'existe ; aucune empreinte d'encadré à recalculer |
| Pages de test (`tests/fixtures`) | Les 51 pages de test portent aujourd'hui « tranche : à fixer à l'étape 6 » : régénérées (`npm run fixtures`), plus une page de test par nouveau contrôle |
| Registre des sources | 4 sources ajoutées pour la grille : arrêté du 8/12/2025, arrêté du 12/07/2016, décret n° 89-477, art. R49 du code de procédure pénale. Les autres (R314-1, code de la consommation, réponse ministérielle, R323-1) entrent au registre avec leur page |
| Livrables suivants de l'étape 6 | 6.2 : la section méthode reprend l'échelle. 6.3 : l'encadré affiche la plage et les montants. 6.8 : les briefs reprennent la plage prévue et les deux points à suivre (loi montagne, contrôle technique) |

## Contrôles à relancer
- En local : `npm run grille:vue` (vue de 08), `npm run fixtures`, et les tests sans dépendance.
- Par la CI de la pull request, le registre npm n'étant pas joignable depuis cette session : `npm run schemas`, `npm test` (dont « docs/08 à jour » et les empreintes de la base, R4), `npm run build` (dont `scripts/controle.ts` et R9), `npm run liens`.

## Décisions qui reviennent à Houssem
1. **Sens de « ordres de grandeur »** (décision du 22/10). Recommandation : 5 tranches classées par ordre de grandeur de la dépense, **sans montant en euros pour les réparations**. L'autre voie, des montants en euros, exige des prix d'enseignes ou de comparateurs, donc une demande de changement de la règle 5 de 01 : déconseillé.
2. **Tarif réglementé du dépannage sur autoroute.** Est-ce un « prix de prestation » interdit par la règle 5 ? Recommandation : l'afficher. L'État fixe ce prix par arrêté ; il est identique partout, sourcé sur Légifrance, et il chiffre ce que coûte un arrêt sur autoroute après un « arrêtez-vous ». Si la réponse est non, `depannage-autoroute` est retiré et rien d'autre ne change.
3. **Niveau du coût** : la cause pour les pages qui en ont (plage calculée), la page pour les autres. Recommandé.
4. **Libellés** des 5 tranches : à corriger librement, sans revue nouvelle (formulation seulement).

## Suite, après l'accord
- Branche `etape-6/cout-probable` :
  - schémas, grille des coûts, contrôles et pages de test ;
  - registre (4 sources) ;
  - 08 régénéré ;
  - ce document et la recherche des sources.
- Pull request, CI verte exigée.
- Décision inscrite au journal (04).
- Fusion seulement sur la demande de Houssem.
