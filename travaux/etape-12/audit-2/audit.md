# Audit n° 2 UX/UI et SEO de decodauto.com : constats, propositions et maquettes (étape 12, boucle mensuelle)

Fait par Claude dans la nuit du 25 au 26/11/2026, à la demande de Houssem (25/11, 23 h 42). Sa demande, en substance :
- une revue de l'existant, pour l'améliorer visuellement et pour le référencement naturel ;
- un site à l'UI et à l'UX vraiment adaptés, qui apporte une vraie valeur aux visiteurs ;
- une liste priorisée d'améliorations qui servent à la fois le trafic et le lecteur, chacune avec sa preuve ;
- ajouté le 25/11 au soir : les chiffres de la Search Console relevés ce soir-là, et un axe (f), la notoriété (étape 12 de
  `docs/03`) : comment gagner des liens légitimes, sans achat, sans annuaires et sans liens glissés dans les forums.

**Statut : version 1, complétée le 25/11 au soir (Search Console du 25/11, axe f), à valider par Houssem.** Rien n'est appliqué au site : ce document propose, Houssem décide. Branche
`etape-12/audit-2`, pull request en brouillon. Le premier audit (20/11, `travaux/etape-12/audit-ux-ui/audit.md`, lots U0 à
U4 en ligne) n'est pas refait : on part de l'état de `main` au 25/11 (b489309, fusion de la PR n° 107, lot U4).

## 1. Méthode
- **Construction** : `main` à b489309, construite en mode indexable (`SITE_INDEXABLE=true`, drapeau à `true`), comme la
  production : 41 pages HTML (40 adresses du plan construites, plus la 404), contrôle à 0 erreur.
  Servie en local sans compression.
- **Outils** (tous dans `outils/`, résultats dans `mesures/`) :
  - `analyser-seo.mjs` → `seo.json` : title, meta description, H1, H2, canonical, balisage JSON-LD, mots, liens sortants
    et entrants par zone (gabarit : bandeau, menu et pied ; fil d'Ariane ; encadré ; texte rédigé ; « À lire aussi »),
    profondeur depuis l'accueil avec et sans le gabarit, images ;
  - `proximite-pages.mjs` → `proximite.json` et `proximite-hors-gabarit.mjs` → `proximite-hors-gabarit.json` : texte commun
    entre pages (suites de 5 mots ; la seconde mesure retire le texte répété par le gabarit, c'est-à-dire toute suite de
    5 mots présente sur 6 pages ou plus : dépannage, signature, notices…) ;
  - `volumes-par-page.mjs` → `volumes-par-page.txt` : volumes indicatifs de `docs/05` par page du plan ;
  - `compter-non-reponses.sh` → `non-reponses.txt` : phrases du type « aucune notice lue ne le dit », par page (motif
    approché, un indice) ;
  - `auditer-ux.cjs` → `ux.json` : au téléphone (375 × 667) et sur ordinateur (1366 × 800), 8 pages : longueur en écrans,
    première situation, illustration, « À lire aussi », cibles tactiles, contrastes de chaque élément qui porte du texte,
    sauts de niveau de titre, ordre de lecture ;
  - `maquettes.mjs`, `capturer-zones.cjs`, `capturer-v3.cjs`, `capturer.cjs` : maquettes appliquées à la construction
    réelle, captures et mesures (§6) ; Lighthouse 12.6.1 en mobile, médiane de 3 passages → `lighthouse-maquettes.json`.
- **Captures de l'état actuel** (`captures/etat-*`) : premier écran au téléphone de P0087, 10W40, surchauffe et
  accueil, police chargée et police de secours ; fiche et fin de la page P0087.
- **Search Console du 25/11** (`travaux/etape-12/suivi-search-console/releve-25-11.md`) : performances du 27/10 au 23/11,
  indexation (rapport en retard de quelques jours). Trop maigres pour changer un title (règle 14 c) : elles servent à
  prioriser.
- **Données** : relevé Search Console J+7 (`travaux/etape-12/suivi-search-console/releve-j7.md`, données au 16 et 18/11,
  inspection du 21/11 notée au journal) ; résultats Google et suggestions de `docs/07` (relevés le 22/10 depuis la
  Tunisie) ; volumes de `docs/05`.
- **Limites** :
  - le site en ligne n'est pas joignable depuis la session (le proxy refuse decodauto.com) : tout est mesuré sur la
    construction de `main`, identique au site en ligne depuis le déploiement de la PR n° 107 (non revérifié en ligne) ;
  - Search Console : 255 impressions et 0 clic en 28 jours, trop peu pour juger un title ou un taux de clic ; Google ne donne pas la cause d'un « Explorée, actuellement non
    indexée » : les causes proposées au §3 sont des causes **vérifiables sur le site**, pas des causes prouvées ;
  - le site a deux semaines : c'est la cause la plus probable de la plupart des pages non indexées, et la seule qu'aucune
    correction ne traite ;
  - mesures avec la police de secours du conteneur (proche des téléphones), pas sur un vrai téléphone ;
  - les pages de Google citées (C8, demande n° 45) n'ont pas été relues cette nuit.

## 2. Ce qui marche, vérifié, à garder
- **Technique** : canonical absolue et propre à chaque page (40 adresses) ; `sitemap.xml` à 40 adresses, `lastmod` égal à
  la date affichée ; `robots.txt` sans `Disallow` et avec le plan du site ; title, H1 et meta description uniques ; JSON-LD
  lisible sur toutes les pages (Article et BreadcrumbList sur les 37 pages éditoriales, WebSite, Person) ; Lighthouse
  mobile 100 dans les quatre catégories et CLS 0 sur les 4 pages mesurées (`lighthouse-maquettes.json`, « avant »).
- **Profondeur** : chaque page est à un clic de l'accueil, même sans le menu ni le pied de page (`seo.json`,
  `profondeurContenu`).
