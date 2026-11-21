---
# Page de la vague B, étape 10, lot B2 (rédaction ouverte par la validation de la porte 10 le 16/11/2026, 19 h 26).
# Validée par Houssem le 17/11/2026 à 7 h 39 (« Je valide tout ! Fais le necessaire », sur la ligne de validation de
# travaux/etape-10/paquet-lot-b2-fin.md) ; empreinte posée et passage de exemples/ à src/content par la pull request
# du lot B2 (règle de passage).
# - Extraits et pages citées relus mot pour mot le 16/11/2026 (pdf.js dans Chrome) :
#   travaux/etape-10/textes/batterie-b2-verification.md et les relevés de la page « voiture ne démarre pas ».
#   Ligne 2 reprise mot pour mot de la page validée « voiture ne démarre pas » ; ligne 3 identique à la ligne 4 de « batterie-voiture ».
# - Illustration dessinée pour le site : batterie-chargeur (travaux/etape-10/generer-illustrations-b2.py).
# - Corrigé après la revue indépendante du 16/11/2026 (rapport « à corriger ») : ordre des câbles Peugeot 208 et Seat
#   Ibiza d'après les relevés, débranchement réservé à un professionnel chez Renault et Dacia, faits absents des relevés
#   retirés ; corrections non relues par la revue.
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
        extrait: "Dans certains cas, il peut être nécessaire de charger la batterie […]. Consulter le réseau PEUGEOT ou un atelier qualifié. Pour recharger soi-même la batterie du véhicule, utiliser uniquement un chargeur compatible avec les batteries au plomb, d'une tension nominale de 12 V."
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
  quand_ne_pas_le_faire_soi_meme: "Batterie gelée ou endommagée, notice qui réserve la recharge à un atelier (Seat Ibiza), ou batterie aux spécificités de recharge (Renault Clio 5, Dacia Sandero 3 : demandez conseil au représentant de la marque ; ces deux notices réservent aussi tout débranchement de la batterie à un professionnel spécialisé)."
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
    - notice-citroen-c3
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
date_modification: 2026-11-21
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
validation: 83a229f4280524714f9216e1b371ed59474032b9d30d86257d4515921baf6de3
causes:
  - cause: Batterie déchargée
    explication: "Selon les notices Renault Clio 5 et Dacia Sandero 3, l'état de charge baisse surtout sur de petits parcours, en ville, quand la température baisse, et après une longue utilisation de la radio ou d'autres équipements moteur arrêté. Les notices Peugeot 208 et Citroën C3 conseillent de la recharger quand la voiture sert surtout pour des trajets courts, ou avant une immobilisation prolongée."
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

1. Travaillez dans un endroit aéré, loin des flammes, et protégez-vous les yeux et le visage.
2. Coupez le contact et éteignez les équipements électriques.
3. Vérifiez que le chargeur est prévu pour une batterie au plomb de 12 volts, puis éteignez-le.
4. Branchez la pince rouge (+) sur la borne (+) de la batterie, puis la pince noire (-) sur le point de masse indiqué par la notice.
5. Mettez le chargeur en marche.
6. À la fin de la charge, éteignez le chargeur avant de débrancher les pinces.

Ne branchez jamais les pinces à l'envers, et ne démarrez jamais le moteur en branchant un chargeur ({{cite:notice-peugeot-208|p. 187-188}}). Sur la Peugeot 208, la borne négative de la batterie n'est pas accessible : un point de masse déporté la remplace ({{cite:notice-peugeot-208|p. 187}}).

## Ce que dit chaque notice

{{tableau}}

| Notice | Recharger soi-même | Chargeur demandé | Débrancher la batterie ? |
|---|---|---|---|
| Peugeot 208, Citroën C3 | Oui, ou consulter le réseau ou un atelier qualifié | Pour batterie au plomb, 12 volts | Pas nécessaire |
| Renault Clio 5, Dacia Sandero 3 | Oui ; certaines batteries ont des spécificités de recharge : demandez conseil au représentant de la marque | Compatible avec une batterie de 12 volts | Non : tout débranchement par un professionnel spécialisé ; jamais moteur tournant |
| Seat Ibiza | Non : par un atelier spécialisé | Tension de charge limitée, selon la notice | Seulement dans des cas exceptionnels |

Le tableau résume les notices lues ({{cite:notice-peugeot-208|p. 188}} ; {{cite:notice-citroen-c3|p. 137}} ; {{cite:notice-renault-clio-5|p. 341 et 363}} ; {{cite:notice-dacia-sandero-3|p. 302 et 326}} ; {{cite:notice-seat-ibiza|p. 301 et 303}}). Les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} réservent tout débranchement de la batterie, comme son démontage, à un professionnel spécialisé ({{cite:notice-renault-clio-5|p. 341}} ; {{cite:notice-dacia-sandero-3|p. 302}}).

## Peut-on recharger la batterie sans la débrancher ?

Oui sur la Peugeot 208 et la Citroën C3 : leurs notices précisent qu'il n'est pas nécessaire de débrancher la batterie ({{cite:notice-peugeot-208|p. 188}} ; {{cite:notice-citroen-c3|p. 137}}). Les notices Renault Clio 5 et Dacia Sandero 3 réservent le débranchement à un professionnel spécialisé et l'interdisent quand le moteur tourne ; leur rubrique sur le chargeur demande d'attendre après la coupure du moteur, au moins cinq minutes sur la Renault Clio 5 et au moins une minute sur la Dacia Sandero 3 ({{cite:notice-renault-clio-5|p. 341 et 363}} ; {{cite:notice-dacia-sandero-3|p. 302 et 326}}). La notice Seat Ibiza ne la fait débrancher que dans des cas exceptionnels ({{cite:notice-seat-ibiza|p. 301}}).

