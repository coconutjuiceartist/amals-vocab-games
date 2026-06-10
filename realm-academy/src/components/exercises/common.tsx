import { useMemo, useState } from 'react';
import type { Item } from '../../engine/types';
import { shuffled, seededRng, hashString } from '../../engine/rng';

/** Common props for every exercise component. */
export interface ExProps {
  item: Item;
  /** Called exactly once when the learner commits an answer. */
  onResult: (correct: boolean, detail?: string) => void;
  /** Gambit mode: visually identical, result reported but framed as exploration. */
  ungraded?: boolean;
  /** Lock the UI after answering (LessonPlayer shows the banner). */
  locked: boolean;
}

/** Stable per-item shuffle so options don't reshuffle on re-render. */
export function useStableShuffle<T>(itemId: string, arr: T[]): T[] {
  return useMemo(() => shuffled(arr, seededRng(hashString(itemId + ':shuffle'))), [itemId, arr.length]);
}

export function answersOf(item: Item): string[] {
  return Array.isArray(item.answer) ? item.answer.map(String) : [String(item.answer)];
}

/** Reusable submit-on-enter text input + check button. */
export function TypeBox({
  onSubmit,
  locked,
  placeholder,
  inputMode,
}: {
  onSubmit: (text: string) => void;
  locked: boolean;
  placeholder?: string;
  inputMode?: 'text' | 'decimal';
}) {
  const [text, setText] = useState('');
  const submit = () => {
    if (text.trim() === '' || locked) return;
    onSubmit(text);
  };
  return (
    <div>
      <input
        className="type-input"
        value={text}
        inputMode={inputMode}
        placeholder={placeholder ?? 'Type your answer…'}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        disabled={locked}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') submit();
        }}
      />
      <div className="row" style={{ marginTop: 12, justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={submit} disabled={locked || text.trim() === ''}>
          Check ✓
        </button>
      </div>
    </div>
  );
}
