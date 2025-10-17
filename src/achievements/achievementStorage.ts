/**
 * Servicio de persistencia para logros
 * Gestiona la lectura/escritura en localStorage de forma SOLID
 * Responsabilidad única: Persistencia de datos
 */

import type { AchievementState, Achievement } from '../types/achievement'

const STORAGE_KEY = 'achievements_state'

interface StorageFormat {
  version: number
  achievements: Record<string, AchievementState>
  lastUpdated: number
}

export function loadAchievements(): Record<string, AchievementState> {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      return {}
    }

    const parsed = JSON.parse(data) as StorageFormat
    if (parsed.version !== 1) {
      return {}
    }

    return parsed.achievements || {}
  } catch (error) {
    return {}
  }
}

/**
 * Guardar un logro desbloqueado
 */
export function saveAchievementUnlock(achievementId: string, unlockedAt: Date): void {
  const achievements = loadAchievements()

  achievements[achievementId] = {
    id: achievementId,
    unlocked: true,
    unlockedAt: unlockedAt.getTime()
  }

  saveToStorage(achievements)
}

/**
 * Actualizar el progreso de un logro
 */
export function updateAchievementProgress(
  achievementId: string,
  current: number,
  target: number
): void {
  const achievements = loadAchievements()
  const existing = achievements[achievementId] || {
    id: achievementId,
    unlocked: false
  }

  achievements[achievementId] = {
    ...existing,
    progress: Math.round((current / target) * 100),
    current,
    target
  }

  saveToStorage(achievements)
}

/**
 * Obtener el estado de un logro específico
 */
export function getAchievementState(achievementId: string): AchievementState | null {
  const achievements = loadAchievements()
  return achievements[achievementId] || null
}

/**
 * Verificar si un logro está desbloqueado
 */
export function isAchievementUnlocked(achievementId: string): boolean {
  const state = getAchievementState(achievementId)
  return state?.unlocked ?? false
}

/**
 * Obtener el progreso de un logro (0-100)
 */
export function getAchievementProgress(achievementId: string): number {
  const state = getAchievementState(achievementId)
  return state?.progress ?? 0
}

/**
 * Obtener la fecha de desbloqueo de un logro
 */
export function getAchievementUnlockDate(achievementId: string): Date | null {
  const state = getAchievementState(achievementId)
  if (!state?.unlockedAt) return null
  return new Date(state.unlockedAt)
}

/**
 * Revocar un logro desbloqueado
 */
export function revokeAchievement(achievementId: string): void {
  const achievements = loadAchievements()

  if (achievements[achievementId]) {
    achievements[achievementId] = {
      ...achievements[achievementId],
      unlocked: false,
      unlockedAt: undefined
    }
  }

  saveToStorage(achievements)
}

/**
 * Limpiar el estado de persistencia (útil para testing)
 */
export function clearAchievements(): void {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Exportar estado actual (para debug/respaldo)
 */
export function exportAchievements(): string {
  const achievements = loadAchievements()
  return JSON.stringify(achievements, null, 2)
}

/**
 * Importar estado de logros (para restauración)
 */
export function importAchievements(jsonData: string): boolean {
  try {
    const achievements = JSON.parse(jsonData) as Record<string, AchievementState>
    saveToStorage(achievements)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Función interna: guardar en localStorage con formato
 */
function saveToStorage(achievements: Record<string, AchievementState>): void {
  // No acceder a localStorage en SSR (servidor)
  if (typeof window === 'undefined') {
    return
  }

  const storageData: StorageFormat = {
    version: 1,
    achievements,
    lastUpdated: Date.now()
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))
  } catch (error) {
  }
}

export function getStorageStats(): {
  achievementsCount: number
  unlockedCount: number
  lastUpdated: Date | null
} {
  const achievements = loadAchievements()
  const entries = Object.values(achievements)

  if (typeof window === 'undefined') {
    return {
      achievementsCount: entries.length,
      unlockedCount: entries.filter(a => a.unlocked).length,
      lastUpdated: null
    }
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(data || '{}') as StorageFormat

    return {
      achievementsCount: entries.length,
      unlockedCount: entries.filter(a => a.unlocked).length,
      lastUpdated: parsed.lastUpdated ? new Date(parsed.lastUpdated) : null
    }
  } catch {
    return {
      achievementsCount: entries.length,
      unlockedCount: entries.filter(a => a.unlocked).length,
      lastUpdated: null
    }
  }
}
