/**
 * Composable principal de logros
 */

import { ref, computed, readonly, watch } from 'vue'
import type { Achievement, AchievementWithProgress, AchievementStats } from '../types/achievement'
import { ALL_ACHIEVEMENT_DEFINITIONS, getAchievementsByType } from '../achievements/achievements.config'
import {
  loadAchievements,
  saveAchievementUnlock,
  updateAchievementProgress,
  isAchievementUnlocked,
  getAchievementState
} from '../achievements/achievementStorage'
import { onAchievementUnlock, onAchievementProgress, onAchievementRecalculate } from '../achievements/achievementEvents'
import { revokeAchievement } from '../achievements/achievementStorage'
import useStories from './useStories'

export default function useAchievements() {
  const { getCompleteStories, getFavoriteStories } = useStories()

  const triggerUpdate = ref(0)
  const achievementsData = ref<Record<string, any>>({})

  // Setup event listeners to trigger reactivity updates
  onAchievementUnlock((event) => {
    // Force re-read from storage when achievement is unlocked
    triggerUpdate.value++
    // Force recalculation by triggering update
    achievementsData.value = { ...achievementsData.value }
  })

  onAchievementProgress((event) => {
    // Force re-read from storage when achievement progress changes
    triggerUpdate.value++
    // Force recalculation by triggering update
    achievementsData.value = { ...achievementsData.value }
  })

  onAchievementRecalculate(() => {
    // Handle recalculation - check if any unlocked achievements should be revoked
    checkAndRevokeAchievements()
    triggerUpdate.value++
    achievementsData.value = { ...achievementsData.value }
  })

  /**
   * Crear instancia de logro
   */
  function createAchievementInstance(definitionId: string): Achievement {
    const definition = ALL_ACHIEVEMENT_DEFINITIONS.find(d => d.id === definitionId)
    if (!definition) {
      throw new Error(`Achievement definition not found: ${definitionId}`)
    }

    const state = getAchievementState(definitionId)

    return {
      id: definitionId,
      type: definition.type,
      nameKey: definition.nameKey,
      descriptionKey: definition.descriptionKey,
      iconId: definition.iconId,
      unlocked: state?.unlocked ?? false,
      unlockedAt: state?.unlockedAt ? new Date(state.unlockedAt) : undefined,
      threshold: definition.threshold,
      metadata: definition.metadata
    }
  }

  /**
   * Calcular progreso actual de un logro
   */
  function calculateAchievementProgress(
    achievementId: string
  ): { current: number; target: number; progress: number } | null {
    const definition = ALL_ACHIEVEMENT_DEFINITIONS.find(d => d.id === achievementId)
    if (!definition?.threshold) return null

    // Para logros de lectura
    if (definition.type === 'read') {
      const current = getCompleteStories().length
      const target = definition.threshold
      return { current, target, progress: Math.min(100, (current / target) * 100) }
    }

    // Para logros de favoritos
    if (definition.type === 'favorite') {
      const current = getFavoriteStories().length
      const target = definition.threshold
      return { current, target, progress: Math.min(100, (current / target) * 100) }
    }

    return null
  }

  /**
   * Crear logro con progreso
   */
  function createAchievementWithProgress(definitionId: string): AchievementWithProgress {
    const achievement = createAchievementInstance(definitionId)
    const progressData = calculateAchievementProgress(definitionId)

    return {
      ...achievement,
      progress: progressData?.progress ?? 0,
      current: progressData?.current,
      target: progressData?.target,
      nearUnlock: progressData ? progressData.progress >= 80 && progressData.progress < 100 : false
    }
  }

  /**
   * Array de todos los logros
   */
  const allAchievements = computed(() => {
    triggerUpdate.value // reactivity trigger
    achievementsData.value // reactivity trigger
    return ALL_ACHIEVEMENT_DEFINITIONS.map(def => createAchievementWithProgress(def.id))
  })

  /**
   * Logros desbloqueados
   */
  const unlockedAchievements = computed(() => {
    return allAchievements.value.filter(a => a.unlocked)
  })

  /**
   * Logros bloqueados
   */
  const lockedAchievements = computed(() => {
    return allAchievements.value.filter(a => !a.unlocked)
  })

  /**
   * Estadísticas
   */
  const stats = computed((): AchievementStats => {
    const achievements = allAchievements.value
    const unlocked = unlockedAchievements.value
    const total = achievements.length

    return {
      totalAchievements: total,
      unlockedCount: unlocked.length,
      lockedCount: total - unlocked.length,
      progressPercentage: Math.round((unlocked.length / total) * 100),
      totalProgress: Math.round(achievements.reduce((sum, a) => sum + a.progress, 0) / total),
      recentUnlocks: unlocked
        .sort((a, b) => {
          const dateA = a.unlockedAt?.getTime() ?? 0
          const dateB = b.unlockedAt?.getTime() ?? 0
          return dateB - dateA
        })
        .slice(0, 5)
    }
  })

  /**
   * Verificar y desbloquear si es necesario
   */
  function checkAndUnlockAchievement(achievementId: string): boolean {
    const isCurrentlyUnlocked = isAchievementUnlocked(achievementId)
    if (isCurrentlyUnlocked) {
      return false
    }

    const progressData = calculateAchievementProgress(achievementId)
    if (!progressData) {
      return false
    }

    const shouldBeUnlocked = progressData.current >= progressData.target

    if (shouldBeUnlocked) {
      saveAchievementUnlock(achievementId, new Date())
      triggerUpdate.value++
      return true
    }

    return false
  }

  /**
   * Actualizar progreso
   */
  function updateProgress(achievementId: string): void {
    const progressData = calculateAchievementProgress(achievementId)
    if (progressData) {
      updateAchievementProgress(
        achievementId,
        progressData.current,
        progressData.target
      )
      triggerUpdate.value++
    }
  }

  /**
   * Verificar y revocar logros que ya no cumplen el umbral
   */
  function checkAndRevokeAchievements(): void {
    allAchievements.value.forEach(achievement => {
      if (!achievement.unlocked) return

      const progressData = calculateAchievementProgress(achievement.id)
      if (!progressData) return

      // Si el logro ya no cumple el umbral, revocarlo
      if (progressData.current < progressData.target) {
        revokeAchievement(achievement.id)
      }
    })
  }

  /**
   * Recalcular todos
   */
  function recalculateAll(): void {
    allAchievements.value.forEach(achievement => {
      checkAndUnlockAchievement(achievement.id)
      updateProgress(achievement.id)
    })
  }

  /**
   * Obtener logro por ID
   */
  function getAchievement(id: string): AchievementWithProgress | undefined {
    return allAchievements.value.find(a => a.id === id)
  }

  /**
   * Filtrar por tipo
   */
  function getAchievementsByTypeFilter(type: string): AchievementWithProgress[] {
    return allAchievements.value.filter(a => a.type === type)
  }

  return {
    allAchievements: readonly(allAchievements),
    unlockedAchievements: readonly(unlockedAchievements),
    lockedAchievements: readonly(lockedAchievements),
    stats: readonly(stats),

    checkAndUnlockAchievement,
    updateProgress,
    recalculateAll,
    getAchievement,
    getAchievementsByTypeFilter
  }
}
