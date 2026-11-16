---
# Page « voyant moteur » de la vague A (modèle de page voyant ; exemple du livrable 6.6a, complété au lot 2 le
# 14/11/2026 et validé par Houssem le 14/11/2026). Passée de exemples/ à src/content par la pull request du lot 2
# (règle de passage, travaux/etape-8/regle-de-passage.md). Les lignes de l'encadré viennent de la base voyants validée.
id: voyant-moteur
title: "Voyant moteur orange allumé : peut-on rouler ? Que faire ?"
h1: "Voyant moteur orange, fixe ou clignotant : que faire ?"
description: "Voyant moteur orange, fixe ou clignotant, ou rouge : la consigne la plus prudente des notices lues est de vous arrêter immédiatement, dès que c'est sans danger. Ce que dit chaque marque."
libelle_court: Voyant moteur
question_decision: Puis-je continuer à rouler avec le voyant moteur allumé ?
situations:
  - voyant: moteur-orange-fixe
  - voyant: moteur-orange-clignotant
  - voyant: moteur-rouge
voyants:
  - moteur-orange-fixe
  - moteur-orange-clignotant
  - moteur-rouge
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Le risque si l'on continue vient des notices Peugeot 208 et Seat Ibiza : le catalyseur peut être endommagé quand le voyant clignote."
  sources:
    - notice-peugeot-208
    - notice-seat-ibiza
  si_vous_continuez:
    tranche: organe
    citations:
      - voyant: moteur-orange-clignotant
        source: notice-peugeot-208
        emplacement: "p. 15, « Système d'autodiagnostic moteur » ; renvoi (2) p. 13"
      - voyant: moteur-orange-clignotant
        source: notice-seat-ibiza
        emplacement: "p. 288, « Gestion du moteur et système d'épuration des gaz d'échappement », Témoins"
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
  - notice-citroen-c3
  - arrete-1991-06-18-controle-technique
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-03
date_modification: 2026-11-14
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
# Encadré de décision (question, lignes, coût probable et pièces des causes) validé par Houssem le 03/11/2026 (17 h 32),
# avec les faits du texte (paquet travaux/etape-6/paquet-6.6a-voyant-moteur.md).
validation: ceaa32fa0a950647b8b04773dd6d19119eb701a6bdf11ee94044e2f789f46b1f
causes:
  - cause: Défaut du système antipollution
    explication: "Pour le voyant orange fixe, les notices Peugeot 208, Seat Ibiza, Renault Clio 5 phase 2 et Dacia Sandero 3 désignent le système qui contrôle les gaz d'échappement ; la notice Peugeot 208 cite aussi une défaillance mineure du moteur. Elles ne nomment pas de pièce : elles demandent de consulter un réparateur ou le réseau de la marque."
    pieces:
      - capteur-ou-sonde
  - cause: Défaut d'une commande électronique (moteur, papillon, boîte)
    explication: "Selon la notice Toyota Yaris, le même voyant signale un dysfonctionnement du système électronique de commande du moteur, de celui du papillon, ou de celui de la boîte Multidrive si la voiture en est équipée."
    pieces:
      - calculateur
      - capteur-ou-sonde
      - faisceau-et-connecteurs
  - cause: Défaut de combustion qui menace le catalyseur (voyant qui clignote)
    explication: "Quand le voyant clignote, les notices Seat Ibiza et Peugeot 208 signalent un défaut de combustion ou du contrôle moteur qui peut endommager, voire détruire, le catalyseur. Elles ne nomment pas la pièce en défaut : la tranche de coût de cette cause est celle du catalyseur."
    pieces:
      - catalyseur
  - cause: Défaillance grave du moteur (voyant rouge ou STOP)
    explication: "Annoncée par le voyant rouge dans la notice Peugeot 208 (« défaillance majeure du moteur »), et par le message « Risque casse moteur » dans les notices Renault Clio 5 phase 2 et Dacia Sandero 3 : défaillance de l'injection, surchauffe du moteur ou problème grave au niveau du moteur."
    pieces:
      - injecteurs
      - moteur
