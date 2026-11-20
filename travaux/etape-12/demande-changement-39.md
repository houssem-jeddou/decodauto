# Demande de changement n° 39 : consigne de sécurité sous le tarif du dépannage sur autoroute

Proposée par Claude le 20/11/2026 (nuit), étape 12 (boucle mensuelle), lot d'améliorations, partie 3. Version 2, corrigée
après la revue indépendante (« à corriger », deux constats bloquants sur le texte de la consigne : voir le paquet de la
partie 3) ; les corrections n'ont pas été relues. **Statut : proposée, en attente de la décision de Houssem.** Rien n'est
appliqué avant son accord.

La note du lot F1 (`travaux/etape-13/f1/a-reporter-f1.4.md`) prévoyait une demande rédigée par Houssem. Claude la propose
(règle 6) ; Houssem décide. Format de `docs/03` : élément concerné, changement proposé, raison, impact sur ce qui est
validé, contrôles à relancer. Sources lues le 20/11/2026. Claude n'est pas juriste : les points de droit sont des
lectures de textes officiels.

## 1. Éléments concernés (validés ou figés)
- **Montant `depannage-autoroute`** (`data/couts.json`, empreinte `13d09e3e…`, validé) :
  - texte : « Dépannage sur autoroute ou route express : forfait réglementé de 151 € à 280,08 € TTC selon l'heure et le
    poids, fournitures en plus » ;
  - il s'ajoute de lui-même dans l'encadré de toute page à verdict d'arrêt, sauf l'outil et la loi montagne
    (demande n° 10) ;
  - montant relu le 20/11 sur Service-public (F11056, vérifiée le 1er janvier 2026) : inchangé.
- **Schéma du montant** : `montantSchema`, en `z.strictObject`, dans `src/schemas/donnees.ts`. Vue lisible : `docs/08` §7.
- **Contenu de l'encadré** :
  - `docs/10` §4, point 4 : le coût probable, avec la plage, le risque, les montants et leurs dates ;
  - règle 2b de la demande n° 30.
- **Charte éditoriale, §2.2** : « Une source secondaire ne fixe jamais […] une action conseillée au lecteur […] comme tout
  geste conseillé. » Chaque geste de la consigne doit donc venir d'une source de première main.
- **Charte graphique** : rangée « dépannage sur autoroute » (`docs/11`, tableau des composants).
- **Règle 2i** (demande n° 32) : la hauteur du visuel est donnée, et signalée au-delà de trois écrans avec la raison.
- **Règle 14 b** : la date « Mis à jour le » change pour une vraie modification, notamment un conseil ou une source.

## 2. Raison
- **Pages concernées** (relevé du 20/11 sur `src/content`) : 31 des 37 pages éditoriales en ligne affichent la rangée du
  tarif. N'en ont pas :
  - l'outil et la loi montagne ;
  - les quatre pages sans verdict d'arrêt (huiles 5W30, 5W40, 10W40, voyant airbag).
- **Ce qui manque** : ces pages disent de s'arrêter et ce que coûte le dépanneur, mais pas les gestes que la loi impose une
  fois arrêté.
- **Ce que coûte le changement** :
  - un champ de données ;
  - une ligne dans une rangée qui existe déjà ;
  - une validation de texte : l'empreinte du montant change, pas celles des 31 encadrés (`src/lib/empreinte.ts`).
- **Ce qui manque comme données** : aucune donnée de recherche relevée sur l'autoroute ou le triangle (`docs/05`,
  `docs/07`). La raison est l'utilité, pas le volume.

## 3. Ce que disent les sources (lues le 20/11/2026)
**Première main (Légifrance)**
- **Code de la route, article R416-19** :
  - I : véhicule immobilisé sur la chaussée et dangereux pour la circulation : feux de détresse et triangle ;
  - II : le conducteur revêt un gilet de haute visibilité s'il sort d'un véhicule immobilisé sur la chaussée ou ses
    abords, après un arrêt d'urgence.
- **Lecture vérifiée** : par la reproduction du texte de 2008 sur le site de la préfecture de Mayotte, et par les réponses
  ministérielles. Légifrance refuse les lectures automatiques : l'adresse de la version en vigueur est à relever à la mise
  en œuvre.

**Nature « administration » (secondaires : elles ne fixent aucun geste, §2.2)**
- **Réponses ministérielles** : questions écrites n° 44638 et n° 45183, 13e législature, réponses publiées au JO AN du
  30/06/2009 (date et page relevées par la revue indépendante).
  - Feux de détresse et gilet, puis se mettre à l'abri derrière les barrières de sécurité.
  - Sur la bande d'arrêt d'urgence, sans empiéter sur la chaussée, le triangle n'est pas obligatoire.
- **Service-public, fiche F11056** (déjà au registre) :
  - dégager la chaussée le plus loin possible des voies et présignaler le véhicule ;
  - prévenir l'exploitant, une borne d'urgence pouvant servir à l'appeler ;
  - seul un dépanneur agréé intervient ;
  - tarifs réglementés.
- **Fiche de la DGCCRF** (economie.gouv.fr, du 16/01/2026) : lue par extraits de recherche seulement, le site refusant les
  lectures automatiques.