- **Lecture au téléphone** : la décision d'abord (première situation complète sous 667 px sur les pages mesurées, sauf
  « pression des pneus », page informative où la précision 2a s'applique : verdict à 545 px, urgence à 573 px ; la 10W40
  à 646 px et la surchauffe à 641 px dépassent de peu la marge visée de 640 px) ; aucun défilement horizontal ; aucun contraste
  sous le seuil AA sur 16 mesures (8 pages × 2 tailles, tous les éléments qui portent du texte, fonds sombres compris) ;
  aucun saut de niveau de titre ; ordre du DOM égal à l'ordre à l'écran dans la colonne.
- **Questions des lecteurs** : les H2 des pages à fort volume reprennent les questions associées relevées dans `docs/07`
  (voyant moteur, voyant d'huile, AdBlue, FAP, P0420, 5W30, loi montagne : `seo.json`, champ `h2`).
- **Confiance** : mention IA en tête, signature datée, ligne de transparence et lien « Méthode », sources repliées et
  comptées, lien « Signaler une erreur » pré-rempli avec l'adresse de la page.

## 3. Constats, du plus important au moins important
**C0. Search Console du 25/11 : où sont les impressions (prioriser).**
- 255 impressions, 0 clic, position moyenne 47,3, 90 requêtes (27/10 au 23/11 ; relevé J+7 : 59 impressions).
- **Une page porte un tiers des impressions, loin** : `/loi-montagne/`, 93 impressions, position 76,8 ; requêtes « loi
  montagne », « panneau chaine obligatoire » (8 ; 83,4), « chaine obligatoire » (8 ; 87,4), « region pneu neige
  obligatoire » (4 ; 90,8), « pneus hiver ou chaînes pour traverser le massif central ? » (2 ; 77,5).
- **Sept pages sont déjà près de la première page** (position moyenne de 7,5 à 18) : niveau d'huile (67 impressions ;
  12,9), recharger la batterie (11 ; 12,0), changer la batterie (9 ; 15,1), voyant AdBlue (5 ; 18,0), PureTech (4 ; 9,0),
  pression des pneus (3 ; 10,3), batterie de voiture (2 ; 7,5). À ces positions, la meta description et le premier
  écran décident du clic : ce sont les premières pages à servir par P6.
- **Pages à impressions, loin** : liquide de frein (20 ; 65,3 ; « peugeot 208 liquide de frein » en position 29,5),
  usure des pneus (10 ; 40,1), voyant de préchauffage (10 ; 51,8), nettoyer le FAP (8 ; 57,4), voyant batterie (8 ;
  72,3), « broute » (5 ; 72,6). Leurs requêtes (« témoin pneu usure », « voyant batterie », « voyant préchauffage »,
  « nettoyer fap en roulant ») sont des H2 de la page (`seo.json`) : rien de manquant à signaler sans plus de données ;
  elles relèvent de P6 (descriptions) et de la notoriété (axe f).
- **Aucune impression** pour les codes P0087, P0299 et P0420, la surchauffe, « ne démarre pas », les grades d'huile
  et le liquide de refroidissement (pages absentes de la liste).
- **Indexation** : 14 indexées ; 12 « Explorée, actuellement non indexée » (dont les trois codes, la surchauffe, « ne
  démarre pas », pression des pneus, voyant de pression des pneus, et les trois pages batterie, qui ont pourtant des
  impressions : le rapport est en retard) ; **13 adresses du plan du site dans aucune des deux listes** : Google ne les a
  pas encore traitées (ou le rapport ne les montre pas encore). 14 + 12 + 13 = 39 pour 40 adresses au plan du site : une
  adresse n'est pas expliquée par le relevé (à vérifier à J+14 dans la Search Console).

**C1. Les trois pages des grades d'huile sont presque identiques (fort, trafic et lecteur).**
- Texte propre commun (hors gabarit, `proximite-hors-gabarit.json`) : 10W40 et 5W40, 83 et 85 % ; 10W40 et 5W30, 75 et
  66 % ; 5W30 et 5W40, 64 et 75 %. Aucune autre paire du site ne dépasse 52 %.
- Les sources le montrent : entre la 5W40 et la 10W40, une fois le grade remplacé, seuls trois H2, la section sur la
  classe ACEA et deux phrases diffèrent (`diff` de `src/content/fluide/huile-5w40.md` et `huile-10w40.md`) ; les sections « Que veut dire », « température »,
  « diesel ou essence », « appoint » et « bidon » se répètent sur les trois pages.
- Leur réponse est surtout négative : 4 phrases « aucune notice lue ne la cite » sur la 5W40 et la 10W40, le plus haut
  du site (`non-reponses.txt`) ; l'encadré de la 10W40 dit « Aucune notice lue ne la cite » (capture
  `captures/etat-huile-moteur-10w40-375.png`).
- Search Console : 5W30 et 10W40 « Google ne reconnaît pas cette URL », 5W40 « Explorée, actuellement non indexée »
  (inspection du 20/11). Volumes : 27 492, 22 752 et 12 956 recherches par mois (63 200 en tout, `volumes-par-page.txt`).
- Lecture : pour Google, trois pages au texte presque commun ; pour le lecteur qui cherche « quelles voitures utilisent la
  10W40 », une page qui ne le dit pas. C'est le seul cas du site où la proximité mesurée explique probablement la
  non-indexation.

**C2. Les codes P0087 et P0299 : peu de liens entrants et des sections sans réponse (fort pour le volume).**
- Liens entrants hors gabarit (`seo.json`, `nbEntrantsContenu`) : 3 chacun (accueil, voyant moteur, perte de puissance),
  parmi les plus bas du site (médiane des pages éditoriales : 4). Les codes ne se lient pas entre eux.
- Sections sans réponse : « P0087 sur un autre moteur ou une autre marque (1.4 HDi, 1.6 HDi, Mercedes) » dit que « les
  documents lus ne décrivent aucun cas sur ces moteurs » ; 3 phrases de ce type sur chaque code (`non-reponses.txt`).
