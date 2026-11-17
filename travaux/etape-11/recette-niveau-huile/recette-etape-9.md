# Lot C1 : liste de recette de l'étape 9, repassée point par point (revue de la PR n° 84, I2)

Liste : `docs/03`, étape 9 (SEO, mobile, accessibilité, juridique, liens) et règle 15 (lot au format 2, l. 97-105).
Repassée le 17/11/2026 sur la branche `etape-11/lot-c1` (f28d014 et les corrections de la revue). Pages concernées :
la page nouvelle « niveau d'huile », et les pages déjà en ligne que le lot modifie : l'accueil (carte « Niveaux et
fluides »), et la section « À lire aussi » de voyant huile, bruit moteur et moteur PureTech (`production-diff.txt`).

Relevés automatiques : `recette-etape-9.cjs` sur la construction de production (`SITE_INDEXABLE=true npx astro build
--outDir dist-prod`, servie en local), sortie `recette-etape-9.json`. Mesures du format 2 et Lighthouse : construction de
recette (`AVEC_EXEMPLES=1`, emplacements publicitaires factices), `mesures-format2-apres-revue.txt`,
`lighthouse-apres-revue.txt`. Captures : `captures/` (page) et `captures/revue-pages-en-ligne/` (pages en ligne, avant et
après).

| Point | Niveau d'huile | Pages en ligne modifiées | Preuve |
|---|---|---|---|
| SEO : title (65 caractères), meta description (159), un seul H1, canonical absolue, `lang="fr"`, pas de noindex en production | oui | accueil : title 51, description 149, un H1, canonical `https://decodauto.com/`, `lang="fr"` ; les trois autres pages : seule leur section « À lire aussi » change | `recette-etape-9.json` |
| SEO : adresse au plan du site et dans `sitemap.xml`, `lastmod` 2026-11-17 | oui | `sitemap.xml` : seule l'adresse nouvelle s'ajoute | `recette-etape-9.json`, `production-diff.txt` |
| SEO : données structurées | Article et BreadcrumbList | accueil : WebSite (inchangé) | `recette-etape-9.json` |
| Mobile : aucun débordement à 320, 375 et 1366 px ; première situation lisible sans défiler (verdict et urgence finis à 582 / 607 px à 375 px, police chargée / de secours) | oui | accueil : 375 px de large à 375 px ; grille des thèmes en une colonne à 375 px, deux à 768 px, une rangée de quatre à 1366 px, « Un guide indépendant » sur toute la largeur dessous | `mesures-format2-apres-revue.txt` ; `captures/revue-pages-en-ligne/mesures-accueil.json` |
| Accessibilité : Lighthouse mobile 100, CLS 0 ; illustration nommée (`role="img"`, `aria-label`), légende terminée par « Illustration decodauto. » une seule fois | oui | accueil : Lighthouse de production dans la CI de la PR | `lighthouse-apres-revue.txt` ; job « Lighthouse mobile » de la PR |
| Juridique et transparence : mention en tête, signature, ligne de transparence, « Signaler une erreur », sources listées (10), aucune publicité en production | oui | inchangés | `recette-etape-9.json` ; relevé des attributs de la page construite |
| Liens : `npm run liens` 0 problème ; liens du texte seulement vers des pages liées au plan (voyant huile ; pages liées dans « À lire aussi » : voyant huile, bruit moteur, moteur PureTech) | oui | les trois sections « À lire aussi » gagnent la page nouvelle, par les paires du plan | `controle-apres-revue.txt` (1 138 liens, 0 problème) |
| Format 2 : rendu sur un vrai téléphone (première situation, ligne d'écart, sommaire, tableaux en cartes) | **non fait** : à faire par Houssem après la mise en ligne | **non fait** | — |
| Format 2 : filtre de l'outil voyants et index des dessins au doigt | sans objet (la page outil ne change pas) | sans objet | — |
| Format 2 : navigation au clavier, contour de focus visible sur fond clair et sur fond sombre | oui : Tab sur toute la page, 26 éléments atteints, aucun sans contour (3 px bleu clair sur fond sombre, 3 px bleu foncé sur fond clair) | accueil : 53 éléments, aucun sans contour | `recette-etape-9.json` |
| Format 2 : repères seulement sous un H2 qui pose la question d'une seule ligne | oui : 4 repères, sous « Niveau d'huile sous le repère mini », « Trop d'huile, au-dessus du repère maxi », « Voyant de niveau d'huile orange », « Voyant d'huile rouge » | sans objet | `recette-etape-9.json` ; contrôle FORMAT2 de la construction |
| Format 2 : marque et modèle nommés ; ni « Verdict retenu », ni « consigne retenue », ni édition, ni page écrite à la main | oui (pages citées dans « Sources ») | inchangés | `recette-etape-9.json` ; contrôle FORMAT2-METHODE |
| Format 2 : comparaisons en tableau quand le texte compare | oui : tableau des notices (quand mesurer, signalement, consigne), en cartes sur téléphone | sans objet | `captures/niveau-huile-375-chargee-tableau.png` |
| Format 2 : le dessin montre où regarder ou quoi faire | oui : la jauge sortie, lue entre MAXI et MINI, et le bouchon de remplissage | sans objet | `captures/niveau-huile-375-chargee-illustration.png` |
| Format 2 : liste des H2 avant et après (aucune question retirée) | sans objet (page nouvelle) | aucun H2 retiré : l'accueil gagne la carte « Niveaux et fluides » ; les trois autres pages, un lien dans « À lire aussi » | `production-diff.txt` |

## Ce qui reste après la fusion
- **Rendu sur un vrai téléphone** de la page « niveau d'huile » et de l'accueil : par Houssem.
- **Inspection d'URL** dans Search Console (page nouvelle, accueil) et **soumission à Bing** des adresses du lot : par
  Houssem ou le pilotage, comme aux lots précédents.
- **Vérifications après déploiement** : job « Production en ligne » de la CI sur le commit de fusion (redirections,
  absence de noindex, robots.txt, plan du site) ; page relue en ligne (date, encadré).
- **Ligne de `docs/11` §4** sur la grille de l'accueil (proposée dans la PR, à valider par Houssem ; `docs/` n'est pas
  modifié par ce lot).
