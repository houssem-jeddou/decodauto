# Revue indépendante : pull request n° 71, lot F2 (branche `etape-13/f2-donnees`, tête b657ced)

Relecteur indépendant, sans contexte de la rédaction. J'ai cloné le dépôt (`/home/claude/revue-f2-clone`), comparé la branche à `origin/main` (base de fusion cd2433f), lu les fichiers et les captures moi-même, et lu les journaux de CI de la tête b657ced par l'API REST. Je n'ai rien poussé ni commenté.

## Verdict : **à corriger**

Rien de bloquant. Les données de la base sont exactes, aucun verdict ne bouge, et les contrôles ne sont pas affaiblis. Trois points importants sont à reprendre avant de soumettre le paquet à Houssem : deux portent sur le paquet, le troisième sur trois « ce que demande la notice ». Chacun se corrige vite.

---

## Ce qui est vérifié et conforme (avec preuves)

1. **Aucun verdict changé dans la base.**
   - Script de comparaison de `data/voyants.json` entre `main` et la branche, les champs `demande` et `ecart_court` retirés : résultat **identique**.
   - Les 26 lignes gardent leurs niveaux, urgences, actions, citations, `ecart_marques` et empreintes `validation`.
2. **Aucun verdict changé dans les pages.**
   - Front matter des 12 pages : seuls `date_modification` (au 16/11), `format: 2` et `illustration` changent. Title, H1, `situations`, causes, coût et `date_revue` sont inchangés (diff du front matter page par page).
   - Corps : pour chaque page, les `{{verdict:…}}` retirés sont tous remplacés par un `{{repere:…}}` de la même ligne. Par exemple, sur la page voyant moteur, `moteur-orange-clignotant` passe de 1 verdict à 1 repère et `moteur-orange-fixe` de 5 verdicts à 4 verdicts plus 1 repère. Aucune référence ne change de ligne.
   - Les 12 pages gardent leurs H2, identiques et dans le même ordre (`diff` des lignes `## `), ce qui respecte la règle 2j.
3. **Le paquet reproduit exactement la base.**
   - Les 16 « E » et les 126 « → » du paquet ont été extraits par script et comparés à `ecart_court` et `demande` de la base : identiques, dans l'ordre.
   - Le brouillon `brouillon-f2.json` est lui aussi identique à la base, et sa tête porte « Brouillon, jamais validé ».
4. **Les 16 lignes d'écart courtes** nomment correctement les marques les plus et les moins strictes, d'après les niveaux des citations de leur ligne (tableau ci-dessous).
   - Elles tiennent toutes en 25 mots au plus avec « Votre marque », comptés comme le site (`motsDe`). Les mesures du rendu (`mesures.json`, de 19 à 25 mots) concordent.
   - Une ligne courte existe pour chaque ligne qui a un `ecart_marques`, et pour aucune autre.
5. **Les contrôles ne sont pas affaiblis.**
   - `tests/empreinte-format.test.ts` : le corps est inchangé ; il échoue désormais jusqu'au versement des empreintes, comme attendu.
   - `PARAGRAPHES_A_REPRENDRE_DEMO` est réduit : il y a moins d'erreurs attendues, donc le contrôle est plus strict.
   - `tests/format1.ts` fait passer les tests du format 1 sur une version format 1 des pages, sans rien désactiver.
   - Le saut de la fiche `accueil` dans `scripts/verifier-indexation-durable.ts` est justifié : sinon la fiche écraserait, ligne 193 de `scripts/lib/indexation-durable.ts`, le title et le H1 lus dans `src/lib/accueil.ts`, qui restent contrôlés. Un test verrouille l'égalité de la fiche avec `TITLE_ACCUEIL` et `DESCRIPTION_ACCUEIL`.
6. **La CI de b657ced n'échoue que sur R4-EMPREINTE.**
   - Job « Contrôles » : 848 tests, 9 en échec. Les 312 occurrences de `regle` dans le journal sont toutes `'R4-EMPREINTE'`, sans aucune autre règle. La vérification de l'indexation durable donne 0 erreur (19 pages contre 19).
   - Jobs « Recette des exemples » et « Démonstration du format 2 » : `controle.ts` signale **38 erreurs = 26 lignes + 12 encadrés**, toutes d'empreinte. FORMAT2-MESURES donne 0 erreur et 4 signalements.
7. **Indexation durable.**
   - Aucun fichier du plan ni de `_redirects` n'est touché, et `config/changements-de-titre.json` reste vide, ce qui est correct puisqu'aucun title ni H1 ne change.
   - `production-diff.txt` : seules les 13 pages du lot, la 404 et le `lastmod` des 12 pages voyants dans `sitemap.xml` changent. Les 7 autres pages sont identiques octet pour octet.
   - `main` a avancé depuis (f49c012), mais seulement dans `docs/`, `CLAUDE.md` et `travaux/etape-13/demande-changement-30.md`. `git merge-tree` montre une fusion sans conflit, et la comparaison de production reste valable.
