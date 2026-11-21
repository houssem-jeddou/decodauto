---
# Page de la vague B, étape 10, lot B4 (rédaction ouverte par la validation de la porte 10 le 16/11/2026, 19 h 26).
# Validée par Houssem le 17/11/2026 à 7 h 39 (« Je valide tout ! Fais le necessaire », sur la ligne de validation de
# travaux/etape-10/paquet-lot-b4-fin.md) ; empreinte posée et passage de exemples/ à src/content par la pull request
# du lot B4 (règle de passage).
# - Extraits relus mot pour mot le 16/11/2026 : travaux/etape-10/textes/autres-pannes-verification.md (Toyota p. 36,
#   242, 291 et 335 ; Seat p. 213, 290 et 297-298 ; Peugeot p. 165). Ligne de pression d'huile reprise de la base.
# - Corrigée après la revue indépendante du 16/11/2026 (non relue depuis) : ligne 2 au niveau « Non, ne poursuivez pas
#   votre trajet » (fuite dangereuse de monoxyde de carbone, Toyota p. 242 ; grille, principe 3), avec la consigne propre
#   à l'odeur (Toyota p. 36) et son écart ; actions des lignes 4 et 6 ramenées à leurs citations ; cause « carburant
#   inapproprié » à la tranche du moteur ; pièce existante « tuyau ou joint d'échappement » ; ventilateur moteur coupé.
# - Claquement, sifflement du turbo, poussoirs, injecteurs : aucune source de première main n'en donne la cause ni la
#   conduite à tenir propre ; la page applique la consigne générale (Toyota p. 291) et le dit.
# - Illustration dessinée pour le site : bruit-normal-ou-pas (travaux/etape-10/generer-illustrations-b4.py).
id: bruit-moteur
title: "Bruit moteur anormal : claquement, cliquetis, que faire ?"
h1: "Mon moteur fait un bruit : normal, ou faut-il s'arrêter ?"
description: "Bruit moteur au démarrage, cliquetis à l'accélération, claquement, bruit d'échappement qui change : ce que les notices jugent normal, et quand faire vérifier la voiture sans attendre."
libelle_court: Bruit moteur
question_decision: "Mon moteur fait un bruit anormal : puis-je continuer à rouler ?"
situations:
  - voyant: huile-pression-rouge
  - situation: "Le bruit de l'échappement change, ou une odeur de gaz d'échappement entre dans l'habitacle"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Ouvrez les vitres, puis arrêtez-vous dans un endroit sûr : le bruit peut signaler une fuite dangereuse de monoxyde de carbone. Ne repartez, vitres ouvertes, que jusqu'au garage le plus proche, pour faire vérifier l'échappement immédiatement."
    ecart_marques: "La notice Toyota Yaris signale, pour un bruit d'échappement qui change, une fuite dangereuse possible de monoxyde de carbone ; pour une odeur de gaz d'échappement dans l'habitacle, elle demande d'ouvrir les vitres et de faire vérifier la voiture dès que possible."
    ecart_court: "Plus strict : Toyota, bruit d'échappement (monoxyde de carbone). Moins strict : Toyota, odeur dans l'habitacle (vérifier dès que possible)."
    citations:
      - source: notice-toyota-yaris
        emplacement: "p. 242, « Votre véhicule nécessite-t-il des réparations ? »"
        extrait: "Modification du bruit d'échappement (cela peut indiquer une fuite dangereuse de monoxyde de carbone. Conduisez avec les vitres ouvertes et faites vérifier le système d'échappement immédiatement.)"
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: notice-toyota-yaris
        emplacement: "p. 36, gaz d'échappement : odeur de gaz d'échappement dans le véhicule"
        extrait: "[…] ouvrez les vitres et faites vérifier le véhicule dès que possible"
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "Le moteur fait un cliquetis ou un autre bruit anormal"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Faites vérifier la voiture dès que possible par un garage. Si un voyant s'allume, c'est sa consigne qui s'applique."
    citations:
      - source: notice-toyota-yaris
        emplacement: "p. 291, 7.2.2 « Si vous pensez qu'il y a un problème », symptômes audibles : « Cliquetis ou autres bruits anormaux du moteur »"
        extrait: "Si vous remarquez l'un des symptômes suivants, votre véhicule a probablement besoin d'un réglage ou d'une réparation. Contactez dès que possible un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."
        verdict: oui avec précautions
        urgence: immédiate
  - situation: "Au démarrage à froid, le moteur est un peu plus bruyant pendant un court moment"
    verdict: oui
    urgence: aucune
    action: "C'est normal, s'il ne dure qu'un court moment."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 213, « Démarrer le moteur », Nota"
        extrait: "Lors du démarrage du moteur à froid, les bruits peuvent brièvement augmenter. Ce phénomène est normal et il n'y a donc pas lieu de s'inquiéter."
        verdict: oui
        urgence: aucune
  - situation: "De légers cliquetis, très brefs, en accélérant ou en montée"
    verdict: oui
    urgence: aucune
    action: "C'est normal s'ils restent légers et brefs. S'ils durent ou reviennent souvent, voyez la ligne du cliquetis anormal."
    citations:
      - source: notice-toyota-yaris
        emplacement: "p. 335, « Informations relatives au carburant »"
        extrait: "Vous pouvez occasionnellement entendre de légers cliquetis pendant un temps très court lorsque vous accélérez ou conduisez dans une montée. Cela est normal et il n'y a aucune raison de s'inquiéter."
        verdict: oui
        urgence: aucune
  - situation: "Pendant la régénération du filtre à particules : bruit, odeur et ralenti plus élevé"
    verdict: oui
    urgence: aucune
    action: "C'est normal pendant la régénération. Si le voyant du filtre à particules est allumé, suivez sa consigne."
    citations:
      - source: notice-seat-ibiza
        emplacement: "p. 290, « Filtre à particules »"
        extrait: "Pendant la régénération, du bruit, des odeurs et un régime de ralenti élevé peuvent se produire."
        verdict: oui
        urgence: aucune
