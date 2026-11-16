---
# BROUILLON, jamais validé. Étape 10, lot B4 (rédaction ouverte par la validation de la porte 10 le 16/11/2026,
# 19 h 26). Page de la vague B, sans empreinte tant que Houssem n'a pas validé son encadré (paquet du lot B4).
# - Extraits relus mot pour mot le 16/11/2026 : travaux/etape-10/textes/autres-pannes-verification.md (Dacia p. 162,
#   Renault p. 188, Seat p. 283, 288 et 289, Toyota p. 291 et 322-323). Lignes du voyant moteur et de la température
#   reprises de la base.
# - Corrigée après la revue indépendante du 16/11/2026 (non relue depuis) : ligne « sans voyant » coupée en deux (essence,
#   diesel) au niveau « Non, ne poursuivez pas votre trajet » (risque pour le catalyseur annoncé par Renault, Dacia et Seat) ;
#   ligne de la base `temperature-rouge` ajoutée (Toyota p. 322-323 : la perte de puissance est un signe possible de
#   surchauffe) ; risque « si vous continuez » déclaré ; causes du turbo (MAHLE, source secondaire, sans verdict).
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
  - voyant: temperature-rouge
  - situation: "Le voyant EPC (gestion du moteur essence) s'allume, sur une voiture dont la notice le décrit (Seat Ibiza)"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites contrôler le moteur sans attendre par un atelier. Si la voiture perd de la puissance, suivez la ligne « Moteur essence », plus prudente."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 288, « Gestion du moteur et système d'épuration des gaz d'échappement », témoin EPC"
        extrait: "Témoin allumé — Dysfonctionnement de la gestion du moteur essence. Faites immédiatement contrôler le moteur par un atelier spécialisé."
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "Moteur essence : ratés, à-coups ou perte de puissance, sans voyant moteur allumé"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Arrêtez-vous dans un endroit sûr et faites contrôler la voiture par un garage avant de reprendre la route : le catalyseur peut être endommagé."
    ecart_marques: "Les notices Renault Clio 5 et Dacia Sandero 3 (versions essence) annoncent la destruction possible du pot catalytique, la notice Seat Ibiza un catalyseur endommagé par surchauffe ; la notice Toyota Yaris demande de contacter un réparateur dès que possible, sans annoncer de dégât."
    ecart_court: "Plus stricts : Renault, Dacia et Seat (catalyseur menacé). Moins strict : Toyota (réparateur dès que possible)."
    citations:
      - source: notice-toyota-yaris
        emplacement: "p. 291, 7.2.2 « Si vous pensez qu'il y a un problème », symptômes de fonctionnement : « Perte de puissance importante »"
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
  - situation: "Moteur diesel : perte de puissance ou à-coups, sans voyant moteur allumé"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Arrêtez-vous dans un endroit sûr et faites contrôler la voiture par un garage avant de reprendre la route : selon la notice Seat Ibiza, le catalyseur risquerait d'être endommagé."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 289, « Catalyseur »"
        extrait: "Si vous constatez une panne de combustion, une baisse de puissance ou un fonctionnement irrégulier du moteur, contactez un atelier spécialisé pour faire réviser le véhicule. En règle générale, le témoin de gaz d'échappement s'allume lorsque les symptômes décrits se produisent. […] Par ailleurs, le catalyseur risquerait d'être endommagé par surchauffe."
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Légère perte de puissance après un plein d'essence d'indice d'octane plus bas que celui conseillé, faute de supercarburant"
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
  - temperature-rouge
element_unique: arbre-de-decision
format: 2
illustration:
  fichier: puissance-voyants
  alt: "Deux voyants à regarder au tableau de bord quand la voiture perd de la puissance : le voyant moteur, fixe ou clignotant, et le voyant EPC"
  legende: "Quand la voiture perd de la puissance, regardez d'abord le tableau de bord : voyant moteur fixe ou clignotant, voyant EPC sur les voitures dont la notice le décrit, et aiguille de température."
