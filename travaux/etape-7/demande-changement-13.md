# Demande de changement n° 13 : description et revue des pages du socle

Étape 7, livrable 7.2. Proposée le 04/11/2026 avec le paquet `travaux/etape-7/paquet-7.2-confidentialite.md`. **Acceptée par Houssem le 09/11/2026 (21 h 41)**, avec le livrable 7.2.

| Rubrique | Contenu |
|---|---|
| Élément | `docs/08_structure_contenus.md`, §2, ligne « Socle » ; schéma `soclePageSchema` (`src/schemas/pages.ts`) ; charte §8. |
| Changement | Une page du socle a trois champs de plus, obligatoires : `description` (la meta description), `date_revue` et `prochaine_revue` (au plus 12 mois après). Le contrôle de la page construite vérifie que la meta description est celle du contenu (R7-HTML-DESCRIPTION) ; une revue dépassée donne l'alerte du lundi (R5-REVUE-DEPASSEE). |
| Raison | Le contrôle DESCRIPTION-ABSENTE (charte §3.4, livrable 6.5) exige une meta description sur toutes les pages, or le schéma du socle ne permet pas d'en déclarer une : les pages rendues par la route (mentions légales, à propos) ne pourraient pas le passer. L'accueil garde sa description dans `src/pages/index.astro` tant qu'il n'a pas de fichier de contenu. La revue : la politique de confidentialité décrit des prestataires et une décision d'adéquation attaquée en justice ; sans date de revue, un changement passerait sans alerte (revue indépendante de 7.2). Aucune donnée de recherche en jeu : ces pages n'ont aucun mot-clé dans le plan. |
| Impact | 08 passe en v10 ; charte §8. Aucun contenu validé touché : `src/content/socle` est vide, et les empreintes (base voyants, exemples, charte) ne changent pas. Le plan du site ne change pas (42 pages). Pages de test : le socle valide gagne ces champs ; `socle-sans-description`, `socle-html-sans-description`, `dates-socle-revue-delai` et `dates-socle-revue-ordre` ajoutées. |
| Contrôles à relancer | `npm run schemas`, `npm test`, `npm run build`, `npm run liens`, recette des exemples. |
