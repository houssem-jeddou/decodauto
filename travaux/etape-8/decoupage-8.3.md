# Livrable 8.3, lot du minimum : découpage proposé (10/11/2026, version 2 après revue indépendante)

> Proposition de Claude, à valider par Houssem. Les volumes viennent des briefs (`travaux/etape-6/briefs/`, plafonds de docs/05). Une revue indépendante a relu la version 1 : ce qu'elle a changé est au §6.

## 1. Ce que 03 demande, et où on en est

Étape 9, « Minimum en ligne » : socle, outil voyants, loi montagne, pression des pneus et voyants dont le verdict est validé ; le reste de la vague A suit dès qu'il est prêt, sans alléger les portes ; si glissement, loi montagne en premier. Étape 8 : préparée sur une branche d'intégration, aucune vraie page sur `main` avant la mise en ligne.

**Le glissement est acquis** : la cible du minimum était le 31/10 (03), la prévision du journal est ≈ 20–25/11. 03 désigne donc l'ordre « loi montagne en premier ».

Constaté dans le dépôt (`main` = 0e21cb6), vérifié par la revue :
- les 25 lignes de la base voyants sont validées : les 11 pages voyants sont candidates au minimum ; ce qui les retient, ce sont leurs sources manquantes et leur rédaction ;
- `src/content/` est vide ; cinq pages existent comme exemples (`exemples/`), construites seulement par la recette ;
- chaque page éditoriale porte un lien « Méthode » vers `/a-propos/#methode` : sans « à propos », une vraie page fait échouer `npm run liens` ;
- **déplacer un exemple vers `src/content` casse des tests** (`tests/briefs.test.ts` : 2 échecs constatés par la revue ; `tests/porte6.test.ts` exige un exemple par type et une empreinte par fichier ; chemins en dur dans `tests/modeles.test.ts`, `tests/outil-voyants.test.ts`, `tests/socle.test.ts`). Et une page nouvelle sans empreinte est en erreur (R4-VALIDATION-ABSENTE), sans erreur attendue possible hors recette ;
- le schéma des pages pneus n'accepte comme texte de référence que Légifrance ou un arrêté préfectoral ;
- une ligne de la base exige 3 marques de référence de 2 groupes : STOP est relevé chez Peugeot, Renault et Dacia ; le triangle n'est attribué qu'à Renault (paquet 8.1) ; le préchauffage qui clignote n'est relevé que chez Seat (p. 289).

## 2. Mécanique des branches

