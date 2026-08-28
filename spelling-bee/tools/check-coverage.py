"""Proves no word a player would know is rejected.

This is the check that catches the original "donut" bug: a real, common word
typed into the game and refused. For every puzzle in data/bank.json it asserts

  1. every COMMON word (Zipf >= manifest required_min_zipf) that fits the seven
     letters is in that puzzle's required list
  2. every REAL word (Zipf >= bonus_min_zipf) that fits is accepted at all --
     required or bonus
  3. nothing on the blocklist appears in either list

Thresholds and the blocklist are read from the bank's own manifest, so this
checks against the standard the bank claims to meet rather than a copy that can
drift.

    pip install wordfreq && npm install word-list
    python3 tools/check-coverage.py
"""
import json, os, re, sys, time
from collections import defaultdict

try:
    from wordfreq import zipf_frequency
except ImportError:
    sys.exit("pip install wordfreq")

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
for c in (os.path.join(HERE, 'node_modules', 'word-list', 'words.txt'),
          os.path.join(ROOT, '..', 'node_modules', 'word-list', 'words.txt')):
    if os.path.exists(c):
        DICT = c
        break
else:
    sys.exit("npm install word-list")

bank = json.load(open(os.path.join(ROOT, 'data', 'bank.json')))
S = bank['manifest']['standard']
REQ, BON = S['required_min_zipf'], S['bonus_min_zipf']
MINLEN, EXCL = S['min_word_length'], S['excluded_letter']
BLOCKED = set(S['blocked_terms'])
puzzles = bank['puzzles']

t0 = time.time()
pool, freq = [], {}
for w in (x.strip() for x in open(DICT, encoding='utf-8')):
    if not re.fullmatch(r'[a-z]{%d,}' % MINLEN, w) or EXCL in w or w in BLOCKED:
        continue
    f = zipf_frequency(w, 'en')
    if f >= BON:
        pool.append(w); freq[w] = f

mask = lambda w: sum(1 << (ord(c) - 97) for c in set(w))
by = defaultdict(list)
for w in pool:
    by[mask(w)].append(w)
print(f"pool {len(pool)} words, built in {time.time()-t0:.1f}s")
print(f"standard: required Zipf >= {REQ}, accepted >= {BON}, no '{EXCL}', {MINLEN}+ letters\n")

missing_common = missing_any = blocked_hits = 0
worst = []
for p in puzzles:
    sm = mask(p['center'] + ''.join(p['outer']))
    fits, sub = [], sm
    while True:
        fits += by.get(sub, [])
        if sub == 0:
            break
        sub = (sub - 1) & sm
    fits = [w for w in fits if p['center'] in w]

    req, bon = set(p['words']), set(p.get('bonus', []))
    mc = [w for w in fits if freq[w] >= REQ and w not in req]
    ma = [w for w in fits if w not in req and w not in bon]
    bh = (req | bon) & BLOCKED

    missing_common += len(mc); missing_any += len(ma); blocked_hits += len(bh)
    if mc or ma or bh:
        worst.append((p['id'], mc[:6], ma[:6], sorted(bh)[:6]))

for pid, mc, ma, bh in worst[:12]:
    bits = []
    if mc: bits.append('COMMON words not required: ' + ' '.join(f'{w}({freq[w]:.1f})' for w in mc))
    if ma: bits.append('real words rejected: ' + ' '.join(f'{w}({freq[w]:.1f})' for w in ma))
    if bh: bits.append('blocked: ' + ' '.join(bh))
    print(f"FAIL {pid}: " + ' | '.join(bits))
if len(worst) > 12:
    print(f"… and {len(worst)-12} more puzzles with problems")

total = sum(len(p['words']) for p in puzzles)
print(f"checked {len(puzzles)} puzzles / {total} required words in {time.time()-t0:.1f}s")
print(f"  common words wrongly excluded: {missing_common}")
print(f"  real words rejected outright:  {missing_any}")
print(f"  blocked terms present:         {blocked_hits}")
ok = not (missing_common or missing_any or blocked_hits)
print('\n' + ('✅ no word a player would know is rejected' if ok else '❌ COVERAGE FAILURES'))
sys.exit(0 if ok else 1)
