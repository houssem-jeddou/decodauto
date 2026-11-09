# Demande de changement n° 16 : requêtes absentes de 06 (livrable 8.2)

Proposée le 10/11/2026. **Rien n'est appliqué** : 05, 06, le plan et les briefs sont inchangés tant que Houssem n'a pas accepté.

## Élément concerné
- `05_mots_cles_perimetre_v2.csv` (figé le 22/10, v2 du 23/10) et `06_base_mots_cles_complete.csv` ;
- `data/plan-du-site.json` (validé le 23/10), champ `mots_cles` de 33 pages ; `docs/09` en découle ;
- briefs de la vague A (`travaux/etape-6/briefs/`), parties générées ;
- chiffres de `docs/02` (ligne 6) et « Chiffres clés » de `docs/09`.

C'est la demande prévue par 03 (étape 8 : « requêtes absentes de 06 mesurées et rattachées, en une seule demande de changement »).

## Ce qui a été fait
1. **Relevé** : 325 suggestions de saisie (07, relevé du 22/10) et recherches associées (relevé Google France du 28/10) absentes de 06 ; 147 écartées par règle (hors sujet, hors périmètre de 02, enseignes, codes absents du plan, deux-roues), une en double : 177 à mesurer (`requetes-absentes/lister.py`).
2. **Mesure** : Keyword Planner du compte Google Ads de Houssem, le 09/11/2026, zone France, toutes les langues, octobre 2025 à septembre 2026 (`mesures_keyword_planner.csv`).
3. **Tri** avec la fonction `signature` du dépôt (`src/lib/porte-plan.ts`), par `requetes-absentes/trier.ts` : le tri approché du 09/11 trouvait 15 variantes, la fonction du dépôt en trouve 16.
4. **Page de chaque requête** vérifiée, puis proposition construite par `requetes-absentes/proposer.ts` (décisions prises à la main dans `decisions.json`) : fichiers dans `requetes-absentes/propose/`.

| Résultat de la mesure | Requêtes | Sort proposé |
|---|---|---|
| Au moins 100 recherches par mois, nouvelle signature | 89 | 88 ajoutées à 05 ; 1 écartée (« fap voiture prix », requête de prix) |
| Au moins 100 recherches par mois, même signature qu'un mot-clé de 05 | 16 | ajoutées à 05 comme variantes, sur la page de leur mot-clé de référence |
| 10 à 100 recherches par mois | 42 | pas dans 05 (06 ne descend pas sous 100) ; gardées comme formulations du lecteur |
| Sans donnée | 30 | pas dans 05 ; gardées comme formulations du lecteur |
| **Total** | **177** | |

## Changement proposé

### 1. 05 passe en v3 : 115 mots-clés ajoutés (1 053 → 1 168)
- 104 requêtes mesurées (88 nouvelles, 16 variantes) et 11 lignes de 06 (point 3).
- Liste complète, avec la page et l'origine de chaque ligne : `propose/ajouts_05.csv`. Fichier complet à charger : `propose/05_mots_cles_perimetre_v3.csv`. Le sort des 177 requêtes et des 11 lignes : `propose/proposition.csv`.
- Colonnes des lignes ajoutées :
  - `theme_site`, `bloc`, `vague`, `sous_theme`, `intention` : repris du mot-clé de référence pour une variante, sinon de la requête principale de la page ;
  - `volume_fourchette` : la mesure du 09/11 (ou la fourchette de 06 pour ses 11 lignes) ; `volume_indicatif` : 316, 3 160 ou 31 600, comme dans 05 ;
  - `concurrence_ads` et `enchere_haute_usd` : vides pour les 104 requêtes mesurées (non relevées ; aucun script ne les lit) ;
  - `variante_proche_de` : le mot-clé de 05 de même signature ; `compte_dans_totaux` : 0 quand un mot-clé de même signature est déjà compté avec une fourchette au moins égale ;
  - `modele_cite` et `precision` (« Couvert par la page du voyant, pas de page par modèle ») : posés sur les requêtes avec marque ou modèle d'une page voyant, comme dans 05.
