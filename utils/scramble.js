export function scrambleWord(word) {
  if (!word || word.length < 2) return word
  const arr = word.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  const scrambled = arr.join('')
  // Avoid returning same as original; if equal, rotate once
  if (scrambled.toLowerCase() === word.toLowerCase()) {
    return word.split('').reverse().join('')
  }
  return scrambled
}
