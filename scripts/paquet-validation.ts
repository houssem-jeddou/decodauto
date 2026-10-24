// Contrôle le brouillon de la base voyants (data/voyants.brouillon.json) et génère le paquet de validation de
// Houssem (docs/03, règle 7). Usage : npm run paquet (pictogrammes exigés) ou node scripts/paquet-validation.ts
// (pictogramme manquant signalé en alerte). Sortie : travaux/etape-5/paquet-validation.md. Code de sortie 1 s'il
// reste une erreur bloquante.
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { argv, exit, stdout } from 'node:process';
import { codeSortie } from '../src/lib/controle.ts';
import { construirePaquet, FICHIER_BROUILLON, FICHIER_PAQUET } from './lib/brouillon.ts';

const racine = join(import.meta.dirname, '..');
if (!existsSync(join(racine, FICHIER_BROUILLON))) {
  stdout.write(`Aucun brouillon (${FICHIER_BROUILLON}) : la base validée est dans data/voyants.json. Pour ajouter ou modifier des lignes, créer un nouveau brouillon.\n`);
  exit(1);
}
const { texte, constats, lignes, empreinte } = await construirePaquet(racine, new Date(), { pictogrammesObligatoires: argv.includes('--pictogrammes-obligatoires') });
await writeFile(join(racine, FICHIER_PAQUET), texte);
for (const c of constats) stdout.write(`${c.gravite === 'erreur' ? 'ERREUR' : 'alerte'} ${c.regle} : ${c.message}\n`);
const erreurs = constats.filter((c) => c.gravite === 'erreur').length;
stdout.write(`\n${lignes.length} lignes, ${erreurs} erreur(s) bloquante(s), ${constats.length - erreurs} alerte(s). Empreinte du brouillon : ${empreinte}. Paquet : ${FICHIER_PAQUET}\n`);
exit(codeSortie(constats));
