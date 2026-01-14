'use client'
import { useRouter } from 'next/navigation'
import VOCAB from '../data/vocab'

export default function Home() {
  const router = useRouter()

  function start(target) {
    localStorage.setItem('vocabData', JSON.stringify(VOCAB))
    router.push(`/${target}`)
  }

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-2xl font-bold">Welcome!</h2>
        <p className="mt-2">Click a game to begin. The vocabulary for this session is pre-selected.</p>
      </section>

      <section className="card flex gap-4">
        <button onClick={() => start('unscramble')} className="px-6 py-4 rounded-md bg-brandBlue text-white font-semibold text-lg">Play Word Unscramble</button>
        <button onClick={() => start('crossword')} className="px-6 py-4 rounded-md bg-brandYellow text-black font-semibold text-lg">Play Crossword Puzzle</button>
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold">Tips for teachers</h3>
        <ul className="list-disc list-inside mt-2 text-slate-700">
          <li>Start with the Unscramble game then try the Crossword</li>
          <li>Encourage students with messages like “Great job!”</li>
        </ul>
      </section>
    </div>
  )
}
