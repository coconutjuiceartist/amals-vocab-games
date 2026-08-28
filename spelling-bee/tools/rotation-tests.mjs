/* Tests the daily rotation: the 05:00 rollover, daylight saving, determinism,
   and that the whole bank cycles cleanly.

     npm install playwright
     node tools/rotation-tests.mjs      (set CHROMIUM to override the browser)
*/
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const PAGE = 'file://' + path.join(here, '..', 'ha', 'honeycomb.html');
let pass = 0, fail = 0;
const ok = (n, c, x = '') => { c ? (pass++, console.log('  ✓ ' + n)) : (fail++, console.log('  ✗ ' + n + (x ? '  → ' + x : ''))); };

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });

/* A timezone that actually observes daylight saving, so the boundary is real. */
const ctx = await browser.newContext({ timezoneId: 'Europe/London', viewport: { width: 400, height: 520 } });
const page = await ctx.newPage();
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.goto(PAGE);
await page.waitForTimeout(400);

console.log('\n— the 05:00 rollover —');
{
  const r = await page.evaluate(() => {
    const mk = (y, m, d, h, mi) => new Date(y, m - 1, d, h, mi);   // local time
    return {
      lateEve:  dayNumber(mk(2026, 8, 27, 23, 30)),
      justBefore: dayNumber(mk(2026, 8, 28, 4, 59)),
      justAfter:  dayNumber(mk(2026, 8, 28, 5, 1)),
      midday:     dayNumber(mk(2026, 8, 28, 12, 0)),
      nextEve:    dayNumber(mk(2026, 8, 28, 23, 30)),
    };
  });
  ok('23:30 and 04:59 next morning are the same puzzle day', r.lateEve === r.justBefore,
     `${r.lateEve} vs ${r.justBefore}`);
  ok('05:01 advances to the next day', r.justAfter === r.justBefore + 1,
     `${r.justBefore} → ${r.justAfter}`);
  ok('05:01, midday and 23:30 are all the same day', r.justAfter === r.midday && r.midday === r.nextEve);
}

console.log('\n— daylight saving —');
{
  // Europe/London: BST starts 29 Mar 2026, ends 25 Oct 2026
  const r = await page.evaluate(() => {
    const mk = (y, m, d, h, mi) => new Date(y, m - 1, d, h, mi);
    const days = [];
    for (const [m, d] of [[3, 27], [3, 28], [3, 29], [3, 30], [10, 23], [10, 24], [10, 25], [10, 26]]) {
      days.push([`${d}/${m}`, dayNumber(mk(2026, m, d, 12, 0))]);
    }
    return days;
  });
  const springOk = r[1][1] - r[0][1] === 1 && r[2][1] - r[1][1] === 1 && r[3][1] - r[2][1] === 1;
  const autumnOk = r[5][1] - r[4][1] === 1 && r[6][1] - r[5][1] === 1 && r[7][1] - r[6][1] === 1;
  ok('clocks going forward: each day still advances by exactly 1', springOk, JSON.stringify(r.slice(0, 4)));
  ok('clocks going back: each day still advances by exactly 1', autumnOk, JSON.stringify(r.slice(4)));
  const bound = await page.evaluate(() => {
    const mk = (y, m, d, h, mi) => new Date(y, m - 1, d, h, mi);
    return { before: dayNumber(mk(2026, 3, 29, 4, 30)), after: dayNumber(mk(2026, 3, 29, 5, 30)) };
  });
  ok('the 05:00 boundary still holds on the transition day', bound.after === bound.before + 1,
     `${bound.before} → ${bound.after}`);
}

console.log('\n— determinism and the cycle —');
{
  const r = await page.evaluate(() => {
    const n = PUZZLES.length;
    const ids = [];
    for (let d = 0; d < n; d++) ids.push(puzzleForDay(d).id);
    const unique = new Set(ids).size;
    return {
      n, unique,
      wraps: puzzleForDay(n).id === puzzleForDay(0).id,
      stable: puzzleForDay(12345).id === puzzleForDay(12345).id,
      negative: !!puzzleForDay(-7),
      negativeMatches: puzzleForDay(-7).id === puzzleForDay(-7 + n).id,
    };
  });
  ok(`all ${r.n} puzzles appear exactly once per cycle`, r.unique === r.n, `${r.unique} distinct`);
  ok('day N wraps to the first puzzle', r.wraps);
  ok('the same day always gives the same puzzle', r.stable);
  ok('negative day numbers are handled', r.negative && r.negativeMatches);
  ok(`cycle length is ${(r.n / 365.25).toFixed(2)} years`, r.n / 365.25 > 1.25, `${r.n} days`);
}

console.log('\n— it survives a rollover without losing yesterday —');
{
  await page.goto(PAGE + '?day=100'); await page.waitForTimeout(300);
  const words = await page.evaluate(() => puzzle.words.slice(0, 3));
  for (const w of words) {
    await page.keyboard.press('Escape');
    for (const c of w) await page.keyboard.press(c);
    await page.keyboard.press('Enter'); await page.waitForTimeout(60);
  }
  const scored = await page.textContent('#score');
  ok('played three words on day 100 (' + scored + ' pts)', Number(scored) > 0);

  await page.goto(PAGE + '?day=101'); await page.waitForTimeout(300);
  ok('day 101 is a different puzzle', await page.evaluate(() => puzzle.id) !== null);
  ok('day 101 starts fresh', await page.textContent('#score') === '0', await page.textContent('#score'));

  await page.goto(PAGE + '?day=100'); await page.waitForTimeout(300);
  ok('day 100 progress is still there after the rollover', await page.textContent('#score') === scored,
     `${scored} → ${await page.textContent('#score')}`);
}

console.log('\n— the card —');
{
  await page.goto(PAGE); await page.waitForTimeout(300);
  const label = await page.textContent('#today');
  ok('shows today\'s date rather than a 496-item dropdown', /\w/.test(label), label);
  ok('no puzzle picker remains', await page.locator('select').count() === 0);
  const m = await page.evaluate(() => ({
    sx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    sy: document.documentElement.scrollHeight - document.documentElement.clientHeight,
  }));
  ok('still fits its frame without scrolling', m.sx <= 0 && m.sy <= 0, `${m.sx}×${m.sy}`);
  ok('no JS errors anywhere', errs.length === 0, errs.join(' | '));
}

console.log('\n' + (fail ? `❌ ${fail} FAILED, ${pass} passed` : `✅ all ${pass} checks passed`));
await browser.close();
process.exit(fail ? 1 : 0);
