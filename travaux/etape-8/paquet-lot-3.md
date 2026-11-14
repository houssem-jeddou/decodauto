# Paquet de validation, lot 3 de la vague A : voyant FAP, voyant de pression des pneus, pression des pneus (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone : une partie par page. Volume indicatif du lot : 118 816 recherches par mois (plafond, docs/05 : FAP 18 960, voyant de pression des pneus 11 060, pression des pneus 88 796). Revue indépendante : §6. Le go vaut pour le commit indiqué au §7 : toute modification après ta validation l'annule.
>
> Hors de ce lot : l'outil voyants attend l'ajout de STOP et du triangle à la base (décision 8 du paquet 8.1 : avant sa mise en ligne), lot 3b ; le voyant frein attend une source du témoin d'usure des plaquettes (décision D4), lot 5.

Les trois pages sont nouvelles. Leurs lignes d'encadré viennent de la base voyants validée le 24/10, reprises telles quelles ; ce qui est à valider : la question, les causes et leur coût, une pièce ajoutée à la liste des coûts (§4), les faits du texte et, pour la page pression des pneus, sa fiche « Le texte en bref ».

## 1. Voyant FAP (`/voyants/fap/`)

**Titre** : « Voyant FAP (filtre à particules) allumé : peut-on rouler ? » · **H1** : « Voyant du filtre à particules (FAP) : que faire quand il s'allume ? »
**Description** : « Voyant FAP allumé : vous pouvez rouler, mais régénérez le filtre sans attendre, à allure soutenue. Ce que dit chaque notice, causes, contrôle technique et coût probable. »
**Question** : « Puis-je continuer à rouler avec le voyant du filtre à particules allumé ? »

**Ligne de l'encadré** (base) : **Voyant du filtre à particules (FAP) orange** → **Oui, avec précautions** · À faire tout de suite · « Dès que la circulation le permet, roulez une vingtaine de minutes à allure soutenue et régulière (par exemple à plus de 60 km/h sur voie rapide, régime moteur pas trop bas), sans couper le moteur, jusqu'à l'extinction du voyant. S'il ne s'éteint pas, ou s'il s'accompagne du voyant moteur ou Service, allez au garage. » · 4 notices ; écart : Seat ne donne pas de délai.

**Coût probable (calculé)** : de « Geste à faire vous-même » à « Grosse réparation ». Pas de risque « si vous continuez » : aucune notice lue ne le chiffre.

**Causes** :
1. Filtre en début de saturation, à régénérer en roulant → régénération en roulant (geste).
2. Additif du filtre à particules au niveau minimum (Peugeot 208) → **appoint d'additif au garage (entretien), pièce nouvelle, §4**.
3. Filtre saturé, ou régénération qui ne suffit pas → filtre à remplacer (grosse réparation), tranche la plus lourde : aucune notice ne nomme la pièce. **Choix à valider.**

**Empreinte de l'encadré** : `8db8f52a455ff915e11c015692e29334b500a70bd2ca538ecadffcb9ef8627f2`.

