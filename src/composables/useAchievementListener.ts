/**
 * Composable desacoplado que escucha cambios en historias
 * Monitorea localStorage de storiesData sin modificar useStory.js
 */

import { ref } from 'vue'
import { emitAchievementUnlock } from '../achievements/achievementEvents'
import {
  saveAchievementUnlock,
  updateAchievementProgress,
  isAchievementUnlocked,
  getAchievementState
} from '../achievements/achievementStorage'
import { ALL_ACHIEVEMENT_DEFINITIONS } from '../achievements/achievements.config'

interface StoredStory {
  key: string
  spentTime: number
  totalTime: number | string
  finished: boolean
  like: boolean
}

const lastStoriesData = ref<StoredStory[]>([])
let watcherActive = false

/**
 * Leer estado actual de historias
 */
function getStoriesDataFromStorage(): StoredStory[] {
  // No acceder a localStorage en SSR (servidor)
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const data = localStorage.getItem('storiesData')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading stories from storage:', error)
    return []
  }
}

/**
 * Detectar historias completadas nuevas
 */
function checkForNewCompletedStories(): void {
  const currentStories = getStoriesDataFromStorage()
  const previousStories = lastStoriesData.value

  console.log(`[Achievement Listener] Checking ${currentStories.length} stories. Previous state had ${previousStories.length} stories.`)

  let hasNewCompletion = false

  currentStories.forEach(currentStory => {
    const previousStory = previousStories.find(s => s.key === currentStory.key)

    // Detectar si la historia está completada: spentTime >= totalTime
    const isCurrentlyComplete = currentStory.spentTime >= parseFloat(String(currentStory.totalTime))
    const wasPreviouslyComplete = previousStory && previousStory.spentTime >= parseFloat(String(previousStory.totalTime))

    if (previousStory) {
      console.log(`[Achievement Listener] Story "${currentStory.key}": spentTime ${previousStory.spentTime} -> ${currentStory.spentTime} (totalTime: ${currentStory.totalTime}), complete: ${wasPreviouslyComplete} -> ${isCurrentlyComplete}`)
    }

    // Detectar cambio: no completada -> completada
    if (isCurrentlyComplete && !wasPreviouslyComplete) {
      console.log(`[Achievement Listener] ✨ NEW COMPLETION DETECTED: ${currentStory.key}`)
      handleStoryCompleted(currentStory)
      hasNewCompletion = true
    }
  })

  // Si hay alguna nueva completación, revisar todos los logros
  if (hasNewCompletion) {
    console.log(`[Achievement Listener] Checking achievements after new story completion`)
    checkReadingAchievements()
  }

  // Actualizar cache
  lastStoriesData.value = JSON.parse(JSON.stringify(currentStories))
}

/**
 * Manejar completación de historia
 */
function handleStoryCompleted(story: StoredStory): void {
  console.log(`📖 [Achievement Listener] Story completed: ${story.key}`)
  // checkReadingAchievements() is called in checkForNewCompletedStories
}

/**
 * Verificar y desbloquear logros de lectura
 */
function checkReadingAchievements(): void {
  const stories = getStoriesDataFromStorage()
  // Contar historias completadas: spentTime >= totalTime
  const completedCount = stories.filter(s => s.spentTime >= parseFloat(String(s.totalTime))).length

  // Logros de lectura (read-1, read-5, read-25, read-50, read-100, read-200)
  const readAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'read')

  readAchievements.forEach(definition => {
    const threshold = definition.threshold || 1

    if (completedCount >= threshold && !isAchievementUnlocked(definition.id)) {
      unlockAchievement(definition.id)
    }

    // Actualizar progreso incluso si ya está desbloqueado
    updateAchievementProgress(definition.id, completedCount, threshold)
  })
}

/**
 * Desbloquear un logro
 */
function unlockAchievement(achievementId: string): void {
  const achievement = ALL_ACHIEVEMENT_DEFINITIONS.find(d => d.id === achievementId)
  if (!achievement) return

  const unlockedAt = new Date()
  saveAchievementUnlock(achievementId, unlockedAt)

  emitAchievementUnlock({
    achievement: {
      id: achievement.id,
      type: achievement.type,
      nameEs: achievement.nameEs,
      nameEn: achievement.nameEn,
      descriptionEs: achievement.descriptionEs,
      descriptionEn: achievement.descriptionEn,
      iconId: achievement.iconId,
      unlocked: true,
      unlockedAt,
      threshold: achievement.threshold,
      metadata: achievement.metadata
    },
    unlockedAt,
    isNew: true
  })

  console.log(`✅ Logro desbloqueado: "${achievement.nameEs}"`)
}

/**
 * Iniciar monitoreo
 */
export function useAchievementListener() {
  function startListening(): () => void {
    if (watcherActive) {
      console.warn('Achievement listener already active')
      return () => {}
    }

    watcherActive = true
    lastStoriesData.value = getStoriesDataFromStorage()

    const interval = setInterval(() => {
      checkForNewCompletedStories()
    }, 2000) // Check every 2 seconds for faster achievement detection

    console.log('🎯 Achievement listener started with 2s polling interval')

    return () => {
      clearInterval(interval)
      watcherActive = false
      console.log('🎯 Achievement listener stopped')
    }
  }

  /**
   * Forzar check manual
   */
  function forceCheck(): void {
    console.log('[Achievement Listener] Force check triggered')
    checkReadingAchievements()
  }

  /**
   * Resetear cache
   */
  function resetCache(): void {
    lastStoriesData.value = []
  }

  return {
    startListening,
    forceCheck,
    resetCache
  }
}