format: 2
illustration:
  fichier: voyant-moteur-tableau-de-bord
  alt: "Le voyant moteur orange allumé au tableau de bord"
  legende: "Le voyant moteur ressemble à un bloc moteur vu de côté. Orange : fixe ou clignotant ; rouge sur certaines marques."
---

## Peut-on rouler avec le voyant moteur orange allumé ?

{{repere:moteur-orange-fixe}}

Cette consigne est la plus prudente des notices lues, celle de la Toyota Yaris : arrêter immédiatement le véhicule dans un endroit sûr.

Une idée répandue veut qu'on puisse continuer à rouler avec le voyant moteur orange fixe, que la notice Seat Ibiza dit jaune ({{cite:notice-seat-ibiza|p. 93-94}}). Les autres notices lues le permettent en effet, pour aller au garage au plus tôt ou rapidement selon la marque. L'encadré dit quand repartir, et quand faire appel à un garage ou à l'assistance.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-citroen-c3}}
- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

Le nom du voyant change d'une notice à l'autre : « voyant de dysfonctionnement » (Toyota Yaris), « système d'autodiagnostic moteur » (Peugeot 208, Citroën C3), « témoin de contrôle du système antipollution » (Renault Clio 5 phase 2, Dacia Sandero 3). Le tableau plus bas donne, avec chaque consigne, la section de la notice où la trouver.

## Le voyant s'allume au démarrage, puis s'éteint

Dans les notices Renault Clio 5 phase 2 et Dacia Sandero 3, ce voyant s'allume au démarrage du moteur, puis s'éteint ; suivant le véhicule, il s'allume aussi à la coupure du contact ({{cite:notice-renault-clio-5|p. 139}} ; {{cite:notice-dacia-sandero-3|p. 113}}). La notice Peugeot 208 précise qu'il doit s'éteindre au démarrage du moteur ({{cite:notice-peugeot-208|p. 15}}). La consigne de l'encadré vaut quand il reste allumé, ou quand il s'allume en roulant.

## Voyant moteur qui clignote

{{repere:moteur-orange-clignotant}}

Dans les notices Peugeot 208 et Seat Ibiza, le clignotement annonce une conséquence plus grave que le voyant fixe : le catalyseur risque d'être endommagé, voire détruit ({{cite:notice-peugeot-208|p. 15}} ; {{cite:notice-seat-ibiza|p. 288}}).

Les notices Renault Clio 5 phase 2 et Dacia Sandero 3 demandent de réduire le régime moteur jusqu'à ce que le clignotement cesse, puis de consulter au plus tôt un représentant de la marque ({{cite:notice-renault-clio-5|p. 139}} ; {{cite:notice-dacia-sandero-3|p. 113}}) : le clignotement qui cesse ne dispense pas de cette visite.

## Voyant moteur rouge ou message « Risque casse moteur »

{{repere:moteur-rouge}}

Dans la notice Peugeot 208, le voyant d'autodiagnostic moteur rouge signale une défaillance majeure du moteur, et l'arrêt du véhicule est impératif ({{cite:notice-peugeot-208|p. 13}}). Dans les notices Renault Clio 5 phase 2 et Dacia Sandero 3, le message « Risque casse moteur » impose un arrêt immédiat, moteur coupé et sans le redémarrer ({{cite:notice-renault-clio-5|p. 125}} ; {{cite:notice-dacia-sandero-3|p. 102}}).

Pour un autre modèle de ces marques, une Clio 4 ou une Mégane par exemple, c'est la notice de votre voiture qui fait foi.

## Message « Antipollution à contrôler »

Dans la notice Renault Clio 5 phase 2, ce message indique une défaillance du système de dépollution. Il fait partie des messages qui demandent de s'arrêter au plus tôt chez un représentant de la marque, en conduisant avec ménagement ({{cite:notice-renault-clio-5|p. 124}}). Pour le voyant moteur orange fixe, la consigne de l'encadré reste : {{verdict:moteur-orange-fixe}}.

## « Défaut moteur », « système antipollution défaillant » : Peugeot et Citroën

Dans les notices Peugeot 208 et Citroën C3, le voyant d'autodiagnostic moteur orange allumé fixe signifie que « le système d'antipollution est défaillant » : elles demandent alors de se rendre rapidement dans le réseau de la marque ou dans un atelier qualifié. Allumé avec le témoin en forme de clé, il signale une défaillance mineure du moteur.

