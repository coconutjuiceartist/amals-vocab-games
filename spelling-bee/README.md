# Honeycomb

A Spelling Bee–style word game for adults. Seven letters, every word must use the
center one, four letters minimum. Longer words and pangrams are worth far more.

**The whole game is one file: [`index.html`](index.html).**

## Playing it

Double-click `index.html`. That's it — it opens in any browser and runs offline.

There is no install, no build step, no server, no npm, no network access at any
point. To give it to someone, send them that single file: email it, AirDrop it,
drop it in a shared folder. It works from wherever they save it.

Progress is saved in the browser's `localStorage`, per puzzle, so you can close the
tab and pick up where you left off. Progress lives on that one device — sending the
file to someone else sends the game, not your score.

## The rules

- Words must be **4+ letters** and must contain the **center letter**.
- Letters can be reused as often as you like.
- **The letter S never appears** — otherwise every noun's plural would pad the score.
- A **pangram** uses all seven letters. A **perfect pangram** is exactly 7 letters long.

| Word | Points |
| --- | --- |
| 4 letters | 1 |
| 5–6 letters | 1 per letter |
| 7+ letters | 1 per letter **+ 3** |
| Pangram | **+7** |
| Perfect pangram | **+14** (instead of the +7) |

So `curt` scores 1 and `curtail` scores 24. Hunting the long words is the game.

Ranks run Dabbler → Speller → Wordsmith → Cruciverbalist → Lexicographer →
Etymologist → Polymath → **Hive Mind**, scaled to each puzzle's own maximum.
Hive Mind means every single word.

Type or click. <kbd>Enter</kbd> submits, <kbd>Backspace</kbd> deletes,
<kbd>Space</kbd> shuffles, <kbd>Esc</kbd> clears. It is fully playable by keyboard.

## The word lists

14 hand-picked puzzles, each with a complete answer list baked into the file.

They were generated from [SCOWL](http://wordlist.aspell.net/) tiers 10–55 — roughly
"words an educated adult could reasonably be expected to know". Tier 60 and above
(`ambuscade`, `acciaccatura`) was cut as unfairly obscure. Slurs, explicit
vulgarities, and informal non-words are excluded; ordinary words with ordinary
meanings are not.

Every puzzle is filtered to be worth playing: 25–60 answers, at least two pangrams,
at least 25% of answers 7+ letters, at least one 9+ letter word, and a cap on how
much of the list can be inflected forms of other answers — otherwise letter sets
containing I, N and G produce lists padded with easy `-ing` gerunds.

`tools/generate-puzzles.mjs` is the generator, kept so the set can be extended:

```sh
npm install wordlist-english     # the only dependency, and only for this script
node tools/generate-puzzles.mjs  # prints candidates and writes puzzles.json
```

To check the shipped puzzles against every rule above:

```sh
node tools/verify-puzzles.mjs
```

That one has no dependencies at all — it reads the puzzles straight out of `index.html`.

And to replay the acceptance criteria in a real browser:

```sh
npm install playwright
node tools/browser-tests.mjs      # 49 checks: scoring, ranks, rejection messages,
                                  # persistence, reveal, keyboard, a11y, 320px layout
```

These are development tools. The game itself needs none of them.

## Requirements

The full specification is in [`../docs/spelling-bee-requirements.md`](../docs/spelling-bee-requirements.md).

This game is deliberately separate from the Next.js vocabulary app in this
repository — it shares that app's visual language but none of its code, routing,
or build.
