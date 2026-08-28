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

## Options

Append to the URL:

| Option | Effect |
| --- | --- |
| `?theme=light` | force light |
| `?theme=dark` | force dark |
| `?theme=system` | follow the device's dark-mode setting |
| *(default)* | light from 07:00, dark from 19:00, local time |
| `?puzzle=3` | pin a specific puzzle (1–14) instead of rotating daily |

Combine with `&`, e.g. `/local/honeycomb.html?theme=system&puzzle=3`.

The theme re-checks every minute, so a wall tablet left running will switch itself
at 19:00 without a reload.

## Notes

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
node ../tools/build-ha.mjs
```

The puzzle data is copied from `../index.html` so the two builds can never
disagree about the word lists. `node ../tools/verify-puzzles.mjs` fails if they
drift.

## What's different from the full build

Same game, same words, same scoring and ranks. The changes are all presentational:

- One accent colour (honey) instead of three, flat surfaces, no gradients or glass
- Light ground by default, dark only in the evening, to suit a dashboard
- Roughly 40% shorter: compact top bar, found words on one scrolling line, small
  controls, no page title
- Fills its frame at any size rather than assuming a phone or desktop window