symptome: "La voiture accélère moins bien, peine en côte ou ne dépasse plus une certaine vitesse, avec ou sans voyant."
carburant: essence et diesel
contexte:
  - en roulant
  - à l'accélération
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues (gestion du moteur, carburant, surchauffe) et, pour le turbo, d'un document technique d'équipementier (MAHLE). Le risque si l'on continue vient des notices Renault Clio 5 et Dacia Sandero 3 (versions essence) et Seat Ibiza : le catalyseur peut être endommagé, voire détruit."
  sources:
    - notice-dacia-sandero-3
    - notice-renault-clio-5
    - notice-seat-ibiza
    - notice-toyota-yaris
    - mahle-turbo-dommages-2024
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
  - mahle-turbo-dommages-2024
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
causes:
  - cause: Allumage défectueux ou bougie débranchée (essence)
    explication: "Selon les notices Dacia Sandero 3 et Renault Clio 5, un système d'allumage défectueux ou une bougie débranchée se traduit par des ratés d'allumage et des à-coups ; ces anomalies, comme une perte de puissance, échauffent le pot catalytique et peuvent amener sa destruction."
    pieces:
      - bougies-d-allumage
      - catalyseur
  - cause: Défaut de la gestion du moteur
    explication: "Selon la notice Seat Ibiza, tant que les voyants de la gestion du moteur restent allumés, le moteur peut perdre de la puissance et consommer davantage. Elle ne nomme pas la pièce en cause : le diagnostic au garage le dit."
    pieces:
      - capteur-ou-sonde
      - calculateur
  - cause: Panne d'essence ou réservoir presque vide
    explication: "La notice Dacia Sandero 3 cite la panne d'essence parmi les causes des ratés et des à-coups, qui peuvent détruire le pot catalytique ; la notice Seat Ibiza demande de ne pas vider complètement le réservoir, l'alimentation irrégulière pouvant provoquer des ratés, qui peuvent endommager le catalyseur."
    pieces:
      - carburant-et-reamorcage
      - catalyseur
  - cause: Carburant d'indice d'octane trop bas (essence)
    explication: "Selon la notice Seat Ibiza, une essence d'indice d'octane plus bas que celui conseillé peut causer une légère perte de puissance."
    pieces:
      - fonctionnement-normal
  - cause: Moteur qui surchauffe
    explication: "Selon la notice Toyota Yaris, une perte de puissance du moteur fait partie des signes possibles d'une surchauffe, comme l'aiguille de température dans la zone rouge."
    pieces:
      - appoint-liquide-de-refroidissement
      - motoventilateur
  - cause: Pression du turbo trop faible (moteur à turbo)
    explication: "Selon le document technique de MAHLE sur les turbocompresseurs, écrit pour les ateliers, un turbo abîmé peut donner une pression de suralimentation trop faible, et le moteur manque alors de puissance ; un retour d'huile du turbo bouché peut aussi lui en faire perdre. Sa liste de causes n'est pas complète."
    pieces:
      - turbo
---

## Perte de puissance : regarder d'abord les voyants

Quand la voiture perd de la puissance, regardez d'abord le tableau de bord : un voyant allumé, ou l'aiguille de température dans la zone rouge, décide de ce qu'il faut faire. Sans voyant, les notices lues demandent de faire contrôler ou réparer la voiture, et trois d'entre elles signalent un risque pour le catalyseur. Suivez les questions ci-dessous.

## Le bon geste selon ce que vous voyez

{{arbre}}

1. Le voyant moteur est-il allumé ?
   - Oui, il clignote : levez le pied. {{verdict:moteur-orange-clignotant}}
   - Oui, il est fixe. {{verdict:moteur-orange-fixe}}
   - Non : passez à la question 2.
2. L'aiguille de température est-elle dans la zone rouge, ou voyez-vous le voyant ou un message de température, ou de la vapeur sous le capot ?
   - Oui : arrêtez-vous dès que vous pouvez le faire sans danger. {{verdict:temperature-rouge}}
   - Non : passez à la question 3.
3. Avez-vous dû faire le plein avec une essence d'indice d'octane plus bas que celui conseillé, et la perte de puissance est-elle légère ?
   - Oui : roulez à régime moyen, et rajoutez le carburant conseillé dès que possible. {{verdict:ligne-7}}
   - Non, ou la perte de puissance est forte : passez à la question 4.
4. Le moteur est-il à essence ou diesel ?
   - Essence, voyant EPC allumé ou non : arrêtez-vous dans un endroit sûr et faites contrôler la voiture avant de repartir. {{verdict:ligne-5}}
   - Diesel : arrêtez-vous dans un endroit sûr et faites contrôler la voiture avant de repartir. {{verdict:ligne-6}}

## Voyant moteur allumé avec la perte de puissance

{{repere:moteur-orange-fixe}}

