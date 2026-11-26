---
# Validé par Houssem le 17/11/2026 à 15 h 05 (heure de Tunis). Étape 11 (vague C), lot C4 : page « contre-visite du contrôle technique » (modèle pneus et
# obligations, sujet contrôle technique, format 2). Empreinte posée après la validation.
# - Sources : arrêté du 18 juin 1991, articles 7 et 8 et annexe I, 5.2.3 (Légifrance relu à l'écran le 17/11/2026 vers
#   13 h 15 ; travaux/etape-11/textes/releve-sources.md, §14) et « C. Fonctions contrôlées » (vers 14 h 40, §16) ;
#   définitions des défaillances (article 7) et points de l'annexe I liés aux voyants : relevé de l'étape 8 (Légifrance lu
#   par Houssem le 14/11, travaux/etape-8/textes/controle-technique-releve.md) ; code de la route R323-1 (relu en entier
#   vers 13 h 50, §15).
# - Niveaux des lignes : demande de changement n° 36 (proposée), réécrite après la revue indépendante du lot C4 : règle 1
#   (gravité de l'article 7 : majeure → Non, ne poursuivez pas votre trajet ; critique → Non, arrêtez-vous
#   immédiatement), règle 2 (un délai légal n'est pas une autorisation de rouler), règle 3 (plus de contrôle valable :
#   R323-1).
# - Aucun texte relu ne dit comment rejoindre un garage après un résultat défavorable : la page ne l'affirme pas.
# - Le bloc « Dépannage sur autoroute » s'affiche selon la demande de changement n° 10 (pages à verdict d'arrêt) : inchangé.
# - Illustration : `contre-visite-delais`, dessinée pour cette page (travaux/etape-11/generer-illustrations.py).
id: contre-visite-controle-technique
title: "Contre-visite contrôle technique : délai de deux mois, validité"
h1: "Contrôle technique défavorable : peut-on rouler, et quel délai pour la contre-visite ?"
description: "Défaillance majeure ou critique : faites réparer avant de rouler. La contre-visite se passe dans les deux mois ; ce délai n'autorise pas à rouler."
libelle_court: Contre-visite
question_decision: "Contrôle technique défavorable : puis-je encore rouler, et dans quel délai faire la contre-visite ?"
reponse_directe: "La loi laisse deux mois pour réparer et repasser si les défaillances sont majeures (S), et ne valide le contrôle que le jour même si l'une est critique (R). Ce délai n'est pas une autorisation de rouler avec le défaut."
situations:
  - situation: "Résultat défavorable pour défaillances majeures (S), sans défaillance critique"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Ne poursuivez pas votre trajet avec ces défaillances : faites-les réparer, puis passez la contre-visite dans les deux mois qui suivent le contrôle."
    citations:
      - source: arrete-1991-06-18-controle-technique
        emplacement: "article 7, définition des défaillances majeures"
        extrait: "susceptibles de compromettre la sécurité du véhicule, d'avoir une incidence négative sur l'environnement, ou de mettre en danger les autres usagers de la route"
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: arrete-1991-06-18-controle-technique
        emplacement: "article 7, résultats du contrôle"
        extrait: "un résultat défavorable pour défaillances majeures (S), en l'absence de défaillance critique et lorsqu'il est constaté au moins une défaillance majeure. Dans ce cas, la validité du contrôle est de deux mois à compter de la date du contrôle technique périodique"
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Résultat défavorable pour défaillances critiques (R)"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Ne roulez pas avec ces défaillances : faites appel à un garage ou à l'assistance pour les faire réparer, puis passez la contre-visite dans les deux mois qui suivent le contrôle."
    citations:
      - source: arrete-1991-06-18-controle-technique
        emplacement: "article 7, définition des défaillances critiques"
        extrait: "un danger direct et immédiat pour la sécurité routière ou ayant une incidence grave sur l'environnement"
        verdict: non, arrêt immédiat
        urgence: immédiate
      - source: arrete-1991-06-18-controle-technique
        emplacement: "article 7, résultats du contrôle"
        extrait: "un résultat défavorable pour défaillances critiques (R) lorsqu'il est constaté au moins une défaillance critique. Dans ce cas, la validité du contrôle est limitée au jour du contrôle."
        verdict: non, arrêt immédiat
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
      - source: code-de-la-route-r323-1
        emplacement: "article R323-1"
        extrait: "Tout propriétaire d'un véhicule mentionné au présent chapitre n'est autorisé à le mettre ou le maintenir en circulation qu'après un contrôle technique ayant vérifié qu'il est en bon état de marche et en état satisfaisant d'entretien."
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
    signification: "Susceptible de compromettre la sécurité du véhicule, d'avoir une incidence négative sur l'environnement, ou de mettre en danger les autres usagers de la route : résultat défavorable (S) ; deux mois pour réparer et passer la contre-visite"
  - niveau: critique
    signification: "Un danger direct et immédiat pour la sécurité routière ou une incidence grave sur l'environnement : résultat défavorable (R) ; le contrôle ne vaut que le jour même"
