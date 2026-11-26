---
# Validé par Houssem le 17/11/2026 à 22 h 44, mot pour mot : « Je valide tout ! Goo » (ligne de validation de la page, paquet du lot C5,
# §6). Étape 11 (vague C), lot C5 : page « huile 5W30 » (modèle fluide, format 2), enfant de la page « huile moteur ».
# Empreinte posée après la validation.
# - Sources : notice Toyota Yaris (génération 2020, non hybride) p. 247, 248, 330 et 331 (relevé des sources, §18, lue dans
#   le PDF officiel le 17/11/2026 vers 21 h 35) ; notices Peugeot 208 p. 166, Citroën C3 p. 113, Renault Clio 5 p. 333,
#   Dacia Sandero 3 p. 296, Seat Ibiza p. 293 et 316 (§11, relues à l'écran le 17/11 vers 11 h 50) ; document ACEA 2023
#   p. 4, 6 et 7 (§17, relu à l'écran vers 15 h 20 ; source secondaire, document technique, en anglais : traduction
#   signalée sur la page).
# - Revue indépendante du 17/11 (« à corriger ») : corrections B1, I1 à I5, I7 et mineurs (paquet du lot C5) ; la page mère
#   « huile moteur » n'est pas modifiée (I6, point à trancher du paquet).
# - Pas de ligne de la base `huile-niveau` : son écart renvoie au tableau des notices de la page « voyant huile », que le
#   plan ne lie pas à cette page (FORMAT2-ECART) ; l'appoint est traité dans le texte (point à trancher du paquet). Pas de
#   ligne « autre huile versée » : elle vit sur la page « huile moteur ».
# - Tableau des viscosités et 85W140 : report de la demande de changement n° 35 maintenu.
# - Illustration : `huile-5w30-bidon`, dessinée pour cette page (travaux/etape-11/generer-illustrations.py).
id: huile-5w30
title: "Huile 5W30 : que veut dire ce grade, et pour quel moteur ?"
h1: "Huile 5W30 : que veut dire 5W30, et puis-je en mettre dans ma voiture ?"
description: "Une 5W30 ne convient que si la notice de votre voiture la cite, avec la norme qu'elle demande. Sens de 5W et 30, classes C2, C3 et C4, étiquette du bidon."
libelle_court: Huile 5W30
question_decision: "Puis-je mettre de l'huile 5W30 dans ma voiture ?"
reponse_directe: "Oui, si la notice ou le plan d'entretien de votre voiture la cite : la Toyota Yaris non hybride l'admet, à côté de la 0W-16 qu'elle recommande. Sinon, n'en versez pas. Le bidon doit aussi porter la norme demandée."
situations:
  - situation: "La notice ou le plan d'entretien de votre voiture cite la 5W30 (5W-30) pour son moteur"
    verdict: oui
    urgence: aucune
    action: "Vous pouvez rouler. Pour l'appoint ou la vidange, une 5W30 convient si elle porte aussi la norme que demande la notice : pour la Toyota Yaris non hybride, API SM « Energy-Conserving », SN, SN PLUS ou SP « Resource-Conserving », ou ILSAC GF-6A."
    citations:
      - source: notice-toyota-yaris
        emplacement: "p. 330, 8.1 « Caractéristiques », « Choix de l'huile moteur »"
        extrait: "Grade d'huile : 0W-16 : Huile moteur multigrade API SN “Resource-Conserving”, SN PLUS “Resource-Conserving” ou SP “Resource-Conserving” ou ILSAC GF-6B 0W-20 et 5W-30 : Huile moteur multigrade API grade SM “Energy-Conserving”, SN “Resource-Conserving”, SN PLUS “Resource-Conserving” or SP “Resource-Conserving” ou ILSAC GF-6A"
        verdict: oui
        urgence: aucune
  - situation: "Ni la notice ni le plan d'entretien de votre voiture ne citent la 5W30"
    verdict: oui avec précautions
    urgence: aucune
    action: "Vous pouvez rouler. Pour l'appoint ou la vidange, ne versez pas de 5W30 : prenez l'huile que demande votre notice ou votre plan d'entretien, et demandez au réseau de la marque en cas de doute."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 166, « Huile moteur », « Caractéristiques de l'huile »"
        extrait: "Avant d'effectuer un complément d'huile ou une vidange du moteur, vérifier que l'huile corresponde à la motorisation et soit conforme aux recommandations indiquées dans le plan d'entretien fourni avec le véhicule […]. L'utilisation d'une huile non recommandée peut entraîner la perte de la garantie contractuelle en cas de défaillance du moteur."
        verdict: oui avec précautions
        urgence: aucune
      - source: notice-citroen-c3
        emplacement: "p. 113, « Huile moteur », « Caractéristiques de l'huile »"
        extrait: "Avant d'effectuer un complément d'huile ou une vidange du moteur, vérifier que l'huile correspond à la motorisation et est conforme aux recommandations du constructeur."
        verdict: oui avec précautions
        urgence: aucune
