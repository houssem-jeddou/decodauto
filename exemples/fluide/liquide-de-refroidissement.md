---
# Brouillon, jamais validé. Étape 11 (vague C), lot C3 : page « liquide de refroidissement » (modèle fluide, format 2).
# Pas d'empreinte tant que Houssem n'a pas validé son encadré (paquet du lot C3).
# - Sources : relevé à l'écran du 17/11/2026 vers 13 h 30 (pdf.js dans Chrome ; travaux/etape-11/textes/releve-sources.md,
#   §12) : Seat Ibiza p. 297-298 ; Peugeot 208 p. 167 ; Citroën C3 p. 113 ; Renault Clio 5 phase 2 p. 334-335 et 387 ;
#   Dacia Sandero 3 p. 298, 349 et 350. Toyota Yaris : seulement la ligne de base (p. 292, 322-323).
# - Décisions du pilotage (règle 6, 17/11) : ligne de base `temperature-rouge` reprise ; liquide marron (Seat seule)
#   classé par la grille ; aucune périodicité chiffrée ; aucune couleur ni norme générale hors Seat. Après la revue
#   indépendante du 17/11 (I1 à I4) : vase vide sur la seule notice Seat, sans écart (comme la page « moteur qui
#   surchauffe ») ; Renault et Dacia classées selon le sens à la ligne 1 ; extrait Citroën C3 p. 113 relu ; durites (Toyota
#   p. 322-323, ligne de base) ; rien sur la couleur hors ce que dit Seat. Dacia : « Le moteur chauffe » en bas de p. 349
#   (PDF 351), radiateur p. 350 (PDF 352).
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
reponse_directe: "Celui que demande la notice ou le réseau de votre marque : parmi les notices lues, seule Seat Ibiza le nomme (G12evo). S'il en manque, faites l'appoint moteur froid ; si le vase d'expansion est vide, arrêtez-vous."
situations:
  - situation: "Moteur froid, le niveau est proche du repère mini ou en dessous, et il reste du liquide dans le vase d'expansion"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Moteur froid, faites l'appoint sans attendre jusqu'au repère maxi, sans le dépasser, avec le liquide que demande votre notice. N'ouvrez jamais le bouchon moteur chaud."
    ecart_marques: "Les notices Peugeot 208 et Citroën C3 jugent l'appoint impératif quand le niveau est proche du repère mini ou en dessous, et les notices Renault Clio 5 et Dacia Sandero 3 le demandent avant qu'il n'atteigne le mini ; la notice Seat Ibiza demande l'appoint sous le mini, sans donner de délai."
    ecart_court: "Plus stricts : Peugeot, Citroën (appoint impératif), Renault et Dacia (avant le mini). Moins strict : Seat (appoint, sans délai écrit)."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 167, « Liquide de refroidissement »"
        extrait: "Un niveau insuffisant présente des risques de dommages importants pour le moteur, il doit se situer proche du repère \"MAXI\" sans jamais le dépasser. Si le niveau est proche ou en-dessous du repère \"MINI\", il est impératif de faire un appoint."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 113, « Liquide de refroidissement »"
        extrait: "Le niveau de ce liquide doit se situer proche du repère \" MAXI \" sans jamais le dépasser. Si le niveau est proche ou en-dessous du repère \" MINI \", il est impératif de faire un appoint."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 334-335, « Niveau liquide de refroidissement »"
        extrait: "Contact coupé et sur sol horizontal, le niveau à froid doit se situer entre les repères \"MINI\" et \"MAXI\" indiqués sur le bocal de liquide de refroidissement. Complétez ce niveau à froid avant qu'il n'atteigne le repère \"MINI\"."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 298, « Niveau liquide de refroidissement »"
        extrait: "Contact coupé et sur sol horizontal, le niveau à froid doit se situer entre les repères \"MINI\" et \"MAXI\" indiqués sur le bocal de liquide de refroidissement. Complétez ce niveau à froid avant qu'il n'atteigne le repère \"MINI\"."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 298, « Liquide de refroidissement »"
        extrait: "Faites l'appoint de liquide de refroidissement lorsque son niveau descend en dessous de la marque [min] (minimum)."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - situation: "Le vase d'expansion est vide : il n'y reste plus de liquide de refroidissement"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Ne faites pas l'appoint vous-même : faites appel à un garage ou à l'assistance pour un dépannage."
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
    action: "Selon la notice Seat Ibiza, le liquide a été mélangé avec un liquide inadapté : faites-le remplacer sans attendre par le réseau de la marque ou un atelier."
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
  alt: "Le vase d'expansion, grand bocal translucide relié aux durites, bouchon à visser fermé, avec ses repères MAX et MIN sur la paroi : le niveau se lit moteur froid, entre les deux ; le bouchon ne s'ouvre jamais moteur chaud"
  legende: "Le niveau se lit moteur froid, sur la paroi du vase d'expansion, entre les repères mini et maxi. Les repères et leur nom varient selon la voiture : voyez votre notice."
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
    - durites-et-colliers
    - moteur
  base_de_calcul: "La dépense va de l'appoint, que vous faites vous-même, au remplacement du liquide (entretien). Elle peut aller jusqu'au moteur, la tranche la plus lourde : selon la notice Peugeot 208, un niveau insuffisant présente des risques de dommages importants pour le moteur. En cas de fuite, la notice Toyota Yaris fait vérifier les durites et le radiateur : une durite ou un collier à changer est une réparation au garage (liste des pièces du site)."
  sources:
    - notice-peugeot-208
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

