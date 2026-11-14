# Paquet de validation, lot 5d de la vague A : voyant frein (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone. Volume indicatif : 20 540 recherches par mois (plafond, docs/05 : voyant frein, voyant liquide de frein, voyant frein à main, voyant plaquette de frein, liquide de frein voyant, 3 160 chacun, et leurs variantes). Revue indépendante : §5. Le go vaudra pour le commit de passage (empreinte versée après la validation, page déplacée vers `src/content`, adresse ajoutée à la liste Lighthouse), comme pour les lots précédents.
>
> Décision D4 de l'étape 5 levée : le témoin d'usure des plaquettes est décrit par la notice **Seat Leon** (4e génération, édition 06/21, p. 297-298), trouvée le 14/11 au soir et ajoutée au registre. Relevé : `travaux/etape-8/textes/frein-releve.md`.

La page est nouvelle. Ce qui est à valider : la question, la **ligne saisie citée** du témoin d'usure des plaquettes (verdict de sécurité, §1), les deux lignes de la base reprises telles quelles, les causes et **deux pièces nouvelles** (§2), la **nouvelle source** (§3) et les faits du texte (§4).

## Voyant frein (`/voyants/frein/`)

**Titre** : « Voyant frein allumé : liquide, plaquettes, frein à main, peut-on rouler ? » · **H1** : « Voyant frein : liquide de frein bas, plaquettes usées ou frein à main serré ? »
**Description** : « Voyant de freinage rouge, frein à main desserré : arrêtez-vous. Témoin jaune des plaquettes : garage sans attendre. Frein à main serré : desserrez-le. »
**Question** : « Puis-je continuer à rouler avec le voyant de frein allumé ? »

### 1. Lignes de l'encadré
1. **Voyant de freinage rouge (liquide de frein ou circuit de freinage)** (base, reprise telle quelle) → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez pas : faites appel à un garage ou à l'assistance. Le niveau de liquide de frein peut être complété avec le liquide préconisé, mais si le voyant reste allumé, le véhicule ne doit pas rouler. » · 5 marques, sans écart.
2. **Ligne saisie citée, verdict de sécurité à valider** : « Le témoin d'usure des plaquettes de frein s'allume, sur les voitures qui en ont un : les plaquettes sont usées. » → **Oui, avec précautions** · À faire tout de suite · « Allez sans attendre dans un garage pour faire contrôler les plaquettes et remplacer celles qui sont usées. Si le voyant de freinage rouge s'allume aussi, c'est sa consigne, plus prudente, qui s'applique. »
   - Source : notice Seat Leon, p. 297-298 (« Système de freinage », Témoins et AVERTISSEMENT), extrait : « S'allume en jaune. Plaquettes de frein avant usées. Adressez-vous immédiatement à un garage spécialisé. […] Si le témoin […] s'allume, seul ou en combinaison avec un message à l'écran du combiné d'instruments, rendez-vous immédiatement […] pour qu'il contrôle les plaquettes de frein et qu'il remplace celles qui sont usées. »
   - Niveau tiré de la notice (grille) : « adressez-vous à un garage » laisse rouler jusqu'au garage → Oui, avec précautions ; « immédiatement » → À faire tout de suite. Rien n'impose l'arrêt.
   - Une seule notice : les six autres notices lues ne décrivent pas ce témoin ; la page le dit et renvoie à la notice de la voiture. Une ligne de la base exigerait 3 marques de 2 groupes (03, règle 10) ; une ligne saisie avec une citation de première main est admise, comme pour le voyant de préchauffage qui clignote (lot 5c).
   - Sans `voyant_lie` : aucune ligne de la base ne décrit ce témoin.
3. **Voyant de frein de stationnement (frein à main serré)** (base) → **Oui, vous pouvez rouler** · Aucune action nécessaire · « Desserrez complètement le frein de stationnement avant de rouler : le voyant doit s'éteindre. » · 5 marques, sans écart.

### 2. Coût probable et causes
**Coût probable (calculé)** : de « Aucun frais » à « Grosse réparation » ; base de calcul : « … du frein de stationnement resté serré, sans dépense, au remplacement du servofrein. » Ligne d'arrêt : le dépannage sur autoroute s'affiche de lui-même.

