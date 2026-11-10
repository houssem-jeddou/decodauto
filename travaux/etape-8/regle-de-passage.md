# Règle de passage d'une page rédigée (livrable 8.3.0)

Où vit une page rédigée avant et après sa mise en ligne, et ce qui la suit quand elle change de dossier. À valider par Houssem (elle touche les tests de la porte 6).

## La règle

1. **Avant la mise en ligne** : une page rédigée et validée vit dans `exemples/<type>/<id>.md` (branche d'intégration `integration/vague-a`). Elle n'est construite que par la recette des exemples (`AVEC_EXEMPLES=1`, `dist-exemples`, jamais déployée). Aucune vraie page n'est dans `src/content` avant la mise en ligne.
2. **Le passage** est un déplacement de fichier sans autre changement de contenu : `exemples/<type>/<id>.md` → `src/content/<type>/<id>.md`. Il se fait **seulement dans la pull request de mise en ligne**, sur demande de Houssem, par `npm run passage -- <id> --appliquer` (sans `--appliquer` : essai à blanc).
3. **Conditions contrôlées avant tout déplacement** (`scripts/lib/passage.ts`, refus avec la liste des écarts) :
   - l'identifiant est dans `data/plan-du-site.json` et le fichier source porte ce même identifiant ;
   - la page n'existe pas déjà dans `src/content` (un identifiant, un seul fichier) ;
   - pour une page éditoriale, l'empreinte recalculée par `scripts/empreinte.ts` est celle du champ `validation` : la même assertion que la porte 6, jamais recalculée pour passer ;
   - `src/content/socle/a-propos.md` existe (sauf pour « à propos » elle-même) : sans elle, les liens « Méthode » de la page en ligne sont cassés et `npm run liens` échoue en production, car `--attendu` n'existe que dans la recette ;
   - l'adresse n'est pas déjà dans `lighthouserc.json`.
4. **Ce que fait le passage** : `git mv` ; les briefs sont régénérés (`node scripts/briefs.ts`, le chemin de l'exemple y est écrit) ; l'adresse de la page s'ajoute à `lighthouserc.json` (liste de production) et reste dans `lighthouserc-exemples.json`. Restent à la main, dans le même commit : retirer de `.github/workflows/ci.yml` les lignes `--attendu` qui visaient la page, et l'indication « exemple » de son commentaire d'en-tête si elle existe.

## Ce qui suit la page sans qu'on écrive de chemin

Les tests ne citent plus `exemples/…` en dur : `tests/porte6.test.ts`, `tests/briefs.test.ts`, `tests/modeles.test.ts`, `tests/outil-voyants.test.ts`, `tests/socle.test.ts` et `scripts/lib/briefs-donnees.ts` cherchent la page aux deux endroits par `scripts/lib/pages-redigees.ts` (`localiserPage`, `pageRedigee`, `pagesDuType`).

## Ce qui n'est pas allégé

- Porte 6 : mêmes assertions sur chaque page (identifiant du plan, type, vague A, empreinte égale à la validation) ; s'y ajoute que le nom du fichier est l'identifiant. Les pages de `src/content` y sont contrôlées comme celles de `exemples/`.
- Un identifiant présent dans les deux dossiers fait échouer les tests (`tests/passage.test.ts`) et le passage.
- Chaque page de `src/content` doit être dans la liste Lighthouse de production (`tests/passage.test.ts`).
- Aucun contrôle de `scripts/controle.ts`, `liens` ou de la recette n'est modifié.

## Hors règle (décisions de Houssem, pas de ce livrable)

Quelles pages passent et quand (go/no-go de la loi montagne, ordre des lots) ; l'adresse de contact et les mentions légales (7.4b) ; la bascule d'indexation.
