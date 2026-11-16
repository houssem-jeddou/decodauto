---
# BROUILLON, jamais validé. Étape 10, lot B2 (rédaction ouverte par la validation de la porte 10 le 16/11/2026,
# 19 h 26). Page de la vague B, sans empreinte tant que Houssem n'a pas validé son encadré (paquet du lot B2).
# - Extraits et pages citées relus mot pour mot le 16/11/2026 (pdf.js dans Chrome) :
#   travaux/etape-10/textes/batterie-b2-verification.md, demarrage-batterie-verification.md et
#   autres-pannes-verification.md. Ligne 1 reprise mot pour mot de l'exemple validé « voiture ne démarre pas ».
# - Source nouvelle au registre avec le lot : varta-interpretation-tests (document technique, demande n° 31).
# - Illustration dessinée pour le site : batterie-etiquette (générée par travaux/etape-10/generer-illustrations-b2.py).
# - Corrigé après la revue indépendante du 16/11/2026 (rapport « à corriger ») : question du gel en tête de l'arbre,
#   faits absents des relevés retirés, tension en tête de page ; corrections non relues par la revue.
id: batterie-voiture
title: "Voltage batterie voiture : batterie faible, que faire ?"
h1: "Batterie de voiture faible : comment le savoir, et que faire ?"
description: "Batterie de voiture faible ? Tension de 12 volts, message « Batterie faible », indicateur coloré, batterie gelée, voyant rouge : ce que disent les notices, et quand la faire contrôler."
libelle_court: Batterie de voiture
question_decision: "Ma batterie de voiture est-elle faible, et faut-il la changer ?"
situations:
  - situation: "Les voyants du tableau de bord faiblissent ou ne s'allument pas, et le démarreur ne tourne pas"
    verdict: oui avec précautions
    urgence: sous quelques jours
    action: "Resserrez ou nettoyez les cosses de la batterie, puis démarrez avec une autre batterie (câbles ou booster) en suivant la notice de votre voiture. Sinon, faites contrôler la batterie et le circuit électrique par un garage, qui remplacera la batterie si nécessaire."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 384, « Anomalies de fonctionnement », « Vous actionnez le démarreur » : témoins qui faiblissent ou ne s'allument pas, démarreur qui ne tourne pas"
        extrait: "Cosses de batterie mal serrées, débranchées ou oxydées. Resserrez-les, rebranchez-les ou nettoyez-les si elles sont oxydées. Batterie déchargée ou hors d'usage. Branchez une autre batterie sur la batterie défaillante. […] ou remplacez la batterie si nécessaire. […] Circuit défectueux. Consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-dacia-sandero-3
        emplacement: "p. 347, « Anomalies de fonctionnement », « Vous actionnez le démarreur » : témoins qui faiblissent ou ne s'allument pas, démarreur qui ne tourne pas"
        extrait: "Cosses de batterie mal serrées, débranchées ou oxydées. Resserrez-les, rebranchez-les ou nettoyez-les si elles sont oxydées. Batterie déchargée ou hors d'usage. Branchez une autre batterie sur la batterie défaillante […] ou remplacez la batterie si nécessaire. […] Circuit défectueux. Consultez un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-seat-ibiza
        emplacement: "p. 303, « Charger ou changer la batterie »"
        extrait: "Si des problèmes de démarrage subsistent en raison de la charge insuffisante de la batterie, ils peuvent indiquer que la batterie du véhicule est défectueuse. Dans ce cas, nous vous conseillons de faire contrôler, recharger ou remplacer la batterie du véhicule par un Service Technique."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-toyota-yaris
        emplacement: "p. 319, 7.2.8 « Si le moteur ne démarre pas »"
        extrait: "Le moteur du système de démarrage ne tourne pas, les éclairages intérieurs et les phares ne s'allument pas, ou l'avertisseur sonore ne retentit pas. […] Contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié si vous ne pouvez pas résoudre le problème ou si vous ne connaissez pas les procédures de réparation."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - situation: "Le message « Mode sauvegarde batterie », puis « Batterie faible Démarrer moteur », s'affiche au tableau de bord"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Démarrez le moteur, hors d'un endroit fermé, et laissez-le tourner, ou roulez, jusqu'à ce que le message disparaisse."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 339, « Batterie »"
        extrait: "Suivant véhicule, un système vérifie en continu l'état de charge de la batterie. Si celle-ci diminue, le message « Mode sauvegarde batterie » puis « Batterie faible Démarrer moteur » s'affiche au tableau de bord. Dans ce cas, démarrez le moteur et le message au tableau de bord disparaît."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 301, « Batterie »"
        extrait: "Suivant véhicule, un système vérifie en continu l'état de charge de la batterie. Si celle-ci diminue, le message « Mode sauvegarde batterie 12V » puis « Batterie faible Démarrer moteur » s'affiche au tableau de bord. Dans ce cas, démarrez le moteur, roulez ou attendez jusqu'au le message au tableau de bord disparaît."
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "L'indicateur coloré de la batterie (« œil magique ») signale un niveau d'électrolyte trop bas"
    verdict: oui avec précautions
    urgence: sous quelques jours
    action: "Faites réviser la batterie par un garage, qui la remplacera si nécessaire. N'ouvrez pas la batterie et n'ajoutez pas de liquide."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 302-303, « Vérification du niveau d'électrolyte de la batterie »"
        extrait: "L'indicateur du regard circulaire (« œil magique ») change de couleur en fonction de l'état de charge et du niveau d'électrolyte de la batterie. On distingue deux couleurs : Jaune clair ou incolore : Le niveau d'électrolyte de la batterie est trop bas. Adressez-vous à un atelier spécialisé, faites réviser la batterie et si nécessaire, faites-la remplacer."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - situation: "La batterie a gelé (une batterie déchargée peut geler vers 0 °C)"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Ne la rechargez pas et ne démarrez pas avec des câbles : risque d'explosion. Faites appel à un garage ou à l'assistance, qui la contrôlera ou la remplacera."
    ecart_marques: "La notice Seat Ibiza interdit de démarrer avec des câbles et demande de remplacer toute batterie qui a gelé ; les notices Peugeot 208 et Citroën C3 interdisent la recharge et demandent de la faire contrôler."
    ecart_court: "Plus strict : Seat (remplacer la batterie, jamais de câbles). Moins stricts : Peugeot et Citroën (la faire contrôler)."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 57, « Aide au démarrage »"
        extrait: "N'effectuez jamais un démarrage avec des câbles si l'une des batteries est gelée – risque d'explosion !"
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 302, « Batterie de 12 volts », avertissement"
        extrait: "Ne rechargez jamais une batterie gelée ou récemment dégelée – risque d'explosion et de blessures ! Toute batterie qui a gelé doit être remplacée. Une batterie déchargée peut geler à des températures proches de 0°C (+32°F)."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-peugeot-208
        emplacement: "p. 189, « Recharger la batterie avec un chargeur de batterie »"
        extrait: "Ne jamais essayer de recharger une batterie gelée - Risque d'explosion ! Si la batterie a gelé, la faire contrôler par le réseau PEUGEOT ou par un atelier qualifié qui vérifiera que les composants internes n'ont pas été endommagés et que le conteneur ne s'est pas fissuré, ce qui impliquerait un risque de fuite d'acide toxique et corrosif."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-citroen-c3
        emplacement: "p. 138, « Recharger la batterie avec un chargeur de batterie »"
        extrait: "N'essayez jamais de recharger une batterie gelée - Risque d'explosion ! Si la batterie a gelé, faites-la contrôler par le réseau CITROËN ou par un atelier qualifié qui vérifiera que les composants internes n'ont pas été endommagés et que le conteneur ne s'est pas fissuré, ce qui impliquerait un risque de fuite d'acide toxique et corrosif."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - voyant: batterie-rouge
