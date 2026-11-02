// Parties générées de la charte éditoriale (docs/10_charte_editoriale.md) : la ligne de transparence et la section
// « Notre méthode » de la page « à propos », tirées de src/lib/charte.ts et des données (registre des sources).
// Elles sont écrites entre deux marqueurs ; le reste de la charte est écrit à la main. Un test vérifie que la
// charte est à jour. Module sans dépendance à l'exécution.
import { LIGNE_TRANSPARENCE, sectionMethode, type NoticeLue } from '../../src/lib/charte.ts';

/** Chemin de la charte, depuis la racine du dépôt. */
export const FICHIER_CHARTE = 'docs/10_charte_editoriale.md';

type Bloc = 'transparence' | 'methode';
export const MARQUEURS_CHARTE: Readonly<Record<Bloc, readonly [string, string]>> = {
  transparence: ['<!-- vue-charte:transparence:debut (généré par npm run charte:vue : ne pas modifier à la main) -->', '<!-- vue-charte:transparence:fin -->'],
  methode: ['<!-- vue-charte:methode:debut (généré par npm run charte:vue : ne pas modifier à la main) -->', '<!-- vue-charte:methode:fin -->'],
};

export function genererVueCharte(registre: readonly NoticeLue[]): Record<Bloc, string> {
  const transparence = `> ${LIGNE_TRANSPARENCE.texte} [${LIGNE_TRANSPARENCE.libelleLien}]`;
  const section = sectionMethode(registre);
  const lignes = [`### ${section.titre} (ancre \`#${section.ancre}\`)`, '', section.introduction];
  for (const bloc of section.blocs) {
    lignes.push('', `#### ${bloc.titre}`);
    for (const paragraphe of bloc.paragraphes) lignes.push('', paragraphe);
    if (bloc.liste !== undefined) lignes.push('', ...bloc.liste.map((element) => `- ${element}`));
  }
  return { transparence, methode: lignes.join('\n') };
}

export function insererVueCharte(document: string, vue: Record<Bloc, string>): string {
  let resultat = document;
  for (const bloc of Object.keys(MARQUEURS_CHARTE) as Bloc[]) {
    const [debut, fin] = MARQUEURS_CHARTE[bloc];
    const i = resultat.indexOf(debut);
    const j = resultat.indexOf(fin);
    if (i < 0 || j < i) throw new Error(`charte : marqueurs du bloc « ${bloc} » absents ou dans le désordre`);
    resultat = `${resultat.slice(0, i + debut.length)}\n${vue[bloc]}\n${resultat.slice(j)}`;
  }
  return resultat;
}
