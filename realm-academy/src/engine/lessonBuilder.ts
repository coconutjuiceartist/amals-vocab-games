/**
 * Lesson builder — assembles tiny lessons (8–12 items, 3–5 min) with:
 *  - teach-first: a frontier skill with no completed teach sequence returns a TEACH plan
 *  - mix: ~60% new-skill practice / ~40% due spaced review
 *    (math realm review slice: ~25% frontier review + ~15% maintenance seasoning)
 *  - true interleaving: never 3+ identical exercise types in a row
 */

import type { Item, LessonPlan, SaveState, RealmId } from './types';
import { ContentRegistry } from './registry';
import { decide, canServe, pickItem } from './governor';
import { newSkillState } from './mastery';
import { dueCards } from './scheduler';
import { shuffled } from './rng';

export const LESSON_MIN = 8;
export const LESSON_MAX = 12;

/** Reorder so no 3 consecutive items share an exercise type (true interleaving guard). */
export function interleave(items: Item[], rng: () => number = Math.random): Item[] {
  const pool = shuffled(items, rng);
  const out: Item[] = [];
  while (pool.length > 0) {
    const violates = (it: Item) =>
      out.length >= 2 && out[out.length - 1].type === it.type && out[out.length - 2].type === it.type;
    const candidates = pool.filter(it => !violates(it));
    let chosen: Item;
    if (candidates.length === 0) {
      chosen = pool[0]; // homogeneous pool — give up gracefully
    } else {
      // schedule the most-abundant remaining type first so we never corner
      // ourselves into a forced triple at the end
      const counts = new Map<string, number>();
      for (const it of pool) counts.set(it.type, (counts.get(it.type) ?? 0) + 1);
      chosen = candidates.reduce((best, it) =>
        (counts.get(it.type) ?? 0) > (counts.get(best.type) ?? 0) ? it : best,
      );
    }
    pool.splice(pool.indexOf(chosen), 1);
    out.push(chosen);
  }
  return out;
}

function skillState(save: SaveState, skillId: string) {
  return save.skills[skillId] ?? newSkillState();
}

/** Collect due review items for a realm (capped), most overdue first. */
export function dueReviewItems(
  registry: ContentRegistry,
  save: SaveState,
  realm: RealmId | 'any',
  cap: number,
  now: number = Date.now(),
): Item[] {
  const ids = dueCards(save.cards, now);
  const out: Item[] = [];
  for (const id of ids) {
    const item = registry.item(id);
    if (!item || item.teachSequenceId) continue;
    if (realm !== 'any' && item.realm !== realm) continue;
    const def = registry.skill(item.skill);
    if (!canServe(item, def, skillState(save, item.skill))) continue;
    out.push(item);
    if (out.length >= cap) break;
  }
  return out;
}

/** The 60-second warm-up: 2–3 due items across all realms (spacing before novelty). */
export function buildWarmup(registry: ContentRegistry, save: SaveState, now: number = Date.now()): LessonPlan | null {
  const due = dueReviewItems(registry, save, 'any', 3, now);
  if (due.length < 2) return null;
  return { kind: 'warmup', realm: due[0].realm, items: due, title: 'Morning Warm-Up' };
}

/**
 * Build a lesson focused on one skill.
 * Frontier skill not yet taught → teach plan (gambit/worked/completion/burst items resolved from the sequence).
 */
export function buildLesson(
  registry: ContentRegistry,
  save: SaveState,
  skillId: string,
  now: number = Date.now(),
  rng: () => number = Math.random,
): LessonPlan {
  const def = registry.skill(skillId);
  if (!def) throw new Error(`Unknown skill ${skillId}`);
  const state = skillState(save, skillId);

  // Teach-first invariant: frontier/diagnose skills get their teach sequence first.
  if (def.tier !== 'maintenance' && !state.teachDone && state.override !== 'known' && def.teachSequenceId) {
    const seq = registry.teach(def.teachSequenceId);
    if (seq) {
      const teachItems: Item[] = [];
      for (const screen of seq.screens) {
        if (screen.kind === 'gambit' || screen.kind === 'worked' || screen.kind === 'completion') {
          const it = registry.item(screen.itemId);
          if (it) teachItems.push(it);
        } else if (screen.kind === 'burst') {
          for (const id of screen.itemIds) {
            const it = registry.item(id);
            if (it) teachItems.push(it);
          }
        }
      }
      return {
        kind: 'teach',
        realm: def.realm,
        skillFocus: skillId,
        teachSequence: seq,
        items: teachItems,
        title: seq.title,
      };
    }
  }

  const size = LESSON_MIN + Math.floor(rng() * (LESSON_MAX - LESSON_MIN + 1));
  const decision = decide(state);
  const used = new Set<string>(save.today.itemsSeen);
  const chosen: Item[] = [];

  // --- new-skill slice (~60%) ---
  const newCount = Math.round(size * 0.6);
  const pool = registry
    .practiceItems(skillId)
    .filter(i => canServe(i, def, state));
  for (let k = 0; k < newCount; k++) {
    const item = pickItem(pool.filter(i => !chosen.some(c => c.id === i.id)), decision, used, rng);
    if (!item) break;
    chosen.push(item);
  }

  // --- review slice (~40%): due items, then realm seasoning ---
  const reviewTarget = size - chosen.length;
  const isMath = def.realm === 'math';
  const frontierReviewCap = isMath ? Math.ceil(reviewTarget * 0.6) : reviewTarget;
  const review = dueReviewItems(registry, save, def.realm, frontierReviewCap, now).filter(
    i => !chosen.some(c => c.id === i.id),
  );
  chosen.push(...review);

  // maintenance seasoning (~15% of a math lesson) — even when nothing is "due"
  if (isMath && chosen.length < size) {
    const seasoningPool = registry.items.filter(
      i =>
        i.realm === 'math' &&
        i.tier === 'maintenance' &&
        !i.teachSequenceId &&
        !chosen.some(c => c.id === i.id) &&
        canServe(i, registry.skill(i.skill), skillState(save, i.skill)),
    );
    const seasoningCount = Math.min(Math.max(1, Math.round(size * 0.15)), size - chosen.length);
    for (const item of shuffled(seasoningPool, rng).slice(0, seasoningCount)) chosen.push(item);
  }

  // backfill from the focus pool if still short
  if (chosen.length < LESSON_MIN) {
    for (const item of shuffled(pool, rng)) {
      if (chosen.length >= LESSON_MIN) break;
      if (!chosen.some(c => c.id === item.id)) chosen.push(item);
    }
  }

  return {
    kind: 'lesson',
    realm: def.realm,
    skillFocus: skillId,
    items: interleave(chosen.slice(0, size), rng),
    title: def.name,
  };
}

/** Boss gauntlet: 15 mixed items across the boss's skills (no teach items, served-able only). */
export function buildBoss(
  registry: ContentRegistry,
  save: SaveState,
  bossId: string,
  rng: () => number = Math.random,
): LessonPlan | null {
  const boss = registry.bosses.find(b => b.id === bossId);
  if (!boss) return null;
  const pool: Item[] = [];
  for (const skillId of boss.skills) {
    const def = registry.skill(skillId);
    const state = skillState(save, skillId);
    pool.push(...registry.practiceItems(skillId).filter(i => canServe(i, def, state)));
  }
  if (pool.length < 8) return null;
  const picked = shuffled(pool, rng).slice(0, 15);
  return {
    kind: 'boss',
    realm: boss.realm,
    items: interleave(picked, rng),
    title: boss.name,
  };
}
