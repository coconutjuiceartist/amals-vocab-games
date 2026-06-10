/**
 * Visual math models (one family, several modes) + the worked-example player.
 * Concrete → representational → abstract: the model is the thinking tool,
 * the typed answer is the check.
 */

import { useMemo, useState } from 'react';
import type { ExProps } from './common';
import { TypeBox, useStableShuffle } from './common';
import { checkAnswer } from '../../engine/checker';
import { playTap } from '../../engine/audio';

const PART_COLORS = ['#2dd4bf', '#f9a8d4', '#fcd34d', '#c4b5fd'];

// ─────────────────────────── Tape diagram ───────────────────────────

function TapeDiagram({ item, onResult, locked }: ExProps) {
  const m = (item.data?.model ?? {}) as {
    parts?: string[];
    counts?: number[];
    total?: number;
    unitHint?: boolean;
    ask?: string;
  };
  const parts = m.parts ?? [];
  const counts = m.counts ?? [];
  const totalBoxes = counts.reduce((a, b) => a + b, 0);
  const [revealed, setRevealed] = useState(false);
  const unit = m.total !== undefined ? m.total / totalBoxes : null;

  return (
    <div>
      <div className="numline-wrap">
        {parts.map((part, pi) => (
          <div key={part} style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '10px 0' }}>
            <div style={{ width: 86, fontWeight: 800, fontSize: '0.9rem', textAlign: 'right' }}>{part}</div>
            <div style={{ display: 'flex', gap: 4, flex: 1 }}>
              {Array.from({ length: counts[pi] ?? 0 }).map((_, bi) => (
                <div
                  key={bi}
                  onClick={() => {
                    if (m.unitHint && !locked) {
                      setRevealed(true);
                      playTap();
                    }
                  }}
                  style={{
                    flex: 1, height: 44, borderRadius: 8, cursor: m.unitHint ? 'pointer' : 'default',
                    background: PART_COLORS[pi % PART_COLORS.length] + '33',
                    border: `2.5px solid ${PART_COLORS[pi % PART_COLORS.length]}`,
                    display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: '0.95rem',
                  }}
                >
                  {revealed && unit !== null ? unit : '?'}
                </div>
              ))}
            </div>
          </div>
        ))}
        {m.total !== undefined && (
          <div className="center dim small">
            all boxes together = <b>{m.total}</b>
            {m.unitHint && !revealed && <span> · tap a box to peek at its value</span>}
          </div>
        )}
      </div>
      {m.ask && <div style={{ fontWeight: 800, margin: '10px 2px' }}>{m.ask}</div>}
      <TypeBox locked={locked} inputMode="decimal" onSubmit={t => onResult(checkAnswer(t, item.answer).correct, t)} />
    </div>
  );
}

// ─────────────────────────── Double number line ───────────────────────────

