# Contrôles automatiques

Lancés à chaque pull request (`.github/workflows/ci.yml`) ; `npm run build` lance aussi `scripts/controle.ts`.
Une erreur **bloque** (code de sortie 1, pas de déploiement). Une **alerte** s'affiche sans bloquer. Une **information** (`INFO`) est un simple constat, sans gravité.
Le script affiche en tête le **mode d'indexation actif**. Chaque lundi, le workflow relance les contrôles sur `main` (sans déployer) avec `--echouer-sur R5-REVUE-DEPASSEE,COUT-A-REVERIFIER,COUT-FOURCHETTE-A-REVOIR` : une revue dépassée, un montant à revérifier ou une fourchette à revoir font alors échouer ce run planifié, ce qui déclenche la notification GitHub. Ces alertes datées ne font jamais échouer une pull request.

## Règles de docs/08 §3
| Code | Règle | Gravité | Page de test (`tests/fixtures/cas/…`) |
|---|---|---|---|
| R1-VERDICT-SAISI | Une ligne `{voyant}` ne porte ni situation, ni verdict, ni urgence, ni action, ni citations, ni `voyant_lie`, ni `ecart_marques` : ils viennent de la base voyants | erreur | `r1-verdict-saisi` |
| R1-VOYANT-INCONNU / R1-VOYANT-NON-DECLARE | Le voyant existe dans la base et est déclaré par la page (aussi pour `voyant_lie`) | erreur | `r1-voyant-inconnu`, `r1-voyant-non-declare`, `r1-voyant-lie-non-declare` |
| R1-LIGNE-BASE-ABSENTE | Chaque voyant déclaré dans `voyants` a sa ligne `- voyant: id` reprise de la base (aucune ligne écrite à la main sur ce voyant) | erreur | `r1-ligne-base-absente` |
| R1-RATTACHEMENT | La page rattachée à un voyant est dans le plan du site et le déclare (alerte tant que la page n'est pas écrite) | erreur / alerte | `tests/controle.test.ts`, `tests/plan.test.ts` |
| R2-MOINS-GRAVE | Une ligne saisie liée à un voyant (`voyant_lie`) n'a ni un verdict moins grave ni une urgence moins forte que ce voyant dans la base. Une ligne non liée n'est pas comparée | erreur | `r2-moins-grave`, `valide-ligne-non-liee`, `tests/controle.test.ts` |
| R2-CODE-SANS-VOYANT | Une page code défaut déclare au moins un voyant, et chacune de ses lignes saisies porte `voyant_lie` : son verdict vient des notices et du voyant, jamais moins grave que lui | erreur | `r2-code-sans-voyant` |
| R3-PREMIERE-MAIN / R3-SOURCE-INCONNUE | Chaque verdict (base voyants et lignes saisies) s'appuie sur au moins une citation de première main qui fixe un niveau ; la source de `texte_reference` (pneus) est de première main ; les sources citées et celles du libellé d'un code défaut (`libelle_sources`, secondaire admise) existent au registre | erreur | `r3-pas-premiere-main`, `r3-reglement-onu-seul`, `r3-source-inconnue`, `r3-texte-reference-seconde-main` |
| R3-CITATION-NIVEAU | Chaque citation d'une notice constructeur donne le niveau (verdict et urgence) que la grille tire de sa consigne ; une source secondaire ou le règlement ONU n° 121 (symboles et couleurs) n'en donnent jamais ; un niveau se donne en entier | erreur | `r3-citation-sans-niveau`, `r3-niveau-secondaire` |
| R3-PLUS-PRUDENT / R3-NIVEAU-SANS-SOURCE | Le verdict et l'urgence d'une ligne sont ceux de la citation la plus prudente (docs/03, règle 10) : ni moins prudents, ni plus sévères qu'aucune citation (un niveau plus sévère que toutes les sources serait un verdict inventé) | erreur | `r3-moins-prudent`, `r3-niveau-sans-source` |
| R3-NIVEAU-A-VERIFIER | Rappel : l'extrait cité contient un mot repère de la grille (« arrêt … impératif », « faire appel », « sans tarder »…) et le niveau saisi pour la citation est moins prudent que ce que la grille en tire (exception : entretien périodique) | **alerte** | `tests/controle.test.ts` |
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
| R9-PUB-AVANT-ENCADRE | Aucun emplacement publicitaire (`data-emplacement-pub`, ou bloc AdSense `adsbygoogle`) avant l'encadré ni dedans | erreur | `r9-pub-avant-encadre`, `tests/controle.test.ts` |
| R9-ENCADRE-CONTENU | L'encadré affiche la question de décision et le coût probable (v5 : libellés de la plage calculée ou « Selon le voyant », risque si l'on continue, texte des montants et des prises en charge), puis une ligne par situation (`data-encadre-ligne`, dans l'ordre, avec `data-verdict` et `data-urgence` égaux au niveau de la situation) qui affiche la situation, le libellé de son verdict et de son urgence (grille), son action et, s'il existe, l'écart entre marques, sans le libellé d'un autre niveau. Les signes qui portent un sens comptent (−, +, <, >, €…) | erreur | `r9-encadre-incomplet`, `tests/controle.test.ts` |
| R9-ENCADRE-MASQUE | Rien de masqué : ni l'encadré, ni un bloc qui le contient ou qu'il contient (`hidden`, `display:none`, `visibility:hidden`, `details`, `dialog`, `template`, `aria-hidden="true"` sur du texte). Une icône décorative sans texte peut porter `aria-hidden` | erreur | `r9-encadre-masque`, `tests/controle.test.ts` |
| PICTO-ABSENT / PICTO-INVALIDE | Chaque ligne de la base voyants a son pictogramme `src/pictogrammes/<pictogramme>.svg` ; le fichier est un SVG autonome : balise `svg` avec `viewBox`, éléments de forme seulement (liste blanche : pas de texte, d'image, de script, de style, d'animation), liens et `url()` internes (`#…`), aucun gestionnaire d'événement, 8 Ko au plus (fichier entier, commentaires compris) | erreur | `tests/controle.test.ts` |

Non vérifiable par machine (liste de recette) :
- R6, l'ordre des causes (jamais « par fréquence » sans donnée sourcée) ;
- le classement de chaque consigne de notice dans la grille, l'extrait fidèle à la source et le texte de l'écart entre marques : vérifiés par Houssem sur le paquet de validation (docs/03, règle 7) ;
- toutes les notices consultées pour une ligne sont citées, y compris celles qui donnent un niveau plus prudent ;
- une source « notice constructeur » est bien la notice d'utilisation du véhicule, pas une page web générique de la marque (rangée en « secondaire ») ;
- un pictogramme redessiné par nos soins, jamais copié (docs/01) ;
- étape 12 : les annonces automatiques AdSense, insérées dans le navigateur, ne se placent pas avant l'encadré de décision (invisible pour le contrôle de la page construite).

## Coût probable (demande de changement n° 6, docs/08 §7)
Structure : `src/schemas/cout.ts` ; données : `data/couts.json` ; calcul : `src/lib/cout.ts`.

| Code | Règle | Gravité | Test |
|---|---|---|---|
| COUT-PIECES-ABSENTES | Une page sans causes (hors page outil) déclare ses pièces (`cout_probable.pieces`) : sa plage en est calculée | erreur | `cout-pieces-absentes` |
| COUT-PIECES-DOUBLE | Une page à causes, ou la page outil, ne déclare pas de pièces : la plage se calcule sur les causes (« Selon le voyant » pour l'outil, qui n'affiche pas non plus le dépannage automatique). Une cause sans pièce est refusée par le schéma (R7-CHAMP-MANQUANT) ; un identifiant en double dans une liste, aussi (R7-DOUBLON) | erreur | `cout-pieces-double`, `cout-pieces-outil`, `cout-cause-sans-piece`, `valide-outil` |
| COUT-PIECE-INCONNUE | Chaque pièce citée existe dans `data/couts.json` ; une pièce manquante s'y ajoute dans la pull request du lot | erreur | `cout-piece-inconnue` |
| COUT-MONTANT-INCONNU / COUT-MONTANT-AUTOMATIQUE | Chaque montant déclaré existe ; un montant automatique (dépannage sur autoroute, affiché sur toute page à verdict d'arrêt) ne se déclare pas | erreur | `cout-montant-inconnu`, `cout-montant-automatique` |
| COUT-PRISE-EN-CHARGE-INCONNUE / COUT-PRISE-EN-CHARGE | Chaque prise en charge existe ; elle ne s'affiche que si la plage va au moins jusqu'à « Réparation au garage » | erreur | `cout-prise-en-charge-inconnue`, `cout-prise-en-charge-hors-plage` |
| COUT-RISQUE / COUT-RISQUE-SOURCE | Le risque si l'on continue n'est pas plus léger que le début de la plage, et il cite au moins une source de première main | erreur | `cout-risque-plus-leger`, `cout-risque-sans-premiere-main` |
| COUT-CITATION-INTROUVABLE / COUT-CITATION-AMBIGUE | Une citation référencée (voyant, source, emplacement, début de l'extrait si besoin) désigne exactement une citation de la base voyants : dans `si_vous_continuez`, et dans la grille des coûts (données réelles) | erreur | `cout-citation-introuvable`, `tests/controle.test.ts` |
| COUT-GROUPES | Chaque tranche de la grille s'appuie sur les notices d'au moins 2 groupes de constructeurs (données réelles) | erreur | `tests/controle.test.ts` |
| COUT-FOURCHETTE-SOURCES | Une fourchette en euros cite au moins 2 sources du registre, d'éditeurs différents | erreur | `tests/controle.test.ts` |
| COUT-MONTANT-SOURCE | Un montant fixé par un texte cite au moins une source de Légifrance | erreur | `tests/controle.test.ts` |
| R4-MONTANT-VALIDATION-ABSENTE / R4-MONTANT-EMPREINTE | Le texte de chaque montant et de chaque prise en charge (avec sa date d'entrée en vigueur, ses sources et son affichage automatique) porte l'empreinte validée par Houssem : absente, une alerte ; différente, une erreur | alerte / erreur | `tests/controle.test.ts` |
| R4-MONTANT-NON-VALIDE | Une page n'affiche un montant ou une prise en charge que si son texte est validé (empreinte présente et juste) | erreur | `tests/controle.test.ts` |
| COUT-A-REVERIFIER | Un montant ou une prise en charge dont la dernière vérification dépasse son délai (`reverifier_apres_jours`) | alerte (échec le lundi) | `tests/controle.test.ts` |
| COUT-FOURCHETTE-A-REVOIR | Une fourchette en euros relevée il y a plus de 365 jours | alerte (échec le lundi) | `tests/controle.test.ts` |
| COUT-DATE-FUTURE | Une date de vérification ou de relevé dans le futur (elle couperait les deux alertes précédentes) | alerte | `tests/controle.test.ts` |

R9 (affichage) : l'encadré affiche la plage en entier et dans l'ordre (« de « X » à « Y » »), le risque (« Si vous continuez de rouler : risque de « … » »), le texte de chaque montant avec ses dates (« en vigueur depuis le … », « vérifié le … ») et le texte de chaque prise en charge (page de test `r9-encadre-sans-cout`).

Non vérifiable par machine (liste de recette) : la tranche donnée à une nouvelle pièce (validée par Houssem avec le lot) ; la fidélité d'une fourchette à ses sources et l'indépendance réelle de ses deux sources (pas le même groupe, pas l'une qui reprend l'autre) ; le texte d'un montant au Journal officiel, revérifié avant de fusionner un lot qui l'affiche.

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
| CANONICAL-ABSENT / CANONICAL-MULTIPLE / CANONICAL-ADRESSE | Chaque page construite, sauf la 404, porte une seule balise canonical, égale à sa propre adresse absolue (`https://decodauto.com` + adresse, barre finale comprise). Le gabarit la calcule ; elle n'est jamais saisie |
| CANONICAL-404 | La page 404 ne porte pas de canonical |
| SITEMAP-ABSENT / SITEMAP-FORMAT / SITEMAP-PAGE-ABSENTE / SITEMAP-ADRESSE-INCONNUE / SITEMAP-DOUBLON | `sitemap.xml` (généré à la construction par `scripts/integration-plan-du-site.ts`) est bien formé et liste exactement les pages construites, sans la 404, une fois chacune, à leur adresse canonique. Ni `priority` ni `changefreq` (ignorés par Google). Pas encore de `lastmod` : il sera ajouté avec les premières pages éditoriales (étape 8), tiré de `date_modification` (idée reportée du journal) |
| ROBOTS-SITEMAP | `robots.txt` annonce le plan du site : `Sitemap: https://decodauto.com/sitemap.xml` |

Tests : `tests/canonical.test.ts` (site construit de test), `tests/site.test.ts` (fonctions de `src/lib/site.ts`, robots.txt du dépôt, adresse du site égale à `site` dans `astro.config.mjs`).

## Production en ligne (`npm run production`, job « production » de la CI)
Sur `main` (après chaque déploiement réussi, chaque lundi, à la demande depuis l'onglet Actions) : un écart fait échouer le run. Sur une pull request ou une autre branche, il est informatif (`--information` : avertissements, job vert) : la production n'a pas encore les changements de la branche et dépend aussi des réglages Cloudflare, hors du dépôt. Une erreur réseau (nom introuvable, délai dépassé) devient un constat décrit, sans interrompre les autres vérifications. Aucun secret. Code : `scripts/lib/production.ts` ; tests : `tests/site.test.ts` (faux réseau).

| Code | Contrôle |
|---|---|
| PROD-HTTP / PROD-HTTP-CHEMIN | `http://decodauto.com/` redirige en 301, en une fois, vers `https://decodauto.com/`, chemin et paramètres conservés |
| PROD-WWW / PROD-WWW-CHEMIN | `https://www.decodauto.com/` redirige en 301 vers `https://decodauto.com/`, chemin et paramètres conservés |
| PROD-HTTP-WWW | `http://www.decodauto.com/` aboutit à `https://decodauto.com/` (réponse 200) en une ou deux redirections, toutes en 301 |
| PROD-ACCUEIL | `https://decodauto.com/` répond 200 |
| PROD-NOINDEX-ABSENT / PROD-NOINDEX-PRESENT | L'en-tête `X-Robots-Tag: noindex` est servi si et seulement si le dépôt n'est pas indexable (même double clé que la construction) |
| PROD-ROBOTS | `robots.txt` en ligne identique à `public/robots.txt` |
| PROD-SITEMAP | `sitemap.xml` en ligne répond 200, en XML |

Non vérifiable par machine (liste de recette de l'étape 9) : réglages Cloudflare eux-mêmes (robots d'IA, Bot Fight Mode, Rocket Loader), soumission du plan du site dans Search Console et Bing Webmaster Tools.

## Brouillon de la base voyants et paquet de validation (étape 5)
Avant la validation de Houssem, les lignes de la base sont préparées dans `data/voyants.brouillon.json` : la forme d'une ligne de la base sans l'empreinte, plus `sans_consigne`, la liste des notices consultées qui décrivent l'état sans consigne propre (elles ne fixent aucun niveau ; le paquet les montre). `npm run paquet` contrôle le brouillon et génère le paquet de validation (`travaux/etape-5/paquet-validation.md`). Code : `scripts/lib/brouillon.ts` ; tests : `tests/brouillon.test.ts`. Après la validation notée au journal, `node scripts/valider-brouillon.ts --valide-par-houssem AAAA-MM-JJ --empreinte <empreinte du paquet>` vérifie que le brouillon est bien celui du paquet validé (empreinte affichée dans le paquet), écrit les lignes dans `data/voyants.json` avec leur empreinte, enregistre la validation dans `travaux/etape-5/validation.json` et supprime le brouillon.

| Code | Règle | Gravité |
|---|---|---|
| R3-*, R8-COHERENCE, R1-RATTACHEMENT, R7-LIEN-OUTIL | Les règles de la base voyants, appliquées à chaque ligne du brouillon (toutes sauf R4) | erreur |
| PICTO-ABSENT | Pictogramme manquant : alerte pendant le dessin, erreur avec `--pictogrammes-obligatoires` (`npm run paquet`) et pour la base finale | alerte / erreur |
| R7-FORMAT (sans_consigne) | `sans_consigne` ne liste que des notices constructeur du registre, jamais une notice déjà citée avec un niveau dans la même ligne | erreur |
| PORTE5-SOURCE | Porte de l'étape 5 : chaque page éditoriale de la vague A a au moins une source de première main, rattachée par la base (voyants) ou par le tableau `travaux/etape-5/pages-sources.json` | erreur |

## Charte éditoriale (étape 6)
Textes affichés tels quels (mention en tête, signature, ligne de transparence, section « Méthode » de « à propos ») : `src/lib/charte.ts` ; vue générée dans `docs/10_charte_editoriale.md` (`npm run charte:vue`). Tests : `tests/charte.test.ts` (sans dépendance).

| Code | Règle | Gravité |
|---|---|---|
| CHARTE-A-JOUR | Les parties générées de `docs/10` sont celles que donnent le code et le registre des sources | erreur |
| CHARTE-EXPRESSION | Aucune expression interdite (`EXPRESSIONS_INTERDITES` : expertise, équipe, garantie ou certification inventées, « nous ») dans les textes affichés ; les cas permis sont testés | erreur |
| CHARTE-VALIDATION-ABSENTE / CHARTE-EMPREINTE | Les textes affichés portent l'empreinte validée par Houssem (`data/charte-validation.json`) : absente, une alerte ; différente, une erreur | alerte / erreur |

## Empreinte de validation
Code : `src/lib/empreinte.ts` ; calcul : `npm run empreinte -- <page.md>`, `npm run empreinte -- --voyant <id>`, `npm run empreinte -- --montant <id>` (montant ou prise en charge de `data/couts.json`) ou `npm run empreinte -- --charte` (textes affichés de la charte). L'empreinte se copie après la validation de Houssem, jamais pour faire passer un contrôle.
- **Ligne de la base voyants** (`validation` de `data/voyants.json`) : identifiant, nom, couleur, pictogramme et son dessin (contenu du fichier SVG ; espaces et commentaires ignorés), situation, verdict, urgence, action, écart entre marques et citations (source, page ou section, extrait, niveau). L'ordre des citations n'a pas d'effet.
- **Page éditoriale** (`validation` du frontmatter) : l'encadré de décision, c'est-à-dire la question de décision, les lignes de situation dans l'ordre (une ligne reprise de la base y figure par l'identifiant du voyant et ce que l'encadré en affiche : situation, verdict, urgence, action, écart ; les changer oblige à relire l'encadré, corriger une citation non ; une ligne saisie en entier, voyant lié compris) et le coût probable (v5 : plage calculée, par les identifiants de ses tranches ; pièces de chaque cause, dans l'ordre des causes, ou pièces de la page ; risque si l'on continue et ses citations ; montants et prises en charge par leur identifiant ; base de calcul ; sources). Reclasser une pièce dans `data/couts.json` change la plage, donc l'empreinte des encadrés qui l'affichent. Exigée sur toute page éditoriale, même sans ligne saisie.
- **Montant ou prise en charge** (`validation` dans `data/couts.json`) : identifiant, texte, date d'entrée en vigueur, sources et affichage automatique. La date de vérification n'y entre pas : la mettre à jour ne demande pas de revalidation. Mettre à jour un texte (nouveau tarif) fait valider l'entrée une fois, sans revalider les encadrés qui l'affichent.
- **Textes affichés de la charte** (`validation` de `data/charte-validation.json`) : mention en tête, signature (sans ses dates), ligne de transparence, titre, ancre et texte de la section « Méthode », calculés sur un registre fixe de trois notices : ajouter une notice au registre change la liste affichée sans demander de revalidation.
- Casse, accents, ligatures, ponctuation et espaces n'ont pas d'effet : une coquille de ce type ne demande pas de revalidation (« 5 % » = « 5% », « 1 000 » = « 1000 », « 2,5 » = « 2.5 »). Un mot, une lettre, un chiffre ou un signe qui porte un sens (−, +, <, >, ≤, ≥, ±, €, %, °) changé demande une revalidation. Le reste du texte de la page se corrige librement.
