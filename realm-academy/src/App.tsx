/**
 * App shell: routing, plan construction, bottom nav, settings,
 * hidden parent route (#/parent or long-press the gear).
 */

import { useEffect, useRef, useState } from 'react';
import type { LessonPlan, RealmId, SkillDef, BossDef, Item } from './engine/types';
import { StoreProvider, useStore } from './engine/store';
import { loadRegistry, loadFlavor } from './engine/loadContent';
import { buildLesson, buildBoss, buildWarmup, dueReviewItems } from './engine/lessonBuilder';
import { nextProbes } from './engine/placement';
import { dailyFlavor } from './engine/novelty';
import { dueCards, dayKey } from './engine/scheduler';
import { initSpeech } from './engine/speech';
import { FirstRun } from './components/FirstRun';
import { Home } from './components/Home';
import { RealmView } from './components/RealmView';
import { LessonPlayer, ResultsScreen, type LessonStats } from './components/LessonPlayer';
import { Museum } from './components/Museum';
import { Shop } from './components/Shop';
import { ParentCorner } from './components/ParentCorner';
import { Mascot } from './components/Mascot';
import { hashString, pick, seededRng } from './engine/rng';

type Route =
  | { view: 'home' }
  | { view: 'realm'; realm: RealmId }
  | { view: 'lesson'; plan: LessonPlan; boss?: BossDef }
  | { view: 'results'; stats: LessonStats; plan: LessonPlan; boss?: BossDef }
  | { view: 'museum' }
  | { view: 'shop' }
  | { view: 'parent' }
  | { view: 'fact'; skillId: string; from: RealmId };

