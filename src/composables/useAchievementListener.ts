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
    const stories = getStoriesDataFromStorage()
    const completedStories = stories.filter(s => s.spentTime >= parseFloat(String(s.totalTime)))

    // Importar datos de historias para obtener sagas
    if (typeof window === 'undefined') return

    // Acceder a datos de historias del DOM o almacenamiento
    const allStoriesData = localStorage.getItem('__STORIES_CACHE__')
      ? JSON.parse(localStorage.getItem('__STORIES_CACHE__') || '{}')
      : {}

    // Contar sagas completadas (al menos 1 cuento de cada saga)
    const sagasWithStories = new Set<string>()
    const sagaStoryCount: Record<string, number> = {}

    completedStories.forEach(completed => {
      // Buscar el cuento en los datos originales
      const storyKey = completed.key
      const storyData = Object.values(allStoriesData).find((s: any) => s?.key === storyKey)

      if (storyData && (storyData as any).saga) {
        const saga = (storyData as any).saga
        sagasWithStories.add(saga)
        sagaStoryCount[saga] = (sagaStoryCount[saga] || 0) + 1
      }
    })

    const uniqueSagas = sagasWithStories.size

    // Logros de sagas
    const sagaAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'saga')

    sagaAchievements.forEach(definition => {
      let shouldUnlock = false
      let current = 0
      let target = 0

      if (definition.id === 'saga-1') {
        shouldUnlock = uniqueSagas >= 1
        current = uniqueSagas
        target = 1
      } else if (definition.id === 'saga-3') {
        shouldUnlock = uniqueSagas >= 3
        current = uniqueSagas
        target = 3
      } else if (definition.id === 'saga-7') {
        shouldUnlock = uniqueSagas >= 7
        current = uniqueSagas
        target = 7
      } else if (definition.id === 'saga-all') {
        // Para saga-all, necesitaríamos saber cuántas sagas hay en total
        // Por ahora usamos 11 (sagas conocidas del sistema)
        shouldUnlock = uniqueSagas >= 11
        current = uniqueSagas
        target = 11
      }

      if (shouldUnlock && !isAchievementUnlocked(definition.id)) {
        unlockAchievement(definition.id)
      }

      updateAchievementProgress(definition.id, current, target)
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
    const stories = getStoriesDataFromStorage()
    const completedStories = stories.filter(s => s.spentTime >= parseFloat(String(s.totalTime)))

    if (typeof window === 'undefined') return

    // Acceder a datos de historias
    const allStoriesData = localStorage.getItem('__STORIES_CACHE__')
      ? JSON.parse(localStorage.getItem('__STORIES_CACHE__') || '{}')
      : {}

    // Agrupar cuentos completados por saga (cada saga = personajes de esa saga)
    const storyCountBySaga: Record<string, number> = {}
    const uniqueCharSagas = new Set<string>()

    completedStories.forEach(completed => {
      const storyKey = completed.key
      const storyData = Object.values(allStoriesData).find((s: any) => s?.key === storyKey)

      if (storyData && (storyData as any).saga) {
        const saga = (storyData as any).saga
        storyCountBySaga[saga] = (storyCountBySaga[saga] || 0) + 1
        uniqueCharSagas.add(saga)
      }
    })

    // Encontrar el máximo de cuentos en una sola saga
    const maxStoriesInOneSaga = Math.max(0, ...Object.values(storyCountBySaga))
    const totalUniqueCharSagas = uniqueCharSagas.size

    // Logros de personajes
    const charAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'character')

    charAchievements.forEach(definition => {
      let shouldUnlock = false
      let current = 0
      let target = 0

      if (definition.id === 'char-5') {
        shouldUnlock = maxStoriesInOneSaga >= 5
        current = maxStoriesInOneSaga
        target = 5
      } else if (definition.id === 'char-10') {
        shouldUnlock = maxStoriesInOneSaga >= 10
        current = maxStoriesInOneSaga
        target = 10
      } else if (definition.id === 'char-all') {
        // Suponiendo que cada saga tiene ~20-30 cuentos en promedio
        // Usar 20 como referencia para "todos los cuentos de un personaje"
        shouldUnlock = maxStoriesInOneSaga >= 20
        current = maxStoriesInOneSaga
        target = 20
      } else if (definition.id === 'char-profiles') {
        shouldUnlock = totalUniqueCharSagas >= 5
        current = totalUniqueCharSagas
        target = 5
      }

      if (shouldUnlock && !isAchievementUnlocked(definition.id)) {
        unlockAchievement(definition.id)
      }

      updateAchievementProgress(definition.id, current, target)
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
    const completedStories = stories.filter(s => s.spentTime >= parseFloat(String(s.totalTime)))

    if (typeof window === 'undefined') return

    // Acceder a datos de historias
    const allStoriesData = localStorage.getItem('__STORIES_CACHE__')
      ? JSON.parse(localStorage.getItem('__STORIES_CACHE__') || '{}')
      : {}

    const allStories = Object.values(allStoriesData) as any[]
    const totalStories = allStories.length

    // Información sobre cuentos especiales
    let hasEpic = false // > 10 minutos (600 segundos)
    let hasQuick = false // < 3 minutos (180 segundos)
    let hasOldest = false
    let hasNewest = false
    let hasEarlyBird = false // 3-6 AM
    let hasNightReader = false // 10 PM - 3 AM

    let oldestDate: Date | null = null
    let newestDate: Date | null = null

    completedStories.forEach(completed => {
      const storyKey = completed.key
      const storyData = Object.values(allStoriesData).find((s: any) => s?.key === storyKey)

      if (storyData) {
        const time = parseFloat(String((storyData as any).time || 0))
        const date = (storyData as any).date // DD/MM/YYYY

        // Detectar épico y rápido
        if (time > 600) hasEpic = true
        if (time < 180) hasQuick = true

        // Detectar fechas
        if (date) {
          const parsedDate = new Date(date.split('/').reverse().join('-'))
          if (!oldestDate || parsedDate < oldestDate) oldestDate = parsedDate
          if (!newestDate || parsedDate > newestDate) newestDate = parsedDate
        }
      }

      // Detectar hora de lectura (usar timestamp de unlockedAt si está disponible)
      const achievementState = getAchievementState('read-1') // Para obtener estructura
      if (achievementState) {
        // Esto es aproximado, se debería guardar la hora real de lectura
        // Por ahora usamos la hora actual como fallback
        const now = new Date()
        const hour = now.getHours()
        if (hour >= 3 && hour < 6) hasEarlyBird = true
        if (hour >= 22 || hour < 3) hasNightReader = true
      }
    })

    // Verificar si completó todo
    const hasAllStories = completedStories.length === totalStories && totalStories > 0

    // Detectar oldest y newest si fue completado
    if (oldestDate && completedStories.length > 0) {
      const completedDates = completedStories
        .map(c => {
          const sd = Object.values(allStoriesData).find((s: any) => s?.key === c.key)
          return sd ? (sd as any).date : null
        })
        .filter(Boolean)

      if (completedDates.includes(oldestDate.toLocaleDateString('es-ES'))) {
        hasOldest = true
      }
      if (completedDates.includes(newestDate?.toLocaleDateString('es-ES'))) {
        hasNewest = true
      }
    }

    // Logros especiales
    const specialAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'special')

    specialAchievements.forEach(definition => {
      let shouldUnlock = false

      if (definition.id === 'special-all') {
        shouldUnlock = hasAllStories
      } else if (definition.id === 'special-epic') {
        shouldUnlock = hasEpic
      } else if (definition.id === 'special-quick') {
        shouldUnlock = hasQuick
      } else if (definition.id === 'special-oldest') {
        shouldUnlock = hasOldest
      } else if (definition.id === 'special-newest') {
        shouldUnlock = hasNewest
      } else if (definition.id === 'special-early') {
        shouldUnlock = hasEarlyBird
      } else if (definition.id === 'special-night') {
        shouldUnlock = hasNightReader
      }

      if (shouldUnlock && !isAchievementUnlocked(definition.id)) {
        unlockAchievement(definition.id)
      }
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
