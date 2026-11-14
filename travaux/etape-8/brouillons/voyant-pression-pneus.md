---
# Brouillon de la page « voyant pression des pneus » (étape 8, lot 3), rédigé le 14/11/2026 sur le modèle de page
# voyant. Il reste ici, hors d'exemples/ et de src/content, jusqu'à la validation de Houssem (tests/porte6.test.ts exige
# l'empreinte de toute page rédigée) : ensuite exemples/voyant/voyant-pression-pneus.md avec son empreinte, puis passage.
# Les lignes de l'encadré viennent de la base voyants validée.
id: voyant-pression-pneus
title: "Voyant pression pneu allumé : peut-on rouler, que faire ?"
h1: "Voyant de pression des pneus : que faire quand il s'allume ?"
description: "Voyant de pression des pneus allumé : ralentissez et arrêtez-vous immédiatement, dès que c'est sans danger, pour contrôler les pneus. Puis regonflez et réinitialisez, notice par notice."
libelle_court: Voyant pression des pneus
question_decision: Puis-je continuer à rouler avec le voyant de pression des pneus allumé ?
situations:
  - voyant: pression-pneus
  - voyant: pression-pneus-systeme
voyants:
  - pression-pneus
  - pression-pneus-systeme
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce ou l'opération la plus lourde qu'elle peut toucher (liste des pièces du site) : du regonflage, que vous faites vous-même, à la réparation du système de surveillance au garage."
  sources:
    - notice-dacia-sandero-3
    - notice-peugeot-208
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
  - cause: Pneu sous-gonflé
    explication: "La pression d'un ou plusieurs pneus a baissé. Les notices Peugeot 208 et Dacia Sandero 3 demandent de contrôler et d'ajuster à froid la pression des quatre pneus, puis de réinitialiser le système."
    pieces:
      - regonflage
  - cause: Pneu crevé ou endommagé
    explication: "Selon les notices Dacia Sandero 3 et Peugeot 208, un pneu crevé se remplace ou se répare, avec le kit de dépannage provisoire ou la roue de secours selon l'équipement ; la perte de pression ne se voit pas toujours sur le pneu."
    pieces:
      - pneus
  - cause: Système de surveillance en défaut
    explication: "Quand le voyant clignote puis reste allumé, la surveillance n'est plus assurée : selon la notice Dacia Sandero 3, une roue sans capteur (roue de secours) ou un capteur défaillant ; selon la notice Peugeot 208, un dysfonctionnement à faire vérifier dans le réseau de la marque ou un atelier qualifié."
    pieces:
      - capteur-de-pression-des-pneus
---

## Peut-on rouler avec le voyant de pression des pneus allumé ?

Ce voyant est orange, mais la consigne retenue est celle de l'arrêt : {{verdict:pression-pneus}}. Plusieurs notices demandent de s'arrêter dès que possible pour contrôler les pneus : selon la notice Seat Ibiza, des pneus trop peu gonflés peuvent faire perdre le contrôle de la voiture. L'encadré signale l'écart entre marques. S'il clignote d'abord, puis reste allumé, c'est le système de surveillance qui est en défaut : {{verdict:pression-pneus-systeme}}.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

La notice de la Clio 5 phase 2 ne vaut pas pour une Clio 4, ni celle de la Seat Ibiza pour une Volkswagen ou une Audi : leur manipulation de réinitialisation peut être différente.

## Que faire quand le voyant s'allume en roulant

La notice Peugeot 208 donne la marche à suivre la plus détaillée ({{cite:notice-peugeot-208|p. 110, « Alerte de sous-gonflage »}}) : réduire immédiatement la vitesse, éviter les coups de volant et les freinages brusques, s'arrêter dès que la circulation le permet, puis contrôler à froid la pression des quatre pneus, par exemple avec le compresseur du kit de dépannage. Elle prévient qu'une perte de pression ne déforme pas toujours le pneu de façon visible : un coup d'œil ne suffit pas. Si le contrôle n'est pas possible tout de suite, elle demande de rouler prudemment, à vitesse réduite ; en cas de crevaison, d'utiliser le kit ou la roue de secours.

La notice Seat Ibiza demande aussi de réduire immédiatement la vitesse, d'éviter les virages et freinages brusques, de s'arrêter le plus rapidement possible et de contrôler la pression et l'état de tous les pneus. Elle prévient que des pneus trop peu gonflés peuvent s'endommager et faire perdre le contrôle de la voiture ({{cite:notice-seat-ibiza|p. 312}}).

Dans les notices Renault Clio 5 phase 2 et Dacia Sandero 3, le message « Crevaison », affiché avec le témoin STOP, impose un arrêt impératif et immédiat ; la notice Dacia demande, pour le message « Pression pneus à réajuster », de vérifier et d'ajuster la pression à froid des quatre pneus, puis de réinitialiser le système ({{cite:notice-dacia-sandero-3|p. 177}}).

Verdict retenu en haut de page : {{verdict:pression-pneus}}.

## Regonfler, puis réinitialiser : la manipulation de chaque notice

Une fois les pneus regonflés à la pression du constructeur, pneus froids, le système doit en général être réinitialisé : sinon, il garde ses anciennes valeurs de référence, comme l'explique la notice Peugeot 208. La bonne pression et où la lire sont sur la page [pression des pneus](/pression-des-pneus/).

