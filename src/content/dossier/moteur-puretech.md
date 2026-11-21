---
# Page « moteur PureTech » (modèle dossier) de la vague B, rédigée pour la porte 10 le 15 et le 16/11/2026, sources relues à l'écran
# (travaux/etape-10/textes/), validée par Houssem le 16/11/2026 à 19 h 26 (« Je valide les exemples de la porte 10 »,
# journal, PR n° 72) dans la version de preparation/etape-10 à b9b0835. Empreinte posée par la pull request du lot B1,
# sur la base du lot F2 fusionnée. Passée de exemples/ à src/content par cette pull request (règle de passage).
id: moteur-puretech
title: "Moteurs PureTech : courroie, huile, rappels et prise en charge"
h1: "Moteur 1.2 PureTech : votre voiture est-elle concernée, et que faire ?"
description: "Courroie qui se dégrade, consommation d'huile, pompe à vide : les rappels publiés par RappelConso, les alertes à ne pas ignorer et la couverture spéciale du constructeur, datée."
libelle_court: Moteur PureTech
question_decision: "Moteur PureTech : puis-je continuer à rouler si une alerte s'allume ou si un rappel me concerne ?"
situations:
  - voyant: huile-pression-rouge
  - voyant: huile-niveau
  - situation: "À la jauge, le niveau d'huile est sous le repère mini"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Ne démarrez pas le moteur : complétez d'abord le niveau avec une huile conforme au plan d'entretien, par petites quantités, puis revérifiez à la jauge quelques minutes après."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 166, « Huile moteur », « Vérification avec la jauge manuelle »"
        extrait: "Ne pas démarrer le moteur si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 112-113, « Huile moteur », « Vérification avec la jauge manuelle »"
        extrait: "Ne pas démarrer le moteur, si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur."
        verdict: non, arrêt immédiat
        urgence: immédiate
  - situation: "À la jauge, le niveau d'huile est au-dessus du repère maxi"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Ne démarrez pas le moteur : faites appel au réseau de la marque ou à un atelier qualifié."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 166, « Huile moteur », « Vérification avec la jauge manuelle »"
        extrait: "Ne pas démarrer le moteur si le niveau est : – Supérieur au repère A : faire appel au réseau PEUGEOT ou à un atelier qualifié."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 112-113, « Huile moteur », « Vérification avec la jauge manuelle »"
        extrait: "Ne pas démarrer le moteur, si le niveau est : – Supérieur au repère A : faire appel au réseau CITROËN ou à un atelier qualifié."
        verdict: non, arrêt immédiat
        urgence: immédiate
  - voyant: entretien-vidange
  - situation: "Votre voiture fait partie d'un rappel officiel de la pompe à vide (assistance de freinage) qui n'a pas encore été réalisé"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Contactez un concessionnaire de la marque, comme le demande la fiche de rappel, et faites réaliser l'opération avant de reprendre la route : la fiche signale un risque de perte d'assistance de freinage."
    citations:
      - source: rappelconso-48835
        emplacement: "fiche A12/01504/20 (Citroën et DS) du 20/11/2020, « Motif du rappel » et « Conduite à tenir par le consommateur »"
        extrait: "La pompe à vide peut être endommagée par l’abrasion du matériau de la courroie de cog. Par conséquent, l’assistance au freinage pourrait être réduite ou perdue, augmentant ainsi le risque d’accident. […] contacter le concessionnaire"
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: rappelconso-48836
        emplacement: "fiche A12/01505/20 (Peugeot) du 20/11/2020, « Motif du rappel » et « Conduite à tenir par le consommateur »"
        extrait: "La pompe à vide peut être endommagée par l’abrasion du matériau de la courroie de cog. Par conséquent, l’assistance au freinage pourrait être réduite ou perdue, augmentant ainsi le risque d’accident. […] contacter le concessionnaire"
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: rappelconso-48204
        emplacement: "fiche A11/00077/23 (Opel et Peugeot), « Motif du rappel » et « Conduite à tenir par le consommateur »"
        extrait: "La lubrification de la pompe à vide peut être insuffisante, ce qui peut provoquer une rupture […] ce qui peut entraîner une réduction de l’assistance au freinage, créant ainsi un risque d’accident. […] contacter le concessionnaire"
        verdict: non, arrêt dès que possible
        urgence: immédiate
