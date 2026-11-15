# Pilote F1 (étape 13 avancée, demande de changement n° 30) : porte du format, version 2

Maquette statique, jamais déployée. Quatre pages au nouveau format : accueil, voyant moteur, voyant AdBlue et pression des pneus. Trois pistes d'identité visuelle :

- **A « Atelier »** : papier et encre, filets, situations numérotées, tampons de verdict. Titres en Bricolage Grotesque.
- **B « Tableau de bord »** : encadré sombre, voyants « allumés », pastilles lumineuses. Titres en Outfit.
- **C « Route »** : cadres bleus des panneaux, plaques de couleur pour les verdicts. Titres en Big Shoulders.

Le texte courant est dans la police du système, comme le site en ligne.

Outils :
- `generer.py` : générateur ;
- `css/site.css` : styles ;
- `polices.py` : une police de titre par piste, sous licence OFL sans nom réservé, de 13 à 19 Ko, licence fournie ;
- `canvas.py` : canevas Design ;
- `porte/verifier_porte.py` : mesures à 375 × 667 visibles, barre de la maquette masquée, police chargée puis police de secours ;
- `porte/perf.py` : estimation de performance.

Résultats : `porte/resultats-v2.json` et `porte/perf.json`.

## 1. Règles 2a à 2m, mesurées sur les trois pistes

Chaque intervalle couvre les trois pistes et les deux états de police. Un « écran » fait 667 px de haut, sauf mention « écrans de 812 px » pour comparer avec le §1 de la demande.

| Règle | Mesure | Statut |
|---|---|---|
| 2a. Première situation complète dans le premier écran (667 px) | Voyant moteur : de 522 à 565 px. AdBlue : de 601 à 629 px. Pression des pneus : de 766 à 809 px. Marge visée de 640 px, tenue sur moteur et AdBlue. | Validé pour moteur et AdBlue. **Non validé pour la pression des pneus** : voir la précision 1 (§2). |
| 2b. Ligne d'écart de 25 mots au plus, qui nomme les marques plus et moins strictes, puis renvoie au tableau | 7 lignes, de 22 à 25 mots, lien « Votre marque » compris. Comptage : mots contenant une lettre ou un chiffre. Le libellé « Selon la marque : » est lu par les lecteurs d'écran sans être affiché. | Validé |
| 2b (suite). Nombre de notices et base du coût sous l'encadré, en plus petit ; coût dans l'encadré ; rien de masqué | Bloc « Notices / Base du coût » après la signature et la ligne de transparence : l'ordre de la charte §4 et §5.1 est gardé. Rien n'est masqué dans l'encadré (0 sur 9 pages mesurées). | Validé |
| 2b (suite). Hauteur de l'encadré, avant et après | Voyant moteur : environ 2 517 px en ligne (3,1 écrans de 812 px), de 1 318 à 1 413 px dans la maquette (−44 à −48 %). AdBlue : environ 3 654 px, de 2 011 à 2 140 px (−41 à −45 %). Pression des pneus : environ 1 299 px, de 842 à 867 px, réponse directe comprise (−33 à −35 %). | Mesuré (sans seuil) |
| 2c. Page informative : l'encadré commence par la réponse directe | Pression des pneus : la réponse directe précède la ligne du voyant, sur les trois pistes. | Validé |
| 2d. Repère du verdict (forme et libellé) en tête des sections liées à l'encadré ; formule « Verdict retenu… », éditions et références hors du texte | Voyant moteur : 6 repères. Pression des pneus : 1 repère. Formule et mot « édition » absents du texte. AdBlue : corps non repris dans le pilote. | Validé (moteur et pression) |
| 2e. Paragraphes de 3 phrases au plus, étapes numérotées, comparaisons en tableau | Au plus 2 phrases par paragraphe (moteur) et 3 (pression). Étapes du gonflage numérotées. Tableaux : contrôle technique, synthèse AdBlue, notices par marque, pression par marque (en cartes sur téléphone). | Validé |
| 2f. Tableau des notices compact, extraits dépliables au libellé unique | Colonnes : notice, ce que demande la notice, niveau, page. Lignes : 13 (moteur), 7 (AdBlue, un groupe sur quatre), 7 (pression). Libellés uniques sur les trois pages ; extraits entiers de la base. | Validé |
| 2g. « Sources » repliée, avec le nombre | « Sources (11) » pour moteur, « (10) » pour AdBlue et pression. | Validé |
| 2h. Sommaire au-delà de 6 écrans | Les 3 pages éditoriales dépassent 6 écrans et ont un sommaire. Un seul sommaire sur ordinateur (colonne de côté). | Validé |
| 2i. Visuel après l'encadré, dans les 3 premiers écrans (2 001 px) | Haut du visuel. Voyant moteur : de 1 829 à 1 948 px. Pression des pneus : de 1 329 à 1 391 px. AdBlue : de 2 574 à 2 713 px, l'encadré faisant seul de 2 011 à 2 140 px. | Validé pour moteur et pression. **Non validé pour AdBlue** : voir la précision 2 (§2). |
| 2j. Aucune question retirée ; part citée d'un tiers au plus | H2 de la production : 12 sur 12 (moteur), 9 sur 9 (pression), 6 sur 6 (AdBlue). Part citée estimée avec la formule de `scripts/lib/dist.ts`, sommaire exclu : moteur 20,6 %, pression 16,6 %. | Validé (estimation : le vrai contrôle tournera à la mise en œuvre) |
| 2k. Accueil : grille des pictogrammes et accès par thème | 18 pictogrammes, tirés de la base, un lien par voyant. La grille commence dans le premier écran du téléphone sur les trois pistes. L'outil n'est pas dans le pilote (lot F2). | Validé (accueil) |
| 2l. Mention en tête inchangée ; ligne de transparence au même texte | Textes de `src/lib/charte.ts`. Mention dans le premier écran (bas entre 99 et 106 px), en 16 px comme le texte courant. Contraste minimal de tout le texte : 5,5 pour 1 (seuil AA : 4,5). | Validé |
| 2m. Emplacements factices, jamais entre le H1 et l'encadré | Après le tableau des notices, sur les 3 pages éditoriales. L'encadré est le premier bloc après le H1 sur les 9 pages. | Validé |

