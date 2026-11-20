# Lot U0 : « À lire aussi », liens du plan pour les pages peu liées et tuile ronde — brouillon, jamais validé

Préparé par Claude dans la nuit du 20 au 21/11/2026, étape 12, PR #99 (brouillon). Proposition P0 de l'audit UX/UI
(PR #96, `travaux/etape-12/audit-ux-ui/audit.md`), séparée de P1 (menu), qui attend la demande de changement n° 40 :
ce lot peut ainsi être validé seul. **À la décision de Houssem** : rien n'est fusionné avant sa validation.

## 1. Règle suivie
« Ajouter une paire de liens au plan se propose dans la pull request du lot de pages concerné, avec une ligne de
justification, et Houssem la valide avec le lot » (décision du 23/10/2026, CLAUDE.md). Pas de demande de changement :
aucun lien n'est retiré, rien d'autre ne change dans le plan.

La tuile ronde (§5) corrige un écart à la charte graphique (« tuile ronde »), déjà présent en ligne : une ligne de
style, à valider avec ses captures.

## 2. Les dix paires
Chaque paire est déclarée une seule fois dans `data/plan-du-site.json` (contrôle R7-LIEN-DOUBLE) ; le lien retour est
calculé. L'ordre des pastilles suit l'ordre de déclaration dans le plan (`src/lib/plan.ts`, `indexerPlan`) : le côté de
déclaration a été choisi pour que la nouvelle pastille arrive en dernier là où elle est la moins centrale.

| Paire (côté de déclaration en premier) | Justification |
|---|---|
| Changer la batterie ↔ Recharger la batterie | pages sœurs : le lecteur hésite entre les deux, et aucune ne lie l'autre |
| Huile 10W40 ↔ Huile 5W30 | la page 10W40 cite la 5W-30 (notice Toyota Yaris) |
| Huile 10W40 ↔ Huile 5W40 | la page 10W40 a une section « 10W40 ou 5W40 » ; elle n'a aujourd'hui aucun lien |
| Voyant de direction ↔ Contre-visite | les deux pages ont une section sur la direction assistée au contrôle technique |
| Changer la batterie ↔ Voyant de direction | les deux pages parlent du témoin de direction après une intervention sur la batterie (tableau Seat de la page batterie, cause « batterie débranchée puis rebranchée » de la page du voyant) |
| Recharger la batterie ↔ Voyant de direction | la page du voyant cite parmi les causes la batterie dépannée et la charge insuffisante ; justifiée de ce côté seulement, d'où la pastille en dernier sur la page batterie |
| Liquide de refroidissement ↔ Liquide de frein | même geste : lire un niveau sous le capot, entre MIN et MAX |
| Liquide de refroidissement ↔ Niveau d'huile | même geste |
| Liquide de frein ↔ Niveau d'huile | même geste |
| Voiture qui ne démarre pas ↔ Voyant AdBlue | la page AdBlue traite le démarrage impossible (réservoir vide), cause que la page panne ne couvre pas ; pastille en dernier sur la page panne |

Laissée à un lien : la page du voyant airbag. Son texte ne cite aucune autre page du plan que la contre-visite, déjà
liée ; son fil d'Ariane mène à l'outil, sa page mère.

## 3. « À lire aussi », page par page
Ordre calculé depuis le plan (`indexerPlan`) et confirmé sur la construction de la CI (§6).

| Page | Aujourd'hui | Proposé |
|---|---|---|
| Huile 10W40 | (aucun bloc) | Huile 5W30 · Huile 5W40 |
| Huile 5W30 | Huile 5W40 | Huile 5W40 · Huile 10W40 |
| Huile 5W40 | Huile 5W30 | Huile 5W30 · Huile 10W40 |
| Niveau d'huile | Voyant huile moteur · Bruit moteur · Moteur PureTech | … · Liquide de refroidissement · Liquide de frein |
| Liquide de frein | Voyant de frein | Voyant de frein · Liquide de refroidissement · Niveau d'huile |
| Liquide de refroidissement | Moteur qui surchauffe | Moteur qui surchauffe · Liquide de frein · Niveau d'huile |
| Voyant de direction | Voyant batterie | Voyant batterie · Contre-visite · Changer la batterie · Recharger la batterie |
| Contre-visite | Voyant moteur · Voyant airbag · Voyants ABS et ESP · Usure des pneus | Voyant moteur · Voyant airbag · Voyants ABS et ESP · **Voyant de direction assistée** · Usure des pneus |
| Changer la batterie | Voiture qui ne démarre pas | Voiture qui ne démarre pas · Recharger la batterie · Voyant de direction assistée |
| Recharger la batterie | Voiture qui ne démarre pas | Voiture qui ne démarre pas · Changer la batterie · Voyant de direction assistée |
| Voiture qui ne démarre pas | Voyant batterie · Voyant de préchauffage · Batterie de voiture · Recharger · Changer la batterie | … · Voyant AdBlue |
| Voyant AdBlue | Voyant moteur | Voyant moteur · Voiture qui ne démarre pas |

## 4. Ce qui ne change pas
Textes, encadrés, verdicts, empreintes de validation, titles, H1, adresses, dates « Mis à jour le » et `lastmod` du plan
du site.

Sur les dates : la règle 14 b du site fait bouger « Mis à jour le » pour une vraie modification du texte, d'un conseil
ou d'une source, et `lastmod` suit cette date (SITEMAP-LASTMOD). Google, lui, compte un changement de liens comme une
mise à jour qui mérite un nouveau `lastmod` (blog Search Central, juin 2023 : « updated some links, do update the
lastmod value »). Changer la date visible pour un bloc de navigation tromperait le lecteur : dates gardées. Google
verra les nouveaux liens au passage suivant de son robot. Dissocier `lastmod` de la date visible demanderait une
demande de changement (règle 7.5a) : proposée en idée reportée (§9).

## 5. Tuile ronde des pastilles
- **Constat de la revue** : sur une pastille dont le libellé passe sur deux ou trois lignes, la tuile se rétrécit en
  ellipse (24,8 × 35,2 px au lieu de 35,2 × 35,2), parce que `.liees .tuile` n'a pas `flex:none` (`charte-b.css`), à
  la différence de `.ligne-tete .tuile`. Déjà 18 tuiles déformées sur 17 pages en ligne ; ce lot en aurait ajouté deux.
- **Correction** : `.liees .tuile{flex:none;…}`. Mesures et captures au §6.

## 6. Preuves
- **CI de la PR #99** : sur le commit 03a1aa1 (paires, côté de déclaration, tuile ronde), « Contrôles » vert (schémas,
  règles du plan dont R7-LIEN-*, construction, contrôle du site, liens internes, indexation durable) ; les autres travaux
  sur le commit qui ajoute ce paquet. Première version (2567764), relevé de la revue : 878 tests verts (dont « docs/09
  est à jour » et les briefs) ; contrôle du site : 0 erreur, 42 alertes, comme la PR #93 ; liens internes de 1 439 à
  1 455 ; Lighthouse mobile 100/100/100/100, CLS 0, LCP de 902 à 1 055 ms sur les dix pages.
