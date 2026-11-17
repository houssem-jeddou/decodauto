# Demande de changement n° 33 : réponse directe pour les pages « niveaux et fluides »

> **Acceptée par Houssem le 17/11/2026 à 7 h 39.** Le message du matin du pilotage portait la phrase « J'accepte la
> demande n° 33 (réponse directe des pages fluides). », et Houssem y a répondu : « Je valide tout ! Fais le necessaire ».
> Proposée le 17/11/2026 avec la partie technique du modèle fluide (PR n° 79), qui l'applique : schéma, modèle, tests,
> `docs/08` l. 49.

- **Élément** : structure des contenus (`src/schemas/pages.ts`, `fluidePageSchema` ; vue lisible `docs/08`, l. 49) :
  le champ `reponse_directe` est aujourd'hui réservé aux pages « pneus et obligations ».
- **Changement** : ouvrir `reponse_directe` aux pages de type `fluide` (vague C : huile moteur, 5W30, 5W40, 10W40,
  niveau d'huile, liquide de refroidissement, liquide de frein), avec les mêmes contrôles et le même rendu que la page
  « pression des pneus » : réponse directe en tête de l'encadré, complète dans le premier écran du téléphone, puis la
  première situation avec son verdict et son urgence (précision 2a). Rien d'autre ne change dans la structure.
- **Raison** : la règle 2c de la demande n° 30 (acceptée le 15/11) range déjà « huiles et liquides » parmi les pages
  informatives dont l'encadré commence par la réponse directe. Ces pages répondent d'abord à une question
  (« quelle huile mettre ? », « à quoi sert le liquide de frein ? ») avant une décision : sans réponse directe, le
  lecteur qui cherche « huile 5w30 » trouve en tête des situations d'alerte qui ne sont pas sa question. Le dossier de
  la porte F1 (16/11, l. 188-190) avait noté que cette ouverture demandait une demande de structure.
- **Impact sur ce qui est validé** : aucune page publiée (aucune page fluide n'existe) ; `docs/08` l. 49 et le dossier
  de la porte F1 à mettre à jour après l'accord ; la réponse directe entre dans l'empreinte de validation de chaque page
  fluide, comme pour la pression des pneus.
- **Contrôles à relancer** : `npm run schemas`, `npm test` (tests du type fluide dans les deux sens, déjà dans la
  PR #79), `npm run build`, recette et démonstration du format 2.
- **Recommandation de Claude** : accepter.
