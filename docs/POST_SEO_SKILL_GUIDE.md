# POST-SEO Skill Guide: Creating Blog Posts with Story References

## Overview

The `post-seo` skill is designed to generate bilingual blog posts (Spanish/English) for the "La Voz de los Cuentos" website. Posts can include references to stories from the collection, creating rich, interconnected content that improves SEO and user engagement.

## Post Structure

All blog posts follow this TypeScript structure:

```typescript
export const post = {
  slug: "post-slug-here",
  slugEn: "post-slug-english", // English slug
  title: "Post Title in Spanish",
  description: "Short description for SEO",
  date: "YYYY-MM-DD",
  category: "Educación", // or "Consejos", "Tips", "Education"
  tags: ["tag1", "tag2", "tag3"],
  content: [
    // Content blocks go here
  ]
}
```

## Content Block Types

### 1. **Text Block**
Simple paragraph content:
```javascript
{
  type: "text",
  body: "Your paragraph text here..."
}
```

### 2. **Heading**
```javascript
{
  type: "heading",
  level: 2, // or 3
  text: "Heading Text"
}
```

### 3. **List**
```javascript
{
  type: "list",
  style: "unordered", // or "ordered"
  items: [
    "Item 1",
    "Item 2",
    "Item 3"
  ]
}
```

### 4. **Table**
```javascript
{
  type: "table",
  headers: ["Column 1", "Column 2", "Column 3"],
  rows: [
    ["Data 1", "Data 2", "Data 3"],
    ["Data 4", "Data 5", "Data 6"]
  ]
}
```

### 5. **Highlight Box** ⭐ IMPROVED
```javascript
{
  type: "highlight",
  variant: "tip", // or "success", "info", "warning"
  title: "Title",
  body: "Content of the highlight box"
}
```

### 6. **Story Recommendation** ⭐ NEW - FOR STORY LINKS
```javascript
{
  type: "story_recommendation",
  slug: "story-slug-here",
  title: "Story Title",
  description: "Short description of why this story is recommended",
  duration: 12, // Optional: duration in minutes
  variant: "primary", // or "secondary", "success", "warning"
  label: "Story Type" // e.g., "Cuento para la Oscuridad"
}
```

### 7. **Quote**
```javascript
{
  type: "quote",
  text: "Quote text",
  author: "Author name"
}
```

### 8. **Steps**
```javascript
{
  type: "steps",
  items: [
    {
      title: "Step 1",
      body: "Description of step 1"
    },
    {
      title: "Step 2",
      body: "Description of step 2"
    }
  ]
}
```

### 9. **Comparison**
```javascript
{
  type: "comparison",
  left: {
    title: "Left Column Title",
    items: ["Item 1", "Item 2"]
  },
  right: {
    title: "Right Column Title",
    items: ["Item 3", "Item 4"]
  }
}
```

### 10. **Stats**
```javascript
{
  type: "stats",
  items: [
    { value: "30%", label: "Statistic 1" },
    { value: "45%", label: "Statistic 2" },
    { value: "60%", label: "Statistic 3" }
  ]
}
```

### 11. **Bar Chart**
```javascript
{
  type: "barchart",
  title: "Chart Title",
  data: [
    { label: "Category 1", value: 65 },
    { label: "Category 2", value: 45 },
    { label: "Category 3", value: 80 }
  ]
}
```

## 🎯 Story Recommendation Best Practices

### When to Use Story Recommendations

Use `story_recommendation` blocks when:
1. **Mentioned by name** - A blog post talks about a specific type of story
2. **As examples** - Demonstrating concepts like "stories for fear resolution"
3. **For practical application** - Showing readers how to use the blog content
4. **Call-to-action** - Guiding readers to explore your story collection

### Finding the Right Story Slug

Before referencing a story, you must verify its slug exists in the collection:

**Spanish stories:** Check `/src/data/es/stories.json` for the `key` field
**English stories:** Check `/src/data/en/stories.json` for the `key` field

Example verified slugs:
- `la-leyenda-de-la-reina-de-la-noche` (Spanish)
- `the-legend-of-the-queen-of-the-night` (English)
- `el-demonio-y-la-cucharita-perdida` (Spanish)
- `the-demon-and-the-lost-spoon` (English)
- `sdg-el-caso-del-misterioso-maullido-medianoche` (Spanish)
- `crt-the-case-of-the-midnight-meow` (English)

### Variant Colors

