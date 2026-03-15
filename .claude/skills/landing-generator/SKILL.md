# Landing Generator - AI Guide

Instrucciones para generar landings correctamente. Léeme ANTES de crear cualquier landing.

## Invocación

```
When user asks to create a landing (e.g., "Create a landing for fear stories"):

1. Read this guide completely
2. Follow the structure exactly
3. Validate at every step
4. Create both ES and EN versions
```

## The Landing Structure (TypeScript)

```typescript
import type { Landing } from '@/types/landing';

export const landing: Landing = {
  key: string;              // Spanish slug format
  keyEs: string;            // Spanish key (matches key)
  keyEn: string;            // English slug format
  title: string;            // Page title
  keyword: string;          // Main SEO keyword
  category: string;         // From storyTags
  keywords: string[];       // 1 tag for story matching
  description: string;      // 128-160 chars, plain text, NO HTML
  content: ContentBlock[];  // See below
}

type ContentBlock = TextBlock | StoryHighlightBlock | StoryTableBlock;

interface TextBlock {
  type: 'text';
  body: string;  // HTML with <p>, <h2>, <strong> tags
}

interface StoryHighlightBlock {
  type: 'story_highlight';
  searchKeyword: string;  // Tag from storyTags matching category
  label: string;          // Display label
}
```

## Step-by-Step Generation Process

### Step 1: Plan the Structure

Before writing ANY code, analyze:
- **Topic**: What's the landing about?
- **Category**: Which storyTag category? (miedo, dormir, aventura, etc)
- **Keywords**: ALWAYS 1 tag only (that matches the category)
- **Title**: Clear, SEO-friendly
- **Keyword**: Main search term
- **Bilingual keys**: Spanish slug and English slug (MUST be different)

### Step 2: Write Description FIRST

**CRITICAL RULES**:
- 128-160 characters EXACTLY (count them!)
- Plain text ONLY (no HTML tags)
- UNIQUE and specific to THIS landing (not thin content)
- SEO-relevant keywords in the description
- Different for ES and EN versions

**Good examples**:
- ES: "Cuentos sobre el miedo que enseñan valentía y resiliencia. Historias para ayudar a niños a entender y superar sus miedos infantiles."
- EN: "Stories about fear that teach courage and resilience. Tales to help children understand and overcome their childhood fears."

**Bad examples** (reject these):
- ❌ "Cuentos para niños. Historias para disfrutar." (thin content)
- ❌ "Stories for kids. Tales to enjoy and learn." (generic garbage)
- ❌ With HTML tags: "Cuentos <strong>sobre</strong> miedo" (NO HTML)
- ❌ Too short: "Fear stories for kids"
- ❌ Too long (>160): "This is a comprehensive guide about stories that teach children about fear and help them overcome their fears in a safe way"

### Step 3: Create Content Structure

**MANDATORY**:
1. First block ALWAYS `type: 'text'` with opening paragraph
2. Content must be 1000+ words (count in text blocks only)
3. Need 3+ `<h2>` headings (subheading sections)
4. Need 2-4 `story_highlight` blocks distributed across content
5. NO `<h1>` tags (page template provides title)
6. NO forbidden blocks: no `stories_gallery`, no `story_recommendation`

**Distribution strategy**:
```
Block 1: Opening <p> (no h2)
Block 2: <h2>Section 1</h2> + paragraphs
Block 3: story_highlight block
Block 4: <h2>Section 2</h2> + paragraphs
Block 5: <h2>Section 3</h2> + paragraphs
Block 6: story_highlight block
Block 7: <h2>Section 4</h2> + paragraphs (optional)
Block 8: Closing content with CTA
```

### Step 4: Write Content Blocks

**Text block rules**:
- Use `<p>` for paragraphs (2-3 sentences each)
- Use `<h2>` for sections (NOT h1, NOT h3)
- Use `<strong>` for key terms
- Write substantive, valuable content (not fluff)
- 250+ words per section

