---
# Page de la vague B, étape 10, lot B3 (rédaction ouverte par la validation de la porte 10 le 16/11/2026, 19 h 26).
# Validée par Houssem le 17/11/2026 à 7 h 39 (« Je valide tout ! Fais le necessaire », sur la ligne de validation de
# travaux/etape-10/paquet-lot-b3-fin.md) ; empreinte posée et passage de exemples/ à src/content par la pull request
# du lot B3 (règle de passage).
# - Extraits relus mot pour mot : Peugeot p. 15 et p. 13 (relevé de l'étape 5, notices-etape-5/peugeot-208.txt),
#   Citroën p. 113-115, Seat p. 290, Peugeot p. 168, Dacia p. 162, Renault p. 188 (autres-pannes-verification.md),
#   Renault p. 186 et Dacia p. 160 (relevés de l'étape 5), Dacia p. 161 (travaux/etape-8/textes/pneus-fap-releve.md).
#   Lignes `fap`, `moteur-orange-fixe` et `moteur-rouge` reprises de la base (comme la page du voyant FAP).
# - Corrigée le 16/11/2026 après la revue indépendante (travaux/etape-10/paquet-lot-b3-fin.md, encadré « Revue indépendante »).
# - Consigne du brief : les nettoyages proposés en ligne (sans démontage, hydrogène, karcher) n'ont aucune source
#   admise ; la page le dit, sans les décrire ni les recommander.
# - Illustration dessinée pour le site : fap-regeneration (travaux/etape-10/generer-illustrations-b3.py).
id: nettoyer-fap
title: "Nettoyer FAP : régénérer le filtre à particules en roulant"
h1: "Nettoyer le filtre à particules (FAP) : que faire soi-même ?"
description: "Nettoyer un FAP soi-même ? Les notices ne décrivent qu'une méthode : la régénération en roulant. Vitesse, durée, additif, et que faire si le voyant persiste."
libelle_court: Nettoyer le FAP
question_decision: "Puis-je nettoyer moi-même le filtre à particules, et comment ?"
situations:
  - voyant: fap
  - voyant: moteur-orange-fixe
  - voyant: moteur-rouge
  - situation: "Niveau d'additif du filtre à particules au minimum : message avec le témoin (Peugeot), ou témoin du filtre qui reste affiché (Citroën)"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites faire l'appoint d'additif par le réseau de la marque ou par un atelier qualifié."
    ecart_marques: "La notice Citroën C3 demande l'appoint impérativement et rapidement ; la notice Peugeot 208, rapidement."
    ecart_court: "Plus strict : Citroën (appoint impératif et rapide). Moins strict : Peugeot (appoint rapide)."
    citations:
      - source: notice-citroen-c3
        emplacement: "p. 113-114, additif du filtre à particules"
        extrait: "La mise à niveau de cet additif doit impérativement et rapidement être effectuée par le réseau CITROËN ou par un atelier qualifié."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-peugeot-208
        emplacement: "p. 15, « Filtre à particules (Diesel) » ; renvoi (3) de la p. 13"
        extrait: "Fixe, accompagné d'un signal sonore et d'un message signalant le niveau insuffisant de l'additif du filtre à particules. Le niveau minimum du réservoir d'additif est atteint. Faire rapidement réaliser l'appoint : effectuer (3). […] (3) : Se rendre dans le réseau PEUGEOT ou dans un atelier qualifié."
        verdict: oui avec précautions
        urgence: sous quelques jours
voyants:
  - fap
  - moteur-orange-fixe
  - moteur-rouge
element_unique: tableau
format: 2
illustration:
  fichier: fap-regeneration
  alt: "Un compteur de vitesse sans chiffres : pour régénérer le filtre, on roule à allure soutenue et régulière, à la vitesse ou au régime que donne sa notice, jusqu'à l'extinction du voyant"
  legende: "La régénération décrite par les notices : rouler à allure soutenue et régulière, à la vitesse ou au régime que donne la notice de votre voiture (tableau plus bas), dans le respect des limitations, jusqu'à ce que le voyant du filtre s'éteigne."
symptome: "Le voyant du filtre à particules s'allume, ou un message signale un risque de colmatage du filtre."
tutoriel:
  outils:
    - une voie rapide où rouler à allure régulière
  duree: "Jusqu'à l'extinction du voyant : 10 à 20 minutes environ selon les notices Renault et Dacia (Diesel) ; la notice Seat Ibiza demande d'aller à l'atelier s'il reste allumé après 30 minutes"
  difficulte: facile
  quand_ne_pas_le_faire_soi_meme: "Si le voyant moteur s'allume aussi : suivez la consigne de sa ligne dans l'encadré, en tête de page. Si le voyant du filtre reste allumé après la régénération, si le voyant Service s'y ajoute, ou si l'additif est au minimum : faites intervenir un garage."
carburant: essence et diesel
contexte:
  - après des trajets toujours courts
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des notices lues : leurs rubriques sur le filtre à particules et son additif."
  sources:
    - notice-peugeot-208
    - notice-citroen-c3
    - notice-seat-ibiza
