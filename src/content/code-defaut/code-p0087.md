---
# Page « code P0087 » de la vague A (modèle de page code défaut ; exemple du livrable 6.6b, publié sans changement,
# validé par Houssem le 14/11/2026). Passée de exemples/ à src/content par la pull request du lot 2 (règle de passage,
# travaux/etape-8/regle-de-passage.md). La ligne de l'encadré vient de la base voyants validée (voyant moteur).
id: code-p0087
title: "Code P0087 : pression de carburant trop basse, peut-on rouler ?"
h1: "Code défaut P0087 : pression de la rampe de carburant trop basse"
description: "Code P0087 : pression de carburant trop basse dans la rampe. Avec le voyant moteur allumé, arrêtez-vous immédiatement. Causes et cas par marque."
libelle_court: Code P0087
question_decision: Puis-je continuer à rouler avec le code P0087 ?
situations:
  - voyant: moteur-orange-fixe
voyants:
  - moteur-orange-fixe
element_unique: tableau
code: P0087
libelle: Pression de la rampe ou du circuit de carburant trop basse
libelle_sources:
  - ross-tech-p0087
  - bulletin-kia-ti017-p0087
portee: generique
carburant: essence et diesel
precisions_par_marque:
  - marque: Peugeot et Citroën
    precision: "Peugeot 4007, 407 et 807, Citroën C5, C6, C8 et C-Crosser 2,2 HDi FAP (filtre à particules ; moteur DW12, codes 4HX et 4HY), à partir de 2006 : démarrage et puissance insuffisants, voyant moteur allumé, codes P0087/135 (pression trop basse) et P0093/147 (fuite importante détectée). Les fiches Hella désignent comme cause possible un filtre à carburant colmaté par l'additif Eolys 176 : le filtre est à remplacer."
    sources:
      - hella-peugeot-2-2-hdi-p0087
      - hella-citroen-2-2-hdi-p0087
  - marque: Audi
    precision: "A4, allroad, A5, A6 et Q5 2.0 TFSI de l'année-modèle 2013, vendues aux États-Unis : voyant moteur allumé et perte de performances, code P008700. Le bulletin d'Audi du 12/03/2013 l'explique par la chaleur dans la rampe dans des conditions de conduite extrêmes (longs ralentis, circulation en accordéon prolongée), qui forme des bulles de vapeur dans le carburant. Pour ce cas, il demande de ne remplacer aucune pièce et de ne pas mettre à jour le logiciel, et signale que la climatisation atténue le défaut ; une modification du logiciel était alors à l'étude pour la production."
    sources:
      - bulletin-audi-2033211-p0087
  - marque: Kia
    precision: "Optima 2.0 et 2.4 de 2011-2012, vendues aux États-Unis : puissance réduite et voyant moteur allumé, code P0087. La fiche technique de Kia recommande de remplacer la pompe haute pression et la conduite métallique de carburant."
    sources:
      - bulletin-kia-ti017-p0087
  - marque: Groupe Volkswagen (Volkswagen et Audi)
    precision: "Selon Ross-Tech, éditeur d'un logiciel de diagnostic des voitures du groupe Volkswagen : sur les moteurs essence 2.0 TFSI (AXX, BGB, BPJ, BPY, BWA), des bulletins du constructeur visent un capteur de pression de carburant amélioré (G410, Amérique du Nord) et un arbre à cames d'admission usé (Amérique du Nord et reste du monde) ; sur les diesel TDI à rampe commune, des bulletins visent un carburant contaminé ou mal adapté au froid. Ces bulletins n'ont pas été lus."
    sources:
      - ross-tech-p0087
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des documents techniques cités : aucun des passages lus des notices d'utilisation ne parle de ce code."
  sources:
    - ross-tech-p0087
    - bulletin-kia-ti017-p0087
    - hella-peugeot-2-2-hdi-p0087
    - hella-citroen-2-2-hdi-p0087
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
  - ross-tech-p0087
  - bulletin-kia-ti017-p0087
  - bulletin-audi-2033211-p0087
  - hella-peugeot-2-2-hdi-p0087
  - hella-citroen-2-2-hdi-p0087
  - bosch-rampe-common-rail
