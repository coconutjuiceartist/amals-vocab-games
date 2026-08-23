# Honeycomb — Requirements

A standalone Spelling Bee–style word game for adults.

*Status: requirements draft. No code has been written yet — this document is the
specification the app will be built from.*

---

## 1. Overview and goals

**Honeycomb** is a single-page word game. Seven letters are arranged as a hexagon of
hexagons: one **center** letter in the middle, six **outer** letters around it. The player
spells words using only those seven letters, and every word must contain the center
letter. Letters may be reused freely. Points are awarded by word length, with large
bonuses for words that use all seven letters.

The audience is **adults with a strong vocabulary**. That single fact drives most of the
decisions in this document:

- **Scoring rewards depth, not volume.** A nine-letter word is worth roughly a dozen
  four-letter words. Grinding out every short word should feel like the slow path.
- **Letter sets are chosen to surface uncommon words**, not to maximise the raw answer
  count. A puzzle whose answer list is 80% four-letter words is a bad puzzle here even if
  it is a fine puzzle for a child.
- **The top rank requires every single word.** There is no "you basically finished" tier
  at 70%.

This game is deliberately *not* part of the kids' Next.js app in this repository. It ships
as its own self-contained page (see §9).

## 2. Non-goals

The following are explicitly out of scope for the first build:

- No user accounts, no backend, no database, no analytics.
- No multiplayer, leaderboards, or sharing.
- No live dictionary or definitions API. All puzzle data is bundled (§6).
- No build step, bundler, transpiler, or npm dependency.
- No integration with the Next.js app: no entry in `data/games.js`, no route under
  `app/games/`, no appearance on the kid player dashboards.
- **No New York Times branding, rank names, artwork, wordmarks, or puzzle data.** The rank
  ladder in §5 and every letter set and answer list in §6 must be original to this
  project. This is a requirement, not a preference.

## 3. Core gameplay rules

### 3.1 The letter set

- Exactly seven distinct letters: one center letter, six outer letters.
- **The letter `s` is never used**, in either position. Allowing `s` would let the player
  pad the score with plurals of every noun in the puzzle, which works directly against the
  goal of rewarding harder words.
- The six outer letters are displayed in a ring around the center hex. The center hex is
  visually distinguished (accent fill) so the required letter is unmistakable.

### 3.2 Valid words

A submitted word is accepted only if **all** of the following hold:

1. It is at least **4 letters** long.
2. It contains the **center letter** at least once.
3. Every letter in it comes from the seven-letter set. Letters may repeat any number of
   times.
4. It appears in the current puzzle's bundled answer list (§6).
5. It has not already been found this session.

Answer lists themselves exclude proper nouns, hyphenated and multi-word entries,
abbreviations, and offensive words.

### 3.3 Pangrams

- A **pangram** is an accepted word that uses all seven letters at least once.
- A **perfect pangram** is a pangram that is exactly 7 letters long — each letter used
  exactly once.

Every puzzle contains at least one pangram (§6.3).

### 3.4 Input

- **Click or tap** a hex to append its letter to the current input.
- **Type** on a physical keyboard to do the same. Keystrokes for letters not in the puzzle
  are rejected with the "not in this puzzle" feedback rather than silently ignored.
- **Enter** submits the current input.
- **Backspace** or **Delete** removes the last letter. A **Delete** button provides the
  same action for touch users.
- **Space**, or a **Shuffle** button, randomly reorders the six outer letters. The center
  letter never moves.
- **Escape** clears the current input entirely.

### 3.5 Feedback on submission

Rejections must be specific — a single generic "not a word" message is not acceptable,
because distinguishing "I misspelled it" from "that word isn't in this puzzle's list"
matters to the player. Each of these produces its own distinct message:

| Condition | Message |
| --- | --- |
| Fewer than 4 letters | Too short |
| Missing the center letter | Missing center letter |
| Contains a letter outside the set | Letter not in this puzzle |
| Valid shape, not in the answer list | Not in word list |
| Already found | Already found |
| Accepted | The word, plus points gained |
| Accepted pangram | Pangram! plus points gained |

