import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);

const TIERS = [10, 20, 35, 40, 50, 55];
const DIALECTS = ['english', 'american'];

// ---- words excluded from every answer list ------------------------------
// Ethnic / religious / disability / sexual-orientation slurs, explicit
// vulgarities, and informal contractions that aren't really words. Ordinary
// words with ordinary meanings (tart, cock, cripple, queer) are NOT blocked --
// excluding those would just surprise players with "not in word list".
const BLOCKED = new Set([
  'kike', 'coon', 'chink', 'dago', 'gook', 'honky', 'mick', 'wetback',
  'negro', 'negroid', 'faggot', 'dyke', 'poofter',
  'retard', 'retarded', 'cretin', 'midget', 'harelip', 'halfwit',
  'fuck', 'cunt', 'twat', 'wank', 'nookie', 'whore', 'turd',
  'outta', 'gonna', 'wanna', 'gotta', 'kinda', 'lotta', 'oughta',
]);

const raw = new Set();
for (const t of TIERS) for (const d of DIALECTS) {
  let list; try { list = require(`wordlist-english/${d}-words-${t}.json`); } catch { continue; }
  for (const w of list) raw.add(w);
}
const allWords = new Set([...raw].filter(w => /^[a-z]+$/.test(w)));
const pool = [...allWords]
  .filter(w => w.length >= 4 && !w.includes('s') && !BLOCKED.has(w))
  .sort();



const maskOf = w => { let m = 0; for (const c of w) m |= 1 << (c.charCodeAt(0) - 97); return m; };
const popcount = m => { let n = 0; while (m) { m &= m - 1; n++; } return n; };

// ---- morphology: is this word just a shorter word plus a routine ending? ----
const bases = (w) => {
  const out = [];
  const strip = (n) => w.slice(0, w.length - n);
  const withE = (n) => strip(n) + 'e';
  const undouble = (n) => {
    const b = strip(n);
    return b.length > 2 && b[b.length - 1] === b[b.length - 2] ? b.slice(0, -1) : null;
  };
  const unY = (n) => strip(n) + 'y';
  for (const [suf, n] of [['ing', 3], ['ed', 2], ['er', 2], ['est', 3]]) {
    if (w.endsWith(suf) && w.length > n + 2) {
      out.push(strip(n), withE(n), undouble(n), unY(n));
    }
  }
  if (w.endsWith('ly') && w.length > 4) out.push(strip(2), unY(2), strip(2) + 'le');
  if (w.endsWith('y') && w.length > 4) out.push(strip(1), withE(1), undouble(1));
  for (const suf of ['ment', 'ness', 'able', 'ible', 'ful', 'less', 'ish', 'ion', 'ity']) {
    if (w.endsWith(suf) && w.length > suf.length + 3) out.push(strip(suf.length), strip(suf.length) + 'e');
  }
  return out.filter(Boolean);
};
const derivedCache = new Map();
const isDerived = (w) => {
  if (!derivedCache.has(w)) derivedCache.set(w, bases(w).some(b => allWords.has(b)));
  return derivedCache.get(w);
};

const byMask = new Map();
for (const w of pool) {
  const m = maskOf(w);
  if (!byMask.has(m)) byMask.set(m, []);
  byMask.get(m).push(w);
}
console.log(`pool: ${pool.length} words | derived (inflected/suffixed): ${pool.filter(isDerived).length}`);

const sets = new Set();
for (const [m] of byMask) if (popcount(m) === 7) sets.add(m);

const scoreWord = (w, setMask) => {
  const pangram = maskOf(w) === setMask;
  let s = w.length === 4 ? 1 : w.length;
  if (w.length >= 7) s += 3;
  if (pangram) s += (w.length === 7 ? 14 : 7);
  return s;
};

const candidates = [];
for (const setMask of sets) {
  const words = [];
  for (let sub = setMask; ; sub = (sub - 1) & setMask) {
    const b = byMask.get(sub); if (b) words.push(...b);
    if (sub === 0) break;
  }
  for (let bit = 0; bit < 26; bit++) {
    if (!(setMask & (1 << bit))) continue;
    const center = String.fromCharCode(97 + bit);
    const ws = words.filter(w => w.includes(center)).sort();
    if (ws.length < 25 || ws.length > 55) continue;
    const pangrams = ws.filter(w => maskOf(w) === setMask);
    if (pangrams.length < 2) continue;                       // one pangram makes the top rank a coin flip
    const derived = ws.filter(isDerived);
    const derivedFrac = derived.length / ws.length;
    if (derivedFrac > 0.42) continue;                        // reject gerund/inflection padding
    const rootLong = ws.filter(w => w.length >= 7 && !isDerived(w));
    if (rootLong.length < 6) continue;                       // needs real long-word depth
    const maxLen = Math.max(...ws.map(w => w.length));
    if (maxLen < 9) continue;
    if (ws.filter(w => w.length >= 7).length / ws.length < 0.25) continue;   // spec §6.4: 25% long
    const perfect = pangrams.some(p => p.length === 7);
    candidates.push({
      setMask, center,
      outer: [...Array(26).keys()].filter(i => (setMask & (1 << i)) && i !== bit).map(i => String.fromCharCode(97 + i)),
      words: ws, pangrams, perfect, derivedFrac,
      rootLong: rootLong.length,
      max: ws.reduce((a, w) => a + scoreWord(w, setMask), 0),
      maxLen,
      ing: (setMask & (1 << 8)) && (setMask & (1 << 13)) && (setMask & (1 << 6)),  // i,n,g all present
    });
  }
}
console.log(`qualifying puzzles: ${candidates.length}`);

const quality = p =>
  Math.min(p.pangrams.length, 4) * 9 +
  (p.perfect ? 10 : 0) +
  p.rootLong * 2.2 +
  Math.min(p.maxLen, 12) * 0.8 +
  (1 - p.derivedFrac) * 25 +
  -Math.abs(p.words.length - 38) * 0.3;
candidates.sort((a, b) => quality(b) - quality(a));

const chosen = [];
const centerUse = new Map();
let ingCount = 0;
for (const p of candidates) {
  if (chosen.length >= 14) break;
  if (chosen.some(c => popcount(c.setMask & p.setMask) >= 5)) continue;   // sets must differ by 3+ letters
  if ((centerUse.get(p.center) || 0) >= 1) continue;                      // every puzzle a different center
  if (p.ing && ingCount >= 3) continue;                                   // cap the -ING-friendly sets
  if (p.ing) ingCount++;
  centerUse.set(p.center, 1);
  chosen.push(p);
}

console.log(`\nselected ${chosen.length} puzzles:\n`);
for (const [i, p] of chosen.entries()) {
  console.log(`${String(i + 1).padStart(2)}. ${p.center.toUpperCase()} | ${p.outer.join(' ').toUpperCase()}  ` +
    `${String(p.words.length).padStart(2)}w, ${p.pangrams.length} pan${p.perfect ? '*' : ' '}, ` +
    `${p.rootLong} root-long, ${Math.round(p.derivedFrac * 100)}% derived, ${p.max} pts`);
  console.log(`    pangrams: ${p.pangrams.join(', ')}`);
  console.log(`    longest:  ${[...p.words].sort((a, b) => b.length - a.length).slice(0, 6).join(', ')}`);
}

fs.writeFileSync(new URL('./puzzles.json', import.meta.url), JSON.stringify(
  chosen.map((p, i) => ({
    id: `hc-${String(i + 1).padStart(3, '0')}`,
    center: p.center, outer: p.outer, pangrams: p.pangrams, words: p.words,
  })), null, 2));
console.log('\nwrote puzzles.json');
