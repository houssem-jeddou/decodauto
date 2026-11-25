# Paquet du lot U4 : photos sous licence libre (proposition P4, demande de changement n° 42)

Préparé par Claude le 25/11/2026, étape 12, lot U4 de l'audit UX/UI. Branche `etape-12/lot-u4`, pull request en brouillon.
**À valider par Houssem** : la demande n° 42, le composant et les captures, avant toute fusion. Rien n'est fusionné ni
publié.

## 1. Ce que fait le lot
Sur six pages au format 2, une photo de Wikimedia Commons s'ajoute à l'illustration dans l'emplacement du visuel :
- **téléphone** : l'illustration, puis la photo en dessous ;
- **ordinateur** : l'illustration et la photo côte à côte.

La photo a un petit titre, une légende tirée de faits déjà sur la page, et un crédit avec des liens vers la page Commons et
vers la licence. Le registre `data/photos.json` est la seule source. Les fichiers sont produits par `npm run photos`.

La septième photo, celle du témoin d'usure, a été **retirée du lot à la revue indépendante** (§2 et §8) : la page de
l'usure des pneus reste comme avant. Détail, raisons et impact : `travaux/etape-12/demande-changement-42.md`.

## 2. Les photos : original, recadrage, vérification
Aperçus dans `apercus/` :
- `<id>-original.jpg` : l'original réduit à 1 000 px, zones floutées déjà floutées, avec la zone gardée tracée en ambre et
  la zone floutée en rouge ;
- `<id>-recadrage.jpg` : le recadrage, à la même largeur.

Les sept photos ont été acceptées par Houssem le 24/11/2026 à 19 h 19. Auteur, licence et adresse de la licence ont été
relus par l'API de Commons le 25/11/2026 à 11 h 23 : les sept sont conformes. La revue indépendante les a relus elle aussi,
le même jour.

| Page | Photo (id) | Auteur, licence | Original → zone gardée | Modifications |
|---|---|---|---|---|
| /huile-moteur/verifier-niveau/ | `jauge-huile-moteur-skoda-fabia` | Frettie, CC BY 3.0 | 3 888 × 2 592 → 2 925 × 1 950 | recadrée |
| /liquide-de-refroidissement/ | `vase-expansion-liquide-refroidissement-volkswagen-golf` | Filipograf, CC BY-SA 4.0 | 4 368 × 2 912 → 2 808 × 1 872 | recadrée |
| /liquide-de-frein/ | `reservoir-liquide-de-frein-skoda-fabia` | Frettie, CC BY 3.0 | 3 888 × 2 592 → 2 583 × 1 722 | recadrée |
| /pression-des-pneus/ | `etiquette-pression-pneus-porte-honda-accord` | Bindydad123, CC BY-SA 4.0 | 4 000 × 3 000 → 3 400 × 2 267 | recadrée, floutée en partie |
| /loi-montagne/ | `panneau-b58-loi-montagne` | Marc Mongenet, CC BY-SA 4.0 | 4 000 × 3 000 → 1 932 × 1 288 | recadrée |
| /batterie-voiture/recharger/ | `batterie-voiture-bornes-skoda-fabia` | Frettie, CC BY 3.0 | 3 888 × 2 592 → 2 700 × 1 800 | recadrée |
| (retirée) /usure-des-pneus/ | `temoin-usure-pneu` | VVVN, CC BY 3.0 | 4 096 × 3 024 → 1 620 × 1 080 | — |

**Originaux** : tous ont été vérifiés par leur SHA-1, celui que donne Commons.
- Deux ont été téléchargés par le script le 24/11/2026.
- Les cinq autres ont été refusés par Commons : réponse 429 le 24/11, puis encore le 25/11 au matin. Le nouvel en-tête
  User-Agent était en place, et le script a fait un seul nouvel essai, après avoir attendu les 600 s de `Retry-After`.
  Houssem les a téléchargés depuis Commons et transmis.
  - Un premier envoi, en images dans la conversation, est arrivé réduit à 2 000 px et réencodé. Les SHA-1 ne
    correspondaient pas : rien n'en a été utilisé.
  - Un second envoi, en archive .zip, a donné les cinq originaux exacts. Les cinq SHA-1 et les cinq dimensions sont
    conformes.

