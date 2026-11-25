// Audit n° 2 : volume indicatif de la requête principale et somme des volumes des mots-clés comptés (compte_dans_totaux = 1)
// de chaque page du plan, d'après docs/05. Usage : node travaux/etape-12/audit-2/outils/volumes-par-page.mjs
import { readFileSync } from 'node:fs';
const lignes = readFileSync('docs/05_mots_cles_perimetre.csv', 'utf8').trim().split('\n');
const champs = (l) => { const r = []; let c = '', q = false; for (const ch of l) { if (ch === '"') { q = !q; continue; } if (ch === ',' && !q) { r.push(c); c = ''; continue; } c += ch; } r.push(c); return r; };
const vol = {}; for (const l of lignes.slice(1)) { const r = champs(l); vol[r[0]] = { v: +r[7], compte: r[12] }; }
const plan = JSON.parse(readFileSync('data/plan-du-site.json', 'utf8'));
const rangs = plan.map((p) => [p.id, p.adresse, p.requete_principale ?? '', vol[p.requete_principale]?.v ?? '', (p.mots_cles ?? []).reduce((s, k) => s + (vol[k]?.compte === '1' ? vol[k].v : 0), 0), (p.mots_cles ?? []).length, (p.liens ?? []).length, p.parent ?? '']);
rangs.sort((a, b) => b[4] - a[4]);
console.log('id | adresse | requête principale | volume requête | somme des volumes | mots-clés | liens déclarés | page mère');
for (const r of rangs) console.log(r.join(' | '));