voyants:
  - batterie-rouge
element_unique: arbre-de-decision
format: 2
illustration:
  fichier: batterie-etiquette
  alt: "Le dessus d'une batterie de 12 volts : son étiquette indique la tension et la capacité, et un regard rond, l'indicateur coloré, montre le niveau d'électrolyte"
  legende: "La tension (12 V) et la capacité (Ah) sont écrites sur la batterie. Certaines batteries ont un indicateur coloré : sur la Seat Ibiza, jaune clair ou incolore signale un niveau trop bas, noir un niveau correct."
symptome: "Démarrages difficiles, voyants faibles quand vous mettez le contact, message « Batterie faible » ou voyant batterie allumé."
carburant: essence et diesel
contexte:
  - au démarrage
  - par grand froid
  - après de petits parcours
  - après une longue immobilisation
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leurs rubriques sur la batterie, sa recharge et son remplacement."
  sources:
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - notice-seat-ibiza
    - notice-peugeot-208
    - notice-citroen-c3
sources:
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-seat-ibiza
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-toyota-yaris
  - varta-interpretation-tests
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
causes:
  - cause: Batterie déchargée
    explication: "Selon les notices Renault Clio 5 et Dacia Sandero 3, l'état de charge baisse surtout sur de petits parcours, en ville, quand la température baisse, et après une longue utilisation de la radio ou d'autres équipements moteur arrêté. Les notices Peugeot 208 et Citroën C3 conseillent de la recharger quand la voiture sert surtout pour des trajets courts, ou avant une immobilisation prolongée."
    pieces:
      - recharge-batterie
  - cause: Batterie en fin de vie
    explication: "Les notices Renault Clio 5 et Dacia Sandero 3 demandent de respecter les périodicités de remplacement du document d'entretien. Selon la notice Seat Ibiza, des problèmes de démarrage qui subsistent malgré la recharge peuvent indiquer une batterie défectueuse."
    pieces:
      - batterie
  - cause: Cosses mal serrées, sales ou oxydées
    explication: "Les notices Renault Clio 5 et Dacia Sandero 3 citent des cosses mal serrées, débranchées ou oxydées parmi les causes d'un démarreur qui ne tourne pas. Les notices Seat Ibiza et Citroën C3 demandent d'en vérifier la propreté et le serrage."
    pieces:
      - cosses-de-batterie
  - cause: Niveau d'électrolyte trop bas
    explication: "Sur une batterie munie d'un indicateur coloré, la notice Seat Ibiza demande de faire réviser la batterie quand il signale un niveau trop bas, et de la remplacer si nécessaire."
    pieces:
      - batterie
  - cause: Batterie qui a gelé
    explication: "Une batterie déchargée peut geler à des températures proches de 0 °C, selon la notice Seat Ibiza, qui demande alors de la remplacer ; les notices Peugeot 208 et Citroën C3 demandent de la faire contrôler."
    pieces:
      - batterie
  - cause: Batterie qui n'est plus rechargée
    explication: "Si le circuit de charge est défaillant (exemples de la notice Peugeot 208 : cosses sales, courroie d'alternateur détendue ou sectionnée), la batterie se vide en roulant, et le voyant batterie s'allume moteur tournant."
    pieces:
      - courroie-d-alternateur
      - alternateur
