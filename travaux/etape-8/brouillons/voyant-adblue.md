---
# Brouillon de la page « voyant AdBlue » de la vague A (étape 8, lot 5c), rédigé le 14/11/2026, à valider par Houssem.
# Hors de exemples/ et de src/content tant qu'il n'est pas validé. Les lignes de l'encadré viennent de la base voyants.
id: voyant-adblue
title: "Voyant AdBlue allumé : peut-on rouler, que faire ?"
h1: "Voyant AdBlue : réserve basse, défaut antipollution ou démarrage impossible"
description: "Voyant AdBlue allumé : faites l'appoint avant la fin de l'autonomie affichée. Défaut antipollution, « démarrage interdit dans 1 100 km » : garage au plus tôt. Messages de chaque notice."
libelle_court: Voyant AdBlue
question_decision: Puis-je continuer à rouler avec le voyant AdBlue allumé ?
situations:
  - voyant: adblue-reserve
  - voyant: adblue-defaut
  - voyant: adblue-demarrage-impossible
voyants:
  - adblue-reserve
  - adblue-defaut
  - adblue-demarrage-impossible
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site) : de l'appoint d'AdBlue, que vous pouvez faire vous-même, à la grosse réparation du système AdBlue (réservoir, pompe ou injecteur)."
  sources:
    - notice-peugeot-208
    - notice-renault-clio-5
    - notice-seat-ibiza
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-14
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
causes:
  - cause: Appoint pas encore pris en compte par le système
    explication: "Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, si l'on ne laisse pas tourner le moteur 10 secondes à l'arrêt après le remplissage, le système ne prend en compte l'appoint qu'après plusieurs dizaines de minutes de roulage ; selon la notice Peugeot 208, un appoint de moins de 5 litres n'est pas pris en compte."
    pieces:
      - fonctionnement-normal
  - cause: Réserve d'AdBlue basse ou réservoir vide
    explication: "Les notices Peugeot 208, Renault Clio 5 phase 2, Dacia Sandero 3 et Seat Ibiza préviennent à partir d'environ 2 400 km d'autonomie ; réservoir vide, le moteur ne redémarre plus tant qu'on n'a pas fait l'appoint."
    pieces:
      - appoint-adblue
  - cause: Système AdBlue défaillant ou liquide non conforme
    explication: "Les notices Peugeot 208, Renault Clio 5 phase 2 et Dacia Sandero 3 signalent une défaillance du système d'antipollution ; selon la notice Seat Ibiza, l'alerte peut aussi venir d'un liquide AdBlue rajouté non conforme. Aucune notice ne nomme la pièce en cause : le diagnostic au garage le dit."
    pieces:
      - systeme-adblue
---

## Peut-on rouler avec le voyant AdBlue allumé ?

Tout dépend du message qui l'accompagne.

**Réserve basse, avec un message d'autonomie** : {{verdict:adblue-reserve}}. Le voyant prévient que le réservoir d'AdBlue se vide : une fois l'autonomie affichée à zéro, le moteur ne redémarre plus. Faites l'appoint avant : les seuils de chaque marque sont détaillés plus bas.

**Défaut antipollution, avec le voyant moteur ou Service** : {{verdict:adblue-defaut}}. Le système d'antipollution est en défaut, et un compte à rebours peut s'afficher avant que le démarrage soit bloqué : allez au garage au plus tôt.

**Démarrage impossible (autonomie à 0 km)** : {{verdict:adblue-demarrage-impossible}}. La notice Seat Ibiza demande d'arrêter la voiture dans un endroit adéquat, sûr et plat, puis de faire l'appoint avec la quantité minimale d'AdBlue ; si c'est le circuit d'AdBlue qui est défaillant, de s'adresser à un atelier spécialisé ({{cite:notice-seat-ibiza|p. 286}}). Selon les notices Peugeot 208, Renault Clio 5 phase 2 et Dacia Sandero 3, le moteur ne redémarre pas sans appoint ou sans intervention du réseau.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}

La notice Toyota Yaris lue pour les autres pages du site ne décrit pas de moteur Diesel : elle ne parle pas d'AdBlue.

## Les messages d'autonomie, marque par marque

- **Peugeot 208** : entre 2 400 et 800 km d'autonomie, le témoin s'allume environ 30 secondes à chaque démarrage, avec un message : faites un appoint. Entre 800 et 100 km, il reste allumé avec un signal sonore : appoint rapide. Sous 100 km, il clignote : l'appoint est impératif pour éviter le blocage du démarrage ({{cite:notice-peugeot-208|p. 15 et 21}}).
- **Renault Clio 5 phase 2 et Dacia Sandero 3** : sous 2 400 km, un message demande de prévoir l'appoint, sans témoin ; entre 1 200 et 800 km, le témoin s'allume ; ensuite, le message « XXX KM blocage remplir AdBlue » se répète tous les 100 km environ, puis tous les 50 km sous 200 km : faites le plein de réactif dès que possible. À « 0 KM », le témoin clignote (Renault) ou reste allumé (Dacia) et le démarrage est impossible : il faut faire soi-même le plein de réactif pour redémarrer ({{cite:notice-renault-clio-5|p. 166}}, {{cite:notice-dacia-sandero-3|p. 138}}).
- **Seat Ibiza** : un message s'affiche sous 2 400 km ; le témoin jaune s'allume à 1 000 km, avec la distance avant que le moteur ne puisse plus redémarrer ; il passe au rouge à 0 km ({{cite:notice-seat-ibiza|p. 286}}).

