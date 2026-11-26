# Lot B1 de l'audit n° 2 : paires du plan, meta descriptions, « Signaler une erreur » après la décision, cibles de 44 px

Préparé par Claude le 26/11/2026 (nuit), étape 12, sur les décisions du 26/11/2026 vers 2 h 30 (heure de Tunis), prises
par Claude (chat de pilotage) sur la délégation de Houssem du 25/11 à 23 h 58 (recopiées dans
`travaux/etape-12/audit-2/audit.md`, §10). Branche `etape-12/lot-b1-audit-2`, depuis `main`. Audit :
`travaux/etape-12/audit-2/audit.md` (propositions P2, P6, P9, P10).

## 1. Ce qui change
- **P2, trois paires de liens du plan** (procédure du 23/10 : une paire se propose dans la pull request du lot, avec sa
  justification) — `data/plan-du-site.json`, `docs/09` (parties générées), briefs de P0087 et P0299 :

| Paire (déclarée côté) | Justification, sur les pages |
|---|---|
| Code P0087 ↔ Code P0299 (P0087) | deux codes génériques qui allument le même voyant moteur (même ligne `moteur-orange-fixe` de la base dans l'encadré), tous deux liés à « perte de puissance » dans le plan, et dont la page cite la perte de puissance parmi les symptômes |
| Code P0087 ↔ Voiture qui ne démarre pas (P0087) | la page P0087 cite « des difficultés de démarrage (fiches Hella, 2,2 HDi) » |
| Perte de puissance ↔ Moteur qui surchauffe (perte de puissance) | l'encadré de « perte de puissance » porte la ligne `temperature-rouge` ; « surchauffe » cite, d'après la notice Toyota Yaris, la perte de puissance parmi les signes de surchauffe |

- **P6, 33 meta descriptions à 155 caractères au plus** (table au §2) : chacune reflète l'encadré de sa page (aucun verdict,
  aucune urgence, aucun coût absent de l'encadré) ; date « Mis à jour le », `lastmod` et empreinte de validation inchangés
  (la description n'entre pas dans l'empreinte : `src/lib/empreinte.ts`) ; balises de partage et `description` du JSON-LD
  reprennent la même description (PARTAGE-COHERENCE, DONNEES-STRUCTUREES-CONTENU). **Contrôle d'alerte DESCRIPTION-LONGUE**
  (`DESCRIPTION_LONGUEUR_MAX` = 155, `src/lib/charte.ts`, `scripts/lib/dist.ts`, test dans
  `tests/controles-peu-couteux.test.ts`).
- **P9, demande de changement n° 46** (acceptée le 26/11 par Claude, chat de pilotage, sur la délégation de Houssem du 25/11
  à 23 h 58) : la ligne de transparence se termine par « Méthode · Signaler une
  erreur » (`ligneTransparence`, `src/lib/composants.ts`, appelée avec l'adresse de la page par `gabarit.ts`, `format2.ts`
  et `outil-format2.ts`) ; contrôle SIGNALER-ERREUR-TRANSPARENCE (`scripts/lib/dist.ts`, tests dans
  `tests/composants.test.ts`) ; `docs/10` et `docs/11` (version 9), `CLAUDE.md`, `CONTROLES.md`.
- **P10, cibles de 44 px** (variante de la charte, sans nouvelle demande de changement au-delà de la n° 40 : décision du
  26/11) : liens du fil d'Ariane (marges négatives, mise en page inchangée) et du pied de page (`src/styles/charte-b.css`,
  `docs/11` version 9).
- **Rien d'autre** : aucun verdict, urgence, action, source, coût, adresse, title ni H1 ne change.

## 2. Les 33 descriptions
Les sept pages déjà entre les positions 7,5 et 18 (Search Console du 25/11) sont en tête.

