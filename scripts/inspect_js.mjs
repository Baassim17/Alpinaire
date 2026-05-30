import fs from 'fs';
import path from 'path';

const jsPath = path.join('public', 'index-Cf95Hpzn.js');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('JS size:', js.length);

// Let's find terms like "backgroundImage", "transform-origin", "will-change", "scroll", "parallax"
const terms = ['backgroundImage', 'transform', 'parallax', 'scrollY', 'scrollTrigger', 'gsap', 'lenis', 'clipPath', 'inset', 'Loader'];

for (const term of terms) {
  const count = (js.match(new RegExp(term, 'g')) || []).length;
  console.log(`Term "${term}" found: ${count} times`);
}

// Let's search for GSAP ScrollTrigger timeline configuration in JS
const regexes = [
  /ScrollTrigger/gi,
  /gsap\.to/gi,
  /gsap\.from/gi,
  /gsap\.timeline/gi,
  /\.HomeHero/gi,
  /clipPath/gi,
  /transform/gi
];

console.log('\nSearch matches:');
for (const rx of regexes) {
  const match = js.match(rx);
  console.log(`Regex ${rx} matched: ${match ? match.length : 0} times`);
}
