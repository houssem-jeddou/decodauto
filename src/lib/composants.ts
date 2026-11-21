// ---------------------------------------------------------------------------------------------
// Composants communs des pages (étape 6, livrable 6.3). Chaque composant est une fonction qui reçoit des données
// déjà calculées et rend son HTML ; les gabarits Astro l'insèrent tel quel (set:html). Tout texte passe par la
// typographie et l'échappement (src/lib/html.ts). Les textes fixes viennent de la charte (src/lib/charte.ts), de la
// grille (src/schemas/grille.ts) et de l'échelle du coût (src/schemas/cout.ts) : rien n'est recopié ici.
//
//   mentionEnTete        toutes les pages, avant le H1 (charte §5.1)
//   signalerErreur       toutes les pages (charte §5.3)
//   filDAriane           pages du plan, avant le H1 (docs/08 §4)
//   encadreDecision      pages éditoriales, premier bloc après le H1 (docs/08 §3 règle 9) ; gravité lisible sans la
//                        seule couleur : libellé écrit, icône de forme propre à chaque verdict, couleur en plus
//   signaturePage, ligneTransparence   pages éditoriales, juste après l'encadré (charte §4)
//   causesAvecCout       pages à causes (voyant, code défaut, panne)
//   pagesLiees           liens et pages enfants tirés du plan (pages construites seulement)
//   sectionSources       toute source citée sur la page (charte §4)
//   sectionMethodeHtml   section « Méthode » de la page « à propos »
//
// Les contrôles de la page construite (src/lib/controle.ts, scripts/lib/dist.ts) vérifient ce que ces composants
// doivent produire. Module sans dépendance à l'exécution : testé sans installation (tests/composants.test.ts).
// ---------------------------------------------------------------------------------------------
import { attributHtml, echapper, texteHtml } from './html.ts';
import {
  ANCRE_METHODE,
  ANCRE_CONFIDENTIALITE,
  LIBELLE_LIEN_CONFIDENTIALITE,
  LIBELLE_SIGNALER_ERREUR,
  categoriesQuiFixentUnVerdict,
  LIGNE_TRANSPARENCE,
  MENTION_EN_TETE,
  PAGE_METHODE,
  enLettres,
  enumerer,
  nomCourtNotice,
  signature,
  type SectionMethode,
} from './charte.ts';
import { ADRESSE_SIGNALEMENT, urlAbsolue } from './site.ts';
import { dateAffichee, datesAffichees, fourchetteAffichee, libellePlage, libelleRisque, trancheDesPieces, type CoutResolu, type DonneesCouts } from './cout.ts';
import type { LigneResolue } from './calcul.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../schemas/grille.ts';
import { GRILLE_COUTS, LIBELLES_FOURCHETTES } from '../schemas/cout.ts';
import { rangVerdict, type Urgence, type Verdict } from '../schemas/listes.ts';

/**
 * Identifiants posés par les composants, préfixés pour ne jamais rencontrer ceux que le rendu du Markdown donne aux
 * titres du corps (contrôle ID-DOUBLON).
 */
export const IDENTIFIANTS = {
  decision: 'da-decision',
  causes: 'da-causes',
  enfants: 'da-dans-cette-rubrique',
  liees: 'da-a-lire-aussi',
  sources: 'da-sources',
  notices: 'da-notices',
} as const;

/** Ce que les composants lisent d'une source du registre (data/sources.json). */
export interface SourceDuRegistre {
  id: string;
  titre: string;
  editeur: string;
  categorie: string;
  url: string;
  date_consultation: Date;
  /** Notice constructeur : modèle, génération et édition (« 208 (2e génération), guide d'utilisation édition 01-20 »). */
  modele?: string | undefined;
}

/** Ce que les composants lisent d'une ligne du plan du site. */
export interface LigneDuPlan {
  id: string;
  adresse: string;
  parent?: string | undefined;
}

