---
# Page de la vague B, étape 10, lot B4 (rédaction ouverte par la validation de la porte 10 le 16/11/2026, 19 h 26).
# Validée par Houssem le 17/11/2026 à 7 h 39 (« Je valide tout ! Fais le necessaire », sur la ligne de validation de
# travaux/etape-10/paquet-lot-b4-fin.md) ; empreinte posée et passage de exemples/ à src/content par la pull request
# du lot B4 (règle de passage).
# - Extraits relus mot pour mot le 16/11/2026 : travaux/etape-10/textes/autres-pannes-verification.md (Dacia p. 162,
#   Renault p. 188, Seat p. 289, Toyota p. 291 ; Peugeot p. 15). Lignes du voyant moteur reprises de la base.
#   Lignes 3 et 4 au même niveau que les lignes 5 et 6 de « perte de puissance » (mêmes sources), situation élargie
#   aux à-coups.
# - Corrigée après la revue indépendante du 16/11/2026 (non relue depuis) : ligne « sans voyant » coupée en deux (essence,
#   diesel) au niveau « Non, ne poursuivez pas votre trajet » (risque pour le catalyseur annoncé par Renault, Dacia et
#   Seat) ; question du réservoir retirée de l'arbre (sa réponse redit la ligne du moteur essence) ; risque « si vous
#   continuez » déclaré ; définition non sourcée de « brouter » retirée.
# - Illustration dessinée pour le site : broute-voyant-moteur (travaux/etape-10/generer-illustrations-b4.py).
id: voiture-qui-broute
title: "Voiture qui broute : causes, et peut-on encore rouler ?"
h1: "Ma voiture broute ou donne des à-coups : que faire ?"
description: "Voiture qui broute ou donne des à-coups, essence ou diesel : ce que veut dire le voyant moteur qui clignote, quand s'arrêter, et les causes citées par les notices."
libelle_court: Voiture qui broute
question_decision: "Ma voiture broute : puis-je continuer à rouler ?"
situations:
  - voyant: moteur-orange-clignotant
  - voyant: moteur-orange-fixe
  - situation: "Moteur essence : la voiture broute (ratés, à-coups) ou perd de la puissance, sans voyant moteur allumé"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Arrêtez-vous dans un endroit sûr et faites contrôler la voiture par un garage avant de reprendre la route : le catalyseur peut être endommagé."
    ecart_marques: "Les notices Renault Clio 5 et Dacia Sandero 3 (versions essence) annoncent la destruction possible du pot catalytique, la notice Seat Ibiza un catalyseur endommagé par surchauffe ; la notice Toyota Yaris demande de contacter un réparateur dès que possible, sans annoncer de dégât."
    ecart_court: "Plus stricts : Renault, Dacia et Seat (catalyseur menacé). Moins strict : Toyota (réparateur dès que possible)."
    citations:
      - source: notice-toyota-yaris
        emplacement: "p. 291, 7.2.2 « Si vous pensez qu'il y a un problème », symptômes de fonctionnement : « Ratés d'allumage, à-coups ou fonctionnement irrégulier du moteur »"
        extrait: "Si vous remarquez l'un des symptômes suivants, votre véhicule a probablement besoin d'un réglage ou d'une réparation. Contactez dès que possible un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 162, « Particularités des versions essence »"
        extrait: "[…] des ratés d'allumage et des à-coups au cours de la conduite ; – perte de puissance, provoquent un échauffement excessif du pot catalytique, […] peuvent amener sa destruction et entraîner des dommages thermiques sur le véhicule. Si vous constatez les anomalies de fonctionnement ci-dessus, faites effectuer par un Représentant de la marque les réparations nécessaires au plus vite."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 188, « Particularités des versions essence »"
        extrait: "[…] des ratés d'allumage et des à-coups au cours de la conduite ; – perte de puissance, provoquent un échauffement excessif du pot catalytique, […] peuvent amener sa destruction et entraîner des dommages thermiques sur le véhicule. Si vous constatez les anomalies de fonctionnement ci-dessus, faites effectuer par un Représentant de la marque les réparations nécessaires au plus vite."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 289, « Catalyseur »"
        extrait: "Si vous constatez une panne de combustion, une baisse de puissance ou un fonctionnement irrégulier du moteur, contactez un atelier spécialisé pour faire réviser le véhicule. En règle générale, le témoin de gaz d'échappement s'allume lorsque les symptômes décrits se produisent. […] Par ailleurs, le catalyseur risquerait d'être endommagé par surchauffe."
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Moteur diesel : la voiture broute (à-coups) ou perd de la puissance, sans voyant moteur allumé"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Arrêtez-vous dans un endroit sûr et faites contrôler la voiture par un garage avant de reprendre la route : selon la notice Seat Ibiza, le catalyseur risquerait d'être endommagé."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 289, « Catalyseur »"
        extrait: "Si vous constatez une panne de combustion, une baisse de puissance ou un fonctionnement irrégulier du moteur, contactez un atelier spécialisé pour faire réviser le véhicule. En règle générale, le témoin de gaz d'échappement s'allume lorsque les symptômes décrits se produisent. […] Par ailleurs, le catalyseur risquerait d'être endommagé par surchauffe."
        verdict: non, arrêt dès que possible
        urgence: immédiate