- Texte propre commun entre les trois codes : 14 à 19 % (gabarit de la fiche, `proximite-hors-gabarit.json`) : faible.
- Search Console : P0087, P0299 et P0420 « Explorée, actuellement non indexée » (25/11), aucune impression. Volumes :
  17 380, 15 168 et 10 744 par mois.
- Lecture : la proximité n'explique pas ces deux pages ; le maillage faible et les réponses manquantes sont les deux
  causes vérifiables. La médiane des liens entrants des 16 pages non indexées ou non reconnues aux relevés des 16 et 20/11 (4) est
  à peine sous celle des 21 autres pages éditoriales (5) :
  le maillage seul n'est pas la cause.

**C3. « Voiture qui broute » redit « perte de puissance » (moyen).**
- 52 % du texte propre de « broute » se retrouve dans « perte de puissance » (`proximite-hors-gabarit.json`), surtout les
  lignes de l'encadré, validées et tirées des mêmes notices (Renault, Dacia, Seat, Toyota).
- Ce qui manque par rapport aux recherches : « quand j'accélère fort, ma voiture broute » et « voiture qui broute en
  roulant essence » (`docs/07`), « à l'accélération diesel » (`docs/05`, 316 par mois). Ce sont les angles propres à
  « brouter ».
- Volume : 9 164 par mois. Search Console du 25/11 : 5 impressions, position 72,6.

**C4. « Loi montagne » : un tiers des impressions du site, sans la liste des départements (fort, saisonnier).**
- 93 des 255 impressions du site (25/11), position moyenne 76,8 (37 sur 59 et 74,4 au relevé J+7) ; requêtes : « panneau
  chaine obligatoire », « chaine obligatoire », « region pneu neige obligatoire », « pneus hiver ou chaînes pour traverser
  le massif central ? » (C0). Le panneau B26 est décrit dans le texte mais montré nulle part (photo et dessin : panneau
  B58 et flanc du pneu).
- `docs/05` : « departement pneu neige obligatoire » et « zone pneu neige obligatoire », 3 160 chacune.
- La page renvoie à la carte et aux arrêtés de la Sécurité routière ; le tableau des départements (livrable 8.3.1b) est
  en pause depuis le 11/11 (relevé partiel sur la branche `etape-8/departements-loi-montagne`).
- L'obligation court du 1er novembre au 31 mars : chaque semaine d'attente est une semaine de saison perdue.

**C5. Meta descriptions trop longues (moyen, peu coûteux). Constat déjà fait par le premier audit (C9), qui renvoyait
titles et descriptions au relevé J+30, ce que Houssem a retenu le 21/11 : P6 propose d'avancer les seules descriptions.**
- 33 pages éditoriales sur 37 dépassent 155 caractères, 28 dépassent 160 ; la plus longue en fait 193
  (« Comment changer une batterie de voiture… »). Au-delà, le texte est coupé dans les résultats.
- La description n'est ni dans l'empreinte de validation ni dans la règle 14 c (`src/lib/empreinte.ts`,
  `scripts/verifier-indexation-durable.ts` : aucune mention) : la raccourcir ne demande pas d'attendre la Search Console.

**C6. Titles et H1 : rien à changer sans données (à confirmer avec la Search Console ; même constat que C9 du premier
audit).**
- 12 titles dépassent 60 caractères (max. 68, loi montagne) ; tous contiennent la requête principale de leur page.
- 21 H1 sur 37 ne contiennent pas la requête principale telle quelle (comparaison littérale, `seo.json`).
- Règle 14 c : pas de réécriture sans données chiffrées de la Search Console, au plus une fois par 90 jours. **À
  confirmer avec la Search Console** au relevé J+30 (≈ 17/12), page par page.

**C7. Libellés des codes peu parlants dans les liens (faible).**
- « Code P0087 », « Code P0299 », « Code P0420 » dans le menu, l'accueil, le fil d'Ariane et « À lire aussi » : le lecteur
  ne sait pas de quoi parle le code avant d'ouvrir la page, et le texte du lien ne le dit pas à Google.

**C8. Article sans image sur 31 pages sur 37 (faible à moyen).**
- 31 alertes R7-IMAGE-RECOMMANDEE à chaque construction ; seules les 6 pages à photo du registre (`data/photos.json`,
  demande n° 42) portent `image`.
- Chaque page a déjà une image de partage de 1 200 × 630 px tirée de son illustration (lot U3), non utilisée par le
  balisage (commentaire de tête de `src/lib/donnees-structurees.ts` : « ni dessin ni image de partage »).
- Aucune directive `max-image-preview:large` (aucune meta robots en mode indexable).

**C9. « Signaler une erreur » n'est qu'en bas de page (moyen pour la confiance).**
- Au téléphone, le pied de page qui porte le lien commence à 7 576 px sur P0087 (11,4 écrans,
  `maquettes-avant.json`, `hautPied`) ; « À lire aussi », au-dessus, est à 17,3 écrans sur le voyant moteur et 15,2 sur la
  surchauffe (`ux.json`) : le lien est plus bas encore.
- Sans relecteur mécanicien (page « à propos »), le signalement du lecteur est le premier filet de correction.

**C10. Cibles tactiles du fil d'Ariane et du pied de page (faible).**
- Fil d'Ariane : 45 × 16 px (« Accueil »), 118 × 16 px ; pied de page : 17 px de haut (`ux.json`, `ciblesSous24`).
- Le seuil AA (WCAG 2.5.8) est tenu par l'espacement, d'où Lighthouse à 100 ; on reste loin des 44 px conseillés
  (2.5.5, AAA), sur le lien le plus touché en haut de page.

**C11. Notoriété : un site de deux semaines, sans raison donnée aux autres de le citer (axe f, fort à terme).**
- 12 pages « Explorée, actuellement non indexée » et 13 adresses encore non traitées (C0). Hypothèse, non prouvée : pour
  un site neuf, des signaux extérieurs (liens, citations) aident Google à retenir les pages qu'il explore. Les liens entrants ne sont pas mesurés ici (le
  rapport « Liens » de la Search Console n'a pas été relevé) : à relever à J+30.
