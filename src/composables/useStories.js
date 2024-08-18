import { ref } from 'vue'
import { getStories as _getStories } from '../data'
import useStory from './useStory'
const stories = _getStories()

export default function useStories() {
  const allStories = ref(
    [...stories].sort((a, b) => new Date(a.date) - new Date(b.date))
  )

  const getFirstStory = () => {
    return allStories.value[0]
  }

  const getStoryBySlug = () => {
    return allStories.find(entry => entry.key == slug)
  }

  const getLastStory = () => {
    return allStories.value[allStories.value.length - 1]
  }

  const getRandomStory = () => {
    const randomIndex = Math.floor(Math.random() * allStories.value.length)
    return allStories.value[randomIndex]
  }

  const getAllStories = () => {
    return allStories.value
  }

  const getStoriesByPage = (pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    const endIndex = startIndex + pageSize
    return allStories.value.slice(startIndex, endIndex)
  }

  const getLastNStories = n => {
    return allStories.value.slice(-n)
  }

  const getTitleSimilarity = (title1, title2) => {
    const words1 = new Set(title1.toLowerCase().split(/\s+/))
    const words2 = new Set(title2.toLowerCase().split(/\s+/))

    const intersection = new Set([...words1].filter(word => words2.has(word)))
    const union = new Set([...words1, ...words2])

    return intersection.size / union.size // Similarity score between 0 and 1
  }

  const getCompleteStories = () => stories.filter((entry) => {
    const { isComplete } = useStory(entry)
    return isComplete()
  })
  const getPendingStories = () => stories.filter((entry) => {
    const { isComplete } = useStory(entry)
    return !isComplete()
  })
  const getFavoriteStories = () => []

  const getRelatedStories = story => {
    const sameSagaStories = allStories.value.filter(
      entry => entry.saga === story.saga && entry.key !== story.key
    )
    if (sameSagaStories.length < 10) {
      const remainingSlots = 10 - sameSagaStories.length

      const similarTimeStories = allStories.value
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
