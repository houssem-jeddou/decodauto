// Image et balises de partage (Open Graph) de chaque page : lot U3 de l'audit UX/UI (proposition P6, retenue par Houssem
// le 21/11/2026, 7 h 11 ; travaux/etape-12/audit-ux-ui/audit.md, P6 et C7). Quand l'adresse d'une page est partagée
// (messagerie, réseau social), l'aperçu montre son titre, sa description et une image de 1 200 × 630 px.
//  - Protocole Open Graph (https://ogp.me/, lu le 21/11/2026) : og:title, og:type, og:image et og:url sur chaque page ;
//    og:url est l'adresse canonique ; og:image:alt dit ce que montre l'image (pas une légende), dès qu'il y a une image ;
//    og:locale au format langue_TERRITOIRE. Une page sans balisage particulier est de type « website » ; une page
//    éditoriale est de type « article ». Ces balises ne sont pas le JSON-LD de la règle 7.5a, qui reste inchangé.
//  - Image d'une page qui a une illustration (page éditoriale, règle 2i ; accueil au format 2) : son illustration seule, dans
//    le panneau de la charte, sur le fond nuit, `/partage/<id de la page>.png`. Google conseille, pour og:image, une image
//    représentative de la page, ni générique (le logo du site), ni chargée de texte (« Image SEO best practices », mise à
//    jour le 02/03/2026, lue le 21/11/2026) : ni marque ni nom sur ces images ; l'aperçu montre déjà le domaine. L'image de
//    la marque (`/partage/decodauto.png` : dessin, nom et devise) ne sert qu'aux pages du socle sans illustration (« à
//    propos », mentions légales) et à l'accueil au format 1.
//  - Adresse versionnée : `?v=` et le début de l'empreinte du fichier ; une image changée change d'adresse (Facebook garde
//    une image par adresse).
//  - Les images sont tirées des dessins par travaux/partage/generer-images-partage.mjs (hors construction et hors CI : il faut
//    un navigateur), pour toute page qui peut être construite (src/content, exemples, démonstration du format 2 :
//    DOSSIERS_DES_PAGES), dans `src/partage/` ; à la construction, scripts/integration-partage.ts ne copie dans le site que
//    les images que ses pages annoncent (une page non publiée ne publie pas son image). Le générateur réécrit
//    EMPREINTES_PARTAGE : empreinte de la source (générateur, couleurs de la charte, police, dessin) et du fichier, par image.
//    Une source changée sans régénération, une image manquante, en trop ou remplacée à la main font échouer les tests
//    (tests/partage.test.ts). Contrôles PARTAGE-* du site construit (scripts/lib/partage.ts).
// Module sans dépendance à l'exécution : générateur, tests et construction l'utilisent tel quel.
import { ILLUSTRATION_ACCUEIL, TITRE_ACCUEIL } from './accueil.ts';
import { attributHtml } from './html.ts';
import { DESSIN_MARQUE } from './marque.ts';
import { NOM_DU_SITE, PARTIES_DU_NOM, urlAbsolue } from './site.ts';

/** Adresse des images de partage dans le site construit. */
export const DOSSIER_PARTAGE = '/partage/';
/** Dossier des images produites par le générateur, à la racine du dépôt (jamais dans public/). */
export const SOURCE_PARTAGE = 'src/partage';
/** Dossiers des pages qui peuvent être construites (src/content.config.ts) : publiées, exemples, démonstration du format 2. */
export const DOSSIERS_DES_PAGES = ['src/content', 'exemples', 'tests/demo/format2'] as const;
/** Générateur des images : son texte entre dans l'empreinte de la source (mise en page). */
export const GENERATEUR_PARTAGE = 'travaux/partage/generer-images-partage.mjs';
/** Dimensions des images (rapport 1,91 : 1, celui des grands aperçus des réseaux sociaux). */
export const LARGEUR_PARTAGE = 1200;
export const HAUTEUR_PARTAGE = 630;
/** Poids maximal d'une image (contrôle PARTAGE-FICHIER ; X accepte 5 Mo, Facebook 8 Mo). */
export const POIDS_MAX_PARTAGE = 300_000;
/** Image de la marque : pages du socle sans illustration, et accueil au format 1. */
export const ID_IMAGE_MARQUE = 'decodauto';
/** Image de l'accueil (au format 2) : celle de son illustration. */
export const ID_IMAGE_ACCUEIL = 'accueil';
/** Langue et territoire des pages (og:locale). */
export const LOCALE_PARTAGE = 'fr_FR';
/** Police du nom du site sur l'image de la marque (celle des titres de la charte). */
export const POLICE_PARTAGE = 'public/polices/outfit.woff';
/** Couleurs de la charte utilisées par les images (variables de src/styles/charte-b.css, jamais recopiées). */
export const VARIABLES_PARTAGE = ['nuit', 'panneau', 'nuit-texte', 'ambre'] as const;
export type CouleursPartage = Readonly<Record<(typeof VARIABLES_PARTAGE)[number], string>>;

