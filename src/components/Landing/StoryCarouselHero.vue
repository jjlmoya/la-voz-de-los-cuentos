<template>
  <section class="carousel-hero">
    <div class="carousel-hero__background">
      <div class="glow glow--1"></div>
      <div class="glow glow--2"></div>
      <div class="glow glow--3"></div>
    </div>

    <div class="carousel-hero__container">
      <div class="carousel-hero__content">
        <h2 class="carousel-hero__subtitle">Cuentos Recomendados</h2>
        <h1 class="carousel-hero__title">{{ title }}</h1>
      </div>

      <div class="netflix-carousel-wrapper">
        <button
          class="netflix-nav netflix-nav--prev"
          @click="scroll('left')"
          :class="{ 'netflix-nav--disabled': !canScrollLeft }"
        >
          ‹
        </button>

        <div class="netflix-carousel-track" ref="scrollContainer">
          <div
            v-for="(story, index) in carouselStories"
            :key="story.key"
            class="netflix-item"
            @click="navigateToStory(story.key)"
          >
            <div class="netflix-item__rank">{{ index + 1 }}</div>
            <div class="netflix-item__poster">
              <img
                :src="`/assets/stories/${lang}/${story.key}.webp`"
                :alt="story.name"
                class="netflix-item__image"
                loading="lazy"
              />
              <div class="netflix-item__overlay">
                <div class="netflix-item__actions">
                  <button class="netflix-play">▶</button>
                </div>
                <h3 class="netflix-item__title">{{ story.name }}</h3>
              </div>
            </div>
          </div>
        </div>

        <button
          class="netflix-nav netflix-nav--next"
          @click="scroll('right')"
          :class="{ 'netflix-nav--disabled': !canScrollRight }"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { toStory } from '../../router'
import useStories from '../../composables/useStories'
import useLanding from '../../composables/useLanding'

const props = defineProps({
  title: {
    type: String,
    default: 'Descubre nuestros cuentos'
  },
  landing: {
    type: Object,
    default: () => ({})
  },
  lang: {
    type: String,
    default: 'es'
  }
})

const { getAllStories } = useStories()
const currentIndex = ref(0)
const itemsPerView = ref(6)
const scrollContainer = ref(null)

// Obtener cuentos desde la lógica dinámica del landing
const carouselStories = computed(() => {
  if (props.landing && (props.landing.category || props.landing.keywords)) {
    const { getStories } = useLanding(props.landing, props.lang)
    return getStories()
  }

  // Fallback: obtener todos los cuentos si no hay landing
  return getAllStories()
})

const canScrollLeft = computed(() => currentIndex.value > 0)
const canScrollRight = computed(() => {
  return currentIndex.value < carouselStories.value.length - itemsPerView.value
})

const scroll = (direction) => {
  const container = scrollContainer.value
  if (!container) return

  const scrollAmount = container.offsetWidth / itemsPerView.value + 16 // items width + gap
  const distance = direction === 'right' ? scrollAmount : -scrollAmount

  container.scrollBy({
    left: distance,
    behavior: 'smooth'
  })

  // Actualizar índice
  if (direction === 'right' && canScrollRight.value) {
    currentIndex.value += 1
  } else if (direction === 'left' && canScrollLeft.value) {
    currentIndex.value -= 1
  }
}

const navigateToStory = (slug) => {
  window.location.href = toStory(slug)
}

onMounted(() => {
  // Responsive items per view
  const updateItemsPerView = () => {
    if (window.innerWidth < 640) {
      itemsPerView.value = 2
    } else if (window.innerWidth < 1024) {
      itemsPerView.value = 4
    } else {
      itemsPerView.value = 6
    }
  }

  updateItemsPerView()
  window.addEventListener('resize', updateItemsPerView)
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

@keyframes slide-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.carousel-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--v-unit-10) var(--v-unit-4);
  overflow: hidden;
  background: linear-gradient(
    180deg,
    #0F172A 0%,
    #1E293B 50%,
    #0F172A 100%
  );
  box-shadow: inset 0 0 80px rgba(124, 58, 237, 0.1);
}

.carousel-hero__background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.glow {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: glow-pulse 5s ease-in-out infinite;
  filter: blur(100px);
}

