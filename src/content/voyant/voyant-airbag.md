---
# Page « voyant airbag » de la vague A (étape 8, lot 5a), rédigée le 14/11/2026 et validée par Houssem le 14/11/2026.
# Passée de exemples/ à src/content par la pull request du lot 5a (règle de passage, travaux/etape-8/regle-de-passage.md).
id: voyant-airbag
title: "Voyant airbag allumé : peut-on rouler, que faire ?"
h1: "Voyant airbag allumé ou « airbag OFF » : que faire ?"
description: "Voyant airbag allumé : vous pouvez rouler, mais faites contrôler les airbags sans attendre et ne mettez pas de siège enfant à l'avant. Témoin OFF, contrôle technique, notices."
libelle_court: Voyant airbag
question_decision: Puis-je continuer à rouler avec le voyant airbag allumé ?
situations:
  - voyant: airbag-defaut
  - voyant: airbag-passager-desactive
voyants:
  - airbag-defaut
  - airbag-passager-desactive
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site) : de l'airbag passager désactivé volontairement, sans dépense, à la réparation du système d'airbag au garage."
  sources:
    - notice-peugeot-208
    - notice-seat-ibiza
    - notice-toyota-yaris
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
  - arrete-1991-06-18-controle-technique
  - reglement-onu-121
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-14
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
# Encadré de décision (question, lignes, coût probable et pièces des causes) validé par Houssem le 14/11/2026 (18 h 23),
# avec les faits du texte (paquet travaux/etape-8/paquet-lot-5a.md).
validation: f3f89321da4743757f1481de5a7b5a75aab5823527e4ce0ecdfe40de35ded7cb
causes:
  - cause: Airbag ou prétensionneur de ceinture défaillant
    explication: "Selon les notices Peugeot 208 et Toyota Yaris, le voyant signale qu'un des airbags ou des prétensionneurs de ceinture de sécurité est défaillant ; la notice Seat Ibiza parle d'un dysfonctionnement du système d'airbag et de rétracteurs de ceintures. Le diagnostic au garage dit quelle pièce est en cause."
    pieces:
      - module-d-airbag
  - cause: Airbag passager désactivé avec sa commande
    explication: "Le témoin « airbag passager OFF » reste allumé quand l'airbag frontal du passager a été désactivé avec sa commande, pour installer un siège enfant dos à la route (notices Peugeot 208, Renault Clio 5 phase 2, Dacia Sandero 3, Seat Ibiza et Toyota Yaris)."
    pieces:
      - systeme-desactive
format: 2
illustration:
  fichier: voyant-airbag-tableau-de-bord
  alt: "Le voyant airbag et le témoin « airbag passager OFF » allumés au tableau de bord"
  legende: "Le voyant airbag, un passager assis devant son coussin, signale un défaut des airbags ou des prétensionneurs. Le témoin barré « OFF » confirme que l’airbag du passager avant est désactivé."
---

## Peut-on rouler avec le voyant airbag allumé ?

{{repere:airbag-defaut}}

Aucune des notices lues n'impose l'arrêt pour ce voyant, mais toutes demandent de faire contrôler le système : « immédiatement » pour Seat et Toyota, « au plus tôt » pour Renault, « rapidement » pour Dacia (« au plus tôt » avec le message « Airbag à contrôler »), dans le réseau ou un atelier qualifié pour Peugeot. L'encadré retient la consigne la plus prudente : sans attendre.

La notice Seat Ibiza explique pourquoi : avec un défaut du système, les airbags et les rétracteurs de ceintures peuvent se déclencher difficilement, ne pas se déclencher du tout, ou même se déclencher de manière inattendue ({{cite:notice-seat-ibiza|p. 27}}). Elle demande aussi de ne pas monter de siège pour enfant sur le siège du passager avant, ou de le retirer : en cas d'accident, l'airbag frontal du passager risquerait de se déclencher malgré le défaut.

Si c'est le témoin « airbag passager OFF » qui est allumé, le verdict est différent : {{verdict:airbag-passager-desactive}}. C'est normal si un siège enfant dos à la route est installé à l'avant ; sinon, réactivez l'airbag (voir plus bas).

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

## Que signifie le voyant airbag ?

Il signale un défaut des systèmes de retenue : les airbags, ou les prétensionneurs qui tendent les ceintures de sécurité lors d'un choc. Les notices Peugeot 208 et Toyota Yaris citent les deux ; les notices Renault et Dacia parlent d'une défaillance du système, et y ajoutent un message, « Airbag à contrôler » ({{cite:notice-renault-clio-5|p. 124}}, {{cite:notice-dacia-sandero-3|p. 101}}).

