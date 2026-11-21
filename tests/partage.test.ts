// Image et balises de partage (Open Graph), lot U3 de l'audit UX/UI (proposition P6 ; src/lib/partage.ts) : une image par
// page éditoriale, tirée de son illustration, celle de la marque ailleurs ; images à jour de leur source ; balises
// cohérentes avec la page ; contrôles PARTAGE-* du site construit (scripts/lib/partage.ts).
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  ALT_PARTAGE_MARQUE,
  DOSSIER_PARTAGE,
  EMPREINTES_PARTAGE,
  HAUTEUR_PARTAGE,
  ID_IMAGE_MARQUE,
  IMAGE_PARTAGE_MARQUE,
  LARGEUR_PARTAGE,
  POLICE_PARTAGE,
  PROPRIETES_PARTAGE,
  balisesPartage,
  dessinMarquePartage,
  imagePartage,
  partageEditorial,
  partageMarque,
  texteSourcePartage,
} from '../src/lib/partage.ts';
import { dimensionsPng } from '../src/lib/marque.ts';
import { URL_SITE } from '../src/lib/site.ts';
import { listerFichiers, lireFrontmatter } from '../scripts/lib/charger.ts';
import { altIllustration, constatsBalisesPartage, constatsFichierPartage, constatsImagesUniques, controlerPartage } from '../scripts/lib/partage.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const sha256 = (contenu: string | Uint8Array): string => createHash('sha256').update(contenu).digest('hex');
const regles = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();

/** Pages publiées qui ont une illustration : id et fichier du dessin. */
async function pagesIllustrees(): Promise<{ id: string; fichier: string }[]> {
  const pages: { id: string; fichier: string }[] = [];
  for (const chemin of await listerFichiers(join(racine, 'src/content'), '.md')) {
    const page = lireFrontmatter(await readFile(chemin, 'utf8')) as { id?: string; illustration?: { fichier?: string } } | null;
    if (page?.id !== undefined && page.illustration?.fichier !== undefined) pages.push({ id: page.id, fichier: page.illustration.fichier });
  }
  return pages;
}

describe('images de partage : une par page illustrée, à jour de leur source', () => {
  test('chaque image correspond au dessin, à la police et à la mise en page actuels (sinon : node travaux/partage/generer-images-partage.mjs)', async () => {
    const empreintePolice = sha256(await readFile(join(racine, POLICE_PARTAGE)));
    const pages = await pagesIllustrees();
    assert.ok(pages.length >= 37, `${pages.length} pages illustrées`);
    const attendues = new Map<string, string>(pages.map((p) => [p.id, '']));
    for (const { id, fichier } of pages) attendues.set(id, await readFile(join(racine, 'src/illustrations', `${fichier}.svg`), 'utf8'));
    attendues.set(ID_IMAGE_MARQUE, dessinMarquePartage());
    // Ni image manquante, ni image en trop, dans le registre des empreintes comme dans public/partage/.
    assert.deepEqual(Object.keys(EMPREINTES_PARTAGE).sort(), [...attendues.keys()].sort());
    const fichiers = (await readdir(join(racine, 'public', DOSSIER_PARTAGE))).sort();
    assert.deepEqual(fichiers, [...attendues.keys()].map((id) => `${id}.png`).sort());
    for (const [id, dessin] of attendues) {
      const entree = EMPREINTES_PARTAGE[id];
      assert.ok(entree !== undefined, id);
      assert.equal(sha256(texteSourcePartage(empreintePolice, dessin)), entree.source, `${id} : dessin, police ou mise en page changés sans régénération`);
      const octets = new Uint8Array(await readFile(join(racine, 'public', imagePartage(id))));
      assert.equal(sha256(octets), entree.image, `${imagePartage(id)} remplacée sans régénération`);
      assert.deepEqual(dimensionsPng(octets), { largeur: LARGEUR_PARTAGE, hauteur: HAUTEUR_PARTAGE }, id);
    }
  });
});

