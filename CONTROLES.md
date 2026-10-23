# Contrôles automatiques

Lancés à chaque pull request (`.github/workflows/ci.yml`) ; `npm run build` lance aussi `scripts/controle.ts`.
Une erreur **bloque** (code de sortie 1, pas de déploiement). Une **alerte** s'affiche sans bloquer. Une **information** (`INFO`) est un simple constat, sans gravité.
Le script affiche en tête le **mode d'indexation actif**. Chaque lundi, le workflow relance les contrôles sur `main` (sans déployer) avec `--echouer-sur R5-REVUE-DEPASSEE` : une revue dépassée fait alors échouer ce run planifié, ce qui déclenche la notification GitHub.

## Règles de docs/08 §3
| Code | Règle | Gravité | Page de test (`tests/fixtures/cas/…`) |
|---|---|---|---|
| R1-VERDICT-SAISI | Une ligne `{voyant}` ne porte ni verdict, ni urgence, ni action, ni sources : ils viennent de la base voyants | erreur | `r1-verdict-saisi` |
| R1-VOYANT-INCONNU / R1-VOYANT-NON-DECLARE | Le voyant existe dans la base et est déclaré par la page (aussi pour `voyant_lie`) | erreur | `r1-voyant-inconnu`, `r1-voyant-non-declare`, `r1-voyant-lie-non-declare` |
| R1-LIGNE-BASE-ABSENTE | Chaque voyant déclaré dans `voyants` a sa ligne `- voyant: id` reprise de la base (aucune ligne écrite à la main sur ce voyant) | erreur | `r1-ligne-base-absente` |
| R1-RATTACHEMENT | La page rattachée à un voyant est dans le plan du site et le déclare (alerte tant que la page n'est pas écrite) | erreur / alerte | `tests/controle.test.ts`, `tests/plan.test.ts` |
| R2-MOINS-GRAVE | Une ligne saisie liée à un voyant (`voyant_lie`) n'a ni un verdict moins grave ni une urgence moins forte que ce voyant dans la base. Une ligne non liée n'est pas comparée | erreur | `r2-moins-grave`, `valide-ligne-non-liee`, `tests/controle.test.ts` |
| R2-CODE-SANS-VOYANT | Une page code défaut déclare au moins un voyant, et chacune de ses lignes saisies porte `voyant_lie` : son verdict vient des notices et du voyant, jamais moins grave que lui | erreur | `r2-code-sans-voyant` |
| R3-PREMIERE-MAIN / R3-SOURCE-INCONNUE | Chaque verdict (base voyants et lignes saisies) s'appuie sur au moins une citation de première main qui fixe un niveau ; la source de `texte_reference` (pneus) est de première main ; les sources citées et celles du libellé d'un code défaut (`libelle_sources`, secondaire admise) existent au registre | erreur | `r3-pas-premiere-main`, `r3-reglement-onu-seul`, `r3-source-inconnue`, `r3-texte-reference-seconde-main` |
| R3-CITATION-NIVEAU | Chaque citation d'une notice constructeur donne le niveau (verdict et urgence) que la grille tire de sa consigne ; une source secondaire ou le règlement ONU n° 121 (symboles et couleurs) n'en donnent jamais ; un niveau se donne en entier | erreur | `r3-citation-sans-niveau`, `r3-niveau-secondaire` |
| R3-PLUS-PRUDENT | Le verdict et l'urgence d'une ligne sont au moins aussi prudents que la citation la plus prudente (docs/03, règle 10) | erreur | `r3-moins-prudent` |
| R3-ECART-NON-SIGNALE / R3-ECART-SANS-OBJET | Si les citations d'une ligne ne donnent pas toutes le même niveau (verdict ou urgence), `ecart_marques` dit l'écart ; il reste vide sinon | erreur | `r3-ecart-non-signale`, `r3-ecart-sans-objet`, `valide-ecart-signale` |
| R3-MARQUES | Une ligne de la base voyants cite, avec leur niveau, les notices d'au moins 3 marques de référence, de 2 groupes différents (`MARQUES_REFERENCE`, `MARQUES_MIN`, `GROUPES_MIN` dans `src/schemas/listes.ts`) ; deux notices d'une même marque comptent une fois. Avec la liste actuelle (2 marques au plus par groupe), 3 marques impliquent 2 groupes : la garantie réelle de recoupement est de 2 groupes | erreur | `tests/controle.test.ts` |
| R4-EMPREINTE / R4-VALIDATION-ABSENTE | Toute page éditoriale porte l'empreinte de son encadré de décision validé (question, lignes de situation avec l'empreinte des lignes de la base affichées, coût probable) ; chaque ligne de la base voyants porte celle de son contenu et de son dessin (voir plus bas) | erreur | `r4-empreinte-differente`, `r4-question-modifiee`, `r4-validation-absente`, `r4-validation-absente-voyant` |
| R5-REVUE-DEPASSEE | `prochaine_revue` est dans le passé | **alerte** | `r5-revue-depassee` |
| R7-CHAMP-MANQUANT / R7-HORS-LISTE / R7-CHAMP-INCONNU / R7-CHAMP-CALCULE / R7-FORMAT | Champs obligatoires (dont le libellé court, le texte alternatif d'une image, la marque d'une notice au registre), listes fermées, aucun champ calculé saisi, champ `relecteur` retiré (pas de relecteur extérieur) | erreur | `r7-champ-manquant`, `r7-image-sans-alt`, `r7-hors-liste`, `r7-champ-calcule-saisi`, `r7-relecteur` |
| R7-ELEMENT-UNIQUE-ABSENT | L'élément unique est présent et non vide dans la page **construite** (`data-element-unique="…"`) ; un tableau a au moins une ligne de données | erreur | `r7-element-unique-absent`, `r7-tableau-sans-donnees` |
| R7-ELEMENT-ATTENDU | Panne hors tutoriel : arbre de décision. Fluide (tutoriel compris) : tableau. Le tutoriel ne dispense que du symptôme et de l'arbre | erreur | `r7-fluide-tutoriel-sans-tableau`, `valide-tutoriel-panne` |
| R7-HTML-* , R7-TUTORIEL-ETAPES | title, un seul H1, description présents dans la page construite ; étapes du tutoriel dans `<ol data-tutoriel-etapes>` (une autre liste numérotée ne compte pas) | erreur | `r7-tutoriel-sans-etapes` |
| R7-DATES / R7-CODE-GENERIQUE | `prochaine_revue` postérieure à `date_revue` ; un code P1xxx n'est pas générique | erreur | `r7-dates`, `r7-code-p1-generique` |
| R7-PLAN-ABSENT / R7-REQUETE-ABSENTE | La page (socle compris) est dans le plan du site, qui donne seul son adresse ; sa requête principale figure dans le title ou le H1 | erreur | `r7-plan-absent`, `r7-requete-absente`, `r7-socle-adresse-saisie` |
| R7-AUTEUR-INCONNU, R7-DOUBLON | Fiche auteur existante ; identifiants et adresses uniques | erreur | `tests/controle.test.ts` |
| R8-COHERENCE | Le couple verdict / urgence d'une ligne (base ou page) et de chaque citation est admis par la grille (`URGENCES_ADMISES`, `src/schemas/grille.ts`) : « non » impose une urgence immédiate, « oui » sans précaution l'exclut | erreur | `r8-incoherent` |
| R9-ENCADRE-ABSENT | La page construite contient un seul encadré de décision (`data-encadre-decision`) | erreur | `r9-encadre-absent` |
| R9-ENCADRE-POSITION | L'encadré est le premier bloc après le H1 : aucun texte, image ou média entre les deux (balises englobantes, commentaires et scripts ne comptent pas) | erreur | `r9-texte-avant-encadre` |
| R9-PUB-AVANT-ENCADRE | Aucun emplacement publicitaire (`data-emplacement-pub`, ou bloc AdSense `adsbygoogle`) avant l'encadré | erreur | `r9-pub-avant-encadre` |
| R9-ENCADRE-CONTENU | L'encadré affiche la question de décision et la tranche du coût probable, puis une ligne par situation (`data-encadre-ligne`, dans l'ordre, avec `data-verdict` et `data-urgence` égaux au niveau de la situation) qui affiche la situation, le libellé de son verdict et de son urgence (grille), son action et, s'il existe, l'écart entre marques | erreur | `r9-encadre-incomplet`, `tests/controle.test.ts` |
| R9-ENCADRE-MASQUE | Rien de masqué dans l'encadré : ni bloc à déplier (`details`), ni `hidden`, ni `aria-hidden="true"`, ni `display:none` / `visibility:hidden` | erreur | `tests/controle.test.ts` |
| PICTO-ABSENT / PICTO-INVALIDE | Chaque ligne de la base voyants a son pictogramme `src/pictogrammes/<pictogramme>.svg` ; le fichier est un SVG autonome : balise `svg` avec `viewBox`, éléments de forme seulement (liste blanche : pas de texte, d'image, de script, de style, d'animation), liens et `url()` internes (`#…`), aucun gestionnaire d'événement, 8 Ko au plus | erreur | `tests/controle.test.ts` |

