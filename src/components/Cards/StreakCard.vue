<template>
  <div class="streak-card">
    <div class="streak-card__header">
      <h3 class="streak-card__title">📅 {{ t('streak.title') }}</h3>
    </div>

    <div v-if="streakStatus === 'no_data'" class="streak-card__empty">
      <p class="streak-card__message">{{ t('streak.no_data') }}</p>
    </div>

    <div v-else-if="streakStatus === 'legacy_data'" class="streak-card__legacy">
      <p class="streak-card__message">{{ t('streak.legacy_data', { count: legacyCount }) }}</p>
    </div>

    <div v-else class="streak-card__content">
      <div class="streak-card__stat">
        <div class="streak-card__stat-value">{{ currentStreak }}</div>
        <div class="streak-card__stat-label">
          {{ t('streak.current') }}
          <span v-if="!hasStreakToday" class="streak-card__frozen">{{ t('streak.frozen') }}</span>
        </div>
      </div>

      <div class="streak-card__stat">
        <div class="streak-card__stat-value">{{ bestStreak }}</div>
        <div class="streak-card__stat-label">{{ t('streak.best') }}</div>
      </div>

      <div class="streak-card__stat">
        <div class="streak-card__stat-value">{{ daysSinceLastRead }}</div>
        <div class="streak-card__stat-label">{{ t('streak.days_since') }}</div>
      </div>

      <div v-if="lastReadDate" class="streak-card__last-read">
        <span class="streak-card__last-read-label">{{ t('streak.last_read') }}</span>
        <span class="streak-card__last-read-date">{{ formatDate(lastReadDate) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import t from '../../translations'
import { useStreaks } from '../../composables/useStreaks'

const streakData = ref(null)
const currentStreak = ref(0)
const bestStreak = ref(0)
const lastReadDate = ref(null)
const daysSinceLastRead = ref(0)
const hasStreakToday = ref(false)
const legacyCount = ref(0)

const streakStatus = computed(() => {
  if (!streakData.value) return 'loading'
  return streakData.value.getStreakStatus()
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const options = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString(import.meta.env.PUBLIC_LANG === 'en' ? 'en-US' : 'es-ES', options)
}

onMounted(() => {
  streakData.value = useStreaks()
  currentStreak.value = streakData.value.currentStreak
  bestStreak.value = streakData.value.bestStreak
  lastReadDate.value = streakData.value.lastReadDate
  daysSinceLastRead.value = streakData.value.daysSinceLastRead
  hasStreakToday.value = streakData.value.hasStreakToday
  legacyCount.value = streakData.value.legacyDataCount
})
</script>

<style scoped>
.streak-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.streak-card__header {
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 12px;
}

.streak-card__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: white;
}

.streak-card__empty,
.streak-card__legacy {
  text-align: center;
  padding: 20px 0;
}

.streak-card__message {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
}

.streak-card__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
}

.streak-card__stat {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.streak-card__stat:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.streak-card__stat-value {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
}

.streak-card__stat-label {
  font-size: 12px;
  font-weight: 600;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
}

.streak-card__frozen {
  background: rgba(255, 193, 7, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 4px;
}

.streak-card__last-read {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.streak-card__last-read-label {
  font-weight: 600;
  opacity: 0.8;
}

.streak-card__last-read-date {
  font-weight: 700;
}

@media (max-width: 768px) {
  .streak-card {
    padding: 16px;
  }

  .streak-card__stat-value {
    font-size: 24px;
  }

  .streak-card__stat {
    padding: 12px;
  }
}
</style>