Accepted words animate into the found-word list. Rejected input shakes and is left in the
input field so the player can edit rather than retype.

## 4. Scoring

| Word | Points |
| --- | --- |
| 4 letters | 1 |
| 5–6 letters | 1 per letter (so 5 or 6) |
| 7 or more letters | 1 per letter **+ 3** long-word bonus |
| Pangram | **+7** on top of the length score |
| Perfect pangram | **+14** on top of the length score (replaces the +7, does not stack) |

Worked examples, using the sample puzzle from §6.2 (center `T`; outer `A C I L R U`):

| Word | Length score | Bonuses | Total |
| --- | --- | --- | --- |
| `curt` | 1 | — | **1** |
| `ritual` | 6 | — | **6** |
| `titular` | 7 + 3 | — | **10** |
| `articular` | 9 + 3 | +7 pangram | **19** |
| `curtail` | 7 + 3 | +14 perfect pangram | **24** |

The intended consequence, stated plainly so it survives future tweaks: **one `curtail` is
worth twenty-four `curt`s.** Any change to this table should preserve that ratio between
the hardest find and the easiest one.

A puzzle's **maximum score** is the sum of the scores of every word in its answer list.
It is computed at load time from the answer list, never hand-written into the data.

## 5. Rank ladder

Rank is a function of the player's current score as a percentage of that puzzle's maximum
score. Thresholds are recomputed per puzzle.

| Rank | Threshold (% of max) |
| --- | --- |
| Dabbler | 0% |
| Speller | 3% |
| Wordsmith | 10% |
| Cruciverbalist | 20% |
| Lexicographer | 32% |
| Etymologist | 48% |
| Polymath | 70% |
| Hive Mind | 100% |

Requirements:

- **Hive Mind requires every word in the list.** No rounding, no "close enough".
- Polymath sits at 70% deliberately — higher than the equivalent tier in casual clones,
  because the audience is adults.
- The UI shows the current rank, a progress bar across the ladder, and the points needed
  to reach the next rank.
- Reaching a new rank is announced visibly and to screen readers (§10).

## 6. Puzzle content

### 6.1 Shape of the set

- A fixed, curated, bundled set of puzzles. **At least 12** ship with the first build.
- Puzzles live in `spelling-bee/puzzles.js` and are extended by appending entries; nothing
  else in the app should need editing to add a puzzle.
- The player can pick any puzzle from a list. The default selection on first visit is
  derived deterministically from the current date, so there is a natural "today's puzzle"
  without a server: `puzzles[daysSinceEpoch % puzzles.length]`.

### 6.2 Data schema

```js
// spelling-bee/puzzles.js
const PUZZLES = [
  {
    id: "hc-001",
    center: "t",
    outer: ["a", "c", "i", "l", "r", "u"],
    pangrams: ["curtail", "articular"],
    words: [
      "actual", "articular", "attic", "circuit", "critical", "cult", "cultural",
      "curt", "curtail", "ritual", "tacit", "tactual", "titular", "tract",
      "trail", "trial"
      // ...full answer list
    ]
  }
  // ...more puzzles
];
```

Notes on the schema:

- `words` is the complete list of accepted answers and **includes** every pangram.
- `pangrams` exists only so the app can flag them for the bonus and the celebration; it is
  redundant with `words` by design, and §6.4 requires the two to agree.
- Everything is lowercase. Display casing is the UI's job.
- No score, maximum, or rank data is stored — all of it is derived (§4, §5).

### 6.3 How letter sets are chosen

This is where adult difficulty is actually enforced. Every puzzle must satisfy:

- **At least one pangram**; two or more is preferred, since a puzzle with a single pangram
  makes Hive Mind hinge on one lucky find.
- **A target answer count of 25–60 words.** Below 25 the puzzle is thin; above 60 it turns
  into an endurance exercise in short words.
- **At least 25% of answers are 7+ letters**, and at least one answer is 9+ letters. This
  is the concrete lever that makes the scoring in §4 pay off.
