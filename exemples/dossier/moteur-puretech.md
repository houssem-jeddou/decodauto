---
# BROUILLON de préparation anticipée de l'étape 10 (docs/03, règle 12, quatrième exception, demande de changement n° 21) :
# exemple du modèle dossier, page « moteur PureTech » de la vague B (seul dossier du plan). Rien n'en est présenté à la
# validation, fusionné ni publié avant la fermeture de la porte de l'étape 8. Pas d'empreinte : jamais validé.
# - Sources relues mot pour mot à l'écran le 16/11/2026 (relevé : travaux/etape-10/textes/puretech-verification.md) ;
#   aucune n'est encore au registre (data/sources.json), à ajouter avec le lot : `rappelconso-48835`,
#   `rappelconso-48836`, `rappelconso-48204` (fiches de rappel.conso.gouv.fr), `peugeot-puretech-solutions` (page
#   « Moteurs PureTech, nos solutions » de peugeot.fr), `stellantis-puretech-indemnisation-2025` (communiqué de
#   Stellantis du 7 mai 2025, media.stellantis.com). La page « Stellantis &You » du relevé du 15/11 n'a pas été
#   retrouvée : ce qu'elle seule disait est retiré.
# - Prise en charge à créer dans data/couts.json avec le lot, datée et revérifiée tous les 90 jours :
#   `couverture-speciale-puretech` (source : page du constructeur, catégorie secondaire ; texte validé par Houssem).
# - Ligne saisie « rappel non fait » : niveau proposé par la règle du plus prudent (« contacter le concessionnaire »
#   n'est pas dans la grille), à trancher par Houssem au paquet.
# - Tableau des rappels (`{{tableau}}`) : format provisoire, fixé par la partie technique du modèle dossier.
id: moteur-puretech
title: "Moteurs PureTech : courroie, huile, rappels et prise en charge"
h1: "Moteur 1.2 PureTech : votre voiture est-elle concernée, et que faire ?"
description: "Courroie qui se dégrade, consommation d'huile, pompe à vide : les rappels officiels du 1.2 PureTech, les alertes à ne pas ignorer et la couverture spéciale du constructeur, datée."
libelle_court: Moteur PureTech
question_decision: "Moteur PureTech : puis-je continuer à rouler si une alerte s'allume ou si un rappel me concerne ?"
situations:
  - voyant: huile-pression-rouge
  - voyant: huile-niveau
  - voyant: entretien-vidange
  - situation: "Votre voiture, à moteur 1,2 litre turbo essence, fait partie d'un rappel officiel non encore réalisé (pompe à vide, assistance de freinage)"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Contactez un concessionnaire de la marque avant de reprendre la route, comme le demande la fiche de rappel, et faites réaliser l'opération de rappel."
    citations:
      - source: rappelconso-48835
        emplacement: "fiche A12/01504/20 du 20/11/2020, « Motif du rappel » et « Conduite à tenir par le consommateur »"
        extrait: "La pompe à vide peut être endommagée par l’abrasion du matériau de la courroie de cog. Par conséquent, l’assistance au freinage pourrait être réduite ou perdue, augmentant ainsi le risque d’accident. […] contacter le concessionnaire"
        verdict: non, arrêt dès que possible
        urgence: immédiate
voyants:
  - huile-pression-rouge
  - huile-niveau
  - entretien-vidange
element_unique: tableau
journal_modifications:
  - date: 2026-11-16
    resume: "Brouillon de préparation : rappels RappelConso de 2020 et 2023, couverture spéciale, plateforme d'indemnisation et certificat Check+ du constructeur (sources relues le 16/11/2026)."
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
  - notice-seat-ibiza
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-15
date_modification: 2026-11-16
date_revue: 2026-11-15
prochaine_revue: 2027-02-15
---

## Le moteur 1.2 PureTech en bref

Les PureTech 1.0 et 1.2 sont des moteurs essence du groupe Stellantis, montés sur des Citroën, DS, Opel et Peugeot. Sur leurs générations précédentes (moteurs dits EB), Stellantis reconnaît une consommation d'huile excessive et une dégradation prématurée de la courroie de distribution : il a prolongé leur garantie et ouvert une plateforme d'indemnisation. Selon lui, les PureTech actuels ont été revus, avec 70 % de pièces nouvelles ({{cite:stellantis-puretech-indemnisation-2025|communiqué du 7 mai 2025}}).

Ce dossier est daté et revu au moins tous les trois mois : les règles de prise en charge ont déjà changé plusieurs fois.

## Les rappels officiels sur la pompe à vide

{{tableau}}

