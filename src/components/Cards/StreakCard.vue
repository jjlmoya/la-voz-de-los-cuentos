<template>
  <div v-if="streakStatus === 'no_data'" class="streak-card streak-card--empty">
    <!-- Empty State - Start Streak -->
    <div class="streak-card__background">
      <img
        v-if="assetsReady"
        src="/assets/streak/backgrounds/start-background.webp"
        alt="start"
        class="streak-card__bg-image"
      />
    </div>

    <div class="streak-card__content">
      <div class="streak-card__empty-section">
        <div class="streak-card__character">
          <img
            v-if="assetsReady"
            src="/assets/streak/characters/motivation-character.webp"
            alt="motivation"
            class="streak-card__character-img character-bounce"
          />
        </div>

        <div class="streak-card__empty-text">
          <h3 class="streak-card__empty-title">{{ t('streak.title') }}</h3>
          <p class="streak-card__empty-message">{{ t('streak.no_data') }}</p>
          <p class="streak-card__empty-hint">✨ Comienza hoy a construir tu racha</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="streakStatus === 'legacy_data'" class="streak-card streak-card--legacy">
    <!-- Legacy Data State -->
    <div class="streak-card__legacy-banner">
      <svg class="streak-card__warning-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
      </svg>
      <div>
        <p class="streak-card__legacy-title">{{ t('streak.legacy_data', { count: legacyCount }) }}</p>
        <p class="streak-card__legacy-hint">Próximas lecturas comenzarán a registrar timestamps</p>
      </div>
    </div>
  </div>

  <div v-else class="streak-card" :class="{ 'streak-card--frozen': !hasStreakToday }">
    <!-- Active Streak State -->
    <div class="streak-card__background">
      <img
        v-if="assetsReady && !hasStreakToday"
        src="/assets/streak/backgrounds/frozen-background.webp"
        alt="frozen"
        class="streak-card__bg-image"
      />
      <img
        v-else-if="assetsReady"
        src="/assets/streak/backgrounds/flame-background.webp"
        alt="flame"
        class="streak-card__bg-image"
      />
    </div>

    <div class="streak-card__content">
      <!-- Character (left side) -->
      <div class="streak-card__character-container">
        <div class="streak-card__character">
          <img
            v-if="assetsReady && !hasStreakToday"
            src="/assets/streak/characters/ice-character.webp"
            alt="ice"
            class="streak-card__character-img character-sad"
          />
          <img
            v-else-if="assetsReady"
            src="/assets/streak/characters/flame-character.webp"
            alt="flame"
            class="streak-card__character-img character-celebrate"
          />
        </div>
      </div>

      <!-- Stats (right side) -->
      <div class="streak-card__stats-container">
        <!-- Current Streak -->
        <div class="streak-card__stat-box">
          <div class="streak-card__stat-header">
            <img
              v-if="assetsReady"
              :src="!hasStreakToday ? '/assets/streak/icons/frozen-icon.webp' : '/assets/streak/icons/flame-icon.webp'"
              :alt="hasStreakToday ? 'flame' : 'frozen'"
              class="streak-card__stat-icon"
            />
            <span v-else class="streak-card__stat-icon-emoji">{{ hasStreakToday ? '🔥' : '🧊' }}</span>
          </div>
          <div class="streak-card__stat-number" :class="{ 'number-pulse': hasStreakToday }">
            {{ currentStreak }}
          </div>
          <div class="streak-card__stat-label">
            {{ t('streak.current') }}
            <span v-if="!hasStreakToday" class="streak-badge streak-badge--frozen">
              {{ t('streak.frozen') }}
            </span>
            <span v-else class="streak-badge streak-badge--active">ACTIVA</span>
          </div>
        </div>

        <!-- Best Streak -->
        <div class="streak-card__stat-box">
          <div class="streak-card__stat-header">
            <img
              v-if="assetsReady"
              src="/assets/streak/icons/trophy-icon.webp"
              alt="trophy"
              class="streak-card__stat-icon"
            />
            <span v-else class="streak-card__stat-icon-emoji">🏆</span>
          </div>
          <div class="streak-card__stat-number">{{ bestStreak }}</div>
          <div class="streak-card__stat-label">{{ t('streak.best') }}</div>
        </div>

        <!-- Days Since -->
        <div class="streak-card__stat-box">
          <div class="streak-card__stat-header">
            <img
              v-if="assetsReady"
              src="/assets/streak/icons/calendar-icon.webp"
              alt="calendar"
              class="streak-card__stat-icon"
            />
            <span v-else class="streak-card__stat-icon-emoji">📅</span>
          </div>
          <div class="streak-card__stat-number">{{ daysSinceLastRead }}</div>
          <div class="streak-card__stat-label">{{ t('streak.days_since') }}</div>
        </div>
      </div>
    </div>

    <!-- Last Read Info -->
    <div v-if="lastReadDate" class="streak-card__footer">
      <span class="streak-card__last-read-label">{{ t('streak.last_read') }}</span>
      <span class="streak-card__last-read-date">{{ formatDate(lastReadDate) }}</span>
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
const assetsReady = ref(false)

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

  // Assets are loaded after a short delay to allow fallback emojis to show
  setTimeout(() => {
    assetsReady.value = true
  }, 100)
})
</script>

