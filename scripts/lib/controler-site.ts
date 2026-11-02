// Ensemble des contrôles d'une construction : données, porte de l'étape 4, pages (frontmatter, texte et page
// construite), puis site construit. Utilisé par scripts/controle.ts, qui affiche le bilan, et par les tests.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { construireContexte, controlerEnsemble, controlerGrilleCouts, controlerPage, type Constat, type PageControlee } from '../../src/lib/controle.ts';
import { adressesDansLeTexte, liensEnAttente } from '../../src/lib/plan.ts';
import { FICHIER_05, controlerPortePlan, lireCsv } from '../../src/lib/porte-plan.ts';
import { auteursDuSocle, chargerDonnees, chargerPages } from './charger.ts';
import { controler404, controlerCanonicalEtPlanDuSite, controlerComposantsCommuns, controlerFixturesNonPubliees, controlerIndexation, controlerPagesDuPlan, controlerWrangler } from './dist.ts';

export interface BilanControle {
  constats: Constat[];
  /** Informations sans gravité (ni erreur ni alerte), affichées dans le bilan. */
  informations: string[];
  pagesEditoriales: number;
}

export async function controlerSite(options: { racine: string; dist: string; aujourdhui: Date; indexable: boolean }): Promise<BilanControle> {
  const { racine, dist, aujourdhui, indexable } = options;
  const constats: Constat[] = [];
  const informations: string[] = [];

  // 1. Fichiers de données et base voyants.
  const donnees = await chargerDonnees(racine);
  const pagesLues = await chargerPages(racine);
  const { contexte, constats: constatsDonnees } = construireContexte({ ...donnees, auteurs: auteursDuSocle(pagesLues) }, aujourdhui);
  constats.push(...constatsDonnees);
  // Grille des coûts : ses citations désignent des citations de la base voyants réelle (demande n° 6).
  constats.push(...controlerGrilleCouts(contexte.voyants, contexte.sources));

  // 1 bis. Porte de l'étape 4 : le plan du site couvre exactement les mots-clés de docs/05, sans doublon d'intention.
  const porte = controlerPortePlan([...contexte.plan.values()], lireCsv(await readFile(join(racine, FICHIER_05), 'utf8')));
  constats.push(...porte.constats);
  informations.push(...porte.informations);

  // 2. Pages : frontmatter, liens écrits dans le texte, page construite.
  const controlees: PageControlee[] = [];
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
  const ecrites = new Set(controlees.flatMap((p) => (p.id !== undefined ? [p.id] : [])));
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
