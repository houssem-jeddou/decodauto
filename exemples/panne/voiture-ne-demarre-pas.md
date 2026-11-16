---
# BROUILLON de préparation anticipée de l'étape 10 (docs/03, règle 12, quatrième exception, demande de changement n° 21) :
# exemple du modèle panne, page « voiture ne démarre pas » de la vague B. Rien n'en est présenté à la validation,
# fusionné ni publié avant la fermeture de la porte de l'étape 8. Pas d'empreinte : jamais validé.
# - Extraits et pages citées relus mot pour mot le 16/11/2026 : texte des PDF officiels lu par pdf.js dans Chrome
#   (méthode de travaux/etape-5/REPRISE.md), page imprimée retrouvée sur chaque page (relevés :
#   travaux/etape-10/textes/demarrage-batterie-verification.md et porte10-verification.md). Les niveaux des
#   citations sont tirés de la grille (src/schemas/grille.ts), à confirmer au paquet.
# - Version 2 du 16/11/2026 (après la revue indépendante du paquet de la porte 10) : ligne 2 nouvelle (après un
#   démarrage avec une autre batterie), ligne 4 appuyée sur trois notices de deux groupes, ligne 5 avec Renault,
#   arbre repris (cas sans source, panne sèche essence), titre et repère du préchauffage corrigés, marque et modèle
#   nommés partout.
# - Pièces à créer dans data/couts.json avec le lot : `pile-de-cle` (geste) et `carburant-et-reamorcage` (geste).
# - Format 2 (demande n° 30) : repères sous les titres d'une seule ligne, illustration dessinée pour le site
#   (`batterie-cosses`), références de pages passées dans « Sources » (règle 2d). Se construit quand la base porte la
#   ligne d'écart courte de `batterie-rouge` (lot F2).
id: voiture-ne-demarre-pas
title: "Voiture ne démarre pas : que faire, cas par cas"
h1: "Ma voiture ne démarre pas : que vérifier, et quand faire appel à un garage ?"
description: "Votre voiture ne démarre pas ? Regardez d'abord les voyants et le démarreur : batterie à plat, carburant, clé non reconnue. Ce que disent les notices, et quand appeler un garage."
libelle_court: Voiture qui ne démarre pas
question_decision: "Ma voiture ne démarre pas : que faire, et puis-je repartir ensuite ?"
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
  - situation: "Le moteur a démarré grâce à une autre batterie (câbles ou booster)"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Avant de rouler, laissez tourner le moteur, voiture à l'arrêt, au moins 30 minutes pour recharger la batterie. Faites ensuite vérifier la voiture et la batterie dès que possible par un garage, qui remplacera la batterie si nécessaire."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 188, démarrage à partir d'une autre batterie"
        extrait: "Laisser tourner le moteur, à l'arrêt, au minimum 30 minutes afin de permettre à la batterie d'atteindre un niveau de charge suffisant. Rouler immédiatement sans avoir atteint un niveau de charge suffisant peut altérer certaines fonctionnalités du véhicule."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 137, démarrage à partir d'une autre batterie"
        extrait: "Laisser tourner le moteur, à l'arrêt, au minimum 30 minutes afin de permettre à la batterie d'atteindre un niveau de charge suffisant. Rouler immédiatement sans avoir atteint un niveau de charge suffisant peut altérer certaines fonctionnalités du véhicule."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-toyota-yaris
        emplacement: "p. 320, 7.2.10 « Si la batterie du véhicule est déchargée »"
        extrait: "Une fois que le moteur démarre, faites vérifier le véhicule dès que possible par un concessionnaire ou réparateur Toyota agréé, ou par tout autre réparateur qualifié."
        verdict: oui avec précautions
        urgence: immédiate
  - voyant: prechauffage
  - situation: "Le démarreur tourne, mais le moteur ne démarre pas après quelques essais"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "N'insistez pas : coupez le contact entre deux essais et attendez quelques instants. Après quelques essais, faites appel à un garage ou à l'assistance."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 93, « Démarrage / Arrêt du moteur avec la clé »"
        extrait: "Si après quelques tentatives le moteur ne démarre pas, ne pas insister - Risque d'endommagement du démarreur et du moteur ! Faire appel au réseau PEUGEOT ou à un atelier qualifié."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 188, « Particularités des versions essence », « Problème de démarrage »"
        extrait: "Pour éviter d'endommager le pot catalytique, le démarreur ou bien, de provoquer une usure prématurée de la batterie, n'insistez pas dans la tentative de démarrage […] sans avoir identifié et traité la cause de la défaillance. Dans le cas contraire, ne tentez plus de démarrer le moteur et faites appel à un Représentant de la marque."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 162, « Particularités des versions essence », « Problème de démarrage »"
        extrait: "Pour éviter d'endommager le pot catalytique, le démarreur ou bien, de provoquer une usure prématurée de la batterie, n'insistez pas dans la tentative de démarrage […] sans avoir identifié et traité la cause de la défaillance. Dans le cas contraire, ne tentez plus de démarrer le moteur et faites appel à un Représentant de la marque."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 161, « Réservoir carburant », « Panne de carburant version Diesel »"
        extrait: "si le moteur ne démarre toujours pas après plusieurs tentatives, faites appel à un Représentant de la marque."
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Diesel tombé en panne sèche"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Mettez au moins 5 litres de gazole, puis suivez la procédure de votre notice avant de démarrer : réamorçage du circuit, attente de quelques minutes contact mis, ou lancement plus long selon la voiture. Si le moteur ne démarre toujours pas après plusieurs essais, voyez la ligne précédente."
    citations:
      - source: notice-peugeot-208
        emplacement: "p. 175, « Panne de carburant (Diesel) »"
        extrait: "Avant de commencer le réamorçage, il est impératif de mettre au moins 5 litres de gazole dans le réservoir de carburant."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 120, « Panne de carburant (Diesel) »"
        extrait: "Avant de commencer le réamorçage, il est impératif de mettre au moins 5 litres de gazole dans le réservoir de carburant."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-dacia-sandero-3
        emplacement: "p. 160, « Particularités des versions Diesel », « Panne de carburant »"
        extrait: "Après remplissage effectué à la suite de l'épuisement complet du carburant, il est nécessaire de réamorcer le circuit à carburant […] avant de redémarrer le moteur."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 161, « Réservoir carburant », « Panne de carburant version Diesel »"
        extrait: "Mettez la clé de contact en position « Marche » M […] et attendez quelques minutes avant de démarrer pour permettre le réamorçage du circuit de carburant ; – tournez la clé en position D. Si le moteur ne démarre pas, répétez la procédure […]"
        verdict: oui avec précautions
        urgence: immédiate
  - voyant: batterie-rouge
