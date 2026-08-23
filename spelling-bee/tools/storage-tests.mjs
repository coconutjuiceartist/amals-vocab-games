/* Regression tests for saved-game loss.

   A republished puzzle set once wiped an in-progress game: progress was keyed
   by the puzzle position (hc-001…), so regenerating reassigned those keys to
   different letters, and load() then filtered the mismatched words to nothing
   and saved the empty result back over the original.

     npm install playwright
     node tools/storage-tests.mjs

   Set CHROMIUM to override the browser path. */
import { chromium } from 'playwright';
const PAGE = 'file:///home/user/amals-vocab-games/spelling-bee/index.html';
let pass = 0, fail = 0;
const ok = (n, c, x='') => { c ? (pass++, console.log('  ✓ ' + n)) : (fail++, console.log('  ✗ ' + n + (x ? '  → ' + x : ''))); };
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const ctx = await b.newContext();
const p = await ctx.newPage();
p.on('pageerror', e => console.log('PAGEERROR', e.message));

console.log('\n— the reported bug: a saved game must survive a puzzle-set change —');
await p.goto(PAGE); await p.waitForTimeout(300);

// play a real game on the second puzzle
await p.selectOption('#puzzle', 'hc-002'); await p.waitForTimeout(200);
const type = async w => { await p.keyboard.press('Escape');
  for (const c of w) await p.keyboard.press(c); await p.keyboard.press('Enter'); await p.waitForTimeout(70); };
const words = await p.evaluate(() => PUZZLES.find(x => x.id === 'hc-002').words.slice(0, 5));
for (const w of words) await type(w);
const scoreBefore = await p.textContent('#score');
ok('played a game worth ' + scoreBefore + ' pts', Number(scoreBefore) > 0);

const stored = await p.evaluate(() => JSON.parse(JSON.stringify(localStorage)));
const keys = Object.keys(stored).filter(k => k.startsWith('honeycomb:progress:'));
ok('progress is keyed by letters, not position', keys.every(k => !/hc-\d+$/.test(k)), keys.join(', '));

// now simulate a regeneration: same ids, different letter sets
console.log('\n— simulating the republish that reset your game —');
await p.evaluate(() => {
  const rot = PUZZLES.map(x => x.id);
  // shuffle which id points at which letter set, exactly what regenerating does
  const sets = PUZZLES.map(x => ({ center: x.center, outer: x.outer, words: x.words, bonus: x.bonus, pangrams: x.pangrams }));
  for (let i = 0; i < PUZZLES.length; i++) Object.assign(PUZZLES[i], sets[(i + 5) % sets.length], { id: rot[i] });
});
await p.evaluate(() => { migrate(); load(PUZZLES[1].id); });
await p.waitForTimeout(200);
const afterStored = await p.evaluate(() => JSON.parse(JSON.stringify(localStorage)));
const survived = Object.keys(afterStored).filter(k => k.startsWith('honeycomb:progress:'))
  .some(k => (JSON.parse(afterStored[k]).found || []).length === 5);
ok('the original saved game still exists after the shuffle', survived,
   'stored now: ' + JSON.stringify(Object.fromEntries(Object.entries(afterStored).filter(([k]) => k.includes('progress')))).slice(0, 200));

console.log('\n— opening a puzzle must never overwrite its saved progress —');
await p.goto(PAGE); await p.waitForTimeout(300);
await p.evaluate(() => {
  localStorage.clear();
  const q = PUZZLES[3];
  const key = 'honeycomb:progress:' + q.center + '-' + [...q.outer].sort().join('');
  localStorage.setItem(key, JSON.stringify({ letters: q.center + '-' + [...q.outer].sort().join(''),
                                             found: q.words.slice(0, 4), revealed: false }));
});
await p.reload(); await p.waitForTimeout(300);
await p.selectOption('#puzzle', await p.evaluate(() => PUZZLES[3].id)); await p.waitForTimeout(200);
ok('saved words are restored on open', Number(await p.textContent('#score')) > 0, await p.textContent('#score'));
// visit every other puzzle, then come back
for (const id of await p.evaluate(() => PUZZLES.map(x => x.id))) {
  await p.selectOption('#puzzle', id); await p.waitForTimeout(45);
}
await p.selectOption('#puzzle', await p.evaluate(() => PUZZLES[3].id)); await p.waitForTimeout(200);
ok('still intact after cycling through all 14 puzzles', Number(await p.textContent('#score')) > 0,
   await p.textContent('#score'));

console.log('\n— a record written for other letters is ignored, not merged —');
await p.evaluate(() => {
  const q = PUZZLES[5];
  const key = 'honeycomb:progress:' + q.center + '-' + [...q.outer].sort().join('');
  localStorage.setItem(key, JSON.stringify({ letters: 'z-zzzzzz', found: q.words.slice(0, 3), revealed: false }));
});
await p.selectOption('#puzzle', await p.evaluate(() => PUZZLES[5].id)); await p.waitForTimeout(200);
ok('mismatched record ignored', await p.textContent('#score') === '0', await p.textContent('#score'));

console.log('\n' + (fail ? `❌ ${fail} FAILED, ${pass} passed` : `✅ all ${pass} checks passed`));
await b.close();
process.exit(fail ? 1 : 0);
