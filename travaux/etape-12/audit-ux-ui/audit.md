# Audit UX/UI du site : constats, propositions et maquettes (brouillon, jamais validé)

Fait par Claude dans la nuit du 20 au 21/11/2026, à la demande de Houssem (20/11, 21 h 39). Sa demande, en substance :
- un audit de la partie visuelle, pour un UX et un UI meilleurs ;
- un visiteur trouve l'information simplement ; elle est utile, simple à lire et belle ;
- une revue des photos ;
- tout aligné avec le SEO.

**Version 2** (21/11, nuit), après la revue indépendante : ce qu'elle a changé, ce que j'ai écarté et ce qui n'a pas été
relu sont au §7.

Rien n'est appliqué au site : ce document propose, Houssem décide. Chaque proposition retenue passera ensuite par son lot :
- demande de changement si une règle validée change ;
- captures, revue indépendante et validation.

## 1. Méthode
- **Construction** : celle de la CI de la PR n° 93, identique au site en ligne depuis la fusion du 20/11 à 21 h 46, servie
  en local.
- **Pages capturées** (13 types) : accueil, outil voyants, deux pages voyants, un code défaut, une panne, deux pages
  « niveaux et fluides », deux pages « pneus et obligations », le dossier PureTech, « à propos » et la 404.
- **Mesures** (Playwright, outils dans `outils/`) :
  - tailles : 375 × 667 et 1366 × 800, plus 320 × 640 et 390 × 844 pour le bandeau ;
  - police du système : Inter, proche des téléphones, comme les mesures de la CI ;
  - état actuel : `outils/auditer.cjs`, résultats dans `captures/mesures.json`. Le champ `taillePolice` y mesure la
    signature (13 px), pas le texte rédigé : erreur du script. La taille du texte rédigé vient de la charte (16 px) et des
    mesures ci-dessous ;
  - maquettes, avant et après : `outils/mesures-maquettes.cjs` → `mesures-maquettes.txt` ;
  - bandeau du menu à 23 largeurs de 320 à 1366 px : `outils/largeurs-p1.cjs` → `mesures-p1-largeurs.json` et
    `mesures-p1-largeurs-intermediaires.json` (204 cas) ;
  - volet partiel de la provenance sur les 37 pages éditoriales : `outils/p3-partiel-toutes.cjs` →
    `mesures-p3-partiel.json` ;
  - ligne d'exemple de l'outil : `outils/action-m2.cjs` → `mesures-p2-action.txt` ;
  - poids du menu : `outils/poids-menu.cjs`.
- **Données de la CI du 20/11** : mesures du format 2 (FORMAT2-MESURES) et Lighthouse mobile (médiane de 3 passages, 40
  pages).
- **Search Console** : relevé J+7 (`travaux/etape-12/suivi-search-console/releve-j7.md`).
- **Maquettes** : les propositions sont appliquées à la construction réelle (`outils/maquettes.cjs`, styles et blocs
  injectés), puis capturées, police chargée et police de secours. Les maquettes écartées sont dans
  `maquettes/ecartees/`.
- **Limites** :
  - aucun test avec de vrais lecteurs ;
  - mesures avec Inter, pas sur un vrai téléphone (Safari iOS non essayé) ;
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
- **Lecture du texte rédigé au téléphone** : 16 px, interligne 1,55, 42 caractères par ligne (médiane mesurée).
- **Accueil** : la grille de pictogrammes « Quel voyant s'est allumé ? » est dans le premier écran, sur téléphone comme
  sur ordinateur.
- **Repères dans les pages** : « À lire aussi » en pastilles avec icônes, « Sources » repliée, sommaire « Sur cette
  page ».
- **Illustrations** : une illustration dessinée pour le site sur chaque page éditoriale, cohérente et signalée.

## 3. Constats, du plus important au moins important
**C1. Navigation : peu de chemins hors de l'accueil, et dix pages presque isolées (fort).**
- Le bandeau ne porte que le nom du site et « Trouver mon voyant ». Le pied de page ne porte que « Signaler une erreur »
  et « Mentions légales et confidentialité ».
