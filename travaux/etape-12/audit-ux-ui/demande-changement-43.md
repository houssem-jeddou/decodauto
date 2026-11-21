# Demande de changement n° 43 : pictogrammes et illustrations servis comme fichiers images, en pilote (proposition P8)

Écrite par Claude le 21/11/2026, étape 12, lot U3 de l'audit UX/UI, partie 2 (`audit.md`, P8 et constat C10). **Statut :
acceptée d'avance par Houssem le 21/11/2026 (7 h 11)** : il a retenu U3 (« image de partage par page, pictogrammes en
fichiers images ») et demandé de partir des recommandations de l'audit (§6), dont celle-ci : « à essayer d'abord sur l'outil
et trois pages voyants, puis à suivre dans Search Console ». Ce texte, écrit ensuite pour appliquer la règle, ne lui a pas
été relu avant la mise en ligne. Format de `docs/03` : élément concerné, changement proposé, raison (données), impact sur
ce qui est validé, contrôles à relancer.

## 1. Éléments concernés (validés ou figés)
- **Rendu des pictogrammes** dans les tuiles des voyants (`tuile`, `src/lib/format2.ts` ; `tuileOutil`,
  `src/lib/outil-format2.ts`) : SVG posé dans la page, décoratif (`aria-hidden`), couleur de la base par `currentColor`.
- **Rendu des illustrations** (règle 2i, `illustrationDeLaPage`) : SVG posé dans la page, nommé par son texte alternatif
  (`role="img"`, `aria-label`).
- Contrôles : FORMAT2-ILLUSTRATION, OUTIL-INDEX et OUTIL-LIEN (tuiles de l'outil), IMAGE-*, TIERS-RESSOURCE.
- Charte graphique : rangées « Tuile » (« Encadré de décision »), « Page outil », « Illustration ».

## 2. Raison (données)
- Constat C10 de l'audit : la documentation de Google (« Bonnes pratiques de SEO pour Google Images », mise à jour le
  03/03/2026) dit trouver les images dans l'attribut `src` de `<img>` et ne parle du `<svg>` en ligne que pour son texte
  alternatif : nos 37 illustrations et 18 dessins ne peuvent pas apparaître dans Google Images.
- Requêtes du périmètre qui cherchent un dessin (`docs/05`, volumes indicatifs par mois) : « logo huile moteur » 3 160 ;
  « pictogramme tableau de bord », « symbole tableau de bord », « logo tableau de bord », « icones tableau de bord
  voiture », « logo abs », « logo liquide de frein », « logo pression des pneus » 316 chacune.
- Rien ne garantit un gain : d'où un pilote, mesuré, avant toute généralisation.

## 3. Changement
**Pages du pilote** (`config/images-en-fichiers.json`, seule source) : la page outil (`voyants`, « pictogramme tableau de
bord », « logo tableau de bord »…), et les pages voyant huile (« logo huile moteur »), ABS et ESP (« logo abs ») et pression
des pneus (« logo pression des pneus »).

**Fichiers servis**, écrits à la construction (jamais dans `public/`, jamais à la main) :
- `/illustrations/<fichier>.svg` : le dessin de `src/illustrations`, tel quel, après les vérifications d'aujourd'hui
  (aucun script, aucune ressource d'un autre site) ;
- `/pictogrammes/<pictogramme>-<couleur>.svg` : le dessin de `src/pictogrammes`, avec la couleur du voyant de la charte
  (`--v-orange`, `--v-rouge`… de `src/styles/charte-b.css`) à la place de `currentColor`, pour chaque paire de la base.

**Sur les pages du pilote** :
- l'illustration est une image (`<img>`) qui pointe vers son fichier, avec son texte alternatif, sa largeur et sa hauteur
  (celles du dessin) et un chargement différé, dans la même figure, avec la même légende ;
- chaque tuile de voyant de l'encadré et de l'outil (grille des dessins, cartes) est une image du fichier de sa paire, au
  texte alternatif vide : le nom du voyant et sa couleur sont écrits à côté (règle d'accessibilité inchangée) ; la lueur
  du voyant « allumé » reste, même filtre ;
- les pastilles « À lire aussi », le bouton « Trouver mon voyant » et les autres pages ne changent pas.

## 4. Impact sur ce qui est validé
- **Aucun verdict, texte, adresse, title ni H1 ne change** ; les empreintes de validation ne changent pas (le rendu n'y
  entre pas) ; la date « Mis à jour le » ne bouge pas (règle 14 b : le contenu affiché est le même).
- **Accessibilité** : l'illustration garde son nom (texte alternatif) ; les tuiles restent décoratives.
- **Performances** : jusqu'à 23 requêtes de plus sur la page outil (fichiers de moins de 1 Ko, en cache) ; Lighthouse, CLS
  et LCP remesurés par la CI.
- **Politique de confidentialité** : inchangée, les fichiers sont servis par le site lui-même (TIERS-RESSOURCE).
- **Contrôles** : nouveaux, IMAGES-FICHIERS (§5) ; FORMAT2-ILLUSTRATION et le contrôle des tuiles de l'outil acceptent
  l'image sur les pages du pilote seulement.
- **Documents** : charte graphique, `CONTROLES.md`, `CLAUDE.md`.

## 5. Contrôles à relancer
- `npm run schemas`, `npm test`, `npm run build` (contrôle), `npm run liens` ; recette des exemples ; démonstration du
  format 2 (FORMAT2-MESURES) ; Lighthouse sur les quatre pages.
- **IMAGES-FICHIERS** (nouveau) : chaque page du pilote est une page du plan ; sur une page du pilote, l'illustration et les
  tuiles sont des images qui pointent vers un fichier servi, au contenu attendu (dessin, couleur), largeur et hauteur posées ;
  sur les autres pages, aucune.
- Captures à 375 × 667 et 1366 × 800, police chargée et police de secours : premier écran et illustration des quatre pages.

## 6. Suivi
Search Console, type de recherche « Image », pages du pilote : relevé à J+30 de la mise en ligne. Décision de Houssem :
généraliser à toutes les pages, garder le pilote, ou revenir au dessin posé dans la page.
