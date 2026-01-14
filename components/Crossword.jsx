'use client'
import { useEffect, useState } from 'react'
import { generateCrossword } from '../utils/crossword'
import VOCAB from '../data/vocab'

function emptyMatrix(n) {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => ''))
}

export default function Crossword() {
  const [vocab, setVocab] = useState([])
  const [cw, setCw] = useState(null)
  const [matrix, setMatrix] = useState([])
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('vocabData') || 'null')
      const source = Array.isArray(raw) && raw.length ? raw : VOCAB
      setVocab(source.map(r => ({ ...r, word: (r.word || '').toUpperCase(), definition: r.definition })))
    } catch (e) {
      setVocab(VOCAB.map(r => ({ ...r, word: r.word.toUpperCase(), definition: r.definition })))
    }
  }, [])

  useEffect(() => {
    if (vocab.length === 0) return
    const gen = generateCrossword(vocab)
    setCw(gen)
    setMatrix(emptyMatrix(gen.size))
  }, [vocab])

  function handleCellChange(r, c, val) {
    const ch = (val || '').slice(-1).toUpperCase()
    setMatrix(prev => {
      const copy = prev.map(row => row.slice())
      copy[r][c] = ch
      return copy
    })
  }

  useEffect(() => {
    if (!cw) return
    const status = {}
    for (const pl of cw.placements) {
      if (pl.missing) continue
      const answer = pl.positions.map(p => matrix[p.r][p.c] || '').join('')
      if (answer.length === pl.word.length && answer === pl.word) {
        status[pl.word] = true
      }
    }
    setCompleted(status)
  }, [matrix, cw])

  if (!cw) return <p className="text-slate-600">No crossword available. Start from Home and click Start Crossword.</p>

  const size = cw.size

  // compute start numbers for grid cells
  const startNumbers = {}
  cw.across.forEach(a => { if (!a.missing) startNumbers[`${a.r},${a.c}`] = a.id })
  cw.down.forEach(d => { if (!d.missing) startNumbers[`${d.r},${d.c}`] = d.id })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Crossword</h2>
        <div className="text-slate-700">Filled words: {Object.keys(completed).length}</div>
      </div>

      <div className="md:flex gap-6">
        <div className="bg-white p-3 rounded-md shadow-sm overflow-auto">
          <table className="table-fixed border-collapse">
            <tbody>
              {Array.from({ length: size }).map((_, r) => (
                <tr key={r}>
                  {Array.from({ length: size }).map((_, c) => {
                    const letter = cw.grid[r][c]
                    if (!letter) return <td key={c} className="w-8 h-8"></td>
                    return (
                      <td key={c} className="w-8 h-8 border p-0">
                        <div className="relative w-8 h-8">
                          {startNumbers[`${r},${c}`] && <span className="absolute text-[10px] top-0 left-0 text-slate-600">{startNumbers[`${r},${c}`]}</span>}
                          <input maxLength={1} value={matrix[r][c] || ''} onChange={(e) => handleCellChange(r, c, e.target.value)} className="w-full h-full text-center text-lg font-semibold" />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1">
          <div className="card">
            <h3 className="font-semibold">Across</h3>
            <ul className="mt-2 list-decimal list-inside space-y-1">
              {cw.across.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold">{a.id}. { a.missing ? ((vocab.find(v => v.word.toUpperCase() === a.word)?.definition) || 'Definition missing') : ((vocab.find(v => v.word.toUpperCase() === a.word)?.definition) || 'Definition missing') }</div>
                    {a.missing && <div className="text-xs text-slate-500">(not placed on grid)</div>}
                  </div>
                  <div className={`ml-2 font-semibold ${completed[a.word] ? 'text-green-600' : 'text-slate-500'}`}>{completed[a.word] ? '✓' : '...'}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card mt-4">
            <h3 className="font-semibold">Down</h3>
            <ul className="mt-2 list-decimal list-inside space-y-1">
              {cw.down.map((d) => (
                <li key={d.id} className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold">{d.id}. { d.missing ? ((vocab.find(v => v.word.toUpperCase() === d.word)?.definition) || 'Definition missing') : ((vocab.find(v => v.word.toUpperCase() === d.word)?.definition) || 'Definition missing') }</div>
                    {d.missing && <div className="text-xs text-slate-500">(not placed on grid)</div>}
                  </div>
                  <div className={`ml-2 font-semibold ${completed[d.word] ? 'text-green-600' : 'text-slate-500'}`}>{completed[d.word] ? '✓' : '...'}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-slate-700">When a word is complete and correct it will be marked with a check and an encouraging message will appear.</div>

          {Object.keys(completed).length > 0 && <div className="mt-2 text-green-600 font-semibold">Great job! Keep going!</div>}
        </div>
      </div>
    </div>
  )
}
