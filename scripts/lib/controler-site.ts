// Ensemble des contrôles d'une construction : données, porte de l'étape 4, pages (frontmatter, texte et page
// construite), puis site construit. Utilisé par scripts/controle.ts, qui affiche le bilan, et par les tests.
import { PAGE_CONFIDENTIALITE, PAGE_METHODE } from '../../src/lib/charte.ts';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { construireContexte, controlerEnsemble, controlerGrilleCouts, controlerPage, type Constat, type PageControlee } from '../../src/lib/controle.ts';
import { ID_OUTIL_VOYANTS, adressesDansLeTexte, indexerPlan, liensEnAttente, liensExternesDuTexte } from '../../src/lib/plan.ts';
import { FICHIER_05, controlerPortePlan, lireCsv } from '../../src/lib/porte-plan.ts';
import { AUTEUR_SUPPOSE, DOSSIER_CONTENU, DOSSIER_EXEMPLES, auteursDuSocle, chargerDonnees, chargerPages, chargerPictogrammes, listerFichiers } from './charger.ts';
import { adresseDepuisFichier } from '../../src/lib/site.ts';
import { FICHIER_LOTS_FORMAT2, FICHIER_VAGUES_OUVERTES, chargerLotsFormat2, chargerVaguesOuvertes, controlerFormatDesVagues, controlerVaguesOuvertes } from './vagues.ts';
import { controlerFavicon } from './favicon.ts';
import { controlerAdsense } from './adsense.ts';
import { controlerPartage } from './partage.ts';
import { DOSSIER_PAGES_DEMO_FORMAT2, constatsDemoPubliee, pageAvecBrouillon, voyantsAvecBrouillon, type BrouillonFormat2 } from './demo-format2.ts';
import { DOSSIER_ILLUSTRATIONS, illustrationEnLigne } from '../../src/lib/format2.ts';
import { chargerIllustrations } from './demo-format2.ts';
import { constatsLibellesPictogrammes } from '../../src/lib/pictogrammes.ts';
import { constatsMaillage, controler404, controlerCanonicalEtPlanDuSite, controlerAccueil, controlerComposantsCommuns, controlerFixturesNonPubliees, controlerIndexation, controlerMenuEtPied, controlerPagesDuPlan, controlerWrangler } from './dist.ts';

export interface BilanControle {
  constats: Constat[];
  /** Informations sans gravité (ni erreur ni alerte), affichées dans le bilan. */
  informations: string[];
  pagesEditoriales: number;
}

/**
 * Identifiant de la fiche auteur pour les tests qui construisent une page sans la page « à propos » (tests/modeles.test.ts).
 * La construction de recette lit la fiche de la page « à propos » (livrable 7.3) ; jamais utilisée par la production.
 */
export const AUTEUR_DES_EXEMPLES = AUTEUR_SUPPOSE;

