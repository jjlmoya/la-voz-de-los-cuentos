<template>
  <!-- Empty State -->
  <div v-if="streakStatus === 'no_data'" class="streak-card streak-card--empty">
    <div class="streak-card__background">
      <img
        src="/assets/streak/backgrounds/start-background.webp"
        alt="start background"
        class="streak-card__bg-image"
      />
    </div>
    <div class="streak-card__overlay"></div>
    <div class="streak-card__content">
      <div class="streak-card__empty-container">
        <div class="streak-card__character">
          <img
            src="/assets/streak/characters/motivation-character.webp"
            alt="motivation character"
            class="streak-card__character-img"
          />
        </div>
        <div class="streak-card__text">
          <h3 class="streak-card__title">{{ t('streak.title') }}</h3>
          <p class="streak-card__description">{{ t('streak.no_data') }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Legacy Data State -->
  <div v-else-if="streakStatus === 'legacy_data'" class="streak-card streak-card--legacy">
    <div class="streak-card__overlay"></div>
    <div class="streak-card__content">
      <div class="streak-card__legacy-message">
        <p class="streak-card__legacy-title">{{ t('streak.legacy_data', { count: legacyCount }) }}</p>
        <p class="streak-card__legacy-text">Próximas lecturas comenzarán a registrar timestamps</p>
      </div>
    </div>
  </div>

  <!-- Active Streak State -->
  <div v-else class="streak-card" :class="{ 'streak-card--frozen': !hasStreakToday }">
    <div class="streak-card__background">
      <img
        :src="!hasStreakToday ? '/assets/streak/backgrounds/frozen-background.webp' : '/assets/streak/backgrounds/flame-background.webp'"
        :alt="!hasStreakToday ? 'frozen background' : 'flame background'"
        class="streak-card__bg-image"
      />
    </div>
    <div class="streak-card__overlay"></div>

    <div class="streak-card__content">
      <!-- Character -->
      <div class="streak-card__left">
        <div class="streak-card__character-wrapper">
          <img
            :src="!hasStreakToday ? '/assets/streak/characters/ice-character.webp' : '/assets/streak/characters/flame-character.webp'"
            :alt="!hasStreakToday ? 'ice character' : 'flame character'"
            class="streak-card__character-img"
          />
        </div>
      </div>

      <!-- Stats -->
      <div class="streak-card__right">
        <div class="streak-card__stats">
          <!-- Current Streak -->
          <div class="streak-card__stat">
            <div class="streak-card__stat-icon-wrapper">
              <img
                :src="!hasStreakToday ? '/assets/streak/icons/frozen-icon.webp' : '/assets/streak/icons/flame-icon.webp'"
                :alt="!hasStreakToday ? 'frozen icon' : 'flame icon'"
                class="streak-card__stat-icon"
              />
            </div>
            <div class="streak-card__stat-number">{{ currentStreak }}</div>
            <div class="streak-card__stat-label">
              {{ t('streak.current') }}
              <span v-if="!hasStreakToday" class="streak-card__status-badge streak-card__status-badge--frozen">
                {{ t('streak.frozen') }}
              </span>
            </div>
          </div>

          <!-- Best Streak -->
          <div class="streak-card__stat">
            <div class="streak-card__stat-icon-wrapper">
              <img
                src="/assets/streak/icons/trophy-icon.webp"
                alt="trophy icon"
                class="streak-card__stat-icon"
              />
            </div>
            <div class="streak-card__stat-number">{{ bestStreak }}</div>
            <div class="streak-card__stat-label">{{ t('streak.best') }}</div>
          </div>

          <!-- Days Since -->
          <div class="streak-card__stat">
            <div class="streak-card__stat-icon-wrapper">
              <img
                src="/assets/streak/icons/calendar-icon.webp"
                alt="calendar icon"
                class="streak-card__stat-icon"
              />
            </div>
            <div class="streak-card__stat-number">{{ daysSinceLastRead }}</div>
            <div class="streak-card__stat-label">{{ t('streak.days_since') }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="lastReadDate" class="streak-card__footer">
      <span class="streak-card__footer-label">{{ t('streak.last_read') }}</span>
      <span class="streak-card__footer-date">{{ formatDate(lastReadDate) }}</span>
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
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  min-height: 280px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.streak-card__background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.streak-card__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.streak-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.streak-card__content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 40px;
  gap: 60px;
}

/* ===== LEFT SIDE: CHARACTER ===== */
.streak-card__left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.streak-card__character-wrapper {
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.streak-card__character-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ===== RIGHT SIDE: STATS ===== */
.streak-card__right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.streak-card__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;
  max-width: 420px;
}

.streak-card__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.streak-card__stat-icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.streak-card__stat-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.streak-card__stat-number {
  font-size: 48px;
  font-weight: 900;
  color: white;
  line-height: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.streak-card__stat-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.streak-card__status-badge {
  display: block;
  margin-top: 4px;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
}

.streak-card__status-badge--frozen {
  background: rgba(91, 147, 255, 0.4);
}

/* ===== FOOTER ===== */
.streak-card__footer {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
}

.streak-card__footer-label {
  font-weight: 600;
}

.streak-card__footer-date {
  font-weight: 700;
}

/* ===== EMPTY STATE ===== */
.streak-card--empty {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.streak-card__empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.streak-card__character {
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.streak-card__text {
  color: white;
}

.streak-card__title {
  font-size: 26px;
  font-weight: 700;
  margin: 0;
}

.streak-card__description {
  font-size: 15px;
  margin: 8px 0 0 0;
  opacity: 0.95;
  max-width: 350px;
}

/* ===== LEGACY STATE ===== */
.streak-card--legacy {
  background: linear-gradient(135deg, #FF9E00 0%, #FF6B35 100%);
}

.streak-card__legacy-message {
  text-align: center;
  color: white;
}

.streak-card__legacy-title {
  font-size: 15px;
  font-weight: 700;
  margin: 0;
}

.streak-card__legacy-text {
  font-size: 13px;
  margin: 6px 0 0 0;
  opacity: 0.9;
}

/* ===== FROZEN STATE ===== */
.streak-card--frozen {
  background: linear-gradient(135deg, #5B93FF 0%, #4A7FD7 100%);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .streak-card__content {
    padding: 32px;
    gap: 40px;
  }

  .streak-card__character-wrapper {
    width: 160px;
    height: 160px;
  }

  .streak-card__stats {
    gap: 24px;
    max-width: 320px;
  }

  .streak-card__stat-number {
    font-size: 40px;
  }

  .streak-card__stat-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .streak-card__stat-icon {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 768px) {
  .streak-card {
    min-height: auto;
  }

  .streak-card__content {
    flex-direction: column;
    padding: 28px;
    gap: 28px;
  }

  .streak-card__left {
    order: -1;
  }

  .streak-card__character-wrapper {
    width: 140px;
    height: 140px;
  }

  .streak-card__stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 100%;
  }

  .streak-card__stat-number {
    font-size: 32px;
  }

  .streak-card__stat-label {
    font-size: 11px;
  }

  .streak-card__character {
    width: 140px;
    height: 140px;
  }

  .streak-card__title {
    font-size: 22px;
  }

  .streak-card__description {
    font-size: 14px;
  }

  .streak-card__footer {
    padding: 10px 28px;
    gap: 16px;
    flex-direction: column;
    text-align: center;
  }

  .streak-card__empty-container {
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .streak-card__content {
    padding: 20px;
    gap: 20px;
  }

  .streak-card__character-wrapper {
    width: 120px;
    height: 120px;
  }

  .streak-card__stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .streak-card__stat {
    gap: 8px;
  }

  .streak-card__stat-number {
    font-size: 28px;
  }

  .streak-card__stat-icon-wrapper {
    width: 44px;
    height: 44px;
  }

  .streak-card__stat-icon {
    width: 28px;
    height: 28px;
  }

  .streak-card__stat-label {
    font-size: 10px;
  }

  .streak-card__character {
    width: 110px;
    height: 110px;
  }

  .streak-card__title {
    font-size: 20px;
  }

  .streak-card__description {
    font-size: 13px;
  }

  .streak-card__footer {
    padding: 10px 20px;
  }
}
</style>
