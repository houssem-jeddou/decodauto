import { z } from 'astro/zod';
import { EXTRAIT_MAX, URGENCES, VERDICTS } from './listes.ts';

/** Texte non vide, espaces de début et de fin retirés. */
export const texte = z.string().trim().min(1);

/** Identifiant stable : minuscules, chiffres, tirets (ex. « voyant-huile »). */
export const identifiant = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'identifiant en minuscules, chiffres et tirets');

/**
 * Citation d'une source par une ligne de verdict (base voyants ou ligne saisie d'une page) : la source du registre,
 * l'endroit précis (page ou section) et l'extrait cité mot pour mot, court (docs/03, règle 10).
 * `verdict` et `urgence` : le niveau que la grille (src/schemas/grille.ts) tire de la consigne citée. Obligatoires
 * pour une notice constructeur, interdits pour une source secondaire (contrôles R3 de src/lib/controle.ts).
 */
export const citationSchema = z
  .strictObject({
    source: identifiant,
    emplacement: texte,
    extrait: texte.max(EXTRAIT_MAX, `un extrait cité fait au plus ${EXTRAIT_MAX} caractères (courte citation)`),
    verdict: z.enum(VERDICTS).optional(),
    urgence: z.enum(URGENCES).optional(),
  })
  .superRefine((citation, ctx) => {
    if ((citation.verdict === undefined) !== (citation.urgence === undefined)) {
      ctx.addIssue({
        code: 'custom',
        path: [citation.verdict === undefined ? 'verdict' : 'urgence'],
        message: 'le niveau d\'une citation se donne en entier : verdict et urgence',
        params: { regle: 'R3-CITATION-NIVEAU' },
      });
    }
  });
export type Citation = z.infer<typeof citationSchema>;

/** Empreinte SHA-256 en hexadécimal minuscule. */
export const hashHex = z.string().regex(/^[0-9a-f]{64}$/, 'empreinte SHA-256 attendue (64 caractères hexadécimaux)');

/** Date AAAA-MM-JJ (le YAML non guillemeté peut déjà fournir un objet Date). */
export const dateIso = z.preprocess((valeur) => {
  if (valeur instanceof Date) return valeur;
  if (typeof valeur === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valeur)) return new Date(`${valeur}T00:00:00Z`);
  return valeur;
}, z.date());

/**
 * Même jour, `mois` mois plus tard (dates UTC) ; le dernier jour du mois quand ce jour n'existe pas (31/08 + 6 mois →
 * 28/02). Sert aux délais de revue : dossier (schéma) et DATES-REVUE-DELAI (src/lib/controle.ts).
 */
export const plusMois = (date: Date, mois: number): Date => {
  const annee = date.getUTCFullYear();
  const cible = date.getUTCMonth() + mois;
  const dernierJour = new Date(Date.UTC(annee, cible + 1, 0)).getUTCDate();
  return new Date(Date.UTC(annee, cible, Math.min(date.getUTCDate(), dernierJour)));
};
