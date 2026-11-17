// ---------------------------------------------------------------------------------------------
// Briefs des pages de la vague A (étape 6, livrable 6.8). Un brief est généré, jamais écrit à la main : il assemble
// le plan du site (data/plan-du-site.json), les mots-clés et leurs volumes (docs/05), la base voyants, le registre et le
// tableau page → sources de l'étape 5, le relevé Google France de 6.7, les pages exemples validées en 6.6, et les
// consignes de rédaction proposées par Claude à la validation de Houssem, notée au journal
// (travaux/etape-6/briefs/consignes.json, seule partie rédigée : ni volume, ni lien, ni verdict recopié). Données
// internes : jamais publiées. Module sans dépendance à l'exécution : testé sans installation (tests/briefs.test.ts).
// ---------------------------------------------------------------------------------------------
import { ID_OUTIL_VOYANTS, indexerPlan } from '../../src/lib/plan.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../../src/schemas/grille.ts';
import type { Urgence, Verdict } from '../../src/schemas/listes.ts';

export interface PageDuPlan {
  id: string;
  type: string;
  theme: string;
  vague: string;
  adresse: string;
  requete_principale?: string | undefined;
  mots_cles?: string[] | undefined;
  parent?: string | undefined;
  liens?: string[] | undefined;
}

export type LigneMotCle = Readonly<Record<string, string>>;

export interface VoyantDeLaBase {
  id: string;
  nom: string;
  couleur: string;
  page: string;
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  citations: readonly { source: string }[];
  ecart_marques?: string | undefined;
}

export interface Releve {
  requete: string;
  releve_le: string;
  apercu_ia: { present: boolean; texte?: string | null | undefined; sources?: readonly string[] | undefined };
  resultats: readonly { position: number; domaine: string; titre: string }[];
  autres_questions: readonly { question: string }[];
  recherches_associees: readonly string[];
  videos: readonly string[];
  forums: readonly unknown[];
}

/**
 * Consignes de rédaction d'une page, proposées par Claude à la validation de Houssem (seule partie rédigée du brief).
 * `question_decision` et `element_unique` : obligatoires pour une page éditoriale, absents pour une page du socle (pas
 * d'encadré de décision, docs/08 §2) ; la question d'une page qui a son exemple validé en 6.6 est lue dans l'exemple,
 * jamais recopiée ici (tests/briefs.test.ts).
 */
export interface Consignes {
  question_decision?: string | undefined;
  angle: string;
  element_unique?: string | undefined;
  a_traiter: readonly string[];
  sources_a_trouver?: readonly string[] | undefined;
  hors_perimetre?: readonly string[] | undefined;
}

/** Requête suggérée par Google pour la page, hors de docs/05 (demande de changement n° 16) : sans volume mesuré, sous
 *  100 recherches par mois, ou hors périmètre du brief. Son usage dit ce que le rédacteur peut en faire. */
export interface Formulation {
  requete: string;
  page: string;
  volume_fourchette: string;
  usage: string;
}

export interface EntreeBrief {
  page: PageDuPlan;
  plan: ReadonlyMap<string, PageDuPlan>;
  motsCles: ReadonlyMap<string, LigneMotCle>;
  voyants: readonly VoyantDeLaBase[];
  registre: ReadonlyMap<string, { titre: string; categorie: string }>;
  sourcesDeLaPage?: { sources: readonly string[]; raison: string } | undefined;
  releve?: Releve | undefined;
  consignes?: Consignes | undefined;
  formulations?: readonly Formulation[] | undefined;
  /** Chemin de la page exemple rédigée en 6.6, si elle existe, sa question de décision validée et les voyants de la base
   *  repris dans son encadré. */
  exemple?: string | undefined;
  questionExemple?: string | undefined;
  voyantsExemple?: readonly string[] | undefined;
}

/** Question de décision d'une page exemple : ligne `question_decision:` de son en-tête, guillemets retirés. */
export function questionDeLExemple(texte: string): string | undefined {
  const brute = /^question_decision: *(.+)$/m.exec(texte)?.[1]?.trim();
  return brute?.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
}

