/**
 * Home: HUD, mascot greeting, warm-up, quest board, the island world map,
 * Swahili bonus word, Daily Impossible Question, chests.
 */

import { useMemo, useState } from 'react';
import type { RealmId, QuestDef } from '../engine/types';
import { useStore, levelFromXp } from '../engine/store';
import { loadRegistry, loadFlavor } from '../engine/loadContent';
import { dailyFlavor, openChest, MINI_GAMES } from '../engine/novelty';
import { dueCards, dayKey } from '../engine/scheduler';
import { Mascot } from './Mascot';
import { Confetti } from './Confetti';
import { playChest, playTap, playCorrect } from '../engine/audio';
import { speak, hasSwahiliVoice } from '../engine/speech';
import { seededRng, hashString, pick } from '../engine/rng';

const REALM_META: Record<RealmId, { name: string; icon: string; blurb: string }> = {
  math: { name: 'Gearspring Mountains', icon: '⚙️', blurb: 'clockwork peaks of number magic' },
  science: { name: 'Fieldstation Isles', icon: '🔬', blurb: 'an archipelago of experiments' },
  english: { name: 'Storyspire', icon: '📚', blurb: 'the library city' },
  french: { name: 'Port Lumière', icon: '🥐', blurb: 'a harbor town that speaks in song' },
  humanities: { name: 'The Caravan Route', icon: '🐫', blurb: 'roads through great cities of the past' },
};

