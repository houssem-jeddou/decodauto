---
# Page « niveau d'huile » de la vague C (modèle fluide, format tutoriel, format 2), première page de l'étape 11. Validée par
# Houssem le 17/11/2026 à 11 h 34, mot pour mot sur la ligne du §8 de travaux/etape-11/paquet-exemple-niveau-huile.md
# (version 51b623e) ; empreinte posée et passage de exemples/ à src/content par la pull request du lot C1 (règle de
# passage), qui ouvre la vague C.
# - Sources : travaux/etape-11/textes/releve-sources.md, §3, et relectures à l'écran du 17/11/2026 (pdf.js dans Chrome,
#   vers 10 h 50 et 11 h 10) : Peugeot 208 p. 166, Citroën C3 p. 112-113, Renault Clio 5 phase 2 p. 331-332, Dacia
#   Sandero 3 p. 294-295, Seat Ibiza p. 294-295 (paquet, §3). Toyota Yaris p. 247 non lue (portail inaccessible).
# - Lignes 1 et 2 : celles du dossier PureTech (validées avec la porte 10), plus des citations ajoutées après la revue
#   indépendante du 17/11 : Seat p. 295 à la ligne 1 (écart entre marques) ; Renault p. 331, Dacia p. 295 et Seat
#   p. 295 à la ligne 2 (cinq notices, trois groupes, même niveau). Elles diffèrent donc de celles du dossier.
# - Modèle fluide au format 2 sur main depuis la PR n° 79 (pageFluideF2) ; réponse directe des pages fluides : demande
#   de changement n° 33, acceptée par Houssem le 17/11/2026 à 7 h 39.
# - Revue de la PR n° 79 (M4) puis revue indépendante de l'exemple (17/11, « à corriger », rien de bloquant) : corrections
#   B1 à B10 du pilotage (paquet, §4).
# - Illustration : `niveau-huile-jauge`, dessinée pour cette page (travaux/etape-11/generer-illustrations.py).
# - Révision du 18/11/2026 (étape 12, travaux/etape-12/niveau-huile/paquet-revision.md), validée par Houssem le 20/11/2026
#   à 20 h 47 (« je te donne le go pour valider la page « niveau d’huile » (PR #93 ») ; empreinte posée après la
#   validation : notice Toyota Yaris p. 247-249 lue (PDF officiel transmis par Houssem le 17/11) ;
#   ligne 3 « consommation ou baisse anormale » (Renault p. 330 et 333, Dacia p. 294, Peugeot p. 165 ; Renault p. 330 et
#   Dacia p. 294 : relevé à l'écran du 17/11, travaux/etape-11/textes/releve-sources.md, §11) ; durée de la fiche du
#   tutoriel ; lignes Renault et Dacia du tableau (témoin de pression allumé sur route, p. 137-138 et p. 111) ; corrections
#   de la revue indépendante du 18/11 (paquet, §6).
id: niveau-huile
title: "Niveau d'huile moteur : le vérifier à la jauge et faire l'appoint"
h1: "Niveau d'huile moteur : comment le vérifier, et que faire s'il est trop bas ou trop haut ?"
description: "Vérifier le niveau d'huile à la jauge, faire l'appoint et réagir à un niveau trop bas, trop haut ou qui baisse, selon les notices Peugeot, Citroën, Renault, Dacia, Seat et Toyota."
libelle_court: Niveau d'huile
question_decision: "Niveau d'huile trop bas, trop haut ou qui baisse, voyant d'huile allumé : puis-je démarrer et rouler ?"
reponse_directe: "Entre les repères mini et maxi de la jauge, voiture à plat. Selon la notice : moteur arrêté depuis 30 minutes (Peugeot, Citroën), après un arrêt prolongé (Renault, Dacia), ou chaud, environ 2 minutes (Seat) ou 5 (Toyota) après l'arrêt."
situations:
  - situation: "À la jauge, le niveau d'huile est sous le repère mini"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Ne démarrez pas le moteur : complétez d'abord le niveau avec une huile conforme au plan d'entretien, par petites quantités, puis revérifiez à la jauge après le temps que donne votre notice."
    ecart_marques: "Les notices Peugeot 208 et Citroën C3 interdisent de démarrer le moteur et demandent de compléter impérativement le niveau ; la notice Seat Ibiza demande d'ajouter de l'huile jusqu'à la zone B, et la notice Toyota Yaris d'ajouter une huile du même type, sans interdire de démarrer."
    ecart_court: "Plus stricts : Peugeot et Citroën (ne pas démarrer, compléter impérativement). Moins stricts : Seat et Toyota (ajouter de l'huile)."
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
      - source: notice-seat-ibiza
        emplacement: "p. 295, huile moteur, contrôle du niveau à la jauge"
        extrait: "Zone C : ajoutez de l'huile jusqu'à la zone B."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-toyota-yaris
        emplacement: "p. 248, 6.3, « Appoint d'huile moteur »"
        extrait: "Si le niveau d'huile est en dessous ou très proche du repère de bas niveau, ajoutez de l'huile moteur du même type que celle qui se trouve déjà dans le moteur."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - situation: "À la jauge, le niveau d'huile est au-dessus du repère maxi"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Ne démarrez pas le moteur : faites appel au réseau de la marque ou à un atelier qualifié."
    ecart_marques: "Les notices Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3 et Seat Ibiza interdisent de démarrer le moteur ; la notice Toyota Yaris demande de contacter un concessionnaire ou un réparateur qualifié, sans interdire de démarrer."
    ecart_court: "Plus stricts : Peugeot, Citroën, Renault, Dacia et Seat (ne pas démarrer). Moins strict : Toyota (contacter un réparateur)."
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
      - source: notice-renault-clio-5
        emplacement: "p. 331, huile moteur, remplissage"
        extrait: "Il ne faut en aucun cas dépasser le niveau maximum de remplissage B : risque d'endommagement du moteur et du système de dépollution. Si le niveau maxi est dépassé, ne démarrez pas votre véhicule et faites appel à un Représentant de la marque."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 295, huile moteur, remplissage"
        extrait: "Il ne faut en aucun cas dépasser le niveau maximum de remplissage B : risque d'endommagement du moteur et du système de dépollution. Si le niveau MAXI est dépassé, ne démarrez pas votre véhicule et faites appel à un Représentant de la marque."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 295, huile moteur, contrôle du niveau à la jauge"
        extrait: "Ne démarrez pas le moteur si le niveau d'huile se trouve au-dessus de la zone A. Risque d'endommagement du moteur et du catalyseur. Informez votre Service Technique."
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: notice-toyota-yaris
        emplacement: "p. 248, 6.3, « Le niveau d'huile moteur augmente »"
        extrait: "Si le niveau d'huile moteur dépasse le repère de limite supérieure de remplissage, contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Après le rodage, vous ajoutez plus de 0,5 litre d'huile aux 1 000 km, ou le niveau baisse anormalement"
    verdict: oui avec précautions
    urgence: sous quelques jours
    action: "Faites vérifier la voiture par le réseau de la marque ou un atelier qualifié ; d'ici là, vérifiez régulièrement le niveau à la jauge et faites l'appoint si nécessaire (sous le repère mini, ne démarrez pas)."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 330, « Niveau huile moteur », « Généralités »"
        extrait: "Toutefois, si après la période de rodage, les apports étaient supérieurs à 0,5 litre pour 1 000 km, consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-dacia-sandero-3
        emplacement: "p. 294, « Niveau huile moteur », « Généralités »"
        extrait: "Toutefois, si après la période de rodage, les apports étaient supérieurs à 0,5 litre pour 1 000 km, consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-renault-clio-5
        emplacement: "p. 333, huile moteur, « Vidange moteur »"
        extrait: "En cas de baisse anormale ou répétée du niveau, consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-peugeot-208
        emplacement: "p. 165, « Niveaux »"
        extrait: "En cas de baisse importante d'un niveau, faire vérifier le circuit correspondant par le réseau PEUGEOT ou par un atelier qualifié."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - voyant: huile-niveau
  - voyant: huile-pression-rouge
