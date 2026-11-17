# Porte de sortie de l'étape 10 (vague B) : dossier de vérification

> **Validé par Houssem le 17/11/2026 à 10 h 11**, mot pour mot sur la ligne de validation du §4 : « Je valide la porte de
> l'étape 10 sur les 11 pages de la vague B en ligne. Je confirme que mon « Je valide tout ! » du 17/11 à 7 h 39 couvrait
> la ligne de validation de chaque paquet (F3, B2, B3, B4) et la demande n° 33. Je ratifie l'ouverture de la vague B et
> la mise en ligne du lot B1 (PR #76), faites sur ma délégation de la nuit, dont le passage avait été écrit sur sa branche
> avant cette délégation. J'accepte : que les revues indépendantes des lots B2 à B4 aient été faites sur leurs branches
> avant les pull requests, leurs corrections n'étant pas relues ; que la liste de recette de l'étape 9 n'ait été repassée
> point par point que pour le lot B1, les lots B2 à B4 l'étant par leur recette, la CI et la relecture en ligne ; les
> exceptions de six écrans (nettoyer le FAP, perte de puissance) ; le passage « Pousser la voiture… » de « voiture qui ne
> démarre pas » tel qu'il est. Restent à faire : le rendu sur un vrai téléphone (par moi), l'indexation des 5 pages
> restantes et la soumission à Bing (§3). » **L'étape 10 est fermée.** Le dossier ci-dessous est celui qu'il a validé
> (82b41d1), inchangé.

**État : dossier du 17/11/2026 (matin), après la fusion des quatre lots de la vague B (PR #76, #80, #81, #82),
relevé sur `main` à b1c7d57 (fusion de la PR #82), dont le passage de la CI (44043161687, déploiement et production
compris) sert de preuve. La PR #79 (partie technique du modèle fluide, sans page publiée) a été fusionnée ensuite
(be20a7b, 9 h 25) : son diff ne change pas le rendu des pages panne et dossier (modèle fluide à part, refus du format 1
étendu à la vague C), et sa CI était verte.** Relu par une revue indépendante (fin du dossier), corrigé, **à valider
par Houssem**. Rien ici n'est « validé » au sens de la porte tant que Houssem ne l'a pas écrit.

Porte (docs/03, ligne 10) : exemples panne et dossier validés par Houssem (verdicts et encadrés de décision) avant la
rédaction du lot ; gravité lisible et lien « Signaler une erreur » présents dans ces modèles ; chaque exemple passe
ensuite par le paquet et la recette de son lot ; **mêmes critères que la vague A** (ligne 8, ce qui s'applique aux pages
panne et dossier) ; le site étant en ligne et indexable, la liste de recette de l'étape 9 est repassée avant chaque
fusion d'un lot de pages. Porte par lot de mise en ligne, comme à l'étape 8 (demande n° 17) : l'étape se ferme quand
tous les lots ont passé leur porte de lot et que la porte complète est vérifiée sur l'ensemble.

## 1. Les lots et leur porte de lot

| Lot | Pages (adresse) | Validation de Houssem | Revue indépendante | Mise en ligne |
|---|---|---|---|---|
| Exemples de la porte 10 (devenus le lot B1) | voiture qui ne démarre pas (`/voiture-ne-demarre-pas/`, panne, arbre) ; moteur PureTech (`/moteur-puretech/`, dossier) | 16/11, 19 h 26 : « Je valide les exemples de la porte 10 » (`paquet-porte-10.md`, `paquet-porte-10-fin.md` ; journal, PR #72, f49c012) | oui, une revue du paquet (16/11 ; section « Revue indépendante » de `paquet-porte-10-fin.md`) | voir B1 |
| B1 | les deux exemples, sans un mot changé (`lot-b1/README.md` : comparaison avec b9b0835, version validée) ; ouverture de la vague B (`config/vagues-ouvertes.json`) | validation des exemples ci-dessus ; **ouverture de la vague et passage des deux pages : commit 32ca1e4, écrit sur la branche du lot le 16/11 à 22 h 25, avant la délégation et sans demande de Houssem** (règle de passage : « sur demande de Houssem ») ; publication (fusion) décidée par Claude le 17/11 vers 0 h 20, sur la délégation de Houssem du 17/11 à 0 h 13 (aucun verdict nouveau) : **à ratifier par Houssem** (§4) | oui, PR #76 (16/11 au soir) : « à corriger », rien de bloquant ; corrigé, non relu (journal) | 17/11, 0 h 28, PR #76 (589561c) |
| B2 | batterie de voiture (`/batterie-voiture/`, arbre) ; recharger la batterie (`/batterie-voiture/recharger/`, tutoriel) ; changer la batterie (`/batterie-voiture/changer/`, tutoriel) | 17/11, 7 h 39 : « Je valide tout ! Fais le necessaire », réponse au message du matin qui portait mot pour mot la ligne de validation de `paquet-lot-b2-fin.md` | **partiellement** : revue du 16/11 sur l'état de la branche, avant la PR (créée le 17/11 vers 7 h 52) : « à corriger », 1 bloquant, 8 importants, 14 mineurs ; corrigés avant le paquet, non relus (dont des verdicts changés par ces corrections) ; ni la résolution des conflits de `data/sources.json` ni le passage n'ont été relus | 17/11, 8 h 18, PR #80 (a29e27f) |
| B3 | moteur qui surchauffe (`/moteur-qui-surchauffe/`, arbre) ; nettoyer le FAP (`/nettoyer-fap/`, tutoriel) ; paire de liens `nettoyer-fap` ↔ `voyant-moteur` | 17/11, 7 h 39, même réponse (ligne de `paquet-lot-b3-fin.md`, paire et étapes du FAP au-delà de six écrans comprises) | **partiellement** : revue du 16/11 sur l'état de la branche, avant la PR : « à corriger », 1 bloquant, 7 importants, 10 mineurs ; corrigés avant le paquet, non relus ; la paire de liens et le passage n'ont pas été relus | 17/11, 8 h 39, PR #81 (2627df3) |
| B4 | perte de puissance (`/perte-de-puissance-voiture/`, arbre) ; voiture qui broute (`/voiture-qui-broute/`, arbre) ; bruit moteur (`/bruit-moteur/`, arbre) ; fumée à l'échappement (`/fumee-echappement/`, arbre) ; demande n° 34 (requête principale de la page fumée) | 17/11, 7 h 39, même réponse (ligne de `paquet-lot-b4-fin.md`, demande n° 34 et arbre de « perte de puissance » au-delà de six écrans compris) | **partiellement** : revue du 16/11 sur l'état de la branche, avant la PR : « à corriger », 1 bloquant, 12 importants, 13 mineurs ; corrigés avant le paquet, non relus (dont des verdicts changés) ; la demande n° 34 et le passage n'ont pas été relus ; pas de seconde revue (décision de Houssem du 16/11) | 17/11, 9 h 00, PR #82 (b1c7d57) |

**11 pages en ligne** sur les ≈ 11 de la vague B (docs/03, ligne 10 : 6 pannes, batterie et ses 2 tutoriels, tutoriel
FAP, dossier PureTech) : 10 pages panne (dont 3 au format tutoriel) et 1 dossier. Chacune porte son empreinte
`validation:` (relevé `porte-10/empreintes.txt`). Le site compte 31 adresses en ligne (liste Lighthouse de
production).

Validation du 17/11 (7 h 39) : la phrase de Houssem est générale ; elle répond à un message du pilotage qui reprenait mot
pour mot les lignes de validation des paquets F3, B2, B3 et B4 (fichiers `*-fin.md`) et la phrase d'acceptation de la
demande n° 33. Chaque paquet porte en tête la citation, la date, l'heure et le renvoi à sa ligne. Le texte du message du
pilotage est copié tel quel dans `porte-10/message-du-matin-17-11.md` ; la ligne de validation (§4) fait confirmer par
Houssem que sa réponse couvrait la ligne de chaque paquet.

Fusions : **faites par Claude, par l'API de GitHub** (compte de Houssem), sur la délégation du 17/11 à 0 h 13 (B1) et
sur « Fais le necessaire » du 17/11 à 7 h 39 (B2 à B4), chacune après la mise à jour de la branche avec `main` et une CI
verte sur sa tête exacte ; l'API ne garde que le compte utilisé, le journal dit qui a fusionné. Les branches B3 et B4
contenaient les lots précédents. Deux commits poussés par une autre session le 17/11 à 1 h 02, avant la validation de
Houssem (af4ad11 et 52287cf, qui ne touchent que les paquets B3 et B4 : mesures de la recette et exceptions de six
écrans), ont été intégrés par fusion : avant la pose des empreintes pour B4, juste après pour B3 (61973f3 à 7 h 55, puis
2a56ad1 à 7 h 56), sans effet sur les pages ; ce sont ces versions des paquets que les lignes de validation citent. Le
paquet B2 validé garde des mesures d'avant la revue et la mention « recette à refaire » (l. 112-116 et 152-157) : la
recette a été refaite le 16/11 à 23 h 44 (9803296, README du lot), sans exception nouvelle ; le paquet validé n'est pas
modifié.

## 2. Critères de la porte complète

| Critère | Preuve | État au 17/11 |
|---|---|---|
| **Ligne 10.** Exemples panne et dossier validés par Houssem (verdicts et encadrés de décision) avant la rédaction du lot | validation du 16/11 à 19 h 26 (`paquet-porte-10-fin.md`, journal) ; premiers commits des brouillons des lots B2 à B4 : 16/11, 19 h 46 (09e0a98, B2), 19 h 52 (4495298, B3), 19 h 56 et 19 h 59 (f48c882 et cf33c98, B4), sur leurs branches (`git log --diff-filter=A`) | **vérifié** pour ce que montre l'historique Git : tous les brouillons des lots sont postérieurs à la validation. Le moment où leur rédaction a commencé hors de Git n'est pas vérifiable |
| **Ligne 10.** Gravité lisible et lien « Signaler une erreur » dans les modèles panne et dossier | contrôles R9-ENCADRE-CONTENU (libellés du verdict et de l'urgence de chaque ligne, CONTROLES.md) et SIGNALER-ERREUR-ABSENT, dans le job « Contrôles » de `main` (passage 44043161687) ; relevé sur la construction de production des 11 pages (`porte-10/pages.txt`, commandes en tête, script `porte-10/releve-pages.cjs`) : 55 lignes d'encadré, chacune avec ses deux libellés écrits et `data-verdict`, `data-urgence` ; un lien « Signaler une erreur » par page ; icône de forme propre à chaque verdict (WCAG 1.4.1, CONTROLES.md) | **vérifié** sur les 11 pages |
| **Ligne 10.** Chaque exemple passe par le paquet et la recette de son lot | les deux exemples sont le lot B1 : paquet de la porte 10, recette de la porte 10 (`recette-porte-10/`) refaite sur la construction de production dans le README du lot B1 | **vérifié** |
| **Ligne 8.** Faits vérifiés sur sources, verdicts validés ; faits de sécurité et chiffres dans le paquet validé par Houssem | un paquet par lot avec ses points à trancher (verdict de chaque ligne saisie, avec ses citations et la grille dans les deux sens) ; extraits relus mot pour mot à l'écran (`travaux/etape-10/textes/*-verification.md`) ; registre `data/sources.json` (contrôles R3-*, SOURCE-SECONDAIRE-NATURE, demande n° 31) ; lignes de validation citées en tête de chaque paquet | **vérifié** sur les 11 pages pour les verdicts (validés par Houssem) ; les faits ont été relus contre leurs sources par Claude et par la revue de chaque lot, **pas par un tiers humain** (règle : une relecture par une IA n'est pas une vérification ; Houssem valide les verdicts et l'encadré) |
| **Ligne 8.** Encadrés de décision relus par Houssem | empreinte `validation:` des 11 pages, recalculée par `npm run empreinte` et comparée au fichier (`porte-10/empreintes.txt`) ; R4-EMPREINTE et R4-VALIDATION-ABSENTE à chaque construction, job « Contrôles » de `main` (passage 44043161687) | **vérifié** : 11 empreintes sur 11 |
| **Ligne 8.** Lighthouse mobile ≥ 95 et CLS < 0,1 sur une page de chaque modèle, emplacements factices | job « Démonstration du format 2 » de `main` (passage 44043161687) : construction de démonstration, emplacements factices (`pubFactice`, `scripts/lib/donnees-site.ts`), liste `lighthouserc-demo-format2.json` ; elle contient, depuis le passage des lots, les vraies pages **perte de puissance** (modèle panne, arbre), **changer la batterie** (modèle panne au format tutoriel) et **moteur PureTech** (modèle dossier) | **vérifié** (passage 44043161687, médiane de 3 passages) : perte de puissance, changer la batterie et moteur PureTech, ainsi que voiture qui broute, à 100 en performance, accessibilité, bonnes pratiques et SEO, CLS 0,000 ; les 14 adresses de la démonstration au même niveau. Le job « Recette des exemples » (`lighthouserc-exemples.json`) n'a ni page panne ni dossier : c'est la démonstration qui couvre ces modèles |
| **Ligne 8** (en plus, comme à la porte 8). Lighthouse mobile sur toutes les adresses en ligne | job « Lighthouse mobile » de `main` (passage 44043161687), liste `lighthouserc.json` (31 adresses, dont les 11 de la vague B), médiane de 3 passages | **vérifié** (même passage) : 31 adresses sur 31 à 100 dans les quatre catégories, CLS 0,000, LCP de 754 à 1 055 ms |
| **Ligne 10.** Liste de recette de l'étape 9 repassée avant chaque fusion d'un lot | B1 : liste repassée point par point sur la construction de production (`lot-b1/README.md`, « Liste de recette de l'étape 9 ») ; B2 à B4 : recette de chaque lot (`recette-lot-b2/`, `recette-lot-b3/`, `recette-lot-b4/` : contrôles, mesures du format 2 à 320, 375 et 1366 px, Lighthouse, captures dans les deux polices), refaite après la revue, puis CI verte sur la tête exacte de chaque PR (contrôles, recette, démonstration, Lighthouse, indexation durable) ; pages des quatre lots relues en ligne par Claude dans Chrome après chaque déploiement (B1 le 17/11 vers 0 h 35, B2 vers 8 h 40, B3 vers 9 h 00, B4 vers 9 h 25) : statut 200, aucune balise robots, canonical propre, lignes de l'encadré (verdict et urgence) identiques aux paquets, plan du site à 22, 25, 27 puis 31 adresses (journal ; pas de relevé dans le dépôt) | **partiellement vérifié** : les points SEO, liens, accessibilité automatique, juridique et format 2 sont couverts par les contrôles et la recette de chaque lot ; pour B2 à B4, la liste n'a pas été repassée point par point comme pour B1 (navigation au clavier et contour de focus, comparaisons en tableau, liste des H2) ; le rendu sur un vrai téléphone fait l'objet de la ligne suivante |
| **Ligne 10** (liste de recette, lots au format 2, docs/03 règle 15). Rendu sur un vrai téléphone | aucune : ni capture ni relevé d'un vrai téléphone dans le dépôt pour les 11 pages ; les captures des recettes sont prises dans Chromium à 320, 375 et 1366 px | **non vérifié** : à faire par Houssem (journal, points ouverts, pour B1) |
| **Ligne 9** (après le déploiement de chaque lot). En-tête et balise robots, robots.txt, plan du site, inspection d'URL, soumission à Bing | job « Production en ligne » de `main` (passage 44043161687, `npm run production`, `scripts/lib/production.ts`) : il lit l'en-tête de l'accueil (redirections, absence de noindex), `robots.txt` et le statut de `sitemap.xml`, **aucune page de la vague B** ; pages de chaque lot relues en ligne par Claude (ligne « liste de recette » ci-dessus) ; Search Console et Bing : journal | **partiellement vérifié** : « Production : tout est conforme. », mode INDEXABLE, après le déploiement de b1c7d57 ; les 11 pages relues en ligne (statut, balise robots, canonical, encadré) ; **indexation demandée dans la Search Console pour B1 (2 pages) et pour 4 pages de B2 et B3 (batterie, recharger, changer, surchauffe), refusée ensuite (« réessayer ultérieurement », quota du jour probable) pour les 5 autres ; aucune adresse de B2 à B4 soumise à Bing** (l'extension Chrome n'a pas l'autorisation sur bing.com) : §3 |
| **Ligne 8.** Contrôles au vert | dernier passage de `main` (b1c7d57, passage 44043161687) : contrôles, recette, démonstration, Lighthouse, origine des commits, déploiement, production en ligne ; alertes non bloquantes listées dessous | **vérifié** : passage 44043161687 sur b1c7d57, les huit jobs verts (contrôles, recette, démonstration, Lighthouse, origine des commits, secrets, déploiement, production) ; construction : 31 pages (28 éditoriales, l'accueil, « à propos » et les mentions légales), 0 erreur, 33 alertes (relevé local de `npm run build` sur b1c7d57) |

**Critères de la ligne 8 sans objet pour les pages panne et dossier** : ceux de l'outil voyants (chaque ligne de la base
affichée, filtre par couleur, contenu sans JavaScript, encadré de la page outil validé avec le paquet) ; l'outil est
inchangé depuis la porte F2 (aucune ligne de la base modifiée depuis le 16/11 à 21 h 37).

**Alertes non bloquantes de la construction** (relevé local de `npm run build` sur b1c7d57 : 33 alertes, 5 R3-NIVEAU-A-VERIFIER et 28 R7-IMAGE-RECOMMANDEE) :
- R3-NIVEAU-A-VERIFIER sur « changer la batterie », ligne « La batterie est hors d'usage et doit être remplacée »
  (Renault et Dacia : « faites appel », « impérativement ») : tranchée au paquet du lot B2 (point 5, lecture de la
  grille), validée avec le lot ;
- les trois R3-NIVEAU-A-VERIFIER de la base (préchauffage Seat, airbag passager Renault et Dacia), déjà au paquet de
  l'étape 5 ;
- 28 R7-IMAGE-RECOMMANDEE (« pas d'image » au sens de Google, les illustrations étant des dessins du site) : comme à la
  porte 8 (point ouvert « Images »).

## 3. Ce qui reste ouvert après la porte

**Rendu et recette**
- Rendu sur un vrai téléphone des 11 pages (première situation, ligne d'écart, sommaire, arbre, étapes, tableaux en
  cartes) : à faire par Houssem (journal, points ouverts : B1 ; étendu ici aux lots B2 à B4).
- B1, « Pousser la voiture… » (voiture qui ne démarre pas) : comparaison de quatre marques en prose, « à juger par
  Houssem » dans la recette du lot B1 (texte validé, non modifié).

**Exceptions de six écrans et de trois écrans, acceptées** (demande n° 32, décision de Houssem sur captures)
- Étapes de « nettoyer le FAP » à 4 102 px (lot B3) et arbre de « perte de puissance » à 4 458 px (lot B4), au-delà de
  six écrans (4 002 px) : acceptés avec la validation des lots le 17/11.
- Illustrations au-delà de trois écrans (2 001 px), signalées dans les paquets : exemples de la porte 10 (2 656 et
  2 805 px sur b1c7d57, acceptées avec la porte 10), « batterie de voiture » (2 526 / 2 550 px), « moteur qui
  surchauffe » (2 448), « nettoyer le FAP » (2 364), « perte de puissance » (3 371), « voiture qui broute » (2 451),
  « bruit moteur » (2 370) (mesures des paquets ; FORMAT2-MESURES du passage 44043161687 pour les trois premières).
  Arbre de « voiture qui ne démarre pas » à 3 811 / 3 836 px (166 px de marge en police de secours) : à surveiller si
  l'encadré s'allonge.

**Indexation**
- Search Console : demander l'indexation de `/nettoyer-fap/`, `/perte-de-puissance-voiture/`, `/voiture-qui-broute/`,
  `/bruit-moteur/` et `/fumee-echappement/` (refusée le 17/11, quota du jour probable) ; suivi à J+7 et J+14.
- Bing : soumettre les 9 adresses nouvelles de B2 à B4 (et les 7 du lot F3) : autorisation de l'extension Chrome sur
  bing.com à donner par Houssem, ou soumission par lui.

**Sources et contenus**
- Claquement, sifflement du turbo et fumée noire d'un diesel : sans source admise ; les pages le disent et conseillent
  un professionnel (journal, « Sources de la vague B »).
- Communiqué de Stellantis (dossier PureTech) : version belge citée ; recherche d'une version France reportée à la revue
  suivante de la page (paquet de la porte 10, point 7).
- Prise en charge `couverture-speciale-puretech` : à revérifier tous les 90 jours (alerte datée de la CI).
- Ligne de base `huile-niveau` et jauge (journal) : pas de demande de changement proposée.

**Format** (revue de la PR #79, I1 ; point à part, rien de corrigé)
- Tableaux du texte « en cartes quand une colonne porte un texte long » (charte graphique §4) : le code ne passe en
  cartes qu'au-delà de trois colonnes (`src/lib/format2.ts`, `tableauxDuTexteFormat2`). Page en ligne qui changerait :
  loi montagne (3 colonnes, 18 mots) ; dans la vague B, « nettoyer le FAP » (3 colonnes, 13 mots au plus) selon le
  seuil à fixer. Relevé : `travaux/etape-11/modele-fluide/README.md` (sur `main` depuis la fusion de la PR #79).

**Après la porte**
- Tag de l'étape 10 posé par Houssem, sur le commit de `main` qu'il désigne.
- Journal et `docs/03` (ligne 10 : fait) par Houssem ou sur sa demande ; vague C : la PR qui ajoute « C » à
  `config/vagues-ouvertes.json` (demande n° 21), validée par Houssem, ouvre l'étape 11 ; la partie technique du modèle
  fluide est déjà sur `main` (PR #79, fusionnée le 17/11).

## 4. Ligne de validation proposée

« Je valide la porte de l'étape 10 sur les 11 pages de la vague B en ligne. Je confirme que mon « Je valide tout ! » du
17/11 à 7 h 39 couvrait la ligne de validation de chaque paquet (F3, B2, B3, B4) et la demande n° 33. Je ratifie
l'ouverture de la vague B et la mise en ligne du lot B1 (PR #76), faites sur ma délégation de la nuit, dont le passage
avait été écrit sur sa branche avant cette délégation. J'accepte : que les revues indépendantes des lots B2 à B4 aient
été faites sur leurs branches avant les pull requests, leurs corrections n'étant pas relues ; que la liste de recette
de l'étape 9 n'ait été repassée point par point que pour le lot B1, les lots B2 à B4 l'étant par leur recette, la CI et
la relecture en ligne ; les exceptions de six écrans (nettoyer le FAP, perte de puissance) ; le passage « Pousser la
voiture… » de « voiture qui ne démarre pas » tel qu'il est. Restent à faire : le rendu sur un vrai téléphone (par
moi), l'indexation des 5 pages restantes et la soumission à Bing (§3). »

## Revue indépendante
Une revue (agent sans contexte de la rédaction, 17/11 au matin, rapport complet gardé hors du dépôt) : **« à corriger »,
rien de bloquant**. Elle a recoupé et trouvé exacts : les huit jobs du passage 44043161687, les 31 adresses Lighthouse,
les 14 de la démonstration, les PR, commits et heures, les 11 empreintes, les 55 lignes d'encadré, et l'identité des
pages publiées avec les versions validées (aucune différence hors des commentaires d'en-tête et de la ligne
`validation:`).
- **Changé** : fusions attribuées à Claude (et non à Houssem) ; ouverture de la vague B : commit 32ca1e4 du 16/11 à
  22 h 25, antérieur à la délégation, dit et soumis à ratification ; revues B2 à B4 passées à « partiellement » (faites
  avant les PR, corrections et passage non relus) ; critère après déploiement passé à « partiellement » (le job de
  production ne lit aucune page de la vague B ; pages relues en ligne par Claude ; indexation et Bing incomplets, au §3) ;
  message du matin versé au dossier (`porte-10/message-du-matin-17-11.md`) et confirmation demandée dans la ligne de
  validation ; mesures du §3 mises à jour sur b1c7d57 ; ordre de B3 corrigé ; paquet B2 (« recette à refaire ») expliqué ;
  31 pages = 28 éditoriales et 3 autres ; critères de la ligne 8 sans objet nommés ; effet de la PR #79 dit ; « Pousser la
  voiture » dans la ligne de validation ; coquille de `releve-pages.cjs`.
- **Écarté** : coquille d'adresse dans le corps de la PR #81 (description d'une PR fusionnée, sans effet) ; « porte 10
  validée le 16/11 » dans le titre de la PR #72 (fusionnée ; le journal est précisé : « exemples de la porte 10 »).
- **Non relu par la revue** : tout ce qui précède a été écrit après elle.
- **Non vérifiable par elle** : recalcul des empreintes (pas de npm sur sa machine : contrôles de la CI), site en ligne,
  Search Console et Bing, faits des pages contre les notices, rendu sur un vrai téléphone.
