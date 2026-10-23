---
id: fixture-fluide
title: Vérifier le niveau d'huile (page de test)
h1: Comment vérifier le niveau d'huile
description: Page de test des contrôles, jamais publiée.
libelle_court: Niveau d'huile
image: /images/fixture.jpg
image_alt: Image de test
question_decision: Puis-je rouler si le niveau d'huile est bas ?
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
  - situation: Niveau d'huile sous le repère minimum
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: Compléter le niveau avant de reprendre la route.
    citations:
      - source: fixture-notice
        emplacement: p. 1, rubrique de test
        extrait: Consigne de test de la source fixture-notice.
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: fixture-notice-peugeot
        emplacement: p. 1, rubrique de test
        extrait: Consigne de test de la source fixture-notice-peugeot.
        verdict: oui avec précautions
        urgence: sous quelques jours
    ecart_marques: "Une notice demande de faire appel à un garage, l'autre de s'y rendre : la consigne la plus prudente est retenue."
element_unique: tableau
normes:
  - ACEA A3/B4
comment_verifier: Moteur froid, véhicule à plat, jauge essuyée puis replongée.
quand_changer:
  texte: Selon le carnet d'entretien.
  sources:
    - fixture-notice
validation: bf16b2c45e24342ef06f0c1cae85c05f8de819b23a3ad72e5e7e50fc134d88e2
---

Page de test (valide-ecart-signale), jamais publiée.
