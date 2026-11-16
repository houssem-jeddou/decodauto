## Points à trancher (avec ma recommandation)
1. **Voiture qui ne démarre pas, ligne 3** (« le démarreur tourne, mais le moteur ne démarre pas ») : **Non, ne poursuivez
   pas votre trajet** · À faire tout de suite, tiré de Peugeot 208 p. 93 (« ne pas insister - Risque d'endommagement du
   démarreur et du moteur ! Faire appel au réseau ») : la grille range « faire appel au réseau » et l'annonce d'un dégât
   grave à ce niveau. Le libellé se lit bien pour une voiture qui ne démarre pas (ne repartez pas, faites venir de l'aide).
   **Recommandation : garder.**
2. **Voiture qui ne démarre pas, ligne 1** : urgence relevée à **À faire tout de suite** le 16/11 (notice Toyota Yaris
   p. 320, relue à l'écran : « faites vérifier le véhicule dès que possible », que la grille range en « tout de suite ») ;
   verdict inchangé (Oui, avec précautions) ; écart signalé (Toyota plus stricte que Renault, Dacia et Seat). La citation
   Toyota p. 319 (« Contactez un concessionnaire […] si vous ne pouvez pas résoudre le problème ») reste au niveau « oui,
   avec précautions » : elle est conditionnelle. **Recommandation : valider ainsi.**
3. **Moteur PureTech, ligne 4** (rappel non fait) : la fiche RappelConso dit « contacter le concessionnaire », formulation
   absente de la grille, et annonce un risque d'accident (assistance de freinage réduite ou perdue). Principe 3 de la
   grille (formulation absente : le niveau le plus prudent qu'elle peut signifier) et dégât grave annoncé : **Non, ne
   poursuivez pas votre trajet** · À faire tout de suite. Variante moins stricte : Oui, avec précautions · À faire tout de
   suite (aller au garage directement). **Recommandation : garder le niveau proposé**, pour le risque de freinage.
4. **Sources nouvelles du dossier PureTech** : trois fiches RappelConso (première main), la page « Moteurs PureTech, nos
   solutions » de peugeot.fr et le communiqué de Stellantis du 7 mai 2025 (sources du constructeur, rangées en
   « secondaire » : elles ne fixent aucun verdict, seulement la couverture spéciale et ses conditions) ; le communiqué est
   celui de la version belge du site de presse de Stellantis : une version France sera cherchée à l'ajout au registre.
5. **Pièces et prise en charge nouvelles** (`data/couts.json`, avec le lot) : `pile-de-cle` et `carburant-et-reamorcage`
   (gestes à faire soi-même) ; `couverture-speciale-puretech` (prise en charge du constructeur, datée, revérifiée tous les
   90 jours : 100 %, 10 ans ou 180 000 km, au premier terme échu, sous conditions).

## Ce qui reste avant la publication des deux pages
- Lignes d'écart courtes de la base (lot F2) validées et versées : les deux exemples en dépendent (`batterie-rouge`,
  `huile-niveau`, `entretien-vidange`).
- Modèles de F1.3c fusionnés (PR n° 63), puis construction de recette des deux exemples au format 2, captures à
  375 × 667 et 1366 × 800, mesures 2a et 2i, Lighthouse.
- Section de travail « Ce que ce brouillon ne dit pas encore » retirée de chaque exemple.
- Revue indépendante de ce paquet (avant de te le présenter), puis ta validation, puis les empreintes.

## Ligne de validation proposée
« Je valide les exemples de la porte 10 : voiture qui ne démarre pas (cinq lignes, dont la ligne 1 à Oui, avec
précautions et À faire tout de suite, et la ligne 3 à Non, ne poursuivez pas votre trajet) et moteur PureTech (trois
lignes de la base et la ligne du rappel non fait à Non, ne poursuivez pas votre trajet), leurs coûts, causes, sources et
arbre de décision. »
