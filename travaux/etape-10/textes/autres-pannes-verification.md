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

**Carburant, p. 283 (PDF 285)** : avec de l'essence à indice d'octane plus bas que conseillé, « avec une légère perte de
puissance » ; à défaut de super, ordinaire 91 : « Vous ne devez alors faire tourner le moteur qu'à régime moyen et ne le
solliciter que faiblement. Rajoutez dès que possible du supercarburant. »

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
- **`fumee-echappement`** : fumée blanche (Renault et Dacia, mot pour mot) ; fumée sous le capot : arrêt ; fumée noire
  ou bleue : toujours aucune notice.
- **`batterie-changer`, `batterie-recharger`** : Renault et Dacia demandent qu'un professionnel fasse toute intervention
  sur la batterie (démontage, débranchement) ; le tutoriel doit l'écrire en tête, marque par marque (consigne « quand ne
  pas le faire soi-même »).
- Reste à lire : Toyota (batterie, surchauffe), Peugeot et Citroën (liquide de refroidissement, additif du filtre à
  particules, mode dégradé), Renault p. 188 mot pour mot.