voyants:
  - prechauffage
  - batterie-rouge
element_unique: arbre-de-decision
format: 2
illustration:
  fichier: batterie-cosses
  alt: "Une batterie de 12 volts et ses deux cosses, négative et positive, entourées : c'est là qu'il faut regarder"
  legende: "Cosses mal serrées, débranchées ou oxydées : les notices Renault Clio 5 et Dacia Sandero 3 demandent de les resserrer, de les rebrancher ou de les nettoyer. Sur certaines voitures, la batterie n'est pas directement accessible : suivez votre notice."
symptome: "Le moteur ne démarre pas quand vous tournez la clé ou appuyez sur le bouton de démarrage."
carburant: essence et diesel
contexte:
  - au démarrage
  - par grand froid
  - après une longue immobilisation
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leur tableau des anomalies, leurs rubriques sur la batterie, le démarrage et le carburant."
  sources:
    - notice-renault-clio-5
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-seat-ibiza
    - notice-toyota-yaris
sources:
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-dacia-sandero-3
  - notice-toyota-yaris
auteur: houssem-jeddou
date_publication: 2026-11-15
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
causes:
  - cause: Batterie déchargée ou hors d'usage
    explication: "C'est une des causes du tableau des anomalies des notices Renault Clio 5 et Dacia Sandero 3 quand les voyants faiblissent et que le démarreur ne tourne pas ; la notice Toyota Yaris y ajoute un démarreur qui tourne lentement, avec des éclairages et des phares atténués. La notice Seat Ibiza rappelle qu'en hiver, la puissance de démarrage peut être réduite, et que de courts trajets fréquents ou de longues immobilisations demandent de recharger la batterie."
    pieces:
      - recharge-batterie
      - batterie
  - cause: Cosses de batterie mal serrées, débranchées ou oxydées
    explication: "Autre cause du même tableau des notices Renault Clio 5 et Dacia Sandero 3 : elles demandent de les resserrer, de les rebrancher, ou de les nettoyer si elles sont oxydées. La notice Toyota Yaris cite aussi des bornes desserrées, corrodées ou débranchées."
    pieces:
      - cosses-de-batterie
  - cause: Batterie qui n'est plus rechargée
    explication: "Si le circuit de charge est défaillant (exemples de la notice Peugeot 208 : cosses sales, courroie d'alternateur détendue ou sectionnée), la batterie n'est plus rechargée normalement, et le voyant batterie s'allume moteur tournant."
    pieces:
      - courroie-d-alternateur
      - alternateur
  - cause: Panne de carburant (diesel à réamorcer)
    explication: "Sur un diesel tombé en panne sèche, les notices Peugeot 208 et Citroën C3 demandent de remettre au moins 5 litres de gazole et de réamorcer le circuit avant de démarrer ; la notice Dacia Sandero 3 demande aussi de réamorcer, et la notice Renault Clio 5 d'attendre quelques minutes, contact mis. La notice Seat Ibiza ne parle pas de réamorçage : le lancement peut durer jusqu'à une minute environ. La notice Toyota Yaris cite aussi un manque de carburant parmi les causes d'un moteur qui ne démarre pas."
    pieces:
      - carburant-et-reamorcage
  - cause: Clé ou carte non détectée
    explication: "Pile de la clé usée ou clé hors de l'habitacle : les notices Peugeot 208, Seat Ibiza et Renault Clio 5 décrivent un démarrage de secours. Un code de clé non reconnu par l'antidémarrage empêche aussi le démarrage (notices Peugeot 208 et Toyota Yaris)."
    pieces:
      - pile-de-cle
  - cause: Conditions de démarrage non remplies
    explication: "Pédale de frein ou d'embrayage non enfoncée, levier pas en position P, volant bloqué : un message le dit sur les voitures dont la notice le décrit (Peugeot 208, Renault Clio 5). Sur une Seat Ibiza à boîte automatique, le moteur ne démarre que levier sur P ou N, et seulement sur P sous -10 °C."
    pieces:
      - fonctionnement-normal
  - cause: Circuit électrique défectueux
    explication: "Autre cause du tableau des notices Renault Clio 5 et Dacia Sandero 3, quand les voyants faiblissent ou ne s'allument pas : elles demandent de consulter un représentant de la marque."
    pieces:
      - faisceau-et-connecteurs
