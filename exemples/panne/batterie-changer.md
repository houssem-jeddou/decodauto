---
# BROUILLON, jamais validé. Étape 10, lot B2 (rédaction ouverte par la validation de la porte 10 le 16/11/2026,
# 19 h 26). Page de la vague B au format tutoriel, sans empreinte tant que Houssem n'a pas validé son encadré.
# - Extraits et pages citées relus mot pour mot le 16/11/2026 (pdf.js dans Chrome) :
#   travaux/etape-10/textes/batterie-b2-verification.md et autres-pannes-verification.md (Dacia p. 302, Peugeot
#   p. 168, Citroën p. 114, Toyota p. 321 : résumé relu à l'écran, cité par renvoi de page seulement).
# - Consigne du brief : les étapes ne décrivent que ce que décrivent les notices ; la décision en tête renvoie au
#   professionnel quand la notice le demande (proposition du 16/11, à valider avec le lot).
# - Illustration dessinée pour le site : batterie-ordre-bornes (travaux/etape-10/generer-illustrations.py).
id: batterie-changer
title: "Comment changer une batterie de voiture : ce que disent les notices"
h1: "Changer la batterie de sa voiture : soi-même ou au garage ?"
description: "Changer une batterie de voiture soi-même ? Plusieurs notices le réservent à un professionnel. Batterie équivalente, ordre des bornes, réglages à refaire : ce que dit la notice de chaque marque."
libelle_court: Changer la batterie
question_decision: "Puis-je changer moi-même la batterie de ma voiture ?"
situations:
  - situation: "La batterie est hors d'usage et doit être remplacée"
    verdict: oui avec précautions
    urgence: sous quelques jours
    action: "Faites-la remplacer par un garage, par une batterie équivalente à celle d'origine. Ne la changez vous-même que si la notice de votre voiture décrit l'opération."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 341, « Batterie »"
        extrait: "toutes interventions sur la batterie (démontage, débranchement...) doivent impérativement être effectuées par un professionnel spécialisé. Risque de brûlures par chocs électriques. Respectez impérativement les périodicités de remplacement mentionnées dans le document d'entretien sans les dépasser. La batterie étant spécifique, veillez à la faire remplacer par une batterie équivalente. Faites appel à un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-dacia-sandero-3
        emplacement: "p. 302, « Batterie »"
        extrait: "toutes interventions sur la batterie (démontage, débranchement...) doivent impérativement être effectuées par un professionnel spécialisé. Risque de brûlures par chocs électriques. Respectez impérativement les périodicités de remplacement mentionnées dans le document d'entretien sans les dépasser. La batterie étant spécifique, veillez à la faire remplacer par une batterie équivalente. Faites appel à un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-peugeot-208
        emplacement: "p. 168, « Batterie 12 V »"
        extrait: "Les versions équipées du Stop & Start comportent une batterie au plomb 12 V de technologie et de caractéristiques spécifiques. Son remplacement doit être effectué exclusivement dans le réseau PEUGEOT ou dans un atelier qualifié."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-seat-ibiza
        emplacement: "p. 303, « Remplacement de la batterie »"
        extrait: "S'il est nécessaire de remplacer la batterie du véhicule, adressez-vous à un Service Technique avant de l'acheter afin de vous informer sur la compatibilité électromagnétique, les dimensions et les exigences en matière d'entretien, de rendement et de sécurité de la nouvelle batterie."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - situation: "La batterie est endommagée"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Ne l'utilisez plus : risque d'explosion. Faites-la remplacer sans attendre par un garage, ou faites appel à l'assistance."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 302, « Batterie de 12 volts », avertissement"
        extrait: "N'utilisez pas de batteries endommagées. Risque d'explosion ! Remplacez immédiatement les batteries endommagées."
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Vous venez de rebrancher la batterie, ou d'en poser une neuve"
    verdict: oui
    urgence: aucune
    action: "Mettez le contact et attendez 1 minute avant de démarrer. Réinitialisez ensuite ce que demande votre notice : clé, lève-vitres, date et heure, stations de radio."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 190, « Après rebranchement »"
        extrait: "Après rebranchement de la batterie, mettre le contact et attendre 1 minute avant de démarrer, afin de permettre l'initialisation des systèmes électroniques."
        verdict: oui
        urgence: aucune
      - source: notice-citroen-c3
        emplacement: "p. 139, « Après rebranchement »"
        extrait: "Après rebranchement de la batterie, mettre le contact et attendre 1 minute avant de démarrer, afin de permettre l'initialisation des systèmes électroniques."
        verdict: oui
        urgence: aucune
  - situation: "Après le rebranchement, le Stop & Start ne fonctionne pas au trajet suivant"
    verdict: oui
    urgence: aucune
    action: "C'est normal : il redevient disponible après une immobilisation de la voiture, jusqu'à environ 8 heures selon la température et la charge de la batterie."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 190, « Après rebranchement »"
        extrait: "Lors du trajet suivant le premier démarrage du moteur, le Stop & Start pourrait ne pas être opérationnel. Dans ce cas, la fonction ne sera de nouveau disponible qu'après une immobilisation continue du véhicule, dont la durée dépendra de la température ambiante et de l'état de charge de la batterie (jusqu'à environ 8 heures)."
        verdict: oui
        urgence: aucune
      - source: notice-citroen-c3
        emplacement: "p. 139, « Après rebranchement »"
        extrait: "Lors du trajet suivant le premier démarrage du moteur, le Stop & Start pourrait ne pas être opérationnel. Dans ce cas, la fonction ne sera de nouveau disponible qu'après une immobilisation continue du véhicule, dont la durée dépendra de la température ambiante et de l'état de charge de la batterie (jusqu'à environ 8 heures)."
        verdict: oui
        urgence: aucune
