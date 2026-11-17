# Lot B1 de la vague B : « voiture ne démarre pas » et « moteur PureTech »

**Ouverture de la vague B** (`config/vagues-ouvertes.json` : `["A", "B"]`, règle des vagues ouvertes) : décidée par
Claude le 17/11/2026 vers 0 h 20 (heure de Tunis), sur la délégation de Houssem du 17/11 à 0 h 13 (il part dormir et
donne le feu vert pour valider seul, en partant de la recommandation de Claude ; restent à Houssem les verdicts de
sécurité nouveaux, qu'il n'a pas vus). Ce lot n'apporte aucun verdict nouveau : les deux pages sont celles que Houssem a
validées (16/11/2026, 19 h 26, « Je valide les exemples de la porte 10 », journal, PR n° 72), identiques à `b9b0835`.
Revue indépendante faite (« à corriger », rien de bloquant), corrections intégrées. Reste à faire par Houssem après la
mise en ligne : le rendu sur un vrai téléphone (liste de recette).

Brief : `travaux/etape-10/taches/B1-pr.md` (branche `preparation/etape-10`). Branche `etape-10/lot-b1`, depuis `main` à
a2b36ce (lot F2 fusionné).

## Ce que contient le lot

- **Pages** : `src/content/panne/voiture-ne-demarre-pas.md` et `src/content/dossier/moteur-puretech.md`, reprises de
  `preparation/etape-10` à b9b0835 (la version validée) **sans changer un mot** ; seul le commentaire d'en-tête (YAML, non
  affiché) dit maintenant la validation au lieu de « brouillon ». Illustrations `src/illustrations/batterie-cosses.svg` et
  `jauge-huile.svg`, générateur `travaux/etape-10/generer-illustrations.py`.
- **Registre** (`data/sources.json`) : `rappelconso-48835`, `rappelconso-48836`, `rappelconso-48204` (RappelConso) ;
  `peugeot-puretech-solutions` et `stellantis-puretech-indemnisation-2025` (secondaires, nature
  `communication-constructeur`, demande n° 31). Consultées le 2026-11-16. Le communiqué de Stellantis est celui de la
  version belge ; **la recherche d'une version France (paquet de la porte 10 validé, point 7) est reportée à la revue
  suivante de la page**, comme le paquet le prévoit. Entrées de la recette de la porte 10, sans la
  mention « (provisoire, jamais validé) » de leur titre.
- **Coûts** (`data/couts.json`) : pièces `pile-de-cle` et `carburant-et-reamorcage` (tranche `geste`) ; prise en charge
  `couverture-speciale-puretech` (source `peugeot-puretech-solutions`, vérifiée le 2026-11-16, à revérifier tous les
  90 jours). Entrées de la recette de la porte 10, libellés sans la mention « provisoire ».
- **Empreintes** (`npm run empreinte`), sur la base du lot F2 fusionnée :
  - `voiture-ne-demarre-pas` : `23847e53…2318` ;
  - `moteur-puretech` : `e663cb5d…dd31` ;
  - `couverture-speciale-puretech` : `91e0ad2e…52ab8`.

  Ce qui prouve qu'elles portent sur ce que Houssem a validé (revue du lot, M2) :
  1. les deux pages sont identiques à celles de `preparation/etape-10` à b9b0835, la version validée, hors commentaire
     d'en-tête et ligne `validation` (comparaison de tout le reste du fichier) ;
  2. l'empreinte couvre aussi les lignes de la base affichées dans l'encadré : calculée avec la base des voyants de la
     recette de la porte 10 (l'état vu par Houssem à 19 h 26) et avec celle du lot F2 fusionnée, elle est **la même**.

  La règle de passage, qui recalcule la même empreinte, n'est pas une preuve indépendante.
- **Passage** (`npm run passage -- <id> --appliquer`) : pages déplacées dans `src/content`, adresses ajoutées à
  `lighthouserc.json`.
- **Démonstration du format 2** : sa page de démonstration du dossier portait l'identifiant `moteur-puretech` (le seul
  dossier du plan) et ne peut plus être construite à côté de la vraie page (R7-DOUBLON). Elle passe dans
  `tests/demo/format2-remplacees/` (README), hors de la construction de démonstration, où seuls les tests du modèle la
  lisent ; dans la démonstration, la vraie page la remplace. Les pages de démonstration `perte-de-puissance`,
  `voiture-qui-broute` et `batterie-changer` suivront le même chemin avec les lots B4 et B2.
