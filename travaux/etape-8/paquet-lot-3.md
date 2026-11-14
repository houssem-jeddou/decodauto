# Paquet de validation, lot 3 de la vague A : voyant FAP, voyant de pression des pneus, pression des pneus (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone : une partie par page. Volume indicatif du lot : 118 816 recherches par mois (plafond, docs/05 : FAP 18 960, voyant de pression des pneus 11 060, pression des pneus 88 796). Revue indépendante : §6. Le go vaut pour le commit de passage décrit au §7 (brouillons versés avec leur empreinte, déplacés vers `src/content`, demande n° 22 appliquée, rien d'autre) : toute autre modification après ta validation l'annule.
>
> Hors de ce lot : l'outil voyants attend l'ajout de STOP et du triangle à la base (décision 8 du paquet 8.1 : avant sa mise en ligne), lot 3b ; le voyant frein attend une source du témoin d'usure des plaquettes (décision D4), lot 5.

Les trois pages sont nouvelles. Leurs lignes d'encadré viennent de la base voyants validée le 24/10, reprises telles quelles, sauf la ligne `pression-pneus` que la demande n° 22 (§4 bis) complète. Ce qui est à valider : la question, les lignes de l'encadré, les causes et leur coût, une pièce ajoutée (§4), la demande n° 22 (§4 bis), les faits du texte et, pour la page pression des pneus, sa fiche « Le texte en bref ». Passages relus : `travaux/etape-8/textes/pneus-fap-releve.md` et `controle-technique-releve.md`.

## 1. Voyant FAP (`/voyants/fap/`)

**Titre** : « Voyant FAP (filtre à particules) allumé : peut-on rouler ? » · **H1** : « Voyant du filtre à particules (FAP) : que faire quand il s'allume ? »
**Description** : « Voyant FAP allumé : vous pouvez rouler, mais régénérez le filtre sans attendre, à allure soutenue. Ce que dit chaque notice, causes, contrôle technique et coût probable. »
**Question** : « Puis-je continuer à rouler avec le voyant du filtre à particules allumé ? »

**Lignes de l'encadré** (base) :
1. **Voyant du filtre à particules (FAP) orange** → **Oui, avec précautions** · À faire tout de suite · « Dès que la circulation le permet, roulez une vingtaine de minutes à allure soutenue et régulière (par exemple à plus de 60 km/h sur voie rapide, régime moteur pas trop bas), sans couper le moteur, jusqu'à l'extinction du voyant. S'il ne s'éteint pas, ou s'il s'accompagne du voyant moteur ou Service, allez au garage. » · 4 notices ; écart : Seat ne donne pas de délai.
2. **Voyant moteur orange allumé fixe** → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez que si la notice de votre voiture permet de rouler jusqu'au garage, et faites alors contrôler le moteur sans attendre en roulant prudemment ; sinon, faites appel à un garage ou à l'assistance. » (ligne de la page voyant moteur, en ligne).
3. **Voyant moteur rouge, ou STOP avec « Risque casse moteur »** → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Arrêtez-vous dès que vous pouvez le faire sans danger, coupez le moteur et ne le redémarrez pas. Faites appel à un garage ou à l'assistance. »

**Choix fait après la revue (à valider)** : les lignes 2 et 3 sont ajoutées. Sans elles, la page disait « allez au garage » (action de la ligne FAP) pour un voyant FAP accompagné du voyant moteur, alors que la page du voyant moteur, en ligne, retient « Non, arrêtez-vous immédiatement » pour ce voyant. Avec elles, le lecteur voit la consigne la plus prudente, et les messages des notices Renault et Dacia (« Injection à contrôler », « Risque casse moteur ») sont couverts par la base au lieu d'être écrits à la main.

**Coût probable (calculé)** : de « Geste à faire vous-même » à « Grosse réparation ». Pas de risque « si vous continuez » : aucune notice lue ne le chiffre.

**Causes** :
1. Filtre en début de saturation, à régénérer en roulant → régénération en roulant (geste). Toyota : la suie s'accumule plus vite sur des trajets courts ou à basse vitesse (p. 204).
2. Additif du filtre à particules au niveau minimum (Peugeot 208) → **appoint d'additif au garage (entretien), pièce nouvelle, §4**.
3. Filtre saturé, ou régénération qui ne suffit pas → filtre à remplacer (grosse réparation), tranche la plus lourde : aucune notice ne nomme la pièce. **Choix à valider.**

