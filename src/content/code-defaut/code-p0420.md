---
# Page « code P0420 » de la vague A (étape 8, lot 4a), rédigée le 14/11/2026 et validée par Houssem le 14/11/2026.
# Passée de exemples/ à src/content par la pull request du lot 4a (règle de passage, travaux/etape-8/regle-de-passage.md).
# La ligne de l'encadré vient de la base voyants validée (voyant moteur orange fixe, cité avec le code par les bulletins).
id: code-p0420
title: "Code P0420 : rendement du catalyseur trop bas, peut-on rouler ?"
h1: "Code défaut P0420 : rendement du catalyseur inférieur au seuil (ligne 1)"
description: "Code P0420 : rendement du catalyseur sous le seuil. Avec le voyant moteur allumé, arrêtez-vous d'abord. Causes, cas décrits par marque et contrôle technique."
libelle_court: Code P0420
question_decision: Puis-je continuer à rouler avec le code P0420 ?
situations:
  - voyant: moteur-orange-fixe
voyants:
  - moteur-orange-fixe
element_unique: tableau
code: P0420
libelle: Rendement du catalyseur inférieur au seuil (ligne 1)
libelle_sources:
  - ross-tech-p0420
  - bulletin-audi-2038434-p0420
portee: generique
carburant: essence
precisions_par_marque:
  - marque: Toyota
    precision: "Tacoma 2010 à moteur 2TR-FE, vendus aux États-Unis : bruit de ferraille du catalyseur du tuyau d'échappement avant à l'accélération, et/ou voyant moteur allumé avec le code P0420. Le bulletin de Toyota du 31/10/2013 fait remplacer le tuyau d'échappement avant, qui porte ce catalyseur."
    sources:
      - bulletin-toyota-t-sb-0161-13-p0420
  - marque: Kia
    precision: "Optima (2011-2015), Sorento (2012-2015) et Sportage (2014-2016) à moteur 2.4 GDI, vendus aux États-Unis : voyant moteur allumé avec le code P0420, parfois avec le code P0171 (mélange trop pauvre), le plus souvent pendant un long frein moteur en forte descente selon le bulletin d'octobre 2016. Si le pré-catalyseur fonctionne mal, le bulletin fait remplacer le collecteur d'échappement, inspecter le catalyseur placé sous la voiture (et le remplacer si besoin) et mettre à jour le logiciel du calculateur ; sinon, seul le logiciel est mis à jour."
    sources:
      - bulletin-kia-eng160-p0420
  - marque: Audi
    precision: "Q7 de 2007 à 2011 à moteur 3.6 FSI, vendus aux États-Unis : voyant moteur allumé, code P0420 ou P0430. Le bulletin d'Audi du 26/09/2014 l'explique par le logiciel du calculateur, à mettre à jour ; un nouveau logiciel a corrigé le défaut en production."
    sources:
      - bulletin-audi-2038434-p0420
  - marque: Volkswagen
    precision: "Atlas 2018-2019 à moteur 3.6 (CDVC), vendus aux États-Unis : code P0420 ou P0430 en mémoire. Le bulletin du 16/03/2020 fait remplacer le catalyseur par une pièce améliorée pour sa durabilité et mettre à jour le logiciel du calculateur, qui réduit la contrainte thermique sur le catalyseur ; il demande de ne diagnostiquer ni remplacer aucune autre pièce avant ces deux opérations."
    sources:
      - bulletin-vw-2058261-p0420
  - marque: Ford
    precision: "Police Interceptor Sedan 2016-2019 (voiture de police) à moteur 3.7L Ti-VCT, vendues aux États-Unis : voyant moteur allumé, codes P0420 et/ou P0430, qui peuvent venir d'un catalyseur endommagé. Le bulletin de Ford du 09/12/2019 fait remplacer le catalyseur concerné et reprogrammer le calculateur."
    sources:
      - bulletin-ford-19-2366-p0420
cout_probable:
  base_de_calcul: "Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des documents techniques cités : aucun des passages lus des notices d'utilisation ne parle de ce code."
  sources:
    - ross-tech-p0420
    - hella-sonde-lambda
    - bulletin-toyota-t-sb-0161-13-p0420
    - bulletin-kia-eng160-p0420
    - bulletin-audi-2038434-p0420
    - bulletin-vw-2058261-p0420
    - bulletin-ford-19-2366-p0420
