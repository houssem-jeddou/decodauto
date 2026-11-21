---
# Page outil voyants (étape 8, livrable 8.1 ; demande de changement n° 11), variante du type voyant. Texte mis à jour avec
# la ligne STOP de la base (demande de changement n° 23, lot 3b), encadré inchangé ; passée de exemples/ à src/content par
# la pull request du lot 3b (règle de passage, travaux/etape-8/regle-de-passage.md). Les lignes de l'encadré et toute la
# liste viennent de la base voyants validée.
id: voyants
title: "Voyant orange voiture : signification et liste des voyants"
h1: "Voyants du tableau de bord : lequel est allumé, et pouvez-vous rouler ?"
description: "Un voyant orange peut imposer l'arrêt : trouvez le vôtre par couleur et lisez si vous pouvez rouler, quand agir et que faire, d'après les notices des constructeurs."
libelle_court: Identifier un voyant
question_decision: "Quel voyant s'est allumé, et pouvez-vous continuer à rouler ?"
situations:
  - voyant: moteur-orange-fixe
voyants:
  - moteur-orange-fixe
cout_probable:
  base_de_calcul: "Le coût dépend du voyant et de sa cause : chaque page de voyant donne sa plage."
  sources:
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-renault-clio-5
    - notice-seat-ibiza
    - notice-toyota-yaris
sources:
  - notice-citroen-c3
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
  - reglement-onu-121
element_unique: outil
outil: true
auteur: houssem-jeddou
date_publication: 2026-11-04
date_modification: 2026-11-21
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
# Encadré de décision (question, renvoi, lignes, coût probable) et textes fixes de l'outil validés par Houssem le 04/11/2026
# (13 h 48), avec les faits du texte (paquet travaux/etape-8/paquet-8.1-outil-voyants.md).
# Texte mis à jour validé par Houssem le 14/11/2026 (15 h 27), avec la demande n° 23 (paquet travaux/etape-8/paquet-lot-3b.md).
# Encadré au format 2 réduit à une ligne d'exemple, suivie de la grille des dessins (demande de changement n° 41, lot U2) :
# validé par Houssem le 21/11/2026 (7 h 11) sur la maquette (paquet travaux/etape-12/lot-u2/paquet-u2.md).
validation: 64132080acc1e0a7429ef9d32bb74bf5d7e4f9134b4d36e85fce8ad6fa0fc629
format: 2
illustration:
  fichier: accueil-tableau-de-bord
  alt: "Le combiné d'instruments, avec cinq voyants allumés : quatre sur l'écran entre les compteurs, le voyant ABS juste en dessous"
  legende: "Les voyants s'allument au combiné, entre les compteurs ou sur l'écran : repérez le dessin, sa couleur, et s'il reste fixe ou clignote."
---

## Comment lire un voyant

Regardez le dessin, puis la couleur, puis la façon dont le voyant s'allume : fixe ou clignotant. Plusieurs notices l'appellent « témoin » : c'est la même chose.

Un même dessin peut avoir plusieurs lignes dans la liste. Le voyant moteur en a trois : orange fixe, orange clignotant, rouge. Le voyant de pression des pneus en a deux : allumé fixe, ou qui clignote puis reste allumé.

Lisez aussi le message affiché à côté du voyant : il peut changer la consigne, comme « Risque casse moteur » dans les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}}.

Pour ne voir que les voyants orange ou jaunes, ou que les rouges, utilisez le filtre de la liste.

## Un voyant s'allume à la mise du contact, puis s'éteint

Dans la notice {{notice:notice-peugeot-208}}, certains témoins d'alerte, rouges ou orange, s'allument quelques secondes à la mise du contact, et doivent s'éteindre dès le démarrage du moteur ({{cite:notice-peugeot-208|p. 12}}). S'il reste allumé après le démarrage, ou s'il s'allume en roulant, cherchez sa ligne dans la liste.

## Que veut dire la couleur d'un voyant ?

La couleur seule ne dit pas quoi faire. « L'allumage d'un témoin d'alerte (rouge ou orange) peut indiquer l'apparition d'une anomalie nécessitant un diagnostic complémentaire », dit {{notice:notice-peugeot-208}} ({{cite:notice-peugeot-208|p. 12}}) : c'est la consigne de chaque voyant qui décide, et la liste la donne.

Le règlement ONU n° 121, qui porte sur l'homologation des véhicules, fixe la couleur de certains voyants ({{cite:reglement-onu-121|§ 5.4.1 et tableau, colonne 5}}) : rouge pour la pression d'huile, la température du liquide de refroidissement et l'état de charge de la batterie ; jaune pour l'antiblocage des freins (ABS), l'autodiagnostic du moteur, le préchauffage diesel et le sous-gonflage des pneus ; vert pour les feux de croisement et les clignotants ; bleu pour les feux de route. Pour un voyant que ce tableau n'énumère pas, le constructeur choisit la couleur, selon les directives d'une norme, ISO 2575 ({{cite:reglement-onu-121|§ 5.4.2}}). Pour certains symboles, le tableau admet aussi une autre couleur, qui change la signification ({{cite:reglement-onu-121|note 20}}) : dans {{notice:notice-dacia-sandero-3}}, le voyant de température s'allume en bleu au démarrage, et devient rouge en cas d'alerte ({{cite:notice-dacia-sandero-3|p. 111}}).

Ce règlement fixe un symbole et une couleur : il ne dit pas si vous pouvez rouler.

Le règlement dit « jaune ». {{notice:notice-peugeot-208}} parle de témoins « de couleur orange » ({{cite:notice-peugeot-208|p. 14}}), {{notice:notice-seat-ibiza}} de témoins « jaunes » ({{cite:notice-seat-ibiza|p. 93-94}}) : la liste les range sous une seule couleur.

