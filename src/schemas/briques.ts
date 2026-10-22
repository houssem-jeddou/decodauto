import { z } from 'astro/zod';

/** Texte non vide, espaces de début et de fin retirés. */
export const texte = z.string().trim().min(1);

/** Identifiant stable : minuscules, chiffres, tirets (ex. « voyant-huile »). */
export const identifiant = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'identifiant en minuscules, chiffres et tirets');

/** Empreinte SHA-256 en hexadécimal minuscule. */
export const hashHex = z.string().regex(/^[0-9a-f]{64}$/, 'empreinte SHA-256 attendue (64 caractères hexadécimaux)');

/** Date AAAA-MM-JJ (le YAML non guillemeté peut déjà fournir un objet Date). */
export const dateIso = z.preprocess((valeur) => {
  if (valeur instanceof Date) return valeur;
  if (typeof valeur === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valeur)) return new Date(`${valeur}T00:00:00Z`);
  return valeur;
}, z.date());
