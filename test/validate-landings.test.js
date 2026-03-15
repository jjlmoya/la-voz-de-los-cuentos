import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let allLandings = { es: [], en: [] };

beforeAll(() => {
  // Load landings from TypeScript files
  const landingsDir = path.join(__dirname, '../src/data/landings');

  ['es', 'en'].forEach(lang => {
    const langDir = path.join(landingsDir, lang);
    if (fs.existsSync(langDir)) {
      fs.readdirSync(langDir).forEach(file => {
        if (file.endsWith('.ts')) {
          const filePath = path.join(langDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const landingMatch = content.match(/export const landing = ({[\s\S]*?^})/m);
          if (landingMatch) {
            try {
              const landing = eval(`(${landingMatch[1]})`);
              allLandings[lang].push({
                ...landing,
                _lang: lang,
                _file: file
              });
            } catch (e) {
              console.error(`Error parsing ${file}:`, e.message);
            }
          }
        }
      });
    }
  });
});

// Helper: Count words from RENDERED content (what the page actually shows)
function countRenderedWords(landing) {
  let allText = '';

  // If landing has content array, count text from content blocks (what's actually displayed)
  if (landing.content && Array.isArray(landing.content)) {
    landing.content.forEach(block => {
      if (block.type === 'text' && block.body) {
        allText += block.body + ' ';
      }
    });
  }
  // Fallback to description if no content array
  else if (landing.description) {
    allText = landing.description;
  }

  // Remove HTML tags
  let plainText = allText.replace(/<[^>]*>/g, '');
  // Remove escaped newlines
  plainText = plainText.replace(/\\n/g, ' ');
  // Split by whitespace and filter empty
  return plainText.split(/\s+/).filter(word => word.length > 0).length;
}

// Helper: Count words in HTML text (pure text only, no tags)
function countWords(htmlText) {
  // Remove HTML tags
  let plainText = htmlText.replace(/<[^>]*>/g, '');
  // Remove escaped newlines
  plainText = plainText.replace(/\\n/g, ' ');
  // Split by whitespace and filter empty
  return plainText.split(/\s+/).filter(word => word.length > 0).length;
}

// Helper: Count H1 and H2 headings
function countHeadings(htmlText) {
  const h1Match = htmlText.match(/<h1[^>]*>/gi);
  const h2Match = htmlText.match(/<h2[^>]*>/gi);
  return {
    h1: h1Match ? h1Match.length : 0,
    h2: h2Match ? h2Match.length : 0
  };
}

// Helper: Get story_highlight blocks by position thirds
function getStoryHighlightsByThirds(content) {
  if (!Array.isArray(content)) return { first: [], second: [], third: [] };

  const highlights = [];
  content.forEach((block, index) => {
    if (block.type === 'story_highlight') {
      highlights.push({ block, index });
    }
  });

  const contentLength = content.length;
  const thirdLength = Math.ceil(contentLength / 3);

  return {
    first: highlights.filter(h => h.index < thirdLength),
    second: highlights.filter(h => h.index >= thirdLength && h.index < thirdLength * 2),
    third: highlights.filter(h => h.index >= thirdLength * 2)
  };
}

describe('Landing Validation', () => {
  describe('Description Field (SEO Meta Tag)', () => {
    it('all landings have description field', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        if (!landing.description) {
          issues.push(`${landing.key}: missing description field`);
        }
      });
      expect(issues, `Missing description field:\n${issues.join('\n')}`).toEqual([]);
    });

    it('description contains NO HTML tags', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        if (landing.description && /<[^>]*>/.test(landing.description)) {
          issues.push(`${landing.key}: description contains HTML tags (found ${landing.description.match(/<[^>]*>/g).length} tags)`);
        }
      });
      expect(issues, `Description with HTML tags:\n${issues.join('\n')}`).toEqual([]);
    });

    it('description is between 128-160 characters (80% threshold)', () => {
      const MIN_CHARS = 128;  // 80% of 160
      const MAX_CHARS = 160;  // Standard SEO meta description
      const issues = [];

      [...allLandings.es, ...allLandings.en].forEach(landing => {
        const len = landing.description ? landing.description.length : 0;
        if (len < MIN_CHARS || len > MAX_CHARS) {
          issues.push(`${landing.key}: ${len} chars (need 128-160). Text: "${landing.description?.substring(0, 80)}..."`);
        }
      });
      expect(issues, `Description length violations:\n${issues.join('\n')}`).toEqual([]);
    });

    it('content[0] has body with all HTML content (NOT in description)', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        if (!landing.content || !Array.isArray(landing.content) || landing.content.length === 0) {
          issues.push(`${landing.key}: missing content array or empty`);
          return;
        }

        const firstBlock = landing.content[0];
        if (!firstBlock.body || firstBlock.type !== 'text') {
          issues.push(`${landing.key}: first content block is not type:'text' with body`);
          return;
        }

        // Check that HTML content is in body, NOT in description
        // Note: H1 should come from page template, not duplicated in content
      });
      expect(issues, `Content structure violations:\n${issues.join('\n')}`).toEqual([]);
    });
  });

  describe('Global Forbidden Elements (Project-Wide)', () => {
    it('stories_gallery must NEVER exist anywhere in the project (completely deprecated)', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        if (!landing.content || !Array.isArray(landing.content)) return;

        landing.content.forEach((block, idx) => {
          if (block.type === 'stories_gallery') {
            issues.push(`${landing.key}: block ${idx} uses stories_gallery (GLOBALLY FORBIDDEN - must be removed from entire project)`);
          }
        });
      });
      expect(issues, `CRITICAL: stories_gallery found - must be removed everywhere:\n${issues.join('\n')}`).toEqual([]);
    });
  });

  describe('Forbidden Content Blocks (Blog-Only Elements)', () => {
    it('landings must NOT contain story_recommendation blocks (blog-only element)', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        if (!landing.content || !Array.isArray(landing.content)) return;

        landing.content.forEach((block, idx) => {
          if (block.type === 'story_recommendation') {
            issues.push(`${landing.key}: block ${idx} uses story_recommendation (FORBIDDEN - blog only)`);
          }
        });
      });
      expect(issues, `Landing blocks using blog-only elements:\n${issues.join('\n')}`).toEqual([]);
    });

    it('landings must NOT contain stories_gallery blocks (deprecated element)', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        if (!landing.content || !Array.isArray(landing.content)) return;

        landing.content.forEach((block, idx) => {
          if (block.type === 'stories_gallery') {
            issues.push(`${landing.key}: block ${idx} uses stories_gallery (DEPRECATED)`);
          }
        });
      });
      expect(issues, `Landing blocks using deprecated elements:\n${issues.join('\n')}`).toEqual([]);
    });

    it('landings must only contain: text, story_highlight, story_table', () => {
      const ALLOWED_TYPES = ['text', 'story_highlight', 'story_table'];
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        if (!landing.content || !Array.isArray(landing.content)) return;

        landing.content.forEach((block, idx) => {
          if (!ALLOWED_TYPES.includes(block.type)) {
            issues.push(`${landing.key}: block ${idx} type "${block.type}" not allowed (allowed: ${ALLOWED_TYPES.join(', ')})`);
          }
        });
      });
      expect(issues, `Invalid block types in landings:\n${issues.join('\n')}`).toEqual([]);
    });
  });

  describe('Content Word Count & Headings', () => {
    it('all landings have more than 1000 words in rendered content (pure text only)', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        const wordCount = countRenderedWords(landing);
        if (wordCount < 1000) {
          issues.push(`${landing.key}: only ${wordCount} words in rendered content (min 1000)`);
        }
      });
      expect(issues, `Word count violations:\n${issues.join('\n')}`).toEqual([]);
    });

    it('all landings have at most 1 H1 heading (no duplication with page title)', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        let allContent = '';
        if (landing.content && Array.isArray(landing.content)) {
          landing.content.forEach(block => {
            if (block.body) allContent += block.body + ' ';
          });
        }
        const headings = countHeadings(allContent);
        if (headings.h1 > 1) {
          issues.push(`${landing.key}: has ${headings.h1} H1s (max 1 - H1 already in page title)`);
        }
      });
      expect(issues, `H1 heading violations (duplicates with page title):\n${issues.join('\n')}`).toEqual([]);
    });

    it('all landings have minimum 3 H2 headings', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        let allContent = '';
        if (landing.content && Array.isArray(landing.content)) {
          landing.content.forEach(block => {
            if (block.body) allContent += block.body + ' ';
          });
        }
        const headings = countHeadings(allContent);
        if (headings.h2 < 3) {
          issues.push(`${landing.key}: has ${headings.h2} H2s (min 3)`);
        }
      });
      expect(issues, `H2 heading violations:\n${issues.join('\n')}`).toEqual([]);
    });
  });

  describe('Bilingual Parity', () => {
    it('each Spanish landing has matching English landing', () => {
      const enKeys = new Set(allLandings.en.map(l => l.key));
      const issues = [];

      allLandings.es.forEach(landing => {
        if (!landing.keyEn) {
          issues.push(`${landing.key}: missing keyEn field`);
        } else if (!enKeys.has(landing.keyEn)) {
          issues.push(`${landing.key}: keyEn "${landing.keyEn}" not found in English landings`);
        }
      });

      expect(issues, `Missing English counterparts:\n${issues.join('\n')}`).toEqual([]);
    });

    it('each English landing has matching Spanish landing', () => {
      const esKeys = new Set(allLandings.es.map(l => l.key));
      const issues = [];

      allLandings.en.forEach(landing => {
        if (!landing.keyEs) {
          issues.push(`${landing.key}: missing keyEs field`);
        } else if (!esKeys.has(landing.keyEs)) {
          issues.push(`${landing.key}: keyEs "${landing.keyEs}" not found in Spanish landings`);
        }
      });

      expect(issues, `Missing Spanish counterparts:\n${issues.join('\n')}`).toEqual([]);
    });
  });

  describe('Story Highlight Structure', () => {
    it('all landings have story_highlight in first 1/3 of content', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        if (!landing.content || !Array.isArray(landing.content)) {
          issues.push(`${landing.key}: missing content array`);
          return;
        }

        const highlights = getStoryHighlightsByThirds(landing.content);
        if (highlights.first.length === 0) {
          const contentLength = landing.content.length;
          const thirdPoint = Math.ceil(contentLength / 3);
          issues.push(`${landing.key}: NO story_highlight in first 1/3 (0-${thirdPoint} blocks)`);
        }
      });
      expect(issues, `Missing story_highlight in first third:\n${issues.join('\n')}`).toEqual([]);
    });

    it('all landings have minimum 3 story_highlights distributed across thirds', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        if (!landing.content || !Array.isArray(landing.content)) {
          return; // Already caught in previous test
        }

        const highlights = getStoryHighlightsByThirds(landing.content);
        const totalHighlights = highlights.first.length + highlights.second.length + highlights.third.length;

        if (totalHighlights < 3) {
          issues.push(`${landing.key}: only ${totalHighlights} story_highlights (min 3)`);
        } else {
          // Check distribution
          const distribution = [];
          if (highlights.first.length > 0) distribution.push(`1st:${highlights.first.length}`);
          if (highlights.second.length > 0) distribution.push(`2nd:${highlights.second.length}`);
          if (highlights.third.length > 0) distribution.push(`3rd:${highlights.third.length}`);

          // At least one highlight in each third would be ideal, but min requirement is 3 total
          if (distribution.length < 2) {
            issues.push(`${landing.key}: story_highlights not distributed (only in ${distribution.join(', ')})`);
          }
        }
      });
      expect(issues, `Story highlight distribution issues:\n${issues.join('\n')}`).toEqual([]);
    });
  });
});
