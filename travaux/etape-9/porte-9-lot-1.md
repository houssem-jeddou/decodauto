# Porte de l'étape 9, premier lot : critères et preuves (14/11/2026)

> Paquet de porte préparé par Claude le 14/11/2026, à valider par Houssem. Critères : `docs/03`, ligne de l'étape 9 (v14) ; la recette et la porte 8 du lot sont dans `paquet-lot-1.md` (deux revues indépendantes, 11/11). 03 : « L'étape est terminée à la mise en ligne du premier lot » ; les lots suivants repassent la porte 8 et la recette avant chaque fusion.

## Critères « Avant »

| Critère | Preuve | Statut |
|---|---|---|
| Go / no-go | « Go, fusionne la PR #35 », Houssem, 12/11 (8 h 39) ; PR #35 fusionnée par commit de fusion (f69543a) | Validé |
| Double authentification Google, GitHub, OVH, Cloudflare | Déclaration de Houssem, 11/11 (21 h 09) ; l'API GitHub ne montre pas ce réglage au jeton de Claude | Validé (sur déclaration) |
| Verrou de transfert du domaine | RDAP de Verisign, 11/11 : `client transfer prohibited`, `client delete prohibited` | Validé |
| Contrôle de la CI qui refuse un commit de `main` hors pull request | Job « Origine des commits de main » vert sur `main` : run 43176846306 (12/11, déploiement du lot), run 43405189518 (13/11, PR #37) | Validé |

## Premier lot

Accueil, mentions légales (politique de confidentialité comprise), « à propos », loi montagne : en ligne depuis le 12/11 (8 h 43), PR #35 ; correction de la date du balisage le 13/11 (PR #37, run 43405189518 : tous les jobs verts, déploiement et production compris).

## Critères « Après le déploiement »

| Critère | Preuve | Statut |
|---|---|---|
| `X-Robots-Tag` et balise robots en production | Job « Production en ligne » vert sur `main` (runs 43176846306 au second passage, 43405189518) ; relecture des 4 pages le 12/11 à 17 h : aucun noindex, ni en-tête ni balise | Validé |
| `robots.txt` servi identique au dépôt | Même job (PROD-ROBOTS) | Validé |
| Réglages Cloudflare vérifiés | Lus le 14/11 vers 11 h 15 dans l'API du tableau de bord (Chrome de Houssem, lecture seule) : Rocket Loader désactivé ; « Always Use HTTPS » activé ; Bot Fight Mode désactivé ; robots d'IA non bloqués (`ai_bots_protection` désactivé, aucun blocage d'entraînement, de recherche ni d'agent) ; `robots.txt` non géré par Cloudflare ; Web Analytics : règle d'injection désactivée ; redirection 301 de `www` vers le domaine (règle active, chemin et paramètres conservés) ; aucune Page Rule ; Crawler Hints activé (13/11, 10 h 39) ; masquage des adresses électroniques désactivé | Validé |
| Plan du site soumis à Search Console et à Bing | 12/11 (17 h 33) : Google « Opération effectuée », 4 pages ; Bing « Success », 4 pages | Validé |
| Inspection d'URL lancée pour les pages du lot | 12/11 : indexation demandée pour les 4 adresses (test en direct : indexables) ; 4 adresses envoyées à Bing | Validé |
| Pages explorées sans erreur | Inspection d'URL de Search Console, 14/11 vers 11 h 20 : « Cette URL est sur Google » pour l'accueil, « à propos » et les mentions légales ; loi montagne indexée le 13/11. Le rapport « Indexation des pages » n'est pas encore à jour (il montre l'état d'avant le go) : il se relit au suivi du 19/11 | Validé |
| Règle 14 (indexation durable) active | Contrôles INDEXATION-*, ADRESSE-SANS-REDIRECTION, REDIRECTION-*, DATE-*, TITRE-* verts sur chaque pull request et dans « origine-main » avant chaque déploiement (runs ci-dessus) | Validé |
| Données structurées | Test des résultats enrichis de Google, 13/11 : Article et fil d'Ariane valides sur `/loi-montagne/` (date avec fuseau corrigée par la PR #37) ; validateur de schema.org sur l'accueil, 14/11 : WebSite, 0 erreur, 0 avertissement | Validé |

## Ce qui suit la porte

- Suivi à J+7 (19/11) et J+14 (26/11) : rapport « Indexation des pages », inspection des 4 adresses, rubrique IndexNow de Bing (notifications de Crawler Hints, non garanties pour un site servi par Workers).
- Revérification mensuelle du Journal officiel pour la loi montagne (décret de sanction annoncé) : au plus tard le 12/12.
- Lots suivants : porte 8 du lot et recette de cette étape avant chaque fusion (03, étape 9).

## À valider par Houssem

1. La porte 9 du premier lot, sur ces preuves.
2. Le tag, s'il le souhaite : `etape-9-premier-lot` sur le commit en ligne et vérifié, `782c62598d04049f9dfae9f915c220b5eaec76b5` (PR #37), par le formulaire de release pré-rempli : https://github.com/houssem-jeddou/decodauto/releases/new?tag=etape-9-premier-lot&target=782c62598d04049f9dfae9f915c220b5eaec76b5
