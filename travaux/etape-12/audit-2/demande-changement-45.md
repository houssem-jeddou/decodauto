# Demande de changement n° 45 : image de l'Article et aperçu d'image en grand (proposition P7 de l'audit n° 2) — brouillon

Écrite par Claude dans la nuit du 25 au 26/11/2026, étape 12, audit n° 2 (`audit.md`, constat C8 et proposition P7).
**Statut : brouillon, non présenté, non accepté.** Rien n'est appliqué. Format de `docs/03` : élément concerné, changement
proposé, raison (données), impact sur ce qui est validé, contrôles à relancer. Le n° 44 est réservé (demande de Houssem du 25/11).

## 1. Éléments concernés (validés ou figés)
- **Données structurées** (livrable 7.5a, `src/lib/donnees-structurees.ts`, `CLAUDE.md` § Technique) : « ni Organization,
  ni image sauf la photo du registre `data/photos.json` (demande de changement n° 42) ». Le commentaire de tête de
  `src/lib/donnees-structurees.ts` précise : « ni dessin ni image de partage ».
- **Contrôle DONNEES-STRUCTUREES-CONTENU** (`CONTROLES.md`) : « `image` seulement sur une page du registre des photos ».
- **Non-indexation à double clé** et contrôles IDX-META-ABSENTE / IDX-META-PRESENTE : aujourd'hui, en mode indexable,
  aucune balise `<meta name="robots">` n'est posée.
- **Images de partage** (lot U3, `src/lib/partage.ts`, contrôles PARTAGE-*) : inchangées ; elles deviennent aussi l'image
  de l'Article des pages sans photo.

## 2. Raison (données)
- **Mesure du 25/11** (`audit.md`, C8 ; construction indexable de `main` à b489309) : 31 des 37 pages éditoriales ont un
  Article sans `image` ; la construction l'annonce elle-même par 31 alertes R7-IMAGE-RECOMMANDEE (« pas d'image : Google la
  recommande pour les articles »). Les 6 autres ont la photo du registre (`data/photos.json`, demande n° 42).
- **Ce qui existe déjà** : chaque page éditoriale a une image de partage de 1 200 × 630 px, tirée de sa seule illustration,
  à une adresse versionnée (`/partage/<id>.png?v=…`), servie par le site et contrôlée (PARTAGE-*).
- **Documentation de Google** : **non lue** cette nuit (developers.google.com ne se résout pas depuis la session, essai du
  25/11). D'après la mémoire de Claude, à vérifier mot pour mot avant toute présentation : pour l'Article, `image`
  recommandée, plusieurs rapports d'aspect conseillés (16:9, 4:3, 1:1), au moins 50 000 pixels, image représentative,
  explorable et indexable ; pour Discover, images d'au moins 1 200 px de large et directive `max-image-preview:large`.
  **Cette raison n'est pas sourcée tant que ces trois pages (Article, Discover, balise meta robots) ne sont pas lues et
  citées.**
- **Effet attendu** : faible à moyen, non garanti : éligibilité à l'aperçu en grand et à Discover ; aucune garantie de
  classement. À suivre dans la Search Console (apparence « Discover », type « Image »).

## 3. Changement proposé
1. **Article.image** : sur une page éditoriale sans photo au registre, l'image tirée de sa seule illustration. L'image de
   partage (1 200 × 630, environ 1,9:1) ne suit aucun des rapports d'aspect cités ci-dessus : si la lecture de la
   documentation les confirme, le générateur des images de partage (`travaux/partage/generer-images-partage.mjs`) produit
   en plus trois versions de la même illustration, 16:9 (1 200 × 675), 4:3 (1 200 × 900) et 1:1 (1 200 × 1 200), données
   ensemble dans `image` ; sinon, l'adresse de `og:image`. Sur une page du registre des photos, rien ne change (la photo d'abord ; l'image de
   partage s'ajoute en seconde position seulement si Houssem le choisit, option B ci-dessous).
2. **Aperçu en grand** : en mode indexable seulement, `<meta name="robots" content="max-image-preview:large">` sur chaque
   page qui a une adresse canonique. En mode non indexable, la balise `noindex` reste seule (la double clé ne change pas).
3. **Rien d'autre** : ni `datePublished`, ni Organization, ni publisher, ni FAQPage, ni HowTo.

Options :
- **A (recommandée)** : points 1 et 2, avec les trois rapports d'aspect si la documentation les confirme.
- **B** : A, plus les images tirées de l'illustration après la photo, sur les 6 pages à photo.
- **C** : point 1 seul.

## 4. Impact sur ce qui est validé
- Aucun verdict, urgence, action, source, coût, adresse, title ni H1 ne change. Aucune page ne change d'aspect.
- `date_modification` inchangée (règle 14 b : le balisage n'est pas le contenu).
- Texte à mettre à jour : `CLAUDE.md` (§ Technique, 7.5a), commentaire de tête de `src/lib/donnees-structurees.ts`,
  `CONTROLES.md`, `docs/08` si le balisage y est décrit, demande n° 42 (renvoi).

## 5. Contrôles à relancer ou à étendre
- DONNEES-STRUCTUREES-CONTENU : `image` = images tirées de l'illustration de la page (fichiers servis, empreintes
  contrôlées comme PARTAGE-*) sur une page sans photo ; photo du registre sinon (PHOTO-DONNEES inchangé).
- IDX-META-* : en mode indexable, une seule meta robots, sans `noindex`, valeur exacte `max-image-preview:large` ; en mode
  non indexable, `noindex` seul. Les quatre combinaisons de `npm run verifier:modes` repassées. PROD-* : la page en ligne
  porte la même balise (vérification de la production).
- `npm run schemas`, `npm test`, `npm run build`, `npm run liens`, Lighthouse de la liste de production.
- Test des données structurées (outil de Google) sur trois pages, à la recette du lot.
