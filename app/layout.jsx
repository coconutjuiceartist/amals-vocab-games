export const metadata = {
  title: "Learning Games Explorer",
  description: "A fun and interactive learning portal"
};

import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="app-container">
          <header className="site-header">
            <Link href="/" className="site-title">
              Learning Games
            </Link>
            <nav className="site-nav">
              <Link href="/" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                Home
              </Link>
            </nav>
          </header>

          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
