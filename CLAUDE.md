# CLAUDE.md : règles de travail pour decodauto.com

Site en français pour la France : « Votre voiture vous alerte, on vous dit quoi faire. »
Guide indépendant : voyant, code défaut, symptôme ou obligation → peut-on rouler, gravité, coût probable, marche à suivre.

## Ce qui fait foi
- `docs/` fait foi : lire `docs/04_journal_avancement.md` (étape en cours, décisions, ce qui est figé), puis `docs/01`, `docs/02`, `docs/03` et `docs/08_structure_contenus.md` avant toute tâche. En cas d'écart entre le code et `docs/`, c'est `docs/` qui a raison : corriger le code, ou signaler l'écart. Ne pas modifier `docs/` sans demande explicite.
- Les schémas du dépôt (`src/schemas/`) implémentent `docs/08`. Tant que Houssem n'a pas validé cette transposition, `docs/08` fait foi ; ensuite les schémas font foi (voir l'en-tête de `docs/08`). Une modification de structure passe par une demande de changement (format dans `docs/03`).
- Ce qui est figé (périmètre, mots-clés, structure validée) ne bouge pas sans demande de changement acceptée par Houssem.

## Méthode (docs/03)
1. **Une branche et une pull request par tâche.** Ne jamais pousser sur `main`. Ne pas fusionner et ne rien déployer sans demande explicite.
2. **Contrôles verts avant de présenter.** `npm run schemas`, `npm test`, `npm run build` (inclut `scripts/controle.ts`) et `npm run liens` doivent passer. On ne contourne pas, n'affaiblit pas et ne désactive pas un contrôle pour faire passer un travail.
3. **Une source de vérité par sujet, rien recopié à la main** : plan du site (`data/plan-du-site.json`), base voyants (`data/voyants.json`), registre des sources (`data/sources.json`). Les pages en dérivent : adresse, thème, requête principale, niveau de sécurité sont calculés, jamais saisis.
4. **Contrôles cumulatifs.** Toute règle vérifiable par une machine devient un test (`tests/`, pages de test dans `tests/fixtures`). Les autres vont dans la liste de recette. Ne travailler que sur l'étape en cours.
5. Ne rien affirmer « validé » sans preuve. Dire ce qui a échoué ou reste à faire.

## Règles de contenu (docs/01)
- **Jamais de verdict de sécurité inventé.** Un verdict (rouler ou non, urgence, action) vient de la base voyants ou est saisi avec au moins une source de première main du registre (notice constructeur, Sécurité routière, Légifrance, textes du contrôle technique). Une relecture par une IA n'est pas une vérification. Houssem valide les verdicts : l'empreinte de validation ne se recalcule pas pour faire passer un contrôle. En cas de doute : recommander l'avis d'un professionnel, dire ce qu'on ne sait pas.
- **Jamais de prix d'enseigne ni de prix de prestation**, pas de requête d'achat générique. Le coût probable est une échelle en ordres de grandeur avec base de calcul sourcée.
- Chaque page s'ouvre sur la décision et contient un élément unique (arbre de décision, tableau, outil, photo réelle).
- Une intention de recherche = une seule page. Pas de page par modèle sans donnée constructeur sourcée.
- Pictogrammes redessinés par nos soins, jamais copiés. Codes défaut constructeur précisés par marque.
- Électrique, hybride, valises OBD, démarches administratives : hors périmètre (`docs/02`).

## Technique
- Astro **7.4.2** (version exacte), sortie 100 % statique, `site` = https://decodauto.com, `trailingSlash: 'always'`, `build.format: 'directory'`, `lang="fr"`. Node 22.23.4 (`.nvmrc`). Toutes les dépendances sont figées sans `^` ni `~` (`.npmrc`: `save-exact`).
- **Non-indexation** : tant que `SITE_INDEXABLE` ne vaut pas exactement `true`, `public/_headers` envoie `X-Robots-Tag: noindex` et chaque page a `<meta name="robots" content="noindex">`. `robots.txt` ne contient jamais de `Disallow`. Ne jamais publier une vraie page en noindex en production. Le script de contrôle vérifie la cohérence dans les deux sens.
- Cloudflare : fichiers statiques uniquement (`wrangler.json`, aucun script Worker, `workers_dev` et `preview_urls` à `false`, `not_found_handling` = `404-page`). Le déploiement est fait par GitHub Actions, uniquement si tous les contrôles sont verts et si les secrets `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` existent. Ne jamais écrire un secret dans le dépôt.
- Les pages de test (`tests/fixtures`) ne sont jamais dans `src/content`, ni dans le plan du site, ni dans `dist` : le contrôle échoue sinon.
- Catalogue des règles et des codes d'erreur : `CONTROLES.md`.

## Commandes
`npm ci` · `npm run dev` · `npm run build` (construit + contrôle) · `npm test` · `npm run schemas` · `npm run liens` · `npm run lighthouse` (après `build`) · `npm run fixtures` (régénère les pages de test).

## Git
Commits en français, clairs, un sujet par commit. Travailler sur la branche indiquée par la tâche. Pas de réécriture d'historique sur une branche partagée.
