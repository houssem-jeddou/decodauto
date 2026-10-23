// Porte de sortie de l'étape 4 (docs/03), relancée à chaque construction : le plan du site couvre exactement
// les mots-clés du périmètre (docs/05), sans doublon d'intention.
//   - chaque mot-clé de docs/05 est sur une seule page, et le plan ne contient aucun mot-clé inconnu ;
//   - une variante est sur la page de son mot-clé de référence ;
//   - une même « signature » d'intention n'est jamais sur deux pages ;
//   - la requête principale est unique et fait partie des mots-clés de sa page ;
//   - la colonne « precision » de docs/05 est respectée quand elle désigne une page ;
//   - la vague d'une page est la vague dominante de ses mots-clés dans docs/05.
// Un recouvrement de sens entre pages voisines ne se détecte pas ainsi : il relève de la liste de recette.
// Module sans dépendance à l'exécution (imports de types uniquement) : il reçoit des données.
import type { Constat } from './controle.ts';
import type { PlanDuSite } from '../schemas/donnees.ts';
import type { TypeAvecSocle } from '../schemas/listes.ts';
import { normaliserRecherche } from './texte.ts';

export const FICHIER_05 = 'docs/05_mots_cles_perimetre.csv';
const FICHIER_PLAN = 'data/plan-du-site.json';
const erreur = (regle: string, message: string, fichier: string = FICHIER_PLAN): Constat => ({ regle, gravite: 'erreur', message, fichier });

type LignePorte = Pick<PlanDuSite, 'id' | 'type' | 'vague' | 'requete_principale' | 'mots_cles'>;
export type LigneCsv = Readonly<Record<string, string>>;

/** Lit un CSV (séparateur virgule, guillemets doubles, fins de ligne LF ou CRLF). La première ligne nomme les colonnes. */
export function lireCsv(texte: string): LigneCsv[] {
  const lignes: string[][] = [];
  let ligne: string[] = [];
  let champ = '';
  let entreGuillemets = false;
  const source = texte.startsWith('﻿') ? texte.slice(1) : texte;
  for (let i = 0; i < source.length; i++) {
    const c = source.charAt(i);
    if (entreGuillemets) {
      if (c !== '"') champ += c;
      else if (source.charAt(i + 1) === '"') {
        champ += '"';
        i++;
      } else entreGuillemets = false;
    } else if (c === '"') entreGuillemets = true;
    else if (c === ',') {
      ligne.push(champ);
      champ = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && source.charAt(i + 1) === '\n') i++;
      ligne.push(champ);
      lignes.push(ligne);
      ligne = [];
      champ = '';
    } else champ += c;
  }
  if (champ !== '' || ligne.length > 0) {
    ligne.push(champ);
    lignes.push(ligne);
  }
  const [entete = [], ...donnees] = lignes;
  return donnees
    .filter((valeurs) => !(valeurs.length === 1 && valeurs[0] === ''))
    .map((valeurs) => Object.fromEntries(entete.map((colonne, i) => [colonne, valeurs[i] ?? ''])));
}

// ---- Signature d'intention ----------------------------------------------------------------------------
// Mots normalisés (sans accent ni ponctuation), ramenés au singulier, sans mots vides, sans ordre.
// « sans », « ne » et « pas » restent significatifs : « perte de puissance sans voyant » ≠ « perte de puissance voyant ».
const MOTS_VIDES = new Set([
  'a', 'au', 'aux', 'avec', 'd', 'dans', 'de', 'des', 'du', 'en', 'est', 'et', 'l', 'la', 'le', 'les',
  'ma', 'mon', 'pour', 'qui', 'que', 'sa', 'se', 'son', 'sur', 'un', 'une',
]);

function singulier(mot: string): string {
  if (mot.length > 3 && mot.endsWith('s') && !mot.endsWith('ss')) return mot.slice(0, -1);
  if (mot.length > 3 && mot.endsWith('x')) return mot.slice(0, -1);
  return mot;
}

export function signature(motCle: string): string {
  const mots = normaliserRecherche(motCle)
    .split(' ')
    .filter((mot) => mot !== '' && !MOTS_VIDES.has(mot))
    .map(singulier);
  return [...new Set(mots)].sort().join(' ');
}