Choose the variant color that best represents the story type:
- **primary** (purple) - For main story recommendations
- **secondary** (pink) - For stories about monsters, mysteries
- **success** (blue) - For adventure and discovery stories
- **warning** (orange) - For cautionary or intense stories

### Example: Complete Story Recommendation

```javascript
{
  type: "story_recommendation",
  slug: "la-leyenda-de-la-reina-de-la-noche",
  title: "La Leyenda de la Reina de la Noche",
  description: "Un cuento que transforma la percepción del niño sobre la oscuridad, mostrando la magia que existe cuando el sun se va.",
  duration: 15,
  variant: "primary",
  label: "Cuento para la Oscuridad"
}
```

## File Organization

### Spanish Posts
Location: `/src/data/posts/es/`
Format: `slug-name.ts`
Example: `beneficios-de-los-cuentos-para-el-desarrollo-infantil.ts`

### English Posts
Location: `/src/data/posts/en/`
Format: `slug-name.ts`
Example: `benefits-of-stories-for-child-development.ts`

### Index Registration
After creating posts, register them in `/src/data/posts/index.ts`:

```typescript
import { post as beneficiosEs } from './es/beneficios-de-los-cuentos-para-el-desarrollo-infantil'
import { post as beneficiosEn } from './en/benefits-of-stories-for-child-development'

export const postsEs = [
  comoContarEs,
  beneficiosEs,
  // ... other posts
]

export const postsEn = [
  howToTellEn,
  beneficiosEn,
  // ... other posts
]
```

## SEO Optimization

### Meta Tags Generated Automatically
When using the `story_recommendation` component, these meta tags are generated:
- `og:type`: "article"
- `article:published_time`: Post date
- `article:section`: Category
- `article:tag`: All tags

### Structured Data (JSON-LD)
The `BlogSEO` component generates schema.org structured data that includes:
- BlogPosting schema
- Referenced CreativeWork items (stories)
- Publisher and author information
- Keywords and article metadata

### Bilingual SEO
For proper bilingual SEO:
1. Use unique slugs for each language
2. Set `slugEn` field for cross-language reference
3. Ensure story slugs match the language-specific collection

## Translation Keys Required

Make sure these translation keys exist in both language files:

```javascript
// src/translations/es/index.js
'menu.blog': 'Blog'
'blog.readmore': 'Leer más'
'blog.by': 'Por'
'blog.published': 'Publicado el'
'blog.relatedStories': 'Cuentos Relacionados'

// src/translations/en/index.js
'menu.blog': 'Blog'
'blog.readmore': 'Read More'
'blog.by': 'By'
'blog.published': 'Published on'
'blog.relatedStories': 'Related Stories'
```

## Quality Checklist

Before publishing a post with story references:

- [ ] Story slugs verified to exist in both collections
- [ ] All story_recommendation blocks have valid slugs
- [ ] Descriptions are compelling and accurate
- [ ] Language is consistent between ES and EN versions
- [ ] All translation keys are available
- [ ] Post has 3-8 tags for SEO
- [ ] Category is one of the predefined categories
- [ ] Date is in YYYY-MM-DD format
- [ ] No typos or broken links

## Examples

### Post About Fear Resolution (Good Example)
The "Cuentos para Resolver Miedos Infantiles" post demonstrates:
- Story recommendations after each fear type section
- Different color variants for different emotion types
- Relevant labels that describe the story's therapeutic use
- Clear descriptions of why each story helps

### Post About Storytelling Techniques (Good Example)
The "Cómo Contar Historias" post demonstrates:
- A practice section with recommended stories
- Using story recommendations for application
- Guiding readers to actual stories they can use

## Troubleshooting

### Story recommendation not showing
- Verify the `slug` matches exactly (case-sensitive)
- Check that the story exists in the JSON file
- Ensure `story_recommendation` type is spelled correctly

### SEO component not generating schema
- Check that `BlogSEO` component is imported in the page
- Verify props are passed correctly: `post`, `stories`, `lang`, `baseUrl`
- Check browser console for errors

### Link not working
- Verify the story slug matches the route: `/cuento/{slug}/` (ES) or `/story/{slug}/` (EN)
- Check `router/index.js` for correct routing configuration

## Future Enhancements

Planned improvements to the post-seo skill:
1. Auto-detection of story recommendations based on content
2. Automated slug verification
3. Multi-language content sync checking
4. Story recommendation analytics tracking
5. Dynamic related stories widget
