import { ref, toValue } from 'vue'
import { getCharacters as _getCharacters } from '../data'
const characters = _getCharacters()

export default function useCharacter(character) {
  const getSagaImageKey = () => {
    if (character.saga.includes('luna')) return 'luna'
    if (character.saga.includes('eloy')) return 'eloy'
    if (character.saga.includes('sdg') || character.saga.includes('crt'))
      return 'sdg'
    if (character.saga.includes('tupi') || character.saga.includes('crt'))
      return 'tupi'
    return 'tupi'
  }

  return {
    getSagaImageKey
  }
}
