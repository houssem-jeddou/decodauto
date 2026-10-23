---
id: fixture-panne
title: "Voiture ne démarre pas : que faire ? (page de test)"
h1: "Ma voiture ne démarre pas : que faire ?"
description: Page de test des contrôles, jamais publiée.
image: /images/fixture.jpg
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
    urgence: bientôt
    action: Faire contrôler la batterie avant de reprendre la route.
    sources:
      - fixture-securite-routiere
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
validation: ff0f4fbe4873a95e23d4f413a85d4d6d83b609e65e123542f1f3c7be9b69a9d6
---

Page de test (r7-hors-liste), jamais publiée.
