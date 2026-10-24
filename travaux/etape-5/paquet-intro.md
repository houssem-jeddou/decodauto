# Paquet de validation : base voyants (étape 5)

Brouillon du 24/10/2026, corrigé après la revue indépendante. Ce paquet est généré par `npm run paquet` à partir de `data/voyants.brouillon.json`, `data/sources.json` et `travaux/etape-5/pages-sources.json`. Rien n'est validé tant que Houssem ne l'a pas dit.

## Ce que Houssem valide sur ce paquet
- **25 lignes de la base voyants** : pour chacune, la situation, le verdict, l'urgence, l'action et l'écart entre marques. Chaque notice citée l'est avec sa page, l'extrait mot pour mot et le niveau que la grille tire de sa consigne.
- **Le registre des sources** : 5 notices constructeur (Peugeot 208, Renault Clio 5, Dacia Sandero 3, Seat Ibiza, Toyota Yaris) et 2 textes Légifrance (loi montagne).
- **Le tableau page → sources** des pages de la vague A sans ligne dans la base. C'est une pièce jointe à la porte ; à l'étape 8, chaque page déclarera ses propres sources.
- **Les 17 pictogrammes**, redessinés en formes simples (`travaux/etape-5/planche-pictogrammes.html`).
- **Les décisions D1 à D13** ci-dessous.

## Méthode suivie
- **Notices** : 5 marques de référence sur 7, de 4 groupes sur 4.
  - Citroën et Volkswagen n'ont pas été consultés : la règle des 3 marques de 2 groupes est tenue sans eux.
  - Chaque notice est la notice d'utilisation publiée par le constructeur, lue dans le PDF officiel ; le texte relevé est conservé dans `travaux/etape-5/notices/`.
  - Les symboles des témoins sont des images, absentes du texte extrait. Quand un extrait dit « accompagné du témoin », le témoin a été identifié sur le rendu de la page et noté entre crochets (par exemple « [STOP] », « [Service] »).
- **Règle appliquée**, celle de la demande de changement n° 3, sans exception :
  - chaque notice consultée qui donne une consigne pour l'état décrit est citée ;
  - la ligne prend le niveau de la citation la plus prudente ;
  - l'écart entre marques est écrit dans la ligne.
