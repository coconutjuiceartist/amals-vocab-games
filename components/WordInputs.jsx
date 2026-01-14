'use client'
import { useState } from 'react'

export default function WordInputs({ onSubmit }) {
  const [words, setWords] = useState(Array.from({ length: 12 }, () => ''))

  function update(i, v) {
    const copy = [...words]
    copy[i] = v
    setWords(copy)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(words.map(w => (w || '').trim()))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-slate-700">Enter 12 vocabulary words for practice. Use school-appropriate words only.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {words.map((w, i) => (
          <label key={i} className="flex flex-col items-center">
            <span className="sr-only">Word {i + 1}</span>
            <input
              aria-label={`Word ${i + 1}`}
              inputMode="text"
              key={i}
              className="p-2 border rounded-md text-center text-lg w-full"
              value={w}
              placeholder={`Word ${i + 1}`}
              onChange={(e) => update(i, e.target.value)}
            />
          </label>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-3 rounded-md bg-brandBlue text-white font-semibold text-lg">Start Unscramble</button>
        <button type="button" onClick={() => onSubmit(words.map(w => (w || '').trim()), 'crossword')} className="px-4 py-3 rounded-md bg-brandYellow text-black font-semibold text-lg">Start Crossword</button>
      </div>
    </form>
  )
}
