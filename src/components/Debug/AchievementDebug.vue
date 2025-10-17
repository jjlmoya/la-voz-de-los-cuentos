<template>
  <div v-if="isDev" class="achievement-debug">
    <!-- Botón toggle para mostrar/ocultar -->
    <button class="achievement-debug__toggle" @click="isOpen = !isOpen">
      🐛
    </button>

    <!-- Panel de debug -->
    <Transition name="debug-slide">
      <div v-if="isOpen" class="achievement-debug__panel">
        <div class="achievement-debug__header">
          <h3>Sistema de Logros - Debug</h3>
          <button class="achievement-debug__close" @click="isOpen = false">✕</button>
        </div>

        <!-- Sección de logros disponibles -->
        <div class="achievement-debug__section">
          <h4>Logros Disponibles</h4>
          <div class="achievement-debug__list">
            <button
              v-for="achievement in allAchievements"
              :key="achievement.id"
              class="achievement-debug__achievement-btn"
              :class="{ 'achievement-debug__achievement-btn--unlocked': achievement.unlocked }"
              @click="simulateAchievementUnlock(achievement.id)"
            >
              <span class="achievement-debug__achievement-name">{{ getAchievementName(achievement) }}</span>
              <span v-if="achievement.unlocked" class="achievement-debug__badge">✓ Desbloqueado</span>
              <span v-else class="achievement-debug__badge achievement-debug__badge--locked">🔒 Bloqueado</span>
            </button>
          </div>
        </div>

        <!-- Sección de utilidades -->
        <div class="achievement-debug__section">
          <h4>Utilidades</h4>
          <div class="achievement-debug__utilities">
            <button class="achievement-debug__btn achievement-debug__btn--info" @click="showAchievementsInfo">
              📊 Ver Info
            </button>
            <button class="achievement-debug__btn achievement-debug__btn--warning" @click="clearAllAchievements">
              🗑️ Limpiar Todo
            </button>
            <button class="achievement-debug__btn achievement-debug__btn--success" @click="unlockAllAchievements">
              🎯 Desbloquear Todo
            </button>
          </div>
        </div>

        <!-- Información de estado -->
        <div class="achievement-debug__section">
          <h4>Estado Actual</h4>
          <div class="achievement-debug__info">
            <p><strong>Total:</strong> {{ allAchievements.length }}</p>
            <p><strong>Desbloqueados:</strong> {{ unlockedAchievements.length }}</p>
            <p><strong>Bloqueados:</strong> {{ lockedAchievements.length }}</p>
            <p><strong>Progreso:</strong> {{ Math.round(stats.progressPercentage) }}%</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import useAchievements from '../../composables/useAchievements'
import { saveAchievementUnlock, clearAchievements } from '../../achievements/achievementStorage'
import { emitAchievementUnlock } from '../../achievements/achievementEvents'
import { ALL_ACHIEVEMENT_DEFINITIONS } from '../../achievements/achievements.config'
import t from '../../translations/index'

const isDev = import.meta.env.DEV || import.meta.env.PUBLIC_DEV === 'true'
const isOpen = ref(false)

const { allAchievements, unlockedAchievements, lockedAchievements, stats, recalculateAll } = useAchievements()

function getAchievementName(achievement) {
  return t(achievement.nameKey)
}

/**
 * Simular desbloqueo de logro
 */
function simulateAchievementUnlock(achievementId) {
  const achievement = ALL_ACHIEVEMENT_DEFINITIONS.find(d => d.id === achievementId)
  if (!achievement) return

  const unlockedAt = new Date()
  saveAchievementUnlock(achievementId, unlockedAt)

  // Disparar el evento
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

  // Recalcular para actualizar reactividad
  recalculateAll()
}

/**
 * Limpiar todos los logros
 */
function clearAllAchievements() {
  if (confirm('¿Estás seguro de que quieres limpiar todos los logros?')) {
    clearAchievements()
    recalculateAll()
  }
}

/**
 * Desbloquear todos los logros
 */
function unlockAllAchievements() {
  if (confirm('¿Estás seguro de que quieres desbloquear todos los logros?')) {
    ALL_ACHIEVEMENT_DEFINITIONS.forEach(achievement => {
      const unlockedAt = new Date()
      saveAchievementUnlock(achievement.id, unlockedAt)

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
    })

    recalculateAll()
  }
}

