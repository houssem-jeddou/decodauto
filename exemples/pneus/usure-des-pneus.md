---
# Brouillon, jamais validé. Étape 11 (vague C), lot C4 : page « usure des pneus » (modèle pneus et obligations, format 2).
# Pas d'empreinte tant que Houssem n'a pas validé son encadré (paquet du lot C4).
# - Sources : notices relues à l'écran le 17/11/2026 vers 14 h 20 (travaux/etape-11/textes/releve-sources.md, §13) :
#   Peugeot 208 p. 169, Citroën C3 p. 115, Renault Clio 5 phase 2 p. 346, Dacia Sandero 3 p. 307, Seat Ibiza p. 304-306 et
#   308 ; Toyota Yaris non lue. Légifrance relu à l'écran le 17/11 : arrêté du 18 juillet 2019, article 5, et code de la
#   route R314-1 (vers 1 h 50) ; annexe I de l'arrêté du 18 juin 1991, 5.2.3 d et e, et article 7 (vers 13 h 20, §14).
# - Décisions du pilotage (règle 6, 17/11) : pneus usés, les cinq notices classées par la grille, niveau de l'obligation
#   légale par la demande de changement n° 36 (proposée) ; pneu endommagé et vibrations : Seat seule, au niveau de sa
#   citation ; « 6 ans » : seulement comme consigne Seat, jamais comme règle générale.
# - Illustration : `usure-pneu-temoin`, dessinée pour cette page (travaux/etape-11/generer-illustrations.py).
id: usure-des-pneus
title: "Pneu usé : témoin d'usure, 1,6 mm et quand changer ses pneus"
h1: "Pneus usés : peut-on encore rouler, et comment lire le témoin d'usure ?"
description: "Un pneu est usé quand ses témoins d'usure affleurent : il reste 1,6 mm, le minimum légal. Ne repartez pas sans le changer. Ce que disent la loi et cinq notices."
libelle_court: Usure des pneus
question_decision: "Puis-je rouler avec des pneus usés, et comment savoir s'ils le sont ?"
reponse_directe: "Regardez les témoins d'usure au fond des rainures : s'ils affleurent la bande de roulement, il reste 1,6 mm ou moins, le minimum légal. Ne poursuivez pas votre trajet avec ces pneus : faites-les remplacer."
situations:
  - situation: "Les témoins d'usure affleurent la bande de roulement : les rainures n'ont plus que 1,6 mm ou moins"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Ne poursuivez pas votre trajet avec ces pneus : faites-les remplacer avant de reprendre la route, au moins les deux d'un même essieu."
    ecart_marques: "L'arrêté du 18 juillet 2019 exige au moins 1,6 mm pendant toute l'utilisation sur route, et la notice Seat Ibiza annonce un risque d'accident ; les notices Peugeot 208 et Citroën C3 demandent de remplacer impérativement les pneus, les notices Renault Clio 5 et Dacia Sandero 3 de les remplacer, sans délai écrit."
    ecart_court: "Plus stricts : la loi (1,6 mm au moins) et Seat. Moins stricts : Peugeot, Citroën (remplacer impérativement), Renault et Dacia (remplacer)."
    citations:
      - source: arrete-2019-07-18-pneumatiques
        emplacement: "article 5"
        extrait: "dans les rainures principales de leur bande de roulement, une profondeur d'au moins 1,6 mm."
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-seat-ibiza
        emplacement: "p. 308, « Indicateurs d'usure », AVERTISSEMENT"
        extrait: "Les pneus doivent être changés au plus tard lorsque les indicateurs d'usure sont usés. […] il existe des risques d'accident !"
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-peugeot-208
        emplacement: "p. 169, « Roues et pneumatiques »"
        extrait: "Lorsque les témoins d'usure n'apparaissent plus en retrait de la bande de roulement, la profondeur des rainures est inférieure à 1,6 mm ; remplacer impérativement les pneumatiques."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-citroen-c3
        emplacement: "p. 115, « Roues et pneumatiques »"
        extrait: "Lorsque les témoins d'usure n'apparaissent plus en retrait de la bande de roulement, la profondeur des rainures est inférieure à 1,6 mm ; il est impératif de remplacer les pneumatiques."
        verdict: oui avec précautions
        urgence: immédiate
      - source: notice-renault-clio-5
        emplacement: "p. 346, « Pneumatiques »"
        extrait: "Lorsque le relief des sculptures a été érodé jusqu'au niveau des bossages-témoins, ceux-ci deviennent visibles : il est alors nécessaire de remplacer vos pneumatiques car la profondeur des sculptures n'est, au plus, que de 1,6 mm et ceci entraîne une mauvaise adhérence sur les routes mouillées."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-dacia-sandero-3
        emplacement: "p. 307, « Pneumatiques »"
        extrait: "Lorsque le relief des sculptures a été érodé jusqu'au niveau des bossages témoins, ceux-ci deviennent visibles : il est alors nécessaire de remplacer vos pneumatiques car la profondeur des sculptures n'est, au plus, que de 1,6 mm et ceci entraîne une mauvaise adhérence sur les routes mouillées."
        verdict: oui avec précautions
        urgence: sous quelques jours
  - situation: "Un pneu est endommagé : trou, entaille, déchirure ou boursouflure"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Arrêtez-vous dès que vous pouvez le faire sans danger : ne roulez pas avec un pneu endommagé. Faites appel à l'assistance ou à un garage, et faites remplacer le pneu."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 305, « Pneus », AVERTISSEMENT"
        extrait: "Ne roulez jamais avec des pneus endommagés. Risque d'accident !"
        verdict: non, arrêt immédiat
        urgence: immédiate
  - situation: "En roulant, vous sentez des vibrations inhabituelles, ou la direction tire d'un côté"
    verdict: non, arrêt immédiat
    urgence: immédiate
    action: "Arrêtez-vous dès que vous pouvez le faire sans danger et vérifiez l'état des pneus. Si l'un d'eux est endommagé, ne repartez pas avec."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 305, « Pneus », AVERTISSEMENT"
        extrait: "Si, en cours de route, vous constatez des vibrations inhabituelles ou un tirage latéral de la direction, arrêtez-vous immédiatement et vérifiez l'état des pneus."
        verdict: non, arrêt immédiat
        urgence: immédiate
  - situation: "Après un choc contre un trottoir ou un obstacle"
    verdict: oui avec précautions
    urgence: sous quelques jours
    action: "Vous pouvez rouler si les pneus ne sont pas endommagés. Faites vérifier les pneus, les jantes et les trains roulants par le réseau de la marque ou un garage dans les jours qui viennent."
    citations:
      - source: notice-renault-clio-5
        emplacement: "p. 346, « Pneumatiques »"
        extrait: "Des incidents de conduite, tels que \"coups de trottoir\", risquent d'endommager les pneumatiques et les jantes, ainsi que d'entraîner des déréglages du train avant ou arrière. Dans ce cas, faites vérifier leur état par un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
      - source: notice-dacia-sandero-3
        emplacement: "p. 307, « Pneumatiques »"
        extrait: "Des incidents de conduite, tels que \"coups de trottoir\", risquent d'endommager les pneumatiques et les jantes, ainsi que d'entraîner des déréglages du train avant ou arrière. Dans ce cas, faites vérifier leur état par un Représentant de la marque."
        verdict: oui avec précautions
        urgence: sous quelques jours
