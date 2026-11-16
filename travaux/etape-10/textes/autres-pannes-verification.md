# Vérification à l'écran : surchauffe, fumée, perte de puissance, à-coups, batterie (vague B, préparation anticipée), 16/11/2026

Relevé de travail, jamais publié. Préparation anticipée de l'étape 10 (docs/03, règle 12) : rien n'en est présenté,
fusionné ni publié avant sa porte. Texte lu mot pour mot dans le PDF officiel (adresse du registre `data/sources.json`),
par pdf.js dans Chrome (méthode de `travaux/etape-5/REPRISE.md`). Décalage : Renault, Dacia et Seat, page PDF − 2.
Il remplace les passages « à relire » de `autres-pannes-releve.md` et complète `demarrage-batterie-releve.md`.

## Résultat en bref

| Notice | Page PDF → page imprimée | Ce qui est vérifié | Résultat |
|---|---|---|---|
| Renault Clio 5 phase 2 | PDF 388 → p. 386 | Vibrations ; fumée blanche (diesel, essence) ; fumée sous le capot ; témoin de pression d'huile (deux cas) | Exact ; fumée blanche essence et suite de « que faire » complétées |
| Renault Clio 5 phase 2 | PDF 389 → p. 387 | Direction dure ; moteur qui chauffe (motoventilateur, fuite) ; bouillonnement (joint de culasse) ; radiateur | Exact ; fuite : « consultez … le plus tôt possible » |
| Dacia Sandero 3 | PDF 350-352 → p. 348-350 | Même tableau que Renault, mot pour mot (vibrations, fumées, pression d'huile, direction, moteur qui chauffe, bouillonnement, radiateur) | Lu, identique |
| Dacia Sandero 3 | PDF 164 → p. 162 | Versions essence : ratés d'allumage et à-coups, perte de puissance, causes et conduite à tenir | **Nouveau** (causes de première main) |
| Dacia Sandero 3 | PDF 303-304 → p. 301-302 | Rubrique batterie : sans entretien, message « Mode sauvegarde batterie 12V », causes de décharge, interventions par un professionnel | **Nouveau** |
| Dacia Sandero 3 | PDF 328-329 → p. 326-327 | Batterie, dépannage : chargeur, démarrage avec la batterie d'un autre véhicule | **Nouveau** |
| Seat Ibiza | PDF 299-300 → p. 297-298 | Liquide de refroidissement : spécification, contrôle du niveau, appoint, avertissements | Exact ; fin de l'ATTENTION complétée |
| Seat Ibiza | PDF 290-291 → p. 288-289 | Témoins de la gestion du moteur, dont l'EPC ; perte de puissance et fonctionnement irrégulier ; ratés | **Nouveau** (témoin EPC trouvé, causes) |
| Seat Ibiza | PDF 285 → p. 283 | Essence à indice d'octane plus bas : légère perte de puissance | **Nouveau** (cause) |
| Renault Clio 5 phase 2 | PDF 188 → p. 186 | Diesel : régime, fumées blanches du nettoyage automatique du filtre à particules, précautions hivernales | **Nouveau** (fumée) |
| Renault Clio 5 phase 2 | PDF 190 → p. 188 | Versions essence : même passage que Dacia p. 162, mot pour mot (à une précision près) | Lu |
| Peugeot 208 | PDF 167-170 → p. 165-168 | Niveaux ; liquide de refroidissement ; batterie 12 V (remplacement Stop & Start) ; filtre à particules diesel | **Nouveau** |
| Peugeot 208 | PDF 17 → p. 15 | Additif du filtre à particules (témoin fixe) ; ne jamais rouler jusqu'à la panne sèche | Lu |
| Citroën C3 | PDF 114-117 → p. 112-115 | Mêmes rubriques que Peugeot (refroidissement, batterie) ; additif gasoil : appoint par le réseau ; filtre à particules | **Nouveau** |
| Toyota Yaris | p. 36, 242, 291, 335 | Bruits anormaux, cliquetis, à-coups, perte de puissance, bruit d'échappement : conduite à tenir | **Nouveau** (conduite à tenir de première main) |
| Toyota Yaris | p. 319-323 | Batterie déchargée, débranchement, remplacement ; surchauffe (signes et mesures correctives) | **Nouveau** |
| Six notices entières | toutes les pages | Relevé de chaque « bruit », « cliquetis », « claquement », « sifflement », « fumée » | Aucune cause d'un bruit du moteur, aucune fumée noire ou bleue |

## Renault Clio 5 phase 2 (`notice-renault-clio-5`), « Anomalies de fonctionnement », « Sur route »

p. 386 (PDF 388) :
- « Vibrations. » → « Pneumatiques mal gonflés ou mal équilibrés ou endommagés. » → « Vérifiez la pression des
  pneumatiques ; si ce n'est pas la cause, faites vérifier leur état par un Représentant de la marque. »
- « Fumée blanche à l'échappement. » → « Version Diesel, ceci n'est pas obligatoirement une anomalie, la fumée peut
  provenir de la régénération du filtre à particules. » ; « Version essence, ceci n'est pas obligatoirement une
  anomalie. Selon les conditions climatiques (froid, humidité...), la fumée peut se produire lors de fortes
  accélérations du véhicule. » → « Réduisez le régime moteur et évitez les accélérations brutales pour faire disparaître
  progressivement la fumée. Si ce n'est pas le cas, cela peut provenir d'une autre cause. Consultez un Représentant de
  la marque. »
- « Fumée sous capot moteur. » → « Court-circuit ou fuite du circuit de refroidissement. » → « Arrêtez-vous, coupez le
  contact, éloignez-vous du véhicule et faites appel à un Représentant de la marque. »
- « Le témoin de pression d'huile s'allume : en virage ou au freinage » → « Le niveau est trop bas. » → « Ajoutez de
  l'huile moteur 🡺 332. » ; « tarde à s'éteindre ou reste allumé à l'accélération » → « Manque de pression d'huile. » →
  « Arrêtez-vous : faites appel à un Représentant de la marque. »

p. 387 (PDF 389) :
- « La direction devient dure. » → « Surchauffe de l'assistance. » → « Roulez prudemment à allure réduite, faites
  attention au niveau d'effort dans le volant nécessaire pour tourner les roues. » ; « Panne du moteur électrique
  d'assistance. Défaillance du système d'assistance » → « Consultez un Représentant de la marque. »
- « Le moteur chauffe. L'indicateur de température de liquide de refroidissement se situe dans la zone d'alerte et le
  témoin s'allume. » → « Panne du motoventilateur. » → « Stoppez le véhicule, arrêtez le moteur et faites appel à un
  Représentant de la marque. » ; → « Fuites de liquide de refroidissement. » → « Vérifiez le bocal de liquide de
  refroidissement : il doit contenir du liquide. S'il n'en contient pas, consultez un Représentant de la marque le plus
  tôt possible. »
- « Bouillonnement dans le bocal de liquide de refroidissement. » → « Panne mécanique : joint de culasse détérioré. » →
  « Arrêtez le moteur. Faites appel à un Représentant de la marque. »
- « Radiateur : Dans le cas d'un important manque de liquide de refroidissement n'oubliez pas qu'il ne faut jamais faire
  le plein avec du liquide de refroidissement froid lorsque le moteur est très chaud. » (suite : mélange neuf
  convenablement dosé après une vidange, produit sélectionné par le constructeur).

Le tableau n'a aucune ligne sur la perte de puissance, les à-coups, le moteur qui cale, les bruits, la fumée bleue ou
noire (confirmé, p. 383 à 388).

## Dacia Sandero 3 (`notice-dacia-sandero-3`)

Tableau « Anomalies de fonctionnement » (p. 346-351, PDF 348-353) : mêmes lignes, mot pour mot, que Renault (« Vous
actionnez le démarreur » p. 347-348 ; « Sur route » p. 348-349 ; radiateur p. 350). Deux marques d'un même groupe : elles
comptent pour deux notices, pas pour deux groupes (`MARQUES_REFERENCE`).

**Particularités des versions essence, p. 162 (PDF 164)** :
« Des conditions de fonctionnement de votre véhicule telles que : – roulage prolongé avec témoin mini carburant allumé ;
– utilisation d'essence plombée ; – utilisation d'additifs pour lubrifiants ou carburant non agréés par le
constructeur. Ou des anomalies de fonctionnement telles que : – système d'allumage défectueux ou panne d'essence ou
bougie débranchée se traduisant par des ratés d'allumage et des à-coups au cours de la conduite ; – perte de puissance,
provoquent un échauffement excessif du pot catalytique, en diminuent l'efficacité, peuvent amener sa destruction et
entraîner des dommages thermiques sur le véhicule. Si vous constatez les anomalies de fonctionnement ci-dessus, faites
effectuer par un Représentant de la marque les réparations nécessaires au plus vite. »
Même page : « Problème de démarrage : Pour éviter d'endommager le pot catalytique, le démarreur ou bien, de provoquer une
usure prématurée de la batterie, n'insistez pas dans la tentative de démarrage […] sans avoir identifié et traité la
cause de la défaillance. Dans le cas contraire, ne tentez plus de démarrer le moteur et faites appel à un Représentant
de la marque. » ; filtre à particules essence : rouler entre 50 et 110 km/h environ jusqu'à l'extinction du témoin, « au
bout de 5 à 20 minutes environ ».
La notice Renault porte le même passage à sa p. 188 (début coupé dans le relevé de l'étape 5 : à relire mot pour mot
avant la rédaction, même famille de notice).

**Batterie, p. 301-302 (PDF 303-304)** :
- « La batterie ne nécessite pas d'entretien. Vous ne devez ni l'ouvrir, ni effectuer d'ajout de liquide. »
- « Suivant véhicule, un système vérifie en continu l'état de charge de la batterie. Si celle-ci diminue, le message
  « Mode sauvegarde batterie 12V » puis « Batterie faible Démarrer moteur » s'affiche au tableau de bord. Dans ce cas,
  démarrez le moteur, roulez ou attendez jusqu'au le message au tableau de bord disparaît. » (coquille de la notice)
- « L'état de charge de votre batterie peut diminuer surtout si vous utilisez votre véhicule : – sur de petits
  parcours ; – en roulage urbain ; – lorsque la température baisse ; – après utilisation prolongée d'éléments
  consommateurs (radio…) moteur arrêté. »
- p. 302 : « Afin de garantir votre sécurité et le bon fonctionnement des équipements électriques du véhicule (feux,
  essuie-vitre, assistance de freinage...), toutes interventions sur la batterie (démontage, débranchement...) doivent
  impérativement être effectuées par un professionnel spécialisé. Risque de brûlures par chocs électriques. » ;
  « Respectez impérativement les périodicités de remplacement mentionnées dans le document d'entretien sans les
  dépasser. La batterie étant spécifique, veillez à la faire remplacer par une batterie équivalente. Faites appel à un
  Représentant de la marque. » (Renault p. 341 : même consigne, relevé du 15/11.)

**Batterie, dépannage, p. 326-327 (PDF 328-329)** :
- « Branchement d'un chargeur : Le chargeur doit être compatible avec une batterie de tension nominale de 12 volts. Ne
  débranchez pas la batterie quand le moteur tourne. Conformez-vous aux instructions d'utilisation données par le
  fournisseur du chargeur de batterie que vous employez. » ; « Certaines batteries peuvent présenter des spécificités en
  terme de recharge, prenez conseil auprès de votre Représentant de la marque. » ; chargement « dans un local bien
  aéré » ; « attendez au moins une minute après une coupure moteur pour débrancher une batterie ».
- « Démarrage avec la batterie d'un autre véhicule : […] Les deux batteries doivent avoir une tension nominale
  identique : 12 volts. La batterie fournissant le courant doit avoir une capacité (ampère-heure, Ah) au moins égale à
  la batterie déchargée. » ; version Hybrid : ne pas s'en servir pour dépanner un autre véhicule (hors périmètre).

## Seat Ibiza (`notice-seat-ibiza`)

**Liquide de refroidissement, p. 297-298 (PDF 299-300)** :
- p. 297 : mélange d'eau traitée et d'au moins 40 % d'additif G12evo, protection antigel jusqu'à -25 °C ; AVERTISSEMENT :
  « S'il n'y a pas suffisamment de liquide antigel dans le système de refroidissement, le moteur risque de ne pas
  fonctionner correctement – risque de blessures graves ! » ; liquide marron au lieu de lilas : mélange inadapté, à
  remplacer immédiatement.
- p. 298 : contrôle du niveau véhicule à l'horizontale, contact coupé, entre les repères moteur froid ; appoint :
  « Laissez refroidir le moteur. » ; « Faites l'appoint de liquide de refroidissement uniquement s'il en reste encore dans
  le vase d'expansion, sinon vous pourriez endommager le moteur. S'il n'y a plus de liquide de refroidissement dans le
  vase d'expansion, arrêtez-vous. Faites appel à un spécialiste en mesure de vous dépanner » ; « Si vous perdez du liquide
  de refroidissement, rendez-vous dans un atelier spécialisé pour inspecter le système de refroidissement. »
- AVERTISSEMENT : « Le système de refroidissement est sous pression ! N'ouvrez jamais le bouchon du vase d'expansion du
  liquide de refroidissement tant que le moteur est chaud. Risque de brûlures ! » ; le ventilateur du radiateur peut
  démarrer contact coupé.
- ATTENTION : « Si vous manquez de liquide de refroidissement dans le vase d'expansion, garez la voiture dans un endroit
  sûr et arrêtez-vous. Demandez de l'aide à un technicien. »

**Gestion du moteur, p. 288-289 (PDF 290-291)** :
- p. 288, témoins : gaz d'échappement allumé (« Levez le pied de l'accélérateur et roulez prudemment jusqu'à l'atelier
  spécialisé le plus proche ») et clignotant (même consigne) : déjà dans la base (lignes du voyant moteur) ; **EPC** :
  « Témoin allumé — Dysfonctionnement de la gestion du moteur essence. Faites immédiatement contrôler le moteur par un
  atelier spécialisé. Lorsque le contact est mis, le voyant (Electronic Power Control) s'allume et doit s'éteindre une
  fois le moteur démarré. » Même formule que le préchauffage qui clignote (« gestion du moteur diesel », p. 289), ligne
  saisie validée avec le lot 5c le 14/11 : l'EPC prendrait le même niveau, à confirmer par la grille au paquet.
