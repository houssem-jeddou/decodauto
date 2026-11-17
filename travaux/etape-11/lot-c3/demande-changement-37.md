# Demande de changement n° 37 : requête principale des pages « liquide de refroidissement » et « liquide de frein »

> **Proposée, à accepter par Houssem.** Proposée le 17/11/2026 avec le lot C3 de la vague C (étape 11), sur le modèle de
> la demande n° 34 (page « fumée à l'échappement »). Le changement est écrit sur la branche `etape-11/lot-c3` et
> n'entre dans `main` qu'avec la pull request du lot, après acceptation. Numéro 37 : le n° 35 est le report du cas 3 de
> `docs/09` (page « huile moteur », lot C2) ; le n° 36, le verdict d'une obligation légale (pneus usés, lot C4), numéros
> donnés par le pilotage le 17/11.
> Comme pour la n° 34, le plan du site (`data/plan-du-site.json`) et `docs/09` (partie générée) de la branche portent
> déjà le changement proposé : il n'est appliqué qu'après l'accord de Houssem, avec la pull request du lot.

- **Élément** : plan du site (`data/plan-du-site.json`, figé à l'étape 4), champ `requete_principale` de deux pages de
  la vague C, jamais publiées :
  - `liquide-de-refroidissement` (`/liquide-de-refroidissement/`) ;
  - `liquide-de-frein` (`/liquide-de-frein/`).
- **Changement** :
  - « liquide de refroidissement voiture » → « liquide de refroidissement » ;
  - « liquide de frein voiture » → « liquide de frein ».

  L'adresse, le thème, les mots-clés et les liens des deux pages ne changent pas.
- **Raison chiffrée** (volumes indicatifs de `05_mots_cles_perimetre_v3.csv`, repris par le brief de chaque page) :
  - « liquide de refroidissement » : 31 600 recherches par mois ; « liquide de refroidissement voiture » : 3 160, dix
    fois moins ;
  - « liquide de frein » : 31 600 ; « liquide de frein voiture » : 3 160, dix fois moins.

  Les deux requêtes nouvelles sont déjà des mots-clés de leur page (variantes non comptées de « liquide refroid » et de
  « frein liquide » dans `docs/05`) : même intention, même page. Les briefs de la vague C demandaient cette révision
  (rubrique « À traiter », renvoi au journal, « Pour l'étape 8 et les suivantes »).
- **Impact sur ce qui est validé** : aucune page publiée ; le plan du site validé change de deux champs ; `docs/09`
  (partie générée par `npm run plan:vue`) et les briefs des deux pages se régénèrent. Aucun verdict, aucune adresse,
  aucun lien. Le volume compté des pages ne change pas (il dépend des mots-clés, pas de la requête principale).
- **Contrôles à relancer** : `npm run schemas` (plan), `npm run build` et la construction de recette (R7-REQUETE-ABSENTE
  sur le title ou le H1 des deux pages), `npm run plan:vue`, `node travaux/etape-11/generer-briefs.ts`, `npm run liens`.