sources:
  - notice-dacia-sandero-3
  - notice-peugeot-208
  - notice-renault-clio-5
  - notice-seat-ibiza
  - notice-toyota-yaris
  - ross-tech-p0420
  - hella-sonde-lambda
  - bulletin-toyota-t-sb-0161-13-p0420
  - bulletin-kia-eng160-p0420
  - bulletin-audi-2038434-p0420
  - bulletin-vw-2058261-p0420
  - bulletin-ford-19-2366-p0420
  - arrete-1991-06-18-controle-technique
auteur: houssem-jeddou
date_publication: 2026-11-15
date_modification: 2026-11-16
date_revue: 2026-11-14
prochaine_revue: 2027-11-14
# Encadré de décision (question, lignes, coût probable et pièces des causes) validé par Houssem le 14/11/2026 (22 h 45),
# avec les faits du texte (paquet travaux/etape-8/paquet-lot-4a.md).
validation: 1623661128065ee4d3aa7de741e96d75c3b81c833b12bac7a1d1668af71a3bc0
causes:
  - cause: Fuite à l'admission ou à l'échappement
    explication: "Pour les voitures du groupe Volkswagen, Ross-Tech cite une fuite à l'admission ou à l'échappement, et demande de vérifier l'étanchéité des deux."
    pieces:
      - durites-et-colliers
      - tuyau-ou-joint-d-echappement
  - cause: Sonde lambda défaillante, ou défaut de sa commande
    explication: "Ross-Tech cite une sonde à oxygène (sonde lambda) défaillante ou un défaut de sa commande, et demande un test de vieillissement des sondes. Selon Hella, la sonde placée après le catalyseur sert à mesurer sa capacité à stocker l'oxygène."
    pieces:
      - sonde-lambda
      - faisceau-et-connecteurs
  - cause: Logiciel du calculateur à mettre à jour
    explication: "Audi pour les Q7 3.6 FSI de 2007 à 2011, et Kia pour des moteurs 2.4 GDI dont les catalyseurs fonctionnent, font mettre à jour le logiciel du calculateur (voitures vendues aux États-Unis) ; Ross-Tech demande de chercher une mise à jour du calculateur dans la documentation du constructeur."
    pieces:
      - calculateur
  - cause: Catalyseur usé ou endommagé
    explication: "Selon Hella, le catalyseur perd avec l'âge sa capacité à stocker l'oxygène. Les bulletins de Toyota, Volkswagen et Ford font remplacer le catalyseur sur les modèles qu'ils nomment, celui de Kia le collecteur d'échappement quand le pré-catalyseur fonctionne mal (voitures vendues aux États-Unis)."
    pieces:
      - catalyseur
format: 2
illustration:
  fichier: code-p0420-ligne-echappement
  alt: "Schéma de la ligne d'échappement : moteur, sonde avant, catalyseur, sonde après, les deux sondes reliées au calculateur"
  legende: "La sonde placée après le catalyseur mesure sa capacité à stocker l'oxygène ; le calculateur compare les deux sondes. En orange, ce que citent les causes de cette page."
---

## Peut-on rouler avec le code P0420 et le voyant moteur orange allumé fixe ?

{{repere:moteur-orange-fixe}}

Le code P0420 se lit avec un appareil de diagnostic. Dans les bulletins de Toyota, Kia, Audi et Ford du tableau des cas par marque, il s'accompagne du voyant moteur allumé. Avec ce voyant, la consigne de l'encadré est celle de la notice {{notice:notice-toyota-yaris}}, la plus prudente des notices lues sur ce voyant ; l'encadré dit aussi quand repartir.

Si le voyant moteur clignote, l'action à suivre n'est pas tout à fait la même : voyez la page du [voyant moteur](/voyants/moteur/).

Si le code est lu sans que le voyant moteur soit allumé, aucune des notices lues ne donne de consigne : demandez l'avis d'un professionnel.

## Que signifie le code P0420 ?

