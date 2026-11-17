---
# Brouillon, jamais validé. Étape 11 (vague C), lot C4 : page « contre-visite du contrôle technique » (modèle pneus et
# obligations, sujet contrôle technique, format 2). Pas d'empreinte tant que Houssem n'a pas validé son encadré.
# - Sources : arrêté du 18 juin 1991, articles 7 et 8 et annexe I, 5.2.3 (Légifrance relu à l'écran le 17/11/2026 vers
#   13 h 20 ; travaux/etape-11/textes/releve-sources.md, §14) ; définitions des défaillances (article 7) et points de
#   l'annexe I liés aux voyants : relevé de l'étape 8 (Légifrance lu par Houssem le 14/11, travaux/etape-8/textes/
#   controle-technique-releve.md) ; code de la route R323-1 (relu à l'écran le 17/11 vers 1 h 50).
# - Niveaux des lignes : obligation légale, par la demande de changement n° 36 (proposée) : défaillances majeures, contrôle
#   valable deux mois (règle 2) ; défaillances critiques après le jour du contrôle, et délai dépassé (règle 1).
# - Aucun texte relu ne dit comment rejoindre un garage après le jour d'un résultat critique : la page ne l'affirme pas.
# - Illustration : `contre-visite-delais`, dessinée pour cette page (travaux/etape-11/generer-illustrations.py).
id: contre-visite-controle-technique
title: "Contre-visite contrôle technique : délai de deux mois, validité"
h1: "Contrôle technique défavorable : peut-on rouler, et quel délai pour la contre-visite ?"
description: "Défaillance majeure : contrôle valable deux mois, contre-visite dans ce délai. Défaillance critique : valable le seul jour du contrôle. Ce que dit l'arrêté de 1991."
libelle_court: Contre-visite
question_decision: "Contrôle technique défavorable : puis-je encore rouler, et dans quel délai faire la contre-visite ?"
reponse_directe: "Avec des défaillances majeures, oui, pendant deux mois : faites réparer, puis passez la contre-visite dans ce délai. Avec une défaillance critique, le contrôle ne vaut que le jour même. Au-delà de deux mois, c'est un contrôle complet."
situations:
  - situation: "Résultat défavorable pour défaillances majeures (S), sans défaillance critique"
    verdict: oui avec précautions
    urgence: sous quelques semaines
    action: "Vous pouvez rouler pendant deux mois à compter du contrôle : faites réparer les défaillances, puis passez la contre-visite avant la fin de ce délai."
    citations:
      - source: arrete-1991-06-18-controle-technique
        emplacement: "article 7"
        extrait: "un résultat défavorable pour défaillances majeures (S), en l'absence de défaillance critique et lorsqu'il est constaté au moins une défaillance majeure. Dans ce cas, la validité du contrôle est de deux mois à compter de la date du contrôle technique périodique"
        verdict: oui avec précautions
        urgence: sous quelques semaines
  - situation: "Résultat défavorable pour défaillances critiques (R), après le jour du contrôle"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Après le jour du contrôle, la voiture n'a plus de contrôle valable : ne roulez pas avec elle. Faites réparer les défaillances, puis passez la contre-visite dans les deux mois."
    citations:
      - source: arrete-1991-06-18-controle-technique
        emplacement: "article 7"
        extrait: "un résultat défavorable pour défaillances critiques (R) lorsqu'il est constaté au moins une défaillance critique. Dans ce cas, la validité du contrôle est limitée au jour du contrôle."
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Les deux mois sont passés sans contre-visite"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Le contrôle n'est plus valable : ne roulez pas avec la voiture. Il faut repasser un contrôle technique complet, et non plus une contre-visite."
    citations:
      - source: arrete-1991-06-18-controle-technique
        emplacement: "article 7"
        extrait: "Tout résultat défavorable entraîne l'obligation de réalisation d'une contre-visite, qui ne peut être réalisée que dans le délai de deux mois après le contrôle technique périodique tel que défini à l'article 5, faute de quoi un nouveau contrôle technique périodique est à réaliser."
        verdict: non, arrêt dès que possible
        urgence: immédiate
