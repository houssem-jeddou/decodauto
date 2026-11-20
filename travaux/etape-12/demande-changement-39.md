# Demande de changement n° 39 : consigne de sécurité avec le tarif du dépannage sur autoroute

Proposée par Claude le 20/11/2026 (nuit), étape 12 (boucle mensuelle), lot d'améliorations, partie 3. **Statut : proposée,
en attente de la décision de Houssem.** Rien n'est appliqué avant son accord.
Format de `docs/03` : élément concerné, changement proposé, raison (données), impact sur ce qui est validé, contrôles à
relancer. Sources lues le 20/11/2026 ; Claude n'est pas juriste : les points de droit sont des lectures de textes officiels.

## 1. Éléments concernés (validés ou figés)
- **Montant `depannage-autoroute`** (`data/couts.json`, empreinte `13d09e3e…`, validé) : « Dépannage sur autoroute ou route
  express : forfait réglementé de 151 € à 280,08 € TTC selon l'heure et le poids, fournitures en plus », ajouté de lui-même
  dans l'encadré de toute page à verdict d'arrêt, sauf la page outil et la loi montagne (demande n° 10). Relu le 20/11 sur
  Service-public (F11056, vérifiée le 1er janvier 2026) : 151 € à 280,08 €, inchangé.
- **Schéma du montant** (`src/schemas/cout.ts`, docs/08 §7) et **rangée « dépannage sur autoroute »** de la charte graphique
  (`docs/11`, tableau des composants : cellule sombre, objet du montant en gras, sans triangle).
- **Besoin noté au lot F1** (`travaux/etape-13/f1/a-reporter-f1.4.md`) : « encart avec la consigne sourcée (Service-public
  F11056, sans numéro de téléphone) : texte nouveau et champ de données ». Repris au journal (« Lot d'améliorations,
  partie 3 », 20/11).

## 2. Raison (données)
- **31 pages en ligne sur 38** affichent la rangée (verdict d'arrêt sur au moins une ligne de l'encadré) : relevé du
  20/11 sur `src/content`. Elles disent au lecteur de s'arrêter et ce que coûte le dépanneur, mais pas comment s'arrêter
  sans danger sur autoroute.
- Les sources officielles relues donnent une consigne courte et stable (section 3). Une question fréquente des lecteurs,
  « faut-il poser le triangle sur autoroute ? », y trouve une réponse tirée d'un texte.
