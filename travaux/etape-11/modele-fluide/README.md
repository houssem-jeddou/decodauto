# Étape 11, piste technique : modèle de la page fluide au format 2

Partie technique des modèles de l'étape 11 (docs/03, règle 12, première exception, demande de changement n° 21),
branche `etape-11/modele-fluide` depuis `main` à 97be2f3. Rien de publié : la production est identique à `main`
(`production-diff.txt`).

## Ce que fait le modèle

`pageFluideF2` (`src/lib/modeles.ts`), choisi par `modeleDeLaPage` pour une page fluide au format 2. Ordre de la page
(charte graphique §4) :

1. mention en tête, fil d'Ariane, H1 ;
2. encadré de décision, qui commence par la **réponse directe** (page informative), puis signature, ligne de transparence,
   bloc « Notices / Base du coût » ;
3. illustration, sommaire ;
4. sur un tutoriel : fiche « Le tutoriel en bref », puis la partie du texte qui porte les étapes (`{{etapes}}`), puis la
   **fiche « L'essentiel »**, puis la suite du texte. Sans tutoriel : fiche « L'essentiel », puis le texte ;
5. dans le texte, le tableau (`{{tableau}}`, l'élément unique du type) ;
6. tableau des notices, si un voyant de la base est rattaché à la page ;
7. pages liées, sources.

**Place de la fiche « L'essentiel » (revue de la PR n° 79, I2, décision du pilotage, règle 6).** Sur un tutoriel, elle
suit la partie du texte qui porte les étapes, comme les cartes de causes de la page panne suivent la partie qui porte
l'arbre (demande de changement n° 32 : `insererApresPartieArbre`, deux blocs `data-corps` de part et d'autre). La fiche du
tutoriel reste avant le texte. Effet mesuré sur la démonstration (375 px, police chargée / de secours) : les étapes passent
de 3 943 / 3 968 à **3 311 / 3 335** ; à 320 px, de 4 406 à **3 704**.

**Ce que la fiche couvre (revue, M6).** Elle affiche les trois champs du type fluide, et rien d'autre : normes et
spécifications (`normes`), comment vérifier (`comment_verifier`), quand changer (`quand_changer.texte`, ses sources dans
« Sources »). La charte éditoriale §4 demande pour un fluide « rôle, niveau, appoint, marche à suivre » : le schéma n'a
pas de champ pour le rôle ni pour l'appoint, qui restent dans le texte rédigé. Titre : « L'essentiel » (revue, M5).

Choix faits (règle 6) :

- **Composants existants seulement.** La fiche « L'essentiel » (`src/lib/fiche-fluide.ts`) est le composant « Fiches »
  de la charte (carte, intitulé en gras au-dessus de sa valeur, rangées séparées d'un filet). Même balisage que « Le
  symptôme en bref » et « Le texte en bref » : aucun style nouveau. Il restera à l'ajouter au nom des fiches de
  `docs/11` §4 après validation.
- **Format 2 seul.** Une page fluide au format 1 est refusée à la construction (`refusFormat1`, ancien
  `refusFormatVagueB`, renommé à la revue, M1 : il couvre aussi la vague C). Le type fluide n'a pas de modèle au format 1 ;
  les pages de test (`tests/fixtures`) restent au format 1, et la fiche n'y est pas attendue.
- Pas de causes : le schéma n'en a pas, et aucun champ nouveau n'est ajouté.

### Réponse directe des pages fluides : demande de changement n° 33, acceptée

Le schéma la réservait aux pages pneus et obligations. Cette pull request l'ouvre au type fluide : `fluidePageSchema`
l'admet, 40 mots au plus ; les autres types la refusent toujours ; `pageFluideF2` l'exige, comme le modèle l'exige pour la
page de la pression des pneus. Même rendu et mêmes contrôles : FORMAT2-REPONSE, et FORMAT2-MESURES 2a, qui mesure la
réponse directe puis le verdict et l'urgence de la première situation.

C'est une demande de structure (revue de la PR, B1 : dossier de la porte F1, `travaux/etape-13/f1/porte-f1.md`,
l. 188-190 ; `docs/08`, l. 49). **Demande de changement n° 33, acceptée par Houssem le 17/11/2026 à 7 h 39** (« J'accepte
la demande n° 33 (réponse directe des pages fluides). », dans le message du matin auquel Houssem a répondu « Je valide
tout ! Fais le necessaire »). Texte de la demande : `travaux/etape-11/demande-changement-reponse-fluide.md` (branche
`preparation/etape-11`). `docs/08` l. 49 est mis à jour dans cette pull request (« pages pneus et obligations et pages
fluides »), ainsi que les commentaires du schéma, de `CONTROLES.md` et de la page de démonstration.

