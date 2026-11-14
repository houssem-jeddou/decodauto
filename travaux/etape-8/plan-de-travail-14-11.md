# Revue de ce qui reste et plan de travail (14/11/2026)

> Proposition de Claude, à la demande de Houssem du 14/11/2026 (10 h 59) : « revoir les règles, revoir le plan, les points qui restent, préparer un plan de travail pour les jours qui restent ; accélérer sans rien perdre en qualité ». Ce qui relève d'une règle passe par la demande de changement n° 21 (`demande-changement-21.md`), à accepter par Houssem. Le reste est une organisation que Claude retient d'après la règle du 10/11 (partir de sa recommandation). Revue indépendante : §9.

## 1. Où on en est

- **En ligne et indexable depuis le 12/11** : 4 pages sur 42 (accueil, « à propos », mentions légales, loi montagne). Inspection d'URL de Search Console, 14/11 : les 4 adresses sont « sur Google ».
- **Étapes 1 à 7 fermées. Étape 9** : premier lot en ligne ; derniers points d'après déploiement faits le 14/11 (réglages Cloudflare relus, validateur schema.org de l'accueil) ; reste la validation de la porte 9 et son tag.
- **En place** : modèles voyant, code défaut, pneus, outil voyants et socle validés ; base voyants de 25 lignes validée (les 11 pages voyants ont leurs verdicts) ; briefs des 22 pages de la vague A ; texte relevé des notices des 5 marques de référence (`travaux/etape-5/notices/`) ; contrôles automatiques et CI (≈ 5 minutes par passage) ; règle de passage outillée (`npm run passage`). Les 18 pages restantes de la vague A ont leur modèle, comme 2 pages de la vague C (usure des pneus, contre-visite : modèle pneus) ; les 18 autres pages des vagues B et C attendent les modèles panne, dossier et fluide (étapes 10 et 11).
- **Volume indicatif** (plafond, docs/05, mots-clés comptés, rattachés par `data/plan-du-site.json`) : 1 140 760 recherches par mois sur les 42 pages, dont 101 752 en ligne (9 %). Restent 1 039 008 : vague A 574 488 (18 pages), vague B 291 984 (11 pages), vague C 172 536 (9 pages).

## 2. Ce qui reste, étape par étape

