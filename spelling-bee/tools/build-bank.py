"""Builds data/bank.json — the permanent puzzle bank.

Enough puzzles to rotate daily for years without repeating, so the game needs
no human maintenance. Selection at runtime is `bank[dayNumber % len(bank)]`;
nothing is generated on the Home Assistant box.

THE STANDARD a word is held to is recorded in the file's own manifest, so any
later verification checks against the same thing that built it:

  validity   -- present in the pinned reference dictionary (SCOWL-derived)
  usage      -- wordfreq Zipf frequency over a real corpus, a lineage
                independent of the dictionary: required >= 2.5, bonus >= 1.0
  structure  -- 7 distinct letters, never "s", >= 4 letters, contains the
                center letter, uses only the seven
  content    -- no term on the blocklist
  quality    -- see QUALITY below

    pip install wordfreq && npm install word-list
    python3 tools/build-bank.py
"""
import hashlib, json, os, random, re, sys, time
from collections import defaultdict

try:
    from wordfreq import zipf_frequency
    import wordfreq
except ImportError:
    sys.exit("pip install wordfreq")

def _wordfreq_version():
    try:
        from importlib.metadata import version
        return version('wordfreq')
    except Exception:
        return getattr(wordfreq, '__version__', 'unknown')

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
for c in (os.path.join(HERE, 'node_modules', 'word-list', 'words.txt'),
          os.path.join(ROOT, '..', 'node_modules', 'word-list', 'words.txt')):
    if os.path.exists(c):
        DICT = c
        break
else:
    sys.exit("npm install word-list")

REQUIRED_MIN_ZIPF = 2.5
BONUS_MIN_ZIPF    = 1.0
MIN_WORD_LEN      = 4
EXCLUDED_LETTER   = 's'
SHUFFLE_SEED      = 20260828        # fixed forever: the rotation must be reproducible

QUALITY = {
    "required_words_min": 20,
    "required_words_max": 75,
    "pangrams_min": 2,
    "long_word_share_min": 0.25,     # fraction of required words with 7+ letters
    "longest_word_min": 9,
    "derived_share_max": 0.50,       # cap on inflected/suffixed forms
    "root_long_min": 4,              # 7+ letter words that are not derived forms
}

BLOCKED = set("""
kike coon chink dago gook honky hymie injun kaffir mick paddy polack quadroon
negro negroid wetback wop yid spic pickaninny darkie darky golliwog raghead
towelhead jewed gypped gyp faggot dyke poofter tranny catamite
retard retarded cretin imbecile mongoloid midget harelip halfwit gimp spastic spaz
fuck fucked fucker cunt twat wank wanker nookie whore whored floozy
outta gonna wanna gotta kinda lotta oughta dunno cuz nuthin
""".split())

# ---------------------------------------------------------------- word pools
dict_bytes = open(DICT, 'rb').read()
DICT_SHA = hashlib.sha256(dict_bytes).hexdigest()
raw = [w.strip() for w in dict_bytes.decode('utf-8').splitlines()]
allwords = set(raw)

pool, freq = [], {}
for w in raw:
    if not re.fullmatch(r'[a-z]{%d,}' % MIN_WORD_LEN, w): continue
    if EXCLUDED_LETTER in w or w in BLOCKED: continue
    f = zipf_frequency(w, 'en')
    if f >= BONUS_MIN_ZIPF:
        pool.append(w); freq[w] = f
required_pool = {w for w in pool if freq[w] >= REQUIRED_MIN_ZIPF}
print(f"pool {len(pool)} | required-tier {len(required_pool)}")

mask = lambda w: sum(1 << (ord(c) - 97) for c in set(w))
popcount = lambda m: bin(m).count('1')

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

_dc = {}
def derived(w):
    if w not in _dc: _dc[w] = any(b in allwords for b in bases(w))
    return _dc[w]

by = defaultdict(list)
for w in pool: by[mask(w)].append(w)

def score_word(w, sm):
    s = 1 if len(w) == MIN_WORD_LEN else len(w)
    if len(w) >= 7: s += 3
    if mask(w) == sm: s += 14 if len(w) == 7 else 7
    return s

# ------------------------------------------------------- every viable puzzle
sets_ = {mask(w) for w in required_pool if len(set(w)) == 7}
print(f"candidate letter sets: {len(sets_)}")

cands = []
for sm in sets_:
    bucket, sub = [], sm
    while True:
        bucket += by.get(sub, [])
        if sub == 0: break
        sub = (sub - 1) & sm
    for bit in range(26):
        if not sm >> bit & 1: continue
        c = chr(97 + bit)
        hit = [w for w in bucket if c in w]
        req = sorted(w for w in hit if w in required_pool)
        bon = sorted(w for w in hit if w not in required_pool)
        if not QUALITY['required_words_min'] <= len(req) <= QUALITY['required_words_max']: continue
        pans = [w for w in req if mask(w) == sm]
        if len(pans) < QUALITY['pangrams_min']: continue
        long_ = [w for w in req if len(w) >= 7]
        if len(long_) / len(req) < QUALITY['long_word_share_min']: continue
        if max(len(w) for w in req) < QUALITY['longest_word_min']: continue
        if sum(derived(w) for w in req) / len(req) > QUALITY['derived_share_max']: continue
        if len([w for w in long_ if not derived(w)]) < QUALITY['root_long_min']: continue
        cands.append({
            "center": c,
            "outer": [chr(97 + i) for i in range(26) if sm >> i & 1 and i != bit],
            "pangrams": pans, "words": req, "bonus": bon, "_sm": sm,
        })
