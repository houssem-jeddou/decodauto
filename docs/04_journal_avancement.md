# Journal d'avancement — site voiture

Ce fichier est l'état de référence du projet. Il est remplacé en entier à la fin de chaque session ayant produit une validation ou une décision.

Dernière mise à jour : 23/10/2026 (19 h)

## État des étapes
| # | Étape | Statut | Livrable de référence |
|---|---|---|---|
| 1 | Mots-clés | ✅ Figée (22/10) | 05_mots_cles_perimetre_v2.csv (source de vérité ; v2 du 23/10 : précision de 5 lignes, demande de changement n° 2), 06_base_mots_cles_complete.csv ; base Excel v1.1 conservée hors projet par Houssem |
| 2 | Périmètre | ✅ Figé (22/10) | 02_perimetre_lot_unique.md (formulation du nombre de pages corrigée le 23/10) |
| 3 | Fondations | ✅ Validée par Houssem (23/10) · tag `etape-3-fondations` | 08_structure_contenus (v3 depuis le 23/10) ; dépôt github.com/houssem-jeddou/decodauto ; site https://decodauto.com |
| 4 | Plan du site | ✅ Validée par Houssem (23/10) · PR #3 fusionnée · tag `etape-4-plan-du-site` (715b856) | `data/plan-du-site.json` (fait foi) ; claude/09_plan_du_site.md (vue lisible) |
| 5 | Sources et base voyants | ▶ En cours : d'abord la demande de changement sur la structure (voir plus bas) | – |
| 6 | Charte et modèles de pages | À faire | – |
| 7 | Socle technique | À faire, sur la piste technique (03, règle 12) ; seules les mentions légales attendent le statut juridique | – |
| 8 | Vague A | À faire | – |
| 9 | Recette et mise en ligne A | À faire | – |
| 10 | Vague B | À faire | – |
| 11 | Vague C | À faire | – |
| 12 | Boucle mensuelle | À faire | – |

