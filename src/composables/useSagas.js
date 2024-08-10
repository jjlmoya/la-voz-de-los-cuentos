import { ref } from 'vue'
import sagas from '../data/sagas.json'
export default function useSagas() {
  const allSagas = ref(
    [...sagas].sort((a, b) => new Date(a.order) - new Date(b.order))
  )

  const getFirstSaga = () => {
    return allSagas.value[0]
  }

  const getLastSaga = () => {
    return allSagas.value[allSagas.value.length - 1]
  }

  const getRandomSaga = () => {
    const randomIndex = Math.floor(Math.random() * allSagas.value.length)
    return allSagas.value[randomIndex]
  }

  const getAllSagas = () => {
    return allSagas.value
  }

  const getSagasByPage = (pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    const endIndex = startIndex + pageSize
    return allSagas.value.slice(startIndex, endIndex)
  }

  const getLastNSagas = n => {
    return allSagas.value.slice(0, 8)
  }
  return {
    getFirstSaga,
    getLastSaga,
    getRandomSaga,
    getAllSagas,
    getSagasByPage,
    getLastNSagas
  }
}
