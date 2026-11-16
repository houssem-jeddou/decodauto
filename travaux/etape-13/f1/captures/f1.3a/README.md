# Captures et mesures de la page outil au format 2 (lot F1, tâche F1.3a et sa revue)

Prises le 16/11/2026 par `capturer.cjs` : la page outil `/voyants/` de la construction de démonstration du format 2
(`npm run demo:format2`, brouillon jamais validé, jamais déployée), à côté de la page outil en ligne (format 1 : construction
de production de `origin/main`, 6307ee2). Revue de F1.3a : index coupé en deux grilles (une par couleur, sous le titre du
groupe), cartes rangées par paire, nombre de cas sur la tuile d'une paire qui en a plusieurs, lignes d'écart courtes du
brouillon F2 v2 sur toutes les cartes, renvoi sans icône, introduction en deux paragraphes, pas de bouton « Trouver mon
voyant » dans le bandeau de la page outil.

Fichiers `<page>-<vue>-<chargee|secours>.png`, `<page>` = `outil-format2` ou `outil-en-ligne` :
- `375-ecran` : premier écran du téléphone (375 × 667, échelle 2) ; `375-outil` et `375-index` : l'écran qui commence au titre
  de l'outil, puis à la grille des dessins (état long, « Tous ») ; `375-page` : page entière (échelle 1) ;
- format 2 seulement : `375-index-seul` (deux grilles, 22 dessins), `375-filtre-rouge` et `375-index-rouge` (filtre actif,
  état court), `375-carte-courte` (préchauffage), `375-carte-longue` (pression des pneus), `375-carte-ecart-court` (voyant
  moteur orange fixe), `1366-filtre-rouge` ; `titre-groupe-secours` : titre d'un groupe en police de secours (diode sur la
  première ligne, « 16 cas » insécable) ;
- `1366-ecran` et `1366-outil` : ordinateur (1366 × 800).

PNG tels que les écrit le navigateur, recompressés sans perte : couleurs exactes (les précédents étaient réduits à 128
couleurs). Police chargée : feuille servie en `font-display: block` ; police de secours : `/polices/` bloqué. Une capture en
police de secours identique octet pour octet à celle en police chargée n'est pas gardée (10 fichiers ; la page en
ligne n'utilise aucune police chargée). `mesures.json` : mesures brutes, en pixels CSS depuis le haut de la page.

## Mesures

375 × 667 (règle 2a : bas de la situation, du verdict, de l'urgence et de l'action de la première ligne, 667 px au plus,
640 visés ; règle 2i : haut de l'illustration, 2 001 px au plus), puis 1366 × 800 (trois dernières colonnes).

| Page | Police | Bas du renvoi | Bas de la 1re situation (2a) | Bas de l'encadré | Haut de l'illustration (2i) | Haut de l'outil | Haut de la grille | Haut de la 1re carte | Tuiles par rangée | Hauteur de la page | Débordements | Haut de la grille (1366) | Hauteur (1366) | Débordements (1366) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Format 2 (démonstration) | chargée | 357 | 638 | 1 415 | 1 833 | 2 210 | 2 431 | 3 574 | 4 | 21 882 | 0 | 1 739 | 12 908 | 0 |
| Format 2 (démonstration) | secours | 357 | 638 | 1 415 | 1 833 | 2 210 | 2 431 | 3 598 | 4 | 21 931 | 0 | 1 739 | 12 933 | 0 |
| En ligne (format 1) | chargée | 449 | 852 | 2 547 | – | 2 729 | 3 239 | 4 683 | 1 | 29 577 | 0 | 1 960 | 18 186 | 0 |
| En ligne (format 1) | secours | 449 | 852 | 2 547 | – | 2 729 | 3 239 | 4 683 | 1 | 29 577 | 0 | 1 960 | 18 186 | 0 |

Filtre « Rouge » coché (format 2, police chargée) : 10 cartes et 10 tuiles affichées sur 26 et
22 ; page de 13 580 px. Sans l'illustration (mesure seulement), la grille commencerait à 2 161 px au lieu
de 2 431 px, encore au-delà de trois écrans : l'illustration est gardée (règle 2i).
