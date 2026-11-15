# Relevé des notices, lot 5c : pages voyant AdBlue et voyant de préchauffage (14/11/2026)

> Passages relus à l'écran le 14/11/2026 (de 17 h 30 à 18 h 45 environ) dans les notices du registre, sauf mention « extrait de l'étape 5 » (texte relevé le 24/10 dans `claude/notices-etape-5/` (projet Claude)). Les guillemets signalent un texte recopié ; le reste est un résumé fidèle. Données internes, jamais publiées.

## Seat Ibiza, p. 286-287 (extrait de l'étape 5, `seat-ibiza.txt`, PDF 288-289)
- p. 286 : « Lorsque l'autonomie devient restante inférieure à 2 400 km, une indication s'affiche sur l'écran du combiné d'instruments pour indiquer qu'il est nécessaire de remplir le réservoir d'AdBlue®. Si ce message est ignoré, le témoin lumineux jaune s'allume après une autonomie restante de 1 000 km. L'écran du combiné d'instruments indique qu'il ne sera plus possible de redémarrer le moteur dans XXX km. Si le témoin lumineux jaune est ignoré, lorsqu'une autonomie restante de 0 km est affichée, il n'est plus possible de redémarrer le moteur. Le voyant d'avertissement rouge s'allume. »
- p. 286, témoins : rouge seul : « Il est impossible de redémarrer le moteur ! Le niveau d'AdBlue est trop faible. Arrêtez le véhicule dans un endroit adéquat, sûr et plat, puis faites l'appoint avec la quantité minimale nécessaire d'additif AdBlue » ; rouge avec un autre témoin : « Dysfonctionnement du circuit d'Adblue. Adressez-vous à un atelier spécialisé. Faites réviser le système. » ; jaune seul : « La réserve d'AdBlue est faible. Faites l'appoint […] dans les prochains kilomètres […] indiqués » ; jaune avec un autre témoin : « Un dysfonctionnement a été détecté dans le circuit d'AdBlue ou le liquide AdBlue rajouté n'est pas conforme. Adressez-vous à un atelier spécialisé. »
- p. 287 : « ajoutez au minimum la quantité minimale nécessaire (environ 5 litres) ».

## Toyota Yaris
- La notice du registre ne décrit pas de moteur Diesel (ni AdBlue ni préchauffage) : rien à relever.

Les sections suivantes reprennent les notes prises pendant la lecture à l'écran (14/11, de 17 h 30 à 18 h 45 environ).

## Renault Clio 5 phase 2, p. 166 (Entretien/Autonomie) — témoins vérifiés à l'écran
- « Prévoir AdBlue avant 2400 km » : aucun témoin (« - ») ; à la mise sous contact, moins de 2 400 km d'autonomie ; prévoir le remplissage (soi-même ou un représentant).
- « Remplir AdBlue avant 1200 km » : témoin AdBlue s'allume ; entre 1 200 et 800 km.
- « XXX KM blocage remplir AdBlue » : témoin AdBlue s'allume ; message répété tous les 100 km environ (800 à 200 km), tous les 50 km environ (< 200 km) ; plein dès que possible.
- « 0 KM blocage remplir AdBlue » : témoin AdBlue CLIGNOTE ; démarrage impossible ; pour redémarrer, faire soi-même le plein de réactif.
- ATTENTION : l'extrait de l'étape 5 plaçait « [témoin] clignote » devant « XXX KM » : décalage du texte extrait ; l'écran montre « clignote » pour « 0 KM » seulement.

## Renault p. 167 (Anomalies) — témoins AdBlue ET Service (clé) s'allument pour les trois cas
- « Antipollution à contrôler », « Qualité AdBlue à contrôler », « Injection AdBlue à contrôler » : défaillance du système ; représentant le plus tôt possible.
- « XXX KM blocage antipollution » : défaillance et moins de 800 km avant redémarrage impossible ; alertes tous les 100 km (800 à 200), tous les 50 km (< 200) ; représentant le plus tôt possible.
- « 0 KM blocage antipollution » : après coupure du contact, redémarrage impossible ; faire appel à un représentant.

