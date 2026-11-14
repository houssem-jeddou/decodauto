---
# Brouillon de la page « voyant FAP » (étape 8, lot 3), rédigé le 14/11/2026 sur le modèle de page voyant. Il reste ici,
# hors d'exemples/ et de src/content, jusqu'à la validation de Houssem (tests/porte6.test.ts exige l'empreinte de toute page
# rédigée) : ensuite exemples/voyant/voyant-fap.md avec son empreinte, puis passage. La ligne de l'encadré vient de la base
# voyants validée.
id: voyant-fap
title: "Voyant FAP (filtre à particules) allumé : peut-on rouler ?"
h1: "Voyant du filtre à particules (FAP) : que faire quand il s'allume ?"
description: "Voyant FAP allumé : vous pouvez rouler, mais régénérez le filtre sans attendre, à allure soutenue. Ce que dit chaque notice, causes, contrôle technique et coût probable."
libelle_court: Voyant FAP
question_decision: Puis-je continuer à rouler avec le voyant du filtre à particules allumé ?
situations:
  - voyant: fap
voyants:
  - fap
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce ou l'opération la plus lourde qu'elle peut toucher (liste des pièces du site) : de la régénération en roulant, que vous faites vous-même, au filtre à remplacer."
  sources:
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-renault-clio-5
    - notice-seat-ibiza
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
  - arrete-1991-06-18-controle-technique
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-14
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
causes:
  - cause: Filtre en début de saturation, à régénérer en roulant
    explication: "Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, le témoin signale un début de saturation du filtre et demande au conducteur de le nettoyer en roulant ; selon la notice Peugeot 208, le filtre commence à saturer ; selon la notice Seat Ibiza, il est obstrué par de la suie et doit être nettoyé (régénération). La régénération se fait en roulant, comme le dit l'encadré."
    pieces:
      - regeneration-fap
  - cause: Additif du filtre à particules au niveau minimum
    explication: "La notice Peugeot 208 décrit le même témoin, accompagné d'un message sur le niveau insuffisant de l'additif du filtre à particules : le réservoir d'additif est au minimum, et l'appoint se fait réaliser rapidement dans le réseau de la marque ou dans un atelier qualifié."
    pieces:
      - appoint-additif-fap
  - cause: Filtre saturé, ou régénération qui ne suffit pas
    explication: "Selon la notice Seat Ibiza, un témoin encore allumé après 30 minutes de conduite en régénération demande de faire réparer le défaut dans un atelier spécialisé ; selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, la saturation du filtre allume d'autres témoins avec le message « Injection à contrôler », et il faut consulter le réseau de la marque. Aucune ne nomme la pièce en cause : la tranche retenue est celle du filtre à remplacer, la plus lourde."
    pieces:
      - filtre-a-particules
---

## Peut-on rouler avec le voyant FAP allumé ?

Oui, mais pas comme d'habitude : {{verdict:fap}}. Les notices demandent de régénérer le filtre en roulant, dès que la circulation le permet, et en respectant les limitations de vitesse. Ne coupez pas le moteur au premier arrêt venu : c'est en roulant que le témoin doit s'éteindre.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

Les quatre premières décrivent un témoin du filtre à particules ; la Toyota Yaris lue ici, à moteur essence, signale son filtre par un message (voir plus bas). Pour une autre marque, Audi, BMW ou Volkswagen par exemple, cherchez « filtre à particules » dans la notice de votre voiture.

## À quoi sert le filtre à particules, et pourquoi son voyant s'allume

Le filtre à particules, ou FAP, retient la suie des gaz d'échappement. Pour ne pas se boucher, il doit régulièrement brûler cette suie : c'est la régénération. La notice {{notice:notice-seat-ibiza}} explique qu'il faut pour cela un moteur à sa température de fonctionnement et une vitesse soutenue, qui augmente la température et brûle la suie ({{cite:notice-seat-ibiza|p. 289, « Régénération du filtre à particules essence et diesel »}}).

Le témoin s'allume quand cette régénération n'a pas pu se faire seule et que le filtre commence à saturer. Selon les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}}, il indique un début de saturation et la nécessité d'une intervention du conducteur pour nettoyer le filtre.

## Comment régénérer le filtre en roulant

Chaque notice donne sa façon de faire ; le tableau plus bas cite chacune à la page près :

- **Peugeot 208** : rouler à au moins 60 km/h jusqu'à l'extinction du témoin, dès que les conditions de circulation le permettent ;
- **Renault Clio 5 phase 2 et Dacia Sandero 3** (versions Diesel) : continuer à rouler selon la circulation et les limitations de vitesse, si possible sans laisser le régime descendre sous 2 000 tours par minute ; le témoin doit s'éteindre au bout de 10 à 20 minutes environ ;
- **Seat Ibiza** : moteur chaud, rouler entre 50 et 120 km/h, en respectant les limitations et les rapports conseillés, et ne terminer la régénération qu'après l'extinction du témoin.

