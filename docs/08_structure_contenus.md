# Structure des contenus — decodauto.com (v3)

Validée par Houssem le 22/10/2026, après trois revues indépendantes. Étape 3, livrable « Structure des contenus ».
v2 (23/10/2026, accord de Houssem) : ajout du champ facultatif `voyant_lie` dans une ligne de situation saisie (voir le champ situations et la règle 2).
v3 (23/10/2026, demande de changement n° 1 de l'étape 4, acceptée par Houssem) : les liens entre pages passent dans le plan du site ; les pages ne déclarent plus de liens (voir le champ liens et la section 4).

**Archivé le 23/10/2026 (décision de Houssem, porte de l'étape 3)** : la transposition en schémas est validée. Ce sont désormais **les schémas du dépôt (`src/schemas/`, contrôles dans `src/lib/controle.ts`) qui font foi** ; ce fichier reste la référence lisible. Toute modification de structure passe par une demande de changement (03) et met à jour les schémas, puis ce fichier.

Image de référence : un type de page = une table ; un champ = une colonne ; une page = une ligne ; un champ obligatoire = une colonne obligatoire.

## 1. Champs communs à toutes les pages éditoriales (hors socle)

| Champ | Obligatoire | Saisi / calculé | Règle |
|---|---|---|---|
| id | ✅ | saisi | Identifiant stable de la page. C'est la clé avec le plan du site (étape 4). |
| requete_principale | ✅ | **calculé** depuis le plan du site | Sert à pré-remplir title et H1. Contrôle : elle figure dans le title ou le H1. |
| title, h1, description | ✅ | saisis | Référencement. |
| image | recommandé | saisi | Image de la page. Google la recommande pour les articles. |
| question_decision | ✅ | saisi | Exemple : « Puis-je rouler avec le voyant d'huile allumé ? ». « Sans objet » est interdit hors socle. |
| situations | ✅ | saisi, ou repris de la base | Liste de {situation, verdict, urgence, **action**, sources}, avec en option `voyant_lie` (identifiant d'un voyant déclaré dans `voyants`) quand la ligne saisie concerne ce voyant. Voir les règles 1 et 2 ci-dessous. |
| voyants | si la page traite un ou plusieurs voyants | saisi | Liste d'identifiants de la base voyants. Utilisable dans **tous** les types de page. |
| cout_probable | ✅ | saisi | Échelle fermée en ordres de grandeur, avec une base de calcul et des sources du registre. Aucun prix d'enseigne, aucun prix de prestation (règle 5 de 01). Les tranches, et le niveau où le coût est porté (situation ou cause), seront fixés à l'étape 6. |
| sources | ✅ | saisi | Identifiants du registre des sources (étape 5). Jamais de source recopiée dans la page. |
| element_unique | ✅ | saisi | Arbre de décision, tableau, outil ou photo réelle. Sa présence est vérifiée **dans la page construite**. |
| liens | — | **calculé** depuis le plan du site | Champ supprimé des pages en v3. Les liens viennent du plan du site (section 4). |
| auteur | ✅ | saisi | Renvoie à la fiche auteur de la page « à propos ». |
| relecteur | conditionnel | saisi | Affiché seulement s'il existe. Dépend de la décision ouverte (mécanicien ou sources seules). |
| date_publication, date_modification, date_revue, prochaine_revue | ✅ | saisies ou calculées | date_modification = dernière modification réelle, distincte de la revue. Piste à tester : la tirer de l'historique Git. |
| adresse, theme | ✅ | **calculés** depuis le plan du site | Jamais saisis. |
| niveau_securite | ✅ | **calculé** | Reprend la situation la plus grave de la page. |
| validation | ✅ si verdict | saisi par Houssem | Empreinte de {verdict, urgence, action, sources}. Pour les voyants, la validation est portée par la base. |

**Listes fermées**
- verdict, du moins grave au plus grave : `oui` / `oui avec précautions` / `non, arrêt dès que possible` / `non, arrêt immédiat`.
- urgence : `aucune` / `sous quelques semaines` / `sous quelques jours` / `immédiate`.

## 2. Types de pages (alignés sur les modèles de l'étape 6, plan 03)

| Type | Pages (02) | Champs propres |
|---|---|---|
| Voyant | outil voyants, 11 pages voyants | causes. L'outil a en plus un contenu de guide et un filtre par couleur. Il est généré depuis la base et lisible sans JavaScript. La page FAP contient une partie « référence FAP ». |
| Code défaut | P0420, P0087, P0299, P0380, P1351 | code, libellé ; générique ou constructeur (marques obligatoires si constructeur, règle 9 de 01) ; carburant ; précisions par marque (facultatif, sourcé) ; causes |
| Panne | 6 pannes, page batterie, tutos batterie (changer, recharger) et FAP | symptôme ; carburant ; contexte (démarrage, à froid, en roulant…) ; arbre de décision ; causes |
| Fluide | page huile (vidange), 5W30, 5W40, 10W40, vérifier le niveau d'huile, liquide de refroidissement, liquide de frein | normes et spécifications ; comment vérifier ; quand changer (sourcé) ; tableau |
| Pneus et obligations | pression, usure, loi montagne, contrôle technique | texte de référence : Légifrance ou arrêté préfectoral. Contrôle technique : défaillances (mineures, majeures, critiques) et contre-visite. Loi montagne : période et zones. |
| Dossier | PureTech | journal des modifications ; revue trimestrielle |
| Socle | accueil, mentions légales, à propos (avec la fiche auteur) | format simple : titre, adresse, date de mise à jour. Pas d'encadré de décision. |

**Format « tutoriel »**, possible dans tous les types (changer et recharger la batterie, nettoyer le FAP, vérifier le niveau d'huile) :
- champs : outils, durée, difficulté, quand ne pas le faire soi-même ;
- les étapes s'écrivent dans le texte, en liste numérotée ;
- le symptôme et l'arbre de décision ne sont pas exigés.

## 3. Règles de contrôle (contrôles automatiques)
1. **Verdicts des voyants.** Les lignes de verdict qui portent sur un voyant déclaré viennent de la base voyants. Elles ne peuvent pas être saisies dans la page, quel que soit son type. Chaque voyant de la base est rattaché à une seule page, en plus de l'outil.
2. **Cohérence avec la base.** Une ligne saisie qui porte `voyant_lie` ne peut pas afficher un verdict moins grave que celui de ce voyant dans la base. Le voyant doit figurer dans la liste `voyants` de la page. Liste de recette : toute ligne saisie qui parle d'un voyant porte `voyant_lie` (vérification humaine).
3. **Sources.** Chaque verdict de sécurité cite au moins une source de première main.
4. **Validation.** Une empreinte de validation qui ne correspond plus bloque la construction. La version déjà en ligne reste en place : on ne retire jamais une page. Corriger une faute de frappe ne demande pas de revalidation.
5. **Revue.** Une date de revue dépassée déclenche une alerte, pas un blocage.
6. **Causes.** Elles sont présentées dans un ordre logique, jamais classées « par fréquence » sans donnée sourcée.
7. **Champs obligatoires.** Un champ obligatoire manquant, une valeur hors liste fermée ou un élément unique absent de la page construite bloquent la construction.

## 4. Plan du site et liens entre pages (v3)
Le plan du site (`data/plan-du-site.json`) est la référence du maillage. Une ligne = une page : id, type, thème, vague, adresse, requête principale, mots-clés, et en option :
- `parent` : la page mère. Elle est reprise dans l'adresse (l'adresse de l'enfant est sous celle de la mère) et dans le fil d'Ariane. **La page mère affiche ses pages enfants**, par un lien calculé.
- `liens` : les pages liées. Chaque paire n'est déclarée qu'une fois ; le lien retour est calculé.

Règles :
1. Un lien du plan ne s'affiche que si les deux pages sont construites. Un lien vers une page pas encore écrite n'est ni une erreur ni une alerte : le contrôle l'indique en une ligne d'information.
2. Un lien écrit dans le texte d'une page ne mène qu'à une page liée dans le plan (lien déclaré, page mère ou page enfant). Il en va de même pour les liens que l'outil voyants génère depuis la base voyants. Ajouter une paire de liens au plan se propose dans la pull request du lot de pages concerné, avec une ligne de justification, et Houssem la valide avec le lot (décision du 23/10/2026). Retirer un lien, ou toute autre modification du plan, passe par une demande de changement.
3. Contrôles : lien vers une page inconnue ou vers soi-même, paire déclarée deux fois, page mère inconnue, cycle de pages mères, adresse de l'enfant hors de celle de sa mère. Détail et codes : `CONTROLES.md`.
