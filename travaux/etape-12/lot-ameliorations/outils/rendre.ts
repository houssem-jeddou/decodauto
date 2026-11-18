import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { tableauxDuTexteFormat2 } from './transform.ts';
const f = JSON.parse(readFileSync('fragments.json', 'utf8'));
const cssApres = readFileSync('/home/claude/decodauto/src/styles/charte-b.css', 'utf8');
const cssAvant = execSync('git -C /home/claude/decodauto show origin/main:src/styles/charte-b.css').toString();
const page = (css: string, corps: string, aside = ''): string =>
  `<!doctype html><html lang="fr" data-format="2"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style></head><body><main><div class="page"><div class="colonne">${corps}</div>${aside}</div></main></body></html>`;
mkdirSync('site/avant', { recursive: true }); mkdirSync('site/apres', { recursive: true });
for (const t of f.tables) {
  const avant = `${t.bloc}${t.table}</div>`;
  // Après : le code de la branche, appliqué au tableau tel qu'il sort du Markdown (élément unique ou tableau du texte).
  const source = t.bloc.includes('tableau-corps') ? `<div class="tableau-corps"${t.bloc.replace(/^<div class="tableau tableau-corps"/, '').replace(/>$/, '')}>${t.table}</div>` : t.table;
  const apres = tableauxDuTexteFormat2(source);
  writeFileSync(`site/avant/${t.p}.html`, page(cssAvant, `<h2>${t.h2}</h2>${avant}`));
  writeFileSync(`site/apres/${t.p}.html`, page(cssApres, `<h2>${t.h2}</h2>${apres}`));
  console.log(t.p, apres.slice(0, 60));
}
const texte = '<h2>Section</h2><p>Texte rédigé de la page, sur fond clair.</p>'.repeat(3);
for (const [d, css] of [['avant', cssAvant], ['apres', cssApres]] as const) {
  writeFileSync(`site/${d}/sommaire-ordinateur.html`, page(css, texte, f.aside));
  writeFileSync(`site/${d}/sommaire-telephone.html`, page(css, f.mobile + texte));
}
