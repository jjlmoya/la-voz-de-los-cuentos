import { ref, toValue } from 'vue'
import { getCharacters as _getCharacters } from '../data'
import { getStories } from '../data'
const characters = _getCharacters()

export default function useCharacter(character) {
  const getRelatedStories = () => {
    const allStories = getStories()
    return allStories.filter(story => {
      if (character.saga) {
        if (story.saga !== character.saga) return
      } else {
      }
      console.log(story)
      return (
        story.saga === character.saga &&
        story.story.toLowerCase().includes(character.name.toLowerCase())
      )
    })
  }
  const getCharactersSameSaga = () => {
    const currentCharacter = toValue(character) // Accede al valor actual
    return characters.filter(_character => {
      getRelatedStories
      return (
        _character.saga &&
        _character.saga === currentCharacter.saga &&
        _character.order !== currentCharacter.order
      )
    })
  }

  const getSagaImageKey = () => {
    const saga = character.saga

    if (saga.includes('luna')) return 'luna'
    if (saga.includes('eloy')) return 'eloy'
    if (saga.includes('sdg') || saga.includes('crt')) return 'sdg'
    if (saga.includes('tupi') || saga.includes('crt')) return 'tupi'
    if (saga.includes('legends') || saga.includes('leyendas')) return 'legends'
    if (saga.includes('458')) return '458'
    if (saga.includes('paco')) return 'paco'
    if (saga.includes('carlota') || saga.includes('charlotte'))
      return 'cockroach'
    if (saga.includes('llamarada')) return 'llamarada'
    if (saga.includes('finalizador') || saga.includes('finisher'))
      return 'finalizador'

    return 'feather'
  }

  return {
    getSagaImageKey,
    getCharactersSameSaga,
    getRelatedStories
  }
}