## Liquide de refroidissement rose, lilas ou G12 : ce que disent les notices

Parmi les notices lues, seule la notice Seat Ibiza parle de couleur : son liquide d'origine, à l'additif G12evo, est de couleur lilas ; un liquide marron dans le vase d'expansion veut dire qu'il a été mélangé avec un liquide inadapté, et il doit être remplacé immédiatement. Elle demande d'éviter de mélanger le G12evo avec les liquides G13, G12 plus-plus, G12 plus, G12 (rouge) ou G11 (bleu verdâtre), car le mélange dégrade la protection contre la corrosion ({{cite:notice-seat-ibiza|p. 297}}).

Les notices Renault Clio 5 et Dacia Sandero 3 renvoient aux produits agréés par les services techniques de la marque, sans parler de couleur ; les notices Peugeot 208 et Citroën C3 n'en parlent pas dans leur rubrique.

## Antigel : jusqu'à quelle température protège-t-il ?

Selon la notice Seat Ibiza, le mélange d'origine, avec au moins 40 % d'additif, protège jusqu'à -25 °C. Ce taux reste d'au moins 40 % même par temps chaud. Par grand froid, il peut monter jusqu'à 60 %, pas au-delà : la protection contre le gel diminuerait et le refroidissement serait moins bon ({{cite:notice-seat-ibiza|p. 297}}).

La même notice prévient que, sans assez d'antigel, le liquide peut geler par très grand froid et immobiliser la voiture. Pour une autre marque, la notice ou le réseau donne la protection de son liquide.

## Où lire le niveau : le vase d'expansion

Le niveau se lit dans le vase d'expansion, le bocal du liquide de refroidissement, moteur froid, contact coupé et voiture à plat. Il doit se situer entre les repères mini et maxi ; selon les notices Peugeot 208 et Citroën C3, proche du repère maxi sans jamais le dépasser. Selon la notice Seat Ibiza, moteur chaud, il peut se situer légèrement au-dessus de la marque supérieure ({{cite:notice-peugeot-208|p. 167}} ; {{cite:notice-citroen-c3|p. 113}} ; {{cite:notice-seat-ibiza|p. 298}}).

La notice Seat Ibiza demande de ne jamais ouvrir le bouchon du vase d'expansion tant que le moteur est chaud : le circuit est sous pression, risque de brûlures ({{cite:notice-seat-ibiza|p. 298}}). La notice Peugeot 208 demande d'attendre au moins une heure après l'arrêt du moteur ; pour une intervention urgente, elle demande de dévisser le bouchon de deux tours, avec un chiffon, pour laisser retomber la pression ({{cite:notice-peugeot-208|p. 167}}).

## Niveau proche du mini ou en dessous : faire l'appoint

{{repere:ligne-1}}

{{verdict:ligne-1}}, selon l'encadré. Moteur froid, complétez jusqu'au repère maxi avec le liquide que demande votre notice : les notices Peugeot 208 et Citroën C3 jugent l'appoint impératif quand le niveau est proche du repère mini ou en dessous, et les notices Renault Clio 5 et Dacia Sandero 3 demandent de compléter avant qu'il ne l'atteigne.