element_unique: tableau
format: 2
sujet: controle-technique
texte_reference:
  nature: legifrance
  reference: "Arrêté du 18 juin 1991 relatif à la mise en place et à l'organisation du contrôle technique des véhicules dont le poids n'excède pas 3,5 tonnes, articles 7 et 8 (versions en vigueur depuis le 20/05/2018 et le 27/03/2022)"
  source: arrete-1991-06-18-controle-technique
defaillances:
  - niveau: mineure
    signification: "Aucune incidence notable sur la sécurité du véhicule ou sur l'environnement : le résultat reste favorable (A) s'il n'y a ni défaillance majeure ni critique"
  - niveau: majeure
    signification: "Susceptible de compromettre la sécurité du véhicule, d'avoir une incidence négative sur l'environnement, ou de mettre en danger les autres usagers de la route : résultat défavorable (S), contrôle valable deux mois"
  - niveau: critique
    signification: "Un danger direct et immédiat pour la sécurité routière ou une incidence grave sur l'environnement : résultat défavorable (R), contrôle valable le seul jour du contrôle"
contre_visite:
  delai: "Deux mois après le contrôle technique périodique"
  demarche: "Faire réparer les défaillances, puis présenter la voiture à la contre-visite, qui contrôle les points définis à l'annexe I ; si elle en trouve encore une majeure ou critique, une nouvelle contre-visite se fait dans le même délai de deux mois. Délai dépassé : nouveau contrôle technique complet (articles 7 et 8)."
illustration:
  fichier: contre-visite-delais
  alt: "Frise du jour du contrôle à deux mois après : avec des défaillances majeures (S), le contrôle reste valable deux mois ; avec une défaillance critique (R), seulement le jour du contrôle. La contre-visite se fait dans les deux mois ; ensuite, c'est un contrôle complet"
  legende: "Le délai de contre-visite court deux mois à partir du jour du contrôle, quel que soit le résultat défavorable. Ce qui change, c'est le temps pendant lequel la voiture garde un contrôle valable."
cout_probable:
  pieces:
    - regonflage
    - pneus
    - plaquettes-et-disques
    - module-d-airbag
    - bloc-abs
  base_de_calcul: "La dépense est la réparation des défaillances que liste le procès-verbal, de la plus légère à la plus lourde. Exemples de points de l'annexe I : un pneu manifestement sous-gonflé (regonflage), des pneus ou des plaquettes usés (entretien), un airbag signalé en défaut (réparation), un ABS signalé en défaut (le bloc ABS, la tranche la plus lourde). Aucun texte relu ne fixe le prix de la contre-visite : la page n'en donne pas."
  sources:
    - arrete-1991-06-18-controle-technique
sources:
  - arrete-1991-06-18-controle-technique
  - code-de-la-route-r323-1
auteur: houssem-jeddou
date_publication: 2026-11-17
date_modification: 2026-11-17
date_revue: 2026-11-17
prochaine_revue: 2027-05-17
---

## Défaillances majeures (S) : combien de temps peut-on rouler ?

{{repere:ligne-1}}

Deux mois à compter du jour du contrôle : {{verdict:ligne-1}}, selon l'encadré. Avec au moins une défaillance majeure et aucune critique, le résultat est défavorable pour défaillances majeures (S), et le contrôle reste valable deux mois ({{cite:arrete-1991-06-18-controle-technique|article 7}}). Faites réparer pendant ce délai, puis passez la contre-visite.

## Défaillance critique (R) : peut-on encore rouler ?

{{repere:ligne-2}}

Le jour du contrôle seulement. Avec au moins une défaillance critique, le résultat est défavorable pour défaillances critiques (R), et la validité du contrôle est limitée au jour du contrôle. Ensuite : {{verdict:ligne-2}}, selon l'encadré.

La contre-visite se fait, elle aussi, dans les deux mois qui suivent le contrôle. Parmi les textes relus, aucun ne dit comment rejoindre un garage après le jour du contrôle : demandez-le au centre de contrôle ou au garage qui fera la réparation.

## Délai de contre-visite dépassé

{{repere:ligne-3}}

