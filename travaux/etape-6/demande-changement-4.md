# Demande de changement n° 4 : grille, définition de l'urgence « À faire tout de suite » (décision D12)

Proposée le 28/10/2026, au départ de l'étape 6, après une revue indépendante (« à corriger », rien de bloquant ; formulation reprise de la revue, ajout d'une consigne de notice retiré). **Acceptée par Houssem le 28/10/2026 (8 h 27).** Fusion seulement sur sa demande.

## Élément concerné
Grille des niveaux de verdict et d'urgence, validée avec la demande n° 3 (23/10/2026) : `src/schemas/grille.ts`, urgence `immédiate`, champ `definition` (texte qui explique le niveau au lecteur). Vue générée : `docs/08_structure_contenus.md` §6.

## Changement proposé
Seule la définition change ; le libellé « À faire tout de suite », les consignes de notice et le tableau des urgences admises ne changent pas.
- **Avant** : « Sans attendre : au premier arrêt possible, ou en allant directement au garage si la conduite est permise. »
- **Après** : « Sans attendre, dès que c'est sans danger et dans l'ordre indiqué par l'action : les gestes de conduite en roulant (lever le pied, ralentir, rouler pour nettoyer le filtre à particules) ; l'arrêt, la vérification ou l'appoint au premier endroit sûr ; le passage au garage en y allant directement, si l'action permet de rouler. »

## Raison (données)
- 21 lignes sur 25 de la base validée (`data/voyants.json`) ont l'urgence « immédiate ».
- Pour 2 d'entre elles, l'action se fait **en roulant** :
  - `fap` : « roulez une vingtaine de minutes à allure soutenue et régulière » ;
  - `esp-clignotant` : « levez le pied et adaptez tout de suite votre vitesse ».

  La définition actuelle (« au premier arrêt possible, ou en allant directement au garage ») contredit ces actions : un lecteur qui la suit s'arrête au lieu de régénérer le filtre, ou cherche à s'arrêter pendant un dérapage.
- 4 lignes en « arrêt immédiat » enchaînent un geste en roulant puis l'arrêt :
  - `moteur-orange-clignotant` (« levez le pied, puis arrêtez-vous ») ;
  - `pression-pneus` (« ralentissez […] et arrêtez-vous ») ;
  - `abs-et-frein` (« en freinant progressivement ») ;
  - `direction-rouge` (« tenez fermement le volant »).

  La nouvelle définition suit l'ordre de l'action (geste en roulant, puis arrêt) au lieu d'opposer les deux. L'ancienne ne parlait que de l'arrêt.
- Les 15 autres lignes restent couvertes :
  - arrêt (`moteur-rouge`, `temperature-rouge`…) ;
  - vérification ou appoint au premier endroit sûr (`huile-niveau`, `adblue-reserve`, `pression-pneus-systeme`) ;
  - garage en y allant directement (`airbag-defaut`, `abs`, `esp-defaut`, `direction-orange`, `adblue-defaut`).

## Impact sur ce qui est validé
| Élément | Impact | Preuve |
|---|---|---|
| Base voyants (`data/voyants.json`, 25 lignes) | Aucun : ni verdict, ni urgence, ni action, ni citation ne change | L'empreinte d'une ligne (`src/lib/empreinte.ts`, `empreinteVoyant`) ne contient aucun texte de la grille. Recalcul des 25 empreintes après le changement : 25 identiques, 0 différente |
| Validation du paquet (`travaux/etape-5/validation.json`, archive `claude/etape5_paquet_valide.md`) | Aucun. Le paquet affichait les libellés, pas les définitions ; l'archive reste le procès-verbal du 24/10 | `scripts/lib/brouillon.ts` n'écrit que `libelle` ; la définition n'apparaît dans le paquet qu'au texte de D12 |
| Pages éditoriales et encadrés | Aucune page n'existe. L'empreinte d'un encadré ne contient pas les définitions | `src/content` sans page éditoriale ; `empreintePage` ne lit que la question, les lignes et le coût |
| Contrôles R8 (cohérence) et R9 (encadré) | Aucun : ils lisent les libellés et le tableau des urgences admises, inchangés. Afficher la nouvelle définition dans une ligne d'encadré ne déclenche pas R9 (elle ne contient aucun des 8 libellés de niveau, vérifié après normalisation) | `src/lib/controle.ts` l. 709-716 |
| Pages de test (`tests/fixtures`) | Aucun : elles n'affichent que les libellés | Recherche de l'ancienne définition dans `tests/` : 0 occurrence |
| `docs/08` §6 | Une cellule régénérée par `npm run grille:vue` | Diff de la branche |
| Section méthode de « à propos » (étape 6, à rédiger) | Reprendra la nouvelle définition, générée depuis la grille | – |

## Contrôles à relancer
- `npm run grille:vue` (docs/08 à jour) : fait en local.
- Recalcul des 25 empreintes de la base : fait en local (25 identiques).
- `npm run schemas`, `npm test`, `npm run build`, `npm run liens` : par la CI de la pull request, car le registre npm n'est pas joignable depuis cette session. `npm test` comprend le test « docs/08 à jour », la base versée avec ses empreintes (R4), R8 et les pages de test R9.

## Suite
- Branche `etape-6/dc4-grille-urgence` et pull request (grille, docs/08, ce document).
- CI verte exigée.
- Décision inscrite au journal (04).
- Fusion seulement sur demande de Houssem.
