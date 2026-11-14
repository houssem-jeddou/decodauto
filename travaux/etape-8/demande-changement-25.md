# Demande de changement n° 25 : lignes `adblue-defaut` et `adblue-demarrage-impossible` de la base voyants

**Statut : proposée le 14/11/2026.** Origine : revue indépendante du lot 5c (constat I1) et décision de Houssem du 14/11 (19 h 53) : la page AdBlue est publiée avec un recouvrement entre deux lignes de son encadré, à corriger par cette demande.

## 1. Élément concerné

`data/voyants.json`, base validée le 24/10/2026 (étape 5, base figée) :
- ligne `adblue-defaut` (« Voyant AdBlue avec voyant moteur ou Service (système AdBlue défaillant) ») ;
- ligne `adblue-demarrage-impossible` (« AdBlue : démarrage impossible (réservoir vide ou système bloqué) »).

## 2. Changement proposé

**Ligne `adblue-defaut`** :
- nom : « Voyant AdBlue avec le témoin Service, sans le voyant moteur (système AdBlue défaillant) » ;
- situation : « Le voyant AdBlue s'allume avec le témoin Service (une clé), sans le voyant moteur, et un message de défaut antipollution, parfois avec les kilomètres qui restent avant le blocage du démarrage. » ;
- citation Peugeot 208 p. 16 (« Système d'antipollution SCR » : témoin AdBlue avec le témoin d'autodiagnostic moteur) **retirée** : elle décrit le cas du voyant moteur, qui relève de la ligne `moteur-orange-fixe` ;
- extrait Seat Ibiza p. 286 : « [deux témoins] Il s'allume en jaune » devient « [AdBlue] et [clé] Il s'allume en jaune » ;
- écart : « Seat demande de s'adresser à un atelier sans indiquer de délai ; Renault et Dacia demandent de consulter un représentant de la marque le plus tôt possible. » ;
- **inchangés** : verdict (Oui, avec précautions), urgence (À faire tout de suite), action, couleur, pictogramme, rattachement à la page AdBlue.

**Ligne `adblue-demarrage-impossible`** :
- situation : « … Selon la voiture, le voyant AdBlue est rouge, clignote ou reste allumé. » (au lieu de « rouge ou clignote ») ;
- extrait Seat Ibiza p. 286 : « [deux témoins] Il s'allume en rouge » devient « [AdBlue] et [clé] Il s'allume en rouge » ;
- **inchangés** : verdict (Non, arrêtez-vous immédiatement), urgence, action, écart, autres citations.

## 3. Raison

- **Recouvrement** : la situation de `adblue-defaut` dit « avec le voyant moteur ou Service » (Oui, avec précautions), alors que tout voyant moteur orange fixe relève de la ligne `moteur-orange-fixe` (Non, arrêtez-vous immédiatement), reprise sur la page AdBlue et sur la page du voyant moteur. L'encadré de la page AdBlue, en ligne depuis le 14/11 (7 900 recherches par mois, plafond, docs/05, dont « voyant adblue et voyant moteur » et « voyant moteur adblue »), affiche donc deux verdicts pour le même cas ; le texte retient le plus prudent, mais un lecteur qui ne lit que l'encadré peut retenir le moins prudent. Les lignes `abs` (« sans le voyant de freinage rouge ») et `direction-orange` (« sans le témoin STOP ») séparent déjà ainsi les cas qui se recouvrent.
- **Témoin associé chez Seat** : vu à l'écran le 14/11 (21 h 15) sur le PDF de la notice Seat Ibiza, p. 286 (PDF 288, zoom) : le second témoin, en jaune comme en rouge, est la **clé** (entretien, Service), pas le voyant moteur. Renault Clio 5 phase 2 (p. 167) et Dacia Sandero 3 (p. 139) : témoins AdBlue et Service, relevés à l'écran le 14/11. La ligne garde donc 3 marques de 2 groupes (Seat : groupe Volkswagen ; Renault et Dacia : Renault Group), règle 10 de 03 et contrôle R8.
- **Niveau** : sans la citation Peugeot, la citation la plus prudente reste « Oui, avec précautions ; À faire tout de suite » (Renault et Dacia : « le plus tôt possible ») : verdict et urgence inchangés (R3-PLUS-PRUDENT).
- **Dacia à « 0KM »** : la notice Dacia Sandero 3 (p. 138) donne le témoin AdBlue « s'allume » pour « 0KM BLOCAGE REMPLIR ADBLUE » ; la situation « rouge ou clignote » ne couvrait pas ce cas (constat M8 de la revue du lot 5c).

## 4. Impact sur ce qui est validé

- **Base voyants** : deux lignes changent ; nouvelles empreintes après ton accord : `adblue-defaut` `5fe714dd79c76d7baad8082a3080eadea9b2d46b6c86df3ce875afb7b216e586`, `adblue-demarrage-impossible` `8e50a30749677e69ec4afa81b590df2da18547b89d8a535e22ff704350cf42b5` (fonction du dépôt `empreinteVoyant`, qui redonne bien les empreintes actuelles `bf7b52db…` et `f674c176…` sur les lignes d'aujourd'hui). Nombre de lignes : 26, inchangé.
- **Page AdBlue (en ligne)** : son encadré affiche la situation de ces lignes : il change, et sa nouvelle empreinte demande ta validation (paquet joint). Le texte retire la phrase sur le recouvrement et cite Seat pour le témoin Service. Title, H1 et adresse inchangés (règle 14). La date « Mis à jour le » passe au jour de la publication de la correction (vraie modification, règle 14 b).
- **Page outil voyants (en ligne)** : elle affiche toutes les lignes de la base ; les deux lignes s'y affichent avec leur nouveau texte. Son encadré (voyant moteur orange fixe, ABS, préchauffage) et son empreinte ne changent pas.
- **Page voyant moteur** : inchangée ; elle donne déjà l'arrêt pour tout voyant moteur orange fixe.
- **Grille des coûts, tests** : aucune référence à ces citations (vérifié par recherche dans `src/`, `tests/` et `scripts/`).

## 5. Contrôles à relancer

Base voyants (R1, R3, R4-EMPREINTE, R8), construction complète, recette des pages AdBlue et outil, Lighthouse de la page AdBlue, vérification de la production après déploiement.

**Ligne de validation proposée** : « J'accepte la demande n° 25 : ligne adblue-defaut limitée au témoin Service sans le voyant moteur (citation Peugeot p. 16 retirée, Seat, Renault et Dacia gardés, verdict inchangé) ; situation de adblue-demarrage-impossible complétée pour Dacia. »
