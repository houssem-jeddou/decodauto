# Paquet de validation, lot 4a de la vague A : codes défaut P0420 et P0299 (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone : une partie par page. Volume indicatif du lot : 25 912 recherches par mois (plafond, docs/05 : P0420 10 744, P0299 15 168). Revue indépendante : §4. Le go vaut pour le commit de passage décrit au §5 (brouillons versés avec leur empreinte et déplacés vers `src/content`, adresses ajoutées à la liste Lighthouse, comme pour les lots précédents) : toute autre modification après ta validation l'annule.
>
> **Lot 4b (P0380, P1351) : reporté.** Aucune source admise par la charte §2.2 n'a encore été trouvée pour le sens du code P1351 chez Peugeot et Citroën (seulement des forums), ni de document de constructeur publié par le constructeur lui-même pour P0380 (manuels d'atelier recopiés sur des sites tiers). Pas de page sans source : la recherche continue à la prochaine session.

Les deux pages sont nouvelles, sur le modèle de la page P0087 (livrable 6.6b). Ce qui est à valider : la question, la ligne de l'encadré (reprise de la base), les causes et leur coût, deux **pièces ajoutées** à la liste du coût, les sources ajoutées au registre (§3), la fiche du code, les cas décrits par marque (élément unique) et les faits du texte. Relevé des sources : `travaux/etape-8/textes/codes-p0420-p0299-releve.md`. Aucun lien ajouté au plan.

## 1. Code P0420 (`/codes-defaut/p0420/`)

**Titre** : « Code P0420 : rendement du catalyseur trop bas, peut-on rouler ? » · **H1** : « Code défaut P0420 : rendement du catalyseur inférieur au seuil (ligne 1) »
**Description** : « Code P0420 : rendement du catalyseur sous le seuil. Avec le voyant moteur allumé, arrêtez-vous d'abord. Causes, cas décrits par marque et contrôle technique. »
**Question** : « Puis-je continuer à rouler avec le code P0420 ? »

**Ligne de l'encadré** (base, reprise telle quelle) : **Voyant moteur orange allumé fixe** → **Non, arrêtez-vous immédiatement** · À faire tout de suite · « Arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez que si la notice de votre voiture permet de rouler jusqu'au garage, et faites alors contrôler le moteur sans attendre en roulant prudemment ; sinon, faites appel à un garage ou à l'assistance. » · 5 marques ; le niveau vient de la notice Toyota Yaris. **Pourquoi cette ligne** : les bulletins de Toyota, Kia, Audi et Ford citent le voyant moteur allumé avec le code (charte §2.2 : le verdict vient de la ligne du voyant qui s'allume avec le code, comme pour P0087). Ligne d'arrêt : le dépannage sur autoroute s'affiche de lui-même.

**Coût probable (calculé)** : de « Réparation au garage » à « Grosse réparation ».

