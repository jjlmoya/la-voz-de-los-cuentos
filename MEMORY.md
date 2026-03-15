# La Voz de los Cuentos - Project Memory

## TypeScript Landing Types (MARCH 2026)

**Location**: `src/types/landing.ts`

### Core Landing Interface
```typescript
interface Landing {
  key: string;              // Unique slug (Spanish format)
  keyEs: string;            // Spanish bilingual key (matches key)
  keyEn: string;            // English bilingual key
  title: string;            // Display title
  keyword: string;          // Main SEO keyword
  category: string;         // Category from storyTags
  keywords: string[];       // 1-3 keywords for story matching
  description: string;      // SEO meta (128-160 chars, NO HTML)
  content: ContentBlock[]; // Page content
}

type ContentBlock =
  | TextBlock
  | StoryHighlightBlock
  | StoryTableBlock;
```

### Validation
- `validateLanding(landing)` - Full validation returns `{ valid, errors[] }`
- Checks: description length, HTML in description, content structure
- Validates: word count (1000+), heading counts (0 H1, 3+ H2)
- Prevents: H1 duplication, forbidden blocks (stories_gallery, story_recommendation)

## Landing Generator Utility

**Location**: `src/utils/landing-generator.ts`

### Key Functions
```typescript
// Create content blocks
createTextBlock(body: string): TextBlock
createStoryHighlightBlock(searchKeyword, label): StoryHighlightBlock

// Create complete landing
createLanding(config): Landing

// Export as code
exportLandingAsCode(landing, lang: 'es'|'en'): string

// Helpers
generateSEODescription(baseText): string  // Auto-format to 128-160
validateDescriptionLength(desc): { valid, length }
```

## Landing Generator Skill

**Location**: `.claude/skills/landing-generator/`
**Invocation**: `/landing-generator [es|en] [topic]`

### Workflow
1. Collect configuration (key, titles, category, keywords)
2. Generate content structure (min 1000 words, 3+ H2 sections)
3. Add story_highlight blocks (2-4, distributed across content)
4. Validate entire landing with TypeScript types
5. Create both ES and EN files with matching bilingual keys
6. Ensure no H1 duplication, no forbidden blocks

### Content Requirements Checklist
- ✅ Description: 128-160 chars, plain text (no HTML)
- ✅ First block: type='text' (always)
- ✅ Total words: 1000+ (text blocks only)
- ✅ H1 headings: 0 (comes from page template)
- ✅ H2 headings: 3+ minimum (section headings)
- ✅ Blocks allowed: text, story_highlight, story_table ONLY
- ✅ Blocks forbidden: stories_gallery, story_recommendation
- ✅ Story highlights: 2-4 blocks, distributed (first/middle/last thirds)
- ✅ Bilingual keys: keyEs ≠ keyEn, both valid

## Story Categories Available

**Spanish Tags** (for keywords):
- Emotions: miedo, valentía, amor, amistad, soledad, empatía
- Adventure: aventura, misterio, magia, transformación
- Growth: superación, responsabilidad, aprendizaje
- Other: tecnología, inteligencia, diversidad, naturaleza, curiosidad, redención
- Special: dormir, ansiedad, infantil-pequenos, infantil-medianos, infantil-mayores

**English Tags** (same structure):
- fear, courage, love, friendship, loneliness, empathy
- adventure, mystery, magic, transformation
- overcoming, responsibility, learning
- technology, intelligence, diversity, nature, curiosity, redemption
- sleep, anxiety, little-ones, middle-children, older-children

## Landing Structure Example

```typescript
export const landing = {
  key: "cuentos-para-dormir",
  keyEs: "cuentos-para-dormir",
  keyEn: "bedtime-stories",
  title: "Cuentos para Dormir: Historias Relajantes",
  keyword: "cuentos para dormir",
  category: "dormir",
  keywords: ["sueño", "relajación"],
  description: "Cuentos relajantes para dormir con historias tranquilas y voces suaves. Relatos mágicos para una noche de sueños profundos y paz.",
  content: [
    { type: 'text', body: '<p>Opening paragraph...</p>' },
    { type: 'text', body: '<h2>Section 1</h2><p>Content...</p>' },
    { type: 'story_highlight', searchKeyword: 'dormir', label: 'Sleep Stories' },
    { type: 'text', body: '<h2>Section 2</h2><p>Content...</p>' },
    { type: 'story_highlight', searchKeyword: 'relajación', label: 'Calming Tales' },
    { type: 'text', body: '<h2>Section 3</h2><p>Content...</p>' }
  ]
}
```

## Quick Reference

**Generate a new landing**:
```
/landing-generator es historias para dormir
```

**Required for every landing**:
- Unique key (slug format)
- Bilingual keys (ES ≠ EN)
- Valid category from storyTags
- 1-3 keywords matching category
- 128-160 char description (plain text)
- 1000+ words across multiple sections
- 2-4 story_highlight blocks distributed
- 3+ H2 subsections
- No H1, no forbidden blocks
