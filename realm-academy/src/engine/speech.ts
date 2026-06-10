/**
 * Web Speech wrapper — French audio everywhere in the French realm,
 * plus the daily Swahili bonus word. Feature-detected; degrades to phonetic hints.
 */

let voices: SpeechSynthesisVoice[] = [];
let loaded = false;

function refreshVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  voices = window.speechSynthesis.getVoices();
  loaded = voices.length > 0;
}

export function initSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

export function speechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Best voice for a language prefix ('fr', 'sw', 'en'). Prefers local + "premium-sounding" names. */
export function bestVoice(langPrefix: string): SpeechSynthesisVoice | null {
  if (!speechAvailable()) return null;
  if (!loaded) refreshVoices();
  const matches = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix.toLowerCase()));
  if (matches.length === 0) return null;
  const score = (v: SpeechSynthesisVoice) => {
    let s = 0;
    if (v.localService) s += 2;
    if (/premium|enhanced|natural|siri|am[eé]lie|thomas|aurelie|google/i.test(v.name)) s += 3;
    if (v.default) s += 1;
    return s;
  };
  return matches.sort((a, b) => score(b) - score(a))[0];
}

export function hasFrenchVoice(): boolean {
  return bestVoice('fr') !== null;
}

export function hasSwahiliVoice(): boolean {
  return bestVoice('sw') !== null;
}

/** Speak text; returns false if no voice for that language exists. */
export function speak(text: string, lang: string = 'fr-FR', rate: number = 0.92): boolean {
  if (!speechAvailable()) return false;
  const prefix = lang.split('-')[0];
  const voice = bestVoice(prefix);
  if (!voice) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = rate;
    u.pitch = 1.02;
    window.speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking() {
  if (speechAvailable()) window.speechSynthesis.cancel();
}

/** Optional speaking exercises (settings-gated). */
export function recognitionAvailable(): boolean {
  return typeof window !== 'undefined' && !!((window as any).webkitSpeechRecognition || (window as any).SpeechRecognition);
}

export function listenOnce(lang: string, onResult: (text: string) => void, onEnd: () => void): (() => void) | null {
  const Rec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
  if (!Rec) return null;
  try {
    const rec = new Rec();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = (e: any) => {
      const alts: string[] = [];
      for (let i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
      onResult(alts.join('|'));
    };
    rec.onend = onEnd;
    rec.onerror = onEnd;
    rec.start();
    return () => rec.abort();
  } catch {
    return null;
  }
}
