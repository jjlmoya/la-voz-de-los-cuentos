<template>
  <div
    ref="cardRef"
    class="song-card"
    :class="{
      'song-card--visible': isVisible,
      'song-card--center': isInCenter
    }"
    :style="{
      '--random-duration': `${randomDuration}s`,
      '--random-delay': `${randomDelay}s`,
      '--random-rotation': `${randomRotation}deg`
    }"
    @click="onClick"
  >
    <div class="song-card__corner-decoration">
      <img
        src="/assets/icons/music-triangle.png"
        alt=""
        class="song-card__triangle"
      />
    </div>

    <div class="song-card__cover">
      <img
        :src="`/assets/stories/${lang}/${song.key}.webp`"
        :alt="song.name"
        class="song-card__image"
      />
      <div class="song-card__play">
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>

    <div class="song-card__info">
      <VText as="h3" variant="subtitle" color="high" class="song-card__title">
        {{ song.name }}
      </VText>
      <VText v-if="song.time" variant="caption" color="medium" class="song-card__duration">
        {{ formatTime(song.time) }}
      </VText>
    </div>
  </div>
</template>

<script setup>
import { VText } from '@overgaming/vicius'
import { ref, onMounted, onUnmounted } from 'vue'

const lang = import.meta.env.PUBLIC_LANG

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const cardRef = ref(null)
const isVisible = ref(false)
const isInCenter = ref(false)

// Valores aleatorios para cada card
const randomDuration = ref(2 + Math.random() * 2) // 2-4s
const randomDelay = ref(Math.random() * 2) // 0-2s
const randomRotation = ref(-2 + Math.random() * 4) // -2 a +2 grados

const onClick = () => {
  emit('click', props.song.key)
}

const formatTime = (time) => {
  if (!time) return ''
  const seconds = parseFloat(time.replace(',', '.'))
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

// Intersection Observer para detectar cuándo la card está visible y en el centro
let observer = null

onMounted(() => {
  if (!cardRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Card visible en el viewport
        isVisible.value = entry.isIntersecting

        // Detectar si está en el centro del viewport
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect
          const viewportHeight = window.innerHeight
          const cardCenter = rect.top + rect.height / 2
          const viewportCenter = viewportHeight / 2

          // Si el centro de la card está cerca del centro del viewport (±350px)
          const distanceFromCenter = Math.abs(cardCenter - viewportCenter)
          isInCenter.value = distanceFromCenter < 350
        } else {
          isInCenter.value = false
        }
      })
    },
    {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-100px 0px'
    }
  )

  observer.observe(cardRef.value)

  // Actualizar posición en scroll para animaciones del centro
  const handleScroll = () => {
    if (!cardRef.value || !isVisible.value) return

    const rect = cardRef.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const cardCenter = rect.top + rect.height / 2
    const viewportCenter = viewportHeight / 2

    const distanceFromCenter = Math.abs(cardCenter - viewportCenter)
    isInCenter.value = distanceFromCenter < 350
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // Cleanup
  onUnmounted(() => {
    if (observer && cardRef.value) {
      observer.unobserve(cardRef.value)
    }
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
.song-card {
  position: relative;
  cursor: pointer;
  transform-origin: center;
  opacity: 0;
  transform: translateY(50px) scale(0.85);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  @media (hover: hover) {
    &:hover {
      transform: translateY(-8px) scale(1.05) !important;
      opacity: 1 !important;

      .song-card__play {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }

      .song-card__cover {
        box-shadow:
          0 20px 40px rgba(var(--v-color-primary-rgb), 0.4),
          0 0 0 4px var(--v-color-primary),
          0 0 30px rgba(var(--v-color-accent-primary-rgb), 0.3);
      }
    }
  }

  &:active {
    transform: scale(0.95) !important;
  }
}

/* Card visible en viewport - aparece con menos opacidad */
.song-card--visible {
  opacity: 0.5;
  transform: translateY(0) scale(0.95);
  animation: float-random var(--random-duration) ease-in-out var(--random-delay) infinite;
  filter: grayscale(0.3);
  transition: all 0.6s ease-out;
}

/* Card en el centro del viewport - 100% visible y destacada */
.song-card--center {
  opacity: 1 !important;
  transform: translateY(0) scale(1) !important;
  filter: grayscale(0) !important;
  animation:
    float-random var(--random-duration) ease-in-out var(--random-delay) infinite,
    center-pulse 2.5s ease-in-out infinite;

  .song-card__corner-decoration {
    animation: triangle-dance 2s ease-in-out infinite;
  }

  .song-card__cover {
    box-shadow:
      0 16px 32px rgba(var(--v-color-primary-rgb), 0.35),
      0 0 0 4px var(--v-color-primary);
  }

  .song-card__title {
    opacity: 1;
  }

  .song-card__duration {
    opacity: 1;
  }
}

/* Animación flotante aleatoria */
@keyframes float-random {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-6px) rotate(var(--random-rotation));
  }
  50% {
    transform: translateY(-3px) rotate(calc(var(--random-rotation) * -0.5));
  }
  75% {
    transform: translateY(-8px) rotate(calc(var(--random-rotation) * 0.8));
  }
}

/* Pulso sutil cuando está en el centro */
@keyframes center-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* Baile del triángulo en el centro */
@keyframes triangle-dance {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(-8deg);
  }
  50% {
    transform: scale(1.12) rotate(4deg);
  }
  75% {
    transform: scale(1.05) rotate(-4deg);
  }
}

.song-card__corner-decoration {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 75px;
  height: 75px;
  z-index: 3;
  transition: transform 0.3s ease;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 65px;
    height: 65px;
  }
}

.song-card__triangle {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

.song-card__cover {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0 var(--v-radius-xl) var(--v-radius-xl) var(--v-radius-xl);
  overflow: hidden;
  box-shadow:
    0 12px 24px rgba(0, 0, 0, 0.15),
    0 0 0 3px var(--v-color-primary);
  margin-bottom: var(--v-unit-3);
  transition: all 0.3s ease;
  background: linear-gradient(135deg,
    var(--v-color-primary) 0%,
    var(--v-color-accent-primary) 100%
  );

  @media (max-width: 768px) {
    border-radius: 0 var(--v-radius-lg) var(--v-radius-lg) var(--v-radius-lg);
  }
}

.song-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-card__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,
    rgba(var(--v-color-primary-rgb), 0.9),
    rgba(var(--v-color-accent-primary-rgb), 0.9)
  );
  opacity: 0;
  transform: scale(0.7) rotate(-90deg);
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  svg {
    width: 72px;
    height: 72px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
    animation: pulse-play 1.5s ease-in-out infinite;

    @media (max-width: 768px) {
      width: 56px;
      height: 56px;
    }
  }
}

@keyframes pulse-play {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.15) translateX(2px);
  }
  75% {
    transform: scale(1.05) translateX(-2px);
  }
}

.song-card__info {
  text-align: center;
  padding: 0 var(--v-unit-2);
}

.song-card__title {
  margin-bottom: var(--v-unit-1);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 700;
  line-height: 1.3;
  transition: opacity 0.3s ease;
}

.song-card__duration {
  font-weight: 600;
  color: var(--v-color-primary);
  transition: opacity 0.3s ease;
}
</style>
