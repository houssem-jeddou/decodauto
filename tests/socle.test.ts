// Pages du socle et politique de confidentialité (étape 7, livrable 7.2 ; demande de changement n° 13) : description
// obligatoire, modèle de page, adresse de contact tirée de site.ts, et ce que la politique affirme tenu vrai par des contrôles
// (aucun script ni ressource d'un autre site, lien de pied de page dès que la page est construite). Les conditions de la CNIL
// et les décisions sont dans travaux/etape-7/. Le rendu Markdown réel est celui d'Astro (job « Recette des exemples ») ; ici,
// le corps de l'exemple est converti par une fonction minimale.
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ANCRE_CONFIDENTIALITE, ANCRE_METHODE, LIBELLE_LIEN_CONFIDENTIALITE, PAGE_CONFIDENTIALITE, PAGE_METHODE, REGISTRE_EMPREINTE, RESPONSABLE_EDITORIAL, sectionMethode } from '../src/lib/charte.ts';
import { lienConfidentialite, sectionMethodeHtml } from '../src/lib/composants.ts';
import { controlerHtmlSocle } from '../src/lib/controle.ts';
import { pied } from '../src/lib/gabarit.ts';
import { MARQUEUR_CONTACT, pageSocle } from '../src/lib/modeles.ts';
import { dateAffichee } from '../src/lib/cout.ts';
import { ADRESSE_SIGNALEMENT } from '../src/lib/site.ts';
import { soclePageSchema } from '../src/schemas/pages.ts';
import { lireFrontmatter, separerFrontmatter } from '../scripts/lib/charger.ts';
import { adressesDuCss, constatsExpressionsInterdites, constatsIdentifiants, constatsLienConfidentialite, constatsPageAPropos, constatsRessourcesTierces, constatsTypographie, controlerComposantsCommuns } from '../scripts/lib/dist.ts';
import { pageRedigee } from '../scripts/lib/pages-redigees.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXEMPLE = await pageRedigee(racine, 'socle', 'mentions-legales');
const contenu = await readFile(join(racine, EXEMPLE), 'utf8');
const brut = lireFrontmatter(contenu) as Record<string, unknown>;
const page = soclePageSchema.parse(brut);
const corpsMarkdown = separerFrontmatter(contenu).corps;
const plan = JSON.parse(await readFile(join(racine, 'data/plan-du-site.json'), 'utf8')) as { id: string; type: string; adresse: string }[];
const adresse = plan.find((p) => p.id === PAGE_CONFIDENTIALITE)?.adresse ?? '';

/** Corps Markdown converti par une fonction minimale : titres, paragraphes, listes à puces, gras et liens. */
function corpsHtml(markdown: string): string {
  const enLigne = (t: string): string => t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((bloc) => {
      if (bloc.startsWith('### ')) return `<h3>${enLigne(bloc.slice(4))}</h3>`;
      if (bloc.startsWith('## ')) return `<h2>${enLigne(bloc.slice(3))}</h2>`;
      if (bloc.startsWith('- ')) return `<ul>${bloc.split('\n').map((l) => `<li>${enLigne(l.slice(2))}</li>`).join('')}</ul>`;
      return `<p>${enLigne(bloc)}</p>`;
    })
    .join('\n');
}

const principal = pageSocle(page, corpsHtml(corpsMarkdown));
const docu = (contenuPage: string, tete = '<title>T</title><meta name="description" content="D.">'): string => `<!doctype html><html lang="fr"><head>${tete}</head><body><main>${contenuPage}</main></body></html>`;
const codes = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();

