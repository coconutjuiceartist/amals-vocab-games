/**
 * Render smoke tests: server-render every exercise type and every visual-model
 * mode using REAL content items, plus the mascot and teach player. Catches
 * render-time crashes across the whole exercise engine.
 */

import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ExerciseBody } from './exercises';
import { Mascot, type MascotPose } from './Mascot';
import { TeachPlayer } from './TeachPlayer';
import { FirstRun } from './FirstRun';
import { loadRegistry } from '../engine/loadContent';
import type { ExerciseType, VisualModel, LessonPlan } from '../engine/types';

const registry = loadRegistry();

const ALL_TYPES: ExerciseType[] = [
  'multiple_choice', 'type_answer', 'matching_pairs', 'drag_categorize', 'order_sequence',
  'fill_blank', 'listening', 'spot_error', 'speed_round', 'number_line_tap', 'diagram_label',
  'two_truths', 'worked_example', 'worked_completion', 'visual_model',
];

const ALL_MODELS: VisualModel[] = [
  'tape_diagram', 'double_number_line', 'ratio_table', 'percent_bar',
  'area_decomposer', 'balance_scale', 'plot_builder', 'net_match',
];

describe('exercise engine renders every type with real content', () => {
  for (const type of ALL_TYPES) {
    it(`renders ${type}`, () => {
      const samples = registry.items.filter(i => i.type === type).slice(0, 3);
      expect(samples.length, `no content items of type ${type}`).toBeGreaterThan(0);
      for (const item of samples) {
        const html = renderToString(
          <ExerciseBody item={item} onResult={() => {}} locked={false} />,
        );
        expect(html.length).toBeGreaterThan(20);
      }
    });
  }

  for (const model of ALL_MODELS) {
    it(`renders visual model ${model}`, () => {
      const samples = registry.items.filter(i => i.type === 'visual_model' && i.model === model).slice(0, 2);
      if (samples.length === 0) return; // count gaps are reported by validate-content
      for (const item of samples) {
        const html = renderToString(
          <ExerciseBody item={item} onResult={() => {}} locked={false} />,
        );
        expect(html.length).toBeGreaterThan(20);
      }
    });
  }
});

describe('shell components render', () => {
  it('renders the mascot in every pose and hat', () => {
    const poses: MascotPose[] = ['happy', 'excited', 'thinking', 'sleepy', 'proud', 'surprised', 'sad'];
    for (const pose of poses) {
      for (const hat of ['none', 'wizard', 'beret', 'crown', 'headphones', 'flowercrown']) {
        expect(renderToString(<Mascot pose={pose} hat={hat} />)).toContain('svg');
      }
    }
  });

  it('renders the first-run flow', () => {
    const html = renderToString(<FirstRun onDone={() => {}} />);
    expect(html).toContain('Realm Academy');
  });

  it('renders the teach player on the ratios sequence (first screen = bridge)', () => {
    const seq = registry.teach('teach.math.ratios');
    expect(seq).toBeDefined();
    const plan: LessonPlan = {
      kind: 'teach',
      realm: 'math',
      skillFocus: 'math.ratios',
      teachSequence: seq!,
      items: [],
      title: seq!.title,
    };
    const html = renderToString(
      <TeachPlayer plan={plan} mascotName="Biscuit" mascotHat="none" onFinish={() => {}} onExit={() => {}} />,
    );
    expect(html).toContain('Onward');
  });

  it('every teach sequence resolves its screens to renderable items', () => {
    for (const seq of registry.teachSequences) {
      for (const screen of seq.screens) {
        if (screen.kind === 'gambit' || screen.kind === 'worked' || screen.kind === 'completion') {
          const item = registry.item(screen.itemId);
          expect(item, `${seq.id} → ${screen.itemId}`).toBeDefined();
          const html = renderToString(<ExerciseBody item={item!} onResult={() => {}} locked={false} />);
          expect(html.length).toBeGreaterThan(20);
        }
      }
    }
  });
});