**Ni Sécurité routière ni Légifrance trouvés** pour la mise à l'abri derrière la glissière et pour l'appel par une borne :
recherche du 20/11, sans résultat. Ces deux gestes ne reposent donc que sur des sources secondaires.

## 4. Changement proposé
**Option A, recommandée** : elle respecte la charte telle qu'elle est.
- Une ligne de consigne sous le tarif, dans la même cellule sombre, en texte courant.
- Elle s'affiche partout où le tarif s'affiche, et seulement là.
- Texte (22 mots, une phrase) :

> Sur l'autoroute ou une route express : allumez les feux de détresse et enfilez votre gilet avant de sortir de la voiture.

- Source de chaque geste : R416-19, I (feux de détresse) et II (gilet). Les sources s'ajoutent à « Sources » de chaque
  page qui affiche la consigne.
- Nuance pour Houssem : R416-19 I vise un véhicule immobilisé sur la chaussée. Sur la bande d'arrêt d'urgence, les feux de
  détresse restent le geste le plus prudent, et les réponses ministérielles les disent obligatoires en toute circonstance
  d'arrêt d'urgence.
- Plus de phrase sur le triangle. Celle de la version 1 était inexacte : sur la bande d'arrêt d'urgence, il n'y a aucune
  obligation sous condition. Elle était aussi moins prudente que les sources (revue, B2).

**Option B, plus utile mais hors de la charte actuelle** :
- Elle ajoute « puis mettez tout le monde derrière la glissière et prévenez l'exploitant de l'autoroute, par exemple
  depuis une borne d'appel d'urgence ».
- Elle demande d'abord une demande de changement de la charte éditoriale (§2.2) : admettre, pour un geste de sécurité
  routière qui ne fixe aucun verdict, une source de nature « administration » (Service-public, réponse ministérielle).
- À décider par Houssem ; Claude ne la recommande qu'avec cette demande acceptée.

**Données et rendu (les deux options)** :
- champ facultatif `consigne` du montant (`texte`, `sources`) dans `montantSchema` ;
- le texte entre dans l'empreinte du montant ;
- `coutFormat2` (`src/lib/format2.ts`) l'affiche sous le tarif, dans la cellule `data-depannage` (repère
  `data-depannage-consigne`) ;
- style dans `charte-b.css`, ligne de la rangée dans `docs/11`.

C'est une variante d'un composant existant (règle 15) : le dessin et les captures sont faits avant le code. Maquette
appliquée à la construction réelle : `lot-ameliorations/partie-3/consigne-fap-*.png`.

## 5. Impact sur ce qui est validé
**Encadré**
- Le coût est le dernier bloc de l'encadré : la première situation ne bouge pas, et la règle 2a reste tenue.
- Mesure de la maquette (option A) : la consigne prend 3 lignes à 375 px (+65 px) et 2 lignes à 1366 px (+44 px), avec
  les deux polices.

**Visuel (règle 2i)**
- Le haut de l'illustration passe au-delà de trois écrans (2 001 px) sur trois pages, à 375 px :
  - voyant FAP : de 1 999 à 2 063 px ;
  - voyant huile : de 1 979 à 2 044 px ;
  - voyant moteur : de 1 961 à 2 025 px.
- La demande n° 32 demande de le signaler avec sa raison (une consigne de sécurité dans l'encadré). Ce n'est pas un échec.
- La page « voiture qui ne démarre pas » était déjà au-delà : 2 656 px, 2 721 px avec la consigne.

**Autres éléments**
- **Empreintes** : celle du montant change, après la validation de Houssem sur le texte. Celles des 31 encadrés ne
  changent pas.
- **Date « Mis à jour le »** : à avancer sur les 31 pages, car on y ajoute un conseil et une source (règle 14 b). La
  version 1 proposait l'inverse, à tort (revue, I1).
- **Charte éditoriale** : la phrase est à l'impératif et chaque geste a sa source de première main (§2.2). Aucun verdict
  ne change : ni niveau, ni urgence.
- **Revérification** : la consigne suit le montant (`verifie_le`, revue tous les 90 jours, alerte hebdomadaire).

## 6. Contrôles et tests
**À ajouter**
- La consigne s'affiche si et seulement si le tarif s'affiche (DEPANNAGE-CONSIGNE).
- Chacune de ses sources figure dans « Sources » de la page, et toutes sont de première main.
- 30 mots au plus.
- Tests du rendu (`tests/format2-*.test.ts`) et de l'empreinte du montant avec sa consigne.

**À relancer**
- `npm run schemas`, `npm test`, `npm run build` (contrôle), `npm run liens`.
- Recette des exemples.
- FORMAT2-MESURES : hauteur de l'encadré et haut du visuel, règles 2a et 2i.
- Lighthouse : performance, CLS.
- Captures à 375 × 667 et 1366 × 800, police chargée et police de secours, sur une page voyant, une page panne et une page
  code.

## 7. À décider par Houssem
1. Accepter la demande avec l'option A (recommandée), choisir l'option B (avec une demande de changement de la charte), ou
   ne rien changer.
2. Valider le texte de la consigne mot pour mot, ou le corriger.
3. Avancer les dates « Mis à jour le » des 31 pages (recommandé, règle 14 b).
