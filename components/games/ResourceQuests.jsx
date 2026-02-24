'use client';
import React, { useState, useEffect } from 'react';
import { resourceQuests } from '../../data/resourceQuests';
import PixelScene from '../pixelart/PixelScene';
import { sceneConfigs } from '../pixelart/sceneConfigs';

export default function ResourceQuests() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [questIndex, setQuestIndex] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);
    const [inventory, setInventory] = useState({ wood: 0, stone: 0, iron: 0, diamond: 0 });
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState('');
    const [stage, setStage] = useState('intro'); // intro, mining, crafting, complete, all_done
    const [completedQuests, setCompletedQuests] = useState([]);
    const [trackerOpen, setTrackerOpen] = useState(true);

    // Load state from local storage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('stevesResourceQuestsState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.questIndex !== undefined) {
                    setQuestIndex(parsed.questIndex);
                    setStepIndex(parsed.stepIndex || 0);
                    setInventory(parsed.inventory || { wood: 0, stone: 0, iron: 0, diamond: 0 });
                    setStage(parsed.stage || 'intro');
                    setCompletedQuests(parsed.completedQuests || []);
                }
            } catch (e) {
                console.error("Could not load state", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save state to local storage whenever critical state changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('stevesResourceQuestsState', JSON.stringify({
                questIndex, stepIndex, inventory, stage, completedQuests
            }));
        }
    }, [questIndex, stepIndex, inventory, stage, completedQuests, isLoaded]);

    const quest = resourceQuests[questIndex];
    const currentStep = quest ? quest.steps[stepIndex] : null;

    const renderInventoryIcon = (type) => {
        // Check for quest-specific inventory labels first
        if (quest && quest.inventoryLabels && quest.inventoryLabels[type]) {
            return quest.inventoryLabels[type];
        }
        switch (type) {
            case 'wood': return { icon: '🪵', label: 'Wood' };
            case 'stone': return { icon: '🪨', label: 'Stone' };
            case 'iron': return { icon: '⛓️', label: 'Iron' };
            case 'diamond': return { icon: '💎', label: 'Gems' };
            default: return { icon: '📦', label: 'Stuff' };
        }
    };

    const renderVisual = (visual) => {
        if (!visual || !visual.sceneId) return null;
        const config = sceneConfigs[visual.sceneId];
        if (!config) return null;
        return (
            <div style={{
                marginBottom: '1.5rem',
                borderRadius: '1rem',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
            }}>
                <PixelScene config={config} />
            </div>
        );
    };

    const verifyMath = () => {
        const input = parseInt(inputValue);
        if (input === currentStep.math.answer) {
            // Award items
            setInventory(prev => ({
                ...prev,
                [currentStep.reward.item]: prev[currentStep.reward.item] + currentStep.reward.amount
            }));
            setFeedback('⛏️ Yes! You got it! Added to your backpack!');
            setInputValue('');

            setTimeout(() => {
                setFeedback('');
                if (stepIndex < quest.steps.length - 1) {
                    setStepIndex(stepIndex + 1);
                } else {
                    setStage('crafting');
                }
            }, 1000);
        } else {
            setFeedback('Hmm, not quite! Try again! 🤔');
        }
    };

    const verifyCrafting = () => {
        const input = parseInt(inputValue);
        if (input === quest.crafting.finalMath.answer) {
            setFeedback('✨ You made it! Great job! 🎉');
            setInputValue('');
            setTimeout(() => {
                setFeedback('');
                setStage('complete');
            }, 1500);
        } else {
            setFeedback("Not quite! Look at your stuff and count again! 🔢");
        }
    };

    const nextQuest = () => {
        const updatedCompleted = [...completedQuests, quest.id];
        setCompletedQuests(updatedCompleted);
        if (questIndex < resourceQuests.length - 1) {
            setQuestIndex(questIndex + 1);
            setStepIndex(0);
            setInventory({ wood: 0, stone: 0, iron: 0, diamond: 0 });
            setStage('intro');
        } else {
            setStage('all_done');
        }
    };

    // User requested back button to remind themselves of previous context
    const handleBackClick = () => {
        if (stage === 'mining' && stepIndex > 0) {
            const prevStep = quest.steps[stepIndex - 1];
            // Reverse inventory for previous step so they can answer it again or just go back
            setInventory(prev => ({
                ...prev,
                [prevStep.reward.item]: prev[prevStep.reward.item] - prevStep.reward.amount
            }));
            setStepIndex(stepIndex - 1);
        } else if (stage === 'crafting') {
            const prevStep = quest.steps[quest.steps.length - 1];
            setInventory(prev => ({
                ...prev,
                [prevStep.reward.item]: prev[prevStep.reward.item] - prevStep.reward.amount
            }));
            setStage('mining');
            setStepIndex(quest.steps.length - 1);
        }
    };

    const resetEntireGame = () => {
        setQuestIndex(0);
        setStepIndex(0);
        setInventory({ wood: 0, stone: 0, iron: 0, diamond: 0 });
        setStage('intro');
        setCompletedQuests([]);
        localStorage.removeItem('stevesResourceQuestsState');
    };

    if (!isLoaded) return null; // Prevents hydration mismatch

    const completedCount = stage === 'all_done' ? resourceQuests.length : questIndex;
    const progressPercent = Math.round((completedCount / resourceQuests.length) * 100);

    if (stage === 'all_done') {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Quest tracker even on final screen */}
                <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                            All {resourceQuests.length} Quests Done!
                        </span>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #22c55e, #4ade80)', borderRadius: '4px' }} />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: 'bold' }}>100%</span>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>👑</div>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#4ade80' }}>You Did It!</h2>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>You finished all the quests! Great job! 🎉</p>
                    <button onClick={resetEntireGame} className="btn" style={{ marginTop: '2rem', background: '#3b82f6', color: 'white', fontSize: '1.25rem' }}>
                        Play Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

            {/* SIDEBAR: INVENTORY */}
            <div className="glass-panel" style={{ width: '250px', padding: '1.5rem', flexShrink: 0, position: 'sticky', top: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4ade80', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    🎒 My Stuff
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {Object.entries(inventory).map(([item, amount]) => {
                        const { icon, label } = renderInventoryIcon(item);
                        return (
                            <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '0.5rem', transition: 'all 0.3s ease' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{label}</span>
                                </div>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>x {amount}</span>
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', border: '1px dashed #3b82f6' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>🎯 What To Make</div>
                    <div style={{ fontWeight: 'bold', color: '#60a5fa' }}>{quest.goal}</div>
                </div>

                <button onClick={resetEntireGame} style={{ marginTop: '2rem', width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-secondary)', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    Start Over
                </button>
            </div>

            {/* MAIN GAME AREA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* QUEST TRACKER */}
                <div className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: trackerOpen ? '1rem' : 0 }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                            Quest {questIndex + 1} of {resourceQuests.length}
                        </span>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${progressPercent}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                                borderRadius: '4px',
                                transition: 'width 0.5s ease'
                            }} />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: 'bold' }}>{progressPercent}%</span>
                        <button
                            onClick={() => setTrackerOpen(!trackerOpen)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem', padding: '0.25rem' }}
                        >
                            {trackerOpen ? '▲' : '▼'}
                        </button>
                    </div>

                    {trackerOpen && (
                        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                            {resourceQuests.map((q, idx) => {
                                const isCompleted = idx < questIndex;
                                const isCurrent = idx === questIndex;
                                const isLocked = idx > questIndex;
                                return (
                                    <div key={q.id} title={isLocked ? '🔒' : q.title} style={{
                                        minWidth: '40px', height: '40px',
                                        borderRadius: '0.5rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: isCompleted ? '1.1rem' : '0.8rem',
                                        fontWeight: 'bold',
                                        background: isCompleted ? 'rgba(34,197,94,0.2)'
                                            : isCurrent ? 'rgba(59,130,246,0.3)'
                                            : 'rgba(255,255,255,0.05)',
                                        border: isCurrent ? '2px solid #3b82f6'
                                            : isCompleted ? '2px solid #22c55e'
                                            : '1px solid rgba(255,255,255,0.1)',
                                        color: isCompleted ? '#4ade80'
                                            : isCurrent ? '#60a5fa'
                                            : 'rgba(255,255,255,0.3)',
                                        transition: 'all 0.3s ease',
                                        flexShrink: 0
                                    }}>
                                        {isCompleted ? '✅' : isCurrent ? idx + 1 : '🔒'}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {stage === 'intro' && (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4ade80' }}>Quest {questIndex + 1}: {quest.title}</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            You need to collect stuff to: <strong>{quest.goal}</strong>.<br /><br />
                            Read each part and do the math to fill up your backpack! 🎒
                        </p>
                        <button onClick={() => setStage('mining')} className="btn" style={{ background: '#22c55e', color: 'black', fontSize: '1.25rem' }}>
                            Let's Go! ⛏️
                        </button>
                    </div>
                )}

                {(stage === 'mining' || stage === 'crafting') && (
                    <div className="glass-panel" style={{ padding: '3rem' }}>

                        {/* HEADER & BACK BUTTON */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ fontSize: '0.85rem', color: stage === 'crafting' ? '#eab308' : '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {stage === 'mining' ? `⛏️ Step ${stepIndex + 1} of ${quest.steps.length}` : '⭐ Last Step: Make It!'}
                            </div>

                            {/* BACK BUTTON TO RESTORE CONTEXT */}
                            {(stepIndex > 0 || stage === 'crafting') && (
                                <button
                                    onClick={handleBackClick}
                                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <span>←</span> Go Back
                                </button>
                            )}
                        </div>

                        {/* PREVIOUS CONTEXT LOG (Read Only) */}
                        {stage === 'mining' && stepIndex > 0 && (
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>What you did before:</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {quest.steps.slice(0, stepIndex).map((s, idx) => (
                                        <div key={idx} style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)', borderLeft: '3px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ color: '#4ade80', marginRight: '0.25rem' }}>✅</span>
                                            {s.visual?.sceneId && sceneConfigs[s.visual.sceneId]?.label && (
                                                <span style={{ fontSize: '0.8rem', color: '#60a5fa', marginRight: '0.25rem' }}>
                                                    [{sceneConfigs[s.visual.sceneId].label}]
                                                </span>
                                            )}
                                            {s.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CURRENT ACTIVE STEP */}
                        {stage === 'mining' && currentStep && (
                            <>
                                {renderVisual(currentStep.visual)}

                                <div style={{ fontSize: '1.5rem', lineHeight: '1.6', marginBottom: '2.5rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '1rem', borderLeft: '4px solid #4ade80' }}>
                                    {currentStep.text}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <input
                                        type="number"
                                        value={inputValue}
                                        onChange={e => setInputValue(e.target.value)}
                                        placeholder="?"
                                        style={{ width: '150px', height: '80px', fontSize: '2.5rem', textAlign: 'center', background: 'var(--surface)', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem', color: 'white' }}
                                        onKeyDown={e => e.key === 'Enter' && verifyMath()}
                                    />
                                    <button onClick={verifyMath} className="btn" style={{ height: '80px', background: '#3b82f6', color: 'white', fontSize: '1.25rem', padding: '0 2rem' }}>
                                        Get It! ⛏️
                                    </button>
                                </div>
                            </>
                        )}

                        {stage === 'crafting' && (
                            <>
                                {renderVisual(quest.crafting.visual)}

                                <div style={{ fontSize: '1.5rem', lineHeight: '1.6', marginBottom: '2.5rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '1rem', borderLeft: '4px solid #eab308' }}>
                                    {quest.crafting.question}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <input
                                        type="number"
                                        value={inputValue}
                                        onChange={e => setInputValue(e.target.value)}
                                        placeholder="?"
                                        style={{ width: '150px', height: '80px', fontSize: '2.5rem', textAlign: 'center', background: 'var(--surface)', border: '2px dotted #eab308', borderRadius: '0.5rem', color: 'white' }}
                                        onKeyDown={e => e.key === 'Enter' && verifyCrafting()}
                                    />
                                    <button onClick={verifyCrafting} className="btn" style={{ height: '80px', background: '#eab308', color: 'black', fontSize: '1.25rem', padding: '0 2rem', fontWeight: 'bold' }}>
                                        Make It! 🔨
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                )}

                {stage === 'complete' && (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✨</div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4ade80' }}>You Did It! 🎉</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>You got all the stuff and made the thing! Great work!</p>
                        <button onClick={nextQuest} className="btn" style={{ marginTop: '2rem', background: '#4ade80', color: 'black', fontSize: '1.25rem' }}>
                            Next Quest! ➡️
                        </button>
                    </div>
                )}

            </div>

            {feedback && (
                <div style={{
                    position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
                    background: feedback.includes('❌') || feedback.includes('Hmm') || feedback.includes('not') ? 'rgba(239, 68, 68, 0.9)' : 'rgba(34, 197, 94, 0.9)',
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
