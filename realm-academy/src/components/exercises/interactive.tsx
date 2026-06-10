/**
 * Interactive exercise types: matching pairs, tap-to-categorize, order sequence,
 * number-line / coordinate tap, diagram labeling, speed round.
 * All interactions are tap-first (tap to select, tap to place) — reliable on iPad.
 */

import { useMemo, useRef, useState } from 'react';
import type { ExProps } from './common';
import { useStableShuffle } from './common';
import { checkAnswer } from '../../engine/checker';
import { shuffled, seededRng, hashString } from '../../engine/rng';
import { playTap } from '../../engine/audio';

// ─────────────────────────── Matching pairs ───────────────────────────

export function MatchingPairs({ item, onResult, locked }: ExProps) {
  const pairs = item.data?.pairs ?? [];
  const lefts = useMemo(() => pairs.map(p => p[0]), [item.id]);
  const rights = useStableShuffle(item.id, pairs.map(p => p[1]));
  const [sel, setSel] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const mistakes = useRef(0);
  const done = useRef(false);

  const tryMatch = (right: string) => {
    if (!sel || locked || done.current) return;
    const pair = pairs.find(p => p[0] === sel);
    if (pair && pair[1] === right) {
      const next = new Set(matched);
      next.add(sel);
      next.add('R:' + right);
      setMatched(next);
      setSel(null);
      playTap();
      if (next.size === pairs.length * 2) {
        done.current = true;
        onResult(mistakes.current === 0, `${mistakes.current} mistakes`);
      }
    } else {
      mistakes.current += 1;
      setWrongFlash(right);
      setTimeout(() => setWrongFlash(null), 380);
      setSel(null);
    }
  };

  return (
    <div className="pairs-grid">
      <div className="pair-col">
        {lefts.map(l => (
          <button
            key={l}
            className={`option-btn pair-btn ${matched.has(l) ? 'matched' : ''} ${sel === l ? 'selected' : ''}`}
            disabled={locked || matched.has(l)}
            onClick={() => setSel(sel === l ? null : l)}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="pair-col">
        {rights.map(r => (
          <button
            key={r}
            className={`option-btn pair-btn ${matched.has('R:' + r) ? 'matched' : ''} ${wrongFlash === r ? 'wrong' : ''}`}
            disabled={locked || matched.has('R:' + r)}
            onClick={() => tryMatch(r)}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────── Tap to categorize ───────────────────────────

export function DragCategorize({ item, onResult, locked }: ExProps) {
  const categories = item.data?.categories ?? {};
  const catNames = Object.keys(categories);
  const allMembers = useStableShuffle(item.id, Object.values(categories).flat());
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const unplaced = allMembers.filter(m => !placed[m]);

  const place = (cat: string) => {
    if (!sel || locked) return;
    setPlaced({ ...placed, [sel]: cat });
    setSel(null);
    playTap();
  };

  const submit = () => {
    if (locked || submitted) return;
    setSubmitted(true);
    const allRight = allMembers.every(m => categories[placed[m]]?.includes(m));
    onResult(allRight, JSON.stringify(placed));
  };

  return (
    <div>
      {unplaced.length > 0 && (
        <div className="row" style={{ margin: '14px 0' }}>
          {unplaced.map(m => (
            <button
              key={m}
              className={`cat-chip ${sel === m ? 'selected' : ''}`}
              disabled={locked}
              onClick={() => setSel(sel === m ? null : m)}
            >
              {m}
            </button>
          ))}
        </div>
      )}
      {unplaced.length > 0 && <div className="dim small center">tap a chip, then tap its home ⤵</div>}
      <div className="row" style={{ alignItems: 'stretch', marginTop: 10 }}>
        {catNames.map(cat => (
          <div key={cat} style={{ flex: 1, minWidth: 140 }}>
            <div className="bucket-label">{cat}</div>
            <div className={`bucket ${sel ? 'active' : ''}`} onClick={() => place(cat)}>
              {allMembers
                .filter(m => placed[m] === cat)
                .map(m => (
                  <button
                    key={m}
                    className={`cat-chip ${submitted ? (categories[cat]?.includes(m) ? 'selected' : '') : ''}`}
                    style={submitted ? { borderColor: categories[cat]?.includes(m) ? 'var(--good)' : 'var(--bad)' } : {}}
                    disabled={locked}
                    onClick={e => {
                      e.stopPropagation();
                      if (submitted) return;
                      const rest = { ...placed };
                      delete rest[m];
                      setPlaced(rest);
                    }}
                  >
                    {m}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="row" style={{ marginTop: 12, justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={submit} disabled={locked || unplaced.length > 0 || submitted}>
          Check ✓
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────── Order the sequence ───────────────────────────

export function OrderSequence({ item, onResult, locked }: ExProps) {
  const correct = item.data?.sequence ?? [];
  const bank = useStableShuffle(item.id, correct);
  const [chosen, setChosen] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const remaining = bank.filter(s => !chosen.includes(s));

  const submit = () => {
    if (locked || submitted) return;
    setSubmitted(true);
    onResult(chosen.every((s, i) => s === correct[i]), chosen.join(' → '));
  };

  return (
    <div>
      <div style={{ marginTop: 12 }}>
        {chosen.map((s, i) => (
          <div key={s} className="seq-slot" style={submitted ? { borderColor: s === correct[i] ? 'var(--good)' : 'var(--bad)' } : {}}>
            <span className="n">{i + 1}</span>
            <span style={{ flex: 1 }}>{s}</span>
            {!submitted && (
              <button
                className="btn btn-small btn-ghost"
                disabled={locked}
                onClick={() => setChosen(chosen.filter(x => x !== s))}
              >
                ↩
              </button>
            )}
          </div>
        ))}
        {chosen.length < correct.length && <div className="seq-slot dim" style={{ borderStyle: 'dashed' }}>tap the next step ⤵</div>}
      </div>
      <div className="row" style={{ marginTop: 14 }}>
        {remaining.map(s => (
          <button key={s} className="cat-chip" disabled={locked} onClick={() => { setChosen([...chosen, s]); playTap(); }}>
            {s}
          </button>
        ))}
      </div>
      <div className="row" style={{ marginTop: 12, justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={submit} disabled={locked || chosen.length !== correct.length || submitted}>
          Check ✓
        </button>
      </div>
    </div>
  );
}

// ─────────────────── Number line / coordinate plane tap ───────────────────

export function NumberLineTap({ item, onResult, locked }: ExProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const nl = item.data?.numberLine;
  const cp = item.data?.coordinatePlane;

  if (cp) {
    const size = cp.size;
    const cell = 280 / (size * 2);
    const pad = 30;
    const toXY = (gx: number, gy: number) => ({ x: pad + (gx + size) * cell, y: pad + (size - gy) * cell });
    const pts: { gx: number; gy: number }[] = [];
    for (let gx = -size; gx <= size; gx++) for (let gy = -size; gy <= size; gy++) pts.push({ gx, gy });
    const ans = String(item.answer).split(',').map(n => parseInt(n.trim(), 10));

    return (
      <div className="coord-wrap">
        <svg viewBox={`0 0 ${pad * 2 + size * 2 * cell} ${pad * 2 + size * 2 * cell}`} style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto' }}>
          {Array.from({ length: size * 2 + 1 }, (_, i) => i - size).map(v => (
            <g key={v}>
              <line x1={toXY(v, -size).x} y1={toXY(v, -size).y} x2={toXY(v, size).x} y2={toXY(v, size).y} stroke="var(--line)" strokeWidth={v === 0 ? 2.5 : 0.7} />
              <line x1={toXY(-size, v).x} y1={toXY(-size, v).y} x2={toXY(size, v).x} y2={toXY(size, v).y} stroke="var(--line)" strokeWidth={v === 0 ? 2.5 : 0.7} />
              {v !== 0 && (
                <>
                  <text x={toXY(v, 0).x} y={toXY(v, 0).y + 16} fontSize="9" fill="var(--ink-dim)" textAnchor="middle">{v}</text>
                  <text x={toXY(0, v).x - 10} y={toXY(0, v).y + 3} fontSize="9" fill="var(--ink-dim)" textAnchor="middle">{v}</text>
                </>
              )}
            </g>
          ))}
          {pts.map(({ gx, gy }) => {
            const { x, y } = toXY(gx, gy);
            const key = `${gx},${gy}`;
            const isPicked = picked === key;
            const isAns = picked !== null && gx === ans[0] && gy === ans[1];
            return (
              <g key={key} className="tick-btn" onClick={() => {
                if (locked || picked !== null) return;
                setPicked(key);
                onResult(gx === ans[0] && gy === ans[1], key);
              }}>
                <circle cx={x} cy={y} r={isPicked || isAns ? 8 : 5} fill={isAns ? 'var(--good)' : isPicked ? 'var(--bad)' : 'rgba(125,211,252,0.18)'} stroke={isPicked || isAns ? 'white' : 'transparent'} strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  if (!nl) return null;
  const { min, max, step } = nl;
  const ticks: number[] = [];
  for (let v = min; v <= max + 1e-9; v += step) ticks.push(Math.round(v * 1000) / 1000);
  const W = 640;
  const px = (v: number) => 30 + ((v - min) / (max - min)) * (W - 60);
  const ansN = parseFloat(String(item.answer));

  return (
    <div className="numline-wrap">
      <svg viewBox={`0 0 ${W} 90`} style={{ width: '100%' }}>
        <line x1={20} y1={45} x2={W - 20} y2={45} stroke="var(--ink-dim)" strokeWidth="3" strokeLinecap="round" />
        {ticks.map(v => {
          const isPicked = picked === String(v);
          const isAns = picked !== null && Math.abs(v - ansN) < 1e-9;
          const showLabel = ticks.length <= 16 || Math.round((v - min) / step) % 2 === 0;
          return (
            <g key={v} className="tick-btn" onClick={() => {
              if (locked || picked !== null) return;
              setPicked(String(v));
              onResult(Math.abs(v - ansN) < 1e-9, String(v));
            }}>
              <line x1={px(v)} y1={36} x2={px(v)} y2={54} stroke="var(--ink-dim)" strokeWidth="2" />
              <circle cx={px(v)} cy={45} r={isPicked || isAns ? 11 : 8} fill={isAns ? 'var(--good)' : isPicked ? 'var(--bad)' : 'rgba(125,211,252,0.25)'} />
              {showLabel && (
                <text x={px(v)} y={75} fontSize="12" fill="var(--ink-dim)" textAnchor="middle" fontWeight="700">
                  {v}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="dim small center">tap the right spot on the line</div>
    </div>
  );
}

// ─────────────────────────── Diagram labeling ───────────────────────────

interface SlotPos {
  id: string;
  x: number;
  y: number;
}

const DIAGRAMS: Record<string, { art: JSX.Element; slots: SlotPos[] }> = {
  food_web: {
    art: (
      <g fontSize="26">
        <text x={160} y={36}>☀️</text>
        <text x={50} y={150}>🌾</text>
        <text x={140} y={150}>🐇</text>
        <text x={240} y={150}>🦊</text>
        <text x={150} y={205}>🍄</text>
        <path d="M168 45 Q 90 80 62 120" stroke="var(--ink-dim)" fill="none" strokeWidth="2" markerEnd="url(#arr)" />
        <path d="M75 140 H 128" stroke="var(--ink-dim)" fill="none" strokeWidth="2" markerEnd="url(#arr)" />
        <path d="M165 140 H 228" stroke="var(--ink-dim)" fill="none" strokeWidth="2" markerEnd="url(#arr)" />
        <path d="M250 160 Q 215 195 175 198" stroke="var(--ink-dim)" fill="none" strokeWidth="2" markerEnd="url(#arr)" />
      </g>
    ),
    slots: [
      { id: 'sun', x: 215, y: 28 },
      { id: 'producer', x: 55, y: 175 },
      { id: 'herbivore', x: 145, y: 118 },
      { id: 'carnivore', x: 250, y: 118 },
      { id: 'decomposer', x: 225, y: 215 },
    ],
  },
  wave: {
    art: (
      <g>
        <path d="M 20 110 Q 55 30 90 110 T 160 110 T 230 110 T 300 110" stroke="var(--gem)" fill="none" strokeWidth="3.5" />
        <line x1={20} y1={110} x2={300} y2={110} stroke="var(--ink-dim)" strokeWidth="1" strokeDasharray="5 5" />
        <line x1={55} y1={70} x2={55} y2={110} stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M 90 140 H 160" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arr)" markerStart="url(#arr)" />
      </g>
    ),
    slots: [
      { id: 'crest', x: 55, y: 30 },
      { id: 'trough', x: 125, y: 165 },
      { id: 'amplitude', x: 110, y: 78 },
      { id: 'wavelength', x: 230, y: 150 },
    ],
  },
  water_cycle: {
    art: (
      <g fontSize="26">
        <text x={30} y={195}>🌊</text>
        <text x={45} y={60}>☁️</text>
        <text x={210} y={50}>☁️</text>
        <text x={235} y={120}>🌧️</text>
        <text x={250} y={195}>🏞️</text>
        <text x={140} y={40}>☀️</text>
        <path d="M55 175 Q 50 120 55 75" stroke="var(--ink-dim)" fill="none" strokeWidth="2" markerEnd="url(#arr)" />
        <path d="M85 50 Q 150 28 205 42" stroke="var(--ink-dim)" fill="none" strokeWidth="2" markerEnd="url(#arr)" />
        <path d="M240 62 L 248 100" stroke="var(--ink-dim)" fill="none" strokeWidth="2" markerEnd="url(#arr)" />
        <path d="M255 135 L 262 175" stroke="var(--ink-dim)" fill="none" strokeWidth="2" markerEnd="url(#arr)" />
      </g>
    ),
    slots: [
      { id: 'evaporation', x: 95, y: 130 },
      { id: 'condensation', x: 140, y: 75 },
      { id: 'precipitation', x: 195, y: 95 },
      { id: 'collection', x: 175, y: 195 },
    ],
  },
  energy_pyramid: {
    art: (
      <g>
        <polygon points="160,20 200,70 120,70" fill="rgba(251,113,133,0.45)" stroke="var(--line)" />
        <polygon points="112,78 208,78 232,128 88,128" fill="rgba(252,211,77,0.45)" stroke="var(--line)" />
        <polygon points="80,136 240,136 264,186 56,186" fill="rgba(134,239,172,0.45)" stroke="var(--line)" />
        <polygon points="48,194 272,194 290,218 30,218" fill="rgba(45,212,191,0.45)" stroke="var(--line)" />
      </g>
    ),
    slots: [
      { id: 'tertiary', x: 160, y: 50 },
      { id: 'secondary', x: 160, y: 105 },
      { id: 'primary', x: 160, y: 163 },
      { id: 'producers', x: 160, y: 208 },
    ],
  },
  circle_parts: {
    art: (
      <g>
        <circle cx={160} cy={115} r={80} fill="none" stroke="var(--gem)" strokeWidth="3.5" />
        <circle cx={160} cy={115} r={4} fill="var(--accent)" />
        <line x1={160} y1={115} x2={228} y2={73} stroke="var(--accent)" strokeWidth="2.5" />
        <line x1={80} y1={115} x2={240} y2={115} stroke="var(--good)" strokeWidth="2.5" strokeDasharray="6 4" />
        <path d="M 100 178 Q 160 215 220 178" stroke="var(--bad)" fill="none" strokeWidth="2.5" markerEnd="url(#arr)" />
      </g>
    ),
    slots: [
      { id: 'center', x: 137, y: 138 },
      { id: 'radius', x: 218, y: 50 },
      { id: 'diameter', x: 113, y: 100 },
      { id: 'circumference', x: 160, y: 213 },
    ],
  },
  plant_cell: {
    art: (
      <g>
        <rect x={45} y={30} width={230} height={180} rx={26} fill="rgba(134,239,172,0.12)" stroke="var(--good)" strokeWidth="5" />
        <rect x={56} y={41} width={208} height={158} rx={20} fill="none" stroke="var(--ink-dim)" strokeWidth="1.5" />
        <ellipse cx={150} cy={125} rx={62} ry={44} fill="rgba(125,211,252,0.18)" stroke="var(--gem)" strokeWidth="2" />
        <circle cx={228} cy={80} r={24} fill="rgba(196,181,253,0.35)" stroke="#c4b5fd" strokeWidth="2" />
        <circle cx={228} cy={80} r={8} fill="#c4b5fd" />
        <ellipse cx={92} cy={70} rx={17} ry={10} fill="rgba(74,222,128,0.6)" />
        <ellipse cx={120} cy={185} rx={17} ry={10} fill="rgba(74,222,128,0.6)" />
      </g>
    ),
    slots: [
      { id: 'cell_wall', x: 60, y: 222 },
      { id: 'vacuole', x: 150, y: 125 },
      { id: 'nucleus', x: 230, y: 45 },
      { id: 'chloroplast', x: 92, y: 95 },
    ],
  },
};

export function DiagramLabel({ item, onResult, locked }: ExProps) {
  const diagram = DIAGRAMS[item.data?.diagram ?? ''];
  const slots = item.data?.slots ?? {};
  const labels = useStableShuffle(item.id, item.data?.labels ?? []);
  const slotIds = Object.keys(slots);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!diagram) return <div className="dim">Diagram unavailable.</div>;

  const usedLabels = new Set(Object.values(placed));
  const submit = () => {
    if (locked || submitted) return;
    setSubmitted(true);
    onResult(slotIds.every(s => placed[s] === slots[s]), JSON.stringify(placed));
  };

  return (
    <div>
      <div className="numline-wrap">
        <svg viewBox="0 0 320 235" style={{ width: '100%', maxWidth: 460, display: 'block', margin: '0 auto' }}>
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-dim)" />
            </marker>
          </defs>
          {diagram.art}
          {diagram.slots
            .filter(s => slotIds.includes(s.id))
            .map(s => {
              const val = placed[s.id];
              const good = submitted ? slots[s.id] === val : null;
              return (
                <g key={s.id} className="tick-btn" onClick={() => !locked && !submitted && setActiveSlot(s.id)}>
                  <rect
                    x={s.x - 44} y={s.y - 13} width={88} height={24} rx={8}
                    fill={activeSlot === s.id ? 'rgba(125,211,252,0.3)' : 'var(--card-2)'}
                    stroke={good === true ? 'var(--good)' : good === false ? 'var(--bad)' : activeSlot === s.id ? 'var(--gem)' : 'var(--line)'}
                    strokeWidth="2" strokeDasharray={val ? '0' : '5 3'}
                  />
                  <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="var(--ink)">
                    {val ?? '?'}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>
      <div className="dim small center" style={{ margin: '6px 0' }}>
        {activeSlot ? 'now tap the label for that box' : 'tap a dashed box first'}
      </div>
      <div className="row" style={{ justifyContent: 'center' }}>
        {labels.map(l => (
          <button
            key={l}
            className="cat-chip"
            style={usedLabels.has(l) ? { opacity: 0.4 } : {}}
            disabled={locked || submitted}
            onClick={() => {
              if (!activeSlot) return;
              const next = { ...placed };
              for (const k of Object.keys(next)) if (next[k] === l) delete next[k];
              next[activeSlot] = l;
              setPlaced(next);
              setActiveSlot(null);
              playTap();
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="row" style={{ marginTop: 12, justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={submit} disabled={locked || submitted || slotIds.some(s => !placed[s])}>
          Check ✓
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────── Speed round (opt-in) ───────────────────────────

export function SpeedRound({ item, onResult, locked }: ExProps & { theme?: { name: string; icon: string } }) {
  const cards = useMemo(
    () => shuffled(item.data?.cards ?? [], seededRng(hashString(item.id + Date.now()))),
    [item.id],
  );
  const [phase, setPhase] = useState<'intro' | 'play' | 'done'>('intro');
  const [idx, setIdx] = useState(0);
  const [right, setRight] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [text, setText] = useState('');
  const [flash, setFlash] = useState<'good' | 'bad' | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endedRef = useRef(false);

  const finish = (r: number, a: number) => {
    if (endedRef.current) return;
    endedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('done');
    onResult(a >= 5 && r / Math.max(a, 1) >= 0.6, `${r}/${a}`);
  };

  const start = () => {
    setPhase('play');
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setRight(r => {
            setAttempted(a => {
              finish(r, a);
              return a;
            });
            return r;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const submitCard = () => {
    if (text.trim() === '') return;
    const card = cards[idx % cards.length];
    const ok = checkAnswer(text, card[1]).correct;
    const newRight = right + (ok ? 1 : 0);
    const newAtt = attempted + 1;
    setRight(newRight);
    setAttempted(newAtt);
    setFlash(ok ? 'good' : 'bad');
    setTimeout(() => setFlash(null), 250);
    setText('');
    if (newAtt >= cards.length) {
      finish(newRight, newAtt);
    } else {
      setIdx(idx + 1);
    }
  };

  if (phase === 'intro') {
    return (
      <div className="center" style={{ padding: '18px 0' }}>
        <div style={{ fontSize: '3rem' }}>⚡</div>
        <h3>Lightning Round — totally optional!</h3>
        <p className="dim">60 seconds, quick-fire facts. No pressure — skipping costs nothing.</p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <button className="btn btn-ghost" onClick={() => onResult(true, 'skipped')} disabled={locked}>
            Skip today
          </button>
          <button className="btn btn-primary btn-big" onClick={start} disabled={locked}>
            Let's GO ⚡
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="center" style={{ padding: '18px 0' }}>
        <div style={{ fontSize: '2.6rem' }}>🏁</div>
        <h3>
          {right} / {attempted} in {60 - timeLeft}s
        </h3>
      </div>
    );
  }

  const card = cards[idx % cards.length];
  return (
    <div>
      <div className="spread">
        <span className="chip">⚡ {right} right</span>
        <span className="chip">⏱ {timeLeft}s</span>
      </div>
      <div className="speed-timer" style={{ margin: '10px 0' }}>
        <div style={{ width: `${(timeLeft / 60) * 100}%` }} />
      </div>
      <div className="speed-card" style={{ color: flash === 'good' ? 'var(--good)' : flash === 'bad' ? 'var(--bad)' : undefined }}>
        {card[0]}
      </div>
      <input
        className="type-input"
        value={text}
        autoFocus
        autoCapitalize="off"
        autoCorrect="off"
        placeholder="answer fast!"
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submitCard()}
      />
      <div className="row" style={{ marginTop: 10, justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={submitCard}>
          ⚡
        </button>
      </div>
    </div>
  );
}
