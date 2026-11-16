// Données du site pour les modèles de pages (étape 6, livrable 6.6) : plan, base voyants, registre, coûts et
// pictogrammes, lus une fois depuis data/ et src/pictogrammes, plus le libellé court de chaque page construite (fil
// d'Ariane, pages liées). Utilisé par la route des pages éditoriales (src/pages/[...adresse].astro), la page de
// démonstration et l'aperçu des exemples.
import { construireContexte, type Constat, type Contexte } from '../../src/lib/controle.ts';
import type { DonneesSite } from '../../src/lib/gabarit.ts';
import { emplacementsFactices } from '../../src/lib/emplacements-pub.ts';
import { chargerDonnees } from './charger.ts';
import { DOSSIER_ILLUSTRATIONS } from '../../src/lib/format2.ts';
import { DOSSIER_ILLUSTRATIONS_DEMO, chargerIllustrations, demoFormat2Active, lireBrouillonFormat2, voyantsAvecBrouillon } from './demo-format2.ts';

export interface DonneesDuSite {
  site: DonneesSite;
  contexte: Contexte;
  constats: Constat[];
}

/**
 * `libelles` : identifiant → libellé court de chaque page construite (les pages liées et le fil d'Ariane ne mènent qu'à
 * des pages construites). `auteurs` : fiches auteur connues (celles du socle, lues par le contrôle).
 */
export async function donneesDuSite(racine: string, libelles: ReadonlyMap<string, string>, aujourdhui: Date, auteurs: readonly string[] = []): Promise<DonneesDuSite> {
  const lues = await chargerDonnees(racine);
  // Construction de démonstration du format 2 (DEMO_FORMAT2=1, dist-demo-format2, jamais déployée) : la base voyants est
  // complétée en mémoire du brouillon du format 2, et les illustrations du brouillon s'ajoutent à celles du site (scripts/lib/demo-format2.ts).
  const demo = demoFormat2Active(process.env);
  const donnees = demo ? { ...lues, voyants: voyantsAvecBrouillon(lues.voyants, await lireBrouillonFormat2(racine)) } : lues;
  const { contexte, constats } = construireContexte({ ...donnees, auteurs }, aujourdhui);
  const site: DonneesSite = {
    plan: contexte.plan,
    voyants: contexte.voyants,
    sources: contexte.sources,
    couts: contexte.couts,
    pictogrammes: new Map((donnees.pictogrammes ?? []).map((p) => [p.id, p.contenu])),
    libelles: new Map(libelles),
    // Illustrations dessinées pour le site (format 2, règle 2i) ; démonstration : celles du site, plus celles qui n'existent
    // que pour elle (pages du lot F3 pas encore dessinées pour le site).
    illustrations: demo
      ? new Map([...(await chargerIllustrations(racine, DOSSIER_ILLUSTRATIONS)), ...(await chargerIllustrations(racine, DOSSIER_ILLUSTRATIONS_DEMO))])
      : await chargerIllustrations(racine, DOSSIER_ILLUSTRATIONS),
    // Emplacements publicitaires factices : construction de recette et démonstration du format 2 seulement (livrable 7.5b ;
    // règle 2m), jamais en production.
    pubFactice: emplacementsFactices(process.env) || demo,
  };
  return { site, contexte, constats };
}
