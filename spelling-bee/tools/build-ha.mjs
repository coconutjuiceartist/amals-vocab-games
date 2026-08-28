/* Builds ha/honeycomb.html from ha/_template.html plus the puzzle data in
   index.html, so the two builds can never disagree about the word lists.

     node tools/build-ha.mjs
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');

const main = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const start = main.indexOf('const PUZZLES = ');
const end = main.indexOf('\n];', start);
if (start < 0 || end < 0) { console.error('no PUZZLES array in index.html'); process.exit(1); }
const data = main.slice(start + 'const PUZZLES = '.length, end + 3);

const tplPath = path.join(root, 'ha', '_template.html');
const tpl = fs.readFileSync(tplPath, 'utf8');
if (!tpl.includes('/*__PUZZLES__*/[]')) {
  console.error('template has no /*__PUZZLES__*/[] placeholder');
  process.exit(1);
}
const out = tpl.replace('/*__PUZZLES__*/[]', data);

const dest = path.join(root, 'ha', 'honeycomb.html');
fs.writeFileSync(dest, out);

const count = (out.match(/id: "hc-/g) || []).length;
console.log(`built ${path.relative(root, dest)} — ${count} puzzles, ` +
            `${(fs.statSync(dest).size / 1024).toFixed(1)}KB`);
