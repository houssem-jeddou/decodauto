---
# Brouillon de la page « voyants ABS et ESP » de la vague A (étape 8, lot 5a), rédigé le 14/11/2026, à valider par
# Houssem. Hors de exemples/ et de src/content tant qu'il n'est pas validé. Les lignes de l'encadré viennent de la base.
id: voyant-abs-esp
title: "Voyant ABS ou ESP allumé : peut-on rouler, que faire ?"
h1: "Voyants ABS et ESP : que faire quand ils s'allument ?"
description: "Voyant ABS seul : vous pouvez rouler prudemment, le freinage classique reste assuré, mais faites vérifier sans attendre. Avec le voyant de freinage rouge : arrêtez-vous."
libelle_court: Voyants ABS et ESP
question_decision: Puis-je continuer à rouler avec le voyant ABS ou ESP allumé ?
situations:
  - voyant: abs-et-frein
  - voyant: abs
  - voyant: esp-defaut
  - voyant: esp-clignotant
voyants:
  - abs-et-frein
  - abs
  - esp-defaut
  - esp-clignotant
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site) : du système en action ou désactivé, sans dépense, à la réparation du système de freinage au garage."
  sources:
    - notice-dacia-sandero-3
    - notice-peugeot-208
    - notice-renault-clio-5
    - notice-seat-ibiza
    - arrete-1991-06-18-controle-technique
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
  - arrete-1991-06-18-controle-technique
element_unique: tableau
auteur: houssem-jeddou
date_publication: 2026-11-14
date_modification: 2026-11-14
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
causes:
  - cause: Contrôle de stabilité en action sur route glissante
    explication: "Selon les notices Peugeot 208, Renault Clio 5 phase 2, Dacia Sandero 3, Seat Ibiza et Toyota Yaris, le voyant ESP clignote quand le système corrige une perte d'adhérence ou de trajectoire : c'est son fonctionnement normal."
    pieces:
      - fonctionnement-normal
  - cause: Contrôle de stabilité désactivé
    explication: "Selon la notice Peugeot 208, le voyant fixe peut signaler un système désactivé, réactivé de lui-même au démarrage et à partir d'environ 50 km/h ; la notice Seat Ibiza décrit l'antipatinage désactivé à la main, ou le contrôle de stabilité en mode Sport."
    pieces:
      - systeme-desactive
  - cause: Défaillance de l'ABS (capteur de roue, câblage ou autre composant)
    explication: "Les notices disent que le système d'antiblocage est défaillant sans nommer la pièce. Le contrôle technique vérifie notamment le capteur de vitesse de roue et le câblage de l'ABS (annexe I de l'arrêté du 18 juin 1991, point 1.6.1). Selon la notice Seat Ibiza, un ABS défaillant allume aussi le voyant ESP."
    pieces:
      - capteur-abs
      - faisceau-et-connecteurs
  - cause: Défaillance du répartiteur de freinage ou des dispositifs de freinage
    explication: "Quand les voyants ABS et freinage s'allument ensemble, la notice Peugeot 208 indique une défaillance du répartiteur électronique de freinage, et les notices Renault Clio 5 phase 2 et Dacia Sandero 3 une défaillance des dispositifs de freinage, sans nommer la pièce."
    pieces:
      - calculateur
---

## Peut-on rouler avec le voyant ABS allumé ?

Tout dépend du voyant de freinage rouge.

**Voyant ABS seul** : {{verdict:abs}}. Les notices Peugeot 208, Renault Clio 5 phase 2 et Dacia Sandero 3 disent que le freinage reste assuré comme sur une voiture sans ABS ({{cite:notice-peugeot-208|p. 17}}, {{cite:notice-renault-clio-5|p. 138}}, {{cite:notice-dacia-sandero-3|p. 112}}) : vous pouvez donc rouler, mais sans antiblocage, les roues peuvent se bloquer lors d'un freinage fort. Peugeot demande de rouler prudemment à allure modérée jusqu'au garage, Toyota de faire vérifier la voiture immédiatement ({{cite:notice-toyota-yaris|p. 293}}). L'encadré retient la consigne la plus prudente : faire vérifier sans attendre, en roulant prudemment.

**Voyants ABS et freinage rouge allumés ensemble** : {{verdict:abs-et-frein}}. La notice Toyota Yaris prévient que la voiture devient très instable au freinage ({{cite:notice-toyota-yaris|p. 298}}). Selon la notice Seat Ibiza, les roues arrière peuvent se bloquer et l'arrière de la voiture déraper ({{cite:notice-seat-ibiza|p. 251}}). Les notices Renault et Dacia, quand plusieurs témoins s'allument avec le message « Panne du système de freinage », disent que le freinage n'est plus que partiellement assuré, qu'il est dangereux de freiner brusquement et que l'arrêt est impératif et immédiat ({{cite:notice-renault-clio-5|p. 213}}, {{cite:notice-dacia-sandero-3|p. 184-185}}). Arrêtez-vous en freinant progressivement, puis faites appel à un garage ou à l'assistance.

Les notices lues pour cette page sont celles de ces modèles ; pour une autre génération ou un autre modèle, c'est la notice de votre voiture qui fait foi :

- {{notice:notice-dacia-sandero-3}}
- {{notice:notice-peugeot-208}}
- {{notice:notice-renault-clio-5}}
- {{notice:notice-seat-ibiza}}
- {{notice:notice-toyota-yaris}}