element_unique: tableau
format: 2
sujet: usure
texte_reference:
  nature: legifrance
  reference: "Arrêté du 18 juillet 2019 relatif aux pneumatiques, article 5 (version en vigueur depuis le 31/08/2019)"
  source: arrete-2019-07-18-pneumatiques
defaillances:
  - niveau: mineure
    signification: "Usure anormale ou présence d'un corps étranger (point 5.2.3.e.1)"
  - niveau: majeure
    signification: "L'indicateur d'usure de la profondeur des sculptures est atteint (point 5.2.3.e.2) ; pneumatique gravement endommagé, entaillé ou montage inadapté (point 5.2.3.d.2)"
  - niveau: critique
    signification: "La profondeur des sculptures n'est pas conforme aux exigences (point 5.2.3.e.3) ; corde visible ou endommagée (point 5.2.3.d.3)"
contre_visite:
  delai: "Deux mois après le contrôle technique"
  demarche: "Une défaillance majeure laisse le contrôle valable deux mois ; une défaillance critique, le seul jour du contrôle. Dans les deux cas, la contre-visite se fait dans les deux mois, faute de quoi un nouveau contrôle complet est à refaire (article 7)."
illustration:
  fichier: usure-pneu-temoin
  alt: "Coupe de la bande de roulement : neuve, le témoin d'usure est en retrait au fond de la rainure ; usée, la bande arrive au niveau du témoin, il reste 1,6 mm. Sur le flanc, « TWI » ou un triangle repère l'emplacement des témoins"
  legende: "Le témoin d'usure est une petite bosse au fond des rainures. Quand la bande de roulement arrive à son niveau, il reste 1,6 mm : changez le pneu. Sur le flanc, « TWI » ou un triangle le repère (notice Seat Ibiza)."
