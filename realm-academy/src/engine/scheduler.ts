/**
 * SM-2-lite spaced-repetition scheduler with successive-relearning support.
 *
 * Intervals ladder: 1 → 3 → 7 → 16 → 35 days (then ×ease).
 * Misses: re-queue later the SAME session (handled by lesson player) and again
 * next day (interval resets to 1 here).
 */

import type { CardSchedule } from './types';

export const INTERVAL_LADDER = [1, 3, 7, 16, 35];
const DAY_MS = 24 * 60 * 60 * 1000;

export function dayKey(t: number = Date.now()): string {
  const d = new Date(t);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

export function newCard(now: number = Date.now()): CardSchedule {
  return { due: now, interval: 0, ease: 2.3, reps: 0, lapses: 0 };
}

/**
 * Apply a review result.
 * - correct on a learning card (interval 0): climb the ladder from 1 day
 * - correct on a review card: next rung of ladder, then interval × ease
 * - incorrect: lapse — due again tomorrow, ease drops slightly
 */
export function review(card: CardSchedule, correct: boolean, now: number = Date.now()): CardSchedule {
  const next: CardSchedule = { ...card, lastResult: correct, lastReviewDay: dayKey(now) };
  if (correct) {
    next.reps = card.reps + 1;
    const rung = INTERVAL_LADDER.findIndex(d => d > card.interval);
    if (rung !== -1) {
      next.interval = INTERVAL_LADDER[rung];
    } else {
      next.interval = Math.round(card.interval * card.ease);
    }
    next.ease = Math.min(2.8, card.ease + 0.05);
    next.due = now + next.interval * DAY_MS;
  } else {
    next.lapses = card.lapses + 1;
    next.ease = Math.max(1.3, card.ease - 0.2);
    next.interval = 1;
    next.due = now + 1 * DAY_MS; // again tomorrow (in-session re-queue handled by player)
    next.reps = card.reps;
  }
  return next;
}

export function isDue(card: CardSchedule, now: number = Date.now()): boolean {
  return card.due <= now;
}

/** Sort due cards: most overdue first. */
export function dueCards(cards: Record<string, CardSchedule>, now: number = Date.now()): string[] {
  return Object.keys(cards)
    .filter(id => isDue(cards[id], now))
    .sort((a, b) => cards[a].due - cards[b].due);
}

/**
 * Was this review "spaced" for successive-relearning purposes?
 * True when the card was last reviewed on a DIFFERENT calendar day.
 */
export function isSpacedRetrieval(card: CardSchedule, now: number = Date.now()): boolean {
  return card.lastReviewDay !== undefined && card.lastReviewDay !== dayKey(now);
}
