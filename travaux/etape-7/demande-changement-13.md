# Demande de changement n° 13 : description des pages du socle

Étape 7, livrable 7.2. Proposée le 04/11/2026 avec le paquet `travaux/etape-7/paquet-7.2-confidentialite.md`. **À décider par Houssem.**

| Rubrique | Contenu |
|---|---|
| Élément | `docs/08_structure_contenus.md`, §2, ligne « Socle » ; schéma `soclePageSchema` (`src/schemas/pages.ts`). |
| Changement | Une page du socle a un champ `description`, obligatoire : la meta description de la page. Le contrôle de la page construite vérifie qu'elle est bien celle du contenu (R7-HTML-DESCRIPTION). |
| Raison | Le contrôle DESCRIPTION-ABSENTE (charte §3.4, livrable 6.5) exige une meta description sur toutes les pages, or le schéma du socle ne permet pas d'en déclarer une. Les 3 pages du socle du plan (accueil, mentions légales, à propos) ne pourraient donc pas passer ce contrôle autrement qu'avec un texte écrit dans le code, hors de la page. Aucune donnée de recherche en jeu : les 3 pages n'ont aucun mot-clé dans le plan. |
| Impact | 08 passe en v10. Aucun contenu validé touché : `src/content/socle` est vide, et les empreintes (base voyants, exemples, charte) ne changent pas. Le plan du site ne change pas (42 pages). Pages de test : le socle valide gagne une description ; `socle-sans-description` et `socle-html-sans-description` ajoutées. |
| Contrôles à relancer | `npm run schemas`, `npm test`, `npm run build`, recette des exemples. |
