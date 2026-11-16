---
# Page de démonstration du modèle panne au format 2 (lot F1, revue de F1.3c), arbre court et pastilles de deux gravités :
# jamais publiée, lue seulement par la construction de démonstration du format 2 (DEMO_FORMAT2=1). Lignes de l'encadré
# tirées de la base voyants validée ; textes de démonstration ; sans empreinte (R4-VALIDATION-ABSENTE attendue).
id: voiture-qui-broute
title: "Voiture qui broute : que faire ? (démonstration)"
h1: "Voiture qui broute : que faire ?"
description: Page de démonstration du modèle panne au format 2 (arbre court), jamais publiée.
libelle_court: Voiture qui broute
question_decision: Puis-je continuer à rouler si ma voiture broute ?
situations:
  - voyant: moteur-rouge
  - voyant: prechauffage
voyants:
  - moteur-rouge
  - prechauffage
cout_probable:
  base_de_calcul: "Texte de démonstration : la tranche de chaque cause vient de ses pièces (data/couts.json)."
  sources:
    - notice-peugeot-208
sources:
  - notice-peugeot-208
element_unique: arbre-de-decision
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
symptome: "Texte de démonstration : la voiture avance par à-coups, surtout à bas régime."
carburant: essence et diesel
contexte:
  - au démarrage
  - à bas régime
causes:
  - cause: Filtre à air encrassé (démonstration)
    explication: Texte de démonstration, rédigé avec la vague B.
    pieces:
      - filtre-a-air
format: 2
illustration:
  fichier: voyant-moteur-tableau-de-bord
  alt: Le voyant moteur allumé au tableau de bord (dessin de démonstration d'une page voisine)
  legende: "Dessin de démonstration, repris de la page du voyant moteur : la page réelle aura le sien."
---

## Selon ce que vous voyez

{{arbre}}

1. Le voyant moteur rouge est-il allumé ?
   - Oui : coupez le moteur dès que possible (texte de démonstration). {{verdict:moteur-rouge}}
   - Non : passez à la question 2.
2. Sur un diesel, le voyant de préchauffage s'allume-t-il seulement quelques secondes au démarrage ?
   - Oui : c'est son fonctionnement normal (texte de démonstration). {{verdict:prechauffage}}
   - Non : lisez la suite de la page.

## Au démarrage

Texte de démonstration, rédigé avec la vague B.

## À bas régime

Texte de démonstration, rédigé avec la vague B.
