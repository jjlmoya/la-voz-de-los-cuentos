import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function slugToCamelCase(slug) {
  return slug
    .split('-')
    .map((part, i) => {
      if (i === 0) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
}

const esLandingsDir = path.join(__dirname, '../src/data/landings/es');
const enLandingsDir = path.join(__dirname, '../src/data/landings/en');

const esFiles = fs.readdirSync(esLandingsDir)
  .filter(f => f.endsWith('.ts'))
  .sort();

const enFiles = fs.readdirSync(enLandingsDir)
  .filter(f => f.endsWith('.ts'))
  .sort();

let indexContent = '';

// Generate ES imports
indexContent += '// Spanish Landings\n';
const esImports = [];
esFiles.forEach(file => {
  const slug = file.replace('.ts', '');
  const varName = slugToCamelCase(slug) + 'Es';
  indexContent += `import { landing as ${varName} } from './es/${slug}'\n`;
  esImports.push({ file, varName });
});

indexContent += '\n// English Landings\n';
const enImports = [];
enFiles.forEach(file => {
  const slug = file.replace('.ts', '');
  const varName = slugToCamelCase(slug) + 'En';
  indexContent += `import { landing as ${varName} } from './en/${slug}'\n`;
  enImports.push({ file, varName });
});

// Generate export arrays
indexContent += '\nexport const landingsEs = [\n';
esImports.forEach(imp => {
  indexContent += `  ${imp.varName},\n`;
});
indexContent += ']\n\n';

indexContent += 'export const landingsEn = [\n';
enImports.forEach(imp => {
  indexContent += `  ${imp.varName},\n`;
});
indexContent += ']\n';

// Write file
const indexPath = path.join(__dirname, '../src/data/landings/index.ts');
fs.writeFileSync(indexPath, indexContent);

console.log(`✅ Generated index.ts with:`);
console.log(`   ${esImports.length} Spanish landings`);
console.log(`   ${enImports.length} English landings`);
