---
# Validé par Houssem le 17/11/2026 à 15 h 05 (heure de Tunis). Étape 11 (vague C), lot C2 : page mère « huile moteur » (modèle fluide, format 2). Empreinte posée après la validation.
# - Sources : relevé à l'écran du 17/11/2026 vers 11 h 50 (pdf.js dans Chrome ; travaux/etape-11/textes/releve-sources.md,
#   §7) : Seat Ibiza p. 90, 293, 294, 296, 316 ; Peugeot 208 p. 165, 166, 168 ; Citroën C3 p. 112, 113, 114 ; Renault
#   Clio 5 phase 2 p. 122, 330, 333 ; Dacia Sandero 3 p. 99, 294, 296, 297. Recherche de « SAE », « viscosit »,
#   « ACEA », « vidange » dans chaque PDF entier : aucun grade ni viscosité chez Peugeot, Citroën, Renault, Dacia ;
#   « ACEA C3 » chez Seat seulement. Toyota Yaris : seulement le message de vidange de la base (p. 300) ; le reste non lu.
# - Décisions du pilotage (règle 6, 17/11) : rien sur la signification d'un grade ni sur la 85W140 ; « j'ai mis une
#   autre huile » sur la seule notice Seat p. 294, niveaux par la grille.
# - Illustration : `huile-moteur-choisir`, dessinée pour cette page (travaux/etape-11/generer-illustrations.py).
# - Revue indépendante du 17/11 (« à corriger ») : décisions du pilotage B1, I1 à I4, M1 à M6 (paquet du lot C2, §0) ;
#   ligne « baisse anormale » retirée (elle ira sur la page « niveau d'huile », une intention, une page) ; ligne « doute
#   sur l'huile versée » ajoutée ; tableau des viscosités et 85W140 reportés (demande de changement n° 35).
id: huile-moteur
title: "Huile moteur, vidange : quelle huile mettre et quand vidanger ?"
h1: "Huile moteur : quelle huile mettre dans ma voiture, et quand faire la vidange ?"
description: "L'huile à mettre est celle du plan d'entretien de votre voiture, pas un grade choisi seul ; la vidange, à son échéance. Erreur d'huile : ce que dit Seat."
libelle_court: Huile moteur
question_decision: "Quelle huile mettre dans mon moteur, et à quel moment faire la vidange ?"
reponse_directe: "Celle que demande le plan ou le document d'entretien de votre voiture pour son moteur : les notices lues ne recommandent aucun grade. La vidange se fait à l'échéance de ce plan, que rappelle le combiné."
situations:
  - voyant: entretien-vidange
  - situation: "Vous avez versé une huile moteur différente de celle que demande la notice ou le plan d'entretien"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Selon la notice Seat Ibiza, avec 0,5 litre au plus, vous pouvez rouler ; au-delà, moteur à faible charge, à 80 km/h au plus et sur 300 km environ : ce sont ses limites. Faites changer l'huile dès que possible par un atelier spécialisé. Pour une autre voiture, demandez l'avis du réseau de la marque."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 294, « Huile moteur », ATTENTION"
        extrait: "Vous pouvez continuer à circuler avec le véhicule si vous avez versé maximum 0,5 l d'huile moteur. Faites changer l'huile dès que possible par un atelier spécialisé. Dans le cas contraire, il existe un danger de dégâts sur le moteur."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 294, « Huile moteur », ATTENTION"
        extrait: "Si vous avez versé plus de 0,5 l d'huile moteur, circulez avec le moteur à faible charge et au maximum dans la fourchette de régime moyen. Ne circulez pas à plus de 80 km/h et ne parcourez pas plus de 300 km (environ). Faites changer l'huile dès que possible par un atelier spécialisé."
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "Vous ne savez pas si l'huile versée convient à votre moteur"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Évitez de démarrer le moteur : faites appel à l'assistance ou au réseau de la marque pour savoir si l'huile convient."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 294, « Huile moteur », ATTENTION"
        extrait: "Le risque d'éventuels dégâts sur le véhicule (moteur, système d'échappement) vous incombe. En cas de doute, évitez de démarrer le moteur et faites appel à l'assistance du service technique."
        verdict: non, arrêt immédiat
        urgence: immédiate
  - situation: "Vous avez versé dans le moteur un autre liquide que de l'huile moteur"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Ne démarrez pas le moteur : faites appel à l'assistance ou au réseau de la marque."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 294, « Huile moteur », ATTENTION"
        extrait: "Si vous n'avez pas versé de l'huile moteur mais un autre liquide, ne démarrez pas le moteur. Demandez l'assistance du service technique. Risque d'endommagement du moteur !"
        verdict: non, arrêt immédiat
        urgence: immédiate
