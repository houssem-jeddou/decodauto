---
# Page de démonstration du modèle fluide au format 2 (étape 11, partie technique du modèle) : jamais publiée, lue seulement
# par la construction de démonstration du format 2 (DEMO_FORMAT2=1) et par les tests du modèle. Copie de l'exemple
# « niveau d'huile » de la préparation de l'étape 11 (branche preparation/etape-11, exemples/fluide/niveau-huile.md, 4e6851f),
# brouillon jamais validé. Seuls changent ce commentaire ; le lien vers la page mère « huile moteur », écrit en texte (cette
# page n'est pas construite, le lien serait cassé : npm run liens) ; et la réponse directe, celle que l'exemple propose en
# commentaire (règle 2c de la demande n° 30 : page informative, reponse_directe ouverte au type fluide). Sans empreinte (R4-VALIDATION-ABSENTE attendue, attendusPagesDemo).
# Format tutoriel : fiche « Le fluide en bref », fiche du tutoriel, étapes {{etapes}}, tableau {{tableau}} (élément unique),
# deux lignes de la base (huile-niveau, huile-pression-rouge) avec leur tableau des notices, illustration jauge-huile.
id: niveau-huile
title: "Niveau d'huile moteur : le vérifier à la jauge et faire l'appoint"
h1: "Niveau d'huile moteur : comment le vérifier, et que faire s'il est trop bas ou trop haut ?"
description: "Vérifiez le niveau d'huile sur un sol plat, moteur arrêté depuis 30 minutes : il doit se situer entre les repères mini et maxi de la jauge. En dessous ou au-dessus, ne démarrez pas."
libelle_court: Niveau d'huile
question_decision: "Niveau d'huile trop bas ou trop haut, voyant d'huile allumé : puis-je démarrer et rouler ?"
reponse_directe: "Sur un sol plat, moteur arrêté depuis 30 minutes, le niveau doit se situer entre les repères mini et maxi de la jauge, selon les notices Peugeot 208 et Citroën C3."
situations:
  - situation: "À la jauge, le niveau d'huile est sous le repère mini"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Ne démarrez pas le moteur : complétez d'abord le niveau avec une huile conforme au plan d'entretien, par petites quantités, puis revérifiez à la jauge quelques minutes après."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 166, « Huile moteur », « Vérification avec la jauge manuelle »"
        extrait: "Ne pas démarrer le moteur si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 112-113, « Huile moteur », « Vérification avec la jauge manuelle »"
        extrait: "Ne pas démarrer le moteur, si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur."
        verdict: non, arrêt immédiat
        urgence: immédiate
  - situation: "À la jauge, le niveau d'huile est au-dessus du repère maxi"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Ne démarrez pas le moteur : faites appel au réseau de la marque ou à un atelier qualifié."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 166, « Huile moteur », « Vérification avec la jauge manuelle »"
        extrait: "Ne pas démarrer le moteur si le niveau est : – Supérieur au repère A : faire appel au réseau PEUGEOT ou à un atelier qualifié."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 112-113, « Huile moteur », « Vérification avec la jauge manuelle »"
        extrait: "Ne pas démarrer le moteur, si le niveau est : – Supérieur au repère A : faire appel au réseau CITROËN ou à un atelier qualifié."
        verdict: non, arrêt immédiat
        urgence: immédiate
  - voyant: huile-niveau
  - voyant: huile-pression-rouge
voyants:
  - huile-niveau
  - huile-pression-rouge
element_unique: tableau
format: 2
illustration:
  fichier: jauge-huile
  alt: "La jauge d'huile du moteur, à lire sur un sol plat, moteur arrêté depuis 30 minutes : le niveau doit se situer entre les repères mini et maxi"
  legende: "Contrôle du niveau d'huile, selon les notices Peugeot 208 et Citroën C3 : sur un sol plat, moteur à l'arrêt depuis 30 minutes, le niveau se situe entre les repères mini et maxi de la jauge."
tutoriel:
  outils:
    - "la jauge manuelle de la voiture, ou l'indicateur de niveau du combiné (jauge électrique)"
    - "pour un appoint, une huile conforme au plan d'entretien de la voiture"
  duree: "30 minutes d'attente moteur arrêté avant la mesure ; après un appoint, quelques minutes avant de revérifier"
  difficulte: facile
  quand_ne_pas_le_faire_soi_meme: "Niveau au-dessus du repère maxi : faites appel au réseau de la marque ou à un atelier qualifié (notices Peugeot 208 et Citroën C3). Baisse importante du niveau : faites vérifier le circuit (notice Peugeot 208)."
