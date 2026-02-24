'use client';
import React, { useState, useEffect } from 'react';
import { resourceQuests } from '../../data/resourceQuests';

export default function ResourceQuests() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [questIndex, setQuestIndex] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);
    const [inventory, setInventory] = useState({ wood: 0, stone: 0, iron: 0, diamond: 0 });
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState('');
    const [stage, setStage] = useState('intro'); // intro, mining, crafting, complete, all_done

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
                questIndex, stepIndex, inventory, stage
            }));
        }
    }, [questIndex, stepIndex, inventory, stage, isLoaded]);

    const quest = resourceQuests[questIndex];
    const currentStep = quest ? quest.steps[stepIndex] : null;

    const renderInventoryIcon = (type) => {
        switch (type) {
            case 'wood': return '🪵';
            case 'stone': return '🪨';
            case 'iron': return '⛓️'; // Using chain for iron representation
            case 'diamond': return '💎';
            default: return '📦';
        }
    };

    const verifyMath = () => {
        const input = parseInt(inputValue);
        if (input === currentStep.math.answer) {
            // Award items
            setInventory(prev => ({
                ...prev,
                [currentStep.reward.item]: prev[currentStep.reward.item] + currentStep.reward.amount
            }));
            setFeedback('⛏️ Correct! Items added to inventory.');
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
            setFeedback('Hmm, try that math again!');
        }
    };

    const verifyCrafting = () => {
        const input = parseInt(inputValue);
        if (input === quest.crafting.finalMath.answer) {
            setFeedback('✨ Goal Achieved! You successfully managed your resources and crafted the items.');
            setInputValue('');
            setTimeout(() => {
                setFeedback('');
                setStage('complete');
            }, 1500);
        } else {
            setFeedback("That's not the right amount left over. Check your inventory numbers again!");
        }
    };

    const nextQuest = () => {
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
        localStorage.removeItem('stevesResourceQuestsState');
    };

    if (!isLoaded) return null; // Prevents hydration mismatch

    if (stage === 'all_done') {
        return (
            <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>👑</div>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#4ade80' }}>Master Crafter!</h2>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>You have completed all resource management challenges!</p>
                <button onClick={resetEntireGame} className="btn" style={{ marginTop: '2rem', background: '#3b82f6', color: 'white', fontSize: '1.25rem' }}>
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

            {/* SIDEBAR: INVENTORY */}
            <div className="glass-panel" style={{ width: '250px', padding: '1.5rem', flexShrink: 0, position: 'sticky', top: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4ade80', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    📦 Inventory
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {Object.entries(inventory).map(([item, amount]) => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '0.5rem', transition: 'all 0.3s ease' }}>
                            <span style={{ fontSize: '1.5rem' }}>{renderInventoryIcon(item)}</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>x {amount}</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', border: '1px dashed #3b82f6' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Current Goal</div>
                    <div style={{ fontWeight: 'bold', color: '#60a5fa' }}>{quest.goal}</div>
                </div>

                <button onClick={resetEntireGame} style={{ marginTop: '2rem', width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-secondary)', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    Restart Game
                </button>
            </div>

            {/* MAIN GAME AREA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {stage === 'intro' && (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4ade80' }}>Quest {questIndex + 1}: {quest.title}</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Your goal is to gather the resources needed to: <strong>{quest.goal}</strong>.<br /><br />
                            Read the scenarios carefully and do the math to update your inventory.
                        </p>
                        <button onClick={() => setStage('mining')} className="btn" style={{ background: '#22c55e', color: 'black', fontSize: '1.25rem' }}>
                            Start Mining
                        </button>
                    </div>
                )}

                {(stage === 'mining' || stage === 'crafting') && (
                    <div className="glass-panel" style={{ padding: '3rem' }}>

                        {/* HEADER & BACK BUTTON */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ fontSize: '0.85rem', color: stage === 'crafting' ? '#eab308' : '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {stage === 'mining' ? `Resource Gathering: Step ${stepIndex + 1} of ${quest.steps.length}` : 'Final Step: Crafting the Goal'}
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
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Previous Actions History:</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {quest.steps.slice(0, stepIndex).map((s, idx) => (
                                        <div key={idx} style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)', borderLeft: '3px solid rgba(255,255,255,0.1)' }}>
                                            <span style={{ color: '#4ade80', marginRight: '0.5rem' }}>✓ completed</span>
                                            {s.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CURRENT ACTIVE STEP */}
                        {stage === 'mining' && currentStep && (
                            <>
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
                                        Collect
                                    </button>
                                </div>
                            </>
                        )}

                        {stage === 'crafting' && (
                            <>
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
                                        Craft Item
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                )}

                {stage === 'complete' && (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✨</div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4ade80' }}>Goal Completed!</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>You successfully gathered the resources and crafted the item.</p>
                        <button onClick={nextQuest} className="btn" style={{ marginTop: '2rem', background: '#4ade80', color: 'black', fontSize: '1.25rem' }}>
                            Next Goal
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
