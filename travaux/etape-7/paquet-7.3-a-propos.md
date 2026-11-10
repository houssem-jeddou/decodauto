# Paquet de validation, livrable 7.3 : page « à propos »

PR #27 (brouillon, empilée sur #26). **Ce que Houssem valide** : ce que la page publie sur lui (la fiche) et le texte de la page. La section « Méthode » n'est pas à revalider : c'est le texte de la charte, déjà validé (empreinte `data/charte-validation.json`), ajouté par le modèle.

## 1. Ce que le livrable produit

- `exemples/socle/a-propos.md` : texte et fiche de l'auteur. Elle reste dans `exemples/` jusqu'à la pull request de mise en ligne et **passe la première** (règle de passage : toutes les autres pages renvoient vers sa section « Méthode »).
- Le modèle du socle affiche, sur cette page seulement, la fiche de l'auteur (champ `auteurs`, jamais recopiée dans le texte) puis la section « Méthode » (`#methode`). La construction échoue si l'une manque, ou si une fiche est saisie ailleurs.
- Contrôles ajoutés : METHODE-SECTION et AUTEUR-FICHE (`tests/socle.test.ts`, `CONTROLES.md`). La recette n'a plus d'erreur attendue : les quatre `--attendu LIEN-CASSE` vers `/a-propos/#methode` sont retirés (les liens « Méthode » aboutissent), et l'auteur n'est plus supposé : il vient de la fiche. Lighthouse mobile de `/a-propos/` ajouté à la recette.

## 2. La fiche de l'auteur, telle qu'elle sera publiée

> **Houssem Jeddou** : Diplômé en génie logiciel (ISSAT de Sousse), consultant technique sur Microsoft Dynamics 365 et Power Platform depuis 2020, aujourd'hui responsable technique d'une équipe de consultants. Il construit et vérifie des logiciels de gestion d'entreprise : il n'est pas mécanicien. Sur ce site, il fixe la méthode, vérifie chaque verdict sur sa source et en porte la responsabilité éditoriale. Il travaille depuis la Tunisie.

Je l'ai rédigée à partir de ce que tu m'as dit de ton parcours, **sans nommer d'employeur ni de client**. Rien d'autre n'est inventé : pas de motivation, pas de chiffre, pas de titre.

## 3. Ce qu'il faut que tu confirmes (une réponse par ligne)

1. **« depuis 2020 »** : date de tes débuts sur Dynamics 365 et Power Platform (freelance à temps partiel pendant tes études, puis salarié). Vrai à ton sens, ou « depuis 2022 » ?
2. **« responsable technique d'une équipe de consultants »** : tu acceptes de publier cela, sans nommer ton employeur ?
3. **« Il travaille depuis la Tunisie »** : tu veux le dire (cohérent avec la politique de confidentialité, qui le dit déjà) ou le retirer de la fiche ?
4. **« Diplômé en génie logiciel (ISSAT de Sousse) »** : l'intitulé exact de ton diplôme ? (J'ai évité « ingénieur diplômé », titre qui se lit de façon précise en France.)
5. **Lien LinkedIn** : le champ `profils` existe (données structurées « auteur », livrable 7.5). Je ne l'affiche pas dans ce livrable : un lien vers un autre site n'est permis que vers une source citée (R7-LIEN-EXTERNE). Tu veux qu'il soit publié et lu par Google comme profil de l'auteur ? À trancher en 7.5.

## 4. Le texte de la page (hors fiche et « Méthode »)

Trois sections, sans lien et sans « nous » : « Ce que le site fait » (la décision avant l'explication ; site indépendant : ni pièces, ni diagnostic, ni service, aucun lien avec un garage ou un constructeur ; voitures thermiques seulement, électrique, hybride, carte grise et assurance exclus), « Ce que le site n'est pas » (ni atelier, ni substitut à la notice ou à un professionnel ; aucun mécanicien ne le relit ; il ne répare pas de voitures), « Qui écrit, qui vérifie » (rédigé par une IA, mention en tête de chaque page, l'éditeur vérifie chaque verdict et la décision en haut de page avant publication, lien « Signaler une erreur » en bas de chaque page). Texte complet : `exemples/socle/a-propos.md`.

## 5. Preuves

- CI de la PR #27 : voir le résultat ci-dessous.
- Avant la mise en ligne : la réception de `erreur@decodauto.com` reste à confirmer par un courriel de test (journal, consigne de la charte §5.3) : la page promet que le lien ouvre un courriel.

## 6. Revue indépendante

Verdict : **à corriger** (un point bloquant mécanique, corrigé), le reste acceptable.
- **Bloquant, corrigé** : le brief de « à propos » (`travaux/etape-6/briefs/a-propos.md`) n'était plus à jour (il cite maintenant la page exemple) ; régénéré, et une consigne devenue fausse (« attendu comme LIEN-CASSE ») corrigée dans `consignes.json`.
- **Important, corrigé** : le nom de la fiche est comparé à `RESPONSABLE_EDITORIAL` (celui des signatures), et le texte ne répète plus son nom (« l'éditeur »).
- **À faire confirmer** : points 1 à 4 ci-dessus ; la phrase « ne réalise aucun essai sur véhicule », que la charte ne promet pas, est remplacée par « ne répare pas de voitures » (la formule de la Méthode).
- **Mineur, corrigé** : « chaque page de conseil » (l'accueil et le socle n'ont pas de décision) ; périmètre écrit comme `docs/02` (carte grise, assurance ; plus « valises » ni « démarches ») ; textes périmés (CONTROLES.md, CLAUDE.md, attendus.ts, commentaires, règle de passage et ses rappels : plus d'`--attendu` à retirer au passage de « à propos »).
- **Écarté** : style CSS de la fiche (mise en forme du socle, à traiter avec l'accueil) ; adresse de « à propos » lue dans le plan par le contrôle (inoffensif tant que le plan est figé).
- **Non vérifié** : les tests qui exigent astro et cheerio, le rendu Astro réel, Lighthouse de `/a-propos/` : décidés par la CI.

## 7. Validation

À écrire par Houssem : « Validé par Houssem le … », avec ses réponses aux points 1 à 5.
