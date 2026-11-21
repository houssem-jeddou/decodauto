# Demande de changement n° 41 : grille des dessins dans l'encadré de l'outil voyants (proposition P2 de l'audit UX/UI)

Écrite par Claude le 21/11/2026, étape 12, lot U2 de l'audit UX/UI (`audit.md`, P2, variante légère ; maquettes
`maquettes/m2-leger-*`). **Statut : acceptée d'avance par Houssem le 21/11/2026 (7 h 11)** : il a retenu U2 (« outil en
variante légère, accueil en pastilles ») sur la maquette envoyée le matin (`P2-outil.png`) et demandé de partir des
recommandations (audit, §6) ; ce texte, écrit ensuite pour appliquer la règle, ne lui a pas été relu avant la mise en ligne.
Format de `docs/03` : élément concerné, changement proposé, raison (données), impact sur ce qui est validé, contrôles à
relancer.

## 1. Éléments concernés (validés ou figés)
- **Encadré de la page outil** (`src/content/voyant/voyants.md`, validé le 04/11 puis le 14/11, empreinte `8bb25348…`) :
  - trois lignes d'exemple reprises de la base : voyant moteur orange fixe, ABS, préchauffage ;
  - renvoi vers la liste, texte et bouton (demande de changement n° 12) ;
  - coût « Selon le voyant ».
- **Textes fixes de l'outil** (`src/lib/outil-textes.ts`, `TEXTES_OUTIL`), qui entrent dans l'empreinte de la page.
- **Index des dessins** (décision 9 du paquet 8.1 ; format 2 : une grille par couleur, entre le filtre et la liste),
  contrôle OUTIL-INDEX ; renvoi de l'encadré, contrôle OUTIL-LIEN.
- **Encadré** : règle 2a (première situation dans le premier écran du téléphone), R9-ENCADRE-CONTENU, R9-ENCADRE-MASQUE
  (rien de masqué dans l'encadré).
- **Charte graphique** : rangée « Page outil » (`docs/11`).
- **CLAUDE.md** : ordre de la page outil.

## 2. Raison (données)
- Audit, C2 : au téléphone, la grille des dessins, cœur de la page, commence à 2 421 px (3,6 écrans). Avant elle :
  l'encadré (trois exemples et un bouton, 1 244 px), la provenance, l'illustration, le sommaire et le filtre.
- La page vise « voyant orange voiture » (142 516 recherches par mois, `docs/09`) : le visiteur cherche son voyant ; sur
  l'accueil, la même grille est dans le premier écran.
- Maquette appliquée à la construction réelle (`mesures-maquettes.txt`) :
  - grille de 2 421 à 760 px au téléphone (1,1 écran), de 1 701 à 490 px sur ordinateur (premier écran) ;
  - ligne d'exemple complète à 594 px à 375 px, au lieu de 635 ;
  - page plus courte de 705 px au téléphone et de 438 px sur ordinateur ; illustration plus bas de 87 px au téléphone.

## 3. Changement
**Encadré de l'outil (format 2)**, dans cet ordre :
1. la question, inchangée ;
2. la phrase « Cette ligne est un exemple : la couleur ne suffit pas à décider. » ;
3. une seule ligne d'exemple, reprise de la base : le voyant moteur orange fixe (« Non, arrêtez-vous immédiatement »),
   l'exemple le plus utile pour « voyant orange voiture » ;
4. la grille des dessins, sous le titre « Touchez le dessin qui ressemble à votre voyant : » : le composant d'aujourd'hui
   (une grille par couleur, une tuile par paire pictogramme et couleur avec son nombre de cas, chaque tuile menant à sa
   carte dans la liste) ;
5. le coût « Selon le voyant », inchangé.

**Ce qui sort de l'encadré** :
- les lignes ABS et préchauffage : elles restent dans la liste, comme toutes les lignes de la base ;
- le bouton « Trouvez votre voyant dans la liste » (demande n° 12) : la grille mène aux cartes.

**Section de l'outil** : titre, filtre, introduction, groupes de couleur. Le filtre ne filtre plus que la liste ; la grille
de l'encadré montre toujours toutes les couleurs (rien de masqué dans l'encadré).

**Textes** (`src/lib/outil-textes.ts`) : `ENCADRE_OUTIL_FORMAT2` (la phrase d'exemple et le titre de la grille) entre dans
l'empreinte de la page outil au format 2 (`TEXTES_OUTIL_FORMAT2`, `src/lib/empreinte.ts`). Le format 1, gardé pour les
tests, ne change pas, ni ses empreintes.

## 4. Impact sur ce qui est validé
- **Empreinte de la page outil** : elle change (deux lignes retirées, textes fixes). Elle est posée après la validation de
  Houssem, donnée sur la maquette (§ statut) ; les captures du lot lui sont présentées.
- **Aucun verdict ne change** : la ligne gardée est celle de la base, inchangée ; les lignes retirées restent dans la liste.
- **Règle 2a** : tenue (594 px sur la maquette ; mesurée par FORMAT2-MESURES).
- **Règle 2k** (accueil et outil en grille de pictogrammes) : mieux servie.
- **Title, H1, adresse, texte rédigé** : inchangés. Date « Mis à jour le » : avancée (l'encadré change, règle 14 b).
- **Contrôles adaptés** (format 2) : OUTIL-INDEX (la grille est dans l'encadré, après la ligne d'exemple et avant le coût,
  sous son titre ; aucune dans la section) et OUTIL-LIEN (renvoi : la phrase seule, sans bouton).
- **Documents** : charte graphique (rangée « Page outil »), `CONTROLES.md`, `CLAUDE.md`.

## 5. Contrôles à relancer
- `npm run schemas`, `npm test`, `npm run build` (contrôle), `npm run liens` ; recette des exemples ; Lighthouse (page
  outil) ; FORMAT2-MESURES (règle 2a).
- Captures à 375 × 667 et 1366 × 800, police chargée et police de secours : premier écran de l'outil, encadré complet.
