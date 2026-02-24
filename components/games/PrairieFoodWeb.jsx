'use client';

import React, { useState } from 'react';

const organisms = [
    { id: 'grass', name: 'Big Bluestem Grass', type: 'Producer' },
    { id: 'grasshopper', name: 'Grasshopper', type: 'Primary Consumer' },
    { id: 'prairiedog', name: 'Prairie Dog', type: 'Primary Consumer' },
    { id: 'meadowlark', name: 'Meadowlark', type: 'Secondary Consumer' },
    { id: 'coyote', name: 'Coyote', type: 'Top Predator' },
    { id: 'hawk', name: 'Hawk', type: 'Top Predator' }
];

export default function PrairieFoodWeb() {
    const [connections, setConnections] = useState([]);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState('');

    const handleSelect = (orgId) => {
        if (!selected) {
            setSelected(orgId);
        } else {
            if (selected !== orgId) {
                // Create connection
                const newConnection = { from: selected, to: orgId };

                // Prevent duplicates
                if (!connections.find(c => c.from === selected && c.to === orgId)) {
                    setConnections([...connections, newConnection]);
                }
            }
            setSelected(null);
        }
    };

    const removeConnection = (index) => {
        const newConns = [...connections];
        newConns.splice(index, 1);
        setConnections(newConns);
    };

    const checkWeb = () => {
        // Basic verification of energy flow
        const hasProducerToPrimary = connections.some(c =>
            c.from === 'grass' && (c.to === 'grasshopper' || c.to === 'prairiedog')
        );
        const hasPrimaryToPredator = connections.some(c =>
            (c.from === 'grasshopper' || c.from === 'prairiedog') &&
            (c.to === 'coyote' || c.to === 'hawk' || c.to === 'meadowlark')
        );

        if (connections.length < 4) {
            setFeedback('Build a bigger web! Connect more organisms to show energy flow.');
        } else if (hasProducerToPrimary && hasPrimaryToPredator) {
            setFeedback('🌟 Excellent! You accurately mapped the flow of energy from producers up to the top predators.');
        } else {
            setFeedback('Make sure energy always flows FROM the thing being eaten TO the creature eating it! (e.g., Grass -> Prairie Dog)');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>The Tallgrass Prairie Food Web</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    Click an organism, then click another to show the flow of energy.
                    Remember, the arrow points <strong>into the tummy</strong> of the creature eating it!
                </p>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                padding: '2rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                width: '100%'
            }}>
                {organisms.map(org => (
                    <div
                        key={org.id}
                        onClick={() => handleSelect(org.id)}
                        style={{
                            padding: '1rem 1.5rem',
                            background: selected === org.id ? 'rgba(20, 184, 166, 0.4)' : 'var(--surface)',
                            border: `2px solid ${selected === org.id ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            textAlign: 'center',
                            userSelect: 'none',
                            transform: selected === org.id ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: selected === org.id ? '0 0 20px rgba(20, 184, 166, 0.3)' : 'none'
                        }}
                    >
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{org.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{org.type}</div>
                    </div>
                ))}
            </div>

            <div style={{ width: '100%', maxWidth: '600px', background: 'var(--surface)', padding: '1.5rem', borderRadius: '1rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    Active Energy Flows
                </h3>
                {connections.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center' }}>No connections made yet.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {connections.map((c, i) => {
                            const fromName = organisms.find(o => o.id === c.from)?.name;
                            const toName = organisms.find(o => o.id === c.to)?.name;
                            return (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                                    <span><span style={{ color: 'var(--accent)' }}>{fromName}</span> ➔ {toName}</span>
                                    <button onClick={() => removeConnection(i)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', padding: '0.25rem' }}>
                                        &times;
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <button onClick={checkWeb} className="btn" style={{ background: 'var(--accent)', color: 'white', fontSize: '1.25rem', padding: '1rem 3rem', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                    Verify Food Web
                </button>
                {feedback && (
                    <div style={{ padding: '1rem 2rem', background: feedback.includes('🌟') ? 'rgba(20, 184, 166, 0.2)' : 'rgba(239, 68, 68, 0.2)', borderRadius: '0.5rem', border: `1px solid ${feedback.includes('🌟') ? 'var(--accent)' : '#ef4444'}`, color: 'white', maxWidth: '500px', textAlign: 'center', animation: 'fadeIn 0.3s ease-out' }}>
                        {feedback}
                    </div>
                )}
            </div>
        </div>
    );
}
