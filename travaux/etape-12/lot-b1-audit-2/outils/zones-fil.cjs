// Lot B1 de l'audit n° 2 (P10, précision du 26/11) : la zone tactile de chaque lien du fil d'Ariane (boîte du lien, marge
// intérieure comprise) ne chevauche ni le bandeau, ni le H1, ni la zone d'une autre cible (liens, boutons, résumés, champs) ;
// elle fait au moins 44 px de haut et est réellement touchable (elementFromPoint). Toutes les pages du site, 320, 375 et
// 1366 px, police de secours et police chargée. Avec --capture <dossier>, dessine à 375 px les zones (vert : fil d'Ariane ;
// rouge : bandeau et H1 ; bleu : autres cibles du haut de page) sur une page.
// node zones-fil.cjs <base> <sortie.json> [--capture <dossier> <chemin>]
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, sortie, ...reste] = process.argv.slice(2);
const capture = reste[0] === '--capture' ? { dossier: reste[1], chemin: reste[2] } : undefined;
const plan = JSON.parse(fs.readFileSync('data/plan-du-site.json', 'utf8')).map((p) => p.adresse);
(async () => {
  const nav = await chromium.launch(); const res = []; let defauts = 0;
  for (const chemin of plan) for (const w of [320, 375, 1366]) for (const secours of [true, false]) {
    const p = await nav.newPage({ viewport: { width: w, height: 800 } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\/$|\.html$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    const r = await p.evaluate(() => {
      const R = (e) => { const b = e.getBoundingClientRect(); return { x: b.left, y: b.top + scrollY, l: b.width, h: b.height }; };
      const inter = (a, b) => a.x < b.x + b.l - 0.5 && b.x < a.x + a.l - 0.5 && a.y < b.y + b.h - 0.5 && b.y < a.y + a.h - 0.5;
      const fil = [...document.querySelectorAll('.fil a')];
      const bandeau = document.querySelector('header.bandeau'); const h1 = document.querySelector('h1');
      const cibles = [...document.querySelectorAll('a[href], button, summary, input, select, label')].filter((e) => !fil.includes(e) && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden');
      const defauts = [];
      for (const a of fil) {
        const z = R(a);
        if (z.h < 44) defauts.push(`${a.textContent.trim()} : ${Math.round(z.h)} px de haut`);
        if (bandeau && inter(z, R(bandeau))) defauts.push(`${a.textContent.trim()} : chevauche le bandeau`);
        if (h1 && inter(z, R(h1))) defauts.push(`${a.textContent.trim()} : chevauche le H1`);
        for (const c of [...cibles, ...fil.filter((f) => f !== a)]) if (inter(z, R(c))) defauts.push(`${a.textContent.trim()} : chevauche la cible « ${c.textContent.trim().slice(0, 30)} »`);
        // Toucher réel : au milieu horizontal, chaque point de la zone tombe sur le lien.
        const b = a.getBoundingClientRect(); a.scrollIntoView({ block: 'center' }); const b2 = a.getBoundingClientRect(); let n = 0;
        for (let y = Math.ceil(b2.top); y < b2.bottom; y++) { const e = document.elementFromPoint(b2.left + b2.width / 2, y); if (e === a || a.contains(e)) n++; }
        if (n < 44) defauts.push(`${a.textContent.trim()} : ${n} px réellement touchables`);
        scrollTo(0, 0); void b;
      }
      return { liens: fil.map((a) => `${a.textContent.trim()} ${Math.round(R(a).l)}×${Math.round(R(a).h)}`), basBandeau: bandeau ? Math.round(R(bandeau).y + R(bandeau).h) : null, hautH1: h1 ? Math.round(R(h1).y) : null, defauts };
    });
    defauts += r.defauts.length;
    res.push({ chemin, w, police: secours ? 'secours' : 'chargée', ...r });
    await p.close();
  }
  if (capture) {
    const p = await nav.newPage({ viewport: { width: 375, height: 667 } });
    await p.route(/\/polices\//, (r) => r.abort());
    await p.goto(base + capture.chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => {
      const boite = (e, couleur) => { const b = e.getBoundingClientRect(); const d = document.createElement('div'); Object.assign(d.style, { position: 'absolute', left: `${b.left}px`, top: `${b.top + scrollY}px`, width: `${b.width}px`, height: `${b.height}px`, outline: `2px solid ${couleur}`, background: `${couleur}33`, pointerEvents: 'none', zIndex: 9999 }); document.body.appendChild(d); };
      boite(document.querySelector('header.bandeau'), '#ff3b30'); boite(document.querySelector('h1'), '#ff3b30');
      for (const a of document.querySelectorAll('.fil a')) boite(a, '#34c759');
      for (const c of document.querySelectorAll('header.bandeau a[href], header.bandeau summary')) boite(c, '#0a84ff');
    });
    fs.mkdirSync(capture.dossier, { recursive: true });
    await p.screenshot({ path: `${capture.dossier}/zones-fil-${capture.chemin.replace(/\//g, '-').replace(/^-|-$/g, '')}-375.png`, clip: { x: 0, y: 0, width: 375, height: 260 } });
    await p.close();
  }
  await nav.close(); fs.writeFileSync(sortie, JSON.stringify({ mesures: res.length, defauts, pages: res }, null, 1) + '\n');
  console.log(`${res.length} mesures (${plan.length} adresses × 3 largeurs × 2 polices), ${defauts} défaut(s)`);
  for (const r of res) for (const d of r.defauts) console.log(r.chemin, r.w, r.police, d);
})();
