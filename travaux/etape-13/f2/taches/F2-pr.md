# Tâche : pull request du lot F2 (pages voyants, outil et accueil au format 2)

Brief du chat de pilotage (16/11/2026). **Après la fusion de F1.4 et la validation de la porte F1 par Houssem.** Branche
`etape-13/f2-donnees` (données et textes du lot, sans pull request jusqu'ici) ; mêmes règles que les tâches F1
(`CLAUDE.md`, identité « noreply », jamais sur `main`, jamais de push forcé ni de réécriture d'historique : `main`
s'intègre par une fusion).

## 1. Intégrer `main` et ouvrir la pull request (brouillon)
- `git merge origin/main` sur `etape-13/f2-donnees` ; conflits résolus en gardant les modèles de `main` et les données du
  lot (base voyants : `ecart_court` et `demande` ; 12 pages : `format: 2`, `illustration`, textes repris).
- Pull request en brouillon « Lot F2 : pages voyants, outil et accueil au format 2 (piste B) », qui ne se fusionne qu'après la
  validation de Houssem (paquet `travaux/etape-13/f2/paquet-f2.md`) et les empreintes.

## 2. Ce que la pull request contient
- **Accueil** (décision de Houssem du 16/11, 17 h 00 : avancé du lot F3) : il passe au format 2 en production (modèle de F1.2, grille des pictogrammes), avec ses textes déjà validés (`PARAGRAPHES_ACCUEIL`) ; tout texte affiché nouveau (libellés de la grille, titres) est listé pour le paquet F2, tiré du code, jamais recopié à la main.
- `date_modification` des 12 pages : date du jour de la mise au point finale (règle 14 b : les textes sont repris, demande
  n° 30) ; `date_revue` inchangée sauf relecture complète.
- Tests mis à jour (liste du `README.md` du lot, « Essai en CI ») : empreintes du format 2, démonstration qui se retire
  quand les données sont dans la base, tests qui rendaient les vraies pages avec le modèle du format 1, porte de l'étape 6.
- Contrôles : seules erreurs attendues avant la validation, les empreintes des 26 lignes et des 12 pages (R4-EMPREINTE),
  jamais recalculées avant la validation de Houssem ; toute autre erreur se corrige.
- Après la validation (je te le dirai, avec la date et l'heure) : empreintes écrites par `npm run empreinte`, CI verte.

## 3. Preuves pour le paquet (avant la validation)
- Captures des 13 pages (accueil compris) à 375 × 667 et 1366 × 800, police chargée et police de secours, sans réduction de palette :
  premier écran, encadré entier, illustration, tableau des notices replié et déplié, sommaire ; et la page en ligne
  actuelle (format 1) à côté, pour comparaison.
- Mesures par page (`mesures.json`) : bas de la première situation de l'encadré (2a), mots de chaque ligne d'écart
  courte affichée avec « Votre marque » (2b), haut de l'illustration (2i, avec la raison au-delà de trois écrans si la
  demande n° 32 est acceptée), nombre d'écrans et sommaire (2h), largeur à 320 px (aucun débordement).
- Lighthouse mobile des 13 pages (3 passages) : performance et accessibilité ≥ 95, CLS < 0,1.
- Construction de production : les 7 autres pages en ligne identiques octet pour octet à `main` (seules les 13 pages du
  lot, le plan du site (`lastmod`) et les fichiers qui en découlent changent).
- `node travaux/etape-13/f2/verifier-pages-f2.py` et `generer-paquet-f2.py` relancés ; paquet régénéré s'il change.

## 4. Ce que tu me rends
Description de la PR avec chaque preuve (commande et sortie, CI, captures, mesures), et la liste de ce qui reste à
valider par Houssem (paquet F2, changements de l'outil sur captures). La revue indépendante est lancée par le chat.
