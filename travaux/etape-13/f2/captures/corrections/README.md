# Lot F2 : deux corrections de modèle (captures avant et après, 375 × 667)

Signalées par la recette locale de la porte 10 (16/11/2026), corrigées dans la pull request du lot F2 à la demande du
pilotage :

1. **Lien « Votre marque » coupé sur deux lignes** (ligne d'écart de l'encadré, cartes de l'outil). Correction :
   `a[data-lien-notices]{white-space:nowrap}` (`src/styles/charte-b.css`) : le lien passe en entier à la ligne suivante.
2. **Préposition de la plage du coût probable seule en fin de ligne** (« de », « à », puis la pastille à la ligne).
   Une espace insécable ne suffit pas : Chrome coupe quand même avant une pastille (`inline-block`). Correction : la
   préposition et sa pastille sont groupées dans `<span class="borne">` (`plageHtml`, `src/lib/format2.ts`), qui ne
   passe pas à la ligne (`.borne{white-space:nowrap}`).

Relevé avant et après sur les 13 pages du lot (`coupures.cjs`, construction de production non indexable servie en
local, Chromium, police du système Inter) :

| Largeur | Avant : liens coupés / prépositions seules | Après |
|---|---|---|
| 320 px | 10 pages / 11 pages, toutes celles qui ont une plage (« de » et « à » sur 6) | aucun |
| 375 px | 9 pages / 11 pages (« à ») | aucun |
| 1366 px | aucun | aucun |

Fichiers : `<cas>-375-<chargee|secours>-<avant|apres>.png` (échelle 2, PNG sans perte ; `avant-apres.cjs`). Une
capture en police de secours identique octet pour octet à celle en police chargée n'est pas gardée. Cas : ligne
d'écart du voyant moteur et du voyant AdBlue, coût probable du voyant moteur et du voyant batterie, carte de l'outil.
