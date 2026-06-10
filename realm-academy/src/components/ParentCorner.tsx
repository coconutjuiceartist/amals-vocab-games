/**
 * Parent Corner — hidden behind #/parent or a long-press on the settings gear.
 * Mastery heatmap, placement report with overrides, streak calendar,
 * minutes/day, toggles, JSON export/import, reset.
 */

import { useMemo, useState } from 'react';
import type { RealmId } from '../engine/types';
import { useStore } from '../engine/store';
import { loadRegistry } from '../engine/loadContent';
import { placementReport } from '../engine/placement';
import { exportSave } from '../engine/persistence';
import { dayKey } from '../engine/scheduler';

export function ParentCorner({ onBack }: { onBack: () => void }) {
  const { save, dispatch } = useStore();
  const registry = loadRegistry();
  const [tab, setTab] = useState<'progress' | 'placement' | 'settings' | 'data'>('progress');
  const [importText, setImportText] = useState('');
  const [importMsg, setImportMsg] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const report = useMemo(() => placementReport(registry, save), [save]);

  const last28 = useMemo(() => {
    const days: { day: string; hit: boolean; minutes: number }[] = [];
    for (let i = 27; i >= 0; i--) {
      const d = dayKey(Date.now() - i * 86400000);
      const log = save.sessionLog.find(e => e.day === d);
      days.push({ day: d, hit: (log?.lessons ?? 0) >= 1, minutes: log?.minutes ?? 0 });
    }
    return days;
  }, [save.sessionLog]);

  const masteredThisWeek = useMemo(() => {
    return Object.values(save.skills).filter(
      s => (s.phase === 'MASTERED' || s.phase === 'CROWNED') && Date.now() - s.lastSeen < 7 * 86400000,
    ).length;
  }, [save.skills]);

  const heatColor = (m: number) =>
    m >= 80 ? 'rgba(74,222,128,0.35)' : m >= 55 ? 'rgba(252,211,77,0.30)' : m >= 25 ? 'rgba(251,146,60,0.25)' : 'rgba(251,113,133,0.18)';

  return (
    <div>
      <div className="row" style={{ marginTop: 8 }}>
        <button className="btn btn-small btn-ghost" onClick={onBack}>← back</button>
        <h2 style={{ margin: 0 }}>👋 Parent Corner</h2>
      </div>
      <div className="row">
        {(['progress', 'placement', 'settings', 'data'] as const).map(t => (
          <button key={t} className={`btn btn-small ${tab === t ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'progress' && (
        <div>
          <div className="stat-row" style={{ justifyContent: 'flex-start' }}>
            <div className="stat-card"><div className="v">🔥 {save.streak.current}</div><div className="dim small">streak (best {save.streak.best})</div></div>
            <div className="stat-card"><div className="v">{masteredThisWeek}</div><div className="dim small">skills mastered this week</div></div>
            <div className="stat-card"><div className="v">{save.today.minutes}m</div><div className="dim small">today</div></div>
          </div>

          <h3>Mastery heatmap</h3>
          {(['math', 'science', 'english', 'french', 'humanities'] as RealmId[]).map(realm => (
            <div key={realm} style={{ marginBottom: 10 }}>
              <div className="dim small" style={{ fontWeight: 800, textTransform: 'uppercase' }}>{realm}</div>
              <div className="heat-grid">
                {registry.realmSkills(realm).map(s => {
                  const st = save.skills[s.id];
                  const m = st?.mastery ?? 0;
                  return (
                    <div key={s.id} className="heat-cell" style={{ background: heatColor(m) }}>
                      {s.icon} {s.name}
                      <div style={{ fontSize: '1.05rem' }}>{m}<span className="dim small">/100 · {st?.phase ?? 'UNSEEN'}</span></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <h3>Last 28 days</h3>
          <div className="cal-grid" style={{ maxWidth: 420 }}>
            {last28.map(d => (
              <div key={d.day} className={`cal-day ${d.hit ? 'hit' : ''}`} title={`${d.day}: ${d.minutes} min`}>
                {parseInt(d.day.slice(-2), 10)}
              </div>
            ))}
          </div>
          <h3>Minutes per day (last 14)</h3>
          {last28.slice(-14).map(d => (
            <div key={d.day} className="row" style={{ gap: 8, margin: '3px 0' }}>
              <span className="dim small" style={{ width: 84 }}>{d.day.slice(5)}</span>
              <div style={{ height: 12, width: `${Math.min(d.minutes, 60) * 1.5}%`, minWidth: d.minutes > 0 ? 8 : 0, background: 'var(--gem)', borderRadius: 6 }} />
              <span className="small">{d.minutes}m</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'placement' && (
        <div>
          <p className="dim small">
            The Map Survey probes maintenance skills over the first 2 days ({save.placement.complete ? 'complete' : 'in progress'}).
            Correct probes seed a skill as known (mastery 80–100, teaching skipped). Override anything below.
          </p>
          <table className="report">
            <thead>
              <tr><th>Skill</th><th>Probes</th><th>State</th><th>Override</th></tr>
            </thead>
            <tbody>
              {report.map(row => (
                <tr key={row.skill.id}>
                  <td>{row.skill.icon} {row.skill.name}</td>
                  <td>{row.probesCorrect}/{row.probesAnswered}</td>
                  <td>
                    {row.seededKnown ? '✅ known' : row.state ? `${row.state.mastery}/100 ${row.state.phase}` : '— unseen'}
                    {row.override && <b> ({row.override} by parent)</b>}
                  </td>
                  <td>
                    <div className="row" style={{ gap: 4 }}>
                      <button className="btn btn-small btn-ghost" onClick={() => dispatch({ type: 'OVERRIDE_SKILL', skillId: row.skill.id, value: 'known' })}>known</button>
                      <button className="btn btn-small btn-ghost" onClick={() => dispatch({ type: 'OVERRIDE_SKILL', skillId: row.skill.id, value: 'unknown' })}>not known</button>
                      {row.override && (
                        <button className="btn btn-small btn-ghost" onClick={() => dispatch({ type: 'OVERRIDE_SKILL', skillId: row.skill.id, value: undefined })}>clear</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'settings' && (
        <div>
          <h3>Subjects</h3>
          {(Object.keys(save.settings.subjects) as RealmId[]).map(r => (
            <label key={r} className="row" style={{ margin: '6px 0', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={save.settings.subjects[r]}
                onChange={e => dispatch({ type: 'SET_SETTINGS', patch: { subjects: { ...save.settings.subjects, [r]: e.target.checked } } })}
              />
              <span style={{ textTransform: 'capitalize' }}>{r}</span>
            </label>
          ))}
          <h3>Daily goal</h3>
          <div className="row">
            {[1, 2, 3, 4].map(n => (
              <button
                key={n}
                className={`btn btn-small ${save.settings.dailyGoalLessons === n ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => dispatch({ type: 'SET_SETTINGS', patch: { dailyGoalLessons: n } })}
              >
                {n} lesson{n > 1 ? 's' : ''}
              </button>
            ))}
          </div>
          <h3>Toggles</h3>
          <label className="row" style={{ margin: '6px 0', cursor: 'pointer' }}>
            <input type="checkbox" checked={save.settings.sound} onChange={e => dispatch({ type: 'SET_SETTINGS', patch: { sound: e.target.checked } })} />
            Sound effects
          </label>
          <label className="row" style={{ margin: '6px 0', cursor: 'pointer' }}>
            <input type="checkbox" checked={save.settings.speaking} onChange={e => dispatch({ type: 'SET_SETTINGS', patch: { speaking: e.target.checked } })} />
            Speaking exercises (microphone, where supported)
          </label>
          <label className="row" style={{ margin: '6px 0', cursor: 'pointer' }}>
            <input type="checkbox" checked={save.settings.reducedMotion} onChange={e => dispatch({ type: 'SET_SETTINGS', patch: { reducedMotion: e.target.checked } })} />
            Reduce motion
          </label>
        </div>
      )}

      {tab === 'data' && (
        <div>
          <h3>Export progress</h3>
          <p className="dim small">Copy this JSON somewhere safe (or email it to yourself) to move devices.</p>
          <textarea className="type-input" style={{ minHeight: 120, fontSize: '0.7rem' }} readOnly value={exportSave(save)} onFocus={e => e.currentTarget.select()} />
          <h3>Import progress</h3>
          <textarea
            className="type-input"
            style={{ minHeight: 90, fontSize: '0.7rem' }}
            placeholder="paste exported JSON here"
            value={importText}
            onChange={e => setImportText(e.target.value)}
          />
          <div className="row">
            <button
              className="btn btn-small btn-primary"
              disabled={importText.trim() === ''}
              onClick={() => {
                dispatch({ type: 'IMPORT', json: importText });
                setImportMsg('Imported (if the JSON was a valid save).');
                setImportText('');
              }}
            >
              Import
            </button>
            <span className="dim small">{importMsg}</span>
          </div>
          <h3 style={{ marginTop: 22 }}>Danger zone</h3>
          {!confirmReset ? (
            <button className="btn btn-small btn-ghost" onClick={() => setConfirmReset(true)}>Reset ALL progress…</button>
          ) : (
            <div className="row">
              <span className="small" style={{ color: 'var(--bad)' }}>Really erase everything? This cannot be undone.</span>
              <button className="btn btn-small" style={{ background: 'var(--bad)', color: '#fff' }} onClick={() => { dispatch({ type: 'RESET' }); setConfirmReset(false); }}>
                Yes, erase
              </button>
              <button className="btn btn-small btn-ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
