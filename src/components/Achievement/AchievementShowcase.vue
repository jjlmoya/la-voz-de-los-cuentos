<template>
  <div class="achievement-showcase">
    <!-- Fondo decorativo -->
    <div class="achievement-showcase__bg"></div>

    <!-- Contenido principal -->
    <div class="achievement-showcase__content">
      <!-- Columna izquierda: Imagen -->
      <div class="achievement-showcase__image-wrapper">
        <img
          :src="getAchievementIcon()"
          :alt="achievementName"
          class="achievement-showcase__image"
          @error="handleImageError"
        />
        <div v-if="achievement.unlocked" class="achievement-showcase__unlock-indicator">
          <span class="achievement-showcase__unlock-text">DESBLOQUEADO</span>
        </div>
      </div>

      <!-- Columna derecha: Info -->
      <div class="achievement-showcase__info">
        <div class="achievement-showcase__header">
          <div class="achievement-showcase__type-badge" :class="`type-${achievement.type}`">
            {{ achievement.type === 'read' ? 'LECTURA' : 'FAVORITO' }}
          </div>
          <h2 class="achievement-showcase__title">{{ achievementName }}</h2>
        </div>

        <p class="achievement-showcase__description">
          {{ achievementDescription }}
        </p>

        <!-- Progress o Stats -->
        <div v-if="!achievement.unlocked" class="achievement-showcase__progress">
          <div class="achievement-showcase__progress-info">
            <span class="achievement-showcase__progress-label">Progreso</span>
            <span class="achievement-showcase__progress-value">
              {{ achievement.current || 0 }}/{{ achievement.target }}
            </span>
          </div>
          <div class="achievement-showcase__progress-bar">
            <div
              class="achievement-showcase__progress-fill"
              :style="{ width: `${achievement.progress || 0}%` }"
            ></div>
          </div>
          <p class="achievement-showcase__progress-percentage">
            {{ Math.round(achievement.progress || 0) }}% completado
          </p>
        </div>

        <div v-else class="achievement-showcase__unlock-info">
          <div class="achievement-showcase__unlock-date">
            ✨ Desbloqueado el {{ formatDate(achievement.unlockedAt) }}
          </div>
        </div>

        <!-- Stats -->
        <div class="achievement-showcase__stats">
          <div v-if="stats" class="achievement-showcase__stat">
            <span class="achievement-showcase__stat-value">{{ stats.unlockedCount }}</span>
            <span class="achievement-showcase__stat-label">Desbloqueados</span>
          </div>
          <div v-if="stats" class="achievement-showcase__stat">
            <span class="achievement-showcase__stat-value">{{ stats.totalAchievements }}</span>
            <span class="achievement-showcase__stat-label">Total</span>
          </div>
          <div v-if="stats" class="achievement-showcase__stat">
            <span class="achievement-showcase__stat-value">{{ stats.progressPercentage }}%</span>
            <span class="achievement-showcase__stat-label">Completado</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import t from '../../translations/index'

const props = defineProps({
  achievement: {
    type: Object,
    required: true
  },
  stats: {
    type: Object,
    default: null
  }
})

const achievementName = computed(() => {
  return t(props.achievement.nameKey)
})

const achievementDescription = computed(() => {
  return t(props.achievement.descriptionKey)
})

function getAchievementIcon() {
  const iconId = props.achievement.iconId
  const folder = props.achievement.metadata?.folder || 'read'
  return `/assets/achievements/${folder}/${iconId}.png`
}

function handleImageError(event) {
  event.target.src = '/assets/account/get-achievement.webp'
}

function formatDate(date) {
  if (!date) return 'fecha desconocida'
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.achievement-showcase {
  position: relative;
  border-radius: var(--v-radius-lg);
  overflow: hidden;
  margin-bottom: var(--v-unit-8);
}

/* Fondo decorativo */
.achievement-showcase__bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.15), rgba(255, 152, 0, 0.1));
  pointer-events: none;
  z-index: 0;
}

/* Contenido principal */
.achievement-showcase__content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--v-unit-6);
  padding: var(--v-unit-6);
  align-items: center;
  border: 2px solid rgba(255, 193, 7, 0.3);
  border-radius: var(--v-radius-lg);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.6s ease-out;
}