voyants:
  - huile-niveau
  - huile-pression-rouge
element_unique: tableau
format: 2
illustration:
  fichier: niveau-huile-jauge
  alt: "Sous le capot, le bouchon de remplissage et la poignée de la jauge ; à droite, la jauge sortie, le niveau d'huile lu entre les repères MAXI et MINI"
  legende: "Où regarder : la jauge, à lire entre les repères MAXI et MINI, et le bouchon de remplissage, où l'on verse l'huile. Leur emplacement figure sur le schéma du compartiment moteur de votre notice."
tutoriel:
  outils:
    - "la jauge manuelle ou l'indicateur de niveau du combiné (jauge électrique)"
    - "un chiffon propre et non pelucheux"
    - "un entonnoir"
    - "une huile conforme au plan d'entretien (pour un appoint)"
  duree: "selon la notice : moteur chaud, 2 à 5 minutes d'attente avant la mesure (Seat Ibiza, Toyota Yaris) ; moteur arrêté depuis 30 minutes (Peugeot 208, Citroën C3) ou après un arrêt prolongé (Renault Clio 5, Dacia Sandero 3) ; après un appoint, de quelques minutes à 20 minutes avant de revérifier"
  difficulte: facile
  quand_ne_pas_le_faire_soi_meme: "Niveau au-dessus du repère maxi : faites appel au réseau de la marque ou à un atelier qualifié (notices Peugeot 208, Citroën C3, Renault Clio 5 et Dacia Sandero 3 ; Seat Ibiza : informez votre service technique ; Toyota Yaris : contactez un réparateur qualifié). Baisse anormale ou répétée du niveau : consultez le réseau de la marque (notice Renault Clio 5) ou faites vérifier le circuit (notice Peugeot 208)."
