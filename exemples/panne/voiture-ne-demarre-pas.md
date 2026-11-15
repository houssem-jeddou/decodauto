---
# BROUILLON de préparation anticipée de l'étape 10 (docs/03, règle 12, quatrième exception, demande de changement n° 21) :
# exemple du modèle panne, page « voiture ne démarre pas » de la vague B. Rien n'en est présenté à la validation,
# fusionné ni publié avant la fermeture de la porte de l'étape 8. Pas d'empreinte : jamais validé.
# - Extraits provisoires, lus par l'outil de lecture web (travaux/etape-10/textes/demarrage-batterie-releve.md) :
#   chacun est à relire mot pour mot à l'écran avant le paquet. Les niveaux des citations sont des propositions
#   tirées de la grille (src/schemas/grille.ts), à confirmer au paquet.
# - Notices Dacia et Toyota pas encore lues (navigateur) : à ajouter aux citations et aux sources si elles parlent du cas.
# - Pièces à créer dans data/couts.json avec le lot : `pile-de-cle` (geste) et `carburant-et-reamorcage` (geste).
# - Format de l'arbre de décision (`{{arbre}}` suivi d'une liste numérotée) : provisoire, fixé par la partie technique
#   du modèle panne (piste technique, après la demande n° 27).
id: voiture-ne-demarre-pas
title: "Voiture ne démarre pas : que faire, cas par cas"
h1: "Ma voiture ne démarre pas : que vérifier, et quand faire appel à un garage ?"
description: "Votre voiture ne démarre pas ? Regardez d'abord les voyants et le démarreur : batterie à plat, carburant, clé non reconnue. Ce que disent les notices, et quand appeler un garage."
libelle_court: Voiture qui ne démarre pas
question_decision: "Ma voiture ne démarre pas : que faire, et puis-je repartir ensuite ?"
situations:
  - situation: "Les voyants du tableau de bord faiblissent ou ne s'allument pas, et le démarreur ne tourne pas"
    verdict: oui avec précautions
    urgence: sous quelques jours
    action: "Resserrez ou nettoyez les cosses de la batterie, puis démarrez avec une autre batterie (câbles ou booster) en suivant la notice de votre voiture. Ne le faites jamais si une batterie est gelée. Faites ensuite contrôler la batterie, et remplacez-la si nécessaire."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 384, « Anomalies de fonctionnement », « Vous actionnez le démarreur »"
        extrait: "Branchez une autre batterie sur la batterie défaillante."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-seat-ibiza
        emplacement: "p. 303, « Batterie de 12 volts »"
        extrait: "En cas de courts trajets fréquents et de longues périodes d'immobilisation, faites également recharger la batterie"
        verdict: oui avec précautions
        urgence: sous quelques jours
  - voyant: prechauffage
  - situation: "Le démarreur tourne, mais le moteur ne démarre pas après quelques essais"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "N'insistez pas : coupez le contact entre deux essais, comme le demande votre notice, puis faites appel à un garage ou à l'assistance. Si le réservoir est vide, voyez la ligne suivante."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 93, « Démarrage / Arrêt du moteur avec la clé »"
        extrait: "Si après quelques tentatives le moteur ne démarre pas, ne pas insister. Faire appel au réseau PEUGEOT ou à un atelier qualifié."
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Diesel tombé en panne sèche"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Mettez au moins 5 litres de gazole, puis réamorcez le circuit comme le décrit la notice de votre voiture avant de démarrer. Si le moteur ne démarre pas, n'insistez pas : recommencez la procédure."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 175, « Panne de carburant (Diesel) »"
        extrait: "Avant de commencer le réamorçage, il est impératif de mettre au moins 5 litres de gazole dans le réservoir de carburant."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 120, « Panne de carburant (Diesel) »"
        extrait: "Avant de commencer le réamorçage, il est impératif de mettre au moins 5 litres de gazole"
        verdict: oui avec précautions
        urgence: immédiate
  - voyant: batterie-rouge
voyants:
  - prechauffage
  - batterie-rouge
element_unique: arbre-de-decision
symptome: "Le moteur ne démarre pas quand vous tournez la clé ou appuyez sur le bouton de démarrage."
carburant: essence et diesel
contexte:
  - au démarrage
  - par grand froid
  - après une longue immobilisation
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leur tableau des anomalies, leurs rubriques sur la batterie, le démarrage et le carburant."
  sources:
    - notice-renault-clio-5
    - notice-peugeot-208
    - notice-seat-ibiza
