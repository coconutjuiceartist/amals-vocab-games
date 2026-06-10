/**
 * Lesson player — runs every plan kind: lesson / warmup / boss / teach (delegated).
 * Misses re-queue later in the same session. Combo meter + juice on feedback,
 * calm screens while she works. Boss battles are soft-timed (the enemy "charges"
 * but the clock can never fail her).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Item, LessonPlan, BossDef } from '../engine/types';
import { useStore } from '../engine/store';
import { ExerciseBody, typeLabel } from './exercises';
import { TeachPlayer } from './TeachPlayer';
import { Mascot } from './Mascot';
import { Confetti, MiniBurst } from './Confetti';
import { playCorrect, playMiss, playFanfare, playBossHit, playVictory, playTap } from '../engine/audio';
import { speak, hasFrenchVoice } from '../engine/speech';
import { pick } from '../engine/rng';

const PRAISE = [
  'That strategy cracked it!',
  'Your brain just leveled up a little.',
  'Clean solve — straight to the point!',
  'You attacked that from the right angle!',
  'That worked beautifully.',
  'The realm grows brighter!',
];
const MISS_LINES = [
  "Not yet — and that's useful data!",
  'Close! This one will sneak back later — be ready.',
  'Every miss is a map of what to learn next.',
  'That one bites. It returns later this lesson — get it then!',
];

export interface LessonStats {
  total: number;
  correct: number;
  bestCombo: number;
  xp: number;
  gems: number;
  minutes: number;
  bossWon?: boolean;
}

export function LessonPlayer({
  plan,
  dueIds,
  boss,
  onExit,
  onFinished,
}: {
  plan: LessonPlan;
  dueIds: Set<string>;
  boss?: BossDef;
  onExit: () => void;
  onFinished: (stats: LessonStats) => void;
}) {
  const { save, dispatch } = useStore();

  if (plan.kind === 'teach' && plan.teachSequence) {
    return (
      <div className={`realm-${plan.realm}`}>
        <TeachPlayer
          plan={plan}
          mascotName={save.mascotName || 'Professor'}
          mascotHat={save.equipped.mascotHat}
          onExit={onExit}
          onFinish={result => {
            dispatch({ type: 'TEACH_DONE', skillId: plan.skillFocus! });
            let correct = 0;
            for (const r of result.itemResults) {
              dispatch({ type: 'ANSWER', item: r.item, correct: r.correct, isReviewDue: false });
              if (r.correct) correct++;
            }
            const xp = 25 + correct * 4;
            const gems = 8;
            const minutes = Math.max(3, Math.round(result.itemResults.length * 0.7));
            dispatch({ type: 'LESSON_DONE', realm: plan.realm, kind: 'teach', xp, gems, minutes });
            onFinished({ total: result.itemResults.length, correct, bestCombo: 0, xp, gems, minutes });
          }}
        />
      </div>
    );
  }

  return <ExerciseLoop plan={plan} dueIds={dueIds} boss={boss} onExit={onExit} onFinished={onFinished} />;
}

function ExerciseLoop({
  plan,
  dueIds,
  boss,
  onExit,
  onFinished,
}: {
  plan: LessonPlan;
  dueIds: Set<string>;
  boss?: BossDef;
  onExit: () => void;
  onFinished: (stats: LessonStats) => void;
}) {
  const { save, dispatch } = useStore();
  const [queue, setQueue] = useState<Item[]>(() => [...plan.items]);
  const [pos, setPos] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [exKey, setExKey] = useState(0);
  const requeued = useRef(new Set<string>());
  const startTime = useRef(Date.now());
  const finishedRef = useRef(false);

  // boss drama
  const totalPlanned = plan.items.length;
  const [bossCharge, setBossCharge] = useState(0);
  const [bossTaunting, setBossTaunting] = useState(false);
  const [bossHitAnim, setBossHitAnim] = useState(0);
  const isBoss = plan.kind === 'boss' && !!boss;

  useEffect(() => {
    if (!isBoss || answered) return;
    const t = setInterval(() => {
      setBossCharge(c => {
        if (c >= 100) {
          setBossTaunting(true);
          setTimeout(() => setBossTaunting(false), 2600);
          return 0;
        }
        return c + 2.2;
      });
    }, 700);
    return () => clearInterval(t);
  }, [isBoss, pos, answered]);

  const item = queue[pos];
  const done = pos >= queue.length;

  useEffect(() => {
    if (done && queue.length > 0 && !finishedRef.current) {
      finishedRef.current = true;
      const minutes = Math.max(1, Math.round((Date.now() - startTime.current) / 60000));
      const bossWon = isBoss ? correctCount / totalPlanned >= 0.7 : undefined;
      let xp = correctCount * 5 + (plan.kind === 'warmup' ? 5 : 12);
      let gems = plan.kind === 'warmup' ? 2 : 5 + Math.floor(bestCombo / 3);
      if (bossWon) {
        xp += 50;
        gems += 20;
        dispatch({ type: 'BOSS_BEATEN', bossId: boss!.id });
        playVictory();
      }
      const kind =
        plan.kind === 'warmup' ? 'warmup'
        : isBoss ? 'boss'
        : plan.kind === 'speed' ? 'speed'
        : plan.kind === 'survey' ? 'survey'
        : 'lesson';
      dispatch({ type: 'LESSON_DONE', realm: plan.realm, kind, xp, gems, minutes });
      onFinished({ total: answeredCount, correct: correctCount, bestCombo, xp, gems, minutes, bossWon });
    }
  }, [done]);

  if (!item || done) return null;

  const isDue = dueIds.has(item.id);
  const progress = (pos / queue.length) * 100;
  const bossHp = isBoss ? Math.max(0, 100 - (correctCount / Math.ceil(totalPlanned * 0.7)) * 100) : 0;

  const isSurvey = plan.kind === 'survey';

  const handleResult = (correct: boolean) => {
    if (answered) return;
    setAnswered(true);
    setLastCorrect(correct);
    setAnsweredCount(c => c + 1);
    if (isSurvey) {
      dispatch({ type: 'PROBE', item, correct });
    } else {
      dispatch({ type: 'ANSWER', item, correct, isReviewDue: isDue });
    }

    if (correct) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setBestCombo(b => Math.max(b, newCombo));
      setCorrectCount(c => c + 1);
      dispatch({ type: 'COMBO', combo: newCombo });
      playCorrect(newCombo);
      setBurstKey(k => k + 1);
      if (isBoss) {
        playBossHit();
        setBossHitAnim(a => a + 1);
      }
    } else {
      setCombo(0);
      playMiss();
      // re-queue the miss 2–4 items later, once (not in surveys/boss fights)
      if (!requeued.current.has(item.id) && plan.kind !== 'boss' && !isSurvey) {
        requeued.current.add(item.id);
        const insertAt = Math.min(queue.length, pos + 2 + Math.floor(Math.random() * 3));
        const newQueue = [...queue];
        newQueue.splice(insertAt, 0, item);
        setQueue(newQueue);
      }
    }
  };

  const next = () => {
    setAnswered(false);
    setShowHint(false);
    setBossCharge(0);
    setPos(pos + 1);
    setExKey(k => k + 1);
    playTap();
    window.scrollTo({ top: 0 });
  };

  const promptParts = item.prompt.split('\n\n');
  const passage = promptParts.length > 1 ? promptParts.slice(0, -1).join('\n\n') : null;
  const question = promptParts[promptParts.length - 1];
  const frenchAudio = item.realm === 'french' && item.type !== 'listening' && /[a-zàâçéèêëîïôûùüÿœ]/i.test(item.prompt) && item.data?.audioText;

  return (
    <div className={`realm-${plan.realm}`}>
      <div className="lesson-top">
        <button className="btn btn-small btn-ghost" onClick={onExit}>✕</button>
        <div className="lesson-bar"><div style={{ width: `${progress}%` }} /></div>
        <div className={`combo-meter ${combo >= 3 ? 'combo-hot' : ''}`}>{combo > 1 ? `🔥${combo}` : ''}</div>
      </div>

      {isBoss && boss && (
        <div className="card card-pop" style={{ padding: '10px 16px' }}>
          <div className="spread">
            <span style={{ fontWeight: 900 }}>{boss.icon} {boss.name}</span>
            <span className="dim small">{Math.ceil(bossHp)}%</span>
          </div>
          <div className="boss-hp"><div style={{ width: `${bossHp}%` }} /></div>
          <div className="boss-charge"><div style={{ width: `${bossCharge}%` }} /></div>
          {bossTaunting && <div className="pop-in" style={{ marginTop: 6, fontStyle: 'italic' }}>💬 "{boss.taunt}"</div>}
        </div>
      )}

      <div className="exercise-stage" key={exKey}>
        <div className="row" style={{ marginBottom: 6, justifyContent: 'space-between' }}>
          <span className="chip">{typeLabel(item.type)}</span>
          <span className="row" style={{ gap: 6 }}>
            {isDue && <span className="chip" title="spaced review">♻️ review</span>}
            {item.difficulty >= 4 && <span className="chip">⭐ legendary</span>}
          </span>
        </div>

        {passage && <div className="prompt-passage">{passage}</div>}
        <div className="prompt-card">
          {question}
          {frenchAudio && hasFrenchVoice() && (
            <button className="tts-btn" style={{ width: 44, height: 44, fontSize: '1.1rem', marginLeft: 10 }}
              onClick={() => speak(item.data!.audioText!, item.data?.lang ?? 'fr-FR')}>
              🔊
            </button>
          )}
        </div>

        <ExerciseBody item={item} onResult={handleResult} locked={answered} />

        {!answered && item.hint && (
          <div style={{ marginTop: 12 }}>
            {showHint ? (
              <div className="hint-box pop-in">💡 {item.hint}</div>
            ) : (
              <button className="btn btn-small btn-ghost" onClick={() => setShowHint(true)}>
                💡 hint?
              </button>
            )}
          </div>
        )}
      </div>

      <MiniBurst trigger={burstKey} />

      {answered && (
        <div className={`feedback-banner ${lastCorrect ? 'good' : 'bad'}`}>
          <div className="spread">
            <div style={{ flex: 1 }}>
              <div className="feedback-title">
                {isSurvey
                  ? lastCorrect
                    ? <>🗺️ Already conquered — marked ✅ on the map!</>
                    : <>🗺️ New territory spotted! Marked for adventure (surveys never cost points).</>
                  : lastCorrect ? <>✓ {pick(PRAISE)}</> : <>✗ {pick(MISS_LINES)}</>}
                {lastCorrect && combo >= 3 && !isSurvey && <span className="chip">🔥 {combo} combo!</span>}
              </div>
              {item.explanation && (
                <div style={{ marginTop: 6, fontSize: '0.97rem' }}>{item.explanation}</div>
              )}
            </div>
            <button className="btn btn-primary btn-big" onClick={next} autoFocus>
              {pos + 1 >= queue.length ? 'Finish' : 'Next →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── Results screen ───────────────────────────

export function ResultsScreen({
  stats,
  plan,
  boss,
  mascotName,
  mascotHat,
  dailyGoalReached,
  windDown,
  onHome,
}: {
  stats: LessonStats;
  plan: LessonPlan;
  boss?: BossDef;
  mascotName: string;
  mascotHat: string;
  dailyGoalReached: boolean;
  windDown: boolean;
  onHome: () => void;
}) {
  const [confetti, setConfetti] = useState(0);
  const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const big = stats.bossWon || pct >= 90;

  useEffect(() => {
    const t = setTimeout(() => {
      setConfetti(1);
      if (big) playFanfare();
      else playCorrect(3);
    }, 250);
    return () => clearTimeout(t);
  }, []);

  const line = stats.bossWon
    ? `"${boss?.defeatLine}" — you CROWNED this topic! 👑`
    : stats.bossWon === false
      ? `${boss?.name} retreats to lick its wounds. No harm done — sharpen up and come back!`
      : pct >= 90
        ? 'Outrageously good. The map is glowing.'
        : pct >= 70
          ? 'Solid work — your strategies are sticking.'
          : 'Tough lesson — those misses are now scheduled to come back until they give up. That\'s how mastery works.';

  return (
    <div className={`realm-${plan.realm}`}>
      <Confetti trigger={confetti} big={big} />
      <div className="results-hero pop-in">
        <Mascot pose={pct >= 70 ? 'proud' : 'happy'} size={130} hat={mascotHat} />
        <h1>{stats.bossWon ? 'VICTORY!' : plan.kind === 'warmup' ? 'Warmed up!' : 'Lesson complete!'}</h1>
        <p style={{ fontSize: '1.05rem' }}>{line}</p>
      </div>
      <div className="stat-row">
        <div className="stat-card pop-in"><div className="v xp-pop">+{stats.xp}</div><div className="dim small">XP</div></div>
        <div className="stat-card pop-in"><div className="v" style={{ color: 'var(--gem)' }}>+{stats.gems}</div><div className="dim small">💎 gems</div></div>
        <div className="stat-card pop-in"><div className="v">{stats.correct}/{stats.total}</div><div className="dim small">correct</div></div>
        {stats.bestCombo >= 3 && (
          <div className="stat-card pop-in"><div className="v">🔥{stats.bestCombo}</div><div className="dim small">best combo</div></div>
        )}
      </div>
      {dailyGoalReached && (
        <div className="card card-pop center" style={{ borderColor: 'var(--accent)' }}>
          🎯 <b>Daily goal complete!</b> Your streak grows — and a chest is waiting on the map…
        </div>
      )}
      {windDown && (
        <div className="card center">
          <Mascot pose="sleepy" size={64} hat={mascotHat} />
          <p>
            <b>{mascotName} stretches and yawns:</b> "Phew, what a session! Brains grow during <i>rest</i>, you know.
            Come back tomorrow — your chest will be extra shiny. ✨"
          </p>
        </div>
      )}
      <div className="center" style={{ marginTop: 18 }}>
        <button className="btn btn-primary btn-big" onClick={onHome}>
          Back to the map 🗺️
        </button>
      </div>
    </div>
  );
}
