# Demande de changement n° 15 : préalables de la porte de l'étape 9

Acceptée par Houssem le 09/11/2026 (22 h 58), option A.

## Élément concerné
`docs/03`, tableau des étapes, étape 9, critères « Avant » de la porte de sortie :

> go / no-go ; GitHub Pro et branche `main` protégée (pull request obligatoire, contrôles exigés, aucun contournement) ; double authentification activée sur OVH, GitHub, Cloudflare, Google, Claude (Anthropic) et Microsoft (Bing) ; renouvellement automatique et verrou de transfert du domaine.

## Demande de Houssem (09/11, 22 h 53)
Les préalables qui ne sont pas obligatoires ne doivent pas bloquer la mise en ligne. Ils vont dans une section à part et se tranchent après la réalisation du projet.

## Changement
Une date ne justifie pas d'alléger une porte (03, règle 2). Chaque critère reporté a donc son propre motif, et son risque est écrit.

| Critère | Décision | Motif | Risque si reporté |
|---|---|---|---|
| GitHub Pro et `main` protégée | Reporté | Payant ; sur un dépôt privé en offre gratuite, ni branches protégées ni rulesets. Un garde-fou gratuit le remplace en partie. | Un commit poussé directement sur `main` peut être déployé sans la validation de Houssem. |
| Renouvellement automatique du domaine | Reporté | Domaine acheté le 22/10/2026 : échéance attendue en octobre 2027, à constater chez OVH. | Faible avant l'automne 2027. |
| Double authentification Microsoft (Bing) | Reporté | Ce compte ne publie rien sur le site. | Perte de l'accès aux statistiques de Bing. |
| Double authentification Google, GitHub, OVH, Cloudflare | Gardé | Gratuit, fait par Houssem en parallèle du reste. Le compte Claude agit sur GitHub, Cloudflare et OVH. | Un compte pris permet de publier des verdicts faux sous le nom de Houssem, ou de détourner le domaine. |
| Verrou de transfert du domaine | Gardé | Actif par défaut d'après la documentation d'OVH : un constat. | Transfert du domaine par un tiers. |
| Compte Claude | Précisé | Aucun réglage de double authentification propre (connexion par Google ou par lien reçu par courriel, pas de mot de passe) : couvert par le compte Google. | – |

### Garde-fou ajouté (livrable de l'étape 7)
Un contrôle de la CI refuse de déployer si un commit de `main`, depuis le dernier déploiement, ne vient pas d'une pull request fusionnée (API GitHub : pull requests associées à un commit).

Limites :
- qui pousse sur `main` peut retirer le contrôle dans le même envoi, puisque le workflow exécuté est celui du commit poussé ;
- il couvre l'accident (commit 9c46886 du 23/10), pas un compte compromis ;
- un commit direct reste dans l'historique de `main` : le contrôle empêche son déploiement, pas sa présence.

## Nouveau texte de la porte (03 v10)
> **Avant** : go / no-go ; double authentification activée sur Google, GitHub, OVH et Cloudflare (le compte Claude n'a pas de réglage propre : il est couvert par celle du compte Google) ; verrou de transfert du domaine constaté ; contrôle de la CI actif, qui refuse de déployer si un commit de `main`, depuis le dernier déploiement, ne vient pas d'une pull request fusionnée. Reportés après la mise en ligne, à trancher par Houssem : GitHub Pro et branche `main` protégée, double authentification Microsoft (Bing), renouvellement automatique du domaine.

## Impact
- `docs/03` passe en v10 (porte de l'étape 9).
- Journal : section « Reporté après la mise en ligne (à trancher par Houssem) » ; décisions ouvertes, séance de validation n° 12 et colonne « Dépend de » alignées.
- Rouverts dans cette section : le compte GitHub séparé pour Claude et les permissions de son application, écartés le 23/10 parce que la protection de `main` suffisait.
- Aucun contenu validé n'est touché.
- C'est la première demande qui retire des critères d'une porte (les demandes n° 5, 11, 13 et 14 n'en retiraient aucun).

## Contrôles à relancer
Aucun contrôle existant. Le garde-fou s'ajoute avec ses tests.

## Hors de cette demande
- Double authentification de GitHub : GitHub l'exigera de toute façon avant le 08/12/2026 (bandeau du 28/10).
- Questions juridiques du paquet 7.2, décision 7 (représentant dans l'Union, transfert vers la Tunisie, statistiques de Cloudflare, contrats de sous-traitance, durée des journaux) : elles restent à poser avant la mise en ligne. Houssem a demandé la recommandation de Claude, qui est de ne pas les reporter : aucune IA ne tranche ces points de droit, et les poser ne bloque pas la rédaction.

## Revue indépendante (une revue, « à corriger », deux bloquants)
- Changé : un motif par critère au lieu de « avancer vite » ; Google, GitHub, OVH, Cloudflare et le verrou de transfert gardés dans la porte (le brouillon reportait Google tout en écrivant « Claude couvert par Google ») ; limites du garde-fou écrites ; impacts ajoutés.
- Écarté : rien. Pas de seconde revue : les deux bloquants étaient un arbitrage de Houssem.
- Non vérifié : workflow réel du dépôt ; échéance et verrou chez OVH ; état de la double authentification de chaque compte ; prix de GitHub Pro (4 dollars par mois d'après des relevés de la page tarifaire) ; le droit.

## Sources lues
- GitHub Docs, « About protected branches » : branches protégées sur un dépôt privé à partir de GitHub Pro ; sans l'option « Do not allow bypassing the above settings », la règle ne s'applique pas aux administrateurs.
- OVHcloud, « Transférer un nom de domaine vers un autre bureau d'enregistrement » : « Protection contre le transfert » activée par défaut.
- Aide de Claude, « Log in to your Claude account » : connexion par Google ou par lien reçu par courriel ; pas de mot de passe propre.
