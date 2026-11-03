---
# Exemple rédigé du modèle de page pneus et obligations (étape 6, livrable 6.6c). Jamais publié avant son lot : il est
# hors de src/content et n'est construit que par la construction de recette (AVEC_EXEMPLES=1, dist-exemples). Il deviendra
# la page « loi montagne » de la vague A (étape 8). Les lignes de l'encadré sont saisies : elles citent le code de la route
# (Légifrance) et la Sécurité routière, sources de première main (règle 4 de 01). Textes relevés : travaux/etape-6/textes/.
id: loi-montagne
title: "Loi montagne : pneus hiver ou chaînes, où et quand c'est obligatoire"
h1: "Loi montagne : pneus hiver ou chaînes obligatoires du 1er novembre au 31 mars"
description: "Loi montagne : du 1er novembre au 31 mars, pneus hiver (symbole alpin et M+S) ou chaînes à bord dans les communes listées par le préfet. Équipements admis, zones, amende."
libelle_court: Loi montagne
question_decision: Du 1er novembre au 31 mars, puis-je rouler dans une commune soumise à la loi montagne sans pneus hiver ni chaînes ?
situations:
  - situation: "Sans pneus hiver (symbole alpin et M+S) ni chaînes ou chaussettes à neige à bord"
    verdict: non, arrêt dès que possible
    urgence: immédiate
    action: "Ne continuez pas dans la zone sans équipement : si vous y êtes déjà, arrêtez-vous en lieu sûr. Pour y rouler, il faut quatre pneus hiver (symbole alpin et M+S), ou des chaînes ou chaussettes à neige à bord pour au moins deux roues motrices."
    citations:
      - source: code-de-la-route-d314-8
        emplacement: "II, 1°"
        extrait: "Pour les véhicules de catégorie M1 et N1 : la détention de dispositifs antidérapants amovibles permettant d'équiper au moins deux roues motrices ou le port, sur au moins deux roues de chaque essieu, de pneumatiques “ hiver ”"
        verdict: non, arrêt dès que possible
        urgence: immédiate
      - source: securite-routiere-equipements-hivernaux
        emplacement: en tête de page
        extrait: "Entre le 1er novembre et le 31 mars, il est obligatoire d'équiper son véhicule en pneus hiver ou de détenir des chaînes ou chaussettes à neige, dans certaines communes des massifs montagneux"
        verdict: non, arrêt dès que possible
        urgence: immédiate
  - situation: "Avec quatre pneus hiver (symbole alpin et M+S)"
    verdict: oui avec précautions
    urgence: aucune
    action: "Vous respectez l'obligation. Sur route enneigée, un panonceau peut imposer les chaînes même avec des pneus hiver : respectez-le."
    citations:
      - source: code-de-la-route-d314-8
        emplacement: VI
        extrait: "Le présent article s'applique sans préjudice des interdictions, restrictions et conditions de circulation prises par le préfet de département ou par l'autorité détentrice du pouvoir de police de la circulation"
        verdict: oui avec précautions
        urgence: aucune
      - source: securite-routiere-equipements-hivernaux
        emplacement: rubrique « Le panneau de signalisation B26 »
        extrait: "Sauf port exclusif de chaînes précisé sur panonceau, les véhicules possédant les équipements prévus par la nouvelle réglementation, seront réputés satisfaire à l’obligation instaurée par le panneau B26."
        verdict: oui avec précautions
        urgence: aucune
  - situation: "Avec des chaînes ou chaussettes à neige à bord, sans pneus hiver"
    verdict: oui avec précautions
    urgence: aucune
    action: "Vous respectez l'obligation. Gardez-les à bord, prêtes à servir : sans neige ni verglas, elles restent dans le coffre."
    citations:
      - source: securite-routiere-equipements-hivernaux
        emplacement: rubrique « Chaînes et pneus hiver »
        extrait: "Chaînes ou chaussettes doivent être stockées à bord du véhicule, et prêtes à servir, dès lors que le trajet emprunte un axe dans les zones concernées par la nouvelle réglementation."
        verdict: oui avec précautions
        urgence: aucune
      - source: securite-routiere-equipements-hivernaux
        emplacement: rubrique « Pourquoi cette réglementation ? »
        extrait: "En cas d'absence de neige ou de verglas, les dispositifs amovibles – chaînes ou chaussettes à neige – sont conservés à bord du véhicule."
        verdict: oui avec précautions
        urgence: aucune
  - situation: "Sur route enneigée, devant un panneau B26, avec des chaînes ou chaussettes à neige à bord"
    verdict: oui avec précautions
    urgence: immédiate
    action: "Montez les chaînes ou chaussettes au premier endroit sûr, avant de continuer."
    citations:
      - source: securite-routiere-equipements-hivernaux
        emplacement: rubrique « Le panneau de signalisation B26 »
        extrait: "Le panneau de signalisation B26 continue de signifier que, sur des routes enneigées, y compris hors période hivernale, le port – et non la simple détention – de chaînes est obligatoire."
        verdict: oui avec précautions
        urgence: immédiate