---

## Que faire quand la voiture ne démarre pas ?

Ne multipliez pas les essais : la notice {{notice:notice-peugeot-208}} demande de couper le contact entre deux tentatives, puis de ne pas insister après quelques essais ({{cite:notice-peugeot-208|p. 93}}). Sur les moteurs essence, les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} demandent aussi de ne pas insister ({{cite:notice-renault-clio-5|p. 188}} ; {{cite:notice-dacia-sandero-3|p. 162}}). Regardez plutôt deux choses, qui orientent tout le reste : les voyants du tableau de bord quand vous mettez le contact, et le bruit du démarreur quand vous tournez la clé ou appuyez sur le bouton.

## Le bon geste selon ce qui se passe

{{arbre}}

1. Quand vous mettez le contact, les voyants du tableau de bord s'allument-ils normalement ?
   - Non, ou ils faiblissent : batterie déchargée, cosses mal serrées ou circuit défectueux, selon les notices Renault Clio 5 et Dacia Sandero 3 ; une fois le moteur démarré, voyez la question 6. {{verdict:ligne-1}}
   - Oui : passez à la question 2.
2. Un message s'affiche-t-il (clé non détectée, appuyer sur le frein ou l'embrayage, manœuvrer le volant, mettre le levier sur P) ?
   - Oui : faites ce que demande le message ; pour une clé non détectée, utilisez le démarrage de secours de votre notice (voir plus bas).
   - Non : passez à la question 3.
