---
# Brouillon de la page « pression des pneus » (étape 8, lot 3 ; modèle pneus et obligations, livrable 6.6c), rédigé le
# 14/11/2026. Il reste ici, hors d'exemples/ et de src/content, jusqu'à la validation de Houssem (tests/porte6.test.ts
# exige l'empreinte de toute page rédigée) : ensuite exemples/pneus/pression-des-pneus.md avec son empreinte, puis
# passage. La ligne de l'encadré vient de la base voyants validée ; texte de référence : annexe I de l'arrêté du
# 18 juin 1991 (Légifrance), relevé dans travaux/etape-8/textes/controle-technique-releve.md.
id: pression-des-pneus
title: "Pression des pneus : où la lire, comment gonfler ses pneus"
h1: "Pression des pneus : la valeur du constructeur, pneus froids, une fois par mois"
description: "La bonne pression est celle du constructeur : étiquette de la porte conducteur, pneus froids, au moins une fois par mois. Où la lire et comment gonfler, marque par marque."
libelle_court: Pression des pneus
question_decision: Puis-je rouler avec des pneus sous-gonflés, et à quelle pression les gonfler ?
situations:
  - voyant: pression-pneus
voyants:
  - pression-pneus
sujet: pression
texte_reference:
  nature: legifrance
  reference: "Arrêté du 18 juin 1991 relatif au contrôle technique des véhicules de 3,5 tonnes au plus, annexe I, point 5.2.3 « Pneumatiques » (version en vigueur depuis le 01/01/2026)"
  source: arrete-1991-06-18-controle-technique
defaillances:
  - niveau: mineure
    signification: "Système de contrôle de la pression des pneus qui fonctionne mal, pneu manifestement sous-gonflé, ou pression anormale ou incontrôlable (points 5.2.3.h.1 et 5.2.3.i.1)"
  - niveau: majeure
    signification: "Système de contrôle de la pression des pneus manifestement inopérant (point 5.2.3.h.2)"
contre_visite:
  delai: "Deux mois après le contrôle technique"
  demarche: "Une défaillance majeure donne un résultat défavorable : la contre-visite se fait dans les deux mois, faute de quoi un nouveau contrôle complet est à refaire (article 7)."
cout_probable:
  pieces:
    - regonflage
    - pneus
  base_de_calcul: "La dépense va du regonflage, que vous faites vous-même, au pneu à remplacer s'il est crevé ou endommagé (liste des pièces du site)."
  sources:
    - notice-dacia-sandero-3
    - notice-peugeot-208
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
  - arrete-1991-06-18-controle-technique
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-14
date_revue: 2026-11-14
prochaine_revue: 2027-05-14
---

## Quelle pression mettre dans ses pneus ?

Celle que le constructeur indique pour votre voiture, et aucune autre : elle dépend du modèle, de la dimension des pneus et de la charge. Elle est écrite sur une étiquette, le plus souvent sur la porte du conducteur, et dans la notice. Ce site ne donne volontairement aucune valeur générale en bars : une valeur moyenne peut être fausse pour votre voiture.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre voiture, c'est sa notice et son étiquette qui font foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

## Où lire la pression et quand la vérifier, selon la notice de chaque marque

{{tableau}}

| Notice | Où lire la pression | Quand la vérifier | Après avoir gonflé |
|---|---|---|---|
| Peugeot 208 | Étiquette collée au niveau de la porte côté conducteur, avec les pressions à vide et en charge et celle de la roue de secours (p. 198) | Une fois par mois, à froid : voiture arrêtée depuis une heure, ou après moins de 10 km à vitesse modérée ; sinon, ajouter 0,3 bar aux valeurs de l'étiquette (p. 110) | Réinitialiser la détection de sous-gonflage (p. 111) |
| Renault Clio 5 phase 2 | Étiquette sur le chant de la porte conducteur : pressions avant, arrière et de la roue de secours (p. 348) | Au moins une fois par mois et avant chaque grand voyage, pneus froids ; si les pneus sont chauds, majorer les valeurs de 0,2 à 0,3 bar et ne jamais dégonfler un pneu chaud (p. 207 et 348) | Réinitialiser l'avertisseur de perte de pression (p. 207-208) |
| Dacia Sandero 3 | Étiquette collée sur le chant de la porte conducteur (p. 179) | Au moins une fois par mois et avant chaque grand voyage, roue de secours comprise, pneus froids (p. 179) | Réinitialiser l'avertisseur de perte de pression (p. 179-180) |
| Seat Ibiza | Étiquette sur la face arrière du cadre de la porte avant gauche (p. 307) | Au moins une fois par mois et avant tout long trajet, toujours pneus froids (p. 306) | Mémoriser la nouvelle pression dans le système (p. 312) |
| Toyota Yaris | Étiquette sur le cadre de la porte du conducteur ; valeurs à froid aussi dans la notice (p. 266, renvoi p. 333) | Au moins une fois par mois ; Toyota recommande toutes les deux semaines (p. 266) | Initialiser le système dans les cas que la notice énumère (p. 261-262) |

