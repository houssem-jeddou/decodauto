---
# Page « voyant direction » de la vague A (étape 8, lot 5b), rédigée le 14/11/2026 et validée par Houssem le 14/11/2026.
# Passée de exemples/ à src/content par la pull request du lot 5b (règle de passage, travaux/etape-8/regle-de-passage.md).
id: voyant-direction
title: "Voyant volant orange ou rouge : peut-on rouler, que faire ?"
h1: "Voyant de direction assistée (volant) : que faire quand il s'allume ?"
description: "Voyant volant orange : roulez prudemment et faites vérifier la direction sans attendre. Rouge, ou avec le témoin STOP : arrêtez-vous, la direction n'est plus assistée."
libelle_court: Voyant de direction assistée
question_decision: Puis-je continuer à rouler avec le voyant de direction assistée allumé ?
situations:
  - voyant: direction-orange
  - voyant: direction-rouge
voyants:
  - direction-orange
  - direction-rouge
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site) : de la réinitialisation que demandent les notices Seat Ibiza et Dacia Sandero 3 après une intervention sur la batterie, à la réparation de la direction assistée."
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
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-14
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
# Encadré de décision (question, lignes, coût probable et pièces des causes) validé par Houssem le 14/11/2026 (18 h 23),
# avec les faits du texte (paquet travaux/etape-8/paquet-lot-5b.md).
validation: db122d1908fb8d599aba7084d22c1a7af5b318b2531ec76b60d372404f31b8e6
causes:
  - cause: Batterie débranchée puis rebranchée, ou dépannée
    explication: "Selon la notice Seat Ibiza, le témoin jaune peut s'allumer quand la batterie 12 volts a été débranchée puis rebranchée : elle demande alors un bref parcours à 15-20 km/h. Selon la notice Dacia Sandero 3, il s'allume, suivant le véhicule, lors d'un dépannage de la batterie, et elle demande alors une réinitialisation de l'angle du volant, à faire soi-même."
    pieces:
      - reinitialisation-demandee-par-la-notice
  - cause: Charge de la batterie insuffisante
    explication: "Selon la notice Toyota Yaris (p. 297), une charge insuffisante de la batterie, ou une chute provisoire de sa tension, peut allumer le voyant de direction assistée."
    pieces:
      - recharge-batterie
      - batterie
  - cause: Direction assistée défaillante
    explication: "Les notices Peugeot 208, Seat Ibiza et Toyota Yaris décrivent une direction assistée défaillante, limitée ou perdue, sans nommer la pièce en cause : le diagnostic au garage le dit."
    pieces:
      - direction-assistee
format: 2
illustration:
  fichier: voyant-direction-tableau-de-bord
  alt: "Le voyant de direction assistée allumé en orange et en rouge"
  legende: "Le voyant de direction dessine un volant suivi d’un point d’exclamation. Selon la voiture et la gravité, il s’allume en orange (ou jaune) ou en rouge."
---

## Peut-on rouler avec le voyant volant orange ?

{{repere:direction-orange}}

L'assistance de direction est défaillante ou limitée : le volant peut être plus dur. La notice Peugeot 208 demande de rouler prudemment à allure modérée, puis de se rendre dans le réseau ou dans un atelier qualifié ({{cite:notice-peugeot-208|p. 17}}). Selon la notice Seat Ibiza, le témoin jaune signale un fonctionnement limité de la direction : elle demande de se rendre avec prudence dans un atelier spécialisé ({{cite:notice-seat-ibiza|p. 227}}).

La notice Toyota Yaris demande de faire vérifier immédiatement la voiture ({{cite:notice-toyota-yaris|p. 294}}). L'encadré retient la consigne la plus prudente : faire vérifier sans attendre.

## Voyant volant rouge, ou avec le témoin STOP

{{repere:direction-rouge}}

Selon la notice Toyota Yaris, en rouge, l'assistance est perdue et le volant devient très difficile à manœuvrer : tenez-le fermement et tournez-le avec plus de force que d'habitude ({{cite:notice-toyota-yaris|p. 298}}). La notice Seat Ibiza parle d'une direction endommagée et demande de stopper le véhicule dès que possible et en toute sécurité ({{cite:notice-seat-ibiza|p. 227}}).

Chez Peugeot, Renault et Dacia, c'est le témoin STOP qui s'y ajoute. Selon la notice Peugeot 208, le témoin STOP associé à un autre témoin signale notamment un dysfonctionnement grave de la direction assistée, et l'arrêt du véhicule est impératif ({{cite:notice-peugeot-208|p. 13}}). Pour Renault et Dacia, le voyant de direction allumé en roulant avec le témoin STOP indique une défaillance du système ; le message « Panne de la direction », avec le témoin STOP, impose un arrêt impératif et immédiat : arrêtez le moteur et ne le redémarrez pas ({{cite:notice-renault-clio-5|p. 125 et 138}}, {{cite:notice-dacia-sandero-3|p. 102 et 113}}).