- **Notices sans consigne** : une notice consultée qui décrit l'état sans consigne propre est listée sous la ligne (« consultées sans consigne »), sans niveau.
- **Revue indépendante** (deux passages) : toutes les citations ont été recherchées dans les 5 PDF officiels et retrouvées à la page indiquée. Les symboles notés entre crochets ont été vérifiés sur le rendu des pages. Les corrections sont intégrées (voir l'encadré de la présentation).
- **Contrôles automatiques** : le brouillon passe tous les contrôles de la base (R3, R8, pictogrammes, rattachement au plan), sauf l'empreinte (R4), posée après la validation. Résultat : 0 erreur bloquante. Les 3 rappels R3-NIVEAU-A-VERIFIER sont expliqués en D5.

## Décisions D1 à D13 : tranchées par Claude, sur délégation de Houssem (24/10/2026, 14 h 24)
Houssem a confié à Claude le choix des décisions D1 à D13, avec pour critère son objectif : un site qui attire le plus de visiteurs possible et qui leur est réellement utile. Ces choix fixent la méthode. La validation des 25 lignes (verdicts, extraits, niveaux) reste celle de Houssem (docs/03, règle 7).

| Décision | Choix | Raison (utilité et trafic) |
|---|---|---|
| D1. Voyant moteur orange en arrêt immédiat (Toyota) | Règle appliquée telle quelle | Un verdict moins prudent que la notice Toyota serait faux pour un conducteur de Toyota. L'écart affiche ce que dit chaque marque. Pour l'étape 6, un tableau « ce que dit la notice de votre marque » tiré de la base est proposé comme élément unique des pages voyants : il répond aux nombreuses requêtes « voyant moteur + modèle » (Clio, 208, Dacia, Polo…). |
| D2. Encadré général d'une notice | Accepté | Sinon, tous les témoins Seat passeraient en arrêt immédiat, y compris un fonctionnement normal : la page perdrait toute crédibilité. |
| D3. Lignes regroupant plusieurs affichages | Accepté | Le lecteur cherche l'alerte (« voyant moteur rouge stop », « risque casse moteur »), pas le dessin exact de sa marque. |
| D4. Témoin d'usure des plaquettes | Option (b) : traité à l'étape 8 dans la page « voyant frein », par une ligne saisie citée | Le témoin n'existe dans aucune des 5 notices. Une 6e notice lue le 24/10, le guide Peugeot 3008 et 5008 (édition 01-22), ne l'a pas non plus. La règle des 3 marques de 2 groupes est donc hors d'atteinte. Les requêtes « plaquettes » (environ 6 000 recherches par mois) restent servies par la page, sans ligne dans l'outil voyants. |
| D5. Classements signalés | Acceptés tels quels | Ce sont les lectures les plus prudentes de la grille. |
| D6. Couleurs | Acceptées | Une couleur par ligne ; la situation dit quand elle varie. |
| D7. Adresse de la notice Toyota | Acceptée | Source officielle, ouverte depuis toyota.fr. |
| D8. Pages hors base | Accepté | Chaque page de la vague A a une source de première main ; les arrêtés préfectoraux de la loi montagne seront ajoutés à l'étape 8. |
| D9. Témoin STOP ou Service qui accompagne un voyant | Accepté, avec la variante pour l'entretien | Pour une anomalie (ABS, ESP, capteurs de pression, airbag), la consigne du témoin Service donne « tout de suite ». Pour le rappel d'entretien, l'exception de la grille sur l'entretien périodique s'applique : ce n'est pas une anomalie. La ligne `entretien-vidange` devient donc « Oui, avec précautions · À faire dans les jours qui viennent ». Un rappel de vidange présenté comme une urgence serait faux et ferait fuir le lecteur. |
| D10. Toyota et le voyant moteur clignotant | Accepté | Lecture la plus prudente. Le clignotement est de toute façon l'état le plus grave du voyant moteur orange. |
| D11. Seat et le défaut du système de pression | Seat listée « sans consigne » | Un conducteur de Seat trouve sa consigne (arrêt) dans la ligne `pression-pneus`, qui correspond à ce qu'il voit : un témoin allumé, sans clignotement. |
| D12. Définition de l'urgence « À faire tout de suite » | Demande de changement de la grille à préparer avant l'étape 6 | La définition doit couvrir les actions à faire en roulant (FAP, ESP). Le texte de la demande sera soumis à Houssem. |
| D13. Trace de la validation | Acceptée | Le paquet validé est archivé dans les documents du projet comme procès-verbal. La commande de versement vérifie l'empreinte du contenu validé. |

## Détail des décisions

**D1. Le voyant moteur orange passe en « Non, arrêtez-vous immédiatement ».**
- Pour son voyant de dysfonctionnement, la notice Toyota dit : « Arrêtez immédiatement le véhicule dans un endroit sûr ». Le verdict le plus prudent l'emporte : les deux lignes du voyant moteur orange prennent ce niveau.
- L'écart est affiché :
  - Renault et Dacia demandent de consulter au plus tôt ;
  - Seat laisse rouler prudemment jusqu'à l'atelier le plus proche ;
  - Peugeot laisse rouler pour le voyant fixe.
- L'action dit au lecteur de ne repartir que si la notice de sa voiture le permet.
- **Conséquences à mesurer** :
  - La page « voyant moteur », la plus recherchée du périmètre, s'ouvrira sur « Non, arrêtez-vous immédiatement ».
  - Les 5 pages de codes défaut sont rattachées au voyant moteur. Une ligne saisie liée à un voyant n'est jamais moins grave que lui (docs/08 §3, règle 2) : leurs encadrés hériteront donc au moins de ce niveau.
  - Même effet pour la pression des pneus (Seat et Toyota demandent de s'arrêter) et pour la batterie (quatre marques sur cinq imposent l'arrêt).
- Proposition : appliquer la règle telle quelle. La changer (par exemple retenir le niveau de la majorité) demanderait une demande de changement, et irait contre « jamais de verdict moins prudent qu'une source ».

**D2. L'encadré général d'une notice ne fixe pas le niveau d'un témoin précis.**
- La notice Seat (p. 94) place, après la liste de tous les témoins, verts et bleus compris, l'avertissement « Arrêtez le véhicule de manière sûre dès que possible. ».
- Appliqué à chaque témoin, il contredirait les consignes propres de la même notice. Par exemple, pour le filtre à particules, Seat demande au contraire de rouler entre 50 et 120 km/h. On retient donc la consigne propre au témoin.
- Quand il n'y en a pas, la notice est listée « sans consigne » : Seat pour l'ABS et l'ESP, Renault et Dacia pour l'alerte de niveau d'huile.
- Si D2 est refusée, toutes les lignes qui citent Seat ou la listent « sans consigne » passent en arrêt immédiat, même celles où Seat décrit un fonctionnement normal : ABS, ESP (fixe et clignotant), airbag, airbag passager désactivé, direction orange, FAP, AdBlue, niveau d'huile, entretien, frein de stationnement, préchauffage, défaut du système de pression des pneus. Cette absurdité confirme que l'encadré est général.
- Proposition : accepter.

**D3. Certaines lignes regroupent plusieurs affichages d'une même alerte.**
- Lignes concernées :
  - `moteur-rouge` : voyant moteur rouge (Peugeot), ou STOP avec « Risque casse moteur » (Renault, Dacia) ;
  - `huile-niveau` : voyant orange (Seat), ou message (Peugeot, Toyota) ;
  - `entretien-vidange` : clé, ou message de révision ;
  - `direction-rouge` : voyant rouge, ou STOP avec le voyant ou le message de direction ;
  - `adblue-demarrage-impossible` : réservoir vide, ou système bloqué ;
  - `pression-pneus` : sous-gonflage, ou message « Crevaison ».
- Raison : le lecteur cherche l'alerte, pas le dessin exact de sa marque.
- Proposition : accepter.

**D4. Voyants impossibles à mettre dans la base avec la règle des 3 marques de 2 groupes.**
- Ces voyants sont :
  - le **témoin d'usure des plaquettes** : il est absent des 5 notices (Toyota signale l'usure par un bruit) ;
  - le **préchauffage qui clignote** : seule la notice Seat le décrit ;
  - l'**EPC** (groupe Volkswagen) et l'**additif du FAP** (Stellantis).