Selon la notice Seat Ibiza, couvrez le bouchon d'un chiffon et dévissez-le doucement, puis complétez jusqu'à obtenir un niveau stable. Revissez ensuite le bouchon correctement ({{cite:notice-seat-ibiza|p. 298}}).

Les notices Renault Clio 5 et Dacia Sandero 3 rappellent de ne jamais verser de liquide froid dans un moteur très chaud ({{cite:notice-renault-clio-5|p. 387}} ; {{cite:notice-dacia-sandero-3|p. 350}}).

## Vase d'expansion vide : puis-je rouler ?

{{repere:ligne-2}}

{{verdict:ligne-2}}, selon l'encadré. La notice Seat Ibiza demande de ne faire l'appoint que s'il reste du liquide dans le vase, sinon le moteur peut être endommagé. S'il est vide, elle demande de s'arrêter et de faire appel à un spécialiste en mesure de dépanner la voiture.

Les notices Renault Clio 5 et Dacia Sandero 3 parlent du bocal vide dans leur tableau « Le moteur chauffe », témoin de température allumé : ce témoin allumé, elles demandent de s'arrêter, comme la ligne du voyant de température plus bas ({{cite:notice-renault-clio-5|p. 387}} ; {{cite:notice-dacia-sandero-3|p. 349}}).

## Ma voiture consomme du liquide de refroidissement : est-ce normal ?

{{repere:ligne-3}}

Un appoint entre deux révisions est normal, selon la notice Peugeot 208 ({{cite:notice-peugeot-208|p. 167}}). Une baisse anormale ou répétée du niveau ne l'est pas : les notices Renault Clio 5 et Dacia Sandero 3 demandent alors de consulter un représentant de la marque. La notice Seat Ibiza demande de faire inspecter le circuit par un atelier spécialisé si la voiture perd du liquide : {{verdict:ligne-3}}, selon l'encadré.

En cas de fuite, la notice Toyota Yaris demande de vérifier, moteur suffisamment refroidi, que les durites et le radiateur ne présentent pas de fuites ({{cite:notice-toyota-yaris|p. 322-323}}). Si le liquide bouillonne dans le bocal, ou si le moteur chauffe, voyez la page [moteur qui surchauffe](/moteur-qui-surchauffe/).

## Liquide marron dans le vase d'expansion

{{repere:ligne-4}}

{{verdict:ligne-4}}, selon l'encadré. Selon la notice Seat Ibiza, un liquide marron au lieu de lilas veut dire que l'additif G12evo a été mélangé avec un liquide inadapté : il doit être remplacé immédiatement. Aucune autre notice lue ne parle de la couleur du liquide.

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
| Citroën C3 | Non nommé dans la rubrique | Proche du repère maxi, sans le dépasser | Impératif près du repère mini ou en dessous | Non traité dans la rubrique |
| Renault Clio 5 phase 2 | Produits agréés par les services techniques de la marque | À froid, contact coupé, sur sol horizontal ; entre les repères mini et maxi | Avant que le niveau n'atteigne le repère mini | Baisse anormale ou répétée : représentant de la marque ; moteur qui chauffe, témoin allumé : s'arrêter |
| Dacia Sandero 3 | Comme Renault Clio 5 | Comme Renault Clio 5 | Comme Renault Clio 5 | Comme Renault Clio 5 |
| Seat Ibiza | Eau et au moins 40 % d'additif G12evo, couleur lilas ; jamais mélangé avec un liquide non homologué | Moteur froid, voiture à plat, contact coupé ; entre les repères | Sous le repère mini, seulement s'il reste du liquide | Vase vide : s'arrêter, spécialiste ; perte : atelier spécialisé |

Le tableau résume les notices lues ({{cite:notice-peugeot-208|p. 167}} ; {{cite:notice-citroen-c3|p. 113}} ; {{cite:notice-renault-clio-5|p. 334-335 et 387}} ; {{cite:notice-dacia-sandero-3|p. 298, 349 et 350}} ; {{cite:notice-seat-ibiza|p. 297-298}}). La notice Toyota Yaris n'a été lue que pour son voyant de température et la surchauffe (durites et radiateur). Pour une autre voiture, sa notice fait foi.
