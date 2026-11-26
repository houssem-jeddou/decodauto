# Demande de changement n° 47 : page « Réutiliser et citer decodauto » et licence des dessins (proposition N3 de l'audit n° 2) — brouillon

Écrite par Claude dans la nuit du 25 au 26/11/2026, étape 12, audit n° 2 (`audit.md`, constat C11, axe f, propositions N2 et N3).
**Statut : brouillon, non tranché** : reportée par les décisions du 26/11/2026 vers 2 h 30 (« Pas cette nuit : la demande n° 47 (choix d'une licence, décision juridique de Houssem) »). Décisions recopiées en fin de document. Rien n'est appliqué. Format de `docs/03`.

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
   Question à joindre au choix : les pictogrammes sont redessinés par nos soins, mais d'après des symboles normalisés
   (règlement ONU n° 121, cité pour le symbole et la couleur) ; la licence ne porte que sur notre dessin, pas sur le
   symbole, ce que la page doit dire.
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

## Décisions du 26/11/2026 (vers 2 h 30, heure de Tunis), recopiées telles quelles

> Décisions prises cette nuit par Claude (chat de pilotage) sur la délégation de Houssem du 25/11 à 23 h 58, le 26/11 vers 2 h 30 (heure de Tunis) ; recopie-les telles quelles dans le journal et dans les demandes de changement. (1) L'audit n° 2 est accepté comme livrable : passe la PR #109 en prête, mets son statut à jour et fusionne-la quand sa CI est verte. (2) Lot B1, une branche et une PR depuis main après la fusion de #109 : P2 (les trois paires du plan, procédure du 23/10) ; P6 (les 33 meta descriptions ramenées à 155 caractères au plus, en commençant par les sept pages entre les positions 7,5 et 18 ; chacune reflète l'encadré de sa page, jamais un verdict, une urgence ou un coût absent de l'encadré ; « Mis à jour le », lastmod et empreinte inchangés ; balises de partage identiques ; plus le contrôle d'alerte au-delà de 155 caractères) ; P9 (demande n° 46 acceptée par délégation) ; P10 (variante de la charte : je confirme pour Houssem qu'une variante d'espacement du pied de page ne demande pas de nouvelle demande de changement au-delà de la n° 40). P8 n'est pas retenue (pastilles des codes sur trois lignes, gain faible) : note-la en idées reportées. (3) Lot B2 ensuite, à préparer pendant que la CI de B1 tourne : P7 (demande n° 45 acceptée, option A : les trois rapports d'aspect tirés de l'illustration, 16:9 en 1200 × 675, 4:3 en 1200 × 900 et 1:1 en 1200 × 1200, et max-image-preview:large en mode indexable seulement, noindex seul sinon) et la version imprimable V4 (variante de la charte, aucune licence imprimée). La documentation de Google a été lue par Claude le 26/11 : page « Article (Article, NewsArticle, BlogPosting) structured data », mise à jour le 2026-09-08 : « For best results, we recommend providing multiple high-resolution images (minimum of 50K pixels when multiplying width and height) with the following aspect ratios: 16x9, 4x3, and 1x1. », « Images must represent the marked up content. », « Image URLs must be crawlable and indexable. » ; page « Discover and your website » : « At least 1200 px wide », « High resolution of more than 300,000 total pixels », « 16x9 aspect ratio », « Enabled by the max-image-preview:large setting, or by using AMP ». (4) Pas cette nuit : la demande n° 47 (choix d'une licence, décision juridique de Houssem), P3 et P3b (loi montagne : faits et sources nouveaux, validation de Houssem), P1, P4 et P5 (relevé des sources d'abord), P11 (relevé J+30). Pour chaque lot : captures 375 × 667 et 1366 × 800 avec la police chargée et la police de secours, une seule revue indépendante, corrections, CI verte, fusion sur cette délégation, puis vérification du déploiement et de la production. Si un changement touche un verdict, une urgence, une action, une source, un coût, un title ou un H1, arrête-toi avant la fusion et signale-le. À la fin, journal docs/04 (ces décisions, les lots, les revues) dans une PR fusionnée quand sa CI est verte, puis un résumé : PR, commits de fusion, heures de déploiement, verdicts des revues, points ouverts.