describe('page du socle : schéma et modèle', () => {
  test('la description et les dates de revue sont obligatoires (demande de changement n° 13)', () => {
    for (const champ of ['description', 'date_revue', 'prochaine_revue']) {
      const { [champ]: _retire, ...sans } = brut;
      assert.equal(soclePageSchema.safeParse(sans).success, false, champ);
    }
    assert.equal(soclePageSchema.safeParse(brut).success, true);
  });

  test('la page construite a le title, la description de son contenu et un seul H1', () => {
    const tete = `<title>${page.title}</title><meta name="description" content="${page.description}">`;
    assert.deepEqual(controlerHtmlSocle(page, docu(principal, tete), 'x'), []);
    assert.deepEqual(codes(controlerHtmlSocle(page, docu(principal, `<title>${page.title}</title>`), 'x')), ['R7-HTML-DESCRIPTION']);
    assert.deepEqual(codes(controlerHtmlSocle(page, docu(`${principal}<h1>Autre</h1>`, tete), 'x')), ['R7-HTML-H1']);
  });

  test('le modèle affiche le H1, le texte et la date de mise à jour, sans encadré ni signature', () => {
    assert.match(principal, /^<h1>/);
    assert.match(principal, /data-corps/);
    assert.ok(principal.includes(`data-socle-date>Mis à jour le ${dateAffichee(page.date_modification)}<`), 'date de mise à jour tirée de la page');
    assert.doesNotMatch(principal, /data-encadre-decision|data-signature|data-element-unique/);
  });

  test('l’adresse de contact vient de site.ts : jamais recopiée dans le texte, jamais masquée par Cloudflare', () => {
    assert.ok(!corpsMarkdown.includes(ADRESSE_SIGNALEMENT), 'adresse écrite à la main');
    assert.ok(corpsMarkdown.includes(MARQUEUR_CONTACT));
    assert.ok(!principal.includes(MARQUEUR_CONTACT));
    assert.ok(principal.includes(`<!--email_off--><a href="mailto:${ADRESSE_SIGNALEMENT}">`), 'lien de contact protégé du masquage');
  });

  test('une référence inconnue et une section de confidentialité absente font échouer la construction', () => {
    assert.throws(() => pageSocle(page, '<h2>Confidentialité</h2><p>{{inconnue}}</p>'), /référence inconnue/);
    assert.throws(() => pageSocle(page, '<h2>Autre titre</h2>'), /« Confidentialité » est absent/);
    assert.doesNotThrow(() => pageSocle({ ...page, id: 'contact' }, '<h2>Autre titre</h2>'));
  });

  test('le titre de la section reçoit son ancre, quel que soit l’identifiant posé par le rendu du Markdown', () => {
    const rendu = pageSocle(page, '<h2 id="autre">Confidentialité</h2>');
    assert.ok(rendu.includes(`<h2 id="${ANCRE_CONFIDENTIALITE}">Confidentialité</h2>`));
    assert.equal(rendu.match(new RegExp(`id="${ANCRE_CONFIDENTIALITE}"`, 'g'))?.length, 1);
  });
});

describe('politique de confidentialité : texte', () => {
  test('la page est celle des mentions légales du plan, de type socle : aucune page ajoutée au plan', () => {
    assert.equal(brut['id'], PAGE_CONFIDENTIALITE);
    assert.equal(plan.find((p) => p.id === PAGE_CONFIDENTIALITE)?.type, 'socle');
    assert.equal(plan.length, 42);
  });

  test('elle garde les rubriques de l’article 13 du RGPD (la présence d’un mot, pas la justesse du texte, que Houssem valide)', () => {
    for (const attendu of [/Qui est responsable/, /Houssem Jeddou/, /\*\*Pourquoi\*\*/, /\*\*Base légale\*\*/, /intérêt légitime/, /\*\*Qui les reçoit\*\*/, /\*\*Durée\*\*/, /Hors de l'Union européenne/, /décision d'adéquation/, /accès/, /rectification/, /effacement/, /limitation/, /réclamation auprès de la \[CNIL\]/, /Rien ne vous oblige/, /Sans elles, la page ne peut pas/, /décision entièrement automatisée/]) {
      assert.match(corpsMarkdown, attendu);
    }
    assert.equal(corpsMarkdown.match(/\*\*Durée\*\*/g)?.length, 2, 'une durée par traitement');
  });

  test('le droit d’opposition est présenté à part, sous son propre titre (RGPD, art. 21, par. 4)', () => {
    const section = corpsMarkdown.slice(corpsMarkdown.indexOf('### Votre droit d'), corpsMarkdown.indexOf('### Publicité'));
    assert.match(section, /vous y opposer à tout moment, pour des raisons tenant à votre situation particulière/);
    assert.ok(section.includes(MARQUEUR_CONTACT));
    assert.doesNotMatch(section, /rectification|effacement|réclamation/);
  });

  test('elle ne parle ni en « nous » ni en promesse interdite, et respecte la typographie du site', () => {
    const html = docu(principal);
    assert.deepEqual([...constatsExpressionsInterdites(html, 'x'), ...constatsTypographie(html, 'x'), ...constatsIdentifiants(html, 'x')], []);
  });

  test('ses liens vers d’autres sites sont en https et ses liens internes n’existent pas (le plan n’en déclare aucun pour le socle)', () => {
    const liens = [...corpsMarkdown.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1] ?? '');
    assert.ok(liens.length > 0);
    for (const lien of liens) assert.match(lien, /^https:\/\//, lien);
  });
});

