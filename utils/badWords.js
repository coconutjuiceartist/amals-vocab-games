// Simple list of banned words (sample). Expand as needed.
const BAD_WORDS = new Set([
  'badword1',
  'badword2',
  'damn',
  'hell',
  'crap',
  'shit'
])

export function containsBadWord(word) {
  if (!word) return false
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  return BAD_WORDS.has(w)
}

export function findBadWords(words) {
  return words.filter(w => containsBadWord(w))
}
