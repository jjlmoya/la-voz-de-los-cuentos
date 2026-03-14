#!/usr/bin/env node

/**
 * Script para validar que todos los cuentos estén categorizados
 */

import fs from 'fs';
import { storyTags as storyTagsEs } from './src/data/es/storyTags.ts';

// Cargar datos
const storiesEs = JSON.parse(fs.readFileSync('./src/data/es/stories.json', 'utf-8'));

console.log('\n📚 VALIDANDO CATEGORIZACIÓN DE CUENTOS (ESPAÑOL)\n');

// Obtener todos los slugs de cuentos
const allStorySlugs = new Set(storiesEs.map(s => s.key));
console.log(`✅ Total de cuentos en stories.json: ${allStorySlugs.size}`);

// Obtener todos los slugs categorizados
const categorizedSlugs = new Set();
Object.entries(storyTagsEs).forEach(([category, slugs]) => {
  slugs.forEach(slug => {
    categorizedSlugs.add(slug);
  });
});

console.log(`✅ Total de cuentos categorizados: ${categorizedSlugs.size}`);

// Encontrar cuentos no categorizados
const uncategorized = [];
allStorySlugs.forEach(slug => {
  if (!categorizedSlugs.has(slug)) {
    const story = storiesEs.find(s => s.key === slug);
    uncategorized.push({ slug, name: story?.name });
  }
});

if (uncategorized.length > 0) {
  console.log(`\n❌ CUENTOS SIN CATEGORIZAR: ${uncategorized.length}\n`);
  uncategorized.slice(0, 20).forEach(s => {
    console.log(`  - ${s.slug}`);
  });
  if (uncategorized.length > 20) {
    console.log(`  ... y ${uncategorized.length - 20} más\n`);
  }
} else {
  console.log(`\n✅ TODOS LOS CUENTOS ESTÁN CATEGORIZADOS!\n`);
}

// Encontrar slugs fantasma
const phantomSlugs = [];
Object.entries(storyTagsEs).forEach(([category, slugs]) => {
  slugs.forEach(slug => {
    if (!allStorySlugs.has(slug)) {
      phantomSlugs.push({ slug, category });
    }
  });
});

if (phantomSlugs.length > 0) {
  console.log(`\n⚠️  SLUGS FANTASMA (no existen): ${phantomSlugs.length}\n`);
  phantomSlugs.forEach(s => {
    console.log(`  - ${s.slug} (en: ${s.category})`);
  });
}

// Reporte de cobertura
const coverage = (categorizedSlugs.size / allStorySlugs.size) * 100;
console.log(`\n📊 COBERTURA: ${coverage.toFixed(2)}% (${categorizedSlugs.size}/${allStorySlugs.size})`);

process.exit(phantomSlugs.length > 0 ? 1 : 0);