8. **Le format 2 est respecté sur les captures et les mesures.**
   - Règle 2a : la première situation tient dans 667 px sur les 12 pages (de 479 à 645 px), avec la police chargée comme avec la police de secours.
   - Règle 2b : lignes d'écart en balance ambre avec le lien « Votre marque ».
   - Règle 2d : repères en pastille sous les H2 d'une seule ligne.
   - Règle 2e : aucun paragraphe ni élément de liste au-delà de trois phrases. Je l'ai recompté sur le Markdown des 12 pages avec l'expression de `nombreDePhrases`.
   - Règle 2f : tableau des notices compact, avec la demande, le badge, « p. N » et l'extrait dépliable au libellé unique.
   - Règle 2h : sommaire sur toutes les pages de plus de six écrans.
   - Règle 2i : illustration juste après le bloc « Notices / Base du coût » sur toutes les pages.
   - Largeur de 320 px sur toutes les pages, sans débordement, et Lighthouse à 100 partout (CLS 0).
9. **Les deux corrections de modèle sont efficaces** (captures avant et après dans `captures/corrections/`).
   - « Votre marque » passe en bloc à la ligne suivante, et « de » ou « à » restent avec leur pastille.
   - Aucune régression : 0 erreur FORMAT2-MESURES sur les 23 pages de la démonstration, et un test dédié (`.borne`) a été ajouté.
10. **Accueil et 404.**
    - Les textes A1 à A7 sont tirés du code (`textes-accueil-404.ts` lit `ACCUEIL_FORMAT2`, `LIBELLES_PICTOGRAMMES` et `page-404.ts`).
    - La grille compte 18 pictogrammes et commence dans le premier écran du téléphone. Les mots de 10 lettres et plus sont coupés par un tiret (« Préchauf-fage », « Tempéra-ture »), comme le veut la charte, §4.
11. **Dépôt public.** Les 26 commits sont signés `noreply`, et le diff ne contient ni secret ni donnée personnelle non publiée.

### Contrôle des 16 lignes d'écart courtes

Niveaux : V0 « oui », V1 « avec précautions », V2 « ne poursuivez pas », V3 « arrêt immédiat ». Urgences : U2 « jours », U3 « tout de suite ».

| | Ligne | Niveaux des citations (`data/voyants.json`) | Mots | Résultat |
|---|---|---|---|---|
| E1 | moteur-orange-fixe | Toyota V3 ; Seat, Renault, Dacia V1/U3 ; Peugeot V1/U2 | 24 | conforme |
| E2 | moteur-orange-clignotant | Toyota V3 ; Peugeot, Seat V2 ; Renault, Dacia V1 | 25 | conforme (voir mineur m1) |
| E3 | huile-niveau | Seat, Peugeot V1/U3 ; Toyota V1/U2 | 21 | conforme |
| E4 | entretien-vidange | Renault, Dacia V1/U2 ; Peugeot, Seat, Toyota V0/U2 | 24 | conforme |
| E5 | batterie-rouge | Peugeot, Renault, Dacia, Toyota V3 ; Seat V1/U3 | 19 | conforme |
| E6 | adblue-reserve | Peugeot, Renault, Dacia V1/U3 (sous 800 km) et V1/U2 ; Seat V1/U2 | 19 | conforme |
| E7 | adblue-demarrage-impossible | Seat V3 (et V2) ; Peugeot, Renault, Dacia V2 | 24 | conforme |
| E8 | adblue-defaut | Renault, Dacia V1/U3 ; Seat V1/U2 | 22 | conforme |
| E9 | fap | Peugeot, Renault, Dacia V1/U3 ; Seat V1/U2 | 24 | conforme |
| E10 | airbag-defaut | Seat, Renault, Toyota, Dacia p. 101 V1/U3 ; Peugeot, Dacia p. 111 V1/U2 | 24 | conforme |
| E11 | abs | Renault p. 212, Dacia p. 184, Toyota V1/U3 ; Peugeot, Renault p. 138, Dacia p. 112 V1/U2 | 25 | conforme |
| E12 | esp-clignotant | Seat V1/U3 ; les quatre autres V0 | 21 | conforme |
| E13 | esp-defaut | Renault, Dacia, Toyota V1/U3 ; Peugeot V1/U2 | 23 | conforme |
| E14 | pression-pneus | Seat, Toyota, Peugeot p. 110, Renault, Dacia « Crevaison » V3 ; Peugeot p. 18 V1/U3 ; Dacia p. 177 V1/U2 | 25 | conforme (voir mineur m2) |
| E15 | direction-orange | Toyota V1/U3 ; Peugeot, Seat V1/U2 | 19 | conforme |
| E16 | direction-rouge | Seat, Peugeot, Renault, Dacia V3 ; Toyota V1/U3 (2 citations) | 19 | conforme |