- Par vague : A, 72 mots-clés ; B, 34 ; C, 9. Par fourchette : 9 à 10 k – 100 k, 18 à 1 k – 10 k, 88 à 100 – 1 k.
- Les 10 pages qui reçoivent le plus : outil voyants 12, fumées 11, PureTech 11, voyant moteur 8, P0087 6, loi montagne 6, pression des pneus 6, voyant huile 5, nettoyer le FAP 4, voyant ABS/ESP 4.

### 2. Les 72 requêtes sans volume ou sous 100 recherches : formulations du lecteur
- **Constat** : 30 requêtes n'ont aucune donnée, dont 25 contiennent « allumé » ou « s'allume » (« voyant moteur allumé », « voyant batterie allumé »…). 06 ne contient aucun mot-clé en « allumé » sur ses 680 mots-clés « voyant ». Google les suggère pourtant en tête. Cause non établie.
- **Proposition** : elles n'entrent pas dans 05, qui ne contient que des mots-clés mesurés à au moins 100 recherches. Elles sont gardées dans un fichier lu par le générateur des briefs (`travaux/etape-6/briefs/formulations-du-lecteur.csv`, 72 lignes, chacune avec sa page), qui les affiche dans une section « Formulations du lecteur, sans volume mesuré ». Le rédacteur s'en sert pour les titres de parties et les questions (« Voyant moteur allumé : que faire ? »), pas comme objectif de page.
- Aucune ne crée de page ni ne change une requête principale.

### 3. Lignes de 06 classées hors périmètre dont la requête est celle d'une page prévue
- **Critère** : une ligne « Hors » de 06 est rattachée quand sa signature (fonction du dépôt), une fois retirés les mots « voiture », « auto », « automobile » et « véhicule », est celle d'un mot-clé de 05 traité de même, et que tous les mots-clés de 05 de cette signature sont sur une seule page. Elle va sur cette page. Autrement dit : 06 classait hors périmètre une requête déjà rattachée sous une autre forme.
- **Résultat : 10 lignes**, plus une par jugement. Huit ont exactement la signature d'un mot-clé de 05 ; les deux « gonfler » ne l'ont qu'une fois « voiture » retiré.

| Ligne de 06 | Fourchette | 06 la classait | Mot-clé de 05 de même signature | Page |
|---|---|---|---|---|
| liquide de frein | 10 k – 100 k | Achat générique | frein liquide | liquide-de-frein (C) |
| liquide de refroidissement | 10 k – 100 k | Achat générique | liquide refroidissement | liquide-de-refroidissement (C) |
| liquide de refroid | 10 k – 100 k | Achat générique | liquide refroid | liquide-de-refroidissement (C) |
| gonfler pneu voiture | 10 k – 100 k | Achat générique | gonfler un pneu (sans « voiture ») | pression-des-pneus (A) |
| gonfler les pneus voiture | 10 k – 100 k | Achat générique | gonfler les pneus (sans « voiture ») | pression-des-pneus (A) |
| pneu hivers ou 4 saisons | 1 k – 10 k | Achat générique | pneu 4 saisons ou hiver | loi-montagne (A) |
| pneus toutes saisons | 100 – 1 k | Achat générique | pneu toute saison | loi-montagne (A) |
| point pour controle technique | 100 – 1 k | Après le lot 1 | points de contrôle technique | contre-visite-controle-technique (C) |
| defaut moteur 208 | 100 – 1 k | Fiabilité par modèle | défaut moteur 208 | voyant-moteur (A) |
| defaut moteur peugeot 2008 | 100 – 1 k | Fiabilité par modèle | défaut moteur peugeot 2008 | voyant-moteur (A) |
| gonflement pneu voiture (**par jugement**) | 10 k – 100 k | Achat générique | aucun : « gonflement » et « gonfler » ont deux signatures | pression-des-pneus (A) |

- Trois de ces lignes sont comptées dans les totaux (« liquide de frein », « liquide de refroid », « gonfler pneu voiture », 31 600 chacune) ; les autres sont des variantes non comptées.
- **Voisines non retenues**, listées pour mémoire (le critère ne les prend pas, et les rattacher rouvrirait le périmètre de 02) : « huile moteur » et 4 formes (10 k – 100 k, achat générique, trois pages possibles) ; contrôle technique en général (6 lignes : la page prévue ne traite que la contre-visite) ; purge et remplacement du liquide de frein (7 lignes, ancien lot 2) ; « vérifier huile moteur » et 4 formes (100 – 1 k, proches de niveau-huile) ; recharge avec un chargeur (4 lignes, proches de batterie-recharger) ; produits de nettoyage du FAP (22 lignes) ; pression des pneus par modèle (27 lignes, déjà notées hors périmètre au journal). À réévaluer avec Search Console (idées reportées).

