// Photos sous licence libre (demande de changement n° 42, lot U4 de l'audit UX/UI ; src/schemas/photos.ts, src/lib/photos.ts,
// scripts/photos.ts, scripts/integration-photos.ts, scripts/lib/photos.ts) : registre, fichiers produits (dimensions, aucune
// métadonnée, empreintes), rendu, données structurées et contrôles PHOTO-*.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import {
  FICHIER_EMPREINTES_PHOTOS,
  LARGEURS_PHOTOS,
  SOURCE_PHOTOS,
  TAILLES_PHOTO,
  TEXTES_PHOTO,
  adressePhoto,
  figurePhoto,
  imageDonneesStructurees,
  legendePhoto,
  nomFichierPhoto,
  registrePhotos,
  visuelHtml,
} from '../src/lib/photos.ts';
import { LARGEUR_SOURCE_MIN, LICENCES_PHOTOS, photoSchema, type Photo } from '../src/schemas/photos.ts';
import { articleJsonLd, scriptJsonLd } from '../src/lib/donnees-structurees.ts';
import { constatsFichiersPhotos, constatsPhotoDeLaPage, lireWebp, problemesFichierPhoto } from '../scripts/lib/photos.ts';
import { copierPhotos, photosReferencees } from '../scripts/integration-photos.ts';
import { CLIENT, delaiRetryAfter, empreinteSource } from '../scripts/photos.ts';
import { constatsImageDeLaPage } from '../src/lib/controle.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const lire = (chemin: string): Promise<string> => readFile(join(racine, chemin), 'utf8');
const regles = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();
const sha256 = (b: Buffer): string => createHash('sha256').update(b).digest('hex');

const photos = registrePhotos();

describe('photos : requêtes vers Commons (scripts/photos.ts)', () => {
  test('User-Agent conforme à la politique de Wikimedia : client, adresse du site, contact publié', () => {
    assert.equal(CLIENT, 'decodauto-photos/1.0 (https://decodauto.com/a-propos/; erreur@decodauto.com)');
  });
  test('Retry-After lu en secondes ou en date HTTP', () => {
    assert.equal(delaiRetryAfter('600'), 600_000);
    assert.equal(delaiRetryAfter(null), undefined);
    assert.equal(delaiRetryAfter('n’importe quoi'), undefined);
    assert.equal(delaiRetryAfter('Wed, 25 Nov 2026 10:00:30 GMT', Date.parse('Wed, 25 Nov 2026 10:00:00 GMT')), 30_000);
  });
});

describe('photos : image de l\'article (R7-IMAGE-RECOMMANDEE, PHOTO-REGISTRE)', () => {
  const avecPhoto = new Map([['p', {}]]);
  const regles = (page: { id: string; image?: string; format?: 1 | 2 }, registre: ReadonlyMap<string, unknown>): string[] => constatsImageDeLaPage(page, registre).map((c) => `${c.gravite}:${c.regle}`);
  test('photo du registre affichée (format 2) : pas d\'alerte', () => assert.deepEqual(regles({ id: 'p', format: 2 }, avecPhoto), []));
  test('photo du registre sur une page au format 1 (non affichée) : alerte maintenue', () => assert.deepEqual(regles({ id: 'p' }, avecPhoto), ['alerte:R7-IMAGE-RECOMMANDEE']));
  test('ni photo ni image : alerte ; champ image seul : rien', () => {
    assert.deepEqual(regles({ id: 'q', format: 2 }, avecPhoto), ['alerte:R7-IMAGE-RECOMMANDEE']);
    assert.deepEqual(regles({ id: 'q', image: 'x.png' }, avecPhoto), []);
  });
  test('champ image et photo du registre : refusé (une seule image d\'article)', () => assert.deepEqual(regles({ id: 'p', image: 'x.png', format: 2 }, avecPhoto), ['erreur:PHOTO-REGISTRE']));
});

