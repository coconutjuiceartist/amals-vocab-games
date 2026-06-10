# Content expansion guide

The shipped content meets or approaches the per-topic minimums (see the validator's count
report). The spec's *full* targets are larger in a few places — most notably **French
(40/unit)** and **English (30/strand)** — and more variety always helps long-term replay.
This file is a ready-to-paste prompt for generating more content that drops cleanly into
the validator.

## Current gaps to fill first (in priority order)

1. French: top every unit up to 40 items (more listening + dialogue-assembly items).
2. English: top each strand to 30+; add 3–5 more original reading passages (a play scene
   and a poem are the thinnest genres).
3. Math frontier: add 6–10 more items each for probability, inequalities, twovar,
   enrichment (target 30 apiece); more `visual_model` items everywhere.
4. Maintenance: 2 more items per skill (target 15) — favor speed-round cards and
   "spot the error" variants.
5. Science: top each topic to 24+; one more `diagram_label` per topic.
6. Humanities: one more timeline `order_sequence` + one more `two_truths` per unit.

## Ready-to-paste prompt

> You are authoring additional curriculum content for "Realm Academy", an offline learning
> game. Work in `realm-academy/`.
>
> FIRST read completely: `src/content/SCHEMA.md`, `src/content/CONTENT_BRIEF.md`, and the
> existing file you are extending (match its ids, style, and quality exactly — your items
> must be indistinguishable from the originals).
>
> TASK: add N new items to `src/content/<FILE>.json` for skill `<SKILL_ID>`, continuing the
> existing id numbering (e.g. if `french.food.026` exists, start at `french.food.027`).
> Do not modify existing items or sequences. Respect every rule in CONTENT_BRIEF.md:
> verified answers (recompute by hand), ≥5 exercise types, the difficulty mix, ~35%
> interest personalization with tags, growth-mindset explanations ≤2 sentences, and for
> French ≥1 listening item per 5 items added.
>
> WHEN DONE run `npm run validate-content` from `realm-academy/` and fix every error that
> mentions your file or skill. Report item counts and validation status.

Fill in `<FILE>`, `<SKILL_ID>`, and N. Run one skill per session for best quality.

## Schema invariants the validator enforces (don't fight them)

- multiple_choice answers must appear verbatim in `options`; no duplicate options.
- visual-model answers are **recomputed** (tape totals divisible by boxes; double-number-line
  answer = knownTop/knownBottom × askBottom; percent_bar part = total×percent/100;
  area_decomposer answer = Σ w×h; plot_builder answer = computed median/mean/mode/range).
- number_line_tap answers must land exactly on a tick.
- Teach items (`teachSequenceId` set) never appear in lessons; burst items must NOT have
  `teachSequenceId`; maintenance skills must have zero teach material.
- Diagram slot ids are fixed per diagram (see SCHEMA.md).
