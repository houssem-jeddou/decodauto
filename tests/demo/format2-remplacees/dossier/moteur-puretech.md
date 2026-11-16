---
# Page de démonstration du modèle dossier au format 2, sans tutoriel (lot F1, revue de F1.3c) : tableau de six colonnes (en
# cartes sur téléphone, intitulés avec « & » et « < »), historique ; jamais publiée. Depuis le lot B1, la vraie page
# « moteur PureTech » est publiée (src/content/dossier/) : cette page ne passe plus par la construction de démonstration
# (la vraie page l'y remplace) et n'est lue que par les tests du modèle (tests/format2-panne.test.ts ;
# tests/demo/format2-remplacees/README.md). Lignes de l'encadré tirées de la base voyants validée ; textes de
# démonstration ; sans empreinte. Illustration d'une page voisine, signalée.
id: moteur-puretech
title: "Moteurs PureTech : que vérifier ? (démonstration)"
h1: "Moteur PureTech : que vérifier, et quand ?"
description: Page de démonstration du modèle dossier au format 2, jamais publiée.
libelle_court: Moteur PureTech
question_decision: Puis-je continuer à rouler si une alerte s'allume sur un moteur PureTech ?
situations:
  - voyant: huile-pression-rouge
  - voyant: moteur-rouge
voyants:
  - huile-pression-rouge
  - moteur-rouge
cout_probable:
  base_de_calcul: "Texte de démonstration : la tranche vient des pièces de la page (data/couts.json)."
  pieces:
    - appoint-huile
    - distribution-cassee-ou-usee
  sources:
    - notice-peugeot-208
sources:
  - notice-peugeot-208
  - notice-citroen-c3
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-10
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-02-16
journal_modifications:
  - date: 2026-11-10
    resume: Première publication (démonstration).
  - date: 2026-11-13
    resume: "Texte de démonstration : une entrée longue, qui passe sur plusieurs lignes à 375 px pour montrer l'état long de l'historique."
  - date: 2026-11-16
    resume: Ajout d'un rappel au tableau (démonstration).
format: 2
illustration:
  fichier: voyant-moteur-tableau-de-bord
  alt: Le voyant moteur allumé au tableau de bord (dessin de démonstration d'une page voisine)
  legende: "Dessin de démonstration, repris de la page du voyant moteur : la page réelle aura le sien."
---

## Votre voiture est-elle concernée ?

Texte de démonstration, rédigé avec la vague B. Il nomme la marque et le modèle, comme la notice {{notice:notice-peugeot-208}} ({{cite:notice-peugeot-208|p. 160}}).

## Les rappels officiels

{{tableau}}

| Rappel | Date | Moteurs | Ce qui est en cause | Pièces & main-d'œuvre | Âge < 5 ans |
|---|---|---|---|---|---|
| Rappel de démonstration A | 20/11/2020 | 1.2 PureTech 110 | Texte de démonstration | Prises en charge (démonstration) | Oui |
| Rappel de démonstration B | 03/05/2022 | 1.2 PureTech 130 | Texte de démonstration, une cellule longue qui passe sur plusieurs lignes | Selon le rappel (démonstration) | Non |

## La prise en charge

Texte de démonstration, rédigé avec la vague B.
