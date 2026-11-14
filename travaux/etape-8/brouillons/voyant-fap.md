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
  - voyant: moteur-orange-fixe
  - voyant: moteur-rouge
voyants:
  - fap
  - moteur-orange-fixe
  - moteur-rouge
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
    explication: "Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, le témoin signale un début de saturation du filtre et demande au conducteur de le nettoyer en roulant ; selon la notice Peugeot 208, le filtre commence à saturer ; selon la notice Seat Ibiza, il est obstrué par de la suie et doit être nettoyé (régénération). Selon la notice Toyota Yaris, la suie s'accumule plus vite sur des trajets courts ou à basse vitesse. La régénération se fait en roulant, comme le dit l'encadré."
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

Verdict retenu en haut de page : {{verdict:fap}}. Les notices Peugeot 208, Renault Clio 5 phase 2 et Dacia Sandero 3 demandent de régénérer le filtre en roulant dès que la circulation le permet ; Renault, Dacia et Seat rappellent de respecter les limitations de vitesse. Selon la notice Dacia, un arrêt de la voiture, ou un régime moteur sous 2 000 tours par minute, avant l'extinction du témoin peut obliger à recommencer ({{cite:notice-dacia-sandero-3|p. 161}}).

Si le voyant moteur s'allume avec celui du FAP, c'est sa consigne, plus prudente, qui compte : {{verdict:moteur-orange-fixe}} pour le voyant moteur orange fixe ; {{verdict:moteur-rouge}} pour le voyant moteur rouge, ou le témoin STOP avec le message « Risque casse moteur ». L'encadré donne ces deux lignes, et la page du [voyant moteur](/voyants/moteur/) les détaille.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

Les quatre premières décrivent un témoin du filtre à particules ; la Toyota Yaris lue ici, à moteur essence, signale son filtre par un message (voir plus bas). Pour une autre marque, Audi, BMW ou Volkswagen par exemple, cherchez « filtre à particules » dans la notice de votre voiture.

## À quoi sert le filtre à particules, et pourquoi son voyant s'allume

Le filtre à particules, ou FAP, retient la suie des gaz d'échappement. Pour ne pas se boucher, il doit régulièrement brûler cette suie : c'est la régénération. La notice Seat Ibiza explique qu'il faut pour cela un moteur à sa température de fonctionnement et une vitesse soutenue, qui augmente la température et brûle la suie ({{cite:notice-seat-ibiza|p. 289, « Régénération du filtre à particules essence et diesel »}}). Selon la notice Toyota Yaris, la suie s'accumule plus vite si l'on roule souvent sur des trajets courts ou à basse vitesse, ou si le moteur démarre souvent par grand froid ({{cite:notice-toyota-yaris|p. 204}}).

Le témoin s'allume quand le filtre commence à saturer : selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, il indique un début de saturation et la nécessité d'une intervention du conducteur pour nettoyer le filtre.

## Comment régénérer le filtre en roulant

Chaque notice donne sa façon de faire ; le tableau plus bas cite chacune à la page près :

- **Peugeot 208** : rouler à au moins 60 km/h jusqu'à l'extinction du témoin, dès que les conditions de circulation le permettent ;
- **Renault Clio 5 phase 2 et Dacia Sandero 3** (versions Diesel) : continuer à rouler selon la circulation et les limitations de vitesse, si possible sans laisser le régime descendre sous 2 000 tours par minute ; le témoin doit s'éteindre au bout de 10 à 20 minutes environ ;
- **Seat Ibiza** : moteur chaud, rouler entre 50 et 120 km/h, en respectant les limitations et les rapports conseillés, et ne terminer la régénération qu'après l'extinction du témoin.

Pour faciliter la régénération, la notice Dacia conseille un long trajet sur des axes routiers ({{cite:notice-dacia-sandero-3|p. 161}}), la notice Toyota de rouler sur de longues distances, comme sur voie rapide ou autoroute ({{cite:notice-toyota-yaris|p. 204}}). Si la circulation ne le permet pas tout de suite, l'encadré demande de le faire dès qu'elle le permet, sans couper le moteur.

## Le voyant ne s'éteint pas, ou d'autres voyants s'allument

- Selon la notice Seat Ibiza, si le témoin reste allumé après 30 minutes de conduite en régénération, il faut contacter un atelier spécialisé pour faire réparer le défaut ({{cite:notice-seat-ibiza|p. 290}}).
- Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, quand le filtre est saturé, d'autres témoins s'allument avec le message « Injection à contrôler » : elles demandent alors de consulter le réseau de la marque. Avec le témoin STOP et le message « Risque casse moteur », elles demandent d'arrêter la voiture, de couper le moteur et de faire appel au réseau de la marque ({{cite:notice-renault-clio-5|p. 187}}, {{cite:notice-dacia-sandero-3|p. 161}}).

