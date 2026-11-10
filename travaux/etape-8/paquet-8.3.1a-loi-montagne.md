# Paquet de validation 8.3.1a : loi montagne, page publiable

**Validé par Houssem le 10/11/2026** (« ok pour ta recommandation » : phrase sur le B26 conservée ; « je te valide ça » : validation écrite de la page, du montant daté du 10/11/2026 et des six sources ajoutées). Encadré inchangé. La page reste dans `exemples/` jusqu'à 8.3.0 ; aucune fusion sur `main`.

Étape 8, vague A, livrable 8.3.1a (premier du découpage validé : `travaux/etape-8/decoupage-8.3.md`).

- **Page** : `exemples/pneus/loi-montagne.md` (adresse du plan `/loi-montagne/`). Elle reste dans `exemples/` : son passage dans `src/content` est le livrable 8.3.0. Aucune page réelle sur `main`.
- **Branche** : `etape-8/loi-montagne`, pull request en brouillon vers `integration/vague-a`.
- **Textes relevés le 10/11/2026** : `travaux/etape-8/textes/loi-montagne-sanctions-et-signalisation.md`.
- **Lecture des textes** : relevés d'abord par extraits de recherche (le navigateur intégré est bloqué par Légifrance), puis **relus en ligne dans ton Chrome le 10/11/2026** (section 5, faite). Seule exception : l'arrêté du 24/11/1967 art. 4, lu par extrait ; sa phrase sur le B26 figure dans l'art. 2 de l'arrêté du 23/06/2021, relu en ligne.

## Ce que tu valides

1. **L'encadré de décision : inchangé.** Question, quatre lignes, citations, coût probable et empreinte `75abb315…` ne bougent pas (validés le 03/11/2026). Raison, vérifiée en ligne le 10/11/2026 : aucun décret de sanction (D314-8 toujours « en vigueur depuis le 01/11/2024 », identique au texte du 03/11 ; chapitre « Pneumatiques » R314-1 à R314-7 et D314-8 sans article de sanction ; aucun texte du Journal officiel depuis 2020 sur les équipements hivernaux hormis l'arrêté du 30/10/2025, hors sujet).
2. **Le montant « aucune amende »** : texte et empreinte inchangés ; `verifie_le` passe au **10/11/2026** (vérification du Journal officiel faite ce jour, section 5). C'est la seule donnée modifiée dans `data/couts.json` : l'empreinte ne dépend pas de la date, je ne l'ai pas recalculée.
3. **Les nouveaux passages du texte rédigé** (section 1).
4. **Les six sources ajoutées au registre** (section 2).
5. **Une décision et une validation écrite** (section 3).

## 1. Texte rédigé : ce qui change

| Passage | Ce que la page dit | Source de première main |
|---|---|---|
| Où et quand (nouveau) | Zone annoncée par le panneau **B58** avec le panonceau « du 01/11 au 31/03 » ; sortie par le **B59** | Arrêté du 23/06/2021, art. 2 et 7 (extrait : « annoncée par un panneau B58, complété par un panonceau M11b1 portant la mention « du 01/11 au 31/03 » ») |
| Où et quand (nouveau) | Période du 1er novembre au 31 mars de l'année suivante, donc du 01/11/2026 au 31/03/2027 ; liée aux dates, pas à la neige | D314-8, IV (déjà au registre) |
| Peut-on rouler sans… | Au panneau B26, les pneus hiver sont admis pour voitures et utilitaires légers, sauf panonceau « Chaînes à neige obligatoires » (M9z) | Arrêté du 24/11/1967, art. 4 (« le port de pneumatiques hiver […] est admis pour le respect de cette prescription ») ; arrêté du 23/06/2021, art. 7. Corrobore la Sécurité routière (déjà citée) |
| Amende (titre : « peut-on être verbalisé ? ») | Aucun décret de sanction publié à la date de revue ; texte du montant validé inchangé | Réponse ministérielle du 12/02/2026 (déjà au registre, catégorie secondaire : n'a jamais fixé un verdict) |
| Amende, panneau B26 (nouveau) | Le non-respect du B26 est puni de l'amende de 2e classe, **plafonnée à 150 €** (plafond, pas le montant forfaitaire) ; confirmé par le ministère de l'Intérieur | Code de la route R411-26 ; Code pénal 131-13, 2° ; réponse ministérielle n° 3489 du 21/03/2023 (Assemblée nationale, catégorie secondaire, lue via résumé automatique) |
| Loi Montagne II / III (nouveau) | L'obligation vient de la loi du 28/12/2016 (art. 27) ; la loi n° 2026-797 du 18/08/2026 (Montagne III) ne contient pas de disposition sur pneus, chaînes ou code de la route (0 occurrence de « pneu », « chaîne », « code de la route », « circulation ») | Décret 2020-1264, notice ; loi 2026-797 (Légifrance, relue en ligne) |

Dates : `date_modification` et `date_revue` passent au 10/11/2026 ; `prochaine_revue` au 10/05/2027 (6 mois, pages pneus).

Rectifications de la revue indépendante intégrées : phrase « lecture des textes, pas une position de l'administration » retirée (fausse : une réponse ministérielle de 2023 confirme la 2e classe) ; loi Montagne III citée par la loi promulguée, pas par le texte adopté ; B59 « en général » (sortie facultative dans certains cas) ; « hiver en cours » remplacé par un exemple de dates ; réponse du Sénat citée à l'endroit de l'affirmation.

## 2. Sources ajoutées au registre (`data/sources.json`, consultées le 10/11/2026)

| Id | Texte | Catégorie |
|---|---|---|
| `code-de-la-route-r411-26` | Code de la route, art. R411-26 | legifrance |
| `code-penal-131-13` | Code pénal, art. 131-13 | legifrance |
| `arrete-1967-11-24-signalisation` | Arrêté du 24/11/1967, art. 4 (panneau B26) | legifrance |
| `arrete-2021-06-23-signalisation` | Arrêté du 23/06/2021 (B58, B59, B26) | legifrance |
| `loi-2026-797-montagne-vivante-souveraine` | Loi n° 2026-797 du 18/08/2026 (Légifrance, JORFTEXT000054707261) | legifrance |
| `reponse-ministerielle-an-2023-03-21` | Réponse du ministre de l'Intérieur, QE n° 3489 | secondaire (ne fixe aucun verdict) |

## 3. Décision (recommandation en premier)

1. **Phrase sur le B26 (2e classe, 150 € au plus).** Recommandation : la garder. Elle est étayée par R411-26, le Code pénal et une réponse ministérielle publiée au JO (relue par le relecteur indépendant). Elle répond à « loi montagne 2026 verbalisation ». Alternative : la retirer et revenir à « sa sanction n'est pas traitée ici ».
2. **Validation écrite de la page** (règle 7 de `docs/03`) : une ligne dans la pull request, après lecture du rendu de la construction de recette.

Le paquet contient aussi `travaux/etape-8/decoupage-8.3.md` (découpage que tu as validé, commité avec ce livrable).

## 4. Ce qui n'est pas dans cette page

- Les communes concernées (tableau par département) : livrable 8.3.1b. La page renvoie vers la liste de la Sécurité routière.
- L'écart « 34 départements » (Sécurité routière) contre 48 (sa page des arrêtés) : à trancher par la lecture des arrêtés préfectoraux en 8.3.1b ; la page n'avance aucun nombre.
- L'arrêté du 30/10/2025 (pneus POR comme antidérapants inamovibles, modification de l'arrêté de 1985) : lu, hors sujet pour le lecteur, non cité.
- R411-25 (opposabilité de la signalisation) : lu, non utilisé, car l'appliquer à l'arrêté du préfet serait une interprétation.

