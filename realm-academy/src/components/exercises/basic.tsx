/**
 * Basic exercise types: multiple choice, type-answer, fill-blank / worked-completion,
 * spot-the-error, two-truths, listening.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ExProps } from './common';
import { useStableShuffle, answersOf, TypeBox } from './common';
import { checkAnswer, parseBlanks } from '../../engine/checker';
import { speak, hasFrenchVoice } from '../../engine/speech';

// ─────────────────────────── Multiple choice ───────────────────────────

export function MultipleChoice({ item, onResult, locked }: ExProps) {
  const options = useStableShuffle(item.id, item.options ?? []);
  const [picked, setPicked] = useState<string | null>(null);
  const correctAnswer = String(item.answer);

  const pick = (opt: string) => {
    if (locked || picked !== null) return;
    setPicked(opt);
    onResult(opt === correctAnswer, opt);
  };

  return (
    <div className={`options-grid ${options.every(o => o.length < 28) ? 'two-col' : ''}`}>
      {options.map(opt => {
        let cls = 'option-btn';
        if (picked !== null) {
          if (opt === correctAnswer) cls += ' correct';
          else if (opt === picked) cls += ' wrong';
        }
        return (
          <button key={opt} className={cls} onClick={() => pick(opt)} disabled={locked && picked === null}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────── Type the answer ───────────────────────────

export function TypeAnswer({ item, onResult, locked }: ExProps) {
  const [accentNote, setAccentNote] = useState<string | null>(null);
  const numeric = useMemo(() => answersOf(item).every(a => /^[\d\s.,/:%$\-]+$/.test(a)), [item.id]);

  const submit = (text: string) => {
    const res = checkAnswer(text, item.answer);
    if (res.accentNote) setAccentNote(res.accentNote);
    onResult(res.correct, text);
  };

  return (
    <div>
      <TypeBox onSubmit={submit} locked={locked} inputMode={numeric ? 'decimal' : 'text'} />
      {accentNote && (
        <div className="hint-box pop-in">
          ✔ Correct! The fancy French spelling is <b>{accentNote}</b> — accents are little hats words earn.
        </div>
      )}
    </div>
  );
}

// ──────────────── Fill-in-the-blank / worked completion ────────────────

export function FillBlanks({ item, onResult, locked }: ExProps) {
  const lines = item.data?.lines ?? [];
  const parsed = useMemo(() => lines.map(parseBlanks), [item.id]);
  const blankCount = parsed.reduce((n, l) => n + l.parts.filter(p => p.blank).length, 0);
  const [values, setValues] = useState<string[]>(() => Array(blankCount).fill(''));
  const [marks, setMarks] = useState<(boolean | null)[]>(() => Array(blankCount).fill(null));
  const isWorked = item.type === 'worked_completion';

  const submit = () => {
    if (locked) return;
    let k = 0;
    const newMarks: (boolean | null)[] = [];
    let allGood = true;
    for (const line of parsed) {
      for (const part of line.parts) {
        if (part.blank) {
          const ok = checkAnswer(values[k], part.blank).correct;
          newMarks[k] = ok;
          if (!ok) allGood = false;
          k++;
        }
      }
    }
    setMarks(newMarks);
    onResult(allGood, values.join(' | '));
  };

  let blankIdx = -1;
  return (
    <div>
      <div className="worked-lines">
        {parsed.map((line, li) => (
          <div key={li} className={isWorked ? 'worked-line' : ''} style={isWorked ? {} : { padding: '6px 0' }}>
            {line.parts.map((part, pi) => {
              if (part.text !== undefined) return <span key={pi}>{part.text}</span>;
              blankIdx++;
              const k = blankIdx;
              return (
                <input
                  key={pi}
                  className={`blank-input ${marks[k] === true ? 'ok' : marks[k] === false ? 'no' : ''}`}
                  value={values[k] ?? ''}
                  disabled={locked}
                  autoCapitalize="off"
                  autoCorrect="off"
                  onChange={e => {
                    const v = [...values];
                    v[k] = e.target.value;
                    setValues(v);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && values.every(v => v.trim() !== '')) submit();
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="row" style={{ marginTop: 12, justifyContent: 'flex-end' }}>
        <button
          className="btn btn-primary"
          onClick={submit}
          disabled={locked || values.some(v => v.trim() === '')}
        >
          Check ✓
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────── Spot the error ───────────────────────────

export function SpotError({ item, onResult, locked }: ExProps) {
  const segments = item.data?.segments ?? [];
  const [picked, setPicked] = useState<number | null>(null);
  const correctIdx = parseInt(String(item.answer), 10);

  return (
    <div className="options-grid">
      {segments.map((seg, i) => {
        let cls = 'option-btn';
        if (picked !== null) {
          if (i === correctIdx) cls += ' correct';
          else if (i === picked) cls += ' wrong';
        }
        return (
          <button
            key={i}
            className={cls}
            disabled={locked && picked === null}
            onClick={() => {
              if (locked || picked !== null) return;
              setPicked(i);
              onResult(i === correctIdx, seg);
            }}
          >
            <span className="dim small">{i + 1}.</span> {seg}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────── Two truths & a lie ───────────────────────────

export function TwoTruths({ item, onResult, locked }: ExProps) {
  const statements = useStableShuffle(item.id, [...(item.data?.truths ?? []), item.data?.lie ?? '']);
  const lie = item.data?.lie ?? '';
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div>
      <div className="chip" style={{ marginBottom: 10 }}>🕵️ Tap the LIE</div>
      <div className="options-grid">
        {statements.map(s => {
          let cls = 'option-btn';
          if (picked !== null) {
            if (s === lie) cls += ' correct';
            else if (s === picked) cls += ' wrong';
          }
          return (
            <button
              key={s}
              className={cls}
              disabled={locked && picked === null}
              onClick={() => {
                if (locked || picked !== null) return;
                setPicked(s);
                onResult(s === lie, s);
              }}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────── Listening (French/TTS) ───────────────────────────

export function Listening({ item, onResult, locked }: ExProps) {
  const audioText = item.data?.audioText ?? '';
  const lang = item.data?.lang ?? 'fr-FR';
  const [voiceOk, setVoiceOk] = useState(true);
  const playedOnce = useRef(false);

  const play = () => {
    const ok = speak(audioText, lang);
    setVoiceOk(ok);
    playedOnce.current = true;
  };

  useEffect(() => {
    // autoplay once on mount where allowed; failure just shows fallback
    const t = setTimeout(() => {
      if (!playedOnce.current) play();
    }, 350);
    return () => clearTimeout(t);
  }, [item.id]);

  const noVoice = !voiceOk || !hasFrenchVoice();

  return (
    <div>
      <div className="row" style={{ margin: '12px 0' }}>
        <button className="tts-btn" onClick={play} aria-label="Play audio">
          🔊
        </button>
        <span className="dim">{noVoice ? 'No French voice on this device — use the phonetic clue:' : 'Tap to hear it again'}</span>
      </div>
      {noVoice && <div className="hint-box">🗣 {item.hint ?? `It sounds like: "${audioText}"`}</div>}
      {item.options && item.options.length > 0 ? (
        <MultipleChoice item={item} onResult={onResult} locked={locked} />
      ) : (
        <TypeAnswer item={item} onResult={onResult} locked={locked} />
      )}
    </div>
  );
}