- p. 289, Nota : « Tant que les voyants [quatre pictogrammes] restent allumés, il est possible que le moteur présente un
  dysfonctionnement, que la consommation de carburant augmente et que le moteur perde de la puissance. »
- p. 289, Catalyseur : « Si vous constatez une panne de combustion, une baisse de puissance ou un fonctionnement
  irrégulier du moteur, contactez un atelier spécialisé pour faire réviser le véhicule. En règle générale, le témoin de
  gaz d'échappement s'allume lorsque les symptômes décrits se produisent. […] Par ailleurs, le catalyseur risquerait
  d'être endommagé par surchauffe. » ; ATTENTION : « Ne videz pas complètement le réservoir de carburant, l'irrégularité
  de l'alimentation peut provoquer des ratés. Lors des ratés d'allumage, du carburant non brûlé parvient dans le système
  d'échappement, ce qui peut provoquer une surchauffe et un endommagement du catalyseur. »
- p. 289, filtre à particules (essence et diesel) : 50 à 120 km/h moteur chaud, jusqu'à l'extinction du témoin (déjà dans
  la base, ligne `fap`).

**Démarrage, p. 213 (PDF 215)**, Nota : « Lors du démarrage du moteur à froid, les bruits peuvent brièvement augmenter.
Ce phénomène est normal et il n'y a donc pas lieu de s'inquiéter. » ; « À des températures inférieures à +5 °C (+41 °F),
un peu de fumée peut s'échapper du dessous des véhicules diesel lorsque le chauffage d'appoint supplémentaire à
carburant est activé. » ; ATTENTION : « Évitez les régimes élevés, les accélérations à plein gaz et les fortes
sollicitations sur moteur froid – risque de panne du moteur ! »