## Recharger avec une autre voiture : les câbles de démarrage

{{repere:ligne-2}}

Avec des câbles de démarrage, la batterie d'une autre voiture ne sert pas à recharger la vôtre : elle aide le moteur à démarrer, puis c'est le moteur qui recharge la batterie. La batterie de secours doit avoir une tension de 12 volts et une capacité au moins égale à celle de la batterie déchargée ({{cite:notice-peugeot-208|p. 187}} ; {{cite:notice-dacia-sandero-3|p. 326-327}}). La notice {{notice:notice-seat-ibiza}} demande des câbles de section suffisante, conformes à la norme DIN 72553 : au moins 25 mm² pour un moteur essence et 35 mm² pour un diesel ({{cite:notice-seat-ibiza|p. 55}}).

Les deux voitures ne doivent pas se toucher, selon les notices Peugeot 208 et Seat Ibiza ({{cite:notice-peugeot-208|p. 187}} ; {{cite:notice-seat-ibiza|p. 55}}). Selon la notice {{notice:notice-toyota-yaris}}, il est impossible de démarrer le moteur en poussant la voiture ({{cite:notice-toyota-yaris|p. 320}}). Les notices Peugeot 208 et Seat Ibiza donnent l'ordre de branchement des câbles, chacune pour sa voiture : sur une autre voiture, suivez sa notice, car le point où se branche le câble noir change d'une voiture à l'autre.

Sur la Peugeot 208 ({{cite:notice-peugeot-208|p. 188}}) :

1. Branchez le câble rouge sur la borne (+) de la batterie en panne, puis sur la borne (+) de la batterie de secours ou du booster.
2. Branchez le câble vert ou noir sur la borne (-) de la batterie de secours, puis son autre extrémité sur le point de masse de la Peugeot 208.
3. Démarrez le moteur de la voiture qui dépanne et laissez-le tourner quelques minutes.
4. Actionnez le démarreur de la voiture en panne et laissez tourner le moteur ; s'il ne démarre pas tout de suite, coupez le contact et attendez quelques instants.
5. Attendez le retour au ralenti, puis débranchez les câbles dans l'ordre inverse.

Sur la Seat Ibiza ({{cite:notice-seat-ibiza|p. 56-57}}) :

1. Coupez le contact sur les deux voitures.
2. Branchez le câble rouge entre la borne positive (+) de la voiture en panne et la borne positive (+) de la voiture qui fournit le courant.
3. Branchez une extrémité du câble noir sur la borne négative (-) de la voiture qui fournit le courant ; si cette voiture a le Start-Stop, sur une borne de mise à la terre appropriée ou une pièce métallique massive vissée au bloc-moteur.
4. Branchez l'autre extrémité du câble noir, sur la voiture en panne, à une pièce en métal massif vissée au carter-moteur, pas directement sur la borne négative de la batterie déchargée.
5. Lancez le moteur de la voiture qui fournit le courant et laissez-le tourner au ralenti.
6. Démarrez la voiture en panne : si le moteur ne démarre pas au bout de 10 secondes, recommencez environ une minute plus tard.
7. Moteurs en marche, débranchez les câbles exactement dans l'ordre inverse.

La notice Seat Ibiza interdit ce démarrage avec des câbles si l'une des batteries est gelée, à cause du risque d'explosion ({{cite:notice-seat-ibiza|p. 57}}). Une fois le moteur démarré, les notices Peugeot 208 et Citroën C3 demandent de le laisser tourner, voiture à l'arrêt, au moins 30 minutes, pour que la batterie atteigne un niveau de charge suffisant ({{cite:notice-peugeot-208|p. 188}} ; {{cite:notice-citroen-c3|p. 137}}). La notice Toyota Yaris demande ensuite de faire vérifier la voiture dès que possible ({{cite:notice-toyota-yaris|p. 320}}).

## Recharger la batterie en roulant

Moteur tournant, la batterie se recharge. Certaines voitures préviennent quand sa charge baisse : les notices Renault Clio 5 et Dacia Sandero 3 décrivent le message « Batterie faible Démarrer moteur », qui disparaît une fois le moteur démarré ([batterie de voiture faible](/batterie-voiture/)).

Juste après un démarrage avec une autre batterie, les notices Peugeot 208 et Citroën C3 préviennent que rouler tout de suite, sans niveau de charge suffisant, peut altérer certaines fonctions de la voiture ({{cite:notice-peugeot-208|p. 188}} ; {{cite:notice-citroen-c3|p. 137}}). La notice Citroën C3 précise que certaines fonctions, dont le Stop & Start, restent indisponibles tant que la charge n'est pas suffisante ({{cite:notice-citroen-c3|p. 137}}).

Si la batterie se vide souvent, la recharge ne règle pas tout : la notice Seat Ibiza voit dans des problèmes de démarrage qui subsistent le signe d'une batterie défectueuse, à faire contrôler, recharger ou remplacer ({{cite:notice-seat-ibiza|p. 303}}).

## Batterie gelée : jamais de recharge

{{repere:ligne-3}}

Une batterie déchargée peut geler à des températures proches de 0 °C. Les notices Peugeot 208, Citroën C3 et Seat Ibiza interdisent de la recharger, à cause du risque d'explosion ({{cite:notice-peugeot-208|p. 189}} ; {{cite:notice-citroen-c3|p. 138}} ; {{cite:notice-seat-ibiza|p. 302}}). La notice Seat Ibiza demande de la remplacer, et les notices Peugeot 208 et Citroën C3 de la faire contrôler.
