// Ensemble des contrôles d'une construction : données, porte de l'étape 4, pages (frontmatter, texte et page
// construite), puis site construit. Utilisé par scripts/controle.ts, qui affiche le bilan, et par les tests.
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { construireContexte, controlerEnsemble, controlerGrilleCouts, controlerPage, type Constat, type PageControlee } from '../../src/lib/controle.ts';
import { adressesDansLeTexte, indexerPlan, liensEnAttente } from '../../src/lib/plan.ts';
import { FICHIER_05, controlerPortePlan, lireCsv } from '../../src/lib/porte-plan.ts';
import { DOSSIER_CONTENU, DOSSIER_EXEMPLES, auteursDuSocle, chargerDonnees, chargerPages, listerFichiers } from './charger.ts';
import { adresseDepuisFichier } from '../../src/lib/site.ts';
import { constatsMaillage, controler404, controlerCanonicalEtPlanDuSite, controlerComposantsCommuns, controlerFixturesNonPubliees, controlerIndexation, controlerPagesDuPlan, controlerWrangler } from './dist.ts';

export interface BilanControle {
  constats: Constat[];
  /** Informations sans gravité (ni erreur ni alerte), affichées dans le bilan. */
  informations: string[];
  pagesEditoriales: number;
}

/**
 * Fiche auteur supposée pour la construction de recette des exemples (livrable 6.6) : la page « à propos », qui porte la
 * fiche, est écrite à l'étape 7. Jamais utilisée par la construction de production.
 */
export const AUTEUR_DES_EXEMPLES = 'houssem-jeddou';

