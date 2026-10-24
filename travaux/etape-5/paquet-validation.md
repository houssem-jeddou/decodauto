# Paquet de validation : base voyants (étape 5)

Brouillon du 24/10/2026, corrigé après la revue indépendante. Ce paquet est généré par `npm run paquet` à partir de `data/voyants.brouillon.json`, `data/sources.json` et `travaux/etape-5/pages-sources.json`. Rien n'est validé tant que Houssem ne l'a pas dit.

## Ce que Houssem valide
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
- **Revue indépendante** : 111 extraits comparés au texte des 5 PDF officiels, tous retrouvés. Ses corrections sont intégrées (voir l'encadré de la présentation).
- **Contrôles automatiques** : le brouillon passe tous les contrôles de la base (R3, R8, pictogrammes, rattachement au plan), sauf l'empreinte (R4), posée après la validation. Résultat : 0 erreur bloquante. Les 3 rappels R3-NIVEAU-A-VERIFIER sont expliqués en D5.

## Décisions à prendre

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
- Si D2 est refusée, les lignes `abs` et `esp-defaut` passent en arrêt immédiat, et toute ligne qui cite Seat aussi (airbag, direction orange, FAP, AdBlue, niveau d'huile).
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
- Proposition : (a), si Houssem veut le témoin dans l'outil voyants ; sinon (b).

**D5. Classements à vérifier en priorité.**
1. **Seat, voyant de pression des pneus** : « Arrêtez-vous le plus rapidement possible et contrôlez la pression et l'état de tous les pneus ». Rangé en arrêt immédiat ; avec Toyota, ce classement donne son verdict à la ligne.
2. **Seat, voyant moteur clignotant** : « susceptible d'endommager le catalyseur », mais la notice dit aussi de rouler prudemment jusqu'à l'atelier le plus proche. Rangé au niveau « Non, ne poursuivez pas votre trajet », selon l'ordre des questions de la grille (« annonce un dégât grave »). Sans effet sur la ligne, qui suit Toyota.
3. **AdBlue, démarrage impossible** :
   - Renault et Dacia « 0 km », Seat rouge avec voyant moteur, Peugeot : rangés au niveau 2, car on ne peut plus rouler jusqu'au garage une fois le moteur coupé ;
   - Seat, réservoir vide : rangé en arrêt immédiat (« Arrêtez le véhicule dans un endroit adéquat, sûr et plat, puis faites l'appoint »).
   - En pratique, le message apparaît le plus souvent au démarrage, voiture garée. L'action dit donc « ne repartez pas avant l'appoint ».
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
  - **entretien** : « Faire révision » s'affiche avec le témoin Service. La ligne devient « Oui, avec précautions · À faire dans les jours qui viennent ». Ce délai suit l'exception de la grille pour l'entretien périodique (« dès que possible » ne vaut pas « tout de suite »).
- Si D9 est refusée, la consigne propre au message l'emporte : l'entretien reste « Oui », et l'ABS reste immédiat (à cause de Toyota).
- Proposition : accepter.

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

Empreinte du brouillon présenté : `16a59defe3a74117fb95529d32ca0123fecd8a34eac46a91e91a3a125d64fb01` (à redonner à `scripts/valider-brouillon.ts` après la validation).

## Résumé des lignes

| n° | Identifiant | Page | Couleur | Verdict | Urgence | Marques citées |
|---|---|---|---|---|---|---|
| 1 | moteur-orange-fixe | voyant-moteur | orange ou jaune | Non, arrêtez-vous immédiatement | À faire tout de suite | Peugeot, Seat, Renault, Dacia, Toyota |
| 2 | moteur-orange-clignotant | voyant-moteur | orange ou jaune | Non, arrêtez-vous immédiatement | À faire tout de suite | Peugeot, Seat, Renault, Dacia, Toyota |
| 3 | moteur-rouge | voyant-moteur | rouge | Non, arrêtez-vous immédiatement | À faire tout de suite | Peugeot, Renault, Dacia |
| 4 | huile-pression-rouge | voyant-huile | rouge | Non, arrêtez-vous immédiatement | À faire tout de suite | Peugeot, Seat, Renault, Dacia, Toyota |
| 5 | huile-niveau | voyant-huile | orange ou jaune | Oui, avec précautions | À faire tout de suite | Seat, Peugeot, Toyota |
| 6 | entretien-vidange | voyant-huile | orange ou jaune | Oui, avec précautions | À faire dans les jours qui viennent | Peugeot, Seat, Renault, Dacia, Toyota |
| 7 | batterie-rouge | voyant-batterie | rouge | Non, arrêtez-vous immédiatement | À faire tout de suite | Peugeot, Seat, Renault, Dacia, Toyota |
| 8 | frein-rouge | voyant-frein | rouge | Non, arrêtez-vous immédiatement | À faire tout de suite | Peugeot, Seat, Renault, Dacia, Toyota |
| 9 | frein-stationnement | voyant-frein | rouge | Oui, vous pouvez rouler | Aucune action nécessaire | Peugeot, Seat, Renault, Dacia, Toyota |
| 10 | adblue-reserve | voyant-adblue | orange ou jaune | Oui, avec précautions | À faire tout de suite | Peugeot, Seat, Renault, Dacia |
| 11 | adblue-demarrage-impossible | voyant-adblue | rouge | Non, arrêtez-vous immédiatement | À faire tout de suite | Seat, Peugeot, Renault, Dacia |
| 12 | adblue-defaut | voyant-adblue | orange ou jaune | Oui, avec précautions | À faire tout de suite | Peugeot, Seat, Renault, Dacia |
| 13 | fap | voyant-fap | orange ou jaune | Oui, avec précautions | À faire tout de suite | Peugeot, Seat, Renault, Dacia |
| 14 | prechauffage | voyant-prechauffage | orange ou jaune | Oui, vous pouvez rouler | Aucune action nécessaire | Peugeot, Seat, Renault, Dacia |
| 15 | airbag-defaut | voyant-airbag | orange ou jaune | Oui, avec précautions | À faire tout de suite | Peugeot, Seat, Renault, Dacia, Toyota |
| 16 | airbag-passager-desactive | voyant-airbag | orange ou jaune | Oui, vous pouvez rouler | Aucune action nécessaire | Peugeot, Seat, Renault, Dacia, Toyota |
| 17 | abs | voyant-abs-esp | orange ou jaune | Oui, avec précautions | À faire tout de suite | Peugeot, Renault, Dacia, Toyota |
| 18 | abs-et-frein | voyant-abs-esp | rouge | Non, arrêtez-vous immédiatement | À faire tout de suite | Peugeot, Seat, Renault, Dacia, Toyota |
| 19 | esp-clignotant | voyant-abs-esp | orange ou jaune | Oui, avec précautions | À faire tout de suite | Seat, Peugeot, Renault, Dacia, Toyota |
| 20 | esp-defaut | voyant-abs-esp | orange ou jaune | Oui, avec précautions | À faire tout de suite | Peugeot, Renault, Dacia, Toyota |
| 21 | pression-pneus | voyant-pression-pneus | orange ou jaune | Non, arrêtez-vous immédiatement | À faire tout de suite | Peugeot, Seat, Dacia, Toyota, Renault |
| 22 | pression-pneus-systeme | voyant-pression-pneus | orange ou jaune | Oui, avec précautions | À faire tout de suite | Peugeot, Dacia, Toyota |
| 23 | direction-orange | voyant-direction | orange ou jaune | Oui, avec précautions | À faire tout de suite | Peugeot, Seat, Toyota |
| 24 | direction-rouge | voyant-direction | rouge | Non, arrêtez-vous immédiatement | À faire tout de suite | Seat, Peugeot, Renault, Dacia, Toyota |
| 25 | temperature-rouge | surchauffe-moteur | rouge | Non, arrêtez-vous immédiatement | À faire tout de suite | Peugeot, Seat, Renault, Dacia, Toyota |

## Registre des sources

| Identifiant | Titre | Catégorie | Adresse | Consultée le |
|---|---|---|---|---|
| notice-peugeot-208 | Peugeot 208 — Guide d'utilisation (édition 01-20) | notice-constructeur | https://public.servicebox.peugeot.com/APddb/modeles/208.p2/eGuide_p21_ed01-20/pdfs/9999_9999_401_fr-FR.pdf | 2026-10-23 |
| notice-seat-ibiza | Seat Ibiza — Notice d'utilisation (édition 11/20) | notice-constructeur | https://www.seat.fr/datamanual-manual/ibiza/my21_w48/fr-fr/IBIZA_11_20_FR.pdf | 2026-10-23 |
| notice-renault-clio-5 | Renault Clio 5 phase 2 — Notice d'utilisation (réf. 1457-3) | notice-constructeur | https://www.user-manual.renault.com/sites/renault/files/Clio_5_ph2_-_1457-3_FRA.pdf | 2026-10-23 |
| notice-dacia-sandero-3 | Dacia Sandero 3 — Notice d'utilisation (réf. 1688-1) | notice-constructeur | https://www.user-manual.dacia.com/sites/dacia/files/GUI_NU_DAC_BJI_1688_1_0_LHD-RHD_PRNT-fr-FR.pdf | 2026-10-24 |
| notice-toyota-yaris | Toyota Yaris — Manuel du propriétaire (réf. PZ49X-9A592-FR) | notice-constructeur | https://customerportal.tweddle-aws.eu/pdf/PZ49X-9A592-FR?modelType=Yaris&lineOffDate=2024-01-15 | 2026-10-24 |
| code-de-la-route-d314-8 | Code de la route, article D314-8 (équipements des véhicules en période hivernale) | legifrance | https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042436965 | 2026-10-24 |
| decret-2020-1264 | Décret n° 2020-1264 du 16 octobre 2020 relatif à l'obligation d'équipement de certains véhicules en période hivernale | legifrance | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000042434406 | 2026-10-24 |

## Pages de la vague A : source de première main (critère de la porte 5)

| Page | Sources de première main | Rattachement |
|---|---|---|
| voyants | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | tableau page → sources : l'outil voyants affiche toutes les lignes de la base, tirées de ces notices |
| voyant-moteur | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | base voyants |
| voyant-huile | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | base voyants |
| voyant-batterie | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | base voyants |
| voyant-frein | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | base voyants |
| voyant-adblue | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3 | base voyants |
| voyant-fap | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3 | base voyants |
| voyant-prechauffage | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3 | base voyants |
| voyant-airbag | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | base voyants |
| voyant-abs-esp | notice-peugeot-208, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris, notice-seat-ibiza | base voyants |
| voyant-pression-pneus | notice-peugeot-208, notice-seat-ibiza, notice-dacia-sandero-3, notice-toyota-yaris, notice-renault-clio-5 | base voyants |
| voyant-direction | notice-peugeot-208, notice-seat-ibiza, notice-toyota-yaris, notice-renault-clio-5, notice-dacia-sandero-3 | base voyants |
| code-p0420 | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | tableau page → sources : verdict tiré des lignes « voyant moteur » de la base (libellé du code : source secondaire) |
| code-p0087 | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | tableau page → sources : verdict tiré des lignes « voyant moteur » de la base (libellé du code : source secondaire) |
| code-p0299 | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | tableau page → sources : verdict tiré des lignes « voyant moteur » de la base (libellé du code : source secondaire) |
| code-p0380 | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | tableau page → sources : verdict tiré des lignes « voyant moteur » de la base (libellé du code : source secondaire ; la ligne « préchauffage » décrit un fonctionnement normal et ne porte pas le verdict d'un défaut) |
| code-p1351 | notice-peugeot-208, notice-seat-ibiza, notice-renault-clio-5, notice-dacia-sandero-3, notice-toyota-yaris | tableau page → sources : verdict tiré des lignes « voyant moteur » de la base (libellé du code : source secondaire ; la ligne « préchauffage » décrit un fonctionnement normal et ne porte pas le verdict d'un défaut) |
| pression-des-pneus | notice-renault-clio-5 | tableau page → sources : pressions de gonflage lues sur l'étiquette de la porte conducteur, vérifiées pneus froids, au moins une fois par mois (notice Renault Clio 5, p. 206 et 348) |
| loi-montagne | code-de-la-route-d314-8, decret-2020-1264 | tableau page → sources : obligation d'équipement en période hivernale : code de la route, art. D314-8, créé par l'article 1er du décret n° 2020-1264 et modifié par son article 2 (version en vigueur depuis le 1er novembre 2024) ; les arrêtés préfectoraux listant les communes seront ajoutés au registre à l'étape 8 |

## Lignes de la base voyants, une par une

### 1. Voyant moteur orange allumé fixe

- **Identifiant** : `moteur-orange-fixe` · **page** : voyant-moteur · **couleur** : orange ou jaune · **pictogramme** : moteur · **catégorie** : Moteur et antipollution
- **Situation** : Le voyant moteur (antipollution) orange reste allumé fixe, moteur tournant.
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez que si la notice de votre voiture permet de rouler jusqu'au garage, et faites alors contrôler le moteur sans attendre en roulant prudemment ; sinon, faites appel à un garage ou à l'assistance.
- **Écart entre marques** : Toyota demande d'arrêter immédiatement le véhicule. Renault et Dacia demandent de consulter au plus tôt un représentant de la marque, Seat de rouler prudemment jusqu'à l'atelier le plus proche, Peugeot de s'y rendre rapidement.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 15, « Système d'autodiagnostic moteur » ; renvoi (3) p. 13 | « Fixe. Le système d'antipollution est défaillant. Le témoin doit s'éteindre au démarrage du moteur. Effectuer (3) rapidement. Fixes. Une défaillance mineure du moteur est détectée. Effectuer (3). […] (3) : Se rendre dans le réseau PEUGEOT ou dans un atelier qualifié. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 288, « Gestion du moteur et système d'épuration des gaz d'échappement », Témoins | « Témoin allumé. Dysfonctionnement du système de contrôle des gaz d'échappement. Levez le pied de l'accélérateur et roulez prudemment jusqu'à l'atelier spécialisé le plus proche pour y faire contrôler le moteur. » | Oui, avec précautions · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 139, « Témoin de contrôle du système antipollution » (repris p. 199) | « S'il s'allume de façon continue, consultez au plus tôt un Représentant de la marque » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 113, « Témoin de contrôle du système antipollution » | « S'il s'allume de façon continue, consultez au plus tôt un Représentant de la marque » | Oui, avec précautions · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 293, 7.2.4 « Si un voyant s'allume », Voyant de dysfonctionnement | « Indique un dysfonctionnement dans : Le système électronique de commande du moteur ; Le système électronique de commande de papillon ; ou Le système électronique de commande de Multidrive (si le véhicule en est équipé). Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié. » | Non, arrêtez-vous immédiatement · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 2. Voyant moteur orange clignotant

- **Identifiant** : `moteur-orange-clignotant` · **page** : voyant-moteur · **couleur** : orange ou jaune · **pictogramme** : moteur · **catégorie** : Moteur et antipollution
- **Situation** : Le voyant moteur (antipollution) orange clignote, moteur tournant : des ratés de combustion peuvent abîmer le catalyseur.
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Levez le pied, puis arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez que si la notice de votre voiture le permet, en réduisant le régime moteur et jusqu'au garage le plus proche ; sinon, faites appel à un garage ou à l'assistance.
- **Écart entre marques** : Toyota demande d'arrêter immédiatement le véhicule ; Peugeot demande de faire appel au réseau (risque de destruction du catalyseur) ; Seat signale un risque pour le catalyseur et demande de rouler prudemment jusqu'à l'atelier le plus proche ; Renault et Dacia demandent de réduire le régime moteur et de consulter au plus tôt.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 15, « Système d'autodiagnostic moteur » ; renvoi (2) p. 13 | « Clignotant. Le système du contrôle moteur est défaillant. Risque de destruction du catalyseur. Effectuer impérativement (2). […] (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié. » | Non, ne poursuivez pas votre trajet · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 288, « Gestion du moteur et système d'épuration des gaz d'échappement », Témoins | « Clignote. Dysfonctionnement de combustion susceptible d'endommager le catalyseur. Levez le pied de l'accélérateur et roulez prudemment jusqu'à l'atelier spécialisé le plus proche pour y faire contrôler le moteur. » | Non, ne poursuivez pas votre trajet · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 139, « Témoin de contrôle du système antipollution » (repris p. 199) | « s'il clignote, réduisez le régime moteur jusqu'à disparition du clignotement. Consultez au plus tôt un Représentant de la marque » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 113, « Témoin de contrôle du système antipollution » | « s'il clignote, réduisez le régime moteur jusqu'à disparition du clignotement. Consultez au plus tôt un Représentant de la marque » | Oui, avec précautions · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 292-293, 7.2.4 « Si un voyant s'allume », Voyant de dysfonctionnement | « Si un voyant quelconque s'allume ou clignote, gardez votre calme et effectuez les opérations suivantes. […] Voyant de dysfonctionnement […] Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié. » | Non, arrêtez-vous immédiatement · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 3. Voyant moteur rouge, ou STOP avec « Risque casse moteur »

- **Identifiant** : `moteur-rouge` · **page** : voyant-moteur · **couleur** : rouge · **pictogramme** : moteur · **catégorie** : Moteur et antipollution
- **Situation** : Le voyant moteur s'allume en rouge (Peugeot), ou le témoin STOP s'allume avec le message « Risque casse moteur » (Renault, Dacia).
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Arrêtez-vous dès que vous pouvez le faire sans danger, coupez le moteur et ne le redémarrez pas. Faites appel à un garage ou à l'assistance.
- **Écart entre marques** : aucun (toutes les citations donnent le même niveau)

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 13, « Témoins de couleur rouge », Système d'autodiagnostic moteur ; renvois (1) et (2) p. 13 | « Système d'autodiagnostic moteur (Essence ou Diesel) Fixes. Une défaillance majeure du moteur est détectée. Effectuer (1), puis (2). […] (1) : L'arrêt du véhicule est impératif. Stationner dans les meilleures conditions de sécurité et couper le contact. (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 125, « Messages d'alerte » (et p. 187 et 189) | « Ils apparaissent avec le témoin et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez votre moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. […] « Risque casse moteur » Indique une défaillance de l'injection, une surchauffe du moteur du véhicule ou un problème grave au niveau du moteur. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 102, « Messages d'alerte » (et p. 161) | « Ils apparaissent avec le témoin et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez votre moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. […] « Risque casse moteur » Indique une défaillance de l'injection, une surchauffe du moteur du véhicule ou un problème grave au niveau du moteur. » | Non, arrêtez-vous immédiatement · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 4. Voyant de pression d'huile rouge

- **Identifiant** : `huile-pression-rouge` · **page** : voyant-huile · **couleur** : rouge · **pictogramme** : huile · **catégorie** : Lubrification et entretien
- **Situation** : Le voyant de pression d'huile (burette) s'allume en rouge, moteur tournant.
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Vérifiez le niveau d'huile. Même s'il est correct, ne repartez pas : faites appel à un garage ou à l'assistance.
- **Écart entre marques** : aucun (toutes les citations donnent le même niveau)

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 13, « Témoins de couleur rouge », Pression d'huile moteur ; renvois (1) et (2) p. 13 | « Pression d'huile moteur (Essence ou Diesel) Fixe. Le circuit de lubrification du moteur est défaillant. Effectuer (1), puis (2). […] (1) : L'arrêt du véhicule est impératif. Stationner dans les meilleures conditions de sécurité et couper le contact. (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 294, « Huile moteur », Témoin d'alerte | « S'allume en rouge. Arrêtez-vous immédiatement ! La pression d'huile moteur est trop faible. Éteignez le moteur. Vérifiez le niveau d'huile moteur. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 137-138, « Témoin de pression d'huile » | « S'il s'allume sur route, accompagné du témoin [STOP] et d'un signal sonore, arrêtez-vous impérativement et coupez le contact. Vérifiez le niveau d'huile. Si le niveau est normal, cela provient d'une autre cause. Faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 111, « Témoin de pression d'huile » | « S'il s'allume sur route accompagné du témoin [STOP] et d'un signal sonore, arrêtez-vous impérativement et coupez le contact. Vérifiez le niveau d'huile. Si le niveau est normal, cela provient d'une autre cause : consultez rapidement un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 292, 7.2.4 « Si un voyant s'allume », Voyant de faible pression d'huile moteur | « Indique que la pression d'huile moteur est trop basse. Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié. » | Non, arrêtez-vous immédiatement · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 5. Alerte de niveau d'huile bas (voyant orange ou message)

- **Identifiant** : `huile-niveau` · **page** : voyant-huile · **couleur** : orange ou jaune · **pictogramme** : huile-niveau · **catégorie** : Lubrification et entretien
- **Situation** : Un voyant orange de niveau d'huile s'allume, ou un message signale un niveau d'huile moteur bas ou incorrect.
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Vérifiez sans attendre le niveau d'huile à la jauge, voiture à plat et moteur arrêté comme l'indique la notice, et faites l'appoint avec l'huile qu'elle préconise. Si le niveau est correct et que l'alerte reste affichée, faites contrôler la jauge électrique par un garage.
- **Écart entre marques** : Toyota demande de vérifier le niveau et de faire l'appoint sans indiquer de délai ; Seat et Peugeot demandent de le faire immédiatement ou impérativement.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 294, « Huile moteur », Témoin d'alerte | « S'allume en jaune. Contrôlez immédiatement le niveau d'huile du moteur. Faites l'appoint d'huile dès que possible » | Oui, avec précautions · À faire tout de suite |
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 20, « Indicateur de niveau d'huile moteur », Manque d'huile | « Indiqué, selon combiné, par l'affichage " OIL " ou par le message " Niveau d'huile incorrect " accompagné de l'allumage du témoin de service et d'un signal sonore. Si le manque d'huile est confirmé par la vérification à la jauge manuelle, compléter impérativement le niveau pour éviter la détérioration du moteur. » | Oui, avec précautions · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 299, 7.2.5 « Si un message d'avertissement est affiché » | « Si “Niveau d'huile moteur faible. Ajoutez ou remplacez.” s'affiche. Le niveau d'huile moteur est faible. Vérifiez le niveau d'huile moteur et faites l'appoint, si nécessaire. » | Oui, avec précautions · À faire dans les jours qui viennent |

**Notices consultées sans consigne propre à cet état** (non citées, aucun niveau) :
- Renault, p. 131, « Alerte niveau d'huile moteur minimum » : Alerte affichée au démarrage, sans consigne propre (renvoi à la lecture de la jauge, p. 330).
- Dacia, p. 105 et 294, « Alerte niveau d'huile moteur minimum » : Alerte affichée au démarrage, sans consigne propre (méthode de lecture à la jauge, p. 294).

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 6. Rappel d'entretien : voyant clé ou message de révision ou de vidange

- **Identifiant** : `entretien-vidange` · **page** : voyant-huile · **couleur** : orange ou jaune · **pictogramme** : cle-entretien · **catégorie** : Lubrification et entretien
- **Situation** : Le voyant clé s'allume, ou un message demande de faire la révision ou la vidange : l'échéance d'entretien est proche ou dépassée.
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire dans les jours qui viennent (`sous quelques jours`)
- **Action** : Vous pouvez rouler, avec ménagement si la notice le demande (Renault, Dacia). Faites faire la révision ou la vidange dans les jours qui viennent, puis remettre l'indicateur à zéro.
- **Écart entre marques** : Chez Renault et Dacia, le message s'accompagne du témoin Service, dont la notice demande d'aller au plus tôt chez un représentant de la marque en conduisant avec ménagement ; Peugeot, Seat et Toyota rappellent un entretien à faire, sans précaution de conduite.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 19-20, « Indicateur d'entretien », Clé d'entretien | « Fixe, dès la mise du contact. L'échéance de révision est inférieure à 1 000 km. Effectuer la révision très prochainement. Clé d'entretien clignotante. Clignotant puis fixe, dès la mise du contact. […] L'échéance de révision est dépassée. Effectuer la révision dès que possible. » | Oui, vous pouvez rouler · À faire dans les jours qui viennent |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 90, « Périodicité d'entretien », Date d'entretien | « Lorsqu'un entretien ou une inspection arrive à échéance, il est possible qu'un signal sonore retentisse après avoir mis le contact et que le symbole clé plate s'affiche à l'écran du combiné d'instruments, accompagné des messages suivants : Entretien maintenant ! Faites inspecter le véhicule. Service de vidange d'huile nécessaire ! Vidange d'huile et entretien nécessaires ! » | Oui, vous pouvez rouler · À faire dans les jours qui viennent |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 122, « Ordinateur de bord », Autonomie de révision ; témoin Service p. 136 | « autonomie égale à 0 km ou date de révision atteinte : le message « Faire révision » s'affiche accompagné du témoin [Service]. Le véhicule nécessite alors une révision le plus rapidement possible. […] (p. 136) Le témoin [Service] nécessite un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 98, « Ordinateur de bord », Autonomie de révision ; témoin Service p. 110 | « autonomie égale à 0 km ou date de révision atteinte : le message « Faire révision » s'affiche accompagné du témoin [Service]. Le véhicule nécessite alors une révision le plus rapidement possible. […] (p. 110) Le témoin [Service] nécessite un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 300, 7.2.5 « Si un message d'avertissement est affiché » | « Si “Entretien d'huile requis. Visitez votre concessionnaire.” s'affiche. Indique qu'une vidange de l'huile moteur est requise. Faites vérifier et vidanger l'huile moteur et changer le filtre à huile par un concessionnaire ou un réparateur Toyota agréé, ou par tout autre réparateur qualifié. » | Oui, vous pouvez rouler · À faire dans les jours qui viennent |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 7. Voyant de charge de la batterie rouge

- **Identifiant** : `batterie-rouge` · **page** : voyant-batterie · **couleur** : rouge · **pictogramme** : batterie · **catégorie** : Charge électrique
- **Situation** : Le voyant batterie s'allume en rouge moteur tournant : la batterie n'est plus rechargée (alternateur, courroie ou circuit de charge).
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le contact. Ne repartez pas si la notice de votre voiture l'interdit : faites appel à un garage ou à l'assistance. Si elle permet de rejoindre l'atelier le plus proche (Seat), éteignez les équipements électriques non indispensables.
- **Écart entre marques** : Seat laisse rouler jusqu'à l'atelier spécialisé le plus proche, immédiatement ; Peugeot, Renault, Dacia et Toyota imposent l'arrêt.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 13, « Témoins de couleur rouge », Charge batterie 12 V ; renvoi (1) p. 13 | « Charge batterie 12 V. Fixe. Le circuit de charge de la batterie est défaillant (ex. : cosses sales, courroie d'alternateur détendue ou sectionnée). Effectuer (1). […] (1) : L'arrêt du véhicule est impératif. Stationner dans les meilleures conditions de sécurité et couper le contact. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 302, « Batterie », Témoin d'alerte | « Si le témoin s'allume en cours de route, la batterie du véhicule n'est plus rechargée par l'alternateur. Rendez-vous immédiatement dans l'atelier spécialisé le plus proche. Mais comme la batterie se décharge, il est alors préférable d'éteindre tous les dispositifs électriques non absolument indispensables. » | Oui, avec précautions · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 137, « Témoin de charge de batterie » | « S'il s'allume sur route accompagné du témoin [STOP] et d'un signal sonore, cela indique une surcharge ou une décharge du circuit électrique. Arrêtez-vous et faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 112, « Témoin de charge de batterie » | « S'il s'allume sur route accompagné du témoin [STOP] et d'un signal sonore, cela indique une surcharge ou une décharge du circuit électrique. Arrêtez-vous et faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 292, 7.2.4 « Si un voyant s'allume », Voyant du système de charge | « Indique un dysfonctionnement du système de charge du véhicule. Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié. » | Non, arrêtez-vous immédiatement · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 8. Voyant de freinage rouge (liquide de frein ou circuit de freinage)

- **Identifiant** : `frein-rouge` · **page** : voyant-frein · **couleur** : rouge · **pictogramme** : frein · **catégorie** : Freinage
- **Situation** : Le voyant de freinage rouge reste allumé ou s'allume en roulant, frein de stationnement desserré : niveau de liquide de frein bas ou défaut du circuit de freinage.
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez pas : faites appel à un garage ou à l'assistance. Le niveau de liquide de frein peut être complété avec le liquide préconisé, mais si le voyant reste allumé, le véhicule ne doit pas rouler.
- **Écart entre marques** : aucun (toutes les citations donnent le même niveau)

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 14, « Freinage » ; renvois (1) et (2) p. 13 | « Freinage. Fixe. La baisse du niveau de liquide de frein dans le circuit de freinage est importante. Effectuer (1), puis faire l'appoint avec un liquide conforme aux recommandations du Constructeur. Si le problème persiste, effectuer (2). […] (1) : L'arrêt du véhicule est impératif. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 251, « Système de freinage », Témoins | « S'allume en rouge. Niveau de liquide de frein trop bas […] ou dysfonctionnement du circuit de freinage. Ne continuez pas de rouler ! » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 137, « Témoin d'incident sur circuit de freinage » | « S'il s'allume au freinage, accompagné du témoin [STOP] et d'un signal sonore, c'est l'indice d'une baisse de niveau dans les circuits ou d'un incident sur le système de freinage. Arrêtez-vous et faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 110-111, « Témoin d'incident sur circuit de freinage » | « S'il s'allume au freinage, accompagné du témoin [STOP] et d'un signal sonore, c'est l'indice d'une baisse de niveau dans les circuits ou d'un incident sur le système de freinage. Arrêtez-vous et faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 292, 7.2.4 « Si un voyant s'allume », Voyant du système de freinage | « Indique ce qui suit : Le niveau du liquide de frein est bas ; ou Le système de freinage présente un dysfonctionnement. Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié. Il pourrait être dangereux de continuer à conduire. » | Non, arrêtez-vous immédiatement · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 9. Voyant de frein de stationnement (frein à main serré)

- **Identifiant** : `frein-stationnement` · **page** : voyant-frein · **couleur** : rouge · **pictogramme** : frein-stationnement · **catégorie** : Freinage
- **Situation** : Le voyant de frein de stationnement est allumé : le frein à main ou le frein de parking électrique est serré.
- **Verdict** : Oui, vous pouvez rouler (`oui`)
- **Urgence** : Aucune action nécessaire (`aucune`)
- **Action** : Desserrez complètement le frein de stationnement avant de rouler : le voyant doit s'éteindre.
- **Écart entre marques** : aucun (toutes les citations donnent le même niveau)

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 14, « Frein de stationnement manuel » et « Frein de stationnement électrique » | « Frein de stationnement manuel. Fixe. Le frein de stationnement est serré ou mal desserré. Frein de stationnement électrique. Fixe. Le frein de stationnement électrique est serré. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 251, « Système de freinage », Témoins | « S'allume en rouge. Frein à main serré. Le témoin s'éteint lorsque le frein à main est desserré. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 190, « Frein de parking assisté » | « Le serrage du frein de parking assisté est confirmé par le message « Frein de parking serré » et le témoin au tableau de bord » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 155, « Frein de parking assisté » | « Le serrage du frein de parking assisté est confirmé par le message « Frein de parking serré » et le témoin au tableau de bord » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 118, 4.2.5 « Frein de stationnement » | « Engage le frein de stationnement […] Le témoin de frein de stationnement s'allume. Relâche le frein de stationnement […] Le témoin de frein de stationnement s'éteint. […] Un signal sonore retentit si le véhicule roule avec le frein de stationnement engagé. Le message “Relâchez le frein de stationnement” s'affiche » | Oui, vous pouvez rouler · Aucune action nécessaire |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 10. Voyant AdBlue orange (réserve basse, démarrage bientôt bloqué)

- **Identifiant** : `adblue-reserve` · **page** : voyant-adblue · **couleur** : orange ou jaune · **pictogramme** : adblue · **catégorie** : Antipollution diesel
- **Situation** : Le voyant AdBlue orange s'allume ou clignote avec un message d'autonomie, par exemple « démarrage impossible dans … km ».
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Faites l'appoint d'AdBlue sans attendre, à la pompe ou avec un bidon (au moins la quantité minimale indiquée par la notice), avant la fin de l'autonomie affichée : à zéro, le moteur ne redémarre plus.
- **Écart entre marques** : Seat laisse faire l'appoint dans les kilomètres indiqués (le voyant s'allume à 1 000 km d'autonomie) ; Renault et Dacia laissent prévoir l'appoint entre 1 200 et 800 km, puis le demandent dès que possible ; Peugeot demande un appoint rapide sous 800 km d'autonomie, impératif sous 100 km.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 15, « AdBlue (BlueHDi) » | « Allumé pendant 30 secondes environ à chaque démarrage du véhicule, accompagné d'un message indiquant l'autonomie de roulage. L'autonomie de roulage est comprise entre 2 400 et 800 km. Faire un appoint en AdBlue. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 15, « AdBlue (BlueHDi) » ; renvoi (3) p. 13 | « Fixe dès la mise du contact, accompagné d'un signal sonore et d'un message indiquant l'autonomie de roulage. L'autonomie de roulage est comprise entre 800 et 100 km. Faire rapidement un appoint en AdBlue, ou effectuer (3). Clignotant […] L'autonomie de roulage est inférieure à 100 km. Faire impérativement un appoint en AdBlue pour éviter le blocage du démarrage, ou effectuer (3). » | Oui, avec précautions · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 286, « AdBlue », Témoins d'alerte et de contrôle | « S'allume en jaune. La réserve d'AdBlue est faible. Faites l'appoint d'additif AdBlue dans les prochains kilomètres (ou milles) indiqués. SEAT recommande pour cela de vous rendre dans un atelier spécialisé. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 166, « Réservoir réactif », Entretien/Autonomie | « [témoin] s'allume. « Remplir AdBlue avant 1200 km » Lorsque le message s'affiche à la mise sous contact du moteur, il vous reste entre 1200 km et 800 km d'autonomie. Prévoyez d'effectuer ou de faire effectuer par un Représentant de la marque, le remplissage de réactif dans le réservoir. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 166, « Réservoir réactif », Entretien/Autonomie | « [témoin] clignote. « XXX KM blocage remplir AdBlue » […] Dans tous les cas, effectuez ou faites effectuer par un Représentant de la marque, le plein de réactif dans le réservoir dès que possible. » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 138, « Réservoir réactif », Entretien/Autonomie | « [témoin] s'allume. « REMPLIR ADBLUE AVANT 1200km » Lorsque le message s'affiche à la mise sous contact du moteur, il vous reste entre 1200 km et 800 km d'autonomie. Prévoyez d'effectuer ou de faire effectuer par un Représentant de la marque, le remplissage ou un appoint de réactif dans le réservoir. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 138, « Réservoir réactif », Entretien/Autonomie | « [témoin] s'allume. « xxxKM BLOCAGE REMPLIR ADBLUE » […] Dans tous les cas, effectuez ou faites effectuer par un Représentant de la marque, le plein de réactif dans le réservoir dès que possible. » | Oui, avec précautions · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 11. AdBlue : démarrage impossible (réservoir vide ou système bloqué)

- **Identifiant** : `adblue-demarrage-impossible` · **page** : voyant-adblue · **couleur** : rouge · **pictogramme** : adblue · **catégorie** : Antipollution diesel
- **Situation** : Le message annonce que le moteur ne peut plus redémarrer (« 0 km », « démarrage impossible ») : réservoir d'AdBlue vide ou système AdBlue bloqué. Selon la voiture, le voyant AdBlue est rouge ou clignote.
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Ne repartez pas avant d'avoir fait l'appoint d'AdBlue (au moins la quantité minimale indiquée par la notice), voiture garée dans un endroit sûr et plat. Si c'est un défaut du système AdBlue et non un réservoir vide, faites appel à un garage ou à l'assistance.
- **Écart entre marques** : Seat demande d'arrêter le véhicule dans un endroit sûr et plat pour faire l'appoint, et de s'adresser à un atelier en cas de défaut du système ; Peugeot, Renault et Dacia indiquent que le moteur ne redémarrera pas sans appoint d'AdBlue ou intervention du réseau, sans imposer l'arrêt.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 286, « AdBlue », Témoins d'alerte et de contrôle | « S'allume en rouge. Il est impossible de redémarrer le moteur ! Le niveau d'AdBlue est trop faible. Arrêtez le véhicule dans un endroit adéquat, sûr et plat, puis faites l'appoint avec la quantité minimale nécessaire d'additif AdBlue » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 286, « AdBlue », Témoins d'alerte et de contrôle | « [deux témoins] Il s'allume en rouge. Il est impossible de redémarrer le moteur ! Dysfonctionnement du circuit d'Adblue. Adressez-vous à un atelier spécialisé. Faites réviser le système. » | Non, ne poursuivez pas votre trajet · À faire tout de suite |
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 15-16, « AdBlue (BlueHDi) » et « Système d'antipollution SCR » ; renvoi (2) p. 13 | « Le réservoir d'AdBlue est vide : le dispositif d'antidémarrage réglementaire empêche le redémarrage du moteur. Pour redémarrer le moteur, faire un appoint en AdBlue, ou effectuer (2). […] Le dispositif d'antidémarrage empêche le redémarrage du moteur (…). Pour redémarrer le moteur, effectuer (2). […] (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié. » | Non, ne poursuivez pas votre trajet · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 166-167, « Réservoir réactif » | « « 0 KM blocage remplir AdBlue » Le démarrage du moteur est impossible. Pour redémarrer, vous devez faire vous-même le plein de réactif dans le réservoir. […] « 0 KM blocage antipollution » Indique qu'après coupure du contact, le redémarrage du véhicule est impossible. Faites appel à un Représentant de la marque. » | Non, ne poursuivez pas votre trajet · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 138-139, « Réservoir réactif » | « « 0KM BLOCAGE REMPLIR ADBLUE » Le démarrage du moteur est impossible. Pour redémarrer, vous devez faire vous-même le plein de réactif dans le réservoir. […] « 0KM BLOCAGE ANTIPOLLUTION » Indique qu'après coupure du contact, le redémarrage du véhicule est impossible. Faites appel à un Représentant de la marque. » | Non, ne poursuivez pas votre trajet · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 12. Voyant AdBlue avec voyant moteur ou Service (système AdBlue défaillant)

- **Identifiant** : `adblue-defaut` · **page** : voyant-adblue · **couleur** : orange ou jaune · **pictogramme** : adblue · **catégorie** : Antipollution diesel
- **Situation** : Le voyant AdBlue s'allume avec le voyant moteur ou Service et un message de défaut antipollution, parfois « démarrage impossible dans … km ».
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Allez au garage au plus tôt, avant la fin des kilomètres affichés : une fois à zéro, le moteur ne redémarre plus. Si de l'AdBlue vient d'être ajouté, signalez-le : un liquide non conforme peut déclencher l'alerte.
- **Écart entre marques** : Seat demande de s'adresser à un atelier sans indiquer de délai ; Peugeot, Renault et Dacia demandent d'y aller au plus tôt.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 16, « Système d'antipollution SCR (BlueHDi) » ; renvoi (3) p. 13 | « Témoin d'AdBlue clignotant dès la mise du contact, associé au témoin d'Autodiagnostic moteur fixe, accompagnés d'un signal sonore et d'un message indiquant l'autonomie de roulage. Selon le message affiché, il est possible de parcourir jusqu'à 1 100 km avant le déclenchement du dispositif d'antidémarrage du moteur. Effectuer (3) au plus tôt pour éviter le blocage du démarrage. » | Oui, avec précautions · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 286, « AdBlue », Témoins d'alerte et de contrôle | « [deux témoins] Il s'allume en jaune. Un dysfonctionnement a été détecté dans le circuit d'AdBlue ou le liquide AdBlue rajouté n'est pas conforme. Adressez-vous à un atelier spécialisé. Faites réviser le système. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 167, « Réservoir réactif », Anomalies de fonctionnement du système | « « Antipollution à contrôler » « Qualité AdBlue à contrôler » « Injection AdBlue à contrôler » Indique une défaillance du système. Consultez un Représentant de la marque le plus tôt possible. […] « XXX KM blocage antipollution » Indique une défaillance du système et qu'il vous reste moins de 800 km à parcourir avant que le redémarrage du véhicule soit impossible. » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 139, « Réservoir réactif », Anomalies de fonctionnement du système | « « ANTIPOLLUTION A CONTROLER » « QUALITE ADBLUE A CONTROLER » « INJECTION ADBLUE A CONTROLER » Indique une défaillance du système. Consultez un Représentant de la marque le plus tôt possible. […] « xxxKM BLOCAGE ANTIPOLLUTION » Indique une défaillance du système et qu'il vous reste moins de 800 km à parcourir avant que le redémarrage du véhicule soit impossible. » | Oui, avec précautions · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 13. Voyant du filtre à particules (FAP) orange

- **Identifiant** : `fap` · **page** : voyant-fap · **couleur** : orange ou jaune · **pictogramme** : fap · **catégorie** : Antipollution diesel
- **Situation** : Le voyant du filtre à particules s'allume : le filtre commence à se saturer et doit se nettoyer (régénération) en roulant.
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Dès que la circulation le permet, roulez une vingtaine de minutes à allure soutenue et régulière (par exemple à plus de 60 km/h sur voie rapide, régime moteur pas trop bas), sans couper le moteur, jusqu'à l'extinction du voyant. S'il ne s'éteint pas, ou s'il s'accompagne du voyant moteur ou Service, allez au garage.
- **Écart entre marques** : Seat ne donne pas de délai pour la régénération ; Peugeot, Renault et Dacia demandent de la faire dès que la circulation le permet.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 14-15, « Filtre à particules (Diesel) » | « Fixe, accompagné d'un signal sonore et d'un message de risque de colmatage du filtre à particules. Le filtre à particules commence à saturer. Dès que les conditions de circulation le permettent, régénérer le filtre en roulant à une vitesse d'au moins 60 km/h jusqu'à l'extinction du témoin. » | Oui, avec précautions · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 288-290, « Filtre à particules » | « Conduisez à une vitesse comprise entre 50 et 120 km/h (31 et 75 mi/h). Cela augmente la température et brûle la suie dans le filtre. […] Terminer la régénération après l'extinction du témoin lumineux. Si le témoin reste allumé après 30 minutes de conduite en mode régénération, contactez un atelier spécialisé pour faire réparer le défaut » | Oui, avec précautions · À faire dans les jours qui viennent |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 186, « Particularités des versions Diesel », Filtre à particules | « Pour cela, à l'apparition du témoin, continuez à rouler suivant les conditions de circulation et le respect des limitations de vitesse jusqu'à l'extinction du témoin. Si possible, ne laissez pas le régime moteur descendre en dessous de 2000 tours/min. » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 160, « Particularités des versions Diesel », Filtre à particules | « Pour cela, à l'apparition du témoin, continuez à rouler suivant les conditions de circulation et le respect des limitations de vitesse jusqu'à l'extinction du témoin. Si possible, ne laissez pas le régime moteur descendre en dessous de 2000 tours/mn. » | Oui, avec précautions · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 14. Voyant de préchauffage (diesel) allumé au démarrage

- **Identifiant** : `prechauffage` · **page** : voyant-prechauffage · **couleur** : orange ou jaune · **pictogramme** : prechauffage · **catégorie** : Préchauffage diesel
- **Situation** : À la mise du contact d'un diesel, le voyant de préchauffage (spirale) s'allume quelques secondes puis s'éteint.
- **Verdict** : Oui, vous pouvez rouler (`oui`)
- **Urgence** : Aucune action nécessaire (`aucune`)
- **Action** : C'est normal : attendez que le voyant s'éteigne avant de démarrer.
- **Écart entre marques** : aucun (toutes les citations donnent le même niveau)

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 14, « Préchauffage moteur (Diesel) » | « Allumé temporairement (jusqu'à environ 30 secondes en conditions hivernales sévères). À la mise du contact, si les conditions climatiques et la température du moteur le nécessitent. Attendre l'extinction du témoin avant de démarrer. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 289, « Gestion du moteur », Témoins | « Témoin allumé. Système de préchauffage du moteur diesel. Lorsque le témoin s'éteint, le moteur peut être démarré immédiatement. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 139, « Témoin de préchauffage (version Diesel) » | « Contact mis, il doit s'allumer. Il indique que les bougies de préchauffage sont en fonctionnement. Il s'éteint quand le préchauffage est obtenu. Le moteur peut démarrer. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 113, « Témoin de préchauffage (version Diesel) » | « Contact mis, il doit s'allumer. Il indique que les bougies de préchauffage sont en fonctionnement. Il s'éteint quand le préchauffage est obtenu. Le moteur peut démarrer. » | Oui, vous pouvez rouler · Aucune action nécessaire |

**Rappels des contrôles** :
- R3-NIVEAU-A-VERIFIER (alerte) : voyant « prechauffage » : citation de « notice-seat-ibiza » : « immediatement » mène à une urgence immédiate selon la grille. Niveau saisi : « oui », « aucune ». À vérifier sur le paquet de validation

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 15. Voyant airbag allumé (défaut des airbags ou des prétensionneurs)

- **Identifiant** : `airbag-defaut` · **page** : voyant-airbag · **couleur** : orange ou jaune · **pictogramme** : airbag · **catégorie** : Sécurité passive
- **Situation** : Le voyant airbag (orange ou rouge selon la voiture) reste allumé après le démarrage, s'allume en roulant ou clignote : les airbags ou les prétensionneurs de ceinture peuvent ne pas fonctionner.
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Vous pouvez rouler, mais faites contrôler le système sans attendre : en cas de choc, les airbags risquent de ne pas se déclencher, ou de se déclencher sans raison. En attendant, n'installez pas de siège enfant sur le siège passager avant.
- **Écart entre marques** : Peugeot ne donne pas de délai et Dacia demande de consulter rapidement pour le témoin seul ; Seat, Renault, Toyota et Dacia (message « Airbag à contrôler ») demandent un contrôle immédiat ou au plus tôt.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 17, « Airbags » ; renvoi (3) p. 13 | « Airbags. Fixe. L'un des airbags ou prétensionneurs pyrotechniques des ceintures de sécurité est défaillant. Effectuer (3). […] (3) : Se rendre dans le réseau PEUGEOT ou dans un atelier qualifié. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 26-27, « Témoins de contrôle du système d'airbags » | « Dysfonctionnement du système d'airbag et de rétracteurs de ceintures. Faites contrôler immédiatement le système par un atelier spécialisé. […] Ne montez pas un siège pour enfants sur le siège du passager avant ou retirez le siège pour enfants monté ! » | Oui, avec précautions · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 137, « Témoin d'airbag » | « S'il ne s'allume pas à la mise sous contact ou s'il s'allume moteur allumé, il signale une défaillance du système. Consultez au plus tôt un Représentant de la marque. » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 111, « Témoin d'Airbag » | « S'il ne s'allume pas à la mise sous contact, ou s'il s'allume moteur allumé ou s'il clignote, il signale une défaillance du système. Consultez rapidement un Représentant de la marque. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 293, 7.2.4 « Si un voyant s'allume », Voyant SRS | « Indique un dysfonctionnement dans : Le système d'airbag SRS ; ou Le système de prétensionneur de ceinture de sécurité. Faites immédiatement vérifier le véhicule par un concessionnaire ou un réparateur Toyota agréé, ou par tout autre réparateur qualifié. » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 101, « Messages d'anomalies de fonctionnement » | « Ils apparaissent avec le témoin [Service] et nécessitent un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement. […] « Airbag à contrôler » Indique une défaillance des systèmes de retenue complémentaire aux ceintures. En cas d'accident, ils risquent de ne pas se déclencher » | Oui, avec précautions · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 16. Témoin « airbag passager désactivé » (OFF) allumé

- **Identifiant** : `airbag-passager-desactive` · **page** : voyant-airbag · **couleur** : orange ou jaune · **pictogramme** : airbag-passager-off · **catégorie** : Sécurité passive
- **Situation** : Le témoin airbag passager OFF reste allumé : l'airbag frontal du passager avant est désactivé.
- **Verdict** : Oui, vous pouvez rouler (`oui`)
- **Urgence** : Aucune action nécessaire (`aucune`)
- **Action** : C'est normal si un siège enfant dos à la route est installé à l'avant. Sinon, réactivez l'airbag (position ON) voiture à l'arrêt et contact coupé, car il ne se déclencherait pas en cas de choc.
- **Écart entre marques** : aucun (toutes les citations donnent le même niveau)

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 17-18, « Airbag passager avant (OFF) » | « Fixe. L'airbag frontal passager est neutralisé. La commande est actionnée sur la position " OFF ". Il est possible d'installer un siège enfant "dos à la route", sauf en cas d'anomalie de fonctionnement des airbags (témoin d'alerte Airbags allumé). » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 26, « Témoins de contrôle du système d'airbags » | « Airbag frontal du passager désactivé. Vérifiez si l'airbag doit rester désactivé. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 106, « Désactivation airbag passager avant » | « À la mise sous contact, vérifiez impérativement que le témoin est bien allumé sur l'afficheur. Ce voyant reste allumé en permanence pour vous confirmer que vous pouvez installer un siège enfant. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 84, « Désactivation de l'airbag passager avant » | « À la mise sous contact, vérifiez impérativement que le témoin est bien allumé sur l'afficheur. Ce témoin reste allumé en permanence pour vous confirmer que vous pouvez installer un siège enfant. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 37, « Témoin “PASSENGER AIR BAG” » | « Le témoin “OFF” s'allume (uniquement si le contacteur du moteur est en position ON). […] Lorsqu'un système de retenue pour enfant n'est pas installé sur le siège du passager avant. Assurez-vous que le système d'activation/désactivation manuelle de l'airbag est en position “ON”. » | Oui, vous pouvez rouler · Aucune action nécessaire |

**Rappels des contrôles** :
- R3-NIVEAU-A-VERIFIER (alerte) : voyant « airbag-passager-desactive » : citation de « notice-renault-clio-5 » : « imperativement » mène à une urgence immédiate selon la grille. Niveau saisi : « oui », « aucune ». À vérifier sur le paquet de validation
- R3-NIVEAU-A-VERIFIER (alerte) : voyant « airbag-passager-desactive » : citation de « notice-dacia-sandero-3 » : « imperativement » mène à une urgence immédiate selon la grille. Niveau saisi : « oui », « aucune ». À vérifier sur le paquet de validation

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 17. Voyant ABS orange allumé

- **Identifiant** : `abs` · **page** : voyant-abs-esp · **couleur** : orange ou jaune · **pictogramme** : abs · **catégorie** : Freinage
- **Situation** : Le voyant ABS reste allumé ou s'allume en roulant, sans le voyant de freinage rouge : l'antiblocage des roues ne fonctionne plus, le freinage classique reste assuré.
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Vous pouvez rouler prudemment, à allure modérée : les roues peuvent se bloquer en cas de freinage fort. Faites vérifier le système sans attendre. Si le voyant de freinage rouge s'allume aussi, arrêtez-vous (ligne « ABS et freinage »).
- **Écart entre marques** : Peugeot demande d'aller au garage en roulant prudemment, sans délai précis, et Renault et Dacia de consulter rapidement pour le témoin seul ; Renault et Dacia (avec le témoin Service) et Toyota demandent un contrôle au plus tôt ou immédiat.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 17, « Antiblocage des roues (ABS) » ; renvoi (3) p. 13 | « Fixe. Le système d'antiblocage des roues est défaillant. Le véhicule conserve un freinage classique. Rouler prudemment à allure modérée, puis effectuer (3). […] (3) : Se rendre dans le réseau PEUGEOT ou dans un atelier qualifié. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 138, « Témoin antiblocage des roues » | « S'il s'allume en roulant, il signale une défaillance du système d'antiblocage des roues. Le système de freinage est alors assuré comme sur un véhicule non équipé du système ABS. Consultez rapidement un Représentant de la marque. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 212, « Dispositifs de correction et d'assistance à la conduite », Anomalies de fonctionnement ; témoin Service p. 136 | « [Service] et [ABS] allumés au tableau de bord accompagnés des messages « ABS à contrôler », « Système freinage à contrôler » et « ESC à contrôler » : cela indique que l'ABS, l'ESC et l'aide au freinage d'urgence sont désactivés. Le freinage est toujours assuré ; […] (p. 136) Le témoin [Service] nécessite un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement. » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 112, « Témoin antiblocage des roues » | « S'il ne s'éteint pas après la mise sous contact ou s'il s'allume en roulant, il signale une défaillance du système d'antiblocage des roues. Le système de freinage est alors assuré comme sur un véhicule non équipé du système ABS. Consultez rapidement un Représentant de la marque. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 184, « Dispositifs de correction et d'assistance à la conduite », Anomalies de fonctionnement ; témoin Service p. 110 | « [Service] et [ABS] allumés au tableau de bord accompagnés des messages « ABS », « Système freinage à contrôler » et « ESC » : cela indique que l'ABS, l'ESC et l'aide au freinage d'urgence sont désactivés. Le freinage est toujours assuré ; […] (p. 110) Le témoin [Service] nécessite un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement. » | Oui, avec précautions · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 293, 7.2.4 « Si un voyant s'allume », Voyant ABS | « Indique un dysfonctionnement dans : L'ABS ; ou Le système d'assistance au freinage. Faites immédiatement vérifier le véhicule par un concessionnaire ou un réparateur Toyota agréé, ou par tout autre réparateur qualifié. » | Oui, avec précautions · À faire tout de suite |

**Notices consultées sans consigne propre à cet état** (non citées, aucun niveau) :
- Seat, p. 254, « Systèmes de stabilisation et assistance au freinage », Témoins : « Défaut sur l'ABS, ou il ne fonctionne pas. » : état décrit sans consigne propre au témoin. L'encadré général de la p. 94 (« Arrêtez le véhicule de manière sûre dès que possible. ») suit la liste de tous les témoins, verts et bleus compris, et contredirait les consignes propres de la même notice (filtre à particules : « Conduisez à une vitesse comprise entre 50 et 120 km/h ») : il ne fixe pas de niveau pour un témoin précis (décision D2).

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 18. Voyants ABS et freinage allumés ensemble

- **Identifiant** : `abs-et-frein` · **page** : voyant-abs-esp · **couleur** : rouge · **pictogramme** : abs · **catégorie** : Freinage
- **Situation** : Le voyant ABS et le voyant de freinage rouge s'allument en même temps, parfois avec le message « Panne du système de freinage ».
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Arrêtez-vous dès que vous pouvez le faire sans danger, en freinant progressivement : le véhicule peut devenir instable au freinage. Ne repartez pas : faites appel à un garage ou à l'assistance.
- **Écart entre marques** : aucun (toutes les citations donnent le même niveau)

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 14, « Freinage » (deux témoins) ; renvois (1) et (2) p. 13 | « Fixes. Le répartiteur électronique de freinage (REF) est défaillant. Effectuer (1), puis (2). […] (1) : L'arrêt du véhicule est impératif. Stationner dans les meilleures conditions de sécurité et couper le contact. (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 251, « Système de freinage », AVERTISSEMENT | « Si le témoin du système de freinage s'allume en même temps que le témoin d'ABS, il se peut que le fonctionnement de l'ABS soit défaillant. Lorsque cette fonction est en panne, les roues arrière peuvent se bloquer. Dans certaines circonstances, l'arrière du véhicule peut déraper, au risque de perdre le contrôle. Arrêtez-vous et demandez de l'aide à un technicien. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 213, « Dispositifs de correction et d'assistance à la conduite », Anomalies de fonctionnement | « [quatre témoins] allumés au tableau de bord accompagnés du message « Panne du système de freinage » : cela indique une défaillance des dispositifs de freinage. […] Votre freinage est partiellement assuré. Toutefois, il est dangereux de freiner brusquement et ceci vous impose un arrêt impératif et immédiat compatible avec les conditions de circulation. Faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 184-185, « Dispositifs de correction et d'assistance à la conduite », Anomalies de fonctionnement | « [quatre témoins] allumés au tableau de bord accompagnés du message « Panne du système de freinage » : cela indique une défaillance des dispositifs de freinage. […] Votre freinage est partiellement assuré. Toutefois, il est dangereux de freiner brusquement et ceci vous impose un arrêt impératif et immédiat compatible avec les conditions de circulation. Faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 298, MISE EN GARDE « Si le voyant ABS et le voyant du système de freinage restent allumés » | « Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié. Le véhicule devient très instable pendant le freinage, et l'ABS risque de connaître une défaillance, ce qui peut provoquer un accident et causer des blessures graves voire mortelles. » | Non, arrêtez-vous immédiatement · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 19. Voyant ESP clignotant (système en action)

- **Identifiant** : `esp-clignotant` · **page** : voyant-abs-esp · **couleur** : orange ou jaune · **pictogramme** : esp · **catégorie** : Aides à la conduite
- **Situation** : Le voyant ESP (voiture qui dérape) clignote en roulant : le contrôle de stabilité ou l'antipatinage corrige une perte d'adhérence.
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Levez le pied et adaptez tout de suite votre vitesse à l'état de la route : le système vous aide à garder la trajectoire, mais la route est glissante.
- **Écart entre marques** : Seat demande d'adapter immédiatement sa vitesse ; Peugeot, Renault, Dacia et Toyota décrivent le clignotement comme le fonctionnement normal du système, sans consigne.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 254-255, « Systèmes de stabilisation et assistance au freinage », Témoins et AVERTISSEMENT | « Clignote. ESC ou ASR en cours de fonctionnement. […] Lorsque les systèmes entrent dans la plage de régulation, adaptez immédiatement votre vitesse à l'état de la route et aux conditions » | Oui, avec précautions · À faire tout de suite |
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 17, « Contrôle dynamique de stabilité (CDS) / Antipatinage des roues (ASR) » | « Clignotant. La régulation du système CDS/ASR s'active en cas de perte d'adhérence ou de trajectoire. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 213, « Contrôle dynamique de conduite ESC », Principe de fonctionnement | « Le système compare la volonté du conducteur à la trajectoire réelle du véhicule et corrige cette dernière, si nécessaire, en agissant sur le freinage de certaines roues et/ou sur la puissance du moteur, en cas de déclenchement du système, le témoin clignote au tableau de bord. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 185, « Contrôle dynamique de conduite ESC », Principe de fonctionnement | « Le système compare la volonté du conducteur à la trajectoire réelle du véhicule et corrige cette dernière, si nécessaire, en agissant sur le freinage de certaines roues et/ou sur la puissance du moteur, en cas de déclenchement du système, le témoin clignote au tableau de bord. » | Oui, vous pouvez rouler · Aucune action nécessaire |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 205, « Lorsque les systèmes TRC/VSC/de contrôle du roulis de remorque fonctionnent » | « Le témoin de dérapage clignote lorsque les systèmes TRC/VSC/de contrôle du roulis de la remorque fonctionnent. » | Oui, vous pouvez rouler · Aucune action nécessaire |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 20. Voyant ESP allumé fixe (système défaillant)

- **Identifiant** : `esp-defaut` · **page** : voyant-abs-esp · **couleur** : orange ou jaune · **pictogramme** : esp · **catégorie** : Aides à la conduite
- **Situation** : Le voyant ESP reste allumé fixe sans avoir été désactivé : le contrôle de stabilité et l'antipatinage sont en défaut.
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Vous pouvez rouler prudemment, surtout sur route mouillée ou glissante, car la voiture ne corrige plus les dérapages. Faites vérifier le système sans attendre.
- **Écart entre marques** : Peugeot demande d'aller au garage sans indiquer de délai ; Renault, Dacia et Toyota demandent d'y aller au plus tôt ou de faire vérifier immédiatement.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 17, « Contrôle dynamique de stabilité (CDS) / Antipatinage des roues (ASR) » ; renvoi (3) p. 13 | « Fixe. Le système CDS/ASR est défaillant. Effectuer (3). […] (3) : Se rendre dans le réseau PEUGEOT ou dans un atelier qualifié. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 213, « Contrôle dynamique de conduite ESC », Anomalies de fonctionnement ; témoin Service p. 136 | « Lorsque le système détecte une anomalie de fonctionnement, le message « ESC à contrôler » et les témoins [Service] et [ESC] s'affichent au tableau de bord. Dans ce cas, l'ESC et le système antipatinage sont désactivés. Consultez un Représentant de la marque. (p. 136) Le témoin [Service] nécessite un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement. » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 185, « Contrôle dynamique de conduite ESC », Anomalies de fonctionnement ; témoin Service p. 110 | « Lorsque le système détecte une anomalie de fonctionnement, le message « ESC à contrôler » et les témoins [Service] et [ESC] s'affichent au tableau de bord. Dans ce cas, l'ESC et le système antipatinage sont désactivés. Consultez un Représentant de la marque. (p. 110) Le témoin [Service] nécessite un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement. » | Oui, avec précautions · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 297, 7.2.4 « Si un voyant s'allume », Témoin de dérapage | « Indique un dysfonctionnement dans : Le système VSC ; Le système TRC ; ou Le système de commande d'assistance au démarrage en côte. Faites immédiatement vérifier le véhicule par un concessionnaire ou un réparateur Toyota agréé, ou par tout autre réparateur qualifié. » | Oui, avec précautions · À faire tout de suite |

**Notices consultées sans consigne propre à cet état** (non citées, aucun niveau) :
- Seat, p. 254, « Systèmes de stabilisation et assistance au freinage », Témoins : « Anomalie de l'ESC ou l'ABS, ou déconnexion provoquée par le système. » : état décrit sans consigne propre au témoin. L'encadré général de la p. 94 (« Arrêtez le véhicule de manière sûre dès que possible. ») suit la liste de tous les témoins, verts et bleus compris, et contredirait les consignes propres de la même notice (filtre à particules : « Conduisez à une vitesse comprise entre 50 et 120 km/h ») : il ne fixe pas de niveau pour un témoin précis (décision D2).

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 21. Voyant de pression des pneus allumé fixe

- **Identifiant** : `pression-pneus` · **page** : voyant-pression-pneus · **couleur** : orange ou jaune · **pictogramme** : pression-pneus · **catégorie** : Pneumatiques
- **Situation** : Le voyant de pression des pneus (fer à cheval avec point d'exclamation) s'allume fixe : un ou plusieurs pneus sont sous-gonflés, voire crevés.
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Ralentissez, évitez les manœuvres brusques et arrêtez-vous dès que possible en lieu sûr pour regarder l'état des pneus. Pneu crevé ou à plat : ne roulez pas avec, changez la roue ou utilisez le kit de réparation. Sinon, regonflez à la pression indiquée par la voiture (de préférence pneus froids), puis réinitialisez le système.
- **Écart entre marques** : Seat et Toyota demandent de s'arrêter dès que possible pour contrôler les pneus, Renault et Dacia en cas de message « Crevaison ». Pour un simple sous-gonflage, Peugeot demande de contrôler la pression le plus rapidement possible et Dacia de la vérifier et l'ajuster à froid ; Renault ne donne pas de consigne pour le témoin seul.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 18, « Sous-gonflage » | « Fixe. La pression est insuffisante dans une ou plusieurs roues. Contrôler la pression des pneumatiques le plus rapidement possible. Réinitialiser le système de détection après ajustement de la pression. » | Oui, avec précautions · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 311-312, « Systèmes de contrôle de la pression des pneus », Témoin de contrôle et AVERTISSEMENT | « Témoin allumé. Pression de gonflage d'une roue bien inférieure à la valeur définie par le conducteur […] Si le témoin s'allume, vous devez immédiatement réduire la vitesse et éviter toute manœuvre soudaine de virage ou de freinage. Arrêtez-vous le plus rapidement possible et contrôlez la pression et l'état de tous les pneus. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 177, « Système de surveillance de pression des pneumatiques », Anomalies de gonflage possibles | « s'allume fixe. « Pression pneus à réajuster » Une roue et la valeur de pression associée s'affichent en jaune. Cela indique qu'un sous gonflage du pneumatique a été détecté. Vérifiez et ajustez la pression à froid des quatre pneumatiques puis, réinitialisez le système. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 295 et 298, Voyant de faible pression des pneus et MISE EN GARDE | « Lorsque le témoin s'allume (un signal sonore retentit) : Faible pression des pneus due à des causes naturelles. Réglez la pression de gonflage des pneus […] Faible pression des pneus en raison d'un pneu crevé. Arrêtez immédiatement le véhicule dans un endroit sûr. […] Arrêtez votre véhicule dans un endroit sûr dès que possible. Réglez immédiatement la pression de gonflage des pneus. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 125, « Messages d'alerte » ; p. 206 et 348 | « Ils apparaissent avec le témoin [STOP] et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. […] « Crevaison » Indique qu'au moins une des roues est crevée ou fortement sous-gonflée. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 102, « Messages d'alerte » ; p. 177 | « Ils apparaissent avec le témoin [STOP] et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. […] « Crevaison » Indique qu'au moins une des roues est crevée ou fortement sous-gonflée. » | Non, arrêtez-vous immédiatement · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 22. Voyant de pression des pneus clignotant puis fixe (système défaillant)

- **Identifiant** : `pression-pneus-systeme` · **page** : voyant-pression-pneus · **couleur** : orange ou jaune · **pictogramme** : pression-pneus · **catégorie** : Pneumatiques
- **Situation** : Le voyant de pression des pneus clignote environ une minute puis reste allumé : le système de surveillance de la pression est en défaut et ne détecte plus un sous-gonflage.
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Vérifiez vous-même la pression des quatre pneus dès que possible, car le système ne vous préviendra plus, puis faites contrôler le système (capteur défaillant, roue sans capteur…).
- **Écart entre marques** : aucun (toutes les citations donnent le même niveau)

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 18, « Sous-gonflage » ; renvoi (3) p. 13 | « Témoin de sous-gonflage clignotant puis fixe et témoin de Service fixe. Le système de surveillance de la pression des pneumatiques est défaillant. La détection de sous-gonflage n'est plus assurée. Dès que possible, vérifier la pression des pneumatiques et effectuer (3). » | Oui, avec précautions · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 177, Anomalies de gonflage possibles ; témoin Service p. 110 | « clignote puis s'allume fixe accompagné du témoin [Service] « Capteurs pneus à contrôler » Une roue ne s'affiche plus. Cela indique qu'au moins une roue n'est pas équipée de capteur (roue de secours...) ou que le capteur est défaillant. Consultez un Représentant de la marque. (p. 110) Le témoin [Service] nécessite un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement. » | Oui, avec précautions · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 295 et 297, Voyant de faible pression des pneus | « Si le témoin reste allumé après avoir clignoté pendant environ 1 minute (un signal sonore ne retentit pas) : Dysfonctionnement dans le système de détection de pression des pneus. Faites vérifier le système […] Il se peut que le système de détection de pression des pneus présente un dysfonctionnement. Faites immédiatement vérifier le véhicule » | Oui, avec précautions · À faire tout de suite |

**Notices consultées sans consigne propre à cet état** (non citées, aucun niveau) :
- Seat, p. 311-312, « Systèmes de contrôle de la pression des pneus » : La notice ne décrit pas de clignotement : un défaut du système s'y signale par le même témoin allumé (« Ou alors : Dysfonctionnement de l'indicateur »), sous l'avertissement d'arrêt de la p. 312, repris par la ligne « pression-pneus » (arrêt immédiat). Décision D11.

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 23. Voyant de direction assistée orange ou jaune (volant et point d'exclamation)

- **Identifiant** : `direction-orange` · **page** : voyant-direction · **couleur** : orange ou jaune · **pictogramme** : direction · **catégorie** : Direction
- **Situation** : Le voyant de direction (volant et point d'exclamation) s'allume en orange ou jaune, sans le témoin STOP : l'assistance de direction est défaillante ou limitée.
- **Verdict** : Oui, avec précautions (`oui avec précautions`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Vous pouvez rouler prudemment, à allure modérée : le volant peut être plus dur. Faites vérifier la direction sans attendre. Si le voyant passe au rouge ou s'accompagne du témoin STOP, arrêtez-vous.
- **Écart entre marques** : Peugeot et Seat laissent rouler prudemment jusqu'au garage, sans délai précis ; Toyota demande une vérification immédiate.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 17, « Direction assistée » ; renvoi (3) p. 13 | « Direction assistée. Fixe. La direction assistée est défaillante. Rouler prudemment à allure modérée, puis effectuer (3). […] (3) : Se rendre dans le réseau PEUGEOT ou dans un atelier qualifié. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 227, « Direction », Témoin de contrôle | « S'allume en jaune. Fonctionnement limité de la direction. Rendez-vous avec prudence dans un atelier spécialisé pour effectuer une révision de la direction. » | Oui, avec précautions · À faire dans les jours qui viennent |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 294 et 298, Voyant du système de direction assistée électrique (jaune) | « Indique un dysfonctionnement du système EPS (direction assistée électrique). Faites immédiatement vérifier le véhicule par un concessionnaire ou un réparateur Toyota agréé, ou par tout autre réparateur qualifié. […] Lorsque le voyant s'allume en jaune, l'assistance à la direction assistée est limitée. » | Oui, avec précautions · À faire tout de suite |

**Notices consultées sans consigne propre à cet état** (non citées, aucun niveau) :
- Renault, p. 138, « Témoin de direction à assistance variable » : La notice ne décrit ce témoin qu'accompagné du témoin STOP : ce cas est cité dans la ligne « direction-rouge ».
- Dacia, p. 113, « Témoin de direction à assistance variable » : La notice ne décrit ce témoin qu'accompagné du témoin STOP : ce cas est cité dans la ligne « direction-rouge ».

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 24. Voyant de direction rouge, ou STOP avec une alerte de direction

- **Identifiant** : `direction-rouge` · **page** : voyant-direction · **couleur** : rouge · **pictogramme** : direction · **catégorie** : Direction
- **Situation** : Le voyant de direction s'allume en rouge, ou le témoin STOP s'allume avec le voyant ou un message de panne de direction : la direction n'est plus assistée et devient très dure.
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Tenez fermement le volant et arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez pas : faites appel à un garage ou à l'assistance.
- **Écart entre marques** : Toyota demande une vérification immédiate sans imposer l'arrêt ; Seat, Peugeot, Renault et Dacia imposent l'arrêt.

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 227, « Direction », Témoin de contrôle | « S'allume en rouge. Direction endommagée. Stoppez le véhicule dès que possible et en toute sécurité. Rendez-vous sans plus attendre dans un atelier spécialisé pour réparer la panne. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 13, « STOP » ; renvois (1) et (2) p. 13 | « STOP. Fixe, associé à un autre témoin d'alerte, accompagné de l'affichage d'un message et d'un signal sonore. Un dysfonctionnement grave du moteur, du système de freinage, de la direction assistée, de la boîte de vitesses automatique ou une anomalie électrique majeure est détectée. Effectuer (1), puis (2). […] (1) : L'arrêt du véhicule est impératif. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 125, « Messages d'alerte » | « Ils apparaissent avec le témoin et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez votre moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. […] « Panne de la direction » Indique un problème dans la direction. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 102, « Messages d'alerte » | « Ils apparaissent avec le témoin et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez votre moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. […] « Panne de la direction » Indique un problème sur la direction. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 294 et 298, Voyant du système de direction assistée électrique (rouge) | « Indique un dysfonctionnement du système EPS (direction assistée électrique). Faites immédiatement vérifier le véhicule par un concessionnaire ou un réparateur Toyota agréé, ou par tout autre réparateur qualifié. […] Lorsque le voyant s'allume en rouge, l'assistance à la direction assistée est perdue et il devient alors très difficile de manœuvrer le volant. » | Oui, avec précautions · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 138, « Témoin de direction à assistance variable » ; témoin STOP p. 136-137 | « S'il s'allume en roulant accompagné du témoin [STOP], cela indique une défaillance du système. Faites appel à un Représentant de la marque. […] (p. 137) Il vous impose, pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 113, « Témoin de direction à assistance variable » ; témoin STOP p. 110-111 | « S'il s'allume en roulant accompagné du témoin [STOP], cela indique une défaillance du système. Faites appel à un Représentant de la marque. […] (p. 111) Il vous impose, pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 298, MISE EN GARDE « Lorsque le voyant du système de direction assistée électrique s'allume » | « Lorsque le voyant s'allume en rouge, l'assistance à la direction assistée est perdue et il devient alors très difficile de manœuvrer le volant. Lorsque le volant est plus difficile à manœuvrer que d'habitude, tenez-le fermement et bougez-le avec plus de force que d'habitude. » | Oui, avec précautions · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

### 25. Voyant de température du liquide de refroidissement rouge

- **Identifiant** : `temperature-rouge` · **page** : surchauffe-moteur · **couleur** : rouge · **pictogramme** : temperature · **catégorie** : Refroidissement
- **Situation** : Le voyant de température (thermomètre dans l'eau) s'allume en rouge ou clignote : le moteur surchauffe ou le liquide de refroidissement manque.
- **Verdict** : Non, arrêtez-vous immédiatement (`non, arrêt immédiat`)
- **Urgence** : À faire tout de suite (`immédiate`)
- **Action** : Arrêtez-vous dès que vous pouvez le faire sans danger. Suivez la notice de votre voiture : moteur coupé (Peugeot, Seat), ou laissé une à deux minutes au ralenti, puis coupé si le voyant ne repasse pas au bleu (Renault, Dacia). Laissez refroidir le moteur avant de vérifier le liquide de refroidissement. Si le voyant reste allumé ou se rallume, ne repartez pas : faites appel à un garage.
- **Écart entre marques** : aucun (toutes les citations donnent le même niveau)

| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |
|---|---|---|---|
| Peugeot (208 (2e génération), guide d'utilisation édition 01-20) | p. 13, « Température maxi du liquide de refroidissement » ; renvois (1) et (2) p. 13 | « La température du circuit de refroidissement est trop élevée. Effectuer (1), puis attendre le refroidissement du moteur pour compléter le niveau, si nécessaire. Si le problème persiste, effectuer (2). […] (1) : L'arrêt du véhicule est impératif. Stationner dans les meilleures conditions de sécurité et couper le contact. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Seat (Ibiza (5e génération), notice édition 11/20) | p. 89, « Indicateur de température du liquide de refroidissement du moteur », Témoin d'alerte et de contrôle | « S'allume en rouge. Arrêtez-vous immédiatement ! Niveau de liquide de refroidissement trop faible, température du liquide de refroidissement trop élevée. Il clignote en rouge. Système de refroidissement du moteur défectueux. Arrêtez le véhicule, coupez le moteur et laissez-le refroidir. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Renault (Clio 5 phase 2, notice réf. 1457-3) | p. 139, « Témoin d'alerte de température du liquide de refroidissement » | « S'il devient rouge, arrêtez-vous et laissez tourner le moteur au ralenti une ou deux minutes. La température doit s'abaisser et le témoin repasser au bleu. Sinon arrêtez le moteur. Laissez-le refroidir avant de vérifier le liquide de refroidissement. Faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Dacia (Sandero 3, véhicules depuis le 15/10/2025, notice réf. 1688-1) | p. 111, « Témoin d'alerte de température du liquide de refroidissement » | « S'il devient rouge, arrêtez-vous et laissez tourner le moteur au ralenti une ou deux minutes. La température doit s'abaisser et le témoin s'éteindre ou repasser au bleu. Sinon arrêtez le moteur. Laissez-le refroidir avant de vérifier le liquide de refroidissement. Faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement · À faire tout de suite |
| Toyota (Yaris (génération 2020 à aujourd'hui, non hybride), manuel édition du 15/01/2024) | p. 292, 7.2.4 « Si un voyant s'allume », Voyant de température élevée du liquide de refroidissement | « Indique que la température du liquide de refroidissement du moteur est trop élevée. Arrêtez immédiatement le véhicule dans un endroit sûr. » | Non, arrêtez-vous immédiatement · À faire tout de suite |

Décision de Houssem : ☐ validée  ☐ à corriger : …

