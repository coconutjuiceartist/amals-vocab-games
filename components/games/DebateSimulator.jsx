'use client';
import React, { useState, useEffect } from 'react';
import { debateCategories } from '../../data/debates/index';

// How many total debates must be won to unlock the next locked category
const UNLOCK_THRESHOLD = 2;
const MAX_STAGE_SCORE = 5;
const REACTION_DISPLAY_MS = 3500;

const RATING_THRESHOLDS = [
    { min: 25, label: 'Flawless Victory', color: '#fbbf24' },
    { min: 20, label: 'Expert Debater', color: '#10b981' },
    { min: 15, label: 'Skilled Advocate', color: '#3b82f6' },
    { min: 10, label: 'Developing Argument', color: '#f97316' },
    { min: 0, label: 'Keep Practicing', color: '#ef4444' },
];

const STAGE_LABELS = {
    claim: 'Claim',
    evidence: 'Evidence',
    counter: 'Rebuttal',
    pushback: 'Pushback',
    speech: 'Speech',
};

export default function DebateSimulator() {
    const [stage, setStage] = useState('category_select');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentScenario, setCurrentScenario] = useState(null);
    const [completedScenarios, setCompletedScenarios] = useState([]);
    const [bestScores, setBestScores] = useState({});

    const [selectedClaim, setSelectedClaim] = useState(null);
    const [selectedEvidence, setSelectedEvidence] = useState([]);
    const [shuffledEvidence, setShuffledEvidence] = useState([]);
    const [shuffledSpeechOptions, setShuffledSpeechOptions] = useState({});
    const [selectedRebuttal, setSelectedRebuttal] = useState(null);
    const [selectedPushback, setSelectedPushback] = useState(null);
    const [speechBlanks, setSpeechBlanks] = useState({});
    const [feedback, setFeedback] = useState('');
    const [mistakes, setMistakes] = useState({ claim: 0, evidence: 0, counter: 0, pushback: 0, speech: 0 });
    const [opponentReaction, setOpponentReaction] = useState(null);

    // Load from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('debate-completed');
            if (saved) setCompletedScenarios(JSON.parse(saved));
            const savedScores = localStorage.getItem('debate-scores');
            if (savedScores) setBestScores(JSON.parse(savedScores));
        } catch (e) { /* ignore */ }
    }, []);

    // Save completed scenarios
    useEffect(() => {
        if (completedScenarios.length > 0) {
            localStorage.setItem('debate-completed', JSON.stringify(completedScenarios));
        }
    }, [completedScenarios]);

    // Save best scores
    useEffect(() => {
        if (Object.keys(bestScores).length > 0) {
            localStorage.setItem('debate-scores', JSON.stringify(bestScores));
        }
    }, [bestScores]);

    // Calculate score for current debate
    const calculateScore = () => {
        let total = 0;
        for (const key of Object.keys(STAGE_LABELS)) {
            total += Math.max(0, MAX_STAGE_SCORE - mistakes[key]);
        }
        return total;
    };

    const getRating = (score) => {
        return RATING_THRESHOLDS.find(r => score >= r.min);
    };

    // Calculate which categories are unlocked
    const getUnlockedCategories = () => {
        const totalCompleted = completedScenarios.length;
        return debateCategories.map((cat, index) => {
            if (cat.unlocked) return { ...cat, isUnlocked: true };
            const lockedIndex = debateCategories.filter((c, i) => i < index && !c.unlocked).length;
            const neededCompletions = (lockedIndex + 1) * UNLOCK_THRESHOLD;
            return { ...cat, isUnlocked: totalCompleted >= neededCompletions };
        });
    };

    const unlockedCategories = getUnlockedCategories();

    const getNextUnlockInfo = () => {
        const totalCompleted = completedScenarios.length;
        const nextLocked = unlockedCategories.find(c => !c.isUnlocked);
        if (!nextLocked) return null;
        const lockedIndex = debateCategories.filter((c, i) => i < debateCategories.indexOf(nextLocked) && !c.unlocked).length;
        const needed = (lockedIndex + 1) * UNLOCK_THRESHOLD;
        return { category: nextLocked, remaining: needed - totalCompleted };
    };

    const shuffleEvidence = (scenario) => {
        const evidence = [...scenario.evidenceOptions];
        for (let i = evidence.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [evidence[i], evidence[j]] = [evidence[j], evidence[i]];
        }
        return evidence;
    };

    const startScenario = (scenario) => {
        setCurrentScenario(scenario);
        setSelectedClaim(null);
        setSelectedEvidence([]);
        setSelectedRebuttal(null);
        setSelectedPushback(null);
        setSpeechBlanks({});
        setFeedback('');
        setMistakes({ claim: 0, evidence: 0, counter: 0, pushback: 0, speech: 0 });
        setOpponentReaction(null);
        setShuffledEvidence(shuffleEvidence(scenario));
        const speechOpts = {};
        scenario.speechTemplate.blanks.forEach(blank => {
            const opts = [...blank.options];
            for (let i = opts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [opts[i], opts[j]] = [opts[j], opts[i]];
            }
            speechOpts[blank.id] = opts;
        });
        setShuffledSpeechOptions(speechOpts);
        setStage('intro');
    };

    const debateStages = ['intro', 'claim', 'evidence', 'counter', 'pushback', 'speech', 'completion'];

    const goBack = () => {
        setFeedback('');
        setOpponentReaction(null);
        const currentIndex = debateStages.indexOf(stage);
        if (currentIndex > 0) {
            const prevStage = debateStages[currentIndex - 1];
            // Reset mistake count for the stage we're going back to
            if (STAGE_LABELS[prevStage]) {
                setMistakes(prev => ({ ...prev, [prevStage]: 0 }));
            }
            setStage(prevStage);
        } else if (stage === 'intro') {
            setStage('scenario_select');
        }
    };

    const verifyClaim = (claimId) => {
        const claim = currentScenario.claimOptions.find(c => c.id === claimId);
        if (claim.correct) {
            if (selectedClaim !== claimId) {
                setSelectedEvidence([]);
                setSelectedRebuttal(null);
                setSelectedPushback(null);
                setSpeechBlanks({});
            }
            setSelectedClaim(claimId);
            setFeedback('Excellent claim! Let us gather evidence.');
            setTimeout(() => {
                setFeedback('');
                setStage('evidence');
            }, 1500);
        } else {
            setMistakes(prev => ({ ...prev, claim: prev.claim + 1 }));
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
        const selected = currentScenario.evidenceOptions.filter(e => selectedEvidence.includes(e.id));
        const weakPoints = selected.filter(e => e.type === 'weak');
        if (weakPoints.length > 0) {
            setMistakes(prev => ({ ...prev, evidence: prev.evidence + 1 }));
            setFeedback(`❌ Wait! "${weakPoints[0].text}" is a Logical Fallacy. ${weakPoints[0].feedback} Remove it to strengthen your argument!`);
        } else {
            setFeedback('The bridge is strong! All three evidence pillars are completely logical and fact-based.');
            setTimeout(() => {
                setFeedback('');
                setStage('counter');
            }, 2500);
        }
    };

    const verifyRebuttal = (rId) => {
        const rebuttal = currentScenario.counterArgument.rebuttals.find(r => r.id === rId);
        const reactions = currentScenario.counterArgument.reactions;
        if (rebuttal.correct) {
            setSelectedRebuttal(rId);
            if (reactions) {
                setOpponentReaction({ text: reactions.correct, isCorrect: true });
                setTimeout(() => {
                    setOpponentReaction(null);
                    setFeedback('Brilliant Rebuttal! You systematically neutralized their counter-argument.');
                    setTimeout(() => { setFeedback(''); setStage('pushback'); }, 2500);
                }, REACTION_DISPLAY_MS);
            } else {
                setFeedback('Brilliant Rebuttal! You systematically neutralized their counter-argument.');
                setTimeout(() => { setFeedback(''); setStage('pushback'); }, 2500);
            }
        } else {
            setMistakes(prev => ({ ...prev, counter: prev.counter + 1 }));
            if (reactions && mistakes.counter === 0) {
                setOpponentReaction({ text: reactions.wrong, isCorrect: false });
                setTimeout(() => {
                    setOpponentReaction(null);
                    setFeedback(`❌ ${rebuttal.feedback}`);
                }, REACTION_DISPLAY_MS - 500);
            } else {
                setFeedback(`❌ ${rebuttal.feedback}`);
            }
        }
    };

    const verifyPushback = (pId) => {
        const rebuttal = currentScenario.pushback.rebuttals.find(p => p.id === pId);
        const reactions = currentScenario.pushback.reactions;
        if (rebuttal.correct) {
            setSelectedPushback(pId);
            if (reactions) {
                setOpponentReaction({ text: reactions.correct, isCorrect: true });
                setTimeout(() => {
                    setOpponentReaction(null);
                    setFeedback('Perfect pivot! You handled the unexpected pressure like a true diplomat.');
                    setTimeout(() => { setFeedback(''); setStage('speech'); }, 2500);
                }, REACTION_DISPLAY_MS);
            } else {
                setFeedback('Perfect pivot! You handled the unexpected pressure like a true diplomat.');
                setTimeout(() => { setFeedback(''); setStage('speech'); }, 2500);
            }
        } else {
            setMistakes(prev => ({ ...prev, pushback: prev.pushback + 1 }));
            if (reactions && mistakes.pushback === 0) {
                setOpponentReaction({ text: reactions.wrong, isCorrect: false });
                setTimeout(() => {
                    setOpponentReaction(null);
                    setFeedback(`❌ ${rebuttal.feedback}`);
                }, REACTION_DISPLAY_MS - 500);
            } else {
                setFeedback(`❌ ${rebuttal.feedback}`);
            }
        }
    };

    const selectSpeechOption = (blankId, option) => {
        if (!option.strong) {
            setMistakes(prev => ({ ...prev, speech: prev.speech + 1 }));
            setFeedback(`❌ ${option.feedback}`);
            setTimeout(() => setFeedback(''), 3000);
            return;
        }
        setSpeechBlanks({ ...speechBlanks, [blankId]: option.text });
        setFeedback('');
    };

    const deliverSpeech = () => {
        const allBlanksStrong = currentScenario.speechTemplate.blanks.every(blank => speechBlanks[blank.id]);
        if (!allBlanksStrong) return;

        const score = calculateScore();

        // Save completion
        if (!completedScenarios.includes(currentScenario.id)) {
            setCompletedScenarios([...completedScenarios, currentScenario.id]);
        }

        // Save best score
        const prevBest = bestScores[currentScenario.id] || 0;
        if (score > prevBest) {
            setBestScores({ ...bestScores, [currentScenario.id]: score });
        }

        setStage('completion');
    };

    const showBackButton = ['claim', 'evidence', 'counter', 'pushback', 'speech'].includes(stage);

    const getCategoryProgress = (cat) => {
        const completed = cat.scenarios.filter(s => completedScenarios.includes(s.id)).length;
        return { completed, total: cat.scenarios.length };
    };

    const maxScore = MAX_STAGE_SCORE * Object.keys(STAGE_LABELS).length;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* HEADER PROGRESS - only during debate stages */}
            {currentScenario && debateStages.includes(stage) && stage !== 'completion' && (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    {showBackButton ? (
                        <button
                            onClick={goBack}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                minWidth: '36px',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem',
                                transition: 'all 0.2s ease'
                            }}
                            title="Go back"
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                        >
                            ←
                        </button>
                    ) : <div style={{ width: '36px' }} />}
                    <div style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'var(--secondary)', flex: 1, textAlign: 'center' }}>
                        {currentScenario.title}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {debateStages.map((step, i) => {
                            const isActive = debateStages.indexOf(stage) >= i;
                            return (
                                <div key={step} style={{ width: '15px', height: '15px', borderRadius: '50%', background: isActive ? 'var(--secondary)' : 'rgba(255,255,255,0.1)' }} title={step} />
                            );
                        })}
                    </div>
                </div>
            )}

            {/* STAGE: CATEGORY SELECT */}
            {stage === 'category_select' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>The Debate Simulator</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Choose a category and build powerful arguments across {debateCategories.reduce((sum, c) => sum + c.scenarios.length, 0)} debate scenarios.
                        </p>
                        {completedScenarios.length > 0 && (
                            <p style={{ color: 'var(--secondary)', marginTop: '0.5rem' }}>
                                {completedScenarios.length} debate{completedScenarios.length !== 1 ? 's' : ''} won
                            </p>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                        {unlockedCategories.map(cat => {
                            const progress = getCategoryProgress(cat);
                            const isLocked = !cat.isUnlocked;
                            return (
                                <div
                                    key={cat.id}
                                    onClick={() => {
                                        if (isLocked) return;
                                        setSelectedCategory(cat);
                                        setStage('scenario_select');
                                    }}
                                    style={{
                                        padding: '1.5rem',
                                        background: isLocked ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)',
                                        border: `2px solid ${isLocked ? 'rgba(255,255,255,0.05)' : progress.completed === progress.total && progress.total > 0 ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                                        borderRadius: '1rem',
                                        cursor: isLocked ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease',
                                        opacity: isLocked ? 0.5 : 1,
                                        textAlign: 'center'
                                    }}
                                    onMouseEnter={e => { if (!isLocked) e.currentTarget.style.borderColor = 'var(--secondary)'; }}
                                    onMouseLeave={e => { if (!isLocked) e.currentTarget.style.borderColor = progress.completed === progress.total && progress.total > 0 ? '#10b981' : 'rgba(255,255,255,0.1)'; }}
                                >
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                                        {isLocked ? '🔒' : cat.icon}
                                    </div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                        {cat.name}
                                    </div>
                                    {isLocked ? (
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            Win more debates to unlock
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: '0.85rem', color: progress.completed === progress.total && progress.total > 0 ? '#10b981' : 'var(--text-secondary)' }}>
                                            {progress.completed}/{progress.total} completed
                                        </div>
                                    )}
                                    {!isLocked && progress.total > 0 && (
                                        <div style={{ marginTop: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(progress.completed / progress.total) * 100}%`, height: '100%', background: progress.completed === progress.total ? '#10b981' : 'var(--secondary)', borderRadius: '999px', transition: 'width 0.3s ease' }} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {getNextUnlockInfo() && (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Win {getNextUnlockInfo().remaining} more debate{getNextUnlockInfo().remaining !== 1 ? 's' : ''} to unlock <strong>{getNextUnlockInfo().category.name}</strong>
                        </div>
                    )}
                </div>
            )}

            {/* STAGE: SCENARIO SELECT */}
            {stage === 'scenario_select' && selectedCategory && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={() => setStage('category_select')}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                minWidth: '36px',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem'
                            }}
                        >
                            ←
                        </button>
                        <h2 style={{ fontSize: '2rem', color: 'var(--secondary)' }}>
                            {selectedCategory.icon} {selectedCategory.name}
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {selectedCategory.scenarios.map(scenario => {
                            const isCompleted = completedScenarios.includes(scenario.id);
                            const score = bestScores[scenario.id];
                            return (
                                <div
                                    key={scenario.id}
                                    onClick={() => startScenario(scenario)}
                                    style={{
                                        padding: '1.5rem',
                                        background: 'rgba(0,0,0,0.2)',
                                        border: `2px solid ${isCompleted ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                                        borderRadius: '0.75rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--secondary)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = isCompleted ? '#10b981' : 'rgba(255,255,255,0.1)'}
                                >
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.15rem', marginBottom: '0.25rem' }}>{scenario.title}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{scenario.premise}</div>
                                    </div>
                                    {isCompleted && (
                                        <div style={{ marginLeft: '1rem', flexShrink: 0, textAlign: 'center' }}>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: score ? getRating(score).color : '#10b981' }}>
                                                {score ? `${score}/${maxScore}` : '✅'}
                                            </div>
                                            {score && (
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                                    best
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {selectedCategory.scenarios.some(s => !completedScenarios.includes(s.id)) && (
                        <button
                            onClick={() => {
                                const unplayed = selectedCategory.scenarios.filter(s => !completedScenarios.includes(s.id));
                                const random = unplayed[Math.floor(Math.random() * unplayed.length)];
                                startScenario(random);
                            }}
                            className="btn btn-primary"
                            style={{ alignSelf: 'center', fontSize: '1.1rem', padding: '0.75rem 2rem' }}
                        >
                            Random Unplayed
                        </button>
                    )}
                </div>
            )}

            {/* STAGE: INTRO */}
            {stage === 'intro' && currentScenario && (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>The Briefing</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '0.5rem' }}>
                        {currentScenario.premise}
                    </p>
                    {currentScenario.setting && (
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontStyle: 'italic' }}>
                            You will present your case before {currentScenario.setting}.
                        </p>
                    )}
                    <button onClick={() => setStage('claim')} className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 3rem' }}>
                        Construct My Argument
                    </button>
                </div>
            )}

            {/* STAGE: CLAIM */}
            {stage === 'claim' && currentScenario && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 1: The Claim</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The Claim is the "Road" of your bridge. It must be a clear, debatable statement of policy.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {currentScenario.claimOptions.map(option => (
                            <button
                                key={option.id}
                                onClick={() => verifyClaim(option.id)}
                                style={{
                                    padding: '1.5rem',
                                    background: selectedClaim === option.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.2)',
                                    border: `1px solid ${selectedClaim === option.id ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--secondary)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = selectedClaim === option.id ? '#10b981' : 'rgba(255,255,255,0.1)'}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STAGE: EVIDENCE */}
            {stage === 'evidence' && currentScenario && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 2: The Evidence Pillars</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Select EXACTLY 3 facts to support your claim: <em>"{currentScenario.claimOptions.find(c => c.correct).text}"</em>. <br />
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
            {stage === 'counter' && currentScenario && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 3: The Counter-Argument</h2>

                    {currentScenario.counterArgument.opponent && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '1rem', border: '2px solid #ef4444', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '2.5rem', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', flexShrink: 0 }}>
                                {currentScenario.counterArgument.opponent.emoji}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.15rem', color: 'white' }}>{currentScenario.counterArgument.opponent.name}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{currentScenario.counterArgument.opponent.title}</div>
                            </div>
                        </div>
                    )}

                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '1.5rem', marginBottom: '1.5rem', fontSize: '1.25rem', borderRadius: '0 1rem 1rem 0' }}>
                        <span style={{ fontStyle: 'italic' }}>"{currentScenario.counterArgument.text}"</span>
                    </div>

                    {opponentReaction && (
                        <div style={{
                            padding: '1.25rem 1.5rem',
                            background: opponentReaction.isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                            borderLeft: `4px solid ${opponentReaction.isCorrect ? '#10b981' : '#ef4444'}`,
                            borderRadius: '0 0.75rem 0.75rem 0',
                            marginBottom: '1.5rem',
                            fontSize: '1.05rem',
                            lineHeight: 1.7,
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontStyle: 'italic',
                            animation: 'fadeInUp 0.4s ease-out',
                        }}>
                            {opponentReaction.text}
                        </div>
                    )}

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>How do you respond without using an angry Logical Fallacy?</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {currentScenario.counterArgument.rebuttals.map(option => (
                            <button
                                key={option.id}
                                onClick={() => verifyRebuttal(option.id)}
                                disabled={!!opponentReaction}
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    textAlign: 'left',
                                    cursor: opponentReaction ? 'default' : 'pointer',
                                    opacity: opponentReaction ? 0.5 : 1,
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={e => { if (!opponentReaction) e.currentTarget.style.borderColor = 'var(--secondary)'; }}
                                onMouseLeave={e => { if (!opponentReaction) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STAGE: PUSHBACK */}
            {stage === 'pushback' && currentScenario && (
                <div className="glass-panel" style={{ padding: '2rem', border: '2px solid #eab308' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#eab308' }}>Step 4: Council Pushback!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Unexpected pressure from the gallery. Think on your feet!</p>

                    {currentScenario.pushback.opponent && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '1rem', border: '2px solid #eab308', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '2.5rem', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', flexShrink: 0 }}>
                                {currentScenario.pushback.opponent.emoji}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.15rem', color: 'white' }}>{currentScenario.pushback.opponent.name}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{currentScenario.pushback.opponent.title}</div>
                            </div>
                        </div>
                    )}

                    <div style={{ background: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '1.5rem', marginBottom: '1.5rem', fontSize: '1.25rem', borderRadius: '0 1rem 1rem 0' }}>
                        <span style={{ fontStyle: 'italic' }}>"{currentScenario.pushback.text}"</span>
                    </div>

                    {opponentReaction && (
                        <div style={{
                            padding: '1.25rem 1.5rem',
                            background: opponentReaction.isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(234, 179, 8, 0.08)',
                            borderLeft: `4px solid ${opponentReaction.isCorrect ? '#10b981' : '#eab308'}`,
                            borderRadius: '0 0.75rem 0.75rem 0',
                            marginBottom: '1.5rem',
                            fontSize: '1.05rem',
                            lineHeight: 1.7,
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontStyle: 'italic',
                            animation: 'fadeInUp 0.4s ease-out',
                        }}>
                            {opponentReaction.text}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {currentScenario.pushback.rebuttals.map(option => (
                            <button
                                key={option.id}
                                onClick={() => verifyPushback(option.id)}
                                disabled={!!opponentReaction}
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    textAlign: 'left',
                                    cursor: opponentReaction ? 'default' : 'pointer',
                                    opacity: opponentReaction ? 0.5 : 1,
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={e => { if (!opponentReaction) e.currentTarget.style.borderColor = '#eab308'; }}
                                onMouseLeave={e => { if (!opponentReaction) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STAGE: SPEECH SYNTHESIS */}
            {stage === 'speech' && currentScenario && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step 5: The Opening Statement</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Select the strongest words to complete your powerful rhetoric. Choose carefully!
                    </p>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '1rem', fontSize: '1.25rem', lineHeight: 2 }}>
                        <span style={{ fontWeight: 'bold' }}>{currentScenario.speechTemplate.intro}</span>
                        <br /><br />

                        Because of the{' '}
                        {speechBlanks[currentScenario.speechTemplate.blanks[0].id] ? (
                            <span style={{ color: '#10b981', fontWeight: 'bold', borderBottom: '2px solid #10b981', padding: '0 0.25rem' }}>
                                {speechBlanks[currentScenario.speechTemplate.blanks[0].id]}
                            </span>
                        ) : (
                            <span style={{ color: 'var(--secondary)', borderBottom: '2px dashed var(--secondary)', padding: '0 0.25rem' }}>
                                _{currentScenario.speechTemplate.blanks[0].label}_
                            </span>
                        )}
                        , we can no longer ignore the reality of our situation.

                        {' '}If we fail to act, the{' '}
                        {speechBlanks[currentScenario.speechTemplate.blanks[1].id] ? (
                            <span style={{ color: '#10b981', fontWeight: 'bold', borderBottom: '2px solid #10b981', padding: '0 0.25rem' }}>
                                {speechBlanks[currentScenario.speechTemplate.blanks[1].id]}
                            </span>
                        ) : (
                            <span style={{ color: 'var(--secondary)', borderBottom: '2px dashed var(--secondary)', padding: '0 0.25rem' }}>
                                _{currentScenario.speechTemplate.blanks[1].label}_
                            </span>
                        )}
                        {' '}will be lost forever.

                        <br /><br />
                        Therefore, I move that <span style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>{currentScenario.claimOptions.find(c => c.correct).text}</span>
                    </div>

                    {currentScenario.speechTemplate.blanks.map(blank => (
                        <div key={blank.id} style={{ marginTop: '1.5rem' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                {speechBlanks[blank.id] ? '✅' : '📝'} {blank.label}:
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {(shuffledSpeechOptions[blank.id] || blank.options).map((option, i) => {
                                    const isSelected = speechBlanks[blank.id] === option.text;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => selectSpeechOption(blank.id, option)}
                                            style={{
                                                padding: '0.75rem 1.25rem',
                                                background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.2)',
                                                border: `2px solid ${isSelected ? '#10b981' : 'rgba(255,255,255,0.15)'}`,
                                                borderRadius: '999px',
                                                color: 'white',
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = 'var(--secondary)'; }}
                                            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                                        >
                                            {option.text}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <button
                            onClick={deliverSpeech}
                            className="btn btn-primary"
                            disabled={currentScenario.speechTemplate.blanks.some(blank => !speechBlanks[blank.id])}
                            style={{ opacity: currentScenario.speechTemplate.blanks.every(blank => speechBlanks[blank.id]) ? 1 : 0.5 }}
                        >
                            Deliver Speech to the Council
                        </button>
                    </div>
                </div>
            )}

            {/* STAGE: COMPLETION WITH SCORE */}
            {stage === 'completion' && currentScenario && (() => {
                const score = calculateScore();
                const rating = getRating(score);
                return (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>
                            {score === maxScore ? '🏆' : score >= 20 ? '📜' : score >= 15 ? '📋' : '📝'}
                        </div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: rating.color }}>
                            {rating.label}
                        </h2>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: rating.color, marginBottom: '1.5rem' }}>
                            {score}/{maxScore}
                        </div>

                        {/* Per-stage breakdown */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                            {Object.entries(STAGE_LABELS).map(([key, label]) => {
                                const stageScore = Math.max(0, MAX_STAGE_SCORE - mistakes[key]);
                                return (
                                    <div key={key} style={{
                                        background: 'rgba(0,0,0,0.3)',
                                        borderRadius: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        minWidth: '90px',
                                        border: `1px solid ${stageScore === MAX_STAGE_SCORE ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.1)'}`
                                    }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{label}</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: stageScore === MAX_STAGE_SCORE ? '#10b981' : stageScore >= 3 ? '#fbbf24' : '#ef4444' }}>
                                            {stageScore}/{MAX_STAGE_SCORE}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {score < maxScore && (
                            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Try again to improve your score!
                            </p>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => startScenario(currentScenario)}
                                className="btn"
                                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.15rem' }}
                            >
                                Retry Debate
                            </button>
                            <button
                                onClick={() => setStage('scenario_select')}
                                className="btn"
                                style={{ background: '#10b981', color: 'black', fontWeight: 'bold', fontSize: '1.15rem' }}
                            >
                                Choose Next Debate
                            </button>
                            <button
                                onClick={() => setStage('category_select')}
                                className="btn"
                                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.15rem' }}
                            >
                                Back to Categories
                            </button>
                        </div>
                    </div>
                );
            })()}

            {/* GLOBAL FEEDBACK TOAST */}
            {feedback && (
                <div style={{
                    position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
                    background: feedback.includes('❌') ? 'rgba(239, 68, 68, 0.9)' : 'rgba(236, 72, 153, 0.9)',
                    color: 'white', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.1rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 50,
                    maxWidth: '90vw', textAlign: 'center',
                    animation: 'fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                    {feedback}
                </div>
            )}

        </div>
    );
}
