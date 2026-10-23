# Plan d'avancement et règles anti-régression — site voiture

**Versions**
- **v1, 22/10/2026** : plan validé après revue indépendante.
- **v2, 23/10/2026** : décision de Houssem après la revue globale des étapes 1 à 4. Points de mise en ligne inscrits aux étapes 7 à 9, minimum du 31/10 défini, consentement publicitaire déplacé à l'étape 12.
- **v3, 23/10/2026** : décision de Houssem après la revue du planning et des règles. Cinq changements acceptés, plus le refus d'un relecteur extérieur :
  1. méthode de sourçage de l'étape 5 (plusieurs marques, verdict le plus prudent, citation précise, paquet de validation) ;
  2. confiance et transparence ;
  3. une seule piste technique en parallèle ;
  4. données de mots-clés avant la rédaction ;
  5. mise en ligne et suivi : statut avant l'étape 7, recette avant chaque fusion d'un lot de pages des vagues B et C, emplacements publicitaires non affichés avant AdSense, double authentification des comptes, indicateurs et notoriété à l'étape 12.

L'état réel d'avancement et la prévision des étapes sont dans 04_journal_avancement.md.

## Règles anti-régression (non négociables)
1. **Une source de vérité par sujet.** Mots-clés et périmètre : 02_perimetre_lot_unique.md et 05_mots_cles_perimetre.csv, issus de la base Excel v1.1. Chaque étape crée sa propre source : plan du site, registre des sources, base voyants, charte éditoriale. Tout le reste en découle ; rien n'est recopié à la main.
2. **Une porte de sortie par étape** : critères mesurables vérifiés avec preuve, revue par un agent indépendant, validation de Houssem.
   - On ne passe pas à l'étape suivante sans ces trois éléments.
   - Une date ne justifie jamais d'alléger une porte.
   - La revue de porte s'appuie sur les revues déjà faites par livrable et vérifie surtout l'ensemble.
3. **Tout est versionné**, à partir de l'étape 3, dans un dépôt Git distant et privé. Chaque version validée est marquée (tag). Retour arrière toujours possible.
4. **Contrôles automatiques cumulatifs** : chaque règle vérifiable par une machine devient un test lancé à chaque modification (liens cassés, une seule page par intention, source et verdict présents, date de revue, performance, stabilité de page…). Les autres règles vont dans la liste de recette.
5. **Ce qui est figé ne bouge pas** sans une demande de changement explicite (voir plus bas).
6. **La base voyants est la seule source** des couleurs, gravités, verdicts et sources des voyants : l'outil et les pages voyants en sont générés.
7. **Houssem valide, et porte la responsabilité éditoriale du site.**
   - **Les verdicts de sécurité** : il les valide sur un paquet de validation. Pour chaque ligne, le paquet donne la situation, le verdict, l'urgence, l'action, la source citée à la page ou à la section près, et l'extrait cité. Il se valide en une séance. À l'étape 5, le paquet couvre les lignes de la base voyants ; à partir de l'étape 8, les lignes saisies, les faits de sécurité et les chiffres de chaque lot de pages.
   - **L'encadré de décision** de chaque page éditoriale : il le relit avant publication, en plus du verdict en base. L'encadré de décision est le haut de la page : la question de décision, le ou les verdicts, l'urgence, l'action et le coût probable. La preuve de cette relecture est sa validation écrite dans la pull request du lot.
   - **Ce que porte chaque page** : sources, verdict, niveau de sécurité, date de revue.
   - **Pas de relecteur extérieur** (décision du 23/10/2026). La fiabilité repose sur les sources de première main citées et sur la validation de Houssem.
8. **Revue indépendante avant toute présentation** de ce qui sera validé, figé ou publié (voir la règle n° 1 des instructions du projet : format, preuves, deux revues au maximum).
9. **Demandes hors étape ou hors périmètre** : notées dans « Idées reportées » du journal, ou traitées par une demande de changement.
10. **Sourcer pour tous les conducteurs.**
    - Chaque ligne de la base voyants s'appuie sur les notices de plusieurs marques parmi les plus présentes en France. Le nombre et la liste des marques sont fixés au début de l'étape 5.
    - Le verdict le plus prudent l'emporte, et l'écart entre marques est signalé.
    - Chaque citation donne la page ou la section.