Une voie rapide ou une route dégagée s'y prête mieux que la ville. Si la circulation ne le permet pas, faites-le au premier trajet qui le permet, sans attendre plusieurs jours : l'urgence est celle de l'encadré.

## Le voyant ne s'éteint pas, ou d'autres voyants s'allument

- Selon la notice {{notice:notice-seat-ibiza}}, si le témoin reste allumé après 30 minutes de conduite en régénération, il faut contacter un atelier spécialisé pour faire réparer le défaut ({{cite:notice-seat-ibiza|p. 290}}).
- Selon les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}}, quand le filtre est saturé, d'autres témoins s'allument avec le message « Injection à contrôler » : consultez alors le réseau de la marque. Si le message est « Risque casse moteur », arrêtez la voiture, coupez le moteur et faites appel au réseau de la marque ({{cite:notice-renault-clio-5|p. 187}}, {{cite:notice-dacia-sandero-3|p. 161}}).

Si le [voyant moteur](/voyants/moteur/) s'allume avec celui du FAP, sa page dit quoi faire selon sa couleur et selon qu'il clignote ou non.

## Voyant FAP et additif : comment l'éteindre ?

Certains moteurs Diesel utilisent un additif qui aide le filtre à se régénérer. La notice {{notice:notice-peugeot-208}} décrit le même témoin, accompagné d'un signal sonore et d'un message sur le niveau insuffisant de l'additif : le réservoir d'additif est au minimum, et il faut faire réaliser l'appoint rapidement, dans le réseau Peugeot ou dans un atelier qualifié ({{cite:notice-peugeot-208|p. 15}}, renvoi (3) de la p. 13).

Dans ce cas, le témoin ne vient pas d'un filtre à régénérer : c'est l'appoint d'additif qui règle le problème. Ne cherchez pas à effacer le témoin sans traiter sa cause. Pour une Peugeot 308 ou une autre voiture que la 208 lue ici, la notice de votre véhicule dit si elle a un additif et où se fait l'appoint.

## Un filtre à particules sur un moteur essence ?

Oui, sur certaines voitures. La notice {{notice:notice-seat-ibiza}} décrit la régénération du filtre à particules « essence et diesel ». Les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} ont aussi un témoin du filtre à particules pour leurs versions essence : rouler dès que possible entre 50 et 110 km/h environ, dans le respect des limitations, jusqu'à son extinction ({{cite:notice-renault-clio-5|p. 188}}, {{cite:notice-dacia-sandero-3|p. 162}}).

La notice {{notice:notice-toyota-yaris}}, à moteur essence, signale le filtre plein par un message, « Filtre d'échappement plein », sans témoin propre ; la conduite reste possible tant que le témoin de dysfonctionnement ne s'allume pas. Si ce témoin s'allume, ou si le message « Entretien du moteur requis » s'affiche, la notice demande de faire vérifier la voiture immédiatement ({{cite:notice-toyota-yaris|p. 204}}).

## Voyant FAP allumé au contrôle technique

Le texte du contrôle technique, l'annexe I de l'arrêté du 18 juin 1991, ne nomme ni le filtre à particules ni son témoin. Pour un moteur Diesel, il contrôle l'équipement de réduction des émissions monté par le constructeur : manifestement absent, modifié ou défectueux, c'est une défaillance majeure ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 8.2.21}}). Il contrôle aussi le relevé du système de diagnostic (OBD) : une anomalie du dispositif antipollution sans dysfonctionnement important est une défaillance mineure, un dysfonctionnement important une défaillance majeure ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 8.2.22}}). Les mêmes règles valent pour un moteur essence (points 8.2.11 et 8.2.12).

Une défaillance majeure impose une contre-visite dans les deux mois ({{cite:arrete-1991-06-18-controle-technique|article 7}}). Le texte ne dit pas si le seul témoin du FAP allumé suffit à constater une défaillance : le plus sûr est de régénérer le filtre, ou de le faire réparer, avant le rendez-vous.

## FAP bouché : régénération, nettoyage ou remplacement

Un filtre qui commence à se boucher se signale d'abord par son témoin, et la régénération en roulant suffit en général à l'éteindre : c'est la première tranche du coût probable. Les notices lues ne décrivent pas d'autre nettoyage à faire soi-même ; si le témoin ne s'éteint pas, ou si d'autres témoins s'allument, c'est au garage de trouver la cause, du capteur au filtre lui-même.
