---
# Page de la vague B, étape 10, lot B2 (rédaction ouverte par la validation de la porte 10 le 16/11/2026, 19 h 26).
# Validée par Houssem le 17/11/2026 à 7 h 39 (« Je valide tout ! Fais le necessaire », sur la ligne de validation de
# travaux/etape-10/paquet-lot-b2-fin.md) ; empreinte posée et passage de exemples/ à src/content par la pull request
# du lot B2 (règle de passage).
# - Extraits et pages citées relus mot pour mot le 16/11/2026 (pdf.js dans Chrome) :
#   travaux/etape-10/textes/batterie-b2-verification.md et autres-pannes-verification.md (Dacia p. 302, Peugeot
#   p. 168, Citroën p. 114, Toyota p. 321 : résumé relu à l'écran, cité par renvoi de page seulement).
# - Consigne du brief : les étapes ne décrivent que ce que décrivent les notices ; la décision en tête renvoie au
#   professionnel quand la notice le demande (proposition du 16/11, à valider avec le lot).
# - Illustration dessinée pour le site : batterie-ordre-bornes (travaux/etape-10/generer-illustrations-b2.py).
# - Corrigé après la revue indépendante du 16/11/2026 (rapport « à corriger ») : extrait Seat de la ligne 2 ramené à ce
#   texte relu mot pour mot à l'écran le 16/11/2026 vers 23 h 15 (PDF 304 → p. 302), niveau tiré de la grille ; Seat p. 301 citée à la ligne 1 ; étapes rattachées aux notices Seat Ibiza et Toyota Yaris ; borne (+) seule
#   ramenée à la longue immobilisation ; faits absents des relevés retirés ; corrections non relues par la revue.
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
    action: "Faites-la remplacer par un garage, par une batterie équivalente à celle d'origine. Ne la changez vous-même que si la notice de votre voiture le permet."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 341, « Batterie »"
        extrait: "toutes interventions sur la batterie (démontage, débranchement...) doivent impérativement être effectuées par un professionnel spécialisé. […] La batterie étant spécifique, veillez à la faire remplacer par une batterie équivalente. Faites appel à un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-dacia-sandero-3
        emplacement: "p. 302, « Batterie »"
        extrait: "toutes interventions sur la batterie (démontage, débranchement...) doivent impérativement être effectuées par un professionnel spécialisé. […] La batterie étant spécifique, veillez à la faire remplacer par une batterie équivalente. Faites appel à un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-peugeot-208
        emplacement: "p. 168, « Batterie 12 V »"
        extrait: "Les versions équipées du Stop & Start comportent une batterie au plomb 12 V de technologie et de caractéristiques spécifiques. Son remplacement doit être effectué exclusivement dans le réseau PEUGEOT ou dans un atelier qualifié."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-seat-ibiza
        emplacement: "p. 301, « Batterie de 12 volts »"
        extrait: "Tous travaux sur la batterie requièrent des connaissances spécialisées. Nous vous prions de vous rendre chez un partenaire SEAT ou un atelier spécialisé pour les problèmes liés à la batterie : risque de brûlures et d'explosion de la batterie !"
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
    action: "Ne l'utilisez pas, ni pour démarrer ni pour rouler : faites appel à un garage ou à l'assistance pour la remplacer."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 302, « Batterie de 12 volts »"
        extrait: "N'utilisez pas de batteries endommagées. Risque d'explosion ! Remplacez immédiatement les batteries endommagées."
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Vous venez de rebrancher la batterie, ou d'en poser une neuve"
    verdict: oui
    urgence: aucune
    action: "Mettez le contact et attendez 1 minute avant de démarrer, le temps que les systèmes électroniques s'initialisent."
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
  legende: "L'ordre de la notice Seat Ibiza : débrancher d'abord le câble négatif (-), rebrancher d'abord le positif (+). La notice Toyota Yaris fait aussi commencer le débranchement par la borne négative."
