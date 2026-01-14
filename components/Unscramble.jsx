'use client'
import { useEffect, useState } from 'react'
import { scrambleWord } from '../utils/scramble'
import VOCAB from '../data/vocab'

export default function Unscramble() {
  const [items, setItems] = useState([])
  const [score, setScore] = useState(0)
  const [doneCount, setDoneCount] = useState(0)

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('vocabData') || 'null')
      const source = Array.isArray(raw) && raw.length ? raw : VOCAB
      const prepared = source.map((r) => ({
        word: r.word || '',
        definition: r.definition || 'No definition found',
        scrambled: scrambleWord(r.word || ''),
        answer: '',
        correct: false
      }))
      setItems(prepared)
    } catch (e) {
      const prepared = VOCAB.map((r) => ({
        word: r.word || '',
        definition: r.definition || 'No definition found',
        scrambled: scrambleWord(r.word || ''),
        answer: '',
        correct: false
      }))
      setItems(prepared)
    }
  }, [])

  function handleChange(i, val) {
    setItems((prev) => {
      const copy = [...prev]
      copy[i].answer = val
      // immediate feedback
      const isCorrect = val.trim().toLowerCase() === (copy[i].word || '').toLowerCase()
      // update score tracking
      if (isCorrect && !copy[i].correct) {
        setScore(s => s + 1)
        copy[i].correct = true
        setDoneCount(dc => dc + 1)
      }
      if (!isCorrect && copy[i].correct) {
        setScore(s => Math.max(0, s - 1))
        copy[i].correct = false
        setDoneCount(dc => Math.max(0, dc - 1))
      }
      return copy
    })
  }

  if (items.length === 0) return <p className="text-slate-600">No vocabulary available.</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Word Unscramble</h2>
        <div className="text-lg">Score: <span className="font-semibold">{score}/{items.length}</span></div>
      </div>

      <div className="grid gap-4">
        {items.map((it, i) => (
          <div key={i} className="p-3 border rounded-md bg-white flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2">
              <div className="text-xl font-semibold">{it.scrambled}</div>
              <div className="text-slate-600 mt-1">Hint: {it.definition}</div>
            </div>

            <div className="mt-3 md:mt-0 md:w-1/3">
              <input value={it.answer} onChange={(e) => handleChange(i, e.target.value)} placeholder="Type answer" className="w-full p-2 border rounded-md text-lg" />
              <div className="mt-2">
                {it.answer && (it.correct ? <span className="text-green-600 font-semibold">Great job!</span> : <span className="text-red-600 font-semibold">Keep trying!</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-slate-700">Completed: {doneCount} / {items.length}</div>
    </div>
  )
}