**Causes** :
- frein de stationnement serré ou mal desserré (Peugeot 208 p. 14 ; Seat Ibiza p. 251 et Toyota Yaris p. 118 : le témoin s'éteint quand on le desserre) → frein de stationnement serré (aucun frais) ;
- plaquettes de frein usées (Seat Leon p. 297-298) → plaquettes et disques de frein (entretien, pièce déjà classée) ;
- circuit de freinage qui n'est plus étanche, niveau de liquide bas (Seat Leon p. 370 ; Peugeot 208 p. 14 : baisse importante du niveau) → **circuit de freinage (canalisations, flexibles, maître-cylindre)**, pièce nouvelle, **réparation** ;
- défaut du circuit ou du système de freinage, dont le servofrein (Seat Ibiza p. 251, Renault p. 137, Dacia p. 110-111, Toyota p. 292 : pièce non nommée ; Seat Leon p. 304 : panne du servofrein électromécanique, symbole rouge) → circuit de freinage et **servofrein (assistance de freinage)**, pièce nouvelle, **grosse réparation** (règle de la tranche la plus lourde plausible : la notice Seat Leon décrit un servofrein électromécanique ; même tranche que le bloc ABS et la direction assistée).

**Empreinte de l'encadré (brouillon, avant la revue)** : `03ec68331c9b9ae750b6df3c2e509becbf3544af6516bd0f843ee4b406b850f2`. Elle ne sera versée qu'après ta validation.

### 3. Source nouvelle au registre
`notice-seat-leon` : « Seat Leon — Notice d'utilisation (édition 06/21) », Seat (groupe Volkswagen), notice constructeur, https://www.seat.fr/datamanual-manual/leon/my22_w25/fr-fr/LEON_06_21_FR.pdf, consultée le 14/11/2026, modèle « Leon (4e génération, 5 portes et Sportstourer), notice édition 06/21 ». Seat est une marque de référence (groupe Volkswagen). Lue par extraction du texte du PDF : les pictogrammes n'ont pas été vus (relevé, « Limites »).

### 4. Faits du texte (relevé joint)
- Voyant de freinage rouge : toutes les notices lues demandent l'arrêt (Seat Ibiza p. 251 « Ne continuez pas de rouler ! », comme Seat Leon p. 297 ; Toyota p. 292 ; Renault p. 137 et Dacia p. 110-111 : au freinage, avec le témoin STOP et un signal sonore ; Peugeot p. 13-14).
- Liquide de frein : niveau qui baisse sensiblement en peu de temps ou sous le repère → système peut-être plus étanche, faire appel à un spécialiste (Seat Leon p. 370) ; appoint avec un liquide conforme après l'arrêt, puis réseau ou atelier si le problème persiste (Peugeot p. 14, renvois p. 13).
- Plaquettes : témoin jaune, plaquettes avant usées, garage immédiatement ; seul ou avec un message : atelier immédiatement pour contrôle et remplacement (Seat Leon p. 297-298). Aucune notice ne donne de distance. Témoin qui reste allumé après le remplacement : aucune notice n'en donne la raison ; au contrôle technique, faisceau du témoin d'usure déconnecté ou détérioré : défaillance (annexe I, 1.1.13).
- Frein à main : serré ou mal desserré (Peugeot p. 14) ; signal sonore si l'on roule frein serré (Toyota p. 118) ; s'il reste allumé frein desserré ou s'allume en roulant : ligne du voyant de freinage. Frein électrique : défaut parmi les témoins jaunes (Seat Leon p. 97) ; message « Défaut frein de parking » (Peugeot, détaillé sur la page ABS et ESP).
- Voyant orange ou jaune : témoin d'usure (Seat Leon), voyant ABS (jaune chez Seat Leon p. 97, orange chez Peugeot p. 14 et 17), défaut du frein électrique.
- Servofrein électromécanique en panne : symbole rouge de panne du freinage, pédale qui peut vibrer, appuyer plus fort, distance de freinage plus longue (Seat Leon p. 304) ; consigne du voyant de freinage.
- Messages Renault et Dacia « Système freinage à contrôler » et « Panne du système de freinage » (Renault p. 212-213, Dacia p. 184-185) : renvoi à la page ABS et ESP.
- Contrôle technique : témoin du liquide des freins allumé ou défectueux : mineure (1.1.10) ; usure des plaquettes : importante mineure, marque minimale atteinte majeure, marque minimale non visible critique ; faisceau du témoin d'usure : mineure (1.1.13) ; frein de stationnement, signal avertisseur de dysfonctionnement : majeure (1.1.6) ; majeure : contre-visite dans les deux mois ; critique : validité limitée au jour du contrôle (article 7).
- Non traité : appoint et purge du liquide de frein (page « liquide de frein », vague C) ; marques dont la notice n'a pas été lue (BMW, Mini, Volkswagen : renvoi à la notice) ; prix (docs/02).

### Ligne de validation proposée
« Je valide la page voyant frein : question, encadré (deux lignes de la base et la ligne saisie du témoin d'usure des plaquettes, Seat Leon p. 297-298 : Oui, avec précautions, À faire tout de suite), coût et causes (pièces nouvelles « circuit de freinage » en réparation et « servofrein » en grosse réparation), source Seat Leon et faits du texte. »

## 5. Revue indépendante
À compléter après la revue.
