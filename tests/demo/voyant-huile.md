---
# Page de démonstration des composants communs (livrable 6.3) et du tableau des notices (6.4) : jamais publiée.
# Les lignes de l'encadré viennent de la base voyants validée ; la question, les causes et le texte sont
# provisoires : la vraie page est rédigée et validée avec la vague A (étape 8).
id: voyant-huile
title: "Voyant huile moteur allumé : peut-on rouler ? (démonstration)"
h1: "Voyant huile moteur allumé : que faire ?"
description: Page de démonstration des composants communs, jamais publiée.
libelle_court: Voyant huile moteur
question_decision: Puis-je rouler avec le voyant d'huile allumé ?
situations:
  - voyant: huile-pression-rouge
  - voyant: huile-niveau
  - voyant: entretien-vidange
voyants:
  - huile-pression-rouge
  - huile-niveau
  - entretien-vidange
cout_probable:
  base_de_calcul: "Texte de démonstration : la tranche de chaque cause vient de ses pièces (data/couts.json)."
  sources:
    - notice-peugeot-208
  si_vous_continuez:
    tranche: organe
    citations:
      - voyant: huile-pression-rouge
        source: notice-peugeot-208
        emplacement: "p. 13, « Témoins de couleur rouge », Pression d'huile moteur ; renvois (1) et (2) p. 13"
sources:
  - notice-peugeot-208
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-02
date_modification: 2026-11-02
date_revue: 2026-11-02
prochaine_revue: 2027-11-02
causes:
  - cause: Niveau d'huile trop bas (démonstration)
    explication: Texte de démonstration, rédigé au livrable 6.6.
    pieces:
      - appoint-huile
  - cause: Vidange à faire (démonstration)
    explication: Texte de démonstration, rédigé au livrable 6.6.
    pieces:
      - vidange
  - cause: Moteur endommagé faute de pression (démonstration)
    explication: Texte de démonstration, rédigé au livrable 6.6.
    pieces:
      - moteur
---

Corps de la page de démonstration.
