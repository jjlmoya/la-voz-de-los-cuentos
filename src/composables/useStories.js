import { ref, toValue } from 'vue'
import { getStories as _getStories } from '../data'
import useStory from './useStory'
const stories = _getStories()

export default function useStories() {
  const allStories = [...stories]

  const getFirstStory = () => {
    return allStories
  }

  const getStoryBySlug = () => {
    return allStories.find(entry => entry.key == slug)
  }

  const getLastStory = () => {
    return allStories[allStories.length - 1]
  }

  const getRandomStory = () => {
    const randomIndex = Math.floor(Math.random() * allStories.length)
    return allStories[randomIndex]
  }

  const getAllStories = () => {
    return allStories
  }

  const getStoriesByPage = (pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    const endIndex = startIndex + pageSize
    return allStories.slice(startIndex, endIndex)
  }

  const getLastNStories = n => {
    return allStories.slice(-n)
  }

  const getTitleSimilarity = (title1, title2) => {
    const words1 = new Set(title1.toLowerCase().split(/\s+/))
    const words2 = new Set(title2.toLowerCase().split(/\s+/))

    const intersection = new Set([...words1].filter(word => words2.has(word)))
    const union = new Set([...words1, ...words2])

    return intersection.size / union.size // Similarity score between 0 and 1
  }

  const getCompleteStories = () =>
    stories.filter(entry => {
      const { isComplete } = useStory(entry)
      return isComplete()
    })
  const getPendingStories = () =>
    stories.filter(entry => {
      const { isComplete } = useStory(entry)
      return !isComplete()
    })
  const getFavoriteStories = () => {
    if (typeof localStorage === 'undefined') return []

    try {
      const storiesData = localStorage.getItem('storiesData')
      if (!storiesData) return []

      const parsedData = JSON.parse(storiesData)
      if (!Array.isArray(parsedData)) return []

      // Filtrar favoritos y mapear a objetos de historia completos
      const favoriteKeys = parsedData
        .filter(entry => entry.like === true)
        .map(entry => entry.key)

      // Retornar historias completas que están en favoritos
      return allStories.filter(story => favoriteKeys.includes(story.key))
    } catch (error) {
      console.error('Error al obtener favoritos:', error)
      return []
    }
  }

  const getRelatedStories = story => {
    const sameSagaStories = allStories.filter(
      entry => entry.saga === story.saga && entry.key !== story.key
    )
    if (sameSagaStories.length < 10) {
      const remainingSlots = 10 - sameSagaStories.length

      const similarTimeStories = allStories
        .filter(
          entry =>
            entry.saga !== story.saga &&
            Math.abs(parseInt(entry.time) - parseInt(story.time)) <= 50 &&
            entry.key !== story.key
        )
        .sort(
          (a, b) =>
            Math.abs(a.time - story.time) - Math.abs(b.time - story.time)
        )
        .slice(0, remainingSlots)
      return [...sameSagaStories, ...similarTimeStories]
    }

    return sameSagaStories.slice(0, 10)
  }

  return {
    getFirstStory,
    getLastStory,
    getRandomStory,
    getAllStories,
    getStoriesByPage,
    getLastNStories,
    getRelatedStories,
    getCompleteStories,
    getPendingStories,
    getFavoriteStories
  }
}
