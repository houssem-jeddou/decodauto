# Lot U3, partie 1 : images et balises de partage (Open Graph) — paquet

Étape 12, audit UX/UI (`travaux/etape-12/audit-ux-ui/audit.md`, proposition P6, constat C7). Pull request #104, branche
`etape-12/u3-partage`, empilée sur les lots U1 (#102) et U2 (#103). **Validé d'avance par Houssem le 21/11/2026 (7 h 11)**
avec les recommandations de l'audit (« Je valide tout. Et s'il y a un choix, pars avec ta recommandation ») ; la mise en
page des images a été reprise après la revue indépendante (ci-dessous) : planche des 39 images présentée avec la synthèse.

## 1. Ce qui change
- **Balises de partage** sur chaque page qui a une adresse canonique (`balisesPartage`, `src/lib/partage.ts`, posées par
  `src/layouts/Base.astro`) : `og:type` (`article` pour une page éditoriale, `website` ailleurs), `og:site_name`,
  `og:locale` (`fr_FR`), `og:url` (adresse canonique), `og:title` et `og:description` (ceux de la page), `og:image` et ses
  dimensions, `og:image:alt`, `twitter:card` en grand aperçu. La 404 n'en a aucune. Le JSON-LD (7.5a) ne change pas.
- **Images** de 1 200 × 630 px, PNG :
  - une par page qui a une illustration (37 pages éditoriales et l'accueil au format 2) : son illustration seule, dans le
    panneau de la charte, sur le fond nuit, ni logo ni nom ;
  - l'image de la marque (logo, nom, devise) pour les pages du socle sans illustration (« à propos », mentions légales).
  - Adresse versionnée (`?v=` et le début de l'empreinte du fichier) : une image changée change d'adresse.
- **Production des images** : `travaux/partage/generer-images-partage.mjs` (hors construction et hors CI : Chrome), pour
  toute page qui peut être construite (`src/content`, `exemples`, démonstration du format 2), dans `src/partage/` ; couleurs
  lues dans la charte. À la construction, `scripts/integration-partage.ts` copie dans le site les seules images que ses
  pages annoncent : une page non publiée ne publie pas son image.
- **Contrôles** : PARTAGE-BALISES, -COHERENCE, -TYPE, -IMAGE (adresse versionnée), -ALT, -FICHIER (dimensions, poids de
  300 000 octets au plus, fichier identique au registre), -UNIQUE, -404 ; tests : image à jour de sa source (générateur,
  couleurs, police, dessin), aucune image manquante ni en trop, aucune dans `public/`, copie à la construction. Le passage
  d'une page illustrée (`npm run passage`) est refusé sans son image.
- **Documents** : charte graphique (version 7, « Images de partage »), `CONTROLES.md`, `CLAUDE.md`, règle de passage.

## 2. Corrections après la revue indépendante
- **Bloquant, CI rouge (INDEXATION-LECTURE)** : le H1 de l'accueil (`TITRE_ACCUEIL`) redevient une constante littérale de
  `src/lib/accueil.ts`, que le contrôle d'indexation durable lit ; la devise de l'image de la marque la reprend (la
  constante `DEVISE_DU_SITE` ajoutée par le lot est retirée). `verifier-indexation-durable.ts --base main` : 0 erreur.
- **Important, empreintes incomplètes et couleurs recopiées** : le générateur lit les couleurs dans `charte-b.css`
  (`couleursPartage`) ; l'empreinte de la source comprend l'empreinte du générateur (mise en page), les quatre couleurs, la
  police et le dessin. La recette écrite à la main (`RECETTE_PARTAGE`) est retirée.
- **Important, pages hors de `src/content`** : le générateur et les tests couvrent les trois dossiers de pages ; les images
  sont dans `src/partage/` et copiées à la construction (production : seulement celles des pages publiées) ; règle de
  passage complétée, passage refusé sans image.
- **Mineurs** :
  - planche refaite sur les images d'aujourd'hui (39 images) ;
  - conseil de Google pour og:image (ni logo ni texte sur l'image d'une page) : ni marque ni nom sur les images de page ;
    l'accueil prend l'image de son illustration, la marque ne sert plus qu'au socle ;
  - lisibilité : sans la bande du nom, le dessin est 17 % plus grand (518 px de haut au lieu de 442) ; planche relue image
    par image (dessins entiers, rien de coupé) ;
  - cache des réseaux sociaux : adresse versionnée ;
  - contrôles : poids maximal, fichier identique au registre, tests de `og:description`, `og:site_name` et `og:locale`.

## 3. Mesures
- 39 images de 36 à 88 Ko ; tests du lot (`tests/partage.test.ts`, 14 tests) verts en local.
- **CI de la version finale** : à compléter (contrôles, recette, démonstration, Lighthouse).

## 4. Revue indépendante
> **Revue indépendante** (agent sans contexte de la rédaction, 21/11, sur 3ca719bd : diff du lot, journaux de la CI,
> générateur relancé sur une copie, documentation de Google, Meta, X et ogp.me lue le 21/11 ; verdict : **à corriger**, un
> point bloquant).
> - **Ce qu'elle a changé** : le bloquant, les deux points importants et les mineurs 4 à 8 (§2).
> - **Écarté** : contrôle en production des balises et des images servies (mineur 8) : le site déployé est exactement le
>   dossier contrôlé par la CI ; un contrôle de plus après le déploiement est noté dans les idées reportées.
> - **Non relu** (ajouté après la revue) : ces corrections, dont la nouvelle mise en page des images et l'image de
>   l'accueil.
> - **Reste à vérifier** : les aperçus réels sur Facebook, LinkedIn, X et WhatsApp après la mise en ligne (outils de
>   débogage des réseaux) ; la documentation de LinkedIn (illisible par la revue).
