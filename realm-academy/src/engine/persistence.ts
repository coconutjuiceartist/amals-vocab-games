/**
 * Save state persistence — one versioned localStorage key + JSON export/import.
 */

import type { SaveState, Settings } from './types';
import { dayKey } from './scheduler';

export const SAVE_KEY = 'realm-academy-save-v1';
export const SAVE_VERSION = 1;

export function defaultSettings(): Settings {
  return {
    sound: true,
    speaking: false,
    dailyGoalLessons: 2,
    subjects: { math: true, science: true, english: true, french: true, humanities: true },
    reducedMotion: false,
  };
}

export function newSave(now: number = Date.now()): SaveState {
  return {
    version: SAVE_VERSION,
    created: now,
    onboarded: false,
    mascotName: '',
    avatarId: 'wizard',
    playerName: 'Amal',
    xp: 0,
    gems: 0,
    streak: { current: 0, best: 0, lastDay: '', shields: 2 },
    skills: {},
    cards: {},
    quests: null,
    placement: { answered: {}, daysRun: [], complete: false },
    collectibles: [],
    ownedShopItems: [],
    equipped: { mascotHat: 'none', theme: 'classic' },
    bossesBeaten: [],
    bestCombo: 0,
    sessionLog: [],
    settings: defaultSettings(),
    pendingChest: false,
    lastSwahiliDay: '',
    flags: {},
    today: { day: dayKey(now), lessons: 0, minutes: 0, itemsSeen: [] },
  };
}

function storageAvailable(): boolean {
  try {
    const t = '__ra_test__';
    localStorage.setItem(t, t);
    localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

export function loadSave(): SaveState {
  if (!storageAvailable()) return newSave();
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return newSave();
    const parsed = JSON.parse(raw) as SaveState;
    if (typeof parsed !== 'object' || parsed === null || typeof parsed.version !== 'number') return newSave();
    return migrate(parsed);
  } catch {
    return newSave();
  }
}

export function persistSave(save: SaveState): void {
  if (!storageAvailable()) return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    /* quota — fail quietly, never crash a lesson */
  }
}

/** Future-proofing hook; v1 fills any missing fields from defaults. */
export function migrate(save: SaveState): SaveState {
  const base = newSave(save.created ?? Date.now());
  const merged: SaveState = {
    ...base,
    ...save,
    streak: { ...base.streak, ...save.streak },
    settings: { ...base.settings, ...(save.settings ?? {}) },
    placement: { ...base.placement, ...(save.placement ?? {}) },
    today: { ...base.today, ...(save.today ?? {}) },
    version: SAVE_VERSION,
  };
  return merged;
}

export function exportSave(save: SaveState): string {
  return JSON.stringify(save, null, 2);
}

export function importSave(json: string): SaveState | null {
  try {
    const parsed = JSON.parse(json);
    if (typeof parsed !== 'object' || parsed === null) return null;
    if (typeof parsed.version !== 'number' || !parsed.skills || !parsed.streak) return null;
    return migrate(parsed as SaveState);
  } catch {
    return null;
  }
}

/** Roll the "today" bucket + streak when a new day starts. Streak shields auto-cover gaps. */
export function rollDay(save: SaveState, now: number = Date.now()): SaveState {
  const today = dayKey(now);
  if (save.today.day === today) return save;
  const next = { ...save, today: { day: today, lessons: 0, minutes: 0, itemsSeen: [] } };
  // streak bookkeeping happens on goal-completion; here we only handle gaps
  if (save.streak.lastDay && save.streak.lastDay !== today) {
    const gap = daysBetween(save.streak.lastDay, today);
    if (gap > 1) {
      const missed = gap - 1;
      if (save.streak.shields >= missed && save.streak.current > 0) {
        next.streak = { ...save.streak, shields: save.streak.shields - missed, lastDay: yesterdayOf(today) };
        next.flags = { ...save.flags, shieldUsed: true };
      } else if (save.streak.current > 0) {
        next.streak = { ...save.streak, current: 0 };
      }
    }
  }
  if (save.today.lessons >= save.settings.dailyGoalLessons) {
    next.pendingChest = true;
  }
  return next;
}

function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}
function yesterdayOf(day: string): string {
  return dayKey(Date.parse(day) - 86400000 / 2 + 0); // close enough for bookkeeping
}

/** Called when the daily goal is reached: extend streak. */
export function creditStreak(save: SaveState, now: number = Date.now()): SaveState {
  const today = dayKey(now);
  if (save.streak.lastDay === today) return save;
  const cur = save.streak.current + 1;
  return {
    ...save,
    streak: {
      ...save.streak,
      current: cur,
      best: Math.max(save.streak.best, cur),
      lastDay: today,
      // a shield regrows every 7-day streak milestone (max 2 equipped)
      shields: cur % 7 === 0 ? Math.min(2, save.streak.shields + 1) : save.streak.shields,
    },
  };
}
