---
# Page de la vague B, étape 10, lot B4 (rédaction ouverte par la validation de la porte 10 le 16/11/2026, 19 h 26).
# Validée par Houssem le 17/11/2026 à 7 h 39 (« Je valide tout ! Fais le necessaire », sur la ligne de validation de
# travaux/etape-10/paquet-lot-b4-fin.md) ; empreinte posée et passage de exemples/ à src/content par la pull request
# du lot B4 (règle de passage).
# - Extraits relus mot pour mot le 16/11/2026 : travaux/etape-10/textes/autres-pannes-verification.md (Renault p. 186
#   et 386, Dacia p. 160 et 348-349, Peugeot p. 168, Citroën p. 115, Seat p. 213 et 290). Ligne 4 au même niveau que la
#   ligne 2 de « moteur qui surchauffe », sans la phrase sur le capot (Seat p. 290, citée dans le texte). Contrôle
#   technique : annexe I, points 8.2.12 et 8.2.22, et article 7 (relevé du 16/11).
# - Corrigée après la revue indépendante du 16/11/2026 (non relue depuis) : ligne 1 en urgence « tout de suite »
#   (réduire le régime : geste de conduite) ; ligne 2 limitée au diesel avec filtre à particules (rubrique Peugeot et
#   Citroën) ; risque d'emballement signalé par MAHLE cité dans le texte ; légende de l'illustration revue.
# - Fumée noire ou bleue : aucune consigne de conduite de première main ; causes par un document technique admis
#   (MAHLE, demande n° 31), inscrit au registre avec le lot ; aucun verdict n'en est tiré.
# - Requête principale « fumée blanche voiture » : demande de changement du plan proposée avec le lot
#   (travaux/etape-10/demande-changement-fumee.md), appliquée au plan sur cette branche seulement, en attente de
#   l'accord de Houssem.
# - Illustration dessinée pour le site : fumee-couleurs (travaux/etape-10/generer-illustrations-b4.py).
id: fumee-echappement
title: "Fumée blanche voiture, fumée noire diesel : que faire ?"
h1: "Fumée blanche à l'échappement, fumée noire ou bleue : faut-il s'inquiéter ?"
description: "Fumée blanche au démarrage ou en roulant, vapeur d'eau, fumée noire d'un diesel, fumée bleue, fumée sous le capot : ce qui est normal selon les notices, et quand s'arrêter."
libelle_court: Fumée à l'échappement
question_decision: "Ma voiture fume à l'échappement : puis-je continuer à rouler ?"
situations:
  - situation: "Fumée blanche à l'échappement, sans voyant allumé"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Réduisez le régime moteur et évitez les accélérations brutales : la fumée doit disparaître peu à peu. Sinon, faites contrôler la voiture."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 386, « Anomalies de fonctionnement », « Sur route », « Fumée blanche à l'échappement »"
        extrait: "Version Diesel, ceci n'est pas obligatoirement une anomalie, la fumée peut provenir de la régénération du filtre à particules. […] Réduisez le régime moteur et évitez les accélérations brutales pour faire disparaître progressivement la fumée. Si ce n'est pas le cas, cela peut provenir d'une autre cause. Consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 348-349, « Anomalies de fonctionnement », « Sur route », « Fumée blanche à l'échappement »"
        extrait: "Version Diesel, ceci n'est pas obligatoirement une anomalie, la fumée peut provenir de la régénération du filtre à particules. […] Réduisez le régime moteur et évitez les accélérations brutales pour faire disparaître progressivement la fumée. Si ce n'est pas le cas, cela peut provenir d'une autre cause. Consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "Diesel avec filtre à particules : vapeur d'eau à l'échappement en accélérant, après un long moment au ralenti ou à très basse vitesse"
    verdict: oui
    urgence: aucune
    action: "Selon les notices Peugeot 208 et Citroën C3, ces émissions sont sans conséquence."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 168, « Filtre à particules (Diesel) »"
        extrait: "Après un fonctionnement prolongé du véhicule à très basse vitesse ou au ralenti, il est possible de constater exceptionnellement des émissions de vapeur d'eau à l'échappement, lors d'accélérations. Ces émissions sont sans conséquence"
        verdict: oui
        urgence: aucune
      - source: notice-citroen-c3
        emplacement: "p. 115, « Filtre à particules (Diesel) »"
        extrait: "Après un fonctionnement prolongé du véhicule à très basse vitesse ou au ralenti, il est possible de constater exceptionnellement des émissions de vapeur d'eau à l'échappement, lors d'accélérations. Ces émissions sont sans conséquence"
        verdict: oui
        urgence: aucune
  - situation: "Diesel, par temps froid : un peu de fumée sous la voiture, chauffage d'appoint en marche"
    verdict: oui
    urgence: aucune
    action: "C'est normal sous +5 °C quand le chauffage d'appoint à carburant fonctionne, selon la notice Seat Ibiza."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 213, « Démarrer le moteur », Nota"
        extrait: "À des températures inférieures à +5 °C (+41 °F), un peu de fumée peut s'échapper du dessous des véhicules diesel lorsque le chauffage d'appoint supplémentaire à carburant est activé."
        verdict: oui
        urgence: aucune
  - situation: "De la fumée ou de la vapeur sort de sous le capot"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Arrêtez-vous dès que vous pouvez le faire sans danger, coupez le contact et éloignez-vous de la voiture. Faites appel à un garage ou à l'assistance."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 386, « Anomalies de fonctionnement », « Sur route », « Fumée sous capot moteur »"
        extrait: "Court-circuit ou fuite du circuit de refroidissement. Arrêtez-vous, coupez le contact, éloignez-vous du véhicule et faites appel à un Représentant de la marque."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 348-349, « Anomalies de fonctionnement », « Sur route », « Fumée sous capot moteur »"
        extrait: "Court-circuit ou fuite du circuit de refroidissement. Arrêtez-vous, coupez le contact, éloignez-vous du véhicule et faites appel à un Représentant de la marque."
        verdict: non, arrêt immédiat
        urgence: immédiate