11. **Transparence.**
    - L'auteur est identifié : nom réel et parcours, sur la page « à propos ».
    - Chaque page dit en une ligne comment elle est produite : rédaction assistée par une IA, sources de première main, verdicts et encadré de décision vérifiés par Houssem.
    - La méthode détaillée est une section de la page « à propos ».
12. **Une piste technique en parallèle.** On ne travaille que sur l'étape en cours, avec une seule exception.
    - Une seule piste technique à la fois peut avancer en parallèle, si elle ne dépend d'aucun contenu non validé.
    - Elle porte soit l'étape 7 (socle technique), qui a sa propre porte de sortie, soit un livrable technique d'une autre étape, contrôlé à la porte de cette étape : les pictogrammes de l'étape 5, ou la partie technique de l'outil voyants de l'étape 8.
    - Les dates du tableau sont des cibles. La prévision réaliste est tenue dans le journal et mise à jour à chaque session.

## Étapes
| # | Étape | Livrable | Porte de sortie | Cible |
|---|---|---|---|---|
| 1 | Mots-clés | Base Excel v1.1 | Figée | ✅ 22/10 |
| 2 | Périmètre | Périmètre lot unique | Figé | ✅ 22/10 |
| 3 | Fondations | Nom de domaine et marque vérifiés, choix technique et hébergement, structure des contenus (champs de chaque type de page), dépôt Git distant privé, Search Console et Bing | Site vide en ligne et non indexable, contrôles automatiques au vert | ✅ 23/10 |
| 4 | Plan du site | Chaque mot-clé du périmètre rattaché à une seule page ; adresses (URL), hiérarchie des 4 thèmes, liens entre pages | 100 % des mots-clés rattachés, zéro doublon d'intention (vérifié par script), revue indépendante | ✅ 23/10 |
| 5 | Sources et base voyants | **D'abord**, une demande de changement sur la structure : empreinte de validation étendue à la situation, à la couleur et au nom ; champ pictogramme ; catégories de sources élargies (règlement ONU n° 121, RappelConso, normes des codes défaut) ; marque de chaque notice au registre ; chaque source citée par une ligne de la base avec sa page ou section et son extrait ; contrôle du nombre de marques par verdict. **Ensuite** : registre des sources de première main pour toutes les pages de la vague A (voyants, codes défaut, pression des pneus, loi montagne) ; base voyants unique (couleur, catégorie, gravité, verdict, urgence, action, sources, pictogramme) ; pictogrammes redessinés, sur la piste technique (règle 12) | Chaque voyant a sa couleur, sa gravité, son verdict et son pictogramme (SVG présent, contrôlé). Chaque verdict s'appuie sur le nombre de marques fixé, chaque source citée avec page ou section et extrait (contrôlé). Chaque page éditoriale de la vague A a au moins une source de première main au registre, rattachée par la base voyants ou par un tableau page → sources joint à la porte. Paquet de validation validé par Houssem | 24–27/10 |
| 6 | Charte et modèles de pages | Charte éditoriale, dont la base de calcul du coût probable et ses tranches, la ligne de transparence et la section méthode de « à propos ». Un modèle par type (voyant, code, panne, fluide, pneus, dossier) avec un exemple rédigé. Brief de chaque page de la vague A, généré depuis le plan, avec les résultats Google relevés depuis la France | Exemples validés par Houssem (verdicts et encadrés de décision). Charte écrite, avec des tranches de coût dont chaque base de calcul a une source au registre. Ligne de transparence et section méthode rédigées. Brief de chaque page de la vague A produit | 27–29/10 |
| 7 | Socle technique (piste technique) | **Condition d'entrée** : statut juridique tranché (mentions légales). **Livrable** : mentions légales et politique de confidentialité (section des mentions légales, ou page du socle par demande de changement), mesure d'audience exemptée de consentement, plan du site pour Google, canonical sur chaque page, redirections 301 de www vers le domaine et de http vers https, données structurées utiles (Article, fil d'Ariane, auteur). Emplacements publicitaires prévus dans les modèles, non affichés avant AdSense | Canonical contrôlé automatiquement, redirections vérifiées, Lighthouse mobile ≥ 95 et CLS < 0,1 sur les pages du socle (emplacements factices dans une construction de test), contrôles au vert | 24–28/10 |
| 8 | Vague A | Outil et guide voyants, 11 voyants, 5 codes OBD, pression des pneus, loi montagne, pages du socle (≈ 22 pages). Juste avant la rédaction : requêtes absentes de 06 mesurées et rattachées, en une seule demande de changement. Préparée sur une branche d'intégration : aucune vraie page sur `main` avant la mise en ligne (chaque fusion sur `main` est déployée) | Faits vérifiés sur sources, verdicts validés ; faits de sécurité et chiffres dans le paquet validé par Houssem ; encadrés de décision relus par Houssem ; Lighthouse mobile ≥ 95 et CLS < 0,1 sur une page de chaque modèle (emplacements factices) ; contrôles au vert | 29/10–01/11 |
| 9 | Recette et mise en ligne A | Liste de contrôle SEO, mobile, accessibilité, juridique, liens. Recette sur le site vérifié par la CI (artefact) ou un staging protégé. Mise en ligne par une seule pull request (pages et drapeau d'indexation, variable `SITE_INDEXABLE` posée avant) | **Avant** : go / no-go ; double authentification activée sur OVH, GitHub, Cloudflare et Google. **Minimum en ligne** : socle, outil voyants, loi montagne, pression des pneus et voyants dont le verdict est validé ; le reste de la vague A suit dès qu'il est prêt, sans alléger les portes (si glissement, loi montagne en premier). **Après le déploiement** : en-tête `X-Robots-Tag` et balise robots vérifiés en production ; pages explorées sans erreur | 31/10 (minimum) |
| 10 | Vague B | 6 pannes, batterie (organe + 2 tutos), tuto FAP, dossier PureTech (≈ 11 pages), avec le brief de chaque page du lot | Mêmes critères que la vague A. Le site étant en ligne et indexable, la liste de recette de l'étape 9 est repassée avant chaque fusion d'un lot de pages | ≈ 07/11 |
| 11 | Vague C | Huile (organe, 3 viscosités, niveau), liquide de refroidissement, liquide de frein, usure des pneus, contrôle technique (≈ 9 pages), avec le brief de chaque page du lot | Mêmes critères que la vague B | ≈ 14/11 |
| 12 | Boucle mensuelle | **Suivi** : Search Console (impressions, clics, positions), optimisation des pages, revue trimestrielle du dossier PureTech. **Indicateurs** : à J+14, pages indexées ; à J+30, impressions et clics par page. **Extensions** : lot 2 décidé sur ces données (ancien lot 2, idées reportées), par demande de changement. **Notoriété** : ressources que d'autres citent (outil voyants, tableaux) ; jamais d'achat de liens, ni annuaires, ni liens glissés dans les forums. **AdSense** : demande quand le site est complet et indexé ; plateforme de consentement certifiée par Google en place avant d'afficher la publicité ; Lighthouse et CLS mesurés avec la publicité réelle, et seuil de la CI (0,95) ajusté si nécessaire par demande de changement | – | ensuite |

## Ce qui n'est pas un critère
- Résultats enrichis FAQ et HowTo : Google ne les accorde plus à ce type de site.
- Un score de performance mesuré sans les emplacements publicitaires (factices avant AdSense, réels ensuite).

## Déroulé de chaque session de travail
1. Lire 04_journal_avancement.md : étape en cours, décisions ouvertes, ce qui est figé, prévision.
2. Annoncer l'étape travaillée et, s'il y en a une, la piste technique menée en parallèle (règle 12). Ne travailler que sur elles.
3. Produire le livrable dans un format qui deviendra une source de vérité (fichier).
4. Vérifier la porte de sortie critère par critère, honnêtement : rien n'est « validé » sans preuve.
5. Faire challenger chaque livrable par un agent indépendant avant de le présenter (instructions du projet, règle n° 1).
6. Fin de session, si quelque chose a été validé ou décidé :
   - fournir le journal complet mis à jour, prévision comprise ;
   - après la validation explicite de Houssem, notée au journal, Claude met à jour les documents du projet Claude et ouvre la pull request de la copie `docs/` ;
   - Houssem ne charge que les fichiers joints (CSV), et décide des fusions et des tags.

## Demande de changement (pour tout élément figé)
Format : élément concerné · changement proposé · raison (données) · impact sur les étapes et livrables déjà validés · tests à relancer. Rien n'est appliqué avant l'accord explicite de Houssem ; la décision est inscrite au journal.
