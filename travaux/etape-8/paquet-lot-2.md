# Paquet de validation, lot 2 de la vague A : voyant moteur, voyant huile, code P0087 (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone : une partie par page, ce qui est nouveau d'abord. Volume indicatif du lot : 188 652 recherches par mois (plafond, docs/05). Revue indépendante : §5. Le go vaut pour le commit indiqué au §6 : toute modification après ta validation l'annule.

## 1. Voyant moteur (`/voyants/moteur/`)

**Encadré : inchangé** depuis ta validation du 03/11 (17 h 32). Empreinte recalculée le 14/11 : `ceaa32fa…`, identique au champ `validation`.

**Nouveau dans le texte (14/11), faits à valider :**
1. **« Défaut moteur », « système antipollution défaillant » (Peugeot et Citroën).** Notice Citroën C3 lue le 14/11 (guide d'utilisation édition 01-20, site de Citroën), même texte que la Peugeot 208 :
   - p. 11, orange : « Fixe. Le système d'antipollution est défaillant. […] Effectuer (3) rapidement. » ; avec le témoin de service : « Fixes. Une défaillance mineure du moteur est détectée. Effectuer (3). »
   - p. 10, rouge (avec STOP) : « Fixes. Une défaillance majeure du moteur est détectée. Effectuer (1), puis (2). »
   - p. 9 : « (1) : L'arrêt du véhicule est impératif. […] (3) : Se rendre dans le réseau CITROËN ou dans un atelier qualifié. »
   - La page renvoie à la notice du véhicule pour les autres modèles (308, 3008, C4, DS3).
2. **Perte de puissance.** Notice Seat Ibiza, p. 289, « Catalyseur » (lue sur le PDF le 14/11) : en cas de panne de combustion, de baisse de puissance ou de fonctionnement irrégulier du moteur, faire réviser la voiture par un atelier spécialisé ; le témoin de gaz d'échappement s'allume en général dans ce cas ; le catalyseur risquerait d'être endommagé par surchauffe.
3. **Contrôle technique.** Arrêté du 18 juin 1991, Légifrance, lu le 14/11 :
   - annexe I (en vigueur depuis le 01/01/2026), 8.2.12.d.2 (essence) et 8.2.22.c.2 (diesel) : « Le relevé du système OBD indique un dysfonctionnement important » → défaillance **majeure** ;
   - article 7 : défaillance majeure → résultat défavorable, contre-visite dans les deux mois, sinon nouveau contrôle complet.
   - Non affirmé sur la page : le lien direct « voyant allumé = défaillance majeure », qui figure dans l'instruction technique de l'organisme technique central, dont l'indice en vigueur n'a pas pu être vérifié. La page dit seulement que le contrôleur relève le système d'autodiagnostic dont ce voyant est le témoin.

**Vérifié aussi le 14/11 :** Toyota Yaris p. 297 (réservoir vidé) relu sur le PDF du constructeur : texte et page conformes à l'exemple validé.

**Sources ajoutées au registre :** `notice-citroen-c3`, `arrete-1991-06-18-controle-technique`. Date « Mis à jour le » : 14/11/2026 (vraie modification du texte).

**Ligne de validation proposée :** « Je valide la page voyant moteur : encadré validé le 03/11, inchangé ; parties ajoutées le 14/11 (Peugeot et Citroën, perte de puissance, contrôle technique). »

## 2. Code P0087 (`/codes-defaut/p0087/`)

**Encadré et texte inchangés** depuis ta validation du 03/11 ; empreinte recalculée le 14/11 : `14dd328d…`, identique.

Recherche du 14/11 d'une source admise pour le 1.6 HDi (cas le plus cherché, consigne du brief « si elle existe ») : aucune trouvée (forums et sites commerciaux seulement, exclus par la charte §2.2). La page ne promet pas ce cas et renvoie au diagnostic.

**Ligne de validation proposée :** « Je valide la page P0087 telle que validée le 03/11, publiée sans changement. »

## 3. Voyant huile (`/voyants/huile/`) : nouvelle page

**Titre** : « Voyant huile moteur allumé : rouge ou orange, peut-on rouler ? » · **H1** : « Voyant d'huile moteur rouge, orange ou clé : que faire ? »

**Question de décision** : « Puis-je continuer à rouler avec le voyant d'huile allumé ? »

**Les trois lignes de l'encadré** (base voyants validée le 24/10, reprises telles quelles) :
1. **Voyant de pression d'huile rouge**, moteur tournant → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Vérifiez le niveau d'huile. Même s'il est correct, ne repartez pas : faites appel à un garage ou à l'assistance. » · 5 notices, pas d'écart.
2. **Alerte de niveau d'huile bas** (voyant orange ou message) → **Oui, avec précautions** · À faire tout de suite · « Vérifiez sans attendre le niveau d'huile à la jauge, voiture à plat et moteur arrêté comme l'indique la notice, et faites l'appoint avec l'huile qu'elle préconise. Si le niveau est correct et que l'alerte reste affichée, faites contrôler la jauge électrique par un garage. » · 3 notices ; écart : Toyota sans délai, Seat et Peugeot immédiatement.
3. **Rappel d'entretien** (voyant clé, message de révision ou de vidange) → **Oui, avec précautions** · À faire dans les jours qui viennent · « Vous pouvez rouler, avec ménagement si le message s'accompagne du témoin Service (Renault, Dacia). Faites faire la révision ou la vidange dans les jours qui viennent, puis remettre l'indicateur à zéro. » · 5 notices ; écart : témoin Service chez Renault et Dacia.

**Coût probable (calculé)** : de « Geste à faire vous-même » à « Grosse réparation ».
- Si vous continuez : « Grosse réparation », d'après Peugeot 208 p. 20 : « compléter impérativement le niveau pour éviter la détérioration du moteur ».
- Base de calcul affichée : « Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Le risque si l'on continue vient de la notice Peugeot 208 : un manque d'huile qu'on ne complète pas peut détériorer le moteur. »
- Dépannage sur autoroute : forfait réglementé affiché de lui-même (page à verdict d'arrêt ; montant validé, revérifié le 28/10/2026).

**Causes (ordre logique, avec leur tranche)** :
1. Niveau d'huile trop bas → appoint d'huile (geste).
2. Pression d'huile insuffisante alors que le niveau est correct → moteur (grosse réparation). Aucune notice ne nomme la pièce : Renault et Dacia disent que la cause est ailleurs, Peugeot que le circuit de lubrification est défaillant ; la tranche retenue est celle du moteur, que l'huile protège. **Choix à valider.**
3. Capteur de niveau d'huile défaillant → capteur (réparation au garage) : Seat (témoin jaune qui clignote), Renault et Dacia (message « Véhicule à contrôler »).
4. Échéance de vidange ou de révision → vidange, révision (entretien).

**Empreinte de l'encadré présenté** : `36e1977d997fa533133a6fa77a47ef11b1d7c05e7222036622b729d90055b240` (versée dans la page après ta validation ; elle change si l'encadré change).

**Faits du texte, avec leur source (notices déjà au registre) :**
- Seat Ibiza p. 294 : rouge = pression trop faible, arrêt immédiat, couper le moteur, vérifier le niveau ; **rouge qui clignote avec trois signaux sonores** : arrêter le moteur, contrôler le niveau, faire l'appoint ; **qui clignote alors que le niveau est correct** : ne pas poursuivre, ne pas laisser tourner au ralenti, demander l'aide d'un professionnel ; jaune = contrôler immédiatement le niveau, appoint dès que possible ; **jaune qui clignote** = capteur de niveau d'huile, atelier, contrôler le niveau à chaque passage à la pompe.
- Renault Clio 5 phase 2 p. 137 et Dacia Sandero 3 p. 111 : s'allume au démarrage puis s'éteint après quelques secondes ; sur route, avec STOP et un signal sonore, arrêt impératif, contact coupé ; niveau normal = autre cause, faire appel au représentant de la marque.
- Renault p. 131 et Dacia p. 105 : alerte de l'afficheur au démarrage quand le niveau minimum est atteint.
- Renault p. 124 et Dacia p. 101 : message « Véhicule à contrôler », parmi ses causes un capteur du niveau d'huile.
- Peugeot 208 p. 13 : circuit de lubrification défaillant, arrêt impératif ; p. 20 : « OIL » ou « Niveau d'huile incorrect » avec le témoin de service et un signal sonore ; niveau de la jauge électrique valable sur sol horizontal, moteur arrêté depuis plus de **30 minutes** ; p. 19-20 : clé d'entretien fixe = révision à moins de **1 000 km**, clignotante = échéance dépassée.
- Toyota Yaris p. 292 : pression trop basse, arrêt immédiat ; p. 299 : niveau faible, vérifier et faire l'appoint si nécessaire ; p. 300 : « Entretien d'huile requis » = vidange et filtre ; p. 301 : « Press. huile faible » = arrêt immédiat.
- Aucune notice lue ne donne de distance (« combien de kilomètres ») : la page le dit.
- Volkswagen, Audi, Skoda : seule la notice Seat du groupe est lue ; la page renvoie à la notice du véhicule.

**Ligne de validation proposée :** « Je valide la page voyant huile : question, encadré (lignes de la base, coût et causes, empreinte 36e1977d…) et faits du texte. »

## 4. Porte 8 du lot : critères applicables (demande n° 17)

| Critère | Preuve | Statut |
|---|---|---|
| Faits vérifiés sur sources, verdicts validés | Verdicts : base validée le 24/10 ; faits : §1 à §3, sources lues le 14/11 | À valider par Houssem |
| Faits de sécurité et chiffres dans le paquet validé | §1 à §3 | À valider par Houssem |
| Encadrés relus par Houssem | Moteur et P0087 : 03/11 ; huile : §3 | Huile à valider |
| Lighthouse mobile ≥ 95 et CLS < 0,1 | CI de la pull request après le passage (§6) | À vérifier à la CI |
| Contrôles au vert | CI de la pull request | À vérifier à la CI |
| Recette de l'étape 9 | Pages relues sur l'artefact de la CI, téléphone et ordinateur | Après le passage |
| Revue indépendante du diff complet | §5 | Voir §5 |

## 5. Revue indépendante

À compléter après la revue.

## 6. Suite, après ta validation

1. La page huile passe de son brouillon à `exemples/voyant/` avec son empreinte, puis les trois pages passent dans `src/content` (règle de passage, faite à la main : `npm ci` est impossible dans la session ; mêmes vérifications, refaites par la CI : empreinte (R4), « à propos » en ligne, liste Lighthouse).
2. CI verte sur ce commit (contrôles, recette, Lighthouse) ; recette sur l'artefact.
3. Fusion par commit de fusion sur ton go, pour le commit indiqué dans la pull request.
