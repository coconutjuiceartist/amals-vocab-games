import { describe, it, expect } from 'vitest';
import { checkAnswer, foldAccents, parseNumeric, parseBlanks } from './checker';
import { newCard, review, isDue, dueCards, isSpacedRetrieval, INTERVAL_LADDER, dayKey } from './scheduler';
import { newSkillState, recordResult, markTaught, masteryFromWindow, seedFromPlacement, applyDustySweep } from './mastery';
import { decide, canServe, pickItem, BAND_LOW, BAND_HIGH, rollingSuccess } from './governor';
import { interleave, buildLesson, buildWarmup } from './lessonBuilder';
import { ContentRegistry } from './registry';
import { recordProbe, nextProbes, PROBES_PER_DAY } from './placement';
import { newSave, importSave, exportSave, rollDay, creditStreak } from './persistence';
import type { Item, SkillDef, TeachSequence, SaveState } from './types';

const DAY = 24 * 3600 * 1000;

// ───────────────────────────── checker ─────────────────────────────

describe('answer checker', () => {
  it('accepts exact text, case- and whitespace-insensitively', () => {
    expect(checkAnswer('  Le Chat ', 'le chat').correct).toBe(true);
    expect(checkAnswer('le  chat', 'le chat').correct).toBe(true);
    expect(checkAnswer('le chien', 'le chat').correct).toBe(false);
  });

  it('is accent-forgiving for French and reports the accented form', () => {
    const res = checkAnswer('eleve', 'élève');
    expect(res.correct).toBe(true);
    expect(res.accentNote).toBe('élève');
    // typing it correctly gives no note
    expect(checkAnswer('élève', 'élève').accentNote).toBeUndefined();
    expect(checkAnswer('garcon', 'garçon').correct).toBe(true);
    expect(checkAnswer('soeur', 'sœur').correct).toBe(true);
  });

  it('treats numeric equivalents as equal (0.5 = 1/2 = 50%)', () => {
    expect(checkAnswer('1/2', '0.5').correct).toBe(true);
    expect(checkAnswer('50%', '0.5').correct).toBe(true);
    expect(checkAnswer('0.50', '1/2').correct).toBe(true);
    expect(checkAnswer('2 1/2', '2.5').correct).toBe(true);
    expect(checkAnswer('$1.35', '1.35').correct).toBe(true);
    expect(checkAnswer('22.5 cups', '22.5').correct).toBe(true);
    expect(checkAnswer('0.51', '0.5').correct).toBe(false);
  });

  it('matches ratio notation 3:4 = "3 to 4" but NOT reduced forms', () => {
    expect(checkAnswer('3 to 4', '3:4').correct).toBe(true);
    expect(checkAnswer('3 : 4', '3:4').correct).toBe(true);
    expect(checkAnswer('6:8', '3:4').correct).toBe(false);
  });

  it('accepts any listed alternate answer', () => {
    expect(checkAnswer('12 spoonfuls', ['12', '12 spoonfuls']).correct).toBe(true);
    expect(checkAnswer('twelve', ['12', '12 spoonfuls']).correct).toBe(false);
  });

  it('rejects empty input', () => {
    expect(checkAnswer('', '5').correct).toBe(false);
    expect(checkAnswer('   ', 'anything').correct).toBe(false);
  });

  it('parses numerics robustly', () => {
    expect(parseNumeric('3/4')).toBeCloseTo(0.75);
    expect(parseNumeric('-1 1/2')).toBeCloseTo(-1.5);
    expect(parseNumeric('33%')).toBeCloseTo(0.33);
    expect(parseNumeric('abc')).toBeNull();
    expect(parseNumeric('3/0')).toBeNull();
  });

  it('folds accents fully', () => {
    expect(foldAccents('àâçéèêëîïôûùüÿŒœ')).toBe('aaceeeeiiouuuyOEoe');
  });

  it('parses [[blank]] lines with alternates', () => {
    const parsed = parseBlanks('answer is [[4|four]] exactly');
    const blank = parsed.parts.find(p => p.blank);
    expect(blank?.blank).toEqual(['4', 'four']);
    expect(parsed.parts[0].text).toBe('answer is ');
  });
});

