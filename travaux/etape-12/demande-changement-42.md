# Demande de changement n° 42 : photos sous licence libre dans l'emplacement du visuel (proposition P4, lot U4)

Écrite par Claude le 24/11/2026, étape 12, lot U4 de l'audit UX/UI (`audit-ux-ui/audit.md`, P4). **Statut : proposée.**
- **Principe** : accepté par Houssem le 21/11/2026 (7 h 11), « à condition que chaque photo soit acceptée par lui avant tout
  téléchargement » (audit, §6, décision 4).
- **Photos** : les sept, acceptées par Houssem le 24/11/2026 à 19 h 19 (« OUI pour tout. J'accepte toutes les photos »).
- **Reste à valider** : ce texte, le composant et les captures, sur la pull request du lot, avant toute fusion.

Format de `docs/03` : élément concerné, changement proposé, raison (données), impact sur ce qui est validé, contrôles à
relancer.

## 1. Éléments concernés (validés ou figés)
- **Emplacement du visuel** (règle 2i de la demande n° 30, assouplie par la demande n° 32) : une figure `data-illustration`
  juste après le bloc « Notices / Base du coût », dessin du site signalé comme tel (« Illustration decodauto. ») ; contrôle
  FORMAT2-ILLUSTRATION.
- **Données structurées** (livrable 7.5a, `src/lib/donnees-structurees.ts`) : « ni Organization, ni image, ni
  datePublished » ; contrôles DONNEES-STRUCTUREES-*.
- **Liens vers un autre site** (CLAUDE.md, « Plan du site » ; R7-LIEN-EXTERNE) : un lien vers un autre site ne mène qu'à une
  source de première main citée sur la page.
- **Politique de confidentialité** (`#confidentialite`) et TIERS-RESSOURCE : aucune ressource d'un autre site.
- **Charte graphique** (`docs/11`, rangée « Illustration ») et feuille `src/styles/charte-b.css`.
- **Règle 14** (indexation durable) : date « Mis à jour le » (`date_modification`, `lastmod`).
- **Sept pages en ligne**, au format 2 : `/huile-moteur/verifier-niveau/`, `/liquide-de-refroidissement/`,
  `/liquide-de-frein/`, `/pression-des-pneus/`, `/usure-des-pneus/`, `/loi-montagne/`, `/batterie-voiture/recharger/`.

## 2. Raison (données)
- **Audit, constat C8** : le site n'a aucune photo réelle. Houssem ne peut pas en fournir (décision du 15/11, 20 h 55).
  Les illustrations dessinées montrent un schéma. Elles ne montrent pas à quoi ressemble la vraie pièce sous un capot, ni
  le vrai panneau.
- **Règle 2i** : le visuel « montre où regarder ». Sur ces sept pages, le lecteur doit trouver une pièce ou un repère :
  jauge, vase d'expansion, réservoir, étiquette de pression, témoin d'usure, panneau B58, bornes de la batterie. Une photo
  le montre tel qu'il le verra.
- **Requêtes de ces pages** (`docs/09`, volumes indicatifs par mois) :
  - liquide de refroidissement : 31 600 ;
  - liquide de frein : 31 600 ;
  - pression des pneus, niveau d'huile, loi montagne, usure des pneus et recharge de la batterie : de quelques centaines à
    quelques milliers chacune.
- **Google** (« Bonnes pratiques de SEO pour Google Images », mise à jour le 03/03/2026, constat C10 de l'audit) :
  - Google trouve les images dans l'attribut `src` de `<img>` ;
  - il recommande des images originales et de qualité, proches du texte qui en parle ;
  - pour un article, il recommande une `image` dans les données structurées ; c'est aujourd'hui l'alerte
    R7-IMAGE-RECOMMANDEE, levée sur ces sept pages.
- **Rien ne garantit un gain de trafic** : comme pour la demande n° 43, l'effet se lit dans Search Console (§6).

## 3. Changement
**Registre** : `data/photos.json`, seule source, schéma `src/schemas/photos.ts`. Une ligne par photo, une photo par page au
plus. Chaque ligne donne :
- la page du plan ;
- la page Commons et l'adresse de l'original, avec son empreinte SHA-1 et ses dimensions ;
- l'auteur, la licence et l'adresse de la licence, relevés par l'API de Commons (imageinfo, extmetadata) le 24/11/2026 ;
- la zone gardée (recadrage) et, s'il le faut, les zones floutées ;
- les modifications : « recadrée », ou « recadrée, floutée en partie » (étiquette de pression : son code QR) ;
- le texte alternatif et la légende ;
- ce qui a été vérifié à pleine résolution ;
- l'acceptation de Houssem (24/11/2026, 19 h 19).

**Production** (`scripts/photos.ts`, `npm run photos`) :
1. Le script relit les métadonnées par l'API de Commons et s'arrête au premier écart.
2. Il télécharge l'original dans `.cache/photos/`, jamais versionné, et le vérifie par son SHA-1. Commons a refusé cinq
   originaux (réponse 429, les 24 et 25/11/2026) : Houssem les a téléchargés depuis Commons et transmis dans une archive le
   25/11/2026. Leur SHA-1 est celui que donne Commons ; un fichier qui ne l'a pas est refusé.
3. Il recadre l'original au rapport 3:2 sur ce qui montre où regarder, en gardant au moins 1 600 px de large. Il floute
   seulement si le recadrage ne suffit pas, et le crédit le dit alors.
4. Il écrit les fichiers dans `src/photos/` : WebP en 480, 800 et 1 200 px de large, aux noms parlants en français
   (`reservoir-liquide-de-frein-skoda-fabia-800.webp`). Les fichiers ne gardent ni EXIF, ni XMP, ni IPTC, ni profil ICC.
5. Il écrit les empreintes des fichiers produits (`src/photos/empreintes.json`).
- **Copie dans le site** : à la construction, `scripts/integration-photos.ts` copie seulement les fichiers que les pages
  référencent (jamais dans `public/`). Le serveur de développement sert les mêmes fichiers.
- **Client des requêtes** (décision de Houssem du 25/11/2026, politique de Wikimedia sur le User-Agent) : « decodauto-photos/1.0
  (https://decodauto.com/a-propos/; erreur@decodauto.com) », tiré de `URL_SITE` et de l'adresse de contact publiée sur le
  site. Une requête par fichier, 10 s d'écart ; sur une réponse 429, attente de `Retry-After`, un seul nouvel essai, puis
  arrêt.

**Composant « Visuel avec photo »** (charte graphique, rangée « Illustration », `src/styles/charte-b.css` ;
`src/lib/photos.ts`). Dans l'emplacement du visuel, l'illustration reste telle quelle et la photo s'y ajoute :
```
<div class="visuel" data-visuel>
  <figure class="illustration" data-illustration> … inchangée … </figure>
  <figure class="photo" data-photo="<id>">
    <p class="photo-titre">Sur une vraie voiture</p>        (loi montagne : « Sur la route »)
    <img src="/photos/<id>-800.webp" srcset="…480w, …800w, …1200w" sizes="(min-width: 40rem) 21rem, calc(100vw - 3.2rem)"
         width="1200" height="800" alt="<ce que montre la photo>" loading="lazy" decoding="async">
    <figcaption>
      <span class="photo-legende"><légende>. L'emplacement varie selon la voiture : voir votre notice.</span>
      <span class="photo-credit">Photo : <a href="<page Commons>">auteur</a>, <a rel="license" href="<licence>">licence</a>, recadrée.</span>
    </figcaption>
  </figure>
</div>
```
- **Disposition** : empilées sur téléphone, la photo sous l'illustration ; côte à côte dès 40 rem, l'illustration puis la
  photo, en deux colonnes égales, alignées en haut.
- **Marges** : le bloc garde la marge haute de l'illustration seule, donc rien ne bouge au-dessus.
- **Style** : même panneau sombre que l'illustration, petit titre en ambre (police des titres), légende en gris de nuit,
  crédit en blanc de nuit, liens en bleu de nuit.
- **Contrastes** (contre le panneau) :

  | Couleur | Rôle | Contraste |
  |---|---|---|
  | `--ambre` | petit titre | 9,97:1 |
  | `--nuit-doux` | légende | 9,72:1 |
  | `--nuit-texte` | crédit | 15,01:1 |
  | `--nuit-lien` | liens | 9,55:1 |

  Valeurs calculées par `tests/charte-b.test.ts`, qui exige au moins 4,5:1.
- **États des liens du crédit** : focus en bleu clair de nuit (variable `--focus`, comme sur l'illustration). En couleurs
  forcées (Windows), le cadre de la photo reste visible et le focus prend la couleur système `Highlight`.
- **Légende** : ce que montre la photo, avec des faits déjà présents et sourcés sur la page. Pour un organe de la voiture,
  elle se termine par « L'emplacement varie selon la voiture : voir votre notice. ». Aucune consigne ni aucun fait nouveau.
  Le nom de la voiture photographiée vient de la page Commons : il dit ce que montre la photo et n'attribue aucune consigne à
  cette voiture.
- **Texte alternatif** : ce que montre la photo, sans reprendre la légende mot pour mot.
- **Titres** : aucun titre de section n'est ajouté. Le petit titre est un paragraphe, et la liste des H2 de chaque page ne
  change pas (paquet, §5).

**Données structurées** : sur ces sept pages seulement, l'Article porte `image`, l'adresse absolue de la version de 1 200 px
(`https://decodauto.com/photos/<id>-1200.webp`). C'est la seule exception à « pas d'image » de la règle 7.5a. Les images de
partage Open Graph ne changent pas : elles restent celles de l'illustration (lot U3).

**Liens du crédit** : un lien vers la page Commons du fichier, un lien vers le texte de la licence. Ce sont les seuls liens
vers un autre site qui ne mènent pas à une source citée sur la page. Les licences CC BY et CC BY-SA les exigent : auteur,
licence avec son adresse, source et modifications. Ils sont générés depuis le registre, jamais écrits dans le texte, et
R7-LIEN-EXTERNE (texte rédigé) ne change pas.

**Licences** :
- Trois photos sont sous CC BY-SA 4.0 (liquide de refroidissement, pression des pneus, loi montagne) : recadrées, elles
  restent sous CC BY-SA 4.0. Le crédit donne cette licence et son lien, et le dit (« recadrée » ; pour la pression des
  pneus, « recadrée, floutée en partie »).
- Quatre photos sont sous CC BY 3.0 (niveau d'huile, liquide de frein, usure des pneus, batterie) : le crédit donne
  l'auteur, la licence, le lien et la modification.
- Aucune photo n'est servie depuis Commons : les fichiers sont copiés sur le site (TIERS-RESSOURCE), et la politique de
  confidentialité ne change pas.

## 4. Impact sur ce qui est validé
- **Ce qui ne change pas** :
  - aucun verdict, encadré, texte rédigé, adresse, title ni H1 ;
  - les empreintes de validation (le rendu n'y entre pas) ;
  - la favicon, le nom du site, les images de partage ;
  - les fichiers de contenu des sept pages : le registre est à part.
- **Date « Mis à jour le »** : inchangée. Position défendue :
  - la règle 14 b ne fait bouger la date que pour une vraie modification du contenu ;
  - la photo et sa légende n'ajoutent ni consigne ni fait (§3) : elles montrent ce que la page dit déjà ;
  - la demande n° 43 a suivi le même principe pour un changement de rendu ;
  - avancer la date sur sept pages pour un ajout visuel serait un signal de fraîcheur sans contenu nouveau, ce que la règle
    14 b veut éviter ;
  - DATE-SANS-MODIFICATION ne s'applique pas : la date ne bouge pas.
  
  Si Houssem juge que l'ajout est une modification, la date avance sur les sept pages, dans cette même pull request.
- **Premier écran du téléphone** : inchangé. Le bloc du visuel est plus bas que le premier écran sur les sept pages, et
  rien ne bouge au-dessus : le haut de l'illustration et le bas de la première situation sont les mêmes, au pixel près,
  avec les deux polices (paquet, §4). Haut de la photo au téléphone : de 1 793 px (pression des pneus) à 3 421 px (niveau
  d'huile, police de secours).
- **Ordinateur** : l'illustration passe de toute la colonne (685 px de large) à une demi-colonne (326 px), mesuré sur les
  sept pages et vérifié sur les captures. C'est la largeur qu'elle a déjà au téléphone (324 px), où ses étiquettes sont
  validées.
- **Page plus longue au téléphone** : de la hauteur de la photo, avec sa légende et son crédit (paquet, §4).
- **Performances** :
  - trois tailles de photo, chargées en différé : le navigateur prend la plus petite qui suffit ;
  - taille posée (1 200 × 800), donc aucun décalage de mise en page ;
  - Lighthouse mobile sur les sept pages (3 passages, médiane) : performance 100, accessibilité 100, CLS 0,000, LCP de 0,9
    à 1,1 s (paquet, §6).
- **Accessibilité** : la photo est nommée par son texte alternatif ; le crédit est du texte, ses liens ont un nom.
- **Documents** :
  - charte graphique (`docs/11`, rangée « Illustration » : composant « Visuel avec photo ») ;
  - `docs/08` (données structurées) ;
  - `docs/03` (règle 2i) ;
  - `CONTROLES.md` et `CLAUDE.md`, mis à jour dans cette pull request.
  
  La copie `docs/` ne change qu'après la validation de Houssem, par sa pull request.

## 5. Contrôles à relancer
- `npm run schemas`, `npm test`, `npm run build` (contrôle), `npm run liens` ; recette des exemples ; démonstration du
  format 2 (FORMAT2-MESURES) ; Lighthouse mobile sur les sept pages (au moins 95, CLS sous 0,1).
- **PHOTO-*** (nouveaux, `scripts/lib/photos.ts`, `tests/photos.test.ts`) :
  - **REGISTRE** : schéma ; chaque photo rattachée à une page du plan, construite au format 2 ;
  - **LARGEUR** et **RECADRAGE** : zone gardée au rapport 3:2, dans l'original, 1 600 px de large au moins ;
  - **LICENCE** : CC BY 3.0 ou CC BY-SA 4.0, avec l'adresse de Commons ;
  - **RENDU** : photo dans le bloc du visuel, après l'illustration, image et textes du registre ; aucune photo hors du
    registre ;
  - **CREDIT** : crédit visible, liens vers la page Commons et la licence ;
  - **FICHIER** : fichiers servis identiques à `src/photos/`, WebP aux dimensions annoncées, sans métadonnées, rien en trop ;
    les tests revérifient les dimensions, les métadonnées et les empreintes des fichiers produits ;
  - **DONNEES** : `image` de l'Article sur ces pages seulement.
- **FORMAT2-ILLUSTRATION** : l'illustration est seule après le bloc « Notices / Base du coût », ou en tête du bloc du
  visuel qui le suit.
- Captures à 375 × 667 et 1366 × 800, police chargée et police de secours : zone du visuel des sept pages, avant et
  après ; premier écran du téléphone.

## 6. Suivi et retour arrière
- **Relevé à J+30** de la mise en ligne, dans Search Console :
  - type « Image » : impressions et clics des sept pages ;
  - type « Web » : clics et position moyenne des mêmes pages, comparés aux 30 jours précédents.
- **Retour arrière** : retirer la ligne de la page dans `data/photos.json`, puis relancer `npm run photos`. La page revient à
  l'illustration seule. Aucune adresse de page ne change. Une image retirée n'est pas une page : pas de redirection.
- **Revue indépendante** : voir le paquet du lot (`lot-u4/paquet-u4.md`, §8).