element_unique: tableau
format: 2
illustration:
  fichier: huile-5w30-bidon
  alt: "L'étiquette d'un bidon d'huile sans marque : le grade SAE 5W-30, une classe ACEA, le symbole API et une norme ; à côté, ce que dit chaque partie du grade : 5W pour le démarrage à froid, 30 pour la viscosité à chaud, et la norme à comparer avec la notice"
  legende: "Sur le bidon, le grade (5W-30) ne suffit pas : cherchez aussi la norme que demande la notice de votre voiture. Sens du grade selon la notice Toyota Yaris."
normes:
  - "Celles que demande la notice ou le plan d'entretien de votre voiture ; parmi les notices lues, seule la Toyota Yaris non hybride donne des grades"
  - "Toyota Yaris non hybride : 0W-16 de préférence ; 0W-20 faute de 0W-16, jusqu'à la vidange suivante ; 5W-30 citée, en API SM « Energy-Conserving », SN, SN PLUS ou SP « Resource-Conserving », ou ILSAC GF-6A"
  - "Seat Ibiza : huile conforme aux normes VW."
comment_verifier: "Le niveau se lit à la jauge, entre les repères mini et maxi, au moment que donne votre notice. Pour un appoint, la notice Toyota Yaris demande une huile du même type que celle qui se trouve déjà dans le moteur."
quand_changer:
  texte: "À l'échéance du plan ou du document d'entretien de votre voiture, que rappelle le combiné : la page « huile moteur » donne ce que disent les notices sur la vidange."
  sources:
    - notice-peugeot-208
    - notice-renault-clio-5
    - notice-dacia-sandero-3
cout_probable:
  pieces:
    - appoint-huile
    - vidange
  base_de_calcul: "La dépense va de l'appoint d'huile, que vous faites vous-même, à la vidange (entretien) : le grade ne change pas la nature de la dépense."
  sources:
    - notice-peugeot-208
    - notice-toyota-yaris
sources:
  - notice-toyota-yaris
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-seat-ibiza
  - acea-oil-sequences-2023
auteur: houssem-jeddou
date_publication: 2026-11-17
date_modification: 2026-11-17
date_revue: 2026-11-17
prochaine_revue: 2027-11-17
# Encadré de décision (question, réponse directe, lignes, coût probable) validé par Houssem le 17/11/2026 à 22 h 44
# (lot C5, travaux/etape-11/lot-c5/paquet-lot-c5.md, §6).
validation: 80446a0e659d59fcd13204ac9c4c88312126335378bb8c677804c6cf8aef9110
---

## Que veut dire 5W30 ?

