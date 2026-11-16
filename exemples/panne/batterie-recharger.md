---
# BROUILLON, jamais validé. Étape 10, lot B2 (rédaction ouverte par la validation de la porte 10 le 16/11/2026,
# 19 h 26). Page de la vague B au format tutoriel, sans empreinte tant que Houssem n'a pas validé son encadré.
# - Extraits et pages citées relus mot pour mot le 16/11/2026 (pdf.js dans Chrome) :
#   travaux/etape-10/textes/batterie-b2-verification.md et les relevés de l'exemple « voiture ne démarre pas ».
#   Ligne 2 reprise mot pour mot de l'exemple validé ; ligne 3 identique à la ligne 4 de « batterie-voiture ».
# - Illustration dessinée pour le site : batterie-chargeur (travaux/etape-10/generer-illustrations.py).
id: batterie-recharger
title: "Recharger une batterie de voiture : chargeur, câbles, étapes"
h1: "Recharger la batterie de sa voiture : comment faire, et quand rouler ?"
description: "Recharger une batterie de voiture avec un chargeur de 12 volts, sans la débrancher, ou démarrer avec une autre voiture : les étapes des notices, et ce qu'il ne faut jamais faire."
libelle_court: Recharger la batterie
question_decision: "Comment recharger la batterie de ma voiture, et puis-je rouler ensuite ?"
situations:
  - situation: "La batterie est déchargée et vous voulez la recharger avec un chargeur"
    verdict: oui avec précautions
    urgence: sous quelques jours
    action: "Utilisez un chargeur prévu pour une batterie au plomb de 12 volts, dans un endroit aéré, en suivant votre notice, ou faites-la recharger par un garage. La notice Seat Ibiza réserve la recharge à un atelier spécialisé."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 188, « Recharger la batterie avec un chargeur de batterie »"
        extrait: "Dans certains cas, il peut être nécessaire de charger la batterie : – Utilisation du véhicule essentiellement pour des trajets courts. – En prévision d'une immobilisation prolongée de plusieurs semaines. Consulter le réseau PEUGEOT ou un atelier qualifié. Pour recharger soi-même la batterie du véhicule, utiliser uniquement un chargeur compatible avec les batteries au plomb, d'une tension nominale de 12 V."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-renault-clio-5
        emplacement: "p. 363, « Branchement d'un chargeur »"
        extrait: "Le chargeur doit être compatible avec une batterie de tension nominale de 12 volts. […] Certaines batteries peuvent présenter des spécificités en terme de recharge, prenez conseil auprès de votre Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-seat-ibiza
        emplacement: "p. 303, « Recharge de la batterie du véhicule »"
        extrait: "La recharge de la batterie du véhicule doit être effectuée par un atelier spécialisé ; en effet, les batteries utilisées sont dotées d'une technologie particulière qui nécessite une limitation de la tension de charge."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - situation: "Le moteur a démarré grâce à une autre batterie (câbles ou booster)"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Avant de rouler, laissez tourner le moteur, voiture à l'arrêt, au moins 30 minutes pour recharger la batterie. Faites ensuite vérifier la voiture et la batterie dès que possible par un garage, qui remplacera la batterie si nécessaire."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 188, démarrage à partir d'une autre batterie"
        extrait: "Laisser tourner le moteur, à l'arrêt, au minimum 30 minutes afin de permettre à la batterie d'atteindre un niveau de charge suffisant. Rouler immédiatement sans avoir atteint un niveau de charge suffisant peut altérer certaines fonctionnalités du véhicule."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 137, démarrage à partir d'une autre batterie"
        extrait: "Laisser tourner le moteur, à l'arrêt, au minimum 30 minutes afin de permettre à la batterie d'atteindre un niveau de charge suffisant. Rouler immédiatement sans avoir atteint un niveau de charge suffisant peut altérer certaines fonctionnalités du véhicule."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-toyota-yaris
        emplacement: "p. 320, 7.2.10 « Si la batterie du véhicule est déchargée »"
        extrait: "Une fois que le moteur démarre, faites vérifier le véhicule dès que possible par un concessionnaire ou réparateur Toyota agréé, ou par tout autre réparateur qualifié."
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "La batterie a gelé (une batterie déchargée peut geler vers 0 °C)"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Ne la rechargez pas et ne démarrez pas avec des câbles : risque d'explosion. Faites appel à un garage ou à l'assistance, qui la contrôlera ou la remplacera."
    ecart_marques: "La notice Seat Ibiza interdit de démarrer avec des câbles et demande de remplacer toute batterie qui a gelé ; les notices Peugeot 208 et Citroën C3 interdisent la recharge et demandent de la faire contrôler."
    ecart_court: "Plus strict : Seat (remplacer la batterie, jamais de câbles). Moins stricts : Peugeot et Citroën (la faire contrôler)."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 57, « Aide au démarrage »"
        extrait: "N'effectuez jamais un démarrage avec des câbles si l'une des batteries est gelée – risque d'explosion !"
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 302, « Batterie de 12 volts », avertissement"
        extrait: "Ne rechargez jamais une batterie gelée ou récemment dégelée – risque d'explosion et de blessures ! Toute batterie qui a gelé doit être remplacée. Une batterie déchargée peut geler à des températures proches de 0°C (+32°F)."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-peugeot-208
        emplacement: "p. 189, « Recharger la batterie avec un chargeur de batterie »"
        extrait: "Ne jamais essayer de recharger une batterie gelée - Risque d'explosion ! Si la batterie a gelé, la faire contrôler par le réseau PEUGEOT ou par un atelier qualifié qui vérifiera que les composants internes n'ont pas été endommagés et que le conteneur ne s'est pas fissuré, ce qui impliquerait un risque de fuite d'acide toxique et corrosif."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-citroen-c3
        emplacement: "p. 138, « Recharger la batterie avec un chargeur de batterie »"
        extrait: "N'essayez jamais de recharger une batterie gelée - Risque d'explosion ! Si la batterie a gelé, faites-la contrôler par le réseau CITROËN ou par un atelier qualifié qui vérifiera que les composants internes n'ont pas été endommagés et que le conteneur ne s'est pas fissuré, ce qui impliquerait un risque de fuite d'acide toxique et corrosif."
        verdict: oui avec précautions
        urgence: sous quelques jours