// ---- Colonne « precision » de docs/05 ------------------------------------------------------------------
// Traduction des précisions de docs/05 en exigences vérifiables. `null` : consigne de rédaction, sans page imposée.
// Une précision absente de ce tableau bloque : il faut décider ici ce qu'elle impose.
type Exigence = { page: string } | { type: TypeAvecSocle } | null;
export const PRECISIONS_05: Readonly<Record<string, Exigence>> = {
  'Couvert par la page du voyant, pas de page par modèle': { type: 'voyant' },
  'Voyant antipollution : fusionné dans la page voyant moteur': { page: 'voyant-moteur' },
  'Voyant température : traité dans la page surchauffe': { page: 'surchauffe-moteur' },
  'Message AdBlue : traité dans la page voyant AdBlue': { page: 'voyant-adblue' },
  "Température d'huile : traitée dans la page voyant huile": { page: 'voyant-huile' },
  "Vérifier le niveau d'huile": { page: 'niveau-huile' },
  "Sujet d'actualité : sources officielles et mise à jour": null,
  'Section hiver ou 4 saisons': null,
  "Section vase d'expansion et durits": null,
  'Affiliation compresseurs': null,
};

export interface ResultatPorte {
  constats: Constat[];
  /** Informations affichées par le contrôle, sans gravité (ni erreur ni alerte). */
  informations: string[];
}

const COLONNES = ['mot_cle', 'vague', 'variante_proche_de', 'precision'] as const;
const exemples = (liste: readonly string[], n = 10): string =>
  liste.slice(0, n).map((m) => `« ${m} »`).join(', ') + (liste.length > n ? `… (+${liste.length - n})` : '');

