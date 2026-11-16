---
# Page de démonstration du modèle panne au format 2 (lot F1, F1.3c et sa revue), arbre long : jamais publiée (ni dans
# src/content, ni déployée). Lue seulement par la construction de démonstration du format 2 (DEMO_FORMAT2=1,
# dist-demo-format2), rendue par Astro comme une vraie page. Les lignes de l'encadré viennent de la base voyants validée ;
# la question, le symptôme, les causes et le texte sont des textes de démonstration : la vraie page est rédigée et validée
# avec la vague B (étape 10). Sans empreinte de validation : R4-VALIDATION-ABSENTE est une erreur attendue de la
# démonstration. L'illustration est un dessin de démonstration d'une page voisine, signalé comme tel.
id: perte-de-puissance
title: "Perte de puissance voiture : que faire ? (démonstration)"
h1: "Perte de puissance du moteur : que faire ?"
description: Page de démonstration du modèle panne au format 2, jamais publiée.
libelle_court: Perte de puissance
question_decision: Puis-je continuer à rouler si le moteur perd de la puissance ?
situations:
  - voyant: moteur-rouge
  - voyant: huile-pression-rouge
voyants:
  - moteur-rouge
  - huile-pression-rouge
cout_probable:
  base_de_calcul: "Texte de démonstration : la tranche de chaque cause vient de ses pièces (data/couts.json)."
  sources:
    - notice-peugeot-208
sources:
  - notice-peugeot-208
  - notice-seat-ibiza
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-toyota-yaris
element_unique: arbre-de-decision
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
symptome: "Texte de démonstration : le moteur tire moins bien, accélère mal, et un voyant peut s'allumer."
carburant: essence et diesel
contexte:
  - en roulant
  - à l'accélération
  - en côte ou en charge
causes:
  - cause: Filtre à air encrassé (démonstration)
    explication: Texte de démonstration, rédigé avec la vague B. Une explication longue montre la carte sur plusieurs lignes, sans débordement à 375 px.
    pieces:
      - filtre-a-air
  - cause: Turbo défaillant (démonstration)
    explication: Texte de démonstration, rédigé avec la vague B.
    pieces:
      - turbo
  - cause: Défaillance grave du moteur (démonstration)
    explication: Texte de démonstration, rédigé avec la vague B.
    pieces:
      - moteur
format: 2
illustration:
  fichier: voyant-moteur-tableau-de-bord
  alt: Le voyant moteur allumé au tableau de bord (dessin de démonstration d'une page voisine)
  legende: "Dessin de démonstration, repris de la page du voyant moteur : la page réelle aura le sien."
---

## Le voyant moteur est rouge : que faire ?

{{repere:moteur-rouge}}

Texte de démonstration qui cite la notice {{notice:notice-peugeot-208}} ({{cite:notice-peugeot-208|p. 13}}) : la page réelle est rédigée avec la vague B. Il nomme aussi la notice {{notice:notice-toyota-yaris}} et la notice {{notice:notice-renault-clio-5}}, en un seul paragraphe : l'arbre suit, dans la deuxième partie (demande de changement n° 32).

## Selon ce que vous voyez

{{arbre}}

1. Le voyant moteur est-il rouge, ou le témoin STOP s'allume-t-il avec le message « Risque casse moteur » ?
   - Oui : coupez le moteur et faites appel à un garage ou à l'assistance (texte de démonstration). {{verdict:moteur-rouge}}
   - Non : passez à la question 2.
2. Le voyant de pression d'huile rouge est-il allumé ?
   - Oui : texte de démonstration d'une consigne longue, qui passe sur plusieurs lignes à 375 px avant la pastille du verdict, seule sur sa ligne. {{verdict:huile-pression-rouge}}
   - Non : passez à la question 3.
3. Le filtre à air a-t-il dépassé l'échéance du carnet d'entretien ?
   - Oui : prévoyez son remplacement à la prochaine révision (texte de démonstration).
   - Non : passez à la question 4.
   - Vous ne savez pas : le carnet d'entretien de votre voiture l'indique.
4. Le moteur siffle-t-il fort à l'accélération ?
   - Oui : un turbo peut siffler ; lisez la question 5 (texte de démonstration).
   - Non : passez à la question 5.
5. Un voyant rouge s'allume-t-il ensuite ?
   - Le voyant moteur : {{verdict:moteur-rouge}}
   - Le voyant de pression d'huile : {{verdict:huile-pression-rouge}}

## En côte ou en charge

Texte de démonstration. Ce titre ne pose la question d'aucune ligne de l'encadré : il n'a pas de repère.

## Le turbo

Texte de démonstration, rédigé avec la vague B.
