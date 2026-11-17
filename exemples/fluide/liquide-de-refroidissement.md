---
# Brouillon, jamais validé. Étape 11 (vague C), lot C3 : page « liquide de refroidissement » (modèle fluide, format 2).
# Pas d'empreinte tant que Houssem n'a pas validé son encadré (paquet du lot C3).
# - Sources : relevé à l'écran du 17/11/2026 vers 13 h 30 (pdf.js dans Chrome ; travaux/etape-11/textes/releve-sources.md,
#   §12) : Seat Ibiza p. 297-298 ; Peugeot 208 p. 167 ; Citroën C3 p. 113 ; Renault Clio 5 phase 2 p. 334-335 et 387 ;
#   Dacia Sandero 3 p. 298 et 349-350. Toyota Yaris : non lue (PDF refusé par le navigateur).
# - Décisions du pilotage (règle 6, 17/11) : encadré sur ces citations, le plus prudent l'emporte, écart signalé (vase
#   vide : Seat « arrêtez-vous » contre Renault et Dacia « le plus tôt possible ») ; ligne de base `temperature-rouge`
#   reprise ; liquide marron (Seat seule) classé par la grille ; aucune périodicité chiffrée ; aucune couleur ni norme
#   générale hors Seat.
# - Requête principale « liquide de refroidissement » : demande de changement n° 37 (travaux/etape-11/lot-c3), proposée.
# - Le bouillonnement dans le bocal reste sur la page « moteur qui surchauffe » (une intention, une page) : le texte y
#   renvoie par la paire du plan.
# - Illustration : `liquide-refroidissement-vase`, dessinée pour cette page (travaux/etape-11/generer-illustrations.py).
id: liquide-de-refroidissement
title: "Liquide de refroidissement : lequel mettre, niveau et appoint"
h1: "Liquide de refroidissement : quel liquide mettre, comment lire le niveau, que faire s'il baisse ?"
description: "Mettez le liquide que demande votre notice et lisez le niveau moteur froid. Vase vide : arrêtez-vous. Selon les notices Peugeot, Citroën, Renault, Dacia et Seat."
libelle_court: Liquide de refroidissement
question_decision: "Quel liquide de refroidissement mettre, et puis-je rouler s'il en manque ?"
reponse_directe: "Celui que demande la notice ou le réseau de votre marque, sans mélange : parmi les notices lues, seule Seat Ibiza le nomme (G12evo). S'il en manque, faites l'appoint moteur froid ; si le vase d'expansion est vide, arrêtez-vous."
situations:
  - situation: "Moteur froid, le niveau est proche du repère mini ou en dessous, et il reste du liquide dans le vase d'expansion"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Moteur froid, faites l'appoint sans attendre jusqu'au repère maxi, sans le dépasser, avec le liquide que demande votre notice. N'ouvrez jamais le bouchon moteur chaud."
    ecart_marques: "Les notices Peugeot 208 et Citroën C3 jugent l'appoint impératif quand le niveau est proche du repère mini ou en dessous ; les notices Renault Clio 5, Dacia Sandero 3 et Seat Ibiza demandent l'appoint sans donner de délai."
    ecart_court: "Plus stricts : Peugeot et Citroën (appoint impératif). Moins stricts : Renault, Dacia et Seat (appoint, sans délai écrit)."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 167, « Liquide de refroidissement »"
        extrait: "Un niveau insuffisant présente des risques de dommages importants pour le moteur, il doit se situer proche du repère \"MAXI\" sans jamais le dépasser. Si le niveau est proche ou en-dessous du repère \"MINI\", il est impératif de faire un appoint."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 113, « Liquide de refroidissement »"
        extrait: "Un niveau insuffisant présente des risques de dommages importants pour le moteur, il doit se situer proche du repère \"MAXI\" sans jamais le dépasser. Si le niveau est proche ou en-dessous du repère \"MINI\", il est impératif de faire un appoint."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 334-335, « Niveau liquide de refroidissement »"
        extrait: "Contact coupé et sur sol horizontal, le niveau à froid doit se situer entre les repères \"MINI\" et \"MAXI\" indiqués sur le bocal de liquide de refroidissement. Complétez ce niveau à froid avant qu'il n'atteigne le repère \"MINI\"."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-dacia-sandero-3
        emplacement: "p. 298, « Niveau liquide de refroidissement »"
        extrait: "Contact coupé et sur sol horizontal, le niveau à froid doit se situer entre les repères \"MINI\" et \"MAXI\" indiqués sur le bocal de liquide de refroidissement. Complétez ce niveau à froid avant qu'il n'atteigne le repère \"MINI\"."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-seat-ibiza
        emplacement: "p. 298, « Liquide de refroidissement »"
        extrait: "Faites l'appoint de liquide de refroidissement lorsque son niveau descend en dessous de la marque [min] (minimum)."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - situation: "Le vase d'expansion est vide : il n'y reste plus de liquide de refroidissement"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Ne faites pas l'appoint vous-même : faites appel à un garage ou à l'assistance pour un dépannage."
    ecart_marques: "La notice Seat Ibiza demande de s'arrêter et de faire appel à un spécialiste ; pour un moteur qui chauffe, les notices Renault Clio 5 et Dacia Sandero 3 demandent de consulter un représentant de la marque le plus tôt possible."
    ecart_court: "Plus strict : Seat (arrêtez-vous). Moins stricts : Renault et Dacia (représentant de la marque le plus tôt possible)."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 298, « Liquide de refroidissement », appoint"
        extrait: "Faites l'appoint de liquide de refroidissement uniquement s'il en reste encore dans le vase d'expansion, sinon vous pourriez endommager le moteur. S'il n'y a plus de liquide de refroidissement dans le vase d'expansion, arrêtez-vous. Faites appel à un spécialiste en mesure de vous dépanner."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 298, « Liquide de refroidissement », ATTENTION"
        extrait: "Si vous manquez de liquide de refroidissement dans le vase d'expansion, garez la voiture dans un endroit sûr et arrêtez-vous. Demandez de l'aide à un technicien."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 387, « Anomalies de fonctionnement », « Le moteur chauffe », « Fuites de liquide de refroidissement »"
        extrait: "Vérifiez le bocal de liquide de refroidissement : il doit contenir du liquide. S'il n'en contient pas, consultez un Représentant de la marque le plus tôt possible."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 349-350, « Anomalies de fonctionnement », « Le moteur chauffe », « Fuites de liquide de refroidissement »"
        extrait: "Vérifiez le bocal de liquide de refroidissement : il doit contenir du liquide. S'il n'en contient pas, consultez un Représentant de la marque le plus tôt possible."
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "Le niveau baisse de façon anormale ou répétée, ou la voiture perd du liquide de refroidissement"
    verdict: oui avec précautions
    urgence: sous quelques jours
    action: "Vous pouvez rouler en surveillant le niveau, moteur froid, et en faisant l'appoint s'il le faut. Faites vérifier le circuit de refroidissement par le réseau de la marque ou un atelier spécialisé dans les jours qui viennent."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 334-335, « Niveau liquide de refroidissement »"
        extrait: "En cas de baisse anormale ou répétée du niveau, consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-dacia-sandero-3
        emplacement: "p. 298, « Niveau liquide de refroidissement »"
        extrait: "En cas de baisse anormale ou répétée du niveau, consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-seat-ibiza
        emplacement: "p. 298, « Liquide de refroidissement », appoint"
        extrait: "Si vous perdez du liquide de refroidissement, rendez-vous dans un atelier spécialisé pour inspecter le système de refroidissement."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - situation: "Le liquide du vase d'expansion est marron, et non lilas comme le décrit la notice Seat Ibiza"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites remplacer le liquide de refroidissement sans attendre par le réseau de la marque ou un atelier : selon la notice Seat Ibiza, il a été mélangé avec un liquide inadapté."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 297, « Spécification du liquide de refroidissement », ATTENTION"
        extrait: "Si le liquide du vase d'expansion n'est pas de couleur lilas mais marron, par exemple, cela signifie que l'additif G12evo a été mélangé avec un liquide de refroidissement inadapté. Dans ce cas, le liquide de refroidissement devra immédiatement être remplacé."
        verdict: oui avec précautions
        urgence: immédiate
  - voyant: temperature-rouge
