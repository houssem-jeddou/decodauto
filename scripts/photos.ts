// Photos sous licence libre (lot U4 de l'audit UX/UI, demande de changement n° 42 ; registre data/photos.json, schéma
// src/schemas/photos.ts, rendu src/lib/photos.ts). Ce script est la seule façon de produire les fichiers servis :
//   node scripts/photos.ts --verifier     relit, par l'API de Wikimedia Commons (imageinfo, extmetadata), l'auteur, la licence,
//                                         l'adresse de la licence, l'empreinte SHA-1, les dimensions et les adresses de chaque
//                                         photo du registre ; s'arrête sur le premier écart (rien n'est téléchargé) ;
//   node scripts/photos.ts --telecharger  vérifie (comme --verifier), puis télécharge chaque original absent dans .cache/photos/
//                                         (jamais versionné), contrôlé par son empreinte SHA-1 ; une requête par fichier, 10 s
//                                         d'écart ; sur une réponse 429, attend ce que dit Retry-After (10 s au moins), fait un
//                                         seul nouvel essai, et arrête la série si la 429 persiste (dépôt manuel alors) ;
//   node scripts/photos.ts                produit, depuis les originaux téléchargés : recadrage du registre (3:2), floutage
//                                         éventuel, WebP en 480, 800 et 1 200 px de large, sans métadonnées (ni EXIF, ni XMP,
//                                         ni profil ICC), dans src/photos/ ; réécrit src/photos/empreintes.json ;
//   node scripts/photos.ts --apercus <dossier>  écrit, pour le paquet, l'original réduit (1 000 px) avec la zone gardée (et
//                                         floutée) tracée, et le recadrage réduit à la même largeur, sans métadonnées.
// Les requêtes vers Commons portent l'en-tête User-Agent que demande la politique de Wikimedia (nom du client, adresse du
// site et adresse de contact publiée sur le site : ADRESSE_SIGNALEMENT), décision de Houssem du 25/11/2026.
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp, { type Sharp } from 'sharp';
import { FICHIER_EMPREINTES_PHOTOS, LARGEURS_PHOTOS, SOURCE_PHOTOS, hauteurPhoto, nomFichierPhoto, registrePhotos } from '../src/lib/photos.ts';
import type { Photo } from '../src/schemas/photos.ts';
import { ADRESSE_SIGNALEMENT, URL_SITE } from '../src/lib/site.ts';
import { problemesFichierPhoto } from './lib/photos.ts';

const RACINE = process.cwd();
/** Originaux téléchargés (jamais versionnés : .gitignore). */
export const CACHE_ORIGINAUX = '.cache/photos';
/** User-Agent conforme à la politique de Wikimedia : « decodauto-photos/1.0 (https://decodauto.com/a-propos/; erreur@decodauto.com) ». */
export const CLIENT = `decodauto-photos/1.0 (${URL_SITE}/a-propos/; ${ADRESSE_SIGNALEMENT})`;
/** Écart entre deux requêtes vers Commons, et attente minimale avant le nouvel essai d'une réponse 429. */
const ECART_MS = 10_000;
/** Attente au-delà de laquelle on ne patiente pas : la série s'arrête (Retry-After respecté, aucun essai plus tôt). */
const ATTENTE_MAX_MS = 600_000;
const API = 'https://commons.wikimedia.org/w/api.php';
/** Réglages de l'encodage WebP (entrent dans l'empreinte de la source). */
const WEBP = { quality: 80, effort: 6, smartSubsample: true } as const;
/** Flou des zones floutées (écart type, en pixels de l'original). */
const FLOU = 40;

const sha = (algo: 'sha1' | 'sha256', donnees: Buffer | string): string => createHash(algo).update(donnees).digest('hex');
const attendre = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
const sansBalises = (html: string): string => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const titreDuFichier = (p: Photo): string => decodeURIComponent(p.page_commons.slice(p.page_commons.indexOf('/wiki/') + 6)).replace(/_/g, ' ');

/** Empreinte de la source d'une photo : original, recadrage, floutage, largeurs, réglages et texte de ce script. */
export async function empreinteSource(p: Photo, texteDuScript: string): Promise<string> {
  return sha('sha256', JSON.stringify({ sha1: p.sha1, recadrage: p.recadrage, floutage: p.floutage ?? [], largeurs: LARGEURS_PHOTOS, webp: WEBP, flou: FLOU, script: sha('sha256', texteDuScript) }));
}

