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

## Liste de recette (`docs/03`, étape 9) : à ajouter pour les lots au format 2
- Repères de section : un repère seulement sous un H2 qui pose la question d'une seule ligne de l'encadré (exception explicite
  admise, section qui mêle plusieurs cas sans repère).
- Texte : ni « Verdict retenu », ni édition, ni page écrite à la main (contrôle FORMAT2-METHODE), marque et modèle nommés.