// ---- Mention en tête et signalement ------------------------------------------------------------

/** Mention en tête, avant le H1, sur toutes les pages : visible, jamais masquée (article 50(5) du règlement sur l'IA). */
export const mentionEnTete = (): string => `<p class="mention-ia" data-mention-ia>${texteHtml(MENTION_EN_TETE)}</p>`;

/**
 * Lien de signalement d'une erreur : courriel à l'adresse du site, avec l'adresse de la page et un modèle de message.
 * Sans adresse (page 404 : l'adresse demandée n'est pas connue du site statique), le lecteur la complète.
 */
export function lienSignalement(adressePage?: string): string {
  const url = adressePage !== undefined ? urlAbsolue(adressePage) : undefined;
  const sujet = url !== undefined ? `Erreur sur la page ${url}` : 'Erreur sur decodauto.com';
  // Fins de ligne CRLF dans un lien mailto (RFC 6068, §5).
  const corps = `Page : ${url ?? ''}\r\nCe qui est faux :\r\nCe qui serait juste, et votre source si vous en avez une :\r\n`;
  return `mailto:${ADRESSE_SIGNALEMENT}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
}

/**
 * Lien « Signaler une erreur », suivi de l'adresse en clair (pour un lecteur sans logiciel de messagerie). Les
 * commentaires email_off demandent à Cloudflare de ne pas masquer l'adresse (ce masquage ajouterait un script).
 */
export const signalerErreur = (adressePage?: string): string =>
  `<p class="signaler-erreur" data-signaler-erreur><!--email_off--><a href="${attributHtml(lienSignalement(adressePage))}">${texteHtml(LIBELLE_SIGNALER_ERREUR)}</a> (${texteHtml(ADRESSE_SIGNALEMENT)})<!--/email_off--></p>`;

/**
 * Lien de pied de page vers les mentions légales et la politique de confidentialité, affiché dès que la page est construite
 * (contrôle CONFIDENTIALITE-LIEN) : jamais un lien vers une page qui n'existe pas.
 */
export const lienConfidentialite = (adresse: string): string =>
  `<p class="lien-confidentialite" data-lien-confidentialite><a href="${attributHtml(adresse)}#${ANCRE_CONFIDENTIALITE}">${texteHtml(LIBELLE_LIEN_CONFIDENTIALITE)}</a></p>`;

// ---- Fil d'Ariane ----------------------------------------------------------------------------------

export interface Miette {
  libelle: string;
  /** Absente pour la page courante. */
  adresse?: string | undefined;
}

/**
 * Chemin du fil d'Ariane d'une page : Accueil, puis ses pages mères (de la plus haute à la plus proche) qui sont
 * construites, puis la page elle-même (sans lien). `libelles` : libellé court de chaque page construite.
 */
export function cheminDAriane(id: string, plan: ReadonlyMap<string, LigneDuPlan>, libelles: ReadonlyMap<string, string>): Miette[] {
  const meres: Miette[] = [];
  const vues = new Set<string>([id]);
  let parent = plan.get(id)?.parent;
  while (parent !== undefined && !vues.has(parent)) {
    vues.add(parent);
    const ligne = plan.get(parent);
    const libelle = libelles.get(parent);
    if (ligne !== undefined && libelle !== undefined && ligne.adresse !== '/') meres.unshift({ libelle, adresse: ligne.adresse });
    parent = ligne?.parent;
  }
  return [{ libelle: 'Accueil', adresse: '/' }, ...meres, { libelle: libelles.get(id) ?? id }];
}

/** Fil d'Ariane ; `classe` : classe du bloc (« fil » au format 2, charte graphique §4). */
export function filDAriane(miettes: readonly Miette[], classe = 'fil-ariane'): string {
  const elements = miettes
    .map((m) => (m.adresse !== undefined ? `<li><a href="${attributHtml(m.adresse)}">${texteHtml(m.libelle)}</a></li>` : `<li><span aria-current="page">${texteHtml(m.libelle)}</span></li>`))
    .join('');
  return `<nav class="${attributHtml(classe)}" aria-label="${attributHtml('Fil d’Ariane')}" data-fil-ariane><ol>${elements}</ol></nav>`;
}

// ---- Encadré de décision ---------------------------------------------------------------------------

/** Gravité d'un verdict, de 0 (oui) à 3 (arrêt immédiat) : sert à l'icône et à la couleur, jamais seule. */
export const graviteDuVerdict = (verdict: Verdict): number => rangVerdict(verdict);

/**
 * Icône de gravité, de forme propre à chaque verdict (lisible sans la couleur, WCAG 1.4.1) : coche (oui), cercle
 * marqué d'un point d'exclamation (avec précautions), triangle (arrêt dès que possible), octogone « stop » (arrêt
 * immédiat). Décorative : le libellé du verdict est toujours écrit à côté.
 */
export function iconeGravite(verdict: Verdict): string {
  const formes: Readonly<Record<number, string>> = {
    0: '<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    1: '<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 6.5v7" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.5" fill="#fff"/>',
    2: '<path d="M12 2.5L22.5 21h-21z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 9v5.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1.4" fill="#fff"/>',
    3: '<path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z" fill="currentColor"/><path d="M7 12h10" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>',
  };
  return `<svg class="icone-gravite" data-icone-gravite="${graviteDuVerdict(verdict)}" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">${formes[graviteDuVerdict(verdict)] ?? ''}</svg>`;
}