normes:
  - "Une huile qui correspond à la motorisation et conforme au plan d'entretien de la voiture (notices Peugeot 208 et Citroën C3)"
  - "Jamais d'additif dans l'huile moteur (notices Peugeot 208 et Citroën C3)"
comment_verifier: "Sur un sol plat, moteur à l'arrêt depuis 30 minutes, avec l'indicateur de niveau du combiné à la mise du contact (jauge électrique) ou avec la jauge manuelle : le niveau correct se situe entre les repères maxi et mini (notices Peugeot 208 et Citroën C3)."
quand_changer:
  texte: "La vidange se fait à l'échéance du plan d'entretien, que rappellent le voyant clé ou un message de révision ou de vidange. Entre deux vidanges, les notices Peugeot 208 et Citroën C3 préconisent un contrôle du niveau, avec appoint si nécessaire, tous les 5 000 km."
  sources:
    - notice-peugeot-208
    - notice-citroen-c3
    - notice-seat-ibiza
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - notice-toyota-yaris
cout_probable:
  pieces:
    - appoint-huile
    - capteur-ou-sonde
    - moteur
  base_de_calcul: "La dépense va de l'appoint d'huile, que vous faites vous-même, à la tranche du moteur, la plus lourde, quand le voyant de pression d'huile s'allume alors que le niveau est correct : aucune notice lue ne nomme alors la pièce en cause. Un capteur de niveau défaillant se répare au garage (notice Seat Ibiza). Le risque si l'on continue vient de la notice Peugeot 208 : un manque d'huile qu'on ne complète pas peut détériorer le moteur."
  sources:
    - notice-peugeot-208
    - notice-seat-ibiza
  si_vous_continuez:
    tranche: organe
    citations:
      - voyant: huile-niveau
        source: notice-peugeot-208
        emplacement: "p. 20, « Indicateur de niveau d'huile moteur », Manque d'huile"
sources:
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-seat-ibiza
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-17
date_modification: 2026-11-17
date_revue: 2026-11-17
prochaine_revue: 2027-11-17
---

## Vérifier le niveau d'huile moteur, étape par étape

Ces étapes sont celles des notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}} ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-citroen-c3|p. 112-113}}). Sur une autre voiture, suivez sa notice.

{{etapes}}

1. Garez la voiture sur un sol plat et coupez le moteur.
2. Attendez 30 minutes, moteur à l'arrêt.
3. Si votre voiture a une jauge électrique, mettez le contact : le niveau s'affiche quelques secondes au combiné.
4. Sinon, ou pour confirmer un manque d'huile, lisez le niveau sur la jauge manuelle : il doit se situer entre les repères mini et maxi.
5. Sous le repère mini, ne démarrez pas : complétez par petites quantités avec l'huile du plan d'entretien, attendez quelques minutes, puis revérifiez à la jauge.
6. Au-dessus du repère maxi, ne démarrez pas : faites appel au réseau de la marque ou à un atelier qualifié.

Après un appoint, l'indication du combiné n'est pas valable pendant 30 minutes : vérifiez à la jauge manuelle ({{cite:notice-peugeot-208|p. 166}}). N'ajoutez jamais d'additif dans l'huile moteur, demandent ces deux notices.

## Vérifier le niveau d'huile moteur à chaud ou à froid ?

Ni juste après avoir roulé, ni moteur tournant : selon les notices Peugeot 208 et Citroën C3, la vérification se fait sur un sol plat, moteur à l'arrêt depuis 30 minutes. La notice Peugeot 208 précise que la mesure de la jauge électrique n'est valable qu'à ces conditions ({{cite:notice-peugeot-208|p. 20}}). Pour une autre voiture, sa notice fait foi.

## Quel est le bon niveau d'huile moteur ?

Le bon niveau se situe entre les repères mini et maxi de la jauge, selon les notices Peugeot 208 et Citroën C3. Ni trop bas, ni trop haut : dans les deux cas, ces notices demandent de ne pas démarrer le moteur.

## Niveau d'huile sous le repère mini : puis-je démarrer ?

{{repere:ligne-1}}

Non, pas avant d'avoir complété le niveau : les notices Peugeot 208 et Citroën C3 demandent de ne pas démarrer le moteur et de faire impérativement un complément d'huile. Versez par petites quantités une huile qui correspond au moteur et au plan d'entretien, puis revérifiez à la jauge quelques minutes après ({{cite:notice-peugeot-208|p. 166}}).

## Trop d'huile, au-dessus du repère maxi : que faire ?

{{repere:ligne-2}}