3. Diesel : le voyant de préchauffage est-il encore allumé ?
   - Oui : attendez qu'il s'éteigne avant de démarrer ; si le moteur ne démarre toujours pas, passez à la question 4. {{verdict:prechauffage}}
   - Non, ou voiture essence : passez à la question 4.
4. Le démarreur tourne-t-il ?
   - Non, alors que les voyants sont normaux et qu'aucun message ne s'affiche : aucune des notices lues ne donne de consigne pour ce cas ; demandez l'avis d'un professionnel.
   - Oui, mais le moteur ne démarre pas : passez à la question 5.
5. Le réservoir est-il vide ?
   - Oui, sur un diesel : mettez au moins 5 litres de gazole, puis suivez la procédure de votre notice. {{verdict:ligne-5}}
   - Oui, sur une voiture essence : faites le plein de carburant, comme le demande la notice Toyota Yaris, puis redémarrez.
   - Non : après quelques essais, n'insistez pas. {{verdict:ligne-4}}
6. Une fois le moteur démarré, le voyant batterie reste-t-il allumé, ou s'allume-t-il en roulant ?
   - Oui : la batterie n'est plus rechargée. {{verdict:batterie-rouge}}
   - Non : si la voiture a démarré grâce à une autre batterie, laissez tourner le moteur avant de rouler, puis faites-la vérifier. {{verdict:ligne-2}}

## Voiture qui ne démarre pas, voyants faibles ou éteints : la batterie

{{repere:ligne-1}}

Dans le tableau des anomalies des notices Renault Clio 5 et Dacia Sandero 3, des voyants qui faiblissent ou ne s'allument pas, avec un démarreur qui ne tourne pas, viennent de trois causes : des cosses de batterie mal serrées, débranchées ou oxydées, une batterie déchargée ou hors d'usage, ou un circuit défectueux ({{cite:notice-renault-clio-5|p. 384}} ; {{cite:notice-dacia-sandero-3|p. 347}}). La notice {{notice:notice-toyota-yaris}} ajoute un signe plus discret : un démarreur qui tourne lentement, avec des éclairages intérieurs et des phares atténués. La batterie est alors peut-être déchargée, ou ses bornes desserrées ou corrodées ({{cite:notice-toyota-yaris|p. 319}}).

Pour démarrer avec une autre batterie, suivez la notice de votre voiture : l'ordre de branchement et le point où se branche le câble noir changent d'une voiture à l'autre. Sur la Peugeot 208, la borne négative n'est pas accessible et un point de masse déporté la remplace ({{cite:notice-peugeot-208|p. 187-188}}) ; sur la Renault Clio 5, les câbles se branchent sur un bornier du compartiment moteur ({{cite:notice-renault-clio-5|p. 363-364}}).

Ce que les notices lues interdisent :

