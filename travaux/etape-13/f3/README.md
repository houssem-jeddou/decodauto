# Lot F3 : pages codes, pneus et obligations, « à propos » et mentions légales au format 2 (brouillon, jamais validé)

Préparation du lot F3 de l'étape 13 avancée (demande de changement n° 30 ; sixième exception de la règle 12), sur la
branche `etape-13/f3-donnees`, sans pull request : **rien n'est validé**, aucun verdict, aucune urgence, aucune action ne
change. Sept pages : codes P0087, P0299 et P0420, loi montagne, pression des pneus, « à propos », mentions légales.
L'accueil et la 404 sont passés au lot F2 (décision de Houssem du 16/11, 17 h 00).

## Ce qui change dans les pages (16/11/2026)
- `format: 2` sur les 7 pages ; `illustration` sur les 5 pages éditoriales ; `reponse_directe` sur la pression des pneus
  (réponse du pilote F1, 21 mots ; règle 2c). Données dans `illustrations-f3.json`, versées par `appliquer-f3.py`.
- Règle 2d : formule « verdict retenu » retirée (codes : le repère du verdict la remplace ; la phrase garde la notice la plus
  prudente) ; références écrites à la main dans le tableau et le texte de la pression des pneus passées en `{{cite:…}}`
  (au format 2, elles vont dans « Sources ») ; « (Ross-Tech pour le groupe Volkswagen, {{cite…}}) » réécrit pour que la
  référence soit seule dans sa parenthèse (P0087, P0420).
- Repères du verdict sous un H2 lié à une seule ligne de l'encadré : « Peut-on rouler avec le code … ? » (3 codes, ligne du
  voyant moteur orange fixe ; les autres cas de la section, voyant qui clignote ou code lu sans voyant, sont des exceptions
  écrites) ; « Quand le voyant de pression des pneus s'allume » ; loi montagne : « Peut-on rouler sans pneus hiver ni
  chaînes… ? » (ligne 1) et « Deux chaussettes à neige suffisent-elles ? » (ligne 3).
- Règle 2e : paragraphes de plus de trois phrases coupés à une limite de phrase (codes : 2 chacun ; loi montagne : 3, dont
  celui de l'amende, qui commence par un montant ; « à propos » : 1). Aucun mot changé hors des phrases citées ci-dessus,
  aucun H2 retiré ni renommé.
- Pression des pneus : question de l'encadré remise dans l'ordre de la réponse directe (point du lot F3 de
  `a-reporter-f1.4.md`) : « À quelle pression gonfler mes pneus, et puis-je rouler s'ils sont sous-gonflés ? » (avant :
  « Puis-je rouler avec des pneus sous-gonflés, et à quelle pression les gonfler ? ») ; la réponse directe répond à la
  première moitié, la ligne de l'encadré à la seconde. L'encadré change : validation de Houssem et empreinte avec le lot.
- `verifier-pages-f3.py` (adapté de celui du lot F2) : 0 erreur sur les 7 pages.

## Points ouverts
- Encart « dépannage sur autoroute » (consigne sourcée, Service-public F11056) : noté pour F3 dans `a-reporter-f1.4.md`,
  avec une demande de changement (texte nouveau et champ de données) ; pas dans ce brouillon.
- `config/lots-format2.json` : la pull request du lot y inscrit le lot F3 et ses 7 pages (contrôle FORMAT2-VAGUE, F1.4).

## Illustrations (règle 2i)
`generer-illustrations-f3.py` écrit quatre dessins dans `src/illustrations/` ; la pression des pneus reprend le dessin du
pilote (`travaux/etape-13/f1/demo/illustrations/pression-etiquette-porte.svg`, copié tel quel). Style du pilote : pièces sur
le fond sombre du panneau, contour orange pour les pièces que nomment les causes de la page, textes de 24 unités.
- P0087 : circuit de carburant (réservoir et pompe, conduites basse pression, filtre, pompe haute pression, rampe et capteur
  de pression, injecteurs), d'après les causes de la page et la description de Bosch.
