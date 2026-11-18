# Charte graphique de decodauto.com : piste B « Tableau de bord »

**Version 1, 15/11/2026.** Houssem a choisi la piste B le 15/11 à 22 h 57 et validé le format du pilote F1, avec les précisions 2a et 2i (demande de changement n° 30, §8). Ce document est la vue lisible de la charte.

**Version 2, 16/11/2026.** Porte F1 validée par Houssem le 16/11 à 18 h 55 (PR n° 68) : mise en œuvre dans les styles du dépôt, composants ajoutés au §4, focus et typographie (§2, §3), précision 2i assouplie par la demande de changement n° 32 (§5). Textes repris mot pour mot du dossier de la porte (`travaux/etape-13/f1/porte-f1.md`, §6.1).

**Version 3, 18/11/2026.** Deux corrections validées par Houssem le 18/11 à 21 h 43 (étape 12, lot d'améliorations, partie 1, PR n° 92 ; paquet `travaux/etape-12/lot-ameliorations/paquet-charte.md`) : tableaux du texte en cartes sur téléphone à partir de trois colonnes, ou à deux colonnes au-delà de 20 mots dans une cellule ; pastilles du sommaire à angles de 16 px sur ordinateur (§4, « Tableaux », « Sommaire, état long », « Tableaux du texte »).

**Ce qui fait foi** : les styles du dépôt (`src/styles/charte-b.css`, variables et composants), mis en œuvre au lot F1
(porte du 16/11/2026). Une variante de composant passe par la charte : ce document et les styles. Jamais de style isolé
dans une page.

**Ce qu'elle sert** : un site utile et facile à retrouver. Le lecteur reconnaît son voyant tel qu'il le voit sur son tableau de bord, allumé sur fond sombre. La décision se lit d'un coup d'œil. Rien ne ralentit la page.

## 1. Principes
1. **La décision d'abord.** Encadré de décision juste sous le H1 ; sur téléphone, la première situation est lisible dans le premier écran (règles de format, §5).
2. **Le voyant comme dans la voiture.** Les pictogrammes de la base sont « allumés » dans leur couleur réelle, sur des tuiles rondes sombres.
3. **Sombre pour décider, clair pour lire.** La tête de page, l'encadré, les repères et les en-têtes de tableau sont sombres ; le texte rédigé reste sur fond clair.
4. **La gravité n'est jamais dite par la seule couleur** : chaque verdict a sa forme (cercle coché, cercle avec point d'exclamation, triangle, octogone) et son libellé écrit.
5. **Sobriété technique** : une seule police de titre, hébergée sur le site, aucune ressource d'un autre site, aucun décalage de page.

## 2. Couleurs
Tous les contrastes de texte respectent le niveau AA du WCAG : 4,5 pour 1, ou 3 pour 1 en grand texte. Le minimum mesuré dans le pilote est 5,5.

