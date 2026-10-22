# Journal d'avancement — site voiture

Ce fichier est l'état de référence du projet. Il est remplacé en entier à la fin de chaque session ayant produit une validation ou une décision.

Dernière mise à jour : 22/10/2026 (23 h 45)

## État des étapes
| # | Étape | Statut | Livrable de référence |
|---|---|---|---|
| 1 | Mots-clés | ✅ Figée (22/10) | 05_mots_cles_perimetre.csv (source de vérité), 06_base_mots_cles_complete.csv ; base Excel v1.1 conservée hors projet par Houssem |
| 2 | Périmètre | ✅ Figé (22/10) | 02_perimetre_lot_unique.md |
| 3 | Fondations | ▶ En cours (démarrée le 22/10) | Ce journal ; 08_structure_contenus_v1.md ; dépôt github.com/houssem-jeddou/decodauto |
| 4 | Plan du site | À faire | – |
| 5 | Sources et base voyants | À faire | – |
| 6 | Charte et modèles de pages | À faire | – |
| 7 | Socle technique | À faire | – |
| 8 | Vague A | À faire | – |
| 9 | Recette et mise en ligne A | À faire | – |
| 10 | Vague B | À faire | – |
| 11 | Vague C | À faire | – |
| 12 | Boucle mensuelle | À faire | – |

## Étape en cours : livrables
Étape 3, Fondations.
- [x] **Nom de domaine : decodauto.com, acquis.**
  - Enregistré le 22/10/2026 (registraire OVH SAS, registre Verisign), expiration le 22/10/2027.
  - Facture OVHcloud Tunisie de 33,080 DT TTC, payée.
  - Protection des données personnelles et protection contre le transfert : actives.
- [x] **Choix technique et hébergement (validé le 22/10) :**
  - Stack : Astro, site statique.
  - Hébergement : Cloudflare, plan gratuit, DNS du domaine chez Cloudflare.
  - Code : dépôt GitHub privé dédié, développé avec Claude Code en sessions cloud.
  - Déploiement : depuis GitHub, uniquement si les contrôles automatiques sont au vert.
  - Coût : 0 € hors domaine.
- [x] **Dépôt Git distant privé : github.com/houssem-jeddou/decodauto** (créé le 22/10).
  - Privé, avec un README.
  - L'application GitHub de Claude y a accès (installée sur « tous les dépôts »).
  - Une demande de mise à jour de ses permissions est en attente : à accepter ou non par Houssem.
- [x] **Cloudflare : decodauto.com ajouté au plan gratuit (22/10).**
  - Robots « Recherche », « Agents » et « Entraînement » autorisés.
  - Case « je monétise avec des pubs » laissée décochée.
  - Enregistrements DNS d'OVH importés tels quels.
  - Chez OVH, faits par Houssem le 22/10 :
    - serveurs DNS remplacés par piotr.ns.cloudflare.com et sierra.ns.cloudflare.com ;
    - DNSSEC en cours de désactivation (environ 24 h).
  - Activation du domaine chez Cloudflare : à vérifier le 23/10.
- [x] **Structure des contenus** : validée le 22/10. Source de vérité : 08_structure_contenus_v1.md, jusqu'à sa transformation en schémas dans le dépôt par Claude Code.
- [ ] Search Console et Bing (après activation du domaine chez Cloudflare)
- [ ] Site vide en ligne, non indexable, contrôles automatiques au vert (avec Claude Code ; prévoir une clé de déploiement Cloudflare enregistrée dans GitHub)

### Actions de Houssem
- Plus tard : activer la double authentification sur le compte OVH, et vérifier que le renouvellement du domaine est automatique.

## Décisions ouvertes (à trancher par Houssem)
- **Relecteur :** mécanicien payé, ou uniquement des sources officielles citées. À trancher avant l'étape 5 ; cela décide aussi si les pages affichent « relu par ».
- **Statut** pour les mentions légales ; encaissement d'AdSense depuis la Tunisie.

