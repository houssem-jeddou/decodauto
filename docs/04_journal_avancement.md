# Journal d'avancement — site voiture

Ce fichier est l'état de référence du projet. Il est remplacé en entier à la fin de chaque session ayant produit une validation ou une décision.

Dernière mise à jour : 23/10/2026 (14 h)

## État des étapes
| # | Étape | Statut | Livrable de référence |
|---|---|---|---|
| 1 | Mots-clés | ✅ Figée (22/10) | 05_mots_cles_perimetre.csv (source de vérité ; v2 du 23/10 : précision de 5 lignes, demande de changement n° 2), 06_base_mots_cles_complete.csv ; base Excel v1.1 conservée hors projet par Houssem |
| 2 | Périmètre | ✅ Figé (22/10) | 02_perimetre_lot_unique.md (formulation du nombre de pages corrigée le 23/10) |
| 3 | Fondations | ✅ Validée par Houssem (23/10) · tag `etape-3-fondations` | 08_structure_contenus (v3 depuis le 23/10) ; dépôt github.com/houssem-jeddou/decodauto ; site https://decodauto.com |
| 4 | Plan du site | ✅ Validée par Houssem (23/10) · tag `etape-4-plan-du-site` sur demande, après fusion de la PR #3 | `data/plan-du-site.json` (fait foi) ; 09_plan_du_site_v1.md (vue lisible) ; PR #3 |
| 5 | Sources et base voyants | À faire (prochaine étape) | – |
| 6 | Charte et modèles de pages | À faire | – |
| 7 | Socle technique | À faire | – |
| 8 | Vague A | À faire | – |
| 9 | Recette et mise en ligne A | À faire | – |
| 10 | Vague B | À faire | – |
| 11 | Vague C | À faire | – |
| 12 | Boucle mensuelle | À faire | – |

