# Journal d'avancement — site voiture

Ce fichier est l'état de référence du projet. Il est remplacé en entier à la fin de chaque session ayant produit une validation ou une décision.

Dernière mise à jour : 23/10/2026 (10 h 30)

## État des étapes
| # | Étape | Statut | Livrable de référence |
|---|---|---|---|
| 1 | Mots-clés | ✅ Figée (22/10) | 05_mots_cles_perimetre.csv (source de vérité), 06_base_mots_cles_complete.csv ; base Excel v1.1 conservée hors projet par Houssem |
| 2 | Périmètre | ✅ Figé (22/10) | 02_perimetre_lot_unique.md |
| 3 | Fondations | ✅ Validée par Houssem (23/10) · tag `etape-3-fondations` | 08_structure_contenus_v2.md ; dépôt github.com/houssem-jeddou/decodauto ; site https://decodauto.com |
| 4 | Plan du site | ▶ Prochaine étape | – |
| 5 | Sources et base voyants | À faire | – |
| 6 | Charte et modèles de pages | À faire | – |
| 7 | Socle technique | À faire | – |
| 8 | Vague A | À faire | – |
| 9 | Recette et mise en ligne A | À faire | – |
| 10 | Vague B | À faire | – |
| 11 | Vague C | À faire | – |
| 12 | Boucle mensuelle | À faire | – |

## Étape 3, Fondations : livrables
- [x] **Nom de domaine : decodauto.com.**
  - Enregistré le 22/10/2026 chez OVH SAS (registre Verisign), avec expiration le 22/10/2027.
  - Marques : aucune antériorité trouvée sur TMview (qui couvre l'INPI et l'EUIPO).
  - Aucune marque de constructeur dans le nom.
  - Protection des données et protection contre le transfert : actives.
- [x] **Choix technique et hébergement**, validé le 22/10 :
  - Astro statique ;
  - Cloudflare gratuit, avec le DNS chez Cloudflare (serveurs piotr et sierra) ;
  - dépôt GitHub privé dédié ;
  - Claude Code en sessions cloud ;
  - déploiement par GitHub Actions, seulement si les contrôles sont verts.
