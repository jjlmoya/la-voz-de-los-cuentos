<template>
  <div class="achievements-section">
    <!-- Header -->
    <div class="achievements-header">
      <div class="achievements-header__content">
        <img
          src="/assets/account/achievements.webp"
          alt="Achievements"
          class="achievements-header__icon"
        />
        <div>
          <h2 class="achievements-header__title">{{ t('page.account.achievements') }}</h2>
          <p class="achievements-header__subtitle">
            {{ stats.unlockedCount }} / {{ stats.totalAchievements }} {{ t('achievements.unlocked') }}
          </p>
        </div>
      </div>

      <!-- Barra de progreso general -->
      <div class="achievements-header__progress">
        <div class="progress-bar">
          <div
            class="progress-bar__fill"
            :style="{ width: `${stats.progressPercentage}%` }"
          />
        </div>
        <p class="progress-text">{{ stats.progressPercentage }}%</p>
      </div>
    </div>

    <!-- Contenido: Logros -->
    <div class="achievements-grid">
      <template v-if="allAchievements.length > 0">
        <div
          v-for="achievement in allAchievements"
          :key="achievement.id"
          class="achievement-item"
        >
          <AchievementCard :achievement="achievement" :show-progress="true" />
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <p class="empty-state__text">{{ t('achievements.empty') }}</p>
      </div>
    </div>

    <!-- Estadísticas -->
    <div v-if="stats.recentUnlocks.length > 0" class="achievements-stats">
      <h3 class="achievements-stats__title">{{ t('achievements.recent') }}</h3>
      <div class="recent-unlocks">
        <div v-for="achievement in stats.recentUnlocks" :key="achievement.id" class="recent-unlock">
          <img
            :src="getIconPath(achievement.iconId)"
            :alt="getAchievementName(achievement)"
            class="recent-unlock__icon"
          />
          <div class="recent-unlock__info">
            <p class="recent-unlock__name">{{ getAchievementName(achievement) }}</p>
            <p class="recent-unlock__date">{{ formatUnlockDate(achievement.unlockedAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import useAchievements from '../../composables/useAchievements'
import AchievementCard from '../../components/Achievement/AchievementCard.vue'
import t from '../../translations'

const { allAchievements, stats } = useAchievements()

function getAchievementName(achievement) {
  const lang = import.meta.env.PUBLIC_LANG
  return lang === 'es' ? achievement.nameEs : achievement.nameEn
}

function getIconPath(iconId) {
  if (!iconId) return '/assets/account/get-achievement.webp'

  const definition = allAchievements.value.find(a => a.iconId === iconId)
  const folder = definition?.metadata?.folder || 'read'

  return `/assets/achievements/${folder}/${iconId}.png`
}

function formatUnlockDate(date) {
  if (!date) return 'Fecha desconocida'

  const d = new Date(date)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (d.toDateString() === today.toDateString()) {
    return 'Hoy'
  } else if (d.toDateString() === yesterday.toDateString()) {
    return 'Ayer'
  }

  return d.toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.achievements-section {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-8);
  padding: var(--v-unit-6);
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.05), rgba(255, 235, 59, 0.03));
  border-radius: var(--v-radius-lg);
  animation: fadeInUp 0.6s ease-out;
}

/* Header */
.achievements-header {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-4);
  padding: var(--v-unit-6);
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1));
  border-radius: var(--v-radius-lg);
  border: 2px solid rgba(255, 193, 7, 0.3);
}

.achievements-header__content {
  display: flex;
  align-items: center;
  gap: var(--v-unit-4);
}

.achievements-header__icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(255, 193, 7, 0.3));
}

.achievements-header__title {
  margin: 0;
  font-size: var(--v-font-size-xl);
  font-weight: 800;
  color: var(--v-color-text-high);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.achievements-header__subtitle {
  margin: var(--v-unit-1) 0 0 0;
  font-size: var(--v-font-size-sm);
  color: var(--v-color-text-medium);
  font-weight: 600;
}

.achievements-header__progress {
  display: flex;
  align-items: center;
  gap: var(--v-unit-3);
}

.progress-bar {
  flex: 1;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
}

.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FF9800);
  border-radius: 10px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.6);
}

.progress-text {
  margin: 0;
  font-size: var(--v-font-size-md);
  font-weight: 700;
  color: var(--v-color-text-high);
  min-width: 50px;
  text-align: right;
}

/* Grid de logros */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--v-unit-4);
  animation: fadeIn 0.4s ease-out;
}

.achievement-item {
  /* Grid item - estilos del achievement están en AchievementCard */
}

/* Empty State */
.empty-state {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  text-align: center;
}

.empty-state__text {
  margin: 0;
  font-size: var(--v-font-size-md);
  color: var(--v-color-text-medium);
  font-weight: 600;
}

/* Estadísticas */
.achievements-stats {
  padding: var(--v-unit-6);
  background: linear-gradient(135deg, rgba(76, 175, 255, 0.05), rgba(100, 200, 255, 0.05));
  border-radius: var(--v-radius-lg);
  border: 2px solid rgba(76, 175, 255, 0.2);
}

.achievements-stats__title {
  margin: 0 0 var(--v-unit-4) 0;
  font-size: var(--v-font-size-lg);
  font-weight: 700;
  color: var(--v-color-text-high);
}

.recent-unlocks {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--v-unit-3);
}

.recent-unlock {
  display: flex;
  align-items: center;
  gap: var(--v-unit-3);
  padding: var(--v-unit-3);
  background: rgba(255, 255, 255, 0.6);
  border-radius: var(--v-radius-md);
  border: 1px solid rgba(76, 175, 255, 0.2);
  transition: all 0.3s ease;
}

.recent-unlock:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(76, 175, 255, 0.4);
  transform: translateY(-2px);
}

.recent-unlock__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: var(--v-radius-md);
  flex-shrink: 0;
}

.recent-unlock__info {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-1);
}

.recent-unlock__name {
  margin: 0;
  font-size: var(--v-font-size-sm);
  font-weight: 700;
  color: var(--v-color-text-high);
}

.recent-unlock__date {
  margin: 0;
  font-size: var(--v-font-size-xs);
  color: var(--v-color-text-medium);
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Tablet */
@media (max-width: 768px) {
  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 640px) {
  .achievements-section {
    padding: var(--v-unit-4);
    gap: var(--v-unit-4);
  }

  .achievements-header {
    padding: var(--v-unit-4);
    flex-direction: column;
  }

  .achievements-header__content {
    flex-wrap: wrap;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
    gap: var(--v-unit-2);
  }

  .recent-unlocks {
    grid-template-columns: 1fr;
  }
}
</style>