voyants:
  - temperature-rouge
element_unique: tableau
format: 2
illustration:
  fichier: liquide-refroidissement-vase
  alt: "Le vase d'expansion, bouchon fermé, avec ses repères MAXI et MINI : le niveau se lit moteur froid, entre les deux repères ; le bouchon ne s'ouvre jamais moteur chaud"
  legende: "Le niveau se lit moteur froid, dans le vase d'expansion, entre les repères mini et maxi. Les repères et leur nom varient selon la voiture : voyez votre notice."
normes:
  - "Celui que demande la notice ou le réseau de votre marque : un produit agréé par les services techniques de la marque chez Renault et Dacia, un liquide homologué par Seat chez Seat"
  - "chez Seat Ibiza, de l'eau et au moins 40 % d'additif G12evo (TL-VW 774 L), sans dépasser 60 %"
  - "jamais de mélange avec un liquide non homologué (Seat Ibiza)."
comment_verifier: "Moteur froid, contact coupé et voiture à plat, dans le vase d'expansion : le niveau se situe entre les repères mini et maxi, proche du maxi sans le dépasser selon les notices Peugeot 208 et Citroën C3. N'ouvrez jamais le bouchon moteur chaud."
quand_changer:
  texte: "À l'échéance du document d'entretien de votre voiture, selon les notices Renault Clio 5 et Dacia Sandero 3 : les notices lues ne donnent aucune durée. Selon la notice Seat Ibiza, un liquide devenu marron se remplace sans attendre."
  sources:
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - notice-seat-ibiza
cout_probable:
  pieces:
    - appoint-liquide-de-refroidissement
    - remplacement-liquide-de-refroidissement
    - moteur
  base_de_calcul: "La dépense va de l'appoint, que vous faites vous-même, au remplacement du liquide (entretien). Elle peut aller jusqu'au moteur, la tranche la plus lourde : selon les notices Peugeot 208 et Citroën C3, un niveau insuffisant présente des risques de dommages importants pour le moteur. Aucune notice lue ne nomme la pièce à réparer en cas de fuite."
  sources:
    - notice-peugeot-208
    - notice-citroen-c3
    - notice-seat-ibiza
  si_vous_continuez:
    tranche: organe
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 167, « Liquide de refroidissement »"
        extrait: "Un niveau insuffisant présente des risques de dommages importants pour le moteur, il doit se situer proche du repère \"MAXI\" sans jamais le dépasser. Si le niveau est proche ou en-dessous du repère \"MINI\", il est impératif de faire un appoint."
        verdict: oui avec précautions
        urgence: immédiate
