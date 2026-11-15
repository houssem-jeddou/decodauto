# Porte de sortie de l'étape 8 (vague A) : dossier de vérification (brouillon)

**État : brouillon du 15/11/2026 (nuit), à compléter après la fusion des PR #49, #50 et #53** (CI sur l'exécuteur, demande
n° 27), puis revue indépendante et validation de Houssem. Rien ici n'est encore « validé » au sens de la porte.

Porte (docs/03, ligne 8, v12, demande n° 17) : vérifiée par lot de mise en ligne ; l'étape se ferme quand tous les lots
ont passé la porte de lot et que la porte complète est vérifiée sur l'ensemble. **Demande n° 28 (proposée)** : fermer
l'étape sans le lot 4b (codes P0380 et P1351), faute de source admise ; sans son accord, l'étape reste ouverte.

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
| 4a | codes P0420 et P0299 (+ demande n° 25, page AdBlue revalidée) | 14/11, 22 h 45 | oui (archive 04l) | **à faire** : PR #49 et #50 |
| 5d | voyant frein | 15/11, vers 0 h 05 | oui (journal, 14/11 nuit) | **à faire** : PR #53 |
| 4b | codes P0380 et P1351 | – | – | reporté (demande n° 28, relevé `textes/codes-p0380-p1351-releve.md`) |

Total : 20 pages (22 de la vague A moins le lot 4b). Avant la fusion de chaque lot en attente : liste de recette de
l'étape 9 repassée sur ses pages (CLAUDE.md, « chaque fusion sur main publie »).

## 2. Critères de la porte complète

| Critère (docs/03, ligne 8) | Preuve attendue | État au 15/11 (nuit) |
|---|---|---|
| Faits vérifiés sur sources, verdicts validés ; faits de sécurité et chiffres dans le paquet validé par Houssem | paquets des lots (tableau ci-dessus), lignes de validation au journal | fait pour les lots 1 à 5d ; à recompter sur les 20 pages après les fusions |
| Encadrés de décision relus par Houssem | empreinte `validation:` de chaque page, contrôlée par la CI (R4-VALIDATION-*) | contrôle vert sur `main` le 14/11 (passage 43632587483) pour 17 pages ; à revoir avec les PR #49, #50, #53 |
| Lighthouse mobile ≥ 95 et CLS < 0,1 sur une page de chaque modèle (emplacements factices) | job « Recette des exemples » : `lighthouserc-exemples.json` (outil, voyant moteur, code P0087, loi montagne, mentions légales, « à propos » ; performance ≥ 0,95, CLS ≤ 0,1) | vert sur `main` le 14/11 (passage 43632587483) ; à relever sur le dernier passage de `main` |
| Outil voyants généré depuis la base : chaque ligne affichée, avec la page du voyant quand elle est construite ; gravité écrite ; lien « Signaler une erreur » ; filtre par couleur ; contenu présent sans JavaScript | contrôles OUTIL-* (CONTROLES.md) dans la CI de `main` | verts le 14/11 ; les liens vers les pages AdBlue, P0420, P0299 et voyant frein se vérifient après leurs fusions |
| Fonctionnement du filtre et rendu à l'écran vérifiés à la recette | recette du lot 3b (journal, décision ouverte « Outil voyants en ligne ») | iPhone (Safari) par Houssem, Chrome par Claude ; Firefox et lecteur d'écran non essayés, acceptés avec le go du 14/11 |
| Encadré de la page outil validé par Houssem avec le paquet (demande n° 11) | paquet 8.1 et lot 3b | fait (04/11 et 14/11) |
| Contrôles au vert | CI de `main` après la dernière fusion (contrôles, recette, Lighthouse, origine-main, déploiement, production) | **à relever** après les fusions |

## 3. Reste à faire pour présenter la porte
1. Fusionner #54 (exécuteur), puis #49, #50, #53 (go donné), CI verte sur `main` à chaque fois, vérification en ligne.
2. Relever pour chaque critère la preuve du dernier passage de `main` (numéro du passage, jobs, extraits du journal).
3. Revue indépendante du dossier (relecteur sans contexte, critère par critère).
4. Présenter à Houssem avec la demande n° 28 ; après son accord et sa validation de la porte : `docs/03`, journal,
   `config/vagues-ouvertes.json` (« A », « B ») dans la pull request qui ouvre la vague B.
