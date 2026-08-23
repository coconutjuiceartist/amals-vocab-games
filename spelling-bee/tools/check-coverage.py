"""The regression test for the "donut" bug.

A player typing a real, common word and being told "not in word list" is the
worst thing this game can do. This checks the shipped puzzles in index.html
against the full dictionary and asserts:

  1. every COMMON word (zipf >= 2.5) that fits a puzzle is in its required list
  2. every REAL word (zipf >= 1.0) that fits is accepted -- required or bonus
  3. no blocked term appears in either list

Run it after any change to the puzzle data:
    pip install wordfreq && npm install word-list
    python3 tools/check-coverage.py
"""
import json, os, re, sys
try:
    from wordfreq import zipf_frequency
except ImportError:
    sys.exit("pip install wordfreq")

HERE = os.path.dirname(os.path.abspath(__file__))
for cand in (os.path.join(HERE, 'node_modules', 'word-list', 'words.txt'),
             os.path.join(HERE, '..', '..', 'node_modules', 'word-list', 'words.txt')):
    if os.path.exists(cand):
        DICT = cand; break
else:
    sys.exit("npm install word-list")

REQUIRED_MIN, BONUS_MIN = 2.5, 1.0
sys.path.insert(0, HERE)
from importlib import import_module
BLOCKED = import_module('generate-puzzles'.replace('-', '_')) if False else None

# read the blocklist straight out of the generator so the two cannot drift
gen = open(os.path.join(HERE, 'generate-puzzles.py'), encoding='utf-8').read()
BLOCKED = set(re.search(r'BLOCKED = set\("""(.*?)"""', gen, re.S).group(1).split())

html = open(os.path.join(HERE, '..', 'index.html'), encoding='utf-8').read()
start = html.index('const PUZZLES = ') + len('const PUZZLES = ')
end = html.index('\n];', start) + 2
raw = html[start:end]
raw = re.sub(r'(\w+):', r'"\1":', raw)          # bare keys -> JSON
raw = re.sub(r',(\s*[\]}])', r'\1', raw)         # trailing commas
PUZZLES = json.loads(raw)

words = [w.strip() for w in open(DICT, encoding='utf-8')]
pool = [w for w in words if re.fullmatch(r'[a-z]{4,}', w) and 's' not in w and w not in BLOCKED]
freq = {w: zipf_frequency(w, 'en') for w in pool}

fails = 0
for p in PUZZLES:
    letters = set([p['center']] + p['outer'])
    req, bon = set(p['words']), set(p.get('bonus', []))
    fits = [w for w in pool if p['center'] in w and set(w) <= letters]

    missing_common = sorted(w for w in fits if freq[w] >= REQUIRED_MIN and w not in req)
    missing_any = sorted(w for w in fits
                         if freq[w] >= BONUS_MIN and w not in req and w not in bon)
    blocked_hit = sorted((req | bon) & BLOCKED)

    errs = []
    if missing_common:
        errs.append(f"{len(missing_common)} COMMON words not required: "
                    + ' '.join(f'{w}({freq[w]:.1f})' for w in missing_common[:8]))
    if missing_any:
        errs.append(f"{len(missing_any)} real words rejected outright: "
                    + ' '.join(f'{w}({freq[w]:.1f})' for w in missing_any[:8]))
    if blocked_hit:
        errs.append("blocked terms present: " + ' '.join(blocked_hit))

    head = (f"{p['id']}  {p['center'].upper()} | {''.join(p['outer']).upper()}  "
            f"{len(req):2} required + {len(bon):3} bonus")
    if errs:
        fails += 1
        print("FAIL " + head)
        for e in errs: print("      " + e)
    else:
        print("ok   " + head)

# the word that started this
rarest = min(PUZZLES[0]['words'], key=lambda w: freq.get(w, 9))
print(f"\ndonut: zipf {zipf_frequency('donut','en'):.2f} -> "
      f"{'required' if zipf_frequency('donut','en') >= REQUIRED_MIN else 'bonus'} "
      f"wherever its letters fit")
print(f"rarest required word in hc-001: {rarest} (zipf {freq.get(rarest,0):.2f})")
print(f"\n{'FAILED: ' + str(fails) + ' puzzle(s)' if fails else 'all ' + str(len(PUZZLES)) + ' puzzles: no common word is rejected'}")
sys.exit(1 if fails else 0)
