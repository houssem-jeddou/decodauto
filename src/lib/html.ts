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
const UNITES = ['bar', 'km/h', 'km', '°C', '€', '%', 'litres', 'litre', 'l', 'mm', 'cm', 'kg', 't', 'h', 'min', 'ans', 'an', 'mois', 'jours', 'jour', 'semaines', 'semaine'];
// L'unité n'est suivie ni d'une lettre ni d'un chiffre ni d'une apostrophe (« 208 l’a » : « l » n'est pas le litre).
const NOMBRE_UNITE = new RegExp(`(\\d) (?=(?:${UNITES.map((u) => u.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}\\d’']))`, 'gu');

/**
 * Typographie française du texte affiché (charte §3.3), quelle que soit la saisie :
 *  - apostrophe typographique (’) à la place de l'apostrophe droite ;
 *  - guillemets français « … » à la place des guillemets droits "…" ou anglais “…” ;
 *  - espace insécable avant « : ; ! ? » (une espace ordinaire saisie devient insécable ; rien n'est ajouté s'il n'y
 *    en avait pas, pour ne pas toucher une adresse ou une heure) ;
 *  - espace insécable à l'intérieur des guillemets « … » (ajoutée si elle manque) ;
 *  - espace insécable entre un nombre et son unité (2,5 bar, 135 €) et dans les milliers (1 000).
 */
export function typographier(texte: string): string {
  return texte
    .replace(/"([^"]*)"/g, '«$1»')
    .replace(/“([^”]*)”/g, '«$1»')
    .replace(/'/g, '’')
    .replace(/[ \t]+([:;!?])/g, `${INSECABLE}$1`)
    .replace(/«[ \t ]*/g, `«${INSECABLE}`)
    .replace(/[ \t ]*»/g, `${INSECABLE}»`)
    .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${INSECABLE}`)
    .replace(NOMBRE_UNITE, `$1${INSECABLE}`);
}

/** Texte affiché : typographié puis échappé. */
export const texteHtml = (texte: string): string => echapper(typographier(texte));

/** Valeur d'attribut : échappée, sans typographie (identifiants, adresses, niveaux de la grille). */
export const attributHtml = (valeur: string): string => echapper(valeur);

/** Éléments dont le texte n'est jamais retouché : code, préformaté, scripts, styles, saisie, dessins. */
const SANS_TYPOGRAPHIE = /^(code|pre|kbd|samp|script|style|textarea|svg|math)$/i;

/**
 * Typographie d'un fragment HTML déjà produit (le corps d'une page rendu depuis son Markdown) : `typographier` est
 * appliqué à chaque texte entre deux balises, sauf dans le code, les scripts, les styles et les dessins. Les entités
 * d'apostrophe et de guillemet sont lues comme les caractères qu'elles représentent. Les modèles de pages (6.6)
 * l'appliquent au corps ; les composants, eux, typographient leurs textes avant de les échapper.
 */
export function typographierHtml(html: string): string {
  const morceaux = html.split(/(<[^>]*>)/);
  const ouverts: string[] = [];
  return morceaux
    .map((morceau) => {
      const balise = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/.exec(morceau);
      if (balise !== null) {
        const nom = (balise[2] ?? '').toLowerCase();
        if (SANS_TYPOGRAPHIE.test(nom) && !morceau.endsWith('/>')) {
          if (balise[1] === '/') {
            const i = ouverts.lastIndexOf(nom);
            if (i >= 0) ouverts.splice(i, 1);
          } else ouverts.push(nom);
        }
        return morceau;
      }
      if (morceau.startsWith('<') || ouverts.length > 0 || morceau === '') return morceau;
      const lu = morceau.replace(/&#39;|&#x27;|&apos;/gi, "'").replace(/&quot;|&#34;|&#x22;/gi, '"').replace(/&nbsp;|&#160;|&#xa0;/gi, INSECABLE);
      return typographier(lu).replace(/"/g, '&quot;');
    })
    .join('');
}
