/** Exercise dispatcher: one component, 15 interaction types. */

import type { ExProps } from './common';
import { MultipleChoice, TypeAnswer, FillBlanks, SpotError, TwoTruths, Listening } from './basic';
import { MatchingPairs, DragCategorize, OrderSequence, NumberLineTap, DiagramLabel, SpeedRound } from './interactive';
import { VisualModelExercise, WorkedExample } from './visual';

export function ExerciseBody(props: ExProps) {
  switch (props.item.type) {
    case 'multiple_choice': return <MultipleChoice {...props} />;
    case 'type_answer': return <TypeAnswer {...props} />;
    case 'fill_blank':
    case 'worked_completion': return <FillBlanks {...props} />;
    case 'spot_error': return <SpotError {...props} />;
    case 'two_truths': return <TwoTruths {...props} />;
    case 'listening': return <Listening {...props} />;
    case 'matching_pairs': return <MatchingPairs {...props} />;
    case 'drag_categorize': return <DragCategorize {...props} />;
    case 'order_sequence': return <OrderSequence {...props} />;
    case 'number_line_tap': return <NumberLineTap {...props} />;
    case 'diagram_label': return <DiagramLabel {...props} />;
    case 'speed_round': return <SpeedRound {...props} />;
    case 'worked_example': return <WorkedExample {...props} />;
    case 'visual_model': return <VisualModelExercise {...props} />;
    default: return <TypeAnswer {...props} />;
  }
}

/** Friendly label per type, shown as a tiny chip on the prompt. */
export function typeLabel(type: string): string {
  const map: Record<string, string> = {
    multiple_choice: 'choose',
    type_answer: 'type it',
    matching_pairs: 'match',
    drag_categorize: 'sort',
    order_sequence: 'order',
    fill_blank: 'fill in',
    listening: 'listen 🔊',
    spot_error: 'find the flaw',
    speed_round: 'lightning',
    number_line_tap: 'tap the line',
    diagram_label: 'label it',
    two_truths: 'two truths & a lie',
    worked_example: 'study',
    worked_completion: 'finish the steps',
    visual_model: 'build it',
  };
  return map[type] ?? type;
}