**« Ce que demande la notice »** : j'ai vérifié les 126 demandes, une par une, contre leur extrait dans `data/voyants.json`. 121 sont fidèles, sans durcir ni adoucir. Les 5 autres font l'objet du constat I3 et des mineurs m3 et m4.

---

## Constats

### Bloquant
Aucun.

### Important

**I1. Le H1 passe à 1,4 rem, ce qui change une valeur de la charte que le paquet ne fait pas valider et que `docs/11` contredit.**
- Le changement est dans `src/styles/charte-b.css`, l. 54-56 : `h1{…font-size:1.4rem…}`, au lieu de 1.45.
- Or `docs/11_charte_graphique.md` v2 sur `main` (validée le 16/11 à 18 h 55), §3, dit encore « H1 de 1,45 rem sur téléphone ».
- La charte, §6.5, demande qu'une variante entre d'abord dans ce document. `CLAUDE.md` ajoute qu'en cas d'écart entre le code et `docs/`, c'est `docs/` qui a raison.
- Cette correction n'est décrite que dans `captures/corrections/README.md` (point 3, « À valider sur captures »). Le paquet (`paquet-f2.md`) ne la mentionne pas (aucune occurrence de « 1,4 » ni de « H1 » dans ses items), et sa formule « Je valide le paquet F2, version 3 » ne la couvre donc pas.
- À faire : ajouter au paquet un item (par exemple « M1 ») avec les captures `pression-pneus-h1-375-secours-avant/apres.png`, et prévoir la mise à jour de `docs/11` §3 après la validation.
- Il en va de même, en mineur, pour les deux autres corrections (voir m6).

**I2. Les deux signalements 2i ne sont pas repris dans le paquet.**
- FORMAT2-MESURES signale (`preuves/mesures-format2.txt`, fin du fichier) : AdBlue à 2 761 px, encadré jusqu'à 2 277 px ; ABS et ESP à 2 320 px, encadré jusqu'à 1 893 px. Il précise « à dire dans le paquet ».
- La note du 16/11 (demande n° 32), reprise dans `docs/11` §5 i, exige que le haut du visuel soit « donné dans chaque paquet » et qu'au-delà de trois écrans, « le paquet le signale et dit pourquoi ».
- `paquet-f2.md` ne contient ni ces hauteurs, ni le mot « signal », ni « trois écrans » : il renvoie seulement à `preuves/README.md`.
- Pour ABS et ESP, l'encadré seul reste sous les trois écrans (1 893 px) : la raison est donc la signature, la ligne de transparence et le bloc « Notices » (environ 430 px), et pas seulement « 4 lignes ».
- À faire : ajouter dans P1 et P2 le haut de l'illustration, avec sa raison.

**I3. Trois demandes perdent la précaution « en conduisant avec ménagement » : la consigne est adoucie.**
- Les trois citations concernées sont `airbag-defaut` (Dacia p. 101), `abs` (Renault p. 212) et `abs` (Dacia p. 184).
- Leurs extraits disent : « nécessite(nt) un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement ».
- Leur demande est « Témoin Service allumé : aller au plus tôt chez un représentant » (10 mots), sans la précaution.
- La même consigne du témoin Service la garde ailleurs : `esp-defaut` (Renault, Dacia), `pression-pneus-systeme` (Dacia) et `entretien-vidange` (Renault, Dacia).
- Sur la page ABS et ESP, ce sont justement ces rangées qui portent « Consigne retenue », puisqu'elles donnent l'urgence de la ligne.
- Proposition en 10 mots, comptés comme le site : « Témoin Service : au plus tôt chez un représentant, avec ménagement ».

### Mineur

