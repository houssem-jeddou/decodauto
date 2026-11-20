// ---------------------------------------------------------------------------------------------
// Outils HTML des composants communs (étape 6, livrable 6.3) : échappement et typographie française.
// Les composants (src/lib/composants.ts) produisent leur HTML avec ces fonctions : tout texte passe par
// `texteHtml` (typographie, puis échappement), toute valeur d'attribut par `attributHtml`.
// Module sans dépendance à l'exécution : testé sans installation (tests/composants.test.ts).
// ---------------------------------------------------------------------------------------------

/** Espace insécable (U+00A0), posée par le gabarit (charte §3.3). */
export const INSECABLE = ' ';

const ENTITES: Readonly<Record<string, string>> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Échappe un texte ou une valeur d'attribut : & < > " '. */
export const echapper = (texte: string): string => texte.replace(/[&<>"']/g, (c) => ENTITES[c] ?? c);

/** Unités qui suivent un nombre (espace insécable entre les deux, charte §3.3). */
// Unités écrites en toutes lettres ajoutées le 20/11/2026 (« 30 minutes » se coupait à 375 px, revue de la PR #84).
const UNITES = ['bar', 'km/h', 'km', '°C', '€', '%', 'litres', 'litre', 'l', 'mm', 'cm', 'kg', 't', 'h', 'min', 'ans', 'an', 'mois', 'jours', 'jour', 'semaines', 'semaine', 'heures', 'heure', 'minutes', 'minute', 'secondes', 'seconde', 'tours', 'V', 'volts', 'volt', 'Ah', 'A', 'kW', 'W'];
// L'unité n'est suivie ni d'une lettre ni d'un chiffre ni d'une apostrophe (« 208 l’a » : « l » n'est pas le litre).
const NOMBRE_UNITE = new RegExp(`(\\d) (?=(?:${UNITES.map((u) => u.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}\\d’']))`, 'gu');

/**
 * Guillemets droits ou anglais d'un texte : « ouvrant, puis » fermant, en alternance (l'état se poursuit d'un morceau
 * de texte au suivant, pour des guillemets autour d'un mot en gras ou d'un lien). Un guillemet droit collé à un
 * chiffre est la marque des pouces (15") : il devient le double prime ″, pas un guillemet.
 */
export function guillemetsFrancais(texte: string, etat: { ouvert: boolean } = { ouvert: false }): string {
  return texte.replace(/(\d)"|["“”]/g, (trouve, chiffre: string | undefined) => {
    if (chiffre !== undefined) return `${chiffre}″`;
    const ouvrant = trouve === '“' ? true : trouve === '”' ? false : !etat.ouvert;
    etat.ouvert = ouvrant;
    return ouvrant ? '«' : '»';
  });
}

/**
 * Typographie française du texte affiché (charte §3.3), quelle que soit la saisie :
 *  - guillemets français « … » à la place des guillemets droits "…" ou anglais “…” ;
 *  - apostrophe typographique (’) à la place de l'apostrophe droite ;
 *  - espace insécable avant « : ; ! ? » : l'espace saisie (ou le saut de ligne) devient insécable ; s'il n'y en avait
 *    pas, une insécable est ajoutée entre une lettre et la ponctuation suivie d'une espace ou de la fin du texte
 *    (« Attention: » ; une adresse ou une heure ne sont pas touchées) ;
 *  - espace insécable à l'intérieur des guillemets « … » (ajoutée si elle manque) ;
 *  - espace insécable entre un nombre et son unité (2,5 bar, 135 €) et dans les milliers (1 000).
 */
export function typographier(texte: string, etat?: { ouvert: boolean }): string {
  return guillemetsFrancais(texte, etat)
    .replace(/'/g, '’')
    .replace(/\s+([:;!?])/g, `${INSECABLE}$1`)
    .replace(/(\p{L})([:;!?])(?=\s|$)/gu, `$1${INSECABLE}$2`)
    .replace(/«\s*/g, `«${INSECABLE}`)
    .replace(/\s*»/g, `${INSECABLE}»`)
    .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${INSECABLE}`)
    .replace(NOMBRE_UNITE, `$1${INSECABLE}`);
}

/** Texte affiché : typographié puis échappé. */
export const texteHtml = (texte: string): string => echapper(typographier(texte));

/** Valeur d'attribut : échappée, sans typographie (identifiants, adresses, niveaux de la grille). */
export const attributHtml = (valeur: string): string => echapper(valeur);

/**
 * Texte d'un fragment HTML (déjà échappé) ramené au texte brut : entités nommées courantes et numériques décodées, pour
 * le repasser par attributHtml sans double échappement (« Pièces &amp;amp; main-d’œuvre », revue de F1.3c).
 */
export function decoderEntites(html: string): string {
  const nommees: Readonly<Record<string, string>> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' };
  return html.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (tout, nom: string) => {
    if (nom.startsWith('#x') || nom.startsWith('#X')) return String.fromCodePoint(Number.parseInt(nom.slice(2), 16));
    if (nom.startsWith('#')) return String.fromCodePoint(Number(nom.slice(1)));
    return nommees[nom.toLowerCase()] ?? tout;
  });
}

/** Éléments dont le texte n'est jamais retouché : code, préformaté, scripts, styles, saisie, dessins. Repris par TYPO-*. */
export const ELEMENTS_SANS_TYPOGRAPHIE = ['code', 'pre', 'kbd', 'samp', 'script', 'style', 'textarea', 'template', 'svg', 'math'] as const;
const SANS_TYPOGRAPHIE = new RegExp(`^(?:${ELEMENTS_SANS_TYPOGRAPHIE.join('|')})$`, 'i');

/**
 * Entité HTML restée dans un texte (« &amp; », « &lt; », « &#8239; ») : protégée pendant la typographie, sinon la règle
 * « espace insécable avant ; » la couperait (« &amp ; », affiché « & ; »). Chacune est remplacée par un caractère du
 * plan d'usage privé supplémentaire A (ni lettre, ni chiffre, ni espace ; 65 534 places), puis rétablie ; un caractère
 * de ce plan déjà présent dans le texte est protégé de la même façon, pour être rétabli à l'identique.
 */
const ENTITE = /&(?:#\d+|#x[0-9a-f]+|[a-z][a-z0-9]*);|[\u{F0000}-\u{FFFFD}]/giu;
const PROTEGE = /[\u{F0000}-\u{FFFFD}]/gu;
const PROTECTION = 0xf0000;

/**
 * Découpe d'un fragment HTML en jetons : commentaires, éléments à contenu brut (script, style, textarea) en entier,
 * balises (dont les attributs entre guillemets peuvent contenir « > »), et textes entre deux balises.
 */
const JETONS = /(<!--[\s\S]*?-->|<(script|style|textarea)\b(?:[^>"']|"[^"]*"|'[^']*')*>[\s\S]*?<\/\2\s*>|<\/?[a-zA-Z](?:[^>"']|"[^"]*"|'[^']*')*>)/;

/**
 * Typographie d'un fragment HTML déjà produit (le corps d'une page rendu depuis son Markdown) : `typographier` est
 * appliqué à chaque texte entre deux balises, sauf dans le code, les scripts, les styles et les dessins ; les balises et
 * leurs attributs ne sont jamais retouchés. Les entités d'apostrophe et de guillemet sont lues comme les caractères
 * qu'elles représentent. Les modèles de pages (6.6) l'appliquent au corps ; les composants, eux, typographient leurs
 * textes avant de les échapper.
 */
export function typographierHtml(html: string): string {
  const ouverts: string[] = [];
  const guillemets = { ouvert: false };
  const morceaux: string[] = [];
  const decoupe = html.split(JETONS);
  // split avec deux groupes capturants : [texte, jeton, nom d'élément brut, texte, jeton, nom, …]
  for (let i = 0; i < decoupe.length; i += 3) {
    const texte = decoupe[i] ?? '';
    if (texte !== '') {
      if (ouverts.length > 0) morceaux.push(texte);
      else {
        const lu = texte
          .replace(/&#39;|&#x27;|&apos;|&rsquo;/gi, "'")
          .replace(/&quot;|&#34;|&#x22;/gi, '"')
          .replace(/&ldquo;/gi, '“')
          .replace(/&rdquo;/gi, '”')
          .replace(/&nbsp;|&#160;|&#xa0;/gi, INSECABLE);
        const entites: string[] = [];
        const protege = lu.replace(ENTITE, (entite) => String.fromCodePoint(PROTECTION + entites.push(entite) - 1));
        const typographie = typographier(protege, guillemets).replace(/"/g, '&quot;');
        morceaux.push(typographie.replace(PROTEGE, (c) => entites[(c.codePointAt(0) ?? 0) - PROTECTION] ?? c));
      }
    }
    const jeton = decoupe[i + 1];
    if (jeton === undefined) continue;
    const balise = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/.exec(jeton);
    if (balise !== null && decoupe[i + 2] === undefined) {
      const nom = (balise[2] ?? '').toLowerCase();
      if (SANS_TYPOGRAPHIE.test(nom) && !jeton.endsWith('/>')) {
        if (balise[1] === '/') {
          const j = ouverts.lastIndexOf(nom);
          if (j >= 0) ouverts.splice(j, 1);
        } else ouverts.push(nom);
      }
    }
    morceaux.push(jeton);
  }
  return morceaux.join('');
}
