# Étape 12, lot d'améliorations, partie 2 : révision de la page « niveau d'huile » (brouillon, jamais validé)

Préparé par Claude le 18/11/2026, branche `etape-12/niveau-huile`. Accord de Houssem pour lancer le lot : 18/11 (20 h 14).
**À valider par Houssem** (verdicts, encadré, faits) ; tant que l'empreinte n'est pas posée, le contrôle de la page
échoue sur sa validation (R4), comme pour tout brouillon. Page en ligne : `/huile-moteur/verifier-niveau/`, validée le
17/11 (11 h 34). Title, H1 et adresse inchangés (règle 14) ; « Mis à jour le » passe au jour de la mise en ligne (vraie
modification : verdicts, faits, sources).

Points repris : journal, « Points ouverts », « Page « niveau d'huile », prochaine révision » (revues des lots C1 et C2) ;
relevé `travaux/etape-11/textes/releve-sources.md`, §18 (« Pour la page « niveau d'huile », prochaine révision »).

## 1. Sources nouvelles (mot pour mot)

Notice Toyota Yaris (réf. PZ49X-9A592-FR, PDF officiel transmis par Houssem le 17/11, texte extrait par `pdftotext` le
18/11 ; page PDF = page imprimée) :
- p. 247, 6.3, « Vérification de l'huile moteur » : « Lorsque le moteur a atteint sa température de fonctionnement et
  qu'il a été arrêté, vérifiez le niveau d'huile sur la jauge. » ; « 1.Garez le véhicule sur un sol plat. Après avoir fait
  monter en température le moteur et l'avoir arrêté, attendez environ 5 minutes pour que l'huile se stabilise dans le
  carter du moteur. » ; « 2.Sortez la jauge en plaçant un chiffon sous son extrémité. » ; AVERTISSEMENT : « Pour éviter
  d'endommager gravement le moteur Vérifiez régulièrement le niveau d'huile. »
- p. 247, « Consommation d'huile moteur » : situations où la consommation peut augmenter (moteur neuf ; huile de faible
  qualité ou de viscosité inadéquate ; régimes élevés, charge lourde, remorque, accélérations et ralentissements
  fréquents ; ralenti prolongé, circulation dense).
- p. 248, « Le niveau d'huile moteur augmente » : conduite répétée sans montée en température suffisante (courte
  distance, basse vitesse, température extérieure basse) : humidité de condensation ou carburant non brûlé mêlé à l'huile,
  « il ne s'agit pas d'un dysfonctionnement » ; « Si le niveau d'huile moteur dépasse le repère de limite supérieure de
  remplissage, contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié. »
- p. 248, « Appoint d'huile moteur » : « Si le niveau d'huile est en dessous ou très proche du repère de bas niveau,
  ajoutez de l'huile moteur du même type que celle qui se trouve déjà dans le moteur. » ; « 2.Ajoutez lentement de
  l'huile moteur en vérifiant la jauge. »
- p. 249, AVERTISSEMENT « Lors du remplacement de l'huile moteur » : « Ne dépassez pas le niveau maximum, car cela
  pourrait endommager le moteur. » ; « Vérifiez le niveau d'huile sur la jauge chaque fois que vous faites l'appoint. »

Notices déjà au registre (relevés des 16 et 17/11, et base voyants validée le 24/10) :
- Renault Clio 5 phase 2, p. 333 (relevé, §11) : « En cas de baisse anormale ou répétée du niveau, consultez un
  Représentant de la marque. »
- Peugeot 208, p. 165, « Niveaux » (relevé, §6) : « En cas de baisse importante d'un niveau, faire vérifier le circuit
  correspondant par le réseau PEUGEOT ou par un atelier qualifié. »
- Renault Clio 5 phase 2, p. 137-138, et Dacia Sandero 3, p. 111, « Témoin de pression d'huile » (paquet de l'étape 5,
  validé) : « S'il s'allume sur route, accompagné du témoin [STOP] et d'un signal sonore, arrêtez-vous impérativement et
  coupez le contact. »

## 2. Changements de l'encadré (à valider)