/** Couleurs des images, lues dans la feuille de la charte ; erreur si l'une manque. */
export function couleursPartage(css: string): CouleursPartage {
  const lue = (nom: string): string => {
    const v = new RegExp(`--${nom}\\s*:\\s*(#[0-9a-fA-F]{3,8})\\b`).exec(css)?.[1];
    if (v === undefined) throw new Error(`couleur --${nom} absente de src/styles/charte-b.css (images de partage)`);
    return v.toLowerCase();
  };
  return Object.fromEntries(VARIABLES_PARTAGE.map((n) => [n, lue(n)])) as CouleursPartage;
}

export type TypePartage = 'website' | 'article';
export interface Partage {
  /** Adresse de l'image, depuis la racine du site, avec sa version (`?v=`). */
  image: string;
  /** Ce que montre l'image (og:image:alt). */
  alt: string;
  type: TypePartage;
}

/** Adresse d'une image du générateur (id de la page, de l'accueil ou de la marque), sans version. */
export const imagePartage = (id: string): string => `${DOSSIER_PARTAGE}${id}.png`;

/** Adresse versionnée : `?v=` et les 12 premiers caractères de l'empreinte du fichier ; erreur sans image produite. */
export function imagePartageVersionnee(id: string): string {
  const entree = EMPREINTES_PARTAGE[id];
  if (entree === undefined) throw new Error(`image de partage « ${id} » absente : lancer node ${GENERATEUR_PARTAGE} (lot U3, ${SOURCE_PARTAGE}/)`);
  return `${imagePartage(id)}?v=${entree.image.slice(0, 12)}`;
}

/** Texte alternatif de l'image de la marque : ce qu'elle montre. */
export const ALT_PARTAGE_MARQUE = `Le logo de ${NOM_DU_SITE}, un « d » dont la boucle est un cadran de tableau de bord, le nom du site et sa devise : « ${TITRE_ACCUEIL} »`;

/** Partage d'une page du socle sans illustration (et de l'accueil au format 1) : l'image de la marque. */
export const partageMarque = (): Partage => ({ image: imagePartageVersionnee(ID_IMAGE_MARQUE), alt: ALT_PARTAGE_MARQUE, type: 'website' });

/** Partage de l'accueil au format 2 : l'image de son illustration. */
export const partageAccueil = (): Partage => ({ image: imagePartageVersionnee(ID_IMAGE_ACCUEIL), alt: ILLUSTRATION_ACCUEIL.alt, type: 'website' });

/** Partage d'une page éditoriale : l'image tirée de son illustration ; sans illustration, celle de la marque. */
export function partageEditorial(page: { id: string; illustration?: { alt: string } | undefined }): Partage {
  return page.illustration !== undefined ? { image: imagePartageVersionnee(page.id), alt: page.illustration.alt, type: 'article' } : { ...partageMarque(), type: 'article' };
}

/** Propriétés Open Graph de chaque page, dans l'ordre où le gabarit les pose (contrôle PARTAGE-BALISES). */
export const PROPRIETES_PARTAGE = [
  'og:type',
  'og:site_name',
  'og:locale',
  'og:url',
  'og:title',
  'og:description',
  'og:image',
  'og:image:type',
  'og:image:width',
  'og:image:height',
  'og:image:alt',
] as const;
/** Grand aperçu chez X, qui lit les propriétés Open Graph pour le reste. */
export const CARTE_TWITTER = 'summary_large_image';

