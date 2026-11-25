# Audit n° 2 UX/UI et SEO de decodauto.com : constats, propositions et maquettes (étape 12, boucle mensuelle)

Fait par Claude dans la nuit du 25 au 26/11/2026, à la demande de Houssem (25/11, 23 h 42). Sa demande, en substance :
- une revue de l'existant, pour l'améliorer visuellement et pour le référencement naturel ;
- un site à l'UI et à l'UX vraiment adaptés, qui apporte une vraie valeur aux visiteurs ;
- une liste priorisée d'améliorations qui servent à la fois le trafic et le lecteur, chacune avec sa preuve.

**Statut : version 1, à valider par Houssem.** Rien n'est appliqué au site : ce document propose, Houssem décide. Branche
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
- **Données** : relevé Search Console J+7 (`travaux/etape-12/suivi-search-console/releve-j7.md`, données au 16 et 18/11,
  inspection du 21/11 notée au journal) ; résultats Google et suggestions de `docs/07` (relevés le 22/10 depuis la
  Tunisie) ; volumes de `docs/05`.
- **Limites** :
  - le site en ligne n'est pas joignable depuis la session (le proxy refuse decodauto.com) : tout est mesuré sur la
    construction de `main`, identique au site en ligne depuis le déploiement de la PR n° 107 (non revérifié en ligne) ;
  - aucune donnée Search Console postérieure au 21/11 ; Google ne donne pas la cause d'un « Explorée, actuellement non
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
  « pression des pneus », page informative où la précision 2a s'applique) ; aucun défilement horizontal ; aucun contraste
  sous le seuil AA sur 16 mesures (8 pages × 2 tailles, tous les éléments qui portent du texte, fonds sombres compris) ;
  aucun saut de niveau de titre ; ordre du DOM égal à l'ordre à l'écran dans la colonne.
