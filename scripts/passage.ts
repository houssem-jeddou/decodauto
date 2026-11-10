// Passage d'une page rédigée de exemples/ vers src/content (livrable 8.3.0, travaux/etape-8/regle-de-passage.md).
// Usage : node scripts/passage.ts <id>               (essai à blanc : vérifie les conditions et dit ce qui serait fait)
//         node scripts/passage.ts <id> --appliquer   (git mv, briefs régénérés, adresse ajoutée à lighthouserc.json)
// Le passage ne se fait que sur demande de Houssem, dans la pull request de mise en ligne : jamais sur main sans sa validation.
// Aucun contrôle n'est allégé : l'empreinte de validation est recalculée par scripts/empreinte.ts, comme à la porte 6.
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { argv, execPath, exit, stdout } from 'node:process';
import { ajouterUrlLighthouse, FICHIER_LIGHTHOUSE, rappelsDePassage, verifierPassage } from './lib/passage.ts';

const [, , id, option] = argv;
if (id === undefined || id.startsWith('--') || (option !== undefined && option !== '--appliquer')) {
  stdout.write('Usage : node scripts/passage.ts <id> [--appliquer]\n');
  exit(2);
}
const racine = process.cwd();
const empreinte = (chemin: string): string => execFileSync(execPath, ['scripts/empreinte.ts', chemin], { cwd: racine, encoding: 'utf8' }).trim().split('\n').at(-1) ?? '';

const { passage, erreurs } = await verifierPassage(racine, id, empreinte);
if (passage === undefined || erreurs.length > 0) {
  stdout.write(`Passage refusé pour ${id} :\n${erreurs.map((e) => `  - ${e}`).join('\n')}\n`);
  exit(1);
}
stdout.write(`${id} : ${passage.source} → ${passage.cible}\n`);
stdout.write(`  empreinte de l'encadré : ${passage.sansEmpreinte ? 'sans objet (page du socle)' : 'identique à la validation de Houssem'}\n`);
stdout.write(`  liste Lighthouse de production : + ${passage.urlLighthouse}\n`);
if (option !== '--appliquer') {
  stdout.write('Essai à blanc : rien n\'a été modifié. Relancer avec --appliquer pour déplacer la page.\n');
} else {
  // Tout ce qui peut échouer est préparé avant le premier geste : pas de page déplacée à moitié.
  const lighthouse = ajouterUrlLighthouse(await readFile(FICHIER_LIGHTHOUSE, 'utf8'), passage.urlLighthouse);
  execFileSync('git', ['mv', passage.source, passage.cible], { cwd: racine, stdio: 'inherit' });
  await writeFile(FICHIER_LIGHTHOUSE, lighthouse);
  execFileSync(execPath, ['scripts/briefs.ts'], { cwd: racine, stdio: 'inherit' });
  stdout.write('Page déplacée, briefs régénérés, liste Lighthouse mise à jour.\n');
}
stdout.write(`À faire dans le même commit :\n${rappelsDePassage(passage).map((r) => `  - ${r}`).join('\n')}\n`);
