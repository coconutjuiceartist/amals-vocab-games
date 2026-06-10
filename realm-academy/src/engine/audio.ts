/**
 * WebAudio synth sound design. No external assets.
 * Correct "ding", combo riser, level-up fanfare, soft "whiff" for misses,
 * chest creak, boss hit. All gentle — never harsh.
 */

let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(m: boolean) {
  muted = m;
}

function audio(): AudioContext | null {
  if (muted) return null;
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || (window as any).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  opts: { t?: number; dur?: number; type?: OscillatorType; gain?: number; glideTo?: number } = {},
) {
  const ac = audio();
  if (!ac) return;
  const { t = 0, dur = 0.18, type = 'sine', gain = 0.16, glideTo } = opts;
  const start = ac.currentTime + t;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, start + dur);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

/** Correct answer: bright little two-note ding. */
export function playCorrect(combo: number = 1) {
  const base = 660 * Math.pow(1.059, Math.min(combo - 1, 8)); // riser: pitch climbs with combo
  tone(base, { dur: 0.12, type: 'sine', gain: 0.14 });
  tone(base * 1.5, { t: 0.07, dur: 0.22, type: 'sine', gain: 0.12 });
  if (combo > 0 && combo % 5 === 0) {
    tone(base * 2, { t: 0.16, dur: 0.3, type: 'triangle', gain: 0.12 });
  }
}

/** Miss: soft, kind "whiff" — low and brief, never a buzzer. */
export function playMiss() {
  tone(220, { dur: 0.25, type: 'sine', gain: 0.08, glideTo: 150 });
}

/** Level-up / crown fanfare: rising arpeggio. */
export function playFanfare() {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((n, i) => tone(n, { t: i * 0.09, dur: 0.25, type: 'triangle', gain: 0.14 }));
  tone(1318.5, { t: 0.4, dur: 0.5, type: 'sine', gain: 0.1 });
}

/** Chest opening: creak + sparkle. */
export function playChest() {
  tone(180, { dur: 0.3, type: 'sawtooth', gain: 0.05, glideTo: 240 });
  tone(880, { t: 0.25, dur: 0.15, type: 'sine', gain: 0.1 });
  tone(1320, { t: 0.35, dur: 0.2, type: 'sine', gain: 0.1 });
  tone(1760, { t: 0.45, dur: 0.3, type: 'sine', gain: 0.08 });
}

/** Boss takes a hit. */
export function playBossHit() {
  tone(110, { dur: 0.2, type: 'square', gain: 0.07, glideTo: 70 });
  tone(440, { t: 0.02, dur: 0.1, type: 'triangle', gain: 0.1 });
}

/** Boss defeated! */
export function playVictory() {
  const notes = [392, 523.25, 659.25, 783.99, 1046.5, 1318.5];
  notes.forEach((n, i) => tone(n, { t: i * 0.11, dur: 0.3, type: 'triangle', gain: 0.13 }));
}

/** Tiny UI tap. */
export function playTap() {
  tone(880, { dur: 0.05, type: 'sine', gain: 0.05 });
}

/** Streak shield deployed. */
export function playShield() {
  tone(330, { dur: 0.3, type: 'triangle', gain: 0.1, glideTo: 660 });
}