**Empreinte de l'encadré** : `1cd0b8fe95daf60ff6bd6d767c40ad97ebc2b589dffdbdf44ebe4042224db799`.

**Faits du texte** :
- Peugeot 208 p. 14-15 : régénérer en roulant à au moins 60 km/h jusqu'à l'extinction, dès que les conditions de circulation le permettent ; même témoin avec un message de niveau d'additif insuffisant : appoint rapide, renvoi (3) de la p. 13 « se rendre dans le réseau ou dans un atelier qualifié ».
- Renault Clio 5 phase 2 p. 186-188 et Dacia Sandero 3 p. 160-162 : début de saturation ; continuer à rouler selon la circulation et les limitations, si possible au-dessus de 2 000 tours par minute ; extinction au bout de 10 à 20 minutes environ (diesel) ; arrêt ou régime trop bas avant l'extinction : opération à recommencer (Dacia p. 161) ; saturation : message « Injection à contrôler », consulter ; STOP et « Risque casse moteur » : arrêter, couper le moteur ; versions essence : entre 50 et 110 km/h environ, extinction en 5 à 20 minutes (Dacia p. 162) ; prévention : long trajet de plus de 20 minutes sur des axes routiers tous les 200 km (Dacia p. 161).
- Seat Ibiza p. 288-290 : filtre obstrué par la suie ; régénération « essence et diesel », moteur chaud, entre 50 et 120 km/h, limitations respectées ; témoin encore allumé après 30 minutes : atelier.
- Toyota Yaris p. 204 (essence) : régénération automatique ; message « Filtre d'échappement plein » ; puissance limitée ; conduite possible sauf témoin de dysfonctionnement ; accumulation plus rapide sur trajets courts, à basse vitesse, démarrages par grand froid ; prévention : longues distances, comme sur voie rapide ou autoroute ; témoin de dysfonctionnement ou « Entretien du moteur requis » : faire vérifier immédiatement.
- Contrôle technique (arrêté du 18 juin 1991, Légifrance, relu le 14/11) : le mot « particules » n'apparaît nulle part dans le texte ; points 8.2.21.a.2 (diesel) et 8.2.11.a.2 (essence) « L'équipement monté par le constructeur est manifestement absent, modifié ou défectueux » : majeure ; relevé OBD (8.2.22.c, 8.2.12.d) : mineure ou majeure ; article 7 : contre-visite dans les deux mois. La page dit que le texte ne précise pas si le seul témoin suffit.
- Hors périmètre, non traité : prix d'un nettoyage (docs/02) ; Audi, BMW, Volkswagen : renvoi à la notice du véhicule.

**Ligne de validation proposée** : « Je valide la page voyant FAP : question, encadré (trois lignes de la base, coût et causes, empreinte 1cd0b8fe…) et faits du texte. »

## 2. Voyant de pression des pneus (`/voyants/pression-pneus/`)

**Titre** : « Voyant pression pneu allumé : peut-on rouler, que faire ? » (la requête principale « voyant pression pneu » doit figurer dans le title ou le H1) · **H1** : « Voyant de pression des pneus : que faire quand il s'allume ? »
**Description** : « Voyant de pression des pneus allumé : ralentissez et arrêtez-vous immédiatement, dès que c'est sans danger, pour contrôler les pneus. Puis regonflez et réinitialisez, notice par notice. »
**Question** : « Puis-je continuer à rouler avec le voyant de pression des pneus allumé ? »

**Lignes de l'encadré** (base ; la première avec la demande n° 22) :
1. **Voyant de pression des pneus allumé fixe** → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Ralentissez, évitez les manœuvres brusques et arrêtez-vous dès que possible en lieu sûr pour regarder l'état des pneus. Pneu crevé ou à plat : ne roulez pas avec, changez la roue ou utilisez le kit de réparation. Sinon, regonflez à la pression indiquée par la voiture (de préférence pneus froids), puis réinitialisez le système. » · 7 consignes de 5 marques ; écart réécrit par la demande n° 22.
2. **Voyant qui clignote puis reste allumé (système défaillant)** → **Oui, avec précautions** · À faire tout de suite · « Vérifiez vous-même la pression des quatre pneus dès que possible, car le système ne vous préviendra plus, puis faites contrôler le système (capteur défaillant, roue sans capteur…). » · 3 notices.

