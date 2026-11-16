---
# BROUILLON, jamais validé. Étape 10, lot B4 (rédaction ouverte par la validation de la porte 10 le 16/11/2026,
# 19 h 26). Page de la vague B, sans empreinte tant que Houssem n'a pas validé son encadré (paquet du lot B4).
# - Extraits relus mot pour mot le 16/11/2026 : travaux/etape-10/textes/autres-pannes-verification.md (Dacia p. 162,
#   Renault p. 188, Seat p. 289, Toyota p. 291). Lignes du voyant moteur reprises de la base. Ligne 3 identique à la
#   ligne 4 de « perte de puissance » (même verdict, mêmes sources), situation élargie aux à-coups.
# - Illustration dessinée pour le site : broute-voyant-moteur (travaux/etape-10/generer-illustrations-b4.py).
id: voiture-qui-broute
title: "Voiture qui broute : causes, et peut-on encore rouler ?"
h1: "Ma voiture broute ou donne des à-coups : que faire ?"
description: "Voiture qui broute, à-coups, ratés à l'accélération ou à bas régime : ce que veut dire le voyant moteur qui clignote, quand s'arrêter, et les causes citées par les notices."
libelle_court: Voiture qui broute
question_decision: "Ma voiture broute : puis-je continuer à rouler ?"
situations:
  - voyant: moteur-orange-clignotant
  - voyant: moteur-orange-fixe
  - situation: "La voiture broute, donne des à-coups ou perd de la puissance, sans voyant allumé"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites contrôler la voiture au plus vite par un garage. Si un voyant s'allume, c'est sa consigne qui s'applique."
    ecart_marques: "Les notices Toyota Yaris, Renault Clio 5 et Dacia Sandero 3 demandent de faire contrôler ou réparer au plus vite ; la notice Seat Ibiza, de contacter un atelier, sans délai écrit."
    ecart_court: "Plus stricts : Toyota, Renault et Dacia (au plus vite). Moins strict : Seat (atelier, sans délai écrit)."
    citations:
      - source: notice-toyota-yaris
        emplacement: "p. 291, 7.2.2 « Si vous pensez qu'il y a un problème », symptômes de fonctionnement : « Ratés d'allumage, à-coups ou fonctionnement irrégulier du moteur »"
        extrait: "Si vous remarquez l'un des symptômes suivants, votre véhicule a probablement besoin d'un réglage ou d'une réparation. Contactez dès que possible un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 162, « Particularités des versions essence »"
        extrait: "Ou des anomalies de fonctionnement telles que : – système d'allumage défectueux ou panne d'essence ou bougie débranchée se traduisant par des ratés d'allumage et des à-coups au cours de la conduite ; – perte de puissance, provoquent un échauffement excessif du pot catalytique, en diminuent l'efficacité, peuvent amener sa destruction et entraîner des dommages thermiques sur le véhicule. Si vous constatez les anomalies de fonctionnement ci-dessus, faites effectuer par un Représentant de la marque les réparations nécessaires au plus vite."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 188, « Particularités des versions essence »"
        extrait: "Si vous constatez les anomalies de fonctionnement ci-dessus, faites effectuer par un Représentant de la marque les réparations nécessaires au plus vite."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 289, « Catalyseur »"
        extrait: "Si vous constatez une panne de combustion, une baisse de puissance ou un fonctionnement irrégulier du moteur, contactez un atelier spécialisé pour faire réviser le véhicule."
        verdict: oui avec précautions
        urgence: sous quelques jours
voyants:
  - moteur-orange-clignotant
  - moteur-orange-fixe
element_unique: arbre-de-decision
format: 2
illustration:
  fichier: broute-voyant-moteur
  alt: "Le voyant moteur orange, fixe ou clignotant : quand la voiture broute, c'est le premier témoin à regarder"
  legende: "Quand la voiture broute, regardez le voyant moteur : clignotant, il signale des ratés de combustion qui peuvent abîmer le catalyseur ; fixe, une anomalie du moteur. Sa consigne passe en premier."
symptome: "La voiture avance par saccades, hoquette ou donne des à-coups, à l'accélération, à bas régime ou en roulant."
carburant: essence et diesel
contexte:
  - à l'accélération
  - à bas régime
  - en roulant
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leurs rubriques sur la gestion du moteur, l'allumage et le carburant."
  sources:
    - notice-dacia-sandero-3
    - notice-seat-ibiza