## Étape 4, Plan du site : livrables
- [x] **Rattachement des mots-clés** : les 1 053 mots-clés de 05 (921 comptés, 132 variantes) sont rattachés chacun à une seule page. Le plan compte 42 pages (22 en vague A, 11 en B, 9 en C), comme dans 02. Douze cas limites sont tranchés (09).
- [x] **Adresses** :
  - `/voyants/<voyant>/` (page mère : l'outil voyants) ;
  - `/codes-defaut/<code>/` ;
  - tutos sous leur page mère (`/batterie-voiture/changer/`, `/huile-moteur/5w30/`) ;
  - adresse courte pour les autres pages.
- [x] **Hiérarchie des 4 thèmes** : pas de pages « thème » pour l'instant. L'accueil liste toutes les pages par thème, et cette liste est générée depuis le plan.
- [x] **Liens entre pages** : 49 paires déclarées dans le plan, plus les liens entre chaque page mère et ses enfants.
- [x] **Demande de changement n° 1** : les liens passent dans le plan du site (08 v3). Les pages ne déclarent plus de liens ; une page mère affiche ses enfants ; un lien écrit dans le texte ne mène qu'à une page liée dans le plan.
- [x] **Demande de changement n° 2** : précision de 5 lignes de 05 (cas 11 et 12).
- [x] **Contrôle automatique de la porte**, relancé à chaque construction : couverture exacte de 05, variantes, doublons d'intention, requêtes principales, précisions de 05, vague des pages, structure des liens et des pages mères.

## Étape 4 : porte de sortie (vérifiée et validée le 23/10)
| Critère | Statut | Preuve |
|---|---|---|
| 100 % des mots-clés de 05 rattachés | ✅ | Contrôle `PLAN-MOT-CLE-*` à chaque construction et test « porte de l'étape 4 » sur les données réelles (`tests/plan.test.ts`) : 1 053 / 1 053, 0 constat. CI de la PR #3, run 39945863233 (commit 3fe6049) : « 0 erreur bloquante, 0 alerte, mode non indexable ». Recompté par le relecteur avec son propre script. |
| Zéro doublon d'intention, vérifié par script | ✅ | Contrôle `PLAN-DOUBLON-INTENTION` (signature normalisée, au singulier, sans mots vides ; « sans », « ne », « pas » gardés) : 0 doublon. Même résultat avec le script indépendant du relecteur. |
| Revue indépendante | ✅ | Deux revues du plan, deux revues du code de la PR #3, puis une revue globale des étapes 1 à 4 par deux relecteurs (rien de bloquant ; apports ci-dessous) |
| Validation de Houssem | ✅ | 23/10/2026 |

## Décisions ouvertes (à trancher par Houssem)
- **Fusion de la PR #3** et **tag `etape-4-plan-du-site`** : sur demande de Houssem.
- **Relecteur :** mécanicien payé, ou uniquement des sources officielles citées. À trancher avant l'étape 5 ; ce choix décide aussi si les pages affichent « relu par ».
- **Statut** pour les mentions légales, et encaissement d'AdSense depuis la Tunisie.

## Historique des décisions
- 22/10/2026 : niche voiture retenue ; base de mots-clés v1.1 figée ; périmètre lot unique figé (42 pages, outil voyants et socle compris, 4 thèmes) ; électrique hors périmètre ; pas d'achat de lecteurs OBD ; plan d'avancement validé avec publication en 3 vagues.
- 22/10/2026 (soir) : nom de domaine decodauto.com (en .com, car le .fr est réservé aux résidents de l'UE) ; choix de la stack ; création du dépôt ; ajout du domaine à Cloudflare ; structure des contenus validée. Coût probable : échelle fermée en ordres de grandeur, avec une base de calcul sourcée, sans prix d'enseigne ni de prestation ; tranches fixées à l'étape 6.
- 23/10/2026 : PR #1 fusionnée ; 08 v2 (`voyant_lie`) acceptée ; secrets Cloudflare ajoutés dans GitHub ; enregistrements A d'OVH supprimés (MX et TXT de la messagerie conservés) ; premier déploiement réussi ; Search Console et Bing ajoutés.
- 23/10/2026 : porte de sortie de l'étape 3 validée par Houssem. Les schémas du dépôt font foi pour la structure des contenus (le 08 est archivé comme référence). Le projet Claude fait foi pour les documents, et docs/ du dépôt en est la copie mise à jour à chaque validation par PR (CLAUDE.md et docs/README.md corrigés). Tag `etape-3-fondations` posé sur la version validée.
- 23/10/2026 (après-midi), étape 4 : plan du site validé par Houssem (42 pages, adresses, 49 paires de liens, requêtes principales, cas limites 1 à 12). Demandes de changement n° 1 (liens dans le plan) et n° 2 (précision de 5 lignes de 05) acceptées. Pas de pages « thème » pour l'instant. `data/plan-du-site.json` fait foi pour le plan ; 09 en est la vue lisible.
- 23/10/2026 (14 h), après la revue globale des étapes 1 à 4 : porte de sortie de l'étape 4 validée. 03 passe en v2 : points de mise en ligne inscrits aux étapes 7 à 9 (canonical contrôlé, redirections www et http, politique de confidentialité, vague A préparée hors de `main`, mise en ligne par une seule PR avec le drapeau d'indexation, vérification en production), minimum du 31/10 (socle, outil voyants, loi montagne, pression des pneus, voyants validés ; le reste suit sans alléger les portes), plateforme de consentement déplacée à l'étape 12. Règle des liens allégée : un ajout de paire de liens se propose dans la PR du lot de pages et se valide avec le lot ; un retrait reste une demande de changement. Mesure des requêtes absentes de 06 : pas maintenant. 01 et 02 : formulations périmées corrigées (nom de domaine, nombre de pages).

## Revues indépendantes : ce qu'elles ont changé
- 22/10 : instructions du projet revues (champ de la revue précisé, format anti-complaisance avec preuves, deux revues maximum, alignement avec 03 et 04, rythme de mise à jour du journal).
- 22/10 (soir), choix technique, deux revues :
  - déploiement conditionné aux contrôles ;
  - stack confirmée, sans impact négatif pour le SEO ;
  - réglages Cloudflare reportés (voir « Idées reportées »).
- 22/10 (soir), structure des contenus, trois revues (la troisième à la demande de Houssem) :
  - verdicts des voyants pris dans la base ;
  - sources tirées du registre ;
  - voyant température rattaché à toute page ;
  - colonne « action » ;
  - champs calculés ;
  - format tutoriel.
- 23/10, PR #1, deux revues du code :
  - la première a demandé 9 corrections : lignes de voyants reprises de la base, pages hors plan, tableau non vide, marqueur tutoriel, indexation à double clé, domaine personnalisé, suppression du déploiement manuel, contrôle hebdomadaire, CLAUDE.md complété ;
  - la seconde : 9 corrections faites, fusion possible.
- 23/10, revue de porte de l'étape 3 : rien de bloquant. Elle a relevé :
  - le projet Claude n'était pas à jour (08 absent, 04 ancien) ;
  - deux sources de vérité se contredisaient (CLAUDE.md et docs/README.md) ;
  - un commit de documentation a été poussé directement sur main sans PR (9c46886, par Claude, contraire à CLAUDE.md ; sans dégât, contrôles verts). Désormais, toute modification passe par une PR.
- 23/10, plan du site, deux revues (la seconde à la demande de Houssem) :
  - requête de la page usure : « pneu usé » ;
  - 7 liens ajoutés, dont l'outil voyants vers la page surchauffe (voyant température) ;
  - une page mère affiche ses enfants ;
  - les cas 11 et 12, écarts à la colonne précision de 05, sont devenus la demande de changement n° 2 ;
  - un lien vers une page pas encore écrite est une information, pas une alerte ;
  - contrôles de la porte précisés (précision de 05, singulier, « sans / ne / pas ») ;
  - notes pour les étapes 5 et 6 (voyant moteur rouge, AdBlue, voyant vidange, 85W140, titres fumées et bruit moteur).
- 23/10, PR #3, deux revues du code :
  - liens du texte lus sous toutes leurs formes (relatifs, absolus vers decodauto.com, liens automatiques, adresses nues), sans faux positifs (images, fichiers, code, notes de bas de page) ;
  - texte du socle contrôlé lui aussi ;
  - branchements couverts par des tests (vérifiés par mutation) ;
  - parties de 09 générées par `npm run plan:vue` et vérifiées par un test.
- 23/10, revue globale des étapes 1 à 4, deux relecteurs (trafic et utilité avec la base 06 ; fondations et production) : « acceptable », rien de bloquant. Exclusions, codes retenus, vagues, adresses et liens confirmés. Apports : 03 v2 (voir l'historique), règle des liens allégée, demandes de changement à ouvrir à l'étape 5 (empreinte, pictogrammes), notes pour l'étape 6, idées reportées complétées.

## À ouvrir au début de l'étape 5 (demandes de changement sur la structure)
- **Empreinte de validation** : verrouiller aussi la situation (et `voyant_lie`) des lignes saisies, et la situation, la couleur et le nom des lignes de la base voyants. Aujourd'hui, on peut changer la situation d'une ligne ou la couleur d'un voyant sans revalidation. Accents et ponctuation ignorés, pour qu'une coquille ne force pas de revalidation ; aligner la règle 4 de 08. Coût nul tant que la base est vide.
- **Pictogrammes** : champ `pictogramme` dans la base voyants (un symbole partagé par plusieurs états), contrôle du fichier SVG, et dessin d'environ 15 à 20 symboles redessinés avant la vague A.

## Pour l'étape 6
- Contrôles peu coûteux : title, H1 ou description en double entre deux pages ; dates incohérentes ; verdict et urgence contradictoires (ex. « arrêt immédiat » avec urgence « aucune »).
- Champs pour les données structurées : libellé court (fil d'Ariane, ancres), texte alternatif de l'image, lien du profil auteur ; relecteur en fiche si un mécanicien est retenu.
- Élément unique en outil quand la réponse tient en un chiffre (usure, date de fabrication, délai de contre-visite), car l'aperçu IA la donne sans clic.
- Avant rédaction : comparer les résultats Google de « voyant orange voiture » (outil) et « voyant moteur orange » ; titre des fumées avec la fumée noire, titre du bruit moteur avec le claquement.
- Volumes à lire comme des plafonds : dossier PureTech (94 % de noms de moteur ou de modèle), viscosités (surtout intention d'achat), outil voyants (30 % de requêtes « + modèle »), batterie (34 % d'achat par capacité).

## Points ouverts (non bloquants)
- **Requêtes absentes de 06** : une vingtaine de requêtes suggérées en premier par Google n'y figurent pas (« voyant moteur rouge », « fumée blanche voiture », « voiture qui fume blanc / noir », « pourquoi ma voiture chauffe », « direction assistée », « fap bouché », « puretech fiabilité / avis / chaîne »…). Toutes relèvent de pages prévues. Mesure reportée par Houssem ; à faire avant la rédaction des pages concernées, avec le rattachement des requêtes identiques classées hors périmètre (« liquide de frein », « liquide de refroidissement », « gonfler pneu voiture » et environ 38 lignes), dans une seule demande de changement.
- **Statut et AdSense** : AdSense paie en Tunisie par virement ; reste à trancher le statut des mentions légales et à vérifier que l'activité déclarée du statut d'auto-entrepreneur couvre des recettes publicitaires.
- **OVH** : activer la double authentification sur le compte ; vérifier que le renouvellement du domaine est automatique.
- **DNSSEC** : désactivation chez OVH en cours. Au 23/10, aucun enregistrement DS n'est publié pour decodauto.com.
- **Application GitHub de Claude** : une demande de mise à jour des permissions attend la décision de Houssem.
- **Contrôle hebdomadaire** : il n'a encore jamais tourné. Premier passage le lundi 26/10.
- **Images GitHub Actions** : `ubuntu-latest` passe à Ubuntu 26. Risque faible, car la version de Node est fixée.
- **Liens du socle** : le texte de « à propos » et des mentions légales ne peut lier une page que si ce lien est déclaré dans le plan (demande de changement).
- **Recette (étape 9)** : comparer les dix premiers résultats Google des requêtes de pages voisines (recouvrement de sens, non vérifiable par script).
- **Étape 6** : afficher depuis le plan les liens d'une page (vers les pages construites seulement), le fil d'Ariane et la liste des enfants d'une page mère.
- **Signature d'intention** : « 5w-30 » et « 5w30 » donnent deux signatures différentes. Aucun cas dans les données aujourd'hui.
- **Branches anciennes** du dépôt (`claude/great-fermat-txuonc`, `docs/porte-etape-3`) : peuvent être supprimées.

## Idées reportées
- Ancien lot 2 (codes OBD supplémentaires, batterie et pression par modèle, freins, distribution, embrayage, AdBlue, Crit'Air, voiture qui tremble…) : à réévaluer avec les données de Search Console.
- Frais kilométriques : décision avant février 2027.
- Pages « thème » : non retenues à l'étape 4 ; à réévaluer quand les thèmes compteront plus de pages.
- Alertes présentes dans 06, hors périmètre (revue globale du 23/10) : voiture qui tremble (≈ 5 056 / mois), périodicité du contrôle technique (≈ 9 480), boîte de vitesse (≈ 3 476), bruit de courroie (≈ 2 212), embrayage qui patine (≈ 1 264). À réévaluer avec les données de Search Console.
- Étape 7 : `fetch-depth: 0` dans la CI si `date_modification` est tirée de l'historique Git.
- Réglages SEO et Cloudflare pour les étapes 7 et 9 :
  - **Robots d'IA** : ne jamais bloquer l'entraînement « sur les pages avec pub » (Googlebot et Bingbot sont classés comme robots mixtes). Autoriser « Recherche » et « Agent ». Désactiver « Bot Fight Mode ».
  - **Redirections, canonical, recette hors production** : désormais inscrits aux étapes 7 et 9 de 03 v2.
  - **Outil voyants** : lisible sans JavaScript.
  - **Indexation** : IndexNow pour Bing ; plan du site avec la date de dernière modification réelle.
  - **Rocket Loader** : à ne pas activer.

## Demandes de changement
- 23/10/2026, acceptée : 08 v2, ajout du champ facultatif `voyant_lie` dans une ligne de situation saisie. Raison : relier la ligne à son voyant pour la comparer à la base. Impact : schémas déjà conformes (PR #1). Contrôles : CI verte.
- 23/10/2026, acceptée : n° 1 de l'étape 4, les liens passent dans le plan du site (08 v3). Raison : 08 fait du plan la référence du maillage, mais son schéma n'avait pas de champ pour les liens. Impact : aucune page n'existait ; schémas, contrôles, tests et 08 mis à jour (PR #3). Contrôles : CI verte.
- 23/10/2026, acceptée : n° 2 de l'étape 4, précision de 5 lignes de 05 (1 580 recherches par mois), qui contredisait leur propre sous-thème. Les mots-clés ne changent pas. Impact : 05 v2 (PR #3). Contrôles : porte de l'étape 4.