Non vérifiable par machine (liste de recette) :
- R6, l'ordre des causes (jamais « par fréquence » sans donnée sourcée) ;
- le classement de chaque consigne de notice dans la grille, l'extrait fidèle à la source et le texte de l'écart entre marques : vérifiés par Houssem sur le paquet de validation (docs/03, règle 7) ;
- toutes les notices consultées pour une ligne sont citées, y compris celles qui donnent un niveau plus prudent ;
- un pictogramme redessiné par nos soins, jamais copié (docs/01) ;
- étape 12 : les annonces automatiques AdSense, insérées dans le navigateur, ne se placent pas avant l'encadré de décision (invisible pour le contrôle de la page construite).

## Plan du site et maillage (étape 4)
Le plan du site (`data/plan-du-site.json`) est la référence du maillage : `parent` (page mère, qui affiche ses enfants) et `liens` (chaque paire déclarée une seule fois, le retour est calculé). Les pages ne déclarent plus de liens. Code : `src/lib/plan.ts`, `src/lib/porte-plan.ts` ; tests : `tests/plan.test.ts` (sans dépendance) et `tests/controle.test.ts`.

| Code | Règle | Gravité |
|---|---|---|
| R7-LIEN-INCONNU / R7-LIEN-SOI / R7-LIEN-DOUBLE | Un lien du plan mène à une page du plan, pas à elle-même ; une paire n'est déclarée qu'une fois (un seul côté) | erreur |
| PLAN-PARENT-INCONNU / PLAN-PARENT-CYCLE | La page mère est dans le plan ; les pages mères ne forment pas de cycle | erreur |
| PLAN-ADRESSE-PARENT | L'adresse d'une page enfant est sous celle de sa mère ; une page dont l'adresse est sous celle d'une autre page la déclare comme mère | erreur |
| R7-LIEN-OUTIL | L'outil voyants (`voyants`) mène à la page de chaque voyant de la base : cette page est son enfant ou lui est liée dans le plan | erreur |
| R7-LIEN-HORS-PLAN / R7-LIEN-INCONNU | Un lien écrit dans le texte d'une page (socle compris) mène à une page du plan liée à celle-ci (lien déclaré, mère ou enfant), à son adresse exacte. Les liens relatifs sont résolus depuis l'adresse de la page ; les liens absolus vers decodauto.com (www compris), les liens automatiques et les adresses nues en https:// ou www. sont internes ; « …/index.html » vaut « …/ ». Images (pas le lien qui les entoure), fichiers (contrôlés par `npm run liens`), code et notes de bas de page sont ignorés | erreur |
| PLAN-MOT-CLE-ABSENT / -INCONNU / -DOUBLE | Porte de l'étape 4 : chaque mot-clé de `docs/05` est sur une seule page ; aucun mot-clé inconnu | erreur |
| PLAN-VARIANTE | Une variante (`variante_proche_de`) est sur la page de son mot-clé de référence | erreur |
| PLAN-DOUBLON-INTENTION | Une même signature d'intention (mots normalisés, au singulier, sans mots vides ni ordre ; « sans », « ne », « pas » gardés) n'est jamais sur deux pages | erreur |
| PLAN-REQUETE-DOUBLE / PLAN-REQUETE-HORS-MOTS-CLES | La requête principale est unique et fait partie des mots-clés de sa page | erreur |
| PLAN-PRECISION / PLAN-PRECISION-INCONNUE | La colonne `precision` de `docs/05` est respectée quand elle désigne une page ou un type de page ; une précision nouvelle doit être traduite dans `PRECISIONS_05` | erreur |
| PLAN-VAGUE-PAGE | La vague d'une page est la vague dominante de ses mots-clés dans `docs/05` | erreur |
| PLAN-05-ILLISIBLE / PLAN-05-DOUBLON | `docs/05` est lisible, avec ses colonnes, sans mot-clé en double | erreur |
| INFO | Liens du plan en attente de leur page : paires déclarées et liens mère-enfant dont une page n'est pas écrite (ils s'affichent quand les deux pages le sont) ; mots-clés servis dans une autre vague que celle de `docs/05` | information |

