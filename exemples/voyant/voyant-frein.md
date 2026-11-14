---
# Page « voyant frein » de la vague A (étape 8, lot 5d), rédigée le 14/11/2026, en attente de la validation de Houssem
# (paquet travaux/etape-8/paquet-lot-5d.md). Elle reste dans exemples/ jusqu'à la pull request de mise en ligne.
id: voyant-frein
title: "Voyant frein allumé : liquide, plaquettes, frein à main, peut-on rouler ?"
h1: "Voyant frein : liquide de frein bas, plaquettes usées ou frein à main serré ?"
description: "Voyant de freinage rouge, frein à main desserré : arrêtez-vous. Témoin jaune des plaquettes : garage sans attendre. Frein à main serré : desserrez-le."
libelle_court: Voyant de frein
question_decision: Puis-je continuer à rouler avec le voyant de frein allumé ?
situations:
  - voyant: frein-rouge
  - situation: "Le témoin d'usure des plaquettes de frein s'allume, sur les voitures qui en ont un : les plaquettes sont usées."
    verdict: oui avec précautions
    urgence: immédiate
    action: "Allez sans attendre dans un garage pour faire contrôler les plaquettes et remplacer celles qui sont usées. Si le voyant de freinage rouge s'allume aussi, c'est sa consigne, plus prudente, qui s'applique."
    citations:
      - source: notice-seat-leon
        emplacement: "p. 297-298, « Système de freinage », Témoins et AVERTISSEMENT"
        extrait: "S'allume en jaune. Plaquettes de frein avant usées. Adressez-vous immédiatement à un garage spécialisé. […] Si le témoin […] s'allume, seul ou en combinaison avec un message à l'écran du combiné d'instruments, rendez-vous immédiatement […] pour qu'il contrôle les plaquettes de frein et qu'il remplace celles qui sont usées."
        verdict: oui avec précautions
        urgence: immédiate
  - voyant: frein-stationnement
