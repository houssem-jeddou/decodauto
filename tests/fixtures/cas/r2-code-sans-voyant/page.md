---
id: fixture-code
title: "Code P0420 : que faire ? (page de test)"
h1: "Code défaut P0420 : que faire ?"
description: Page de test des contrôles, jamais publiée.
libelle_court: Code P0420
image: /images/fixture.jpg
image_alt: Image de test
question_decision: Puis-je rouler avec le code P0420 ?
cout_probable:
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
  - voyant: fixture-voyant-huile
  - situation: Code P0420 mémorisé
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: S'arrêter et couper le moteur.
    citations:
      - source: fixture-notice
        emplacement: p. 1, rubrique de test
        extrait: Consigne de test de la source fixture-notice.
        verdict: non, arrêt immédiat
        urgence: immédiate
voyants:
  - fixture-voyant-huile
element_unique: tableau
code: P0420
libelle: Rendement du catalyseur inférieur au seuil
libelle_sources:
  - fixture-forum
portee: generique
carburant: essence et diesel
causes:
  - cause: Catalyseur usé
    explication: Le catalyseur ne traite plus correctement les gaz.
    pieces:
      - fixture-catalyseur
  - cause: Sonde défaillante
    explication: La sonde mesure mal les gaz.
    pieces:
      - fixture-sonde
validation: 167a815eb2670cb7cd20e13141e457c96b23c44a1a4f59b1776bb7c2862cc8aa
---

Page de test (r2-code-sans-voyant), jamais publiée.
