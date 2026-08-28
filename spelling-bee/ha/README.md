# Honeycomb — Home Assistant build

A compact, iframe-friendly build of the game: white by default, dark in the
evening, sized to fill a dashboard card without scrolling.

**The file you want is [`honeycomb.html`](honeycomb.html).** One file, no
dependencies, no network calls.

## Installing it

1. Copy `honeycomb.html` into your Home Assistant config folder under **`www`**:

   ```
   /config/www/honeycomb.html
   ```

   Create the `www` folder if it doesn't exist. (Anything in `/config/www/` is
   served publicly by HA — no auth — so don't put secrets there. A word game is
   fine.)

2. **Restart Home Assistant**, or at least reload the browser. HA only picks up a
   newly created `www` folder on restart.

3. Add an iframe card to your dashboard:

   ```yaml
   type: iframe
   url: /local/honeycomb.html
   aspect_ratio: 80%
   ```

`/config/www/` is served at **`/local/`** — that's the mapping to remember. The
file is same-origin with your dashboard, so it works over HTTPS and through Nabu
Casa without a mixed-content warning.

### When you update the file

Home Assistant caches `/local/` aggressively. After replacing the file, bump a
query string or you will keep seeing the old one:

```yaml
url: /local/honeycomb.html?v=2
```

## Sizing

`aspect_ratio` is what controls the height. Roughly:

| Card width | Try | Result |
| --- | --- | --- |
| ~400px (single column) | `aspect_ratio: 125%` | comfortable, full layout |
| ~500px (wide card) | `aspect_ratio: 85%` | comfortable |
| anything | `aspect_ratio: 75%` | tight; the found-words strip hides below 330px tall |

The page never scrolls — it scales the honeycomb to whatever frame it is given,
down to 300×320. Below about 330px tall it drops the found-words strip and footer
rather than shrinking the letters to something untappable.

## A new puzzle every morning at 5am

The file carries a bank of **496 puzzles** — a new one each day, rotating for
**1.36 years** before it repeats, then repeating forever. No maintenance, ever.

The day rolls over at **05:00 local time**, so a late night still finishes
yesterday's puzzle. The rollover is daylight-saving safe, and the card switches
itself over without a reload, so a wall tablet can stay open indefinitely.

Which puzzle you get is a pure function of the date — every device shows the same
one on the same day, and it can never disagree with itself.

## Options

Append to the URL:

| Option | Effect |
| --- | --- |
| `?theme=light` | force light |
| `?theme=dark` | force dark |
| `?theme=system` | follow the device's dark-mode setting |
| *(default)* | light from 07:00, dark from 19:00, local time |
| `?day=1234` | jump to a given day number (testing) |
| `?puzzle=7` | pin one puzzle and stop rotating (testing) |

Combine with `&`, e.g. `/local/honeycomb.html?theme=system&day=42`.

The theme re-checks every minute, so a wall tablet left running will switch itself
at 19:00 without a reload.

## Notes

- **A new puzzle appears each morning at 05:00 local**; the one you were on stays
  saved, so an unfinished puzzle is still there if you go back to it.
- **Progress is saved per puzzle** in the browser's local storage, keyed by the
  letters. It is per-device and per-browser — the tablet and your phone keep
  separate games.
- **Keyboard input needs the frame focused.** Tap or click inside the card first,
  then typing works. On a touch tablet just tap the letters.
- The default puzzle rotates daily; whichever puzzle you last opened is
  remembered.

## Rebuilding

`honeycomb.html` is generated — edit `_template.html`, not the built file:

```sh
node ../tools/build-ha.mjs          # embeds data/bank.json, verifies the hash
```

To rebuild the puzzle bank itself (you should not need to):

```sh
pip install wordfreq && npm install word-list
python3 ../tools/build-bank.py
```

## Checking it

```sh
node ../tools/verify-bank.mjs       # 517 checks: structure, content, quality,
                                    # scoring, rotation, hashes
python3 ../tools/check-coverage.py  # no common word is rejected
node ../tools/rotation-tests.mjs    # 05:00 rollover, DST, determinism, cycle
node ../tools/ha-tests.mjs          # fit, theme, touch play, persistence
```

The standard every word is held to is written up in
[`../../docs/word-standard.md`](../../docs/word-standard.md).

## What's different from the full build

Same game, same words, same scoring and ranks. The changes are all presentational:

- One accent colour (honey) instead of three, flat surfaces, no gradients or glass
- Light ground by default, dark only in the evening, to suit a dashboard
- Roughly 40% shorter: compact top bar, found words on one scrolling line, small
  controls, no page title
- Fills its frame at any size rather than assuming a phone or desktop window