C'est un grade de viscosité SAE, inscrit sur le bidon. Selon la notice Toyota Yaris (génération 2020, non hybride), qui l'explique sur l'exemple de la 0W-16, le nombre avant le W dit l'aptitude de l'huile au démarrage à froid : plus il est petit, plus le moteur démarre facilement par temps froid. Le nombre après le W dit sa viscosité à température élevée : une valeur plus grande convient mieux à des vitesses élevées ou à des charges extrêmes ({{cite:notice-toyota-yaris|p. 330}}).

Pour une 5W30, 5W porte donc sur le démarrage à froid, et 30 sur la viscosité à chaud. Le grade ne suffit pas à choisir une huile : la notice de votre voiture demande aussi une norme, que le bidon doit porter.

## Huile 5W30 : pour quel moteur ?

{{repere:ligne-1}}

Pour celui dont la notice ou le plan d'entretien la cite. La notice Toyota Yaris (génération 2020, non hybride) cite la 5W-30 pour son moteur essence, avec la 0W-16 et la 0W-20 ; elle recommande « de préférence » la 0W-16, montée en usine, pour l'économie de carburant et le démarrage par temps froid. Elle n'admet la 0W-20 que faute de 0W-16, jusqu'à la vidange suivante, et ne dit pas cela de la 5W-30 ({{cite:notice-toyota-yaris|p. 330}}).

{{verdict:ligne-1}}, selon l'encadré : une 5W30 convient si elle porte aussi la norme demandée. Les autres notices lues ne citent aucun grade : Peugeot 208 et Citroën C3 renvoient au plan d'entretien ou aux recommandations du constructeur, Renault Clio 5 et Dacia Sandero 3 au document d'entretien, Seat Ibiza aux normes VW. Aucune liste de voitures ne remplace la notice de la vôtre.

## Ni ma notice ni mon plan d'entretien ne citent la 5W30 : puis-je en mettre ?

{{repere:ligne-2}}

N'en versez pas : les notices Peugeot 208 et Citroën C3 demandent, avant un appoint ou une vidange, de vérifier que l'huile corresponde à la motorisation et soit conforme au plan d'entretien ou aux recommandations du constructeur. Chez Peugeot, une huile non recommandée peut faire perdre la garantie contractuelle en cas de défaillance du moteur ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-citroen-c3|p. 113}}). {{verdict:ligne-2}}, selon l'encadré : la consigne porte sur l'huile à verser, pas sur la conduite.

Si vous avez déjà versé une autre huile que celle de la notice, voyez la page [huile moteur](/huile-moteur/).

## Huile 5W30 et température

Sur le graphique de la notice Toyota Yaris, la 5W-30 couvre, comme la 0W-16 et la 0W-20, toute la plage graduée, de -18 °C à 27 °C, prolongée aux deux extrémités : c'est la plage des températures prévues avant la prochaine vidange ({{cite:notice-toyota-yaris|p. 330}}). Selon le document de l'ACEA, en anglais (traduction decodauto), un constructeur peut indiquer des exigences de viscosité selon la température ambiante ({{cite:acea-oil-sequences-2023|p. 6-7}}).

## Huile 5W30 diesel ou essence ?

Le grade ne le dit pas. Chez Toyota, la liste des grades est celle du moteur essence ; chez Seat, les normes d'un appoint d'urgence diffèrent en partie : VW 504 00, 502 00, 508 00 ou API SN en essence, VW 507 00, 505 01 ou API CK-4 en diesel, et ACEA C3 dans les deux cas ({{cite:notice-toyota-yaris|p. 330}} ; {{cite:notice-seat-ibiza|p. 293}}).

Selon le document de l'ACEA (association des constructeurs européens d'automobiles), en anglais (traduction decodauto), les huiles de la classe C sont prévues pour les moteurs essence et diesel ({{cite:acea-oil-sequences-2023|p. 4}}).

## 5W30 C2, C3 ou C4 : quelle différence ?