voyants:
  - frein-rouge
  - frein-stationnement
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site) : du frein de stationnement resté serré, sans dépense, au remplacement du servofrein."
  sources:
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-renault-clio-5
    - notice-seat-ibiza
    - notice-seat-leon
    - notice-toyota-yaris
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-seat-leon
  - notice-toyota-yaris
  - arrete-1991-06-18-controle-technique
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-14
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
causes:
  - cause: Frein de stationnement serré ou mal desserré
    explication: "Selon la notice Peugeot 208, le témoin du frein de stationnement manuel signale un frein serré ou mal desserré ; selon les notices Seat Ibiza et Toyota Yaris, il s'éteint quand on desserre le frein."
    pieces:
      - frein-de-stationnement-serre
  - cause: Plaquettes de frein usées (témoin d'usure)
    explication: "Selon la notice Seat Leon, le témoin jaune signale des plaquettes de frein avant usées, que le garage contrôle et remplace. Les autres notices lues ne décrivent pas ce témoin."
    pieces:
      - plaquettes-et-disques
  - cause: Circuit de freinage qui n'est plus étanche (niveau de liquide de frein bas)
    explication: "Selon la notice Seat Leon, un niveau de liquide de frein qui baisse sensiblement en peu de temps, ou qui passe sous le repère du réservoir, peut signifier que le système de freinage n'est plus étanche. La notice Peugeot 208 parle d'une baisse importante du niveau dans le circuit de freinage."
    pieces:
      - circuit-de-freinage
  - cause: Défaut du circuit ou du système de freinage, dont le servofrein
    explication: "Les notices Seat Ibiza, Renault Clio 5 phase 2, Dacia Sandero 3 et Toyota Yaris parlent d'un dysfonctionnement ou d'un incident du circuit ou du système de freinage, sans nommer la pièce. Selon la notice Seat Leon, une panne du servofrein électromécanique affiche le symbole rouge de panne du système de freinage."
    pieces:
      - circuit-de-freinage
      - servofrein
---

## Peut-on rouler avec le voyant frein allumé ?

Tout dépend du voyant qui s'allume : sous le nom de voyant frein, on trouve trois voyants différents.

**Voyant de freinage rouge, frein de stationnement desserré** : {{verdict:frein-rouge}}. Il signale un niveau de liquide de frein trop bas ou un défaut du circuit de freinage. Toutes les notices lues demandent l'arrêt. La notice Seat Ibiza demande de ne pas continuer à rouler ({{cite:notice-seat-ibiza|p. 251}}), la notice Toyota Yaris de s'arrêter immédiatement dans un endroit sûr ({{cite:notice-toyota-yaris|p. 292}}). Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, s'il s'allume au freinage avec le témoin STOP et un signal sonore, arrêtez-vous et faites appel à un représentant de la marque ({{cite:notice-renault-clio-5|p. 137}}, {{cite:notice-dacia-sandero-3|p. 110-111}}).

**Témoin d'usure des plaquettes** : {{verdict:ligne-2}}. Cette ligne repose sur une seule notice, celle de la Seat Leon : le témoin jaune signale des plaquettes de frein avant usées, et elle demande de s'adresser immédiatement à un garage spécialisé ({{cite:notice-seat-leon|p. 297}}).

**Voyant du frein de stationnement (frein à main)** : {{verdict:frein-stationnement}}. Il signale que le frein est serré ; la notice Peugeot 208 ajoute : ou mal desserré ({{cite:notice-peugeot-208|p. 14}}).

Si le voyant de freinage rouge s'allume en même temps qu'un autre voyant, ABS ou plaquettes par exemple, c'est sa consigne, l'arrêt, qui s'applique.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-seat-leon}}
- {{notice:notice-toyota-yaris}}

Pour une autre marque, BMW, Mini ou Volkswagen par exemple, cherchez « frein » dans la notice de votre voiture.

## Voyant liquide de frein : peut-on rouler ?

Le voyant du liquide de frein est le voyant de freinage rouge : {{verdict:frein-rouge}}. Selon la notice Seat Leon, si le niveau du liquide baisse sensiblement en peu de temps, ou passe sous le repère du réservoir, le système de freinage n'est peut-être plus étanche : elle demande alors de faire appel à un spécialiste ({{cite:notice-seat-leon|p. 370}}). La notice Peugeot 208 prévoit, une fois la voiture arrêtée, un appoint avec un liquide conforme aux recommandations du constructeur ; si le problème persiste, elle demande de faire appel au réseau Peugeot ou à un atelier qualifié ({{cite:notice-peugeot-208|p. 14 ; renvois p. 13}}).

Les dessins des voyants rouges, dont celui du freinage, sont dans la [liste des voyants](/voyants/).

## Voyant plaquette de frein : peut-on rouler ?

Verdict retenu en haut de page : {{verdict:ligne-2}}. Dans la notice Seat Leon, ce témoin s'allume en jaune quand les plaquettes de frein avant sont usées. Qu'il s'allume seul ou avec un message au tableau de bord, elle demande d'aller immédiatement dans un atelier spécialisé, pour qu'il contrôle les plaquettes et remplace celles qui sont usées ({{cite:notice-seat-leon|p. 298}}).

Combien de kilomètres peut-on faire ? Aucune des notices lues ne donne de distance à ne pas dépasser : la Seat Leon demande d'aller au garage immédiatement.

Les autres notices lues (Peugeot 208, Renault Clio 5 phase 2, Dacia Sandero 3, Toyota Yaris, Seat Ibiza et Citroën C3) ne décrivent pas ce témoin. Si votre voiture en a un, sa notice dit sa couleur et sa consigne ; à défaut, c'est la consigne de l'encadré qui s'applique.

**Le témoin reste allumé après le changement des plaquettes** : les notices lues n'en donnent pas la raison. Faites vérifier le témoin et son câblage par le garage qui a fait le remplacement : au contrôle technique, un faisceau électrique du témoin d'usure déconnecté ou détérioré est une défaillance ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 1.1.13}}).

## Voyant frein à main allumé

