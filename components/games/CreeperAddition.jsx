'use client';

import React, { useState } from 'react';

// Generates an array of visual elements
const VisualItems = ({ count, type }) => {
    const getIcon = () => {
        switch (type) {
            case 'dirt': return '🟫';
            case 'apple': return '🍎';
            case 'plank': return '🪵';
            case 'pickaxe': return '⛏️';
            default: return '⬛';
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', justifyContent: 'center' }}>
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} style={{ fontSize: '2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>{getIcon()}</span>
            ))}
        </div>
    );
};

export default function CreeperAddition() {
    const [level, setLevel] = useState(0);
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [total, setTotal] = useState('');
    const [feedback, setFeedback] = useState('');

    const questions = [
        { num1: 3, num2: 2, type: 'dirt' },
        { num1: 4, num2: 4, type: 'apple' },
        { num1: 5, num2: 1, type: 'plank' },
        { num1: 6, num2: 3, type: 'pickaxe' }
    ];

    const currentQ = questions[level];

    const checkAnswer = () => {
        const a1 = parseInt(answer1);
        const a2 = parseInt(answer2);
        const t = parseInt(total);

        if (a1 === currentQ.num1 && a2 === currentQ.num2 && t === (currentQ.num1 + currentQ.num2)) {
            if (level < questions.length - 1) {
                setFeedback('💥 Boom! Correct! Sss... Next level!');
                setTimeout(() => {
                    setLevel(level + 1);
                    setAnswer1('');
                    setAnswer2('');
                    setTotal('');
                    setFeedback('');
                }, 2000);
            } else {
                setFeedback('🏆 You survived! All addition problems solved!');
            }
        } else {
            setFeedback('Hmm, try counting the items again. You got this!');
        }
    };

    if (!currentQ) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <span>🟩</span> Creeper Addition
                </h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                    Count the items, write the numbers, and find the total before it explodes!
                </p>
            </div>

            <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '3rem',
                borderRadius: '1rem',
                border: '2px solid #22c55e',
                width: '100%',
                maxWidth: '800px',
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)'
            }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '1rem', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <VisualItems count={currentQ.num1} type={currentQ.type} />
                    </div>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>+</div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '1rem', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <VisualItems count={currentQ.num2} type={currentQ.type} />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '3rem' }}>
                    <input
                        type="number"
                        value={answer1}
                        onChange={e => setAnswer1(e.target.value)}
                        style={{ width: '100px', height: '100px', fontSize: '3rem', textAlign: 'center', background: 'var(--surface)', border: `2px dashed ${answer1 == currentQ.num1 ? '#22c55e' : 'rgba(255,255,255,0.2)'}`, color: 'white', borderRadius: '0.5rem' }}
                    />
                    <span style={{ color: 'var(--text-secondary)' }}>+</span>
                    <input
                        type="number"
                        value={answer2}
                        onChange={e => setAnswer2(e.target.value)}
                        style={{ width: '100px', height: '100px', fontSize: '3rem', textAlign: 'center', background: 'var(--surface)', border: `2px dashed ${answer2 == currentQ.num2 ? '#22c55e' : 'rgba(255,255,255,0.2)'}`, color: 'white', borderRadius: '0.5rem' }}
                    />
                    <span style={{ color: 'var(--text-secondary)' }}>=</span>
                    <input
                        type="number"
                        value={total}
                        onChange={e => setTotal(e.target.value)}
                        style={{ width: '120px', height: '120px', fontSize: '4rem', textAlign: 'center', background: 'var(--surface)', border: '2px solid #4ade80', color: '#4ade80', borderRadius: '0.5rem', boxShadow: 'inset 0 0 15px rgba(74, 222, 128, 0.2)' }}
                    />
                </div>

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <button onClick={checkAnswer} className="btn" style={{ background: '#22c55e', color: 'black', fontSize: '1.5rem', padding: '1rem 4rem', fontWeight: '800' }}>
                    CRAFT
                </button>
                {feedback && (
                    <div style={{ padding: '1rem 2rem', background: feedback.includes(' Boom!') || feedback.includes('🏆') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', borderRadius: '0.5rem', border: `1px solid ${feedback.includes(' Boom!') || feedback.includes('🏆') ? '#22c55e' : '#ef4444'}`, color: 'white', maxWidth: '500px', textAlign: 'center', fontSize: '1.25rem', animation: 'fadeIn 0.3s ease-out' }}>
                        {feedback}
                    </div>
                )}
            </div>

        </div>
    );
}
