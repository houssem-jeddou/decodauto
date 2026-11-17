# Tâche : pull request du lot F3 (codes, pneus et obligations, « à propos » et mentions légales au format 2)

Brief du chat de pilotage (16/11/2026). **Après la fusion du lot F2** (qui verse dans la base voyants `ecart_court` et
`demande`, dont la ligne du voyant moteur orange fixe des trois pages codes). Branche `etape-13/f3-donnees` (données et
textes du lot, sans pull request jusqu'ici) ; mêmes règles que les tâches F1 et F2 (`CLAUDE.md`, identité « noreply »,
jamais sur `main`, jamais de push forcé ni de réécriture d'historique : `main` s'intègre par une fusion).

## 1. Intégrer `main` et ouvrir la pull request (brouillon)
- `git merge origin/main` sur `etape-13/f3-donnees` ; conflits résolus en gardant les modèles de `main` et les données du
  lot (7 pages : `format: 2`, `illustration`, `reponse_directe`, textes repris ; 4 dessins dans `src/illustrations/`).
- Pull request en brouillon « Lot F3 : codes, pneus et obligations, « à propos » et mentions légales au format 2 (piste B) »,
  qui ne se fusionne qu'après la validation de Houssem (paquet F3) et les empreintes.

## 2. Ce que la pull request contient
- Les 7 pages du `README.md` du lot, construites avec les modèles de F1.3b (code défaut, pneus et obligations, socle).
- Le lot F3 et ses 7 pages inscrits dans `config/lots-format2.json` (FORMAT2-VAGUE, F1.4).
- La démonstration du format 2 (`scripts/lib/demo-format2.ts`, `brouillon-format2.json`) n'emprunte plus de dessin ni de
  texte pour ces pages : retirer de la démonstration ce que les vraies pages portent désormais, comme au lot F2.
- `date_modification` des 5 pages éditoriales : date du jour de la mise au point finale (règle 14 b : textes repris) ; celle des
  2 pages du socle **ne change pas** (mentions légales : 10/11 ; « à propos » : 15/11) : seul leur format change, aucun mot
  (règle 14 b, demande n° 30 §7 ; corrigé après la revue indépendante de la pull request, B1). `date_revue` inchangée sauf
  relecture complète.
- Tests mis à jour comme au lot F2 (empreintes du format 2, démonstration, tests qui rendaient ces pages au format 1).
- Contrôles : seules erreurs attendues avant la validation, les empreintes des 5 pages éditoriales (R4-EMPREINTE), jamais
  recalculées avant la validation de Houssem ; toute autre erreur se corrige (FORMAT2-*, CITATIONS-PART, TITRE-*, DATE-*).
- Après la validation (je te le dirai, avec la date et l'heure) : empreintes écrites par `npm run empreinte`, CI verte.

## 3. Preuves pour le paquet (avant la validation)
- `python3 travaux/etape-13/f3/verifier-pages-f3.py . code-defaut/code-p0087 code-defaut/code-p0299 code-defaut/code-p0420 pneus/loi-montagne pneus/pression-des-pneus socle/a-propos socle/mentions-legales` : 0 erreur.
- Captures des 7 pages à 375 × 667 et 1366 × 800, police chargée et police de secours : premier écran, encadré entier,
  illustration, tableau des notices replié et déplié (codes, pression), sommaire s'il y en a un ; et la page en ligne
  actuelle (format 1) à côté, pour comparaison.
- Mesures par page (`mesures.json`) : bas de la première situation (2a) ; sur la pression des pneus, bas de la réponse
  directe et haut de la première situation (2a, page informative) ; mots de chaque ligne d'écart courte (2b) ; haut de
  l'illustration et sa place juste après « Notices / Base du coût » (2i, demande n° 32) ; nombre d'écrans et sommaire
  (2h) ; largeur à 320 px (aucun débordement).
- Dessins : lisibles à 375 px (textes d'au moins 12 px), aucun texte coupé ; si un dessin te paraît faux par rapport aux
  causes ou au texte de sa page, ne le corrige pas : signale-le avec la preuve.
- Lighthouse mobile des 7 pages (3 passages) : performance et accessibilité ≥ 95, CLS < 0,1.
- Construction de production : les autres pages en ligne identiques octet pour octet à `main` (seules les 7 pages du
  lot, le plan du site (`lastmod`) et ce qui en découle changent).

## 4. Ce que tu me rends
Description de la PR avec chaque preuve (commande et sortie, CI, captures, mesures), et la liste de ce qui reste à valider
par Houssem. La revue indépendante est lancée par le chat.