Hauteur des pages, en écrans de 812 px :
- voyant moteur : de 13,5 à 13,9 (20,1 en ligne, soit −31 à −33 %) ;
- pression des pneus : de 11,5 à 11,7 (11,8 en ligne) : rien n'est retiré, et le tableau des notices et l'illustration sont ajoutés ;
- AdBlue : sans comparaison possible, son corps n'est pas repris.

## 2. Deux précisions proposées à Houssem

Elles viennent des mesures. Ces deux règles ne peuvent pas tenir sans raccourcir un texte validé, ce que la demande interdit (§4, point 3).

1. **2a sur une page informative** (pression des pneus ; en vague C, huiles et liquides). La réponse directe passe d'abord (2c). Or l'action validée de la ligne du voyant fait 55 mots, soit environ 190 px sur téléphone.
   - **Précision proposée** : la réponse directe est complète dans le premier écran, et la première situation y commence avec son verdict et son urgence ; son action peut continuer au-delà.
   - **Mesures** : réponse de 405 à 446 px ; verdict et urgence de 576 à 619 px.
2. **2i quand le bas de l'encadré dépasse à lui seul trois écrans** (AdBlue : quatre lignes validées).
   - **Précision proposée** : le visuel suit immédiatement le bloc « Notices / Base du coût ». Dans les autres cas, il reste dans les trois premiers écrans.

## 3. À faire à la mise en œuvre (lots F1 à F3)

