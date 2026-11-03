// Page de démonstration des composants communs (livrable 6.3) et du tableau des notices (livrable 6.4) : la page de test tests/demo/voyant-huile.md, rendue
// avec les vraies données (plan, base voyants, registre, coûts, pictogrammes) et le gabarit (src/lib/gabarit.ts).
// Elle sert aux tests (tests/composants.test.ts) et à l'aperçu (npm run demo). Jamais publiée : elle n'est ni dans
// src/content ni dans le plan du site, et l'aperçu est écrit dans dist-demo/ (ignoré par Git et par le déploiement).
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { construireContexte, type Constat, type Contexte } from '../../src/lib/controle.ts';
import { empreintePage } from '../../src/lib/empreinte.ts';
import { coutDeLaPage, resoudreLignes } from '../../src/lib/calcul.ts';
import { plageValidee } from '../../src/lib/cout.ts';
import { bandeau, basDePage, causesDeLaPage, hautDePage, pied, tableauNoticesDeLaPage, type DonneesSite } from '../../src/lib/gabarit.ts';
import { sectionMethodeHtml } from '../../src/lib/composants.ts';
import { echapper, texteHtml } from '../../src/lib/html.ts';
import { sectionMethode } from '../../src/lib/charte.ts';
import { schemasPage, type PageEditoriale } from '../../src/schemas/pages.ts';
import { AUTEUR_SUPPOSE, chargerDonnees, lireFrontmatter } from './charger.ts';

export const FICHIER_DEMO = 'tests/demo/voyant-huile.md';
/** Auteur de la page de démonstration (la fiche auteur de « à propos » est écrite plus tard, étape 7 ou 8). */
const AUTEUR_DEMO = AUTEUR_SUPPOSE;
/**
 * Pages supposées construites pour la démonstration, avec leur libellé : la page mère (outil voyants) et des pages
 * liées dans le plan. Libellés provisoires : les vrais sont ceux des pages, écrits avec elles.
 */
const LIBELLES_DEMO: ReadonlyArray<readonly [string, string]> = [
  ['voyants', 'Identifier un voyant'],
  ['huile-moteur', 'Huile moteur'],
  ['niveau-huile', 'Vérifier le niveau d’huile'],
];

export interface Demo {
  contexte: Contexte;
  constatsDonnees: Constat[];
  site: DonneesSite;
  /** Frontmatter tel que lu, avec l'empreinte de son encadré (calculée pour la démonstration). */
  brut: Record<string, unknown>;
  page: PageEditoriale;
  /** Page de démonstration complète (document HTML). */
  html: string;
  /** Section « Méthode » seule, dans un document complet. */
  htmlMethode: string;
}

/** Document complet, comme le gabarit commun (src/layouts/Base.astro) : bandeau, contenu, pied ; styles en ligne. */
export function documentHtml(entree: { titre: string; description: string; adresse: string; contenu: string; css: string }): string {
  return [
    '<!doctype html>',
    '<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${echapper(entree.titre)}</title><meta name="description" content="${echapper(entree.description)}"><meta name="robots" content="noindex">`,
    `<style>${entree.css}</style></head>`,
    `<body><header class="bandeau">${bandeau()}</header><main>${entree.contenu}</main><footer class="pied">${pied(entree.adresse)}</footer></body></html>`,
  ].join('\n');
}

export async function construireDemo(racine: string, aujourdhui: Date): Promise<Demo> {
  const donnees = await chargerDonnees(racine);
  const { contexte, constats: constatsDonnees } = construireContexte({ ...donnees, auteurs: [AUTEUR_DEMO] }, aujourdhui);
  const site: DonneesSite = {
    plan: contexte.plan,
    voyants: contexte.voyants,
    sources: contexte.sources,
    couts: contexte.couts,
    pictogrammes: new Map((donnees.pictogrammes ?? []).map((p) => [p.id, p.contenu])),
    libelles: new Map<string, string>(LIBELLES_DEMO),
  };

  const lu = lireFrontmatter(await readFile(join(racine, FICHIER_DEMO), 'utf8')) as Record<string, unknown>;
  const sansValidation = schemasPage.voyant.parse(lu) as PageEditoriale;
  const { lignes } = resoudreLignes(sansValidation.situations, contexte.voyants);
  const validation = empreintePage(sansValidation, contexte.voyants, plageValidee(coutDeLaPage(sansValidation, lignes, contexte.couts)));
  const brut = { ...lu, validation };
  const page = schemasPage.voyant.parse(brut) as PageEditoriale;
  (site.libelles as Map<string, string>).set(page.id, page.libelle_court);

  const css = await readFile(join(racine, 'src/styles/site.css'), 'utf8');
  const ligne = contexte.plan.get(page.id);
  const adresse = ligne?.adresse ?? '/';
  // Corps : le tableau des notices (élément unique d'une page voyant, demande de changement n° 8), puis une note à la
  // place du texte que le modèle de page voyant rédigera (livrable 6.6).
  const corps = [
    tableauNoticesDeLaPage(page, site, { elementUnique: true }),
    `<p><em>${texteHtml('Corps de la page : rédigé avec le modèle de page voyant (livrable 6.6). Cette page de démonstration montre les composants communs et le tableau des notices.')}</em></p>`,
  ].join('');
  const html = documentHtml({ titre: page.title, description: page.description, adresse, contenu: `${hautDePage(page, site)}${corps}${causesDeLaPage(page, site)}${basDePage(page, site)}`, css });
  const htmlMethode = documentHtml({
    titre: 'À propos : méthode (démonstration)',
    description: 'Section « Méthode » de la page « à propos », démonstration.',
    adresse: contexte.plan.get('a-propos')?.adresse ?? '/a-propos/',
    contenu: `<h1>À propos</h1>${sectionMethodeHtml(sectionMethode([...contexte.sources.values()]))}`,
    css,
  });
  return { contexte, constatsDonnees, site, brut, page, html, htmlMethode };
}
