# Lot F1 (étape 13 avancée, demande de changement n° 30) : porte du format, mise en œuvre dans les modèles du site

Dossier de la tâche F1.4 (brief `travaux/etape-13/f1/taches/F1.4.md`, commit dea8a12 de `etape-13/f2-donnees`), sur la
branche `etape-13/f1-porte`, partie de `main` à 464fe7d (après les PR houssem-jeddou/decodauto#63, #64 et #65).
Statut honnête par critère : **vérifié** (preuve donnée), **non vérifié** (rien ne le prouve encore), **à vérifier** (preuve
prévue, pas encore prise), **sans objet à F1**.

Ce que couvre F1 : les **modèles** au format 2, rendus par la construction de démonstration (`npm run demo:format2`,
brouillon « jamais validé », jamais déployée). **Aucune page en ligne ne change** : la production reste au format 1, identique
octet pour octet à celle de `main` (§1, critère 4). Les textes des pages, eux, sont repris aux lots F2 et F3.

Pages de la démonstration (14 au format 2) :
- voyant moteur, voyant AdBlue, outil voyants ;
- code P0420, pression des pneus (page informative), loi montagne ;
- panne « perte de puissance », panne « voiture qui broute », tutoriel « changer la batterie », dossier « moteur PureTech » ;
- accueil, « à propos », mentions légales, 404.

Un modèle par type : voyant, outil, code défaut, pneus et obligations, panne, dossier, tutoriel, accueil, socle, 404.

Preuves de référence (commandes lancées sur la branche ; la CI de la PR les rejoue) :
- `npm test` : 837 tests, 837 réussis, 0 échec ;
- `npm run schemas` : 0 erreur ;
- `npm run demo:format2` : 23 pages éditoriales, 0 erreur bloquante ; 49 erreurs attendues, toutes nommées (empreintes
  du brouillon, textes non repris : FORMAT2-METHODE, FORMAT2-PARAGRAPHES ; pages de démonstration sans empreinte ; paire du
  plan `batterie-changer` ↔ `voyant-batterie`) ; liens : 578 internes vérifiés, 0 problème ;
- `npm run mesures:format2` (FORMAT2-MESURES, Chromium) : 14 pages, 84 mesures, **0 erreur**
  (`porte/mesures-format2.log`, `porte/mesures-format2.json`). Même mesure sur la démonstration construite depuis `main`
  (464fe7d, avant F1.4) : **50 erreurs** (`porte/mesures-format2-main-464fe7d.log`), corrigées ici (§3).

## 1. Critères de la ligne 13 de `docs/03` (colonne « Porte de sortie »)

| # | Critère | Preuve | Statut |
|---|---|---|---|
| 1 | Règles 2a à 2m vérifiées page par page, avec les précisions de 2a et 2i | §2 (règle par règle) et §3 (mesures page par page) | **Vérifié** pour les modèles ; textes : aux lots F2 et F3 (2d, 2e, 2j) |
| 2 | Conception visuelle avant intégration (règle 15) | Captures à 375 × 667 et 1366 × 800, police chargée et de secours, de chaque tâche : `captures/` (F1.2), `captures/f1.3a/`, `captures/f1.3b/`, `captures/f1.3c/`, refaites après F1.4 ; chaque tâche a eu sa revue indépendante (PR #61, #63, #64, #65) | **Vérifié** |
| 3 | Piste choisie par Houssem | Piste B « Tableau de bord », 15/11/2026, 22 h 57 (demande n° 30, §8) | **Vérifié** |
| 4 | Aucune adresse, aucun title ni aucun H1 modifiés (règle 14) ; date « Mis à jour le » selon la règle 14 (b) ; favicon et nom du site inchangés | Construction de production de la branche et de `main` (464fe7d), toutes deux `SITE_INDEXABLE=true npm run build`, puis `diff -rq` : aucune différence (description de la PR) ; contrôles INDEXATION-*, DATE-*, TITRE-*, FAVICON-* au vert dans la CI | **Vérifié** (rien de publié ne change à F1) |
| 5 | Lighthouse mobile ≥ 95 (performance, accessibilité), CLS < 0,1, sur toutes les adresses de la liste, emplacements factices | Démonstration : `lighthouserc-demo-format2.json`, 14 pages × 3 passages (local et job « Démonstration du format 2 ») ; production : `lighthouserc.json` inchangé, job « Lighthouse mobile » | **Vérifié** (scores dans la description de la PR) |
| 6 | Aucune ressource d'un autre site ; police sous licence libre, hébergée, chargée sans décalage | TIERS-RESSOURCE au vert sur la démonstration ; Outfit en WOFF sur `/polices/`, `font-display: optional` ; CLS 0 sur les 14 pages ; mesures « police de secours » identiques jusqu'à l'encadré | **Vérifié** |
| 7 | Gravité jamais par la seule couleur | Forme de la gravité (`svg.forme[data-icone-gravite]`) et libellé de la grille sur chaque verdict : encadré (R9-*), repères (FORMAT2-REPERE), arbre (FORMAT2-ARBRE), cartes de l'outil (OUTIL-LIBELLES), index de l'outil en deux grilles par couleur (OUTIL-INDEX, WCAG 1.4.1) | **Vérifié** |
| 8 | Encadré de décision premier bloc après le H1 | R9-ENCADRE-POSITION sur toutes les pages éditoriales de la démonstration | **Vérifié** |
| 9 | Liste de recette de l'étape 9 repassée avant chaque fusion (dont le filtre de l'outil et le rendu sur un vrai téléphone) | Aucune page publiée à F1 | **Sans objet à F1** ; à faire à F2 et F3 (§5) |
| 10 | Contrôles au vert | CI de la PR (jobs « Contrôles », « Démonstration du format 2 », « Recette des exemples », « Lighthouse mobile ») | **À vérifier** sur le dernier commit de la PR |
| 11 | Revue indépendante | Une seule, lancée par le chat sur la PR complète (décision du 16/11) | **À faire** |
| 12 | Validation de Houssem | – | **À faire** |

## 2. Règles 2a à 2m : quel contrôle les vérifie

| Règle | Contrôle (code d'erreur ; `CONTROLES.md`) | Cas en échec testés | Ce qui reste à la recette |
|---|---|---|---|
| **2a** Première situation complète dans le premier écran (667 px) ; précision : page informative, réponse directe complète, verdict et urgence de la 1re situation dans le premier écran | **FORMAT2-MESURES** (nouveau, F1.4) : mesure dans Chromium à 375 × 667, police chargée et de secours | `tests/mesures-format2.test.ts` (situation à 668 px, absente ; réponse à 700 px ; verdict à 690 px) | Rendu sur un vrai téléphone (recette, F2 et F3) |
| **2b** Ligne d'écart de 25 mots au plus, lien compris, marques nommées, **renvoi au tableau des notices** ; notices et base du coût sous l'encadré ; coût dans l'encadré ; rien de masqué | FORMAT2-ECART (texte exact, 25 mots, renvoi « Votre marque » : sur la page, sur la page du voyant liée par le plan, page outil, exception STOP), FORMAT2-PROVENANCE, R9-ENCADRE-*, TABLEAU-NOTICES-LIEN ; construction refusée sans `ecart_court` | `tests/format2.test.ts`, `tests/outil-format2.test.ts`, `tests/format2-panne.test.ts` | Les marques nommées sont-elles les bonnes (paquet F2) |
| **2c** Page informative : l'encadré commence par la réponse directe | FORMAT2-REPONSE ; schéma : réservée aux pages pneus et obligations, 40 mots au plus ; construction refusée sans elle sur la pression des pneus | `tests/format2-f3.test.ts` | Texte de la réponse (paquet F3) |
| **2d** Repère du verdict en tête des sections liées ; méthode hors du texte | FORMAT2-REPERE, FORMAT2-METHODE (**élargi en F1.4** : « Verdicts retenus », « consigne(s) retenue(s) »), règle des références `{{cite:…}}` (construction refusée) | `tests/format2.test.ts` (un test par forme) | Choix des sections qui portent un repère (règle de la seconde revue de F1.2 : une seule ligne de l'encadré par section) |
| **2e** Paragraphes de trois phrases au plus ; étapes numérotées ; comparaisons en tableau | **FORMAT2-PARAGRAPHES** (nouveau, F1.4), pages du socle comprises ; étapes : `{{etapes}}` (R7-TUTORIEL-ETAPES) ; tableaux : `{{tableau}}` | `tests/format2.test.ts` (quatre phrases ; citations, listes, figures exclues) | « Comparaison en tableau » : jugement à la recette. Six textes de la démonstration ont encore des paragraphes de quatre ou cinq phrases (erreurs attendues nommées) : repris aux lots F2 et F3 |
| **2f** Tableau des notices compact ; extraits dépliables au libellé unique | TABLEAU-NOTICES-*, FORMAT2-REPLIE | `tests/format2.test.ts` | – |
| **2g** « Sources » repliée avec leur nombre | FORMAT2-REPLIE | `tests/format2.test.ts` | – |
| **2h** Sommaire au-delà de six écrans | FORMAT2-SOMMAIRE (dès trois H2 : sommaire qui mène à chacun) ; **FORMAT2-MESURES** (F1.4) : page éditoriale ou du socle de plus de 4 002 px sans sommaire refusée ; socle : sommaire dès deux titres | `tests/mesures-format2.test.ts`, `tests/format2-f3.test.ts` | – |
| **2i** Visuel après l'encadré dans les trois premiers écrans (2 001 px) ; précision : encadré plus long que trois écrans, visuel juste après « Notices / Base du coût » | FORMAT2-ILLUSTRATION (une seule, juste après le bloc « Notices », dessin nommé, légende signée), construction refusée sans illustration ; **FORMAT2-MESURES** (haut ≤ 2 001 px, ou précision) | `tests/mesures-format2.test.ts` (2 030 px, absente, encadré long sans le visuel juste après) | Le dessin montre-t-il où regarder (jugement) |
| **2j** Aucune question retirée ; part citée d'un tiers au plus ; mots et hauteur en indicateurs | CITATIONS-PART ; hauteur donnée par FORMAT2-MESURES | `tests/format2.test.ts` (part citée) | Liste des H2 avant et après dans le paquet de chaque lot (F2, F3) : les textes ne changent qu'alors |
| **2k** Accueil : grille des pictogrammes, accès par thème ; outil : index en grille | ACCUEIL-LISTE, ACCUEIL-LIEN, PICTO-LIBELLE, OUTIL-INDEX | `tests/format2.test.ts`, `tests/outil-format2.test.ts` | – |
| **2l** Mention en tête inchangée ; ligne de transparence au même texte, visible, contraste AA | MENTION-IA-*, composants communs ; **`tests/charte-b.test.ts`** (F1.4) : la classe stylée est celle du composant, 13 px, couleur douce, contraste 6,67:1 ; Lighthouse accessibilité 100 | `tests/charte-b.test.ts` | – |
| **2m** Emplacements factices ; jamais entre le H1 et l'encadré | R9-PUB-AVANT-ENCADRE, PUB-HAUTEUR-RESERVEE ; emplacements factices dans la démonstration | `tests/format2.test.ts` | – |

Autres contrôles ajoutés à F1.4 :
- **FORMAT2-VAGUE** : une page des vagues B et C est au format 2 ; une page de la vague A passe au format 2 seulement avec son
  lot, inscrite dans `config/lots-format2.json` (vide aujourd'hui) ; tests `tests/vagues.test.ts`.
- **Débordement horizontal** à 320, 375 et 1366 px (WCAG 1.4.10) : dans FORMAT2-MESURES, sur toutes les pages de la
  démonstration et de la recette des exemples.
- **Contour de focus** sur fond sombre (WCAG 1.4.11) : `tests/charte-b.test.ts` (3:1 au moins contre chaque fond).

## 3. Mesures page par page (FORMAT2-MESURES, 375 × 667, police chargée / de secours quand elles diffèrent)

Pixels CSS depuis le haut de la page. Seuils : 667 (2a), 2 001 (2i), 4 002 (2h). Source : `porte/mesures-format2.json`.

| Page | Réponse directe | Verdict et urgence | 1re situation | Bas de l'encadré | Illustration | Juste après « Notices » | Arbre ou étapes | Hauteur | Sommaire | Débordement (320, 375, 1366) |
|---|---|---|---|---|---|---|---|---|---|---|
| `/voyants/moteur/` | – | 373 | **522** | 1 593 | **1 982** | oui | – | 12 587 / 12 637 | oui | 0 |
| `/voyants/adblue/` | – | 493 | **601** | 2 280 | 2 763 (précision 2i) | **oui** | – | 13 869 | oui | 0 |
| `/voyants/` (outil) | – | 489 | **638** | 1 455 | **1 825** | oui | – | 22 067 / 22 117 | oui | 0 |
| `/codes-defaut/p0420/` | – | 399 | **547** | 872 | **1 205** | oui | – | 9 127 / 9 178 | oui | 0 |
| `/pression-des-pneus/` (informative) | **405** | **576** | 766 (précision 2a) | 1 091 | **1 386** | oui | – | 8 161 | oui | 0 |
| `/loi-montagne/` | – | 442 | **591** | 1 350 | **1 627** | oui | – | 8 492 / 8 593 | oui | 0 |
| `/perte-de-puissance-voiture/` | – | 411 | **498** | 986 | **1 281** | oui | 2 874 | 5 118 | oui | 0 |
| `/voiture-qui-broute/` | – | 385 | **472** | 894 | **1 189** | oui | 2 076 | 3 442 | oui | 0 |
| `/batterie-voiture/changer/` (tutoriel) | – | 411 | **580** | 863 | **1 140** | oui | 2 411 (étapes) | 3 634 | oui | 0 |
| `/moteur-puretech/` (dossier) | – | 373 | **481** | 964 | **1 259** | oui | – | 3 578 / 3 603 | oui | 0 |
| `/` (accueil) | – | – | – | – | – | – | – | 2 236 / 2 268 | – | 0 |
| `/a-propos/` | – | – | – | – | – | – | – | 8 286 | oui | 0 |
| `/mentions-legales/` | – | – | – | – | – | – | – | 4 547 | oui | 0 |
| `/404.html` | – | – | – | – | – | – | – | 667 (pied en bas) | – | 0 |

Ce que F1.4 a corrigé (mesure de la démonstration de `main`, 464fe7d : `porte/mesures-format2-main-464fe7d.log`) :
- **débordement à 320 px** sur les 12 pages qui ont le bouton du bandeau (335 px en police chargée, 342 px en police de
  secours) : sous 360 px, le dessin du bouton s'efface (son texte reste), le nom du site et les marges se resserrent ; le
  tableau de la loi montagne, qui défilait de 9 px dans son bloc, coupe désormais un mot trop long ;
- **illustration du voyant moteur à 2 030 px** (au-delà des trois écrans de 2i, depuis la rangée « dépannage » de F1.3b) :
  la ligne de transparence n'était pas stylée (la feuille visait une classe `transparence` que rien n'écrit) ; en 13 px et
  couleur douce, elle passe de 124 à 80 px, et l'illustration à 1 982 px. **Marge de 19 px** : un texte plus long au lot F2
  la ferait repasser au-delà, FORMAT2-MESURES le dira.

## 4. Points à trancher à la porte (avec ma recommandation)

1. **Place de l'arbre de décision sur téléphone** (demande de changement n° 32, version 2, soumise à Houssem le 16/11). Le
   haut de l'arbre est à 2 874 px (perte de puissance) et 2 076 px (broute), parce que les fiches et les causes le
   précèdent (ordre de la charte). **Recommandation** : accepter la demande n° 32 (§1 bis du brief, non mis en œuvre ici).
   Si elle est refusée, l'ordre actuel est gardé et ces mesures sont données à chaque porte.
2. **Page outil** :
   - index par paire (pictogramme, couleur), une grille par couleur, au lieu d'une entrée par ligne : change la décision 9
     du paquet 8.1 (04/11) ;
   - cartes d'une même paire côte à côte, nombre de cas sur la tuile ;
   - introduction après la grille (elle était avant le filtre en 8.1) ;
   - illustration gardée (règle 2i).
   **Recommandation** : les valider. Sans ces changements, deux tuiles d'un même dessin ne se distinguent que par la couleur
   (WCAG 1.4.1), et les deux cartes de la pression des pneus étaient à huit cartes d'écart. Captures :
   `captures/f1.3a/outil-format2-375-index-seul`, `-375-filtre-rouge`.
3. **Pastille longue sous « Oui : »** dans l'arbre : sur téléphone, une pastille de libellé long passe à la ligne sous la
   réponse (dessinée en F1.3c, `captures/f1.3c/planche-arbre-320-*`). **Recommandation** : garder, c'est l'état sur deux
   lignes prévu.
4. **Pression des pneus, écart au pilote** : le pilote répétait le tableau des notices du voyant de pression sur la page ;
   la ligne d'écart renvoie désormais au tableau de la page du voyant (un seul tableau par voyant, sur sa page ; revue de
   F1.3b). **Recommandation** : valider.
5. **Lien « Votre marque » de la page outil** (décision du 16/11 dans la PR #65) : vers le tableau de la page du voyant quand
   elle est construite ; jamais sur la ligne STOP. Dans l'encadré de l'outil, une page de voyant non construite ne donne pas
   d'erreur (pas de lien), comme sur les cartes. **Recommandation** : valider.
6. **Sommaire du socle dès deux titres** (F1.4) : la règle 2h demande un sommaire au-delà de six écrans ; les mentions légales
   en font 6,8 avec deux titres. **Recommandation** : valider (deux pastilles, « Mentions légales » et « Confidentialité »).
7. **Paire du plan** `batterie-changer` ↔ `voyant-batterie`, pour le lien « Votre marque » de « changer la batterie »
   (vague B) : à proposer avec ce lot.
8. **Illustrations du code P0420 et de la loi montagne** : empruntées à des pages voisines pour la démonstration, signalées
   comme telles ; les vraies arrivent avec le lot F3.

## 5. Ce qui reste pour F2, F3 et la vague B

- **Textes** (paquets F2 et F3, validation de Houssem) : lignes d'écart courtes et « ce que demande la notice » (brouillon
  F2 v2) ; réponse directe et question de la pression des pneus ; légendes des illustrations ; textes rédigés sans
  « Verdict retenu », « consigne retenue », éditions ni pages écrites à la main (FORMAT2-METHODE) et en paragraphes de trois
  phrases au plus (FORMAT2-PARAGRAPHES) ; liste des H2 avant et après (2j).
- **Pages en ligne de la vague A** (F2 : voyants et outil ; F3 : codes, pneus et obligations, socle) : passage au format 2
  avec leur lot, inscrites dans `config/lots-format2.json` par la PR du lot (FORMAT2-VAGUE) ; FORMAT2-MESURES sur chaque page.
- **Recette de l'étape 9** avant chaque fusion : filtre de l'outil, **rendu sur un vrai téléphone**, contour de focus au
  clavier, lecteur d'écran sur les tableaux en cartes.
- **Search Console** : chiffres relevés page par page avant F2 (ligne 13).
- **Vague B** : pages rédigées au format 2 d'emblée (FORMAT2-VAGUE), modèles panne et dossier de F1.3c ; demande n° 32 si
  acceptée.
- **F3** (noté dans `a-reporter-f1.4.md`) : encart « dépannage sur autoroute » (demande de changement rédigée par Houssem) ;
  « (p. 198) » du tableau de la pression en `{{cite}}` ; question de la page pression revue avec sa réponse directe.

## 6. Textes proposés pour les documents de pilotage

À reporter mot pour mot après la validation de Houssem (le chat met à jour le projet Claude et ouvre la PR de la copie
`docs/`). Rien de `docs/` n'est modifié par cette PR.

### 6.1 `docs/11_charte_graphique.md`

**En-tête, « Ce qui fait foi »** — remplacer la phrase par :
> **Ce qui fait foi** : les styles du dépôt (`src/styles/charte-b.css`, variables et composants), mis en œuvre au lot F1
> (porte du 16/11/2026). Une variante de composant passe par la charte : ce document et les styles. Jamais de style isolé
> dans une page.

**§2 Couleurs** — ajouter après le tableau :
> Contour de focus : 3 px, décalé de 2 px ; bleu des liens (`#0b5cad`) sur fond clair, bleu clair des liens de nuit
> (`#8cc4ff`) sur les surfaces sombres (bandeau, tête de page, encadré, pied de page, grille des voyants, groupes de l'outil,
> illustration) : au moins 3 pour 1 contre chaque fond (8,6 à 10,1 sur fond sombre ; 5,9 sur le fond de page).

**§3 Typographie** — remplacer la puce « Texte » par :
> - **Texte** : police du système (`system-ui`), 16 px, interligne 1,55. Encadré : 15 px, interligne 1,38. Signature,
>   ligne de transparence, bloc « Notices / Base du coût », mentions et notes : 13 px, couleur douce (`#4b5563`, 6,7 pour 1
>   sur le fond de page).

et compléter la puce « Typographie française » :
> … et après « p. » devant un numéro (format 2) ; séparateur des milliers.

**§4 Composants** — ajouter au tableau :

| Composant | Rendu |
|---|---|
| Repère de section | Un repère seulement sous un H2 qui pose la question d'une seule ligne de l'encadré ; une exception explicite à une autre ligne dans le texte est admise (exemple : FAP avec le voyant moteur) ; une section qui mêle plusieurs cas n'en a pas. |
| Sommaire, état long | Ordinateur : colonne collante à la hauteur de l'écran, défilement propre, ombres de défilement. Téléphone : pastilles de 13,5 rem au plus (une pastille et demie visible à 375 px), deux lignes puis points de suspension, hauteur égale, accroche, fondu à droite. Pages du socle : dès deux titres. |
| Accueil, grille des voyants | Un dessin par pictogramme de la base (18), libellé de `LIBELLES_PICTOGRAMMES` en 12 px (13 px sur ordinateur), marge intérieure de la tuile, coupure d'un mot de 10 lettres au moins avec un tiret ; cartes de thème aux liens espacés (cibles de 24 px). |
| Tableau des notices | « Consigne retenue » dans la cellule « Niveau » ; colonne « Page » courte (« p. 15 »), emplacement entier sous l'extrait. |
| Emplacement publicitaire | 340 px réservés. |
| Page outil | Renvoi de l'encadré en bouton ambre, sans icône ; coût « Selon le voyant » en pastille ambre ; filtre par couleur en pastilles (cochée : panneau sombre, diode de la couleur) ; index des dessins en une grille par couleur, une tuile par paire (pictogramme, couleur) avec son nombre de cas ; un panneau sombre par groupe de couleur, titre avec une diode ; une carte par ligne de la base (la cellule de l'encadré), rangées par paire, la plus grave d'abord ; pas de bouton « Trouver mon voyant » dans le bandeau de la page outil. |
| Arbre de décision | Carte claire ; question numérotée par une pastille sombre au chiffre ambre ; réponses en liste ; un verdict cité est une pastille (forme, libellé de la grille, liseré de sa couleur) qui termine sa réponse, seule sur sa ligne ; sur deux lignes sous 360 px. |
| Fiches (« Le symptôme en bref », « Le tutoriel en bref », fiche du code, « Le texte en bref », mentions légales) | Carte, intitulé en gras au-dessus de sa valeur, rangées séparées d'un filet de 1 px ; code en chasse fixe, pastille sombre au texte ambre. |
| Causes | Cartes ; sur la page panne, avant le texte. |
| Historique du dossier | Carte, une entrée par rangée séparée d'un filet, date en gras, du plus récent au plus ancien. |
| Tableaux du texte | Bloc de la charte. Sur téléphone, en cartes quand une colonne porte un texte long, ou au-delà de trois colonnes : la première cellule de la rangée est le titre de la carte, l'intitulé de la colonne précède chaque autre valeur, rôles du tableau écrits. Cas décrits par marque : une seule carte, un cas par rangée, un filet entre deux cas, la marque en tête. Sous 360 px, une cellule coupe un mot trop long. |
| Étapes d'un tutoriel | Cartes numérotées, sans retrait de liste. |
| Listes sans puces (questions de l'arbre, étapes, historique) | `role="list"`, comme l'encadré. |
| Rangée « dépannage sur autoroute » | Rangée du coût de l'encadré : cellule sombre, objet du montant en gras, texte validé inchangé ; sans triangle (forme réservée aux verdicts). |
| Ligne d'écart | Lien « Votre marque » vers la partie du voyant au tableau des notices : sur la page, ou sur la page du voyant que le plan lie à la page ; page outil : vers la page du voyant quand elle est construite, jamais sur la ligne STOP. |
| Page du socle et 404 | Tête de page nuit sans encadré, même écart entre la mention et le H1 que les pages éditoriales ; fiche de l'auteur et « Méthode » en cartes ; 404 : phrase, un seul bouton « Trouver mon voyant » (aucun dans le bandeau), lien vers l'accueil, pied de page en bas de l'écran. |
| Bandeau sous 360 px | Le dessin du bouton « Trouver mon voyant » s'efface, son texte reste ; nom du site et marges resserrés (aucun défilement horizontal à 320 px). |

**§5** — ajouter :
> Ces règles sont vérifiées par les contrôles du dépôt (FORMAT2-*, R9-*, TABLEAU-NOTICES-*, CITATIONS-PART ; catalogue :
> `CONTROLES.md`) ; les hauteurs (2a, 2h, 2i) et le débordement à 320, 375 et 1366 px sont mesurés dans un navigateur
> (FORMAT2-MESURES), police chargée et police de secours.

### 6.2 `docs/10_charte_editoriale.md`

**§4 Structure d'une page éditoriale** — ajouter après la liste :
> **Au format 2** (demande de changement n° 30, charte graphique §4) : mention en tête, fil d'Ariane, H1, encadré de
> décision, signature, ligne de transparence, bloc « Notices / Base du coût », illustration, sommaire, corps du modèle,
> tableau des notices, emplacement publicitaire, pages liées, « Sources » repliée. Page panne : fiches, causes, puis texte
> (ordre revu si la demande n° 32 est acceptée). Sur la page outil, le renvoi vers la liste est un bouton, sans icône
> (point 4 ci-dessus : une icône seulement si elle double un texte), et l'introduction de l'outil tient en deux paragraphes,
> sans changer un mot.

**§3.5 Longueur** — ajouter :
> Au format 2 : paragraphes de trois phrases au plus (FORMAT2-PARAGRAPHES), étapes en liste numérotée, comparaisons en
> tableau.

**§4, repères et méthode** — ajouter :
> Repère du verdict : seulement sous un H2 qui pose la question d'une seule ligne de l'encadré ; une section qui mêle
> plusieurs cas n'en a pas. Le texte nomme la marque et le modèle ; ni « Verdict retenu », ni « consigne retenue », ni
> édition, ni page écrite à la main : les références vont dans « Sources » par `{{cite:…}}` (règle 2d, FORMAT2-METHODE).

### 6.3 `docs/08_structure_contenus.md` (vue lisible des schémas)

Champs ajoutés au lot F1 (déjà dans `src/schemas/`) :
> - `format` (toute page, socle compris) : 1 ou 2 ; absent = 1. Vagues B et C : 2. Vague A : 2 seulement avec son lot
>   (`config/lots-format2.json`, FORMAT2-VAGUE).
> - `illustration` (page éditoriale au format 2, obligatoire) : `fichier` (SVG de `src/illustrations`), `alt`, `legende`
>   terminée par « Illustration decodauto. ».
> - `reponse_directe` (pages pneus et obligations seulement) : réponse directe à la question du lecteur, 40 mots au plus,
>   en tête de l'encadré (règle 2c) ; exigée sur une page informative au format 2.
> - Base voyants, `ecart_court` (ligne dont les marques divergent, format 2) : ligne d'écart de 25 mots au plus avec
>   « Votre marque », qui nomme les marques plus et moins strictes.
> - Base voyants, citation d'une notice, `demande` : ce que demande la notice, en une phrase, pour la colonne du tableau des
>   notices.

### 6.4 `docs/03_plan_avancement_et_regles.md`, liste de recette de l'étape 9 (lots au format 2)

> Pour un lot au format 2, en plus de la liste actuelle :
> - rendu sur un vrai téléphone : première situation lisible sans défiler, ligne d'écart, sommaire, tableaux en cartes ;
> - filtre de l'outil voyants et index des dessins au doigt ;
> - navigation au clavier : contour de focus visible sur fond clair et sur fond sombre ;
> - repères de section : un repère seulement sous un H2 qui pose la question d'une seule ligne de l'encadré ;
> - texte : marque et modèle nommés ; ni « Verdict retenu », ni « consigne retenue », ni édition, ni page écrite à la main ;
>   « comparaisons en tableau » quand le texte compare ;
> - le dessin de l'illustration montre où regarder ou quoi faire ;
> - liste des H2 avant et après (aucune question retirée).
