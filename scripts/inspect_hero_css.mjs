import fs from 'fs';
import path from 'path';

const cssPath = path.join('public', 'index-B0-ePl6l.css');
const css = fs.readFileSync(cssPath, 'utf8');

const regex = /\.HomeHero-module[^{]*\{[^}]*\}/g;
const matches = css.match(regex);

if (matches) {
  console.log(`Found ${matches.length} matching CSS rules for HomeHero-module:`);
  matches.forEach((m, i) => {
    console.log(`\n[${i + 1}] ${m}`);
  });
} else {
  console.log('No matches found.');
}
