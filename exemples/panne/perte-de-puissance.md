---
# BROUILLON, jamais validé. Étape 10, lot B4 (rédaction ouverte par la validation de la porte 10 le 16/11/2026,
# 19 h 26). Page de la vague B, sans empreinte tant que Houssem n'a pas validé son encadré (paquet du lot B4).
# - Extraits relus mot pour mot le 16/11/2026 : travaux/etape-10/textes/autres-pannes-verification.md (Dacia p. 162,
#   Renault p. 188, Seat p. 283, 288 et 289, Toyota p. 291 et 322-323). Lignes du voyant moteur reprises de la base.
# - Aucune notice lue ne décrit de « mode dégradé » sous ce nom : la page n'en parle pas comme d'un mode du constructeur.
# - Illustration dessinée pour le site : puissance-voyants (travaux/etape-10/generer-illustrations-b4.py).
id: perte-de-puissance
title: "Perte de puissance voiture : que faire, et peut-on rouler ?"
h1: "Ma voiture perd de la puissance : que vérifier, et quand s'arrêter ?"
description: "Perte de puissance d'une voiture essence ou diesel, avec ou sans voyant, à-coups : quand s'arrêter, quand aller au garage, et les causes citées par les notices des constructeurs."
libelle_court: Perte de puissance
question_decision: "Ma voiture perd de la puissance : puis-je continuer à rouler ?"
situations:
  - voyant: moteur-orange-clignotant
  - voyant: moteur-orange-fixe
  - situation: "Le témoin EPC (gestion du moteur essence) s'allume, sur une voiture dont la notice le décrit (Seat Ibiza)"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites contrôler le moteur sans attendre par un atelier. Si le voyant moteur s'allume aussi, c'est sa consigne, plus prudente, qui s'applique."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 288, « Gestion du moteur et système d'épuration des gaz d'échappement », témoin EPC"
        extrait: "Témoin allumé — Dysfonctionnement de la gestion du moteur essence. Faites immédiatement contrôler le moteur par un atelier spécialisé."
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "La voiture perd de la puissance, avec ou sans à-coups, sans voyant allumé"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites contrôler la voiture au plus vite par un garage. Si un voyant s'allume, c'est sa consigne qui s'applique."
    ecart_marques: "Les notices Toyota Yaris, Renault Clio 5 et Dacia Sandero 3 demandent de faire contrôler ou réparer au plus vite ; la notice Seat Ibiza, de contacter un atelier, sans délai écrit."
    ecart_court: "Plus stricts : Toyota, Renault et Dacia (au plus vite). Moins strict : Seat (atelier, sans délai écrit)."
    citations:
      - source: notice-toyota-yaris
        emplacement: "p. 291, 7.2.2 « Si vous pensez qu'il y a un problème », symptômes de fonctionnement : « Perte de puissance importante »"
        extrait: "Si vous remarquez l'un des symptômes suivants, votre véhicule a probablement besoin d'un réglage ou d'une réparation. Contactez dès que possible un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 162, « Particularités des versions essence »"
        extrait: "Ou des anomalies de fonctionnement telles que : – système d'allumage défectueux […] se traduisant par des ratés d'allumage et des à-coups au cours de la conduite ; – perte de puissance, provoquent un échauffement excessif du pot catalytique […]. Si vous constatez les anomalies de fonctionnement ci-dessus, faites effectuer par un Représentant de la marque les réparations nécessaires au plus vite."
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
  - situation: "Légère perte de puissance après un plein d'essence d'un indice d'octane plus bas que celui conseillé"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Roulez à régime moyen, en sollicitant peu le moteur, et rajoutez dès que possible le carburant conseillé par votre notice."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 283, « Essence »"
        extrait: "Vous ne devez alors faire tourner le moteur qu'à régime moyen et ne le solliciter que faiblement. Rajoutez dès que possible du supercarburant."
        verdict: oui avec précautions
        urgence: immédiate
voyants:
  - moteur-orange-clignotant
  - moteur-orange-fixe
element_unique: arbre-de-decision
format: 2
illustration:
  fichier: puissance-voyants
  alt: "Trois témoins à regarder au tableau de bord quand la voiture perd de la puissance : le voyant moteur, fixe ou clignotant, et le témoin EPC"
  legende: "Quand la voiture perd de la puissance, regardez d'abord le tableau de bord : voyant moteur fixe ou clignotant, ou témoin EPC sur les voitures dont la notice le décrit. Leur consigne passe en premier."
symptome: "La voiture accélère moins bien, peine en côte ou ne dépasse plus une certaine vitesse, avec ou sans voyant."
carburant: essence et diesel
contexte:
  - en roulant
  - à l'accélération
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leurs rubriques sur la gestion du moteur, le carburant et la surchauffe."
  sources:
    - notice-dacia-sandero-3
    - notice-seat-ibiza
    - notice-toyota-yaris
