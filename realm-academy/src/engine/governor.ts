/**
 * Difficulty governor — holds each skill's rolling success in the 75–88% band
 * by choosing item difficulty, scaffold level, and hint availability.
 *
 * Hard invariants (tested):
 *  - NEVER serve independent frontier items before the skill's teach sequence is done.
 *  - NEVER serve teach sequences for maintenance-tier skills.
 */

import type { Item, SkillState, SkillDef } from './types';

export const BAND_LOW = 0.75;
export const BAND_HIGH = 0.88;

export function rollingSuccess(window: number[]): number | null {
  if (window.length < 3) return null; // not enough signal
  const recent = window.slice(-8);
  return recent.reduce((a, b) => a + b, 0) / recent.length;
}

export interface GovernorDecision {
  /** target item difficulty 1–5 */
  difficulty: number;
  /** scaffold level to serve (0 = independent) */
  scaffold: 0 | 1 | 2 | 3;
  /** whether the hint button is shown prominently */
  hintsProminent: boolean;
}

/** Decide difficulty + scaffolding for the next item of a skill. */
export function decide(state: SkillState): GovernorDecision {
  const success = rollingSuccess(state.window);
  let scaffold = state.scaffold;
  let difficulty: number;

  if (success === null) {
    // cold start: gentle but not trivial
    difficulty = state.mastery >= 80 ? 3 : 2;
  } else if (success < BAND_LOW) {
    // struggling: easier items, scaffolds and hints return
    difficulty = Math.max(1, difficultyFromMastery(state.mastery) - 1);
    scaffold = Math.min(3, (scaffold + 1)) as 0 | 1 | 2 | 3;
  } else if (success > BAND_HIGH) {
    // cruising: harder items, scaffolds fade (expertise-reversal)
    difficulty = Math.min(5, difficultyFromMastery(state.mastery) + 1);
    scaffold = Math.max(0, (scaffold - 1)) as 0 | 1 | 2 | 3;
  } else {
    difficulty = difficultyFromMastery(state.mastery);
  }
  return { difficulty, scaffold, hintsProminent: (success ?? 1) < BAND_LOW };
}

function difficultyFromMastery(mastery: number): number {
  if (mastery < 30) return 1;
  if (mastery < 55) return 2;
  if (mastery < 75) return 3;
  if (mastery < 90) return 4;
  return 5;
}

/**
 * May this item be served to this learner right now?
 * Enforces the two invariants + scaffolding sanity.
 */
export function canServe(item: Item, skillDef: SkillDef | undefined, state: SkillState): boolean {
  const tier = skillDef?.tier ?? item.tier;
  const isTeachItem = !!item.teachSequenceId;
  if (tier === 'maintenance') {
    // never teach what she already owns
    if (isTeachItem) return false;
    return true;
  }
  // frontier / diagnose: teach items only inside the teach player; independent
  // items only after the teach sequence is complete (or parent marked known)
  if (isTeachItem) return false; // teach player pulls these directly, lessons never do
  if (!state.teachDone && state.override !== 'known') return false;
  return true;
}

/** Pick the best item from a pool given a governor decision. */
export function pickItem(
  pool: Item[],
  decision: GovernorDecision,
  exclude: Set<string>,
  rng: () => number = Math.random,
): Item | null {
  const fresh = pool.filter(i => !exclude.has(i.id));
  const usable = fresh.length > 0 ? fresh : pool;
  if (usable.length === 0) return null;
  // score by closeness to target difficulty and scaffold
  let best: Item[] = [];
  let bestScore = Infinity;
  for (const item of usable) {
    const dScore = Math.abs(item.difficulty - decision.difficulty) * 2;
    const sScore = Math.abs((item.scaffoldLevel ?? 0) - decision.scaffold);
    const score = dScore + sScore;
    if (score < bestScore) {
      bestScore = score;
      best = [item];
    } else if (score === bestScore) {
      best.push(item);
    }
  }
  return best[Math.floor(rng() * best.length)] ?? null;
}
