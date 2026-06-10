/**
 * Realm view: skill nodes with mastery bars and phases, boss gates,
 * enrichment marked as bonus. Tap a skill → teach or lesson.
 */

import type { RealmId, SkillDef, BossDef } from '../engine/types';
import { useStore } from '../engine/store';
import { loadRegistry, loadFlavor } from '../engine/loadContent';
import { newSkillState, phaseLabel } from '../engine/mastery';
import { playTap } from '../engine/audio';

export function RealmView({
  realm,
  onBack,
  onStartSkill,
  onStartBoss,
  onShowFact,
}: {
  realm: RealmId;
  onBack: () => void;
  onStartSkill: (skill: SkillDef) => void;
  onStartBoss: (boss: BossDef) => void;
  onShowFact: (skillId: string) => void;
}) {
  const { save } = useStore();
  const registry = loadRegistry();
  const flavor = loadFlavor();
  const skills = registry.realmSkills(realm);
  const bosses = registry.realmBosses(realm);

  const stateOf = (id: string) => save.skills[id] ?? newSkillState();

  const isUnlocked = (s: SkillDef): boolean => {
    if (!s.after) return true;
    const dep = stateOf(s.after);
    return dep.teachDone || dep.mastery >= 50 || dep.override === 'known';
  };

  return (
    <div className={`realm-${realm}`}>
      <div className="row" style={{ marginTop: 8 }}>
        <button className="btn btn-small btn-ghost" onClick={onBack}>← map</button>
        <h2 style={{ margin: 0 }}>{realmTitle(realm)}</h2>
      </div>

      {skills.map(s => {
        const st = stateOf(s.id);
        const unlocked = isUnlocked(s);
        const enrichGate = s.enrichment && !skills.some(o => !o.enrichment && stateOf(o.id).mastery >= 85);
        const locked = !unlocked || enrichGate;
        const factUnlocked = (st.phase === 'MASTERED' || st.phase === 'CROWNED') &&
          flavor.facts.some(f => f.skill === s.id);
        return (
          <button
            key={s.id}
            className={`skill-node ${locked ? 'locked' : ''} ${st.phase === 'CROWNED' ? 'crowned' : ''} ${st.phase === 'DUSTY' ? 'dusty' : ''}`}
            onClick={() => {
              if (locked) return;
              playTap();
              onStartSkill(s);
            }}
          >
            <div className="icon-bubble">{st.phase === 'CROWNED' ? '👑' : s.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="spread">
                <b>{s.name}{s.enrichment ? ' ✦' : ''}</b>
                <span className={`phase-tag ${st.phase === 'MASTERED' ? 'mastered' : ''} ${st.phase === 'CROWNED' ? 'crowned' : ''} ${st.phase === 'DUSTY' ? 'dusty' : ''}`}>
                  {locked ? (enrichGate ? 'bonus — master a topic to open' : 'locked') : st.phase === 'DUSTY' ? '✨ dust me off!' : phaseLabel(st.phase)}
                </span>
              </div>
              <div className="mastery-track"><div className="mastery-fill" style={{ width: `${st.mastery}%` }} /></div>
              <div className="dim small" style={{ marginTop: 3 }}>
                {s.region} · {st.mastery}/100
                {s.tier !== 'maintenance' && !st.teachDone && st.override !== 'known' && ' · 📖 starts with a lesson from the Keeper'}
                {st.retrievalDays.length > 0 && st.retrievalDays.length < 3 && ` · ${st.retrievalDays.length}/3 mastery days`}
              </div>
            </div>
            {factUnlocked && (
              <span
                className="chip sparkle"
                title="weird fact unlocked!"
                onClick={e => {
                  e.stopPropagation();
                  onShowFact(s.id);
                }}
              >
                🃏
              </span>
            )}
          </button>
        );
      })}

      <h3 style={{ marginTop: 22 }}>⚔️ Boss Lairs</h3>
      {bosses.map(b => {
        const ready = b.skills.every(sid => stateOf(sid).mastery >= 80);
        const beaten = save.bossesBeaten.includes(b.id);
        const avg = Math.round(b.skills.reduce((a, sid) => a + stateOf(sid).mastery, 0) / b.skills.length);
        return (
          <div key={b.id} className="quest" style={{ borderColor: beaten ? 'var(--accent)' : ready ? 'var(--bad)' : undefined }}>
            <div className="q-icon">{beaten ? '👑' : b.icon}</div>
            <div style={{ flex: 1 }}>
              <b>{b.name}</b>
              <div className="dim small">
                {beaten
                  ? 'DEFEATED — topic crowned!'
                  : ready
                    ? `"${b.taunt}"`
                    : `stirs when ${b.skills.map(sid => registry.skill(sid)?.name ?? sid).join(' + ')} reach 80 (now ${avg})`}
              </div>
            </div>
            {ready && !beaten && (
              <button className="btn btn-small btn-primary" onClick={() => onStartBoss(b)}>
                FIGHT
              </button>
            )}
            {beaten && (
              <button className="btn btn-small btn-ghost" onClick={() => onStartBoss(b)} title="rematch for fun">
                rematch
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function realmTitle(realm: RealmId): string {
  return {
    math: '⚙️ Gearspring Mountains',
    science: '🔬 Fieldstation Isles',
    english: '📚 Storyspire',
    french: '🥐 Port Lumière',
    humanities: '🐫 The Caravan Route',
  }[realm];
}