- **Questions des lecteurs** : les H2 des pages à fort volume reprennent les questions associées relevées dans `docs/07`
  (voyant moteur, voyant d'huile, AdBlue, FAP, P0420, 5W30, loi montagne : `seo.json`, champ `h2`).
- **Confiance** : mention IA en tête, signature datée, ligne de transparence et lien « Méthode », sources repliées et
  comptées, lien « Signaler une erreur » pré-rempli avec l'adresse de la page.

## 3. Constats, du plus important au moins important
**C1. Les trois pages des grades d'huile sont presque identiques (fort, trafic et lecteur).**
- Texte propre commun (hors gabarit, `proximite-hors-gabarit.json`) : 10W40 et 5W40, 83 et 85 % ; 10W40 et 5W30, 75 et
  66 % ; 5W30 et 5W40, 64 et 75 %. Aucune autre paire du site ne dépasse 52 %.
- Les sources le montrent : la 10W40 et la 5W40 ne diffèrent que par le grade, deux H2 et une phrase
  (`diff` de `src/content/fluide/huile-5w40.md` et `huile-10w40.md`) ; les sections « Que veut dire », « température »,
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
- Search Console : P0087 et P0299 « Explorée, actuellement non indexée » (21/11). Volumes : 17 380 et 15 168 par mois.
- Lecture : la proximité n'explique pas ces deux pages ; le maillage faible et les réponses manquantes sont les deux
  causes vérifiables. La médiane des liens entrants des pages non indexées (4) est à peine sous celle des autres (5) :
  le maillage seul n'est pas la cause.

**C3. « Voiture qui broute » redit « perte de puissance » (moyen).**
- 52 % du texte propre de « broute » se retrouve dans « perte de puissance » (`proximite-hors-gabarit.json`), surtout les
  lignes de l'encadré, validées et tirées des mêmes notices (Renault, Dacia, Seat, Toyota).
- Ce qui manque par rapport aux recherches (`docs/07`) : « quand j'accélère fort, ma voiture broute », « voiture qui
  broute en roulant essence », à froid, au ralenti. Ce sont les seuls angles propres à « brouter ».
- Volume : 9 164 par mois. Page indexée ou non : inconnu (absente du relevé).

**C4. « Loi montagne » : la seule page qui reçoit des impressions, sans la liste des départements (fort, saisonnier).**
- 37 des 59 impressions du site (18/11), position moyenne 74,4 ; requêtes : « chaine obligatoire », « panneau chaine
  obligatoire », « zone pneu neige obligatoire », « pneu neige obligatoire 2020 2021 » (relevé J+7).
- `docs/05` : « departement pneu neige obligatoire » et « zone pneu neige obligatoire », 3 160 chacune.
- La page renvoie à la carte et aux arrêtés de la Sécurité routière ; le tableau des départements (livrable 8.3.1b) est
  en pause depuis le 11/11 (relevé partiel sur la branche `etape-8/departements-loi-montagne`).
- L'obligation court du 1er novembre au 31 mars : chaque semaine d'attente est une semaine de saison perdue.

**C5. Meta descriptions trop longues (moyen, peu coûteux).**
- 33 pages éditoriales sur 37 dépassent 155 caractères, 28 dépassent 160 ; la plus longue en fait 193
  (« Comment changer une batterie de voiture… »). Au-delà, le texte est coupé dans les résultats.
- La description n'est ni dans l'empreinte de validation ni dans la règle 14 c (`src/lib/empreinte.ts`,
  `scripts/verifier-indexation-durable.ts` : aucune mention) : la raccourcir ne demande pas d'attendre la Search Console.

**C6. Titles et H1 : rien à changer sans données (à confirmer avec la Search Console).**
- 12 titles dépassent 60 caractères (max. 68, loi montagne) ; tous contiennent la requête principale de leur page.
- 21 H1 sur 37 ne contiennent pas la requête principale telle quelle (comparaison littérale, `seo.json`).
- Règle 14 c : pas de réécriture sans données chiffrées de la Search Console, au plus une fois par 90 jours. **À
  confirmer avec la Search Console** au relevé J+30 (≈ 17/12), page par page.

**C7. Libellés des codes peu parlants dans les liens (faible).**
- « Code P0087 », « Code P0299 », « Code P0420 » dans le menu, l'accueil, le fil d'Ariane et « À lire aussi » : le lecteur
  ne sait pas de quoi parle le code avant d'ouvrir la page, et le texte du lien ne le dit pas à Google.

**C8. Article sans image sur 30 pages sur 37 (faible à moyen).**
- 30 alertes R7-IMAGE-RECOMMANDEE à chaque construction ; seules les 7 pages à photo (demande n° 42) portent `image`.
- Chaque page a déjà une image de partage de 1 200 × 630 px tirée de son illustration (lot U3), non utilisée par le
  balisage (demande n° 42 : « ni dessin ni image de partage »).
- Aucune directive `max-image-preview:large` (aucune meta robots en mode indexable).

**C9. « Signaler une erreur » n'est qu'en bas de page (moyen pour la confiance).**
- Au téléphone, 11 écrans sous la décision sur P0087, 17,3 sur le voyant moteur, 15,2 sur la surchauffe (`ux.json`,
  haut de « À lire aussi », le lien est plus bas encore).
- Sans relecteur mécanicien (page « à propos »), le signalement du lecteur est le premier filet de correction.

**C10. Cibles tactiles du fil d'Ariane et du pied de page (faible).**
- Fil d'Ariane : 45 × 16 px (« Accueil »), 118 × 16 px ; pied de page : 17 px de haut (`ux.json`, `ciblesSous24`).
- Le seuil AA (WCAG 2.5.8) est tenu par l'espacement, d'où Lighthouse à 100 ; on reste loin des 44 px conseillés
  (2.5.5, AAA), sur le lien le plus touché en haut de page.

**Constats mineurs, sans proposition**
- 18 textes alternatifs d'illustrations dépassent 125 caractères (jusqu'à 267, grades d'huile) : longs pour un lecteur
  d'écran, mais ils décrivent des schémas et ont été validés ; à revoir avec chaque page reprise.
- « Revu le » antérieur à « Mis à jour le » sur les pages modifiées le 21/11 (demande n° 39) : exact, mais peut surprendre ;
  rien à changer, la règle 14 b l'impose.
- `lastmod` du 21/11 sur 30 pages : la demande n° 39 a réellement modifié leur contenu ; conforme.
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
| Code P0087 ↔ Code P0299 | deux codes du même voyant moteur, tous deux liés à « perte de puissance », avec des cas Peugeot et Citroën HDi décrits par marque |
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
- **Pourquoi maintenant** : seule page qui reçoit des impressions (C4), requêtes « zone » et « département » au périmètre
  (3 160 chacune), saison en cours.
- **Effort et risque** : élevé ; relevé partiel déjà fait (5 départements lus, 45 lus par un agent sans aucun « sûr ») ;
  sites des préfectures instables. Lot découpable : d'abord les départements lus avec leur arrêté, la phrase « liste en
  cours » pour les autres, jamais une ligne non vérifiée.
- **Règles** : décision de Houssem (8.3.1b reporté par la porte 8) ; tableau = élément de la page pneus déjà prévu
  (`{{tableau}}`) ; sources au registre ; validation de Houssem.

### P4. Codes P0087 et P0299 : répondre aux sections vides. Recommandée
- **Changement** : chercher des documents de première main ou admis (bulletins techniques, fiches d'équipementier) pour
  les moteurs et marques que les H2 nomment déjà (1.4 et 1.6 HDi, Mercedes pour P0087 ; Ford, Opel, Mercedes pour P0299),
  et remplacer « aucun document lu » par ce qu'ils disent. Sans document : garder la phrase honnête, plus courte.
- **Avec** : la paire P0087 ↔ P0299 (P2).
- **Règles** : texte et registre ; encadré inchangé (la ligne du voyant moteur vient de la base).

### P5. « Voiture qui broute » : ses angles propres
- **Changement** : sections sourcées sur ce que seule cette page traite : à-coups à l'accélération, à froid, au ralenti,
  « en roulant » (essence), d'après les notices déjà au registre (Toyota p. 291, Seat p. 289, Renault p. 188, Dacia
  p. 162) et toute notice qui distingue ces cas ; sans réponse sourcée, pas de section.
- **Mesure** : texte propre commun avec « perte de puissance » sous 30 %.

### P6. Meta descriptions de 155 caractères au plus. Recommandée, avec P2
- **Changement** : réécrire les 33 descriptions de plus de 155 caractères : la décision et ce qui distingue la page, en
  premier ; la description reste le reflet de l'encadré (jamais un verdict absent de l'encadré).
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
  « À lire aussi » du voyant moteur 345 → 414 px au téléphone ; accueil 3 006 → 3 082 px (375 px) ; menu inchangé
  (496 px).

