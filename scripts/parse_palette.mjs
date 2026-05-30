import fs from 'fs';
import path from 'path';

const filePath = path.join('docs', 'research', 'alpinaire.com', 'palette.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(rawData);

let output = `Total elements in palette: ${data.length}\n`;

const classesMap = new Map();

for (const el of data) {
  if (!el.className) continue;
  const classes = el.className.split(' ');
  for (const cls of classes) {
    if (!cls) continue;
    const baseClass = cls.replace(/__[a-zA-Z0-9_-]{5}$/, '');
    if (!classesMap.has(baseClass)) {
      classesMap.set(baseClass, []);
    }
    classesMap.get(baseClass).push(el);
  }
}

output += `Distinct base classes found: ${classesMap.size}\n`;

const modules = [
  'Header', 'MenuButton', 'LogoHeader', 'Logo', 'Menu', 
  'HomeHero', 'BlockTextColumn', 'HomeKeywords', 'HomeTextVisuals', 
  'BlockProjects', 'ProjectsGrid', 'ProjectCard', 
  'Footer', 'Socials', 'LegalInfos', 'LegalNotice', 'CookiesBanner'
];

for (const mod of modules) {
  output += `\n=================== MODULE: ${mod} ===================\n`;
  for (const [cls, list] of classesMap.entries()) {
    if (cls.startsWith(mod)) {
      const representative = list[0];
      output += `Class: ${cls}\n`;
      output += `  Tag: ${representative.tag}\n`;
      output += `  Styles: ${JSON.stringify(filterDefaultStyles(representative), null, 2)}\n`;
    }
  }
}

function filterDefaultStyles(el) {
  const styles = {};
  const defaults = {
    color: 'rgb(0, 0, 0)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgb(0, 0, 0)',
    fontFamily: 'UCity, sans-serif',
    fontSize: '30px',
    lineHeight: '34.5px',
    letterSpacing: 'normal',
    fontWeight: '400',
    borderRadius: '0px',
    border: 'none',
    boxShadow: 'none',
    opacity: '1',
    transform: 'none',
    position: 'static',
    zIndex: 'auto',
    display: 'block'
  };

  for (const [k, v] of Object.entries(el)) {
    if (k === 'tag' || k === 'className') continue;
    if (v && v !== defaults[k] && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') {
      styles[k] = v;
    }
  }
  return styles;
}

fs.writeFileSync(path.join('docs', 'research', 'alpinaire.com', 'class-styles.txt'), output, 'utf8');
console.log('Class styles written successfully!');