sources:
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-dacia-sandero-3
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-15
date_modification: 2026-11-15
date_revue: 2026-11-15
prochaine_revue: 2027-11-15
causes:
  - cause: Batterie déchargée ou hors d'usage
    explication: "C'est une des causes du tableau des anomalies de la notice Renault quand les voyants faiblissent et que le démarreur ne tourne pas. Seat rappelle qu'en hiver, la puissance de démarrage peut être réduite, et que de courts trajets fréquents ou de longues immobilisations demandent de recharger la batterie."
    pieces:
      - recharge-batterie
      - batterie
  - cause: Cosses de batterie mal serrées, débranchées ou oxydées
    explication: "Autre cause du même tableau Renault : il demande de les resserrer, de les rebrancher, ou de les nettoyer si elles sont oxydées."
    pieces:
      - cosses-de-batterie
  - cause: Batterie qui ne se recharge plus en roulant
    explication: "Si le circuit de charge est défaillant (exemples de la notice Peugeot : cosses sales, courroie d'alternateur détendue ou sectionnée), la batterie se vide en roulant et la voiture ne redémarre plus, même avec une batterie neuve. Le voyant batterie s'allume alors moteur tournant."
    pieces:
      - courroie-d-alternateur
      - alternateur
  - cause: Panne de carburant (diesel à réamorcer)
    explication: "Sur un diesel tombé en panne sèche, les notices Peugeot et Citroën demandent de remettre au moins 5 litres de gazole et de réamorcer le circuit avant de démarrer."
    pieces:
      - carburant-et-reamorcage
  - cause: Clé ou carte non détectée
    explication: "Pile de la clé usée ou clé hors de l'habitacle : les notices Peugeot, Seat et Renault décrivent un démarrage de secours."
    pieces:
      - pile-de-cle
  - cause: Conditions de démarrage non remplies
    explication: "Pédale de frein ou d'embrayage non enfoncée, levier pas en position P, volant bloqué : un message le dit sur les voitures dont la notice le décrit (Peugeot, Renault)."
    pieces:
      - fonctionnement-normal
  - cause: Circuit électrique défectueux
    explication: "Autre cause du tableau Renault, qui demande de consulter un représentant de la marque."
    pieces:
      - faisceau-et-connecteurs
---

## Que faire quand la voiture ne démarre pas ?

Ne multipliez pas les essais : les notices lues demandent de couper le contact entre deux tentatives et de ne pas insister. Regardez plutôt deux choses, qui orientent tout le reste : les voyants du tableau de bord quand vous mettez le contact, et le bruit du démarreur quand vous tournez la clé ou appuyez sur le bouton.

## Le bon geste selon ce qui se passe

{{arbre}}

1. Quand vous mettez le contact, les voyants du tableau de bord s'allument-ils normalement ?
   - Non, ou ils faiblissent : la batterie est déchargée ou ses cosses sont mal serrées. {{verdict:ligne-1}}
   - Oui : passez à la question 2.
2. Un message s'affiche-t-il (clé non détectée, appuyer sur le frein ou l'embrayage, manœuvrer le volant, mettre le levier sur P) ?
   - Oui : faites ce que demande le message ; pour une clé non détectée, utilisez le démarrage de secours de votre notice (voir plus bas).
   - Non : passez à la question 3.
3. Diesel : le voyant de préchauffage est-il encore allumé ?
   - Oui : attendez qu'il s'éteigne avant de démarrer. {{verdict:prechauffage}}
   - Non, ou voiture essence : passez à la question 4.
4. Le démarreur tourne-t-il ?
   - Non, alors que les voyants sont normaux et qu'aucun message ne s'affiche : la notice Renault renvoie à un circuit défectueux et demande de consulter un représentant de la marque.
   - Oui, mais le moteur ne démarre pas : passez à la question 5.
5. Le réservoir est-il vide ?
   - Oui : remettez du carburant ; sur un diesel, il faut au moins 5 litres de gazole, puis réamorcer le circuit. {{verdict:ligne-4}}
   - Non : après quelques essais, n'insistez pas. {{verdict:ligne-3}}
6. Le moteur a démarré, mais le voyant batterie reste allumé, ou s'allume en roulant ?
   - La batterie ne se recharge plus : {{verdict:batterie-rouge}}

## Voiture qui ne démarre pas, voyants faibles ou éteints : la batterie

Dans le tableau des anomalies de la notice {{notice:notice-renault-clio-5}}, des voyants qui faiblissent ou ne s'allument pas, avec un démarreur qui ne tourne pas, viennent de trois causes : des cosses de batterie mal serrées, débranchées ou oxydées, une batterie déchargée ou hors d'usage, ou un circuit défectueux ({{cite:notice-renault-clio-5|p. 384}}).

Pour démarrer avec une autre batterie, suivez la notice de votre voiture : l'ordre de branchement et le point où se branche le câble noir changent d'une voiture à l'autre. Sur la Peugeot 208, la borne négative n'est pas accessible et un point de masse déporté la remplace ({{cite:notice-peugeot-208|p. 187-188}}) ; sur la Clio 5, les câbles se branchent sur un bornier du compartiment moteur ({{cite:notice-renault-clio-5|p. 363-364}}).

