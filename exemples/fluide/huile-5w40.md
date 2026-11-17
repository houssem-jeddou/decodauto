---
# Brouillon, jamais validé. Étape 11 (vague C), lot C5 : page « huile 5W40 » (modèle fluide, format 2), enfant de la page
# « huile moteur ». Pas d'empreinte tant que Houssem n'a pas validé son encadré (paquet du lot C5).
# - Sources : notice Toyota Yaris p. 247, 248, 330 et 331 (relevé des sources, §18, lue dans le PDF officiel le 17/11/2026
#   vers 21 h 35) ; notices Peugeot 208 p. 166, Citroën C3 p. 113, Renault Clio 5 p. 333, Dacia Sandero 3 p. 296, Seat
#   Ibiza p. 293 (§11, relues à l'écran le 17/11 vers 11 h 50) ; document ACEA 2023 p. 4 (§17 ; source secondaire,
#   document technique, en anglais : traduction signalée sur la page).
# - Aucune des notices de référence lues ne cite la 5W-40 (Toyota n'admet que 0W-16, 0W-20 et 5W-30 ; les cinq autres ne
#   citent aucun grade) : la page le dit, sans liste de voitures ni règle « diesel = 5W40 ».
# - Lignes : ligne 1 (Peugeot p. 166, Citroën p. 113) saisie, classée par la grille.
#   Pas de ligne de la base `huile-niveau` : son écart renvoie au tableau des notices de la page « voyant huile », que le
#   plan ne lie pas à cette page (FORMAT2-ECART) ; l'appoint est traité dans le texte (point à trancher du paquet). Pas de ligne « autre huile versée » : elle vit sur la page « huile moteur ».
# - Illustration : `huile-5w40-bidon`, dessinée pour cette page (travaux/etape-11/generer-illustrations.py).
id: huile-5w40
title: "Huile 5W40 : que veut dire ce grade, et pour quel moteur ?"
h1: "Huile 5W40 : que veut dire 5W40, et puis-je en mettre dans ma voiture ?"
description: "Une 5W40 ne convient que si la notice de votre voiture la cite, et aucune des notices lues ne la cite. Ce que veulent dire 5W et 40, la classe C3 et le bidon."
libelle_court: Huile 5W40
question_decision: "Puis-je mettre de l'huile 5W40 dans ma voiture ?"
reponse_directe: "Seulement si la notice ou le plan d'entretien de votre voiture la cite. Aucune notice lue ne la cite : la Toyota Yaris n'admet que les 0W-16, 0W-20 et 5W-30. Le bidon doit aussi porter la norme demandée."
situations:
  - situation: "La notice ou le plan d'entretien de votre voiture ne cite pas la 5W40"
    verdict: oui avec précautions
    urgence: aucune
    action: "N'en versez pas : faites l'appoint ou la vidange avec l'huile que demande votre notice ou votre plan d'entretien. En cas de doute, demandez au réseau de la marque."
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
  fichier: huile-5w40-bidon
  alt: "L'étiquette d'un bidon d'huile sans marque : le grade SAE 5W-40, une classe ACEA et une norme ; à côté, ce que dit chaque partie du grade : 5W pour le démarrage à froid, 40 pour la viscosité à chaud, et la norme à comparer avec la notice"
  legende: "Sur le bidon, le grade (5W-40) ne suffit pas : cherchez aussi la norme que demande la notice de votre voiture. Sens du grade selon la notice Toyota Yaris."
normes:
  - "Celles de la notice ou du plan d'entretien de votre voiture, qui dit le grade et la norme (Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3, Toyota Yaris)"
  - "Toyota Yaris essence : 0W-16 de préférence ; 0W-20 et 5W-30 admises ; pas de 5W-40"
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
---

## Que veut dire 5W40 ?

C'est un grade de viscosité SAE, inscrit sur le bidon. Selon la notice Toyota Yaris, qui l'explique sur l'exemple de la 0W-16, le nombre avant le W dit l'aptitude de l'huile au démarrage à froid : plus il est petit, plus le moteur démarre facilement par temps froid. Le nombre après le W dit sa viscosité à température élevée : une valeur plus grande convient mieux à des vitesses élevées ou à des charges extrêmes ({{cite:notice-toyota-yaris|p. 330}}).

Pour une 5W40, 5W porte donc sur le démarrage à froid, et 40 sur la viscosité à chaud. Le grade ne suffit pas à choisir une huile : la notice de votre voiture demande aussi une norme, que le bidon doit porter.

## Huile 5W40 : pour quel moteur ?

{{repere:ligne-1}}

