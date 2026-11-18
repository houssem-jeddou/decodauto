import configDuDepot from '../../config/adsense.json' with { type: 'json' };

// Google AdSense, demande de changement n° 38 (acceptée le 18/11/2026), temps 1 : la demande AdSense se fait par la balise
// meta « google-adsense-account » et le fichier ads.txt, générés depuis config/adsense.json, la seule source de vérité.
// Ni script, ni cadre, ni cookie : la politique de confidentialité reste vraie. L'affichage de la publicité (temps 2) passe
// par son propre lot et la décision de Houssem : tant qu'il n'est pas appliqué, « annonces » ne peut pas valoir true.
// Fonctions pures, sans dépendance : le gabarit, l'intégration de construction, les contrôles et les tests les partagent.

export const FICHIER_CONFIG_ADSENSE = 'config/adsense.json';
/** Adresse du fichier ads.txt, à la racine du site (aide AdSense 12171612). */
export const ADRESSE_ADS_TXT = '/ads.txt';
/** Identifiant de Google dans le registre de certification de l'IAB, imposé par la ligne AdSense d'ads.txt. */
export const IDENTIFIANT_CERTIFICATION_GOOGLE = 'f08c47fec0942fa0';
/** Nom de la balise meta d'association du site (méthode « balise meta » d'AdSense, aide 7584263). */
export const NOM_BALISE_ADSENSE = 'google-adsense-account';
/** Identifiant d'éditeur : « ca-pub- » suivi de 16 chiffres. */
export const MOTIF_CLIENT = /^ca-pub-\d{16}$/;
/** Identifiant d'un bloc d'annonces (rempli au temps 2) : des chiffres seulement. */
export const MOTIF_BLOC = /^\d{1,20}$/;

export interface ConfigAdsense {
  /** null tant que Houssem n'a pas de compte AdSense : ni balise, ni ads.txt. */
  client: string | null;
  bloc: string | null;
  annonces: boolean;
}

/** Écarts de la configuration à son schéma (contrôle ADSENSE-CONFIG). Liste vide : configuration valide. */
export function erreursConfigAdsense(brut: unknown): string[] {
  if (typeof brut !== 'object' || brut === null || Array.isArray(brut)) return ['la configuration doit être un objet { "client", "bloc", "annonces" }'];
  const o = brut as Record<string, unknown>;
  const erreurs: string[] = [];
  const cles = Object.keys(o);
  if ([...cles].sort().join(',') !== 'annonces,bloc,client') erreurs.push(`clés attendues : exactement « client », « bloc » et « annonces » (trouvées : ${cles.join(', ') || 'aucune'})`);
  const client = o['client'];
  const bloc = o['bloc'];
  const annonces = o['annonces'];
  if (client !== null && !(typeof client === 'string' && MOTIF_CLIENT.test(client))) erreurs.push('« client » : null (pas encore de compte AdSense) ou « ca-pub- » suivi de 16 chiffres');
  if (bloc !== null && !(typeof bloc === 'string' && MOTIF_BLOC.test(bloc))) erreurs.push("« bloc » : null ou l'identifiant numérique du bloc d'annonces");
  if (bloc !== null && client === null) erreurs.push('« bloc » renseigné sans « client »');
  if (typeof annonces !== 'boolean') erreurs.push('« annonces » : true ou false');
  else if (annonces) {
    erreurs.push("« annonces » vaut true : l'affichage de la publicité (temps 2 de la demande n° 38) n'est pas appliqué ; il passe par son lot, sa porte et la décision de Houssem");
  }
  return erreurs;
}

/** Configuration validée ; lève une erreur lisible sinon (la construction échoue). */
export function configAdsense(brut: unknown = configDuDepot): ConfigAdsense {
  const erreurs = erreursConfigAdsense(brut);
  if (erreurs.length > 0) throw new Error(`${FICHIER_CONFIG_ADSENSE} : ${erreurs.join(' ; ')}`);
  const o = brut as { client: string | null; bloc: string | null; annonces: boolean };
  return { client: o.client, bloc: o.bloc, annonces: o.annonces };
}

/** Balise meta d'association, une fois dans l'en-tête de chaque page ; chaîne vide sans identifiant d'éditeur. */
export function baliseAdsense(config: ConfigAdsense): string {
  return config.client === null ? '' : `<meta name="${NOM_BALISE_ADSENSE}" content="${config.client}">`;
}

/** Ligne AdSense d'ads.txt (aide AdSense 12171612) ; undefined sans identifiant d'éditeur (pas de fichier). */
export function ligneAdsTxt(config: ConfigAdsense): string | undefined {
  return config.client === null ? undefined : `google.com, ${config.client.replace(/^ca-/, '')}, DIRECT, ${IDENTIFIANT_CERTIFICATION_GOOGLE}`;
}

/** Contenu exact du fichier ads.txt généré. */
export function contenuAdsTxt(config: ConfigAdsense): string | undefined {
  const ligne = ligneAdsTxt(config);
  return ligne === undefined ? undefined : `${ligne}\n`;
}

/** Valeur (attribut content) de chaque balise meta « google-adsense-account » d'une page, dans l'ordre. */
export function contenusBaliseAdsense(html: string): string[] {
  const balises = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).filter((b) => new RegExp(`\\bname\\s*=\\s*["']?${NOM_BALISE_ADSENSE}["'\\s>/]`, 'i').test(b));
  return balises.map((b) => /\bcontent\s*=\s*["']([^"']*)["']/i.exec(b)?.[1] ?? '');
}

/** Script, bloc ou message de consentement de Google dans une page (contrôle ADSENSE-ANNONCES). */
export function marquesDePublicite(html: string): string[] {
  const trouvees: string[] = [];
  for (const m of html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']?([^"'\s>]+)/gi)) {
    const src = m[1] ?? '';
    if (/googlesyndication|adsbygoogle|fundingchoicesmessages|doubleclick/i.test(src)) trouvees.push(`script ${src}`);
  }
  if (/\bclass\s*=\s*["'][^"']*\badsbygoogle\b/i.test(html)) trouvees.push('bloc adsbygoogle');
  if (/adsbygoogle\s*=\s*window\.adsbygoogle/i.test(html)) trouvees.push('appel adsbygoogle.push');
  return trouvees;
}
