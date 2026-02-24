'use client';

import React, { useState } from 'react';

export default function PygmyPuffGenetics() {
    const [grid, setGrid] = useState({
        tl: '', tr: '', bl: '', br: ''
    });

    const [feedback, setFeedback] = useState('');

    // Parent Genes:
    // Top (Pink parent): p, p
    // Side (Purple parent): P, p
    const parentGenes = {
        top1: 'p', top2: 'p',
        side1: 'P', side2: 'p'
    };

    const handleInput = (cell, value) => {
        // only accept 'P' or 'p'
        const valid = value.replace(/[^Pp]/g, '');
        if (valid.length <= 2) {
            setGrid(prev => ({ ...prev, [cell]: valid }));
            setFeedback(''); // reset feedback on typing
        }
    };

    const checkAnswers = () => {
        // Expected answers ignoring order of letters (Pp or pP)
        const tlCorrect = grid.tl.toLowerCase() === 'pp' && grid.tl.includes('P') && grid.tl.includes('p');
        const trCorrect = grid.tr.toLowerCase() === 'pp' && grid.tr.includes('P') && grid.tr.includes('p');
        const blCorrect = grid.bl === 'pp';
        const brCorrect = grid.br === 'pp';

        if (tlCorrect && trCorrect && blCorrect && brCorrect) {
            setFeedback('🎉 Correct! 50% of the babies will be Pink (pp) and 50% will be Purple (Pp). Great job geneticist!');
        } else {
            setFeedback('Not quite right yet. Remember to bring the top letter down and the side letter across for each box! (e.g. P + p = Pp)');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Breeding Pygmy Puffs</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    Fred and George need your help. Fill in the Punnett Square by combining the parent genes.
                    <strong> P </strong> is the dominant Purple gene, and <strong> p </strong> is the recessive Pink gene.
                </p>
            </div>

            <div className="punnett-square" style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gridTemplateRows: '60px 1fr',
                gap: '0.5rem',
                background: 'rgba(0,0,0,0.2)',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
            }}>
                {/* Empty top-left corner */}
                <div></div>

                {/* Top Parent Genes */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#fbcfe8' }}>{parentGenes.top1}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#fbcfe8' }}>{parentGenes.top2}</div>
                </div>

                {/* Side Parent Genes */}
                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#e879f9' }}>{parentGenes.side1}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#fbcfe8' }}>{parentGenes.side2}</div>
                </div>

                {/* The Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px' }}>
                    {Object.keys(grid).map(cell => (
                        <input
                            key={cell}
                            type="text"
                            value={grid[cell]}
                            onChange={(e) => handleInput(cell, e.target.value)}
                            placeholder="?"
                            style={{
                                width: '120px',
                                height: '120px',
                                fontSize: '2.5rem',
                                textAlign: 'center',
                                background: 'var(--surface)',
                                border: '2px dashed rgba(255,255,255,0.2)',
                                borderRadius: '0.5rem',
                                color: 'white',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                        />
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={checkAnswers} className="btn" style={{ background: 'var(--secondary)', color: 'white', fontSize: '1.25rem', padding: '1rem 3rem' }}>
                    Check Mix
                </button>
                {feedback && (
                    <div style={{ padding: '1rem 2rem', background: feedback.includes('🎉') ? 'rgba(20, 184, 166, 0.2)' : 'rgba(239, 68, 68, 0.2)', borderRadius: '0.5rem', border: `1px solid ${feedback.includes('🎉') ? 'var(--accent)' : '#ef4444'}`, color: 'white', maxWidth: '500px', textAlign: 'center', animation: 'fadeIn 0.3s ease-out' }}>
                        {feedback}
                    </div>
                )}
            </div>
        </div>
    );
}