**Filtre à particules et compartiment moteur, p. 290 (PDF 292)** : « Si le témoin reste allumé après 30 minutes de
conduite en mode régénération, contactez un atelier spécialisé pour faire réparer le défaut » ; « Pendant la
régénération, du bruit, des odeurs et un régime de ralenti élevé peuvent se produire. » ; « Afin de ne pas réduire la
durée de vie du filtre à particules, utilisez toujours la bonne huile moteur et le bon carburant. Évitez également de
faire toujours des trajets courts. » ; AVERTISSEMENT : « N'ouvrez jamais le capot-moteur si vous remarquez que du
compartiment-moteur s'échappe de la vapeur ou du liquide de refroidissement. Attendez jusqu'à ce qu'il n'y ait plus
d'échappement de vapeur ou de liquide de refroidissement. »

**Carburant, p. 283 (PDF 285)** : avec de l'essence à indice d'octane plus bas que conseillé, « avec une légère perte de
puissance » ; à défaut de super, ordinaire 91 : « Vous ne devez alors faire tourner le moteur qu'à régime moyen et ne le
solliciter que faiblement. Rajoutez dès que possible du supercarburant. »

## Renault Clio 5 phase 2, particularités (p. 186 et 188)

- p. 186 (PDF 188), diesel : « En roulage, pour ne pas endommager le moteur, ne laissez jamais monter le régime moteur au
  dessus de 4500 tours/minutes quelques que soit la vitesse engagée. » ; « En roulage, suivant la qualité du carburant
  utilisé, des fumées blanches peuvent exceptionnellement apparaître. Cela est dû au nettoyage automatique du filtre à
  particules et est sans conséquence sur le comportement du véhicule. » ; panne de carburant : réamorcer le circuit
  (🡺 159) avant de redémarrer ; « Précautions hivernales […] veillez à ce que votre batterie soit toujours bien
  chargée ; veillez à ne jamais laisser le niveau de gazole trop baisser dans le réservoir afin d'éviter la condensation
  de vapeur d'eau s'accumulant dans le fond du réservoir. » ; filtre à particules : déjà dans la base (ligne `fap`).
