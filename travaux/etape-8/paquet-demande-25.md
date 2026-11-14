# Paquet de validation : demande de changement n° 25 et mise à jour de la page voyant AdBlue (14/11/2026, version 2)

> Préparé par Claude pour Houssem (03, règles 5 et 7 ; porte 8 du lot, demande n° 17). Format téléphone. Texte complet de la demande : `travaux/etape-8/demande-changement-25.md`. Revue indépendante : §4. Le go vaut pour le commit qui applique la demande et publie la page mise à jour (§5) : toute autre modification après ta validation l'annule.

**Pourquoi** : la page AdBlue, en ligne depuis le 14/11, affiche « Oui, avec précautions » à côté de l'arrêt pour le voyant AdBlue allumé avec le voyant moteur. Tu l'as validée en connaissant ce recouvrement, à corriger par cette demande. La revue a montré qu'il passait aussi par la ligne « réserve basse » : la version 2 ajoute « sans le voyant moteur » aux deux lignes, et définit le défaut par son message.

**Une vérification à faire toi-même (1 minute)** : notice Seat Ibiza, PDF du registre (https://www.seat.fr/datamanual-manual/ibiza/my21_w48/fr-fr/IBIZA_11_20_FR.pdf), **page 288 du fichier** (p. 286 imprimée), tableau des témoins, partie AdBlue : les deux lignes « Il s'allume en jaune » et « Il s'allume en rouge » doivent montrer le symbole AdBlue **et une clé** (pas le voyant moteur). C'est ce qui garde 3 marques de 2 groupes à la ligne du défaut.

## 1. Ce qui change dans l'encadré de la page AdBlue

| Ligne | Avant | Après |
|---|---|---|
| 1 (`adblue-reserve`) : situation | « Le voyant AdBlue orange s'allume ou clignote avec un message d'autonomie, par exemple « démarrage impossible dans … km ». » | **… , sans le voyant moteur.** (verdict, urgence, action, 4 marques inchangés) |
| 2 (`adblue-defaut`) : situation | « Le voyant AdBlue s'allume avec le voyant moteur ou Service et un message de défaut antipollution, parfois « démarrage impossible dans … km ». » | « Le voyant AdBlue s'allume avec un message de défaut du système antipollution (par exemple « … à contrôler »), avec le voyant Service ou une clé selon la marque, sans le voyant moteur ; parfois avec les kilomètres qui restent avant le blocage du démarrage, tant que l'autonomie affichée n'est pas à 0 km. » |
| 2 : écart | « Seat … sans indiquer de délai ; Peugeot, Renault et Dacia demandent d'y aller au plus tôt. » | « Seat … sans indiquer de délai ; Renault et Dacia demandent de consulter un représentant de la marque le plus tôt possible. » |
| 2 : notices | Peugeot p. 16, Seat p. 286, Renault p. 167, Dacia p. 139 | Seat p. 286, Renault p. 167, Dacia p. 139 (Peugeot p. 16 : voyant AdBlue avec le voyant moteur, sort de la ligne) |
| 2 : verdict, urgence, action | Oui, avec précautions · À faire tout de suite · « Allez au garage au plus tôt… » | **inchangés** |
| 3 (`moteur-orange-fixe`) | Non, arrêtez-vous immédiatement | **inchangée** : seule ligne pour l'AdBlue avec le voyant moteur |
| 4 (`adblue-demarrage-impossible`) : situation | « … le voyant AdBlue est rouge ou clignote. » | « … rouge, clignote ou reste allumé. » (Dacia p. 138 à « 0KM ») ; verdict inchangé |

Extraits Seat p. 286 (lignes 2 et 4) : « [deux témoins] » devient « [AdBlue] et [clé] ». Nom de la ligne 2 (outil, tableau des notices) : « Voyant AdBlue avec un message de défaut antipollution, sans le voyant moteur ».

## 2. Ce qui change dans le texte de la page AdBlue

- Chaque cas de la première partie dit « sans le voyant moteur ».
- Cas du défaut : « Avec un message de défaut antipollution, sans le voyant moteur : [verdict] » ; voyants AdBlue et Service avec les messages « … à contrôler » (Renault, Dacia), voyant AdBlue jaune avec la clé (Seat) ; **nouveau** : « Le voyant Service ne suffit pas à le dire : sur la Citroën C3 à moteur 1.6 BlueHDi, le voyant AdBlue qui clignote avec le voyant Service annonce une réserve basse (notice C3, p. 12). Lisez le message affiché. »
- Démarrage impossible, Seat : « (voyant AdBlue rouge avec la clé) ».
- Notices lues : Citroën C3 ajoutée à la liste ; partie « marque par marque » : **Citroën C3** (1.5 BlueHDi : seuils de la Peugeot 208 ; 1.6 BlueHDi Euro 6.1 : fixe entre 2 400 et 600 km, appoint rapide ; sous 600 km, clignotant avec le voyant Service, appoint impératif pour éviter la panne).
- Défaut antipollution de la Peugeot 208 : « La notice Citroën C3 décrit le même cas, avec en plus le voyant Service (p. 13). »
- Renault et Dacia : « Sans le voyant moteur, et tant que l'autonomie affichée n'est pas à 0 km : [verdict de la ligne 2] ; à « 0 KM », c'est celle du démarrage impossible : [verdict de la ligne 4]. »
- Après le remplissage : « Si le voyant reste allumé avec un message de défaut, sans le voyant moteur : [verdict de la ligne 2] ».
- Phrase retirée (le recouvrement n'existe plus) : « L'encadré donne aussi la ligne « voyant AdBlue avec voyant moteur ou Service » : avec le voyant moteur, c'est la consigne la plus prudente qui compte. »
- Description : « Avec le voyant Service, garage au plus tôt » devient « Message de défaut : garage au plus tôt ». Inchangés : title, H1, question, coût, causes. Date « Mis à jour le » : jour de la publication.

## 3. Empreintes et contrôles

- `adblue-reserve` : `b8a22eb1121eeb2697b54764e1572190bb77d0c9cd6756cc6b89254ae00d6bcd` (aujourd'hui `003b8d89…`).
- `adblue-defaut` : `121e896759d839abe378fce4e44ea5916ef9ef41fa56ba75d858e47a072b8643` (aujourd'hui `bf7b52db…`).
- `adblue-demarrage-impossible` : `8e50a30749677e69ec4afa81b590df2da18547b89d8a535e22ff704350cf42b5` (aujourd'hui `f674c176…`).
- Page AdBlue, encadré mis à jour : `2b1ee678d0194426d6c56e614eab046f7e774da60c2e638d411b16a0788b841c` (aujourd'hui `f476c128…`).
- Branche d'essai `essai/brouillons` (état appliqué, empreintes non versées) : run cité au §4.

## 4. Revue indépendante

À compléter après la seconde revue.

## 5. Suite, après ta validation

1. Demande appliquée avec les trois empreintes (`travaux/etape-8/demande-changement-25.md` : statut).
2. Page mise à jour dans `src/content/voyant/voyant-adblue.md`, avec son empreinte et la date du jour ; brouillon retiré ; brief régénéré.
3. CI verte (Lighthouse compris), fusion par commit de fusion, vérification en ligne (page AdBlue et outil voyants).

## 6. Validation de Houssem

À compléter.

**Lignes de validation proposées** :
- « J'accepte la demande n° 25 (version 2) : « sans le voyant moteur » dans les lignes adblue-reserve et adblue-defaut, adblue-defaut définie par le message de défaut (citation Peugeot p. 16 retirée ; Seat, Renault et Dacia gardés, verdict inchangé ; clé chez Seat vue par moi sur le PDF), situation de adblue-demarrage-impossible complétée pour Dacia. »
- « Je valide la mise à jour de la page voyant AdBlue : encadré (empreinte 2b1ee678…) et texte, dont la nuance Citroën C3. »
