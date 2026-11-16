# Lot F1 : à reporter à la porte F1.4 (charte graphique `docs/11`, liste de recette `docs/03`)

Notes de la mise en œuvre de F1.2 et de ses deux revues indépendantes (16/11/2026). `docs/` ne se modifie qu'après la
validation de Houssem, par la pull request de la copie : ces points y entrent à F1.4, avec la porte du format.

## Charte graphique (`docs/11`)
- **§4, repère de section (règle retenue à la seconde revue de F1.2)** : un repère seulement sous un H2 qui pose la question
  d'une seule ligne de l'encadré ; une exception explicite à une autre ligne dans le texte est admise (exemple : FAP avec le
  voyant moteur) ; une section qui mêle plusieurs cas n'a pas de repère. Pas de contrôle automatique strict : FORMAT2-REPERE
  vérifie la place (sous un H2) et le verdict (celui d'une ligne de l'encadré), le choix des sections se relit.
- **§4, sommaire** : état long dessiné. Ordinateur : colonne collante à la hauteur de l'écran, défilement propre, ombres de
  défilement. Téléphone : pastilles de 13,5 rem au plus (une pastille et demie visible à 375 px), deux lignes puis points de
  suspension, hauteur égale, accroche, fondu à droite.
- **§4, accueil** : grille d'un dessin par pictogramme de la base (18), libellés de `LIBELLES_PICTOGRAMMES` (dont « Frein à
  main ») ; libellés en 12 px (13 px sur ordinateur), coupure d'un mot de 10 lettres au moins avec un tiret, jamais sans ;
  liens des cartes de thème espacés (cibles tactiles de 24 px).
- **§4, tableau des notices** : « Consigne retenue » dans la cellule « Niveau » ; colonne « Page » courte (« p. 15 »),
  emplacement entier sous l'extrait.