/**
 * Balises de partage d'une page (en-tête) : titre et description de la page (ceux de `title` et de la meta description),
 * adresse canonique, image et son texte alternatif. Jamais sur la page 404, qui n'a pas d'adresse canonique.
 */
export function balisesPartage(e: { titre: string; description: string; canonical: string; partage: Partage }): string {
  const valeurs: Readonly<Record<(typeof PROPRIETES_PARTAGE)[number], string>> = {
    'og:type': e.partage.type,
    'og:site_name': NOM_DU_SITE,
    'og:locale': LOCALE_PARTAGE,
    'og:url': e.canonical,
    'og:title': e.titre,
    'og:description': e.description,
    'og:image': urlAbsolue(e.partage.image),
    'og:image:type': 'image/png',
    'og:image:width': String(LARGEUR_PARTAGE),
    'og:image:height': String(HAUTEUR_PARTAGE),
    'og:image:alt': e.partage.alt,
  };
  return [...PROPRIETES_PARTAGE.map((p) => `<meta property="${p}" content="${attributHtml(valeurs[p])}">`), `<meta name="twitter:card" content="${CARTE_TWITTER}">`].join('');
}

/**
 * Texte dont l'empreinte est celle de la source d'une image : empreinte du générateur (mise en page), couleurs de la charte,
 * empreinte de la police, dessin (fichier de l'illustration tel quel, ou `dessinMarquePartage()`). Le générateur et les
 * tests le hachent (SHA-256).
 */
export const texteSourcePartage = (empreinteGenerateur: string, couleurs: CouleursPartage, empreintePolice: string, dessin: string): string =>
  `${empreinteGenerateur}\n${VARIABLES_PARTAGE.map((n) => `${n}:${couleurs[n]}`).join(';')}\n${empreintePolice}\n${dessin}`;
/** « Dessin » de l'image de la marque : le dessin de la marque, le nom du site en deux parties et sa devise. */
export const dessinMarquePartage = (): string => `${DESSIN_MARQUE}\n${PARTIES_DU_NOM.join('|')}\n${TITRE_ACCUEIL}`;