describe('balises de partage', () => {
  const canonical = `${URL_SITE}/voyants/moteur/`;
  const partage = partageEditorial({ id: 'voyant-moteur', illustration: { alt: 'Le combiné, le voyant « moteur » allumé' } });

  test('chaque propriété Open Graph une fois, dans l’ordre, valeurs échappées ; carte de X en grand aperçu', () => {
    const html = balisesPartage({ titre: 'Voyant moteur : rouler ?', description: 'Fixe & orange', canonical, partage });
    assert.deepEqual([...html.matchAll(/property="([^"]+)"/g)].map((m) => m[1]), [...PROPRIETES_PARTAGE]);
    assert.match(html, /<meta property="og:image" content="https:\/\/decodauto\.com\/partage\/voyant-moteur\.png">/);
    assert.match(html, /<meta property="og:description" content="Fixe &amp; orange">/);
    assert.match(html, /<meta property="og:type" content="article">/);
    assert.match(html, /<meta property="og:locale" content="fr_FR">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">$/);
  });

  test('page éditoriale sans illustration, accueil et socle : l’image de la marque', () => {
    assert.deepEqual(partageEditorial({ id: 'x' }), { ...partageMarque(), type: 'article' });
    assert.deepEqual(partageMarque(), { image: IMAGE_PARTAGE_MARQUE, alt: ALT_PARTAGE_MARQUE, type: 'website' });
  });

  // Page construite minimale : en-tête (title, description, canonical, balises), encadré et illustration si éditoriale.
  const page = (o: { editoriale?: boolean; illustration?: string; balises?: string; canonical?: string | null } = {}): string => {
    const lien = o.canonical === null ? '' : `<link rel="canonical" href="${o.canonical ?? canonical}">`;
    const corps = `${o.editoriale === false ? '' : '<section data-encadre-decision></section>'}${o.illustration !== undefined ? `<figure class="illustration" data-illustration><svg viewBox="0 0 1 1" role="img" aria-label="${o.illustration}" focusable="false"></svg><figcaption>x</figcaption></figure>` : ''}`;
    return `<!doctype html><html><head><title>Voyant moteur : rouler ?</title><meta name="description" content="Fixe &amp; orange">${lien}${o.balises ?? ''}</head><body>${corps}</body></html>`;
  };
  const alt = 'Le combiné, le voyant « moteur » allumé';
  const conformes = balisesPartage({ titre: 'Voyant moteur : rouler ?', description: 'Fixe & orange', canonical, partage });

  test('page éditoriale conforme : aucun constat ; l’image lue est celle de la page', () => {
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
    const verifier = (balises: string, o: { editoriale?: boolean; illustration?: string } = { illustration: alt }): string[] =>
      regles(constatsBalisesPartage(page({ ...o, balises }), 'f', 'voyant-moteur').constats);
    assert.deepEqual(verifier(conformes.replace(`og:url" content="${canonical}"`, 'og:url" content="https://decodauto.com/autre/"')), ['PARTAGE-COHERENCE']);
    assert.deepEqual(verifier(conformes.replace('og:title" content="Voyant moteur : rouler ?"', 'og:title" content="Autre"')), ['PARTAGE-COHERENCE']);
    assert.deepEqual(verifier(conformes.replace('content="1200"', 'content="1000"')), ['PARTAGE-COHERENCE']);
    assert.deepEqual(verifier(conformes.replace('og:type" content="article"', 'og:type" content="website"')), ['PARTAGE-TYPE']);
    assert.deepEqual(verifier(conformes.replace('/partage/voyant-moteur.png', IMAGE_PARTAGE_MARQUE)), ['PARTAGE-IMAGE']);
    assert.deepEqual(verifier(conformes, { illustration: 'Autre dessin' }), ['PARTAGE-ALT']);
    // Accueil ou page du socle : type « website », image et texte de la marque.
    const socle = balisesPartage({ titre: 'Voyant moteur : rouler ?', description: 'Fixe & orange', canonical, partage: partageMarque() });
    assert.deepEqual(verifier(socle, { editoriale: false, illustration: alt }), []);
    assert.deepEqual(verifier(conformes, { editoriale: false }), ['PARTAGE-ALT', 'PARTAGE-IMAGE', 'PARTAGE-TYPE']);
  });

  test('page sans adresse canonique (404) : aucune balise, PARTAGE-404 sinon', () => {
    assert.deepEqual(constatsBalisesPartage(page({ canonical: null, editoriale: false }), '404.html', undefined).constats, []);
    assert.deepEqual(regles(constatsBalisesPartage(page({ canonical: null, editoriale: false, balises: conformes }), '404.html', undefined).constats), ['PARTAGE-404']);
  });

  test('une image de page portée par deux pages : PARTAGE-UNIQUE ; l’image de la marque est commune', () => {
    assert.deepEqual(constatsImagesUniques(new Map([['a', IMAGE_PARTAGE_MARQUE], ['b', IMAGE_PARTAGE_MARQUE], ['c', imagePartage('c')]])), []);
    assert.deepEqual(regles(constatsImagesUniques(new Map([['a', imagePartage('c')], ['c', imagePartage('c')]]))), ['PARTAGE-UNIQUE']);
  });

  test('image servie : PNG de 1 200 × 630 px dans public/partage/, PARTAGE-FICHIER sinon ; site construit complet', async () => {
    const dist = await mkdtemp(join(tmpdir(), 'partage-'));
    try {
      await mkdir(join(dist, 'partage'), { recursive: true });
      await mkdir(join(dist, 'voyants', 'moteur'), { recursive: true });
      await writeFile(join(dist, 'partage', 'voyant-moteur.png'), await readFile(join(racine, 'public', imagePartage('voyant-moteur'))));
      await writeFile(join(dist, 'partage', 'carree.png'), await readFile(join(racine, 'public', 'favicon.png')));
      assert.deepEqual(await constatsFichierPartage(dist, imagePartage('voyant-moteur')), []);
      assert.deepEqual(regles(await constatsFichierPartage(dist, '/partage/carree.png')), ['PARTAGE-FICHIER']);
      assert.deepEqual(regles(await constatsFichierPartage(dist, '/partage/absente.png')), ['PARTAGE-FICHIER']);
      assert.deepEqual(regles(await constatsFichierPartage(dist, '/favicon.png')), ['PARTAGE-FICHIER']);
      // Site construit : une page éditoriale conforme ; l'image de la marque manque (accueil) : PARTAGE-FICHIER seul.
      await writeFile(join(dist, 'voyants', 'moteur', 'index.html'), page({ illustration: alt, balises: conformes }));
      const accueil = balisesPartage({ titre: 'Voyant moteur : rouler ?', description: 'Fixe & orange', canonical: `${URL_SITE}/`, partage: partageMarque() });
      await writeFile(join(dist, 'index.html'), page({ editoriale: false, canonical: `${URL_SITE}/`, balises: accueil }));
      await writeFile(join(dist, '404.html'), page({ editoriale: false, canonical: null }));
      const ids = new Map([['/voyants/moteur/', 'voyant-moteur']]);
      assert.deepEqual(regles(await controlerPartage(dist, ids)), ['PARTAGE-FICHIER']);
      await writeFile(join(dist, 'partage', `${ID_IMAGE_MARQUE}.png`), await readFile(join(racine, 'public', IMAGE_PARTAGE_MARQUE)));
      assert.deepEqual(await controlerPartage(dist, ids), []);
    } finally {
      await rm(dist, { recursive: true, force: true });
    }
  });
});