/* Columna de imagen */
.achievement-showcase__image-wrapper {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--v-radius-lg);
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  animation: scaleIn 0.6s ease-out;
}

.achievement-showcase__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Indicador de desbloqueado */
.achievement-showcase__unlock-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(102, 187, 106, 0.9));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.achievement-showcase__image-wrapper:hover .achievement-showcase__unlock-indicator {
  opacity: 1;
}

.achievement-showcase__unlock-text {
  font-size: var(--v-font-size-lg);
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transform: scale(0.8);
}

/* Columna de información */
.achievement-showcase__info {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-4);
}

/* Header con badge y título */
.achievement-showcase__header {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-2);
}

.achievement-showcase__type-badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: var(--v-unit-1) var(--v-unit-3);
  border-radius: 20px;
  font-size: var(--v-font-size-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.achievement-showcase__type-badge.type-read {
  background: rgba(76, 175, 80, 0.15);
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.achievement-showcase__type-badge.type-favorite {
  background: rgba(233, 30, 99, 0.15);
  color: #E91E63;
  border: 1px solid rgba(233, 30, 99, 0.3);
}

.achievement-showcase__title {
  margin: 0;
  font-size: var(--v-font-size-2xl);
  font-weight: 800;
  color: var(--v-color-text-high);
  line-height: 1.2;
}

.achievement-showcase__description {
  margin: 0;
  font-size: var(--v-font-size-md);
  color: var(--v-color-text-medium);
  line-height: 1.6;
}

/* Progress section */
.achievement-showcase__progress {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-2);
  padding: var(--v-unit-3);
  background: rgba(76, 175, 255, 0.1);
  border-radius: var(--v-radius-md);
  border: 1px solid rgba(76, 175, 255, 0.2);
}

.achievement-showcase__progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.achievement-showcase__progress-label {
  font-size: var(--v-font-size-sm);
  font-weight: 600;
  color: var(--v-color-text-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.achievement-showcase__progress-value {
  font-size: var(--v-font-size-lg);
  font-weight: 700;
  color: var(--v-color-text-high);
}

.achievement-showcase__progress-bar {
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.achievement-showcase__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #42A5F5, #1E88E5);
  border-radius: 5px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px rgba(66, 165, 245, 0.5);
}

.achievement-showcase__progress-percentage {
  margin: 0;
  font-size: var(--v-font-size-xs);
  color: var(--v-color-text-medium);
  text-align: right;
}

/* Unlock info */
.achievement-showcase__unlock-info {
  padding: var(--v-unit-3);
  background: rgba(76, 175, 80, 0.1);
  border-radius: var(--v-radius-md);
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.achievement-showcase__unlock-date {
  margin: 0;
  font-size: var(--v-font-size-sm);
  color: #4CAF50;
  font-weight: 600;
}

/* Stats */
.achievement-showcase__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--v-unit-3);
  padding-top: var(--v-unit-3);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.achievement-showcase__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--v-unit-1);
}

.achievement-showcase__stat-value {
  font-size: var(--v-font-size-2xl);
  font-weight: 800;
  color: var(--v-color-text-high);
}

.achievement-showcase__stat-label {
  font-size: var(--v-font-size-xs);
  color: var(--v-color-text-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .achievement-showcase__content {
    grid-template-columns: 1fr;
    gap: var(--v-unit-4);
  }

  .achievement-showcase__image-wrapper {
    aspect-ratio: 16 / 9;
  }

  .achievement-showcase__title {
    font-size: var(--v-font-size-xl);
  }
}

@media (max-width: 640px) {
  .achievement-showcase__content {
    padding: var(--v-unit-4);
    gap: var(--v-unit-3);
  }

  .achievement-showcase__image-wrapper {
    aspect-ratio: 16 / 9;
  }

  .achievement-showcase__info {
    gap: var(--v-unit-2);
  }

  .achievement-showcase__title {
    font-size: var(--v-font-size-lg);
  }

  .achievement-showcase__description {
    font-size: var(--v-font-size-sm);
  }

  .achievement-showcase__stats {
    grid-template-columns: 1fr;
    gap: var(--v-unit-2);
  }

  .achievement-showcase__stat {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
