// Parties générées de docs/08_structure_contenus.md (sections 5, 6 et 7) : marques de référence, grille des niveaux
// de verdict et d'urgence, échelle du coût probable, tirées de src/schemas/listes.ts, src/schemas/grille.ts et
// src/schemas/cout.ts, qui font foi. Elles sont écrites entre deux marqueurs ; le reste de docs/08 est écrit à la
// main. Un test vérifie que docs/08 est à jour. Les données (pièces, fourchettes, montants : data/couts.json) n'y
// figurent pas : elles changent avec les lots de pages, pas avec la structure.
import { GRILLE_URGENCES, GRILLE_VERDICTS, PRINCIPES_GRILLE, URGENCES_ADMISES } from '../../src/schemas/grille.ts';
import { FOURCHETTES_EUROS, GRILLE_COUTS, LIBELLES_FOURCHETTES, PRINCIPES_COUT, TRANCHES_COUT } from '../../src/schemas/cout.ts';
import { GROUPES_MIN, MARQUES_MIN, MARQUES_REFERENCE, URGENCES, VERDICTS } from '../../src/schemas/listes.ts';

type Bloc = 'marques' | 'grille' | 'couts';
export const MARQUEURS_GRILLE: Readonly<Record<Bloc, readonly [string, string]>> = {
  marques: ['<!-- vue-grille:marques:debut (généré par npm run grille:vue : ne pas modifier à la main) -->', '<!-- vue-grille:marques:fin -->'],
  grille: ['<!-- vue-grille:grille:debut (généré par npm run grille:vue : ne pas modifier à la main) -->', '<!-- vue-grille:grille:fin -->'],
  couts: ['<!-- vue-grille:couts:debut (généré par npm run grille:vue : ne pas modifier à la main) -->', '<!-- vue-grille:couts:fin -->'],
};

const NOMS_GROUPES: Record<string, string> = {
  'renault-group': 'Renault Group',
  stellantis: 'Stellantis',
  'volkswagen-group': 'Volkswagen Group',
  toyota: 'Toyota',
};

const cellule = (texte: string): string => texte.replace(/\|/g, '\\|');

export function genererVueGrille(): Record<Bloc, string> {
  const groupes = [...new Set(MARQUES_REFERENCE.map((m) => m.groupe))];
  const marques = [
    '| Marque | Groupe |',
    '|---|---|',
    ...MARQUES_REFERENCE.map((m) => `| ${m.nom} | ${NOMS_GROUPES[m.groupe] ?? m.groupe} |`),
    '',
    `Règle : chaque ligne de la base voyants cite les notices d'au moins **${MARQUES_MIN} marques** de cette liste, issues d'au moins **${GROUPES_MIN} groupes** différents (${groupes.length} groupes en tout). Deux notices d'une même marque comptent une fois.`,
  ].join('\n');

  const verdicts = [...VERDICTS].reverse().map((v) => {
    const n = GRILLE_VERDICTS[v];
    return `| ${v} | ${cellule(n.libelle)} | ${cellule(n.definition)} | ${n.consignes_notice.map(cellule).join(' ')} | ${URGENCES_ADMISES[v].join(', ')} |`;
  });
  const urgences = [...URGENCES].reverse().map((u) => {
    const n = GRILLE_URGENCES[u];
    return `| ${u} | ${cellule(n.libelle)} | ${cellule(n.definition)} | ${n.consignes_notice.map(cellule).join(' ')} |`;
  });
  const grille = [
    'Principes :',
    ...PRINCIPES_GRILLE.map((p, i) => `${i + 1}. ${p}`),
    '',
    '| Verdict | Libellé affiché | Ce que cela demande au lecteur | Consignes de notice qui y mènent | Urgences admises |',
    '|---|---|---|---|---|',
    ...verdicts,
    '',
    '| Urgence | Libellé affiché | Définition | Consignes de notice qui y mènent |',
    '|---|---|---|---|',
    ...urgences,
  ].join('\n');
  const tranches = TRANCHES_COUT.map((tranche) => {
    const n = GRILLE_COUTS[tranche];
    const citations = n.citations.map((c) => `${c.voyant} : ${c.source}, ${c.emplacement}`).join(' ; ');
    return `| ${tranche} | ${cellule(n.libelle)} | ${cellule(n.definition)} | ${cellule(n.consigne)} | ${cellule(citations)} |`;
  });
  const couts = [
    'Principes :',
    ...PRINCIPES_COUT.map((p, i) => `${i + 1}. ${p}`),
    '',
    '| Tranche (de la plus légère à la plus lourde) | Libellé affiché | Définition affichée au lecteur | Consigne de notice qui y mène | Citations de la base voyants (voyant : source, emplacement) |',
    '|---|---|---|---|---|',
    ...tranches,
    '',
    '| Fourchette en euros (pièce et main-d\'œuvre) | Texte affiché |',
    '|---|---|',
    ...FOURCHETTES_EUROS.map((f) => `| ${f} | ${LIBELLES_FOURCHETTES[f]} |`),
  ].join('\n');
  return { marques, grille, couts };
}

export function insererVueGrille(document: string, vue: Record<Bloc, string>): string {
  let resultat = document;
  for (const bloc of Object.keys(MARQUEURS_GRILLE) as Bloc[]) {
    const [debut, fin] = MARQUEURS_GRILLE[bloc];
    const i = resultat.indexOf(debut);
    const j = resultat.indexOf(fin);
    if (i < 0 || j < i) throw new Error(`docs/08 : marqueurs du bloc « ${bloc} » absents ou dans le désordre`);
    resultat = `${resultat.slice(0, i + debut.length)}\n${vue[bloc]}\n${resultat.slice(j)}`;
  }
  return resultat;
}
