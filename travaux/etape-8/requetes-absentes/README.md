# Livrable 8.2 : requêtes absentes de 06 (travail en cours)

État au 09/11/2026 (23 h 45) : mesure faite ; tri et demande de changement à faire. Rien n'est validé.

## Ce qui est fait
- `absentes_de_06.tsv` : les 325 suggestions de saisie (docs/07, relevé du 22/10) et recherches associées (relevé Google France du 28/10, `travaux/etape-6/releve-google-france/`) qui ne sont pas, mot pour mot, un mot-clé de 06 (comparaison sans majuscules, accents, apostrophes ni tirets). 213 viennent de 07, 112 du relevé France.
- `requetes_a_mesurer.csv` et `.txt` : 177 requêtes à mesurer, chacune avec la page du plan proposée et sa provenance.
- `requetes_ecartees.txt` : 147 requêtes écartées par les règles de `lister.py` (hors sujet, hors périmètre de 02, enseignes et lieux, codes absents du plan, deux-roues). Une requête figure dans les deux relevés (177 + 147 + 1 = 325).
- `lister.py` : le script qui produit ces fichiers (à lancer depuis la racine du dépôt, avec le chemin de `06_base_mots_cles_complete.csv` en argument).
- `mesures_keyword_planner.csv` : la fourchette de chaque requête, relevée le 09/11/2026 dans le Keyword Planner du compte Google Ads de Houssem, par Claude dans son Chrome, sur sa demande.

## La mesure
- Réglages du plan : zone **France** ; langue **« Toutes les langues »** (le réglage de la langue ne s'est pas ouvert, deux essais) ; réseau Google ; période octobre 2025 à septembre 2026. Plan enregistré dans le compte : « Plan créé le nov. 9, 2026, 11 PM » (planId 1445139886).
- Écart avec la liste : « voyant abs allumé : que faire » a été saisi sans les deux-points.
- Résultat sur 177 requêtes :

| Fourchette | Requêtes |
|---|---|
| 10 k – 100 k | 3 |
| 1 k – 10 k | 17 |
| 100 – 1 k | 85 |
| 10 – 100 (sous la plus petite fourchette de 06) | 42 |
| sans donnée (« — ») | 30 |

- **105 requêtes atteignent au moins 100 recherches par mois.** Un premier tri approché (mêmes mots dans un autre ordre, singulier, mots vides retirés) en trouve 15 qui sont la variante d'un mot-clé déjà dans 05 (« voyant moteur rouge » et « voyant rouge moteur », « pression pneu » et « pression pour pneu », « p0087 audi » et « audi p0087 »…). Il en resterait environ 90 nouvelles. Ce tri est à refaire avec la fonction `signature` du dépôt (`src/lib/porte-plan.ts`).
- **30 requêtes sans donnée**, dont 25 contiennent « allumé » ou « s'allume » (« voyant moteur allumé », « voyant batterie allumé »…). Le résultat est stable après rechargement de la page. 06 ne contient aucun mot-clé en « allumé » sur ses 680 mots-clés « voyant » : Keyword Planner ne semble pas donner de volume propre à ces formulations. Cause non établie. Ces requêtes sont pourtant suggérées en tête par Google : à traiter dans les pages comme des formulations du lecteur, sans volume.
- Les volumes indicatifs (316 / 3 160 / 31 600, docs/02) sont des plafonds qui servent à comparer.

## Ce qui reste
1. **Le tri** : variantes et doublons d'intention avec la fonction du dépôt ; page proposée de chacune à vérifier (les requêtes par marque ou par modèle suivent la règle de 02) ; concurrence et enchère à relever dans le plan enregistré si 05 en a besoin.
2. **Les lignes de 06 classées hors périmètre** dont la requête est celle d'une page prévue (« liquide de frein », « liquide de refroidissement », « gonfler pneu voiture »…) : écrire le critère, lister les lignes, les rattacher.
3. **La demande de changement** (05 v3, 06, plan du site, briefs régénérés, contrôles de la porte 4 relancés), une revue indépendante, la validation de Houssem.
