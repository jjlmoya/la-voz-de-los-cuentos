/**
 * Limpia y valida datos del localStorage
 * Filtra elementos null/undefined y valida que tengan propiedades requeridas
 */
export function getStoriesData() {
  try {
    const data = localStorage.getItem('storiesData')
    if (!data) return []
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) return []
    // Filtrar null y undefined
    return parsed.filter(item => item && typeof item === 'object')
  } catch (error) {
    console.warn('Error reading storiesData from localStorage:', error)
    return []
  }
}

export function getSongsData() {
  try {
    const data = localStorage.getItem('songsData')
    if (!data) return []
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) return []
    // Filtrar null y undefined
    return parsed.filter(item => item && typeof item === 'object')
  } catch (error) {
    console.warn('Error reading songsData from localStorage:', error)
    return []
  }
}

/**
 * Combina y limpia datos de historias y canciones
 */
export function getAllContent() {
  return [...getStoriesData(), ...getSongsData()]
}

/**
 * Obtiene datos completados (pueden ser historias o canciones)
 */
export function getCompletedContent() {
  return getAllContent().filter(item => item && item.finished === true)
}

/**
 * Obtiene datos pendientes
 */
export function getPendingContent() {
  return getAllContent().filter(item => item && item.finished !== true)
}

/**
 * Obtiene datos favoritos
 */
export function getFavoriteContent() {
  return getAllContent().filter(item => item && item.like === true)
}
