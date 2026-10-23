// Vérifie la double clé d'indexation en construisant le site dans les quatre combinaisons possibles
// (variable SITE_INDEXABLE absente ou "true" × drapeau config/indexation.json faux ou vrai).
// Seule la combinaison « variable vraie ET drapeau vrai » doit produire un site indexable.
// Le drapeau du dépôt est remis dans son état d'origine à la fin, même en cas d'échec.
// Usage : npm run verifier:modes
import { execFileSync } from 'node:child_process';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { exit, stdout } from 'node:process';
import { modeIndexation } from '../src/lib/indexation.ts';
import { controlerIndexation } from './lib/dist.ts';

const FICHIER = 'config/indexation.json';
const SORTIE = 'dist-modes';
const original = await readFile(FICHIER, 'utf8');
let echecs = 0;

try {
  for (const variable of [undefined, 'true'] as const) {
    for (const drapeau of [false, true]) {
      const nom = `variable ${variable === undefined ? 'absente' : '"true"'} + drapeau ${drapeau}`;
      const attendu = variable === 'true' && drapeau;
      await writeFile(FICHIER, JSON.stringify({ indexable: drapeau }, null, 2) + '\n');
      const env = { ...process.env };
      delete env['SITE_INDEXABLE'];
      if (variable !== undefined) env['SITE_INDEXABLE'] = variable;
      const dossier = `${SORTIE}/${variable ?? 'sans'}-${drapeau}`;
      execFileSync('npx', ['astro', 'build', '--outDir', dossier], { env, stdio: 'ignore' });

      const constats = await controlerIndexation(dossier, attendu);
      let controleOk = true;
      try {
        execFileSync('node', ['scripts/controle.ts', '--dist', dossier], { env, stdio: 'pipe' });
      } catch {
        controleOk = false;
      }
      const modeCalcule = modeIndexation(env, { indexable: drapeau }).indexable;
      const ok = constats.length === 0 && controleOk && modeCalcule === attendu;
      if (!ok) echecs += 1;
      stdout.write(`${ok ? 'OK    ' : 'ÉCHEC '} ${nom} → ${attendu ? 'indexable' : 'noindex'}\n`);
      for (const c of constats) stdout.write(`        [${c.regle}] ${c.fichier ?? ''} ${c.message}\n`);
    }
  }
} finally {
  await writeFile(FICHIER, original);
  await rm(SORTIE, { recursive: true, force: true });
}
exit(echecs > 0 ? 1 : 0);
