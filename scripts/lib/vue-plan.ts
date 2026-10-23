// Vue lisible du plan du site (docs/09_plan_du_site.md). Les parties tirées de data/plan-du-site.json et de
// docs/05 (chiffres clés, tableaux par thème, détail des mots-clés) sont générées ici, entre deux marqueurs ;
// le reste de docs/09 (règles, cas limites, décisions) est écrit à la main. Un test vérifie que docs/09 est à jour.
// Module sans dépendance à l'exécution.
import type { PlanDuSite } from '../../src/schemas/donnees.ts';
import type { LigneCsv } from '../../src/lib/porte-plan.ts';

type Bloc = 'resume' | 'detail';
export const MARQUEURS: Readonly<Record<Bloc, readonly [string, string]>> = {
  resume: ['<!-- vue-plan:resume:debut (généré par npm run plan:vue : ne pas modifier à la main) -->', '<!-- vue-plan:resume:fin -->'],
  detail: ['<!-- vue-plan:detail:debut (généré par npm run plan:vue : ne pas modifier à la main) -->', '<!-- vue-plan:detail:fin -->'],
};

const THEMES: readonly (readonly [string, string])[] = [
  ['alertes-et-codes', '1. Alertes et codes'],
  ['pannes-et-symptomes', '2. Pannes et symptômes'],
  ['niveaux-et-fluides', '3. Niveaux et fluides'],
  ['pneus-et-obligations', '4. Pneus et obligations'],
  ['socle', 'Socle'],
];

/** 1019100 → « 1 019 100 ». */
const nombre = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export function genererVue(plan: readonly PlanDuSite[], motsCles: readonly LigneCsv[]): Record<Bloc, string> {
  const ligne05 = new Map(motsCles.map((l) => [l['mot_cle'] ?? '', l]));
  const compte = (mot: string): boolean => ligne05.get(mot)?.['compte_dans_totaux'] === '1';
  const volume = (mots: readonly string[]): number =>
    mots.filter(compte).reduce((total, mot) => total + Number(ligne05.get(mot)?.['volume_indicatif'] ?? 0), 0);

  // Liens déclarés, dans les deux sens (la page mère est dans sa propre colonne).
  const voisins = new Map<string, Set<string>>(plan.map((l) => [l.id, new Set<string>()]));
  for (const l of plan) {
    for (const cible of l.liens ?? []) {
      voisins.get(l.id)?.add(cible);
      voisins.get(cible)?.add(l.id);
    }
  }
  const paires = [...voisins.values()].reduce((n, v) => n + v.size, 0) / 2;
  const tousLesMots = plan.flatMap((l) => l.mots_cles);
  const comptes = tousLesMots.filter(compte).length;
  const parVague = (v: string): number => plan.filter((l) => l.vague === v).length;

  const resume = [
    '## Chiffres clés',
    '',
    `- **Pages :** ${plan.length}, dont ${plan.filter((l) => l.type === 'socle').length} du socle.`,
    `- **Mots-clés rattachés :** ${tousLesMots.length} sur ${motsCles.length}, soit ${comptes} comptés et ${tousLesMots.length - comptes} variantes, chacun sur une seule page.`,
    `- **Volume indicatif rattaché :** ${nombre(volume(tousLesMots))} recherches par mois.`,
    `- **Vagues :** A = ${parVague('A')} pages, B = ${parVague('B')}, C = ${parVague('C')}, comme dans 02 et 03.`,
    `- **Liens :** ${paires} paires de pages liées, chacune déclarée une seule fois dans le plan. Le lien retour est calculé.`,
    "- **Parent :** la page mère, reprise dans l'adresse et dans le fil d'Ariane. Elle affiche aussi la liste de ses pages enfants, par un lien calculé.",
    "- **Accueil :** il liste toutes les pages publiées, par thème, et cette liste est générée depuis le plan. Aucune page n'est donc orpheline.",
    '',
  ];
  for (const [theme, libelle] of THEMES) {
    resume.push(
      `## ${libelle}`,
      '',
      '| Page | Adresse | Type | Vague | Requête principale | Mots-clés (comptés) | Volume / mois | Parent | Liens (aller et retour) |',
      '|---|---|---|---|---|---|---|---|---|',
    );
    for (const l of plan.filter((p) => p.theme === theme)) {
      const liees = [...(voisins.get(l.id) ?? [])].sort();
      resume.push(
        `| ${l.id} | \`${l.adresse}\` | ${l.type} | ${l.vague} | ${l.requete_principale ?? '–'} | ${l.mots_cles.length} (${l.mots_cles.filter(compte).length}) | ${nombre(volume(l.mots_cles))} | ${l.parent ?? '–'} | ${liees.length > 0 ? liees.join(', ') : '–'} |`,
      );
    }
    resume.push('');
  }

  const detail = ['## Détail : mots-clés rattachés à chaque page', ''];
  for (const l of plan) if (l.mots_cles.length > 0) detail.push(`**${l.id}** : ${l.mots_cles.join(' · ')}`, '');

  return { resume: resume.join('\n').trimEnd(), detail: detail.join('\n').trimEnd() };
}

/** Remplace le contenu de chaque bloc généré de docs/09 (entre ses deux marqueurs). */
export function insererVue(document: string, vue: Record<Bloc, string>): string {
  let resultat = document;
  for (const bloc of Object.keys(MARQUEURS) as Bloc[]) {
    const [debut, fin] = MARQUEURS[bloc];
    const i = resultat.indexOf(debut);
    const j = resultat.indexOf(fin);
    if (i < 0 || j < i) throw new Error(`docs/09 : marqueurs du bloc « ${bloc} » absents ou dans le désordre`);
    resultat = `${resultat.slice(0, i + debut.length)}\n${vue[bloc]}\n${resultat.slice(j)}`;
  }
  return resultat;
}
