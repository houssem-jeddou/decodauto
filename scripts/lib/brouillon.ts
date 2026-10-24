import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'astro/zod';
import { chargerDonnees } from './charger.ts';
import {
  construireContexte,
  controlerLigneDeVerdict,
  REGLE_MARQUES,
  type Constat,
  type DonneesBrutes,
} from '../../src/lib/controle.ts';
import { controlerVoyantsDansLePlan } from '../../src/lib/plan.ts';
import { empreinteVoyant } from '../../src/lib/empreinte.ts';
import { voyantBaseSchema, type PlanDuSite, type Source } from '../../src/schemas/donnees.ts';
import { identifiant, texte } from '../../src/schemas/briques.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../../src/schemas/grille.ts';
import { LIBELLES_COULEURS, MARQUES_REFERENCE, SOURCES_PREMIERE_MAIN } from '../../src/schemas/listes.ts';

// ---------------------------------------------------------------------------------------------
// Brouillon de la base voyants (étape 5) : les lignes préparées avant la validation de Houssem.
// Le brouillon (data/voyants.brouillon.json) a la forme d'une ligne de la base, sans l'empreinte de validation, plus
// `sans_consigne` : les notices consultées pour cette situation qui la décrivent sans consigne propre (elles ne
// fixent pas de niveau et ne sont donc pas citées ; le paquet de validation les montre à Houssem).
// Il passe tous les contrôles de la base (R3, R8, pictogramme, rattachement au plan), sauf l'empreinte (R4) :
// l'empreinte ne s'écrit qu'après la validation de Houssem (scripts/valider-brouillon.ts).
// ---------------------------------------------------------------------------------------------

export const FICHIER_BROUILLON = 'data/voyants.brouillon.json';

const sansConsigneSchema = z.strictObject({ source: identifiant, emplacement: texte, constat: texte });

export const ligneBrouillonSchema = voyantBaseSchema.omit({ validation: true }).extend({
  sans_consigne: z.array(sansConsigneSchema).min(1).optional(),
});
export type LigneBrouillon = z.infer<typeof ligneBrouillonSchema>;

/** Rattachement page → sources d'une page éditoriale sans ligne dans la base (codes défaut, pneus, loi montagne). */
export const pageSourcesSchema = z.strictObject({ page: identifiant, sources: z.array(identifiant).min(1), raison: texte });
export type PageSources = z.infer<typeof pageSourcesSchema>;

export interface ResultatBrouillon {
  lignes: LigneBrouillon[];
  sources: ReadonlyMap<string, Source>;
  plan: ReadonlyMap<string, PlanDuSite>;
  constats: Constat[];
}

const erreur = (regle: string, message: string, fichier = FICHIER_BROUILLON): Constat => ({ regle, gravite: 'erreur', message, fichier });

/**
 * Contrôle le brouillon de la base avec les règles de la base (sauf R4) et les données réelles (plan, registre,
 * pictogrammes). `pictogrammesObligatoires: false` signale un pictogramme manquant en alerte, le temps de les
 * dessiner ; la base finale les exige (PICTO-ABSENT).
 */
export function controlerBrouillon(
  brutes: readonly unknown[],
  donnees: Omit<DonneesBrutes, 'voyants'>,
  aujourdhui: Date,
  options: { pictogrammesObligatoires: boolean },
): ResultatBrouillon {
  const { contexte, constats } = construireContexte({ ...donnees, voyants: [] }, aujourdhui);
  const lignes: LigneBrouillon[] = [];
  const ids = new Set<string>();
  brutes.forEach((brut, index) => {
    const lecture = ligneBrouillonSchema.safeParse(brut);
    const id = (brut as { id?: unknown } | null)?.id;
    const etiquette = typeof id === 'string' ? `voyant « ${id} »` : `ligne n° ${index + 1}`;
    if (!lecture.success) {
      for (const issue of lecture.error.issues) constats.push(erreur('R7-FORMAT', `${etiquette} : ${issue.path.join('.') || '(racine)'} : ${issue.message}`));
      return;
    }
    const ligne = lecture.data;
    if (ids.has(ligne.id)) constats.push(erreur('R7-DOUBLON', `identifiant en double : « ${ligne.id} »`));
    ids.add(ligne.id);
    lignes.push(ligne);
    constats.push(...controlerLigneDeVerdict(ligne, contexte.sources, etiquette, FICHIER_BROUILLON, { marques: REGLE_MARQUES }));
    if (!contexte.pictogrammes.has(ligne.pictogramme)) {
      const message = `${etiquette} : pictogramme « ${ligne.pictogramme} » absent ou invalide (src/pictogrammes/${ligne.pictogramme}.svg)`;
      constats.push(options.pictogrammesObligatoires ? erreur('PICTO-ABSENT', message) : { regle: 'PICTO-ABSENT', gravite: 'alerte', message, fichier: FICHIER_BROUILLON });
    }
    const citees = new Set(ligne.citations.map((c) => contexte.sources.get(c.source)?.marque).filter((m) => m !== undefined));
    for (const s of ligne.sans_consigne ?? []) {
      const source = contexte.sources.get(s.source);
      if (source === undefined) constats.push(erreur('R3-SOURCE-INCONNUE', `${etiquette} : sans_consigne : source « ${s.source} » absente du registre des sources`));
      else if (source.categorie !== 'notice-constructeur') constats.push(erreur('R7-FORMAT', `${etiquette} : sans_consigne ne liste que des notices constructeur (« ${s.source} »)`));
      else if (source.marque !== undefined && citees.has(source.marque)) constats.push(erreur('R7-FORMAT', `${etiquette} : la notice « ${s.source} » est à la fois citée avec un niveau et listée sans consigne`));
    }
  });
  constats.push(...controlerVoyantsDansLePlan(contexte.plan, lignes).map((c) => ({ ...c, fichier: FICHIER_BROUILLON })));
  return { lignes, sources: contexte.sources, plan: contexte.plan, constats };
}

