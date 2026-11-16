# Lot F3 : preuves pour le paquet (brouillon, jamais validé)

Pull request du lot F3 (houssem-jeddou/decodauto#77, brief `travaux/etape-13/f3/taches/F3-pr.md`, §3), 16/11/2026.
Refaites après la revue indépendante de la pull request (corrections du 16/11 au soir). Chromium préinstallé, police du
système Inter (comme la CI).

| Fichier | Contenu | Commande |
|---|---|---|
| `production-diff.txt` | Fichiers qui diffèrent entre la construction de production de `main` et celle de la branche. Seules les 7 pages du lot et `sitemap.xml` changent ; dans `sitemap.xml`, seul le `lastmod` des 5 pages éditoriales | `SITE_INDEXABLE=true npx astro build` sur `main` à 7997f9d, puis sur la branche, enfin `diff -rq <dist de main> <dist de la branche>`. Commit de la branche : celui qui porte ce fichier (corrections de la revue, sur 0755000) |
| `mesures-format2.txt` | Sortie de FORMAT2-MESURES sur toutes les pages au format 2 de la construction de production (21 pages, 126 mesures, 0 erreur) | `CHROME_PATH=… node scripts/mesurer-format2.ts --dist dist --json …` |
| `mesures.json` | `resume` : par page, à 375 × 667, [police chargée, police de secours] : première situation (2a ; page informative : réponse directe, verdict et urgence), mots des lignes d'écart (2b), haut de l'illustration et sa place après « Notices » (2i), écrans et sommaire (2h), largeur à 320 px, débordements, hauteur de l'encadré au format 1 et au format 2. Puis le détail : `format2_mesures`, `mots_lignes_ecart`, `captures` | assemblé depuis les deux sorties ci-dessus et `../captures/mesures-captures.json` |
| `mots-ecart.json` | Mots de chaque ligne d'écart courte affichée, avec « Votre marque » (25 au plus) | `node travaux/etape-13/f2/mots-ecart.ts dist` |
| `lighthouse.txt` | Lighthouse mobile, 3 passages, médianes, 7 pages | `npx lhci autorun` avec `lighthouserc.json` réduit aux 7 adresses du lot |

Captures : `../captures/` (`capturer-f3.cjs`, servi en local : la construction de la branche et celle de `main`).
