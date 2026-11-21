// Image et balises de partage (Open Graph) de chaque page : lot U3 de l'audit UX/UI (proposition P6, retenue par Houssem
// le 21/11/2026, 7 h 11 ; travaux/etape-12/audit-ux-ui/audit.md, P6 et C7). Quand l'adresse d'une page est partagée
// (messagerie, réseau social), l'aperçu montre son titre, sa description et une image de 1 200 × 630 px.
//  - Protocole Open Graph (https://ogp.me/, lu le 21/11/2026) : og:title, og:type, og:image et og:url sur chaque page ;
//    og:url est l'adresse canonique ; og:image:alt dit ce que montre l'image (pas une légende), dès qu'il y a une image ;
//    og:locale au format langue_TERRITOIRE. Une page sans balisage particulier est de type « website » ; une page
//    éditoriale est de type « article ». Ces balises ne sont pas le JSON-LD de la règle 7.5a, qui reste inchangé.
//  - Image d'une page éditoriale : son illustration (règle 2i), dans le panneau de la charte, sur le fond nuit, avec la
//    marque, `/partage/<id de la page>.png`. Google conseille une image représentative de la page plutôt qu'un logo (audit,
//    C10) : l'image de la marque (`/partage/decodauto.png`) ne sert qu'à l'accueil et aux pages du socle, et à une page
//    éditoriale sans illustration (aucune en ligne : l'illustration est obligatoire au format 2).
//  - Les images sont tirées des dessins par travaux/partage/generer-images-partage.mjs (hors construction et hors CI : il faut
//    un navigateur), qui réécrit EMPREINTES_PARTAGE : empreinte de la source (recette de mise en page, police, dessin) et du
//    fichier produit, par image. Un dessin changé sans régénération, une image manquante, en trop ou remplacée à la main
//    font échouer les tests (tests/partage.test.ts). Contrôles PARTAGE-* du site construit (scripts/lib/partage.ts).
// Module sans dépendance à l'exécution : générateur, tests et construction l'utilisent tel quel.
import { attributHtml } from './html.ts';
import { DESSIN_MARQUE } from './marque.ts';
import { DEVISE_DU_SITE, NOM_DU_SITE, PARTIES_DU_NOM, urlAbsolue } from './site.ts';

/** Dossier des images de partage, dans public/ et à la racine du site construit. */
export const DOSSIER_PARTAGE = '/partage/';
/** Dimensions des images (rapport 1,91 : 1, celui des grands aperçus des réseaux sociaux). */
export const LARGEUR_PARTAGE = 1200;
export const HAUTEUR_PARTAGE = 630;
/** Image de la marque : accueil et pages du socle. */
export const ID_IMAGE_MARQUE = 'decodauto';
/** Langue et territoire des pages (og:locale). */
export const LOCALE_PARTAGE = 'fr_FR';
/** Police du nom du site sur les images (celle des titres de la charte). */
export const POLICE_PARTAGE = 'public/polices/outfit.woff';
/**
 * Version de la mise en page des images (travaux/partage/generer-images-partage.mjs) : elle entre dans l'empreinte de la
 * source, si bien qu'une mise en page changée sans régénération fait échouer les tests. À changer avec la mise en page.
 */
export const RECETTE_PARTAGE = 'partage-1 : 1200 × 630, fond nuit, illustration dans le panneau (36, 482), marque en bas à gauche';

export type TypePartage = 'website' | 'article';
export interface Partage {
  /** Adresse de l'image, depuis la racine du site. */
  image: string;
  /** Ce que montre l'image (og:image:alt). */
  alt: string;
  type: TypePartage;
}

/** Adresse de l'image de partage d'une image du générateur (id de la page, ou de la marque). */
export const imagePartage = (id: string): string => `${DOSSIER_PARTAGE}${id}.png`;
export const IMAGE_PARTAGE_MARQUE = imagePartage(ID_IMAGE_MARQUE);