- Ce que d'autres pourraient citer existe déjà : l'outil voyants (une ligne par voyant, gravité écrite, écart entre
  marques), les tableaux « Ce que dit la notice de votre marque », la page loi montagne en pleine saison, les dessins
  redessinés pour le site.
- Ce qui manque pour être citable : aucune licence de réutilisation des dessins (mentions légales sans clause sur le
  droit d'auteur : `src/content/socle/mentions-legales.md`), aucune version imprimable (aucune règle `@media print` dans
  `src/styles/`, l'impression de la page outil donne 13 pages A4 sur fond nuit : `maquettes/avant-v4-impression-*`),
  aucune page qui dise aux journalistes, écoles de conduite ou collectivités ce qu'ils peuvent reprendre et comment citer.
- `docs/03`, ligne 12 : « ressources que d'autres citent (outil voyants, tableaux) ; jamais d'achat de liens, ni
  annuaires, ni liens glissés dans les forums ».

**Constats mineurs, sans proposition**
- 18 textes alternatifs d'illustrations dépassent 125 caractères (jusqu'à 267, grades d'huile) : longs pour un lecteur
  d'écran, mais ils décrivent des schémas et ont été validés ; à revoir avec chaque page reprise.
- « Revu le » antérieur à « Mis à jour le » sur les pages modifiées le 21/11 (demande n° 39) : exact (une revue complète
  et une modification sont deux dates différentes), mais peut surprendre ; rien à changer.
- `lastmod` du 21/11 sur 32 adresses du plan du site : la demande n° 39 et les lots du 21/11 ont modifié ces pages ;
  conforme à la règle 14 b.
- Aucun lien d'évitement : trois arrêts au clavier avant le contenu (logo, menu fermé, « Mon voyant ») ; acceptable.

## 4. Propositions classées
Classement par gain pour le trafic et pour le lecteur, puis par effort. « Règles » : ce que la proposition touche.

| # | Proposition | Trafic | Lecteur | Effort | Risque | Règles touchées | Lot |
|---|---|---|---|---|---|---|---|
| P1 | Grades d'huile : dédoublonner et enrichir (C1) | fort | fort | élevé | moyen | texte de pages validées, registre des sources | A2 |
| P2 | Trois paires de liens du plan (C2) | moyen | moyen | faible | faible | plan (paires proposées avec le lot) | A0 |
| P3 | Loi montagne : départements concernés (C4) | fort, saisonnier | fort | élevé | moyen | reprise de 8.3.1b, registre | A3 |
| P4 | Codes P0087 et P0299 : répondre aux sections vides (C2) | moyen | moyen | moyen | moyen | texte, registre | A4 |
| P5 | « Voiture qui broute » : ses angles propres (C3) | moyen | moyen | moyen | moyen | texte, registre | A4 |
| P6 | Meta descriptions de 155 caractères au plus (C5) | faible à moyen | faible | faible | faible | aucune règle figée | A0 |
| P7 | Image de l'Article et aperçu en grand (C8) | faible à moyen | nul | faible | faible | **demande n° 45** | A1 |
| P8 | Libellés courts des codes (C7), maquette V3 | faible | faible | faible | faible | contenu (libellé court) | A0 |
| P9 | « Signaler une erreur » après la décision (C9), maquette V1 | nul | moyen | faible | faible | **demande n° 46** | A1 |
| P10 | Cibles de 44 px : fil d'Ariane et pied (C10), maquette V2 | nul | faible | faible | faible | charte graphique (variante) | A0 |
| P11 | Titles et H1 (C6) | ? | ? | faible | moyen | règle 14 c | après J+30 |
| N1 à N5 | Notoriété : ressources citables et prise de contact par Houssem (C11, axe f, détail plus bas) | moyen à fort, lent | moyen | faible à élevé | faible à moyen | **demande n° 47** pour N3 ; charte (version imprimable) | A5 |

**Les cinq propositions à plus fort impact** (ordre de priorité ; P3 d'abord, la saison se ferme le 31 mars), avec les chiffres du 25/11 : **P3** (loi montagne : la page qui a le plus
d'impressions, un tiers du site, saison en cours, requêtes « région », « massif », « panneau ») ; **P1** (grades d'huile : 63 200
recherches par mois, trois pages quasi identiques, aucune impression) ; **P6** (descriptions, en commençant par les sept
pages déjà entre les positions 7,5 et 18, d'abord le niveau d'huile : 67 impressions en position 12,9, la page la plus
proche de rapporter des clics) ; **P2** (paires de liens, une heure de travail, codes et surchauffe sans
impression) ; **N2 avec N3** (outil voyants et loi montagne rendus citables, imprimables et réutilisables : la seule
façon, sans achat ni annuaire, d'obtenir les signaux extérieurs qui manquent à un site neuf).

### P1. Grades d'huile (5W30, 5W40, 10W40) : dédoublonner et enrichir. Recommandée, la plus rentable
- **Changement** :
  1. Les explications communes (lire un bidon, classes ACEA C, appoint) se disent une fois, sur la page mère « Huile
     moteur », et chaque grade y renvoie par le lien mère-enfant du plan, en une phrase. Aucune question des lecteurs n'est
     retirée (règle 2j) : le H2 reste, sa réponse se raccourcit.
  2. Chaque grade gagne ce qui lui est propre, sourcé : les voitures dont la notice cite ce grade, dans un tableau (`{{tableau}}`,
     comme « Ce que dit chaque notice » de la page « liquide de refroidissement »). Piste à vérifier : notices de voitures plus
     anciennes ou d'autres marques, qui citent la 10W-40 et la 5W-40 dans leur tableau des viscosités selon la
     température. **Aucune source n'est trouvée ni lue cette nuit** : la première tâche du lot est ce relevé.
  3. Si un grade ne trouve aucune source nouvelle, sa page le dit en tête et reste courte ; la fusion avec redirection 301
     n'est à rouvrir qu'au relevé J+30 et par demande de changement (une intention = une page, `docs/02`).
- **Mesure de réussite** : texte propre commun entre deux grades sous 30 % (`proximite-hors-gabarit.mjs`) ; puis, à
  J+30 de la mise en ligne, les trois adresses indexées.
- **Règles** : encadrés inchangés (verdicts, urgences, actions), sauf si une nouvelle notice change une ligne, ce qui passe
  alors par la validation des verdicts ; sources nouvelles au registre ; date « Mis à jour le » changée (vraie
  modification, règle 14 b) ; title et H1 inchangés.

### P2. Trois paires de liens du plan. Recommandée, en premier (rapide)
Paires proposées pour la pull request du lot, avec leur justification (procédure du 23/10, sans demande de changement) :

| Paire | Justification (sur les pages) |
|---|---|
| Code P0087 ↔ Code P0299 | deux codes génériques qui allument le même voyant moteur (même ligne de la base dans l'encadré), tous deux liés à « perte de puissance » dans le plan, et dont la page cite la perte de puissance parmi les symptômes |
| Code P0087 ↔ Voiture qui ne démarre pas | la page P0087 cite « des difficultés de démarrage (fiches Hella, 2,2 HDi) » |
| Perte de puissance ↔ Moteur qui surchauffe | l'encadré de « perte de puissance » porte la ligne `temperature-rouge` ; « surchauffe » cite, d'après la notice Toyota Yaris, la perte de puissance parmi les signes de surchauffe |

- **Effet** (liens entrants hors gabarit) : P0087 3 → 5, P0299 3 → 4, surchauffe 4 → 5, perte de puissance 8 → 9,
  « ne démarre pas » 7 → 8.
- **Écartées** : P0299 ↔ fumée à l'échappement (la page P0299 ne parle pas de fumée) ; une page « Codes défaut » (aucun
  mot-clé générique de code au périmètre, `docs/05`, et les pages « thème » sont en idées reportées).

### P3. Loi montagne : tableau des départements concernés. Recommandée, pendant la saison
- **Changement** : reprise du livrable 8.3.1b : un tableau des départements où un arrêté préfectoral liste des communes,
  avec l'arrêté en vigueur (source de première main au registre, date) et le lien vers la page de la préfecture ; revue
  avant chaque 1er novembre (charte §8, déjà prévu pour la page).
- **Pourquoi maintenant** : un tiers des impressions du site (93 sur 255, position 76,8), requêtes « région », « massif
  central », « panneau » (relevé du 25/11) et « zone » (relevé J+7) ; « departement pneu neige obligatoire » et « zone pneu neige obligatoire » au périmètre (3 160
  chacune) ; saison en cours, jusqu'au 31 mars.
- **P3b, avec le lot** : montrer le panneau B26 (« panneau chaine obligatoire » : 8 impressions, position 83,4), là où le
  texte en parle : photo sous licence libre (acceptée par Houssem, demande n° 42) ou dessin du panneau pour le site ;
  conception d'abord (règle 15 : place, captures), non maquetté cette nuit.
- **Effort et risque** : élevé ; relevé partiel déjà fait (5 départements lus, 45 lus par un agent sans aucun « sûr ») ;
  sites des préfectures instables. Lot découpable : d'abord les départements lus avec leur arrêté, la phrase « liste en
  cours » pour les autres, jamais une ligne non vérifiée.
- **Règles** : décision de Houssem (8.3.1b reporté par la porte 8) ; tableau = élément de la page pneus déjà prévu
  (`{{tableau}}`) ; sources au registre ; validation de Houssem.

### P4. Codes P0087 et P0299 : répondre aux sections vides. Recommandée
- **Changement** : chercher des documents de première main ou admis (bulletins techniques, fiches d'équipementier) pour
  les moteurs et marques que les H2 nomment déjà (1.4 et 1.6 HDi, Mercedes pour P0087 ; Peugeot 1.6 HDi, Citroën, Renault 1.5 dCi, Ford, Opel, Mercedes pour
  P0299 : les cas par marque de cette page ne viennent que de voitures vendues en Amérique du Nord),
  et remplacer « aucun document lu » par ce qu'ils disent. Sans document : garder la phrase honnête, plus courte.
- **Avec** : la paire P0087 ↔ P0299 (P2).
- **Règles** : texte et registre ; encadré inchangé (la ligne du voyant moteur vient de la base).

### P5. « Voiture qui broute » : ses angles propres
- **Changement** : sections sourcées sur ce que seule cette page traite : à-coups à l'accélération (essence et diesel),
  « en roulant » (essence), d'après les notices déjà au registre (Toyota p. 291, Seat p. 289, Renault p. 188, Dacia
  p. 162) et toute notice qui distingue ces cas ; sans réponse sourcée, pas de section.
- **Mesure** : texte propre commun avec « perte de puissance » sous 30 %.

### P6. Meta descriptions de 155 caractères au plus. Recommandée, avec P2
- **Changement** : réécrire les 33 descriptions de plus de 155 caractères, **en commençant par les sept pages déjà
  entre les positions 7,5 et 18** (C0 : niveau d'huile 179 caractères, recharger 178, changer 193, AdBlue 190, PureTech
  177, pression des pneus 171, batterie de voiture 184) : la décision et ce qui distingue la page, en premier ; la description reste le reflet de l'encadré (jamais un verdict absent de l'encadré).
- **Décision à prendre par Houssem** : le premier audit (C9, retenu le 21/11) renvoyait titles et descriptions au relevé
  J+30. P6 propose d'avancer les descriptions seules, parce qu'elles ne sont ni sous la règle 14 c ni dans l'empreinte, et
  que sept pages sont déjà en position de recevoir des clics ; les titles restent à J+30 (P11).
- **Règles** : aucune règle figée ; validation de Houssem avec le lot ; date « Mis à jour le » inchangée (métadonnée) ; les
  balises de partage reprennent la même description (PARTAGE-COHERENCE).
- **Proposé en plus** : l'alerte de longueur notée en idées reportées (« Longueur des title et des meta descriptions »)
  devient un contrôle d'alerte (description de plus de 155 caractères).

### P7. Image de l'Article et aperçu en grand : demande de changement n° 45 (brouillon)
- `demande-changement-45.md` : l'image de partage de chaque page sans photo devient `image` de son Article ;
  `max-image-preview:large` en mode indexable. Option A recommandée. Rien de visible.

### P8. Libellés courts des codes (maquette V3)
- « P0087 : pression carburant », « P0299 : pression turbo », « P0420 : catalyseur » à la place de « Code P0087 »… (champ
  `libelle_court` des trois pages ; 45 caractères au plus, `LIBELLE_COURT_MAX`).
- **Version longue écartée** (« Code P0087 : pression de carburant trop basse »…) : pastilles de quatre lignes et fil
  d'Ariane coupé au téléphone (`maquettes/ecartees/v3-long-*`).
- **Mesures** (version courte) : bas de la première situation de P0087 inchangé (520 px police chargée, 545 px secours) ;
  « À lire aussi » du voyant moteur 345 → 414 px au téléphone ; carte « Alertes et codes » de l'accueil 520 → 522 px ;
  menu inchangé (496 px). Les hauteurs de page « après » cumulent V1, V2 et V3 : l'allongement de l'accueil (3 006 →
  3 082 px) vient presque entièrement du pied de page (V2).
- **Défaut qui reste** : avec la tuile du pictogramme, les pastilles des codes passent sur trois lignes (« P0087 : » seul
  sur la première), au téléphone comme sur ordinateur (`apres-v3-liees-375-secours.png`, `apres-v3-liees-1366.png`), et
  les rangées de « À lire aussi » deviennent irrégulières. Gain faible pour ce prix : **P8 est proposée en dernier, et
  seulement si Houssem préfère des libellés parlants à des pastilles régulières**.

### P9. « Signaler une erreur » juste après la décision : demande de changement n° 46 (brouillon, maquette V1)
- La ligne de transparence finit par « Méthode · Signaler une erreur », même lien pré-rempli que le pied de page, sur les 37
  pages éditoriales ; le lien du pied reste.
- **Mesures** : la ligne garde sa hauteur sur les trois pages mesurées (bas de la ligne 1 070 px sur P0087 au téléphone,
  avant comme après) ; premier écran et illustration inchangés.
- **Cible** : le nouveau lien mesure 118 × 16 px ; c'est un lien dans une phrase, exempté par WCAG 2.5.8, comme
  « Méthode » à côté ; P10 ne vise que les liens isolés (fil d'Ariane, pied de page).

### P10. Cibles de 44 px : fil d'Ariane et pied de page (maquette V2)
- Fil d'Ariane : zone tactile agrandie par marges négatives, mise en page inchangée : 45 × 16 → 55 × 47 px.
- Pied de page : liens de 44 px de haut : 61 × 17 → 74 × 44 px ; la page s'allonge de 75 px au téléphone et de 30 px sur
  ordinateur (P0087, police de secours).
- **Règles** : variante de composant de la charte (`charte-b.css`, `docs/11` §4, rangées « Tête de page » et « Pied de
  page »), validée par Houssem avec le lot, sans demande de changement ; le pied de page vient de la demande n° 40 :
  Houssem confirme qu'une variante d'espacement n'en demande pas une nouvelle.

### P11. Titles et H1 : à confirmer avec la Search Console
- Rien n'est proposé avant le relevé J+30 (≈ 17/12). Ce jour-là : pour chaque page qui a des impressions, comparer les
  requêtes réelles au title et au H1 ; ne proposer un changement qu'avec ces chiffres, une ligne dans
  `config/changements-de-titre.json`, au plus une fois par 90 jours (règle 14 c). Pistes à confirmer : titles de plus de
  60 caractères (C6), H1 sans la requête principale.

### Axe (f) : notoriété, des liens légitimes
Principe : donner aux autres une **raison de citer** (une ressource utile, exacte, réutilisable), puis le leur dire, une
fois, par un message de Houssem. Rien d'automatique ; aucun message envoyé par Claude ; aucun échange de liens.

| # | Piste | Qui peut citer (types de sites) | Ce qu'il faut ajouter au site | Effort | Délai | Risque | Dépend de Houssem |
|---|---|---|---|---|---|---|---|
| N1 | **Loi montagne en saison** : la page avec le tableau des départements (P3), le panneau B26 (P3b) et une version imprimable (N2) | médias locaux des massifs, offices de tourisme et stations, pages d'aide « circuler en hiver » de communes et de départements, écoles de conduite des départements concernés, clubs et associations de montagne | P3, P3b, version imprimable | élevé (P3), puis faible | 2 à 4 semaines ; à faire avant février, la saison finit le 31 mars | moyen : un arrêté remplacé rend une ligne fausse (revue avant chaque 1er novembre, date du relevé affichée) ; silence des destinataires | valider P3 ; choisir les destinataires ; écrire et envoyer chaque message lui-même ; répondre |
| N2 | **Outil voyants imprimable et dessins réutilisables** : la fiche « voyants du tableau de bord » (grille par couleur, gravité écrite) imprimable en A4, et les pictogrammes redessinés sous licence ouverte avec crédit | écoles de conduite et moniteurs, formations à la sécurité routière (associations, services de prévention de collectivités), enseignants de mécanique, sites d'aide aux automobilistes | version imprimable (maquette V4) ; licence et page de réutilisation (N3) | moyen | 2 à 6 semaines | faible à moyen : un dessin repris hors contexte, sans la gravité ni la notice ; la licence l'encadre (crédit, lien) ; la gravité n'est reprise qu'avec sa page | choisir la licence (décision juridique) ; valider la fiche ; prendre contact |
| N3 | **Page « Réutiliser et citer decodauto »** (presse et réutilisation) : ce qu'est le site, sa méthode, son auteur, ce qu'on peut reprendre (dessins, images de partage, tableaux cités avec lien), comment citer une page, contact | journalistes (consommation, automobile, presse locale), blogs d'automobilistes, écoles de conduite | une page du socle (nouvelle adresse au plan) ; clause de licence dans les mentions légales | faible à moyen | 1 semaine après l'accord | faible | **demande n° 47** (brouillon) ; licence ; texte de la page (le contact existe déjà : `{{contact}}`) |
| N4 | **Données ouvertes** : la base voyants (voyant, couleur, gravité, action, marques et pages de notice citées) publiée comme jeu de données, avec sa méthode et sa date, sous licence ouverte, sur une plateforme publique de données ouvertes ; la page du jeu de données renvoie au site | réutilisateurs de données, développeurs d'applications d'aide à la conduite, chercheurs | un fichier généré depuis `data/voyants.json` (jamais saisi), daté ; la méthode existe (« à propos ») | moyen | 3 à 6 semaines | moyen : un verdict repris sans sa page ni sa date ; mise à jour à suivre à chaque changement de la base ; conditions de la plateforme à lire | créer le compte de publication ; choisir la licence ; décider de publier (demande de changement à écrire avec le lot) |
| N5 | **Une étude citable** : « Quand les notices ne disent pas la même chose » : les 16 lignes de la base voyants (sur 26) qui ont un écart entre marques, d'après les notices lues de six marques, ligne par ligne | presse automobile et consommation, associations d'automobilistes | une page dossier (nouvelle adresse au plan), tirée de la base, avec un tableau | moyen à élevé | 4 à 8 semaines | moyen : chaque écart doit rester exact et sourcé ; pas de jugement sur une marque | valider la page et ses verdicts ; décider de la proposer ; contacter |

- **Ordre** : N3 et la version imprimable d'abord (ils servent N1, N2 et N5), puis N1 pendant la saison, N2, N4 et N5.
- **Mesure** : rapport « Liens » de la Search Console (sites et pages qui lient) à J+30 puis chaque mois ; journal des
  messages envoyés par Houssem (date, type de site, réponse), sans nom de personne dans le dépôt public.
- **Maquette V4, version imprimable** (`outils/maquettes.mjs`, règles `@media print` seules : l'écran ne change pas) :
  surfaces sombres et tuiles des voyants en clair, couleurs des voyants et des verdicts gardées, verdicts en noir,
  « Sources » dépliée (la liste complète s'imprime : vérifié par `pdftotext` sur la loi montagne), bandeau, menu,
  sommaire, filtre et « À lire aussi » masqués, adresse de la page en fin d'impression ; aucune licence imprimée tant que
  la demande n° 47 n'est pas tranchée. Mesures (`outils/imprimer.cjs`, Chromium, A4, marges de 12 mm, police chargée et
  police de secours) : loi montagne 6 → 6 pages (une de moins sans les sources, regagnée en les imprimant) ; outil 13 →
  14 pages (la liste des cartes reste longue : une fiche A4 dédiée, grille seule, serait à concevoir avec N2). Captures
  `maquettes/avant-v4-impression-*` et `apres-v4-impression-*` (deux premières pages, 90 ppp, deux polices). Lighthouse inchangé (`lighthouse-maquettes.json`, entrées « v1 à v4 » :
  loi montagne 100, outil 99 en performance avant comme après, CLS 0).
- **Règles** : version imprimable = variante de la charte (`docs/11`, `charte-b.css`), sans demande de changement ; N3 et
  N5 ajoutent une adresse au plan, N2 et N4 une licence : demande de changement (n° 47 pour N3 et la licence ; N4 et N5 à
  écrire avec leur lot).

## 5. Découpage en lots, dans l'ordre proposé
1. **Lot A0, rapide** (P2, P6, P10, et P8 si Houssem la retient) : paires du plan, descriptions, cibles tactiles,
   libellés des codes. Sans demande
   de changement ; captures, revue, validation de Houssem, recette de l'étape 9.
2. **Lot A3, loi montagne** (P3, P3b) : dès la décision de Houssem, pendant la saison (jusqu'au 31 mars) ; peut avancer
   en parallèle de A0 (pages différentes), une branche par lot.
3. **Lot A1** (P7, P9) : demandes n° 45 et n° 46, puis leur code et leurs contrôles.
4. **Lot A2, grades d'huile** (P1) : relevé des notices d'abord, puis rédaction et validation.
5. **Lot A4, codes et « broute »** (P4, P5) : même chemin que A2.
6. **Lot A5, notoriété** (N1 à N5) : demande n° 47 et version imprimable d'abord, puis N1 avec le lot A3 ; les messages
   sont écrits et envoyés par Houssem.
7. **Après J+30** : P11, et le bilan de chaque lot dans la Search Console (pages indexées, impressions).

Chaque lot : une branche et une pull request, contrôles verts, captures 375 et 1 366 px avec les deux polices, une revue
indépendante, validation de Houssem, recette de l'étape 9 avant la fusion, vérification après déploiement.

## 6. Maquettes et mesures (règle 15)
- **Construction réelle** : `outils/maquettes.mjs` copie la construction de `main` et y applique V1 (P9), V2 (P10) et V3
  (P8) ; captures `maquettes/avant-*` et `maquettes/apres-*`, à 375 × 667 et 1366 × 800, police chargée (`font-display`
  forcé à `block` pour l'attendre) et police de secours (police du site bloquée).
  - V1 et V2 : `*-premier-ecran-*`, `*-transparence-*`, `*-pied-*` sur P0087, voyant moteur et surchauffe ;
  - V3 : `*-v3-liees-*` (voyant moteur), `*-v3-tete-*` et `*-v3-menu-*` (P0087), `*-v3-accueil-codes-*` (accueil).
- **Premier écran** (`mesures/maquettes-avant.json`, `maquettes-apres.json`, `v3-*.json`) : haut du H1, bas de la première
  situation et haut de l'illustration identiques avant et après sur les trois pages, aux deux tailles et avec les deux
  polices.
- **Lighthouse** (mobile, médiane de 3 passages, `mesures/lighthouse-maquettes.json`) : accueil, P0087, voyant moteur,
  surchauffe : performance, accessibilité, bonnes pratiques et SEO à 100, CLS 0, avant comme après ; LCP de 1,05 à 1,35 s
  dans les deux cas (écart de mesure, serveur local) ; poids des pages + 0,5 à 0,9 Ko.
- **CLS hors Lighthouse** : les captures « police chargée » forcent `font-display: block`, d'où un décalage mesuré de 0,018
  à 0,029 sur P0087 avant comme après ; il vient de cette astuce de capture, pas du site, qui charge sa police en
  `optional` (0 avec la police de secours).
- **V4** (version imprimable, axe f) : voir « Axe (f) ».
- **Non maquettés** (rien de visible, ou contenu à rédiger d'abord) : P1 à P7, P11, P3b (le panneau B26 : photo à faire
  accepter ou dessin à concevoir) et la page N3.

## 7. Écarté
- **Page « Codes défaut »** : aucun mot-clé générique de code au périmètre (`docs/05`), pages « thème » en idées reportées.
- **Fusion des grades d'huile avec redirections** : trois intentions distinctes au plan, 63 200 recherches par mois ; à
  rouvrir à J+30 seulement si P1 ne trouve pas de sources.
- **Retirer les H2 sans réponse** : contraire à la règle 2j (aucune question des lecteurs retirée) ; P4 cherche la réponse.
- **ProfilePage pour « à propos »** : la page présente le site plus que la personne ; gain incertain.
- **Lien d'évitement** : trois arrêts au clavier seulement avant le contenu.
- **Libellés longs des codes** (V3 version 1) : voir P8.
- **Notoriété, écarté** : annuaires, achat ou échange de liens, articles sponsorisés, liens glissés dans les forums, les
  commentaires ou Wikipédia, relances automatiques, listes de contacts nominatifs ; plateformes de mise en relation avec
  des journalistes (risque de liens payants déguisés, gain incertain).

## 8. Revue indépendante
Une seule revue, par un agent qui n'avait pas vu le travail, en deux passages : le premier sur la version du 25/11
(commit 1661bc0), le second sur les corrections et sur le complément demandé par Houssem le même soir (Search Console du
25/11, axe f, maquette V4, demande n° 47 ; commit 113d9f4).
- **Verdicts** : « à corriger » au premier passage (un bloquant, cinq importants) ; « à corriger, corrections légères »
  au second (aucun bloquant, deux importants).
- **Reproduit par la revue** : `seo.json` et `proximite-hors-gabarit.json` identiques octet pour octet sur une
  construction fraîche ; mesures des maquettes V1 à V3 et nombre de pages imprimées de V4 retrouvés ; `npm run schemas`,
  `npm test` (926 sur 926), `npm run liens` et le contrôle de la construction verts à 1661bc0 ; aucune donnée personnelle
  non publiée ni secret.
- **Ce que la revue a changé** :
  - **Bloquant** : la justification de la paire P0087 ↔ P0299 était fausse (la page P0299 ne décrit aucun cas Peugeot
    ni Citroën) ; réécrite (même ligne du voyant moteur, perte de puissance dans les deux pages), vérifiée au second
    passage.
  - Loi montagne présentée à tort comme « la seule page qui reçoit des impressions » (C4, P3, classement) : « un tiers des
    impressions » ; le niveau d'huile (67 impressions, position 12,9) passe en tête de P6.
  - Pages à photo : 6 et non 7 ; alertes d'image : 31 et non 30 (C8, demande n° 45).
  - P6 présentée comme l'avancement d'une décision du 21/11 (titles et descriptions renvoyés à J+30), à trancher par
    Houssem.
  - Demande n° 45 : documentation de Google signalée comme non lue et la raison comme non sourcée ; image de partage
    1,9:1 face aux rapports d'aspect cités, d'où les trois versions proposées sous condition.
  - V3 : pastilles de trois lignes dites, P8 placée en dernier ; allongement de l'accueil attribué à V2.
  - V4 : « Sources » ne s'imprimait pas (liste repliée) : dépliée à l'impression, vérifié par `pdftotext` ; tuiles des
    voyants en clair ; impression mesurée avec les deux polices ; captures produites par `imprimer.cjs` (90 ppp).
  - Mineurs : C1 (trois H2 et la section ACEA diffèrent), P4 (marques du H2 de P0299), C3 (angles tirés de `docs/07` et
    `docs/05` seulement), `lastmod` (32 adresses), « règle 14 b l'impose » retiré, position du lien du pied (7 576 px),
    cible du lien de V1, marge de 640 px, médiane des liens entrants définie, provenance du relevé du 25/11, écart
    14 + 12 + 13 = 39 sur 40 signalé, C11 présenté comme hypothèse, titre de N5 (16 lignes sur 26), contact de N3,
    question des symboles normalisés dans la demande n° 47, commentaire de `maquettes.mjs`.
- **Écarté** : rien.
- **Corrigé après le second passage, non relu** : la formulation du classement, P6, C0, C11, N3, N5, la provenance du
  relevé, la demande n° 47 et la nouvelle version de V4 (sources dépliées, tuiles claires, deux polices).

## 9. Ce qui n'est pas vérifié
- Le site en ligne (inaccessible depuis la session) ; Safari iOS et un vrai téléphone.
- La cause réelle des pages non indexées (Google ne la donne pas) ; l'effet de chaque proposition sur l'indexation.
- L'existence de sources pour P1, P4 et P5 (aucune recherche faite cette nuit).
- Les pages de documentation de Google citées pour P7 (developers.google.com ne se résout pas depuis la session).
- Axe f : le rapport « Liens » de la Search Console (non relevé) ; les conditions de publication des plateformes de
  données ouvertes (N4) ; la réceptivité des types de sites cités (aucun contact pris).
