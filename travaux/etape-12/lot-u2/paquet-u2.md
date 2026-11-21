# Lot U2 : outil en variante légère (demande de changement n° 41) et accueil en pastilles — paquet

Étape 12, audit UX/UI (`travaux/etape-12/audit-ux-ui/audit.md`, propositions P2 et P5). Pull request #103, branche
`etape-12/u2-outil-accueil`, empilée sur le lot U1 (#102).

**Validation de Houssem** : le 21/11/2026 à 7 h 11 (« Je valide tout. Et s'il y a un choix, pars avec ta recommandation »),
sur l'audit (§6) et les maquettes envoyées le matin, `P2-outil.png` (variante légère de l'outil) et `P5-accueil.png`. La
demande n° 41 a été écrite ensuite pour appliquer la règle : elle ne lui a pas été relue avant la mise en ligne. Les
textes de l'encadré construit sont ceux de la maquette, mot pour mot (vérifié par la revue indépendante). **Point à
confirmer par Houssem** : l'encadré construit de `/voyants/` (captures du §3), sur lequel l'empreinte de validation a été
posée ; s'il le refuse, la pull request de retour remet l'encadré et l'empreinte d'avant (`8bb25348…`).

## 1. Ce qui change
- **Encadré de la page outil, au format 2** (demande n° 41) : la question, la phrase « Cette ligne est un exemple : la
  couleur ne suffit pas à décider. », une seule ligne d'exemple (voyant moteur orange fixe, verdict de la base inchangé),
  puis la grille des dessins de toutes les couleurs sous « Touchez le dessin qui ressemble à votre voyant : », puis le coût
  « Selon le voyant ». Les lignes ABS et préchauffage restent dans la liste ; le bouton « Trouvez votre voyant dans la
  liste » est retiré (la grille mène aux cartes). Le filtre ne filtre plus que la liste ; une carte visée par une tuile
  s'affiche même si le filtre masque sa couleur.
- **Empreinte de la page outil** : `64132080…` (textes fixes `ENCADRE_OUTIL_FORMAT2` compris) ; date « Mis à jour le »
  avancée au 21/11 (l'encadré change, règle 14 b). Aucun verdict ne change.
- **Accueil** (P5) : chaque carte de thème présente le thème en une phrase sous son titre (`PRESENTATIONS_THEMES`), puis
  ses pages en pastilles de 44 px ; la carte « Un guide indépendant » est inchangée.
- **Contrôles** : OUTIL-INDEX (la grille est dans l'encadré, entre la ligne d'exemple et le coût, sous son titre ; aucune
  dans la section), OUTIL-LIEN (renvoi : la phrase seule), PICTO-COUPURE, et une mesure de FORMAT2-MESURES (libellés de la
  grille tenus dans leur tuile).
- **Documents** : charte graphique (version 6 ; rangées « Page outil », « Accueil » et « Accueil, grille des voyants »),
  `docs/08` (règle 9), `docs/10` (§4), `CONTROLES.md`, `CLAUDE.md`, demande n° 41.

## 2. Corrections après la revue indépendante
- **B1** (CI rouge) : brief de la page outil régénéré par `npm run briefs` (l'encadré n'a plus que la ligne du voyant
  moteur) ; test de l'accueil fait sur toutes les pages du plan (les quatre cartes) ; garde-fou du libellé manquant testé
  là où il agit (`indexFormat2`, `entreesIndexFormat2`) ; test du bandeau du lot U1 corrigé.
- **I1** (libellés hors de leur tuile à 320 et 375 px) :
  - un mot de 9 lettres au moins ne se coupe qu'aux endroits de `COUPURES_LIBELLES` (« Pré-chauf-fage », « Tempé-ra-ture »,
    « désac-tivé », « Direc-tion », « d'entre-tien »), avec un tiret, dans tous les navigateurs (`hyphens: manual`, traits
    d'union conditionnels) ; les libellés ne changent pas ; les contrôles ignorent ces traits invisibles ;
  - trois cases par rangée sous 375 px, quatre au-delà ; une tuile ne s'élargit jamais au-delà de sa case
    (`min-width: 0`) ; marge intérieure de la tuile inchangée (contrôle de F1.4) ;
  - mesure ajoutée à FORMAT2-MESURES : chaque morceau d'un libellé (mot, ou partie jusqu'à une coupure, avec son tiret)
    tient dans sa tuile, à 320, 375 et 1366 px ; PICTO-COUPURE vérifie que chaque mot long a sa coupure.
  - Mesure locale (page outil, 22 tuiles), Inter et DejaVu Sans (la police la plus large, celle de la CI) : aucun
    débordement à 320, 360, 374, 375, 390, 430 et 1366 px ; trois lignes de libellé au plus.
- **I2** (documents qui font foi) : `docs/08` (règle 9) et `docs/10` (§4, points 4 et 7, « Au format 2 ») décrivent
  l'encadré de l'outil au format 2 ; `CLAUDE.md` (index des dessins dans l'encadré, jamais filtré) ; la demande n° 41
  cite ces documents et la précision 2k de la demande n° 30, qu'elle remplace pour la page outil.
- **I3** (traçabilité de l'empreinte) : ce paquet ; point à confirmer par Houssem en tête.
- **Mineurs** : `role="list"` sur les pastilles des thèmes (m2) ; règle CSS morte `.renvoi .bouton-voyant` retirée et
  commentaire « encadré inchangé » de `voyants.md` précisé (m5) ; colonnes des pastilles décrites telles qu'elles sont
  dans la charte (deux dès 360 px environ, une en dessous ; m4).

## 3. Mesures et captures
- **Revue** (avant corrections, run 44880739736) : recette des exemples et démonstration vertes (40 pages, 0 erreur ;
  R4-EMPREINTE, OUTIL-* et R9 passent sur `/voyants/`) ; FORMAT2-MESURES à 375 px : première situation complète à 594 px
  (règle 2a), illustration à 1 825 px ; Lighthouse local de la revue sur `/voyants/` et l'accueil : 100 partout, CLS 0.
- **Captures de la CI** (police chargée et police de secours) : demande `travaux/captures-ci/demande.json` (essai 3) ;
  encadré de l'outil à 320, 375 et 1366 px, premier écran de l'outil, accueil.
- **CI de la version finale** : à compléter (contrôles, FORMAT2-MESURES, Lighthouse).

## 4. Revue indépendante
> **Revue indépendante** (agent sans contexte de la rédaction, 21/11, sur c0448b77 : diff du lot, journaux de la CI,
> rendu local, captures de la CI ; verdict : **à corriger**, un point bloquant).
> - **Ce qu'elle a changé** : B1, I1, I2, I3, m2, m4, m5 (§2).
> - **Écarté** :
>   - m1 (le filtre et la carte visée ne sont vérifiés que par des règles CSS écrites) : le comportement est vérifié dans
>     Chrome par la revue (22 tuiles visibles avec le filtre « Rouge », la carte visée affichée) ; un test de rendu demande
>     un navigateur dans `npm test`, que le projet n'a pas ; gardé pour la recette.
>   - m3 (le coût suit le titre « Voyants rouges » en navigation par titres) : l'ordre est celui de la maquette validée
>     et de la demande n° 41 ; le coût « Selon le voyant » est lu juste après la grille, ce qui reste juste.
>   - m5, `TEXTES_OUTIL` haché au format 2 : retirer ces textes de l'empreinte la changerait encore, sans gain pour le
>     lecteur ; gardé.
> - **Non relu** (ajouté après la revue) : ces corrections.
> - **Reste à vérifier** : un vrai téléphone (iOS, Android), `:has(:target)` dans Safari et Firefox.
