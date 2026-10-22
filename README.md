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
```

## Indexation
Le site n'est **pas indexable** tant que la variable `SITE_INDEXABLE` ne vaut pas exactement `true` (en-tête `X-Robots-Tag: noindex` et balise `meta robots noindex`). Dans GitHub, c'est la variable de dépôt `SITE_INDEXABLE` (Settings → Secrets and variables → Actions → Variables).

## Déploiement
Sur `main`, après des contrôles verts, le workflow lance `wrangler deploy` si les secrets `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` existent ; sinon l'étape est ignorée.
