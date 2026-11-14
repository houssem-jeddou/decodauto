# Paquet de validation, lot 5b de la vague A : voyant batterie, voyant de direction assistée (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone : une partie par page. Volume indicatif du lot : 8 216 recherches par mois (plafond, docs/05 : voyant batterie 4 424, voyant volant orange 3 792). Revue indépendante : §6. Le go vaut pour le commit de passage décrit au §7 (brouillons versés avec leur empreinte et déplacés vers `src/content` ; question retirée de `consignes.json`, briefs régénérés, adresses ajoutées à la liste Lighthouse, comme pour les lots précédents) : toute autre modification après ta validation l'annule.
>
> Lot 5a (airbag, ABS et ESP) : pull request n° 45, paquet à part. Hors de ce lot : voyant frein (décision D4), AdBlue et préchauffage (lot 5c), codes défaut (lot 4).

Les deux pages sont nouvelles. Leurs lignes d'encadré viennent de la base voyants validée le 24/10, reprises telles quelles. Ce qui est à valider : la question, les lignes de l'encadré, les causes et leur coût, trois pièces ajoutées au coût probable (§3), une paire de liens ajoutée au plan (§3 bis), et les faits du texte. Passages relus : `travaux/etape-8/textes/batterie-direction-releve.md` (notices) et `controle-technique-releve.md` (arrêté du 18 juin 1991).

## 1. Voyant batterie (`/voyants/batterie/`)

**Titre** : « Voyant batterie allumé : peut-on rouler, que faire ? » · **H1** : « Voyant de batterie rouge : que faire quand il s'allume en roulant ? »
**Description** : « Voyant de batterie allumé moteur tournant : arrêtez-vous dès que c'est sans danger, la batterie n'est plus rechargée. Ce que dit chaque notice, causes et coût probable. »
**Question** : « Puis-je continuer à rouler avec le voyant de batterie allumé ? »

**Ligne de l'encadré** (base) : **Voyant de charge de la batterie rouge** → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le contact. Ne repartez pas si la notice de votre voiture l'interdit : faites appel à un garage ou à l'assistance. Si elle permet de rejoindre l'atelier le plus proche (Seat), éteignez les équipements électriques non indispensables. » · 5 marques ; écart : Seat laisse rouler jusqu'à l'atelier le plus proche, les quatre autres imposent l'arrêt.

**Coût probable (calculé)** : de « Geste à faire vous-même » à « Réparation au garage » ; base de calcul : « … des cosses de batterie à nettoyer et resserrer vous-même, comme le demande la notice Peugeot 208, à la réparation du circuit de charge au garage. » Verdict d'arrêt : le dépannage sur autoroute s'affiche de lui-même.

**Causes** : cosses sales ou desserrées → nettoyage et serrage des cosses (geste, **pièce nouvelle**, §3) ; courroie d'alternateur détendue ou cassée → courroie d'alternateur (réparation, **pièce nouvelle**, §3) ; alternateur ou circuit de charge défaillant → alternateur (réparation).

**Empreinte de l'encadré** : `aa612e91ded68725def801296b909f48cda80f4de9afbc91d796d4d89dc55586`.