**Coût probable (calculé)** : de « Geste à faire vous-même » à « Réparation au garage » ; base de calcul : « … du regonflage, que vous faites vous-même, à la réparation du système de surveillance au garage » ; dépannage sur autoroute affiché de lui-même (verdict d'arrêt).

**Causes** : pneu sous-gonflé → regonflage (geste) ; pneu crevé ou endommagé → pneus (entretien) ; système de surveillance en défaut → capteur de pression des pneus (réparation).

**Empreinte de l'encadré** (avec la demande n° 22) : `83de9349277b761037e4cac196dcc4776c18e2ae7b2b1dec900b0fa8c71b6b24`. Sans elle : `068946bc1fbb8f8117e0305e7ed92ce74052d3089b2702d2a36834c764db193b`.

**Faits du texte** (passages relus le 14/11, relevé joint) :
- Peugeot 208 p. 110 : réduire immédiatement la vitesse, éviter coups de volant et freinages brusques, s'arrêter dès que la circulation le permet, contrôler à froid les quatre pneus (compresseur du kit) ; la perte de pression ne se voit pas toujours ; si le contrôle est impossible tout de suite, rouler prudemment à vitesse réduite ; alerte retardée possible sous 40 km/h. P. 111 : l'alerte reste jusqu'à la réinitialisation ; réinitialiser après chaque ajustement de pression et changement de roue, voiture à l'arrêt, menu Conduite / Véhicule ; vérifier d'abord les quatre pressions, le système ne prévient pas si elles sont fausses ; anomalie : surveillance plus assurée, faire vérifier ; roue de secours « galette » : surveillance suspendue.
- Renault Clio 5 phase 2 p. 207-208 et Dacia Sandero 3 p. 177-180 : réinitialiser après chaque regonflage, changement ou permutation de roue, toujours après vérification à froid des quatre pneus ; contact mis, voiture à l'arrêt, au volant (Renault : page « Pression pneus init. », appui long sur « OK » jusqu'à « Opération terminée ») ou par l'écran multimédia ; cas où le système réagit en retard ou mal (Renault p. 207, liste reprise sur la page) ; Dacia p. 177 : « Pression pneus à réajuster », « Crevaison » avec STOP, « Capteurs pneus à contrôler » ; Dacia p. 178 : système qui mesure la vitesse des roues.
- Seat Ibiza p. 311-312 : système qui compare les roues par les capteurs de l'ABS ; réduire la vitesse, s'arrêter, contrôler ; **si le pneu n'est pas crevé et ne doit pas être remplacé tout de suite, rouler jusqu'à l'atelier le plus proche à faible vitesse** ; recalibrer après un changement de pression ou de roue (infodivertissement, ou touche jusqu'au signal sonore).
- Toyota Yaris p. 261-262 : initialisation dans des cas précis (permutation avant-arrière de pressions différentes, dimension changée, pression changée pour la vitesse ou la charge, permutation entre deux jeux de roues) ; moteur coupé depuis 15 minutes, pression à froid, contacteur sur ON, menu des réglages ; impossible en roulant ; émetteurs de pression montés avec les valves.
- « Combien de temps » : aucune distance dans les notices lues ; deux notices prévoient de rouler doucement ensuite (Peugeot p. 110, Seat p. 312).
- Contrôle technique, annexe I point 5.2.3 : système qui fonctionne mal ou pneu manifestement sous-gonflé : mineure (h.1) ; système manifestement inopérant : majeure (h.2) ; article 7 : contre-visite dans les deux mois.

**Ligne de validation proposée** : « Je valide la page voyant de pression des pneus : question, encadré (lignes de la base avec la demande n° 22, coût et causes, empreinte 83de9349…) et faits du texte. »

## 3. Pression des pneus (`/pression-des-pneus/`)

