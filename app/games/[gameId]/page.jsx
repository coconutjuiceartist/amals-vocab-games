import { games } from '../../../data/games';
import Link from 'next/link';

import dynamic from 'next/dynamic';

const gameComponents = {
    'debate-simulator': dynamic(() => import('../../../components/games/DebateSimulator'), { ssr: false }),
    'resource-quests': dynamic(() => import('../../../components/games/ResourceQuests'), { ssr: false }),
};

export default function GameWrapper({ params }) {
    const game = games.find(g => g.id === params.gameId);

    if (!game) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-3xl mb-4">Quest not found</h1>
                <Link href="/" className="btn btn-primary">Back Home</Link>
            </div>
        );
    }

    const GameComponent = gameComponents[game.id] || (() => (
        <div style={{ padding: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.2)' }}>
            <h2>Interactive "{game.title}" component goes here!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Coming soon.</p>
        </div>
    ));

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href={`/player/${game.targetAge === 11 ? '11yo-girl' : '7yo-boy'}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>←</span> Back to Quests
                </Link>
                <span style={{ background: `var(--${game.theme === 'purple' ? 'secondary' : game.theme === 'green' ? 'accent' : 'primary'})`, padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    {game.subject}
                </span>
            </div>

            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{game.title}</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>{game.description}</p>
            </div>

            <div className="game-container glass-panel" style={{ padding: '2rem', minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
                <GameComponent />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
        </div>
    );
}
