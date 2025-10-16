import { ref, readonly } from 'vue'

export interface Achievement {
  id: string
  name: string
  description: string
  icon?: string
}

export interface AchievementNotification extends Achievement {
  timestamp: number
}

// Estado global compartido
const activeNotification = ref<AchievementNotification | null>(null)
const notificationQueue = ref<AchievementNotification[]>([])
let isProcessing = false

/**
 * Composable para manejar notificaciones de logros de forma genérica
 * Puede ser llamado desde cualquier parte de la aplicación
 *
 * @example
 * const { showAchievement, currentNotification } = useAchievementNotification()
 * showAchievement({ id: 'fast-reader', name: 'Lector Veloz', description: '¡Leíste 10 historias!' })
 */
export function useAchievementNotification() {
  /**
   * Mostrar una notificación de logro
   * Si hay una notificación activa, se añade a la cola para mostrar después
   */
  function showAchievement(achievement: Achievement) {
    const notification: AchievementNotification = {
      ...achievement,
      timestamp: Date.now()
    }

    notificationQueue.value.push(notification)
    processQueue()
  }

  /**
   * Procesar la cola de notificaciones
   * Muestra una a la vez esperando a que termine antes de mostrar la siguiente
   */
  function processQueue() {
    if (isProcessing || notificationQueue.value.length === 0) {
      return
    }

    isProcessing = true
    const notification = notificationQueue.value.shift()

    if (notification) {
      activeNotification.value = notification

      // Auto-cerrar después de 4 segundos
      setTimeout(() => {
        closeNotification()
      }, 4000)
    }
  }

  /**
   * Cerrar la notificación actual y procesar la siguiente
   */
  function closeNotification() {
    activeNotification.value = null
    isProcessing = false

    // Procesar la siguiente notificación en la cola
    if (notificationQueue.value.length > 0) {
      setTimeout(() => {
        processQueue()
      }, 300) // Pequeño delay entre notificaciones
    }
  }

  /**
   * Limpiar todas las notificaciones pendientes
   */
  function clearAll() {
    activeNotification.value = null
    notificationQueue.value = []
    isProcessing = false
  }

  return {
    // Estado
    currentNotification: readonly(activeNotification),
    pendingCount: readonly(notificationQueue),

    // Métodos
    showAchievement,
    closeNotification,
    clearAll
  }
}