- **No `s`** anywhere in the set (§3.1).
- Prefer centers and letter combinations that produce uncommon words — sets built around
  letters like `c`, `g`, `v`, `p`, `h` with one or two vowels tend to yield richer, less
  obvious answer lists than vowel-heavy sets built around `r`, `n`, `t`.
- Avoid sets whose answer list is dominated by conjugations of one verb stem.

### 6.4 Answer-list invariants

Every puzzle in `puzzles.js` must satisfy all of the following. These are stated as
mechanical checks so they can be verified by a script rather than by reading:

1. `center` is a single lowercase letter; `outer` has exactly 6 distinct lowercase letters;
   `center` is not among them.
2. Neither `center` nor `outer` contains `s`.
3. Every entry in `words` is lowercase, ≥ 4 letters, contains `center`, and uses only the
   seven letters of the set.
4. `words` contains no duplicates.
5. Every entry in `pangrams` also appears in `words`, and genuinely uses all seven letters.
6. Every word in `words` that uses all seven letters also appears in `pangrams` — the two
   lists agree in both directions.
7. `words` has between 25 and 60 entries, at least 25% of them 7+ letters, and at least one
   9+ letters.
8. `id` is unique across the file.

## 7. UI and interaction

### 7.1 Layout

A single column, centered, max width around 480px on desktop, with these regions top to
bottom:

1. **Header** — game name, and the puzzle picker (a `<select>` listing puzzle ids and their
   letter sets).
2. **Score and rank** — current score, current rank name, a progress bar across the ladder,
   and the points to the next rank.
3. **Found words** — a count ("14 words, 2 pangrams") and the list itself, alphabetised.
   On desktop this may sit beside the honeycomb; on narrow screens it collapses to a
   summary line that expands on tap.
4. **Input line** — the letters typed so far, with a blinking caret. Letters render in the
   accent color when they are the center letter, so a missing center letter is visible
   before submitting.
5. **Honeycomb** — the seven hexes.
6. **Controls** — Delete, Shuffle, Enter.
7. **Footer controls** — Reset puzzle, Reveal remaining answers (§8).

### 7.2 Visual language