normes:
  - "Selon le plan d'entretien de votre voiture"
  - "jamais d'additif dans l'huile moteur (notices Peugeot 208 et Citroën C3)."
comment_verifier: "Voiture à plat, à la jauge : le niveau se situe entre les repères mini et maxi. Moteur arrêté depuis 30 minutes (Peugeot 208, Citroën C3), après un arrêt prolongé (Renault Clio 5, Dacia Sandero 3), ou à température et coupé depuis environ 2 minutes (Seat Ibiza) ou 5 minutes (Toyota Yaris)."
quand_changer:
  texte: "La vidange se fait à l'échéance du plan d'entretien, que rappellent le voyant clé ou un message de révision ou de vidange. Entre deux vidanges, les notices Peugeot 208 et Citroën C3 préconisent un contrôle du niveau, avec appoint si nécessaire, tous les 5 000 km ; la notice Seat Ibiza, un contrôle de préférence après chaque plein et avant les longs trajets."
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
date_modification: 2026-11-20
date_revue: 2026-11-20
prochaine_revue: 2027-11-20
validation: 9c0f346579788d0ac17dd2a200fed4992360f4e370e5ae5294404cab33339bf5
---

## Vérifier le niveau d'huile moteur, étape par étape

Ces étapes réunissent celles des notices Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3, Seat Ibiza et Toyota Yaris, en disant laquelle demande quoi ({{cite:notice-peugeot-208|p. 20 et 166}} ; {{cite:notice-citroen-c3|p. 112-113}} ; {{cite:notice-renault-clio-5|p. 331-332}} ; {{cite:notice-dacia-sandero-3|p. 294-295}} ; {{cite:notice-seat-ibiza|p. 295}} ; {{cite:notice-toyota-yaris|p. 247-249}}). Sur une autre voiture, suivez sa notice.

{{etapes}}

