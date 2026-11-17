---
# Brouillon, jamais validé. Étape 11 (vague C), lot C3 : page « liquide de frein » (modèle fluide, format 2). Pas
# d'empreinte tant que Houssem n'a pas validé son encadré (paquet du lot C3).
# - Sources : relevé à l'écran du 17/11/2026 vers 13 h 30 (pdf.js dans Chrome ; travaux/etape-11/textes/releve-sources.md,
#   §12) : Seat Ibiza p. 299 (remplace Seat Leon p. 370, même consigne) ; Peugeot 208 p. 166 ; Citroën C3 p. 113 ;
#   Renault Clio 5 phase 2 p. 336-337 ; Dacia Sandero 3 p. 299. Toyota Yaris : non lue (PDF refusé par le navigateur).
# - Décisions du pilotage (règle 6, 17/11) : encadré sur ces citations, le plus prudent l'emporte, écart signalé (niveau
#   sous le mini : Seat « faites appel à un spécialiste en mesure de vous dépanner » contre Peugeot et Citroën « vérifier
#   l'usure des plaquettes ») ; ligne de base `frein-rouge` reprise ; DOT 4 dit seulement comme Peugeot, Citroën et Seat
#   le disent ; aucune périodicité chiffrée.
# - Contrôle technique (annexe I, 1.1.10 d et 1.8.1) : lu seulement par lecture automatique [WF], à relire à l'écran ;
#   pas cité sur la page.
# - Requête principale « liquide de frein » : demande de changement n° 37 (travaux/etape-11/lot-c3), proposée.
# - Illustration : `liquide-frein-reservoir`, dessinée pour cette page (travaux/etape-11/generer-illustrations.py).
id: liquide-de-frein
title: "Liquide de frein : niveau, quel liquide et quand le changer"
h1: "Liquide de frein : niveau bas, quel liquide mettre et quand le remplacer ?"
description: "Niveau sous le mini ou en baisse rapide : faites appel à un spécialiste. Un liquide neuf, changé à l'échéance du plan d'entretien, selon cinq notices."
libelle_court: Liquide de frein
question_decision: "Puis-je rouler si le niveau de liquide de frein baisse, et quand faut-il le changer ?"
reponse_directe: "Si le niveau passe sous le repère mini ou baisse vite, ne poursuivez pas votre trajet : selon la notice Seat Ibiza, le circuit n'est peut-être plus étanche. Le liquide se change à l'échéance du plan d'entretien."
situations:
  - situation: "Au réservoir, le niveau de liquide de frein est sous le repère mini, ou il a nettement baissé en peu de temps"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Ne poursuivez pas votre trajet : le circuit de freinage n'est peut-être plus étanche. Faites appel à un spécialiste ou à l'assistance pour un dépannage."
    ecart_marques: "La notice Seat Ibiza demande de faire appel à un spécialiste en mesure de dépanner la voiture ; les notices Peugeot 208 et Citroën C3 demandent de vérifier l'usure des plaquettes, et la notice Renault Clio 5 de consulter un représentant de la marque en cas de baisse anormale."
    ecart_court: "Plus strict : Seat (spécialiste pour un dépannage). Moins stricts : Peugeot, Citroën (usure des plaquettes) et Renault (représentant de la marque)."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 299, « Liquide de freins »"
        extrait: "Si le niveau de liquide de frein diminue sensiblement en peu de temps ou descend en dessous du repère [MIN], il se peut que le système de freinage ne soit plus étanche. Faites appel à un spécialiste en mesure de vous dépanner."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-peugeot-208
        emplacement: "p. 166, « Liquide de freins »"
        extrait: "Le niveau de ce liquide doit se situer proche du repère \"MAXI\". Sinon, vérifier l'état d'usure des plaquettes de freins."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-citroen-c3
        emplacement: "p. 113, « Liquide de freins »"
        extrait: "Le niveau de ce liquide doit se situer proche du repère \"MAXI\". Sinon, vérifier l'état d'usure des plaquettes de freins."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-renault-clio-5
        emplacement: "p. 336-337, « Liquide de freins »"
        extrait: "Le niveau baisse normalement en même temps que l'usure des garnitures, mais il ne doit jamais descendre en dessous de la cote d'alerte \"MINI\". […] En cas de baisse anormale ou répétée du niveau, consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - voyant: frein-rouge
voyants:
  - frein-rouge
