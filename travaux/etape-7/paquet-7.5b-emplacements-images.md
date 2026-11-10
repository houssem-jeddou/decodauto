# Paquet de validation, livrable 7.5b : emplacements publicitaires (factices) et règle des images

Branche `etape-7/emplacements-images` (PR #31, brouillon, empilée sur #30). Aucun verdict de sécurité ni texte publié n'est touché. **Ce que Houssem valide** : l'interprétation de la porte de l'étape 7 (§3, point 1).

## 1. Ce que le livrable produit

- `src/lib/emplacements-pub.ts` : un seul emplacement prévu, `fin-de-contenu`, posé par le gabarit (`basDePage`) au bas du contenu des pages éditoriales, avant les pages liées et « Sources ». **Vide en production.** Factice (« Publicité », « Emplacement factice de test ») seulement dans la construction de recette (`AVEC_EXEMPLES=1`, `dist-exemples`, jamais déployée).
- `src/styles/site.css` : `.emplacement-pub` réserve 280 px de hauteur (un rectangle de 300 × 250 et son étiquette) : une publicité qui se charge ne déplace pas le texte.
- Contrôles : `PUB-PRODUCTION` (aucune publicité, aucun bloc ni script AdSense dans la construction de production), `PUB-EMPLACEMENT` (en recette : exactement l'emplacement prévu sur chaque page éditoriale, après l'encadré, avant « Sources », étiqueté « Publicité » ; aucun sur l'accueil, la 404 ni le socle), `PUB-HAUTEUR-RESERVEE`, et pour les images `IMAGE-ALT`, `IMAGE-DIMENSIONS`, `IMAGE-CHARGEMENT`. La règle R9 (jamais avant l'encadré ni dedans) existait déjà.
- Tests : `tests/emplacements-pub.test.ts` (sans dépendance), `tests/emplacements-controle.test.ts` (CI).

## 2. Choix retenus (règle du 10/11 : on part de la recommandation de Claude)

1. **Pages éditoriales seulement.** Pas d'emplacement sur l'accueil (une liste de liens, sans texte à monétiser), la 404 ni les pages du socle (mentions légales, « à propos », confidentialité) : une publicité sur une page légale ou sur la page qui établit ta crédibilité d'auteur dessert la confiance, et AdSense n'y gagnerait rien.
2. **Un seul emplacement, au bas du contenu.** Le lecteur vient pour la décision et la marche à suivre : rien ne s'insère entre l'encadré et le texte. Un deuxième emplacement se décidera avec AdSense (étape 12), mesures de CLS à l'appui, et passera par ce même module.
3. **Hauteur réservée en dur (280 px)** plutôt qu'un bloc qui se dimensionne au chargement : c'est la seule façon de garantir un CLS nul pour cet emplacement.
4. **Règle des images** posée dès maintenant, bien que le site n'ait aucune image : une image ajoutée plus tard (photo réelle d'un élément unique, étape 8) ne peut pas dégrader le CLS ni l'accessibilité sans faire échouer la construction. Une image d'un autre site reste refusée par TIERS-RESSOURCE.

## 3. Porte de l'étape 7 : ce que ce livrable change

Le critère de `docs/03` dit : « Lighthouse mobile ≥ 95 et CLS < 0,1 sur les pages du socle (emplacements factices dans une construction de test) ». **Interprétation retenue** : les emplacements n'existent que sur les pages éditoriales ; la mesure avec emplacements factices porte donc sur celles-ci (le job « Recette des exemples » mesure déjà `voyants`, `voyants/moteur`, `codes-defaut/p0087`, `loi-montagne`), et les pages du socle (`mentions-legales`, `a-propos`) sont mesurées dans le même job, sans emplacement puisqu'elles n'en portent pas. Le critère garde son intention (la publicité ne dégrade pas la page) ; sa lettre (« pages du socle ») s'applique à des pages qui n'ont pas d'emplacement. **À valider avec la porte 7** ; si tu préfères un emplacement sur « à propos », c'est une ligne dans `gabarit.ts` et une exception dans `PUB-EMPLACEMENT`.

## 4. Preuves

- CI du commit de la PR : Contrôles (schémas, tests, build, liens), Recette des exemples rédigés (construction avec emplacements factices, contrôles `PUB-EMPLACEMENT` en recette, Lighthouse mobile sur 6 pages avec seuils : performance, accessibilité et bonnes pratiques ≥ 0,95, CLS ≤ 0,1), Lighthouse mobile de production, Production : tous verts.
- Local, sans dépendance : `node --test tests/emplacements-pub.test.ts` (3 passent). Les tests de contrôle (cheerio) ne tournent qu'en CI.

## 5. Limites connues

- Les valeurs Lighthouse ne sont pas imprimées dans le journal de la CI (seuils vérifiés, pas de score affiché) ; les rapports sont conservés par le job de production, pas par la recette.
- Une publicité réelle (AdSense) peut avoir une autre hauteur : 280 px couvre 300 × 250 ; un format plus haut demandera de revoir la hauteur réservée (étape 12).
