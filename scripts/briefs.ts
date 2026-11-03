// Génère les briefs des pages de la vague A (livrable 6.8) dans travaux/etape-6/briefs/, depuis le plan du site,
// docs/05, la base voyants, le registre, le relevé Google France et consignes.json. Usage : npm run briefs.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { briefsAttendus } from './lib/briefs-donnees.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const { fichiers } = await briefsAttendus(racine);
let ecrits = 0;
for (const [chemin, contenu] of fichiers) {
  const complet = join(racine, chemin);
  const avant = await readFile(complet, 'utf8').catch(() => undefined);
  if (avant === contenu) continue;
  await mkdir(dirname(complet), { recursive: true });
  await writeFile(complet, contenu);
  ecrits++;
}
stdout.write(ecrits === 0 ? `Briefs déjà à jour (${fichiers.size} fichiers).\n` : `${ecrits} brief(s) écrit(s) sur ${fichiers.size}.\n`);