**Titre** : « Pression des pneus : où la lire, comment gonfler ses pneus » · **H1** : « Pression des pneus : la valeur du constructeur, pneus froids, au moins une fois par mois »
**Description** : « La bonne pression est celle du constructeur : étiquette de la porte conducteur, pneus froids, au moins une fois par mois. Où la lire et comment gonfler, marque par marque. »
**Question** : « Puis-je rouler avec des pneus sous-gonflés, et à quelle pression les gonfler ? »

**Ligne de l'encadré** : la ligne de base « voyant de pression des pneus allumé fixe » (§2, avec la demande n° 22), sans son tableau des notices (il est sur la page du voyant ; docs/08 §3). Pas d'autre ligne : aucune source lue ne fixe un niveau pour des pneus sous-gonflés constatés sans voyant (consigne du brief : « sinon pas de ligne »).

**Le texte en bref** (fiche, texte de référence exigé par le schéma) :
- Texte de référence : « Arrêté du 18 juin 1991 relatif à la mise en place et à l'organisation du contrôle technique des véhicules dont le poids n'excède pas 3,5 tonnes, annexe I, point 5.2.3 « Pneumatiques » (version en vigueur depuis le 01/01/2026) » (Légifrance).
- Défaillances : mineure : système qui fonctionne mal, pneu manifestement sous-gonflé, pression anormale ou incontrôlable (5.2.3.h.1, i.1) ; majeure : système manifestement inopérant (5.2.3.h.2).
- Contre-visite : deux mois après le contrôle, sinon nouveau contrôle complet (article 7).

**Coût probable (calculé)** : de « Geste à faire vous-même » (regonflage) à « Entretien ou équipement courant » (pneu à remplacer) ; dépannage sur autoroute affiché de lui-même.

**Élément unique** : tableau « Où lire la pression et quand la vérifier, selon la notice de chaque marque » (5 notices : emplacement de l'étiquette, fréquence, pneus froids, après le gonflage), chaque case citée à la page près.

**Empreinte de l'encadré** (avec la demande n° 22) : `ebfe2eabfe3e924e13752d6421aa9671f2ee65f63b483d4e6b8c56f002d5fadc`. Sans elle : `fe020b90c2d3a81505f8b6fbf5d340797d7673852f47838efe8a60aa9d58c475`.

**Faits du texte** (passages relus le 14/11, relevé joint) :
- Aucune valeur générale en bars : la page renvoie à l'étiquette et à la notice (consigne du brief) ; dans les cinq notices, l'étiquette est sur la porte du conducteur ou son encadrement ; Toyota donne aussi les valeurs dans ses caractéristiques (renvoi p. 333).
- Étiquette : Peugeot 208 « collée au niveau de la porte côté conducteur », pressions à vide et en charge, roue de secours (p. 198, lue par WebFetch) ; Renault Clio 5 phase 2, « Pour la lire ouvrez la porte conducteur » (p. 348) et « étiquette collée sur le chant de porte conducteur » (p. 207), pressions avant, arrière, roue de secours (p. 348) ; Dacia Sandero 3, chant de la porte conducteur (p. 179) ; Seat Ibiza, face arrière du cadre de la porte avant gauche (p. 307) ; Toyota Yaris, cadre de la porte du conducteur (p. 266).
- Fréquence : une fois par mois (Peugeot p. 110) ; au moins une fois par mois et avant chaque grand voyage (Renault p. 207, Dacia p. 179, Seat p. 306) ; au moins une fois par mois, toutes les deux semaines recommandé (Toyota p. 266).
- Usage : selon Renault, les pressions doivent correspondre à l'usage de la voiture : à vide, en charge, sur autoroute (p. 207).
- À froid : Peugeot, voiture arrêtée depuis 1 heure ou après moins de 10 km à vitesse modérée, sinon **ajouter 0,3 bar** (p. 110) ; Renault, à chaud **majorer de 0,2 à 0,3 bar**, ne jamais dégonfler un pneu chaud (p. 348). Ces deux corrections sont citées comme consignes de ces marques, pas comme règle générale.
- Remorque : aucune notice lue ne donne la pression des pneus d'une remorque (la page le dit) ; Renault, à pleine charge avec remorque : 100 km/h au plus et pression **+ 0,2 bar** (p. 349).
- Risques du sous-gonflage : Peugeot p. 110 (tenue de route, distances de freinage, usure, consommation) ; Seat p. 312 (pneus endommagés, perte de contrôle).
- Gonflage : cinq étapes, sans produit ni prix (01) ; le compresseur du kit cité d'après Peugeot p. 110 ; « où le faire » : compresseur du kit ou garage, sans enseigne ni produit.

**Ligne de validation proposée** : « Je valide la page pression des pneus : question, encadré (ligne de la base avec la demande n° 22, coût, empreinte ebfe2eab…), fiche « Le texte en bref », tableau et faits du texte. »

## 4. Donnée ajoutée : une pièce du coût probable

`data/couts.json` : **« Appoint d'additif du filtre à particules (au garage) »**, tranche « Entretien ou équipement courant » (`appoint-additif-fap`), pour la cause 2 de la page FAP. Raison : la notice Peugeot 208 décrit un appoint (le réservoir d'additif est au minimum), qu'elle confie au réseau ou à un atelier qualifié ; un appoint ne répare rien. Autre choix possible : « Réparation au garage », la tranche que la grille du coût rattache au renvoi « se rendre dans le réseau » ; la plage de la page ne change pas (de « Geste » à « Grosse réparation »). Aucun montant en euros.

