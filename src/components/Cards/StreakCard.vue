<template>
  <div class="streak-card" :class="{ 'streak-card--milestone-25': currentStreak % 25 === 0 && currentStreak > 0, 'streak-card--milestone-50': currentStreak % 50 === 0 && currentStreak > 0 }">
    <!-- Spacing from hero -->
    <div class="streak-card__top-spacing"></div>

    <!-- Main streak number -->
    <div class="streak-card__header">
      <div class="streak-card__number" :class="{ 'streak-card__number--pulse-intense': currentStreak % 25 === 0 && currentStreak > 0, 'streak-card__number--frozen': !hasStreakToday && currentStreak > 0, 'streak-card__number--burning': hasStreakToday }">
        {{ currentStreak }}
      </div>
      <div class="streak-card__label">{{ t('streak.label') }}</div>
    </div>

    <!-- Daily progress dots -->
    <div class="streak-card__days">
      <div v-for="(day, index) in last7Days" :key="index" class="streak-card__day-wrapper" :class="{ 'streak-card__day-wrapper--second-row': index >= 4 }" :style="{ '--delay': `${index * 0.15}s`, '--rotation': `${getRandomRotation(index)}deg`, '--offset': `${getRandomOffset(index)}px` }">
        <img
          v-if="day.count > 0"
          :src="getSticker(index)"
          :alt="`sticker-${index}`"
          class="streak-card__sticker streak-card__day-img--drop"
        />
        <div
          class="streak-card__day-dot"
          :class="{
            'streak-card__day-dot--empty': day.count === 0,
            'streak-card__day-dot--one': day.count === 1,
            'streak-card__day-dot--epic': day.count > 1,
            'streak-card__day-dot--today': day.isToday
          }"
        >
          <span v-if="day.count > 1" class="streak-card__day-number">{{ day.count }}</span>
        </div>
        <div class="streak-card__day-label">{{ getLocalizedDayLabel(day) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import t from '../../translations'

const currentStreak = ref(0)
const last7Days = ref([])
const hasStreakToday = ref(false)
const updateTrigger = ref(0)

const handleStorageChange = () => {
  console.log('Storage change detected, recalculating streak...')
  updateTrigger.value++
}

watch(updateTrigger, () => {
  calculateLast7Days()
})

onMounted(() => {
  calculateLast7Days()
  // Listen for storage changes from other tabs/windows
  window.addEventListener('storage', handleStorageChange)
  // Also listen for custom events when data changes in same tab
  window.addEventListener('storage:updated', handleStorageChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
  window.removeEventListener('storage:updated', handleStorageChange)
})

const getCompletedCountForDate = (dateStr) => {
  try {
    const storiesData = JSON.parse(localStorage.getItem('storiesData')) || []
    const songsData = JSON.parse(localStorage.getItem('songsData')) || []

    const allData = [...storiesData, ...songsData]

    let count = 0
    allData.forEach(item => {
      if (item && item.finished) {
        // Si está finished pero no tiene completedAt, asumir que fue completado hoy
        const completedTime = item.completedAt || Date.now()
        const date = new Date(completedTime)
        const completedDate = date.getFullYear() + '-' +
                            String(date.getMonth() + 1).padStart(2, '0') + '-' +
                            String(date.getDate()).padStart(2, '0')
        if (completedDate === dateStr) {
          count++
        }
      }
    })

    return count
  } catch (e) {
    console.error('Error getting completed count:', e)
    return 0
  }
}

const calculateLast7Days = () => {
  const days = []
  const today = new Date()

  // Get last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const dateStr = date.getFullYear() + '-' +
                   String(date.getMonth() + 1).padStart(2, '0') + '-' +
                   String(date.getDate()).padStart(2, '0')
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
  hasStreakToday.value = days[6].count > 0

  updateCurrentStreak()
}

const updateCurrentStreak = () => {
  try {
    const storiesData = JSON.parse(localStorage.getItem('storiesData')) || []
    const songsData = JSON.parse(localStorage.getItem('songsData')) || []
    const allData = [...storiesData, ...songsData]

    // Group all completions by date
    const completionsByDate = {}
    allData.forEach(item => {
      if (item && item.finished) {
        // Si está finished pero no tiene completedAt, asumir que fue completado hoy
        const completedTime = item.completedAt || Date.now()
        const date = new Date(completedTime)
        const dateStr = date.getFullYear() + '-' +
                       String(date.getMonth() + 1).padStart(2, '0') + '-' +
                       String(date.getDate()).padStart(2, '0')
        if (!completionsByDate[dateStr]) {
          completionsByDate[dateStr] = 0
        }
        completionsByDate[dateStr]++
      }
    })

    // Calculate streak starting from yesterday backwards
    // Today doesn't break the streak, only previous days matter
    let streak = 0
    const today = new Date()
    const todayStr = today.getFullYear() + '-' +
                     String(today.getMonth() + 1).padStart(2, '0') + '-' +
                     String(today.getDate()).padStart(2, '0')

    let currentDate = new Date(today)
    currentDate.setDate(currentDate.getDate() - 1) // Start from yesterday

    // Count consecutive days backwards starting from yesterday
    while (true) {
      const dateStr = currentDate.getFullYear() + '-' +
                     String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
                     String(currentDate.getDate()).padStart(2, '0')

      if (completionsByDate[dateStr] && completionsByDate[dateStr] > 0) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    // Add 1 only if today has completions
    if (completionsByDate[todayStr] && completionsByDate[todayStr] > 0) {
      streak += 1
    }

    currentStreak.value = streak
  } catch (e) {
    console.error('Error updating current streak:', e)
    currentStreak.value = 0
  }
}

const starStickers = [
  '/assets/streak/stickers/s1.webp',
  '/assets/streak/stickers/s2.webp',
  '/assets/streak/stickers/s3.webp',
  '/assets/streak/stickers/s4.webp',
  '/assets/streak/stickers/s5.webp',
  '/assets/streak/stickers/s6.webp',
  '/assets/streak/stickers/s7.webp',
  '/assets/streak/stickers/s8.webp'
]

function getSticker(dayIndex) {
  const day = last7Days.value[dayIndex]
  if (!day) return starStickers[0]

  // Create a simple but consistent hash from the date
  const [year, month, dayNum] = day.date.split('-').map(Number)
  const hash = (year * 10000 + month * 100 + dayNum) % 8

  return starStickers[hash]
}

function getRandomRotation(index) {
  const randomValue = Math.sin(index * 12.9898 + 78.233) * 43758.5453
  return ((randomValue - Math.floor(randomValue)) * 45) - 22.5
}

function getRandomOffset(index) {
  const randomValue = Math.sin(index * 34.233 + 45.164) * 34748.2384
  return ((randomValue - Math.floor(randomValue)) * 20) - 10
}

function getLocalizedDayLabel(day) {
  if (day.isToday) {
    return t('streak.today')
  }

  const dayNameMap = {
    'Mon': 'streak.mon',
    'Tue': 'streak.tue',
    'Wed': 'streak.wed',
    'Thu': 'streak.thu',
    'Fri': 'streak.fri',
    'Sat': 'streak.sat',
    'Sun': 'streak.sun'
  }

  const translationKey = dayNameMap[day.label]
  return translationKey ? t(translationKey) : day.label
}
</script>

<style scoped>
.streak-card {
  margin-top: 20px;
  position: relative;
  width: 100%;
  padding: 28px 24px 45px 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  border: 2px solid rgba(255, 158, 0, 0.25);
  box-shadow: 0 4px 20px rgba(255, 158, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3);
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

/* Header with number */
.streak-card__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
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

.streak-card__number--burning {
  background: linear-gradient(135deg, #FF9E00, #FF4040);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fireGlow 0.8s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 158, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 64, 64, 0.4));
  text-shadow: none;
}

@keyframes fireGlow {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(255, 158, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 64, 64, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(255, 158, 0, 0.8)) drop-shadow(0 0 24px rgba(255, 64, 64, 0.6));
  }
}

.streak-card__number--frozen {
  background: linear-gradient(135deg, #5B93FF, #B3D9FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 8px rgba(91, 147, 255, 0.3)) drop-shadow(0 0 12px rgba(179, 217, 255, 0.15));
  text-shadow: none;
  opacity: 0.7;
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
  margin-top: 24px;
  padding: 0 8px;
}

.streak-card__day-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.streak-card__day-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.streak-card__day-dot {
  width: 70px;
  height: 70px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 700;
  font-size: 12px;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.04);
  border: 2px solid rgba(0, 0, 0, 0.1);
  overflow: visible;
  z-index: 5;
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

.streak-card__sticker {
  position: absolute;
  width: 200%;
  height: 200%;
  object-fit: contain;
  pointer-events: none;
  z-index: 10;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.streak-card__day-img--drop {
  animation: dropSticker 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) var(--delay) forwards;
  transform-origin: center;
  opacity: 0;
  filter: drop-shadow(0 10px 20px rgba(255, 107, 107, 0.3));
}

@keyframes dropSticker {
  0% {
    opacity: 0;
    transform: translate(-50%, calc(-50% - 800px)) rotate(-45deg) scale(4);
    filter: drop-shadow(0 0px 0px rgba(255, 107, 107, 0));
  }
  10% {
    opacity: 1;
    transform: translate(-50%, calc(-50% - 600px)) rotate(-35deg) scale(3.5);
    filter: drop-shadow(0 4px 8px rgba(255, 107, 107, 0.2));
  }
  40% {
    opacity: 1;
    transform: translate(calc(-50% + var(--offset)), calc(-50% - 150px)) rotate(calc(var(--rotation) * 0.4)) scale(1.6);
    filter: drop-shadow(0 8px 16px rgba(255, 107, 107, 0.4));
  }
  75% {
    opacity: 1;
    transform: translate(calc(-50% + calc(var(--offset) * 0.2)), calc(-50% + 8px)) rotate(calc(var(--rotation) * 0.95)) scale(0.65);
    filter: drop-shadow(0 12px 24px rgba(255, 107, 107, 0.5));
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(calc(var(--rotation) * 1)) scale(0.75);
    filter: drop-shadow(0 10px 20px rgba(255, 107, 107, 0.3));
  }
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
    padding: 10px 12px;
  }

  .streak-card__number {
    font-size: 48px;
    letter-spacing: -1px;
  }

  .streak-card__header {
    margin-bottom: 24px;
  }

  .streak-card__days {
    gap: 8px;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .streak-card__day-wrapper {
    width: calc(25% - 6px);
    margin-bottom: 8px;
  }

  .streak-card__day-wrapper:nth-child(n+5) {
    width: calc(33.333% - 6px);
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
