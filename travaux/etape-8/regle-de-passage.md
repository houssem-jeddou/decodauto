# Règle de passage d'une page rédigée (livrable 8.3.0)

Où vit une page rédigée avant et après sa mise en ligne, et ce qui la suit quand elle change de dossier. À valider par Houssem (elle touche les tests de la porte 6).

## La règle

1. **Avant la mise en ligne** : une page rédigée et validée vit dans `exemples/<type>/<id>.md` (branche d'intégration `integration/vague-a`). Elle n'est construite que par la recette des exemples (`AVEC_EXEMPLES=1`, `dist-exemples`, jamais déployée). Aucune vraie page n'est dans `src/content` avant la mise en ligne.
2. **Le passage** est un déplacement de fichier sans autre changement de contenu : `exemples/<type>/<id>.md` → `src/content/<type>/<id>.md`. Il se fait **seulement dans la pull request de mise en ligne**, sur demande de Houssem, par `npm run passage -- <id> --appliquer` (sans `--appliquer` : essai à blanc).
3. **Conditions contrôlées avant tout déplacement** (`scripts/lib/passage.ts`, refus avec la liste des écarts) :
   - l'identifiant est dans `data/plan-du-site.json` et le fichier source porte ce même identifiant ;
   - la page n'existe pas déjà dans `src/content` (un identifiant, un seul fichier) ;
   - pour une page éditoriale, l'empreinte recalculée par `scripts/empreinte.ts` est celle du champ `validation` : la même assertion que la porte 6, jamais recalculée pour passer ;
   - `src/content/socle/a-propos.md` existe (sauf pour « à propos » elle-même) : sans elle, les liens « Méthode » de la page en ligne sont cassés et `npm run liens` échoue en production, car `--attendu` n'existe que dans la recette ; et elle porte la fiche de l'auteur de la page (champ `auteurs`), sinon R7-AUTEUR-INCONNU échouerait à la construction ;
   - l'adresse n'est pas déjà dans `lighthouserc.json`.
4. **Ce que fait le passage** : le nouveau texte de `lighthouserc.json` est préparé d'abord (rien n'est déplacé si cela échoue), puis `git mv`, adresse ajoutée à la liste de production (elle reste dans `lighthouserc-exemples.json`), briefs régénérés (`node scripts/briefs.ts`, le chemin de l'exemple y est écrit). Restent à la main, dans le même commit : vérifier qu'aucune ligne `--attendu` de `.github/workflows/ci.yml` ne vise la page (la recette n'en a plus depuis le livrable 7.3 : un attendu qui ne se produit plus fait échouer le job); retirer l'indication « exemple » du commentaire d'en-tête de la page s'il y en a une.

## Ce qui suit la page sans qu'on écrive de chemin

Les tests ne citent plus `exemples/…` en dur : `tests/porte6.test.ts`, `tests/briefs.test.ts`, `tests/modeles.test.ts`, `tests/outil-voyants.test.ts`, `tests/socle.test.ts` et `scripts/lib/briefs-donnees.ts` cherchent la page aux deux endroits par `scripts/lib/pages-redigees.ts` (`localiserPage`, `pageRedigee`, `pagesDuType`).

## Ce qui n'est pas allégé

- Porte 6 : mêmes assertions sur chaque page (identifiant du plan, type, vague A, empreinte égale à la validation) ; s'y ajoute que le nom du fichier est l'identifiant. Les pages de `src/content` y sont contrôlées comme celles de `exemples/`.
- Un identifiant présent dans les deux dossiers fait échouer les tests (`tests/passage.test.ts`) et le passage.
- Chaque page de `src/content` doit être dans la liste Lighthouse de production (`tests/passage.test.ts`).
- Aucun contrôle de `scripts/controle.ts`, `liens` ou de la recette n'est modifié.

## Limites connues (à traiter quand elles se présenteront)

- Aucune page ne peut passer tant que « à propos » n'est pas écrite (livrable 7.3) : le lot 8.3 en dépend, ce que le journal doit dire.
- Les doublons et la couverture Lighthouse se vérifient par nom de fichier ; la porte 6 impose nom = identifiant pour les types voyant, code défaut et pneus, pas pour le socle.
- La porte 6 impose `vague === 'A'` aux pages `pneus`, `voyant`, `code-defaut` : la mise en ligne d'une page de vague C la fera échouer, il faudra alors trancher (demande de changement).
- Le job Lighthouse a un délai de 15 minutes : chaque page en ligne ajoute 3 passages ; la durée est à mesurer au fil des lots.
- Aucune construction de production n'a encore eu une vraie page dans `src/content` : la première sera le premier test réel.

## Hors règle (décisions de Houssem, pas de ce livrable)

Quelles pages passent et quand (go/no-go de la loi montagne, ordre des lots) ; l'adresse de contact et les mentions légales (7.4b) ; la bascule d'indexation.
