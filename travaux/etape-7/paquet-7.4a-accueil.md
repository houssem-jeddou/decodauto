# Paquet de validation, livrable 7.4a : accueil

Branche `etape-7/accueil` (PR empilée sur #27). **Ce que Houssem valide** : le texte de l'accueil (H1, deux paragraphes, phrase d'accès à l'outil, `title`, `description`). La liste des pages, l'accès à l'outil et le lien vers « à propos » sont générés et contrôlés : rien à valider.

## 1. Ce que le livrable produit

- `src/lib/accueil.ts` : texte et générateur `accueilHtml`. `src/pages/index.astro` s'en sert (ce changement vit sur la branche d'intégration `integration/vague-a` : l'écran « bientôt en ligne » de `main` n'est remplacé qu'à la mise en ligne).
- Générés depuis le plan et les pages construites, jamais écrits à la main : accès à l'outil voyants (seulement si l'outil est construit), liste des pages éditoriales par thème (ordre du plan, thèmes sans page omis), lien vers « à propos » (seulement si construite). Aucun lien dans le texte : le plan n'en déclare aucun pour l'accueil.
- Contrôles ajoutés : ACCUEIL-LISTE (la liste = exactement les pages construites, chacune une fois, sous son thème) et ACCUEIL-LIEN (outil et « à propos » : seulement si construits, et vers eux). Tests : `tests/accueil.test.ts`, `tests/accueil-controle.test.ts`.
- Consigne du brief de l'accueil corrigée (le champ `description` existe depuis la demande de changement n° 13).

## 2. Le texte à valider

- **H1** : Votre voiture vous alerte, on vous dit quoi faire.
- **Title** : decodauto.com : voyant allumé, code défaut, que faire ? (55 caractères ; contient les mots de la requête, le H1 porte le positionnement)
- **Description** : Voyant allumé, code défaut, bruit suspect ou obligation : peut-on rouler, avec quelle urgence, que faire. Un guide indépendant, sans pièces à vendre.
- **Paragraphe 1** : Un voyant s'allume, un code défaut s'affiche, un bruit inhabituel apparaît ou une obligation approche : chaque page commence par la décision. Elle dit si l'on peut rouler, avec quelle urgence, ce que cela risque de coûter et quoi faire.
- **Paragraphe 2** : Le site est indépendant : il ne vend ni pièces, ni diagnostic, ni service. Les verdicts viennent des notices des constructeurs et de sources officielles, citées sur chaque page.
- **Accès à l'outil** (si construit) : Un voyant vient de s'allumer ? Retrouvez-le dans la liste des voyants
- **Titre de la liste** : Les pages du site ; thèmes : libellés de `docs/02`.

Aucun chiffre, aucune promesse, pas de « nous ».

## 3. À confirmer

1. Le texte ci-dessus, tel quel ou retouché.
2. La phrase « Les verdicts viennent des notices des constructeurs et de sources officielles » : vraie pour toute page publiée (règle de `docs/01`) ; je la garde.

## 4. Preuves

CI de la PR (voir le commentaire de la revue plus bas) ; tests locaux sans dépendance : `node --test tests/accueil.test.ts` (11 passent). Les contrôles sur le site construit passent par la CI.

## 5. Revue indépendante

Verdict : **acceptable, à corriger avant fusion** (rien de bloquant dans le code ; générateur, contrôles et câblage relus et rejoués à la main).
- **Corrigé** : documentation qui annonçait un écran « bientôt en ligne » sur `main` sans préciser que le changement vit sur la branche d'intégration ; « validés par Houssem » écrit avant validation (CLAUDE.md) ; « dans l'ordre du plan » promis par le catalogue sans contrôle (retiré : l'ordre est celui du générateur) ; test du plan de l'accueil élargi (mots-clés vides, pas de page mère) ; title ramené à 55 caractères avec les mots de la requête (le précédent faisait 65) et description à 149 caractères, mieux enchaînée ; styles minimaux des blocs de l'accueil.
- **Écarté / à noter** : le H1 reste le positionnement (prescrit par le brief ; la charte §3.4 préfère la question du lecteur, mais l'accueil n'est pas une page de décision) ; l'espace avant « : » dans `title` et `description` n'est pas insécable, comme sur toutes les pages du dépôt (écart commun, hors de ce livrable, à proposer en idée reportée) ; la phrase d'ouverture de l'accueil et celle de « à propos » se ressemblent, deux textes courts validés séparément, sans risque de verdict.
- **Non vérifié** : build Astro et tests avec dépendances (la CI tranche).
