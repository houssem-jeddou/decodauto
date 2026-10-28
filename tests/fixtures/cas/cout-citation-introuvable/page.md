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
      - voyant: fixture-voyant-huile
        source: fixture-notice
        emplacement: p. 99
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
validation: 216ba027edf6306f4f4a55694b0ca7d974ff4fd22de6b08cc0a62aea46853816
---

Page de test (cout-citation-introuvable), jamais publiée.