**Causes** (ordre logique, du contrôle le plus simple à l'organe) :
1. Fuite à l'admission ou à l'échappement (Ross-Tech) → durites et colliers, **tuyau ou joint d'échappement (pièce ajoutée, tranche réparation)**.
2. Sonde lambda défaillante, ou défaut de sa commande (Ross-Tech ; rôle de la sonde aval : Hella) → sonde lambda, faisceau et connecteurs.
3. Logiciel du calculateur à mettre à jour (Audi Q7 3.6 FSI, Kia 2.4 GDI ; Ross-Tech) → calculateur.
4. Catalyseur usé ou endommagé (Hella ; Toyota, Volkswagen, Ford ; Kia : collecteur d'échappement) → catalyseur.

**Fiche du code** : signification « Rendement du catalyseur inférieur au seuil (ligne 1) » (Ross-Tech, Audi) ; portée générique ; moteurs concernés : essence (tous les documents cités décrivent des moteurs essence ; le texte dit qu'ils ne parlent pas du diesel) ; voyant qui s'allume : voyant moteur orange fixe.

**Cas décrits par marque** (élément unique, tous des voitures vendues aux États-Unis) : Toyota Tacoma 2010 2TR-FE (bruit de ferraille du catalyseur et/ou voyant, tuyau avant remplacé) ; Kia Optima, Sorento, Sportage 2.4 GDI (voyant, P0420 parfois avec P0171, surtout en long frein moteur en descente ; collecteur et catalyseur ou seulement logiciel) ; Audi Q7 3.6 FSI 2007-2011 (logiciel du calculateur) ; Volkswagen Atlas 3.6 2018-2019 (catalyseur amélioré et logiciel, rien d'autre avant) ; Ford Police Interceptor Sedan 3.7 2016-2019 (catalyseur endommagé, remplacé, calculateur reprogrammé).

**Empreinte de l'encadré** : `3be0d3f3feb87cbbb8db5b06ec17668b63e0385f06abc5908eedeeffa382af69`.

**Faits du texte** (relevé joint) :
- Sens du code : rendement du catalyseur de la ligne 1 sous le seuil ; intitulé anglais des bulletins ; P0430 pour la ligne 2 (Audi, Volkswagen, Ford, moteurs en V).
- Principe (Hella) : depuis l'EOBD, une seconde sonde lambda après le catalyseur mesure sa capacité à stocker l'oxygène ; signaux des deux sondes à peu près égaux : capacité atteinte, par exemple par le vieillissement.
- Symptômes : voyant moteur (Toyota, Kia, Audi, Ford) ; bruit de ferraille du catalyseur à l'accélération (Toyota Tacoma 2010).
- Marche à suivre : consigne de l'encadré ; points de contrôle de Ross-Tech (fuites, catalyseur, sondes et leur commande, test de vieillissement) ; mises à jour du calculateur (Audi, Kia, Volkswagen ; Ross-Tech : chercher une mise à jour dans la documentation du constructeur) ; « demandez au réseau de votre marque si une mise à jour ou une campagne existe » ; essai sur route après l'intervention (Toyota, Audi).
- Catalyseur et notices : voyant moteur qui clignote (Peugeot 208 p. 15 : risque de destruction du catalyseur ; Seat Ibiza p. 288 : défaut de combustion qui peut l'endommager), renvoi à la page du voyant moteur.
- Contrôle technique (arrêté du 18 juin 1991, annexe I) : relevé OBD, point 8.2.12 (anomalie sans dysfonctionnement important : mineure ; dysfonctionnement important : majeure ; connexion impossible : mineure) ; point 8.2.11 (équipement d'origine manifestement absent, modifié ou défectueux : majeure) ; article 7 (contre-visite dans les deux mois) ; le texte ne dit pas où se range un code P0420.
- Peugeot, Citroën, Renault, Nissan, 1.2 PureTech : aucun document lu ; même signification (code générique) ; seul le diagnostic dit d'où vient le défaut.

**Ligne de validation proposée** : « Je valide la page code P0420 : question, encadré (ligne de la base « voyant moteur orange allumé fixe », coût et causes, pièce ajoutée « tuyau ou joint d'échappement », empreinte 3be0d3f3…), fiche, cas par marque et faits du texte. »

## 2. Code P0299 (`/codes-defaut/p0299/`)

**Titre** : « Code P0299 : pression de turbo trop faible, peut-on rouler ? » · **H1** : « Code défaut P0299 : pression de suralimentation du turbo trop faible »
**Description** : « Code P0299 : le turbo ne donne pas la pression que demande le calculateur. Avec le voyant moteur allumé, arrêtez-vous d'abord. Causes et cas décrits par marque. »
**Question** : « Puis-je continuer à rouler avec le code P0299 ? »

**Ligne de l'encadré** : la même ligne de la base, **voyant moteur orange allumé fixe** (arrêt immédiat). **Pourquoi** : les bulletins d'Audi, de Volkswagen et de General Motors citent le voyant moteur avec le code.

**Coût probable (calculé)** : de « Réparation au garage » à « Grosse réparation ».

**Causes** (ordre logique, du circuit d'air à la commande, puis au turbo et au logiciel) :
1. Fuite sur le circuit d'air de suralimentation (Volkswagen 2.0 TDI) → durites et colliers.
2. Commande du turbo défaillante : dépression, membrane, électrovanne, actionneur (Volkswagen, General Motors ; Hella) → durites et colliers, **commande du turbo (pièce ajoutée, tranche réparation)**.
3. Soupape de décharge ou vanne de recirculation défaillante (Audi 2.0 TFSI ; General Motors 1.2 LIH, qui fait remplacer le turbo) → commande du turbo, turbo.
4. Turbo endommagé, arbre de turbine cassé ou grippé (Volkswagen Passat 2.0 TDI) → turbo.
5. Logiciel du calculateur à vérifier (Volkswagen 2.0 TDI) → calculateur.

**Fiche du code** : signification « Pression de suralimentation trop faible (turbocompresseur ou compresseur) » (Audi, Volkswagen) ; portée générique ; moteurs concernés : essence et diesel (2.0 TFSI et 1.2 LIH ; 2.0 TDI) ; voyant qui s'allume : voyant moteur orange fixe.

**Cas décrits par marque** (élément unique ; États-Unis ou Amérique du Nord) : Audi A3, A4 2.0 TFSI 2005-2007 (vanne de recirculation N249 à membrane déchirée, remplacée) ; Audi A4, A5, A6, Q5, TT 2.0 TFSI 2013-2014 (clip de tringlerie de la soupape de décharge tombé, baisse de puissance possible, pas de turbo à changer) ; Volkswagen Jetta, Golf 2.0 TDI 2009-2014 (durite de dépression, goujon de réglage ou carter, membrane, tuyau, raccord, logiciel ; turbo remplacé seulement pour le goujon ou le carter) ; Volkswagen Passat 2.0 TDI 2012-2014 (arbre de turbine cassé : circuit d'huile rincé, pompe à huile, turbo et tuyaux d'huile remplacés) ; Buick Encore GX et Chevrolet Trailblazer 1.2 LIH (tringlerie de soupape usée, bruit au démarrage à froid, turbo remplacé).

**Empreinte de l'encadré** : `8b25b812d3339925eb308f9bcdab7c8e77e954b14131a092336294b25eaca004`.

**Faits du texte** (relevé joint) :
- Sens du code : pression de suralimentation trop faible ; intitulé anglais « Turbo/Super Charger Underboost » ; Volkswagen : valeurs de régulation sous la limite.
- Principe (Hella) : pression réglée d'après une cartographie du calculateur, transmise à l'actionneur, qui oriente les aubes d'un turbo à géométrie variable ; défauts enregistrés dans la mémoire du calculateur.
- Symptômes : voyant moteur ; manque de puissance (Volkswagen 2.0 TDI, Audi 2.0 TFSI 2013-2014) ; bruit du turbo (Passat 2.0 TDI) ou de ferraille au démarrage à froid (1.2 LIH).
- Marche à suivre : consigne de l'encadré ; diagnostic par la mémoire du calculateur puis contrôle visuel (Hella, section 5) ; turbo remplacé seulement dans les cas décrits ; turbo cassé : graissage en cause possible, circuit d'huile rincé et pompe à huile remplacée (Volkswagen Passat, p. 3 à 5).
- Peugeot, Renault (1.5 dCi), Mercedes, Hyundai, Mazda : aucun document lu ; « P0299 à chaud » non traité (aucune source).

**Ligne de validation proposée** : « Je valide la page code P0299 : question, encadré (ligne de la base « voyant moteur orange allumé fixe », coût et causes, pièce ajoutée « commande du turbo », empreinte 8b25b812…), fiche, cas par marque et faits du texte. »

## 3. Registre des sources (13 ajouts) et liste du coût (2 ajouts)

Sources secondaires admises (charte §2.2), consultées le 14/11/2026 : `ross-tech-p0420`, `hella-sonde-lambda`, `bulletin-toyota-t-sb-0161-13-p0420`, `bulletin-kia-eng160-p0420`, `bulletin-audi-2038434-p0420`, `bulletin-vw-2058261-p0420`, `bulletin-ford-19-2366-p0420`, `hella-commande-turbo`, `bulletin-audi-2013060-p0299`, `bulletin-audi-2039006-p0299`, `bulletin-vw-2026771-p0299`, `bulletin-vw-2036110-p0299`, `bulletin-gm-23-na-058-p0299`. Les bulletins sont des documents de constructeurs publiés par la NHTSA (États-Unis).

Pièces : `ligne-d-echappement` « Tuyau ou joint d'échappement » (réparation) ; `commande-de-turbo` « Commande du turbo (actionneur, électrovanne, soupape) » (réparation).

## 4. Revue indépendante

À faire.

## 5. Suite, après ta validation

Brouillons versés avec leur empreinte et la date du jour, passés dans `src/content/code-defaut/` par la règle de passage ; adresses ajoutées à la liste Lighthouse de production ; CI verte ; fusion par commit de fusion ; vérification en ligne des deux pages.

## 6. Validation de Houssem

À compléter.
