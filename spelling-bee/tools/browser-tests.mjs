/* End-to-end checks for index.html, covering the acceptance criteria in
   docs/spelling-bee-requirements.md section 11.

     npm install playwright
     node tools/browser-tests.mjs

   Set CHROMIUM to override the browser path. */
import { chromium } from 'playwright';
const PAGE = 'file:///home/user/amals-vocab-games/spelling-bee/index.html';
let pass = 0, fail = 0;
const ok  = (n, c, extra='') => { c ? (pass++, console.log('  ✓ ' + n)) : (fail++, console.log('  ✗ ' + n + (extra ? '  → ' + extra : ''))); };

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const ctx = await browser.newContext({ viewport: { width: 520, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

await page.goto(PAGE);
await page.waitForTimeout(300);

// pick a deterministic puzzle: hc-002 (C | EINPRT) - has 7 pangrams incl. long ones
await page.selectOption('#puzzle', 'hc-002');
await page.waitForTimeout(200);

const type = async w => { await page.keyboard.press('Escape');
  for (const c of w) await page.keyboard.press(c);
  await page.keyboard.press('Enter'); await page.waitForTimeout(90); };
const score = () => page.textContent('#score').then(Number);
const toast = () => page.textContent('#toast');

console.log('\n— structure —');
ok('7 hexes render', await page.locator('.hex').count() === 7);
ok('exactly one centre hex', await page.locator('.hex.center').count() === 1);
ok('centre hex is the puzzle center letter', (await page.textContent('.hex.center')) === 'c');
ok('centre hex has descriptive aria-label',
   (await page.getAttribute('.hex.center', 'aria-label') || '').includes('center letter'));
ok('picker lists all 14 puzzles', await page.locator('#puzzle option').count() === 14);

console.log('\n— rejection messages (§3.5) —');
await type('inpc');           ok('too short is not the message for a 4-letter word', !(await toast()).includes('Too short'));
await page.keyboard.press('Escape');
await type('cep');            ok('"Too short"', (await toast()).includes('Too short'), await toast());
await type('printer');        ok('"Missing center letter"', (await toast()).includes('Missing center'), await toast());
await page.keyboard.press('Escape');
for (const c of 'cepiz') await page.keyboard.press(c);
await page.waitForTimeout(80);
ok('a letter outside the puzzle is not appended',
   (await page.textContent('#entry')).toLowerCase().replace(/[^a-z]/g,'') === 'cepi',
   await page.textContent('#entry'));
ok('and says so', (await toast()).includes('Letter not in this puzzle'), await toast());
await page.keyboard.press('Escape');
await type('cinet');          ok('"Not in word list"', (await toast()).includes('Not in word list'), await toast());

console.log('\n— scoring (§4) —');
await page.evaluate(() => { localStorage.clear(); });
await page.reload(); await page.waitForTimeout(250);
await page.selectOption('#puzzle', 'hc-002'); await page.waitForTimeout(200);

await type('nice');           ok('4-letter word = 1 pt', await score() === 1, 'got ' + await score());
await type('recipe');         ok('6-letter word = +6 (total 7)', await score() === 7, 'got ' + await score());
const sA = await score();
await type('receipt');        ok('7-letter non-pangram = +7+3 = 10', await score() === sA + 10, 'got +' + (await score() - sA));
const s0 = await score();
await type('precinct');       ok('8-letter pangram = +8+3+7 = 18', await score() === s0 + 18, 'got +' + (await score() - s0));
ok('pangram toast fired', (await toast()).includes('Pangram'), await toast());
const s1 = await score();
await type('intercept');      ok('9-letter pangram = +9+3+7 = 19', await score() === s1 + 19, 'got +' + (await score() - s1));
const s2 = await score();
await type('intercept');      ok('duplicate rejected, no points', await score() === s2 && (await toast()).includes('Already found'));

console.log('\n— perfect pangram —');
await page.evaluate(() => localStorage.clear());
await page.reload(); await page.waitForTimeout(250);
await page.selectOption('#puzzle', 'hc-001'); await page.waitForTimeout(200);   // P | ACILOT, capitol = perfect
await type('capitol');        ok('7-letter perfect pangram = 7+3+14 = 24 pts', await score() === 24, 'got ' + await score());

console.log('\n— rank ladder (§5) —');
ok('starts at Dabbler or better', ['Dabbler','Speller','Wordsmith'].includes(await page.textContent('#rank')));
const maxPts = Number(await page.textContent('#max'));
ok('max score shown and > 0', maxPts > 0, String(maxPts));
await page.evaluate(() => {
  const p = PUZZLES.find(x => x.id === 'hc-001');
  found = new Set(p.words); save(); renderAll();
});
await page.waitForTimeout(150);
ok('finding every word = Hive Mind', (await page.textContent('#rank')) === 'Hive Mind', await page.textContent('#rank'));
ok('full score equals stated max', await score() === maxPts);

console.log('\n— persistence (§8) —');
await page.evaluate(() => localStorage.clear());
await page.reload(); await page.waitForTimeout(250);
await page.selectOption('#puzzle', 'hc-001'); await page.waitForTimeout(200);
await type('capitol'); await type('optic');
const before = await score();
const beforeCount = await page.locator('.chip').count();
await page.reload(); await page.waitForTimeout(300);
ok('score survives reload', await score() === before, before + ' → ' + await score());
ok('found words survive reload', await page.locator('.chip').count() === beforeCount);
ok('selected puzzle survives reload', await page.inputValue('#puzzle') === 'hc-001');

// per-puzzle isolation
await page.selectOption('#puzzle', 'hc-003'); await page.waitForTimeout(200);
ok('switching puzzle starts fresh', await score() === 0, 'got ' + await score());
await page.selectOption('#puzzle', 'hc-001'); await page.waitForTimeout(200);
ok('switching back restores progress', await score() === before, 'got ' + await score());

console.log('\n— shuffle & input —');
const centreBefore = await page.textContent('.hex.center');
const ringBefore = await page.locator('.hex:not(.center)').allTextContents();
let moved = false;
for (let i = 0; i < 8 && !moved; i++) {
  await page.keyboard.press(' '); await page.waitForTimeout(60);
  const now = await page.locator('.hex:not(.center)').allTextContents();
  if (now.join('') !== ringBefore.join('')) moved = true;
}
ok('Space shuffles the outer ring', moved);
ok('center letter never moves', await page.textContent('.hex.center') === centreBefore);
ok('shuffle preserves the same six letters',
   (await page.locator('.hex:not(.center)').allTextContents()).sort().join('') === ringBefore.sort().join(''));

await page.keyboard.press('Escape');
await page.keyboard.press('a'); await page.keyboard.press('t');
await page.keyboard.press('Backspace'); await page.waitForTimeout(60);
ok('Backspace deletes one letter', (await page.textContent('#entry')).toLowerCase().replace(/[^a-z]/g,'') === 'a', await page.textContent('#entry'));
await page.keyboard.press('Escape'); await page.waitForTimeout(60);
ok('Escape clears the input', (await page.textContent('#entry')).includes('Type or tap'));

console.log('\n— clicking hexes —');
await page.click('.hex.center'); await page.waitForTimeout(60);
ok('clicking a hex appends its letter', (await page.textContent('#entry')).trim().toLowerCase().startsWith('p'));
await page.keyboard.press('Escape');

console.log('\n— reveal (§8) —');
page.on('dialog', d => d.accept());
await page.click('#reveal'); await page.waitForTimeout(200);
const total = await page.evaluate(() => puzzle.words.length);
ok('reveal shows every answer', await page.locator('.chip').count() === total,
   await page.locator('.chip').count() + ' of ' + total);
ok('unfound answers are marked', await page.locator('.chip.missed').count() > 0);
ok('reveal awards no points', await score() === before, 'got ' + await score());
await page.reload(); await page.waitForTimeout(300);
ok('reveal survives reload', await page.locator('.chip.missed').count() > 0);

console.log('\n— responsive —');
await page.setViewportSize({ width: 320, height: 700 });
await page.waitForTimeout(200);
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
ok('no horizontal overflow at 320px', overflow <= 0, 'overflow ' + overflow + 'px');
const hexBox = await page.locator('.hex.center').boundingBox();
ok('hexes still a usable size at 320px', hexBox.width >= 44 && hexBox.height >= 44,
   Math.round(hexBox.width) + '×' + Math.round(hexBox.height));

await page.setViewportSize({ width: 520, height: 900 });
await page.evaluate(() => localStorage.clear());
await page.reload(); await page.waitForTimeout(250);
await page.selectOption('#puzzle', 'hc-002'); await page.waitForTimeout(150);
for (const w of ['nice','recipe','precinct','pincer','ripen','center','entice']) await type(w);
await page.waitForTimeout(400);

await page.setViewportSize({ width: 360, height: 760 });
await page.waitForTimeout(300);


console.log('\n— self-contained & portable —');
{
  const fs = await import('fs'); const os = await import('os'); const path = await import('path');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'honeycomb-'));
  const moved = path.join(dir, 'renamed-game.html');
  fs.copyFileSync('/home/user/amals-vocab-games/spelling-bee/index.html', moved);
  const p2 = await ctx.newPage();
  const requests = [];
  p2.on('request', r => { if (!r.url().startsWith('file://')) requests.push(r.url()); });
  const errs2 = []; p2.on('pageerror', e => errs2.push(e.message));
  await p2.goto('file://' + moved);
  await p2.waitForTimeout(400);
  ok('works when copied alone to another directory and renamed',
     await p2.locator('.hex').count() === 7 && errs2.length === 0, errs2.join(' | '));
  await p2.keyboard.press('Escape');
  for (const c of 'capitol') await p2.keyboard.press(c);
  await p2.keyboard.press('Enter'); await p2.waitForTimeout(150);
  ok('and is fully playable there', Number(await p2.textContent('#score')) > 0);
  ok('makes zero network requests', requests.length === 0, requests.join(', '));
  await p2.close(); fs.rmSync(dir, { recursive: true, force: true });
}

console.log('\n— accessibility —');
{
  ok('live region present', await page.locator('[aria-live="polite"]').count() === 1);
  ok('every hex is a real button', await page.locator('button.hex').count() === 7);
  ok('progressbar exposes a value', !!(await page.getAttribute('#bar', 'aria-valuenow')));
  const labels = await page.locator('.hex').evaluateAll(ns => ns.map(n => n.getAttribute('aria-label')));
  ok('every hex has an aria-label', labels.every(Boolean), JSON.stringify(labels));
  const rm = await ctx.newPage();
  await rm.emulateMedia({ reducedMotion: 'reduce' });
  await rm.goto(PAGE); await rm.waitForTimeout(250);
  const dur = await rm.evaluate(() => getComputedStyle(document.querySelector('.hex')).transitionDuration);
  ok('reduced motion collapses transitions', parseFloat(dur) < 0.01, dur);
  await rm.close();
}

console.log('\n— runtime errors —');
ok('no uncaught JS errors', errors.length === 0, errors.join(' | '));

console.log('\n' + (fail ? `❌ ${fail} FAILED, ${pass} passed` : `✅ all ${pass} checks passed`));
await browser.close();
process.exit(fail ? 1 : 0);
