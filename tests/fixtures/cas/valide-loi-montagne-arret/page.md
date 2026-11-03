---
id: fixture-pneus
title: Pression des pneus (page de test)
h1: Quelle est la bonne pression des pneus ?
description: Page de test des contrôles, jamais publiée.
libelle_court: Pression des pneus
image: /images/fixture.jpg
image_alt: Image de test
question_decision: Puis-je rouler avec des pneus sous-gonflés ?
cout_probable:
  base_de_calcul: Base de calcul de test
  sources:
    - fixture-notice
  pieces:
    - fixture-regonflage
  montants:
    - fixture-amende
sources:
  - fixture-notice
auteur: fixture-auteur
date_publication: 2026-10-01
date_modification: 2026-10-20
date_revue: 2026-10-20
prochaine_revue: 2027-01-20
situations:
  - situation: Sans équipement, dans une commune soumise à l'obligation
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: S'équiper avant d'entrer dans la zone.
    citations:
      - source: fixture-legifrance
        emplacement: p. 1, rubrique de test
        extrait: Consigne de test de la source fixture-legifrance.
        verdict: non, arrêt dès que possible
        urgence: immédiate
element_unique: tableau
sujet: loi-montagne
texte_reference:
  nature: legifrance
  reference: Référence de test
  source: fixture-legifrance
validation: 7aa5747f987a035aaa2f37182c01af227a9cccda3f8513ea99f66c766407f746
periode:
  debut: 1er novembre
  fin: 31 mars
zones:
  - Communes de test
---

Page de test (valide-loi-montagne-arret), jamais publiée.
