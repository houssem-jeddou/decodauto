# Revue indépendante de la PR n° 73 : ligne d'écart d'une ligne saisie (FORMAT2-ECART)

Branche `etape-13/ecart-lignes-saisies`, tête `10e73ab`, comparée à `origin/main` (`git diff origin/main...HEAD`, 17 fichiers, 2 commits). Clone : `/home/claude/revue-73-clone`.

## Verdict : acceptable

Rien de bloquant. Le rendu et le contrôle appliquent la décision, et la production ne change pas. Deux constats importants :
- un défaut de style dans le cas de l'ancre partagée, à corriger dans cette PR ;
- une limite d'utilité qui vient de la décision elle-même, à soumettre à Houssem.

Les constats mineurs portent sur la solidité du contrôle et sur les messages.

---

## Constats

### Bloquant
Aucun.

### Important

**I1. L'ancre partagée n'a ni la marge de défilement ni le repère de couleur.** C'est le cas où deux lignes saisies à écart ont la même phrase.
- *Preuve, rendu* : `src/lib/format2.ts:347`. La seconde ligne reçoit une ancre vide sans classe : `<span id="da-notices-ligne-3"></span>`. Elle est placée dans le `<span class="provenance-ligne" id="da-notices-ligne-2">`.
- *Preuve, style* : `src/styles/charte-b.css:90-91`. Les deux règles visent seulement l'élément de classe `.provenance-ligne`.
  - Quand la cible est l'ancre vide, `.provenance-ligne:target` ne s'applique pas, et `scroll-margin-top:4rem` non plus : la cible n'a aucune marge.
  - Le clic sur « Votre marque » de la ligne 3 redonne donc exactement le défaut que le second commit voulait corriger : la phrase arrive collée en haut de l'écran, sans repère (description de la PR, § « Charte B »).
- *Preuve, tests et captures* :
  - ce cas n'est testé qu'au niveau de la fonction (`tests/ecart-lignes-saisies.test.ts`, test 2). Aucune page ne le construit, aucun test de style ne le couvre ;
  - les captures ne montrent que la ligne 4 de `batterie-voiture`. L'état « ancre partagée » n'est pas dessiné, alors que la règle 7 demande les états d'un composant.
- *Correction proposée*, dans la charte et dans les styles :
  - `.provenance-ligne,.provenance-ligne>[id]{scroll-margin-top:4rem}` ;
  - `.provenance-ligne:target,.provenance-ligne:has(>:target){color:var(--texte)}`. La feuille utilise déjà `:has()` pour le filtre de l'outil ;
  - un test de style et une capture pour ce cas.
- *Gravité* : aucune page actuelle n'est touchée, et le lien mène bien au bon texte. Mais la PR annonce ce cas comme traité.

**I2. Ce que trouve le lecteur après « Votre marque » (porte sur la décision, pas sur la conformité du code).**
- *Ce que montre la cible* : sur une ligne saisie, le lien mène à une phrase qui nomme seulement les notices lues. Capture `ligne-saisie-375-chargee-apres-clic.png` : « Ligne 4 : d'après trois notices de constructeurs (Citroën C3, Peugeot 208 et Seat Ibiza) : la consigne la plus prudente est retenue. »
- *Ce qui manque sur la page* : au format 2, ni le texte long de `ecart_marques` ni les extraits d'une ligne saisie n'apparaissent.
  - `src/lib/format2.ts` lit `ecart_marques` seulement comme un drapeau (l. 353-354, 678, 687-688, 695) ;
  - le tableau des notices exclut les lignes saisies (`tests/tableau-notices.test.ts:60`) ;
  - le format 1 affichait encore « Selon les marques : … » dans l'encadré (`src/lib/composants.ts:344`).
- *Conséquence* : un lecteur qui a une Citroën n'apprend rien de plus que la ligne d'écart elle-même (« Moins stricts : Peugeot et Citroën (la faire contrôler) »). Le libellé « Votre marque » promet davantage que ce que donne la cible.
- *Ce que je recommande* : Houssem valide la PR en connaissant cette limite. On peut la noter en idée reportée, ou en faire une demande de changement : par exemple une courte liste des consignes par notice pour une ligne saisie à écart, extraits repliés comme ceux du tableau.
- Aucune page en ligne n'est concernée aujourd'hui. Ce cas apparaîtra avec la vague B (lot B2, `batterie-voiture`).

