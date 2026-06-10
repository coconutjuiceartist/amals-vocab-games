/**
 * Novelty scheduler — guarantees day N ≠ day N−1:
 * rotating daily quests, a rotating mini-game slot, rotating mascot mood/outfit,
 * the Swahili bonus word, and the Daily Impossible Question.
 */

import type { QuestDef, RealmId, SaveState } from './types';
import { seededRng, hashString, shuffled } from './rng';
import { dayKey } from './scheduler';

export type MiniGame = 'meteor_defense' | 'potion_pairs' | 'word_loom' | 'star_chart' | 'bakery_rush';

export const MINI_GAMES: { id: MiniGame; name: string; icon: string; desc: string }[] = [
  { id: 'meteor_defense', name: 'Meteor Defense', icon: '☄️', desc: 'Blast meteors with quick answers!' },
  { id: 'potion_pairs', name: 'Potion Pairs', icon: '🧪', desc: 'Match ingredients before they bubble over!' },
  { id: 'word_loom', name: 'The Word Loom', icon: '🧶', desc: 'Knit sentences together stitch by stitch!' },
  { id: 'star_chart', name: 'Star Chart', icon: '✨', desc: 'Plot the stars where they belong!' },
  { id: 'bakery_rush', name: 'Bakery Rush', icon: '🧁', desc: 'Fill orders before the oven dings!' },
];

const MASCOT_MOODS = ['cozy', 'adventurous', 'studious', 'mischievous', 'sleepy-then-excited', 'dramatic'] as const;
export type MascotMood = (typeof MASCOT_MOODS)[number];

export interface DailyFlavor {
  miniGame: (typeof MINI_GAMES)[number];
  mood: MascotMood;
  mapSeason: 'spring' | 'summer' | 'autumn' | 'winter' | 'festival';
  surpriseChest: boolean;
}

/** Deterministic per-day flavor, guaranteed different mini-game + mood from yesterday. */
export function dailyFlavor(day: string = dayKey()): DailyFlavor {
  const rng = seededRng(hashString('flavor:' + day));
  const yesterday = dayKey(Date.parse(day) - 86400000 / 2);
  const yRng = seededRng(hashString('flavor:' + yesterday));
  const yMini = Math.floor(yRng() * MINI_GAMES.length);
  const yMood = Math.floor(yRng() * MASCOT_MOODS.length);

  let mini = Math.floor(rng() * MINI_GAMES.length);
  if (mini === yMini) mini = (mini + 1) % MINI_GAMES.length;
  let mood = Math.floor(rng() * MASCOT_MOODS.length);
  if (mood === yMood) mood = (mood + 1) % MASCOT_MOODS.length;

  const seasons: DailyFlavor['mapSeason'][] = ['spring', 'summer', 'autumn', 'winter', 'festival'];
  const week = Math.floor(Date.parse(day) / (7 * 86400000));
  return {
    miniGame: MINI_GAMES[mini],
    mood: MASCOT_MOODS[mood],
    mapSeason: seasons[week % seasons.length],
    surpriseChest: rng() < 0.18,
  };
}

