#!/usr/bin/env node

import { getPosts } from '../src/data/index.js';

const MIN_WORDS = 1500;

function countWords(blocks) {
  return blocks.reduce((total, block) => {
    switch (block.type) {
      case 'text':
        return total + (block.body ? block.body.split(/\s+/).length : 0);
      case 'heading':
        return total + (block.text ? block.text.split(/\s+/).length : 0);
      case 'list':
        return total + (block.items ? block.items.join(' ').split(/\s+/).length : 0);
      case 'table':
        return total + (block.rows ? block.rows.flat().join(' ').split(/\s+/).length : 0);
      case 'quote':
        return total + (block.text ? block.text.split(/\s+/).length : 0);
      case 'highlight':
        return total + (block.body ? block.body.split(/\s+/).length : 0);
      default:
        return total;
    }
  }, 0);
}

function testSeoContent() {
  const postsEs = getPosts('es');
  const postsEn = getPosts('en');
  const allPosts = [...postsEs.map(p => ({ ...p, lang: 'es' })), ...postsEn.map(p => ({ ...p, lang: 'en' }))];

  let passed = true;
  let passCount = 0;
  let failCount = 0;

  console.log(`\n📊 Testing SEO Content (Min ${MIN_WORDS} words)\n`);
  console.log('='.repeat(70));

  for (const post of allPosts) {
    const wordCount = countWords(post.content || []);
    const status = wordCount >= MIN_WORDS ? '✅' : '❌';

    if (wordCount >= MIN_WORDS) {
      passCount++;
      console.log(`${status} [${post.lang.toUpperCase()}] "${post.title}" (${wordCount} words)`);
    } else {
      failCount++;
      passed = false;
      console.log(`${status} [${post.lang.toUpperCase()}] "${post.title}" (${wordCount} words - FAILED)`);
    }
  }

  console.log('='.repeat(70));
  console.log(`\n📈 Results: ${passCount} passed, ${failCount} failed\n`);

  return passed ? 0 : 1;
}

const exitCode = testSeoContent();
process.exit(exitCode);
