// Aperçu des composants communs (livrable 6.3) : écrit la page de démonstration et la section « Méthode » dans
// dist-demo/ (ignoré par Git, jamais déployé). Usage : npm run demo
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd, stdout } from 'node:process';
import { construireDemo, construireDemoFormat2 } from './lib/demo.ts';
import { cp } from 'node:fs/promises';

const racine = cwd();
const sortie = join(racine, 'dist-demo');
const maintenant = new Date();
const demo = await construireDemo(racine, new Date(Date.UTC(maintenant.getUTCFullYear(), maintenant.getUTCMonth(), maintenant.getUTCDate())));
await mkdir(sortie, { recursive: true });
await writeFile(join(sortie, 'voyant-huile.html'), demo.html);
await writeFile(join(sortie, 'methode.html'), demo.htmlMethode);
// Pages panne et dossier au format 2 (lot F1, F1.3c), avec la police de titre servie à côté (/polices/).
const format2 = await construireDemoFormat2(racine, new Date(Date.UTC(maintenant.getUTCFullYear(), maintenant.getUTCMonth(), maintenant.getUTCDate())));
for (const p of format2.pages) await writeFile(join(sortie, `${p.nom}.html`), p.html);
await cp(join(racine, 'public/polices'), join(sortie, 'polices'), { recursive: true });
// Icônes du site (le navigateur demande /favicon.ico de lui-même) : sans elles, une erreur 404 dans la console de l'aperçu.
for (const icone of ['favicon.ico', 'favicon.png', 'apple-touch-icon.png']) await cp(join(racine, 'public', icone), join(sortie, icone));
stdout.write(`Aperçu écrit dans ${sortie} : voyant-huile.html, methode.html, ${format2.pages.map((p) => `${p.nom}.html`).join(', ')}\n`);
