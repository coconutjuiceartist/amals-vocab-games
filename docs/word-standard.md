# The word standard

What a word must satisfy to appear in a puzzle, and how that is proved.

The point of writing this down is that "is this a real word?" is otherwise a
judgement call, and judgement calls cannot be tested. Everything below is a
mechanical rule checked by a script.

## The standard

A word appears in a puzzle only if it satisfies **all** of:

| # | Rule | Source of truth |
| --- | --- | --- |
| 1 | It is in the reference dictionary | `word-list` (SCOWL-derived), 274,137 entries, **pinned by SHA-256** |
| 2 | It is actually used in written English | `wordfreq` Zipf frequency over a real corpus |
| 3 | 4+ letters, lowercase a–z only | — |
| 4 | Contains the puzzle's center letter | — |
| 5 | Uses only the puzzle's seven letters | — |
| 6 | Contains no `s` | letter sets never include `s` |
| 7 | Is not on the blocklist | slurs, explicit vulgarities, informal non-words |

Rule 2 splits words into two tiers:

- **Required** — Zipf **≥ 2.5**. These set the word count, the maximum score, the
  ranks and the top rank.
- **Accepted (bonus)** — Zipf **≥ 1.0**. Scored the same way, never required.

Anything below Zipf 1.0 is excluded entirely.

### Why two sources, and why Zipf

Rules 1 and 2 come from **independent lineages**, which is the whole point: the
dictionary is a curated word list, while wordfreq's frequencies are measured from
corpora. A word passing both is corroborated by two different kinds of evidence.

Zipf is what makes the tiers possible. It cleanly separates rare-but-real from
dictionary padding:

| Word | Zipf | Tier |
| --- | --- | --- |
| `centre` | 4.95 | required |
| `donut` | 3.31 | required |
| `attache` | 2.55 | required |
| `crouton` | 1.94 | bonus |
| `beignet` | 1.54 | bonus |
| `percipient` | 1.17 | bonus |
| `alaap`, `apoop`, `eevn`, `rewarewa` | **0.00** | excluded |

Dictionary padding scores *exactly* zero — those strings never appear in the
corpus at all. That is the signal no single dictionary tier gave us.

### Why not one threshold

Measured across the bank: a cutoff strict enough to keep answer lists near 40
words also rejects `appall`, `attune` and `adduce` — words everyone knows. One
loose enough to accept `crouton` pushes lists past 120 words and makes the top
rank unreachable. Hence two tiers. **Rejecting a word the player knows is far
worse than including one they don't**, so accepting is generous and requiring is
strict.

## Quality bar (which puzzles are usable)

Separate from word accuracy — these decide whether a *puzzle* is worth playing:

| Rule | Value |
| --- | --- |
| Required words per puzzle | 20–75 |
| Pangrams | ≥ 2 |
| Words of 7+ letters | ≥ 25% of the required list |
| Longest word | ≥ 9 letters |
| Derived forms (`-ing`, `-ed`, `-ly`, …) | ≤ 50% |
| 7+ letter words that are *not* derived forms | ≥ 4 |

The derived-form cap exists because without it the best-scoring letter sets are
all `I`+`N`+`G` sets whose "long words" are gerund padding that takes no
vocabulary to find.

## How it is proved

Four checks. **The generator is Python and the main verifier is Node**, sharing
no code, so a bug in one cannot silently pass the other.

| Check | Proves |
| --- | --- |
| `tools/verify-bank.mjs` | every structural rule (3–7), quality bar, scoring, rotation, and that the bank matches its own SHA-256 and the pinned dictionary hash |
| `tools/check-coverage.py` | **nothing common is rejected** — for every puzzle, every dictionary word fitting the letters at Zipf ≥ 2.5 is required, and at ≥ 1.0 is at least accepted |
| `tools/rotation-tests.mjs` | the 05:00 rollover, daylight saving, determinism, full cycle |
| `tools/ha-tests.mjs` | the card itself: fit, theme, touch play, persistence |

Coverage is the one that matters most. It is the regression test for the original
bug — a player typed `donut`, a real and common word, and was told "not in word
list". It now runs over all 496 puzzles and 28,264 required words.

### The bank is self-describing

`data/bank.json` carries a manifest recording the dictionary name **and its
SHA-256**, the wordfreq version, both Zipf thresholds, the blocklist, the quality
bar, the rotation parameters, and a SHA-256 of the puzzle data itself. Verifiers
read the standard *from the manifest*, so they check the bank against what it
claims to be rather than against a copy that can drift. Swap the dictionary and
the hash check fails immediately.

## Current state

```
496 puzzles — 1.36 years before the rotation repeats
28,264 required words, 30,031 bonus
0 common words wrongly excluded
0 real words rejected outright
0 blocked terms present
```

## Known limitation

The rotation spreads letter sets so the same seven letters do not recur within 30
days. **The last 11 days of the 496-day cycle are the exception** — by then the
algorithm has run out of material and a set may repeat sooner. This is recorded
rather than hidden; the verifier asserts all such clashes fall in the final 5% of
the cycle and fails if any appear earlier.
