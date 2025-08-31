import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { glob } from 'glob';
import natural from 'natural';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MIN_WORDS = 250;
const MAX_SIMILARITY = 0.8;

// Usar librería Natural para similitud de texto
const similarity = (textA, textB) => {
  return natural.JaroWinklerDistance(textA, textB);
};

// Extraer texto limpio de HTML
const extractTextFromHtml = (html) => {
  return html
    .replace(/<script[^>]*>.*?<\/script>/gis, '')
    .replace(/<style[^>]*>.*?<\/style>/gis, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Procesar archivos HTML del dist
const processDistFiles = () => {
  const distPath = path.join(__dirname, '../dist');
  
  if (!fs.existsSync(distPath)) {
    console.warn(`⚠️  Dist folder not found. Run build first: ${distPath}`);
    return { analyzed: 0, thin: 0, duplicates: 0, toReview: [] };
  }

  // Buscar todos los archivos HTML de stories (cuento/ o story/)
  const patterns = [
    `${distPath}/cuento/**/*.html`,   // Español
    `${distPath}/story/**/*.html`,    // Inglés
    `${distPath}/stories/**/*.html`,  // Inglés alternativo
    `${distPath}/cuentos/**/*.html`   // Español alternativo
  ];
  
  let htmlFiles = [];
  patterns.forEach(pattern => {
    htmlFiles = htmlFiles.concat(glob.sync(pattern));
  });
  const contentHashes = new Map();
  const thinContent = [];
  const duplicates = [];
  
  if (htmlFiles.length === 0) {
    console.warn(`⚠️  No story HTML files found in dist folder.`);
    console.warn(`   Checked patterns: cuento/, story/, stories/, cuentos/`);
    return { analyzed: 0, thin: 0, duplicates: 0, thinContent: [], duplicateContent: [], qualityScore: 100 };
  }
  
  for (let i = 0; i < htmlFiles.length; i++) {
    const filePath = htmlFiles[i];
    const fileName = path.basename(filePath, '.html');
    
    try {
      const htmlContent = fs.readFileSync(filePath, 'utf8');
      const cleanText = extractTextFromHtml(htmlContent);
      const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
      
      // Detectar contenido thin
      if (wordCount < MIN_WORDS) {
        thinContent.push({
          name: fileName,
          words: wordCount,
          file: filePath
        });
        continue;
      }
      
      // Detectar duplicados
      let isDuplicate = false;
      for (const [existingIndex, existingText] of contentHashes) {
        if (similarity(existingText, cleanText) > MAX_SIMILARITY) {
          duplicates.push({
            name: fileName,
            file: filePath,
            duplicateOf: path.basename(htmlFiles[existingIndex], '.html'),
            similarity: Math.round(similarity(existingText, cleanText) * 100)
          });
          isDuplicate = true;
          break;
        }
      }
      
      if (!isDuplicate) {
        contentHashes.set(i, cleanText);
      }
    } catch (error) {
      console.warn(`⚠️  Error reading file ${filePath}: ${error.message}`);
    }
  }
  
  return {
    analyzed: htmlFiles.length,
    thin: thinContent.length,
    duplicates: duplicates.length,
    thinContent,
    duplicateContent: duplicates,
    qualityScore: Math.round(((htmlFiles.length - thinContent.length - duplicates.length) / htmlFiles.length) * 100)
  };
};

// Función principal
const runQualityGate = () => {
  console.log('🔍 Running Content Quality Analysis on HTML files...\n');
  
  const results = processDistFiles();
  
  // Reporte consolidado
  console.log('📊 QUALITY ANALYSIS REPORT');
  console.log('='.repeat(50));
  
  console.log(`\n📄 STORIES ANALYZED:`);
  console.log(`   Total stories: ${results.analyzed}`);
  console.log(`   Thin content: ${results.thin} stories (<${MIN_WORDS} words)`);
  console.log(`   Duplicates: ${results.duplicates} stories (>${MAX_SIMILARITY * 100}% similarity)`);
  console.log(`   Quality score: ${results.qualityScore}%`);
  
  // Listar contenido problemático
  const allIssues = [];
  
  if (results.thinContent.length > 0) {
    console.log(`\n⚠️  THIN CONTENT:`);
    results.thinContent.forEach(story => {
      console.log(`   • "${story.name}" (${story.words} words)`);
      allIssues.push(story.name);
    });
  }
  
  if (results.duplicateContent.length > 0) {
    console.log(`\n⚠️  DUPLICATE CONTENT:`);
    results.duplicateContent.forEach(story => {
      console.log(`   • "${story.name}" similar to "${story.duplicateOf}" (${story.similarity}%)`);
      allIssues.push(story.name);
    });
  }
  
  // Resumen final
  const totalIssues = allIssues.length;
  const overallQuality = Math.round(((results.analyzed - totalIssues) / results.analyzed) * 100);
  
  console.log(`\n📈 OVERALL QUALITY SCORE: ${overallQuality}%`);
  console.log(`   Total stories: ${results.analyzed}`);
  console.log(`   Issues found: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('\n✅ All content passes quality checks!');
  } else {
    console.log(`\n📋 Stories to review: ${totalIssues}`);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Quality gate analysis completed.\n');
};

// Ejecutar
runQualityGate();