describe('ce que la politique affirme : aucun script ni ressource d’un autre site (TIERS-RESSOURCE)', () => {
  const cas: ReadonlyArray<readonly [string, string, string?]> = [
    ['script de mesure Cloudflare', '<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"></script>'],
    ['script de la même origine', '<script src="/app.js"></script>'],
    ['script en ligne', '<script>document.cookie = "a=b";</script>'],
    ['données structurées avec une source', '<script type="application/ld+json" src="https://x.test/a.json"></script>'],
    ['cadre', '<iframe src="https://x.test"></iframe>'],
    ['objet', '<object data="https://x.test/a"></object>'],
    ['image d’un autre site', '<img src="https://x.test/p.png" alt="">'],
    ['image sans protocole', '<img src="//x.test/p.png" alt="">'],
    ['variante d’image d’un autre site', '<img src="/a.png" srcset="/a.png 1x, https://x.test/b.png 2x" alt="">'],
    ['domaine qui imite le site', '<img src="https://decodauto.com.x.test/p.png" alt="">'],
    ['vidéo d’un autre site', '<video src="https://x.test/v.mp4"></video>'],
    ['affiche de vidéo d’un autre site', '<video poster="https://x.test/p.png"></video>'],
    ['bouton image d’un autre site', '<input type="image" src="https://x.test/p.png" alt="">'],
    ['image SVG d’un autre site', '<svg><image href="https://x.test/p.png"></image></svg>'],
    ['base d’un autre site', '<base href="https://x.test/">'],
    ['redirection automatique', '<meta http-equiv="refresh" content="0;url=https://x.test/">'],
    ['ping sur un lien', '<a href="/x/" ping="https://x.test/p">x</a>'],
    ['police dans une balise style', '<style>@font-face{font-family:a;src:url(https://fonts.gstatic.com/a.woff2)}</style>'],
    ['import dans une balise style', '<style>@import "https://x.test/a.css";</style>'],
    ['image dans un attribut style', '<div style="background:url(\'https://x.test/p.png\')"></div>'],
    ['écriture détournée par un antislash', '<img src="https:\\\\x.test\\p.png" alt="">'],
    ['identifiant avant l’hôte', '<img src="https://decodauto.com:80@x.test/p.png" alt="">'],
  ];
  for (const [nom, bloc] of cas) {
    test(`refusé : ${nom}`, () => assert.deepEqual(codes(constatsRessourcesTierces(docu(bloc), 'x')), ['TIERS-RESSOURCE']));
  }
  test('refusé : police ou feuille de style d’un autre site', () => {
    for (const rel of ['stylesheet', 'preload', 'preconnect', 'dns-prefetch', 'icon', 'manifest', 'prerender']) {
      assert.deepEqual(codes(constatsRessourcesTierces(docu('', `<title>T</title><link rel="${rel}" href="https://fonts.googleapis.com/x">`), 'x')), ['TIERS-RESSOURCE'], rel);
    }
  });
  test('permis : données structurées en ligne, ressources du site, liens et canonical', () => {
    const permis = '<script type="application/ld+json">{}</script><img src="/p.png" alt=""><img src="https://decodauto.com/p.png" alt=""><a href="https://www.cnil.fr/fr/plaintes">CNIL</a>';
    assert.deepEqual(constatsRessourcesTierces(docu(permis, '<title>T</title><link rel="canonical" href="https://decodauto.com/"><link rel="icon" href="data:,"><link rel="stylesheet" href="/_astro/a.css">'), 'x'), []);
    assert.deepEqual(constatsRessourcesTierces(docu(principal), 'x'), []);
    // Le style du site reste permis dans la page (Astro peut l'y placer), tant qu'il ne charge rien d'un autre site.
    assert.deepEqual(constatsRessourcesTierces(docu('<style>a{color:red}b{background:url(/p.png)}c{background:url(data:,x)}</style>'), 'x'), []);
    assert.deepEqual(constatsRessourcesTierces(docu('<script type="application/ld+json">{"url":"https://schema.org"}</script>'), 'x'), []);
  });

  test('les feuilles de style du site construit sont lues aussi, et la vraie feuille n’a aucune ressource d’un autre site', async () => {
    assert.deepEqual(adressesDuCss(await readFile(join(racine, 'src/styles/site.css'), 'utf8')), []);
    assert.deepEqual(adressesDuCss('/* url(https://x.test/a) */ a{background:url(/p.png)}'), []);
    assert.deepEqual(adressesDuCss('a{background:url( "https://x.test/p.png" )}'), ['https://x.test/p.png']);
    const dist = await mkdtemp(join(tmpdir(), 'dist-css-'));
    try {
      await writeFile(join(dist, 'index.html'), docu('<h1>Accueil</h1>'));
      await writeFile(join(dist, 'a.css'), '@font-face{src:url(https://fonts.gstatic.com/a.woff2)}');
      assert.ok(codes(await controlerComposantsCommuns(dist)).includes('TIERS-RESSOURCE'));
    } finally {
      await rm(dist, { recursive: true, force: true });
    }
  });
});

