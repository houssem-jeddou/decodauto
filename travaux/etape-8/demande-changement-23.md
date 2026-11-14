# Demande de changement n° 23 : base voyants, témoin STOP rattaché à la page outil

**Statut : proposée le 14/11/2026 avec le lot 3b, à accepter par Houssem.** Origine : décision 8 du paquet 8.1 (validée le 04/11/2026, 13 h 48 : « court paquet de lignes à ajouter à la base avec le lot 8.3, avant la mise en ligne de l'outil » ; recommandé : « ajouter au moins STOP et le triangle à la base ») ; livrable 8.3.3 du découpage (`decoupage-8.3.md`), qui demande de trancher d'abord la page de rattachement et prévoit le repli « sans 3 marques, pas de ligne en base ; le triangle reste cité sans verdict » ; règle 6 de `CLAUDE.md` (partir de sa recommandation). Version révisée après la revue indépendante (constat bloquant B1, §6 du paquet).

## Élément concerné

- `data/voyants.json`, base voyants validée le 24/10/2026 (étape 5, figée) : 25 lignes, aucune pour le témoin STOP seul.
- La structure validée (docs/08 §3, règle 1 : chaque voyant est rattaché à une page qui le déclare ; règle 12 : toute page à laquelle un voyant de la base est rattaché affiche son tableau « Ce que dit la notice de votre marque » ; contrôles R1-RATTACHEMENT et TABLEAU-NOTICES-*). Le plan du site n'a pas de page pour STOP.

## Changement proposé

### 1. Une ligne ajoutée à la base : `stop`, « Voyant STOP rouge » (texte complet : `lignes-demande-23.json` ; pictogramme dessiné par nos soins : `pictogrammes/stop.svg`)

- Situation : le témoin STOP s'allume en roulant, avec un autre témoin ou un message, et un signal sonore ; défaut grave détecté (moteur, freinage, direction, circuit électrique).
- Verdict **Non, arrêtez-vous immédiatement**, urgence **À faire tout de suite**, action identique à celle de la ligne validée `moteur-rouge`.
- Quatre notices de deux groupes, toutes au même niveau (arrêt impératif), sans écart : Renault Clio 5 phase 2 p. 137, Dacia Sandero 3 p. 110, Peugeot 208 p. 13, Citroën C3 p. 10 (renvois p. 9). Passages relevés : `textes/stop-triangle-releve.md`.
- Placée dans la base avant `moteur-rouge` : elle ouvre la liste des voyants rouges de l'outil (tri par verdict, urgence, puis ordre de la base).

### 2. Rattachement à la page outil (structure)

La ligne a `page: voyants`. Règle ajoutée : une ligne sans page propre se rattache à la page outil, qui l'affiche dans sa liste et son index (comme toute la base) ; la page outil n'a pas à la reprendre dans son encadré, n'affiche pas de tableau des notices (l'outil cite les pages des notices sous chaque ligne ; le texte de l'outil cite la consigne de STOP) ; la liste ne fait pas de lien vers l'outil lui-même. Seules les lignes admises par une demande de changement sont rattachées à l'outil (test : aujourd'hui `stop` seule). Le contrôle R7-LIEN-OUTIL exemptait déjà ce cas.

Modifié : `src/lib/controle.ts` (R1-RATTACHEMENT, message de TABLEAU-NOTICES-INCOMPLET), `src/lib/tableau-notices.ts` (pas de tableau sur la page outil), `src/lib/outil-voyants.ts` (pas de lien vers soi), `scripts/lib/briefs.ts` (brief de l'outil), tests (`controle`, `tableau-notices`, `outil-voyants`), `CONTROLES.md`, `CLAUDE.md` ; après acceptation, règles 1 et 12 de docs/08 §3 par la pull request `docs/`.

Conséquence : les extraits de la ligne STOP ne s'affichent pas dans un tableau des notices ; le lecteur voit sous la ligne les notices et pages citées, et le texte de l'outil cite la consigne de Renault et Dacia.

Écarté : une page pour STOP (le plan est figé, et les recherches « voyant rouge » sont rattachées à l'outil) ; reprendre STOP dans l'encadré de l'outil (sa règle validée : une ligne par verdict présent dans le groupe orange).

### 3. Triangle avec un point d'exclamation : pas de ligne (repli du livrable 8.3.3)

Seules les notices Renault (p. 138) et Dacia (p. 112), d'un même groupe, donnent une consigne propre au triangle (« témoin d'alerte »). Seat (p. 93) décrit le « voyant central d'alerte » sans consigne propre : la consigne de la p. 84 (priorités 1 et 2) est un texte général, valable pour tous les symboles rouges ou jaunes, et la décision D2 de l'étape 5 dit qu'un texte général ne fixe pas le niveau d'un témoin. Sans trois marques de deux groupes, pas de ligne : le texte de l'outil cite le triangle sans verdict, avec les consignes de Renault et Dacia et la description de Seat.

### 4. Préchauffage qui clignote : pas de ligne

Une seule notice sur cinq le décrit (Seat p. 289). Le texte de l'outil continue de le citer avec sa source, sans verdict de la base ; la page du préchauffage (lot 5) portera une ligne saisie liée au voyant `prechauffage`.

## Raison

La décision 8 de 8.1 ne laisse pas mettre l'outil en ligne sans STOP dans la base : le texte de l'outil le cite aujourd'hui « sans ligne propre dans la liste », loin sous la liste sur téléphone. Avec la ligne, un conducteur qui voit STOP le trouve dans l'index des dessins, avec son verdict. La page outil totalise 142 516 recherches par mois (plafond, docs/05), dont « voyant rouge voiture signification », « voyant rouge dacia » et « voyant rouge clignotant » (316 chacune).

## Impact sur ce qui est validé

- Base voyants : 25 → 26 lignes ; les 25 lignes existantes et leurs empreintes ne changent pas. La nouvelle ligne reçoit son empreinte après ton accord (`e7d593d5…`, calculée par `empreinteVoyant` du dépôt).
- Page outil (pas encore en ligne) : l'encadré ne change pas (empreinte du 04/11 `4555601a…` inchangée) ; le texte change (STOP mène à sa ligne, triangle mieux décrit, notice Citroën C3 ajoutée) ; la liste et l'index affichent la ligne d'eux-mêmes (26 entrées, dont 10 rouges).
- Aucune page en ligne ne change.

## Contrôles à relancer

Base voyants (R3, R4-EMPREINTE, R8, PICTO-*), R1-RATTACHEMENT, TABLEAU-NOTICES-*, OUTIL-* et construction complète ; recette de la page outil (filtre, index, lecteur d'écran, téléphone). Essai fait sur la branche d'essai : ligne et page appliquées, seule l'empreinte de la ligne attendue en erreur.

**Ligne de validation proposée** : « J'accepte la demande n° 23 : ligne STOP (Non, arrêtez-vous immédiatement) ajoutée à la base et rattachée à la page outil ; triangle et préchauffage qui clignote cités sans verdict. »
