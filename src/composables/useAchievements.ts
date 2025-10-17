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

  onAchievementUnlock((event) => {
    triggerUpdate.value++
    achievementsData.value = { ...achievementsData.value }
  })

  onAchievementProgress((event) => {
    triggerUpdate.value++
    achievementsData.value = { ...achievementsData.value }
  })

  onAchievementRecalculate(() => {
    checkAndRevokeAchievements()
    triggerUpdate.value++
    achievementsData.value = { ...achievementsData.value }
  })

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

  function calculateAchievementProgress(
    achievementId: string
  ): { current: number; target: number; progress: number } | null {
    const definition = ALL_ACHIEVEMENT_DEFINITIONS.find(d => d.id === achievementId)
    if (!definition?.threshold) return null

    const state = getAchievementState(achievementId)

    if (definition.type === 'read') {
      const current = getCompleteStories().length
      const target = definition.threshold
      return { current, target, progress: Math.min(100, (current / target) * 100) }
    }

    if (definition.type === 'favorite') {
      const current = getFavoriteStories().length
      const target = definition.threshold
      return { current, target, progress: Math.min(100, (current / target) * 100) }
    }

    if (state?.current !== undefined && state?.target !== undefined) {
      return {
        current: state.current,
        target: state.target,
        progress: state.progress ?? Math.min(100, (state.current / state.target) * 100)
      }
    }

    return null
  }

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

  const allAchievements = computed(() => {
    triggerUpdate.value
    achievementsData.value
    return ALL_ACHIEVEMENT_DEFINITIONS.map(def => createAchievementWithProgress(def.id))
  })

  const unlockedAchievements = computed(() => {
    return allAchievements.value.filter(a => a.unlocked)
  })

  const lockedAchievements = computed(() => {
    return allAchievements.value.filter(a => !a.unlocked)
  })

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

  function checkAndRevokeAchievements(): void {
    allAchievements.value.forEach(achievement => {
      if (!achievement.unlocked) return

      const progressData = calculateAchievementProgress(achievement.id)
      if (!progressData) return

      if (progressData.current < progressData.target) {
        revokeAchievement(achievement.id)
      }
    })
  }

  function recalculateAll(): void {
    allAchievements.value.forEach(achievement => {
      checkAndUnlockAchievement(achievement.id)
      updateProgress(achievement.id)
    })
  }

  function getAchievement(id: string): AchievementWithProgress | undefined {
    return allAchievements.value.find(a => a.id === id)
  }

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