/** Chaque page éditoriale de la vague A a au moins une source de première main (porte de l'étape 5). */
export function couvertureVagueA(
  plan: ReadonlyMap<string, PlanDuSite>,
  sources: ReadonlyMap<string, Source>,
  lignes: readonly LigneBrouillon[],
  rattachements: readonly PageSources[],
): { page: string; sources: string[]; origine: string }[] {
  const resultat: { page: string; sources: string[]; origine: string }[] = [];
  const premiereMain = (id: string): boolean => {
    const s = sources.get(id);
    return s !== undefined && SOURCES_PREMIERE_MAIN.includes(s.categorie);
  };
  for (const page of plan.values()) {
    if (page.vague !== 'A' || page.type === 'socle') continue;
    const parLaBase = [...new Set(lignes.filter((l) => l.page === page.id).flatMap((l) => l.citations.map((c) => c.source)).filter(premiereMain))];
    const rattachement = rattachements.find((r) => r.page === page.id);
    const parLeTableau = (rattachement?.sources ?? []).filter(premiereMain);
    const origine = parLaBase.length > 0 ? 'base voyants' : parLeTableau.length > 0 ? `tableau page → sources : ${rattachement?.raison ?? ''}` : 'aucune';
    resultat.push({ page: page.id, sources: parLaBase.length > 0 ? parLaBase : parLeTableau, origine });
  }
  return resultat;
}

export function controlerRattachements(
  plan: ReadonlyMap<string, PlanDuSite>,
  sources: ReadonlyMap<string, Source>,
  rattachements: readonly unknown[],
  fichier: string,
): { valides: PageSources[]; constats: Constat[] } {
  const valides: PageSources[] = [];
  const constats: Constat[] = [];
  rattachements.forEach((brut, index) => {
    const lecture = pageSourcesSchema.safeParse(brut);
    if (!lecture.success) {
      constats.push(erreur('R7-FORMAT', `rattachement n° ${index + 1} : ${lecture.error.issues.map((i) => `${i.path.join('.')} : ${i.message}`).join(' ; ')}`, fichier));
      return;
    }
    if (!plan.has(lecture.data.page)) constats.push(erreur('R1-RATTACHEMENT', `rattachement : page « ${lecture.data.page} » absente du plan du site`, fichier));
    for (const s of lecture.data.sources) if (!sources.has(s)) constats.push(erreur('R3-SOURCE-INCONNUE', `rattachement « ${lecture.data.page} » : source « ${s} » absente du registre`, fichier));
    valides.push(lecture.data);
  });
  return { valides, constats };
}

// ---- Paquet de validation (Markdown) -----------------------------------------------------------

const echapper = (t: string): string => t.replace(/\|/g, '\\|').replace(/\n/g, ' ');
const nomMarque = (id: string | undefined): string => MARQUES_REFERENCE.find((m) => m.id === id)?.nom ?? id ?? '?';
const niveau = (verdict?: string, urgence?: string): string =>
  verdict === undefined || urgence === undefined ? '(sans niveau)' : `${GRILLE_VERDICTS[verdict as keyof typeof GRILLE_VERDICTS].libelle} · ${GRILLE_URGENCES[urgence as keyof typeof GRILLE_URGENCES].libelle}`;

