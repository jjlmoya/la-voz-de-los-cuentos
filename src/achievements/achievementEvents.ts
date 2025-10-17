/**
 * Sistema de eventos para logros
 * Maneja notificaciones de desbloqueos y progreso
 * Patrón: Observer pattern
 */

import type { AchievementUnlockedEvent, AchievementProgressEvent } from '../types/achievement'

type UnlockListener = (event: AchievementUnlockedEvent) => void
type ProgressListener = (event: AchievementProgressEvent) => void
type RecalculateListener = () => void

const unlockListeners = new Set<UnlockListener>()
const progressListeners = new Set<ProgressListener>()
const recalculateListeners = new Set<RecalculateListener>()

/**
 * Registrar un listener para cuando se desbloquea un logro
 */
export function onAchievementUnlock(callback: UnlockListener): () => void {
  unlockListeners.add(callback)

  // Retornar función para desuscribirse
  return () => {
    unlockListeners.delete(callback)
  }
}

/**
 * Registrar un listener para cambios de progreso
 */
export function onAchievementProgress(callback: ProgressListener): () => void {
  progressListeners.add(callback)

  // Retornar función para desuscribirse
  return () => {
    progressListeners.delete(callback)
  }
}

/**
 * Registrar un listener para recalculación de logros
 */
export function onAchievementRecalculate(callback: RecalculateListener): () => void {
  recalculateListeners.add(callback)

  // Retornar función para desuscribirse
  return () => {
    recalculateListeners.delete(callback)
  }
}

/**
 * Disparar evento de desbloqueo
 * (llamado internamente cuando se desbloquea un logro)
 */
export function emitAchievementUnlock(event: AchievementUnlockedEvent): void {
  unlockListeners.forEach(listener => {
    try {
      listener(event)
    } catch (error) {
      // Silently ignore listener errors
    }
  })
}

/**
 * Disparar evento de progreso
 * (llamado internamente cuando se actualiza el progreso)
 */
export function emitAchievementProgress(event: AchievementProgressEvent): void {
  progressListeners.forEach(listener => {
    try {
      listener(event)
    } catch (error) {
      // Silently ignore listener errors
    }
  })
}

/**
 * Disparar evento de recalculación
 * (llamado cuando se necesita recalcular todos los logros, ej: al quitar un like)
 */
export function emitAchievementRecalculate(): void {
  recalculateListeners.forEach(listener => {
    try {
      listener()
    } catch (error) {
      // Silently ignore listener errors
    }
  })
}

/**
 * Limpiar todos los listeners (para testing)
 */
export function clearAchievementListeners(): void {
  unlockListeners.clear()
  progressListeners.clear()
  recalculateListeners.clear()
}

/**
 * Obtener cantidad de listeners registrados (para debugging)
 */
export function getListenerCounts(): { unlocks: number; progress: number } {
  return {
    unlocks: unlockListeners.size,
    progress: progressListeners.size
  }
}
