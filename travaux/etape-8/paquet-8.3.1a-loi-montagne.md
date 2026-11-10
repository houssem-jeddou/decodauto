# Paquet de validation 8.3.1a : loi montagne, page publiable

Étape 8, vague A, livrable 8.3.1a (premier du découpage validé : `travaux/etape-8/decoupage-8.3.md`).

- **Page** : `exemples/pneus/loi-montagne.md` (adresse du plan `/loi-montagne/`). Elle reste dans `exemples/` : son passage dans `src/content` est le livrable 8.3.0. Aucune page réelle sur `main`.
- **Branche** : `etape-8/loi-montagne`, pull request en brouillon vers `integration/vague-a`.
- **Textes relevés le 10/11/2026** : `travaux/etape-8/textes/loi-montagne-sanctions-et-signalisation.md`.
- **Limite de la lecture** : Légifrance a refusé le navigateur de Claude (vérification anti-robot, non remplie). Tous les textes ci-dessous sont des **extraits de pages Légifrance renvoyés par la recherche web**, pas une lecture de la page en ligne. Ce qui ne peut pas être confirmé sans ton Chrome est listé en section 5.

## Ce que tu valides

1. **L'encadré de décision : inchangé.** Question, quatre lignes, citations, coût probable et empreinte `75abb315…` ne bougent pas (validés le 03/11/2026). Raison : aucun décret de sanction n'apparaît dans les extraits Légifrance (D314-8 toujours « en vigueur depuis le 01/11/2024 », chapitre « Pneumatiques (R314-1 à D314-8) » sans article de sanction). **Si ton contrôle de la section 5 trouve un décret, l'encadré change et tout est à revalider.**
2. **Le montant « aucune amende »** : texte et empreinte inchangés ; `verifie_le` reste au 28/10/2026 (revérification due avant le 27/11/2026). Je ne l'avance pas tant que ton contrôle du Journal officiel n'est pas fait : c'est lui qui la fonde.
3. **Les nouveaux passages du texte rédigé** (section 1).
4. **Les six sources ajoutées au registre** (section 2).
5. **Trois décisions** (section 3).

## 1. Texte rédigé : ce qui change