Le voyant s'allume quelques secondes à la mise du contact, puis s'éteint : c'est le contrôle normal. Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, il signale une défaillance s'il ne s'allume pas à la mise sous contact, s'il s'allume moteur allumé, ou, pour Dacia, s'il clignote ({{cite:notice-renault-clio-5|p. 137}}, {{cite:notice-dacia-sandero-3|p. 111}}). La notice Seat dit la même chose du témoin qui reste allumé ou clignote ({{cite:notice-seat-ibiza|p. 27}}).

La notice Peugeot 208 le range parmi les témoins de couleur orange ({{cite:notice-peugeot-208|p. 14 et 17}}), la notice Seat Ibiza parmi les témoins jaunes ({{cite:notice-seat-ibiza|p. 93-94}}) ; le règlement ONU n° 121, qui fixe la couleur de certains voyants, admet pour celui-ci le jaune ou le rouge ({{cite:reglement-onu-121|tableau, n° 22}}). Quelle que soit sa couleur sur votre voiture, la consigne est la même : {{verdict:airbag-defaut}}.

## Comment éteindre le voyant airbag ?

On ne l'éteint pas soi-même : il s'éteint quand le défaut est réparé. Seule exception décrite : dans la notice Renault Clio 5 phase 2, si la commande de l'airbag passager a été tournée en roulant, les témoins airbag et Service s'allument ; pour retrouver l'état de l'airbag conforme à la position du verrou, il faut couper le contact puis le remettre ({{cite:notice-renault-clio-5|p. 106}}).

Pour le reste, les notices lues ne décrivent aucune manipulation pour l'éteindre ; elles demandent toutes de faire contrôler le système, et un voyant qui ne s'allume plus à la mise du contact est lui-même, pour Renault et Dacia, le signe d'une défaillance. Effacer le défaut sans le réparer laisserait des airbags qui risquent de ne pas se déclencher en cas de choc, sans plus rien qui le signale.

Connecteur sous un siège, contacteur tournant du volant : les notices lues ne nomment pas ces pièces ; les notices Peugeot 208 et Toyota Yaris citent les prétensionneurs de ceinture parmi les causes possibles. Seul le diagnostic au garage dit d'où vient le défaut sur votre voiture. La notice Renault Clio 5 phase 2 interdit toute intervention ou modification sur le système complet (airbags, prétensionneurs, boîtier électronique, câblage), sauf par le personnel qualifié du réseau de la marque, pour préserver son bon fonctionnement et éviter tout déclenchement intempestif ({{cite:notice-renault-clio-5|p. 81}}) : ce n'est pas une réparation à faire soi-même.

## Témoin « airbag passager OFF » : quand est-ce normal ?

{{repere:airbag-passager-desactive}}

Ce témoin dit que l'airbag frontal du passager avant est désactivé. C'est voulu quand un siège enfant dos à la route est installé sur le siège passager avant. Sinon, l'airbag ne se déclencherait pas en cas de choc : la notice Toyota Yaris demande alors de le remettre en position « ON » ({{cite:notice-toyota-yaris|p. 37}}), et la notice Seat de vérifier s'il doit rester désactivé ({{cite:notice-seat-ibiza|p. 26}}).

- **Désactiver ou réactiver** : selon les notices Renault Clio 5 phase 2 (désactivation et réactivation) et Dacia Sandero 3 (désactivation), véhicule à l'arrêt et contact coupé, avec la commande prévue (le verrou) ; après une désactivation, vérifiez à la mise sous contact que le témoin est bien allumé : il reste allumé tant que l'airbag est désactivé ({{cite:notice-renault-clio-5|p. 106-107}}, {{cite:notice-dacia-sandero-3|p. 84}}).
- **Siège enfant dos à la route** : la notice Peugeot 208 l'autorise quand l'airbag passager est désactivé, sauf si le voyant airbag de défaut est allumé ; quand l'airbag passager est activé (témoin ON), elle l'interdit, à cause du risque de blessures graves ({{cite:notice-peugeot-208|p. 17-18}}).

## Voyant airbag allumé au contrôle technique

Au contrôle technique, l'annexe I de l'arrêté du 18 juin 1991 classe en défaillance majeure le système de retenue supplémentaire dont l'indicateur de dysfonctionnement fait état d'une défaillance ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 7.1.6}}). Pour les airbags eux-mêmes, le point 7.1.5 classe en défaillance majeure le système qui signale une défaillance via l'interface électronique du véhicule, et en défaillance mineure une mauvaise configuration du système de désactivation de l'airbag passager ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 7.1.5}}). Une défaillance majeure impose une contre-visite dans les deux mois ({{cite:arrete-1991-06-18-controle-technique|article 7}}).

Faire réparer le défaut avant le rendez-vous évite une contre-visite pour ce point ; la consigne de l'encadré ne change pas : {{verdict:airbag-defaut}}.