// ───────────────────────────── scheduler ─────────────────────────────

describe('SM-2-lite scheduler', () => {
  it('climbs the 1→3→7→16→35 ladder on successes', () => {
    const t0 = Date.parse('2026-06-01T10:00:00');
    let card = newCard(t0);
    const intervals: number[] = [];
    let now = t0;
    for (let i = 0; i < 5; i++) {
      card = review(card, true, now);
      intervals.push(card.interval);
      now = card.due;
    }
    expect(intervals).toEqual(INTERVAL_LADDER);
  });

  it('continues with ease multiplier past the ladder', () => {
    const t0 = Date.parse('2026-06-01T10:00:00');
    let card = newCard(t0);
    let now = t0;
    for (let i = 0; i < 6; i++) {
      card = review(card, true, now);
      now = card.due;
    }
    expect(card.interval).toBeGreaterThan(35);
  });

  it('resets to 1 day on a lapse and drops ease', () => {
    const t0 = Date.parse('2026-06-01T10:00:00');
    let card = newCard(t0);
    card = review(card, true, t0);
    card = review(card, true, card.due);
    const easeBefore = card.ease;
    card = review(card, false, card.due);
    expect(card.interval).toBe(1);
    expect(card.lapses).toBe(1);
    expect(card.ease).toBeLessThan(easeBefore);
    expect(card.due - Date.now()).toBeLessThanOrEqual(DAY + 1000);
  });

  it('dueCards returns most-overdue first', () => {
    const now = Date.now();
    const cards = {
      a: { ...newCard(now), due: now - DAY },
      b: { ...newCard(now), due: now - 3 * DAY },
      c: { ...newCard(now), due: now + DAY },
    };
    expect(dueCards(cards, now)).toEqual(['b', 'a']);
    expect(isDue(cards.c, now)).toBe(false);
  });

  it('marks retrieval as spaced only across calendar days', () => {
    const t0 = Date.parse('2026-06-01T10:00:00');
    let card = newCard(t0);
    card = review(card, true, t0);
    expect(isSpacedRetrieval(card, t0 + 3600 * 1000)).toBe(false); // same day
    expect(isSpacedRetrieval(card, t0 + DAY)).toBe(true); // next day
  });
});

// ───────────────────────────── mastery ─────────────────────────────

describe('mastery & successive relearning', () => {
  it('weights recent results more heavily', () => {
    const oldBadNewGood = masteryFromWindow([0, 0, 1, 1, 1, 1]);
    const oldGoodNewBad = masteryFromWindow([1, 1, 1, 1, 0, 0]);
    expect(oldBadNewGood).toBeGreaterThan(oldGoodNewBad);
  });

  it('requires 3 successful retrievals on 3 DIFFERENT days for MASTERED', () => {
    const t0 = Date.parse('2026-06-01T10:00:00');
    let st = markTaught(newSkillState(), t0);
    // ten correct same-day answers: high mastery but NOT mastered
    for (let i = 0; i < 10; i++) {
      st = recordResult(st, true, { spaced: false, now: t0 + i * 60000 });
    }
    expect(st.mastery).toBeGreaterThanOrEqual(80);
    expect(st.phase).toBe('PRACTICING');
    // spaced successes on 3 distinct days
    st = recordResult(st, true, { spaced: true, now: t0 + 1 * DAY });
    expect(st.phase).toBe('PRACTICING');
    st = recordResult(st, true, { spaced: true, now: t0 + 3 * DAY });
    expect(st.phase).toBe('PRACTICING');
    st = recordResult(st, true, { spaced: true, now: t0 + 7 * DAY });
    expect(st.phase).toBe('MASTERED');
    expect(st.retrievalDays.length).toBe(3);
  });

  it('same-day spaced retrievals only count one day', () => {
    const t0 = Date.parse('2026-06-01T10:00:00');
    let st = markTaught(newSkillState(), t0);
    st = recordResult(st, true, { spaced: true, now: t0 });
    st = recordResult(st, true, { spaced: true, now: t0 + 60000 });
    expect(st.retrievalDays.length).toBe(1);
  });

  it('placement seeding marks skills 80–100 with teaching skipped', () => {
    for (let i = 0; i < 20; i++) {
      const st = seedFromPlacement(newSkillState(), true);
      expect(st.mastery).toBeGreaterThanOrEqual(80);
      expect(st.mastery).toBeLessThanOrEqual(100);
      expect(st.teachDone).toBe(true);
      expect(st.phase).toBe('PRACTICING');
    }
    const miss = seedFromPlacement(newSkillState(), false);
    expect(miss.mastery).toBe(0);
  });

  it('sweeps untouched mastered skills to DUSTY after ~3 weeks', () => {
    const t0 = Date.parse('2026-06-01T10:00:00');
    let st = newSkillState();
    st = { ...st, phase: 'MASTERED', lastSeen: t0 };
    expect(applyDustySweep(st, t0 + 10 * DAY).phase).toBe('MASTERED');
    expect(applyDustySweep(st, t0 + 22 * DAY).phase).toBe('DUSTY');
  });
});