---

## Batterie faible : par où commencer ?

Une batterie de voiture a une tension nominale de 12 volts, et le fabricant de batteries VARTA indique qu'une batterie de démarrage entièrement chargée a une tension de 12,8 volts ({{cite:notice-dacia-sandero-3|p. 326-327}} ; {{cite:varta-interpretation-tests|« Interprétation des tests de batteries »}}). Une batterie faible se voit surtout au démarrage : voyants qui faiblissent, démarreur qui ne tourne pas. Suivez les questions ci-dessous, dans l'ordre.

## Le bon geste selon ce que vous voyez

{{arbre}}

1. Fait-il un temps proche de 0 °C ou en dessous, et la batterie a-t-elle pu geler ?
   - Oui, ou vous n'en êtes pas sûr : ne la rechargez pas et ne démarrez pas avec des câbles. {{verdict:ligne-4}}
   - Non : passez à la question 2.
2. Quand vous mettez le contact, les voyants faiblissent-ils ou restent-ils éteints, avec un démarreur qui ne tourne pas ?
   - Oui : resserrez ou nettoyez les cosses, puis démarrez avec une autre batterie en suivant votre notice ; sinon, faites contrôler la batterie. {{verdict:ligne-1}}
   - Non : passez à la question 3.
3. Un message « Mode sauvegarde batterie » ou « Batterie faible Démarrer moteur » s'affiche-t-il ?
   - Oui : démarrez le moteur, hors d'un endroit fermé, et laissez-le tourner, ou roulez, jusqu'à ce qu'il disparaisse. {{verdict:ligne-2}}
   - Non : passez à la question 4.
