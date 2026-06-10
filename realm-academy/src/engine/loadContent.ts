/**
 * Loads all JSON content eagerly via Vite glob imports and builds the registry.
 * Fully offline: content ships inside the bundle.
 */

import type { Item, SkillDef, TeachSequence, BossDef } from './types';
import { ContentRegistry } from './registry';

interface ContentFile {
  items?: Item[];
  sequences?: TeachSequence[];
  skills?: SkillDef[];
  bosses?: BossDef[];
  words?: SwahiliWord[];
  facts?: FactCard[];
  questions?: ImpossibleQ[];
  interests?: InterestDef[];
  playerName?: string;
  mascotSuggestions?: string[];
}

export interface SwahiliWord {
  sw: string;
  en: string;
  phonetic: string;
  note: string;
}
export interface FactCard {
  skill: string;
  title: string;
  emoji: string;
  text: string;
}
export interface ImpossibleQ {
  id: string;
  q: string;
  options: string[];
  answer: string;
  why: string;
}
export interface InterestDef {
  id: string;
  label: string;
  emoji: string;
}

export interface FlavorContent {
  swahili: SwahiliWord[];
  facts: FactCard[];
  impossible: ImpossibleQ[];
  interests: InterestDef[];
  playerName: string;
  mascotSuggestions: string[];
}

const modules = import.meta.glob('../content/*.json', { eager: true }) as Record<
  string,
  { default: ContentFile } | ContentFile
>;

function fileData(mod: { default: ContentFile } | ContentFile): ContentFile {
  return 'default' in mod ? (mod as { default: ContentFile }).default : (mod as ContentFile);
}

let cachedRegistry: ContentRegistry | null = null;
let cachedFlavor: FlavorContent | null = null;

export function loadRegistry(): ContentRegistry {
  if (cachedRegistry) return cachedRegistry;
  const reg = new ContentRegistry();
  for (const [path, mod] of Object.entries(modules)) {
    const data = fileData(mod);
    if (data.skills) reg.addSkills(data.skills);
    if (data.bosses) reg.bosses.push(...data.bosses);
    if (data.items) reg.addItems(data.items);
    if (data.sequences) reg.addTeachSequences(data.sequences);
    void path;
  }
  cachedRegistry = reg;
  return reg;
}

export function loadFlavor(): FlavorContent {
  if (cachedFlavor) return cachedFlavor;
  const flavor: FlavorContent = {
    swahili: [],
    facts: [],
    impossible: [],
    interests: [],
    playerName: 'Explorer',
    mascotSuggestions: ['Biscuit', 'Nimbus'],
  };
  for (const [path, mod] of Object.entries(modules)) {
    const data = fileData(mod);
    if (path.endsWith('swahili.json') && data.words) flavor.swahili = data.words;
    if (path.endsWith('facts.json') && data.facts) flavor.facts = data.facts;
    if (path.endsWith('impossible.json') && data.questions) flavor.impossible = data.questions;
    if (path.endsWith('interests.json')) {
      if (data.interests) flavor.interests = data.interests;
      if (data.playerName) flavor.playerName = data.playerName;
      if (data.mascotSuggestions) flavor.mascotSuggestions = data.mascotSuggestions;
    }
  }
  cachedFlavor = flavor;
  return flavor;
}