element_unique: arbre-de-decision
format: 2
illustration:
  fichier: fumee-couleurs
  alt: "Trois fumées à l'échappement : blanche, parfois normale, noire et bleue, dont aucune notice lue ne parle"
  legende: "Blanche : pas forcément une anomalie, selon les notices Renault Clio 5 et Dacia Sandero 3, si elle disparaît en réduisant le régime. Noire ou bleue : aucune notice lue n'en parle ; un document technique d'équipementier cite parmi les causes possibles un turbo abîmé. Demandez l'avis d'un professionnel."
symptome: "De la fumée blanche, noire ou bleue sort de l'échappement, au démarrage ou en roulant, ou de la fumée sort de sous le capot."
carburant: essence et diesel
contexte:
  - au démarrage
  - par temps froid ou humide
  - à l'accélération
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues et, pour la fumée noire ou bleue, d'un document technique d'équipementier (MAHLE)."
  sources:
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - mahle-turbo-dommages-2024
sources:
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-seat-ibiza
  - arrete-1991-06-18-controle-technique
  - mahle-turbo-dommages-2024
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
validation: d9e1dc2f264f42ae72eeafa5cc37de6c95d5dd7f16e3d3218fa02d55189293f7
causes:
  - cause: Nettoyage automatique du filtre à particules (diesel)
    explication: "Selon les notices Renault Clio 5 et Dacia Sandero 3, des fumées blanches peuvent exceptionnellement apparaître en roulant pendant le nettoyage automatique du filtre à particules, sans conséquence sur le comportement de la voiture."
    pieces:
      - regeneration-fap
  - cause: Temps froid ou humide (essence)
    explication: "Selon les mêmes notices, la fumée blanche d'un moteur essence n'est pas forcément une anomalie : par temps froid ou humide, elle peut apparaître lors de fortes accélérations."
    pieces:
      - fonctionnement-normal
  - cause: Turbo en mauvais état (fumée noire ou bleue)
    explication: "Selon le document technique de MAHLE sur les turbocompresseurs, un turbo abîmé peut faire entrer trop peu d'air dans le moteur, d'où une fumée noire et un manque de puissance ; un retour d'huile du turbo bouché peut donner une fumée bleue. Ce document est écrit pour les ateliers, et sa liste de causes n'est pas complète."
    pieces:
      - turbo
  - cause: Court-circuit ou fuite du circuit de refroidissement (fumée sous le capot)
    explication: "Selon les notices Renault Clio 5 et Dacia Sandero 3, une fumée sous le capot peut venir d'un court-circuit ou d'une fuite du circuit de refroidissement."
    pieces:
      - faisceau-et-connecteurs
      - durites-et-colliers
---

## Fumée à l'échappement : la couleur d'abord

La couleur de la fumée et le moment où elle apparaît orientent tout le reste. Une fumée blanche n'est pas toujours une anomalie, selon les notices lues ; une fumée sous le capot impose l'arrêt. Suivez les questions ci-dessous.

## Le bon geste selon ce que vous voyez

{{arbre}}

1. La fumée sort-elle de sous le capot ?
   - Oui : arrêtez-vous, coupez le contact et éloignez-vous de la voiture. {{verdict:ligne-4}}
   - Non, elle sort de l'échappement : passez à la question 2.