element_unique: tableau
format: 2
illustration:
  fichier: batterie-ordre-bornes
  alt: "Une batterie et ses deux câbles : on débranche d'abord le câble négatif, puis le positif ; on rebranche d'abord le positif, puis le négatif"
  legende: "L'ordre des notices Seat Ibiza et Toyota Yaris : débrancher d'abord le câble négatif (-), rebrancher d'abord le positif (+). Sur la Peugeot 208 et la Citroën C3, seule la borne (+) se débranche."
symptome: "La batterie est en fin de vie, endommagée, ou ne tient plus la charge malgré les recharges."
tutoriel:
  outils:
    - outillage pour les bornes et la fixation de la batterie, selon la voiture
    - lunettes et gants de protection
  duree: "Selon la voiture et l'accès à la batterie"
  difficulte: difficile
  quand_ne_pas_le_faire_soi_meme: "Si la notice réserve l'intervention à un professionnel (Renault Clio 5, Dacia Sandero 3), si la voiture a le Stop & Start (Peugeot 208, Citroën C3 : réseau ou atelier qualifié), ou si la notice demande de consulter un réparateur avant de débrancher la batterie (Toyota Yaris)."
carburant: essence et diesel
contexte:
  - après plusieurs démarrages difficiles
  - par grand froid
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leurs rubriques sur la batterie et son remplacement."
  sources:
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - notice-seat-ibiza
sources:
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-seat-ibiza
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
causes:
  - cause: Batterie déchargée, mais encore bonne
    explication: "Avant de la changer, une recharge peut suffire : les notices Peugeot 208 et Citroën C3 la conseillent quand la voiture sert surtout pour des trajets courts, ou avant une immobilisation de plusieurs semaines."
    pieces:
      - recharge-batterie
  - cause: Batterie en fin de vie
    explication: "Les notices Renault Clio 5 et Dacia Sandero 3 demandent de respecter les périodicités de remplacement du document d'entretien. Selon la notice Seat Ibiza, des problèmes de démarrage qui subsistent malgré la recharge peuvent indiquer une batterie défectueuse."
    pieces:
      - batterie
  - cause: Batterie endommagée ou gelée
    explication: "La notice Seat Ibiza demande de remplacer immédiatement une batterie endommagée, et toute batterie qui a gelé."
    pieces:
      - batterie
---

## Changer la batterie soi-même : ce que disent les notices

Plusieurs notices réservent le remplacement de la batterie à un professionnel. Les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} demandent que toute intervention sur la batterie, démontage ou débranchement, soit faite par un professionnel spécialisé ({{cite:notice-renault-clio-5|p. 341}} ; {{cite:notice-dacia-sandero-3|p. 302}}). Sur une voiture équipée du Stop & Start, les notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}} réservent le remplacement au réseau ou à un atelier qualifié ({{cite:notice-peugeot-208|p. 168}} ; {{cite:notice-citroen-c3|p. 114}}).

## Si votre notice décrit l'opération : les étapes

{{repere:ligne-1}}

Ces étapes suivent les notices {{notice:notice-seat-ibiza}} et {{notice:notice-toyota-yaris}}, les seules lues qui donnent l'ordre des deux câbles ({{cite:notice-seat-ibiza|p. 301-302}} ; {{cite:notice-toyota-yaris|p. 321}}). Sur la Peugeot 208 et la Citroën C3, seule la borne (+) se débranche, contact coupé depuis 4 minutes ({{cite:notice-peugeot-208|p. 189}} ; {{cite:notice-citroen-c3|p. 138}}).