/**
 * Pictogramme d'un voyant (src/pictogrammes, contrôlé par PICTO-*) rendu décoratif : il double le texte de la
 * situation (charte §4), donc ni titre ni rôle ; masqué aux lecteurs d'écran, sans texte (R9-ENCADRE-MASQUE).
 */
export function pictogrammeDecoratif(svg: string): string {
  return svg
    .replace(/<title\b[\s\S]*?<\/title\s*>/gi, '')
    .replace(/<desc\b[\s\S]*?<\/desc\s*>/gi, '')
    .replace(/\srole\s*=\s*"[^"]*"/i, '')
    .replace(/<svg\b/i, '<svg class="pictogramme" aria-hidden="true" focusable="false"');
}

/** Nom court d'une source : modèle d'une notice (« Peugeot 208 »), début du titre d'un texte (« Code de la route, article D314-8 »). */
export function nomCourtSource(source: Pick<SourceDuRegistre, 'titre' | 'categorie'>): string {
  if (source.categorie === 'notice-constructeur') return nomCourtNotice(source.titre);
  const titre = (source.titre.split(' — ')[0] ?? source.titre).split(' (')[0] ?? source.titre;
  return titre.replace(/\s+relati(?:f|ve|fs|ves)\s.*$/u, '').trim();
}

/** Ancre de la partie d'un voyant dans le tableau des notices (livrable 6.4) : l'encadré de décision y renvoie. */
export const ancreNotices = (voyant: string): string => `${IDENTIFIANTS.notices}-${voyant}`;

/**
 * Ancre de la phrase « Notices » d'une ligne saisie de l'encadré (format 2, sans voyant de la base, donc sans tableau des
 * notices), sous laquelle s'affiche l'écart entre marques de la ligne : le lien « Votre marque » de sa ligne d'écart y
 * renvoie (règle 2b, décision du 16/11/2026 ; revue de la PR n° 73). `ligne` : rang de la ligne dans l'encadré, à partir de 1.
 */
export const ancreNoticesLigne = (ligne: number): string => `${IDENTIFIANTS.notices}-ligne-${ligne}`;

/** Libellé du lien de l'encadré vers la partie du voyant dans le tableau des notices (livrable 6.4). */
export const LIBELLE_LIEN_NOTICES = 'Ce que dit chaque notice';