Fixe ou clignotant, le voyant moteur décide : sa consigne, dans l'encadré, est celle de la notice la plus prudente, et le tableau des notices, en bas de page, donne celle de chaque marque. Un voyant qui clignote signale des ratés de combustion, qui peuvent abîmer le catalyseur. Sur un diesel, un voyant de préchauffage qui clignote signale aussi un défaut de la gestion du moteur, selon la notice {{notice:notice-seat-ibiza}} ({{cite:notice-seat-ibiza|p. 289}}).

## Perte de puissance et surchauffe

{{repere:temperature-rouge}}

La notice {{notice:notice-toyota-yaris}} range la perte de puissance parmi les signes possibles d'une surchauffe, avec l'aiguille de température dans la zone rouge, un message de température ou de la vapeur sous le capot ({{cite:notice-toyota-yaris|p. 322-323}}). Sa première mesure est d'arrêter la voiture dans un endroit sûr, puis de couper la climatisation et le moteur. Regardez donc l'aiguille de température avant de chercher une autre cause.

## Le voyant EPC (essence)

{{repere:ligne-4}}

Sur la Seat Ibiza, le voyant EPC (Electronic Power Control, appelé témoin dans la notice) signale un dysfonctionnement de la gestion du moteur essence : la notice demande de faire immédiatement contrôler le moteur par un atelier spécialisé ({{cite:notice-seat-ibiza|p. 288}}). Il s'allume à la mise du contact et doit s'éteindre une fois le moteur démarré. C'est la seule des notices lues qui décrit ce voyant : sur une autre voiture, fiez-vous à sa notice.

Avec une perte de puissance, la consigne du moteur essence, plus prudente, s'applique aussi : le catalyseur peut être endommagé.

## Moteur essence : perte de puissance sans voyant moteur

{{repere:ligne-5}}

La notice {{notice:notice-toyota-yaris}} range une perte de puissance importante, des à-coups ou un fonctionnement irrégulier du moteur parmi les signes d'un réglage ou d'une réparation à faire : elle demande de contacter un réparateur dès que possible ({{cite:notice-toyota-yaris|p. 291}}). Sur les versions essence, les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} précisent qu'une perte de puissance, des ratés ou des à-coups échauffent le pot catalytique et peuvent amener sa destruction : elles demandent de faire réparer la voiture au plus vite ({{cite:notice-renault-clio-5|p. 188}} ; {{cite:notice-dacia-sandero-3|p. 162}}). La notice Seat Ibiza demande de contacter un atelier spécialisé, et prévient que le catalyseur risquerait d'être endommagé par surchauffe ({{cite:notice-seat-ibiza|p. 289}}).

Si la voiture broute ou donne des à-coups, voyez aussi la page [voiture qui broute](/voiture-qui-broute/).

## Moteur diesel : perte de puissance sans voyant moteur

{{repere:ligne-6}}

Pour un diesel, la seule consigne des notices lues est celle de la notice Seat Ibiza, dont le passage ne se limite pas à l'essence : contacter un atelier spécialisé, le catalyseur risquant d'être endommagé par surchauffe ({{cite:notice-seat-ibiza|p. 289}}). Les passages des notices Renault Clio 5 et Dacia Sandero 3 ne visent que les versions essence, et la notice Toyota Yaris lue ne couvre aucune version diesel. Aucune notice lue ne décrit de « mode dégradé » sous ce nom.

Pour un moteur à turbo, un document technique écrit pour les ateliers par l'équipementier MAHLE relie un manque de puissance à une pression de suralimentation trop faible, par exemple avec un turbo abîmé, et une perte de puissance à de l'huile accumulée dans l'admission quand le retour d'huile du turbo est bouché ({{cite:mahle-turbo-dommages-2024|p. 6-7 et 10-11}}). Ce ne sont que des exemples : sa liste de causes n'est pas complète. Un garage peut aussi lire un code défaut : les pages [code P0087](/codes-defaut/p0087/) (pression de carburant trop basse) et [code P0299](/codes-defaut/p0299/) (pression du turbo trop faible) disent ce que ces codes signifient.

## Essence d'indice d'octane trop bas

{{repere:ligne-7}}

Selon la notice Seat Ibiza, une essence d'un indice d'octane plus bas que celui conseillé peut causer une légère perte de puissance. Si l'on a dû en mettre faute de supercarburant, elle demande de ne faire tourner le moteur qu'à régime moyen, de le solliciter faiblement, et de rajouter dès que possible du supercarburant ({{cite:notice-seat-ibiza|p. 283}}). Le carburant à utiliser est écrit dans la notice de votre voiture.
