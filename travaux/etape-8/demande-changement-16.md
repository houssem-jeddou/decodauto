# Demande de changement n° 16 : requêtes absentes de 06 (livrable 8.2)

**Acceptée par Houssem le 10/11/2026 (0 h 26)** : « oui aux cinq, selon tes recommandations ». Proposée le même jour, après une revue indépendante. Appliquée sur la branche `etape-8/requetes-absentes` (PR #23) : voir « Application » en fin de document.

## Élément concerné
- `05_mots_cles_perimetre_v2.csv` (figé le 22/10, v2 du 23/10) et `06_base_mots_cles_complete.csv` ;
- `data/plan-du-site.json` (validé le 23/10), champ `mots_cles` de 32 pages ; `docs/09` en découle ;
- briefs de la vague A (`travaux/etape-6/briefs/`), parties générées ;
- chiffres de `docs/02` et de `docs/09`.

C'est la demande prévue par 03 (étape 8 : « requêtes absentes de 06 mesurées et rattachées, en une seule demande de changement »).

## Ce qui a été fait
1. **Relevé** : 325 suggestions de saisie (07, relevé du 22/10) et recherches associées (relevé Google France du 28/10) absentes de 06 ; 147 écartées par règle (hors sujet, hors périmètre de 02, enseignes, codes absents du plan, deux-roues), une en double : 177 à mesurer (`requetes-absentes/lister.py`).
2. **Mesure** : Keyword Planner du compte Google Ads de Houssem, le 09/11/2026, zone France, toutes les langues, octobre 2025 à septembre 2026 (`mesures_keyword_planner.csv`).
3. **Tri** avec la fonction `signature` du dépôt (`src/lib/porte-plan.ts`), par `requetes-absentes/trier.ts` : le tri approché du 09/11 trouvait 15 variantes, la fonction du dépôt en trouve 16.
4. **Page de chaque requête** vérifiée, puis proposition construite par `requetes-absentes/proposer.ts` (décisions prises à la main dans `decisions.json`, chacune avec sa raison) : fichiers dans `requetes-absentes/propose/`.

| Résultat de la mesure | Requêtes | Sort proposé |
|---|---|---|
| Au moins 100 recherches par mois, nouvelle signature | 89 | 87 ajoutées à 05 ; 1 écartée (« fap voiture prix », requête de prix) ; 1 gardée comme formulation (« tableau pression pneu voiture », voir le point 2) |
| Au moins 100 recherches par mois, même signature qu'un mot-clé de 05 | 16 | ajoutées à 05 comme variantes, sur la page de leur mot-clé de référence |
| 10 à 100 recherches par mois | 42 | pas dans 05 (06 ne descend pas sous 100) ; gardées comme formulations du lecteur |
| Sans donnée | 30 | pas dans 05 ; gardées comme formulations du lecteur |
| **Total** | **177** | |

## Changement proposé

### 1. 05 passe en v3 : 114 mots-clés ajoutés (1 053 → 1 167)
- 103 requêtes mesurées (87 nouvelles, 16 variantes) et 11 lignes de 06 (point 3).
- Liste complète, avec la page et l'origine de chaque ligne : `propose/ajouts_05.csv`. Fichier complet à charger : `propose/05_mots_cles_perimetre_v3.csv` (les 1 053 lignes actuelles, inchangées, et les ajouts rangés à la fin de leur bloc). Le sort des 177 requêtes et des 11 lignes : `propose/proposition.csv`.
- Colonnes des lignes ajoutées :
  - `theme_site`, `bloc`, `vague`, `sous_theme` : repris du mot-clé de référence pour une variante, sinon de la requête principale de la page ;
  - `intention` : de même, sauf quatre requêtes saisies à la main en « Symptôme ou panne » (`decisions.json`) ; les 11 lignes de 06 gardent l'intention que 06 leur donne ;
  - `volume_fourchette` : la mesure du 09/11 (ou la fourchette de 06 pour ses 11 lignes) ; `volume_indicatif` : 316, 3 160 ou 31 600, comme dans 05 ;
  - `concurrence_ads` : vide sur les 114 lignes (non relevée ; 06 n'a pas cette colonne) ; `enchere_haute_usd` : vide pour les 103 requêtes mesurées. Aucun script ne lit ces deux colonnes ;
  - **comptage, convention de 05** (vraie sur ses 1 053 lignes) : une variante n'est pas comptée, et un mot-clé non compté a toujours sa référence. `variante_proche_de` est le mot-clé de 05 de même signature ; les deux autres formes de « gonfler pneu voiture » ont celle-ci pour référence ;
  - `modele_cite` et `precision` : comme dans 05 (« Couvert par la page du voyant, pas de page par modèle » sur une page voyant ; précision commune à tous les mots-clés de la page, par exemple « Sujet d'actualité… » pour PureTech).
- Sur les pages de la vague A : 74 mots-clés ; vague B : 31 ; vague C : 9. Par fourchette : 9 à 10 k – 100 k, 17 à 1 k – 10 k, 88 à 100 – 1 k.
- Les pages qui reçoivent le plus : outil voyants 12, fumées 11, PureTech 11, voyant moteur 8, P0087 6, loi montagne 6, voyant FAP 6, pression des pneus 5, voyant huile 5.

### 2. Les 73 requêtes non ajoutées : formulations du lecteur
- **Constat** : 30 requêtes n'ont aucune donnée, dont 25 contiennent « allumé » ou « s'allume » (« voyant moteur allumé », « voyant batterie allumé »…). Sur les 405 mots-clés de 06 qui contiennent « voyant » ou « témoin », un seul contient « allum… ». Google les suggère pourtant en tête. Cause non établie.
- **Proposition** : elles n'entrent pas dans 05, qui ne contient que des mots-clés mesurés à au moins 100 recherches. Elles sont gardées dans un fichier lu par le générateur des briefs (`propose/formulations_du_lecteur.csv`, à ranger avec les briefs), chacune avec sa page et son **usage** :
  - 40 « titre de partie ou question possible » (« Voyant moteur allumé : que faire ? ») ;
  - 32 « marque ou modèle : ni titre ni partie par modèle » : elles disent au rédacteur quelles marques les lecteurs citent, sans créer de partie par modèle (consignes validées le 03/11) ;
  - 1 « hors périmètre du brief » : « tableau pression pneu voiture » (1 k – 10 k). La consigne validée du brief pression-des-pneus la cite comme hors périmètre (« ni page ni tableau par modèle sans donnée constructeur sourcée »). Elle n'entre donc pas dans 05 ; la page dit où lire la pression de sa voiture (étiquette, notice).
- Aucune ne crée de page ni ne change une requête principale. Un test vérifie que chaque page existe et qu'aucune formulation n'a la signature d'un mot-clé de 05 rangé sur une autre page (0 cas aujourd'hui, d'après la revue).

### 3. Lignes de 06 classées hors périmètre dont la requête est celle d'une page prévue
- **Critère** : une ligne « Hors » de 06 est rattachée quand sa signature (fonction du dépôt), une fois retirés les mots « voiture », « auto », « automobile » et « véhicule », est celle d'un mot-clé de 05 traité de même, et que tous les mots-clés de 05 de cette signature sont sur une seule page. Elle va sur cette page. Autrement dit : 06 classait hors périmètre une requête déjà rattachée sous une autre forme.
- **Résultat : 10 lignes**, plus une par jugement. Huit ont exactement la signature d'un mot-clé de 05 ; les deux « gonfler » ne l'ont qu'une fois « voiture » retiré.

| Ligne de 06 | Fourchette | 06 la classait | Mot-clé de 05 de même signature | Page | Comptée |
|---|---|---|---|---|---|
| liquide de frein | 10 k – 100 k | Achat générique | frein liquide | liquide-de-frein (C) | non |
| liquide de refroidissement | 10 k – 100 k | Achat générique | liquide refroidissement | liquide-de-refroidissement (C) | non |
| liquide de refroid | 10 k – 100 k | Achat générique | liquide refroid | liquide-de-refroidissement (C) | non |
| gonfler pneu voiture | 10 k – 100 k | Achat générique | gonfler un pneu (sans « voiture ») | pression-des-pneus (A) | oui |
| gonfler les pneus voiture | 10 k – 100 k | Achat générique | gonfler les pneus (sans « voiture ») | pression-des-pneus (A) | non |
| pneu hivers ou 4 saisons | 1 k – 10 k | Achat générique | pneu 4 saisons ou hiver | loi-montagne (A) | non |
| pneus toutes saisons | 100 – 1 k | Achat générique | pneu toute saison | loi-montagne (A) | non |
| point pour controle technique | 100 – 1 k | Après le lot 1 | points de contrôle technique | contre-visite-controle-technique (C) | non |
| defaut moteur 208 | 100 – 1 k | Fiabilité par modèle | défaut moteur 208 | voyant-moteur (A) | non |
| defaut moteur peugeot 2008 | 100 – 1 k | Fiabilité par modèle | défaut moteur peugeot 2008 | voyant-moteur (A) | non |
| gonflement pneu voiture (**par jugement**) | 10 k – 100 k | Achat générique | aucun | pression-des-pneus (A) | non |

- **Règle du jugement** : une ligne est ajoutée à la main seulement si elle ne diffère d'une ligne rattachée par le critère que par la forme d'un même mot (« gonflement », « gonfler ») et a la même fourchette. Un seul cas.
- **Voisines non retenues**, listées pour mémoire (le critère ne les prend pas, et les rattacher rouvrirait le périmètre de 02) : « huile moteur » et 4 formes (10 k – 100 k, achat générique, trois pages possibles) ; contrôle technique en général (la page prévue ne traite que la contre-visite) ; purge et remplacement du liquide de frein (ancien lot 2) ; « vérifier huile moteur » et ses formes (100 – 1 k, proches de niveau-huile, mais sans le mot « niveau ») ; recharge avec un chargeur (proches de batterie-recharger) ; produits de nettoyage du FAP ; pression des pneus par modèle ; « voyant adblue combien de km », que 06 classe en « Prix et coût ». À réévaluer avec Search Console (idées reportées).

### 4. Plan du site : mots-clés ajoutés à 32 pages, rien d'autre
- `data/plan-du-site.json` : les 114 mots-clés ajoutés au champ `mots_cles` de leur page (`propose/plan-du-site.json`). 42 pages, adresses, liens, pages mères, vagues et requêtes principales inchangés.
- **Pages corrigées par rapport au tri initial** (10 requêtes) :

| Requête | Tri initial | Page retenue | Raison |
|---|---|---|---|
| fap bouché (1 k – 10 k), fap voiture (1 k – 10 k), fap voiture essence, fap 1.6 hdi, fap 308 1.6 hdi, fap peugeot 308 | nettoyer-fap | voyant-fap (A) | 02 fait de la page voyant FAP la page de référence du FAP ; les 22 mots-clés de nettoyer-fap dans 05 contiennent tous un verbe de nettoyage ou de démontage ; 05 range déjà « fap moteur essence » sur voyant-fap |
| perte de puissance 1.6 hdi 110 sans voyant | voyants | perte-de-puissance | la requête porte sur la perte de puissance, pas sur l'outil |
| perte de puissance voiture diesel sans voyant allumé (formulation) | voyants | perte-de-puissance | même raison |
| perte de puissance voiture avec voyant allumé (formulation) | voyants | voyant-moteur | même intention que « voyant moteur et perte de puissance », déjà sur cette page |
| voiture qui ne démarre plus mais les voyants s'allument | voyants | voiture-ne-demarre-pas | variante d'un mot-clé de 05 déjà sur cette page |

- **Cas limites gardés** (recommandation ; chacun peut être changé sans toucher au reste) :
  - « voyant orange voiture qui glisse », « voyant orange voiture zig zag » → voyant-abs-esp : la description désigne le voyant ESP ;
  - « voyant orange point d'exclamation » (1 k – 10 k), « voyant orange » (1 k – 10 k) → outil voyants : plusieurs voyants possibles (cas 7 et 8 du plan) ;
  - « voyant orange voiture clé » → outil voyants : la clé est le rappel d'entretien, mais le témoin Service sur la Clio 5 et la Sandero 3 (texte validé de l'outil, 8.1) ;
  - marque ou modèle sur une page voyant ou code (« voyant adblue renault », « p0087 ford »…) → page du voyant ou du code (règle 3 du plan) ;
  - « huile 5w30 c2 », « c3 », « c4 » → huile-5w30, comme « 5w30 c3 » dans 05 (intention surtout d'achat) ;
  - « effacer voyant abs sans valise », « supprimer voyant abs », « astuce pour enlever voyant airbag » (1 k – 10 k), « comment enlever le voyant pression pneu » → page du voyant. La charte (§2.4) règle déjà la réponse : jamais de méthode pour masquer ou éteindre un voyant sans traiter sa cause ; on dit ce qu'il faut traiter et ce que la notice prévoit.
- **Requêtes principales** : inchangées. Sur trois pages, un mot-clé ajouté a une fourchette supérieure à celle de la requête principale : fumee-echappement (« fumée blanche » et « fumée blanche voiture », 1 k – 10 k, contre « fumée blanche échappement », 100 – 1 k), liquide-de-frein (« liquide de frein ») et liquide-de-refroidissement (« liquide de refroidissement »), 10 k – 100 k contre 1 k – 10 k. À trancher au brief de ces pages (vagues B et C), avec leur relevé Google France : ces formes courtes mêlent information et achat. Aucune page de la vague A n'est dans ce cas.

### 5. 06 passe en v2 : 103 lignes ajoutées, 11 lignes reclassées (3 491 → 3 594)
`propose/06_base_mots_cles_complete_v2.csv` : les 103 requêtes mesurées ajoutées en « Lot 1 » ; les 11 lignes du point 3 passées de « Hors » à « Lot 1 », avec le bloc de leur page et le comptage de 05 v3 (3 lignes que 06 comptait ne le sont plus : « defaut moteur 208 », « defaut moteur peugeot 2008 », « pneus toutes saisons », variantes d'un mot-clé déjà compté). Sur les 1 167 mots-clés du lot 1, 05 v3 et 06 v2 sont identiques (bloc, intention, fourchette, enchère, comptage), comme aujourd'hui.

## Raison chiffrée
- 105 requêtes suggérées par Google sur les sujets des pages prévues atteignent au moins 100 recherches par mois et n'étaient dans aucune base. Les 89 nouvelles auraient été manquées à la rédaction, ou traitées sans que le plan dise sur quelle page ; les 16 variantes confirment des mots-clés déjà rattachés.
- Mots-clés comptés : 921 → 1 009 ; variantes : 132 → 158.
- Volume indicatif compté (plafonds, 02) : 1 019 100 → 1 140 760, soit **+ 121 660**. **Deux requêtes courtes en font la moitié** : « puretech » et « gonfler pneu voiture », 31 600 chacune (63 200). Sans elles : + 58 460. Leur volume est un plafond large, pas un trafic attendu.
- Par vague des pages : A + 72 364 (74 mots-clés), B + 47 716 (31), C + 1 580 (9).
- Vague A, à rédiger maintenant : « liste voyant orange voiture », « voyant orange », « voyant orange point d'exclamation », « voyant huile moteur orange », « voyant huile moteur rouge », « astuce pour enlever voyant airbag », « fap bouché », « fap voiture » (1 k – 10 k chacune).
- Les fourchettes des deux mesures (base du 22/10 et mesure du 09/11) ne se comparent pas à la fourchette près : « voyant moteur rouge » est à 1 k – 10 k le 09/11, sa variante « voyant rouge moteur » à 100 – 1 k dans 05. D'où le choix de ne compter aucune variante.

## Impact sur ce qui est validé
- **05 et 06** : nouvelles versions, chargées dans le projet par Houssem ; copie `docs/05` mise à jour par la pull request. Les CSV deviennent la source des mots-clés : `docs/02` et la règle 1 de `docs/03` disent encore 05 « issu de la base Excel v1.1 », à corriger. Le nom du fichier dans le projet change (`05_mots_cles_perimetre_v3.csv`) : les instructions du projet et le journal citent la v2, à aligner.
- **Plan du site** : `mots_cles` de 32 pages ; `docs/09` régénéré (`npm run plan:vue` : chiffres clés et détail par page). Dans `docs/09`, le cas limite 1, écrit à la main, passe de 8 à 9 mots-clés de la vague A servis par surchauffe-moteur (variante « voyant liquide de refroidissement »). Aucun lien, aucune adresse, aucune requête principale, aucune vague ne change.
- **`docs/02`** : chiffres régénérés depuis 05 v3 et 06 v2 : ligne 6 (« 921 mots-clés comptés, ≈ 1 019 100 recherches, dont 316 000 sur des requêtes ≥ 10 000 » devient 1 009, ≈ 1 140 760 et 379 200) ; lignes « mots-clés comptés et volume » et « requêtes phares » des blocs touchés ; tableau « Hors périmètre » (lignes Achat générique, Fiabilité par modèle et Après le lot 1, d'où sortent les 11 lignes reclassées). Le périmètre lui-même (42 pages, 4 thèmes, exclusions, règles) ne change pas.
- **Briefs de la vague A** : régénérés (`npm run briefs`) : tableaux de mots-clés et volumes, nouvelle section « Formulations du lecteur ». Les consignes validées le 03/11 (`consignes.json`) ne sont pas modifiées, et aucun ajout ne les contredit (« tableau pression pneu voiture » reste hors de 05).
- **Tests** : `tests/plan.test.ts` (ligne 63) attend 10 mots-clés servis dans une autre vague que celle de 05 ; il y en aura 11 (la variante ci-dessus, vérifié sur la proposition). C'est une information du contrôle, pas une erreur : le nombre attendu du test passe à 11. Aucun contrôle n'est affaibli.
- **Code** : le générateur des briefs lit le fichier des formulations (une section et un test de plus).
- **Base voyants, registre des sources, charte, modèles, exemples validés, empreintes** : non touchés.

## Contrôles à relancer
- **Porte de l'étape 4** (`controlerPortePlan`), relancée sur la proposition par `proposer.ts` : 0 constat avant, **0 constat après** (chaque mot-clé de 05 v3 sur une seule page, aucun mot-clé inconnu, variantes sur la page de leur référence, aucun doublon d'intention entre pages, requêtes principales, précisions, vagues).
- `proposer.ts` vérifie aussi la convention de comptage (0 ligne hors convention sur 1 167) et l'accord entre 05 v3 et 06 v2 (0 écart) ; 05 v3 privé des ajouts est identique à 05 actuel, ligne pour ligne.
- À l'application : CI de la pull request (contrôles PLAN-* à la construction, `tests/plan.test.ts`, `tests/briefs.test.ts`, vue de 09 à jour), puis recette des exemples et Lighthouse comme à chaque fusion.

## Ce qui n'est pas vérifié
- Keyword Planner donne des fourchettes, sur « toutes les langues » (le réglage de la langue ne s'est pas ouvert) : les volumes indicatifs sont des plafonds qui servent à comparer.
- La cause de l'absence de donnée des requêtes en « allumé » n'est pas établie.
- Les fourchettes des 11 lignes de 06 sont celles de 06 (22/10), non remesurées ; une seule est comptée (« gonfler pneu voiture », 10 k – 100 k, alors que « gonfler un pneu » est à 1 k – 10 k dans 05).
- L'intention réelle des requêtes courtes (« puretech », « fap voiture », « liquide de frein ») n'a pas été relevée dans les résultats Google : elle le sera au brief de leur page.
- Quatre suggestions écartées par `lister.py` sans mesure, alors que des requêtes avec marque ou modèle sont ajoutées : « voyant tableau de bord c3 essence », « P0420 rs3 », « Voyant ABS Toyota Land Cruiser », « vidange ». À joindre à une prochaine mesure ; aucune ne changerait une page.
- Les corrections faites après la revue (comptage, pages du FAP, intentions, usage des formulations) n'ont pas été relues par un agent indépendant : une seule revue, comme demandé. Elles sont contrôlées par les vérifications de `proposer.ts`.
- `astro check`, la construction et les tests complets ne tournent qu'en CI, à l'application.

## Décisions demandées à Houssem
1. Accepter les 114 ajouts à 05 (v3) et leur rattachement, avec les 10 pages corrigées et les cas limites tels que recommandés.
2. Sort des 73 requêtes non ajoutées : fichier des formulations du lecteur lu par les briefs, avec leur usage (recommandé), plutôt que les ignorer ou les mettre dans 05 sans volume. « tableau pression pneu voiture » y reste, hors de 05 : l'ajouter demanderait de changer la consigne validée du brief.
3. Critère des lignes de 06 (10 lignes) et ajout par jugement de « gonflement pneu voiture ».
4. Comptage selon la convention de 05 : aucune variante comptée (totaux prudents).
5. Requêtes principales inchangées ; trois pages des vagues B et C revues à leur brief.

## Application (10/11/2026)
- `docs/05_mots_cles_perimetre.csv` : v3 (1 167 mots-clés) ; `data/plan-du-site.json` : mots-clés ajoutés à 32 pages ; `docs/09` régénéré (`npm run plan:vue`), cas limite 1 corrigé à la main (9 mots-clés).
- `docs/02` : comptes et volumes recalculés par `requetes-absentes/chiffres_02.py`, qui retrouve d'abord les chiffres d'avant depuis les fichiers d'avant (ligne des chiffres clés, 9 blocs, 2 lignes du tableau « Hors périmètre »). Les « requêtes phares » ne sont pas régénérées (l'ordre des égalités de la base Excel ne se retrouve pas) : « puretech » et « gonfler pneu voiture » y sont ajoutées à la main, le reste est inchangé.
- `docs/03` : v11 (règle 1 et ligne de l'étape 1 : les CSV sont la source des mots-clés).
- Briefs : `travaux/etape-6/briefs/formulations-du-lecteur.csv` (73 lignes), section « Formulations du lecteur » du générateur, briefs régénérés ; un test de plus (`tests/briefs.test.ts`). `tests/plan.test.ts` : 11 mots-clés servis dans une autre vague.
- 05 v3 et 06 v2 sont à charger dans le projet par Houssem (fichiers de `requetes-absentes/propose/`).
- `proposer.ts` se lance sur l'état d'avant l'application (commit d4ff0a0) : après elle, 05 contient déjà les ajouts.
