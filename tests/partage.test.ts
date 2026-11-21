// Image et balises de partage (Open Graph), lot U3 de l'audit UX/UI (proposition P6 ; src/lib/partage.ts) : une image par
// page qui a une illustration (pages éditoriales de tous les dossiers construits, accueil au format 2), celle de la marque
// ailleurs ; images à jour de leur source (générateur, couleurs de la charte, police, dessin) ; adresses versionnées ;
// balises cohérentes avec la page ; copie à la construction des seules images annoncées ; contrôles PARTAGE-* du site
// construit (scripts/lib/partage.ts).
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ILLUSTRATION_ACCUEIL } from '../src/lib/accueil.ts';
import {
  ALT_PARTAGE_MARQUE,
  DOSSIERS_DES_PAGES,
  EMPREINTES_PARTAGE,
  GENERATEUR_PARTAGE,
  HAUTEUR_PARTAGE,
  ID_IMAGE_ACCUEIL,
  ID_IMAGE_MARQUE,
  LARGEUR_PARTAGE,
  POIDS_MAX_PARTAGE,
  POLICE_PARTAGE,
  PROPRIETES_PARTAGE,
  SOURCE_PARTAGE,
  balisesPartage,
  couleursPartage,
  dessinMarquePartage,
  imagePartage,
  imagePartageVersionnee,
  partageAccueil,
  partageEditorial,
  partageMarque,
  texteSourcePartage,
} from '../src/lib/partage.ts';
import { dimensionsPng } from '../src/lib/marque.ts';
import { URL_SITE } from '../src/lib/site.ts';
import { listerFichiers, lireFrontmatter } from '../scripts/lib/charger.ts';
import { altIllustration, constatsBalisesPartage, constatsFichierPartage, constatsImagesUniques, controlerPartage } from '../scripts/lib/partage.ts';
import { copierImagesPartage, imagesAnnoncees } from '../scripts/integration-partage.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const sha256 = (contenu: string | Uint8Array): string => createHash('sha256').update(contenu).digest('hex');
const regles = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();
const existe = async (chemin: string): Promise<boolean> => access(chemin).then(() => true, () => false);

/** Pages qui ont une illustration, dans tous les dossiers des pages qui peuvent être construites : id et fichier du dessin. */
async function pagesIllustrees(): Promise<{ id: string; fichier: string }[]> {
  const pages: { id: string; fichier: string }[] = [];
  for (const dossier of DOSSIERS_DES_PAGES) {
    if (!(await existe(join(racine, dossier)))) continue;
    for (const chemin of await listerFichiers(join(racine, dossier), '.md')) {
      const page = lireFrontmatter(await readFile(chemin, 'utf8')) as { id?: string; illustration?: { fichier?: string } } | null;
      if (page?.id !== undefined && page.illustration?.fichier !== undefined) pages.push({ id: page.id, fichier: page.illustration.fichier });
    }
  }
  return pages;
}

