# Plan d'avancement et règles anti-régression — site voiture

Plan validé le 22/10/2026 (après revue indépendante). L'état réel d'avancement est dans 04_journal_avancement.md.

## Règles anti-régression (non négociables)
1. **Une source de vérité par sujet.** Mots-clés et périmètre : 02_perimetre_lot_unique.md et 05_mots_cles_perimetre.csv (issus de la base Excel v1.1). Chaque étape crée sa propre source (plan du site, registre des sources, base voyants, charte éditoriale). Tout le reste en découle ; rien n'est recopié à la main.
2. **Une porte de sortie par étape** : critères mesurables vérifiés avec preuve + revue par un agent indépendant + validation de Houssem. On ne passe pas à l'étape suivante sans. Une date ne justifie jamais d'alléger une porte. La revue de porte s'appuie sur les revues déjà faites par livrable et vérifie surtout l'ensemble.
3. **Tout est versionné**, à partir de l'étape 3, dans un dépôt Git distant et privé. Chaque version validée est marquée (tag). Retour arrière toujours possible.
4. **Contrôles automatiques cumulatifs** : chaque règle vérifiable par une machine devient un test lancé à chaque modification (liens cassés, une seule page par intention, source et verdict présents, date de revue, performance, stabilité de page…). Les autres règles vont dans la liste de recette.
5. **Ce qui est figé ne bouge pas** sans une demande de changement explicite (voir plus bas).
6. **La base voyants est la seule source** des couleurs, gravités, verdicts et sources des voyants : l'outil et les pages voyants en sont générés.
7. **Houssem valide les verdicts de sécurité**, pas la prose. Chaque page porte : sources, verdict, niveau de sécurité, date de revue, relecteur.
8. **Revue indépendante avant toute présentation** de ce qui sera validé, figé ou publié (voir la règle n°1 des instructions du projet : format, preuves, deux revues au maximum).
9. **Demandes hors étape ou hors périmètre** : notées dans « Idées reportées » du journal, ou traitées par une demande de changement.

## Étapes
| # | Étape | Livrable | Porte de sortie | Date |
|---|---|---|---|---|
| 1 | Mots-clés | Base Excel v1.1 | Figée | ✅ 22/10 |
| 2 | Périmètre | Périmètre lot unique | Figé | ✅ 22/10 |
| 3 | Fondations | Nom de domaine et marque vérifiés, choix technique et hébergement, structure des contenus (champs de chaque type de page), dépôt Git distant privé, Search Console et Bing | Site vide en ligne et non indexable, contrôles automatiques au vert | 23/10 |
| 4 | Plan du site | Chaque mot-clé du périmètre rattaché à une seule page ; adresses (URL), hiérarchie des 4 thèmes, liens entre pages | 100 % des mots-clés rattachés, zéro doublon d'intention (vérifié par script), revue indépendante | 23–24/10 |
| 5 | Sources et base voyants | Registre des sources de première main ; base voyants unique (couleur, catégorie, gravité, verdict, source) | Chaque voyant a couleur, gravité et verdict sourcés ; validation de Houssem | 24/10 |
| 6 | Charte et modèles de pages | Charte éditoriale ; un modèle par type (voyant, code, panne, fluide, pneus, dossier) avec un exemple rédigé | Exemples validés par Houssem (et le relecteur s'il y en a un) | 24–25/10 |
| 7 | Socle technique | Mentions légales, consentement certifié Google (AdSense en Europe), mesure d'audience exemptée de consentement, plan du site pour Google, données structurées utiles (Article, fil d'Ariane, auteur), emplacements publicitaires réservés | Lighthouse mobile ≥ 95, stabilité de page (CLS) < 0,1 avec emplacements pub, contrôles au vert | 25/10 |
| 8 | Vague A | Outil et guide voyants, 11 voyants, 5 codes OBD, pression des pneus, loi montagne, pages du socle (≈ 22 pages) | Faits vérifiés sur sources, verdicts validés, contrôles au vert | 26–28/10 |
| 9 | Recette et mise en ligne A | Liste de contrôle SEO, mobile, accessibilité, juridique, liens | Go / no-go le 29/10 ; mise en ligne ≤ 31/10 ; pages explorées sans erreur | 29–31/10 |
| 10 | Vague B | 6 pannes, batterie (organe + 2 tutos), tuto FAP, dossier PureTech (≈ 11 pages) | Mêmes critères que la vague A | ≈ 07/11 |
| 11 | Vague C | Huile (organe, 3 viscosités, niveau), liquide de refroidissement, liquide de frein, usure des pneus, contrôle technique (≈ 9 pages) | Mêmes critères | ≈ 14/11 |
| 12 | Boucle mensuelle | Search Console (impressions, clics, positions), optimisation des pages, demande AdSense quand le site est complet et indexé, revue trimestrielle du dossier PureTech, extensions décidées sur données réelles | – | ensuite |

## Ce qui n'est pas un critère
- Résultats enrichis FAQ et HowTo : Google ne les accorde plus à ce type de site.
- Un score de performance mesuré sans les emplacements publicitaires.

## Déroulé de chaque session de travail
1. Lire 04_journal_avancement.md : étape en cours, décisions ouvertes, ce qui est figé.
2. Annoncer l'étape travaillée et ne travailler que sur elle.
3. Produire le livrable dans un format qui deviendra une source de vérité (fichier).
4. Vérifier la porte de sortie critère par critère, honnêtement (rien n'est « validé » sans preuve).
5. Faire challenger chaque livrable par un agent indépendant avant de le présenter (instructions du projet, règle n°1).
6. À la fin de chaque session où quelque chose a été validé ou décidé : fournir le journal complet mis à jour et la liste des fichiers à charger (nommés NN_nom_vX). Houssem les charge dans le projet et les pousse sur Git.

## Demande de changement (pour tout élément figé)
Format : élément concerné · changement proposé · raison (données) · impact sur les étapes et livrables déjà validés · tests à relancer. Rien n'est appliqué avant l'accord explicite de Houssem ; la décision est inscrite au journal.
