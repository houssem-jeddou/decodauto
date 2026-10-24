# Paquet de validation : base voyants (étape 5)

Brouillon du 24/10/2026. Ce paquet est généré par `npm run paquet` à partir de `data/voyants.brouillon.json`, `data/sources.json` et `travaux/etape-5/pages-sources.json`. Rien n'est validé tant que Houssem ne l'a pas dit.

## Ce que Houssem valide
- **25 lignes de la base voyants** : pour chacune, la situation, le verdict, l'urgence, l'action et l'écart entre marques. Chaque notice citée l'est avec sa page, l'extrait mot pour mot et le niveau que la grille tire de sa consigne.
- **Le registre des sources** : 5 notices constructeur (Peugeot 208, Renault Clio 5, Dacia Sandero 3, Seat Ibiza, Toyota Yaris) et 2 textes Légifrance (loi montagne).
- **Le tableau page → sources** des pages de la vague A sans ligne dans la base.
- **Les 17 pictogrammes**, redessinés en formes simples (planche jointe à la présentation).
- **Les décisions D1 à D8** ci-dessous.

## Méthode suivie
- **Notices** : 5 marques de référence sur 7, de 4 groupes sur 4.
  - Citroën et Volkswagen n'ont pas été consultés : la règle des 3 marques de 2 groupes est tenue sans eux, et leurs groupes sont déjà représentés par Peugeot et Seat.
  - Chaque notice est la notice d'utilisation publiée par le constructeur, lue dans le PDF officiel ; le texte relevé est conservé dans `travaux/etape-5/notices/`.
- **Règle appliquée**, celle de la demande de changement n° 3, sans exception :
  - chaque notice consultée qui donne une consigne pour l'état décrit est citée ;
  - la ligne prend le niveau de la citation la plus prudente ;
  - l'écart entre marques est écrit dans la ligne.
- **Contrôles automatiques** : le brouillon passe tous les contrôles de la base (R3, R8, pictogrammes, rattachement au plan), sauf l'empreinte (R4), posée après la validation. Résultat : 0 erreur bloquante. Les 3 rappels R3-NIVEAU-A-VERIFIER sont expliqués en D5.

## Décisions à prendre

**D1. Le voyant moteur orange passe en « Non, arrêtez-vous immédiatement ».**
- La notice Toyota demande, pour ce voyant, d'« arrêter immédiatement le véhicule dans un endroit sûr ». Le verdict le plus prudent l'emporte : les deux lignes du voyant moteur orange (fixe et clignotant) prennent donc ce niveau.
- L'écart est affiché : Renault, Dacia et Seat laissent rouler prudemment jusqu'au garage ; Peugeot laisse rouler pour le voyant fixe.
- L'action dit au lecteur de ne repartir que si la notice de sa voiture le permet.
- Même effet ailleurs :
  - **pression des pneus** : Seat et Toyota demandent de s'arrêter ;
  - **batterie** : quatre marques sur cinq imposent l'arrêt ;
  - **direction orange** : voir D5.
- Proposition : appliquer la règle telle quelle. La changer (par exemple retenir le niveau de la majorité) demanderait une demande de changement, et irait contre « jamais de verdict moins prudent qu'une source ».

**D2. Une notice qui décrit un état sans consigne propre n'est pas citée.**
- Cas :
  - Seat, pour l'ABS et l'ESP ;
  - Renault et Dacia, pour l'alerte de niveau d'huile ;
  - Renault, pour le voyant de pression des pneus.
- Ces notices sont listées sous chaque ligne (« consultées sans consigne »), mais elles ne fixent aucun niveau.
- L'encadré général de la notice Seat (p. 94 : « Arrêtez le véhicule de manière sûre dès que possible. ») suit la liste de tous les témoins, verts et bleus compris. Il ne fixe pas de niveau pour un témoin précis : c'est la même logique que pour les pages web génériques (demande de changement n° 3, point 16).
- Proposition : accepter.

**D3. Certaines lignes regroupent plusieurs affichages d'une même alerte.**
- Lignes concernées :
  - `moteur-rouge` : voyant moteur rouge (Peugeot), ou STOP avec « Risque casse moteur » (Renault, Dacia) ;
  - `huile-niveau` : voyant orange (Seat), ou message (Peugeot, Toyota) ;
  - `entretien-vidange` : clé, ou message de révision ;
  - `direction-rouge` : voyant rouge, ou STOP avec « Panne de la direction » ;
  - `adblue-demarrage-impossible` : réservoir vide, ou système bloqué.
- Raison : le lecteur cherche l'alerte, pas le dessin exact de sa marque.
- Proposition : accepter.

