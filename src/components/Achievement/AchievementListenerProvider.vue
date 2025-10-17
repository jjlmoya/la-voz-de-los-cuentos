<template>
  <!-- Componente invisible que solo maneja la lógica de escucha de logros -->
  <slot />

  <!-- Notificación de logros desbloqueados -->
  <AchievementUnlock />

  <!-- Debug panel (solo en desarrollo) -->
  <AchievementDebug />
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import AchievementUnlock from './AchievementUnlock.vue'
import AchievementDebug from '../Debug/AchievementDebug.vue'
import { useAchievementListener } from '../../composables/useAchievementListener'
import { getGlobalAchievementNotification } from '../../composables/useAchievementNotification'

/**
 * Provider que inicializa el sistema global de logros
 * - Inicia el listener de cambios en historias
 * - Inicializa las notificaciones globales
 *
 * Se debe colocar en el componente root de la aplicación (App.vue)
 */

const { startListening, forceCheck } = useAchievementListener()
const { setupEventListeners } = getGlobalAchievementNotification()

onMounted(() => {
  const stopListening = startListening()
  setupEventListeners()
  forceCheck()
  window.__achievementCleanup = () => {
    stopListening()
  }
})

onBeforeUnmount(() => {
  if (window.__achievementCleanup) {
    window.__achievementCleanup()
  }
})
</script>