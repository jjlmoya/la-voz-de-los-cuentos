<template>
  <a ref="cardRef" class="basic-card" :href="toStory(slug)">
    <div class="basic-card__image-wrapper">
      <div class="basic-card__image">
        <img
          :alt="`Imagen de ${title}`"
          v-if="isIntersecting"
          class="basic-card__img"
          :aspectRatio="1 / 1"
          :src="getImage()"
          loading="lazy"
        />
        <div class="basic-card__image-overlay"></div>
      </div>
      <VText v-if="time" class="basic-card__time">
        {{ renderedTime }}
      </VText>
      <div v-if="isCompleted" class="basic-card__completed">
        <VText class="basic-card__completed-text">
          {{ lang === 'es' ? '¡LEÍDO!' : 'READ!' }}
        </VText>
      </div>
      <div class="basic-card__progress">
        <div
          :style="{ width: `${status.current || progress}%` }"
          class="basic-card__progress-complete"
        ></div>
      </div>
    </div>
    <div class="basic-card__content">
      <div class="basic-card__article">
        <VText
          class="basic-card__title"
          variant="header"
          color="primary"
          maxLines="2"
          :as="as"
        >
          {{ title }}
        </VText>
      </div>
    </div>
  </a>
</template>

<script setup>
  const lang = import.meta.env.PUBLIC_LANG
  import { toStory } from '../../router'
  import { ref, onMounted, onUnmounted, computed } from 'vue'
  import { VText } from '@overgaming/vicius'
  import useStory from '../../composables/useStory'

  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    },
    isStory: {
      type: Boolean,
      default: true
    },
    isCharacter: {
      type: Boolean,
      default: false
    },
    as: {
      type: String,
      default: 'div'
    },
    progress: {
      type: Number,
      default: 0
    }
  })

  const { getTime, getCurrentStatus } = useStory({
    key: props.slug,
    time: props.time
  })

  const getImage = () => {
    if (props.isStory) return `/assets/stories/${lang}/${props.slug}.webp`
    if (props.isCharacter) return `/assets/characters/${props.slug}.webp`
    return `/assets/sagas/${lang}/${props.slug}.webp`
  }
  const renderedTime = getTime()
  const cardRef = ref(null)
  const status = ref({})
  const isIntersecting = ref(false)

  const isCompleted = computed(() => {
    return (status.value.current || props.progress) >= 100
  })

  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isIntersecting.value = true
          observer.unobserve(cardRef.value)
        }
      },
      {
        threshold: 0.1
      }
    )

    if (cardRef.value) {
      observer.observe(cardRef.value)
    }

    status.value = props.progress || getCurrentStatus()
  })

  onUnmounted(() => {
    if (observer && cardRef.value) {
      observer.unobserve(cardRef.value)
    }
  })
</script>

