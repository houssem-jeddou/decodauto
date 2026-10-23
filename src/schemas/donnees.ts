import { z } from 'astro/zod';
import {
  CATEGORIES_SOURCE,
  COULEURS_VOYANT,
  THEMES_AVEC_SOCLE,
  TYPES_AVEC_SOCLE,
  URGENCES,
  VAGUES,
  VERDICTS,
} from './listes.ts';
import { dateIso, hashHex, identifiant, texte } from './briques.ts';

// ---------------------------------------------------------------------------------------------
// Fichiers de données : data/plan-du-site.json (étape 4), data/voyants.json (étape 5, base voyants),
// data/sources.json (étape 5, registre des sources). Ils sont vides tant que leur étape n'est pas faite.
// ---------------------------------------------------------------------------------------------

const adresse = z
  .string()
  .regex(/^\/([a-z0-9-]+\/)*$/, "l'adresse commence et se termine par « / » (minuscules, chiffres, tirets)");

/** Une ligne du plan du site = une page. C'est la clé (id) avec les pages éditoriales. */
export const planDuSiteSchema = z
  .strictObject({
    id: identifiant,
    type: z.enum(TYPES_AVEC_SOCLE),
    theme: z.enum(THEMES_AVEC_SOCLE),
    vague: z.enum(VAGUES),
    adresse,
    requete_principale: texte.optional(),
    mots_cles: z.array(texte),
    parent: identifiant.optional(),
  })
  .superRefine((ligne, ctx) => {
    if (ligne.type !== 'socle' && ligne.requete_principale === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['requete_principale'],
        message: 'requete_principale est obligatoire hors socle',
        params: { regle: 'R7-CHAMP-MANQUANT' },
      });
    }
    if (ligne.type !== 'socle' && ligne.mots_cles.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['mots_cles'],
        message: 'une page éditoriale est rattachée à au moins un mot-clé',
        params: { regle: 'R7-CHAMP-MANQUANT' },
      });
    }
  });
export type PlanDuSite = z.infer<typeof planDuSiteSchema>;

/** Registre des sources. Une source est de première main selon sa catégorie (voir listes.ts). */
export const sourceSchema = z.strictObject({
  id: identifiant,
  titre: texte,
  editeur: texte,
  categorie: z.enum(CATEGORIES_SOURCE),
  url: z.url({ protocol: /^https$/ }),
  date_consultation: dateIso,
});
export type Source = z.infer<typeof sourceSchema>;

/**
 * Base voyants : seule source des couleurs, verdicts, urgences, actions et sources des voyants
 * (docs/03 règle 6). Une ligne = un voyant dans un état donné (ex. « voyant moteur orange fixe »).
 * `page` : l'unique page à laquelle le voyant est rattaché (docs/08 §3 règle 1).
 * `validation` : empreinte du verdict validé par Houssem (voir src/lib/empreinte.ts).
 */
export const voyantBaseSchema = z.strictObject({
  id: identifiant,
  nom: texte,
  couleur: z.enum(COULEURS_VOYANT),
  categorie: texte,
  page: identifiant,
  situation: texte,
  verdict: z.enum(VERDICTS),
  urgence: z.enum(URGENCES),
  action: texte,
  sources: z.array(identifiant).min(1),
  validation: hashHex,
});
export type VoyantBase = z.infer<typeof voyantBaseSchema>;

export { dateIso };
