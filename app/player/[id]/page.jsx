import { players, games } from '../../../data/games';
import Link from 'next/link';

export default function PlayerDashboard({ params }) {
    const player = players.find(p => p.id === params.id);

    if (!player) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-3xl mb-4">Player not found</h1>
                <Link href="/" className="btn btn-primary">Back Home</Link>
            </div>
        );
    }

    // Filter games based on player's age bracket
    const availableGames = games.filter(g => g.targetAge === player.age);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {player.avatar}
                </div>
                <div>
                    <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>Welcome, {player.name}!</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.1rem' }}>
                        Ready for some {player.description} challenges?
                    </p>
                </div>
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                Your Quests
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {availableGames.map(game => (
                    <Link
                        href={`/games/${game.id}`}
                        key={game.id}
                        className="glass-panel interactive"
                        style={{ textDecoration: 'none', color: 'inherit', padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
                    >
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>{game.title}</h3>
                        <span style={{ alignSelf: 'flex-start', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '1rem' }}>
                            {game.subject}
                        </span>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', flex: 1, margin: 0 }}>
                            {game.description}
                        </p>

                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Play Now <span style={{ fontSize: '1.2em' }}>→</span>
                            </span>
                        </div>
                    </Link>
                ))}
                {availableGames.length === 0 && (
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>More quests coming soon!</p>
                )}
            </div>
        </div>
    );
}
