# Paquet de validation, livrable 7.4a : accueil

Branche `etape-7/accueil` (PR empilée sur #27). **Ce que Houssem valide** : le texte de l'accueil (H1, deux paragraphes, phrase d'accès à l'outil, `title`, `description`). La liste des pages, l'accès à l'outil et le lien vers « à propos » sont générés et contrôlés : rien à valider.

## 1. Ce que le livrable produit

- `src/lib/accueil.ts` : texte et générateur `accueilHtml`. `src/pages/index.astro` s'en sert (sur `main`, l'accueil reste l'écran « bientôt en ligne » jusqu'à la mise en ligne).
- Générés depuis le plan et les pages construites, jamais écrits à la main : accès à l'outil voyants (seulement si l'outil est construit), liste des pages éditoriales par thème (ordre du plan, thèmes sans page omis), lien vers « à propos » (seulement si construite). Aucun lien dans le texte : le plan n'en déclare aucun pour l'accueil.
- Contrôles ajoutés : ACCUEIL-LISTE (la liste = exactement les pages construites, chacune une fois, sous son thème) et ACCUEIL-LIEN (outil et « à propos » : seulement si construits, et vers eux). Tests : `tests/accueil.test.ts`, `tests/accueil-controle.test.ts`.
- Consigne du brief de l'accueil corrigée (le champ `description` existe depuis la demande de changement n° 13).

## 2. Le texte à valider

- **H1** : Votre voiture vous alerte, on vous dit quoi faire.
- **Title** : decodauto.com : votre voiture vous alerte, on vous dit quoi faire
- **Description** : Voyant allumé, code défaut, bruit suspect ou obligation : pouvez-vous rouler, avec quelle urgence, quoi faire. Un guide indépendant, sans pièces à vendre.
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
