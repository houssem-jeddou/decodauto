# Lot U1 : menu du site et pied de page (demande de changement n° 40) — paquet

Étape 12, audit UX/UI (`travaux/etape-12/audit-ux-ui/audit.md`, proposition P1). Pull request #102, branche
`etape-12/u1-menu`. **Validé d'avance par Houssem le 21/11/2026 (7 h 11)** : demande n° 40 acceptée, avec « Mon voyant »
sous 30 rem et le pied de page complet, sur les maquettes `m1-*` ; captures du lot présentées avec la synthèse.

## 1. Ce qui change
- **Menu du site** dans le bandeau de toutes les pages au format 2, 404 comprise (`menuFormat2`, `src/lib/format2.ts`,
  posé par `src/layouts/Base.astro`) : un bouton « Menu » (trois traits ; le mot « Menu » sur ordinateur), sans script, qui
  ouvre par-dessus la page la liste des pages construites, par thème, dans l'ordre de l'accueil (même liste que l'accueil,
  `pagesListees`, générée depuis le plan).
  - Au téléphone et sur tablette : un volet par thème, avec son nombre de pages ; la page affichée en ambre, en gras et
    soulignée (`aria-current`), son thème seul ouvert.
  - Sur ordinateur (64 rem et plus) : les quatre thèmes en colonnes titrées, toujours ouvertes.
- **« Mon voyant »** : sous 30 rem, le bouton « Trouver mon voyant » s'écrit « Mon voyant » (son nom accessible reste
  « Trouver mon voyant ») ; le bandeau tient sur une rangée de 320 à 1366 px.
- **Pied de page** : « À propos », « Méthode » et les quatre thèmes de l'accueil, puis « Signaler une erreur » et les
  mentions légales.
- **Contrôles** : MENU-PRESENT, MENU-LISTE, MENU-ACTUELLE, PIED-LIENS ; bandeau sur une rangée mesuré par FORMAT2-MESURES
  à 320, 375, 390, 414, 430, 481, 768 et 1366 px (`CONTROLES.md`).
- **Outil de travail** : `.github/workflows/captures.yml` et `scripts/captures-ci.ts` prennent les captures de recette dans
  la CI quand `travaux/captures-ci/demande.json` change (lecture seule, aucun secret, exécuteur hébergé par GitHub) : les
  captures sont écrites dans le journal du job.
- **Documents** : charte graphique (version 5 ; rangées « Bandeau », « Menu du site », « Pied de page », « Bandeau sous
  30 rem »), `docs/09`, `CONTROLES.md`, `CLAUDE.md`.

## 2. Mesures et captures
- **Rendu local** avec les vrais modules du dépôt (outil de la revue, Chrome, Inter) : aucun débordement, menu fermé ou
  ouvert, sur la page du voyant moteur, la 404 et « à propos », à 320, 375 et 1366 px ; panneau de 304 px à 320 px, de
  359 px à 375 px, de 896 px sur ordinateur.
- **Focus** : clavier, menu ouvert, puis tabulation jusque dans la page : 40 éléments focalisés à 375 px et 22 à 1366 px,
  aucun caché par le panneau (il s'efface quand le focus passe dans la page ou le pied).
- **Arbre d'accessibilité**, menu ouvert à 1366 px : 37 liens exposés, aucun volet (les colonnes ne sont pas des
  `details`).
- **Couleurs forcées** (Windows) : le bouton « Menu » garde son icône et un contour.
- **Police large** (DejaVu Sans) : à 320 et 481 px, le menu et « Mon voyant » passent ensemble sous le nom, alignés à
  droite ; à 520 px et au-delà, une rangée.
- **Captures de la CI** (police chargée et police de secours) : demande `travaux/captures-ci/demande.json` (essai 4) ;
  menu fermé à 320, 375, 390, 481 et 1366 px, ouvert à 320, 375, 390 et 1366 px, 404 menu ouvert, pied de page.
- **CI** : sur 18053c26 (corrections de la revue), 881 tests sur 882 ; le test du bandeau attendait l'ancien balisage (sans
  le groupe du menu et du bouton) : corrigé (13c32452). Recette des exemples et démonstration du format 2 vertes.
- **CI de la version fusionnée** : celle de la tête de la pull request, après la fusion de `main` (demande n° 39, lot U0) :
  contrôles, FORMAT2-MESURES et Lighthouse, exigés verts par la protection de `main` avant la fusion.

## 3. Revue indépendante
> **Revue indépendante** (agent sans contexte de la rédaction, 21/11, sur 0ce5f585 : diff complet, journaux de la CI,
> rendu local avec les vrais modules, captures ; verdict : **à corriger**, un point bloquant).
> - **Ce qu'elle a changé** :
>   - **B1, bloquant** : FORMAT2-MESURES échouait (164 erreurs, 41 pages) : menu fermé, le contenu replié devenait le bloc
>     conteneur du panneau, large de 34 px. Le panneau d'un menu fermé n'est plus mis en page ; 0 débordement.
>   - **I1** : le panneau ouvert cachait l'élément qui a le focus (WCAG 2.4.11) ; il s'efface quand le focus du clavier
>     passe dans la page ou le pied.
>   - **I2** : sur ordinateur, des thèmes affichés étaient annoncés « réduits » (WCAG 4.1.2), et leurs titres restaient
>     dans l'ordre de tabulation. Le menu porte désormais deux formes du même contenu, l'une ou l'autre affichée : volets
>     au téléphone, colonnes titrées sur ordinateur (dessin inchangé) ; MENU-LISTE et MENU-ACTUELLE contrôlent les deux.
>   - **I3** : en couleurs forcées, le bouton « Menu » disparaissait sous 30 rem ; icône dessinée en `currentColor` et
>     contour visible.
>   - **M1** : liens du pied en bleu clair, comme la maquette validée (le commit 0ce5f585 disait à tort « comme la
>     maquette » en les passant en texte clair).
>   - **M2** : avec une police large, « Mon voyant » passait seul à gauche ; le menu et le bouton forment un groupe aligné
>     à droite.
>   - **M3** : la page affichée n'était signalée que par la couleur ; elle est aussi en gras et soulignée.
>   - **M4** : bandeau mesuré aussi à 481 px, et sur la page du voyant moteur (c'était « à propos »).
>   - **M6** : règles mortes du bandeau sous 22,5 rem retirées ; l'ancre `da-accueil-<thème>` vient d'une seule fonction
>     (`ancreThemeAccueil`, `src/lib/accueil.ts`).
>   - **M7** : #101 (version 4 de la charte) fusionnée avant #102.
>   - **M8** : description de la PR complétée (outil de captures, `CLAUDE.md`) ; captures du menu ouvert à 320 et 390 px.
> - **Écarté** : M5 (poids) : chaque page gagne environ 4 Ko de styles et de menu, Lighthouse reste à 100 ; rien à changer.
> - **Non relu** (ajouté après la revue) : ces corrections.
> - **Reste à vérifier** : un vrai téléphone, Safari iOS et VoiceOver (bogues connus de WebKit sur `summary`), Firefox, de
>   vrais lecteurs d'écran (NVDA, JAWS).
