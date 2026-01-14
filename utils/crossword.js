// Improved crossword layout algorithm.
// Tries greedy intersections, grows the grid if packing fails, and as a last
// resort force-places any remaining words (standalone placements).

export function generateCrossword(words) {
  if (!words || words.length === 0) return { grid: [], placements: [], size: 0 }

  // Helper that attempts to place all words on a grid of given size.
  function attempt(size) {
    const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => null))
    const placements = []
    let nextId = 1

    function placeWord(word, r, c, dir) {
      const positions = []
      for (let i = 0; i < word.length; i++) {
        const rr = dir === 'across' ? r : r + i
        const cc = dir === 'across' ? c + i : c
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) return false

        const cell = grid[rr][cc]
        // conflict with an existing different letter
        if (cell && cell !== word[i]) return false

        // If this cell is currently empty, ensure we won't create invalid adjacency
        if (!cell) {
          if (dir === 'across') {
            // prevent touching other words above or below this letter (unless overlapping at this same cell)
            if (rr - 1 >= 0 && grid[rr - 1][cc]) return false
            if (rr + 1 < size && grid[rr + 1][cc]) return false
          } else {
            // down: prevent touching letters to the left or right
            if (cc - 1 >= 0 && grid[rr][cc - 1]) return false
            if (cc + 1 < size && grid[rr][cc + 1]) return false
          }
        }

        positions.push({ r: rr, c: cc })
      }

      // ensure the cell before the word and after the word along main axis are empty (no unintended concatenation)
      if (dir === 'across') {
        const beforeC = c - 1
        const afterC = c + word.length
        if (beforeC >= 0 && grid[r][beforeC]) return false
        if (afterC < size && grid[r][afterC]) return false
      } else {
        const beforeR = r - 1
        const afterR = r + word.length
        if (beforeR >= 0 && grid[beforeR][c]) return false
        if (afterR < size && grid[afterR][c]) return false
      }

      // commit
      for (let i = 0; i < word.length; i++) {
        const { r: rr, c: cc } = positions[i]
        grid[rr][cc] = word[i]
      }
      placements.push({ word, r, c, dir, positions, id: nextId++ })
      return true
    }

    // place first word horizontally in the middle
    const first = words[0].word || ''
    const startC = Math.floor((size - first.length) / 2)
    placeWord(first.toUpperCase(), Math.floor(size / 2), startC, 'across')

    // place remaining words by trying to intersect
    const remaining = words.slice(1).map(w => (w.word || '')).sort((a, b) => b.length - a.length)
    let missingCounter = 0
    for (const raw of remaining) {
      const w = raw.toUpperCase()
      let placed = false

      // try to intersect with existing letters
      for (const letterIndex in w) {
        const ch = w[letterIndex]
        for (const pl of placements) {
          // skip placements that have no positions (skipped/missing placements)
          if (!pl.positions || !Array.isArray(pl.positions)) continue
          const pword = pl.word || ''
          for (let k = 0; k < pword.length; k++) {
            if (pword[k] !== ch) continue
            // try to place perpendicular crossing at that position
            const crossPos = pl.positions[k]
            if (!crossPos) continue
            const tryDir = pl.dir === 'across' ? 'down' : 'across'
            const startR = tryDir === 'across' ? crossPos.r : crossPos.r - Number(letterIndex)
            const startC = tryDir === 'across' ? crossPos.c - Number(letterIndex) : crossPos.c
            if (placeWord(w, startR, startC, tryDir)) {
              placed = true
              break
            }
          }
          if (placed) break
        }
        if (placed) break
      }

      // if not placed, try to place in next available row horizontally
      if (!placed) {
        for (let r = 0; r < size; r++) {
          for (let c = 0; c <= size - w.length; c++) {
            if (placeWord(w, r, c, 'across')) {
              placed = true
              break
            }
          }
          if (placed) break
        }
      }

      // if still not placed, try vertical somewhere
      if (!placed) {
        for (let r = 0; r <= size - w.length; r++) {
          for (let c = 0; c < size; c++) {
            if (placeWord(w, r, c, 'down')) {
              placed = true
              break
            }
          }
          if (placed) break
        }
      }

      // If can't place, mark it as missing and assign a direction so it appears in clues
      if (!placed) {
        const dir = (missingCounter % 2 === 0) ? 'across' : 'down'
        placements.push({ word: w, missing: true, id: nextId++, dir })
        missingCounter++
      }
    }

    // build clues (numbers already set on placements)
    const across = []
    const down = []
    let missingCount = 0
    for (const pl of placements) {
      if (pl.missing) {
        missingCount++
        if (pl.dir === 'across') across.push({ id: pl.id, word: pl.word, missing: true })
        else down.push({ id: pl.id, word: pl.word, missing: true })
        continue
      }
      const clue = pl.word
      if (pl.dir === 'across') across.push({ id: pl.id, r: pl.r, c: pl.c, word: pl.word, clue })
      else down.push({ id: pl.id, r: pl.r, c: pl.c, word: pl.word, clue })
    }

    return { grid, placements, size, across, down, missingCount, nextId }
  }

  // Try increasing grid sizes until all words fit or we hit a maximum size.
  let lastResult = null
  for (let s = 13; s <= 25; s += 2) {
    const res = attempt(s)
    lastResult = res
    if (res.missingCount === 0) return { grid: res.grid, placements: res.placements, size: res.size, across: res.across, down: res.down }
  }

  // Last resort: force-place remaining words by allowing placements that may be isolated.
  // This ignores adjacency checks but still prevents letter conflicts.
  const size = lastResult.size
  const grid = lastResult.grid
  const placements = lastResult.placements
  let nextId = lastResult.nextId

  function fitsRelaxed(word, r, c, dir) {
    for (let i = 0; i < word.length; i++) {
      const rr = dir === 'across' ? r : r + i
      const cc = dir === 'across' ? c + i : c
      if (rr < 0 || rr >= size || cc < 0 || cc >= size) return false
      const cell = grid[rr][cc]
      if (cell && cell !== word[i]) return false
    }
    return true
  }

  function forcePlace(word) {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c <= size - word.length; c++) {
        if (fitsRelaxed(word, r, c, 'across')) {
          const positions = []
          for (let i = 0; i < word.length; i++) {
            const rr = r
            const cc = c + i
            grid[rr][cc] = word[i]
            positions.push({ r: rr, c: cc })
          }
          placements.push({ word, r, c, dir: 'across', positions, id: nextId++ })
          return true
        }
      }
    }
    for (let r = 0; r <= size - word.length; r++) {
      for (let c = 0; c < size; c++) {
        if (fitsRelaxed(word, r, c, 'down')) {
          const positions = []
          for (let i = 0; i < word.length; i++) {
            const rr = r + i
            const cc = c
            grid[rr][cc] = word[i]
            positions.push({ r: rr, c: cc })
          }
          placements.push({ word, r, c, dir: 'down', positions, id: nextId++ })
          return true
        }
      }
    }
    return false
  }

  // Try to place missing ones
  for (const pl of placements.filter(p => p.missing)) {
    const word = pl.word
    if (forcePlace(word)) {
      pl.missing = false
    }
  }

  // rebuild across/down lists
  const across = []
  const down = []
  for (const pl of placements) {
    if (pl.missing) {
      if (pl.dir === 'across') across.push({ id: pl.id, word: pl.word, missing: true })
      else down.push({ id: pl.id, word: pl.word, missing: true })
      continue
    }
    if (pl.dir === 'across') across.push({ id: pl.id, r: pl.r, c: pl.c, word: pl.word, clue: pl.word })
    else down.push({ id: pl.id, r: pl.r, c: pl.c, word: pl.word, clue: pl.word })
  }

  return { grid, placements, size, across, down }
}
