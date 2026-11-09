# Livrable 8.2 : requêtes absentes de 06 (travail en cours)

État au 10/11/2026 : demande de changement n° 16 acceptée par Houssem (0 h 26) et appliquée sur la branche de la PR #23. `trier.ts` et `proposer.ts` décrivent l'état d'avant l'application (commit d4ff0a0) ; `chiffres_02.py` a recalculé les chiffres de `docs/02`.

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

## Tri et proposition (10/11/2026)
- `trier.ts` : tri des 177 requêtes mesurées avec la fonction `signature` du dépôt (`src/lib/porte-plan.ts`) ; résultat dans `tri_signature.csv`. Sur les 105 requêtes d'au moins 100 recherches, 16 ont la signature d'un mot-clé de 05 (le tri approché en trouvait 15) et 89 sont nouvelles.
- `decisions.json` : les décisions prises à la main (pages corrigées, requête écartée, mots génériques du critère de 06, ligne de 06 ajoutée par jugement), chacune avec sa raison.
- `proposer.ts` : construit la proposition dans `propose/` et relance la porte de l'étape 4 dessus. À lancer depuis la racine : `node travaux/etape-8/requetes-absentes/proposer.ts <chemin de 06>`.
- `propose/` : `proposition.csv` (le sort de chaque requête), `ajouts_05.csv`, `05_mots_cles_perimetre_v3.csv`, `06_base_mots_cles_complete_v2.csv`, `plan-du-site.json`, `formulations_du_lecteur.csv`. Ces fichiers sont ceux de la demande de changement n° 16 (`travaux/etape-8/demande-changement-16.md`), acceptée et appliquée le 10/11/2026.
