---
# Page « voyant de pression des pneus » de la vague A (étape 8, lot 3), rédigée le 14/11/2026 et validée par Houssem le 14/11/2026.
# Passée de exemples/ à src/content par la pull request du lot 3 (règle de passage, travaux/etape-8/regle-de-passage.md).
# Les lignes de l'encadré viennent de la base voyants validée (ligne pression-pneus : demande de changement n° 22).
id: voyant-pression-pneus
title: "Voyant pression pneu allumé : peut-on rouler, que faire ?"
h1: "Voyant de pression des pneus : que faire quand il s'allume ?"
description: "Voyant de pression des pneus allumé : arrêtez-vous immédiatement, dès que c'est sans danger, pour contrôler les pneus. Puis regonflez et réinitialisez."
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
date_modification: 2026-11-21
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
# Encadré de décision (question, lignes, coût probable et pièces des causes) validé par Houssem le 14/11/2026 (13 h 08),
# avec les faits du texte (paquet travaux/etape-8/paquet-lot-3.md).
validation: e039e6de8ba2c1613145afbb1b8878aa01e590821752fe3d6ba264f8adc0c1a8
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
format: 2
illustration:
  fichier: voyant-pression-pneus-tableau-de-bord
  alt: "Le voyant de pression des pneus allumé en orange au tableau de bord"
  legende: "Le voyant de pression des pneus dessine un fer à cheval avec un point d’exclamation. Fixe : un pneu sous-gonflé, voire crevé. Clignotant puis fixe : le système de surveillance est en défaut."
---

## Peut-on rouler avec le voyant de pression des pneus allumé ?

{{repere:pression-pneus}}

Ce voyant est orange, mais la consigne de l'encadré est celle de l'arrêt. Plusieurs notices demandent de s'arrêter dès que possible pour contrôler les pneus : selon la notice Seat Ibiza, des pneus trop peu gonflés peuvent faire perdre le contrôle de la voiture.

L'encadré signale l'écart entre marques. Si le voyant clignote d'abord, puis reste allumé, c'est le système de surveillance qui est en défaut : {{verdict:pression-pneus-systeme}}.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

La notice de la Clio 5 phase 2 ne vaut pas pour une Clio 4, ni celle de la Seat Ibiza pour une Volkswagen ou une Audi : leur manipulation de réinitialisation peut être différente.

## Que faire quand le voyant s'allume en roulant

{{repere:pression-pneus}}

La notice Peugeot 208 donne la marche à suivre la plus détaillée ({{cite:notice-peugeot-208|p. 110, « Alerte de sous-gonflage »}}) : réduire immédiatement la vitesse, éviter les coups de volant et les freinages brusques, s'arrêter dès que la circulation le permet, puis contrôler à froid la pression des quatre pneus, par exemple avec le compresseur du kit de dépannage. Elle prévient qu'une perte de pression ne déforme pas toujours le pneu de façon visible : un coup d'œil ne suffit pas. Si le contrôle n'est pas possible tout de suite, elle demande de rouler prudemment, à vitesse réduite ; en cas de crevaison, d'utiliser le kit ou la roue de secours.

La notice Seat Ibiza demande aussi de réduire immédiatement la vitesse, d'éviter les virages et freinages brusques, de s'arrêter le plus rapidement possible et de contrôler la pression et l'état de tous les pneus. Elle prévient que des pneus trop peu gonflés peuvent s'endommager et faire perdre le contrôle de la voiture ({{cite:notice-seat-ibiza|p. 312}}).

Dans les notices Renault Clio 5 phase 2 et Dacia Sandero 3, le message « Crevaison », affiché avec le témoin STOP, impose un arrêt impératif et immédiat ; la notice Dacia demande, pour le message « Pression pneus à réajuster », de vérifier et d'ajuster la pression à froid des quatre pneus, puis de réinitialiser le système ({{cite:notice-dacia-sandero-3|p. 177}}).

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

{{repere:pression-pneus-systeme}}

Le système de surveillance est en défaut et ne vous préviendra plus d'un sous-gonflage. La notice Peugeot 208 demande de faire vérifier le système dans le réseau de la marque ou un atelier qualifié ; une roue de secours de type « galette », ou de taille différente, peut aussi suspendre la surveillance jusqu'à ce qu'elle soit remplacée ({{cite:notice-peugeot-208|p. 111}}).

Selon la notice Dacia Sandero 3, une roue sans capteur ou un capteur défaillant affiche « Capteurs pneus à contrôler » ({{cite:notice-dacia-sandero-3|p. 177}}). En attendant, vérifiez vous-même la pression des quatre pneus.

## Combien de temps peut-on rouler avec ce voyant ?

{{repere:pression-pneus}}

Les notices lues ne donnent aucune distance. Elles donnent une consigne à la place : ralentir et s'arrêter dès que possible pour contrôler les pneus. Deux notices prévoient ensuite de rouler doucement : la notice Peugeot 208, prudemment et à vitesse réduite quand le contrôle ne peut pas se faire tout de suite ({{cite:notice-peugeot-208|p. 110}}) ; la notice Seat Ibiza, jusqu'à l'atelier spécialisé le plus proche, à faible vitesse, si le pneu n'est pas crevé et ne doit pas être remplacé tout de suite ({{cite:notice-seat-ibiza|p. 312}}).

## Comment le système détecte un pneu dégonflé

Les notices décrivent deux systèmes. Chez Peugeot, Seat et Dacia (avertisseur sans capteurs), le système compare la vitesse des roues, mesurée par leurs capteurs, à des valeurs de référence ({{cite:notice-peugeot-208|p. 110-111}} ; {{cite:notice-seat-ibiza|p. 311}} ; {{cite:notice-dacia-sandero-3|p. 178}}).

Ce système ne mesure donc pas la pression elle-même : d'où la réinitialisation après chaque regonflage, et une alerte qui peut tarder, par exemple sous 40 km/h selon la notice Peugeot. D'autres voitures ont un capteur de pression dans chaque roue : la notice Dacia décrit aussi ce système ({{cite:notice-dacia-sandero-3|p. 177}}), et la notice Toyota parle des émetteurs de pression montés avec les valves ({{cite:notice-toyota-yaris|p. 261}}).

## Voyant de pression des pneus et contrôle technique

Au contrôle technique, un système de contrôle de la pression qui fonctionne mal, ou un pneu manifestement sous-gonflé, est une défaillance mineure ; un système manifestement inopérant, une défaillance majeure, qui impose une contre-visite dans les deux mois ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 5.2.3, et article 7}}).
