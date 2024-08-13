import { ref } from 'vue'
import { getStories as _getStories } from '../data'
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

  const getRelatedStories = story => {
    const sameSagaStories = allStories.value.filter(
      entry => entry.saga === story.saga && entry.key !== story.key
    )

    if (sameSagaStories.length < 8) {
      const remainingSlots = 8 - sameSagaStories.length

      const similarTimeStories = allStories.value
        .filter(
          entry =>
            entry.saga !== story.saga &&
            Math.abs(entry.time - story.time) <= 2 &&
            entry.key !== story.key
        )
        .sort(
          (a, b) =>
            Math.abs(a.time - story.time) - Math.abs(b.time - story.time)
        )
        .slice(0, remainingSlots)
      return [...sameSagaStories, ...similarTimeStories]
    }

    return sameSagaStories.slice(0, 8)
  }

  return {
    getFirstStory,
    getLastStory,
    getRandomStory,
    getAllStories,
    getStoriesByPage,
    getLastNStories,
    getRelatedStories
  }
}