/** Libellés fixes des composants, repris tels quels par le format 2 (src/lib/format2.ts). */
export const LIBELLE_COUT_PROBABLE = 'Coût probable :';
export const TITRE_CAUSES = 'Causes possibles';
export const LIBELLE_ORDRE_DE_GRANDEUR = "ordre de grandeur, pièce et main-d'œuvre";
export const TITRE_PAGES_ENFANTS = 'Dans cette rubrique';
export const TITRE_PAGES_LIEES = 'À lire aussi';
export const TITRE_SOURCES = 'Sources';

export interface LigneEncadre {
  situation: string;
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  ecart?: string | undefined;
  /** Notices de constructeurs citées par la ligne (noms courts) et autres sources (noms courts). */
  notices: readonly string[];
  autres: readonly string[];
  /** Pictogramme du voyant (SVG) et sa couleur dans la base (rouge, orange…), pour une ligne reprise de la base. */
  pictogramme?: string | undefined;
  couleur?: string | undefined;
  /** Ancre de la partie du voyant dans le tableau des notices de la page, s'il y figure (lien sous les sources). */
  detailNotices?: string | undefined;
}

export interface CoutEncadre {
  plage: string;
  risque?: string | undefined;
  /** Montants affichés ; `consigne` : consigne de sécurité du montant (demande de changement n° 39), dans sa rangée. */
  montants: readonly { texte: string; dates: readonly string[]; consigne?: string | undefined }[];
  prisesEnCharge: readonly string[];
  baseDeCalcul: string;
}

export interface ModeleEncadre {
  question: string;
  lignes: readonly LigneEncadre[];
  cout?: CoutEncadre | undefined;
  /** Page outil voyants (livrable 8.1) : les lignes sont des exemples, l'encadré renvoie à la liste complète. */
  renvoi?: RenvoiEncadre | undefined;
}

/** Renvoi affiché sous la question de l'encadré : une phrase et un lien vers une ancre de la page. */
export interface RenvoiEncadre {
  texte: string;
  lien: string;
  ancre: string;
}

/**
 * Modèle de l'encadré d'une page : la question, ses lignes de situation résolues (base ou saisie), le coût résolu.
 * `pictogrammes` : dessin de chaque pictogramme de la base (nom → SVG) ; `voyants` : pictogramme de chaque voyant.
 */
export function modeleEncadre(entree: {
  question: string;
  lignes: readonly LigneResolue[];
  cout: CoutResolu;
  baseDeCalcul: string;
  couts: DonneesCouts;
  sources: ReadonlyMap<string, SourceDuRegistre>;
  voyants: ReadonlyMap<string, { pictogramme: string; couleur: string }>;
  pictogrammes: ReadonlyMap<string, string>;
  /** Voyants qui ont leur partie dans le tableau des notices de la page (tableau-notices.ts). */
  voyantsAuTableau?: ReadonlySet<string> | undefined;
}): ModeleEncadre {
  const lignes = entree.lignes.map((ligne): LigneEncadre => {
    const voyant = ligne.voyant !== undefined ? entree.voyants.get(ligne.voyant) : undefined;
    return {
      situation: ligne.situation,
      verdict: ligne.verdict,
      urgence: ligne.urgence,
      action: ligne.action,
      ecart: ligne.ecart_marques,
      ...sourcesDeLaLigne(ligne.sources, entree.sources),
      pictogramme: voyant !== undefined ? entree.pictogrammes.get(voyant.pictogramme) : undefined,
      couleur: voyant?.couleur,
      detailNotices: ligne.voyant !== undefined && entree.voyantsAuTableau?.has(ligne.voyant) === true ? ancreNotices(ligne.voyant) : undefined,
    };
  });
  const plage = libellePlage(entree.cout);
  const cout: CoutEncadre | undefined =
    plage === undefined
      ? undefined
      : {
          plage,
          risque: entree.cout.risque !== undefined ? libelleRisque(entree.cout.risque) : undefined,
          montants: entree.cout.montants.flatMap((id) => {
            const montant = entree.couts.montants.get(id);
            return montant === undefined ? [] : [{ texte: montant.texte, dates: datesAffichees(montant), consigne: montant.consigne?.texte }];
          }),
          prisesEnCharge: entree.cout.prisesEnCharge.flatMap((id) => {
            const prise = entree.couts.prises_en_charge.get(id);
            return prise === undefined ? [] : [prise.texte];
          }),
          baseDeCalcul: entree.baseDeCalcul,
        };
  return { question: entree.question, lignes, cout };
}

