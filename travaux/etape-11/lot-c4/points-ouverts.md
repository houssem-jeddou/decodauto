# Lot C4 : points ouverts (pour le pilotage)

> **Brouillon, jamais validé.** 17/11/2026, branche `etape-11/lot-c4`.

## 1. `tests/porte6.test.ts` : corrigé (décision du pilotage du 17/11, règle 6)

- **Constat** (`npm test`, 863 sur 864 sur 42fea1b) : « exemples/pneus/contre-visite-controle-technique.md : la page
  contre-visite-controle-technique n'est pas de la vague A ». Le test parcourait **toutes** les pages rédigées des types
  de la vague A (`code-defaut`, `pneus`, `voyant`) ; les deux pages du lot C4 sont les premières pages `pneus` de la
  vague C.
- **Changement** (validé par Houssem avec le lot, comme tout changement d'un contrôle) : la vérification d'une page passe
  dans `controlerPageRedigee`, qui ne contrôle que les pages de la vague A (« ignoree » pour une autre vague) ;
  l'assertion « au moins un exemple » est comptée sur les pages de la vague A ; le commentaire dit pourquoi : les pages
  des vagues suivantes restent contrôlées par R4-VALIDATION-ABSENTE à la construction et par la règle de passage.
- **Preuve que la porte n'est pas affaiblie** : test nouveau « une page de la vague A sans empreinte échoue toujours ;
  une page d'une autre vague du même type est laissée à R4-VALIDATION-ABSENTE » : la page publiée « pression des pneus »
  (vague A), privée de sa ligne `validation`, fait échouer le contrôle (« encadré sans empreinte de validation ») ; la
  même page renommée en `usure-des-pneus` (vague C) est ignorée. `node --test tests/porte6.test.ts` : 4 sur 4.

## 2. Relus à l'écran le 17/11 vers 13 h 50 (relevé, §15)
R314-1 et R323-1 en entier ; arrêté du 18 juillet 2019, article 5, en entier. Les pages les citent désormais tels qu'ils
sont écrits (voir les paquets, §3).

## 3. Demande de changement n° 36
Proposée (`demande-changement-36.md`) : sans elle, les trois lignes de la page « contre-visite » n'ont pas de règle
écrite pour leur niveau (seul précédent : la loi montagne).
