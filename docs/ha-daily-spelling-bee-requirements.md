# Daily Spelling Bee — Home Assistant dashboard card

**Audience:** a coding agent building this in Home Assistant.
**Companion:** a full browser version of this game already exists in this repo at
`spelling-bee/`. Its puzzle generator and word-list rules are reusable — see §3.
Its bugs are written up in §7 and are the most important part of this document.

---

## 1. What this is

A one-line, low-space daily word puzzle on a Lovelace dashboard. No interaction —
it is a display, not a game you play on the screen.

- **06:00 local** — show today's seven letters and how many words exist.
- **17:00 local** — reveal the answers, scrolling as a ticker so they take one line.

Between 06:00 and 17:00 the card shows the puzzle line. From 17:00 to midnight it
shows the ticker. That is the whole product.

**Space budget: one dashboard row.** Roughly 48–64px tall on a wall tablet. If a
design needs two rows, it is wrong. The ticker exists specifically so 40+ answers
occupy one line instead of a list.

## 2. The two displays

### 06:00 — the puzzle line

```
I · A C L O P T — 51 words, 6 pangrams
```

- The **center letter first**, separated by a divider, then the six outer letters.
  The center letter must be visually distinct (bold, accent color, or a box) —
  it is the one that must appear in every word, and the line is useless without
  that distinction.
- Letters uppercase and spaced; they are read at a glance from across a room.
- The word count is the number of answers that will be revealed at 17:00.
  **These two numbers must be the same number.** See §7, L5.

### 17:00 — the answer ticker

```
◄ ★apolitical · ★capitol · ★occipital · ★optical · ★political · ★topical · acacia · apical · attic · cacti · calico · capita · ...
```

- All answers, single line, scrolling horizontally, continuous loop.
- Pangrams marked (bold or a leading ★) — they are the interesting ones.
- Readable speed: aim for roughly 40–60px/second. Fast enough to get through ~40
  words in under a minute, slow enough to actually read. Tune on the real device.
- The ticker must loop seamlessly, not jump back to the start.

## 3. Where the words come from

Do **not** generate word lists from a plain dictionary. See §7, L4 — this is the
bug that cost the most time.

Reuse the generator already in this repo:

```sh
pip install wordfreq && npm install word-list
python3 spelling-bee/tools/generate-puzzles.py
python3 spelling-bee/tools/check-coverage.py   # proves no common word is missing
```

Rules it already enforces, which this build inherits:

| Rule | Why |
| --- | --- |
| Validity from a ~274k dictionary | catches real words |
| Commonness from `wordfreq` Zipf, not dictionary tiers | Zipf is the only signal that separates rare-but-real (`percipient`, 1.17) from padding (`alaap`, `apoop` — both exactly 0.00) |
| Required ≥ 2.5 Zipf | the answers shown at 17:00 |
| The letter **S** never appears | otherwise every plural pads the list |
| Derived-form cap (42%) | otherwise every puzzle is an `-ING` set full of gerunds |
| Slur/vulgarity blocklist | this is a family dashboard; non-negotiable |

**For this build, show the required list only.** The browser game also has a
"bonus" list of rarer accepted words, which exists because a player can type
anything. Nothing is typed here, so bonus words would just pad the ticker.

Generate **at least a year** of puzzles ahead into a single JSON file, one entry
per date. The example below is a real puzzle from the browser version — note that
`count` is 51 and `words` has 51 entries; they are stored together precisely so
they cannot disagree (§7, L5):

```json
{
  "2026-08-25": {
    "center": "i",
    "outer": ["a", "c", "l", "o", "p", "t"],
    "count": 51,
    "pangrams": ["apolitical", "capitol", "occipital", "optical", "political", "topical"],
    "words": ["acacia", "apical", "apolitical", "attic", "cacti", "calico", "..."]
  }
}
```

Pre-generating avoids running Python on the HA box daily and makes the whole
thing inspectable. Store it at `/config/spelling_bee/puzzles.json`.

## 4. Home Assistant design

### Entities

One sensor, `sensor.spelling_bee`, with everything in **attributes**:

| Field | Where | Notes |
| --- | --- | --- |
| `state` | state | The current phase: `puzzle`, `answers`, or `idle` |
| `center`, `outer`, `count`, `pangrams` | attributes | today's puzzle |
| `words` | attributes | the answer list |
| `date` | attributes | ISO date the data is for |

**The state string is capped at 255 characters.** This is a hard Home Assistant
limit and it will silently truncate. The answer list is far longer than that, so
it must live in an attribute, never in the state. Put the *phase* in the state so
automations and card conditions can key off it cheaply.

