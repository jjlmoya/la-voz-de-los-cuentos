import { ref, toValue } from 'vue'
import { getCharacters as _getCharacters } from '../data'
import useStory from './useStory'
const characters = _getCharacters()

export default function useCharacters() {
  const allCharacters = [...characters]

  const getFirstStory = () => {
    return allCharacters
  }

  const getStoryBySlug = () => {
    return allCharacters.find(entry => entry.key == slug)
  }

  const getLastStory = () => {
    return allCharacters[allCharacters.length - 1]
  }

  const getRandomStory = () => {
    const randomIndex = Math.floor(Math.random() * allCharacters.length)
    return allCharacters[randomIndex]
  }

  const getAllCharacters = () => {
    return allCharacters
  }

  const getCharactersByPage = (pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    const endIndex = startIndex + pageSize
    return allCharacters.slice(startIndex, endIndex)
  }

  const getLastNCharacters = n => {
    return allCharacters.slice(-n)
  }

  const getTitleSimilarity = (title1, title2) => {
    const words1 = new Set(title1.toLowerCase().split(/\s+/))
    const words2 = new Set(title2.toLowerCase().split(/\s+/))

    const intersection = new Set([...words1].filter(word => words2.has(word)))
    const union = new Set([...words1, ...words2])

    return intersection.size / union.size // Similarity score between 0 and 1
  }

  const getCompleteCharacters = () =>
    characters.filter(entry => {
      const { isComplete } = useStory(entry)
      return isComplete()
    })
  const getPendingCharacters = () =>
    characters.filter(entry => {
      const { isComplete } = useStory(entry)
      return !isComplete()
    })
  const getFavoriteCharacters = () =>
    (JSON.parse(localStorage?.getItem('charactersData')) || []).filter(
      entry => entry.like
    )

  const getRelatedCharacters = story => {
    const sameSagaCharacters = allCharacters.filter(
      entry => entry.saga === story.saga && entry.key !== story.key
    )
    if (sameSagaCharacters.length < 10) {
      const remainingSlots = 10 - sameSagaCharacters.length

      const similarTimeCharacters = allCharacters
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
      return [...sameSagaCharacters, ...similarTimeCharacters]
    }

    return sameSagaCharacters.slice(0, 10)
  }

  return {
    getFirstStory,
    getLastStory,
    getRandomStory,
    getAllCharacters,
    getCharactersByPage,
    getLastNCharacters,
    getRelatedCharacters,
    getCompleteCharacters,
    getPendingCharacters,
    getFavoriteCharacters
  }
}
