# Paquet de validation, lot 4a de la vague A : codes défaut P0420 et P0299 (14/11/2026, après la revue)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone : une partie par page. Volume indicatif du lot : 25 912 recherches par mois (plafond, docs/05 : P0420 10 744, P0299 15 168). Revue indépendante : §4. Le go vaut pour le commit de passage décrit au §5 (brouillons versés avec leur empreinte et déplacés vers `src/content`, questions retirées de `consignes.json`, briefs régénérés, adresses ajoutées à la liste Lighthouse, comme pour les lots précédents) : toute autre modification après ta validation l'annule.
>
> **⚠ CI bloquée depuis le 14/11, 22 h 23** (facturation GitHub, voir la demande n° 25) : la fusion attendra que tu l'aies réglée ; la version corrigée repassera alors par la branche d'essai et la CI de la PR.
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

**Fiche du code** : signification « Rendement du catalyseur inférieur au seuil (ligne 1) » (Ross-Tech, Audi) ; portée générique ; moteurs concernés : essence (tous les documents cités décrivent des moteurs essence ; le texte dit qu'ils ne parlent pas du diesel ; la liste fermée du site n'a pas de valeur « non précisé ») ; voyant qui s'allume : voyant moteur orange fixe.

**Cas décrits par marque** (élément unique, tous des voitures vendues aux États-Unis) : Toyota Tacoma 2010 2TR-FE (bruit de ferraille du catalyseur et/ou voyant, tuyau avant remplacé) ; Kia Optima, Sorento, Sportage 2.4 GDI (voyant, P0420 parfois avec P0171, surtout pendant un long frein moteur en descente ; collecteur et catalyseur, ou seulement logiciel) ; Audi Q7 3.6 FSI 2007-2011 (logiciel du calculateur) ; Volkswagen Atlas 3.6 2018-2019 (catalyseur amélioré et logiciel, rien d'autre avant) ; Ford Police Interceptor Sedan 3.7 2016-2019 (catalyseur endommagé, remplacé, calculateur reprogrammé).

**Empreinte de l'encadré** : `05c43a35a48eef3a1ecb99304d705d940d8dd403dc2341c93b9fdb9515974cff`.

**Faits du texte** (relevé joint) :
- Sens du code : rendement du catalyseur de la ligne 1 sous le seuil ; intitulé anglais des bulletins ; P0430 pour la ligne 2 (cité avec P0420 par Audi, Volkswagen et Ford ; Ford nomme un catalyseur gauche et un droit).
- Principe (Hella) : depuis l'EOBD, le catalyseur est surveillé ; une seconde sonde lambda après lui mesure sa capacité à stocker l'oxygène ; signaux des deux sondes à peu près égaux : capacité atteinte, par exemple par le vieillissement.
- Symptômes : voyant moteur (Toyota, Kia, Audi, Ford) ; bruit de ferraille du catalyseur à l'accélération (Toyota Tacoma 2010).
- Marche à suivre : consigne de l'encadré ; points de contrôle de Ross-Tech (fuites, catalyseur, sondes et leur commande, test de vieillissement) ; mises à jour du calculateur (Audi, Kia, Volkswagen ; Ross-Tech : chercher une mise à jour dans la documentation du constructeur) ; « demandez au réseau de votre marque si une mise à jour existe pour votre voiture » ; essai sur route pour confirmer la réparation (Toyota).
- Conséquences et ce qui peut endommager le catalyseur : conséquences décrites (voyant, bruit, défaillance au contrôle technique), aucune autre ; voyant moteur qui clignote (Peugeot 208 p. 15 : risque de destruction du catalyseur ; Seat Ibiza p. 288 : défaut de combustion qui peut l'endommager), renvoi à la page du voyant moteur.
- Contrôle technique (arrêté du 18 juin 1991, annexe I) : relevé OBD, point 8.2.12 (anomalie sans dysfonctionnement important : mineure ; dysfonctionnement important : majeure ; connexion impossible : mineure) ; point 8.2.11 (équipement d'origine manifestement absent, modifié ou défectueux : majeure) ; article 7 (contre-visite dans les deux mois) ; le texte ne dit pas où se range un code P0420.
- Peugeot, Citroën, Renault, Nissan, 1.2 PureTech : aucun document lu ; même signification (code générique) ; seul le diagnostic dit d'où vient le défaut.

**Ligne de validation proposée** : « Je valide la page code P0420 : question, encadré (ligne de la base « voyant moteur orange allumé fixe », coût et causes, pièce ajoutée « tuyau ou joint d'échappement », empreinte 05c43a35…), fiche, cas par marque et faits du texte. »

## 2. Code P0299 (`/codes-defaut/p0299/`)

**Titre** : « Code P0299 : pression de turbo trop faible, peut-on rouler ? » · **H1** : « Code défaut P0299 : pression de suralimentation du turbo trop faible »
**Description** : « Code P0299 : le turbo ne donne pas la pression que demande le calculateur. Avec le voyant moteur allumé, arrêtez-vous d'abord. Causes et cas décrits par marque. »
**Question** : « Puis-je continuer à rouler avec le code P0299 ? »

**Ligne de l'encadré** : la même ligne de la base, **voyant moteur orange allumé fixe** (arrêt immédiat). **Pourquoi** : les bulletins d'Audi, de Volkswagen et de General Motors citent le voyant moteur avec le code.

**Coût probable (calculé)** : de « Réparation au garage » à « Grosse réparation ».

**Causes** (ordre logique, du circuit d'air à la commande, puis au turbo et au logiciel) :
1. Fuite sur le circuit d'air de suralimentation (Volkswagen 2.0 TDI) → durites et colliers.
2. Commande du turbo défaillante : dépression, membrane, électrovanne, actionneur (Volkswagen, General Motors ; Hella) → durites et colliers, **commande du turbo (pièce ajoutée, tranche réparation)**.
3. Vanne de recirculation ou tringlerie de la soupape de décharge défaillante (Audi 2.0 TFSI : vanne remplacée ou clip neuf, sans changer le turbo) → commande du turbo.
4. Turbo endommagé : arbre de turbine cassé ou grippé (Volkswagen Passat 2.0 TDI), tringlerie de la soupape de décharge usée (General Motors 1.2 LIH) → turbo.
5. Logiciel du calculateur à vérifier (Volkswagen 2.0 TDI) → calculateur.

**Fiche du code** : signification « Pression de suralimentation trop faible (turbocompresseur ou compresseur) » (Audi, Volkswagen) ; portée générique ; moteurs concernés : essence et diesel (2.0 TFSI et 1.2 LIH ; 2.0 TDI) ; voyant qui s'allume : voyant moteur orange fixe.

**Cas décrits par marque** (élément unique ; États-Unis ou Amérique du Nord) : Audi A3, A4 2.0 TFSI 2005-2007 (vanne de recirculation N249 à membrane déchirée, remplacée) ; Audi A4, A5, A6, Q5, TT 2.0 TFSI 2013-2014 (clip de tringlerie de la soupape de décharge tombé, baisse de puissance possible, pas de turbo à changer) ; Volkswagen Jetta, Golf 2.0 TDI 2009-2014 (durite de dépression, goujon de réglage ou carter, membrane, tuyau, raccord, logiciel ; turbo remplacé seulement pour le goujon ou le carter) ; Volkswagen Passat 2.0 TDI 2012-2014 (arbre de turbine cassé : circuit d'huile rincé, pompe à huile, turbo et tuyaux d'huile remplacés) ; Buick Encore GX et Chevrolet Trailblazer 1.2 LIH (tringlerie de soupape usée, bruit au démarrage à froid, turbo remplacé).

**Empreinte de l'encadré** : `f39168dd6c04ffe2fbc9b5879d37d81d672a963f7bc0b9d946e578833fe5216d`.

**Faits du texte** (relevé joint) :
- Sens du code : pression de suralimentation trop faible ; intitulé anglais « Turbo/Super Charger Underboost » ; Volkswagen : valeurs de régulation sous la limite.
- **P0299 ou P029900** (nouvelle partie, mots-clés « p029900 », « audi p029900 », « vw p029900 »…) : même intitulé dans les bulletins de Volkswagen (P0299) et d'Audi (P029900), même défaut.
- Principe (Hella) : pression réglée d'après une cartographie du calculateur, transmise à l'actionneur, qui oriente les aubes d'un turbo à géométrie variable ; défauts enregistrés dans la mémoire du calculateur.
- Symptômes : voyant moteur ; manque de puissance (Volkswagen 2.0 TDI, Audi 2.0 TFSI 2013-2014) ; bruit du turbo (Passat 2.0 TDI) ou de ferraille au démarrage à froid (1.2 LIH) ; selon Hella, une panne de l'actionneur électrique peut donner une perte de puissance, une accélération faible, le voyant moteur, une vitesse réduite et un mode dégradé (section 3).
- Marche à suivre : consigne de l'encadré ; diagnostic par la mémoire du calculateur puis contrôle visuel (Hella, section 5) ; turbo remplacé seulement dans les cas décrits ; turbo cassé de la Passat 2.0 TDI : circuit d'huile rincé, pompe à huile et tuyaux d'huile remplacés pour éviter que la panne ne revienne (p. 3 à 5).
- Peugeot (1.6 HDi), Citroën, Renault (1.5 dCi), Ford, Opel, Mercedes, Hyundai, Mazda : aucun document lu ; « P0299 à chaud » non traité (aucune source).

**Ligne de validation proposée** : « Je valide la page code P0299 : question, encadré (ligne de la base « voyant moteur orange allumé fixe », coût et causes, pièce ajoutée « commande du turbo », empreinte f39168dd…), fiche, cas par marque et faits du texte. »

## 3. Registre des sources (13 ajouts) et liste du coût (2 ajouts)

Sources secondaires admises (charte §2.2), consultées le 14/11/2026 : `ross-tech-p0420`, `hella-sonde-lambda`, `bulletin-toyota-t-sb-0161-13-p0420`, `bulletin-kia-eng160-p0420`, `bulletin-audi-2038434-p0420`, `bulletin-vw-2058261-p0420`, `bulletin-ford-19-2366-p0420`, `hella-commande-turbo`, `bulletin-audi-2013060-p0299`, `bulletin-audi-2039006-p0299`, `bulletin-vw-2026771-p0299`, `bulletin-vw-2036110-p0299`, `bulletin-gm-23-na-058-p0299`. Les bulletins sont des documents de constructeurs publiés par la NHTSA (États-Unis).

Pièces : `tuyau-ou-joint-d-echappement` « Tuyau ou joint d'échappement » (réparation) ; `commande-de-turbo` « Commande du turbo (actionneur, électrovanne, tringlerie, vanne de recirculation) » (réparation).

## 4. Revue indépendante

**Verdict : « à corriger », rien de bloquant** (sources admises, ligne de l'encadré justifiée, bulletins restitués fidèlement, à quelques faits près). Intégré :
- **I1** (P0299) : « le turbo cassé peut venir de son graissage » n'était dans aucune source : retiré ; le rinçage du circuit d'huile et la pompe restent, avec leur raison (« pour éviter que la panne ne revienne »).
- **I2** (P0420) : la partie « Ce qu'un catalyseur défectueux peut entraîner » parlait de ce qui l'endommage : retitrée, avec les conséquences décrites et la mention qu'il n'y en a pas d'autre.
- **I3** (P0299) : la cause « soupape ou vanne » était en grosse réparation alors que les cas Audi se règlent sans turbo : le cas General Motors (turbo remplacé) passe à la cause « turbo endommagé », la cause 3 en réparation ; plage inchangée.
- **I4** (P0299) : partie « P0299 ou P029900 ? » ajoutée (5 mots-clés du plan) ; Citroën, Ford, Opel et Peugeot 1.6 HDi nommés ; Hyundai et Mazda sortis du titre de partie (formulations du lecteur : « ni titre ni partie par modèle »).
- **Mineurs** : explications sans source retirées (moteurs en V, « pour les dépolluer ») ; essai sur route attribué à Toyota seul ; « campagne » retiré ; « cités plus bas » corrigé (le tableau est au-dessus) ; voyant qui clignote : « l'action à suivre n'est pas tout à fait la même » ; P0299 : « peut venir de » (Audi), marché redit dans les causes ; symptômes de l'actionneur selon Hella ajoutés ; registre Kia : éditeur « Kia », révision du 15/11/2016 ; identifiant de pièce aligné sur son libellé ; libellé « commande du turbo » sans le mot « soupape ».
- **I5** (CI bloquée) : hors contenu, signalé en tête.

**Écarté ou laissé ouvert** : « Moteurs concernés : Essence » sur la fiche P0420 (la liste fermée n'a pas de valeur « non précisé » ; le texte le dit ; à proposer en idée reportée) ; années du Trailblazer (« à partir de 2021 », la fin restant à confirmer) ; piste à vérifier sur Légifrance : selon le relecteur, le procès-verbal du contrôle technique liste les codes défaut relevés (annexe I, 1.2.1, point 13) — pas repris tant que je ne l'ai pas lu.

**Reste à vérifier** : pages construites de la version corrigée (CI bloquée) ; empreintes recalculées par la CI au passage.

## 5. Suite, après ta validation et le retour de la CI

Brouillons versés avec leur empreinte et la date du jour, passés dans `src/content/code-defaut/` par la règle de passage ; questions retirées de `consignes.json`, briefs régénérés ; adresses ajoutées à la liste Lighthouse de production ; CI verte ; fusion par commit de fusion ; vérification en ligne des deux pages.

## 6. Validation de Houssem

À compléter.