describe('lien de pied de page vers la politique (CONFIDENTIALITE-*)', () => {
  const lien = lienConfidentialite(adresse);
  test('le lien mène à la section, au texte exact ; le pied ne l’affiche que si l’adresse est donnée', () => {
    assert.ok(lien.includes(`href="${adresse}#${ANCRE_CONFIDENTIALITE}"`));
    assert.ok(lien.includes(LIBELLE_LIEN_CONFIDENTIALITE));
    assert.ok(pied('/x/', adresse).includes('data-lien-confidentialite'));
    assert.doesNotMatch(pied('/x/'), /data-lien-confidentialite/);
    assert.match(pied(undefined, adresse), /data-signaler-erreur/);
  });
  test('refusé : lien absent quand la page est construite, lien présent quand elle ne l’est pas, adresse ou texte faux, lien en double', () => {
    assert.deepEqual(constatsLienConfidentialite(docu(lien), 'x', adresse), []);
    assert.deepEqual(constatsLienConfidentialite(docu(''), 'x', undefined), []);
    assert.deepEqual(codes(constatsLienConfidentialite(docu(''), 'x', adresse)), ['CONFIDENTIALITE-LIEN']);
    assert.deepEqual(codes(constatsLienConfidentialite(docu(lien), 'x', undefined)), ['CONFIDENTIALITE-LIEN']);
    assert.deepEqual(codes(constatsLienConfidentialite(docu(lien.replace('#confidentialite', '#autre')), 'x', adresse)), ['CONFIDENTIALITE-LIEN']);
    assert.deepEqual(codes(constatsLienConfidentialite(docu(lien.replace(LIBELLE_LIEN_CONFIDENTIALITE, 'Divers')), 'x', adresse)), ['CONFIDENTIALITE-LIEN']);
    assert.deepEqual(codes(constatsLienConfidentialite(docu(`${lien}${lien}`), 'x', adresse)), ['CONFIDENTIALITE-LIEN']);
  });
  test('sur le site construit : la page suit le contrôle, avec son ancre, et toute page affiche le lien', async () => {
    const dist = await mkdtemp(join(tmpdir(), 'dist-socle-'));
    try {
      const ecrire = async (chemin: string, html: string): Promise<void> => {
        await mkdir(dirname(join(dist, chemin)), { recursive: true });
        await writeFile(join(dist, chemin), html);
      };
      const politique = (corps: string): string => docu(`<h1>Politique</h1>${corps}${lien}`);
      await ecrire('index.html', docu('<h1>Accueil</h1>'));
      const vus = async (): Promise<string[]> => codes(await controlerComposantsCommuns(dist)).filter((r) => r.startsWith('CONFIDENTIALITE'));
      assert.deepEqual(await vus(), [], 'page non construite : rien n’est attendu');
      await ecrire('mentions-legales/index.html', politique(`<h2 id="${ANCRE_CONFIDENTIALITE}">Confidentialité</h2>`));
      assert.deepEqual(await vus(), ['CONFIDENTIALITE-LIEN'], 'l’accueil n’a pas le lien');
      await ecrire('index.html', docu(`<h1>Accueil</h1>${lien}`));
      assert.deepEqual(await vus(), []);
      await ecrire('mentions-legales/index.html', politique('<h2>Confidentialité</h2>'));
      assert.deepEqual(await vus(), ['CONFIDENTIALITE-ANCRE']);
    } finally {
      await rm(dist, { recursive: true, force: true });
    }
  });
});

// ---- Page « à propos » (livrable 7.3) -------------------------------------------------------------------------------

const cheminAPropos = await pageRedigee(racine, 'socle', PAGE_METHODE);
const contenuAPropos = await readFile(join(racine, cheminAPropos), 'utf8');
const brutAPropos = lireFrontmatter(contenuAPropos) as Record<string, unknown>;
const aPropos = soclePageSchema.parse(brutAPropos);
const corpsAPropos = separerFrontmatter(contenuAPropos).corps;
const methodeHtml = sectionMethodeHtml(sectionMethode(REGISTRE_EMPREINTE));
const pageAPropos = pageSocle(aPropos, corpsHtml(corpsAPropos), methodeHtml);