voyants:
  - huile-pression-rouge
element_unique: arbre-de-decision
format: 2
illustration:
  fichier: bruit-normal-ou-pas
  alt: "Deux colonnes : les bruits que les notices jugent normaux, et ceux qui demandent une vérification"
  legende: "Normal selon les notices lues : un bruit un peu plus fort au démarrage à froid, de légers cliquetis très brefs en accélérant, le nettoyage (régénération) du filtre à particules. À faire vérifier : un cliquetis qui dure, un claquement, un sifflement ou un autre bruit anormal. Un bruit d'échappement qui change est plus grave : voyez l'encadré."
symptome: "Le moteur fait un bruit inhabituel : cliquetis, claquement, sifflement, ou bruit d'échappement qui change."
carburant: essence et diesel
contexte:
  - au démarrage
  - à l'accélération
  - au ralenti
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les notices lues décrivent surtout les bruits normaux ; pour un bruit anormal, elles ne nomment pas la pièce en cause, et la tranche retenue est la plus lourde."
  sources:
    - notice-seat-ibiza
    - notice-toyota-yaris
sources:
  - notice-toyota-yaris
  - notice-seat-ibiza
  - notice-peugeot-208
auteur: houssem-jeddou
date_publication: 2026-11-16
date_modification: 2026-11-21
date_revue: 2026-11-16
prochaine_revue: 2027-11-16
validation: 9e0425ec7131c3306be33c028895a7d78610358ffad0cd79cb8b6690e6f2166c
causes:
  - cause: Bruit normal du moteur froid ou de la régénération
    explication: "Selon la notice Seat Ibiza, le bruit augmente brièvement au démarrage à froid, et la régénération du filtre à particules peut s'accompagner de bruit, d'odeurs et d'un ralenti plus élevé."
    pieces:
      - fonctionnement-normal
  - cause: Carburant inapproprié (essence)
    explication: "Dans sa rubrique sur le carburant, où elle parle aussi des cliquetis, la notice Toyota Yaris demande une essence sans plomb d'indice d'octane 95 ou plus, et prévient qu'un carburant inapproprié risque d'endommager le moteur. Elle ne dit pas que ce carburant cause les cliquetis."
    pieces:
      - moteur
  - cause: Fuite ou défaut de l'échappement
    explication: "Selon la notice Toyota Yaris, un bruit d'échappement qui change peut indiquer une fuite dangereuse de monoxyde de carbone."
    pieces:
      - tuyau-ou-joint-d-echappement
  - cause: Défaut mécanique du moteur
    explication: "La notice Toyota Yaris range le cliquetis et les autres bruits anormaux du moteur parmi les signes d'une réparation à faire, sans nommer la pièce en cause : le diagnostic au garage le dit."
    pieces:
      - moteur
---

## Bruit moteur : normal ou pas ?

Un moteur ne fait pas toujours le même bruit, et les notices lues décrivent des bruits normaux. Un bruit qui dure, qui change ou qui s'accompagne d'un voyant demande en revanche une vérification. Suivez les questions ci-dessous.

## Le bon geste selon ce que vous entendez

