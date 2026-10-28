# Demande de changement n° 5 : modèles des types panne, fluide et dossier déplacés aux étapes 10 et 11

Proposée le 28/10/2026, au départ de l'étape 6, sur la recommandation acceptée dans son principe par Houssem le 28/10 (option 2). **Non appliquée** : rien ne change dans 03 avant son accord sur ce texte (03, règle 5).

## Élément concerné
`03_plan_avancement_et_regles.md` (v5), tableau des étapes : lignes 6 (Charte et modèles de pages), 10 (Vague B) et 11 (Vague C), colonnes « Livrable » et « Porte de sortie ». Rien d'autre ne change : ni structure des contenus (`src/schemas/`, les 6 types y existent déjà), ni plan du site, ni base voyants, ni règles.

## Changement proposé
Aucun critère n'est retiré : celui des types panne, fluide et dossier s'applique à l'étape qui produit leurs premières pages.

**Étape 6, livrable**
- Avant : « Un modèle par type (voyant, code, panne, fluide, pneus, dossier) avec un exemple rédigé. »
- Après : « Les composants communs à tous les modèles (encadré de décision, gravité lisible sans la seule couleur, lien « Signaler une erreur », ligne de transparence, tableau « ce que dit la notice de votre marque ») et un modèle par type de la vague A (voyant, code, pneus), chacun avec un exemple rédigé. Les modèles des types panne, dossier et fluide sont livrés aux étapes 10 et 11. »

**Étape 6, porte de sortie**
- Avant : « Exemples validés par Houssem (verdicts et encadrés de décision). »
- Après : « Exemples des types voyant, code et pneus validés par Houssem (verdicts et encadrés de décision). »

Le reste de la porte est inchangé : charte, tranches de coût sourcées, ligne de transparence, section méthode, gravité lisible et lien « Signaler une erreur » dans les modèles, briefs de la vague A.

**Étape 10, livrable** : ajout au début.
> « D'abord, les modèles des types panne et dossier, chacun avec un exemple rédigé, construits avec les composants communs de l'étape 6 (dont le format tutoriel, utilisé pour la première fois par les tutos batterie et FAP). »

**Étape 10, porte de sortie** : ajout au début.
> « Exemples des modèles panne et dossier validés par Houssem (verdicts et encadrés de décision) avant la rédaction du lot ; gravité lisible sans la seule couleur et lien « Signaler une erreur » présents dans ces modèles. »

**Étape 11, livrable** : ajout au début.
> « D'abord, le modèle du type fluide, avec un exemple rédigé. »

**Étape 11, porte de sortie** : ajout au début.
> « Exemple du modèle fluide validé par Houssem (verdicts et encadré de décision) avant la rédaction du lot ; gravité lisible sans la seule couleur et lien « Signaler une erreur » présents dans ce modèle. »

## Raison (données)
1. **Aucune page de ces types dans la vague A** (`data/plan-du-site.json`).
   - Vague A : 12 voyant, 5 code-defaut, 2 pneus, 3 socle.
   - Panne (10 pages) et dossier (1 page) sont en vague B ; fluide (7 pages) est en vague C.
   - Un modèle construit à l'étape 6 pour ces types ne sert à aucune page avant l'étape 10.
2. **Leurs exemples demandent des verdicts qui ne sont pas encore validables.**
   - Une page panne, fluide ou dossier porte surtout des lignes saisies : citation de première main, niveau tiré de la grille, validation par Houssem.
   - Or le paquet de validation des lignes saisies n'est prévu qu'à partir de l'étape 8 (03, règle 7).
   - Le registre (`data/sources.json`) compte 7 sources : 5 notices et 2 textes de Légifrance. Il n'en a aucune pour le dossier PureTech.
3. **Le temps de validation de Houssem est le goulot** (journal, « Séances de validation »).
   - Garder les 6 exemples à l'étape 6, c'est valider 6 encadrés au lieu de 3 avant la vague A. C'est aussi un sourçage complet du dossier PureTech, sans un visiteur de plus avant la mise en ligne de la vague B.
   - Pour l'objectif (trafic et utilité), la vague A en ligne plus tôt compte davantage.
4. **Risque de reprise faible.**
   - Les composants que partagent tous les types sont construits et contrôlés à l'étape 6 : encadré, gravité, lien de signalement, transparence, tableau des notices.
   - Les modèles des étapes 10 et 11 les assemblent seulement. Les schémas des 6 types sont déjà validés (structure v4).

## Impact sur ce qui est validé
| Élément | Impact |
|---|---|
| 03 v5 | Passe en v6 : trois lignes du tableau des étapes, texte ci-dessus. Les règles 1 à 13 ne changent pas |
| Structure des contenus (`src/schemas/`), plan du site, base voyants, registre | Aucun |
| Étapes 1 à 5 validées | Aucun |
| Étape 6 en cours | Livrable 6.6 réduit à trois modèles et trois exemples ; porte 6 réduite d'autant |
| Étapes 10 et 11 | Un livrable et un critère de porte en plus chacune, au début de l'étape |
| Prévision (journal) | Étape 6 plus courte (3 encadrés à valider au lieu de 6). Les étapes 10 et 11 gagnent chacune une validation d'exemple, à grouper avec leur paquet |

## Contrôles à relancer
- Aucun contrôle automatique n'est touché : le changement porte sur un document de pilotage.
- Après l'accord :
  - 03 v6 mis à jour dans le projet ;
  - copie `docs/03` par pull request, CI verte ;
  - décision inscrite au journal.
