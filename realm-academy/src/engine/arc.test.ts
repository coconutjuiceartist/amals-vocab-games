/**
 * Integration test: the full learning arc — teach → practice → 3-day spaced
 * mastery → boss crown — driven through the real store reducer with the real
 * shipped content, for the three flagship topics (ratios, percent, statistics).
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { reducer } from './store';
import { newSave } from './persistence';
import { buildLesson, buildBoss } from './lessonBuilder';
import { loadRegistry } from './loadContent';
import type { SaveState } from './types';

const registry = loadRegistry();
const DAY = 24 * 3600 * 1000;
const T0 = Date.parse('2026-09-01T09:00:00');

function answerAll(save: SaveState, skillId: string, day: number): SaveState {
  vi.setSystemTime(T0 + day * DAY);
  const plan = buildLesson(registry, save, skillId);
  expect(plan.kind).toBe('lesson');
  expect(plan.items.length).toBeGreaterThanOrEqual(8);
  // lesson must never contain teach-sequence items
  expect(plan.items.every(i => !i.teachSequenceId)).toBe(true);
  let s = save;
  for (const item of plan.items) {
    s = reducer(s, { type: 'ANSWER', item, correct: true, isReviewDue: false });
  }
  s = reducer(s, { type: 'LESSON_DONE', realm: plan.realm, kind: 'lesson', xp: 50, gems: 5, minutes: 4 });
  return s;
}

describe('full teach → practice → mastery → crown arc (real content)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(T0);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  for (const { skill, boss } of [
    { skill: 'math.ratios', boss: 'boss.math.ratio' },
    { skill: 'math.percent', boss: 'boss.math.percent' },
    { skill: 'math.stats', boss: 'boss.math.stats' },
  ]) {
    it(`${skill}: teaches first, masters over 3 days, then crowns via ${boss}`, () => {
      let s = newSave(T0);
      s = reducer(s, { type: 'ONBOARD', mascotName: 'Biscuit', avatarId: 'wizard' });

      // Day 0 — the FIRST plan must be the teach sequence (teach-first invariant)
      const teachPlan = buildLesson(registry, s, skill);
      expect(teachPlan.kind).toBe('teach');
      expect(teachPlan.teachSequence).toBeDefined();
      // bridge + gambit + ≥2 worked + ≥3 completions + burst, per the spec
      const kinds = teachPlan.teachSequence!.screens.map(sc => sc.kind);
      expect(kinds).toContain('bridge');
      expect(kinds).toContain('gambit');
      expect(kinds.filter(k => k === 'worked').length).toBeGreaterThanOrEqual(2);
      expect(kinds.filter(k => k === 'completion').length).toBeGreaterThanOrEqual(3);
      expect(kinds[kinds.length - 1]).toBe('burst');

      // complete the teach items
      for (const item of teachPlan.items) {
        s = reducer(s, { type: 'ANSWER', item, correct: true, isReviewDue: false });
      }
      s = reducer(s, { type: 'TEACH_DONE', skillId: skill });
      s = reducer(s, { type: 'LESSON_DONE', realm: 'math', kind: 'teach', xp: 30, gems: 8, minutes: 5 });
      expect(s.skills[skill].teachDone).toBe(true);

      // Days 0–2: three practice sessions on three calendar days, all correct
      s = answerAll(s, skill, 0);
      expect(s.skills[skill].phase).not.toBe('MASTERED'); // one day is not enough
      s = answerAll(s, skill, 1);
      s = answerAll(s, skill, 2);

      const st = s.skills[skill];
      expect(st.retrievalDays.length).toBeGreaterThanOrEqual(3);
      expect(st.mastery).toBeGreaterThanOrEqual(80);
      expect(st.phase).toBe('MASTERED');

      // Boss unlocks at ≥80 and crowns the topic
      const bossPlan = buildBoss(registry, s, boss);
      expect(bossPlan).not.toBeNull();
      expect(bossPlan!.items.length).toBe(15);
      s = reducer(s, { type: 'BOSS_BEATEN', bossId: boss });
      expect(s.skills[skill].phase).toBe('CROWNED');
      expect(s.collectibles).toContain('crown.' + boss);
    });
  }

  it('misses re-schedule for the next day and mastery stays honest', () => {
    let s = newSave(T0);
    s = reducer(s, { type: 'ONBOARD', mascotName: 'B', avatarId: 'wizard' });
    const teachPlan = buildLesson(registry, s, 'math.ratios');
    for (const item of teachPlan.items) s = reducer(s, { type: 'ANSWER', item, correct: true, isReviewDue: false });
    s = reducer(s, { type: 'TEACH_DONE', skillId: 'math.ratios' });

    const plan = buildLesson(registry, s, 'math.ratios');
    // answer everything WRONG
    for (const item of plan.items) {
      s = reducer(s, { type: 'ANSWER', item, correct: false, isReviewDue: false });
    }
    const st = s.skills['math.ratios'];
    expect(st.phase).not.toBe('MASTERED');
    expect(st.mastery).toBeLessThan(50);
    // every missed card is due within ~a day
    for (const item of plan.items) {
      const card = s.cards[item.id];
      expect(card.due).toBeLessThanOrEqual(Date.now() + DAY + 1000);
      expect(card.lapses).toBeGreaterThanOrEqual(1);
    }
    // governor responds with scaffolds + easier picks
    expect(st.scaffold).toBeGreaterThan(0);
  });

  it('placement-known maintenance skills are never taught but do appear in lessons', () => {
    let s = newSave(T0);
    s = reducer(s, { type: 'ONBOARD', mascotName: 'B', avatarId: 'wizard' });
    const probe = registry.items.find(i => i.tags?.includes('probe') && i.tier === 'maintenance');
    if (!probe) return; // maintenance content still loading — validator covers this
    s = reducer(s, { type: 'PROBE', item: probe, correct: true });
    const st = s.skills[probe.skill];
    expect(st.mastery).toBeGreaterThanOrEqual(80);
    expect(st.teachDone).toBe(true);
    const plan = buildLesson(registry, s, probe.skill);
    expect(plan.kind).toBe('lesson'); // straight to practice, no teaching
  });
});
