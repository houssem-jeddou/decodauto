# Porte de l'étape 9, premier lot : critères et preuves (14/11/2026)

> Paquet de porte préparé par Claude le 14/11/2026, à valider par Houssem. Critères : `docs/03`, ligne de l'étape 9 (v14) ; la recette et la porte 8 du lot sont dans `paquet-lot-1.md` (deux revues indépendantes, 11/11). 03 : « L'étape est terminée à la mise en ligne du premier lot » ; les lots suivants repassent la porte 8 et la recette avant chaque fusion.

## Critères « Avant »

| Critère | Preuve | Statut |
|---|---|---|
| Go / no-go | « Go, fusionne la PR #35 », Houssem, 12/11 (8 h 39) ; PR #35 fusionnée par commit de fusion (f69543a) | Validé |
| Double authentification Google, GitHub, OVH, Cloudflare | Déclaration de Houssem, 11/11 (21 h 09). Cloudflare **vérifié** le 14/11 dans l'API du tableau de bord (`GET /user` : `two_factor_authentication_enabled` = true). Google, GitHub et OVH : réglage non lisible par Claude (le jeton GitHub ne le montre pas ; pas de lecture faite chez Google et OVH) | Validé (Cloudflare vérifié ; trois comptes sur déclaration) |
| Verrou de transfert du domaine | RDAP de Verisign, 11/11 : `client transfer prohibited`, `client delete prohibited` | Validé |
| Contrôle de la CI qui refuse un commit de `main` hors pull request | Job « Origine des commits de main » vert sur `main` : run 43176846306 (12/11, déploiement du lot), run 43405189518 (13/11, PR #37) | Validé |

## Premier lot

Accueil, mentions légales (politique de confidentialité comprise), « à propos », loi montagne : en ligne depuis le 12/11 (8 h 43), PR #35 ; correction de la date du balisage le 13/11 (PR #37, run 43405189518 : tous les jobs verts, déploiement et production compris).

## Critères « Après le déploiement »

| Critère | Preuve | Statut |
|---|---|---|
| `X-Robots-Tag` et balise robots en production | En-tête : job « Production en ligne » vert sur `main` (runs 43176846306 au second passage, 43255053074, 43405189518 ; il lit l'en-tête de l'accueil). Balise : IDX-META-ABSENTE / IDX-META-PRESENTE sur le site construit et déployé (job « Contrôles » des mêmes runs). Relecture des 4 pages en ligne le 14/11 vers 11 h 40, après la PR #37 (Chrome de Houssem) : statut 200, aucun `X-Robots-Tag`, aucune balise robots, aucun script, canonical correcte, `dateModified` avec fuseau | Validé |
| `robots.txt` servi identique au dépôt | Même job (PROD-ROBOTS) | Validé |
| Réglages Cloudflare vérifiés | Lus le 14/11 vers 11 h 15 dans l'API du tableau de bord (Chrome de Houssem, lecture seule) : Rocket Loader désactivé ; « Always Use HTTPS » activé ; Bot Fight Mode désactivé ; robots d'IA non bloqués (`ai_bots_protection` désactivé, aucun blocage d'entraînement, de recherche ni d'agent) ; `robots.txt` non géré par Cloudflare ; Web Analytics : règle d'injection désactivée ; redirection 301 de `www` vers le domaine (règle active, chemin et paramètres conservés) ; aucune Page Rule ; Crawler Hints activé (13/11, 10 h 39) ; masquage des adresses électroniques désactivé | Validé |
| Plan du site soumis à Search Console et à Bing | 12/11 (17 h 33) : Google « Opération effectuée », 4 pages ; Bing « Success », 4 pages | Validé |
| Inspection d'URL lancée pour les pages du lot | 12/11 : indexation demandée pour les 4 adresses (test en direct : indexables) ; 4 adresses envoyées à Bing | Validé |
| Pages explorées sans erreur | Inspection d'URL de Search Console, 14/11 vers 11 h 20 : « Cette URL est sur Google » pour l'accueil, « à propos » et les mentions légales ; loi montagne indexée le 13/11. Le rapport « Indexation des pages » n'est pas encore à jour (il montre l'état d'avant le go) : il se relit au suivi du 19/11 | Validé |
| Règle 14 (indexation durable) active | Contrôles INDEXATION-*, ADRESSE-SANS-REDIRECTION, REDIRECTION-*, DATE-*, TITRE-*, FAVICON-* verts sur chaque pull request et dans « origine-main » avant chaque déploiement (runs 43176846306, 43255053074, 43405189518) | Validé |
| Données structurées | Test des résultats enrichis de Google relancé le 14/11 (exploration à 11 h 42, après la PR #37) sur `/loi-montagne/` : Article et fil d'Ariane valides ; un seul problème non critique, « Champ "image" manquant (facultatif) » (choix du 10/11) ; l'avertissement sur la date sans fuseau a disparu. Validateur de schema.org sur l'accueil, 14/11 : WebSite, 0 erreur, 0 avertissement | Validé |

## Ce qui suit la porte

- Suivi à J+7 (19/11) et J+14 (26/11) : rapport « Indexation des pages », inspection des 4 adresses, rubrique IndexNow de Bing (notifications de Crawler Hints, non garanties pour un site servi par Workers).
- Revérification mensuelle du Journal officiel pour la loi montagne (décret de sanction annoncé) : au plus tard le 12/12.
- Lots suivants : porte 8 du lot et recette de cette étape avant chaque fusion (03, étape 9).

## Reports d'après la mise en ligne, à trancher (03, étape 9 ; journal)

Aucun ne bloque la porte ; chacun garde son risque. Recommandation de Claude, conforme à ta décision du 09/11 (rien de non obligatoire ne bloque l'avancement ; à trancher une fois le site construit) :
- **GitHub Pro et branche `main` protégée**, avec la question du **compte GitHub séparé pour Claude** : à trancher à l'étape 12, avant la demande AdSense. D'ici là, le garde-fou de la CI (« origine-main ») couvre l'accident, pas un compte compromis ; le risque croît avec le nombre de fusions. Prix à relire sur la page officielle de GitHub au moment de décider.
- **Double authentification Microsoft (Bing)** : à l'étape 12 ; risque : perte de l'accès aux statistiques de Bing, rien n'est publié depuis ce compte.
- **Renouvellement automatique du domaine** : à activer chez OVH à l'étape 12, au plus tard le 01/09/2027 (échéance 22/10/2027).
- **Questions RGPD** (représentant dans l'Union, transferts, statistiques de Cloudflare) : avant la demande AdSense (étape 12), comme décidé le 11/11.

## Note

`paquet-lot-1.md` garde l'état du 11/11 (lignes de validation « à écrire », Journal officiel « non fait ») : ces points sont faits depuis le 12/11 (journal, historique des décisions), qui fait foi.

## À valider par Houssem

1. La porte 9 du premier lot, sur ces preuves.
2. Le tag, à poser par toi (règle 3 : chaque version validée est marquée ; Claude ne crée pas de tag) : `etape-9-premier-lot` sur le commit en ligne et vérifié, `782c62598d04049f9dfae9f915c220b5eaec76b5` (PR #37), par le formulaire de release pré-rempli : https://github.com/houssem-jeddou/decodauto/releases/new?tag=etape-9-premier-lot&target=782c62598d04049f9dfae9f915c220b5eaec76b5

## Revue indépendante (une)

« Acceptable », rien de bloquant ; un important, sept mineurs. **Changé** : reports d'après la mise en ligne ajoutés, avec recommandation et échéance ; run 43255053074 ajouté ; balise robots prouvée par IDX-META-* et relecture en ligne du 14/11 après la PR #37 ; test des résultats enrichis relancé après la PR #37 ; double authentification de Cloudflare vérifiée dans l'API ; FAVICON-* ajouté ; note sur `paquet-lot-1.md` ; tag « à poser par Houssem ». **Non vérifiable par le relecteur** : les constats faits dans le navigateur (réglages Cloudflare, Search Console, résultats enrichis, validateur), la double authentification et le RDAP du 11/11 ; le site en ligne (refusé par le proxy de la session).