/** Texte alternatif de l'image de la marque : ce qu'elle montre. */
export const ALT_PARTAGE_MARQUE = `Le logo de ${NOM_DU_SITE}, un « d » dont la boucle est un cadran de tableau de bord, le nom du site et sa devise : « ${DEVISE_DU_SITE} »`;

/** Partage de l'accueil et des pages du socle : l'image de la marque. */
export const partageMarque = (): Partage => ({ image: IMAGE_PARTAGE_MARQUE, alt: ALT_PARTAGE_MARQUE, type: 'website' });

/** Partage d'une page éditoriale : l'image tirée de son illustration ; sans illustration, celle de la marque. */
export function partageEditorial(page: { id: string; illustration?: { alt: string } | undefined }): Partage {
  return page.illustration !== undefined ? { image: imagePartage(page.id), alt: page.illustration.alt, type: 'article' } : { ...partageMarque(), type: 'article' };
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
 * Texte dont l'empreinte est celle de la source d'une image : recette de mise en page, empreinte de la police, dessin
 * (fichier de l'illustration tel quel, ou `dessinMarquePartage()`). Le générateur et les tests le hachent (SHA-256).
 */
export const texteSourcePartage = (empreintePolice: string, dessin: string): string => `${RECETTE_PARTAGE}\n${empreintePolice}\n${dessin}`;
/** « Dessin » de l'image de la marque : le dessin de la marque, le nom du site en deux parties et sa devise. */
export const dessinMarquePartage = (): string => `${DESSIN_MARQUE}\n${PARTIES_DU_NOM.join('|')}\n${DEVISE_DU_SITE}`;

// <empreintes-partage> : bloc réécrit par travaux/partage/generer-images-partage.mjs ; ne pas modifier à la main.
/** Empreintes SHA-256 de chaque image produite : source (texteSourcePartage) et fichier de public/partage/. */
export const EMPREINTES_PARTAGE: Readonly<Record<string, { source: string; image: string }>> = {
  'batterie-changer': { source: '8bbb384d0222bb3ff4a89ce2c5d338bec69003520a416db50f159c61e89b7ce1', image: 'fe54290e78cb48e03e4d8fc4e855e6d6a5b07de6e873112a63c28d9ecba7aed4' },
  'batterie-recharger': { source: '710f9b3a06a2eaae00d747fe99894c1a31af19a3dbad433e481f0c1f79a6c15a', image: '2385dc3caee7e86447a693f44295ff6a63929a9c5e28813ee929dc701f45ff19' },
  'batterie-voiture': { source: '62d8911cd3e39e65a57591f8ad2f372c128b7bddc15d91994c29130474680403', image: 'de282128c2edeb4cbe49908d795abde670c56558e7ad9068a159028b25718b5c' },
  'bruit-moteur': { source: '83177c70c04d30e1fce2b52228a2037efcd196cb35b3bca2259fe081e3c1b4f3', image: 'b44d70fd46ee98731b18aadfdbc097332c3f1ac009381dbf924a4d4c80b51cb7' },
  'code-p0087': { source: '77c9f1f2a29ec63b8f3636c5c42cafbc4128c1d17b3ed447975f455bf33e56fc', image: 'cd59565b635f5aec0aa8522ede97ab54d0b09f15dd2c488a96c4811621bd3e9d' },
  'code-p0299': { source: '0f40e028706c86228275104ddf43020fd8a3be12250d5556bf3cb2067a128408', image: '9f379859ca6c562b9c4c2fbeb16f48bd027d3deed03f3077ac5faa9271443497' },
  'code-p0420': { source: 'eb6c1388e84f9562d5723a5aab79433d910968688fb872e0e0b33639fffe89c9', image: '72b94e57e2a44e6d20d1094b9e884d299278ed95badc924cc9b73900a66a6d5c' },
  'contre-visite-controle-technique': { source: 'dd433a5722e57ad1cefe3a0691e95c04b1d7d247ede76e38de3dd56dc0d7d061', image: '31260869d30cd92b1541657977844d13db0f280846fdde752a2c2ff6ea11da7c' },
  'decodauto': { source: '5a438f3ec335f149cf39f3229175030306f22c36ba8984179ab3eb3dc2b4977f', image: '64b69dc5b434f8e89385013e9614ca2c042ec8d9a898a4710f02891892f3e51d' },
  'fumee-echappement': { source: '577b9fb32a204544e1524b622ddc737d6966e93b812982b806576e862fb3542f', image: '3bd4a1a2db7eb3522d278d6286f4322f73441b0adb2906e0147f30e29774148d' },
  'huile-10w40': { source: '5059af98403ebe79b72eae3df5ff9a603c04317f2f59699f34166d42fec52fdb', image: '7095d798ca98bdd508997bac427cffc5fcd5fe9c4aae8a19dbe183cfe9b770aa' },
  'huile-5w30': { source: '0e225711aa0dd8e90ce114beeb26732657e8fabd74d375d00f0203da5fc04559', image: '02d9445456c40360b7e266d534fbd7ea6afb1879e1156a2c0338dce7db965697' },
  'huile-5w40': { source: '592411fd4d473b3865b28c1b1a9862420ca6f81e22d20d8ec40b5e23c421e6f0', image: '935949217260e66f2d6435953db4d6c29b52e5c61c41d003f426d9235e55438a' },
  'huile-moteur': { source: 'fb9f26914bd9460fb76ff8d4b64be2739d2a212f1c29861827b9531e72df07b1', image: 'a0bd070958dc141512b0fed49bf3cd2b6d58ed82c60c568d8d096d069b046320' },
  'liquide-de-frein': { source: 'f462fb538cd1e9de3a11ce5647c365dc049fb09630a538516485e7533be1df2b', image: 'd5f9220680939ee50eea197e64f346da7fad6b2fba36bec9f7e6d28ed3053d77' },
  'liquide-de-refroidissement': { source: '296656749e3ec376e643946e8f531b569324f281c7800d25a66fe9aea19f1e50', image: '17915c084fa23765b8166a98c9131e133108ecec3a642b2aae494ac891bc64ab' },
  'loi-montagne': { source: 'cc18fdeed9c4169365132a8ffd4e6a456171fc7ec3e131e4cfdbc05aa9714705', image: 'e051f3a1b559c7874f1733802f98b110f88ccb4b8a07e3a1dbcfe546b98a0b33' },
  'moteur-puretech': { source: '7a12efcf6806fcd3ac13b8b1832da1f6c5378b9582c1e79ab2a65d67182a7843', image: '73091f10d987946767e0c63b45ffa03a2972ed2bea3ee8e28bcee93e1d1c5f85' },
  'nettoyer-fap': { source: 'c1ff6384ae98e9e3f9bc9f4335af53b46618113059ef1b42b0af3b16915bcb6a', image: '3ed7dcf4b3d699508b716f4ee448258b7c830a43a2fc50b5b163c5e2becf9a96' },
  'niveau-huile': { source: '84a7734eca2b6861fc4c162a9be81705f4e0487402f12141e6c274cb7a0f7680', image: 'da09a32602a7fffe236c03886f46157dbebb9f7e58b77e098c20c5b89fd34bb6' },
  'perte-de-puissance': { source: '413b4c073128812590f6dcc35f0c7dd99bcfd934bd11073bf25ff559285519d8', image: '80231d038c1247dd2687d63b6930ed5fc54edb96b683f2462e70658eeb2ffec0' },
  'pression-des-pneus': { source: 'a57f1bcd022cfcbf01d9d7d9696f9ccc7753c9a3c523afc5193de20cec7808e8', image: 'c68f6ec35e0f5bcf270b026ee2879c9f2bd4bc42f4858095ec37ec10fda9eb0c' },
  'surchauffe-moteur': { source: 'e829b00af266c2236d056f790c6f47cc087e13a33fd5207e8237fc856cb594da', image: '601d7455779544b1f064d2a975113fa8bfc0c99132923f42d1237e0ae22440fa' },
  'usure-des-pneus': { source: 'f7323f55c2aa436986aa0268c76c47d26164c735594dcb088c376db0de433c34', image: 'fe7ad84db5ba940790e21d0c52aa9ef8678566c4484157c3569feee64ff3a303' },
  'voiture-ne-demarre-pas': { source: '28d9c9857d324b9ebf312d4965fd9672422db4ba413bfeb8096da623f49f6319', image: '46ca79d7a04ec37ae0e2c3429cee15bcaab9bdd29ad3fd2d560ebb754160bd6e' },
  'voiture-qui-broute': { source: '4a89b93f35b75c91831d25ac8c474f2a9cc4aa644cacb9b22841ec5d6ec50b39', image: '56153796449cab84e494c173e65a77fe3323e50ab0d99d750ae400c3c6fcafa2' },
  'voyant-abs-esp': { source: '5aa4ed5a333f8a201ee02a0fbf74b19b7864270ff9660ded900e70f601538cb0', image: '9e3906ae81c9b212bfd2d15af9bb6029cccbb54dc27f38f5c0cd396fb94746ba' },
  'voyant-adblue': { source: '29e4ac34126275ca721ba32f1bc0556eecd8c420fd2de2fe31c380a47eb4076c', image: '7b076059a64b32e52c2734b9042bf7a602150bc22db4f48fe87391d1f0a9b2c4' },
  'voyant-airbag': { source: '75c26a23a1d38c6ef655137cd08d11871865531cc2908a700a2dc98f2d76428f', image: 'e58bf6021ccf0f108133f4febf3545bc792a39037951eb5ca59682c258c29c9d' },
  'voyant-batterie': { source: 'f11c62f16fa66ca8291fdbc8d2ef69e6d071278d963e1312ad719151c10eec83', image: 'bd43813b5e914e1a88aeb643b7efc756d6cdf0667190f8b5b33cbe73b0bb8996' },
  'voyant-direction': { source: '1b229fe93953152a03c576350b1243f6e2fef6633ec8a37ee989d3616cff33b3', image: 'e978c384fcb566fc36f4d429c3910132d284e3556e4e502f460de7d3f196d6ab' },
  'voyant-fap': { source: 'dcfccc6be16d8b26d485dbf20674acc72928a8797fa92c34f088d408563ee442', image: 'a9fadbef5632c3fd16a6bade6b5245b720b33c51f162b8c38e81b44187e160a7' },
  'voyant-frein': { source: 'a6720da4352012ac4135e7516e2d29aeb8509e4e257fb2dea45a6908fe33d0bc', image: '3e4576fcb3c3792e697652db141c4f392dc483e6b5a05f79d6f1a51e6ac4c820' },
  'voyant-huile': { source: 'fcdd6c5ff8bf6ac30e3f3d687ddd3dac8cb31897e5f8eaab4abf71b4d62b4f1a', image: '7f4e01b911e57d5375cc2ea09fb65732c67e090191b6b9575e0dfbf18355c29d' },
  'voyant-moteur': { source: 'aec38e4aaaff21f9fbd4af4144bc8c2fdb4b540c246e4ab488a1474a42714231', image: 'e23472a042cc5a397fcc652467497d324a53177194e6f0ff2e90e1c44eb308f0' },
  'voyant-prechauffage': { source: '3cc85168a35887c538fa69afe154951e2da73051ba72e0620f945cf58efada5a', image: 'c625b8dca2dba10d880b0ff2b16a8803d87782e240b00b5d37261027bb7878cf' },
  'voyant-pression-pneus': { source: 'bf1f92c5f978cf94e5b83e08b923232cd083e4eb60640418105cb17a17f75385', image: '7e239d6c2cd7b358f613f7cfd8086c06117adfd26a5e75603d33bf993f117100' },
  'voyants': { source: 'b977ea7d30651df5f99713a4440c593b551ce033b7c4cd8c72a6823376881e46', image: 'f03bc76f91f6ff3862f165d7df9bf226a6fa9ca5437ebc8ee4cda7cd4c6df980' },
};
// </empreintes-partage>
