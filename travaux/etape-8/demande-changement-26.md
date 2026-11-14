# Demande de changement n° 26 : moins de minutes de CI, sans retirer de contrôle

**Statut : proposée le 14/11/2026 (nuit), à la suite de ta décision du 14/11 (22 h 45) de fixer un budget GitHub Actions.** Piste technique (03, règle 12, exception 1) : elle ne dépend d'aucun contenu non validé.

- **Élément concerné** : `.github/workflows/ci.yml` (étape 7, porte fermée le 10/11), job « Production en ligne » et réglage `concurrency` ; texte du job dans `CONTROLES.md`.
- **Changement proposé** :
  1. le job « Production en ligne » ne tourne plus sur une pull request ni sur une branche autre que `main` ; il reste après chaque déploiement réussi, chaque lundi et à la demande sur `main`, avec les mêmes vérifications ;
  2. un lancement à la demande sur une branche autre que `main` (branches d'essai) annule le passage qu'il remplace, comme le fait déjà un nouveau commit sur une pull request. Rien ne change sur `main` : un déploiement va toujours au bout.
- **Raison (données)** : du 01/11 au 14/11, 230 passages de la CI et environ 2 100 minutes facturées (chaque job est arrondi à la minute supérieure), pour 2 000 minutes gratuites par mois ; la CI s'est arrêtée le 14/11 à 22 h 23. Le job « Production en ligne » dure environ 6 secondes mais coûte une minute à chaque passage : 227 minutes, dont 170 sur des pull requests et 28 sur des lancements d'essai, soit 198 minutes (9 % du total) pour une vérification qui y était seulement informative (avertissements, job toujours vert : la production n'a pas encore les changements de la branche). Les lancements d'essai ont coûté 191 minutes (28 passages).
- **Impact sur ce qui est validé** : aucun contrôle bloquant n'est retiré ; la production reste vérifiée après chaque mise en ligne, chaque lundi et à la demande. Les contrôles d'une pull request (schémas, tests, construction, liens, recette des exemples, Lighthouse) sont inchangés. Le garde-fou de déploiement (7.6) et le déploiement sont inchangés. Le test `tests/site.test.ts` (option `--apres-deploiement`, délai du job) reste valable.
- **Ce que Claude change aussi dans sa façon de travailler** (sans demande de changement) : regrouper les corrections avant de pousser, et ne lancer un essai qu'une fois les corrections d'une revue intégrées.
- **Contrôles à relancer** : CI de la pull request (le job « Production en ligne » n'y apparaît plus, les autres jobs passent), puis, après la fusion, le passage sur `main` (le job tourne après le déploiement).

**Économie attendue** : environ 9 % des minutes au rythme actuel, plus les passages d'essai remplacés.

**Ligne de validation proposée** : « J'accepte la demande n° 26 : plus de vérification de la production sur les pull requests et les branches d'essai, annulation des essais remplacés ; go pour la fusion de sa pull request si la CI est verte. »
