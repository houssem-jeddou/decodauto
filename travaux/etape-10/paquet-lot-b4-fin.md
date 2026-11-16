## Points à trancher (avec ma recommandation)
1. **Perte de puissance, à-coups ou ratés sans voyant** (« perte de puissance », ligne 4 ; « voiture qui broute »,
   ligne 3) : **Oui, avec précautions** · À faire tout de suite. Toyota Yaris p. 291 (contacter dès que possible un
   réparateur), Renault Clio 5 p. 188 et Dacia Sandero 3 p. 162 (faire réparer au plus vite : le pot catalytique
   s'échauffe) ; Seat Ibiza p. 289 demande de faire réviser la voiture par un atelier, sans délai écrit (dans les jours
   qui viennent). Le plus prudent l'emporte ; écart signalé (ligne courte de 18 mots). **Recommandation : valider.**
2. **Témoin EPC** (« perte de puissance », ligne 3) : **Oui, avec précautions** · À faire tout de suite (Seat Ibiza
   p. 288 : faire contrôler immédiatement le moteur par un atelier spécialisé). Une seule notice le décrit : la situation le dit. **Recommandation :
   valider.**
3. **Essence d'un indice d'octane trop bas** (« perte de puissance », ligne 5) : **Oui, avec précautions** · À faire tout
   de suite (Seat Ibiza p. 283 : régime moyen, moteur peu sollicité, rajouter dès que possible le carburant
   conseillé). **Recommandation : valider.**
4. **Bruit de l'échappement ou odeur de gaz dans l'habitacle** (« bruit moteur », ligne 2) et **cliquetis ou autre bruit
   anormal** (ligne 3) : **Oui, avec précautions** · À faire tout de suite (Toyota Yaris p. 242 et p. 291 : faire
   vérifier dès que possible). Seule la notice Toyota en parle ; une odeur de gaz d'échappement dans l'habitacle n'est
   jamais présentée comme normale. **Recommandation : valider.**
5. **Bruits normaux** (« bruit moteur », lignes 4 à 6 : démarrage à froid, Seat p. 213 ; légers cliquetis brefs en
   accélérant, Toyota p. 335 ; régénération du filtre à particules, Seat p. 290) : **Oui, vous pouvez rouler** · aucune
   action. **Recommandation : valider.**
6. **Fumée blanche à l'échappement, sans voyant** (« fumée », ligne 1) : **Oui, avec précautions** · dans les jours qui
   viennent (Renault p. 386, Dacia p. 348-349 : sur un diesel, pas forcément une anomalie, la régénération
   du filtre à particules peut l'expliquer ; réduire le régime et éviter les accélérations brutales). L'action dit de
   faire contrôler la voiture si la fumée ne disparaît pas. **Recommandation : valider.**
7. **Vapeur d'eau à l'échappement** (ligne 2, Peugeot p. 168, Citroën p. 115) et **fumée du chauffage d'appoint d'un
   diesel par temps froid** (ligne 3, Seat p. 213) : **Oui, vous pouvez rouler** · aucune action. **Recommandation :
   valider.**
8. **Fumée sous le capot** (« fumée », ligne 4) : même ligne que la ligne 2 de « moteur qui surchauffe » (lot B3),
   **Non, arrêtez-vous immédiatement**. **Recommandation : valider.**
9. **Fumée noire ou bleue** : aucune notice lue ne la décrit. La page l'explique avec un document technique
   d'équipementier (MAHLE, nature « document technique », demande n° 31), cité dans le texte et les causes seulement,
   jamais pour un verdict, et renvoie au professionnel. Contrôle technique (fumée excessive, opacité) cité sans verdict
   de conduite. **Recommandation : valider.**
10. **Demande de changement du plan** (`travaux/etape-10/demande-changement-fumee.md`) : requête principale de la page
    fumée « fumée blanche voiture » (3 160 recherches par mois) au lieu de « fumée blanche échappement » (316). Adresse,
    mots-clés et liens inchangés. **Recommandation : accepter.**
11. **Pièce nouvelle** (`data/couts.json`) : « Ligne d'échappement », tranche « réparation » (bruit moteur). La pièce
    « Carburant et réamorçage », utilisée par la cause « panne d'essence » de deux pages de ce lot, arrive avec le lot B1
    (pull request n° 76) : le lot B4 se construit après lui. **Recommandation : valider.**
12. **Mesures du format 2** (recette du 16/11) : illustrations de « perte de puissance » et « bruit moteur » au-delà de
    trois écrans (encadré de cinq ou six lignes ; règle 2i assouplie par la demande n° 32 : signalé, pas bloquant) ;
    arbres sous le seuil de six écrans. **Recommandation : accepter.**

## Recette locale, revue indépendante
Recette locale faite (`travaux/etape-10/recette-lot-b4/`, avec la pull request n° 73) : schéma, mesures du format 2 sans
erreur, Lighthouse 100 ; le coût probable des deux pages qui citent la panne d'essence se calcule une fois le lot B1
fusionné. Revue indépendante (une seule) : à faire avant la présentation.

## Ligne de validation proposée
« Je valide le lot B4 : perte de puissance (cinq lignes : voyant moteur clignotant et fixe de la base, témoin EPC, perte
de puissance sans voyant, indice d'octane trop bas), voiture qui broute (trois lignes : voyant moteur clignotant et fixe,
à-coups sans voyant), bruit moteur (six lignes : pression d'huile de la base, bruit d'échappement ou odeur, bruit anormal,
démarrage à froid, cliquetis brefs, régénération) et fumée à l'échappement (quatre lignes : fumée blanche, vapeur d'eau,
chauffage d'appoint, fumée sous le capot), leurs coûts, causes, sources et arbres, et la demande de changement de la
requête principale de la page fumée. »