sources:
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-seat-ibiza
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-17
date_modification: 2026-11-17
date_revue: 2026-11-17
prochaine_revue: 2027-11-17
---

## Quel liquide de refroidissement mettre dans ma voiture ?

Celui que demande la notice ou le réseau de votre marque. Les notices Renault Clio 5 et Dacia Sandero 3 demandent de n'utiliser que les produits agréés par les services techniques de la marque, qui protègent contre le gel et contre la corrosion du circuit. La notice Seat Ibiza interdit de mélanger le liquide d'origine avec un liquide non homologué par Seat ({{cite:notice-renault-clio-5|p. 334-335}} ; {{cite:notice-dacia-sandero-3|p. 298}} ; {{cite:notice-seat-ibiza|p. 297}}).

Parmi les notices lues, seule la notice Seat Ibiza nomme son liquide : un mélange d'eau et d'au moins 40 % d'additif G12evo (TL-VW 774 L). Pour un appoint, elle demande de l'eau distillée et au moins 40 % de G12evo. Les notices Peugeot 208 et Citroën C3 ne nomment aucun liquide dans leur rubrique.

## Liquide de refroidissement rose, lilas ou G12 : la couleur suffit-elle ?

Non : la couleur ne dit pas si un liquide convient à votre moteur. Parmi les notices lues, seule la notice Seat Ibiza nomme une couleur : lilas, celle de son additif G12evo. Elle demande d'éviter de le mélanger avec d'autres liquides, dont le G13, le G12 (rouge) et le G11 (bleu verdâtre), car le mélange dégrade la protection contre la corrosion ({{cite:notice-seat-ibiza|p. 297}}).

