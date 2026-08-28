/* UI checks for the Home Assistant build: does it fit an iframe card, does the
   theme behave, is it still playable by touch, does progress persist.

     npm install playwright
     node tools/ha-tests.mjs        (set CHROMIUM to override the browser)
*/
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const PAGE = 'file://' + path.join(here, '..', 'ha', 'honeycomb.html');
let pass = 0, fail = 0;
const ok = (n, c, x = '') => { c ? (pass++, console.log('  ✓ ' + n)) : (fail++, console.log('  ✗ ' + n + (x ? '  → ' + x : ''))); };
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });

console.log('\n— fits an iframe card without scrolling —');
for (const [label, w, h] of [
  ['narrow column', 300, 420], ['typical card', 400, 500],
  ['wide card', 500, 420], ['short strip', 420, 320],
]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(PAGE); await p.waitForTimeout(300);
  const m = await p.evaluate(() => ({
    sx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    sy: document.documentElement.scrollHeight - document.documentElement.clientHeight,
    hex: document.querySelector('.hex').getBoundingClientRect().width,
  }));
  ok(`${label} ${w}×${h}: no scroll, hexes ${Math.round(m.hex)}px, no errors`,
     m.sx <= 0 && m.sy <= 0 && m.hex >= 30 && errs.length === 0,
     `overflow ${m.sx}×${m.sy}, hex ${Math.round(m.hex)}, ${errs.join('|')}`);
  await p.close();
}

console.log('\n— theme —');
{
  const p = await b.newPage({ viewport: { width: 400, height: 500 } });
  await p.goto(PAGE + '?theme=light'); await p.waitForTimeout(150);
  const light = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await p.goto(PAGE + '?theme=dark'); await p.waitForTimeout(150);
  const dark = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
  ok('?theme=light is a white ground', light === 'rgb(255, 255, 255)', light);
  ok('?theme=dark is a near-black ground', dark === 'rgb(18, 18, 17)', dark);
  await p.goto(PAGE); await p.waitForTimeout(150);
  for (const [hour, want] of [[9,'light'],[13,'light'],[18,'light'],[19,'dark'],[23,'dark'],[3,'dark'],[7,'light']]) {
    const r = await p.evaluate(h => {
      const R = Date; class F extends R { getHours() { return h; } }
      globalThis.Date = F; const t = resolveTheme(); globalThis.Date = R; return t;
    }, hour);
    ok(`${String(hour).padStart(2, '0')}:00 → ${want}`, r === want, 'got ' + r);
  }
  await p.close();
}

console.log('\n— playable by touch, and it remembers —');
{
  const p = await b.newPage({ viewport: { width: 390, height: 520 }, isMobile: true, hasTouch: true });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(PAGE + '?day=42'); await p.waitForTimeout(300);
  const pan = await p.evaluate(() => puzzle.words.find(w => new Set(w).size === 7));
  for (const c of pan) await p.tap(`.hex[data-letter="${c}"]`);
  await p.tap('#enter'); await p.waitForTimeout(250);
  const s = Number(await p.textContent('#score'));
  ok(`tap-only pangram scores (${pan}, ${s} pts)`, s > 0);
  ok('found counter shows required/total', /^\d+\/\d+/.test(await p.textContent('#foundToggle')),
     await p.textContent('#foundToggle'));
  await p.reload(); await p.waitForTimeout(300);
  ok('progress survives reload', Number(await p.textContent('#score')) === s);
  ok('no JS errors', errs.length === 0, errs.join('|'));
  await p.close();
}

console.log('\n' + (fail ? `❌ ${fail} FAILED, ${pass} passed` : `✅ all ${pass} checks passed`));
await b.close();
process.exit(fail ? 1 : 0);
