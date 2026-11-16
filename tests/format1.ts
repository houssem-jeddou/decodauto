// Version au format 1 d'une page passée au format 2 par son lot (lot F2 : pages voyants et outil ; demande de changement
// n° 30). Les tests du modèle du format 1 (livrable 6.6 : ordre des blocs, références, outil) le vérifient sur une vraie
// page : le modèle sert encore aux pages de la vague A pas encore passées (lot F3). On retire ce que seul le format 2
// connaît : le champ `format: 2`, le champ `illustration` et les repères (« {{repere:…}} », seuls dans leur paragraphe).
// Le texte, l'encadré et les données ne changent pas.

/** Contenu Markdown (frontmatter et corps) au format 1. */
export function versionFormat1(contenu: string): string {
  const lignes = contenu.split('\n');
  const sortie: string[] = [];
  let dansIllustration = false;
  for (const ligne of lignes) {
    if (dansIllustration) {
      if (/^\s+\S/.test(ligne)) continue;
      dansIllustration = false;
    }
    if (ligne === 'format: 2') continue;
    if (ligne === 'illustration:') {
      dansIllustration = true;
      continue;
    }
    sortie.push(ligne);
  }
  return sortie.join('\n').replace(/\n\{\{repere:[^}]+\}\}\n\n/g, '\n');
}
