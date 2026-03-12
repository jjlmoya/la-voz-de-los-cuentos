#!/usr/bin/env node

import { getPosts } from '../src/data/index.js';

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
