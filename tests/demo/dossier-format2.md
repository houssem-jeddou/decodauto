---
# Page de démonstration du modèle dossier au format 2, au format tutoriel (lot F1, F1.3c) : jamais publiée (ni dans
# src/content, ni déployée). Les lignes de l'encadré viennent de la base voyants validée ; la question, le tutoriel, le
# tableau, l'historique et le texte sont des textes de démonstration, écrits pour montrer les états longs : la vraie page
# est rédigée et validée avec la vague B (étape 10). Empreinte calculée par la démonstration (scripts/lib/demo.ts), comme
# pour tests/demo/voyant-huile.md. Corps écrit en HTML : la démonstration ne passe pas par le rendu Markdown d'Astro.
# L'illustration est un dessin de démonstration d'une page voisine (voyant moteur), signalé comme tel.
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
tutoriel:
  outils:
    - chiffon propre
    - huile préconisée par la notice
  duree: 10 minutes
  difficulte: facile
  quand_ne_pas_le_faire_soi_meme: "Texte de démonstration : moteur chaud, voyant de pression d'huile rouge allumé, ou niveau qui baisse vite d'un plein à l'autre."
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

<h2 id="concerne">Votre voiture est-elle concernée ?</h2>
<p>Texte de démonstration, rédigé avec la vague B. Il nomme la marque et le modèle, comme la notice {{notice:notice-peugeot-208}} ({{cite:notice-peugeot-208|p. 160}}).</p>
<h2 id="rappels">Les rappels officiels</h2>
<p>{{tableau}}</p>
<table>
<thead><tr><th>Rappel</th><th>Date</th><th>Ce qui est en cause</th><th>Ce qu'il faut faire</th></tr></thead>
<tbody>
<tr><td>Rappel de démonstration A</td><td>20/11/2020</td><td>Texte de démonstration</td><td>Contacter un concessionnaire (démonstration)</td></tr>
<tr><td>Rappel de démonstration B</td><td>03/05/2022</td><td>Texte de démonstration, une cellule longue qui passe sur plusieurs lignes</td><td>Texte de démonstration</td></tr>
</tbody>
</table>
<h2 id="niveau-huile">Vérifier le niveau d'huile</h2>
<p>{{etapes}}</p>
<ol>
<li>Garez la voiture à plat, moteur arrêté depuis quelques minutes (texte de démonstration).</li>
<li>Sortez la jauge, essuyez-la avec un chiffon propre, puis replongez-la complètement. Texte de démonstration d'une étape longue, qui passe sur plusieurs lignes et reste dans sa carte sans déborder à 375 px.</li>
<li>Lisez le niveau entre les repères minimal et maximal.</li>
<li>Complétez avec l'huile préconisée par la notice de votre voiture, par petites quantités.</li>
</ol>
<h2 id="prise-en-charge">La prise en charge</h2>
<p>Texte de démonstration, rédigé avec la vague B.</p>