- démarrer avec des câbles si l'une des batteries est gelée : « risque d'explosion », selon la notice {{notice:notice-seat-ibiza}} ({{cite:notice-seat-ibiza|p. 57}}) ;
- démarrer le moteur en branchant un chargeur de batterie, ou utiliser un booster de batterie de 24 V ou plus (notices Peugeot 208 et {{notice:notice-citroen-c3}}) ({{cite:notice-peugeot-208|p. 187}} ; {{cite:notice-citroen-c3|p. 137}}) ;
- laisser tourner le moteur dans un endroit fermé : « risque d'intoxication », selon la notice Seat Ibiza ({{cite:notice-seat-ibiza|p. 213}}) ;
- utiliser un aérosol de démarrage à froid, qui peut exploser ou emballer le moteur (notice Seat Ibiza) ({{cite:notice-seat-ibiza|p. 213}}) ;
- pousser la voiture quand la colonne de direction est verrouillée (notices Renault Clio 5 et Dacia Sandero 3) ({{cite:notice-renault-clio-5|p. 384}} ; {{cite:notice-dacia-sandero-3|p. 347}}).

## Après le démarrage : peut-on rouler tout de suite ?

{{repere:ligne-2}}

Après un démarrage avec une autre batterie, les notices Peugeot 208 et Citroën C3 demandent de laisser tourner le moteur, à l'arrêt, au moins 30 minutes, pour que la batterie retrouve une charge suffisante. Rouler tout de suite peut altérer certaines fonctions de la voiture ({{cite:notice-peugeot-208|p. 188}} ; {{cite:notice-citroen-c3|p. 137}}). La notice Toyota Yaris demande ensuite de faire vérifier la voiture dès que possible ({{cite:notice-toyota-yaris|p. 320}}).

Si le voyant batterie reste allumé moteur tournant, la batterie n'est plus rechargée : {{verdict:batterie-rouge}}.

## Diesel : attendre que le voyant de préchauffage s'éteigne

{{repere:prechauffage}}

Sur un diesel, attendez que le voyant de préchauffage s'éteigne avant d'actionner le démarreur : c'est la consigne de toutes les notices lues pour ce voyant. Par temps froid, il reste allumé plus longtemps ({{cite:notice-peugeot-208|p. 93}}).

S'il reste allumé une fois le moteur démarré, aucune des notices lues ne donne de consigne pour ce cas. Selon la notice Seat Ibiza, le moteur peut alors présenter un dysfonctionnement ({{cite:notice-seat-ibiza|p. 289}}) : demandez l'avis d'un professionnel.

## Le démarreur tourne mais le moteur ne démarre pas

{{repere:ligne-4}}

La notice Peugeot 208 demande de couper le contact si le moteur ne démarre pas tout de suite, puis d'attendre quelques instants avant de recommencer. Après quelques tentatives, elle demande de ne pas insister, car le démarreur et le moteur risquent d'être endommagés, et de faire appel au réseau ou à un atelier qualifié ({{cite:notice-peugeot-208|p. 93}}).

Sur les moteurs essence, les notices Renault Clio 5 et Dacia Sandero 3 demandent aussi de ne pas insister, pour ne pas endommager le pot catalytique, le démarreur ou la batterie, et de faire appel à un représentant de la marque ({{cite:notice-renault-clio-5|p. 188}} ; {{cite:notice-dacia-sandero-3|p. 162}}). La notice Seat Ibiza demande d'interrompre le lancement et de réessayer au bout d'une minute environ ({{cite:notice-seat-ibiza|p. 212}}).

Quand le démarreur tourne normalement mais que le moteur ne part pas, la notice Toyota Yaris cite trois causes : trop peu de carburant (faites le plein), un moteur noyé (redémarrez en suivant la procédure de démarrage de la notice), ou un dysfonctionnement de l'antidémarrage ({{cite:notice-toyota-yaris|p. 318}}).

## Diesel en panne sèche : le réamorçage

{{repere:ligne-5}}

