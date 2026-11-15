# Charte graphique de decodauto.com : piste B « Tableau de bord »

**Version 1, 15/11/2026.** Houssem a choisi la piste B le 15/11 à 22 h 57 et validé le format du pilote F1, avec les précisions 2a et 2i (demande de changement n° 30, §8). Ce document est la vue lisible de la charte.

**Ce qui fait foi** : à partir de la mise en œuvre du lot F1, les styles du dépôt (variables et composants de `src/styles/`) ; d'ici là, les règles de la piste B du pilote (`travaux/etape-13/pilote-f1/css/site.css`, sélecteurs `[data-piste="b"]` et base commune). Une variante de composant passe par la charte : ce document et les styles. Jamais de style isolé dans une page.

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

Le logo « Cadran » et le favicon ne changent pas (demande n° 19, règle 14 e).

## 3. Typographie
- **Titres** (nom du site, H1, H2, résumé de « Sources ») : Outfit, en gras. Licence OFL sans nom réservé, licence servie à côté du fichier. Sous-ensemble latin du français, environ 14 Ko en WOFF. Chargement sans décalage (`font-display: optional`) : au premier passage sur réseau lent, la police du système s'affiche, et les règles du premier écran sont vérifiées dans les deux cas.
- **Texte** : police du système (`system-ui`), 16 px, interligne 1,55. Encadré : 15 px, interligne 1,38. Mentions et notes : 13 px.
- **Tailles des titres** : H1 de 1,45 rem sur téléphone et 2,1 rem sur ordinateur ; H1 de l'accueil de 1,85 et 2,5 rem ; H2 de 1,32 rem.
- **Typographie française** : espaces insécables avant « : ; ! ? » et à l'intérieur des guillemets, entre un nombre et son unité, et après « p. » ; séparateur des milliers.

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
| Repère de section | Pastille sombre en tête d'une section liée à l'encadré : forme et libellé du verdict dans la couleur de la gravité. |
| Cartes du corps (encart, causes, fiche, étapes, sources) | Blanches, angles de 16 px, ombre légère ; étapes numérotées dans des pastilles sombres à chiffre ambre. |
| Tableaux | En-tête sombre, texte clair, lignes séparées par un filet, angles de 12 px. Comparaisons en cartes sur téléphone quand le tableau a plus de trois colonnes. |
| Tableau des notices | Colonnes : notice, ce que demande la notice, niveau, page. Badge de niveau sombre à texte lumineux, mention « Consigne retenue ». Extrait mot pour mot dépliable, au libellé unique. Une carte par notice sur téléphone. |
| Pages liées | Pastilles blanches avec la tuile ronde du voyant. |
| Pied de page | Fond nuit, liens bleu clair : « Signaler une erreur », mentions légales. |
| Accueil | Tête nuit (H1, premier paragraphe) ; sur ordinateur, l'illustration du combiné à droite. Juste après, la section « Quel voyant s'est allumé ? » sur fond nuit : grille des pictogrammes de la base, un lien par voyant, tuiles rondes allumées dans des cellules sombres ; elle commence dans le premier écran du téléphone. Puis l'accès par thème et « Un guide indépendant », en cartes. |

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
  - **Précision du 15/11** : quand le bas de l'encadré dépasse à lui seul trois écrans, le visuel suit immédiatement le bloc « Notices / Base du coût ».
- **j.** Aucune question des lecteurs retirée ; part citée d'un tiers au plus.
- **k.** Accueil : grille des pictogrammes et accès par thème. Outil : index des dessins en grille sur téléphone.
- **l.** Mention en tête et ligne de transparence inchangées, contraste AA.
- **m.** Emplacements publicitaires jamais entre le H1 et l'encadré.

## 6. Conception visuelle avant intégration (décision de Houssem du 15/11/2026, 22 h 57)
Chaque page et chaque composant ajoutés sont d'abord pensés pour être visuellement parfaits dans cette charte, avant d'être mis en place :
1. **Place** : où il va dans l'ordre de la page, ce qu'il repousse vers le bas, ce qu'il change au premier écran (règles 2a et 2i).
2. **Dessin** : d'abord avec les composants existants. Un composant nouveau est dessiné dans la charte, sur téléphone et sur ordinateur, avec ses états (sombre, clair, long, court, vide), en maquette ou en capture avant le code.
3. **Vérification visuelle** des captures à 375 × 667 et 1366 × 800, avec la police chargée et la police de secours : alignements, espacements, hiérarchie, débordements, contrastes, et accord avec les pages déjà en ligne.
4. **Revue indépendante** du rendu avec le reste du livrable ; captures présentées à Houssem avec le livrable.
5. **La charte se met à jour d'abord** : un composant ou une variante entre dans ce document et dans les styles, jamais en style isolé.
