# Contrôles automatiques

Lancés à chaque pull request (`.github/workflows/ci.yml`) ; `npm run build` lance aussi `scripts/controle.ts`.
Une erreur **bloque** (code de sortie 1, pas de déploiement). Une **alerte** s'affiche sans bloquer.
Le script affiche en tête le **mode d'indexation actif**. Chaque lundi, le workflow relance les contrôles sur `main` (sans déployer) avec `--echouer-sur R5-REVUE-DEPASSEE` : une revue dépassée fait alors échouer ce run planifié, ce qui déclenche la notification GitHub.

## Règles de docs/08 §3
| Code | Règle | Gravité | Page de test (`tests/fixtures/cas/…`) |
|---|---|---|---|
| R1-VERDICT-SAISI | Une ligne `{voyant}` ne porte ni verdict, ni urgence, ni action, ni sources : ils viennent de la base voyants | erreur | `r1-verdict-saisi` |
| R1-VOYANT-INCONNU / R1-VOYANT-NON-DECLARE | Le voyant existe dans la base et est déclaré par la page (aussi pour `voyant_lie`) | erreur | `r1-voyant-inconnu`, `r1-voyant-non-declare`, `r1-voyant-lie-non-declare` |
| R1-LIGNE-BASE-ABSENTE | Chaque voyant déclaré dans `voyants` a sa ligne `- voyant: id` reprise de la base (aucune ligne écrite à la main sur ce voyant) | erreur | `r1-ligne-base-absente` |
| R1-RATTACHEMENT | La page rattachée à un voyant le déclare (alerte tant que la page n'est pas écrite) | erreur / alerte | `tests/controle.test.ts` |
| R2-MOINS-GRAVE | Une ligne saisie liée à un voyant (`voyant_lie`) n'est pas moins grave que le verdict de ce voyant dans la base. Une ligne non liée n'est pas comparée | erreur | `r2-moins-grave`, `valide-ligne-non-liee` |
| R3-PREMIERE-MAIN / R3-SOURCE-INCONNUE | Chaque verdict cite une source de première main du registre ; la source de `texte_reference` (pneus) aussi | erreur | `r3-pas-premiere-main`, `r3-source-inconnue`, `r3-texte-reference-seconde-main` |
| R4-EMPREINTE / R4-VALIDATION-ABSENTE | L'empreinte de validation correspond au verdict, à l'urgence, à l'action et aux sources | erreur | `r4-empreinte-differente`, `r4-validation-absente` |
| R5-REVUE-DEPASSEE | `prochaine_revue` est dans le passé | **alerte** | `r5-revue-depassee` |
| R7-CHAMP-MANQUANT / R7-HORS-LISTE / R7-CHAMP-INCONNU / R7-CHAMP-CALCULE / R7-FORMAT | Champs obligatoires, listes fermées, aucun champ calculé saisi | erreur | `r7-champ-manquant`, `r7-hors-liste`, `r7-champ-calcule-saisi` |
| R7-ELEMENT-UNIQUE-ABSENT | L'élément unique est présent et non vide dans la page **construite** (`data-element-unique="…"`) ; un tableau a au moins une ligne de données | erreur | `r7-element-unique-absent`, `r7-tableau-sans-donnees` |
| R7-ELEMENT-ATTENDU | Panne hors tutoriel : arbre de décision. Fluide (tutoriel compris) : tableau. Le tutoriel ne dispense que du symptôme et de l'arbre | erreur | `r7-fluide-tutoriel-sans-tableau`, `valide-tutoriel-panne` |
| R7-HTML-* , R7-TUTORIEL-ETAPES | title, un seul H1, description présents dans la page construite ; étapes du tutoriel dans `<ol data-tutoriel-etapes>` (une autre liste numérotée ne compte pas) | erreur | `r7-tutoriel-sans-etapes` |
| R7-DATES / R7-CODE-GENERIQUE | `prochaine_revue` postérieure à `date_revue` ; un code P1xxx n'est pas générique | erreur | `r7-dates`, `r7-code-p1-generique` |
| R7-PLAN-ABSENT / R7-REQUETE-ABSENTE | La page (socle compris) est dans le plan du site, qui donne seul son adresse ; sa requête principale figure dans le title ou le H1 | erreur | `r7-plan-absent`, `r7-requete-absente`, `r7-socle-adresse-saisie` |
| R7-AUTEUR-INCONNU, R7-LIEN-* , R7-DOUBLON | Fiche auteur existante ; liens déclarés une seule fois ; identifiants et adresses uniques | erreur | `tests/controle.test.ts` |

Non vérifiable par machine (liste de recette) : R6, l'ordre des causes (jamais « par fréquence » sans donnée sourcée).

## Site construit
| Code | Contrôle |
|---|---|
| IDX-META-ABSENTE / IDX-META-PRESENTE | Meta robots noindex sur chaque page si et seulement si le site n'est pas indexable (variable `SITE_INDEXABLE` = `true` **et** `config/indexation.json` = `true`) |
| IDX-ENTETE-ABSENT / IDX-ENTETE-PRESENT | `X-Robots-Tag: noindex` dans `_headers` si et seulement si le site n'est pas indexable |
| PAGE-HORS-PLAN | Toute page HTML construite correspond à une adresse du plan du site, ou est l'accueil ou la 404 |
| IDX-ROBOTS-DISALLOW | `robots.txt` sans aucun `Disallow` |
| PAGE-404-* | `404.html` existe, avec un H1 et un lien vers l'accueil |
| FIXTURE-PUBLIEE | Aucune page de test dans `src/content`, le plan du site ou `dist` |
| WRANGLER-* | `wrangler.json` : pas de script, `workers_dev` et `preview_urls` à `false`, `not_found_handling` = `404-page`, domaine personnalisé decodauto.com (`custom_domain`) |
| LIEN-CASSE / LIEN-SANS-BARRE / LIEN-ANCRE | Liens internes (`npm run liens`) |

## Empreinte de validation
`validation` = SHA-256 de la liste `{verdict, urgence, action, sources}` des lignes **saisies** de la page (`src/lib/empreinte.ts`). La casse, les espaces et les apostrophes typographiques de `action` n'ont pas d'effet ; toute autre modification de ces quatre champs demande une revalidation par Houssem. Le reste du texte de la page peut être corrigé librement.
