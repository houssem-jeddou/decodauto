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
validation: 57b7d7b1722d53085b8c28ec49a78f4a2eec7ff52f4ac1c76a439bdc03dea074
---

Page de test (valide-code-defaut), jamais publiée.