### Mineur

**M1. Le contrôle du texte de l'ancre se contente d'une sous-chaîne et ne vérifie pas le numéro de ligne.**
- *Preuve* : `src/lib/controle-format2.ts:108`, avec `n(texte(porteuse)).includes(n(phrase.slice(1)))`. Si la phrase d'une autre ligne contient celle de la ligne visée, une ancre mal placée passe. Exemple : la même phrase suivie de « Autre source : … ».
- La présence de « Ligne 4 » dans le texte de la phrase ciblée n'est pas vérifiée non plus.
- Le test « phrase d'une autre ligne » (`tests/ecart-lignes-saisies.test.ts:122`) emploie un texte sans aucun rapport avec la phrase, donc il ne couvre pas ce cas.
- *Proposition* : comparer le texte de la phrase ciblée au texte exact de son groupe, numéros compris, en exportant `groupesNotices`.

**M2. Le cas en échec « ancre hors du bloc » ne vérifie pas la condition qu'il prétend vérifier.**
- *Preuve* : `tests/ecart-lignes-saisies.test.ts:121`. Le texte déplacé, « Ligne N : d'après deux notices. », ne contient pas la phrase attendue (« … de constructeurs (…) : la consigne la plus prudente est retenue », l. 102). La vérification du texte échoue donc à elle seule.
- Si l'on retirait la condition `closest('[data-provenance]')`, le test resterait vert.
- *Proposition* : déplacer hors du bloc la phrase exacte.

**M3. Le contrôle ne dit rien d'une ancre en trop.** Une ancre `da-notices-ligne-<n>` sur une ligne de la base, ou sur une ligne sans écart, passe le contrôle.
- *Preuve* : `src/lib/controle-format2.ts:104`. La vérification ne porte que sur les lignes dont le renvoi mène à `ancreNoticesLigne(i + 1)`.
- Le test 5 vérifie l'absence d'ancre sur le modèle seulement, pas par le contrôle.
- Une ancre en trop ne se voit pas, d'où la gravité mineure. La PR dit pourtant « dans les deux sens ».

**M4. Certains messages et commentaires parlent encore de « tableau des notices » pour une ligne saisie.**
- *Message d'erreur* : `src/lib/controle-format2.ts:95` dit « la ligne d'écart renvoie au tableau des notices par un lien … vers #da-notices-ligne-4 ». Pour une ligne saisie, ce message contredit la décision (« jamais au tableau »).
- *Commentaires* : même chose en tête de fichier (l. 4-6) et dans la documentation de `renvois` (l. 47).
- *CONTROLES.md* : sur la ligne FORMAT2-ECART, la colonne « Test » n'indique pas `tests/ecart-lignes-saisies.test.ts`. Le fichier est seulement cité dans le texte de la règle.

**M5. Sur téléphone, le repère après le clic est faible.**
- *Le libellé reste hors écran* : la phrase ciblée est au milieu d'un long paragraphe gris, et le libellé « Notices » n'est pas visible (`ligne-saisie-375-chargee-apres-clic.png`).
- *Le repère tient au seul changement de couleur* : de `--texte-doux` #4b5563 à `--texte` #121820, soit un rapport de 2,36:1 entre les deux couleurs (calcul WCAG).
- *Le reste va bien* :
  - le repère se voit sur les captures ;
  - les contrastes sur le fond de page #eef1f5 sont bons : 6,67:1 avant, 15,75:1 sur la cible. Le bloc est sur fond clair, hors de l'encadré sombre, donc la question du contraste sur fond sombre ne se pose pas.
- Houssem en décide, puisque la PR soumet déjà le style de la cible à sa validation de charte.

**M6. La charte lisible n'est pas encore à jour.** `docs/11_charte_graphique.md:98` (« Lien « Votre marque » vers la partie du voyant au tableau des notices… ») et la règle 2b (`travaux/etape-13/demande-changement-30.md:78`, « renvoie au tableau des notices ») ne disent rien de l'exception des lignes saisies. La PR le signale (« à reporter dans `docs/11` et `docs/10` après la validation »), ce qui respecte CLAUDE.md. C'est un point à suivre, pas un défaut.

