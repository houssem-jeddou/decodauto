// Données du site pour les modèles de pages (étape 6, livrable 6.6) : plan, base voyants, registre, coûts et
// pictogrammes, lus une fois depuis data/ et src/pictogrammes, plus le libellé court de chaque page construite (fil
// d'Ariane, pages liées). Utilisé par la route des pages éditoriales (src/pages/[...adresse].astro), la page de
// démonstration et l'aperçu des exemples.
import { construireContexte, type Constat, type Contexte } from '../../src/lib/controle.ts';
import type { DonneesSite } from '../../src/lib/gabarit.ts';
import { emplacementsFactices } from '../../src/lib/emplacements-pub.ts';
import { chargerDonnees } from './charger.ts';

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
  const donnees = await chargerDonnees(racine);
  const { contexte, constats } = construireContexte({ ...donnees, auteurs }, aujourdhui);
  const site: DonneesSite = {
    plan: contexte.plan,
    voyants: contexte.voyants,
    sources: contexte.sources,
    couts: contexte.couts,
    pictogrammes: new Map((donnees.pictogrammes ?? []).map((p) => [p.id, p.contenu])),
    libelles: new Map(libelles),
    // Emplacements publicitaires factices : construction de recette seulement (livrable 7.5b), jamais en production.
    pubFactice: emplacementsFactices(process.env),
  };
  return { site, contexte, constats };
}
