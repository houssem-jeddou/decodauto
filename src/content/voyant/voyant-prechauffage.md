---
# Page « voyant préchauffage » de la vague A (étape 8, lot 5c), rédigée le 14/11/2026 et validée par Houssem le 14/11/2026.
# Passée de exemples/ à src/content par la pull request du lot 5c (règle de passage, travaux/etape-8/regle-de-passage.md).
id: voyant-prechauffage
title: "Voyant préchauffage allumé ou qui clignote : peut-on rouler ?"
h1: "Voyant de préchauffage (diesel) : normal au démarrage, défaut s'il clignote"
description: "Voyant de préchauffage allumé à la mise du contact d'un diesel : c'est normal, attendez qu'il s'éteigne. S'il clignote, faites contrôler le moteur sans attendre."
libelle_court: Voyant de préchauffage
question_decision: Puis-je continuer à rouler avec le voyant de préchauffage allumé ou qui clignote ?
situations:
  - voyant: prechauffage
  - voyant_lie: prechauffage
    situation: "Le voyant de préchauffage (spirale) clignote : la gestion du moteur diesel est en défaut ; le moteur peut perdre de la puissance et consommer davantage."
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites contrôler le moteur sans attendre par un atelier. Si le voyant moteur s'allume aussi, c'est sa consigne, plus prudente, qui s'applique."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 289, « Gestion du moteur et système d'épuration des gaz d'échappement », Témoins et Nota"
        extrait: "Clignote. Dysfonctionnement de la gestion du moteur diesel. Faites immédiatement contrôler le moteur par un atelier spécialisé. […] Tant que les voyants […] restent allumés, il est possible que le moteur présente un dysfonctionnement, que la consommation de carburant augmente et que le moteur perde de la puissance."
        verdict: oui avec précautions
        urgence: immédiate
  - voyant: moteur-orange-fixe
voyants:
  - prechauffage
  - moteur-orange-fixe
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site) : du préchauffage normal au démarrage, sans dépense, à la réparation de la commande électronique du moteur au garage."
  sources:
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-renault-clio-5
    - notice-seat-ibiza
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-16
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
# Encadré de décision (question, lignes, coût probable et pièces des causes) validé par Houssem le 14/11/2026 (19 h 53),
# avec les faits du texte (paquet travaux/etape-8/paquet-lot-5c.md).
validation: 883bba2212f5cf8abeea25560c167de6fde49ea706b5cd4722480953dc71c41b
causes:
  - cause: Préchauffage du moteur diesel au démarrage
    explication: "Selon les notices Peugeot 208, Renault Clio 5 phase 2, Dacia Sandero 3 et Seat Ibiza, le témoin signale le préchauffage du moteur diesel, puis s'éteint quand le moteur peut démarrer : c'est le fonctionnement normal. Selon les notices Renault et Dacia, il indique que les bougies de préchauffage fonctionnent."
    pieces:
      - fonctionnement-normal
  - cause: Défaut de la gestion du moteur diesel (voyant qui clignote)
    explication: "Selon la notice Seat Ibiza, le témoin qui clignote signale un dysfonctionnement de la gestion du moteur diesel, sans nommer la pièce en cause : le diagnostic au garage le dit."
    pieces:
      - calculateur
      - capteur-ou-sonde
      - faisceau-et-connecteurs
format: 2
illustration:
  fichier: voyant-prechauffage-tableau-de-bord
  alt: "Le voyant de préchauffage, en forme de spirale, allumé en orange au tableau de bord"
  legende: "Le voyant de préchauffage a la forme d’une spirale. Sur un diesel, il s’allume à la mise du contact : attendez qu’il s’éteigne pour démarrer."
---

## Peut-on rouler avec le voyant de préchauffage allumé ?

Tout dépend de ce qu'il fait.

**Allumé à la mise du contact, puis éteint** : {{verdict:prechauffage}}. C'est le préchauffage du moteur diesel : attendez qu'il s'éteigne avant de démarrer.

Selon la notice Peugeot 208, ce voyant s'allume si les conditions climatiques et la température du moteur le nécessitent, jusqu'à environ 30 secondes en conditions hivernales sévères ({{cite:notice-peugeot-208|p. 14}}). Selon les notices Renault Clio 5 phase 2 et Dacia Sandero 3, il doit s'allumer contact mis : il indique que les bougies de préchauffage fonctionnent, et s'éteint quand le préchauffage est obtenu ({{cite:notice-renault-clio-5|p. 139}}, {{cite:notice-dacia-sandero-3|p. 113}}).

**Il clignote** : {{verdict:ligne-2}}. Cette ligne repose sur une seule notice, celle de la Seat Ibiza, la seule des notices lues qui décrit ce clignotement : elle signale un dysfonctionnement de la gestion du moteur diesel, et demande de faire contrôler immédiatement le moteur par un atelier spécialisé ({{cite:notice-seat-ibiza|p. 289}}).

**Il reste allumé après le démarrage, ou s'allume en roulant sans clignoter** : aucune des notices lues ne donne de consigne pour ce cas. Selon la notice Seat Ibiza, tant que ce voyant reste allumé, le moteur peut présenter un dysfonctionnement, consommer davantage et perdre de la puissance ({{cite:notice-seat-ibiza|p. 289}}). Demandez l'avis d'un professionnel ; avec le voyant moteur, c'est la consigne du voyant moteur qui s'applique.

**Avec le voyant moteur allumé** : c'est la consigne du [voyant moteur](/voyants/moteur/), plus prudente, qui s'applique : {{verdict:moteur-orange-fixe}}.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}

La notice Toyota Yaris lue pour les autres pages du site ne décrit pas de moteur Diesel.

## Voyant bougie de préchauffage : démarrer quand il s'éteint

{{repere:prechauffage}}

Selon la notice Peugeot 208, à l'extinction du témoin, le démarrage est immédiat en maintenant l'appui sur la pédale d'embrayage (boîte manuelle) ou sur la pédale de frein (boîte automatique) ; si le moteur ne démarre pas, il faut renouveler la demande de démarrage en gardant le pied sur la pédale ({{cite:notice-peugeot-208|p. 14}}). Selon la notice Seat Ibiza, le moteur peut être démarré immédiatement quand le témoin s'éteint ({{cite:notice-seat-ibiza|p. 289}}). Consigne de l'encadré pour ce voyant allumé au démarrage : {{verdict:prechauffage}}.

## Voyant de préchauffage qui clignote et perte de puissance

{{repere:ligne-2}}

La notice Seat Ibiza fait le lien : tant que certains voyants, dont celui du préchauffage, restent allumés, le moteur peut présenter un dysfonctionnement, consommer davantage et perdre de la puissance. Elle demande aussi de faire réviser la voiture en cas de baisse de puissance ou de fonctionnement irrégulier du moteur ({{cite:notice-seat-ibiza|p. 289}}).

La consigne est la même en roulant : {{verdict:ligne-2}}. La notice lue est celle de la Seat Ibiza : pour une Volkswagen, une Audi ou une autre voiture, c'est sa propre notice qui dit ce que signale ce clignotement.

## Un voyant orange qui clignote : lequel ?

Plusieurs voyants orange peuvent clignoter, avec des consignes différentes : la [liste des voyants](/voyants/) aide à reconnaître le dessin. Celui du préchauffage est une spirale, comme un ressort couché.