**Faits du texte** (notices au registre ; PDF relus le 14/11 pour Dacia p. 161-162) :
- Peugeot 208 p. 14-15 : régénérer en roulant à au moins 60 km/h jusqu'à l'extinction ; même témoin avec un message de niveau d'additif insuffisant : appoint rapide, renvoi (3) de la p. 13 « se rendre dans le réseau ou dans un atelier qualifié ».
- Renault Clio 5 phase 2 p. 186-188 et Dacia Sandero 3 p. 160-162 : début de saturation ; continuer à rouler, si possible au-dessus de 2 000 tours par minute ; extinction au bout de 10 à 20 minutes environ (diesel) ; arrêt ou régime trop bas avant l'extinction : opération à recommencer (Dacia p. 161) ; saturation : message « Injection à contrôler », consulter ; STOP et « Risque casse moteur » : arrêter, couper le moteur ; versions essence : rouler entre 50 et 110 km/h environ, extinction en 5 à 20 minutes (Dacia p. 162) ; prévention : long trajet de plus de 20 minutes sur des axes routiers tous les 200 km (Dacia p. 161).
- Seat Ibiza p. 288-290 : filtre obstrué par la suie ; régénération « essence et diesel », moteur chaud, entre 50 et 120 km/h ; témoin encore allumé après 30 minutes : atelier.
- Toyota Yaris p. 204 (essence) : message « Filtre d'échappement plein », conduite possible sauf témoin de dysfonctionnement ; avec ce témoin ou « Entretien du moteur requis » : faire vérifier immédiatement.
- Contrôle technique (arrêté du 18 juin 1991, Légifrance, relu le 14/11) : le mot « particules » n'apparaît nulle part dans le texte ; points 8.2.21.a.2 (diesel) et 8.2.11.a.2 (essence) « L'équipement monté par le constructeur est manifestement absent, modifié ou défectueux » : majeure ; relevé OBD (8.2.22.c, 8.2.12.d) : mineure ou majeure ; article 7 : contre-visite dans les deux mois. La page dit que le texte ne précise pas si le seul témoin suffit.
- Hors périmètre, non traité : prix d'un nettoyage (docs/02) ; Audi, BMW, Volkswagen : renvoi à la notice du véhicule.

**Ligne de validation proposée** : « Je valide la page voyant FAP : question, encadré (ligne de la base, coût et causes, empreinte 8db8f52a…) et faits du texte. »

## 2. Voyant de pression des pneus (`/voyants/pression-pneus/`)

**Titre** : « Voyant pression des pneus allumé : peut-on rouler, que faire ? » · **H1** : « Voyant de pression des pneus : que faire quand il s'allume ? »
**Description** : « Voyant de pression des pneus allumé : ralentissez et arrêtez-vous immédiatement, dès que c'est sans danger, pour contrôler les pneus. Puis regonflez et réinitialisez, notice par notice. »
**Question** : « Puis-je continuer à rouler avec le voyant de pression des pneus allumé ? »

**Lignes de l'encadré** (base) :
1. **Voyant de pression des pneus allumé fixe** → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Ralentissez, évitez les manœuvres brusques et arrêtez-vous dès que possible en lieu sûr pour regarder l'état des pneus. Pneu crevé ou à plat : ne roulez pas avec, changez la roue ou utilisez le kit de réparation. Sinon, regonflez à la pression indiquée par la voiture (de préférence pneus froids), puis réinitialisez le système. » · 6 consignes de 5 marques ; écart signalé.
2. **Voyant qui clignote puis reste allumé (système défaillant)** → **Oui, avec précautions** · À faire tout de suite · « Vérifiez vous-même la pression des quatre pneus dès que possible, car le système ne vous préviendra plus, puis faites contrôler le système. » · 3 notices.