export async function controlerSite(options: { racine: string; dist: string; aujourdhui: Date; indexable: boolean; exemples?: boolean }): Promise<BilanControle> {
  const { racine, dist, aujourdhui, indexable, exemples = false } = options;
  const constats: Constat[] = [];
  const informations: string[] = [];

  // 1. Fichiers de données et base voyants. Construction de recette (--exemples) : les exemples rédigés s'ajoutent aux
  //    pages, avec la fiche auteur supposée.
  const donnees = await chargerDonnees(racine);
  const pagesLues = await chargerPages(racine, exemples ? [DOSSIER_CONTENU, DOSSIER_EXEMPLES] : [DOSSIER_CONTENU]);
  const auteurs = [...auteursDuSocle(pagesLues), ...(exemples ? [AUTEUR_DES_EXEMPLES] : [])];
  if (exemples) informations.push(`construction de recette des exemples (${DOSSIER_EXEMPLES}/) : fiche auteur « ${AUTEUR_DES_EXEMPLES} » supposée, la page « à propos » est écrite à l'étape 7 ; jamais déployée`);
  const { contexte, constats: constatsDonnees } = construireContexte({ ...donnees, auteurs }, aujourdhui);
  constats.push(...constatsDonnees);
  // Grille des coûts : ses citations désignent des citations de la base voyants réelle (demande n° 6).
  constats.push(...controlerGrilleCouts(contexte.voyants, contexte.sources));

  // 1 bis. Porte de l'étape 4 : le plan du site couvre exactement les mots-clés de docs/05, sans doublon d'intention.
  const porte = controlerPortePlan([...contexte.plan.values()], lireCsv(await readFile(join(racine, FICHIER_05), 'utf8')));
  constats.push(...porte.constats);
  informations.push(...porte.informations);

  // 2. Pages : frontmatter, liens écrits dans le texte, page construite.
  const controlees: PageControlee[] = [];
  const construitesEditoriales: { id: string; fichier: string; html: string }[] = [];
  for (const lue of pagesLues) {
    if (lue.erreurLecture !== undefined) {
      constats.push({ regle: 'R7-FORMAT', gravite: 'erreur', message: lue.erreurLecture, fichier: lue.fichier });
      controlees.push({ type: lue.type, fichier: lue.fichier });
      continue;
    }
    const id = (lue.brut as { id?: unknown } | null)?.id;
    const adressePlan = typeof id === 'string' ? contexte.plan.get(id)?.adresse : undefined;
    if (/^fixture/i.test(String(id)) || /^\/fixture/i.test(String(adressePlan ?? ''))) {
      constats.push({ regle: 'FIXTURE-PUBLIEE', gravite: 'erreur', message: 'une page de test (fixture) ne doit jamais être dans src/content ni dans le plan du site', fichier: lue.fichier });
    }

    let html: string | undefined;
    if (adressePlan !== undefined) {
      try {
        html = await readFile(join(dist, adressePlan, 'index.html'), 'utf8');
      } catch {
        constats.push({ regle: 'R7-PAGE-NON-CONSTRUITE', gravite: 'erreur', message: `la page construite ${adressePlan} est introuvable dans ${dist}`, fichier: lue.fichier });
      }
    }
    const resultat = controlerPage({ type: lue.type, brut: lue.brut, fichier: lue.fichier }, contexte, html);
    if (html !== undefined && lue.type !== 'socle' && typeof id === 'string') construitesEditoriales.push({ id, fichier: lue.fichier, html });
    constats.push(...resultat.constats);
    controlees.push({
      type: lue.type,
      fichier: lue.fichier,
      id: resultat.id,
      adressesTexte: adressesDansLeTexte(lue.corps ?? '', adressePlan ?? '/'),
      ...(resultat.page !== undefined && { page: resultat.page }),
    });
  }
  constats.push(...controlerEnsemble(controlees, contexte));
  // Une page éditoriale construite a son fichier de contenu : un exemple (exemples/), une page de test ou une page
  // supprimée ne se retrouvent jamais dans le site construit (livrable 6.6 : aucune vraie page sur main avant l'étape 9).
  const adressesDuPlan = new Set([...contexte.plan.values()].map((l) => l.adresse));
  const adressesEcrites = new Set(controlees.flatMap((p) => (p.id !== undefined ? [contexte.plan.get(p.id)?.adresse ?? ''] : [])));
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    const adresseConstruite = adresseDepuisFichier(fichier);
    if (adresseConstruite === undefined || adresseConstruite === '/' || !adressesDuPlan.has(adresseConstruite) || adressesEcrites.has(adresseConstruite)) continue;
    constats.push({ regle: 'R7-PAGE-SANS-CONTENU', gravite: 'erreur', message: `la page ${adresseConstruite} est construite sans fichier de contenu dans ${exemples ? `${DOSSIER_CONTENU} ni ${DOSSIER_EXEMPLES}` : DOSSIER_CONTENU} (un exemple ne se publie qu'avec son lot)`, fichier });
  }
  const ecrites = new Set(controlees.flatMap((p) => (p.id !== undefined ? [p.id] : [])));
  // Maillage des pages construites (docs/08 §4) : fil d'Ariane vers la mère, enfants et pages liées construits.
  const index = indexerPlan(contexte.plan);
  const adresse = (pageId: string): string | undefined => contexte.plan.get(pageId)?.adresse;
  for (const p of construitesEditoriales) {
    const parent = contexte.plan.get(p.id)?.parent;
    const enfants = (index.enfants.get(p.id) ?? []).filter((e) => ecrites.has(e));
    const liees = [...(index.voisins.get(p.id) ?? [])].filter((v) => ecrites.has(v) && v !== parent && !enfants.includes(v));
    constats.push(
      ...constatsMaillage(p.html, p.fichier, {
        parent: parent !== undefined && ecrites.has(parent) ? adresse(parent) : undefined,
        enfants: enfants.flatMap((e) => adresse(e) ?? []),
        liees: liees.flatMap((v) => adresse(v) ?? []),
      }),
    );
  }
  const enAttente = liensEnAttente(contexte.plan, ecrites);
  if (enAttente > 0) {
    informations.push(`${enAttente} lien(s) du plan (paires déclarées et liens mère-enfant) en attente de leur page : ils s'afficheront quand les deux pages seront écrites`);
  }

  // 3. Site construit : non-indexation (dans les deux sens), pages du plan, canonical et plan du site, page 404,
  //    composants communs (mention en tête, signalement, typographie), fixtures, configuration Cloudflare.
  constats.push(...(await controlerIndexation(dist, indexable)));
  constats.push(...(await controlerPagesDuPlan(dist, [...contexte.plan.values()].map((ligne) => ligne.adresse))));
  constats.push(...(await controlerCanonicalEtPlanDuSite(dist)));
  constats.push(...(await controler404(dist)));
  constats.push(...(await controlerComposantsCommuns(dist)));
  constats.push(...(await controlerFixturesNonPubliees(dist)));
  constats.push(...(await controlerWrangler(racine)));

  return { constats, informations, pagesEditoriales: pagesLues.length };
}
