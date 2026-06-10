/**
 * Teach-sequence player: Bridge → Explorer's Gambit → Worked examples →
 * Completion problems (fading) → blocked Burst. One idea per screen,
 * always something to DO.
 */

import { useMemo, useState } from 'react';
import type { Item, LessonPlan, TeachScreen } from '../engine/types';
import { loadRegistry } from '../engine/loadContent';
import { ExerciseBody } from './exercises';
import { Mascot } from './Mascot';
import { playCorrect, playMiss, playTap } from '../engine/audio';
import { MiniBurst } from './Confetti';

const BRIDGE_ART: Record<string, string> = {
  balance: '⚖️',
  speed: '🚂',
  number_line: '📏',
  tape: '📊',
  percent: '💯',
  grid: '🗺️',
  none: '✨',
};

export interface TeachResult {
  itemResults: { item: Item; correct: boolean }[];
}

export function TeachPlayer({
  plan,
  mascotName,
  mascotHat,
  onFinish,
  onExit,
}: {
  plan: LessonPlan;
  mascotName: string;
  mascotHat: string;
  onFinish: (result: TeachResult) => void;
  onExit: () => void;
}) {
  const registry = loadRegistry();
  const seq = plan.teachSequence!;
  // flatten burst screens into individual item screens
  const flat = useMemo(() => {
    const out: (TeachScreen | { kind: 'burst_item'; itemId: string; n: number; of: number })[] = [];
    for (const screen of seq.screens) {
      if (screen.kind === 'burst') {
        screen.itemIds.forEach((id, i) => out.push({ kind: 'burst_item', itemId: id, n: i + 1, of: screen.itemIds.length }));
      } else out.push(screen);
    }
    return out;
  }, [seq.id]);

  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [results, setResults] = useState<{ item: Item; correct: boolean }[]>([]);
  const [burstKey, setBurstKey] = useState(0);

  const screen = flat[idx];
  const progress = (idx / flat.length) * 100;

  const advance = () => {
    setAnswered(false);
    setLastCorrect(null);
    if (idx + 1 >= flat.length) {
      onFinish({ itemResults: results });
    } else {
      setIdx(idx + 1);
      playTap();
    }
  };

  const itemFor = (s: typeof screen): Item | null => {
    if (!s) return null;
    if (s.kind === 'gambit' || s.kind === 'worked' || s.kind === 'completion') return registry.item(s.itemId) ?? null;
    if (s.kind === 'burst_item') return registry.item(s.itemId) ?? null;
    return null;
  };

  const item = itemFor(screen);
  const isGambit = screen?.kind === 'gambit';
  const isWorked = screen?.kind === 'worked';

  const handleResult = (correct: boolean) => {
    setAnswered(true);
    setLastCorrect(correct);
    if (item && screen.kind !== 'worked') {
      setResults([...results, { item, correct }]);
    }
    if (isGambit) {
      playTap();
    } else if (correct) {
      playCorrect(1);
      setBurstKey(k => k + 1);
    } else {
      playMiss();
    }
  };

  return (
    <div>
      <div className="lesson-top">
        <button className="btn btn-small btn-ghost" onClick={onExit}>✕</button>
        <div className="lesson-bar"><div style={{ width: `${progress}%` }} /></div>
        <span className="chip">📖 learn</span>
      </div>

      {screen?.kind === 'bridge' && (
        <div className="bridge-card pop-in" key={idx}>
          <div className="row">
            <div style={{ fontSize: '2.6rem' }}>{BRIDGE_ART[screen.visual ?? 'none']}</div>
            <h2 style={{ flex: 1 }}>{screen.title}</h2>
          </div>
          {screen.lines.map((line, i) => (
            <p key={i} style={{ fontSize: '1.08rem' }}>{line}</p>
          ))}
          {screen.vocab && screen.vocab.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div className="dim small" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>new words for your spellbook</div>
              {screen.vocab.map(v => (
                <span key={v.term} className="vocab-chip">
                  <b>{v.term}</b> — {v.meaning}
                </span>
              ))}
            </div>
          )}
          <div className="row" style={{ marginTop: 16, justifyContent: 'flex-end' }}>
            <button className="btn btn-primary btn-big" onClick={advance}>Onward →</button>
          </div>
        </div>
      )}

      {isGambit && item && (
        <div className="pop-in" key={idx}>
          <div className="gambit-badge">🧭 Explorer's Gambit — ungraded</div>
          <p className="dim" style={{ margin: '8px 2px' }}>
            {(screen as Extract<TeachScreen, { kind: 'gambit' }>).framing}
          </p>
          <div className="prompt-card">{item.prompt}</div>
          <div className="exercise-stage">
            <ExerciseBody item={item} onResult={handleResult} ungraded locked={answered} />
          </div>
          {answered && (
            <div className="card pop-in" style={{ borderColor: 'var(--accent)' }}>
              <b>{lastCorrect ? `Whoa — you cracked it before the lesson! 🔮` : `Brave try! That guess just primed your brain.`}</b>
              <p className="dim small" style={{ margin: '6px 0 0' }}>
                {lastCorrect
                  ? 'Let\'s see WHY it works — that\'s the real treasure.'
                  : 'Wrong guesses before learning actually make the explanation stick better. Science says so. Onward!'}
              </p>
              <div className="row" style={{ justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={advance}>Show me how →</button>
              </div>
            </div>
          )}
        </div>
      )}

      {isWorked && item && (
        <div className="pop-in" key={idx}>
          <div className="chip" style={{ marginBottom: 8 }}>🔍 watch + tap along</div>
          <div className="prompt-card">{item.prompt}</div>
          <div className="exercise-stage">
            <ExerciseBody
              item={item}
              onResult={() => {
                setResults(r => r);
                advance();
              }}
              locked={false}
            />
          </div>
        </div>
      )}

      {screen?.kind === 'completion' && item && (
        <div className="pop-in" key={idx}>
          <div className="chip" style={{ marginBottom: 8 }}>🧩 your turn — fill the gaps</div>
          <div className="prompt-card">{item.prompt}</div>
          <div className="exercise-stage">
            <ExerciseBody item={item} onResult={handleResult} locked={answered} />
          </div>
          {answered && (
            <FeedbackInline correct={lastCorrect!} item={item} onNext={advance} />
          )}
        </div>
      )}

      {screen?.kind === 'burst_item' && item && (
        <div className="pop-in" key={idx}>
          <div className="chip" style={{ marginBottom: 8 }}>
            ⚡ quick practice {(screen as { n: number; of: number }).n}/{(screen as { n: number; of: number }).of}
          </div>
          <div className="prompt-card">{item.prompt}</div>
          <div className="exercise-stage">
            <ExerciseBody item={item} onResult={handleResult} locked={answered} />
          </div>
          {answered && <FeedbackInline correct={lastCorrect!} item={item} onNext={advance} />}
        </div>
      )}

      <MiniBurst trigger={burstKey} />

      <div className="row" style={{ marginTop: 24, opacity: 0.85 }}>
        <Mascot pose={answered ? (lastCorrect ? 'excited' : 'thinking') : 'happy'} size={64} hat={mascotHat} />
        <span className="dim small">{mascotName} is teaching this one personally.</span>
      </div>
    </div>
  );
}

function FeedbackInline({ correct, item, onNext }: { correct: boolean; item: Item; onNext: () => void }) {
  return (
    <div className="card pop-in" style={{ borderColor: correct ? 'var(--good)' : 'var(--bad)' }}>
      <b style={{ color: correct ? 'var(--good)' : 'var(--bad)' }}>
        {correct ? '✓ That strategy worked!' : '✗ Not yet — and that\'s useful data!'}
      </b>
      {!correct && item.explanation && <p style={{ margin: '6px 0 0' }}>{item.explanation}</p>}
      {correct && item.explanation && <p className="dim small" style={{ margin: '6px 0 0' }}>{item.explanation}</p>}
      <div className="row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  );
}