- **§4, emplacement publicitaire** : 340 px réservés (règle du site, PUB-HAUTEUR-RESERVEE).
- **§3, typographie** : espace insécable après « p. » devant un numéro, au format 2.
- **§4, pages panne et dossier (F1.3c, 16/11/2026, captures `travaux/etape-13/f1/captures/f1.3c/`)** : variantes proposées,
  toutes dans la charte (cartes, pastilles, formes de la gravité) :
  - *arbre de décision* : carte claire ; chaque question numérotée par une pastille sombre au chiffre ambre (comme les étapes) ;
    réponses en liste à puces ; un verdict cité est une pastille en ligne (forme de la gravité, libellé de la grille, liseré
    de sa couleur) ; aucun libellé de verdict écrit à la main (FORMAT2-ARBRE) ;
  - *fiches « Le symptôme en bref » et « Le tutoriel en bref »* : carte, intitulé en gras au-dessus de sa valeur, rangées séparées ;
  - *causes* : cartes de la page voyant, avant le texte sur la page panne (ordre §4) ;
  - *historique du dossier* : carte, une entrée par rangée séparée d'un filet, date en gras, du plus récent au plus ancien ;
  - *tableaux du texte* : bloc de la charte ; au-delà de trois colonnes, une carte par rangée sur téléphone (intitulé de la
    colonne devant chaque valeur), tableau ordinaire sur ordinateur ;
  - *étapes d'un tutoriel* : cartes numérotées, sans retrait de liste.
  Revue de F1.3c (décisions du 16/11/2026) :
  - *pastille du verdict cité dans l'arbre* : elle termine la réponse, seule sur sa ligne, après la consigne ; retraits
    réduits sur téléphone pour que le libellé le plus long de la grille tienne sur une ligne à 360 et 375 px (état sur deux
    lignes dessiné, forme en haut à gauche, sous 360 px) ; la pastille est réservée à l'arbre et aux repères : un
    `{{verdict:…}}` dans la prose reste du texte (décision du 16/11, gardé tel quel) ;
  - *séparateur des rangées* : un même filet de 1 px (couleur des filets, `#d5dbe3`) entre les rangées des fiches et de
    l'historique, comme entre les questions de l'arbre ;
  - *tableau en cartes* : une carte par rangée sur téléphone (fond blanc, bord, angles de 12 px, filet entre les cellules) ;
  - *listes sans puces* (questions de l'arbre, étapes, historique) : `role="list"`, comme l'encadré.
  Points à trancher à la porte : l'arbre arrive loin sur téléphone (2 910 px) parce que les fiches et les causes le précèdent
  (ordre de la charte) ; sur téléphone, une pastille longue passe à la ligne sous « Oui : ».
- **§4, page outil (F1.3a, 16/11/2026, captures `travaux/etape-13/f1/captures/f1.3a/`)** : variantes proposées, toutes
  tirées de composants existants :
  - *renvoi de l'encadré* (« Trouvez votre voyant dans la liste ») : bouton ambre du bandeau, sous la question et avant les
    exemples, visible dans le premier écran ; *coût « Selon le voyant »* : pastille ambre des tranches ;
  - *filtre par couleur* : pastilles blanches bordées du sommaire, pastille cochée sombre (panneau), diode de la couleur ;
  - *index des dessins* : la grille de l'accueil (tuiles rondes allumées dans des cellules sombres, sur fond nuit), une tuile
    par paire (pictogramme, couleur), libellé de `LIBELLES_PICTOGRAMMES` ; 4 tuiles par rangée à 375 px, 6 sur ordinateur ;
  - *groupe de couleur* : panneau sombre de l'encadré, titre avec une **diode** (point lumineux de la couleur des voyants,
    élément nouveau, décoratif) ; *carte d'une ligne* : la cellule d'une ligne de l'encadré (tuile, nom en gras et situation
    en texte doux, pastilles verdict et urgence, action, ligne d'écart), lien de la page du voyant, sources repliées ;
  - *ordre dans l'outil* : titre, filtre, grille, introduction, groupes (l'introduction suit la grille : le renvoi de
    l'encadré mène au titre, et la grille apparaît sans faire défiler l'introduction).
  Revue de F1.3a (décisions du 16/11/2026) :
  - *index* : **deux grilles, une par couleur**, sous le titre du groupe (« Voyants orange ou jaunes », « Voyants rouges »,
    textes déjà validés), pour que deux tuiles d'un même dessin ne se distinguent pas par la seule couleur (WCAG 1.4.1) ; le
    filtre masque la grille des autres couleurs ; **nombre de cas** sur la tuile d'une paire qui en a plusieurs (« 2 cas ») ;
  - *ordre des cartes* : **par paire** (pictogramme, couleur), la paire la plus grave d'abord, puis par gravité dans la
    paire. **Change l'ordre de la liste et la décision 9 du paquet 8.1** (une entrée d'index par ligne) : à valider par
    Houssem sur captures, à la porte du format ;
  - *cartes* : ligne d'écart courte obligatoire (FORMAT2-ECART, plus de repli sur l'écart entier) ;
  - *renvoi de l'encadré* : bouton ambre **sans icône** (docs/10 §4, point 4 : une icône seulement si elle double un texte) ;
  - *introduction* : en deux paragraphes, sans changer un mot (règle 2e) ; *titre de groupe* : diode alignée sur la première
    ligne, « 16 cas » insécable ; diode blanche retirée tant qu'aucune ligne blanche n'existe ;
  - *bandeau* : pas de bouton « Trouver mon voyant » sur la page outil elle-même (demande n° 30, §6).
  À reporter aussi, après validation : **CLAUDE.md, « Outil voyants »** (index par paire et par couleur, au lieu d'« une
  entrée `data-outil-index-entree` par ligne » ; ordre des cartes par paire au format 2 ; repères du verdict dans le texte de
  la page outil) et **docs/10 §4** (bouton sans icône ; introduction de l'outil en deux paragraphes).
  Décision du 16/11 : l'illustration (règle 2i) est gardée sur l'outil (sans elle, la grille commence encore au-delà de trois
  écrans).
- **§4, pages du lot F3 (F1.3b, 16/11/2026, captures `travaux/etape-13/f1/captures/f1.3b/`)** : variantes proposées, toutes
  tirées de composants existants :
  - *fiche du code* et *fiche « Le texte en bref »* : carte du corps (`dl.fiche`) ; le code en chasse fixe, pastille sombre au
    texte ambre, dans le titre de la fiche ;
  - *cas décrits par marque* : tableau de la charte, **en cartes sur téléphone bien qu'il n'ait que trois colonnes** (la
    colonne du texte, longue, y serait illisible : capture `code-p0420-format2-375-par-marque`), « Source : » devant les sources ;
  - *dépannage sur autoroute* : rangée du coût de l'encadré (cellule sombre, triangle d'alerte ambre, objet du montant en
    gras), texte validé inchangé ; il reste dans l'encadré (règle 2b : montants et dates dans l'encadré) ;
  - *page informative* : réponse directe en cellule en tête de l'encadré (déjà dessinée par le pilote) ;
  - *socle et 404* : tête de page nuit **sans encadré** (`tete-seule` : marge basse réduite), texte sur fond clair ; fiche de
    l'auteur et « Méthode » en cartes (définitions dans le bloc tableau) ; mentions légales en fiche ; 404 : phrase, bouton
    ambre « Trouver mon voyant » et lien vers l'accueil dans la tête de page.
  Point à trancher : le brief demandait un *encart du corps* « dépannage sur autoroute » avec un numéro et une consigne. Aucune
  donnée validée ne porte ce numéro ni cette consigne (`data/couts.json` ne porte que le forfait réglementé) : les écrire
  demanderait un texte nouveau, sourcé (fiche Service-public F11056, déjà au registre) et validé, et un champ de données (demande
  de changement sur la structure). Proposé pour le lot F3, non fait ici.

## Liste de recette (`docs/03`, étape 9) : à ajouter pour les lots au format 2
- Repères de section : un repère seulement sous un H2 qui pose la question d'une seule ligne de l'encadré (exception explicite
  admise, section qui mêle plusieurs cas sans repère).
- Texte : ni « Verdict retenu », ni édition, ni page écrite à la main (contrôle FORMAT2-METHODE), marque et modèle nommés.
