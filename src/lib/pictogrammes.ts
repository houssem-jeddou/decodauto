// Libellé court de chaque pictogramme de la base (src/pictogrammes/<nom>.svg) : sous chaque dessin de la grille de l'accueil
// au format 2 (charte graphique §4, « Accueil » ; porte du pilote F1, règle 2k ; brief F1.2-corrections, §2). Une seule
// source, reprise du pilote validé (generer.py, LIBELLES_PICTOS). Ce n'est pas une donnée de contenu (comme TITRES_GROUPES
// de l'outil) : il nomme un dessin, sans verdict. Contrôle PICTO-LIBELLE (scripts/lib/controler-site.ts) : chaque fichier de
// src/pictogrammes a son libellé, aucun libellé sans fichier.
// Module sans dépendance à l'exécution.

export const LIBELLES_PICTOGRAMMES: Readonly<Record<string, string>> = {
  moteur: 'Moteur',
  stop: 'STOP',
  huile: 'Pression d’huile',
  'huile-niveau': 'Niveau d’huile',
  'cle-entretien': 'Clé d’entretien',
  batterie: 'Batterie',
  frein: 'Frein',
  'frein-stationnement': 'Frein à main',
  adblue: 'AdBlue',
  fap: 'FAP',
  prechauffage: 'Préchauffage',
  airbag: 'Airbag',
  'airbag-passager-off': 'Airbag passager désactivé',
  abs: 'ABS',
  esp: 'ESP',
  'pression-pneus': 'Pression des pneus',
  direction: 'Direction',
  temperature: 'Température',
};

/** PICTO-LIBELLE : chaque fichier de pictogramme a son libellé, et chaque libellé son fichier. */
export function constatsLibellesPictogrammes(fichiers: readonly string[], fichier = 'src/lib/pictogrammes.ts'): { regle: string; gravite: 'erreur'; message: string; fichier: string }[] {
  const sansLibelle = fichiers.filter((f) => LIBELLES_PICTOGRAMMES[f] === undefined);
  const sansFichier = Object.keys(LIBELLES_PICTOGRAMMES).filter((l) => !fichiers.includes(l));
  const constats: { regle: string; gravite: 'erreur'; message: string; fichier: string }[] = [];
  if (sansLibelle.length > 0) constats.push({ regle: 'PICTO-LIBELLE', gravite: 'erreur', message: `pictogramme(s) sans libellé dans LIBELLES_PICTOGRAMMES : ${sansLibelle.join(', ')}`, fichier });
  if (sansFichier.length > 0) constats.push({ regle: 'PICTO-LIBELLE', gravite: 'erreur', message: `libellé(s) sans fichier dans src/pictogrammes : ${sansFichier.join(', ')}`, fichier });
  return constats;
}
