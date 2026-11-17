# Paquet de validation du lot C3 : page « liquide de frein »

> **Brouillon, jamais validé.** Étape 11 (vague C), lot C3, branche `etape-11/lot-c3` (partie de `etape-11/lot-c2`), sans
> pull request. Aucun verdict ci-dessous n'est validé pour cette page. Revue indépendante : à faire (par le pilotage).

Page : `exemples/fluide/liquide-de-frein.md`, adresse `/liquide-de-frein/` (plan du site, vague C ; page liée : voyant
frein), modèle fluide au format 2.

- **Requête principale** : « liquide de frein » (31 600 recherches par mois), au lieu de « liquide de frein voiture »
  (3 160) : **demande de changement n° 37**, proposée avec le lot (`demande-changement-37.md`).
- **Title** : « Liquide de frein : niveau, quel liquide et quand le changer »
- **H1** : « Liquide de frein : niveau bas, quel liquide mettre et quand le remplacer ? »
- **Description** (elle donne la réponse) : « Niveau sous le mini ou en baisse rapide : faites appel à un spécialiste. Un
  liquide neuf, changé à l'échéance du plan d'entretien, selon cinq notices. »
- **Question de l'encadré** (celle du brief, distincte du H1) : « Puis-je rouler si le niveau de liquide de frein
  baisse, et quand faut-il le changer ? »