## Dacia Sandero 3, p. 138-139 : mêmes tableaux que Renault, sauf « 0KM BLOCAGE REMPLIR ADBLUE » : témoin AdBlue « s'allume » (pas « clignote ») ; Dacia ajoute « ou un appoint » au remplissage. p. 139 : AdBlue et Service, mêmes trois cas.

## Peugeot 208, p. 15 « AdBlue (BlueHDi) »
- Allumé 30 s environ à chaque démarrage + message d'autonomie : 2 400 à 800 km ; faire un appoint.
- Fixe dès la mise du contact + signal sonore + message : 800 à 100 km ; faire rapidement un appoint, ou effectuer (3).
- Clignotant + signal sonore + message : < 100 km ; faire impérativement un appoint pour éviter le blocage du démarrage, ou effectuer (3).
- Clignotant + signal sonore + message d'interdiction du démarrage : réservoir vide ; le dispositif d'antidémarrage réglementaire empêche le redémarrage.
- p. 16 : pour redémarrer, appoint ou effectuer (2) ; « Il est impératif de verser une quantité minimale de 5 litres d'AdBlue dans son réservoir. »
## Peugeot p. 16 « Système d'antipollution SCR (BlueHDi) »
- AdBlue + autodiagnostic moteur fixes dès la mise du contact + signal sonore + message : dysfonctionnement SCR ; l'alerte disparaît dès que le niveau d'émission redevient conforme.
- AdBlue clignotant + moteur fixe + signal sonore + message d'autonomie : selon le message, jusqu'à 1 100 km avant le déclenchement de l'antidémarrage ; effectuer (3) au plus tôt pour éviter le blocage du démarrage.
- AdBlue clignotant + moteur fixe + message d'interdiction de démarrage : l'antidémarrage empêche le redémarrage (dépassement de la limite de roulage autorisée après confirmation du dysfonctionnement) ; pour redémarrer, effectuer (2).

