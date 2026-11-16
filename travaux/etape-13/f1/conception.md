# Lot F1, mise en œuvre : document de conception (règle 15)

Version 1, 15/11/2026 (23 h 50). Branche `etape-13/f1-modeles`. Rédigé avant le code, comme le demande la règle 15 de `docs/03` (« conception visuelle avant intégration ») ; il sera relu par la revue indépendante de la porte de F1, avec le code et les captures.

Références : demande de changement n° 30 (§4, règles 2a à 2m ; §8, précisions 2a et 2i), charte graphique `docs/11_charte_graphique.md` (piste B), pilote validé (`travaux/etape-13/pilote-f1/`, branche `etape-13/pilote-f1` : générateur, feuille de style, polices, porte).

## 1. Ce que F1 change en production : rien de visible, jusqu'aux lots F2 et F3
La demande n° 30 prévoit que les 17 encadrés en ligne soient revalidés (empreintes recalculées, ligne d'écart nouvelle) et que l'encadré de « pression des pneus » soit nouveau : les pages en ligne ne peuvent donc pas changer d'aspect à la fusion de F1. Décision :
- **Format par page.** Champ `format` du frontmatter : `1` (actuel, par défaut) ou `2` (nouveau). Une page passe au format 2 dans la pull request de son lot (F2, F3), avec la nouvelle empreinte de son encadré validée par Houssem. Les pages des vagues B et C naissent au format 2 (contrôle : type panne, dossier ou fluide au format 1 refusé).
- **Tout suit le format de la page** : modèle, en-tête, pied de page et feuille de style. Une page est entièrement à l'ancien format ou entièrement au nouveau ; jamais un mélange.
- L'accueil et les pages du socle portent aussi le champ (F3) ; la page 404 suit l'accueil.
- **Après F3**, toutes les pages sont au format 2 : le code du format 1 et sa feuille de style sont retirés par une pull request de nettoyage.
- Conséquence visible pendant la transition (environ dix jours) : en passant d'une page à l'autre, le lecteur peut voir les deux en-têtes. Accepté : c'est le prix de pages en ligne qui ne changent qu'après validation.

## 2. Deux feuilles de style sans conflit
Aujourd'hui, `src/layouts/Base.astro` importe `src/styles/site.css`, qu'Astro relie à chaque page (`/_astro/Base.<empreinte>.css`). Deux feuilles importées ainsi seraient toutes deux sur chaque page. Décision : chaque feuille est importée comme texte traité par Vite (`?inline`, minifiée à la construction) et la page reçoit la sienne seule, en ligne dans un `<style>` :
- `src/styles/site.css` : format 1, inchangé ;
- `src/styles/charte-b.css` : format 2, tiré de la piste B du pilote (base commune et règles `[data-piste="b"]`, sans les pistes A et C ni le sélecteur de piste) ; police de titre Outfit servie par le site (`public/polices/`, licence OFL à côté), `font-display: optional`.
- Effet sur les pages en ligne : leur feuille passe d'un fichier relié à un bloc en ligne, au même contenu. Lighthouse le mesure avant la fusion (aucune requête en plus ; quelques kilo-octets de HTML).
- Contrôle : chaque page construite a exactement une feuille, celle de son format (marqueur `--charte` dans la feuille).

## 3. Données nouvelles (champs facultatifs jusqu'aux paquets de F2 et F3)
| Donnée | Où | Validée par |
|---|---|---|
| Ligne d'écart courte (25 mots au plus, marques plus et moins strictes) | `ecart_court` de chaque ligne de `data/voyants.json` dont les marques divergent | paquet de F2 (empreinte de la ligne) |
| Ce que demande la notice (colonne du tableau compact) | `demande` de chaque citation de la ligne | paquet de F2 |
| Réponse directe d'une page informative | `reponse_directe` du frontmatter | paquet de F3 (pression des pneus) |
| Visuel qui montre où regarder | `illustration` du frontmatter : fichier `src/illustrations/<id>.svg`, texte alternatif, légende | paquet du lot de la page |
| Repère du verdict d'une section | `{{repere:<voyant>}}` ou `{{repere:ligne-<n>}}` juste sous un H2 du texte rédigé | relecture du lot |

- **Empreintes** : l'empreinte d'une ligne de la base couvre `ecart_court` et `demande` s'ils sont présents ; absents, elle reste celle d'aujourd'hui (aucune revalidation avant F2). L'empreinte d'une page au format 2 couvre ce que son encadré affiche au format 2 (écart court, réponse directe) ; celle d'une page au format 1 ne change pas.
- Une page au format 2 qui affiche une ligne sans `ecart_court` alors que les marques divergent, une page informative sans `reponse_directe`, ou une page sans `illustration` : erreur de construction.

## 4. Composants : place et dessin
**Déjà dessinés et validés dans le pilote** (charte graphique §4) : bandeau, tête de page, encadré (situations, ligne d'écart, coût), réponse directe, bloc « Notices / Base du coût », illustration, sommaire, repère de section, cartes du corps, tableaux, tableau des notices compact, pages liées, pied de page, accueil, emplacement publicitaire factice. Ordre de la page éditoriale : charte graphique §4 (de la mention en tête aux sources).

**À dessiner avant leur intégration** (maquette dans le générateur du pilote, captures 375 × 667 et 1366 × 800, police chargée et police de secours, états courts et longs), dans cet ordre :
1. outil voyants : filtre par couleur, index des dessins en grille sur téléphone (règle 2k), groupes, lignes, pages citées repliées ;
2. page code défaut : fiche du code, cas décrits par marque ;
3. pages pneus et obligations : fiche « Le texte en bref » (loi montagne : période et zones) ;
4. bloc « Dépannage sur autoroute » (pages à verdict d'arrêt) ;
5. pages du socle : « à propos » (fiche auteur, section « Méthode »), mentions légales (bloc des mentions, politique de confidentialité), page 404 ;
6. modèles panne et dossier (vague B) : fiche du symptôme, arbre de décision, fiche du tutoriel et étapes, historique du dossier.

## 5. Contrôles (règle 4) et documents
- Règles mesurables de la demande n° 30 devenues contrôles sur le site construit : ligne d'écart de 25 mots au plus (2b), réponse directe en tête de l'encadré (2c), repère sous un H2 et lié à une ligne de l'encadré (2d), extraits dépliables au libellé unique (2f), « Sources » repliée avec le nombre (2g), sommaire dès trois H2 dans le corps (2h ; approximation des six écrans, la porte vérifie qu'aucune page de plus de six écrans n'en manque), visuel après l'encadré (2i), sommaire hors de la part citée (CITATIONS-PART, 2j), encadré premier bloc après le H1 et aucune publicité avant (R9, 2m).
- Mesures de hauteur (2a, 2i : premier écran, trois écrans) : à la porte de chaque lot, sur les pages construites, police chargée et police de secours ; la CI ne lance pas de navigateur.
- Charte éditoriale 10 (§3.5, §4) et structure 08 mises à jour dans la même pull request ; `CONTROLES.md` complété.

## 6. Vérification visuelle
Le dépôt ne se construit pas dans l'environnement de Claude tant que les installations de paquets sont fermées (`npm ci` hors ligne échoue) ; les artefacts de la CI n'y sont pas téléchargeables. Recommandation : ouvrir les installations de paquets pour la prochaine conversation, afin de construire le vrai site et de faire les captures de la porte sur lui. À défaut, aperçu local des modèles TypeScript (Node 22 exécute le TypeScript du dépôt) et captures Playwright, la CI restant juge des contrôles.

## 7. Découpage
1. **F1.1** architecture : champ `format`, feuilles de style, données nouvelles, empreintes, contrôles de structure ; aucun changement visible en ligne.
2. **F1.2** piste B sur le modèle voyant, avec les composants déjà dessinés, et l'accueil ; exemples voyant moteur et AdBlue au format 2 dans la construction de recette.
3. **F1.3** composants du §4 à dessiner, un par un (maquette, captures, puis code).
4. **F1.4** contrôles 2a à 2m, charte 10 et 08, porte du format : critères avec preuves, revue indépendante, validation de Houssem.
