// @vitest-environment jsdom
/**
 * Regression test for the "pre-selected answer, no continue button" bug:
 * consecutive teach screens of the SAME exercise type must remount their
 * exercise component (state from question 1 must never leak into question 2).
 *
 * Repro case from the field: teach.hum.china's burst runs two multiple_choice
 * items back-to-back ("four great inventions" → "Grand Canal").
 */

import { describe, it, expect, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { TeachPlayer } from './TeachPlayer';
import { loadRegistry } from '../engine/loadContent';
import type { LessonPlan, TeachSequence } from '../engine/types';

afterEach(cleanup);

function burstPlan(itemIds: string[]): LessonPlan {
  const seq: TeachSequence = {
    id: 'teach.test.burst',
    skill: 'hum.china',
    title: 'Burst regression',
    screens: [{ kind: 'burst', itemIds }],
  };
  return { kind: 'teach', realm: 'humanities', teachSequence: seq, items: [], title: seq.title };
}

describe('TeachPlayer consecutive same-type screens', () => {
  it('second multiple_choice question starts clean and clickable (Grand Canal bug)', () => {
    const registry = loadRegistry();
    const first = registry.item('hum.china.001')!;
    const second = registry.item('hum.china.002')!;
    expect(first.type).toBe('multiple_choice');
    expect(second.type).toBe('multiple_choice');

    const { getByText, container } = render(
      <TeachPlayer
        plan={burstPlan(['hum.china.001', 'hum.china.002'])}
        mascotName="Biscuit"
        mascotHat="none"
        onFinish={() => {}}
        onExit={() => {}}
      />,
    );

    // Question 1: answer it correctly
    fireEvent.click(getByText(String(first.answer)));
    // feedback appears with a continue button
    fireEvent.click(getByText(/Continue/));

    // Question 2 ("What was the Grand Canal built to do?") must be pristine:
    expect(container.textContent).toContain('Grand Canal');
    const stained = container.querySelectorAll('.option-btn.correct, .option-btn.wrong, .option-btn.selected');
    expect(stained.length).toBe(0); // ← the bug: previous pick leaked in, pre-highlighting the answer

    // …and clickable: answering it must produce feedback + a continue control
    fireEvent.click(getByText(String(second.answer)));
    expect(container.querySelectorAll('.option-btn.correct').length).toBe(1);
    expect(getByText(/Continue/)).toBeTruthy();
  });

  it('finishing the burst calls onFinish with both results', () => {
    const registry = loadRegistry();
    const first = registry.item('hum.china.001')!;
    const second = registry.item('hum.china.002')!;
    let finished: number | null = null;

    const { getByText } = render(
      <TeachPlayer
        plan={burstPlan(['hum.china.001', 'hum.china.002'])}
        mascotName="Biscuit"
        mascotHat="none"
        onFinish={r => {
          finished = r.itemResults.length;
        }}
        onExit={() => {}}
      />,
    );

    fireEvent.click(getByText(String(first.answer)));
    fireEvent.click(getByText(/Continue/));
    fireEvent.click(getByText(String(second.answer)));
    fireEvent.click(getByText(/Continue/));
    expect(finished).toBe(2);
  });

  it('consecutive completion screens never leak typed blanks (ratios t03→t04)', () => {
    // teach.math.ratios runs completion t03 then completion t04 back-to-back
    const { getByText, container } = render(
      <TeachPlayer
        plan={{
          kind: 'teach',
          realm: 'math',
          teachSequence: {
            id: 'teach.test.completions',
            skill: 'math.ratios',
            title: 'x',
            screens: [
              { kind: 'completion', itemId: 'math.ratios.t03' },
              { kind: 'completion', itemId: 'math.ratios.t04' },
            ],
          },
          items: [],
          title: 'x',
        }}
        mascotName="B"
        mascotHat="none"
        onFinish={() => {}}
        onExit={() => {}}
      />,
    );

    // answer t03 (single blank: 15)
    const input = container.querySelector('.blank-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.click(getByText('Check ✓'));
    fireEvent.click(getByText(/Continue/));

    // t04 has TWO blanks — both must be empty and unmarked
    const blanks = Array.from(container.querySelectorAll('.blank-input')) as HTMLInputElement[];
    expect(blanks.length).toBe(2);
    for (const b of blanks) {
      expect(b.value).toBe('');
      expect(b.className).not.toContain('ok');
      expect(b.className).not.toContain('no');
    }
  });
});
