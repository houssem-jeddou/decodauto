---
id: fixture-code
title: "Code P0420 : que faire ? (page de test)"
h1: "Code défaut P0420 : que faire ?"
description: Page de test des contrôles, jamais publiée.
image: /images/fixture.jpg
question_decision: Puis-je rouler avec le code P0420 ?
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
  - voyant: fixture-voyant-huile
  - voyant_lie: fixture-voyant-huile
    situation: Code P0420 mémorisé, voyant huile allumé
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: S'arrêter et couper le moteur.
    sources:
      - fixture-securite-routiere
voyants:
  - fixture-voyant-huile
element_unique: tableau
code: P0420
libelle: Rendement du catalyseur inférieur au seuil
portee: generique
carburant: essence et diesel
causes:
  - cause: Catalyseur usé
    explication: Le catalyseur ne traite plus correctement les gaz.
validation: 2876ca6e36d563b7c3e97f4a12af6ac68088bc86894ff995ee102e9534cdd638
---

Page de test (valide-code-defaut), jamais publiée.
