# Paquet de validation du lot C4 : page « usure des pneus »

> **Brouillon, jamais validé.** Étape 11 (vague C), lot C4, branche `etape-11/lot-c4`, sans pull request. Aucun verdict
> ci-dessous n'est validé. **Revue indépendante** du 17/11 sur ec0e962 (lancée par le pilotage) : « à corriger » ;
> corrections sur décision du pilotage (règle 6), §0. **Ce qui a changé après la revue n'a pas été relu par un relecteur
> indépendant.** Le niveau de la ligne 1 s'appuie sur la **demande de changement n° 36** (règle 1), proposée.

Page : `exemples/pneus/usure-des-pneus.md`, adresse `/usure-des-pneus/` (plan du site, vague C ; pages liées :
contre-visite, loi montagne, voyant de pression des pneus, pression des pneus), modèle pneus et obligations au format 2,
sujet « usure ».

- **Title** : « Pneu usé : témoin d'usure, 1,6 mm et quand changer ses pneus » (requête principale « pneu usé »)
- **H1** : « Pneus usés : peut-on encore rouler, et comment lire le témoin d'usure ? »
- **Description** (I1) : « Un pneu est usé quand ses témoins d'usure affleurent la bande de roulement : ne repartez pas
  sans le changer. Ce que disent les notices, le contrôle technique et la loi. »
- **Question de l'encadré** (brief) : « Puis-je rouler avec des pneus usés, et comment savoir s'ils le sont ? »
- **Réponse directe** (I1) : « Regardez les témoins d'usure au fond des rainures : s'ils affleurent la bande de
  roulement, le pneu est à sa limite d'usure. Ne poursuivez pas votre trajet avec ces pneus : faites-les remplacer. »
- **Texte de référence** (fiche « Le texte en bref ») : arrêté du 18 juillet 2019, article 5. Défaillances (annexe I,
  5.2.3) : mineure e.1 ; majeure e.2 et d.2 ; critique e.3 et d.3. Contre-visite (I1) : « La contre-visite se fait dans
  les deux mois qui suivent le contrôle, faute de quoi un nouveau contrôle complet est à refaire (article 7). Ce délai
  sert à remplacer les pneus et repasser : il n'autorise pas à rouler avec des pneus usés. » (« contrôle valable deux
  mois » retiré de la fiche.)