symptome: "La batterie est en fin de vie, endommagée, ou ne tient plus la charge malgré les recharges."
tutoriel:
  outils:
    - outillage pour les bornes et la fixation de la batterie, selon la voiture
    - lunettes et gants de protection
  duree: "Selon la voiture et l'accès à la batterie"
  difficulte: difficile
  quand_ne_pas_le_faire_soi_meme: "Si la notice réserve l'intervention à un professionnel (Renault Clio 5, Dacia Sandero 3), si la voiture a le Stop & Start (Peugeot 208, Citroën C3 : réseau ou atelier qualifié), si la notice demande d'aller chez un atelier spécialisé pour les problèmes de batterie (Seat Ibiza) ou de contacter un réparateur avant de débrancher les bornes (Toyota Yaris)."
carburant: essence et diesel
contexte:
  - après plusieurs démarrages difficiles
  - par grand froid
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leurs rubriques sur la batterie et son remplacement."
  sources:
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-citroen-c3
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
validation: 28814eb8aea24870ff104a5d7001407d5b835b252c32f35e9a6463a877cfdaac
causes:
  - cause: Batterie déchargée, mais encore bonne
    explication: "Avant de la changer, une recharge peut suffire : les notices Peugeot 208 et Citroën C3 la conseillent quand la voiture sert surtout pour des trajets courts, ou avant une immobilisation prolongée."
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

{{repere:ligne-1}}

Plusieurs notices réservent le remplacement de la batterie à un professionnel, ou demandent de le consulter d'abord. Les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} demandent que toute intervention sur la batterie, démontage ou débranchement, soit faite par un professionnel spécialisé, et les notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}} réservent au réseau ou à un atelier qualifié le remplacement de la batterie d'une voiture équipée du Stop & Start ({{cite:notice-renault-clio-5|p. 341}} ; {{cite:notice-dacia-sandero-3|p. 302}} ; {{cite:notice-peugeot-208|p. 168}} ; {{cite:notice-citroen-c3|p. 114}}). La notice {{notice:notice-seat-ibiza}} demande d'aller chez un partenaire SEAT ou un atelier spécialisé pour les problèmes liés à la batterie, à cause du risque de brûlures et d'explosion, et la notice {{notice:notice-toyota-yaris}} de contacter un réparateur avant de débrancher ses bornes ({{cite:notice-seat-ibiza|p. 301}} ; {{cite:notice-toyota-yaris|p. 321}}).

## Ce que décrivent les notices Seat Ibiza et Toyota Yaris

Les étapes ci-dessous sont ce que décrivent les notices Seat Ibiza et Toyota Yaris, qui demandent d'abord, l'une de s'adresser à un atelier spécialisé pour les problèmes de batterie, l'autre de contacter un réparateur avant de débrancher les bornes ({{cite:notice-seat-ibiza|p. 301-303}} ; {{cite:notice-toyota-yaris|p. 321}}). La notice Seat Ibiza ne fait débrancher la batterie que dans des cas exceptionnels ({{cite:notice-seat-ibiza|p. 301}}). Sur une autre voiture, suivez sa notice.

{{etapes}}

1. Avant d'acheter la batterie de rechange, renseignez-vous auprès d'un service technique (Seat Ibiza) ; la notice Toyota Yaris demande une batterie de même boîtier, de capacité et de courant de démarrage à froid équivalents ou supérieurs.
2. Coupez le moteur et le contact, et désactivez l'alarme antivol avant de débrancher la batterie (Seat Ibiza).
3. Portez des gants et des lunettes de protection : l'électrolyte de la batterie est très corrosif (Seat Ibiza).
4. Débranchez d'abord le câble négatif (-), puis le câble positif (+) : les deux notices font commencer par le négatif.
5. Remplacez la batterie.
6. Rebranchez d'abord le câble positif (+), puis le câble négatif (-), sans les intervertir (Seat Ibiza).