<style scoped>
  .basic-card {
    position: relative;
    background: transparent;
    border-radius: var(--v-radius-xl);
    padding: 0;
    box-shadow: 
      0 12px 28px hsla(0, 0%, 0%, 0.12),
      0 6px 16px hsla(0, 0%, 0%, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 
        0 20px 40px hsla(0, 0%, 0%, 0.16),
        0 12px 24px hsla(0, 0%, 0%, 0.12);
    }

    &:hover .basic-card__img {
      transform: scale(1.1);
      filter: brightness(1.1) saturate(1.2);
    }

    &:hover .basic-card__image-overlay {
      opacity: 0.3;
    }

    &:active {
      transform: translateY(-4px) scale(1.02);
    }
  }

  .basic-card__image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .basic-card__content {
    background: linear-gradient(145deg, 
      hsl(45, 100%, 96%) 0%, 
      hsl(50, 100%, 98%) 50%, 
      hsl(55, 100%, 96%) 100%);
    text-align: center;
    padding: var(--v-unit-3) var(--v-unit-4);
    margin: 0;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .v-text {
      line-height: 1.2;
      font-weight: 600;
      text-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.08);
      margin: 0;
    }
  }

  .basic-card__image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: var(--v-radius-xl) var(--v-radius-xl) 0 0;
    overflow: hidden;
    background: linear-gradient(45deg, 
      hsl(200, 50%, 95%) 0%, 
      hsl(210, 60%, 97%) 100%);
  }

  .basic-card__image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      hsla(var(--v-color-primary-hsl), 0.1) 0%,
      hsla(var(--v-color-accent-primary-hsl), 0.15) 50%,
      hsla(var(--v-color-primary-hsl), 0.1) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 2;
  }

  .basic-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    animation: fade-in-bounce 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: brightness(1.05) contrast(1.1) saturate(1.1);
  }

  .basic-card__progress {
    background: linear-gradient(90deg, 
      hsla(0, 0%, 0%, 0.2) 0%,
      hsla(0, 0%, 0%, 0.1) 100%);
    backdrop-filter: blur(4px);
    width: 100%;
    height: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 0;
    z-index: 3;
    overflow: hidden;
    border: none;
    box-shadow: none;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%,
        hsla(0, 0%, 100%, 0.3) 50%,
        transparent 100%);
      animation: progress-shimmer 4s infinite ease-in-out;
    }
  }

  .basic-card__progress-complete {
    background: linear-gradient(90deg, 
      var(--v-color-accent-primary) 0%,
      var(--v-color-primary) 50%,
      var(--v-color-accent-primary) 100%);
    height: 100%;
    border-radius: 0;
    transition: width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition-delay: 1s;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 1px 2px hsla(0, 0%, 100%, 0.4);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(180deg, 
        hsla(0, 0%, 100%, 0.4) 0%,
        hsla(0, 0%, 100%, 0.1) 50%,
        transparent 100%);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%,
        hsla(0, 0%, 100%, 0.6) 50%,
        transparent 100%);
      animation: progress-complete-shine 3s infinite ease-in-out;
      animation-delay: 1.5s;
    }
  }

  @keyframes progress-shimmer {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes progress-complete-shine {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes fade-in-bounce {
    0% {
      opacity: 0;
      transform: scale(0.8) rotate(-2deg);
    }
    60% {
      opacity: 0.8;
      transform: scale(1.05) rotate(1deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  .basic-card__completed {
    position: absolute;
    top: var(--v-unit-2);
    left: var(--v-unit-2);
    background: linear-gradient(135deg, 
      var(--v-color-accent-primary) 0%, 
      var(--v-color-primary) 100%);
    color: white;
    padding: var(--v-unit-2) var(--v-unit-4);
    border-radius: var(--v-radius-xl);
    font-size: var(--v-font-size-sm);
    font-weight: 900;
    box-shadow: var(--v-shadow-lg);
    border: 2px solid var(--v-color-background);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    z-index: 7;
    animation: completed-bounce 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
    transform-origin: center;
  }

  .basic-card__completed-text {
    font-size: var(--v-font-size-sm);
    line-height: 1;
  }

  .basic-card__time {
    position: absolute;
    top: var(--v-unit-3);
    right: var(--v-unit-3);
    background: linear-gradient(135deg, 
      var(--v-color-primary) 0%,
      var(--v-color-accent-primary) 100%);
    color: white;
    padding: var(--v-unit-2) var(--v-unit-3);
    border-radius: var(--v-radius-xl);
    font-size: var(--v-font-size-sm);
    font-weight: 800;
    box-shadow: 
      0 6px 16px hsla(0, 0%, 0%, 0.25),
      0 3px 8px hsla(0, 0%, 0%, 0.15),
      inset 0 2px 4px hsla(0, 0%, 100%, 0.3);
    border: 3px solid hsla(0, 0%, 100%, 0.4);
    text-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.4);
    z-index: 6;
    animation: time-badge-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.6s both;
    backdrop-filter: blur(4px);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        hsla(0, 0%, 100%, 0.2) 0%,
        transparent 50%,
        hsla(0, 0%, 0%, 0.1) 100%);
      border-radius: inherit;
      z-index: -1;
    }
  }

  @keyframes completed-bounce {
    0% {
      opacity: 0;
      transform: scale(0.3) rotate(-15deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.2) rotate(5deg);
    }
    70% {
      transform: scale(0.9) rotate(-2deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes time-badge-bounce {
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .basic-card {
      transition: none;
    }
    
    .basic-card__img {
      animation: fade-in 0.5s ease-out forwards;
    }
    
    .basic-card__time {
      animation: none;
      opacity: 1;
    }

    .basic-card__completed {
      animation: none;
      opacity: 1;
    }
    
    .basic-card:hover {
      transform: none;
    }
  }
</style>
