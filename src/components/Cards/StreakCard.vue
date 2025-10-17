<template>
  <div class="streak-card" :class="{ 'streak-card--milestone-25': currentStreak % 25 === 0 && currentStreak > 0, 'streak-card--milestone-50': currentStreak % 50 === 0 && currentStreak > 0 }">
    <!-- Spacing from hero -->
    <div class="streak-card__top-spacing"></div>

    <!-- Main streak number with flame icon -->
    <div class="streak-card__header">
      <div class="streak-card__flame-icon">
        <img src="/assets/streak/icons/flame-icon.webp" alt="flame" class="streak-card__flame-img" />
      </div>
      <div class="streak-card__number" :class="{ 'streak-card__number--pulse-intense': currentStreak % 25 === 0 && currentStreak > 0 }">
        {{ currentStreak }}
      </div>
      <div class="streak-card__label">day streak</div>
    </div>

    <!-- Daily progress dots -->
    <div class="streak-card__days">
      <div v-for="(day, index) in last7Days" :key="index" class="streak-card__day-container">
        <div
          class="streak-card__day-dot"
          :class="{
            'streak-card__day-dot--empty': day.count === 0,
            'streak-card__day-dot--one': day.count === 1,
            'streak-card__day-dot--epic': day.count > 1,
            'streak-card__day-dot--today': day.isToday
          }"
        >
          <img
            v-if="day.count > 0"
            :src="getDayImage(day.count)"
            :alt="`day-${day.count}`"
            class="streak-card__day-img"
          />
          <span v-if="day.count > 1" class="streak-card__day-number">{{ day.count }}</span>
        </div>
        <div class="streak-card__day-label">{{ day.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStreaks } from '../../composables/useStreaks'

const streakData = ref(null)
const currentStreak = ref(0)
const last7Days = ref([])

onMounted(() => {
  streakData.value = useStreaks()
  currentStreak.value = streakData.value.currentStreak

  // Calculate days immediately after loading streak data
  setTimeout(() => {
    calculateLast7Days()
  }, 0)
})

const calculateLast7Days = () => {
  const days = []
  const today = new Date()

  // Get last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const dateStr = date.toISOString().split('T')[0]
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })

    // Count items completed on this date
    const count = getCompletedCountForDate(dateStr)

    days.push({
      date: dateStr,
      label: i === 0 ? 'Today' : dayOfWeek,
      count: count,
      isToday: i === 0
    })
  }

  last7Days.value = days
}

const getCompletedCountForDate = (dateStr) => {
  if (!streakData.value) return 0

  try {
    const storiesData = JSON.parse(localStorage.getItem('storiesData')) || []
    const songsData = JSON.parse(localStorage.getItem('songsData')) || []

    const allData = [...storiesData, ...songsData]

    let count = 0
    allData.forEach(item => {
      if (item.completedAt && item.finished) {
        const completedDate = new Date(item.completedAt).toISOString().split('T')[0]
        if (completedDate === dateStr) {
          count++
        }
      }
    })

    return count
  } catch (e) {
    return 0
  }
}

const getDayImage = (count) => {
  // Return appropriate illustration based on count
  // 1 = basic achievement image
  // 2-4 = good achievement
  // 5+ = epic achievement
  if (count >= 5) {
    return '/assets/streak/characters/flame-character.webp'
  } else if (count >= 2) {
    return '/assets/streak/characters/motivation-character.webp'
  } else {
    return '/assets/streak/icons/flame-icon.webp'
  }
}
</script>

<style scoped>
.streak-card {
  position: relative;
  width: 100%;
  padding: 40px 24px 60px 24px;
  background: linear-gradient(180deg, rgba(255, 158, 0, 0.05) 0%, transparent 100%);
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.streak-card--milestone-25 {
  background: linear-gradient(180deg, rgba(255, 158, 0, 0.15) 0%, rgba(255, 64, 64, 0.08) 100%);
  animation: milestone-glow 0.6s ease-out;
}

.streak-card--milestone-50 {
  background: linear-gradient(180deg, rgba(255, 214, 0, 0.2) 0%, rgba(255, 64, 64, 0.12) 100%);
  animation: milestone-glow-intense 0.8s ease-out;
}

@keyframes milestone-glow {
  0% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes milestone-glow-intense {
  0% {
    transform: scale(0.95);
    filter: brightness(0.9);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
}

/* Top spacing from hero */
.streak-card__top-spacing {
  height: 24px;
}

/* Header with flame and number */
.streak-card__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}

.streak-card__flame-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: flame-float 2s ease-in-out infinite;
}

@keyframes flame-float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.08); }
}

.streak-card__flame-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(255, 158, 0, 0.4));
}

.streak-card__number {
  font-size: 88px;
  font-weight: 900;
  color: #FF6B6B;
  line-height: 0.9;
  letter-spacing: -3px;
  text-shadow: 0 4px 16px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
}

.streak-card__number--pulse-intense {
  animation: number-intense-pulse 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

@keyframes number-intense-pulse {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.15); }
  50% { transform: scale(0.95); }
  75% { transform: scale(1.1); }
}

.streak-card__label {
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Daily dots grid */
.streak-card__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  margin-top: 40px;
  padding: 0 8px;
}

.streak-card__day-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.streak-card__day-dot {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 700;
  font-size: 12px;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.04);
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.streak-card__day-dot--empty {
  background: rgba(200, 200, 200, 0.2);
  border-color: rgba(200, 200, 200, 0.3);
  opacity: 0.5;
}

.streak-card__day-dot--one {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1));
  border-color: #4CAF50;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
}

.streak-card__day-dot--epic {
  background: linear-gradient(135deg, rgba(255, 158, 0, 0.3), rgba(255, 64, 64, 0.2));
  border-color: #FF6B6B;
  box-shadow: 0 6px 16px rgba(255, 107, 107, 0.3);
  transform: scale(1.05);
}

.streak-card__day-dot--today {
  border-color: #FF6B6B;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2), 0 8px 20px rgba(255, 107, 107, 0.3);
  animation: today-pulse 1.2s ease-in-out infinite;
}

@keyframes today-pulse {
  0%, 100% {
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2), 0 8px 20px rgba(255, 107, 107, 0.3);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(255, 107, 107, 0.15), 0 8px 20px rgba(255, 107, 107, 0.4);
  }
}

.streak-card__day-img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.streak-card__day-number {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #FF9E00, #FF6B6B);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.streak-card__day-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive */
@media (max-width: 768px) {
  .streak-card {
    padding: 32px 16px 48px 16px;
  }

  .streak-card__number {
    font-size: 64px;
    letter-spacing: -2px;
  }

  .streak-card__flame-icon {
    width: 52px;
    height: 52px;
  }

  .streak-card__days {
    gap: 10px;
    padding: 0 4px;
  }

  .streak-card__day-dot {
    width: 48px;
    height: 48px;
  }

  .streak-card__day-label {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .streak-card {
    padding: 24px 12px 36px 12px;
  }

  .streak-card__number {
    font-size: 48px;
    letter-spacing: -1px;
  }

  .streak-card__flame-icon {
    width: 44px;
    height: 44px;
  }

  .streak-card__header {
    margin-bottom: 24px;
  }

  .streak-card__days {
    gap: 8px;
    padding: 0;
  }

  .streak-card__day-dot {
    width: 40px;
    height: 40px;
  }

  .streak-card__day-number {
    width: 18px;
    height: 18px;
    font-size: 9px;
  }

  .streak-card__day-label {
    font-size: 9px;
  }
}
</style>
