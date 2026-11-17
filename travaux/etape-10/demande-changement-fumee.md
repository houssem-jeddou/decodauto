# Demande de changement n° 34 : requête principale de la page « fumée à l'échappement »

> **Acceptée par Houssem le 17/11/2026 (7 h 39) avec le lot B4** (« Je valide tout ! Fais le necessaire »). Proposée
> avec le lot B4 de la vague B (étape 10) ; le changement est écrit sur la branche `etape-10/lot-b4` et entre dans
> `main` avec la pull request du lot.

- **Élément** : plan du site (`data/plan-du-site.json`, figé à l'étape 4), page `fumee-echappement`
  (`/fumee-echappement/`, vague B, jamais publiée), champ `requete_principale`.
- **Changement** : « fumée blanche échappement » → « fumée blanche voiture ». L'adresse, le thème, les mots-clés et les
  liens de la page ne changent pas.
- **Raison chiffrée** (volumes indicatifs de `05_mots_cles_perimetre_v3.csv`, repris par le brief de la page) :
  « fumée blanche voiture » : 3 160 recherches par mois ; « fumée blanche échappement » : 316, dix fois moins. Les deux
  sont déjà des mots-clés de la page : même intention (symptôme ou panne), même page. Le journal demandait depuis
  l'étape 8 de revoir cette requête au brief (« Pour l'étape 8 et les suivantes ») ; le titre proposé nomme aussi la
  fumée noire du diesel (cinq mots-clés de 316 chacun).
- **Impact sur ce qui est validé** : aucune page publiée ; le plan du site validé change d'un champ ; `docs/09` (partie
  générée par `npm run plan:vue`) et le brief de la page se régénèrent. Aucun verdict, aucune adresse, aucun lien.
- **Contrôles à relancer** : `npm run schemas` (plan), `npm run build` (R7-REQUETE-ABSENTE sur le title ou le H1 de la
  page), `npm run plan:vue`, `npm run briefs` (vague B), `npm run liens`.