### P9. « Signaler une erreur » juste après la décision : demande de changement n° 46 (brouillon, maquette V1)
- La ligne de transparence finit par « Méthode · Signaler une erreur », même lien pré-rempli que le pied de page, sur les 37
  pages éditoriales ; le lien du pied reste.
- **Mesures** : la ligne garde sa hauteur sur les trois pages mesurées (bas de la ligne 1 070 px sur P0087 au téléphone,
  avant comme après) ; premier écran et illustration inchangés.

### P10. Cibles de 44 px : fil d'Ariane et pied de page (maquette V2)
- Fil d'Ariane : zone tactile agrandie par marges négatives, mise en page inchangée : 45 × 16 → 55 × 47 px.
- Pied de page : liens de 44 px de haut : 61 × 17 → 74 × 44 px ; la page s'allonge de 75 px au téléphone et de 30 px sur
  ordinateur (P0087, police de secours).
- **Règles** : variante de composant de la charte (`charte-b.css`, `docs/11` §4, rangées « Tête de page » et « Pied de
  page »), validée par Houssem avec le lot, sans demande de changement.

### P11. Titles et H1 : à confirmer avec la Search Console
- Rien n'est proposé avant le relevé J+30 (≈ 17/12). Ce jour-là : pour chaque page qui a des impressions, comparer les
  requêtes réelles au title et au H1 ; ne proposer un changement qu'avec ces chiffres, une ligne dans
  `config/changements-de-titre.json`, au plus une fois par 90 jours (règle 14 c). Pistes à confirmer : titles de plus de
  60 caractères (C6), H1 sans la requête principale.

## 5. Découpage en lots, dans l'ordre proposé
1. **Lot A0, rapide** (P2, P6, P8, P10) : paires du plan, descriptions, libellés des codes, cibles tactiles. Sans demande
   de changement ; captures, revue, validation de Houssem, recette de l'étape 9.
2. **Lot A1** (P7, P9) : demandes n° 45 et n° 46, puis leur code et leurs contrôles.
3. **Lot A3, loi montagne** (P3) : dès la décision de Houssem, pendant la saison ; peut avancer en parallèle de A0 (pages
   différentes), une branche par lot.
4. **Lot A2, grades d'huile** (P1) : relevé des notices d'abord, puis rédaction et validation.
5. **Lot A4, codes et « broute »** (P4, P5) : même chemin que A2.
6. **Après J+30** : P11, et le bilan de chaque lot dans la Search Console (pages indexées, impressions).

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
- **Non maquettés** (rien de visible ou contenu à rédiger) : P1 à P7 et P11.

## 7. Écarté
- **Page « Codes défaut »** : aucun mot-clé générique de code au périmètre (`docs/05`), pages « thème » en idées reportées.
- **Fusion des grades d'huile avec redirections** : trois intentions distinctes au plan, 63 200 recherches par mois ; à
  rouvrir à J+30 seulement si P1 ne trouve pas de sources.
- **Retirer les H2 sans réponse** : contraire à la règle 2j (aucune question des lecteurs retirée) ; P4 cherche la réponse.
- **ProfilePage pour « à propos »** : la page présente le site plus que la personne ; gain incertain.
- **Lien d'évitement** : trois arrêts au clavier seulement avant le contenu.
- **Libellés longs des codes** (V3 version 1) : voir P8.
- **Image du panneau B26 sur « loi montagne »** : requêtes réelles (« panneau chaine obligatoire »), mais un second visuel
  demande sa conception (règle 15) et l'accord de Houssem pour une photo : à proposer avec le lot A3.

## 8. Revue indépendante
À compléter après la revue (une seule revue, par un agent qui n'a pas vu le travail).

## 9. Ce qui n'est pas vérifié
- Le site en ligne (inaccessible depuis la session) ; Safari iOS et un vrai téléphone.
- La cause réelle des pages non indexées (Google ne la donne pas) ; l'effet de chaque proposition sur l'indexation.
- L'existence de sources pour P1, P4 et P5 (aucune recherche faite cette nuit).
- Les pages de documentation de Google citées pour P7.