export function controlerPortePlan(plan: readonly LignePorte[], motsCles: readonly LigneCsv[]): ResultatPorte {
  const constats: Constat[] = [];
  const informations: string[] = [];

  const premiere = motsCles[0];
  const manquantes = COLONNES.filter((c) => premiere === undefined || !(c in premiere));
  if (manquantes.length > 0) {
    return { constats: [erreur('PLAN-05-ILLISIBLE', `colonnes absentes ou fichier vide : ${manquantes.join(', ')}`, FICHIER_05)], informations };
  }

  const ligne05 = new Map<string, LigneCsv>();
  for (const ligne of motsCles) {
    const mot = ligne['mot_cle'] ?? '';
    if (ligne05.has(mot)) constats.push(erreur('PLAN-05-DOUBLON', `mot-clé présent deux fois dans docs/05 : « ${mot} »`, FICHIER_05));
    ligne05.set(mot, ligne);
  }
  const lignePlan = new Map(plan.map((l) => [l.id, l]));

  // Couverture : chaque mot-clé du plan est connu et sur une seule page ; chaque mot-clé de docs/05 est rattaché.
  const pageDe = new Map<string, string>();
  for (const ligne of plan) {
    for (const mot of ligne.mots_cles) {
      const autre = pageDe.get(mot);
      if (autre !== undefined) {
        constats.push(erreur('PLAN-MOT-CLE-DOUBLE', `« ${mot} » est rattaché deux fois (${autre === ligne.id ? `deux fois à « ${autre} »` : `à « ${autre} » et à « ${ligne.id} »`})`));
        continue;
      }
      pageDe.set(mot, ligne.id);
      if (!ligne05.has(mot)) constats.push(erreur('PLAN-MOT-CLE-INCONNU', `« ${ligne.id} » : le mot-clé « ${mot} » n'est pas dans docs/05`));
    }
  }
  const absents = [...ligne05.keys()].filter((mot) => !pageDe.has(mot));
  if (absents.length > 0) {
    constats.push(erreur('PLAN-MOT-CLE-ABSENT', `${absents.length} mot(s)-clé(s) de docs/05 rattaché(s) à aucune page : ${exemples(absents)}`));
  }

  // Variantes : sur la même page que leur mot-clé de référence.
  for (const [mot, ligne] of ligne05) {
    const reference = ligne['variante_proche_de'] ?? '';
    if (reference === '') continue;
    const pageVariante = pageDe.get(mot);
    const pageReference = pageDe.get(reference);
    if (!ligne05.has(reference)) {
      constats.push(erreur('PLAN-VARIANTE', `docs/05 : la variante « ${mot} » renvoie à « ${reference} », absent de docs/05`, FICHIER_05));
    } else if (pageVariante !== undefined && pageReference !== undefined && pageVariante !== pageReference) {
      constats.push(erreur('PLAN-VARIANTE', `la variante « ${mot} » est sur « ${pageVariante} », sa référence « ${reference} » sur « ${pageReference} » : même page attendue`));
    }
  }

  // Doublon d'intention : une signature sur une seule page.
  const pagesParSignature = new Map<string, Map<string, string[]>>();
  for (const [mot, page] of pageDe) {
    const sig = signature(mot);
    const parPage = pagesParSignature.get(sig) ?? new Map<string, string[]>();
    parPage.set(page, [...(parPage.get(page) ?? []), mot]);
    pagesParSignature.set(sig, parPage);
  }
  for (const [sig, parPage] of pagesParSignature) {
    if (parPage.size < 2) continue;
    const detail = [...parPage].map(([page, mots]) => `${page} (${exemples(mots, 3)})`).join(' ; ');
    constats.push(erreur('PLAN-DOUBLON-INTENTION', `même intention « ${sig} » sur ${parPage.size} pages : ${detail}`));
  }

  // Requête principale : unique, et parmi les mots-clés de sa page.
  const requetes = new Map<string, string>();
  for (const ligne of plan) {
    if (ligne.requete_principale === undefined) continue;
    const requete = normaliserRecherche(ligne.requete_principale);
    const autre = requetes.get(requete);
    if (autre !== undefined) {
      constats.push(erreur('PLAN-REQUETE-DOUBLE', `la requête principale « ${ligne.requete_principale} » est celle de « ${autre} » et de « ${ligne.id} »`));
    }
    requetes.set(requete, ligne.id);
    if (!ligne.mots_cles.some((mot) => normaliserRecherche(mot) === requete)) {
      constats.push(erreur('PLAN-REQUETE-HORS-MOTS-CLES', `« ${ligne.id} » : la requête principale « ${ligne.requete_principale} » ne fait pas partie de ses mots-clés`));
    }
  }

  // Colonne « precision » de docs/05.
  for (const [mot, ligne] of ligne05) {
    const precision = ligne['precision'] ?? '';
    if (precision === '') continue;
    if (!(precision in PRECISIONS_05)) {
      constats.push(erreur('PLAN-PRECISION-INCONNUE', `précision inconnue pour « ${mot} » : « ${precision} ». Décider dans src/lib/porte-plan.ts (PRECISIONS_05) ce qu'elle impose`, FICHIER_05));
      continue;
    }
    const exigence = PRECISIONS_05[precision];
    const page = pageDe.get(mot);
    if (exigence === null || exigence === undefined || page === undefined) continue;
    const respectee = 'page' in exigence ? page === exigence.page : lignePlan.get(page)?.type === exigence.type;
    if (!respectee) {
      const attendu = 'page' in exigence ? `la page « ${exigence.page} »` : `une page de type « ${exigence.type} »`;
      constats.push(erreur('PLAN-PRECISION', `« ${mot} » est sur « ${page} », alors que docs/05 indique « ${precision} » (${attendu})`));
    }
  }

  // Vague : celle de la page est la vague dominante de ses mots-clés ; les écarts restants sont une information.
  const ecarts = new Map<string, number>();
  let nbEcarts = 0;
  for (const ligne of plan) {
    const comptes = new Map<string, number>();
    for (const mot of ligne.mots_cles) {
      const vague = ligne05.get(mot)?.['vague'];
      if (vague === undefined) continue;
      comptes.set(vague, (comptes.get(vague) ?? 0) + 1);
      if (vague !== ligne.vague) {
        const cle = `${ligne.id} (${vague} → ${ligne.vague})`;
        ecarts.set(cle, (ecarts.get(cle) ?? 0) + 1);
        nbEcarts++;
      }
    }
    if (comptes.size === 0) continue;
    const propre = comptes.get(ligne.vague) ?? 0;
    if ([...comptes].some(([vague, n]) => vague !== ligne.vague && n >= propre)) {
      const detail = [...comptes].map(([v, n]) => `${v} : ${n}`).join(', ');
      constats.push(erreur('PLAN-VAGUE-PAGE', `« ${ligne.id} » est en vague ${ligne.vague}, mais ce n'est pas la vague dominante de ses mots-clés dans docs/05 (${detail})`));
    }
  }
  if (nbEcarts > 0) {
    const detail = [...ecarts].map(([cle, n]) => `${cle} : ${n}`).join(' ; ');
    informations.push(`${nbEcarts} mot(s)-clé(s) servi(s) dans une autre vague que celle de docs/05 : ${detail}`);
  }

  return { constats, informations };
}
