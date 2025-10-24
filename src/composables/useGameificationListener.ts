/**
 * Composable to listen for gamification events and trigger notifications
 */

import { ref, watch, onMounted } from 'vue'
import useGameification from './useGameification'

interface LevelUpEvent {
  oldLevel: number
  newLevel: number
  title: string
  xpGained: number
}

export default function useGameificationListener() {
  const { playerProfile, onStoryCompleted } = useGameification()
  const levelUpEvent = ref<LevelUpEvent | null>(null)
  const isLevelUpModalOpen = ref(false)

  /**
   * Watch for level changes
   */
  watch(
    () => playerProfile.value.level,
    (newLevel, oldLevel) => {
      if (newLevel > oldLevel) {
        // Trigger level up event
        triggerLevelUp(newLevel, oldLevel)
      }
    }
  )

  /**
   * Trigger level up notification
   */
  function triggerLevelUp(newLevel: number, oldLevel: number): void {
    const titleMap: Record<string, string> = {
      'gamification.level.apprentice': 'Aprendiz de Historias',
      'gamification.level.adventurer': 'Lector Aventurero',
      'gamification.level.explorer': 'Explorador de Mundos',
      'gamification.level.guardian': 'Guardián de Sagas',
      'gamification.level.master': 'Maestro de Cuentos'
    }

    const title = titleMap[playerProfile.value.titleKey] || 'Aprendiz de Historias'
    const xpGained = playerProfile.value.totalXP - (playerProfile.value.totalXP - playerProfile.value.currentLevelXP)

    levelUpEvent.value = {
      oldLevel,
      newLevel,
      title,
      xpGained
    }

    isLevelUpModalOpen.value = true
  }

  /**
   * Handle story completion and XP gain
   */
  function handleStoryCompletion(storyKey: string): LevelUpEvent | null {
    const result = onStoryCompleted(storyKey)

    if (result.leveledUp) {
      const titleMap: Record<string, string> = {
        'gamification.level.apprentice': 'Aprendiz de Historias',
        'gamification.level.adventurer': 'Lector Aventurero',
        'gamification.level.explorer': 'Explorador de Mundos',
        'gamification.level.guardian': 'Guardián de Sagas',
        'gamification.level.master': 'Maestro de Cuentos'
      }

      const title = titleMap[playerProfile.value.titleKey] || 'Aprendiz de Historias'

      const event: LevelUpEvent = {
        oldLevel: result.newLevel - 1,
        newLevel: result.newLevel,
        title,
        xpGained: result.xpGained
      }

      levelUpEvent.value = event
      isLevelUpModalOpen.value = true

      return event
    }

    return null
  }

  /**
   * Close level up modal
   */
  function closeLevelUpModal(): void {
    isLevelUpModalOpen.value = false
  }

  return {
    levelUpEvent,
    isLevelUpModalOpen,
    triggerLevelUp,
    handleStoryCompletion,
    closeLevelUpModal
  }
}
