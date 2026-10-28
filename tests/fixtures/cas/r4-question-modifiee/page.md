---
id: fixture-voyant
title: "Voyant huile allumé : que faire ? (page de test)"
h1: "Voyant huile allumé : que faire ?"
description: Page de test des contrôles, jamais publiée.
libelle_court: Voyant huile
image: /images/fixture.jpg
image_alt: Image de test
question_decision: Que veut dire le voyant huile ?
cout_probable:
  base_de_calcul: Base de calcul de test
  sources:
    - fixture-notice
  si_vous_continuez:
    tranche: organe
    citations:
      - voyant: fixture-voyant-huile
        source: fixture-notice
        emplacement: p. 1, rubrique de test
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
validation: b4958c5567c2deb21b4d0565493b99d9a2ad5b1d50a1241b9ddbe4812dda357d
---

Page de test (r4-question-modifiee), jamais publiée.