contre_visite:
  delai: "Deux mois après le contrôle technique périodique"
  demarche: "Faire réparer les défaillances, puis présenter la voiture à la contre-visite, qui contrôle les points définis à l'annexe I ; si elle en trouve encore une majeure ou critique, une nouvelle contre-visite se fait dans le même délai de deux mois. Délai dépassé : nouveau contrôle technique complet (articles 7 et 8). Ce délai sert à réparer et repasser : il n'autorise pas à rouler avec le défaut."
illustration:
  fichier: contre-visite-delais
  alt: "Frise du jour du contrôle à deux mois après : avec des défaillances majeures (S), deux mois pour réparer et passer la contre-visite ; avec une défaillance critique (R), le contrôle ne vaut que le jour même. Après deux mois, c'est un contrôle complet"
  legende: "Le délai de contre-visite court deux mois à partir du jour du contrôle, quel que soit le résultat défavorable. Ce délai sert à réparer et repasser : il n'autorise pas à rouler avec le défaut."
cout_probable:
  pieces:
    - pneus
    - plaquettes-et-disques
    - module-d-airbag
    - bloc-abs
  base_de_calcul: "La dépense est la réparation des défaillances que liste le procès-verbal, de la plus légère à la plus lourde. Exemples de défaillances majeures de l'annexe I : des pneus usés jusqu'à l'indicateur d'usure ou des plaquettes usées jusqu'à la marque minimale (entretien), un airbag signalé en défaut (réparation), un ABS signalé en défaut (le bloc ABS, la tranche la plus lourde). Aucun texte relu ne fixe le prix de la contre-visite : la page n'en donne pas."
  sources:
    - arrete-1991-06-18-controle-technique
sources:
  - arrete-1991-06-18-controle-technique
  - code-de-la-route-r323-1
auteur: houssem-jeddou
date_publication: 2026-11-17
date_modification: 2026-11-21
date_revue: 2026-11-17
prochaine_revue: 2027-05-17
# Encadré de décision (question, réponse directe, lignes, coût probable) validé par Houssem le 17/11/2026 à 15 h 05
# (heure de Tunis), avec les faits du texte (lot C4, travaux/etape-11/lot-c4/paquet-contre-visite-controle-technique.md).
validation: 70cef562289e036bcb503b4c70fb171fb175ecf315603146a3c5a92c914a94ac
---

## Défaillances majeures (S) : peut-on rouler pendant les deux mois ?

{{repere:ligne-1}}

{{verdict:ligne-1}}, selon l'encadré. Avec au moins une défaillance majeure et aucune critique, le résultat est défavorable pour défaillances majeures (S), et le contrôle reste valable deux mois ({{cite:arrete-1991-06-18-controle-technique|article 7}}). Ces deux mois servent à faire réparer, puis à passer la contre-visite : ils ne sont pas une autorisation de rouler avec le défaut.

L'arrêté définit une défaillance majeure comme susceptible de compromettre la sécurité du véhicule, d'avoir une incidence négative sur l'environnement, ou de mettre en danger les autres usagers de la route. Si un voyant ou la notice de votre voiture donne une consigne pour ce défaut, elle s'applique aussi, si elle est plus prudente.

## Défaillance critique (R) : peut-on encore rouler ?

{{repere:ligne-2}}

{{verdict:ligne-2}}, selon l'encadré. Une défaillance critique est un danger direct et immédiat pour la sécurité routière, selon l'arrêté. Avec au moins une défaillance critique, le résultat est défavorable pour défaillances critiques (R), et la validité du contrôle est limitée au jour du contrôle ({{cite:arrete-1991-06-18-controle-technique|article 7}}).

La contre-visite se fait, elle aussi, dans les deux mois qui suivent le contrôle. Parmi les textes relus, aucun ne dit comment rejoindre un garage : demandez-le au centre de contrôle ou au garage qui fera la réparation.

## Délai de contre-visite dépassé

{{repere:ligne-3}}

{{verdict:ligne-3}}, selon l'encadré. La contre-visite ne peut se faire que dans les deux mois qui suivent le contrôle technique ; au-delà, il faut repasser un contrôle technique complet ({{cite:arrete-1991-06-18-controle-technique|article 7}}).

Selon l'article 8, un nouveau contrôle complet est aussi exigé lorsque l'original du procès-verbal du contrôle défavorable ne peut être présenté au contrôleur et que ses données informatiques ne peuvent pas être consultées. Si ce nouveau contrôle prescrit une contre-visite, elle se fait dans un nouveau délai de deux mois ({{cite:arrete-1991-06-18-controle-technique|article 8}}).

## Défaillance mineure, majeure ou critique : quelle différence ?

L'annexe I de l'arrêté classe chaque défaut en défaillance mineure, majeure ou critique. Une défaillance mineure n'a aucune incidence notable sur la sécurité ou sur l'environnement ; une défaillance majeure peut compromettre la sécurité du véhicule, nuire à l'environnement ou mettre en danger les autres usagers ; une défaillance critique est un danger direct et immédiat pour la sécurité routière, ou a une incidence grave sur l'environnement ({{cite:arrete-1991-06-18-controle-technique|article 7}}).

