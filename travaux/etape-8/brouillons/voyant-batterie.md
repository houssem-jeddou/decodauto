---
# Brouillon de la page « voyant batterie » de la vague A (étape 8, lot 5b), rédigé le 14/11/2026, à valider par Houssem.
# Hors de exemples/ et de src/content tant qu'il n'est pas validé. La ligne de l'encadré vient de la base voyants.
id: voyant-batterie
title: "Voyant batterie allumé : peut-on rouler, que faire ?"
h1: "Voyant de batterie rouge : que faire quand il s'allume en roulant ?"
description: "Voyant de batterie allumé moteur tournant : arrêtez-vous dès que c'est sans danger, la batterie n'est plus rechargée. Ce que dit chaque notice, causes et coût probable."
libelle_court: Voyant batterie
question_decision: Puis-je continuer à rouler avec le voyant de batterie allumé ?
situations:
  - voyant: batterie-rouge
voyants:
  - batterie-rouge
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site) : des cosses de batterie à nettoyer et resserrer vous-même, comme le demande la notice Peugeot 208, à la réparation du circuit de charge au garage."
  sources:
    - notice-peugeot-208
    - notice-seat-ibiza
    - notice-renault-clio-5
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-14
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
causes:
  - cause: Cosses de batterie sales ou desserrées
    explication: "La notice Peugeot 208 cite les cosses sales parmi les causes d'un circuit de charge défaillant ; elle demande de nettoyer et de resserrer les cosses, puis, si le témoin ne s'éteint pas au démarrage du moteur, de faire appel au réseau ou à un atelier qualifié."
    pieces:
      - cosses-de-batterie
  - cause: Courroie d'alternateur détendue ou cassée
    explication: "La notice Peugeot 208 cite une courroie d'alternateur détendue ou sectionnée parmi les causes d'un circuit de charge défaillant."
    pieces:
      - courroie-d-alternateur
  - cause: Alternateur ou circuit de charge défaillant
    explication: "Selon la notice Seat Ibiza, le témoin signale un dysfonctionnement de l'alternateur : la batterie n'est plus rechargée. Les notices Renault Clio 5 phase 2 et Dacia Sandero 3 associent le message « Panne électrique » à un problème du circuit de charge (alternateur…)."
    pieces:
      - alternateur
---

## Peut-on rouler avec le voyant de batterie allumé ?

Verdict retenu en haut de page : {{verdict:batterie-rouge}}. Quand ce voyant s'allume moteur tournant, la batterie n'est plus rechargée normalement : selon la notice Seat Ibiza, elle se décharge ({{cite:notice-seat-ibiza|p. 302}}). Aucune des notices lues ne donne de distance à ne pas dépasser.

Quatre des cinq notices lues imposent l'arrêt. La notice Peugeot 208 demande l'arrêt impératif du véhicule, stationné dans les meilleures conditions de sécurité, contact coupé ; si le frein de stationnement électrique ne fonctionne plus, elle demande d'immobiliser la voiture autrement : un rapport engagé en boîte manuelle, la position P en boîte automatique EAT6, une cale contre une roue en boîte EAT8 ou avec le sélecteur de marche ({{cite:notice-peugeot-208|p. 13}}). La notice Toyota Yaris demande d'arrêter immédiatement le véhicule dans un endroit sûr ({{cite:notice-toyota-yaris|p. 292}}). Pour Renault et Dacia, le voyant allumé sur route avec le témoin STOP et un signal sonore indique une surcharge ou une décharge du circuit électrique : arrêtez-vous ({{cite:notice-renault-clio-5|p. 137}}, {{cite:notice-dacia-sandero-3|p. 112}}).

La notice Seat Ibiza est la seule à laisser rouler : elle demande de se rendre immédiatement dans l'atelier spécialisé le plus proche, en éteignant tous les équipements électriques qui ne sont pas indispensables. L'encadré retient la consigne la plus prudente, l'arrêt ; si la notice de votre voiture permet de rejoindre l'atelier, éteignez ces équipements.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

## Voyant batterie rouge avant le démarrage : est-ce normal ?

Oui. Selon la notice Peugeot 208, certains témoins rouges ou orange s'allument quelques secondes à la mise du contact et doivent s'éteindre dès le démarrage du moteur ({{cite:notice-peugeot-208|p. 12}}). La notice Seat Ibiza dit la même chose du témoin de batterie : il s'allume après la mise du contact et doit s'éteindre après le démarrage du moteur. Selon la notice Renault Clio 5 phase 2, il s'éteint quelques secondes après la mise sous contact ou le démarrage ({{cite:notice-renault-clio-5|p. 137}}).