**D4. Voyants impossibles à mettre dans la base avec la règle des 3 marques de 2 groupes.**
- Ces voyants sont :
  - le **témoin d'usure des plaquettes** : il est absent des 5 notices ; Toyota signale l'usure par un bruit, pas par un témoin ;
  - le **préchauffage qui clignote** : seule la notice Seat le décrit (groupe Volkswagen) ;
  - l'**EPC** (groupe Volkswagen) et l'**additif du FAP** (Stellantis).
- La page « voyant frein » vise aussi « plaquettes ». Deux options :
  - (a) lire d'autres notices de marques de référence qui ont ce témoin (par exemple une Volkswagen Golf ou une Peugeot 3008) ;
  - (b) traiter les plaquettes dans le texte de la page, à l'étape 8, avec une ligne saisie citée.
- Proposition : (a), si Houssem veut une ligne dans l'outil voyants ; sinon (b).

**D5. Classements à vérifier en priorité.**
1. **Renault et Dacia, voyant de direction orange** : « Faites appel à un Représentant de la marque ». La grille range « faire appel » au niveau « Non, ne poursuivez pas votre trajet ». C'est ce classement qui donne son verdict à la ligne `direction-orange`.
2. **Seat, voyant de pression des pneus** : « Arrêtez-vous le plus rapidement possible et contrôlez la pression et l'état de tous les pneus ». Rangé en arrêt immédiat ; avec Toyota, il donne son verdict à la ligne.
3. **Seat, voyant moteur clignotant** : « susceptible d'endommager le catalyseur », alors que la notice dit aussi de rouler prudemment jusqu'à l'atelier le plus proche. Rangé au niveau 2 (« annonce un dégât grave »), dans l'ordre des questions de la grille. Sans effet sur la ligne, qui suit Toyota.
4. **AdBlue, démarrage impossible** :
   - Renault « 0 KM » et Seat (rouge avec voyant moteur) : rangés au niveau 2, car on ne peut plus rouler jusqu'au garage une fois le moteur coupé ;
   - Seat (rouge, réservoir vide) : rangé en arrêt immédiat (« Arrêtez le véhicule… »).
5. **Urgences** : « roulez prudemment jusqu'à l'atelier le plus proche » et « à l'apparition du témoin, continuez à rouler » sont rangés en urgence immédiate (principe 3 : formulation absente de la grille, niveau le plus prudent).
6. **Seat, voyant ESP clignotant** : l'avertissement de la p. 255 (« Lorsque les systèmes entrent dans la plage de régulation, adaptez immédiatement votre vitesse ») est propre à ce système. Il fait passer la ligne en « Oui, avec précautions · À faire tout de suite ».
7. **Les 3 rappels R3-NIVEAU-A-VERIFIER** sont des faux positifs. Les mots relevés ne portent pas sur un délai :
   - préchauffage Seat : « le moteur peut être démarré immédiatement » ;
   - airbag passager Renault et Dacia : « vérifiez impérativement que le témoin est bien allumé ».

**D6. Couleurs.**
- La base n'a qu'une couleur par ligne. Le voyant airbag est rangé en « orange ou jaune » : c'est la couleur que donnent Peugeot et Seat. Il est rouge sur d'autres voitures, et la situation le dit.
- `moteur-rouge` et `adblue-demarrage-impossible` sont en rouge, même si Peugeot affiche le second en orange clignotant.

**D7. Adresse de la notice Toyota.**
- Toyota publie ses manuels par la page « Manuel du propriétaire » de toyota.fr, qui ouvre le portail de son prestataire (customerportal.tweddle-aws.eu).
- Le registre garde l'adresse de la visionneuse de ce portail.
- Proposition : accepter (source officielle, ouverte depuis toyota.fr).

**D8. Pages hors base voyants.**
- Le tableau page → sources rattache :
  - les codes défaut aux notices des lignes « voyant moteur » (et « préchauffage » pour P0380 et P1351) ;
  - la loi montagne au code de la route (art. D314-8) et au décret n° 2020-1264 ;
  - la pression des pneus à la notice Renault (pressions sur pneus froids, contrôle mensuel).
- Aucune page de la Sécurité routière sur la pression des pneus n'a été trouvée.

## Après la validation
Une fois la validation de Houssem notée au journal, une seule commande verse le brouillon dans `data/voyants.json`, avec l'empreinte de chaque ligne : `node scripts/valider-brouillon.ts --valide-par-houssem AAAA-MM-JJ`. Le brouillon est ensuite supprimé, et les contrôles de la base (R4 compris) s'appliquent.
