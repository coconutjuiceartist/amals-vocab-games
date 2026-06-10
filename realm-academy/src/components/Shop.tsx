/**
 * Gem shop: mascot hats + app themes. Cosmetic only, no real money,
 * rewards stay informational.
 */

import { useStore } from '../engine/store';
import { Mascot } from './Mascot';
import { playCorrect, playTap } from '../engine/audio';

const HATS = [
  { id: 'none', name: 'Just the scarf', cost: 0, emoji: '🧣' },
  { id: 'wizard', name: 'Wizard Hat', cost: 40, emoji: '🪄' },
  { id: 'beret', name: 'Le Béret', cost: 30, emoji: '🥐' },
  { id: 'crown', name: 'Tiny Crown', cost: 80, emoji: '👑' },
  { id: 'headphones', name: 'K-pop Headphones', cost: 50, emoji: '🎧' },
  { id: 'flowercrown', name: 'Flower Crown', cost: 35, emoji: '🌸' },
];

const THEMES = [
  { id: 'classic', name: 'Midnight Atlas', cost: 0, swatch: '#241a42' },
  { id: 'aurora', name: 'Aurora Tide', cost: 45, swatch: '#143350' },
  { id: 'bakery', name: 'Warm Bakery', cost: 45, swatch: '#4a2e23' },
  { id: 'yarn', name: 'Yarn Twilight', cost: 45, swatch: '#3d2455' },
];

export function Shop({ onBack }: { onBack: () => void }) {
  const { save, dispatch } = useStore();

  const buyOrEquip = (kind: 'mascotHat' | 'theme', id: string, cost: number) => {
    const owned = cost === 0 || save.ownedShopItems.includes(kind + ':' + id);
    if (owned) {
      dispatch({ type: 'EQUIP', slot: kind, value: id });
      playTap();
    } else if (save.gems >= cost) {
      dispatch({ type: 'BUY', itemId: kind + ':' + id, cost });
      dispatch({ type: 'EQUIP', slot: kind, value: id });
      playCorrect(2);
    }
  };

  return (
    <div>
      <div className="row" style={{ marginTop: 8 }}>
        <button className="btn btn-small btn-ghost" onClick={onBack}>← map</button>
        <h2 style={{ margin: 0 }}>🛍️ The Gem Bazaar</h2>
        <span className="chip">💎 {save.gems}</span>
      </div>

      <div className="center">
        <Mascot pose="proud" size={120} hat={save.equipped.mascotHat} />
        <div className="dim small">your Keeper, modeling the latest fashion</div>
      </div>

      <h3>🎩 Hats for the Keeper</h3>
      <div className="collect-grid">
        {HATS.map(h => {
          const owned = h.cost === 0 || save.ownedShopItems.includes('mascotHat:' + h.id);
          const equipped = save.equipped.mascotHat === h.id;
          const affordable = save.gems >= h.cost;
          return (
            <div key={h.id} className="collect-card" style={equipped ? { borderColor: 'var(--accent)' } : {}}>
              <div className="e">{h.emoji}</div>
              <div className="small"><b>{h.name}</b></div>
              <button
                className={`btn btn-small ${owned ? 'btn-ghost' : 'btn-primary'}`}
                style={{ marginTop: 6 }}
                disabled={!owned && !affordable}
                onClick={() => buyOrEquip('mascotHat', h.id, h.cost)}
              >
                {equipped ? 'wearing ✓' : owned ? 'wear' : `💎 ${h.cost}`}
              </button>
            </div>
          );
        })}
      </div>

      <h3 style={{ marginTop: 20 }}>🎨 Map Themes</h3>
      <div className="collect-grid">
        {THEMES.map(t => {
          const owned = t.cost === 0 || save.ownedShopItems.includes('theme:' + t.id);
          const equipped = save.equipped.theme === t.id;
          const affordable = save.gems >= t.cost;
          return (
            <div key={t.id} className="collect-card" style={equipped ? { borderColor: 'var(--accent)' } : {}}>
              <div className="e"><span style={{ display: 'inline-block', width: 38, height: 38, borderRadius: 10, background: t.swatch, border: '2px solid var(--line)' }} /></div>
              <div className="small"><b>{t.name}</b></div>
              <button
                className={`btn btn-small ${owned ? 'btn-ghost' : 'btn-primary'}`}
                style={{ marginTop: 6 }}
                disabled={!owned && !affordable}
                onClick={() => buyOrEquip('theme', t.id, t.cost)}
              >
                {equipped ? 'active ✓' : owned ? 'use' : `💎 ${t.cost}`}
              </button>
            </div>
          );
        })}
      </div>
      <p className="dim small center">Gems come from lessons, quests, and chests. Everything here is cosmetic — your brain is the real inventory.</p>
    </div>
  );
}
