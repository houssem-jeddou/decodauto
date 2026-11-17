# Lot C4 : points ouverts (pour le pilotage)

> **Brouillon, jamais validé.** 17/11/2026, branche `etape-11/lot-c4`.

## 1. Test rouge, non modifié : `tests/porte6.test.ts`, « porte de sortie de l'étape 6 »

- **Constat** (`npm test`, 863 sur 864) : « exemples/pneus/contre-visite-controle-technique.md : la page
  contre-visite-controle-technique n'est pas de la vague A ». Le test (ligne 37) parcourt **toutes** les pages rédigées
  des types de la vague A (`code-defaut`, `pneus`, `voyant`) et exige qu'elles soient de la vague A et portent une
  empreinte. Les deux pages du lot C4 sont les premières pages `pneus` d'une autre vague (C) : le test les prend pour
  des exemples de l'étape 6.
- **Ce que je n'ai pas fait** : modifier le test (consigne : un contrôle qui échoue pour autre chose qu'une empreinte
  attendue, on s'arrête et on le dit).
- **Correction proposée** (une ligne, sans affaiblir la porte de l'étape 6) : dans la boucle, ne contrôler que les pages
  de la vague A, les pages des vagues suivantes restant contrôlées par R4-VALIDATION-ABSENTE à la construction et par la
  règle de passage :
  ```ts
  if (page.vague !== 'A') continue; // pages du même type des vagues suivantes (pneus, vague C) : R4-VALIDATION-ABSENTE et règle de passage
  ```
  à la place de `assert.equal(page.vague, 'A', …)`, et l'assertion « au moins un exemple » comptée sur les seules pages de
  la vague A. Le même cas se présentera pour un code défaut ou un voyant d'une vague ultérieure.

## 2. À relire à l'écran avant la validation
- R314-1 et R323-1 : la première phrase (ce qui est puni). Les pages ne citent que les sanctions.
- Arrêté du 18 juillet 2019, article 5 : la phrase entière (la citation en reprend une partie).

## 3. Demande de changement n° 36
Proposée (`demande-changement-36.md`) : sans elle, les trois lignes de la page « contre-visite » n'ont pas de règle
écrite pour leur niveau (seul précédent : la loi montagne).