2. De quelle couleur est-elle ?
   - Blanche : passez à la question 3.
   - Noire ou bleue : aucune des notices lues ne donne de consigne pour ce cas ; demandez l'avis d'un professionnel.
3. Sur un diesel avec filtre à particules, apparaît-elle en accélérant, après un long moment au ralenti ou à très basse vitesse ?
   - Oui : cela peut être de la vapeur d'eau, que les notices Peugeot 208 et Citroën C3 disent sans conséquence. {{verdict:ligne-2}}
   - Non, ou moteur essence : réduisez le régime et évitez les accélérations brutales ; si elle ne disparaît pas, faites contrôler la voiture. {{verdict:ligne-1}}

## Fumée blanche à l'échappement

{{repere:ligne-1}}

Selon les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}}, une fumée blanche n'est pas forcément une anomalie. Sur un diesel, elle peut venir de la régénération du filtre à particules ; sur un moteur essence, elle peut apparaître lors de fortes accélérations par temps froid ou humide ({{cite:notice-renault-clio-5|p. 386}} ; {{cite:notice-dacia-sandero-3|p. 348-349}}). Elles demandent de réduire le régime moteur et d'éviter les accélérations brutales, puis de consulter un représentant de la marque si la fumée ne disparaît pas.

Sur un diesel, ces notices précisent que des fumées blanches peuvent exceptionnellement apparaître en roulant, pendant le nettoyage automatique du filtre à particules, sans conséquence sur le comportement de la voiture ({{cite:notice-renault-clio-5|p. 186}} ; {{cite:notice-dacia-sandero-3|p. 160}}).

## Vapeur d'eau d'un diesel après un long ralenti

{{repere:ligne-2}}

Sur un diesel, après un long moment au ralenti ou à très basse vitesse, les notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}} décrivent des émissions de vapeur d'eau à l'échappement en accélérant, qu'elles disent sans conséquence ({{cite:notice-peugeot-208|p. 168}} ; {{cite:notice-citroen-c3|p. 115}}). Ce passage est dans leur rubrique sur le filtre à particules des diesels : elles n'en disent rien pour un moteur essence. Sur une voiture neuve, elles jugent aussi normale une odeur de brûlé lors des premières régénérations du filtre à particules.

## Fumée sous une voiture diesel par temps froid

{{repere:ligne-3}}

Sous +5 °C, un peu de fumée peut sortir du dessous d'une voiture diesel quand son chauffage d'appoint à carburant fonctionne, selon la notice {{notice:notice-seat-ibiza}} ({{cite:notice-seat-ibiza|p. 213}}).

## Fumée noire ou bleue

Aucune des notices lues ne parle d'une fumée noire ou bleue à l'échappement, ni de ce qu'il faut faire. Un document technique écrit pour les ateliers par l'équipementier MAHLE relie la fumée noire à un moteur qui reçoit trop peu d'air, par exemple avec un turbo abîmé, et la fumée bleue à de l'huile qui passe dans le moteur, par exemple quand le retour d'huile du turbo est bouché ({{cite:mahle-turbo-dommages-2024|p. 6-7 et 10-11}}).

Le même document signale un risque plus grave : avec de l'huile accumulée dans le refroidisseur d'air de suralimentation, « le moteur monte à des surrégimes incontrôlés (« emballement ») » ({{cite:mahle-turbo-dommages-2024|p. 10-11}}). Ses causes ne sont que des exemples, et sa liste n'est pas complète. Demandez l'avis d'un professionnel, et ne versez aucun produit sans l'avis d'un garage.

Au contrôle technique, une fumée excessive d'un moteur essence, ou une opacité des fumées d'un diesel au-delà de la valeur admise, est une défaillance majeure, qui impose une contre-visite ({{cite:arrete-1991-06-18-controle-technique|annexe I, points 8.2.12 et 8.2.22 ; article 7}}). Si la voiture perd aussi de la puissance, voyez la page [perte de puissance](/perte-de-puissance-voiture/).

## Fumée sous le capot : s'arrêter

{{repere:ligne-4}}

Une fumée sous le capot peut venir d'un court-circuit ou d'une fuite du circuit de refroidissement : les notices Renault Clio 5 et Dacia Sandero 3 demandent de s'arrêter, de couper le contact, de s'éloigner de la voiture et de faire appel à un représentant de la marque ({{cite:notice-renault-clio-5|p. 386}} ; {{cite:notice-dacia-sandero-3|p. 348-349}}). La notice Seat Ibiza demande de ne pas ouvrir le capot tant que de la vapeur ou du liquide de refroidissement s'en échappe ({{cite:notice-seat-ibiza|p. 290}}).