// ───────────────────────────── governor ─────────────────────────────

function mkItem(over: Partial<Item> & { id: string }): Item {
  return {
    realm: 'math',
    skill: 'math.test',
    tier: 'frontier',
    difficulty: 2,
    type: 'type_answer',
    prompt: 'p',
    answer: '1',
    ...over,
  } as Item;
}

const frontierSkill: SkillDef = {
  id: 'math.test', realm: 'math', name: 'T', icon: 'x', tier: 'frontier', order: 1, teachSequenceId: 'teach.math.test',
};
const maintSkill: SkillDef = {
  id: 'math.m.test', realm: 'math', name: 'M', icon: 'x', tier: 'maintenance', order: 2,
};

describe('difficulty governor', () => {
  it('eases difficulty and raises scaffolds below the 75% band', () => {
    let st = newSkillState();
    st = { ...st, window: [0, 0, 1, 0, 0, 0], mastery: 40, scaffold: 0 };
    const d = decide(st);
    expect(rollingSuccess(st.window)!).toBeLessThan(BAND_LOW);
    expect(d.scaffold).toBeGreaterThan(0);
    expect(d.hintsProminent).toBe(true);
    expect(d.difficulty).toBeLessThanOrEqual(2);
  });

  it('raises difficulty and fades scaffolds above the 88% band', () => {
    let st = newSkillState();
    st = { ...st, window: [1, 1, 1, 1, 1, 1, 1, 1], mastery: 85, scaffold: 2 };
    const d = decide(st);
    expect(rollingSuccess(st.window)!).toBeGreaterThan(BAND_HIGH);
    expect(d.scaffold).toBe(1); // faded by one
    expect(d.difficulty).toBeGreaterThanOrEqual(4);
  });

  it('holds steady inside the band', () => {
    let st = newSkillState();
    st = { ...st, window: [1, 1, 0, 1, 1, 1, 0, 1], mastery: 60, scaffold: 1 };
    const success = rollingSuccess(st.window)!;
    expect(success).toBeGreaterThanOrEqual(BAND_LOW);
    expect(success).toBeLessThanOrEqual(BAND_HIGH);
    expect(decide(st).scaffold).toBe(1); // unchanged
  });

  it('INVARIANT: never serves independent frontier items before teaching', () => {
    const untaught = newSkillState();
    const item = mkItem({ id: 'i1' });
    expect(canServe(item, frontierSkill, untaught)).toBe(false);
    const taught = markTaught(newSkillState());
    expect(canServe(item, frontierSkill, taught)).toBe(true);
    // parent override unlocks too
    const overridden = { ...newSkillState(), override: 'known' as const };
    expect(canServe(item, frontierSkill, overridden)).toBe(true);
  });

  it('INVARIANT: never serves teach items in lessons, never teaches maintenance', () => {
    const teachItem = mkItem({ id: 'i2', teachSequenceId: 'teach.math.test' });
    const taught = markTaught(newSkillState());
    expect(canServe(teachItem, frontierSkill, taught)).toBe(false);
    const maintTeachItem = mkItem({ id: 'i3', skill: 'math.m.test', tier: 'maintenance', teachSequenceId: 'teach.x' });
    expect(canServe(maintTeachItem, maintSkill, newSkillState())).toBe(false);
    // maintenance practice items always servable
    const maintItem = mkItem({ id: 'i4', skill: 'math.m.test', tier: 'maintenance' });
    expect(canServe(maintItem, maintSkill, newSkillState())).toBe(true);
  });

  it('pickItem prefers the target difficulty and scaffold', () => {
    const pool = [
      mkItem({ id: 'easy', difficulty: 1 }),
      mkItem({ id: 'mid', difficulty: 3 }),
      mkItem({ id: 'hard', difficulty: 5 }),
    ];
    const picked = pickItem(pool, { difficulty: 5, scaffold: 0, hintsProminent: false }, new Set(), () => 0);
    expect(picked?.id).toBe('hard');
  });
});