voyants:
  - moteur-orange-clignotant
  - moteur-orange-fixe
element_unique: arbre-de-decision
format: 2
illustration:
  fichier: broute-voyant-moteur
  alt: "Le voyant moteur orange, fixe ou clignotant : quand la voiture broute, c'est le premier voyant à regarder"
  legende: "Quand la voiture broute, regardez le voyant moteur : clignotant, il signale des ratés de combustion qui peuvent abîmer le catalyseur ; fixe, une anomalie du moteur. Sa consigne passe en premier."
symptome: "La voiture avance par saccades, hoquette ou donne des à-coups, à l'accélération, à bas régime ou en roulant."
carburant: essence et diesel
contexte:
  - à l'accélération
  - à bas régime
  - en roulant
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leurs rubriques sur la gestion du moteur, l'allumage et le carburant. Le risque si l'on continue vient des notices Renault Clio 5 et Dacia Sandero 3 (versions essence) et Seat Ibiza : le catalyseur peut être endommagé, voire détruit."
  sources:
    - notice-dacia-sandero-3
    - notice-renault-clio-5
    - notice-seat-ibiza
  si_vous_continuez:
    tranche: organe
    citations:
      - source: notice-dacia-sandero-3
        emplacement: "p. 162, « Particularités des versions essence »"
        extrait: "[…] des ratés d'allumage et des à-coups au cours de la conduite ; – perte de puissance, provoquent un échauffement excessif du pot catalytique, […] peuvent amener sa destruction et entraîner des dommages thermiques sur le véhicule. Si vous constatez les anomalies de fonctionnement ci-dessus, faites effectuer par un Représentant de la marque les réparations nécessaires au plus vite."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 188, « Particularités des versions essence »"
        extrait: "[…] des ratés d'allumage et des à-coups au cours de la conduite ; – perte de puissance, provoquent un échauffement excessif du pot catalytique, […] peuvent amener sa destruction et entraîner des dommages thermiques sur le véhicule. Si vous constatez les anomalies de fonctionnement ci-dessus, faites effectuer par un Représentant de la marque les réparations nécessaires au plus vite."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 289, « Catalyseur »"
        extrait: "Si vous constatez une panne de combustion, une baisse de puissance ou un fonctionnement irrégulier du moteur, contactez un atelier spécialisé pour faire réviser le véhicule. En règle générale, le témoin de gaz d'échappement s'allume lorsque les symptômes décrits se produisent. […] Par ailleurs, le catalyseur risquerait d'être endommagé par surchauffe."
        verdict: non, arrêt dès que possible
        urgence: immédiate
sources:
  - notice-toyota-yaris
  - notice-dacia-sandero-3
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-peugeot-208
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-21
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
validation: 560ee701c801b855638499e7e225b8023458044c1de78f6a719b2302673904d4
causes:
  - cause: Allumage défectueux ou bougie débranchée (essence)
    explication: "Selon les notices Dacia Sandero 3 et Renault Clio 5, un système d'allumage défectueux ou une bougie débranchée se traduit par des ratés d'allumage et des à-coups ; ces ratés échauffent le pot catalytique et peuvent amener sa destruction."
    pieces:
      - bougies-d-allumage
      - catalyseur
  - cause: Réservoir presque vide ou panne d'essence
    explication: "La notice Seat Ibiza demande de ne pas vider complètement le réservoir : l'alimentation devient irrégulière et peut provoquer des ratés, qui peuvent endommager le catalyseur. La notice Dacia Sandero 3 cite aussi la panne d'essence parmi les causes des ratés et des à-coups."
    pieces:
      - carburant-et-reamorcage
      - catalyseur
  - cause: Défaut de la gestion du moteur
    explication: "Selon la notice Seat Ibiza, tant que les voyants de la gestion du moteur restent allumés, le moteur peut présenter un dysfonctionnement et perdre de la puissance. Elle ne nomme pas la pièce en cause : le diagnostic au garage le dit."
    pieces:
      - capteur-ou-sonde
      - calculateur