export const etiquette = (texte: string): string => `<span class="encadre-etiquette">${texteHtml(texte)}</span> `;

/**
 * Sources d'une ligne, telles que l'encadré les nomme : les notices de constructeurs (noms courts, ordre alphabétique)
 * et les autres sources qui peuvent fixer un verdict (texte officiel, Sécurité routière…). Une source secondaire ou le
 * règlement ONU n° 121 ne fondent jamais un verdict (docs/08 §3, règle 3) : ils ne sont nommés que dans « Sources ».
 */
export function sourcesDeLaLigne(ids: readonly string[], registre: ReadonlyMap<string, Pick<SourceDuRegistre, 'titre' | 'categorie'>>): { notices: string[]; autres: string[] } {
  const qualifiees = categoriesQuiFixentUnVerdict() as readonly string[];
  const sources = ids.flatMap((id) => {
    const source = registre.get(id);
    return source === undefined ? [] : [source];
  });
  const notices = sources.filter((s) => s.categorie === 'notice-constructeur');
  // Une ou deux notices : leur édition est nommée (charte §2.1 et §2.5, « selon la notice <modèle>, <édition> »).
  const nom = (s: Pick<SourceDuRegistre, 'titre' | 'categorie'>): string => {
    const edition = notices.length <= 2 ? /\(([^)]*)\)\s*$/.exec(s.titre)?.[1] : undefined;
    return edition !== undefined ? `${nomCourtSource(s)}, ${edition}` : nomCourtSource(s);
  };
  return {
    notices: notices.map(nom).sort((a, b) => a.localeCompare(b, 'fr')),
    autres: sources.filter((s) => s.categorie !== 'notice-constructeur' && qualifiees.includes(s.categorie)).map(nomCourtSource),
  };
}

/**
 * Phrase des sources d'une ligne (charte §2.1) : le nombre de notices, en lettres, et leurs noms ; puis, à part, les
 * autres sources de première main (« Autre source : … »).
 */
export function phraseSources(ligne: Pick<LigneEncadre, 'notices' | 'autres'> & { ecart?: string | undefined }): string {
  const phrases: string[] = [];
  const n = ligne.notices.length;
  // « une notice » (féminin) ; au-delà, le nombre en lettres (enLettres). Quand les notices divergent (écart),
  // la phrase rappelle que la consigne affichée est la plus prudente, pas celle de chaque notice nommée.
  const prudente = ligne.ecart !== undefined && n > 1 ? ' : la consigne la plus prudente est retenue' : '';
  if (n > 0) phrases.push(`D'après ${n === 1 ? 'une' : enLettres(n)} notice${n > 1 ? 's' : ''} de constructeur${n > 1 ? 's' : ''} (${enumerer(ligne.notices)})${prudente}.`);
  const a = ligne.autres.length;
  if (a > 0) phrases.push(`${n > 0 ? (a > 1 ? 'Autres sources' : 'Autre source') : a > 1 ? 'Sources' : 'Source'} : ${enumerer(ligne.autres)}.`);
  return phrases.join(' ');
}

