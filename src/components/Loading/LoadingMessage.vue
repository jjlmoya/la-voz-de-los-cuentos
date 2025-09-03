<template>
  <div class="loading-message">
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

const currentMessage = ref(props.messages[0])
let messageInterval = null
let currentIndex = 0

const rotateMessage = () => {
  currentIndex = (currentIndex + 1) % props.messages.length
  currentMessage.value = props.messages[currentIndex]
}

onMounted(() => {
  if (props.messages.length > 1) {
    messageInterval = setInterval(rotateMessage, props.interval)
  }
})

onUnmounted(() => {
  if (messageInterval) {
    clearInterval(messageInterval)
  }
})
</script>

<style scoped>
.loading-message {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--v-unit-12) var(--v-unit-8);
  text-align: center;
  min-height: 120px;
}

.loading-message__text {
  font-size: var(--v-font-size-xl) !important;
  font-weight: 600 !important;
  color: var(--v-color-primary) !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  animation: loading-fade 1.5s ease-in-out infinite alternate !important;
  padding: var(--v-unit-4) var(--v-unit-6) !important;
  background: linear-gradient(135deg, 
    var(--v-color-background) 0%, 
    var(--v-color-background-soft) 100%) !important;
  border-radius: var(--v-radius-xl) !important;
  border: 2px solid var(--v-color-primary) !important;
  box-shadow: var(--v-shadow-md) !important;
  max-width: 600px;
  line-height: 1.3 !important;
}

@keyframes loading-fade {
  0% {
    opacity: 0.7;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .loading-message__text {
    font-size: var(--v-font-size-lg) !important;
    padding: var(--v-unit-6) var(--v-unit-8) !important;
  }
  
  .loading-message {
    padding: var(--v-unit-8) var(--v-unit-4);
    min-height: 100px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-message__text {
    animation: none !important;
  }
}
</style>