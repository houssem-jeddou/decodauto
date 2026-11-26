---
# Page « voyant AdBlue » de la vague A (étape 8, lot 5c), rédigée le 14/11/2026 et validée par Houssem le 14/11/2026 (19 h 53) ;
# mise à jour par la demande de changement n° 25 (lignes AdBlue de la base), validée par Houssem le 14/11/2026 (22 h 45).
id: voyant-adblue
title: "Voyant AdBlue allumé : peut-on rouler, que faire ?"
h1: "Voyant AdBlue : réserve basse, défaut antipollution ou démarrage impossible"
description: "Voyant AdBlue : faites l'appoint sans attendre, avant la fin de l'autonomie affichée. Défaut : garage au plus tôt ; avec le voyant moteur, arrêtez-vous."
libelle_court: Voyant AdBlue
question_decision: Puis-je continuer à rouler avec le voyant AdBlue allumé ?
situations:
  - voyant: adblue-reserve
  - voyant: adblue-defaut
  - voyant: moteur-orange-fixe
  - voyant: adblue-demarrage-impossible
voyants:
  - adblue-reserve
  - adblue-defaut
  - moteur-orange-fixe
  - adblue-demarrage-impossible
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site) : de l'appoint déjà fait mais pas encore pris en compte, sans dépense, à la grosse réparation du système AdBlue (réservoir, pompe ou injecteur), en passant par l'appoint d'AdBlue, que vous pouvez faire vous-même."
  sources:
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-renault-clio-5
    - notice-seat-ibiza
sources:
  - notice-citroen-c3
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-21
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
# Encadré de décision (question, lignes, coût probable et pièces des causes) revalidé par Houssem le 14/11/2026 (22 h 45),
# avec les faits du texte (paquet travaux/etape-8/paquet-demande-25.md).
validation: 4964e5abae750cd91f553edf30e8e041948bb7ccb06348a5c8874a24421d54c4
causes:
  - cause: Appoint pas encore pris en compte par le système
    explication: "Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, si l'on ne laisse pas tourner le moteur 10 secondes à l'arrêt après le remplissage, le système ne prend en compte l'appoint qu'après plusieurs dizaines de minutes de roulage."
    pieces:
      - fonctionnement-normal
  - cause: Réserve d'AdBlue basse ou réservoir vide
    explication: "Les notices Peugeot 208, Renault Clio 5 phase 2, Dacia Sandero 3 et Seat Ibiza préviennent à partir d'environ 2 400 km d'autonomie ; réservoir vide, le moteur ne redémarre plus tant qu'on n'a pas fait l'appoint. Selon la notice Peugeot 208, un appoint de moins de 5 litres n'est pas pris en compte : il faut en verser davantage."
    pieces:
      - appoint-adblue
  - cause: Système AdBlue défaillant ou liquide non conforme
    explication: "Les notices Peugeot 208, Renault Clio 5 phase 2 et Dacia Sandero 3 signalent une défaillance du système d'antipollution ; selon la notice Seat Ibiza, l'alerte peut aussi venir d'un liquide AdBlue rajouté non conforme. Aucune notice ne nomme la pièce en cause : le diagnostic au garage le dit."
    pieces:
      - systeme-adblue
format: 2
illustration:
  fichier: voyant-adblue-autonomie
  alt: "Le voyant AdBlue allumé avec un message d’autonomie"
  legende: "Exemple d’écran : sous 800 km d’autonomie, le message « XXX KM blocage remplir AdBlue » se répète (notices Renault Clio 5 phase 2 et Dacia Sandero 3)."
---

## Peut-on rouler avec le voyant AdBlue allumé ?

Tout dépend du message qui l'accompagne.

**Réserve basse, avec un message d'autonomie, sans le voyant moteur** : {{verdict:adblue-reserve}}. Le voyant prévient que le réservoir d'AdBlue se vide : une fois l'autonomie affichée à zéro, le moteur ne redémarre plus. Faites l'appoint avant : les seuils de chaque marque sont détaillés plus bas.

