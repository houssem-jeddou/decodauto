// Images de l'Article (demande de changement n° 45, lot B2 de l'audit n° 2 ; src/lib/images-article.ts) : trois images
// (16:9, 4:3, 1:1) par page illustrée hors registre des photos, à jour de leur source ; adresses versionnées ; balisage et
// fichiers contrôlés dans le site construit (ARTICLE-IMAGE-*) ; l'alerte R7-IMAGE-RECOMMANDEE se tait sur une page illustrée ;
// version imprimable de la charte (maquette V4) en règles d'impression seules.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, mkdir, mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  DOSSIER_IMAGES_ARTICLE,
  EMPREINTES_IMAGES_ARTICLE,
  FORMATS_ARTICLE,
  GENERATEUR_IMAGES_ARTICLE,
  POIDS_MAX_IMAGE_ARTICLE,
  SOURCE_IMAGES_ARTICLE,
  imagesArticle,
  nomImageArticle,
  texteSourceImageArticle,
} from '../src/lib/images-article.ts';
import { DOSSIERS_DES_PAGES, couleursPartage } from '../src/lib/partage.ts';
import { dimensionsPng } from '../src/lib/marque.ts';
import { URL_SITE } from '../src/lib/site.ts';
import { articleJsonLd } from '../src/lib/donnees-structurees.ts';
import { constatsImageDeLaPage } from '../src/lib/controle.ts';
import { listerFichiers, lireFrontmatter } from '../scripts/lib/charger.ts';
import { constatsFichiersImagesArticle, constatsImageArticleDeLaPage } from '../scripts/lib/images-article.ts';
import { copierImagesArticle, imagesArticleDeclarees } from '../scripts/integration-images-article.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const sha256 = (contenu: string | Uint8Array): string => createHash('sha256').update(contenu).digest('hex');
const regles = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();
const existe = async (chemin: string): Promise<boolean> => access(chemin).then(() => true, () => false);

/** Pages illustrées hors registre des photos, dans tous les dossiers des pages qui peuvent être construites. */
async function pagesConcernees(): Promise<{ id: string; fichier: string }[]> {
  const aPhoto = new Set((JSON.parse(await readFile(join(racine, 'data/photos.json'), 'utf8')) as { page: string }[]).map((p) => p.page));
  const pages: { id: string; fichier: string }[] = [];
  for (const dossier of DOSSIERS_DES_PAGES) {
    if (!(await existe(join(racine, dossier)))) continue;
    for (const chemin of await listerFichiers(join(racine, dossier), '.md')) {
      const page = lireFrontmatter(await readFile(chemin, 'utf8')) as { id?: string; illustration?: { fichier?: string } } | null;
      if (page?.id !== undefined && page.illustration?.fichier !== undefined && !aPhoto.has(page.id)) pages.push({ id: page.id, fichier: page.illustration.fichier });
    }
  }
  return pages;
}

