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
    return []
  }
}

/**
 * Detectar historias completadas nuevas y cambios en favoritos
 */
function checkForNewCompletedStories(): void {
  const currentStories = getStoriesDataFromStorage()
  const previousStories = lastStoriesData.value

  let hasNewCompletion = false
  let hasLikeChange = false

  currentStories.forEach(currentStory => {
    const previousStory = previousStories.find(s => s.key === currentStory.key)

    // Detectar si la historia está completada: spentTime >= totalTime
    const isCurrentlyComplete = currentStory.spentTime >= parseFloat(String(currentStory.totalTime))
    const wasPreviouslyComplete = previousStory && previousStory.spentTime >= parseFloat(String(previousStory.totalTime))

    // Detectar cambio: no completada -> completada
    if (isCurrentlyComplete && !wasPreviouslyComplete) {
      handleStoryCompleted(currentStory)
      hasNewCompletion = true
    }

    // Detectar cambio en favoritos: not liked -> liked, or liked -> not liked
    const isCurrentlyLiked = currentStory.like === true
    const wasPreviouslyLiked = previousStory && previousStory.like === true

    if (isCurrentlyLiked !== wasPreviouslyLiked) {
      hasLikeChange = true
    }
  })

  // Si hay alguna nueva completación, revisar logros de lectura
  if (hasNewCompletion) {
    checkReadingAchievements()
  }

  // Si hay cambios en favoritos, revisar logros de favoritos
  if (hasLikeChange) {
    checkFavoriteAchievements()
  }

  // Actualizar cache
  lastStoriesData.value = JSON.parse(JSON.stringify(currentStories))
}

/**
 * Manejar completación de historia
 */
function handleStoryCompleted(story: StoredStory): void {
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
 * Verificar y desbloquear logros de favoritos
 */
function checkFavoriteAchievements(): void {
  const stories = getStoriesDataFromStorage()
  // Contar historias marcadas como favoritas
  const favoriteCount = stories.filter(s => s.like === true).length

  // Logros de favoritos (fav-1, fav-5, fav-10, fav-25, fav-50)
  const favoriteAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'favorite')

  favoriteAchievements.forEach(definition => {
    const threshold = definition.threshold || 1

    if (favoriteCount >= threshold && !isAchievementUnlocked(definition.id)) {
      unlockAchievement(definition.id)
    }

    // Actualizar progreso incluso si ya está desbloqueado
    updateAchievementProgress(definition.id, favoriteCount, threshold)
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
}

/**
 * Iniciar monitoreo
 */
export function useAchievementListener() {
  function startListening(): () => void {
    if (watcherActive) {
      return () => {}
    }

    watcherActive = true
    lastStoriesData.value = getStoriesDataFromStorage()

    const interval = setInterval(() => {
      checkForNewCompletedStories()
    }, 2000) // Check every 2 seconds for faster achievement detection

    return () => {
      clearInterval(interval)
      watcherActive = false
    }
  }

  /**
   * Forzar check manual
   */
  function forceCheck(): void {
    checkReadingAchievements()
    checkFavoriteAchievements()
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
