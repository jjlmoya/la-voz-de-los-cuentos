/**
 * Sistema de eventos para logros
 * Maneja notificaciones de desbloqueos y progreso
 * Patrón: Observer pattern
 */

import type { AchievementUnlockedEvent, AchievementProgressEvent } from '../types/achievement'

type UnlockListener = (event: AchievementUnlockedEvent) => void
type ProgressListener = (event: AchievementProgressEvent) => void

const unlockListeners = new Set<UnlockListener>()
const progressListeners = new Set<ProgressListener>()

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
 * Disparar evento de desbloqueo
 * (llamado internamente cuando se desbloquea un logro)
 */
export function emitAchievementUnlock(event: AchievementUnlockedEvent): void {
  unlockListeners.forEach(listener => {
    try {
      listener(event)
    } catch (error) {
      console.error('Error in achievement unlock listener:', error)
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
      console.error('Error in achievement progress listener:', error)
    }
  })
}

/**
 * Limpiar todos los listeners (para testing)
 */
export function clearAchievementListeners(): void {
  unlockListeners.clear()
  progressListeners.clear()
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
