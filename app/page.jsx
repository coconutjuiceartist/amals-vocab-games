import Link from 'next/link';
import { players } from '../data/games';

export default function Home() {
  return (
    <div className="home-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center', background: 'linear-gradient(to right, #f8fafc, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Welcome to the Arcade!
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '4rem', textAlign: 'center', maxWidth: '600px' }}>
        Select your player profile to dive into custom learning games.
      </p>

      <div className="players-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%', maxWidth: '800px' }}>
        {players.map(player => (
          <Link href={`/player/${player.id}`} key={player.id} className="player-card glass-panel interactive" style={{ textDecoration: 'none', color: 'inherit', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="player-avatar" style={{ fontSize: '5rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', boxShadow: 'insert 0 2px 15px rgba(0,0,0,0.2)' }}>
              {player.avatar}
            </div>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>{player.name}</h2>
            <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--text-primary)', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Age {player.age}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{player.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
