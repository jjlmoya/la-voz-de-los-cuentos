<template>
  <div class="loading-message">
    <!-- Ilustración animada -->
    <div class="loading-illustration">
      <img
        :src="`/assets/loading/${currentIcon}.webp`"
        :alt="currentMessage"
        class="loading-illustration__img"
      />
    </div>

    <!-- Spinner de puntos -->
    <div class="loading-spinner">
      <div class="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- Texto del mensaje -->
    <VText class="loading-message__text" variant="header" color="primary">
      {{ currentMessage }}
    </VText>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { VText } from '@overgaming/vicius'
import t from '../../translations'

const props = defineProps({
  messages: {
    type: Array,
    default: () => [
      t('loading.adventure'),
      t('loading.book'),
      t('loading.characters'),
      t('loading.worlds'),
      t('loading.potions'),
      t('loading.treasures')
    ]
  },
  interval: {
    type: Number,
    default: 2000
  }
})

const icons = [
  'explorer',   
  'wizard',     
  'princess',   
  'dragon',     
  'sorcerer',   
  'pirate'  
]

const getRandomIndex = () => Math.floor(Math.random() * props.messages.length)

const currentMessage = ref(props.messages[getRandomIndex()])
const currentIcon = ref(icons[getRandomIndex()])

</script>

<style scoped>
.loading-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--v-unit-12) var(--v-unit-8);
  text-align: center;
  min-height: 280px;
  width: 100%;
  gap: var(--v-unit-6);
}

.loading-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin-bottom: var(--v-unit-4);
}

.loading-illustration__img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  animation: loading-icon-bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 4px 12px rgba(var(--v-color-primary-rgb), 0.2));
}

@keyframes loading-icon-bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-8px) scale(1.05);
    opacity: 0.9;
  }
}

@keyframes loading-icon-fade-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.loading-spinner {
  margin-bottom: var(--v-unit-4);
}

.loading-dots {
  display: flex;
  gap: var(--v-unit-2);
  align-items: center;
  justify-content: center;
}

.loading-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--v-color-primary);
  animation: loading-bounce 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }
.loading-dots span:nth-child(3) { animation-delay: 0s; }

@keyframes loading-bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.loading-message__text {
  font-size: var(--v-font-size-lg) !important;
  font-weight: 600 !important;
  color: var(--v-color-primary) !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
  animation: loading-fade 2s ease-in-out infinite alternate !important;
  max-width: 400px;
  line-height: 1.4 !important;
  margin: 0 !important;
}

@keyframes loading-fade {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .loading-message {
    padding: var(--v-unit-8) var(--v-unit-4);
    min-height: 240px;
    gap: var(--v-unit-4);
  }

  .loading-illustration {
    width: 100px;
    height: 100px;
    margin-bottom: var(--v-unit-2);
  }

  .loading-illustration__img {
    width: 60px;
    height: 60px;
  }

  .loading-message__text {
    font-size: var(--v-font-size-md) !important;
    max-width: 300px;
  }

  .loading-dots span {
    width: 10px;
    height: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-illustration__img {
    animation: none !important;
  }

  .loading-dots span {
    animation: none !important;
    opacity: 1;
    transform: scale(1);
  }

  .loading-message__text {
    animation: none !important;
    opacity: 1;
  }
}
</style>