{{etapes}}

1. Choisissez une batterie aux mêmes spécifications que celle d'origine : la notice Seat Ibiza précise qu'elles sont écrites sur son boîtier.
2. Coupez le moteur, le contact et tous les équipements électriques, et désactivez l'alarme antivol en déverrouillant la voiture.
3. Protégez-vous les yeux et les mains : l'électrolyte de la batterie est très corrosif.
4. Débranchez d'abord le câble négatif (-), puis le câble positif (+).
5. Remplacez la batterie, sans l'incliner.
6. Rebranchez d'abord le câble positif (+), puis le câble négatif (-), sans jamais les intervertir : risque d'incendie des câbles.
7. Mettez le contact et attendez 1 minute avant de démarrer, puis réinitialisez ce que demande votre notice.

## Ce que dit chaque notice

{{tableau}}

| Notice | Qui change la batterie | Batterie de rechange | Avant de débrancher | Ordre des bornes |
|---|---|---|---|---|
| Renault Clio 5, Dacia Sandero 3 | Un professionnel spécialisé, pour toute intervention | Une batterie équivalente | Attendre après la coupure du moteur | Non décrit |
| Peugeot 208, Citroën C3 | Avec Stop & Start : le réseau ou un atelier qualifié | Batterie spécifique avec Stop & Start | Tout fermer, tout éteindre, couper le contact et attendre 4 minutes | Seule la borne (+) se débranche |
| Seat Ibiza | Un atelier spécialisé pour les problèmes de batterie ; se renseigner avant l'achat | Mêmes spécifications, écrites sur son boîtier | Désactiver l'alarme antivol | D'abord le négatif ; au rebranchement, d'abord le positif |
| Toyota Yaris | Contacter un réparateur avant de débrancher les bornes | Capacité et courant de démarrage à froid équivalents ou supérieurs | Contacter un réparateur | Toujours commencer par la borne négative |

Le tableau résume les notices lues ({{cite:notice-renault-clio-5|p. 341 et 363}} ; {{cite:notice-dacia-sandero-3|p. 302 et 326}} ; {{cite:notice-peugeot-208|p. 168 et 189}} ; {{cite:notice-citroen-c3|p. 114 et 138}} ; {{cite:notice-seat-ibiza|p. 301-303}} ; {{cite:notice-toyota-yaris|p. 321}}). Avant de débrancher la batterie, la notice Renault Clio 5 demande d'attendre au moins cinq minutes après la coupure du moteur, et la notice Dacia Sandero 3 au moins une minute.

## Changer la batterie sans perdre les réglages

{{repere:ligne-3}}

En débranchant la batterie, certaines fonctions de la voiture sont perdues et doivent être réinitialisées, selon la notice Seat Ibiza ({{cite:notice-seat-ibiza|p. 301}}). Les notices Peugeot 208 et Citroën C3 demandent d'attendre 1 minute contact mis avant de démarrer, puis de réinitialiser la clé, les lève-vitres électriques, la date et l'heure et les stations de radio ({{cite:notice-peugeot-208|p. 190}} ; {{cite:notice-citroen-c3|p. 139}}). Si de légères perturbations subsistent, elles demandent de consulter le réseau ou un atelier qualifié.

Avant de débrancher les bornes, la notice Toyota Yaris demande de contacter un réparateur, car des données des calculateurs peuvent être effacées ({{cite:notice-toyota-yaris|p. 321}}).

## Stop & Start indisponible après le changement

{{repere:ligne-4}}

Selon les notices Peugeot 208 et Citroën C3, le Stop & Start peut ne pas fonctionner au trajet qui suit le premier démarrage. Il redevient disponible après une immobilisation continue de la voiture, jusqu'à environ 8 heures selon la température et la charge de la batterie ({{cite:notice-peugeot-208|p. 190}} ; {{cite:notice-citroen-c3|p. 139}}).

## Batterie endommagée

{{repere:ligne-2}}

La notice Seat Ibiza interdit d'utiliser une batterie endommagée, à cause du risque d'explosion, et demande de la remplacer immédiatement ({{cite:notice-seat-ibiza|p. 302}}). Elle demande aussi de remplacer toute batterie qui a gelé ; voyez [batterie de voiture faible](/batterie-voiture/).

## Que faire de l'ancienne batterie ?

Une batterie contient de l'acide sulfurique et du plomb : elle ne se jette jamais avec les ordures ménagères. La notice Peugeot 208 demande de la déposer dans un point de collecte spécial, et la notice Seat Ibiza de l'éliminer selon la législation en vigueur ({{cite:notice-peugeot-208|p. 187}} ; {{cite:notice-seat-ibiza|p. 303}}).