Vue lisible : `docs/09_plan_du_site.md`. Ses parties générées (chiffres clés, tableaux, détail des mots-clés) se mettent à jour avec `npm run plan:vue` ; un test vérifie qu'elles correspondent au plan.

Non vérifiable par machine (liste de recette) : un recouvrement de sens entre deux pages voisines (comparer les dix premiers résultats Google de leurs requêtes) ; la liste des pages identique à `docs/02` (vérifiée à la porte de l'étape 4, puis protégée par le test « 42 pages : 22 A, 11 B, 9 C »).

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
Code : `src/lib/empreinte.ts` ; calcul : `npm run empreinte -- <page.md>` ou `npm run empreinte -- --voyant <id>`. L'empreinte se copie après la validation de Houssem, jamais pour faire passer un contrôle.
- **Ligne de la base voyants** (`validation` de `data/voyants.json`) : identifiant, nom, couleur, pictogramme et son dessin (contenu du fichier SVG, mise en forme ignorée), situation, verdict, urgence, action, écart entre marques et citations (source, page ou section, extrait, niveau). L'ordre des citations n'a pas d'effet.
- **Page éditoriale** (`validation` du frontmatter) : l'encadré de décision, c'est-à-dire la question de décision, les lignes de situation dans l'ordre (une ligne reprise de la base y figure par l'identifiant du voyant et l'empreinte de sa ligne : revalider la ligne oblige à relire l'encadré ; une ligne saisie en entier, voyant lié compris) et le coût probable (tranche, base de calcul, sources). Exigée sur toute page éditoriale, même sans ligne saisie.
- Casse, accents, ligatures, ponctuation et espaces n'ont pas d'effet : une coquille de ce type ne demande pas de revalidation (« 5 % » = « 5% », « 1 000 » = « 1000 », « 2,5 » = « 2.5 »). Un mot, une lettre, un chiffre ou un signe qui porte un sens (−, +, <, >, ≤, ≥, ±, €, %, °) changé demande une revalidation. Le reste du texte de la page se corrige librement.
