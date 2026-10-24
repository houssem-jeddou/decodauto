// À lancer UNIQUEMENT après la validation explicite du paquet par Houssem (docs/03, règle 7), notée au journal :
// écrit les lignes du brouillon dans data/voyants.json avec leur empreinte de validation (src/lib/empreinte.ts),
// enregistre la validation dans travaux/etape-5/validation.json, puis supprime le brouillon. L'empreinte verrouille ce
// que Houssem a validé ; elle ne se recalcule jamais pour faire passer un contrôle (CLAUDE.md).
// Usage : node scripts/valider-brouillon.ts --valide-par-houssem AAAA-MM-JJ --empreinte <empreinte du paquet validé>
// Refus si les lignes, les pictogrammes, le registre ou le tableau page → sources ont changé depuis le paquet validé.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { argv, exit, stdout } from 'node:process';
import { chargerDonnees } from './lib/charger.ts';
import { controlerBrouillon, FICHIER_BROUILLON, FICHIER_RATTACHEMENTS, preparerValidation } from './lib/brouillon.ts';

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
const brouillon = JSON.parse(await readFile(join(racine, FICHIER_BROUILLON), 'utf8')) as unknown[];
const rattachements = JSON.parse(await readFile(join(racine, FICHIER_RATTACHEMENTS), 'utf8')) as unknown[];
const resultat = controlerBrouillon(brouillon, donnees, new Date(), { pictogrammesObligatoires: true });
const contenu = { lignes: resultat.lignes, pictogrammes: donnees.pictogrammes ?? [], sources: donnees.sources, rattachements };
const preparation = preparerValidation(contenu, { constats: resultat.constats, baseExistante: donnees.voyants.length }, attendue);
if (!preparation.ok) {
  stdout.write(`Refus : ${preparation.raison}\n`);
  exit(1);
}
await writeFile(join(racine, 'data/voyants.json'), `${JSON.stringify(preparation.base, null, 2)}\n`);
await writeFile(join(racine, 'travaux/etape-5/validation.json'), `${JSON.stringify({ valide_par_houssem: date, empreinte: preparation.empreinte, lignes: resultat.lignes.length }, null, 2)}\n`);
await rm(join(racine, FICHIER_BROUILLON));
stdout.write(`${resultat.lignes.length} lignes écrites dans data/voyants.json (validation de Houssem du ${date}). Brouillon supprimé.\n`);
