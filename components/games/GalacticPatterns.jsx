'use client';

import React, { useState } from 'react';

const patternLevels = [
    {
        sequence: ['🛸', '🚀', '🛸', '🚀', '🛸'],
        options: ['🚀', '🌍', '🛸'],
        answer: '🚀'
    },
    {
        sequence: ['🟩', '🟩', '🐷', '🟩', '🟩'],
        options: ['🐷', '🟩', '🧟'],
        answer: '🐷'
    },
    {
        sequence: ['🔵', '🟠', '🔵', '🟠', '🔵'],
        options: ['🟡', '🟠', '🔵'],
        answer: '🟠'
    },
    {
        sequence: ['💎', '🥇', '⚙️', '💎', '🥇'],
        options: ['⚙️', '💎', '🥇'],
        answer: '⚙️'
    }
];

export default function GalacticPatterns() {
    const [level, setLevel] = useState(0);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState('');

    const currentLevel = patternLevels[level];

    const handleSelect = (option) => {
        setSelected(option);

        if (option === currentLevel.answer) {
            if (level < patternLevels.length - 1) {
                setFeedback('✨ Perfect match! Jump to hyperspace...');
                setTimeout(() => {
                    setLevel(level + 1);
                    setSelected(null);
                    setFeedback('');
                }, 1500);
            } else {
                setFeedback('🏆 Master of Patterns! You solved them all!');
            }
        } else {
            setFeedback('Not quite. Look at how the pictures repeat!');
            setTimeout(() => {
                setSelected(null);
                setFeedback('');
            }, 1500);
        }
    };

    if (!currentLevel) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>

            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#60a5fa' }}>Galactic & Blocky Patterns</h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                    Look at the row. What comes next?
                </p>
            </div>

            {/* The Sequence */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(0,0,0,0.3)',
                padding: '2rem 3rem',
                borderRadius: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
            }}>
                {currentLevel.sequence.map((icon, i) => (
                    <React.Fragment key={i}>
                        <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>{icon}</div>
                        <div style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.2)', margin: '0 0.5rem' }}>→</div>
                    </React.Fragment>
                ))}
                {/* The Question Mark Spot */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '1rem',
                    border: '4px dashed rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3.5rem',
                    background: selected ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: selected === currentLevel.answer ? '#4ade80' : selected ? '#ef4444' : 'var(--text-secondary)'
                }}>
                    {selected ? selected : '?'}
                </div>
            </div>

            {/* The Options */}
            <div>
                <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Select the match:</h3>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    {currentLevel.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(opt)}
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '1.5rem',
                                fontSize: '5rem',
                                padding: '1.5rem',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(96, 165, 250, 0.3)';
                                e.currentTarget.style.borderColor = '#60a5fa';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feedback Area */}
            {feedback && (
                <div style={{ padding: '1.5rem 3rem', background: feedback.includes('✨') || feedback.includes('🏆') ? 'rgba(96, 165, 250, 0.2)' : 'rgba(239, 68, 68, 0.2)', borderRadius: '1rem', border: `1px solid ${feedback.includes('✨') || feedback.includes('🏆') ? '#60a5fa' : '#ef4444'}`, color: 'white', textAlign: 'center', fontSize: '1.5rem', animation: 'fadeIn 0.3s ease-out' }}>
                    {feedback}
                </div>
            )}

        </div>
    );
}