Pour une autre voiture, cherchez sur le bidon la référence que demande sa notice ou son réseau, pas une couleur.

## Antigel : jusqu'à quelle température protège-t-il ?

Selon la notice Seat Ibiza, le mélange d'origine, avec au moins 40 % d'additif, protège jusqu'à -25 °C. Ce taux reste d'au moins 40 % même par temps chaud. Par grand froid, il peut monter jusqu'à 60 %, pas au-delà : la protection contre le gel diminuerait et le refroidissement serait moins bon ({{cite:notice-seat-ibiza|p. 297}}).

La même notice prévient que, sans assez d'antigel, le liquide peut geler par très grand froid et immobiliser la voiture. Pour une autre marque, la notice ou le réseau donne la protection de son liquide.

## Où lire le niveau : le vase d'expansion

Le niveau se lit dans le vase d'expansion, le bocal du liquide de refroidissement, moteur froid, contact coupé et voiture à plat. Il doit se situer entre les repères mini et maxi ; selon les notices Peugeot 208 et Citroën C3, proche du repère maxi sans jamais le dépasser. Selon la notice Seat Ibiza, moteur chaud, il peut se situer légèrement au-dessus de la marque supérieure ({{cite:notice-peugeot-208|p. 167}} ; {{cite:notice-citroen-c3|p. 113}} ; {{cite:notice-seat-ibiza|p. 298}}).

N'ouvrez jamais le bouchon moteur chaud : le circuit est sous pression, et toutes les notices lues préviennent du risque de brûlure. Les notices Peugeot 208 et Citroën C3 demandent d'attendre au moins une heure après l'arrêt du moteur. En cas d'urgence, elles demandent de dévisser le bouchon de deux tours, protégé par un chiffon, pour laisser retomber la pression.

## Niveau proche du mini ou en dessous : faire l'appoint

{{repere:ligne-1}}

{{verdict:ligne-1}}, selon l'encadré. Moteur froid, complétez jusqu'au repère maxi avec le liquide que demande votre notice : les notices Peugeot 208 et Citroën C3 jugent l'appoint impératif quand le niveau est proche du repère mini ou en dessous.

Selon la notice Seat Ibiza, couvrez le bouchon d'un chiffon et dévissez-le doucement, puis complétez jusqu'à obtenir un niveau stable. Revissez ensuite le bouchon correctement ({{cite:notice-seat-ibiza|p. 298}}).

Les notices Renault Clio 5 et Dacia Sandero 3 rappellent de ne jamais verser de liquide froid dans un moteur très chaud ({{cite:notice-renault-clio-5|p. 387}} ; {{cite:notice-dacia-sandero-3|p. 349-350}}).

## Vase d'expansion vide : puis-je rouler ?

{{repere:ligne-2}}

Non : {{verdict:ligne-2}}, selon l'encadré. La notice Seat Ibiza demande de ne faire l'appoint que s'il reste du liquide dans le vase, sinon le moteur peut être endommagé. S'il est vide, elle demande de s'arrêter et de faire appel à un spécialiste en mesure de dépanner la voiture.

Les notices Renault Clio 5 et Dacia Sandero 3 traitent du bocal vide quand le moteur chauffe : elles demandent de consulter un représentant de la marque le plus tôt possible. Le témoin de température allumé, elles demandent de s'arrêter, comme la ligne du voyant de température plus bas ({{cite:notice-renault-clio-5|p. 387}} ; {{cite:notice-dacia-sandero-3|p. 349-350}}).