- **Test d'inventaire** du registre (`tests/sources-secondaires.test.ts`) : 24 sources secondaires, dont les deux
  communications du constructeur.

## Preuves (`preuves/`, `captures/`)

| Preuve | Résultat |
|---|---|
| Contrôles | `npm run schemas` 0 erreur ; `npm test` 848 sur 848 ; `npm run build` 22 pages éditoriales, 0 erreur ; `npm run liens` 23 pages, 647 liens internes, 0 problème ; recette des exemples 0 erreur ; démonstration du format 2 25 pages, 0 erreur, liens 0 problème ; indexation durable 0 erreur (19 pages publiées → 21) ; `verifier:modes` 4 OK |
| Production comparée à `main` (`production-diff.txt`) | Deux pages nouvelles ; `sitemap.xml` (deux adresses ajoutées, `lastmod` 2026-11-16, rien d'autre) ; l'accueil (thème « Pannes et symptômes » avec les deux pages) ; et quatre pages en ligne où s'ajoute seulement le lien « À lire aussi » d'une paire du plan, dont les deux pages sont maintenant construites : P0420 et voyant huile (→ moteur PureTech), voyants batterie et préchauffage (→ voiture qui ne démarre pas). Aucune autre différence, aucune date modifiée |
| FORMAT2-MESURES (`mesures-format2.txt`, `.json`) | 16 pages, 96 mesures, **0 erreur** ; signalé (2i, demande n° 32) : illustration au-delà de trois écrans sur les deux pages, encadré de six lignes, comme à la recette de la porte 10 (acceptées avec la porte) |
| Lighthouse mobile (`lighthouse.txt`) | Les deux pages : **100 / 100 / 100 / 100**, CLS 0,000, LCP 906 et 1 053 ms, TBT 0 ms |
| Captures (`captures/`, 38 PNG) | 375 × 667 et 1366 × 800, police chargée et de secours : premier écran, page entière, encadré, bloc « Notices », illustration, arbre (panne), tableau des rappels et historique (dossier). Une capture en police de secours identique octet pour octet n'est pas gardée |

### Comparaison avec la recette de la porte 10 (à 375 × 667, police chargée / de secours)

| | Voiture ne démarre pas : recette → lot | Moteur PureTech : recette → lot |
|---|---|---|
| Première situation (2a, 667 au plus) | 547 → 545 | 528 → 525 |
| Bas de l'encadré (6 lignes) | 2 179 → 2 135 | 2 324 → 2 321 |
| Illustration (2i) | 2 700 → 2 656, signalée | 2 807 → 2 805, signalée |
| Arbre / tableau des rappels | 3 855 / 3 880 → 3 811 / 3 836 (seuil de six écrans : 4 002) | 3 736 → 3 733 |
| Hauteur de la page | 13 341 / 13 392 → 12 933 / 12 984 | 8 210 / 8 235 → 7 886 / 7 912 |
| Largeur à 320 px | 320 → 320, aucun débordement | 320 → 320, aucun débordement |

Les corrections faites après la recette, et validées avec la porte, sont visibles : la ligne 4 de « voiture ne démarre
pas » ne renvoie plus à la ligne 5 (encadré plus court de 44 px), et la deuxième fiche du tableau des rappels donne son
motif en entier au lieu de « Même motif » (`captures/moteur-puretech-375-chargee-tableau.png`).

## Liste de recette de l'étape 9 (docs/03), repassée sur la construction de production

| Point | Voiture ne démarre pas | Moteur PureTech |
|---|---|---|
| SEO : title, meta description (178 et 177 caractères), un seul H1, canonical absolue, `lang="fr"`, adresse au plan du site et dans `sitemap.xml` | oui | oui |
| SEO : données structurées Article et BreadcrumbList | oui | oui |
| Mobile : captures à 375 et 320 px, aucun débordement ; première situation lisible sans défiler (545 et 525 px) | oui | oui |
| Accessibilité : Lighthouse 100 ; illustration avec texte alternatif et légende, signalée comme dessin du site | oui | oui |
| Juridique et transparence : mention en tête, signature, ligne de transparence, « Signaler une erreur », sources listées (10 et 15), aucune publicité | oui | oui |
| Liens : `npm run liens` 0 problème ; liens internes uniquement vers des pages liées au plan | oui | oui |
| Format 2 : ni « Verdict retenu » ni « consigne retenue » ; marque et modèle nommés ; repères sous les H2 d'une seule ligne (contrôle FORMAT2) ; illustration qui montre où regarder (cosses de la batterie ; jauge d'huile) | oui | oui |
| Format 2 : navigation au clavier, contour de focus visible (Tab sur toute la page, 58 et 57 éléments atteints) | oui : aucun élément sans contour ; 3 px bleu clair sur fond sombre, 3 px bleu foncé sur fond clair | oui, idem |
| Format 2 : ni édition ni page écrite à la main dans le texte | oui (0 « édition », 0 « p. n » dans le texte ; pages citées dans « Sources ») | oui |
| Format 2 : comparaisons en tableau quand le texte compare | **à juger par Houssem** : le paragraphe « Pousser la voiture… » compare quatre marques en prose (Toyota, Peugeot, Renault, Dacia) ; texte validé, non modifié | oui : rappels et couverture dans le tableau des rappels |
| Format 2 : rendu sur un vrai téléphone (première situation, ligne d'écart, sommaire, tableaux en cartes) | **à faire par Houssem** | **à faire par Houssem** |
| Format 2 : liste des H2 avant et après | sans objet (pages nouvelles) | sans objet |

## Revue indépendante de la pull request (16/11/2026, ~23 h 20) : corrections

- **I1, pastille « À lire aussi » des pages panne et dossier.** La pastille d'une page liée prenait la tuile du premier voyant
  de la base de son encadré : sur les pages en ligne, « voiture qui ne démarre pas » avait la spirale du préchauffage
  (voyants batterie et préchauffage) et « moteur PureTech » la burette rouge (voyant huile). Décision (règle 6) : une page
  panne ou dossier a une pastille sans tuile, état qui existe déjà. `voyantsDesPages` (`src/lib/format2.ts`) ne donne plus
  le voyant de l'encadré que pour une page code défaut ou pneus et obligations ; la route l'utilise
  (`src/pages/[...adresse].astro`) ; commentaire de `tuileDeLaPage` corrigé. Test dans les deux sens
  (`tests/format2.test.ts`) : pages voyant, code défaut et pneus avec tuile ; pages panne et dossier sans, alors qu'un voyant
  donné à la même page lui en mettrait une.
- **Captures** (`captures/revue-a-lire-aussi/`, script `capturer-liees.cjs`) des cinq pages en ligne que la pull request
  modifie : section « À lire aussi » de P0420 et des voyants batterie, huile et préchauffage, et liste des pages de
  l'accueil avec sa quatrième carte (« Pannes et symptômes »). 375 et 1366 px, deux polices, en trois états : `enligne`
  (`main`), `avant-correction` (la pull request avant I1), `apres`. Le voyant huile n'a pas de section « À lire aussi » en
  ligne (aucune page liée construite) : pas de capture `enligne`. Une capture en police de secours identique octet pour
  octet n'est pas gardée (50 fichiers).
- **M1** : report de la recherche d'une version France du communiqué Stellantis, dit ci-dessus (registre).
- **M2** : preuve des empreintes reformulée (identité avec b9b0835 et même empreinte avec les deux bases).
- **M3** : liste de recette complétée (contour de focus, ni édition ni page écrite à la main, comparaisons en tableau,
  vrai téléphone).
- **M4** : en-tête de la page de démonstration déplacée (`tests/demo/format2-remplacees/dossier/moteur-puretech.md`) mis à
  jour.
