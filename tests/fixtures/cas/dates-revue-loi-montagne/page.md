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
date_revue: 2026-06-01
prochaine_revue: 2026-11-15
situations:
  - situation: Pneus sous-gonflés
    verdict: oui avec précautions
    urgence: sous quelques jours
    action: Corriger la pression à la prochaine station.
    citations:
      - source: fixture-notice
        emplacement: p. 1, rubrique de test
        extrait: Consigne de test de la source fixture-notice.
        verdict: oui avec précautions
        urgence: sous quelques jours
element_unique: tableau
sujet: loi-montagne
texte_reference:
  nature: legifrance
  reference: Référence de test
  source: fixture-legifrance
validation: d4c94543109bfcb6472c33e0ea80a520ed115c89b001bf036663efadee4cb8b8
periode:
  debut: 1er novembre
  fin: 31 mars
zones:
  - Communes de test
---

Page de test (dates-revue-loi-montagne), jamais publiée.