sources:
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-seat-ibiza
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-16
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
validation: d967a22031e5912aba31c2c733980a407ad4b818df04bd6adf7de8e6d7e4a619
causes:
  - cause: Filtre qui commence à se saturer
    explication: "C'est ce que signale le voyant du filtre à particules : selon les notices lues, la régénération en roulant l'éteint. La notice Seat Ibiza conseille d'éviter les trajets toujours courts, qui réduisent la durée de vie du filtre."
    pieces:
      - regeneration-fap
  - cause: Additif du filtre à particules au minimum
    explication: "Les notices Peugeot 208 et Citroën C3 décrivent, sur leurs versions Diesel, un réservoir d'additif du filtre à particules : quand son niveau est au minimum, elles demandent d'en faire faire l'appoint par le réseau ou un atelier qualifié."
    pieces:
      - appoint-additif-fap
  - cause: Filtre que la régénération ne suffit plus à nettoyer
    explication: "Si le voyant reste allumé après 30 minutes de régénération, la notice Seat Ibiza demande de faire réparer le défaut par un atelier spécialisé. Aucune notice lue ne nomme la pièce en cause : la tranche retenue est celle du filtre à remplacer, la plus lourde."
    pieces:
      - filtre-a-particules
---

## Nettoyer le FAP soi-même : ce que décrivent les notices

Les notices lues décrivent une seule façon de nettoyer le filtre à particules soi-même : la régénération en roulant. À allure soutenue, la température monte dans le filtre et brûle la suie qui s'y accumule ; le voyant s'éteint quand c'est fait. Aucune ne décrit de nettoyage avec ou sans démontage, ni de produit à verser pour le nettoyer.

## Régénérer le filtre en roulant, étape par étape

{{repere:fap}}

Ces étapes suivent les notices lues ; la vitesse ou le régime à tenir change selon la marque, et le tableau plus bas les donne.

{{etapes}}

1. Attendez que la circulation le permette : une voie rapide où vous pourrez rouler à allure régulière, dans le respect des limitations.
2. Roulez à la vitesse ou au régime que donne la notice de votre voiture, sans couper le moteur.
3. Continuez jusqu'à l'extinction du voyant du filtre à particules.
4. S'il reste allumé après le temps que donne votre notice (30 minutes chez Seat ; 10 à 20 minutes environ chez Renault et Dacia, en Diesel), ou si le voyant Service s'y ajoute, faites contrôler la voiture au garage, comme le demande la ligne du voyant FAP : {{verdict:fap}}.
5. Si le voyant moteur s'allume, c'est sa consigne, plus prudente, qui compte : {{verdict:moteur-orange-fixe}} pour le voyant moteur orange fixe ; {{verdict:moteur-rouge}} pour le voyant moteur rouge, ou le témoin STOP avec le message « Risque casse moteur ».

Pendant la régénération, du bruit, des odeurs et un ralenti plus élevé peuvent se produire, selon la notice {{notice:notice-seat-ibiza}} ({{cite:notice-seat-ibiza|p. 290}}). Sur une voiture neuve, les notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}} jugent normale une odeur de brûlé lors des premières régénérations ({{cite:notice-peugeot-208|p. 168}} ; {{cite:notice-citroen-c3|p. 115}}).

## Vitesse et durée selon la notice

{{tableau}}

| Notice | Vitesse ou régime | Jusqu'à quand |
|---|---|---|
| Peugeot 208, Citroën C3 (Diesel) | Au moins 60 km/h | Extinction du voyant |
| Renault Clio 5, Dacia Sandero 3 (Diesel) | Régime de préférence au-dessus de 2 000 tours par minute | Extinction du voyant, au bout de 10 à 20 minutes environ |
| Renault Clio 5, Dacia Sandero 3 (essence) | Environ 50 à 110 km/h | Extinction du voyant, au bout de 5 à 20 minutes environ selon Dacia |
| Seat Ibiza | Entre 50 et 120 km/h | Extinction du voyant ; à l'atelier s'il reste allumé après 30 minutes |

Le tableau résume les notices lues ({{cite:notice-peugeot-208|p. 14-15}} ; {{cite:notice-citroen-c3|p. 114-115}} ; {{cite:notice-renault-clio-5|p. 186 et 188}} ; {{cite:notice-dacia-sandero-3|p. 160 et 162}} ; {{cite:notice-seat-ibiza|p. 288-290}}). La page du [voyant FAP](/voyants/fap/) cite, dans son tableau des notices, la consigne exacte de chaque marque pour le voyant.

## Additif du filtre à particules : un appoint au garage

{{repere:ligne-4}}

La notice {{notice:notice-peugeot-208}} décrit, en Diesel, un réservoir d'additif du filtre à particules : quand son niveau minimum est atteint, un message s'affiche avec le témoin, et elle demande de faire réaliser l'appoint rapidement dans le réseau ou un atelier qualifié ({{cite:notice-peugeot-208|p. 15}}). La notice {{notice:notice-citroen-c3}} demande cette mise à niveau impérativement et rapidement ; chez elle, un témoin du filtre qui reste affiché signale un manque d'additif ({{cite:notice-citroen-c3|p. 113-115}}). Dans ce cas, le geste à faire est l'appoint, pas la régénération.

## Nettoyage sans démontage, hydrogène, karcher ?

Aucune des notices lues ne décrit ces nettoyages, ni d'autre nettoyage à faire soi-même que la régénération en roulant. Aucune autre source admise par le site ne les décrit non plus : ils ne sont donc ni décrits ni recommandés ici. Si la régénération ne suffit pas, c'est au garage de trouver la cause.

## Éviter que le filtre se bouche

La notice Seat Ibiza conseille d'utiliser toujours la bonne huile moteur et le bon carburant, et d'éviter les trajets toujours courts, pour ne pas réduire la durée de vie du filtre ({{cite:notice-seat-ibiza|p. 290}}). En Diesel, la notice {{notice:notice-dacia-sandero-3}} conseille, pour faciliter la régénération, un long trajet de plus de 20 minutes environ sur des axes routiers tous les 200 km ({{cite:notice-dacia-sandero-3|p. 161}}).
