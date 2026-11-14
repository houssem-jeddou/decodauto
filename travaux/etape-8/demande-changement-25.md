# Demande de changement n° 25 : lignes AdBlue de la base voyants (`adblue-reserve`, `adblue-defaut`, `adblue-demarrage-impossible`)

**Statut : acceptée par Houssem le 14/11/2026 (22 h 45), version 3** (proposée le 14/11 ; version 2 après la revue indépendante, 22 h 10 ; version 3 après la seconde revue, vers 22 h 40). Appliquée avec les trois empreintes dans la pull request de la demande (n° 49). Origine : revue indépendante du lot 5c (constat I1) et décision de Houssem du 14/11 (19 h 53) : la page AdBlue est publiée avec un recouvrement entre deux lignes de son encadré, à corriger par cette demande.

## 1. Élément concerné

`data/voyants.json`, base validée le 24/10/2026 (étape 5, base figée), trois lignes de la page AdBlue :
- `adblue-reserve` (« Voyant AdBlue orange (réserve basse, démarrage bientôt bloqué) ») ;
- `adblue-defaut` (« Voyant AdBlue avec voyant moteur ou Service (système AdBlue défaillant) ») ;
- `adblue-demarrage-impossible` (« AdBlue : démarrage impossible (réservoir vide ou système bloqué) »).

## 2. Changement proposé

**Ligne `adblue-reserve`** (ajoutée par les revues) : situation « Le voyant AdBlue orange s'allume ou clignote avec un message d'autonomie, par exemple « démarrage impossible dans … km », **sans message de défaut ni voyant moteur, tant que l'autonomie affichée n'est pas à 0 km**. » Nom, verdict (Oui, avec précautions), urgence, action, écart et citations inchangés.

**Ligne `adblue-defaut`** :
- nom : « Voyant AdBlue avec un message de défaut antipollution, sans le voyant moteur » ;
- situation : « Le voyant AdBlue s'allume avec un message de défaut du système antipollution (par exemple « … à contrôler »), avec le voyant Service ou une clé selon la marque, sans le voyant moteur ; parfois avec les kilomètres qui restent avant le blocage du démarrage, tant que l'autonomie affichée n'est pas à 0 km. » ;
- citation Peugeot 208 p. 16 (« Système d'antipollution SCR » : témoin AdBlue avec le témoin d'autodiagnostic moteur) **retirée** : elle décrit le cas du voyant moteur, qui relève de la ligne `moteur-orange-fixe` ;
- extrait Seat Ibiza p. 286 : « [deux témoins] Il s'allume en jaune » devient « [AdBlue] et [clé] Il s'allume en jaune » ;
- écart : « Seat demande de s'adresser à un atelier sans indiquer de délai ; Renault et Dacia demandent de consulter un représentant de la marque le plus tôt possible. » ;
- **inchangés** : verdict (Oui, avec précautions), urgence (À faire tout de suite), action, couleur, pictogramme, rattachement à la page AdBlue.

**Ligne `adblue-demarrage-impossible`** :
- situation : « … Selon la voiture, le voyant AdBlue est rouge, clignote ou reste allumé. » (au lieu de « rouge ou clignote ») ;
- extrait Seat Ibiza p. 286 : « [deux témoins] Il s'allume en rouge » devient « [AdBlue] et [clé] Il s'allume en rouge » ;
- **inchangés** : verdict (Non, arrêtez-vous immédiatement), urgence, action, écart, autres citations.

## 3. Raison

- **Recouvrements** : tout voyant moteur orange fixe relève de la ligne `moteur-orange-fixe` (Non, arrêtez-vous immédiatement), reprise sur la page AdBlue et sur la page du voyant moteur. Or la situation de `adblue-defaut` dit « avec le voyant moteur ou Service », et celle de `adblue-reserve` n'exclut pas le voyant moteur, alors que le défaut SCR de la Peugeot 208 (p. 16) et de la Citroën C3 (p. 13) associe le voyant AdBlue clignotant, le voyant moteur et un message d'autonomie (« Démarrage interdit dans X km ») : l'encadré de la page AdBlue, en ligne depuis le 14/11 (7 900 recherches par mois, plafond, docs/05, dont « voyant adblue et voyant moteur » et « voyant moteur adblue »), affiche donc « Oui, avec précautions » à côté de l'arrêt pour ce cas. Avec « sans le voyant moteur » dans les deux lignes, seul l'arrêt s'applique. Troisième recouvrement (revues) : les messages « 0 KM blocage remplir AdBlue » et « 0 KM blocage antipollution » (Renault p. 166-167, Dacia p. 138-139) relèvent de `adblue-demarrage-impossible` (arrêt) ; les situations de `adblue-reserve` et de `adblue-defaut` s'arrêtent donc avant 0 km (aucune citation de `adblue-reserve` ne décrit le 0 km). Enfin, « sans message de défaut » sépare la réserve basse (« XXX KM blocage remplir AdBlue ») du défaut (« XXX KM blocage antipollution ») : même verdict, mais pas la même action (faire l'appoint ou aller au garage). Les lignes `abs` (« sans le voyant de freinage rouge ») et `direction-orange` (« sans le témoin STOP ») séparent déjà ainsi les cas qui se recouvrent.
- **Le message, pas le voyant Service** : selon la notice Citroën C3 (édition 01-20, p. 12), avec le moteur 1.6 BlueHDi, le voyant AdBlue qui clignote avec le voyant Service fixe annonce une **réserve basse** (moins de 600 km, appoint impératif), pas un défaut. La ligne `adblue-defaut` se définit donc par le message de défaut ; le voyant associé change selon la marque : Service chez Renault et Dacia (p. 167 et 139), clé chez Seat.
- **Témoin associé chez Seat** : relevé à l'écran le 14/11 vers 21 h 15 sur le PDF de la notice Seat Ibiza, p. 286 (page 288 du fichier) : le second symbole, en jaune comme en rouge, est la clé, pas le voyant moteur (lecture tracée dans `travaux/etape-8/textes/adblue-prechauffage-releve.md`, à revoir par Houssem sur le PDF ; le texte extrait du PDF n'a pas les symboles). La ligne `adblue-defaut` garde donc 3 marques de 2 groupes (Seat : groupe Volkswagen ; Renault et Dacia : Renault Group), règle 10 de 03 et contrôle R8. Sans la lecture du symbole Seat, la ligne n'aurait qu'un groupe.
- **Niveau** : sans la citation Peugeot, la citation la plus prudente reste « Oui, avec précautions ; À faire tout de suite » (Renault p. 167 : « Consultez un Représentant de la marque le plus tôt possible »), verdict et urgence inchangés (R3-PLUS-PRUDENT). Les citations de `adblue-reserve` décrivent le voyant AdBlue seul (Peugeot p. 15, Seat, Renault p. 166, Dacia p. 138) : l'exclusion du voyant moteur ne change ni son niveau ni ses 4 marques.
- **Dacia à « 0KM »** : la notice Dacia Sandero 3 (p. 138) donne le témoin AdBlue « s'allume » pour « 0KM BLOCAGE REMPLIR ADBLUE » ; la situation « rouge ou clignote » ne couvrait pas ce cas (constat M8 de la revue du lot 5c).