### 4. Plan du site : mots-clés ajoutés à 33 pages, rien d'autre
- `data/plan-du-site.json` : les 115 mots-clés ajoutés au champ `mots_cles` de leur page (`propose/plan-du-site.json`). 42 pages, adresses, liens, pages mères, vagues et requêtes principales inchangés.
- **Pages corrigées par rapport au tri initial** (6) :

| Requête | Tri initial | Page retenue | Raison |
|---|---|---|---|
| perte de puissance 1.6 hdi 110 sans voyant | voyants | perte-de-puissance | la requête porte sur la perte de puissance, pas sur l'outil |
| perte de puissance voiture diesel sans voyant allumé (sans donnée) | voyants | perte-de-puissance | même raison |
| perte de puissance voiture avec voyant allumé (sans donnée) | voyants | voyant-moteur | même intention que « voyant moteur et perte de puissance », déjà sur cette page |
| voiture qui ne démarre plus mais les voyants s'allument | voyants | voiture-ne-demarre-pas | variante d'un mot-clé de 05 déjà sur cette page |
| fap voiture (1 k – 10 k) | nettoyer-fap | voyant-fap | question générale sur le filtre à particules : 05 range déjà « fap moteur essence » et « fap voiture voyant » sur voyant-fap |
| fap voiture essence | nettoyer-fap | voyant-fap | même intention que « fap moteur essence » |

- **Cas limites gardés** (recommandation ; chacun peut être changé sans toucher au reste) :
  - « fap bouché » (1 k – 10 k), « fap 1.6 hdi », « fap 308 1.6 hdi », « fap peugeot 308 » → nettoyer-fap (vague B) : symptôme et solution, comme « nettoyage fap 207 1.6 hdi » dans 05 ; pas de page par modèle ;
  - « voyant orange voiture qui glisse », « voyant orange voiture zig zag » → voyant-abs-esp : la description désigne le voyant ESP ;
  - « voyant orange point d'exclamation » (1 k – 10 k), « voyant orange voiture clé », « voyant orange » (1 k – 10 k) → outil voyants : plusieurs voyants possibles (cas 7 et 8 du plan) ;
  - marque ou modèle sur une page voyant ou code (« voyant adblue renault », « p0087 ford »…) → page du voyant ou du code (règle 3 du plan) ;
  - « huile 5w30 c2 », « c3 », « c4 » → huile-5w30, comme « 5w30 c3 » dans 05 (intention surtout d'achat : volumes à lire comme des plafonds) ;
  - « effacer voyant abs sans valise », « supprimer voyant abs », « astuce pour enlever voyant airbag » (1 k – 10 k), « comment enlever le voyant pression pneu » → page du voyant. La page répond à l'intention (pourquoi il reste allumé, ce qui le fait s'éteindre une fois la cause traitée), sans jamais donner un moyen de masquer un défaut d'ABS ou d'airbag. À écrire dans les consignes des briefs concernés, validées avec le lot 8.3.
- **Requêtes principales** : inchangées. Sur trois pages, un mot-clé ajouté a une fourchette supérieure à celle de la requête principale : fumee-echappement (« fumée blanche » et « fumée blanche voiture », 1 k – 10 k, contre « fumée blanche échappement », 100 – 1 k), liquide-de-frein (« liquide de frein ») et liquide-de-refroidissement (« liquide de refroidissement »), 10 k – 100 k contre 1 k – 10 k. À trancher au brief de ces pages (vagues B et C), avec leur relevé Google France : ces formes courtes mêlent information et achat. Aucune page de la vague A n'est dans ce cas.

### 5. 06 : 104 lignes ajoutées, 11 lignes reclassées (3 491 → 3 595)
`propose/06_base_mots_cles_complete_v2.csv` : les 104 requêtes mesurées ajoutées en « Lot 1 » ; les 11 lignes du point 3 passées de « Hors » à « Lot 1 », avec le bloc de leur page. Rien d'autre ne change.

