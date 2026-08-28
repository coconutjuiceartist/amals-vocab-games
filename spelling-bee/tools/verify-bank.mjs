/* Verifies data/bank.json against the standard recorded in its own manifest.

   Deliberately written in Node while the generator is Python: they share no
   code, so a bug in one cannot silently pass the other. Everything it needs is
   either in the bank file or in the pinned dictionary — no wordfreq, no npm
   dependencies. Corpus-frequency coverage is checked separately by
   check-coverage.py, which is the one thing that genuinely needs wordfreq.

     node tools/verify-bank.mjs
*/
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const bank = JSON.parse(fs.readFileSync(path.join(root, 'data', 'bank.json'), 'utf8'));
const { manifest, puzzles } = bank;
const S = manifest.standard, Q = manifest.quality, R = manifest.rotation;

let fails = 0, checks = 0;
const problems = [];
const check = (name, ok, detail = '') => {
  checks++;
  if (ok) return true;
  fails++; problems.push(`${name}${detail ? ' — ' + detail : ''}`);
  return false;
};

/* ---------- 1. the file describes the standard it was built to ---------- */
for (const k of ['dictionary', 'dictionary_sha256', 'frequency_source', 'required_min_zipf',
                 'bonus_min_zipf', 'min_word_length', 'excluded_letter', 'blocked_terms']) {
  check(`manifest.standard.${k} present`, S[k] !== undefined);
}
check('manifest records a puzzle count matching the array',
      manifest.count === puzzles.length, `${manifest.count} vs ${puzzles.length}`);

/* ---------- 2. the puzzles are the ones that were signed ---------- */
const canonical = JSON.stringify(puzzles.map(p => Object.fromEntries(
  Object.keys(p).sort().map(k => [k, p[k]]))), null, 0);
const digest = crypto.createHash('sha256').update(canonical).digest('hex');
check('puzzles_sha256 matches the puzzle data', digest === manifest.puzzles_sha256,
      `recomputed ${digest.slice(0, 16)}… vs recorded ${String(manifest.puzzles_sha256).slice(0, 16)}…`);

/* ---------- 3. the dictionary is the pinned one ---------- */
let DICT = null;
for (const c of [path.join(here, 'node_modules', 'word-list', 'words.txt'),
                 path.join(root, '..', 'node_modules', 'word-list', 'words.txt')]) {
  if (fs.existsSync(c)) { DICT = c; break; }
}
let lexicon = null;
if (DICT) {
  const buf = fs.readFileSync(DICT);
  const sha = crypto.createHash('sha256').update(buf).digest('hex');
  check('local dictionary matches manifest.dictionary_sha256', sha === S.dictionary_sha256,
        `${sha.slice(0, 16)}… vs ${String(S.dictionary_sha256).slice(0, 16)}…`);
  lexicon = new Set(buf.toString('utf8').split('\n').map(w => w.trim()));
} else {
  console.log('note: dictionary not present locally — skipping validity cross-check');
}

/* ---------- 4. every puzzle, every word ---------- */
const BLOCKED = new Set(S.blocked_terms);
const setOf = p => new Set([p.center, ...p.outer]);
const usesAll = (w, set) => { const s = new Set(w); return s.size === set.size && [...set].every(c => s.has(c)); };
const scoreWord = (w, set) => {
  let s = w.length === S.min_word_length ? 1 : w.length;
  if (w.length >= 7) s += 3;
  if (usesAll(w, set)) s += (w.length === 7 ? 14 : 7);
  return s;
};

const ids = new Set();
let notInLexicon = 0, blockedHits = 0, structural = 0, quality = 0;