Pour une longue immobilisation, les notices Peugeot 208 et Citroën C3 font débrancher seulement la borne (+), contact coupé depuis 4 minutes ({{cite:notice-peugeot-208|p. 189}} ; {{cite:notice-citroen-c3|p. 138}}).

## Ce que dit chaque notice

{{tableau}}

| Notice | Qui change la batterie | Batterie de rechange | Ordre des bornes | Après le rebranchement |
|---|---|---|---|---|
| Renault Clio 5, Dacia Sandero 3 | Un professionnel spécialisé, pour toute intervention | Une batterie équivalente | Non décrit | Non décrit |
| Peugeot 208, Citroën C3 | Avec Stop & Start : le réseau ou un atelier qualifié | Avec Stop & Start : une batterie spécifique | Pour une longue immobilisation, seulement la borne (+), contact coupé depuis 4 minutes | Contact mis, attendre 1 minute avant de démarrer ; réinitialiser clé, lève-vitres, date et heure, radio |
| Seat Ibiza | Un atelier spécialisé pour les problèmes de batterie ; se renseigner avant l'achat | Avec Start-Stop : mêmes spécifications, écrites sur le boîtier | D'abord le négatif ; au rebranchement, d'abord le positif | Témoin jaune de la direction : bref parcours à 15-20 km/h |
| Toyota Yaris | Contacter un réparateur avant de débrancher les bornes | Même boîtier, capacité et courant de démarrage à froid équivalents ou supérieurs | Toujours commencer le débranchement par la borne négative | Non décrit |

Le tableau résume les notices lues ({{cite:notice-renault-clio-5|p. 341}} ; {{cite:notice-dacia-sandero-3|p. 302}} ; {{cite:notice-peugeot-208|p. 168, 189 et 190}} ; {{cite:notice-citroen-c3|p. 114, 138 et 139}} ; {{cite:notice-seat-ibiza|p. 227 et 301-303}} ; {{cite:notice-toyota-yaris|p. 321}}).

## Changer la batterie sans perdre les réglages

{{repere:ligne-3}}

Après le rebranchement, les notices Peugeot 208 et Citroën C3 demandent de mettre le contact et d'attendre 1 minute avant de démarrer, puis de réinitialiser la clé, les lève-vitres électriques, la date et l'heure et les stations de radio ({{cite:notice-peugeot-208|p. 190}} ; {{cite:notice-citroen-c3|p. 139}}). Si de légères perturbations subsistent, elles demandent de consulter le réseau ou un atelier qualifié.

Sur la Seat Ibiza, le témoin jaune de la direction signale un fonctionnement limité de la direction, ou une batterie de 12 volts débranchée puis rebranchée : dans ce second cas, la notice demande un bref parcours à 15-20 km/h ({{cite:notice-seat-ibiza|p. 227}}). Avant de débrancher les bornes, la notice Toyota Yaris demande de contacter un réparateur, car des données des calculateurs peuvent être effacées ({{cite:notice-toyota-yaris|p. 321}}).

## Stop & Start indisponible après le changement

{{repere:ligne-4}}

Selon les notices Peugeot 208 et Citroën C3, le Stop & Start peut ne pas fonctionner au trajet qui suit le premier démarrage. Il redevient disponible après une immobilisation continue de la voiture, jusqu'à environ 8 heures selon la température et la charge de la batterie ({{cite:notice-peugeot-208|p. 190}} ; {{cite:notice-citroen-c3|p. 139}}).

## Batterie endommagée

{{repere:ligne-2}}

La notice Seat Ibiza interdit d'utiliser une batterie endommagée, à cause du risque d'explosion, et demande de la remplacer immédiatement ({{cite:notice-seat-ibiza|p. 302}}). Pour les problèmes liés à la batterie, elle demande de se rendre chez un partenaire SEAT ou un atelier spécialisé, à cause du risque de brûlures et d'explosion ({{cite:notice-seat-ibiza|p. 301}}).