export async function controlerSite(options: { racine: string; dist: string; aujourdhui: Date; indexable: boolean; exemples?: boolean; brouillonFormat2?: BrouillonFormat2 | undefined }): Promise<BilanControle> {
  const { racine, dist, aujourdhui, indexable, exemples = false, brouillonFormat2 } = options;
  const constats: Constat[] = [];
  const informations: string[] = [];

  // 1. Fichiers de données et base voyants. Construction de recette (--exemples) : les exemples rédigés s'ajoutent aux
  //    pages (dont la page « à propos » et sa fiche auteur, livrable 7.3).
  // Construction de démonstration du format 2 (--demo-format2) : le brouillon s'applique aux données et aux pages lues, comme
  // à la construction (scripts/lib/demo-format2.ts).
  const lues = await chargerDonnees(racine);
  const donnees = brouillonFormat2 !== undefined ? { ...lues, voyants: voyantsAvecBrouillon(lues.voyants, brouillonFormat2) } : lues;
  const dossiers = [DOSSIER_CONTENU, ...(exemples ? [DOSSIER_EXEMPLES] : []), ...(brouillonFormat2 !== undefined ? [DOSSIER_PAGES_DEMO_FORMAT2] : [])];
  const pagesLues = (await chargerPages(racine, dossiers)).map((p) =>
    brouillonFormat2 !== undefined && p.brut !== undefined ? { ...p, brut: pageAvecBrouillon(p.brut, brouillonFormat2) } : p,
  );
  if (brouillonFormat2 !== undefined) informations.push('construction de démonstration du format 2 (dist-demo-format2) : brouillon jamais validé, jamais déployée');
  const auteurs = auteursDuSocle(pagesLues);
  if (exemples) informations.push(`construction de recette des exemples (${DOSSIER_EXEMPLES}/) : jamais déployée`);
  const { contexte: contexteDonnees, constats: constatsDonnees } = construireContexte({ ...donnees, auteurs }, aujourdhui);
  // Pages écrites et leur libellé court : l'outil voyants ne mène qu'à une page construite (livrable 8.1).
  const contexte = {
    ...contexteDonnees,
    pagesEcrites: new Map(
      pagesLues.flatMap((p): [string, string][] => {
        const brut = p.brut as { id?: unknown; libelle_court?: unknown } | null | undefined;
        return typeof brut?.id === 'string' && typeof brut.libelle_court === 'string' ? [[brut.id, brut.libelle_court]] : [];
      }),
    ),
  };
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
      liensExternes: liensExternesDuTexte(lue.corps ?? ''),
      ...(resultat.page !== undefined && { page: resultat.page }),
    });
  }
  constats.push(...controlerEnsemble(controlees, contexte));
  // Vagues ouvertes (demande de changement n° 21) : une page de src/content n'est publiée que si sa vague est ouverte.
  try {
    const ouvertes = await chargerVaguesOuvertes(racine);
    const pagesPubliees = pagesLues.map((l) => ({ id: typeof (l.brut as { id?: unknown } | null)?.id === 'string' ? ((l.brut as { id: string }).id) : undefined, fichier: l.fichier }));
    constats.push(...controlerVaguesOuvertes(pagesPubliees, (id) => contexte.plan.get(id)?.vague, ouvertes, DOSSIER_CONTENU));
  } catch (e) {
    constats.push({ regle: 'VAGUE-NON-OUVERTE', gravite: 'erreur', message: e instanceof Error ? e.message : String(e), fichier: FICHIER_VAGUES_OUVERTES });
  }
  // Format des vagues (demande de changement n° 30, F1.4) : vagues B et C au format 2 ; vague A au format 2 seulement avec
  // son lot (config/lots-format2.json), sauf dans la construction de démonstration.
  try {
    const lots = await chargerLotsFormat2(racine);
    const pagesFormat = pagesLues.map((l) => {
      const brut = l.brut as { id?: unknown; format?: unknown } | null | undefined;
      return { id: typeof brut?.id === 'string' ? brut.id : undefined, fichier: l.fichier, format: brut?.format };
    });
    constats.push(...controlerFormatDesVagues(pagesFormat, (id) => contexte.plan.get(id)?.vague, lots, { demo: brouillonFormat2 !== undefined, dossierContenu: DOSSIER_CONTENU }));
  } catch (e) {
    constats.push({ regle: 'FORMAT2-VAGUE', gravite: 'erreur', message: e instanceof Error ? e.message : String(e), fichier: FICHIER_LOTS_FORMAT2 });
  }
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
  constats.push(...(await controlerComposantsCommuns(dist, contexte.plan.get(PAGE_CONFIDENTIALITE)?.adresse, contexte.plan.get(PAGE_METHODE)?.adresse, exemples || brouillonFormat2 !== undefined)));
  // Illustrations du site (format 2, règle 2i) : chaque dessin de src/illustrations se pose en ligne sans script ni ressource.
  for (const [fichier, svg] of await chargerIllustrations(racine, DOSSIER_ILLUSTRATIONS)) {
    try {
      illustrationEnLigne(svg, fichier, fichier);
    } catch (e) {
      constats.push({ regle: 'ILLUSTRATION-SVG', gravite: 'erreur', message: e instanceof Error ? e.message : String(e), fichier: `${DOSSIER_ILLUSTRATIONS}/${fichier}.svg` });
    }
  }
  // Libellé de chaque pictogramme (grille de l'accueil au format 2) : un par fichier de src/pictogrammes (PICTO-LIBELLE).
  constats.push(...constatsLibellesPictogrammes((await chargerPictogrammes(racine)).map((p) => p.id)));
  // Garde-fou : une page de la construction de démonstration du format 2 n'est jamais dans un site contrôlé comme réel.
  if (brouillonFormat2 === undefined) {
    for (const chemin of await listerFichiers(dist, '.html')) constats.push(...constatsDemoPubliee(await readFile(chemin, 'utf8'), relative(dist, chemin).split('\\').join('/')));
  }
  // Accueil (livrable 7.4a) : liste générée depuis le plan, exactement les pages éditoriales construites.
  const adresseOutil = construitesEditoriales.find((p) => p.id === ID_OUTIL_VOYANTS) !== undefined ? contexte.plan.get(ID_OUTIL_VOYANTS)?.adresse : undefined;
  const adresseAPropos = contexte.plan.get(PAGE_METHODE)?.adresse;
  const aProposConstruite = adresseAPropos !== undefined && (await listerFichiers(dist, '.html')).some((c) => adresseDepuisFichier(relative(dist, c).split('\\').join('/')) === adresseAPropos);
  // Pages éditoriales construites, dans l'ordre du plan : liste de l'accueil et du menu du site.
  const pagesListeesDuSite = [...contexte.plan.values()].filter((ligne) => construitesEditoriales.some((p) => p.id === ligne.id)).map((ligne) => ({ adresse: ligne.adresse, theme: ligne.theme }));
  constats.push(
    ...(await controlerAccueil(dist, {
      pages: construitesEditoriales.flatMap((p) => {
        const ligne = contexte.plan.get(p.id);
        return ligne === undefined ? [] : [{ adresse: ligne.adresse, theme: ligne.theme }];
      }),
      outil: adresseOutil,
      aPropos: aProposConstruite ? adresseAPropos : undefined,
    })),
  );
  // Menu du site et liens du pied de page (demande de changement n° 40, lot U1), sur chaque page au format 2.
  constats.push(...(await controlerMenuEtPied(dist, { pages: pagesListeesDuSite, aPropos: aProposConstruite ? adresseAPropos : undefined })));
  constats.push(...(await controlerFixturesNonPubliees(dist)));
  constats.push(...(await controlerWrangler(racine)));
  // Favicon et icône de la marque (premier lot) : liens de chaque page et fichiers servis (FAVICON-*).
  constats.push(...(await controlerFavicon(dist)));
  // AdSense, demande de changement n° 38, temps 1 : balise d'association et ads.txt générés depuis config/adsense.json,
  // aucune publicité affichée (ADSENSE-*).
  constats.push(...(await controlerAdsense(racine, dist)));
  // Balises et images de partage, lot U3 de l'audit UX/UI (PARTAGE-*) : une image par page éditoriale, celle de la marque
  // ailleurs, aucune sur la 404.
  constats.push(...(await controlerPartage(dist, new Map([...contexte.plan.values()].map((ligne) => [ligne.adresse, ligne.id])))));

  return { constats, informations, pagesEditoriales: pagesLues.length };
}
