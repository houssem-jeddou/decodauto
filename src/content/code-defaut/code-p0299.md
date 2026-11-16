---
# Page « code P0299 » de la vague A (étape 8, lot 4a), rédigée le 14/11/2026 et validée par Houssem le 14/11/2026.
# Passée de exemples/ à src/content par la pull request du lot 4a (règle de passage, travaux/etape-8/regle-de-passage.md).
# La ligne de l'encadré vient de la base voyants validée (voyant moteur orange fixe, cité avec le code par les bulletins).
id: code-p0299
title: "Code P0299 : pression de turbo trop faible, peut-on rouler ?"
h1: "Code défaut P0299 : pression de suralimentation du turbo trop faible"
description: "Code P0299 : le turbo ne donne pas la pression que demande le calculateur. Avec le voyant moteur allumé, arrêtez-vous d'abord. Causes et cas décrits par marque."
libelle_court: Code P0299
question_decision: Puis-je continuer à rouler avec le code P0299 ?
situations:
  - voyant: moteur-orange-fixe
voyants:
  - moteur-orange-fixe
element_unique: tableau
code: P0299
libelle: Pression de suralimentation trop faible (turbocompresseur ou compresseur)
libelle_sources:
  - bulletin-audi-2013060-p0299
  - bulletin-vw-2036110-p0299
portee: generique
carburant: essence et diesel
precisions_par_marque:
  - marque: Audi
    precision: "A3, A4 et A4 Cabriolet 2.0 TFSI de 2005 à 2007, vendues aux États-Unis : voyant moteur allumé, code P0299. Selon le bulletin d'Audi du 12/03/2015, il peut venir d'une vanne de recirculation du turbo (N249) défaillante : si sa membrane en caoutchouc est déchirée, la vanne est remplacée."
    sources:
      - bulletin-audi-2013060-p0299
  - marque: Audi
    precision: "A4, A5, A6, Q5 et TT 2.0 TFSI de 2013-2014, vendues aux États-Unis : voyant moteur allumé, parfois une baisse de puissance, code P029900. Selon le bulletin du 26/11/2014, le clip qui relie la tige de l'actionneur au levier de la soupape de décharge (wastegate) peut tomber, et la tringlerie se détache ; elle est raccordée avec un clip neuf, sans remplacer le turbo."
    sources:
      - bulletin-audi-2039006-p0299
  - marque: Volkswagen
    precision: "Jetta, Golf et Jetta SportWagen 2.0 TDI (moteurs CBEA et CJAA) de 2009 à 2014, vendues aux États-Unis : manque de puissance, voyant moteur parfois allumé, code P0299 parmi d'autres. Le bulletin du 15/01/2015 cite une durite de dépression pliée, vrillée ou qui fuit, un goujon de réglage du turbo cassé ou absent ou un carter de turbo qui a tourné, une membrane à dépression du turbo qui fuit, un tuyau de suralimentation fissuré, un raccord qui fuit à l'échangeur d'air, et le logiciel du calculateur ; le turbo n'est remplacé que pour le goujon ou le carter."
    sources:
      - bulletin-vw-2026771-p0299
  - marque: Volkswagen
    precision: "Passat 2.0 TDI (moteur CKRA) de 2012 à 2014, vendues aux États-Unis : voyant moteur allumé, performances réduites ou bruit du turbo, code P0299 possible, avec un arbre de turbine du turbo cassé ou grippé. Pour éviter que la panne ne revienne, le bulletin (version du 24/09/2020) fait rincer tout le circuit d'huile du moteur, puis remplacer la pompe à huile, le turbo avec son collecteur et ses tuyaux d'huile."
    sources:
      - bulletin-vw-2036110-p0299
  - marque: Buick et Chevrolet
    precision: "Buick Encore GX (2020-2023) et Chevrolet Trailblazer (à partir de 2021) à moteur 1.2 (LIH), vendus en Amérique du Nord : voyant moteur allumé, bruit de ferraille au démarrage à froid, code P0299 possible. Le bulletin de General Motors d'août 2023 l'explique par une usure possible de la tringlerie de la soupape de décharge : il fait vérifier la dépression qui commande la soupape et son électrovanne, et remplacer le turbo si la tringlerie est usée."
    sources:
      - bulletin-gm-23-na-058-p0299
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des documents techniques cités : aucun des passages lus des notices d'utilisation ne parle de ce code."
  sources:
    - hella-commande-turbo
    - bulletin-audi-2013060-p0299
    - bulletin-audi-2039006-p0299
    - bulletin-vw-2026771-p0299
    - bulletin-vw-2036110-p0299
    - bulletin-gm-23-na-058-p0299
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
  - hella-commande-turbo
  - bulletin-audi-2013060-p0299
  - bulletin-audi-2039006-p0299
  - bulletin-vw-2026771-p0299
  - bulletin-vw-2036110-p0299
  - bulletin-gm-23-na-058-p0299