**Avec un message de défaut antipollution, sans le voyant moteur** : {{verdict:adblue-defaut}}. Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3 (voyants AdBlue et Service, messages « … à contrôler ») et Seat Ibiza (voyant AdBlue jaune avec la clé), le système d'antipollution est en défaut ; chez Renault et Dacia, un compte à rebours peut s'afficher avant que le démarrage soit bloqué : allez au garage au plus tôt.

Le voyant Service ne suffit pas à distinguer ce défaut : sur la Citroën C3 à moteur 1.6 BlueHDi, le voyant AdBlue qui clignote avec le voyant Service annonce une réserve basse ({{cite:notice-citroen-c3|p. 12}}). Lisez le message affiché.

**Avec le voyant moteur** : c'est la consigne du [voyant moteur](/voyants/moteur/), plus prudente, qui s'applique : {{verdict:moteur-orange-fixe}}. Elle laisse repartir jusqu'au garage si la notice de votre voiture le permet, comme celle de la Peugeot 208 (voir plus bas).

**Démarrage impossible (autonomie à 0 km)** : {{verdict:adblue-demarrage-impossible}}. La notice Seat Ibiza demande d'arrêter la voiture dans un endroit adéquat, sûr et plat, puis de faire l'appoint avec la quantité minimale d'AdBlue ; si c'est le circuit d'AdBlue qui est défaillant (voyant AdBlue rouge avec la clé), de s'adresser à un atelier spécialisé ({{cite:notice-seat-ibiza|p. 286}}). Selon les notices Peugeot 208, Renault Clio 5 phase 2 et Dacia Sandero 3, le moteur ne redémarre pas sans appoint ou sans intervention du réseau.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-citroen-c3}}
- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}

La notice Toyota Yaris lue pour les autres pages du site ne décrit pas de moteur Diesel : elle ne parle pas d'AdBlue.

## Les messages d'autonomie, marque par marque

- **Peugeot 208** : entre 2 400 et 800 km d'autonomie, le témoin s'allume environ 30 secondes à chaque démarrage, avec un message : faites un appoint. Entre 800 et 100 km, il reste allumé avec un signal sonore : appoint rapide. Sous 100 km, il clignote : l'appoint est impératif pour éviter le blocage du démarrage ({{cite:notice-peugeot-208|p. 15 et 21}}).
- **Renault Clio 5 phase 2 et Dacia Sandero 3** : sous 2 400 km, un message demande de prévoir l'appoint, sans témoin ; entre 1 200 et 800 km, le témoin s'allume ; ensuite, le message « XXX KM blocage remplir AdBlue » se répète tous les 100 km environ, puis tous les 50 km sous 200 km : faites le plein de réactif dès que possible. À « 0 KM », le témoin clignote (Renault) ou reste allumé (Dacia) et le démarrage est impossible : il faut faire soi-même le plein de réactif pour redémarrer ({{cite:notice-renault-clio-5|p. 166}}, {{cite:notice-dacia-sandero-3|p. 138}}).
- **Seat Ibiza** : un message s'affiche sous 2 400 km ; le témoin jaune s'allume à 1 000 km, avec la distance avant que le moteur ne puisse plus redémarrer ; il passe au rouge à 0 km ({{cite:notice-seat-ibiza|p. 286}}).
- **Citroën C3** : avec le moteur 1.5 BlueHDi, mêmes seuils que la Peugeot 208. Avec le 1.6 BlueHDi (Euro 6.1), le voyant reste allumé entre 2 400 et 600 km : appoint rapide ; sous 600 km, il clignote avec le voyant Service allumé : l'appoint est impératif pour éviter la panne ({{cite:notice-citroen-c3|p. 12}}).