- **Peugeot 208** : réinitialiser après chaque ajustement de la pression d'un pneu et après chaque changement de roue, voiture à l'arrêt, par le menu Conduite / Véhicule de l'écran tactile. La notice demande de vérifier d'abord la pression des quatre pneus : le système ne prévient pas si elle est fausse au moment de la réinitialisation ({{cite:notice-peugeot-208|p. 111}}).
- **Renault Clio 5 phase 2 et Dacia Sandero 3** : réinitialiser après chaque regonflage, changement ou permutation de roue, toujours après avoir vérifié à froid la pression des quatre pneus. Contact mis et voiture à l'arrêt, la réinitialisation se lance par les commandes au volant ou par l'écran multimédia ; la notice Renault détaille la manipulation au volant : page « Pression pneus init. », puis appui long sur « OK » jusqu'au message « Opération terminée » ({{cite:notice-renault-clio-5|p. 207-208}} ; {{cite:notice-dacia-sandero-3|p. 179-180}}).
- **Seat Ibiza** : après une modification de la pression ou un changement de roue, le système doit être de nouveau calibré : mémoriser la nouvelle pression dans le système d'infodivertissement, ou, sans ce système, appuyer sur la touche du système jusqu'au signal sonore ({{cite:notice-seat-ibiza|p. 312}}).
- **Toyota Yaris** : le système, à capteurs, s'initialise dans des cas précis, par exemple une permutation de pneus avant et arrière de pressions différentes, un changement de dimension des pneus, ou une pression changée pour une vitesse ou une charge différente. Voiture garée et moteur coupé depuis au moins 15 minutes, pression réglée à froid, contacteur sur ON : par le menu des réglages du véhicule, réglage du système de surveillance ; l'initialisation est impossible en roulant ({{cite:notice-toyota-yaris|p. 261-262}}).

## Le voyant reste allumé alors que la pression est bonne

Selon la notice Peugeot 208, l'alerte reste affichée jusqu'à la réinitialisation du système ({{cite:notice-peugeot-208|p. 111}}) : regonfler ne suffit pas, il faut ensuite réinitialiser. La notice Renault Clio 5 phase 2 cite aussi les cas où le système peut réagir en retard ou mal fonctionner : système non réinitialisé après un regonflage, réinitialisé avec des pressions différentes de celles recommandées, charge très changée, conduite sportive, route enneigée ou glissante, chaînes, un seul pneu neuf, pneus non homologués ({{cite:notice-renault-clio-5|p. 207}}).

Si le voyant se rallume après une réinitialisation faite pneus froids et à la bonne pression, un pneu perd peut-être de l'air : la consigne de l'encadré s'applique de nouveau.

## Le voyant clignote, puis reste allumé

Verdict retenu en haut de page : {{verdict:pression-pneus-systeme}}. Le système de surveillance est en défaut et ne vous préviendra plus d'un sous-gonflage. La notice Peugeot 208 demande de faire vérifier le système dans le réseau de la marque ou un atelier qualifié ; une roue de secours de type « galette », ou de taille différente, peut aussi suspendre la surveillance jusqu'à ce qu'elle soit remplacée ({{cite:notice-peugeot-208|p. 111}}). Selon la notice Dacia Sandero 3, une roue sans capteur ou un capteur défaillant affiche « Capteurs pneus à contrôler » ({{cite:notice-dacia-sandero-3|p. 177}}). En attendant, vérifiez vous-même la pression des quatre pneus.

## Combien de temps peut-on rouler avec ce voyant ?

Les notices lues ne donnent aucune distance. Elles donnent une consigne à la place : ralentir et s'arrêter dès que possible pour contrôler les pneus. Deux notices prévoient ensuite de rouler doucement : la notice Peugeot 208, prudemment et à vitesse réduite quand le contrôle ne peut pas se faire tout de suite (p. 110) ; la notice Seat Ibiza, jusqu'à l'atelier spécialisé le plus proche, à faible vitesse, si le pneu n'est pas crevé et ne doit pas être remplacé tout de suite (p. 312). Verdict retenu en haut de page : {{verdict:pression-pneus}}.

## Comment le système détecte un pneu dégonflé

Les notices décrivent deux systèmes. Chez Peugeot, Seat et Dacia (avertisseur sans capteurs), le système compare la vitesse des roues, mesurée par leurs capteurs, à des valeurs de référence ({{cite:notice-peugeot-208|p. 110-111}} ; {{cite:notice-seat-ibiza|p. 311}} ; {{cite:notice-dacia-sandero-3|p. 178}}). Il ne mesure donc pas la pression elle-même : d'où la réinitialisation après chaque regonflage, et une alerte qui peut tarder, par exemple sous 40 km/h selon la notice Peugeot. D'autres voitures ont un capteur de pression dans chaque roue : la notice Dacia décrit aussi ce système ({{cite:notice-dacia-sandero-3|p. 177}}), et la notice Toyota parle des émetteurs de pression montés avec les valves ({{cite:notice-toyota-yaris|p. 261}}).

## Voyant de pression des pneus et contrôle technique

Au contrôle technique, un système de contrôle de la pression qui fonctionne mal, ou un pneu manifestement sous-gonflé, est une défaillance mineure ; un système manifestement inopérant, une défaillance majeure, qui impose une contre-visite dans les deux mois ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 5.2.3, et article 7}}).
