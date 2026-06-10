/**
 * Realm Academy — core type system.
 * Content lives in /src/content/*.json and conforms to these types.
 * See /src/content/SCHEMA.md for the authoring guide.
 */

export type RealmId = 'math' | 'science' | 'english' | 'french' | 'humanities';

export type Tier = 'frontier' | 'maintenance' | 'diagnose';

/** All exercise interaction types (the boredom-killers). */
export type ExerciseType =
  | 'multiple_choice'
  | 'type_answer'
  | 'matching_pairs'
  | 'drag_categorize'
  | 'order_sequence'
  | 'fill_blank'
  | 'listening'
  | 'spot_error'
  | 'speed_round'
  | 'number_line_tap'
  | 'diagram_label'
  | 'two_truths'
  | 'worked_example'
  | 'worked_completion'
  | 'visual_model';

/** Visual-math-model modes (one component family, several modes). */
export type VisualModel =
  | 'tape_diagram'
  | 'double_number_line'
  | 'ratio_table'
  | 'percent_bar'
  | 'area_decomposer'
  | 'balance_scale'
  | 'plot_builder'
  | 'net_match'
  | 'none';

// ---------------------------------------------------------------------------
// Type-specific payloads (item.data)
// ---------------------------------------------------------------------------

export interface WorkedStep {
  text: string;
  /** Optional self-explanation checkpoint: "why does this step work?" */
  check?: { question: string; options: string[]; answer: number };
}

export interface ItemData {
  /** worked_example */
  steps?: WorkedStep[];
  /** worked_completion / fill_blank: lines with [[answer]] blanks inline */
  lines?: string[];
  /** matching_pairs: [left, right] pairs (3–6) */
  pairs?: [string, string][];
  /** drag_categorize: category name -> members */
  categories?: Record<string, string[]>;
  /** order_sequence: items in CORRECT order (component shuffles) */
  sequence?: string[];
  /** two_truths: the two true statements */
  truths?: string[];
  /** two_truths: the lie */
  lie?: string;
  /** listening / French audio: text spoken aloud by TTS */
  audioText?: string;
  /** listening: language hint, e.g. 'fr-FR', 'sw' */
  lang?: string;
  /** number_line_tap: range + tick step */
  numberLine?: { min: number; max: number; step: number };
  /** number_line_tap (coordinate mode): grid half-size, answer is "x,y" */
  coordinatePlane?: { size: number };
  /** diagram_label: which built-in diagram to render */
  diagram?: 'food_web' | 'wave' | 'water_cycle' | 'energy_pyramid' | 'circle_parts' | 'plant_cell';
  /** diagram_label: slot id -> correct label */
  slots?: Record<string, string>;
  /** diagram_label: the label bank (correct labels + decoys) */
  labels?: string[];
  /** visual_model: model-specific config (see SCHEMA.md) */
  model?: Record<string, unknown>;
  /** speed_round: [prompt, answer] flashcards */
  cards?: [string, string][];
  /** spot_error: the flawed text/equation, shown segmented; answer = index of flawed segment */
  segments?: string[];
}

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

export interface Item {
  id: string;
  realm: RealmId;
  /** Skill id this item trains, e.g. "math.ratios" */
  skill: string;
  tier: Tier;
  /** 1 (gentle) – 5 (legendary) */
  difficulty: 1 | 2 | 3 | 4 | 5;
  type: ExerciseType;
  model?: VisualModel;
  /** 0 = independent. 1–3 = scaffolded variants (more support). */
  scaffoldLevel?: 0 | 1 | 2 | 3;
  prompt: string;
  /** Canonical answer(s). Checker accepts any listed form. */
  answer: string | number | string[];
  /** multiple_choice / spot_error / listening choices (includes the answer) */
  options?: string[];
  hint?: string;
  /** ≤2 sentences, shown on miss and on demand. */
  explanation?: string;
  /** Set when this item belongs to a teach sequence. */
  teachSequenceId?: string;
  /** Interests/personalization + curriculum tags. */
  tags?: string[];
  data?: ItemData;
}

// ---------------------------------------------------------------------------
// Teach sequences (Bridge → Gambit → Worked → Completion → Burst)
// ---------------------------------------------------------------------------

export type TeachScreen =
  | {
      kind: 'bridge';
      title: string;
      /** ≤2 short sentences per line; one idea per screen */
      lines: string[];
      /** key vocabulary pre-taught on the bridge */
      vocab?: { term: string; meaning: string }[];
      /** small inline visual: name of a built-in illustration */
      visual?: 'balance' | 'speed' | 'number_line' | 'tape' | 'percent' | 'grid' | 'none';
    }
  | { kind: 'gambit'; itemId: string; framing: string }
  | { kind: 'worked'; itemId: string }
  | { kind: 'completion'; itemId: string }
  | { kind: 'burst'; itemIds: string[] };

