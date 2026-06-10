/**
 * App store — React context + reducer over the SaveState, with persistence.
 * All learning bookkeeping (mastery, scheduling, quests, streaks) flows through here.
 */

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { Item, SaveState, RealmId, QuestDef } from './types';
import { newSave, persistSave, loadSave, rollDay, creditStreak, importSave } from './persistence';
import { newCard, review, dayKey } from './scheduler';
import { newSkillState, recordResult, markTaught, markCrowned, applyDustySweep } from './mastery';
import { decide } from './governor';
import { recordProbe, nextProbes } from './placement';
import { buildDailyQuests, openChest } from './novelty';
import { loadRegistry } from './loadContent';
import { setMuted } from './audio';

export type Action =
  | { type: 'ONBOARD'; mascotName: string; avatarId: string }
  | { type: 'ANSWER'; item: Item; correct: boolean; isReviewDue: boolean }
  | { type: 'PROBE'; item: Item; correct: boolean }
  | { type: 'TEACH_DONE'; skillId: string }
  | { type: 'LESSON_DONE'; realm: RealmId; kind: string; xp: number; gems: number; minutes: number }
  | { type: 'COMBO'; combo: number }
  | { type: 'QUEST_PROGRESS'; kind: QuestDef['kind']; realm?: RealmId; amount?: number }
  | { type: 'CLAIM_QUEST'; questId: string }
  | { type: 'OPEN_CHEST'; gems: number; rareId?: string }
  | { type: 'BOSS_BEATEN'; bossId: string }
  | { type: 'BUY'; itemId: string; cost: number }
  | { type: 'EQUIP'; slot: 'mascotHat' | 'theme'; value: string }
  | { type: 'SET_SETTINGS'; patch: Partial<SaveState['settings']> }
  | { type: 'OVERRIDE_SKILL'; skillId: string; value: 'known' | 'unknown' | undefined }
  | { type: 'SWAHILI_SEEN' }
  | { type: 'FLAG'; key: string; value: boolean }
  | { type: 'ADD_COLLECTIBLE'; id: string }
  | { type: 'IMPORT'; json: string }
  | { type: 'RESET' }
  | { type: 'TICK_DAY' };

function ensureQuests(save: SaveState, now: number): SaveState {
  const today = dayKey(now);
  if (save.quests && save.quests.date === today) return save;
  const registry = loadRegistry();
  // find a boss whose skills all sit at mastery ≥80 and isn't beaten
  let bossRealm: RealmId | null = null;
  for (const boss of registry.bosses) {
    if (save.bossesBeaten.includes(boss.id)) continue;
    const ready = boss.skills.every(s => (save.skills[s]?.mastery ?? 0) >= 80);
    if (ready) {
      bossRealm = boss.realm;
      break;
    }
  }
  const quests = buildDailyQuests(today, {
    placementActive: !save.placement.complete,
    subjects: save.settings.subjects,
    anyBossReady: bossRealm,
  });
  return { ...save, quests: { date: today, quests, progress: {}, claimed: [] } };
}

function bumpQuest(save: SaveState, kind: QuestDef['kind'], realm: RealmId | undefined, amount: number): SaveState {
  if (!save.quests) return save;
  let changed = false;
  const progress = { ...save.quests.progress };
  for (const q of save.quests.quests) {
    if (q.kind !== kind) continue;
    if (q.kind === 'realm_lesson' && q.realm !== realm) continue;
    if (q.kind === 'combo') {
      // combo quests track the max combo, not a sum
      if ((progress[q.id] ?? 0) < amount) {
        progress[q.id] = amount;
        changed = true;
      }
      continue;
    }
    progress[q.id] = (progress[q.id] ?? 0) + amount;
    changed = true;
  }
  return changed ? { ...save, quests: { ...save.quests, progress } } : save;
}