voyants:
  - huile-pression-rouge
  - huile-niveau
  - entretien-vidange
element_unique: tableau
format: 2
illustration:
  fichier: jauge-huile
  alt: "La jauge d'huile du moteur, à lire sur un sol plat, moteur arrêté depuis 30 minutes : le niveau doit se situer entre les repères mini et maxi"
  legende: "Contrôle du niveau d'huile, selon les notices Peugeot 208 et Citroën C3 : sur un sol plat, moteur à l'arrêt depuis 30 minutes, le niveau se situe entre les repères mini et maxi de la jauge."
journal_modifications:
  - date: 2026-11-21
    resume: "Consigne de sécurité ajoutée sous le tarif du dépannage sur autoroute : feux de détresse et gilet, selon l'article R416-19 du code de la route."
  - date: 2026-11-16
    resume: "Première version du dossier : rappels publiés par RappelConso en 2020 et 2023, alertes et contrôle du niveau d'huile, couverture spéciale et plateforme d'indemnisation du constructeur."
cout_probable:
  pieces:
    - appoint-huile
    - vidange
    - courroie-de-distribution-a-l-echeance
    - distribution-cassee-ou-usee
  base_de_calcul: "La dépense va de l'appoint d'huile, que vous faites vous-même, à la distribution usée ou cassée avant l'échéance (liste des pièces du site). La couverture spéciale du constructeur peut la prendre en charge, sous conditions."
  prise_en_charge:
    - couverture-speciale-puretech
  sources:
    - peugeot-puretech-solutions
    - rappelconso-48835
sources:
  - rappelconso-48835
  - rappelconso-48836
  - rappelconso-48204
  - peugeot-puretech-solutions
  - stellantis-puretech-indemnisation-2025
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-seat-ibiza
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-15
date_modification: 2026-11-21
date_revue: 2026-11-16
prochaine_revue: 2027-02-16
validation: e663cb5dc67cd375fdb2cc38574590fbedfefd03f5d10f6e0bd7d7b662a7dd31
---

## Le moteur 1.2 PureTech en bref

Les PureTech 1.0 et 1.2 sont des moteurs essence du groupe Stellantis, montés notamment sur des Citroën, DS, Opel et Peugeot. Sur leurs générations précédentes, Stellantis indemnise des clients qui ont eu des frais de réparation à cause d'une consommation d'huile excessive ou d'une dégradation prématurée de la courroie de distribution. Selon lui, les PureTech actuels ont été revus, avec 70 % de pièces nouvelles ({{cite:stellantis-puretech-indemnisation-2025|communiqué du 7 mai 2025}}).

Ce dossier est daté et revu au moins tous les trois mois : les conditions de prise en charge peuvent changer.

## Les rappels officiels sur la pompe à vide

{{repere:ligne-6}}

{{tableau}}

| Fiche RappelConso | Publiée le | Modèles | Période indiquée par la fiche | Motif | Conduite à tenir |
|---|---|---|---|---|---|
| A12/01504/20 (Citroën et DS) | 20/11/2020 | Berlingo, C3, C3 Picasso, C4, C4 Cactus, C4 Picasso, DS3, DS4 à moteur turbo essence de 1,2 litre | Fabrication de mars 2013 à avril 2017 | La pompe à vide peut être endommagée par l'abrasion de la courroie : assistance de freinage réduite ou perdue, risque d'accident | Contacter le concessionnaire |
| A12/01505/20 (Peugeot) | 20/11/2020 | 208, 308, 2008, 3008, 5008, Partner à moteur turbo essence de 1,2 litre | Fabrication de mars 2013 à avril 2017 | La pompe à vide peut être endommagée par l'abrasion de la courroie : assistance de freinage réduite ou perdue, risque d'accident | Contacter le concessionnaire |
| A11/00077/23 (Peugeot, Opel) | 16/06/2023, mise à jour le 18/06/2026 | 2008, 208, 3008, 308, 5008, Partner, Grandland X, Crossland X (moteur non précisé par la fiche) | Peugeot : du 03/04/2017 au 11/12/2020 ; Opel : du 12/04/2017 au 28/08/2018 (la fiche ne dit pas à quoi correspondent ces dates) | La lubrification de la pompe à vide peut être insuffisante : rupture possible, assistance de freinage réduite, risque d'accident | Contacter le concessionnaire |

