/**
 * useShareTracking - Composable para gestionar share tracking
 */

import { ref, onMounted } from 'vue'
import {
  hasUserShared,
  markAsShared,
  resetShareState,
  getShareInfo
} from '../utils/shareTracking'

export default function useShareTracking() {
  const canProceed = ref(false)
  const shareInfo = ref({})
  const hasShared = ref(false)

  /**
   * Marca que el usuario ha compartido
   * Se llama desde el componente Share después de compartir
   */
  const onShareSuccess = () => {
    markAsShared()
    hasShared.value = true
    canProceed.value = true
  }

  /**
   * Resetea el estado de compartir (después de envío exitoso)
   */
  const resetShare = () => {
    resetShareState()
    hasShared.value = false
    canProceed.value = false
  }

  /**
   * Verifica el estado actual
   */
  const checkShareStatus = () => {
    const info = getShareInfo()
    hasShared.value = info.hasShared
    canProceed.value = info.canProceed
    shareInfo.value = info
    return canProceed.value
  }

  /**
   * Obtiene la información de shares
   */
  const getInfo = () => {
    return shareInfo.value
  }

  // Setup: Verificar estado al montar
  onMounted(() => {
    checkShareStatus()
  })

  return {
    canProceed,
    shareInfo,
    hasShared,
    onShareSuccess,
    resetShare,
    checkShareStatus,
    getInfo
  }
}
