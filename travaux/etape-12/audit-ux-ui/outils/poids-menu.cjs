const { chromium } = require('playwright');
const fs = require('node:fs'); const zlib = require('node:zlib');
const src = fs.readFileSync(__dirname + '/maquettes.cjs', 'utf8').split('const CAS = [')[0].replace("const [base, sortie] = process.argv.slice(2);", '').replace("const { chromium } = require('playwright');", '').replace("const { mkdirSync } = require('node:fs');", '');
eval(src + ';globalThis.M={m1};');
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const p = await nav.newPage();
  await p.goto('http://localhost:8810/voyants/moteur/', { waitUntil: 'networkidle' });
  await M.m1(p, false);
  const r = await p.evaluate(() => ({ menu: document.querySelector('.menu-site').outerHTML, pied: document.querySelector('.pied-nav').outerHTML, liens: document.querySelectorAll('.menu-panneau a').length, css: [...document.querySelectorAll('style')].pop().textContent }));
  const t = r.menu + r.pied;
  console.log('liens du menu', r.liens, '; HTML', t.length, 'octets ; compressé', zlib.gzipSync(t).length, '; CSS', r.css.length, 'octets ; compressé', zlib.gzipSync(r.css).length);
  await nav.close();
})();
