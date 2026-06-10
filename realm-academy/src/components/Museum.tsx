/**
 * The Museum: crowns, chest rares, and weird-fact cards — collection as
 * informational reward (it celebrates what she knows).
 */

import { useState } from 'react';
import { useStore } from '../engine/store';
import { loadRegistry, loadFlavor } from '../engine/loadContent';

const RARES = [
  { id: 'rare.yarnball', name: 'Golden Yarn Ball', icon: '🧶' },
  { id: 'rare.crookshanks', name: 'Half-Kneazle Whisker', icon: '🐈' },
  { id: 'rare.croissant', name: 'Croissant of Destiny', icon: '🥐' },
  { id: 'rare.lightstick', name: 'Photon Light Stick', icon: '💡' },
  { id: 'rare.timeturner', name: 'Tiny Time-Turner', icon: '⏳' },
  { id: 'rare.whisk', name: 'Whisk of Whimsy', icon: '🥄' },
  { id: 'rare.geode', name: 'Realm Geode', icon: '💎' },
  { id: 'rare.quill', name: 'Self-Inking Quill', icon: '🪶' },
];

export function Museum({ onBack }: { onBack: () => void }) {
  const { save } = useStore();
  const registry = loadRegistry();
  const flavor = loadFlavor();
  const [openFact, setOpenFact] = useState<string | null>(null);

  const crowns = registry.bosses.map(b => ({
    id: 'crown.' + b.id,
    name: b.name,
    icon: '👑',
    owned: save.bossesBeaten.includes(b.id),
    sub: b.icon,
  }));

  const factCards = flavor.facts.map(f => {
    const st = save.skills[f.skill];
    const owned = st?.phase === 'MASTERED' || st?.phase === 'CROWNED';
    return { ...f, owned };
  });

  const fact = flavor.facts.find(f => f.skill === openFact);
  const ownedCount =
    crowns.filter(c => c.owned).length +
    factCards.filter(f => f.owned).length +
    RARES.filter(r => save.collectibles.includes(r.id)).length;

  return (
    <div>
      <div className="row" style={{ marginTop: 8 }}>
        <button className="btn btn-small btn-ghost" onClick={onBack}>← map</button>
        <h2 style={{ margin: 0 }}>🏛️ The Museum</h2>
        <span className="chip">{ownedCount} treasures</span>
      </div>

      <h3>👑 Boss Crowns</h3>
      <div className="collect-grid">
        {crowns.map(c => (
          <div key={c.id} className={`collect-card ${c.owned ? '' : 'locked'}`}>
            <div className="e">{c.owned ? '👑' : '❓'}</div>
            <div className="small"><b>{c.sub} {c.name}</b></div>
            <div className="dim small">{c.owned ? 'crowned!' : 'defeat to claim'}</div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 20 }}>🃏 Weird-Fact Cards <span className="dim small">· master a topic to flip its card</span></h3>
      <div className="collect-grid">
        {factCards.map(f => (
          <div
            key={f.skill}
            className={`collect-card ${f.owned ? 'fact-card' : 'locked'}`}
            onClick={() => f.owned && setOpenFact(f.skill)}
          >
            <div className="e">{f.owned ? f.emoji : '🂠'}</div>
            <div className="small"><b>{f.owned ? f.title : '???'}</b></div>
            <div className="dim small">{registry.skill(f.skill)?.name ?? f.skill}</div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 20 }}>✨ Chest Rares</h3>
      <div className="collect-grid">
        {RARES.map(r => {
          const owned = save.collectibles.includes(r.id);
          return (
            <div key={r.id} className={`collect-card ${owned ? '' : 'locked'}`}>
              <div className="e">{owned ? r.icon : '❓'}</div>
              <div className="small"><b>{owned ? r.name : '???'}</b></div>
              <div className="dim small">{owned ? 'found in a chest' : 'hides in chests…'}</div>
            </div>
          );
        })}
      </div>

      {fact && (
        <div className="modal-veil" onClick={() => setOpenFact(null)}>
          <div className="modal-box center pop-in" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '3rem' }}>{fact.emoji}</div>
            <h2>{fact.title}</h2>
            <p style={{ fontSize: '1.05rem' }}>{fact.text}</p>
            <button className="btn btn-primary" onClick={() => setOpenFact(null)}>Filed away 🧠</button>
          </div>
        </div>
      )}
    </div>
  );
}
