# Demande de changement n° 32 : page panne au format 2, texte avant les causes ; précision 2i étendue au bloc « Notices / Base du coût »

**Statut : proposée le 16/11/2026, version 1, à relire par une revue indépendante, puis à faire accepter par Houssem.**
Étape 13 avancée (lot F1, modèles du format 2), avant la porte F1 et la rédaction des pages de la vague B ; aucune page
en ligne ne change (aucune page panne n'est en ligne).

## Éléments concernés
- `docs/10_charte_editoriale.md`, §4, point 7 : « pages pannes : symptômes, causes, marche à suivre » ;
- modèle de la page panne au format 2 (`src/lib/fiche-panne.ts`, `src/lib/format2.ts`, PR n° 63 en cours), et
  `CLAUDE.md` (« Modèles de pages » : « causes (page panne, avant le texte : charte §4) ») ;
- précision 2i de la demande n° 30 (§8, validée le 15/11) et `docs/11` (format de lecture) ;
- contrôles : ordre de la page panne au format 2 (tests), nouveau FORMAT2-ARBRE-PLACE ; FORMAT2-MESURES (tâche F1.4) ;
- journal.

## Changement proposé
1. **Ordre de la page panne au format 2** : encadré, signature, transparence, notices, illustration, sommaire, fiche
   « Le symptôme en bref », puis **le texte rédigé, qui s'ouvre sur l'arbre de décision** (après une introduction d'une
   partie au plus), **puis les causes**, l'historique ou le tableau des notices s'il y en a, les pages liées et les
   sources. Aujourd'hui, les causes passent avant le texte. C'est ce que la demande n° 9 a fait pour les pages voyants
   (texte avant les causes). La page au format tutoriel garde sa fiche « Le tutoriel en bref » et ses étapes dans le
   texte, au même endroit.
2. **Règle de rédaction contrôlée** : sur une page panne, l'arbre de décision est dans la première ou la deuxième partie
   du texte rédigé (contrôle FORMAT2-ARBRE-PLACE, cas en échec testés).
3. **Précision 2i étendue** : « quand le bas du bloc « Notices / Base du coût », qui ferme l'encadré, dépasse trois
   écrans, le visuel le suit immédiatement » (aujourd'hui : « quand le bas de l'encadré dépasse à lui seul trois
   écrans »).

## Texte proposé
- `docs/10`, §4, point 7 : « pages pannes (demande de changement n° 32, format 2) : fiche « Le symptôme en bref », puis
  texte rédigé, qui s'ouvre sur l'arbre de décision (la marche à suivre), puis causes. L'arbre est dans la première ou
  la deuxième partie du texte. »
- Demande n° 30, §8, et `docs/11` : « **2i** : quand le bas du bloc « Notices / Base du coût », qui ferme l'encadré,
  dépasse trois écrans, le visuel le suit immédiatement (précision étendue par la demande de changement n° 32). »

## Raison (données)
Mesures de la revue indépendante de la PR n° 63 (16/11, Chromium, 375 × 667, police Inter ; rendu approché du
Markdown, à refaire sur le site construit par la tâche F1.4) :
- **Démonstration panne** : haut de l'arbre à 2 907 px, soit 4,4 écrans.
- **Exemple réel « voiture ne démarre pas »** (brouillon de la vague B, 38 868 recherches par mois sur la page) : bas de
  l'encadré (5 lignes) à 1 809 px ; les 7 causes occupent 1 605 px (de 2 993 à 4 598 px) avant le texte ; haut de l'arbre
  à 4 958 px, soit 7,4 écrans. Avec le texte avant les causes, l'arbre remonterait vers 3 350 px, environ 1 600 px plus
  haut.
- **Le sommaire ne compense pas** : sur téléphone, il commence à 1 545 px (démonstration) ou 2 555 px (exemple), et seules
  ses deux premières pastilles se voient sans défiler, celles des blocs placés juste dessous (fiche, causes) ; la
  pastille de l'arbre est la quatrième sur six (sur treize dans l'exemple).
- **L'arbre est l'élément unique de la page et sa marche à suivre** : c'est lui qui dit au lecteur dont la voiture ne
  démarre pas quoi regarder, puis quoi faire, avec le verdict de l'encadré. Les causes servent ensuite à comprendre.
- **Précision 2i** : sur l'exemple, le bas de l'encadré est à 1 809 px, sous les trois écrans (2 001 px), donc la
  précision actuelle ne s'applique pas ; mais le bloc « Notices / Base du coût » (324 px) repousse l'illustration à
  2 340 px. Le modèle ne peut pas faire mieux : FORMAT2-ILLUSTRATION exige l'illustration juste après ce bloc, qui ferme
  l'encadré. La marge était déjà faible sur la page du voyant moteur (49 px, captures de F1.2). Le cas reviendra sur
  toute page de quatre ou cinq lignes.

## Autres options écartées
- **Garder l'ordre actuel** : arbre à 7,4 écrans sur l'exemple réel ; le lecteur pressé lit les causes avant de savoir
  quoi faire.
- **Sortir l'arbre du texte et le placer avant la fiche** : l'arbre vit dans le texte (`{{arbre}}`) ; le déplacer
  demande une demande de structure et coupe l'arbre de l'introduction qui dit quoi regarder ; à revoir après mesure si
  l'arbre reste trop bas.
- **Replier les causes dans des parties dépliables** : cache ce que le lecteur vient chercher ensuite.
- **Ajouter dans l'encadré un lien vers l'arbre** : composant et texte nouveaux dans l'encadré ; possible plus tard, si
  la mesure sur le site construit le justifie.
- **Pour 2i, raccourcir le bloc « Notices / Base du coût »** : il est généré depuis les sources et porte la
  transparence (notices lues, base du coût) ; **placer le visuel avant ce bloc** : il couperait l'encadré de ce qui le
  ferme.

## Impact sur ce qui est validé
Aucune page en ligne, aucun verdict, aucun texte publié. Change : la charte §4 (point 7), la précision 2i (demande n° 30,
§8), le modèle de la page panne au format 2 (PR n° 63, non fusionnée), `CLAUDE.md` et `docs/11` à la porte F1. L'exemple
« voiture ne démarre pas » respecte déjà la règle (arbre dans la deuxième partie). Les pages panne de la vague B seront
rédigées avec ce modèle.

## Contrôles à relancer
Tests de l'ordre de la page panne au format 2 et de FORMAT2-ARBRE-PLACE (cas en échec : arbre dans la troisième partie
ou plus loin) ; `npm run schemas`, `npm test`, `npm run build`, `npm run liens` ; construction de démonstration et
recette des exemples ; mesures FORMAT2-MESURES (tâche F1.4) avec la précision 2i étendue ; captures à 375 × 667 et
1366 × 800, police chargée et police de secours, de la page panne avant et après.

## Ce que fait Houssem
Accepter ou non. Après son accord, Claude fait mettre en œuvre le changement dans la PR n° 63 (Claude Code), avec
captures avant et après, et met à jour la charte (projet, puis copie `docs/`) et le journal à la porte F1.

**Ligne de validation proposée** : « J'accepte la demande n° 32 : sur la page panne, le texte, qui s'ouvre sur l'arbre,
passe avant les causes ; et le visuel suit le bloc « Notices / Base du coût » quand ce bloc finit au-delà de trois
écrans. »
