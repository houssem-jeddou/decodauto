// Met à jour les parties générées de docs/09_plan_du_site.md depuis data/plan-du-site.json et docs/05.
// Usage : npm run plan:vue (après une demande de changement acceptée sur le plan du site).
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import type { PlanDuSite } from '../src/schemas/donnees.ts';
import { FICHIER_05, lireCsv } from '../src/lib/porte-plan.ts';
import { genererVue, insererVue } from './lib/vue-plan.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const cheminVue = join(racine, 'docs', '09_plan_du_site.md');
const plan = JSON.parse(await readFile(join(racine, 'data', 'plan-du-site.json'), 'utf8')) as PlanDuSite[];
const motsCles = lireCsv(await readFile(join(racine, FICHIER_05), 'utf8'));
const avant = await readFile(cheminVue, 'utf8');
const apres = insererVue(avant, genererVue(plan, motsCles));
if (apres === avant) stdout.write('docs/09 est déjà à jour.\n');
else {
  await writeFile(cheminVue, apres);
  stdout.write('docs/09 mis à jour depuis data/plan-du-site.json et docs/05.\n');
}