sources:
  - notice-toyota-yaris
  - notice-dacia-sandero-3
  - notice-renault-clio-5
  - notice-seat-ibiza
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
causes:
  - cause: Allumage défectueux ou bougie débranchée (essence)
    explication: "Selon les notices Dacia Sandero 3 et Renault Clio 5, un système d'allumage défectueux ou une bougie débranchée se traduit par des ratés d'allumage et des à-coups ; ces anomalies, comme une perte de puissance, échauffent le pot catalytique et peuvent le détruire."
    pieces:
      - bougies-d-allumage
      - catalyseur
  - cause: Défaut de la gestion du moteur
    explication: "Selon la notice Seat Ibiza, tant que les voyants de la gestion du moteur restent allumés, le moteur peut perdre de la puissance et consommer davantage. Elle ne nomme pas la pièce en cause : le diagnostic au garage le dit."
    pieces:
      - capteur-ou-sonde
      - calculateur
  - cause: Panne d'essence ou réservoir presque vide
    explication: "La notice Dacia Sandero 3 cite la panne d'essence parmi les causes des ratés et des à-coups ; la notice Seat Ibiza demande de ne pas vider complètement le réservoir, l'alimentation irrégulière pouvant provoquer des ratés."
    pieces:
      - carburant-et-reamorcage
  - cause: Carburant d'indice d'octane trop bas (essence)
    explication: "Selon la notice Seat Ibiza, une essence d'indice d'octane plus bas que celui conseillé peut causer une légère perte de puissance."
    pieces:
      - fonctionnement-normal
  - cause: Moteur qui surchauffe
    explication: "Selon la notice Toyota Yaris, une perte de puissance du moteur peut accompagner la surchauffe, avec l'aiguille de température dans la zone rouge."
    pieces:
      - appoint-liquide-de-refroidissement
      - motoventilateur
---

## Perte de puissance : regarder d'abord les voyants

Quand la voiture perd de la puissance, regardez d'abord le tableau de bord : un voyant allumé décide de ce qu'il faut faire. Sans voyant, les notices lues demandent de faire contrôler la voiture rapidement, sur une essence comme sur un diesel. Suivez les questions ci-dessous.

## Le bon geste selon ce que vous voyez

{{arbre}}

1. Le voyant moteur est-il allumé ?
   - Oui, il clignote : levez le pied. {{verdict:moteur-orange-clignotant}}
   - Oui, il est fixe. {{verdict:moteur-orange-fixe}}
   - Non : passez à la question 2.
2. Sur une voiture à essence dont la notice le décrit, le témoin EPC est-il allumé ?
   - Oui : faites contrôler le moteur sans attendre. {{verdict:ligne-3}}
   - Non, ou voiture sans ce témoin : passez à la question 3.
3. Venez-vous de faire le plein avec une essence d'indice d'octane plus bas que celui conseillé ?
   - Oui : roulez à régime moyen, et rajoutez le carburant conseillé dès que possible. {{verdict:ligne-5}}
   - Non : faites contrôler la voiture au plus vite. {{verdict:ligne-4}}

## Voyant moteur allumé avec la perte de puissance

{{repere:moteur-orange-fixe}}

Fixe ou clignotant, le voyant moteur décide : sa consigne, dans l'encadré, est celle de la notice la plus prudente, et le tableau des notices, en bas de page, donne celle de chaque marque. Un voyant qui clignote signale des ratés de combustion, qui peuvent abîmer le catalyseur. Sur un diesel, un voyant de préchauffage qui clignote signale aussi un défaut de la gestion du moteur, selon la notice {{notice:notice-seat-ibiza}} ({{cite:notice-seat-ibiza|p. 289}}).

## Le témoin EPC (essence)

{{repere:ligne-3}}

Sur la Seat Ibiza, le témoin EPC (Electronic Power Control) signale un dysfonctionnement de la gestion du moteur essence : la notice demande de faire immédiatement contrôler le moteur par un atelier spécialisé ({{cite:notice-seat-ibiza|p. 288}}). Il s'allume à la mise du contact et doit s'éteindre une fois le moteur démarré. C'est la seule des notices lues qui décrit ce témoin : sur une autre voiture, fiez-vous à sa notice.

## Perte de puissance sans voyant

{{repere:ligne-4}}

La notice {{notice:notice-toyota-yaris}} range une perte de puissance importante, des à-coups ou un fonctionnement irrégulier du moteur parmi les signes d'un réglage ou d'une réparation à faire, et demande de contacter un réparateur dès que possible ({{cite:notice-toyota-yaris|p. 291}}). Sur les moteurs essence, les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} demandent de faire réparer au plus vite une perte de puissance, des ratés ou des à-coups, qui échauffent le pot catalytique et peuvent le détruire ({{cite:notice-renault-clio-5|p. 188}} ; {{cite:notice-dacia-sandero-3|p. 162}}). La notice Seat Ibiza demande de contacter un atelier spécialisé pour faire réviser la voiture ({{cite:notice-seat-ibiza|p. 289}}).

Si la voiture broute ou donne des à-coups, voyez aussi la page [voiture qui broute](/voiture-qui-broute/). Une perte de puissance peut aussi accompagner une surchauffe, avec l'aiguille de température dans la zone rouge, selon la notice Toyota Yaris ({{cite:notice-toyota-yaris|p. 322-323}}).

## Essence d'indice d'octane trop bas

{{repere:ligne-5}}

Selon la notice Seat Ibiza, une essence d'un indice d'octane plus bas que celui conseillé peut causer une légère perte de puissance. À défaut de l'essence conseillée, elle demande de ne faire tourner le moteur qu'à régime moyen, de le solliciter faiblement, et de rajouter dès que possible le carburant conseillé ({{cite:notice-seat-ibiza|p. 283}}). Le carburant à utiliser est écrit dans la notice de votre voiture.

## Diesel qui perd de la puissance

Les notices lues ne décrivent pas de cause propre au diesel en dehors des voyants : la consigne reste celle de la ligne sans voyant, faire contrôler la voiture au plus vite. Un code défaut lu au garage peut en préciser la cause. Aucune des notices lues ne décrit de « mode dégradé » sous ce nom.