describe('photos : registre (data/photos.json)', () => {
  test('six des sept photos acceptées par Houssem le 24/11/2026 à 19 h 19 (le témoin d\'usure retiré à la revue), une par page, au plan et au format 2', async () => {
    assert.deepEqual(
      photos.map((p) => p.page).sort(),
      ['batterie-recharger', 'liquide-de-frein', 'liquide-de-refroidissement', 'loi-montagne', 'niveau-huile', 'pression-des-pneus'],
    );
    const plan = JSON.parse(await lire('data/plan-du-site.json')) as { id: string; type: string }[];
    for (const p of photos) {
      const ligne = plan.find((l) => l.id === p.page);
      assert.ok(ligne !== undefined, p.page);
      const fichier = (await readdir(join(racine, 'src/content', ligne.type))).find((f) => f === `${p.page}.md`);
      assert.ok(fichier !== undefined, `${p.page} : page publiée`);
      assert.match(await lire(`src/content/${ligne.type}/${fichier}`), /^format: 2$/m, `${p.page} : format 2`);
      assert.equal(p.acceptation.date, '2026-11-24');
      assert.equal(p.acceptation.heure, '19:19');
      assert.equal(p.url_licence, LICENCES_PHOTOS[p.licence]);
      assert.ok(p.recadrage.largeur >= LARGEUR_SOURCE_MIN, `${p.id} : ${p.recadrage.largeur} px`);
      assert.ok(!/À ÉCRIRE|À VÉRIFIER/.test(`${p.alt} ${p.legende} ${p.verification}`), `${p.id} : texte provisoire`);
    }
    // La seule photo de la route : la loi montagne (petit titre « Sur la route »).
    assert.deepEqual(photos.filter((p) => p.nature === 'route').map((p) => p.page), ['loi-montagne']);
  });

  test('schéma : recadrage 3:2 dans l\'original, 1 600 px au moins ; licence et son adresse ; floutage dit dans le crédit', () => {
    const base = photos[0] as Photo;
    const refus = (modif: Partial<Photo>, regle: string): void => {
      const lu = photoSchema.safeParse({ ...base, ...modif });
      assert.ok(!lu.success, regle);
      assert.ok(lu.error.issues.some((i) => (i as { params?: { regle?: string } }).params?.regle === regle), regle);
    };
    refus({ recadrage: { ...base.recadrage, largeur: 1500, hauteur: 1000 } }, 'PHOTO-LARGEUR');
    refus({ recadrage: { ...base.recadrage, hauteur: base.recadrage.hauteur + 10 } }, 'PHOTO-RECADRAGE');
    refus({ recadrage: { ...base.recadrage, x: base.largeur_originale } }, 'PHOTO-RECADRAGE');
    refus({ url_licence: 'https://creativecommons.org/licenses/by-sa/4.0' === base.url_licence ? LICENCES_PHOTOS['CC BY 3.0'] : LICENCES_PHOTOS['CC BY-SA 4.0'] }, 'PHOTO-LICENCE');
    refus({ floutage: [{ x: 0, y: 0, largeur: 10, hauteur: 10 }] }, 'PHOTO-CREDIT');
    refus({ modifications: 'recadrée, floutée en partie' }, 'PHOTO-CREDIT');
    assert.throws(() => registrePhotos([base, base]), /une seule photo par page|en double/);
  });
});

describe('photos : fichiers produits (src/photos/)', () => {
  test('trois WebP par photo, de 480, 800 et 1 200 px de large, en 3:2, sans métadonnées ; rien d\'autre dans le dossier', async () => {
    const attendus = new Set(['empreintes.json', ...photos.flatMap((p) => LARGEURS_PHOTOS.map((l) => nomFichierPhoto(p.id, l)))]);
    assert.deepEqual(new Set(await readdir(join(racine, SOURCE_PHOTOS))), attendus);
    for (const p of photos) {
      for (const l of LARGEURS_PHOTOS) {
        const octets = await readFile(join(racine, SOURCE_PHOTOS, nomFichierPhoto(p.id, l)));
        assert.deepEqual(problemesFichierPhoto(octets, l), [], `${p.id} ${l}`);
      }
    }
  });

  test('empreintes : chaque fichier est celui que le script a produit, depuis la source du registre (relancer npm run photos sinon)', async () => {
    const empreintes = JSON.parse(await lire(FICHIER_EMPREINTES_PHOTOS)) as Record<string, { source: string; fichiers: Record<string, string> }>;
    const script = await lire('scripts/photos.ts');
    assert.deepEqual(Object.keys(empreintes).sort(), photos.map((p) => p.id).sort());
    for (const p of photos) {
      assert.equal(empreintes[p.id]?.source, await empreinteSource(p, script), `${p.id} : source changée (registre, original ou script) sans relancer npm run photos`);
      for (const l of LARGEURS_PHOTOS) assert.equal(empreintes[p.id]?.fichiers[String(l)], sha256(await readFile(join(racine, SOURCE_PHOTOS, nomFichierPhoto(p.id, l)))), `${p.id} ${l}`);
    }
  });

  test('lecture du WebP : métadonnées EXIF, XMP et ICC repérées ; un fichier qui n\'est pas un WebP est refusé', async () => {
    const p = photos[0] as Photo;
    const vrai = await readFile(join(racine, SOURCE_PHOTOS, nomFichierPhoto(p.id, 480)));
    assert.deepEqual(lireWebp(vrai).metadonnees, []);
    // VP8X avec les drapeaux EXIF et XMP, puis un bloc EXIF.
    const bloc = (type: string, donnees: Buffer): Buffer => {
      const t = Buffer.alloc(8);
      t.write(type, 0, 'ascii');
      t.writeUInt32LE(donnees.length, 4);
      return Buffer.concat([t, donnees, donnees.length % 2 === 1 ? Buffer.alloc(1) : Buffer.alloc(0)]);
    };
    const vp8x = Buffer.alloc(10);
    vp8x[0] = 0x08 | 0x04;
    vp8x.writeUIntLE(479, 4, 3);
    vp8x.writeUIntLE(319, 7, 3);
    const corps = Buffer.concat([Buffer.from('WEBP'), bloc('VP8X', vp8x), bloc('EXIF', Buffer.from('Exif'))]);
    const entete = Buffer.alloc(8);
    entete.write('RIFF', 0, 'ascii');
    entete.writeUInt32LE(corps.length, 4);
    const faux = Buffer.concat([entete, corps]);
    assert.deepEqual(lireWebp(faux), { largeur: 480, hauteur: 320, metadonnees: ['EXIF (drapeau VP8X)', 'XMP (drapeau VP8X)', 'EXIF'] });
    assert.match(problemesFichierPhoto(faux, 480).join(' '), /métadonnées présentes/);
    assert.match(problemesFichierPhoto(vrai, 800).join(' '), /au lieu de 800 × 533/);
    assert.deepEqual(problemesFichierPhoto(Buffer.from('pas une image, assez long pour être lu en entier'), 480), ['fichier WebP attendu (RIFF … WEBP)']);
  });
});

