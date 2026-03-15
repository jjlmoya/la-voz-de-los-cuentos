/**
 * Landing page content types and structures
 */

export type ContentBlockType = 'text' | 'story_highlight' | 'story_table';

/**
 * Text block with HTML content
 */
export interface TextBlock {
  type: 'text';
  body: string;
}

/**
 * Story highlight block - displays related stories by tag
 */
export interface StoryHighlightBlock {
  type: 'story_highlight';
  searchKeyword: string; // Tag to search stories
  label: string; // Display label for the section
}

/**
 * Story table block - displays stories in table format
 */
export interface StoryTableBlock {
  type: 'story_table';
  headers: string[];
  rows: string[][];
}

export type ContentBlock = TextBlock | StoryHighlightBlock | StoryTableBlock;

/**
 * Complete landing page structure
 */
export interface Landing {
  // Unique identifier for the landing
  key: string;

  // Bilingual keys for lookups
  keyEs: string;
  keyEn: string;

  // Display title
  title: string;

  // Main SEO keyword
  keyword: string;

  // Category from storyTags (e.g., 'miedo', 'aventura', 'dormir')
  category: string;

  // Keywords to match stories (used in story_highlight blocks)
  keywords: string[];

  // SEO meta description (128-160 chars, plain text, no HTML)
  description: string;

  // Page content blocks
  content: ContentBlock[];
}

/**
 * Validates that a landing has the correct structure
 */
export function validateLanding(landing: Landing): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required fields
  if (!landing.key) errors.push('Missing key');
  if (!landing.keyEs) errors.push('Missing keyEs');
  if (!landing.keyEn) errors.push('Missing keyEn');
  if (!landing.title) errors.push('Missing title');
  if (!landing.keyword) errors.push('Missing keyword');
  if (!landing.category) errors.push('Missing category');
  if (!Array.isArray(landing.keywords) || landing.keywords.length === 0) {
    errors.push('Missing or empty keywords array');
  }

  // Validate description
  if (!landing.description) {
    errors.push('Missing description');
  } else {
    const desc = landing.description;
    if (desc.length < 128 || desc.length > 160) {
      errors.push(`Description length ${desc.length} chars (need 128-160)`);
    }
    if (/<[^>]*>/.test(desc)) {
      errors.push('Description contains HTML (should be plain text)');
    }
  }

  // Validate content
  if (!Array.isArray(landing.content) || landing.content.length === 0) {
    errors.push('Missing or empty content array');
  } else {
    // Check first block is text
    if (landing.content[0]?.type !== 'text') {
      errors.push('First content block must be type "text"');
    }

    // Validate content block types
    landing.content.forEach((block, idx) => {
      if (!['text', 'story_highlight', 'story_table'].includes(block.type)) {
        errors.push(`Block ${idx}: Invalid type "${block.type}"`);
      }
    });

    // Check for forbidden blocks
    const forbidden = landing.content.filter((b: any) =>
      b.type === 'stories_gallery' || b.type === 'story_recommendation'
    );
    if (forbidden.length > 0) {
      errors.push(`Found ${forbidden.length} forbidden block type(s)`);
    }

    // Check word count
    const allText = landing.content
      .filter((b): b is TextBlock => b.type === 'text')
      .map(b => b.body)
      .join(' ')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const wordCount = allText.split(/\s+/).length;
    if (wordCount < 1000) {
      errors.push(`Content has only ${wordCount} words (need 1000+)`);
    }

    // Check heading counts
    const h1Count = (allText.match(/<h1/gi) || []).length;
    const h2Count = (allText.match(/<h2/gi) || []).length;

    if (h1Count > 0) {
      errors.push(`Content has ${h1Count} H1 heading(s) (should have 0 - H1 comes from page title)`);
    }
    if (h2Count < 3) {
      errors.push(`Content has only ${h2Count} H2 heading(s) (need at least 3)`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
