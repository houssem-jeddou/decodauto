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
Les 12 pages voyants, page outil comprise (son modèle est la tâche F1.3a, pull request n° 64) : `format: 2`, champ
`illustration`, repère sous chaque H2 lié à une seule ligne de l'encadré (23 ; une exception explicite à une autre ligne
dans le texte est admise, une section qui mêle plusieurs cas n'a pas de repère et redit le verdict dans une phrase), formule « Verdict retenu… » retirée (le repère la remplace), références écrites à
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

## Version 2 du paquet (16/11/2026, après-midi) : corrections de la revue indépendante
- Formule « Verdict(s) retenu(s) » et « consigne retenue » retirées partout, page outil comprise (règle 2d) ; quatre
  repères retirés de sections qui mêlent plusieurs cas (voyant moteur : Peugeot et Citroën, kilomètres, perte de puissance ;
  frein à main), le verdict redit dans une phrase ; repères ajoutés sous « Voyant d'huile rouge qui clignote » et
  « Combien de temps peut-on rouler avec ce voyant ? » (pneus) ; verdict du voyant ESP qui clignote rétabli dans le texte ;
  coupes de paragraphes reprises (pronoms en tête, coquille du voyant moteur, puce AdBlue de cinq phrases).
- Base : 4 lignes d'écart courtes et 23 « ce que demande la notice » reprises (consigne Peugeot « faire appel au réseau »,
  gestes perdus, conditions qui distinguent deux consignes d'une même notice, seuil de 800 km, consignes adoucies ou durcies).
- Légendes de trois illustrations corrigées (pneus, batterie, préchauffage) ; page outil : illustration du combiné.
- Outils : `appliquer-f2.py` (verse le brouillon dans la base), `verifier-pages-f2.py` (règles 2d, 2e, repères, H2),
  `generer-paquet-f2.py` (paquet), `planche-f2.py` (planche des illustrations).

## Pull request du lot F2 (houssem-jeddou/decodauto#71, 16/11/2026, soir)
- `main` intégré par une fusion (cd2433f, porte F1 validée) ; accueil et page 404 au format 2 en production (fiche
  `src/content/socle/accueil.md`) ; lot inscrit dans `config/lots-format2.json` ; `date_modification` des 12 pages au 16/11.
- Démonstration du format 2 : ne simule plus le lot F2 (lignes de la base, pages, accueil retirés du brouillon de F1).
- Trois corrections de modèle, avec captures avant et après (`captures/corrections/`) : lien « Votre marque » sur une seule
  ligne, préposition du coût probable jamais seule en fin de ligne, H1 à 1,4 rem sur téléphone (règle 2a, voyant de pression
  des pneus en police de secours).
- Preuves du paquet : `captures/` (13 pages) et `preuves/` (mesures, FORMAT2-MESURES, Lighthouse, production comparée à `main`).
- Paquet version 3 : accueil et page 404 (A1 à A7), une phrase de la page ABS et ESP reprise (« La consigne retenue est » →
  « La consigne est alors », FORMAT2-METHODE).
- Reste : revue indépendante, validation de Houssem (paquet version 3, changements de l'outil et du H1 sur captures), puis
  empreintes (`npm run empreinte`), CI verte, relevé Search Console avant la fusion.

## Revue indépendante de la pull request (16/11/2026, soir ; `revue-independante.md`)
- I1 : item M1 du paquet (H1 à 1,4 rem, captures avant et après) ; `docs/11` après la validation.
- I2 : haut de l'illustration de chaque page dans le paquet, avec la raison au-delà de trois écrans (AdBlue, ABS et ESP).
- I3 : « Témoin Service : au plus tôt chez un représentant, avec ménagement » (airbag Dacia p. 101, ABS Renault p. 212 et
  Dacia p. 184).
- m1, m2 : E2 et E14 reprises ; m3 : demande Toyota de la pression des pneus avec « immédiatement » (dans l'extrait) ;
  m4 : « Sous 800 km » retiré des deux demandes AdBlue (le seuil n'est pas dans l'extrait) ; m5, m6 : items M2 à M5 ;
  m11 : captures de la page 404. Les autres mineurs sont dans la section 5 du paquet (points ouverts).
- Libellé d'urgence du tableau des notices jamais coupé (item M4). Paquet en version 4 ; preuves et captures refaites.