À 0 km, il faut verser au moins la quantité minimale indiquée par la notice : 5 litres pour la Peugeot 208 ({{cite:notice-peugeot-208|p. 22}}), environ 5 litres pour la Seat Ibiza ({{cite:notice-seat-ibiza|p. 287}}). Consigne de l'encadré pour la réserve basse, avant 0 km : {{verdict:adblue-reserve}} ; à 0 km, celle du démarrage impossible : {{verdict:adblue-demarrage-impossible}}.

## Défaut antipollution, démarrage impossible dans 1 100 km : que faire ?

Ces messages sont ceux de la Peugeot 208, où le témoin AdBlue s'allume avec le voyant moteur ({{cite:notice-peugeot-208|p. 16}}) : la consigne de l'encadré est donc celle du voyant moteur, la plus prudente : {{verdict:moteur-orange-fixe}}. Selon la notice, le message « Défaut antipollution » signale un dysfonctionnement du système d'antipollution ; si le défaut était passager, l'alerte disparaît au trajet suivant. S'il persiste pendant 50 km, il est confirmé : le témoin AdBlue clignote, et le message « Démarrage interdit dans X km » annonce la distance qui reste avant que le dispositif d'antidémarrage se déclenche, au plus tard après 1 100 km.

La notice Peugeot 208 demande de faire vérifier la voiture par le réseau Peugeot ou un atelier qualifié ({{cite:notice-peugeot-208|p. 22}}) : elle permet donc de rouler jusqu'au réseau, à rejoindre sans attendre. La notice Citroën C3 décrit le même cas, avec en plus le voyant Service ({{cite:notice-citroen-c3|p. 13}}).

Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, les témoins AdBlue et Service s'allument avec les messages « Antipollution à contrôler », « Qualité AdBlue à contrôler » ou « Injection AdBlue à contrôler » : consultez un représentant de la marque le plus tôt possible. Le message « XXX KM blocage antipollution » indique qu'il reste moins de 800 km avant que le redémarrage soit impossible ; à « 0 KM », le moteur ne redémarre plus après la coupure du contact ({{cite:notice-renault-clio-5|p. 167}}, {{cite:notice-dacia-sandero-3|p. 139}}). Sans le voyant moteur, et tant que l'autonomie affichée n'est pas à 0 km, la consigne de l'encadré est : {{verdict:adblue-defaut}} ; à « 0 KM », c'est celle du démarrage impossible : {{verdict:adblue-demarrage-impossible}}.

Le message « défaut de consommation du réactif », que cherchent aussi les lecteurs, n'apparaît dans aucune des notices lues pour cette page : c'est la notice de votre voiture qui dit ce qu'il signale.

## Voyant AdBlue allumé après le remplissage

Le remplissage n'est pas toujours pris en compte tout de suite. Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, il faut démarrer le moteur et attendre 10 secondes, voiture à l'arrêt, avant de repartir ; sinon, le système ne prend en compte le remplissage qu'après plusieurs dizaines de minutes de roulage, et le message ou les voyants restent affichés jusque-là ({{cite:notice-renault-clio-5|p. 164}}, {{cite:notice-dacia-sandero-3|p. 136}}).

Selon la notice Peugeot 208, un appoint doit être d'au moins 5 litres pour être pris en compte ; après une panne d'AdBlue, il faut attendre environ 5 minutes avant de remettre le contact, sans ouvrir la porte du conducteur ni déverrouiller la voiture, puis attendre 10 secondes contact mis avant de démarrer ({{cite:notice-peugeot-208|p. 171}}).

Si le voyant reste allumé avec un message de défaut, sans le voyant moteur : {{verdict:adblue-defaut}} ; avec le voyant moteur, c'est la consigne du voyant moteur qui s'applique. Selon la notice Seat Ibiza, un liquide AdBlue rajouté non conforme peut déclencher l'alerte ({{cite:notice-seat-ibiza|p. 286}}).

## Qu'est-ce que l'AdBlue, et combien en reste-t-il ?