Seule la notice Toyota n'impose pas l'arrêt pour le voyant rouge : elle demande une vérification immédiate. L'encadré retient la consigne la plus prudente, l'arrêt.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

Pour une autre marque, Volkswagen, Audi ou BMW par exemple, cherchez « direction » dans la notice de votre voiture.

## Pourquoi le voyant volant s'allume-t-il ?

À la mise du contact, il s'allume quelques secondes, puis s'éteint : c'est le contrôle normal (notices Seat Ibiza, Renault Clio 5 phase 2 et Dacia Sandero 3). En dehors de ce contrôle, les notices lues donnent trois cas :

- **une défaillance de la direction assistée** : direction défaillante (Peugeot 208), fonctionnement limité ou direction endommagée (Seat Ibiza), dysfonctionnement de la direction assistée électrique (Toyota Yaris) ;
- **une batterie trop faible** : selon la notice Toyota Yaris, une charge insuffisante de la batterie, ou une chute provisoire de sa tension, peut allumer ce voyant ({{cite:notice-toyota-yaris|p. 297}}) ; les notices Renault Clio 5 phase 2 et Dacia Sandero 3 demandent de ne jamais rouler avec une batterie faiblement chargée ({{cite:notice-renault-clio-5|p. 143}}, {{cite:notice-dacia-sandero-3|p. 115}}) ; le [voyant batterie](/voyants/batterie/) signale, lui, un défaut du circuit de charge ;
- **une batterie débranchée, rebranchée ou dépannée** : selon la notice Seat Ibiza, le témoin jaune peut s'allumer après le rebranchement de la batterie 12 volts, et il faut alors faire un bref parcours à 15-20 km/h ({{cite:notice-seat-ibiza|p. 227}}) ; selon la notice Dacia Sandero 3, il s'allume, suivant le véhicule, lors d'un dépannage de la batterie ({{cite:notice-dacia-sandero-3|p. 113}}).

Le triangle orange est un autre voyant : la [liste des voyants](/voyants/) l'explique.

## Comment éteindre le voyant de direction assistée ?

Deux notices décrivent ce qu'il faut faire après une intervention sur la batterie. Selon la notice Seat Ibiza, si le témoin jaune ne s'allume plus après avoir redémarré le moteur et fait un court trajet, une révision de la direction n'est pas nécessaire ; après le rebranchement de la batterie, elle demande un bref parcours à 15-20 km/h ({{cite:notice-seat-ibiza|p. 227}}). Selon la notice Dacia Sandero 3, suivant le véhicule, après un dépannage de la batterie (batterie débranchée ou déchargée), il faut réinitialiser l'angle du volant : voiture à l'arrêt sur un sol horizontal, conducteur seul à bord, moteur démarré, le témoin ou le message « Tourner volant max droite-gche » s'affiche ; tournez le volant à fond vers la gauche et maintenez-le environ une seconde en butée, faites de même vers la droite, puis remettez les roues droites ({{cite:notice-dacia-sandero-3|p. 115-116}}).

La notice Dacia Sandero 3 demande aussi de ne pas laisser la direction braquée à fond, en butée, à l'arrêt. La notice Renault Clio 5 phase 2 demande, elle, de ne jamais tourner le volant quand la batterie est débranchée ({{cite:notice-renault-clio-5|p. 144}}).

Pour une autre voiture, c'est la consigne de l'encadré qui s'applique. Hors de ces cas et de celui de la colonne coincée (plus bas), les notices lues ne décrivent aucune manipulation : le voyant s'éteint quand le défaut est réparé.

## Voyant volant orange qui clignote

La notice Seat Ibiza décrit un témoin jaune clignotant : la colonne de direction est coincée ; à l'arrêt, tournez le volant d'un côté et de l'autre. Ou bien la colonne ne se verrouille pas ou ne se déverrouille pas : retirez la clé du contact et remettez le contact, en tenant compte des messages du combiné.

La même notice demande de s'arrêter si la colonne reste bloquée après la mise du contact, et de faire appel à un spécialiste ({{cite:notice-seat-ibiza|p. 227}}). Les autres notices lues ne décrivent pas ce clignotement : pour une autre voiture, c'est sa notice qui fait foi, et à défaut la consigne de l'encadré.

## Voyant de direction assistée au contrôle technique

L'annexe I de l'arrêté du 18 juin 1991 classe en défaillance majeure la direction assistée électronique dont l'indicateur de dysfonctionnement fait état d'une défaillance du système, ainsi que l'assistance qui ne fonctionne pas ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 2.6.1}}). Une défaillance majeure impose une contre-visite dans les deux mois ({{cite:arrete-1991-06-18-controle-technique|article 7}}). La consigne de l'encadré ne change pas.

Voyant orange : {{verdict:direction-orange}}. Voyant rouge, ou avec le témoin STOP : {{verdict:direction-rouge}}.