À 0 km, il faut verser au moins la quantité minimale indiquée par la notice : 5 litres pour la Peugeot 208 ({{cite:notice-peugeot-208|p. 22}}), environ 5 litres pour la Seat Ibiza ({{cite:notice-seat-ibiza|p. 287}}).

## « Défaut antipollution : démarrage interdit dans 1 100 km »

Ce message est celui de la Peugeot 208. Quand un dysfonctionnement du système d'antipollution est détecté, le témoin AdBlue et le [voyant moteur](/voyants/moteur/) s'allument avec le message « Défaut antipollution ». Si le défaut était passager, l'alerte disparaît au trajet suivant. S'il persiste 50 km, il est confirmé : le témoin AdBlue clignote, le message annonce le nombre de kilomètres avant que le démarrage soit interdit, et vous pouvez rouler jusqu'à 1 100 km avant que le moteur ne redémarre plus. La notice demande de faire vérifier la voiture par le réseau Peugeot ou un atelier qualifié ({{cite:notice-peugeot-208|p. 22}}).

Chez Renault et Dacia, les témoins AdBlue et Service s'allument avec les messages « Antipollution à contrôler », « Qualité AdBlue à contrôler » ou « Injection AdBlue à contrôler » : consultez un représentant de la marque le plus tôt possible. Le message « XXX KM blocage antipollution » indique qu'il reste moins de 800 km avant que le redémarrage soit impossible ; à « 0 KM », le moteur ne redémarre plus après la coupure du contact ({{cite:notice-renault-clio-5|p. 167}}, {{cite:notice-dacia-sandero-3|p. 139}}). La consigne de l'encadré : {{verdict:adblue-defaut}}.

## Voyant AdBlue allumé après le remplissage

Le remplissage n'est pas toujours pris en compte tout de suite. Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, il faut démarrer le moteur et attendre 10 secondes, voiture à l'arrêt, avant de repartir ; sinon, le système ne prend en compte le remplissage qu'après plusieurs dizaines de minutes de roulage, et le message ou les voyants restent affichés jusque-là ({{cite:notice-renault-clio-5|p. 164}}, {{cite:notice-dacia-sandero-3|p. 136}}).

Selon la notice Peugeot 208, un appoint doit être d'au moins 5 litres pour être pris en compte ; après une panne d'AdBlue, il faut attendre environ 5 minutes avant de remettre le contact, sans ouvrir la porte du conducteur ni déverrouiller la voiture, puis attendre 10 secondes contact mis avant de démarrer ({{cite:notice-peugeot-208|p. 171}}).

Si le voyant reste allumé avec le voyant moteur ou Service, c'est un défaut : {{verdict:adblue-defaut}}. Selon la notice Seat Ibiza, un liquide AdBlue rajouté non conforme peut déclencher l'alerte ({{cite:notice-seat-ibiza|p. 286}}).

## Qu'est-ce que l'AdBlue, et combien en reste-t-il ?

C'est une solution à base d'urée, qui sert au système d'antipollution des moteurs Diesel : selon la notice Peugeot 208, un catalyseur transforme avec elle jusqu'à 85 % des oxydes d'azote en azote et en eau ({{cite:notice-peugeot-208|p. 170}}). Selon la même notice, quand le réservoir est vide, un dispositif réglementaire empêche le moteur de redémarrer ({{cite:notice-peugeot-208|p. 170}}). Les notices demandent un liquide conforme à la norme ISO 22241 ({{cite:notice-renault-clio-5|p. 163}}).

Le réservoir contient environ 15 litres sur la Peugeot 208 ({{cite:notice-peugeot-208|p. 170}}) ; sa capacité utilisable est d'environ 11 litres sur la Renault Clio 5 phase 2 et la Dacia Sandero 3 ({{cite:notice-renault-clio-5|p. 163}}, {{cite:notice-dacia-sandero-3|p. 135}}). Sur la Peugeot 208 à combiné matrice ou numérique, l'autonomie qui reste s'affiche à la demande, par la touche « Check » du menu Conduite / Véhicule de l'écran tactile ; sous 2 400 km, elle s'affiche d'elle-même à la mise du contact ({{cite:notice-peugeot-208|p. 21}}).

## Faire l'appoint : les précautions des notices

- Moteur arrêté et contact coupé (Renault, Dacia), voiture sur un sol plat et horizontal (Peugeot).
- Ne jamais verser l'AdBlue dans le réservoir de gazole, ne jamais le diluer ni le transvaser (Peugeot, p. 170-171).
- Il gèle vers -11 °C selon la notice Peugeot, -10 °C selon les notices Renault et Dacia.
- Selon la notice Peugeot 208, c'est un liquide ininflammable, incolore et inodore. En cas de contact avec les yeux, rincez-les immédiatement et abondamment pendant au moins 15 minutes, et consultez un médecin si la brûlure ou l'irritation persiste ; avec la peau, lavez à l'eau et au savon ; en cas d'ingestion, rincez la bouche et buvez beaucoup d'eau. Gardez les bidons hors de portée des enfants ({{cite:notice-peugeot-208|p. 171}}).
- Selon la notice Renault Clio 5 phase 2, le réactif est agressif pour les vêtements, les chaussures et la carrosserie ({{cite:notice-renault-clio-5|p. 164}}) ; la notice Dacia Sandero 3 le dit aussi pour les vêtements et la carrosserie ({{cite:notice-dacia-sandero-3|p. 136}}). Selon les deux notices, il ne doit pas entrer en contact avec les yeux ou la peau : en cas de contact, rincez abondamment à l'eau, et consultez un médecin si besoin ({{cite:notice-renault-clio-5|p. 163}}).
