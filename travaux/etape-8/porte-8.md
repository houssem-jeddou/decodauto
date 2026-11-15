# Porte de sortie de l'étape 8 (vague A) : dossier de vérification

**État : dossier du 15/11/2026 (soir), complété après la fusion des PR #49, #50 et #53** (CI de GitHub, dépôt public
depuis le 15/11, 17 h 29 : écart à régulariser, demande n° 29), relu par une revue indépendante (encadré en fin de
dossier), **à valider par Houssem** avec les demandes de changement n° 28 et n° 29. Rien ici n'est « validé » au sens de
la porte tant que Houssem ne l'a pas écrit.

Porte (docs/03, ligne 8, v12, demande n° 17) : vérifiée par lot de mise en ligne ; l'étape se ferme quand tous les lots
ont passé la porte de lot et que la porte complète est vérifiée sur l'ensemble. **Demande n° 28 (proposée,
`demande-changement-28.md`)** : fermer l'étape sans le lot 4b (codes P0380 et P1351), faute de source admise ; sans son
accord, l'étape reste ouverte.

## 1. Les lots et leur porte de lot (paquet, revue indépendante du diff complet, validation de Houssem par page)

| Lot | Pages | Validation de Houssem | Revue indépendante | Mise en ligne |
|---|---|---|---|---|
| 1 (premier lot) | accueil, « à propos », mentions légales, loi montagne | 12/11, 8 h 23 (`travaux/etape-9/paquet-lot-1.md`) | oui (archive 04g) | 12/11, PR #35 (f69543a) ; porte 9 du lot validée le 14/11 (`travaux/etape-9/porte-9-lot-1.md`) |
| 2 | voyant moteur, voyant huile, code P0087 | 14/11, 12 h 13 (`paquet-lot-2.md`) | oui (archive 04i) | 14/11, PR #39 (59bdab0) |
| 3 | voyant FAP, voyant de pression des pneus, pression des pneus (+ demande n° 22) | 14/11, 13 h 08 (`paquet-lot-3.md`) | oui (archive 04i) | 14/11, PR #41 (0dcf25f) |
| 3b | outil voyants (+ demande n° 23) | 14/11, 15 h 27 (`paquet-lot-3b.md`) | oui (archive 04i) | 14/11, PR #43 (ff09961) |
| 5a | voyant airbag, voyants ABS et ESP | 14/11, 18 h 23 (`paquet-lot-5a.md`) | oui (archive 04j) | 14/11, PR #45 (62a029b) |
| 5b | voyant batterie, voyant de direction assistée | 14/11, 18 h 23 (`paquet-lot-5b.md`) | oui (archive 04j) | 14/11, PR #46 (5023eae) |
| 5c | voyant AdBlue, voyant de préchauffage (+ demande n° 24) | 14/11, 19 h 53 (`paquet-lot-5c.md`) | oui (archive 04j) | 14/11, PR #47 (4a29b3a) |
| 4a | codes P0420 et P0299 (+ demande n° 25 : lignes AdBlue de la base, page AdBlue revalidée) | 14/11, 22 h 45 (`paquet-lot-4a.md`, `paquet-demande-25.md`) | oui (archive 04l, `main` depuis la PR #52) | 15/11, PR #49 (402c6fa, passage 43738123757) et PR #50 (1850cec, passage 43739222087) |
| 5d | voyant frein | 15/11, vers 0 h 05 (`paquet-lot-5d.md`) | oui (archive 04m, `main` depuis la PR #52) | 15/11, PR #53 (b960529, passage 43740400962) |
| 4b | codes P0380 et P1351 | – | – | reporté (demande n° 28, relevé `textes/codes-p0380-p1351-releve.md`) |

**20 pages en ligne** sur les 22 de la vague A (plan du site) : accueil, 2 pages du socle (« à propos », mentions
légales), 17 pages éditoriales (12 voyants dont l'outil, 3 codes, pression des pneus, loi montagne). Les 17 pages
éditoriales portent chacune leur empreinte `validation:` (fichiers de `src/content`, relevé du 15/11 sur b960529).
Manquent les deux pages du lot 4b.

Étape 9 après les déploiements (inspection d'URL de Search Console, 15/11 vers 18 h 50, dans le Chrome de Houssem) :
5 pages déjà « sur Google » (outil voyants, airbag, ABS et ESP, batterie, direction) ; indexation demandée pour les 11
autres pages éditoriales des lots 2 à 5d (voyant frein, voyant moteur, voyant huile, voyant FAP, voyant de pression des
pneus, pression des pneus, P0087, AdBlue, préchauffage, P0420, P0299), toutes acceptées (« Indexation demandée »). Lot 1 :
fait le 12/11 (`travaux/etape-9/porte-9-lot-1.md`).

Fusion des lots 4a et 5d (15/11) : chaque pull request avait la CI verte sur sa tête exacte (contrôles, recette,
Lighthouse) ; pour #49, #50 et #53, l'arbre fusionné était identique à l'arbre testé (`git merge-tree`). Incident évité :
une première mise à jour de la branche du lot 5d (2878427), faite avec une copie locale périmée de la branche du lot 4a,
ne contenait pas la demande n° 25. Le contrôle d'indexation durable lancé en local contre `main` l'a signalé
(DATE-RECULEE sur les pages AdBlue et outil), mais la branche était déjà envoyée (code de sortie masqué par un tube) ; la
CI, qui teste la fusion avec `main`, ne pouvait pas le voir. Une seconde mise à jour (29de033) l'a corrigée avant toute
fusion, sans réécriture d'historique ; la méthode exige désormais de lire le code de sortie et de récupérer une branche
par son nom complet.

## 2. Critères de la porte complète

| Critère (docs/03, ligne 8) | Preuve | État au 15/11 (soir) |
|---|---|---|
| Faits vérifiés sur sources, verdicts validés ; faits de sécurité et chiffres dans le paquet validé par Houssem | un paquet par lot (tableau ci-dessus) avec ses lignes de validation (journal et archives 04g à 04m) ; registre des sources `data/sources.json` (contrôles R3-*) | vérifié sur les 20 pages |
| Encadrés de décision relus par Houssem | empreinte `validation:` des 17 pages éditoriales, comparée à chaque construction (R4-EMPREINTE, R4-VALIDATION-ABSENTE) ; job « Contrôles » vert sur `main` (passage 43740400962) | vérifié : 17 empreintes sur 17 |
| Lighthouse mobile ≥ 95 et CLS < 0,1 sur une page de chaque modèle (emplacements factices) | job « Recette des exemples » (construction avec emplacements factices, `lighthouserc-exemples.json`) : voyant moteur, outil voyants, code P0087, loi montagne, mentions légales, « à propos » ; le modèle de l'accueil n'a pas d'emplacement (`src/lib/emplacements-pub.ts`) et il est mesuré dans la liste de production (ligne suivante) | **vérifié** (passage 43740400962, b960529) : les 6 pages, médiane de 3 passages, performance 100, accessibilité 100, bonnes pratiques 100, SEO 100, CLS 0,000 |
| (en plus) Lighthouse mobile sur toutes les pages en ligne | job « Lighthouse mobile » (liste de `lighthouserc.json`, 20 adresses, médiane de 3 passages) | **vérifié** (même passage) : 20 adresses sur 20 à 100 dans les quatre catégories, CLS 0,000, LCP de 904 à 1 054 ms (page outil) |
| Outil voyants généré depuis la base : chaque ligne affichée, avec la page du voyant quand elle est construite ; gravité écrite ; lien « Signaler une erreur » ; filtre par couleur ; contenu présent sans JavaScript | contrôles OUTIL-* et SIGNALER-* (CONTROLES.md) dans le job « Contrôles » de `main` ; page en ligne relue après le dernier déploiement | **vérifié** : contrôles OUTIL-* et SIGNALER-ERREUR-ABSENT verts (job « Contrôles », passage 43740400962) ; base de 26 lignes (16 orange, 10 rouges, `data/voyants.json`), chacune affichée une fois (OUTIL-LIGNES) ; en ligne le 15/11 : page outil « Mis à jour le 15/11/2026 », lignes du voyant de freinage et du frein de stationnement reliées à la page voyant frein, publiée le jour même |
| Fonctionnement du filtre et rendu à l'écran vérifiés à la recette | recette du lot 3b (journal, décision ouverte « Outil voyants en ligne ») | **partiellement vérifié** : iPhone (Safari) par Houssem, Chrome par Claude ; Firefox et lecteur d'écran non essayés (paquet du lot 3b : « ouverts »). À accepter explicitement par Houssem (ligne de validation) : filtre fait en CSS, liste entière visible sans `:has()`, accessibilité Lighthouse 100 sur la page outil |
| Encadré de la page outil validé par Houssem avec le paquet (demande n° 11) | paquet 8.1 et lot 3b | fait (04/11 et 14/11) |
| Contrôles au vert | dernier passage de `main` (b960529, passage 43740400962) : contrôles, recette, Lighthouse, origine des commits, déploiement, production en ligne ; 21 alertes non bloquantes : 17 « pas d'image » (point ouvert : images), 3 R3-NIVEAU-A-VERIFIER (préchauffage Seat, airbag passager désactivé Renault et Dacia : déjà au paquet de l'étape 5 validé), 1 page rattachée non écrite (surchauffe, vague B) | **vérifié** : passage 43740400962 sur b960529, les sept jobs verts (contrôles, recette, Lighthouse, origine des commits, secrets, déploiement, production : « Production : tout est conforme. », mode INDEXABLE) ; pages AdBlue, P0420, P0299 et voyant frein relues en ligne le 15/11 (date, encadré) |

## 3. Ce qui reste ouvert après la porte (si Houssem l'accepte avec la demande n° 28)
- **Lot 4b** (P0380, P1351 : 33 180 recherches par mois au plus) : cinquième exception à la règle 12 ; conditions de
  reprise et point de revue à la porte 11 (demande n° 28).
- **8.3.1b, tableau des départements de la loi montagne** (en pause) : hors de la porte (la page loi montagne est en
  ligne sans lui) ; son sort se décide ici : **recommandation : le reporter** (idée reportée « liste des départements
  avec leur arrêté, ou outil “ma commune est-elle concernée ?” »), à reprendre avant le 01/11/2027, quand les sites des
  préfectures répondent (journal, points ouverts).
- **Dépôt public** (écart à `docs/03`, règle 3) : régularisé par la demande n° 29 (conditions : aucun secret ni donnée
  non publiée, pas de `CI_RUNNER` tant qu'il est public ; protection de `main`, désormais gratuite, recommandée ;
  revu avant AdSense).
- **Après la porte** : tag de l'étape 8 posé par Houssem (`etape-8-vague-a`, sur le commit de fusion de cette pull
  request) ; `docs/03` (ligne 8, règles 2 et 12 et « Déroulé de chaque session », point 2 : demande n° 28 ; règle 3 :
  demande n° 29), `CLAUDE.md`, journal ; textes à coller par Houssem dans les instructions du projet : demande n° 21
  (`demande-changement-21.md`), puis n° 28 (`demande-changement-28.md`, fin du document), puis n° 29 ; enfin la pull
  request qui ajoute « B » à `config/vagues-ouvertes.json`, validée par Houssem (demande n° 21) : début de l'étape 10.

## 4. Ligne de validation proposée
« Je valide la porte de l'étape 8 sur les 20 pages en ligne, en acceptant que l'outil voyants n'ait pas été essayé dans
Firefox ni avec un lecteur d'écran ; j'accepte la demande n° 28 (l'étape 8 se ferme sans le lot 4b, P0380 et P1351,
qui reste ouvert : cinquième exception à la règle 12) et la demande n° 29 (dépôt public ; protection de `main` : oui /
non) ; 8.3.1b (tableau des départements de la loi montagne) passe en idée reportée, à reprendre avant le 01/11/2027. »

## Revue indépendante
Une revue (agent sans contexte de la rédaction, 15/11 au soir) : « à corriger », rien de bloquant ; chiffres, numéros
de passage, commits, 20 pages sur 22, 17 empreintes, Lighthouse, outil voyants et volumes recoupés et exacts.
- **Changé** : la ligne de validation tranche 8.3.1b et fait accepter explicitement Firefox et le lecteur d'écran
  (critère marqué « partiellement vérifié ») ; dépôt public signalé comme écart et régularisé par la demande n° 29
  (sans `CI_RUNNER` tant qu'il est public) ; incident du lot 5d raconté tel qu'il s'est passé (contrôle local, pas la
  CI) ; heure de l'inspection d'URL corrigée ; 21 alertes dites ; accueil couvert par la liste de production ; tag,
  « Déroulé » et textes à coller ajoutés à l'après-porte ; note périmée de `CONTROLES.md` (page outil) corrigée ;
  archives 04j à 04m désormais sur `main` (PR #52 fusionnée).
- **Vérifié après la revue** : les adresses sans paramètre servent bien la version du 15/11 (Chrome de Houssem, 15/11
  vers 19 h 15 : pages AdBlue et outil « Mis à jour le 15/11 », nouvel encadré AdBlue, liens vers la page voyant
  frein) ; l'ancienne version vue par le relecteur venait du cache de son outil.
- **Non vérifié** : faits des pages contre leurs sources (revues par lot) ; recette dans Firefox et au lecteur d'écran.
