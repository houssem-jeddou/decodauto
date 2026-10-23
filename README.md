# decodauto

Site decodauto.com : votre voiture vous alerte, on vous dit quoi faire.

Site statique [Astro](https://astro.build) (version figée), hébergé sur Cloudflare (fichiers statiques, sans script).
Les sources de vérité du projet sont dans `docs/`. Les règles de travail sont dans `CLAUDE.md`, les contrôles automatiques dans `CONTROLES.md`.

## Démarrer
Node 22.23.4 (voir `.nvmrc`), puis :

```
npm ci
npm run dev        # serveur local
npm run build      # construit dist/ puis lance le script de contrôle
npm test           # règles de contrôle, pages de test valide et invalides
npm run schemas    # types et schémas (astro check)
npm run liens      # liens cassés dans dist/
npm run lighthouse # Lighthouse mobile, 3 passages (après npm run build)
npm run verifier:modes # indexation : les quatre combinaisons variable × drapeau
```

## Indexation (double clé)
Le site n'est **pas indexable** (en-tête `X-Robots-Tag: noindex` et balise `meta robots noindex`) sauf si **les deux** conditions sont vraies :
1. la variable de dépôt GitHub `SITE_INDEXABLE` vaut exactement `true` (Settings → Secrets and variables → Actions → Variables) ;
2. le drapeau versionné `config/indexation.json` vaut `{ "indexable": true }` (il est à `false` par défaut).

`npm run verifier:modes` construit le site dans les quatre combinaisons et vérifie le résultat.

## Déploiement
Le déploiement ne passe que par le workflow GitHub Actions. Sur `main`, après des contrôles verts, il lance `wrangler deploy` si les secrets `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` existent ; sinon l'étape est ignorée. Le domaine decodauto.com est lié au Worker par `wrangler.json` (`custom_domain`) : la zone doit être active chez Cloudflare. Un contrôle hebdomadaire (lundi) tourne sans jamais déployer.
