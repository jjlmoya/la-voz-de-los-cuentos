/**
 * Draft Manager - Gestiona guardado automático de borradores
 * Utiliza LocalStorage para persistencia
 */

const STORAGE_KEYS = {
  DRAFT: 'customStory:draft',
  DRAFT_TIMESTAMP: 'customStory:draftTimestamp',
  DRAFT_EXPIRY_DAYS: 30
}

/**
 * Guarda el borrador en LocalStorage
 * @param {Object} formData - Datos del formulario
 */
export const saveDraft = (formData) => {
  try {
    const draft = {
      name: formData.name || '',
      story: formData.story || '',
      email: formData.email || '',
      receiveAll: formData.receiveAll !== undefined ? formData.receiveAll : true,
      currentStep: formData.currentStep || 1,
      lastModified: new Date().toISOString()
    }

    localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draft))
    return true
  } catch (error) {
    console.error('Error saving draft:', error)
    return false
  }
}

/**
 * Recupera el borrador del LocalStorage
 * @returns {Object|null} Datos del borrador o null si no existe/expiró
 */
export const getDraft = () => {
  try {
    const draftData = localStorage.getItem(STORAGE_KEYS.DRAFT)

    if (!draftData) return null

    const draft = JSON.parse(draftData)

    // Verificar expiración (30 días)
    if (draft.lastModified) {
      const lastModified = new Date(draft.lastModified)
      const now = new Date()
      const daysDiff = (now - lastModified) / (1000 * 60 * 60 * 24)

      if (daysDiff > STORAGE_KEYS.DRAFT_EXPIRY_DAYS) {
        clearDraft()
        return null
      }
    }

    return draft
  } catch (error) {
    console.error('Error retrieving draft:', error)
    return null
  }
}

/**
 * Limpia el borrador del LocalStorage
 */
export const clearDraft = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.DRAFT)
    return true
  } catch (error) {
    console.error('Error clearing draft:', error)
    return false
  }
}

/**
 * Verifica si existe un borrador guardado
 * @returns {boolean}
 */
export const hasDraft = () => {
  const draft = getDraft()
  return draft !== null && (
    draft.name ||
    draft.story ||
    draft.email
  )
}

/**
 * Obtiene información del borrador (para UI)
 * @returns {Object} Con propiedades: exists, lastModified, progress
 */
export const getDraftInfo = () => {
  const draft = getDraft()

  if (!draft) {
    return {
      exists: false,
      lastModified: null,
      progress: 0
    }
  }

  const lastModified = new Date(draft.lastModified)
  const now = new Date()
  const minutes = Math.round((now - lastModified) / (1000 * 60))

  let timeAgo = 'hace poco'
  if (minutes > 60) {
    const hours = Math.round(minutes / 60)
    timeAgo = `hace ${hours}h`
  } else if (minutes > 1) {
    timeAgo = `hace ${minutes}m`
  }

  // Calcular progreso
  let progress = 0
  if (draft.name) progress += 25
  if (draft.story) progress += 35
  if (draft.email) progress += 25
  if (draft.receiveAll !== undefined) progress += 15

  return {
    exists: true,
    lastModified: timeAgo,
    progress: Math.min(progress, 100),
    currentStep: draft.currentStep || 1
  }
}