function ligneEncadreHtml(ligne: LigneEncadre): string {
  const gravite = graviteDuVerdict(ligne.verdict);
  // Pictogramme dans la couleur du voyant fixée par la base (règle 6 de 03), sur un fond sombre comme au tableau de
  // bord : la couleur du verdict ne s'applique qu'à l'icône de gravité et au filet.
  const picto =
    ligne.pictogramme !== undefined ? `<span class="voyant" data-couleur="${attributHtml(ligne.couleur ?? 'neutre')}">${pictogrammeDecoratif(ligne.pictogramme)}</span>` : '';
  const sources = phraseSources(ligne);
  return [
    `<li class="encadre-ligne" data-encadre-ligne data-verdict="${attributHtml(ligne.verdict)}" data-urgence="${attributHtml(ligne.urgence)}" data-gravite="${gravite}" data-notices="${ligne.notices.length}">`,
    `<p class="encadre-situation">${picto}<span>${texteHtml(ligne.situation)}</span></p>`,
    `<p class="encadre-verdict">${iconeGravite(ligne.verdict)}<strong>${texteHtml(GRILLE_VERDICTS[ligne.verdict].libelle)}</strong></p>`,
    `<p class="encadre-urgence">${etiquette('Quand agir :')}${texteHtml(GRILLE_URGENCES[ligne.urgence].libelle)}</p>`,
    `<p class="encadre-action">${etiquette('Que faire :')}${texteHtml(ligne.action)}</p>`,
    ligne.ecart !== undefined ? `<p class="encadre-ecart">${etiquette('Selon les marques :')}${texteHtml(ligne.ecart)}</p>` : '',
    sources !== '' || ligne.detailNotices !== undefined
      ? `<p class="encadre-sources">${texteHtml(sources)}${ligne.detailNotices !== undefined ? `${sources !== '' ? ' ' : ''}<a href="#${attributHtml(ligne.detailNotices)}" data-lien-notices>${texteHtml(LIBELLE_LIEN_NOTICES)}</a>` : ''}</p>`
      : '',
    '</li>',
  ].join('');
}

function coutEncadreHtml(cout: CoutEncadre): string {
  return [
    '<div class="encadre-cout" data-encadre-cout>',
    `<p class="encadre-plage">${etiquette(LIBELLE_COUT_PROBABLE)}<strong>${texteHtml(cout.plage)}</strong></p>`,
    cout.risque !== undefined ? `<p class="encadre-risque">${texteHtml(cout.risque)}</p>` : '',
    // Demande de changement n° 39 : la consigne de sécurité du montant, sous lui, dans sa rangée (data-depannage).
    ...cout.montants.map((m) =>
      m.consigne !== undefined
        ? `<p class="encadre-montant" data-depannage>${texteHtml(m.texte)} <span class="encadre-date">(${texteHtml(m.dates.join(', '))})</span><span class="encadre-consigne" data-depannage-consigne>${texteHtml(m.consigne)}</span></p>`
        : `<p class="encadre-montant">${texteHtml(m.texte)} <span class="encadre-date">(${texteHtml(m.dates.join(', '))})</span></p>`,
    ),
    ...cout.prisesEnCharge.map((p) => `<p class="encadre-prise-en-charge">${texteHtml(p)}</p>`),
    `<p class="encadre-base">${etiquette('Base de calcul :')}${texteHtml(cout.baseDeCalcul)}</p>`,
    '</div>',
  ].join('');
}

/** Encadré de décision : la question, une ligne par situation dans l'ordre, puis le coût probable. */
export function encadreDecision(modele: ModeleEncadre): string {
  return [
    `<section class="encadre" data-encadre-decision aria-labelledby="${IDENTIFIANTS.decision}">`,
    `<h2 class="encadre-question" id="${IDENTIFIANTS.decision}">${texteHtml(modele.question)}</h2>`,
    modele.renvoi !== undefined
      ? `<p class="encadre-renvoi" data-encadre-renvoi>${texteHtml(modele.renvoi.texte)} <a href="#${attributHtml(modele.renvoi.ancre)}">${texteHtml(modele.renvoi.lien)}</a></p>`
      : '',
    // role="list" : une liste sans puces garde sa nature de liste pour VoiceOver (Safari).
    `<ul class="encadre-lignes" role="list">${modele.lignes.map(ligneEncadreHtml).join('')}</ul>`,
    modele.cout !== undefined ? coutEncadreHtml(modele.cout) : '',
    '</section>',
  ].join('');
}

