# Livrable 8.2 : requêtes absentes de 06 (travail en cours)

État au 09/11/2026 : liste à mesurer prête ; mesure non faite ; demande de changement non rédigée.

## Ce qui est fait
- `absentes_de_06.tsv` : les 325 suggestions de saisie (docs/07, relevé du 22/10) et recherches associées (relevé Google France du 28/10, `travaux/etape-6/releve-google-france/`) qui ne sont pas un mot-clé de 06 (comparaison sans majuscules, accents, apostrophes ni tirets). 213 viennent de 07, 112 du relevé France.
- `requetes_a_mesurer.csv` : 177 requêtes à mesurer, chacune avec la page du plan proposée et sa provenance. `requetes_a_mesurer.txt` : la même liste, une requête par ligne, à coller dans Keyword Planner.
- `requetes_ecartees.txt` : 147 requêtes écartées, par les règles écrites dans `lister.py` : hors sujet (voyante, climatisation, Facebook…), hors périmètre de 02 (carte grise, Crit'Air, embrayage, courroie, plaquettes, boîte automatique, voiture qui tremble, AdBlue hors voyant), enseignes et lieux, codes défaut absents du plan, deux-roues. Une requête figure dans les deux relevés et n'est comptée qu'une fois (177 + 147 + 1 = 325).
- `lister.py` : le script qui produit ces fichiers. À lancer depuis la racine du dépôt, avec le chemin de `06_base_mots_cles_complete.csv` (fichier du projet, absent du dépôt) en argument.

## Ce qui manque
1. **La mesure.** Les volumes de 06 sont des fourchettes de Keyword Planner (docs/02). Il faut l'export de Keyword Planner pour les 177 requêtes : « Obtenir le volume de recherche et les prévisions », zone France, langue français. Le connecteur Semrush de la session du 09/11 n'avait pas d'unités d'API.
2. **Le tri.** Garder les requêtes d'au moins 100 recherches par mois (plus petite fourchette de 06), vérifier la page proposée de chacune, et le doublon d'intention avec les mots-clés de 05.
3. **Les lignes de 06 classées hors périmètre** dont la requête est celle d'une page prévue (« liquide de frein », « liquide de refroidissement », « gonfler pneu voiture »…) : écrire le critère, lister les lignes, les rattacher.
4. **La demande de changement** (05 v3, 06, plan du site, briefs régénérés, contrôles de la porte 4 relancés), sa revue indépendante, la validation de Houssem.

Les pages proposées et les exclusions sont une proposition : rien n'est validé.