auteur: houssem-jeddou
date_publication: 2026-11-15
date_modification: 2026-11-15
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
# Encadré de décision (question, lignes, coût probable et pièces des causes) validé par Houssem le 14/11/2026 (22 h 45),
# avec les faits du texte (paquet travaux/etape-8/paquet-lot-4a.md).
validation: f39168dd6c04ffe2fbc9b5879d37d81d672a963f7bc0b9d946e578833fe5216d
causes:
  - cause: Fuite sur le circuit d'air de suralimentation
    explication: "Pour les Volkswagen 2.0 TDI qu'il nomme, vendues aux États-Unis, le bulletin de Volkswagen cite un tuyau de suralimentation en plastique fissuré, entre le turbo et l'échangeur d'air, et un raccord de durite qui fuit à l'échangeur."
    pieces:
      - durites-et-colliers
  - cause: Commande du turbo défaillante (dépression, membrane, électrovanne, actionneur)
    explication: "Le même bulletin cite une durite de dépression pliée, vrillée ou qui fuit, et une membrane à dépression du turbo qui fuit ; celui de General Motors (moteurs 1.2 LIH vendus en Amérique du Nord) fait vérifier la dépression et l'électrovanne de la soupape de décharge. Selon Hella, la tige de l'actionneur ou les aubes d'un turbo à géométrie variable peuvent se gripper."
    pieces:
      - durites-et-colliers
      - commande-de-turbo
  - cause: Vanne de recirculation ou tringlerie de la soupape de décharge défaillante
    explication: "Pour les 2.0 TFSI qu'il nomme, vendus aux États-Unis, Audi cite une vanne de recirculation dont la membrane est déchirée, et une tringlerie de soupape de décharge détachée : il fait remplacer la vanne, ou raccorder la tringlerie avec un clip neuf, sans changer le turbo."
    pieces:
      - commande-de-turbo
  - cause: Turbo endommagé (arbre de turbine cassé ou grippé, tringlerie de la soupape de décharge usée)
    explication: "Pour les Passat 2.0 TDI de 2012 à 2014 vendues aux États-Unis, Volkswagen fait remplacer le turbo et rincer tout le circuit d'huile du moteur, pour éviter que la panne ne revienne ; pour les moteurs 1.2 LIH vendus en Amérique du Nord, General Motors fait remplacer le turbo quand la tringlerie de sa soupape de décharge est usée."
    pieces:
      - turbo
  - cause: Logiciel du calculateur
    explication: "Pour les Volkswagen 2.0 TDI qu'il nomme, vendues aux États-Unis, le bulletin de Volkswagen demande de vérifier le niveau du logiciel du calculateur."
    pieces:
      - calculateur
format: 2
illustration:
  fichier: code-p0299-circuit-turbo
  alt: "Schéma de la suralimentation : filtre à air, turbo et sa commande, vanne, échangeur, moteur et calculateur"
  legende: "Le turbo, entraîné par les gaz d'échappement, envoie l'air comprimé au moteur par l'échangeur ; sa commande règle la pression. En orange, ce que citent les causes de cette page."
---

## Peut-on rouler avec le code P0299 ?

{{repere:moteur-orange-fixe}}

Le code P0299 se lit avec un appareil de diagnostic. Dans les bulletins d'Audi, de Volkswagen et de General Motors du tableau des cas par marque, il s'accompagne du voyant moteur allumé. Avec ce voyant, la consigne de l'encadré est celle de la notice {{notice:notice-toyota-yaris}}, la plus prudente des notices lues sur ce voyant ; l'encadré dit aussi quand repartir.

Si le voyant moteur clignote, l'action à suivre n'est pas tout à fait la même : voyez la page du [voyant moteur](/voyants/moteur/).