**Coût probable (calculé)** : de « Geste à faire vous-même » à « Réparation au garage » ; dépannage sur autoroute affiché de lui-même (verdict d'arrêt).

**Causes** : pneu sous-gonflé → regonflage (geste) ; pneu crevé ou endommagé → pneus (entretien) ; système de surveillance en défaut → capteur de pression des pneus (réparation).

**Empreinte de l'encadré** : `6778e9b7114c143406096106f2204d6ad024147b96cf0b74167d44f251d044bf`.

**Faits du texte** (PDF relus le 14/11) :
- Peugeot 208 p. 110 : réduire immédiatement la vitesse, éviter coups de volant et freinages brusques, s'arrêter dès que la circulation le permet, contrôler à froid les quatre pneus (compresseur du kit) ; la perte de pression ne se voit pas toujours ; si le contrôle est impossible tout de suite, rouler prudemment à vitesse réduite ; alerte retardée possible sous 40 km/h. P. 111 : l'alerte reste jusqu'à la réinitialisation ; réinitialiser après chaque ajustement de pression et changement de roue, voiture à l'arrêt, menu Conduite / Véhicule ; vérifier d'abord les quatre pressions, le système ne prévient pas si elles sont fausses ; anomalie : surveillance plus assurée, faire vérifier ; roue de secours « galette » : surveillance suspendue.
- Renault Clio 5 phase 2 p. 207-208 et Dacia Sandero 3 p. 177-180 : réinitialiser après chaque regonflage, changement ou permutation de roue, toujours après vérification à froid des quatre pneus ; contact mis, voiture à l'arrêt, au volant (Renault : page « Pression pneus init. », appui long sur « OK » jusqu'à « Opération terminée ») ou par l'écran multimédia ; cas où le système réagit en retard ou mal (Renault p. 207, liste reprise sur la page) ; Dacia p. 177 : « Pression pneus à réajuster », « Crevaison » avec STOP, « Capteurs pneus à contrôler ».
- Seat Ibiza p. 311-312 : système qui compare les roues par les capteurs de l'ABS ; consigne de l'avertissement (réduire la vitesse, s'arrêter, contrôler) ; recalibrer après un changement de pression ou de roue (infodivertissement, ou touche jusqu'au signal sonore).
- Toyota Yaris p. 261-262 : initialisation dans des cas précis (permutation avant-arrière de pressions différentes, dimension changée, pression changée pour la vitesse ou la charge, permutation entre deux jeux de roues) ; moteur coupé depuis 15 minutes, pression à froid, contacteur sur ON, menu des réglages ; impossible en roulant ; émetteurs de pression montés avec les valves.
- Contrôle technique, annexe I point 5.2.3 : système qui fonctionne mal ou pneu manifestement sous-gonflé : mineure (h.1) ; système manifestement inopérant : majeure (h.2) ; article 7 : contre-visite dans les deux mois.
- **Écart relevé, pour information** : la notice Peugeot 208 demande p. 110 de s'arrêter dès que la circulation le permet, alors que l'écart de la ligne de base cite sa p. 18 (« contrôler le plus rapidement possible »). Le verdict n'en change pas (le plus prudent l'emporte déjà) ; corriger le texte de l'écart demanderait une demande de changement de la base, non proposée ici.

**Ligne de validation proposée** : « Je valide la page voyant de pression des pneus : question, encadré (lignes de la base, coût et causes, empreinte 6778e9b7…) et faits du texte. »

## 3. Pression des pneus (`/pression-des-pneus/`)

**Titre** : « Pression des pneus : où la lire, comment gonfler ses pneus » · **H1** : « Pression des pneus : la valeur du constructeur, pneus froids, une fois par mois »
**Description** : « La bonne pression est celle du constructeur : étiquette de la porte conducteur, pneus froids, au moins une fois par mois. Où la lire et comment gonfler, marque par marque. »
**Question** : « Puis-je rouler avec des pneus sous-gonflés, et à quelle pression les gonfler ? »

**Ligne de l'encadré** : la ligne de base « voyant de pression des pneus allumé fixe » (§2), sans son tableau des notices (il est sur la page du voyant ; docs/08 §3). Pas d'autre ligne : aucune source lue ne fixe un niveau pour des pneus sous-gonflés constatés sans voyant (consigne du brief : « sinon pas de ligne »).

**Le texte en bref** (fiche, texte de référence exigé par le schéma) :
- Texte de référence : arrêté du 18 juin 1991, annexe I, point 5.2.3 « Pneumatiques » (Légifrance, version en vigueur depuis le 01/01/2026).
- Défaillances : mineure : système qui fonctionne mal, pneu manifestement sous-gonflé, pression anormale ou incontrôlable (5.2.3.h.1, i.1) ; majeure : système manifestement inopérant (5.2.3.h.2).
- Contre-visite : deux mois après le contrôle, sinon nouveau contrôle complet (article 7).

**Coût probable (calculé)** : de « Geste à faire vous-même » (regonflage) à « Entretien ou équipement courant » (pneu à remplacer) ; dépannage sur autoroute affiché de lui-même.