| Page | Avant (car.) | Après (car.) | Nouvelle description |
|---|---|---|---|
| `/batterie-voiture/changer/` (positions 7,5 à 18) | 193 | 153 | Changer sa batterie soi-même ? Plusieurs notices le réservent à un professionnel. Batterie équivalente, ordre des bornes, réglages à refaire, par marque. |
| `/voyants/adblue/` (positions 7,5 à 18) | 190 | 148 | Voyant AdBlue : faites l'appoint avant la fin de l'autonomie affichée. Message de défaut : garage au plus tôt ; avec le voyant moteur, arrêtez-vous. |
| `/batterie-voiture/` (positions 7,5 à 18) | 184 | 152 | Batterie faible ? Tension de 12 volts, message « Batterie faible », œil magique, batterie gelée, voyant rouge : ce que disent les notices, et que faire. |
| `/huile-moteur/verifier-niveau/` (positions 7,5 à 18) | 179 | 152 | Vérifier le niveau d'huile à la jauge, faire l'appoint, réagir à un niveau trop bas, trop haut ou qui baisse : ce que disent les notices de six marques. |
| `/batterie-voiture/recharger/` (positions 7,5 à 18) | 178 | 155 | Recharger une batterie de voiture avec un chargeur de 12 volts, ou démarrer avec une autre voiture : les étapes des notices, et ce qu'il ne faut pas faire. |
| `/moteur-puretech/` (positions 7,5 à 18) | 177 | 153 | Courroie, consommation d'huile, pompe à vide : les rappels publiés par RappelConso, les alertes à ne pas ignorer et la couverture du constructeur, datée. |
| `/pression-des-pneus/` (positions 7,5 à 18) | 171 | 150 | La bonne pression est celle du constructeur : étiquette de la porte conducteur, pneus froids, au moins une fois par mois. Où la lire, comment gonfler. |
| `/voyants/moteur/` | 186 | 145 | Voyant moteur orange, fixe ou clignotant, ou rouge : la notice la plus prudente demande de vous arrêter immédiatement, dès que c'est sans danger. |
| `/voyants/pression-pneus/` | 185 | 151 | Voyant de pression des pneus allumé : ralentissez et arrêtez-vous immédiatement, dès que c'est sans danger. Puis contrôlez, regonflez et réinitialisez. |
| `/bruit-moteur/` | 183 | 144 | Bruit moteur au démarrage, cliquetis, claquement, échappement qui change : ce que les notices jugent normal, et quand faire vérifier la voiture. |
| `/voyants/abs-esp/` | 179 | 151 | Voyant ABS seul : roulez prudemment et faites vérifier sans attendre ; avec le voyant de freinage rouge, arrêtez-vous. Voyant ESP fixe ou qui clignote. |
| `/perte-de-puissance-voiture/` | 178 | 147 | Perte de puissance, essence ou diesel, avec ou sans voyant, à-coups : quand s'arrêter, quand aller au garage, et les causes citées par les notices. |
| `/voiture-ne-demarre-pas/` | 178 | 148 | Voiture qui ne démarre pas ? Regardez d'abord les voyants et le démarreur : batterie à plat, carburant, clé non reconnue. Ce que disent les notices. |
| `/voyants/airbag/` | 175 | 155 | Voyant airbag allumé : vous pouvez rouler, mais faites contrôler les airbags sans attendre et ne mettez pas de siège enfant à l'avant. Témoin OFF, notices. |
| `/fumee-echappement/` | 172 | 145 | Fumée blanche, vapeur d'eau, fumée noire d'un diesel, fumée bleue, fumée sous le capot : ce qui est normal selon les notices, et quand s'arrêter. |
| `/voyants/huile/` | 172 | 154 | Voyant d'huile rouge : arrêtez-vous dès que c'est sans danger, coupez le moteur, même si le niveau est correct. Orange : vérifiez le niveau sans attendre. |
| `/voyants/frein/` | 171 | 152 | Voyant de freinage rouge, frein à main desserré : arrêtez-vous. Témoin d'usure des plaquettes : garage sans attendre. Frein à main serré : desserrez-le. |
| `/huile-moteur/5w40/` | 170 | 150 | Une 5W40 ne convient que si la notice de votre voiture la cite ; aucune des notices lues ne la cite. Sens de 5W et 40, classe C3, ce que dit le bidon. |
| `/loi-montagne/` | 170 | 155 | Loi montagne : du 1er novembre au 31 mars, pneus hiver (symbole alpin et M+S) ou chaînes à bord dans les communes listées par le préfet. Équipements admis. |
| `/usure-des-pneus/` | 169 | 145 | Un pneu est usé quand ses témoins d'usure affleurent la bande de roulement : ne repartez pas sans le changer. Notices, contrôle technique et loi. |
| `/voyants/fap/` | 169 | 154 | Voyant FAP allumé : vous pouvez rouler, mais régénérez le filtre sans attendre, à allure soutenue. Ce que dit chaque notice, causes et contrôle technique. |
| `/voyants/batterie/` | 168 | 151 | Voyant de batterie allumé moteur tournant : arrêtez-vous dès que c'est sans danger, la batterie n'est plus rechargée. Ce que dit chaque notice, causes. |
| `/voyants/direction/` | 167 | 133 | Voyant volant orange : roulez prudemment et faites vérifier la direction sans attendre. Rouge, ou avec le témoin STOP : arrêtez-vous. |
| `/voyants/` | 164 | 146 | Un voyant orange peut imposer l'arrêt : trouvez le vôtre par couleur et lisez si vous pouvez rouler, quand agir et que faire, d'après les notices. |
| `/voiture-qui-broute/` | 163 | 146 | Voiture qui broute ou donne des à-coups, essence ou diesel : le voyant moteur qui clignote, quand s'arrêter, et les causes citées par les notices. |
| `/contre-visite-controle-technique/` | 161 | 149 | Défaillance majeure ou critique : faites réparer avant de rouler. Contre-visite dans les deux mois ; ce délai n'autorise pas à rouler avec le défaut. |
| `/liquide-de-refroidissement/` | 161 | 146 | Mettez le liquide que demande votre notice et lisez le niveau moteur froid. Vase vide : arrêtez-vous. Ce que disent les notices des constructeurs. |
| `/voyants/prechauffage/` | 161 | 148 | Voyant de préchauffage à la mise du contact d'un diesel : normal, attendez qu'il s'éteigne. S'il clignote, faites contrôler le moteur sans attendre. |
| `/codes-defaut/p0299/` | 160 | 150 | Code P0299 : le turbo ne donne pas la pression que demande le calculateur. Avec le voyant moteur allumé, arrêtez-vous d'abord. Causes, cas par marque. |
| `/huile-moteur/5w30/` | 160 | 154 | Une 5W30 ne convient que si la notice de votre voiture la cite, avec la norme qu'elle demande. Sens de 5W et 30, classes C2, C3 et C4, étiquette du bidon. |
| `/huile-moteur/10w40/` | 159 | 153 | Une 10W40 ne convient que si la notice de votre voiture la cite ; aucune des notices lues ne la cite. Ce que veulent dire 10W et 40, ce que dit le bidon. |
| `/codes-defaut/p0420/` | 157 | 147 | Code P0420 : rendement du catalyseur sous le seuil. Avec le voyant moteur allumé, arrêtez-vous d'abord. Causes, cas par marque, contrôle technique. |
| `/nettoyer-fap/` | 157 | 151 | Nettoyer un FAP soi-même ? Les notices ne décrivent qu'une méthode, la régénération en roulant : vitesse, durée, additif, que faire si le voyant reste. |