- La page « voyant frein » vise aussi les plaquettes. Deux options :
  - (a) lire d'autres notices de marques de référence qui ont ce témoin (par exemple une Volkswagen Golf ou une Peugeot 3008) ;
  - (b) traiter les plaquettes dans le texte de la page, à l'étape 8, avec une ligne saisie citée.
- Décision : (b). Le guide Peugeot 3008 et 5008 (édition 01-22), lu le 24/10, n'a pas non plus ce témoin : la règle est hors d'atteinte.

**D5. Classements à vérifier en priorité.**
1. **Seat, voyant de pression des pneus** : « Arrêtez-vous le plus rapidement possible et contrôlez la pression et l'état de tous les pneus ». Rangé en arrêt immédiat ; avec Toyota, ce classement donne son verdict à la ligne.
2. **Seat, voyant moteur clignotant** : « susceptible d'endommager le catalyseur », mais la notice dit aussi de rouler prudemment jusqu'à l'atelier le plus proche. Rangé au niveau « Non, ne poursuivez pas votre trajet », selon l'ordre des questions de la grille (« annonce un dégât grave »). Sans effet sur la ligne, qui suit Toyota.
3. **AdBlue, démarrage impossible** :
   - Renault et Dacia « 0 km », Seat rouge avec voyant moteur, Peugeot : rangés au niveau 2, car on ne peut plus rouler jusqu'au garage une fois le moteur coupé ;
   - Seat, réservoir vide : rangé en arrêt immédiat (« Arrêtez le véhicule dans un endroit adéquat, sûr et plat, puis faites l'appoint »).
   - Renault et Dacia affichent ces messages « à la mise sous contact » (Clio p. 166, Sandero p. 138), donc voiture garée. L'action dit donc « ne repartez pas avant l'appoint ».
4. **Urgences** : « roulez prudemment jusqu'à l'atelier le plus proche » et « à l'apparition du témoin, continuez à rouler » sont rangés en urgence immédiate (principe 3 : formulation absente de la grille, niveau le plus prudent).
5. **Seat, voyant ESP clignotant** : l'avertissement de la p. 255 (« Lorsque les systèmes entrent dans la plage de régulation, adaptez immédiatement votre vitesse ») concerne ce système. Il fait passer la ligne en « Oui, avec précautions · À faire tout de suite ».
6. **Les 3 rappels R3-NIVEAU-A-VERIFIER** sont des faux positifs. Les mots relevés ne portent pas sur un délai :
   - préchauffage Seat : « le moteur peut être démarré immédiatement » ;
   - airbag passager Renault et Dacia : « vérifiez impérativement que le témoin est bien allumé ».

**D6. Couleurs.**
- La base n'a qu'une couleur par ligne. Le voyant airbag est rangé en « orange ou jaune », la couleur que donnent Peugeot et Seat ; il est rouge sur d'autres voitures, et la situation le dit.
- `moteur-rouge` et `adblue-demarrage-impossible` sont en rouge, même si Peugeot affiche le second en orange clignotant.

**D7. Adresse de la notice Toyota.**
- Toyota publie ses manuels par la page « Manuel du propriétaire » de toyota.fr, qui ouvre le portail de son prestataire (customerportal.tweddle-aws.eu).
- Le registre garde l'adresse de la visionneuse de ce portail.
- Proposition : accepter.

**D8. Pages hors base voyants.**
- Le tableau page → sources rattache :
  - les 5 codes défaut aux notices des lignes « voyant moteur » ;
  - la loi montagne au code de la route (art. D314-8) et au décret n° 2020-1264 ;
  - la pression des pneus à la notice Renault (pressions sur pneus froids, contrôle mensuel).
- Aucune page de la Sécurité routière sur la pression des pneus n'a été trouvée. Les arrêtés préfectoraux de la loi montagne seront ajoutés à l'étape 8.

**D9. Témoin général qui accompagne un voyant (Renault, Dacia).**
- Chez Renault et Dacia, un voyant s'allume souvent avec le témoin STOP ou le témoin Service (une clé). La notice donne à chacun sa consigne (Clio p. 136, Sandero p. 110) :
  - STOP : « arrêt impératif et immédiat » ;
  - Service : « arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement ».
- Règle appliquée : la consigne du témoin qui accompagne vaut pour l'état, et la citation prend la plus prudente des deux consignes (principe 3).
- Effets :
  - **direction** : le voyant de direction Renault et Dacia s'allume avec STOP. Ce cas est déplacé dans `direction-rouge` (arrêt immédiat). `direction-orange` repose maintenant sur Peugeot, Seat et Toyota (« Oui, avec précautions · À faire tout de suite »), et ne dit plus « Non, ne poursuivez pas votre trajet » ;
  - **ABS, ESP en défaut, capteurs de pression des pneus, message « Airbag à contrôler »** : avec le témoin Service, l'urgence passe à « tout de suite » ;
  - **entretien** : « Faire révision » s'affiche avec le témoin Service. Le verdict passe à « Oui, avec précautions » (« en conduisant avec ménagement »). L'urgence suit l'exception de la grille pour l'entretien périodique : « À faire dans les jours qui viennent ».
- Si D9 était refusée, la consigne propre au message l'emporterait : l'entretien resterait « Oui · dans les jours qui viennent », et l'ABS et l'ESP resteraient immédiats (à cause de Toyota).
- Décision : acceptée, avec l'exception d'entretien périodique pour la ligne `entretien-vidange` (voir le tableau).

**D10. Toyota et le voyant moteur clignotant.**
- La notice Toyota ne distingue pas le voyant fixe du voyant clignotant. Son introduction dit : « Si un voyant quelconque s'allume ou clignote, […] effectuez les opérations suivantes », et la consigne du voyant de dysfonctionnement est l'arrêt immédiat. On l'applique donc au clignotement.
- Sans cette lecture, `moteur-orange-clignotant` serait « Non, ne poursuivez pas votre trajet » (Peugeot).
- Proposition : accepter (lecture la plus prudente, principe 3).

**D11. Seat et le défaut du système de pression des pneus.**
- Seat ne décrit pas de clignotement : un défaut de son système s'affiche par le même témoin allumé, sous l'avertissement d'arrêt de la ligne `pression-pneus`.
- Seat est donc listée « sans consigne » pour `pression-pneus-systeme` (le clignotement) ; un conducteur de Seat y trouve sa consigne par la ligne `pression-pneus`.
- Option : citer Seat, et la ligne passerait en arrêt immédiat.
- Proposition : accepter la liste « sans consigne ».

**D12. Définition affichée de l'urgence « À faire tout de suite ».**
- La grille la définit ainsi : « au premier arrêt possible, ou en allant directement au garage si la conduite est permise ». Pour le filtre à particules et l'ESP clignotant, l'action est au contraire de continuer à rouler ou d'adapter sa vitesse.
- Proposition : une petite demande de changement de la grille, à faire avant l'étape 6, pour ajouter « ou en faisant tout de suite l'action indiquée ». Elle n'est pas appliquée ici.

**D13. Trace de la validation.**
- Le paquet affiche une empreinte du brouillon. Après la validation, `node scripts/valider-brouillon.ts --valide-par-houssem AAAA-MM-JJ --empreinte <empreinte>` refuse d'écrire si le brouillon a changé.
- La commande écrit ensuite :
  - `data/voyants.json`, avec l'empreinte de chaque ligne ;
  - `travaux/etape-5/validation.json`.
- La base finale ne garde pas la liste « sans consigne » (le schéma ne la prévoit pas).
- Proposition : le paquet validé est archivé dans les documents du projet, comme procès-verbal de validation.

## Après la validation
Une fois la validation de Houssem notée au journal, la commande de D13 verse le brouillon dans `data/voyants.json`. Les contrôles de la base (R4 compris) s'appliquent alors à chaque construction.