<style scoped>
/* ===== MAIN CARD CONTAINER ===== */
.streak-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
  border: 3px solid rgba(255, 255, 255, 0.3);
  min-height: 280px;
  animation: cardSlideIn 0.6s ease-out;
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== BACKGROUND ===== */
.streak-card__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.streak-card__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: backgroundShift 8s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* ===== CONTENT LAYERS ===== */
.streak-card__content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  flex: 1;
  gap: 40px;
}

/* ===== CHARACTER CONTAINER ===== */
.streak-card__character-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.streak-card__character {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.streak-card__character-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

/* Character Animations */
.character-celebrate {
  animation: characterCelebrate 0.8s ease-in-out infinite;
}

.character-bounce {
  animation: characterBounce 1s ease-in-out infinite;
}

.character-sad {
  animation: characterSad 0.6s ease-in-out infinite;
}

@keyframes characterCelebrate {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(5deg) scale(1.05); }
  50% { transform: translateY(0) rotate(-5deg) scale(1); }
  75% { transform: translateY(-8px) rotate(5deg) scale(1.03); }
}

@keyframes characterBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes characterSad {
  0%, 100% { transform: translateY(0) scaleX(1); }
  50% { transform: translateY(5px) scaleX(0.98); }
}

/* ===== STATS CONTAINER ===== */
.streak-card__stats-container {
  display: flex;
  gap: 24px;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.streak-card__stat-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 20px 16px;
  text-align: center;
  min-width: 100px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 2px solid rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
}

.streak-card__stat-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.streak-card__stat-box:hover {
  transform: translateY(-8px) scale(1.08);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
}

.streak-card__stat-box:hover::before {
  left: 100%;
}

.streak-card__stat-header {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.streak-card__stat-icon,
.streak-card__stat-icon-emoji {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  animation: iconFloat 2s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.streak-card__stat-number {
  font-size: 40px;
  font-weight: 900;
  color: #FF6B6B;
  margin: 8px 0;
  line-height: 1;
  transition: all 0.3s ease;
}

.streak-card__stat-number.number-pulse {
  animation: numberPulse 1s ease-in-out infinite;
}

@keyframes numberPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.streak-card__stat-label {
  font-size: 12px;
  font-weight: 700;
  color: #2A2A2A;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== BADGE ===== */
.streak-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 800;
  margin-top: 4px;
  text-transform: uppercase;
}

.streak-badge--active {
  background: linear-gradient(135deg, #FF9E00, #FF4040);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 102, 51, 0.4);
}

.streak-badge--frozen {
  background: #5B93FF;
  color: white;
}

/* ===== FOOTER ===== */
.streak-card__footer {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 12px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 13px;
}

.streak-card__last-read-label {
  font-weight: 600;
  opacity: 0.9;
}

.streak-card__last-read-date {
  font-weight: 700;
  font-size: 14px;
}

/* ===== EMPTY STATE ===== */
.streak-card--empty {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.streak-card__empty-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
  color: white;
  padding: 40px 30px;
  position: relative;
  z-index: 2;
}

.streak-card__empty-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.streak-card__empty-message {
  font-size: 16px;
  opacity: 0.95;
  margin: 0;
  max-width: 400px;
}

.streak-card__empty-hint {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
  font-style: italic;
}

/* ===== LEGACY STATE ===== */
.streak-card--legacy {
  background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%);
}

.streak-card__legacy-banner {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px 32px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  margin: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.streak-card__warning-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  animation: warningShake 0.5s ease-in-out infinite;
}

@keyframes warningShake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}

.streak-card__legacy-title {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
}

.streak-card__legacy-hint {
  font-size: 12px;
  opacity: 0.9;
  margin: 4px 0 0 0;
}

/* ===== FROZEN STATE ===== */
.streak-card--frozen {
  background: linear-gradient(135deg, #5B93FF 0%, #4A7FD7 100%);
}

.streak-card--frozen .streak-card__stat-number {
  color: #5B93FF;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .streak-card__content {
    padding: 24px;
    gap: 20px;
  }

  .streak-card__stats-container {
    gap: 16px;
  }

  .streak-card__character {
    width: 150px;
    height: 150px;
  }

  .streak-card__stat-box {
    min-width: 85px;
    padding: 16px 12px;
  }

  .streak-card__stat-number {
    font-size: 32px;
  }
}

@media (max-width: 768px) {
  .streak-card {
    min-height: auto;
  }

  .streak-card__content {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }

  .streak-card__character {
    width: 120px;
    height: 120px;
  }

  .streak-card__stats-container {
    width: 100%;
    gap: 12px;
  }

  .streak-card__stat-box {
    flex: 1;
    min-width: auto;
    padding: 14px 10px;
  }

  .streak-card__stat-number {
    font-size: 28px;
  }

  .streak-card__stat-label {
    font-size: 11px;
  }

  .streak-card__footer {
    padding: 10px 16px;
    font-size: 12px;
  }

  .streak-card__empty-section {
    padding: 30px 20px;
  }

  .streak-card__empty-title {
    font-size: 20px;
  }

  .streak-card__empty-message {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .streak-card__stat-box {
    padding: 12px 8px;
  }

  .streak-card__stat-number {
    font-size: 24px;
  }

  .streak-card__stat-icon {
    width: 32px;
    height: 32px;
    font-size: 20px;
  }

  .streak-card__legacy-banner {
    flex-direction: column;
    gap: 12px;
    margin: 16px;
    padding: 16px;
  }
}
</style>