4. Moteur tournant, le voyant batterie rouge reste-t-il allumé, ou s'allume-t-il en roulant ?
   - Oui : la batterie n'est plus rechargée. {{verdict:batterie-rouge}}
   - Non : passez à la question 5.
5. Votre batterie a-t-elle un indicateur coloré qui signale un niveau trop bas ?
   - Oui : faites réviser la batterie. {{verdict:ligne-3}}
   - Non, ou pas d'indicateur : si les démarrages difficiles reviennent, faites contrôler, recharger ou remplacer la batterie, comme le conseille la notice Seat Ibiza. {{verdict:ligne-1}}

## Voltage d'une batterie de voiture : 12 volts

La batterie de démarrage d'une voiture à essence ou diesel a une tension nominale de 12 volts. Les notices le rappellent pour la recharge, qui se fait avec un chargeur prévu pour une batterie de 12 volts ({{cite:notice-renault-clio-5|p. 363}} ; {{cite:notice-peugeot-208|p. 188}}). Pour démarrer avec une autre batterie, celle de secours doit aussi avoir une tension de 12 volts ({{cite:notice-peugeot-208|p. 187}} ; {{cite:notice-dacia-sandero-3|p. 326-327}}).

Les notices lues ne parlent que de batteries de 12 volts. Les notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}} interdisent même d'utiliser un booster de batterie de 24 volts ou plus ({{cite:notice-peugeot-208|p. 187}} ; {{cite:notice-citroen-c3|p. 137}}).

## Quelle tension mesurer ?

Les notices lues ne donnent aucune valeur de tension mesurée. Le fabricant de batteries VARTA donne deux valeurs de référence : 12,8 volts pour une batterie de démarrage entièrement chargée et, en circuit ouvert, 12,4 volts comme seuil de recharge ({{cite:varta-interpretation-tests|« Interprétation des tests de batteries »}}). Pour une batterie AGM ou EFB, deux technologies de batterie, il prévoit un test plus approfondi.

## Capacité en Ah : celle de la batterie d'origine

La capacité d'une batterie, en ampères-heures (Ah), dépend de la version de la voiture : la notice {{notice:notice-toyota-yaris}} la donne version par version, et demande une batterie de capacité et de courant de démarrage à froid équivalents ou supérieurs ({{cite:notice-toyota-yaris|p. 321}}). Les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} demandent une batterie équivalente, et la notice {{notice:notice-seat-ibiza}} de se renseigner auprès d'un service technique avant d'acheter la batterie de rechange ({{cite:notice-renault-clio-5|p. 341}} ; {{cite:notice-dacia-sandero-3|p. 302}} ; {{cite:notice-seat-ibiza|p. 303}}). Pour la choisir, fiez-vous à la notice de votre voiture ou à l'étiquette de la batterie d'origine.

Sur une voiture équipée du Stop & Start, la batterie est spécifique : la notice Seat Ibiza demande une batterie aux mêmes spécifications, écrites sur le boîtier de la batterie, et les notices Peugeot 208 et Citroën C3 un remplacement dans le réseau ou dans un atelier qualifié ({{cite:notice-seat-ibiza|p. 303}} ; {{cite:notice-peugeot-208|p. 168}} ; {{cite:notice-citroen-c3|p. 114}}). Pour le remplacement, voyez [changer la batterie de sa voiture](/batterie-voiture/changer/).

## Message « Batterie faible Démarrer moteur »

{{repere:ligne-2}}

Sur les voitures qui en sont équipées, un système surveille l'état de charge de la batterie. Quand il baisse, les notices Renault Clio 5 et Dacia Sandero 3 décrivent le message « Mode sauvegarde batterie », puis « Batterie faible Démarrer moteur » : démarrez le moteur, et le message disparaît ({{cite:notice-renault-clio-5|p. 339}} ; {{cite:notice-dacia-sandero-3|p. 301}}). La notice Dacia ajoute que vous pouvez aussi rouler, ou attendre qu'il disparaisse.