**Faits du texte** (relevé joint) :
- Arrêt : Peugeot p. 13 (arrêt impératif, contact coupé ; si le frein de stationnement électrique ne fonctionne plus : rapport engagé, position P ou cale selon la boîte), Toyota p. 292 (arrêter immédiatement), Renault p. 137 et Dacia p. 112 (sur route, avec STOP et signal sonore : surcharge ou décharge du circuit électrique, s'arrêter) ; Seat p. 302 : se rendre immédiatement à l'atelier spécialisé le plus proche, en éteignant les équipements électriques non indispensables, la batterie se déchargeant. Aucune distance dans les notices lues.
- Avant le démarrage : témoins rouges ou orange allumés quelques secondes à la mise du contact, éteints dès le démarrage du moteur (Peugeot p. 12, Seat p. 302, Renault p. 137).
- Ce que signale le voyant (partie titrée « voyant batterie ou voyant d'alternateur ») : circuit de charge (Peugeot), dysfonctionnement de l'alternateur (Seat, qui le nomme ainsi), système de charge (Toyota), surcharge ou décharge (Renault, Dacia) ; messages « Panne électrique DANGER » (Renault p. 125) et « Panne électrique » (Dacia p. 102) avec STOP : problème du circuit de charge (alternateur…), arrêt impératif et immédiat, moteur arrêté et non redémarré.
- Batterie et direction : selon Toyota p. 297 (corrigé après la revue, relu à l'écran), une charge insuffisante ou une chute de tension peut allumer le voyant de direction assistée (lien vers sa page, §3 bis).
- Batterie neuve, alternateur en bon état : Peugeot p. 13 (cosses sales, courroie d'alternateur détendue ou sectionnée ; nettoyer et resserrer les cosses ; si le témoin ne s'éteint pas au démarrage, réseau ou atelier qualifié), consigne attribuée à cette notice ; sinon, diagnostic par un professionnel.
- Clignotement et allumage par intermittence : aucune notice ne décrit de clignotement propre à ce voyant ; Toyota p. 292 applique ses consignes à tout voyant qui « s'allume ou clignote » (voyant de charge : arrêter immédiatement) et précise qu'un voyant qui s'éteint aussitôt ne signale pas forcément un dysfonctionnement, à faire vérifier si cela se reproduit ; pour une autre voiture, avis d'un professionnel ; dès qu'il reste allumé moteur tournant, la ligne de l'encadré.
- STOP et batterie : Renault p. 136-137 et Dacia p. 110-112 (STOP : arrêt impératif et immédiat, moteur arrêté et non redémarré) ; la notice lue est celle de la Clio 5 phase 2, pas de la Clio 3 (brief).
- Non traité (brief) : achat de batterie, prix ; Berlingo, Clio 3 ; « batterie faible » et « voiture ne démarre pas » ont leurs pages (liées dans le plan, pas encore construites : aucun lien dans le texte).

**Ligne de validation proposée** : « Je valide la page voyant batterie : question, encadré (ligne de la base, coût et causes, empreinte aa612e91…) et faits du texte. »

## 2. Voyant de direction assistée (`/voyants/direction/`)

**Titre** : « Voyant volant orange ou rouge : peut-on rouler, que faire ? » (la requête principale « voyant volant orange » doit figurer dans le title ou le H1) · **H1** : « Voyant de direction assistée (volant) : que faire quand il s'allume ? »
**Description** : « Voyant volant orange : roulez prudemment et faites vérifier la direction sans attendre. Rouge, ou avec le témoin STOP : arrêtez-vous, la direction n'est plus assistée. »
**Question** : « Puis-je continuer à rouler avec le voyant de direction assistée allumé ? »

**Lignes de l'encadré** (base) :
1. **Voyant de direction orange ou jaune** → **Oui, avec précautions** · À faire tout de suite · « Vous pouvez rouler prudemment, à allure modérée : le volant peut être plus dur. Faites vérifier la direction sans attendre. Si le voyant passe au rouge ou s'accompagne du témoin STOP, arrêtez-vous. » · 3 marques de 3 groupes ; écart : Peugeot et Seat sans délai précis, Toyota immédiat.
2. **Voyant de direction rouge, ou STOP avec la direction** → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Tenez fermement le volant et arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez pas : faites appel à un garage ou à l'assistance. » · 5 marques (8 consignes) ; écart : Toyota demande une vérification immédiate sans imposer l'arrêt.

**Coût probable (calculé)** : de « Geste à faire vous-même » à « Grosse réparation » ; base de calcul : « … du bref parcours que demande la notice Seat Ibiza après un rebranchement de la batterie, à la réparation de la direction assistée. » Verdict d'arrêt : le dépannage sur autoroute s'affiche de lui-même.

**Causes** : batterie débranchée puis rebranchée, ou dépannée → bref parcours demandé par la notice (geste, **pièce nouvelle**, §3 ; Seat p. 227, Dacia p. 113) ; charge de la batterie insuffisante → recharge ou batterie à remplacer (entretien ; Toyota p. 298) ; direction assistée défaillante → direction assistée (grosse réparation). **Choix à valider** : aucune notice ne nomme la pièce de la troisième cause ; la tranche retenue est la plus lourde plausible (règle du coût : « en cas de doute, la tranche la plus lourde plausible »).

**Empreinte de l'encadré** : `c0951a858423d41a2116de81b54ac51edabed6ed549bcddf70850ae84081d50a` (après la revue : base de calcul et pièce de la première cause).

**Faits du texte** (relevé joint) :
- Orange : Peugeot p. 17 (rouler prudemment à allure modérée, puis réseau ou atelier qualifié) ; Seat p. 227 (jaune : fonctionnement limité, atelier avec prudence) ; Toyota p. 294 (vérifier immédiatement) et p. 298 (jaune : assistance limitée).
- Rouge ou STOP : Toyota p. 298 (rouge : assistance perdue, volant très difficile à manœuvrer ; le tenir fermement et le tourner avec plus de force) ; Seat p. 227 (rouge : direction endommagée, stopper dès que possible) ; Peugeot p. 13 (STOP : dysfonctionnement grave notamment de la direction assistée, arrêt impératif) ; Renault p. 125 et 138, Dacia p. 102 et 113 (direction avec STOP : défaillance ; « Panne de la direction » avec STOP : arrêt impératif et immédiat, moteur arrêté et non redémarré).
- Pourquoi il s'allume : contrôle à la mise du contact (Seat, Renault, Dacia) ; défaillance (Peugeot, Seat, Toyota) ; batterie faible (Toyota p. 297, lien vers la page du voyant batterie) ; batterie rebranchée (Seat p. 227 : bref parcours à 15-20 km/h) ou dépannée (Dacia p. 113).
- Éteindre : Seat p. 227 (témoin jaune qui ne s'allume plus après redémarrage et court trajet : révision inutile ; après rebranchement de la batterie, bref parcours), cité avec sa page ; pour une autre voiture, la consigne de l'encadré ; hors du cas de la colonne coincée, aucune autre manipulation dans les notices lues.
- Clignotant : Seat p. 227, relu à l'écran (colonne de direction coincée : à l'arrêt, tourner le volant d'un côté et de l'autre ; colonne qui ne se verrouille ou ne se déverrouille pas : retirer la clé et remettre le contact ; s'arrêter si elle reste bloquée après la mise du contact, faire appel à un spécialiste), consigne citée sans verdict.
- Triangle orange : autre voyant, expliqué sur la page des voyants (lien vers la page mère, brief).
- Contrôle technique (Légifrance, relu le 14/11) : 2.6.1.a.2 (indicateur de dysfonctionnement) et c.2 (assistance qui ne fonctionne pas) : majeures ; article 7 ; la consigne de l'encadré rappelée pour l'orange et pour le rouge (corrigé après la revue).
- Non traité (brief) : Volkswagen, Audi, BMW, Polo, Golf 5, Clio 2, Touran : renvoi à la notice du véhicule.

**Ligne de validation proposée** : « Je valide la page voyant de direction assistée : question, encadré (deux lignes de la base, coût et causes avec la direction assistée en grosse réparation, empreinte c0951a85…) et faits du texte. »

## 3. Données ajoutées : trois pièces du coût probable

`data/couts.json` :
- **« Nettoyage et serrage des cosses de batterie »** (`cosses-de-batterie`), tranche « Geste à faire vous-même » : la notice Peugeot 208 demande au conducteur de nettoyer et de resserrer les cosses (p. 13) ; c'est la consigne qui fonde la tranche « geste » (« la notice demande une action au conducteur »).
- **« Courroie d'alternateur »** (`courroie-d-alternateur`), tranche « Réparation au garage » : cause citée par la notice Peugeot 208 (p. 13), sans consigne propre ; autre choix possible, « Entretien » (pièce d'usure) ; la plage de la page ne change pas (l'alternateur est déjà en réparation).

- **« Bref parcours demandé par la notice »** (`bref-parcours`), tranche « Geste à faire vous-même » : la notice Seat Ibiza demande au conducteur un bref parcours à 15-20 km/h après le rebranchement de la batterie (p. 227) ; c'est une action du conducteur, comme la régénération du filtre à particules en roulant, déjà classée « geste ». Ajoutée après la revue (au lieu de « fonctionnement normal »).

Aucun montant en euros.

**Ligne de validation proposée** : « Je valide les pièces « cosses de batterie » et « bref parcours » en geste, et « courroie d'alternateur » en réparation. »

## 3 bis. Plan du site : une paire de liens ajoutée

`data/plan-du-site.json` : lien entre `voyant-batterie` et `voyant-direction`, déclaré du côté de la page batterie (le lien retour est calculé) ; `docs/09` régénéré par `npm run plan:vue` (50 paires de pages liées). Justification : la notice Toyota Yaris (p. 297) relie les deux voyants (une batterie faible peut allumer le voyant de direction assistée), et deux causes de la page direction viennent de la batterie. Les deux pages se citent dans leur texte.

**Ligne de validation proposée** : « Je valide le lien voyant batterie ↔ voyant de direction assistée. »

## 4. Construction de recette (branche d'essai)

Les deux brouillons sont construits sur la branche d'essai `essai/brouillons` (jamais fusionnée), avec les pièces du §3. Seules erreurs attendues : l'absence d'empreinte de validation (R4-VALIDATION-ABSENTE, et le test de la porte 6 qui la vérifie aussi).

## 5. Porte 8 du lot : critères applicables (demande n° 17)

| Critère | Preuve | Statut |
|---|---|---|
| Faits vérifiés sur sources, verdicts validés | Verdicts : base validée le 24/10 ; faits : §1 et §2, notices et arrêté relus (relevés joints) | À valider par Houssem |
| Faits de sécurité et chiffres dans le paquet validé | §1 à §3 | À valider par Houssem |
| Encadrés relus par Houssem | §1 et §2 | À valider |
| Lighthouse mobile ≥ 95 et CLS < 0,1 | CI de la pull request après le passage | À vérifier à la CI |
| Contrôles au vert | Branche d'essai (§4) ; CI de la pull request | Voir §4 |
| Recette de l'étape 9 | Pages relues sur le site construit, après le passage | Après le passage |
| Revue indépendante du diff complet | §6 | À faire |

## 6. Revue indépendante

À compléter.

## 7. Suite, après ta validation

1. Les deux brouillons passent dans `exemples/` avec leur empreinte, et leur question sort de `consignes.json` ; briefs régénérés (`node scripts/briefs.ts`).
2. Passage des deux pages dans `src/content` (règle de passage faite à la main : mêmes vérifications, refaites par la CI) ; adresses ajoutées à la liste Lighthouse. Ce commit de passage est celui que vise ton go.
3. CI verte sur ce commit ; fusion par commit de fusion, puis vérification de la mise en ligne.

## 8. Validation de Houssem

À compléter.