// ───────────────────────── lesson builder ─────────────────────────

function buildTestRegistry(): ContentRegistry {
  const items: Item[] = [];
  // frontier skill with teach sequence
  for (let i = 0; i < 12; i++) {
    items.push(mkItem({ id: `math.test.${i}`, difficulty: ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5 }));
  }
  items.push(mkItem({ id: 'math.test.t01', teachSequenceId: 'teach.math.test', type: 'type_answer' }));
  items.push(mkItem({ id: 'math.test.t02', teachSequenceId: 'teach.math.test', type: 'worked_example', data: { steps: [{ text: 'a' }, { text: 'b' }] } }));
  items.push(mkItem({ id: 'math.test.t03', teachSequenceId: 'teach.math.test', type: 'worked_completion', data: { lines: ['x = [[1]]'] } }));
  // maintenance pool
  for (let i = 0; i < 8; i++) {
    items.push(mkItem({ id: `math.m.test.${i}`, skill: 'math.m.test', tier: 'maintenance', type: i % 2 ? 'multiple_choice' : 'type_answer', options: i % 2 ? ['1', '2', '3'] : undefined }));
  }
  const seq: TeachSequence = {
    id: 'teach.math.test',
    skill: 'math.test',
    title: 'Test teach',
    screens: [
      { kind: 'bridge', title: 'b', lines: ['l'] },
      { kind: 'gambit', itemId: 'math.test.t01', framing: 'try' },
      { kind: 'worked', itemId: 'math.test.t02' },
      { kind: 'completion', itemId: 'math.test.t03' },
      { kind: 'burst', itemIds: ['math.test.0', 'math.test.1'] },
    ],
  };
  return new ContentRegistry({ items, skills: [frontierSkill, maintSkill], teachSequences: [seq] });
}

