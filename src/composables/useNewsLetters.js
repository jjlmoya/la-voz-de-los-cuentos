import es from '../data/es/newsletters.json'
import en from '../data/en/newsletters.json'

const lang = import.meta.env.PUBLIC_LANG
const newsletters = { es, en }[lang]

export default function useNewsLetters() {
  const getAll = () => {
    return newsletters
  }
  const hasNewsLetters = () => {
    return false //!!newsletters.length
  }
  return {
    getAll,
    hasNewsLetters
  }
}