1. Garez la voiture sur un sol plat et coupez le contact.
2. Attendez le temps que demande votre notice : 30 minutes moteur à l'arrêt (Peugeot 208, Citroën C3), un arrêt prolongé (Renault Clio 5, Dacia Sandero 3), ou après avoir coupé le moteur à température, environ 2 minutes (Seat Ibiza) ou 5 minutes (Toyota Yaris).
3. Sur une Peugeot 208 à jauge électrique, le niveau s'affiche au combiné à la mise du contact.
4. Sur cette Peugeot 208, un manque d'huile signalé se confirme à la jauge manuelle.
5. Sortez la jauge et essuyez-la avec un chiffon propre et non pelucheux (Renault Clio 5, Dacia Sandero 3 ; Seat Ibiza : un chiffon propre ; Toyota Yaris : un chiffon sous son extrémité en la sortant).
6. Enfoncez la jauge jusqu'en butée, puis ressortez-la.
7. Lisez le niveau : il doit se situer entre les repères mini et maxi. La notice Seat Ibiza parle de zones : A, ne pas ajouter d'huile ; B, ajout possible en restant dans la zone ; C, ajouter jusqu'à la zone B.
8. Pour un appoint, versez par l'orifice de remplissage, sous son bouchon. Son emplacement figure sur le schéma du compartiment moteur de votre notice.
9. Utilisez un entonnoir ou protégez la zone de l'orifice : de l'huile sur une pièce chaude peut prendre feu (Renault Clio 5, Dacia Sandero 3 ; Peugeot 208 : évitez les projections).
10. Versez par petites quantités : 0,5 litre au plus à la fois selon la notice Seat Ibiza ; lentement, en vérifiant la jauge, selon la notice Toyota Yaris.
11. Attendez avant de revérifier à la jauge : quelques minutes (Peugeot 208), environ 2 minutes (Seat Ibiza), environ 20 minutes (Renault Clio 5, Dacia Sandero 3).
12. Ne dépassez jamais le repère maxi : si c'est le cas, ne démarrez pas et faites appel à un professionnel, comme le demandent les notices Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3 et Seat Ibiza (Toyota Yaris : contactez un réparateur qualifié).

Les notices Renault Clio 5 et Dacia Sandero 3 demandent de faire l'appoint moteur arrêté et froid, par exemple avant le premier démarrage de la journée. Sur une Peugeot 208, l'indication du combiné n'est pas valable dans les 30 minutes qui suivent un appoint : vérifiez à la jauge manuelle.

## Vérifier le niveau d'huile moteur à chaud ou à froid ?

Cela dépend de la notice, et elles ne disent pas toutes la même chose. Les notices Peugeot 208 et Citroën C3 demandent un moteur à l'arrêt depuis 30 minutes ; les notices Renault Clio 5 et Dacia Sandero 3, un arrêt prolongé. Les notices Seat Ibiza et Toyota Yaris font au contraire mesurer moteur chaud : moteur à température puis coupé, et environ 2 minutes (Seat) ou 5 minutes (Toyota) d'attente.

Le tableau plus bas donne la consigne de chaque notice. Pour une autre voiture, sa notice fait foi.

## Quel est le bon niveau d'huile moteur ?

Entre les repères mini et maxi de la jauge, pour les six notices lues. Ni trop bas, ni trop haut : dans les deux cas, les notices Peugeot 208, Citroën C3, Renault Clio 5 et Dacia Sandero 3 demandent d'agir avant de rouler, comme le disent les deux sections suivantes.

## Niveau d'huile sous le repère mini : puis-je démarrer ?

{{repere:ligne-1}}

{{verdict:ligne-1}}, selon l'encadré. Les notices Peugeot 208 et Citroën C3 demandent de ne pas démarrer le moteur et de faire impérativement un complément d'huile. Les notices Seat Ibiza et Toyota Yaris demandent d'ajouter de l'huile, sans interdire de démarrer : l'encadré retient la consigne la plus prudente.

## Trop d'huile, au-dessus du repère maxi : que faire ?

{{repere:ligne-2}}