## Prévision (mise à jour à chaque session ; les dates de 03 sont des cibles)
| Étape | Cible (03) | Prévision au 23/10 | Dépend de |
|---|---|---|---|
| 5. Sources et base voyants | 24–27/10 | demande de changement 24/10 ; registre et base 24–26/10 ; paquet de validation 26–27/10 | disponibilité de Houssem pour valider ; notices accessibles en ligne |
| Piste technique (une à la fois) : pictogrammes de l'étape 5, puis étape 7 | 24–28/10 | pictogrammes 24–25/10 ; étape 7 du 26 au 28/10 | statut juridique, pour les seules mentions légales |
| 6. Charte et modèles | 27–29/10 | 27–29/10 | porte de l'étape 5 ; source des résultats Google depuis la France choisie |
| 8. Vague A | 29/10–01/11 | 29/10–02/11 (minimum d'abord) | portes 5 et 6 ; requêtes absentes mesurées |
| 9. Mise en ligne du minimum | 31/10 | entre le 31/10 et le 03/11 | portes 7 et 8 ; sécurité des comptes |
| 10. Vague B / 11. Vague C | ≈ 07/11 / ≈ 14/11 | ≈ 10–14/11 / ≈ 17–21/11 | mise en ligne de la vague A ; briefs des lots |

**Séances de validation de Houssem** (le vrai goulot), d'ici le 03/11 :
1. demande de changement de structure et marques de référence, vers le 24/10 ;
2. statut juridique, avant les mentions légales ;
3. paquet de validation de la base voyants et porte 5, vers le 26–27/10 ;
4. source des résultats Google, avant l'étape 6 ;
5. porte 6, vers le 29/10 ;
6. porte 7 ;
7. demande de changement des requêtes absentes, juste avant l'étape 8 ;
8. paquet et encadrés de la vague A, et porte 8 ;
9. go / no-go et porte 9, avec GitHub Pro, les comptes et le domaine sécurisés.

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
- **Instructions du projet** : coller le texte v2 fourni le 23/10 (sources de vérité à jour, piste technique, correction urgente, sourçage multi-marques, transparence, circuit des documents).
- **Statut juridique** : à trancher avant de rédiger les mentions légales (étape 7) ; le reste de l'étape 7 avance sans l'attendre (décision du 23/10, 19 h).
- **GitHub Pro** : souscrire avant la porte de l'étape 9, puis protéger `main` (pull request obligatoire, contrôles exigés, aucun contournement).
- **Marques de référence** pour les verdicts (nombre et liste) : proposées dans la demande de changement du début de l'étape 5.
- **Source des résultats Google relevés depuis la France** pour les briefs (Semrush base France, ou relevé manuel) : avant l'étape 6.
- **Auteur** : nom réel acté le 23/10 ; parcours à fournir pour la page « à propos » (étape 7 ou 8).

## Historique des décisions
- 22/10/2026 : niche voiture retenue ; base de mots-clés v1.1 figée ; périmètre lot unique figé (42 pages, outil voyants et socle compris, 4 thèmes) ; électrique hors périmètre ; pas d'achat de lecteurs OBD ; plan d'avancement validé avec publication en 3 vagues.
- 22/10/2026 (soir) : nom de domaine decodauto.com (en .com, car le .fr est réservé aux résidents de l'UE) ; choix de la stack ; création du dépôt ; ajout du domaine à Cloudflare ; structure des contenus validée. Coût probable : échelle fermée en ordres de grandeur, avec une base de calcul sourcée, sans prix d'enseigne ni de prestation ; tranches fixées à l'étape 6.
- 23/10/2026 : PR #1 fusionnée ; 08 v2 (`voyant_lie`) acceptée ; secrets Cloudflare ajoutés dans GitHub ; enregistrements A d'OVH supprimés (MX et TXT de la messagerie conservés) ; premier déploiement réussi ; Search Console et Bing ajoutés.
- 23/10/2026 : porte de sortie de l'étape 3 validée par Houssem. Les schémas du dépôt font foi pour la structure des contenus (le 08 est archivé comme référence). Le projet Claude fait foi pour les documents, et docs/ du dépôt en est la copie mise à jour à chaque validation par PR (CLAUDE.md et docs/README.md corrigés). Tag `etape-3-fondations` posé sur la version validée.
- 23/10/2026 (après-midi), étape 4 : plan du site validé par Houssem (42 pages, adresses, 49 paires de liens, requêtes principales, cas limites 1 à 12). Demandes de changement n° 1 (liens dans le plan) et n° 2 (précision de 5 lignes de 05) acceptées. Pas de pages « thème » pour l'instant. `data/plan-du-site.json` fait foi pour le plan ; 09 en est la vue lisible.
- 23/10/2026 (14 h), après la revue globale des étapes 1 à 4 : porte de sortie de l'étape 4 validée. 03 passe en v2 : points de mise en ligne inscrits aux étapes 7 à 9 (canonical contrôlé, redirections www et http, politique de confidentialité, vague A préparée hors de `main`, mise en ligne par une seule PR avec le drapeau d'indexation, vérification en production), minimum du 31/10 (socle, outil voyants, loi montagne, pression des pneus, voyants validés ; le reste suit sans alléger les portes), plateforme de consentement déplacée à l'étape 12. Règle des liens allégée : un ajout de paire de liens se propose dans la PR du lot de pages et se valide avec le lot ; un retrait reste une demande de changement. Mesure des requêtes absentes de 06 : pas maintenant. 01 et 02 : formulations périmées corrigées (nom de domaine, nombre de pages).
- 23/10/2026 (16 h), après la revue du planning et des règles : Houssem accepte les cinq changements et refuse le relecteur mécanicien. 03 passe en v3 :
  1. méthode de l'étape 5 : plusieurs marques par verdict, verdict le plus prudent, citation à la page près, paquet de validation, sources pour toute la vague A, catégories de sources élargies ;
  2. confiance et transparence : auteur identifié par son nom réel, ligne de transparence sur chaque page, méthode dans « à propos », encadré de décision relu par Houssem, pas de relecteur extérieur ;
  3. une seule piste technique en parallèle (étape 7, ou livrable technique d'une autre étape : pictogrammes, partie technique de l'outil voyants), pictogrammes livrables de l'étape 5, dates devenues des cibles avec prévision au journal ;
  4. requêtes absentes de 06 mesurées avant l'étape 8 ; briefs sur des résultats relevés depuis la France ;
  5. statut avant l'étape 7, recette avant chaque fusion des vagues B et C, emplacements publicitaires non affichés avant AdSense, seuil Lighthouse avec publicité à l'étape 12, sécurité des comptes à l'étape 9, indicateurs et notoriété sans liens artificiels à l'étape 12.

  01, 02, 08, CLAUDE.md et le texte des instructions du projet ont été alignés.
- 23/10/2026 (19 h), après l'audit final du plan et des règles : Houssem accepte tout. 03 passe en v4 :
  - grille des niveaux de verdict et d'urgence, avec leur contrôle de cohérence, dès l'étape 5 ;
  - encadré de décision repéré et contrôlé, empreinte étendue à la question de décision et au coût ;
  - règle 13 (correction urgente) et lien « Signaler une erreur » ;
  - étape 7 qui n'attend le statut que pour les mentions légales ;
  - gravité lisible sans la seule couleur ;
  - GitHub Pro et `main` protégée avant la mise en ligne ;
  - double authentification étendue aux comptes Claude et Microsoft ;
  - renouvellement et verrou du domaine ;
  - réglages Cloudflare et soumission du plan du site ;
  - ads.txt ;
  - libellés des codes défaut en source secondaire.

  Pas de compte GitHub séparé pour Claude.

## Revues indépendantes : ce qu'elles ont changé
- 23/10 (soir), audit final du plan et des règles (nouveau relecteur, sur la dernière version de tous les documents) : « à corriger » sur cinq manques importants (niveaux de verdict non définis, ouverture sur la décision non contrôlée, pas de correction urgente, `main` non protégée, réglages hors dépôt et découverte du domaine absents du plan). Tout est intégré dans 03 v4. Écarté : un compte GitHub séparé pour Claude (facultatif, la protection de `main` suffit).
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
- 23/10, revue du planning et des règles (un relecteur, qui a lu les documents seul avant la proposition) : « à corriger » sur trois manques, la méthode de sourçage de l'étape 5, les pictogrammes et la transparence. Apports intégrés : méthode multi-marques et catégories de sources (règlement ONU n° 121, RappelConso, normes des codes défaut), règlement européen sur l'IA (article 50), encadré de décision relu par Houssem, recette avant chaque fusion après le lancement, seuil Lighthouse avec la publicité, alignement de 01, 02 et 03. Écartés : trois niveaux de procédure (déjà couverts), annuaires et liens dans les forums (liens artificiels selon Google).
- 23/10, revue globale des étapes 1 à 4, deux relecteurs (trafic et utilité avec la base 06 ; fondations et production) : « acceptable », rien de bloquant. Exclusions, codes retenus, vagues, adresses et liens confirmés. Apports : 03 v2 (voir l'historique), règle des liens allégée, demandes de changement à ouvrir à l'étape 5 (empreinte, pictogrammes), notes pour l'étape 6, idées reportées complétées.

## À ouvrir au début de l'étape 5 (une demande de changement sur la structure, avant toute validation)
- **Catégories de sources** : ajouter le règlement ONU n° 121 (symboles et couleurs des voyants) et RappelConso (rappels), comme sources de première main ; les libellés des codes défaut restent une source secondaire (voir plus bas).
- **Plusieurs marques par verdict** : contrôle automatique du nombre de marques distinctes parmi les notices citées par chaque ligne de la base voyants, nombre et liste fixés par Houssem.
- **Registre et citations** : marque de chaque notice au registre ; chaque source citée par une ligne de la base avec sa page ou section et son extrait (contrôlés), pour que la porte de l'étape 5 soit vérifiable.
- **Niveaux de verdict et d'urgence** : une grille qui fait passer de la formulation de la notice au verdict et à l'urgence, avec une définition de chaque niveau pour le lecteur, et le contrôle de leur cohérence (ex. « arrêt immédiat » avec l'urgence « aucune » est refusé).
- **Encadré de décision** : repère `data-encadre-decision` contrôlé dans la page construite (premier bloc après le H1, aucun emplacement publicitaire avant) ; empreinte étendue à la question de décision et au coût probable.
- **Données structurées** : libellé court (fil d'Ariane, ancres), texte alternatif de l'image, lien du profil auteur.
- **Codes défaut** : libellés en source secondaire (norme ISO 15031-6 non achetée) ; le verdict vient des notices et de la ligne « voyant moteur ».
- **Empreinte de validation** : verrouiller aussi la situation (et `voyant_lie`) des lignes saisies, et la situation, la couleur et le nom des lignes de la base voyants. Aujourd'hui, on peut changer la situation d'une ligne ou la couleur d'un voyant sans revalidation. Accents et ponctuation ignorés, pour qu'une coquille ne force pas de revalidation ; aligner la règle 4 de 08. Coût nul tant que la base est vide.
- **Pictogrammes** : champ `pictogramme` dans la base voyants (un symbole partagé par plusieurs états), contrôle du fichier SVG, et dessin d'environ 15 à 20 symboles redessinés avant la vague A.

## Pour l'étape 6
- Charte éditoriale : base de calcul du coût probable et ses tranches (la source doit exister dans le registre), ligne de transparence, section méthode de « à propos ».
- Gravité lisible sans la seule couleur (obligatoire, 03 v4) et lien « Signaler une erreur » dans chaque modèle.
- Brief de chaque page généré depuis le plan, avec les résultats Google relevés depuis la France.
- Proposition, à décider : photos réelles pour les tutos des vagues B et C.
- Contrôles peu coûteux : title, H1 ou description en double entre deux pages ; dates incohérentes (la cohérence entre verdict et urgence est avancée à l'étape 5).
- Élément unique en outil quand la réponse tient en un chiffre (usure, date de fabrication, délai de contre-visite), car l'aperçu IA la donne sans clic.
- Avant rédaction : comparer les résultats Google de « voyant orange voiture » (outil) et « voyant moteur orange » ; titre des fumées avec la fumée noire, titre du bruit moteur avec le claquement.
- Volumes à lire comme des plafonds : dossier PureTech (94 % de noms de moteur ou de modèle), viscosités (surtout intention d'achat), outil voyants (30 % de requêtes « + modèle »), batterie (34 % d'achat par capacité).

## Points ouverts (non bloquants)
- **Requêtes absentes de 06** : une vingtaine de requêtes suggérées en premier par Google n'y figurent pas (« voyant moteur rouge », « fumée blanche voiture », « voiture qui fume blanc / noir », « pourquoi ma voiture chauffe », « direction assistée », « fap bouché », « puretech fiabilité / avis / chaîne »…). Toutes relèvent de pages prévues. Mesure reportée par Houssem ; à faire juste avant l'étape 8 (03 v3), avec le rattachement des requêtes identiques classées hors périmètre (« liquide de frein », « liquide de refroidissement », « gonfler pneu voiture » et environ 38 lignes), dans une seule demande de changement.
- **Statut et AdSense** : AdSense paie en Tunisie par virement. Le statut juridique reste à trancher avant de rédiger les mentions légales (étape 7), et il faut vérifier que l'activité déclarée du statut d'auto-entrepreneur couvre des recettes publicitaires.
- **Règlement européen sur l'IA (article 50)** : obligation de signaler un texte généré par IA qui informe le public sur une question d'intérêt public, sauf relecture humaine et responsabilité éditoriale. Il est incertain que la relecture des seuls encadrés, avec la responsabilité éditoriale de Houssem, suffise à cette exception ; la ligne de transparence sur chaque page devrait couvrir l'obligation de signalement. Sa portée pour un éditeur établi en Tunisie reste aussi incertaine.
- **OVH** : activer la double authentification sur le compte ; vérifier que le renouvellement du domaine est automatique et activer le verrou de transfert. Le tout est vérifié à la porte de l'étape 9 (03 v4).
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
- Frais kilométriques : décision en décembre 2026 (aligné sur 02).
- Pages « thème » : non retenues à l'étape 4 ; à réévaluer quand les thèmes compteront plus de pages.
- Alertes présentes dans 06, hors périmètre (revue globale du 23/10) : voiture qui tremble (≈ 5 056 / mois), périodicité du contrôle technique (≈ 9 480), boîte de vitesse (≈ 3 476), bruit de courroie (≈ 2 212), embrayage qui patine (≈ 1 264). À réévaluer avec les données de Search Console.
- Étape 7 : `fetch-depth: 0` dans la CI si `date_modification` est tirée de l'historique Git.
- Réglages SEO et Cloudflare : robots d'IA, Bot Fight Mode, Rocket Loader, IndexNow, redirections, canonical et recette hors production sont désormais inscrits aux étapes 7 et 9 de 03 v4. Restent à appliquer en rédaction : outil voyants lisible sans JavaScript ; plan du site avec la date de dernière modification réelle.

## Demandes de changement
- 23/10/2026, acceptée : 08 v2, ajout du champ facultatif `voyant_lie` dans une ligne de situation saisie. Raison : relier la ligne à son voyant pour la comparer à la base. Impact : schémas déjà conformes (PR #1). Contrôles : CI verte.
- 23/10/2026, acceptée : n° 1 de l'étape 4, les liens passent dans le plan du site (08 v3). Raison : 08 fait du plan la référence du maillage, mais son schéma n'avait pas de champ pour les liens. Impact : aucune page n'existait ; schémas, contrôles, tests et 08 mis à jour (PR #3). Contrôles : CI verte.
- 23/10/2026, acceptée : n° 2 de l'étape 4, précision de 5 lignes de 05 (1 580 recherches par mois), qui contredisait leur propre sous-thème. Les mots-clés ne changent pas. Impact : 05 v2 (PR #3). Contrôles : porte de l'étape 4.
