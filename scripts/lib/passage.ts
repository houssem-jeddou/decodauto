// Règle de passage d'une page rédigée (livrable 8.3.0, travaux/etape-8/regle-de-passage.md) : contrôle des conditions
// et description des gestes (déplacement, briefs, liste Lighthouse). Ne modifie rien : scripts/passage.ts applique.
// Sans dépendance : ce module tourne sans installation. Il n'allège aucun contrôle : l'empreinte de validation est
// recalculée par la commande officielle (fonction passée en paramètre), jamais calculée ici.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DOSSIER_CONTENU, DOSSIER_EXEMPLES, localiserPage } from './pages-redigees.ts';

/** Page dont l'accès à « Méthode » (/a-propos/#methode) conditionne la construction de production (R7-LIEN, liens de l'encadré). */
export const ID_A_PROPOS = 'a-propos';
export const CHEMIN_A_PROPOS = `${DOSSIER_CONTENU}/socle/${ID_A_PROPOS}.md`;
export const FICHIER_LIGHTHOUSE = 'lighthouserc.json';

interface PageDuPlan {
  id: string;
  type: string;
  adresse: string;
  vague: string;
}

export interface Passage {
  id: string;
  source: string;
  cible: string;
  adresse: string;
  /** Adresse à ajouter à la liste Lighthouse de production (lighthouserc.json, collect.url). */
  urlLighthouse: string;
  /** Pas d'empreinte à contrôler (page du socle : pas d'encadré de décision). */
  sansEmpreinte: boolean;
}

export interface VerificationPassage {
  passage?: Passage;
  /** Conditions non remplies : tant qu'il en reste une, le passage est refusé. */
  erreurs: string[];
}

async function lire(racine: string, chemin: string): Promise<string | undefined> {
  return readFile(join(racine, chemin), 'utf8').catch(() => undefined);
}

/** Adresse du plan (« /loi-montagne/ ») → adresse servie à Lighthouse (« http://localhost/loi-montagne/index.html »). */
export function urlLighthouse(adresse: string): string {
  return `http://localhost${adresse}index.html`;
}

/**
 * Vérifie qu'une page rédigée peut passer de exemples/ à src/content, sans rien déplacer.
 * @param empreinteDe empreinte de l'encadré du fichier, recalculée par la commande officielle (npm run empreinte -- <fichier>)
 */
