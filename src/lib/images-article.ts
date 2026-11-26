// Images de l'Article (données structurées) d'une page illustrée : demande de changement n° 45, acceptée le 26/11/2026
// (option A), lot B2 de l'audit n° 2 (travaux/etape-12/audit-2/audit.md, proposition P7).
//  - Documentation de Google, lue le 26/11/2026 (texte cité dans la demande n° 45, §2) : « Article (Article, NewsArticle,
//    BlogPosting) structured data », mise à jour le 2026-09-08 : « For best results, we recommend providing multiple
//    high-resolution images (minimum of 50K pixels when multiplying width and height) with the following aspect ratios:
//    16x9, 4x3, and 1x1. », « Images must represent the marked up content. », « Image URLs must be crawlable and
//    indexable. » ; « Discover and your website » : « At least 1200 px wide », « 16x9 aspect ratio », « Enabled by the
//    max-image-preview:large setting ».
//  - Une page éditoriale qui a une illustration et pas de photo du registre (data/photos.json) déclare dans son Article
//    trois images tirées de sa seule illustration, dans le panneau de la charte, sur le fond nuit : 16:9 (1 200 × 675),
//    4:3 (1 200 × 900) et 1:1 (1 200 × 1 200), `/images-article/<id>-<format>.png`, adresses versionnées (`?v=`). Une page
//    à photo garde la photo seule (demande n° 42, inchangée).
//  - Les images sont produites, pour les seules pages illustrées sans photo du registre, hors construction par travaux/partage/generer-images-article.mjs (il faut un navigateur), dans
//    `src/images-article/` (jamais public/) ; le générateur réécrit EMPREINTES_IMAGES_ARTICLE (source et fichier) ; à la
//    construction, scripts/integration-images-article.ts ne copie que les images que les pages déclarent. Les images de
//    partage (Open Graph, src/lib/partage.ts) ne changent pas. Contrôles ARTICLE-IMAGE-* (scripts/lib/images-article.ts),
//    tests/images-article.test.ts.
// Module sans dépendance à l'exécution : générateur, tests et construction l'utilisent tel quel.
import { urlAbsolue } from './site.ts';

/** Adresse des images dans le site construit. */
export const DOSSIER_IMAGES_ARTICLE = '/images-article/';
/** Dossier des images produites par le générateur, à la racine du dépôt (jamais dans public/). */
export const SOURCE_IMAGES_ARTICLE = 'src/images-article';
/** Générateur : son texte entre dans l'empreinte de la source (mise en page). */
export const GENERATEUR_IMAGES_ARTICLE = 'travaux/partage/generer-images-article.mjs';
/** Formats, dans l'ordre de la propriété `image` de l'Article (rapports d'aspect conseillés par Google). */
export const FORMATS_ARTICLE = [
  { format: '16x9', largeur: 1200, hauteur: 675 },
  { format: '4x3', largeur: 1200, hauteur: 900 },
  { format: '1x1', largeur: 1200, hauteur: 1200 },
] as const;
export type FormatArticle = (typeof FORMATS_ARTICLE)[number]['format'];
/** Poids maximal d'une image (contrôle ARTICLE-IMAGE-FICHIER). */
export const POIDS_MAX_IMAGE_ARTICLE = 400_000;

/** Nom d'une image (sans dossier ni version) : `<id de la page>-<format>`. */
export const nomImageArticle = (id: string, format: FormatArticle): string => `${id}-${format}`;

/** Adresses absolues et versionnées des trois images d'une page, dans l'ordre de FORMATS_ARTICLE ; erreur sans image produite. */
export function imagesArticle(id: string): string[] {
  return FORMATS_ARTICLE.map(({ format }) => {
    const nom = nomImageArticle(id, format);
    const entree = EMPREINTES_IMAGES_ARTICLE[nom];
    if (entree === undefined) throw new Error(`image de l'Article « ${nom} » absente : lancer node ${GENERATEUR_IMAGES_ARTICLE} (demande n° 45, ${SOURCE_IMAGES_ARTICLE}/)`);
    return urlAbsolue(`${DOSSIER_IMAGES_ARTICLE}${nom}.png?v=${entree.image.slice(0, 12)}`);
  });
}

/**
 * Texte dont l'empreinte est celle de la source d'une image : empreinte du générateur, couleurs de la charte (lues comme
 * pour les images de partage), format et dessin (fichier de l'illustration tel quel). Le générateur et les tests le hachent.
 */
