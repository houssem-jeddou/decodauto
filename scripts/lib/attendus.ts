// Erreurs attendues de la construction de recette des exemples (livrable 6.6) : une page exemple attend la validation
// de son encadré par Houssem (R4-VALIDATION-ABSENTE) ; le lien « Méthode » mène à la page « à propos », écrite à
// l'étape 7. Sans cette liste, le job de recette resterait rouge et ne signalerait plus une erreur nouvelle.
// Garde-fous :
//  - seulement avec --exemples (construction de recette, jamais déployée) : la construction de production ne l'accepte
//    pas ;
//  - chaque attendu absorbe une seule erreur, désignée par son code, son fichier et, au besoin, un extrait du message ;
//  - un attendu qui ne correspond plus à aucune erreur fait échouer le contrôle (ATTENDU-ABSENT) : la liste, écrite dans
//    le workflow, se vide d'elle-même (par exemple, R4 d'un exemple dès que son empreinte de validation est versée) ;
//  - les erreurs absorbées restent affichées, comme attendues.
import type { Constat } from '../../src/lib/controle.ts';

export interface Attendu {
  regle: string;
  /** Fichier du constat (page Markdown pour le contrôle, page construite relative au dossier pour les liens). */
  fichier: string;
  /** Extrait du message, quand le code et le fichier ne suffisent pas à désigner l'erreur (lien cassé). */
  extrait?: string | undefined;
  /** Valeur telle qu'écrite : CODE@fichier ou CODE@fichier@extrait. */
  brut: string;
}

/** Lit les options `--attendu CODE@fichier[@extrait]` (répétables). */
export function lireAttendus(args: readonly string[]): Attendu[] {
  const attendus: Attendu[] = [];
  args.forEach((arg, i) => {
    if (arg !== '--attendu') return;
    const brut = args[i + 1] ?? '';
    const [regle, fichier, ...reste] = brut.split('@');
    if (regle === undefined || regle === '' || fichier === undefined || fichier === '') throw new Error(`--attendu « ${brut} » : format attendu CODE@fichier ou CODE@fichier@extrait`);
    attendus.push({ regle, fichier, extrait: reste.length > 0 ? reste.join('@') : undefined, brut });
  });
  return attendus;
}

/** Retire des constats les erreurs attendues (une par attendu) ; un attendu sans erreur correspondante devient ATTENDU-ABSENT. */
export function appliquerAttendus(constats: readonly Constat[], attendus: readonly Attendu[]): { constats: Constat[]; absorbes: Constat[] } {
  const restants = [...constats];
  const absorbes: Constat[] = [];
  const absents: Constat[] = [];
  for (const a of attendus) {
    const i = restants.findIndex((c) => c.gravite === 'erreur' && c.regle === a.regle && c.fichier === a.fichier && (a.extrait === undefined || c.message.includes(a.extrait)));
    if (i < 0) {
      absents.push({ regle: 'ATTENDU-ABSENT', gravite: 'erreur', message: `l'erreur attendue « ${a.brut} » n'apparaît plus : retirer ce --attendu du workflow (.github/workflows/ci.yml, job « Recette des exemples »)` });
    } else {
      absorbes.push(...restants.splice(i, 1));
    }
  }
  return { constats: [...restants, ...absents], absorbes };
}