voyants:
  - entretien-vidange
element_unique: tableau
format: 2
illustration:
  fichier: huile-moteur-choisir
  alt: "À gauche, le plan d'entretien de la voiture ; à droite, l'étiquette d'un bidon sans marque, avec la norme mise en avant, puis la classe ACEA et le grade"
  legende: "L'huile à mettre est celle que demande le plan ou le document d'entretien de votre voiture : sur le bidon, cherchez la norme qu'il indique."
normes:
  - "Celles du plan ou du document d'entretien de votre voiture (Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3)"
  - "chez Seat Ibiza, une huile conforme aux normes VW"
  - "jamais d'additif dans l'huile moteur (Peugeot 208, Citroën C3, Seat Ibiza)."
comment_verifier: "À la jauge, voiture à plat, après le délai que donne votre notice : le niveau se situe entre les repères mini et maxi. La notice Renault Clio 5 demande de le vérifier périodiquement et avant chaque grand voyage."
quand_changer:
  texte: "À l'échéance du plan ou du document d'entretien, que rappellent l'indicateur d'entretien et le message de vidange. Chez Renault et Dacia, suivant le véhicule, elle s'adapte au style de conduite ; chez Seat, elle tient compte des conditions d'utilisation et du style de conduite, au plus 2 ans. Le filtre à huile se change à chaque vidange, selon les notices Peugeot 208 et Citroën C3."
  sources:
    - notice-peugeot-208
    - notice-citroen-c3
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - notice-seat-ibiza
cout_probable:
  pieces:
    - appoint-huile
    - vidange
    - filtre-a-huile
    - moteur
  base_de_calcul: "La dépense va de l'appoint d'huile, que vous faites vous-même, à la vidange avec son filtre à huile (entretien). Elle peut aller jusqu'au moteur, la tranche la plus lourde, si une huile non conforme y reste : la notice Seat Ibiza parle alors d'un danger de dégâts sur le moteur."
  sources:
    - notice-seat-ibiza
    - notice-peugeot-208
  si_vous_continuez:
    tranche: organe
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 294, « Huile moteur », ATTENTION"
        extrait: "Faites changer l'huile dès que possible par un atelier spécialisé. Dans le cas contraire, il existe un danger de dégâts sur le moteur."
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
# Encadré de décision (question, réponse directe, lignes, coût probable) validé par Houssem le 17/11/2026 à 15 h 05
# (heure de Tunis), avec les faits du texte (lot C2, travaux/etape-11/lot-c2/paquet-lot-c2.md).
validation: 6e7c085162972fded1bbb9ca2fc2de821ad9b42b12de28c665b77e8ddda2acb4
---

## Quelle huile moteur mettre dans ma voiture ?

Celle que demande le plan ou le document d'entretien de votre voiture pour son moteur. La notice Peugeot 208 demande une huile qui corresponde à la motorisation et soit conforme au plan d'entretien ; la notice Citroën C3, conforme aux recommandations du constructeur. Les notices Renault Clio 5 et Dacia Sandero 3 renvoient la qualité d'huile au document d'entretien du véhicule ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-citroen-c3|p. 113}} ; {{cite:notice-renault-clio-5|p. 333}} ; {{cite:notice-dacia-sandero-3|p. 296}}).

La notice Seat Ibiza demande une huile conforme aux normes VW, à la vidange comme pour un appoint, et recommande de confier le changement d'huile à un professionnel. Chez Peugeot, une huile non recommandée peut faire perdre la garantie contractuelle en cas de défaillance du moteur ({{cite:notice-seat-ibiza|p. 293}} ; {{cite:notice-peugeot-208|p. 166}}).