**Ligne de validation proposée** : « Je valide la pièce « appoint d'additif du FAP » en tranche entretien. »

## 4 bis. Demande de changement n° 22 : ligne `pression-pneus` de la base

Texte complet : `travaux/etape-8/demande-changement-22.md`. En bref : la notice Peugeot 208 demande, p. 110, de réduire la vitesse et de s'arrêter dès que la circulation le permet ; la base ne citait que sa p. 18 (« contrôler le plus rapidement possible ») et l'écart présentait Peugeot comme moins prudente. Proposé : ajouter la citation p. 110 (niveau : Non, arrêtez-vous immédiatement ; À faire tout de suite) et réécrire l'écart (« Peugeot (p. 110), Seat et Toyota demandent de s'arrêter dès que possible pour contrôler les pneus, Renault et Dacia en cas de message « Crevaison ». Pour un simple sous-gonflage, la liste des témoins de Peugeot (p. 18) demande de contrôler la pression le plus rapidement possible, et Dacia de la vérifier et de l'ajuster à froid ; Renault ne donne pas de consigne pour le témoin seul. »). **Verdict, urgence et action inchangés.** Nouvelle empreinte de la ligne : `b986bf24…`.

**Ligne de validation proposée** : « J'accepte la demande n° 22 : citation Peugeot 208 p. 110 ajoutée à la ligne pression-pneus et écart réécrit, verdict inchangé. »

## 5. Porte 8 du lot : critères applicables (demande n° 17)

| Critère | Preuve | Statut |
|---|---|---|
| Faits vérifiés sur sources, verdicts validés | Verdicts : base validée le 24/10 (demande n° 22 pour une ligne) ; faits : §1 à §3, sources relues le 14/11 (relevés joints) | À valider par Houssem |
| Faits de sécurité et chiffres dans le paquet validé | §1 à §4 bis | À valider par Houssem |
| Encadrés relus par Houssem | §1 à §3 | À valider |
| Lighthouse mobile ≥ 95 et CLS < 0,1 | CI de la pull request après le passage | À vérifier à la CI |
| Contrôles au vert | PR #41 : CI verte ; brouillons construits par la recette sur la branche d'essai `essai/brouillons` (§6) | Voir §6 |
| Recette de l'étape 9 | Pages relues sur le site construit, après le passage | Après le passage |
| Revue indépendante du diff complet | §6 | Faite |

## 6. Revue indépendante

Un agent sans contexte de la rédaction a relu le diff complet de la pull request (tête cc97d48), le 14/11, en vérifiant lui-même les sources lisibles (Légifrance ; PDF Peugeot p. 110, 111, 198 ; PDF Seat p. 306-312). **Verdict : à corriger, rien de bloquant.** Vérifié sans constat : empreintes, lignes de la base et plages ; articles et points de l'arrêté ; liens ; ni « nous » ni expression interdite ; aucun prix, aucune page par modèle ; volume du lot.

