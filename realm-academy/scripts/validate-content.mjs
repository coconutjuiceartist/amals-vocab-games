#!/usr/bin/env node
/**
 * Content validator — run with `npm run validate-content`.
 * Checks schema shape, answer-key sanity, id uniqueness, teach-sequence integrity,
 * per-type payloads, and prints an item-count report per skill/tier.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content');

const REALMS = ['math', 'science', 'english', 'french', 'humanities'];
const TIERS = ['frontier', 'maintenance', 'diagnose'];
const TYPES = [
  'multiple_choice', 'type_answer', 'matching_pairs', 'drag_categorize', 'order_sequence',
  'fill_blank', 'listening', 'spot_error', 'speed_round', 'number_line_tap', 'diagram_label',
  'two_truths', 'worked_example', 'worked_completion', 'visual_model',
];
const MODELS = ['tape_diagram', 'double_number_line', 'ratio_table', 'percent_bar', 'area_decomposer', 'balance_scale', 'plot_builder', 'net_match'];
const DIAGRAM_SLOTS = {
  food_web: ['sun', 'producer', 'herbivore', 'carnivore', 'decomposer'],
  wave: ['crest', 'trough', 'wavelength', 'amplitude'],
  water_cycle: ['evaporation', 'condensation', 'precipitation', 'collection'],
  energy_pyramid: ['producers', 'primary', 'secondary', 'tertiary'],
  circle_parts: ['center', 'radius', 'diameter', 'circumference'],
  plant_cell: ['nucleus', 'chloroplast', 'cell_wall', 'vacuole'],
};

const errors = [];
const warnings = [];
const err = (file, id, msg) => errors.push(`[${file}] ${id ?? ''} ${msg}`);
const warn = (file, id, msg) => warnings.push(`[${file}] ${id ?? ''} ${msg}`);

// ---- load everything ----
const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
let skills = [], bosses = [];
const items = [];
const sequences = [];
const itemSource = new Map();

for (const file of files) {
  let json;
  try {
    json = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8'));
  } catch (e) {
    err(file, '', `invalid JSON: ${e.message}`);
    continue;
  }
  if (file === 'skills.json') {
    skills = json.skills ?? [];
    bosses = json.bosses ?? [];
    continue;
  }
  if (['interests.json', 'swahili.json', 'facts.json', 'impossible.json'].includes(file)) continue;
  for (const item of json.items ?? []) {
    items.push(item);
    itemSource.set(item.id, file);
  }
  for (const seq of json.sequences ?? []) {
    sequences.push({ seq, file });
  }
}

const skillById = new Map(skills.map(s => [s.id, s]));
const itemById = new Map(items.map(i => [i.id, i]));
const seqById = new Map(sequences.map(({ seq }) => [seq.id, seq]));

// ---- skills sanity ----
for (const s of skills) {
  if (!REALMS.includes(s.realm)) err('skills.json', s.id, `bad realm ${s.realm}`);
  if (!TIERS.includes(s.tier)) err('skills.json', s.id, `bad tier ${s.tier}`);
  if (s.tier !== 'maintenance' && !s.teachSequenceId) err('skills.json', s.id, 'frontier/diagnose skill missing teachSequenceId');
  if (s.tier === 'maintenance' && s.teachSequenceId) err('skills.json', s.id, 'maintenance skill must NOT have a teach sequence');
  if (s.teachSequenceId && !seqById.has(s.teachSequenceId)) err('skills.json', s.id, `teachSequenceId ${s.teachSequenceId} not found in any content file`);
}
for (const b of bosses) {
  for (const sk of b.skills) if (!skillById.has(sk)) err('skills.json', b.id, `boss references unknown skill ${sk}`);
}

// ---- numeric-ish answer parser mirroring src/engine/checker.ts ----
function parseNumeric(raw) {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null;
  let s = String(raw).trim().toLowerCase().replace(/[$€£]/g, '');
  let pct = false;
  if (s.endsWith('%')) { pct = true; s = s.slice(0, -1).trim(); }
  const mixed = s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) return parseInt(mixed[1]) + (parseInt(mixed[1]) < 0 ? -1 : 1) * parseInt(mixed[2]) / parseInt(mixed[3]);
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (frac) return parseFloat(frac[1]) / parseFloat(frac[2]);
  const n = parseFloat(s);
  return Number.isFinite(n) ? (pct ? n / 100 : n) : null;
}

// ---- item checks ----
const ids = new Set();
for (const item of items) {
  const file = itemSource.get(item.id) ?? '?';
  const { id } = item;
  if (!id) { err(file, '', 'item missing id'); continue; }
  if (ids.has(id)) err(file, id, 'duplicate id');
  ids.add(id);

  if (!REALMS.includes(item.realm)) err(file, id, `bad realm ${item.realm}`);
  if (!TIERS.includes(item.tier)) err(file, id, `bad tier ${item.tier}`);
  if (!skillById.has(item.skill)) err(file, id, `unknown skill ${item.skill}`);
  else {
    const skill = skillById.get(item.skill);
    if (skill.tier !== item.tier) err(file, id, `tier ${item.tier} ≠ skill's tier ${skill.tier}`);
    if (skill.realm !== item.realm) err(file, id, `realm ${item.realm} ≠ skill's realm ${skill.realm}`);
  }
  if (![1, 2, 3, 4, 5].includes(item.difficulty)) err(file, id, `bad difficulty ${item.difficulty}`);
  if (!TYPES.includes(item.type)) { err(file, id, `bad type ${item.type}`); continue; }
  if (item.scaffoldLevel !== undefined && ![0, 1, 2, 3].includes(item.scaffoldLevel)) err(file, id, `bad scaffoldLevel ${item.scaffoldLevel}`);
  if (!item.prompt || typeof item.prompt !== 'string') err(file, id, 'missing prompt');
  if (item.answer === undefined || item.answer === null || item.answer === '') err(file, id, 'missing answer');
  if (item.teachSequenceId && !seqById.has(item.teachSequenceId)) err(file, id, `teachSequenceId ${item.teachSequenceId} does not resolve`);
  if (item.teachSequenceId && skillById.get(item.skill)?.tier === 'maintenance') err(file, id, 'teaching item for a MAINTENANCE skill (forbidden)');

  const d = item.data ?? {};
  switch (item.type) {
    case 'multiple_choice': {
      if (!Array.isArray(item.options) || item.options.length < 3) err(file, id, 'multiple_choice needs ≥3 options');
      else {
        if (!item.options.includes(item.answer)) err(file, id, 'answer not present in options');
        if (new Set(item.options).size !== item.options.length) err(file, id, 'duplicate options');
      }
      break;
    }
    case 'type_answer': {
      const answers = Array.isArray(item.answer) ? item.answer : [item.answer];
      if (answers.length === 0) err(file, id, 'no accepted answers');
      break;
    }
    case 'matching_pairs': {
      if (!Array.isArray(d.pairs) || d.pairs.length < 3 || d.pairs.length > 6) err(file, id, 'matching_pairs needs 3–6 data.pairs');
      else if (d.pairs.some(p => !Array.isArray(p) || p.length !== 2)) err(file, id, 'each pair must be [left, right]');
      else {
        const lefts = d.pairs.map(p => p[0]);
        const rights = d.pairs.map(p => p[1]);
        if (new Set(lefts).size !== lefts.length) err(file, id, 'duplicate left sides in pairs');
        if (new Set(rights).size !== rights.length) err(file, id, 'duplicate right sides in pairs');
      }
      break;
    }
    case 'drag_categorize': {
      const cats = d.categories;
      if (!cats || typeof cats !== 'object' || Object.keys(cats).length < 2) err(file, id, 'drag_categorize needs ≥2 data.categories');
      else {
        const all = Object.values(cats).flat();
        if (all.length < 4) err(file, id, 'needs ≥4 members total');
        if (new Set(all).size !== all.length) err(file, id, 'a member appears in two categories');
      }
      break;
    }
    case 'order_sequence': {
      if (!Array.isArray(d.sequence) || d.sequence.length < 3 || d.sequence.length > 6) err(file, id, 'order_sequence needs 3–6 data.sequence entries');
      break;
    }
    case 'fill_blank':
    case 'worked_completion': {
      if (!Array.isArray(d.lines) || d.lines.length === 0) { err(file, id, `${item.type} needs data.lines`); break; }
      const blanks = d.lines.join('\n').match(/\[\[(.+?)\]\]/g) ?? [];
      if (blanks.length === 0) err(file, id, 'no [[blanks]] found in lines');
      if (blanks.length > 4) warn(file, id, `${blanks.length} blanks — heavy; consider ≤3`);
      break;
    }
    case 'listening': {
      if (!d.audioText) err(file, id, 'listening needs data.audioText');
      if (item.options && item.options.length > 0 && !item.options.includes(item.answer)) err(file, id, 'answer not in options');
      break;
    }
    case 'spot_error': {
      if (!Array.isArray(d.segments) || d.segments.length < 3) { err(file, id, 'spot_error needs ≥3 data.segments'); break; }
      const idx = parseInt(String(item.answer), 10);
      if (!(idx >= 0 && idx < d.segments.length)) err(file, id, `answer ${item.answer} is not a valid segment index`);
      break;
    }
    case 'speed_round': {
      if (!Array.isArray(d.cards) || d.cards.length < 8) err(file, id, 'speed_round needs ≥8 data.cards');
      else if (d.cards.some(c => !Array.isArray(c) || c.length !== 2)) err(file, id, 'each card must be [prompt, answer]');
      break;
    }
    case 'number_line_tap': {
      if (d.numberLine) {
        const { min, max, step } = d.numberLine;
        if (!(min < max) || !(step > 0)) { err(file, id, 'bad numberLine config'); break; }
        const ansN = parseNumeric(item.answer);
        if (ansN === null) err(file, id, 'number_line_tap answer must be numeric');
        else if (ansN < min || ansN > max) err(file, id, `answer ${ansN} outside [${min},${max}]`);
        else {
          const k = (ansN - min) / step;
          if (Math.abs(k - Math.round(k)) > 1e-6) err(file, id, `answer ${ansN} not on a tick (step ${step})`);
        }
      } else if (d.coordinatePlane) {
        const m = String(item.answer).match(/^(-?\d+),\s*(-?\d+)$/);
        if (!m) err(file, id, 'coordinate answer must be "x,y"');
        else {
          const size = d.coordinatePlane.size;
          if (Math.abs(+m[1]) > size || Math.abs(+m[2]) > size) err(file, id, 'coordinate answer outside grid');
        }
      } else err(file, id, 'number_line_tap needs data.numberLine or data.coordinatePlane');
      break;
    }
    case 'diagram_label': {
      if (!DIAGRAM_SLOTS[d.diagram]) { err(file, id, `unknown diagram ${d.diagram}`); break; }
      const valid = DIAGRAM_SLOTS[d.diagram];
      if (!d.slots || Object.keys(d.slots).length === 0) { err(file, id, 'needs data.slots'); break; }
      for (const slot of Object.keys(d.slots)) if (!valid.includes(slot)) err(file, id, `slot ${slot} not valid for ${d.diagram} (valid: ${valid.join(',')})`);
      if (!Array.isArray(d.labels)) err(file, id, 'needs data.labels bank');
      else for (const lbl of Object.values(d.slots)) if (!d.labels.includes(lbl)) err(file, id, `correct label "${lbl}" missing from labels bank`);
      break;
    }
    case 'two_truths': {
      if (!Array.isArray(d.truths) || d.truths.length !== 2) err(file, id, 'two_truths needs exactly 2 data.truths');
      if (!d.lie) err(file, id, 'two_truths needs data.lie');
      break;
    }
    case 'worked_example': {
      if (!item.teachSequenceId) err(file, id, 'worked_example must belong to a teach sequence');
      if (!Array.isArray(d.steps) || d.steps.length < 2) err(file, id, 'worked_example needs ≥2 data.steps');
      else {
        for (const [i, st] of d.steps.entries()) {
          if (!st.text) err(file, id, `step ${i} missing text`);
          if (st.check) {
            if (!Array.isArray(st.check.options) || st.check.options.length < 2) err(file, id, `step ${i} check needs ≥2 options`);
            else if (!(st.check.answer >= 0 && st.check.answer < st.check.options.length)) err(file, id, `step ${i} check answer index out of range`);
          }
        }
        if (!d.steps.some(st => st.check)) warn(file, id, 'worked_example has no self-explanation check');
      }
      break;
    }
    case 'visual_model': {
      if (!MODELS.includes(item.model)) { err(file, id, `bad model ${item.model}`); break; }
      const m = d.model;
      if (!m) { err(file, id, 'visual_model needs data.model'); break; }
      if (item.model === 'tape_diagram') {
        if (!Array.isArray(m.parts) || !Array.isArray(m.counts) || m.parts.length !== m.counts.length) err(file, id, 'tape_diagram needs parts/counts of equal length');
        else if (m.total !== undefined) {
          const boxes = m.counts.reduce((a, b) => a + b, 0);
          if (m.total % boxes !== 0) err(file, id, `total ${m.total} not divisible by ${boxes} boxes`);
        }
      }
      if (item.model === 'double_number_line') {
        for (const k of ['topMax', 'bottomMax', 'knownTop', 'knownBottom', 'askBottom']) if (typeof m[k] !== 'number') err(file, id, `double_number_line missing ${k}`);
        if (typeof m.knownTop === 'number' && typeof m.knownBottom === 'number' && typeof m.askBottom === 'number') {
          const expected = (m.knownTop / m.knownBottom) * m.askBottom;
          const ansN = parseNumeric(item.answer);
          if (ansN !== null && Math.abs(expected - ansN) > 1e-6) err(file, id, `answer ${ansN} ≠ computed ${expected}`);
        }
      }
      if (item.model === 'ratio_table') {
        if (!Array.isArray(m.headers) || !Array.isArray(m.rows)) err(file, id, 'ratio_table needs headers/rows');
        const nullCount = (m.rows ?? []).flat().filter(v => v === null).length;
        if (!Array.isArray(m.blanksAnswers) || m.blanksAnswers.length !== nullCount) err(file, id, `blanksAnswers length must equal ${nullCount} (number of null cells)`);
      }
      if (item.model === 'percent_bar') {
        if (!['part', 'percent', 'whole'].includes(m.ask)) err(file, id, 'percent_bar.ask must be part|percent|whole');
        const ansN = parseNumeric(item.answer);
        if (typeof m.total === 'number' && typeof m.percent === 'number' && ansN !== null) {
          const expect = m.ask === 'part' ? (m.total * m.percent) / 100 : m.ask === 'percent' ? m.percent : m.total;
          if (Math.abs(expect - ansN) > 1e-6) err(file, id, `answer ${ansN} ≠ computed ${expect}`);
        }
      }
      if (item.model === 'area_decomposer') {
        if (!Array.isArray(m.cells) || m.cells.length < 2) err(file, id, 'area_decomposer needs ≥2 cells');
        else {
          const area = m.cells.reduce((a, c) => a + c[2] * c[3], 0);
          const ansN = parseNumeric(item.answer);
          if (ansN !== null && Math.abs(area - ansN) > 1e-6) err(file, id, `answer ${ansN} ≠ summed cell area ${area}`);
        }
      }
      if (item.model === 'balance_scale') {
        if (!m.left || !m.right || !Array.isArray(m.steps)) err(file, id, 'balance_scale needs left/right/steps');
      }
      if (item.model === 'plot_builder') {
        if (!Array.isArray(m.values) || m.values.length < 4) err(file, id, 'plot_builder needs ≥4 values');
        if (m.ask && ['median', 'mean', 'mode', 'range'].includes(m.ask)) {
          const vals = [...m.values].sort((a, b) => a - b);
          let expect = null;
          if (m.ask === 'median') expect = vals.length % 2 ? vals[(vals.length - 1) / 2] : (vals[vals.length / 2 - 1] + vals[vals.length / 2]) / 2;
          if (m.ask === 'mean') expect = vals.reduce((a, b) => a + b, 0) / vals.length;
          if (m.ask === 'range') expect = vals[vals.length - 1] - vals[0];
          if (m.ask === 'mode') {
            const counts = {};
            for (const v of vals) counts[v] = (counts[v] ?? 0) + 1;
            expect = +Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
          }
          const ansN = parseNumeric(item.answer);
          if (expect !== null && ansN !== null && Math.abs(expect - ansN) > 1e-6) err(file, id, `answer ${ansN} ≠ computed ${m.ask} ${expect}`);
        }
      }
      if (item.model === 'net_match') {
        if (!Array.isArray(m.options) || !m.correct) err(file, id, 'net_match needs options + correct');
        else if (!m.options.includes(m.correct)) err(file, id, 'net_match correct not in options');
      }
      break;
    }
  }
}

// ---- teach sequence integrity ----
for (const { seq, file } of sequences) {
  if (!skillById.has(seq.skill)) err(file, seq.id, `sequence for unknown skill ${seq.skill}`);
  const skill = skillById.get(seq.skill);
  if (skill?.tier === 'maintenance') err(file, seq.id, 'teach sequence for MAINTENANCE skill (forbidden)');
  let counts = { bridge: 0, gambit: 0, worked: 0, completion: 0, burst: 0 };
  for (const screen of seq.screens ?? []) {
    counts[screen.kind] = (counts[screen.kind] ?? 0) + 1;
    if (screen.kind === 'gambit' || screen.kind === 'worked' || screen.kind === 'completion') {
      const it = itemById.get(screen.itemId);
      if (!it) err(file, seq.id, `screen references missing item ${screen.itemId}`);
      else {
        if (it.teachSequenceId !== seq.id) err(file, seq.id, `item ${screen.itemId} must set teachSequenceId: "${seq.id}"`);
        if (screen.kind === 'worked' && it.type !== 'worked_example') err(file, seq.id, `worked screen item ${screen.itemId} must be type worked_example`);
        if (screen.kind === 'completion' && it.type !== 'worked_completion') err(file, seq.id, `completion screen item ${screen.itemId} must be type worked_completion`);
      }
    }
    if (screen.kind === 'burst') {
      for (const bid of screen.itemIds ?? []) {
        const it = itemById.get(bid);
        if (!it) err(file, seq.id, `burst references missing item ${bid}`);
        else if (it.teachSequenceId) err(file, seq.id, `burst item ${bid} must be a normal pool item (no teachSequenceId)`);
      }
    }
  }
  if (counts.bridge < 1) err(file, seq.id, 'needs ≥1 bridge screen');
  if (counts.burst < 1) err(file, seq.id, 'needs a final burst screen');
  const isMath = seq.skill.startsWith('math.');
  if (isMath) {
    if (counts.gambit < 1) err(file, seq.id, 'math sequence needs a gambit (Explorer\'s Gambit)');
    if (counts.worked < 2) err(file, seq.id, `math sequence needs ≥2 worked examples (has ${counts.worked})`);
    if (counts.completion < 3) err(file, seq.id, `math sequence needs ≥3 completions (has ${counts.completion})`);
  } else if (counts.gambit + counts.worked + counts.completion < 1) {
    err(file, seq.id, 'needs ≥1 teaching screen (gambit/worked/completion)');
  }
}

// every frontier/diagnose skill has a resolvable, complete sequence (checked above) — also check items exist
for (const s of skills) {
  if (s.tier === 'maintenance') continue;
  const pool = items.filter(i => i.skill === s.id && !i.teachSequenceId);
  if (pool.length === 0) err('skills.json', s.id, 'skill has no practice items at all');
  const easy = pool.filter(i => i.difficulty <= 2);
  if (easy.length < 2) warn('skills.json', s.id, 'fewer than 2 easy (d≤2) practice items — governor may struggle');
}

// probes
const probeBySkill = new Map();
for (const item of items.filter(i => i.tags?.includes('probe'))) {
  probeBySkill.set(item.skill, (probeBySkill.get(item.skill) ?? 0) + 1);
}
for (const s of skills.filter(s => s.tier === 'maintenance')) {
  if (!probeBySkill.has(s.id)) err('skills.json', s.id, 'maintenance skill has no placement probe items (tag "probe")');
}
for (const s of skills.filter(s => s.tier === 'diagnose')) {
  if ((probeBySkill.get(s.id) ?? 0) < 2) err('skills.json', s.id, 'diagnose skill needs ≥2 probe items');
}

// ---- report ----
console.log('\n══════════ CONTENT REPORT ══════════');
const byRealm = {};
for (const s of skills) {
  const all = items.filter(i => i.skill === s.id);
  const teach = all.filter(i => i.teachSequenceId);
  byRealm[s.realm] = byRealm[s.realm] ?? [];
  byRealm[s.realm].push({ skill: s, total: all.length, teach: teach.length });
}
let grand = 0;
for (const realm of REALMS) {
  if (!byRealm[realm]) continue;
  console.log(`\n— ${realm.toUpperCase()} —`);
  for (const row of byRealm[realm]) {
    grand += row.total;
    const teachNote = row.teach > 0 ? ` (${row.teach} teach)` : '';
    console.log(`  ${row.skill.id.padEnd(24)} [${row.skill.tier.slice(0, 5).padEnd(5)}] ${String(row.total).padStart(3)} items${teachNote}`);
  }
}
console.log(`\nTOTAL ITEMS: ${grand}`);
console.log(`Teach sequences: ${sequences.length}`);
console.log(`Probes: ${items.filter(i => i.tags?.includes('probe')).length}`);

if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 40)) console.log('  ' + w);
}
if (errors.length) {
  console.error(`\n✗ ${errors.length} error(s):`);
  for (const e of errors.slice(0, 80)) console.error('  ' + e);
  if (errors.length > 80) console.error(`  …and ${errors.length - 80} more`);
  process.exit(1);
}
console.log('\n✓ Content validation passed.');