cout_probable:
  pieces:
    - regonflage
    - pneus
  base_de_calcul: "La dépense va du regonflage, que vous faites vous-même (une pression non conforme use les pneus prématurément, selon la notice Peugeot 208), aux pneus à remplacer (entretien), au moins deux d'un même essieu selon la notice Seat Ibiza."
  sources:
    - notice-peugeot-208
    - notice-seat-ibiza
sources:
  - arrete-2019-07-18-pneumatiques
  - arrete-1991-06-18-controle-technique
  - code-de-la-route-r314-1
  - notice-peugeot-208
  - notice-citroen-c3
  - notice-renault-clio-5
  - notice-dacia-sandero-3
  - notice-seat-ibiza
auteur: houssem-jeddou
date_publication: 2026-11-17
date_modification: 2026-11-17
date_revue: 2026-11-17
prochaine_revue: 2027-05-17
---

## Pneu usé : à partir de quand faut-il le changer ?

{{repere:ligne-1}}

Quand les témoins d'usure affleurent la bande de roulement : il ne reste alors que 1,6 mm, ou moins, dans les rainures. L'arrêté du 18 juillet 2019 exige au moins 1,6 mm dans les rainures principales des pneus d'une voiture particulière, pendant toute leur utilisation sur route ({{cite:arrete-2019-07-18-pneumatiques|article 5}}). {{verdict:ligne-1}}, selon l'encadré.

Les cinq notices lues demandent alors de remplacer les pneus. Peugeot 208 et Citroën C3 le jugent impératif ; Renault Clio 5 et Dacia Sandero 3 le jugent nécessaire, car l'adhérence devient mauvaise sur route mouillée. Selon la notice Seat Ibiza, les pneus doivent être changés au plus tard à ce moment, sinon il existe des risques d'accident.

La notice Seat Ibiza rappelle que ce danger est plus grand par mauvais temps, sous la pluie ou le verglas. Elle conseille une profondeur de sculpture la plus grande possible, et à peu près égale à l'avant et à l'arrière ({{cite:notice-seat-ibiza|p. 308}}).

## Où sont les témoins d'usure ?

Au fond des rainures de la bande de roulement. Les notices Renault Clio 5 et Dacia Sandero 3 les décrivent comme des bossages incorporés dans l'épaisseur de la bande ; la notice Seat Ibiza, comme des indicateurs de 1,6 mm de hauteur, placés à intervalles réguliers en travers du sens de roulement ({{cite:notice-renault-clio-5|p. 346}} ; {{cite:notice-dacia-sandero-3|p. 307}} ; {{cite:notice-seat-ibiza|p. 308}}).

Pour les trouver, cherchez sur le flanc du pneu les lettres « TWI » ou un petit triangle, selon la notice Seat Ibiza. Tant que le témoin reste en retrait de la bande de roulement, il reste plus de 1,6 mm, selon les notices Peugeot 208 et Citroën C3 ({{cite:notice-peugeot-208|p. 169}} ; {{cite:notice-citroen-c3|p. 115}}).

Le « témoin » allumé au tableau de bord est autre chose : c'est le voyant de pression des pneus, expliqué sur la page [voyant de pression des pneus](/voyants/pression-pneus/).

## Pneus usés au contrôle technique et sur la route

Au contrôle technique, un indicateur d'usure atteint est une défaillance majeure, et une profondeur qui n'est pas conforme aux exigences, une défaillance critique. Une usure anormale est une défaillance mineure ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 5.2.3}}).

Une défaillance majeure laisse le contrôle valable deux mois ; une défaillance critique, le seul jour du contrôle. Dans les deux cas, la contre-visite se fait dans les deux mois ({{cite:arrete-1991-06-18-controle-technique|article 7}}). La page [contre-visite du contrôle technique](/contre-visite-controle-technique/) détaille les délais.

Sur la route, le code de la route punit d'une contravention de la quatrième classe le non-respect de ses règles sur les pneumatiques, et l'immobilisation du véhicule peut être prescrite ({{cite:code-de-la-route-r314-1|article R314-1}}).

## Pneu endommagé : peut-on rouler ?

{{repere:ligne-2}}

Non : {{verdict:ligne-2}}, selon l'encadré. La notice Seat Ibiza demande de ne jamais rouler avec des pneus endommagés, et de faire remplacer immédiatement une roue ou un pneu défectueux. Elle demande de vérifier de temps en temps que les pneus n'ont ni trou, ni entaille, ni déchirure, ni boursouflure ({{cite:notice-seat-ibiza|p. 304-305}}).

