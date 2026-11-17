Brouillon, jamais validé. Recette locale des deux exemples de la porte 10 (panne « voiture ne démarre pas », dossier
« moteur PureTech »), faite le 16/11/2026 selon `travaux/etape-10/taches/recette-porte-10.md`. Préparation anticipée de
l'étape 10 (docs/03, règle 12, quatrième exception) : rien n'en est présenté, fusionné ni publié avant la porte de l'étape
en cours ; aucune pull request vers `main`. Les verdicts des exemples et les lignes de la base qu'ils reprennent ne sont
pas validés.

## Ce qui a été construit

Un arbre de travail local, jamais commité :

| Élément | Origine |
|---|---|
| Code | `etape-13/f1-porte` au commit `da9cd16` (porte F1, PR houssem-jeddou/decodauto#68 : modèles du format 2 avec la demande n° 32, et `main` 52b18bd intégré : nature des sources secondaires, demande n° 31) |
| `exemples/panne/voiture-ne-demarre-pas.md`, `exemples/dossier/moteur-puretech.md`, `src/illustrations/batterie-cosses.svg`, `src/illustrations/jauge-huile.svg` | `preparation/etape-10` au commit `9ac6185` (exemples de la version 2, commit `9d08ef9`) |
| `data/voyants.json` | `etape-13/f2-donnees`, commit `7e1937b` (base du lot F2, version 2 : lignes d'écart courtes ; jamais validée) |
| Registre (`data/sources.json`), entrées provisoires, titre suivi de « (provisoire, jamais validé) », consultées le 2026-11-16 | `rappelconso-48835`, `rappelconso-48836`, `rappelconso-48204` (catégorie `rappelconso`, adresses du brief) ; `peugeot-puretech-solutions` et `stellantis-puretech-indemnisation-2025` (catégorie `secondaire`, nature `communication-constructeur`, exigée depuis la demande n° 31) |
| `data/couts.json`, entrées provisoires | pièces `pile-de-cle` et `carburant-et-reamorcage` (tranche `geste`, la plus basse d'un geste à faire soi-même) ; prise en charge `couverture-speciale-puretech` (texte : 100 % des pièces et de la main-d'œuvre, 10 ans ou 180 000 km au premier des deux termes échus, sous conditions ; source `peugeot-puretech-solutions`, vérifiée le 2026-11-16, à revérifier tous les 90 jours ; sans empreinte) |

Le schéma accepte la prise en charge sans validation (`validation` facultatif) ; c'est le contrôle qui la refuse sur la
page (R4-MONTANT-NON-VALIDE, ci-dessous) : la construction la garde, pour qu'on voie son rendu.

Commandes : `AVEC_EXEMPLES=1 npx astro build` (23 pages construites), puis
`AVEC_EXEMPLES=1 node scripts/controle.ts --dist dist-exemples --exemples` (`controle.txt`).

## Sortie des contrôles

`Contrôle : 21 page(s) éditoriale(s), 29 erreur(s) bloquante(s), 24 alerte(s)`. Les 29 erreurs sont toutes des absences
de validation, attendues :

- 26 × R4-EMPREINTE sur `data/voyants.json` : les lignes de la base du lot F2 (version 2) n'ont pas encore leur empreinte
  (jamais validées) ;
- 2 × R4-VALIDATION-ABSENTE : l'encadré des deux exemples n'a pas d'empreinte ;
- 1 × R4-MONTANT-NON-VALIDE (`moteur-puretech`) : la prise en charge provisoire `couverture-speciale-puretech` n'a pas
  d'empreinte.

Aucune autre erreur. Alertes : R7-IMAGE-RECOMMANDEE (sur toutes les pages, existante), R4-MONTANT-VALIDATION-ABSENTE
(la prise en charge provisoire), R3-NIVEAU-A-VERIFIER (3, `prechauffage` et `airbag-passager-desactive`) et
R1-RATTACHEMENT (`temperature-rouge`), qui viennent de la base et non des exemples.

## Mesures (`mesures.json`, `mesures-format2.txt`)

Chromium préinstallé, police du système Inter. Police chargée : feuille servie en font-display: block, seconde visite ;
police de secours : `/polices/` refusé. Pixels CSS depuis le haut de la page. `mesures.json` réunit les mesures prises
avec les captures (`captures`) et la sortie de FORMAT2-MESURES (`format2_mesures`).

| À 375 × 667 (chargée / secours) | Voiture ne démarre pas | Moteur PureTech |
|---|---|---|
| Bas de la première situation (2a : 667 au plus) | 547 / 547 | 528 / 528 |
| Bas de l'encadré (6 lignes) | 2 179 / 2 179 | 2 324 / 2 324 |
| Haut du bloc « Notices / Base du coût » | 2 326 / 2 326 | 2 470 / 2 470 |
| Haut de l'illustration (2i) | 2 700 / 2 700, signalée | 2 807 / 2 807, signalée |
| Haut du sommaire « Sur cette page » | 3 014 / 3 014 | 3 101 / 3 101 |
| Haut de l'arbre de décision / du tableau des rappels | 3 855 / 3 880 (sous six écrans, 4 002) | 3 736 / 3 736 |
| Haut des causes | 5 644 / 5 670 | – (dossier sans causes) |
| Hauteur de la page | 13 341 / 13 392 | 8 210 / 8 235 |
| Largeur de la page à 320 px | 320 (aucun débordement) | 320 (aucun débordement) |

FORMAT2-MESURES : 2 pages, 12 mesures (320, 375 et 1366 px, deux polices), 0 erreur, 4 signalements : l'illustration des
deux pages est au-delà de trois écrans (2 001 px) à cause d'un encadré de six lignes (règle 2i assouplie par la demande
n° 32 : à dire dans le paquet).

## Lighthouse (`lighthouse.txt`)

Mobile, 3 passages, médianes : les deux pages à 100 en performance, accessibilité et bonnes pratiques, CLS 0,000, LCP
907 ms (panne) et 1 053 ms (dossier), TBT 0 ms. SEO 66 : construction en noindex, attendu.

## Captures (`captures/`, script `capturer.cjs`)

`<page>-<375|1366>-<chargee|secours>-<ecran|page|encadre|arbre|tableau-rappels|illustration>.png`, PNG sans perte ;
échelle 2, sauf la page entière (échelle 1 : plus de 16 384 px de haut à l'échelle 2). Une capture en police de secours
identique octet pour octet à celle en police chargée n'est pas gardée (encadré, illustration, arbre à 1366, tableau des
rappels à 1366) : 30 captures.

Le dossier `demande-32/` garde les captures de l'exemple panne avant et après la demande n° 32, prises sur une autre
construction (la démonstration du format 2, avec un autre état de la base) : l'encadré y était plus court (bas à 1 983 px).
