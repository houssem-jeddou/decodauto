# Structure des contenus — decodauto.com (v1)

Validée par Houssem le 22/10/2026, après trois revues indépendantes. Étape 3, livrable « Structure des contenus ».

Ce fichier est la source de vérité jusqu'à ce que Claude Code le transforme en schémas dans le dépôt. Ensuite, ce sont **les schémas du dépôt qui font foi**, et ce fichier est archivé. Toute modification passe par une demande de changement (03).

Image de référence : un type de page = une table ; un champ = une colonne ; une page = une ligne ; un champ obligatoire = une colonne obligatoire.

## 1. Champs communs à toutes les pages éditoriales (hors socle)

| Champ | Obligatoire | Saisi / calculé | Règle |
|---|---|---|---|
| id | ✅ | saisi | Identifiant stable de la page. C'est la clé avec le plan du site (étape 4). |
| requete_principale | ✅ | **calculé** depuis le plan du site | Sert à pré-remplir title et H1. Contrôle : elle figure dans le title ou le H1. |
| title, h1, description | ✅ | saisis | Référencement. |
| image | recommandé | saisi | Image de la page. Google la recommande pour les articles. |
| question_decision | ✅ | saisi | Exemple : « Puis-je rouler avec le voyant d'huile allumé ? ». « Sans objet » est interdit hors socle. |
| situations | ✅ | saisi, ou repris de la base | Liste de {situation, verdict, urgence, **action**, sources}. Voir les règles 1 et 2 ci-dessous. |
| voyants | si la page traite un ou plusieurs voyants | saisi | Liste d'identifiants de la base voyants. Utilisable dans **tous** les types de page. |
| cout_probable | ✅ | saisi | Échelle fermée en ordres de grandeur, avec une base de calcul et des sources du registre. Aucun prix d'enseigne, aucun prix de prestation (règle 5 de 01). Les tranches, et le niveau où le coût est porté (situation ou cause), seront fixés à l'étape 6. |
| sources | ✅ | saisi | Identifiants du registre des sources (étape 5). Jamais de source recopiée dans la page. |
| element_unique | ✅ | saisi | Arbre de décision, tableau, outil ou photo réelle. Sa présence est vérifiée **dans la page construite**. |
| liens | facultatif | saisi | Chaque lien n'est déclaré qu'une seule fois ; le lien retour est calculé. Le plan du site (étape 4) reste la référence du maillage. |
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
2. **Cohérence avec la base.** Un code ou une panne lié à un voyant ne peut pas afficher un verdict moins grave que celui de la base.
3. **Sources.** Chaque verdict de sécurité cite au moins une source de première main.
4. **Validation.** Une empreinte de validation qui ne correspond plus bloque la construction. La version déjà en ligne reste en place : on ne retire jamais une page. Corriger une faute de frappe ne demande pas de revalidation.
5. **Revue.** Une date de revue dépassée déclenche une alerte, pas un blocage.
6. **Causes.** Elles sont présentées dans un ordre logique, jamais classées « par fréquence » sans donnée sourcée.
7. **Champs obligatoires.** Un champ obligatoire manquant, une valeur hors liste fermée ou un élément unique absent de la page construite bloquent la construction.