export function Home({
  onOpenRealm,
  onWarmup,
  onSurvey,
  onMiniGame,
}: {
  onOpenRealm: (realm: RealmId) => void;
  onWarmup: () => void;
  onSurvey: () => void;
  onMiniGame: () => void;
}) {
  const { save, dispatch } = useStore();
  const registry = loadRegistry();
  const flavorContent = loadFlavor();
  const today = dayKey();
  const flavor = dailyFlavor(today);
  const level = levelFromXp(save.xp);
  const dueCount = dueCards(save.cards).length;
  const [chestOpen, setChestOpen] = useState<{ gems: number; rare?: { name: string; icon: string } } | null>(null);
  const [confetti, setConfetti] = useState(0);
  const [showImpossible, setShowImpossible] = useState(false);
  const [showSwahili, setShowSwahili] = useState(false);

  const greeting = useMemo(() => {
    const rng = seededRng(hashString('greet:' + today + save.mascotName));
    const lines: string[] = [];
    if (save.streak.current >= 2) lines.push(`Day ${save.streak.current} of your streak — the map keeps its glow because of you. 🔥`);
    if (save.flags.shieldUsed) lines.push(`Psst — a streak shield jumped in front of a missed day for you. I keep them polished. 🛡`);
    const yesterday = save.sessionLog.find(e => e.day !== today);
    if (yesterday && yesterday.correct + yesterday.items > 0) lines.push(`Yesterday you cleared ${yesterday.lessons} lesson${yesterday.lessons === 1 ? '' : 's'} — today we build on it.`);
    if (dueCount > 0) lines.push(`${dueCount} memories are due for a quick dust-off — warm-ups first, glory after.`);
    if (!save.placement.complete) lines.push(`The survey continues! Answer my map questions and watch the fog peel back.`);
    const moods: Record<string, string> = {
      cozy: 'I made tea. Virtual tea. It\'s the thought that counts.',
      adventurous: 'I smell unexplored territory today. Pack snacks.',
      studious: 'I\'ve been reading the scrolls all night. Quiz me. Actually no — I quiz YOU.',
      mischievous: 'I hid something in today\'s quests. Heheh.',
      'sleepy-then-excited': '*yawns* …wait, you\'re HERE! Okay okay okay let\'s GO.',
      dramatic: 'The realms TREMBLE. The bosses PACE. And you? You showed up. Magnificent.',
    };
    lines.push(moods[flavor.mood]);
    return lines.slice(0, 2).join(' ') || pick(Object.values(moods), rng);
  }, [today, save.streak.current, dueCount]);

  const swahiliWord = flavorContent.swahili[(Math.abs(hashString(today)) % Math.max(flavorContent.swahili.length, 1))];
  const impossibleQ = flavorContent.impossible[(Math.abs(hashString('imp' + today)) % Math.max(flavorContent.impossible.length, 1))];

  const realms = (Object.keys(REALM_META) as RealmId[]).filter(r => save.settings.subjects[r]);
  const realmMastery = (realm: RealmId) => {
    const skills = registry.realmSkills(realm).filter(s => !s.enrichment);
    if (skills.length === 0) return 0;
    return Math.round(skills.reduce((a, s) => a + (save.skills[s.id]?.mastery ?? 0), 0) / skills.length);
  };

  const claimQuest = (q: QuestDef) => {
    dispatch({ type: 'CLAIM_QUEST', questId: q.id });
    playCorrect(2);
    setConfetti(c => c + 1);
  };

  const openTheChest = () => {
    const drop = openChest(save);
    dispatch({ type: 'OPEN_CHEST', gems: drop.gems, rareId: drop.rare?.id });
    setChestOpen(drop);
    playChest();
    setConfetti(c => c + 1);
  };

  const questDone = (q: QuestDef) => (save.quests?.progress[q.id] ?? 0) >= q.target;
  const goalReached = save.today.lessons >= save.settings.dailyGoalLessons;

  return (
    <div>
      <Confetti trigger={confetti} />
      {/* HUD */}
      <div className="hud">
        <span className="stat"><span className="icon streak-flame">🔥</span>{save.streak.current}
          {save.streak.shields > 0 && <span className="small dim">🛡×{save.streak.shields}</span>}
        </span>
        <span className="stat"><span className="icon">💎</span>{save.gems}</span>
        <span className="stat" style={{ flex: 1, maxWidth: 200 }}>
          <span className="small dim">Lv{level.level}</span>
          <span className="levelbar" style={{ flex: 1 }}><div style={{ width: `${(level.into / level.needed) * 100}%` }} /></span>
        </span>
      </div>

      {/* mascot greeting */}
      <div className="mascot-wrap" style={{ marginTop: 10 }}>
        <Mascot pose={flavor.mood === 'sleepy-then-excited' ? 'sleepy' : flavor.mood === 'dramatic' ? 'surprised' : 'happy'} size={104} hat={save.equipped.mascotHat} />
        <div className="speech">
          <b>{save.mascotName}:</b> {greeting}
          <div className="row" style={{ marginTop: 8 }}>
            {save.lastSwahiliDay !== today && (
              <button className="btn btn-small btn-ghost" onClick={() => { setShowSwahili(true); playTap(); }}>
                🌍 Swahili word of the day
              </button>
            )}
            <button className="btn btn-small btn-ghost" onClick={() => { setShowImpossible(true); playTap(); }}>
              🌀 Daily Impossible
            </button>
          </div>
        </div>
      </div>

      {/* warm-up */}
      {dueCount >= 2 && (
        <div className="card card-pop spread" style={{ borderColor: 'var(--gem)' }}>
          <div>
            <b>☕ Morning Warm-Up</b>
            <div className="dim small">{Math.min(dueCount, 3)} quick review items · ~1 minute · memories love this</div>
          </div>
          <button className="btn btn-good" onClick={onWarmup}>Go</button>
        </div>
      )}

      {/* daily goal + chest */}
      <div className="card spread">
        <div>
          <b>🎯 Daily goal:</b> {Math.min(save.today.lessons, save.settings.dailyGoalLessons)}/{save.settings.dailyGoalLessons} lessons
          {goalReached && <span className="chip" style={{ marginLeft: 8, borderColor: 'var(--good)' }}>done! 🌟</span>}
        </div>
        {(save.pendingChest || (goalReached && flavor.surpriseChest)) && !chestOpen && (
          <div className="chest" onClick={openTheChest} title="open!">🎁</div>
        )}
      </div>
      {chestOpen && (
        <div className="card card-pop center pop-in" style={{ borderColor: 'var(--accent)' }}>
          <div style={{ fontSize: '2rem' }}>💎 +{chestOpen.gems}</div>
          {chestOpen.rare && <div className="big">RARE FIND: {chestOpen.rare.icon} <b>{chestOpen.rare.name}</b> → added to your museum!</div>}
        </div>
      )}

      {/* quests */}
      <h3 style={{ marginTop: 20 }}>📜 Today's Quests</h3>
      {save.quests?.quests.map(q => {
        const prog = Math.min(save.quests?.progress[q.id] ?? 0, q.target);
        const done = questDone(q);
        const claimed = save.quests?.claimed.includes(q.id);
        return (
          <div key={q.id} className={`quest ${done ? 'done' : ''}`}>
            <div className="q-icon">{q.icon}</div>
            <div style={{ flex: 1 }}>
              <b>{q.label}</b>
              <div className="quest-progress"><div style={{ width: `${(prog / q.target) * 100}%` }} /></div>
              <div className="dim small">{prog}/{q.target} · +{q.reward.xp}xp +{q.reward.gems}💎</div>
            </div>
            {q.kind === 'survey' && !done && (
              <button className="btn btn-small btn-realm realm-math" onClick={onSurvey}>Survey</button>
            )}
            {q.kind === 'minigame' && !done && (
              <button className="btn btn-small btn-primary" onClick={onMiniGame}>Play</button>
            )}
            {done && !claimed && (
              <button className="btn btn-small btn-primary sparkle" onClick={() => claimQuest(q)}>Claim!</button>
            )}
            {claimed && <span className="chip">✓</span>}
          </div>
        );
      })}

      {/* world map */}
      <h3 style={{ marginTop: 20 }}>🗺️ The Realms <span className="dim small">· season of {flavor.mapSeason}</span></h3>
      <div className="map-sky" style={{ background: seasonSky(flavor.mapSeason) }}>
        <svg viewBox="0 0 800 470" style={{ width: '100%', display: 'block' }}>
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#ffd166" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffd166" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* decorative water sparkles */}
          {Array.from({ length: 14 }).map((_, i) => {
            const rng = seededRng(hashString('spark' + i + today));
            return <circle key={i} cx={40 + rng() * 720} cy={40 + rng() * 390} r={1.6} fill="#ffffff55" className="sparkle" />;
          })}
          {realms.map((realm, i) => {
            const meta = REALM_META[realm];
            const positions = [
              { x: 145, y: 105 }, { x: 430, y: 80 }, { x: 660, y: 170 }, { x: 230, y: 320 }, { x: 540, y: 350 },
            ];
            const p = positions[i % positions.length];
            const mastery = realmMastery(realm);
            const crowns = registry.realmBosses(realm).filter(b => save.bossesBeaten.includes(b.id)).length;
            return (
              <g key={realm} className={`island realm-${realm}`} onClick={() => onOpenRealm(realm)} style={{ cursor: 'pointer' }}>
                {mastery >= 50 && <circle cx={p.x} cy={p.y} r={86} fill="url(#glow)" />}
                <ellipse cx={p.x} cy={p.y + 38} rx={92} ry={30} fill="#0b3550" opacity="0.65" />
                <ellipse cx={p.x} cy={p.y + 30} rx={86} ry={26} fill={islandColor(realm)} opacity={0.45 + (mastery / 100) * 0.55} />
                <text x={p.x} y={p.y + 12} textAnchor="middle" fontSize="44">{meta.icon}</text>
                <text x={p.x} y={p.y + 56} textAnchor="middle" fontSize="15.5" fontWeight="900" fill="#fff">{meta.name}</text>
                <text x={p.x} y={p.y + 74} textAnchor="middle" fontSize="11" fill="#cfd8ff">{mastery}% restored {'👑'.repeat(crowns)}</text>
                {/* mastery ring */}
                <circle cx={p.x} cy={p.y - 4} r={36} fill="none" stroke="#ffffff22" strokeWidth="5" />
                <circle
                  cx={p.x} cy={p.y - 4} r={36} fill="none" stroke={islandColor(realm)} strokeWidth="5"
                  strokeDasharray={`${(mastery / 100) * 226} 226`} strokeLinecap="round" transform={`rotate(-90 ${p.x} ${p.y - 4})`}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* tomorrow hook */}
      <div className="card dim small center">
        🔮 Tomorrow: a new mini-game ({MINI_GAMES.filter(m => m.id !== flavor.miniGame.id)[Math.abs(hashString(today)) % 4].name}),
        fresh quests, and {save.lastSwahiliDay === today ? 'another' : 'your'} Swahili word. The chest resets at dawn…
      </div>

      {/* swahili modal */}
      {showSwahili && swahiliWord && (
        <div className="modal-veil" onClick={() => { setShowSwahili(false); dispatch({ type: 'SWAHILI_SEEN' }); }}>
          <div className="modal-box center pop-in" onClick={e => e.stopPropagation()}>
            <Mascot pose="excited" size={90} hat={save.equipped.mascotHat} />
            <h2>🌍 Neno la leo — today's word</h2>
            <div className="big" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)' }}>{swahiliWord.sw}</div>
            <div className="dim">「{swahiliWord.phonetic}」</div>
            <p><b>{swahiliWord.en}</b> — {swahiliWord.note}</p>
            {hasSwahiliVoice() && (
              <button className="tts-btn" onClick={() => speak(swahiliWord.sw, 'sw')}>🔊</button>
            )}
            <div style={{ marginTop: 14 }}>
              <button className="btn btn-primary" onClick={() => { setShowSwahili(false); dispatch({ type: 'SWAHILI_SEEN' }); }}>
                Asante, {save.mascotName}! ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* impossible modal */}
      {showImpossible && impossibleQ && (
        <ImpossibleModal q={impossibleQ} onClose={() => setShowImpossible(false)} />
      )}
    </div>
  );
}

function ImpossibleModal({ q, onClose }: { q: { q: string; options: string[]; answer: string; why: string }; onClose: () => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal-box pop-in" onClick={e => e.stopPropagation()}>
        <div className="gambit-badge">🌀 Daily Impossible Question — zero stakes, pure wonder</div>
        <h3 style={{ marginTop: 10 }}>{q.q}</h3>
        <div className="options-grid">
          {q.options.map(opt => {
            let cls = 'option-btn';
            if (picked !== null) {
              if (opt === q.answer) cls += ' correct';
              else if (opt === picked) cls += ' wrong';
            }
            return (
              <button key={opt} className={cls} onClick={() => { if (!picked) { setPicked(opt); playTap(); } }}>
                {opt}
              </button>
            );
          })}
        </div>
        {picked && (
          <div className="hint-box pop-in" style={{ marginTop: 12 }}>
            <b>{picked === q.answer ? '🤯 You got the impossible one!' : '🤯 The answer surprises almost everyone:'}</b>
            <p style={{ margin: '6px 0 0' }}>{q.why}</p>
          </div>
        )}
        <div className="row" style={{ justifyContent: 'flex-end', marginTop: 12 }}>
          <button className="btn btn-primary" onClick={onClose}>{picked ? 'Mind = expanded' : 'Maybe later'}</button>
        </div>
      </div>
    </div>
  );
}

function islandColor(realm: RealmId): string {
  return { math: '#2dd4bf', science: '#86efac', english: '#c4b5fd', french: '#f9a8d4', humanities: '#fcd34d' }[realm];
}

function seasonSky(season: string): string {
  switch (season) {
    case 'spring': return 'linear-gradient(180deg, #14304f, #1d4a45)';
    case 'summer': return 'linear-gradient(180deg, #0e2a52, #20546e)';
    case 'autumn': return 'linear-gradient(180deg, #2a1f3d, #4a2c33)';
    case 'winter': return 'linear-gradient(180deg, #101c3a, #2b3a5e)';
    default: return 'linear-gradient(180deg, #2a1245, #4a1d5e)';
  }
}
