---
id: fixture-panne
title: Problème de démarrage (page de test)
h1: Que faire en cas de problème de démarrage
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
date_revue: 2026-10-20
prochaine_revue: 2027-01-20
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
validation: 03d45f64077974e7b7936bbea79dd0e1a8be47b0a577874907e0e12f5d7f3081
---

Page de test (r7-requete-absente), jamais publiée.