/**
 * Mostrar información de logros
 */
function showAchievementsInfo() {
  // Log to console for debugging
  console.log({
    total: allAchievements.value.length,
    unlocked: unlockedAchievements.value.length,
    locked: lockedAchievements.value.length,
    progress: stats.value.progressPercentage + '%',
    achievements: allAchievements.value
  })
}
</script>

<style scoped>
.achievement-debug {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 8000;
  font-family: monospace;
}

.achievement-debug__toggle {
  padding: 10px 15px;
  background: #1e1e1e;
  color: #00ff00;
  border: 2px solid #00ff00;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.achievement-debug__toggle:hover {
  background: #00ff00;
  color: #1e1e1e;
  transform: scale(1.05);
}

.achievement-debug__panel {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 400px;
  max-height: 600px;
  overflow-y: auto;
  background: #1e1e1e;
  border: 2px solid #00ff00;
  border-radius: 8px;
  padding: 15px;
  color: #00ff00;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}

.achievement-debug__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #00ff00;
  padding-bottom: 10px;
}

.achievement-debug__header h3 {
  margin: 0;
  font-size: 14px;
  color: #00ff00;
}

.achievement-debug__close {
  background: none;
  border: none;
  color: #00ff00;
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.2s;
}

.achievement-debug__close:hover {
  transform: rotate(90deg);
}

.achievement-debug__section {
  margin-bottom: 15px;
  border-bottom: 1px solid #00ff0044;
  padding-bottom: 10px;
}

.achievement-debug__section h4 {
  margin: 0 0 10px 0;
  font-size: 12px;
  color: #ffff00;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.achievement-debug__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.achievement-debug__achievement-btn {
  padding: 8px 10px;
  background: #2a2a2a;
  color: #00ff00;
  border: 1px solid #00ff00;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.achievement-debug__achievement-btn:hover {
  background: #00ff00;
  color: #1e1e1e;
}

.achievement-debug__achievement-btn--unlocked {
  background: #003300;
  border-color: #00ff00;
  color: #00ff00;
}

.achievement-debug__achievement-name {
  flex: 1;
}

.achievement-debug__badge {
  font-size: 10px;
  padding: 2px 6px;
  background: #00ff0044;
  border-radius: 3px;
  white-space: nowrap;
}

.achievement-debug__badge--locked {
  background: #ff000044;
  color: #ff0000;
}

.achievement-debug__utilities {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.achievement-debug__btn {
  padding: 10px;
  border: 1px solid #00ff00;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 11px;
  transition: all 0.2s;
  font-family: monospace;
}

.achievement-debug__btn--info {
  background: #1e3a5f;
  color: #00aaff;
  border-color: #00aaff;
}

.achievement-debug__btn--info:hover {
  background: #00aaff;
  color: #1e3a5f;
}

.achievement-debug__btn--warning {
  background: #5f3a1e;
  color: #ffaa00;
  border-color: #ffaa00;
}

.achievement-debug__btn--warning:hover {
  background: #ffaa00;
  color: #5f3a1e;
}

.achievement-debug__btn--success {
  background: #1e5f3a;
  color: #00ff88;
  border-color: #00ff88;
}

.achievement-debug__btn--success:hover {
  background: #00ff88;
  color: #1e5f3a;
}

.achievement-debug__info {
  font-size: 11px;
  color: #00ff00;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.achievement-debug__info p {
  margin: 0;
}

.achievement-debug__info strong {
  color: #ffff00;
}

/* Transición de slide */
.debug-slide-enter-active,
.debug-slide-leave-active {
  transition: all 0.3s ease;
}

.debug-slide-enter-from,
.debug-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Scrollbar personalizada */
.achievement-debug__list::-webkit-scrollbar,
.achievement-debug__panel::-webkit-scrollbar {
  width: 8px;
}

.achievement-debug__list::-webkit-scrollbar-track,
.achievement-debug__panel::-webkit-scrollbar-track {
  background: #2a2a2a;
  border-radius: 4px;
}

.achievement-debug__list::-webkit-scrollbar-thumb,
.achievement-debug__panel::-webkit-scrollbar-thumb {
  background: #00ff00;
  border-radius: 4px;
}

.achievement-debug__list::-webkit-scrollbar-thumb:hover,
.achievement-debug__panel::-webkit-scrollbar-thumb:hover {
  background: #00ff0088;
}
</style>
