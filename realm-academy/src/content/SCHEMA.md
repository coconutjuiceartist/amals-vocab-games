# Realm Academy content schema

All content is plain JSON in `/src/content/`. Run `npm run validate-content` after editing —
it checks ids, answer keys, teach-sequence integrity, and per-type payload shapes.

## Files

| File | Contents |
|---|---|
| `skills.json` | `{ "skills": SkillDef[], "bosses": BossDef[] }` — the registry |
| `math-*.json`, `french.json`, `english.json`, `science.json`, `humanities.json` | `{ "items": Item[], "sequences": TeachSequence[] }` — every content file may carry items and/or teach sequences; the loader merges all files |
| `interests.json` | personalization config (parent-editable) |
| `swahili.json` | daily bonus words |
| `facts.json` | weird-fact cards unlocked by mastery |

## Item

```jsonc
{
  "id": "math.ratios.012",        // unique, prefix = skill id
  "realm": "math",                 // math|science|english|french|humanities
  "skill": "math.ratios",          // must exist in skills.json
  "tier": "frontier",              // frontier|maintenance|diagnose (match the skill's tier)
  "difficulty": 2,                  // 1 gentle … 5 legendary
  "type": "multiple_choice",       // see types below
  "model": "tape_diagram",         // only for visual_model items; else omit
  "scaffoldLevel": 0,               // 0 independent (default) … 3 heavy support
  "prompt": "string — the question. Keep ≤2 sentences where possible.",
  "answer": "9",                   // string | number | string[] (any accepted form)
  "options": ["9", "6", "15", "3"], // multiple_choice/spot_error/listening: MUST include answer
  "hint": "one nudge, not the solution",
  "explanation": "≤2 sentences shown on a miss. Warm, growth-mindset voice.",
  "teachSequenceId": "teach.math.ratios", // ONLY for gambit/worked/completion items
  "tags": ["cats", "probe"],       // interests; "probe" marks Map Survey placement items
  "data": { }                       // type-specific payload, see below
}
```

### Per-type payloads (`data`) and answer conventions

- **multiple_choice** — `options` (3–5, includes `answer` verbatim). `answer`: the correct option string.
- **type_answer** — `answer` string/number or array of accepted forms. Numeric answers accept equivalent
  forms automatically (0.5 = 1/2 = 50%); ratio answers accept `3:4` = `3 to 4`. French answers are
  accent-forgiving automatically.
- **matching_pairs** — `data.pairs`: 3–6 `[left, right]` pairs. `answer`: "pairs".
- **drag_categorize** — `data.categories`: `{ "Category name": ["member", …], … }` (2–3 categories,
  4–8 members total). `answer`: "categories".
- **order_sequence** — `data.sequence`: items in CORRECT order (3–6); component shuffles. `answer`: "sequence".
- **fill_blank** — `data.lines`: strings with `[[answer]]` blanks (alternate forms: `[[4|four]]`).
  1–3 blanks total. `answer`: "blanks".
- **listening** — `data.audioText` (spoken via TTS), `data.lang` ("fr-FR"), plus either `options`+`answer`
  (pick what you heard) or a typed `answer`. `prompt` must make sense if audio is unavailable
  (the player shows a phonetic fallback: put it in `hint`).
- **spot_error** — `data.segments`: 3–5 chunks of a sentence/equation, exactly one flawed.
  `answer`: the flawed segment's index as a string, e.g. "2". `explanation` says what the fix is.
- **speed_round** — `data.cards`: 10–16 `[prompt, answer]` flashcards (fluency facts only). `answer`: "cards".
- **number_line_tap** — `data.numberLine`: `{min,max,step}`; `answer`: the number to tap, e.g. "0.75".
  Coordinate mode: `data.coordinatePlane`: `{size}`; `answer`: "x,y" e.g. "3,-2".
- **diagram_label** — `data.diagram`: one of `food_web|wave|water_cycle|energy_pyramid|circle_parts|plant_cell`;
  `data.slots`: `{ "slotId": "Correct label", … }` (slot ids are fixed per diagram — see DIAGRAMS below);
  `data.labels`: label bank including all correct labels + 1–2 decoys. `answer`: "labels".
- **two_truths** — `data.truths`: [2 true statements], `data.lie`: the false one. `answer`: "lie".
  `explanation` says WHY the lie is false.
- **worked_example** (teach only) — `data.steps`: 3–6 `{ text, check? }`. Every 2nd–3rd step should carry a
  `check`: `{ question, options[3], answer: indexOfCorrect }` (self-explanation prompt). `answer`: "steps".
- **worked_completion** — `data.lines`: solution lines with 1–3 `[[blank]]`s. Early items blank 1 step
  (scaffoldLevel 2), later items blank 2–3 steps (scaffoldLevel 1), final items blank the strategy step
  (scaffoldLevel 0–1). `answer`: "blanks".
- **visual_model** — `model` + `data.model` payload (below). `answer`: final numeric/string answer.

### visual_model payloads (`data.model`)