- Coût : un champ de données, une ligne de plus dans une rangée qui existe déjà, une validation de texte (l'empreinte du
  montant, pas celle des 31 encadrés : `src/lib/empreinte.ts`, « le mettre à jour fait valider l'entrée une fois »).

## 3. Ce que disent les sources (lues le 20/11/2026)
- **Code de la route, article R416-19** (Légifrance, première main) : en cas d'immobilisation dangereuse, feux de détresse
  et triangle de présignalisation ; le conducteur revêt un gilet de haute visibilité s'il doit sortir d'un véhicule
  immobilisé sur la chaussée ou ses abords après un arrêt d'urgence.
- **Arrêté du 30 septembre 2008 relatif à la présignalisation des véhicules, article 2** (Légifrance, première main), cité
  par les réponses ministérielles : l'obligation de poser le triangle ne s'applique pas quand cela constitue une mise en
  danger manifeste de la vie du conducteur. Les réponses précisent qu'un véhicule entièrement sur la bande d'arrêt
  d'urgence, sans empiéter sur la chaussée, n'y est pas soumis.
- **Réponses ministérielles publiées au Journal officiel** (Assemblée nationale, 13e législature, questions sur le triangle
  sur autoroute ; nature « administration ») : feux de détresse, gilet, puis se mettre à l'abri « le plus rapidement
  possible derrière les barrières de sécurité ».
- **Service-public, fiche F11056** (déjà au registre, nature « administration ») : appel depuis une borne d'appel
  d'urgence, qui joint l'exploitant ; seul un dépanneur agréé intervient, dans les 30 minutes ; tarifs réglementés.
- **Fiche de la DGCCRF** (economie.gouv.fr, écrite le 16/01/2026, nature « administration ») : bande d'arrêt d'urgence le
  plus à droite possible, feux de détresse ; ne pas rester sur la bande d'arrêt d'urgence, même dans la voiture, se placer
  derrière la glissière ; appeler par les bornes d'appel d'urgence, pas par un téléphone portable.
- **Écart relevé** : la fiche de la DGCCRF dit aussi de « penser à placer un triangle » ; les sociétés d'autoroute le
  déconseillent et donnent un numéro et une application. Proposition : ni numéro ni application (décision du lot F1),
  et pour le triangle, la règle du texte (arrêté de 2008), qui tranche entre les deux.

## 4. Changement proposé
**Recommandation de Claude (option A) : une ligne de consigne dans la rangée « dépannage sur autoroute » de l'encadré**,
sous le tarif, dans la même cellule sombre, texte courant (sans gras ni triangle). Aucun composant nouveau ; elle
s'affiche partout où le tarif s'affiche, et seulement là. Texte proposé (42 mots, 3 phrases) :

> Sur la bande d'arrêt d'urgence : allumez les feux de détresse, enfilez le gilet avant de sortir, puis mettez tout le
> monde derrière la glissière. Appelez depuis une borne d'appel d'urgence. Le triangle n'est pas exigé si le poser vous
> met en danger.

- **Données** : champ facultatif `consigne` du montant (`texte`, `sources`) dans `data/couts.json` ; le texte entre dans
  l'empreinte du montant (`empreinteTexteDeCout`). Sources ajoutées au registre : article R416-19 et arrêté du
  30/09/2008 (Légifrance), réponse ministérielle (administration) ; F11056 y est déjà. Les sources de la consigne
  s'ajoutent à « Sources » de chaque page qui l'affiche.
- **Rendu** : `coutFormat2` (`src/lib/format2.ts`) ajoute `<p class="montant depannage-consigne" data-depannage-consigne>`
  après la rangée `data-depannage` ; style dans `charte-b.css` et ligne du tableau des composants de `docs/11`.
- **Option B (écartée)** : encart dans le corps de la page, comme le pilote. Il demande un composant nouveau (dessin,
  états, captures) et place la consigne loin de la décision, alors que le lecteur arrêté sur le bord de la route lit
  l'encadré d'abord.

## 5. Impact sur ce qui est validé
- **Encadré** : la première situation ne bouge pas (le coût est le dernier bloc de l'encadré) ; règle 2a intacte. La
  rangée gagne trois à quatre lignes sur téléphone, sur 31 pages.
- **Empreintes** : celle du montant change (validation de Houssem sur le texte de la section 4) ; celles des 31 encadrés
  non.
- **Date « Mis à jour le »** : proposition, ne pas la changer (bloc ajouté par le gabarit à partir d'une donnée, comme la
  rangée du tarif ; règle 14 : la date ne bouge que pour une vraie modification de la page).
- **Charte éditoriale** : le texte suit `docs/10` (phrases courtes, consigne à l'impératif) ; aucun verdict nouveau (la
  consigne ne change ni le niveau ni l'urgence d'aucune ligne).
- **Revérification** : la consigne suit le montant (`verifie_le`, revue tous les 90 jours, alerte hebdomadaire).

## 6. Contrôles et tests
- À ajouter : consigne affichée si et seulement si le tarif l'est (DEPANNAGE-CONSIGNE) ; ses sources dans « Sources » de la
  page ; au moins une source de première main parmi elles ; 50 mots au plus ; test du rendu (`tests/format2-*.test.ts`) ;
  test de l'empreinte du montant avec la consigne.
- À relancer : `npm run schemas`, `npm test`, `npm run build` (contrôle), `npm run liens`, recette des exemples,
  Lighthouse (hauteur de l'encadré), captures 375 × 667 et 1366 × 800, police chargée et police de secours, sur une page
  voyant, une page panne et une page code.

## 7. À décider par Houssem
1. Accepter la demande (option A), ou préférer l'option B, ou ne rien changer.
2. Valider le texte de la consigne (section 4), mot pour mot, ou le corriger.
3. Garder les dates « Mis à jour le » (recommandé) ou les avancer sur les 31 pages.