**Ce que la revue a changé** :
- page FAP : lignes du voyant moteur (orange fixe et rouge) ajoutées à l'encadré, pour que le site ne donne pas deux consignes au même lecteur (§1) ; consignes attribuées aux bonnes notices (délai : Peugeot, Renault, Dacia ; limitations : Renault, Dacia, Seat) ; « premier trajet qui le permet » remplacé par l'action de la base ; phrases sans source retirées (rôle de l'additif, « n'a pas pu se faire seule ») ; verdict rappelé dans les parties qui répondent à une question ; Toyota p. 204 lu en entier (trajets courts, puissance limitée, prévention) ;
- demande n° 22 proposée (§4 bis) : la citation Peugeot p. 110 entre dans la base, au lieu d'une remarque « pour information » ;
- page du voyant de pression des pneus : la consigne Seat de rouler à faible vitesse jusqu'à l'atelier ajoutée (« combien de temps ») ; fréquence « le cas le plus courant » retirée (sans source) ; verdict rappelé ; « elle se lance » sans antécédent corrigé ; base de calcul du coût sans « capteur de pression » (les systèmes Peugeot, Seat et Dacia sans capteurs passent par la vitesse des roues) ;
- page pression des pneus : H1 « au moins une fois par mois » ; texte de référence avec l'intitulé officiel de l'arrêté ; « le plus souvent… et dans la notice » précisé ; « où faire vérifier ses pneus » traité (brief) ;
- passages des notices recopiés dans un relevé (`travaux/etape-8/textes/pneus-fap-releve.md`) ; paquet complété (action entière de la ligne système, faits ajoutés, preuves de la CI, commit visé par le go).

**Écarté, et pourquoi** : « la case Renault du tableau contredit le relevé de l'étape 5 » : les deux phrases existent ; relues à l'écran le 14/11 (p. 207 : « au moins une fois par mois et avant chaque grand voyage », « étiquette collée sur le chant de porte conducteur » ; p. 348 : « Pour la lire ouvrez la porte conducteur »), elles sont dans le relevé. Pièce `capteur-abs` ajoutée à la cause « système en défaut » : aucune notice lue ne dit qu'un capteur de roue en panne allume ce voyant ; la base de calcul est corrigée à la place.

**Construction vérifiée** : branche d'essai `essai/brouillons`, avec la demande n° 22 appliquée (§7) ; résultat au §5.

**Pas de seconde revue** : aucun point bloquant ; les ajouts (deux lignes de la base dans l'encadré FAP, une citation dans la base) reprennent des textes déjà validés ou relus, et sont soumis à ta validation.

**Reste à vérifier** : glyphes des témoins de Renault p. 187 et Dacia p. 161 (« d'autres témoins », STOP) ; Lighthouse des trois pages, après le passage.
## 7. Suite, après ta validation

1. Demande n° 22 appliquée à `data/voyants.json` (citation et écart, empreinte de la ligne `b986bf24…`).
2. Les trois brouillons passent dans `exemples/` avec leur empreinte, et leur question sort de `consignes.json` ; briefs régénérés (`node scripts/briefs.ts`).
3. Passage des trois pages dans `src/content` (règle de passage faite à la main : mêmes vérifications, refaites par la CI) ; adresses ajoutées à la liste Lighthouse. Ce commit de passage est celui que vise ton go.
4. CI verte sur ce commit ; fusion par commit de fusion, puis vérification de la mise en ligne.

## 8. Validation de Houssem

Le 14/11/2026 à 13 h 08, par la validation groupée (questions posées dans la session, paquet et demande n° 22 joints) : « Je valide + go » pour les trois pages (lignes de validation des §1 à §3, avec le go de fusion du commit de passage si sa CI est verte) ; « J'accepte les deux » pour la demande n° 22 et la pièce « appoint d'additif du FAP » en tranche entretien. Empreintes versées : FAP `1cd0b8fe…`, voyant de pression des pneus `83de9349…`, pression des pneus `ebfe2eab…` ; ligne `pression-pneus` de la base : `b986bf24…`.
