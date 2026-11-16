---
# BROUILLON, jamais validé. Étape 10, lot B3 (rédaction ouverte par la validation de la porte 10 le 16/11/2026,
# 19 h 26). Page de la vague B, sans empreinte tant que Houssem n'a pas validé son encadré (paquet du lot B3).
# - Extraits relus mot pour mot le 16/11/2026 (pdf.js dans Chrome) : travaux/etape-10/textes/autres-pannes-verification.md
#   (Renault p. 386-387, Dacia p. 348-349 : même tableau mot pour mot, Seat p. 298 et 290, Peugeot p. 165 et 167,
#   Citroën p. 113, Toyota p. 242 et 291). Toyota p. 291 : le relevé ne donne la liste des symptômes qu'en résumé ;
#   l'extrait mot pour mot du symptôme est celui de la p. 242 (lecture des pages Toyota à confirmer : voir le paquet).
# - Corrigée le 16/11/2026 après la revue indépendante (travaux/etape-10/paquet-lot-b3-fin.md, encadré « Revue indépendante »).
# - Pièces à créer dans data/couts.json avec le lot : motoventilateur (réparation), joint-de-culasse (organe).
# - Illustration dessinée pour le site : refroidissement-bocal (travaux/etape-10/generer-illustrations-b3.py).
id: surchauffe-moteur
title: "Moteur qui surchauffe : que faire, et peut-on rouler ?"
h1: "Mon moteur surchauffe : faut-il s'arrêter, et que vérifier ?"
description: "Moteur qui surchauffe, voyant de température rouge, vapeur sous le capot : quand s'arrêter, quoi vérifier moteur froid, et les causes selon les notices."
libelle_court: Moteur qui surchauffe
question_decision: "Mon moteur surchauffe : puis-je continuer à rouler ?"
situations:
  - voyant: temperature-rouge
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
  - situation: "Le liquide de refroidissement bouillonne dans le bocal"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Arrêtez le moteur. Faites appel à un garage ou à l'assistance."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 387, « Anomalies de fonctionnement », « Sur route », « Bouillonnement dans le bocal de liquide de refroidissement »"
        extrait: "Panne mécanique : joint de culasse détérioré. Arrêtez le moteur. Faites appel à un Représentant de la marque."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 348-349, « Anomalies de fonctionnement », « Sur route », « Bouillonnement dans le bocal de liquide de refroidissement »"
        extrait: "Panne mécanique : joint de culasse détérioré. Arrêtez le moteur. Faites appel à un Représentant de la marque."
        verdict: non, arrêt immédiat
        urgence: immédiate
  - situation: "Moteur froid, le bocal du liquide de refroidissement est vide"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Ne roulez pas et ne faites pas l'appoint : faites appel à un garage ou à l'assistance pour vous dépanner."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 298, « Liquide de refroidissement », appoint"
        extrait: "Faites l'appoint de liquide de refroidissement uniquement s'il en reste encore dans le vase d'expansion, sinon vous pourriez endommager le moteur. S'il n'y a plus de liquide de refroidissement dans le vase d'expansion, arrêtez-vous. Faites appel à un spécialiste en mesure de vous dépanner"
        verdict: non, arrêt immédiat
        urgence: immédiate
  - situation: "Moteur froid, le niveau du liquide de refroidissement est proche du repère mini ou en dessous"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites l'appoint moteur froid, avec le liquide préconisé par votre notice, sans dépasser le repère maxi."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 167, « Liquide de refroidissement moteur »"
        extrait: "Un appoint de ce liquide entre deux révisions est normal. Le contrôle et l'appoint doivent être faits moteur froid. Un niveau insuffisant présente des risques de dommages importants pour le moteur […] Si le niveau est proche ou en-dessous du repère \"MINI\", il est impératif de faire un appoint."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 113, « Liquide de refroidissement moteur »"
        extrait: "Un appoint de ce liquide entre deux révisions est normal. Le contrôle et l'appoint doivent être faits moteur froid. Un niveau insuffisant présente des risques de dommages importants pour le moteur […] Si le niveau est proche ou en-dessous du repère \"MINI\", il est impératif de faire un appoint."
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "La température du liquide de refroidissement reste au-dessus de la normale, sans alerte rouge"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites vérifier la voiture dès que possible par un garage."
    ecart_marques: "La notice Toyota Yaris donne deux délais pour ce signe : dès que possible dans sa rubrique « Si vous pensez qu'il y a un problème » (p. 291) ; sans délai écrit dans « Votre véhicule nécessite-t-il des réparations ? » (p. 242)."
    ecart_court: "Plus strict : Toyota p. 291 (réparateur dès que possible). Moins strict : Toyota p. 242 (réparation, sans délai écrit)."
    citations:
      - source: notice-toyota-yaris
        emplacement: "p. 291, 7.2.2 « Si vous pensez qu'il y a un problème »"
        extrait: "Si vous remarquez l'un des symptômes suivants, votre véhicule a probablement besoin d'un réglage ou d'une réparation. Contactez dès que possible un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-toyota-yaris
        emplacement: "p. 242, « Votre véhicule nécessite-t-il des réparations ? »"
        extrait: "Soyez attentif aux variations de performances et aux signaux sonores, ainsi qu'aux indications informant qu'une réparation s'avère nécessaire. Voici quelques indices importants : […] Température du liquide de refroidissement du moteur continuellement supérieure à la normale"
        verdict: oui avec précautions
        urgence: sous quelques jours
