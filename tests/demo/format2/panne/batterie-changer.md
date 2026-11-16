---
# Page de démonstration du modèle panne au format tutoriel, au format 2 (lot F1, revue de F1.3c) : fiche « Le tutoriel en
# bref » et étapes ; jamais publiée, lue seulement par la construction de démonstration du format 2 (DEMO_FORMAT2=1). Ligne de
# l'encadré tirée de la base voyants validée (sa ligne d'écart courte vient du brouillon du format 2, jamais validé) ; textes
# de démonstration ; sans empreinte (R4-VALIDATION-ABSENTE attendue). Illustration d'une page voisine, signalée.
id: batterie-changer
title: "Comment changer une batterie de voiture ? (démonstration)"
h1: "Comment changer une batterie de voiture"
description: Page de démonstration du modèle panne au format tutoriel, au format 2, jamais publiée.
libelle_court: Changer la batterie
question_decision: Puis-je rouler si le voyant de batterie s'allume ?
situations:
  - voyant: batterie-rouge
voyants:
  - batterie-rouge
cout_probable:
  base_de_calcul: "Texte de démonstration : la tranche vient des pièces de la cause (data/couts.json)."
  sources:
    - notice-peugeot-208
sources:
  - notice-peugeot-208
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
carburant: essence et diesel
contexte:
  - à l'arrêt
causes:
  - cause: Batterie usée (démonstration)
    explication: Texte de démonstration, rédigé avec la vague B.
    pieces:
      - batterie
tutoriel:
  outils:
    - clé plate
    - gants
  duree: 30 minutes
  difficulte: moyenne
  quand_ne_pas_le_faire_soi_meme: "Texte de démonstration : voiture à démarrage et arrêt automatiques, ou batterie placée sous un siège."
format: 2
illustration:
  fichier: accueil-tableau-de-bord
  alt: Le combiné d'instruments (dessin de démonstration d'une page voisine)
  legende: "Dessin de démonstration, repris de l'accueil : la page réelle aura le sien."
---

## Avant de commencer

Texte de démonstration, rédigé avec la vague B.

## Les étapes

{{etapes}}

1. Coupez le contact et retirez la clé (texte de démonstration).
2. Débranchez la borne négative, puis la borne positive. Texte de démonstration d'une étape longue, qui passe sur plusieurs lignes et reste dans sa carte sans déborder à 375 px.
3. Retirez la bride, sortez l'ancienne batterie et posez la neuve.
4. Rebranchez la borne positive, puis la borne négative.

## Ce qu'il faut vérifier ensuite

{{tableau}}

| Point | Ce qu'il faut voir | Si ce n'est pas le cas |
|---|---|---|
| Bornes | Serrées, sans jeu | Resserrez (démonstration) |
| Voyant | Éteint après le démarrage | Lisez l'encadré en haut de page |