Si le code est lu sans que le voyant moteur soit allumé, aucune des notices lues ne donne de consigne : demandez l'avis d'un professionnel.

## Que signifie le code P0299 ?

Ce code défaut (DTC, de l'anglais Diagnostic Trouble Code) signale que la pression de suralimentation, celle que le turbo (ou le compresseur) envoie au moteur, reste trop faible. L'intitulé anglais des bulletins est « Turbo/Super Charger Underboost » ; le bulletin de Volkswagen sur les 2.0 TDI le décrit comme des valeurs de régulation de la pression de suralimentation sous la limite de régulation.

Selon Hella, la pression de suralimentation est réglée d'après une cartographie du calculateur du moteur, qui envoie la pression voulue à l'actionneur du turbo ; sur un turbo à géométrie variable, l'actionneur oriente les aubes pour l'obtenir. Les défauts sont enregistrés dans la mémoire du calculateur ({{cite:hella-commande-turbo|« Electronic boost pressure control »}}).

Les documents cités décrivent ce code sur des moteurs essence (2.0 TFSI, 1.2 LIH) comme sur des moteurs diesel (2.0 TDI).

## P0299 ou P029900 ?

Les bulletins du groupe Volkswagen écrivent ce code P0299 (Volkswagen, Passat 2.0 TDI) ou P029900 (Audi, 2.0 TFSI de 2013-2014), avec le même intitulé, « Turbo/Super Charger Underboost » ({{cite:bulletin-audi-2039006-p0299|p. 1}}) : c'est le même défaut, et la même marche à suivre.

## Symptômes du code P0299

Les documents cités décrivent :

- le voyant moteur allumé (Audi, Volkswagen, General Motors) ;
- un manque de puissance (Volkswagen 2.0 TDI, Audi 2.0 TFSI de 2013-2014) ;
- un bruit qui vient du turbo (Volkswagen Passat 2.0 TDI), ou un bruit de ferraille au démarrage à froid (Buick et Chevrolet 1.2 LIH).

Selon Hella, une panne de l'actionneur électrique du turbo peut se traduire par une perte de puissance, une accélération faible, le voyant moteur allumé, une vitesse réduite et un mode dégradé ({{cite:hella-commande-turbo|section 3}}).

## Que faire avec le code P0299 ?

1. Si le voyant moteur est allumé, suivez d'abord la consigne de l'encadré, en haut de page.
2. Au garage, le diagnostic commence par la mémoire du calculateur, puis par un contrôle visuel du turbo et de sa commande, comme le recommande Hella ({{cite:hella-commande-turbo|section 5}}). Les bulletins cités font vérifier les durites de dépression, la commande du turbo et les tuyaux d'air de suralimentation, et ne font remplacer le turbo que dans les cas qu'ils décrivent.
3. Le code seul ne désigne pas la pièce à changer. Pour les voitures vendues aux États-Unis qu'ils nomment, plusieurs bulletins règlent le défaut sans remplacer le turbo : une vanne de recirculation (Audi), un clip de tringlerie (Audi), une membrane ou une durite de dépression (Volkswagen).
4. Si le turbo est cassé, la réparation ne s'arrête pas forcément au turbo : pour les Passat 2.0 TDI qu'il nomme, Volkswagen fait rincer tout le circuit d'huile du moteur, et remplacer la pompe à huile et les tuyaux d'huile du turbo avec lui, pour éviter que la panne ne revienne ({{cite:bulletin-vw-2036110-p0299|p. 3 à 5}}).

## P0299 sur une Peugeot (1.6 HDi), une Citroën, une Renault (1.5 dCi), une Ford, une Opel ou une Mercedes

Le code garde la même signification sur toutes les marques : c'est un code générique (voir la fiche du code).

Mais les documents lus ne décrivent aucun cas sur les Peugeot, Citroën, Renault, Ford, Opel, Mercedes, Hyundai ou Mazda, ni sur les moteurs 1.6 HDi et 1.5 dCi. Les cas décrits par marque ci-dessus viennent de bulletins de voitures vendues aux États-Unis ou en Amérique du Nord : ils montrent que le code peut venir d'une fuite, de la commande du turbo comme du turbo lui-même, mais ne valent que pour les modèles nommés. Sur votre voiture, seul le diagnostic dit d'où vient le défaut ; la marche à suivre reste la même.