voyants:
  - temperature-rouge
element_unique: arbre-de-decision
format: 2
illustration:
  fichier: refroidissement-bocal
  alt: "Le bocal du liquide de refroidissement et son bouchon : le niveau se lit moteur froid, entre les repères mini et maxi ; moteur chaud, on attend avant d'ouvrir le bouchon"
  legende: "Niveau à lire moteur froid, entre les repères mini et maxi. Le circuit est sous pression : la notice Seat Ibiza interdit d'ouvrir le bouchon moteur chaud ; les notices Peugeot 208 et Citroën C3 demandent d'attendre au moins une heure, ou, en urgence, de le dévisser de deux tours avec un chiffon."
symptome: "Le voyant de température s'allume en rouge, l'aiguille monte dans la zone rouge, ou de la vapeur sort du capot."
carburant: essence et diesel
contexte:
  - en roulant
  - moteur chaud
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leur tableau des anomalies et leurs rubriques sur le liquide de refroidissement."
  sources:
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-citroen-c3
    - notice-seat-ibiza
    - notice-toyota-yaris
sources:
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-seat-ibiza
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
causes:
  - cause: Niveau de liquide de refroidissement trop bas
    explication: "Un appoint entre deux révisions est normal, selon les notices Peugeot 208 et Citroën C3, mais un niveau insuffisant présente des risques de dommages importants pour le moteur."
    pieces:
      - appoint-liquide-de-refroidissement
  - cause: Fuite de liquide de refroidissement
    explication: "C'est une cause du tableau des anomalies des notices Renault Clio 5 et Dacia Sandero 3 quand le moteur chauffe. La notice Seat Ibiza demande de faire inspecter le système de refroidissement par un atelier spécialisé si vous perdez du liquide."
    pieces:
      - durites-et-colliers
  - cause: Motoventilateur en panne
    explication: "Autre cause du même tableau des notices Renault Clio 5 et Dacia Sandero 3, quand l'aiguille est dans la zone d'alerte et que le voyant s'allume. La notice Toyota Yaris demande aussi de contrôler le ventilateur."
    pieces:
      - motoventilateur
  - cause: Joint de culasse détérioré
    explication: "Selon les notices Renault Clio 5 et Dacia Sandero 3, c'est la cause d'un liquide qui bouillonne dans le bocal : une panne mécanique."
    pieces:
      - joint-de-culasse
  - cause: Court-circuit sous le capot
    explication: "Selon les notices Renault Clio 5 et Dacia Sandero 3, une fumée sous le capot peut venir d'un court-circuit, ou d'une fuite du circuit de refroidissement."
    pieces:
      - faisceau-et-connecteurs
---

## Moteur qui surchauffe : le premier réflexe

Un moteur qui surchauffe se voit au voyant de température rouge, à l'aiguille dans la zone rouge, ou à de la vapeur sous le capot. Le voyant rouge impose l'arrêt dans les cinq notices du tableau des notices ; l'aiguille dans la zone rouge, dans la notice Toyota Yaris ; la fumée ou la vapeur sous le capot, dans les notices Toyota Yaris, Renault Clio 5 et Dacia Sandero 3. Ensuite, tout se vérifie moteur froid : suivez les questions ci-dessous.

## Le bon geste selon ce que vous voyez

{{arbre}}

1. Le voyant de température est-il allumé en rouge, ou l'aiguille dans la zone rouge ?
   - Oui : arrêtez-vous et laissez refroidir le moteur ; moteur froid, vérifiez le bocal (question 4). Si le voyant reste allumé ou se rallume, ne repartez pas. {{verdict:temperature-rouge}}
   - Non : passez à la question 2.
2. De la fumée ou de la vapeur sort-elle de sous le capot ?
   - Oui : coupez le contact, éloignez-vous de la voiture et n'ouvrez pas le capot. {{verdict:ligne-2}}
   - Non : passez à la question 3.
3. Sans ouvrir le bocal, voyez-vous le liquide de refroidissement bouillonner ?
   - Oui : arrêtez le moteur. {{verdict:ligne-3}}
   - Non : passez à la question 4.
4. Moteur froid, que montre le bocal ?
   - Il est vide : ne roulez pas. {{verdict:ligne-4}}
   - Le niveau est proche du repère mini, ou en dessous : faites l'appoint. {{verdict:ligne-5}}
   - Le niveau est correct, mais la température reste au-dessus de la normale : faites vérifier la voiture. {{verdict:ligne-6}}
   - Le niveau est correct et la température est normale : surveillez le voyant et l'aiguille ; s'ils signalent de nouveau une surchauffe, reprenez à la question 1.