C'est une solution à base d'urée, qui sert au système d'antipollution des moteurs Diesel : selon la notice Peugeot 208, un catalyseur transforme avec elle jusqu'à 85 % des oxydes d'azote en azote et en eau ({{cite:notice-peugeot-208|p. 170}}). Selon la même notice, les moteurs Diesel BlueHDi ne peuvent pas fonctionner sans AdBlue ({{cite:notice-peugeot-208|p. 21}}) : quand le réservoir est vide, un dispositif réglementaire empêche le moteur de redémarrer ({{cite:notice-peugeot-208|p. 170}}). Les notices demandent un liquide conforme à la norme ISO 22241 ({{cite:notice-peugeot-208|p. 170}}, {{cite:notice-renault-clio-5|p. 163}}, {{cite:notice-dacia-sandero-3|p. 135}}).

Le réservoir contient environ 15 litres sur la Peugeot 208 ({{cite:notice-peugeot-208|p. 170}}) ; sa capacité utilisable est d'environ 11 litres sur la Renault Clio 5 phase 2 et la Dacia Sandero 3 ({{cite:notice-renault-clio-5|p. 163}}, {{cite:notice-dacia-sandero-3|p. 135}}). Sur la Peugeot 208 à combiné matrice ou numérique, l'autonomie qui reste s'affiche à la demande, par la touche « Check » du menu Conduite / Véhicule de l'écran tactile ; sous 2 400 km, elle s'affiche d'elle-même à la mise du contact ({{cite:notice-peugeot-208|p. 21}}).

## Faire l'appoint : les précautions des notices

- Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, faites l'appoint moteur arrêté et contact coupé ({{cite:notice-renault-clio-5|p. 163}}, {{cite:notice-dacia-sandero-3|p. 135}}) ; selon la notice Peugeot 208, voiture sur un sol plat et horizontal ({{cite:notice-peugeot-208|p. 171}}).
- Selon la notice Peugeot 208, ne versez jamais l'AdBlue dans le réservoir de gazole, et ne le diluez ni ne le transvasez jamais ({{cite:notice-peugeot-208|p. 170-171}}).
- Il gèle vers -11 °C selon la notice Peugeot 208 ({{cite:notice-peugeot-208|p. 170}}), vers -10 °C selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3 ({{cite:notice-renault-clio-5|p. 164}}, {{cite:notice-dacia-sandero-3|p. 135-136}}).
- Selon la notice Peugeot 208, c'est un liquide ininflammable, incolore et inodore. En cas de contact avec les yeux, rincez-les immédiatement et abondamment pendant au moins 15 minutes, et consultez un médecin si la brûlure ou l'irritation persiste ; avec la peau, lavez à l'eau et au savon ; en cas d'ingestion, rincez la bouche et buvez beaucoup d'eau. Gardez les bidons hors de portée des enfants ({{cite:notice-peugeot-208|p. 171}}).
- Par forte température, selon la notice Peugeot 208, des vapeurs d'ammoniac peuvent se dégager : ne les inhalez pas ({{cite:notice-peugeot-208|p. 171}}). Selon la notice Renault Clio 5 phase 2, il peut s'en dégager à l'ouverture du bouchon quand le réservoir est chaud ({{cite:notice-renault-clio-5|p. 163}}).
- Selon la notice Renault Clio 5 phase 2, le réactif est agressif pour les vêtements, les chaussures et la carrosserie ({{cite:notice-renault-clio-5|p. 164}}) ; la notice Dacia Sandero 3 le dit aussi pour les vêtements et la carrosserie ({{cite:notice-dacia-sandero-3|p. 136}}). Selon les deux notices, il ne doit pas entrer en contact avec les yeux ou la peau : en cas de contact, rincez abondamment à l'eau, et consultez un médecin si besoin ({{cite:notice-renault-clio-5|p. 163}}, {{cite:notice-dacia-sandero-3|p. 135}}).