- **`integration/vague-a`**, créée depuis `main` (0e21cb6) avec le commit de la PR #24.
- **Tout livrable = une branche et une pull request vers `integration/vague-a`** (la CI tourne sur toute pull request et ne déploie que sur un push de `main`).
- **Deux exceptions, vers `main`** : le garde-fou de déploiement (il protège `main`) et les copies de `docs/` (documents seulement, comme la PR #24). `main` revient ensuite dans `integration/vague-a` par une pull request, pour que la CI tourne.
- **Mise en ligne** : une seule pull request `integration/vague-a` → `main`, avec le drapeau d'indexation. Fusion sur la seule demande de Houssem.
- **Où vit une page avant et après sa validation** : c'est l'objet du livrable 8.3.0 ci-dessous. D'ici là, la loi montagne se travaille sur place, dans `exemples/`, où elle est déjà validée et contrôlée.

## 3. Livrables, dans l'ordre recommandé (ordre A : loi montagne en ligne d'abord)

Un seul livrable présenté à la fois. Chaque livrable de pages se termine par : paquet de validation, **une ligne de validation écrite de Houssem par page publiée dans la pull request, même si l'encadré n'a pas changé** (03, règle 7), une revue indépendante, CI verte.

### Chemin critique vers la mise en ligne de la loi montagne

**1. 8.3.1a — Loi montagne, page publiable (101 752 recherches par mois, plafond).**
- Produit : l'exemple validé le 03/11, complété sur place : sanctions revérifiées (Journal officiel, décret annoncé ; arrêté du 30/10/2025 cité par la presse, non lu ; sanction du panneau B26), réponses aux questions relevées (amende et verbalisation, deux chaussettes, dates, marquages, pneus 4 saisons) ; registre complété ; paquet 8.3.1a. Les communes restent traitées par le lien vers la liste de la Sécurité routière, comme dans l'exemple.
- À valider : le paquet (sanctions, B26, dates) et la ligne de validation de la page ; l'encadré est relu s'il change (il change si un décret de sanction est paru).
- Manque : lecture de Légifrance et du Journal officiel. Dans la même séance de lecture : la loi n° 2004-575 (mentions légales) et le texte de référence de la pression des pneus, pour poser tôt les questions à Houssem.

**2. 8.3.0 — Règle de passage d'une page (technique).**
- Produit : la règle écrite et outillée : où vit une page avant et après sa validation ; comment les tests de la porte 6, les briefs, la recette (`--attendu`) et les listes Lighthouse suivent la page, sans affaiblir un contrôle (même assertion d'empreinte).
- À valider : la règle (elle touche des tests de la porte 6).
- Manque : rien d'extérieur.

**3. 7.3 — « À propos ».**
- Produit : la page (auteur, parcours, section « Méthode » de la charte, indépendance, corrections) ; lien « Méthode » réparé ; erreurs attendues retirées.
- À valider : le texte de la page.
- Manque : **le parcours, fourni par Houssem** (consigne validée : jamais rédigé sans lui ; Claude met en forme ce qu'il donne).

**4. 7.4a — Accueil.** Produit : liste des pages générée depuis le plan par le gabarit, description. À valider : le texte. Manque : rien.

**5. 7.4b — Mentions légales.** Produit : mentions publiées (la politique de confidentialité validée le 09/11 y reste). À valider : les mentions. Manque : **les informations à publier, demandées à Houssem** après lecture de la loi ; coordonnées de l'hébergeur (page officielle de Cloudflare).

**6. 7.5 — Données structurées, emplacements factices, images, `lastmod`.** Produit : Article, fil d'Ariane, auteur (il renvoie à « à propos ») ; emplacements publicitaires factices dans la construction de test ; décision sur l'image des articles (pictogramme redessiné ou photo réelle) ; `lastmod` du plan du site ; Lighthouse des pages de chaque modèle repassé avec les emplacements. À valider : le choix des images. Manque : documentation Google à jour, à lire avant d'écrire.

**7. 7.6 — Garde-fou de déploiement, réglages Cloudflare, Lighthouse du socle, porte 7.** Produit : contrôle de la CI (demande n° 15) ; robots d'IA, Rocket Loader, IndexNow ; Lighthouse de l'accueil, de « à propos » et des mentions légales ; porte 7 critère par critère. À valider : la porte 7 ; l'accord pour les réglages dans le compte Cloudflare. Manque : documentation Cloudflare à jour.

**8. Demande de changement n° 17 — porte 8 par lots et composition du minimum.** 03 fait dépendre la mise en ligne des portes 7 et 8 (règle 2 ; journal) tout en prévoyant un minimum avant la fin de la vague A. La demande écrit : porte 7 fermée avant ; porte 8 vérifiée sur les pages mises en ligne, avec ses trois éléments (preuves, revue, validation) ; chaque lot suivant la repasse avant sa fusion ; quelles pages forment le minimum.

**→ Go / no-go de la loi montagne**, avec les préalables de la porte 9 et le Journal officiel revérifié ce jour-là.

### Suite du minimum (avancée pendant les attentes du chemin critique, puis en continu)

**9. 8.3.1b — Loi montagne : tableau des départements.** Produit : un tableau des départements, chacun avec son arrêté cité ; arrêtés ajoutés au registre. À valider : le paquet. Manque : les arrêtés à lire un par un ; la Sécurité routière en liste 48 et annonce 34 départements soumis à l'obligation, l'écart se lève en les lisant. L'outil « ma commune » reste une idée reportée.

**10. 8.3.2 — Pression des pneus (88 796).** Produit : la page (encadré, « Le texte en bref », tableau « Où lire la pression et quand la vérifier, selon la notice de chaque marque ») ; `pages-sources.json` corrigé. À valider : question de décision, encadré entier, paquet. Manque : texte de référence (cherché dès le livrable 1) ; passages de 4 notices ; page de la Sécurité routière si elle existe. Risque : demande de changement du schéma si aucun texte de Légifrance ne convient.

**11. 8.3.3 — Base voyants : demande de changement et court paquet.** La base est figée : l'ajout se présente comme une demande de changement, qui tranche d'abord **à quelle page se rattachent STOP et le triangle** (le plan n'a pas de page pour eux ; les rattacher à la page outil change son encadré validé et exige un tableau des notices que ce modèle ne rend pas). Produit : lignes STOP, triangle et préchauffage qui clignote si 3 marques de 2 groupes les décrivent, pictogrammes, paquet ; texte et consigne de la page outil mis à jour dans la même pull request. Repli : sans 3 marques, pas de ligne en base ; le triangle reste cité sans verdict (consigne validée de l'outil), le préchauffage qui clignote passe par une ligne saisie liée sur sa page. Manque : pages des notices pour le triangle et le préchauffage (celles de STOP sont relevées).

**12. 8.3.4 — Outil voyants.** Produit : la page réelle ; revue qui couvre aussi l'index des dessins et les corrections jamais relues de 8.1. À valider : l'encadré s'il change, la ligne de validation, la recette à la main (Safari, Firefox, lecteur d'écran, vrai téléphone). Manque : un moyen d'ouvrir la page sur le téléphone de Houssem avant la mise en ligne.

**13 à 16. Voyants, par lots**, chacun avec paquet, revue, recette :
- 8.3.5 : moteur (119 764), huile (51 508). Manque (moteur) : messages « défaut moteur » des notices Peugeot et Citroën, point du contrôle technique, PDF Seat p. 289 et Toyota p. 297.
- 8.3.6 : frein (20 540), FAP (18 960), pression des pneus (11 060). Manque : notice décrivant le témoin d'usure des plaquettes ; point du contrôle technique sur le FAP.
- 8.3.7 : airbag (10 744), ABS et ESP (10 428), AdBlue (7 900). Manque : point du contrôle technique sur les airbags ; témoins AdBlue sur les PDF.
- 8.3.8 : préchauffage (7 584), batterie (4 424), direction (3 792).

Puis les 5 codes OBD (8.4) et la fermeture de la porte 8.

## 4. L'autre ordre (B) : minimum complet avant toute mise en ligne

Mêmes livrables, mais la mise en ligne attend 8.3.2, 8.3.3, 8.3.4 et au moins un lot de voyants. Un seul go / no-go, plus tardif ; la loi montagne n'est pas en ligne pendant ce temps.

## 5. À la charge de Houssem, et à trancher

**À lancer maintenant (délais longs, sur le chemin critique)** : parcours pour « à propos » ; questions juridiques du paquet 7.2 à un professionnel ; double authentification de Google, GitHub, OVH et Cloudflare ; verrou de transfert chez OVH. Les informations des mentions légales lui seront demandées dès la loi lue (livrable 1).

**À trancher :**
1. Ordre A (recommandé, celui que 03 désigne) ou B.
2. Ce découpage, dont le livrable 8.3.0 et la demande de changement n° 17 à préparer.
3. PR #24 : la fusionner sur `main` (recommandé : documents seulement), ou la laisser portée par la branche d'intégration.
4. Lecture de Légifrance et des sites des préfectures dans le navigateur de Houssem, quand celui de Claude est arrêté par une vérification.

## 6. Revue indépendante (une revue, version 1 ; verdict « à corriger » : 1 bloquant, 8 importants, 2 mineurs)

- **Changé** : livrable 8.3.0 ajouté (déplacer un exemple casse des tests : constat bloquant, 2 échecs reproduits sur `tests/briefs.test.ts`) ; glissement traité comme acquis, ordres A et B présentés ; loi montagne scindée (8.3.1a publiable, 8.3.1b tableau) ; 8.3.3 présenté comme demande de changement, rattachement de STOP et du triangle à trancher, repli écrit pour le triangle, promesse « 27 cas ou plus » retirée ; tout vers `integration/vague-a` sauf le garde-fou et `docs/` ; demande de changement n° 17 pour la porte 8 par lots ; liste « à lancer maintenant » ; 7.3 limité à « à propos », accueil et mentions légales séparés, brouillon du parcours par Claude retiré (contraire à la consigne validée) ; ligne de validation écrite par page ; images, `lastmod`, listes Lighthouse inscrits.
- **Écarté** : placer le livrable technique 8.3.0 en tout premier. La loi montagne se complète sur place dans `exemples/`, où les tests actuels passent (encadré et empreinte inchangés) ; 8.3.0 vient juste après, avant tout déplacement.
- **Pas de seconde revue** : la correction du point bloquant est un livrable à part (8.3.0), qui aura sa propre revue.
- **Reste à vérifier** : les constats sur `porte6`, `modeles`, R1 et le tableau des notices viennent d'une lecture du code, pas d'une exécution (`npm ci` impossible en local : la CI fera foi) ; symbole du triangle dans les PDF Seat, Peugeot et Toyota ; saisonnalité des recherches « loi montagne », non mesurée ; comportement du futur garde-fou sur les commits venus de la branche d'intégration.
