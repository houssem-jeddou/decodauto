# Paquet de validation, lot 5c de la vague A : voyant AdBlue, voyant de préchauffage (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone : une partie par page. Volume indicatif du lot : 15 484 recherches par mois (plafond, docs/05 : voyant AdBlue 7 900, voyant de préchauffage 7 584). Revue indépendante : §6. Le go vaut pour le commit de passage décrit au §7 (demande n° 24 appliquée avec la nouvelle empreinte de la ligne ; brouillons versés avec leur empreinte et déplacés vers `src/content` ; questions retirées de `consignes.json`, briefs régénérés, adresses ajoutées à la liste Lighthouse, comme pour les lots précédents) : toute autre modification après ta validation l'annule.
>
> Lots 5a et 5b : en ligne depuis le 14/11 au soir. Hors de ce lot : voyant frein (décision D4), codes défaut (lot 4).

Les deux pages sont nouvelles. Ce qui est à valider : la question, les lignes de l'encadré (reprises de la base, sauf une **ligne saisie citée** sur la page préchauffage : verdict de sécurité, §2), le **choix de la consigne retenue pour le voyant AdBlue avec le voyant moteur** (§1), les causes et leur coût, la **demande de changement n° 24** (§3), une paire de liens ajoutée au plan (§3 bis) et les faits du texte. Passages relus : `travaux/etape-8/textes/adblue-prechauffage-releve.md` (notices lues à l'écran le 14/11 ; Seat Ibiza sur l'extrait de l'étape 5).

## 1. Voyant AdBlue (`/voyants/adblue/`)

**Titre** : « Voyant AdBlue allumé : peut-on rouler, que faire ? » · **H1** : « Voyant AdBlue : réserve basse, défaut antipollution ou démarrage impossible »
**Description** : « Voyant AdBlue allumé : faites l'appoint avant la fin de l'autonomie affichée. Avec le voyant Service, garage au plus tôt ; avec le voyant moteur, arrêtez-vous d'abord. Messages de chaque notice. »
**Question** : « Puis-je continuer à rouler avec le voyant AdBlue allumé ? »

**Lignes de l'encadré** (base, reprises telles quelles) :
1. **Voyant AdBlue orange (réserve basse, démarrage bientôt bloqué)** → **Oui, avec précautions** · À faire tout de suite · « Faites l'appoint d'AdBlue sans attendre, à la pompe ou avec un bidon (au moins la quantité minimale indiquée par la notice), avant la fin de l'autonomie affichée : à zéro, le moteur ne redémarre plus. » · 4 marques (7 consignes) ; écart : Seat laisse faire l'appoint dans les kilomètres indiqués, Renault et Dacia le laissent prévoir entre 1 200 et 800 km puis le demandent dès que possible, Peugeot le veut rapide sous 800 km et impératif sous 100 km. Extrait Renault p. 166 corrigé par la demande n° 24 (§3).
2. **Voyant AdBlue avec voyant moteur ou Service (système AdBlue défaillant)** → **Oui, avec précautions** · À faire tout de suite · « Allez au garage au plus tôt, avant la fin des kilomètres affichés : une fois à zéro, le moteur ne redémarre plus. Si de l'AdBlue vient d'être ajouté, signalez-le : un liquide non conforme peut déclencher l'alerte. » · 4 marques ; écart : Seat sans délai.
3. **Voyant moteur orange allumé fixe** (ligne de la page du voyant moteur) → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez que si la notice de votre voiture permet de rouler jusqu'au garage, et faites alors contrôler le moteur sans attendre en roulant prudemment ; sinon, faites appel à un garage ou à l'assistance. » · 5 marques ; le niveau vient de la notice Toyota Yaris (arrêt immédiat).
4. **AdBlue : démarrage impossible (réservoir vide ou système bloqué)** → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Ne repartez pas avant d'avoir fait l'appoint d'AdBlue (au moins la quantité minimale indiquée par la notice), voiture garée dans un endroit sûr et plat. Si c'est un défaut du système AdBlue et non un réservoir vide, faites appel à un garage ou à l'assistance. » · 4 marques (5 consignes) ; écart : Seat impose l'arrêt, les trois autres annoncent que le moteur ne redémarrera pas.