Ce sont des classes du document « Oil Sequences » 2023 de l'ACEA, en anglais ; les phrases qui suivent en sont une traduction par decodauto. La classe C regroupe des huiles compatibles avec les catalyseurs et les filtres à particules des moteurs essence et diesel, dites « Low SAPS », un terme que les passages lus ne définissent pas. Le document prévient que certaines de ces catégories peuvent ne pas convenir à certains moteurs : en cas de doute, consultez la notice du constructeur ({{cite:acea-oil-sequences-2023|p. 4}}).

Selon le même document, C2 et C3 sont des huiles à niveau de SAPS moyen et C4 à niveau faible, toutes prévues pour des intervalles de vidange allongés ; C2 vise des moteurs conçus pour des huiles de faible viscosité. Seule la notice de votre voiture dit quelle classe elle demande : chez Seat Ibiza, ACEA C3 est l'une des normes admises pour un appoint d'urgence. La notice Citroën C3 ne cite aucune classe ACEA : « C3 » sur un bidon désigne la classe, pas la voiture.

## Huile Long Life, RN17 : ce que disent les notices

Selon la notice Seat Ibiza, l'entretien flexible utilise une huile longue durée (LongLife) au lieu de l'huile moteur conventionnelle ({{cite:notice-seat-ibiza|p. 316}}). Aucune notice lue n'explique la norme RN17 : les notices Renault Clio 5 et Dacia Sandero 3 renvoient la qualité d'huile au document d'entretien du véhicule ({{cite:notice-renault-clio-5|p. 333}} ; {{cite:notice-dacia-sandero-3|p. 296}}).

## Faire l'appoint : quelle huile verser ?

Pour un appoint, la notice Toyota Yaris demande une huile du même type que celle qui se trouve déjà dans le moteur ({{cite:notice-toyota-yaris|p. 248}}). Pour vérifier le niveau et faire l'appoint, voyez la page [huile moteur](/huile-moteur/), qui renvoie au niveau d'huile.

## Peut-on mettre de la 5W40 au lieu de la 5W30 ?

Seulement si la notice de votre voiture la cite. La notice Toyota Yaris ne cite que la 0W-16, la 0W-20 et la 5W-30 ; elle cite une huile de viscosité inadéquate parmi les causes d'une consommation d'huile plus forte ({{cite:notice-toyota-yaris|p. 247 et 330}}). La page [huile 5W40](/huile-moteur/5w40/) dit ce que les notices disent de ce grade.

## Ce qu'on lit sur un bidon de 5W30

{{tableau}}

| Mention sur le bidon | Ce qu'elle veut dire | Selon |
|---|---|---|
| SAE 5W-30 | Grade de viscosité : 5W pour le démarrage à froid, 30 pour la viscosité à température élevée | Notice Toyota Yaris (exemple de la 0W-16) |
| Symbole service API, en haut « API SERVICE » et un code (par exemple SP) | Qualité d'huile désignée par l'API (American Petroleum Institute) | Notice Toyota Yaris |
| Bas du symbole API : « Resource-Conserving » | L'huile contribue à économiser le carburant et à protéger l'environnement | Notice Toyota Yaris |
| Symbole de certification ILSAC, sur l'avant du bidon | Certification de l'ILSAC (International Lubricant Specification Advisory Committee) | Notice Toyota Yaris |
| ACEA C2, C3 ou C4 | Classe C : huile compatible avec le catalyseur et le filtre à particules (« Low SAPS ») | Document ACEA (traduction decodauto) |
| Norme d'un constructeur (par exemple VW 504 00 ou 507 00) | La notice Seat Ibiza demande une huile conforme aux normes VW | Notice Seat Ibiza |

Le tableau résume les sources lues ({{cite:notice-toyota-yaris|p. 330-331}} ; {{cite:acea-oil-sequences-2023|p. 4}} ; {{cite:notice-seat-ibiza|p. 293}}). Pour votre voiture, sa notice fait foi.