{{arbre}}

1. Le voyant de pression d'huile rouge est-il allumé ?
   - Oui : arrêtez-vous. {{verdict:huile-pression-rouge}}
   - Non : passez à la question 2.
2. Le bruit vient-il de l'échappement, ou sentez-vous une odeur de gaz d'échappement dans l'habitacle ?
   - Oui : ouvrez les vitres et arrêtez-vous dans un endroit sûr ; ne repartez, vitres ouvertes, que jusqu'au garage le plus proche. {{verdict:ligne-2}}
   - Non : passez à la question 3.
3. Le bruit apparaît-il seulement au démarrage à froid, un court moment ?
   - Oui : c'est normal. {{verdict:ligne-4}}
   - Non : passez à la question 4.
4. Est-ce un léger cliquetis, très bref, en accélérant ou en montée ?
   - Oui : c'est normal. {{verdict:ligne-5}}
   - Non, ou il dure : faites vérifier la voiture dès que possible. {{verdict:ligne-3}}

## Bruit avec le voyant d'huile rouge

{{repere:huile-pression-rouge}}

Un bruit du moteur avec le voyant de pression d'huile rouge allumé impose l'arrêt : le circuit de lubrification est défaillant. La consigne de l'encadré est celle de la notice la plus prudente, et le tableau des notices, en bas de page, donne celle de chaque marque.

## Bruit d'échappement qui change

{{repere:ligne-2}}

Selon la notice {{notice:notice-toyota-yaris}}, un bruit d'échappement qui change peut indiquer une fuite dangereuse de monoxyde de carbone : elle demande de conduire vitres ouvertes et de faire vérifier le système d'échappement immédiatement ({{cite:notice-toyota-yaris|p. 242}}). Si une odeur de gaz d'échappement entre dans l'habitacle, elle demande d'ouvrir les vitres et de faire vérifier la voiture dès que possible ({{cite:notice-toyota-yaris|p. 36}}).

## Cliquetis, claquement, sifflement : faire vérifier

{{repere:ligne-3}}

La notice Toyota Yaris range le cliquetis et les autres bruits anormaux du moteur parmi les signes d'un réglage ou d'une réparation à faire : elle demande de contacter un réparateur dès que possible ({{cite:notice-toyota-yaris|p. 291}}). Pour un cliquetis, elle demande aussi de contacter un réparateur ({{cite:notice-toyota-yaris|p. 335}}).

Les notices lues ne donnent pas la cause d'un claquement, d'un sifflement du turbo ou d'un bruit d'injecteur, ni de consigne propre à ces bruits. La consigne reste la même : faites vérifier la voiture dès que possible, et décrivez au garage quand le bruit se produit. Si un voyant s'allume, c'est sa consigne qui s'applique.

## Les bruits que les notices jugent normaux

{{repere:ligne-4}}

Au démarrage à froid, le bruit du moteur peut augmenter brièvement : c'est normal, selon la notice {{notice:notice-seat-ibiza}}, qui demande d'éviter les régimes élevés et les fortes accélérations tant que le moteur est froid, en signalant un risque de panne du moteur ({{cite:notice-seat-ibiza|p. 213}}). La notice Toyota Yaris juge normaux de légers cliquetis, très brefs, en accélérant ou en montée ({{cite:notice-toyota-yaris|p. 335}}). Pendant la régénération du filtre à particules, du bruit, des odeurs et un ralenti plus élevé peuvent se produire ({{cite:notice-seat-ibiza|p. 290}}) ; si le voyant du filtre est allumé, c'est sa consigne qui s'applique.

## Ventilateur qui se met en marche moteur coupé

Les notices {{notice:notice-peugeot-208}} et Seat Ibiza préviennent que le ventilateur du radiateur peut se mettre en marche même contact coupé ({{cite:notice-peugeot-208|p. 165}} ; {{cite:notice-seat-ibiza|p. 297-298}}). Elles ne disent pas quand un bruit de ventilateur devient anormal : en cas de doute, demandez l'avis d'un professionnel.

## Le carburant conseillé

Dans sa rubrique sur le carburant, où elle parle aussi des cliquetis, la notice Toyota Yaris demande une essence sans plomb d'indice d'octane 95 ou plus, et prévient qu'un carburant inapproprié risque d'endommager le moteur ({{cite:notice-toyota-yaris|p. 335}}). Elle ne dit pas qu'un mauvais carburant cause les cliquetis. Le carburant à utiliser est écrit dans la notice de votre voiture.

Pour le moteur PureTech, voyez la page [moteur PureTech](/moteur-puretech/).
