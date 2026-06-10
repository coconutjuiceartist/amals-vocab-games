# Content authoring brief (read with SCHEMA.md + math-ratios.json as the exemplar)

## The learner (calibration is a CONTRACT)

Amal, 11, rising 6th grader. Completed RSM Grade 5 Accelerated math: she is FLUENT in
multi-step equations (variables on both sides), all fraction operations incl. division,
signed-number arithmetic, order of operations with exponents, prime factorization/GCF,
coordinate plane (all quadrants), D=R·T motion problems, Venn counting. Do NOT dumb math down.
She is a TRUE BEGINNER in: ratios, percents, decimals (diagnose), statistics, probability,
measurement geometry, French, and grade-6 science/humanities content.

Interests for personalization (~35% of items, tag them): Duolingo + Swahili (`duolingo`, `swahili`),
Harry Potter (`harry-potter` — wizard-school flavor; light canon references are fine),
knitting (`knitting`), cats (`cats`), baking (`baking`), K-pop (`kpop`), reading (`reading`).

## Voice

The mascot is a warm, playful, slightly dramatic magical cat. Prompts are crisp (≤2 sentences
where possible). Hints nudge strategy, never reveal. Explanations ≤2 sentences, growth-mindset
("That tape diagram cracked it!") — NEVER "you're smart". No babyish tone — she reads at a high level.

## Quality bars (non-negotiable)

1. **Verify every answer.** For numeric items, recompute the arithmetic before writing it down.
   For multiple_choice, the `answer` string must appear VERBATIM in `options`.
2. Distractors must be plausible (common errors), never jokes-only, never obviously wrong lengths.
3. Type diversity: within each skill use ≥5 different exercise types. Never author 10 same-type in a row.
4. Difficulty spread per skill: ~20% d1, ~30% d2, ~30% d3, ~20% d4–5. d4–5 = multi-step
   "Legendary" word problems (tag `legendary`) — RSM-style, may bake in equation solving.
5. A couple of items per frontier skill at `scaffoldLevel` 1–2 (worked_completion type works well)
   so the governor has support items when she struggles.
6. JSON must be valid. Item ids: `<skill>.NNN` zero-padded, teach items `<skill>.tNN`.
7. After writing, RUN `npm run validate-content` from `realm-academy/` and fix every error that
   mentions YOUR files or skill ids. (Errors about other skills/files are other writers' problems.)

## Teach sequences

- Math skills: screens = bridge → gambit → worked → completion ×2 → (bridge) → worked →
  completion ×2 → burst. ≥8 teach items total (`teachSequenceId` set on each).
  Completions must FADE: first ones blank 1 step (scaffoldLevel 2), later ones blank 2–3 (scaffold 1→0).
- Non-math skills: bridge (with `vocab` pre-taught) → worked OR gambit → completion → burst.
  2–3 teach items is enough.
- Bridges connect to what she OWNS (speed→unit rate, absolute value→MAD, balance scale→equations,
  fraction fluency→percent). For French/science/humanities, bridge from everyday experience or
  her interests (Duolingo streaks, baking, cats).
- burst itemIds reference 3–4 EASY (d1–2) normal pool items from the same skill (no teachSequenceId).

## French specifics

- Every listening item: `data.audioText` (the French to speak), `data.lang: "fr-FR"`, options or typed
  answer, and a phonetic fallback in `hint` (e.g. "sounds like: bone-ZHOOR").
- ≥5 listening items per unit. Accent-forgiving checking is automatic — author canonical accents.
- Sentence assembly via order_sequence (words in correct order). Gender sorting via drag_categorize.
- Cultural notes welcome in explanations (1 sentence).

## Science/Humanities/English specifics

- diagram_label items MUST use the fixed diagrams + slot ids from SCHEMA.md.
- two_truths: the lie must be a common misconception; explanation corrects it.
- English reading: write ORIGINAL passages (150–250 words) inside `prompt` (passage, blank line,
  then the question). Genres: heroic myths, short stories, poems, plays. Some star cats/baking/wizards.
- Humanities: timeline ordering (order_sequence), two_truths, matching, MC. Factual accuracy matters:
  Mali (Mansa Musa, Timbuktu, gold-salt trade), India (Gupta "golden age" math incl. zero, Ashoka,
  monsoon trade), China (Tang/Song inventions: paper, printing, compass, gunpowder; Zheng He), medieval
  Europe (feudalism, guilds, plague), Renaissance (printing press, perspective, Leonardo), Exploration
  (caravel, Columbian exchange — include its costs honestly, age-appropriately).