C'est donc le voyant qui reste allumé une fois le moteur démarré, ou qui s'allume en roulant, qui signale une panne : {{verdict:batterie-rouge}}.

## Voyant batterie ou voyant d'alternateur : que signale-t-il ?

Les notices lues le décrivent comme un témoin du circuit de charge : circuit de charge défaillant (Peugeot 208), dysfonctionnement de l'alternateur (Seat Ibiza, qui le nomme ainsi), dysfonctionnement du système de charge (Toyota Yaris), surcharge ou décharge du circuit électrique (Renault et Dacia).

Les notices Renault et Dacia ont aussi un message d'alerte, « Panne électrique DANGER » chez Renault, « Panne électrique » chez Dacia, qui indique un problème dans le circuit de charge de la batterie (alternateur…). Il s'affiche avec le témoin STOP, qui impose un arrêt impératif et immédiat : arrêtez le moteur et ne le redémarrez pas ({{cite:notice-renault-clio-5|p. 125}}, {{cite:notice-dacia-sandero-3|p. 102}}).

Selon la notice Toyota Yaris, une charge insuffisante de la batterie, ou une chute provisoire de sa tension, peut aussi allumer le voyant de [direction assistée](/voyants/direction/) ({{cite:notice-toyota-yaris|p. 297}}). Pour la direction assistée, les notices Renault Clio 5 phase 2 et Dacia Sandero 3 demandent de ne jamais rouler avec une batterie faiblement chargée ({{cite:notice-renault-clio-5|p. 143}}, {{cite:notice-dacia-sandero-3|p. 115}}).

## Voyant batterie allumé avec une batterie neuve ou un alternateur en bon état

La notice Peugeot 208 donne deux exemples de causes : des cosses sales, une courroie d'alternateur détendue ou sectionnée. Elle demande de nettoyer et de resserrer les cosses ; si le témoin ne s'éteint pas au démarrage du moteur, de faire appel au réseau Peugeot ou à un atelier qualifié ({{cite:notice-peugeot-208|p. 13}}). Après un changement de batterie, la consigne de cette notice revient à vérifier les cosses, contact coupé.

Si les cosses sont propres et serrées, les autres causes citées sont la courroie d'alternateur (Peugeot 208) et l'alternateur lui-même (Seat Ibiza). Même avec un alternateur jugé en bon état, seul un diagnostic du circuit de charge par un professionnel dit d'où vient le défaut.

## Voyant batterie qui clignote ou s'allume par intermittence

Aucune des notices lues ne décrit de clignotement propre à ce voyant. La notice Toyota Yaris applique ses consignes à tout voyant qui « s'allume ou clignote » : pour le voyant du système de charge, arrêter immédiatement le véhicule dans un endroit sûr. Elle précise qu'un voyant qui s'allume ou clignote, puis s'éteint aussitôt, ne signale pas forcément un dysfonctionnement ; si cela se reproduit, elle demande de faire vérifier la voiture ({{cite:notice-toyota-yaris|p. 292}}).

Pour une autre voiture, un voyant de charge qui clignote ou se rallume moteur tournant relève de la consigne de l'encadré : {{verdict:batterie-rouge}}. S'il s'est allumé puis éteint aussitôt, demandez l'avis d'un professionnel.

## Voyants STOP et batterie allumés ensemble

Pour Renault et Dacia, c'est le cas décrit plus haut : le voyant de batterie allumé sur route avec le témoin STOP et un signal sonore signale une surcharge ou une décharge du circuit électrique, et le témoin STOP impose un arrêt impératif et immédiat ; il faut arrêter le moteur, ne pas le redémarrer et faire appel à un représentant de la marque ({{cite:notice-renault-clio-5|p. 136-137}}, {{cite:notice-dacia-sandero-3|p. 110-112}}). La notice lue est celle de la Clio 5 phase 2 : pour une Clio 3 ou une autre génération, c'est sa propre notice qui fait foi.

## La voiture ne démarre pas, alors que la batterie est bonne

Ce voyant signale un défaut de charge moteur tournant : une voiture qui ne démarre pas avec une batterie en bon état relève d'un autre diagnostic.
