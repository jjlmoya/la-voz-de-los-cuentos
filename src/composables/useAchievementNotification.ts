/**
 * Composable mejorado para notificaciones de logros
 * Integra eventos, progreso y desbloqueos
 * Cola de notificaciones con manejo de múltiples eventos
 */

import { ref, readonly } from 'vue'
import type { AchievementNotificationData } from '../types/achievement'
import { onAchievementUnlock, onAchievementProgress } from '../achievements/achievementEvents'

interface NotificationQueueItem {
  id: string
  data: AchievementNotificationData
  timestamp: number
  displayedAt?: number
}

// Estado global de notificaciones
const activeNotification = ref<NotificationQueueItem | null>(null)
const notificationQueue = ref<NotificationQueueItem[]>([])
let isProcessing = false
let unsubscribeUnlock: (() => void) | null = null
let unsubscribeProgress: (() => void) | null = null

/**
 * Composable para mostrar notificaciones de logros con progreso
 */
export function useAchievementNotification() {
  /**
   * Inicializar listeners de eventos
   * (se llama automáticamente en el setup)
   */
  function setupEventListeners() {
    // Limpiar listeners anteriores si existen
    teardownEventListeners()

    // Escuchar desbloqueos
    unsubscribeUnlock = onAchievementUnlock(event => {
      if (event.isNew) {
        showNotification({
          id: event.achievement.id,
          nameEs: event.achievement.nameEs,
          nameEn: event.achievement.nameEn,
          descriptionEs: event.achievement.descriptionEs,
          descriptionEn: event.achievement.descriptionEn,
          iconId: event.achievement.iconId,
          type: 'unlock'
        })
      }
    })

    // Escuchar progreso
    unsubscribeProgress = onAchievementProgress(event => {
      // Mostrar notificación de progreso en hitos (25%, 50%, 75%, 100%)
      const hitos = [25, 50, 75, 100]
      if (hitos.includes(event.progress) && event.isNew) {
        showNotification({
          id: event.achievementId,
          nameEs: `Progreso de Logro`,
          nameEn: `Achievement Progress`,
          descriptionEs: `${event.current}/${event.target}`,
          descriptionEn: `${event.current}/${event.target}`,
          iconId: 'progress-indicator',
          type: 'progress',
          progress: event.progress,
          current: event.current,
          target: event.target
        })
      }
    })
  }

  /**
   * Limpiar listeners
   */
  function teardownEventListeners() {
    if (unsubscribeUnlock) {
      unsubscribeUnlock()
      unsubscribeUnlock = null
    }
    if (unsubscribeProgress) {
      unsubscribeProgress()
      unsubscribeProgress = null
    }
  }

  /**
   * Mostrar una notificación
   */
  function showNotification(notification: AchievementNotificationData) {
    const queueItem: NotificationQueueItem = {
      id: `${notification.id}-${Date.now()}`,
      data: notification,
      timestamp: Date.now()
    }

    notificationQueue.value.push(queueItem)
    processQueue()
  }

  /**
   * Procesar la cola de notificaciones
   */
  function processQueue() {
    if (isProcessing || notificationQueue.value.length === 0) {
      return
    }

    isProcessing = true
    const queueItem = notificationQueue.value.shift()

    if (queueItem) {
      queueItem.displayedAt = Date.now()
      activeNotification.value = queueItem

      // Duraciones diferentes según tipo
      const duration = queueItem.data.type === 'unlock' ? 4000 : 2000

      setTimeout(() => {
        closeNotification()
      }, duration)
    }
  }

  /**
   * Cerrar la notificación actual
   */
  function closeNotification() {
    activeNotification.value = null
    isProcessing = false

    // Pequeño delay antes de procesar la siguiente
    if (notificationQueue.value.length > 0) {
      setTimeout(() => {
        processQueue()
      }, 300)
    }
  }

  /**
   * Cerrar manualmente (por click en el usuario)
   */
  function dismiss() {
    closeNotification()
  }

  /**
   * Limpiar todas las notificaciones
   */
  function clearAll() {
    activeNotification.value = null
    notificationQueue.value = []
    isProcessing = false
  }

  /**
   * Obtener información de la notificación actual
   */
  function getCurrentNotification() {
    if (!activeNotification.value) return null

    return {
      ...activeNotification.value.data,
      displayDuration: activeNotification.value.displayedAt
        ? Date.now() - activeNotification.value.displayedAt
        : 0
    }
  }

  return {
    // Estado
    currentNotification: readonly(activeNotification),
    pendingNotifications: readonly(notificationQueue),

    // Métodos
    showNotification,
    closeNotification,
    dismiss,
    clearAll,
    getCurrentNotification,
    setupEventListeners,
    teardownEventListeners
  }
}

/**
 * Crear una instancia pre-configurada del composable
 * Útil para setup global
 */
let globalNotificationInstance: ReturnType<typeof useAchievementNotification> | null = null

export function getGlobalAchievementNotification() {
  if (!globalNotificationInstance) {
    globalNotificationInstance = useAchievementNotification()
    globalNotificationInstance.setupEventListeners()
  }
  return globalNotificationInstance
}

export function destroyGlobalAchievementNotification() {
  if (globalNotificationInstance) {
    globalNotificationInstance.teardownEventListeners()
    globalNotificationInstance = null
  }
}