- **Comparaison des deux constructions** (en ligne : construction de la PR #93 ; proposée : artefact `site-verifie` du
  commit 03a1aa1) : les 41 fichiers HTML changent par leur feuille de style en ligne, dont la seule différence est
  `flex:none` dans `.liees .tuile` ; hors de cette ligne, seul le bloc « À lire aussi » change, sur les douze pages du
  §3, dans l'ordre du §3. Aucun autre fichier ne change (plan du site, `robots.txt`, images).
- **Tuiles** (`tuiles.cjs`, `mesures-tuiles.json`) : toutes les tuiles des blocs « À lire aussi » et « pages enfants »,
  sur l'accueil et les 37 pages éditoriales, à 320, 375 et 1366 px, deux polices. Aujourd'hui : 30 tuiles déformées sur
  21 pages à 375 et à 1366 px (jusqu'à 24,8 × 35,2 px), aucune à 320 px (une colonne). Proposé : 63 tuiles, aucune
  déformée, aucun débordement horizontal.
- **Hauteur des pages** (`mesures-liees.json`) : de 0 à 118 px de plus à 375 px, de 0 à 117 px à 1366 px, sur les douze
  pages ; hors du lot, seuls les blocs de « pression des pneus » et « usure des pneus » grandissent, de 23 px à 1366 px
  (une pastille passe sur deux lignes à côté de sa tuile ronde). Rien ne bouge au-dessus des blocs.
- **Captures** : `a-lire-aussi-375.png` (les douze pages, avant et après) ; `tuile-ronde-375.png` (outil, voyant
  batterie, pression des pneus) ; `captures/` (chaque bloc des douze pages à 375 et 1366 px, police chargée et police de
  secours, avant et après : 96 fichiers, `capturer-liees.cjs`) ; `tuiles/` (`capturer-tuiles.cjs`).

## 7. Fichiers générés
- `docs/09_plan_du_site.md` (parties générées par `npm run plan:vue`) et briefs de la vague A (`npm run briefs` :
  `voyant-direction`, `voyant-adblue`), contrôlés par la CI.
- Les briefs des vagues B et C (`travaux/etape-10/`, `travaux/etape-11/`) ne sont pas régénérés : ce sont des archives
  figées, déjà en décalage avant ce lot (revue).
- Le brief régénéré dit « pas de lien dans le texte avant sa publication » pour des pages déjà en ligne : phrase du
  générateur, sans effet sur les pages.

## 8. Après la validation
Fusion, vérification en ligne des douze pages (bloc « À lire aussi », tuiles) et du plan du site ; mise à jour de la
copie du plan dans le projet Claude (`claude/09_plan_du_site.md`) ; journal.

## 9. Idées reportées proposées
- Voyant de frein ↔ Contre-visite et Fumée à l'échappement ↔ Contre-visite : justifiées des deux côtés (sections
  « contrôle technique » des trois pages), hors de la cible de ce lot (pages à un lien ou moins).
