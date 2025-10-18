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

const activeNotification = ref<NotificationQueueItem | null>(null)
const notificationQueue = ref<NotificationQueueItem[]>([])
let isProcessing = false
let unsubscribeUnlock: (() => void) | null = null
let unsubscribeProgress: (() => void) | null = null

export function useAchievementNotification() {

  function setupEventListeners() {
    teardownEventListeners()
    unsubscribeUnlock = onAchievementUnlock(event => {
      if (event.isNew) {
        showNotification({
          id: event.achievement.id,
          nameKey: event.achievement.nameKey,
          descriptionKey: event.achievement.descriptionKey,
          iconId: event.achievement.iconId,
          metadata: event.achievement.metadata,
          type: 'unlock'
        })
      }
    })

    unsubscribeProgress = onAchievementProgress(event => {
      const hitos = [25, 50, 75, 100]
      if (hitos.includes(event.progress) && event.isNew) {
        showNotification({
          id: event.achievementId,
          nameKey: 'achievement.progress',
          descriptionKey: 'achievement.progress.description',
          iconId: 'progress-indicator',
          type: 'progress',
          progress: event.progress,
          current: event.current,
          target: event.target
        })
      }
    })
  }

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

  function showNotification(notification: AchievementNotificationData) {
    const queueItem: NotificationQueueItem = {
      id: `${notification.id}-${Date.now()}`,
      data: notification,
      timestamp: Date.now()
    }

    notificationQueue.value.push(queueItem)
    processQueue()
  }

  function processQueue() {
    if (isProcessing || notificationQueue.value.length === 0) {
      return
    }

    isProcessing = true
    const queueItem = notificationQueue.value.shift()

    if (queueItem) {
      queueItem.displayedAt = Date.now()
      activeNotification.value = queueItem

      const duration = queueItem.data.type === 'unlock' ? 4000 : 2000

      setTimeout(() => {
        closeNotification()
      }, duration)
    }
  }

  function closeNotification() {
    activeNotification.value = null
    isProcessing = false

    if (notificationQueue.value.length > 0) {
      setTimeout(() => {
        processQueue()
      }, 300)
    }
  }

  function dismiss() {
    closeNotification()
  }

  function clearAll() {
    activeNotification.value = null
    notificationQueue.value = []
    isProcessing = false
  }

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
    currentNotification: readonly(activeNotification),
    pendingNotifications: readonly(notificationQueue),

    showNotification,
    closeNotification,
    dismiss,
    clearAll,
    getCurrentNotification,
    setupEventListeners,
    teardownEventListeners
  }
}

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