print(f"puzzles meeting the quality bar: {len(cands)}")

# --------------------------------- fixed rotation, identical letter sets spread
# 496 puzzles come from only ~212 distinct letter sets, so demanding that
# neighbours share few letters is unachievable -- and irrelevant: sharing 5 of 7
# letters with a puzzle two weeks ago is unnoticeable. What IS noticeable is the
# SAME seven letters coming round again. So group by letter set and deal them
# round-robin, which spreads each set's puzzles as far apart as the supply allows.
SAME_SET_MIN_GAP = 30        # days between two puzzles built on identical letters
NEAR_WINDOW, NEAR_OVERLAP = 7, 6

rng = random.Random(SHUFFLE_SEED)
groups = defaultdict(list)
for p in cands:
    groups[p['_sm']].append(p)
for g in groups.values():
    rng.shuffle(g)

# Greedy max-spread: at each day, take the puzzle whose letter set has gone
# unused the longest, breaking ties toward the set with the most left to place
# (so big groups drain evenly instead of bunching at the end). Deterministic.
order_keys = list(groups)
rng.shuffle(order_keys)
remaining = {k: list(groups[k]) for k in order_keys}
last_used = {k: -10**6 for k in order_keys}
ordered = []
total = sum(len(v) for v in remaining.values())
for i in range(total):
    recent = [p['_sm'] for p in ordered[-NEAR_WINDOW:]]
    def key(k):
        gap = i - last_used[k]
        near = any(popcount(k & r) >= NEAR_OVERLAP for r in recent)
        # hard priorities first: never repeat a letter set inside the min gap,
        # then avoid a 6-of-7 overlap in the recent window, then spread as far
        # as possible, then drain the biggest groups first.
        return (gap >= SAME_SET_MIN_GAP, not near, gap, len(remaining[k]))
    best = max((k for k in remaining if remaining[k]), key=key)
    ordered.append(remaining[best].pop(0))
    last_used[best] = i
    if not remaining[best]:
        del remaining[best]

same_set = sum(1 for i in range(len(ordered))
               for j in range(max(0, i - SAME_SET_MIN_GAP), i)
               if ordered[j]['_sm'] == ordered[i]['_sm'])
near = sum(1 for i in range(len(ordered))
           for j in range(max(0, i - NEAR_WINDOW), i)
           if popcount(ordered[j]['_sm'] & ordered[i]['_sm']) >= NEAR_OVERLAP)
gaps = defaultdict(list)
for i, p in enumerate(ordered):
    gaps[p['_sm']].append(i)
min_gap = min((b - a for v in gaps.values() for a, b in zip(v, v[1:])), default=None)
print(f"identical letter sets within {SAME_SET_MIN_GAP} days: {same_set}")
print(f"6-of-7 letter overlap within {NEAR_WINDOW} days: {near}")
print(f"closest repeat of any letter set: {min_gap} days apart")

puzzles = []
for i, p in enumerate(ordered):
    del p['_sm']
    p['id'] = f"p{i:04d}"
    puzzles.append({k: p[k] for k in ("id", "center", "outer", "pangrams", "words", "bonus")})

canonical = json.dumps(puzzles, sort_keys=True, separators=(',', ':'))
bank = {
    "manifest": {
        "standard": {
            "dictionary": "word-list (SCOWL-derived)",
            "dictionary_sha256": DICT_SHA,
            "dictionary_entries": len(raw),
            "frequency_source": f"wordfreq {_wordfreq_version()}",
            "required_min_zipf": REQUIRED_MIN_ZIPF,
            "bonus_min_zipf": BONUS_MIN_ZIPF,
            "min_word_length": MIN_WORD_LEN,
            "excluded_letter": EXCLUDED_LETTER,
            "blocked_terms": sorted(BLOCKED),
        },
        "quality": QUALITY,
        "rotation": {"shuffle_seed": SHUFFLE_SEED,
                     "same_set_min_gap_days": SAME_SET_MIN_GAP,
                     "near_window_days": NEAR_WINDOW, "near_overlap": NEAR_OVERLAP,
                     "day_rolls_over_at": "05:00 local"},
        "count": len(puzzles),
        "years_before_repeat": round(len(puzzles) / 365.25, 2),
        "puzzles_sha256": hashlib.sha256(canonical.encode()).hexdigest(),
        "generated_utc": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
    },
    "puzzles": puzzles,
}
dest = os.path.join(ROOT, 'data', 'bank.json')
with open(dest, 'w') as fh:
    json.dump(bank, fh, separators=(',', ':'))
print(f"\nwrote {os.path.relpath(dest, ROOT)}: {len(puzzles)} puzzles, "
      f"{os.path.getsize(dest)/1024:.0f} KB, "
      f"{bank['manifest']['years_before_repeat']} years before repeat")
print(f"puzzles_sha256 {bank['manifest']['puzzles_sha256'][:16]}…")
