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
const NOMBRE_UNITE = new RegExp(`(\\d) (?=(?:${UNITES.map((u) => u.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}\\d]))`, 'gu');

/**
 * Typographie française du texte affiché (charte §3.3), quelle que soit la saisie :
 *  - apostrophe typographique (’) à la place de l'apostrophe droite ;
 *  - espace insécable avant « : ; ! ? » (une espace ordinaire saisie devient insécable ; rien n'est ajouté s'il n'y
 *    en avait pas, pour ne pas toucher une adresse ou une heure) ;
 *  - espace insécable à l'intérieur des guillemets « … » (ajoutée si elle manque) ;
 *  - espace insécable entre un nombre et son unité (2,5 bar, 135 €) et dans les milliers (1 000).
 */
export function typographier(texte: string): string {
  return texte
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
