// Captures et mesures de la démonstration du format 2 (lot F1, tâche F1.2), à côté des mêmes captures du pilote validé
// (piste B). Usage : servir dist-demo-format2 sur le port 8790 et la maquette du pilote (generer.py, avec css/ et fonts/)
// sur le port 8765, puis `node travaux/etape-13/f1/captures/capturer.cjs <dossier de sortie>`.
// Navigateur : le Chromium et le Playwright préinstallés de l'environnement (require('playwright')), hors dépendances du dépôt.
// Police chargée : la page est ouverte deux fois (la seconde, police en cache : font-display: optional l'affiche) ; police
// de secours : requêtes de la police bloquées. Les mesures sont en pixels CSS depuis le haut de la page.
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');

const sortie = process.argv[2] ?? '.';
const PAGES = [
  { nom: 'accueil', demo: 'http://localhost:8790/', pilote: 'http://localhost:8765/accueil.html?p=b' },
  { nom: 'moteur', demo: 'http://localhost:8790/voyants/moteur/', pilote: 'http://localhost:8765/voyant-moteur.html?p=b' },
  { nom: 'adblue', demo: 'http://localhost:8790/voyants/adblue/', pilote: 'http://localhost:8765/voyant-adblue.html?p=b' },
];
const POLICES = { chargee: false, secours: true };

async function ouvrir(navigateur, url, largeur, hauteur, echelle, bloquer, source) {
  const page = await navigateur.newPage({ viewport: { width: largeur, height: hauteur }, deviceScaleFactor: echelle });
  if (bloquer) await page.route(/\/(polices|fonts)\//, (r) => r.abort());
  // Police chargée : font-display: optional peut garder la police de secours si la police arrive après le premier rendu,
  // même en cache ; pour la capture « police chargée », la feuille est servie en font-display: block (état d'un lecteur qui a
  // la police en cache), sans rien changer d'autre (seconde revue de F1.2 : une capture « chargée » était en police de secours).
  else {
    await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => {
      const reponse = await route.fetch();
      const corps = (await reponse.text()).replace(/font-display:\s*optional/g, 'font-display:block');
      await route.fulfill({ response: reponse, body: corps });
    });
  }
  await page.goto(url, { waitUntil: 'networkidle' });
  if (!bloquer) await page.reload({ waitUntil: 'networkidle' });
  // Maquette du pilote : sa barre de commandes est masquée, comme pour ses propres mesures (porte/verifier_porte.py).
  if (source === 'pilote') await page.addStyleTag({ content: '.barre-pilote{display:none!important}' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  return page;
}

async function mesurer(page) {
  return page.evaluate(() => {
    const bas = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null; };
    const haut = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; };
    const figure = document.querySelector('figure.illustration');
    const provenance = document.querySelector('.provenance');
    return {
      policeTitre: [...document.fonts].some((f) => f.status === 'loaded' && f.weight === '700'),
      lignesH1: (() => { const r = document.createRange(); r.selectNodeContents(document.querySelector('h1')); return new Set([...r.getClientRects()].map((x) => Math.round(x.top))).size; })(),
      h1: getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0],
      basMention: bas('.mention-ia'),
      // Règle 2a, comme la porte du pilote (porte/verifier_porte.py) : bas de la situation, du verdict, de l'urgence et de
      // l'action de la première ligne (la ligne d'écart n'en fait pas partie).
      basPremiereSituation: (() => { const l = document.querySelector('.ligne'); if (!l) return null; return Math.max(...['.situation', '.verdict', '.urgence', '.action'].map((s) => l.querySelector(s)).filter(Boolean).map((e) => Math.round(e.getBoundingClientRect().bottom + scrollY))); })(),
      basPremiereLigne: bas('.ligne'),
      basEncadre: bas('.decision'),
      basProvenance: bas('.provenance'),
      hautIllustration: haut('figure.illustration'),
      illustrationSuitProvenance: figure !== null && provenance !== null ? figure.previousElementSibling === provenance : null,
      hautGrilleVoyants: haut('.grille-voyants'),
      colle: (() => { const c = document.querySelector('.colle'); if (!c || getComputedStyle(c).display === 'none' || c.offsetParent === null) return null; return { hauteur: c.clientHeight, contenu: c.scrollHeight, hauteurEcran: innerHeight, defilement: getComputedStyle(c).overflowY }; })(),
      hautSectionVoyants: haut('.voyants'),
      hauteurPage: Math.round(document.documentElement.scrollHeight),
      largeurPage: Math.round(document.documentElement.scrollWidth),
    };
  });
}