## 5. Contrôle dans Chrome : fait le 10/11/2026 (à ta demande, avec le Chrome de ta machine)

La vérification anti-robot de Légifrance s'est passée seule ; je n'ai rien cliqué ni rempli.

| Point | Résultat |
|---|---|
| D314-8 | Texte identique à celui relevé le 03/11, « en vigueur depuis le 01/11/2024 » |
| Chapitre IV du code de la route | R314-1 à R314-7 et D314-8 ; aucun article de sanction |
| Journal officiel, recherches « équipements hivernaux », « dispositifs antidérapants », « période hivernale » + véhicules | Aucun décret de sanction ; dernier texte lié : arrêté du 30/10/2025 (hors sujet) |
| R411-26 | Texte conforme |
| Arrêté du 23/06/2021, art. 2 et 7 | B58, B59 (art. 2) ; M11b1 « du 01/11 au 31/03 » (art. 7, art. 67-4) ; M9z « Chaînes à neige obligatoires » (art. 7, art. 67-1) ; pneus hiver admis au B26 (art. 2 et 7) : conforme. L'art. 67-4 ajoute que la signalisation d'entrée peut être complétée par « Sur l'ensemble du département » |
| Loi n° 2026-797 (Légifrance) | 20 articles ; « pneu », « chaîne », « code de la route », « circulation » : 0 ; « véhicule » : 2 (bornes de recharge, véhicules utilitaires) |
| Réponse n° 3489 (site de l'Assemblée) | « Le non-respect de cette signalisation est puni de l'amende prévue pour les contraventions de la deuxième classe (150 euros maximum) » ; « pas de sanctions spécifiques » pour le défaut d'équipement |

Limite : la recherche du Journal officiel porte sur les mots-clés testés ; elle ne remplace pas la lecture du sommaire de chaque numéro.

## 6. Contrôles

CI de la pull request n° 25, commit 87e3139 (tous verts) : Contrôles (schémas, règles, build, liens), Recette des exemples rédigés, Lighthouse mobile (3 passages), Production en ligne ; déploiement Cloudflare ignoré (hors `main`). Recette : https://github.com/houssem-jeddou/decodauto/actions/runs/42728951976

## 7. Revue indépendante (une seule, faite avant présentation)

Verdict : « à corriger », rien de bloquant. **Changé** : voir « Rectifications » en section 1 (quatre points importants ou mineurs corrigés). **Écarté** : ajouter la réponse du Sénat sur l'application « de manière pédagogique » (je ne l'ai lue que par la presse) ; renommer le titre de partie (garde la requête « verbalisation »). **Reste à vérifier** : le montant de l'amende forfaitaire (non donné sur la page) ; l'arrêté du 24/11/1967 art. 4 relu seulement par extrait ; les tests ne tournent pas en local (dépendances absentes), la CI de la pull request tranche. Pas de seconde revue : aucune correction n'ajoute de contenu nouveau au-delà de citations déjà lues.