Le plan d'entretien Peugeot est fourni avec le véhicule ou disponible auprès du réseau ou d'un atelier qualifié. Pour la capacité de vidange d'une Renault ou d'une Dacia, la notice renvoie au document d'entretien ou à un représentant de la marque.

## Huile moteur pour diesel ou pour essence : laquelle choisir ?

Celle que le plan d'entretien donne pour votre moteur : parmi les notices lues, aucune ne donne une huile valable pour tous les diesels ou pour tous les moteurs essence. Seule la notice Seat Ibiza distingue les deux, pour un appoint d'urgence fait une fois, de 0,5 litre au plus, quand l'huile recommandée manque ({{cite:notice-seat-ibiza|p. 293}}).

| Moteur | Huiles admises pour un appoint d'urgence sur une Seat Ibiza, selon sa notice |
|---|---|
| Essence | VW 504 00, VW 502 00, VW 508 00, ACEA C3 ou API SN |
| Diesel | VW 507 00, VW 505 01, ACEA C3 ou API CK-4 |

C'est une solution d'urgence, jusqu'à la prochaine vidange : la notice demande de faire remplacer l'huile par un atelier spécialisé.

## 5W30, 15W40, SAE 30 : que disent les notices des grades ?

Parmi les notices lues, aucune n'explique ces codes de viscosité, et elles ne recommandent aucun grade : les notices Peugeot 208, Citroën C3, Renault Clio 5 et Dacia Sandero 3 n'en citent aucun. La notice Seat Ibiza cite seulement la classe ACEA C3 et des normes VW et API. Sur le bidon, cherchez la norme que demande votre plan d'entretien.

## Quand faire la vidange ?

{{repere:entretien-vidange}}

À l'échéance du plan ou du document d'entretien, que rappellent l'indicateur d'entretien et le message de vidange : {{verdict:entretien-vidange}}, selon l'encadré. Chez Renault et Dacia, suivant le véhicule, l'autonomie de vidange s'adapte au style de conduite (roulage fréquent à faible vitesse, porte-à-porte, ralenti prolongé, remorque) et peut diminuer plus vite que les kilomètres parcourus ({{cite:notice-renault-clio-5|p. 122}} ; {{cite:notice-dacia-sandero-3|p. 99}}). Chez Seat, le calcul de la vidange, au plus 2 ans, tient compte des conditions d'utilisation et du style de conduite ({{cite:notice-seat-ibiza|p. 90}}).

La notice Seat Ibiza ajoute qu'en conditions difficiles, certains travaux d'entretien se font avant la prochaine date de révision prévue : carburant à forte teneur en soufre, trajets courts fréquents, ralenti prolongé, zones poussiéreuses, remorque, circulation dense en ville, usage surtout en hiver. Elle ne dit pas que la vidange en fait partie. Son entretien flexible utilise une huile longue durée (LongLife) ({{cite:notice-seat-ibiza|p. 316}}).

Le filtre à huile se change à chaque vidange, selon les notices Peugeot 208 et Citroën C3 ({{cite:notice-peugeot-208|p. 168}} ; {{cite:notice-citroen-c3|p. 114}}).

## Vidange : les mises en garde des notices

La notice Seat Ibiza recommande de faire faire la vidange par un service technique, et de ne la faire soi-même qu'avec les connaissances requises. Elle demande de laisser refroidir le moteur, l'huile chaude pouvant brûler, et de porter des lunettes de protection. Les notices Renault Clio 5 et Dacia Sandero 3 mettent aussi en garde contre les brûlures d'une vidange moteur chaud ({{cite:notice-seat-ibiza|p. 296}} ; {{cite:notice-renault-clio-5|p. 333}} ; {{cite:notice-dacia-sandero-3|p. 297}}).

La notice Peugeot 208 demande d'éviter tout contact prolongé de l'huile usagée avec la peau ({{cite:notice-peugeot-208|p. 165}}).

## Que faire de l'huile usagée ?

La notice Peugeot 208 demande de la vider dans les containers réservés à cet usage dans le réseau ou chez un atelier qualifié. Selon la notice Seat Ibiza, elle ne doit jamais aller dans les égouts ni dans le sol, et se garde hors de portée des enfants : elle est toxique ({{cite:notice-peugeot-208|p. 166}} ; {{cite:notice-seat-ibiza|p. 296}}).

