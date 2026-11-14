# Paquet de validation : demande de changement n° 25 et mise à jour de la page voyant AdBlue (14/11/2026)

> Préparé par Claude pour Houssem (03, règles 5 et 7 ; porte 8 du lot, demande n° 17). Format téléphone. Texte complet de la demande : `travaux/etape-8/demande-changement-25.md`. Revue indépendante : §4. Le go vaut pour le commit qui applique la demande et publie la page mise à jour (§5) : toute autre modification après ta validation l'annule.

**Pourquoi** : la page AdBlue, en ligne depuis le 14/11, affiche deux verdicts pour le voyant AdBlue allumé avec le voyant moteur (ligne « AdBlue avec voyant moteur ou Service » : Oui, avec précautions ; ligne « voyant moteur orange fixe » : arrêt). Tu l'as validée en connaissant ce recouvrement, à corriger par cette demande. Vu sur le PDF Seat Ibiza p. 286 : le témoin associé à l'AdBlue est la clé (Service), pas le voyant moteur ; la ligne garde donc Seat, Renault et Dacia (3 marques, 2 groupes) et son verdict.

## 1. Ce qui change dans l'encadré de la page AdBlue

| Ligne | Avant | Après |
|---|---|---|
| 2 (`adblue-defaut`) : situation | « Le voyant AdBlue s'allume avec le voyant moteur ou Service et un message de défaut antipollution, parfois « démarrage impossible dans … km ». » | « Le voyant AdBlue s'allume avec le témoin Service (une clé), sans le voyant moteur, et un message de défaut antipollution, parfois avec les kilomètres qui restent avant le blocage du démarrage. » |
| 2 : écart entre marques | « Seat demande de s'adresser à un atelier sans indiquer de délai ; Peugeot, Renault et Dacia demandent d'y aller au plus tôt. » | « Seat demande de s'adresser à un atelier sans indiquer de délai ; Renault et Dacia demandent de consulter un représentant de la marque le plus tôt possible. » |
| 2 : verdict, urgence, action | Oui, avec précautions · À faire tout de suite · « Allez au garage au plus tôt… » | **inchangés** |
| 2 : notices citées | Peugeot p. 16, Seat p. 286, Renault p. 167, Dacia p. 139 | Seat p. 286, Renault p. 167, Dacia p. 139 (Peugeot p. 16, qui décrit l'AdBlue avec le voyant moteur, sort de la ligne) |
| 3 (`moteur-orange-fixe`) | Non, arrêtez-vous immédiatement | **inchangée** : c'est elle qui vaut pour l'AdBlue avec le voyant moteur |
| 4 (`adblue-demarrage-impossible`) : situation | « … Selon la voiture, le voyant AdBlue est rouge ou clignote. » | « … Selon la voiture, le voyant AdBlue est rouge, clignote ou reste allumé. » (Dacia p. 138 : témoin allumé à « 0KM ») |
| 4 : verdict, urgence, action, écart | Non, arrêtez-vous immédiatement · À faire tout de suite | **inchangés** |
| 1 (`adblue-reserve`), coût, question | – | **inchangés** |

Extraits Seat p. 286 des lignes 2 et 4 : « [deux témoins] » devient « [AdBlue] et [clé] » (témoin vu à l'écran).

## 2. Ce qui change dans le texte de la page AdBlue

- Premier paragraphe du cas Service : « **Avec le témoin Service (une clé), sans le voyant moteur** : [verdict de la ligne 2]. Le système d'antipollution est en défaut (messages « … à contrôler » des notices Renault Clio 5 phase 2 et Dacia Sandero 3 ; témoin AdBlue jaune avec la clé dans la notice Seat Ibiza), et un compte à rebours peut s'afficher avant que le démarrage soit bloqué : allez au garage au plus tôt. »
- Phrase retirée (le recouvrement n'existe plus) : « L'encadré donne aussi la ligne « voyant AdBlue avec voyant moteur ou Service » : avec le voyant moteur, c'est la consigne la plus prudente qui compte. »
- Démarrage impossible, consigne Seat : « (témoins AdBlue et clé en rouge) » ajouté.
- Inchangés : title, H1, description, question, coût, causes, autres parties. Date « Mis à jour le » : jour de la publication.

## 3. Empreintes et contrôles

- Ligne `adblue-defaut` : `5fe714dd79c76d7baad8082a3080eadea9b2d46b6c86df3ce875afb7b216e586` (aujourd'hui `bf7b52db…`).
- Ligne `adblue-demarrage-impossible` : `8e50a30749677e69ec4afa81b590df2da18547b89d8a535e22ff704350cf42b5` (aujourd'hui `f674c176…`).
- Page AdBlue, encadré mis à jour : `d7949081071d9390e42d7a31f1d18ef14786abc66463060024e9bc65d4be7322` (aujourd'hui `f476c128…`).
- Branche d'essai (état appliqué, empreintes des lignes non recalculées) : run cité au §4.

## 4. Revue indépendante

À faire.

## 5. Suite, après ta validation

1. Demande appliquée avec les deux empreintes (`travaux/etape-8/demande-changement-25.md` : statut).
2. Page mise à jour dans `src/content/voyant/voyant-adblue.md`, avec son empreinte et la date du jour ; brouillon retiré.
3. CI verte (Lighthouse compris), fusion par commit de fusion, vérification en ligne (page AdBlue et outil voyants).

## 6. Validation de Houssem

À compléter.

**Lignes de validation proposées** :
- « J'accepte la demande n° 25 : ligne adblue-defaut limitée au témoin Service sans le voyant moteur (citation Peugeot p. 16 retirée, Seat, Renault et Dacia gardés, verdict inchangé) ; situation de adblue-demarrage-impossible complétée pour Dacia. »
- « Je valide la mise à jour de la page voyant AdBlue : encadré (empreinte d7949081…) et texte. »