| # | Ligne | Avant | Après |
|---|---|---|---|
| 1 | Sous le repère mini | Non, arrêtez-vous immédiatement · À faire tout de suite ; citations Peugeot, Citroën, Seat | **Inchangé** (verdict, urgence, action) ; citation Toyota p. 248 ajoutée, classée **Oui, avec précautions · dans les jours qui viennent** (« ajoutez », sans délai, comme Seat) ; ligne d'écart : « Plus stricts : Peugeot et Citroën (ne pas démarrer, compléter impérativement). Moins stricts : Seat et Toyota (ajouter de l'huile). » |
| 2 | Au-dessus du repère maxi | Non, arrêtez-vous immédiatement · À faire tout de suite ; cinq notices au même niveau, pas d'écart | **Inchangé** (verdict, urgence, action) ; citation Toyota p. 248 ajoutée, classée **Non, ne poursuivez pas votre trajet · À faire tout de suite** (« contactez un concessionnaire ou un réparateur », absent de la grille ; comme « faire appel au réseau » : niveau le plus prudent qu'il peut signifier, principe 3) ; **ligne d'écart nouvelle** : « Plus stricts : Peugeot, Citroën, Renault, Dacia et Seat (ne pas démarrer). Moins strict : Toyota (contacter un réparateur). » |
| 3 | **Nouvelle** : « Le niveau d'huile baisse anormalement ou à répétition entre deux vidanges » | – | **Oui, avec précautions · À faire dans les jours qui viennent** ; action : « Vérifiez le niveau à la jauge avant chaque trajet et faites l'appoint si nécessaire (sous le repère mini, ne démarrez pas) ; faites vérifier le moteur par le réseau de la marque ou un atelier qualifié. » ; citations Renault p. 333 (« consultez un Représentant de la marque ») et Peugeot p. 165 (« faire vérifier le circuit »), toutes deux à ce niveau, deux groupes ; pas d'écart |
| 4, 5 | Voyants de niveau et de pression d'huile | lignes de la base | **Inchangées** |

- **Réponse directe** (40 mots au plus, règle 2c) : « Entre les repères mini et maxi de la jauge, voiture à plat. Selon la notice : moteur arrêté depuis 30 minutes (Peugeot, Citroën), après un arrêt prolongé (Renault, Dacia), ou chaud, environ 2 minutes (Seat) ou 5 (Toyota) après l'arrêt. » (39 mots)
- **Coût probable** : inchangé (pièces, base de calcul, risque).
- **Premier écran (règle 2a, page informative)**, mesuré sur la page en ligne à 375 × 667 en remplaçant la réponse
  directe par la nouvelle (navigateur intégré, police du système de Houssem) : même hauteur qu'avant (bas de la réponse
  directe à 445 px, du verdict de la première situation à 532 px, de l'urgence à 560 px) ; la ligne 3 nouvelle vient
  après la ligne 2 et ne change pas le premier écran.

## 3. Changements du reste de la page (faits à valider)
- **Fiche « Le tutoriel en bref », durée** (revue de la PR #84) : « 30 minutes » au plus ne tenait pas pour Renault et
  Dacia (« arrêt prolongé ») ; nouvelle durée : « moteur chaud, 2 à 5 minutes d'attente avant la mesure (Seat Ibiza,
  Toyota Yaris) ; moteur arrêté depuis 30 minutes (Peugeot 208, Citroën C3) ou après un arrêt prolongé (Renault Clio 5,
  Dacia Sandero 3) ; après un appoint, de quelques minutes à 20 minutes avant de revérifier ».
- **« Quand ne pas le faire soi-même »** : Toyota (contactez un réparateur qualifié) ; baisse anormale ou répétée :
  consultez le réseau (Renault) ou faites vérifier le circuit (Peugeot).
- **« Comment vérifier »** (fiche « L'essentiel »), **étapes 2, 5, 10 et 12**, sections « à chaud ou à froid », « bon
  niveau » (six notices), « sous le repère mini », « trop d'huile » (consigne Toyota, risque Toyota, niveau qui monte quand
  le moteur ne chauffe pas assez), « quelle huile » (appoint du même type, Toyota), « fréquence » (Toyota : régulièrement).
- **Tableau des notices** : ligne Toyota remplie (moment de la mesure, consignes sous le mini et au-dessus du maxi) ;
  phrase « rubrique non lue » retirée ; lignes Renault et Dacia : témoin de pression allumé sur route avec le témoin STOP et
  un signal sonore, « s'arrêter impérativement et couper le contact » (revue de la PR #84) ; Renault : baisse anormale ou
  répétée, consulter un représentant ; pages citées complétées.
- **Section « Pourquoi ma voiture consomme de l'huile ? »** : situations de consommation accrue selon Toyota (p. 247).
- **Section nouvelle « Le niveau d'huile baisse anormalement : que faire ? »**, repère de la ligne 3 (une seule ligne
  de l'encadré) ; phrase « aucune notice ne donne les causes d'une consommation anormale : demandez l'avis d'un
  professionnel » gardée.
- **Description** : « … réagir à un niveau trop bas, trop haut ou qui baisse, selon les notices Peugeot, Citroën, Renault,
  Dacia, Seat et Toyota. »
- Non fait (choix de Claude) : Dacia n'est pas citée pour la baisse anormale (relevé « comme Renault » sans texte mot pour
  mot) ; espace insécable entre nombre et unité (typographie du gabarit, idée reportée).

## 4. Validation de Houssem
> « Je valide la révision de la page « niveau d'huile » : les lignes 1 et 2 inchangées avec les citations Toyota et leurs
> lignes d'écart, la ligne 3 nouvelle (baisse anormale du niveau) à Oui, avec précautions et À faire dans les jours qui
> viennent, la réponse directe, la fiche du tutoriel, les étapes, le tableau et les faits du texte. »

Après validation : empreinte posée (`npm run empreinte`), CI verte, mise en ligne, vérification en ligne.