// ---- Signature et ligne de transparence ------------------------------------------------------------

export const signaturePage = (dates: { modification: Date; revue: Date }): string =>
  `<p class="signature" data-signature>${texteHtml(signature(dates.modification, dates.revue))}</p>`;

/** Adresse de la section méthode : la page « à propos » du plan, à l'ancre de la méthode. */
export function adresseMethode(plan: ReadonlyMap<string, LigneDuPlan>): string {
  const page = plan.get(PAGE_METHODE);
  if (page === undefined) throw new Error(`la page « ${PAGE_METHODE} » (méthode) est absente du plan du site`);
  return `${page.adresse}#${ANCRE_METHODE}`;
}

export const ligneTransparence = (lienMethode: string): string =>
  `<p class="ligne-transparence" data-ligne-transparence>${texteHtml(LIGNE_TRANSPARENCE.texte)} <a href="${attributHtml(lienMethode)}">${texteHtml(LIGNE_TRANSPARENCE.libelleLien)}</a></p>`;

// ---- Causes et leur coût -----------------------------------------------------------------------------

/** Causes d'une page, dans l'ordre de saisie (ordre logique, R6), chacune avec sa tranche et, s'il y en a une, sa fourchette. */
export function causesAvecCout(causes: readonly { cause: string; explication: string; pieces: readonly string[] }[], couts: DonneesCouts): string {
  const elements = causes.map((c) => {
    const tranche = trancheDesPieces(c.pieces, couts.pieces);
    const fourchette = fourchetteAffichee(c.pieces, couts.pieces);
    const coutTexte =
      tranche === undefined
        ? ''
        : `<p class="cause-cout">${etiquette(LIBELLE_COUT_PROBABLE)}<strong>${texteHtml(GRILLE_COUTS[tranche].libelle)}</strong>${
            fourchette !== undefined
              ? texteHtml(` ; ${LIBELLE_ORDRE_DE_GRANDEUR} : ${LIBELLES_FOURCHETTES[fourchette.valeur]} (relevé le ${dateAffichee(fourchette.releve_le)})`)
              : ''
          }</p>`;
    return `<li class="cause"><h3>${texteHtml(c.cause)}</h3><p>${texteHtml(c.explication)}</p>${coutTexte}</li>`;
  });
  return `<section class="causes" data-causes aria-labelledby="${IDENTIFIANTS.causes}"><h2 id="${IDENTIFIANTS.causes}">${TITRE_CAUSES}</h2><ol>${elements.join('')}</ol></section>`;
}

// ---- Pages liées (plan du site) ---------------------------------------------------------------------

/**
 * Pages liées tirées du plan : les pages enfants d'une page mère, puis les autres pages liées (paires déclarées).
 * Seules les pages construites s'affichent (docs/08 §4, règle 1) ; la page mère est dans le fil d'Ariane.
 */