- p. 188 (PDF 190), essence : même passage que Dacia p. 162 (« utilisation d'additifs pour lubrifiant ou carburant non
  agréés », sans « par le constructeur »), même consigne (« faites effectuer par un Représentant de la marque les
  réparations nécessaires au plus vite »), même « Problème de démarrage ».
- p. 161 (PDF 163), panne de carburant diesel : réamorçage, « si le moteur ne démarre toujours pas après plusieurs
  tentatives, faites appel à un Représentant de la marque » (déjà relu pour l'exemple « voiture ne démarre pas »).

## Peugeot 208 (`notice-peugeot-208`) et Citroën C3 (`notice-citroen-c3`), même rédaction

- **Niveaux** (Peugeot p. 165, Citroën p. 112) : « En cas de baisse importante d'un niveau, faire vérifier le circuit
  correspondant par le réseau PEUGEOT [CITROËN] ou par un atelier qualifié. » ; le moto-ventilateur peut se mettre en
  marche à tout instant, même contact coupé ; circuit de gazole sous très haute pression : toute intervention
  exclusivement par le réseau ou un atelier qualifié.
- **Liquide de refroidissement** (Peugeot p. 167, Citroën p. 113) : « Un appoint de ce liquide entre deux révisions est
  normal. Le contrôle et l'appoint doivent être faits moteur froid. Un niveau insuffisant présente des risques de
  dommages importants pour le moteur » ; niveau proche du repère « MAXI » sans le dépasser ; « Si le niveau est proche ou
  en-dessous du repère "MINI", il est impératif de faire un appoint. » ; « Le circuit de refroidissement étant sous
  pression, attendre au moins une heure après l'arrêt du moteur pour intervenir. En cas d'intervention urgente, pour
  éviter tout risque de brûlure, se munir d'un chiffon et dévisser le bouchon de deux tours pour laisser retomber la
  pression. »
- **Batterie 12 V** (Peugeot p. 168, Citroën p. 114) : « La batterie est sans entretien. » ; vérifier le serrage des
  cosses vissées et la propreté des branchements ; « Les versions équipées du Stop & Start comportent une batterie au
  plomb 12 V de technologie et de caractéristiques spécifiques. Son remplacement doit être effectué exclusivement dans le
  réseau PEUGEOT [CITROËN] ou dans un atelier qualifié. »
- **Filtre à particules, diesel** (Peugeot p. 168, Citroën p. 114-115) : début de colmatage signalé par l'allumage
  temporaire du témoin ; « Dès que les conditions de circulation le permettent, régénérer le filtre en roulant à une
  vitesse d'au moins 60 km/h jusqu'à l'extinction du témoin. » ; Citroën : « Si le témoin reste affiché, il s'agit d'un
  manque d'additif gasoil. » ; « Après un fonctionnement prolongé du véhicule à très basse vitesse ou au ralenti, il est
  possible de constater exceptionnellement des émissions de vapeur d'eau à l'échappement, lors d'accélérations. Ces
  émissions sont sans conséquence » ; véhicule neuf : premières régénérations avec des odeurs de « brûlé »
  « parfaitement normales ».
- **Additif du filtre à particules** : Peugeot p. 15, témoin fixe, « Faire rapidement réaliser l'appoint » (base, lot 3) ;
  Citroën p. 113-114 : « La mise à niveau de cet additif doit impérativement et rapidement être effectuée par le réseau
  CITROËN ou par un atelier qualifié. »
- **Carburant** (Peugeot p. 15) : « Ne jamais rouler jusqu'à la panne sèche, cela pourrait endommager les systèmes
  d'antipollution et d'injection. »
- **Bruits et fumées** : ni Peugeot ni Citroën ne décrivent un bruit du moteur thermique ou une fumée à l'échappement
  hors de la vapeur d'eau ci-dessus (relevé de toutes les occurrences de « bruit », « cliquetis », « claquement »,
  « claque », « sifflement », « siffle », « fumée » et « fume » des 276 pages Peugeot et des 212 pages Citroën :
  clignotants, airbags, moteur électrique, téléphone, bouchon de carburant).
