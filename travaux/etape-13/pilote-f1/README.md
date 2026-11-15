# Pilote F1 (demande de changement n° 30) : point de reprise du 15/11/2026, 21 h 20

Maquette statique, jamais déployée : nouveau format de lecture et trois pistes d'identité visuelle (A « Atelier », B « Tableau de bord », C « Route »), sur l'accueil et les pages voyant moteur, voyant AdBlue et pression des pneus. Textes repris de la production du 15/11 ; textes nouveaux à valider (lignes « Selon la marque » de 25 mots au plus, réponse directe de la pression des pneus, corps raccourci du voyant moteur, libellés de la grille de l'accueil).

- Canevas Design (artboards par piste) : https://claude.ai/artifact/9ybQRa2L4gEofat1pC5AEM
- Maquette interactive (pages entières, choix de la piste) : https://claude.ai/artifact/Hei9kTWqABaVAV4svYjEuU
- Régénérer : `python3 generer.py` (écrit `maquette/`, pictogrammes lus dans `src/pictogrammes`), polices sous-ensemblées depuis les polices libres du système (Inter, Poppins, Lora, licence OFL), `canvas.py` (artboards), `captures.py` et `mesures.py` (serveur local sur le port 8765).
- Mesures de la maquette (375 × 812) : voyant moteur 12,8 écrans (20,1 en ligne), fin de l'action de la 1re situation à 565 px ; AdBlue 647 px ; pression des pneus : réponse directe entière à 646 px.

Reste à faire : revue indépendante du pilote (pas encore lancée) ; choix de la piste par Houssem ; validation du format ; puis mise en œuvre dans les modèles (lots F2 et F3, en parallèle de la vague B).
