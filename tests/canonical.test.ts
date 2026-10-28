import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, describe, test } from 'node:test';
import type { Constat } from '../src/lib/controle.ts';
import { LIGNE_SITEMAP, genererPlanDuSite } from '../src/lib/site.ts';
import { controlerCanonicalEtPlanDuSite } from '../scripts/lib/dist.ts';

const dossiers: string[] = [];
after(async () => {
  for (const d of dossiers) await rm(d, { recursive: true, force: true });
});
const regles = (constats: Constat[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();

const page = (canonicals: string[]): string =>
  `<!doctype html><html lang="fr"><head><title>t</title>${canonicals.map((c) => `<link rel="canonical" href="${c}">`).join('')}</head><body><h1>t</h1></body></html>`;

/** Site construit de test : accueil, une page du plan, la 404, robots.txt et plan du site. */
async function site(options: { accueil?: string[]; voyant?: string[]; erreur404?: string[]; plan?: string | null; robots?: string } = {}): Promise<string> {
  const dist = await mkdtemp(join(tmpdir(), 'decodauto-canonical-'));
  dossiers.push(dist);
  await writeFile(join(dist, 'index.html'), page(options.accueil ?? ['https://decodauto.com/']));
  await mkdir(join(dist, 'voyants', 'moteur'), { recursive: true });
  await writeFile(join(dist, 'voyants', 'moteur', 'index.html'), page(options.voyant ?? ['https://decodauto.com/voyants/moteur/']));
  await writeFile(join(dist, '404.html'), page(options.erreur404 ?? []));
  await writeFile(join(dist, 'robots.txt'), options.robots ?? `User-agent: *\nAllow: /\n\n${LIGNE_SITEMAP}\n`);
  const plan = options.plan === undefined ? genererPlanDuSite(['/', '/voyants/moteur/']) : options.plan;
  if (plan !== null) await writeFile(join(dist, 'sitemap.xml'), plan);
  return dist;
}

describe('canonical et plan du site dans le site construit (étape 7)', () => {
  test('site conforme : aucun constat', async () => {
    assert.deepEqual(await controlerCanonicalEtPlanDuSite(await site()), []);
  });

  test('canonical absente, double, ou qui pointe ailleurs (sans barre finale, en http, en www)', async () => {
    assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ voyant: [] }))), ['CANONICAL-ABSENT']);
    assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ voyant: ['https://decodauto.com/voyants/moteur/', 'https://decodauto.com/'] }))), ['CANONICAL-MULTIPLE']);
    for (const mauvaise of ['https://decodauto.com/voyants/moteur', 'http://decodauto.com/voyants/moteur/', 'https://www.decodauto.com/voyants/moteur/', 'https://decodauto.com/']) {
      assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ voyant: [mauvaise] }))), ['CANONICAL-ADRESSE'], mauvaise);
    }
  });

  test('la 404 ne porte pas de canonical', async () => {
    assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ erreur404: ['https://decodauto.com/404/'] }))), ['CANONICAL-404']);
  });

  test('plan du site absent, mal formé, incomplet, avec une adresse inconnue ou en double', async () => {
    assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ plan: null }))), ['SITEMAP-ABSENT']);
    assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ plan: '<urlset><url><loc>https://decodauto.com/</loc></url><url><loc>https://decodauto.com/voyants/moteur/</loc></url></urlset>' }))), ['SITEMAP-FORMAT']);
    assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ plan: genererPlanDuSite(['/']) }))), ['SITEMAP-PAGE-ABSENTE']);
    assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ plan: genererPlanDuSite(['/', '/voyants/moteur/', '/404/']) }))), ['SITEMAP-ADRESSE-INCONNUE']);
    const double = genererPlanDuSite(['/', '/voyants/moteur/']).replace('</urlset>', '  <url><loc>https://decodauto.com/</loc></url>\n</urlset>');
    assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ plan: double }))), ['SITEMAP-DOUBLON']);
  });

  test('robots.txt qui n\'annonce pas le plan du site', async () => {
    assert.deepEqual(regles(await controlerCanonicalEtPlanDuSite(await site({ robots: 'User-agent: *\nAllow: /\n' }))), ['ROBOTS-SITEMAP']);
  });
});
