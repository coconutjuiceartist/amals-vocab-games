# 🐱✨ Realm Academy

An offline-capable, single-player learning game that previews and genuinely **teaches** a
6th-grade year (Pingry-aligned): Math (Math 1), Science 6, English, French 1A, and a
"Global Encounters" humanities track — wrapped in an island world map with a mascot cat,
quests, streaks, bosses, and a museum of weird facts.

Built for one specific learner: strong RSM-trained algebra/number sense (never re-taught),
true beginner in ratios/percent/stats/probability/measurement-geometry/French (always
taught before practiced).

## Run it

```bash
cd realm-academy
npm install
npm run dev        # → http://localhost:5173
```

- `npm run build` — type-check + production build (output in `dist/`, fully static)
- `npm run preview` — serve the production build
- `npm test` — engine unit tests (scheduler, checker, mastery, governor, placement, persistence)
- `npm run validate-content` — schema + answer-key validation for all content

Works great on iPad Safari and laptop Chrome. After first load it needs no network: no
external APIs, fonts, CDNs, or assets. French/Swahili audio uses the device's built-in
Web Speech voices and degrades to phonetic hints when a voice is missing.

## How learning works (the short version)

- **Teach-first:** every new (frontier) skill opens with a teaching sequence —
  Bridge (connect to what she knows) → Explorer's Gambit (ungraded try-first) →
  Worked examples with "why does this step work?" checkpoints → Completion problems with
  fading blanks → a short practice burst. Only then do independent exercises unlock.
- **Spaced repetition:** every answered item is scheduled (SM-2-lite: 1→3→7→16→35 days).
  Misses come back later the same lesson and again the next day.
- **Mastery:** a skill is MASTERED only after 3 successful retrievals on 3 different days
  (successive relearning), then CROWNED by beating its boss. Idle mastery goes DUSTY after
  ~3 weeks and politely asks for a dust-off — progress is never lost.
- **Difficulty governor:** holds per-skill success in a 75–88% band by adjusting item
  difficulty and scaffolding. It never serves frontier practice before teaching, and never
  serves teaching for maintenance (already-mastered) topics.
- **Placement ("Map Survey"):** the first two days weave ≤10 probe questions/day into
  quests. Correct probes seed maintenance skills as known (mastery 80–100) so the app never
  re-teaches what she owns. Decimals probes route that topic to teach / refresh / skip.
- **Healthy by design:** 2-lesson daily goal, wind-down nudge after ~25 minutes, streak
  shields that auto-cover missed days, opt-in-only speed rounds, soft boss timers.

## Project layout

```
realm-academy/
  src/
    engine/        scheduler, mastery, governor, lesson builder, placement,
                   checker, persistence, novelty, audio (WebAudio), speech (TTS)
    components/    game shell + 15 exercise components (see exercises/)
    content/       ALL curriculum JSON + SCHEMA.md + CONTENT_BRIEF.md
    styles/        the design system (per-realm palettes)
  scripts/validate-content.mjs
```

## Adding or editing content

1. Read `src/content/SCHEMA.md` (item shapes, teach-sequence rules, diagram slot ids)
   and `src/content/CONTENT_BRIEF.md` (calibration + voice).
2. Add items to the relevant `src/content/*.json` (or a new file — every `*.json` with an
   `items`/`sequences` array is auto-loaded).
3. Run `npm run validate-content` until it passes. It checks ids, answer keys
   (including recomputing visual-model answers), teach-sequence integrity, and the
   teach-vs-maintenance invariants.

`CONTENT_EXPANSION.md` contains a ready-to-paste prompt for generating more content
consistently.

## Personalization

`src/content/interests.json` is parent-editable: player name, interest list (used to
flavor word problems and copy), and mascot name suggestions. The daily Swahili bonus word
lives in `swahili.json`; weird-fact cards in `facts.json`; the Daily Impossible Question
pool in `impossible.json`.

## Parent Corner

Open `#/parent` (e.g. `http://localhost:5173/#/parent`) or **long-press the ⚙️ gear** in
the bottom nav. It shows a per-skill mastery heatmap, the placement report with
**mark as known / not known** overrides, a streak calendar, minutes per day, subject and
daily-goal toggles, speaking-exercise toggle, and JSON export/import (progress survives
device changes via copy-paste).

## Resetting

Parent Corner → data → "Reset ALL progress", or clear the browser's localStorage key
`realm-academy-save-v1`.