| Étape | Reste à faire | Ce que Houssem valide |
|---|---|---|
| 9 | Porte 9 et tag ; suivi à J+7 (19/11) et J+14 (26/11) | Porte 9, tag |
| 8 | 18 pages en 4 lots (§4) ; demande de changement de la base voyants (STOP, triangle, préchauffage qui clignote ; décision 8 de 8.1) ; sort de 8.3.1b (§7) ; porte 8 complète | Une ligne par page et le paquet de chaque lot ; la demande de la base ; la porte 8 |
| 10 | Briefs des 11 pages (le générateur ne produit aujourd'hui que ceux de la vague A) ; modèles panne (arbre de décision, format tutoriel) et dossier, chacun avec son exemple ; 2 lots ; porte 10 | Exemples, lots, porte |
| 11 | Briefs des 9 pages ; modèle fluide avec son exemple ; 2 lots ; porte 11 | Exemple, lots, porte |
| 13 | Trois pistes de charte graphique ; application au gabarit ; porte 13 (demande n° 20) | Choix d'une piste, porte |
| 12 | Suivi mensuel ; avant AdSense : questions RGPD (représentant dans l'Union), plateforme de consentement, ads.txt | Décisions juridiques, demande AdSense |

**Décisions ou demandes en attente, à placer dans le plan** (journal) :
- trois requêtes principales des vagues B et C à revoir à leur brief (fumée, liquide de frein, liquide de refroidissement) : le plan est figé, donc demande de changement avec la vague concernée ;
- photos réelles pour les tutoriels des vagues B et C : à décider avant les modèles de l'étape 10 ;
- grille des verdicts pour une obligation légale (« Non, ne poursuivez pas votre trajet ») : à trancher avant les pages contrôle technique et usure des pneus (vague C) ;
- revérification mensuelle du Journal officiel pour la loi montagne (décret de sanction annoncé) : prochaine le 12/12 au plus tard ;
- reports d'après la mise en ligne (`main` protégée, compte GitHub séparé pour Claude, double authentification Microsoft, renouvellement du domaine) : le risque d'un commit sur `main` sans pull request croît avec le nombre de fusions ; le garde-fou de la CI reste la parade d'ici leur décision.

## 3. Pourquoi c'était lent, et ce qui change

1. **Les fondations sont faites.** Depuis le 22/10, 20 demandes de changement et l'essentiel du temps sont allés aux étapes 1 à 7 (structure, base voyants, charte, modèles, socle, garde-fous). Elles ne sont pas à refaire.
2. **Des jours sans séance.** Sur les 23 jours du 22/10 au 13/11, 11 sont sans travail (journal : 25-27/10, 29/10-01/11, 05-08/11). Les jours travaillés, plusieurs validations se sont enchaînées dans la journée (10/11 : 13 h 53, 14 h 18, 15 h 20, 15 h 31 ; 12/11 : 8 h 23, 8 h 39, 9 h 03, 17 h 01). Le rythme dépend donc surtout des jours où Houssem peut valider.
3. **Un livrable présenté à la fois, puis une attente.** → Lots plus larges, en flux : pendant que Houssem valide le lot N, Claude prépare le lot N+1 (même étape : aucune règle ne change).
4. **Des validations en plusieurs messages.** → Une séance par lot, sur téléphone : le paquet complet de chaque page (situation, verdict, urgence, action, source citée à la page près, extrait cité, faits de sécurité et chiffres, ce qui est nouveau) au format téléphone, avec la capture de l'encadré ; la ligne de validation de chaque page et le go de fusion dans le même message. Le go vaut pour le commit présenté (sa tête est écrite dans le paquet) : toute modification après la validation l'annule.
5. **Des sources cherchées page par page.** → Relevé par famille de sources : l'annexe I du contrôle technique, lue le 14/11, sert à une dizaine de pages (voyants moteur, airbag, ABS, FAP, frein, pression des pneus ; pneus, contre-visite) ; les notices déjà relevées servent à toutes les pages voyants.
6. **Rien ne se préparait pour les étapes 10 et 11 avant la porte 8.** → Demande de changement n° 21 : modèles des étapes 10 et 11 sur la piste technique, et préparation de leurs sources, de leurs briefs et des brouillons de leurs exemples pendant les attentes de validation, sans rien en présenter ni publier avant la porte en cours.
7. **Le journal approche sa limite** (`docs/04` : 44 114 caractères pour 45 000, `travaux/journal/verifier.py`) et se mettait à jour à chaque livrable. → Une mise à jour par session, archivage dès qu'il approche la limite.

> **Mise à jour du 14/11 (13 h 15), après la relecture de la décision 8 du paquet 8.1 (validée le 04/11 : STOP et le triangle dans la base avant la mise en ligne de l'outil)** : lot 3 = voyant FAP, voyant de pression des pneus et page pression des pneus (texte de référence trouvé : annexe I du contrôle technique, point 5.2.3), soit 118 816 recherches par mois ; **lot 3b** = demande de changement de la base (STOP, triangle rouge, triangle orange, pictogrammes) puis outil voyants (142 516) ; voyant frein (20 540) au lot 5, faute de source du témoin d'usure des plaquettes (D4). Le tableau ci-dessous garde la proposition d'origine.

## 4. Lots de la vague A (par volume, sauf dépendance)

| Lot | Pages | Volume (plafond) | Dépend de |
|---|---|---|---|
| 2 | Voyant moteur, voyant huile, code P0087 | 188 652 | Moteur : sources du brief à lire avant la présentation du lot (annexe I du contrôle technique sur Légifrance et notice Seat p. 289 sur le PDF, lues le 14/11 ; Toyota p. 297 et notice Citroën, à lire sur les PDF, ou écart soumis à Houssem dans le paquet du lot). P0087 : aucune source admise trouvée pour le 1.6 HDi le 14/11, la page ne promet pas ce cas. Huile : rien d'extérieur (lignes validées en base) |
| 3 | Demande de la base voyants (STOP, triangle, préchauffage qui clignote), outil voyants, voyants frein, FAP, pression des pneus ; page pression des pneus si son texte de référence convient au schéma | 193 076, ou 281 872 avec la page pression des pneus | Base : 3 marques de 2 groupes par nouvelle ligne, pictogrammes, et page de rattachement de STOP et du triangle (champ `page` obligatoire, aucune page au plan : à trancher dans la demande) ; outil : recette Safari, Firefox, lecteur d'écran et vrai téléphone ; frein : source de première main du témoin d'usure des plaquettes (décision D4) ; FAP : point du contrôle technique (annexe I) ; pression des pneus : texte de référence (sinon demande de changement du schéma et passage au lot 5) |
| 4 | Codes P1351, P0299, P0380, P0420 | 59 092 | Sources techniques secondaires admises (charte §2.2 : bulletins, documents d'équipementier, documentation d'éditeur d'outil de diagnostic), une par cas décrit ; les notices ne parlent pas des codes. Si elles manquent, le lot 5 passe avant |
| 5 | Pression des pneus (si pas au lot 3), voyants airbag, ABS et ESP, AdBlue, préchauffage, batterie, direction | 44 872, ou 133 668 avec la page pression des pneus | Annexe I du contrôle technique (airbag, ABS) ; témoins AdBlue sur les PDF (brief) |

Chaque lot : pages complétées d'après leur brief, sources de première main citées à la page près, paquet de validation, revue indépendante du diff complet, CI verte, recette de l'étape 9, ligne de validation de Houssem par page, fusion sur son go (03, règle 2 ; demande n° 17).

## 5. Plan de travail (prévision ; le rythme est celui des séances de validation)

| Jour | Claude prépare | Houssem (téléphone, ≈ 20 à 30 minutes) |
|---|---|---|
| Sam 14/11 | Porte 9 ; lot 2 ; job « production » avec nouvelles tentatives (point ouvert du 12/11) ; début du lot 3 | Demande n° 21 ; porte 9 et tag ; lot 2 et go |
| Dim 15/11 | Lot 3 | Demande de la base voyants ; lot 3 et go |
| Lun 16/11 | Lot 4 ; sources et briefs des étapes 10 et 11 (si n° 21) | Lot 4 et go ; photos réelles pour les tutoriels (oui ou non, avant les modèles du 18/11) |
| Mar 17/11 | Lot 5 ; demande de changement des trois requêtes principales des vagues B et C | Lot 5 et go ; demande sur les requêtes |
| Mer 18/11 | Porte 8 complète ; modèles panne et dossier (si n° 21) | Porte 8, sort de 8.3.1b |
| Jeu 19/11 – Lun 23/11 | Étape 10 : exemples panne et dossier, puis 2 lots | Exemples, lots, porte 10 |
| Mar 24/11 – Ven 27/11 | Étape 11 : exemple fluide, puis 2 lots | Exemple, lots, porte 11 |
| Sam 28/11 – Mer 02/12 | Étape 13 : trois pistes, puis application | Choix d'une piste, porte 13 |
| Ensuite | Étape 12 : suivi mensuel, préparation d'AdSense | Décisions juridiques, demande AdSense |

**Fourchette, pour le site complet** : vers le 02/12 si une séance de validation a lieu chaque jour (hypothèse haute) ; vers le 20/12 au rythme observé depuis le 22/10 (12 jours travaillés sur 23 : 19 jours de plan × 23/12 ≈ 36 jours). Chaque jour sans séance décale la suite d'environ un jour. Estimation de Claude, non mesurée : elle suppose qu'un lot se prépare en une journée, ce que le rythme des 14 et 15/11 dira. Repères fixes : suivi de la porte 9 le 19/11 (J+7) et le 26/11 (J+14).

## 6. Ce qui ne change pas (qualité)

Aucun critère n'est retiré : sources de première main citées à la page près ; 3 marques de 2 groupes par ligne de la base voyants, verdict le plus prudent, écart signalé ; paquet de validation et ligne de Houssem par page ; encadré de décision relu ; revue indépendante par lot, deux au plus ; contrôles automatiques et CI verte ; Lighthouse mobile ≥ 95 et CLS < 0,1 ; règle 14 (indexation durable) ; porte par lot, puis porte complète de chaque vague ; exemples des étapes 10 et 11 validés avant la rédaction de leurs lots ; correction urgente (règle 13).

## 7. Décisions prises par Claude (règle du 10/11)

1. Composition et ordre des lots (§4) : par volume, sauf dépendance (l'outil voyants attend la demande de la base voyants, décision 8 de 8.1).
2. 8.3.1b reste un livrable ouvert de l'étape 8, hors du chemin des lots : reprise quand les sites des préfectures répondront, une page toutes les deux minutes environ, dans le Chrome de Houssem. Son sort se décide à la porte 8 complète (Houssem) : terminé d'ici là, reporté dans « Idées reportées », ou repris plus tard par une demande de changement ; la porte ne se ferme pas sans cette décision.
3. Piste technique : job « production » avec nouvelles tentatives (PR #38), puis, si la demande n° 21 est acceptée, contrôle des vagues ouvertes (§ de la demande) et modèles des étapes 10 et 11.
4. Journal : une mise à jour par session ; archivage dès qu'il approche la limite.

## 8. Ce que Houssem a à faire, et quand

- **Aujourd'hui** (téléphone) : accepter ou non la demande n° 21 ; valider la porte 9 (paquet joint) et poser le tag si il le souhaite (formulaire de release pré-rempli) ; valider le lot 2 et donner le go ; fusionner ou faire fusionner la PR #38.
- **Chaque jour** : une séance pour le lot du jour.
- **Plus tard** : sort de 8.3.1b (porte 8) ; décisions du §2 à leur échéance.

## 9. Revue indépendante (deux, le maximum ; plan et demande n° 21 relus ensemble)

- **Première** : « à corriger », un bloquant, huit importants, trois mineurs ; chiffres recalculés par le relecteur depuis le plan du site et docs/05 (volumes, lots, jours travaillés) : exacts.
  - **Changé** : la demande n° 21 n'autorise plus les brouillons de pages (bloquant : les exemples restent validés avant la rédaction des lots, 03 et demande n° 5) ; étapes nommées (8 → 10, 10 → 11, 11 → 13) et exceptions en puces ; impact complété (lignes des étapes 10 et 11, demande n° 5, « Déroulé ») ; contrôle automatique VAGUE-NON-OUVERTE ajouté (règle 4) ; raison appuyée sur le rythme réellement observé, gain donné comme hypothèse ; dépendances des lots refaites depuis les briefs, codes passés avant les petits voyants (volume) ; prévision en fourchette ; paquet complet au format téléphone, go lié au commit présenté ; sort de 8.3.1b décidé à la porte 8 ; oublis ajoutés (§2) ; taille du journal corrigée (44 114 caractères, sous la limite).
  - **Écarté** : rien.
- **Seconde** : « acceptable », rien de bloquant, un important, six mineurs. **Changé** : Toyota p. 297 et notice Citroën à lire sur les PDF avant la présentation du lot 2, ou écart soumis à Houssem ; 18 pages (et non 20) attendent un modèle ; fourchette recalculée (vers le 20/12) ; étape 13 précisée dans la demande (trois pistes en maquettes) ; contrôle des vagues ouvertes nommé dans la piste technique ; décisions de Houssem placées dans le plan (photos réelles le 16/11, requêtes le 17/11) ; FAP et ABS ajoutés au §3.
- **Reste à vérifier** : les déclarations de Claude que le relecteur ne pouvait pas contrôler (annexe I lue, notice Seat p. 289, statut « sur Google » des 4 adresses, réglages Cloudflare) ; la durée réelle d'un lot (rythme des 14 et 15/11).
