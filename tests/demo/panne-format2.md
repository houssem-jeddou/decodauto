---
# Page de démonstration du modèle panne au format 2 (lot F1, F1.3c ; plan : « perte de puissance ») : jamais publiée (ni dans src/content, ni déployée).
# Les lignes de l'encadré viennent de la base voyants validée ; la question, le symptôme, les causes et le texte sont des
# textes de démonstration, écrits pour montrer les états longs (arbre de décision, fiches, causes) : la vraie page est
# rédigée et validée avec la vague B (étape 10). Empreinte calculée par la démonstration (scripts/lib/demo.ts), comme pour
# tests/demo/voyant-huile.md. Corps écrit en HTML : la démonstration ne passe pas par le rendu Markdown d'Astro.
# L'illustration est un dessin de démonstration (travaux/etape-13/f1/demo/illustrations), signalé comme tel.
id: perte-de-puissance
title: "Perte de puissance voiture : que faire ? (démonstration)"
h1: "Perte de puissance du moteur : que faire ?"
description: Page de démonstration du modèle panne au format 2, jamais publiée.
libelle_court: Perte de puissance
question_decision: Puis-je continuer à rouler si le moteur perd de la puissance ?
situations:
  - voyant: moteur-rouge
  - voyant: huile-pression-rouge
voyants:
  - moteur-rouge
  - huile-pression-rouge
cout_probable:
  base_de_calcul: "Texte de démonstration : la tranche de chaque cause vient de ses pièces (data/couts.json)."
  sources:
    - notice-peugeot-208
sources:
  - notice-peugeot-208
  - notice-seat-ibiza
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-toyota-yaris
element_unique: arbre-de-decision
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
symptome: "Texte de démonstration : le moteur tire moins bien, accélère mal, et un voyant peut s'allumer."
carburant: essence et diesel
contexte:
  - en roulant
  - à l'accélération
  - en côte ou en charge
causes:
  - cause: Filtre à air encrassé (démonstration)
    explication: Texte de démonstration, rédigé avec la vague B. Une explication longue montre la carte sur plusieurs lignes, sans débordement à 375 px.
    pieces:
      - filtre-a-air
  - cause: Turbo défaillant (démonstration)
    explication: Texte de démonstration, rédigé avec la vague B.
    pieces:
      - turbo
  - cause: Défaillance grave du moteur (démonstration)
    explication: Texte de démonstration, rédigé avec la vague B.
    pieces:
      - moteur
format: 2
illustration:
  fichier: voyant-moteur-tableau-de-bord
  alt: Le voyant moteur allumé au tableau de bord (dessin de démonstration d'une page voisine)
  legende: "Dessin de démonstration, repris de la page du voyant moteur : la page réelle aura le sien."
---

<h2 id="que-faire">Le voyant moteur est rouge : que faire ?</h2>
<p>{{repere:moteur-rouge}}</p>
<p>Texte de démonstration qui cite la notice {{notice:notice-peugeot-208}} ({{cite:notice-peugeot-208|p. 13}}) : la page réelle est rédigée avec la vague B.</p>
<p>Deuxième paragraphe de démonstration, pour montrer la longueur d'un texte rédigé ordinaire, avec la notice {{notice:notice-toyota-yaris}} et la notice {{notice:notice-renault-clio-5}}.</p>
<!-- arbre -->
<h2 id="selon-ce-que-vous-voyez">Selon ce que vous voyez</h2>
<p>{{arbre}}</p>
<ol>
<li>Le voyant moteur est-il rouge, ou le témoin STOP s'allume-t-il avec le message « Risque casse moteur » ?
<ul>
<li>Oui : {{verdict:moteur-rouge}} Texte de démonstration : coupez le moteur et faites appel à un garage ou à l'assistance.</li>
<li>Non : passez à la question 2.</li>
</ul>
</li>
<li>Le voyant de pression d'huile rouge est-il allumé ?
<ul>
<li>Oui : {{verdict:huile-pression-rouge}} Texte de démonstration, une réponse longue qui passe sur plusieurs lignes à 375 px pour montrer l'état long de la carte, avec sa pastille de verdict en ligne au milieu du texte.</li>
<li>Non : passez à la question 3.</li>
</ul>
</li>
<li>Le filtre à air a-t-il dépassé l'échéance de la notice ?
<ul>
<li>Oui : faites-le remplacer à la prochaine révision (texte de démonstration).</li>
<li>Non : passez à la question 4.</li>
<li>Vous ne savez pas : le carnet d'entretien de votre voiture l'indique.</li>
</ul>
</li>
<li>Le moteur siffle-t-il fort à l'accélération ?
<ul>
<li>Oui : faites contrôler le turbo au garage (texte de démonstration).</li>
<li>Non : passez à la question 5.</li>
</ul>
</li>
<li>Un voyant rouge s'allume-t-il ensuite ?
<ul>
<li>Le voyant moteur : {{verdict:moteur-rouge}}</li>
<li>Le voyant de pression d'huile : {{verdict:huile-pression-rouge}}</li>
</ul>
</li>
</ol>
<!-- /arbre -->
<h2 id="en-cote">En côte ou en charge</h2>
<p>Texte de démonstration. Ce titre ne pose la question d'aucune ligne de l'encadré : il n'a pas de repère.</p>
<h2 id="turbo">Le turbo</h2>
<p>Texte de démonstration, rédigé avec la vague B.</p>
