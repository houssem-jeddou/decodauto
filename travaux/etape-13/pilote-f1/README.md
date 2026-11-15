# Pilote F1 (demande de changement n° 30), version 2 du 15/11/2026 (23 h)

Maquette statique, jamais déployée : nouveau format de lecture et trois pistes d'identité visuelle sur quatre pages.
- **Pistes** : A « Atelier », B « Tableau de bord », C « Route ».
- **Pages** : accueil, voyant moteur, voyant AdBlue, pression des pneus.
- **Textes** : repris de la production du 15/11 (`src/content`, `data/voyants.json`). Les textes nouveaux sont à valider aux lots F2 et F3 (liste dans `porte-f1.md`, §3).

**Où regarder**
- Canevas Design (artboards par piste) : https://claude.ai/artifact/9ybQRa2L4gEofat1pC5AEM
- Maquette interactive (pages entières, choix de la piste) : https://claude.ai/artifact/Hei9kTWqABaVAV4svYjEuU
- Porte du format (mesures, deux précisions proposées, revues) : `porte-f1.md`.

**Régénérer**
- `python3 polices.py`. Polices de titre sous licence OFL, sans nom réservé, prises dans un dossier de polices libres de l'environnement de travail ; les fichiers obtenus sont dans `polices/`, avec leur licence.
- `python3 generer.py`. Il écrit `maquette/` et lit les pictogrammes de `src/pictogrammes` et la base voyants.
- `python3 canvas.py`, `python3 porte/verifier_porte.py`, `python3 porte/perf.py` et `python3 porte/captures.py`. Ces scripts demandent un serveur local sur le port 8765, à lancer dans `maquette/`.

**Mesures** : à 375 × 667 visibles, avec la police chargée puis la police de secours (`porte/resultats-v2.json`).

**Reste à faire**
- Choix de la piste et validation du format par Houssem, dont les deux précisions de 2a et 2i.
- Mise en œuvre dans les modèles (lot F1), puis lots F2 et F3, en parallèle de la vague B.