## 4. Impact sur ce qui est validé

- **Base voyants** : trois lignes changent ; nouvelles empreintes, versées après ton accord : `adblue-reserve` `46d4a991bf0cd04fa31b2cceb6c5124caec95129eaa00bf8a69ccc479c7b3117` (aujourd'hui `003b8d89…`), `adblue-defaut` `121e896759d839abe378fce4e44ea5916ef9ef41fa56ba75d858e47a072b8643` (aujourd'hui `bf7b52db…`), `adblue-demarrage-impossible` `8e50a30749677e69ec4afa81b590df2da18547b89d8a535e22ff704350cf42b5` (aujourd'hui `f674c176…`) ; calculées par la fonction du dépôt `empreinteVoyant`, qui redonne bien les empreintes actuelles sur les lignes d'aujourd'hui. Nombre de lignes : 26, inchangé.
- **Page AdBlue (en ligne)** : son encadré affiche la situation de ces lignes : il change, et sa nouvelle empreinte (`10b8ac97…`) demande ta validation (paquet joint). Le texte : chaque cas dit « sans le voyant moteur » ; le cas du défaut se reconnaît au message, avec la nuance de la Citroën C3 1.6 BlueHDi (réserve basse avec le voyant Service) ; le compte à rebours n'est attribué qu'à Renault et Dacia ; le « 0 KM » renvoie partout à la ligne du démarrage impossible ; seuils de la C3 ajoutés à la partie « marque par marque » ; défaut SCR de la C3 cité avec celui de la Peugeot 208 ; phrase sur le recouvrement retirée. Sources de la page : notice Citroën C3 ajoutée (citée dans le texte, pas dans la base). Description : « Avec le voyant Service, garage au plus tôt » devient « Message de défaut : garage au plus tôt ». Title, H1 et adresse inchangés (règle 14). La date « Mis à jour le » passe au jour de la publication de la correction (vraie modification, règle 14 b).
- **Tableau des notices de la page AdBlue** (son élément unique) : la rangée Peugeot p. 16 sort de la partie `adblue-defaut` ; le cas Peugeot (voyant AdBlue avec le voyant moteur) reste traité dans le texte, avec sa source.
- **Page outil voyants (en ligne)** : elle affiche toutes les lignes de la base ; les trois lignes s'y affichent avec leur nouveau texte. Son encadré (voyant moteur orange fixe, ABS, préchauffage) et son empreinte ne changent pas ; sa date « Mis à jour le » passe au jour de la publication, comme celle de la page AdBlue (correction de sécurité, charte §4 et §5.3 ; le contrôle DATE-SANS-MODIFICATION l'admet puisque la base change).
- **Page voyant moteur** : inchangée ; elle donne déjà l'arrêt pour tout voyant moteur orange fixe.
- **Brief** `travaux/etape-6/briefs/voyant-adblue.md` : régénéré (il reprend les noms et le nombre de notices des lignes).
- **Grille des coûts, tests** : aucune référence à ces citations (vérifié par recherche dans `src/`, `tests/` et `scripts/`).
- **Hors de la demande, en idées reportées** : la ligne `fap` dit dans son action « s'il s'accompagne du voyant moteur ou Service, allez au garage » ; même question de recouvrement avec le voyant moteur, à examiner à part (première revue, M5). Sur la page outil, la ligne `entretien-vidange` (« Le voyant clé s'allume… », sous quelques jours) recouvre en partie `adblue-defaut` (« … une clé selon la marque », tout de suite) ; le recouvrement existait déjà par la clé Service de Renault (seconde revue, mineur 6).

## 5. Contrôles à relancer

Base voyants (R1, R3, R4-EMPREINTE, R8), briefs, construction complète, recette des pages AdBlue et outil, Lighthouse de la page AdBlue, vérification de la production après déploiement.

**Ligne de validation proposée** : « J'accepte la demande n° 25 (version 3) : « sans le voyant moteur » et « avant 0 km » dans les lignes adblue-reserve et adblue-defaut, adblue-defaut définie par le message de défaut (citation Peugeot p. 16 retirée ; Seat, Renault et Dacia gardés, verdict inchangé ; clé chez Seat vue par moi sur le PDF), situation de adblue-demarrage-impossible complétée pour Dacia. »