Verdict retenu : {{verdict:frein-stationnement}}. Selon la notice Toyota Yaris, un signal sonore retentit si la voiture roule avec le frein de stationnement serré ({{cite:notice-toyota-yaris|p. 118}}).

Si un voyant de frein rouge reste allumé une fois le frein complètement desserré, ou s'allume en roulant, c'est la ligne du voyant de freinage qui s'applique : {{verdict:frein-rouge}}.

Avec un frein de stationnement électrique, d'autres témoins existent. La notice Seat Leon range un défaut de ce frein parmi ses témoins jaunes ({{cite:notice-seat-leon|p. 97}}). La notice Peugeot 208 décrit plusieurs témoins et le message « Défaut frein de parking », avec des consignes différentes : la [page des voyants ABS et ESP](/voyants/abs-esp/) les détaille.

## Voyant frein orange ou jaune

Ce n'est pas le voyant de freinage rouge. Selon la voiture, ce peut être :

- le témoin d'usure des plaquettes, jaune dans la notice Seat Leon : {{verdict:ligne-2}} ;
- le voyant ABS, jaune dans la notice Seat Leon ({{cite:notice-seat-leon|p. 97}}), orange dans la notice Peugeot 208 ({{cite:notice-peugeot-208|p. 14 et 17}}) : sa consigne est sur la [page des voyants ABS et ESP](/voyants/abs-esp/) ;
- un témoin de défaut du frein de stationnement électrique (partie précédente).

Si le voyant de freinage rouge s'allume aussi, c'est l'arrêt : {{verdict:frein-rouge}}.

## Pédale de frein dure, message de panne du freinage

Selon la notice Seat Leon, en cas de panne du servofrein électromécanique, le symbole rouge de panne du système de freinage s'affiche, la pédale peut vibrer, et il faut appuyer plus fort sur la pédale de frein : la distance de freinage augmente ({{cite:notice-seat-leon|p. 304}}). Le voyant de freinage est allumé : {{verdict:frein-rouge}}.

Les notices Renault Clio 5 phase 2 et Dacia Sandero 3 décrivent deux messages : « Système freinage à contrôler », avec les voyants ABS et Service, et « Panne du système de freinage », avec plusieurs voyants ({{cite:notice-renault-clio-5|p. 212-213}}, {{cite:notice-dacia-sandero-3|p. 184-185}}). La [page des voyants ABS et ESP](/voyants/abs-esp/) donne la consigne de chacun. Dès que le voyant de freinage rouge est allumé : {{verdict:frein-rouge}}.

## Comment éteindre le voyant frein ?

Les notices lues ne décrivent aucune manipulation pour éteindre un voyant de frein : il s'éteint quand la cause est corrigée. Le voyant du frein de stationnement s'éteint quand on desserre le frein ({{cite:notice-seat-ibiza|p. 251}}). Pour le voyant de freinage et le témoin d'usure des plaquettes, c'est le garage qui contrôle et répare. Pour une Mini, ou une autre marque dont la notice n'a pas été lue ici, c'est la notice de la voiture qui fait foi.

## Voyants de frein au contrôle technique

L'annexe I de l'arrêté du 18 juin 1991 classe en défaillance mineure le témoin du liquide des freins allumé ou défectueux ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 1.1.10}}). Elle contrôle aussi l'usure des plaquettes : usure importante, défaillance mineure ; usure excessive, marque minimale atteinte, défaillance majeure ; marque minimale non visible, défaillance critique ; le faisceau électrique du témoin d'usure déconnecté ou détérioré est une défaillance mineure ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 1.1.13}}). Pour le frein de stationnement, un signal avertisseur qui indique un dysfonctionnement est une défaillance majeure ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 1.1.6}}).

Une défaillance majeure impose une contre-visite dans les deux mois ; avec une défaillance critique, la validité du contrôle est limitée au jour du contrôle ({{cite:arrete-1991-06-18-controle-technique|article 7}}). La consigne de l'encadré ne change pas. Voyant de freinage rouge : {{verdict:frein-rouge}}. Témoin d'usure des plaquettes : {{verdict:ligne-2}}.