- [x] **Structure des contenus** : 08 v1 validée le 22/10. Elle passe en v2 le 23/10 avec l'ajout du champ `voyant_lie`, demande de changement acceptée par Houssem.
  - Transposée en schémas et contrôles automatiques dans le dépôt (PR #1).
- [x] **Dépôt Git distant privé** : github.com/houssem-jeddou/decodauto.
  - PR #1 « Fondations » fusionnée le 23/10 après deux revues indépendantes du code.
  - Elle contient :
    - le squelette Astro ;
    - les schémas du 08 ;
    - le script de contrôle et 34 pages de test ;
    - la non-indexation à double clé ;
    - la configuration Cloudflare ;
    - la CI ;
    - le fichier CLAUDE.md.
- [x] **Search Console et Bing** (23/10) :
  - Google Search Console : propriété de type Domaine validée par Cloudflare (enregistrement TXT de Google).
  - Bing Webmaster Tools : site importé depuis Search Console.

## Étape 3 : porte de sortie (vérifiée et validée le 23/10)
| Critère | Statut | Preuve |
|---|---|---|
| Site vide en ligne | ✅ | https://decodauto.com/ répond 200, avec la page « bientôt en ligne » (vérifié dans le navigateur le 23/10 vers 10 h) |
| Non indexable | ✅ | Toutes les pages portent l'en-tête `X-Robots-Tag: noindex` et la balise meta noindex. robots.txt indique « Allow: / », sans Disallow. Aucune variable SITE_INDEXABLE n'est définie et config/indexation.json vaut false. |
| Vraies erreurs 404 | ✅ | Une adresse inconnue répond 404, avec la page « Page introuvable » |
| Contrôles automatiques au vert | ✅ | Run GitHub 39923534254 (commit 9c46886) : contrôles, Lighthouse mobile, secrets et déploiement Cloudflare réussis. Résultat : 0 erreur, 0 alerte, mode « non indexable ». |
| Revue indépendante d'ensemble | ✅ | 23/10 : rien de bloquant (apports ci-dessous) |
| Validation de Houssem | ✅ | 23/10/2026 |

## Décisions ouvertes (à trancher par Houssem)
- **Relecteur :** mécanicien payé, ou uniquement des sources officielles citées. À trancher avant l'étape 5 ; ce choix décide aussi si les pages affichent « relu par ».
- **Statut** pour les mentions légales, et encaissement d'AdSense depuis la Tunisie.

## Historique des décisions
- 22/10/2026 : niche voiture retenue ; base de mots-clés v1.1 figée ; périmètre lot unique figé (~42 pages + outil voyants, 4 thèmes) ; électrique hors périmètre ; pas d'achat de lecteurs OBD ; plan d'avancement validé avec publication en 3 vagues.
- 22/10/2026 (soir) : nom de domaine decodauto.com (en .com, car le .fr est réservé aux résidents de l'UE) ; choix de la stack ; création du dépôt ; ajout du domaine à Cloudflare ; structure des contenus validée. Coût probable : échelle fermée en ordres de grandeur, avec une base de calcul sourcée, sans prix d'enseigne ni de prestation ; tranches fixées à l'étape 6.
- 23/10/2026 : porte de sortie de l'étape 3 validée par Houssem. Les schémas du dépôt font foi pour la structure des contenus (le 08 est archivé comme référence). Le projet Claude fait foi pour les documents, et docs/ du dépôt en est la copie mise à jour à chaque validation par PR (CLAUDE.md et docs/README.md corrigés). Tag `etape-3-fondations` posé sur la version validée.
- 23/10/2026 : PR #1 fusionnée ; 08 v2 (`voyant_lie`) acceptée ; secrets Cloudflare ajoutés dans GitHub ; enregistrements A d'OVH supprimés (MX et TXT de la messagerie conservés) ; premier déploiement réussi ; Search Console et Bing ajoutés.

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

## Points ouverts (non bloquants)
- **OVH** : activer la double authentification sur le compte ; vérifier que le renouvellement du domaine est automatique.
- **DNSSEC** : désactivation chez OVH en cours. Au 23/10, aucun enregistrement DS n'est publié pour decodauto.com.
- **Application GitHub de Claude** : une demande de mise à jour des permissions attend la décision de Houssem.
- **Contrôle hebdomadaire** : il n'a encore jamais tourné. Premier passage le lundi 26/10.
- **Images GitHub Actions** : `ubuntu-latest` passe à Ubuntu 26. Risque faible, car la version de Node est fixée.

## Idées reportées
- Ancien lot 2 (codes OBD supplémentaires, batterie et pression par modèle, freins, distribution, embrayage, AdBlue, Crit'Air, voiture qui tremble…) : à réévaluer avec les données de Search Console.
- Frais kilométriques : décision avant février 2027.
- Pages « thème » générées automatiquement (une par thème) pour le maillage interne : à examiner à l'étape 4.
- Réglages SEO et Cloudflare pour les étapes 7 et 9 :
  - **Robots d'IA** : ne jamais bloquer l'entraînement « sur les pages avec pub » (Googlebot et Bingbot sont classés comme robots mixtes). Autoriser « Recherche » et « Agent ». Désactiver « Bot Fight Mode ».
  - **Redirections** : 301 de www vers le domaine nu, et de http vers https ; canonical sur chaque page.
  - **Recette** : sur staging.decodauto.com protégé, jamais de vraie page en noindex en production.
  - **Outil voyants** : lisible sans JavaScript.
  - **Indexation** : IndexNow pour Bing ; plan du site avec la date de dernière modification réelle.
  - **Rocket Loader** : à ne pas activer.

## Demandes de changement
- 23/10/2026, acceptée : 08 v2, ajout du champ facultatif `voyant_lie` dans une ligne de situation saisie. Raison : relier la ligne à son voyant pour la comparer à la base. Impact : schémas déjà conformes (PR #1). Contrôles : CI verte.