element_unique: tableau
sujet: loi-montagne
texte_reference:
  nature: legifrance
  reference: "Code de la route, article D314-8 (version en vigueur depuis le 01/11/2024)"
  source: code-de-la-route-d314-8
periode:
  debut: 1er novembre
  fin: 31 mars de l'année suivante
zones:
  - "Communes listées par arrêté du préfet de département, dans les massifs de métropole : Alpes, Corse, Massif central, Massif jurassien, Pyrénées et Massif vosgien ; le préfet peut prévoir des dérogations sur certaines routes"
cout_probable:
  pieces:
    - pneus-hiver
    - chaines-a-neige
  base_de_calcul: "La dépense est l'équipement exigé par le code de la route : pneus hiver, ou chaînes ou chaussettes à neige (liste des pièces du site)."
  sources:
    - code-de-la-route-d314-8
  montants:
    - aucune-amende-loi-montagne
sources:
  - code-de-la-route-d314-8
  - loi-85-30-art-5
  - securite-routiere-equipements-hivernaux
  - securite-routiere-equipements-hivernaux-departements
auteur: houssem-jeddou
date_publication: 2026-11-03
date_modification: 2026-11-03
date_revue: 2026-11-03
prochaine_revue: 2027-05-03
---

## Loi montagne : où et quand faut-il s'équiper ?

Du 1er novembre au 31 mars, l'article D314-8 du code de la route impose un équipement d'hiver dans certaines communes de montagne ({{cite:code-de-la-route-d314-8|I et IV}}). Le préfet de chaque département concerné en fixe la liste par arrêté, dans les massifs de métropole : Alpes, Corse, Massif central, Massif jurassien, Pyrénées et Massif vosgien. Il peut aussi prévoir des dérogations sur certaines sections de route.

Un panneau signale l'entrée dans une zone où l'équipement est obligatoire, avec un panonceau qui rappelle la période. Selon la Sécurité routière, cette signalisation est nécessaire pour que l'obligation puisse vous être opposée ({{cite:securite-routiere-equipements-hivernaux|rubrique « Les panneaux de signalisation »}}).

Pour savoir si une commune est concernée, la Sécurité routière publie une carte ({{cite:securite-routiere-equipements-hivernaux|rubrique « Quelles sont les zones concernées ? »}}) et les arrêtés des préfets, département par département ({{cite:securite-routiere-equipements-hivernaux-departements|rubrique « arrêtés préfectoraux dans les départements concernés »}}).

## Quel équipement pour la loi montagne ?

Pour une voiture ou un utilitaire léger, le texte laisse le choix : des pneus hiver sur au moins deux roues de chaque essieu, ou des dispositifs antidérapants amovibles à bord, de quoi équiper au moins deux roues motrices. La Sécurité routière y range les chaînes métalliques et les chaussettes à neige.

{{tableau}}

