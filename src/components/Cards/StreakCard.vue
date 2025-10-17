<template>
  <div class="streak-card" :class="{ 'streak-card--active': hasStreakToday, 'streak-card--inactive': !hasStreakToday }">
    <!-- Background with illustration -->
    <div class="streak-card__background">
      <img
        :src="hasStreakToday ? '/assets/streak/backgrounds/flame-background.webp' : '/assets/streak/backgrounds/frozen-background.webp'"
        :alt="hasStreakToday ? 'flame' : 'frozen'"
        class="streak-card__bg-image"
      />
      <!-- Animated overlay particles -->
      <div v-if="hasStreakToday" class="streak-card__particles">
        <div v-for="i in 8" :key="i" class="streak-card__particle" :style="{ '--delay': `${i * 0.1}s` }"></div>
      </div>
    </div>

    <!-- Character -->
    <div class="streak-card__character">
      <img
        :src="hasStreakToday ? '/assets/streak/characters/flame-character.webp' : '/assets/streak/characters/ice-character.webp'"
        :alt="hasStreakToday ? 'flame' : 'ice'"
        class="streak-card__character-img"
        :class="{ 'streak-card__character-img--celebrate': hasStreakToday, 'streak-card__character-img--sad': !hasStreakToday }"
      />
    </div>

    <!-- Main number with animation -->
    <div class="streak-card__counter">
      <div class="streak-card__icon-container">
        <img
          :src="hasStreakToday ? '/assets/streak/icons/flame-icon.webp' : '/assets/streak/icons/frozen-icon.webp'"
          :alt="hasStreakToday ? 'flame' : 'frozen'"
          class="streak-card__icon"
        />
      </div>
      <div class="streak-card__number" :class="{ 'streak-card__number--pulse': hasStreakToday }">
        {{ currentStreak }}
      </div>
    </div>

    <!-- Status indicator -->
    <div class="streak-card__status" :class="{ 'streak-card__status--active': hasStreakToday }">
      <div class="streak-card__status-dot"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStreaks } from '../../composables/useStreaks'

const streakData = ref(null)
const currentStreak = ref(0)
const hasStreakToday = ref(false)

const streakStatus = computed(() => {
  if (!streakData.value) return 'loading'
  return streakData.value.getStreakStatus()
})

onMounted(() => {
  streakData.value = useStreaks()
  currentStreak.value = streakData.value.currentStreak
  hasStreakToday.value = streakData.value.hasStreakToday
})
</script>

<style scoped>
.streak-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 380px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.streak-card--active {
  background: linear-gradient(135deg, #FF9E00 0%, #FF4040 100%);
}

.streak-card--inactive {
  background: linear-gradient(135deg, #5B93FF 0%, #4A7FD7 100%);
}

.streak-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
}

/* Background with illustration */
.streak-card__background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.streak-card__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

/* Particles animation */
.streak-card__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.streak-card__particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
  animation: particle-float 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes particle-float {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-80px) translateX(40px) scale(0.3);
    opacity: 0;
  }
}

/* Character */
.streak-card__character {
  position: relative;
  z-index: 2;
  width: 140px;
  height: 140px;
  margin-bottom: 20px;
}

.streak-card__character-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

.streak-card__character-img--celebrate {
  animation: character-celebrate 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.streak-card__character-img--sad {
  animation: character-sad 1s ease-in-out infinite;
}

@keyframes character-celebrate {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  20% { transform: translateY(-12px) rotate(-5deg) scale(1.05); }
  40% { transform: translateY(0) rotate(5deg) scale(0.98); }
  60% { transform: translateY(-8px) rotate(-3deg) scale(1.03); }
  80% { transform: translateY(0) rotate(2deg) scale(1); }
}

@keyframes character-sad {
  0%, 100% { transform: translateY(0) scaleX(1); }
  50% { transform: translateY(4px) scaleX(0.97); }
}

/* Counter section */
.streak-card__counter {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.streak-card__icon-container {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  animation: icon-float 2.5s ease-in-out infinite;
}

@keyframes icon-float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.05); }
}

.streak-card__icon {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

.streak-card__number {
  font-size: 96px;
  font-weight: 900;
  color: white;
  line-height: 1;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  letter-spacing: -4px;
}

.streak-card__number--pulse {
  animation: number-pulse 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

@keyframes number-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

/* Status indicator */
.streak-card__status {
  position: absolute;
  bottom: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.streak-card__status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.streak-card__status--active .streak-card__status-dot {
  background: #FFD600;
  box-shadow: 0 0 12px rgba(255, 214, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3);
  animation: status-pulse 1.5s ease-in-out infinite;
}

@keyframes status-pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 12px rgba(255, 214, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3); }
  50% { transform: scale(1.3); box-shadow: 0 0 20px rgba(255, 214, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.3); }
}

/* Responsive */
@media (max-width: 768px) {
  .streak-card {
    height: 320px;
  }

  .streak-card__character {
    width: 110px;
    height: 110px;
    margin-bottom: 16px;
  }

  .streak-card__number {
    font-size: 72px;
    letter-spacing: -3px;
  }

  .streak-card__icon-container {
    width: 56px;
    height: 56px;
  }

  .streak-card__icon {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .streak-card {
    height: 280px;
  }

  .streak-card__character {
    width: 90px;
    height: 90px;
    margin-bottom: 12px;
  }

  .streak-card__number {
    font-size: 56px;
    letter-spacing: -2px;
  }

  .streak-card__icon-container {
    width: 48px;
    height: 48px;
  }

  .streak-card__icon {
    width: 30px;
    height: 30px;
  }
}
</style>
