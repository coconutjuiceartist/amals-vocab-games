/**
 * Optional speaking practice (settings-gated): after a French item, she can
 * say the phrase; we show what the device heard. Encouraging, never graded.
 */

import { useState } from 'react';
import { listenOnce, recognitionAvailable, speak } from '../engine/speech';
import { foldAccents } from '../engine/checker';

export function SpeakBack({ text, lang = 'fr-FR' }: { text: string; lang?: string }) {
  const [state, setState] = useState<'idle' | 'listening' | 'done'>('idle');
  const [heard, setHeard] = useState('');

  if (!recognitionAvailable()) return null;

  const matchish = heard
    .split('|')
    .some(alt => foldAccents(alt.toLowerCase().trim()).includes(foldAccents(text.toLowerCase()).slice(0, Math.min(8, text.length))));

  return (
    <div className="row" style={{ marginTop: 8 }}>
      {state === 'idle' && (
        <button
          className="btn btn-small btn-ghost"
          onClick={() => {
            speak(text, lang, 0.85);
            setTimeout(() => {
              setState('listening');
              const stop = listenOnce(
                lang,
                t => setHeard(t),
                () => setState('done'),
              );
              if (!stop) setState('idle');
            }, 1400);
          }}
        >
          🎤 try saying it!
        </button>
      )}
      {state === 'listening' && <span className="chip sparkle">🎤 listening… say: “{text}”</span>}
      {state === 'done' && (
        <span className="chip" style={{ borderColor: matchish ? 'var(--good)' : 'var(--line)' }}>
          {heard
            ? matchish
              ? `🗣 "${heard.split('|')[0]}" — magnifique!`
              : `🗣 heard "${heard.split('|')[0]}" — accents take practice, keep playing!`
            : '🗣 didn\'t catch it — totally fine, try again anytime'}
        </span>
      )}
    </div>
  );
}