function AppInner() {
  const { save, dispatch } = useStore();
  const registry = loadRegistry();
  const flavorContent = loadFlavor();
  const [route, setRoute] = useState<Route>({ view: 'home' });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const longPress = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    initSpeech();
    if (window.location.hash === '#/parent') setRoute({ view: 'parent' });
    const onHash = () => {
      if (window.location.hash === '#/parent') setRoute({ view: 'parent' });
    };
    window.addEventListener('hashchange', onHash);
    // day rollover while the app is open
    const dayTick = setInterval(() => {
      if (dayKey() !== save.today.day) dispatch({ type: 'TICK_DAY' });
    }, 30000);
    return () => {
      window.removeEventListener('hashchange', onHash);
      clearInterval(dayTick);
    };
  }, [save.today.day]);

  if (!save.onboarded) {
    return (
      <FirstRun
        onDone={(mascotName, avatarId) => {
          dispatch({ type: 'ONBOARD', mascotName, avatarId });
          dispatch({ type: 'TICK_DAY' });
        }}
      />
    );
  }

  const dueIds = new Set(dueCards(save.cards));

  const startSkill = (skill: SkillDef) => {
    const plan = buildLesson(registry, save, skill.id);
    if (plan.kind !== 'teach' && plan.items.length === 0) return; // no servable items yet
    setRoute({ view: 'lesson', plan });
    window.scrollTo({ top: 0 });
  };

  const startBoss = (boss: BossDef) => {
    const plan = buildBoss(registry, save, boss.id);
    if (plan) setRoute({ view: 'lesson', plan, boss });
  };

  const startWarmup = () => {
    const plan = buildWarmup(registry, save);
    if (plan) setRoute({ view: 'lesson', plan });
  };

  const startSurvey = () => {
    const probes = nextProbes(registry, save);
    if (probes.length === 0) return;
    const plan: LessonPlan = {
      kind: 'survey',
      realm: 'math',
      items: probes,
      title: 'Map Survey',
    };
    setRoute({ view: 'lesson', plan });
  };

  const startMiniGame = () => {
    // mini-game of the day: a themed speed round drawn from content speed_round items
    const flavor = dailyFlavor();
    const speedItems = registry.items.filter(i => {
      if (i.type !== 'speed_round' || i.teachSequenceId) return false;
      // fluency rounds only on owned material: maintenance pools or taught skills
      if (i.tier === 'maintenance') return true;
      const st = save.skills[i.skill];
      return !!st && (st.teachDone || st.override === 'known');
    });
    if (speedItems.length === 0) return;
    const rng = seededRng(hashString('mini' + dayKey()));
    const item: Item = { ...pick(speedItems, rng) };
    const plan: LessonPlan = {
      kind: 'speed',
      realm: item.realm,
      items: [item],
      title: `${flavor.miniGame.icon} ${flavor.miniGame.name}`,
    };
    setRoute({ view: 'lesson', plan });
  };

  const goalReached = save.today.lessons >= save.settings.dailyGoalLessons;
  const windDown = save.today.minutes >= 25;

  const themeClass = `theme-${save.equipped.theme} ${save.settings.reducedMotion ? 'reduced-motion' : ''}`;

  return (
    <div className={themeClass}>
      {route.view === 'home' && (
        <Home onOpenRealm={realm => setRoute({ view: 'realm', realm })} onWarmup={startWarmup} onSurvey={startSurvey} onMiniGame={startMiniGame} />
      )}

      {route.view === 'realm' && (
        <RealmView
          realm={route.realm}
          onBack={() => setRoute({ view: 'home' })}
          onStartSkill={startSkill}
          onStartBoss={startBoss}
          onShowFact={skillId => setRoute({ view: 'fact', skillId, from: route.realm })}
        />
      )}

      {route.view === 'lesson' && (
        <LessonPlayer
          plan={route.plan}
          dueIds={dueIds}
          boss={route.boss}
          onExit={() => setRoute({ view: 'home' })}
          onFinished={stats => setRoute({ view: 'results', stats, plan: route.plan, boss: route.boss })}
        />
      )}

      {route.view === 'results' && (
        <ResultsScreen
          stats={route.stats}
          plan={route.plan}
          boss={route.boss}
          mascotName={save.mascotName}
          mascotHat={save.equipped.mascotHat}
          dailyGoalReached={goalReached}
          windDown={windDown}
          onHome={() => setRoute({ view: 'home' })}
        />
      )}

      {route.view === 'museum' && <Museum onBack={() => setRoute({ view: 'home' })} />}
      {route.view === 'shop' && <Shop onBack={() => setRoute({ view: 'home' })} />}
      {route.view === 'parent' && (
        <ParentCorner
          onBack={() => {
            window.location.hash = '';
            setRoute({ view: 'home' });
          }}
        />
      )}

      {route.view === 'fact' && (
        <FactReveal skillId={route.skillId} onBack={() => setRoute({ view: 'realm', realm: route.from })} />
      )}

      {/* bottom nav (hidden during lessons to keep problem screens calm) */}
      {route.view !== 'lesson' && route.view !== 'results' && (
        <nav className="bottom-nav">
          <button className={route.view === 'home' ? 'active' : ''} onClick={() => setRoute({ view: 'home' })}>
            🗺️<span>Map</span>
          </button>
          <button className={route.view === 'museum' ? 'active' : ''} onClick={() => setRoute({ view: 'museum' })}>
            🏛️<span>Museum</span>
          </button>
          <button className={route.view === 'shop' ? 'active' : ''} onClick={() => setRoute({ view: 'shop' })}>
            🛍️<span>Shop</span>
          </button>
          <button
            onMouseDown={() => {
              longPress.current = setTimeout(() => setRoute({ view: 'parent' }), 650);
            }}
            onMouseUp={() => {
              if (longPress.current) {
                clearTimeout(longPress.current);
                setSettingsOpen(true);
              }
            }}
            onTouchStart={() => {
              longPress.current = setTimeout(() => setRoute({ view: 'parent' }), 650);
            }}
            onTouchEnd={e => {
              e.preventDefault();
              if (longPress.current) {
                clearTimeout(longPress.current);
                setSettingsOpen(true);
              }
            }}
          >
            ⚙️<span>Settings</span>
          </button>
        </nav>
      )}

      {settingsOpen && (
        <div className="modal-veil" onClick={() => setSettingsOpen(false)}>
          <div className="modal-box pop-in" onClick={e => e.stopPropagation()}>
            <h2>⚙️ Settings</h2>
            <label className="row" style={{ margin: '8px 0', cursor: 'pointer' }}>
              <input type="checkbox" checked={save.settings.sound} onChange={e => dispatch({ type: 'SET_SETTINGS', patch: { sound: e.target.checked } })} />
              Sounds {save.settings.sound ? '🔔' : '🔕'}
            </label>
            <label className="row" style={{ margin: '8px 0', cursor: 'pointer' }}>
              <input type="checkbox" checked={save.settings.reducedMotion} onChange={e => dispatch({ type: 'SET_SETTINGS', patch: { reducedMotion: e.target.checked } })} />
              Calm mode (less animation)
            </label>
            <p className="dim small">Grown-ups: long-press this gear (or visit #/parent) for the Parent Corner.</p>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setSettingsOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FactReveal({ skillId, onBack }: { skillId: string; onBack: () => void }) {
  const flavor = loadFlavor();
  const fact = flavor.facts.find(f => f.skill === skillId);
  if (!fact) return null;
  return (
    <div className="modal-veil" onClick={onBack}>
      <div className="modal-box center pop-in" onClick={e => e.stopPropagation()}>
        <Mascot pose="surprised" size={84} />
        <div style={{ fontSize: '2.6rem' }}>{fact.emoji}</div>
        <h2>{fact.title}</h2>
        <p style={{ fontSize: '1.05rem' }}>{fact.text}</p>
        <button className="btn btn-primary" onClick={onBack}>
          Into the museum it goes 🏛️
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  );
}