## 3. Preuves
- **Ce qui ne change pas** (constructions indexables de `main` à 70d18f8 et de la branche, `outils/analyser-seo.mjs` →
  `mesures/seo-avant.json` et `seo-apres.json`) : title, H1, canonical et types de balisage identiques sur les 41 pages ;
  les 37 encadrés de décision identiques octet pour octet (comparaison du HTML de `section.decision`) ; 33 descriptions
  changées, la plus longue à 155 caractères, aucune au-delà.
- **Liens entrants hors gabarit** : P0087 3 → 5, P0299 3 → 4, surchauffe 4 → 5, perte de puissance 8 → 9, « ne démarre
  pas » 7 → 8 (`seo-*.json`, `nbEntrantsContenu`). « À lire aussi » après le lot (`outils/capturer-liees.cjs`) : P0087 :
  voyant moteur, perte de puissance, code P0299, voiture qui ne démarre pas.
- **Premier écran et mise en page** (`outils/capturer-zones.cjs` → `mesures/zones-avant.json`, `zones-apres.json`, P0087,
  perte de puissance, surchauffe, 375 × 667 et 1366 × 800, police chargée et police de secours) : haut du H1, bas de la
  première situation, bas de la ligne de transparence et haut de l'illustration identiques avant et après ; CLS 0 en police
  de secours ; la page s'allonge de 75 px au téléphone et de 30 px sur ordinateur (pied de page), plus « À lire aussi ».
  À 320 px (P0087, police de secours) : première situation inchangée (621 px) ; la ligne de transparence gagne une ligne
  (bas 1 250 → 1 270 px), le bloc « Notices » et le visuel descendent de 20 px.