describe('images de partage : une par page illustrée, à jour de leur source', () => {
  test('chaque image correspond au générateur, aux couleurs de la charte, à la police et au dessin actuels (sinon : node travaux/partage/generer-images-partage.mjs)', async () => {
    const empreintePolice = sha256(await readFile(join(racine, POLICE_PARTAGE)));
    const empreinteGenerateur = sha256(await readFile(join(racine, GENERATEUR_PARTAGE)));
    const couleurs = couleursPartage(await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8'));
    const pages = await pagesIllustrees();
    assert.ok(pages.length >= 37, `${pages.length} pages illustrées`);
    const attendues = new Map<string, string>();
    for (const { id, fichier } of [...pages, { id: ID_IMAGE_ACCUEIL, fichier: ILLUSTRATION_ACCUEIL.fichier }]) attendues.set(id, await readFile(join(racine, 'src/illustrations', `${fichier}.svg`), 'utf8'));
    attendues.set(ID_IMAGE_MARQUE, dessinMarquePartage());
    // Ni image manquante, ni image en trop, dans le registre des empreintes comme dans src/partage/ ; rien dans public/.
    assert.deepEqual(Object.keys(EMPREINTES_PARTAGE).sort(), [...attendues.keys()].sort());
    const fichiers = (await readdir(join(racine, SOURCE_PARTAGE))).sort();
    assert.deepEqual(fichiers, [...attendues.keys()].map((id) => `${id}.png`).sort());
    assert.equal(await existe(join(racine, 'public', 'partage')), false, 'images de partage jamais dans public/ (copiées à la construction)');
    for (const [id, dessin] of attendues) {
      const entree = EMPREINTES_PARTAGE[id];
      assert.ok(entree !== undefined, id);
      assert.equal(sha256(texteSourcePartage(empreinteGenerateur, couleurs, empreintePolice, dessin)), entree.source, `${id} : générateur, couleurs, police ou dessin changés sans régénération`);
      const octets = new Uint8Array(await readFile(join(racine, SOURCE_PARTAGE, `${id}.png`)));
      assert.equal(sha256(octets), entree.image, `${SOURCE_PARTAGE}/${id}.png remplacée sans régénération`);
      assert.deepEqual(dimensionsPng(octets), { largeur: LARGEUR_PARTAGE, hauteur: HAUTEUR_PARTAGE }, id);
      assert.ok(octets.length <= POIDS_MAX_PARTAGE, `${id} : ${octets.length} octets`);
    }
  });

  test('couleurs lues dans la charte, jamais recopiées ; une couleur absente fait échouer', async () => {
    const css = await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8');
    const couleurs = couleursPartage(css);
    for (const v of Object.values(couleurs)) assert.match(v, /^#[0-9a-f]{3,8}$/);
    assert.notEqual(sha256(texteSourcePartage('g', couleurs, 'p', 'd')), sha256(texteSourcePartage('g', { ...couleurs, nuit: '#202020' }, 'p', 'd')));
    assert.throws(() => couleursPartage(css.replace(/--ambre\s*:/, '--autre:')), /--ambre absente/);
  });

  test('adresse versionnée : ?v= et le début de l’empreinte du fichier ; image absente : erreur explicite', () => {
    assert.equal(imagePartageVersionnee('voyant-moteur'), `/partage/voyant-moteur.png?v=${EMPREINTES_PARTAGE['voyant-moteur']?.image.slice(0, 12)}`);
    assert.throws(() => imagePartageVersionnee('inconnue'), /image de partage « inconnue » absente : lancer node travaux\/partage\/generer-images-partage\.mjs/);
  });
});

describe('balises de partage', () => {
  const canonical = `${URL_SITE}/voyants/moteur/`;
  const partage = partageEditorial({ id: 'voyant-moteur', illustration: { alt: 'Le combiné, le voyant « moteur » allumé' } });
  const versionMoteur = imagePartageVersionnee('voyant-moteur');

  test('chaque propriété Open Graph une fois, dans l’ordre, valeurs échappées ; carte de X en grand aperçu', () => {
    const html = balisesPartage({ titre: 'Voyant moteur : rouler ?', description: 'Fixe & orange', canonical, partage });
    assert.deepEqual([...html.matchAll(/property="([^"]+)"/g)].map((m) => m[1]), [...PROPRIETES_PARTAGE]);
    assert.ok(html.includes(`<meta property="og:image" content="${URL_SITE}${versionMoteur}">`));
    assert.match(html, /<meta property="og:description" content="Fixe &amp; orange">/);
    assert.match(html, /<meta property="og:type" content="article">/);
    assert.match(html, /<meta property="og:locale" content="fr_FR">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">$/);
  });

  test('page éditoriale sans illustration et socle : l’image de la marque ; accueil au format 2 : celle de son illustration', () => {
    assert.deepEqual(partageEditorial({ id: 'x' }), { ...partageMarque(), type: 'article' });
    assert.deepEqual(partageMarque(), { image: imagePartageVersionnee(ID_IMAGE_MARQUE), alt: ALT_PARTAGE_MARQUE, type: 'website' });
    assert.deepEqual(partageAccueil(), { image: imagePartageVersionnee(ID_IMAGE_ACCUEIL), alt: ILLUSTRATION_ACCUEIL.alt, type: 'website' });
  });

  // Page construite minimale : en-tête (title, description, canonical, balises), encadré si éditoriale, illustration.
  const page = (o: { editoriale?: boolean; illustration?: string; balises?: string; canonical?: string | null } = {}): string => {
    const lien = o.canonical === null ? '' : `<link rel="canonical" href="${o.canonical ?? canonical}">`;
    const corps = `${o.editoriale === false ? '' : '<section data-encadre-decision></section>'}${o.illustration !== undefined ? `<figure class="illustration" data-illustration><svg viewBox="0 0 1 1" role="img" aria-label="${o.illustration}" focusable="false"></svg><figcaption>x</figcaption></figure>` : ''}`;
    return `<!doctype html><html><head><title>Voyant moteur : rouler ?</title><meta name="description" content="Fixe &amp; orange">${lien}${o.balises ?? ''}</head><body>${corps}</body></html>`;
  };
  const alt = 'Le combiné, le voyant « moteur » allumé';
  const conformes = balisesPartage({ titre: 'Voyant moteur : rouler ?', description: 'Fixe & orange', canonical, partage });

  test('page éditoriale conforme : aucun constat ; l’image lue est celle de la page, sans sa version', () => {
    const lu = constatsBalisesPartage(page({ illustration: alt, balises: conformes }), 'voyants/moteur/index.html', 'voyant-moteur');
    assert.deepEqual(lu.constats, []);
    assert.equal(lu.image, imagePartage('voyant-moteur'));
    assert.equal(altIllustration(page({ illustration: alt })), alt);
  });

  test('balise absente, répétée ou inattendue : PARTAGE-BALISES', () => {
    const verifier = (balises: string): string[] => regles(constatsBalisesPartage(page({ illustration: alt, balises }), 'f', 'voyant-moteur').constats);
    assert.deepEqual(verifier(''), ['PARTAGE-BALISES']);
    assert.deepEqual(verifier(conformes.replace(/<meta property="og:image:alt"[^>]*>/, '')), ['PARTAGE-BALISES']);
    assert.deepEqual(verifier(`${conformes}<meta property="og:title" content="autre">`), ['PARTAGE-BALISES']);
    assert.deepEqual(verifier(`${conformes}<meta property="og:video" content="x">`), ['PARTAGE-BALISES']);
    assert.deepEqual(verifier(conformes.replace('summary_large_image', 'summary')), ['PARTAGE-BALISES']);
  });

  test('balises incohérentes avec la page : PARTAGE-COHERENCE, PARTAGE-TYPE, PARTAGE-IMAGE, PARTAGE-ALT', () => {
    const verifier = (balises: string, o: { editoriale?: boolean; illustration?: string } = { illustration: alt }, id: string | undefined = 'voyant-moteur'): string[] =>
      regles(constatsBalisesPartage(page({ ...o, balises }), 'f', id).constats);
    assert.deepEqual(verifier(conformes.replace(`og:url" content="${canonical}"`, 'og:url" content="https://decodauto.com/autre/"')), ['PARTAGE-COHERENCE']);
    assert.deepEqual(verifier(conformes.replace('og:title" content="Voyant moteur : rouler ?"', 'og:title" content="Autre"')), ['PARTAGE-COHERENCE']);
    assert.deepEqual(verifier(conformes.replace('og:description" content="Fixe &amp; orange"', 'og:description" content="Autre"')), ['PARTAGE-COHERENCE']);
    assert.deepEqual(verifier(conformes.replace('og:site_name" content="decodauto"', 'og:site_name" content="Decodauto"')), ['PARTAGE-COHERENCE']);
    assert.deepEqual(verifier(conformes.replace('og:locale" content="fr_FR"', 'og:locale" content="fr-FR"')), ['PARTAGE-COHERENCE']);
    assert.deepEqual(verifier(conformes.replace('content="1200"', 'content="1000"')), ['PARTAGE-COHERENCE']);
    assert.deepEqual(verifier(conformes.replace('og:type" content="article"', 'og:type" content="website"')), ['PARTAGE-TYPE']);
    assert.deepEqual(verifier(conformes.replace(versionMoteur, imagePartageVersionnee(ID_IMAGE_MARQUE))), ['PARTAGE-IMAGE']);
    // Image sans version, ou d'une ancienne version : PARTAGE-IMAGE.
    assert.deepEqual(verifier(conformes.replace(versionMoteur, imagePartage('voyant-moteur'))), ['PARTAGE-IMAGE']);
    assert.deepEqual(verifier(conformes.replace(/\?v=[0-9a-f]{12}/, '?v=000000000000')), ['PARTAGE-IMAGE']);
    assert.deepEqual(verifier(conformes, { illustration: 'Autre dessin' }), ['PARTAGE-ALT']);
    // Page du socle (sans illustration) : type « website », image et texte de la marque.
    const socle = balisesPartage({ titre: 'Voyant moteur : rouler ?', description: 'Fixe & orange', canonical, partage: partageMarque() });
    assert.deepEqual(verifier(socle, { editoriale: false }, 'a-propos'), []);
    assert.deepEqual(verifier(conformes, { editoriale: false }, 'a-propos'), ['PARTAGE-ALT', 'PARTAGE-IMAGE', 'PARTAGE-TYPE']);
    // Accueil au format 2 (illustration, sans encadré) : type « website », image et texte de son illustration.
    const accueil = balisesPartage({ titre: 'Voyant moteur : rouler ?', description: 'Fixe & orange', canonical, partage: partageAccueil() });
    assert.deepEqual(verifier(accueil, { editoriale: false, illustration: ILLUSTRATION_ACCUEIL.alt }, 'accueil'), []);
    assert.deepEqual(verifier(socle, { editoriale: false, illustration: ILLUSTRATION_ACCUEIL.alt }, 'accueil'), ['PARTAGE-ALT', 'PARTAGE-IMAGE']);
  });

  test('page sans adresse canonique (404) : aucune balise, PARTAGE-404 sinon', () => {
    assert.deepEqual(constatsBalisesPartage(page({ canonical: null, editoriale: false }), '404.html', undefined).constats, []);
    assert.deepEqual(regles(constatsBalisesPartage(page({ canonical: null, editoriale: false, balises: conformes }), '404.html', undefined).constats), ['PARTAGE-404']);
  });

  test('une image de page portée par deux pages : PARTAGE-UNIQUE ; l’image de la marque est commune', () => {
    const marque = imagePartage(ID_IMAGE_MARQUE);
    assert.deepEqual(constatsImagesUniques(new Map([['a', marque], ['b', marque], ['c', imagePartage('c')]])), []);
    assert.deepEqual(regles(constatsImagesUniques(new Map([['a', imagePartage('c')], ['c', imagePartage('c')]]))), ['PARTAGE-UNIQUE']);
  });

  test('image servie : PNG de 1 200 × 630 px, au poids maximal, celle du registre ; PARTAGE-FICHIER sinon ; site construit complet', async () => {
    const dist = await mkdtemp(join(tmpdir(), 'partage-'));
    try {
      await mkdir(join(dist, 'partage'), { recursive: true });
      await mkdir(join(dist, 'voyants', 'moteur'), { recursive: true });
      const moteur = await readFile(join(racine, SOURCE_PARTAGE, 'voyant-moteur.png'));
      await writeFile(join(dist, 'partage', 'voyant-moteur.png'), moteur);
      await writeFile(join(dist, 'partage', 'carree.png'), await readFile(join(racine, 'public', 'favicon.png')));
      await writeFile(join(dist, 'partage', 'lourde.png'), Buffer.concat([moteur, Buffer.alloc(POIDS_MAX_PARTAGE)]));
      await writeFile(join(dist, 'partage', 'voyant-huile.png'), moteur);
      assert.deepEqual(await constatsFichierPartage(dist, imagePartage('voyant-moteur')), []);
      for (const image of ['/partage/carree.png', '/partage/absente.png', '/favicon.png', '/partage/lourde.png', imagePartage('voyant-huile')]) {
        assert.deepEqual(regles(await constatsFichierPartage(dist, image)), ['PARTAGE-FICHIER'], image);
      }
      assert.match((await constatsFichierPartage(dist, '/partage/lourde.png'))[0]?.message ?? '', /au-delà de 300000/);
      assert.match((await constatsFichierPartage(dist, imagePartage('voyant-huile')))[0]?.message ?? '', /n'est pas l'image du registre/);
      // Site construit : une page éditoriale conforme ; l'image de la marque manque (page du socle) : PARTAGE-FICHIER seul.
      await rm(join(dist, 'partage', 'voyant-huile.png'));
      await writeFile(join(dist, 'voyants', 'moteur', 'index.html'), page({ illustration: alt, balises: conformes }));
      await mkdir(join(dist, 'a-propos'), { recursive: true });
      const socle = balisesPartage({ titre: 'Voyant moteur : rouler ?', description: 'Fixe & orange', canonical: `${URL_SITE}/a-propos/`, partage: partageMarque() });
      await writeFile(join(dist, 'a-propos', 'index.html'), page({ editoriale: false, canonical: `${URL_SITE}/a-propos/`, balises: socle }));
      await writeFile(join(dist, '404.html'), page({ editoriale: false, canonical: null }));
      const ids = new Map([['/voyants/moteur/', 'voyant-moteur'], ['/a-propos/', 'a-propos']]);
      assert.deepEqual(regles(await controlerPartage(dist, ids)), ['PARTAGE-FICHIER']);
      await writeFile(join(dist, 'partage', `${ID_IMAGE_MARQUE}.png`), await readFile(join(racine, SOURCE_PARTAGE, `${ID_IMAGE_MARQUE}.png`)));
      assert.deepEqual(await controlerPartage(dist, ids), []);
    } finally {
      await rm(dist, { recursive: true, force: true });
    }
  });
});

describe('copie à la construction (scripts/integration-partage.ts)', () => {
  test('seules les images annoncées par les pages construites sont copiées, depuis src/partage/ ; une image sans fichier fait échouer', async () => {
    const dist = await mkdtemp(join(tmpdir(), 'partage-copie-'));
    try {
      const balises = (p: Parameters<typeof balisesPartage>[0]['partage']): string => balisesPartage({ titre: 't', description: 'd', canonical: `${URL_SITE}/x/`, partage: p });
      await mkdir(join(dist, 'voyants', 'moteur'), { recursive: true });
      await writeFile(join(dist, 'voyants', 'moteur', 'index.html'), `<head>${balises(partageEditorial({ id: 'voyant-moteur', illustration: { alt: 'a' } }))}</head>`);
      await writeFile(join(dist, 'index.html'), `<head>${balises(partageAccueil())}</head>`);
      await writeFile(join(dist, '404.html'), '<head></head>');
      assert.deepEqual([...(await imagesAnnoncees(dist))].sort(), [imagePartage(ID_IMAGE_ACCUEIL), imagePartage('voyant-moteur')]);
      assert.deepEqual(await copierImagesPartage(racine, dist), [imagePartage(ID_IMAGE_ACCUEIL), imagePartage('voyant-moteur')]);
      assert.deepEqual((await readdir(join(dist, 'partage'))).sort(), ['accueil.png', 'voyant-moteur.png']);
      assert.equal(sha256(new Uint8Array(await readFile(join(dist, 'partage', 'voyant-moteur.png')))), EMPREINTES_PARTAGE['voyant-moteur']?.image);
      await writeFile(join(dist, 'index.html'), `<head><meta property="og:image" content="${URL_SITE}/partage/absente.png?v=0"></head>`);
      await assert.rejects(() => copierImagesPartage(racine, dist), /absente\.png annoncée sans fichier dans src\/partage\//);
    } finally {
      await rm(dist, { recursive: true, force: true });
    }
  });
});
