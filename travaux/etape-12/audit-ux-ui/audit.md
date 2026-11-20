# Audit UX/UI du site : constats, propositions et maquettes (brouillon, jamais validé)

Fait par Claude dans la nuit du 20 au 21/11/2026, à la demande de Houssem (20/11, 21 h 39). Sa demande, en substance :
- un audit de la partie visuelle, pour un UX et un UI meilleurs ;
- un visiteur trouve l'information simplement ; elle est utile, simple à lire et belle ;
- une revue des photos ;
- tout aligné avec le SEO.

Rien n'est appliqué au site : ce document propose, Houssem décide. Chaque proposition retenue passera ensuite par son lot :
- demande de changement si une règle validée change ;
- captures, revue indépendante et validation.

## 1. Méthode
- **Construction** : celle de la CI de la PR n° 93, identique au site en ligne depuis la fusion du 20/11 à 21 h 46, servie
  en local.
- **Pages capturées** (13 types) : accueil, outil voyants, deux pages voyants, un code défaut, une panne, deux pages
  « niveaux et fluides », deux pages « pneus et obligations », le dossier PureTech, « à propos » et la 404.
- **Mesures** (Playwright, `outils/auditer.cjs`, résultats dans `captures/mesures.json`) :
  - tailles : 375 × 667 et 1366 × 800 ;
  - police du système : Inter, proche des téléphones, comme les mesures de la CI ;
  - mesuré : positions des blocs, hauteurs, typographie, cibles tactiles.
- **Données de la CI du 20/11** : mesures du format 2 (FORMAT2-MESURES) et Lighthouse mobile (médiane de 3 passages, 40
  pages).
- **Search Console** : relevé J+7 (`travaux/etape-12/suivi-search-console/releve-j7.md`).
- **Maquettes** : les propositions sont appliquées à la construction réelle (`outils/maquettes.cjs`, styles et blocs
  injectés), puis capturées :
  - police chargée et police de secours ;
  - mesures avant et après (`outils/mesures-maquettes.cjs`).
- **Limites** :
  - aucun test avec de vrais lecteurs ;
  - mesures avec Inter, pas sur un vrai téléphone ;
  - Search Console encore trop jeune pour juger le comportement des visiteurs (0 clic au 18/11).

## 2. Ce qui marche, à garder
- **La décision d'abord.** La règle 2a (première situation dans le premier écran du téléphone, avec son verdict et son
  urgence) est vérifiée par la CI sur toutes les pages éditoriales. Bas de la première situation à 375 px : voyant moteur
  636 px, code P0420 660 px, panne « ne démarre pas » 554 px. Les pastilles de verdict se lisent sans la couleur (forme
  et texte).
- **Technique** :
  - Lighthouse à 100 en performance, accessibilité, bonnes pratiques et SEO, sur les 40 pages ;
  - CLS 0 ;
  - LCP de 0,75 à 1,06 s (CI du 20/11).

  Toute proposition doit garder ces chiffres.
- **Lecture du texte rédigé** : 16 px, interligne 1,55, environ 41 caractères par ligne sur téléphone.
- **Accueil** : la grille de pictogrammes « Quel voyant s'est allumé ? » est dans le premier écran, sur téléphone comme
  sur ordinateur.
- **Repères dans les pages** : « À lire aussi » en pastilles avec icônes, « Sources » repliée, sommaire « Sur cette
  page ».
- **Illustrations** : une illustration dessinée pour le site sur chaque page éditoriale, cohérente et signalée.

## 3. Constats, du plus important au moins important
**C1. Navigation presque absente hors de l'accueil (fort).**
- Le bandeau ne porte que le nom du site et « Trouver mon voyant ». Le pied de page ne porte que « Signaler une erreur »
  et « Mentions légales et confidentialité ».
- Un lecteur arrivé de Google sur une page n'a pour aller ailleurs que trois chemins :
  - le fil d'Ariane ;
  - les 4 à 13 liens de « À lire aussi » ;
  - l'accueil.
- « À propos » (auteur, méthode) n'est lié que depuis l'accueil et le lien « Méthode » de la ligne de transparence.
- Côté SEO, chaque page reçoit peu de liens internes. 12 pages étaient « explorées, actuellement non indexées » au rapport
  du 16/11. Un maillage plus dense aide Google à juger les pages, sans garantie.