- **Réponse directe** (règle 2c, demande n° 33 ; elle répond aux deux parties de la question) : « Si le niveau passe sous
  le repère mini ou baisse vite, ne poursuivez pas votre trajet : selon la notice Seat Ibiza, le circuit n'est peut-être
  plus étanche. Le liquide se change à l'échéance du plan d'entretien. » Sources : ligne 1 de l'encadré ; Peugeot 208
  p. 166, Citroën C3 p. 113 (plan d'entretien du constructeur), Renault Clio 5 p. 336-337 et Dacia Sandero 3 p. 299
  (document d'entretien).
- Changé pendant la recette : une première version posait la question « Niveau de liquide de frein sous le mini ou en
  baisse rapide, voyant de frein allumé : puis-je rouler ? », et la réponse directe parlait aussi du remplacement ; la
  question du brief l'a remplacée (même défaut que sur la page « liquide de refroidissement »).

## 1. Les lignes de l'encadré

**Ligne 1. Au réservoir, le niveau de liquide de frein est sous le repère mini, ou il a nettement baissé en peu de
temps** : **Non, ne poursuivez pas votre trajet** · **À faire tout de suite**. Ligne saisie, quatre notices, trois
groupes, **écart signalé** (décision du pilotage).
- Action : « Ne poursuivez pas votre trajet : le circuit de freinage n'est peut-être plus étanche. Faites appel à un
  spécialiste ou à l'assistance pour un dépannage. »
- Ligne d'écart : « Plus strict : Seat (spécialiste pour un dépannage). Moins stricts : Peugeot, Citroën (usure des
  plaquettes) et Renault (représentant de la marque). »

  | Notice | Page | Extrait | Niveau par la grille |
  |---|---|---|---|
  | Seat Ibiza | p. 299, « Liquide de freins » | « Si le niveau de liquide de frein diminue sensiblement en peu de temps ou descend en dessous du repère [MIN], il se peut que le système de freinage ne soit plus étanche. Faites appel à un spécialiste en mesure de vous dépanner. » | Non, ne poursuivez pas votre trajet · tout de suite (« faites appel », « vous dépanner ») |
  | Peugeot 208 | p. 166, « Liquide de freins » | « Le niveau de ce liquide doit se situer proche du repère "MAXI". Sinon, vérifier l'état d'usure des plaquettes de freins. » | Oui, avec précautions · dans les jours qui viennent (vérification, sans délai) |
  | Citroën C3 | p. 113, même rubrique | même texte | idem |
  | Renault Clio 5 phase 2 | p. 336-337, « Liquide de freins » | « Le niveau baisse normalement en même temps que l'usure des garnitures, mais il ne doit jamais descendre en dessous de la cote d'alerte "MINI". […] En cas de baisse anormale ou répétée du niveau, consultez un Représentant de la marque. » | Oui, avec précautions · dans les jours qui viennent (« consultez », sans délai) |

- **Dacia Sandero 3 n'est pas citée dans la ligne** : le relevé dit « niveau et remplissage comme Renault » sans
  transcrire la phrase « En cas de baisse anormale ou répétée… » pour Dacia ; la page cite Dacia seulement pour la baisse
  normale avec l'usure des garnitures et pour le liquide agréé. À confirmer à l'écran si Houssem veut Dacia dans la
  ligne (même niveau que Renault : l'écart ne changerait pas).
- Seat Ibiza p. 299 remplace Seat Leon p. 370 (relevé de l'étape 8, extraction de texte non relue à l'écran) : même
  consigne, relue à l'écran le 17/11.

**Ligne 2. Voyant de freinage rouge** : **Non, arrêtez-vous immédiatement** · **À faire tout de suite**. Ligne
`frein-rouge` de la base, reprise, validée (page de rattachement : voyant frein, où se trouve son tableau des notices).

Contrôle de la grille : la construction de recette ne donne **aucune alerte R3-NIVEAU-A-VERIFIER** pour cette page.

## 2. Coût probable
- **Plage** (pièces de la page) : de « Entretien ou équipement courant » (`liquide-de-frein`, `plaquettes-et-disques`) à
  « Réparation au garage » (`circuit-de-freinage`).
- **Si vous continuez de rouler** : « Réparation au garage » (tranche `reparation`), sur Seat Ibiza p. 299,
  AVERTISSEMENT : « Si le niveau du liquide de frein est faible, ou si le liquide de frein n'est pas approprié ou ancien,
  le système de freinage pourrait s'avérer défectueux ou la puissance de freinage pourrait être réduite. » Niveau de la
  citation par la grille : dégât grave annoncé si l'on roule, sans arrêt imposé → Non, ne poursuivez pas votre trajet ·
  tout de suite (le même que la ligne 1).
- **Base du coût** : « La dépense va du remplacement du liquide et des plaquettes (entretien) à la réparation du circuit
  de freinage, quand il n'est plus étanche : c'est la cause que donne la notice Seat Ibiza pour un niveau qui baisse
  vite. Les notices Peugeot 208 et Citroën C3 relient un niveau bas à l'usure des plaquettes. »
- Aucun montant en euros. Le dépannage sur autoroute s'affiche de lui-même (ligne 2 à l'arrêt).

## 3. Extraits et faits : relus à l'écran
- **Relu à l'écran par Claude** le 17/11/2026 vers 13 h 30 (pdf.js dans Chrome) : Seat Ibiza p. 299 ; Peugeot 208
  p. 166 ; Citroën C3 p. 113 ; Renault Clio 5 phase 2 p. 336-337 ; Dacia Sandero 3 p. 299. Textes mot pour mot : relevé
  des sources, §12.
- Citroën C3 p. 113 : relevée comme « même texte que Peugeot mot pour mot (DOT4 compris) ».
- **DOT 4** : dit seulement comme Peugeot et Citroën (« DOT4 provenant d'un bidon scellé ») et Seat (VW 501 14, sinon DIN
  ISO 4925 CLASS 4 ou FMVSS 116 DOT 4) le disent ; Renault et Dacia : liquide agréé, bidon scellé, sans norme (décision du
  pilotage).
- **Aucune périodicité chiffrée** : toutes les notices lues renvoient au plan ou au document d'entretien.
- **Non lu** : Toyota Yaris ; la page le dit sous le tableau.
- **Écarté** : contrôle technique (annexe I, 1.1.10 d.2 « niveau sous la marque MIN » : majeure ; d.3 « pas de liquide de
  frein visible » : critique ; 1.8.1 liquide contaminé) : lu seulement par lecture automatique [WF] (relevé, §6), **à
  relire à l'écran sur Légifrance** avant d'être cité ; la page n'en dit rien.
- **Pas de tutoriel de purge** (brief, hors périmètre) : la page dit qui remplace le liquide (Seat : service technique ;
  Renault et Dacia : spécialiste après toute intervention sur le circuit hydraulique).

## 4. Fiche, tableau, texte, illustration
- **Fiche « L'essentiel »** : normes « Un liquide neuf, de la norme que demande la notice de votre voiture, prélevé d'un
  bidon scellé (Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3) ; DOT4 chez Peugeot 208 et Citroën C3 ; chez
  Seat Ibiza, la norme VW 501 14, sinon un liquide conforme à la norme DIN ISO 4925 CLASS 4 ou à la norme américaine
  FMVSS 116 DOT 4 ; chez Renault Clio 5 et Dacia Sandero 3, un liquide agréé par les services techniques de la marque. » ;
  comment vérifier (contact coupé, à plat, entre les repères ; Peugeot et Citroën : proche du maxi ; Renault : souvent et
  à chaque différence de freinage) ; quand changer (plan ou document d'entretien ; après toute intervention sur le circuit
  hydraulique, Renault et Dacia).
- **Tableau** (élément unique, cinq colonnes, en cartes sur téléphone) : liquide, contrôle, niveau bas, remplacement, par
  notice ; Dacia : « Consigne de contrôle fréquent de Renault non relevée » (le relevé dit qu'elle manque chez Dacia).
- **Texte** : appoint (Peugeot : nettoyer le bouchon ; Seat : bidon d'origine fermé, hors de portée des enfants, toxique,
  abîme la peinture) ; liquide ancien et bulles de vapeur (Seat) ; voyant frein (lien vers la page liée).
- **Illustration** `liquide-frein-reservoir`, dessinée pour le site : le réservoir, bouchon fermé, repères MAXI et MINI,
  niveau lu entre les deux ; « Normal : entre MINI et MAXI » (vert) ; « Sous MINI, ou baisse rapide : voir l'encadré »
  (ambre). Le dessin ne donne pas de verdict : il renvoie à l'encadré.

## 5. Recette (construction `AVEC_EXEMPLES=1`, 17/11)
Preuves : `recette/` (communes au lot : `controle.txt`, `liens-recette.txt`, `mesures-format2.txt`, `lighthouse.txt`,
`captures/`, `captures/mesures-captures.json`).
- **Mesures** (`mesures-format2.txt`, 375 × 667, police chargée / de secours) : réponse directe finie à 445 / 445 px ;
  verdict et urgence de la première situation à 579 / 579 (667 au plus) ; première situation entière à 666 ; encadré
  (2 lignes) fini à 1 385 ; illustration à 1 912 px, dans les trois premiers écrans ; page de 7 960 px. À 320 px :
  verdict et urgence à 636 ; aucun débordement.
- **Contrôle** (`controle.txt`) : seules erreurs, attendues, R4-VALIDATION-ABSENTE (pages sans empreinte avant la
  validation) ; aucune alerte R3-NIVEAU-A-VERIFIER pour les pages du lot. Contrôles du lot (`controles-lot.txt`) :
  schémas, 864 tests sur 864, construction, `npm run liens` (1 138 liens, 0 problème), démonstration, indexation
  durable, modes : tous verts. Liens de la construction de recette (`liens-recette.txt`) : 1 251 liens, 0 problème.
- **Lighthouse mobile** (`lighthouse.txt`), emplacements factices : performance 100, accessibilité 100, bonnes pratiques
  100, CLS 0 ; **SEO 66** : seul l'audit « is-crawlable » échoue, parce que la construction de recette est non
  indexable (noindex attendu) ; la construction de production n'a pas ce noindex une fois la page publiée.
- **Captures** (`captures/`) : 320, 375 et 1366 px, police chargée et police de secours (captures de secours
  identiques au pixel près retirées).

## 6. Points à trancher (avec ma recommandation)
1. **Ligne 1 au niveau Seat** (Non, ne poursuivez pas votre trajet), écart signalé (décision du pilotage).
   **Recommandation : valider.**
2. **Dacia hors de la ligne 1** (phrase de baisse anormale non transcrite pour Dacia). **Recommandation : valider ainsi ;
   l'ajouter seulement après relecture à l'écran.**
3. **Contrôle technique non cité** (lecture automatique seulement). **Recommandation : accepter ; le citer après une
   relecture à l'écran de l'annexe I, point 1.1.10, dans une révision de la page.**
4. **Demande de changement n° 37** (requête principale). **Recommandation : accepter** (même demande que la page
   « liquide de refroidissement »).

## 7. Ligne de validation proposée (page « liquide de frein »)
« Je valide la page « liquide de frein » : la question de décision, la réponse directe, les deux lignes (niveau sous le
mini ou en baisse rapide à Non, ne poursuivez pas votre trajet et À faire tout de suite, avec son écart ; voyant de
freinage rouge de la base), le coût, la fiche « L'essentiel », le tableau, l'illustration, les faits du texte, le title,
le H1 et la description. »
