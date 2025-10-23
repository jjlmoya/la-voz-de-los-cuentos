/**
 * Share Tracking - Gestiona el tracking de shares y validación
 * Necesario para poder crear un cuento personalizado
 */

const STORAGE_KEYS = {
  HAS_SHARED: 'customStory:hasShared',
  SHARE_TIMESTAMP: 'customStory:shareTimestamp',
  SHARES_COUNT: 'customStory:sharesCount',
  LAST_SUBMISSION: 'customStory:lastSubmission'
}

/**
 * Marca que el usuario ha compartido
 * Se llama desde el componente Share cuando comparte
 */
export const markAsShared = () => {
  try {
    const now = new Date().toISOString()
    localStorage.setItem(STORAGE_KEYS.HAS_SHARED, 'true')
    localStorage.setItem(STORAGE_KEYS.SHARE_TIMESTAMP, now)

    // Incrementar contador de shares
    const currentCount = parseInt(
      localStorage.getItem(STORAGE_KEYS.SHARES_COUNT) || '0'
    )
    localStorage.setItem(STORAGE_KEYS.SHARES_COUNT, String(currentCount + 1))

    return true
  } catch (error) {
    console.error('Error marking as shared:', error)
    return false
  }
}

/**
 * Verifica si el usuario ha compartido
 * @returns {boolean}
 */
export const hasUserShared = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.HAS_SHARED) === 'true'
  } catch (error) {
    console.error('Error checking if user shared:', error)
    return false
  }
}

/**
 * Resetea el estado de compartir (después de envío exitoso)
 * El usuario debe compartir de nuevo para crear otro cuento
 */
export const resetShareState = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.HAS_SHARED, 'false')
    localStorage.setItem(STORAGE_KEYS.LAST_SUBMISSION, new Date().toISOString())
    return true
  } catch (error) {
    console.error('Error resetting share state:', error)
    return false
  }
}

/**
 * Obtiene información del share tracking (para UI)
 * @returns {Object}
 */
export const getShareInfo = () => {
  try {
    const hasShared = hasUserShared()
    const sharesCount = parseInt(
      localStorage.getItem(STORAGE_KEYS.SHARES_COUNT) || '0'
    )
    const timestamp = localStorage.getItem(STORAGE_KEYS.SHARE_TIMESTAMP)

    return {
      hasShared,
      sharesCount,
      timestamp,
      canProceed: hasShared
    }
  } catch (error) {
    console.error('Error getting share info:', error)
    return {
      hasShared: false,
      sharesCount: 0,
      timestamp: null,
      canProceed: false
    }
  }
}

/**
 * Obtiene el último timestamp de envío
 * @returns {Date|null}
 */
export const getLastSubmissionTime = () => {
  try {
    const timestamp = localStorage.getItem(STORAGE_KEYS.LAST_SUBMISSION)
    return timestamp ? new Date(timestamp) : null
  } catch (error) {
    console.error('Error getting last submission time:', error)
    return null
  }
}

/**
 * Limpia todo el estado de compartir (para desarrollo/testing)
 */
export const clearShareState = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HAS_SHARED)
    localStorage.removeItem(STORAGE_KEYS.SHARE_TIMESTAMP)
    localStorage.removeItem(STORAGE_KEYS.SHARES_COUNT)
    localStorage.removeItem(STORAGE_KEYS.LAST_SUBMISSION)
    return true
  } catch (error) {
    console.error('Error clearing share state:', error)
    return false
  }
}