**Vérification à pleine résolution** (texte complet dans le champ `verification` du registre) :
- **Niveau d'huile** : aucun marquage lisible. Le cadre est resserré sur la poignée orange et le haut du tube.
- **Liquide de refroidissement (n° 2)** : le marquage « topran 103006 » et l'étiquette de vidange manuscrite d'un garage
  sont entièrement hors cadre, sans flou.
  - Le cadre montre le bouchon et le haut du vase, mais pas la ligne de liquide : c'est le prix de l'exclusion de « topran ».
  - La légende dit seulement que le niveau se lit sur ce vase.
- **Liquide de frein** : les marquages coulés du maître-cylindre et l'étiquette du servofrein sont hors cadre. Les repères
  MAX et MIN restent visibles.
- **Pression des pneus** : le code QR de l'étiquette est flouté. Il était lisible à pleine résolution, et son contenu est
  inconnu.
  - Restent lisibles : la dimension des pneus, les pressions, et la mention « TVL T3 », commune à tout un modèle.
  - Une seconde étiquette, floue, est hors cadre.
  - Le crédit dit « recadrée, floutée en partie ». L'aperçu de l'original est flouté lui aussi.
- **Loi montagne** : sont hors cadre la route, un panneau de danger au loin, la vallée habitée, la crête, et le second
  panonceau (« sur l'ensemble du département »), que la page ne commente pas.
  - Restent : le panneau B58, le panonceau « du 01/11 au 31/03 », des sapins et le ciel.
  - Le cadre a été resserré après la revue : 1 932 px de large, au-dessus du minimum de 1 600.
- **Batterie (n° 7)** : les bornes + et − sont visibles, avec leurs pastilles.
  - Le cadre a été agrandi vers le bas après la revue, pour montrer la borne négative et sa cosse.
  - Hors cadre : la référence imprimée (« 1J0 915 105 AB »), les caractéristiques de la batterie et le marquage du câble
    rouge.
  - Les marquages de la cosse négative et du câble noir sont illisibles, hors de la zone nette.
- **Les six photos** : aucune plaque, aucun numéro de série ni code de fabrication lisible, aucun kilométrage, aucun
  visage, aucun reflet ni lieu reconnaissable.

**Photo retirée : le témoin d'usure (n° 5)** (aperçus `apercus/retiree-temoin-usure-pneu-*.jpg`).
- Selon la description de Commons, la photo montre à gauche une barre d'usure (« Wear Bar ») et à droite le témoin d'usure
  (« Tread Wear Indicator »).
- Le recadrage demandé, sur le seul témoin de droite, au moins 1 600 px de large, met forcément le témoin au bord du cadre.
  La barre de gauche s'arrête vers 2 004 px ; le cadre ne peut pas commencer avant.
- À la largeur servie (324 à 326 px), la bosse ne se distingue pas. Le sujet visible devient les pavés de la bande de
  roulement, et le triangle est dans le coin.
- La légende aurait décrit ce que le lecteur ne voit pas. La revue l'a classé bloquant, et je retire la photo du lot.
- **Proposition** : choisir sur Commons une autre photo où le témoin est net et central, à faire accepter par Houssem,
  dans un lot suivant.

**Légendes** : faits déjà sur la page, sans consigne nouvelle. Phrase de la page reprise, ou consigne à laquelle la légende
renvoie :

| Page | Fait de la page |
|---|---|
| niveau d'huile | « Entre les repères mini et maxi de la jauge » ; étape « Sortez la jauge » |
| liquide de refroidissement | « Où lire le niveau : le vase d'expansion », moteur froid |
| liquide de frein | repères MAX et MIN du réservoir |
| pression des pneus | valeurs « propres à chaque voiture » ; « c'est sa notice et son étiquette qui font foi » ; avant, arrière, roue de secours |
| loi montagne | « un panneau B58, complété par un panonceau « du 01/11 au 31/03 » » |
| batterie | « la borne (+) », « la borne (-) » |

**Fichiers produits** : 18 WebP en 480, 800 et 1 200 px dans `src/photos/`, avec `empreintes.json`. Aucun EXIF, XMP, IPTC
ni profil ICC (contrôle PHOTO-FICHIER, tests ; recoupé par la revue).

## 3. Composant « Visuel avec photo »
Dessin, états et contrastes : demande n° 42, §3. Captures des états, au téléphone, sur la page du liquide de frein
(`travaux/etape-12/lot-u4/capturer-etats.cjs`) :

| État | Capture | Mesure |
|---|---|---|
| **Focus clavier** sur le lien de l'auteur | `captures/liquide-de-frein-375-etat-focus.png` | contour plein de 3 px en bleu clair de nuit (`--focus`) |
| **Couleurs forcées** (`forced-colors: active`, émulé) | `captures/liquide-de-frein-375-etat-couleurs-forcees.png` | cadre de la photo visible (trait plein `CanvasText`) ; focus de 3 px en couleur système `Highlight` |

## 4. Mesures avant et après
Construction locale du site, avant (main) et après (cette branche). Fichiers `captures/mesures-avant.json` et
`captures/mesures-apres.json`, outil `capturer.cjs`. Valeurs en pixels CSS. La police est chargée (« chargée ») ou bloquée
(« secours »).

| Page | Largeur | Police | Bas de la 1re situation (avant → après) | Haut du visuel (avant → après) | Haut de la photo | Larg. illustration (avant → après) |
|---|---|---|---|---|---|---|
| niveau d'huile | 375 | chargée | 689 → 689 | 3 087 → 3 087 | 3 397 | 324 → 324 |
| niveau d'huile | 375 | secours | 714 → 714 | 3 112 → 3 112 | 3 421 | 324 → 324 |
| niveau d'huile | 1366 | les deux | 470 → 470 | 1 856 → 1 856 | 1 856 | 685 → 326 |
| liquide de refroidissement | 375 | chargée | 687 → 687 | 2 879 → 2 879 | 3 188 | 324 → 324 |
| liquide de refroidissement | 375 | secours | 711 → 711 | 2 904 → 2 904 | 3 213 | 324 → 324 |
| liquide de refroidissement | 1366 | les deux | 447 → 447 | 1 658 → 1 658 | 1 658 | 685 → 326 |
| liquide de frein | 375 | les deux | 665 → 665 | 2 205 → 2 205 | 2 514 | 324 → 324 |
| liquide de frein | 1366 | les deux | 447 → 447 | 1 334 → 1 334 | 1 334 | 685 → 326 |
| pression des pneus | 375 | les deux | 764 → 764 | 1 448 → 1 448 | 1 793 | 324 → 324 |
| pression des pneus | 1366 | les deux | 470 → 470 | 876 → 876 | 876 | 685 → 326 |
| loi montagne | 375 | les deux | 588 → 588 | 1 624 → 1 624 | 1 898 | 324 → 324 |
| loi montagne | 1366 | les deux | 374 → 374 | 1 027 → 1 027 | 1 027 | 685 → 326 |
| batterie (recharger) | 375 | les deux | 505 → 505 | 1 783 → 1 783 | 2 092 | 324 → 324 |
| batterie (recharger) | 1366 | les deux | 353 → 353 | 1 098 → 1 098 | 1 098 | 685 → 326 |
| usure des pneus (sans photo) | 375 et 1366 | les deux | inchangé | inchangé | — | inchangée (324 ; 685) |

- **Premier écran du téléphone (375 × 667)** : inchangé sur les sept pages, avec les deux polices.
  - Les 14 captures `captures/<page>-375[-secours]-apres-premier-ecran.png` sont identiques, octet pour octet, à celles
    d'avant (`cmp`).
  - Le visuel commence entre 1 448 et 3 112 px, donc bien sous le premier écran.
  - Trois pages dépassaient déjà 667 px pour la 1re situation avant le lot : niveau d'huile (689), liquide de
    refroidissement (687) et pression des pneus (764). Le lot n'y change rien. Hors périmètre du lot, signalé pour mémoire.
- **Ordinateur (1366 × 800)** : l'illustration est ramenée de 685 à 326 px sur les six pages qui ont une photo.
  - C'est mesuré, et vérifié sur les captures `captures/<page>-1366[-secours]-apres-visuel.png` : illustration à gauche,
    photo à droite, même haut.
  - Ses étiquettes restent lisibles à cette largeur, qui est déjà la sienne au téléphone.
- **Hauteur de page** :
  - au téléphone, elle augmente de 366 à 444 px selon la page (photo, légende et crédit) ;
  - sur ordinateur, elle baisse de 32 à 74 px.
- **Défilement horizontal** : aucun. La largeur de page est égale à celle de la fenêtre dans tous les cas.

## 5. Titres H2 avant et après
Identiques sur les sept pages, avec les deux polices et aux deux largeurs (comparaison des champs `h2` des deux fichiers de
mesures). Le petit titre de la photo est un paragraphe, pas un titre. Liste (après) :
- **/huile-moteur/verifier-niveau/** : Niveau d'huile trop bas, trop haut ou qui baisse, voyant d'huile allumé : puis-je démarrer et rouler ? · Le tutoriel en bref · Vérifier le niveau d'huile moteur, étape par étape · L'essentiel · Vérifier le niveau d'huile moteur à chaud ou à froid ? · Quel est le bon niveau d'huile moteur ? · Niveau d'huile sous le repère mini : puis-je démarrer ? · Trop d'huile, au-dessus du repère maxi : que faire ? · Faire le niveau d'huile : quelle huile, à quelle fréquence ? · Ce que dit chaque notice sur le niveau d'huile · Voyant de niveau d'huile orange : puis-je rouler ? · Voyant d'huile rouge : puis-je rouler ? · Pourquoi ma voiture consomme de l'huile ? · Le niveau d'huile baisse anormalement : que faire ? · À lire aussi
- **/liquide-de-refroidissement/** : Quel liquide de refroidissement mettre, et puis-je rouler s'il en manque ? · L'essentiel · Quel liquide de refroidissement mettre dans ma voiture ? · Liquide de refroidissement rose, lilas ou G12 : ce que disent les notices · Antigel : jusqu'à quelle température protège-t-il ? · Où lire le niveau : le vase d'expansion · Niveau proche du mini ou en dessous : faire l'appoint · Vase d'expansion vide : puis-je rouler ? · Ma voiture consomme du liquide de refroidissement : est-ce normal ? · Liquide marron dans le vase d'expansion · Voyant de température rouge · Quand changer le liquide de refroidissement ? · Ce que dit chaque notice sur le liquide de refroidissement · À lire aussi
- **/liquide-de-frein/** : Puis-je rouler si le niveau de liquide de frein baisse, et quand faut-il le changer ? · L'essentiel · Niveau de liquide de frein sous le mini ou qui baisse vite : puis-je rouler ? · Le niveau baisse, mais reste au-dessus du mini · Niveau bas signalé au tableau de bord · Quel liquide de frein mettre : DOT 4 ? · Faire l'appoint de liquide de frein : précautions · Quand changer le liquide de frein ? · Remplacement du liquide de frein : par qui ? · Ce que dit chaque notice sur le liquide de frein · À lire aussi
- **/pression-des-pneus/** : À quelle pression gonfler mes pneus, et puis-je rouler s'ils sont sous-gonflés ? · Le texte en bref · Quelle pression mettre dans ses pneus ? · Où lire la pression et quand la vérifier, selon la notice de chaque marque · Pneus froids : et si on vérifie la pression à chaud ? · Pression avant et arrière, à vide ou en charge · Pression des pneus avec une remorque · Comment gonfler ses pneus · Pneus sous-gonflés : ce que vous risquez · Quand le voyant de pression des pneus s'allume · Pression des pneus au contrôle technique · À lire aussi
- **/usure-des-pneus/** (sans photo) : Puis-je rouler avec des pneus usés, et comment savoir s'ils le sont ? · Le texte en bref · Pneu usé : à partir de quand faut-il le changer ? · Où sont les témoins d'usure ? · Pneus usés au contrôle technique et sur la route · Pneu endommagé : peut-on rouler ? · Vibrations ou direction qui tire en roulant · Après un coup de trottoir · Pourquoi un pneu s'use-t-il plus vite ? · Date de fabrication et âge des pneus · Changer deux pneus ou quatre ? · Ce que disent la loi et chaque notice sur l'usure des pneus · À lire aussi
- **/loi-montagne/** : Du 1er novembre au 31 mars, puis-je rouler dans une commune soumise à la loi montagne sans pneus hiver ni chaînes ? · Le texte en bref · Loi montagne : où et quand faut-il s'équiper ? · Quel équipement pour la loi montagne ? · Peut-on rouler sans pneus hiver ni chaînes en zone de montagne ? · Deux chaussettes à neige suffisent-elles ? · Pneus neige, 4 saisons, M+S ou 3PMSF : lesquels sont acceptés ? · Quelle amende pour la loi montagne : peut-on être verbalisé ? · Loi Montagne II, loi Montagne III : de quel texte parle-t-on ? · Quels véhicules sont concernés ? · Que faire avant de partir en montagne ? · À lire aussi
- **/batterie-voiture/recharger/** : Comment recharger la batterie de ma voiture, et puis-je rouler ensuite ? · Le symptôme en bref · Le tutoriel en bref · Recharger la batterie de sa voiture : l'essentiel · Recharger avec un chargeur, étape par étape · Causes possibles · Ce que dit chaque notice · Peut-on recharger la batterie sans la débrancher ? · Recharger avec une autre voiture : les câbles de démarrage · Recharger la batterie en roulant · Batterie gelée : jamais de recharge · À lire aussi

## 6. Lighthouse (mobile, construction locale, 3 passages, médiane ; après les corrections de la revue)

| Page | Performance (3 passages) | Accessibilité | Bonnes pratiques | CLS (pire passage) | LCP médian |
|---|---|---|---|---|---|
| /huile-moteur/verifier-niveau/ | 100 / 100 / 100 | 100 | 100 | 0,000 | 0,91 s |
| /liquide-de-refroidissement/ | 100 / 100 / 100 | 100 | 100 | 0,000 | 1,06 s |
| /liquide-de-frein/ | 100 / 100 / 100 | 100 | 100 | 0,000 | 0,91 s |
| /pression-des-pneus/ | 100 / 100 / 100 | 100 | 100 | 0,000 | 1,06 s |
| /loi-montagne/ | 100 / 100 / 100 | 100 | 100 | 0,000 | 0,91 s |
| /batterie-voiture/recharger/ | 100 / 100 / 100 | 100 | 100 | 0,000 | 0,91 s |
| /usure-des-pneus/ (sans photo) | 100 / 100 / 100 | 100 | 100 | 0,000 | 1,05 s |

- **Seuils du lot** : au moins 95 et CLS sous 0,1. Atteints sur toutes les pages.
- **SEO à 69** : seul l'audit « is-crawlable » échoue, à cause du `noindex` de la construction locale (non indexable par la
  double clé), comme sur toute construction hors production.
- **Mineur** : l'audit « Properly size images » est à 0,5 sur la loi montagne.
  - À 375 px et un rapport de pixels de 1,75, le navigateur prend la version de 800 px pour 324 px affichés.
  - Sans effet sur la note de performance.
  - Les trois largeurs sont celles de la consigne (480, 800, 1 200). Laissé tel quel.

## 7. Contrôles (sortie des commandes, 25/11/2026, après les corrections de la revue)
- `npm run schemas` : 0 erreur, 0 avertissement.
- `npm test` : 924 tests, 924 réussis, 0 échec. Cela comprend `tests/photos.test.ts` :
  - registre, fichiers, rendu, PHOTO-* ;
  - en-tête User-Agent et lecture de `Retry-After` ;
  - image de l'article.
- `npm run build` (contrôle) : 40 pages éditoriales, 0 erreur bloquante, 36 alertes, mode non indexable.
  - Les alertes sont 31 R7-IMAGE-RECOMMANDEE (pages sans photo, dont l'usure des pneus) et 5 R3-NIVEAU-A-VERIFIER.
  - 18 fichiers servis dans `dist/photos/`.
- `npm run liens` : 41 pages, 4 805 liens internes vérifiés, 0 problème.
- Recette des exemples (`AVEC_EXEMPLES=1`, `--exemples`) : 0 erreur bloquante.
- Démonstration du format 2 (`npm run demo:format2`) : 0 erreur bloquante, 0 problème de liens.
- Règle 14 :
  - aucune adresse, aucun title ni H1 changé ;
  - aucune date « Mis à jour le » changée : aucun fichier de `src/content/`, `config/`, `public/` ni `docs/` n'est modifié ;
  - favicon et nom du site inchangés.

## 8. Revue indépendante
Une seule revue, par un agent sans contexte de la rédaction, sur le diff complet de la branche, la demande n° 42, le paquet
et les captures, le 25/11/2026. **Verdict : « à corriger »**. Constats et suites :

| Constat | Gravité | Suite |
|---|---|---|
| B1 : la photo du témoin d'usure ne montre pas où regarder | bloquant | **Corrigé** : photo retirée du lot (§2) ; une autre photo est à proposer à Houssem |
| I1 : sur l'usure des pneus, la phrase « L'emplacement varie selon la voiture » ajoute un fait faux | important | **Sans objet** après le retrait de la photo. Sur les six autres pages, l'emplacement varie bien selon la voiture, et la page le dit |
| I2 : l'étiquette de pression montre des valeurs en bars, alors que la page n'en donne volontairement aucune | important | **Soumis à Houssem** (demande n° 42, §3) : valeurs laissées lisibles, légende qui dit qu'elles ne valent que pour cette voiture et que les siennes sont sur son étiquette ; variante, flouter les valeurs |
| I3 : les aperçus versionnés montraient le code QR non flouté | important | **Corrigé** : l'aperçu de l'original part de l'image floutée (`scripts/photos.ts`). Le marquage « topran » et la vallée restent visibles dans les aperçus des originaux : ils ne sont pas des données personnelles, ils sont publics sur Commons, et l'aperçu sert à juger le recadrage |
| I4 : CLAUDE.md se contredit (image du JSON-LD, liens du crédit) | important | **Corrigé** : lignes du balisage 7.5a, du partage et du plan du site |
| M1 : le cadre du vase d'expansion ne montre pas la ligne de liquide | mineur | **Corrigé** dans la légende (« le niveau se lit sur ce vase »). Le cadre reste ainsi, prix de l'exclusion de « topran » |
| M2 : la borne négative de la batterie est à peine visible | mineur | **Corrigé** : cadre agrandi vers le bas (2 700 × 1 800) ; rien de lisible n'y entre |
| M3 : un panonceau que la page ne commente pas est visible | mineur | **Corrigé** : cadre resserré au-dessus (1 932 × 1 288) ; la crête et la vallée sortent aussi du cadre |
| M4 : les états du composant ne sont pas vérifiés sur un rendu | mineur | **Corrigé** : captures du focus et des couleurs forcées (§3) |
| M5 : champ `image` de la page et photo du registre ; alerte levée même hors format 2 | mineur | **Corrigé** : une page qui a les deux est refusée (PHOTO-REGISTRE) ; l'alerte n'est levée que si la photo est affichée ; tests ajoutés |
| M6 : les empreintes prouvent l'intégrité des fichiers, pas leur production par le script | mineur | **Corrigé** : dit tel quel dans `CONTROLES.md` |

**Ce que la revue n'a pas pu vérifier** :
- Lighthouse, recette des exemples et démonstration du format 2 : non relancés par elle. Je les ai relancés après les
  corrections (§6 et §7).
- Lisibilité des marquages à pleine résolution : elle n'a vérifié que l'usure des pneus et l'étiquette de pression. Elle a
  vu les autres photos dans leur version servie de 1 200 px.
- Contenu du code QR : non décodé, d'où son flou.

**Non revu** : les corrections faites après la revue (§8, colonne « Suite ») n'ont pas été relues par un second relecteur,
puisqu'il n'y a qu'une revue par livrable. Elles sont dans le dernier commit de la branche.

## 9. Décisions de Houssem
Validation du 25/11/2026 à 22 h 59, mot pour mot : « Ok pour toutes tes recommandations ».

| Point soumis | Décision |
|---|---|
| 1. La demande n° 42 (texte, composant, exception `image` du JSON-LD, liens du crédit) | acceptée |
| 2. Les six recadrages et le flou du code QR | validés |
| 3. Le retrait de la photo du témoin d'usure | confirmé ; une autre photo sera proposée dans un lot suivant |
| 4. Les valeurs de l'étiquette de pression | laissées lisibles, avec la légende actuelle |
| 5. Les légendes et les textes alternatifs | validés |
| 6. La date « Mis à jour le » | inchangée |
| 7. Les captures avant et après, et celles des états du composant | validées |

## 10. Retouche après la validation : titre de l'œuvre dans le crédit (non relue)
Demandée par Houssem avant la fusion, **sans nouvelle revue indépendante** : elle n'a été relue par personne d'autre que son
auteur.
- **Ce que dit la licence** : les licences CC 3.0 exigent le titre de l'œuvre quand il est fourni (« the title of the
  Work if supplied ») ; la licence 4.0 le recommande.
- **Le titre** : celui de la page Commons, c'est-à-dire le nom du fichier sans son extension, noté au registre (champ
  `titre`).
- **Le crédit** : « Photo : « titre », auteur, licence, recadrée. » (`data-credit-titre`).
- **Le contrôle PHOTO-CREDIT** vérifie deux choses :
  - au schéma : le titre est égal au nom du fichier tiré de la page Commons ;
  - dans la page construite : le titre est présent dans le crédit.
- **Tests** : `tests/photos.test.ts`.
- **À noter** : le titre du fichier du panneau, « Panneau B58 au Pas de Morgins 01 », nomme le lieu de la photo. La licence
  l'exige, et la photo recadrée reste sans repère visible.