**Story highlight block rules**:
- `searchKeyword`: MUST be a valid storyTag (see list below)
- `searchKeyword`: Free-form sub-keyword related to PREVIOUS TEXT CONTENT (not necessarily landing's keyword)
- `label`: Descriptive, inviting label
- Distribute 2-4 blocks across the content (not all at the end)

**Example**:
```typescript
{
  type: 'story_highlight',
  searchKeyword: 'keywod relativa que tiene que ver con el texto anterior',
  label: 'Cuentos de XXX'
}
```

### Step 5: Validate Everything

**BEFORE creating files**, check:

```typescript
✓ description.length >= 128 && description.length <= 160
✓ description has NO HTML tags
✓ description is unique and SEO-relevant
✓ key !== keyEn (different values)
✓ keyEs matches key
✓ category is valid storyTag
✓ keywords.length === 1 (ALWAYS exactly 1)
✓ keyword (1 only) matches a storyTag category
✓ content[0].type === 'text'
✓ content has 0 <h1> tags
✓ content has 3+ <h2> tags
✓ content has 1000+ words
✓ content has 2-4 story_highlight blocks
✓ NO stories_gallery blocks
✓ NO story_recommendation blocks
✓ story_highlight searchKeyword is valid storyTag (field-free, related to previous text)
```

### Step 6: Create Files

**Files to create**:
1. `src/data/landings/es/{key}.ts` - Spanish version
2. `src/data/landings/en/{keyEn}.ts` - English version

**Key matching**:
- ES file: key = "...", keyEs = "...", keyEn = "english-slug"
- EN file: key = "english-slug", keyEs = "spanish-key", keyEn = "english-slug"

### Step 7: Validate with TypeScript

After creating files:
1. TypeScript compilation validates types
2. Run: `npm run test`
3. All tests must pass
4. No warnings, no errors

## Available Story Tags (Keywords)

**Spanish**:
- Emotions: miedo, valentía, amor, amistad, soledad, empatía
- Adventure: aventura, misterio, magia, transformación
- Growth: superación, responsabilidad, aprendizaje
- Other: tecnología, inteligencia, diversidad, naturaleza, curiosidad, redención
- Special: dormir, ansiedad, infantil-pequenos, infantil-medianos, infantil-mayores

**English**:
- fear, courage, love, friendship, loneliness, empathy
- adventure, mystery, magic, transformation
- overcoming, responsibility, learning
- technology, intelligence, diversity, nature, curiosity, redemption
- sleep, anxiety, little-ones, middle-children, older-children

## Common Mistakes to Avoid

❌ **Don't do**:
- Auto-generate descriptions with generic text ("This comprehensive guide offers...")
- Add H1 tags to content (template provides page title)
- Create story_highlight blocks with keywords not in landing.keywords
- Mix Spanish and English in content (one language per file)
- Make descriptions too short or use thin content
- Forget to create BOTH ES and EN versions
- Use wrong block types (only text, story_highlight, story_table allowed)

✅ **Do**:
- Write unique, SEO-relevant descriptions for each landing
- Count description characters exactly (128-160)
- Validate structure against types BEFORE creating files
- Create bilingual pair with matching keys
- Write substantive content (1000+ words minimum)
- Distribute story_highlight blocks throughout content
- Use H2 for sections, NOT h1 or h3
- Test with `npm run test` after creation

## Example: Fear Stories Landing

**Plan**:
- Topic: Stories about overcoming fear
- Category: miedo
- Keywords: ["supero"]
- ES key: cuentos-para-superar-miedos
- EN key: stories-to-overcome-fears

**Description (ES)**: "Cuentos sobre el miedo que enseñan valentía y resiliencia. Historias para ayudar a niños a entender y superar sus miedos infantiles." (150 chars ✓)

**Description (EN)**: "Stories about fear that teach courage and resilience. Tales to help children understand and overcome their childhood fears." (124 chars... TOO SHORT, needs 128+)

**Description (EN - fixed)**: "Stories about fear that teach courage and resilience. Tales to help children understand and overcome their childhood fears with confidence." (142 chars ✓)

**Content structure**:
1. Opening paragraph about why fear is normal
2. <h2>Understanding Childhood Fears</h2> section
3. story_highlight for "miedo" tag
4. <h2>How Stories Help</h2> section
5. <h2>Building Courage Through Stories</h2> section
6. story_highlight for "valentía" tag
7. <h2>Taking the First Brave Step</h2> section
8. Closing with CTA

**Total words**: ~1200 words ✓
**H2 sections**: 4 ✓
**story_highlights**: 2 ✓
**Keywords used**: ["miedo", "valentía"] ✓

## When Done

1. ✓ Both files created (ES + EN)
2. ✓ TypeScript validates without errors
3. ✓ `npm run test` passes all validations
4. ✓ Make git commit with clear message

## If Validation Fails

Don't hack around the validation. Fix the actual problem:
- Too few words? Add more substantive content
- Wrong keyword? Use valid storyTag from list
- Description wrong length? Rewrite (don't auto-pad)
- Missing H2? Add real sections with content
- H1 in content? Remove it (template provides page title)
- Tests fail? Read the error, fix the actual issue

No shortcuts. The validation exists for a reason.