**Choix à valider (verdict)** : la ligne 2 vise « AdBlue avec voyant moteur ou Service » (Oui, avec précautions), la ligne 3 tout voyant moteur orange fixe (arrêt). Pour le voyant AdBlue allumé **avec le voyant moteur**, la page retient la consigne la plus prudente, celle du voyant moteur, comme la page du voyant FAP (lot 3, validée) et la page préchauffage ; la ligne 2 reste celle du voyant Service (Renault, Dacia). La consigne du voyant moteur laisse repartir jusqu'au garage si la notice le permet : c'est le cas de la Peugeot 208 (p. 22 : jusqu'à 1 100 km avant l'antidémarrage), et la page le dit. Recommandé : ce choix, cohérent avec la page du voyant moteur, qui donne l'arrêt pour tout voyant moteur orange fixe. Autre choix possible : la ligne 2 seule pour ce cas (consigne des notices qui le décrivent, Peugeot p. 16), au prix d'une contradiction avec la page du voyant moteur.

**Coût probable (calculé)** : de « Aucun frais » à « Grosse réparation » ; base de calcul : « … de l'appoint déjà fait mais pas encore pris en compte, sans dépense, à la grosse réparation du système AdBlue (réservoir, pompe ou injecteur), en passant par l'appoint d'AdBlue, que vous pouvez faire vous-même. » Lignes d'arrêt : le dépannage sur autoroute s'affiche de lui-même.

**Causes** : appoint pas encore pris en compte par le système → fonctionnement normal (aucun frais ; Renault p. 164, Dacia p. 136, Peugeot p. 171) ; réserve basse ou réservoir vide → appoint d'AdBlue (geste) ; système AdBlue défaillant ou liquide non conforme → système AdBlue (grosse réparation, pièce déjà classée ; aucune notice ne nomme la pièce). Aucune pièce nouvelle.

**Empreinte de l'encadré** : `43ea5d41a6d0cb82cdcd28a503a36ed5e49c315ca6ad566d47dcc2278adb69f2`.

