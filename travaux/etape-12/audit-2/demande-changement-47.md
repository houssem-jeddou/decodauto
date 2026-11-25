# Demande de changement n° 47 : page « Réutiliser et citer decodauto » et licence des dessins (proposition N3 de l'audit n° 2) — brouillon

Écrite par Claude dans la nuit du 25 au 26/11/2026, étape 12, audit n° 2 (`audit.md`, constat C11, axe f, propositions N2 et N3).
**Statut : brouillon, non présenté, non accepté.** Rien n'est appliqué. Format de `docs/03`.

## 1. Éléments concernés (validés ou figés)
- **Plan du site** (`data/plan-du-site.json`, `docs/09`) : une page du socle s'ajoute (adresse proposée : `/reutiliser/`).
- **Périmètre** (`docs/02`) : nombre de pages du socle.
- **Pages du socle** (livrable 7.2, modèle `pageSocle`) : description, revue tous les 12 mois, adresse de contact par
  `{{contact}}`.
- **Mentions légales** (livrable 7.4b, `src/content/socle/mentions-legales.md`) : une clause de propriété et de licence
  s'ajoute (aujourd'hui, aucune).
- **Pied de page** (demande n° 40) : un lien « Réutiliser » s'ajouterait aux liens « À propos » et « Méthode » (option).
- **Accueil** (livrable 7.4a) : inchangé (l'accueil ne liste que les pages éditoriales).

## 2. Raison (données)
- Search Console du 25/11 (`travaux/etape-12/suivi-search-console/releve-25-11.md`) : 12 pages « Explorée, actuellement
  non indexée », 13 adresses non encore traitées, 0 clic ; site de deux semaines. `docs/03`, ligne 12 : la notoriété passe
  par des « ressources que d'autres citent (outil voyants, tableaux) ».
- Aujourd'hui, rien ne dit à un tiers ce qu'il peut reprendre : aucune licence des dessins (pictogrammes, illustrations,
  images de partage), aucune façon de citer, aucune version imprimable (`audit.md`, C11).
- Les dessins sont redessinés pour le site (`CLAUDE.md`, « pictogrammes redessinés par nos soins ») : ils peuvent être mis
  sous licence ouverte ; les photos sous licence libre gardent la leur (registre `data/photos.json`), et les extraits de
  notices ne sont pas à nous.

## 3. Changement proposé
1. **Page du socle « Réutiliser et citer decodauto »** (H1 et texte à valider par Houssem) :
   - ce qu'est le site et sa méthode, en trois phrases, avec renvoi à « à propos » (lien à déclarer au plan) ;
   - ce qu'on peut reprendre : pictogrammes, illustrations et images de partage du site, sous la licence choisie, avec le
     crédit « decodauto.com » et un lien vers la page d'où vient le dessin ; les verdicts ne se reprennent qu'avec un lien
     vers leur page et sa date (un verdict sans sa page peut devenir faux) ;
   - ce qu'on ne peut pas reprendre sous cette licence : les photos sous licence libre (leur licence s'applique), les
     extraits de notices, les textes (citation courte avec lien) ;
   - comment citer une page (titre, adresse, date « Mis à jour le ») ; version imprimable ;
   - contact par `{{contact}}`.
2. **Licence** : recommandée, Creative Commons Attribution 4.0 (CC BY 4.0) pour les dessins du site. Choix juridique de
   Houssem (options : CC BY 4.0 ; CC BY-SA 4.0 ; aucune licence et autorisation au cas par cas).
3. **Mentions légales** : une clause « Propriété et réutilisation » qui renvoie à la page.
4. **Version imprimable** (maquette V4, `@media print`) : variante de la charte, livrée avec le lot, sans demande de
   changement ; citée ici parce que la page la présente.

## 4. Impact sur ce qui est validé
- Aucun verdict, urgence, action, source, coût, adresse existante, title ni H1 ne change.
- Plan du site, `docs/02`, `docs/09`, liste Lighthouse de production, plan du site XML (une adresse de plus), pied de page
  (option), mentions légales (texte validé par Houssem le 10/11 : une clause s'ajoute, à revalider).

## 5. Contrôles à relancer ou à étendre
- Contrôles du socle (title, H1, description, dates, revue), CANONICAL-*, SITEMAP-*, PIED-LIENS si le lien est ajouté,
  MENTIONS-LEGALES-*, R7 (page du plan construite avec son contenu), liens du plan (`npm run liens`).
- Captures 375 × 667 et 1 366 × 800, deux polices ; Lighthouse ; `npm run schemas`, `npm test`, `npm run build`.