- Un lecteur arrivé de Google sur une page n'a pour aller ailleurs que le fil d'Ariane, « À lire aussi » et l'accueil.
- « À lire aussi » compte de 0 à 10 liens selon la page (l'outil a à part 1 lien et 11 pages enfants). Dix pages en ont
  un ou aucun :
  - aucun : huile 10W40 ;
  - un : huiles 5W30 et 5W40, liquide de frein, liquide de refroidissement, voyants AdBlue, airbag et direction, changer
    et recharger la batterie.
- « À propos » (auteur, méthode) n'est lié que depuis l'accueil et le lien « Méthode » de la ligne de transparence.
- Côté SEO, l'accueil lie déjà toutes les pages construites, et chaque page lie l'accueil : toute page est à deux clics
  au plus. Ce qui manque à Google, comme au lecteur, c'est le lien entre pages proches (P0).

**C2. Outil voyants : la grille arrive tard (fort).**
- Sur téléphone, la grille des dessins, cœur de la page, commence à 2 421 px, soit 3,6 écrans. Avant elle viennent :
  - l'encadré : trois exemples et un bouton de renvoi, 1 244 px ;
  - la provenance ;
  - l'illustration ;
  - le sommaire et le filtre.
- La page fait 32,7 écrans, et le texte rédigé commence à 16 171 px.
- Sur l'accueil, la même grille est dans le premier écran.
- Cette page vise les requêtes larges (« voyant orange voiture », « voyant tableau de bord ») : le visiteur doit chercher
  l'outil.

**C3. Le bloc « Notices / Base du coût », long et en petit texte gris (moyen).**
- Entre la fin de l'encadré et l'illustration, il y a la signature, la ligne de transparence et le bloc « Notices / Base
  du coût », en 13 px gris : de 117 px (huiles 5W40 et 10W40) à 656 px (niveau d'huile) au téléphone, 249 px en médiane.
- C'est utile à la confiance, mais lourd à cet endroit. Après mesure, le replier rapporte peu (P3, écartée).

**C4. Pages longues, encadrés longs (moyen).**
- Au téléphone, les pages éditoriales font de 9,8 à 20,4 écrans (outil : 32,7).
- L'encadré fait de 1 à 3,2 écrans quand il compte cinq ou six situations :
  - dossier PureTech : 2 112 px ;
  - niveau d'huile : 1 999 px ;
  - voiture qui ne démarre pas : 1 926 px.
- Rien n'est caché dans l'encadré (règle) : la longueur vient du nombre de cas. Le sommaire « Sur cette page », validé
  avec le format, sert de raccourci.

**C5. Accueil : listes de liens ternes (moyen).**
- 38 liens soulignés à puces, sous quatre thèmes.
- Cibles de 19 px de haut, petites au doigt. Lighthouse ne relève rien.

**C6. Lecture sur ordinateur (faible).**
- Le texte rédigé fait 16 px sur 704 px de large : 90 caractères par ligne en médiane mesurée (de 82 à 98).
- On lit plus facilement entre 60 et 75 caractères.

**C7. Partage (faible, mais peu coûteux).**
- Aucune balise Open Graph : ni titre, ni description, ni image.
- Un lien partagé sur WhatsApp, Facebook ou LinkedIn s'affiche sans image ni description choisie.

**C8. Photos : aucune photo réelle (moyen).**
- Décision du 15/11 (20 h 55, demande n° 30, §7) : Houssem ne peut pas fournir de photos ; le visuel de chaque page est
  une illustration dessinée pour le site, signalée comme telle ; une photo sous licence libre seulement avec son accord,
  pour chaque téléchargement.
- Les illustrations montrent où regarder, mais aucune page ne montre la vraie pièce : jauge, vase d'expansion, étiquette
  de pression, témoin d'usure, panneaux de la loi montagne.
- Les données structurées excluent aujourd'hui toute image (règle du livrable 7.5a). La recette des exemples le signale
  déjà : Google recommande une image pour les articles.

**C9. Titles et descriptions (à reprendre avec les données).**
- Titles de 25 à 68 caractères : 12 sur 40 dépassent 60, donc risquent d'être coupés sur mobile.
- Descriptions de 125 à 193 caractères : 28 dépassent 160.
- C'est l'idée reportée « Longueur des title et des meta descriptions (contrôle ou alerte) » du journal, proposée par la
  revue de 6.5. Un changement de title est encadré par la règle 14 (registre, 90 jours) : à revoir au relevé J+30, avec
  les requêtes réelles, pas maintenant.

**C10. Pictogrammes et illustrations invisibles pour Google Images (moyen).**
- Ils sont écrits dans la page (SVG en ligne). La documentation de Google (« Bonnes pratiques de SEO pour Google
  Images », mise à jour le 03/03/2026) dit trouver les images dans l'attribut `src` de `<img>`, accepte le format SVG, et
  ne parle du `<svg>` en ligne que pour son texte alternatif. À notre connaissance, nos dessins ne peuvent donc pas
  apparaître dans Google Images.
- Des requêtes du périmètre cherchent un dessin (`docs/05`, volumes indicatifs par mois) : « logo huile moteur » 3 160 ;
  « pictogramme tableau de bord », « symbole tableau de bord », « logo tableau de bord », « icones tableau de bord
  voiture », « logo abs », « logo liquide de frein », « logo pression des pneus » 316 chacune.

## 4. Propositions classées
Ordre : effet sur le lecteur et sur le SEO, puis effort. Les maquettes sont dans `maquettes/`, toujours appliquées à la
construction réelle ; « avant » et « après » sont capturés à 375 × 667 et 1366 × 800, police chargée et police de
secours.

### P0. Liens du plan pour les pages peu liées (C1). Recommandée, en premier
- **Changement** : huit paires de liens ajoutées au plan, donc à « À lire aussi » des deux pages :

  | Paire | Justification |
  |---|---|
  | Changer la batterie ↔ Recharger la batterie | pages sœurs : le lecteur hésite entre les deux, et aucune ne lie l'autre |
  | Huile 10W40 ↔ Huile 5W30 | la page 10W40 cite la 5W-30 (notice Toyota Yaris) |
  | Huile 10W40 ↔ Huile 5W40 | même question, « quelle huile mettre » ; la page 10W40 n'a aujourd'hui aucun lien |
  | Voyant de direction ↔ Contre-visite | la page du voyant a une section « Voyant de direction assistée au contrôle technique » |
  | Voyant de direction ↔ Recharger la batterie | une cause que liste la page : charge de la batterie insuffisante |
  | Liquide de refroidissement ↔ Liquide de frein | même geste : lire un niveau sous le capot, entre MIN et MAX |
  | Liquide de refroidissement ↔ Niveau d'huile | même geste |
  | Liquide de frein ↔ Niveau d'huile | même geste |

- **Effet** : liens de « À lire aussi » de huile 10W40 0 → 2 ; 5W30, 5W40 et changer la batterie 1 → 2 ; liquide de
  frein, liquide de refroidissement, voyant de direction et recharger la batterie 1 → 3.
- **Laissées à un lien** : voyants AdBlue et airbag. Leur texte ne cite aucune page proche du plan ; le fil d'Ariane
  mène à l'outil, leur page mère, et le menu (P1) au reste.
- **Règles** : procédure existante, sans demande de changement (décision du 23/10) : une paire se propose dans la pull
  request du lot, avec sa ligne de justification, et Houssem la valide avec le lot. Dix pages en ligne changent de « À
  lire aussi » : recette de l'étape 9 sur ces pages ; dates « Mis à jour le » inchangées (règle 14 b : ni texte, ni
  conseil, ni source ne changent).

### P1. Menu du site et pied de page complet (C1). Recommandée
- **Bandeau** : un bouton « Menu » s'ajoute à côté de « Trouver mon voyant ».
  - Au téléphone, c'est une icône de trois traits, de 44 × 33 px, avec son nom pour les lecteurs d'écran ; sur
    ordinateur, l'icône et le mot « Menu » (79 × 33 px).
  - Sous 30 rem (480 px), le bandeau prend des marges serrées, et « Trouver mon voyant » s'affiche « Mon voyant » ; son
    nom accessible reste « Trouver mon voyant ».
  - Focus visible : la règle commune de la charte (`charte-b.css`, `summary:focus-visible`).
- **Panneau** : il liste les pages construites, par thème, sous les titres de l'accueil.
  - Chaque thème est un volet (`details`), avec son nombre de pages ; au téléphone, seul le thème de la page affichée est
    ouvert, et la page affichée est marquée (`aria-current="page"`).
  - Sur ordinateur, les quatre thèmes s'affichent ouverts, en 4 colonnes, là où le navigateur connaît
    `::details-content` ; ailleurs, ils restent des volets à ouvrir.
  - Fait de `details` imbriqués, sans script : il marche au clavier et au toucher, et ses liens sont lus par Google.
  - Sur toutes les pages, 404 comprise.
- **Pied de page** : il gagne « À propos », « Méthode » et les quatre thèmes, qui mènent aux sections de l'accueil.
- **Mesures** :
  - le bandeau garde sa hauteur (50 ou 51 px) et la première situation ne bouge pas, dans les 204 cas mesurés : 14
    largeurs de 320 à 1366 px sur 6 pages, 404 comprise, et 9 largeurs intermédiaires sur 2 pages, deux polices ;
  - panneau ouvert : 496 px au téléphone sur une page voyant (thème ouvert), 200 px sur la 404 (thèmes fermés), 616 px
    sur ordinateur ; il passe par-dessus la page, sans la pousser ;
  - la page s'allonge de 75 ou 76 px au téléphone et de 24 px sur ordinateur (pied de page) ;
  - poids : 3,3 Ko de HTML par page (0,9 Ko compressé) pour 37 liens, et 3,7 Ko de styles (1,3 Ko compressé, en cache).
- **Pour qui** : surtout pour le lecteur, qui passe d'un sujet à l'autre sans revenir à l'accueil. Pour Google, l'effet
  attendu est faible : l'accueil lie déjà toutes les pages (C1).
- **Règles** : liens de gabarit nouveaux et composant nouveau dans la charte : **demande de changement n° 40**
  (`demande-changement-40.md`, mise à jour pour cette version).
- **Maquettes** : `m1-ferme-*` (bandeau, 320, 375, 390 et 1366 px), `m1-ouvert-*` (panneau), `m1-pied-*` (pied de
  page).

### P2. Outil voyants : la grille des dessins dans l'encadré, variante légère (C2). Recommandée
- **Changement** :
  - L'encadré garde sa question et une seule ligne d'exemple : le voyant moteur orange fixe, « Non, arrêtez-vous
    immédiatement ». C'est l'exemple le plus utile pour la requête principale de la page, « voyant orange voiture ».
  - La phrase devient « Cette ligne est un exemple : la couleur ne suffit pas à décider. »
  - Puis « Touchez le dessin qui ressemble à votre voyant : » et la grille des dessins, rangée par couleur.
  - Le bouton « Trouvez votre voyant dans la liste » (demande n° 12) disparaît : la grille mène aux cartes de la liste.
  - Les exemples ABS et préchauffage restent dans la liste, comme toutes les lignes de la base.
  - Le filtre par couleur reste au-dessus de la liste, qu'il est seul à filtrer ; la grille de l'encadré montre toutes
    les couleurs.
- **Mesures** :
  - la grille passe de 2 421 à 760 px au téléphone (1,1 écran), de 1 701 à 490 px sur ordinateur (premier écran) ;
  - la ligne d'exemple reste complète dans le premier écran : bas de l'action à 594 px à 375 px, au lieu de 635 ;
  - la page perd 705 px au téléphone et 438 px sur ordinateur ; l'illustration descend de 87 px au téléphone.
- **Variante complète de la version 1 écartée** : la grille à la place des trois exemples laissait l'encadré sans aucune
  situation, contre la règle 2a et le contrôle R9-ENCADRE-CONTENU (`maquettes/ecartees/m2-outil-*`).
- **Règles** : **demande de changement n° 41**, à écrire si Houssem retient la proposition :
  - contenu et ordre de l'encadré de l'outil (demandes n° 12 et n° 23) ;
  - R9-ENCADRE-CONTENU : la consigne et la grille entrent dans l'encadré ;
  - OUTIL-INDEX : l'index n'est plus entre le filtre et le premier groupe ;
  - empreinte de l'encadré (R4) : deux lignes retirées, Houssem revalide l'encadré ;
  - règle 2a vérifiée sur la nouvelle mesure ; la règle 2k (outil en grille de pictogrammes) est mieux servie.
- **Maquettes** : `m2-leger-*`.

### P4. Photos réelles (C8). Seulement avec l'accord de Houssem, photo par photo
- **Point de départ** : la décision du 15/11. Sans photo de Houssem, deux chemins restent :
  1. **Photos sous licence libre** (Wikimedia Commons), là où la vraie pièce aide le lecteur. Chacune est choisie une
     par une, acceptée par Houssem avant son téléchargement, créditée (auteur, licence, lien), et copiée sur le site :
     jamais servie depuis un autre site (TIERS-RESSOURCE).
  2. **Les dessins publiés comme fichiers images** (P8), pour qu'ils comptent dans Google Images.
- **Prises de vue utiles**, si une photo devient possible :

  | Page | Photo | Pourquoi |
  |---|---|---|
  | Niveau d'huile | jauge sortie et essuyée, repères mini et maxi en gros plan ; bouchon de remplissage | geste le plus cherché, repères difficiles à décrire |
  | Liquide de refroidissement | vase d'expansion, moteur froid, repères MIN et MAX | où regarder, à froid |
  | Liquide de frein | réservoir et ses repères | idem |
  | Pression des pneus | étiquette de pression sur le cadre de la porte conducteur, lisible | réponse directe de la page |
  | Usure des pneus | témoin d'usure au fond d'une rainure, repère TWI sur le flanc | question « quand changer » |
  | Loi montagne | panneaux B58 et B59 (entrée et sortie de la zone), B26 (chaînes obligatoires) | les panneaux que cite la page |
  | Batterie | batterie sous le capot, bornes + et − | changer ou recharger |

- **Consignes** :
  - lumière du jour, net, cadrage horizontal, 1 600 px de large au moins ;
  - aucune plaque, aucun numéro de série (VIN), aucun kilométrage, aucun visage, aucun reflet ni lieu reconnaissable ;
  - photo prise pour le site : métadonnées EXIF et XMP effacées (position, appareil) avant le premier commit, et un
    contrôle qui refuse une image qui en garde ;
  - photo sous licence libre : l'auteur et la licence restent dans le crédit visible et dans le registre ;
  - quand la photo illustre une consigne de notice, la voiture photographiée correspond au modèle et à l'édition de la
    notice citée.
- **Légende type** : « Photo [crédit], sur une [marque, modèle] : l'emplacement varie selon la voiture, voir votre
  notice. »
- **Mise en œuvre** :
  - **conception d'abord** (règle 15) : place dans la page, maquettes au téléphone et sur ordinateur, avant le code ;
  - **fichiers** : un registre des photos (fichier, texte alternatif, légende, crédit, licence, date, voiture), des
    fichiers WebP en trois largeurs (`srcset`), largeur et hauteur posées, `loading="lazy"`, les contrôles IMAGE-*
    existants ;
  - **données structurées** : la photo s'ajoute à l'Article (propriété `image`), ce que la règle 7.5a exclut
    aujourd'hui ;
  - **contrôles** : la photo ne déplace ni le LCP ni le CLS ;
  - **règles** : structure des pages et données structurées : **demande de changement n° 42**.
- **Jamais** une image générée présentée comme une photo (règle 2i).

### P5. Accueil : pages de chaque thème en pastilles, dans les cartes (C5)
- **Changement** :
  - Les cartes blanches des thèmes restent.
  - Chaque lien devient une pastille de la forme « À lire aussi » (44 px de haut), sur le gris de la page : 2 colonnes
    au téléphone, une colonne par carte sur ordinateur.
  - Chaque thème gagne une phrase de présentation (texte de maquette, à valider).
  - Sans tuile de pictogramme : la grille des pictogrammes du haut de l'accueil les montre déjà, et au téléphone la tuile
    empêche les deux colonnes (essai : `maquettes/ecartees/m4b-essai-tuiles-*`).
- **Mesures** :
  - cible la plus petite : de 19 à 44 px ;
  - page : 178 px de plus à 375 px, 422 px sur ordinateur ; à 320 px, une seule colonne (1 017 px de plus).
- **Règles** : variante d'un composant existant ; elle entre dans la charte graphique et les styles, validée par Houssem,
  sans demande de changement.
- **Maquettes** : `m4b-accueil-*` (la version 1, sans les cartes, est dans `maquettes/ecartees/m4-accueil-*`).

### P6. Balises de partage Open Graph, avec une image par page (C7)
- **Changement** : titre, description, adresse, type, langue, nom du site, et une image de partage de 1 200 × 630 px
  **par page**, tirée de l'illustration de la page.
  - Google conseille une image « pertinente et représentative de la page » pour `og:image`, et d'éviter les images
    génériques comme un logo (documentation citée en C10) : l'image de la marque ne sert qu'à l'accueil, à « à propos »
    et aux mentions légales.
  - Les illustrations portent quelques étiquettes : à vérifier une par une à la taille d'un aperçu.
  - Les images sont produites hors de la construction, comme les favicons (`travaux/marque/generer-favicons.mjs`), avec
    leur empreinte contrôlée.
- **Règles** : rien de visible sur le site ; des fichiers nouveaux et des contrôles (balises présentes, image servie, une
  image par page), dans un lot technique validé par Houssem. Les balises Open Graph ne sont pas le balisage JSON-LD de
  la règle 7.5a, qui reste inchangé.

### P8. Pictogrammes et illustrations publiés comme fichiers images (C10)
- **Changement** :
  - Chaque pictogramme de la base devient un fichier SVG, une variante par couleur (un `<img>` ne reçoit pas la couleur
    de la page), au nom parlant (`/pictogrammes/voyant-huile-rouge.svg`).
  - Il est servi par `<img>` là où il paraît en grand : tuile de la page du voyant, cartes de l'outil, grille de
    l'accueil.
  - Texte alternatif descriptif là où le dessin porte le sens (« Pictogramme du voyant de pression d'huile, rouge ») ;
    vide là où il double un texte voisin.
  - Les illustrations de chaque page deviennent aussi des fichiers SVG servis par `<img>`, avec leur légende.
- **Ce que l'on gagne** : des dessins qui peuvent apparaître dans Google Images, sur des requêtes qui cherchent un dessin
  (C10). Rien ne le garantit : à essayer d'abord sur l'outil et trois pages voyants, puis à suivre dans Search Console
  (performances, type de recherche « Image »).
- **Ce que l'on paie** :
  - des requêtes de plus : l'outil affiche 63 pictogrammes, tirés de 18 dessins ; un fichier par dessin et par couleur,
    de moins de 1 Ko (sources de 318 à 619 octets), en cache ;
  - la lueur des voyants « allumés » passe d'un filtre sur le `<svg>` au même filtre sur l'`<img>`, à vérifier en capture ;
  - Lighthouse à 100, CLS à 0 et LCP sont à remesurer ;
  - des dessins plus faciles à copier : ils restent redessinés par nos soins.
- **Règles** : rendu des pictogrammes et contrôles PICTO-* : **demande de changement n° 43**. Conception d'abord
  (règle 15) : captures avant et après sur les mêmes pages.

### Écarté pour l'instant
- **P3, bloc « Notices / Base du coût » replié.**
  - La version 1 repliait tout le bloc : elle cachait aussi les ancres `#da-notices-ligne-<n>`, vers lesquelles mène le
    lien « Votre marque » des lignes saisies (`maquettes/ecartees/m3-replie-*`, `m3-ouvert-*`).
  - La version 2, partielle, laisse « Selon les marques » visible et ne replie que les phrases « Ligne n : d'après… » et la
    « Base du coût » : les 12 ancres restent visibles. Mesurée sur les 37 pages éditoriales, au téléphone, l'illustration
    ne remonte que de 75 à 399 px, 188 px en médiane ; les pages dont l'illustration passe trois écrans tombent de 15 à 12
    (`mesures-p3-partiel.json`, `maquettes/ecartees/m3-partiel-*`).
  - Ce gain ne paie pas ce qu'il coûte : une demande de changement sur la règle 2b (le nombre de notices et la base du
    coût sous l'encadré), les contrôles FORMAT2-PROVENANCE et le test de la règle 2i à reprendre, et des preuves de
    confiance moins visibles.
- **P7, texte rédigé en 17 px sur ordinateur** : il ne ramène la ligne qu'à 85 caractères en médiane (au lieu de 90). Une
  colonne plus étroite le ferait mieux, mais décalerait le texte par rapport à l'encadré et aux tableaux : gain faible
  (`maquettes/ecartees/m6-lecture-*`).
- **Moteur de recherche interne** : il faut un script et un index. Avec 38 pages, le menu (P1) suffit.
- **Index des situations en tête de l'encadré** : il pousserait la première situation hors du premier écran (règle 2a).
- **Titles et descriptions** : à revoir avec les requêtes de J+30 (C9).

## 5. Ordre proposé
1. **Lot U1** : P0 (paires du plan) et P1 (menu et pied de page). C'est le plus utile au lecteur et au maillage, et rien
   ne bouge dans les encadrés.
2. **Lot U2** : P2 (outil) et P5 (accueil), les deux grilles d'entrée du site.
3. **Lot U3** : P6 (Open Graph) et P8 (dessins en fichiers), qui partagent la production des images.
4. **Lot U4** : P4 (photos), seulement si Houssem en accepte.

Chaque lot suit le même chemin :
- sa demande de changement s'il en faut une ;
- ses captures (375 et 1366 px, deux polices) ;
- une revue indépendante ;
- la validation de Houssem ;
- la recette de l'étape 9 et la vérification en ligne.

## 6. Décisions demandées à Houssem
1. Les propositions retenues, et l'ordre des lots.
2. Demande n° 40 (P1) : l'accepter, et le libellé « Mon voyant » sous 30 rem, ou un autre libellé court.
3. P0 : les huit paires, validées avec le lot U1.
4. P4 : accepter des photos sous licence libre, choisies une par une avec son accord.

## 7. Revue indépendante
- **Revue** : un agent sans contexte de la rédaction a relu la version 1 (texte, maquettes, outils, mesures) le 20/11 au
  soir. Verdict : à corriger, avec un point bloquant.
- **Ce que la revue a changé** :
  - **Bloquant** : le bandeau du menu passait sur deux rangées de 389 à au moins 440 px. La forme serrée et « Mon
    voyant » s'appliquent désormais jusqu'à 30 rem ; 204 cas mesurés, de 320 à 1366 px, sans retour à la ligne.
  - Menu : bouton de 44 × 33 px au téléphone ; aucun titre `h2` dans le panneau ; nom accessible « Trouver mon voyant »
    gardé ; 404 mesurée.
  - C1 corrigé : « À lire aussi » compte de 0 à 10 liens, et dix pages en ont un ou aucun. D'où la proposition P0.
  - Argument SEO du menu ramené à ce qu'il vaut : l'accueil lie déjà toutes les pages.
  - P2 : variante légère, qui garde une ligne d'exemple ; impacts sur les règles listés ; place du filtre dite.
  - P3 : volet partiel mesuré, puis écarté ; version 1 écartée (elle cachait les ancres). Règle 2b, et non 2d.
  - P4 : décision du 15/11 citée ; photos sous licence libre copiées sur le site ; métadonnées ; numéro de série,
    kilométrage, reflets ; voiture conforme à l'édition de la notice ; conception d'abord.
  - P5 : cartes des thèmes gardées.
  - P6 : une image par page.
  - P7 : écartée.
  - P8 ajoutée : dessins en fichiers, pour Google Images.
  - Chiffres corrigés : panneau du menu, allongement de la page, titles (25 à 68 caractères), pages (9,8 à 20,4 écrans),
    caractères par ligne (90), panneaux de la loi montagne (B58, B59, B26), idée reportée sur les titles citée.
  - Retirés : l'affirmation sur le seuil WCAG des cibles de l'accueil, la critique du sommaire (validé avec le format).
  - Outils et mesures versionnés ; erreur du champ `taillePolice` signalée.
- **Ce que j'ai écarté de la revue, et pourquoi** :
  - P3 en volet partiel : je l'ai maquetté et mesuré comme demandé, puis écarté, faute de gain suffisant (188 px en
    médiane).
  - Tuiles de pictogrammes sur les pastilles de l'accueil (P5) : essayées, écartées au téléphone, où elles empêchent les
    deux colonnes.
- **Ajouté ou réécrit après la revue, non relu** :
  - les volets par thème du menu et leur affichage ouvert sur ordinateur ;
  - P0 et ses huit paires ;
  - la maquette et les mesures de P2 en variante légère ;
  - la maquette et les mesures de P3 en volet partiel ;
  - la maquette de P5 dans les cartes ;
  - P6 avec une image par page, P8 et le constat C10 ;
  - la mise à jour de la demande n° 40.
- **Reste à vérifier** :
  - un vrai téléphone, Safari iOS compris (volets imbriqués, `::details-content`, ancres) ;
  - Lighthouse sur la construction de chaque lot ;
  - l'effet réel de P8 sur Google Images ;
  - les données de Search Console au relevé J+30.