Ne démarrez pas le moteur et faites appel au réseau de la marque ou à un atelier qualifié, comme le demandent les notices Peugeot 208 et Citroën C3 ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-citroen-c3|p. 112-113}}). Ces notices ne disent pas ce que risque le moteur dans ce cas : cette page ne le dit donc pas non plus.

## Faire le niveau d'huile : quelle huile, à quelle fréquence ?

L'huile doit correspondre à la motorisation et être conforme au plan d'entretien de votre voiture, selon les notices Peugeot 208 et Citroën C3. La page « huile moteur » explique comment lire ce que demande votre notice. Les notices lues ne donnent pas de quantité d'appoint : versez peu à la fois et revérifiez.

Ces deux notices préconisent un contrôle, avec appoint si nécessaire, tous les 5 000 km. La notice {{notice:notice-seat-ibiza}} recommande de contrôler le niveau à chaque passage à la pompe ({{cite:notice-seat-ibiza|p. 294}}).

## Ce que dit chaque notice sur le niveau d'huile

{{tableau}}

| Notice | Comment un niveau bas est signalé | Ce que demande la notice |
|---|---|---|
| Peugeot 208 | Affichage « OIL » ou message « Niveau d'huile incorrect », avec le témoin de service et un signal sonore ; indicateur de niveau au combiné, à la mise du contact, avec une jauge électrique | Confirmer à la jauge manuelle ; si le manque est confirmé, compléter impérativement le niveau ; sous le mini ou au-dessus du maxi, ne pas démarrer |
| Citroën C3 | Indicateur de niveau au combiné, à la mise du contact, avec une jauge électrique | Mêmes consignes que la Peugeot 208 pour la jauge : sous le mini ou au-dessus du maxi, ne pas démarrer |
| Seat Ibiza | Témoin jaune ; s'il clignote, le capteur de niveau est défaillant | Contrôler immédiatement le niveau et faire l'appoint dès que possible ; capteur : atelier spécialisé ; contrôle conseillé à chaque passage à la pompe |
| Renault Clio 5 phase 2 | Alerte de l'afficheur au démarrage, au niveau minimum ; témoin de pression d'huile allumé en virage ou au freinage | Ajouter de l'huile moteur |
| Dacia Sandero 3 | Alerte de l'afficheur au démarrage, au niveau minimum ; témoin de pression d'huile allumé en virage ou au freinage | Ajouter de l'huile moteur |
| Toyota Yaris | Message « Niveau d'huile moteur faible. Ajoutez ou remplacez. » | Vérifier le niveau et faire l'appoint si nécessaire |

Le tableau résume les notices lues ({{cite:notice-peugeot-208|p. 20 et 166}} ; {{cite:notice-citroen-c3|p. 112-113}} ; {{cite:notice-seat-ibiza|p. 294}} ; {{cite:notice-renault-clio-5|p. 131 et 386}} ; {{cite:notice-dacia-sandero-3|p. 105 et 348-349}} ; {{cite:notice-toyota-yaris|p. 299}}). Seules les notices Peugeot 208 et Citroën C3 disent quoi faire quand la jauge est sous le mini ou au-dessus du maxi ; pour une autre voiture, suivez sa notice.

## Voyant de niveau d'huile orange : puis-je rouler ?

{{repere:huile-niveau}}

{{verdict:huile-niveau}}, selon l'encadré : vérifiez sans attendre le niveau à la jauge, voiture à plat et moteur arrêté, puis faites l'appoint. Seat Ibiza et Peugeot 208 demandent de le faire immédiatement ou impérativement ; la notice Toyota Yaris ne donne pas de délai. La page [voyant huile](/voyants/huile/) compare les notices une à une.

## Voyant d'huile rouge : faut-il s'arrêter ?

{{repere:huile-pression-rouge}}

Oui : {{verdict:huile-pression-rouge}}. Ce voyant signale une pression d'huile trop faible : arrêtez-vous dès que vous pouvez le faire sans danger, coupez le moteur et vérifiez le niveau. Même si le niveau est correct, ne repartez pas : faites appel à un garage ou à l'assistance.

## Pourquoi ma voiture consomme de l'huile ?

Faire des appoints entre deux vidanges est normal, selon les notices Peugeot 208 et Citroën C3 ({{cite:notice-peugeot-208|p. 166}}). En cas de baisse importante du niveau, la notice Peugeot 208 demande de faire vérifier le circuit par le réseau ou par un atelier qualifié ({{cite:notice-peugeot-208|p. 165}}). Les notices lues ne donnent pas les causes d'une consommation excessive : demandez l'avis d'un professionnel.
