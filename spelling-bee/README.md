# Honeycomb

A Spelling Bee–style word game for adults. Seven letters, every word must use the
center one, four letters minimum. Longer words and pangrams are worth far more.

**The whole game is one file: [`index.html`](index.html).**

## Playing it on a computer

Double-click `index.html`. That's it — it opens in any browser and runs offline.

There is no install, no build step, no server, no npm, no network access at any
point. To give it to someone, send them that single file: email it, AirDrop it,
drop it in a shared folder. It works from wherever they save it.

## Playing it on a phone

Phones are bad at opening local HTML files — iOS in particular previews them instead
of running them properly, and saved progress may not stick. On a phone, open it from
a URL instead. Either:

- **GitHub Pages.** In the repo's Settings → Pages, publish from the `main` branch,
  and the game is then at
  `https://coconutjuiceartist.github.io/amals-vocab-games/spelling-bee/`.
- **Your own machine, same Wi-Fi.** `cd spelling-bee && python3 -m http.server 8000`,
  then browse to `http://<your-computer's-IP>:8000` on the phone.

Once it's open, use the browser's **Add to Home Screen** — it then launches
full-screen from an icon, like an app, and keeps its saved progress.

Progress is saved in the browser's `localStorage`, per puzzle, so you can close the
tab and pick up where you left off. Progress lives on that one device and in that one
browser — sending the file to someone else sends the game, not your score.

Progress is keyed by a puzzle's **letters**, not its position in the list, so updating
or regenerating the puzzle set never reassigns your saved game to the wrong board.
Opening a puzzle never writes to storage; only playing, resetting or revealing does.
`tools/storage-tests.mjs` guards both properties.

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

14 hand-picked puzzles. Each ships **two** lists, and the difference matters:

- **Required** — what the counter and the top rank are about. Common words only.
- **Bonus** — accepted and scored, but never needed for 100%. Rarer real words like
  `crouton`, `beignet` or `percipient`, shown in teal.

Why two: no single cutoff works. Draw the line high and the game rejects words
everyone knows (`appall`, `attune`, `adduce` all fall below the obvious thresholds).
Draw it low and lists hit 120 words and Hive Mind becomes unreachable. Rejecting a
word you know feels broken; an obscure word sitting in the list just makes 100%
harder. So accepting is generous and requiring is strict.

Validity comes from a 274k-word dictionary; commonness from
[wordfreq](https://pypi.org/project/wordfreq/)'s Zipf frequencies over a real corpus
— the only signal that separates rare-but-real (`percipient`, 1.17) from dictionary
padding (`alaap`, `apoop`, `eevn`, all 0.00). Required is Zipf ≥ 2.5, bonus ≥ 1.0.

Slurs, explicit vulgarities and informal non-words are excluded from both lists;
ordinary words with ordinary meanings are not.

Every puzzle is filtered to be worth playing: 25–60 answers, at least two pangrams,
at least 25% of answers 7+ letters, at least one 9+ letter word, and a cap on how
much of the list can be inflected forms of other answers — otherwise letter sets
containing I, N and G produce lists padded with easy `-ing` gerunds.

`tools/generate-puzzles.mjs` is the generator, kept so the set can be extended:

```sh
pip install wordfreq && npm install word-list
python3 tools/generate-puzzles.py
```

To prove no common word is refused — the check that catches a missing `donut`:

```sh
python3 tools/check-coverage.py
```

To check the shipped puzzles against every rule above:

```sh
node tools/verify-puzzles.mjs
```

That one has no dependencies at all — it reads the puzzles straight out of `index.html`.

And to replay the acceptance criteria in a real browser:

```sh
npm install playwright
node tools/browser-tests.mjs      # 55 checks: scoring, ranks, rejection messages,
                                  # bonus words, persistence, reveal, keyboard,
                                  # a11y, 320px layout
node tools/storage-tests.mjs      #  6 checks: saved games survive a puzzle-set
                                  # change, and opening never overwrites
```

These are development tools. The game itself needs none of them.

## Requirements

The full specification is in [`../docs/spelling-bee-requirements.md`](../docs/spelling-bee-requirements.md).

This game is deliberately separate from the Next.js vocabulary app in this
repository — it shares that app's visual language but none of its code, routing,
or build.