- P0299 : suralimentation (filtre à air, turbo, commande du turbo, vanne, air de suralimentation, échangeur, moteur,
  calculateur), d'après les causes et Hella.
- P0420 : ligne d'échappement (moteur, étanchéité, sonde avant, catalyseur, sonde après, calculateur), d'après Hella.
- Loi montagne : flanc du pneu, symbole alpin redessiné et marquage M+S ; à défaut, chaînes ou chaussettes à bord
  (article D314-8, V, et Sécurité routière, déjà cités sur la page).
Planche : `illustrations-f3-planche.png`. Rendu vérifié à 640 unités avec `rsvg-convert` ; à vérifier dans les pages à
375 × 667 et 1366 × 800, police chargée et police de secours, par la pull request du lot.

## Reste pour la pull request du lot F3 (après celle du lot F2, dont elle reprend la base voyants)
Construction et contrôles (non lancés ici : pas de dépendances installées dans cette session), `date_modification`,
captures et mesures, Lighthouse, revue indépendante, paquet de validation, empreintes après la validation de Houssem
(brief : `taches/F3-pr.md`).

## Pull request du lot F3 (houssem-jeddou/decodauto#77, 16/11/2026, soir)
- `main` (a2b36ce, lot F2 fusionné) intégré par une fusion, sans conflit.
- Lot inscrit dans `config/lots-format2.json` (les 7 pages, dans l'ordre du plan) ; `date_modification` des 5 pages
  éditoriales au 16/11/2026 (règle 14 b) ; celle des 2 pages du socle inchangée (revue, B1).
- Pression des pneus : dans les cellules du tableau, la barre des références `{{cite:<source>|<page>}}` s'écrit `\|` (sinon
  elle sépare les cellules : la construction échouait sur une référence illisible) ; rendu vérifié (4 cellules par ligne,
  pages citées dans « Sources ») ; `verifier-pages-f3.py` reconnaît cette forme. Aucun mot changé.
- Démonstration du format 2 : brouillon vidé (pages et socle), dessin de la pression des pneus retiré du dossier de la
  démonstration (identique à celui du site), plus de paragraphes à reprendre.
- Tests à jour (réponse directe lue dans la page, brouillon vide, lots F2 et F3, socle au format 1 sur la version au format 1
  des pages). Seuls échecs attendus avant la validation : les empreintes des 5 pages éditoriales (R4-EMPREINTE, et le test de
  la porte de l'étape 6 qui les vérifie).
- Preuves : `preuves/` (mesures, FORMAT2-MESURES, mots des lignes d'écart, Lighthouse, production comparée à `main`) et
  `captures/` (117 PNG).
- Reste : revue indépendante, paquet F3 validé par Houssem, empreintes (`npm run empreinte`), CI verte.

## Revue indépendante de la pull request (16/11/2026, ~23 h 45) : corrections
Détail, point par point, dans l'encadré « Revue indépendante » du paquet (`paquet-f3.md`, fin).
- B1 : dates du socle remises (mentions légales 10/11, « à propos » 15/11 : format seul) ; brief `taches/F3-pr.md` §2.
- I1 : paquet complété depuis `preuves/` (générateur `generer-paquet-f3.py` et `paquet-f3-fin.md`).
- I2 : références des cases du tableau de la pression dans « Sources » acceptées pour F3 (point à trancher du paquet).
- I3 : dessin de P0299 sans « vanne » ; légende sans « entraîné par les gaz d'échappement » (`generer-illustrations-f3.py`).
- m1 à m6 : schémas des codes gardés (paquet) ; titre de la section du verdict des codes avec sa condition (le lot déclare
  ces trois renommages dans `verifier-pages-f3.py`) ; pression : « à vide », « cadre de la porte », citation Peugeot entre
  guillemets ; brief : la question n'est plus dite « validée » (`scripts/lib/briefs.ts`) ; `preuves/README.md` et captures
  de la fiche auteur, de « Méthode » et de « Sources » ; méta-description de P0087.
- Preuves et captures refaites (145 PNG). Corrections non relues par la revue indépendante.
