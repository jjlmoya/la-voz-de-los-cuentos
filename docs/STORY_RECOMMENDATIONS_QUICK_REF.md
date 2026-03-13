# Story Recommendations - Quick Reference

## Available Story Slugs

### Fear-Related Stories
- `la-leyenda-de-la-reina-de-la-noche` / `the-legend-of-the-queen-of-the-night` - Night fears
- `el-demonio-y-la-cucharita-perdida` / `the-demon-and-the-lost-spoon` - Monster fears
- `sdg-el-caso-del-misterioso-maullido-medianoche` / `crt-the-case-of-the-midnight-meow` - Animal fears

### Development-Related Stories
- `la-leyenda-de-la-insomne-sombra` / Similar slug in EN - Sleep/rest stories
- Stories with mystery and adventure themes - For cognitive development

## Color Coding

| Variant | Use Case | Color |
|---------|----------|-------|
| `primary` | Main recommendations, night stories | Purple |
| `secondary` | Monster stories, fears, mysteries | Pink |
| `success` | Adventure, discovery, animal stories | Blue |
| `warning` | Cautionary tales, intense emotions | Orange |

## Minimal Code Block

```javascript
{
  type: "story_recommendation",
  slug: "slug-here",
  title: "Story Title",
  description: "Why this story matters for this blog post",
  variant: "primary"
}
```

## Full Code Block (With All Options)

```javascript
{
  type: "story_recommendation",
  slug: "la-leyenda-de-la-reina-de-la-noche",
  title: "La Leyenda de la Reina de la Noche",
  description: "Un cuento que transforma la percepción del niño sobre la oscuridad.",
  duration: 15,
  variant: "primary",
  label: "Cuento para la Oscuridad"
}
```

## When Creating a New Post

1. **Identify story-related sections** - Where you talk about specific types of stories
2. **Find matching stories** - Search the collection for stories that match
3. **Insert story_recommendation blocks** - After relevant sections
4. **Use consistent variants** - Same type of fear/theme = same color
5. **Write compelling descriptions** - Help readers understand why this story helps

## Example: Post About Anxiety

```javascript
content: [
  {
    type: "heading",
    level: 2,
    text: "Stories for Sleep Anxiety"
  },
  {
    type: "text",
    body: "When children struggle with sleep, specific stories can help ease their transition to rest..."
  },
  {
    type: "story_recommendation",
    slug: "la-leyenda-de-la-reina-de-la-noche",
    title: "La Leyenda de la Reina de la Noche",
    description: "Transforms nighttime anxiety into wonder and magic",
    variant: "primary",
    label: "Cuento para Dormir"
  }
]
```

## Testing Your Post

After adding story recommendations:
1. Check that slugs exist in the JSON data files
2. Build locally: `npm run build`
3. Verify story links work correctly
4. Test in both ES and EN versions

## Common Slug Patterns

Spanish stories typically follow: `descriptive-slug-in-spanish`
English stories typically follow: `descriptive-slug-in-english`

Always verify exact slugs before referencing!

## SEO Tips

- Use 1-3 story recommendations per post
- Place them near relevant text sections
- Use unique labels for each recommendation
- Vary the color variants for visual interest
- Keep descriptions under 100 words
