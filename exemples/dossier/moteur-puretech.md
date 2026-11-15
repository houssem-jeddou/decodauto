---
# BROUILLON de préparation anticipée de l'étape 10 (docs/03, règle 12, quatrième exception, demande de changement n° 21) :
# exemple du modèle dossier, page « moteur PureTech » de la vague B (seul dossier du plan). Rien n'en est présenté à la
# validation, fusionné ni publié avant la fermeture de la porte de l'étape 8. Pas d'empreinte : jamais validé.
# - Sources relevées dans travaux/etape-10/textes/puretech-releve.md : fiches RappelConso et pages du constructeur lues
#   par l'outil de lecture web, à relire à l'écran ; aucune n'est encore au registre (data/sources.json) :
#   à ajouter avec le lot (`rappelconso-48835`, `rappelconso-48836`, `rappelconso-48204`, `peugeot-puretech-solutions`,
#   `stellantis-puretech-indemnisation-2025`, `stellantis-and-you-puretech`).
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
        emplacement: "fiche A12/01504/20 du 20/11/2020, « Conduite à tenir par le consommateur »"
        extrait: "contacter le concessionnaire"
        verdict: non, arrêt dès que possible
        urgence: immédiate
voyants:
  - huile-pression-rouge
  - huile-niveau
  - entretien-vidange
element_unique: tableau
journal_modifications:
  - date: 2026-11-15
    resume: "Brouillon de préparation : rappels RappelConso de 2020, couverture spéciale du constructeur (relevé du 15/11/2026)."
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
  - stellantis-and-you-puretech
  - notice-peugeot-208
  - notice-seat-ibiza
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-15
date_modification: 2026-11-15
date_revue: 2026-11-15
prochaine_revue: 2027-02-15
---

## Le moteur 1.2 PureTech en bref

Le PureTech est la famille de moteurs essence à trois cylindres du groupe Stellantis (Peugeot, Citroën, DS, Opel). Le constructeur reconnaît, sur les générations précédentes des moteurs 1.0 et 1.2 PureTech, une consommation d'huile excessive et une dégradation prématurée de la courroie de distribution, et il a mis en place une couverture spéciale ({{cite:stellantis-puretech-indemnisation-2025|communiqué du 16/01/2025}}). Selon Stellantis, les moteurs produits après juin 2022 ont reçu d'autres courroies, séparateurs d'huile et segments de pistons ({{cite:stellantis-and-you-puretech|rubrique « Quels sont les moteurs concernés ? »}}).

Ce dossier est daté et revu au moins tous les trois mois : les règles de prise en charge ont déjà changé plusieurs fois.

## Les rappels officiels du 1,2 litre turbo essence

{{tableau}}

| Fiche RappelConso | Publiée le | Modèles | Fabrication | Motif | Conduite à tenir |
|---|---|---|---|---|---|
| A12/01504/20 (Citroën et DS) | 20/11/2020 | Berlingo, C3, C3 Picasso, C4, C4 Cactus, C4 Picasso, DS3, DS4 à moteur turbo essence de 1,2 litre | De mars 2013 à avril 2017 | La pompe à vide peut être endommagée par l'abrasion de la courroie : assistance de freinage réduite ou perdue, risque d'accident | Contacter le concessionnaire |
| A12/01505/20 (Peugeot) | 20/11/2020 | 208, 308, 2008, 3008, 5008, Partner à moteur turbo essence de 1,2 litre | À relire sur la fiche | Même motif | Contacter le concessionnaire |
| À relire (Peugeot, Opel) | À relire | 2008, 208, 3008, 308, 5008, Partner, Grandland X, Crossland X | À relire | Lubrification insuffisante de la pompe à vide : rupture possible, assistance de freinage réduite, risque d'accident | Contacter le concessionnaire |

Ces fiches viennent du système d'alerte européen EU Safety Gate, publiées en France par RappelConso. Pour savoir si votre voiture est concernée et si l'opération a déjà été faite, contactez un concessionnaire de la marque : c'est la conduite à tenir écrite sur chaque fiche.

## Une alerte s'allume sur un moteur PureTech : que faire ?

Les consignes sont celles de tous les moteurs, et l'encadré en haut de page les donne :

- voyant de pression d'huile rouge : {{verdict:huile-pression-rouge}} ;
- alerte de niveau d'huile : {{verdict:huile-niveau}} ;
- voyant ou message d'entretien : {{verdict:entretien-vidange}}.

Sur un PureTech, l'entretien fait à temps compte deux fois : il protège le moteur, et c'est une condition de la couverture spéciale du constructeur.

## La couverture spéciale du constructeur (relevé du 15/11/2026)

Selon la page de Peugeot consultée le 15/11/2026, certains moteurs PureTech concernés par une consommation d'huile excessive ou une dégradation prématurée de la courroie de distribution bénéficient d'une couverture qui prend en charge 100 % des coûts (pièces et main-d'œuvre) jusqu'à 10 ans ou 180 000 km, au premier des deux termes échus, à partir du début de la garantie constructeur initiale ({{cite:peugeot-puretech-solutions|rubrique « Couverture spéciale »}}). La condition principale : avoir suivi le plan d'entretien du constructeur. Le communiqué de Stellantis de janvier 2025 annonçait encore 175 000 km pour cette même extension : le plafond a changé.

Stellantis précise ses conditions : l'entretien peut avoir été fait par n'importe quel professionnel de l'automobile, mais le diagnostic et la réparation doivent être faits dans le réseau agréé ({{cite:stellantis-puretech-indemnisation-2025|conditions d'indemnisation}}).

Si vous avez déjà payé une réparation de la courroie ou liée à une surconsommation d'huile, une plateforme d'indemnisation en ligne existe ; ses dates de dépenses admises sont à vérifier sur la page du constructeur au moment de votre demande.

## Courroie de distribution : quand la changer ?

L'intervalle de remplacement est celui du carnet d'entretien de votre voiture, selon Peugeot ({{cite:peugeot-puretech-solutions|rubrique « Questions fréquentes »}}). Aucun intervalle général n'est donné ici : il dépend du moteur et de sa date de fabrication.

## Les signes d'usure cités par le constructeur

Stellantis cite des bruits de cliquetis, des vibrations inhabituelles et des difficultés au démarrage ({{cite:stellantis-and-you-puretech|rubrique « Quels sont les symptômes d'une courroie de distribution usée ? »}}). Aucun de ces signes ne remplace le contrôle de la courroie au garage.

## Ce que ce brouillon ne dit pas encore

Section de travail, à retirer avant le paquet : fiches RappelConso à relire à l'écran (deux lignes du tableau incomplètes) ; rappels de 2025 et 2026 cités par la presse (1.2 PureTech 82, moteurs hybrides à chaîne) à chercher sur RappelConso ; notices Peugeot et Citroën à lire sur l'huile préconisée et le contrôle du niveau ; dates de la plateforme d'indemnisation (« 18 mars 2024 » dans le communiqué, « 31 décembre 2024 » sur la page de Stellantis) à trancher sur la page en vigueur.
