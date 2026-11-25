# Demande de changement n° 45 : image de l'Article et aperçu d'image en grand (proposition P7 de l'audit n° 2) — brouillon

Écrite par Claude dans la nuit du 25 au 26/11/2026, étape 12, audit n° 2 (`audit.md`, constat C8 et proposition P7).
**Statut : brouillon, non présenté, non accepté.** Rien n'est appliqué. Format de `docs/03` : élément concerné, changement
proposé, raison (données), impact sur ce qui est validé, contrôles à relancer. Le n° 44 est réservé.

## 1. Éléments concernés (validés ou figés)
- **Données structurées** (livrable 7.5a, `src/lib/donnees-structurees.ts`, `CLAUDE.md` § Technique) : « ni Organization,
  ni image sauf la photo du registre `data/photos.json` (demande de changement n° 42) ». La demande n° 42 précise : « ni
  dessin ni image de partage ».
- **Contrôle DONNEES-STRUCTUREES-CONTENU** (`CONTROLES.md`) : « `image` seulement sur une page du registre des photos ».
- **Non-indexation à double clé** et contrôles IDX-META-ABSENTE / IDX-META-PRESENTE : aujourd'hui, en mode indexable,
  aucune balise `<meta name="robots">` n'est posée.
- **Images de partage** (lot U3, `src/lib/partage.ts`, contrôles PARTAGE-*) : inchangées ; elles deviennent aussi l'image
  de l'Article des pages sans photo.

## 2. Raison (données)
- **Mesure du 25/11** (`audit.md`, C8 ; construction indexable de `main` à b489309) : 30 des 37 pages éditoriales ont un
  Article sans `image` ; la construction l'annonce elle-même par 30 alertes R7-IMAGE-RECOMMANDEE (« pas d'image : Google la
  recommande pour les articles »). Les 7 autres ont la photo du registre (demande n° 42).
- **Ce qui existe déjà** : chaque page éditoriale a une image de partage de 1 200 × 630 px, tirée de sa seule illustration,
  à une adresse versionnée (`/partage/<id>.png?v=…`), servie par le site et contrôlée (PARTAGE-*).
- **Documentation de Google** (« Article », données structurées) : `image` est recommandée ; plusieurs formats conseillés
  (16:9, 4:3, 1:1), au moins 50 000 pixels, image représentative de la page, explorable et indexable. Pour Discover, Google
  conseille des images d'au moins 1 200 px de large et la directive `max-image-preview:large`. Ces recommandations sont
  citées de mémoire : les deux pages de Google sont à relire et à citer au moment du lot (non relues cette nuit).
- **Effet attendu** : faible à moyen, non garanti : éligibilité à l'aperçu en grand et à Discover ; aucune garantie de
  classement. À suivre dans la Search Console (apparence « Discover », type « Image »).

## 3. Changement proposé
1. **Article.image** : sur une page éditoriale sans photo au registre, l'adresse absolue de son image de partage (celle de
   `og:image`, même adresse versionnée). Sur une page du registre des photos, rien ne change (la photo d'abord ; l'image de
   partage s'ajoute en seconde position seulement si Houssem le choisit, option B ci-dessous).
2. **Aperçu en grand** : en mode indexable seulement, `<meta name="robots" content="max-image-preview:large">` sur chaque
   page qui a une adresse canonique. En mode non indexable, la balise `noindex` reste seule (la double clé ne change pas).
3. **Rien d'autre** : ni `datePublished`, ni Organization, ni publisher, ni FAQPage, ni HowTo.

Options :
- **A (recommandée)** : points 1 et 2, une image par Article.
- **B** : A, plus l'image de partage en seconde image sur les 7 pages à photo (deux formats).
- **C** : point 1 seul.

## 4. Impact sur ce qui est validé
- Aucun verdict, urgence, action, source, coût, adresse, title ni H1 ne change. Aucune page ne change d'aspect.
- `date_modification` inchangée (règle 14 b : le balisage n'est pas le contenu).
- Texte à mettre à jour : `CLAUDE.md` (§ Technique, 7.5a), commentaire de tête de `src/lib/donnees-structurees.ts`,
  `CONTROLES.md`, `docs/08` si le balisage y est décrit, demande n° 42 (renvoi).

## 5. Contrôles à relancer ou à étendre
- DONNEES-STRUCTUREES-CONTENU : `image` = image de partage de la page (même adresse que `og:image`) sur une page sans
  photo ; photo du registre sinon (PHOTO-DONNEES inchangé).
- IDX-META-* : en mode indexable, une seule meta robots, sans `noindex`, valeur exacte `max-image-preview:large` ; en mode
  non indexable, `noindex` seul. Les quatre combinaisons de `npm run verifier:modes` repassées. PROD-* : la page en ligne
  porte la même balise (vérification de la production).
- `npm run schemas`, `npm test`, `npm run build`, `npm run liens`, Lighthouse de la liste de production.
- Test des données structurées (outil de Google) sur trois pages, à la recette du lot.
