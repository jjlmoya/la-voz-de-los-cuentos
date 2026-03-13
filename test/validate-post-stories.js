#!/usr/bin/env node

/**
 * Test para validar que:
 * 1. Todos los slugs de historias existan en la colección correcta
 * 2. Posts en español usen stories españolas
 * 3. Posts en inglés usen stories inglesas
 * 4. No haya mezcla de idiomas
 *
 * Uso: node test/validate-post-stories.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar stories en ambos idiomas
const storiesEsPath = path.join(__dirname, '../src/data/es/stories.json');
const storiesEnPath = path.join(__dirname, '../src/data/en/stories.json');

const storiesEs = JSON.parse(fs.readFileSync(storiesEsPath, 'utf8'));
const existingKeysEs = new Set(storiesEs.map(s => s.key));

let storiesEn = null;
let existingKeysEn = null;

if (fs.existsSync(storiesEnPath)) {
  storiesEn = JSON.parse(fs.readFileSync(storiesEnPath, 'utf8'));
  existingKeysEn = new Set(storiesEn.map(s => s.key));
}

// Función para extraer todos los slugs de un post
function extractSlugsFromPost(post) {
  const slugs = [];

  function traverse(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(traverse);
    } else if (obj !== null && typeof obj === 'object') {
      // Buscar slugs en propiedades relevantes
      if (obj.slug && typeof obj.slug === 'string') {
        slugs.push(obj.slug);
      }
      // Buscar en rows de tablas
      if (obj.rows && Array.isArray(obj.rows)) {
        obj.rows.forEach(row => {
          if (Array.isArray(row)) {
            row.forEach(cell => {
              if (typeof cell === 'string' && cell.includes('-')) {
                // Podría ser un slug - lo añadimos sin verificar aún
                slugs.push(cell);
              }
            });
          }
        });
      }
      // Recurrir en propiedades
      Object.values(obj).forEach(traverse);
    }
  }

  traverse(post);

  // Filtrar solo slugs que parecen ser de historias (no son slugs de posts)
  // Un slug de post es el 'slug' y 'slugEn' en la raíz
  // También filtrar números de edad como "2-3 años" o "3-5 years"
  return slugs.filter(s => {
    // Excluir slugs de posts
    if (s === post.slug || s === post.slugEn || s === post.slugEs) return false;
    // Excluir rangos de edad (números-números)
    if (/^\d+-\d+/.test(s)) return false;
    return true;
  });
}

// Cargar posts
const postsDir = path.join(__dirname, '../src/data/posts');
const posts = [];

['es', 'en'].forEach(lang => {
  const langDir = path.join(postsDir, lang);
  if (fs.existsSync(langDir)) {
    fs.readdirSync(langDir).forEach(file => {
      if (file.endsWith('.ts')) {
        const filePath = path.join(langDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        // Extraer export const post = {...}
        const postMatch = content.match(/export const post = ({[\s\S]*?^})/m);
        if (postMatch) {
          try {
            // Evaluar el objeto JavaScript
            const post = eval(`(${postMatch[1]})`);
            posts.push({
              file: `${lang}/${file}`,
              lang,
              post
            });
          } catch (e) {
            console.error(`Error parsing ${file}:`, e.message);
          }
        }
      }
    });
  }
});

// Validar slugs
console.log('\n=== VALIDACIÓN DE SLUGS EN POSTS ===\n');

let totalErrors = 0;
const results = {};

posts.forEach(({ file, lang, post }) => {
  const slugs = extractSlugsFromPost(post);

  if (slugs.length === 0) {
    return; // Este post no tiene stories
  }

  console.log(`📄 ${file}`);

  const validKeys = lang === 'es' ? existingKeysEs : existingKeysEn;
  const validKeysOther = lang === 'es' ? existingKeysEn : existingKeysEs;
  const langName = lang === 'es' ? 'español' : 'inglés';
  const otherLangName = lang === 'es' ? 'inglés' : 'español';

  slugs.forEach(slug => {
    const inCorrectLang = validKeys && validKeys.has(slug);
    const inOtherLang = validKeysOther && validKeysOther.has(slug);

    let status = '?';
    let message = '';

    if (inCorrectLang) {
      status = '✓';
      message = `(${langName})`;
    } else if (inOtherLang) {
      status = '✗';
      message = `❌ MEZCLA DE IDIOMAS: Este es un slug de ${otherLangName}`;
      totalErrors++;
    } else {
      status = '✗';
      message = `❌ NO ENCONTRADO`;
      totalErrors++;
    }

    console.log(`  ${status} ${slug} ${message}`);

    if (status === '✗') {
      if (!results[slug]) {
        results[slug] = [];
      }
      results[slug].push(file);
    }
  });

  console.log('');
});

// Reporte final
console.log('\n=== REPORTE FINAL ===\n');
console.log(`Total de historias en colección ES: ${storiesEs.length}`);
if (storiesEn) console.log(`Total de historias en colección EN: ${storiesEn.length}`);
console.log(`Posts analizados: ${posts.length}`);

if (totalErrors === 0) {
  console.log('\n✅ TODOS LOS SLUGS SON VÁLIDOS Y ESTÁN EN EL IDIOMA CORRECTO\n');
  process.exit(0);
} else {
  console.log(`\n❌ ERRORES ENCONTRADOS: ${totalErrors}\n`);
  console.log('Problemas detectados:');
  Object.entries(results).forEach(([slug, files]) => {
    console.log(`  - ${slug} (usado en: ${files.join(', ')})`);
  });
  console.log('');
  process.exit(1);
}