Contrôle nouveau : **FICHE-FLUIDE-ABSENTE / FICHE-FLUIDE-INCOMPLETE** (`src/lib/controle.ts`, `CONTROLES.md`). Une page
fluide au format 2 affiche une seule fiche, au texte exact ; les autres pages n'en ont pas. Les marqueurs `{{etapes}}` et
`{{tableau}}` sont admis sur une page fluide ; FICHE-TUTORIEL-*, R7-TUTORIEL-ETAPES et R7-ELEMENT-UNIQUE-ABSENT
s'appliquent comme ailleurs.

## Page de démonstration

`tests/demo/format2/fluide/niveau-huile.md` vient de l'exemple de la préparation (`preparation/etape-11`,
`exemples/fluide/niveau-huile.md`, 4e6851f), brouillon jamais validé. Son en-tête le dit en premier (revue, M3) et donne
la provenance des lignes :

- lignes 1 et 2 de l'encadré (niveau sous le mini, au-dessus du maxi) : reprises mot pour mot des lignes 3 et 4 saisies du
  dossier « moteur PureTech » (comparaison faite : identiques), dont les extraits ont été relus le 16/11 et que Houssem a
  validées avec les exemples de la porte 10 (16/11, 19 h 26). Elles ne sont pas validées pour cette page ;
- lignes 3 et 4 : lignes `huile-niveau` et `huile-pression-rouge` de la base voyants ;
- tout le reste : brouillon de l'exemple.

