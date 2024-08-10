import { ref } from 'vue'
import stories from '../data/stories.json'

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

  return {
    getFirstStory,
    getLastStory,
    getRandomStory,
    getAllStories,
    getStoriesByPage,
    getLastNStories
  }
}
