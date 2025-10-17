/**
 * Types e interfaces para el sistema de logros
 */

/**
 * Tipos de logros disponibles
 */
export type AchievementType = 'read' | 'favorite'

/**
 * Interfaz base para un logro
 */
export interface Achievement {
  /** Identificador único del logro */
  id: string

  /** Tipo de logro: lectura o favoritos */
  type: AchievementType

  /** Nombre en español */
  nameEs: string

  /** Nombre en inglés */
  nameEn: string

  /** Descripción en español */
  descriptionEs: string

  /** Descripción en inglés */
  descriptionEn: string

  /** ID de la ilustración (sin extensión) */
  iconId: string

  /** Si el logro está desbloqueado */
  unlocked: boolean

  /** Fecha de desbloqueo (opcional) */
  unlockedAt?: Date

  /** Umbral para logros con progreso */
  threshold?: number

  /** Datos adicionales específicos del logro */
  metadata?: Record<string, any>
}

/**
 * Logro con información de progreso
 */
export interface AchievementWithProgress extends Achievement {
  /** Progreso actual (0-100) */
  progress: number

  /** Valor actual del contador */
  current?: number

  /** Valor objetivo del contador */
  target?: number

  /** Si está cerca de desbloquearse (80%+ de progreso) */
  nearUnlock?: boolean
}

/**
 * Definición de un logro para crear instancias
 */
export interface AchievementDefinition {
  id: string
  type: AchievementType
  nameKey: string
  descriptionKey: string
  iconId: string
  threshold?: number
  metadata?: Record<string, any>
}

/**
 * Evento cuando se desbloquea un logro
 */
export interface AchievementUnlockedEvent {
  achievement: Achievement
  unlockedAt: Date
  isNew: boolean
}

/**
 * Evento de progreso de un logro
 */
export interface AchievementProgressEvent {
  achievementId: string
  progress: number
  current: number
  target: number
  isNew: boolean
}

/**
 * Notificación de logro (para mostrar al usuario)
 */
export interface AchievementNotificationData {
  id: string
  nameEs: string
  nameEn: string
  descriptionEs: string
  descriptionEn: string
  iconId: string
  type: 'unlock' | 'progress'
  progress?: number
  current?: number
  target?: number
}

/**
 * Configuración de un logro en localStorage
 */
export interface AchievementState {
  id: string
  unlocked: boolean
  unlockedAt?: number
  progress?: number
  current?: number
}

/**
 * Estadísticas de logros del usuario
 */
export interface AchievementStats {
  totalAchievements: number
  unlockedCount: number
  lockedCount: number
  progressPercentage: number
  totalProgress: number
  recentUnlocks: Achievement[]
}