## Un voyant orange permet-il toujours de rouler ?

Non. Une idée répandue veut qu'un voyant orange laisse rouler sans s'arrêter ; ce n'est pas ce que disent toutes les notices lues.

Pour le voyant moteur orange allumé fixe, {{notice:notice-toyota-yaris}} demande d'arrêter immédiatement le véhicule dans un endroit sûr ({{cite:notice-toyota-yaris|p. 293}}). D'où la consigne « {{verdict:moteur-orange-fixe}} », et l'écart entre les marques affiché dans l'encadré. Pour le voyant de pression des pneus allumé fixe, orange lui aussi, la consigne est la même : « {{verdict:pression-pneus}} ».

À l'inverse, un voyant rouge n'impose pas toujours l'arrêt. Le voyant de frein de stationnement, rouge, signale le frein à main serré : « {{verdict:frein-stationnement}} », une fois le frein complètement desserré ; le voyant doit alors s'éteindre.

Si ce voyant reste allumé, ce n'est plus ce cas : voyez le [voyant de freinage rouge](#da-voyant-frein-rouge). S'il clignote, {{notice:notice-peugeot-208}} signale pour le frein électrique un serrage ou un desserrage défaillant, et demande l'arrêt du véhicule ({{cite:notice-peugeot-208|p. 14}}).

Chaque groupe de la liste compte ses verdicts : c'est la ligne de votre voyant qui décide, pas sa couleur.

## Est-ce dangereux de rouler avec le voyant moteur orange allumé ?

{{repere:moteur-orange-fixe}}

La [page Voyant moteur](/voyants/moteur/) donne ses causes possibles et ce que dit chaque notice, y compris quand le voyant clignote.

## « Point d'exclamation », « zig zag », « clé », « huile » : quel voyant est-ce ?

- **Cercle avec un point d'exclamation** : le [voyant de freinage rouge](#da-voyant-frein-rouge).
- **Fer à cheval avec un point d'exclamation** : le [voyant de pression des pneus](#da-voyant-pression-pneus).
- **Volant avec un point d'exclamation** : le voyant de direction, [orange](#da-voyant-direction-orange) ou [rouge](#da-voyant-direction-rouge).
- **Voiture qui dérape, avec des traces en zig zag** : le voyant ESP (contrôle de stabilité), [qui clignote](#da-voyant-esp-clignotant) ou [allumé fixe](#da-voyant-esp-defaut).
- **Clé** : le [rappel d'entretien](#da-voyant-entretien-vidange). Attention : dans les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}}, la clé est le témoin Service, et ces notices demandent « un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement » ({{cite:notice-renault-clio-5|p. 136}}, {{cite:notice-dacia-sandero-3|p. 110}}).
- **Huile** : en rouge, la [pression d'huile](#da-voyant-huile-pression-rouge) ; en orange ou par un message, le [niveau d'huile](#da-voyant-huile-niveau).
- **STOP** : le [voyant STOP](#da-voyant-stop), rouge, qui s'allume avec un autre témoin ou un message : « {{verdict:stop}} ». Les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}} disent que ce témoin « vous impose, pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation » ({{cite:notice-renault-clio-5|p. 136}}, {{cite:notice-dacia-sandero-3|p. 110}}).
- **Triangle avec un point d'exclamation** : pas de ligne propre dans la liste, car seules les notices {{notice:notice-renault-clio-5}} et {{notice:notice-dacia-sandero-3}}, d'un même groupe, lui donnent une consigne propre. Elles l'appellent témoin d'alerte : s'il s'allume en rouge en roulant, accompagné du témoin STOP, il impose le même arrêt impératif que le [voyant STOP](#da-voyant-stop) ; s'il s'allume en jaune en roulant, accompagné du témoin Service (la clé), il « nécessite un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement » ({{cite:notice-renault-clio-5|p. 138}}, {{cite:notice-dacia-sandero-3|p. 112}}). Dans {{notice:notice-seat-ibiza}}, le voyant central d'alerte, rouge ou jaune, renvoie aux informations affichées à l'écran ({{cite:notice-seat-ibiza|p. 93}}) : lisez le message, il dit quel système est en cause ; pour une autre voiture, cherchez-le dans sa notice et, en cas de doute, demandez l'avis d'un professionnel.
- **Préchauffage (spirale) qui clignote** : pas de ligne propre dans la liste, qui ne donne que le voyant allumé quelques secondes à la mise du contact. Dans {{notice:notice-seat-ibiza}}, il signale un dysfonctionnement de la gestion du moteur diesel : « Faites immédiatement contrôler le moteur par un atelier spécialisé. » ({{cite:notice-seat-ibiza|p. 289}}).
- **Courroie de distribution** : aucune ligne de la liste. Le site ne donne pas de verdict pour ce voyant : cherchez-le dans la notice de votre voiture et, en cas de doute, demandez l'avis d'un professionnel.

## « Voyant orange Dacia », « tableau de bord Clio » : et votre voiture ?

Le verdict de chaque ligne ne dépend pas de votre marque : c'est le plus prudent des notices lues, celles de {{notice:notice-dacia-sandero-3}}, {{notice:notice-peugeot-208}}, {{notice:notice-renault-clio-5}}, {{notice:notice-seat-ibiza}} et {{notice:notice-toyota-yaris}}, et celle de {{notice:notice-citroen-c3}} pour le voyant STOP.

Une consigne citée ne vaut que pour le modèle de sa notice : une autre Dacia, ou une autre génération de Clio, peut donner une consigne différente. La notice de votre propre voiture fait foi pour votre véhicule : si elle donne une consigne différente, suivez-la.

Le site ne propose pas de tableau de bord modèle par modèle. Cette liste ne couvre ni les voitures hybrides ou électriques, ni les deux-roues.
