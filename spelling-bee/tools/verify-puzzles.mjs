/* Checks every puzzle embedded in index.html against the nine invariants in
   docs/spelling-bee-requirements.md section 6.4 (including the bonus list), plus the scoring worked
   examples in section 4. No dependencies -- run: node tools/verify-puzzles.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(here, '..', 'index.html'), 'utf8');

const start = html.indexOf('const PUZZLES = ');
const end = html.indexOf('\n];', start);
if (start < 0 || end < 0) { console.error('could not find the PUZZLES array'); process.exit(1); }
const PUZZLES = eval(html.slice(start + 'const PUZZLES = '.length, end + 3));

const genSrc = fs.readFileSync(path.join(here, 'generate-puzzles.py'), 'utf8');
const BLOCKED = new Set(
  genSrc.match(/BLOCKED = set\(\"\"\"([\s\S]*?)\"\"\"/)[1].trim().split(/\s+/)
);

const maskOf = w => [...w].reduce((m, c) => m | (1 << (c.charCodeAt(0) - 97)), 0);
const scoreWord = (w, setMask) => {
  let s = w.length === 4 ? 1 : w.length;
  if (w.length >= 7) s += 3;
  if (maskOf(w) === setMask) s += (w.length === 7 ? 14 : 7);
  return s;
};

let failures = 0;
const ids = new Set();

for (const p of PUZZLES) {
  const errs = [];
  const set = new Set([p.center, ...p.outer]);
  const setMask = maskOf([...set].join(''));

  // 1 / 2  shape of the letter set
  if (typeof p.center !== 'string' || p.center.length !== 1) errs.push('center is not one letter');
  if (p.outer.length !== 6 || new Set(p.outer).size !== 6) errs.push('outer is not 6 distinct letters');
  if (p.outer.includes(p.center)) errs.push('center also appears in outer');
  if (set.has('s')) errs.push('letter set contains "s"');

  // 3 / 4  every answer is well formed
  for (const w of p.words) {
    if (!/^[a-z]{4,}$/.test(w)) errs.push(`"${w}" is not lowercase a-z, 4+ letters`);
    if (!w.includes(p.center)) errs.push(`"${w}" does not contain the center letter`);
    for (const c of w) if (!set.has(c)) errs.push(`"${w}" uses "${c}", outside the set`);
  }
  if (new Set(p.words).size !== p.words.length) errs.push('duplicate answers');

  // 5 / 6  the two pangram lists agree in both directions
  for (const g of p.pangrams) {
    if (!p.words.includes(g)) errs.push(`pangram "${g}" missing from words`);
    if (maskOf(g) !== setMask) errs.push(`"${g}" listed as a pangram but does not use all 7`);
  }
  for (const w of p.words) {
    if (maskOf(w) === setMask && !p.pangrams.includes(w)) errs.push(`"${w}" is a pangram but is not listed`);
  }

  // 7  the puzzle is worth playing
  const long = p.words.filter(w => w.length >= 7).length;
  const pct = long / p.words.length;
  const maxLen = Math.max(...p.words.map(w => w.length));
  if (p.words.length < 25 || p.words.length > 60) errs.push(`${p.words.length} answers, want 25-60`);
  if (pct < 0.25) errs.push(`${Math.round(pct * 100)}% of answers are 7+ letters, want 25%`);
  if (maxLen < 9) errs.push(`longest answer is ${maxLen} letters, want 9+`);
  if (p.pangrams.length < 1) errs.push('no pangram');

  // 8  unique id
  if (ids.has(p.id)) errs.push(`duplicate id ${p.id}`);
  ids.add(p.id);

  // 9  nothing from the blocklist, in either list
  for (const w of [...p.words, ...(p.bonus || [])]) {
    if (BLOCKED.has(w)) errs.push(`blocked word "${w}"`);
  }

  // 10  bonus words are well formed and disjoint from the required list
  const reqSet = new Set(p.words);
  for (const w of p.bonus || []) {
    if (!/^[a-z]{4,}$/.test(w)) errs.push(`bonus "${w}" is malformed`);
    if (!w.includes(p.center)) errs.push(`bonus "${w}" lacks the center letter`);
    for (const c of w) if (!set.has(c)) errs.push(`bonus "${w}" uses "${c}", outside the set`);
    if (reqSet.has(w)) errs.push(`"${w}" is in both words and bonus`);
  }

  const max = p.words.reduce((a, w) => a + scoreWord(w, setMask), 0);
  const head = `${p.id}  ${p.center.toUpperCase()} | ${p.outer.join('').toUpperCase()}  ` +
    `${String(p.words.length).padStart(2)} req + ${String((p.bonus||[]).length).padStart(3)} bonus, ` +
    `${p.pangrams.length} pangram(s), ` +
    `${String(Math.round(pct * 100)).padStart(2)}% long, ${String(max).padStart(3)} pts`;
  console.log(errs.length ? `FAIL ${head}\n     ${errs.join('\n     ')}` : `ok   ${head}`);
  if (errs.length) failures++;
}

// the worked examples from requirements section 4
const sample = { center: 't', outer: ['a', 'c', 'i', 'l', 'r', 'u'] };
const sm = maskOf([sample.center, ...sample.outer].join(''));
const expected = { curt: 1, ritual: 6, titular: 10, articular: 19, curtail: 24 };
let scoreFails = 0;
for (const [w, want] of Object.entries(expected)) {
  const got = scoreWord(w, sm);
  if (got !== want) { console.log(`FAIL scoring: ${w} = ${got}, spec says ${want}`); scoreFails++; }
}
console.log(scoreFails ? '' : `\nscoring matches all ${Object.keys(expected).length} worked examples in section 4`);

console.log(failures || scoreFails
  ? `\n${failures} puzzle(s) and ${scoreFails} score(s) FAILED`
  : `\nall ${PUZZLES.length} puzzles pass all ten invariants`);
process.exit(failures || scoreFails ? 1 : 0);
