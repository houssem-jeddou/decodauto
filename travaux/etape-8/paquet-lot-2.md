# Paquet de validation, lot 2 de la vague A : voyant moteur, voyant huile, code P0087 (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone : une partie par page, ce qui est nouveau d'abord. Volume indicatif du lot : 188 652 recherches par mois (plafond, docs/05). Revue indépendante : §5. Le go vaut pour le commit indiqué au §6 : toute modification après ta validation l'annule.

## 1. Voyant moteur (`/voyants/moteur/`)

**Encadré : inchangé** depuis ta validation du 03/11 (17 h 32). Empreinte recalculée le 14/11 : `ceaa32fa…`, identique au champ `validation`.

**Nouveau dans le texte (14/11), faits à valider :**
1. **« Défaut moteur », « système antipollution défaillant » (Peugeot et Citroën).** Notice Citroën C3 lue le 14/11 (guide d'utilisation édition 01-20, site de Citroën), même texte que la Peugeot 208 :
   - p. 11, orange : « Fixe. Le système d'antipollution est défaillant. […] Effectuer (3) rapidement. » ; avec le témoin de service : « Fixes. Une défaillance mineure du moteur est détectée. Effectuer (3). »
   - p. 10, rouge (avec STOP) : « Fixes. Une défaillance majeure du moteur est détectée. Effectuer (1), puis (2). »
   - p. 9 : « (1) : L'arrêt du véhicule est impératif. […] (3) : Se rendre dans le réseau CITROËN ou dans un atelier qualifié. »
   - Témoin associé au cas « Fixes » (le texte du PDF dit seulement « Fixes ») : vérifié sur le dessin des PDF le 14/11, un moteur et une **clé**, Peugeot 208 p. 15 et Citroën C3 p. 11. La page écrit « avec le témoin en forme de clé ».
   - La Citroën C3 s'ajoute à la liste des notices lues en tête de page ; citations : Peugeot 208 p. 13 et 15, Citroën C3 p. 9-11. Les consignes sont attribuées aux notices (« elles demandent… »).
   - La page renvoie à la notice du véhicule pour les autres modèles (308, 3008, C4, DS3).
2. **Perte de puissance.** Notice Seat Ibiza, p. 289, « Catalyseur » (lue sur le PDF le 14/11) : en cas de panne de combustion, de baisse de puissance ou de fonctionnement irrégulier du moteur, faire réviser la voiture par un atelier spécialisé ; le témoin de gaz d'échappement s'allume en général dans ce cas ; le catalyseur risquerait d'être endommagé par surchauffe.
3. **Contrôle technique.** Arrêté du 18 juin 1991, Légifrance, lu le 14/11 :
   - annexe I (en vigueur depuis le 01/01/2026), mêmes trois cas pour l'essence (8.2.12) et le diesel (8.2.22) : relevé OBD avec une anomalie du dispositif antipollution sans dysfonctionnement important → **mineure** (8.2.12.d.1, 8.2.22.c.1) ; « Le relevé du système OBD indique un dysfonctionnement important » → **majeure** (8.2.12.d.2, 8.2.22.c.2) ; connexion impossible sans dysfonctionnement du témoin OBD → **mineure** (8.2.12.e.1, 8.2.22.d.1) ;
   - article 7 : défaillance majeure → résultat défavorable, contre-visite dans les deux mois, sinon nouveau contrôle complet ;
   - la page dit ce que le texte ne dit pas : il parle du relevé OBD, pas du voyant, et ne dit pas si un voyant allumé suffit à lui seul ; conseil : faire chercher la cause avant le rendez-vous. L'instruction technique de l'organisme technique central, qui le préciserait, n'est pas citée (indice en vigueur non vérifié).

4. **Retouches du texte déjà validé (après la revue) :** la phrase sur l'AdBlue ne renvoie plus à une page qui n'est pas en ligne (« lisez aussi sa consigne dans la notice de votre voiture ») ; la consigne Toyota du réservoir vidé est attribuée à la notice (« la notice demande alors de faire le plein »).
5. **Vanne EGR (consigne du brief, 6 320 recherches par mois) : non remplie.** Aucune source de première main lue ne nomme la vanne EGR comme cause de ce voyant ; la page le dit (« les notices lues ne nomment aucune pièce, ni vanne EGR ni sonde ») et n'en fait pas une cause. À reprendre si une source admise (charte §2.2) la cite, par exemple avec les codes du lot 4.

**Vérifié aussi le 14/11 :** Toyota Yaris p. 297 (réservoir vidé) relu sur le PDF du constructeur : texte et page conformes à l'exemple validé.

**Sources ajoutées au registre :** `notice-citroen-c3`, `arrete-1991-06-18-controle-technique`. Date « Mis à jour le » : 14/11/2026 (vraie modification du texte).

**Ligne de validation proposée :** « Je valide la page voyant moteur : encadré validé le 03/11, inchangé ; parties ajoutées le 14/11 (Peugeot et Citroën, perte de puissance, contrôle technique) et retouches du texte. »

## 1 bis. « À propos » (page en ligne) : mise à jour générée

La section « Méthode » liste les notices lues depuis le registre : la notice Citroën C3 s'y ajoute, et la phrase devient « six marques de quatre groupes ». Date « Mis à jour le » : 14/11/2026. La partie générée de `docs/10` (§7) est régénérée en même temps (le test « la charte est à jour » l'exige). L'empreinte des textes de la charte validés (ligne de transparence, section « Méthode ») est inchangée : seule la liste générée bouge.