// <empreintes-partage> : bloc réécrit par travaux/partage/generer-images-partage.mjs ; ne pas modifier à la main.
/** Empreintes SHA-256 de chaque image produite : source (texteSourcePartage) et fichier de src/partage/. */
export const EMPREINTES_PARTAGE: Readonly<Record<string, { source: string; image: string }>> = {
  'accueil': { source: '517e24f636df2817065078a53620979a19a0f7a2792a5ab2ceac358eecc854b8', image: '4d6d7865ac9e6f7f8e42e16ab01cecca0dd6f1661b3c0f3125087efb3c170d8b' },
  'batterie-changer': { source: '3a1ac2b8bbd808099b83c62e4a5583e03078c140b683dcc447f258e349a843b5', image: 'ab4f8f68226e72de3c5a50f1b271f10768cac0081d0bb653668468f4eff7f37d' },
  'batterie-recharger': { source: '25feb554ec66f012ccb3147dd307ce3deca9976662f94875b1f3bc54a4c12a66', image: '7e026a1780134ec4bcafc1d356a90ea30aed9603a354ac03042aac2ab918251a' },
  'batterie-voiture': { source: 'e082dbe324e5667f2fb2a1d6c4fb00e5d2e3e08b36ca8cec0fa179e5f2231d0a', image: 'e7827bf130c924727a543d78a52105c9b242896a1f981ac1492c920e2abe5bae' },
  'bruit-moteur': { source: 'c6c6c92b1e46ab1e0017ac8abacca3457a544c4ffe8bc5887457694e28f67916', image: '108beee8c75924cb5844b1e5e34349de3d0c00ad55830da3bdba442349f0d26b' },
  'code-p0087': { source: 'c9acc06247a73c34310c237469ab2520e31c1c3108db13dbb3905dff39b6eaf7', image: '69d0b42572a31fbfcca98f760e4f2476bed6caad86472612006f84e2c52bffc0' },
  'code-p0299': { source: '52e83f96bb0051eacdd52e4697d64b59c279c22eb0f189d471297cca0743412c', image: '128242356b8153d05031a215f2d89290395b11bb23a9043afe2dd9755258ee5d' },
  'code-p0420': { source: '24e6373c645d3707d6fe2e5c29a5c6b71e37a8107587f120ad08dec17fefc2b6', image: '3d7ade005dc2c8e33b034567b0e1f911a8fe945a199423aaa0c69950dca18a94' },
  'contre-visite-controle-technique': { source: 'efc01c9bee829315235109cfed11977a1935e8a9283382aa207f3625ec108787', image: '40d3e698c234d438faec1865e45b43f65c24b2be7f7ecb67f2ebf7772ab38df5' },
  'decodauto': { source: '967e112f9accd58d7ad25a8c79f89148dfc4de7216953e437a17ef10249b6795', image: '64b69dc5b434f8e89385013e9614ca2c042ec8d9a898a4710f02891892f3e51d' },
  'fumee-echappement': { source: '9ba4953ef3d9fc3d760ae9ae48b9f437e5df1b5de68f2d0390e861662a54d02d', image: '4e8a955272a4cc7cc6a90749899b3456c9c3371cccfe6e3a5395d35e84664b42' },
  'huile-10w40': { source: '899fe96def42fa1b40d4b14b1078b49149bbc88fcfcf3e9ae9aae886c7cd3ce3', image: 'e280ddff484c2c38d2a90326ab132db9743b293e2ad23cdaefe83f5a259b780c' },
  'huile-5w30': { source: '928b363e2c3265a2302b7fbe77645817a645cc9379e628aa307408a98804472c', image: '14243cfd7b31ca12a5b49855f1c0930d8615fafeed0a2bc47b1ea2c904ff71a7' },
  'huile-5w40': { source: '52c1b659b41d6ebc74411b981637edcc37ea39f3e620546f99adc0947045ddfb', image: '25800467ef009ed1018e4a0450dbafd8a53c161e647ba8389a3d27ff6717e97f' },
  'huile-moteur': { source: '5c35315f33f11467de2aad7e1701e14c4147a9fdb2515803f45729b4953cbc70', image: '2299abfdf35e483a633b6e590ce89d2266ac6f392d8e6e8bedf9badd2b9a87d3' },
  'liquide-de-frein': { source: 'caea110ebd127c4c9cd058277de120f438a0d9113a9c4957cc2ea65e7f891450', image: '1552745d2ef0013a0b50e9a790ed9e39b60fd9c2568d9fed96640f29a6fb657f' },
  'liquide-de-refroidissement': { source: '70862b3c04ac6c4cc6ee3ce6f9612b03724058b45f8ae57859f162fd23c93bcd', image: '680c1456339e776cbd335ac921409d75ed4b5c8a483a282e060c5739be995c2b' },
  'loi-montagne': { source: '0d7bcaa915d5ebfdf7b6f85d4444f8293959e1b91ca5cbf43f90315d2c803d51', image: 'be5d573010dd0cacf892e23dd641d86279775cd84a668b8dc8cecabf3842956a' },
  'moteur-puretech': { source: '729ec0d24fb56915570d47dc1c0300a5e2721817a313df94b8e06197c49b3893', image: '11a223f3a8c78617c4e80a5b87a60fcc7b91e9365e49c047bc97913f46b08eec' },
  'nettoyer-fap': { source: '7f47f6f6911f022aaefe58fab5db50dddaf5ac9c37e7ddd8a2070842e6cdf546', image: '7bbeb569f83a0d3f15a274b2d33e8f5817931110618937ebd3c7d3839687d786' },
  'niveau-huile': { source: '49bca6f7d4272ec6de8b310e8100240a81309f0146ee98f1fc273f7f53b77957', image: 'e73dfe5520dd1d09c515d037c139cf2d60eafdaad078bbd534fcfa81b67f09c3' },
  'perte-de-puissance': { source: '8cecbc73e205b17f4263e231d902aa320aa5854b333935d70c723b41a9dcf7ee', image: '716367a0d8038200d81ac1ff0d4d9a741af36d80d5fc62ad312e26561794f329' },
  'pression-des-pneus': { source: '2e4ce91901a73a47ac802eb3b7192e52ad86ab8566fa641af3ce642627084bc6', image: 'cb8589c0160ff226debd0b776494583bd567d5c645fbbe9a3bb013478def906f' },
  'surchauffe-moteur': { source: '34f33bb20ec8b73af5a17fa63007a6027953d6ae2cf0fd3bcb27c3592639fa13', image: '005af0eabe6bbcf3d09f749460e0bfb00f337b2ef604c06b66e4d8753935c7b0' },
  'usure-des-pneus': { source: 'fe3f6dafd01551d3624f762ee717fe1b516d28acb72fb2b790d779f6e3faf4f9', image: '8297328d031d096dd8963cf7a0892356502ae02cba8a4f5d657ec005a7ed3bb1' },
  'voiture-ne-demarre-pas': { source: 'a78b2416eaa2594191a345617bff14c62beb4ec187fab1675e5f2255db4d8361', image: '47e810dab40d7901d8ae306cb45d219c76b4838c303bbffcc52bf47b35a75327' },
  'voiture-qui-broute': { source: 'c830af3848e51272e51f846230464a22108a89323bac7a208edc86cb46f45d2d', image: '14c0f1d0a5692c29f2d11da7bbcc5c20833cbc45c4f2f6afa2db58f1c83703ec' },
  'voyant-abs-esp': { source: 'dbf33d0684d9da0608cff67360252ea7850010eb70d199024536a07553929413', image: '5501980d4e1ff4a6954949ab27a3a5265cd497c85ad4951034ecd0799a97d1ce' },
  'voyant-adblue': { source: 'dce5e7e87d8ef283226b0d17048a28743aefb9e50f3677bf32f31003682efce8', image: '28beacdcc5a938710ec54687137d88517f1ae177939e7d43e81a85d5cf16fb72' },
  'voyant-airbag': { source: 'e9298d3531a227b94782d022afd2798768ba851a18479482b2ba5b6a7cc2f25c', image: 'e5e62f1e70b4c5d3ae9e60bec80eac09a9f3c26fbbd76dc6b2204f32a82510ca' },
  'voyant-batterie': { source: 'f022000a6c95f9c90cda4340eb2ca92a884d2bd385cd82dc6781fc924ef6f2fd', image: '417f2ed14a4f8f27aef6daaced1ab7c36cff1e5e0facf1599c8e71aecfde842a' },
  'voyant-direction': { source: '7d194df554036e7cbcdcdb51558bf7bf454ccd2199156b052ab3955a07443651', image: 'e617fbfcb4823a70f43a4c21f4d19399c7ec8e766f9eefac51ba4aaaf4f1e6ba' },
  'voyant-fap': { source: '8f1a0677c4fafc2e41a2fefddd90e3872f58e2d72f31e6a1456ac7002b83e0da', image: '87663b58aa4e74d24ec569d7bd43bdc9e2a920bf93b24fae5d003e32a701b9fc' },
  'voyant-frein': { source: 'ed2621fc43cbe1bd14ec61038d8e06e22be310552940573ae33d84f03a581f3c', image: '93492b88ba843d46c5c439dbf7c5524435636608f011302a13e578ea5af5f822' },
  'voyant-huile': { source: '88179107f1c131b4d244df9706b7646efb144a0eba53cf6d0cca139006f286d2', image: '147c194db4fc986048e18ebe61f30c5f8139560cae74987d640706a9c2370e45' },
  'voyant-moteur': { source: '2ab7f36fcbb7674c0792505d3f6a29cd0da94dd37a29db30990fea5fa4db90ed', image: '217f04daba54d0a67f280d09cc143e96f95d2457bacd26e2520f2a6e2d28fbcc' },
  'voyant-prechauffage': { source: 'c5c7bec2c0c3347c1be191b18f8aef660100a631cee285d5be976967dd29842a', image: '159fc82e0eb38a31741637a61781f1d80f39d326e3e4605539a05b3ecb4198e0' },
  'voyant-pression-pneus': { source: '837bfe5dbf516ac565d2b9f12559e658391baad962518b416737f23c18026470', image: '44e071044a9cf91781c84d2ea01cda72ed47da039c809e3995ec233da317911b' },
  'voyants': { source: '517e24f636df2817065078a53620979a19a0f7a2792a5ab2ceac358eecc854b8', image: '4d6d7865ac9e6f7f8e42e16ab01cecca0dd6f1661b3c0f3125087efb3c170d8b' },
};
// </empreintes-partage>