for (const p of puzzles) {
  const where = `${p.id} ${p.center.toUpperCase()}|${p.outer.join('').toUpperCase()}`;
  const set = setOf(p);
  const bonus = p.bonus || [];

  if (ids.has(p.id)) { check(`${where}: unique id`, false); }
  ids.add(p.id);

  let bad = [];
  if (!/^[a-z]$/.test(p.center)) bad.push('center is not one lowercase letter');
  if (p.outer.length !== 6 || new Set(p.outer).size !== 6) bad.push('outer is not 6 distinct letters');
  if (p.outer.includes(p.center)) bad.push('center repeated in outer');
  if (set.size !== 7) bad.push(`letter set has ${set.size} letters`);
  if (set.has(S.excluded_letter)) bad.push(`contains the excluded letter "${S.excluded_letter}"`);

  const seen = new Set();
  for (const [list, label] of [[p.words, 'required'], [bonus, 'bonus']]) {
    for (const w of list) {
      if (!new RegExp(`^[a-z]{${S.min_word_length},}$`).test(w)) bad.push(`${label} "${w}" malformed`);
      if (!w.includes(p.center)) bad.push(`${label} "${w}" lacks the center letter`);
      for (const c of w) if (!set.has(c)) bad.push(`${label} "${w}" uses "${c}" outside the set`);
      if (seen.has(w)) bad.push(`"${w}" appears twice`);
      seen.add(w);
      if (BLOCKED.has(w)) { bad.push(`blocked term "${w}"`); blockedHits++; }
      if (lexicon && !lexicon.has(w)) { bad.push(`"${w}" is not in the pinned dictionary`); notInLexicon++; }
    }
  }

  // pangram lists must agree in both directions, over the required list
  for (const g of p.pangrams) {
    if (!p.words.includes(g)) bad.push(`pangram "${g}" missing from words`);
    if (!usesAll(g, set)) bad.push(`"${g}" listed as pangram but does not use all seven`);
  }
  for (const w of p.words) {
    if (usesAll(w, set) && !p.pangrams.includes(w)) bad.push(`"${w}" is a pangram but unlisted`);
  }
  if (bad.length) { structural++; problems.push(`${where}: ${bad.slice(0, 4).join('; ')}${bad.length > 4 ? ` (+${bad.length - 4})` : ''}`); }

  // quality bar (the heuristics the generator selected on)
  const q = [];
  const long = p.words.filter(w => w.length >= 7).length;
  if (p.words.length < Q.required_words_min || p.words.length > Q.required_words_max)
    q.push(`${p.words.length} required words`);
  if (p.pangrams.length < Q.pangrams_min) q.push(`${p.pangrams.length} pangrams`);
  if (long / p.words.length < Q.long_word_share_min)
    q.push(`${Math.round(long / p.words.length * 100)}% long`);
  if (Math.max(...p.words.map(w => w.length)) < Q.longest_word_min)
    q.push(`longest is ${Math.max(...p.words.map(w => w.length))}`);
  if (q.length) { quality++; problems.push(`${where}: quality — ${q.join(', ')}`); }
}
checks += puzzles.length;
check('every word is in the pinned dictionary', notInLexicon === 0, `${notInLexicon} not found`);
check('no blocked term appears anywhere', blockedHits === 0, `${blockedHits} found`);
check('no structural violations', structural === 0, `${structural} puzzles`);
check('every puzzle meets the quality bar', quality === 0, `${quality} puzzles`);

/* ---------- 5. scoring is well defined ---------- */
{
  const sample = { center: 't', outer: ['a', 'c', 'i', 'l', 'r', 'u'] };
  const set = setOf(sample);
  const expect = { curt: 1, ritual: 6, titular: 10, articular: 19, curtail: 24 };
  let ok = true;
  for (const [w, want] of Object.entries(expect)) {
    if (scoreWord(w, set) !== want) { ok = false; problems.push(`scoring: ${w} = ${scoreWord(w, set)}, expected ${want}`); }
  }
  check('scoring matches the five worked examples', ok);
  const anyNaN = puzzles.some(p => !Number.isFinite(p.words.reduce((a, w) => a + scoreWord(w, setOf(p)), 0)));
  check('every puzzle has a finite maximum score', !anyNaN);
}

