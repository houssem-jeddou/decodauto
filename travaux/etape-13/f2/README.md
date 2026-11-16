# Lot F2 : données du format 2 (brouillon, jamais validé)

`brouillon-f2.json` : pour les 26 lignes de la base voyants (`data/voyants.json`), la ligne d'écart courte
(`ecart_court`, 16 lignes qui ont un `ecart_marques`) et « ce que demande la notice » de chacune des 126 citations
(`demandes`). Rédigé le 16/11/2026 (nuit) depuis les citations validées de la base ; **aucun verdict, aucune urgence,
aucune action ne change**.

- Clé d'une demande : `<source>|<emplacement>` ; quand la paire se répète dans une ligne, `<source>|<emplacement>#<rang>`
  (1, 2… dans l'ordre de la base) pour chacune, et la clé sans suffixe n'existe pas pour cette paire.
- Règles vérifiées par script : écart de 23 mots au plus (25 avec « Votre marque », décompte du site), toutes les marques
  de la ligne citées, plus et moins strictes rangées selon le niveau de leurs consignes, accord au nombre ; demandes de
  10 mots au plus, à l'infinitif quand l'extrait demande quelque chose, sans nom de marque ni guillemets ; aucune clé
  manquante ni en trop.
- Relu par Claude (chat de pilotage) contre les extraits : trois écarts reformulés (voyant moteur qui clignote, réserve
  d'AdBlue, démarrage impossible). Ce n'est pas une revue indépendante : la revue du lot F2 la fera, sources à l'appui.
- Entrera dans la base (champ `ecart_court` de la ligne, champ `demande` de chaque citation) dans la pull request du lot
  F2, après validation ; les empreintes des lignes ne s'écrivent qu'après la validation du contenu exact.

## Illustrations des pages voyants (règle 2i)
`src/illustrations/` : 9 dessins pour les pages voyant huile, batterie, frein, FAP, préchauffage, airbag, ABS et ESP, pression
des pneus et direction (moteur et AdBlue : dessins de la démonstration de F1.2, copiés tels quels). Même style que le pilote validé : le
combiné (compteur, compte-tours), avec le ou les voyants de la page allumés dans l'écran central et une rangée de voyants
éteints. Chaque page en a un, avec son texte alternatif et sa légende dans `illustrations-f2.json` (champ `illustration` de
la page au lot F2 ; « Illustration decodauto. » est ajouté par le modèle). Légendes tirées des noms et des situations de la
base. Vérifiés : forme du fichier (un SVG avec viewBox, rien d'interdit par `illustrationEnLigne`), textes de 24 unités
(au moins 12 px à 375 px), rendu à 375 et 760 px de large avec `charte-b.css`. Brouillon, jamais validé.

## Pages voyants passées au format 2 (sur cette branche, sans pull request)
Les 11 pages voyants (hors page outil, qui attend la tâche F1.3a) : `format: 2`, champ `illustration`, repère sous chaque
H2 lié à une seule ligne de l'encadré (25 ; une exception explicite à une autre ligne dans le texte est admise, une section qui mêle plusieurs cas n'a pas de repère), formule « Verdict retenu… » retirée (le repère la remplace), références écrites à
la main remplacées par `{{cite:…}}` (règle 2d : au format 2, elles vont dans « Sources »), paragraphes de plus de trois
phrases coupés à une limite de phrase (28), pronoms de tête de paragraphe remplacés par le nom de la notice (7). Aucun H2
retiré ni renommé, aucun verdict changé. La base porte `ecart_court` (16 lignes) et `demande` (126 citations) : les
empreintes des lignes et des pages ne correspondent plus (R4-EMPREINTE) jusqu'à la validation du contenu exact.
Reste pour la pull request du lot F2 : `date_modification` des pages, revue indépendante, validation, empreintes, CI.

## Essai en CI sur les modèles de F1.2 (PR #62, fermée sans fusion, 16/11 vers 4 h 15)
- Construction de recette avec les 11 pages au format 2 : réussie (aucune erreur de rendu).
- Script de contrôle : 37 erreurs, toutes des empreintes (26 lignes, 11 pages) ; aucune autre (FORMAT2-*, part citée,
  titres) ; alertes inchangées.
- Tests à mettre à jour dans la PR du lot F2 : « empreintes du format 2 » (suppose la base sans donnée du format 2),
  « format 2 : construction de démonstration » (la démonstration se retire quand les données sont dans la base), tests
  qui rendent les vraies pages avec le modèle du format 1 (modèles 6.6, panne et dossier, pages rédigées), porte de
  l'étape 6 (encadrés validés) : ces derniers repassent une fois les empreintes versées après validation.
- La règle 2d (références hors du texte) attend les corrections de F1.2 (point 7 du brief).
