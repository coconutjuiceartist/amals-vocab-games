/**
 * Placement — the "Map Survey".
 * Across the first 2 days, ≤10 adaptive probe items/day are woven into quests,
 * framed as "surveying the realms to restore the map."
 *
 *  - Correct maintenance probes seed those skills at mastery 80–100 (teaching skipped).
 *  - The decimals (diagnose-tier) probes route that topic: teach vs refresh vs skip.
 */

import type { Item, SaveState, SkillState } from './types';
import { ContentRegistry } from './registry';
import { newSkillState, seedFromPlacement } from './mastery';
import { dayKey } from './scheduler';

export const PROBES_PER_DAY = 10;

export function isProbeItem(item: Item): boolean {
  return item.tags?.includes('probe') ?? false;
}

/** Probe items not yet answered, balanced across skills, capped per day. */
export function nextProbes(registry: ContentRegistry, save: SaveState, now: number = Date.now()): Item[] {
  if (save.placement.complete) return [];
  const today = dayKey(now);
  if (save.placement.daysRun.length >= 2 && !save.placement.daysRun.includes(today)) return [];

  const answered = save.placement.answered;
  const candidates = registry.items.filter(i => isProbeItem(i) && !(i.id in answered));
  // one probe per skill first, then seconds
  const seen = new Set<string>();
  const firsts: Item[] = [];
  const seconds: Item[] = [];
  for (const item of candidates) {
    if (seen.has(item.skill)) seconds.push(item);
    else {
      seen.add(item.skill);
      firsts.push(item);
    }
  }
  return [...firsts, ...seconds].slice(0, PROBES_PER_DAY);
}

export interface PlacementOutcome {
  skills: Record<string, SkillState>;
  placement: SaveState['placement'];
}

/** Record one probe answer and reseed skill state accordingly. */
export function recordProbe(
  registry: ContentRegistry,
  save: SaveState,
  item: Item,
  correct: boolean,
  now: number = Date.now(),
): PlacementOutcome {
  const placement = {
    ...save.placement,
    answered: { ...save.placement.answered, [item.id]: correct },
  };
  const today = dayKey(now);
  if (!placement.daysRun.includes(today)) placement.daysRun = [...placement.daysRun, today];

  const skills = { ...save.skills };
  const prior = skills[item.skill] ?? newSkillState();
  const def = registry.skill(item.skill);

  if (def?.tier === 'maintenance') {
    // correct → seed mastered; wrong → leave for review pool (still no teaching for maintenance)
    skills[item.skill] = correct ? seedFromPlacement(prior, true, now) : { ...prior, teachDone: true };
  } else if (def?.tier === 'diagnose') {
    skills[item.skill] = routeDiagnose(registry, placement.answered, item.skill, prior, now);
  }

  // complete when every probe item is answered, or 2 days have run their course
  const remaining = registry.items.filter(i => isProbeItem(i) && !(i.id in placement.answered));
  if (remaining.length === 0 || (placement.daysRun.length >= 2 && !placement.daysRun.includes(today))) {
    placement.complete = true;
  }
  if (remaining.length === 0) placement.complete = true;

  return { skills, placement };
}

/**
 * Decimals routing: with N probes answered for a diagnose skill —
 *  all correct (≥2 answered) → SKIP teaching (seed as known)
 *  ≥half correct → REFRESH (skip teach sequence, start practice at modest mastery)
 *  else → full TEACH (leave UNSEEN so the teach-first pipeline fires)
 */
function routeDiagnose(
  registry: ContentRegistry,
  answered: Record<string, boolean>,
  skillId: string,
  prior: SkillState,
  now: number,
): SkillState {
  const probes = registry.items.filter(i => isProbeItem(i) && i.skill === skillId);
  const done = probes.filter(p => p.id in answered);
  if (done.length < probes.length) return prior; // wait until all probes for the skill are in
  const right = done.filter(p => answered[p.id]).length;
  if (right === done.length && done.length >= 2) {
    return seedFromPlacement(prior, true, now); // skip
  }
  if (right >= done.length / 2) {
    return { ...prior, phase: 'TAUGHT', teachDone: true, mastery: 55, window: [1, 1, 0], lastSeen: now }; // refresh
  }
  return { ...prior, teachDone: false }; // full teach
}

/** Placement report rows for Parent Corner. */
export function placementReport(registry: ContentRegistry, save: SaveState) {
  return registry.skills
    .filter(s => s.tier !== 'frontier' || s.id === 'math.decimals')
    .map(def => {
      const st = save.skills[def.id];
      const probes = registry.items.filter(i => isProbeItem(i) && i.skill === def.id);
      const answered = probes.filter(p => p.id in save.placement.answered);
      const correct = answered.filter(p => save.placement.answered[p.id]).length;
      return {
        skill: def,
        state: st,
        probesAnswered: answered.length,
        probesCorrect: correct,
        seededKnown: (st?.mastery ?? 0) >= 80 && (st?.teachDone ?? false),
        override: st?.override,
      };
    });
}