**Lighthouse.** Lighthouse mobile ≥ 95 et CLS < 0,1 sur toutes les adresses de la liste, mesurés par la CI (impossible ici).
- Estimation de la maquette, avec `porte/perf.py` (réseau lent et processeur ralenti ; ce n'est pas Lighthouse) : LCP de 0,57 à 0,75 s, CLS 0.
- Une seule police de titre par piste, en `font-display: optional`. Elle ne décale rien. Au premier passage sur un réseau lent, c'est la police du système qui s'affiche : les mesures « police de secours » couvrent ce cas.

**Modèles.** Les modèles lisent `src/content` et la base : aucun texte n'est recopié à la main. Les textes de `generer.py` sont des copies faites pour la maquette.

**Contrôles à adapter.**
- R9 : encadré et ligne d'écart.
- TABLEAU-NOTICES-* : tableau en lignes `tr`, colonne « Ce que demande la notice ».
- CITATIONS-PART : sommaire à exclure, comme le fil d'Ariane.
- Empreintes R4 : ligne d'écart et place du nombre de notices.
- Nouveaux contrôles pour les règles 2a à 2m vérifiables par une machine, dont la marge de 640 px de 2a.
- Libellé court de chaque pictogramme pour la grille de l'accueil : un champ à ajouter, par une demande de changement de la structure, ou le libellé court de la page.

**Textes nouveaux.** Houssem les valide avec les paquets des lots F2 et F3 ; les verdicts ne changent pas.
- Les lignes « Plus strict… Moins stricts… ».
- La colonne « Ce que demande la notice ».
- La question et la réponse directe de la pression des pneus. La question en ligne (« Puis-je rouler avec des pneus sous-gonflés… ») étend le verdict du voyant à tout sous-gonflage ; elle est plus prudente, sans danger, et sera corrigée en F3.
- Les légendes des illustrations.
- Le corps raccourci du voyant moteur.

**Hors du pilote.**
- Le corps de la page AdBlue et les trois autres groupes de son tableau des notices (F2).
- L'outil voyants (F2).
- Les codes, la loi montagne et le socle (F3).
- Les modèles panne et dossier, avant les exemples de la porte 10.
- Un vrai téléphone, Firefox et Safari.
- Les notices papier pour l'emplacement de l'étiquette : l'illustration classe « cadre de la porte » (Seat, Toyota) en « encadrement ».

## 4. Revue indépendante (deux revues, le maximum)

**Première revue : « à corriger », 2 points bloquants, 9 importants et 7 mineurs. Tous ont été corrigés.**
- Bloquants :
  - un écart faux : sur le voyant qui clignote, Seat était rangé parmi les moins stricts ;
  - quatre questions retirées de la pression des pneus, dont la consigne remorque.
- Importants :
  - lignes d'écart incomplètes ;
  - phrase AdBlue (Citroën C3 1.6 BlueHDi) ;
  - question de la pression qui étendait le verdict ;
  - tableau des notices absent de la pression ;
  - base du coût absente ;
  - libellés en double ;
  - marge de 2a ;
  - visuel placé avant la ligne de transparence (charte §5.1) ;
  - polices trop lourdes (de 139 à 209 Ko) ;
  - pistes trop proches.
- Mineurs : phrases du voyant moteur, légende AdBlue, nombre de notices par ligne, repère sans forme, textes illisibles dans les illustrations, emplacement de l'étiquette, sommaire en double, grille sous le premier écran.

**Seconde revue : « à corriger », rien de bloquant, 6 importants. Tous ont été corrigés.**
- Écart du voyant qui clignote : Toyota seule « plus stricte », puis Peugeot et Seat, avec le catalyseur.
- Fiche « Le texte en bref » reprise mot pour mot de la production : la contre-visite ne concerne que la défaillance majeure.
- Mesures relancées : l'encadré est le premier bloc après le H1 partout.
- Grille de l'accueil tirée de la base : 18 dessins, dont le niveau d'huile et l'airbag passager désactivé.
- Piste C : le tracé intérieur des icônes de gravité, blanc sur blanc, prend la couleur de la plaque.
- Marge de 2a : 640 px au plus sur moteur et AdBlue.
- Mineurs corrigés :
  - « ou réseau » rétabli dans la ligne « démarrage impossible » ;
  - « immédiatement » et « compatible avec la circulation » rétablis dans la colonne « Ce que demande la notice » ;
  - extraits AdBlue entiers, tirés de la base ;
  - attribution à la notice dans « Comment éteindre » ;
  - « à froid » ajouté dans la réponse directe ;
  - méthode du script.

**Écarté.**
- « Renault ne donne pas de consigne pour le témoin seul » n'entre pas dans la ligne d'écart, qui est à 25 mots. L'information reste sur la page du voyant de pression des pneus.

**Reste à vérifier.**
- Les notices papier.
- Un vrai téléphone.
- Lighthouse.
- Le vrai contrôle CITATIONS-PART.