| Équipement | Accepté ? | Ce qu'il faut savoir |
|---|---|---|
| Pneus hiver marqués du symbole alpin (montagne à trois pics avec un flocon) et de M+S | Oui | Quatre pneus, sur au moins deux roues de chaque essieu |
| Pneus 4 saisons ou toutes saisons | Seulement s'ils portent le symbole alpin et M+S | Ce nom n'a pas de définition réglementaire |
| Pneus neige marqués M+S seulement, sans symbole alpin | Non, depuis le 01/11/2024 | Comptés comme des pneus classiques : gardez des chaînes ou chaussettes à neige à bord |
| Pneus été, sans ces marquages | Non | Gardez des chaînes ou chaussettes à neige à bord |
| Chaînes à neige métalliques | Oui | À bord, au moins deux, pour les roues motrices |
| Chaussettes à neige (chaînes textiles) | Oui | À bord, au moins deux, pour les roues motrices |
| Pneus à clous | Obligation non applicable | Les voitures qui en portent en sont exonérées |

Ce tableau reprend l'article D314-8 ({{cite:code-de-la-route-d314-8|V}}) et la Sécurité routière ({{cite:securite-routiere-equipements-hivernaux|rubriques « Chaînes et pneus hiver » et « Les pneus hiver »}}).

## Peut-on rouler sans pneus hiver ni chaînes en zone de montagne ?

Dans une commune soumise à l'obligation, du 1er novembre au 31 mars, sans pneus hiver ni chaînes à bord, le verdict retenu en haut de page est : {{verdict:ligne-1}}. L'encadré dit comment vous équiper.

Hors de ces communes, ou du 1er avril au 31 octobre, l'article D314-8 n'impose aucun équipement. Mais sur une route enneigée, un panneau B26 impose les chaînes, y compris hors de la période d'hiver. Selon la Sécurité routière, des pneus hiver y suffisent, sauf si un panonceau exige les chaînes.

## Deux chaussettes à neige suffisent-elles ?

Pour l'obligation, oui : le texte demande de quoi équiper au moins deux roues motrices, et la Sécurité routière accepte les chaussettes à neige, qu'elle appelle aussi chaînes textiles, au même titre que les chaînes métalliques. Elle les dit plus simples à poser, mais moins efficaces que les chaînes en cas de fort enneigement.

Vérifiez qu'elles sont adaptées à la taille de vos roues et à l'espace entre la roue et la carrosserie. Pour les chaînes métalliques, la Sécurité routière recommande de s'exercer à les poser avant de partir.

## Pneus neige, 4 saisons, M+S ou 3PMSF : lesquels sont acceptés ?

Depuis le 01/11/2024, un pneu compte comme pneu hiver s'il porte à la fois le symbole alpin et l'un des marquages M+S, M.S ou M&S. Le symbole alpin est une montagne à trois pics avec un flocon : la Sécurité routière l'appelle 3PMSF.

Un pneu 4 saisons, ou toutes saisons, n'a pas de définition réglementaire : il n'est accepté que s'il porte ces deux marquages. Un pneu vendu comme pneu neige mais marqué M+S seulement ne suffit plus : la Sécurité routière le compte comme un pneu classique, et il faut alors des chaînes ou chaussettes à neige à bord.

## Quelle amende pour la loi montagne ?

{{montant:aucune-amende-loi-montagne}}. La date de la dernière vérification est indiquée en haut de page. L'obligation d'équipement s'applique quand même.

Le panneau B26, qui impose les chaînes sur route enneigée, relève d'une autre règle : sa sanction n'est pas traitée ici.

## Quels véhicules sont concernés ?

Selon la Sécurité routière, tous les véhicules à quatre roues et plus : voitures, utilitaires, bus et poids lourds. Les voitures sans permis ne sont pas concernées. Les poids lourds avec remorque ou semi-remorque doivent avoir des chaînes à bord, même avec des pneus hiver ({{cite:code-de-la-route-d314-8|II, 4°}}).

## Que faire avant de partir en montagne ?

1. Vérifiez si votre trajet passe par une commune soumise à l'obligation : carte et arrêtés publiés par la Sécurité routière, ou panneau à l'entrée de la zone.
2. Équipez la voiture : quatre pneus hiver (symbole alpin et M+S), ou des chaînes ou chaussettes à neige à bord, adaptées à vos roues.
3. Gardez les chaînes ou chaussettes prêtes à servir. Sur route enneigée, montez-les là où un panneau B26 l'impose ; avec des pneus hiver, seulement si un panonceau exige les chaînes.