/** Voyants de la base repris dans l'encadré d'une page exemple (lignes `- voyant: <id>` de `situations`). */
export function voyantsDeLExemple(texte: string): string[] {
  const situations = /^situations:\n((?:[ \t]+.*\n)+)/m.exec(texte)?.[1] ?? '';
  return [...situations.matchAll(/^[ \t]+- voyant: *([a-z0-9-]+)/gm)].map((m) => m[1] ?? '');
}

/** Repères des questions des lecteurs (constats du relevé 6.7, README §4 et §5) : détectés, jamais classés à la main. */
export const REPERES_QUESTIONS: readonly { id: string; libelle: string; motif: RegExp }[] = [
  { id: 'rouler', libelle: 'Peut-on rouler, combien de kilomètres', motif: /\brouler\b|combien de (?:km|kilom)|dangereux/i },
  { id: 'enlever', libelle: 'Enlever, effacer ou éteindre le voyant', motif: /enlever|effacer|[ée]teindre|dispara[iî]tre|r[ée]initialis|supprimer|d[ée]sactiv|reset/i },
  { id: 'clignote', libelle: 'Voyant qui clignote', motif: /clignot/i },
  { id: 'cout', libelle: 'Prix, coût, amende', motif: /\bprix\b|co[uû]t|tarif|amende|verbalisation|€/i },
  {
    id: 'marque',
    libelle: 'Marque ou modèle cité',
    motif:
      /peugeot|renault|citro[eë]n|dacia|volkswagen|\bvw\b|toyota|seat|audi|bmw|mercedes|ford|opel|fiat|kia|hyundai|skoda|nissan|mazda|\bmini\b|clio|\b20[0-9]\b|\b30[0-9]\b|\b2008\b|\b3008\b|\b5008\b|sandero|duster|golf|polo|ibiza|yaris|corolla|land cruiser|qashqai|berlingo|touran|\bc[1-8]\b|xsara|picasso|megane|mégane|captur|scenic|scénic|trafic|\brs ?3\b|\ba[1-8]\b|hdi|tdi|dci|puretech/i,
  },
];

/** « 2026-10-28 07:36:33 UTC » → « 28/10/2026 à 07:36 UTC » (charte §3.3). */
export const dateDuReleve = (brute: string): string => {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/.exec(brute);
  return m === null ? brute : `${m[3]}/${m[2]}/${m[1]} à ${m[4]}:${m[5]} UTC`;
};

const nombre = (n: number): string => n.toLocaleString('fr-FR').replace(/ /g, ' ');
const echapperTableau = (t: string): string => t.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');

/** Mots-clés de la page avec leur ligne de docs/05, du plus cherché au moins cherché. */
export function motsClesDeLaPage(page: PageDuPlan, motsCles: ReadonlyMap<string, LigneMotCle>): { mot: string; ligne?: LigneMotCle | undefined }[] {
  const volume = (l?: LigneMotCle): number => Number(l?.['volume_indicatif'] ?? 0) || 0;
  return (page.mots_cles ?? []).map((mot) => ({ mot, ligne: motsCles.get(mot) })).sort((a, b) => volume(b.ligne) - volume(a.ligne) || a.mot.localeCompare(b.mot, 'fr'));
}

/** Questions et recherches du relevé, avec leurs repères. */
export function questionsDuReleve(releve: Releve | undefined): { texte: string; origine: string; reperes: string[] }[] {
  if (releve === undefined) return [];
  const textes = [
    ...releve.autres_questions.map((q) => ({ texte: q.question, origine: 'Autres questions posées' })),
    ...releve.recherches_associees.map((r) => ({ texte: r, origine: 'Recherches associées' })),
  ];
  return textes.map((t) => ({ ...t, reperes: REPERES_QUESTIONS.filter((r) => r.motif.test(t.texte)).map((r) => r.id) }));
}

