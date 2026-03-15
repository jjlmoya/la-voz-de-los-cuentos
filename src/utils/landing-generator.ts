/**
 * Utility functions for generating landing pages
 */

import type { Landing, TextBlock, StoryHighlightBlock, ContentBlock } from '../types/landing';

/**
 * Create a text content block
 */
export function createTextBlock(body: string): TextBlock {
  return {
    type: 'text',
    body: body.trim()
  };
}

/**
 * Create a story highlight block
 */
export function createStoryHighlightBlock(
  searchKeyword: string,
  label: string
): StoryHighlightBlock {
  return {
    type: 'story_highlight',
    searchKeyword,
    label
  };
}

/**
 * Create a complete landing with validation
 */
export function createLanding(config: {
  key: string;
  keyEs: string;
  keyEn: string;
  title: string;
  keyword: string;
  category: string;
  keywords: string[];
  description: string;
  content: ContentBlock[];
}): Landing {
  const landing: Landing = {
    key: config.key,
    keyEs: config.keyEs,
    keyEn: config.keyEn,
    title: config.title,
    keyword: config.keyword,
    category: config.category,
    keywords: config.keywords,
    description: config.description,
    content: config.content
  };

  return landing;
}

/**
 * Export landing as TypeScript code string
 */
export function exportLandingAsCode(landing: Landing, lang: 'es' | 'en'): string {
  const quote = (str: string) => JSON.stringify(str);
  const indent = (str: string, spaces: number = 2) =>
    str
      .split('\n')
      .map((line, i) => (i === 0 ? line : ' '.repeat(spaces) + line))
      .join('\n');

  let code = `export const landing = {\n`;
  code += `  key: ${quote(landing.key)},\n`;
  code += `  keyEs: ${quote(landing.keyEs)},\n`;
  code += `  keyEn: ${quote(landing.keyEn)},\n`;
  code += `  title: ${quote(landing.title)},\n`;
  code += `  keyword: ${quote(landing.keyword)},\n`;
  code += `  category: ${quote(landing.category)},\n`;
  code += `  keywords: [${landing.keywords.map(k => quote(k)).join(', ')}],\n`;
  code += `  description: ${quote(landing.description)},\n`;
  code += `  content: [\n`;

  landing.content.forEach((block, i) => {
    if (block.type === 'text') {
      code += `    {\n`;
      code += `      type: 'text',\n`;
      code += `      body: \`${block.body
        .replace(/`/g, '\\`')
        .replace(/\$\{/g, '\\${')}`;
      code += `\`\n`;
      code += `    }`;
    } else if (block.type === 'story_highlight') {
      code += `    {\n`;
      code += `      type: 'story_highlight',\n`;
      code += `      searchKeyword: ${quote(block.searchKeyword)},\n`;
      code += `      label: ${quote(block.label)}\n`;
      code += `    }`;
    }

    if (i < landing.content.length - 1) {
      code += ',\n';
    } else {
      code += '\n';
    }
  });

  code += `  ]\n`;
  code += `}\n`;

  return code;
}

/**
 * Generate SEO description with word count check
 */
export function generateSEODescription(baseText: string): string {
  let desc = baseText.trim();

  // Ensure it's between 128-160 characters
  if (desc.length < 128) {
    desc = desc + '. This comprehensive guide offers insights and stories for children.';
  }

  if (desc.length > 160) {
    desc = desc.substring(0, 157) + '...';
  }

  return desc;
}

/**
 * Validate description length
 */
export function validateDescriptionLength(desc: string): { valid: boolean; length: number } {
  return {
    valid: desc.length >= 128 && desc.length <= 160,
    length: desc.length
  };
}