Reuse the look of the existing app in this repository so the two read as siblings: the
dark slate background, the glass panels, and the accent colors. The relevant tokens are in
`app/globals.css` — `--primary` (#6366f1), `--secondary` (#ec4899), `--accent` (#14b8a6),
`--background` (#0f172a), `--surface`, `--text-primary`, `--text-secondary`, and the
`.glass-panel` treatment (translucent surface, 16px backdrop blur, 1px light border, 1.5rem
radius). Because the standalone app shares no build with the Next.js app, these are
**copied** into `spelling-bee/styles.css`, not imported.

Hexes are drawn with CSS `clip-path: polygon(...)`. No images, no SVG sprite sheets, no
icon fonts.

### 7.3 Motion

- Hex press: brief scale-down, ~100ms.
- Accepted word: the word flies from the input line up into the found-word list.
- Pangram: a distinct, louder celebration — accent-colored burst behind the honeycomb plus
  a "Pangram!" banner.
- Rejected word: horizontal shake on the input line, ~300ms.

All of the above are suppressed under `prefers-reduced-motion` (§10).

### 7.4 Responsive behaviour

Must be fully playable from 320px wide up. The honeycomb scales with the viewport; the
found-word list collapses on narrow screens; touch targets are at least 44×44px.

## 8. Persistence

State is saved to `localStorage`, keyed per puzzle so that switching puzzles and coming
back preserves progress in each:

- `honeycomb:puzzle` — the id of the currently selected puzzle.
- `honeycomb:progress:<puzzleId>` — `{ found: [...], revealed: boolean }`. Score and rank
  are recomputed from `found`, never stored.

Follow the pattern already used in `components/games/ResourceQuests.jsx`: read from storage
once on mount behind an `isLoaded` flag, then write on every subsequent state change, with
the read wrapped in `try/catch` so corrupt or absent storage degrades to a fresh game
rather than a blank page.

Two explicit actions:

- **Reset puzzle** — clears progress for the current puzzle only, behind a confirmation.
- **Reveal remaining answers** — shows the full answer list with the unfound words marked.
  This sets `revealed: true`, which is permanent for that puzzle until reset, and the
  puzzle is thereafter displayed as finished. Points are not awarded for revealed words.

## 9. Technical constraints

- Location: a new top-level **`spelling-bee/`** directory containing `index.html`,
  `styles.css`, `game.js`, and `puzzles.js`.
- **Classic `<script>` tags, not ES modules.** `puzzles.js` assigns a global
  (`window.PUZZLES`) and `game.js` reads it. This is a deliberate constraint: ES module
  imports fail under the `file://` protocol, and `index.html` must work when opened by
  double-clicking it, with no server and no install step.
- Zero runtime network requests. Zero npm dependencies. Nothing added to `package.json`.
- Plain DOM APIs — no React, no framework. The existing app's React dependency is not
  available to this page.
- Target current versions of Chrome, Firefox, Safari, and Edge.
- Optional convenience, worth noting but not required: copying `spelling-bee/` into a
  `public/` directory would let the existing `npm run dev` server serve it at
  `/spelling-bee/index.html`. The app must not depend on this.

## 10. Accessibility

- **Fully playable by keyboard alone**, with no mouse — this follows from §3.4 and must be
  verified as such.
- Each hex is a real `<button>` with an accessible label naming its letter and whether it
  is the center letter (e.g. "T, center letter, required").
- Submission results are announced through an `aria-live="polite"` region: accepted words
  with their points, rejections with the specific reason from §3.5, and rank changes.
- The found-word count and current rank are exposed as text, not conveyed by the progress
  bar alone.
- All text meets WCAG AA contrast against the dark background. The center hex is
  distinguished by more than color alone (border weight, and its accessible label).
- Visible focus rings on every interactive element; focus is never trapped.
- All animation in §7.3 is disabled under `@media (prefers-reduced-motion: reduce)`.

## 11. Acceptance criteria

Each item is independently checkable by playing the built app.

1. Opening `spelling-bee/index.html` directly from the filesystem loads a playable puzzle,
   with no server running and no install step.
2. The honeycomb shows seven letters with the center letter visually distinct, and no
   puzzle in `puzzles.js` contains the letter `s`.
3. Clicking hexes and typing on the keyboard both append letters to the input line.
4. Enter submits; Backspace deletes one letter; Escape clears; Space and the Shuffle button
   reorder the six outer letters while the center letter stays in place.
5. Each of the six rejection and acceptance conditions in §3.5 produces its own distinct
   message.
6. A rejected submission leaves the typed word in the input line for editing.
7. Submitting a 4-letter word adds exactly 1 point; a 6-letter word adds exactly 6.
8. Submitting a 7-letter non-pangram adds exactly 10 points (7 + 3).
9. Submitting a 9-letter pangram adds exactly 19 points (9 + 3 + 7) and triggers the
   pangram celebration.
10. Submitting a perfect pangram adds exactly 24 points (7 + 3 + 14).
11. The rank shown matches §5 for the current score as a percentage of that puzzle's
    maximum, and the "points to next rank" figure is correct.
12. Hive Mind is reachable only after every word in the puzzle's list has been found.
13. Reloading the page restores the found words, the score, and the selected puzzle.
14. Switching to a second puzzle and back preserves progress in both independently.
15. Reset clears only the current puzzle's progress, after a confirmation.
16. Reveal shows all answers with unfound words marked, awards no points, and survives a
    reload.
17. A full game can be played start to finish using only the keyboard.
18. With a screen reader active, each submission's outcome is announced.
19. With `prefers-reduced-motion: reduce` set, no shake, flight, or celebration animation
    plays.
20. The page is playable and unclipped at 320px wide.
21. Every puzzle in `puzzles.js` satisfies all eight invariants in §6.4, verified by a
    script rather than by eye.
22. `git grep -i` finds no New York Times branding or rank names anywhere in the app.
