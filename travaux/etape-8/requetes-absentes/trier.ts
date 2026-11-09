// Livrable 8.2 : tri des requêtes mesurées avec la fonction `signature` du dépôt (src/lib/porte-plan.ts).
// Usage, depuis la racine : node travaux/etape-8/requetes-absentes/trier.ts <chemin de 06_base_mots_cles_complete.csv>
// Écrit tri_signature.csv : pour chaque requête mesurée, sa signature, le mot-clé de 05 ou de 06 de même signature,
// la page de ce mot-clé dans le plan, et les autres requêtes mesurées de même signature.
import { readFileSync, writeFileSync } from 'node:fs';
import { lireCsv, signature } from '../../../src/lib/porte-plan.ts';

const DOSSIER = 'travaux/etape-8/requetes-absentes';
const lire = (chemin: string) => lireCsv(readFileSync(chemin, 'utf8'));
const mesures = lire(`${DOSSIER}/mesures_keyword_planner.csv`);
const cinq = lire('docs/05_mots_cles_perimetre.csv');
const six = lire(process.argv[2] ?? '');
const plan: { id: string; mots_cles: string[] }[] = JSON.parse(readFileSync('data/plan-du-site.json', 'utf8'));

const pageDe = new Map<string, string>();
for (const page of plan) for (const mot of page.mots_cles) pageDe.set(mot, page.id);
const par05 = new Map<string, string[]>();
for (const l of cinq) par05.set(signature(l['mot_cle'] ?? ''), [...(par05.get(signature(l['mot_cle'] ?? '')) ?? []), l['mot_cle'] ?? '']);
const par06Hors = new Map<string, string[]>();
for (const l of six) {
  if (l['perimetre'] !== 'Hors') continue;
  const s = signature(l['mot_cle'] ?? '');
  par06Hors.set(s, [...(par06Hors.get(s) ?? []), `${l['mot_cle']} [${l['intention']} ; ${l['volume_fourchette']}]`]);
}
const parMesure = new Map<string, string[]>();
for (const l of mesures) parMesure.set(signature(l['requete'] ?? ''), [...(parMesure.get(signature(l['requete'] ?? '')) ?? []), l['requete'] ?? '']);

const classe = (f: string) => (f === '' || f === 'sans donnée' ? 'sans donnée' : f === '10–100' ? 'moins de 100' : 'au moins 100');
const champ = (v: string) => (/[",\n]/.test(v) ? `"${v.replaceAll('"', '""')}"` : v);
const lignes = [['requete', 'page_proposee', 'volume_fourchette', 'classe', 'signature', 'statut', 'mot_cle_05', 'page_du_mot_cle_05', 'ecart_de_page', 'ligne_06_hors', 'autres_requetes_meme_signature', 'source']];
const compte = new Map<string, number>();
for (const l of mesures) {
  const requete = l['requete'] ?? '';
  const sig = signature(requete);
  const dans05 = par05.get(sig) ?? [];
  const pages05 = [...new Set(dans05.map((m) => pageDe.get(m) ?? '?'))];
  const hors = par06Hors.get(sig) ?? [];
  const statut = dans05.length > 0 ? 'variante de 05' : hors.length > 0 ? 'variante de 06 hors périmètre' : 'nouvelle';
  const c = classe(l['volume_fourchette'] ?? '');
  compte.set(`${c} | ${statut}`, (compte.get(`${c} | ${statut}`) ?? 0) + 1);
  lignes.push([
    requete, l['page_proposee'] ?? '', l['volume_fourchette'] ?? '', c, sig, statut, dans05.join(' | '), pages05.join(' | '),
    dans05.length > 0 && !pages05.includes(l['page_proposee'] ?? '') ? 'oui' : '', hors.join(' | '),
    (parMesure.get(sig) ?? []).filter((r) => r !== requete).join(' | '), l['source'] ?? '',
  ]);
}
writeFileSync(`${DOSSIER}/tri_signature.csv`, lignes.map((l) => l.map(champ).join(',')).join('\n') + '\n');
for (const [k, n] of [...compte].sort()) console.log(n, k);