Ce code défaut (DTC, de l'anglais Diagnostic Trouble Code) signale que le rendement du catalyseur de la ligne 1 est passé sous le seuil que surveille le calculateur du moteur. L'intitulé anglais des bulletins est « Catalyst System Efficiency Below Threshold (Bank 1) ».

Selon Hella, depuis l'EOBD (le diagnostic embarqué européen), le fonctionnement du catalyseur doit aussi être surveillé : une seconde sonde lambda, placée après lui, mesure sa capacité à stocker l'oxygène ; plus cette capacité baisse, plus le signal de cette sonde varie. Quand les signaux des deux sondes, avant et après le catalyseur, sont à peu près les mêmes, le catalyseur ne stocke plus assez, par exemple à cause de son vieillissement ({{cite:hella-sonde-lambda|« Lambda sensor function »}}).

Le code P0430 désigne le même défaut sur la ligne 2 (« Bank 2 ») : les bulletins d'Audi, de Volkswagen et de Ford le citent avec le code P0420, et celui de Ford nomme un catalyseur gauche et un catalyseur droit. Les documents cités décrivent tous des moteurs essence ; ils ne disent pas si le code existe sur un diesel.

## Symptômes du code P0420

Les documents cités décrivent :

- le voyant moteur allumé (Toyota, Kia, Audi, Ford) ;
- un bruit de ferraille qui vient du catalyseur, à l'accélération (Toyota Tacoma 2010).

## Comment résoudre le code P0420 ?

1. Si le voyant moteur est allumé, suivez d'abord la consigne de l'encadré, en haut de page.
2. Au garage, le diagnostic passe par les points de contrôle des causes ci-dessus : étanchéité de l'admission et de l'échappement, catalyseur, sondes lambda et leur commande, avec un test de vieillissement des sondes, selon Ross-Tech pour le groupe Volkswagen ({{cite:ross-tech-p0420|rubrique « Possible Solutions »}}).
3. Le code seul ne désigne pas la pièce à changer. Plusieurs constructeurs ont corrigé le logiciel du calculateur, seul ou avec le catalyseur (bulletins d'Audi, de Kia et de Volkswagen, voitures vendues aux États-Unis), et Ross-Tech demande de chercher une mise à jour du calculateur dans la documentation du constructeur ({{cite:ross-tech-p0420|rubrique « Special Notes »}}). Demandez au réseau de votre marque si une mise à jour existe pour votre voiture.
4. Après l'intervention, le bulletin de Toyota fait un essai sur route pour confirmer la réparation.

## Catalyseur défectueux : conséquences, et ce qui peut l'endommager

Les documents lus décrivent comme conséquences le voyant moteur allumé, un bruit de ferraille qui vient du catalyseur (Toyota Tacoma 2010) et, au contrôle technique, une défaillance (partie suivante) ; ils n'en décrivent pas d'autre. Les notices lues parlent du catalyseur à propos du voyant moteur qui clignote : selon la notice Peugeot 208, ce clignotement signale un risque de destruction du catalyseur ({{cite:notice-peugeot-208|p. 15}}) ; selon la notice Seat Ibiza, un défaut de combustion peut l'endommager ({{cite:notice-seat-ibiza|p. 288}}). La consigne de ce cas est sur la page du [voyant moteur](/voyants/moteur/).

## Code P0420 au contrôle technique

Pour un moteur essence, le contrôleur relève le système OBD (le diagnostic embarqué). Le texte distingue trois cas ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 8.2.12}}) :

- le relevé indique une anomalie du dispositif antipollution, sans dysfonctionnement important : défaillance mineure ;
- le relevé indique un dysfonctionnement important : défaillance majeure ;
- la connexion est impossible, sans dysfonctionnement du témoin OBD : défaillance mineure.

Le texte ne dit pas dans quel cas se range un code P0420. À part, un équipement antipollution d'origine, comme le catalyseur, manifestement absent, modifié ou défectueux est aussi une défaillance majeure ({{cite:arrete-1991-06-18-controle-technique|annexe I, point 8.2.11}}). Une défaillance majeure impose une contre-visite dans les deux mois ({{cite:arrete-1991-06-18-controle-technique|article 7}}) : le plus sûr est de faire chercher la cause avant le rendez-vous.

## P0420 sur une Peugeot, une Citroën, une Renault ou un 1.2 PureTech

Le code garde la même signification sur toutes les marques : c'est un code générique (voir la fiche du code).

Mais les documents lus ne décrivent aucun cas sur les Peugeot, Citroën, Renault ou Nissan, ni sur le moteur 1.2 PureTech. Pour Toyota, Volkswagen et Ford, les seuls cas lus concernent des modèles vendus aux États-Unis (tableau ci-dessus) : ils montrent que le code peut venir du catalyseur comme du logiciel du calculateur, mais ne valent que pour les modèles nommés. Sur votre voiture, seul le diagnostic dit d'où vient le défaut ; la marche à suivre reste la même.