---

## Voiture qui broute : le voyant moteur d'abord

Quand la voiture broute ou donne des à-coups, regardez d'abord le voyant moteur, qui décide de ce qu'il faut faire. Sans voyant, les notices lues demandent de faire contrôler ou réparer la voiture, et trois d'entre elles signalent un risque pour le catalyseur. Suivez les questions ci-dessous.

## Le bon geste selon ce que vous voyez

{{arbre}}

1. Le voyant moteur clignote-t-il ?
   - Oui : levez le pied. {{verdict:moteur-orange-clignotant}}
   - Non : passez à la question 2.
2. Le voyant moteur est-il allumé fixe ?
   - Oui. {{verdict:moteur-orange-fixe}}
   - Non : passez à la question 3.
3. Le moteur est-il à essence ou diesel ?
   - Essence : arrêtez-vous dans un endroit sûr et faites contrôler la voiture avant de repartir ; si le réservoir est presque vide, dites-le au garage, c'est une cause possible des ratés. {{verdict:ligne-3}}
   - Diesel : arrêtez-vous dans un endroit sûr et faites contrôler la voiture avant de repartir. {{verdict:ligne-4}}

## Voyant moteur qui clignote : des ratés de combustion

{{repere:moteur-orange-clignotant}}

Un voyant moteur qui clignote signale des ratés de combustion, qui peuvent abîmer le catalyseur : sa consigne, dans l'encadré, est celle de la notice la plus prudente. Selon la notice {{notice:notice-seat-ibiza}}, lors des ratés d'allumage, du carburant non brûlé arrive dans l'échappement et peut surchauffer et endommager le catalyseur ({{cite:notice-seat-ibiza|p. 289}}). Le tableau des notices, en bas de page, donne la consigne de chaque marque.

## Moteur essence : voiture qui broute sans voyant moteur

{{repere:ligne-3}}

La notice {{notice:notice-toyota-yaris}} range les ratés d'allumage, les à-coups et le fonctionnement irrégulier du moteur parmi les signes d'un réglage ou d'une réparation à faire : elle demande de contacter un réparateur dès que possible ({{cite:notice-toyota-yaris|p. 291}}). Sur les versions essence, les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} précisent que ces ratés et à-coups échauffent le pot catalytique et peuvent amener sa destruction : elles demandent de faire réparer la voiture au plus vite ({{cite:notice-renault-clio-5|p. 188}} ; {{cite:notice-dacia-sandero-3|p. 162}}). La notice Seat Ibiza demande de contacter un atelier spécialisé, et prévient que le catalyseur risquerait d'être endommagé par surchauffe.

Selon les notices Dacia Sandero 3 et Renault Clio 5, ces ratés et à-coups peuvent venir d'un système d'allumage défectueux, d'une bougie débranchée ou d'une panne d'essence. Si la voiture perd aussi de la puissance, voyez la page [perte de puissance](/perte-de-puissance-voiture/).

## Moteur diesel : voiture qui broute sans voyant moteur

{{repere:ligne-4}}

Pour un diesel, la seule consigne des notices lues est celle de la notice Seat Ibiza, dont le passage ne se limite pas à l'essence : contacter un atelier spécialisé, le catalyseur risquant d'être endommagé par surchauffe ({{cite:notice-seat-ibiza|p. 289}}). Les passages des notices Renault Clio 5 et Dacia Sandero 3 ne visent que les versions essence, et la notice Toyota Yaris lue ne couvre aucune version diesel. Aucun des documents lus ne donne de cause propre au diesel : un code défaut lu au garage peut la préciser.

## Réservoir presque vide et ratés

La notice Seat Ibiza demande de ne pas vider complètement le réservoir : l'alimentation devient irrégulière et peut provoquer des ratés ({{cite:notice-seat-ibiza|p. 289}}). Sur les versions essence, la notice Dacia Sandero 3 range le roulage prolongé avec le voyant de carburant mini allumé parmi les conditions qui échauffent le pot catalytique ({{cite:notice-dacia-sandero-3|p. 162}}). La notice {{notice:notice-peugeot-208}} demande de ne jamais rouler jusqu'à la panne sèche, qui pourrait endommager les systèmes d'antipollution et d'injection ({{cite:notice-peugeot-208|p. 15}}).
