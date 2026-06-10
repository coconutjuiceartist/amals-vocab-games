/**
 * First-run flow: meet & name the mascot → pick avatar → "restore the map" framing.
 * She names the mascot — relatedness from minute one.
 */

import { useState } from 'react';
import { Mascot } from './Mascot';
import { loadFlavor } from '../engine/loadContent';
import { playFanfare, playTap } from '../engine/audio';

const AVATARS = [
  { id: 'wizard', emoji: '🧙‍♀️', name: 'Spellweaver' },
  { id: 'knitter', emoji: '🧶', name: 'Yarn Witch' },
  { id: 'baker', emoji: '🧁', name: 'Star Baker' },
  { id: 'catfriend', emoji: '🐱', name: 'Cat Whisperer' },
  { id: 'popstar', emoji: '🎤', name: 'Stage Light' },
  { id: 'explorer', emoji: '🗺️', name: 'Pathfinder' },
];

export function FirstRun({ onDone }: { onDone: (mascotName: string, avatarId: string) => void }) {
  const flavor = loadFlavor();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('wizard');

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', paddingTop: 30 }}>
      {step === 0 && (
        <div className="center pop-in">
          <Mascot pose="excited" size={170} />
          <h1>Realm Academy</h1>
          <div className="card" style={{ textAlign: 'left' }}>
            <p><b>Mrow!</b> You made it! I've been waiting <i>ages</i>. I'm the Keeper of this map — five realms of
            sixth-grade secrets, and every single one has gone dim.</p>
            <p>Math mountains, a science archipelago, a library city, a French harbor town, an ancient caravan
            route… all waiting for someone clever to light them back up.</p>
            <p>But first — a cat needs a name, and only YOU can give it.</p>
          </div>
          <button className="btn btn-primary btn-big" onClick={() => { setStep(1); playTap(); }}>
            Name the cat →
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="center pop-in">
          <Mascot pose="happy" size={130} />
          <h2>What's my name?</h2>
          <input
            className="type-input center"
            style={{ maxWidth: 320, textAlign: 'center', fontSize: '1.3rem' }}
            value={name}
            maxLength={16}
            placeholder="type a name…"
            onChange={e => setName(e.target.value)}
          />
          <div className="row" style={{ justifyContent: 'center', marginTop: 12 }}>
            {flavor.mascotSuggestions.map(s => (
              <button key={s} className="cat-chip" onClick={() => setName(s)}>{s}</button>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <button className="btn btn-primary btn-big" disabled={name.trim().length === 0}
              onClick={() => { setStep(2); playTap(); }}>
              That's the one! →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="center pop-in">
          <h2>And who are YOU, hero?</h2>
          <p className="dim">Pick your adventurer (change it anytime in the shop).</p>
          <div className="avatar-pick">
            {AVATARS.map(a => (
              <div key={a.id} className={`avatar-card ${avatar === a.id ? 'selected' : ''}`} onClick={() => { setAvatar(a.id); playTap(); }}>
                <div>{a.emoji}</div>
                <div className="nm">{a.name}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <button className="btn btn-primary btn-big" onClick={() => { setStep(3); playTap(); }}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="center pop-in">
          <Mascot pose="thinking" size={130} />
          <h2>One small problem…</h2>
          <div className="card" style={{ textAlign: 'left' }}>
            <p><b>{name.trim()}:</b> "The old map is faded — I can't tell which regions you've already conquered
            and which are new territory!"</p>
            <p>"Over your first two days, I'll slip a few <b>survey questions</b> into your quests. They're not
            graded — they just redraw the map. Anything you already own gets marked ✅ so I <i>never</i> waste
            your time teaching it."</p>
            <p>"Deal? Then let's light this place up."</p>
          </div>
          <button className="btn btn-good btn-big" onClick={() => { playFanfare(); onDone(name.trim(), avatar); }}>
            ⚔️ Begin the survey!
          </button>
        </div>
      )}
    </div>
  );
}