- `tape_diagram`: `{ "parts": ["cats","kittens"], "counts": [3,2], "unitHint": true|false, "ask": "How many cats?" }`
  — answer = number asked for. unitHint shows the per-unit value after she sets it.
- `double_number_line`: `{ "topLabel": "km", "bottomLabel": "minutes", "topMax": 12, "bottomMax": 60, "knownTop": 4, "knownBottom": 20, "askBottom": 45 }` — she slides to align; answer = the matching top value.
- `ratio_table`: `{ "headers": ["cups flour","cookies"], "rows": [[2,24],[3,null],[5,null]], "blanks": [[1,1],[2,1]] }`
  — answer = "blanks" with `data.lines`-style accepted values in `blanksAnswers`: [["36"],["60"]].
- `percent_bar`: `{ "total": 80, "percent": 25, "ask": "part" | "percent" | "whole" }` — answer = number.
- `area_decomposer`: `{ "shape": "L", "grid": [w,h], "cells": [[x,y,w,h], …], "unit": "cm" }` —
  rectangles she taps to sum; answer = total area number.
- `balance_scale`: `{ "left": "3x + 2", "right": "11", "steps": ["subtract 2", "divide by 3"] }` —
  she picks the move at each step; answer = final x value.
- `plot_builder`: `{ "kind": "dot", "values": [3,5,5,6,8], "min": 0, "max": 10, "ask": "median" }` —
  she builds the plot then answers; answer = number.
- `net_match`: `{ "solid": "cube" | "rect_prism" | "square_pyramid" | "triangular_prism" | "cylinder", "options": ["net ids"], "correct": "net id" }` — answer = correct net id.

### DIAGRAM slot ids (diagram_label)

- `food_web`: sun, producer, herbivore, carnivore, decomposer
- `wave`: crest, trough, wavelength, amplitude
- `water_cycle`: evaporation, condensation, precipitation, collection
- `energy_pyramid`: producers, primary, secondary, tertiary
- `circle_parts`: center, radius, diameter, circumference
- `plant_cell`: nucleus, chloroplast, cell_wall, vacuole

## TeachSequence

```jsonc
{
  "id": "teach.math.ratios",
  "skill": "math.ratios",
  "title": "Ratios: Cracking the Recipe Code",
  "screens": [
    { "kind": "bridge", "title": "…", "lines": ["≤2 sentences", "each"], "visual": "speed",
      "vocab": [{ "term": "ratio", "meaning": "a comparison of two quantities by division" }] },
    { "kind": "gambit", "itemId": "math.ratios.t01", "framing": "No grade, just explore: what would YOU try?" },
    { "kind": "worked", "itemId": "math.ratios.t02" },
    { "kind": "completion", "itemId": "math.ratios.t03" },
    { "kind": "burst", "itemIds": ["math.ratios.001", "math.ratios.002", "math.ratios.003"] }
  ]
}
```

Rules:
- Math frontier sequences MUST contain: ≥1 bridge, 1 gambit, ≥2 worked, ≥3 completion, 1 final burst
  (3–4 easy pool items). Completions must fade: later items blank more steps.
- Other realms: ≥1 bridge + ≥1 (gambit|worked|completion) + 1 burst.
- `gambit`/`worked`/`completion` itemIds point at items WITH `teachSequenceId` set (kept out of lessons).
- `burst` itemIds point at normal pool items (difficulty 1–2, NO `teachSequenceId`).
- bridge `visual` one of: balance | speed | number_line | tape | percent | grid | none.

## SkillDef / BossDef (skills.json)

```jsonc
{ "id": "math.ratios", "realm": "math", "name": "Ratios & Rates", "icon": "⚖️",
  "tier": "frontier", "region": "Gearspring Falls", "teachSequenceId": "teach.math.ratios",
  "order": 1, "after": "math.decimals", "enrichment": false }

{ "id": "boss.math.ratio", "realm": "math", "name": "The Ratio Golem", "icon": "🗿",
  "skills": ["math.ratios"], "taunt": "Your recipes will always be lumpy!",
  "defeatLine": "Perfectly… proportioned… defeat…" }
```

## Authoring voice & calibration rules

- Mascot voice: warm, playful, a bit dramatic. Growth-mindset feedback ONLY (praise strategy/process, never "you're so smart").
- Personalize ~35% of items with her interests: Duolingo/Swahili, Harry Potter (use generic wizard-school
  flavor + canon-safe references), knitting, cats, baking, K-pop, reading. Tag those items.
- Difficulty 4–5 "Legendary" items = RSM-style multi-step word problems (she LIKES these).
- Maintenance items must assume full fluency (she solves equations with variables on both sides).
  NEVER author teach items for maintenance skills.
- Probe items: tag `"probe"`, 1–2 per maintenance skill + 3 for `math.decimals`. Difficulty 2–3,
  representative of the skill, NOT the hardest variant.
- Every explanation ≤2 sentences. Every hint nudges strategy without giving the answer.