- **Cibles** : boîtes du fil d'Ariane 45 × 16 → 55 × 47 px, des liens du pied 61 × 17 → 74 × 44 px. **Zone réellement
  touchable** (`outils/zones-touchables.cjs` → `mesures/zones-touchables.json` : hauteur, au milieu du lien, où
  `elementFromPoint` tombe sur lui ; 320, 375 et 1 366 px) : fil d'Ariane 48 à 49 px (peint au-dessus du H1 depuis la revue),
  liens du pied 44 à 49 px, « Signaler une erreur » et « Mentions légales » du pied 47 à 49 px sans chevauchement. Les
  liens de la ligne de transparence (« Méthode », « Signaler une erreur ») restent des liens dans une phrase (16 px de haut,
  17 px touchables), exemptés par WCAG 2.5.8.
- **Captures** (`captures/`) : `avant-*` et `apres-*` : `premier-ecran`, `transparence`, `pied`, `liees` (pages ci-dessus et
  P0299, « ne démarre pas »).
- **Contrôles locaux** : `npm run schemas` (0 erreur), `npm test` (927 sur 927, avant et après la revue), `npm run build` (0 erreur, 36 alertes,
  aucune DESCRIPTION-LONGUE), `npm run liens` (0 problème), `npm run verifier:modes`, indexation durable comparée à
  `origin/main` (0 erreur). CI et Lighthouse : sur la pull request.

## 4. Revue indépendante
Une revue, par un agent qui n'avait pas vu le travail, sur le commit 7d9807e comparé à `main` (70d18f8). **Verdict : à
corriger.** Reproduit par la revue : schémas, 927 tests, construction (0 erreur, 36 alertes, aucune DESCRIPTION-LONGUE), liens,
indexation durable ; title, H1, canonical, signature, sources, tableaux des notices, encadrés, `sitemap.xml` et `robots.txt`
identiques ; JSON-LD et balises de partage différents par la seule description ; paires justifiées par le texte des pages ;
aucune donnée personnelle ni secret. **Aucun verdict, urgence, action, source, coût, title ni H1 ne change dans les pages.**
- **Bloquant, corrigé** : la description de la contre-visite disait « ce délai n'autorise pas à rouler », plus strict que
  l'encadré (« … avec le défaut ») : « avec le défaut » rétabli.
- **Importants, corrigés** :
  - urgence « sans attendre » retirée des descriptions du voyant d'huile (orange) et du voyant de préchauffage : rétablie ;
  - zone touchable du fil d'Ariane réduite à 36-38 px par le H1 peint par-dessus : lien peint au-dessus (`position:relative`),
    48-49 px mesurés ;
  - pied de page : « Signaler une erreur » chevauchait « Mentions légales » au téléphone (marges négatives) : marges
    retirées, 47-49 px touchables, plus de chevauchement ;
  - gouvernance : l'acceptation de la demande n° 46, des paires et de la variante est écrite « par Claude (chat de pilotage)
    sur la délégation de Houssem du 25/11 à 23 h 58 » dans `docs/10`, `docs/11` et `CONTROLES.md` ; les originaux du projet
    Claude (`docs/10`, `docs/11`) restent à mettre à jour hors dépôt (point ouvert du journal).
- **Mineurs, corrigés** : le contrôle SIGNALER-ERREUR-TRANSPARENCE refuse aussi un texte après le lien (tests ajoutés) ;
  ligne de test reformatée ; décalage de 20 px à 320 px mesuré et écrit (§3) ; descriptions reprises (« ralentissez » du
  voyant de pression des pneus, « symbole alpin », « la norme qu'elle demande », « que faire si le voyant reste », bidon,
  « notices des constructeurs » au lieu de « cinq marques ») ; limite de 155 caractères ajoutée à `docs/10` §3.4 et à
  `CLAUDE.md`.
- **Écarté** : rien. **Noté** : le lien de la ligne de transparence reste un lien dans une phrase (16 px), exempté par WCAG
  2.5.8 ; `npm run fixtures` modifie 6 pages de test sur `main` comme sur la branche (hors lot).
- **Non relu après la revue** : ces corrections.
