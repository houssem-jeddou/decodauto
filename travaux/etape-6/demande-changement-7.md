# Demande de changement n° 7 : ordre de l'encadré de décision

Étape 6, livrable 6.3 (composants communs). Proposée le 02/11/2026 avec le livrable ; **acceptée par Houssem le 02/11/2026 (22 h 28)** (« je valide 6.3 avec tes recommandations »).

| Rubrique | Contenu |
|---|---|
| Élément | docs/08 §3, règle 9 (encadré de décision) |
| Changement | « Il affiche la question de décision et le coût probable (…), puis une ligne par situation » devient « Il affiche, dans cet ordre, la question de décision, une ligne par situation (…), puis le coût probable (…) ». |
| Raison | Le lecteur cherche d'abord s'il peut rouler : le verdict passe avant le coût. Dans la page de démonstration (3 lignes de la base, vraies données), le coût placé en tête repoussait le premier verdict sous la ligne de flottaison sur téléphone. La charte (§4) et le composant (`src/lib/composants.ts`) suivent déjà cet ordre ; seule la lettre de 08 le contredisait (relevé par les deux revues indépendantes de 6.3). |
| Impact | Aucun contenu validé touché : aucune page éditoriale n'existe encore ; la base voyants, les empreintes et le plan sont inchangés. Le contrôle R9 ne vérifie pas l'ordre entre les lignes et le coût : il est inchangé. |
| Contrôles à relancer | Aucun nouveau ; `npm test` et la construction (CI de la PR #13). |