## Ma voiture consomme du liquide de refroidissement : est-ce normal ?

{{repere:ligne-3}}

Un appoint entre deux révisions est normal, selon les notices Peugeot 208 et Citroën C3 ({{cite:notice-peugeot-208|p. 167}} ; {{cite:notice-citroen-c3|p. 113}}). Une baisse anormale ou répétée du niveau ne l'est pas : les notices Renault Clio 5 et Dacia Sandero 3 demandent alors de consulter un représentant de la marque. La notice Seat Ibiza demande de faire inspecter le circuit par un atelier spécialisé si la voiture perd du liquide : {{verdict:ligne-3}}, selon l'encadré.

Si le liquide bouillonne dans le bocal, ou si le moteur chauffe, voyez la page [moteur qui surchauffe](/moteur-qui-surchauffe/).

## Liquide marron dans le vase d'expansion

{{repere:ligne-4}}

Selon la notice Seat Ibiza, un liquide marron au lieu de lilas veut dire que l'additif G12evo a été mélangé avec un liquide inadapté. Le liquide doit alors être remplacé immédiatement : {{verdict:ligne-4}}, selon l'encadré. Aucune autre notice lue ne parle de la couleur du liquide.

## Voyant de température rouge

{{repere:temperature-rouge}}

Le voyant de température rouge signale un moteur qui surchauffe ou un manque de liquide : {{verdict:temperature-rouge}}, selon l'encadré. La page [moteur qui surchauffe](/moteur-qui-surchauffe/) dit quoi faire pas à pas.

## Quand changer le liquide de refroidissement ?

À l'échéance du document d'entretien de votre voiture, selon les notices Renault Clio 5 et Dacia Sandero 3. Parmi les notices lues, aucune ne donne de durée ni de kilométrage ({{cite:notice-renault-clio-5|p. 334-335}} ; {{cite:notice-dacia-sandero-3|p. 298}}). La notice Seat Ibiza demande aussi de remplacer sans attendre un liquide devenu marron.

## Ce que dit chaque notice sur le liquide de refroidissement

{{tableau}}

| Notice | Liquide à mettre | Contrôle du niveau | Appoint | Vase vide ou perte de liquide |
|---|---|---|---|---|
| Peugeot 208 | Non nommé dans la rubrique | Moteur froid ; proche du repère maxi, sans le dépasser | Normal entre deux révisions ; impératif près du repère mini ou en dessous | Non traité dans la rubrique |
| Citroën C3 | Non nommé dans la rubrique | Comme Peugeot 208 | Comme Peugeot 208 | Non traité dans la rubrique |
| Renault Clio 5 phase 2 | Produits agréés par les services techniques de la marque | À froid, contact coupé, sur sol horizontal ; entre les repères mini et maxi | Avant que le niveau n'atteigne le repère mini | Baisse anormale ou répétée : représentant de la marque ; bocal vide quand le moteur chauffe : représentant le plus tôt possible |
| Dacia Sandero 3 | Comme Renault Clio 5 | Comme Renault Clio 5 | Comme Renault Clio 5 | Comme Renault Clio 5 |
| Seat Ibiza | Eau et au moins 40 % d'additif G12evo, couleur lilas ; jamais mélangé avec un liquide non homologué | Moteur froid, voiture à plat, contact coupé ; entre les repères | Sous le repère mini, seulement s'il reste du liquide | Vase vide : s'arrêter, spécialiste ; perte : atelier spécialisé |

Le tableau résume les notices lues ({{cite:notice-peugeot-208|p. 167}} ; {{cite:notice-citroen-c3|p. 113}} ; {{cite:notice-renault-clio-5|p. 334-335 et 387}} ; {{cite:notice-dacia-sandero-3|p. 298 et 349-350}} ; {{cite:notice-seat-ibiza|p. 297-298}}). La notice Toyota Yaris n'a pas été lue pour ce liquide. Pour une autre voiture, sa notice fait foi.
