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
import { AUTEUR_SUPPOSE, chargerDonnees, lireFrontmatter, separerFrontmatter } from './charger.ts';
import { bandeauFormat2, piedFormat2 } from '../../src/lib/format2.ts';
import { modeleDeLaPage } from '../../src/lib/modeles.ts';
import { DOSSIER_ILLUSTRATIONS_DEMO, chargerIllustrations } from './demo-format2.ts';

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

// ---- Démonstration des pages panne et dossier au format 2 (lot F1, F1.3c) ------------------------------------------------
// Pages de tests/demo, rendues par les vrais modèles (modeleDeLaPage) avec les vraies données, dans le document du format 2
// (comme Base.astro) ; illustrations de démonstration (travaux/etape-13/f1/demo/illustrations). Jamais publiées : écrites
// dans dist-demo/ (npm run demo), contrôlées par tests/format2-panne.test.ts. Empreintes calculées pour la démonstration.

export const FICHIERS_DEMO_FORMAT2 = { panne: 'tests/demo/panne-format2.md', dossier: 'tests/demo/dossier-format2.md' } as const;
export const FICHIER_ARBRE_COURT = 'tests/demo/panne-format2-arbre-court.html';

/** Document complet au format 2, comme Base.astro : bandeau et pied de la piste B, feuille du format 2 en ligne. */
export function documentFormat2(entree: { titre: string; description: string; adresse: string; contenu: string; css: string; adresseOutil?: string | undefined; pictogrammeBouton?: string | undefined }): string {
  return [
    '<!doctype html>',
    '<html lang="fr" data-format="2"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${echapper(entree.titre)}</title><meta name="description" content="${echapper(entree.description)}"><meta name="robots" content="noindex">`,
    `<style>${entree.css}</style></head>`,
    `<body><header class="bandeau">${bandeauFormat2({ adresseOutil: entree.adresseOutil, pictogrammeBouton: entree.pictogrammeBouton })}</header><main>${entree.contenu}</main><footer class="pied">${piedFormat2(entree.adresse)}</footer></body></html>`,
  ].join('\n');
}

export interface PageDemoFormat2 {
  nom: string;
  type: 'panne' | 'dossier';
  fichier: string;
  brut: Record<string, unknown>;
  page: PageEditoriale;
  adresse: string;
  html: string;
}

/** Corps de la page panne avec l'arbre court (état court de la démonstration). */
export const avecArbreCourt = (corps: string, court: string): string => corps.replace(/<!-- arbre -->[\s\S]*<!-- \/arbre -->/, court.replace(/^<!--[\s\S]*?-->\s*/, ''));

export async function construireDemoFormat2(racine: string, aujourdhui: Date): Promise<{ contexte: Contexte; site: DonneesSite; pages: PageDemoFormat2[] }> {
  const donnees = await chargerDonnees(racine);
  const { contexte } = construireContexte({ ...donnees, auteurs: [AUTEUR_DEMO] }, aujourdhui);
  const libelles = new Map<string, string>([
    ['voyants', 'Identifier un voyant'],
    ['voyant-moteur', 'Voyant moteur'],
    ['voyant-huile', 'Voyant huile moteur'],
  ]);
  const site: DonneesSite = {
    plan: contexte.plan,
    voyants: contexte.voyants,
    sources: contexte.sources,
    couts: contexte.couts,
    pictogrammes: new Map((donnees.pictogrammes ?? []).map((p) => [p.id, p.contenu])),
    libelles,
    illustrations: await chargerIllustrations(racine, DOSSIER_ILLUSTRATIONS_DEMO),
    pubFactice: true,
  };
  const css = await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8');
  const pictogrammeBouton = site.pictogrammes.get('moteur');
  const court = await readFile(join(racine, FICHIER_ARBRE_COURT), 'utf8');
  const lues = await Promise.all(
    (Object.entries(FICHIERS_DEMO_FORMAT2) as ['panne' | 'dossier', string][]).map(async ([type, fichier]) => {
      const contenu = await readFile(join(racine, fichier), 'utf8');
      const lu = lireFrontmatter(contenu) as Record<string, unknown>;
      const sansValidation = schemasPage[type].parse(lu) as PageEditoriale;
      const { lignes } = resoudreLignes(sansValidation.situations, contexte.voyants);
      const validation = empreintePage(sansValidation, contexte.voyants, plageValidee(coutDeLaPage(sansValidation, lignes, contexte.couts)));
      const brut = { ...lu, validation };
      const page = schemasPage[type].parse(brut) as PageEditoriale;
      libelles.set(page.id, page.libelle_court);
      return { type, fichier, brut, page, corps: separerFrontmatter(contenu).corps };
    }),
  );
  // Voyant de chaque page (tuile des pages liées), comme la route.
  site.voyantDesPages = new Map(lues.flatMap(({ page }) => {
    const premiere = page.situations.find((l) => 'voyant' in l && l.voyant !== undefined);
    return premiere !== undefined && 'voyant' in premiere && premiere.voyant !== undefined ? [[page.id, premiere.voyant] as [string, string]] : [];
  }));
  const pages: PageDemoFormat2[] = [];
  for (const l of lues) {
    const choix = modeleDeLaPage(l.type, l.page);
    if ('absent' in choix) throw new Error(choix.absent);
    const adresse = contexte.plan.get(l.page.id)?.adresse ?? '/';
    const variantes: [string, string][] = l.type === 'panne' ? [['panne-format2', l.corps], ['panne-format2-arbre-court', avecArbreCourt(l.corps, court)]] : [['dossier-format2', l.corps]];
    for (const [nom, corps] of variantes) {
      const html = documentFormat2({ titre: l.page.title, description: l.page.description, adresse, contenu: choix.modele(l.page, site, corps), css, adresseOutil: contexte.plan.get('voyants')?.adresse, pictogrammeBouton });
      pages.push({ nom, type: l.type, fichier: l.fichier, brut: l.brut, page: l.page, adresse, html });
    }
  }
  return { contexte, site, pages };
}
