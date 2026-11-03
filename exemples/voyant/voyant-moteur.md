---
# Exemple rédigé du modèle de page voyant (étape 6, livrable 6.6a). Jamais publié avant son lot : il est hors de
# src/content et n'est construit que par la construction de recette (AVEC_EXEMPLES=1, dist-exemples). Il deviendra la
# page « voyant moteur » de la vague A (étape 8). Les lignes de l'encadré viennent de la base voyants validée.
id: voyant-moteur
title: "Voyant moteur orange allumé : peut-on rouler ? Que faire ?"
h1: "Voyant moteur orange, fixe ou clignotant : que faire ?"
description: "Voyant moteur orange, fixe ou clignotant, ou rouge : la consigne la plus prudente des notices lues est de s'arrêter dès que possible sans danger. Consigne de chaque marque et coût probable."
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
    explication: "Pour le voyant orange fixe, les notices Peugeot 208, Seat Ibiza, Renault Clio 5 phase 2 et Dacia Sandero 3 désignent le système qui contrôle les gaz d'échappement ; la notice Peugeot 208 cite aussi une défaillance mineure du moteur. Elles ne nomment pas de pièce : elles demandent de consulter un réparateur ou le réseau de la marque."
    pieces:
      - capteur-ou-sonde
  - cause: Défaut d'une commande électronique (moteur, papillon, boîte)
    explication: "Selon la notice Toyota Yaris, le même voyant signale un dysfonctionnement du système électronique de commande du moteur, de celui du papillon, ou de celui de la boîte Multidrive si la voiture en est équipée."
    pieces:
      - calculateur
      - capteur-ou-sonde
      - faisceau-et-connecteurs
  - cause: Défaut de combustion qui menace le catalyseur (voyant qui clignote)
    explication: "Quand le voyant clignote, la notice Seat Ibiza signale un dysfonctionnement de combustion susceptible d'endommager le catalyseur, et la notice Peugeot 208 un risque de destruction du catalyseur. Elles ne nomment pas la pièce en défaut : la tranche de coût de cette cause est celle du catalyseur, que le défaut peut endommager."
    pieces:
      - catalyseur
  - cause: Défaillance grave du moteur (voyant rouge ou STOP)
    explication: "La notice Peugeot 208 l'annonce par le voyant rouge (« défaillance majeure du moteur ») ; les notices Renault Clio 5 phase 2 et Dacia Sandero 3, par le message « Risque casse moteur » : défaillance de l'injection, surchauffe du moteur ou problème grave au niveau du moteur."
    pieces:
      - injecteurs
      - moteur
---

## Peut-on rouler avec le voyant moteur orange allumé ?

Le verdict en haut de page retient la consigne la plus prudente des notices lues : celle de la Toyota Yaris, qui demande d'arrêter immédiatement le véhicule dans un endroit sûr. Une idée répandue veut pourtant qu'on puisse continuer à rouler avec le voyant orange fixe : les autres notices lues le permettent, pour aller au garage au plus tôt ou rapidement selon la marque (détail dans l'encadré et dans le tableau plus bas).

Arrêtez-vous donc dès que vous pouvez le faire sans danger, puis regardez la notice de votre voiture : ne repartez que si elle permet de rouler jusqu'au garage, et faites alors contrôler le moteur sans attendre.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

Le nom du voyant change d'une notice à l'autre : le tableau plus bas donne, avec chaque consigne, la section de la notice où la trouver.

## Le voyant s'allume au démarrage, puis s'éteint

Selon les notices Renault Clio 5 phase 2 (p. 139) et Dacia Sandero 3 (p. 113), le témoin de contrôle du système antipollution s'allume au démarrage du moteur, puis s'éteint. La notice Peugeot 208 précise que le témoin doit s'éteindre au démarrage du moteur (p. 15). La consigne de l'encadré vaut quand il reste allumé, ou quand il s'allume en roulant.

## Voyant moteur qui clignote

Pour les notices Peugeot 208 et Seat Ibiza, le clignotement annonce une conséquence plus grave que le voyant fixe : un risque de destruction du catalyseur (Peugeot 208, p. 15), un dysfonctionnement de combustion susceptible de l'endommager (Seat Ibiza, p. 288).

Les notices Renault Clio 5 phase 2 et Dacia Sandero 3 demandent de réduire le régime moteur jusqu'à ce que le clignotement cesse, puis de consulter au plus tôt un représentant de la marque (p. 139 et p. 113) : le clignotement qui cesse ne dispense pas de cette visite.

## Voyant moteur rouge ou message « Risque casse moteur »

C'est une alerte d'arrêt dans les notices lues. La notice Peugeot 208 l'annonce par le voyant d'autodiagnostic moteur rouge : une défaillance majeure du moteur est détectée, et l'arrêt du véhicule est impératif (p. 13). Sur les Renault Clio 5 phase 2 et Dacia Sandero 3, le message « Risque casse moteur » indique une défaillance de l'injection, une surchauffe du moteur ou un problème grave au niveau du moteur ; ces notices demandent un arrêt immédiat, moteur coupé et sans le redémarrer (p. 125 et p. 102).

Pour un autre modèle de ces marques, une Clio 4 ou une Mégane par exemple, c'est la notice de votre voiture qui fait foi.

## « Antipollution à contrôler » ou système d'antipollution défaillant

Sur la Renault Clio 5 phase 2, le message « Antipollution à contrôler » indique une défaillance du système de dépollution. Il fait partie des messages qui demandent de s'arrêter au plus tôt chez un représentant de la marque, en conduisant avec ménagement (p. 124). La notice Peugeot 208 dit, pour le voyant moteur orange fixe, que le système d'antipollution est défaillant (p. 15).

## Combien de kilomètres peut-on faire ?

Pour le voyant moteur, les notices lues ne donnent aucune distance. Elles donnent une consigne à la place : s'arrêter, ou consulter au plus tôt ou rapidement, selon la marque et selon que le voyant est fixe ou clignote.

Les seules distances trouvées concernent les moteurs diesel équipés d'AdBlue, et ce qui reste à parcourir avant que le moteur ne puisse plus démarrer :

- notice Peugeot 208 : quand le témoin AdBlue clignote avec le témoin d'autodiagnostic moteur fixe, il est possible, selon le message affiché, de parcourir jusqu'à 1 100 km avant le blocage du démarrage. La notice demande d'aller au plus tôt dans le réseau de la marque ou dans un atelier qualifié pour l'éviter (p. 16) ;
- notices Renault Clio 5 phase 2 et Dacia Sandero 3 : le message « XXX KM blocage antipollution » indique une défaillance du système et qu'il reste moins de 800 km avant que le redémarrage soit impossible. Elles demandent de consulter un représentant de la marque le plus tôt possible (p. 167 et p. 139).

## Comment éteindre le voyant moteur ?

Aucune des notices lues ne donne de manipulation pour éteindre ce voyant : elles demandent de consulter un réparateur ou le réseau de la marque.

Un seul cas où il s'éteint de lui-même est décrit, par la notice Toyota Yaris : sur certains modèles, le voyant s'allume si le réservoir de carburant devient complètement vide. Il faut alors faire le plein, et le voyant s'éteint après plusieurs trajets ; s'il ne s'éteint pas, la notice demande de contacter un réparateur dès que possible (p. 297).

## La voiture roule normalement, mais le voyant est allumé

Les notices lues ne font pas d'exception quand la voiture semble rouler normalement, hormis le cas du réservoir vidé décrit plus haut : la consigne reste celle du voyant, fixe ou clignotant.