| Passage | Ce que la page dit | Source de première main |
|---|---|---|
| Où et quand (nouveau) | Zone annoncée par le panneau **B58** avec le panonceau « du 01/11 au 31/03 » ; sortie par le **B59** | Arrêté du 23/06/2021, art. 2 et 7 (extrait : « annoncée par un panneau B58, complété par un panonceau M11b1 portant la mention « du 01/11 au 31/03 » ») |
| Où et quand (nouveau) | Période du 1er novembre au 31 mars de l'année suivante, donc du 01/11/2026 au 31/03/2027 ; liée aux dates, pas à la neige | D314-8, IV (déjà au registre) |
| Peut-on rouler sans… | Au panneau B26, les pneus hiver sont admis pour voitures et utilitaires légers, sauf panonceau « Chaînes à neige obligatoires » (M9z) | Arrêté du 24/11/1967, art. 4 (« le port de pneumatiques hiver […] est admis pour le respect de cette prescription ») ; arrêté du 23/06/2021, art. 7. Corrobore la Sécurité routière (déjà citée) |
| Amende (titre : « peut-on être verbalisé ? ») | Aucun décret de sanction publié à la date de revue ; texte du montant validé inchangé | Réponse ministérielle du 12/02/2026 (déjà au registre, catégorie secondaire : n'a jamais fixé un verdict) |
| Amende, panneau B26 (nouveau) | Le non-respect du B26 est puni de l'amende de 2e classe, **plafonnée à 150 €** (plafond, pas le montant forfaitaire) ; confirmé par le ministère de l'Intérieur | Code de la route R411-26 ; Code pénal 131-13, 2° ; réponse ministérielle n° 3489 du 21/03/2023 (Assemblée nationale, catégorie secondaire, lue via résumé automatique) |
| Loi Montagne II / III (nouveau) | L'obligation vient de la loi du 28/12/2016 (art. 27) ; la loi n° 2026-797 du 18/08/2026 (Montagne III) ne contient pas de disposition sur pneus, chaînes ou code de la route | Décret 2020-1264, notice (Légifrance) ; loi 2026-797 (texte du JO reproduit par AIDA, catégorie secondaire) |

Dates : `date_modification` passe au 10/11/2026 ; `date_revue` reste au 03/11/2026 jusqu'à ton contrôle de la section 5.

Rectifications de la revue indépendante intégrées : phrase « lecture des textes, pas une position de l'administration » retirée (fausse : une réponse ministérielle de 2023 confirme la 2e classe) ; loi Montagne III citée par la loi promulguée, pas par le texte adopté ; B59 « en général » (sortie facultative dans certains cas) ; « hiver en cours » remplacé par un exemple de dates ; réponse du Sénat citée à l'endroit de l'affirmation.

## 2. Sources ajoutées au registre (`data/sources.json`, consultées le 10/11/2026)

| Id | Texte | Catégorie |
|---|---|---|
| `code-de-la-route-r411-26` | Code de la route, art. R411-26 | legifrance |
| `code-penal-131-13` | Code pénal, art. 131-13 | legifrance |
| `arrete-1967-11-24-signalisation` | Arrêté du 24/11/1967, art. 4 (panneau B26) | legifrance |
| `arrete-2021-06-23-signalisation` | Arrêté du 23/06/2021 (B58, B59, B26) | legifrance |
| `loi-2026-797-montagne-vivante-souveraine` | Loi n° 2026-797 du 18/08/2026 (texte du JO reproduit par AIDA) | secondaire (ne fixe aucun verdict) |
| `reponse-ministerielle-an-2023-03-21` | Réponse du ministre de l'Intérieur, QE n° 3489 | secondaire (ne fixe aucun verdict) |

## 3. Décisions (recommandation en premier)

1. **Phrase sur le B26 (2e classe, 150 € au plus).** Recommandation : la garder. Elle est étayée par R411-26, le Code pénal et une réponse ministérielle publiée au JO (relue par le relecteur indépendant). Elle répond à « loi montagne 2026 verbalisation ». Alternative : la retirer et revenir à « sa sanction n'est pas traitée ici ».
2. **Date de revue.** Recommandation : la passer au 10/11/2026 (prochaine revue avant le 10/05/2027, délai de 6 mois des pages pneus) seulement après ton contrôle de la section 5.
3. **Validation écrite de la page** (règle 7 de `docs/03`) : une ligne dans la pull request, après lecture du rendu de la construction de recette.

Le paquet contient aussi `travaux/etape-8/decoupage-8.3.md` (découpage que tu as validé, commité avec ce livrable).

## 4. Ce qui n'est pas dans cette page

- Les communes concernées (tableau par département) : livrable 8.3.1b. La page renvoie vers la liste de la Sécurité routière.
- L'écart « 34 départements » (Sécurité routière) contre 48 (sa page des arrêtés) : à trancher par la lecture des arrêtés préfectoraux en 8.3.1b ; la page n'avance aucun nombre.
- L'arrêté du 30/10/2025 (pneus POR comme antidérapants inamovibles, modification de l'arrêté de 1985) : lu, hors sujet pour le lecteur, non cité.
- R411-25 (opposabilité de la signalisation) : lu, non utilisé, car l'appliquer à l'arrêté du préfet serait une interprétation.

## 5. À faire dans ton Chrome (10 minutes)

1. **Journal officiel** : sur legifrance.gouv.fr, chercher « équipements hivernaux » et « pneumatiques » dans les textes publiés du 12/02/2026 à aujourd'hui, et regarder si le chapitre IV du titre Ier du livre III du code de la route (R314-1 à D314-8) a un article de plus. **Réponse attendue : aucun décret de sanction.**
2. Ouvrir R411-26, l'arrêté du 24/11/1967 (art. 4) et l'arrêté du 23/06/2021 (art. 7) : les extraits doivent correspondre à ceux de `travaux/etape-8/textes/`, et la numérotation des alinéas de l'arrêté de 2021 est à confirmer.
3. Loi n° 2026-797 du 18/08/2026 sur Légifrance : Ctrl+F « pneu », « chaîne », « circulation » ; PDF de la réponse n° 3489 : le B26 et les 150 €.
4. Dire « confirmé » ou donner l'écart. Je mets alors à jour `verifie_le`, `date_revue` et les empreintes (jamais avant).

## 6. Contrôles

À remplir à la fin du livrable (CI de la pull request) : Contrôles, Recette des exemples, Lighthouse, Production.

## 7. Revue indépendante (une seule, faite avant présentation)

Verdict : « à corriger », rien de bloquant. **Changé** : voir « Rectifications » en section 1 (quatre points importants ou mineurs corrigés). **Écarté** : ajouter la réponse du Sénat sur l'application « de manière pédagogique » (je ne l'ai lue que par la presse) ; renommer le titre de partie (garde la requête « verbalisation »). **Reste à vérifier** : tout ce qui est en section 5, plus le montant de l'amende forfaitaire (non donné sur la page) ; les tests ne tournent pas en local (dépendances absentes), la CI de la pull request tranche. Pas de seconde revue : aucune correction n'ajoute de contenu nouveau au-delà de citations déjà lues.