- **Dacia** (même relevé, 384 pages) : comme Renault (p. 160 : fumées blanches exceptionnelles du nettoyage automatique
  du filtre à particules, sans conséquence ; tableau p. 348-349) ; bruits de l'airbag, du rétroviseur, de l'aide au
  stationnement ; aucun bruit du moteur, aucune fumée noire ou bleue.
- **Renault** (même relevé, 424 pages) : fumées blanches (p. 186, 386), fumée sous le capot (p. 386), étiquette
  d'opacité ; les bruits décrits sont ceux du système hybride E-Tech (hors périmètre), de l'airbag et du rétroviseur ;
  aucun bruit du moteur thermique, aucune fumée noire ou bleue.
- **Seat** (même relevé, notice entière) : seulement le bruit qui augmente brièvement au démarrage à froid (p. 213), le bruit
  de la régénération du filtre (p. 290), la fumée du chauffage d'appoint diesel sous le véhicule (p. 213) ; ni
  claquement, ni cliquetis du moteur (« indice de cliquetis » p. 283 : qualité de l'essence), ni fumée noire ou bleue.
- « Mode dégradé » : aucune des notices lues ne décrit de mode dégradé du moteur thermique sous ce nom (Peugeot :
  « mode tortue » du seul moteur électrique, hors périmètre).

## Toyota Yaris (`notice-toyota-yaris`, page PDF = page imprimée), notice entière relevée

- **p. 242, « Votre véhicule nécessite-t-il des réparations ? »** : « Soyez attentif aux variations de performances et aux
  signaux sonores, ainsi qu'aux indications informant qu'une réparation s'avère nécessaire. Voici quelques indices
  importants : • Ratés d'allumage, fonctionnement irrégulier du moteur ou cliquetis • Perte de puissance importante
  • Bruits anormaux du moteur • Fuite de liquide sous le véhicule (il est toutefois normal que de l'eau s'écoule de la
  climatisation après l'avoir utilisé.) • Modification du bruit d'échappement (cela peut indiquer une fuite dangereuse de
  monoxyde de carbone. Conduisez avec les vitres ouvertes et faites vérifier le système d'échappement immédiatement.) […]
  • Température du liquide de refroidissement du moteur continuellement supérieure à la normale » ; même page : « nous
  vous recommandons de confier les opérations d'entretien et les réparations à un concessionnaire ou un réparateur
  Toyota agréé, ou à tout autre réparateur qualifié ».
- **p. 291, 7.2.2 « Si vous pensez qu'il y a un problème »** : « Si vous remarquez l'un des symptômes suivants, votre
  véhicule a probablement besoin d'un réglage ou d'une réparation. Contactez dès que possible un concessionnaire ou un
  réparateur Toyota agréé, ou tout autre réparateur qualifié. » ; symptômes audibles : « Changement au niveau du bruit de
  l'échappement », « Cliquetis ou autres bruits anormaux du moteur » ; symptômes de fonctionnement : « Ratés
  d'allumage, à-coups ou fonctionnement irrégulier du moteur », « Perte de puissance importante » ; symptômes visibles :
  fuites sous le véhicule, aiguille de température continuellement au-dessus de la normale.
- **p. 36, gaz d'échappement** : odeur de gaz d'échappement dans le véhicule : « ouvrez les vitres et faites vérifier le
  véhicule dès que possible » ; « si l'échappement produit un bruit anormal, veuillez faire vérifier et réparer votre
  véhicule ».
- **p. 335, carburant** : « Si vous entendez des cliquetis dans votre moteur • Contactez un concessionnaire ou un
  réparateur Toyota agréé, ou tout autre réparateur qualifié. • Vous pouvez occasionnellement entendre de légers
  cliquetis pendant un temps très court lorsque vous accélérez ou conduisez dans une montée. Cela est normal et il n'y a
  aucune raison de s'inquiéter. » ; essence sans plomb EN228, indice d'octane 95 ou plus ; carburant inapproprié :
  « le moteur risque d'être endommagé ».
- **p. 319-321, batterie** : causes d'un démarreur lent ou immobile (batterie déchargée, bornes desserrées, corrodées ou
  débranchées) ; démarrage avec un deuxième véhicule (câbles, régime légèrement augmenté environ 5 minutes, débranchement
  dans l'ordre inverse), puis « faites vérifier le véhicule dès que possible » ; « Il est impossible de mettre le moteur
  en marche en poussant le véhicule. » ; « Avant de débrancher les bornes de la batterie, contactez un concessionnaire ou
  un réparateur Toyota agréé, ou tout autre réparateur qualifié. » (mémoire des calculateurs effacée) ; décharge
  naturelle d'un véhicule longtemps inutilisé ; remplacement : batterie 12 V de même boîtier, capacité et courant de
  démarrage à froid équivalents ou supérieurs (valeurs données par version), batterie d'origine ou équivalente avec le
  système d'arrêt et de démarrage ; MISE EN GARDE : « Commencez toujours par débrancher la borne négative (-). » ;
  p. 322 : lunettes de sécurité, acide, plomb, ne pas se pencher sur la batterie.
- **p. 322-323, 7.2.11 « Si votre véhicule surchauffe »** (déjà citée par la base, ligne `temperature-rouge`) : signes
  (jauge dans la zone rouge « ou vous ressentez une perte de puissance du moteur », message, vapeur sous le capot) ;
  mesures correctives : arrêt en lieu sûr, climatisation puis moteur coupés ; capot soulevé avec précaution après
  dissipation de la vapeur ; fuites ; niveau entre « F » et « L » ; appoint (de l'eau en cas d'urgence, selon Toyota) ;
  contrôle du ventilateur ; « Si le ventilateur ne fonctionne pas : Arrêtez immédiatement le moteur et contactez […] ».
- Relevé des « bruit », « cliquetis », « claquement », « sifflement », « fumée » des 440 pages : rien d'autre sur le moteur
  (aides à la conduite, chargeur sans fil, freins, kit de réparation des pneus) ; aucune cause d'un claquement ou d'un
  cliquetis, aucune fumée noire ou bleue.

## Ce que cela change pour les briefs

- **`voiture-qui-broute`** : des causes de première main existent (Dacia p. 162 et Renault p. 188 : système d'allumage
  défectueux, panne d'essence, bougie débranchée ; Seat p. 289 : réservoir vidé, ratés d'allumage) ; conduite à tenir :
  réparations au plus vite (Dacia, Renault), atelier spécialisé (Seat) ; avec le voyant moteur qui clignote, la ligne de
  la base décide. Le point « sources secondaires » ne porte plus que sur les causes propres au diesel et le détail.
- **`perte-de-puissance`** : causes de première main (Seat p. 283 et 289, Dacia p. 162) ; témoin EPC trouvé (Seat
  p. 288) ; causes diesel (pression du rail, turbo) : pages liées P0087 et P0299 (en ligne, sources admises par la
  charte §2.2 pour les codes).
- **`surchauffe-moteur`** : tableau Renault et Dacia (motoventilateur, fuite, joint de culasse), Seat p. 298 (appoint
  seulement s'il reste du liquide, jamais moteur chaud, arrêt s'il n'en reste plus).
- **`fumee-echappement`** : fumée blanche (Renault et Dacia, tableau ; Renault p. 186 : fumées blanches exceptionnelles
  du nettoyage du filtre, sans conséquence) ; vapeur d'eau après un long ralenti et odeur de « brûlé » des premières
  régénérations (Peugeot p. 168, Citroën p. 115) ; fumée sous le capot : arrêt ; fumée noire ou bleue : toujours aucune
  notice.
- **`nettoyer-fap`** : régénération en roulant, marque par marque (Peugeot et Citroën : au moins 60 km/h ; Renault :
  régime au-dessus de 2 000 tr/min si possible, 10 à 20 minutes ; Dacia et Renault essence : 50 à 110 km/h, 5 à 20
  minutes ; Seat : 50 à 120 km/h) ; additif (Peugeot, Citroën) : appoint par le réseau ou un atelier qualifié.
- **`batterie-changer`, `batterie-recharger`** : Renault et Dacia demandent qu'un professionnel fasse toute intervention
  sur la batterie (démontage, débranchement) ; Peugeot et Citroën, le remplacement de la batterie des versions Stop &
  Start dans le réseau ou un atelier qualifié ; Seat, la recharge par un atelier spécialisé (relevé du 15/11, p. 303, à
  relire). Le tutoriel doit l'écrire en tête, marque par marque (consigne « quand ne pas le faire soi-même »).
- **`bruit-moteur`** : la conduite à tenir a une source de première main (Toyota p. 242 et 291 : bruits anormaux,
  cliquetis, contacter dès que possible un réparateur ; Toyota p. 36 et 242 : bruit d'échappement qui change, risque de
  monoxyde de carbone, faire vérifier immédiatement, vitres ouvertes), ce qui est normal aussi (Seat p. 213 : bruit plus
  fort un court moment à froid ; Toyota p. 335 : légers cliquetis très brefs à l'accélération ; Seat p. 290 : bruit de la
  régénération) ; avec un voyant d'huile allumé, les lignes de la base décident ; les **causes** d'un claquement, d'un
  cliquetis ou d'un sifflement ne sont dans aucune notice.
- **`perte-de-puissance`, `voiture-qui-broute`** : conduite à tenir aussi chez Toyota (p. 291 : à-coups, ratés, perte de
  puissance importante : contacter dès que possible un réparateur) ; perte de puissance comme signe de surchauffe
  (Toyota p. 322).
- **`batterie-changer`** : Toyota demande de contacter un réparateur avant de débrancher les bornes (p. 321).
- **Seat, batterie (p. 301-303, PDF 303-305, relues le 16/11)** : « Tous travaux sur la batterie requièrent des
  connaissances spécialisées. Nous vous prions de vous rendre chez un partenaire SEAT ou un atelier spécialisé pour les
  problèmes liés à la batterie : risque de brûlures et d'explosion de la batterie ! » ; « La batterie ne doit être
  débranchée que dans des cas exceptionnels. » ; débrancher d'abord les câbles négatifs, rebrancher d'abord le positif
  (p. 301-302) ; « œil magique » (p. 302-303) : deux couleurs, électrolyte trop bas (atelier spécialisé) ou correct
  (correspondance des couleurs « jaune clair ou incolore » et « noir » à relire sur le rendu de la page : le texte extrait
  les sépare) ; « La recharge de la batterie du véhicule doit être effectuée par un atelier spécialisé ; en effet, les
  batteries utilisées sont dotées d'une technologie particulière qui nécessite une limitation de la tension de
  charge. » ; remplacement : se renseigner auprès d'un Service Technique avant l'achat, batterie Start-Stop remplacée
  seulement par une batterie de mêmes spécifications.
- **Conséquence pour `batterie-changer` (16 116 recherches par mois au plus)** : les six notices renvoient le changement
  de batterie à un professionnel, ou au moins demandent de le consulter d'abord (Renault p. 341 et Dacia p. 302 : toute
  intervention ; Seat p. 301 et 303 ; Peugeot p. 168 et Citroën p. 114 : versions Stop & Start ; Toyota p. 321 : avant de
  débrancher les bornes). Un tutoriel « changer sa batterie soi-même » contredirait les notices : la décision de la page
  est « faites-la changer par un professionnel, selon votre notice », et l'élément unique gagne à devenir le **tableau
  « ce que dit la notice de votre marque »** (qui la change, batterie Start-Stop, caractéristiques à respecter, ordre de
  débranchement) plutôt qu'un tutoriel ; consigne du brief à revoir avant la rédaction (proposée par Claude, validée avec
  le lot).
- **`batterie-recharger`** : la recharge au chargeur est décrite par Peugeot (p. 187-188), Citroën (p. 137), Renault
  (p. 362-363) et Dacia (p. 326), avec leurs précautions ; Seat la confie à un atelier spécialisé (p. 303) : la page le
  montre marque par marque.
