# Demande de changement n° 5 : modèles des types panne, fluide et dossier déplacés aux étapes 10 et 11

Proposée le 28/10/2026, au départ de l'étape 6, sur la recommandation acceptée dans son principe par Houssem le 28/10 (option 2). Texte revu par un relecteur indépendant (« à corriger », rien de bloquant ; ses formulations sont reprises). **Acceptée par Houssem le 28/10/2026 (10 h 25)** ; appliquée dans 03 v6 (projet et `docs/03`).

## Élément concerné
`03_plan_avancement_et_regles.md` (v5), tableau des étapes : lignes 6 (Charte et modèles de pages), 10 (Vague B) et 11 (Vague C), colonnes « Livrable » et « Porte de sortie ».

Ne changent pas :
- la structure des contenus (`src/schemas/`, où les 6 types existent déjà) ;
- le plan du site ;
- la base voyants ;
- les règles 1 à 13.

## Changement proposé
Aucun critère n'est retiré. Ceux des types panne, fluide et dossier s'appliquent à l'étape qui produit leurs premières pages. Un critère est ajouté à l'étape 6 : l'échelle du coût probable couvre les 42 pages.

**Étape 6, livrable** : la phrase « Un modèle par type (voyant, code, panne, fluide, pneus, dossier) avec un exemple rédigé. » devient :
> « Un modèle par type de la vague A (voyant, code, pneus), chacun avec un exemple rédigé, et les composants qu'ils partagent (encadré de décision, gravité lisible sans la seule couleur, lien « Signaler une erreur », ligne de transparence). Les modèles panne, dossier et fluide, l'arbre de décision et le format tutoriel sont livrés aux étapes 10 et 11. »

**Étape 6, porte de sortie** : « Exemples validés par Houssem (verdicts et encadrés de décision). » devient :
> « Exemples des types voyant, code et pneus validés par Houssem (verdicts et encadrés de décision). Tranches de coût couvrant les 42 pages du plan. »

Le reste de la porte est inchangé : charte, base de calcul sourcée de chaque tranche, ligne de transparence, section méthode, gravité lisible et lien « Signaler une erreur » dans les modèles, briefs de la vague A.

**Étape 10, livrable**, au début :
> « D'abord, les modèles panne (avec l'arbre de décision et le format tutoriel) et dossier, chacun avec un exemple rédigé, préparés sur la branche du lot ; un exemple n'est publié qu'avec son lot. »

**Étape 10, porte de sortie**, au début :
> « Exemples panne et dossier validés par Houssem (verdicts et encadrés de décision) avant la rédaction du lot ; gravité lisible et lien « Signaler une erreur » présents dans ces modèles ; chaque exemple passe ensuite par le paquet et la recette de son lot. »

**Étape 11, livrable**, au début :
> « D'abord, le modèle fluide (tableau, format tutoriel pour le niveau d'huile), avec un exemple rédigé, préparé sur la branche du lot ; l'exemple n'est publié qu'avec son lot. »

**Étape 11, porte de sortie** : « Mêmes critères que la vague B » devient :
> « Exemple fluide validé par Houssem (verdicts et encadré) avant la rédaction du lot, avec gravité lisible et lien « Signaler une erreur ». Mêmes critères que la vague A ; recette repassée avant chaque fusion d'un lot. »

Cette formulation évite que « mêmes critères que la vague B » reprenne le nouveau critère des modèles panne et dossier.

## Raison (données)
1. **Aucune page de ces types dans la vague A** (`data/plan-du-site.json`).
   - Vague A : 12 voyant, 5 code-defaut, 2 pneus, 3 socle.
   - Panne (10 pages) et dossier (1) sont en vague B ; fluide (7) en vague C, avec 2 pneus.
   - Un modèle de ces types construit à l'étape 6 ne servirait à aucune page avant l'étape 10.
2. **Le registre ne couvre que la vague A.**
   - La porte 5 garantit une source de première main pour chaque page de la vague A ; l'exemple d'un type voyant, code ou pneus s'appuie donc sur des sources déjà au registre.
   - Le registre (`data/sources.json`) compte 7 sources : 5 notices et 2 textes de Légifrance. Aucune ne couvre le dossier PureTech, et aucune n'a été cherchée pour les pages panne et fluide.
   - Un exemple panne, fluide ou dossier demanderait d'abord ce sourçage.
3. **Le temps de validation de Houssem est le goulot** (journal, « Séances de validation »).
   - Garder les 6 exemples à l'étape 6, c'est valider 6 encadrés au lieu de 3 avant la vague A, plus le sourçage du dossier PureTech.
   - La vague A porte 60 % des volumes du périmètre (612 092 recherches sur 1 019 100, lignes comptées de 05) ; B 23 %, C 17 %. Mettre la vague A en ligne plus tôt sert d'abord le trafic.
4. **Rien ne reste sans contrôle.**
   - Les règles propres à ces types sont déjà actives, avec leurs pages de test (`CONTROLES.md`) : arbre de décision pour une panne, tableau pour un fluide, étapes d'un tutoriel (R7-ELEMENT-ATTENDU, R7-ELEMENT-UNIQUE-ABSENT, R7-TUTORIEL-ETAPES).
   - Une page panne ou fluide sans ces éléments ne peut pas se construire.

## Impact sur ce qui est validé
| Élément | Impact |
|---|---|
| 03 v5 | Passe en v6 : trois lignes du tableau des étapes, texte ci-dessus. Les règles 1 à 13 ne changent pas |
| Structure des contenus, plan du site, base voyants, registre | Aucun |
| Étapes 1 à 5 validées | Aucun |
| Étape 6 en cours | Le livrable des modèles est réduit à trois modèles et trois exemples. La porte gagne un critère : l'échelle du coût couvre les 42 pages, dont les pannes |
| Étapes 10 et 11 | Un livrable et un critère de porte de plus au début de chacune. Le modèle et l'exemple ouvrent l'étape : la rédaction du lot commence après leur validation. La règle 12 (piste technique) n'est pas modifiée |
| Séances de validation (journal) | Trois encadrés de moins avant la vague A. Une séance de validation de plus aux étapes 10 et 11 (l'exemple, avant la rédaction du lot), en plus du paquet de chaque lot |
| Publication | Aucune page de ces types avant leur étape : l'exemple est préparé sur la branche du lot et publié seulement avec son lot, après le paquet et la recette |

## Contrôles à relancer
- Aucun contrôle automatique n'est touché : le changement porte sur un document de pilotage.
- Après l'accord :
  - 03 v6 mis à jour dans le projet ;
  - copie `docs/03` par pull request, CI verte ;
  - décision inscrite au journal ;
  - découpage de l'étape 6 et prévision recalés.