element_unique: tableau
format: 2
illustration:
  fichier: liquide-frein-reservoir
  alt: "Le réservoir de liquide de frein, bouchon fermé, avec ses repères MAXI et MINI : le niveau se lit entre les deux ; sous le MINI, ou en baisse rapide, c'est une alerte"
  legende: "Le niveau se lit au réservoir, entre les repères mini et maxi. Sous le mini, ou s'il baisse vite, voyez l'encadré. Les repères et leur nom varient selon la voiture."
normes:
  - "Un liquide neuf, de la norme que demande la notice de votre voiture, prélevé d'un bidon scellé (Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3)"
  - "DOT4 chez Peugeot 208 et Citroën C3"
  - "chez Seat Ibiza, la norme VW 501 14, sinon un liquide conforme à la norme DIN ISO 4925 CLASS 4 ou à la norme américaine FMVSS 116 DOT 4"
  - "chez Renault Clio 5 et Dacia Sandero 3, un liquide agréé par les services techniques de la marque."
comment_verifier: "Contact coupé et voiture à plat, au réservoir : le niveau se situe entre les repères mini et maxi, proche du maxi selon les notices Peugeot 208 et Citroën C3. La notice Renault Clio 5 demande de le contrôler souvent, et dès que le freinage semble différent, même légèrement."
quand_changer:
  texte: "À l'échéance du plan ou du document d'entretien de votre voiture : les notices lues ne donnent aucune durée. Selon les notices Renault Clio 5 et Dacia Sandero 3, toute intervention sur le circuit hydraulique impose aussi de remplacer le liquide, par un spécialiste."
  sources:
    - notice-peugeot-208
    - notice-citroen-c3
    - notice-renault-clio-5
    - notice-dacia-sandero-3
cout_probable:
  pieces:
    - liquide-de-frein
    - plaquettes-et-disques
    - circuit-de-freinage
  base_de_calcul: "La dépense va du remplacement du liquide et des plaquettes (entretien) à la réparation du circuit de freinage, quand il n'est plus étanche : c'est la cause que donne la notice Seat Ibiza pour un niveau qui baisse vite. Les notices Peugeot 208 et Citroën C3 relient un niveau bas à l'usure des plaquettes."
  sources:
    - notice-seat-ibiza
    - notice-peugeot-208
    - notice-citroen-c3
  si_vous_continuez:
    tranche: reparation
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 299, « Liquide de freins », AVERTISSEMENT"
        extrait: "Si le niveau du liquide de frein est faible, ou si le liquide de frein n'est pas approprié ou ancien, le système de freinage pourrait s'avérer défectueux ou la puissance de freinage pourrait être réduite."
        verdict: non, arrêt dès que possible
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

## Niveau de liquide de frein sous le mini ou qui baisse vite : puis-je rouler ?

{{repere:ligne-1}}

Non : {{verdict:ligne-1}}, selon l'encadré. Selon la notice Seat Ibiza, un niveau qui passe sous le repère mini, ou qui baisse nettement en peu de temps, peut vouloir dire que le circuit de freinage n'est plus étanche. Elle demande alors de faire appel à un spécialiste en mesure de dépanner la voiture.

Les autres notices lues sont moins strictes. Les notices Peugeot 208 et Citroën C3 demandent de vérifier l'usure des plaquettes quand le niveau n'est plus proche du repère maxi. La notice Renault Clio 5 demande de consulter un représentant de la marque en cas de baisse anormale ou répétée.

## Le niveau baisse avec l'usure des plaquettes : est-ce normal ?

En partie : selon les notices Renault Clio 5 et Dacia Sandero 3, le niveau baisse normalement à mesure que les garnitures de frein s'usent, mais il ne doit jamais descendre sous la cote d'alerte mini ({{cite:notice-renault-clio-5|p. 336-337}} ; {{cite:notice-dacia-sandero-3|p. 299}}). C'est pourquoi les notices Peugeot 208 et Citroën C3 demandent de vérifier l'usure des plaquettes quand le niveau baisse ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-citroen-c3|p. 113}}).

Le niveau se lit au réservoir, contact coupé et voiture à plat, entre les repères mini et maxi. La notice Renault Clio 5 demande de le contrôler souvent, et chaque fois que le freinage semble différent, même légèrement.

## Voyant de liquide de frein allumé

{{repere:frein-rouge}}