En rouge, ce voyant signale une défaillance majeure du moteur, pour laquelle ces notices demandent l'arrêt du véhicule ({{cite:notice-peugeot-208|p. 13 et p. 15}} ; {{cite:notice-citroen-c3|p. 9-11}}). Pour le voyant orange fixe, la consigne de l'encadré vaut aussi pour ces deux marques : {{verdict:moteur-orange-fixe}}.

Pour un autre modèle de ces marques, une 308, une 3008, une C4 ou une DS3 par exemple, c'est la notice de votre voiture qui fait foi.

## Défaut moteur, vanne EGR, sonde : quelle pièce est en cause ?

Les notices lues ne nomment aucune pièce pour ce voyant, ni vanne EGR ni sonde : elles demandent de consulter un réparateur ou le réseau de la marque. Les causes possibles, plus bas, suivent ce que disent les notices.

## Combien de kilomètres peut-on faire ?

Pour le voyant moteur seul, les notices lues ne donnent aucune distance. Elles donnent une consigne à la place : s'arrêter immédiatement (Toyota Yaris), consulter au plus tôt ou rapidement, ou rouler prudemment jusqu'à l'atelier spécialisé le plus proche (Seat Ibiza), selon la marque et selon que le voyant est fixe ou clignote. Fixe ou clignotant, le voyant a le même verdict dans l'encadré : {{verdict:moteur-orange-fixe}}.

Sur un moteur diesel, si le voyant AdBlue s'allume avec le voyant moteur, lisez aussi sa consigne dans la notice de votre voiture.

## Comment éteindre le voyant moteur ?

Aucune des notices lues ne donne de manipulation pour éteindre ce voyant : elles demandent de consulter un réparateur ou le réseau de la marque.

La notice Toyota Yaris décrit un cas où il s'éteint de lui-même : sur certains modèles, le voyant s'allume si le réservoir de carburant devient complètement vide. La notice demande alors de faire le plein : le voyant s'éteint après plusieurs trajets ; sinon, elle demande de contacter un réparateur dès que possible ({{cite:notice-toyota-yaris|p. 297}}).

## La voiture roule normalement, mais le voyant est allumé

Les notices lues ne font pas d'exception quand la voiture semble rouler normalement, hormis le cas du réservoir vidé décrit plus haut : la consigne reste celle du voyant, fixe ou clignotant.

## Perte de puissance, moteur qui tourne mal

La notice Seat Ibiza relie ces symptômes au voyant : en cas de panne de combustion, de baisse de puissance ou de fonctionnement irrégulier du moteur, elle demande de faire réviser la voiture par un atelier spécialisé, et précise que le témoin de gaz d'échappement s'allume en général dans ce cas ; le catalyseur risquerait alors d'être endommagé par surchauffe ({{cite:notice-seat-ibiza|p. 289, « Catalyseur »}}). Avec le voyant allumé, fixe ou clignotant, l'encadré dit : {{verdict:moteur-orange-fixe}}.

## Contrôle technique avec le voyant moteur allumé

Au contrôle technique, le contrôleur relève le système OBD (le diagnostic embarqué) du moteur. Pour un moteur essence (point 8.2.12) comme pour un moteur diesel (point 8.2.22), le texte distingue trois cas ({{cite:arrete-1991-06-18-controle-technique|annexe I, points 8.2.12 et 8.2.22}}) :

- le relevé indique une anomalie du dispositif antipollution, sans dysfonctionnement important : défaillance mineure ;
- le relevé indique un dysfonctionnement important : défaillance majeure ;
- la connexion est impossible, sans dysfonctionnement du témoin OBD : défaillance mineure.

Une défaillance majeure donne un résultat défavorable : la contre-visite doit être faite dans les deux mois qui suivent le contrôle, faute de quoi un nouveau contrôle complet est à refaire ({{cite:arrete-1991-06-18-controle-technique|article 7}}).

Le texte parle du relevé du système OBD, pas du voyant : il ne dit pas si un voyant moteur allumé, à lui seul, donne l'un de ces cas. Le plus sûr est de faire chercher la cause avant le rendez-vous.