export const texteSourceImageArticle = (empreinteGenerateur: string, couleurs: Readonly<Record<string, string>>, format: FormatArticle, dessin: string): string =>
  `${empreinteGenerateur}\n${Object.keys(couleurs)
    .sort()
    .map((n) => `${n}:${couleurs[n]}`)
    .join(';')}\n${format}\n${dessin}`;

// <empreintes-images-article> : bloc réécrit par travaux/partage/generer-images-article.mjs ; ne pas modifier à la main.
/** Empreintes SHA-256 de chaque image produite : source (texteSourceImageArticle) et fichier de src/images-article/. */
export const EMPREINTES_IMAGES_ARTICLE: Readonly<Record<string, { source: string; image: string }>> = {
  'batterie-changer-16x9': { source: '734ad672937969a28a93597da806d76d6a87a268d0dd87a8f024b1fc1762ee46', image: '82031c6504748638fb2851ae66e4c0fe2dcf217f793d811e3ed1d396089e95ea' },
  'batterie-changer-1x1': { source: 'b934b7c7dd41c974df0586222e11c3c2c1368ba62d49565a5503f622fc3f6edb', image: 'cdfaf509e2db26eb87577a3d4adb8dc4f12c1e6e21d1796cef02d74f21e0c5d5' },
  'batterie-changer-4x3': { source: '171324761c1aa810b1c4e24678e5cdb6111a901b23fe3a3418a3f108db3564ae', image: '7cb84f06c27077708a047735687d4fb8fff55118b86ded518994e69aac1166be' },
  'batterie-voiture-16x9': { source: 'd9ad687a3ffaa5914797814c0db7b379ea89ed91b4eecc562febfdd584a252ab', image: '2c5c64bb522cd95e12a6c81bd012d37a1813f51b7113008546f6600cbecb7651' },
  'batterie-voiture-1x1': { source: '34dda8fdff5b6b8f6f034af535eec1c943983f4abb779146de98ad06438d0a15', image: '4be3c0c875186ffd2607478e3090acd5afbeba6b36e404a89f9f55023a37edfe' },
  'batterie-voiture-4x3': { source: 'd6acf4b9dc32b28d42efd7843b4614be69fa14131f60627dd59f30bd23e851cb', image: '254e6aedd659e6f135fccb1fdf5637f7bd0a0cab926d0183c641ac74f11c3645' },
  'bruit-moteur-16x9': { source: '2cd45a522ae5f1d3ed1e627d0547144dca67471bb87bc4f98baca6ff3e291648', image: '53b10e5acdf18e9ba45c9c1a84600e0184100a5ed6ae6729cb0d5c4637f69f15' },
  'bruit-moteur-1x1': { source: '8277a68f10f9fb1f181e08941197d9733f915111f1a9cb4224673532a4804742', image: 'a1b3f0d2005c3db382d56cf00dfd04306804b1daad750986c2eb2e2d26eed7be' },
  'bruit-moteur-4x3': { source: 'b9568ec23fcf89ff0066fb78000d3b16288274c55b433f818a77051179c455ca', image: '1bc1d3e3e55fa9371fa4c2c920e51a54b2139f0e48f1b9c8a5e1788ebef5aeeb' },
  'code-p0087-16x9': { source: '07cc1cf331f1b10da4b6a06c6e2db1759b9809299fc3d9ce5f0aebe6b928bfb5', image: '69a29ea2fc8b4cc7a4cd170517725af61c92866985e0de1265d026b0d05ea58d' },
  'code-p0087-1x1': { source: '3a08b74ecb8aed3774d0a57c683a89d9ae57db36b493764114b1d65c31aa6fbe', image: '665bc1b54b4e45e09bbb3ebf46d7004e08ad056a4d2aab138449ceb47ecca0ef' },
  'code-p0087-4x3': { source: '41d553e707076e8ed56282ff762923e7893e4c514f8f2da049a7252211eb0065', image: 'c41d1bf9dc6d053d9c586fa24752c40b97ea6e1094808c137ee53dfabec41713' },
  'code-p0299-16x9': { source: '2ed25289429db0471e5df03cb335ef7491f849d1770fa182c395b59f5cbadf18', image: '6712078ae1053773654aa3e45c95cac49a4c45b24e6a4f74d7480a5b61ee6450' },
  'code-p0299-1x1': { source: '7998851b053978e36bc4c5eb796a44651e9a53eff4c4b38388f40bd4a92d22dc', image: '8ed328ebeeab017efb75379415cd46b5287d4a38969d36575ab2f7473f97f8bf' },
  'code-p0299-4x3': { source: '53517cb985ee44167e9a414e403f95dad97002c4229e40d69ed081c316b1f224', image: 'ed4a4bf91a24a8cdf9d7c24d93f0707045968cfdebd5d28cb0c9e1f3d50ad4e0' },
  'code-p0420-16x9': { source: 'c558874c8633438108784c34367d52cdd87fdd18b6dcd41724bca2fff3d16aa0', image: '74a5c8c2335d35bd75440825d58f6a7f5ae689bf54ded1879681436f08169c1b' },
  'code-p0420-1x1': { source: 'aec69fa9dcfa008983b56ad00d23922124a1d8ca5a699b4768e47a3f9478d111', image: 'a2cefb4ca637cac432bf4d8ab9ef38ff9da791ec051d9b15aeae8ea0c5313a0e' },
  'code-p0420-4x3': { source: 'e773d24a1aa8a375c9bdceb8e9f387300683c3eb90080a09e94d8e2bd185b9bd', image: '6d2af547c4279966a82943df9e6e2c283f828d07ee62fa27ce20af0c4da261ff' },
  'contre-visite-controle-technique-16x9': { source: 'd3ddc4ef5c718b726c4b2819dc4f09b166065de43bd75d3078e995432cc4d8b2', image: 'c2dddd81d2882e868f31693f02c57f352673e2677feb0afeb0cef2108de3c193' },
  'contre-visite-controle-technique-1x1': { source: 'b4534eb06b5ddf2dbb7d3cd56b02036acd501051e4f8c1a4aa74c2caa6ba1a88', image: '9f17c02f5e7af793e47252c341228df4c4bde148b973ad542569ec1a1a3890b6' },
  'contre-visite-controle-technique-4x3': { source: '5f0ae2d1bfc87400b01ca2653de5f278818dd2a66abba16d40e69dc04c9e0d30', image: '46031d5f38bc7e4aa8ec435230fb14058529afbe91afc84b259d36e783436666' },
  'fumee-echappement-16x9': { source: 'f3da725bb270e319ada5daf5bdb48e01c619f2edc4923c4eeeabc2b9f456dabb', image: '381d90347c997e579c3f7162c7ffef2315eb8da7bb4aca19e9d8c985ca8a1a8f' },
  'fumee-echappement-1x1': { source: '7e7f9de1cf784e3cba8aa7ba4045c18b7e43eb3218ad91589c9d1c7d5937b1ae', image: '7de471afd95c661e98744de88e7232fd2ace7c3a8d86bb6bbd532d065a84de68' },
  'fumee-echappement-4x3': { source: '32312b533efdb6cb8dad76e2e0664585d214d3f5c605064ab28195617ad286b8', image: 'fa2cc067e0cf432245e67dbffde157b3a130afb46a8e3ffcab02f1b422564740' },
  'huile-10w40-16x9': { source: '296e46a76f8a6776fe3591f63a1c40f4b4c902265d80c70315d34d1f332cbfe3', image: '5f919c85db969c385e4384e3705d7ce9b9e79c1ed19d5b6e3bf7a1055a21f117' },
  'huile-10w40-1x1': { source: '7fc8b427d38daebf952e453cd66f2bb8ac676904a13a993c1008218db94a55de', image: '6e194cc92de27eb87c77003942857a2e0be798321ccad201066ac862f60304c0' },
  'huile-10w40-4x3': { source: '300c9996efa258b75fc6451252048bba33e3473810f943699ea47b406e67474a', image: 'df8664ccd11dc4d71452cf3912af89253edf234823dfdd935fbb934c10b7f63e' },
  'huile-5w30-16x9': { source: 'b2a237a198d4771ca5d6073a8f9587b954cceb287da83f3b12fefec4ad0e6e08', image: 'eeef27f43c0089134da51cd6e19bfe22385da71d4b219ae18896114da444e89b' },
  'huile-5w30-1x1': { source: '09903be097e13f5b715581a8cfb1dd4185094900f88dbde9043ad553150bfc7b', image: 'f103f2cba01590892f936dd26d37d463c913ced5d23ea4bdb17d8956881927db' },
  'huile-5w30-4x3': { source: 'ac4421002fba5bc48bb9354d71f01ea6e64c2064fb03c657792a6e0f3904d97f', image: '1e49a2e575f2d322c744934424d08acfadf0ea2ab89c590b0a8ddd51866a4daf' },
  'huile-5w40-16x9': { source: '389d04d2bbc529215d46752d6980a98796e7884117cbc4191b9b8577698835b3', image: 'c0ff35d90100279d993b3c374c711260523972b6352a79ba4830aa2849a43bd5' },
  'huile-5w40-1x1': { source: '229777e56e641909ceadab0a7f0d4f217681b68fd1148a3bfb222d76cf9699e2', image: '0300555d6e22f5e5cf04f30b1f2ff3bd4068270e7f96e57e867bd75733d573cc' },
  'huile-5w40-4x3': { source: '37ec8b5a0f14690951ed04fee066b2e285639285b62cf55f9d7ef85d9844962a', image: 'b280cd61c7d2e25818126bd15c61364178a45031618ee80f0c0323977fa8fa05' },
  'huile-moteur-16x9': { source: 'c6b0b3f97ca283042c3a63c1e28effe05062833a46ab968f4e863812d37b98b6', image: 'f7a8f9c2eaa14c4b995e4bd16524cbb0eb78222cd64247754d2d8d5e9820cc6f' },
  'huile-moteur-1x1': { source: '9c585de7297b3a5df25fbc6dd442cef751d66cbb440ed1249429b167cd945887', image: '153aca43f2e14d2a68ee366b7b623425c6d0e3378b0bb903c4d130057bc7ea9f' },
  'huile-moteur-4x3': { source: '85d4f97952f0f6dbe886c136870bc3840e7709848575bb76f9209737cbf439ea', image: '8c80aa1403f0d2f757ee23e150dd7959a9297436a4cc6b4cfdcb60af5904433e' },
  'moteur-puretech-16x9': { source: '49b4717f266188602628a96697d35d50339b12670b746bf40dc4ed306ac6dadf', image: 'c7c7f4fff27d9a16adc36aedd7b2ce9680eac347fecce5e09ba6432a4b291e8e' },
  'moteur-puretech-1x1': { source: '87a01e80cb77c8c5b6c058cb65cb920d72259683c5b0bf87dffcae8adf1155e7', image: '1cf706a6da5090648c42dc2c70ac842d01b888691e475420c1a12ff928b3f4ea' },
  'moteur-puretech-4x3': { source: '24023eddfb9a62cf8ce3e4c75b86fb166f5b26c4edfbac73b87dce499a6773e0', image: 'b2a4250a799fe1cc6352aa95cdb673dd7d29b2a063743676b20d3f6844e1b4e7' },
  'nettoyer-fap-16x9': { source: 'ff6fae5caf261042a52548bc58e0014dccbe9965eb892dd819bc62774ba021cb', image: '04e6684c328ccea0eeff2060e5e5cb4febe0f60a5196173e4c3b36de8a14295d' },
  'nettoyer-fap-1x1': { source: '627084bf14a3cb2aa1844d9018835113dce91f8166003400cb541037cd8789be', image: '810b00543d8d3414215ff5078e7a469e5285a24bebdb7bcb5bffea3b1f0a6a1e' },
  'nettoyer-fap-4x3': { source: '1d4ca204860529308acaca2a48a1c49634e8cf04d8db054642a69d057d4d482b', image: 'b23ce26b637879e352ea01817d282e18f9ce9a49c212b4f79ac9423e19cbc253' },
  'perte-de-puissance-16x9': { source: '64eb41f01d0d5cdd94bc96d89c19954d36926c7fd7fef0aef9e7833b8246fb05', image: '602077bcc2664bec1ebfc6d71b47a530fcb34b61769d3f4a3a1239bef910b427' },
  'perte-de-puissance-1x1': { source: '2b6a1c5373084cfbcfcd0351467b86eaec0b67e8d7028c38e2a19a9bf3e70cfe', image: '5e566af1c3aee426a8a49103ed47c26c2b6baf513144b7ba80fa5d7f5374f792' },
  'perte-de-puissance-4x3': { source: '8901f62330d056ecef411ab856c97eee122493d4e7a7b8c2e3f5d682ffb18a41', image: 'ab6ddc29a1e8bd507712fe966db69366c22ea71439f7ed7548af5b999e465840' },
  'surchauffe-moteur-16x9': { source: '566d734ef6251eabd5899029e9bb7e89715a13fcc8f3b9c084cbe41ccc9353b9', image: 'b67ac52efc658c83220506ef76a38495341536e1e7e6403855ad68cdef6989b5' },
  'surchauffe-moteur-1x1': { source: '4eafa82c7461677161f07bd919d552bcbb9aa94180859773c83111b617e31107', image: '9048a43d78bb2e995b23bbf1fb7ff9049d84d95d4600fc6cbc569f3ebe241041' },
  'surchauffe-moteur-4x3': { source: 'a8e73b2a65b620c873ea90fb0aa9d7c439ae2d93ce83fdc224e02253cac5f311', image: '9bf6ef72c266997dbaafcbf2f9a092e79712d5740ea157d55cd2e3ba1105392b' },
  'usure-des-pneus-16x9': { source: '65e11a5e6509dbb20b3b5cc5880a7eb317cd73427bbdcbb98132d1c5e1598b83', image: 'aeee84d39b8cb91533dc4e2fa885e04186362bdcba37960e50b8746791664f9f' },
  'usure-des-pneus-1x1': { source: 'c61e152041cd579ef125fd110a4bd4cc896a53771a9d15b749ba440b2a4113ad', image: 'e5b0e30a7558a0bfee1c128de1f2a8440881da632042bcf59aa73c2b67a64d23' },
  'usure-des-pneus-4x3': { source: 'bed513bc64b928fedb5549d69b25d8ac6f02af9cd52712c4bd141bff22bb3064', image: '50fa165292dc1f3258834b5c2976447844ee4807da99f87148b849eda9511532' },
  'voiture-ne-demarre-pas-16x9': { source: '4abb2221f07d634bd8633036105a73e8b7dee9e1d984d8c9f7b4d0ad0070ccb1', image: 'd2b8248ccbc804f93e5dcedb4b900264c7de94e42e16d17f048b2970fdb8b8bc' },
  'voiture-ne-demarre-pas-1x1': { source: '2a1f4b2200d3c5f1b1743285a6eb0ec5c831bfbcbdb48c31f4d268970344a467', image: 'c5d41160678357fba5ce3e5cc37bd9651aa7b13a8053547131fa4755ed9f4872' },
  'voiture-ne-demarre-pas-4x3': { source: '6088c1345a215dca29efee6a52c3bd65ee490c0869d800b36606cbfd394feeca', image: '8ef1170b27f39707305b2191026e2d8a59e60c196cc1105f444b884b7994e349' },
  'voiture-qui-broute-16x9': { source: 'c42e588b59aa6610df1a23863c0afc54d07dab3bcdf7f72786063e1f10c102ea', image: '79f15f714fbcd86d11ae5656aface1794ebd121190bc06bba0dfd79c11aa725a' },
  'voiture-qui-broute-1x1': { source: '404e7e0dd43c0e6ced001f97d30e98cd279aa5b51456d4fefcdc335572505fa9', image: '06e01d5c90564bf4a6a78f1e7a6824eac0ef0a959838c6c2922dbfb3c8f7aaf4' },
  'voiture-qui-broute-4x3': { source: '7d41b3d06ba6ba14b480ce71cb105a4e51414c14758488155ae55f221cf03990', image: 'bdf2bdbf629fa53b452c97ff6bbedb0c4429d2fd050c9813ef8449944bd56220' },
  'voyant-abs-esp-16x9': { source: 'ee877b7252d9c996a6f5e15b8fb8a63c34b967a7d4be4089b5614281e728d87d', image: '232b943de5a6900e0f27046a527711e7af9a2e82c175399e26ab52e777b1ab12' },
  'voyant-abs-esp-1x1': { source: 'eba5b37d1547a79d551fff313c67893bce5cb866161f78068fe9cc784b7daafa', image: 'd3fa673fa1041220883690ebb492150ffa05abe8805ae70615edb37e7eb99292' },
  'voyant-abs-esp-4x3': { source: '5572f8e612a532b1b8978afc11086bb10ea276e5e6c0467cb6daa537acd8ba1b', image: 'a0b6d0de02287330fb4027002692734fec86768d2c4f3f93e11161e21ce0b684' },
  'voyant-adblue-16x9': { source: '9fc85d7d59f0758081832101217ddd3f47d60697638daca9ec5268ae2e07244c', image: '855dc568c7e361d878ce0f62cf59078a501d2d560566f15d56a371210c6865fa' },
  'voyant-adblue-1x1': { source: '679e5dda94767bf8f947d61e27a2cc8500c72fd75ecea30879db4f89173c6b3b', image: '1de3b486d6867f71a4fd3e68c413a95a94ddc239b4fd63fb82f79493fc09000c' },
  'voyant-adblue-4x3': { source: '46267a88533d1526fbb043cee7c42425d5328258992543448134ed671d935215', image: '9b5535e60cc350616a78fd9d59ddd7edf0fee277d68439906d5e8c915f077402' },
  'voyant-airbag-16x9': { source: 'a7c68d00b4b29046da3f7776588f987a8ad7cd6f6f92614c81757e6e8deb89be', image: '5a99cc9db7a1c2b30a95267ca4f25f5134c022e63daa22c126615e0ac4d76e97' },
  'voyant-airbag-1x1': { source: 'd18e30d61281126d7ff637036be4a66411b7559bf024f16191292c9265d10820', image: '2051c90b6a7e26cdbaa755ec4584c8d36d0db1636676c5ccd938b20a0a83fedc' },
  'voyant-airbag-4x3': { source: '56ab9b8af134caee861b3abd386953accb40ac458736cc14dc66077d33761e17', image: '4c3c8a24efd0f2c04940b45ce18bdb387675eaf224e98ba4f83a899184c2f83e' },
  'voyant-batterie-16x9': { source: '14f64a13157c70531344aef72dcc1b56e2f03ec3ee9d952b2797c50533d10dfc', image: '20cc6571adb906b80cbc6f04c54c5ff53e08b8d13ed9495f41343b0897747923' },
  'voyant-batterie-1x1': { source: '715e34961902cf9553b5f58afde52c73f050cf49ffddf104f5a36bdb5c042f49', image: '2a0efc860c808e4b52cc350db9d4b918534c5e286adf662ac68c4e9b5a2b5cf2' },
  'voyant-batterie-4x3': { source: '6007ef2aac46ce64889400f899992f5c5979f4333d61c32a00ab8cc048b89801', image: '318861d201fc9106660b62ce547da9ba076a01d8d9d8163557c72c523915f965' },
  'voyant-direction-16x9': { source: '1c772f8593d4eafe292a679e9a041a64ee65700597a82505413d64c1837ec7b8', image: 'cb126fbee6b3b70a57881352d89f53535f50120f11325b73a36a199ac134e5bb' },
  'voyant-direction-1x1': { source: '20b2993db516b2d0c4e010c64006f6b59285e82ea2d10bb394f8b98b0d3a3ae1', image: 'dad0d86a8a7ccb4e9cba9d20c56aebb7f2f4cb05991dfbb273d321e0a1750b55' },
  'voyant-direction-4x3': { source: '33ce027a88a0427ae6e0bed45d7192eed8fd83ef2bd14cbce53629054f195c6d', image: 'ca43a0b1c2a6728173418c3b3c3c09aac6ef94952e1747c7c855b7cc29f70d2c' },
  'voyant-fap-16x9': { source: 'b625c7b3a16f3308b886c73259ea292919f4aa5c684a475dbc13ff0f6ce8e148', image: '511a540b2619f78115997df0290e33b21431af04ff25ea1f802c78103f9ed46d' },
  'voyant-fap-1x1': { source: '266a1ef0ea223ffaad7aa39c3c42a8df1a51975edeb4cd69803d1e4c3c9d4783', image: '65d851004aaa352df1286e28b34b8a5d7205bf1c9bab868f79eae648613b6df5' },
  'voyant-fap-4x3': { source: '6a7c62264b5ff2a40e2eb341385527eb2da10bd8b4380d4af36d8c5d7bf81236', image: '1bb785bb413249c296fd79b1f9088a6d7b5e82d33f30f1c0a1173c06b13c099e' },
  'voyant-frein-16x9': { source: 'f34c14e2df423e6db8a638979996674558b6bf059963d6320a6ac83fa77ba423', image: 'd7dd85fdf73c76ed4d8fb0cc25194ab1b875e261cd97f35a54edbca49f702587' },
  'voyant-frein-1x1': { source: 'a5f0ef6275e1a9d8423fd94116941f7e7341b1898f95efe4366b70d2134f1956', image: 'a321ee22d2cb0af144416e816c2d6ec3c97d083e65490867de8e2f68d7065048' },
  'voyant-frein-4x3': { source: '258df3479c68ffdc22e5d23b497c2c071ba6563649a06be5633d91c73815139d', image: '95b502b476718661fd656b95267d2ad412bdab65f1362ec747fa0da873f4ad3e' },
  'voyant-huile-16x9': { source: '2e1f91faba023154d482147f28cf7fdef1ed41d26ff314598011f6f7f1f3f994', image: '3b7ba47d53bdca603b6921e22f5d3a6943873a4e84dc5993d2da5cb90e3f1072' },
  'voyant-huile-1x1': { source: '4a32c3aae06ab49600d6b22faedcf2cd01c647cbd087cf45963edf9bce7aafec', image: '575bb07a392b88131f1f045a8c61be556d7ba693bb921bf16613e078e4a9b72b' },
  'voyant-huile-4x3': { source: 'b87785f5f04cd18bb66e9c4e8f2ebad9e70abd72ba5fc656a6c2990fe025a8bb', image: '4e76a3e0ae5396fe534535366ac48cb6046bbb6017eecc619495f0de33bb52f0' },
  'voyant-moteur-16x9': { source: '63985b842b30e471043c88e571b9e85e40b28d4b55aacb8125c8215f139fdcd2', image: '5f486f16a07e92ac31f94d5e9bc4e18b80bb5769223810d149c25aa1cc7675ea' },
  'voyant-moteur-1x1': { source: '445f7c033213f3ba7dbfd3eb726c21f02b94bfcaa1a3121772962c56a3484b84', image: '82cd3a5cbc056d1cb69286ace9edc54c1eb94dc0b30c0c38912d26a00881f7e4' },
  'voyant-moteur-4x3': { source: 'dfc1be19e50191ce152f2f50afd4a664053d0d47dcb71b3da44d4b8a87e9aa15', image: '8bfd304e342afeab8ffdb845e516db82303882fb9364dcd085782834799bee14' },
  'voyant-prechauffage-16x9': { source: '168ebbcbc6c3c83b10e941fad5a2d56c426778fa5958fd05ef13cd76e613160f', image: '845102bbeb7908262d356523f42dd22f7ba8fa6fb6198bf794d35ce46b7b699f' },
  'voyant-prechauffage-1x1': { source: 'b4a4bc87d7ef606cd9d97dbf079f19c6cc82345a6db00b995398191982c31d46', image: '58270cb492b580da747bf44293887a22a9b7e823242b0a74ddaf6447e7e84806' },
  'voyant-prechauffage-4x3': { source: '300e482e8f8755e18256daca56059770af210ac3ecbf2797637dfd36d067c257', image: '57aeeef7d4fef69193befe567cf2ecdfe29058a794dc79ef43aac832cf66ef52' },
  'voyant-pression-pneus-16x9': { source: 'd6b5c37277ed9f0f236cd0c835828d0af024124d565aaec0240fcf4db1cf09db', image: 'e1bd8ccc5938048b6cb2d3df2740a8a6de1ee498f8c1af1f46c0f1b027350166' },
  'voyant-pression-pneus-1x1': { source: 'f2a92ee9e755108806575eaf0a9b072c1bbf4a7b4cc617da61c87d5231766afb', image: '35a48be01ef8d70c59179daf0066e54e01431dffc3b51369add2a62a401da879' },
  'voyant-pression-pneus-4x3': { source: 'a4fd30141640acdcf1c6da843dcd961e29c003d2ef8a48e32e999f823a2e395b', image: 'e332363a865f784a0cd0f1eb3d9e910ae274759dcad1b1a0197570f7f83a06ea' },
  'voyants-16x9': { source: '30f886132ff3bfffe1d3457c1c7f84a884b385b06d848b77ae2230e39084b703', image: 'b03eece66eb372939a83e1f649e71c68cd5cee7e6a90f38b0995b2b3fc893aa9' },
  'voyants-1x1': { source: 'e2d81028a48785b1d38748e3f5883cf6921816bfdae7b851d8adfd094c0cfd4d', image: '8ddfab5e3b0c6b18adae88be2a8723680124f77d2b6e8aa38635cd0ee9847fca' },
  'voyants-4x3': { source: '60e89cd1f7659c5f3db19ae90cb66db247f3fc276cfebf3678624e05bd724567', image: '11cb0442fd7772533b08739aeb1023f29b23010f2ac00bed28c2fc637e56f02a' },
};
// </empreintes-images-article>