Un niveau de liquide de frein bas allume aussi le voyant de freinage rouge : {{verdict:frein-rouge}}, selon l'encadré. La notice Seat Ibiza précise qu'un témoin du combiné indique le niveau de liquide de frein ({{cite:notice-seat-ibiza|p. 299}}). La page [voyant frein](/voyants/frein/) explique ce voyant et ses autres causes.

## Quel liquide de frein mettre : DOT 4 ?

Celui que demande la notice de votre voiture. Les notices Peugeot 208 et Citroën C3 demandent uniquement du liquide de freins DOT4, provenant d'un bidon scellé. La notice Seat Ibiza demande un liquide conforme à la norme VW 501 14, sinon un liquide de haute qualité conforme à la norme DIN ISO 4925 CLASS 4 ou à la norme américaine FMVSS 116 DOT 4 ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-citroen-c3|p. 113}} ; {{cite:notice-seat-ibiza|p. 299}}).

Les notices Renault Clio 5 et Dacia Sandero 3 ne donnent pas de norme : elles demandent un liquide agréé par les services techniques de la marque, prélevé d'un bidon scellé. Selon la notice Seat Ibiza, le liquide doit être neuf ({{cite:notice-renault-clio-5|p. 336-337}} ; {{cite:notice-dacia-sandero-3|p. 299}}).

## Faire l'appoint de liquide de frein : précautions

La notice Peugeot 208 demande de nettoyer le bouchon avant de le retirer pour faire l'appoint. La notice Seat Ibiza demande de garder le liquide dans son bidon d'origine fermé, hors de portée des enfants, car il est toxique, et de ne pas le laisser toucher la peinture, qu'il abîme.

Si le niveau baisse vite ou passe sous le repère mini, suivez la ligne de l'encadré.

## Quand changer le liquide de frein ?

À l'échéance du plan ou du document d'entretien de votre voiture : les notices Peugeot 208, Citroën C3, Renault Clio 5 et Dacia Sandero 3 y renvoient, sans donner de durée ni de kilométrage. Selon la notice Seat Ibiza, un liquide ancien, avec des freins très sollicités, peut former des bulles de vapeur qui allongent nettement la distance de freinage ({{cite:notice-seat-ibiza|p. 299}}).

## Remplacement du liquide de frein : par qui ?

La notice Seat Ibiza recommande de faire remplacer le liquide de frein par un service technique. Selon les notices Renault Clio 5 et Dacia Sandero 3, toute intervention sur le circuit hydraulique impose de remplacer le liquide, par un spécialiste ({{cite:notice-seat-ibiza|p. 299}} ; {{cite:notice-renault-clio-5|p. 336-337}} ; {{cite:notice-dacia-sandero-3|p. 299}}).

## Ce que dit chaque notice sur le liquide de frein

{{tableau}}

| Notice | Liquide à mettre | Contrôle du niveau | Niveau bas | Remplacement |
|---|---|---|---|---|
| Peugeot 208 | DOT4, d'un bidon scellé | Proche du repère maxi | Vérifier l'usure des plaquettes | Plan d'entretien du constructeur |
| Citroën C3 | Comme Peugeot 208 | Comme Peugeot 208 | Comme Peugeot 208 | Comme Peugeot 208 |
| Renault Clio 5 phase 2 | Agréé par les services techniques de la marque, d'un bidon scellé | Souvent, et à chaque différence de freinage ; contact coupé, sur sol horizontal | Jamais sous la cote d'alerte mini ; baisse anormale ou répétée : représentant de la marque | Document d'entretien ; après toute intervention sur le circuit hydraulique, par un spécialiste |
| Dacia Sandero 3 | Comme Renault Clio 5 | Consigne de contrôle fréquent de Renault non relevée | Jamais sous la cote d'alerte mini | Comme Renault Clio 5 |
| Seat Ibiza | VW 501 14, sinon DIN ISO 4925 CLASS 4 ou FMVSS 116 DOT 4 ; liquide neuf | Entre les repères ; témoin au combiné | Sous le repère mini ou baisse sensible en peu de temps : spécialiste pour un dépannage | Par un service technique, recommandé |

Le tableau résume les notices lues ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-citroen-c3|p. 113}} ; {{cite:notice-renault-clio-5|p. 336-337}} ; {{cite:notice-dacia-sandero-3|p. 299}} ; {{cite:notice-seat-ibiza|p. 299}}). La notice Toyota Yaris n'a pas été lue pour ce liquide. Pour une autre voiture, sa notice fait foi.