Selon la notice Renault Clio 5, ce message peut apparaître après 5 à 30 minutes d'utilisation de la voiture moteur arrêté ({{cite:notice-renault-clio-5|p. 339}}). Ne laissez pas tourner le moteur dans un endroit fermé : la notice Seat Ibiza l'interdit, à cause du risque d'intoxication ({{cite:notice-seat-ibiza|p. 213}}).

## L'indicateur coloré de la batterie (« œil magique »)

{{repere:ligne-3}}

Certaines batteries ont un regard rond, l'« œil magique », dont la couleur change selon l'état de charge et le niveau d'électrolyte. Sur la Seat Ibiza, jaune clair ou incolore signale un niveau trop bas : la notice demande de faire réviser la batterie par un atelier spécialisé, et de la remplacer si nécessaire ; noir signale un niveau correct ({{cite:notice-seat-ibiza|p. 302-303}}). Elle ne décrit que ces deux couleurs : pour un indicateur vert, ou une autre batterie, fiez-vous à la notice de votre voiture ou à l'étiquette de la batterie.

La notice Seat Ibiza interdit d'ouvrir la batterie, et prévient qu'un mélange de gaz détonant très explosif se forme pendant sa recharge ({{cite:notice-seat-ibiza|p. 301}}). La notice Dacia Sandero 3 interdit aussi de l'ouvrir ou d'y ajouter du liquide ({{cite:notice-dacia-sandero-3|p. 301}}).

## Batterie gelée : ne pas la recharger

{{repere:ligne-4}}

Une batterie déchargée peut geler à des températures proches de 0 °C. La notice Seat Ibiza demande de remplacer toute batterie qui a gelé, et interdit de la recharger ou de démarrer avec des câbles, à cause du risque d'explosion ({{cite:notice-seat-ibiza|p. 302}} ; {{cite:notice-seat-ibiza|p. 57}}).

Les notices Peugeot 208 et Citroën C3 interdisent aussi la recharge d'une batterie gelée, et demandent de la faire contrôler. Le contrôle vérifie que ses composants internes ne sont pas endommagés et que son bac n'est pas fissuré, sinon un acide toxique et corrosif pourrait fuir ({{cite:notice-peugeot-208|p. 189}} ; {{cite:notice-citroen-c3|p. 138}}). Pour une longue immobilisation en hiver, la notice Seat Ibiza demande de protéger la batterie du froid ({{cite:notice-seat-ibiza|p. 302}}).

## Voyant batterie rouge : la batterie n'est plus rechargée

{{repere:batterie-rouge}}

Moteur tournant, le [voyant batterie](/voyants/batterie/) rouge signale que la batterie n'est plus rechargée : elle se vide en roulant. La notice Peugeot 208 cite des cosses sales et une courroie d'alternateur détendue ou sectionnée ({{cite:notice-peugeot-208|p. 13}}). La notice Seat Ibiza, qui demande de se rendre immédiatement à l'atelier spécialisé le plus proche, conseille alors d'éteindre les équipements électriques qui ne sont pas indispensables ({{cite:notice-seat-ibiza|p. 302}}).

## Batterie qui se décharge vite

Selon les notices Renault Clio 5 et Dacia Sandero 3, l'état de charge baisse surtout sur de petits parcours, en ville, quand la température baisse, et après une longue utilisation de la radio ou d'autres équipements moteur arrêté ({{cite:notice-renault-clio-5|p. 339}} ; {{cite:notice-dacia-sandero-3|p. 301}}). Une voiture longtemps immobilisée se décharge aussi d'elle-même, selon la notice Toyota Yaris ({{cite:notice-toyota-yaris|p. 321}}).

Les notices Peugeot 208 et Citroën C3 conseillent de recharger la batterie quand la voiture sert surtout pour des trajets courts, ou avant une immobilisation prolongée ({{cite:notice-peugeot-208|p. 188}} ; {{cite:notice-citroen-c3|p. 137}}). Pour le faire vous-même, voyez [recharger la batterie de sa voiture](/batterie-voiture/recharger/). Vérifiez aussi les cosses : les notices Seat Ibiza et Citroën C3 demandent d'en contrôler la propreté et le serrage ({{cite:notice-seat-ibiza|p. 301}} ; {{cite:notice-citroen-c3|p. 114}}).
