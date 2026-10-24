// À lancer UNIQUEMENT après la validation explicite du paquet par Houssem (docs/03, règle 7), notée au journal :
// écrit les lignes du brouillon dans data/voyants.json avec leur empreinte de validation (src/lib/empreinte.ts),
// enregistre la validation dans travaux/etape-5/validation.json, puis supprime le brouillon. L'empreinte verrouille ce
// que Houssem a validé ; elle ne se recalcule jamais pour faire passer un contrôle (CLAUDE.md).
// Usage : node scripts/valider-brouillon.ts --valide-par-houssem AAAA-MM-JJ --empreinte <empreinte du paquet validé>
// Le script refuse d'écrire si le brouillon a changé depuis le paquet validé (empreinte différente).
import { readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { argv, exit, stdout } from 'node:process';
import { codeSortie } from '../src/lib/controle.ts';
import { chargerDonnees } from './lib/charger.ts';
import { controlerBrouillon, empreinteBrouillon, FICHIER_BROUILLON, lignesValidees } from './lib/brouillon.ts';

const racine = join(import.meta.dirname, '..');
const valeur = (option: string): string | undefined => {
  const i = argv.indexOf(option);
  return i >= 0 ? argv[i + 1] : undefined;
};
const date = valeur('--valide-par-houssem');
const attendue = valeur('--empreinte');
if (date === undefined || !/^\d{4}-\d{2}-\d{2}$/.test(date) || attendue === undefined || !/^[0-9a-f]{64}$/.test(attendue)) {
  stdout.write('Usage : node scripts/valider-brouillon.ts --valide-par-houssem AAAA-MM-JJ --empreinte <empreinte du paquet validé>\n');
  exit(1);
}
const donnees = await chargerDonnees(racine);
if (donnees.voyants.length > 0) {
  stdout.write('data/voyants.json contient déjà des lignes : fusion non prévue par ce script.\n');
  exit(1);
}
const brouillon = JSON.parse(await readFile(join(racine, FICHIER_BROUILLON), 'utf8')) as unknown[];
const resultat = controlerBrouillon(brouillon, donnees, new Date(), { pictogrammesObligatoires: true });
if (codeSortie(resultat.constats) !== 0) {
  for (const c of resultat.constats.filter((x) => x.gravite === 'erreur')) stdout.write(`ERREUR ${c.regle} : ${c.message}\n`);
  exit(1);
}
const empreinte = empreinteBrouillon(resultat.lignes);
if (empreinte !== attendue) {
  stdout.write(`Le brouillon a changé depuis le paquet validé (empreinte ${empreinte}, attendue ${attendue}) : nouveau paquet à faire valider.\n`);
  exit(1);
}
const dessins = new Map((donnees.pictogrammes ?? []).map((p) => [p.id, p.contenu]));
await writeFile(join(racine, 'data/voyants.json'), `${JSON.stringify(lignesValidees(resultat.lignes, dessins), null, 2)}\n`);
await writeFile(join(racine, 'travaux/etape-5/validation.json'), `${JSON.stringify({ valide_par_houssem: date, empreinte_brouillon: empreinte, lignes: resultat.lignes.length }, null, 2)}\n`);
await rm(join(racine, FICHIER_BROUILLON));
stdout.write(`${resultat.lignes.length} lignes écrites dans data/voyants.json (validation de Houssem du ${date}). Brouillon supprimé.\n`);