describe('photos : rendu (bloc du visuel)', () => {
  const organe = photos.find((p) => p.nature === 'organe') as Photo;
  const route = photos.find((p) => p.nature === 'route') as Photo;

  test('figure : petit titre, image en trois largeurs (srcset, sizes, 1 200 × 800, chargement différé), légende, crédit avec deux liens', () => {
    const $ = cheerio.load(figurePhoto(organe));
    const figure = $('figure.photo[data-photo]');
    assert.equal(figure.attr('data-photo'), organe.id);
    assert.equal(figure.children().first().text(), TEXTES_PHOTO.titreOrgane);
    const img = figure.children('img');
    assert.equal(img.attr('srcset'), LARGEURS_PHOTOS.map((l) => `${adressePhoto(organe.id, l)} ${l}w`).join(', '));
    assert.equal(img.attr('sizes'), TAILLES_PHOTO);
    assert.deepEqual([img.attr('width'), img.attr('height'), img.attr('loading'), img.attr('decoding'), img.attr('alt')], ['1200', '800', 'lazy', 'async', organe.alt]);
    assert.equal(figure.find('a[data-credit-auteur]').attr('href'), organe.page_commons);
    assert.equal(figure.find('a[data-credit-licence]').attr('href'), organe.url_licence);
    assert.equal(figure.find('a[data-credit-licence]').attr('rel'), 'license');
    assert.match(figure.find('[data-credit-photo]').text(), new RegExp(`^Photo\\u00a0: ${organe.auteur}, ${organe.licence.replace(/\./g, '\\.')}, recadrée\\.$`));
    assert.ok(legendePhoto(organe).endsWith(TEXTES_PHOTO.emplacement));
    // Loi montagne : « Sur la route », sans la phrase sur l'emplacement (ce n'est pas un organe de la voiture).
    assert.equal(cheerio.load(figurePhoto(route))('.photo-titre').text(), TEXTES_PHOTO.titreRoute);
    assert.equal(legendePhoto(route), route.legende);
  });

  test('bloc du visuel : l\'illustration seule sans photo ; sinon l\'illustration puis la photo dans data-visuel', () => {
    const illustration = '<figure class="illustration" data-illustration><svg viewBox="0 0 1 1"></svg><figcaption>x</figcaption></figure>';
    assert.equal(visuelHtml(illustration, undefined), illustration);
    const $ = cheerio.load(visuelHtml(illustration, organe));
    assert.deepEqual($('[data-visuel]').children().toArray().map((e) => $(e).is('[data-illustration]') ? 'illustration' : $(e).attr('data-photo')), ['illustration', organe.id]);
  });

  test('données structurées : image de l\'Article = adresse absolue de la version de 1 200 px ; sans photo, aucune image', () => {
    const base = { titre: 'T', description: 'D', adresse: '/liquide-de-frein/', modification: new Date('2026-11-21'), auteur: { id: 'a', nom: 'A' }, adresseAPropos: '/a-propos/' };
    assert.equal(articleJsonLd({ ...base, image: imageDonneesStructurees(organe) })['image'], `https://decodauto.com/photos/${organe.id}-1200.webp`);
    assert.ok(!('image' in articleJsonLd(base)));
  });
});