## Ma voiture consomme de l'huile : est-ce normal ?

Faire des appoints entre deux vidanges est normal, selon les notices Peugeot 208, Citroën C3, Renault Clio 5 et Dacia Sandero 3 ; la page [niveau d'huile](/huile-moteur/verifier-niveau/) dit comment vérifier le niveau, faire l'appoint et quand une consommation doit vous alerter.

## J'ai mis une autre huile que celle préconisée : que faire ?

{{repere:ligne-2}}

{{verdict:ligne-2}}, selon l'encadré. Parmi les notices lues, seule la notice Seat Ibiza le prévoit : avec 0,5 litre au plus d'une autre huile, vous pouvez continuer à rouler ; au-delà, roulez moteur à faible charge, à 80 km/h au plus et sur 300 km environ au plus. Dans les deux cas, faites changer l'huile dès que possible par un atelier spécialisé.

Ces limites sont celles de la notice Seat Ibiza : pour une autre voiture, demandez l'avis du réseau de la marque. La même notice ne peut pas exclure tout à fait des dégâts sur le moteur ou sur le filtre à particules, et ces dégâts sont à la charge du conducteur.

## Je ne sais pas si l'huile versée convient

{{repere:ligne-3}}

{{verdict:ligne-3}}, selon l'encadré : en cas de doute, la notice Seat Ibiza demande d'éviter de démarrer le moteur et de faire appel à l'assistance du service technique.

## J'ai versé autre chose que de l'huile moteur

{{repere:ligne-4}}

{{verdict:ligne-4}}, selon l'encadré : ne démarrez pas le moteur et faites appel à l'assistance, comme le demande la notice Seat Ibiza, la seule notice lue qui le prévoit.

## Faut-il ajouter un additif à l'huile moteur ?

Non : les notices Peugeot 208 et Citroën C3 demandent de ne jamais utiliser d'additif dans l'huile moteur, pour préserver la fiabilité des moteurs et les dispositifs d'antipollution. La notice Seat Ibiza l'interdit aussi, et précise que les dommages causés par ces additifs ne sont pas couverts par la garantie ({{cite:notice-seat-ibiza|p. 294}}).

## Ce que dit chaque notice sur l'huile moteur

{{tableau}}

| Notice | Huile à mettre | Vidange |
|---|---|---|
| Peugeot 208 | Conforme à la motorisation et au plan d'entretien fourni avec le véhicule ; jamais d'additif | À l'échéance du plan d'entretien, rappelée par l'indicateur d'entretien ; filtre à huile changé à chaque vidange |
| Citroën C3 | Conforme à la motorisation et aux recommandations du constructeur ; jamais d'additif | Filtre à huile changé à chaque vidange |
| Renault Clio 5 phase 2 | Qualité d'huile : document d'entretien du véhicule | Périodicité : document d'entretien ; suivant le véhicule, l'autonomie de vidange s'adapte au style de conduite |
| Dacia Sandero 3 | Qualité d'huile : document d'entretien du véhicule | Comme Renault Clio 5 |
| Seat Ibiza | Conforme aux normes VW ; jamais d'additif ; appoint d'urgence de 0,5 litre au plus, une fois, avec les normes listées plus haut | Au plus 2 ans, selon les conditions d'utilisation et le style de conduite ; vidange par un service technique recommandée |
| Toyota Yaris | Non lu | Message « Entretien d'huile requis » : faire vidanger l'huile moteur et changer le filtre |

Le tableau résume les notices lues ({{cite:notice-peugeot-208|p. 19-20, 166 et 168}} ; {{cite:notice-citroen-c3|p. 112-114}} ; {{cite:notice-renault-clio-5|p. 122 et 333}} ; {{cite:notice-dacia-sandero-3|p. 99 et 296}} ; {{cite:notice-seat-ibiza|p. 90, 293-294 et 296}} ; {{cite:notice-toyota-yaris|p. 300}}). Pour une autre voiture, sa notice et son plan d'entretien font foi.

La page [voyant huile](/voyants/huile/) explique les voyants d'huile, et le dossier [moteur PureTech](/moteur-puretech/) traite de l'huile de ces moteurs.