/** Paquet de validation : pour chaque ligne, situation, verdict, urgence, action, écart et chaque citation. */
export function genererPaquet(
  lignes: readonly LigneBrouillon[],
  sources: ReadonlyMap<string, Source>,
  constats: readonly Constat[],
  couverture: readonly { page: string; sources: string[]; origine: string }[],
  intro: string,
): string {
  const s: string[] = [];
  s.push(intro.trim(), '');
  s.push('## Résumé des lignes', '');
  s.push('| n° | Identifiant | Page | Couleur | Verdict | Urgence | Marques citées |', '|---|---|---|---|---|---|---|');
  lignes.forEach((l, i) => {
    const marques = [...new Set(l.citations.map((c) => nomMarque(sources.get(c.source)?.marque)))].join(', ');
    s.push(`| ${i + 1} | ${l.id} | ${l.page} | ${LIBELLES_COULEURS[l.couleur]} | ${GRILLE_VERDICTS[l.verdict].libelle} | ${GRILLE_URGENCES[l.urgence].libelle} | ${marques} |`);
  });
  s.push('', '## Registre des sources', '');
  s.push('| Identifiant | Titre | Catégorie | Adresse | Consultée le |', '|---|---|---|---|---|');
  for (const src of sources.values()) {
    s.push(`| ${src.id} | ${echapper(src.titre)} | ${src.categorie} | ${src.url} | ${src.date_consultation.toISOString().slice(0, 10)} |`);
  }
  s.push('', '## Pages de la vague A : source de première main (critère de la porte 5)', '');
  s.push('| Page | Sources de première main | Rattachement |', '|---|---|---|');
  for (const c of couverture) s.push(`| ${c.page} | ${c.sources.join(', ') || '**aucune**'} | ${echapper(c.origine)} |`);
  s.push('', '## Lignes de la base voyants, une par une', '');
  lignes.forEach((l, i) => {
    s.push(`### ${i + 1}. ${l.nom}`, '');
    s.push(`- **Identifiant** : \`${l.id}\` · **page** : ${l.page} · **couleur** : ${LIBELLES_COULEURS[l.couleur]} · **pictogramme** : ${l.pictogramme} · **catégorie** : ${l.categorie}`);
    s.push(`- **Situation** : ${l.situation}`);
    s.push(`- **Verdict** : ${GRILLE_VERDICTS[l.verdict].libelle} (\`${l.verdict}\`)`);
    s.push(`- **Urgence** : ${GRILLE_URGENCES[l.urgence].libelle} (\`${l.urgence}\`)`);
    s.push(`- **Action** : ${l.action}`);
    s.push(`- **Écart entre marques** : ${l.ecart_marques ?? 'aucun (toutes les citations donnent le même niveau)'}`, '');
    s.push('| Marque (notice) | Emplacement | Extrait cité | Niveau tiré de la consigne |', '|---|---|---|---|');
    for (const c of l.citations) {
      const src = sources.get(c.source);
      s.push(`| ${nomMarque(src?.marque)} (${src?.modele ?? c.source}) | ${echapper(c.emplacement)} | « ${echapper(c.extrait)} » | ${niveau(c.verdict, c.urgence)} |`);
    }
    if (l.sans_consigne !== undefined) {
      s.push('', '**Notices consultées sans consigne propre à cet état** (non citées, aucun niveau) :');
      for (const n of l.sans_consigne) s.push(`- ${nomMarque(sources.get(n.source)?.marque)}, ${n.emplacement} : ${n.constat}`);
    }
    const alertes = constats.filter((c) => c.message.includes(`voyant « ${l.id} »`));
    if (alertes.length > 0) {
      s.push('', '**Rappels des contrôles** :');
      for (const a of alertes) s.push(`- ${a.regle} (${a.gravite}) : ${a.message}`);
    }
    s.push('', 'Décision de Houssem : ☐ validée  ☐ à corriger : …', '');
  });
  return `${s.join('\n')}\n`;
}

/** Ce que Houssem valide avec le paquet : les lignes, les dessins des pictogrammes, le registre et le tableau
 * page → sources. */
export interface ContenuValide {
  lignes: readonly LigneBrouillon[];
  pictogrammes: readonly { id: string; contenu: string }[];
  sources: readonly unknown[];
  rattachements: readonly unknown[];
}

/**
 * Empreinte du contenu présenté (lignes et notices sans consigne, dessins, registre, tableau page → sources) :
 * imprimée dans le paquet, elle est redonnée à scripts/valider-brouillon.ts, qui refuse d'écrire la base si l'un
 * d'eux a changé depuis le paquet validé.
 */