## À traiter avant la page AdBlue (lot 5c) : demande de changement n° 24 (base voyants)
- Ligne `adblue-reserve`, citation Renault p. 166 (deuxième) : l'extrait commence par « [témoin] clignote. « XXX KM blocage remplir AdBlue » » ; à l'écran (14/11), le témoin « s'allume » pour « XXX KM » et « clignote » pour « 0 KM ». Extrait à corriger (« [témoin] s'allume. ») ; niveau inchangé (« dès que possible » : oui avec précautions, immédiate). L'outil en ligne n'affiche pas l'extrait (vérifié : « XXX KM » absent de /voyants/). Le tableau des notices de la page AdBlue l'afficherait.
- Ligne `adblue-demarrage-impossible` : Renault « 0 KM » : témoin qui clignote (à l'écran) ; Dacia : « s'allume ». La situation dit « rouge ou clignote » : cohérent.

## Lectures prévues pour la page AdBlue (brief) — faites le 14/11, voir les sections suivantes
- « Voyant AdBlue reste allumé après remplissage », « qu'est-ce que l'AdBlue », « combien il en reste », « AdBlue danger » : sections de remplissage et de mise en garde des notices : Peugeot 208 (chapitre AdBlue des informations pratiques, page à trouver), Renault p. 163-165, Dacia p. 135-137, Seat p. 287 (quantité minimale environ 5 litres, déjà relevée). Toyota Yaris lue : pas de version Diesel.
- Seat p. 286 (extrait de l'étape 5) : indication sous 2 400 km ; témoin jaune à 1 000 km, « plus possible de redémarrer le moteur dans XXX km » ; rouge à 0 km.

## Préchauffage (lot 5c)
- Seat p. 289 : témoin de préchauffage qui clignote : « Dysfonctionnement de la gestion du moteur diesel. Faites immédiatement contrôler le moteur par un atelier spécialisé. » ; Nota : tant que les voyants restent allumés, dysfonctionnement possible, consommation en hausse, perte de puissance. Ligne saisie liée au voyant `prechauffage` (une seule notice : la page le dit), niveau « oui avec précautions, immédiate » à vérifier sur la grille. Journal : le clignotement n'est décrit que par Seat (relu pour le lot 3b).

## Renault Clio 5 phase 2, p. 163-164 « Réservoir réactif », lu à l'écran le 14/11 (≈ 17 h 50)
- p. 163 : « Le réactif est destiné aux moteurs Diesel équipés du système SCR (réduction catalytique sélective). L'utilisation de réactif permet de diminuer la quantité d'oxydes d'azote présents dans les gaz d'échappement. » ; consommation selon les conditions d'utilisation, les équipements et le style de conduite ; qualité : « exclusivement le liquide réactif conforme à la norme ISO 22241 » ; mise en garde : « Le réactif ne doit pas entrer en contact avec les yeux ou la peau. Si un tel contact survient, rincez abondamment à l'eau. Si besoin, consultez un médecin. » ; capacité utilisable : 11 litres environ ; vapeurs d'ammoniaque possibles à l'ouverture si le réservoir est chaud ; remplissage moteur arrêté (pas en veille Stop and Start), contact coupé ; législation locale (poursuites possibles si non-respect).
- p. 164 : bouchon spécifique ; pas de nettoyeur haute pression ; remplissage possible à la pompe (pistolet en butée ; après le premier arrêt automatique, au maximum deux autres déclenchements) ; réactif agressif pour vêtements, chaussures, carrosserie ; pas d'eau dans le réservoir ; gèle sous -10 °C environ ; **après le remplissage : vérifier bouchon et portillon, démarrer et attendre impérativement 10 secondes, à l'arrêt, moteur allumé ; sinon, prise en compte automatique seulement après plusieurs dizaines de minutes de roulage ; le message « --- REMPLIR ADBLUE » et/ou les voyants continuent d'apparaître jusqu'à la prise en compte** (réponse à « reste allumé après remplissage »).

## Dacia Sandero 3, p. 135-136 « Réservoir réactif », lu à l'écran le 14/11 : mêmes textes que Renault p. 163-164 (SCR, oxydes d'azote, ISO 22241, 11 litres environ, contact coupé, moteur arrêté et pas en veille, mise en garde yeux et peau, agressif pour vêtements et carrosserie, gel sous -10 °C, **attendre impérativement 10 secondes moteur allumé à l'arrêt après le remplissage ; sinon prise en compte après plusieurs dizaines de minutes de roulage ; message « ---REMPLIR ADBLUE » et/ou voyants jusqu'à la prise en compte**).
- Reste : Peugeot 208, chapitre AdBlue (informations pratiques), page à trouver.

## Peugeot 208, p. 170-171 « AdBlue (BlueHDi) », lu à l'écran le 14/11 (≈ 18 h 05)
- p. 170 : norme Euro 6, SCR et FAP ; « À l'aide d'un liquide appelé AdBlue qui contient de l'urée, un catalyseur transforme jusqu'à 85 % des oxydes d'azote (NOx) en azote et en eau, inoffensifs pour la santé et l'environnement. » ; réservoir spécifique d'environ 15 litres ; autonomie avant alerte d'environ 6 500 km, fortement variable selon le mode de conduite ; alerte à la réserve : environ 2 400 km avant le réservoir vide ; réservoir vide : un dispositif réglementaire empêche le redémarrage ; SCR défaillant : le véhicule devient polluant ; dysfonctionnement confirmé : se rendre dès que possible dans le réseau ou un atelier qualifié ; « Après 1 100 km parcourus, un dispositif s'active automatiquement pour empêcher le démarrage du moteur » ; dans les deux cas, un indicateur d'autonomie indique la distance avant l'immobilisation ; gel à -11 °C environ, réchauffage du réservoir ; approvisionnement : appoint dès la première alerte, norme ISO 22241, ne jamais transvaser ni diluer, réseau Peugeot, ateliers, stations-service avec pompes AdBlue pour véhicules particuliers ; stockage : gèle sous -11 °C, se dégrade à partir de +25 °C.
- p. 171 : précautions : solution à base d'urée, ininflammable, incolore, inodore ; peau : laver à l'eau courante et au savon ; yeux : rincer immédiatement et abondamment au moins 15 minutes, médecin si brûlure ou irritation persistante ; ingestion : rincer la bouche, boire beaucoup d'eau ; vapeurs d'ammoniac possibles par forte température, ne pas inhaler ; hors de portée des enfants ; ne jamais verser l'AdBlue dans le réservoir de gazole ; procédure : surface plane et horizontale ; **après une panne d'AdBlue, patienter environ 5 minutes avant de remettre le contact (sans ouvrir la porte conducteur, ni déverrouiller, ni introduire la clé), mettre le contact, puis démarrer après 10 secondes** ; appoint de 10 à 13 litres avec des bidons ; **tout appoint doit être d'au moins 5 litres pour être pris en compte par le système**.
- p. 21-22 : indicateur d'autonomie AdBlue, lu à l'écran ensuite (section suivante).

## Peugeot 208, p. 21-22 « Indicateurs d'autonomie d'AdBlue (BlueHDi) », lu à l'écran le 14/11 (≈ 18 h 10)
- p. 21 : sous la réserve (2 400 à 0 km), un témoin s'allume à la mise du contact avec une estimation de la distance avant le blocage du démarrage ; l'antidémarrage réglementaire s'active automatiquement quand le réservoir est vide ; redémarrage impossible tant qu'un niveau minimal n'est pas restauré ; **affichage manuel de l'autonomie** (combiné matrice ou numérique) : au-dessus de 2 400 km elle ne s'affiche pas d'elle-même, touche « Check » du menu Conduite / Véhicule de l'écran tactile ; tableau : 2 400 à 800 km, procéder à un appoint ; 800 à 100 km, rapidement ; 100 à 0 km, l'appoint est impératif, risque de blocage du démarrage.
- p. 22 : 0 km : verser au minimum 5 litres pour redémarrer ; **dysfonctionnement du système SCR** : témoins AdBlue et moteur, signal sonore, message « Défaut antipollution » ou « NO START IN » ; l'alerte se déclenche en roulant à la première détection, puis à la mise du contact tant que la cause persiste ; dysfonctionnement temporaire : l'alerte disparaît au trajet suivant ; **confirmé après 50 km d'affichage permanent : le témoin AdBlue clignote, message « Défaut antipollution : Démarrage interdit dans X km » (ou « NO START IN X km »), toutes les 30 secondes en roulant et à chaque mise du contact ; on peut rouler jusqu'à 1 100 km avant l'antidémarrage ; faire vérifier par le réseau ou un atelier qualifié** ; démarrage interdit : message « Défaut antipollution : Démarrage interdit » à chaque mise du contact.

## Seat Ibiza p. 289, lu à l'écran le 14/11 (≈ 18 h 45), pour la page préchauffage
- Témoin de préchauffage (spirale) allumé : « Système de préchauffage du moteur diesel. Lorsque le témoin s'éteint, le moteur peut être démarré immédiatement. » ; clignote : « Dysfonctionnement de la gestion du moteur diesel. Faites immédiatement contrôler le moteur par un atelier spécialisé. »
- Nota : « Tant que les voyants [moteur], [gaz d'échappement], EPC ou [spirale de préchauffage] restent allumés, il est possible que le moteur présente un dysfonctionnement, que la consommation de carburant augmente et que le moteur perde de la puissance. » (le dernier dessin est la spirale, comme en tête de l'entrée « Témoin allumé »).
- Colonne centrale : panne de combustion, baisse de puissance ou fonctionnement irrégulier du moteur : contacter un atelier spécialisé pour faire réviser le véhicule.


## Faits retirés des brouillons faute de relevé (14/11, avant la revue)
- Peugeot 208 p. 21 : « ces moteurs ne peuvent pas fonctionner sans AdBlue » : phrase absente des notes de lecture ; remplacée d'abord par le fait relevé p. 170 (réservoir vide : un dispositif réglementaire empêche le redémarrage), puis **rétablie après la revue** : le relecteur l'a trouvée dans le PDF, et Claude l'a vérifiée par WebFetch le 14/11 au soir (p. 21 : « Ils ne peuvent fonctionner sans liquide AdBlue® »).
- Renault Clio 5 phase 2 p. 164 : consigne de rinçage des parties peintes : absente des notes ; seul « agressif pour les vêtements, les chaussures et la carrosserie » est gardé.

## Vérifications de la revue indépendante (14/11 au soir)
- Renault p. 166 : le relecteur confirme, par une extraction indépendante du PDF du registre, l'ordre « - », « s'allume », « s'allume », « clignote » pour les quatre messages (demande n° 24).
- Peugeot p. 14, 15, 16, 21, 22, 170, 171 ; Renault p. 139, 163, 164, 166, 167 ; Seat p. 286, 287, 289 : relus par le relecteur sur les PDF, conformes aux brouillons. Dacia p. 135-136 : non vérifiables par le relecteur (erreur du serveur), relues à l'écran par Claude seulement.
- Pictogrammes perdus à l'extraction : le témoin associé à l'AdBlue chez Seat (p. 286) restait à identifier sur le PDF (fait pour la demande n° 25, voir plus bas) ; chez Renault et Dacia (p. 167 et 139), Claude l'a relevé à l'écran comme le témoin Service (clé).

## Demande n° 25 (14/11 au soir) : témoin associé chez Seat, notice Citroën C3

- **Seat Ibiza p. 286 (PDF 288)**, lu à l'écran par Claude le 14/11 vers 21 h 15 (Chrome, PDF du registre, zoom sur le
  tableau « Témoins d'alerte et de contrôle », partie AdBlue) : les deux lignes à deux symboles, « Il s'allume en
  jaune. Un dysfonctionnement a été détecté dans le circuit d'AdBlue… » et « Il s'allume en rouge. Il est impossible de
  redémarrer le moteur ! Dysfonctionnement du circuit d'Adblue… », montrent le symbole AdBlue suivi du symbole de la
  **clé** (entretien), et non le voyant moteur. Le texte extrait du PDF n'a que des blancs à la place des symboles : la
  lecture n'est pas vérifiable par une extraction ; à revoir par Houssem sur le PDF (page 288 du fichier) avec la
  validation de la demande. La clé est aussi le symbole de l'indicateur d'entretien de la Seat Ibiza (base,
  `entretien-vidange`).
- **Citroën C3, guide d'utilisation édition 01-20** (`notice-citroen-c3`), lu le 14/11 vers 22 h 05 par WebFetch (texte du
  PDF du registre ; même lecture par le relecteur de la demande, indépendamment) ; à confirmer à l'écran :
  - p. 12, témoin AdBlue, moteur 1.5 BlueHDi (Euro 6.2/6.3) : mêmes seuils et consignes que la Peugeot 208 p. 15
    (allumé environ 30 secondes entre 2 400 et 800 km ; fixe entre 800 et 100 km, appoint rapide ou (3) ; clignotant
    sous 100 km, appoint impératif ou (3) ; clignotant, démarrage interdit : appoint ou (2)) ;
  - p. 12, moteur 1.6 BlueHDi (Euro 6.1) : fixe dès la mise du contact entre 2 400 et 600 km (« Faire rapidement un
    appoint en AdBlue®, ou effectuer (3) ») ; **clignotant avec le témoin Service fixe sous 600 km** (« Faire
    impérativement un appoint en AdBlue® » pour éviter la panne, ou (3)) ; clignotant avec Service fixe et démarrage
    interdit (réservoir vide) : appoint (au moins 5 litres) ou (2) ;
  - p. 13, système d'antipollution SCR : témoin AdBlue clignotant dès la mise du contact avec les témoins Service et
    Autodiagnostic moteur fixes : jusqu'à 1 100 km possibles, « Effectuer (3) au plus tôt pour éviter le blocage du
    démarrage » ; au-delà, démarrage interdit, (2) ;
  - p. 13, témoin Service : distinct du témoin de clé d'entretien (« Service fixe et témoin de clé d'entretien
    clignotant puis fixe » : révision dépassée, moteurs BlueHDi) ;
  - p. 9 : (1) arrêt impératif ; (2) faire appel au réseau Citroën ou à un atelier qualifié ; (3) se rendre dans le
    réseau Citroën ou dans un atelier qualifié.
  - Conséquence pour la demande : le voyant Service n'est pas, à lui seul, le signe d'un défaut (C3 1.6 : réserve
    basse) ; la ligne `adblue-defaut` se définit par le message de défaut, et la page le dit. La C3 n'est pas ajoutée
    aux citations de la base (extraits mot pour mot à relever à l'écran) : elle est citée dans le texte de la page.

## Pour la page voyant frein (D4), hors de ce lot
- Contrôle technique (pour la page frein, D4) : annexe I, 1.1.13.d.1 « Faisceau électrique du témoin d'usure déconnecté ou détérioré » : mineure ; 1.1.13.a.2 usure excessive : majeure.
