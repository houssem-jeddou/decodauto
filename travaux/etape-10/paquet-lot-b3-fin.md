## Points à trancher (avec ma recommandation)
1. **Fumée ou vapeur sous le capot** (« moteur qui surchauffe », ligne 2) : **Non, arrêtez-vous immédiatement** · À
   faire tout de suite (Renault Clio 5 p. 386, Dacia Sandero 3 p. 348-349 : s'arrêter, couper le contact, s'éloigner du
   véhicule). **Recommandation : valider.**
2. **Bouillonnement dans le bocal** (ligne 3) : **Non, arrêtez-vous immédiatement** · À faire tout de suite (Renault
   p. 387, Dacia p. 348-349 : panne mécanique, arrêter le moteur, faire appel au réseau). **Recommandation : valider.**
3. **Bocal vide, moteur froid** (ligne 4) : **Non, arrêtez-vous immédiatement** · À faire tout de suite. La notice Seat
   Ibiza (p. 298) interdit l'appoint quand le vase d'expansion est vide et demande de s'arrêter et de faire appel à un
   spécialiste ; les notices Renault et Dacia demandent de consulter le réseau le plus tôt possible (Oui, avec
   précautions). Le plus prudent l'emporte ; écart signalé (ligne courte de 15 mots, renvoi aux notices de la ligne).
   **Recommandation : garder.**
4. **Niveau proche du mini, moteur froid** (ligne 5) : **Oui, avec précautions** · À faire tout de suite (Peugeot 208
   p. 167, Citroën C3 p. 113 : appoint moteur froid, un appoint entre deux révisions est normal). **Recommandation :
   valider.**
5. **Température au-dessus de la normale, sans alerte rouge** (ligne 6) : **Oui, avec précautions** · À faire tout de
   suite. Seule la notice Toyota Yaris décrit ce cas (p. 291 et p. 242 : contacter dès que possible un réparateur) : la
   page le dit. **Recommandation : valider.**
6. **Additif du FAP insuffisant** (« nettoyer le FAP », ligne 2) : **Oui, avec précautions** · À faire tout de suite.
   Citroën C3 p. 114 (appoint impératif et rapide) est plus stricte que Peugeot 208 p. 15 (appoint rapide, rangé « dans
   les jours qui viennent ») : le plus prudent l'emporte, écart signalé. **Recommandation : garder.**
7. **Tutoriel « nettoyer le FAP »** : difficulté « facile » (la régénération se fait en roulant, comme le demandent les
   notices), durée « jusqu'à l'extinction du voyant », avec la limite de la notice Seat Ibiza (atelier si le voyant reste
   allumé). Le nettoyage du filtre démonté ou par produit n'est décrit par aucune notice lue : la page le dit et renvoie
   au professionnel. **Recommandation : valider.**
8. **Pièces nouvelles** (`data/couts.json`) : « Motoventilateur (ventilateur du radiateur) », tranche « réparation » ;
   « Joint de culasse », tranche « organe ». Elles classent les causes de la surchauffe qui les touchent (coût probable
   calculé, aucun montant en euros). **Recommandation : valider.**
9. **Consignes des briefs de la vague B** (`travaux/etape-10/briefs/`) : validées avec ce lot pour ses deux pages.
   **Recommandation : valider.**
10. **Mesures du format 2** (recette du 16/11) : première situation de la surchauffe à 641 px (sous le maximum de 667,
    1 px au-delà de la marge visée de 640) ; illustration de la surchauffe à 2 589 px, au-delà de trois écrans, parce
    que l'encadré a six lignes et que l'écart de la ligne 4 s'affiche sous la phrase « Notices » (règle 2i assouplie par
    la demande n° 32 : signalé, pas bloquant) ; arbre à 3 627 px, sous le seuil de six écrans (4 002) à 375 px de large,
    au-delà (4 036) à 320 px. **Recommandation : accepter, à surveiller si l'encadré s'allonge.**

## Recette locale, revue indépendante
Recette locale faite (`travaux/etape-10/recette-lot-b3/`, refaite avec la pull request n° 73 à jour) : 0 erreur
technique, mesures du format 2 sans erreur, Lighthouse 100. Revue indépendante (une seule) : à faire avant la
présentation.

## Ligne de validation proposée
« Je valide le lot B3 : moteur qui surchauffe (six lignes : voyant de température rouge de la base, fumée ou vapeur sous
le capot, bouillonnement dans le bocal, bocal vide, niveau proche du mini, température au-dessus de la normale) et
nettoyer le FAP (deux lignes : voyant FAP de la base, additif insuffisant), leurs coûts, causes, sources, arbre, étapes et
tableau. »
