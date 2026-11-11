// Marque du site (premier lot, étape 9) : favicon et logo de l'en-tête, piste A « Cadran » choisie par Houssem le
// 11/11/2026 (un « d » dont la boucle est un cadran de tableau de bord, aiguille ambre). Un seul dessin, ci-dessous :
// le bandeau l'affiche en ligne (src/lib/gabarit.ts) et les fichiers de public/ en sont tirés par
// travaux/marque/generer-favicons.mjs (hors construction : il faut un navigateur). EMPREINTE_DESSIN_FAVICONS et
// EMPREINTES_FICHIERS_MARQUE sont les empreintes du dessin et des fichiers produits à cette génération : un dessin changé
// sans régénération, ou un fichier remplacé à la main, fait échouer les tests (tests/marque.test.ts). Seul le générateur
// les produit ensemble ; les recopier à la main sans régénérer reste possible (limite : règle de relecture).
//
// Règles de Google (Search Central, « Define a favicon to show in search results », page mise à jour le 27/10/2026,
// lue le 11/11/2026) : lien rel="icon" (ou apple-touch-icon) sur la page d'accueil ; un favicon par nom d'hôte ;
// image carrée d'au moins 8 × 8 px, plus grande que 48 × 48 px recommandé ; formats BMP, GIF, ICO, PNG, JPEG, PPM,
// TIFF (le SVG n'y figure plus : aucun lien n'en déclare) ; adresse stable ; accueil et fichier explorables.
// Règle du site (Houssem, 11/11/2026) : côté multiple de 48 px. Contrôles FAVICON-* (scripts/lib/favicon.ts).
// Module sans dépendance à l'exécution : tests et construction l'utilisent tel quel.

/** Dessin de la marque, carré de 48 unités, sans identifiant (il est répété sur chaque page). */
export const DESSIN_MARQUE =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="#0b5cad"/>' +
  '<path d="M14.5 33.5a12 12 0 1 1 17 0" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>' +
  '<path d="M35.5 9v24.5" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>' +
  '<path d="M23 25l6.5-7" stroke="#f5a623" stroke-width="3.6" stroke-linecap="round"/>' +
  '<circle cx="23" cy="25" r="3.2" fill="#f5a623"/></svg>';

/** Empreinte SHA-256 de DESSIN_MARQUE quand les fichiers de public/ en ont été tirés : recopiée à chaque régénération. */
export const EMPREINTE_DESSIN_FAVICONS = 'e02147fbf36b58e5e80c0a5dc1a845616cf5117ee3eadbe2c6add0cbac70e51c';
/** Empreinte SHA-256 de chaque fichier produit à cette génération : un fichier remplacé à la main fait échouer les tests. */
export const EMPREINTES_FICHIERS_MARQUE: Readonly<Record<string, string>> = {
  '/favicon.png': '22b0c1c0b6922875a468c47db7598b954b354687bedd3b0ebe531469e2bc0a9b',
  '/apple-touch-icon.png': '381f980672437b8bb1eef68f212393f29d510141bb9e38daac1f960cd1abee56',
  '/favicon.ico': '985c3e5f47ef8c3908dd2cf01b6c472467943cd019ac3ae2aa37723aa0f79ef9',
};

/** Fichiers servis, à adresse fixe (Google : « The favicon URL must be stable »). Ne jamais renommer. */
export const FAVICON = '/favicon.png';
export const ICONE_APPLE = '/apple-touch-icon.png';
/** Repli pour les clients qui demandent /favicon.ico d'eux-mêmes : servi, jamais déclaré dans les pages. */
export const FAVICON_ICO = '/favicon.ico';
/** Côté des PNG, en pixels : carré, multiple de 48 (règle du site), plus grand que 48 (recommandation de Google). */
export const COTE_FAVICON = 192;
/** Côtés des images du fichier ICO : multiples de 48. */
export const COTES_ICO = [48, 96] as const;

/** Liens de l'en-tête de chaque page (dont l'accueil, la seule que Google lit pour le favicon). */
export const liensFavicon = (): string =>
  `<link rel="icon" type="image/png" sizes="${COTE_FAVICON}x${COTE_FAVICON}" href="${FAVICON}">` +
  `<link rel="apple-touch-icon" sizes="${COTE_FAVICON}x${COTE_FAVICON}" href="${ICONE_APPLE}">`;

/** Dessin de la marque dans le bandeau : décoratif (le nom du site est écrit à côté), taille fixée (aucun décalage). */
export const logoEnLigne = (cote = 28): string =>
  DESSIN_MARQUE.replace('<svg ', `<svg width="${cote}" height="${cote}" aria-hidden="true" focusable="false" class="logo" `);

/** Largeur et hauteur d'une image PNG (en-tête IHDR), ou undefined si ce n'est pas un PNG. */
export function dimensionsPng(octets: Uint8Array): { largeur: number; hauteur: number } | undefined {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (octets.length < 24 || signature.some((o, i) => octets[i] !== o)) return undefined;
  const vue = new DataView(octets.buffer, octets.byteOffset, octets.byteLength);
  if (String.fromCharCode(...octets.subarray(12, 16)) !== 'IHDR') return undefined;
  return { largeur: vue.getUint32(16), hauteur: vue.getUint32(20) };
}

/** Images d'un fichier ICO (largeur, hauteur annoncées par le répertoire), ou undefined si ce n'est pas un ICO. */
export function imagesIco(octets: Uint8Array): { largeur: number; hauteur: number }[] | undefined {
  if (octets.length < 6) return undefined;
  const vue = new DataView(octets.buffer, octets.byteOffset, octets.byteLength);
  if (vue.getUint16(0, true) !== 0 || vue.getUint16(2, true) !== 1) return undefined;
  const nombre = vue.getUint16(4, true);
  if (nombre === 0 || octets.length < 6 + 16 * nombre) return undefined;
  return Array.from({ length: nombre }, (_, i) => {
    const l = octets[6 + 16 * i] ?? 0;
    const h = octets[7 + 16 * i] ?? 0;
    return { largeur: l === 0 ? 256 : l, hauteur: h === 0 ? 256 : h };
  });
}

export const carreMultipleDe48 = (d: { largeur: number; hauteur: number }): boolean => d.largeur === d.hauteur && d.largeur >= 48 && d.largeur % 48 === 0;

/** Valeur des attributs rel et href des liens d'icône d'une page HTML (rel en minuscules). */
export function liensIcone(html: string): { rel: string; href: string | undefined }[] {
  return [...html.matchAll(/<link\b[^>]*>/gi)].flatMap((m) => {
    const balise = m[0];
    const rel = /\srel\s*=\s*"([^"]*)"/i.exec(balise)?.[1]?.trim().toLowerCase().replace(/\s+/g, ' ');
    if (rel === undefined || !['icon', 'shortcut icon', 'apple-touch-icon', 'apple-touch-icon-precomposed'].includes(rel)) return [];
    return [{ rel, href: /\shref\s*=\s*"([^"]*)"/i.exec(balise)?.[1] }];
  });
}
