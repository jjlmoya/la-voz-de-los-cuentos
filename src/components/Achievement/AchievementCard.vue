<template>
  <div
    class="achievement-card"
    :class="[`achievement-card--${achievement.type}`, { 'achievement-card--locked': !achievement.unlocked }]"
  >
    <div class="achievement-card__image">
      <img :src="`/assets/achievements/${achievement.icon}`" :alt="name" class="achievement-card__img" />
      <div v-if="!achievement.unlocked" class="achievement-card__lock">
        <span class="achievement-card__lock-icon">🔒</span>
      </div>
    </div>

    <div class="achievement-card__content">
      <VText as="h3" variant="subtitle" class="achievement-card__name">{{ name }}</VText>
      <VText variant="caption" class="achievement-card__description">{{ description }}</VText>

      <div v-if="progress" class="achievement-card__progress">
        <div class="achievement-card__progress-bar">
          <div
            class="achievement-card__progress-fill"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <VText variant="caption" class="achievement-card__progress-text">
          {{ progress.current }}/{{ progress.target }}
        </VText>
      </div>

      <div v-if="achievement.unlocked" class="achievement-card__unlock-badge">
        ✨
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { VText } from '@overgaming/vicius'
  import t from '../../translations'
  import useAchievements from '../../composables/useAchievements'

  const props = defineProps({
    achievement: {
      type: Object,
      required: true
    }
  })

  const { getAchievementProgress } = useAchievements()

  const name = computed(() => {
    const lang = import.meta.env.PUBLIC_LANG
    return lang === 'es' ? props.achievement.nameEs : props.achievement.nameEn
  })

  const description = computed(() => {
    const lang = import.meta.env.PUBLIC_LANG
    return lang === 'es' ? props.achievement.descriptionEs : props.achievement.descriptionEn
  })

  const progress = computed(() => getAchievementProgress(props.achievement.id))

  const progressPercentage = computed(() => {
    if (!progress.value) return 0
    return Math.min(100, (progress.value.current / progress.value.target) * 100)
  })
</script>

<style scoped>
  .achievement-card {
    display: grid;
    grid-template-columns: 80px 1fr;
    grid-gap: var(--v-unit-4);
    padding: var(--v-unit-4);
    background-color: var(--v-color-surface-high);
    border-radius: var(--v-radius-lg);
    border: 2px solid var(--v-color-accent-primary);
    position: relative;
    transition: all 0.3s ease;
  }

  .achievement-card--trophy {
    border-color: #d4af37;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%);
  }

  .achievement-card--medal {
    border-color: #c0c0c0;
    background: linear-gradient(135deg, rgba(192, 192, 192, 0.1) 0%, transparent 100%);
  }

  .achievement-card--badge {
    border-color: var(--v-color-accent-primary);
  }

  .achievement-card--locked {
    opacity: 0.6;
    border-color: var(--v-color-text-low);
    background-color: var(--v-color-surface);
  }

  .achievement-card__image {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 80px;
    height: 80px;
  }

  .achievement-card__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .achievement-card__lock {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: var(--v-radius-md);
  }

  .achievement-card__lock-icon {
    font-size: 32px;
  }

  .achievement-card__content {
    display: grid;
    grid-gap: var(--v-unit-2);
    align-content: start;
  }

  .achievement-card__name {
    margin: 0;
    font-weight: 600;
  }

  .achievement-card__description {
    margin: 0;
    color: var(--v-color-text-medium);
  }

  .achievement-card__progress {
    display: grid;
    grid-gap: var(--v-unit-1);
    margin-top: var(--v-unit-2);
  }

  .achievement-card__progress-bar {
    width: 100%;
    height: 6px;
    background-color: var(--v-color-surface);
    border-radius: 3px;
    overflow: hidden;
  }

  .achievement-card__progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--v-color-accent-primary), var(--v-color-primary));
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .achievement-card__progress-text {
    font-size: 12px;
    color: var(--v-color-text-medium);
  }

  .achievement-card__unlock-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 24px;
    animation: twinkle 1.5s ease-in-out infinite;
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.1);
    }
  }

  @media (max-width: 640px) {
    .achievement-card {
      grid-template-columns: 70px 1fr;
      grid-gap: var(--v-unit-3);
      padding: var(--v-unit-3);
    }

    .achievement-card__image {
      min-width: 70px;
      height: 70px;
    }

    .achievement-card__lock-icon {
      font-size: 28px;
    }
  }
</style>