describe('photos : contrôles PHOTO-*', () => {
  const p = photos.find((x) => x.nature === 'organe') as Photo;
  const illustration = '<figure class="illustration" data-illustration><svg viewBox="0 0 1 1" role="img" aria-label="x"></svg><figcaption>x</figcaption></figure>';
  const page = (corps: string, image?: string): string =>
    `<html data-format="2"><head>${scriptJsonLd(articleJsonLd({ titre: 'T', description: 'D', adresse: '/x/', modification: new Date('2026-11-21'), auteur: { id: 'a', nom: 'A' }, adresseAPropos: '/a-propos/', image }))}</head><body><main><div data-provenance></div>${corps}</main></body></html>`;
  const bonne = page(visuelHtml(illustration, p), imageDonneesStructurees(p));
  const modifie = (f: ($: cheerio.CheerioAPI) => void, html = bonne): string => {
    const $ = cheerio.load(html);
    f($);
    return $.html();
  };

  test('page du registre bien rendue : aucun constat ; page hors registre sans photo : aucun constat', () => {
    assert.deepEqual(constatsPhotoDeLaPage(bonne, 'p.html', p), []);
    assert.deepEqual(constatsPhotoDeLaPage(page(illustration), 'q.html', undefined), []);
  });

  test('chaque écart est repéré par sa règle', () => {
    const cas: [string, string, Photo | undefined][] = [
      ['PHOTO-RENDU', page(illustration), p],
      ['PHOTO-RENDU', bonne, undefined],
      ['PHOTO-RENDU', modifie(($) => $('figure[data-photo] img').attr('alt', 'autre chose')), p],
      ['PHOTO-RENDU', modifie(($) => $('figure[data-photo] img').attr('loading', 'eager')), p],
      ['PHOTO-RENDU', modifie(($) => $('figure[data-photo] img').attr('srcset', `${adressePhoto(p.id, 800)} 800w`)), p],
      ['PHOTO-RENDU', modifie(($) => $('figure[data-photo] .photo-legende').text('Une autre légende.')), p],
      ['PHOTO-RENDU', modifie(($) => $('figure[data-photo]').insertBefore('figure[data-illustration]')), p],
      ['PHOTO-RENDU', modifie(($) => $('.photo-titre').remove()), p],
      ['PHOTO-CREDIT', modifie(($) => $('[data-credit-photo]').remove()), p],
      ['PHOTO-CREDIT', modifie(($) => $('a[data-credit-auteur]').attr('href', 'https://example.org/')), p],
      ['PHOTO-CREDIT', modifie(($) => $('a[data-credit-licence]').removeAttr('rel')), p],
      ['PHOTO-CREDIT', modifie(($) => $('a[data-credit-licence]').replaceWith('CC BY')), p],
      ['PHOTO-CREDIT', modifie(($) => $('figure[data-photo] figcaption').wrapInner('<details></details>')), p],
      ['PHOTO-DONNEES', page(visuelHtml(illustration, p)), p],
      ['PHOTO-DONNEES', page(illustration, 'https://decodauto.com/photos/x-1200.webp'), undefined],
    ];
    for (const [regle, html, photo] of cas) assert.ok(regles(constatsPhotoDeLaPage(html, 'p.html', photo)).includes(regle), `${regle} : ${html.slice(-200)}`);
  });

  test('fichiers servis : copiés depuis src/photos/ (seulement ceux référencés), identiques ; en trop, absent ou modifié : PHOTO-FICHIER', async () => {
    const dist = await mkdtemp(join(tmpdir(), 'photos-'));
    try {
      await mkdir(join(dist, 'liquide-de-frein'), { recursive: true });
      await writeFile(join(dist, 'liquide-de-frein/index.html'), bonne);
      const referencees = await photosReferencees(dist);
      assert.deepEqual([...referencees].sort(), LARGEURS_PHOTOS.map((l) => adressePhoto(p.id, l)).sort());
      assert.deepEqual((await copierPhotos(racine, dist)).length, 3);
      assert.deepEqual(await constatsFichiersPhotos(racine, dist, referencees, photos), []);
      await writeFile(join(dist, 'photos/en-trop-480.webp'), 'x');
      await writeFile(join(dist, adressePhoto(p.id, 480)), 'modifié');
      const constats = await constatsFichiersPhotos(racine, dist, referencees, photos);
      assert.deepEqual(regles(constats), ['PHOTO-FICHIER']);
      assert.match(constats.map((c) => c.message).join(' '), /en-trop-480\.webp servi sans être référencé/);
      assert.match(constats.map((c) => c.message).join(' '), /différente de src\/photos/);
      // Une photo référencée sans fichier fait échouer la construction.
      await writeFile(join(dist, 'liquide-de-frein/index.html'), bonne.replace(`${p.id}-800`, 'inconnue-800'));
      await assert.rejects(copierPhotos(racine, dist), /sans fichier dans src\/photos/);
    } finally {
      await rm(dist, { recursive: true, force: true });
    }
  });
});
