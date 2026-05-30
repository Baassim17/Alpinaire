import fs from 'fs';
import path from 'path';

const cssPath = path.join('public', 'index-B0-ePl6l.css');
const css = fs.readFileSync(cssPath, 'utf8');

console.log('CSS size:', css.length);

const terms = ['Loader', 'Loader-module', 'progress', 'Hero', 'baseline', 'backgroundWrapper', 'backgroundImage', 'opacity', 'clip-path', 'parallax', 'keyframes'];

for (const term of terms) {
  const count = (css.match(new RegExp(term, 'gi')) || []).length;
  console.log(`Term "${term}" found: ${count} times`);
}

// Let's dump sections of CSS that contain Loader or Hero modules
const regex = /\.Loader-module[^{]*\{[^}]*\}/g;
const matches = css.match(regex);
if (matches) {
  console.log('\nLoader CSS Matches:');
  matches.forEach(m => console.log(m));
} else {
  console.log('\nNo regex matches for .Loader-module');
}

const heroRegex = /\.HomeHero-module[^{]*\{[^}]*\}/g;
const heroMatches = css.match(heroRegex);
if (heroMatches) {
  console.log('\nHero CSS Matches:');
  heroMatches.forEach(m => console.log(m.slice(0, 300) + '...'));
}
