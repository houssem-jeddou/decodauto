// Livrable 8.2 : construit la proposition de la demande de changement n° 16, sans rien appliquer.
// Usage, depuis la racine : node travaux/etape-8/requetes-absentes/proposer.ts <chemin de 06_base_mots_cles_complete.csv>
// Écrit dans propose/ : proposition.csv (le sort de chaque requête), ajouts_05.csv, 05_mots_cles_perimetre_v3.csv,
// 06_base_mots_cles_complete_v2.csv, plan-du-site.json, formulations_du_lecteur.csv ; puis relance la porte de l'étape 4.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { controlerPortePlan, lireCsv, signature } from '../../../src/lib/porte-plan.ts';

const D = 'travaux/etape-8/requetes-absentes';
const texte = (c: string) => readFileSync(c, 'utf8');
const mesures = lireCsv(texte(`${D}/mesures_keyword_planner.csv`));
const cinq = lireCsv(texte('docs/05_mots_cles_perimetre.csv'));
const six = lireCsv(texte(process.argv[2] ?? ''));
const plan: any[] = JSON.parse(texte('data/plan-du-site.json'));
const dec = JSON.parse(texte(`${D}/decisions.json`));
const GEN = new Set<string>(dec.mots_generiques);
const sansGenerique = (s: string) => signature(s).split(' ').filter((m) => !GEN.has(m)).join(' ');
const champ = (v: string) => (/[",\n]/.test(v) ? `"${v.replaceAll('"', '""')}"` : v);
const csv = (entete: string[], lignes: Record<string, string>[]) => [entete, ...lignes.map((l) => entete.map((c) => l[c] ?? ''))].map((l) => l.map(champ).join(',')).join('\n') + '\n';
const INDICATIF: Record<string, string> = { '100–1k': '316', '1k–10k': '3160', '10k–100k': '31600', '100k–1M': '316000' };
const RANG: Record<string, number> = { '100–1k': 1, '1k–10k': 2, '10k–100k': 3, '100k–1M': 4 };

const pageDe = new Map<string, string>();
for (const p of plan) for (const m of p.mots_cles) pageDe.set(m, p.id);
const ligne05 = new Map(cinq.map((l) => [l['mot_cle'] ?? '', l]));
const typeDe = new Map(plan.map((p) => [p.id, p.type]));
const principale = new Map(plan.filter((p) => p.requete_principale).map((p) => [p.id, ligne05.get(p.requete_principale)!]));
const par05 = new Map<string, string[]>();
const par05SansGen = new Map<string, string[]>();
for (const l of cinq) {
  const m = l['mot_cle'] ?? '';
  par05.set(signature(m), [...(par05.get(signature(m)) ?? []), m]);
  par05SansGen.set(sansGenerique(m), [...(par05SansGen.get(sansGenerique(m)) ?? []), m]);
}
const MODELES = /\b(peugeot|renault|citro[eë]n|volkswagen|vw|audi|ford|toyota|mercedes|dacia|bmw|seat|hyundai|mazda|duster|sandero|captur 2|clio 4|clio 2|berlingo|golf 5|polo|touran|ibiza|206|307|308|c4 picasso|kangoo|a3|1\.6 hdi|1\.4 hdi|2\.0 hdi|2\.0 tdi|1\.5 dci)\b/i;
const reference = (mots: string[]) => { const racine = mots.find((m) => (ligne05.get(m)?.['variante_proche_de'] ?? '') === '') ?? ligne05.get(mots[0]!)!['variante_proche_de']!; return racine; };

const comptees = new Set<string>();
const sort: Record<string, string>[] = [];
const ajouts: Record<string, string>[] = [];
const formulations: Record<string, string>[] = [];
function ajouter(mot: string, page: string, fourchette: string, origine: string, extra: Partial<Record<string, string>> = {}) {
  const memes = par05.get(signature(mot)) ?? [];
  const ref = memes.length > 0 ? reference(memes) : '';
  const modele = ref !== '' ? ligne05.get(ref)! : principale.get(page)!;
  const cite = (mot.match(MODELES)?.[0] ?? '').toLowerCase();
  // Compté une fois par signature : jamais si un mot-clé de 05 de même signature a une fourchette au moins égale, ni si un ajout de même signature est déjà compté.
  // Une ligne de 06 que 06 ne comptait pas (variante proche d'une autre ligne) reste non comptée.
  const dejaCompte = comptees.has(signature(mot)) || extra['compte_dans_totaux'] === '0';
  const compte = dejaCompte ? '0' : ref === '' ? (extra['compte_dans_totaux'] ?? '1') : (RANG[fourchette] ?? 0) > Math.max(...memes.map((m) => RANG[ligne05.get(m)!['volume_fourchette'] ?? ''] ?? 0)) ? '1' : '0';
  if (compte === '1') comptees.add(signature(mot));
  ajouts.push({
    mot_cle: mot, theme_site: modele['theme_site'] ?? '', bloc: modele['bloc'] ?? '', vague: modele['vague'] ?? '', sous_theme: modele['sous_theme'] ?? '',
    intention: modele['intention'] ?? '', volume_fourchette: fourchette, volume_indicatif: INDICATIF[fourchette] ?? '', concurrence_ads: '', enchere_haute_usd: '',
    modele_cite: ref !== '' ? (modele['modele_cite'] ?? '') : cite, variante_proche_de: ref, compte_dans_totaux: compte,
    precision: ref !== '' ? (modele['precision'] ?? '') : cite !== '' && typeDe.get(page) === 'voyant' ? 'Couvert par la page du voyant, pas de page par modèle' : '',
    ...extra, compte_dans_totaux: compte, page, origine,
  });
}
for (const l of mesures) {
  const requete = l['requete'] ?? '';
  const f = l['volume_fourchette'] ?? '';
  const memes = par05.get(signature(requete)) ?? [];
  const pages05 = [...new Set(memes.map((m) => pageDe.get(m)!))];
  const corrige = dec.pages_corrigees[requete] as [string, string] | undefined;
  const page = pages05.length === 1 ? pages05[0]! : (corrige?.[0] ?? l['page_proposee'] ?? '');
  const motifPage = pages05.length === 1 ? (page !== l['page_proposee'] ? `page du mot-clé de 05 de même signature (${corrige?.[1] ?? ''})` : '') : (corrige?.[1] ?? '');
  let decision: string; let motif = '';
  if (dec.ecartees[requete]) { decision = 'écartée'; motif = dec.ecartees[requete]; }
  else if (f === 'sans donnée') { decision = 'formulation du lecteur, sans volume'; formulations.push({ requete, page, volume_fourchette: f, source: l['source'] ?? '' }); }
  else if (f === '10–100') { decision = 'formulation du lecteur, moins de 100 recherches'; formulations.push({ requete, page, volume_fourchette: f, source: l['source'] ?? '' }); }
  else { decision = memes.length > 0 ? 'ajout à 05, variante' : 'ajout à 05, nouveau mot-clé'; ajouter(requete, page, f, 'mesure Keyword Planner du 09/11/2026'); }
  sort.push({ requete, volume_fourchette: f, page_du_tri_initial: l['page_proposee'] ?? '', page_retenue: page, decision, mot_cle_05_meme_signature: memes.join(' | '), motif: [motifPage, motif].filter(Boolean).join(' ; '), source: l['source'] ?? '' });
}
// Lignes de 06 classées hors périmètre : même signature qu'un mot-clé de 05 une fois les mots génériques retirés, sur une seule page.
const basculees = new Set<string>();
for (const l of six) {
  if (l['perimetre'] !== 'Hors') continue;
  const mot = l['mot_cle'] ?? '';
  const memes = par05SansGen.get(sansGenerique(mot)) ?? [];
  const pages = [...new Set(memes.map((m) => pageDe.get(m)!))];
  const manuel = dec.ajout_hors_critere_06[mot] as [string, string] | undefined;
  if (pages.length !== 1 && !manuel) { if (pages.length > 1) console.log('06 : signature sur plusieurs pages, non rattachée :', mot, pages.join(',')); continue; }
  const page = manuel?.[0] ?? pages[0]!;
  basculees.add(mot);
  ajouter(mot, page, l['volume_fourchette'] ?? '', `06, ligne classée « ${l['bloc']} »`, { enchere_haute_usd: l['enchere_haute_usd'] ?? '', compte_dans_totaux: l['compte_dans_totaux'] ?? '1' });
  sort.push({ requete: mot, volume_fourchette: l['volume_fourchette'] ?? '', page_du_tri_initial: '', page_retenue: page, decision: manuel ? 'ajout à 05, ligne de 06 rattachée par jugement' : 'ajout à 05, ligne de 06 rattachée par le critère', mot_cle_05_meme_signature: memes.join(' | '), motif: manuel?.[1] ?? `06 la classait « ${l['bloc']} », intention « ${l['intention']} »`, source: '06' });
}
// Fichiers proposés.
mkdirSync(`${D}/propose`, { recursive: true });
const E05 = Object.keys(cinq[0]!);
const v3 = [...cinq, ...ajouts];
const planV = plan.map((p) => ({ ...p, mots_cles: [...p.mots_cles, ...ajouts.filter((a) => a['page'] === p.id).map((a) => a['mot_cle'])] }));
const E06 = Object.keys(six[0]!);
const sixV = [...six.map((l) => (basculees.has(l['mot_cle'] ?? '') ? { ...l, perimetre: 'Lot 1', bloc: ajouts.find((a) => a['mot_cle'] === l['mot_cle'])!['bloc']! } : l)),
  ...ajouts.filter((a) => !basculees.has(a['mot_cle']!)).map((a) => ({ mot_cle: a['mot_cle']!, perimetre: 'Lot 1', bloc: a['bloc']!, intention: a['intention']!, volume_fourchette: a['volume_fourchette']!, enchere_haute_usd: '', compte_dans_totaux: a['compte_dans_totaux']! }))];
writeFileSync(`${D}/propose/proposition.csv`, csv(Object.keys(sort[0]!), sort));
writeFileSync(`${D}/propose/ajouts_05.csv`, csv([...E05, 'page', 'origine'], ajouts));
writeFileSync(`${D}/propose/05_mots_cles_perimetre_v3.csv`, csv(E05, v3));
writeFileSync(`${D}/propose/06_base_mots_cles_complete_v2.csv`, csv(E06, sixV));
writeFileSync(`${D}/propose/plan-du-site.json`, JSON.stringify(planV, null, 2) + '\n');
writeFileSync(`${D}/propose/formulations_du_lecteur.csv`, csv(['requete', 'page', 'volume_fourchette', 'source'], formulations));
// Porte de l'étape 4 sur la proposition.
const avant = controlerPortePlan(plan, cinq).constats;
const apres = controlerPortePlan(planV, v3).constats;
const n = (d: string) => sort.filter((s) => s['decision']!.startsWith(d)).length;
console.log(`Porte de l'étape 4 : ${avant.length} constat(s) avant, ${apres.length} après`);
for (const c of apres) console.log(' -', c.regle, c.message);
console.log(`05 : ${cinq.length} → ${v3.length} mots-clés (${ajouts.length} ajouts : ${n('ajout à 05, nouveau')} nouveaux, ${n('ajout à 05, variante')} variantes, ${n('ajout à 05, ligne de 06')} lignes de 06)`);
console.log(`Non ajoutées : ${n('formulation du lecteur, sans')} sans volume, ${n('formulation du lecteur, moins')} sous 100, ${n('écartée')} écartée(s) ; 06 : ${six.length} → ${sixV.length} lignes`);
const tot = (ls: Record<string, string>[]) => ls.filter((l) => l['compte_dans_totaux'] === '1').reduce((s, l) => s + Number(l['volume_indicatif'] ?? 0), 0);
console.log(`Volume indicatif compté : ${tot(cinq)} → ${tot(v3)} ; mots-clés comptés : ${cinq.filter((l) => l['compte_dans_totaux'] === '1').length} → ${v3.filter((l) => l['compte_dans_totaux'] === '1').length}`);
const parPage = new Map<string, number>(); for (const a of ajouts) parPage.set(a['page']!, (parPage.get(a['page']!) ?? 0) + 1);
console.log([...parPage].sort((a, b) => b[1] - a[1]).map(([p, k]) => `${p} ${k}`).join(' ; '));
const vagues = new Map<string, number>(); for (const a of ajouts) vagues.set(a['vague']!, (vagues.get(a['vague']!) ?? 0) + 1); console.log('par vague', [...vagues]);