Sur un diesel tombé en panne sèche, refaire le plein ne suffit pas toujours. Les notices Peugeot 208 et Citroën C3 demandent d'abord de mettre au moins 5 litres de gazole, puis de réamorcer le circuit selon la procédure du moteur ({{cite:notice-peugeot-208|p. 175}} ; {{cite:notice-citroen-c3|p. 120}}). La notice Dacia Sandero 3 demande aussi de réamorcer le circuit avant de redémarrer ({{cite:notice-dacia-sandero-3|p. 160}}).

Sur la Renault Clio 5, la notice demande d'attendre quelques minutes, contact mis, avant de démarrer, pour réamorcer le circuit, et de répéter la procédure si le moteur ne démarre pas ; s'il ne démarre toujours pas après plusieurs tentatives, elle demande de faire appel à un représentant de la marque ({{cite:notice-renault-clio-5|p. 161}}). La notice Seat Ibiza ne parle pas de réamorçage : après le plein, le lancement du moteur peut durer jusqu'à une minute environ, le temps que le circuit élimine l'air ({{cite:notice-seat-ibiza|p. 212-213}}).

## Clé ou carte non reconnue : le démarrage de secours

Quand la pile de la clé est usée, la voiture peut ne pas la détecter. Les notices lues prévoient un démarrage de secours :

- Peugeot 208 : placer la télécommande contre le lecteur de secours, sur la colonne de direction ({{cite:notice-peugeot-208|p. 95}}) ;
- Seat Ibiza : juste après avoir appuyé sur le bouton de démarrage, tenir la clé près de l'habillage droit de la colonne de direction, au plus près du logo Kessy ({{cite:notice-seat-ibiza|p. 215}}) ;
- Renault Clio 5 : poser la carte sur la zone indiquée par le message, pédale de frein ou d'embrayage enfoncée ({{cite:notice-renault-clio-5|p. 175}}).

Si c'est le code de la clé qui n'est pas reconnu, l'antidémarrage empêche la voiture de démarrer et un message s'affiche ; la notice Peugeot 208 demande alors de s'adresser au réseau ({{cite:notice-peugeot-208|p. 92}}).

## Volant bloqué, clé qui ne tourne pas

C'est l'antivol de direction. Tournez le volant en même temps que la clé, ou en appuyant sur le bouton de démarrage, comme le décrivent les notices Peugeot 208 et Renault Clio 5 ({{cite:notice-peugeot-208|p. 92 et p. 94}} ; {{cite:notice-renault-clio-5|p. 384}}).

## Pousser la voiture pour la faire démarrer ?

Selon la notice Toyota Yaris, il est impossible de mettre le moteur en marche en poussant la voiture ({{cite:notice-toyota-yaris|p. 320}}). La notice Peugeot 208 interdit de pousser une voiture à boîte automatique pour la démarrer ({{cite:notice-peugeot-208|p. 188}}) et, sur les moteurs essence, les notices Renault Clio 5 et Dacia Sandero 3 demandent de ne pas insister en poussant ou en tirant la voiture sans avoir trouvé la cause de la panne ({{cite:notice-renault-clio-5|p. 188}} ; {{cite:notice-dacia-sandero-3|p. 162}}).

La notice Seat Ibiza déconseille de démarrer la voiture en la remorquant, l'interdit sur une boîte automatique et limite la distance à 50 m, à cause du risque pour le catalyseur ({{cite:notice-seat-ibiza|p. 58}}). Elle interdit aussi de remorquer la voiture si sa batterie est déchargée ({{cite:notice-seat-ibiza|p. 57}}).

## Ma voiture ne démarre pas malgré une batterie neuve

Si une batterie neuve se vide encore, la cause peut être le circuit de charge : la notice Peugeot 208 cite des cosses sales et une courroie d'alternateur détendue ou sectionnée ({{cite:notice-peugeot-208|p. 13}}). Le voyant batterie allumé moteur tournant le signale : {{verdict:batterie-rouge}}.
