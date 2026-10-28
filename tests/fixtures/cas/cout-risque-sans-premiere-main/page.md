---
id: fixture-voyant
title: "Voyant huile allumé : que faire ? (page de test)"
h1: "Voyant huile allumé : que faire ?"
description: Page de test des contrôles, jamais publiée.
libelle_court: Voyant huile
image: /images/fixture.jpg
image_alt: Image de test
question_decision: Puis-je rouler avec le voyant huile allumé ?
cout_probable:
  base_de_calcul: Base de calcul de test
  sources:
    - fixture-notice
  si_vous_continuez:
    tranche: organe
    citations:
      - source: fixture-forum
        emplacement: p. 1, rubrique de test
        extrait: Consigne de test de la source fixture-forum.
sources:
  - fixture-notice
auteur: fixture-auteur
date_publication: 2026-10-01
date_modification: 2026-10-20
date_revue: 2026-10-20
prochaine_revue: 2027-01-20
situations:
  - voyant: fixture-voyant-huile
voyants:
  - fixture-voyant-huile
element_unique: photo
causes:
  - cause: Niveau d'huile trop bas
    explication: Le circuit n'est plus assez alimenté.
    pieces:
      - fixture-appoint-huile
validation: d45de01f3000580bf1f81d1bd4fce0f8d5c38a7d4447eb614ec6e6d9105d239a
---

Page de test (cout-risque-sans-premiere-main), jamais publiée.