/** Réponse 429 qui persiste après le nouvel essai : la série s'arrête (dépôt manuel dans .cache/photos/). */
class LimiteDeDebit extends Error {}

/** Délai demandé par Retry-After (secondes ou date HTTP), en millisecondes ; undefined s'il manque ou ne se lit pas. */
export function delaiRetryAfter(valeur: string | null, maintenant = Date.now()): number | undefined {
  if (valeur === null || valeur.trim() === '') return undefined;
  if (/^\d+$/.test(valeur.trim())) return Number(valeur.trim()) * 1000;
  const date = Date.parse(valeur);
  return Number.isNaN(date) ? undefined : Math.max(0, date - maintenant);
}

/** Une requête ; sur une réponse 429, un seul nouvel essai après Retry-After (10 s au moins) ; 429 encore : arrêt. */
async function obtenir(url: string): Promise<Response> {
  const premiere = await fetch(url, { headers: { 'user-agent': CLIENT } });
  if (premiere.status !== 429) return premiere;
  await premiere.arrayBuffer();
  const retryAfter = premiere.headers.get('retry-after');
  const delai = Math.max(delaiRetryAfter(retryAfter) ?? 0, ECART_MS);
  if (delai > ATTENTE_MAX_MS) throw new LimiteDeDebit(`429 sur ${url} : Retry-After « ${String(retryAfter)} » (${Math.round(delai / 1000)} s), série arrêtée sans nouvel essai`);
  console.log(`  429 (Retry-After : ${retryAfter ?? 'absent'}) : un seul nouvel essai dans ${Math.round(delai / 1000)} s`);
  await attendre(delai);
  const seconde = await fetch(url, { headers: { 'user-agent': CLIENT } });
  if (seconde.status === 429) {
    await seconde.arrayBuffer();
    throw new LimiteDeDebit(`429 persistante sur ${url} après un nouvel essai (Retry-After : ${seconde.headers.get('retry-after') ?? 'absent'}), série arrêtée`);
  }
  return seconde;
}

interface InfoCommons {
  titre: string;
  url: string;
  descriptionurl: string;
  sha1: string;
  width: number;
  height: number;
  auteur: string;
  licence: string;
  urlLicence: string;
}

/** Ce que Commons dit de chaque fichier (une requête pour tout le registre). */
async function infosCommons(photos: readonly Photo[]): Promise<Map<string, InfoCommons>> {
  const params = new URLSearchParams({ action: 'query', titles: photos.map(titreDuFichier).join('|'), prop: 'imageinfo', iiprop: 'url|size|sha1|extmetadata', format: 'json', formatversion: '2' });
  const reponse = await obtenir(`${API}?${params.toString()}`);
  if (!reponse.ok) throw new Error(`API de Commons : réponse ${reponse.status}`);
  const corps = (await reponse.json()) as { query?: { normalized?: { from: string; to: string }[]; pages?: { title: string; missing?: boolean; imageinfo?: Record<string, unknown>[] }[] } };
  const infos = new Map<string, InfoCommons>();
  for (const page of corps.query?.pages ?? []) {
    const ii = page.imageinfo?.[0];
    if (ii === undefined) continue;
    const meta = (ii['extmetadata'] ?? {}) as Record<string, { value?: string } | undefined>;
    infos.set(page.title, {
      titre: page.title,
      url: String(ii['url']).split('?')[0] ?? '',
      descriptionurl: String(ii['descriptionurl']),
      sha1: String(ii['sha1']),
      width: Number(ii['width']),
      height: Number(ii['height']),
      auteur: sansBalises(meta['Artist']?.value ?? ''),
      licence: sansBalises(meta['LicenseShortName']?.value ?? ''),
      urlLicence: sansBalises(meta['LicenseUrl']?.value ?? ''),
    });
  }
  return infos;
}

