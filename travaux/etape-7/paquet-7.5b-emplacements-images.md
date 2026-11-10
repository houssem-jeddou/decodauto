# Paquet de validation, livrable 7.5b : emplacements publicitaires (factices) et règle des images

Branche `etape-7/emplacements-images` (PR #31, brouillon, empilée sur #30). Aucun verdict de sécurité ni texte publié n'est touché. **Ce que Houssem valide** : l'interprétation de la porte de l'étape 7 (§3, point 1).

## 1. Ce que le livrable produit

- `src/lib/emplacements-pub.ts` : un seul emplacement prévu, `fin-de-contenu`, posé par le gabarit (`basDePage`) au bas du contenu des pages éditoriales, avant les pages liées et « Sources ». **Vide en production.** Factice (« Publicité », « Emplacement factice de test ») seulement dans la construction de recette (`AVEC_EXEMPLES=1`, `dist-exemples`, jamais déployée).
- `src/styles/site.css` : `.emplacement-pub` réserve 340 px de hauteur (le plus grand format courant, 336 × 280, plus l'étiquette, les marges et le cadre du bloc) : une publicité qui se charge ne déplace pas le texte.
- Contrôles : `PUB-PRODUCTION` (aucune publicité, aucun bloc ni script AdSense dans la construction de production), `PUB-EMPLACEMENT` (en recette : exactement l'emplacement prévu sur chaque page éditoriale, après l'encadré, avant « Sources », étiqueté « Publicité » ; aucun sur l'accueil, la 404 ni le socle), `PUB-HAUTEUR-RESERVEE`, et pour les images `IMAGE-ALT`, `IMAGE-DIMENSIONS`, `IMAGE-CHARGEMENT`. La règle R9 (jamais avant l'encadré ni dedans) existait déjà.
- Tests : `tests/emplacements-pub.test.ts` (sans dépendance), `tests/emplacements-controle.test.ts` (CI).

## 2. Choix retenus (règle du 10/11 : on part de la recommandation de Claude)

1. **Pages éditoriales seulement.** Pas d'emplacement sur l'accueil (une liste de liens, sans texte à monétiser), la 404 ni les pages du socle (mentions légales, « à propos », confidentialité) : une publicité sur une page légale ou sur la page qui établit ta crédibilité d'auteur dessert la confiance, et AdSense n'y gagnerait rien.
2. **Un seul emplacement, au bas du contenu.** Le lecteur vient pour la décision et la marche à suivre : rien ne s'insère entre l'encadré et le texte. Un deuxième emplacement se décidera avec AdSense (étape 12), mesures de CLS à l'appui, et passera par ce même module.
3. **Hauteur réservée en dur (340 px)** plutôt qu'un bloc qui se dimensionne au chargement : c'est la seule façon de garantir un CLS nul pour cet emplacement.
4. **Règle des images** posée dès maintenant, bien que le site n'ait aucune image : une image ajoutée plus tard (photo réelle d'un élément unique, étape 8) ne peut pas dégrader le CLS ni l'accessibilité sans faire échouer la construction. Une image d'un autre site reste refusée par TIERS-RESSOURCE.

## 3. Porte de l'étape 7 : ce que ce livrable change

Le critère de `docs/03` dit : « Lighthouse mobile ≥ 95 et CLS < 0,1 sur les pages du socle (emplacements factices dans une construction de test) ». **Interprétation retenue** : les emplacements n'existent que sur les pages éditoriales ; la mesure avec emplacements factices porte donc sur celles-ci (le job « Recette des exemples » mesure déjà `voyants`, `voyants/moteur`, `codes-defaut/p0087`, `loi-montagne`), et les pages du socle (`mentions-legales`, `a-propos`) sont mesurées dans le même job, sans emplacement puisqu'elles n'en portent pas. Le critère garde son intention (la publicité ne dégrade pas la page) ; sa lettre (« pages du socle ») s'applique à des pages qui n'ont pas d'emplacement. **À valider avec la porte 7** ; si tu préfères un emplacement sur « à propos », c'est une ligne dans `gabarit.ts` et une exception dans `PUB-EMPLACEMENT`.

## 4. Preuves

- CI du commit de la PR : Contrôles (schémas, tests, build, liens), Recette des exemples rédigés (construction avec emplacements factices, contrôles `PUB-EMPLACEMENT` en recette, Lighthouse mobile sur 6 pages avec seuils : performance, accessibilité et bonnes pratiques ≥ 0,95, CLS ≤ 0,1), Lighthouse mobile de production, Production : tous verts.
- Local, sans dépendance : `node --test tests/emplacements-pub.test.ts` (3 passent). Les tests de contrôle (cheerio) ne tournent qu'en CI.

## 5. Revue indépendante (une revue, verdict « acceptable », rien de bloquant)

- **Important, corrigé** : la phrase « 280 px couvre un 300 × 250 et son étiquette » était fausse avec ce CSS (étiquette, marges, remplissage et bordure comptent) : la réserve passe à 340 px, calculée dans `emplacements-pub.ts`. Et `PUB-HAUTEUR-RESERVEE` pouvait se taire si Astro placait la feuille dans les balises `<style>` des pages : il lit maintenant les fichiers `.css` et les balises `<style>`, et échoue si aucune source de style n'est trouvée.
- **Mineurs, corrigés** : l'ordre « avant les pages liées » (annoncé, non contrôlé) l'est désormais ; le bloc factice est exclu de la part de texte cité (CITATIONS-PART) ; test d'une page complète sans emplacement en production (HTML identique octet pour octet) et avec emplacement en recette.
- **Écartés** : `alt=""` seul, `loading="eager"` et images Markdown refusés par la règle des images : voulu, une image ajoutée plus tard passera par un composant qui pose ces attributs (étape 8) ; « Publicité » annoncé deux fois par un lecteur d'écran (négligeable, sans objet pour un bloc factice) ; deux définitions d'une publicité (`controle.ts` pour R9, `dist.ts` pour PUB-*) et variable `AVEC_EXEMPLES` lue à trois endroits : un désaccord fait échouer un contrôle, sans danger.
- **Noté** : la mesure du CLS en recette est triviale (bloc statique) ; la mesure utile se fera avec de vraies annonces à l'étape 12. L'emplacement collé aux pages liées est à surveiller à l'étape 12 (AdSense interdit les annonces qui ressemblent à de la navigation).
- **Confirmé** : aucun chemin vers la production (seul l'artefact du job « contrôles » est déployé ; PUB-PRODUCTION s'applique sans `--exemples`).

## 6. Limites connues

- Les valeurs Lighthouse ne sont pas imprimées dans le journal de la CI (seuils vérifiés, pas de score affiché) ; les rapports sont conservés par le job de production, pas par la recette.
- Une publicité réelle (AdSense) peut avoir une autre hauteur : 340 px couvre 336 × 280 et 300 × 250 ; un format plus haut demandera de revoir la hauteur réservée (étape 12). La mesure de CLS en recette est triviale (bloc statique) : la mesure utile se fera avec de vraies annonces à l'étape 12.

## 7. Validation

Validé par Houssem le 10/11/2026 à 14:18 (« Je valide »), y compris l'interprétation de la porte de l'étape 7 (§3) : emplacements sur les pages éditoriales seulement, mesure avec emplacements factices sur celles-ci.
