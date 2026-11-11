# Paquet du premier lot (étape 9, porte 8 par lot) : accueil, « à propos », mentions légales, loi montagne

Pull request #35 (`lot-1/mise-en-ligne` → `main`), brouillon, préparée le 11/11/2026. **Rien n'est fusionné : le go et la fusion sont la décision de Houssem.** La fusion déploie et rend le site indexable.

## Ce que Houssem décide

1. Une **ligne de validation par page** (§6).
2. **Demande de changement n° 18** (indexation durable : règle 14 de 03, contrôles) : accepter ou refuser. Acceptée, le texte est appliqué à `docs/03` et `CLAUDE.md` dans la pull request ; refusée, ses commits en sont retirés.
3. **Demande de changement n° 19** (marque : favicon, nom dans l'en-tête, nom du site pour Google, title de l'accueil) : accepter ou refuser.
4. Le **go**, après la checklist (§7).

## 1. Contenu de la pull request

- Pull requests #25 à #34 réunies (#24 était déjà dans `integration/vague-a`) : loi montagne publiable (8.3.1a), règle de passage (8.3.0), « à propos » (7.3), accueil (7.4a), mentions légales (7.4b), données structurées et `lastmod` (7.5a), emplacements factices (7.5b), garde-fou de déploiement (7.6), demande n° 17 et journal. Fusion sans conflit (c3f0e63, aucune résolution manuelle).
- **Passage** des trois pages par `npm run passage`, « à propos » en premier (515d620, f7b0cda, 6b057e2) : déplacement sans changement de contenu (preuve : hors commentaires d'en-tête, chaque fichier est identique à sa version validée ; empreinte de l'encadré de la loi montagne recalculée : `75abb315…`, égale au champ `validation`). Adresses ajoutées à `lighthouserc.json`, briefs régénérés.
- **Drapeau d'indexation à true** (3c51390), décision de Houssem du 11/11 ; la variable `SITE_INDEXABLE` = `true` a été posée dans GitHub le 11/11 vers 21 h 25 (CI : « Mode d'indexation : INDEXABLE (variable SITE_INDEXABLE = "true" ET drapeau config/indexation.json = true) »).
- **Marque** (demande n° 19) : favicon et nom « decodauto » dans l'en-tête, piste A « Cadran » choisie par Houssem le 11/11.
- **Indexation durable** (demande n° 18) : contrôles avant chaque déploiement et sur chaque pull request.
- **CI** : scores Lighthouse par page dans le journal, rapports conservés (ils ne l'étaient jamais : dossier caché).
- Décisions du 11/11 recopiées : `src/lib/editeur.ts` (commentaires), `CLAUDE.md`, `docs/01`, journal.

## 2. Porte 8 du lot, critère par critère (demande n° 17, tableau des critères par lot)

| Critère | Pages | Preuve | Statut |
|---|---|---|---|
| Faits vérifiés sur sources, verdicts validés | Loi montagne (le socle n'a pas de verdict) | Paquet `travaux/etape-8/paquet-8.3.1a-loi-montagne.md`, validé le 10/11 ; textes relus en ligne le 10/11 | Validé ; **Journal officiel à revérifier le jour du go** (§7) |
| Faits de sécurité et chiffres dans le paquet validé | Loi montagne | Même paquet : aucune amende (vérifié le 10/11), panneau B26 (amende de 2e classe, plafond 150 €), période du 1er novembre au 31 mars | Validé |
| Encadré relu et empreinte | Loi montagne | Empreinte recalculée au passage = `validation` (`75abb315d6c3…`) ; même assertion dans `tests/porte6.test.ts` (CI) | Validé ; ligne de validation à écrire (§6) |
| Lien « Signaler une erreur » | 4 pages | Contrôle SIGNALER-ERREUR-ABSENT (CI) ; vu sur le site construit : `mailto:erreur@decodauto.com` sur chaque page | Validé |
| Contrôles au vert | Tout le site | CI de la pull request (§3) | Validé |
| Adresse dans la liste Lighthouse de production | 3 pages (l'accueil y était) | `lighthouserc.json` : 4 adresses ; `tests/passage.test.ts` | Validé |
| Lighthouse mobile ≥ 95 et CLS < 0,1, une page de chaque modèle (pneus, socle), avec emplacements factices | Loi montagne, « à propos », mentions légales | Recette des exemples, run 43101967291 : performance, accessibilité, bonnes pratiques, SEO = 100 ; CLS 0,000 ; LCP ≈ 0,9 s (médianes de 3 passages) | Validé |
| Revue indépendante du diff complet | Pull request | Deux revues (§8) | Faite |
| Ligne de validation de Houssem par page | 4 pages | §6 | **À écrire** |

## 3. Preuves de la CI

- **Run 43100440646** (commit 2220571) : Contrôles : 670 tests sur 670 ; construction : 3 pages, 0 erreur, 29 alertes (25 pages rattachées pas encore écrites, 3 niveaux de notices à revoir dans la base voyants, 1 « pas d'image » sur la loi montagne : toutes connues) ; liens : 5 pages, 34 liens internes, 0 problème ; `verifier:modes` : 4 combinaisons conformes ; indexation durable : 0 erreur. Recette des exemples : 0 erreur, liens 0 problème. Lighthouse : assertions passées sur 4 adresses × 3 passages.
- **Run 43101967291** (commit 6e45111) : scores Lighthouse mobile du site de production, médianes de 3 passages : accueil, « à propos », mentions légales, loi montagne : **100 / 100 / 100 / 100** (performance, accessibilité, bonnes pratiques, SEO), **CLS 0,000**, LCP ≈ 0,9 s, TBT 0 ms.
- **Run 43103006072** (commit dd8e1a7 : corrections de la première revue, title de l'accueil) : entièrement vert, 672 tests sur 672, construction 0 erreur, indexation durable 0 erreur. Le dernier commit de la pull request est revérifié avant le go (CI verte exigée).

## 4. Recette de l'étape 9 sur le site construit par la CI

Artefact `site-verifie` du run 43100440646, téléchargé dans le Chrome de Houssem avec son accord ; empreinte SHA-256 `594c858f…`, identique à celle que la CI affiche. 11 fichiers : 4 pages, 404, CSS, `robots.txt`, `sitemap.xml`, trois icônes ; **plus de `_headers`** (le `X-Robots-Tag: noindex` est retiré en mode indexable).

| Domaine | Vérifié | Résultat |
|---|---|---|
| SEO | `title`, description, H1 (uniques), canonical absolue, aucune balise robots, `lang="fr"`, `sitemap.xml` (4 adresses, `lastmod` 2026-11-10 sur les 3 pages datées, aucun sur l'accueil), `robots.txt` (`Allow: /`, ligne `Sitemap`, aucun `Disallow`), JSON-LD (accueil : WebSite `decodauto` / `decodauto.com` ; loi montagne : Article et BreadcrumbList ; « à propos » : Person), favicon déclaré | Conforme. À noter : description de la loi montagne de 170 caractères (Google peut la tronquer ; texte validé) ; « pas d'image » sur la loi montagne (alerte connue : l'image est recommandée, pas requise, pour Article) |
| Mobile | Vues à 390 px (Chrome) : aucun débordement horizontal ; CLS mesuré sur l'artefact : 0,0000 sur les 8 vues (téléphone et ordinateur) ; Lighthouse mobile 100 | Conforme |
| Accessibilité | Lighthouse accessibilité 100 ; niveaux de titres sans saut ; dessin de l'en-tête `aria-hidden`, nom lu « decodauto » ; contrastes de « auto » 6,7:1 et du texte 16,9:1 | Conforme ; lecteur d'écran et vrai téléphone non essayés |
| Juridique | Mention IA en tête avant le H1 sur les 4 pages ; ligne de transparence et signature sur la loi montagne ; bloc des mentions légales (éditeur, statut, adresse, téléphone, courriel, directeur de la publication, hébergeur Cloudflare et ses coordonnées, droit de réponse), sans numéro d'immatriculation ; politique de confidentialité (`#confidentialite`) et lien de pied de page sur chaque page ; aucun script hors JSON-LD, aucune ressource d'un autre site (TIERS-RESSOURCE) | Conforme aux décisions du 11/11 ; aucun script ni cookie sur la page servie : à vérifier après le déploiement (PROD-TRACEUR, PROD-COOKIE) |
| Liens | `npm run liens` : 0 problème ; liens internes de chaque page : accueil → loi montagne, « à propos », confidentialité ; loi montagne → « à propos » (#methode), confidentialité, 15 sources officielles | Conforme ; les 17 liens externes ne sont pas suivis par la CI (sites officiels) |

Captures (téléphone 390 px et ordinateur 1366 px, pages entières) : `accueil`, `a-propos`, `mentions-legales`, `loi-montagne`, envoyées dans la conversation du 11/11 (construction du commit 2220571 ; le commit dd8e1a7 ne change que le `title` de l'accueil, invisible sur la page).

## 5. Indexation durable : ce qui est vérifié

- **Rien ne change à chaque déploiement** : `lastmod` et `dateModified` viennent de `date_modification` (date affichée), aucune date de construction (code et site construit).
- **Manquait** : redirections, dates, titres, retour au non-indexé : demande n° 18 (contrôles dans cette pull request, règle 14 proposée pour 03 et `CLAUDE.md`).
- **Search Console** (Chrome de Houssem, lecture seule, 11/11) : propriété **de domaine** `sc-domain:decodauto.com` (tout le domaine, `www` et `http` compris), « Vous êtes un propriétaire confirmé », ajoutée le 23/10/2026 ; robots.txt valide ; 23 demandes d'exploration en 90 jours ; **aucun plan du site soumis** ; réglage « IA générative dans la Recherche » sur « Inclure » (gardé : visibilité dans les réponses générées).
- **Bing Webmaster Tools** : le Chrome de Houssem n'y est pas connecté (page « Sign in ») : non vérifié. À faire avant la soumission (§7).

## 6. Lignes de validation à confirmer (une par page)

1. **Accueil** : « Je valide l'accueil : texte validé en 7.4a, title « decodauto : voyant allumé, code défaut, que faire ? » (demande n° 19), liste générée (Loi montagne), en-tête et favicon de la piste A. »
2. **À propos** : « Je valide « à propos » telle que validée en 7.3 (texte et fiche auteur), publiée sans changement. »
3. **Mentions légales et confidentialité** : « Je valide les mentions légales et la politique de confidentialité telles que validées en 7.2 et 7.4b, hébergeur revérifié le 11/11, sans numéro d'immatriculation, publiées sans changement. »
4. **Loi montagne** : « Je valide la loi montagne telle que validée en 8.3.1a (encadré, empreinte 75abb315…, verdicts, « aucune amende » vérifié le 10/11), publiée sans changement, sous réserve du Journal officiel revérifié le jour du go. »

## 7. Checklist du go

**Avant la fusion**
1. **Journal officiel revérifié le jour même** (Légifrance, dans le Chrome de Houssem) : D314-8 inchangé ; recherches « équipements hivernaux », « dispositifs antidérapants », « période hivernale » avec « véhicules » depuis le 10/11. Un décret de sanction paru : pas de go pour la loi montagne (coût de l'encadré à revalider). Rien de nouveau : la page dit vrai (« vérifié le 10/11/2026 ») ; la date affichée se met à jour à la vérification mensuelle.
2. Lignes de validation (§6) et décisions sur les demandes n° 18 et n° 19 ; si la n° 18 est acceptée, application de `docs/03` v13 et de `CLAUDE.md` dans la pull request, CI verte de nouveau.
3. **Bing Webmaster Tools** : Houssem se connecte dans son Chrome ; vérification que decodauto.com y est ajouté et validé (sinon : import depuis Search Console).
4. CI entièrement verte sur le dernier commit ; pull request sortie du brouillon.

**Fusion** : par **commit de fusion** (« Create a merge commit »), jamais par rebase ni squash (garde-fou 7.6), par Houssem, ou par Claude sur sa demande.

**Après le déploiement** (CI de `main` : contrôles, Lighthouse, origine des commits et indexation durable depuis le dernier déploiement, déploiement, production)
5. Production : aucun `X-Robots-Tag: noindex`, aucune balise robots, `robots.txt` identique au dépôt, `sitemap.xml` servi, redirections `www` et `http` en 301 (job « production », bloquant sur `main`) ; pages servies sans script ni cookie (PROD-TRACEUR, PROD-COOKIE), relues aussi dans le navigateur ; favicon servi en `image/png`.
6. Réglages Cloudflare revus : robots d'IA (recherche et agents autorisés), Bot Fight Mode, Rocket Loader et Web Analytics désactivés, « Always Use HTTPS », règle `www`.
7. Test des résultats enrichis (Google) sur `/loi-montagne/` (Article, fil d'Ariane) ; validateur de schema.org sur l'accueil (WebSite : Google ne teste pas le nom du site).
8. **Search Console**, une seule fois, dans le Chrome de Houssem : Sitemaps → `https://decodauto.com/sitemap.xml` ; Inspection de l'URL des 4 adresses → « Demander une indexation ».
9. **Bing Webmaster Tools**, une seule fois : plan du site soumis ; envoi des 4 adresses.
10. **IndexNow** : Cloudflare → Caching → Configuration → Crawler Hints ; Houssem accepte lui-même les conditions.
11. **Suivi à J+7 et J+14** : pages indexées (Search Console › Pages ; inspection des 4 adresses) ; rappels dans la conversation si Houssem le souhaite.

## 8. Revues indépendantes (deux, le maximum)

- **Première revue (diff complet)** : « à corriger », aucun bloquant, 7 importants, 6 mineurs. Passage, empreinte, double clé, favicon et sécurité du workflow vérifiés sans constat.
  - **Changé** : journal mis à jour avec les décisions du 11/11 ; title de l'accueil aligné sur le nom du site et changement des livrables 6.3, 7.4a et 7.5a écrit (demande n° 19) ; demande n° 18 : comparaison aussi avant chaque déploiement (dernier déploiement), issues (retour décidé, page republiée, données affichées, exceptions de la règle 13 et d'une demande acceptée), raison (4) corrigée, limites écrites, catalogue marqué « à accepter » ; empreintes des fichiers du favicon ; textes périmés (catalogue, routes, briefs) ; `docs/01` (statut tranché).
  - **Écarté** : sortir la demande n° 18 dans une autre pull request (Houssem a demandé une seule pull request ; la fusion est conditionnée à sa décision) ; faire de DATE-SANS-MODIFICATION une simple alerte.
- **Seconde revue (corrections)** : « acceptable », aucun bloquant, 2 importants, 5 mineurs ; premier passage du travail « origine-main » reproduit (dernier déploiement 0e21cb6 : 0 erreur), sécurité du workflow, exceptions, nom du site, empreintes et scores Lighthouse vérifiés sans constat.
  - **Changé** : retour au non-indexé par un champ de configuration retiré (il cassait un test existant et pouvait rester actif) : il passe par une demande qui modifie le contrôle ; `editeur.ts`, `charte.ts`, plan et grille comptés parmi les fichiers affichés (sinon une date légitime des mentions légales ou de « à propos » était refusée) ; règle 14 (a) : « la page la plus proche » ; liste des fichiers à retirer si la demande n° 18 est refusée ; limites écrites (exceptions contrôlées par leur forme, pertinence de la cible d'une redirection) ; catalogue : où tourne la comparaison ; demande n° 19 : phrase sur l'icône générique retirée (absente de la page de Google) ; `docs/01` : « Houssem déclare l'avoir vérifié ; Claude ne l'a pas contrôlé ».
  - **Écarté** : rien.
  - **Reste ouvert** : premier passage réel d'« origine-main » et de l'indexation durable sur `main` (à la fusion).

## 9. Ce qui reste non vérifié

Lecteur d'écran et vrai téléphone ; favicon à 16 px dans les résultats de Google (affiché seulement après exploration) ; Bing Webmaster Tools ; le fond juridique (RGPD : décision de Houssem pour ce lot, à revoir avant AdSense) ; le premier passage réel du garde-fou et de l'indexation durable sur `main`.