Ces fiches viennent du système d'alerte européen EU Safety Gate, publiées en France par RappelConso ; les deux premières visent le moteur turbo essence de 1,2 litre, la troisième ne précise pas le moteur. Traduites automatiquement, les deux premières parlent d'une « courroie de cog », c'est-à-dire une courroie crantée. Pour savoir si votre voiture est concernée et si l'opération a déjà été faite, contactez un concessionnaire de la marque : c'est la conduite à tenir écrite sur chaque fiche.

## Une alerte s'allume sur un moteur PureTech : que faire ?

Les consignes sont celles de tous les moteurs, et l'encadré en haut de page les donne :

- voyant de pression d'huile rouge : {{verdict:huile-pression-rouge}} ;
- alerte de niveau d'huile : {{verdict:huile-niveau}} ;
- voyant ou message d'entretien : {{verdict:entretien-vidange}}.

Sur un PureTech, l'entretien fait à temps compte deux fois : il protège le moteur, et c'est une condition de la couverture spéciale du constructeur.

## Contrôler le niveau d'huile d'un PureTech

Les notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}} demandent de vérifier le niveau sur un sol plat, moteur à l'arrêt depuis 30 minutes, avec l'indicateur du combiné à la mise du contact ou avec la jauge manuelle. Le niveau correct se situe entre les repères maxi et mini de la jauge. Elles préconisent un contrôle, avec appoint si nécessaire, tous les 5 000 km, et rappellent que des appoints entre deux vidanges sont normaux ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-citroen-c3|p. 112-113}}).

Sous le repère mini, ces notices demandent de ne pas démarrer le moteur avant d'avoir complété le niveau ; au-dessus du repère maxi, de ne pas le démarrer et de faire appel au réseau ou à un atelier qualifié. Dans les deux cas, l'encadré dit : {{verdict:ligne-3}}. L'huile doit correspondre à la motorisation et au plan d'entretien, et aucun additif ne doit être ajouté à l'huile moteur ({{cite:notice-peugeot-208|p. 166}}).

## La couverture spéciale du constructeur (relevé du 16/11/2026)

Selon la page de Peugeot consultée le 16/11/2026, certains moteurs PureTech concernés par une consommation d'huile excessive ou une dégradation prématurée de la courroie de distribution bénéficient d'une couverture qui prend en charge 100 % des coûts (pièces et main-d'œuvre) jusqu'à 10 ans ou 180 000 km, au premier des deux termes échus, à partir du début de la garantie constructeur initiale. Elle s'applique selon la date de production de la voiture, et si le plan d'entretien a été respecté ({{cite:peugeot-puretech-solutions|rubrique « Couverture spéciale »}}). Ce dossier revérifie ces conditions à chaque revue.

Si vous avez déjà payé une réparation de la courroie ou liée à une surconsommation d'huile, une plateforme d'indemnisation en ligne existe : selon la même page, elle admet les incidents survenus entre le 1er janvier 2022 et le 31 décembre 2024, à certaines conditions ({{cite:peugeot-puretech-solutions|rubrique « Plateforme d'indemnisation »}}). Stellantis précise ces conditions : l'entretien doit avoir suivi le plan du constructeur, chez n'importe quel professionnel de l'automobile, mais le diagnostic et la réparation doivent avoir été faits dans le réseau agréé ({{cite:stellantis-puretech-indemnisation-2025|conditions d'indemnisation}}).

Le certificat Check+ confirme la couverture spéciale. Sans justificatif d'entretien, la voiture peut être contrôlée pour l'obtenir, avec une participation financière réduite : adressez-vous au concessionnaire ({{cite:peugeot-puretech-solutions|rubrique « Certificat Check+ »}}).

## Courroie de distribution : quand la changer ?

L'intervalle de remplacement est celui du carnet d'entretien de votre voiture, selon Peugeot ({{cite:peugeot-puretech-solutions|rubrique « Questions fréquentes »}}). Ce dossier n'en donne pas d'autre.
