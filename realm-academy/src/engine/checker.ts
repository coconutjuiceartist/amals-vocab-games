/**
 * Answer checker: numeric tolerance + equivalent forms for math,
 * accent-forgiving matching for French, case/whitespace forgiveness everywhere.
 */

/** Strip diacritics: élève -> eleve, garçon -> garcon, œuf -> oeuf */
export function foldAccents(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'OE')
    .replace(/æ/g, 'ae')
    .replace(/Æ/g, 'AE')
    .replace(/ß/g, 'ss');
}

export function normalizeText(s: string): string {
  return foldAccents(String(s))
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/[.!?]+$/g, '')
    .trim();
}

/** Parse "3/4", "1 1/2", "2,5", "33%", "$4.50", "0.75" into a number; null if not numeric. */
export function parseNumeric(raw: string | number): number | null {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null;
  let s = String(raw).trim().toLowerCase();
  if (!s) return null;
  s = s.replace(/[$€£]/g, '').replace(/percent$/i, '%').trim();
  let percent = false;
  if (s.endsWith('%')) {
    percent = true;
    s = s.slice(0, -1).trim();
  }
  // strip common units
  s = s.replace(/\s*(cm|mm|km|m|cm2|cm²|m2|m²|cm3|cm³|m3|m³|in|ft|mi|kg|g|lb|oz|l|ml|mph|km\/h|per hour|hours?|min(utes)?|sec(onds)?|units?|cups?|cookies?|degrees?|°)\s*$/i, '');
  s = s.replace(/,/g, m => (s.includes('.') ? '' : '.')); // 2,5 -> 2.5 (only if no dot already)
  // mixed number "1 1/2"
  const mixed = s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const whole = parseInt(mixed[1], 10);
    const num = parseInt(mixed[2], 10);
    const den = parseInt(mixed[3], 10);
    if (den === 0) return null;
    const sign = whole < 0 ? -1 : 1;
    return whole + sign * (num / den);
  }
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (frac) {
    const den = parseFloat(frac[2]);
    if (den === 0) return null;
    return parseFloat(frac[1]) / den;
  }
  const ratio = s.match(/^(-?\d+(?:\.\d+)?)\s*:\s*(-?\d+(?:\.\d+)?)$/);
  if (ratio) return null; // ratios compared as ratios, not numbers
  const n = parseFloat(s);
  if (!Number.isFinite(n)) return null;
  return percent ? n / 100 : n;
}

/** Compare ratio forms: "3:4" === "3 : 4" === "3 to 4" (NOT reduced — 6:8 ≠ 3:4 unless answer lists it). */
function normalizeRatio(s: string): string | null {
  const m = String(s)
    .toLowerCase()
    .replace(/\s+to\s+/g, ':')
    .replace(/\s/g, '')
    .match(/^(-?\d+(?:\.\d+)?):(-?\d+(?:\.\d+)?)$/);
  return m ? `${m[1]}:${m[2]}` : null;
}

export interface CheckResult {
  correct: boolean;
  /** e.g. user typed `eleve`, canonical is `élève` — correct, but show the pretty form */
  accentNote?: string;
}

const NUM_TOLERANCE = 1e-6;

function numbersMatch(a: number, b: number): boolean {
  if (Math.abs(b) > 1) return Math.abs(a - b) / Math.abs(b) < 1e-4;
  return Math.abs(a - b) < NUM_TOLERANCE + 1e-4;
}

/**
 * Check a free-typed answer against canonical answer(s).
 * Accepts: exact text (case/space/accent-insensitive), numeric-equivalent forms
 * (0.5 == 1/2 == 50%), and ratio-equivalent notation (3:4 == "3 to 4").
 */
export function checkAnswer(userRaw: string | number, canonical: string | number | string[]): CheckResult {
  const answers = Array.isArray(canonical) ? canonical : [canonical];
  const user = String(userRaw);
  const userNorm = normalizeText(user);
  if (userNorm === '') return { correct: false };
  const userNum = parseNumeric(user);
  const userRatio = normalizeRatio(user);

  for (const ans of answers) {
    const ansStr = String(ans);
    const ansNorm = normalizeText(ansStr);
    // 1. text match (accent/case/space-forgiving)
    if (userNorm === ansNorm) {
      const hadAccents = foldAccents(ansStr) !== ansStr;
      const userHadThem = user.trim().toLowerCase() === ansStr.trim().toLowerCase();
      if (hadAccents && !userHadThem) {
        return { correct: true, accentNote: ansStr };
      }
      return { correct: true };
    }
    // 2. ratio notation match
    if (userRatio) {
      const ansRatio = normalizeRatio(ansStr);
      if (ansRatio && userRatio === ansRatio) return { correct: true };
    }
    // 3. numeric equivalence
    const ansNum = parseNumeric(ans as string | number);
    if (ansNum !== null && userNum !== null && numbersMatch(userNum, ansNum)) {
      return { correct: true };
    }
  }
  return { correct: false };
}

/** For fill-blank lines like "12 ÷ 3 = [[4]]" — extract text + blanks. */
export interface ParsedLine {
  parts: { text?: string; blank?: string[] }[];
}

export function parseBlanks(line: string): ParsedLine {
  const parts: ParsedLine['parts'] = [];
  const re = /\[\[(.+?)\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) parts.push({ text: line.slice(last, m.index) });
    parts.push({ blank: m[1].split('|') });
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push({ text: line.slice(last) });
  return { parts };
}

export function countBlanks(lines: string[]): number {
  return lines.reduce((acc, l) => acc + (l.match(/\[\[(.+?)\]\]/g)?.length ?? 0), 0);
}