Au contrôle technique, un pneu gravement endommagé ou entaillé est une défaillance majeure ; une corde visible ou endommagée, une défaillance critique ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 5.2.3}}).

## Vibrations ou direction qui tire en roulant

{{repere:ligne-3}}

{{verdict:ligne-3}}, selon l'encadré : la notice Seat Ibiza demande de s'arrêter immédiatement et de vérifier l'état des pneus. Si vous pensez qu'une roue est endommagée, elle demande de réduire immédiatement votre vitesse ({{cite:notice-seat-ibiza|p. 304-305}}).

## Après un coup de trottoir

{{repere:ligne-4}}

{{verdict:ligne-4}}, selon l'encadré. Selon les notices Renault Clio 5 et Dacia Sandero 3, un coup de trottoir peut endommager les pneus et les jantes, et dérégler le train avant ou arrière : elles demandent de faire vérifier leur état par un représentant de la marque.

## Pourquoi un pneu s'use-t-il plus vite ?

Selon les notices Peugeot 208 et Citroën C3, une pression de gonflage non conforme use prématurément les pneus et dégrade la tenue de route. Les notices Renault Clio 5 et Dacia Sandero 3 citent aussi un véhicule surchargé, de longs trajets sur autoroute par fortes chaleurs et la conduite habituelle sur de mauvais chemins.

La notice Seat Ibiza demande de contrôler la pression au moins une fois par mois et avant tout long trajet ({{cite:notice-seat-ibiza|p. 306}}). La page [pression des pneus](/pression-des-pneus/) dit où lire la bonne pression et comment gonfler.

## Date de fabrication et âge des pneus

La date de fabrication est inscrite sur le flanc, après les lettres DOT : selon la notice Seat Ibiza, « 2218 » veut dire que le pneu a été fabriqué la semaine 22 de l'année 2018 ({{cite:notice-seat-ibiza|p. 306}}).

Parmi les textes relus, aucun ne fixe d'âge limite pour un pneu. La notice Seat Ibiza demande de n'utiliser des pneus de plus de 6 ans qu'en cas d'urgence, en conduisant avec prudence : c'est sa consigne, pas une règle générale. Elle demande aussi de ne pas utiliser de pneus d'occasion dont vous ne connaissez pas les antécédents.

## Changer deux pneus ou quatre ?

La notice Seat Ibiza demande de ne pas changer un seul pneu, mais au moins les deux d'un même essieu ({{cite:notice-seat-ibiza|p. 305}}). Les autres notices lues ne le précisent pas dans leur rubrique sur les pneus.

En hiver, dans les communes soumises à la loi montagne, d'autres règles s'ajoutent : voyez la page [loi montagne](/loi-montagne/).

## Ce que disent la loi et chaque notice sur l'usure des pneus

{{tableau}}

| Source | Repère d'usure | Ce qu'elle demande |
|---|---|---|
| Arrêté du 18 juillet 2019 | 1,6 mm au moins dans les rainures principales | Pendant toute l'utilisation sur route |
| Contrôle technique (annexe I) | Indicateur d'usure atteint : défaillance majeure ; profondeur non conforme : critique | Contre-visite dans les deux mois |
| Peugeot 208 | Témoins d'usure qui n'apparaissent plus en retrait : moins de 1,6 mm | Remplacer impérativement les pneus |
| Citroën C3 | Comme Peugeot 208 | Remplacement impératif |
| Renault Clio 5 phase 2 | Bossages-témoins visibles : 1,6 mm au plus | Remplacement nécessaire (mauvaise adhérence sur route mouillée) |
| Dacia Sandero 3 | Comme Renault Clio 5 | Comme Renault Clio 5 |
| Seat Ibiza | Indicateurs de 1,6 mm de hauteur, repérés par « TWI » ou un triangle | Changer les pneus au plus tard à ce moment ; au moins deux par essieu |

Le tableau résume les textes et les notices lus ({{cite:arrete-2019-07-18-pneumatiques|article 5}} ; {{cite:arrete-1991-06-18-controle-technique|annexe I, point 5.2.3}} ; {{cite:notice-peugeot-208|p. 169}} ; {{cite:notice-citroen-c3|p. 115}} ; {{cite:notice-renault-clio-5|p. 346}} ; {{cite:notice-dacia-sandero-3|p. 307}} ; {{cite:notice-seat-ibiza|p. 305 et 308}}). La notice Toyota Yaris n'a pas été lue pour les pneus. Pour une autre voiture, sa notice fait foi.
