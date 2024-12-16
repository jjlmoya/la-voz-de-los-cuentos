import { ref, toValue } from 'vue'
import { getCharacters as _getCharacters } from '../data'
const characters = _getCharacters()

export default function useCharacters() {
  const allCharacters = [...characters]

  const getAllCharacters = () => {
    return allCharacters
  }
  const getCharacterSagaImageKey = saga => {
    if (saga.includes('luna')) return 'luna'
    if (saga.includes('eloy')) return 'eloy'
    if (saga.includes('sdg') || saga.includes('crt')) return 'sdg'
    if (saga.includes('tupi') || saga.includes('crt')) return 'tupi'
    if (saga.includes('llamarada')) return 'llamarada'
    return 'tupi'
  }

  return {
    getCharacterSagaImageKey,
    getAllCharacters
  }
}