/** Écarts entre le registre et Commons, photo par photo. */
export async function verifier(photos: readonly Photo[]): Promise<string[]> {
  const infos = await infosCommons(photos);
  const ecarts: string[] = [];
  for (const p of photos) {
    const titre = titreDuFichier(p);
    const i = infos.get(titre);
    if (i === undefined) {
      ecarts.push(`${p.id} : ${titre} introuvable sur Commons`);
      continue;
    }
    const comparer = (champ: string, registre: unknown, commons: unknown): void => {
      if (registre !== commons) ecarts.push(`${p.id} : ${champ} « ${String(registre)} » au registre, « ${String(commons)} » sur Commons`);
    };
    comparer('auteur', p.auteur, i.auteur);
    comparer('licence', p.licence, i.licence);
    comparer('adresse de la licence', p.url_licence, i.urlLicence);
    comparer('sha1', p.sha1, i.sha1);
    comparer('largeur', p.largeur_originale, i.width);
    comparer('hauteur', p.hauteur_originale, i.height);
    comparer('original', decodeURIComponent(p.fichier_commons), decodeURIComponent(i.url));
    comparer('page', decodeURIComponent(p.page_commons), decodeURIComponent(i.descriptionurl));
    console.log(`${ecarts.some((e) => e.startsWith(`${p.id} :`)) ? 'ÉCART' : 'conforme'} : ${p.id} (${i.auteur}, ${i.licence}, ${i.urlLicence})`);
  }
  return ecarts;
}

const cheminOriginal = (p: Photo): string => join(RACINE, CACHE_ORIGINAUX, `${p.id}.original`);

async function originalVerifie(p: Photo): Promise<Buffer | undefined> {
  try {
    const octets = await readFile(cheminOriginal(p));
    return sha('sha1', octets) === p.sha1 ? octets : undefined;
  } catch {
    return undefined;
  }
}

async function telecharger(photos: readonly Photo[]): Promise<string[]> {
  await mkdir(join(RACINE, CACHE_ORIGINAUX), { recursive: true });
  const manquants: string[] = [];
  for (const p of photos) {
    if ((await originalVerifie(p)) !== undefined) {
      console.log(`déjà là : ${p.id}`);
      continue;
    }
    await attendre(ECART_MS);
    const reponse = await obtenir(p.fichier_commons);
    const octets = Buffer.from(await reponse.arrayBuffer());
    if (!reponse.ok || sha('sha1', octets) !== p.sha1) {
      manquants.push(`${p.id} : réponse ${reponse.status}, ${octets.length} octets, empreinte ${sha('sha1', octets)} (attendue ${p.sha1})`);
      continue;
    }
    await writeFile(cheminOriginal(p), octets);
    console.log(`téléchargé : ${p.id} (${octets.length} octets, SHA-1 conforme)`);
  }
  return manquants;
}

/** Image recadrée (et floutée) à pleine résolution, en pixels bruts sans perte. */
async function recadree(p: Photo, original: Buffer): Promise<Sharp> {
  const r = p.recadrage;
  return sharp(await sharp(await avecFlou(p, original)).extract({ left: r.x, top: r.y, width: r.largeur, height: r.hauteur }).png().toBuffer());
}

/** Original orienté, zones du registre floutées, en pixels bruts sans perte (PNG). */
async function avecFlou(p: Photo, original: Buffer): Promise<Buffer> {
  // Orientation appliquée d'abord (les zones du registre sont en pixels de l'original orienté), sans perte (PNG).
  let base = await sharp(original).rotate().png().toBuffer();
  const lue = await sharp(base).metadata();
  if (lue.width !== p.largeur_originale || lue.height !== p.hauteur_originale) throw new Error(`${p.id} : original de ${lue.width} × ${lue.height} px, ${p.largeur_originale} × ${p.hauteur_originale} attendus`);
  const zones = p.floutage ?? [];
  if (zones.length > 0) {
    const calques = await Promise.all(
      zones.map(async (z) => ({ input: await sharp(base).extract({ left: z.x, top: z.y, width: z.largeur, height: z.hauteur }).blur(FLOU).toBuffer(), left: z.x, top: z.y })),
    );
    base = await sharp(base).composite(calques).png().toBuffer();
  }
  return base;
}