## Voyant ESP qui clignote ou allumé fixe

Le voyant ESP, orange, montre une voiture qui glisse, avec deux traces en zigzag derrière elle. Le système que l'on appelle couramment ESP porte d'autres noms dans les notices : CDS chez Peugeot, ESC chez Renault, Dacia et Seat, VSC chez Toyota. Il corrige la trajectoire en agissant sur le freinage de certaines roues ou sur la puissance du moteur ({{cite:notice-renault-clio-5|p. 213}}). Les notices l'associent à l'antipatinage (ASR chez Peugeot et Seat, TRC chez Toyota).

- **Il clignote en roulant** : le système est en action, il corrige une perte d'adhérence ou de trajectoire ({{cite:notice-peugeot-208|p. 17}}). Verdict retenu : {{verdict:esp-clignotant}}. Pour Peugeot, Renault, Dacia et Toyota, c'est son fonctionnement normal ; la notice Seat demande d'adapter immédiatement sa vitesse à l'état de la route ({{cite:notice-seat-ibiza|p. 255}}), et c'est la consigne retenue.
- **Il reste allumé fixe** : soit le système a été désactivé, soit il est en défaut. Selon la notice Peugeot 208, le système désactivé se réactive de lui-même au démarrage et à partir d'environ 50 km/h ({{cite:notice-peugeot-208|p. 17}}) ; la notice Seat décrit aussi l'antipatinage désactivé à la main, ou le contrôle de stabilité en mode Sport ({{cite:notice-seat-ibiza|p. 254}}). Si vous ne l'avez pas désactivé, c'est un défaut : {{verdict:esp-defaut}}. La voiture ne corrige plus les dérapages, surtout sur route mouillée ou glissante.

## Voyants ABS et ESP allumés en même temps

C'est un cas prévu par les notices. Selon la notice Seat Ibiza, le contrôle de stabilité fonctionne avec l'ABS : si l'ABS est défaillant, le voyant ESP s'allume aussi ({{cite:notice-seat-ibiza|p. 254}}). Chez Renault et Dacia, les voyants ABS et Service s'allument avec des messages sur l'ABS, le système de freinage (« Système freinage à contrôler ») et l'ESC : l'ABS, le contrôle de stabilité et l'aide au freinage d'urgence sont désactivés, et le freinage est toujours assuré ({{cite:notice-renault-clio-5|p. 212}}, {{cite:notice-dacia-sandero-3|p. 184}}). La consigne est alors celle du voyant ABS : {{verdict:abs}}. Si le voyant de freinage rouge s'y ajoute, c'est celle de l'arrêt.

## Voyants ESP et frein de stationnement allumés ensemble

La notice Peugeot 208 décrit ce cas sur les versions à frein de stationnement électrique : le témoin du contrôle de stabilité et le témoin Service allumés fixes, avec le message « Défaut frein de parking », signalent une anomalie du freinage de secours, qui ne dispose plus de ses performances optimales. Si le desserrage automatique ne fonctionne pas, la notice demande d'utiliser le desserrage manuel, ou de se rendre dans le réseau Peugeot ou dans un atelier qualifié ({{cite:notice-peugeot-208|p. 17 ; renvoi (3) p. 13}}). Ce n'est pas la combinaison du voyant ABS et du voyant de freinage rouge, qui impose l'arrêt. Pour une autre voiture, cherchez « frein de stationnement » dans sa notice.

## Comment éteindre le voyant ABS ?

Le voyant ABS ne s'éteint pas sans corriger la cause : il s'éteint quand le système est réparé. Les notices lues ne décrivent aucune manipulation pour l'éteindre, et effacer le défaut sans le réparer laisserait rouler sans antiblocage sans plus rien qui le signale. Les notices Peugeot et Seat décrivent une désactivation à la main du contrôle de stabilité ou de l'antipatinage, pas de l'ABS.

À la mise du contact, les voyants s'allument quelques secondes puis s'éteignent : c'est le contrôle normal. Selon la notice Seat, ils doivent s'éteindre au bout de 2 secondes environ ({{cite:notice-seat-ibiza|p. 254}}) ; selon la notice Dacia, un voyant ABS qui ne s'éteint pas après la mise sous contact signale une défaillance ({{cite:notice-dacia-sandero-3|p. 112}}).

## Problème d'ABS : d'où vient le défaut ?

Les notices disent que le système est défaillant, sans nommer la pièce. Au contrôle technique, l'ABS est vérifié composant par composant : capteur de vitesse de roue, câblage et autres composants ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 1.6.1}}). Seul le diagnostic au garage dit lequel est en cause sur votre voiture ; le coût probable, en haut de page, dit la nature de la dépense.

## Voyant ABS allumé au contrôle technique

L'annexe I de l'arrêté du 18 juin 1991 classe en défaillance majeure le dispositif d'alerte de l'ABS qui indique un mauvais fonctionnement du système, comme un dispositif d'alerte qui fonctionne mal ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 1.6.1}}). Une défaillance majeure impose une contre-visite dans les deux mois ({{cite:arrete-1991-06-18-controle-technique|article 7}}). Le texte ne nomme pas le contrôle de stabilité. Faire réparer l'ABS avant le rendez-vous évite la contre-visite ; la consigne de l'encadré ne change pas : {{verdict:abs}}.
