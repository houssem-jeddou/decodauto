# Voyant frein (lot 5d) : ce qui a été relevé

Relevé du 14/11/2026 au soir, pour la page `voyant-frein` (décision D4 de l'étape 5 : le témoin d'usure des plaquettes
n'était décrit dans aucune des six notices lues).

## Recherche de la source du témoin d'usure des plaquettes (D4)
- Notices lues du registre : Peugeot 208, Renault Clio 5 phase 2, Dacia Sandero 3, Toyota Yaris, Seat Ibiza (étape 5)
  et Citroën C3 (relue le 14/11) : aucune ne décrit ce témoin.
- Volkswagen (marque de référence) : la notice numérique (userguide.volkswagen.de) demande le numéro de série du
  véhicule ; la page du site volkswagen.fr « Témoin d'usure des plaquettes de frein » (véhicules thermiques) donne la
  couleur (jaune) et le sens (« Les plaquettes de frein avant sont usées »), mais renvoie la consigne à la notice : ce
  n'est pas une notice, elle n'est pas citée.
- Seat Leon (4e génération), notice d'utilisation édition 06/21, publiée par Seat (même hébergement que la notice
  Seat Ibiza du registre) : décrit le témoin, avec sa consigne. Ajoutée au registre (`notice-seat-leon`).

## Notice Seat Leon, édition 06/21
Adresse : https://www.seat.fr/datamanual-manual/leon/my22_w25/fr-fr/LEON_06_21_FR.pdf (438 pages ; référence de
couverture 5FA012740BP (06.21), « Leon 5D / Sportstourer »).

Lecture : texte du PDF par WebFetch, le 14/11/2026 entre 23 h 00 et 23 h 20 (le PDF ne s'affichait pas dans le
navigateur de Claude, son panneau étant masqué). Les extraits ci-dessous ont été demandés « caractère pour caractère »,
en citations de moins de 125 caractères ; les pictogrammes ne sont pas dans le texte du PDF (espace vide à leur
place). Le dessin des témoins n'a donc pas été vu.

- **p. 97, « Témoins d'alerte et de contrôle », liste « Témoins jaunes »** : « Plaquettes de frein avant usées »
  (renvoi « ››› page 297 ») ; « défaut sur le frein de stationnement électronique. » (sans renvoi ; l'entrée commence
  par une minuscule : début de phrase non relevé) ; « Dysfonctionnement de l'ABS » (renvoi « ››› page 303 »).
- **p. 297, « Freiner et stationner », « Système de freinage », Témoins** :
  - rouge : « S'allume en rouge » ; « Niveau de liquide de frein trop bas ››› page 370 ou dysfonctionnement du circuit
    de freinage. Ne continuez pas de rouler ! » (même texte que la notice Seat Ibiza p. 251, citée par la base) ;
  - rouge : « Frein de stationnement électronique ››› page 300. Le témoin s'éteint après avoir déverrouillé le frein
    de stationnement. » ;
  - jaune : « S'allume en jaune » ; « Plaquettes de frein avant usées. » ; « Adressez-vous immédiatement à un garage
    spécialisé. » (vérifié : « garage spécialisé », et non « atelier spécialisé »).
- **p. 298, encadré AVERTISSEMENT** : « Si le témoin [pictogramme] s'allume, seul ou en combinaison avec un message à
  l'écran du combiné d'instruments, » « rendez-vous immédiatement dans d'un atelier spécialisé pour qu'il contrôle les
  plaquettes de frein » « et qu'il remplace celles qui sont usées. » La coquille de la notice (« dans d'un ») est
  laissée hors de l'extrait de la ligne saisie, par « […] ».
- **p. 300-302, frein de stationnement électronique** : pas de consigne pour un témoin jaune de défaut ; p. 301,
  AVERTISSEMENT : « Le véhicule peut se déplacer même lorsque le frein de stationnement électronique est activé. »
  (non cité sur la page).
- **p. 304, « Servofrein électromécanique (eBKV) »**, texte courant : en cas de panne, « le symbole rouge […] de panne
  du système de freinage apparaît sur le combiné d'instruments » ; « des vibrations peuvent être ressenties au niveau
  de la pédale de frein » ; « le conducteur doit appuyer plus fort sur la pédale de frein » ; « car la distance de
  freinage augmente à cause de l'absence de l'assistance du servofrein ». Aucune consigne propre (rouler, s'arrêter)
  dans cette section : la page applique la ligne du voyant de freinage de la base.
- **p. 370, « Liquide de freins »** : « Si le niveau de liquide de frein diminue sensiblement en peu de temps ou
  descend en dessous du repère [pictogramme du repère] » ; « il se peut que le système de freinage ne soit plus
  étanche. » ; « Faites appel à un spécialiste en mesure de vous dépanner. » ; « Nous vous recommandons de faire
  effectuer la vidange du liquide de frein par un Service Technique. » (non cité : page « liquide de frein », vague C).

## Niveau tiré de la notice (grille, `src/schemas/grille.ts`)
- p. 297 : « Adressez-vous immédiatement à un garage spécialisé » : la notice laisse rouler jusqu'au garage, sans
  arrêt ni appel à l'assistance → **Oui, avec précautions** ; « immédiatement » → **À faire tout de suite**.
- p. 298 : « rendez-vous immédiatement dans […] un atelier spécialisé pour qu'il contrôle les plaquettes » : même
  niveau.

## Autres passages utilisés (déjà au registre)
- Base voyants, lignes `frein-rouge` et `frein-stationnement` (étape 5, extraits de la base) : Peugeot 208 p. 13-14,
  Seat Ibiza p. 251, Renault Clio 5 phase 2 p. 137 et 190, Dacia Sandero 3 p. 110-111 et 155, Toyota Yaris p. 118
  et 292.
- Page des voyants ABS et ESP (lot 5a) : Peugeot 208 p. 14 et 17 (voyant ABS parmi les témoins orange), Renault
  Clio 5 phase 2 p. 212-213 et Dacia Sandero 3 p. 184-185 (messages « Système freinage à contrôler » et « Panne du
  système de freinage »), relevé `airbag-abs-esp-releve.md`.
- Contrôle technique, annexe I de l'arrêté du 18 juin 1991 (relevé `controle-technique-releve.md`, relu le 14/11) :
  1.1.10.f.1, 1.1.13 (a.1, a.2, a.3, d.1), 1.1.6.e.2 ; article 7.

## Limites
- Seat Leon lue par extraction du texte du PDF, sans voir les pages : les numéros de page sont ceux imprimés dans le
  texte extrait. À relire à l'écran si un doute apparaît.
- Une seule notice décrit le témoin d'usure : la ligne saisie le dit, et la page renvoie à la notice de la voiture.
