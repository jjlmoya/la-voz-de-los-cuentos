/**
 * useCustomDraft - Composable para gestionar borradores automáticos
 */

import { ref, watch, onMounted } from 'vue'
import { saveDraft, getDraft, clearDraft, hasDraft, getDraftInfo } from '../utils/draftManager'

export default function useCustomDraft(form) {
  const isDraftLoaded = ref(false)
  const hasSavedDraft = ref(false)
  const draftInfo = ref({})
  const isSaving = ref(false)

  // Debounce timer para auto-save
  let saveTimeout

  /**
   * Auto-guarda el formulario cuando cambia
   */
  const autoSave = () => {
    isSaving.value = true
    clearTimeout(saveTimeout)

    saveTimeout = setTimeout(() => {
      if (saveDraft(form.value)) {
        // Mostrar feedback visual breve
        setTimeout(() => {
          isSaving.value = false
        }, 500)
      }
    }, 1000)
  }

  /**
   * Recupera el borrador guardado
   */
  const loadDraft = () => {
    const savedDraft = getDraft()

    if (savedDraft) {
      Object.assign(form.value, {
        name: savedDraft.name || '',
        story: savedDraft.story || '',
        email: savedDraft.email || '',
        receiveAll: savedDraft.receiveAll !== undefined ? savedDraft.receiveAll : true,
        currentStep: savedDraft.currentStep || 1
      })
      isDraftLoaded.value = true
      hasSavedDraft.value = true
    }

    return savedDraft
  }

  /**
   * Descarta el borrador
   */
  const discardDraft = () => {
    clearDraft()
    hasSavedDraft.value = false
    // Reiniciar formulario
    Object.assign(form.value, {
      name: '',
      story: '',
      email: '',
      receiveAll: true,
      currentStep: 1
    })
  }

  /**
   * Obtiene info del borrador para mostrar en UI
   */
  const getInfo = () => {
    return getDraftInfo()
  }

  /**
   * Verifica si hay un borrador guardado
   */
  const checkForDraft = () => {
    const exists = hasDraft()
    hasSavedDraft.value = exists
    draftInfo.value = getDraftInfo()
    return exists
  }

  /**
   * Limpia el borrador (después de envío exitoso)
   */
  const removeDraft = () => {
    clearDraft()
    hasSavedDraft.value = false
  }

  // Setup: Verificar si hay draft al montar
  onMounted(() => {
    checkForDraft()
  })

  // Watch: Auto-save en cualquier cambio del formulario
  watch(
    () => form.value,
    () => {
      if (isDraftLoaded.value) {
        autoSave()
      }
    },
    { deep: true }
  )

  return {
    isDraftLoaded,
    hasSavedDraft,
    draftInfo,
    isSaving,
    autoSave,
    loadDraft,
    discardDraft,
    checkForDraft,
    getInfo,
    removeDraft
  }
}
