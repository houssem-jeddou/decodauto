# Lot U3, partie 2 : pictogrammes et illustrations en fichiers images, en pilote (demande n° 43) — paquet

Étape 12, audit UX/UI (`travaux/etape-12/audit-ux-ui/audit.md`, proposition P8, constat C10). Pull request #105, branche
`etape-12/u3-images-fichiers`, empilée sur la partie 1 (#104). **Validé d'avance par Houssem le 21/11/2026 (7 h 11)** avec
les recommandations de l'audit, dont celle-ci : « à essayer d'abord sur l'outil et trois pages voyants, puis à suivre dans
Search Console » ; la demande n° 43 a été écrite ensuite et ne lui a pas été relue avant la mise en ligne.

## 1. Ce qui change
- **Pages du pilote** (`config/images-en-fichiers.json`, seule source) : outil voyants, voyant huile, ABS et ESP, pression
  des pneus.
- **Sur ces pages**, l'illustration et les tuiles des voyants (encadré, outil) sont des images de fichiers servis par le
  site : `/illustrations/<fichier>.svg` (le dessin vérifié par la règle 2i) et `/pictogrammes/voyant-<pictogramme>-<couleur>.svg`
  (le dessin, couleur de la charte). Même rendu (taille, lueur) ; illustration nommée par son texte alternatif ; tuiles
  décoratives (`alt` vide et `role="presentation"`), le nom du voyant étant écrit à côté ; en couleurs forcées, la tuile
  garde son rond sombre et son dessin allumé.
- **Fichiers** écrits à la construction par `scripts/integration-images.ts`, exactement ceux que les pages référencent,
  jamais dans `public/` ; le serveur de développement les sert de même.
- **Ailleurs**, rien ne change. Aucun verdict, texte, adresse, title, H1, date ni empreinte ne change.
- **Contrôles** : IMAGES-FICHIERS-PAGE (page du plan, construite, au format 2), -RENDU, -SERVI (contenu tiré de la source,
  aucun fichier en trop) ; FORMAT2-ILLUSTRATION, OUTIL-INDEX et OUTIL-LIBELLES acceptent l'image du fichier de la paire, et
  seulement elle (cas en échec testés).
- **Outil de travail** : les captures de recette de la CI amènent la zone à l'écran et attendent ses images.
- **Documents** : charte graphique (version 8), `CONTROLES.md`, `CLAUDE.md`, demande n° 43 (noms, critères de J+30, retour
  arrière, revue).

## 2. Corrections après la revue indépendante
- **B1** (58 erreurs IMAGE-ALT) : tuiles avec `role="presentation"`, exigé par IMAGES-FICHIERS-RENDU.
- **B2** (CI arrêtée avant les tests, défaut de la partie 1) : corrigé dans la partie 1, fusionnée ici.
- **I1** (captures de la CI : illustrations vides, captures manquantes) : zone amenée à l'écran, images chargées et
  décodées avant la capture ; demande complétée (premier écran et illustration des quatre pages, à 375 et 1 366 px).
- **I2** (noms) : `voyant-<pictogramme>-<couleur>.svg`, comme le prévoyait P8, avant toute indexation.
- **M2** (couleurs forcées) : la tuile en image garde ses couleurs ; vérifié dans Chrome (contraste forcé émulé).
- **M3** (fichier servi différent du texte vérifié) : le fichier servi est le texte vérifié (sans `title` ni `desc`).
- **M4** (contrôles et tests) : cas en échec de FORMAT2-ILLUSTRATION (image sans texte, hors de `/illustrations/`, sans
  dimensions, en double) et des tuiles de l'outil (image d'une autre paire) ; page du pilote au format 2 ; aucun fichier en
  trop dans les deux dossiers.
- **M5** (serveur de développement), **M6** (sélecteurs explicites au lieu de `:is()`), **M7** (critères de J+30 et retour
  arrière : demande n° 43, §6), **M8** (description de la pull request).

## 3. Mesures et captures
- **Revue** (rendu local des quatre pages, avec et sans le pilote, 375 et 1 366 px, police chargée et de secours) :
  géométrie identique (tuiles, dessins, figure, hauteur de page) ; aucune image cassée ni débordement ; arbre
  d'accessibilité de l'encadré identique, illustration exposée comme une seule image nommée.
- **CI de la revue** (recette et démonstration) : FORMAT2-MESURES 0 erreur sur 41 pages ; liens 0 problème ; Lighthouse de
  l'outil 100 dans les quatre catégories, CLS 0, LCP 1 138 ms (1 053 ms avant le lot).
- **Captures de la CI** : `travaux/captures-ci/demande.json` (essai 2) ; premier écran et illustration des quatre pages, à
  375 et 1 366 px, encadré et cartes rouges de l'outil, page témoin hors pilote.
- **CI de la version fusionnée** : celle de la tête de la pull request après la fusion de `main`, exigée verte (contrôles,
  FORMAT2-MESURES, Lighthouse) avant la fusion.

## 4. Revue indépendante
> **Revue indépendante** (agent sans contexte de la rédaction, 21/11, sur 113b3776 et la fusion 6d21aaa6 : diff du lot,
> journaux de la CI, rendu local des pages du pilote et témoins, contraste forcé émulé ; verdict : **à corriger**, deux
> points bloquants, dont un hérité de la partie 1).
> - **Ce qu'elle a changé** : B1, B2, I1, I2, M2 à M8 (§2).
> - **Écarté** : M1, chargement différé des tuiles du premier écran (elles s'affichent 0,2 à 0,3 s après le premier
>   affichage) : la règle IMAGE-CHARGEMENT l'impose, Lighthouse reste à 100 et le CLS à 0 ; à revoir par une demande de
>   changement si le pilote est généralisé (idée reportée). Contrôle en production des fichiers (M4) : idée reportée.
> - **Non relu** (ajouté après la revue) : ces corrections.
> - **Reste à vérifier** : un vrai téléphone, Safari et Firefox, un vrai Windows à contraste élevé ; en production, le type
>   et le cache des SVG chez Cloudflare ; l'indexation réelle par Google Images (relevé de J+30).
