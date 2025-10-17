<template>
  <div
    class="achievement-card"
    :class="[
      `achievement-card--${achievement.type}`,
      { 'achievement-card--locked': !achievement.unlocked }
    ]"
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
      <p class="achievement-card__description">
        {{ achievement.unlocked ? description : '???' }}
      </p>

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

      <div v-if="achievement.unlocked" class="achievement-card__unlock-badge">
        ✨
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
  showProgress: {
    type: Boolean,
    default: true
  }
})

const name = computed(() => {
  return t(props.achievement.nameKey)
})

const description = computed(() => {
  return t(props.achievement.descriptionKey)
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
  flex-direction: row;
  padding: 0;
  background-color: var(--v-color-surface-high);
  border-radius: var(--v-radius-lg);
  border: 2px solid var(--v-color-accent-primary);
  position: relative;
  transition: all 0.3s ease;
  min-height: 140px;
  overflow: hidden;
  align-items: stretch;
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
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  border-color: var(--v-color-accent-primary);
}

.achievement-card__image {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 0;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.05));
}

.achievement-card__image::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
  pointer-events: none;
  z-index: 1;
}

.achievement-card:hover:not(.achievement-card--locked) .achievement-card__image::after {
  left: 100%;
}

.achievement-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
}

.achievement-card:hover:not(.achievement-card--locked) .achievement-card__img {
  transform: scale(1.08);
}

.achievement-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-1);
  padding: var(--v-unit-3);
  flex: 1;
  position: relative;
  justify-content: space-between;
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
  .achievement-card {
    min-height: 80px;
  }

  .achievement-card__image {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
  }

  .achievement-card__content {
    padding: var(--v-unit-1) var(--v-unit-2);
    gap: 2px;
  }

  .achievement-card__name {
    font-size: 12px;
    line-height: 1.2;
    margin: 0;
  }

  .achievement-card__description {
    font-size: 10px;
    line-height: 1.2;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .achievement-card__progress {
    gap: 2px;
  }

  .achievement-card__progress-bar {
    height: 3px;
  }

  .achievement-card__progress-text {
    font-size: 9px;
    margin: 0;
  }

  .achievement-card__unlock-badge {
    font-size: 16px;
    top: 4px;
    right: 4px;
    display: none;
  }
}
</style>
