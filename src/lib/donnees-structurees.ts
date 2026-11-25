// Données structurées (étape 7, livrable 7.5a) : JSON-LD schema.org, généré depuis ce que la page affiche, jamais saisi.
// Fonctions pures, sans dépendance : utilisées par le gabarit (src/layouts/Base.astro via la route et l'accueil), le
// script de contrôle (scripts/lib/dist.ts, contrôles DONNEES-STRUCTUREES-*) et les tests.
//
// Ce que le site déclare, et rien de plus (documentation Google « Search Gallery » et « Structured data general guidelines » :
// le balisage décrit le contenu visible de la page, sans ajout) :
//  - page éditoriale : Article (titre = H1, description, date de mise à jour, auteur) et BreadcrumbList
//    (le fil d'Ariane affiché) ;
//  - accueil : WebSite (nom, adresse, langue) ;
//  - page « à propos » : Person (l'auteur de la fiche affichée) ;
//  - mentions légales, 404 : rien.
// Pas de datePublished : la page n'affiche que sa date de mise à jour (signature, charte §4), et le balisage ne dit rien
// qui ne soit visible ; la date de publication, propre au fichier de contenu, ne sort pas du site. Pas d'Organization ni de publisher (le site n'a pas d'entité à déclarer, l'éditeur est l'auteur). Pas d'image, sauf la photo
// sous licence libre affichée par la page (demande de changement n° 42, lot U4 : propriété `image` de l'Article, adresse
// absolue de sa version de 1 200 px, sur les seules pages du registre data/photos.json ; ni dessin ni image de partage), pas de FAQPage ni de HowTo (extraits de résultats que Google n'affiche plus pour la plupart des
// sites ; un balisage sans extrait attendu n'apporte rien).

import { NOM_ALTERNATIF_DU_SITE, NOM_DU_SITE, URL_SITE, urlAbsolue } from './site.ts';
import { typographier } from './html.ts';
import type { Miette } from './composants.ts';

export const TYPE_SCRIPT_JSON_LD = 'application/ld+json';
export const CONTEXTE_SCHEMA = 'https://schema.org';

/** Types admis par nature de page (contrôle DONNEES-STRUCTUREES-TYPE). */
export const TYPES_ATTENDUS = {
  editoriale: ['Article', 'BreadcrumbList'],
  accueil: ['WebSite'],
  'a-propos': ['Person'],
  aucune: [],
} as const;
export type NatureDePage = keyof typeof TYPES_ATTENDUS;

/** Ancre de la fiche d'un auteur sur la page « à propos » (`id="auteur-<id>"`, src/lib/modeles.ts). */
export const ancreAuteur = (id: string): string => `auteur-${id}`;

export interface AuteurDeclare {
  id: string;
  nom: string;
  /** Liens publics du profil (https) : `sameAs`. Non affichés comme liens : la règle du plan du site (CLAUDE.md) réserve les liens vers un autre site aux sources citées. */
  profils?: readonly string[] | undefined;
}

/**
 * Texte tel que la page l'affiche (typographie du site : apostrophe ’, guillemets « », espaces insécables), les espaces
 * insécables ramenées à une espace : le balisage reprend le texte visible, mot pour mot (contrôles DONNEES-STRUCTUREES-*).
 */
export const texteVisible = (texte: string): string => typographier(texte).replace(/[\u00a0\u202f]/g, ' ');

/** Date au format AAAA-MM-JJ (la même que celle que la page affiche, jour pour jour). */
export const dateIsoJour = (date: Date): string => date.toISOString().slice(0, 10);

/** Fuseau horaire des dates du site (site pour la France). */
export const FUSEAU_DU_SITE = 'Europe/Paris';

/**
 * Date et heure ISO 8601 avec fuseau : minuit, heure de Paris, le jour que la page affiche (« 2026-11-10T00:00:00+01:00 »).
 * Google recommande le fuseau pour dateModified, faute de quoi il prend celui de Googlebot (documentation des données
 * structurées Article, relevée le 13/11/2026). Le décalage est celui en vigueur à minuit heure de Paris : on le lit une
 * heure avant minuit UTC (23 h UTC la veille), instant où l'heure d'été n'a jamais encore changé (changement à 1 h UTC).
 */
export function dateHeureIsoParis(date: Date): string {
  const jour = dateIsoJour(date);
  const instant = new Date(`${jour}T00:00:00Z`).getTime() - 3_600_000;
  const nom = new Intl.DateTimeFormat('en-US', { timeZone: FUSEAU_DU_SITE, timeZoneName: 'longOffset' })
    .formatToParts(new Date(instant))
    .find((p) => p.type === 'timeZoneName')?.value;
  const decalage = /^GMT([+-]\d{2}:\d{2})$/.exec(nom ?? '')?.[1];
  if (decalage === undefined) throw new Error(`Décalage horaire illisible pour ${FUSEAU_DU_SITE} : « ${String(nom)} »`);
  return `${jour}T00:00:00${decalage}`;
}

