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

/**
 * Coupures des mots longs des libellés de la grille des dessins (accueil, encadré de la page outil ; revue du lot U2) : un
 * trait d'union conditionnel (U+00AD) à chaque « | », seul endroit où le mot peut se couper (`hyphens: manual`), avec un
 * tiret, quel que soit le navigateur et son dictionnaire (le Chrome de la CI n'en a pas). Chaque mot de MOT_LONG lettres au
 * moins d'un libellé a la sienne, et une coupure retirée de ses « | » redonne le mot (PICTO-COUPURE).
 */
export const COUPURES_LIBELLES: Readonly<Record<string, string>> = {
  Préchauffage: 'Pré|chauf|fage',
  Température: 'Tempé|ra|ture',
  désactivé: 'désac|tivé',
  Direction: 'Direc|tion',
  'd’entretien': 'd’entre|tien',
};
/** Un mot de cette longueur (lettres) au moins a sa coupure. */
export const MOT_LONG = 9;
export const TRAIT_CONDITIONNEL = '­';

const lettres = (mot: string): number => (mot.match(/\p{L}/gu) ?? []).length;

/** Libellé tel qu'il s'affiche dans une tuile de la grille : ses mots longs avec leurs traits d'union conditionnels. */
export function libelleCoupable(libelle: string): string {
  return libelle
    .split(/(\s+)/)
    .map((mot) => (COUPURES_LIBELLES[mot] ?? mot).split('|').join(TRAIT_CONDITIONNEL))
    .join('');
}

/** PICTO-COUPURE : chaque mot long d'un libellé a sa coupure ; chaque coupure redonne son mot et sert. */
export function constatsCoupuresLibelles(libelles: Readonly<Record<string, string>> = LIBELLES_PICTOGRAMMES, coupures: Readonly<Record<string, string>> = COUPURES_LIBELLES, fichier = 'src/lib/pictogrammes.ts'): { regle: string; gravite: 'erreur'; message: string; fichier: string }[] {
  const mots = new Set(Object.values(libelles).flatMap((l) => l.split(/\s+/)));
  const sansCoupure = [...mots].filter((m) => lettres(m) >= MOT_LONG && coupures[m] === undefined);
  const fausses = Object.entries(coupures).filter(([mot, coupe]) => coupe.split('|').join('') !== mot || !coupe.includes('|') || coupe.split('|').some((p) => p === ''));
  const inutiles = Object.keys(coupures).filter((m) => !mots.has(m));
  const problemes = [
    ...(sansCoupure.length > 0 ? [`mot(s) de ${MOT_LONG} lettres au moins sans coupure dans COUPURES_LIBELLES : ${sansCoupure.join(', ')}`] : []),
    ...(fausses.length > 0 ? [`coupure(s) qui ne redonnent pas leur mot, ou sans « | » : ${fausses.map(([m]) => m).join(', ')}`] : []),
    ...(inutiles.length > 0 ? [`coupure(s) d'un mot absent des libellés : ${inutiles.join(', ')}`] : []),
  ];
  return problemes.map((message) => ({ regle: 'PICTO-COUPURE', gravite: 'erreur', message, fichier }));
}