## Pneus froids : et si on vérifie la pression à chaud ?

Toutes les notices lues donnent des pressions pour des pneus froids. Pour Peugeot, un pneu est froid quand la voiture est arrêtée depuis une heure, ou après un trajet de moins de 10 km à vitesse modérée ({{cite:notice-peugeot-208|p. 110}}).

Si vous ne pouvez contrôler qu'à chaud, deux notices donnent une correction : ajouter 0,3 bar aux valeurs de l'étiquette pour Peugeot (p. 110), les majorer de 0,2 à 0,3 bar pour Renault, qui précise qu'il ne faut jamais dégonfler un pneu chaud ({{cite:notice-renault-clio-5|p. 348}}). Pour une autre voiture, suivez sa notice.

## Pression avant et arrière, à vide ou en charge

L'étiquette peut donner des pressions différentes à l'avant et à l'arrière, et selon la charge : la Peugeot 208 indique les pressions à vide et en charge ({{cite:notice-peugeot-208|p. 198}}), la Renault Clio 5 phase 2 les pressions avant, arrière et de la roue de secours ({{cite:notice-renault-clio-5|p. 348}}). Selon la notice Renault, les pressions doivent correspondre à l'usage de la voiture : à vide, en charge, sur autoroute ({{cite:notice-renault-clio-5|p. 207}}).

## Pression des pneus avec une remorque

Aucune notice lue ne donne la pression des pneus d'une remorque : demandez-la à son constructeur ou à un professionnel. Pour la voiture qui tracte, la notice {{notice:notice-renault-clio-5}} demande, à pleine charge avec une remorque, de limiter la vitesse à 100 km/h et d'augmenter de 0,2 bar la pression des pneus, en raison du risque d'éclatement ({{cite:notice-renault-clio-5|p. 349}}).

## Comment gonfler ses pneus

1. Vérifiez la pression pneus froids, sinon appliquez la correction de votre notice si elle en donne une.
2. Lisez sur l'étiquette la valeur pour l'avant et pour l'arrière, selon la charge.
3. Contrôlez les quatre pneus et, si la notice le demande, la roue de secours, avec un manomètre ou un compresseur ; la notice Peugeot cite celui du kit de dépannage provisoire ({{cite:notice-peugeot-208|p. 110}}).
4. Ajustez chaque pneu à la valeur de l'étiquette.
5. Réinitialisez le système de surveillance de la pression s'il y en a un : la manipulation de chaque notice est sur la page du [voyant de pression des pneus](/voyants/pression-pneus/).

## Pneus sous-gonflés : ce que vous risquez

Selon la notice {{notice:notice-peugeot-208}}, rouler avec des pneus sous-gonflés, surtout chargé, vite ou longtemps, dégrade la tenue de route, allonge les distances de freinage, use les pneus prématurément et augmente la consommation ({{cite:notice-peugeot-208|p. 110}}). La notice {{notice:notice-seat-ibiza}} prévient que des pneus trop peu gonflés, ou gonflés à des pressions différentes, peuvent s'endommager et faire perdre le contrôle de la voiture ({{cite:notice-seat-ibiza|p. 312}}). Selon Peugeot, une perte de pression ne se voit pas toujours sur le pneu : seul le contrôle de la pression le dit.

## Quand le voyant de pression des pneus s'allume

L'encadré en haut de page donne la consigne : {{verdict:pression-pneus}}. Ce qu'il faut faire ensuite, et comment éteindre le voyant après le regonflage, est sur la page du [voyant de pression des pneus](/voyants/pression-pneus/).

## Pression des pneus au contrôle technique

Le contrôleur technique vérifie les pneus. Un pneu manifestement sous-gonflé, une pression anormale ou impossible à contrôler, ou un système de contrôle de la pression qui fonctionne mal sont des défaillances mineures ; un système manifestement inopérant est une défaillance majeure ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 5.2.3}}). La fiche « Le texte en bref » résume ces points et la contre-visite.
