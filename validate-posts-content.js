#!/usr/bin/env node

/**
 * Post Content Validation Script
 *
 * OBLIGATORY VALIDATIONS:
 * 1. All posts MUST have at least one story_recommendation
 * 2. The FIRST story_recommendation MUST be in the first 1/3 of the post (before block 33%)
 * 3. The recommendation must be ORGANIC (has context blocks before it, not at the very start)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract all content blocks by counting type declarations
function extractBlocks(fileContent) {
  const blocks = [];
  const typePattern = /type:\s*["']([^"']+)["']/g;
  let match;

  while ((match = typePattern.exec(fileContent)) !== null) {
    blocks.push({ type: match[1] });
  }

  return blocks;
}

// Extract title from file
function extractTitle(fileContent) {
  const match = fileContent.match(/title:\s*["']([^"']+)["']/);
  return match ? match[1] : 'Unknown';
}

// Get all post files from a directory
function getPostFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.ts') && f !== 'index.ts')
      .map(f => path.join(dir, f));
  } catch {
    return [];
  }
}

// Validate posts
function validatePosts(lang, dir) {
  const files = getPostFiles(dir);
  if (files.length === 0) return { passed: 0, failed: 0, results: [] };

  const results = [];

  files.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const title = extractTitle(fileContent);
    const blocks = extractBlocks(fileContent);

    if (blocks.length === 0) {
      results.push({ title, passed: false, message: 'Could not parse content' });
      return;
    }

    const totalBlocks = blocks.length;
    const thirdPoint = Math.ceil(totalBlocks / 3);

    const recommendationIndices = blocks
      .map((block, idx) => ({ type: block.type, index: idx }))
      .filter(({ type }) => type === 'story_recommendation')
      .map(b => b.index);

    if (recommendationIndices.length === 0) {
      results.push({
        title,
        passed: false,
        message: '❌ FALLO OBLIGATORIO: NO tiene ninguna recomendación de cuento'
      });
      return;
    }

    const firstRecommendationIndex = recommendationIndices[0];
    if (firstRecommendationIndex >= thirdPoint) {
      results.push({
        title,
        passed: false,
        message: `❌ FALLO OBLIGATORIO: Recomendación en bloque ${firstRecommendationIndex + 1}/${totalBlocks} (debe estar antes de ${thirdPoint})`
      });
      return;
    }

    const isOrganic = firstRecommendationIndex >= 3;
    const organicMsg = isOrganic ? '(orgánica ✓)' : '(muy temprana ⚠️)';

    results.push({
      title,
      passed: true,
      message: `✅ story_recommendation en bloque ${firstRecommendationIndex + 1}/${totalBlocks} ${organicMsg}`
    });
  });

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  return { passed, failed, results };
}

// Main execution
const esDir = path.join(__dirname, 'src/data/posts/es');
const enDir = path.join(__dirname, 'src/data/posts/en');

console.log('\n📚 VALIDACIÓN DE CONTENIDO DE POSTS\n');

const esValidation = validatePosts('ES', esDir);
const enValidation = validatePosts('EN', enDir);

console.log('🇪🇸 SPANISH POSTS:\n');
esValidation.results.forEach(r => {
  console.log(`  ${r.message}`);
  console.log(`     "${r.title}"\n`);
});

console.log('\n🇬🇧 ENGLISH POSTS:\n');
enValidation.results.forEach(r => {
  console.log(`  ${r.message}`);
  console.log(`     "${r.title}"\n`);
});

// Summary
const totalPassed = esValidation.passed + enValidation.passed;
const totalFailed = esValidation.failed + enValidation.failed;
const total = totalPassed + totalFailed;

console.log('\n📊 SUMMARY:\n');
console.log(`✅ Passed: ${totalPassed}/${total}`);
console.log(`❌ Failed: ${totalFailed}/${total}`);
console.log(`📈 Coverage: ${((totalPassed / total) * 100).toFixed(2)}%\n`);

process.exit(totalFailed > 0 ? 1 : 0);