Ce que les notices lues interdisent :

- démarrer avec des câbles si l'une des batteries est gelée : « risque d'explosion » ({{cite:notice-seat-ibiza|p. 57}}) ;
- démarrer le moteur en branchant un chargeur de batterie ({{cite:notice-peugeot-208|p. 187}}) ;
- utiliser un booster de batterie de 24 V ou plus ({{cite:notice-citroen-c3|p. 137}}) ;
- laisser tourner le moteur dans un endroit fermé : « risque d'intoxication » ({{cite:notice-seat-ibiza|p. 213}}).

## Le démarreur tourne mais le moteur ne démarre pas

La notice {{notice:notice-peugeot-208}} demande de couper le contact si le moteur ne démarre pas tout de suite, d'attendre quelques instants avant de recommencer, puis, après quelques tentatives, de ne pas insister et de faire appel au réseau ou à un atelier qualifié ({{cite:notice-peugeot-208|p. 93}}). Seat demande d'interrompre le lancement et de réessayer au bout d'une minute environ ({{cite:notice-seat-ibiza|p. 212}}).

Sur un diesel, attendez que le voyant de préchauffage s'éteigne avant d'actionner le démarreur : c'est la consigne de toutes les notices lues pour ce voyant. Par temps froid, il reste allumé plus longtemps ({{cite:notice-peugeot-208|p. 93}}).

## Diesel en panne sèche : le réamorçage

Sur un diesel tombé en panne sèche, il ne suffit pas de refaire le plein : le circuit de carburant doit être réamorcé. Les notices Peugeot et Citroën demandent d'abord de mettre au moins 5 litres de gazole ; la suite de la procédure dépend du moteur, et la notice de votre voiture la décrit ({{cite:notice-peugeot-208|p. 175}}).

## Clé ou carte non reconnue : le démarrage de secours

Quand la pile de la clé est usée, la voiture peut ne pas la détecter. Les notices lues prévoient un démarrage de secours :

- Peugeot 208 : placer la télécommande contre le lecteur de secours, sur la colonne de direction ({{cite:notice-peugeot-208|p. 95}}) ;
- Seat Ibiza : tenir la clé contre l'habillage, à droite de la colonne de direction, juste après avoir appuyé sur le bouton de démarrage ({{cite:notice-seat-ibiza|p. 215}}) ;
- Renault Clio 5 : poser la carte sur la zone indiquée par le message, pédale de frein ou d'embrayage enfoncée ({{cite:notice-renault-clio-5|p. 175}}).

## Volant bloqué, clé qui ne tourne pas

C'est l'antivol de direction. Tournez le volant en même temps que la clé, ou en appuyant sur le bouton de démarrage, comme le décrivent les notices Peugeot et Renault ({{cite:notice-renault-clio-5|p. 384}}).

## Pousser la voiture pour la faire démarrer ?

La notice Seat ne le recommande pas, l'interdit sur une boîte automatique, et limite à 50 m la distance de remorquage pour démarrer, à cause du risque pour le catalyseur ({{cite:notice-seat-ibiza|p. 58}}). Elle interdit aussi de remorquer la voiture si sa batterie est déchargée ({{cite:notice-seat-ibiza|p. 57}}). La notice Peugeot interdit de pousser une voiture à boîte automatique pour la démarrer ({{cite:notice-peugeot-208|p. 188}}).

## Après le démarrage : peut-on rouler tout de suite ?

Selon les notices Peugeot et Citroën, rouler tout de suite, avant que la batterie ait retrouvé une charge suffisante, peut altérer certaines fonctions de la voiture ({{cite:notice-citroen-c3|p. 137}}). Si le voyant batterie reste allumé moteur tournant, la batterie ne se recharge plus : suivez la consigne de l'encadré.

## Ma voiture ne démarre pas malgré une batterie neuve

Si une batterie neuve se vide encore, la cause peut être le circuit de charge : la notice Peugeot cite des cosses sales et une courroie d'alternateur détendue ou sectionnée ({{cite:notice-peugeot-208|p. 13}}). Le voyant batterie allumé moteur tournant le signale. Faites contrôler le circuit de charge.

## Ce que ce brouillon ne dit pas encore

Section de travail, à retirer avant le paquet : les notices Dacia et Toyota ne sont pas lues (Toyota a une rubrique « Si le moteur ne démarre pas ») ; aucune notice lue ne nomme le démarreur comme cause ; les recherches « voiture ne démarre pas mais radio fonctionne », « clic » ou « bruit du démarreur » n'ont pas encore de source ; aucun cas par modèle (Clio 2, 3, 4, Kangoo) sans notice de ces modèles.
