#!/usr/bin/env node

import { getPosts } from '../src/data/index.js';

const MIN_WORDS = 1500;

function hasMarkdown(text) {
  if (typeof text !== 'string') return false;
  const markdownPatterns = [
    /\*\*[^*]+\*\*/, // bold **
    /__(?:[^_]|_[^_])+__/, // bold __
    /\*[^*][^*]+\*/, // italic * (at least 2 chars to avoid common bullets or math)
    /\[[^\]]+\]\([^)]+\)/, // links [text](url)
    /`[^`]+`/, // inline code
  ];
  return markdownPatterns.some(pattern => pattern.test(text));
}

function checkMarkdownInBlocks(blocks) {
  const issues = [];
  blocks.forEach((block, index) => {
    let fieldsToCheck = [];
    switch (block.type) {
      case 'text':
      case 'quote':
      case 'highlight':
        fieldsToCheck = [block.body || block.text];
        break;
      case 'heading':
        fieldsToCheck = [block.text];
        break;
      case 'list':
        fieldsToCheck = block.items || [];
        break;
      case 'table':
      case 'story_table':
        fieldsToCheck = (block.rows || []).flat();
        break;
      case 'steps':
        fieldsToCheck = (block.items || []).flatMap(i => [i.title, i.body]);
        break;
      case 'comparison':
        fieldsToCheck = [
          block.left?.title,
          ...(block.left?.items || []),
          block.right?.title,
          ...(block.right?.items || [])
        ];
        break;
      case 'stats':
        fieldsToCheck = (block.items || []).map(i => i.label);
        break;
      case 'story_recommendation':
        fieldsToCheck = [block.title, block.description];
        break;
    }

    fieldsToCheck.forEach(field => {
      if (hasMarkdown(field)) {
        issues.push(`Block ${index} (${block.type}) contains Markdown: "${field.substring(0, 30)}..."`);
      }
    });
  });
  return issues;
}

function countWords(blocks) {
  return (blocks || []).reduce((total, block) => {
    switch (block.type) {
      case 'text':
        return total + (block.body ? block.body.trim().split(/\s+/).length : 0);
      case 'heading':
        return total + (block.text ? block.text.trim().split(/\s+/).length : 0);
      case 'list':
        return total + (block.items ? block.items.join(' ').trim().split(/\s+/).length : 0);
      case 'table':
      case 'story_table':
        return total + (block.rows ? block.rows.flat().join(' ').trim().split(/\s+/).length : 0);
      case 'quote':
        return total + (block.text ? block.text.trim().split(/\s+/).length : 0);
      case 'highlight':
        return total + (block.body ? block.body.trim().split(/\s+/).length : 0);
      case 'steps':
        return total + (block.items ? block.items.map(i => `${i.title} ${i.body}`).join(' ').trim().split(/\s+/).length : 0);
      case 'comparison':
        const left = block.left ? [block.left.title, ...block.left.items].join(' ') : '';
        const right = block.right ? [block.right.title, ...block.right.items].join(' ') : '';
        return total + `${left} ${right}`.trim().split(/\s+/).length;
      case 'stats':
        return total + (block.items ? block.items.map(i => i.label).join(' ').trim().split(/\s+/).length : 0);
      case 'story_recommendation': {
        const title = block.title || '';
        return total + `${title} ${block.description}`.trim().split(/\s+/).length;
      }
      default:
        return total;
    }
  }, 0);
}

function validateBilingualPosts() {
  const postsEs = getPosts('es');
  const postsEn = getPosts('en');

  let passed = true;
  const errors = [];
  const warnings = [];

  // Test 1: Same number of posts in both languages
  if (postsEs.length !== postsEn.length) {
    passed = false;
    errors.push(
      `❌ Post count mismatch: ES has ${postsEs.length}, EN has ${postsEn.length}`
    );
  } else {
    console.log(`✅ Post count matches: ${postsEs.length} posts in both languages`);
  }

  // Test 2: Check slug correspondence
  const slugMapEs = new Map(postsEs.map(p => [p.slug, p]));
  const slugMapEnBySlugEn = new Map(postsEn.map(p => [p.slug, p]));

  for (const postEn of postsEn) {
    if (postEn.slugEs && slugMapEs.has(postEn.slugEs)) {
      const correspondingPostEs = slugMapEs.get(postEn.slugEs);
      if (correspondingPostEs.slugEn !== postEn.slug) {
        errors.push(
          `❌ Slug mismatch: ES "${postEn.slugEs}" should have slugEn="${postEn.slug}" but has "${correspondingPostEs.slugEn}"`
        );
        passed = false;
      }
    }
  }

  if (errors.length === 0 && postsEn.length > 0) {
    console.log(`✅ All slug mappings are correct`);
  }

  // Test 3: Check for orphaned posts (posts without pair)
  const pairedSlugsEs = new Set(postsEs.map(p => p.slugEn).filter(Boolean));
  const pairedSlugsEn = new Set(postsEn.map(p => p.slugEs).filter(Boolean));

  for (const postEs of postsEs) {
    if (!pairedSlugsEn.has(postEs.slug)) {
      warnings.push(
        `⚠️  Spanish post "${postEs.slug}" has no corresponding English post`
      );
    }
  }

  for (const postEn of postsEn) {
    if (!pairedSlugsEs.has(postEn.slug)) {
      warnings.push(
        `⚠️  English post "${postEn.slug}" has no corresponding Spanish post`
      );
    }
  }

  // Test 4: Validate content blocks exist
  for (const post of [...postsEs, ...postsEn]) {
    if (!Array.isArray(post.content) || post.content.length === 0) {
      errors.push(
        `❌ Post "${post.slug}" (${post.title}) has no content blocks`
      );
      passed = false;
    }
  }

  if (errors.length === 0 && postsEn.length > 0) {
    console.log(`✅ All posts have content blocks`);
  }

  // Test 5: Validate required fields
  const requiredFields = ['slug', 'title', 'description', 'date', 'category', 'tags', 'content'];

  for (const post of [...postsEs, ...postsEn]) {
    const missingFields = requiredFields.filter(field => !post[field]);
    if (missingFields.length > 0) {
      errors.push(
        `❌ Post "${post.slug}" missing fields: ${missingFields.join(', ')}`
      );
      passed = false;
    }
  }

  if (errors.length === 0 && postsEn.length > 0) {
    console.log(`✅ All posts have required fields`);
  }

  // Test 6: Validate minimum word count (1500 words)
  console.log(`\n📝 Testing minimum word count (${MIN_WORDS} words):`);
  for (const post of [...postsEs, ...postsEn]) {
    const wordCount = countWords(post.content);
    if (wordCount < MIN_WORDS) {
      const lang = postsEs.includes(post) ? 'ES' : 'EN';
      errors.push(
        `❌ Post "${post.slug}" [${lang}] has only ${wordCount} words (Minimum required: ${MIN_WORDS})`
      );
      passed = false;
    } else {
      // Avoid cluttering but show progress
    }
  }

  if (passed) {
    console.log(`✅ All posts meet the minimum length of ${MIN_WORDS} words`);
  }

  // Test 7: Validate at least one story_recommendation block
  console.log(`\n📝 Testing story recommendations:`);
  for (const post of [...postsEs, ...postsEn]) {
    const hasRecommendation = post.content.some(block => block.type === 'story_recommendation');
    if (!hasRecommendation) {
      const lang = postsEs.includes(post) ? 'ES' : 'EN';
      errors.push(
        `❌ Post "${post.slug}" [${lang}] is missing at least one 'story_recommendation' block`
      );
      passed = false;
    }
  }

  if (errors.length === 0 && postsEn.length > 0) {
    console.log(`✅ All posts have at least one story recommendation`);
  }

  // Test 8: Detect Markdown in text
  console.log(`\n📝 Testing for Markdown usage (forbidden):`);
  for (const post of [...postsEs, ...postsEn]) {
    const markdownIssues = checkMarkdownInBlocks(post.content);
    if (markdownIssues.length > 0) {
      const lang = postsEs.includes(post) ? 'ES' : 'EN';
      markdownIssues.forEach(issue => {
        errors.push(`❌ Post "${post.slug}" [${lang}] ${issue}`);
      });
      passed = false;
    }
  }

  if (passed) {
    console.log(`✅ No Markdown detected in post content`);
  }

  // Print results
  console.log('\n' + '='.repeat(60));
  if (errors.length > 0) {
    console.log('\n🔴 ERRORS:\n');
    errors.forEach(err => console.log(err));
  }

  if (warnings.length > 0) {
    console.log('\n🟡 WARNINGS:\n');
    warnings.forEach(warn => console.log(warn));
  }

  console.log('\n' + '='.repeat(60));

  if (passed) {
    console.log('\n✅ All bilingual post tests PASSED\n');
    return 0;
  } else {
    console.log('\n❌ Some bilingual post tests FAILED\n');
    return 1;
  }
}

const exitCode = validateBilingualPosts();
process.exit(exitCode);
