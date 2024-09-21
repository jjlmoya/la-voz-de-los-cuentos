import es from '../data/es/landings.json'
import en from '../data/en/landings.json'

const lang = import.meta.env.PUBLIC_LANG
const landings = { es, en }[lang]

export default function useNewsLetters() {
  const getAll = () => {
    return landings
  }
  const hasLandings = () => {
    return !!landings.length
  }
  return {
    getAll,
    hasLandings
  }
}