## 0. Corrections après la revue indépendante (17/11, décisions du pilotage)
| Constat | Ce qui change |
|---|---|
| I1 | L'indicateur signale 1,6 mm « avec une tolérance de + 0,6/- 0 mm » : à l'indicateur, l'exigence légale (au moins 1,6 mm) peut encore être remplie. L'article 5 ne fixe donc plus le niveau de la ligne 1 : il en sort ; la ligne cite l'annexe I, 5.2.3.e.2 (« L'indicateur d'usure de la profondeur des sculptures est atteint », défaillance majeure → règle 1 de la demande n° 36 : Non, ne poursuivez pas votre trajet) et les cinq notices. « La loi » retirée des plus stricts dans l'écart. Situation, réponse directe, description et premier paragraphe réécrits ; ce que disent Peugeot et Citroën (« inférieure à 1,6 mm ») et Renault et Dacia (« au plus 1,6 mm ») est attribué à chacune ; la tolérance de l'indicateur est dite avec l'article 5 (l'ancienne contradiction entre « il ne reste que 1,6 mm ou moins » et la tolérance est levée). « Contrôle valable deux mois » retiré de la fiche et du texte (le délai sert à remplacer les pneus et repasser). |
| Seat p. 308 | Extrait mot pour mot, relu à l'écran : « Les pneus doivent être changés au plus tard lorsque les indicateurs d'usure sont usés. S'il n'est pas fermé, il existe des risques d'accident ! » (sic, phrase de la notice). |
| Mineurs | Pas de majuscule après deux-points (« Non : » retiré devant le verdict cité) ; R314-1 au registre : « Code de la route, section « Pneumatiques », article R314-1 » ; commentaire de `tests/porte6.test.ts` : « à valider par Houssem avec le lot C4 » ; preuve des quatre modes (`recette/modes.txt`). |

## 1. Les lignes de l'encadré

**Ligne 1. Les pneus sont usés jusqu'aux témoins d'usure : les témoins affleurent la bande de roulement** : **Non, ne
poursuivez pas votre trajet** · **À faire tout de suite**. Le contrôle technique et cinq notices, **écart signalé**.
- Action : « Ne poursuivez pas votre trajet avec ces pneus : faites-les remplacer avant de reprendre la route, au moins
  les deux d'un même essieu. »
- Ligne d'écart : « Plus stricts : contrôle technique (défaillance majeure) et Seat. Moins stricts : Peugeot, Citroën
  (remplacer impérativement), Renault et Dacia (remplacer). »

  | Source | Emplacement | Extrait | Niveau |
  |---|---|---|---|
  | Arrêté du 18 juin 1991, annexe I | 5.2.3.e.2 (relu vers 13 h 15) | « L'indicateur d'usure de la profondeur des sculptures est atteint » : défaillance majeure | Non, ne poursuivez pas votre trajet · tout de suite (**règle 1 de la demande n° 36**) |
  | Seat Ibiza | p. 308, AVERTISSEMENT | « Les pneus doivent être changés au plus tard lorsque les indicateurs d'usure sont usés. S'il n'est pas fermé, il existe des risques d'accident ! » | Non, ne poursuivez pas votre trajet · tout de suite (« au plus tard », absent de la grille, et risque d'accident annoncé en roulant : principe 3 ; même règle du « dégât annoncé » que dans tout le lot) |
  | Peugeot 208 | p. 169 | « Lorsque les témoins d'usure n'apparaissent plus en retrait de la bande de roulement, la profondeur des rainures est inférieure à 1,6 mm ; remplacer impérativement les pneumatiques. » | Oui, avec précautions · tout de suite (« impérativement ») |
  | Citroën C3 | p. 115 | même texte, « il est impératif de remplacer les pneumatiques » | idem |
  | Renault Clio 5 phase 2 | p. 346 | « Lorsque le relief des sculptures a été érodé jusqu'au niveau des bossages-témoins, ceux-ci deviennent visibles : il est alors nécessaire de remplacer vos pneumatiques car la profondeur des sculptures n'est, au plus, que de 1,6 mm et ceci entraîne une mauvaise adhérence sur les routes mouillées. » | Oui, avec précautions · dans les jours qui viennent (action sans délai écrit) |
  | Dacia Sandero 3 | p. 307 | même texte (« bossages témoins ») | idem |

- **Si la demande n° 36 est refusée** : la ligne reste au même niveau par la seule lecture de Seat (principe 3) ; si
  Houssem classe aussi la consigne Seat autrement, elle descend à « Oui, avec précautions · tout de suite » (Peugeot,
  Citroën).

**Ligne 2. Un pneu est endommagé : trou, entaille, déchirure ou boursouflure** : **Non, arrêtez-vous immédiatement** ·
**À faire tout de suite**. Une seule notice (Seat Ibiza p. 305, AVERTISSEMENT : « Ne roulez jamais avec des pneus
endommagés. Risque d'accident ! »), au niveau de sa citation (décision du pilotage). Seat p. 304 est citée dans le
texte. R314-1 (« aucune déchirure profonde » sur les flancs) n'est pas dans la ligne.

**Ligne 3. En roulant, vous sentez des vibrations inhabituelles, ou la direction tire d'un côté** : **Non,
arrêtez-vous immédiatement** · **À faire tout de suite**. Seat Ibiza p. 305, AVERTISSEMENT (« … arrêtez-vous
immédiatement et vérifiez l'état des pneus. »).

**Ligne 4. Après un choc contre un trottoir ou un obstacle** : **Oui, avec précautions** · **À faire dans les jours qui
viennent**. Renault Clio 5 p. 346 et Dacia Sandero 3 p. 307 (« … Dans ce cas, faites vérifier leur état par un
Représentant de la marque. »).

Contrôle de la grille : aucune alerte R3-NIVEAU-A-VERIFIER pour la page.

## 2. Coût probable
- **Plage** : de « Geste à faire vous-même » (`regonflage`) à « Entretien ou équipement courant » (`pneus`).
- **Base du coût** : « La dépense va du regonflage, que vous faites vous-même (une pression non conforme use les pneus
  prématurément, selon la notice Peugeot 208), aux pneus à remplacer (entretien), au moins deux d'un même essieu selon la
  notice Seat Ibiza. »
- Aucun montant. Le dépannage sur autoroute s'affiche de lui-même (lignes à l'arrêt ; demande de changement n° 10) :
  inchangé, noté.

## 3. Extraits et faits : relus à l'écran
- Notices relues à l'écran le 17/11 vers 12 h 55 (relevé, §13) : Peugeot 208 p. 169, Citroën C3 p. 115, Renault Clio 5
  p. 346, Dacia Sandero 3 p. 307, Seat Ibiza p. 304, 305, 306 et 308 (p. 308 relue de nouveau pour la revue, mot pour
  mot). Toyota non lue (la page le dit).
- Légifrance : annexe I, 5.2.3 d et e, et article 7, vers 13 h 15 (§14) ; R314-1, R323-1 et l'article 5 de l'arrêté de
  2019 en entier, vers 13 h 50 (§15).
- Faits de l'article 5 dits comme il les dit : au moins 1,6 mm pendant toute l'utilisation sur route ; indicateurs à
  1,6 mm « avec une tolérance de + 0,6/- 0 mm » ; écart de 5 mm au plus entre deux pneus d'un même essieu (section
  « Changer deux pneus ou quatre ? », avant la consigne Seat, sans en tirer de règle).
- **Non cités** : règlement ONU n° 30 ; arrêté de 2019, article 9. « 6 ans » : seulement comme consigne Seat. Aucun
  montant d'amende.

## 4. Fiche, tableau, illustration
- **Fiche « Le texte en bref »** : texte de référence, défaillances, contre-visite (sans « contrôle valable deux mois »).
- **Tableau** (élément unique) : la loi (1,6 mm ; indicateurs à 1,6 mm, tolérance + 0,6/- 0 mm), le contrôle technique
  (« remplacer les pneus, puis contre-visite dans les deux mois ») et chaque notice.
- **Illustration** `usure-pneu-temoin` : inchangée.

## 5. Recette (construction `AVEC_EXEMPLES=1`, 17/11, après la revue)
Preuves : `recette/` (communes au lot), refaites après les corrections de la revue.
- **Mesures** (375 × 667, police chargée / de secours) : réponse directe finie à 402 / 402 px ; verdict et urgence de la
  première situation à 536 / 536 (667 au plus) ; encadré (4 lignes) fini à 1 634 ; **illustration à 2 198 px, au-delà
  de trois écrans (2 001 px), signalée** : raison, l'encadré de 4 lignes, suivi du bloc « Notices / Base du coût »
  (règle 2i, demande n° 32) ; page de 9 724 px. À 320 px : verdict et urgence à 617 ; aucun débordement.
- **Contrôle** (`controle.txt`) : seules erreurs, attendues, R4-VALIDATION-ABSENTE ; aucune alerte R3-NIVEAU-A-VERIFIER
  pour les pages du lot. Contrôles du lot (`controles-lot.txt`) : schémas, 865 tests sur 865, construction,
  `npm run liens` (0 problème), démonstration, indexation durable, modes : verts ; **les quatre modes** d'indexation dans
  `modes.txt` (`npm run verifier:modes`). Liens de la construction de recette (`liens-recette.txt`) : 1 335 liens,
  0 problème.
- **Lighthouse mobile** (`lighthouse.txt`) : performance 100, accessibilité 100, bonnes pratiques 100, CLS 0 ; SEO 66 :
  seul l'audit « is-crawlable » échoue (construction de recette non indexable).
- **Captures** (`captures/`) : 320, 375 et 1366 px, deux polices (captures de secours identiques retirées).

## 6. Points à trancher (avec ma recommandation)
1. **Demande n° 36** (règle 1 : majeure → Non, ne poursuivez pas votre trajet). **Recommandation : accepter.**
2. **Lignes 2 et 3 sur la seule notice Seat** (décision du pilotage). **Recommandation : valider.**
3. **Illustration au-delà de trois écrans** (encadré de 4 lignes), si les mesures la placent encore au-delà.
   **Recommandation : accepter.**
4. **Changement d'un contrôle** : `tests/porte6.test.ts` (`points-ouverts.md`, §1 ; jugé sans affaiblissement par la
   revue). **À valider avec le lot.**

## 7. Ligne de validation proposée (page « usure des pneus »)
« Je valide la page « usure des pneus » : la question de décision, la réponse directe, les quatre lignes (pneus usés
jusqu'aux témoins à Non, ne poursuivez pas votre trajet et À faire tout de suite, avec son écart ; pneu endommagé à Non,
arrêtez-vous immédiatement et À faire tout de suite ; vibrations ou direction qui tire à Non, arrêtez-vous
immédiatement et À faire tout de suite ; choc contre un trottoir à Oui, avec précautions et À faire dans les jours qui
viennent), le coût, la fiche « Le texte en bref », le tableau, l'illustration, les faits du texte, le title, le H1 et la
description ; et j'accepte la demande de changement n° 36. »