{{verdict:ligne-2}}, selon l'encadré : ne démarrez pas le moteur et faites appel au réseau de la marque ou à un atelier qualifié. Cinq notices le demandent ; la notice Seat Ibiza dit d'informer votre service technique. La notice Toyota Yaris demande de contacter un réparateur qualifié, sans interdire de démarrer : l'encadré retient la consigne la plus prudente.

Ces notices disent ce que l'on risque : le moteur et le système de dépollution (Renault Clio 5, Dacia Sandero 3), le moteur et le catalyseur (Seat Ibiza), le moteur (Toyota Yaris, en cas de dépassement lors d'un remplacement d'huile).

Selon la notice Toyota Yaris, le niveau peut monter quand la voiture roule souvent sans que le moteur ne monte assez en température : trajets courts, basse vitesse ou temps froid. De l'humidité ou du carburant non brûlé se mêle alors à l'huile ; la notice Toyota Yaris demande de mesurer moteur chaud.

## Faire le niveau d'huile : quelle huile, à quelle fréquence ?

L'huile doit correspondre à la motorisation et être conforme au plan d'entretien de votre voiture, selon les notices Peugeot 208 et Citroën C3 : c'est ce plan qui donne la norme et la viscosité. Pour un appoint, la notice Toyota Yaris demande une huile du même type que celle déjà dans le moteur. Versez peu à la fois et revérifiez.

Les notices Peugeot 208 et Citroën C3 préconisent un contrôle, avec appoint si nécessaire, tous les 5 000 km. La notice Seat Ibiza demande de vérifier le niveau de préférence après chaque plein et avant les longs trajets ; la notice Toyota Yaris, régulièrement, pour éviter d'endommager gravement le moteur.

## Ce que dit chaque notice sur le niveau d'huile

{{tableau}}

| Notice | Quand mesurer | Comment un niveau bas est signalé | Ce que demande la notice |
|---|---|---|---|
| Peugeot 208 | Sol plat, moteur à l'arrêt depuis 30 minutes | Affichage « OIL » ou message « Niveau d'huile incorrect », avec le témoin de service et un signal sonore ; indicateur de niveau au combiné à la mise du contact, avec une jauge électrique | Confirmer à la jauge manuelle ; manque confirmé : compléter impérativement ; sous le mini ou au-dessus du maxi : ne pas démarrer |
| Citroën C3 | Sol plat, moteur à l'arrêt depuis 30 minutes | Indicateur de niveau au combiné à la mise du contact, avec une jauge électrique ; alerte de niveau bas non relevée | Sous le mini ou au-dessus du maxi : ne pas démarrer |
| Seat Ibiza | À plat, moteur à température, contact coupé, environ 2 minutes d'attente | Témoin jaune ; s'il clignote, le capteur de niveau est défaillant | Contrôler immédiatement le niveau et faire l'appoint dès que possible ; zone C : ajouter jusqu'à la zone B ; au-dessus de la zone A : ne pas démarrer ; capteur défaillant : atelier spécialisé |
| Renault Clio 5 phase 2 | Sol horizontal, après un arrêt prolongé ; appoint moteur froid | Alerte de l'afficheur au démarrage, au niveau minimum ; témoin de pression d'huile allumé en virage ou au freinage : niveau trop bas | Ajouter de l'huile moteur ; maxi dépassé : ne pas démarrer ; témoin de pression qui tarde à s'éteindre ou reste allumé à l'accélération : s'arrêter et faire appel à un représentant de la marque ; témoin de pression allumé sur route avec le témoin STOP et un signal sonore : s'arrêter impérativement et couper le contact ; après le rodage, plus de 0,5 litre ajouté aux 1 000 km, ou baisse anormale ou répétée du niveau : consulter un représentant de la marque |
| Dacia Sandero 3 | Sol horizontal, après un arrêt prolongé ; appoint moteur froid | Alerte de l'afficheur au démarrage, au niveau minimum ; témoin de pression d'huile allumé en virage ou au freinage : niveau trop bas | Ajouter de l'huile moteur ; maxi dépassé : ne pas démarrer ; témoin de pression qui tarde à s'éteindre ou reste allumé à l'accélération : s'arrêter et faire appel à un représentant de la marque ; témoin de pression allumé sur route avec le témoin STOP et un signal sonore : s'arrêter impérativement et couper le contact ; après le rodage, plus de 0,5 litre ajouté aux 1 000 km : consulter un représentant de la marque |
| Toyota Yaris | Sol plat, moteur à température puis arrêté, environ 5 minutes d'attente | Message « Niveau d'huile moteur faible. Ajoutez ou remplacez. » | Message : vérifier le niveau et faire l'appoint si nécessaire ; sous le repère de bas niveau ou très près : ajouter une huile du même type ; au-dessus du repère maxi : contacter un concessionnaire ou un réparateur qualifié |