element_unique: tableau
format: 2
illustration:
  fichier: batterie-chargeur
  alt: "Un chargeur de batterie branché : la pince rouge sur la borne positive de la batterie, la pince noire sur un point de masse de la voiture"
  legende: "Chargeur éteint pendant le branchement : pince rouge (+) sur la borne (+) de la batterie, pince noire (-) sur le point de masse indiqué par la notice. Sur la Peugeot 208 et la Citroën C3, il n'est pas nécessaire de débrancher la batterie."
symptome: "La batterie est à plat, ou la voiture sert surtout pour de petits trajets ou reste longtemps immobilisée."
tutoriel:
  outils:
    - chargeur pour batterie au plomb de 12 volts
    - lunettes et gants de protection
  duree: "Quelques minutes pour brancher et débrancher ; durée de charge selon le chargeur"
  difficulte: facile
  quand_ne_pas_le_faire_soi_meme: "Batterie gelée ou endommagée, notice qui réserve la recharge à un atelier (Seat Ibiza), ou batterie aux spécificités de recharge (Renault Clio 5, Dacia Sandero 3 : demandez conseil au représentant de la marque)."
carburant: essence et diesel
contexte:
  - après de petits parcours
  - après une longue immobilisation
  - par grand froid
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leurs rubriques sur la batterie et sa recharge."
  sources:
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-seat-ibiza
sources:
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-seat-ibiza
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
causes:
  - cause: Batterie déchargée
    explication: "Selon les notices Renault Clio 5 et Dacia Sandero 3, l'état de charge baisse surtout sur de petits parcours, en ville, quand la température baisse, et après une longue utilisation de la radio ou d'autres équipements moteur arrêté. Une recharge suffit alors."
    pieces:
      - recharge-batterie
  - cause: Batterie en fin de vie
    explication: "Selon la notice Seat Ibiza, des problèmes de démarrage qui subsistent malgré la recharge peuvent indiquer une batterie défectueuse : elle conseille de la faire contrôler, recharger ou remplacer."
    pieces:
      - batterie
  - cause: Batterie qui a gelé
    explication: "Une batterie gelée ne se recharge jamais : risque d'explosion, selon les notices Peugeot 208, Citroën C3 et Seat Ibiza. La notice Seat Ibiza demande de la remplacer."
    pieces:
      - batterie
---

## Recharger la batterie de sa voiture : l'essentiel

Une batterie de voiture se recharge avec un chargeur prévu pour une batterie au plomb de 12 volts, en suivant la notice de la voiture et celle du chargeur. Toutes les notices ne laissent pas le faire soi-même : la notice {{notice:notice-seat-ibiza}} réserve la recharge à un atelier spécialisé ({{cite:notice-seat-ibiza|p. 303}}). Une batterie gelée ne se recharge jamais.

## Recharger avec un chargeur, étape par étape

{{repere:ligne-1}}

Ces étapes sont celles des notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}}, qui décrivent la recharge sans débrancher la batterie ({{cite:notice-peugeot-208|p. 187-189}} ; {{cite:notice-citroen-c3|p. 137-138}}). Sur une autre voiture, suivez sa notice : l'endroit où se branche la pince noire peut changer.

{{etapes}}

1. Travaillez dans un endroit aéré, loin des flammes et des étincelles, et protégez-vous les yeux et le visage.
2. Coupez le contact et éteignez tous les équipements électriques : radio, feux, essuie-glaces.
3. Vérifiez que le chargeur est prévu pour une batterie au plomb de 12 volts et que ses câbles sont en bon état, puis éteignez-le.
4. Branchez la pince rouge (+) sur la borne (+) de la batterie, puis la pince noire (-) sur le point de masse indiqué par la notice.
5. Mettez le chargeur en marche et suivez les instructions de son fabricant.
6. À la fin de la charge, éteignez le chargeur avant de débrancher les pinces.