/* ---------- 6. rotation ---------- */
{
  // the seven letters, ignoring which one is the center: that is what a
  // player recognises as "this puzzle again"
  const setKey = p => [p.center, ...p.outer].sort().join('');
  const exactKey = p => p.center + ':' + [...p.outer].sort().join('');
  const keys = puzzles.map(setKey);
  const exact = puzzles.map(exactKey);
  check('no puzzle is duplicated outright anywhere in the bank',
        new Set(exact).size === exact.length,
        `${exact.length - new Set(exact).size} duplicates`);
  let sameSet = [], near = [];
  const letters = puzzles.map(p => setOf(p));
  for (let i = 0; i < puzzles.length; i++) {
    for (let j = Math.max(0, i - R.same_set_min_gap_days); j < i; j++)
      if (keys[i] === keys[j]) sameSet.push(i);
    for (let j = Math.max(0, i - R.near_window_days); j < i; j++) {
      const shared = [...letters[i]].filter(c => letters[j].has(c)).length;
      if (shared >= R.near_overlap) near.push(i);
    }
  }
  const tail = Math.floor(puzzles.length * 0.95);
  check(`no identical letter set within ${R.same_set_min_gap_days} days, outside the final 5%`,
        sameSet.every(i => i >= tail), `${sameSet.filter(i => i < tail).length} early clashes`);
  check(`no 6-of-7 overlap within ${R.near_window_days} days, outside the final 5%`,
        near.every(i => i >= tail), `${near.filter(i => i < tail).length} early clashes`);
  console.log(`rotation: ${puzzles.length} puzzles (${manifest.years_before_repeat} years), ` +
              `${sameSet.length} same-set and ${near.length} near clashes, all at positions ` +
              `${Math.min(...[...sameSet, ...near, Infinity])}+ of ${puzzles.length}`);
}

/* ---------- 7. the shipped Home Assistant file carries this exact bank ---------- */
{
  const haPath = path.join(root, 'ha', 'honeycomb.html');
  if (fs.existsSync(haPath)) {
    const ha = fs.readFileSync(haPath, 'utf8');
    const at = ha.indexOf('const PUZZLES = ');
    let embeddedSha = null;
    if (at >= 0) {
      const tail = ha.slice(at + 'const PUZZLES = '.length);
      try {
        const arr = JSON.parse(tail.slice(0, tail.indexOf(';\n')));
        const canon = JSON.stringify(arr.map(p => Object.fromEntries(
          Object.keys(p).sort().map(k => [k, p[k]]))), null, 0);
        embeddedSha = crypto.createHash('sha256').update(canon).digest('hex');
      } catch { /* leave null */ }
    }
    check('ha/honeycomb.html embeds exactly this bank',
          embeddedSha === manifest.puzzles_sha256,
          embeddedSha ? `${embeddedSha.slice(0, 16)}… vs ${manifest.puzzles_sha256.slice(0, 16)}… — run node tools/build-ha.mjs`
                      : 'could not read the embedded array');
  }
}

/* ---------- report ---------- */
console.log(`\ndictionary  ${S.dictionary} — ${S.dictionary_entries} entries`);
console.log(`frequency   ${S.frequency_source} — required Zipf >= ${S.required_min_zipf}, bonus >= ${S.bonus_min_zipf}`);
console.log(`built       ${manifest.generated_utc}`);
console.log(`words       ${puzzles.reduce((a, p) => a + p.words.length, 0)} required, ` +
            `${puzzles.reduce((a, p) => a + (p.bonus || []).length, 0)} bonus`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems.slice(0, 25)) console.log('  ' + p);
  if (problems.length > 25) console.log(`  … and ${problems.length - 25} more`);
}
console.log(`\n${fails ? `❌ ${fails} of ${checks} checks FAILED` : `✅ all ${checks} checks passed`}`);
process.exit(fails ? 1 : 0);