## Historique des décisions
- 22/10/2026 : niche voiture retenue ; base de mots-clés v1.1 figée ; périmètre lot unique figé (~42 pages + outil voyants, 4 thèmes) ; électrique hors périmètre ; pas d'achat de lecteurs OBD ; plan d'avancement validé avec publication en 3 vagues.
- 22/10/2026 (soir) : nom de domaine choisi, decodauto.com (.com car le .fr est réservé aux résidents de l'UE).
- 22/10/2026 (soir) : stack validée : Astro statique, Cloudflare gratuit, dépôt GitHub privé dédié, Claude Code en sessions cloud, déploiement conditionné aux contrôles.
- 22/10/2026 (soir) : dépôt GitHub créé ; domaine ajouté à Cloudflare ; serveurs DNS basculés vers Cloudflare.
- 22/10/2026 (soir) : structure des contenus validée (08). Coût probable : échelle fermée en ordres de grandeur, avec une base de calcul sourcée, sans prix d'enseigne ni de prestation. Les tranches seront fixées à l'étape 6.

## Revues indépendantes : ce qu'elles ont changé
- 22/10 : instructions du projet revues (champ de la revue précisé, format anti-complaisance avec preuves, deux revues maximum, alignement avec 03 et 04, rythme de mise à jour du journal).
- 22/10 (soir), choix technique, deux revues :
  - **1re revue :** un point bloquant. Le déploiement automatique de Cloudflare partait même avec des contrôles en échec, et GitHub gratuit ne peut pas bloquer une fusion en dépôt privé. Le déploiement passe donc par GitHub Actions, conditionné aux contrôles.
  - **2e revue (angle SEO) :** la stack est confirmée, sans impact négatif sur le référencement. Réglages Cloudflare à traiter plus tard (voir « Idées reportées »).
- 22/10 (soir), structure des contenus, trois revues (la 3e faite à la demande de Houssem, au-delà de la règle des deux revues, sous l'angle de l'optimisation) :
  - **Deux points bloquants corrigés :**
    - l'encadré décision devient une liste de situations, et les verdicts des voyants viennent de la base voyants ;
    - les sources sont des identifiants du registre (étape 5), jamais recopiées dans les pages.
  - **Autres apports :**
    - « question de décision » obligatoire ;
    - empreinte du verdict validé ;
    - composants vérifiés à la construction ;
    - types alignés sur les modèles de 03 ;
    - date de modification réelle ;
    - fiche auteur.
  - **2e revue :** un point bloquant corrigé. Le voyant température est traité dans la page surchauffe (type Panne) : tout type de page peut désormais déclarer des voyants, dont les verdicts viennent de la base. Ajouts : listes fermées, règles de blocage, champs SEO, format tutoriel.
  - **3e revue :** colonne « action » ajoutée dans chaque situation (le « quoi faire » de la règle 2 de 01) ; requête principale calculée ; étapes des tutoriels écrites dans le texte.

## Idées reportées
- Ancien lot 2 (codes OBD supplémentaires, batterie et pression par modèle, freins, distribution, embrayage, AdBlue, Crit'Air, voiture qui tremble…) : à réévaluer avec les données de Search Console.
- Frais kilométriques : décision avant février 2027.
- Réglages SEO et Cloudflare à traiter aux étapes 7 et 9, relevés par la revue SEO du 22/10 :
  - **Robots d'IA :** ne jamais bloquer l'entraînement « sur les pages avec pub », car Cloudflare classe Googlebot et Bingbot comme robots mixtes et les bloquerait. Autoriser les robots « Recherche » et « Agent ». Désactiver « Bot Fight Mode ».
  - **Adresses :** un seul format d'URL (barre finale) ; canonical sur chaque page ; redirections 301 de www et de http.
  - **Noindex :** recette sur staging.decodauto.com protégé ; jamais de vraie page en noindex en production ; contrôle automatique dans les deux sens.
  - **Outil voyants :** lisible dans le HTML sans JavaScript (images avec texte descriptif, liens).
  - **Indexation :** IndexNow pour Bing ; Search Console par DNS ; plan du site avec la date de dernière modification réelle de chaque page.
  - **Erreurs et vitesse :** vraies 404 ; pas de Rocket Loader.

- Pages « thème » générées automatiquement (une par thème) pour renforcer le maillage interne : à examiner à l'étape 4 (plan du site).

## Demandes de changement
Aucune.