describe('lesson builder', () => {
  it('returns the TEACH plan for an untaught frontier skill', () => {
    const reg = buildTestRegistry();
    const save = newSave();
    const plan = buildLesson(reg, save, 'math.test');
    expect(plan.kind).toBe('teach');
    expect(plan.teachSequence?.id).toBe('teach.math.test');
    expect(plan.items.length).toBeGreaterThanOrEqual(4); // gambit + worked + completion + burst
  });

  it('returns a practice lesson once taught, sized 8–12, no teach items', () => {
    const reg = buildTestRegistry();
    const save = newSave();
    save.skills['math.test'] = markTaught(newSkillState());
    const plan = buildLesson(reg, save, 'math.test', Date.now(), () => 0.5);
    expect(plan.kind).toBe('lesson');
    expect(plan.items.length).toBeGreaterThanOrEqual(8);
    expect(plan.items.length).toBeLessThanOrEqual(12);
    expect(plan.items.every(i => !i.teachSequenceId)).toBe(true);
  });

  it('seasons math lessons with maintenance items (~15%)', () => {
    const reg = buildTestRegistry();
    const save = newSave();
    save.skills['math.test'] = markTaught(newSkillState());
    const plan = buildLesson(reg, save, 'math.test', Date.now(), () => 0.5);
    const maint = plan.items.filter(i => i.tier === 'maintenance');
    expect(maint.length).toBeGreaterThanOrEqual(1);
  });

  it('interleaves: never 3 identical types consecutively (when avoidable)', () => {
    const items: Item[] = [
      ...Array.from({ length: 5 }, (_, i) => mkItem({ id: `a${i}`, type: 'multiple_choice', options: ['1', '2', '3'] })),
      ...Array.from({ length: 5 }, (_, i) => mkItem({ id: `b${i}`, type: 'type_answer' })),
    ];
    for (let trial = 0; trial < 10; trial++) {
      const mixed = interleave(items);
      for (let i = 2; i < mixed.length; i++) {
        const same = mixed[i].type === mixed[i - 1].type && mixed[i].type === mixed[i - 2].type;
        expect(same).toBe(false);
      }
    }
  });

  it('warmup pulls 2–3 due items across realms', () => {
    const reg = buildTestRegistry();
    const save = newSave();
    save.skills['math.test'] = markTaught(newSkillState());
    const past = Date.now() - 2 * DAY;
    save.cards['math.test.0'] = { ...newCard(past), due: past };
    save.cards['math.m.test.0'] = { ...newCard(past), due: past };
    save.cards['math.m.test.1'] = { ...newCard(past), due: past };
    const plan = buildWarmup(reg, save);
    expect(plan).not.toBeNull();
    expect(plan!.items.length).toBeGreaterThanOrEqual(2);
    expect(plan!.items.length).toBeLessThanOrEqual(3);
  });
});

// ───────────────────────────── placement ─────────────────────────────

function placementRegistry(): ContentRegistry {
  const items: Item[] = [];
  for (const skill of ['math.m.a', 'math.m.b']) {
    for (let i = 0; i < 2; i++) {
      items.push(mkItem({ id: `${skill}.p${i}`, skill, tier: 'maintenance', tags: ['probe'] }));
    }
    items.push(mkItem({ id: `${skill}.x`, skill, tier: 'maintenance' }));
  }
  for (let i = 0; i < 3; i++) {
    items.push(mkItem({ id: `math.dec.p${i}`, skill: 'math.dec', tier: 'diagnose', tags: ['probe'] }));
  }
  const skills: SkillDef[] = [
    { id: 'math.m.a', realm: 'math', name: 'A', icon: 'a', tier: 'maintenance', order: 1 },
    { id: 'math.m.b', realm: 'math', name: 'B', icon: 'b', tier: 'maintenance', order: 2 },
    { id: 'math.dec', realm: 'math', name: 'Dec', icon: 'd', tier: 'diagnose', order: 3, teachSequenceId: 'teach.dec' },
  ];
  return new ContentRegistry({ items, skills });
}

