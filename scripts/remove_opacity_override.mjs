import fs from 'fs';
import path from 'path';

// Remove opacity override from src/app/globals.css
const globalsCssPath = path.join('src', 'app', 'globals.css');
let globalsCss = fs.readFileSync(globalsCssPath, 'utf8');

const targetOverride = `/* Alpinaire hero media fallback */
.HomeHero-module__backgroundImage__fqnu4 {
  opacity: 1 !important;
}`;

if (globalsCss.includes(targetOverride)) {
  globalsCss = globalsCss.replace(targetOverride, '');
  fs.writeFileSync(globalsCssPath, globalsCss, 'utf8');
  console.log('Successfully removed opacity override from globals.css');
} else {
  globalsCss = globalsCss.replace(/\/\* Alpinaire hero media fallback \*\/[\s\S]*?\.HomeHero-module__backgroundImage__fqnu4\s*\{\s*opacity:\s*1\s*!important;?\s*\}/g, '');
  fs.writeFileSync(globalsCssPath, globalsCss, 'utf8');
  console.log('Regex removed opacity override from globals.css');
}

// Remove opacity override from public/index-B0-ePl6l.css
const indexCssPath = path.join('public', 'index-B0-ePl6l.css');
let indexCss = fs.readFileSync(indexCssPath, 'utf8');

const targetIndexOverride = '.HomeHero-module__backgroundImage__fqnu4{opacity:1!important}';

if (indexCss.includes(targetIndexOverride)) {
  indexCss = indexCss.replace(targetIndexOverride, '');
  fs.writeFileSync(indexCssPath, indexCss, 'utf8');
  console.log('Successfully removed opacity override from index-B0-ePl6l.css');
} else {
  indexCss = indexCss.replace(/\.HomeHero-module__backgroundImage__fqnu4\{opacity:1!important\}/g, '');
  fs.writeFileSync(indexCssPath, indexCss, 'utf8');
  console.log('Regex removed opacity override from index-B0-ePl6l.css');
}