Pour celui dont la notice ou le plan d'entretien la cite. Parmi les notices lues, aucune ne la cite : la notice Toyota Yaris n'admet que la 0W-16, la 0W-20 et la 5W-30 ; les notices Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3 et Seat Ibiza ne citent aucun grade ({{cite:notice-toyota-yaris|p. 330}}). Aucune liste de voitures ne remplace la notice de la vôtre.

{{verdict:ligne-1}}, selon l'encadré, si la notice de votre voiture ne cite pas la 5W40. Les notices Peugeot 208 et Citroën C3 demandent, avant un appoint ou une vidange, de vérifier que l'huile corresponde à la motorisation et soit conforme au plan d'entretien ou aux recommandations du constructeur ; chez Peugeot, une huile non recommandée peut faire perdre la garantie contractuelle en cas de défaillance du moteur ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-citroen-c3|p. 113}}).

Si vous avez déjà versé une autre huile que celle de la notice, voyez la page [huile moteur](/huile-moteur/).

## Huile 5W40 diesel ou essence ?

Le grade ne le dit pas, et aucune notice lue ne réserve la 5W40 au diesel ou à l'essence. Chez Seat, les normes d'un appoint d'urgence diffèrent : VW 504 00, 502 00 ou 508 00, ACEA C3 ou API SN en essence, VW 507 00 ou 505 01, ACEA C3 ou API CK-4 en diesel ({{cite:notice-seat-ibiza|p. 293}}).

## 5W40 C3 : que veut dire C3 ?

C3 est une classe du document « Oil Sequences » 2023 de l'ACEA (association des constructeurs européens d'automobiles), en anglais ; les phrases qui suivent en sont une traduction par decodauto. La classe C regroupe des huiles compatibles avec les catalyseurs et les filtres à particules des moteurs essence et diesel, dites « Low SAPS » ; une huile C3 est à niveau de SAPS moyen, prévue pour des intervalles de vidange allongés, dans des moteurs conçus pour des huiles d'une viscosité HTHS d'au moins 3,5 mPa·s. Le document prévient que certaines de ces catégories peuvent ne pas convenir à certains moteurs : en cas de doute, consultez la notice du constructeur ({{cite:acea-oil-sequences-2023|p. 4}}).

Seule la notice de votre voiture dit quelle classe elle demande : chez Seat Ibiza, ACEA C3 est l'une des normes admises pour un appoint d'urgence.

## Faire l'appoint : quelle huile verser ?

Pour un appoint, la notice Toyota Yaris demande une huile du même type que celle qui se trouve déjà dans le moteur ; elle cite une huile de viscosité inadéquate parmi les causes d'une consommation d'huile plus forte ({{cite:notice-toyota-yaris|p. 247-248}}). Pour vérifier le niveau et faire l'appoint, voyez la page [huile moteur](/huile-moteur/), qui renvoie au niveau d'huile.

## 5W40 ou 5W30 : quelle différence ?

Le nombre après le W : 40 au lieu de 30, une viscosité à température élevée plus grande, selon le sens que donne la notice Toyota Yaris. Ce n'est pas une raison de changer de grade : seule la notice de votre voiture dit lequel convient. La page [huile 5W30](/huile-moteur/5w30/) dit ce que les notices disent de ce grade.

## Ce qu'on lit sur un bidon de 5W40

{{tableau}}

| Mention sur le bidon | Ce qu'elle veut dire | Selon |
|---|---|---|
| SAE 5W-40 | Grade de viscosité : 5W pour le démarrage à froid, 40 pour la viscosité à température élevée | Notice Toyota Yaris (exemple de la 0W-16) |
| Symbole service API, en haut « API SERVICE » et une lettre (par exemple SP) | Qualité d'huile désignée par l'API (American Petroleum Institute) | Notice Toyota Yaris |
| Bas du symbole API : « Resource-Conserving » | L'huile contribue à économiser le carburant et à protéger l'environnement | Notice Toyota Yaris |
| Symbole de certification ILSAC, sur l'avant du bidon | Certification de l'ILSAC (International Lubricant Specification Advisory Committee) | Notice Toyota Yaris |
| ACEA C3 | Huile compatible avec le catalyseur et le filtre à particules (« Low SAPS »), niveau de SAPS moyen ; HTHS minimale de 3,5 mPa·s | Document ACEA (traduction decodauto) |
| Norme du constructeur (par exemple VW 504 00 ou 507 00) | Exigence d'une marque : c'est elle que demande la notice de ses voitures | Notice Seat Ibiza |

Le tableau résume les sources lues ({{cite:notice-toyota-yaris|p. 330-331}} ; {{cite:acea-oil-sequences-2023|p. 4}} ; {{cite:notice-seat-ibiza|p. 293}}). Pour votre voiture, sa notice fait foi.
