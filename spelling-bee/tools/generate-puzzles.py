"""Builds the puzzle set embedded in index.html.

Two lists per puzzle, because no single "is this word common enough" cutoff works:
too strict and the game rejects words everyone knows (appall, attune, adduce);
too loose and answer lists hit 120 words and the top rank becomes unreachable.

  words  -- REQUIRED. Sets the maximum score, the ranks, the "N to find" count,
            and the top rank. Common vocabulary only.
  bonus  -- ACCEPTED but never required. Real words that are rarer (crouton,
            beignet, percipient). They score, they just aren't needed for 100%.

Commonness comes from wordfreq's Zipf scale over a real corpus, which is the only
signal that reliably separates rare-but-real (percipient, 1.17) from dictionary
padding (alaap, apoop, eevn -- all exactly 0.00).

    pip install wordfreq
    npm install word-list
    python3 tools/generate-puzzles.py
"""
import json, os, re, sys
from collections import defaultdict

try:
    from wordfreq import zipf_frequency
except ImportError:
    sys.exit("pip install wordfreq")

HERE = os.path.dirname(os.path.abspath(__file__))
DICT = os.path.join(HERE, 'node_modules', 'word-list', 'words.txt')
if not os.path.exists(DICT):
    DICT = os.path.join(HERE, '..', '..', 'node_modules', 'word-list', 'words.txt')
if not os.path.exists(DICT):
    sys.exit("npm install word-list (looked in tools/ and the repo root)")

REQUIRED_MIN = 2.5   # common enough that the top rank stays fair
BONUS_MIN    = 1.0   # real word, just rarer; below this is dictionary padding
N_PUZZLES    = 14

# Slurs, explicit vulgarities and informal non-words. Screened against the full
# pool, not guessed. Ordinary words with ordinary meanings are deliberately NOT
# here (tart, cock, cripple, queer, moron, oriental) -- rejecting those would
# just tell an honest player "not in word list".
BLOCKED = set("""
kike coon chink dago gook honky hymie injun kaffir mick paddy polack quadroon
negro negroid wetback wop yid spic pickaninny darkie darky golliwog raghead
towelhead jewed gypped gyp faggot dyke poofter tranny catamite
retard retarded cretin imbecile mongoloid midget harelip halfwit gimp spastic spaz
fuck fucked fucker cunt twat wank wanker nookie whore whored floozy
outta gonna wanna gotta kinda lotta oughta dunno cuz nuthin
""".split())

# ---------------------------------------------------------------- word pools
raw = [w.strip() for w in open(DICT, encoding='utf-8')]
pool, freq = [], {}
for w in raw:
    if not re.fullmatch(r'[a-z]{4,}', w) or 's' in w or w in BLOCKED:
        continue
    f = zipf_frequency(w, 'en')
    if f >= BONUS_MIN:
        pool.append(w)
        freq[w] = f
required_pool = {w for w in pool if freq[w] >= REQUIRED_MIN}
print(f"pool {len(pool)} words (zipf>={BONUS_MIN}), of which {len(required_pool)} "
      f"are common enough to require (zipf>={REQUIRED_MIN})")

mask = lambda w: sum(1 << (ord(c) - 97) for c in set(w))
allwords = set(raw)

# ------------------------------------------------- morphology (derived forms)
def bases(w):
    out, n = [], len(w)
    for suf, k in (('ing', 3), ('ed', 2), ('er', 2), ('est', 3)):
        if w.endswith(suf) and n > k + 2:
            b = w[:-k]
            out += [b, b + 'e', b[:-1] if len(b) > 2 and b[-1] == b[-2] else None, b + 'y']
    if w.endswith('ly') and n > 4: out += [w[:-2], w[:-2] + 'y', w[:-2] + 'le']
    if w.endswith('y') and n > 4:  out += [w[:-1], w[:-1] + 'e']
    for suf in ('ment', 'ness', 'able', 'ible', 'ful', 'less', 'ish', 'ion', 'ity'):
        if w.endswith(suf) and n > len(suf) + 3: out += [w[:-len(suf)], w[:-len(suf)] + 'e']
    return [b for b in out if b]

