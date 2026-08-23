# amals-vocab-games
A game for fifth graders to learn vocabulary

Next.js 14 app for 5th grade vocabulary learning: Word Unscramble & Crossword Puzzle. Uses Tailwind CSS.

Run locally:

1. npm install
2. npm run dev

Open http://localhost:3000 and enter 12 vocabulary words on the Home page. The app will fetch definitions and create two games: Unscramble and Crossword.

## Honeycomb (spelling bee)

`spelling-bee/index.html` is a separate, self-contained word game for adults — a
Spelling Bee–style honeycomb of seven letters. It is one file with no dependencies:
double-click it to play, or send the file to someone and they can do the same. It
shares this app's look but none of its code. See `spelling-bee/README.md`.

Notes:
- The app uses a simple bad-word filter; if an inappropriate word is detected you'll see "Oops! Please use school-appropriate words.".
- Definitions are provided in `data/vocab.js` (the app no longer fetches them from an external API).
- This is a single-page experience that stores the chosen words in localStorage for the games.
