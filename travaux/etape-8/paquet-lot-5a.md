# Paquet de validation, lot 5a de la vague A : voyant airbag, voyants ABS et ESP (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone : une partie par page. Volume indicatif du lot : 21 172 recherches par mois (plafond, docs/05 : voyant airbag 10 744, voyants ABS et ESP 10 428). Revue indépendante : §5. Le go vaut pour le commit de passage décrit au §6 (brouillons versés avec leur empreinte et déplacés vers `src/content` ; question retirée de `consignes.json`, briefs régénérés, adresses ajoutées à la liste Lighthouse, comme pour les lots précédents) : toute autre modification après ta validation l'annule.
>
> Lot 5b (batterie, direction) : pull request n° 46, paquet à part. Hors de ces lots : voyant frein (décision D4), AdBlue et préchauffage (lot 5c), codes défaut (lot 4).

Les deux pages sont nouvelles. Leurs lignes d'encadré viennent de la base voyants validée le 24/10, reprises telles quelles. Ce qui est à valider : la question, les lignes de l'encadré, les causes et leur coût, une pièce ajoutée au coût probable (§3), un rattachement (§2, voyant ESP et « Défaut frein de parking »), et les faits du texte. Passages relus : `travaux/etape-8/textes/airbag-abs-esp-releve.md` (notices, règlement ONU n° 121) et `controle-technique-releve.md` (arrêté du 18 juin 1991, corrigé après la revue : §5).

## 1. Voyant airbag (`/voyants/airbag/`)

**Titre** : « Voyant airbag allumé : peut-on rouler, que faire ? » · **H1** : « Voyant airbag allumé ou « airbag OFF » : que faire ? »
**Description** : « Voyant airbag allumé : vous pouvez rouler, mais faites contrôler les airbags sans attendre et ne mettez pas de siège enfant à l'avant. Témoin OFF, contrôle technique, notices. »
**Question** : « Puis-je continuer à rouler avec le voyant airbag allumé ? »

**Lignes de l'encadré** (base) :
1. **Voyant airbag allumé (défaut des airbags ou des prétensionneurs)** → **Oui, avec précautions** · À faire tout de suite · « Vous pouvez rouler, mais faites contrôler le système sans attendre : en cas de choc, les airbags risquent de ne pas se déclencher, ou de se déclencher sans raison. En attendant, n'installez pas de siège enfant sur le siège passager avant. » · 5 marques (6 consignes) ; écart : Peugeot sans délai, Dacia « rapidement » pour le témoin seul. Situation affichée : « Le voyant airbag (orange ou rouge selon la voiture)… » : le rouge vient du règlement ONU n° 121 (« jaune et/ou rouge »), que la page cite.
2. **Témoin « airbag passager désactivé » (OFF) allumé** → **Oui, vous pouvez rouler** · Aucune action nécessaire · « C'est normal si un siège enfant dos à la route est installé à l'avant. Sinon, réactivez l'airbag (position ON) voiture à l'arrêt et contact coupé, car il ne se déclencherait pas en cas de choc. » · 5 marques.

**Coût probable (calculé)** : de « Aucun frais » à « Réparation au garage » ; base de calcul : « … de l'airbag passager désactivé volontairement, sans dépense, à la réparation du système d'airbag au garage. »

**Causes** : airbag ou prétensionneur de ceinture défaillant → module d'airbag (réparation ; aucune notice ne nomme la pièce, la tranche est celle du renvoi au réseau) ; airbag passager désactivé avec sa commande → système désactivé (aucun frais).

**Empreinte de l'encadré** : `f3f89321da4743757f1481de5a7b5a75aab5823527e4ce0ecdfe40de35ded7cb` (inchangée par la revue).