/** Vrai si la valeur est une date et heure produite par dateHeureIsoParis pour ce jour (AAAA-MM-JJ). */
export const estDateHeureDuJour = (valeur: unknown, jour: string): boolean =>
  typeof valeur === 'string' && /^\d{4}-\d{2}-\d{2}T00:00:00[+-]\d{2}:\d{2}$/.test(valeur) && valeur.startsWith(`${jour}T`) &&
  valeur === dateHeureIsoParis(new Date(jour));

/**
 * Balise <script type="application/ld+json"> d'un objet. Les caractères qui pourraient fermer la balise ou casser le
 * script (« < », « > », « & », séparateurs de ligne Unicode) sont écrits en \uXXXX : le JSON reste identique une fois lu.
 */
export function scriptJsonLd(objet: unknown): string {
  const json = JSON.stringify(objet)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return `<script type="${TYPE_SCRIPT_JSON_LD}">${json}</script>`;
}

/** Fil d'Ariane (BreadcrumbList) : les miettes affichées, adresses absolues ; la dernière est la page elle-même. */
export function filDArianeJsonLd(miettes: readonly Miette[], adressePage: string): Record<string, unknown> {
  return {
    '@context': CONTEXTE_SCHEMA,
    '@type': 'BreadcrumbList',
    itemListElement: miettes.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: texteVisible(m.libelle),
      item: urlAbsolue(m.adresse ?? adressePage),
    })),
  };
}

export interface ArticleDeclare {
  /** H1 de la page. */
  titre: string;
  description: string;
  adresse: string;
  modification: Date;
  auteur: AuteurDeclare;
  /** Adresse de la page « à propos » (fiche de l'auteur). */
  adresseAPropos: string;
  /** Adresse absolue de la photo affichée par la page (demande de changement n° 42) ; absente sans photo. */
  image?: string | undefined;
}

/** Article : ce que la page affiche (H1, signature « Mis à jour le … »), l'auteur de la fiche de « à propos ». */
export function articleJsonLd(a: ArticleDeclare): Record<string, unknown> {
  return {
    '@context': CONTEXTE_SCHEMA,
    '@type': 'Article',
    headline: texteVisible(a.titre),
    description: a.description,
    inLanguage: 'fr',
    mainEntityOfPage: urlAbsolue(a.adresse),
    dateModified: dateHeureIsoParis(a.modification),
    author: { '@type': 'Person', name: texteVisible(a.auteur.nom), url: `${urlAbsolue(a.adresseAPropos)}#${ancreAuteur(a.auteur.id)}` },
    ...(a.image !== undefined ? { image: a.image } : {}),
  };
}

/**
 * WebSite de l'accueil : nom préféré (celui du bandeau) et nom de domaine en nom alternatif (Google Search Central,
 * « Provide a site name to Google Search », lu le 11/11/2026). Pas de SearchAction : le site n'a pas de moteur de
 * recherche interne.
 */
export function siteJsonLd(): Record<string, unknown> {
  return { '@context': CONTEXTE_SCHEMA, '@type': 'WebSite', name: NOM_DU_SITE, alternateName: NOM_ALTERNATIF_DU_SITE, url: `${URL_SITE}/`, inLanguage: 'fr' };
}

/** Person de la fiche d'un auteur sur « à propos » ; `sameAs` = ses profils publics déclarés dans la fiche. */
export function personneJsonLd(auteur: AuteurDeclare, adresseAPropos: string): Record<string, unknown> {
  return {
    '@context': CONTEXTE_SCHEMA,
    '@type': 'Person',
    '@id': `${urlAbsolue(adresseAPropos)}#${ancreAuteur(auteur.id)}`,
    name: texteVisible(auteur.nom),
    url: `${urlAbsolue(adresseAPropos)}#${ancreAuteur(auteur.id)}`,
    ...(auteur.profils !== undefined && auteur.profils.length > 0 ? { sameAs: [...auteur.profils] } : {}),
  };
}

/** Scripts JSON-LD d'une page éditoriale : Article puis fil d'Ariane. */
export function scriptsPageEditoriale(a: ArticleDeclare, miettes: readonly Miette[]): string[] {
  return [scriptJsonLd(articleJsonLd(a)), scriptJsonLd(filDArianeJsonLd(miettes, a.adresse))];
}

export const scriptsAccueil = (): string[] => [scriptJsonLd(siteJsonLd())];

/** Scripts JSON-LD de la page « à propos » : une Person par fiche auteur. */
export const scriptsAPropos = (auteurs: readonly AuteurDeclare[], adresseAPropos: string): string[] =>
  auteurs.map((a) => scriptJsonLd(personneJsonLd(a, adresseAPropos)));
