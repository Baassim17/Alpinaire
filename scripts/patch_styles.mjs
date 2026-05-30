import fs from 'fs';
import path from 'path';

// Patch src/app/globals.css
const globalsCssPath = path.join('src', 'app', 'globals.css');
let globalsCss = fs.readFileSync(globalsCssPath, 'utf8');

const oldFallbackSection = `/* Alpinaire hero media fallback */
.HomeHero-module__root__X32-X,
.HomeHero-module__background__-bq4K {
  background-image: url("/images/Hero.png?v=alpinaire-hero-2") !important;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}

.HomeHero-module__backgroundImage__fqnu4 {
  opacity: 0 !important;
}`;

const newFallbackSection = `/* Alpinaire hero media fallback */
.HomeHero-module__backgroundImage__fqnu4 {
  opacity: 1 !important;
}`;

if (globalsCss.includes(oldFallbackSection)) {
  globalsCss = globalsCss.replace(oldFallbackSection, newFallbackSection);
  fs.writeFileSync(globalsCssPath, globalsCss, 'utf8');
  console.log('Successfully patched src/app/globals.css');
} else {
  // Try dynamic match if spacing differs
  console.log('globals.css did not match exact fallback section. Checking contents...');
  globalsCss = globalsCss.replace(/\.HomeHero-module__root__X32-X,\s*\.HomeHero-module__background__-bq4K\s*\{[^}]*\}/g, '');
  globalsCss = globalsCss.replace(/\.HomeHero-module__backgroundImage__fqnu4\s*\{\s*opacity:\s*0\s*!important;?\s*\}/g, '.HomeHero-module__backgroundImage__fqnu4 { opacity: 1 !important; }');
  fs.writeFileSync(globalsCssPath, globalsCss, 'utf8');
  console.log('Patched globals.css using regex fallback.');
}

// Patch public/index-B0-ePl6l.css
const indexCssPath = path.join('public', 'index-B0-ePl6l.css');
let indexCss = fs.readFileSync(indexCssPath, 'utf8');

const targetStr = '.HomeHero-module__root__X32-X,.HomeHero-module__background__-bq4K{background-image:url("/images/Hero.png?v=alpinaire-hero-2")!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important}';
const targetOpacityStr = '.HomeHero-module__backgroundImage__fqnu4{opacity:0!important}';

if (indexCss.includes(targetStr)) {
  indexCss = indexCss.replace(targetStr, '');
  console.log('Removed container background override from index-B0-ePl6l.css');
}
if (indexCss.includes(targetOpacityStr)) {
  indexCss = indexCss.replace(targetOpacityStr, '.HomeHero-module__backgroundImage__fqnu4{opacity:1!important}');
  console.log('Updated opacity override in index-B0-ePl6l.css');
} else {
  // Try regex
  indexCss = indexCss.replace(/\.HomeHero-module__root__X32-X,\.HomeHero-module__background__-bq4K\{background-image:[^!}]*!important[^}]*\}/g, '');
  indexCss = indexCss.replace(/\.HomeHero-module__backgroundImage__fqnu4\{opacity:0!important\}/g, '.HomeHero-module__backgroundImage__fqnu4{opacity:1!important}');
}

fs.writeFileSync(indexCssPath, indexCss, 'utf8');
console.log('Successfully patched public/index-B0-ePl6l.css');