**C2. Outil voyants : la grille arrive tard (fort).**
- Sur téléphone, la grille des dessins, cœur de la page, commence à 2 421 px, soit 3,6 écrans. Avant elle viennent :
  - l'encadré : trois exemples et un bouton de renvoi, 1 244 px ;
  - la provenance ;
  - l'illustration ;
  - le sommaire et le filtre.
- La page fait 32,7 écrans, et le texte rédigé commence à 16 171 px.
- Sur l'accueil, la même grille est dans le premier écran.
- Cette page vise les requêtes larges (« voyant orange voiture », liste des voyants) : le visiteur doit chercher l'outil.

**C3. Le bloc « Notices / Base du coût », long et en petit texte gris (moyen).**
- Entre la fin de l'encadré et l'illustration, il y a la signature, la ligne de transparence et le bloc « Notices / Base
  du coût », en 13 px gris : de 265 px (loi montagne) à 804 px (niveau d'huile, 1,2 écran) au téléphone.
- C'est utile à la confiance, mais lourd à cet endroit : le lecteur sort de la décision et bute sur un mur de méthode
  avant l'illustration et le texte.

**C4. Pages longues, encadrés longs (moyen).**
- Au téléphone, les pages font de 11 à 20 écrans (outil : 33).
- L'encadré fait de 1 à 3,2 écrans quand il compte cinq ou six situations :
  - dossier PureTech : 2 112 px ;
  - niveau d'huile : 1 999 px ;
  - voiture qui ne démarre pas : 1 926 px.
- Le sommaire existe, mais au téléphone ses pastilles défilent de côté : une pastille et demie visible.
- Rien n'est caché dans l'encadré (règle) : la longueur vient du nombre de cas.

**C5. Accueil : listes de liens ternes (moyen).**
- 38 liens soulignés à puces, sous quatre thèmes.
- Cibles de 19 px de haut ; le seuil de WCAG 2.2 (2.5.8) est de 24 px. Lighthouse ne le relève pas.

**C6. Lecture sur ordinateur (faible).**
- Le texte rédigé fait 16 px sur 704 px de large, soit environ 85 caractères par ligne.
- On lit plus facilement entre 60 et 75 caractères.

**C7. Partage (faible, mais gratuit).**
- Aucune balise Open Graph : ni titre, ni description, ni image.
- Un lien partagé sur WhatsApp, Facebook ou LinkedIn s'affiche sans image ni description choisie.

**C8. Photos : aucune photo réelle (moyen à fort, selon le travail possible).**
- Les illustrations dessinées montrent où regarder, mais aucune page ne montre la vraie pièce : jauge, vase d'expansion,
  étiquette de pression, témoin d'usure, combiné au contact.
- Une photo réelle prise pour le site est un élément que le résumé IA de Google ne remplace pas. Elle montre une
  expérience de première main, et Google Images est une source de visites.
- Les données structurées excluent aujourd'hui toute image (règle du livrable 7.5a).

**C9. Titles et descriptions (à reprendre avec les données).**
- Titles de 47 à 68 caractères : 12 sur 40 dépassent 60, donc risquent d'être coupés sur mobile.
- Descriptions de 125 à 193 caractères : 28 dépassent 160.
- Un changement de title est encadré par la règle 14 (registre, 90 jours) : à revoir au relevé J+30, avec les requêtes
  réelles, pas maintenant.

## 4. Propositions classées
Ordre : effet sur le lecteur et sur le SEO, puis effort. Les maquettes sont dans `maquettes/`, toujours appliquées à la
construction réelle ; « avant » et « après » sont capturés à 375 × 667 et 1366 × 800, police chargée et police de
secours.

### P1. Menu du site et pied de page complet (C1). Recommandée, en premier
- **Bandeau** : un bouton « Menu » s'ajoute à côté de « Trouver mon voyant ».
  - Au téléphone, c'est une icône de trois traits, avec son nom pour les lecteurs d'écran.
  - Il ouvre un panneau sombre qui liste les pages construites par thème, comme l'accueil.
  - Le panneau prend 2 colonnes au téléphone, 4 colonnes sur ordinateur.
  - Il est fait d'un simple `details`, sans script : il marche partout, et ses liens sont lus par Google.
- **Pied de page** : il gagne les liens suivants :
  - « À propos » et « Méthode » ;
  - les quatre thèmes, qui mènent aux sections de l'accueil.
- **Mesures** (`mesures-maquettes`) :
  - le bandeau garde sa hauteur de 51 px et tient sur une ligne de 320 à 1366 px, avec les deux polices ;
  - la première situation ne bouge pas (voyant moteur 636 px, code P0420 660 px, à 375 px) ;
  - le panneau ouvert fait 961 px au téléphone et 596 px sur ordinateur, par-dessus la page ;
  - la page s'allonge de 79 px au téléphone (pied de page).
- **Condition** :
  - Pour tenir sur une ligne sous 390 px, « Trouver mon voyant » devient « Mon voyant » et le bandeau prend les marges
    serrées qui existent déjà sous 360 px.
  - Avec « Trouver mon voyant » complet à 375 px, la ligne passe à deux rangées en police de secours.
  - Ce libellé est à valider.
- **SEO** : chaque page lie toutes les autres. La profondeur de clic tombe à 1, et les nouvelles pages reçoivent des
  liens de tout le site.
- **Règles** :
  - liens de gabarit nouveaux, composant nouveau dans la charte : **demande de changement n° 40** à écrire si Houssem
    retient la proposition ;
  - contrôles à ajouter : menu généré depuis le plan, pages construites seulement, aucun lien mort.
- **Maquettes** : `m1-ferme-*` (bandeau, 320, 375 et 1366 px), `m1-ouvert-*` (panneau), `m1-pied-*` (pied de page).

### P2. Outil voyants : la grille des dessins dans l'encadré (C2). Recommandée
- **Changement** :
  - L'encadré garde sa question.
  - La phrase de renvoi devient « Touchez le dessin qui ressemble à votre voyant : la couleur ne suffit pas à décider. »
  - La grille des dessins vient tout de suite après, à la place des trois lignes d'exemple et du bouton.
  - Les exemples sont repris en bas de l'outil, ou retirés : ils doublent les cartes de la liste.
- **Mesures** :
  - la grille passe de 2 421 px à 322 px au téléphone, donc dans le premier écran ;
  - sur ordinateur, de 1 701 px à 258 px ;
  - la page perd 1 142 px.
- **Règles** : ordre de l'outil et contenu de son encadré (demandes n° 12 et n° 23) : **demande de changement n° 41**. À
  régler dans la mise en œuvre : le filtre par couleur doit suivre la grille déplacée (règles `:has`).
- **Maquettes** : `m2-outil-*`.

### P3. Bloc « Notices / Base du coût » replié (C3). Recommandée
- **Changement** :
  - La signature et la ligne de transparence restent visibles. Le lien « Méthode » aussi.
  - Le bloc passe dans un volet fermé : « Sur quoi s'appuient ces verdicts (notices lues, base du coût) », dessiné comme
    « Sources ».
  - L'illustration suit le volet, à la même place dans l'ordre (règle 2i).
- **Mesures** : l'illustration remonte, au téléphone :
  - de 589 px sur le niveau d'huile (3 023 à 2 434) ;
  - de 295 px sur la panne « ne démarre pas » ;
  - de 164 px sur le voyant moteur.

  Rien ne bouge dans l'encadré.
- **À vérifier dans la mise en œuvre** : sur les lignes saisies, le lien « Votre marque » mène dans ce bloc (ancres
  `#da-notices-ligne-<n>`). Il faut deux vérifications :
  - Chrome ouvre un `details` fermé quand on suit une ancre qui s'y trouve ; il reste à le vérifier sur Safari iOS ;
  - sinon, garder ces lignes visibles.
- **Règles** : le bloc vient de la règle 2d du format (« la méthode sort du texte ») : **demande de changement n° 42**.
- **Maquettes** : `m3-replie-*`, `m3-ouvert-*`.

### P4. Photos réelles (C8). Recommandée, si Houssem peut les prendre
- **Prises de vue proposées**, sur une voiture dont la notice est déjà citée par le site (Seat Ibiza, Peugeot 208, Renault
  Clio 5, Dacia Sandero 3, Toyota Yaris ou Citroën C3), une ou deux par page :

  | Page | Photo | Pourquoi |
  |---|---|---|
  | Niveau d'huile | jauge sortie et essuyée, repères mini et maxi en gros plan ; bouchon de remplissage | geste le plus cherché, repères difficiles à décrire |
  | Liquide de refroidissement | vase d'expansion, moteur froid, repères MIN et MAX | où regarder, à froid |
  | Liquide de frein | réservoir et ses repères | idem |
  | Pression des pneus | étiquette de pression sur le cadre de la porte conducteur, lisible | réponse directe de la page |
  | Usure des pneus | témoin d'usure au fond d'une rainure, repère TWI sur le flanc | question « quand changer » |
  | Outil voyants, voyant moteur | combiné au contact mis, voyants allumés (contrôle des lampes) | requêtes « voyants tableau de bord » |
  | Batterie | batterie sous le capot, bornes + et − | changer ou recharger |

- **Consignes de prise de vue** :
  - lumière du jour, net, cadrage horizontal, 1 600 px de large au moins ;
  - aucune plaque, aucun visage, aucun lieu reconnaissable ;
  - les métadonnées (position GPS) sont effacées avant la publication.
- **Légende type** : « Photo decodauto, sur une [marque, modèle] : l'emplacement varie selon la voiture, voir votre
  notice. »
- **Mise en œuvre** :
  - **Fichiers** : un registre des photos (fichier, texte alternatif, légende, crédit, date, voiture), des fichiers WebP en
    trois largeurs (`srcset`), largeur et hauteur posées, `loading="lazy"`, et les contrôles IMAGE-* existants.
  - **Données structurées** : la photo s'ajoute à l'Article (propriété `image`), ce que la règle 7.5a exclut aujourd'hui.
  - **Contrôles** : la photo ne doit déplacer ni le LCP ni le CLS.
  - **Règles** : structure des pages, données structurées : **demande de changement n° 43**.
- **Autre piste, en complément** : des photos sous licence libre (Wikimedia Commons), pour ce qui ne se photographie pas
  sur une voiture à essence récente. Exemples : le panneau B26 de la loi montagne, un voyant de préchauffage de diesel.
  - Chaque photo est créditée, avec sa licence, et acceptée par Houssem (règle du visuel).
  - Leur qualité est inégale : à choisir une par une.
- **Jamais** une image générée présentée comme une photo (règle 2i).

### P5. Accueil : pages de chaque thème en pastilles (C5)
- **Changement** :
  - Les listes à puces deviennent des pastilles, dessinées comme « À lire aussi » : 44 px de haut, 2 colonnes au
    téléphone, 3 sur ordinateur.
  - Chaque thème gagne une phrase de présentation (texte de maquette, à valider).
- **Mesures** :
  - cible la plus petite : de 19 à 44 px ;
  - page : 12 px de plus au téléphone, 64 px sur ordinateur.
- **Règles** : variante d'un composant existant ; validation de Houssem dans la charte graphique, sans demande de
  changement.
- **Maquettes** : `m4-accueil-*`.

### P6. Balises de partage Open Graph (C7)
- **Changement** : titre, description, adresse, type, langue, nom du site, plus une image de partage de 1 200 × 630 px
  tirée du dessin de la marque, comme les favicons.
- **Règles** :
  - rien de visible sur le site ;
  - une image nouvelle et quelques contrôles (balises présentes, image servie), dans un lot technique validé par
    Houssem.

### P7. Texte rédigé en 17 px sur ordinateur (C6)
- **Changement** : texte rédigé en 17 px, interligne 1,6, au-dessus de 64 rem. Le téléphone ne change pas, les pastilles
  de repère non plus.
- **Effet** : environ 80 caractères par ligne au lieu de 85, lecture plus posée.
- **Règles** : variante de la charte graphique (§3), à valider.
- **Maquettes** : `m6-lecture-*`.

### Écarté pour l'instant
- **Moteur de recherche interne** : il faut un script et un index. Avec 38 pages, le menu (P1) suffit.
- **Index des situations en tête de l'encadré** : il pousserait la première situation hors du premier écran (règle 2a).
- **Titles et descriptions** : à revoir avec les requêtes de J+30 (C9).

## 5. Ordre proposé
1. **Lot U1** : P1 (menu et pied de page) et P6 (Open Graph). C'est le plus utile au lecteur et au maillage, et rien ne
   bouge dans les pages.
2. **Lot U2** : P2 (outil) et P3 (bloc replié).
3. **Lot U3** : P4 (photos), dès que les premières photos sont prises.
4. **Lot U4** : P5 (accueil) et P7 (lecture sur ordinateur).

Chaque lot suit le même chemin :
- sa demande de changement s'il en faut une ;
- ses captures (375 et 1366 px, deux polices) ;
- une revue indépendante ;
- la validation de Houssem ;
- la recette de l'étape 9 et la vérification en ligne.

## 6. Décisions demandées à Houssem
1. Les propositions retenues, et l'ordre des lots.
2. Le libellé « Mon voyant » sous 390 px (P1).
3. Photos (P4) : peut-il les prendre ? Sur quelle voiture ? Accepte-t-il que le modèle soit nommé dans la légende ?
