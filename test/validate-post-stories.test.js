import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let storiesEs, storiesEn;
let existingKeysEs, existingKeysEn;
let allPostSlugs = { es: {}, en: {} };

beforeAll(() => {
  // Cargar stories en ambos idiomas
  const storiesEsPath = path.join(__dirname, '../src/data/es/stories.json');
  const storiesEnPath = path.join(__dirname, '../src/data/en/stories.json');

  storiesEs = JSON.parse(fs.readFileSync(storiesEsPath, 'utf8'));
  existingKeysEs = new Set(storiesEs.map(s => s.key));

  storiesEn = JSON.parse(fs.readFileSync(storiesEnPath, 'utf8'));
  existingKeysEn = new Set(storiesEn.map(s => s.key));

  // Cargar posts
  const postsDir = path.join(__dirname, '../src/data/posts');

  ['es', 'en'].forEach(lang => {
    const langDir = path.join(postsDir, lang);
    if (fs.existsSync(langDir)) {
      fs.readdirSync(langDir).forEach(file => {
        if (file.endsWith('.ts')) {
          const filePath = path.join(langDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const postMatch = content.match(/export const post = ({[\s\S]*?^})/m);
          if (postMatch) {
            const post = eval(`(${postMatch[1]})`);
            const slugs = extractStorySlugs(post);
            if (slugs.length > 0) {
              allPostSlugs[lang][file] = slugs;
            }
          }
        }
      });
    }
  });
});

// Función para extraer slugs de historias de un post
function extractStorySlugs(post) {
  const slugs = [];

  function traverse(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(traverse);
    } else if (obj !== null && typeof obj === 'object') {
      if (obj.slug && typeof obj.slug === 'string') {
        slugs.push(obj.slug);
      }
      if (obj.rows && Array.isArray(obj.rows)) {
        obj.rows.forEach(row => {
          if (Array.isArray(row)) {
            row.forEach(cell => {
              if (typeof cell === 'string' && cell.includes('-')) {
                slugs.push(cell);
              }
            });
          }
        });
      }
      Object.values(obj).forEach(traverse);
    }
  }

  traverse(post);

  return slugs.filter(s => {
    if (s === post.slug || s === post.slugEn || s === post.slugEs) return false;
    if (/^\d+-\d+/.test(s)) return false;
    return true;
  });
}

describe('Post Stories Validation', () => {
  describe('Story References', () => {
    it('Spanish posts have valid story slugs', () => {
      const issues = [];
      Object.entries(allPostSlugs.es).forEach(([file, slugs]) => {
        const invalidSlugs = slugs.filter(slug => !existingKeysEs.has(slug));
        if (invalidSlugs.length > 0) {
          issues.push(`${file}: ${invalidSlugs.join(', ')}`);
        }
      });
      expect(issues, `Invalid Spanish slugs:\n${issues.join('\n')}`).toEqual([]);
    });

    it('English posts have valid story slugs', () => {
      const issues = [];
      Object.entries(allPostSlugs.en).forEach(([file, slugs]) => {
        const invalidSlugs = slugs.filter(slug => !existingKeysEn.has(slug));
        if (invalidSlugs.length > 0) {
          issues.push(`${file}: ${invalidSlugs.join(', ')}`);
        }
      });
      expect(issues, `Invalid English slugs:\n${issues.join('\n')}`).toEqual([]);
    });
  });

  describe('Language Consistency', () => {
    it('no Spanish posts use English slugs', () => {
      const issues = [];
      Object.entries(allPostSlugs.es).forEach(([file, slugs]) => {
        const misplacedSlugs = slugs.filter(
          slug => existingKeysEn.has(slug) && !existingKeysEs.has(slug)
        );
        if (misplacedSlugs.length > 0) {
          issues.push(`${file}: ${misplacedSlugs.join(', ')}`);
        }
      });
      expect(issues, `Language mix detected:\n${issues.join('\n')}`).toEqual([]);
    });

    it('no English posts use Spanish slugs', () => {
      const issues = [];
      Object.entries(allPostSlugs.en).forEach(([file, slugs]) => {
        const misplacedSlugs = slugs.filter(
          slug => existingKeysEs.has(slug) && !existingKeysEn.has(slug)
        );
        if (misplacedSlugs.length > 0) {
          issues.push(`${file}: ${misplacedSlugs.join(', ')}`);
        }
      });
      expect(issues, `Language mix detected:\n${issues.join('\n')}`).toEqual([]);
    });
  });

  describe('Story Collections', () => {
    it('Spanish collection has stories', () => {
      expect(storiesEs.length).toBeGreaterThan(0);
    });

    it('English collection has stories', () => {
      expect(storiesEn.length).toBeGreaterThan(0);
    });

    it('collections have equal counts', () => {
      expect(storiesEn.length).toBe(storiesEs.length);
    });
  });
});