Feed the sensor from the JSON file with a `command_line` sensor (a tiny script
that prints today's entry as JSON) or a `pyscript`/`python_script`. Either is
fine; pick one and keep it.

### Time handling

- 06:00 and 17:00 are **local wall-clock time**, and must stay correct across
  daylight-saving changes. Home Assistant time triggers are already local and
  DST-safe — use them rather than computing offsets from UTC.
- **Derive the phase from the clock on every update — do not latch it from an
  automation firing.** See §7, L3. If Home Assistant restarts at 07:30, a flag
  set by a 06:00 automation was never set, and the card is blank all morning.
  The phase must be a pure function of `now()` and the data.
- The day rolls over at midnight; between 00:00 and 06:00 the card shows nothing
  (or a muted "next puzzle at 6am").

### Immutability

**Once a date's puzzle has been displayed, it never changes.** Regenerating the
puzzle file must not alter today's or any past date's entry. Append future dates
only. See §7, L10 — changing a puzzle under a live viewer is exactly the bug that
wiped a game in the browser version.

## 5. The dashboard card

### How the space budget is met

Three separate decisions, not one:

1. **The two phases share one card slot.** They never coexist, so the morning line
   and the evening ticker cost one row between them, not two.
2. **The answers scroll on a single line** instead of wrapping. 51 words wrapped is
   a paragraph; 51 words on one scrolling line is a row.
3. **The card height is fixed and identical in both phases**, so the dashboard
   below it never moves when the content switches at 17:00.

### What Home Assistant gives you, and what it does not

**Built-in, use these:**

- **Conditional card** — shows a card only while an entity matches a state. This is
  the phase swap: one conditional on `sensor.spelling_bee` state `puzzle`, another
  on `answers`, both wrapping the same kind of card. No custom dependency.
- **Markdown card** — renders Jinja templates, so the content itself is a one-liner:
  `{{ state_attr('sensor.spelling_bee','words') | join(' · ') }}`.

**Not built-in:** there is **no native ticker, marquee, or horizontal-scroll option
in Home Assistant.** The Markdown card wraps long text down the page, which is
exactly the behaviour we are trying to avoid, and it sanitizes styling so a
`<style>` block or a `<marquee>` will not survive.

So the scrolling itself needs one of these, in preference order:

1. **card-mod** (HACS) — the standard way to inject CSS into a *built-in* card.
   Keeps the Markdown card and its templating, and adds the marquee with a
   `card_mod:` block (`white-space: nowrap`, a `@keyframes` translation on the
   inner element). This is the smallest, most idiomatic route and should be tried
   first.
2. **`custom:button-card`** (HACS) — arbitrary CSS via its `styles` block, if
   card-mod is unavailable or fights the Markdown card's shadow DOM.
3. **Server-side rotation** — a template sensor exposing a moving window of the
   list. Templates using `now()` re-render roughly once a minute, so this steps
   rather than scrolls. Genuinely worse; use only if 1 and 2 both fail.

### Consider not scrolling at all

A marquee takes about a minute to cycle 51 words, and a glanceable wall tablet is
not a good place to wait for information to come around. Two zero-motion
alternatives cost the same space and may suit the room better:

- **Tap to expand** — show `51 words · tap to reveal`, with the list behind an
  entity's more-info dialog or a HACS expander card. One row, no motion, full list
  on demand.
- **Show the interesting subset** — the pangrams and the longest few words fit on
  one static line and are most of the value.

Pick deliberately. The ticker is specified because it was asked for, not because it
is obviously the best answer.

**On ApexCharts:** allowed, but it is a charting library and this is a line of
text. Do not force the ticker into it. The one place it earns space is if you
later want a compact "words revealed" or streak visual — and even then, only if
it stays inside the one-row budget.

Card requirements:

- Legible at arm's length on the target tablet — check the real device, not a
  desktop browser at 100%.
- Works in both HA light and dark themes. Take colors from theme variables
  (`--primary-text-color`, `--accent-color`), never hardcoded hex.
- The card must not reflow or jump the rest of the dashboard when it switches
  between the puzzle line and the ticker at 17:00. Fixed height.
- Respect `prefers-reduced-motion`: if set, stop the scroll and page the answers
  instead.

## 6. Acceptance criteria

1. At 06:00 the card shows the center letter, six outer letters, and a word count.
2. The center letter is visually distinguishable from the other six.
3. At 17:00 the card switches to the scrolling answers, in place, without moving
   anything else on the dashboard.
4. **The count shown at 06:00 equals the number of words shown at 17:00.** Assert
   this in code, not by eye.
5. The ticker loops continuously and seamlessly.
6. Restarting Home Assistant at any time of day leaves the card correct for that
   time — including a restart at 07:30 and at 18:30.
7. Crossing a DST boundary keeps 06:00 and 17:00 at local wall-clock time.
8. No answer list contains a blocked word; the blocklist check runs over the
   generated file, not a sample.
9. The card occupies one dashboard row in both phases, and is the same height in
   each, so nothing below it moves at 17:00.
10. Nothing longer than 255 characters is ever written to an entity's state.
11. Regenerating the puzzle file leaves today's and all past puzzles byte-identical.
12. The card is legible on the real target device, verified by looking at it.

## 7. Lessons learned — read this before writing code

These are real failures from building the browser version, in cost order.

**L1. Never key stored state by position.**
Progress was keyed by the puzzle's index (`hc-001`…). Regenerating the puzzle set
reassigned those keys to entirely different letter sets, and a player's saved game
was silently matched against letters that were never theirs. *Here:* key
everything by **ISO date**, and store the date inside the record too, so a
mismatch is detectable rather than silent.

**L2. The read path must never write.**
Opening a puzzle called `save()`, which filtered the mismatched words down to
nothing and wrote that empty result back over the real record. Reading destroyed
the data. *Here:* the sensor/template that renders the card must be pure. Only the
scheduled generator writes. If you find yourself writing during a render, stop.

**L3. Derive state from data plus the clock — never from "an event fired".**
Anything that depends on an automation having fired is wrong after a restart, a
reload, or an HA upgrade at the wrong moment. Phase must be computable from
`now()` and the JSON alone.

**L4. One dictionary is not enough. Use frequency.**
A player typed `donut` and was told "not in word list". The word source did not
contain it at all. It also lacked `centre` (a dialect we never loaded), `crouton`,
`beignet` and `attache`. These gaps are invisible until someone hits one. Corpus
frequency (`wordfreq` Zipf) is what separates real words from dictionary padding —
padding scores exactly 0.00. *Here:* the risk is inverted — nobody types, so a
missing word just means a slightly short list — but the same generator and the
same coverage check apply, and the list still must not contain junk nobody
recognizes.

**L5. The number and the list must be the same thing.**
Showing "39 words" at 06:00 and then revealing 41 is a trust-destroying bug, and
it is an easy one: filtering, deduping, or a blocklist applied at display time
rather than generation time will do it. **Compute the count from the list you will
actually display, at generation time, and store them together.** Assert equality.

**L6. Screen the blocklist against the actual word pool, and re-screen when the
pool changes.** Widening the dictionary introduced slurs the narrower one never
contained (`golliwog`, `pickaninny`, `jewed`, `kaffir`). A blocklist written
against the old pool passed clean while the new pool was contaminated. Screen the
real data every time it changes.

**L7. Cap derived forms.** Without a cap, the highest-scoring letter sets are all
`I`+`N`+`G` sets whose long words are `-ing` padding. Puzzles look varied in the
data and identical in play.

**L8. Tests that hardcode fixtures rot silently.** Several assertions "passed"
while testing nothing, because the words they referenced had moved to a different
puzzle. Derive test fixtures from the live data. *Here:* pick the date and the
expected count out of the JSON at test time; never paste them into the test.

**L9. Prove a regression test fails before trusting it.** After fixing the
saved-game bug, the new test was run against the previous commit to confirm it
actually caught it. A green test that would have been green before the fix is
worse than no test.

**L10. Changing published content under a live viewer is a bug in itself.**
Republishing the game replaced the puzzle set mid-play. Combined with L1 it
destroyed a game in progress. *Here:* today's puzzle is frozen. Regeneration
appends future dates and touches nothing else.

**L11. Assertions do not catch visual bugs. Look at it.** The test suite was fully
green while a toast overlapped the word list and a celebration effect washed out
the letters. Both were found by screenshotting. *Here:* render the card on the
real tablet, in both themes, in both phases, and look.

## 8. Not verified here

I could not test any of this against a live Home Assistant instance. Treat the
following as needing confirmation on the target system before you rely on them:

- Whether the Markdown card's sanitizer permits the CSS needed for the marquee on
  the installed HA version (§5). Have the fallback ready.
- The exact `command_line` vs `pyscript` ergonomics for loading the JSON — both
  work in principle; pick whichever the system already uses.
- Ticker speed. 40–60px/s is a starting point, not a measured value.

Everything in §3 and §7 is verified — it comes from the working build in
`spelling-bee/` and from its test suite.