_dcache = {}
def derived(w):
    if w not in _dcache:
        _dcache[w] = any(b in allwords for b in bases(w))
    return _dcache[w]

# ------------------------------------------------------------ index by letters
by_mask = defaultdict(list)
for w in pool:
    by_mask[mask(w)].append(w)

def score(w, sm):
    s = 1 if len(w) == 4 else len(w)
    if len(w) >= 7: s += 3
    if mask(w) == sm: s += 14 if len(w) == 7 else 7
    return s

# candidate letter sets: any COMMON word with exactly 7 distinct letters, so
# every puzzle is guaranteed a pangram people have actually heard of
sets_ = {mask(w) for w in required_pool if len(set(w)) == 7}
print(f"candidate letter sets: {len(sets_)}")

cands = []
for sm in sets_:
    bucket, sub = [], sm
    while True:
        bucket += by_mask.get(sub, [])
        if sub == 0: break
        sub = (sub - 1) & sm
    for bit in range(26):
        if not sm >> bit & 1: continue
        c = chr(97 + bit)
        hit = [w for w in bucket if c in w]
        req = sorted(w for w in hit if w in required_pool)
        bon = sorted(w for w in hit if w not in required_pool)
        if not 25 <= len(req) <= 60: continue
        pans = [w for w in req if mask(w) == sm]
        if len(pans) < 2: continue
        long_ = [w for w in req if len(w) >= 7]
        if len(long_) / len(req) < 0.25: continue
        if max(len(w) for w in req) < 9: continue
        dfrac = sum(derived(w) for w in req) / len(req)
        if dfrac > 0.42: continue
        rootlong = [w for w in long_ if not derived(w)]
        if len(rootlong) < 6: continue
        cands.append(dict(
            sm=sm, center=c,
            outer=[chr(97 + i) for i in range(26) if sm >> i & 1 and i != bit],
            words=req, bonus=bon, pangrams=pans,
            perfect=any(len(p) == 7 for p in pans),
            dfrac=dfrac, rootlong=len(rootlong),
            max=sum(score(w, sm) for w in req),
            maxlen=max(len(w) for w in req),
            ing=all(sm >> b & 1 for b in (8, 13, 6)),
        ))
print(f"qualifying puzzles: {len(cands)}")

quality = lambda p: (min(len(p['pangrams']), 4) * 9 + (10 if p['perfect'] else 0)
                     + p['rootlong'] * 2.2 + min(p['maxlen'], 12) * 0.8
                     + (1 - p['dfrac']) * 25 - abs(len(p['words']) - 38) * 0.3)
cands.sort(key=quality, reverse=True)

from collections import Counter
chosen, centers, ings = [], Counter(), 0
popcount = lambda m: bin(m).count('1')
for p in cands:
    if len(chosen) >= N_PUZZLES: break
    if any(popcount(c['sm'] & p['sm']) >= 5 for c in chosen): continue
    if centers[p['center']] >= 2: continue
    if p['ing'] and ings >= 3: continue
    if p['ing']: ings += 1
    centers[p['center']] += 1
    chosen.append(p)

for i, p in enumerate(chosen, 1):
    print(f"{i:2}. {p['center'].upper()} | {''.join(p['outer']).upper()}  "
          f"{len(p['words']):2} required + {len(p['bonus']):3} bonus, "
          f"{len(p['pangrams'])} pangram(s){'*' if p['perfect'] else ''}, {p['max']} pts")
    print(f"    pangrams: {', '.join(p['pangrams'])}")

out = [dict(id=f"hc-{i:03d}", center=p['center'], outer=p['outer'],
            pangrams=p['pangrams'], words=p['words'], bonus=p['bonus'])
       for i, p in enumerate(chosen, 1)]
dest = os.path.join(HERE, 'puzzles.json')
json.dump(out, open(dest, 'w'), indent=2)
print(f"\nwrote {dest}")