(async () => {
  const navigateur = await chromium.launch();
  const mesures = {};
  for (const p of PAGES) {
    for (const source of ['demo', 'pilote']) {
      for (const [police, bloquer] of Object.entries(POLICES)) {
        const cle = `${source}-${p.nom}-${police}`;
        let page = await ouvrir(navigateur, p[source], 375, 667, 2, bloquer, source);
        mesures[cle] = { telephone: await mesurer(page) };
        await page.screenshot({ path: join(sortie, `${source}-${p.nom}-375-ecran-${police}.png`) });
        await page.close();
        page = await ouvrir(navigateur, p[source], 375, 667, 1, bloquer, source);
        await page.screenshot({ path: join(sortie, `${source}-${p.nom}-375-page-${police}.png`), fullPage: true });
        await page.close();
        page = await ouvrir(navigateur, p[source], 1366, 800, 1, bloquer, source);
        mesures[cle].ordinateur = await mesurer(page);
        await page.screenshot({ path: join(sortie, `${source}-${p.nom}-1366-ecran-${police}.png`) });
        await page.close();
      }
    }
  }
  // Sommaire, état court (brief F1.2-corrections, §3) : libellés courts du pilote posés dans la page du voyant moteur pour la
  // capture seulement (les données n'ont pas de titre court) ; état long : la page telle quelle (captures ci-dessus).
  const COURTS = ['Peut-on rouler ?', 'Au démarrage', 'Il clignote', 'Rouge ou « Risque casse moteur »', '« Antipollution à contrôler »', 'Peugeot et Citroën', 'Quelle pièce ?', 'Combien de km ?', 'L’éteindre', 'Roule normalement', 'Perte de puissance', 'Contrôle technique', 'Causes', 'Votre marque'];
  for (const [police, bloquer] of Object.entries(POLICES)) {
    for (const [largeur, hauteur, echelle, nom] of [[375, 667, 2, '375'], [1366, 800, 1, '1366']]) {
      const page = await ouvrir(navigateur, PAGES[1].demo, largeur, hauteur, echelle, bloquer, 'demo');
      for (const etat of ['long', 'court']) {
        if (etat === 'court') await page.evaluate((c) => document.querySelectorAll('.sommaire').forEach((s) => s.querySelectorAll('a span').forEach((a, i) => { a.textContent = c[i] ?? a.textContent; })), COURTS);
        if (largeur > 900) {
          // Ordinateur : page défilée au-delà de l'encadré, colonne collée en haut (hauteur maximale, défilement propre, ombre du
          // bas) ; puis la colonne défilée d'elle-même (ombres du haut et du bas).
          await page.evaluate(() => { const c = document.querySelector('.colle'); c.scrollTop = 0; scrollTo(0, Math.max(0, document.querySelector('.decision').getBoundingClientRect().bottom + scrollY - 400)); });
          await page.waitForTimeout(150);
          await page.screenshot({ path: join(sortie, `demo-sommaire-${etat}-${nom}-${police}.png`) });
          if (etat === 'long') {
            await page.evaluate(() => { document.querySelector('.colle').scrollTop = 120; });
            await page.waitForTimeout(150);
            await page.screenshot({ path: join(sortie, `demo-sommaire-${etat}-${nom}-defilee-${police}.png`) });
          }
        } else {
          // Téléphone : le sommaire de la colonne sous le haut de l'écran (défilement jamais négatif).
          await page.evaluate(() => { const s = document.querySelector('.sommaire-colonne'); scrollTo(0, Math.max(0, s.getBoundingClientRect().top + scrollY - 120)); });
          await page.waitForTimeout(150);
          await page.screenshot({ path: join(sortie, `demo-sommaire-${etat}-${nom}-${police}.png`) });
        }
      }
      await page.close();
    }
  }
  await navigateur.close();
  writeFileSync(join(sortie, 'mesures.json'), JSON.stringify(mesures, null, 2) + '\n');
  process.stdout.write(JSON.stringify(mesures, null, 1) + '\n');
})();
