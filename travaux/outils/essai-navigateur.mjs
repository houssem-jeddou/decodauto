// Essai : lire un PDF de préfecture avec un vrai navigateur (Chromium sans écran) sur un serveur de GitHub.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page_url, sortie] = process.argv.slice(2);
const navigateur = await chromium.launch();
const page = await navigateur.newPage({ locale: 'fr-FR' });
const r = await page.goto(page_url, { waitUntil: 'domcontentloaded', timeout: 45000 });
console.log('PAGE', r?.status(), await page.title());
const liens = await page.$$eval('a[href*="telechargement"], a[href$=".pdf"]', as => as.map(a => a.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) + ' | ' + a.href));
console.log('LIENS', liens.slice(0, 6).join('\n'));
const pdf = liens.map(l => l.split(' | ')[1]).find(u => /AP|arr/i.test(u)) ?? liens[0]?.split(' | ')[1];
await page.waitForTimeout(8000);
const b64 = await page.evaluate(async u => { const r = await fetch(u); const b = new Uint8Array(await r.arrayBuffer()); let s = ''; for (const x of b) s += String.fromCharCode(x); return r.status + ' ' + btoa(s); }, pdf);
const [statut, donnees] = b64.split(' ');
console.log('PDF', statut, pdf, donnees.length);
writeFileSync(sortie, Buffer.from(donnees, 'base64'));
await navigateur.close();
