import { ref, toValue } from 'vue'
import { getCharacters as _getCharacters } from '../data'
import { getStories } from '../data'
const characters = _getCharacters()

export default function useCharacter(character) {
  const getRelatedStories = () => {
    const allStories = getStories()
    return allStories.filter((story) => {
      if (character.saga) { 
        if (story.saga !== character.saga) return
      } else {
        
      }
      console.log(story)
      return story.story.includes(character.name) || story.story.includes(character.name.toLowerCase())
    })
  }
  const getCharactersSameSaga = () => {
    const currentCharacter = toValue(character) // Accede al valor actual
    return characters.filter(_character => {
      getRelatedStories
      return (
        _character.saga === currentCharacter.saga &&
        _character.order !== currentCharacter.order
      )
    })
  }

  const getSagaImageKey = () => {
    const currentCharacter = toValue(character)
    if (currentCharacter.saga.includes('luna')) return 'luna'
    if (currentCharacter.saga.includes('eloy')) return 'eloy'
    if (
      currentCharacter.saga.includes('sdg') ||
      currentCharacter.saga.includes('crt')
    )
      return 'sdg'
    if (
      currentCharacter.saga.includes('tupi') ||
      currentCharacter.saga.includes('crt')
    )
      return 'tupi'
    return 'tupi'
  }

  return {
    getSagaImageKey,
    getCharactersSameSaga,
    getRelatedStories
  }
}
