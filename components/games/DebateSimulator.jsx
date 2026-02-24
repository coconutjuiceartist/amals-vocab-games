'use client';
import React, { useState, useEffect } from 'react';
import { debateScenarios } from '../../data/debates';

export default function DebateSimulator() {
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [stage, setStage] = useState('intro'); // intro, claim, evidence, counter, pushback, speech, completion

    const [selectedClaim, setSelectedClaim] = useState(null);
    const [selectedEvidence, setSelectedEvidence] = useState([]);
    const [shuffledEvidence, setShuffledEvidence] = useState([]);
    const [selectedRebuttal, setSelectedRebuttal] = useState(null);
    const [selectedPushback, setSelectedPushback] = useState(null);
    const [speechBlanks, setSpeechBlanks] = useState({});
    const [feedback, setFeedback] = useState('');

    const scenario = debateScenarios[scenarioIndex];

    // Initialize shuffled evidence when scenario changes
    useEffect(() => {
        resetScenario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scenarioIndex]);

    // Restarts the entire game
    const resetGame = () => {
        setScenarioIndex(0);
        // resetScenario is called by useEffect
    };

    const resetScenario = () => {
        setStage('intro');
        setSelectedClaim(null);
        setSelectedEvidence([]);
        setSelectedRebuttal(null);
        setSelectedPushback(null);
        setSpeechBlanks({});
        setFeedback('');

        // Randomize evidence so correct answers aren't always at the top
        const currentEvidence = [...debateScenarios[scenarioIndex].evidenceOptions];
        // Fisher-Yates shuffle
        for (let i = currentEvidence.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentEvidence[i], currentEvidence[j]] = [currentEvidence[j], currentEvidence[i]];
        }
        setShuffledEvidence(currentEvidence);
    };

    const nextScenario = () => {
        if (scenarioIndex < debateScenarios.length - 1) {
            setScenarioIndex(scenarioIndex + 1);
            // resetScenario is called by useEffect
        } else {
            setStage('game_complete');
        }
    };

    const verifyClaim = (claimId) => {
        const claim = scenario.claimOptions.find(c => c.id === claimId);
        if (claim.correct) {
            setSelectedClaim(claimId);
            setFeedback('Excellent claim! Let us gather evidence.');
            setTimeout(() => {
                setFeedback('');
                setStage('evidence');
            }, 1500);
        } else {
            setFeedback(`❌ ${claim.feedback}`);
        }
    };

    const toggleEvidence = (evId) => {
        if (selectedEvidence.includes(evId)) {
            setSelectedEvidence(selectedEvidence.filter(id => id !== evId));
        } else {
            if (selectedEvidence.length < 3) {
                setSelectedEvidence([...selectedEvidence, evId]);
            } else {
                setFeedback('You can only select 3 pillars of evidence!');
                setTimeout(() => setFeedback(''), 1500);
            }
        }
    };

    const verifyEvidence = () => {
        if (selectedEvidence.length !== 3) {
            setFeedback('You must select exactly 3 pieces of evidence to support the bridge.');
            return;
        }

        const selected = scenario.evidenceOptions.filter(e => selectedEvidence.includes(e.id));
        const weakPoints = selected.filter(e => e.type === 'weak');

        if (weakPoints.length > 0) {
            setFeedback(`❌ Wait! "${weakPoints[0].text}" is a Logical Fallacy. ${weakPoints[0].feedback} Remove it to strengthen your argument!`);
        } else {
            setFeedback('🏛️ The bridge is strong! All three evidence pillars are completely logical and fact-based.');
            setTimeout(() => {
                setFeedback('');
                setStage('counter');
            }, 2500);
        }
    };

    const verifyRebuttal = (rId) => {
        const rebuttal = scenario.counterArgument.rebuttals.find(r => r.id === rId);
        if (rebuttal.correct) {
            setSelectedRebuttal(rId);
            setFeedback('🔥 Brilliant Rebuttal! You systematically neutralized their counter-argument.');
            setTimeout(() => {
                setFeedback('');
                setStage('pushback'); // Now moving to pushback stage instead of speech
            }, 2500);
        } else {
            setFeedback(`❌ ${rebuttal.feedback}`);
        }
    };

    const verifyPushback = (pId) => {
        const rebuttal = scenario.pushback.rebuttals.find(p => p.id === pId);
        if (rebuttal.correct) {
            setSelectedPushback(pId);
            setFeedback('🛡️ Perfect pivot! You handled the unexpected council pressure like a true diplomat.');
            setTimeout(() => {
                setFeedback('');
                setStage('speech');
            }, 2500);
        } else {
            setFeedback(`❌ ${rebuttal.feedback}`);
        }
    };

    const stagesList = ['intro', 'claim', 'evidence', 'counter', 'pushback', 'speech', 'completion'];

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* HEADER PROGRESS */}
            {stage !== 'game_complete' && (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
                        Simulation {scenarioIndex + 1} of {debateScenarios.length}: {scenario.title}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {stagesList.map((step, i) => {
                            const isActive = stagesList.indexOf(stage) >= i;
                            return (
                                <div key={step} style={{ width: '15px', height: '15px', borderRadius: '50%', background: isActive ? 'var(--secondary)' : 'rgba(255,255,255,0.1)' }} title={step} />
                            );
                        })}
                    </div>
                </div>
            )}

            {/* STAGE: INTRO */}
            {stage === 'intro' && (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>The Briefing</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                        {scenario.premise}
                    </p>
                    <button onClick={() => setStage('claim')} className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 3rem' }}>
                        Construct My Argument
                    </button>
                </div>
            )}

            {/* STAGE: CLAIM */}
            {stage === 'claim' && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 1: The Claim</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The Claim is the "Road" of your bridge. It must be a clear, debatable statement of policy.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {scenario.claimOptions.map(option => (
                            <button
                                key={option.id}
                                onClick={() => verifyClaim(option.id)}
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--secondary)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STAGE: EVIDENCE */}
            {stage === 'evidence' && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 2: The Evidence Pillars</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Select EXACTLY 3 facts to support your claim: <em>"{scenario.claimOptions.find(c => c.correct).text}"</em>. <br />
                        Beware of nuanced half-truths and Logical Fallacies (rumors, attacks, or lazy logic)!
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                        {shuffledEvidence.map(option => (
                            <div
                                key={option.id}
                                onClick={() => toggleEvidence(option.id)}
                                style={{
                                    padding: '1.5rem',
                                    background: selectedEvidence.includes(option.id) ? 'rgba(236, 72, 153, 0.2)' : 'rgba(0,0,0,0.2)',
                                    border: `2px solid ${selectedEvidence.includes(option.id) ? 'var(--secondary)' : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {option.text}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            onClick={verifyEvidence}
                            className="btn btn-primary"
                            disabled={selectedEvidence.length !== 3}
                            style={{ opacity: selectedEvidence.length === 3 ? 1 : 0.5 }}
                        >
                            Test Bridge Strength
                        </button>
                    </div>
                </div>
            )}

            {/* STAGE: COUNTER ARGUMENT */}
            {stage === 'counter' && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 3: The Counter-Argument</h2>
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '1.5rem', marginBottom: '2rem', fontSize: '1.25rem', fontStyle: 'italic' }}>
                        "{scenario.counterArgument.text}"
                    </div>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>How do you respond without using an angry Logical Fallacy?</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {scenario.counterArgument.rebuttals.map(option => (
                            <button
                                key={option.id}
                                onClick={() => verifyRebuttal(option.id)}
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--secondary)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STAGE: PUSHBACK (NEW) */}
            {stage === 'pushback' && (
                <div className="glass-panel" style={{ padding: '2rem', border: '2px solid #eab308' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#eab308' }}>Step 4: Council Pushback!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Unexpected pressure from the gallery. Think on your feet!</p>

                    <div style={{ background: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '1.5rem', marginBottom: '2rem', fontSize: '1.25rem', fontStyle: 'italic' }}>
                        "{scenario.pushback.text}"
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {scenario.pushback.rebuttals.map(option => (
                            <button
                                key={option.id}
                                onClick={() => verifyPushback(option.id)}
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#eab308'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STAGE: SPEECH SYNTHESIS */}
            {stage === 'speech' && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 5: The Opening Statement</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Fill in the blanks to complete your powerful rhetoric. Think about your vocabulary!
                    </p>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '1rem', fontSize: '1.25rem', lineHeight: 2 }}>
                        <span style={{ fontWeight: 'bold' }}>{scenario.speechTemplate.intro}</span>
                        <br /><br />
                        Because of the <input
                            style={{ background: 'transparent', border: 'none', borderBottom: '2px solid var(--secondary)', color: 'white', fontSize: '1.25rem', outline: 'none', width: '200px', textAlign: 'center' }}
                            placeholder={`(${scenario.speechTemplate.blanks[0].label})`}
                            value={speechBlanks[scenario.speechTemplate.blanks[0].id] || ''}
                            onChange={e => setSpeechBlanks({ ...speechBlanks, [scenario.speechTemplate.blanks[0].id]: e.target.value })}
                        /> , we can no longer ignore the reality of our situation.
                        If we fail to act, the <input
                            style={{ background: 'transparent', border: 'none', borderBottom: '2px solid var(--secondary)', color: 'white', fontSize: '1.25rem', outline: 'none', width: '250px', textAlign: 'center' }}
                            placeholder={`(${scenario.speechTemplate.blanks[1].label})`}
                            value={speechBlanks[scenario.speechTemplate.blanks[1].id] || ''}
                            onChange={e => setSpeechBlanks({ ...speechBlanks, [scenario.speechTemplate.blanks[1].id]: e.target.value })}
                        /> will be lost forever. <br /><br />
                        Therefore, I move that <span style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>{scenario.claimOptions.find(c => c.correct).text}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <button
                            onClick={() => setStage('completion')}
                            className="btn btn-primary"
                            disabled={Object.keys(speechBlanks).length < 2}
                        >
                            Deliver Speech to the Council
                        </button>
                    </div>
                </div>
            )}

            {/* STAGE: COMPLETION */}
            {stage === 'completion' && (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📜</div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#10b981' }}>Debate Won!</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        The council was swayed by your flawless logic and brilliant rhetorical synthesis.
                    </p>
                    <button onClick={nextScenario} className="btn" style={{ background: '#10b981', color: 'black', fontWeight: 'bold', fontSize: '1.25rem' }}>
                        Proceed to Next Debate Scenario
                    </button>
                </div>
            )}

            {/* GAME ENTIRELY COMPLETE */}
            {stage === 'game_complete' && (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🏆</div>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Master Debater!</h2>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                        You have successfully completed all advanced debate modules.
                    </p>
                    <button onClick={resetGame} className="btn btn-primary" style={{ fontSize: '1.25rem' }}>
                        Play Again
                    </button>
                </div>
            )}

            {/* GLOBAL FEEDBACK TOAST */}
            {feedback && (
                <div style={{
                    position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
                    background: feedback.includes('❌') ? 'rgba(239, 68, 68, 0.9)' : 'rgba(236, 72, 153, 0.9)',
                    color: 'white', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.1rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 50,
                    animation: 'fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                    {feedback}
                </div>
            )}

        </div>
    );
}