function DoubleNumberLine({ item, onResult, locked }: ExProps) {
  const m = (item.data?.model ?? {}) as {
    topLabel?: string; bottomLabel?: string;
    topMax?: number; bottomMax?: number;
    knownTop?: number; knownBottom?: number; askBottom?: number;
  };
  const W = 640;
  const bottomMax = m.bottomMax ?? 100;
  const topMax = m.topMax ?? 100;
  const px = (v: number, max: number) => 50 + (v / max) * (W - 90);
  const [slider, setSlider] = useState(m.knownBottom ?? 0);
  const rate = (m.knownTop ?? 1) / (m.knownBottom ?? 1);
  const snapped = Math.round(slider);

  return (
    <div>
      <div className="numline-wrap">
        <svg viewBox={`0 0 ${W} 150`} style={{ width: '100%' }}>
          {/* top line */}
          <line x1={40} y1={40} x2={W - 30} y2={40} stroke="var(--gem)" strokeWidth="3" strokeLinecap="round" />
          <text x={8} y={44} fontSize="13" fontWeight="800" fill="var(--gem)">{m.topLabel}</text>
          {/* bottom line */}
          <line x1={40} y1={105} x2={W - 30} y2={105} stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <text x={8} y={109} fontSize="13" fontWeight="800" fill="var(--accent)">{m.bottomLabel}</text>
          {/* zero */}
          <text x={px(0, bottomMax)} y={130} fontSize="12" fill="var(--ink-dim)" textAnchor="middle">0</text>
          <line x1={px(0, bottomMax)} y1={32} x2={px(0, bottomMax)} y2={113} stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* known anchor */}
          <g>
            <line x1={px(m.knownBottom ?? 0, bottomMax)} y1={32} x2={px(m.knownBottom ?? 0, bottomMax)} y2={113} stroke="var(--good)" strokeWidth="2" strokeDasharray="5 4" />
            <circle cx={px(m.knownTop ?? 0, topMax) * 0 + px(m.knownBottom ?? 0, bottomMax)} cy={40} r={7} fill="var(--gem)" />
            <circle cx={px(m.knownBottom ?? 0, bottomMax)} cy={105} r={7} fill="var(--accent)" />
            <text x={px(m.knownBottom ?? 0, bottomMax)} y={24} fontSize="13" fontWeight="900" fill="var(--gem)" textAnchor="middle">{m.knownTop}</text>
            <text x={px(m.knownBottom ?? 0, bottomMax)} y={130} fontSize="13" fontWeight="900" fill="var(--accent)" textAnchor="middle">{m.knownBottom}</text>
          </g>
          {/* ask marker */}
          <g>
            <line x1={px(m.askBottom ?? 0, bottomMax)} y1={32} x2={px(m.askBottom ?? 0, bottomMax)} y2={113} stroke="var(--bad)" strokeWidth="2" strokeDasharray="5 4" />
            <text x={px(m.askBottom ?? 0, bottomMax)} y={24} fontSize="15" fontWeight="900" fill="var(--bad)" textAnchor="middle">?</text>
            <text x={px(m.askBottom ?? 0, bottomMax)} y={130} fontSize="13" fontWeight="900" fill="var(--accent)" textAnchor="middle">{m.askBottom}</text>
          </g>
          {/* explorer marker */}
          <g>
            <circle cx={px(snapped, bottomMax)} cy={105} r={9} fill="none" stroke="var(--ink)" strokeWidth="2" />
            <circle cx={px(snapped, bottomMax)} cy={40} r={9} fill="none" stroke="var(--ink)" strokeWidth="2" />
            <text x={px(snapped, bottomMax)} y={74} fontSize="11" fontWeight="800" fill="var(--ink-dim)" textAnchor="middle">
              {snapped % (m.knownBottom ?? 1) === 0 ? `${rate * snapped}` : '·'}
            </text>
          </g>
        </svg>
        <input
          type="range" min={0} max={bottomMax} step={1} value={slider} disabled={locked}
          onChange={e => setSlider(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)' }}
        />
        <div className="dim small center">slide the rings — they only whisper values at multiples of {m.knownBottom}</div>
      </div>
      <div style={{ fontWeight: 800, margin: '10px 2px' }}>
        So: {m.askBottom} {m.bottomLabel} ⇒ how many {m.topLabel}?
      </div>
      <TypeBox locked={locked} inputMode="decimal" onSubmit={t => onResult(checkAnswer(t, item.answer).correct, t)} />
    </div>
  );
}

// ─────────────────────────── Ratio table ───────────────────────────