Verdicts retenus en haut de page : {{verdict:fap}} pour le témoin du FAP seul ; {{verdict:moteur-orange-fixe}} si le voyant moteur orange s'y ajoute ; {{verdict:moteur-rouge}} pour le voyant moteur rouge ou « Risque casse moteur ».

## Voyant FAP et additif : comment l'éteindre ?

Certains moteurs Diesel ont un réservoir d'additif pour le filtre à particules. La notice Peugeot 208 décrit le même témoin, accompagné d'un signal sonore et d'un message sur le niveau insuffisant de l'additif : le réservoir d'additif est au minimum, et elle demande de faire réaliser l'appoint rapidement, dans le réseau Peugeot ou dans un atelier qualifié ({{cite:notice-peugeot-208|p. 15}}, renvoi (3) de la p. 13).

Dans ce cas, le geste à faire est l'appoint d'additif, pas la régénération ; la consigne de l'encadré reste celle du voyant : {{verdict:fap}}. Ne cherchez pas à effacer le témoin sans traiter sa cause. Pour une Peugeot 308 ou une autre voiture que la 208 lue ici, c'est la notice de votre véhicule qui dit s'il a un additif et où se fait l'appoint.

## Un filtre à particules sur un moteur essence ?

Oui, sur certaines voitures. La notice Seat Ibiza décrit la régénération du filtre à particules « essence et diesel ». Les notices Renault Clio 5 phase 2 et Dacia Sandero 3 ont aussi un témoin du filtre à particules pour leurs versions essence : elles demandent de rouler dès que possible entre 50 et 110 km/h environ, dans le respect des limitations, jusqu'à son extinction ; selon la notice Dacia, il doit s'éteindre au bout de 5 à 20 minutes environ ({{cite:notice-renault-clio-5|p. 188}}, {{cite:notice-dacia-sandero-3|p. 162}}).

La notice Toyota Yaris, à moteur essence, décrit un filtre qui se régénère de lui-même et le signale plein par un message, « Filtre d'échappement plein », sans témoin propre : la puissance du moteur est alors limitée, mais la conduite reste possible tant que le témoin de dysfonctionnement ne s'allume pas. Si ce témoin s'allume, ou si le message « Entretien du moteur requis » s'affiche, elle demande de faire vérifier la voiture immédiatement ({{cite:notice-toyota-yaris|p. 204}}). La consigne du voyant moteur est sur sa page.

## Voyant FAP allumé au contrôle technique

Le texte du contrôle technique, l'annexe I de l'arrêté du 18 juin 1991, ne nomme ni le filtre à particules ni son témoin. Pour un moteur Diesel, il contrôle l'équipement de réduction des émissions monté par le constructeur : manifestement absent, modifié ou défectueux, c'est une défaillance majeure ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 8.2.21}}). Il contrôle aussi le relevé du système OBD : une anomalie du dispositif antipollution sans dysfonctionnement important est une défaillance mineure, un dysfonctionnement important une défaillance majeure ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 8.2.22}}). Les mêmes règles valent pour un moteur essence (points 8.2.11 et 8.2.12).

Une défaillance majeure impose une contre-visite dans les deux mois ({{cite:arrete-1991-06-18-controle-technique|article 7}}). Le texte ne dit pas si le seul témoin du FAP allumé suffit à constater une défaillance : le plus sûr est de régénérer le filtre, ou de le faire réparer, avant le rendez-vous. La consigne de l'encadré ne change pas : {{verdict:fap}}.

## FAP bouché : régénération, nettoyage ou remplacement

Un filtre qui commence à se boucher se signale d'abord par son témoin, et la régénération en roulant doit l'éteindre : c'est la première tranche du coût probable. Les notices lues ne décrivent pas d'autre nettoyage à faire soi-même ; si le témoin ne s'éteint pas, ou si d'autres témoins s'allument, c'est au garage de trouver la cause.

Pour éviter qu'il se bouche, la notice Dacia Sandero 3 conseille, pour faciliter la régénération, un long trajet de plus de 20 minutes environ sur des axes routiers tous les 200 km ({{cite:notice-dacia-sandero-3|p. 161}}) ; la notice Toyota Yaris, de rouler régulièrement sur de longues distances, en relâchant par moments l'accélérateur, comme sur voie rapide ou autoroute ({{cite:notice-toyota-yaris|p. 204}}).