export interface TeachSequence {
  id: string;
  skill: string;
  title: string;
  screens: TeachScreen[];
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export interface SkillDef {
  id: string;
  realm: RealmId;
  name: string;
  icon: string;
  tier: Tier;
  /** Region of the realm map this skill restores. */
  region?: string;
  teachSequenceId?: string;
  /** Order on the map within the realm. */
  order: number;
  /** Skill that should be at least TAUGHT before this unlocks (soft gate). */
  after?: string;
  enrichment?: boolean;
}

export interface BossDef {
  id: string;
  realm: RealmId;
  name: string;
  icon: string;
  /** Skills covered by the gauntlet; boss unlocks when all are ≥80 mastery. */
  skills: string[];
  taunt: string;
  defeatLine: string;
}

// ---------------------------------------------------------------------------
// Learner state
// ---------------------------------------------------------------------------

export type SkillPhase = 'UNSEEN' | 'TAUGHT' | 'PRACTICING' | 'MASTERED' | 'CROWNED' | 'DUSTY';

export interface SkillState {
  phase: SkillPhase;
  /** 0–100 recency-weighted accuracy */
  mastery: number;
  /** rolling window of recent results (1 = correct), newest last, max 12 */
  window: number[];
  /** ISO days (YYYY-MM-DD) with ≥1 successful spaced retrieval */
  retrievalDays: string[];
  /** current scaffold level served by the governor */
  scaffold: 0 | 1 | 2 | 3;
  teachDone: boolean;
  /** epoch ms of last practice */
  lastSeen: number;
  /** parent override: 'known' | 'unknown' | undefined */
  override?: 'known' | 'unknown';
}

export interface CardSchedule {
  /** epoch ms when due */
  due: number;
  /** current interval in days (0 = learning) */
  interval: number;
  ease: number;
  reps: number;
  lapses: number;
  lastResult?: boolean;
  lastReviewDay?: string;
}

export interface QuestDef {
  id: string;
  label: string;
  icon: string;
  kind: 'lesson' | 'realm_lesson' | 'combo' | 'review' | 'boss' | 'minigame' | 'teach' | 'survey';
  realm?: RealmId;
  target: number;
  reward: { xp: number; gems: number };
}

export interface DailyQuestState {
  date: string;
  quests: QuestDef[];
  progress: Record<string, number>;
  claimed: string[];
}

export interface SessionLogEntry {
  day: string;
  minutes: number;
  items: number;
  correct: number;
  lessons: number;
  xp: number;
}

export interface PlacementState {
  /** probe items answered, by item id */
  answered: Record<string, boolean>;
  /** days on which probes were served */
  daysRun: string[];
  complete: boolean;
}

export interface Settings {
  sound: boolean;
  speaking: boolean;
  dailyGoalLessons: number;
  subjects: Record<RealmId, boolean>;
  reducedMotion: boolean;
}

export interface SaveState {
  version: number;
  created: number;
  /** first-run complete */
  onboarded: boolean;
  mascotName: string;
  avatarId: string;
  playerName: string;
  xp: number;
  gems: number;
  streak: { current: number; best: number; lastDay: string; shields: number };
  skills: Record<string, SkillState>;
  cards: Record<string, CardSchedule>;
  quests: DailyQuestState | null;
  placement: PlacementState;
  collectibles: string[];
  ownedShopItems: string[];
  equipped: { mascotHat: string; theme: string };
  bossesBeaten: string[];
  bestCombo: number;
  sessionLog: SessionLogEntry[];
  settings: Settings;
  /** chest waiting from yesterday's tease */
  pendingChest: boolean;
  lastSwahiliDay: string;
  /** misc one-time flags (tips shown, etc.) */
  flags: Record<string, boolean>;
  /** count of lessons completed today (for daily goal / wind-down) */
  today: { day: string; lessons: number; minutes: number; itemsSeen: string[] };
}

// ---------------------------------------------------------------------------
// Lesson plan produced by the lesson builder
// ---------------------------------------------------------------------------

export interface LessonPlan {
  kind: 'lesson' | 'teach' | 'warmup' | 'boss' | 'speed' | 'survey';
  realm: RealmId;
  skillFocus?: string;
  teachSequence?: TeachSequence;
  items: Item[];
  title: string;
}

export interface AnswerRecord {
  itemId: string;
  skill: string;
  correct: boolean;
  usedHint: boolean;
  ms: number;
}