export function reducer(save: SaveState, action: Action): SaveState {
  const now = Date.now();
  switch (action.type) {
    case 'ONBOARD':
      return { ...save, onboarded: true, mascotName: action.mascotName, avatarId: action.avatarId };

    case 'ANSWER': {
      const { item, correct, isReviewDue } = action;
      const next = { ...save, skills: { ...save.skills }, cards: { ...save.cards } };
      // card scheduling
      const card = next.cards[item.id] ?? newCard(now);
      // a success counts toward the 3-day successive-relearning rule when this
      // card hasn't already been reviewed today (first exposure counts as day 1)
      const spaced = card.lastReviewDay !== dayKey(now);
      next.cards[item.id] = review(card, correct, now);
      // skill mastery + state machine
      const prior = next.skills[item.skill] ?? newSkillState();
      let st = recordResult(prior, correct, { spaced, now });
      st = { ...st, scaffold: decide(st).scaffold };
      next.skills[item.skill] = st;
      // today's bookkeeping
      const seen = next.today.itemsSeen.includes(item.id)
        ? next.today.itemsSeen
        : [...next.today.itemsSeen, item.id];
      next.today = { ...next.today, itemsSeen: seen };
      if (isReviewDue && correct) return bumpQuest(next, 'review', undefined, 1);
      return next;
    }

    case 'PROBE': {
      const registry = loadRegistry();
      const outcome = recordProbe(registry, save, action.item, action.correct, now);
      let next = { ...save, skills: outcome.skills, placement: outcome.placement };
      next = bumpQuest(next, 'survey', undefined, 0); // progress counted on lesson completion
      return next;
    }

    case 'TEACH_DONE': {
      const prior = save.skills[action.skillId] ?? newSkillState();
      return { ...save, skills: { ...save.skills, [action.skillId]: markTaught(prior, now) } };
    }

    case 'LESSON_DONE': {
      let next = { ...save };
      next.xp = save.xp + action.xp;
      next.gems = save.gems + action.gems;
      next.today = {
        ...save.today,
        lessons: save.today.lessons + (action.kind === 'lesson' || action.kind === 'teach' || action.kind === 'boss' ? 1 : 0),
        minutes: save.today.minutes + action.minutes,
      };
      // session log
      const day = dayKey(now);
      const log = [...save.sessionLog];
      const entry = log.find(e => e.day === day);
      if (entry) {
        entry.minutes += action.minutes;
        entry.lessons += 1;
        entry.xp += action.xp;
      } else {
        log.push({ day, minutes: action.minutes, items: 0, correct: 0, lessons: 1, xp: action.xp });
      }
      next.sessionLog = log.slice(-90);
      // quests
      if (action.kind === 'lesson' || action.kind === 'teach') {
        next = bumpQuest(next, 'lesson', undefined, 1);
        next = bumpQuest(next, 'realm_lesson', action.realm, 1);
      }
      if (action.kind === 'boss') next = bumpQuest(next, 'boss', action.realm, 1);
      if (action.kind === 'speed') next = bumpQuest(next, 'minigame', undefined, 1);
      if (action.kind === 'survey') next = bumpQuest(next, 'survey', undefined, 1);
      // daily goal → streak
      if (next.today.lessons >= next.settings.dailyGoalLessons && save.streak.lastDay !== day) {
        next = creditStreak(next, now);
        next.pendingChest = true;
      }
      return next;
    }

    case 'COMBO': {
      let next = save;
      if (action.combo > save.bestCombo) next = { ...save, bestCombo: action.combo };
      return bumpQuest(next, 'combo', undefined, action.combo);
    }

    case 'QUEST_PROGRESS':
      return bumpQuest(save, action.kind, action.realm, action.amount ?? 1);

    case 'CLAIM_QUEST': {
      if (!save.quests || save.quests.claimed.includes(action.questId)) return save;
      const quest = save.quests.quests.find(q => q.id === action.questId);
      if (!quest) return save;
      return {
        ...save,
        xp: save.xp + quest.reward.xp,
        gems: save.gems + quest.reward.gems,
        quests: { ...save.quests, claimed: [...save.quests.claimed, action.questId] },
      };
    }

    case 'OPEN_CHEST': {
      const next = { ...save, gems: save.gems + action.gems, pendingChest: false };
      if (action.rareId && !next.collectibles.includes(action.rareId)) {
        next.collectibles = [...next.collectibles, action.rareId];
      }
      return next;
    }

    case 'BOSS_BEATEN': {
      if (save.bossesBeaten.includes(action.bossId)) return save;
      const registry = loadRegistry();
      const boss = registry.bosses.find(b => b.id === action.bossId);
      const skills = { ...save.skills };
      if (boss) {
        for (const sid of boss.skills) {
          const st = skills[sid] ?? newSkillState();
          skills[sid] = markCrowned(st);
        }
      }
      return {
        ...save,
        skills,
        bossesBeaten: [...save.bossesBeaten, action.bossId],
        collectibles: save.collectibles.includes('crown.' + action.bossId)
          ? save.collectibles
          : [...save.collectibles, 'crown.' + action.bossId],
      };
    }

    case 'BUY': {
      if (save.gems < action.cost || save.ownedShopItems.includes(action.itemId)) return save;
      return { ...save, gems: save.gems - action.cost, ownedShopItems: [...save.ownedShopItems, action.itemId] };
    }

    case 'EQUIP':
      return { ...save, equipped: { ...save.equipped, [action.slot]: action.value } };

    case 'SET_SETTINGS':
      return { ...save, settings: { ...save.settings, ...action.patch } };

    case 'OVERRIDE_SKILL': {
      const prior = save.skills[action.skillId] ?? newSkillState();
      const st = { ...prior, override: action.value };
      if (action.value === 'known') {
        st.teachDone = true;
        st.mastery = Math.max(st.mastery, 85);
        st.window = st.window.length ? st.window : [1, 1, 1, 1, 1];
        if (st.phase === 'UNSEEN' || st.phase === 'TAUGHT') st.phase = 'PRACTICING';
      }
      if (action.value === 'unknown') {
        st.teachDone = false;
        st.mastery = Math.min(st.mastery, 40);
        st.phase = 'UNSEEN';
      }
      return { ...save, skills: { ...save.skills, [action.skillId]: st } };
    }

    case 'SWAHILI_SEEN':
      return { ...save, lastSwahiliDay: dayKey(now) };

    case 'FLAG':
      return { ...save, flags: { ...save.flags, [action.key]: action.value } };

    case 'ADD_COLLECTIBLE':
      return save.collectibles.includes(action.id)
        ? save
        : { ...save, collectibles: [...save.collectibles, action.id] };

    case 'IMPORT': {
      const imported = importSave(action.json);
      return imported ?? save;
    }

    case 'RESET':
      return newSave(now);

    case 'TICK_DAY': {
      let next = rollDay(save, now);
      // dusty sweep
      const skills = { ...next.skills };
      let dirty = false;
      for (const [id, st] of Object.entries(skills)) {
        const swept = applyDustySweep(st, now);
        if (swept !== st) {
          skills[id] = swept;
          dirty = true;
        }
      }
      if (dirty) next = { ...next, skills };
      // placement window closed (2 days run, none left for today) → wrap it up
      if (!next.placement.complete) {
        const remaining = nextProbes(loadRegistry(), next, now);
        if (remaining.length === 0) {
          next = { ...next, placement: { ...next.placement, complete: true } };
        }
      }
      return ensureQuests(next, now);
    }
  }
}

const StoreCtx = createContext<{ save: SaveState; dispatch: React.Dispatch<Action> } | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [save, dispatch] = useReducer(reducer, undefined, () => {
    const loaded = rollDay(loadSave());
    return ensureQuests(loaded, Date.now());
  });

  useEffect(() => {
    persistSave(save);
    setMuted(!save.settings.sound);
  }, [save]);

  const value = useMemo(() => ({ save, dispatch }), [save]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore outside provider');
  return ctx;
}

/** XP → level curve: gentle early levels, slowing growth. */
export function levelFromXp(xp: number): { level: number; into: number; needed: number } {
  let level = 1;
  let threshold = 60;
  let remaining = xp;
  while (remaining >= threshold) {
    remaining -= threshold;
    level += 1;
    threshold = Math.round(threshold * 1.18);
  }
  return { level, into: remaining, needed: threshold };
}
