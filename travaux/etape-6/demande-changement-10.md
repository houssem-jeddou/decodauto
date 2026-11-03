# Demande de changement n° 10 : pas de dépannage automatique sur une page loi montagne

Étape 6, livrable 6.6c (modèle de page pneus et obligations). Proposée le 03/11/2026 avec le livrable (pull request #18, paquet 6.6c, décision 3, option b) ; **acceptée par Houssem le 03/11/2026 (21 h 44)** (« je te donne le go pour partir avec ta recommandation »). Appliquée dans la même pull request.

| Rubrique | Contenu |
|---|---|
| Élément | Calcul du coût probable (`src/lib/cout.ts`, `src/lib/calcul.ts`) ; structure des contenus, docs/08 §1 (ligne `cout_probable`) et §3, règle 11 ; `CONTROLES.md` (COUT-MONTANT-AUTOMATIQUE) ; `CLAUDE.md`. Ces règles viennent de la demande de changement n° 6. |
| Changement | Le dépannage sur autoroute s'affiche de lui-même sur une page dont le niveau de sécurité est un verdict d'arrêt, **sauf sur la page outil (déjà le cas) et sur une page loi montagne** (`sujet: loi-montagne`). Rien d'autre ne change : les pages voyant, code défaut, panne et les autres pages pneus et obligations (pression, usure, contrôle technique) le gardent. |
| Raison | Sur la page exemple « loi montagne », la ligne 1 de l'encadré (« sans équipement ») a le verdict « Non, ne poursuivez pas votre trajet », tiré de l'article D314-8 du code de la route : il vient d'une obligation d'équipement, pas d'une panne. La règle de la demande n° 6 y affichait le forfait du dépannage sur autoroute (151 € à 280,08 €) et ajoutait quatre sources sans rapport à « Sources ». La seconde revue de 6.6c a montré qu'exclure tout le type « pneus » serait trop large : sur une page « pression » ou « usure », un pneu à plat qui impose l'arrêt est justement le cas du dépannage. |
| Impact | Aucun contenu validé touché : la base voyants, les montants et leurs empreintes, et les encadrés validés (voyant moteur, P0087) sont inchangés ; aucune page n'est publiée. L'empreinte de l'encadré « loi montagne » est versée après ce changement. Si la demande était refusée : retirer le champ `sansMontantAutomatique` du calcul, la page de test `valide-loi-montagne-arret` et la phrase ajoutée à docs/08. |
| Contrôles à relancer | `tests/controle.test.ts` (plage et montants), pages de test (`npm run fixtures`, dont `valide-loi-montagne-arret`), recette de la page « loi montagne », CI de la pull request #18. |

## Texte appliqué dans docs/08

- §1, ligne `cout_probable` : « Le dépannage sur autoroute s'affiche de lui-même sur une page dont le niveau de sécurité est un verdict d'arrêt (pas sur la page outil, ni sur une page loi montagne, dont le verdict vient d'une obligation d'équipement : demande de changement n° 10). »
- §3, règle 11 : « le dépannage automatique ne se déclare pas, et ne s'affiche ni sur la page outil ni sur une page loi montagne (demande de changement n° 10) ».