auteur: houssem-jeddou
date_publication: 2026-11-03
date_modification: 2026-11-21
date_revue: 2026-11-03
prochaine_revue: 2027-11-03
# Encadré de décision (question, ligne, coût probable et pièces des causes) validé par Houssem le 03/11/2026 (20 h 06),
# avec les sources, la fiche, les cas par marque, les faits du texte et les cinq décisions du paquet
# (travaux/etape-6/paquet-6.6b-code-p0087.md).
validation: 695527fe95d5516024822ba292d2571c57d8856fe9b91bb7fec677bfbcbefdf0
causes:
  - cause: Pompe à carburant qui ne débite pas assez
    explication: "Pour les voitures du groupe Volkswagen, Ross-Tech demande de contrôler la quantité de carburant fournie par la pompe à carburant."
    pieces:
      - pompe-a-carburant
  - cause: Fuite ou conduite écrasée sur le circuit basse pression
    explication: "Pour les voitures du groupe Volkswagen, Ross-Tech demande de chercher une conduite de carburant pliée ou écrasée, et une fuite sur le circuit basse pression."
    pieces:
      - durites-et-colliers
  - cause: Filtre à carburant colmaté
    explication: "Les fiches Hella des Peugeot 4007, 407, 807 et Citroën C5, C6, C8, C-Crosser 2,2 HDi en font une cause possible du code sur ces voitures ; Ross-Tech demande de vérifier le filtre à carburant."
    pieces:
      - filtre-a-carburant
  - cause: Pompe haute pression défaillante
    explication: "Pour les Kia Optima 2.0 et 2.4 de 2011-2012 vendues aux États-Unis, la fiche technique de Kia recommande de remplacer la pompe haute pression et sa conduite métallique."
    pieces:
      - pompe-haute-pression
  - cause: Capteur de pression de carburant
    explication: "Pour les 2.0 TFSI du groupe Volkswagen vendues en Amérique du Nord, Ross-Tech renvoie à un bulletin du constructeur sur un capteur de pression de carburant amélioré (G410)."
    pieces:
      - capteur-ou-sonde
  - cause: Injecteur qui fuit
    explication: "Ross-Tech cite une perte de pression par un injecteur qui fuit."
    pieces:
      - injecteurs
format: 2
illustration:
  fichier: code-p0087-circuit-carburant
  alt: "Schéma du circuit de carburant : réservoir et pompe, filtre, pompe haute pression, rampe avec son capteur de pression, injecteurs"
  legende: "Le carburant va du réservoir à la rampe, où un capteur mesure la pression que le calculateur surveille. En orange, les pièces que citent les causes de cette page."
---

## Peut-on rouler avec le code P0087 et le voyant moteur orange allumé fixe ?

{{repere:moteur-orange-fixe}}

Le code P0087 se lit avec un appareil de diagnostic. Dans les bulletins de Kia et d'Audi et les fiches Hella, il s'accompagne du voyant moteur allumé. Avec ce voyant, la consigne de l'encadré est celle de la notice {{notice:notice-toyota-yaris}}, la plus prudente des notices lues sur ce voyant ; l'encadré dit aussi quand repartir.

Si le code est lu sans que le voyant moteur soit allumé, aucune des notices lues ne donne de consigne : demandez l'avis d'un professionnel.

## Que signifie le code P0087 ?

Ce code défaut (DTC, de l'anglais Diagnostic Trouble Code) signale une pression trop basse dans la rampe ou dans le circuit de carburant. Sur les systèmes diesel à rampe commune décrits par Bosch, le capteur de pression de la rampe transmet la pression au calculateur, qui s'en sert pour la régler. Les documents cités le décrivent sur des moteurs diesel (2,2 HDi, fiches Hella) comme sur des moteurs essence (2.0 TFSI, bulletin d'Audi et Ross-Tech).

## P0087 ou P008700 ?

Dans le bulletin d'Audi, le même défaut est écrit P0087 dans le titre et P008700 dans le texte ({{cite:bulletin-audi-2033211-p0087|rubrique « Technical Background »}}). Le wiki de Ross-Tech le range sous la référence 16471/P0087/000135.

## Symptômes du code P0087

Les documents cités décrivent :

- une perte de puissance (Kia, Audi, Ross-Tech, fiches Hella) ;
- des difficultés de démarrage (fiches Hella, 2,2 HDi) ;
- le voyant moteur allumé (Kia, Audi, fiches Hella).

## Que faire avec le code P0087 ?

1. Si le voyant moteur est allumé, suivez d'abord la consigne de l'encadré, en haut de page.
2. Au garage, le diagnostic commence par les valeurs mesurées de la pression de carburant, puis passe par les points de contrôle des causes ci-dessus, selon Ross-Tech pour le groupe Volkswagen ({{cite:ross-tech-p0087|rubrique « Possible Solutions »}}).
3. Le code seul ne désigne pas la pièce à changer : la fiche technique de Kia rappelle qu'elle ne remplace pas un vrai diagnostic, et le bulletin d'Audi demande, pour son cas, de ne remplacer aucune pièce et de ne pas mettre à jour le logiciel ({{cite:bulletin-audi-2033211-p0087|rubrique « Service »}}).

## Régulateur de pression : comment savoir s'il est en cause ?

Selon Bosch, sur les systèmes diesel à rampe commune, la rampe porte toujours, en plus du capteur de pression, une vanne de régulation ou un limiteur de pression : la vanne fixe la pression que demande le calculateur, le limiteur la réduit en cas de surcharge. Ross-Tech montre aussi une vanne de dosage du carburant (N290) sur des moteurs TDI ({{cite:ross-tech-p0087|rubrique « Special Notes »}}). Aucune des sources citées ne donne de test à faire soi-même : c'est la lecture des valeurs au diagnostic qui le dit.

## P0087 sur un autre moteur ou une autre marque (1.4 HDi, 1.6 HDi, Mercedes)

Le code garde la même signification sur toutes les marques : c'est un code générique (voir la fiche du code).

Mais les documents lus ne décrivent aucun cas sur ces moteurs ni sur les Mercedes. Les causes ci-dessus sont celles que ces documents décrivent pour d'autres voitures : seul le diagnostic dit d'où vient le défaut sur la vôtre. La marche à suivre reste la même : la consigne de l'encadré si le voyant moteur est allumé, puis le diagnostic.
