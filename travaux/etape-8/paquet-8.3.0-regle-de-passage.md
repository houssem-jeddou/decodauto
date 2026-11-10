# Paquet de validation, livrable 8.3.0 : règle de passage d'une page rédigée

PR #26 (brouillon, vers `integration/vague-a`). Ce que Houssem valide : **la règle** (`travaux/etape-8/regle-de-passage.md`), parce qu'elle touche les tests de la porte 6. Aucun verdict de sécurité, aucun encadré de décision, aucune page déplacée dans ce livrable.

## 1. La règle en bref

- Une page rédigée et validée reste dans `exemples/<type>/<id>.md` jusqu'à la pull request de mise en ligne, puis passe dans `src/content/<type>/<id>.md` par `npm run passage -- <id> --appliquer` (sans l'option : essai à blanc), sur ta demande.
- Avant tout déplacement, la commande refuse si : l'identifiant n'est pas dans le plan ; l'empreinte de validation recalculée diffère de celle du fichier ; « à propos » n'est pas en ligne ou n'a pas la fiche de l'auteur ; l'adresse est déjà dans `lighthouserc.json`.
- Elle déplace, régénère les briefs et ajoute l'adresse à la liste Lighthouse de production.

## 2. Ce que le livrable change dans les contrôles

| Élément | Avant | Après | Contrôle allégé ? |
|---|---|---|---|
| Porte 6 (`tests/porte6.test.ts`) | lit `exemples/<type>/` | lit `src/content` et `exemples/` ; mêmes assertions (id du plan, type, vague A, empreinte = validation) ; + nom de fichier = identifiant | Non, renforcé |
| Briefs, modèles, outil voyants, socle | chemin `exemples/…` en dur | `localiserPage` / `pageRedigee` | Non, mêmes assertions |
| Nouveau `tests/passage.test.ts` | — | 17 tests (conditions, refus, doublon, Lighthouse, rappels, état du dépôt) | Ajout |

## 3. Preuves

- CI du commit `dbb957c` (avant corrections de revue) : Contrôles, Recette des exemples, Lighthouse, Production : tous verts (https://github.com/houssem-jeddou/decodauto/actions/runs/42795292149).
- En local : `node --test tests/passage.test.ts` 17/17 ; `tests/briefs.test.ts` 18/18 ; `node scripts/briefs.ts` : « Briefs déjà à jour (23 fichiers) ».
- Les tests `porte6`, `modeles`, `outil-voyants`, `socle` ne tournent qu'en CI (astro, cheerio, yaml absents ici). CI du commit `4a3e0b5` (après corrections de revue) : Contrôles (schémas, tests, build, liens), Recette des exemples, Lighthouse, Production : tous verts. Un premier essai (`ac01165`) avait échoué sur une faute de guillemets dans un titre de test que j'avais introduite ; corrigée, rien d'autre n'a changé.

## 4. Revue indépendante

Verdict : **acceptable**, rien de bloquant. Elle a comparé `porte6` ligne à ligne (aucune assertion affaiblie), simulé le passage de `loi-montagne` dans un dossier temporaire (un seul brief change, une ligne ; 34/34 tests locaux après passage).

Retenu et corrigé : (important) la condition « à propos » ne vérifiait que l'existence du fichier → elle vérifie maintenant la fiche de l'auteur ; rappels `ci.yml` rendus exacts (c'est « à propos » qui retire les quatre `--attendu`) ; la commande prépare le texte de `lighthouserc.json` avant `git mv` ; libellés périmés des tests et phrase trop forte de `CLAUDE.md` corrigés.
Écarté / reporté : doublons par nom de fichier et `pagesDuType` non récursif (même limite qu'avant, notée) ; page de vague C et durée Lighthouse (notées dans « Limites connues », à traiter à leur tour).
Non vérifié par la revue : les tests qui exigent astro/cheerio/yaml, une construction de production avec une vraie page dans `src/content`.

## 5. Ce qu'il faut savoir

Le lot 8.3 est bloqué à la mise en ligne tant que « à propos » (7.3, qui demande ton parcours) n'est pas écrite : c'est voulu et à inscrire au journal.

## 6. Validation

Validé par Houssem le 10/11/2026 (« Je valide, on enchaîne sur la partie suivante »).