Trois changements par rapport à l'exemple : le commentaire d'en-tête ; la réponse directe, celle que l'exemple propose en
commentaire (31 mots selon le décompte du schéma ; l'exemple en annonçait 29) ; le lien vers la page mère « huile moteur »,
écrit en texte. Cette page n'est pas construite, donc le lien était cassé (`npm run liens` : LIEN-CASSE). **Le contrôle de
la construction ne le signale pas** : un lien du texte vers une page du plan, liée mais pas encore construite, passe.

La page ne passe que par la construction de démonstration (`npm run demo:format2`), jamais par `exemples/` ni par
`src/content`. Elle est ajoutée à `lighthouserc-demo-format2.json`.

### Points de l'exemple à reprendre avec sa rédaction (revue, M4 ; rien n'est changé ici)

L'exemple est un brouillon de la préparation anticipée : ces points se corrigent dans sa rédaction, pas dans le modèle.

1. **« Oui : Non, arrêtez-vous immédiatement. »** La section « Voyant d'huile rouge : faut-il s'arrêter ? » écrit
   « Oui : {{verdict:huile-pression-rouge}}. », et le verdict rendu commence par « Non » (libellé de la grille : peut-on
   rouler ?). À réécrire sans « Oui : » (« {{verdict:huile-pression-rouge}}. Ce voyant signale… »).
2. **Normes sans norme.** `normes` donne deux consignes (« une huile qui correspond à la motorisation et conforme au plan
   d'entretien », « jamais d'additif »), aucune spécification (viscosité, norme ACEA ou constructeur). L'intitulé
   « Normes et spécifications » promet plus que le contenu : soit l'exemple cite une spécification sourcée par notice, soit
   l'intitulé se discute avec le schéma (point 2 ci-dessous).
3. **Outils joints dans la fiche du tutoriel.** Les deux outils (jauge ou indicateur ; huile pour l'appoint) s'affichent
   joints par « ; » dans une seule valeur, comme sur toute page au format tutoriel (`modeleFicheTutoriel`, composant validé
   à la porte F1). Une liste serait une variante du composant « Fiches », à dessiner d'abord (charte §6).
4. Le lien vers « huile moteur » (ci-dessus) : à écrire en texte dans l'exemple, ou publier « huile moteur » avant ou avec
   cette page.

## Point à part : tableaux du texte « en cartes quand une colonne porte un texte long » (revue, I1 ; rien n'est corrigé)

La charte graphique (§4, « Tableaux du texte », `docs/11` l. 95) demande, sur téléphone, des cartes « quand une colonne
porte un texte long, ou au-delà de trois colonnes ». Le code (`tableauxDuTexteFormat2`, `src/lib/format2.ts` l. 799)
n'applique que la seconde condition : un tableau de trois colonnes ou moins reste en grille, quelle que soit la longueur
de ses cellules. La charte ne chiffre pas « texte long » : il faudra un seuil (en mots par cellule) pour le contrôler.

Pages concernées, relevé sur les constructions (`[data-corps] table`, mots de la plus longue cellule de chaque colonne) :

| Page | En ligne | Format en ligne | Colonnes | Plus longue cellule | Rendu au format 2 aujourd'hui | Avec la règle de la charte |
|---|---|---|---|---|---|---|
| Moteur PureTech (`/moteur-puretech/`) | oui | 2 | 6 | 23 mots | cartes | inchangé |
| Pression des pneus (`/pression-des-pneus/`) | oui | 1 (format 2 au lot F3, #77) | 4 | 38 mots | cartes (F3) | inchangé |
| Loi montagne (`/loi-montagne/`) | oui | 1 (format 2 au lot F3, #77) | 3 | 18 mots (« Ce qu'il faut savoir ») | grille (F3) | **change** : cartes, si 18 mots sont un texte long |
| Niveau d'huile (démonstration, vague C) | non | – | 3 | 35 mots | grille | **change** : cartes |
| Nettoyer le FAP (lot B4, pas en ligne) | non | – | 3 | 13 mots | grille | selon le seuil |
| Changer la batterie, recharger la batterie (lot B2, pas en ligne) | non | – | 5 et 4 | 16 et 17 mots | cartes | inchangé |

Parmi les pages en ligne, seule **la loi montagne** changerait, et seulement une fois passée au format 2 (lot F3) : au
format 1, ses tableaux ne passent pas par `tableauxDuTexteFormat2`. Les cas décrits par marque des pages code défaut sont
un autre composant (une seule carte), hors de cette règle.

## Preuves

| Preuve | Résultat |
|---|---|
| `npm run schemas`, `npm test` | 0 erreur ; 864 tests sur 864, dont `tests/format2-fluide.test.ts` (8) |
| `npm run build`, recette des exemples, `npm run liens` | voir la description de la pull request (sorties de la tête) |
| `npm run demo:format2` | 26 pages, 0 erreur (empreinte absente de la page de démonstration, attendue) ; liens : 842, 0 problème |
| Production comparée à `main` (`production-diff.txt`, revue, M7) | `SITE_INDEXABLE=true npx astro build` des deux côtés (`main` 97be2f3), puis `diff -rq` : **identique** |
| FORMAT2-MESURES (`mesures-format2.txt`) | 25 pages, 150 mesures, **0 erreur**. Page fluide à 375 × 667 (police chargée / de secours) : réponse directe jusqu'à 424 / 448 ; verdict et urgence de la première situation jusqu'à 538 / 563 (667 au plus, précision 2a), son action jusqu'à 646 / 671 ; bas de l'encadré 1 743 / 1 767 (4 lignes) ; **illustration 2 226 / 2 251, au-delà de trois écrans** (2 001), signalée : encadré de 4 lignes, puis bloc « Notices » ; étapes 3 311 / 3 335 (six écrans : 4 002) ; page 9 460 / 9 485. À 320 × 640 (les deux polices) : réponse 470, verdict et urgence 601, première situation 729, illustration 2 579, étapes 3 704, page 10 344 / 10 395, 320 de large, aucun débordement. À 1366 : réponse 315, verdict et urgence 383, première situation 428, illustration 1 316, étapes 2 269 |
| Lighthouse mobile (`lighthouse.txt`) | 3 passages, médianes : 100 / 100 / 100, CLS 0, LCP 907 ms (SEO 66 : construction en noindex) |
| Captures (`captures/`, 49 PNG ; `mesures-captures.json`) | 320 × 640, 375 × 667 et 1366 × 800, police chargée et de secours : premier écran, page entière, encadré, bloc « Notices », illustration, sommaire, fiche « L'essentiel », fiche du tutoriel, étapes, tableau. Une capture en police de secours identique octet pour octet à celle en police chargée n'est pas gardée |

## Ce qui manque au schéma `fluidePageSchema` pour ce modèle (non changé, sauf la réponse directe)

1. ~~`reponse_directe`~~ : ouverte au type fluide dans cette pull request (demande n° 33, acceptée le 17/11/2026).
2. **Sources de `comment_verifier` et de `normes`** : seul `quand_changer` a ses `sources`. Les deux autres champs
   écrivent leurs notices dans le texte (« (notices Peugeot 208 et Citroën C3) »). Ces sources n'entrent donc ni dans
   « Sources » ni dans un contrôle, et le texte de la fiche porte des références que la règle 2d sort du texte ailleurs.
   Proposition : `comment_verifier: { texte, sources }` et `normes: [{ texte, sources }]`, comme `quand_changer`.
3. **`normes` en liste de textes** : la fiche les joint par « ; », ce qui donne « … C3) ; Jamais d'additif… »
   (majuscule après un point-virgule). Une liste dans la fiche serait une variante du composant, à dessiner d'abord
   (charte §6).
4. **Rôle et appoint** (charte éditoriale §4) : pas de champ ; ils restent dans le texte (M6, ci-dessus).
5. **`causes`** (pas demandé, aucun champ ajouté) : les questions « pourquoi ma voiture consomme de l'huile / du liquide »
   sont traitées dans le texte, sans cartes de causes. Le coût se calcule par `cout_probable.pieces`.