**Ligne de validation proposée :** « Je valide la mise à jour de « à propos » : notice Citroën C3 ajoutée à la liste de la méthode. »

## 2. Code P0087 (`/codes-defaut/p0087/`)

**Encadré et texte inchangés** depuis ta validation du 03/11 ; empreinte recalculée le 14/11 : `14dd328d…`, identique.

Recherche du 14/11 d'une source admise pour le 1.6 HDi (cas le plus cherché, consigne du brief « si elle existe ») : aucune trouvée (forums et sites commerciaux seulement, exclus par la charte §2.2). La page ne promet pas ce cas et renvoie au diagnostic.

**Ligne de validation proposée :** « Je valide la page P0087 telle que validée le 03/11, publiée sans changement. »

## 3. Voyant huile (`/voyants/huile/`) : nouvelle page

**Titre** : « Voyant huile moteur allumé : rouge ou orange, peut-on rouler ? » · **H1** : « Voyant d'huile moteur rouge, orange ou clé : que faire ? »

**Description (affichée par Google)** : « Voyant d'huile rouge : arrêtez-vous immédiatement, dès que c'est sans danger, et coupez le moteur, même si le niveau est correct. Orange : vérifiez le niveau sans attendre. » (corrigée après la revue : la première version adoucissait le verdict.)

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
2. Pression d'huile insuffisante alors que le niveau est correct → moteur (grosse réparation). Renault et Dacia disent que la cause est alors ailleurs ; pour le voyant de pression d'huile, Peugeot dit que le circuit de lubrification est défaillant. Aucune ne nomme la pièce : la tranche retenue est celle du moteur, la plus lourde. **Choix à valider.**
3. Capteur de niveau d'huile défaillant → capteur (réparation au garage) : Seat (témoin jaune qui clignote), Renault et Dacia (message « Véhicule à contrôler »).
4. Échéance de vidange ou de révision → vidange, révision (entretien).

**Empreinte de l'encadré présenté** : `36e1977d997fa533133a6fa77a47ef11b1d7c05e7222036622b729d90055b240` (versée dans la page après ta validation ; elle verrouille la question, les lignes, la plage calculée et le coût probable, et change si l'un d'eux change).

**Faits du texte, avec leur source (notices déjà au registre) :**
- Seat Ibiza p. 294 : rouge = pression trop faible, arrêt immédiat, couper le moteur, vérifier le niveau ; **rouge qui clignote avec trois signaux sonores** : arrêter le moteur, contrôler le niveau, faire l'appoint ; **qui clignote alors que le niveau est correct** : ne pas poursuivre, ne pas laisser tourner au ralenti, demander l'aide d'un professionnel ; jaune = contrôler immédiatement le niveau, appoint dès que possible ; **jaune qui clignote** = capteur de niveau d'huile, atelier, contrôler le niveau à chaque passage à la pompe.
- Renault Clio 5 phase 2 p. 137-138 et Dacia Sandero 3 p. 111 : s'allume au démarrage puis s'éteint après quelques secondes ; sur route, avec STOP et un signal sonore, arrêt impératif, contact coupé ; niveau normal = autre cause, faire appel au représentant de la marque.
- Renault p. 131 et Dacia p. 105 : alerte de l'afficheur au démarrage quand le niveau minimum est atteint.
- Renault p. 124 et Dacia p. 101 : message « Véhicule à contrôler », parmi ses causes un capteur du niveau d'huile.
- Peugeot 208 p. 13 : circuit de lubrification défaillant, arrêt impératif ; p. 20 : « OIL » ou « Niveau d'huile incorrect » avec le témoin de service et un signal sonore ; niveau de la jauge électrique valable sur sol horizontal, moteur arrêté depuis plus de **30 minutes** ; p. 19-20 : clé d'entretien fixe = révision à moins de **1 000 km**, clignotante = échéance dépassée.
- Toyota Yaris p. 292 : pression trop basse, arrêt immédiat ; p. 299 : niveau faible, vérifier et faire l'appoint si nécessaire ; p. 300 : « Entretien d'huile requis » = vidange et filtre ; p. 301 : « Press. huile faible » = arrêt immédiat.
- Distances : aucune notice lue n'en donne pour le voyant rouge ni pour l'alerte de niveau ; seule la clé d'entretien Peugeot parle de kilomètres (moins de 1 000 km). Un allumage bref en roulant reste sous la consigne de l'encadré : aucune notice lue ne prévoit d'exception.
- La clé ne signale pas que l'entretien : chez Peugeot, le témoin de service accompagne aussi « Niveau d'huile incorrect » (p. 20) et, avec le voyant moteur, une défaillance mineure du moteur (p. 15) ; chez Renault et Dacia, le témoin Service accompagne aussi « Véhicule à contrôler » (p. 124 et p. 101). La page demande de lire le message affiché.
- Dessins (« logo huile moteur ») : la page décrit ceux de l'encadré (burette avec une goutte ; burette au-dessus de vagues ; clé), refaits pour le site ; le règlement ONU n° 121 fixe la couleur rouge du voyant de pression d'huile (§ 5.4.1 et tableau, colonne 5), source déjà au registre.
- Volkswagen, Audi, Skoda : seule la notice Seat du groupe est lue ; la page renvoie à la notice du véhicule (une phrase en tête de page, plus de partie à part).

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

