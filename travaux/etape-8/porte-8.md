# Porte de sortie de l'étape 8 (vague A) : dossier de vérification

**État : dossier du 15/11/2026 (soir), complété après la fusion des PR #49, #50 et #53** (CI de GitHub, dépôt public
depuis le 15/11, 17 h 29, gardé public par décision de Houssem du 15/11 à 19 h 54 : demande n° 29), relu par deux revues
indépendantes (encadré en fin de dossier), **à valider par Houssem** avec la demande de changement n° 28. La demande
n° 29 a sa propre ligne de validation et ne conditionne pas la porte. Rien ici n'est « validé » au sens de la porte tant
que Houssem ne l'a pas écrit.

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
fait le 12/11 (`travaux/etape-9/porte-9-lot-1.md`). Bing Webmaster Tools (15/11, 19 h 19) : les 16 adresses des lots 2 à
5d soumises (« 16 URLs submitted successfully », quota de 100 par jour) ; la rubrique IndexNow ne montre aucune
notification reçue depuis le 13/11 (Crawler Hints de Cloudflare) : soumettre les adresses de chaque lot à la main.

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
- **Dépôt public** (écart à `docs/03`, règle 3) : gardé public par décision de Houssem (15/11, 19 h 54), après
  l'inventaire des données personnelles exposées (retirées de l'arbre par la PR #57, l'historique les garde) ;
  régularisé par la demande n° 29, version 2 (conditions, protection de `main`, mesures), à accepter à part.
- **Après la porte** : tag de l'étape 8 posé par Houssem (`etape-8-vague-a`, sur le commit de fusion de cette pull
  request) ; `docs/03` (ligne 8, règles 2 et 12 et « Déroulé de chaque session », point 2 : demande n° 28 ; règle 3 :
  demande n° 29), `CLAUDE.md`, journal ; textes à coller par Houssem dans les instructions du projet : demande n° 21
  (`demande-changement-21.md`), puis n° 28 (`demande-changement-28.md`, fin du document), puis n° 29 ; enfin la pull
  request qui ajoute « B » à `config/vagues-ouvertes.json`, validée par Houssem (demande n° 21) : début de l'étape 10.

## 4. Lignes de validation proposées
1. Porte et demande n° 28 : « Je valide la porte de l'étape 8 sur les 20 pages en ligne, en acceptant que l'outil
   voyants n'ait pas été essayé dans Firefox ni avec un lecteur d'écran ; j'accepte la demande n° 28 (l'étape 8 se
   ferme sans le lot 4b, P0380 et P1351, qui reste ouvert : cinquième exception à la règle 12) ; 8.3.1b (tableau des
   départements de la loi montagne) passe en idée reportée, à reprendre avant le 01/11/2027. »
2. Demande n° 29, à part (fin de `demande-changement-29.md`) : « J'accepte la demande n° 29 : dépôt public avec les
   conditions du §2 ; protection de `main` (§3) : oui / non ; mesures du §4 : oui / non. »

## Revue indépendante
Deux revues (agents sans contexte de la rédaction, 15/11 au soir), le maximum par livrable.

**Première revue** : « à corriger », rien de bloquant ; chiffres, numéros de passage, commits, 20 pages sur 22,
17 empreintes, Lighthouse, outil voyants et volumes recoupés et exacts.
- **Changé** : la ligne de validation tranche 8.3.1b et fait accepter explicitement Firefox et le lecteur d'écran
  (critère marqué « partiellement vérifié ») ; dépôt public signalé comme écart et régularisé par la demande n° 29 ;
  incident du lot 5d raconté tel qu'il s'est passé (contrôle local, pas la CI) ; heure de l'inspection d'URL corrigée ;
  21 alertes dites ; accueil couvert par la liste de production ; tag, « Déroulé » et textes à coller ajoutés à
  l'après-porte ; note périmée de `CONTROLES.md` (page outil) corrigée ; archives 04j à 04m désormais sur `main` (PR #52
  fusionnée).
- **Vérifié après la revue** : les adresses sans paramètre servent bien la version du 15/11 (Chrome de Houssem, 15/11
  vers 19 h 15 : pages AdBlue et outil « Mis à jour le 15/11 », nouvel encadré AdBlue, liens vers la page voyant
  frein) ; l'ancienne version vue par le relecteur venait du cache de son outil.

**Seconde revue** (commit feedc6d et demande n° 29) : « à corriger », **un point bloquant** : la demande n° 29 affirmait
une vérification fausse, des données personnelles jamais publiées étaient lisibles par tous ; 6 points importants,
5 mineurs.
- **Changé** : inventaire complet (arbres, historique, messages de commit, pull requests), options présentées à
  Houssem, qui a décidé de garder le dépôt public (15/11, 19 h 54) ; données retirées de l'arbre (PR #57), mentions
  écrites par Claude retirées du journal et de la description de la PR #52 ; demande n° 29 réécrite (version 2) :
  protection de `main` aux réglages exacts (contournement interdit, noms exacts des contrôles, branche à jour avant
  fusion) et ses limites ; condition « aucun exécuteur auto-hébergé enregistré » au lieu de `CI_RUNNER` ; risques
  décrits (notices, textes de Google, mots-clés et plan, brouillons, doutes juridiques), plus un risque ajouté par
  Claude pour le référencement (pages de GitHub non exclues par son `robots.txt`) ; contrôles proposés (analyse des
  secrets, COMMITS-COURRIEL, EXECUTEUR-HEBERGE) ; éléments concernés complétés ; deux lignes de validation séparées ;
  « donnée personnelle non publiée » ; pages mises en ligne par #49, #50 et #53 précisées.
- **Écarté** : réécrire l'historique (contraire à `CLAUDE.md`, change tous les commits, ne retire pas les copies) ;
  deux dépôts, l'un public, l'autre privé (source de vérité coupée en deux) ; l'essai dans Firefox et au lecteur
  d'écran reste au choix de Houssem (deux minutes) : la ligne de validation l'accepte comme écart (accessibilité
  Lighthouse 100, liste entière lisible sans `:has()`).
- **Vérifié par la seconde revue** : 21 alertes ; arbre testé égal à l'arbre fusionné pour #49, #50 et #53 ; chronologie
  de l'incident du lot 5d ; accueil dans la liste Lighthouse de production ; CI verte sur b58cb2b ; affirmations sur
  GitHub de la demande n° 29 (protection gratuite pour un dépôt public, exécuteur auto-hébergé déconseillé, copies
  gardées après un retour en privé).

**Non vérifié** : faits des pages contre leurs sources (revus par lot) ; recette dans Firefox et au lecteur d'écran ;
commit b58cb2b (soumission à Bing) relu par aucune revue ; exécuteurs et variables du dépôt (l'API les refuse à la
session ; l'exécuteur de la demande n° 27 n'a jamais été installé).