Ne branchez jamais les pinces à l'envers, et ne démarrez jamais le moteur en branchant un chargeur ({{cite:notice-peugeot-208|p. 187-188}}). Sur la Peugeot 208, la borne négative de la batterie n'est pas accessible : un point de masse déporté la remplace ({{cite:notice-peugeot-208|p. 187}}).

## Ce que dit chaque notice

{{tableau}}

| Notice | Recharger soi-même | Chargeur demandé | Débrancher la batterie ? |
|---|---|---|---|
| Peugeot 208, Citroën C3 | Oui, ou consulter le réseau ou un atelier qualifié | Pour batterie au plomb, 12 volts | Pas nécessaire |
| Renault Clio 5, Dacia Sandero 3 | Oui ; certaines batteries ont des spécificités de recharge : demandez conseil au représentant de la marque | Compatible avec une batterie de 12 volts | Jamais moteur tournant ; attendre après la coupure du moteur avant de la débrancher |
| Seat Ibiza | Non : par un atelier spécialisé | Tension de charge limitée, selon la notice | Seulement dans des cas exceptionnels |

Le tableau résume les notices lues ({{cite:notice-peugeot-208|p. 188}} ; {{cite:notice-citroen-c3|p. 137}} ; {{cite:notice-renault-clio-5|p. 363}} ; {{cite:notice-dacia-sandero-3|p. 326}} ; {{cite:notice-seat-ibiza|p. 301 et 303}}). Avant de débrancher une batterie, la notice {{notice:notice-renault-clio-5}} demande d'attendre au moins cinq minutes après la coupure du moteur, et la notice {{notice:notice-dacia-sandero-3}} au moins une minute.

## Peut-on recharger la batterie sans la débrancher ?

Oui sur la Peugeot 208 et la Citroën C3 : leurs notices précisent qu'il n'est pas nécessaire de débrancher la batterie ({{cite:notice-peugeot-208|p. 188}} ; {{cite:notice-citroen-c3|p. 137}}). Les notices Renault Clio 5 et Dacia Sandero 3 interdisent de la débrancher quand le moteur tourne ({{cite:notice-renault-clio-5|p. 363}} ; {{cite:notice-dacia-sandero-3|p. 326}}). La notice Seat Ibiza ne la fait débrancher que dans des cas exceptionnels, car certaines fonctions de la voiture sont alors perdues ({{cite:notice-seat-ibiza|p. 301}}).

## Recharger avec une autre voiture : les câbles de démarrage

{{repere:ligne-2}}

Avec des câbles de démarrage, la batterie d'une autre voiture ne sert pas à recharger la vôtre : elle aide le moteur à démarrer, puis c'est le moteur qui recharge la batterie. La batterie de secours doit avoir une tension de 12 volts et une capacité au moins égale à celle de la batterie déchargée ({{cite:notice-peugeot-208|p. 187}} ; {{cite:notice-dacia-sandero-3|p. 326-327}}). La notice Renault Clio 5 demande des câbles de section importante ({{cite:notice-renault-clio-5|p. 363}}).

Une fois le moteur démarré, les notices Peugeot 208 et Citroën C3 demandent de le laisser tourner, voiture à l'arrêt, au moins 30 minutes : rouler tout de suite peut altérer certaines fonctions de la voiture ({{cite:notice-peugeot-208|p. 188}} ; {{cite:notice-citroen-c3|p. 137}}). La notice Citroën C3 précise que le Stop & Start reste indisponible tant que la charge n'est pas suffisante. La notice {{notice:notice-toyota-yaris}} demande ensuite de faire vérifier la voiture dès que possible ({{cite:notice-toyota-yaris|p. 320}}).

L'ordre de branchement des câbles est décrit sur la page [voiture qui ne démarre pas](/voiture-ne-demarre-pas/), avec ce que les notices interdisent.

## Recharger la batterie en roulant

Moteur tournant, la batterie se recharge. Certaines voitures préviennent quand sa charge baisse : les notices Renault Clio 5 et Dacia Sandero 3 décrivent le message « Batterie faible Démarrer moteur », qui disparaît quand le moteur tourne ([batterie de voiture faible](/batterie-voiture/)). Selon la notice Toyota Yaris, il est impossible de démarrer la voiture en la poussant ({{cite:notice-toyota-yaris|p. 320}}).

Si la batterie se vide souvent, la recharge ne règle pas tout : la notice Seat Ibiza voit dans des problèmes de démarrage qui subsistent le signe d'une batterie défectueuse, à faire contrôler, recharger ou remplacer ({{cite:notice-seat-ibiza|p. 303}}).

## Batterie gelée : jamais de recharge

{{repere:ligne-3}}

Une batterie déchargée peut geler à des températures proches de 0 °C. Les notices Peugeot 208, Citroën C3 et Seat Ibiza interdisent de la recharger, à cause du risque d'explosion ({{cite:notice-peugeot-208|p. 189}} ; {{cite:notice-citroen-c3|p. 138}} ; {{cite:notice-seat-ibiza|p. 302}}). La notice Seat Ibiza demande de la remplacer, et les notices Peugeot 208 et Citroën C3 de la faire contrôler.
