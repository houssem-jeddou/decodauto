# Étape 11, piste technique : modèle de la page fluide au format 2

Partie technique des modèles de l'étape 11 (docs/03, règle 12, première exception, demande de changement n° 21),
branche `etape-11/modele-fluide` depuis `main` à 97be2f3. Rien de publié : la production est identique à `main`.

## Ce que fait le modèle

`pageFluideF2` (`src/lib/modeles.ts`), choisi par `modeleDeLaPage` pour une page fluide au format 2. Ordre de la page
(charte graphique §4) :

1. mention en tête, fil d'Ariane, H1 ;
2. encadré de décision, qui commence par la **réponse directe** (page informative), puis signature, ligne de transparence,
   bloc « Notices / Base du coût » ;
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
- **Réponse directe ouverte au type fluide** (demande de changement n° 30, acceptée : règle 2c, « huiles et liquides »
  parmi les pages informatives, et précision 2a pour le premier écran). Le schéma la réservait aux pages pneus : c'était
  un oubli de mise en œuvre, corrigé sans demande de changement nouvelle. `fluidePageSchema` l'admet, 40 mots au plus ; les
  autres types la refusent toujours. `pageFluideF2` l'exige, comme le modèle l'exige pour la page de la pression des pneus.
  Même rendu et mêmes contrôles : FORMAT2-REPONSE, et FORMAT2-MESURES 2a, qui mesure la réponse directe puis le verdict et
  l'urgence de la première situation.
- Pas de causes : le schéma n'en a pas, et aucun champ nouveau n'est ajouté.

Contrôle nouveau : **FICHE-FLUIDE-ABSENTE / FICHE-FLUIDE-INCOMPLETE** (`src/lib/controle.ts`, `CONTROLES.md`). Une page
fluide au format 2 affiche une seule fiche, au texte exact ; les autres pages n'en ont pas. Les marqueurs `{{etapes}}` et
`{{tableau}}` sont admis sur une page fluide ; FICHE-TUTORIEL-*, R7-TUTORIEL-ETAPES et R7-ELEMENT-UNIQUE-ABSENT
s'appliquent comme ailleurs.

## Page de démonstration

`tests/demo/format2/fluide/niveau-huile.md` vient de l'exemple de la préparation (`preparation/etape-11`,
`exemples/fluide/niveau-huile.md`, 4e6851f), brouillon jamais validé. Trois changements seulement :

- le commentaire d'en-tête ;
- la réponse directe, celle que l'exemple propose en commentaire (31 mots selon le décompte du schéma ; l'exemple en
  annonçait 29) ;
- le lien vers la page mère « huile moteur », écrit en texte. Cette page n'est pas construite, donc le lien était cassé
  (`npm run liens` : LIEN-CASSE). **Le contrôle de la construction ne le signale pas** : un lien du texte vers une page
  du plan, liée mais pas encore construite, passe. C'est à corriger dans l'exemple, ou à publier « huile moteur » avant ou
  avec cette page.

La page ne passe que par la construction de démonstration (`npm run demo:format2`), jamais par `exemples/` ni par
`src/content`. Elle est ajoutée à `lighthouserc-demo-format2.json`.

## Preuves

| Preuve | Résultat |
|---|---|
| `npm run schemas`, `npm test` | 0 erreur ; 864 tests sur 864, dont `tests/format2-fluide.test.ts` (8) |
| `npm run build`, recette des exemples, `npm run liens` | 0 erreur (22 pages) ; 0 erreur ; 647 liens, 0 problème |
| `npm run demo:format2` | 26 pages, 0 erreur (empreinte absente de la page de démonstration, attendue) ; liens : 842, 0 problème |
| Indexation durable, `verifier:modes` | 0 erreur ; 4 OK |
| Production comparée à `main` | `SITE_INDEXABLE=true npx astro build` des deux côtés (`main` 97be2f3), puis `diff -rq` : **identique** |
| FORMAT2-MESURES (`mesures-format2.txt`) | 25 pages, 150 mesures, **0 erreur**. Page fluide à 375 × 667 (police chargée / de secours) : réponse directe jusqu'à 424 / 448 ; verdict et urgence de la première situation jusqu'à 538 / 563 (667 au plus, précision 2a), son action jusqu'à 646 / 671 ; bas de l'encadré 1 743 / 1 767 (4 lignes) ; **illustration 2 226 / 2 251, au-delà de trois écrans** (2 001), signalée : encadré de 4 lignes, puis bloc « Notices » ; **étapes 3 943 / 3 968, à 34 px du seuil de six écrans** (4 002) ; page 9 460 / 9 485. À 320 px : 320 de large, aucun débordement. À 1366 : réponse 315, première situation 428, illustration 1 316, étapes 2 669 |
| Lighthouse mobile (`lighthouse.txt`) | 100 / 100 / 100, CLS 0 (SEO 66 : construction en noindex) |
| Captures (`captures/`, 34 PNG) | 375 × 667 et 1366 × 800, police chargée et de secours : premier écran, page entière, encadré, bloc « Notices », illustration, sommaire, fiche du fluide, fiche du tutoriel, étapes, tableau. Une capture en police de secours identique octet pour octet n'est pas gardée |

## Ce qui manque au schéma `fluidePageSchema` pour ce modèle (non changé, sauf la réponse directe)

1. ~~`reponse_directe`~~ : ouverte au type fluide dans cette pull request (demande n° 30, règle 2c).
2. **Sources de `comment_verifier` et de `normes`** : seul `quand_changer` a ses `sources`. Les deux autres champs
   écrivent leurs notices dans le texte (« (notices Peugeot 208 et Citroën C3) »). Ces sources n'entrent donc ni dans
   « Sources » ni dans un contrôle, et le texte de la fiche porte des références que la règle 2d sort du texte ailleurs.
   Proposition : `comment_verifier: { texte, sources }` et `normes: [{ texte, sources }]`, comme `quand_changer`.
3. **`normes` en liste de textes** : la fiche les joint par « ; », ce qui donne « … C3) ; Jamais d'additif… »
   (majuscule après un point-virgule). Une liste dans la fiche serait une variante du composant, à dessiner d'abord
   (charte §6).
4. **`causes`** (pas demandé, aucun champ ajouté) : les questions « pourquoi ma voiture consomme de l'huile / du liquide »
   sont traitées dans le texte, sans cartes de causes. Le coût se calcule par `cout_probable.pieces`.
