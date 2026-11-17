# Étape 11, piste technique : modèle de la page fluide au format 2

Partie technique des modèles de l'étape 11 (docs/03, règle 12, première exception, demande de changement n° 21),
branche `etape-11/modele-fluide` depuis `main` à 97be2f3. Rien de publié : la production est identique à `main`.

## Ce que fait le modèle

`pageFluideF2` (`src/lib/modeles.ts`), choisi par `modeleDeLaPage` pour une page fluide au format 2. Ordre de la page
(charte graphique §4) :

1. mention en tête, fil d'Ariane, H1 ;
2. encadré de décision, signature, ligne de transparence, bloc « Notices / Base du coût » ;
3. illustration, sommaire ;
4. **fiche « Le fluide en bref »** : normes et spécifications, comment vérifier, quand changer. C'est le rôle du fluide et
   la marche à suivre, comme le veut la charte éditoriale §4 (« rôle, niveau, appoint, marche à suivre ») ;
5. fiche « Le tutoriel en bref » (format tutoriel) ;
6. texte rédigé, avec les étapes (`{{etapes}}`) et le tableau (`{{tableau}}`, l'élément unique du type) ;
7. tableau des notices, si un voyant de la base est rattaché à la page ;
8. pages liées, sources.

Choix faits (règle 6) :

- **Composants existants seulement.** La fiche « Le fluide en bref » (`src/lib/fiche-fluide.ts`) est le composant « Fiches »
  de la charte (carte, intitulé en gras au-dessus de sa valeur, rangées séparées d'un filet). Même balisage que « Le
  symptôme en bref » et « Le texte en bref » : aucun style nouveau. Il restera à l'ajouter au nom des fiches de
  `docs/11` §4 après validation.
- **Format 2 seul.** Une page fluide au format 1 est refusée à la construction (`refusFormatVagueB`, vague C). Le type
  fluide n'a pas de modèle au format 1 ; les pages de test (`tests/fixtures`) restent au format 1, et la fiche n'y est pas
  attendue.
- Ni réponse directe ni causes : le schéma n'en a pas. La demande de changement de la réponse directe est préparée par le
  pilotage.

Contrôle nouveau : **FICHE-FLUIDE-ABSENTE / FICHE-FLUIDE-INCOMPLETE** (`src/lib/controle.ts`, `CONTROLES.md`). Une page
fluide au format 2 affiche une seule fiche, au texte exact ; les autres pages n'en ont pas. Les marqueurs `{{etapes}}` et
`{{tableau}}` sont admis sur une page fluide ; FICHE-TUTORIEL-*, R7-TUTORIEL-ETAPES et R7-ELEMENT-UNIQUE-ABSENT
s'appliquent comme ailleurs.

## Page de démonstration

`tests/demo/format2/fluide/niveau-huile.md` vient de l'exemple de la préparation (`preparation/etape-11`,
`exemples/fluide/niveau-huile.md`, 4e6851f), brouillon jamais validé. Deux changements seulement :

- le commentaire d'en-tête ;
- le lien vers la page mère « huile moteur », écrit en texte. Cette page n'est pas construite, donc le lien était cassé
  (`npm run liens` : LIEN-CASSE). **Le contrôle de la construction ne le signale pas** : un lien du texte vers une page
  du plan, liée mais pas encore construite, passe. C'est à corriger dans l'exemple, ou à publier « huile moteur » avant ou
  avec cette page.

La page ne passe que par la construction de démonstration (`npm run demo:format2`), jamais par `exemples/` ni par
`src/content`. Elle est ajoutée à `lighthouserc-demo-format2.json`.

## Preuves

| Preuve | Résultat |
|---|---|
| `npm run schemas`, `npm test` | 0 erreur ; 862 tests sur 862, dont `tests/format2-fluide.test.ts` (6) |
| `npm run build`, recette des exemples, `npm run liens` | 0 erreur (22 pages) ; 0 erreur ; 647 liens, 0 problème |
| `npm run demo:format2` | 26 pages, 0 erreur (empreinte absente de la page de démonstration, attendue) ; liens : 842, 0 problème |
| Indexation durable, `verifier:modes` | 0 erreur ; 4 OK |
| Production comparée à `main` | `SITE_INDEXABLE=true npx astro build` des deux côtés (`main` 97be2f3), puis `diff -rq` : **identique** |
| FORMAT2-MESURES (`mesures-format2.txt`) | 25 pages, 150 mesures, **0 erreur**. Page fluide à 375 × 667 (police chargée / de secours) : première situation 506 / 531 ; bas de l'encadré 1 603 / 1 628 (4 lignes) ; **illustration 2 087 / 2 111, au-delà de trois écrans** (2 001), signalée : encadré de 4 lignes, puis bloc « Notices » ; sommaire 2 380 ; étapes 3 804 / 3 828 (six écrans : 4 002) ; tableau 6 172 ; page 9 321. À 320 px : 320 de large, aucun débordement. À 1366 : première situation 354, illustration 1 241, étapes 2 595 |
| Lighthouse mobile (`lighthouse.txt`) | 100 / 100 / 100, CLS 0 (SEO 66 : construction en noindex) |
| Captures (`captures/`, 34 PNG) | 375 × 667 et 1366 × 800, police chargée et de secours : premier écran, page entière, encadré, bloc « Notices », illustration, sommaire, fiche du fluide, fiche du tutoriel, étapes, tableau. Une capture en police de secours identique octet pour octet n'est pas gardée |

## Ce qui manque au schéma `fluidePageSchema` pour ce modèle (non changé)

1. **`reponse_directe`** : la règle 2c (demande n° 30) range les huiles et liquides parmi les pages informatives. Le
   schéma réserve ce champ aux pages pneus et obligations ; la demande de changement est préparée par le pilotage.
2. **Sources de `comment_verifier` et de `normes`** : seul `quand_changer` a ses `sources`. Les deux autres champs
   écrivent leurs notices dans le texte (« (notices Peugeot 208 et Citroën C3) »). Ces sources n'entrent donc ni dans
   « Sources » ni dans un contrôle, et le texte de la fiche porte des références que la règle 2d sort du texte ailleurs.
   Proposition : `comment_verifier: { texte, sources }` et `normes: [{ texte, sources }]`, comme `quand_changer`.
3. **`normes` en liste de textes** : la fiche les joint par « ; », ce qui donne « … C3) ; Jamais d'additif… »
   (majuscule après un point-virgule). Une liste dans la fiche serait une variante du composant, à dessiner d'abord
   (charte §6).
4. **`causes`** (pas demandé, à décider) : les questions « pourquoi ma voiture consomme de l'huile / du liquide » sont
   traitées dans le texte, sans cartes de causes. Le coût se calcule par `cout_probable.pieces`.