Sans défaillance majeure ni critique, le résultat est favorable (A), même avec des défaillances mineures : il n'y a pas de contre-visite.

## Contre-visite refusée : peut-on en faire plusieurs ?

Oui, dans la limite des deux mois. Si la contre-visite trouve encore une défaillance majeure ou critique sur les points contrôlés, une nouvelle contre-visite est à réaliser dans la limite du délai de deux mois à compter du contrôle technique ({{cite:arrete-1991-06-18-controle-technique|article 8}}).

La contre-visite donne elle aussi un résultat : avec encore une défaillance majeure, la validité reste celle de deux mois à compter du contrôle périodique ; avec une défaillance critique, le résultat est R, et la validité est limitée au jour de la contre-visite ({{cite:arrete-1991-06-18-controle-technique|article 7}}).

## Que contrôle la contre-visite, et où la faire ?

Les points à contrôler lors d'une contre-visite sont définis à l'annexe I de l'arrêté. Elle peut se faire dans un autre centre que celui du contrôle : une copie du contrôle défavorable est alors archivée avec le procès-verbal ({{cite:arrete-1991-06-18-controle-technique|article 8}}). Pour la contre-visite, les opérations de contrôle sont réalisées par un seul contrôleur ({{cite:arrete-1991-06-18-controle-technique|article 5}}).

## Les points de contrôle

Au contrôle technique d'une voiture, le contrôleur vérifie les points de contrôle de l'annexe I pour neuf fonctions ; des fonctions s'y ajoutent pour certains véhicules (dépannage, transport sanitaire, auto-école, taxis et VTC) ({{cite:arrete-1991-06-18-controle-technique|annexe I, C}}).

| Fonction | Exemples de points, déjà relus |
|---|---|
| 0. Identification du véhicule | |
| 1. Équipements de freinage | Plaquettes usées jusqu'à la marque minimale : défaillance majeure (1.1.13) ; témoin de l'ABS qui signale un mauvais fonctionnement : majeure (1.6.1) |
| 2. Direction | Témoin de la direction assistée électronique qui signale une défaillance : majeure (2.6.1) |
| 3. Visibilité | |
| 4. Feux, dispositifs réfléchissants et équipements électriques | |
| 5. Essieux, roues, pneus, suspension | Indicateur d'usure atteint : majeure ; profondeur non conforme : critique ; corde visible : critique (5.2.3) |
| 6. Châssis et accessoires du châssis | |
| 7. Autre matériel | Airbag signalé en défaut : majeure (7.1.5, 7.1.6) ; capteur, câblage ou autre composant du contrôle électronique de stabilité (ESP) manquant ou endommagé : majeure (7.12.1) |
| 8. Nuisances | Défaut signalé par le diagnostic embarqué (OBD) : majeure (8.2.12, 8.2.22) |

Certains de ces points sont des voyants : voyez les pages [voyant moteur](/voyants/moteur/), [voyant airbag](/voyants/airbag/) et [voyant ABS et ESP](/voyants/abs-esp/). Pour les pneus, voyez la page [usure des pneus](/usure-des-pneus/).

## Rouler sans contrôle technique valable

Le propriétaire n'est autorisé à mettre ou maintenir sa voiture en circulation qu'après un contrôle technique qui a vérifié son bon état de marche et d'entretien. Le faire sans avoir satisfait aux obligations de contrôle technique est puni de l'amende prévue pour les contraventions de la quatrième classe, et l'immobilisation peut être prescrite ({{cite:code-de-la-route-r323-1|article R323-1}}).

Si la voiture n'est pas présentée aux contrôles obligatoires, ou si les réparations prescrites ne sont pas faites, la mise en fourrière peut aussi être prescrite. La page ne donne pas de montant : aucun texte relu ne le fixe pour ce cas.

## Résultat du contrôle : ce que vous pouvez faire

{{tableau}}

| Résultat | Validité du contrôle | Contre-visite | Ce que vous pouvez faire |
|---|---|---|---|
| Favorable (A) : ni défaillance majeure ni critique | Sans délai de contre-visite | Aucune | Rouler |
| Défavorable pour défaillances majeures (S) | Deux mois à compter du contrôle | Dans les deux mois | Faire réparer avant de reprendre la route, puis passer la contre-visite |
| Défavorable pour défaillances critiques (R) | Le jour du contrôle | Dans les deux mois | Ne pas rouler ; faire réparer, puis passer la contre-visite |
| Contre-visite avec encore une défaillance majeure | Inchangée : deux mois à compter du contrôle périodique | Nouvelle contre-visite dans ces deux mois | Faire réparer de nouveau avant de reprendre la route |
| Contre-visite avec une défaillance critique | Résultat R : le jour de la contre-visite | Nouvelle contre-visite dans les deux mois du contrôle périodique | Ne pas rouler ; faire réparer de nouveau |
| Deux mois passés sans contre-visite | Plus de contrôle valable | Plus possible | Ne plus rouler ; repasser un contrôle complet |

Le tableau résume les articles 7 et 8 de l'arrêté du 18 juin 1991 ({{cite:arrete-1991-06-18-controle-technique|articles 7 et 8}}).
