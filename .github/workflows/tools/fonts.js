// Mette i font dentro la pagina, così l'app funziona anche senza internet.
const fs = require('fs'), path = require('path');
const page = path.join(__dirname, '..', 'www', 'index.html');
const want = [
  ['IM Fell English SC', 'im-fell-english-sc', 400, 'normal'],
  ['IM Fell English', 'im-fell-english', 400, 'normal'],
  ['IM Fell English', 'im-fell-english', 400, 'italic'],
  ['Alegreya Sans', 'alegreya-sans', 400, 'normal'],
  ['Alegreya Sans', 'alegreya-sans', 500, 'normal'],
  ['Alegreya Sans', 'alegreya-sans', 700, 'normal'],
];
let css = '', found = 0;
for (const [fam, pkg, w, st] of want) {
  const f = path.join(__dirname, '..', 'node_modules', '@fontsource', pkg, 'files', `${pkg}-latin-${w}-${st}.woff2`);
  if (!fs.existsSync(f)) { console.log('manca', f); continue; }
  found++;
  css += `@font-face{font-family:"${fam}";font-style:${st};font-weight:${w};font-display:swap;src:url(data:font/woff2;base64,${fs.readFileSync(f).toString('base64')}) format("woff2")}\n`;
}
let s = fs.readFileSync(page, 'utf8');
if (found) {
  s = s.replace(/<link rel="preconnect"[^>]*>\s*/, '').replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, `<style>${css}</style>`);
  fs.writeFileSync(page, s);
}
console.log('font inseriti:', found);
