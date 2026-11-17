## Points à trancher (avec ma recommandation)
1. **Voiture qui ne démarre pas, ligne 1** (voyants faibles ou éteints, démarreur qui ne tourne pas) : **Oui, avec
   précautions** · À faire dans les jours qui viennent. Quatre notices de trois groupes donnent le même niveau
   (Renault Clio 5 p. 384 et Dacia Sandero 3 p. 347 : resserrer ou nettoyer les cosses, brancher une autre batterie,
   consulter pour un circuit défectueux ; Seat Ibiza p. 303 : faire contrôler la batterie ; Toyota Yaris p. 319 :
   contacter un réparateur si le problème n'est pas résolu) : pas d'écart. Changement depuis la version 1 : l'urgence
   « tout de suite » venait de Toyota p. 320, qui parle de l'après-démarrage avec une autre batterie ; cette consigne
   fonde maintenant la ligne 2. **Recommandation : valider.**
2. **Voiture qui ne démarre pas, ligne 2, nouvelle** (le moteur a démarré grâce à une autre batterie) : **Oui, avec
   précautions** · À faire tout de suite. Peugeot 208 p. 188 et Citroën C3 p. 137 : laisser tourner le moteur, à
   l'arrêt, au moins 30 minutes, car rouler tout de suite peut altérer certaines fonctions ; Toyota Yaris p. 320 :
   faire vérifier la voiture « dès que possible » (« tout de suite » dans la grille). **Recommandation : valider.**
3. **Voiture qui ne démarre pas, ligne 4** (le démarreur tourne, le moteur ne démarre pas) : **Non, ne poursuivez pas
   votre trajet** · À faire tout de suite. Elle s'appuie maintenant sur trois notices de deux groupes : Peugeot 208
   p. 93 (« ne pas insister - Risque d'endommagement du démarreur et du moteur ! Faire appel au réseau »), Renault
   Clio 5 p. 188 et Dacia Sandero 3 p. 162 (versions essence : ne plus tenter de démarrer et faire appel à un
   représentant de la marque), Renault Clio 5 p. 161 (diesel : faire appel à un représentant après plusieurs
   tentatives). La grille range « faire appel au réseau » à ce niveau. Le libellé est écrit pour une voiture qui roule ;
   l'action dit quoi faire à l'arrêt (n'insistez pas, faites appel à un garage ou à l'assistance). **Recommandation :
   garder.**
4. **Voiture qui ne démarre pas, ligne 5** (diesel en panne sèche) : **Oui, avec précautions** · À faire tout de suite.
   Notice Renault Clio 5 p. 161 ajoutée (attendre quelques minutes, contact mis, pour le réamorçage) ; l'action renvoie
   à la ligne 4 si le moteur ne démarre toujours pas (le renvoi inverse, de la ligne 4 vers la ligne 5, est retiré le
   16/11 après la recette : les deux lignes se renvoyaient l'une à l'autre). **Recommandation : valider.**
5. **Moteur PureTech, lignes 3 et 4, nouvelles** (à la jauge, niveau sous le repère mini, ou au-dessus du repère
   maxi) : **Non, arrêtez-vous immédiatement** · À faire tout de suite. Peugeot 208 p. 166 et Citroën C3 p. 112-113 :
   « Ne pas démarrer le moteur si le niveau est » sous le repère B (complément « impérativement ») ou au-dessus du
   repère A (faire appel au réseau). « Ne pas démarrer » n'est pas dans la grille : principe 3, le niveau le plus
   prudent qu'elle peut signifier ; la définition du niveau permet de repartir après la mise à niveau. Ces deux
   notices sont celles de voitures à moteur PureTech. **Recommandation : valider.** Pour information, sans demande de
   changement : la ligne de la base `huile-niveau` (alerte de niveau) reste à Oui, avec précautions · À faire tout de
   suite ; son action demande déjà de vérifier à la jauge et de faire l'appoint, et les lignes 3 et 4 disent quoi
   faire selon ce que montre la jauge.
6. **Moteur PureTech, ligne 6** (rappel de la pompe à vide non encore réalisé) : **Non, ne poursuivez pas votre
   trajet** · À faire tout de suite, sur trois fiches RappelConso (48835, 48836, 48204). Chacune demande seulement de
   « contacter le concessionnaire », formule absente de la grille, et annonce un risque d'accident (assistance de
   freinage réduite ou perdue). Deuxième question de la grille : une consigne qui annonce un dégât grave si l'on
   continue de rouler va à ce niveau ; principe 3 pour la formule absente. Argument pour la variante **Oui, avec
   précautions · À faire tout de suite** (aller directement au garage) : la ligne de la base `direction`, où Toyota
   signale une perte d'assistance, est à ce niveau, mais sa notice demande de « faire vérifier » sans annoncer de
   risque d'accident. Aucune des trois fiches ne dit de ne plus utiliser la voiture. **Recommandation : garder le
   niveau proposé**, pour le risque de freinage écrit par la fiche.
7. **Sources nouvelles du dossier PureTech** : trois fiches RappelConso (première main) ; la page « Moteurs PureTech,
   nos solutions » de peugeot.fr et le communiqué de Stellantis du 7 mai 2025 (communication du constructeur : elles
   ne fixent aucun verdict, seulement la couverture spéciale et ses conditions). Elles sont admises par la demande de changement
   n° 31 (acceptée le 16/11, 16 h 52 ; nature `communication-constructeur` au registre, PR n° 69). Le
   communiqué est celui de la version belge du site de presse de Stellantis : une version France sera cherchée à
   l'ajout au registre.
8. **Pièces et prise en charge nouvelles** (`data/couts.json`, avec le lot) : `pile-de-cle` et
   `carburant-et-reamorcage` (gestes à faire soi-même) ; `couverture-speciale-puretech` (prise en charge du
   constructeur, datée, revérifiée tous les 90 jours : 100 %, 10 ans ou 180 000 km, au premier terme échu, sous
   conditions).
9. **Ordre de la page panne** : l'exemple ouvre son texte sur un paragraphe court, puis l'arbre, puis les causes, comme le
   demande la demande de changement n° 32 (acceptée le 16/11, mise en œuvre par la PR n° 68).
10. **Illustrations au-delà de trois écrans** (règle 2i assouplie par la demande n° 32) : 2 700 px (panne) et 2 807 px
   (dossier), parce que leurs encadrés ont six lignes (bas à 2 179 et 2 324 px). Elles suivent bien le bloc « Notices /
   Base du coût ». **Recommandation : accepter** ; raccourcir un encadré retirerait une situation sourcée.

## Recette locale (16/11/2026, `travaux/etape-10/recette-porte-10/`, sur les modèles de la porte F1)
- Construction de recette : 23 pages ; contrôles : 29 erreurs, toutes des validations absentes (26 lignes de la base
  du lot F2 sans empreinte, les deux encadrés, la prise en charge provisoire), aucune autre.
- Mesures à 375 × 667 (police chargée / de secours) : première situation finie à 547 px (panne) et 528 px (dossier),
  sous 667 (règle 2a) ; arbre de décision à 3 855 / 3 880 px, sous six écrans (4 002) ; aucun débordement à 320 px.
- Lighthouse mobile (3 passages) : 100 en performance, accessibilité et bonnes pratiques sur les deux pages, CLS 0.
- Captures : 30 (375 × 667 et 1366 × 800, deux polices) dans `captures/`.
- Corrigé après la recette (16/11, non relu par la revue) : renvoi circulaire entre les lignes 4 et 5 de la page panne
  (point 4) ; la deuxième fiche du tableau des rappels disait seulement « Même motif » : son motif est écrit en entier
  (identique à la première fiche, relu à l'écran : `porte10-verification.md`). « Votre marque » coupé sur deux lignes et
  « à » seul en fin de ligne dans le coût probable : corrigés dans les modèles par la PR du lot F2.

## Revue indépendante (une seule revue, consigne du 16/11/2026)
- **Ce qu'elle a changé.** Voiture qui ne démarre pas : urgence de la ligne 1 ramenée à ses sources (la consigne
  Toyota p. 320 porte sur l'après-démarrage : nouvelle ligne 2) ; ligne 4 appuyée sur trois notices de deux groupes au
  lieu d'une ; Renault p. 161 ajoutée à la ligne 5 ; arbre repris (le « circuit défectueux » appartient au cas des
  voyants faibles, et aucune notice lue ne donne de consigne pour un démarreur immobile avec des voyants normaux ;
  panne sèche essence ; renvois vers les lignes 2, 4 et 5) ; titre de la section du préchauffage (il annonçait un cas
  que la section ne traitait pas) ; marque et modèle de la notice partout, causes comprises ; section « Pousser la
  voiture » complétée (Toyota p. 320, Renault et Dacia) ; extraits complétés là où ils omettaient ce qui fonde leur
  niveau. Moteur PureTech : situation du rappel sans nom de moteur (la fiche 48204 n'en nomme pas), action ramenée à ce
  que demande la fiche, deux fiches de plus citées ; deux lignes pour la lecture de la jauge ; tableau des rappels
  (période « indiquée par la fiche », dates de la fiche 48204 sans les appeler dates de fabrication, formule « peut
  être insuffisante ») ; phrases ramenées à ce que disent les sources (ni « reconnaît », ni « déjà changé », certificat
  Check+ sans le limiter aux voitures d'occasion) ; « courroie de cog » expliquée (traduction automatique) ; sections
  de travail retirées des deux exemples.
- **Ce que j'ai écarté.** Abaisser la ligne du rappel à « Oui, avec précautions » : gardée au niveau proposé, à
  trancher par toi (point 6). Ajouter un risque chiffré « si vous continuez » à la page panne : facultatif, non fait.
- **Ce qui reste à vérifier.** Les extraits ajoutés après la revue (lignes 2, 4 et 5 de la page panne, lignes 3 et 4
  du dossier) ont été relus mot pour mot à l'écran (`travaux/etape-10/textes/porte10-verification.md`), mais ils n'ont
  pas été relus par la revue (une seule revue) ; de même les deux corrections faites après la recette. La recette elle-même
  (construction, captures, mesures, Lighthouse) a été faite après la revue : ses résultats sont plus haut.

## Ce qui reste avant la publication des deux pages
- Lignes d'écart courtes de la base (lot F2) validées et versées : les deux exemples en dépendent (`batterie-rouge`,
  `huile-niveau`, `entretien-vidange`).
- Sources ajoutées au registre et pièces ajoutées à `data/couts.json` avec le lot (entrées provisoires de la recette).
- Ta validation, puis les empreintes.

## Ligne de validation proposée
« Je valide les exemples de la porte 10 : voiture qui ne démarre pas (six lignes, dont les quatre lignes saisies :
voyants faibles à Oui, avec précautions et À faire dans les jours qui viennent ; après un démarrage avec une autre
batterie à Oui, avec précautions et À faire tout de suite ; démarreur qui tourne à Non, ne poursuivez pas votre
trajet ; diesel en panne sèche à Oui, avec précautions et À faire tout de suite) et moteur PureTech (trois lignes de
la base, les deux lignes de la jauge à Non, arrêtez-vous immédiatement, et la ligne du rappel non fait à Non, ne
poursuivez pas votre trajet), leurs coûts, causes, sources et arbre de décision. »