describe('page « à propos » : fiche auteur et section « Méthode »', () => {
  test('c’est la page du plan qui porte la méthode, de type socle ; elle a une fiche auteur au nom réel et un parcours', () => {
    assert.equal(brutAPropos['id'], PAGE_METHODE);
    assert.equal(plan.find((p) => p.id === PAGE_METHODE)?.type, 'socle');
    assert.equal(aPropos.auteurs?.length, 1);
    assert.equal(aPropos.auteurs?.[0]?.id, 'houssem-jeddou');
    assert.equal(aPropos.auteurs?.[0]?.nom, RESPONSABLE_EDITORIAL, 'la fiche porte le nom du responsable éditorial des signatures');
    assert.ok((aPropos.auteurs?.[0]?.presentation ?? '').length > 100, 'parcours trop court pour identifier l’auteur');
  });

  test('le modèle affiche le texte, la fiche de l’auteur puis la section « Méthode », avant la date', () => {
    const iTexte = pageAPropos.indexOf('data-corps');
    const iFiche = pageAPropos.indexOf('data-auteur ');
    const iMethode = pageAPropos.indexOf('data-methode');
    const iDate = pageAPropos.indexOf('data-socle-date');
    assert.ok(iTexte >= 0 && iTexte < iFiche && iFiche < iMethode && iMethode < iDate, 'ordre texte, fiche, méthode, date');
    assert.ok(pageAPropos.includes(`<h2>${RESPONSABLE_EDITORIAL}</h2>`));
    assert.ok(pageAPropos.includes(`id="${ANCRE_METHODE}"`));
  });

  test('sans fiche auteur ou sans section « Méthode », la construction échoue ; une fiche ailleurs que sur « à propos » aussi', () => {
    assert.throws(() => pageSocle({ ...aPropos, auteurs: undefined }, '<p>x</p>', methodeHtml), /aucune fiche auteur/);
    assert.throws(() => pageSocle(aPropos, '<p>x</p>'), /section « Méthode » est absente/);
    assert.throws(() => pageSocle({ ...page, auteurs: aPropos.auteurs }, '<h2>Confidentialité</h2>'), /ne se saisissent que sur la page/);
  });

  test('la page construite passe le contrôle des composants communs de « à propos » (METHODE-SECTION, AUTEUR-FICHE)', () => {
    assert.deepEqual(constatsPageAPropos(docu(pageAPropos), 'a-propos/index.html'), []);
    assert.deepEqual(codes(constatsPageAPropos(docu(pageAPropos.replace(methodeHtml, '')), 'x')), ['METHODE-SECTION']);
    assert.deepEqual(codes(constatsPageAPropos(docu(pageAPropos.replace(methodeHtml, `${methodeHtml}${methodeHtml}`)), 'x')), ['METHODE-SECTION']);
    assert.deepEqual(codes(constatsPageAPropos(docu(pageAPropos.replace(/<section class="auteur".*?<\/section>/s, '')), 'x')), ['AUTEUR-FICHE']);
    assert.deepEqual(codes(constatsPageAPropos(docu(pageAPropos.replace(`<h2>${RESPONSABLE_EDITORIAL}</h2>`, '<h2></h2>')), 'x')), ['AUTEUR-FICHE']);
  });

  test('le texte ne parle pas en « nous », respecte la typographie, n’écrit ni l’adresse de contact ni aucun lien', () => {
    const html = docu(pageAPropos);
    assert.deepEqual([...constatsExpressionsInterdites(html, 'x'), ...constatsTypographie(html, 'x'), ...constatsIdentifiants(html, 'x')], []);
    assert.ok(!corpsAPropos.includes(ADRESSE_SIGNALEMENT));
    assert.doesNotMatch(corpsAPropos, /\]\(|https?:/, 'un lien dans le texte doit venir du plan (aucun n’est déclaré pour « à propos »)');
  });

  test('la fiche et le texte restent fidèles à la charte : texte rédigé par une IA, sous la responsabilité de l’éditeur, jamais relu par un mécanicien', () => {
    assert.match(corpsAPropos, /rédigés par une intelligence artificielle/);
    assert.match(corpsAPropos, /L'éditeur vérifie lui-même chaque verdict/);
    assert.match(corpsAPropos, /Il n'est relu par aucun mécanicien et ne répare pas de voitures/);
    assert.match(aPropos.auteurs?.[0]?.presentation ?? '', /n'est pas mécanicien/);
  });
});
