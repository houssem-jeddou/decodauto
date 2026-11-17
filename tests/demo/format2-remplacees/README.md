# Pages de démonstration remplacées par leur vraie page

Une page de démonstration du format 2 (`tests/demo/format2/<type>/`) porte l'identifiant et l'adresse d'une page du plan :
elle ne peut pas être construite à côté de la vraie page, une fois celle-ci publiée (`src/content`, R7-DOUBLON). Elle
sort alors du dossier construit par la démonstration (`DEMO_FORMAT2=1`, `src/content.config.ts`) et vient ici, où seuls
les tests des modèles la lisent ; dans la construction de démonstration, la vraie page la remplace.

| Page | Remplacée par | Lot | Tests qui la lisent |
|---|---|---|---|
| `dossier/moteur-puretech.md` (démonstration du modèle dossier : tableau de six colonnes, historique de trois entrées) | `src/content/dossier/moteur-puretech.md` | B1 | `tests/format2-panne.test.ts` |
