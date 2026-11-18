// Rendu des fragments servis par le site en ligne (relevés le 18/11/2026, fragments.json), avant (feuille de main) et après
// (feuille et code de la branche). Usage, depuis la racine du dépôt : node travaux/etape-12/lot-ameliorations/outils/rendre.ts <dossier de sortie>
// Le code du tableau (tableauxDuTexteFormat2) est extrait tel quel de src/lib/format2.ts à chaque lancement.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const racine = process.cwd();
const sortie = resolve(process.argv[2] ?? 'rendu');
const outils = join(racine, 'travaux/etape-12/lot-ameliorations/outils');
const source = readFileSync(join(racine, 'src/lib/format2.ts'), 'utf8');
const debut = source.indexOf("/**\n * Texte long d'un tableau");
const fin = source.indexOf('\n}\n', source.indexOf('export function tableauxDuTexteFormat2')) + 3;
const motsDe = source.slice(source.indexOf('export const motsDe'), source.indexOf('\n', source.indexOf('export const motsDe')) + 1);
mkdirSync(sortie, { recursive: true });
const module = join(sortie, 'transform.ts');
writeFileSync(module, `import { attributHtml, decoderEntites } from '${pathToFileURL(join(racine, 'src/lib/html.ts')).href}';\n${motsDe}${source.slice(debut, fin)}`);
const { tableauxDuTexteFormat2 } = await import(pathToFileURL(module).href);
const f = JSON.parse(readFileSync(join(outils, 'fragments.json'), 'utf8'));
const cssApres = readFileSync(join(racine, 'src/styles/charte-b.css'), 'utf8');
const cssAvant = execSync('git show origin/main:src/styles/charte-b.css', { cwd: racine }).toString();
const page = (css: string, corps: string, aside = ''): string =>
  `<!doctype html><html lang="fr" data-format="2"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style></head><body><main><div class="page"><div class="colonne">${corps}</div>${aside}</div></main></body></html>`;
for (const d of ['avant', 'apres', 'polices']) mkdirSync(join(sortie, d), { recursive: true });
copyFileSync(join(racine, 'public/polices/outfit.woff'), join(sortie, 'polices/outfit.woff'));
const bloc = (t: { bloc: string; table: string }, apres: boolean): string => {
  if (!apres) return `${t.bloc}${t.table}</div>`;
  const brut = t.bloc.includes('tableau-corps') ? `<div class="tableau-corps"${t.bloc.replace(/^<div class="tableau tableau-corps"/, '').replace(/>$/, '')}>${t.table}</div>` : t.table;
  return tableauxDuTexteFormat2(brut);
};
for (const t of f.tables) for (const [d, css, apres] of [['avant', cssAvant, false], ['apres', cssApres, true]] as const) {
  const suite = t.suite ? `<h2>${t.suite.h2}</h2>${bloc(t.suite, apres)}` : '';
  writeFileSync(join(sortie, d, `${t.p}.html`), page(css, `<h2>${t.h2}</h2>${bloc(t, apres)}${suite}`));
}
const texte = '<h2>Section</h2><p>Texte rédigé de la page, sur fond clair.</p>'.repeat(3);
for (const [d, css] of [['avant', cssAvant], ['apres', cssApres]] as const) {
  writeFileSync(join(sortie, d, 'sommaire-ordinateur.html'), page(css, texte, f.aside));
  writeFileSync(join(sortie, d, 'sommaire-telephone.html'), page(css, f.mobile + texte));
}
console.log(`rendu dans ${sortie}`);