Un agent sans contexte de la rédaction a relu le diff complet de la pull request (`782c625...d4b01e3`) et le brouillon de la page huile, le 14/11. **Verdict : à corriger, rien de bloquant.**

**Ce que la revue a vérifié sans constat** : empreintes recalculées (moteur `ceaa32fa…`, P0087 `14dd328d…`, huile `36e1977d…`) ; références `{{…}}` des trois pages ; tests sans dépendance verts ; faits conformes aux sources (Citroën C3 p. 9-11, Seat p. 289 et 294, arrêté : article 7 et annexe I) ; aucune expression interdite ; part citée estimée à 25 %, sous le tiers.

**Ce que la revue a changé** :
- paquet complété : « à propos » (§1 bis), meta description de la page huile (§3), vanne EGR signalée (§1, point 5) ;
- page huile : description fidèle au verdict ; clé : lire le message affiché ; allumage bref en roulant ; distances limitées au voyant rouge et au niveau ; intitulé du cas Seat corrigé (« jaune qui clignote ») ; pages Renault « p. 137-138 » comme dans la base ; consignes attribuées aux notices ; dessins décrits, avec le règlement ONU n° 121 ; partie par marque fondue dans la première ; cause 2 sans phrase non sourcée ;
- page moteur : Citroën C3 dans la liste des notices, citée p. 9-11 ; contrôle technique avec ses cas mineurs et ce que le texte ne dit pas, sans l'équivalence non sourcée « OBD = système d'autodiagnostic » ; renvoi AdBlue retiré ; consignes attribuées aux notices.

**Écarté, et pourquoi** : « Houssem doit vérifier le témoin associé sur le dessin » : vérifié par Claude sur les PDF le 14/11 (Peugeot 208 p. 15, Citroën C3 p. 11 : moteur et clé), la phrase reste, reformulée.

**Construction vérifiée** : le brouillon huile a été construit par la CI de recette sur une branche d'essai (`essai/brouillons`, run 43587626351 : recette verte, seule la validation absente attendue) ; le passage devra aussi retirer sa question de `consignes.json` (test des briefs).

**Pas de seconde revue** : les corrections ne traitent aucun point bloquant ; les faits ajoutés viennent de pages déjà lues et sont listés ci-dessus pour ta validation.

**Reste à vérifier** : la génération de la Citroën C3 n'est écrite ni sur la couverture ni dans le texte relu : elle est déduite de l'édition 01-20 (en janvier 2020, la C3 vendue est la 3e génération, 2016-2024) ; Lighthouse et recette après le passage (§6).

## 6. Suite, après ta validation

1. La page huile passe de son brouillon à `exemples/voyant/` avec son empreinte, et sa question sort de `consignes.json` ; puis les trois pages passent dans `src/content` (règle de passage, faite à la main : `npm ci` est impossible dans la session ; mêmes vérifications, refaites par la CI : empreinte (R4), « à propos » en ligne, liste Lighthouse ; briefs régénérés par `node scripts/briefs.ts`).
2. CI verte sur ce commit (contrôles, recette, Lighthouse) ; recette sur l'artefact.
3. Fusion par commit de fusion sur ton go, pour le commit indiqué dans la pull request.