La contre-visite ne peut se faire que dans les deux mois qui suivent le contrôle technique. Au-delà, il faut repasser un contrôle technique complet ({{cite:arrete-1991-06-18-controle-technique|article 7}}) : {{verdict:ligne-3}}, selon l'encadré.

Selon l'article 8, un nouveau contrôle complet est aussi exigé si vous ne pouvez présenter ni l'original du procès-verbal du contrôle défavorable, ni ses données informatiques au contrôleur. Si ce nouveau contrôle prescrit une contre-visite, elle se fait dans un nouveau délai de deux mois ({{cite:arrete-1991-06-18-controle-technique|article 8}}).

## Défaillance mineure, majeure ou critique : quelle différence ?

L'annexe I de l'arrêté classe chaque défaut en défaillance mineure, majeure ou critique. Une défaillance mineure n'a aucune incidence notable sur la sécurité ou sur l'environnement ; une défaillance majeure peut compromettre la sécurité du véhicule, nuire à l'environnement ou mettre en danger les autres usagers ; une défaillance critique est un danger direct et immédiat pour la sécurité routière, ou a une incidence grave sur l'environnement ({{cite:arrete-1991-06-18-controle-technique|article 7}}).

Sans défaillance majeure ni critique, le résultat est favorable (A), même avec des défaillances mineures : il n'y a pas de contre-visite.

## Contre-visite refusée : peut-on en faire plusieurs ?

Oui, dans la limite des deux mois. Si la contre-visite trouve encore une défaillance majeure ou critique sur les points contrôlés, une nouvelle contre-visite est à réaliser dans la limite du délai de deux mois à compter du contrôle technique ({{cite:arrete-1991-06-18-controle-technique|article 8}}).

## Que contrôle la contre-visite, et où la faire ?

Les points à contrôler lors d'une contre-visite sont définis à l'annexe I de l'arrêté. Elle peut se faire dans un autre centre que celui du contrôle : une copie du contrôle défavorable est alors archivée avec le procès-verbal ({{cite:arrete-1991-06-18-controle-technique|article 8}}). Pour la contre-visite, les opérations de contrôle sont réalisées par un seul contrôleur ({{cite:arrete-1991-06-18-controle-technique|article 5}}).

## Rouler sans contrôle technique valable

Le code de la route en fait une contravention de la quatrième classe, et l'immobilisation peut être prescrite ({{cite:code-de-la-route-r323-1|article R323-1}}). La page ne donne pas de montant : aucun texte relu ne le fixe pour ce cas.

## Voyants allumés et pneus au contrôle technique

Certains voyants allumés sont des défaillances au contrôle technique : voyez les pages [voyant moteur](/voyants/moteur/), [voyant airbag](/voyants/airbag/) et [voyant ABS et ESP](/voyants/abs-esp/). Des pneus usés jusqu'à l'indicateur d'usure sont une défaillance majeure, une profondeur non conforme, une défaillance critique : voyez la page [usure des pneus](/usure-des-pneus/).

## Résultat du contrôle : ce que vous pouvez faire

{{tableau}}

| Résultat | Validité du contrôle | Contre-visite | Ce que vous pouvez faire |
|---|---|---|---|
| Favorable (A) : ni défaillance majeure ni critique | Pas de limite fixée par l'article 7 | Aucune | Rouler |
| Défavorable pour défaillances majeures (S) | Deux mois à compter du contrôle | Dans les deux mois | Rouler deux mois, le temps de faire réparer, puis passer la contre-visite |
| Défavorable pour défaillances critiques (R) | Le jour du contrôle | Dans les deux mois | Ne plus rouler après ce jour ; faire réparer, puis passer la contre-visite |
| Contre-visite avec encore une défaillance majeure ou critique | Inchangée | Nouvelle contre-visite dans les deux mois du contrôle | Faire réparer de nouveau |
| Deux mois passés sans contre-visite | Plus de contrôle valable | Plus possible | Ne plus rouler ; repasser un contrôle complet |

Le tableau résume les articles 7 et 8 de l'arrêté du 18 juin 1991 ({{cite:arrete-1991-06-18-controle-technique|articles 7 et 8}}).
