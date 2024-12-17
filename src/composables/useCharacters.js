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
    if (saga.includes('legends') || saga.includes('leyendas')) return 'legends'
    if (saga.includes('458')) return '458'
    if (saga.includes('paco')) return 'paco'
    if (saga.includes('carlota') || saga.includes('charlotte'))
      return 'cockroach'
    if (saga.includes('llamarada')) return 'llamarada'
    if (saga.includes('finalizador') || saga.includes('finisher'))
      return 'finalizador'

    return 'legends'
  }

  return {
    getCharacterSagaImageKey,
    getAllCharacters
  }
}