## Voyant de température rouge : s'arrêter

{{repere:temperature-rouge}}

Le voyant de température rouge impose l'arrêt dans les cinq notices du tableau des notices, plus bas, qui donne la consigne de chaque marque. Elles diffèrent ensuite sur le moteur : coupé tout de suite, ou laissé au ralenti une à deux minutes puis coupé, selon la marque.

La notice {{notice:notice-toyota-yaris}} range aussi parmi les signes de surchauffe l'aiguille dans la zone rouge, une perte de puissance du moteur et de la vapeur sous le capot, et demande alors d'arrêter la voiture dans un endroit sûr ({{cite:notice-toyota-yaris|p. 322-323}}). Elle demande aussi de contrôler que le ventilateur fonctionne, et d'arrêter immédiatement le moteur s'il ne tourne pas.

## Vapeur ou fumée sous le capot

{{repere:ligne-2}}

Une fumée sous le capot peut venir d'un court-circuit ou d'une fuite du circuit de refroidissement : les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} demandent de s'arrêter, de couper le contact et de s'éloigner de la voiture ({{cite:notice-renault-clio-5|p. 386}} ; {{cite:notice-dacia-sandero-3|p. 348-349}}). La notice {{notice:notice-seat-ibiza}} interdit d'ouvrir le capot tant que de la vapeur ou du liquide de refroidissement s'en échappe ({{cite:notice-seat-ibiza|p. 290}}).

## Le liquide bouillonne dans le bocal

{{repere:ligne-3}}

Selon les notices Renault Clio 5 et Dacia Sandero 3, un liquide de refroidissement qui bouillonne dans le bocal signale une panne mécanique : un joint de culasse détérioré. Elles demandent d'arrêter le moteur et de faire appel à un représentant de la marque ({{cite:notice-renault-clio-5|p. 387}} ; {{cite:notice-dacia-sandero-3|p. 348-349}}).

## Bocal vide : ne pas faire l'appoint

{{repere:ligne-4}}

La notice Seat Ibiza ne permet l'appoint que s'il reste du liquide dans le vase d'expansion : sinon, le moteur pourrait être endommagé. Le bocal vide, elle demande de s'arrêter et de faire appel à un spécialiste ({{cite:notice-seat-ibiza|p. 298}}).

Les notices Renault Clio 5 et Dacia Sandero 3 parlent du bocal vide pour un moteur qui chauffe, témoin de température allumé : elles demandent alors de consulter un représentant de la marque le plus tôt possible ({{cite:notice-renault-clio-5|p. 387}} ; {{cite:notice-dacia-sandero-3|p. 348-349}}). Ce témoin allumé, elles demandent aussi de s'arrêter, comme pour le voyant de température rouge plus haut : {{verdict:temperature-rouge}}.

## Faire l'appoint de liquide de refroidissement

{{repere:ligne-5}}

Le contrôle et l'appoint se font moteur froid, selon les notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}} : si le niveau est proche du repère mini ou en dessous, l'appoint est impératif, sans dépasser le repère maxi ({{cite:notice-peugeot-208|p. 167}} ; {{cite:notice-citroen-c3|p. 113}}). La notice Seat Ibiza demande de contrôler le niveau voiture à l'horizontale, contact coupé ({{cite:notice-seat-ibiza|p. 298}}). Utilisez le liquide préconisé par votre notice.

Le circuit est sous pression : la notice Seat Ibiza interdit d'ouvrir le bouchon du vase d'expansion tant que le moteur est chaud, à cause du risque de brûlure ({{cite:notice-seat-ibiza|p. 298}}). Les notices Peugeot 208 et Citroën C3 demandent d'attendre au moins une heure après l'arrêt du moteur ; en cas d'urgence, de dévisser le bouchon de deux tours avec un chiffon pour laisser retomber la pression ({{cite:notice-peugeot-208|p. 167}} ; {{cite:notice-citroen-c3|p. 113}}). La notice Renault Clio 5 interdit de remplir avec du liquide froid un moteur très chaud ({{cite:notice-renault-clio-5|p. 387}}).

Un appoint de temps en temps est normal. Si le niveau baisse beaucoup, la notice Peugeot 208 demande de faire vérifier le circuit par le réseau ou un atelier qualifié ({{cite:notice-peugeot-208|p. 165}}), et la notice Seat Ibiza de le faire inspecter si vous perdez du liquide ({{cite:notice-seat-ibiza|p. 298}}).

## Température au-dessus de la normale, sans voyant

{{repere:ligne-6}}

La notice Toyota Yaris range une température du liquide de refroidissement continuellement au-dessus de la normale parmi les indices d'une réparation nécessaire, sans écrire de délai ({{cite:notice-toyota-yaris|p. 242}}). Elle range aussi l'aiguille de température continuellement au-dessus de la normale parmi les symptômes de sa rubrique « Si vous pensez qu'il y a un problème », qui demande de contacter un réparateur dès que possible ({{cite:notice-toyota-yaris|p. 291}}). Le délai le plus court l'emporte.
