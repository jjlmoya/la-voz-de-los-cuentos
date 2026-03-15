<template>
  <section class="landing-cta-section">
    <div class="cta-content">
      <h2 class="cta-title">{{ ctaTitle }}</h2>
      <p class="cta-text">{{ ctaText }}</p>
      <div class="cta-buttons">
        <button class="btn btn-primary" @click="scrollToStories">
          {{ primaryCTA }}
        </button>
        <button class="btn btn-secondary" @click="handleSecondary">
          {{ secondaryCTA }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  keyword: {
    type: String,
    default: ''
  },
  storiesCount: {
    type: Number,
    default: 0
  }
})

const currentLang = import.meta.env.PUBLIC_LANG || 'es'

const ctaTitle = computed(() => {
  if (currentLang === 'es') {
    return `¿Listo para explorar estas historias${props.keyword ? ` de ${props.keyword}` : ''}?`
  }
  return `Ready to explore these ${props.keyword ? props.keyword : 'stories'}?`
})

const ctaText = computed(() => {
  if (currentLang === 'es') {
    return `Tenemos ${props.storiesCount || 'muchas'} historias cuidadosamente seleccionadas para ti. Cada una es una aventura esperando ser descubierta.`
  }
  return `We have ${props.storiesCount || 'many'} carefully curated stories for you. Each one is an adventure waiting to be discovered.`
})

const primaryCTA = computed(() => {
  return currentLang === 'es' ? '🎧 Escucha Ahora' : '🎧 Listen Now'
})

const secondaryCTA = computed(() => {
  return currentLang === 'es' ? '📚 Más Información' : '📚 Learn More'
})

const scrollToStories = () => {
  const storiesSection = document.querySelector('[data-landing-stories]')
  if (storiesSection) {
    storiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handleSecondary = () => {
  // Could navigate to information page or open a modal
  console.log('Secondary CTA clicked')
}
</script>

<style scoped>
.landing-cta-section {
  margin: var(--v-unit-12) 0;
  padding: var(--v-unit-8);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-4);
}

.cta-title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  color: var(--v-color-text);
  margin: 0;
}

.cta-text {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--v-color-text-secondary);
  margin: 0;
}

.cta-buttons {
  display: flex;
  gap: var(--v-unit-3);
  justify-content: center;
  flex-wrap: wrap;
  margin-top: var(--v-unit-4);
}

.btn {
  padding: var(--v-unit-3) var(--v-unit-6);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: white;
  color: #6366f1;
  border: 2px solid #6366f1;
}

.btn-secondary:hover {
  background: #f0f4ff;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .landing-cta-section {
    padding: var(--v-unit-6) var(--v-unit-4);
    margin: var(--v-unit-8) 0;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
