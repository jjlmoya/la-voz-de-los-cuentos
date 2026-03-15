import { getStories } from '../data/index.js'
import { storyTags } from '../data/es/storyTags.ts'

/**
 * Dynamic Landing Story Finder
 *
 * Searches stories dynamically based on:
 * 1. Category (from storyTags or custom)
 * 2. Keywords (words to match in story title/content)
 *
 * Returns sections organized by keyword with fallback logic
 */
export default function useLandingDynamic(landing, lang = 'es') {
  const allStories = getStories(lang)

  // Get base category stories
  const categoryStories = storyTags[landing.category] || allStories

  // Get category story objects (not just slugs)
  const categoryStoryObjects = allStories.filter(story =>
    categoryStories.includes(story.key)
  )

  /**
   * Find stories matching a keyword within the category
   */
  const getStoriesByKeyword = (keyword) => {
    return categoryStoryObjects.filter(story => {
      const name = story.name?.toLowerCase() || ''
      const content = story.story?.toLowerCase() || ''
      return name.includes(keyword.toLowerCase()) ||
             content.includes(keyword.toLowerCase())
    })
  }

  /**
   * Organize stories by keyword with fallback logic
   * Returns: { keyword: [stories], keyword2: [stories], ... }
   */
  const getStoriesByKeywords = () => {
    const sections = {}
    const usedKeys = new Set()

    landing.keywords.forEach(keyword => {
      let stories = getStoriesByKeyword(keyword)

      // Fallback: if < 2 stories, expand to full category
      if (stories.length < 2) {
        stories = categoryStoryObjects.filter(
          s => !usedKeys.has(s.key)
        ).slice(0, 5)
      }

      // Mark stories as used
      stories.forEach(s => usedKeys.add(s.key))
      sections[keyword] = stories
    })

    return sections
  }

  /**
   * Get all stories (for backwards compatibility with existing components)
   */
  const getAllStories = () => {
    return categoryStoryObjects
  }

  /**
   * Get organized sections with "Other Recommended" fallback
   */
  const getSections = () => {
    const sections = getStoriesByKeywords()

    // Collect used stories
    const usedKeys = new Set()
    Object.values(sections).forEach(stories => {
      stories.forEach(s => usedKeys.add(s.key))
    })

    // Add leftover stories as "Others"
    const others = categoryStoryObjects.filter(
      s => !usedKeys.has(s.key)
    )

    if (others.length > 0) {
      sections['otros'] = others
    }

    return sections
  }

  /**
   * Validate that landing has minimum viable content
   */
  const validate = () => {
    const issues = []

    if (!landing.category) {
      issues.push('❌ Landing missing category')
    }

    if (!Array.isArray(landing.keywords) || landing.keywords.length < 2) {
      issues.push('❌ Landing must have at least 2 keywords')
    }

    const sections = getStoriesByKeywords()
    let emptySections = 0

    Object.entries(sections).forEach(([keyword, stories]) => {
      if (stories.length === 0) {
        issues.push(`⚠️  Keyword "${keyword}" has no stories`)
        emptySections++
      }
    })

    if (emptySections === Object.keys(sections).length) {
      issues.push('❌ CRITICAL: No stories found for any keyword')
    }

    return {
      isValid: issues.length === 0,
      issues,
      totalStories: categoryStoryObjects.length,
      sections: Object.keys(sections).length
    }
  }

  return {
    getStoriesByKeyword,
    getStoriesByKeywords,
    getAllStories,
    getSections,
    validate,
    stories: categoryStoryObjects
  }
}