describe("images de l'Article : trois formats par page illustrée sans photo, à jour de leur source", () => {
  test('formats conseillés par Google (16:9, 4:3, 1:1), au moins 1 200 px de large et 300 000 pixels', () => {
    assert.deepEqual(FORMATS_ARTICLE.map((f) => f.format), ['16x9', '4x3', '1x1']);
    for (const f of FORMATS_ARTICLE) {
      const [l, h] = f.format.split('x').map(Number) as [number, number];
      assert.equal(f.largeur * h, f.hauteur * l, f.format);
      assert.ok(f.largeur >= 1200 && f.largeur * f.hauteur > 300_000, f.format);
    }
  });

  test(`chaque image correspond au générateur, aux couleurs de la charte et au dessin actuels (sinon : node ${GENERATEUR_IMAGES_ARTICLE})`, async () => {
    const empreinteGenerateur = sha256(await readFile(join(racine, GENERATEUR_IMAGES_ARTICLE)));
    const couleurs = couleursPartage(await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8'));
    const pages = await pagesConcernees();
    assert.ok(pages.length >= 31, `${pages.length} pages`);
    const attendues = new Map<string, { format: (typeof FORMATS_ARTICLE)[number]; dessin: string }>();
    for (const { id, fichier } of pages) {
      const dessin = await readFile(join(racine, 'src/illustrations', `${fichier}.svg`), 'utf8');
      for (const f of FORMATS_ARTICLE) attendues.set(nomImageArticle(id, f.format), { format: f, dessin });
    }
    // Ni image manquante, ni image en trop ; rien dans public/.
    assert.deepEqual(Object.keys(EMPREINTES_IMAGES_ARTICLE).sort(), [...attendues.keys()].sort());
    assert.deepEqual((await readdir(join(racine, SOURCE_IMAGES_ARTICLE))).sort(), [...attendues.keys()].map((n) => `${n}.png`).sort());
    assert.equal(await existe(join(racine, 'public', 'images-article')), false);
    for (const [nom, { format, dessin }] of attendues) {
      const entree = EMPREINTES_IMAGES_ARTICLE[nom];
      assert.ok(entree !== undefined, nom);
      assert.equal(sha256(texteSourceImageArticle(empreinteGenerateur, couleurs, format.format, dessin)), entree.source, `${nom} : générateur, couleurs ou dessin changés sans régénération`);
      const octets = new Uint8Array(await readFile(join(racine, SOURCE_IMAGES_ARTICLE, `${nom}.png`)));
      assert.equal(sha256(octets), entree.image, `${nom} remplacée sans régénération`);
      assert.deepEqual(dimensionsPng(octets), { largeur: format.largeur, hauteur: format.hauteur }, nom);
      assert.ok(octets.length <= POIDS_MAX_IMAGE_ARTICLE, `${nom} : ${octets.length} octets`);
    }
  });

  test('adresses absolues, versionnées, dans l’ordre 16:9, 4:3, 1:1 ; image absente : erreur explicite', () => {
    const images = imagesArticle('voyant-moteur');
    assert.deepEqual(images, FORMATS_ARTICLE.map((f) => `${URL_SITE}${DOSSIER_IMAGES_ARTICLE}voyant-moteur-${f.format}.png?v=${EMPREINTES_IMAGES_ARTICLE[`voyant-moteur-${f.format}`]?.image.slice(0, 12)}`));
    assert.throws(() => imagesArticle('inconnue'), /image de l'Article « inconnue-16x9 » absente/);
    const article = articleJsonLd({ titre: 'T', description: 'D', adresse: '/voyants/moteur/', modification: new Date('2026-11-21T00:00:00Z'), auteur: { id: 'a', nom: 'A' }, adresseAPropos: '/a-propos/', image: images });
    assert.deepEqual(article['image'], images);
  });

  test('R7-IMAGE-RECOMMANDEE : plus d’alerte sur une page illustrée ; maintenue sans illustration ni photo', () => {
    assert.deepEqual(constatsImageDeLaPage({ id: 'p', illustration: { fichier: 'x' } }, new Map()), []);
    assert.deepEqual(regles(constatsImageDeLaPage({ id: 'p' }, new Map())), ['R7-IMAGE-RECOMMANDEE']);
  });
});

describe("contrôles ARTICLE-IMAGE-* du site construit", () => {
  const images = imagesArticle('voyant-moteur');
  const page = (o: { illustration: boolean; image?: unknown }): string =>
    `<!doctype html><html><head><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', ...(o.image !== undefined ? { image: o.image } : {}) })}</script></head><body>${o.illustration ? '<figure class="illustration" data-illustration></figure>' : ''}</body></html>`;

  test('page illustrée : les trois images, dans l’ordre ; sinon ARTICLE-IMAGE-DONNEES', () => {
    assert.deepEqual(constatsImageArticleDeLaPage(page({ illustration: true, image: images }), 'f', 'voyant-moteur', false), []);
    assert.deepEqual(regles(constatsImageArticleDeLaPage(page({ illustration: true }), 'f', 'voyant-moteur', false)), ['ARTICLE-IMAGE-DONNEES']);
    assert.deepEqual(regles(constatsImageArticleDeLaPage(page({ illustration: true, image: [...images].reverse() }), 'f', 'voyant-moteur', false)), ['ARTICLE-IMAGE-DONNEES']);
    assert.deepEqual(regles(constatsImageArticleDeLaPage(page({ illustration: true, image: images[0] }), 'f', 'voyant-moteur', false)), ['ARTICLE-IMAGE-DONNEES']);
  });

  test('page sans illustration : aucune image ; page à photo : laissée à PHOTO-DONNEES', () => {
    assert.deepEqual(constatsImageArticleDeLaPage(page({ illustration: false }), 'f', 'x', false), []);
    assert.deepEqual(regles(constatsImageArticleDeLaPage(page({ illustration: false, image: images }), 'f', 'x', false)), ['ARTICLE-IMAGE-DONNEES']);
    assert.deepEqual(constatsImageArticleDeLaPage(page({ illustration: true, image: 'https://decodauto.com/photos/a-1200.webp' }), 'f', 'loi-montagne', true), []);
  });

  test('copie à la construction des seules images déclarées ; fichier servi contrôlé ; image en trop ou absente refusée', async () => {
    const dist = await mkdtemp(join(tmpdir(), 'images-article-'));
    await writeFile(join(dist, 'index.html'), page({ illustration: true, image: images }));
    const declarees = await imagesArticleDeclarees(dist);
    assert.deepEqual([...declarees].sort(), FORMATS_ARTICLE.map((f) => `${DOSSIER_IMAGES_ARTICLE}voyant-moteur-${f.format}.png`).sort());
    await copierImagesArticle(racine, dist);
    assert.deepEqual(await constatsFichiersImagesArticle(racine, dist, declarees), []);
    await writeFile(join(dist, DOSSIER_IMAGES_ARTICLE, 'voyant-huile-16x9.png'), 'x');
    assert.deepEqual(regles(await constatsFichiersImagesArticle(racine, dist, declarees)), ['ARTICLE-IMAGE-FICHIER']);
    const vide = await mkdtemp(join(tmpdir(), 'images-article-'));
    await mkdir(join(vide, 'p'), { recursive: true });
    await writeFile(join(vide, 'p', 'index.html'), page({ illustration: true, image: [`${URL_SITE}${DOSSIER_IMAGES_ARTICLE}inconnue-16x9.png?v=0`] }));
    await assert.rejects(copierImagesArticle(racine, vide), /déclarée sans fichier/);
  });
});

describe('version imprimable (maquette V4, lot B2)', () => {
  test('règles d’impression seules : la feuille de la charte a un bloc @media print qui masque la navigation et déplie « Sources »', async () => {
    const css = await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8');
    const bloc = /@media print\{([\s\S]*)\}\s*$/.exec(css)?.[1] ?? '';
    assert.ok(bloc !== '', 'bloc @media print en fin de feuille');
    assert.match(bloc, /\.bandeau,\.menu-site,\[data-sommaire\],\.pied-nav,\[data-pages-liees\]/);
    assert.match(bloc, /details\.sources::details-content\{content-visibility:visible;display:block/);
    assert.doesNotMatch(bloc, /licence/i, 'aucune licence imprimée (demande n° 47 non tranchée)');
  });
});