- `lastmod` du plan du site distinct de la date visible pour un changement de liens (§4).

## 10. Revue indépendante
- **Revue** : un agent sans contexte de la rédaction a relu la première version du lot (commit 2567764) : plan, pages,
  deux constructions comparées, CI, captures. Verdict : à corriger, rien de bloquant. C'est la première relecture de ces
  paires : celles de l'audit avaient été ajoutées après sa revue.
- **Ce qu'elle a vérifié exact** : seuls des liens ajoutés ; dix fichiers HTML changés, seul le bloc « À lire aussi »
  dans chacun ; plan du site, `robots.txt` et accueil identiques ; justifications retrouvées dans les pages ; procédure
  respectée ; chiffres du paquet.
- **Ce qu'elle a changé** :
  - paire Changer la batterie ↔ Voyant de direction ajoutée, et paires du voyant déclarées côté batterie : sa pastille
    n'arrive plus en tête de « Recharger la batterie », page qui ne parle pas du voyant ;
  - phrase fausse corrigée : l'ordre des pastilles dépend du côté de déclaration ;
  - tuile ronde (§5) ;
  - critère explicite pour une paire justifiée d'un seul côté, d'où la paire Voiture qui ne démarre pas ↔ Voyant
    AdBlue ; phrase sur AdBlue et airbag corrigée ;
  - lot U0 séparé de P1 dit en tête ; état de la CI, fichiers générés, mise à jour du projet après la validation, idées
    reportées.
- **Écarté** : rien.
- **Non relu** (ajouté après la revue) : les deux paires nouvelles, le changement de côté, la ligne de style, ce paquet.
- **Reste à vérifier** : le rendu sur un vrai téléphone ; les travaux de la CI sur le commit qui ajoute ce paquet.

## 11. Validation de Houssem
À compléter : les dix paires et la tuile ronde.