function RatioTable({ item, onResult, locked }: ExProps) {
  const m = (item.data?.model ?? {}) as { headers?: string[]; rows?: (number | null)[][]; blanksAnswers?: string[][] };
  const rows = m.rows ?? [];
  const blanks: { r: number; c: number }[] = [];
  rows.forEach((row, r) => row.forEach((cell, c) => cell === null && blanks.push({ r, c })));
  const [values, setValues] = useState<string[]>(() => Array(blanks.length).fill(''));
  const [marks, setMarks] = useState<(boolean | null)[]>(() => Array(blanks.length).fill(null));

  const submit = () => {
    const answers = m.blanksAnswers ?? [];
    const newMarks = values.map((v, i) => checkAnswer(v, answers[i] ?? []).correct);
    setMarks(newMarks);
    onResult(newMarks.every(Boolean), values.join(','));
  };

  return (
    <div>
      <div className="numline-wrap" style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'separate', borderSpacing: 6, margin: '0 auto' }}>
          <thead>
            <tr>
              {(m.headers ?? []).map(h => (
                <th key={h} style={{ padding: '8px 16px', background: 'var(--card-2)', borderRadius: 10, fontSize: '0.95rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => {
                  const bIdx = blanks.findIndex(b => b.r === r && b.c === c);
                  return (
                    <td key={c} style={{ textAlign: 'center' }}>
                      {cell !== null ? (
                        <div style={{ padding: '10px 16px', background: 'var(--bg-soft)', borderRadius: 10, fontWeight: 900, fontSize: '1.1rem' }}>{cell}</div>
                      ) : (
                        <input
                          className={`blank-input ${marks[bIdx] === true ? 'ok' : marks[bIdx] === false ? 'no' : ''}`}
                          style={{ width: 84 }}
                          value={values[bIdx]}
                          disabled={locked}
                          inputMode="decimal"
                          onChange={e => {
                            const v = [...values];
                            v[bIdx] = e.target.value;
                            setValues(v);
                          }}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row" style={{ marginTop: 12, justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" disabled={locked || values.some(v => v.trim() === '')} onClick={submit}>
          Check ✓
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────── Percent bar ───────────────────────────

function PercentBar({ item, onResult, locked }: ExProps) {
  const m = (item.data?.model ?? {}) as { total?: number; percent?: number; ask?: 'part' | 'percent' | 'whole' };
  const [shaded, setShaded] = useState(0);
  const segs = 10;

  return (
    <div>
      <div className="numline-wrap">
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: segs }).map((_, i) => (
            <div
              key={i}
              onClick={() => !locked && setShaded(i + 1 === shaded ? 0 : i + 1)}
              style={{
                flex: 1, height: 52, borderRadius: 8, cursor: 'pointer',
                background: i < shaded ? 'linear-gradient(180deg, var(--accent), #f0b93e)' : 'var(--bg-soft)',
                border: '2.5px solid var(--line)', transition: 'background 0.15s ease',
              }}
            />
          ))}
        </div>
        <div className="spread" style={{ marginTop: 8 }}>
          <span className="dim small">0%</span>
          <span className="chip">{shaded * 10}% shaded {m.ask !== 'whole' && m.total !== undefined ? `of ${m.total}` : ''}</span>
          <span className="dim small">100%</span>
        </div>
        <div className="dim small center" style={{ marginTop: 6 }}>shade the bar to think it through — each block is 10%</div>
      </div>
      <TypeBox locked={locked} inputMode="decimal" onSubmit={t => onResult(checkAnswer(t, item.answer).correct, t)} />
    </div>
  );
}

// ─────────────────────────── Area decomposer ───────────────────────────

function AreaDecomposer({ item, onResult, locked }: ExProps) {
  const m = (item.data?.model ?? {}) as { cells?: number[][]; unit?: string; grid?: number[] };
  const cells = m.cells ?? [];
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const maxX = Math.max(...cells.map(c => c[0] + c[2]), 1);
  const maxY = Math.max(...cells.map(c => c[1] + c[3]), 1);
  const scale = 280 / Math.max(maxX, maxY);

  return (
    <div>
      <div className="numline-wrap">
        <svg viewBox={`-10 -10 ${maxX * scale + 20} ${maxY * scale + 20}`} style={{ width: '100%', maxWidth: 380, display: 'block', margin: '0 auto' }}>
          {cells.map((c, i) => {
            const on = tapped.has(i);
            return (
              <g key={i} className="tick-btn" onClick={() => {
                if (locked) return;
                const next = new Set(tapped);
                next.add(i);
                setTapped(next);
                playTap();
              }}>
                <rect
                  x={c[0] * scale} y={c[1] * scale} width={c[2] * scale} height={c[3] * scale}
                  fill={on ? PART_COLORS[i % PART_COLORS.length] + '44' : 'var(--bg-soft)'}
                  stroke={on ? PART_COLORS[i % PART_COLORS.length] : 'var(--line)'} strokeWidth="2.5" rx="4"
                />
                <text x={(c[0] + c[2] / 2) * scale} y={(c[1] + c[3] / 2) * scale + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill="var(--ink)">
                  {on ? `${c[2]}×${c[3]}` : '?'}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="dim small center">tap each piece to measure it, then add the areas</div>
        {tapped.size > 0 && (
          <div className="center chip" style={{ marginTop: 8 }}>
            {[...tapped].map(i => `${cells[i][2]}×${cells[i][3]}`).join('  +  ')}
            {tapped.size === cells.length ? '  =  ?' : '  + …'}
          </div>
        )}
      </div>
      <TypeBox locked={locked} inputMode="decimal" onSubmit={t => onResult(checkAnswer(t, item.answer).correct, t)} />
    </div>
  );
}

// ─────────────────────────── Balance scale ───────────────────────────

function BalanceScale({ item, onResult, locked }: ExProps) {
  const m = (item.data?.model ?? {}) as { left?: string; right?: string; steps?: string[] };
  const steps = m.steps ?? [];
  const [stepIdx, setStepIdx] = useState(0);
  const [wrongPick, setWrongPick] = useState<string | null>(null);
  const solvingDone = stepIdx >= steps.length;

  const distractors = [
    'add a number to one side only',
    'multiply both sides by 0',
    'swap the two sides and flip the sign',
    'remove the x and hope',
  ];
  const options = useMemo(() => {
    if (solvingDone) return [];
    const correct = steps[stepIdx];
    const others = steps.filter((_, i) => i !== stepIdx).slice(0, 1);
    const opts = [correct, ...others, ...distractors.slice(0, 3 - others.length - 0)].slice(0, 3);
    return opts.sort(() => 0.5 - Math.random());
  }, [stepIdx, item.id]);

  return (
    <div>
      <div className="numline-wrap">
        <svg viewBox="0 0 340 130" style={{ width: '100%', maxWidth: 430, display: 'block', margin: '0 auto' }}>
          <polygon points="170,118 150,126 190,126" fill="var(--line)" />
          <rect x={166} y={50} width={8} height={70} rx={3} fill="var(--line)" />
          <line x1={60} y1={52} x2={280} y2={52} stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
          <line x1={60} y1={52} x2={60} y2={66} stroke="var(--accent)" strokeWidth="3" />
          <line x1={280} y1={52} x2={280} y2={66} stroke="var(--accent)" strokeWidth="3" />
          <rect x={18} y={66} width={84} height={34} rx={9} fill="var(--card-2)" stroke="var(--gem)" strokeWidth="2.5" />
          <rect x={238} y={66} width={84} height={34} rx={9} fill="var(--card-2)" stroke="var(--gem)" strokeWidth="2.5" />
          <text x={60} y={88} textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--ink)">{m.left}</text>
          <text x={280} y={88} textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--ink)">{m.right}</text>
          <text x={170} y={30} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--ink-dim)">keep it balanced ⚖</text>
        </svg>
      </div>
      {!solvingDone ? (
        <div>
          <div style={{ fontWeight: 800, margin: '10px 2px' }}>Move {stepIdx + 1}: what keeps the scale balanced?</div>
          <div className="options-grid">
            {options.map(opt => (
              <button
                key={opt}
                className={`option-btn ${wrongPick === opt ? 'wrong' : ''}`}
                disabled={locked}
                onClick={() => {
                  if (opt === steps[stepIdx]) {
                    setStepIdx(stepIdx + 1);
                    setWrongPick(null);
                    playTap();
                  } else {
                    setWrongPick(opt);
                    setTimeout(() => setWrongPick(null), 420);
                  }
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontWeight: 800, margin: '10px 2px' }}>Balanced! Now — what is x?</div>
          <TypeBox locked={locked} inputMode="decimal" onSubmit={t => onResult(checkAnswer(t, item.answer).correct, t)} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── Plot builder ───────────────────────────

function PlotBuilder({ item, onResult, locked }: ExProps) {
  const m = (item.data?.model ?? {}) as { kind?: string; values?: number[]; min?: number; max?: number; ask?: string };
  const values = m.values ?? [];
  const [placed, setPlaced] = useState<number[]>([]);
  const remaining = [...values];
  for (const p of placed) {
    const i = remaining.indexOf(p);
    if (i !== -1) remaining.splice(i, 1);
  }
  const min = m.min ?? Math.min(...values);
  const max = m.max ?? Math.max(...values);
  const W = 560;
  const px = (v: number) => 40 + ((v - min) / Math.max(max - min, 1)) * (W - 80);
  const stacks: Record<number, number> = {};

  return (
    <div>
      <div className="numline-wrap">
        <svg viewBox={`0 0 ${W} 150`} style={{ width: '100%' }}>
          <line x1={25} y1={120} x2={W - 25} y2={120} stroke="var(--ink-dim)" strokeWidth="3" strokeLinecap="round" />
          {Array.from({ length: max - min + 1 }, (_, i) => min + i).map(v => (
            <g key={v} className="tick-btn" onClick={() => {
              if (locked || remaining.length === 0) return;
              if (remaining.includes(v)) {
                setPlaced([...placed, v]);
                playTap();
              }
            }}>
              <line x1={px(v)} y1={114} x2={px(v)} y2={126} stroke="var(--ink-dim)" strokeWidth="2" />
              <text x={px(v)} y={143} fontSize="12" fontWeight="700" fill="var(--ink-dim)" textAnchor="middle">{v}</text>
              <circle cx={px(v)} cy={120} r={10} fill="transparent" />
            </g>
          ))}
          {placed.map((v, i) => {
            stacks[v] = (stacks[v] ?? 0) + 1;
            return <circle key={i} cx={px(v)} cy={108 - (stacks[v] - 1) * 18} r={7.5} fill="var(--gem)" className="pop-in" />;
          })}
        </svg>
        {remaining.length > 0 ? (
          <div className="center">
            <span className="dim small">place these dots (tap the line): </span>
            {remaining.map((v, i) => (
              <span key={i} className="chip" style={{ margin: 2 }}>{v}</span>
            ))}
          </div>
        ) : (
          <div className="center chip">📊 plot complete!</div>
        )}
      </div>
      {remaining.length === 0 && m.ask && (
        <div className="pop-in">
          <div style={{ fontWeight: 800, margin: '10px 2px' }}>Now read your plot: what is the <u>{m.ask}</u>?</div>
          <TypeBox locked={locked} inputMode="decimal" onSubmit={t => onResult(checkAnswer(t, item.answer).correct, t)} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── Net match ───────────────────────────

const SOLID_ART: Record<string, JSX.Element> = {
  cube: (
    <g stroke="var(--gem)" strokeWidth="2.5" fill="rgba(125,211,252,0.12)">
      <polygon points="40,40 100,40 100,100 40,100" />
      <polygon points="40,40 65,22 125,22 100,40" />
      <polygon points="100,40 125,22 125,82 100,100" />
    </g>
  ),
  rect_prism: (
    <g stroke="var(--gem)" strokeWidth="2.5" fill="rgba(125,211,252,0.12)">
      <polygon points="25,50 105,50 105,95 25,95" />
      <polygon points="25,50 50,30 130,30 105,50" />
      <polygon points="105,50 130,30 130,75 105,95" />
    </g>
  ),
  square_pyramid: (
    <g stroke="var(--gem)" strokeWidth="2.5" fill="rgba(125,211,252,0.12)">
      <polygon points="75,18 30,95 120,95" />
      <polygon points="75,18 120,95 138,80" />
    </g>
  ),
  triangular_prism: (
    <g stroke="var(--gem)" strokeWidth="2.5" fill="rgba(125,211,252,0.12)">
      <polygon points="35,90 75,30 115,90" />
      <line x1={75} y1={30} x2={130} y2={45} />
      <line x1={115} y1={90} x2={140} y2={75} />
      <polygon points="115,90 140,75 130,45 75,30" fill="rgba(125,211,252,0.05)" />
    </g>
  ),
  cylinder: (
    <g stroke="var(--gem)" strokeWidth="2.5" fill="rgba(125,211,252,0.12)">
      <ellipse cx={80} cy={32} rx={42} ry={14} />
      <line x1={38} y1={32} x2={38} y2={92} />
      <line x1={122} y1={32} x2={122} y2={92} />
      <path d="M 38 92 A 42 14 0 0 0 122 92" fill="none" />
    </g>
  ),
};

function NetMatch({ item, onResult, locked }: ExProps) {
  const m = (item.data?.model ?? {}) as { solid?: string; options?: string[]; correct?: string };
  const options = useStableShuffle(item.id, m.options ?? []);
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div>
      <div className="numline-wrap center">
        <svg viewBox="0 0 160 115" style={{ width: 170 }}>{SOLID_ART[m.solid ?? 'cube']}</svg>
        <div className="dim small">unfold me — which net works?</div>
      </div>
      <div className="options-grid">
        {options.map(opt => {
          let cls = 'option-btn';
          if (picked !== null) {
            if (opt === m.correct) cls += ' correct';
            else if (opt === picked) cls += ' wrong';
          }
          return (
            <button key={opt} className={cls} disabled={locked && picked === null} onClick={() => {
              if (locked || picked !== null) return;
              setPicked(opt);
              onResult(opt === m.correct, opt);
            }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────── Worked example (teach) ───────────────────────────

export function WorkedExample({ item, onResult, locked }: ExProps) {
  const steps = item.data?.steps ?? [];
  const [shown, setShown] = useState(1);
  const [checkPassed, setCheckPassed] = useState<Record<number, boolean>>({});
  const [wrongPick, setWrongPick] = useState<string | null>(null);

  const current = shown - 1;
  const step = steps[current];
  const needsCheck = step?.check && !checkPassed[current];
  const isLast = shown >= steps.length;

  return (
    <div>
      <div className="worked-lines">
        {steps.slice(0, shown).map((s, i) => (
          <div key={i} className="worked-line step-reveal">
            <span className="dim small">step {i + 1} · </span>
            {s.text}
          </div>
        ))}
      </div>
      {needsCheck && step.check && (
        <div className="card pop-in" style={{ borderColor: 'var(--accent)' }}>
          <div style={{ fontWeight: 800 }}>🤔 {step.check.question}</div>
          <div className="options-grid" style={{ marginTop: 10 }}>
            {step.check.options.map((opt, oi) => (
              <button
                key={opt}
                className={`option-btn ${wrongPick === opt ? 'wrong' : ''}`}
                disabled={locked}
                onClick={() => {
                  if (oi === step.check!.answer) {
                    setCheckPassed({ ...checkPassed, [current]: true });
                    setWrongPick(null);
                    playTap();
                  } else {
                    setWrongPick(opt);
                    setTimeout(() => setWrongPick(null), 420);
                  }
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
      {!needsCheck && (
        <div className="row" style={{ marginTop: 14, justifyContent: 'flex-end' }}>
          {!isLast ? (
            <button className="btn btn-primary" disabled={locked} onClick={() => setShown(shown + 1)}>
              Next step →
            </button>
          ) : (
            <button className="btn btn-good" disabled={locked} onClick={() => onResult(true, 'studied')}>
              Got it! ✨
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── Dispatcher ───────────────────────────

export function VisualModelExercise(props: ExProps) {
  switch (props.item.model) {
    case 'tape_diagram': return <TapeDiagram {...props} />;
    case 'double_number_line': return <DoubleNumberLine {...props} />;
    case 'ratio_table': return <RatioTable {...props} />;
    case 'percent_bar': return <PercentBar {...props} />;
    case 'area_decomposer': return <AreaDecomposer {...props} />;
    case 'balance_scale': return <BalanceScale {...props} />;
    case 'plot_builder': return <PlotBuilder {...props} />;
    case 'net_match': return <NetMatch {...props} />;
    default:
      return <TypeBox locked={props.locked} onSubmit={t => props.onResult(checkAnswer(t, props.item.answer).correct, t)} />;
  }
}
