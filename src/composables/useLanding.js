import { getStories as _getStories } from '../data'

// Extract refinement hints from description text
const extractRefinementKeywords = (description) => {
  if (!description) return []

  const text = description.toLowerCase()
  const keywords = []

  // Patterns: "mejor que tengan XXX", "con XXX", "donde XXX", "que incluyan XXX"
  const patterns = [
    /mejor que tengan\s+(\w+)/g,
    /con\s+(\w+)(?:\s|,|\.)/g,
    /donde\s+(\w+)/g,
    /que incluyan\s+(\w+)/g,
    /que tengan\s+(\w+)/g,
  ]

  patterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(text)) !== null) {
      if (match[1] && match[1].length > 2) {
        keywords.push(match[1])
      }
    }
  })

  return [...new Set(keywords)] // Remove duplicates
}

export default function useLanding(landing, lang = 'es') {
  const getStories = () => {
    if (!landing) return []

    // If landing still has keys (old format), use them
    if (landing.keys && Array.isArray(landing.keys)) {
      return _getStories()
        .filter(_story => landing.keys.includes(_story.key))
        .reverse()
        .slice(0, 25)
    }

    // New dynamic format: use category and keywords
    if (landing.category && landing.keywords) {
      const stories = _getStories()
      const matchedStories = stories.filter(story => {
        // Search in story title or content for keyword matches
        const searchText = `${story.name} ${story.story}`.toLowerCase()
        return landing.keywords.some(keyword =>
          searchText.includes(keyword.toLowerCase())
        )
      })

      return matchedStories.slice(0, 25)
    }

    return []
  }

  const getContentBlocks = () => {
    if (!landing) return []

    const blocks = []
    const allStories = getStories()

    // Use editorial content if provided
    if (landing.content && Array.isArray(landing.content)) {
      blocks.push(...landing.content)

      // Extract story slugs already used in content
      const usedSlugs = landing.content
        .filter(block => block.type === 'story_recommendation')
        .map(block => block.slug)

      // Get remaining stories not used in content
      const restStories = allStories.filter(story => !usedSlugs.includes(story.key))

      // Add gallery with remaining stories
      if (restStories.length > 0) {
        const textBody = lang === 'en'
          ? 'These are just some of our featured stories. Discover many more tales in our collection.'
          : 'Estos son solo algunos de nuestros cuentos destacados. Descubre muchas más historias en nuestra colección.'

        blocks.push({
          type: 'text',
          body: textBody
        })

        const galleryTitle = lang === 'en' ? 'More Stories to Explore' : 'Más historias para explorar'
        const gallerySubtitle = lang === 'en'
          ? 'A complete collection full of adventures, emotions and magic'
          : 'Una colección completa llena de aventuras, emociones y magia'

        blocks.push({
          type: 'stories_gallery',
          stories: restStories,
          title: galleryTitle,
          subtitle: gallerySubtitle
        })
      }

      return blocks
    }

    // Fallback: if no content defined, use description + auto-refinement
    if (landing.description) {
      blocks.push({
        type: 'text',
        body: landing.description
      })

      // Extract refinement keywords from description
      const refinementKeywords = extractRefinementKeywords(landing.description)

      // Refine stories based on additional keywords
      let featuredStories = allStories
      if (refinementKeywords.length > 0 && allStories.length > 0) {
        const refined = allStories.filter(story => {
          const searchText = `${story.name} ${story.story}`.toLowerCase()
          return refinementKeywords.some(keyword =>
            searchText.includes(keyword.toLowerCase())
          )
        })
        // Use refined if found, otherwise fallback to all
        featuredStories = refined.length > 0 ? refined : allStories
      }

      // If no stories found by keywords, get ALL stories for this category
      if (featuredStories.length === 0 && landing.category) {
        const allAvailableStories = _getStories()
        featuredStories = allAvailableStories
      }

      // Show featured stories
      if (featuredStories.length > 0) {
        const galleryTitle = lang === 'en' ? 'Explore More Stories' : 'Explora Más Cuentos'
        const gallerySubtitle = lang === 'en'
          ? 'Discover tales from our complete collection'
          : 'Descubre historias de nuestra colección completa'

        blocks.push({
          type: 'stories_gallery',
          stories: featuredStories,
          title: galleryTitle,
          subtitle: gallerySubtitle
        })
      }
    }

    return blocks
  }

  const firstParagraph = () => {
    if (!landing?.description) return ''
    return landing.description.split('\n').filter(p => p.trim() !== '')[0]
  }

  const html = () => {
    if (!landing?.description) return ''
    return landing.description
      .split('\n')
      .filter(p => p.trim() !== '')
      .map((paragraph, index) => `<p key=${index}>${paragraph}</p>`)
      .join('<br>')
  }

  return {
    getStories,
    getContentBlocks,
    firstParagraph,
    html
  }
}