sources:
  - notice-toyota-yaris
  - notice-dacia-sandero-3
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-peugeot-208
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
causes:
  - cause: Allumage défectueux ou bougie débranchée (essence)
    explication: "Selon les notices Dacia Sandero 3 et Renault Clio 5, un système d'allumage défectueux ou une bougie débranchée se traduit par des ratés d'allumage et des à-coups ; ces ratés échauffent le pot catalytique et peuvent le détruire."
    pieces:
      - bougies-d-allumage
      - catalyseur
  - cause: Réservoir presque vide ou panne d'essence
    explication: "La notice Seat Ibiza demande de ne pas vider complètement le réservoir : l'alimentation devient irrégulière et peut provoquer des ratés. La notice Dacia Sandero 3 cite aussi la panne d'essence."
    pieces:
      - carburant-et-reamorcage
  - cause: Défaut de la gestion du moteur
    explication: "Selon la notice Seat Ibiza, tant que les voyants de la gestion du moteur restent allumés, le moteur peut présenter un dysfonctionnement et perdre de la puissance. Elle ne nomme pas la pièce en cause : le diagnostic au garage le dit."
    pieces:
      - capteur-ou-sonde
      - calculateur
---

## Voiture qui broute : le voyant moteur d'abord

Une voiture qui broute avance par saccades : le moteur a des ratés. Regardez d'abord le voyant moteur, qui décide de ce qu'il faut faire ; sans voyant, les notices lues demandent de faire contrôler la voiture au plus vite. Suivez les questions ci-dessous.

## Le bon geste selon ce que vous voyez

{{arbre}}

1. Le voyant moteur clignote-t-il ?
   - Oui : levez le pied. {{verdict:moteur-orange-clignotant}}
   - Non : passez à la question 2.
2. Le voyant moteur est-il allumé fixe ?
   - Oui. {{verdict:moteur-orange-fixe}}
   - Non : passez à la question 3.
3. Le réservoir est-il presque vide ?
   - Oui : faites le plein, car un réservoir presque vide peut provoquer des ratés ; si les à-coups continuent, faites contrôler la voiture. {{verdict:ligne-3}}
   - Non : faites contrôler la voiture au plus vite. {{verdict:ligne-3}}

## Voyant moteur qui clignote : des ratés de combustion

{{repere:moteur-orange-clignotant}}

Un voyant moteur qui clignote signale des ratés de combustion, qui peuvent abîmer le catalyseur : sa consigne, dans l'encadré, est celle de la notice la plus prudente. Selon la notice {{notice:notice-seat-ibiza}}, lors des ratés d'allumage, du carburant non brûlé arrive dans l'échappement et peut surchauffer et endommager le catalyseur ({{cite:notice-seat-ibiza|p. 289}}). Le tableau des notices, en bas de page, donne la consigne de chaque marque.

## Voiture qui broute sans voyant

{{repere:ligne-3}}

La notice {{notice:notice-toyota-yaris}} range les ratés d'allumage, les à-coups et le fonctionnement irrégulier du moteur parmi les signes d'un réglage ou d'une réparation à faire : elle demande de contacter un réparateur dès que possible ({{cite:notice-toyota-yaris|p. 291}}). Sur les moteurs essence, les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} demandent de faire réparer au plus vite des ratés ou des à-coups, qui échauffent le pot catalytique et peuvent le détruire ({{cite:notice-renault-clio-5|p. 188}} ; {{cite:notice-dacia-sandero-3|p. 162}}). La notice Seat Ibiza demande de contacter un atelier spécialisé ({{cite:notice-seat-ibiza|p. 289}}).

Selon les notices Dacia Sandero 3 et Renault Clio 5, ces ratés et à-coups peuvent venir d'un système d'allumage défectueux, d'une bougie débranchée ou d'une panne d'essence. Si la voiture perd aussi de la puissance, voyez la page [perte de puissance](/perte-de-puissance-voiture/).

## Ne pas rouler sur la réserve

La notice Seat Ibiza demande de ne pas vider complètement le réservoir : l'alimentation devient irrégulière et peut provoquer des ratés ({{cite:notice-seat-ibiza|p. 289}}). La notice {{notice:notice-peugeot-208}} demande de ne jamais rouler jusqu'à la panne sèche, qui pourrait endommager les systèmes d'antipollution et d'injection ({{cite:notice-peugeot-208|p. 15}}).

## Diesel qui broute

Les notices lues ne décrivent pas de cause propre au diesel quand la voiture broute sans voyant : la consigne reste de faire contrôler la voiture au plus vite. Un code défaut lu au garage peut en préciser la cause.