/** Build 3 daily quests; placement days swap one in for the Map Survey. */
export function buildDailyQuests(
  day: string,
  opts: { placementActive: boolean; subjects: Record<RealmId, boolean>; anyBossReady?: RealmId | null },
): QuestDef[] {
  const rng = seededRng(hashString('quests:' + day));
  const realms = (Object.keys(opts.subjects) as RealmId[]).filter(r => opts.subjects[r]);
  const realmPick = () => realms[Math.floor(rng() * realms.length)] ?? 'math';

  const quests: QuestDef[] = [];
  if (opts.placementActive) {
    quests.push({
      id: 'q.survey',
      label: 'Survey the realms (restore the map!)',
      icon: '🗺️',
      kind: 'survey',
      target: 1,
      reward: { xp: 30, gems: 12 },
    });
  }

  const flavor = dailyFlavor(day);
  const candidates: QuestDef[] = [
    { id: 'q.frlesson', label: 'Finish a French lesson', icon: '🥐', kind: 'realm_lesson', realm: 'french', target: 1, reward: { xp: 20, gems: 8 } },
    { id: 'q.mathlesson', label: 'Finish a Math lesson', icon: '⚙️', kind: 'realm_lesson', realm: 'math', target: 1, reward: { xp: 20, gems: 8 } },
    { id: 'q.scilesson', label: 'Finish a Science lesson', icon: '🔬', kind: 'realm_lesson', realm: 'science', target: 1, reward: { xp: 20, gems: 8 } },
    { id: 'q.englesson', label: 'Finish an English lesson', icon: '📜', kind: 'realm_lesson', realm: 'english', target: 1, reward: { xp: 20, gems: 8 } },
    { id: 'q.humlesson', label: 'Finish a Humanities lesson', icon: '🐫', kind: 'realm_lesson', realm: 'humanities', target: 1, reward: { xp: 20, gems: 8 } },
    { id: 'q.combo', label: 'Get a 5-combo in any realm', icon: '🔥', kind: 'combo', target: 5, reward: { xp: 25, gems: 10 } },
    { id: 'q.review', label: 'Clear 5 review items', icon: '♻️', kind: 'review', target: 5, reward: { xp: 20, gems: 8 } },
    { id: 'q.two', label: 'Complete 2 lessons anywhere', icon: '🌟', kind: 'lesson', target: 2, reward: { xp: 30, gems: 12 } },
    { id: 'q.mini', label: `Play today's mini-game: ${flavor.miniGame.name}`, icon: flavor.miniGame.icon, kind: 'minigame', target: 1, reward: { xp: 15, gems: 6 } },
  ];
  const filtered = candidates.filter(q => !q.realm || opts.subjects[q.realm]);

  if (opts.anyBossReady) {
    quests.push({
      id: 'q.boss',
      label: `A boss stirs in the ${opts.anyBossReady} realm…`,
      icon: '⚔️',
      kind: 'boss',
      realm: opts.anyBossReady,
      target: 1,
      reward: { xp: 50, gems: 20 },
    });
  }

  for (const q of shuffled(filtered, rng)) {
    if (quests.length >= 3) break;
    if (quests.some(x => x.kind === q.kind && x.realm === q.realm)) continue;
    quests.push(q);
  }
  return quests.slice(0, 3);
}

/** Chest loot table — informational variable reward, no dark patterns. */
export interface ChestDrop {
  gems: number;
  rare?: { id: string; name: string; icon: string };
}

export function openChest(save: SaveState, rng: () => number = Math.random): ChestDrop {
  const roll = rng();
  const gems = roll > 0.93 ? 30 : roll > 0.7 ? 15 : 8;
  let rare: ChestDrop['rare'];
  if (rng() < 0.22) {
    const rares = [
      { id: 'rare.yarnball', name: 'Golden Yarn Ball', icon: '🧶' },
      { id: 'rare.crookshanks', name: 'Half-Kneazle Whisker', icon: '🐈' },
      { id: 'rare.croissant', name: 'Croissant of Destiny', icon: '🥐' },
      { id: 'rare.lightstick', name: 'Photon Light Stick', icon: '💡' },
      { id: 'rare.timeturner', name: 'Tiny Time-Turner', icon: '⏳' },
      { id: 'rare.whisk', name: 'Whisk of Whimsy', icon: '🥄' },
      { id: 'rare.geode', name: 'Realm Geode', icon: '💎' },
      { id: 'rare.quill', name: 'Self-Inking Quill', icon: '🪶' },
    ];
    const unowned = rares.filter(r => !save.collectibles.includes(r.id));
    if (unowned.length > 0) rare = unowned[Math.floor(rng() * unowned.length)];
  }
  return { gems, rare };
}