describe('placement Map Survey', () => {
  it('caps probes at 10/day and spreads across skills first', () => {
    const reg = placementRegistry();
    const save = newSave();
    const probes = nextProbes(reg, save);
    expect(probes.length).toBeLessThanOrEqual(PROBES_PER_DAY);
    const firstTwoSkills = new Set(probes.slice(0, 3).map(p => p.skill));
    expect(firstTwoSkills.size).toBe(3); // one per skill before seconds
  });

  it('correct maintenance probe seeds the skill at 80–100 with teachDone', () => {
    const reg = placementRegistry();
    const save = newSave();
    const probe = reg.item('math.m.a.p0')!;
    const out = recordProbe(reg, save, probe, true);
    const st = out.skills['math.m.a'];
    expect(st.mastery).toBeGreaterThanOrEqual(80);
    expect(st.teachDone).toBe(true);
  });

  it('wrong maintenance probe leaves mastery low but never schedules teaching', () => {
    const reg = placementRegistry();
    const save = newSave();
    const probe = reg.item('math.m.a.p0')!;
    const out = recordProbe(reg, save, probe, false);
    const st = out.skills['math.m.a'];
    expect(st.mastery).toBeLessThan(80);
    expect(st.teachDone).toBe(true); // maintenance NEVER gets teaching
  });

  it('diagnose skill routes: all correct → skip, half → refresh, none → teach', () => {
    const reg = placementRegistry();
    // all 3 correct → skip (seeded known)
    let save = newSave();
    let s: SaveState = save;
    for (const id of ['math.dec.p0', 'math.dec.p1', 'math.dec.p2']) {
      const out = recordProbe(reg, s, reg.item(id)!, true);
      s = { ...s, skills: out.skills, placement: out.placement };
    }
    expect(s.skills['math.dec'].teachDone).toBe(true);
    expect(s.skills['math.dec'].mastery).toBeGreaterThanOrEqual(80);

    // 2/3 correct → refresh (teach skipped, modest mastery)
    s = newSave();
    const results = [true, true, false];
    ['math.dec.p0', 'math.dec.p1', 'math.dec.p2'].forEach((id, i) => {
      const out = recordProbe(reg, s, reg.item(id)!, results[i]);
      s = { ...s, skills: out.skills, placement: out.placement };
    });
    expect(s.skills['math.dec'].teachDone).toBe(true);
    expect(s.skills['math.dec'].mastery).toBeLessThan(80);

    // 0/3 → full teach
    s = newSave();
    ['math.dec.p0', 'math.dec.p1', 'math.dec.p2'].forEach(id => {
      const out = recordProbe(reg, s, reg.item(id)!, false);
      s = { ...s, skills: out.skills, placement: out.placement };
    });
    expect(s.skills['math.dec'].teachDone).toBe(false);
  });

  it('placement completes when all probes are answered', () => {
    const reg = placementRegistry();
    let s = newSave();
    const probeItems = reg.items.filter(i => i.tags?.includes('probe'));
    for (const p of probeItems) {
      const out = recordProbe(reg, s, p, true);
      s = { ...s, skills: out.skills, placement: out.placement };
    }
    expect(s.placement.complete).toBe(true);
  });
});

// ───────────────────────────── persistence ─────────────────────────────

describe('persistence', () => {
  it('export → import round-trips', () => {
    const save = newSave();
    save.xp = 123;
    save.mascotName = 'Biscuit';
    const imported = importSave(exportSave(save));
    expect(imported?.xp).toBe(123);
    expect(imported?.mascotName).toBe('Biscuit');
  });

  it('rejects garbage imports', () => {
    expect(importSave('not json')).toBeNull();
    expect(importSave('{"hello": 1}')).toBeNull();
  });

  it('streak credit + shields auto-cover a missed day', () => {
    const t0 = Date.parse('2026-06-01T10:00:00');
    let save = newSave(t0);
    save.settings.dailyGoalLessons = 1;
    save = creditStreak(save, t0);
    expect(save.streak.current).toBe(1);
    // next day: roll + credit
    save = { ...save, today: { ...save.today } };
    save = rollDay(save, t0 + DAY);
    save = creditStreak(save, t0 + DAY);
    expect(save.streak.current).toBe(2);
    // skip a day; shields (2) cover it
    save = rollDay(save, t0 + 3 * DAY);
    expect(save.streak.current).toBe(2);
    expect(save.streak.shields).toBe(1);
    // skip three days; 1 shield can't cover 2 missed → reset
    save = rollDay(save, t0 + 6 * DAY);
    expect(save.streak.current).toBe(0);
  });

  it('same-day goal completion only credits the streak once', () => {
    const t0 = Date.parse('2026-06-01T10:00:00');
    let save = newSave(t0);
    save = creditStreak(save, t0);
    save = creditStreak(save, t0 + 3600 * 1000);
    expect(save.streak.current).toBe(1);
  });
});
