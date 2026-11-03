---
# Exemple rédigé du modèle de page voyant (étape 6, livrable 6.6a). Jamais publié avant son lot : il est hors de
# src/content et n'est construit que par la construction de recette (AVEC_EXEMPLES=1, dist-exemples). Il deviendra la
# page « voyant moteur » de la vague A (étape 8). Les lignes de l'encadré viennent de la base voyants validée.
id: voyant-moteur
title: "Voyant moteur orange allumé : peut-on rouler ? Que faire"
h1: "Voyant moteur orange, fixe ou clignotant : que faire ?"
description: "Voyant moteur orange, fixe ou clignotant, ou rouge : la consigne la plus prudente des cinq notices lues est de s'arrêter dès que possible sans danger. Consigne de chaque marque, causes et coût probable."
libelle_court: Voyant moteur
question_decision: Puis-je continuer à rouler avec le voyant moteur allumé ?
situations:
  - voyant: moteur-orange-fixe
  - voyant: moteur-orange-clignotant
  - voyant: moteur-rouge
voyants:
  - moteur-orange-fixe
  - moteur-orange-clignotant
  - moteur-rouge
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Le risque si l'on continue vient des notices Peugeot 208 et Seat Ibiza : le catalyseur peut être endommagé quand le voyant clignote."
  sources:
    - notice-peugeot-208
    - notice-seat-ibiza
  si_vous_continuez:
    tranche: organe
    citations:
      - voyant: moteur-orange-clignotant
        source: notice-peugeot-208
        emplacement: "p. 15, « Système d'autodiagnostic moteur » ; renvoi (2) p. 13"
      - voyant: moteur-orange-clignotant
        source: notice-seat-ibiza
        emplacement: "p. 288, « Gestion du moteur et système d'épuration des gaz d'échappement », Témoins"
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-03
date_modification: 2026-11-03
date_revue: 2026-11-03
prochaine_revue: 2027-11-03
causes:
  - cause: Défaut du système antipollution
    explication: "Pour le voyant orange fixe, les notices Peugeot 208, Seat Ibiza, Renault Clio 5 phase 2 et Dacia Sandero 3 désignent le système qui contrôle les gaz d'échappement. Elles ne nomment pas de pièce : elles demandent de faire contrôler le moteur."
    pieces:
      - capteur-ou-sonde
  - cause: Défaut d'une commande électronique (moteur, papillon, boîte)
    explication: "Selon la notice Toyota Yaris, le même voyant signale un dysfonctionnement du système électronique de commande du moteur, de celui du papillon, ou de celui de la boîte Multidrive si la voiture en est équipée."
    pieces:
      - calculateur
      - capteur-ou-sonde
      - faisceau-et-connecteurs
  - cause: Défaut de combustion qui menace le catalyseur (voyant qui clignote)
    explication: "Quand le voyant clignote, la notice Seat Ibiza signale un dysfonctionnement de combustion susceptible d'endommager le catalyseur, et la notice Peugeot 208 un risque de destruction du catalyseur. Le coût probable de cette cause est celui du catalyseur, la pièce menacée."
    pieces:
      - catalyseur
  - cause: Défaillance grave du moteur (voyant rouge ou STOP)
    explication: "La notice Peugeot 208 l'annonce par le voyant rouge (« défaillance majeure du moteur ») ; les notices Renault Clio 5 phase 2 et Dacia Sandero 3, par le témoin STOP et le message « Risque casse moteur » : défaillance de l'injection, surchauffe du moteur ou problème grave au niveau du moteur."
    pieces:
      - injecteurs
      - moteur
---

## Peut-on rouler avec le voyant moteur orange allumé ?

Une idée répandue veut qu'on puisse continuer à rouler avec le voyant moteur orange fixe. Quatre des cinq notices lues permettent en effet de rouler jusqu'au garage, à consulter rapidement ou au plus tôt selon la marque. La notice Toyota Yaris demande, elle, d'arrêter immédiatement le véhicule dans un endroit sûr. Le verdict en haut de page retient cette consigne, la plus prudente.

Si la notice de votre voiture permet de rouler jusqu'au garage, faites-le sans attendre, en roulant prudemment. Le tableau plus bas cite la consigne de chaque notice lue, avec son édition et sa page.

## Voyant moteur qui clignote

Pour les notices Peugeot 208 et Seat Ibiza, le clignotement est plus grave que le voyant fixe : la première annonce un risque de destruction du catalyseur, la seconde un dysfonctionnement de combustion susceptible de l'endommager. C'est le risque si vous continuez de rouler, affiché avec le coût probable en haut de page.

## Combien de kilomètres peut-on faire ?

Les passages des cinq notices lues sur ce voyant ne donnent aucune distance. Ils donnent un délai à la place : immédiatement, au plus tôt, rapidement, ou jusqu'à l'atelier le plus proche, selon la marque et selon que le voyant est fixe ou clignote.

## Comment éteindre le voyant moteur ?

Les notices lues ne donnent aucune manipulation pour éteindre ce voyant : elles demandent de faire contrôler le moteur. La notice Peugeot 208 précise que le témoin doit s'éteindre au démarrage du moteur ; s'il reste allumé, le système d'antipollution est défaillant.

Quand le voyant clignote, les notices Renault Clio 5 phase 2 et Dacia Sandero 3 demandent de réduire le régime moteur jusqu'à ce que le clignotement cesse, puis de consulter au plus tôt un représentant de la marque : le clignotement qui cesse ne dispense pas du contrôle.

## La voiture roule normalement, mais le voyant est allumé

Les notices lues ne font pas d'exception quand la voiture semble rouler normalement : la consigne reste celle du voyant, fixe ou clignotant.