Le tableau résume les notices lues ({{cite:notice-peugeot-208|p. 20 et 166}} ; {{cite:notice-citroen-c3|p. 112-113}} ; {{cite:notice-seat-ibiza|p. 294-295}} ; {{cite:notice-renault-clio-5|p. 131, 137-138, 330-333 et 386}} ; {{cite:notice-dacia-sandero-3|p. 105, 111, 294-295 et 348-349}} ; {{cite:notice-toyota-yaris|p. 247-248 et 299}}).

## Voyant de niveau d'huile orange : puis-je rouler ?

{{repere:huile-niveau}}

{{verdict:huile-niveau}}, selon l'encadré : vérifiez sans attendre le niveau à la jauge, voiture à plat et moteur arrêté, puis faites l'appoint. Seat Ibiza et Peugeot 208 demandent de le faire immédiatement ou impérativement ; la notice Toyota Yaris ne donne pas de délai. La page [voyant huile](/voyants/huile/) compare les notices une à une.

Si le témoin Seat Ibiza clignote en jaune, c'est le capteur de niveau qui est défaillant : la notice demande de le faire réviser par un atelier spécialisé et, par sécurité, de contrôler le niveau à chaque passage à la pompe.

## Voyant d'huile rouge : puis-je rouler ?

{{repere:huile-pression-rouge}}

{{verdict:huile-pression-rouge}}, selon l'encadré. Ce voyant signale une pression d'huile trop faible : arrêtez-vous dès que vous pouvez le faire sans danger, coupez le moteur et vérifiez le niveau. Même si le niveau est correct, ne repartez pas : faites appel à un garage ou à l'assistance.

## Pourquoi ma voiture consomme de l'huile ?

Un peu d'huile est consommée normalement : faire des appoints entre deux vidanges est normal, selon les notices Peugeot 208, Citroën C3, Renault Clio 5 et Dacia Sandero 3. Selon la notice Seat Ibiza, la consommation peut atteindre 0,5 litre aux 1 000 km selon la conduite, et davantage durant les 5 000 premiers kilomètres.

La notice Toyota Yaris cite les situations où la consommation peut augmenter, sans la dire anormale : moteur neuf, huile de faible qualité ou de viscosité inadéquate, régimes élevés, charge lourde ou remorque, conduite en accélérant et ralentissant fréquemment, ralenti prolongé ou circulation dense ({{cite:notice-toyota-yaris|p. 247}}).

## Le niveau d'huile baisse anormalement : que faire ?

{{repere:ligne-3}}

{{verdict:ligne-3}}, selon l'encadré. Les notices Renault Clio 5 et Dacia Sandero 3 demandent de consulter un représentant de la marque si, après le rodage, il faut ajouter plus de 0,5 litre aux 1 000 km, et la notice Renault Clio 5 en cas de baisse anormale ou répétée ; en cas de baisse importante, la notice Peugeot 208 demande de faire vérifier le circuit par le réseau ou par un atelier qualifié. Parmi les notices lues, aucune ne donne les causes d'une consommation anormale : demandez l'avis d'un professionnel.