.glow--1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.5), transparent);
  top: -350px;
  left: -250px;
  opacity: 0.6;
}

.glow--2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent);
  bottom: -300px;
  right: -200px;
  animation-delay: 1.5s;
  opacity: 0.5;
}

.glow--3 {
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.35), transparent);
  top: 35%;
  right: -200px;
  animation-delay: 3s;
  opacity: 0.4;
}

.carousel-hero__container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-6);
  animation: slide-in 0.6s ease-out;
}

.carousel-hero__content {
  text-align: center;
}

.carousel-hero__subtitle {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #7C3AED, #A78BFA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 var(--v-unit-4) 0;
  opacity: 1;
  text-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
}

.carousel-hero__title {
  font-size: clamp(2.5rem, 7vw, 3.2rem);
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  line-height: 1.15;
  text-shadow: 0 8px 32px rgba(124, 58, 237, 0.3);
}

.netflix-carousel-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--v-unit-2);
  padding: var(--v-unit-6) 0;
  margin-top: var(--v-unit-4);
}

.netflix-carousel-track {
  display: flex;
  gap: 0.75rem;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  flex: 1;
  min-height: 300px;
  perspective: 1000px;
}

.netflix-carousel-track::-webkit-scrollbar {
  display: none;
}

.netflix-item {
  flex: 0 0 calc((100% / 6) - 0.75rem);
  cursor: pointer;
  position: relative;
  height: 300px;
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.netflix-item__rank {
  position: absolute;
  top: -8px;
  left: -8px;
  z-index: 10;
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 900;
  color: white;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(124, 58, 237, 0.6);
  font-family: 'Arial Black', sans-serif;
  letter-spacing: -2px;
  background: linear-gradient(135deg, #7C3AED, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  transform-origin: top left;
  filter: drop-shadow(0 2px 4px rgba(124, 58, 237, 0.6));
}

.netflix-item__poster {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(124, 58, 237, 0.2);
}

.netflix-item:hover {
  transform: scale(1.08) translateY(-16px);
  z-index: 50;
}

.netflix-item:hover .netflix-item__poster {
  box-shadow: 0 32px 64px rgba(124, 58, 237, 0.4);
  border-color: rgba(124, 58, 237, 0.5);
}

.netflix-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.netflix-item:hover .netflix-item__image {
  transform: scale(1.1);
}

.netflix-item__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--v-unit-3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.netflix-item:hover .netflix-item__overlay {
  opacity: 1;
}

.netflix-item__actions {
  display: flex;
  gap: var(--v-unit-2);
  width: 100%;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
}

.netflix-play {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7C3AED, #8B5CF6);
  color: white;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
}

.netflix-play:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.6);
}

.netflix-item__title {
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
}

.netflix-nav {
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.9);
  color: white;
  border: none;
  font-size: 1.5rem;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 5;
}

.netflix-nav:hover:not(.netflix-nav--disabled) {
  background: rgba(124, 58, 237, 1);
  transform: scale(1.1);
}

.netflix-nav--disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.netflix-nav--disabled:hover {
  transform: none;
  background: rgba(124, 58, 237, 0.9);
}

@media (max-width: 1024px) {
  .netflix-item {
    flex: 0 0 calc((100% / 4) - 0.5rem);
  }

  .netflix-nav {
    width: 36px;
    height: 36px;
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .carousel-hero {
    min-height: 45vh;
    padding: var(--v-unit-6) var(--v-unit-3);
  }

  .carousel-hero__title {
    font-size: 1.75rem;
  }

  .netflix-item {
    flex: 0 0 calc((100% / 3) - 0.5rem);
    height: 240px;
  }

  .netflix-nav {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .carousel-hero {
    min-height: 40vh;
    padding: var(--v-unit-4) var(--v-unit-2);
  }

  .carousel-hero__title {
    font-size: 1.5rem;
  }

  .netflix-carousel-wrapper {
    gap: var(--v-unit-2);
  }

  .netflix-item {
    flex: 0 0 calc((100% / 2) - 0.5rem);
    height: 200px;
  }

  .netflix-nav {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }
}
</style>