/** Un brief, en Markdown. */
export function genererBrief(e: EntreeBrief): string {
  const { page } = e;
  const l: string[] = [];
  const libelle = (id: string): string => e.plan.get(id)?.adresse ?? id;
  // Pages liées : liens déclarés dans un sens ou dans l'autre (chaque paire n'est déclarée qu'une fois), lus comme le
  // contrôle du texte les lit (indexerPlan, src/lib/plan.ts). Une page liée d'une vague plus tardive n'est pas
  // construite à la publication de cette page : pas de lien vers elle dans le texte avant sa propre publication.
  const index = indexerPlan(e.plan);
  const enfants = index.enfants.get(page.id) ?? [];
  const liees = [...(index.voisins.get(page.id) ?? [])].filter((id) => id !== page.parent && !enfants.includes(id)).sort();
  const lien = (id: string): string => {
    const cible = e.plan.get(id);
    if (cible === undefined) return `\`${id}\` (absente du plan)`;
    return `\`${cible.adresse}\` (vague ${cible.vague}${cible.vague > page.vague ? ' : pas de lien dans le texte avant sa publication' : ''})`;
  };
  l.push(`# Brief : ${page.requete_principale ?? page.id} (\`${page.id}\`)`, '');
  l.push(
    '> Généré par `npm run briefs` depuis le plan du site, docs/05, la base voyants, le registre, le relevé Google France (6.7) et `consignes.json`. Ne pas modifier à la main. Données internes, jamais publiées.',
    '',
  );
  l.push('## Page', '');
  l.push(`- **Type** : ${page.type} ; **thème** : ${page.theme} ; **vague** : ${page.vague}.`);
  l.push(`- **Adresse** : \`${page.adresse}\`${page.parent !== undefined ? ` ; page mère : \`${libelle(page.parent)}\`` : ''}.`);
  if (liees.length > 0) l.push(`- **Pages liées dans le plan** (dans un sens ou dans l'autre) : ${liees.map(lien).join(' ; ')}.`);
  if (enfants.length > 0) l.push(`- **Pages enfants** : ${enfants.map(lien).join(' ; ')}.`);
  if (page.type !== 'socle') l.push("- Un lien écrit dans le texte ne mène qu'à la page mère, à une page enfant ou à une page liée ci-dessus (docs/08 §4).");
  if (e.exemple !== undefined) {
    l.push(
      e.exemple.startsWith('src/content/')
        ? `- **Page publiée** (sa validation est notée au journal) : \`${e.exemple}\`. Le site est indexé : toute modification passe par une pull request, et son adresse, sa date « Mis à jour le », son title et son H1 ne changent pas sans raison.`
        : `- **Page exemple rédigée** (sa validation est notée au journal) : \`${e.exemple}\`. Elle sert de point de départ à la page de l'étape 8.`,
    );
  }
  l.push('');

  // Mots-clés.
  const mots = motsClesDeLaPage(page, e.motsCles);
  if (mots.length > 0) {
    const comptes = mots.filter((m) => m.ligne?.['compte_dans_totaux'] === '1');
    const total = comptes.reduce((s, m) => s + (Number(m.ligne?.['volume_indicatif'] ?? 0) || 0), 0);
    const avecModele = mots.filter((m) => (m.ligne?.['modele_cite'] ?? '') !== '').length;
    const intentions = new Map<string, number>();
    for (const m of comptes) intentions.set(m.ligne?.['intention'] ?? '?', (intentions.get(m.ligne?.['intention'] ?? '?') ?? 0) + (Number(m.ligne?.['volume_indicatif'] ?? 0) || 0));
    l.push('## Requête et mots-clés (plan du site, docs/05)', '');
    l.push(`- **Requête principale** : « ${page.requete_principale ?? ''} ».`);
    l.push(`- **${mots.length} mots-clés**, dont ${comptes.length} comptés dans les totaux ; volume indicatif cumulé : ${nombre(total)} recherches par mois (plafond, docs/05). ${avecModele} citent une marque ou un modèle.`);
    l.push(`- **Intentions** (volume compté) : ${[...intentions].sort((a, b) => b[1] - a[1]).map(([i, v]) => `${i} ${nombre(v)}`).join(' ; ')}.`);
    l.push('', '| Mot-clé | Volume indicatif | Intention | Modèle cité | Variante de |', '|---|---|---|---|---|');
    for (const m of mots.slice(0, 15)) {
      l.push(`| ${echapperTableau(m.mot)} | ${nombre(Number(m.ligne?.['volume_indicatif'] ?? 0) || 0)} | ${m.ligne?.['intention'] ?? ''} | ${m.ligne?.['modele_cite'] ?? ''} | ${m.ligne?.['variante_proche_de'] ?? ''} |`);
    }
    if (mots.length > 15) l.push('', `Et ${mots.length - 15} autres : ${mots.slice(15).map((m) => `« ${m.mot} »`).join(', ')}.`);
    l.push('');
  }

  // Décision : voyants de la base et sources.
  const rattaches = e.voyants.filter((v) => v.page === page.id);
  const reprisExemple = e.voyants.filter((v) => v.page !== page.id && (e.voyantsExemple ?? []).includes(v.id));
  const tableauVoyants = (voyants: readonly VoyantDeLaBase[]): void => {
    l.push('| Voyant | Couleur | Verdict | Urgence | Action (base) | Notices citées | Écart entre marques |', '|---|---|---|---|---|---|---|');
    for (const v of voyants) {
      l.push(
        `| \`${v.id}\` ${echapperTableau(v.nom)} | ${v.couleur} | ${GRILLE_VERDICTS[v.verdict].libelle} | ${GRILLE_URGENCES[v.urgence].libelle} | ${echapperTableau(v.action)} | ${new Set(v.citations.map((c) => c.source)).size} | ${v.ecart_marques !== undefined ? 'oui' : 'non'} |`,
      );
    }
    l.push('');
  };
  if (rattaches.length > 0 || reprisExemple.length > 0 || e.sourcesDeLaPage !== undefined) {
    l.push('## Décision et sources disponibles', '');
    if (rattaches.length > 0) {
      l.push(
        page.id === ID_OUTIL_VOYANTS
          ? "Voyants de la base rattachés à la page outil (lignes sans page propre, demande de changement n° 23) : l'outil les affiche dans sa liste et son index, sans tableau des notices ni reprise obligatoire dans l'encadré :"
          : 'Voyants de la base rattachés à la page (lignes reprises telles quelles, jamais réécrites ; la page affiche leur tableau des notices) :',
        '',
      );
      tableauVoyants(rattaches);
    }
    if (reprisExemple.length > 0) {
      l.push("Voyants de la base repris dans l'encadré de l'exemple validé (rattachés à une autre page : pas de tableau des notices ici) :", '');
      tableauVoyants(reprisExemple);
    }
    if (e.sourcesDeLaPage !== undefined) {
      l.push(`Sources de première main prévues à l'étape 5 (\`travaux/etape-5/pages-sources.json\`) : ${e.sourcesDeLaPage.raison}.`, '');
      for (const id of e.sourcesDeLaPage.sources) l.push(`- \`${id}\` : ${e.registre.get(id)?.titre ?? 'absente du registre'}.`);
      l.push('');
    }
  }

  // Relevé Google France.
  if (e.releve !== undefined) {
    const r = e.releve;
    l.push(`## Ce que montre Google France (relevé du ${dateDuReleve(r.releve_le)}, requête « ${r.requete} »)`, '');
    if (r.apercu_ia.present) {
      l.push(`- **Aperçu IA** : présent${(r.apercu_ia.sources ?? []).length > 0 ? ` ; domaines cités : ${(r.apercu_ia.sources ?? []).join(', ')}` : ''}. Début du texte (tiers, jamais repris ni reformulé, charte §2.6) :`);
      if (r.apercu_ia.texte) l.push(`  > ${r.apercu_ia.texte.replace(/\s*\n\s*/g, ' ').slice(0, 400)}${r.apercu_ia.texte.length > 400 ? '…' : ''}`);
    } else l.push('- **Aperçu IA** : absent.');
    l.push(`- **Vidéos** : ${r.videos.length} ; **forums** : ${r.forums.length}.`);
    l.push('', '| Position | Domaine | Titre |', '|---|---|---|');
    for (const res of r.resultats) l.push(`| ${res.position} | ${res.domaine} | ${echapperTableau(res.titre)} |`);
    l.push('');
    const questions = questionsDuReleve(r);
    if (questions.length > 0) {
      l.push('**Questions des lecteurs** (à traiter dans le texte rédigé, charte §3.5) :', '');
      l.push('| Question ou recherche | Origine | Repères |', '|---|---|---|');
      for (const q of questions) l.push(`| ${echapperTableau(q.texte)} | ${q.origine} | ${q.reperes.map((id) => REPERES_QUESTIONS.find((x) => x.id === id)?.libelle ?? id).join(' ; ')} |`);
      l.push('');
    }
  }

  // Formulations du lecteur : jamais un objectif de page, et jamais dans docs/05.
  if ((e.formulations ?? []).length > 0) {
    l.push('## Formulations du lecteur, hors de docs/05 (demande de changement n° 16)', '');
    l.push("Suggérées par Google pour cette page, sans volume mesuré ou sous 100 recherches par mois. Elles ne sont pas un objectif de page : leur usage dit ce que le rédacteur peut en faire.", '');
    l.push('| Formulation | Mesure du 09/11/2026 | Usage |', '|---|---|---|');
    for (const f of e.formulations ?? []) l.push(`| ${echapperTableau(f.requete)} | ${f.volume_fourchette} | ${echapperTableau(f.usage)} |`);
    l.push('');
  }

  // Consignes.
  l.push('## Consignes de rédaction (proposées par Claude ; la validation de Houssem est notée au journal)', '');
  if (e.consignes === undefined) l.push('À écrire : aucune consigne dans `consignes.json`.', '');
  else {
    const c = e.consignes;
    if (page.type === 'socle') l.push("- **Encadré de décision et élément unique** : aucun (page du socle, docs/08 §2).");
    else if (e.questionExemple !== undefined) l.push(`- **Question de décision** (celle de la page rédigée ; sa validation est celle de l'encadré, empreinte comprise) : « ${e.questionExemple} »`);
    else if (c.question_decision !== undefined) l.push(`- **Question de décision proposée** : « ${c.question_decision} »`);
    l.push(`- **Angle** : ${c.angle}`);
    if (c.element_unique !== undefined) l.push(`- **Élément unique** : ${c.element_unique}`);
    l.push('- **À traiter** :');
    for (const t of c.a_traiter) l.push(`  - ${t}`);
    if ((c.sources_a_trouver ?? []).length > 0) {
      l.push('- **Sources à trouver avant la rédaction** :');
      for (const s of c.sources_a_trouver ?? []) l.push(`  - ${s}`);
    }
    if ((c.hors_perimetre ?? []).length > 0) {
      l.push('- **Hors périmètre, à ne pas traiter** :');
      for (const h of c.hors_perimetre ?? []) l.push(`  - ${h}`);
    }
    l.push('');
  }
  return `${l.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd()}\n`;
}

/** Sommaire des briefs. */
export function genererSommaire(pages: readonly PageDuPlan[], motsCles: ReadonlyMap<string, LigneMotCle>, releves: ReadonlySet<string>): string {
  const l: string[] = [
    '# Briefs des pages de la vague A (livrable 6.8)',
    '',
    '> Généré par `npm run briefs`. Ne pas modifier à la main. Seules les consignes de rédaction (`consignes.json`) sont rédigées ; tout le reste vient du plan du site, de docs/05, de la base voyants, du registre et du relevé Google France (6.7).',
    '',
    '| Page | Type | Requête principale | Mots-clés | Volume compté | Relevé Google |',
    '|---|---|---|---|---|---|',
  ];
  for (const p of pages) {
    const mots = motsClesDeLaPage(p, motsCles);
    const total = mots.filter((m) => m.ligne?.['compte_dans_totaux'] === '1').reduce((s, m) => s + (Number(m.ligne?.['volume_indicatif'] ?? 0) || 0), 0);
    l.push(`| [\`${p.id}\`](${p.id}.md) | ${p.type} | ${p.requete_principale ?? '(socle)'} | ${mots.length} | ${nombre(total)} | ${releves.has(p.id) ? 'oui' : 'non'} |`);
  }
  return `${l.join('\n')}\n`;
}
