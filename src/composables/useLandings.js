import { getLandings } from '../data/index.js'

const lang = import.meta.env.PUBLIC_LANG || 'es'

export default function useLandings() {
  const getAll = () => {
    return getLandings(lang) || []
  }
  const hasLandings = () => {
    const landings = getLandings(lang)
    return !!landings?.length
  }
  return {
    getAll,
    hasLandings
  }
}
