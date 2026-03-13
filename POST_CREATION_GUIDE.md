# Blog Post Creation Guide - NEW SYSTEM

## CRITICAL: Story References MUST Use BlogStoryTable Component

### What Changed
**Old System** ❌ Hardcoded story titles in tables = plain text, no links
**New System** ✅ Story slugs in `story_table` blocks = rich StoryLink components with hover effects

---

## Mandatory Requirements for ALL New Blog Posts

### 1. **Use `story_table` Type for Story References**
When creating a table that references stories, use type `story_table` (not `table`).

### 2. **Use Real Story Slugs (NOT Titles)**
- Slugs are the `key` field from `/src/data/{es|en}/stories.json`
- **Spanish**: `la-historia-de-pipo-el-gato-viajero`, `458-el-robot-con-corazon`, etc.
- **English**: `the-story-of-pipo-the-traveling-cat`, `458-the-robot-with-a-heart`, etc.
- DO NOT hardcode story titles - the component renders them automatically

### 3. **Language Consistency (STRICT)**
- **Spanish posts** (`src/data/posts/es/`) → Use ONLY Spanish slugs
- **English posts** (`src/data/posts/en/`) → Use ONLY English slugs
- **Automated tests FAIL if violated** → No commit possible

### 4. **Test Before Commit (MANDATORY)**
```bash
npm run test
```
All 7 tests must pass:
- ✓ Blog posts exist
- ✓ Posts have required fields
- ✓ Story slugs are valid
- ✓ Spanish posts use Spanish slugs only
- ✓ English posts use English slugs only
- ✓ Related stories exist
- ✓ Content block types are valid

---

## Blog Post TypeScript Structure

```typescript
// src/data/posts/es/example-post.ts
export const post = {
  // Required fields
  slug: 'example-post',          // URL slug
  slugEs: 'example-post',         // Spanish version slug
  slugEn: 'example-post',         // English version slug
  title: 'Example Post',
  titleEs: 'Post de Ejemplo',
  titleEn: 'Example Post',
  description: 'Brief description',
  descriptionEs: 'Descripción breve',
  descriptionEn: 'Brief description',
  category: 'Educación',          // Valid: Educación, Consejos
  date: '2024-03-13',             // YYYY-MM-DD format

  // Content blocks (order matters)
  content: [
    {
      type: 'heading',
      level: 1,
      text: 'Main Title'
    },
    {
      type: 'text',
      text: 'Introductory paragraph...'
    },
    {
      type: 'heading',
      level: 2,
      text: 'Section with Stories'
    },
    {
      // ⭐ THIS IS THE CRITICAL PART ⭐
      type: 'story_table',  // NOT "table"!
      headers: ['Age Group', 'Recommended Story', 'Theme'],
      rows: [
        // Use real slugs from collection
        ['3-5 years', 'la-historia-de-pipo-el-gato-viajero', 'Adventure'],
        ['6-8 years', '458-el-robot-con-corazon', 'Emotions'],
        ['8+ years', 'el-segador-de-almas-una-historia-de-amistad-y-equilibrio', 'Friendship'],
      ]
    },
    {
      type: 'text',
      text: 'Closing paragraph...'
    }
  ]
}
```

---

## Validated Story Collections

### Spanish Stories (use in Spanish posts)
- `la-historia-de-pipo-el-gato-viajero`
- `458-el-robot-con-corazon`
- `el-segador-de-almas-una-historia-de-amistad-y-equilibrio`
- `el-traga-luces-un-cuento-de-misterio-y-luz`
- (To find more, check `/src/data/es/stories.json` - use `key` field)

### English Stories (use in English posts)
- `the-story-of-pipo-the-traveling-cat`
- `458-the-robot-with-a-heart`
- `the-soul-reaper-a-story-of-friendship-and-balance`
- `lighteater-a-tale-of-mystery-and-light`
- (To find more, check `/src/data/en/stories.json` - use `key` field)

---

## Post Registration

After creating a post file, register it in `/src/data/posts/index.ts`:

```typescript
// Import
import { post as examplePost } from './es/example-post'  // Spanish
import { post as examplePostEn } from './en/example-post' // English

// Export in array
export const posts = [
  examplePost,
  examplePostEn,
  // ... other posts
]
```

---

## Content Block Types

Valid types for `content` array:
- `heading` - Headers (level 1-6)
- `text` - Paragraphs
- `list` - Bullet/numbered lists
- `story_table` - ⭐ Table with story slug references (renders StoryLink components)
- `table` - Regular table (plain text/data only)
- `quote` - Block quotes
- `highlight` - Highlighted sections
- `barchart` - Chart data
- `steps` - Step-by-step instructions
- `comparison` - Comparison tables
- `stats` - Statistics display
- `story_recommendation` - Single story recommendation (if used)