## Raison chiffrée
- 105 requêtes suggérées par Google sur les sujets des pages prévues atteignent au moins 100 recherches par mois et n'étaient dans aucune base : la rédaction les aurait manquées, ou les aurait traitées sans que le plan dise sur quelle page.
- Mots-clés comptés : 921 → 1 013 ; variantes : 132 → 155.
- Volume indicatif compté (plafonds, 02) : 1 019 100 → 1 210 280, soit + 191 180 : + 96 380 pour les requêtes mesurées, + 94 800 pour trois lignes de 06 à 31 600. Par vague : A + 74 576, B + 51 824, C + 64 780.
- Ces + 94 800 viennent de trois requêtes courtes (« liquide de frein », « liquide de refroid », « gonfler pneu voiture ») que 06 classait en achat générique : leur volume est un plafond large, pas un trafic attendu.
- Vague A : 72 mots-clés de plus sur les pages à rédiger maintenant, dont « liste voyant orange voiture », « voyant orange », « voyant orange point d'exclamation », « voyant huile moteur orange », « voyant huile moteur rouge », « astuce pour enlever voyant airbag », « tableau pression pneu voiture » (1 k – 10 k chacune).

## Impact sur ce qui est validé
- **05 et 06** : nouvelles versions, chargées dans le projet par Houssem ; copie `docs/05` mise à jour par la pull request. Le nom du fichier dans le projet change (`05_mots_cles_perimetre_v3.csv`) : les instructions du projet et le journal citent la v2, à aligner.
- **Plan du site** : `mots_cles` de 33 pages ; `docs/09` régénéré (`npm run plan:vue` : chiffres clés et détail par page). Aucun lien, aucune adresse, aucune requête principale, aucune vague ne change.
- **Briefs de la vague A** : régénérés (`npm run briefs`) : tableaux de mots-clés et volumes des 22 briefs ; nouvelle section « Formulations du lecteur ». Les consignes validées le 03/11 (`consignes.json`) ne sont pas modifiées.
- **`docs/02`**, ligne 6 : « 921 mots-clés comptés, ≈ 1 019 100 recherches » devient « 1 013 mots-clés comptés, ≈ 1 210 280 recherches » ; le périmètre (42 pages, 4 thèmes, exclusions) ne change pas.
- **Base voyants, registre des sources, charte, modèles, exemples validés, empreintes** : non touchés.
- **Code** : le générateur des briefs lit le fichier des formulations (une section de plus, un test) ; aucun contrôle modifié ni affaibli.

## Contrôles à relancer
- **Porte de l'étape 4** (`controlerPortePlan`), relancée sur la proposition par `proposer.ts` : 0 constat avant, **0 constat après** (chaque mot-clé de 05 v3 sur une seule page, aucun mot-clé inconnu, variantes sur la page de leur référence, aucun doublon d'intention entre pages, requêtes principales, précisions, vagues).
- À l'application : CI de la pull request (contrôles PLAN-* à la construction, `tests/plan.test.ts`, `tests/briefs.test.ts`, vue de 09 à jour), puis recette des exemples et Lighthouse comme à chaque fusion.

## Ce qui n'est pas vérifié
- Keyword Planner donne des fourchettes, sur « toutes les langues » (le réglage de la langue ne s'est pas ouvert) : les volumes indicatifs sont des plafonds qui servent à comparer.
- La cause de l'absence de donnée des requêtes en « allumé » n'est pas établie.
- Les fourchettes des 11 lignes de 06 sont celles de 06 (22/10), non remesurées.
- L'intention réelle des requêtes courtes (« liquide de frein », « fap voiture », « puretech ») n'a pas été relevée dans les résultats Google : elle le sera au brief de leur page.
- La concurrence et l'enchère des 104 requêtes mesurées ne sont pas relevées.

## Décisions demandées à Houssem
1. Accepter les 115 ajouts à 05 (v3) et leur rattachement, avec les 6 pages corrigées et les cas limites tels que recommandés.
2. Sort des 72 requêtes sans volume ou sous 100 recherches : fichier des formulations du lecteur lu par les briefs (recommandé), plutôt que les ignorer ou les mettre dans 05 sans volume.
3. Critère des lignes de 06 (10 lignes) et ajout par jugement de « gonflement pneu voiture ».
4. Requêtes principales inchangées ; trois pages des vagues B et C revues à leur brief.
