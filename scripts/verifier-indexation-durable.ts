// Indexation durable (demande de changement n° 18, scripts/lib/indexation-durable.ts) : refuse ce qu'une modification
// ferait perdre à un site indexé. Sans dépendance (Node et Git) ; lancé par la CI avant la construction.
// Usage : node scripts/verifier-indexation-durable.ts                 (toute construction : variable et redirections)
//         node scripts/verifier-indexation-durable.ts --base <réf.>   (comparaison : pull request avec sa base, main ;
//                                                                       envoi sur main avec le dernier déploiement)
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { argv, env, exit, stdout } from 'node:process';
import {
  FICHIERS_AFFICHES,
  FICHIER_CHANGEMENTS_DE_TITRE,
  FICHIER_REDIRECTIONS,
  constatsComparaison,
  constatsRedirections,
  constatsVariable,
  valeurDeTete,
  type ChangementDeTitre,
  type EtatDuSite,
} from './lib/indexation-durable.ts';
import type { Constat } from '../src/lib/controle.ts';

type Lecteur = { fichier: (chemin: string) => Promise<string | undefined>; pages: () => Promise<string[]> };

const disque: Lecteur = {
  fichier: async (chemin) => {
    try {
      return await readFile(chemin, 'utf8');
    } catch {
      return undefined;
    }
  },
  pages: async () =>
    (await readdir('src/content', { withFileTypes: true, recursive: true })).filter((e) => e.isFile() && e.name.endsWith('.md')).map((e) => join(e.parentPath, e.name).split('\\').join('/')),
};

const git = (ref: string): Lecteur => ({
  fichier: async (chemin) => {
    try {
      return execFileSync('git', ['show', `${ref}:${chemin}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });
    } catch {
      return undefined;
    }
  },
  pages: async () =>
    execFileSync('git', ['ls-tree', '-r', '--name-only', ref, '--', 'src/content'], { encoding: 'utf8' })
      .split('\n')
      .filter((c) => c.endsWith('.md')),
});

const constante = (source: string, nom: string): string | undefined => new RegExp(`export const ${nom} = '([^']*)';`).exec(source)?.[1];

async function lireEtat(lecteur: Lecteur, ou: string): Promise<EtatDuSite> {
  const drapeau = (JSON.parse((await lecteur.fichier('config/indexation.json')) ?? '{"indexable":false}') as { indexable?: unknown }).indexable === true;
  const donnees = (await Promise.all(FICHIERS_AFFICHES.map(async (f) => `${f}\n${(await lecteur.fichier(f)) ?? ''}`))).join('\n');
  const plan = new Map((JSON.parse((await lecteur.fichier('data/plan-du-site.json')) ?? '[]') as { id: string; adresse: string }[]).map((l) => [l.id, l.adresse]));
  const pages = new Map<string, string>();
  for (const chemin of await lecteur.pages()) {
    const texte = (await lecteur.fichier(chemin)) ?? '';
    const id = valeurDeTete(texte, 'id');
    if (id === undefined) throw new Error(`${ou} : ${chemin} sans identifiant (id) lisible`);
    // Fiche de l'accueil (src/content/socle/accueil.md, lot F2) : elle ne porte que le format de lecture ; l'accueil n'est
    // pas rendu depuis elle, et son title et son H1 sont lus dans src/lib/accueil.ts (ci-dessous).
    if (id === 'accueil') continue;
    pages.set(id, texte);
  }
  const accueilSource = await lecteur.fichier('src/lib/accueil.ts');
  let accueil: EtatDuSite['accueil'];
  if (accueilSource !== undefined) {
    const title = constante(accueilSource, 'TITLE_ACCUEIL');
    const h1 = constante(accueilSource, 'TITRE_ACCUEIL');
    if (title === undefined || h1 === undefined) throw new Error(`${ou} : TITLE_ACCUEIL ou TITRE_ACCUEIL illisible dans src/lib/accueil.ts (une seule ligne, entre apostrophes droites)`);
    accueil = { title, h1 };
  }
  const changements = JSON.parse((await lecteur.fichier(FICHIER_CHANGEMENTS_DE_TITRE)) ?? '[]') as ChangementDeTitre[];
  if (!Array.isArray(changements)) throw new Error(`${ou} : ${FICHIER_CHANGEMENTS_DE_TITRE} doit être une liste`);
  return { drapeau, donnees, plan, pages, redirections: (await lecteur.fichier(FICHIER_REDIRECTIONS)) ?? '', accueil, changementsDeTitre: changements };
}

const indexBase = argv.indexOf('--base');
const ref = indexBase === -1 ? undefined : argv[indexBase + 1];
if (indexBase !== -1 && (ref === undefined || ref.startsWith('--'))) {
  stdout.write('Usage : node scripts/verifier-indexation-durable.ts [--base <référence Git>]\n');
  exit(2);
}

let constats: Constat[] = [];
let bilan = '';
try {
  const tete = await lireEtat(disque, 'pull request');
  constats = [...constatsVariable(tete.drapeau, env['SITE_INDEXABLE']), ...constatsRedirections(tete)];
  if (ref !== undefined) {
    const base = await lireEtat(git(ref), `base ${ref}`);
    constats.push(...constatsComparaison(base, tete));
    bilan = `comparaison avec ${ref} : ${base.pages.size} page(s) publiée(s) dans la base, ${tete.pages.size} dans la pull request`;
  } else {
    bilan = 'sans comparaison (seule une pull request a une base)';
  }
} catch (e) {
  // Dans le doute, on refuse : une lecture impossible ne laisse rien passer.
  stdout.write(`INDEXATION-LECTURE : ${(e as Error).message}\n`);
  exit(1);
}
for (const c of constats) stdout.write(`[${c.regle}] ${c.fichier !== undefined ? `${c.fichier} : ` : ''}${c.message}\n`);
stdout.write(`Indexation durable : ${constats.length} erreur(s) ; drapeau ${JSON.parse((await disque.fichier('config/indexation.json')) ?? '{}').indexable === true ? 'true' : 'false'}, variable SITE_INDEXABLE ${env['SITE_INDEXABLE'] === 'true' ? '"true"' : 'différente de "true"'} ; ${bilan}.\n`);
exit(constats.length > 0 ? 1 : 0);