---

## Component Pipeline (Technical Reference)

1. Blog page (`src/pages/blog/[id].astro`) → passes `lang` prop
2. BlogPostPage component → receives `lang`, passes to BlogContent
3. BlogContent component → passes `lang` to all children including BlogStoryTable
4. **BlogStoryTable** → loads correct language collection, maps slugs → titles
5. Template renders StoryLink component for each valid slug

---

## Testing Workflow

```bash
# 1. Create/modify post files
vim src/data/posts/es/new-post.ts
vim src/data/posts/en/new-post.ts

# 2. Register in index
vim src/data/posts/index.ts

# 3. RUN TESTS (MANDATORY)
npm run test

# 4. If tests pass → commit
git add .
git commit -m "feat: add new blog post"

# 5. If tests fail → FIX the post
# (Usually language mismatch or invalid slugs)
```

---

## Common Mistakes ❌

1. **Using plain story titles instead of slugs**
   ```typescript
   // ❌ WRONG
   rows: [['Age 5+', 'Pipo el Gato Viajero', 'Adventure']]

   // ✅ CORRECT
   rows: [['Age 5+', 'la-historia-de-pipo-el-gato-viajero', 'Adventure']]
   ```

2. **Mixing languages in tables**
   ```typescript
   // ❌ WRONG (Spanish post with English slug)
   rows: [['Edad 5+', 'the-story-of-pipo-the-traveling-cat', 'Aventura']]

   // ✅ CORRECT
   rows: [['Edad 5+', 'la-historia-de-pipo-el-gato-viajero', 'Aventura']]
   ```

3. **Using wrong block type**
   ```typescript
   // ❌ WRONG (slugs won't be converted to links)
   type: 'table',

   // ✅ CORRECT
   type: 'story_table',
   ```

4. **Forgetting to register the post**
   ```typescript
   // ❌ Created file but didn't export in index.ts

   // ✅ Always add to /src/data/posts/index.ts
   ```

---

## Quality Assurance Checklist

Before committing:
- [ ] Post file created with correct structure
- [ ] All story slugs use real values from collection
- [ ] Language consistency: Spanish post = Spanish slugs, English post = English slugs
- [ ] Post registered in `/src/data/posts/index.ts`
- [ ] All content blocks have valid `type` values
- [ ] `story_table` blocks use type `story_table` (not `table`)
- [ ] Run `npm run test` and all tests pass ✓
- [ ] No hardcoded story titles in tables

---

## Example: Completed Post Pair

### Spanish Version (`src/data/posts/es/cuentos-adaptados-por-edades.ts`)
```typescript
export const post = {
  slug: 'cuentos-adaptados-por-edades',
  slugEs: 'cuentos-adaptados-por-edades',
  slugEn: 'stories-by-age-guide',
  title: 'Cuentos Adaptados por Edades',
  category: 'Educación',
  content: [
    { type: 'heading', level: 1, text: 'Cuentos Recomendados por Edad' },
    {
      type: 'story_table',
      headers: ['Edad', 'Cuento Recomendado', 'Tema'],
      rows: [
        ['3-5 años', 'la-historia-de-pipo-el-gato-viajero', 'Aventura'],
        ['6-8 años', '458-el-robot-con-corazon', 'Emociones']
      ]
    }
  ]
}
```

### English Version (`src/data/posts/en/stories-by-age-guide.ts`)
```typescript
export const post = {
  slug: 'stories-by-age-guide',
  slugEs: 'cuentos-adaptados-por-edades',
  slugEn: 'stories-by-age-guide',
  title: 'Stories By Age Guide',
  category: 'Education',
  content: [
    { type: 'heading', level: 1, text: 'Recommended Stories By Age' },
    {
      type: 'story_table',
      headers: ['Age', 'Recommended Story', 'Theme'],
      rows: [
        ['3-5 years', 'the-story-of-pipo-the-traveling-cat', 'Adventure'],
        ['6-8 years', '458-the-robot-with-a-heart', 'Emotions']
      ]
    }
  ]
}
```

---

## For the post-seo Skill

When generating blog posts, **ALWAYS**:
1. Create `story_table` blocks when referencing stories
2. Use validated story slugs from the collections
3. Maintain language consistency
4. Structure posts with proper TypeScript exports
5. Register in `index.ts`
6. **DO NOT COMMIT** until tests pass

The BlogStoryTable component automatically handles:
- Converting slugs to rich StoryLink components
- Adding hover effects
- Rendering proper story titles
- Creating working links to story pages

Your job is to create the structure and content. The component handles the rendering.
