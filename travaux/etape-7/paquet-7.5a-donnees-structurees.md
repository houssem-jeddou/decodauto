# Paquet de validation, livrable 7.5a : données structurées (JSON-LD) et `lastmod`

Branche `etape-7/donnees-structurees` (PR #30, brouillon, empilée sur #29). **Ce que Houssem valide** : ce que le balisage dit de lui (§2, fiche auteur et profil LinkedIn). Aucun verdict de sécurité n'est touché.

## 1. Ce que le livrable produit

- `src/lib/donnees-structurees.ts` : JSON-LD schema.org généré depuis la page, jamais saisi. Le gabarit (`Base.astro`) le pose dans l'en-tête ; la route des pages et l'accueil le fournissent.
- `sitemap.xml` : `lastmod` égal à la date « Mis à jour le jj/mm/aaaa » que la page affiche (aucun sur l'accueil, qui n'affiche pas de date).
- Contrôles : `SITEMAP-LASTMOD` et `DONNEES-STRUCTUREES-JSON / -TYPE / -CONTENU / -ADRESSE` (catalogue dans `CONTROLES.md`).
- Tests : `tests/donnees-structurees.test.ts` (sans dépendance, 9 tests) et `tests/donnees-structurees-controle.test.ts` (contrôles, exécutés par la CI).

## 2. Ce que le balisage déclare

| Page | Balisage |
|---|---|
| Accueil | `WebSite` : nom « decodauto.com », adresse, langue `fr` |
| Page éditoriale | `Article` : titre = H1, description = meta description, `dateModified` = date de la signature, auteur (nom, adresse de sa fiche sur « à propos »), adresse de la page ; `BreadcrumbList` = le fil d'Ariane affiché |
| « À propos » | `Person` par fiche auteur : nom, adresse de la fiche, et `sameAs` = profil LinkedIn `https://www.linkedin.com/in/houssem-jeddou` (champ `profils` de la fiche) |
| Mentions légales, 404 | rien |

Le profil LinkedIn n'est **pas affiché comme lien** : la règle R7-LIEN-EXTERNE interdit les liens vers un autre site hors source citée. Il n'apparaît que dans le balisage de la fiche (pour que Google rattache l'auteur à son profil). Pour le retirer : supprimer les deux lignes `profils` de `exemples/socle/a-propos.md`.

## 3. Choix retenus (règle du 10/11 : on part de la recommandation de Claude)

1. **Pas de `datePublished`** : la page n'affiche que sa date de mise à jour (charte §4) ; le balisage ne dit rien qui ne soit visible. Google le range parmi les propriétés recommandées, pas requises. Si tu veux « Publié le » dans la signature, c'est une demande de changement de la charte.
2. **Pas d'Organization ni de `publisher`, pas d'image** : le site n'a ni logo ni photo avant 7.5b ; déclarer un éditeur sans entité à décrire n'apporte rien. À revoir quand il y aura une image par page.
3. **Pas de FAQPage ni de HowTo** : pas d'extrait attendu, et le balisage devrait doubler du texte visible.
4. **`lastmod` = date affichée** : c'est la dernière modification éditoriale que le lecteur peut vérifier, ce que Google demande (une date inexacte fait ignorer les autres).
5. **LinkedIn en `sameAs`, sans lien visible** : aide à identifier l'auteur (E-E-A-T) ; c'est ton profil public. À toi de confirmer que tu veux qu'il soit rattaché au site.

## 4. Sources lues le 10/11/2026

- Google Search Central, « Article structured data » (developers.google.com/search/docs/appearance/structured-data/article) : aucune propriété obligatoire ; `author`, `author.name`, `author.url`, `dateModified`, `datePublished`, `image` recommandées ; pour l'auteur, `type` et `url` (ou `sameAs`) fortement recommandés, avec des URL valides.
- Google Search Central, « Build and submit a sitemap » : `priority` et `changefreq` ignorés ; `lastmod` utilisée si elle est « consistently and verifiably accurate », et reflète la dernière mise à jour significative.
- Google Search Central, « Help Google Search know the best date for your web page » : actualiser la date visible quand la page est modifiée de façon significative.

## 5. Preuves

- CI du commit `c076060` (avant la revue) ; CI du commit de correction `43552ab` : les mêmes quatre jobs, tous verts : Contrôles (schémas, tests, build, liens), Recette des exemples rédigés (pages construites avec leur balisage, contrôlées par les nouveaux contrôles, sans erreur attendue), Lighthouse mobile, Production : tous verts.
- Local, sans dépendance : `node --test tests/donnees-structurees.test.ts` (9 passent). Les tests de contrôle (cheerio) ne tournent qu'en CI.

## 6. Revue indépendante (une revue, verdict « acceptable », rien de bloquant)

- **Important, corrigé** : `dateDeMiseAJour` lisait la première occurrence de « Mis à jour le » dans tout le HTML (titre, balisage, texte rédigé) et le contrôle SITEMAP-LASTMOD relisait la page avec la même fonction, donc ne pouvait rien détecter. Désormais : le plan du site lit la date seulement dans `data-signature` ou `data-socle-date` (expression régulière), et le contrôle la relit avec cheerio dans les mêmes éléments (deux lectures indépendantes) ; tests avec une page à plusieurs « Mis à jour le ».
- **Mineurs, corrigés** : nature de la page établie par `data-signature` (éditoriale) ou `data-socle-date` (socle), erreur si aucun ou les deux ; commentaire sur `sameAs` corrigé (R7-LIEN-EXTERNE ne vise que les pages éditoriales : c'est la règle du plan du site de CLAUDE.md qui réserve les liens externes aux sources citées) ; docblock du contrôle du plan du site remis en place ; `NOM_DU_SITE` en source unique (`src/lib/site.ts`, repris par le bandeau et le balisage) ; adresse de « à propos » du plan transmise aux contrôles ; tests de `pagesConstruites`.
- **Écartés** : `dateModified` sans fuseau (Google le recommande ; une date seule est valide, et ajouter un fuseau inventerait une heure que la page n'affiche pas) ; date de mise à jour après l'encadré (position fixée par la charte §4 ; à regarder en recette).
- **Reste à vérifier** : `lastmod` inexact si la base voyants ou le registre des sources changent sans que `date_modification` bouge (non vérifiable par machine : règle de rédaction) ; Rich Results Test après mise en ligne.

## 7. Limites connues

- Le balisage n'a pas été passé dans le Rich Results Test de Google (aucun accès depuis l'environnement) : à faire sur une page en ligne après la mise en ligne (liste de recette de l'étape 9).
- Les contrôles vérifient la cohérence page ↔ balisage ; ils ne vérifient pas que Google affichera un résultat enrichi (Article n'en promet aucun).
