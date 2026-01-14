import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: "Amal's Vocab Games",
  description: 'Fun vocabulary games for 5th graders'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="p-4 bg-gradient-to-r from-brandBlue/80 to-brandYellow/60 text-white">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="header-title text-2xl">Amal's Vocab Games</h1>
            <nav className="space-x-3">
              <Link className="px-3 py-1 rounded-md bg-white/10" href="/">Home</Link>
              <Link className="px-3 py-1 rounded-md bg-white/10" href="/unscramble">Word Unscramble</Link>
              <Link className="px-3 py-1 rounded-md bg-white/10" href="/crossword">Crossword</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 w-full max-w-4xl mx-auto p-4">{children}</main>

        <footer className="p-4 text-center text-sm text-slate-600">Made for Pingry 5th graders</footer>
      </body>
    </html>
  )
}
