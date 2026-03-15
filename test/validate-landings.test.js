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

    it('all landings have exactly 1 H1 heading', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        const headings = countHeadings(landing.description || '');
        if (headings.h1 !== 1) {
          issues.push(`${landing.key}: has ${headings.h1} H1 (need exactly 1)`);
        }
      });
      expect(issues, `H1 heading violations:\n${issues.join('\n')}`).toEqual([]);
    });

    it('all landings have minimum 3 H2 headings', () => {
      const issues = [];
      [...allLandings.es, ...allLandings.en].forEach(landing => {
        const headings = countHeadings(landing.description || '');
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
