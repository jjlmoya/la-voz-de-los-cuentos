# Landing Generator Skill

Generate new landing pages for La Voz de los Cuentos with full TypeScript typing and validation.

## Usage

```
/landing-generator [language] [topic]
```

### Parameters

- **language** (required): `es` for Spanish, `en` for English
- **topic** (optional): Topic/category for the landing (e.g., "fear stories", "sleep stories")

## Examples

```
/landing-generator es cuentos de miedo
/landing-generator en adventure stories
/landing-generator es
```

## What the Skill Does

1. **Collects Landing Information**
   - Landing key (slug)
   - Bilingual keys (ES/EN)
   - Title
   - SEO keyword
   - Category (from storyTags)
   - Keywords for story matching
   - SEO description (validates 128-160 chars)

2. **Generates Content**
   - Opening paragraph
   - Section with H2 headings (min 3)
   - Story highlight blocks with relevant tags
   - Closing call-to-action
   - Validates 1000+ words

3. **Validates Structure**
   - Correct TypeScript types
   - SEO requirements (description length, keywords)
   - Content quality (word count, heading count)
   - Forbidden blocks check (no stories_gallery, no story_recommendation)
   - Bilingual parity

4. **Creates Files**
   - Generates ES landing: `src/data/landings/es/{key}.ts`
   - Generates EN landing: `src/data/landings/en/{keyEn}.ts`
   - Both with matching bilingual keys

## Landing Structure

```typescript
export const landing = {
  key: string;                 // Unique slug (Spanish format)
  keyEs: string;               // Spanish key (matches key)
  keyEn: string;               // English key (English slug)
  title: string;               // Display title
  keyword: string;             // Main SEO keyword
  category: string;            // From storyTags: miedo, aventura, dormir, etc
  keywords: string[];          // Tags to match stories (1-3 keywords)
  description: string;         // SEO meta (128-160 chars, NO HTML)
  content: [
    { type: 'text', body: string },
    { type: 'story_highlight', searchKeyword: string, label: string },
    { type: 'story_highlight', searchKeyword: string, label: string }
  ]
}
```

## Content Guidelines

### Description (128-160 chars, plain text)
✓ "Cuentos sobre el miedo que enseñan valentía y resiliencia. Historias para ayudar a niños a entender y superar sus miedos infantiles."
✗ "Cuentos <strong>sobre el miedo</strong>..." (contains HTML)
✗ "Short desc" (too short)

### Paragraphs
- Use `<p>` tags for paragraphs
- Include `<strong>` for emphasis on key terms
- Keep paragraphs 2-3 sentences

### Headings
- Start with opening paragraph (no H1 or H2)
- Use at least 3 `<h2>` sections
- H2 headings should be meaningful subsections

### Story Highlights
- Use 2-4 story_highlight blocks
- Distribute across content (first 1/3, middle, last third)
- searchKeyword must match storyTags category
- Label should be descriptive and inviting

### Forbidden Elements
✗ `stories_gallery` (globally deprecated)
✗ `story_recommendation` (blog-only element)
✓ Only use: `text`, `story_highlight`, `story_table`

## Available Categories (storyTags)

**Spanish**:
- `miedo`, `valentía`, `amor`, `amistad`, `soledad`, `empatía`
- `aventura`, `misterio`, `magia`, `transformación`
- `superación`, `responsabilidad`, `aprendizaje`, `tecnología`, `inteligencia`
- `diversidad`, `naturaleza`, `curiosidad`, `redención`, `dormir`, `ansiedad`
- `infantil-pequenos`, `infantil-medianos`, `infantil-mayores`

**English**:
- `fear`, `courage`, `love`, `friendship`, `loneliness`, `empathy`
- `adventure`, `mystery`, `magic`, `transformation`
- `overcoming`, `responsibility`, `learning`, `technology`, `intelligence`
- `diversity`, `nature`, `curiosity`, `redemption`, `sleep`, `anxiety`
- `little-ones`, `middle-children`, `older-children`

## Example Session

```
User: /landing-generator es cuentos para dormir

Skill collects:
- key: cuentos-para-dormir-nuevos
- keyEn: bedtime-stories-new
- title: Cuentos para Dormir: Historias Relajantes
- keyword: cuentos para dormir
- category: dormir
- keywords: ["sueño", "relajación"]
- description: [validates 128-160 chars]

Generates content with:
✓ Opening paragraph about sleep stories
✓ 3+ H2 sections with full paragraphs
✓ 2-3 story_highlight blocks
✓ 1000+ words total
✓ No forbidden blocks

Creates files:
✓ src/data/landings/es/cuentos-para-dormir-nuevos.ts
✓ src/data/landings/en/bedtime-stories-new.ts
✓ Both with matching bilingual keys
```

## Validation Checklist

Before creating, the skill verifies:

- ✓ Description: 128-160 chars, no HTML
- ✓ Content: 1000+ words (text blocks only)
- ✓ Headings: 0 H1 (comes from template), 3+ H2
- ✓ Blocks: No H1, no stories_gallery, no story_recommendation
- ✓ Story highlights: 2-3 blocks distributed across content
- ✓ Keywords: 1-3 keywords that match storyTags
- ✓ Bilingual keys: Valid and matching across ES/EN
- ✓ Files: Will not overwrite existing landings

## Troubleshooting

**"Description too short"**
- Add more detail about the landing's theme
- Aim for full sentences, not fragments

**"Word count too low"**
- Add more paragraphs (aim for 1000+ words)
- Expand each section with detailed explanation

**"Not enough H2 headings"**
- Add at least 3 `<h2>` sections
- Each section should have 1-2 paragraphs

**"Invalid keyword"**
- Ensure keyword matches storyTags category
- Check available categories above

**"Key already exists"**
- Choose a different slug for the landing
- Append -new, -v2, or similar to make unique
