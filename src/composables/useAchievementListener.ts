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
import { getStories, getCharacters } from '../data'

interface StoredStory {
  key: string
  spentTime: number
  totalTime: number | string
  finished: boolean
  like: boolean
}

// Cache de datos de historias y personajes
const storiesCache = ref<any[]>([])
const charactersCache = ref<any[]>([])

// Función para cargar datos
function loadDataCache() {
  try {
    storiesCache.value = getStories()
    charactersCache.value = getCharacters()
  } catch (error) {
    // En caso de error, los caches quedan vacíos
  }
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

  // Revisar logros de sagas, personajes y especiales siempre
  if (hasNewCompletion || hasLikeChange) {
    checkSagaAchievements()
    checkCharacterAchievements()
    checkSpecialAchievements()
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
 * Verificar y desbloquear logros de Sagas
 */
function checkSagaAchievements(): void {
  try {
    // Cargar datos si no están cacheados
    if (storiesCache.value.length === 0) {
      loadDataCache()
    }

    const completedStories = getStoriesDataFromStorage().filter(
      s => s.spentTime >= parseFloat(String(s.totalTime))
    )

    // Mapear sagas completadas
    const sagasCompleted: Record<string, number> = {}
    completedStories.forEach(story => {
      const storyDef = storiesCache.value.find(s => s.key === story.key)
      if (storyDef?.saga && storyDef.saga.trim() !== '') {
        sagasCompleted[storyDef.saga] = (sagasCompleted[storyDef.saga] || 0) + 1
      }
    })

    // Mapear total de cuentos por saga
    const sagaStoryCounts: Record<string, number> = {}
    storiesCache.value.forEach(story => {
      if (story.saga && story.saga.trim() !== '') {
        sagaStoryCounts[story.saga] = (sagaStoryCounts[story.saga] || 0) + 1
      }
    })

    const sagaAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'saga')

    sagaAchievements.forEach(definition => {
      const threshold = definition.threshold || 1

      // Para saga-1, saga-3, saga-7: contar cuántas sagas diferentes se han completado
      if (definition.id.startsWith('saga-') && definition.id !== 'saga-all') {
        const numSagasCompleted = Object.keys(sagasCompleted).length
        const shouldUnlock = numSagasCompleted >= threshold

        if (shouldUnlock && !isAchievementUnlocked(definition.id)) {
          unlockAchievement(definition.id)
        }

        updateAchievementProgress(definition.id, Math.min(numSagasCompleted, threshold), threshold)
      }
      // Para saga-all: contar si se completaron TODOS los cuentos de TODAS las sagas
      else if (definition.id === 'saga-all') {
        let allSagasComplete = false
        let completedSagasCount = 0

        Object.entries(sagaStoryCounts).forEach(([sagaKey, totalCount]) => {
          const completedCount = sagasCompleted[sagaKey] || 0
          if (completedCount === totalCount) {
            completedSagasCount++
          }
        })

        allSagasComplete = completedSagasCount === Object.keys(sagaStoryCounts).length && Object.keys(sagaStoryCounts).length > 0

        if (allSagasComplete && !isAchievementUnlocked('saga-all')) {
          unlockAchievement('saga-all')
        }

        updateAchievementProgress('saga-all', allSagasComplete ? 1 : 0, 1)
      }
    })
  } catch (error) {
    // Silenciar errores si los datos no están disponibles aún
  }
}

/**
 * Verificar y desbloquear logros de Personajes
 */
function checkCharacterAchievements(): void {
  try {
    // Cargar datos si no están cacheados
    if (charactersCache.value.length === 0 || storiesCache.value.length === 0) {
      loadDataCache()
    }

    const completedStories = getStoriesDataFromStorage().filter(
      s => s.spentTime >= parseFloat(String(s.totalTime))
    )

    // Mapear cuántos cuentos se han completado por personaje
    const charactersCompleted: Record<string, Set<string>> = {}
    completedStories.forEach(story => {
      const storyDef = storiesCache.value.find(s => s.key === story.key)
      if (storyDef?.saga && storyDef.saga.trim() !== '') {
        const sagaCharacters = charactersCache.value.filter(c => c.saga === storyDef.saga)
        sagaCharacters.forEach(char => {
          if (!charactersCompleted[char.key]) {
            charactersCompleted[char.key] = new Set()
          }
          charactersCompleted[char.key].add(story.key)
        })
      }
    })

    // Mapear total de cuentos por personaje (en su saga)
    const characterStoryCounts: Record<string, Set<string>> = {}
    storiesCache.value.forEach(story => {
      if (story.saga && story.saga.trim() !== '') {
        const sagaCharacters = charactersCache.value.filter(c => c.saga === story.saga)
        sagaCharacters.forEach(char => {
          if (!characterStoryCounts[char.key]) {
            characterStoryCounts[char.key] = new Set()
          }
          characterStoryCounts[char.key].add(story.key)
        })
      }
    })

    const charAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'character')

    charAchievements.forEach(definition => {
      const threshold = definition.threshold || 1

      if (definition.id === 'char-5') {
        // Encontrar un personaje con al menos 5 cuentos completados
        const hasCharWith5 = Object.entries(charactersCompleted).some(
          ([charKey, storyKeys]) => storyKeys.size >= 5
        )

        if (hasCharWith5 && !isAchievementUnlocked('char-5')) {
          unlockAchievement('char-5')
        }

        const maxStories = Math.max(
          ...Object.values(charactersCompleted).map(s => s.size),
          0
        )
        updateAchievementProgress('char-5', Math.min(maxStories, threshold), threshold)
      }
      else if (definition.id === 'char-10') {
        const hasCharWith10 = Object.entries(charactersCompleted).some(
          ([charKey, storyKeys]) => storyKeys.size >= 10
        )

        if (hasCharWith10 && !isAchievementUnlocked('char-10')) {
          unlockAchievement('char-10')
        }

        const maxStories = Math.max(
          ...Object.values(charactersCompleted).map(s => s.size),
          0
        )
        updateAchievementProgress('char-10', Math.min(maxStories, threshold), threshold)
      }
      else if (definition.id === 'char-all') {
        // Completar TODOS los cuentos de UN personaje
        const hasCompleteCharacter = Object.entries(characterStoryCounts).some(
          ([charKey, totalStories]) => {
            const completed = charactersCompleted[charKey]?.size || 0
            return completed === totalStories.size && totalStories.size > 0
          }
        )

        if (hasCompleteCharacter && !isAchievementUnlocked('char-all')) {
          unlockAchievement('char-all')
        }

        updateAchievementProgress('char-all', hasCompleteCharacter ? 1 : 0, 1)
      }
      else if (definition.id === 'char-profiles') {
        // Leer de múltiples personajes
        const uniqueCharactersWithStories = Object.entries(charactersCompleted)
          .filter(([charKey, storyKeys]) => storyKeys.size > 0).length

        if (uniqueCharactersWithStories >= threshold && !isAchievementUnlocked('char-profiles')) {
          unlockAchievement('char-profiles')
        }

        updateAchievementProgress('char-profiles', Math.min(uniqueCharactersWithStories, threshold), threshold)
      }
    })
  } catch (error) {
    // Silenciar errores
  }
}

/**
 * Verificar y desbloquear logros Especiales
 */
function checkSpecialAchievements(): void {
  try {
    const stories = getStoriesDataFromStorage()
    const completedCount = stories.filter(s => s.spentTime >= parseFloat(String(s.totalTime))).length

    // Especiales siempre muestra progreso 0/1 hasta desbloqueado
    const specialAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'special')

    specialAchievements.forEach(definition => {
      // Mostrar progreso como 0/1 para especiales (son binarios)
      updateAchievementProgress(definition.id, 0, 1)
    })
  } catch (error) {
    // Silenciar errores
  }
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
      nameKey: achievement.nameKey,
      descriptionKey: achievement.descriptionKey,
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

    // Cargar datos de historias y personajes al iniciar
    loadDataCache()

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
    checkSagaAchievements()
    checkCharacterAchievements()
    checkSpecialAchievements()
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
