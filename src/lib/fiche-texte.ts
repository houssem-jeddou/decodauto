// ---------------------------------------------------------------------------------------------
// Bloc propre aux pages pneus et obligations (étape 6, livrable 6.6c) : la fiche « Le texte en bref ». Elle donne le
// texte de référence et sa source (Légifrance ou arrêté préfectoral), puis selon le sujet la période et les zones (loi
// montagne), ou les défaillances et la contre-visite (contrôle technique). Tout vient du frontmatter validé et du
// registre des sources : rien n'est saisi dans le HTML (charte §4, point 7 : texte de référence, ce qui est exigé,
// période et zones, marche à suivre ; ce qui est exigé et la marche à suivre sont dans le texte rédigé).
// Module sans dépendance à l'exécution : testé sans installation (tests/modeles.test.ts).
// ---------------------------------------------------------------------------------------------
import { texteHtml } from './html.ts';
import type { SourceDuRegistre } from './composants.ts';
import type { NATURES_TEXTE_REFERENCE, NIVEAUX_DEFAILLANCE } from '../schemas/listes.ts';

type NatureTexte = (typeof NATURES_TEXTE_REFERENCE)[number];
type NiveauDefaillance = (typeof NIVEAUX_DEFAILLANCE)[number];

/** Identifiant du titre de la fiche (préfixe da-, comme les autres composants : ID-DOUBLON). */
export const IDENTIFIANT_FICHE_TEXTE = 'da-texte-reference';

/** Titre de la fiche. */
export const TITRE_FICHE_TEXTE = 'Le texte en bref';

export const LIBELLE_NATURE: Readonly<Record<NatureTexte, string>> = {
  legifrance: 'Légifrance',
  'arrete-prefectoral': 'Arrêté préfectoral',
};

export const LIBELLE_DEFAILLANCE: Readonly<Record<NiveauDefaillance, string>> = {
  mineure: 'Défaillance mineure',
  majeure: 'Défaillance majeure',
  critique: 'Défaillance critique',
};

/** Ce que la fiche lit d'une page pneus et obligations. */
export interface PageTexte {
  texte_reference: { nature: NatureTexte; reference: string; source: string };
  periode?: { debut: string; fin: string } | undefined;
  zones?: readonly string[] | undefined;
  defaillances?: readonly { niveau: NiveauDefaillance; signification: string }[] | undefined;
  contre_visite?: { delai: string; demarche: string } | undefined;
}

/** Fiche du texte : ce qu'elle affiche, dans l'ordre, chaque ligne avec son intitulé. */
export interface FicheTexte {
  titre: string;
  lignes: readonly { intitule: string; valeur: string }[];
}

type Registre = ReadonlyMap<string, Pick<SourceDuRegistre, 'titre'>>;

/**
 * Modèle de la fiche, dans cet ordre : texte de référence ; où le lire (nature et titre du registre) ; période ; zones ;
 * défaillances (dans l'ordre mineure, majeure, critique) ; contre-visite. Une ligne absente du contenu n'est pas
 * affichée. Le schéma exige la période et les zones pour la loi montagne, les défaillances et la contre-visite pour le
 * contrôle technique.
 */
export function modeleFicheTexte(page: PageTexte, registre: Registre): FicheTexte {
  const { nature, reference, source } = page.texte_reference;
  const titreSource = registre.get(source)?.titre ?? source;
  const ordre: readonly NiveauDefaillance[] = ['mineure', 'majeure', 'critique'];
  const defaillances = [...(page.defaillances ?? [])].sort((a, b) => ordre.indexOf(a.niveau) - ordre.indexOf(b.niveau));
  return {
    titre: TITRE_FICHE_TEXTE,
    lignes: [
      { intitule: 'Texte de référence', valeur: reference },
      { intitule: 'Où le lire', valeur: `${LIBELLE_NATURE[nature]} : ${titreSource}` },
      ...(page.periode !== undefined ? [{ intitule: 'Période', valeur: `Du ${page.periode.debut} au ${page.periode.fin}` }] : []),
      ...(page.zones !== undefined ? [{ intitule: 'Zones', valeur: page.zones.join(' ; ') }] : []),
      ...defaillances.map((d) => ({ intitule: LIBELLE_DEFAILLANCE[d.niveau], valeur: d.signification })),
      ...(page.contre_visite !== undefined ? [{ intitule: 'Contre-visite', valeur: `${page.contre_visite.delai} : ${page.contre_visite.demarche}` }] : []),
    ],
  };
}

/** Fiche « Le texte en bref » (section repérée data-texte-reference, une ligne data-fiche-ligne par intitulé). */
export function ficheTexteHtml(fiche: FicheTexte): string {
  return [
    `<section class="fiche-texte" data-texte-reference aria-labelledby="${IDENTIFIANT_FICHE_TEXTE}">`,
    `<h2 id="${IDENTIFIANT_FICHE_TEXTE}">${texteHtml(fiche.titre)}</h2>`,
    '<dl>',
    ...fiche.lignes.map((l) => `<div data-fiche-ligne><dt>${texteHtml(l.intitule)}</dt><dd>${texteHtml(l.valeur)}</dd></div>`),
    '</dl>',
    '</section>',
  ].join('');
}
