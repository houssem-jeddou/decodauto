---
id: fixture-panne
title: "Voiture ne démarre pas : que faire ? (page de test)"
h1: "Ma voiture ne démarre pas : que faire ?"
description: Page de test des contrôles, jamais publiée.
libelle_court: Voiture qui ne démarre pas
image: /images/fixture.jpg
image_alt: Image de test
question_decision: Puis-je rouler si ma voiture démarre difficilement ?
cout_probable:
  tranche: à fixer à l'étape 6
  base_de_calcul: Base de calcul de test
  sources:
    - fixture-notice
sources:
  - fixture-notice
auteur: fixture-auteur
date_publication: 2026-10-01
date_modification: 2026-10-20
date_revue: 2027-03-01
prochaine_revue: 2027-02-01
situations:
  - voyant: fixture-voyant-batterie
  - voyant_lie: fixture-voyant-batterie
    situation: Démarrage impossible après un arrêt prolongé
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: Faire contrôler la batterie avant de reprendre la route.
    citations:
      - source: fixture-securite-routiere
        emplacement: p. 1, rubrique de test
        extrait: Consigne de test de la source fixture-securite-routiere.
        verdict: non, arrêt dès que possible
        urgence: immédiate
voyants:
  - fixture-voyant-batterie
element_unique: arbre-de-decision
symptome: Le moteur ne démarre pas ou démarre difficilement
carburant: essence et diesel
contexte:
  - démarrage
  - à froid
causes:
  - cause: Batterie déchargée
    explication: Une batterie faible ne fournit pas assez de courant.
validation: 50aa1baa6bb287310aa11b40e385b1cba97399b84108aff101edc19ca93bb282
---

Page de test (r7-dates), jamais publiée.