**Faits du texte** (relevé joint) :
- Autonomie, marque par marque : Peugeot p. 15 et 21 (2 400 à 800 km : témoin environ 30 secondes à chaque démarrage, appoint ; 800 à 100 km : fixe avec signal sonore, appoint rapide ; sous 100 km : clignotant, appoint impératif) ; Renault p. 166 et Dacia p. 138 (sous 2 400 km : message sans témoin ; 1 200 à 800 km : témoin ; « XXX KM blocage remplir AdBlue » tous les 100 km environ, puis tous les 50 km sous 200 km ; « 0 KM » : témoin qui clignote (Renault) ou reste allumé (Dacia), démarrage impossible, plein de réactif à faire soi-même) ; Seat p. 286 (message sous 2 400 km, témoin jaune à 1 000 km, rouge à 0 km).
- Quantité minimale : 5 litres pour la Peugeot 208 (p. 22 ; p. 171 : tout appoint d'au moins 5 litres pour être pris en compte), environ 5 litres pour la Seat Ibiza (p. 287).
- Démarrage impossible : Seat p. 286 (arrêter dans un endroit adéquat, sûr et plat, puis appoint ; circuit d'AdBlue défaillant : atelier spécialisé) ; Peugeot, Renault et Dacia : pas de redémarrage sans appoint ou sans intervention du réseau.
- « Défaut antipollution » (Peugeot p. 22) : témoins AdBlue et moteur ; défaut passager : l'alerte disparaît au trajet suivant ; confirmé après 50 km : témoin AdBlue clignotant, « Démarrage interdit dans X km », jusqu'à 1 100 km ; vérification par le réseau ou un atelier qualifié. Renault p. 167 et Dacia p. 139 : témoins AdBlue et Service, trois messages, représentant au plus tôt ; « XXX KM blocage antipollution » : moins de 800 km ; « 0 KM » : pas de redémarrage après coupure du contact.
- Après le remplissage : Renault p. 164 et Dacia p. 136 (démarrer et attendre 10 secondes à l'arrêt, sinon prise en compte après plusieurs dizaines de minutes de roulage, message ou voyants jusque-là) ; Peugeot p. 171 (appoint d'au moins 5 litres ; après une panne d'AdBlue : environ 5 minutes avant de remettre le contact, sans ouvrir la porte du conducteur ni déverrouiller, puis 10 secondes contact mis avant de démarrer) ; Seat p. 286 (liquide rajouté non conforme).
- Qu'est-ce que l'AdBlue : solution à base d'urée ; jusqu'à 85 % des oxydes d'azote transformés en azote et en eau ; réservoir vide : redémarrage empêché par un dispositif réglementaire (Peugeot p. 170) ; norme ISO 22241 (Renault p. 163) ; réservoir d'environ 15 litres (Peugeot p. 170), capacité utilisable d'environ 11 litres (Renault p. 163, Dacia p. 135) ; autonomie affichée à la demande par la touche « Check » (Peugeot p. 21).
- Précautions : moteur arrêté et contact coupé (Renault, Dacia) ; sol plat et horizontal (Peugeot) ; jamais dans le réservoir de gazole, ni dilué ni transvasé (Peugeot p. 170-171) ; gel vers -11 °C (Peugeot) ou -10 °C (Renault, Dacia) ; liquide ininflammable, incolore et inodore, yeux rincés au moins 15 minutes, peau, ingestion, enfants (Peugeot p. 171) ; agressif pour les vêtements, les chaussures et la carrosserie (Renault p. 164), pour les vêtements et la carrosserie (Dacia p. 136) ; contact avec les yeux ou la peau : rincer à l'eau, médecin si besoin (Renault p. 163).
- Notice Toyota Yaris : pas de moteur Diesel, pas d'AdBlue.
- Non traité (brief) : prix et stations (docs/02) ; message « défaut de consommation du réactif » (absent des notices lues) ; Peugeot 308 (pas de partie par modèle).

**Ligne de validation proposée** : « Je valide la page voyant AdBlue : question, encadré (quatre lignes de la base, dont celle du voyant moteur, retenue pour le voyant AdBlue avec le voyant moteur ; coût et causes, empreinte 43ea5d41…) et faits du texte. »

## 2. Voyant de préchauffage (`/voyants/prechauffage/`)

**Titre** : « Voyant préchauffage allumé ou qui clignote : peut-on rouler ? » · **H1** : « Voyant de préchauffage (diesel) : normal au démarrage, défaut s'il clignote »
**Description** : « Voyant de préchauffage allumé à la mise du contact d'un diesel : c'est normal, attendez qu'il s'éteigne. S'il clignote, faites contrôler le moteur sans attendre. »
**Question** : « Puis-je continuer à rouler avec le voyant de préchauffage allumé ou qui clignote ? »

**Lignes de l'encadré** :
1. **Voyant de préchauffage (diesel) allumé au démarrage** (base) → **Oui, vous pouvez rouler** · Aucune action nécessaire · « C'est normal : attendez que le voyant s'éteigne avant de démarrer. » · 4 marques.
2. **Ligne saisie citée, verdict de sécurité à valider** : « Le voyant de préchauffage (spirale) clignote : la gestion du moteur diesel est en défaut ; le moteur peut perdre de la puissance et consommer davantage. » → **Oui, avec précautions** · À faire tout de suite · « Faites contrôler le moteur sans attendre par un atelier. Si le voyant moteur s'allume aussi, c'est sa consigne, plus prudente, qui s'applique. »
   - Source : notice Seat Ibiza, p. 289 (« Gestion du moteur et système d'épuration des gaz d'échappement », Témoins et Nota), extrait : « Clignote. Dysfonctionnement de la gestion du moteur diesel. Faites immédiatement contrôler le moteur par un atelier spécialisé. […] Tant que les voyants […] restent allumés, il est possible que le moteur présente un dysfonctionnement, que la consommation de carburant augmente et que le moteur perde de la puissance. »
   - Niveau tiré de la notice (grille) : « faire contrôler par un atelier » → Oui, avec précautions ; « immédiatement » → À faire tout de suite. Liée à la ligne `prechauffage` de la base, dont elle est plus grave (jamais moins).
   - Une seule notice : Peugeot 208, Renault Clio 5 phase 2, Dacia Sandero 3 et Citroën C3 ne décrivent pas ce clignotement (relu pour le lot 3b) ; la page le dit. Une ligne de la base exigerait 3 marques de 2 groupes (docs/03, règle 10) ; une ligne saisie avec une citation de première main est admise (R3-NIVEAU-SANS-SOURCE), comme pour le témoin d'usure des plaquettes (D4).
3. **Voyant moteur orange allumé fixe** (base, ligne de la page du voyant moteur) → **Non, arrêtez-vous immédiatement** · pour le voyant de préchauffage allumé avec le voyant moteur (la notice Seat p. 289 cite les deux voyants ensemble).

**Coût probable (calculé)** : de « Aucun frais » à « Réparation au garage » ; base de calcul : « … du préchauffage normal au démarrage, sans dépense, à la réparation de la commande électronique du moteur au garage. » Ligne d'arrêt (voyant moteur) : le dépannage sur autoroute s'affiche de lui-même.

**Causes** : préchauffage au démarrage → fonctionnement normal (aucun frais) ; défaut de la gestion du moteur diesel (voyant qui clignote) → calculateur, capteur ou sonde, faisceau et connecteurs (réparation) : les pièces de la cause « défaut d'une commande électronique » de la page du voyant moteur, validée ; aucune notice ne nomme la pièce. Aucune pièce nouvelle. Autre choix possible : « Grosse réparation », si l'on compte l'injection ou le turbo, que la notice ne nomme pas.

**Empreinte de l'encadré** : `9082ad09deff8a58b46a05617cb5abb1d91e313027388aa4eee57a8bbe1aa5c6`.

**Faits du texte** (relevé joint) :
- Allumé au démarrage : Peugeot p. 14 (jusqu'à environ 30 secondes en conditions hivernales sévères, si le climat et la température du moteur le demandent ; attendre l'extinction ; démarrage immédiat à l'extinction, pied sur l'embrayage ou le frein ; sinon, renouveler la demande) ; Renault p. 139 et Dacia p. 113 (doit s'allumer contact mis ; bougies de préchauffage en fonctionnement ; s'éteint quand le préchauffage est obtenu) ; Seat p. 289 (démarrage immédiat quand il s'éteint).
- Clignote : Seat p. 289 (dysfonctionnement de la gestion du moteur diesel, contrôle immédiat par un atelier spécialisé ; Nota : consommation en hausse et perte de puissance possibles tant que les voyants restent allumés ; baisse de puissance ou fonctionnement irrégulier : faire réviser la voiture).
- Volkswagen, Audi, 2.0 TDI (brief) : la notice Seat ne vaut que pour son modèle ; renvoi à la notice de la voiture.
- Dessin : une spirale ; lien vers la liste des voyants pour reconnaître un autre voyant orange qui clignote.
- Notice Toyota Yaris : pas de moteur Diesel.
- Non traité (brief) : Clio 2, Trafic 2 (pas de page par modèle) ; codes P0380 et P1351 (lot 4, pas encore écrits : aucun lien).

**Ligne de validation proposée** : « Je valide la page voyant de préchauffage : question, encadré (deux lignes de la base et la ligne saisie « voyant qui clignote » : Oui avec précautions, À faire tout de suite, Seat p. 289), coût et causes, empreinte 9082ad09…, et faits du texte. »

## 3. Demande de changement n° 24 (base voyants)

Texte complet : `travaux/etape-8/demande-changement-24.md`. Ligne `adblue-reserve` : dans l'extrait de la citation Renault p. 166 du message « XXX KM blocage remplir AdBlue », « [témoin] clignote » devient « [témoin] s'allume » (tableau de la notice relu à l'écran : le témoin ne clignote qu'à « 0 KM » ; l'extraction de l'étape 5 avait décalé les cases). Verdict, urgence, action et écart inchangés. Nouvelle empreinte de la ligne : `003b8d8936d6fd50d8ce314806a34097319f8b1cba7d7ed7a27f80909ec38930`. Un test de la grille des coûts est précisé (début d'extrait allongé), sans affaiblir le contrôle. Aucune page en ligne ne montre l'extrait ; sans correction, le tableau des notices de la page AdBlue l'afficherait.

**Ligne de validation proposée** : « J'accepte la demande n° 24 : extrait Renault p. 166 de la ligne adblue-reserve corrigé (« s'allume » au lieu de « clignote »), verdict inchangé. »

## 3 bis. Plan du site : une paire de liens ajoutée

`data/plan-du-site.json` : lien entre `voyant-prechauffage` et `voyant-moteur`, déclaré du côté de la page préchauffage (le lien retour est calculé) ; `docs/09` régénéré par `npm run plan:vue` (51 paires de pages liées). Justification : l'encadré de la page préchauffage reprend la ligne du voyant moteur orange fixe, et la notice Seat Ibiza (p. 289) cite les deux voyants ensemble ; le lecteur qui voit les deux allumés a besoin de la page du voyant moteur. La page AdBlue, déjà liée au voyant moteur dans le plan, le cite aussi.

**Ligne de validation proposée** : « Je valide le lien voyant de préchauffage ↔ voyant moteur. »

## 4. Construction de recette (branche d'essai)

Les deux brouillons sont construits sur la branche d'essai `essai/brouillons` (jamais fusionnée), avec la demande n° 24 appliquée sans recalcul de l'empreinte de la ligne (état attendu avant ton accord, comme pour la demande n° 23).

- Run 43624580718 : recette sans erreur bloquante ; seules erreurs, les trois attendues (absence d'empreinte des deux pages, empreinte de la ligne `adblue-reserve`). Job « Contrôles » : le test de la porte 6 échoue (attendu), les tests qui contrôlent toute la base échouent sur l'empreinte de la ligne (attendu avant ton accord), et le test de la grille des coûts a révélé la référence ambiguë corrigée au §3.
- Run 43625064596 (après la correction du test et la relecture des brouillons) : recette sans erreur bloquante, les trois mêmes erreurs attendues ; job « Contrôles » : 699 tests passés ; les 7 échecs sont le test de la porte 6 et les tests qui vérifient toute la base, tous sur la seule empreinte de la ligne `adblue-reserve` (attendu avant ton accord) ; le test de la grille des coûts passe sur la référence précisée.
- Après la revue : run cité au §6.

## 5. Porte 8 du lot : critères applicables (demande n° 17)

| Critère | Preuve | Statut |
|---|---|---|
| Faits vérifiés sur sources, verdicts validés | Verdicts : base validée le 24/10, ligne saisie citée (§2) ; faits : §1 et §2, notices relues (relevé joint) | À valider par Houssem |
| Faits de sécurité et chiffres dans le paquet validé | §1 à §3 | À valider par Houssem |
| Encadrés relus par Houssem | §1 et §2 | À valider |
| Lighthouse mobile ≥ 95 et CLS < 0,1 | CI de la pull request après le passage | À vérifier à la CI |
| Contrôles au vert | §4 ; CI de la pull request après le passage | À vérifier |
| Recette de l'étape 9 | Pages relues sur le site construit, après le passage | Après le passage |
| Revue indépendante du diff complet | §6 | À faire |

## 6. Revue indépendante

À faire.

## 7. Suite, après ta validation

1. Demande n° 24 appliquée : extrait corrigé, empreinte de la ligne `003b8d89…` versée.
2. Les deux brouillons passent dans `exemples/` avec leur empreinte, et leur question sort de `consignes.json` ; briefs régénérés (`node scripts/briefs.ts`).
3. Passage des deux pages dans `src/content` (règle de passage faite à la main : mêmes vérifications, refaites par la CI) ; adresses ajoutées à la liste Lighthouse. Ce commit est celui que vise ton go.
4. CI verte sur ce commit ; fusion par commit de fusion, puis vérification de la mise en ligne.

## 8. Validation de Houssem

À compléter.