---

## Ce que j'ai vérifié sans constat

1. **Le rendu suit la décision.**
   - Une ligne saisie (`voyant` absent, `src/lib/calcul.ts:57-69`) à écart reçoit `#da-notices-ligne-<n>` (`format2.ts:220-222`).
   - L'ancre est posée seulement pour ces lignes (`lignesSaisiesAvecEcart`, l. 353-354), dans le bloc `data-provenance`.
   - Le rang est le même partout : celui de l'encadré, qui ne réordonne pas les lignes (`encadreFormat2`, l. 303), celui de la phrase et celui du contrôle (`controle.ts:862-864`).
2. **Les lignes de la base ne changent pas.** Leur branche de `renvoiNotices` est intacte, et l'ancien test de `tests/format2.test.ts:222` (« ligne saisie », sans rang) passe toujours.
3. **La page outil n'est touchée que pour une ligne saisie à écart, et il n'en existe pas aujourd'hui.**
   - Les cartes (`lienNoticesDeLaCarte`) et la ligne STOP (`aucun`) ne changent pas.
   - Rendu et contrôle passent tous deux le rang (`outil-format2.ts:329,366`). Ce chemin n'a pas de test propre, mais aucune page n'en a besoin pour l'instant.
4. **Le contrôle n'est pas affaibli.**
   - Le seul `absent` retiré est celui de la ligne saisie, comme le veut la décision.
   - Le `return` ajouté après « absent de la page » évite seulement un message en double.
   - TABLEAU-NOTICES-LIEN ignore toujours les lignes saisies (`controle.ts:1697`), et FORMAT2-PROVENANCE compare toujours la phrase entière. Le `<span>` ne change pas le texte.
   - Les cinq cas en échec sont relevés : CI, test 4 vert.
5. **Les identifiants sont uniques.** Le contrôle exige exactement un élément par ancre. Aucun voyant de `data/voyants.json` (26) ne commence par `ligne`, donc aucune collision avec `da-notices-<voyant>`.
6. **La production ne change pas** (vérifié par lecture, pas par construction).
   - Aucune page de `src/content` n'est au format 2 (aucun champ `format`, et `config/lots-format2.json` est vide).
   - `charte-b.css` n'est posée que sur une page au format 2 (`src/layouts/Base.astro:30`).
   - Les lignes saisies en ligne (`loi-montagne` 1 à 4, `voyant-frein` 2, `voyant-prechauffage` 2) n'ont aucune `ecart_marques` (relevé YAML de `src/content`).
7. **CI de la PR** (tête `10e73ab`) :
   - « Contrôles » : 851 tests, 851 réussis ; construction avec 19 pages éditoriales et 0 erreur bloquante ; 307 liens internes, 0 problème ;
   - « Démonstration du format 2 » : réussie. Son seul FORMAT2-ECART attendu est préexistant (`batterie-changer`, ligne de la base) ;
   - « Recette des exemples » : réussie.
8. **Captures** (7 fichiers).
   - La phrase ciblée arrive à environ 4 rem du haut, en couleur pleine, sans débordement, alignée avec le bloc, à 375 et à 1366 px.
   - La ligne d'écart fait 2 à 3 lignes et le lien ne déborde pas.
   - Police chargée et police de secours donnent le même rendu, car le texte concerné est en police du système. L'écart de pixels mesuré est un bruit de lissage, sans effet sur la mise en page.

## Ce que je n'ai pas pu vérifier

- Les commandes `npm` : aucune installation n'était permise. J'ai donc pris les résultats dans les journaux de la CI.
- La comparaison « octet pour octet » de la production et de la démonstration annoncée par la PR. Je l'ai seulement confirmée par lecture du code.
- La construction locale de `batterie-voiture` (lot B2, non commitée). Je n'ai que les captures.
- Le rendu dans Firefox et Safari : `scroll-margin` sur un élément en ligne et sur une ancre vide. Les captures ont toutes été faites avec Chromium.
- Le comportement avec un lecteur d'écran.
- Le job « Lighthouse mobile » : il était encore en cours au moment de la revue.