| Rôle | Valeur |
|---|---|
| Nuit : bandeau, tête de page, pied de page, section des voyants de l'accueil | `#0e141b` |
| Panneau : encadré, illustrations, en-têtes de tableau, repères | `#121a24` |
| Cellule : ligne de l'encadré, réponse directe | `#1a2430` |
| Filet sur fond sombre | `#2a3644` |
| Texte sur fond sombre / texte doux sur fond sombre / lien sur fond sombre | `#e9eef4` / `#b8c2cf` / `#8cc4ff` |
| Ambre : partie « auto » du nom, bouton « Trouver mon voyant », coût, balance de l'écart | `#ffb547` |
| Fond de page / surface | `#eef1f5` / `#ffffff` |
| Texte / texte doux / filets | `#121820` / `#4b5563` / `#d5dbe3` |
| Liens sur fond clair | `#0b5cad` (bleu du logo) |
| Gravité sur fond sombre, de 0 à 3 (lumières de l'encadré) | `#6ee7a8`, `#ffd27a`, `#ffab70`, `#ff8a80` |
| Gravité sur fond clair, de 0 à 3 (texte) | `#1e7a3c`, `#8a5a00`, `#b34700`, `#b3261e` |
| Couleur des voyants allumés : orange, rouge, vert, bleu | `#ff9f1a`, `#ff4d4d`, `#3ddc84`, `#4da3ff` |

Contour de focus : 3 px, décalé de 2 px ; bleu des liens (`#0b5cad`) sur fond clair, bleu clair des liens de nuit
(`#8cc4ff`) sur les surfaces sombres (bandeau, tête de page, encadré, pied de page, grille des voyants, groupes de l'outil,
illustration) : au moins 3 pour 1 contre chaque fond (8,6 à 10,1 sur fond sombre ; 5,9 sur le fond de page).

Le logo « Cadran » et le favicon ne changent pas (demande n° 19, règle 14 e).

## 3. Typographie
- **Titres** (nom du site, H1, H2, résumé de « Sources ») : Outfit, en gras. Licence OFL sans nom réservé, licence servie à côté du fichier. Sous-ensemble latin du français, environ 14 Ko en WOFF. Chargement sans décalage (`font-display: optional`) : au premier passage sur réseau lent, la police du système s'affiche, et les règles du premier écran sont vérifiées dans les deux cas.
- **Texte** : police du système (`system-ui`), 16 px, interligne 1,55. Encadré : 15 px, interligne 1,38. Signature,
  ligne de transparence, bloc « Notices / Base du coût », mentions et notes : 13 px, couleur douce (`#4b5563`, 6,7 pour 1
  sur le fond de page).
- **Tailles des titres** : H1 de 1,4 rem sur téléphone et tablette (1,45 au pilote, réduit au lot F2 pour que la première situation tienne dans le premier écran en police de secours, règle 2a) et 2,1 rem sur ordinateur ; H1 de l'accueil de 1,85 et 2,5 rem ; H2 de 1,32 rem.
- **Ce qui ne se coupe jamais en fin de ligne** (lot F2, validé le 16/11/2026) : le lien « Votre marque » passe en entier à la ligne suivante ; « de » et « à » restent avec la pastille du coût probable (classe `.borne`) ; le libellé d'urgence du tableau des notices tient sur une ligne, sans dépasser de sa carte.
- **Typographie française** : espaces insécables avant « : ; ! ? » et à l'intérieur des guillemets, entre un nombre et son unité, et après « p. » devant un numéro (format 2) ; séparateur des milliers.

## 4. Composants

Ordre de la page éditoriale (charte éditoriale §4 et §5.1, puis demande n° 30) :
1. mention en tête ;
2. fil d'Ariane ;
3. H1 ;
4. encadré de décision ;
5. signature ;
6. ligne de transparence ;
7. bloc « Notices / Base du coût » ;
8. illustration ;
9. sommaire ;
10. texte et éléments propres au modèle ;
11. tableau des notices ;
12. emplacement publicitaire ;
13. pages liées ;
14. sources.

| Composant | Rendu |
|---|---|
| Bandeau | Fond nuit, logo Cadran, nom « decod » blanc et « auto » ambre, bouton ambre arrondi « Trouver mon voyant ». |
| Tête de page | Fond nuit : mention en tête (doux sur nuit, 16 px), fil d'Ariane (liens bleu clair), H1 blanc. Marge basse pour que l'encadré chevauche la tête. |
| Encadré de décision | Panneau sombre, angles de 20 px, ombre ; question en texte gras blanc. Une cellule par situation : angles de 14 px, filet lumineux à gauche dans la couleur de la gravité, tuile ronde du voyant allumé, verdict en pastille bordée (forme et libellé), urgence en pastille grise, action. Ligne d'écart sous l'action : balance ambre, « Plus strict… Moins stricts… » en texte doux, lien « Votre marque ». Coût probable sous un filet, avec les tranches en pastilles ambre. Rien n'y est replié. |
| Réponse directe (page informative) | Cellule sombre en tête de l'encadré, en gras, avant la première situation. |
| Notices et base du coût | Sous la ligne de transparence, en 13 px, libellés en gras. |
| Illustration | Carte sombre de 20 px d'angles. Dessin SVG fait pour le site, textes d'au moins 12 px à 375 px de large. Légende claire terminée par « Illustration decodauto. ». Jamais une image générée présentée comme une photo ; une photo réelle seulement si Houssem la fournit ou l'accepte sous licence libre, créditée. |
| Sommaire « Sur cette page » | Pastilles blanches bordées, en ligne qui défile sur téléphone ; colonne de côté collante sur ordinateur (un seul sommaire visible). |
| Repère de section | Pastille sombre en tête d'une section liée à l'encadré : forme et libellé du verdict dans la couleur de la gravité. Un repère seulement sous un H2 qui pose la question d'une seule ligne de l'encadré ; une exception explicite à une autre ligne dans le texte est admise (exemple : FAP avec le voyant moteur) ; une section qui mêle plusieurs cas n'en a pas. |
| Cartes du corps (encart, causes, fiche, étapes, sources) | Blanches, angles de 16 px, ombre légère ; étapes numérotées dans des pastilles sombres à chiffre ambre. |
| Tableaux | En-tête sombre, texte clair, lignes séparées par un filet, angles de 12 px. Sur téléphone, en cartes selon la règle des « Tableaux du texte ». |
| Tableau des notices | Colonnes : notice, ce que demande la notice, niveau, page. Badge de niveau sombre à texte lumineux, mention « Consigne retenue ». Extrait mot pour mot dépliable, au libellé unique. Une carte par notice sur téléphone. « Consigne retenue » dans la cellule « Niveau » ; colonne « Page » courte (« p. 15 »), emplacement entier sous l'extrait. |
| Pages liées | Pastilles blanches avec la tuile ronde du voyant. |
| Pied de page | Fond nuit, liens bleu clair : « Signaler une erreur », mentions légales. |
| Accueil | Tête nuit (H1, premier paragraphe) ; sur ordinateur, l'illustration du combiné à droite. Juste après, la section « Quel voyant s'est allumé ? » sur fond nuit : grille des pictogrammes de la base, un lien par voyant, tuiles rondes allumées dans des cellules sombres ; elle commence dans le premier écran du téléphone. Puis l'accès par thème et « Un guide indépendant », en cartes ; « Un guide indépendant » sous les thèmes, sur toute la largeur de la grille (validé par Houssem le 17/11/2026, lot C1). |
| Sommaire, état long | Ordinateur : colonne collante à la hauteur de l'écran, défilement propre, ombres de défilement, pastilles à angles de 16 px (une pastille de deux ou trois lignes garde ses angles hors du texte). Téléphone : pastilles de 13,5 rem au plus (une pastille et demie visible à 375 px), deux lignes puis points de suspension, hauteur égale, accroche, fondu à droite. Pages du socle : dès deux titres. |
| Accueil, grille des voyants | Un dessin par pictogramme de la base (18), libellé de `LIBELLES_PICTOGRAMMES` en 12 px (13 px sur ordinateur), marge intérieure de la tuile, coupure d'un mot de 10 lettres au moins avec un tiret ; cartes de thème aux liens espacés (cibles de 24 px). |
| Emplacement publicitaire | 340 px réservés. |
| Page outil | Renvoi de l'encadré en bouton ambre, sans icône ; coût « Selon le voyant » en pastille ambre ; filtre par couleur en pastilles (cochée : panneau sombre, diode de la couleur) ; index des dessins en une grille par couleur, une tuile par paire (pictogramme, couleur) avec son nombre de cas ; un panneau sombre par groupe de couleur, titre avec une diode ; une carte par ligne de la base (la cellule de l'encadré), rangées par paire, la plus grave d'abord ; pas de bouton « Trouver mon voyant » dans le bandeau de la page outil. |
| Arbre de décision | Carte claire ; question numérotée par une pastille sombre au chiffre ambre ; réponses en liste ; un verdict cité est une pastille (forme, libellé de la grille, liseré de sa couleur) qui termine sa réponse, seule sur sa ligne ; sur deux lignes sous 360 px. |
| Fiches (« Le symptôme en bref », « Le tutoriel en bref », fiche du code, « Le texte en bref », mentions légales) | Carte, intitulé en gras au-dessus de sa valeur, rangées séparées d'un filet de 1 px ; code en chasse fixe, pastille sombre au texte ambre. |
| Causes | Cartes ; sur la page panne, avant le texte. |
| Historique du dossier | Carte, une entrée par rangée séparée d'un filet, date en gras, du plus récent au plus ancien. |
| Tableaux du texte | Bloc de la charte. Sur téléphone, en cartes à partir de trois colonnes, ou à deux colonnes quand une cellule porte plus de 20 mots : la première cellule de la rangée est le titre de la carte, l'intitulé de la colonne précède chaque autre valeur, une cellule vide n'affiche rien, rôles du tableau écrits. Sur ordinateur, la première cellule de chaque rangée en gras (en-tête de rangée). Cas décrits par marque : une seule carte, un cas par rangée, un filet entre deux cas, la marque en tête. Sous 360 px, une cellule coupe un mot trop long ; dans une carte, sans césure. |
| Étapes d'un tutoriel | Cartes numérotées, sans retrait de liste. |
| Listes sans puces (questions de l'arbre, étapes, historique) | `role="list"`, comme l'encadré. |
| Rangée « dépannage sur autoroute » | Rangée du coût de l'encadré : cellule sombre, objet du montant en gras, texte validé inchangé ; sans triangle (forme réservée aux verdicts). |
| Ligne d'écart | Lien « Votre marque » vers la partie du voyant au tableau des notices : sur la page, ou sur la page du voyant que le plan lie à la page ; page outil : vers la page du voyant quand elle est construite, jamais sur la ligne STOP. Ligne saisie (PR #73, 17/11/2026) : vers la phrase de ses notices, dans le bloc « Notices » sous l'encadré ; la phrase ciblée garde une marge de défilement, passe en couleur pleine et affiche dessous « Selon les marques : » puis l'écart entre marques en entier (« Ligne n, selon les marques : » quand plusieurs lignes partagent la phrase). |
| Page du socle et 404 | Tête de page nuit sans encadré, même écart entre la mention et le H1 que les pages éditoriales ; fiche de l'auteur et « Méthode » en cartes ; 404 : phrase, un seul bouton « Trouver mon voyant » (aucun dans le bandeau), lien vers l'accueil, pied de page en bas de l'écran. |
| Bandeau sous 360 px | Le dessin du bouton « Trouver mon voyant » s'efface, son texte reste ; nom du site et marges resserrés (aucun défilement horizontal à 320 px). |
| Bandeau sur deux lignes (police large) | Quand le nom du site et le bouton ne tiennent pas sur une ligne (police du système large, comme DejaVu Sans, avec la police de secours), le bouton « Trouver mon voyant » passe sous le nom, aligné à droite ; le bandeau prend environ 38 px de plus ; jamais de débordement horizontal. Captures : `travaux/etape-13/f1/captures/bandeau-police-large/`. |

## 5. Règles de format (demande n° 30, §4, point 2, et §8)
- **a.** Sur téléphone (375 × 667 visibles), la première situation est complète dans le premier écran : situation, verdict, urgence, action. Marge visée : 640 px.
  - **Précision du 15/11** : sur une page informative, la réponse directe est complète dans le premier écran, et la première situation y commence avec son verdict et son urgence ; son action peut continuer au-delà.
- **b.** Ligne d'écart de 25 mots au plus, lien compris, qui nomme les marques plus et moins strictes et renvoie au tableau. Nombre de notices et base du coût sous l'encadré.
- **c.** Page informative : l'encadré commence par la réponse directe.
- **d.** Repère du verdict en tête des sections liées à l'encadré. La formule « Verdict retenu en haut de page », les éditions et les références sortent du texte.
- **e.** Paragraphes de trois phrases au plus, étapes numérotées, comparaisons en tableau.
- **f.** Tableau des notices compact, extraits dépliables au libellé unique.
- **g.** « Sources » repliée, avec leur nombre.
- **h.** Sommaire au-delà de six écrans.
- **i.** Un visuel qui montre où regarder ou quoi faire, après l'encadré, dans les trois premiers écrans.
  - **2i** (assouplie par la demande de changement n° 32) : le visuel suit immédiatement le bloc « Notices / Base du coût »,
    sous la ligne de transparence. Le haut du visuel est mesuré à 375 × 667, police chargée et police de secours, et donné
    dans chaque paquet ; au-delà de trois écrans, le paquet le signale et dit pourquoi.
- **j.** Aucune question des lecteurs retirée ; part citée d'un tiers au plus.
- **k.** Accueil : grille des pictogrammes et accès par thème. Outil : index des dessins en grille sur téléphone.
- **l.** Mention en tête et ligne de transparence inchangées, contraste AA.
- **m.** Emplacements publicitaires jamais entre le H1 et l'encadré.

Ces règles sont vérifiées par les contrôles du dépôt (FORMAT2-*, R9-*, TABLEAU-NOTICES-*, CITATIONS-PART ; catalogue :
`CONTROLES.md`) ; les hauteurs (2a, 2h, 2i) et le débordement à 320, 375 et 1366 px sont mesurés dans un navigateur
(FORMAT2-MESURES), police chargée et police de secours.

## 6. Conception visuelle avant intégration (décision de Houssem du 15/11/2026, 22 h 57)
Chaque page et chaque composant ajoutés sont d'abord pensés pour être visuellement parfaits dans cette charte, avant d'être mis en place :
1. **Place** : où il va dans l'ordre de la page, ce qu'il repousse vers le bas, ce qu'il change au premier écran (règles 2a et 2i).
2. **Dessin** : d'abord avec les composants existants. Un composant nouveau est dessiné dans la charte, sur téléphone et sur ordinateur, avec ses états (sombre, clair, long, court, vide), en maquette ou en capture avant le code.
3. **Vérification visuelle** des captures à 375 × 667 et 1366 × 800, avec la police chargée et la police de secours : alignements, espacements, hiérarchie, débordements, contrastes, et accord avec les pages déjà en ligne.
4. **Revue indépendante** du rendu avec le reste du livrable ; captures présentées à Houssem avec le livrable.
5. **La charte se met à jour d'abord** : un composant ou une variante entre dans ce document et dans les styles, jamais en style isolé.
