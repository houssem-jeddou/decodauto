# Demande de changement n° 32 : page panne, l'arbre avant les causes ; précision 2i ramenée à une mesure

**Statut : proposée le 16/11/2026, version 2 (après la revue indépendante, une seule revue : consigne de Houssem du
16/11/2026), à faire accepter par Houssem.** Étape 13 avancée (lot F1, modèles du format 2), avant la porte F1 et la
rédaction des pages de la vague B ; aucune page en ligne ne change (aucune page panne n'est en ligne, et aucune page de
`src/content` n'est au format 2).

## Éléments concernés
- `docs/10_charte_editoriale.md`, §4, point 7 : « pages pannes : symptômes, causes, marche à suivre » ;
- modèle de la page panne au format 2, fusionné avec la PR n° 63 (`src/lib/modeles.ts`, `pagePanneF2` : causes dans
  `avantTexte`) ; commentaire de `src/lib/fiche-panne.ts` (l. 9) ; test de l'ordre de la page et du sommaire
  (`tests/format2-panne.test.ts`, l. 56-72) ; `travaux/etape-13/f1/a-reporter-f1.4.md` (qui reprend « causes avant le
  texte ») ; `CLAUDE.md` (« Modèles de pages » : « causes (page panne, avant le texte : charte §4) ») ;
- précision 2i de la demande n° 30 (§8, validée le 15/11 : une note datée s'ajoute après le §8, sans le réécrire),
  `docs/11` (format de lecture) et la phrase des instructions du projet sur le visuel (texte à coller ci-dessous) ;
- contrôles : FORMAT2-ARBRE-PLACE (à créer) ; FORMAT2-MESURES (à créer, tâche F1.4) ;
- journal.

## Changement proposé
1. **Ordre de la page panne** (toute page panne est au format 2 depuis la PR n° 63) : encadré, signature, ligne de
   transparence, bloc « Notices / Base du coût », illustration, sommaire, fiche « Le symptôme en bref » (ou « La
   situation en bref » sur un tutoriel sans symptôme), fiche « Le tutoriel en bref » sur un tutoriel, **puis le texte
   rédigé jusqu'à la partie qui porte l'arbre de décision (ou les étapes d'un tutoriel), puis les causes, puis la suite
   du texte**, le tableau des notices s'il y en a un, l'emplacement publicitaire de fin de contenu, les pages liées et
   les sources. Aujourd'hui, les causes passent avant tout le texte.
2. **Règle de rédaction contrôlée** (FORMAT2-ARBRE-PLACE) : une partie du texte commence à un titre H2 ; le texte placé
   avant le premier H2 compte comme une partie. L'arbre (ou les étapes) est dans la première ou la deuxième partie ;
   s'il est dans la deuxième, la première est faite d'un seul paragraphe (trois phrases au plus, règle 2e). Cas en échec
   testés : arbre dans la troisième partie ; première partie de deux paragraphes ; tutoriel dont les étapes sont dans la
   troisième partie.
3. **Seuil écrit** : le haut de l'arbre (ou des étapes) est mesuré à 375 × 667, police chargée et police de secours, et
   donné dans le paquet de chaque lot de pages panne. Au-delà de six écrans (4 002 px), la page passe par une décision
   de Houssem sur captures entre les options écartées ci-dessous (lien de l'encadré vers l'arbre ; arbre avant la
   fiche).
4. **Précision 2i, assouplie** : le visuel suit toujours immédiatement le bloc « Notices / Base du coût », sous la ligne
   de transparence : c'est la place la plus haute que permet l'ordre fixé par la charte (§5.1 : la ligne de
   transparence juste après l'encadré et la signature) et la règle 2b (ces informations passent sous l'encadré). La
   condition des trois écrans devient une mesure : le haut du visuel est mesuré à 375 × 667, police chargée et police
   de secours, et donné dans chaque paquet ; s'il dépasse trois écrans (2 001 px), le paquet le dit, avec la raison
   (nombre de lignes de l'encadré). Aujourd'hui, la précision n'excuse un visuel au-delà de trois écrans que si
   l'encadré dépasse à lui seul trois écrans.

## Texte proposé
- `docs/10`, §4, point 7 : « pages pannes (demande de changement n° 32) : fiche « Le symptôme en bref » (ou « La
  situation en bref »), fiche « Le tutoriel en bref » sur un tutoriel, puis le texte rédigé jusqu'à la partie qui porte
  l'arbre de décision ou les étapes, puis les causes, puis la suite du texte. L'arbre, ou les étapes, est dans la
  première ou la deuxième partie du texte ; s'il est dans la deuxième, la première est un seul paragraphe. »
- Note datée ajoutée après le §8 de la demande n° 30, et `docs/11` : « **2i** (assouplie par la demande de changement
  n° 32) : le visuel suit immédiatement le bloc « Notices / Base du coût », sous la ligne de transparence. Le haut du
  visuel est mesuré à 375 × 667, police chargée et police de secours, et donné dans chaque paquet ; au-delà de trois
  écrans, le paquet le signale et dit pourquoi. »
- Instructions du projet, « Règles éditoriales et de sécurité », phrase sur le visuel, à remplacer par : « Chaque page a
  un visuel qui montre où regarder ou quoi faire, juste après le bloc « Notices / Base du coût », sous la ligne de
  transparence ; son haut est mesuré à 375 × 667 et donné dans chaque paquet, avec la raison s'il dépasse trois écrans
  (demande de changement n° 32) : une illustration dessinée pour le site, signalée comme telle, ou une photo réelle
  (fournie par Houssem, ou sous licence libre, créditée et acceptée par lui). Un pictogramme agrandi seul ne suffit
  pas. Jamais une image générée présentée comme une photo. »

## Raison (données)
Mesures de la revue indépendante de la PR n° 63, refaites par la revue de cette demande (16/11, Chromium, 375 × 667,
police Inter du poste ; Markdown rendu par `marked`, pas par Astro ; brouillon de l'exemple antérieur à la version 2,
encadré de cinq lignes). Elles sont à refaire sur le site construit, avec FORMAT2-MESURES (tâche F1.4) :
- **Démonstration panne** : haut de l'arbre à 2 907 px, soit 4,4 écrans ; sommaire à 1 545 px, pastille de l'arbre
  quatrième sur six, deux pastilles visibles.
- **Exemple « voiture ne démarre pas »** (38 868 recherches par mois sur la page) : bas de l'encadré à 1 809 px ; bloc
  « Notices / Base du coût » de 2 003 à 2 327 px ; illustration à 2 340 px ; sommaire à 2 555 px (13 pastilles) ;
  7 causes de 2 993 à 4 591 px ; haut de l'arbre à 4 951 px (4 976 avec la police de secours), soit 7,4 écrans.
- **Avec le changement** (simulation sur la page rendue) : arbre vers 3 320 px (5,0 écrans), 1 631 px plus haut ; causes
  vers 4 817 px (7,2 écrans), juste après la partie de l'arbre. La version 2 de l'exemple a six lignes dans l'encadré :
  compter environ 300 px de plus pour tout ce qui suit l'encadré, l'arbre restant sous le seuil de six écrans.
- **Ce que le lecteur cherche** : sur la page « voiture ne démarre pas », les requêtes qui demandent les causes pèsent
  632 recherches sur 38 868, et 2 528 sur l'ensemble des pages panne de la vague B (`docs/05`, motifs « pourquoi » et
  « cause », estimation). Les autres demandent quoi faire : l'arbre y répond, avec le verdict de l'encadré.
- **Précision 2i** : sur l'exemple, la signature et la ligne de transparence finissent à 1 992 px, et le bloc commence à
  2 003 px. Aucune place sous l'encadré ne met le visuel dans les trois premiers écrans sans couper la ligne de
  transparence du bloc qui la suit. La marge était faible sur la page du voyant moteur (illustration à 1 952 px,
  49 px sous le seuil, captures de F1.2). Pages concernées : l'exemple panne aujourd'hui ; les pages des lots F2 et F3
  et de la vague B seront mesurées dans leurs paquets.

## Ce que le changement repousse vers le bas (charte graphique §6.1)
- Les causes : de 2 993 à environ 4 817 px sur l'exemple (de 4,5 à 7,2 écrans) ; dans le sommaire, la pastille
  « Causes possibles » passe de la deuxième place à la place qui suit celle de l'arbre. Les causes portent la tranche de
  coût de chaque cause (`docs/10`, §4, point 7) : elles restent avant les parties de détail du texte.
- Rien d'autre : l'encadré, le bloc « Notices / Base du coût », l'illustration, le sommaire et la fiche ne bougent pas.

## Autres options écartées
- **Garder l'ordre actuel** : arbre à 7,4 écrans sur l'exemple ; le lecteur pressé lit les causes avant de savoir quoi
  faire.
- **Causes après tout le texte** (version 1 de cette demande) : sur l'exemple, elles descendraient à 8 086 px
  (12,1 écrans), après toutes les parties de détail.
- **Sortir l'arbre du texte et le placer avant la fiche** : l'arbre vit dans le texte (`{{arbre}}`) ; le déplacer
  demande une demande de structure et le coupe de l'introduction qui dit quoi regarder. Rouvert si le seuil de six
  écrans est dépassé.
- **Replier les causes dans des parties dépliables** : cache ce que le lecteur vient chercher ensuite.
- **Ajouter dans l'encadré un lien vers l'arbre** : composant et texte nouveaux dans l'encadré, qui a ses règles propres
  (rien de masqué, empreinte). Rouvert si le seuil de six écrans est dépassé.
- **Pour 2i, raccourcir le bloc « Notices / Base du coût »** : il est généré depuis les sources et porte la
  transparence (notices lues, base du coût). **Placer le visuel avant ce bloc** : la charte (§5.1) et la règle 2b le
  placent sous la ligne de transparence, et le gain serait nul sur l'exemple (11 px).

## Impact sur ce qui est validé
Aucune page en ligne, aucun verdict, aucun texte publié. Change : la charte éditoriale (§4, point 7), la précision 2i
(note après le §8 de la demande n° 30, `docs/11`, instructions du projet), le modèle de la page panne (fusionné avec la
PR n° 63, modifié dans la tâche F1.4), `CLAUDE.md`. La précision 2i assouplie vaut pour toutes les pages au format 2,
y compris les pages en ligne reprises par les lots F2 et F3. L'exemple « voiture ne démarre pas » (version 2) respecte
déjà la règle : l'arbre est dans la deuxième partie, après une première partie d'un seul paragraphe.

## Contrôles à relancer
FORMAT2-ARBRE-PLACE et ses cas en échec ; test de l'ordre de la page panne et du sommaire (causes après la partie de
l'arbre, après celle des étapes sur un tutoriel) ; `npm run schemas`, `npm test`, `npm run build`, `npm run liens` ;
construction de démonstration du format 2 et recette des exemples ; FORMAT2-MESURES (haut de l'arbre, haut du visuel) ;
captures à 375 × 667 et 1366 × 800, police chargée et police de secours, de la page panne avant et après.

## Ce que fait Houssem
Accepter ou non. Après son accord, Claude fait mettre en œuvre le changement dans la tâche F1.4 (Claude Code), avec
captures avant et après, puis met à jour la charte (projet, puis copie `docs/`), la note après le §8 de la demande
n° 30, `CLAUDE.md` et le journal à la porte F1 ; Houssem colle dans les instructions du projet la phrase sur le visuel.

**Ligne de validation proposée** : « J'accepte la demande n° 32 (version 2) : sur la page panne, l'arbre de décision
(ou les étapes) passe avant les causes, dans la première ou la deuxième partie du texte, avec un seuil de six écrans ;
et le visuel suit le bloc « Notices / Base du coût », son haut étant mesuré et donné dans chaque paquet. »