| Fiche RappelConso | Publiée le | Modèles | Fabrication | Motif | Conduite à tenir |
|---|---|---|---|---|---|
| A12/01504/20 (Citroën et DS) | 20/11/2020 | Berlingo, C3, C3 Picasso, C4, C4 Cactus, C4 Picasso, DS3, DS4 à moteur turbo essence de 1,2 litre | De mars 2013 à avril 2017 | La pompe à vide peut être endommagée par l'abrasion de la courroie : assistance de freinage réduite ou perdue, risque d'accident | Contacter le concessionnaire |
| A12/01505/20 (Peugeot) | 20/11/2020 | 208, 308, 2008, 3008, 5008, Partner à moteur turbo essence de 1,2 litre | De mars 2013 à avril 2017 | Même motif | Contacter le concessionnaire |
| A11/00077/23 (Peugeot, Opel) | 16/06/2023, mise à jour le 18/06/2026 | 2008, 208, 3008, 308, 5008, Partner, Grandland X, Crossland X (moteur non précisé par la fiche) | Peugeot : du 03/04/2017 au 11/12/2020 ; Opel : du 12/04/2017 au 28/08/2018 | Lubrification de la pompe à vide parfois insuffisante : rupture possible, assistance de freinage réduite, risque d'accident | Contacter le concessionnaire |

Ces fiches viennent du système d'alerte européen EU Safety Gate, publiées en France par RappelConso ; les deux premières visent le moteur turbo essence de 1,2 litre, la troisième ne précise pas le moteur. Pour savoir si votre voiture est concernée et si l'opération a déjà été faite, contactez un concessionnaire de la marque : c'est la conduite à tenir écrite sur chaque fiche.

## Une alerte s'allume sur un moteur PureTech : que faire ?

Les consignes sont celles de tous les moteurs, et l'encadré en haut de page les donne :

- voyant de pression d'huile rouge : {{verdict:huile-pression-rouge}} ;
- alerte de niveau d'huile : {{verdict:huile-niveau}} ;
- voyant ou message d'entretien : {{verdict:entretien-vidange}}.

Sur un PureTech, l'entretien fait à temps compte deux fois : il protège le moteur, et c'est une condition de la couverture spéciale du constructeur.

## La couverture spéciale du constructeur (relevé du 16/11/2026)

Selon la page de Peugeot consultée le 16/11/2026, certains moteurs PureTech concernés par une consommation d'huile excessive ou une dégradation prématurée de la courroie de distribution bénéficient d'une couverture qui prend en charge 100 % des coûts (pièces et main-d'œuvre) jusqu'à 10 ans ou 180 000 km, au premier des deux termes échus, à partir du début de la garantie constructeur initiale. Elle s'applique selon la date de production de la voiture, et si le plan d'entretien a été respecté ({{cite:peugeot-puretech-solutions|rubrique « Couverture spéciale »}}). Le plafond a déjà changé : ce dossier le revérifie à chaque revue.

Si vous avez déjà payé une réparation de la courroie ou liée à une surconsommation d'huile, une plateforme d'indemnisation en ligne existe : selon la même page, elle admet les incidents survenus entre le 1er janvier 2022 et le 31 décembre 2024, à certaines conditions ({{cite:peugeot-puretech-solutions|rubrique « Plateforme d'indemnisation »}}). Stellantis précise ces conditions : l'entretien doit avoir suivi le plan du constructeur, chez n'importe quel professionnel de l'automobile, mais le diagnostic et la réparation doivent avoir été faits dans le réseau agréé ({{cite:stellantis-puretech-indemnisation-2025|conditions d'indemnisation}}).

Pour une voiture d'occasion, le certificat Check+ confirme la couverture spéciale. Sans justificatif d'entretien, la voiture peut être contrôlée pour l'obtenir, moyennant une participation réduite : adressez-vous au concessionnaire ({{cite:peugeot-puretech-solutions|rubrique « Certificat Check+ »}}).

## Courroie de distribution : quand la changer ?

L'intervalle de remplacement est celui du carnet d'entretien de votre voiture, selon Peugeot ({{cite:peugeot-puretech-solutions|rubrique « Questions fréquentes »}}). Aucun intervalle général n'est donné ici : il dépend du moteur et de sa date de fabrication.

## Ce que ce brouillon ne dit pas encore

Section de travail, à retirer avant le paquet : rappels de 2025 et 2026 cités par la presse (1.2 PureTech 82, moteurs hybrides à chaîne) à chercher sur RappelConso ; notices Peugeot et Citroën à lire sur l'huile préconisée et le contrôle du niveau ; signes d'usure de la courroie : aucune source de première main retrouvée (la page « Stellantis &You » du relevé du 15/11 est introuvable), section retirée.
