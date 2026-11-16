// Aperçu des composants communs (livrable 6.3) : écrit la page de démonstration et la section « Méthode » dans
// dist-demo/ (ignoré par Git, jamais déployé). Usage : npm run demo
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd, stdout } from 'node:process';
import { construireDemo } from './lib/demo.ts';

const racine = cwd();
const sortie = join(racine, 'dist-demo');
const maintenant = new Date();
const demo = await construireDemo(racine, new Date(Date.UTC(maintenant.getUTCFullYear(), maintenant.getUTCMonth(), maintenant.getUTCDate())));
await mkdir(sortie, { recursive: true });
await writeFile(join(sortie, 'voyant-huile.html'), demo.html);
await writeFile(join(sortie, 'methode.html'), demo.htmlMethode);
stdout.write(`Aperçu écrit dans ${sortie} : voyant-huile.html, methode.html\n`);
