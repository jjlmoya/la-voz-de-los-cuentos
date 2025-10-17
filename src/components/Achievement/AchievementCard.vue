<template>
  <div>
    <div v-if="achievement.unlocked"
      class="achievement-card"
      :class="[`achievement-card--${achievement.type}`]"
    >
      <div class="achievement-card__image">
        <img
          :src="getAchievementIcon()"
          :alt="name"
          class="achievement-card__img"
          @error="handleImageError"
        />
      </div>

      <div class="achievement-card__content">
        <h3 class="achievement-card__name">{{ name }}</h3>
        <p class="achievement-card__description">{{ description }}</p>

        <div v-if="showProgress && achievement.progress !== undefined" class="achievement-card__progress">
          <div class="achievement-card__progress-bar">
            <div
              class="achievement-card__progress-fill"
              :style="{ width: `${achievement.progress}%` }"
            />
          </div>
          <p class="achievement-card__progress-text">
            {{ achievement.current }}/{{ achievement.target }}
          </p>
        </div>

        <div class="achievement-card__unlock-badge">
          ✨
        </div>
      </div>
    </div>
    
    <div v-else
      class="achievement-card achievement-card--locked"
      :class="[`achievement-card--${achievement.type}`]"
    >
      <div class="achievement-card__image">
        <img
          :src="getAchievementIcon()"
          :alt="name"
          class="achievement-card__img"
          @error="handleImageError"
        />
      </div>

      <div class="achievement-card__content">
        <h3 class="achievement-card__name">{{ name }}</h3>
        <p class="achievement-card__description">{{ description }}</p>

        <div v-if="showProgress && achievement.progress !== undefined" class="achievement-card__progress">
          <div class="achievement-card__progress-bar">
            <div
              class="achievement-card__progress-fill"
              :style="{ width: `${achievement.progress}%` }"
            />
          </div>
          <p class="achievement-card__progress-text">
            {{ achievement.current }}/{{ achievement.target }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  achievement: {
    type: Object,
    required: true
  },
  showProgress: {
    type: Boolean,
    default: true
  }
})

const name = computed(() => {
  const lang = import.meta.env.PUBLIC_LANG
  return lang === 'es' ? props.achievement.nameEs : props.achievement.nameEn
})

const description = computed(() => {
  const lang = import.meta.env.PUBLIC_LANG
  return lang === 'es' ? props.achievement.descriptionEs : props.achievement.descriptionEn
})

function getAchievementIcon() {
  const iconId = props.achievement.iconId
  const folder = props.achievement.metadata?.folder || 'read'
  return `/assets/achievements/${folder}/${iconId}.png`
}

function handleImageError(event) {
  console.warn('Failed to load achievement icon:', event.target.src)
  event.target.src = '/assets/account/get-achievement.webp'
}
</script>

<style scoped>
.achievement-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: var(--v-color-surface-high);
  border-radius: var(--v-radius-lg);
  border: 2px solid var(--v-color-accent-primary);
  position: relative;
  transition: all 0.3s ease;
  height: 100%;
  overflow: hidden;
}

.achievement-card--read {
  border-color: #4CAF50;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, transparent 100%);
}

.achievement-card--favorite {
  border-color: #E91E63;
  background: linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, transparent 100%);
}

.achievement-card--locked {
  opacity: 0.6;
  border-color: var(--v-color-text-low);
  background-color: var(--v-color-surface);
}

.achievement-card--locked .achievement-card__img {
  filter: grayscale(100%);
}

.achievement-card:hover:not(.achievement-card--locked) {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.achievement-card__image {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 0;
  overflow: hidden;
  flex-shrink: 0;
}

.achievement-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.achievement-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-2);
  padding: var(--v-unit-4);
  flex: 1;
  position: relative;
}

.achievement-card__name {
  margin: 0;
  font-size: var(--v-font-size-md);
  font-weight: 700;
  color: var(--v-color-text-high);
}

.achievement-card__description {
  margin: 0;
  font-size: var(--v-font-size-sm);
  color: var(--v-color-text-medium);
}

.achievement-card__progress {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-1);
}

.achievement-card__progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.achievement-card__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #66BB6A);
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.achievement-card__progress-text {
  margin: 0;
  font-size: var(--v-font-size-xs);
  color: var(--v-color-text-medium);
  font-weight: 600;
}

.achievement-card__unlock-badge {
  position: absolute;
  top: var(--v-unit-3);
  right: var(--v-unit-3);
  font-size: 28px;
  animation: sparkle 1s ease-in-out;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

@keyframes sparkle {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .achievement-card__image {
    height: 140px;
  }

  .achievement-card__content {
    padding: var(--v-unit-3);
  }

  .achievement-card__name {
    font-size: var(--v-font-size-sm);
  }

  .achievement-card__description {
    font-size: var(--v-font-size-xs);
  }
}
</style>