export async function verifierPassage(racine: string, id: string, empreinteDe: (chemin: string) => string): Promise<VerificationPassage> {
  const erreurs: string[] = [];
  const plan = JSON.parse((await lire(racine, 'data/plan-du-site.json')) ?? '[]') as PageDuPlan[];
  const page = plan.find((p) => p.id === id);
  if (page === undefined) return { erreurs: [`${id} : identifiant absent de data/plan-du-site.json`] };

  let source: string | undefined;
  try {
    source = await localiserPage(racine, page.type, id);
  } catch (e) {
    return { erreurs: [(e as Error).message] };
  }
  if (source === undefined) return { erreurs: [`${id} : aucun fichier ${DOSSIER_EXEMPLES}/${page.type}/${id}.md`] };
  if (source.startsWith(`${DOSSIER_CONTENU}/`)) return { erreurs: [`${id} : déjà dans ${DOSSIER_CONTENU}/ (${source})`] };

  const texte = (await lire(racine, source)) ?? '';
  const idFichier = /^id: *(\S+)\s*$/m.exec(texte)?.[1];
  if (idFichier !== id) erreurs.push(`${source} : l'identifiant du fichier (${idFichier ?? 'absent'}) n'est pas ${id}`);

  const sansEmpreinte = page.type === 'socle';
  if (!sansEmpreinte) {
    const validation = /^validation: *([0-9a-f]{64})\s*$/m.exec(texte)?.[1];
    if (validation === undefined) erreurs.push(`${source} : encadré sans empreinte de validation`);
    else {
      let calculee: string | undefined;
      try {
        calculee = empreinteDe(source);
      } catch {
        erreurs.push(`${source} : empreinte non calculable (npm ci puis npm run empreinte -- ${source})`);
      }
      if (calculee !== undefined && calculee !== validation) erreurs.push(`${source} : l'encadré a changé depuis la validation de Houssem (empreinte différente)`);
    }
  }

  // Une page en ligne renvoie vers « Méthode » : sans la page « à propos », la vérification des liens de production échoue
  // (l'attendu LIEN-CASSE n'existe que dans la recette des exemples).
  if (id !== ID_A_PROPOS) {
    const aPropos = await lire(racine, CHEMIN_A_PROPOS);
    if (aPropos === undefined) {
      erreurs.push(`${CHEMIN_A_PROPOS} n'existe pas : mettre « à propos » en ligne d'abord (ses liens « Méthode » sont cassés sans elle)`);
    } else if (!sansEmpreinte) {
      // R7-AUTEUR-INCONNU : l'auteur de la page doit avoir sa fiche dans « à propos » (champ auteurs), sinon la construction échoue.
      const auteur = /^auteur: *(\S+)\s*$/m.exec(texte)?.[1];
      if (auteur === undefined) erreurs.push(`${source} : champ auteur absent`);
      else if (!new RegExp(`^\\s*- id: *${auteur.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm').test(aPropos)) {
        erreurs.push(`${CHEMIN_A_PROPOS} : pas de fiche auteur « ${auteur} » (champ auteurs) : R7-AUTEUR-INCONNU échouerait à la construction`);
      }
    }
  }

  const lighthouse = JSON.parse((await lire(racine, FICHIER_LIGHTHOUSE)) ?? '{}') as { ci?: { collect?: { url?: string[] } } };
  const urls = lighthouse.ci?.collect?.url ?? [];
  const url = urlLighthouse(page.adresse);
  if (urls.includes(url)) erreurs.push(`${FICHIER_LIGHTHOUSE} : ${url} y figure déjà`);

  const cible = `${DOSSIER_CONTENU}/${page.type}/${id}.md`;
  return { passage: { id, source, cible, adresse: page.adresse, urlLighthouse: url, sansEmpreinte }, erreurs };
}

/** Ajoute l'adresse à la liste Lighthouse de production (texte du fichier, mise en forme conservée : une adresse par ligne). */
export function ajouterUrlLighthouse(contenu: string, url: string): string {
  const objet = JSON.parse(contenu) as { ci: { collect: { url: string[] } } };
  const urls = objet.ci.collect.url;
  if (urls.includes(url)) throw new Error(`${url} figure déjà dans la liste Lighthouse`);
  const suivantes = [...urls, url];
  const ancien = /("url": )\[[^\]]*\]/.exec(contenu);
  if (ancien === null) throw new Error('liste "url" introuvable dans lighthouserc.json');
  const liste = suivantes.length === 1 ? `["${suivantes[0]}"]` : `[\n${suivantes.map((u) => `        "${u}"`).join(',\n')}\n      ]`;
  const resultat = contenu.replace(ancien[0], `${ancien[1]}${liste}`);
  JSON.parse(resultat);
  return resultat;
}

/** Rappels à traiter dans le même commit que le déplacement (gestes qui ne se font pas par script : texte libre de la CI et de la page). */
export function rappelsDePassage(p: Passage): string[] {
  const rappels = [`${p.cible} : retirer du commentaire d'en-tête la mention « exemple » ou « jamais publiée » s'il y en a une`];
  // Dès que « à propos » existe, les attendus LIEN-CASSE vers /a-propos/#methode de la recette ne se produisent plus (ATTENDU-ABSENT) :
  // c'est le passage de « à propos » qui les retire tous ; pour une autre page, ils ont déjà disparu.
  if (p.id === ID_A_PROPOS) rappels.unshift('.github/workflows/ci.yml : retirer toutes les lignes --attendu \'LIEN-CASSE@…@/a-propos/#methode\' de la recette (elles deviennent ATTENDU-ABSENT)');
  else rappels.unshift('.github/workflows/ci.yml : vérifier qu\'aucune ligne --attendu ne vise encore cette page');
  rappels.push(`lighthouserc-exemples.json : laisser ${p.urlLighthouse} (la recette des exemples continue de construire la page)`);
  return rappels;
}
