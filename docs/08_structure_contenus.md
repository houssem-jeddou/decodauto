# Structure des contenus — decodauto.com (v9)

Validée par Houssem le 22/10/2026, après trois revues indépendantes. Étape 3, livrable « Structure des contenus ».
v2 (23/10/2026, accord de Houssem) : ajout du champ facultatif `voyant_lie` dans une ligne de situation saisie (voir le champ situations et la règle 2).
v3 (23/10/2026, demande de changement n° 1 de l'étape 4, acceptée par Houssem) : les liens entre pages passent dans le plan du site ; les pages ne déclarent plus de liens (voir le champ liens et la section 4).
v4 (demande de changement n° 3, début de l'étape 5) : citations précises et niveau tiré de chaque notice, plusieurs marques par verdict, grille des niveaux de verdict et d'urgence, encadré de décision contrôlé et verrouillé, pictogrammes, libellé court, texte alternatif de l'image, profil de l'auteur, couleur « orange ou jaune », champ `relecteur` retiré (sections 1, 2, 3, 5 et 6).
v5 (demande de changement n° 6, étape 6, acceptée par Houssem le 28/10/2026) : échelle du coût probable, pièces des causes, montants fixés par un texte, fourchettes en euros (sections 1, 2, 3 et 7).
v6 (demande de changement n° 7, étape 6, acceptée par Houssem le 02/11/2026) : ordre de l'encadré de décision, la question, puis les lignes de situation, puis le coût probable (section 3, règle 9).
v7 (demande de changement n° 8, étape 6, acceptée par Houssem le 03/11/2026) : tableau « Ce que dit la notice de votre marque », élément unique des pages voyants et affiché sur toute page de rattachement d'un voyant de la base (sections 2 et 3, règle 12).
v8 (demande de changement n° 10, étape 6, acceptée par Houssem le 03/11/2026) : pas de dépannage automatique sur une page loi montagne, dont le verdict « non » vient d'une obligation d'équipement (section 1, ligne `cout_probable` ; règle 11).
v9 (demande de changement n° 12, étape 8, acceptée par Houssem le 04/11/2026) : renvoi vers la liste dans l'encadré de la seule page outil (section 3, règle 9).

**Archivé le 23/10/2026 (décision de Houssem, porte de l'étape 3)** : la transposition en schémas est validée. Ce sont désormais **les schémas du dépôt (`src/schemas/`, contrôles dans `src/lib/controle.ts`) qui font foi** ; ce fichier reste la référence lisible. Toute modification de structure passe par une demande de changement (03) et met à jour les schémas, puis ce fichier.

Image de référence : un type de page = une table ; un champ = une colonne ; une page = une ligne ; un champ obligatoire = une colonne obligatoire.

## 1. Champs communs à toutes les pages éditoriales (hors socle)

| Champ | Obligatoire | Saisi / calculé | Règle |
|---|---|---|---|
| id | ✅ | saisi | Identifiant stable de la page. C'est la clé avec le plan du site (étape 4). |
| requete_principale | ✅ | **calculé** depuis le plan du site | Sert à pré-remplir title et H1. Contrôle : elle figure dans le title ou le H1. |
| title, h1, description | ✅ | saisis | Référencement. |
| libelle_court | ✅ | saisi | v4. Libellé court de la page (45 caractères au plus) : fil d'Ariane, ancres, listes de pages, données structurées. |
| image | recommandé | saisi | Image de la page. Google la recommande pour les articles. |
| image_alt | ✅ si image | saisi | v4. Texte alternatif de l'image. |
| question_decision | ✅ | saisi | Exemple : « Puis-je rouler avec le voyant d'huile allumé ? ». « Sans objet » est interdit hors socle. |
| situations | ✅ | saisi, ou repris de la base | Liste de {situation, verdict, urgence, **action**, citations}, avec en option `voyant_lie` (identifiant d'un voyant déclaré dans `voyants`) quand la ligne saisie concerne ce voyant, et `ecart_marques` (v4). Chaque citation donne la source du registre, la page ou la section, l'extrait cité mot pour mot (400 caractères au plus) et, pour une notice constructeur, le niveau (verdict, urgence) que la grille tire de sa consigne (section 6). Voir les règles 1, 2, 3 et 8 ci-dessous. |
| voyants | si la page traite un ou plusieurs voyants | saisi | Liste d'identifiants de la base voyants. Utilisable dans **tous** les types de page. |
| cout_probable | ✅ | saisi, plage **calculée** | v5. Échelle fermée de 5 tranches qui disent la nature de la dépense (section 7). La plage n'est jamais saisie : elle se calcule depuis les pièces des causes (voyant, code défaut, panne) ou, sur une page sans causes, depuis `pieces` (identifiants de `data/couts.json`) ; la page outil affiche « Selon le voyant ». Champs : `pieces` (page sans causes seulement), `base_de_calcul`, `sources` (registre), `si_vous_continuez` (facultatif : tranche du risque si l'on continue de rouler, cité d'une notice, par référence à la base voyants ou en citation), `montants` et `prise_en_charge` (facultatifs, identifiants de `data/couts.json`). Le dépannage sur autoroute s'affiche de lui-même sur une page dont le niveau de sécurité est un verdict d'arrêt (pas sur la page outil, ni sur une page loi montagne, dont le verdict vient d'une obligation d'équipement : demande de changement n° 10). Montants en euros (règle 5 de 01, v. 28/10/2026) : fixés par un texte officiel, ou ordre de grandeur par pièce tiré d'au moins deux sources publiques d'éditeurs différents, daté et revu chaque année ; jamais le prix d'une enseigne en particulier. |
| sources | ✅ | saisi | Identifiants du registre des sources (étape 5). Jamais de source recopiée dans la page. |
| element_unique | ✅ | saisi | Arbre de décision, tableau, outil ou photo réelle. Sa présence est vérifiée **dans la page construite**. |
| liens | — | **calculé** depuis le plan du site | Champ supprimé des pages en v3. Les liens viennent du plan du site (section 4). |
| auteur | ✅ | saisi | Renvoie à la fiche auteur de la page « à propos ». |
| relecteur | — | — | **Retiré en v4.** Décision du 23/10/2026 : pas de relecteur extérieur. La fiabilité repose sur les sources citées et la validation de Houssem (03, règles 7 et 10). |
| date_publication, date_modification, date_revue, prochaine_revue | ✅ | saisies ou calculées | date_modification = dernière modification réelle, distincte de la revue. Piste à tester : la tirer de l'historique Git. |
| adresse, theme | ✅ | **calculés** depuis le plan du site | Jamais saisis. |
| niveau_securite | ✅ | **calculé** | Reprend la situation la plus grave de la page. |
| validation | ✅ | saisi après la validation de Houssem | v4. Empreinte de l'**encadré de décision** : question de décision, lignes de situation (une ligne reprise de la base par l'identifiant du voyant et ce que l'encadré en affiche : situation, verdict, urgence, action, écart, de sorte que les changer oblige à relire l'encadré ; une ligne saisie en entier) et coût probable (v5 : plage calculée, par les identifiants de ses tranches ; pièces de chaque cause ou de la page ; risque, montants et prises en charge par leur identifiant ; base de calcul et sources ; reclasser une pièce fait donc revalider). Exigée sur toute page éditoriale. Les lignes de la base voyants portent leur propre empreinte (section 5), comme le texte de chaque montant de `data/couts.json` (section 7). |

**Listes fermées**
- verdict, du moins grave au plus grave : `oui` / `oui avec précautions` / `non, arrêt dès que possible` / `non, arrêt immédiat`.
- urgence : `aucune` / `sous quelques semaines` / `sous quelques jours` / `immédiate`.
- Leur sens, leurs libellés pour le lecteur et les couples admis sont fixés par la grille (section 6).

## 2. Types de pages (alignés sur les modèles de l'étape 6, plan 03)

| Type | Pages (02) | Champs propres |
|---|---|---|
| Voyant | outil voyants, 11 pages voyants | causes ; tableau « Ce que dit la notice de votre marque » (élément unique, tiré de la base, v7). L'outil a en plus un contenu de guide et un filtre par couleur. Il est généré depuis la base et lisible sans JavaScript. La page FAP contient une partie « référence FAP ». |
| Code défaut | P0420, P0087, P0299, P0380, P1351 | code, libellé et sources du libellé (`libelle_sources`, v4 : source secondaire admise, la norme ISO 15031-6 n'étant pas achetée) ; générique ou constructeur (marques obligatoires si constructeur, règle 9 de 01) ; carburant ; précisions par marque (facultatif, sourcé) ; causes. Le verdict vient des notices et du voyant lié : la page déclare le voyant qui s'allume, et chaque ligne saisie porte `voyant_lie` (v4). |
| Panne | 6 pannes, page batterie, tutos batterie (changer, recharger) et FAP | symptôme ; carburant ; contexte (démarrage, à froid, en roulant…) ; arbre de décision ; causes |
| Fluide | page huile (vidange), 5W30, 5W40, 10W40, vérifier le niveau d'huile, liquide de refroidissement, liquide de frein | normes et spécifications ; comment vérifier ; quand changer (sourcé) ; tableau |
| Pneus et obligations | pression, usure, loi montagne, contrôle technique | texte de référence : Légifrance ou arrêté préfectoral. Contrôle technique : défaillances (mineures, majeures, critiques) et contre-visite. Loi montagne : période et zones. |
| Dossier | PureTech | journal des modifications ; revue trimestrielle |
| Socle | accueil, mentions légales, à propos (avec la fiche auteur) | format simple : titre, libellé court (facultatif), adresse, date de mise à jour. Pas d'encadré de décision. Fiche auteur : identifiant, nom, présentation, et en option les liens publics de son profil (`profils`, v4, données structurées). |

**Causes (v5)** : chaque cause porte `cause`, `explication` et `pieces` (identifiants de `data/couts.json`) ; sa tranche de coût est celle de sa pièce la plus lourde.

**Format « tutoriel »**, possible dans tous les types (changer et recharger la batterie, nettoyer le FAP, vérifier le niveau d'huile) :
- champs : outils, durée, difficulté, quand ne pas le faire soi-même ;
- les étapes s'écrivent dans le texte, en liste numérotée ;
- le symptôme et l'arbre de décision ne sont pas exigés.

## 3. Règles de contrôle (contrôles automatiques)
1. **Verdicts des voyants.** Les lignes de verdict qui portent sur un voyant déclaré viennent de la base voyants. Elles ne peuvent pas être saisies dans la page, quel que soit son type. Chaque voyant de la base est rattaché à une seule page, en plus de l'outil.
2. **Cohérence avec la base.** Une ligne saisie qui porte `voyant_lie` ne peut pas afficher un verdict moins grave, ni une urgence moins forte (v4), que ceux de ce voyant dans la base. Le voyant doit figurer dans la liste `voyants` de la page. Liste de recette : toute ligne saisie qui parle d'un voyant porte `voyant_lie` (vérification humaine).
3. **Sources.** Chaque verdict de sécurité s'appuie sur au moins une citation de première main qui fixe un niveau (verdict et urgence), avec sa page ou sa section et son extrait (v4). Chaque citation de notice donne le niveau tiré de sa consigne ; une source secondaire ou le règlement ONU n° 121 (symboles et couleurs) ne fixent jamais un niveau. Le verdict et l'urgence d'une ligne sont ceux de la citation la plus prudente : ni moins prudents, ni plus sévères qu'aucune citation (sinon le niveau serait inventé) ; un écart entre citations est signalé, et seulement s'il existe. Un mot repère de la grille dans un extrait avec un niveau moins prudent déclenche un rappel (alerte). Une ligne de la base voyants cite les notices d'au moins 3 marques de référence de 2 groupes différents (section 5). Liste de recette : toutes les notices consultées pour une ligne sont citées, y compris celles qui donnent un niveau plus prudent.
4. **Validation.** Une empreinte de validation qui ne correspond plus bloque la construction. La version déjà en ligne reste en place : on ne retire jamais une page. Une coquille d'accent, de ponctuation, de casse ou d'espace ne demande pas de revalidation ; un mot, une lettre, un chiffre ou un signe qui porte un sens (−, +, <, >, ≤, ≥, ±, €, %, °) changé en demande une (v4).
5. **Revue.** Une date de revue dépassée déclenche une alerte, pas un blocage.
6. **Causes.** Elles sont présentées dans un ordre logique, jamais classées « par fréquence » sans donnée sourcée.
7. **Champs obligatoires.** Un champ obligatoire manquant, une valeur hors liste fermée ou un élément unique absent de la page construite bloquent la construction.
8. **Grille (v4).** Le couple verdict / urgence de chaque ligne et de chaque citation est admis par la grille (section 6).
9. **Encadré de décision (v4).** La page construite contient un seul encadré de décision (`data-encadre-decision`), premier bloc après le H1 (rien entre les deux : la signature, la date et la ligne de transparence viennent après l'encadré ; le fil d'Ariane peut précéder le H1), sans emplacement publicitaire avant lui ni dedans, et sans rien de masqué, ni dedans ni autour (une icône décorative sans texte peut porter `aria-hidden`). Il affiche, dans cet ordre (v6), la question de décision, une ligne par situation (`data-encadre-ligne`, avec `data-verdict` et `data-urgence`, dans l'ordre des situations) : la situation, le libellé de son verdict et de son urgence (grille), son action et, s'il existe, l'écart entre marques ; puis le coût probable (v5, chaque phrase en entier : la plage « de « X » à « Y » » dans son ordre, ou « Selon le voyant » sur la page outil ; le risque « Si vous continuez de rouler : risque de « … » » ; le texte de chaque montant avec ses dates, « en vigueur depuis le … » et « vérifié le … » ; le texte de chaque prise en charge). Houssem le relit avant publication ; son empreinte le verrouille (champ validation). Sur la seule page outil (v9), une phrase et un lien vers la liste s'affichent entre la question et les lignes, qui ne sont que des exemples ; ce texte, fixe dans le code, entre dans l'empreinte de la page avec les autres textes fixes de l'outil. Liste de recette (étape 12) : les annonces automatiques AdSense, insérées dans le navigateur, ne se placent pas avant l'encadré.
10. **Pictogrammes (v4).** Chaque ligne de la base voyants a son pictogramme, un fichier SVG autonome de `src/pictogrammes`, redessiné par nos soins (recette : jamais copié).
11. **Coût probable (v5).** La plage se calcule (pièces des causes, ou pièces d'une page sans causes) et n'est jamais saisie ; chaque pièce, montant et prise en charge existe dans `data/couts.json` ; le dépannage automatique ne se déclare pas, et ne s'affiche ni sur la page outil ni sur une page loi montagne (demande de changement n° 10) ; le risque si l'on continue n'est pas plus léger que le début de la plage et cite une source de première main ; une prise en charge ne s'affiche que si la plage va au moins jusqu'à « Réparation au garage » ; un montant affiché a son texte validé par Houssem. Une fourchette en euros cite au moins deux sources d'éditeurs différents. Les citations de la grille désignent chacune une seule citation de la base voyants, et chaque tranche s'appuie sur au moins deux groupes de constructeurs.
12. **Tableau des notices (v7).** Toute page à laquelle un voyant de la base est rattaché affiche le tableau « Ce que dit la notice de votre marque » de ce voyant (`data-tableau-notices`) : une rangée par consigne citée d'une notice de constructeur, avec l'extrait mot pour mot, sa page et le niveau que la grille tire de cette consigne ; « Consigne retenue » marque les consignes qui donnent en entier le niveau de la ligne. Sur une page voyant (hors outil), ce tableau est l'élément unique. Une page qui reprend la ligne d'un voyant rattaché ailleurs n'affiche pas son tableau.

## 4. Plan du site et liens entre pages (v3)
Le plan du site (`data/plan-du-site.json`) est la référence du maillage. Une ligne = une page : id, type, thème, vague, adresse, requête principale, mots-clés, et en option :
- `parent` : la page mère. Elle est reprise dans l'adresse (l'adresse de l'enfant est sous celle de la mère) et dans le fil d'Ariane. **La page mère affiche ses pages enfants**, par un lien calculé.
- `liens` : les pages liées. Chaque paire n'est déclarée qu'une fois ; le lien retour est calculé.

Règles :
1. Un lien du plan ne s'affiche que si les deux pages sont construites. Un lien vers une page pas encore écrite n'est ni une erreur ni une alerte : le contrôle l'indique en une ligne d'information.
2. Un lien écrit dans le texte d'une page ne mène qu'à une page liée dans le plan (lien déclaré, page mère ou page enfant). Il en va de même pour les liens que l'outil voyants génère depuis la base voyants. Ajouter une paire de liens au plan se propose dans la pull request du lot de pages concerné, avec une ligne de justification, et Houssem la valide avec le lot (décision du 23/10/2026). Retirer un lien, ou toute autre modification du plan, passe par une demande de changement.
3. Contrôles : lien vers une page inconnue ou vers soi-même, paire déclarée deux fois, page mère inconnue, cycle de pages mères, adresse de l'enfant hors de celle de sa mère. Détail et codes : `CONTROLES.md`.

## 5. Base voyants et registre des sources (v4)
**Base voyants** (`data/voyants.json`) : une ligne = un voyant dans un état donné. Champs : id, nom, couleur, catégorie, page (l'unique page rattachée), **pictogramme** (dessin partagé par les états d'un même symbole), situation, verdict, urgence, action, **citations**, **ecart_marques** (obligatoire si les citations ne donnent pas toutes le même niveau), validation.
- Couleurs : rouge, **orange ou jaune** (une seule couleur : les notices disent « orange », le règlement ONU n° 121 dit « jaune » pour le même témoin), vert, bleu, blanc.
- Marques de référence (03, règle 10, liste dans `src/schemas/listes.ts`) : les six premières marques des immatriculations de voitures particulières neuves en France en 2025 (PFA / AAA Data), plus Seat, ajoutée par Houssem (notice publiée en ligne par le constructeur, groupe Volkswagen). Le groupe sert à ne pas compter comme indépendantes deux notices d'un même groupe, souvent rédigées sur le même modèle.

<!-- vue-grille:marques:debut (généré par npm run grille:vue : ne pas modifier à la main) -->
| Marque | Groupe |
|---|---|
| Renault | Renault Group |
| Peugeot | Stellantis |
| Dacia | Renault Group |
| Citroën | Stellantis |
| Volkswagen | Volkswagen Group |
| Toyota | Toyota |
| Seat | Volkswagen Group |

Règle : chaque ligne de la base voyants cite les notices d'au moins **3 marques** de cette liste, issues d'au moins **2 groupes** différents (4 groupes en tout). Deux notices d'une même marque comptent une fois.
<!-- vue-grille:marques:fin -->

- Empreinte de la ligne : identifiant, nom, couleur, pictogramme et son dessin, situation, verdict, urgence, action, écart et citations. Casse, accents, ponctuation et espaces n'ont pas d'effet (règle 4).
- **Gravité** d'un voyant (porte de l'étape 5) : son niveau dans la grille, c'est-à-dire le couple verdict / urgence (section 6). Pas de champ distinct.
- Une « notice constructeur » est la notice d'utilisation du véhicule. Une page web générique de la marque sur ses témoins se range en « secondaire » : elle peut être citée, sans fixer de niveau (les pages de volkswagen.fr, par exemple, donnent la même consigne d'arrêt pour des témoins rouges et jaunes).

**Registre des sources** (`data/sources.json`) : id, titre, éditeur, catégorie, adresse https, date de consultation, et pour une notice constructeur sa **marque** (obligatoire) et son modèle (facultatif).
- Catégories de première main : notice constructeur (notice d'utilisation du véhicule), Sécurité routière, Légifrance, textes du contrôle technique, arrêté préfectoral, **règlement ONU n° 121**, **RappelConso** (v4).
- Catégorie secondaire : tout le reste, dont les libellés des codes défaut tirés d'autres sources que la norme ISO 15031-6. Une source secondaire peut être citée, jamais pour fixer un verdict.

## 6. Grille des niveaux de verdict et d'urgence (v4)
Elle fait foi dans `src/schemas/grille.ts` ; la partie ci-dessous en est générée (`npm run grille:vue`). Le niveau de chaque citation de notice est vérifié par Houssem sur le paquet de validation.

<!-- vue-grille:grille:debut (généré par npm run grille:vue : ne pas modifier à la main) -->
Principes :
1. Chaque citation de notice est classée à partir de sa consigne écrite, citation par citation, selon le sens et non le seul verbe.
2. Le verdict se trouve en posant les questions dans l'ordre : la notice impose-t-elle l'arrêt ? Sinon, empêche-t-elle de rouler jusqu'au garage, ou annonce-t-elle un dégât grave si l'on roule ? Sinon, demande-t-elle, pour une anomalie, une action, une vérification, une visite au garage ou une conduite adaptée ? Sinon, c'est un fonctionnement normal (y compris attendre l'extinction d'un témoin avant de démarrer), une information ou un entretien périodique sans anomalie.
3. Une consigne qui relève de deux niveaux, ou une formulation absente de la grille, prend le niveau le plus prudent qu'elle peut signifier.
4. Le verdict et l'urgence d'une ligne sont au moins aussi prudents que la citation la plus prudente. Si les citations ne donnent pas toutes le même niveau, l'écart est signalé dans la ligne et affiché au lecteur.
5. Le couple verdict / urgence doit être admis par le tableau des urgences admises : ne pas pouvoir rouler implique d'agir tout de suite ; pouvoir rouler sans précaution exclut une action immédiate.
6. En cas de doute sur le classement d'une consigne, on retient le niveau le plus prudent et on recommande l'avis d'un professionnel.

| Verdict | Libellé affiché | Ce que cela demande au lecteur | Consignes de notice qui y mènent | Urgences admises |
|---|---|---|---|---|
| non, arrêt immédiat | Non, arrêtez-vous immédiatement | Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Ne repartez pas, sauf si l'action indiquée le permet (par exemple après refroidissement et mise à niveau) ; sinon, faites appel à l'assistance ou à un garage. | La notice impose l'arrêt : « l'arrêt du véhicule est impératif », « arrêtez-vous », « arrêtez le véhicule », « ne continuez pas à rouler », « coupez le moteur ». Le délai écrit à côté de l'arrêt ne change pas le niveau : « immédiatement », « dès que possible et en toute sécurité », « dès que les conditions de circulation le permettent ». | immédiate |
| non, arrêt dès que possible | Non, ne poursuivez pas votre trajet | Ne poursuivez pas votre trajet : rejoignez le premier endroit sûr et adapté (parking, aire, sortie suivante), arrêtez la voiture et faites-la contrôler avant de reprendre la route. | La notice empêche de rouler jusqu'au garage, sans imposer l'arrêt : « faire appel au réseau ou à un atelier qualifié », « faites remorquer », « contactez l'assistance ». La notice annonce un dégât grave si l'on continue de rouler, sans imposer l'arrêt : « risque de destruction du catalyseur ». | immédiate |
| oui avec précautions | Oui, avec précautions | Vous pouvez rouler en appliquant la précaution indiquée (allure modérée, vérification à faire, système d'aide indisponible) et en faisant ce qui est demandé dans le délai donné par l'urgence. | Pour une anomalie, la notice laisse rouler jusqu'au garage : « se rendre dans le réseau ou dans un atelier qualifié », « consultez un représentant de la marque », « faites vérifier », « faites contrôler ». Un entretien périodique sans anomalie n'en fait pas partie (verdict « oui »). La notice demande au conducteur une vérification ou une action sans s'arrêter tout de suite : « contrôler la pression des pneumatiques », « faire un appoint », « compléter le niveau ». La notice demande d'adapter sa conduite : « rouler prudemment à allure modérée », « régénérer le filtre en roulant à une vitesse d'au moins 60 km/h ». | aucune, sous quelques semaines, sous quelques jours, immédiate |
| oui | Oui, vous pouvez rouler | Rien n'impose d'arrêter ni de limiter la conduite : le voyant signale un fonctionnement normal, une information ou un entretien périodique à faire. | La notice décrit un fonctionnement normal ou une information, sans action à faire : témoin qui s'éteint après quelques secondes, « attendre l'extinction du témoin avant de démarrer », système en action ou désactivé. La notice rappelle un entretien périodique, sans anomalie signalée : « la révision du véhicule doit être effectuée dès que possible ». | aucune, sous quelques semaines, sous quelques jours |

| Urgence | Libellé affiché | Définition | Consignes de notice qui y mènent |
|---|---|---|---|
| immédiate | À faire tout de suite | Sans attendre, dès que c'est sans danger et dans l'ordre indiqué par l'action : les gestes de conduite en roulant (lever le pied, ralentir, rouler pour nettoyer le filtre à particules) ; l'arrêt, la vérification ou l'appoint au premier endroit sûr ; le passage au garage en y allant directement, si l'action permet de rouler. | La notice impose l'arrêt, ou empêche de rouler jusqu'au garage. La notice demande d'agir « immédiatement », « impérativement », « sans tarder », « sans attendre », « sans délai », « au plus tôt », « au plus vite », « dès que possible », « dès que les conditions de circulation le permettent », « le plus rapidement possible » ou « dans les plus brefs délais ». La notice demande au conducteur une action à faire « rapidement » (« compléter rapidement le niveau »). |
| sous quelques jours | À faire dans les jours qui viennent | À faire dans les jours qui viennent, sans attendre le prochain entretien. | La notice demande d'aller au garage « rapidement », ou sans écrire de délai. La notice demande une action du conducteur sans écrire de délai (« faire un appoint »). La notice rappelle un entretien périodique, sans anomalie signalée, « dès que possible » ou après l'échéance : c'est la seule exception où « dès que possible » ne vaut pas « tout de suite ». |
| sous quelques semaines | À prévoir dans les semaines qui viennent | À faire lors d'un prochain passage au garage, dans les semaines qui viennent. | La notice renvoie à un entretien à prévoir, sans échéance dépassée : « lors de la prochaine révision », « au prochain entretien ». |
| aucune | Aucune action nécessaire | Il n'y a rien à faire contrôler ni à réparer. | La notice décrit un fonctionnement normal ou une simple information. |
<!-- vue-grille:grille:fin -->

## 7. Coût probable (v5)
Demande de changement n° 6 (étape 6), acceptée par Houssem le 28/10/2026. La structure fait foi dans `src/schemas/cout.ts` (la partie ci-dessous en est générée par `npm run grille:vue`) ; les données font foi dans `data/couts.json` :
- `pieces` : liste fermée des pièces et opérations, avec leur tranche et, en option, une fourchette en euros (deux sources d'éditeurs différents, date de relevé). Une pièce manquante s'ajoute dans la pull request du lot qui en a besoin et se valide avec lui ;
- `montants` : montants fixés par un texte officiel (au moins une source de Légifrance), avec leur date d'entrée en vigueur (`en_vigueur_le`, si elle existe), leur date de vérification et leur délai de revérification ; texte validé par Houssem (empreinte, contrôle R4 : texte, date d'entrée en vigueur, sources, affichage automatique) ; `automatique` pour le dépannage sur autoroute ;
- `prises_en_charge` : même forme que les montants (garantie légale, à créer avec sa première page).

Contrôles : COUT-* (pièces, montants, prises en charge, risque, fourchettes, citations de la grille, groupes de constructeurs), R4 pour les montants, R9 pour l'affichage ; alertes datées COUT-A-REVERIFIER et COUT-FOURCHETTE-A-REVOIR, qui font échouer le contrôle du lundi (catalogue : `CONTROLES.md`).

<!-- vue-grille:couts:debut (généré par npm run grille:vue : ne pas modifier à la main) -->
Principes :
1. La tranche dit la nature de la dépense. Les tranches sont classées par lourdeur habituelle de l'intervention : c'est une convention, pas un montant.
2. Une cause cite des pièces ou des opérations de la liste fermée (data/couts.json) ; sa tranche est celle de sa pièce la plus lourde. La plage de la page va de la cause la plus légère à la plus lourde ; une page sans causes déclare ses pièces. Rien n'est saisi à la main.
3. Une pièce absente de la liste s'ajoute dans la pull request du lot qui en a besoin et se valide avec lui ; en cas de doute, la tranche la plus lourde plausible.
4. Une fourchette en euros (pièce et main-d'œuvre) n'est affichée que si au moins 2 sources publiques d'éditeurs différents placent le prix habituel dans la même fourchette ; jamais le tarif d'une seule enseigne. Elle est datée et revue au moins tous les 365 jours.
5. Un montant fixé par un texte officiel (amende, tarif réglementé) est cité avec sa source sur Légifrance, daté et revérifié à intervalle fixe ; son texte est validé par Houssem (empreinte).

| Tranche (de la plus légère à la plus lourde) | Libellé affiché | Définition affichée au lecteur | Consigne de notice qui y mène | Citations de la base voyants (voyant : source, emplacement) |
|---|---|---|---|---|
| aucun | Aucun frais | Fonctionnement normal ou simple information : rien à réparer. | La notice décrit un fonctionnement normal. | prechauffage : notice-renault-clio-5, p. 139, « Témoin de préchauffage (version Diesel) » ; prechauffage : notice-seat-ibiza, p. 289, « Gestion du moteur », Témoins ; frein-stationnement : notice-seat-ibiza, p. 251, « Système de freinage », Témoins ; frein-stationnement : notice-toyota-yaris, p. 118, 4.2.5 « Frein de stationnement » |
| geste | Geste à faire vous-même | Regonfler, faire un appoint, rouler pour régénérer le filtre à particules : gratuit, ou le prix d'un produit (huile, AdBlue). | La notice demande une action au conducteur. | huile-niveau : notice-seat-ibiza, p. 294, « Huile moteur », Témoin d'alerte ; huile-niveau : notice-toyota-yaris, p. 299, 7.2.5 « Si un message d'avertissement est affiché » ; adblue-reserve : notice-peugeot-208, p. 15, « AdBlue (BlueHDi) » ; fap : notice-seat-ibiza, p. 288-290, « Filtre à particules » |
| entretien | Entretien ou équipement courant | Une révision, une pièce d'usure ou un équipement prévu. Peut coûter plus qu'une petite réparation. | La notice renvoie à une révision ou à l'entretien périodique. | entretien-vidange : notice-peugeot-208, p. 19-20, « Indicateur d'entretien », Clé d'entretien ; entretien-vidange : notice-renault-clio-5, p. 122, « Ordinateur de bord », Autonomie de révision ; témoin Service p. 136 ; entretien-vidange : notice-toyota-yaris, p. 300, 7.2.5 « Si un message d'avertissement est affiché » |
| reparation | Réparation au garage | Une pièce défaillante à diagnostiquer puis à réparer ou remplacer, hors organe principal. | La notice demande de faire vérifier ou réparer par un atelier. | abs : notice-peugeot-208, p. 17, « Antiblocage des roues (ABS) » ; renvoi (3) p. 13 ; abs : notice-renault-clio-5, p. 138, « Témoin antiblocage des roues » ; abs : notice-toyota-yaris, p. 293, 7.2.4 « Si un voyant s'allume », Voyant ABS |
| organe | Grosse réparation | Le remplacement ou la remise en état d'un organe ou d'un système lourd. | La notice annonce un dégât grave sur un organe si l'on continue. | moteur-orange-clignotant : notice-peugeot-208, p. 15, « Système d'autodiagnostic moteur » ; renvoi (2) p. 13 ; moteur-orange-clignotant : notice-seat-ibiza, p. 288, « Gestion du moteur et système d'épuration des gaz d'échappement », Témoins ; moteur-rouge : notice-renault-clio-5, p. 125, « Messages d'alerte » (et p. 187 et 189) |

| Fourchette en euros (pièce et main-d'œuvre) | Texte affiché |
|---|---|
| moins-de-100 | moins de 100 € |
| 100-300 | de 100 à 300 € |
| 300-1000 | de 300 à 1 000 € |
| 1000-3000 | de 1 000 à 3 000 € |
| plus-de-3000 | plus de 3 000 € |
<!-- vue-grille:couts:fin -->