export function empreinteBrouillon(contenu: ContenuValide): string {
  const pictogrammes = [...contenu.pictogrammes].sort((a, b) => a.id.localeCompare(b.id)).map((p) => [p.id, p.contenu]);
  return createHash('sha256')
    .update(JSON.stringify({ lignes: contenu.lignes, pictogrammes, sources: contenu.sources, rattachements: contenu.rattachements }))
    .digest('hex');
}

/**
 * Prépare l'écriture de data/voyants.json après la validation de Houssem : refuse si le brouillon a une erreur
 * bloquante, si la base contient déjà des lignes, ou si le contenu n'est plus celui du paquet validé.
 */
export function preparerValidation(
  contenu: ContenuValide,
  resultat: { constats: readonly Constat[]; baseExistante: number },
  attendue: string,
): { ok: true; base: unknown[]; empreinte: string } | { ok: false; raison: string } {
  if (resultat.baseExistante > 0) return { ok: false, raison: 'data/voyants.json contient déjà des lignes : fusion non prévue.' };
  const bloquants = resultat.constats.filter((c) => c.gravite === 'erreur');
  if (bloquants.length > 0) return { ok: false, raison: bloquants.map((c) => `${c.regle} : ${c.message}`).join('\n') };
  const empreinte = empreinteBrouillon(contenu);
  if (empreinte !== attendue) return { ok: false, raison: `le contenu a changé depuis le paquet validé (empreinte ${empreinte}, attendue ${attendue}) : nouveau paquet à faire valider.` };
  const dessins = new Map(contenu.pictogrammes.map((p) => [p.id, p.contenu]));
  return { ok: true, base: lignesValidees(contenu.lignes, dessins), empreinte };
}

export const FICHIER_RATTACHEMENTS = 'travaux/etape-5/pages-sources.json';
export const FICHIER_PAQUET = 'travaux/etape-5/paquet-validation.md';
const FICHIER_INTRO = 'travaux/etape-5/paquet-intro.md';

/** Contrôle le brouillon et le tableau page → sources, puis rédige le paquet (sans écrire de fichier). */
export async function construirePaquet(
  racine: string,
  aujourdhui: Date,
  options: { pictogrammesObligatoires: boolean },
): Promise<{ texte: string; constats: Constat[]; lignes: LigneBrouillon[]; empreinte: string }> {
  const donnees = await chargerDonnees(racine);
  const brouillon = JSON.parse(await readFile(join(racine, FICHIER_BROUILLON), 'utf8')) as unknown[];
  const resultat = controlerBrouillon(brouillon, donnees, aujourdhui, options);
  const rattachements = controlerRattachements(resultat.plan, resultat.sources, JSON.parse(await readFile(join(racine, FICHIER_RATTACHEMENTS), 'utf8')) as unknown[], FICHIER_RATTACHEMENTS);
  const constats = [...resultat.constats, ...rattachements.constats];
  const couverture = couvertureVagueA(resultat.plan, resultat.sources, resultat.lignes, rattachements.valides);
  for (const c of couverture.filter((x) => x.sources.length === 0)) {
    constats.push(erreur('PORTE5-SOURCE', `page de la vague A « ${c.page} » sans source de première main (base voyants ou tableau page → sources)`, FICHIER_RATTACHEMENTS));
  }
  let intro = '# Paquet de validation de la base voyants';
  try {
    intro = await readFile(join(racine, FICHIER_INTRO), 'utf8');
  } catch {
    // pas d'introduction : titre seul
  }
  const rattachementsBruts = JSON.parse(await readFile(join(racine, FICHIER_RATTACHEMENTS), 'utf8')) as unknown[];
  const empreinte = empreinteBrouillon({ lignes: resultat.lignes, pictogrammes: donnees.pictogrammes ?? [], sources: donnees.sources, rattachements: rattachementsBruts });
  const entete = `${intro.trim()}\n\nEmpreinte du brouillon présenté : \`${empreinte}\` (lignes, pictogrammes, registre et tableau page → sources ; à redonner à \`scripts/valider-brouillon.ts\` après la validation).`;
  return { texte: genererPaquet(resultat.lignes, resultat.sources, constats, couverture, entete), constats, lignes: resultat.lignes, empreinte };
}

/** Lignes de la base après la validation de Houssem : la forme de data/voyants.json, avec l'empreinte. */
export function lignesValidees(lignes: readonly LigneBrouillon[], dessins: ReadonlyMap<string, string>): unknown[] {
  return lignes.map((l) => {
    const { sans_consigne: _ignore, ...ligne } = l;
    return { ...ligne, validation: empreinteVoyant(ligne, dessins.get(ligne.pictogramme)) };
  });
}