async function produire(photos: readonly Photo[]): Promise<void> {
  const texteDuScript = await readFile(new URL(import.meta.url), 'utf8');
  const empreintes: Record<string, { source: string; fichiers: Record<string, string> }> = {};
  await mkdir(join(RACINE, SOURCE_PHOTOS), { recursive: true });
  const attendus = new Set<string>(['empreintes.json']);
  const manquants: string[] = [];
  for (const p of photos) {
    const original = await originalVerifie(p);
    if (original === undefined) {
      manquants.push(p.id);
      continue;
    }
    const image = await recadree(p, original);
    const fichiers: Record<string, string> = {};
    for (const largeur of LARGEURS_PHOTOS) {
      // Sans withMetadata : sharp n'écrit ni EXIF, ni XMP, ni profil ICC (couleurs ramenées en sRVB).
      const webp = await image.clone().resize({ width: largeur, height: hauteurPhoto(largeur), fit: 'fill' }).webp(WEBP).toBuffer();
      const problemes = problemesFichierPhoto(webp, largeur);
      if (problemes.length > 0) throw new Error(`${p.id} (${largeur} px) : ${problemes.join(' ; ')}`);
      const nom = nomFichierPhoto(p.id, largeur);
      await writeFile(join(RACINE, SOURCE_PHOTOS, nom), webp);
      attendus.add(nom);
      fichiers[String(largeur)] = sha('sha256', webp);
      console.log(`écrit : ${SOURCE_PHOTOS}/${nom} (${webp.length} octets)`);
    }
    empreintes[p.id] = { source: await empreinteSource(p, texteDuScript), fichiers };
  }
  // Rien d'autre dans src/photos/ que les fichiers du registre.
  for (const nom of await readdir(join(RACINE, SOURCE_PHOTOS))) if (!attendus.has(nom)) await rm(join(RACINE, SOURCE_PHOTOS, nom));
  await writeFile(join(RACINE, FICHIER_EMPREINTES_PHOTOS), `${JSON.stringify(empreintes, null, 2)}\n`);
  console.log(`écrit : ${FICHIER_EMPREINTES_PHOTOS}`);
  if (manquants.length > 0) throw new Error(`original absent ou différent de son empreinte dans ${CACHE_ORIGINAUX}/ (lancer node scripts/photos.ts --telecharger) : ${manquants.join(', ')}`);
}

/** Aperçus du paquet : l'original réduit, zone gardée en ambre et zones floutées en rouge ; le recadrage réduit. */
async function apercus(photos: readonly Photo[], dossier: string): Promise<void> {
  await mkdir(dossier, { recursive: true });
  for (const p of photos) {
    const original = await originalVerifie(p);
    if (original === undefined) throw new Error(`${p.id} : original absent (--telecharger)`);
    const largeur = 1000;
    const k = largeur / p.largeur_originale;
    const cadre = (z: { x: number; y: number; largeur: number; hauteur: number }, couleur: string): string =>
      `<rect x="${Math.round(z.x * k)}" y="${Math.round(z.y * k)}" width="${Math.round(z.largeur * k)}" height="${Math.round(z.hauteur * k)}" fill="none" stroke="${couleur}" stroke-width="5"/>`;
    const h = Math.round(p.hauteur_originale * k);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${largeur}" height="${h}">${cadre(p.recadrage, '#ffb547')}${(p.floutage ?? []).map((z) => cadre(z, '#ff4d4d')).join('')}</svg>`;
    // L'aperçu de l'original part de l'image floutée : ce que le registre floute ne se republie pas dans le paquet.
    await sharp(await avecFlou(p, original)).resize({ width: largeur }).composite([{ input: Buffer.from(svg) }]).jpeg({ quality: 78 }).toFile(join(dossier, `${p.id}-original.jpg`));
    await (await recadree(p, original)).resize({ width: largeur }).jpeg({ quality: 82 }).toFile(join(dossier, `${p.id}-recadrage.jpg`));
    console.log(`aperçus : ${p.id}`);
  }
}

async function principal(): Promise<void> {
  const args = process.argv.slice(2);
  try {
    await executer(args);
  } catch (e) {
    if (!(e instanceof LimiteDeDebit)) throw e;
    console.error(`Limite de débit de Commons : ${e.message}. Dépôt manuel des originaux dans ${CACHE_ORIGINAUX}/ (contrôle du SHA-1).`);
    process.exit(2);
  }
}

async function executer(args: readonly string[]): Promise<void> {
  const photos = registrePhotos();
  if (args.includes('--verifier') || args.includes('--telecharger')) {
    const ecarts = await verifier(photos);
    if (ecarts.length > 0) {
      console.error(`Écarts avec Commons : rien n'est téléchargé.\n- ${ecarts.join('\n- ')}`);
      process.exit(1);
    }
    if (args.includes('--telecharger')) {
      const manquants = await telecharger(photos);
      if (manquants.length > 0) {
        console.error(`Originaux non téléchargés :\n- ${manquants.join('\n- ')}`);
        process.exit(1);
      }
    }
    return;
  }
  const i = args.indexOf('--apercus');
  if (i >= 0) {
    const dossier = args[i + 1];
    if (dossier === undefined) throw new Error('--apercus <dossier>');
    await apercus(photos, dossier);
    return;
  }
  await produire(photos);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  principal().catch((e: unknown) => {
    console.error((e as Error).message);
    process.exit(1);
  });
}