**Faits du texte** (relevé joint) :
- Délais : « immédiatement » Seat p. 26 et Toyota p. 293 ; « au plus tôt » Renault p. 137 ; « rapidement » Dacia p. 111 (« au plus tôt » avec le message « Airbag à contrôler », p. 101) ; réseau ou atelier qualifié, Peugeot p. 17 (renvoi (3) p. 13). Aucune notice n'impose l'arrêt.
- Seat p. 27 : avec un défaut, airbags et rétracteurs peuvent se déclencher difficilement, pas du tout, ou de manière inattendue ; ne pas monter de siège enfant à l'avant, ou le retirer.
- Ce que signale le voyant : airbags et prétensionneurs (Peugeot p. 17, Toyota p. 293) ; message « Airbag à contrôler » (Renault p. 124, Dacia p. 101).
- Allumage normal quelques secondes à la mise du contact ; défaillance s'il ne s'allume pas, s'il s'allume moteur tournant, ou s'il clignote (Renault p. 137, Dacia p. 111, Seat p. 27).
- Couleur : orange chez Peugeot (p. 14 et 17), jaune chez Seat (p. 93-94) ; le règlement ONU n° 121 admet le jaune ou le rouge (tableau, n° 22).
- Éteindre : seul cas décrit, Renault p. 106 (commande de l'airbag passager tournée en roulant : témoins airbag et Service ; couper puis remettre le contact) ; Renault p. 81 : toute intervention sur le système complet (airbags, prétensionneurs, boîtier, câblage) interdite sauf personnel qualifié du réseau. Connecteur sous siège et contacteur tournant : non nommés par les notices, la page le dit.
- Témoin OFF : Toyota p. 37 (remettre sur ON sans siège enfant), Seat p. 26 (vérifier s'il doit rester désactivé) ; Renault p. 106-107 (désactivation et réactivation, à l'arrêt, contact coupé, avec le verrou) et Dacia p. 84 (désactivation) ; Peugeot p. 17-18 (siège dos à la route permis airbag désactivé, sauf voyant Airbags allumé ; interdit airbag activé).
- Contrôle technique (Légifrance, relu le 14/11) : 7.1.6.a.2 indicateur de dysfonctionnement du système de retenue supplémentaire : majeure ; 7.1.5.b.2 défaillance signalée via l'interface électronique : majeure ; 7.1.5.d.1 mauvaise configuration de la désactivation de l'airbag passager : mineure ; article 7 : contre-visite dans les deux mois ; réparer avant évite une contre-visite « pour ce point ».
- Non traité (brief) : modèles hors notices lues (206, 307, Clio 2 et 3, Twingo), ni titre ni partie par modèle.

**Ligne de validation proposée** : « Je valide la page voyant airbag : question, encadré (deux lignes de la base, coût et causes, empreinte f3f89321…) et faits du texte. »

## 2. Voyants ABS et ESP (`/voyants/abs-esp/`)

**Titre** : « Voyant ABS ou ESP allumé : peut-on rouler, que faire ? » · **H1** : « Voyants ABS et ESP : que faire quand ils s'allument ? »
**Description** : « Voyant ABS seul : roulez prudemment et faites vérifier sans attendre ; avec le voyant de freinage rouge, arrêtez-vous. Voyant ESP fixe ou qui clignote : ce que disent les notices. »
**Question** : « Puis-je continuer à rouler avec le voyant ABS ou ESP allumé ? »

**Lignes de l'encadré** (base) :
1. **Voyants ABS et freinage allumés ensemble** → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Arrêtez-vous dès que vous pouvez le faire sans danger, en freinant progressivement : le véhicule peut devenir instable au freinage. Ne repartez pas : faites appel à un garage ou à l'assistance. » · 5 marques.
2. **Voyant ABS orange allumé** → **Oui, avec précautions** · À faire tout de suite · « Vous pouvez rouler prudemment, à allure modérée : les roues peuvent se bloquer en cas de freinage fort. Faites vérifier le système sans attendre. Si le voyant de freinage rouge s'allume aussi, arrêtez-vous (ligne « ABS et freinage »). » · 4 marques (6 consignes) ; écart : Peugeot sans délai, Renault et Dacia « rapidement » pour le témoin seul.
3. **Voyant ESP allumé fixe (système défaillant)** → **Oui, avec précautions** · À faire tout de suite · « Vous pouvez rouler prudemment, surtout sur route mouillée ou glissante, car la voiture ne corrige plus les dérapages. Faites vérifier le système sans attendre. » · 4 marques ; écart : Peugeot sans délai.
4. **Voyant ESP clignotant (système en action)** → **Oui, avec précautions** · À faire tout de suite · « Levez le pied et adaptez tout de suite votre vitesse à l'état de la route : le système vous aide à garder la trajectoire, mais la route est glissante. » · 5 marques ; écart : seule Seat donne une consigne.

**Coût probable (calculé)** : de « Aucun frais » à « Grosse réparation » ; base de calcul : « … du système en action ou désactivé, sans dépense, au remplacement du bloc ABS. » La page a une ligne d'arrêt : le dépannage sur autoroute s'affiche de lui-même (demande n° 10).

**Causes** : contrôle de stabilité en action → fonctionnement normal (aucun frais) ; contrôle de stabilité désactivé (témoin à part, marqué OFF chez Peugeot) → système désactivé (aucun frais) ; défaillance de l'ABS → capteur ABS et faisceau (réparation), bloc ABS (grosse réparation) ; le contrôle technique range ces composants parmi les défaillances de l'ABS (point 1.6.1) ; défaillance du répartiteur ou des dispositifs de freinage → bloc ABS (grosse réparation, **pièce nouvelle**, §3).

**Empreinte de l'encadré** : `67c73059442c2ca8619bdccbde91b6293e894a7e4dccb006a70ca5e4980cfe47` (après les deux revues : pièces des causes, bloc ABS en grosse réparation, base de calcul).

**Rattachement à valider** : la partie « Voyant ESP et message « Défaut frein de parking » (Peugeot 208) » distingue les trois cas de la notice. (1) Témoins du contrôle de stabilité et Service fixes (p. 17) : la ligne « Voyant ESP allumé fixe » est appliquée (**Oui, avec précautions**, faire vérifier sans attendre), du même niveau que la consigne Peugeot (desserrage manuel, ou réseau et atelier qualifié, renvoi (3)). (2) Témoin Service seul, ou témoins du frein de stationnement électrique (p. 14 et 16) : la consigne Peugeot est citée, « faire appel au réseau ou à un atelier qualifié » (renvoi (2), que la grille classe « Non, ne poursuivez pas votre trajet »), sans ligne de la base. (3) Témoin rouge du frein de stationnement électrique qui clignote (p. 14) : arrêt, contact coupé, puis faire appel au réseau (renvois (1) et (2)), cité sans ligne de la base. Les lignes du frein de stationnement électrique relèvent de la page du voyant frein (lot suivant).

**Faits du texte** (relevé joint) :
- ABS seul : freinage classique conservé (Peugeot p. 17, Renault p. 138, Dacia p. 112) ; Peugeot : rouler prudemment à allure modérée ; Toyota p. 293 : faire vérifier immédiatement ; aucune distance à ne pas dépasser dans les notices lues. Dessin : les lettres ABS dans un cercle ; jaune selon le règlement ONU n° 121 (n° 26), orange chez Peugeot.
- ABS et freinage : Toyota p. 298 (très instable au freinage) ; Seat p. 251 (roues arrière bloquées, arrière qui dérape) ; Renault p. 213 et Dacia p. 184-185 (« Panne du système de freinage » avec plusieurs témoins : freinage partiellement assuré, dangereux de freiner brusquement, arrêt impératif et immédiat).
- ESP : jaune chez Seat (p. 93-94), orange chez Peugeot (le règlement ONU n° 121 n'est pas cité pour l'ESP : une version plus récente renvoie à d'autres règlements pour ce témoin, relevé `reglement-onu-121.md`) ; noms dans les notices (CDS Peugeot, ESC Renault, Dacia et Seat, VSC Toyota) ; correction par le freinage de certaines roues ou la puissance du moteur (Renault p. 213) ; antipatinage ASR (Peugeot, Seat) ou TRC (Toyota) ; clignote : régulation en cas de perte d'adhérence ou de trajectoire (Peugeot p. 17), adapter immédiatement sa vitesse (Seat p. 255) ; **fixe : défaut**, si on ne l'a pas désactivé soi-même ou s'il s'allume avec le témoin Service ou un message (condition de la ligne de la base) ; système désactivé : témoin à part marqué OFF chez Peugeot (p. 17, système réactivé au démarrage et vers 50 km/h) ; Seat p. 254 ; Renault p. 138, Dacia p. 112 et Toyota p. 62-64 nomment un témoin du système indisponible ou désactivé sans toujours dire quand il s'allume : si on n'a rien désactivé, consigne du voyant fixe.
- ABS et ESP ensemble : Seat p. 254 (l'ESC fonctionne avec l'ABS) ; Renault p. 212 et Dacia p. 184 (ABS, ESC et aide au freinage d'urgence désactivés, freinage toujours assuré).
- « Défaut frein de parking » : Peugeot p. 17 (contrôle de stabilité et Service : freinage de secours sans ses performances optimales ; desserrage manuel, ou renvoi (3)) ; p. 14 (Service seul : desserrage automatique indisponible ; frein de stationnement électrique qui clignote : arrêt, contact coupé) et p. 16 (anomalies du frein de stationnement électrique) : renvoi (2).
- Éteindre : aucune manipulation décrite ; désactivation à la main de l'ESC ou de l'ASR seulement (Peugeot, Seat) ; extinction au bout de 2 secondes environ (Seat p. 254) ; ABS qui ne s'éteint pas après la mise sous contact : défaillance (Dacia p. 112).
- Contrôle technique : 1.6.1 a.2 (dispositif d'alerte qui fonctionne mal), b.2 (dispositif d'alerte qui indique un mauvais fonctionnement), c.2, d.2, e.2 (capteur de roue, câblage, autres composants) : majeures ; **7.12.1 contrôle électronique de stabilité** (capteur, câblage, autres composants, commutateur, indicateur de dysfonctionnement) : majeures ; article 7.
- Non traité (brief) : prix d'un bloc ABS (01 : le coût probable donne sa tranche) ; Toyota Land Cruiser, 206.

**Ligne de validation proposée** : « Je valide la page voyants ABS et ESP : question, encadré (quatre lignes de la base, coût et causes avec le bloc ABS, empreinte 67c73059…), rattachement des cas « Défaut frein de parking », et faits du texte. »

## 3. Donnée ajoutée : une pièce du coût probable

`data/couts.json` : **« Bloc ABS (groupe hydraulique et calculateur) »** (`bloc-abs`), tranche « Grosse réparation », pour les causes « défaillance de l'ABS » et « défaillance du répartiteur ou des dispositifs de freinage ». Raison : le brief demande que le coût probable réponde à « prix d'un bloc ABS » par sa tranche, sans prix ; aucune pièce de la liste ne couvrait le groupe hydraulique. Tranche : la plus lourde plausible (règle du coût, « en cas de doute »), comme la direction assistée et le système AdBlue, déjà classés « Grosse réparation » ; la seconde revue a relevé que la première proposition (« Réparation au garage ») s'en écartait. Autre choix possible : « Réparation au garage » (les notices renvoient au réseau sans annoncer de dégât grave). La plage de la page va ainsi jusqu'à « Grosse réparation ». Aucun montant en euros.

**Ligne de validation proposée** : « Je valide la pièce « bloc ABS » en tranche grosse réparation. »

## 4. Construction de recette et contrôles

- Branche d'essai `essai/brouillons` (jamais fusionnée) : les brouillons y sont construits comme de vraies pages. Run 43609641948 (avant la revue) : recette de 12 pages, seules erreurs les deux R4-VALIDATION-ABSENTE attendues ; part citée et expressions interdites passées. Dans le job « Contrôles », seul le test de la porte 6 échoue (exemple sans empreinte, attendu) ; la construction et les liens de ce job sont alors sautés : la preuve de construction vient du job « Recette ». Après les deux revues : run 43614869107 (lots 5a et 5b ensemble, 14 pages construites) : recette sans erreur bloquante, seules erreurs les quatre R4-VALIDATION-ABSENTE attendues ; job « Contrôles » : 705 tests passés, seul celui de la porte 6 échoue (attendu).
- Pull request n° 45 : CI verte au dernier commit des corrections (run 43614799345 : contrôles, recette, Lighthouse, production en ligne).
- Alertes déjà présentes sur `main`, inchangées : « impérativement » dans les consignes Renault et Dacia de la ligne `airbag-passager-desactive` (l'adverbe porte sur la vérification du témoin, ligne validée le 24/10) ; « pas d'image » pour les articles.

| Critère de la porte 8 (lot) | Preuve | Statut |
|---|---|---|
| Faits vérifiés sur sources, verdicts validés | Verdicts : base validée le 24/10 ; faits : §1 et §2, notices, règlement ONU et arrêté relus (relevés joints) | À valider par Houssem |
| Faits de sécurité et chiffres dans le paquet validé | §1 à §3 | À valider par Houssem |
| Encadrés relus par Houssem | §1 et §2 | À valider |
| Lighthouse mobile ≥ 95 et CLS < 0,1 | CI de la pull request après le passage | À vérifier à la CI |
| Contrôles au vert | §4 ; CI de la pull request après le passage | À vérifier |
| Recette de l'étape 9 | Pages relues sur le site construit, après le passage | Après le passage |
| Revue indépendante du diff complet | §5 | Faite |

## 5. Revue indépendante

**Première revue** (agent sans contexte de la rédaction, diff complet de la pull request à la tête b4291ce, sources relues par le relecteur : Légifrance, PDF Renault, Seat et Peugeot ; Dacia et Toyota sur les extraits) : **« à corriger », un bloquant, six importants**. Vérifié sans constat : les six lignes de l'encadré, les écarts, les pages Renault, Seat et Peugeot, les points 1.6.1, 7.1.5, 7.1.6 et l'article 7 de l'arrêté.

**Ce que la revue a changé** :
- **bloquant** : la page ABS-ESP disait que le contrôle technique ne nomme pas le contrôle de stabilité ; l'annexe I a un point 7.12.1 « Contrôle électronique de stabilité » (capteur, câblage, autres composants, commutateur, indicateur de dysfonctionnement : défaillances majeures), relu par Claude sur Légifrance. Partie retitrée « Voyants ABS et ESP au contrôle technique » ; relevé du contrôle technique corrigé, et recherches d'absence refaites sur un seul mot (« stabilit », « alternateur », « charge de la batterie », « indicateur de dysfonctionnement ») ;
- voyant ESP fixe : défaut, et non « désactivé ou en défaut » ; le système désactivé a un témoin à part (OFF), cité par marque ;
- témoin « airbag OFF » : verdict rappelé sans la condition qui n'est pas dans la base ;
- partie « Voyant ESP et message « Défaut frein de parking » » : cas exact, ligne ESP fixe appliquée (rattachement à valider, §2), témoin du frein de stationnement électrique qui clignote cité avec sa consigne d'arrêt (Peugeot p. 14), phrase rassurante retirée ;
- couleurs sourcées : Peugeot (orange), Seat (jaune, p. 93-94) et règlement ONU n° 121 (n° 22 « jaune et/ou rouge » pour l'airbag, n° 26 et 43 « jaune » pour l'ABS et l'ESP), ce qui fonde aussi le « orange ou rouge » de l'encadré airbag ;
- coût : pièce « bloc ABS » ajoutée (§3) au lieu de « calculateur » ;
- paquet : ligne `abs` à 4 marques ; mineurs : consignes attribuées au modèle de la notice, Dacia « au plus tôt » avec le message, Renault p. 106-107, « évite une contre-visite pour ce point », « l'annexe range parmi les défaillances », « couramment » retiré, description avec l'ESP, distance non donnée par les notices, dessin du voyant ABS, run cité et sauts du job « Contrôles » expliqués.

**Écarté, et pourquoi** : rien d'écarté sur le fond. Le commit de la demande n° 23 (mentions du triangle retirées) reste dans cette pull request : il est annoncé dans sa description, et ne change que des commentaires et de la documentation.

**Seconde revue** (corrections de b4291ce à 4549dff, dernière revue de ce livrable) : **« à corriger », rien de bloquant, trois importants**. Vérifié : point 7.12.1 (Légifrance), règlement ONU n° 121, couleurs des notices, Peugeot p. 17, pages des témoins OFF, verdict du témoin airbag OFF, Dacia p. 101, Renault p. 106-107, ligne `abs` à 4 marques, run 43611946715 (recette sans erreur bloquante). **Changé** : condition de la ligne de la base rétablie pour le voyant ESP fixe (« si vous ne l'avez pas désactivé vous-même… ») et témoins OFF de Renault, Dacia et Toyota présentés sans affirmer quand ils s'allument ; partie « Défaut frein de parking » complétée des cas Peugeot p. 14 et 16 (renvoi (2)) et du « couper le contact, faire appel au réseau » du frein qui clignote ; bloc ABS en « Grosse réparation » ; mineurs : règlement ONU retiré pour la couleur de l'ESP, « la consigne retenue est celle du voyant ESP fixe », fin de la partie contrôle technique avec les deux consignes, « après une désactivation » (airbag OFF), rédaction. Run de recette après ces corrections : cité au §4. **Non relancé** : pas de troisième revue (deux au maximum) ; les corrections reprennent les propositions de la revue ou des passages relus à l'écran (Peugeot p. 14 et 16 sur l'extrait de l'étape 5).

**Reste à vérifier** : pictogrammes des témoins cités (lecture texte seulement) ; Lighthouse des deux pages après le passage.

## 6. Suite, après ta validation

1. Les deux brouillons passent dans `exemples/` avec leur empreinte, et leur question sort de `consignes.json` ; briefs régénérés (`node scripts/briefs.ts`).
2. Passage des deux pages dans `src/content` (règle de passage faite à la main : mêmes vérifications, refaites par la CI) ; adresses ajoutées à la liste Lighthouse. Ce commit de passage est celui que vise ton go.
3. CI verte sur ce commit ; fusion par commit de fusion, puis vérification de la mise en ligne.

## 7. Validation de Houssem

À compléter.