**Élément unique** : tableau « Où lire la pression et quand la vérifier, selon la notice de chaque marque » (5 notices : emplacement de l'étiquette, fréquence, pneus froids, après le gonflage), chaque case citée à la page près.

**Empreinte de l'encadré** : `fe020b90c2d3a81505f8b6fbf5d340797d7673852f47838efe8a60aa9d58c475`.

**Faits du texte** (PDF relus le 14/11) :
- Aucune valeur générale en bars : la page renvoie à l'étiquette et à la notice (consigne du brief).
- Étiquette : Peugeot 208 « collée au niveau de la porte côté conducteur », pressions à vide et en charge, roue de secours (p. 198) ; Renault Clio 5 phase 2, chant de la porte conducteur, pressions avant, arrière, roue de secours (p. 348) ; Dacia Sandero 3, chant de la porte conducteur (p. 179) ; Seat Ibiza, face arrière du cadre de la porte avant gauche (p. 307) ; Toyota Yaris, cadre de la porte du conducteur (p. 266).
- Fréquence : une fois par mois (Peugeot p. 110) ; au moins une fois par mois et avant chaque grand voyage (Renault p. 207, Dacia p. 179, Seat p. 306) ; au moins une fois par mois, toutes les deux semaines recommandé (Toyota p. 266).
- À froid : Peugeot, voiture arrêtée depuis 1 heure ou après moins de 10 km à vitesse modérée, sinon **ajouter 0,3 bar** (p. 110) ; Renault, à chaud **majorer de 0,2 à 0,3 bar**, ne jamais dégonfler un pneu chaud (p. 348). Ces deux corrections sont citées comme consignes de ces marques, pas comme règle générale.
- Remorque : aucune notice lue ne donne la pression des pneus d'une remorque (la page le dit) ; Renault, à pleine charge avec remorque : 100 km/h au plus et pression **+ 0,2 bar** (p. 349).
- Risques du sous-gonflage : Peugeot p. 110 (tenue de route, distances de freinage, usure, consommation) ; Seat p. 312 (pneus endommagés, perte de contrôle).
- Gonflage : cinq étapes, sans produit ni prix (01) ; le compresseur du kit cité d'après Peugeot p. 110.

**Ligne de validation proposée** : « Je valide la page pression des pneus : question, encadré (ligne de la base, coût, empreinte fe020b90…), fiche « Le texte en bref », tableau et faits du texte. »

## 4. Donnée ajoutée : une pièce du coût probable

`data/couts.json` : **« Appoint d'additif du filtre à particules (au garage) »**, tranche « Entretien ou équipement courant » (`appoint-additif-fap`), pour la cause 2 de la page FAP. Raison : la notice Peugeot 208 renvoie l'appoint au réseau ou à un atelier qualifié (renvoi (3)) ; c'est une opération d'entretien, pas une réparation. Aucun montant en euros.

**Ligne de validation proposée** : « Je valide la pièce « appoint d'additif du FAP » en tranche entretien. »

## 5. Porte 8 du lot : critères applicables (demande n° 17)

| Critère | Preuve | Statut |
|---|---|---|
| Faits vérifiés sur sources, verdicts validés | Verdicts : base validée le 24/10 ; faits : §1 à §3, sources relues le 14/11 | À valider par Houssem |
| Faits de sécurité et chiffres dans le paquet validé | §1 à §4 | À valider par Houssem |
| Encadrés relus par Houssem | §1 à §3 | À valider |
| Lighthouse mobile ≥ 95 et CLS < 0,1 | CI de la pull request après le passage | À vérifier à la CI |
| Contrôles au vert | CI de la pull request ; brouillons construits par la recette sur la branche d'essai `essai/brouillons` | Voir §6 |
| Recette de l'étape 9 | Pages relues sur le site construit, après le passage | Après le passage |
| Revue indépendante du diff complet | §6 | Voir §6 |

## 6. Revue indépendante

À compléter après la revue.

## 7. Suite, après ta validation

1. Les trois brouillons passent dans `exemples/` avec leur empreinte, et leur question sort de `consignes.json` ; briefs régénérés (`node scripts/briefs.ts`).
2. Passage des trois pages dans `src/content` (règle de passage faite à la main : mêmes vérifications, refaites par la CI) ; adresses ajoutées à la liste Lighthouse.
3. CI verte sur ce commit ; fusion par commit de fusion sur ton go, puis vérification de la mise en ligne.