export function pagesLiees(entree: {
  id: string;
  plan: ReadonlyMap<string, LigneDuPlan>;
  voisins: ReadonlySet<string>;
  enfants: readonly string[];
  libelles: ReadonlyMap<string, string>;
}): string {
  const lien = (id: string): string => {
    const ligne = entree.plan.get(id);
    const libelle = entree.libelles.get(id);
    return ligne === undefined || libelle === undefined ? '' : `<li><a href="${attributHtml(ligne.adresse)}">${texteHtml(libelle)}</a></li>`;
  };
  const parent = entree.plan.get(entree.id)?.parent;
  const enfants = entree.enfants.map(lien).filter((l) => l !== '');
  const autres = [...entree.voisins].filter((id) => id !== parent && !entree.enfants.includes(id)).map(lien).filter((l) => l !== '');
  const blocs: string[] = [];
  if (enfants.length > 0) blocs.push(`<section class="pages-enfants" data-pages-enfants aria-labelledby="${IDENTIFIANTS.enfants}"><h2 id="${IDENTIFIANTS.enfants}">${TITRE_PAGES_ENFANTS}</h2><ul>${enfants.join('')}</ul></section>`);
  if (autres.length > 0) blocs.push(`<nav class="pages-liees" data-pages-liees aria-labelledby="${IDENTIFIANTS.liees}"><h2 id="${IDENTIFIANTS.liees}">${texteHtml(TITRE_PAGES_LIEES)}</h2><ul>${autres.join('')}</ul></nav>`);
  return blocs.join('');
}

// ---- Sources ------------------------------------------------------------------------------------------

/**
 * Section « Sources » : chaque source citée, avec son titre, son éditeur, les emplacements cités et sa date de
 * consultation. `note` : phrase affichée sous le titre (page outil voyants : les pages citées sont sous chaque ligne).
 */
export function sectionSources(citees: ReadonlyMap<string, readonly string[]>, registre: ReadonlyMap<string, SourceDuRegistre>, note?: string): string {
  const elements = elementsDesSources(citees, registre);
  return `<section class="sources" data-sources aria-labelledby="${IDENTIFIANTS.sources}"><h2 id="${IDENTIFIANTS.sources}">${TITRE_SOURCES}</h2>${note !== undefined ? `<p>${texteHtml(note)}</p>` : ''}<ol>${elements.join('')}</ol></section>`;
}

/** Une entrée de liste par source citée connue du registre : titre (lien), éditeur, emplacements cités, date de consultation. */
export function elementsDesSources(citees: ReadonlyMap<string, readonly string[]>, registre: ReadonlyMap<string, SourceDuRegistre>): string[] {
  return [...citees].flatMap(([id, emplacements]) => {
    const source = registre.get(id);
    if (source === undefined) return [];
    const ou = emplacements.length > 0 ? ` ${texteHtml(`Cité : ${emplacements.join(' ; ')}.`)}` : '';
    return [
      `<li data-source-id="${attributHtml(id)}"><a href="${attributHtml(source.url)}" rel="noopener">${texteHtml(source.titre)}</a>, ${texteHtml(source.editeur)}.${ou} ${texteHtml(`Consulté le ${dateAffichee(source.date_consultation)}.`)}</li>`,
    ];
  });
}

// ---- Section « Méthode » de la page « à propos » ------------------------------------------------------

export function sectionMethodeHtml(section: SectionMethode): string {
  const blocs = section.blocs.map((bloc) => {
    const morceaux = [`<h3>${texteHtml(bloc.titre)}</h3>`, ...bloc.paragraphes.map((p) => `<p>${texteHtml(p)}</p>`)];
    if (bloc.liste !== undefined) morceaux.push(`<ul>${bloc.liste.map((e) => `<li>${texteHtml(e)}</li>`).join('')}</ul>`);
    if (bloc.definitions !== undefined) {
      morceaux.push(
        `<table class="definitions"><thead><tr><th scope="col">Terme</th><th scope="col">${texteHtml('Ce que cela veut dire')}</th></tr></thead><tbody>${bloc.definitions
          .map((d) => `<tr><th scope="row">${texteHtml(d.terme)}</th><td>${texteHtml(d.sens)}</td></tr>`)
          .join('')}</tbody></table>`,
      );
    }
    return morceaux.join('');
  });
  return `<section class="methode" id="${attributHtml(section.ancre)}" data-methode><h2>${texteHtml(section.titre)}</h2><p>${texteHtml(section.introduction)}</p>${blocs.join('')}</section>`;
}

/** Échappement exporté pour les gabarits (titres, descriptions écrits dans le head). */
export { echapper };
