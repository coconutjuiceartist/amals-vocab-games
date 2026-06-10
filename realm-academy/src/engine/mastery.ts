/**
 * Per-skill mastery score (0–100, recency-weighted accuracy) and the
 * skill state machine:
 * UNSEEN → TAUGHT → PRACTICING → MASTERED → CROWNED → DUSTY
 *
 * MASTERED requires 3 successful retrievals spaced across ≥3 distinct days
 * (successive relearning — Rawson & Dunlosky).
 */

import type { SkillState, SkillPhase } from './types';
import { dayKey } from './scheduler';

export const WINDOW_MAX = 12;
export const MASTERY_DAYS_REQUIRED = 3;
export const DUSTY_AFTER_DAYS = 21;

export function newSkillState(): SkillState {
  return {
    phase: 'UNSEEN',
    mastery: 0,
    window: [],
    retrievalDays: [],
    scaffold: 0,
    teachDone: false,
    lastSeen: 0,
  };
}

/** Recency-weighted accuracy: newest results count most. */
export function masteryFromWindow(window: number[]): number {
  if (window.length === 0) return 0;
  let weight = 1;
  let totalW = 0;
  let sum = 0;
  for (let i = 0; i < window.length; i++) {
    // newest last; weight grows toward the end
    weight = 1 + i * 0.35;
    totalW += weight;
    sum += window[i] * weight;
  }
  const raw = (sum / totalW) * 100;
  // light confidence damper for tiny samples
  const confidence = Math.min(1, window.length / 5);
  return Math.round(raw * confidence + 50 * (1 - confidence) * (window.length > 0 ? raw / 100 : 0));
}

export interface RecordOpts {
  /** counts toward the 3-day successive-relearning rule (spaced review, not same-day cramming) */
  spaced: boolean;
  now?: number;
}

/** Record one practice result and advance the state machine. */
export function recordResult(state: SkillState, correct: boolean, opts: RecordOpts): SkillState {
  const now = opts.now ?? Date.now();
  const next: SkillState = { ...state, window: [...state.window, correct ? 1 : 0].slice(-WINDOW_MAX) };
  next.lastSeen = now;
  next.mastery = masteryFromWindow(next.window);

  if (correct && opts.spaced) {
    const day = dayKey(now);
    if (!next.retrievalDays.includes(day)) {
      next.retrievalDays = [...next.retrievalDays, day];
    }
  }

  // state machine
  if (next.phase === 'UNSEEN') next.phase = 'PRACTICING';
  if (next.phase === 'TAUGHT') next.phase = 'PRACTICING';
  if (next.phase === 'PRACTICING' || next.phase === 'DUSTY') {
    if (next.retrievalDays.length >= MASTERY_DAYS_REQUIRED && next.mastery >= 80) {
      next.phase = 'MASTERED';
    } else if (next.phase === 'DUSTY' && correct) {
      next.phase = state.retrievalDays.length >= MASTERY_DAYS_REQUIRED ? 'MASTERED' : 'PRACTICING';
    }
  }
  return next;
}

export function markTaught(state: SkillState, now: number = Date.now()): SkillState {
  if (state.phase !== 'UNSEEN') return { ...state, teachDone: true };
  return { ...state, phase: 'TAUGHT', teachDone: true, lastSeen: now };
}

export function markCrowned(state: SkillState): SkillState {
  return { ...state, phase: 'CROWNED' };
}

/** Placement seeding: a correct probe seeds a maintenance skill at mastery 80–100. */
export function seedFromPlacement(state: SkillState, probeCorrect: boolean, now: number = Date.now()): SkillState {
  if (probeCorrect) {
    const mastery = 80 + Math.floor(Math.random() * 21);
    return {
      ...state,
      phase: 'PRACTICING',
      teachDone: true, // never teach what she owns
      mastery,
      window: [1, 1, 1, 1, 1],
      lastSeen: now,
    };
  }
  return { ...state, lastSeen: now };
}

/** Sweep: MASTERED/CROWNED skills untouched for ~3 weeks go DUSTY (sparkle prompt; progress kept). */
export function applyDustySweep(state: SkillState, now: number = Date.now()): SkillState {
  if ((state.phase === 'MASTERED' || state.phase === 'CROWNED') && state.lastSeen > 0) {
    const days = (now - state.lastSeen) / (24 * 3600 * 1000);
    if (days >= DUSTY_AFTER_DAYS) return { ...state, phase: 'DUSTY' };
  }
  return state;
}

export function phaseLabel(phase: SkillPhase): string {
  switch (phase) {
    case 'UNSEEN': return 'Unexplored';
    case 'TAUGHT': return 'Learning';
    case 'PRACTICING': return 'Practicing';
    case 'MASTERED': return 'Mastered';
    case 'CROWNED': return 'Crowned';
    case 'DUSTY': return 'Needs a dust-off';
  }
}