- **m1 (E2) : les « moins stricts » mêlent deux niveaux.** Peugeot et Seat sont V2 (« ne poursuivez pas »), Renault et Dacia sont V1. La règle 2b est respectée, mais le lecteur ne voit pas que Renault et Dacia sont les moins stricts. Par ailleurs, la demande Seat (« Lever le pied, aller prudemment à l'atelier proche… ») est fidèle à l'extrait, mais elle s'affiche à côté du badge « Non, ne poursuivez pas votre trajet » de la même citation. Ce niveau avait déjà été validé : la tension est à signaler à Houssem, pas à corriger dans F2.
- **m2 (E14) : la mention « Peugeot (liste des témoins) » est peu claire pour le lecteur.** Elle dit où se trouve la consigne, pas ce qu'elle demande, et Peugeot apparaît des deux côtés de la ligne (capture `pression-pneus/f2-375-chargee-encadre.png`). Une piste : « Peugeot sous-gonflage simple (contrôle au plus vite) », en restant sous 25 mots.
- **m3 : la demande Toyota de `pression-pneus` n'a pas de délai.** Elle dit « S'arrêter en lieu sûr, puis régler la pression », alors que l'extrait porte « Arrêtez immédiatement… » et « dès que possible ». La demande compte 8 mots : on peut ajouter « dès que possible ».
- **m4 : le seuil « Sous 800 km » des demandes Renault et Dacia d'`adblue-reserve` n'est pas dans leur extrait.** L'extrait cité, « XXX KM blocage remplir AdBlue » […] « dès que possible », ne contient pas « 800 ». Le seuil se déduit de la citation précédente (le message des 1 200 à 800 km) et du texte de la page (p. 166 et p. 138). Le lecteur qui déplie l'extrait ne le retrouvera pas.
- **m5 : le paquet ne dit pas que « Mis à jour le » et le `lastmod` des 12 pages passent au 16/11, ni pourquoi** (règle 14 b : textes repris, nouveaux textes affichés). Le changement me paraît justifié, mais il est à écrire dans le paquet. Si des corrections sont faites après le 16/11, la date devra suivre.
- **m6 : les deux corrections de feuille de style (`white-space:nowrap`) ne figurent pas dans le paquet.** Ce sont des retouches de forme, mais elles s'ajoutent à la charte (nouvelle classe `.borne`). À citer dans le même item que I1.
- **m7 : premier écran de la page « pression des pneus ».** La première situation finit à 645 px. C'est sous le maximum de 667 px, mais au-delà de la « marge visée : 640 px » de `docs/11` §5 a. Avec une police du système plus large qu'Inter, la marge est faible : la revue F1 avait relevé 6 dépassements de 2a avec DejaVu Sans.
- **m8 : seuil des trois écrans.** L'illustration de la page FAP est à 1 999 px, à 2 px du seuil de 2 001 px. Avec une autre police, elle sera signalée.
- **m9 : la fiche de l'accueil (`src/content/socle/accueil.md`) recopie à la main le title et la description.** C'est contraire à la règle « rien recopié à la main », même si un test vérifie l'égalité. Elle porte aussi des dates qu'aucune page n'affiche et qu'aucun contrôle DATE-* ne surveille, puisque la fiche est sautée. Cela reste acceptable, mais mérite une ligne dans le paquet.
- **m10 : style de deux phrases réécrites (P9).**
  - « …le voyant moteur orange fixe, que la notice Seat Ibiza dit jaune (…) » est une tournure lourde.
  - « Cette consigne est la plus prudente… » ouvre la section sans antécédent dans le texte, juste après la pastille du repère.
- **m11 : pas de nouvelle capture de la 404.** Elle passe au format 2 en production et son H1 passe à 1,4 rem. Les seules captures sont celles de F1.3b (`travaux/etape-13/f1/captures/f1.3b/404-format2-*`), et le paquet (A7) n'y renvoie pas.

---

## Ce que je n'ai pas pu vérifier

- **La construction.** Sans `node_modules`, je n'ai pas pu construire le site. Je me suis appuyé sur les journaux CI de b657ced (jobs « Contrôles », « Recette des exemples » et « Démonstration du format 2 ») et sur les preuves du dépôt.
  - Le job « Contrôles » s'arrête à `npm test` : `npm run build` et `npm run liens` n'ont pas tourné en CI sur la configuration de production.
  - Lighthouse est sauté en CI. Les chiffres viennent de `preuves/lighthouse.txt`, mesurés en local.
- **Les notices elles-mêmes.** Je n'ai lu ni les PDF ni le texte des notices : demandes et écarts sont comparés aux extraits de `data/voyants.json`. Ce que je n'ai pas pu confirmer faute de notice :
  - le seuil de 800 km (m4) ;
  - la légende AdBlue (« se répète », p. 166 et p. 138) ;
  - le symbole du frein à main chez Seat, pour la légende de l'illustration du frein.
- **D'autres polices et de vrais téléphones.** Les mesures et les captures utilisent Inter comme police du système. Je n'ai rien vu avec Roboto, San Francisco ou une police large, ni sur un vrai téléphone (recette de l'étape 9).
- **La largeur de 320 px.** Aucune capture à cette largeur. Je n'ai donc pas vu si la pastille la plus longue (« Entretien ou équipement courant », non sécable avec `.borne`) déborde de la carte de l'encadré. FORMAT2-MESURES ne voit que les débordements de la page.
- **Les captures absentes.** Le rendu complet des « Sources » repliées et du bas de page n'est pas capturé : je m'appuie sur FORMAT2-REPLIE, sans erreur en CI.
- **Search Console.** Le relevé avant la fusion reste à faire (`search-console-avant-f2.md`).
